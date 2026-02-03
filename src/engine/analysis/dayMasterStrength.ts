import { earthlyBranchInfo } from "../constants/earthlyBranches.js";
import { generatingCycle } from "../constants/fiveElements.js";
import { heavenlyStemInfo, type HeavenlyStem } from "../constants/heavenlyStems.js";
import { hiddenStems } from "../constants/hiddenStems.js";
import type { Element } from "../constants/fiveElements.js";
import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import type { BaziChart } from "../types/chart.js";
import type { DayMasterStrength } from "../types/analysis.js";

const positionWeights = {
  yearStem: 2,
  yearBranch: 1,
  monthStem: 3,
  monthBranch: 10,
  dayBranch: 3,
  hourStem: 3,
  hourBranch: 3,
} as const;

const isSupportiveElement = (dayElement: Element, element: Element) => {
  if (element === dayElement) {
    return true;
  }
  const producer = generatingCycle[(generatingCycle.indexOf(dayElement) + 4) % 5];
  return element === producer;
};

const stemElement = (stem: string) => heavenlyStemInfo[stem as HeavenlyStem].element;
const branchElement = (branch: string) =>
  earthlyBranchInfo[branch as EarthlyBranch].element;

const getElementCounts = (chart: BaziChart): Record<Element, number> => {
  const elements: Element[] = [
    stemElement(chart.yearPillar.heavenlyStem),
    stemElement(chart.monthPillar.heavenlyStem),
    stemElement(chart.hourPillar.heavenlyStem),
    branchElement(chart.yearPillar.earthlyBranch),
    branchElement(chart.monthPillar.earthlyBranch),
    branchElement(chart.dayPillar.earthlyBranch),
    branchElement(chart.hourPillar.earthlyBranch),
  ];

  const counts: Record<Element, number> = {
    木: 0,
    火: 0,
    土: 0,
    金: 0,
    水: 0,
  };

  elements.forEach((element) => {
    counts[element] += 1;
  });

  return counts;
};

const hasRoot = (dayStem: HeavenlyStem, chart: BaziChart) => {
  const branches: EarthlyBranch[] = [
    chart.yearPillar.earthlyBranch as EarthlyBranch,
    chart.monthPillar.earthlyBranch as EarthlyBranch,
    chart.dayPillar.earthlyBranch as EarthlyBranch,
    chart.hourPillar.earthlyBranch as EarthlyBranch,
  ];

  return branches.some((branch) =>
    hiddenStems[branch].some((entry) => entry.stem === dayStem),
  );
};

const supportiveScore = (dayElement: Element, chart: BaziChart) => {
  let score = 0;

  if (isSupportiveElement(dayElement, stemElement(chart.yearPillar.heavenlyStem))) {
    score += positionWeights.yearStem;
  }
  if (isSupportiveElement(dayElement, branchElement(chart.yearPillar.earthlyBranch))) {
    score += positionWeights.yearBranch;
  }
  if (isSupportiveElement(dayElement, stemElement(chart.monthPillar.heavenlyStem))) {
    score += positionWeights.monthStem;
  }
  if (isSupportiveElement(dayElement, branchElement(chart.monthPillar.earthlyBranch))) {
    score += positionWeights.monthBranch;
  }
  if (isSupportiveElement(dayElement, branchElement(chart.dayPillar.earthlyBranch))) {
    score += positionWeights.dayBranch;
  }
  if (isSupportiveElement(dayElement, stemElement(chart.hourPillar.heavenlyStem))) {
    score += positionWeights.hourStem;
  }
  if (isSupportiveElement(dayElement, branchElement(chart.hourPillar.earthlyBranch))) {
    score += positionWeights.hourBranch;
  }

  return score;
};

interface StrengthOptions {
  followThreshold?: number;
  strongThreshold?: number;
  vibrantThreshold?: number;
}

export const calculateDayMasterStrength = (
  chart: BaziChart,
  options: StrengthOptions = {},
): DayMasterStrength => {
  const dayStem = chart.dayPillar.heavenlyStem as HeavenlyStem;
  const dayElement = heavenlyStemInfo[dayStem].element;
  const counts = getElementCounts(chart);
  const dominantCount = Math.max(...Object.values(counts));
  const score = supportiveScore(dayElement, chart);

  const followThreshold = options.followThreshold ?? 5;
  const strongThreshold = options.strongThreshold ?? 13;
  const vibrantThreshold = options.vibrantThreshold ?? 20;

  const noSupport = score === 0;
  const rooted = hasRoot(dayStem, chart);

  if (!rooted && noSupport && dominantCount >= followThreshold) {
    return "Follow";
  }

  if (score >= vibrantThreshold && !noSupport) {
    return "Vibrant";
  }

  if (score >= strongThreshold) {
    return "Strong";
  }

  return "Weak";
};
