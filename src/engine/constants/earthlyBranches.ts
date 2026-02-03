import type { Element } from "./fiveElements.js";
import type { YinYang } from "./heavenlyStems.js";

export type EarthlyBranchAnimal =
  | "Rat"
  | "Ox"
  | "Tiger"
  | "Rabbit"
  | "Dragon"
  | "Snake"
  | "Horse"
  | "Goat"
  | "Monkey"
  | "Rooster"
  | "Dog"
  | "Pig";

export const earthlyBranches = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
] as const;

export type EarthlyBranch = (typeof earthlyBranches)[number];

export const earthlyBranchInfo: Record<
  EarthlyBranch,
  { element: Element; polarity: YinYang; animal: EarthlyBranchAnimal }
> = {
  子: { element: "水", polarity: "yang", animal: "Rat" },
  丑: { element: "土", polarity: "yin", animal: "Ox" },
  寅: { element: "木", polarity: "yang", animal: "Tiger" },
  卯: { element: "木", polarity: "yin", animal: "Rabbit" },
  辰: { element: "土", polarity: "yang", animal: "Dragon" },
  巳: { element: "火", polarity: "yin", animal: "Snake" },
  午: { element: "火", polarity: "yang", animal: "Horse" },
  未: { element: "土", polarity: "yin", animal: "Goat" },
  申: { element: "金", polarity: "yang", animal: "Monkey" },
  酉: { element: "金", polarity: "yin", animal: "Rooster" },
  戌: { element: "土", polarity: "yang", animal: "Dog" },
  亥: { element: "水", polarity: "yin", animal: "Pig" },
};
