import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ChatInput from "../ChatInput.js";

describe("ChatInput", () => {
  it("renders placeholder and suggestion chips", () => {
    render(<ChatInput onSend={vi.fn()} />);

    expect(screen.getByPlaceholderText("问问AI")).toBeInTheDocument();
    expect(screen.getByText("事业发展")).toBeInTheDocument();
  });

  it("fills input when suggestion is clicked", () => {
    render(<ChatInput onSend={vi.fn()} />);

    fireEvent.click(screen.getByText("事业发展"));
    expect(screen.getByPlaceholderText("问问AI")).toHaveValue("事业发展");
  });
});
