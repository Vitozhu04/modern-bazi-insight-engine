import { earthlyBranches, heavenlyStems, hiddenStems } from "../constants/index.js";
import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import type { Pillar, TenYearLuckPillar } from "../types/chart.js";
import { findSolarTermTime, solarTerms } from "../time/solarTerms.js";

interface LuckPillarInput {
  birthDate: Date;
  gender: "Male" | "Female";
  yearStem: HeavenlyStem;
  monthPillar: Pillar;
  count?: number;
}

const yangStems: HeavenlyStem[] = ["甲", "丙", "戊", "庚", "壬"];

const jieTermNames = [
  "立春",
  "惊蛰",
  "清明",
  "立夏",
  "芒种",
  "小暑",
  "立秋",
  "白露",
  "寒露",
  "立冬",
  "大雪",
  "小寒",
];

const getCycleIndex = (stem: HeavenlyStem, branch: EarthlyBranch) => {
  for (let index = 0; index < 60; index += 1) {
    if (heavenlyStems[index % 10] === stem && earthlyBranches[index % 12] === branch) {
      return index;
    }
  }
  throw new Error("Stem/branch combination not found in cycle");
};

const getJieTermsForYear = (year: number) =>
  jieTermNames.map((name) => {
    const term = solarTerms.find((item) => item.name === name);
    if (!term) {
      throw new Error(`Missing solar term definition for ${name}`);
    }
    return { name, date: findSolarTermTime(year, term) };
  });

const getReferenceJieTime = (birthDate: Date, forward: boolean) => {
  const year = birthDate.getUTCFullYear();
  const terms = [
    ...getJieTermsForYear(year - 1),
    ...getJieTermsForYear(year),
    ...getJieTermsForYear(year + 1),
  ];

  const birthTime = birthDate.getTime();
  const comparator = forward
    ? (termTime: number) => termTime >= birthTime
    : (termTime: number) => termTime <= birthTime;

  const eligible = terms.filter((term) => comparator(term.date.getTime()));
  if (eligible.length === 0) {
    throw new Error("No eligible jie term found for birth date");
  }

  eligible.sort((a, b) => a.date.getTime() - b.date.getTime());
  return forward ? eligible[0].date : eligible[eligible.length - 1].date;
};

const getStartAge = (birthDate: Date, referenceJie: Date) => {
  const diffDays = Math.abs(referenceJie.getTime() - birthDate.getTime()) / 86400000;
  return diffDays / 3;
};

const buildPillar = (cycleIndex: number): Pillar => {
  const stem = heavenlyStems[cycleIndex % 10];
  const branch = earthlyBranches[cycleIndex % 12];
  if (!stem || !branch) {
    throw new Error("Failed to resolve pillar from cycle index");
  }
  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    hiddenStems: hiddenStems[branch],
  };
};

export const calculateLuckPillars = ({
  birthDate,
  gender,
  yearStem,
  monthPillar,
  count = 8,
}: LuckPillarInput): TenYearLuckPillar[] => {
  const isYang = yangStems.includes(yearStem);
  const forward =
    (gender === "Male" && isYang) || (gender === "Female" && !isYang);

  const referenceJie = getReferenceJieTime(birthDate, forward);
  const startAge = getStartAge(birthDate, referenceJie);
  const monthIndex = getCycleIndex(
    monthPillar.heavenlyStem as HeavenlyStem,
    monthPillar.earthlyBranch as EarthlyBranch,
  );

  const directionStep = forward ? 1 : -1;

  return Array.from({ length: count }, (_, index) => {
    const pillarIndex = (monthIndex + directionStep * (index + 1) + 60) % 60;
    return {
      startAge: startAge + index * 10,
      endAge: startAge + (index + 1) * 10,
      pillar: buildPillar(pillarIndex),
    };
  });
};
