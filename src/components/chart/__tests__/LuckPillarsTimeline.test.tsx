import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LuckPillarsTimeline from "../LuckPillarsTimeline.js";

describe("LuckPillarsTimeline", () => {
  it("highlights the current pillar", () => {
    render(
      <LuckPillarsTimeline
        currentAge={24}
        pillars={[
          {
            startAge: 10,
            endAge: 19,
            pillar: { heavenlyStem: "甲", earthlyBranch: "子" },
          },
          {
            startAge: 20,
            endAge: 29,
            pillar: { heavenlyStem: "乙", earthlyBranch: "丑" },
          },
          {
            startAge: 30,
            endAge: 39,
            pillar: { heavenlyStem: "丙", earthlyBranch: "寅" },
          },
        ]}
      />
    );

    const current = screen.getByTestId("luck-20-29");
    expect(current).toHaveAttribute("data-current", "true");
  });
});
