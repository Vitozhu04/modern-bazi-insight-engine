import { describe, expect, it } from "vitest";

import { monthFromSolarTerm } from "../monthFromSolarTerm.js";

describe("monthFromSolarTerm", () => {
  it("maps dates to expected month branches", () => {
    const afterLichun = new Date(Date.UTC(2026, 1, 10, 0, 0, 0));
    const afterXiaohan = new Date(Date.UTC(2026, 0, 12, 0, 0, 0));
    const beforeXiaohan = new Date(Date.UTC(2026, 0, 2, 0, 0, 0));

    expect(monthFromSolarTerm(afterLichun)).toBe("寅");
    expect(monthFromSolarTerm(afterXiaohan)).toBe("丑");
    expect(monthFromSolarTerm(beforeXiaohan)).toBe("子");
  });
});
