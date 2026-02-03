import { describe, expect, it } from "vitest";

import { yearPillar } from "../yearPillar.js";

describe("yearPillar", () => {
  it("uses Lichun as the year boundary", () => {
    const beforeLichun = new Date(Date.UTC(1984, 1, 1, 12, 0, 0));
    const afterLichun = new Date(Date.UTC(1984, 1, 10, 12, 0, 0));

    const before = yearPillar(beforeLichun);
    const after = yearPillar(afterLichun);

    expect(before.heavenlyStem).toBe("癸");
    expect(before.earthlyBranch).toBe("亥");
    expect(after.heavenlyStem).toBe("甲");
    expect(after.earthlyBranch).toBe("子");
  });
});
