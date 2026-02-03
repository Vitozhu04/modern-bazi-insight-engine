import { describe, expect, it } from "vitest";

import { solarLongitude } from "../solarLongitude.js";
import { findSolarTermTime, solarTerms } from "../solarTerms.js";

describe("solarTerms", () => {
  it("finds times close to target longitudes", () => {
    const lichun = solarTerms.find((term) => term.name === "立春");
    const dongzhi = solarTerms.find((term) => term.name === "冬至");

    if (!lichun || !dongzhi) {
      throw new Error("Missing solar term definitions");
    }

    const lichunDate = findSolarTermTime(2026, lichun);
    const dongzhiDate = findSolarTermTime(2026, dongzhi);

    const lichunLongitude = solarLongitude(lichunDate);
    const dongzhiLongitude = solarLongitude(dongzhiDate);

    const lichunDelta = Math.abs(((lichun.longitude - lichunLongitude + 540) % 360) - 180);
    const dongzhiDelta = Math.abs(((dongzhi.longitude - dongzhiLongitude + 540) % 360) - 180);

    expect(lichunDelta).toBeLessThan(0.05);
    expect(dongzhiDelta).toBeLessThan(0.05);
  });

  it("returns dates near the expected season", () => {
    const lichun = solarTerms.find((term) => term.name === "立春");
    if (!lichun) {
      throw new Error("Missing 立春 definition");
    }

    const lichunDate = findSolarTermTime(2026, lichun);
    const month = lichunDate.getUTCMonth();

    expect([1]).toContain(month);
  });
});
