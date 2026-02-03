import type { FullReport, LuckScorePoint } from "../engine/types/analysis.js";

interface ContextOptions {
  currentYear?: number;
}

interface InterpretationContext {
  currentLuckPillar: FullReport["baziChart"]["tenYearLuckPillars"][number];
  currentYear: LuckScorePoint;
  peakYear: LuckScorePoint;
  lowYear: LuckScorePoint;
}

const pickCurrentYear = (lifeKline: LuckScorePoint[], year: number) => {
  const exact = lifeKline.find((point) => point.year === year);
  if (exact) {
    return exact;
  }
  return lifeKline.reduce((closest, point) =>
    Math.abs(point.year - year) < Math.abs(closest.year - year) ? point : closest,
  );
};

export const extractContext = (
  report: FullReport,
  options: ContextOptions = {},
): InterpretationContext => {
  const currentYear = options.currentYear ?? new Date().getUTCFullYear();
  const lifeKline = report.lifeKline;

  if (lifeKline.length === 0) {
    throw new Error("Life K-line data is empty");
  }

  const current = pickCurrentYear(lifeKline, currentYear);
  const peak = lifeKline.reduce((max, point) =>
    point.score > max.score ? point : max,
  );
  const low = lifeKline.reduce((min, point) =>
    point.score < min.score ? point : min,
  );

  const currentLuck = report.baziChart.tenYearLuckPillars.find(
    (pillar: FullReport["baziChart"]["tenYearLuckPillars"][number]) =>
      current.age >= pillar.startAge && current.age <= pillar.endAge,
  ) ?? report.baziChart.tenYearLuckPillars[0];

  if (!currentLuck) {
    throw new Error("No luck pillar found for current age");
  }

  return {
    currentLuckPillar: currentLuck,
    currentYear: current,
    peakYear: peak,
    lowYear: low,
  };
};
