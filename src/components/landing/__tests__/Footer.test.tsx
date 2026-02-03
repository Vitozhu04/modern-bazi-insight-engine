import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../Footer.js";

describe("Footer", () => {
  it("renders the footer brand", () => {
    render(<Footer />);

    expect(screen.getByText("Modern Bazi Insight Engine")).toBeInTheDocument();
  });
});
