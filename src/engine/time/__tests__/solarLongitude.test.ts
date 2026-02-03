import { describe, expect, it } from "vitest";

import { solarLongitude } from "../solarLongitude.js";

describe("solarLongitude", () => {
  it("tracks seasonal longitudes near equinoxes and solstices", () => {
    const closeTo = (value: number, target: number, tolerance: number) => {
      const diff = Math.abs(value - target);
      return Math.min(diff, 360 - diff) <= tolerance;
    };

    const marchEquinox = new Date(Date.UTC(2026, 2, 20, 12, 0, 0));
    const juneSolstice = new Date(Date.UTC(2026, 5, 21, 12, 0, 0));
    const septemberEquinox = new Date(Date.UTC(2026, 8, 23, 12, 0, 0));
    const decemberSolstice = new Date(Date.UTC(2026, 11, 21, 12, 0, 0));

    expect(closeTo(solarLongitude(marchEquinox), 0, 2)).toBe(true);
    expect(closeTo(solarLongitude(juneSolstice), 90, 2)).toBe(true);
    expect(closeTo(solarLongitude(septemberEquinox), 180, 2)).toBe(true);
    expect(closeTo(solarLongitude(decemberSolstice), 270, 2)).toBe(true);
  });
});
