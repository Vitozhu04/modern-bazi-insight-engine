import type { BaziChart, Pillar } from "../types/chart.js";
import type { UsefulGodAnalysis } from "../types/analysis.js";
import { heavenlyStemInfo, type HeavenlyStem } from "../constants/heavenlyStems.js";
import type { Element } from "../constants/fiveElements.js";
import { scoreElementInteraction, type InteractionWeights } from "./interactionScorer.js";

interface AnnualLuckScoreInput {
  chart: BaziChart;
  yearlyPillar: Pillar;
  luckPillar: Pillar;
  usefulGod: UsefulGodAnalysis;
  weights?: InteractionWeights;
  favorableBonus?: number;
  unfavorablePenalty?: number;
}

const defaultWeights: InteractionWeights = {
  generate: 10,
  control: -12,
  neutral: 0,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const elementOfStem = (stem: string): Element =>
  heavenlyStemInfo[stem as HeavenlyStem].element;

export const calculateAnnualLuckScore = ({
  chart,
  yearlyPillar,
  luckPillar,
  usefulGod,
  weights = defaultWeights,
  favorableBonus = 8,
  unfavorablePenalty = 8,
}: AnnualLuckScoreInput): number => {
  const dayElement = elementOfStem(chart.dayPillar.heavenlyStem);
  const yearlyElement = elementOfStem(yearlyPillar.heavenlyStem);
  const luckElement = elementOfStem(luckPillar.heavenlyStem);

  let score = 50;
  score += scoreElementInteraction(yearlyElement, dayElement, weights);
  score += scoreElementInteraction(yearlyElement, luckElement, weights);

  if (usefulGod.favorableGods.includes(yearlyElement)) {
    score += favorableBonus;
  }

  if (usefulGod.unfavorableGods.includes(yearlyElement)) {
    score -= unfavorablePenalty;
  }

  return clamp(score, 0, 100);
};
