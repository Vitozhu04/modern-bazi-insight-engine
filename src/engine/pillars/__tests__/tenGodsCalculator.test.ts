import { describe, expect, it } from "vitest";

import { calculateTenGods } from "../tenGodsCalculator.js";

describe("calculateTenGods", () => {
  it("calculates ten gods relative to the day stem", () => {
    const result = calculateTenGods({
      year: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
      month: { heavenlyStem: "庚", earthlyBranch: "子", hiddenStems: [] },
      day: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
      hour: { heavenlyStem: "丙", earthlyBranch: "子", hiddenStems: [] },
    });

    expect(result.year).toEqual(["比肩"]);
    expect(result.month).toEqual(["七杀"]);
    expect(result.day).toEqual(["比肩"]);
    expect(result.hour).toEqual(["食神"]);
  });
});
