import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button.js";

describe("Button", () => {
  it("renders children and className", () => {
    render(
      <Button className="custom-class" type="button">
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-class");
  });
});
