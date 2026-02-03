import { describe, expect, expectTypeOf, it } from "vitest";

import type { BirthData } from "../input";
import type { BaziChart, Pillar, TenYearLuckPillar } from "../chart";

describe("Pillar", () => {
  it("accepts the expected shape", () => {
    const pillar: Pillar = {
      heavenlyStem: "丙",
      earthlyBranch: "子",
      hiddenStems: [{ stem: "癸", weight: 1 }],
    };

    expect(pillar.hiddenStems[0]?.weight).toBeTypeOf("number");
  });
});

describe("BaziChart", () => {
  it("accepts the expected shape", () => {
    const birthData: BirthData = {
      gregorianDate: "1996-08-23T12:30:00",
      longitude: -122.4194,
      gender: "Female",
    };

    const basePillar: Pillar = {
      heavenlyStem: "甲",
      earthlyBranch: "子",
      hiddenStems: [{ stem: "癸", weight: 1 }],
    };

    const luckPillar: TenYearLuckPillar = {
      startAge: 1,
      endAge: 10,
      pillar: basePillar,
    };

    const chart: BaziChart = {
      birthData,
      trueSolarTime: "1996-08-23T12:12:00",
      solarTermsTime: "1996-08-07T01:00:00",
      yearPillar: basePillar,
      monthPillar: basePillar,
      dayPillar: basePillar,
      hourPillar: basePillar,
      tenGods: {
        year: ["比肩"],
        month: ["劫财"],
        day: ["日主"],
        hour: ["正财"],
      },
      tenYearLuckPillars: [luckPillar],
    };

    expect(chart.tenYearLuckPillars).toHaveLength(1);
    expectTypeOf(chart.tenGods).toEqualTypeOf<
      Record<"year" | "month" | "day" | "hour", string[]>
    >();
  });
});
