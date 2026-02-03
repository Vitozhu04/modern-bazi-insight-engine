import { describe, expect, it } from "vitest";

import type { BirthData } from "../../types/input.js";
import { assembleFullReport } from "../reportAssembler.js";

describe("assembleFullReport", () => {
  it("builds a full report", () => {
    const birthData: BirthData = {
      gregorianDate: "2000-01-01T12:00:00Z",
      longitude: 120,
      gender: "Male",
    };

    const report = assembleFullReport(birthData);
    expect(report.baziChart.birthData).toEqual(birthData);
    expect(report.lifeKline.length).toBeGreaterThan(0);
    expect(report.fiveElements.wood).toBeTypeOf("number");
    expect(report.usefulGod.favorableGods.length).toBeGreaterThan(0);
    expect(report.actionableAdvice.colors.length).toBeGreaterThan(0);
    expect(report.insightTags.career.length).toBeGreaterThan(0);
  });
});
