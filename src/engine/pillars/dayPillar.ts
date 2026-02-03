import { earthlyBranches, heavenlyStems, hiddenStems } from "../constants/index.js";
import type { Pillar } from "../types/chart.js";

const referenceDate = Date.UTC(1996, 7, 23);
const referenceStemIndex = heavenlyStems.indexOf("壬");
const referenceBranchIndex = earthlyBranches.indexOf("辰");

const getDayDifference = (date: Date) => {
  const targetMidnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return Math.floor((targetMidnight - referenceDate) / 86400000);
};

export const dayPillar = (date: Date): Pillar => {
  const dayOffset = getDayDifference(date);
  const stemIndex = (referenceStemIndex + dayOffset) % heavenlyStems.length;
  const branchIndex = (referenceBranchIndex + dayOffset) % earthlyBranches.length;

  const stem = heavenlyStems[(stemIndex + heavenlyStems.length) % heavenlyStems.length];
  const branch = earthlyBranches[(branchIndex + earthlyBranches.length) % earthlyBranches.length];

  if (!stem || !branch) {
    throw new Error("Failed to resolve day stem/branch");
  }

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    hiddenStems: hiddenStems[branch],
  };
};
