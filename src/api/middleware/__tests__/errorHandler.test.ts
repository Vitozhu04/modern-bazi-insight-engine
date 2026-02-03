import { describe, expect, it } from "vitest";

import { buildServer } from "../../server.js";
import { registerErrorHandler } from "../errorHandler.js";

describe("errorHandler", () => {
  it("formats errors consistently", async () => {
    const app = buildServer();
    registerErrorHandler(app);

    app.get("/boom", async () => {
      throw new Error("Boom");
    });

    const response = await app.inject({
      method: "GET",
      url: "/boom",
    });

    expect(response.statusCode).toBe(500);
    const body = response.json();
    expect(body.error).toBe("InternalError");
  });
});
