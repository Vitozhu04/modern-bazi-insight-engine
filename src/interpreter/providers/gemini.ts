import type { LlmProvider } from "./types.js";

interface GeminiConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  fetchFn?: typeof fetch;
  timeoutMs?: number;
}

export class GeminiProvider implements LlmProvider {
  name = "gemini";
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private fetchFn: typeof fetch;
  private timeoutMs: number;

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.model = config.model;
    this.fetchFn = config.fetchFn ?? fetch;
    this.timeoutMs = config.timeoutMs ?? 45000;
  }

  async generate(prompt: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
    let response: Response;
    try {
      response = await this.fetchFn(
        `${this.baseUrl}/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
          signal: controller.signal,
        },
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Gemini request timed out");
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      let details = "";
      try {
        details = await response.text();
      } catch (error) {
        details = "";
      }
      const suffix = details ? `: ${details}` : "";
      throw new Error(`Gemini request failed (${response.status})${suffix}`);
    }

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("Gemini response missing content");
    }

    return content;
  }
}
