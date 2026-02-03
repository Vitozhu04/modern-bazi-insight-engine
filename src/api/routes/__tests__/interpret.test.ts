import { describe, expect, it } from "vitest";

import { buildServer } from "../../server.js";
import { registerInterpretRoutes } from "../interpret.js";

describe("POST /api/v1/interpret", () => {
  it("streams a mock response when provider=mock", async () => {
    const app = buildServer();
    registerInterpretRoutes(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/interpret",
      payload: {
        userQuery: "career focus",
        provider: "mock",
        birthData: {
          gregorianDate: "2000-01-01T12:00:00Z",
          longitude: 120,
          gender: "Male",
        },
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain("data:");
  });

  it("rejects missing birthData/report", async () => {
    const app = buildServer();
    registerInterpretRoutes(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/interpret",
      payload: { userQuery: "career" },
    });

    expect(response.statusCode).toBe(400);
  });
});
