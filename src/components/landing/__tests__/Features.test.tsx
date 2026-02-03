import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Features from "../Features.js";

describe("Features", () => {
  it("renders the required feature titles", () => {
    render(<Features />);

    expect(screen.getByText("AI 深度解读")).toBeInTheDocument();
    expect(screen.getByText("多重印证")).toBeInTheDocument();
    expect(screen.getByText("克制的美")).toBeInTheDocument();
    expect(screen.getByText("数据安全")).toBeInTheDocument();
    expect(screen.getByTestId("features-grid")).toHaveClass("md:grid-cols-2");
  });
});
