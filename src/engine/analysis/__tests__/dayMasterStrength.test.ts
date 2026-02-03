import { describe, expect, it } from "vitest";

import { calculateDayMasterStrength } from "../dayMasterStrength.js";
import type { BaziChart } from "../../types/chart.js";

const baseChart = (overrides: Partial<BaziChart>): BaziChart => ({
  birthData: {
    gregorianDate: "2000-01-01T12:00:00Z",
    longitude: 120,
    gender: "Male",
  },
  trueSolarTime: "2000-01-01T12:00:00Z",
  solarTermsTime: "2000-01-01T00:00:00Z",
  yearPillar: {
    heavenlyStem: "甲",
    earthlyBranch: "寅",
    hiddenStems: [{ stem: "甲", weight: 0.6 }],
  },
  monthPillar: {
    heavenlyStem: "甲",
    earthlyBranch: "卯",
    hiddenStems: [{ stem: "乙", weight: 1 }],
  },
  dayPillar: {
    heavenlyStem: "甲",
    earthlyBranch: "子",
    hiddenStems: [{ stem: "癸", weight: 1 }],
  },
  hourPillar: {
    heavenlyStem: "甲",
    earthlyBranch: "子",
    hiddenStems: [{ stem: "癸", weight: 1 }],
  },
  tenGods: {
    year: ["比肩"],
    month: ["比肩"],
    day: ["比肩"],
    hour: ["比肩"],
  },
  tenYearLuckPillars: [],
  ...overrides,
});

describe("calculateDayMasterStrength", () => {
  it("identifies vibrant charts with overwhelming support", () => {
    const chart = baseChart({
      yearPillar: { heavenlyStem: "甲", earthlyBranch: "寅", hiddenStems: [] },
      monthPillar: { heavenlyStem: "壬", earthlyBranch: "亥", hiddenStems: [] },
      dayPillar: { heavenlyStem: "甲", earthlyBranch: "卯", hiddenStems: [] },
      hourPillar: { heavenlyStem: "甲", earthlyBranch: "子", hiddenStems: [] },
    });

    expect(calculateDayMasterStrength(chart)).toBe("Vibrant");
  });

  it("identifies weak charts with little support", () => {
    const chart = baseChart({
      yearPillar: { heavenlyStem: "庚", earthlyBranch: "申", hiddenStems: [] },
      monthPillar: { heavenlyStem: "辛", earthlyBranch: "酉", hiddenStems: [] },
      dayPillar: { heavenlyStem: "甲", earthlyBranch: "卯", hiddenStems: [] },
      hourPillar: { heavenlyStem: "庚", earthlyBranch: "申", hiddenStems: [] },
    });

    expect(calculateDayMasterStrength(chart)).toBe("Weak");
  });

  it("identifies follow charts when no support and a dominant force", () => {
    const chart = baseChart({
      yearPillar: { heavenlyStem: "庚", earthlyBranch: "申", hiddenStems: [] },
      monthPillar: { heavenlyStem: "辛", earthlyBranch: "酉", hiddenStems: [] },
      dayPillar: { heavenlyStem: "甲", earthlyBranch: "午", hiddenStems: [] },
      hourPillar: { heavenlyStem: "庚", earthlyBranch: "申", hiddenStems: [] },
    });

    expect(calculateDayMasterStrength(chart, { followThreshold: 5 })).toBe("Follow");
  });
});
