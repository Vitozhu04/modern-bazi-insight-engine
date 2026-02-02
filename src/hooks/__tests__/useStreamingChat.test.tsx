import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useStreamingChat } from "../useStreamingChat.js";

const TestHarness = () => {
  const { messages, sendMessage, isStreaming } = useStreamingChat({
    endpoint: "/api/chat",
  });

  return (
    <div>
      <button type="button" onClick={() => sendMessage("Hello")}>Send</button>
      <div data-testid="messages">
        {messages.map((message: { content: string }) => message.content).join("|")}
      </div>
      <div data-testid="streaming">{isStreaming ? "yes" : "no"}</div>
    </div>
  );
};

describe("useStreamingChat", () => {
  it("streams assistant response chunks", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("data: Hello \n"));
        controller.enqueue(encoder.encode("data: world\n"));
        controller.close();
      },
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } })
      )
    );

    render(<TestHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByTestId("messages")).toHaveTextContent(
      "Hello world"
    );
  });
});
