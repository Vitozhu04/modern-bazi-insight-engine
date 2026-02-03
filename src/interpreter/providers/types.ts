export interface LlmProvider {
  name: string;
  generate: (prompt: string) => Promise<string>;
}

export const assertProvider = (provider: LlmProvider) => {
  if (!provider || typeof provider.generate !== "function") {
    throw new Error("Invalid LLM provider");
  }
};
