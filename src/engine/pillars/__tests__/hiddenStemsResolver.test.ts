import { describe, expect, it } from "vitest";

import { resolveHiddenStems } from "../hiddenStemsResolver.js";

describe("resolveHiddenStems", () => {
  it("returns hidden stems for a branch", () => {
    expect(resolveHiddenStems("戌")).toEqual([
      { stem: "戊", weight: 0.6 },
      { stem: "辛", weight: 0.3 },
      { stem: "丁", weight: 0.1 },
    ]);
  });
});
