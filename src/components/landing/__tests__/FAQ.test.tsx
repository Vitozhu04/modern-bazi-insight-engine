import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FAQ from "../FAQ.js";

describe("FAQ", () => {
  it("renders the FAQ questions", () => {
    render(<FAQ />);

    expect(
      screen.getByText("What data do you need to calculate my chart?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("How accurate is the Life K-Line?")
    ).toBeInTheDocument();
  });
});
