import type { LlmProvider } from "./types.js";

interface DeepSeekConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  fetchFn?: typeof fetch;
  timeoutMs?: number;
}

export class DeepSeekProvider implements LlmProvider {
  name = "deepseek";
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private fetchFn: typeof fetch;
  private timeoutMs: number;

  constructor(config: DeepSeekConfig) {
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
      response = await this.fetchFn(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
        }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("DeepSeek request timed out");
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
      throw new Error(`DeepSeek request failed (${response.status})${suffix}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("DeepSeek response missing content");
    }

    return content;
  }
}
