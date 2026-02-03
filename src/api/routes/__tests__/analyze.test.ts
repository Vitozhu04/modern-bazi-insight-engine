import { describe, expect, it } from "vitest";

import { buildServer } from "../../server.js";
import { registerAnalyzeRoutes } from "../analyze.js";

describe("POST /api/v1/analyze", () => {
  it("returns a full report", async () => {
    const app = buildServer();
    registerAnalyzeRoutes(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/analyze",
      payload: {
        gregorianDate: "2000-01-01T12:00:00Z",
        longitude: 120,
        gender: "Male",
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.baziChart).toBeDefined();
    expect(body.lifeKline).toBeDefined();
  });
});
