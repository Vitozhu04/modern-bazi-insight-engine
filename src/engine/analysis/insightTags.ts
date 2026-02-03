import type { InsightTags } from "../types/analysis.js";
import type { TenGodsByPillar } from "../types/chart.js";

type TagMap = {
  career: string[];
  wealth: string[];
  personality: string[];
};

const tagMap: Record<string, TagMap> = {
  正官: {
    career: ["discipline", "leadership"],
    wealth: ["stable-growth"],
    personality: ["responsible"],
  },
  七杀: {
    career: ["decisive", "risk-management"],
    wealth: ["aggressive-growth"],
    personality: ["bold"],
  },
  正财: {
    career: ["operations"],
    wealth: ["steady-income"],
    personality: ["practical"],
  },
  偏财: {
    career: ["entrepreneurial"],
    wealth: ["opportunity-driven"],
    personality: ["flexible"],
  },
  食神: {
    career: ["creative-output"],
    wealth: ["value-creation"],
    personality: ["warm"],
  },
  伤官: {
    career: ["expressive"],
    wealth: ["breakthroughs"],
    personality: ["independent"],
  },
  正印: {
    career: ["research"],
    wealth: ["long-term"],
    personality: ["thoughtful"],
  },
  偏印: {
    career: ["insight"],
    wealth: ["strategic"],
    personality: ["intuitive"],
  },
  比肩: {
    career: ["self-driven"],
    wealth: ["self-reliant"],
    personality: ["independent"],
  },
  劫财: {
    career: ["competitive"],
    wealth: ["shared-resources"],
    personality: ["assertive"],
  },
};

const addTags = (set: Set<string>, tags: string[]) => {
  tags.forEach((tag) => set.add(tag));
};

export const generateInsightTags = (tenGods: TenGodsByPillar): InsightTags => {
  const career = new Set<string>();
  const wealth = new Set<string>();
  const personality = new Set<string>();

  const all = [...tenGods.year, ...tenGods.month, ...tenGods.day, ...tenGods.hour];

  all.forEach((god) => {
    const mapping = tagMap[god];
    if (!mapping) {
      return;
    }
    addTags(career, mapping.career);
    addTags(wealth, mapping.wealth);
    addTags(personality, mapping.personality);
  });

  return {
    career: Array.from(career),
    wealth: Array.from(wealth),
    personality: Array.from(personality),
  };
};
