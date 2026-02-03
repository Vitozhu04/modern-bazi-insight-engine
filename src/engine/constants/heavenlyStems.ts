import type { Element } from "./fiveElements.js";

export type YinYang = "yin" | "yang";

export const heavenlyStems = [
  "甲",
  "乙",
  "丙",
  "丁",
  "戊",
  "己",
  "庚",
  "辛",
  "壬",
  "癸",
] as const;

export type HeavenlyStem = (typeof heavenlyStems)[number];

export const heavenlyStemInfo: Record<HeavenlyStem, { element: Element; polarity: YinYang }> = {
  甲: { element: "木", polarity: "yang" },
  乙: { element: "木", polarity: "yin" },
  丙: { element: "火", polarity: "yang" },
  丁: { element: "火", polarity: "yin" },
  戊: { element: "土", polarity: "yang" },
  己: { element: "土", polarity: "yin" },
  庚: { element: "金", polarity: "yang" },
  辛: { element: "金", polarity: "yin" },
  壬: { element: "水", polarity: "yang" },
  癸: { element: "水", polarity: "yin" },
};
