import { describe, expect, it } from "vitest";

import { dayPillar } from "../dayPillar.js";

describe("dayPillar", () => {
  it("matches reference date for 壬辰", () => {
    const reference = new Date(Date.UTC(1996, 7, 23, 12, 0, 0));
    const pillar = dayPillar(reference);

    expect(pillar.heavenlyStem).toBe("壬");
    expect(pillar.earthlyBranch).toBe("辰");
  });

  it("advances one day in the cycle", () => {
    const reference = new Date(Date.UTC(1996, 7, 23, 12, 0, 0));
    const nextDay = new Date(Date.UTC(1996, 7, 24, 12, 0, 0));

    const today = dayPillar(reference);
    const tomorrow = dayPillar(nextDay);

    expect(today.heavenlyStem).toBe("壬");
    expect(today.earthlyBranch).toBe("辰");
    expect(tomorrow.heavenlyStem).toBe("癸");
    expect(tomorrow.earthlyBranch).toBe("巳");
  });
});
