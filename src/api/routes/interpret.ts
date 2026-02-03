import type { FastifyInstance } from "fastify";
import { z } from "zod";

import type { FullReport } from "../../engine/types/analysis.js";
import { assembleFullReport } from "../../engine/analysis/reportAssembler.js";
import { interpretReport } from "../../interpreter/orchestrator.js";
import { DeepSeekProvider } from "../../interpreter/providers/deepseek.js";
import { GeminiProvider } from "../../interpreter/providers/gemini.js";
import { assertProvider, type LlmProvider } from "../../interpreter/providers/types.js";
import { birthDataSchema } from "../validation.js";

const interpretSchema = z
  .object({
    userQuery: z.string().min(1),
    birthData: birthDataSchema.optional(),
    report: z.unknown().optional(),
    provider: z.enum(["deepseek", "gemini", "mock"]).optional(),
  })
  .refine((value) => value.birthData || value.report, {
    message: "birthData or report is required",
    path: ["birthData"],
  });

const buildProvider = (providerName?: string): LlmProvider | null => {
  const resolvedProvider = providerName ?? process.env.LLM_PROVIDER;

  if (resolvedProvider === "mock") {
    return {
      name: "mock",
      generate: async (prompt) => `Mock response: ${prompt.slice(0, 120)}`,
    };
  }

  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (
    resolvedProvider === "deepseek" ||
    (resolvedProvider === undefined && deepseekKey)
  ) {
    if (!deepseekKey) return null;
    return new DeepSeekProvider({
      apiKey: deepseekKey,
      baseUrl: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
      model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
    });
  }

  if (
    resolvedProvider === "gemini" ||
    (resolvedProvider === undefined && geminiKey)
  ) {
    if (!geminiKey) return null;
    return new GeminiProvider({
      apiKey: geminiKey,
      baseUrl: process.env.GEMINI_BASE_URL ?? "https://generativelanguage.googleapis.com",
      model: process.env.GEMINI_MODEL ?? "gemini-1.5-flash",
    });
  }

  return null;
};

export const registerInterpretRoutes = (app: FastifyInstance) => {
  app.post("/api/v1/interpret", async (request, reply) => {
    const parsed = interpretSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: "InvalidRequest",
        details: parsed.error.flatten(),
      });
    }

    const provider = buildProvider(parsed.data.provider);
    if (!provider) {
      return reply.status(503).send({
        error: "ProviderUnavailable",
        details: "No LLM provider configured",
      });
    }

    assertProvider(provider);

    try {
      const report = parsed.data.report
        ? (parsed.data.report as FullReport)
        : assembleFullReport(parsed.data.birthData!);
      const content = await interpretReport({
        report,
        userQuery: parsed.data.userQuery,
        provider,
        currentYear: new Date().getFullYear(),
      });

      const lines = content.split(/\r?\n/);
      const payload = `${lines.map((line) => `data: ${line}`).join("\n")}\n\n`;
      return reply
        .type("text/event-stream")
        .header("Cache-Control", "no-cache")
        .header("Connection", "keep-alive")
        .send(payload);
    } catch (error) {
      return reply.status(502).send({
        error: "InterpretationFailed",
        message: error instanceof Error ? error.message : "Interpretation failed",
      });
    }
  });
};
