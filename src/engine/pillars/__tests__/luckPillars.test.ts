import { describe, expect, it } from "vitest";

import { calculateLuckPillars } from "../luckPillars.js";
import { findSolarTermTime, solarTerms } from "../../time/solarTerms.js";

describe("calculateLuckPillars", () => {
  it("generates forward luck pillars for yang male", () => {
    const birthDate = new Date(Date.UTC(2026, 1, 10, 12, 0, 0));
    const pillars = calculateLuckPillars({
      birthDate,
      gender: "Male",
      yearStem: "甲",
      monthPillar: {
        heavenlyStem: "甲",
        earthlyBranch: "寅",
        hiddenStems: [],
      },
    });

    expect(pillars[0]?.pillar.heavenlyStem).toBe("乙");
    expect(pillars[0]?.pillar.earthlyBranch).toBe("卯");
  });

  it("generates reverse luck pillars for yang female", () => {
    const birthDate = new Date(Date.UTC(2026, 1, 10, 12, 0, 0));
    const pillars = calculateLuckPillars({
      birthDate,
      gender: "Female",
      yearStem: "甲",
      monthPillar: {
        heavenlyStem: "甲",
        earthlyBranch: "寅",
        hiddenStems: [],
      },
    });

    expect(pillars[0]?.pillar.heavenlyStem).toBe("癸");
    expect(pillars[0]?.pillar.earthlyBranch).toBe("丑");
  });

  it("uses exact jie term when birth matches term time", () => {
    const lichun = solarTerms.find((term) => term.name === "立春");
    if (!lichun) {
      throw new Error("Missing 立春 term");
    }

    const lichunTime = findSolarTermTime(2026, lichun);
    const pillars = calculateLuckPillars({
      birthDate: lichunTime,
      gender: "Male",
      yearStem: "甲",
      monthPillar: {
        heavenlyStem: "甲",
        earthlyBranch: "寅",
        hiddenStems: [],
      },
    });

    expect(pillars[0]?.startAge).toBeCloseTo(0, 6);
  });
});
