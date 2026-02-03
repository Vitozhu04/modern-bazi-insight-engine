import { heavenlyStems, hiddenStems } from "../constants/index.js";
import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import type { Pillar } from "../types/chart.js";
import { monthFromSolarTerm } from "../time/monthFromSolarTerm.js";
import { yearPillar } from "./yearPillar.js";

const monthBranchesOrder: EarthlyBranch[] = [
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
  "子",
  "丑",
];

const firstMonthStemByYearStem: Record<HeavenlyStem, HeavenlyStem> = {
  甲: "丙",
  己: "丙",
  乙: "戊",
  庚: "戊",
  丙: "庚",
  辛: "庚",
  丁: "壬",
  壬: "壬",
  戊: "甲",
  癸: "甲",
};

export const monthPillar = (date: Date): Pillar => {
  const yearStem = yearPillar(date).heavenlyStem as HeavenlyStem;
  const monthBranch = monthFromSolarTerm(date);
  const monthIndex = monthBranchesOrder.indexOf(monthBranch);

  if (monthIndex === -1) {
    throw new Error("Failed to resolve month branch index");
  }

  const firstStem = firstMonthStemByYearStem[yearStem];
  const firstStemIndex = heavenlyStems.indexOf(firstStem);
  if (firstStemIndex === -1) {
    throw new Error("Failed to resolve first month stem index");
  }

  const stem = heavenlyStems[(firstStemIndex + monthIndex) % heavenlyStems.length];
  if (!stem) {
    throw new Error("Failed to resolve month stem");
  }

  return {
    heavenlyStem: stem,
    earthlyBranch: monthBranch,
    hiddenStems: hiddenStems[monthBranch],
  };
};
