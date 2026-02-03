import type { FastifyInstance } from "fastify";

import { assembleFullReport } from "../../engine/analysis/reportAssembler.js";
import { birthDataSchema } from "../validation.js";

export const registerAnalyzeRoutes = (app: FastifyInstance) => {
  app.post("/api/v1/analyze", async (request, reply) => {
    const parsed = birthDataSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: "InvalidRequest",
        details: parsed.error.flatten(),
      });
    }

    const report = assembleFullReport(parsed.data);
    return reply.send(report);
  });
};
