import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnalysisCards from "../AnalysisCards.js";

describe("AnalysisCards", () => {
  it("renders summary cards and advice", () => {
    render(
      <AnalysisCards
        pattern="正官格"
        usefulGod="木"
        luckScore={78}
        advice={{
          title: "Actionable Advice",
          items: ["Focus on water elements", "Consider east-facing workspaces"],
        }}
      />
    );

    expect(screen.getByText("格局")).toBeInTheDocument();
    expect(screen.getByText("正官格")).toBeInTheDocument();
    expect(screen.getByText("喜用神")).toBeInTheDocument();
    expect(screen.getByText("木")).toBeInTheDocument();
    expect(screen.getByText("运势评分")).toBeInTheDocument();
    expect(screen.getByText("78")).toBeInTheDocument();
    expect(screen.getByText("Actionable Advice")).toBeInTheDocument();
  });
});
