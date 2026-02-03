import { describe, expect, it } from "vitest";

import { birthDataSchema } from "../validation.js";

describe("birthDataSchema", () => {
  it("accepts valid input", () => {
    const result = birthDataSchema.safeParse({
      gregorianDate: "2000-01-01T12:00:00Z",
      longitude: 120,
      gender: "Male",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid longitude", () => {
    const result = birthDataSchema.safeParse({
      gregorianDate: "2000-01-01T12:00:00Z",
      longitude: 200,
      gender: "Male",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid date", () => {
    const result = birthDataSchema.safeParse({
      gregorianDate: "not-a-date",
      longitude: 120,
      gender: "Male",
    });

    expect(result.success).toBe(false);
  });
});
