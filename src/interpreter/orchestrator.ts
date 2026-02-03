import type { FullReport } from "../engine/types/analysis.js";
import type { LlmProvider } from "./providers/types.js";
import { buildPrompt } from "./promptBuilder.js";

interface OrchestratorInput {
  report: FullReport;
  userQuery: string;
  provider: LlmProvider;
  currentYear?: number;
}

export const interpretReport = async ({
  report,
  userQuery,
  provider,
  currentYear,
}: OrchestratorInput): Promise<string> => {
  const prompt = buildPrompt(report, userQuery, { currentYear });
  return provider.generate(prompt);
};
