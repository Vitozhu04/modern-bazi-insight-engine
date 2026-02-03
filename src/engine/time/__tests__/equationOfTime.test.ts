import { describe, expect, it } from "vitest";

import { equationOfTime } from "../equationOfTime.js";

describe("equationOfTime", () => {
  it("matches NOAA approximation for sample dates", () => {
    const jan1 = new Date(Date.UTC(2026, 0, 1, 12, 0, 0));
    const feb11 = new Date(Date.UTC(2026, 1, 11, 12, 0, 0));
    const nov3 = new Date(Date.UTC(2026, 10, 3, 12, 0, 0));

    expect(equationOfTime(jan1)).toBeCloseTo(-2.90417, 4);
    expect(equationOfTime(feb11)).toBeCloseTo(-14.19975, 4);
    expect(equationOfTime(nov3)).toBeCloseTo(16.36526, 4);
  });
});
