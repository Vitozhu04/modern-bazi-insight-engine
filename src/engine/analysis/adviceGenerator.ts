import type { Advice, UsefulGodAnalysis } from "../types/analysis.js";
import type { Element } from "../constants/fiveElements.js";

interface ElementAdvice {
  colors: string[];
  directions: string[];
  accessories: { name: string; reason: string }[];
}

const adviceByElement: Record<Element, ElementAdvice> = {
  木: {
    colors: ["green"],
    directions: ["east"],
    accessories: [{ name: "bamboo", reason: "nourish-wood" }],
  },
  火: {
    colors: ["red"],
    directions: ["south"],
    accessories: [{ name: "red-cord", reason: "boost-fire" }],
  },
  土: {
    colors: ["yellow"],
    directions: ["center"],
    accessories: [{ name: "ceramic", reason: "stabilize-earth" }],
  },
  金: {
    colors: ["white"],
    directions: ["west"],
    accessories: [{ name: "metal", reason: "strengthen-metal" }],
  },
  水: {
    colors: ["blue", "black"],
    directions: ["north"],
    accessories: [{ name: "obsidian", reason: "support-water" }],
  },
};

const unique = (items: string[]) => Array.from(new Set(items));

export const generateAdvice = (usefulGod: UsefulGodAnalysis): Advice => {
  const colors: string[] = [];
  const directions: string[] = [];
  const accessories: { name: string; reason: string }[] = [];

  usefulGod.favorableGods.forEach((element) => {
    const mapping = adviceByElement[element as Element];
    if (!mapping) {
      return;
    }
    colors.push(...mapping.colors);
    directions.push(...mapping.directions);
    accessories.push(...mapping.accessories);
  });

  return {
    accessories,
    directions: unique(directions),
    colors: unique(colors),
    notes: "Focus on favorable elements for balance.",
  };
};
