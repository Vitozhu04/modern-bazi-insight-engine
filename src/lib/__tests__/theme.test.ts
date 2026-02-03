import { describe, expect, it } from "vitest";
import { theme } from "../theme.js";

describe("theme tokens", () => {
  it("defines brand and surface colors", () => {
    expect(theme.colors.brand.primary).toBeDefined();
    expect(theme.colors.surface.background).toBeDefined();
    expect(theme.colors.surface.foreground).toBeDefined();
  });

  it("defines typography scales", () => {
    expect(theme.typography.fonts.sans).toBeDefined();
    expect(theme.typography.scale.lg).toBeDefined();
  });
});
