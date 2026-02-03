import type { BirthData } from "../types/input.js";
import type { BaziChart } from "../types/chart.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import { calculateTenGods } from "./tenGodsCalculator.js";
import { dayPillar } from "./dayPillar.js";
import { hourPillar } from "./hourPillar.js";
import { monthPillar } from "./monthPillar.js";
import { yearPillar } from "./yearPillar.js";
import { calculateLuckPillars } from "./luckPillars.js";
import { findSolarTermTime, solarTerms } from "../time/solarTerms.js";
import { trueSolarTime } from "../time/trueSolarTime.js";

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

const getLastJieTermTime = (date: Date) => {
  const year = date.getUTCFullYear();
  const terms = [year - 1, year, year + 1].flatMap((termYear) =>
    jieTermNames.map((name) => {
      const term = solarTerms.find((item) => item.name === name);
      if (!term) {
        throw new Error(`Missing solar term definition for ${name}`);
      }
      return findSolarTermTime(termYear, term);
    }),
  );

  const targetTime = date.getTime();
  const eligible = terms.filter((termDate) => termDate.getTime() <= targetTime);
  if (eligible.length === 0) {
    throw new Error("No jie term boundary found for date");
  }

  eligible.sort((a, b) => b.getTime() - a.getTime());
  return eligible[0];
};

export const assembleBaziChart = (birthData: BirthData): BaziChart => {
  const baseDate = new Date(birthData.gregorianDate);
  const trueSolar = trueSolarTime(baseDate, birthData.longitude);
  const solarTermTime = getLastJieTermTime(trueSolar);

  const year = yearPillar(trueSolar);
  const month = monthPillar(trueSolar);
  const day = dayPillar(trueSolar);
  const hour = hourPillar(trueSolar);
  const tenGods = calculateTenGods({ year, month, day, hour });
  const tenYearLuckPillars = calculateLuckPillars({
    birthDate: trueSolar,
    gender: birthData.gender,
    yearStem: year.heavenlyStem as HeavenlyStem,
    monthPillar: month,
  });

  return {
    birthData,
    trueSolarTime: trueSolar.toISOString(),
    solarTermsTime: solarTermTime.toISOString(),
    yearPillar: year,
    monthPillar: month,
    dayPillar: day,
    hourPillar: hour,
    tenGods,
    tenYearLuckPillars,
  };
};
