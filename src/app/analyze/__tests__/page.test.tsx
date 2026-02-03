import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnalyzePage from "../page.js";

describe("AnalyzePage", () => {
  it("renders the analysis workspace", () => {
    render(<AnalyzePage />);
    expect(screen.getByText("Analysis Workspace")).toBeInTheDocument();
    expect(screen.getByText("AI Guidance")).toBeInTheDocument();
    expect(screen.getByTestId("analyze-grid")).toHaveClass("lg:grid-cols-[1.1fr_0.9fr]");
  });
});
