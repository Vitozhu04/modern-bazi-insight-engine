import { describe, expect, it } from "vitest";

import { extractContext } from "../contextExtractor.js";
import type { FullReport } from "../../engine/types/analysis.js";

const report: FullReport = {
  baziChart: {
    birthData: {
      gregorianDate: "2000-01-01T12:00:00Z",
      longitude: 120,
      gender: "Male",
    },
    trueSolarTime: "2000-01-01T12:00:00Z",
    solarTermsTime: "2000-01-01T00:00:00Z",
    yearPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
    monthPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
    dayPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
    hourPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
    tenGods: {
      year: ["比肩"],
      month: ["比肩"],
      day: ["比肩"],
      hour: ["比肩"],
    },
    tenYearLuckPillars: [
      {
        startAge: 1,
        endAge: 10,
        pillar: { heavenlyStem: "丙", earthlyBranch: "寅", hiddenStems: [] },
      },
    ],
  },
  lifeKline: [
    {
      year: 2001,
      age: 1,
      yearlyPillar: { heavenlyStem: "乙", earthlyBranch: "丑", hiddenStems: [] },
      tenYearLuckPillar: { heavenlyStem: "丙", earthlyBranch: "寅", hiddenStems: [] },
      score: 60,
      trend: "up",
    },
    {
      year: 2002,
      age: 2,
      yearlyPillar: { heavenlyStem: "丙", earthlyBranch: "寅", hiddenStems: [] },
      tenYearLuckPillar: { heavenlyStem: "丙", earthlyBranch: "寅", hiddenStems: [] },
      score: 40,
      trend: "down",
    },
  ],
  fiveElements: {
    wood: 20,
    fire: 20,
    earth: 20,
    metal: 20,
    water: 20,
  },
  usefulGod: {
    dayMasterStrength: "Strong",
    pattern: "正官格",
    favorableGods: ["火"],
    unfavorableGods: ["木"],
  },
  actionableAdvice: {
    accessories: [],
    directions: [],
    colors: [],
  },
  insightTags: {
    career: [],
    wealth: [],
    personality: [],
  },
};

describe("extractContext", () => {
  it("finds current, peak, and low years", () => {
    const context = extractContext(report, { currentYear: 2001 });

    expect(context.currentYear.year).toBe(2001);
    expect(context.peakYear.score).toBe(60);
    expect(context.lowYear.score).toBe(40);
  });
});
