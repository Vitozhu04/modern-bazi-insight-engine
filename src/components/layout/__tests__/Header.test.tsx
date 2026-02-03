import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../Header.js";

describe("Header", () => {
  it("renders brand and navigation", () => {
    render(<Header />);

    expect(screen.getByText("Modern Bazi")).toBeInTheDocument();
    expect(screen.getByText("Analyze")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle theme" })).toBeInTheDocument();
  });
});
