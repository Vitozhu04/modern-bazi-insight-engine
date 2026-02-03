import { heavenlyStemInfo, type HeavenlyStem } from "../constants/heavenlyStems.js";
import { hiddenStems, type HiddenStemEntry } from "../constants/hiddenStems.js";
import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import type { Element } from "../constants/fiveElements.js";
import type { BaziChart } from "../types/chart.js";
import type { FiveElementsWeight } from "../types/analysis.js";

const stemWeights = {
  year: 2,
  month: 3,
  day: 3,
  hour: 3,
} as const;

const branchWeights = {
  year: 1,
  month: 10,
  day: 3,
  hour: 3,
} as const;

const emptyTotals = (): Record<Element, number> => ({
  木: 0,
  火: 0,
  土: 0,
  金: 0,
  水: 0,
});

export const calculateFiveElementsWeight = (chart: BaziChart): FiveElementsWeight => {
  const totals = emptyTotals();

  const stems: Record<keyof typeof stemWeights, HeavenlyStem> = {
    year: chart.yearPillar.heavenlyStem,
    month: chart.monthPillar.heavenlyStem,
    day: chart.dayPillar.heavenlyStem,
    hour: chart.hourPillar.heavenlyStem,
  } as Record<keyof typeof stemWeights, HeavenlyStem>;

  (Object.entries(stems) as [keyof typeof stemWeights, HeavenlyStem][]).forEach(
    ([key, stem]) => {
      const element = heavenlyStemInfo[stem].element;
      totals[element] += stemWeights[key];
    },
  );

  const branches: Record<keyof typeof branchWeights, EarthlyBranch> = {
    year: chart.yearPillar.earthlyBranch,
    month: chart.monthPillar.earthlyBranch,
    day: chart.dayPillar.earthlyBranch,
    hour: chart.hourPillar.earthlyBranch,
  } as Record<keyof typeof branchWeights, EarthlyBranch>;

  (Object.entries(branches) as [keyof typeof branchWeights, EarthlyBranch][]).forEach(
    ([key, branch]) => {
      const weight = branchWeights[key];
      hiddenStems[branch].forEach((entry: HiddenStemEntry) => {
        const element = heavenlyStemInfo[entry.stem].element;
        totals[element] += weight * entry.weight;
      });
    },
  );

  const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
  return {
    wood: (totals.木 / total) * 100,
    fire: (totals.火 / total) * 100,
    earth: (totals.土 / total) * 100,
    metal: (totals.金 / total) * 100,
    water: (totals.水 / total) * 100,
  };
};
