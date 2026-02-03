import { earthlyBranches, heavenlyStems, hiddenStems } from "../constants/index.js";
import type { Pillar } from "../types/chart.js";
import { findSolarTermTime, solarTerms } from "../time/solarTerms.js";

const getYearIndex = (year: number) => {
  const baseYear = 1984;
  const diff = year - baseYear;
  const index = diff % 60;
  return index < 0 ? index + 60 : index;
};

const getLichunTime = (year: number) => {
  const lichun = solarTerms.find((term) => term.name === "立春");
  if (!lichun) {
    throw new Error("Solar term 立春 is missing");
  }
  return findSolarTermTime(year, lichun);
};

export const yearPillar = (date: Date): Pillar => {
  const year = date.getUTCFullYear();
  const lichunTime = getLichunTime(year);
  const pillarYear = date.getTime() < lichunTime.getTime() ? year - 1 : year;
  const cycleIndex = getYearIndex(pillarYear);
  const stem = heavenlyStems[cycleIndex % 10];
  const branch = earthlyBranches[cycleIndex % 12];

  if (!stem || !branch) {
    throw new Error("Failed to resolve year stem/branch");
  }

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    hiddenStems: hiddenStems[branch],
  };
};
