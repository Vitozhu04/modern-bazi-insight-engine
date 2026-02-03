import { describe, expect, it } from "vitest";

import {
  controllingCycle,
  elements,
  generatingCycle,
} from "../fiveElements.js";

describe("fiveElements", () => {
  it("lists the five elements in order", () => {
    expect(elements).toEqual(["木", "火", "土", "金", "水"]);
  });

  it("defines the generating cycle", () => {
    expect(generatingCycle).toEqual(["木", "火", "土", "金", "水"]);
  });

  it("defines the controlling cycle", () => {
    expect(controllingCycle).toEqual(["木", "土", "水", "火", "金"]);
  });
});
