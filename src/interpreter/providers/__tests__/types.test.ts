import { describe, expect, it } from "vitest";

import { assertProvider } from "../types.js";

describe("assertProvider", () => {
  it("accepts a valid provider", () => {
    const provider = {
      name: "mock",
      generate: async () => "ok",
    };

    expect(() => assertProvider(provider)).not.toThrow();
  });
});
