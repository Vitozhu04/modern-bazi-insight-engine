import { describe, expect, it } from "vitest";

import { hourPillar } from "../hourPillar.js";

describe("hourPillar", () => {
  it("maps hour branches based on time ranges", () => {
    const ziLate = new Date(Date.UTC(2000, 0, 1, 23, 30, 0));
    const ziEarly = new Date(Date.UTC(2000, 0, 1, 0, 30, 0));
    const chou = new Date(Date.UTC(2000, 0, 1, 1, 30, 0));

    expect(hourPillar(ziLate).earthlyBranch).toBe("子");
    expect(hourPillar(ziEarly).earthlyBranch).toBe("子");
    expect(hourPillar(chou).earthlyBranch).toBe("丑");
  });

  it("derives hour stem from day stem using 五鼠遁", () => {
    const ziHour = new Date(Date.UTC(2000, 0, 1, 23, 30, 0));
    const chouHour = new Date(Date.UTC(2000, 0, 1, 1, 30, 0));
    const shenHour = new Date(Date.UTC(2000, 0, 1, 15, 30, 0));

    const ziPillar = hourPillar(ziHour);
    const chouPillar = hourPillar(chouHour);
    const shenPillar = hourPillar(shenHour);

    expect(ziPillar.heavenlyStem).toBe("丙");
    expect(ziPillar.earthlyBranch).toBe("子");
    expect(chouPillar.heavenlyStem).toBe("丁");
    expect(chouPillar.earthlyBranch).toBe("丑");
    expect(shenPillar.heavenlyStem).toBe("甲");
    expect(shenPillar.earthlyBranch).toBe("申");
  });
});
