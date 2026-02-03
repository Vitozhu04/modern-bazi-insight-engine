import { describe, expect, it } from "vitest";

import { monthPillar } from "../monthPillar.js";

describe("monthPillar", () => {
  it("derives month stem from year stem using 五虎遁", () => {
    const tigerMonthDate = new Date(Date.UTC(1984, 1, 10, 12, 0, 0));
    const rabbitMonthDate = new Date(Date.UTC(1984, 2, 10, 12, 0, 0));

    const tigerMonth = monthPillar(tigerMonthDate);
    const rabbitMonth = monthPillar(rabbitMonthDate);

    expect(tigerMonth.heavenlyStem).toBe("丙");
    expect(tigerMonth.earthlyBranch).toBe("寅");
    expect(rabbitMonth.heavenlyStem).toBe("丁");
    expect(rabbitMonth.earthlyBranch).toBe("卯");
  });
});
