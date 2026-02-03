import { describe, expect, it } from "vitest";

import { earthlyBranchInfo, earthlyBranches } from "../earthlyBranches.js";

describe("earthlyBranches", () => {
  it("lists the 12 branches in order", () => {
    expect(earthlyBranches).toHaveLength(12);
    expect(earthlyBranches[0]).toBe("子");
    expect(earthlyBranches[11]).toBe("亥");
  });

  it("maps branches to elements, polarity, and animals", () => {
    expect(earthlyBranchInfo["子"]).toEqual({
      element: "水",
      polarity: "yang",
      animal: "Rat",
    });
    expect(earthlyBranchInfo["卯"]).toEqual({
      element: "木",
      polarity: "yin",
      animal: "Rabbit",
    });
    expect(earthlyBranchInfo["酉"]).toEqual({
      element: "金",
      polarity: "yin",
      animal: "Rooster",
    });
  });
});
