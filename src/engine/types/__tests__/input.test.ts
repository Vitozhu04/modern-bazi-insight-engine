import { describe, expect, expectTypeOf, it } from "vitest";

import type { BirthData } from "../input";

describe("BirthData", () => {
  it("accepts the expected shape", () => {
    const sample: BirthData = {
      gregorianDate: "1996-08-23T12:30:00",
      longitude: -122.4194,
      gender: "Male",
    };

    expect(sample.gregorianDate).toBeTypeOf("string");
    expect(sample.longitude).toBeTypeOf("number");
    expectTypeOf(sample.gender).toEqualTypeOf<"Male" | "Female">();
  });
});
