import { describe, expect, it } from "vitest";

import { generateInsightTags } from "../insightTags.js";

describe("generateInsightTags", () => {
  it("produces career, wealth, and personality tags", () => {
    const tags = generateInsightTags({
      year: ["正官"],
      month: ["正财"],
      day: ["比肩"],
      hour: ["食神"],
    });

    expect(tags.career.length).toBeGreaterThan(0);
    expect(tags.wealth.length).toBeGreaterThan(0);
    expect(tags.personality.length).toBeGreaterThan(0);
    expect(tags.career).toContain("discipline");
    expect(tags.wealth).toContain("steady-income");
    expect(tags.personality).toContain("independent");
  });
});
