import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChatMessage from "../ChatMessage.js";

describe("ChatMessage", () => {
  it("renders user and assistant messages", () => {
    render(
      <div>
        <ChatMessage role="user" content="Hello" />
        <ChatMessage role="assistant" content="**Bold**" />
      </div>
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Bold")).toBeInTheDocument();
  });

  it("renders loading indicator", () => {
    render(<ChatMessage role="assistant" content="" isLoading />);
    expect(screen.getByText("Typing")).toBeInTheDocument();
  });
});
