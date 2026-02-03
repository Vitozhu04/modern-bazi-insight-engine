import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LifeKLineChart from "../LifeKLineChart.js";

describe("LifeKLineChart", () => {
  it("renders chart container and controls", () => {
    render(
      <LifeKLineChart
        points={[
          { year: 2020, age: 20, score: 42, trend: "up" },
          { year: 2021, age: 21, score: 60, trend: "up" },
          { year: 2022, age: 22, score: 38, trend: "down" },
        ]}
      />
    );

    expect(screen.getByTestId("life-kline-chart")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zoom In" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zoom Out" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });
});
