import type { BirthData } from "../types/input.js";
import type { FullReport } from "../types/analysis.js";
import { assembleBaziChart } from "../pillars/chartAssembler.js";
import { calculateFiveElementsWeight } from "./fiveElementsWeight.js";
import { determineUsefulGod } from "./usefulGod.js";
import { generateInsightTags } from "./insightTags.js";
import { generateAdvice } from "./adviceGenerator.js";
import { generateLifeKline } from "./lifeKline.js";

export const assembleFullReport = (birthData: BirthData): FullReport => {
  const baziChart = assembleBaziChart(birthData);
  const fiveElements = calculateFiveElementsWeight(baziChart);
  const usefulGod = determineUsefulGod(baziChart);
  const actionableAdvice = generateAdvice(usefulGod);
  const insightTags = generateInsightTags(baziChart.tenGods);
  const lifeKline = generateLifeKline(baziChart);

  return {
    baziChart,
    lifeKline,
    fiveElements,
    usefulGod,
    actionableAdvice,
    insightTags,
  };
};
