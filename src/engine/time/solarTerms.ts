import { solarLongitude } from "./solarLongitude.js";

export interface SolarTermDefinition {
  name: string;
  longitude: number;
  approximateDayOfYear: number;
}

export interface SolarTermResult extends SolarTermDefinition {
  date: Date;
}

const solarTerms: SolarTermDefinition[] = [
  { name: "冬至", longitude: 270, approximateDayOfYear: 356 },
  { name: "小寒", longitude: 285, approximateDayOfYear: 6 },
  { name: "大寒", longitude: 300, approximateDayOfYear: 21 },
  { name: "立春", longitude: 315, approximateDayOfYear: 35 },
  { name: "雨水", longitude: 330, approximateDayOfYear: 50 },
  { name: "惊蛰", longitude: 345, approximateDayOfYear: 65 },
  { name: "春分", longitude: 0, approximateDayOfYear: 80 },
  { name: "清明", longitude: 15, approximateDayOfYear: 95 },
  { name: "谷雨", longitude: 30, approximateDayOfYear: 110 },
  { name: "立夏", longitude: 45, approximateDayOfYear: 126 },
  { name: "小满", longitude: 60, approximateDayOfYear: 141 },
  { name: "芒种", longitude: 75, approximateDayOfYear: 157 },
  { name: "夏至", longitude: 90, approximateDayOfYear: 172 },
  { name: "小暑", longitude: 105, approximateDayOfYear: 188 },
  { name: "大暑", longitude: 120, approximateDayOfYear: 203 },
  { name: "立秋", longitude: 135, approximateDayOfYear: 219 },
  { name: "处暑", longitude: 150, approximateDayOfYear: 234 },
  { name: "白露", longitude: 165, approximateDayOfYear: 249 },
  { name: "秋分", longitude: 180, approximateDayOfYear: 266 },
  { name: "寒露", longitude: 195, approximateDayOfYear: 281 },
  { name: "霜降", longitude: 210, approximateDayOfYear: 296 },
  { name: "立冬", longitude: 225, approximateDayOfYear: 312 },
  { name: "小雪", longitude: 240, approximateDayOfYear: 327 },
  { name: "大雪", longitude: 255, approximateDayOfYear: 342 },
];

const normalizeDelta = (delta: number) => ((delta + 540) % 360) - 180;

const getDateFromDayOfYear = (year: number, dayOfYear: number) =>
  new Date(Date.UTC(year, 0, dayOfYear, 0, 0, 0));

const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 86400000);

export const findSolarTermTime = (year: number, term: SolarTermDefinition): Date => {
  const baseDate = getDateFromDayOfYear(year, term.approximateDayOfYear);
  let start = addDays(baseDate, -3);
  let end = addDays(baseDate, 3);

  let startDelta = normalizeDelta(term.longitude - solarLongitude(start));
  let endDelta = normalizeDelta(term.longitude - solarLongitude(end));

  let attempts = 0;
  while (startDelta * endDelta > 0 && attempts < 10) {
    start = addDays(start, -2);
    end = addDays(end, 2);
    startDelta = normalizeDelta(term.longitude - solarLongitude(start));
    endDelta = normalizeDelta(term.longitude - solarLongitude(end));
    attempts += 1;
  }

  let left = start.getTime();
  let right = end.getTime();

  while (right - left > 60000) {
    const mid = new Date((left + right) / 2);
    const delta = normalizeDelta(term.longitude - solarLongitude(mid));

    if (delta > 0) {
      left = mid.getTime();
    } else {
      right = mid.getTime();
    }
  }

  return new Date((left + right) / 2);
};

export const getSolarTermsForYear = (year: number): SolarTermResult[] =>
  solarTerms.map((term) => ({
    ...term,
    date: findSolarTermTime(year, term),
  }));

export { solarTerms };
