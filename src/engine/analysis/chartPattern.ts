import { getTenGod } from "../constants/tenGods.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import type { BaziChart } from "../types/chart.js";

const patternByTenGod: Record<string, string> = {
  正官: "正官格",
  七杀: "七杀格",
  正印: "正印格",
  偏印: "偏印格",
  食神: "食神格",
  伤官: "伤官格",
  正财: "正财格",
  偏财: "偏财格",
};

export const determineChartPattern = (chart: BaziChart): string => {
  const monthTenGod = chart.tenGods.month[0];
  if (monthTenGod) {
    return patternByTenGod[monthTenGod] ?? `${monthTenGod}格`;
  }

  const dayStem = chart.dayPillar.heavenlyStem as HeavenlyStem;
  const monthStem = chart.monthPillar.heavenlyStem as HeavenlyStem;
  const computedTenGod = getTenGod(dayStem, monthStem);

  return patternByTenGod[computedTenGod] ?? `${computedTenGod}格`;
};
