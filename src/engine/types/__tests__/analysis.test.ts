import { describe, expect, expectTypeOf, it } from "vitest";

import type { BaziChart, Pillar, TenYearLuckPillar } from "../chart";
import type { BirthData } from "../input";
import type {
  Advice,
  FiveElementsWeight,
  FullReport,
  InsightTags,
  LuckScorePoint,
  UsefulGodAnalysis,
} from "../analysis";

describe("Analysis types", () => {
  it("accepts the expected shapes", () => {
    const birthData: BirthData = {
      gregorianDate: "1996-08-23T12:30:00",
      longitude: -122.4194,
      gender: "Male",
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

    const point: LuckScorePoint = {
      year: 2026,
      age: 30,
      yearlyPillar: basePillar,
      tenYearLuckPillar: basePillar,
      score: 72,
      trend: "up",
    };

    const fiveElements: FiveElementsWeight = {
      wood: 20,
      fire: 20,
      earth: 20,
      metal: 20,
      water: 20,
    };

    const usefulGod: UsefulGodAnalysis = {
      dayMasterStrength: "Strong",
      pattern: "正官格",
      favorableGods: ["火"],
      unfavorableGods: ["水"],
    };

    const advice: Advice = {
      accessories: [{ name: "红绳", reason: "补火" }],
      directions: ["南"],
      colors: ["红"],
    };

    const insightTags: InsightTags = {
      career: ["领导力"],
      wealth: ["稳健"],
      personality: ["果断"],
    };

    const report: FullReport = {
      baziChart: chart,
      lifeKline: [point],
      fiveElements,
      usefulGod,
      actionableAdvice: advice,
      insightTags,
    };

    expect(report.lifeKline[0]?.score).toBeTypeOf("number");
    expectTypeOf(report.usefulGod.dayMasterStrength).toEqualTypeOf<
      "Strong" | "Weak" | "Vibrant" | "Follow"
    >();
  });
});
