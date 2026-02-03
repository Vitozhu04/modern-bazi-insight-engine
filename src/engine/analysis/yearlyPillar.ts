import { earthlyBranches, heavenlyStems, hiddenStems } from "../constants/index.js";
import type { Pillar } from "../types/chart.js";

const baseYear = 1984;

export const yearlyPillar = (year: number): Pillar => {
  const offset = year - baseYear;
  const stem = heavenlyStems[((offset % 10) + 10) % 10];
  const branch = earthlyBranches[((offset % 12) + 12) % 12];

  if (!stem || !branch) {
    throw new Error("Failed to resolve yearly pillar");
  }

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    hiddenStems: hiddenStems[branch],
  };
};
