import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TenGodsBadges from "../TenGodsBadges.js";

describe("TenGodsBadges", () => {
  it("renders the ten gods grid", () => {
    render(
      <TenGodsBadges
        tenGodsByPillar={{
          year: ["比肩", "劫财"],
          month: ["正财"],
          day: ["比肩"],
          hour: ["正印"],
        }}
      />
    );

    expect(screen.getAllByRole("listitem").length).toBe(10);
    expect(screen.getByText("比肩")).toBeInTheDocument();
    expect(screen.getByText("正印")).toBeInTheDocument();
  });
});
