import { describe, expect, it } from "vitest";

import type { BaziChart, Pillar } from "../../types/chart.js";
import type { UsefulGodAnalysis } from "../../types/analysis.js";
import { calculateAnnualLuckScore } from "../annualLuckScore.js";

const baseChart: BaziChart = {
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
  tenYearLuckPillars: [],
};

const baseUsefulGod: UsefulGodAnalysis = {
  dayMasterStrength: "Strong",
  pattern: "正官格",
  favorableGods: ["火"],
  unfavorableGods: ["木"],
};

const pillar = (stem: string): Pillar => ({
  heavenlyStem: stem,
  earthlyBranch: "子",
  hiddenStems: [],
});

describe("calculateAnnualLuckScore", () => {
  it("scores higher for favorable yearly element", () => {
    const score = calculateAnnualLuckScore({
      chart: baseChart,
      usefulGod: baseUsefulGod,
      yearlyPillar: pillar("丙"),
      luckPillar: pillar("甲"),
    });

    expect(score).toBeGreaterThan(50);
  });

  it("scores lower for controlling yearly element", () => {
    const score = calculateAnnualLuckScore({
      chart: baseChart,
      usefulGod: baseUsefulGod,
      yearlyPillar: pillar("庚"),
      luckPillar: pillar("甲"),
    });

    expect(score).toBeLessThan(50);
  });
});
