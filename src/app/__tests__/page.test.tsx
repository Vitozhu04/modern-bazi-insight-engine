import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../page.js";

describe("HomePage", () => {
  it("renders the landing headline", () => {
    render(<HomePage />);
    expect(
      screen.getAllByText("Modern Bazi Insight Engine").length
    ).toBeGreaterThan(0);
    expect(screen.getByText("Core Capabilities")).toBeInTheDocument();
  });
});
