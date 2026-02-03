import { describe, expect, it } from "vitest";

import type { BaziChart } from "../../types/chart.js";
import { determineUsefulGod } from "../usefulGod.js";

const baseChart = (overrides: Partial<BaziChart>): BaziChart => ({
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
    month: ["正官"],
    day: ["比肩"],
    hour: ["食神"],
  },
  tenYearLuckPillars: [],
  ...overrides,
});

describe("determineUsefulGod", () => {
  it("prioritizes climate adjustment in cold months", () => {
    const chart = baseChart({
      monthPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
    });

    const result = determineUsefulGod(chart);
    expect(result.favorableGods).toContain("火");
  });

  it("uses strength rules when climate is neutral", () => {
    const chart = baseChart({
      monthPillar: { heavenlyStem: "甲", earthlyBranch: "卯", hiddenStems: [] },
      dayPillar: { heavenlyStem: "甲", earthlyBranch: "卯", hiddenStems: [] },
      yearPillar: { heavenlyStem: "甲", earthlyBranch: "寅", hiddenStems: [] },
    });

    const result = determineUsefulGod(chart);
    expect(result.favorableGods).toContain("火");
    expect(result.unfavorableGods).toContain("木");
  });
});
