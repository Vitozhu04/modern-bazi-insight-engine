import { describe, expect, it } from "vitest";

import { equationOfTime } from "../equationOfTime.js";
import { trueSolarTime } from "../trueSolarTime.js";

describe("trueSolarTime", () => {
  it("uses equation of time when longitude is zero", () => {
    const date = new Date(Date.UTC(2026, 0, 1, 12, 0, 0));
    const eotMinutes = equationOfTime(date);

    const result = trueSolarTime(date, 0);
    const expected = new Date(date.getTime() + eotMinutes * 60000);

    expect(result.getTime()).toBeCloseTo(expected.getTime(), 0);
  });

  it("adds 4 minutes per degree of longitude difference", () => {
    const date = new Date(Date.UTC(2026, 0, 1, 12, 0, 0));
    const eotMinutes = equationOfTime(date);

    const eastResult = trueSolarTime(date, 1);
    const westResult = trueSolarTime(date, -1);

    const eastExpected = new Date(date.getTime() + (eotMinutes + 4) * 60000);
    const westExpected = new Date(date.getTime() + (eotMinutes - 4) * 60000);

    expect(eastResult.getTime()).toBeCloseTo(eastExpected.getTime(), 0);
    expect(westResult.getTime()).toBeCloseTo(westExpected.getTime(), 0);
  });
});
