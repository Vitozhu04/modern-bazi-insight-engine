import { describe, expect, it } from "vitest";

import { getTenGod, tenGods } from "../tenGods.js";

describe("tenGods", () => {
  it("lists all ten gods", () => {
    expect(tenGods).toHaveLength(10);
    expect(tenGods).toContain("比肩");
    expect(tenGods).toContain("正印");
  });

  it("calculates ten gods for known stem pairs", () => {
    expect(getTenGod("甲", "甲")).toBe("比肩");
    expect(getTenGod("甲", "乙")).toBe("劫财");
    expect(getTenGod("甲", "庚")).toBe("七杀");
    expect(getTenGod("丁", "辛")).toBe("偏财");
    expect(getTenGod("辛", "丙")).toBe("正官");
    expect(getTenGod("癸", "乙")).toBe("食神");
  });
});
