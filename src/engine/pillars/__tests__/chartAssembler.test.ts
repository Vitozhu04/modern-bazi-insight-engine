import { describe, expect, it } from "vitest";

import type { BirthData } from "../../types/input.js";
import { assembleBaziChart } from "../chartAssembler.js";
import { calculateTenGods } from "../tenGodsCalculator.js";
import { dayPillar } from "../dayPillar.js";
import { hourPillar } from "../hourPillar.js";
import { monthPillar } from "../monthPillar.js";
import { yearPillar } from "../yearPillar.js";
import { trueSolarTime } from "../../time/trueSolarTime.js";

describe("assembleBaziChart", () => {
  it("assembles a complete chart", () => {
    const birthData: BirthData = {
      gregorianDate: "2000-01-01T12:00:00Z",
      longitude: 120,
      gender: "Male",
    };

    const chart = assembleBaziChart(birthData);
    const baseDate = new Date(birthData.gregorianDate);
    const trueSolar = trueSolarTime(baseDate, birthData.longitude);

    expect(chart.birthData).toEqual(birthData);
    expect(chart.trueSolarTime).toBe(trueSolar.toISOString());

    const expectedYear = yearPillar(trueSolar);
    const expectedMonth = monthPillar(trueSolar);
    const expectedDay = dayPillar(trueSolar);
    const expectedHour = hourPillar(trueSolar);

    expect(chart.yearPillar).toEqual(expectedYear);
    expect(chart.monthPillar).toEqual(expectedMonth);
    expect(chart.dayPillar).toEqual(expectedDay);
    expect(chart.hourPillar).toEqual(expectedHour);

    expect(chart.tenGods).toEqual(
      calculateTenGods({
        year: expectedYear,
        month: expectedMonth,
        day: expectedDay,
        hour: expectedHour,
      }),
    );

    expect(chart.tenYearLuckPillars.length).toBeGreaterThan(0);
  });
});
