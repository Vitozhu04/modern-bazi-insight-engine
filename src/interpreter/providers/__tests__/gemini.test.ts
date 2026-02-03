import { describe, expect, it, vi } from "vitest";

import { GeminiProvider } from "../gemini.js";

describe("GeminiProvider", () => {
  it("returns content from the API response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: "hello" }] } }],
      }),
    });

    const provider = new GeminiProvider({
      apiKey: "test-key",
      baseUrl: "https://example.com",
      model: "gemini-1.5-flash",
      fetchFn: fetchMock,
    });

    const result = await provider.generate("hi");
    expect(result).toBe("hello");
  });
});
