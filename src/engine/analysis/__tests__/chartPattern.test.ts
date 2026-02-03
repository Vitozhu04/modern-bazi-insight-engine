import { describe, expect, it } from "vitest";

import { determineChartPattern } from "../chartPattern.js";
import type { BaziChart } from "../../types/chart.js";

const baseChart = (overrides: Partial<BaziChart>): BaziChart => ({
  birthData: {
    gregorianDate: "2000-01-01T12:00:00Z",
    longitude: 120,
    gender: "Male",
  },
  trueSolarTime: "2000-01-01T12:00:00Z",
  solarTermsTime: "2000-01-01T00:00:00Z",
  yearPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
  monthPillar: { heavenlyStem: "庚", earthlyBranch: "子", hiddenStems: [] },
  dayPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
  hourPillar: { heavenlyStem: "丙", earthlyBranch: "子", hiddenStems: [] },
  tenGods: {
    year: ["比肩"],
    month: ["正官"],
    day: ["比肩"],
    hour: ["食神"],
  },
  tenYearLuckPillars: [],
  ...overrides,
});

describe("determineChartPattern", () => {
  it("maps month ten god to pattern", () => {
    const chart = baseChart({
      tenGods: {
        year: ["比肩"],
        month: ["正官"],
        day: ["比肩"],
        hour: ["食神"],
      },
    });

    expect(determineChartPattern(chart)).toBe("正官格");
  });

  it("falls back to ten god + 格 when non-standard", () => {
    const chart = baseChart({
      tenGods: {
        year: ["比肩"],
        month: ["劫财"],
        day: ["比肩"],
        hour: ["食神"],
      },
    });

    expect(determineChartPattern(chart)).toBe("劫财格");
  });
});
