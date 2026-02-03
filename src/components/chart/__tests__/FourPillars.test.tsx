import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FourPillars from "../FourPillars.js";

describe("FourPillars", () => {
  it("renders pillar labels and hidden stems", () => {
    render(
      <FourPillars
        pillars={{
          year: {
            heavenlyStem: "丙",
            earthlyBranch: "子",
            hiddenStems: [{ stem: "癸", weight: 1 }],
          },
          month: {
            heavenlyStem: "丁",
            earthlyBranch: "丑",
            hiddenStems: [
              { stem: "己", weight: 0.6 },
              { stem: "癸", weight: 0.4 },
            ],
          },
          day: {
            heavenlyStem: "戊",
            earthlyBranch: "寅",
            hiddenStems: [
              { stem: "甲", weight: 0.7 },
              { stem: "丙", weight: 0.3 },
            ],
          },
          hour: {
            heavenlyStem: "己",
            earthlyBranch: "卯",
            hiddenStems: [{ stem: "乙", weight: 1 }],
          },
        }}
      />
    );

    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Hour")).toBeInTheDocument();
    expect(screen.getByText("丙")).toBeInTheDocument();
    expect(screen.getByText("子")).toBeInTheDocument();
    expect(screen.getAllByText(/癸/).length).toBeGreaterThan(0);
  });
});
