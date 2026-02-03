import type { BaziChart } from "../types/chart.js";
import type { LuckScorePoint } from "../types/analysis.js";
import { calculateAnnualLuckScore } from "./annualLuckScore.js";
import { determineUsefulGod } from "./usefulGod.js";
import { yearlyPillar } from "./yearlyPillar.js";

interface LifeKlineOptions {
  startAge?: number;
  endAge?: number;
}

const resolveLuckPillar = (chart: BaziChart, age: number) => {
  const match = chart.tenYearLuckPillars.find(
    (pillar) => age >= pillar.startAge && age <= pillar.endAge,
  );
  return match ?? chart.tenYearLuckPillars[0];
};

export const generateLifeKline = (
  chart: BaziChart,
  options: LifeKlineOptions = {},
): LuckScorePoint[] => {
  const startAge = options.startAge ?? 1;
  const endAge = options.endAge ?? 100;
  const baseYear = new Date(chart.trueSolarTime).getUTCFullYear();
  const usefulGod = determineUsefulGod(chart);

  const points: LuckScorePoint[] = [];
  let previousScore: number | null = null;

  for (let age = startAge; age <= endAge; age += 1) {
    const year = baseYear + age;
    const yearly = yearlyPillar(year);
    const luck = resolveLuckPillar(chart, age);

    if (!luck) {
      continue;
    }

    const score = calculateAnnualLuckScore({
      chart,
      yearlyPillar: yearly,
      luckPillar: luck.pillar,
      usefulGod,
    });

    const trend = previousScore === null
      ? "stable"
      : score > previousScore
        ? "up"
        : score < previousScore
          ? "down"
          : "stable";

    points.push({
      year,
      age,
      yearlyPillar: yearly,
      tenYearLuckPillar: luck.pillar,
      score,
      trend,
    });

    previousScore = score;
  }

  return points;
};
