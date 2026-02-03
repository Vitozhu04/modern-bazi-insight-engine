import { describe, expect, it } from "vitest";

import { calculateFiveElementsWeight } from "../fiveElementsWeight.js";
import type { BaziChart } from "../../types/chart.js";

describe("calculateFiveElementsWeight", () => {
  it("weights month branch dominance and hidden stems", () => {
    const chart: BaziChart = {
      birthData: {
        gregorianDate: "2000-01-01T12:00:00Z",
        longitude: 120,
        gender: "Male",
      },
      trueSolarTime: "2000-01-01T12:00:00Z",
      solarTermsTime: "2000-01-01T00:00:00Z",
      yearPillar: {
        heavenlyStem: "甲",
        earthlyBranch: "子",
        hiddenStems: [{ stem: "癸", weight: 1 }],
      },
      monthPillar: {
        heavenlyStem: "丙",
        earthlyBranch: "子",
        hiddenStems: [{ stem: "癸", weight: 1 }],
      },
      dayPillar: {
        heavenlyStem: "戊",
        earthlyBranch: "子",
        hiddenStems: [{ stem: "癸", weight: 1 }],
      },
      hourPillar: {
        heavenlyStem: "庚",
        earthlyBranch: "子",
        hiddenStems: [{ stem: "癸", weight: 1 }],
      },
      tenGods: {
        year: ["比肩"],
        month: ["食神"],
        day: ["比肩"],
        hour: ["偏财"],
      },
      tenYearLuckPillars: [],
    };

    const weights = calculateFiveElementsWeight(chart);

    expect(weights.water).toBeCloseTo(60.714, 3);
    expect(weights.wood).toBeCloseTo(7.143, 3);
    expect(weights.fire).toBeCloseTo(10.714, 3);
    expect(weights.earth).toBeCloseTo(10.714, 3);
    expect(weights.metal).toBeCloseTo(10.714, 3);
  });
});
