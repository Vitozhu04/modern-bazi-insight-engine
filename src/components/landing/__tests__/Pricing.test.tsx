import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Pricing from "../Pricing.js";

describe("Pricing", () => {
  it("renders the pricing tiers", () => {
    render(<Pricing />);

    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
  });
});
