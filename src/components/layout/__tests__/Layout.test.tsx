import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Layout from "../Layout.js";

describe("Layout", () => {
  it("renders children", () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
