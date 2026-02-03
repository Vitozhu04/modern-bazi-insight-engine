import { describe, expect, it } from "vitest";

import { yearlyPillar } from "../yearlyPillar.js";

describe("yearlyPillar", () => {
  it("maps a Gregorian year to its stem-branch", () => {
    const pillar = yearlyPillar(1984);
    expect(pillar.heavenlyStem).toBe("甲");
    expect(pillar.earthlyBranch).toBe("子");
  });

  it("advances the cycle by year", () => {
    const pillar = yearlyPillar(1985);
    expect(pillar.heavenlyStem).toBe("乙");
    expect(pillar.earthlyBranch).toBe("丑");
  });
});
