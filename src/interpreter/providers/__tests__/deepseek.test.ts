// @vitest-environment node

import { describe, expect, it, vi } from "vitest";

import { DeepSeekProvider } from "../deepseek.js";

describe("DeepSeekProvider", () => {
  it("returns content from the API response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "hello" } }],
      }),
    });

    const provider = new DeepSeekProvider({
      apiKey: "test-key",
      baseUrl: "https://example.com",
      model: "deepseek-chat",
      fetchFn: fetchMock,
    });

    const result = await provider.generate("hi");
    expect(result).toBe("hello");
  });

  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const deepseekBaseUrl = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com";
  const deepseekModel = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

  const integrationTest = deepseekKey ? it : it.skip;

  integrationTest(
    "can generate a response with the real API",
    async () => {
      const provider = new DeepSeekProvider({
        apiKey: deepseekKey ?? "",
        baseUrl: deepseekBaseUrl,
        model: deepseekModel,
        timeoutMs: 45000,
      });

      const result = await provider.generate("请用中文给出一句非常简短的回答。");
      expect(result.length).toBeGreaterThan(0);
    },
    { timeout: 60000 }
  );
});
