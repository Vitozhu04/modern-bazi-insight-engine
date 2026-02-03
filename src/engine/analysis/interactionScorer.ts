import type { Element } from "../constants/fiveElements.js";
import { controllingCycle, generatingCycle } from "../constants/fiveElements.js";

export interface InteractionWeights {
  generate: number;
  control: number;
  neutral: number;
}

const isGenerate = (from: Element, to: Element) => {
  const fromIndex = generatingCycle.indexOf(from);
  const toIndex = generatingCycle.indexOf(to);
  return (fromIndex + 1) % generatingCycle.length === toIndex;
};

const isControl = (from: Element, to: Element) => {
  const fromIndex = controllingCycle.indexOf(from);
  const toIndex = controllingCycle.indexOf(to);
  return (fromIndex + 1) % controllingCycle.length === toIndex;
};

export const scoreElementInteraction = (
  from: Element,
  to: Element,
  weights: InteractionWeights,
): number => {
  if (isGenerate(from, to)) {
    return weights.generate;
  }

  if (isControl(from, to)) {
    return weights.control;
  }

  return weights.neutral;
};
