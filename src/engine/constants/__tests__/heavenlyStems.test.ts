import { describe, expect, it } from "vitest";

import { heavenlyStemInfo, heavenlyStems } from "../heavenlyStems.js";

describe("heavenlyStems", () => {
  it("lists the 10 stems in order", () => {
    expect(heavenlyStems).toHaveLength(10);
    expect(heavenlyStems[0]).toBe("甲");
    expect(heavenlyStems[9]).toBe("癸");
  });

  it("maps stems to elements and polarity", () => {
    expect(heavenlyStemInfo["甲"]).toEqual({ element: "木", polarity: "yang" });
    expect(heavenlyStemInfo["乙"]).toEqual({ element: "木", polarity: "yin" });
    expect(heavenlyStemInfo["丙"]).toEqual({ element: "火", polarity: "yang" });
    expect(heavenlyStemInfo["癸"]).toEqual({ element: "水", polarity: "yin" });
  });
});
