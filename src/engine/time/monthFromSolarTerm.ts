import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import { findSolarTermTime, solarTerms } from "./solarTerms.js";

const monthStartTerms: { name: string; branch: EarthlyBranch }[] = [
  { name: "立春", branch: "寅" },
  { name: "惊蛰", branch: "卯" },
  { name: "清明", branch: "辰" },
  { name: "立夏", branch: "巳" },
  { name: "芒种", branch: "午" },
  { name: "小暑", branch: "未" },
  { name: "立秋", branch: "申" },
  { name: "白露", branch: "酉" },
  { name: "寒露", branch: "戌" },
  { name: "立冬", branch: "亥" },
  { name: "大雪", branch: "子" },
  { name: "小寒", branch: "丑" },
];

const getTermDefinition = (name: string) => {
  const term = solarTerms.find((item) => item.name === name);
  if (!term) {
    throw new Error(`Unknown solar term: ${name}`);
  }
  return term;
};

export const monthFromSolarTerm = (date: Date): EarthlyBranch => {
  const year = date.getUTCFullYear();
  const candidates: { date: Date; branch: EarthlyBranch }[] = [];

  for (const term of monthStartTerms) {
    const definition = getTermDefinition(term.name);
    candidates.push({ date: findSolarTermTime(year, definition), branch: term.branch });
    candidates.push({
      date: findSolarTermTime(year - 1, definition),
      branch: term.branch,
    });
  }

  const targetTime = date.getTime();
  const eligible = candidates.filter((candidate) => candidate.date.getTime() <= targetTime);

  if (eligible.length === 0) {
    throw new Error("No solar term boundary found for date");
  }

  eligible.sort((a, b) => b.date.getTime() - a.date.getTime());
  return eligible[0].branch;
};
