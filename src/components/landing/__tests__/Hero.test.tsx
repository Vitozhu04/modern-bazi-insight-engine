import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../Hero.js";

describe("Hero", () => {
  it("renders the headline, tagline, and CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: "Modern Bazi Insight Engine" })
    ).toBeInTheDocument();
    expect(screen.getByText("观象入元，见心知命")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "获取我的命盘分析" })
    ).toBeInTheDocument();
  });
});
