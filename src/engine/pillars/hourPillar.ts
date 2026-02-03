import { earthlyBranches, heavenlyStems, hiddenStems } from "../constants/index.js";
import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import type { Pillar } from "../types/chart.js";
import { dayPillar } from "./dayPillar.js";

const hourBranches: EarthlyBranch[] = [
  "子",
  "丑",
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
];

const ziHourStemByDayStem: Record<HeavenlyStem, HeavenlyStem> = {
  甲: "甲",
  己: "甲",
  乙: "丙",
  庚: "丙",
  丙: "戊",
  辛: "戊",
  丁: "庚",
  壬: "庚",
  戊: "壬",
  癸: "壬",
};

const getHourBranchIndex = (hour: number) =>
  hour === 23 ? 0 : Math.floor((hour + 1) / 2);

export const hourPillar = (date: Date): Pillar => {
  const hour = date.getUTCHours();
  const branchIndex = getHourBranchIndex(hour);
  const branch = hourBranches[branchIndex];
  if (!branch) {
    throw new Error("Failed to resolve hour branch");
  }

  const dayStem = dayPillar(date).heavenlyStem as HeavenlyStem;
  const ziStem = ziHourStemByDayStem[dayStem];
  const ziStemIndex = heavenlyStems.indexOf(ziStem);
  const stem = heavenlyStems[(ziStemIndex + branchIndex) % heavenlyStems.length];

  if (!stem) {
    throw new Error("Failed to resolve hour stem");
  }

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    hiddenStems: hiddenStems[branch],
  };
};
