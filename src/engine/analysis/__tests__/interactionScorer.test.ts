import { describe, expect, it } from "vitest";

import { scoreElementInteraction } from "../interactionScorer.js";

describe("scoreElementInteraction", () => {
  it("scores generating relationships", () => {
    const score = scoreElementInteraction("木", "火", {
      generate: 10,
      control: -8,
      neutral: 0,
    });

    expect(score).toBe(10);
  });

  it("scores controlling relationships", () => {
    const score = scoreElementInteraction("水", "火", {
      generate: 10,
      control: -8,
      neutral: 0,
    });

    expect(score).toBe(-8);
  });

  it("returns neutral when no interaction", () => {
    const score = scoreElementInteraction("木", "木", {
      generate: 10,
      control: -8,
      neutral: 0,
    });

    expect(score).toBe(0);
  });
});
