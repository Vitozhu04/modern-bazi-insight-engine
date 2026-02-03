import { describe, expect, it } from "vitest";

import type { FullReport } from "../../engine/types/analysis.js";
import { interpretReport } from "../orchestrator.js";

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
    career: ["discipline"],
    wealth: ["steady-income"],
    personality: ["independent"],
  },
};

describe("interpretReport", () => {
  it("calls provider with prompt", async () => {
    const provider = {
      name: "mock",
      generate: async (prompt: string) => `ok:${prompt.length}`,
    };

    const result = await interpretReport({
      report,
      userQuery: "Focus on career",
      provider,
      currentYear: 2001,
    });

    expect(result).toContain("ok:");
  });
});
