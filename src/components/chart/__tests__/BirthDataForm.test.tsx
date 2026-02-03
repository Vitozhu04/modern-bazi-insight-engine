import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BirthDataForm from "../BirthDataForm.js";

describe("BirthDataForm", () => {
  it("renders required fields", () => {
    render(<BirthDataForm />);

    expect(screen.getByLabelText("Birth date")).toBeInTheDocument();
    expect(screen.getByLabelText("Birth time")).toBeInTheDocument();
    expect(screen.getByLabelText("Longitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
  });

  it("shows validation errors on submit", () => {
    render(<BirthDataForm />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Date is required")).toBeInTheDocument();
    expect(screen.getByText("Time is required")).toBeInTheDocument();
    expect(screen.getByText("Longitude is required")).toBeInTheDocument();
    expect(screen.getByText("Gender is required")).toBeInTheDocument();
  });
});
