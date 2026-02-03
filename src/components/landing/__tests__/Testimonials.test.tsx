import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Testimonials from "../Testimonials.js";

describe("Testimonials", () => {
  it("renders testimonial names", () => {
    render(<Testimonials />);

    expect(screen.getAllByText("Lina Chen").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Marcus Ng").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sofia Park").length).toBeGreaterThan(0);
  });
});
