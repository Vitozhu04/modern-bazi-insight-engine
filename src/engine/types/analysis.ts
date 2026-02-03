import type { BaziChart, Pillar } from "./chart";

export interface LuckScorePoint {
  year: number;
  age: number;
  yearlyPillar: Pillar;
  tenYearLuckPillar: Pillar;
  score: number;
  trend: "up" | "down" | "stable";
}

export interface FiveElementsWeight {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export type DayMasterStrength = "Strong" | "Weak" | "Vibrant" | "Follow";

export interface UsefulGodAnalysis {
  dayMasterStrength: DayMasterStrength;
  pattern: string;
  favorableGods: string[];
  unfavorableGods: string[];
}

export interface AdviceAccessory {
  name: string;
  reason: string;
}

export interface Advice {
  accessories: AdviceAccessory[];
  directions: string[];
  colors: string[];
  notes?: string;
}

export interface InsightTags {
  career: string[];
  wealth: string[];
  personality: string[];
}

export interface FullReport {
  baziChart: BaziChart;
  lifeKline: LuckScorePoint[];
  fiveElements: FiveElementsWeight;
  usefulGod: UsefulGodAnalysis;
  actionableAdvice: Advice;
  insightTags: InsightTags;
}
