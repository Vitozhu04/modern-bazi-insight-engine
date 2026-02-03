import type { BirthData } from "./input";

export interface HiddenStem {
  stem: string;
  weight: number;
}

export interface Pillar {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenStems: HiddenStem[];
}

export interface TenYearLuckPillar {
  startAge: number;
  endAge: number;
  pillar: Pillar;
}

export type TenGodsByPillar = Record<"year" | "month" | "day" | "hour", string[]>;

export interface BaziChart {
  birthData: BirthData;
  trueSolarTime: string;
  solarTermsTime: string;
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  tenGods: TenGodsByPillar;
  tenYearLuckPillars: TenYearLuckPillar[];
}
