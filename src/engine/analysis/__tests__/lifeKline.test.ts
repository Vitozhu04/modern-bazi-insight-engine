import { describe, expect, it } from "vitest";

import type { BaziChart } from "../../types/chart.js";
import { generateLifeKline } from "../lifeKline.js";

const chart: BaziChart = {
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
};

describe("generateLifeKline", () => {
  it("generates a score per year", () => {
    const points = generateLifeKline(chart, { startAge: 1, endAge: 3 });
    expect(points).toHaveLength(3);
    expect(points[0]?.trend).toBe("stable");
    expect(points[1]?.trend).toBeDefined();
  });
});
