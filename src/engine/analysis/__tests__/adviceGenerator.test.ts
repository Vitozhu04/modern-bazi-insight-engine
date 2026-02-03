import { describe, expect, it } from "vitest";

import { generateAdvice } from "../adviceGenerator.js";

describe("generateAdvice", () => {
  it("returns advice based on favorable elements", () => {
    const advice = generateAdvice({
      dayMasterStrength: "Strong",
      pattern: "正官格",
      favorableGods: ["火", "土"],
      unfavorableGods: ["金"],
    });

    expect(advice.colors).toContain("red");
    expect(advice.colors).toContain("yellow");
    expect(advice.directions).toContain("south");
    expect(advice.directions).toContain("center");
    expect(advice.accessories.length).toBeGreaterThan(0);
  });
});
