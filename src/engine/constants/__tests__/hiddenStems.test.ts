import { describe, expect, it } from "vitest";

import { hiddenStems, type HiddenStemEntry } from "../hiddenStems.js";

describe("hiddenStems", () => {
  it("covers all 12 earthly branches", () => {
    expect(Object.keys(hiddenStems)).toHaveLength(12);
  });

  it("uses weights that sum to 1.0", () => {
    (Object.entries(hiddenStems) as [string, HiddenStemEntry[]][]).forEach(
      ([branch, stems]) => {
      const total = stems.reduce((sum, stem) => sum + stem.weight, 0);
      expect(total).toBeCloseTo(1, 5);
      expect(stems.length).toBeGreaterThan(0);
      expect(branch).toBeTypeOf("string");
      }
    );
  });

  it("matches known examples", () => {
    expect(hiddenStems["子"]).toEqual([{ stem: "癸", weight: 1 }]);
    expect(hiddenStems["戌"]).toEqual([
      { stem: "戊", weight: 0.6 },
      { stem: "辛", weight: 0.3 },
      { stem: "丁", weight: 0.1 },
    ]);
  });
});
