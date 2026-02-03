import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FiveElementsChart from "../FiveElementsChart.js";

describe("FiveElementsChart", () => {
  it("renders element labels", () => {
    render(
      <FiveElementsChart
        weights={{ wood: 20, fire: 25, earth: 15, metal: 20, water: 20 }}
      />
    );

    expect(screen.getAllByText("木").length).toBeGreaterThan(0);
    expect(screen.getAllByText("火").length).toBeGreaterThan(0);
    expect(screen.getAllByText("土").length).toBeGreaterThan(0);
    expect(screen.getAllByText("金").length).toBeGreaterThan(0);
    expect(screen.getAllByText("水").length).toBeGreaterThan(0);
  });
});
