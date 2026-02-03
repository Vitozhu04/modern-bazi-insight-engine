import type { EarthlyBranch } from "./earthlyBranches.js";
import type { HeavenlyStem } from "./heavenlyStems.js";

export interface HiddenStemEntry {
  stem: HeavenlyStem;
  weight: number;
}

export const hiddenStems = {
  子: [{ stem: "癸", weight: 1 }],
  丑: [
    { stem: "己", weight: 0.6 },
    { stem: "癸", weight: 0.3 },
    { stem: "辛", weight: 0.1 },
  ],
  寅: [
    { stem: "甲", weight: 0.6 },
    { stem: "丙", weight: 0.3 },
    { stem: "戊", weight: 0.1 },
  ],
  卯: [{ stem: "乙", weight: 1 }],
  辰: [
    { stem: "戊", weight: 0.6 },
    { stem: "乙", weight: 0.3 },
    { stem: "癸", weight: 0.1 },
  ],
  巳: [
    { stem: "丙", weight: 0.6 },
    { stem: "戊", weight: 0.3 },
    { stem: "庚", weight: 0.1 },
  ],
  午: [
    { stem: "丁", weight: 0.7 },
    { stem: "己", weight: 0.3 },
  ],
  未: [
    { stem: "己", weight: 0.6 },
    { stem: "丁", weight: 0.3 },
    { stem: "乙", weight: 0.1 },
  ],
  申: [
    { stem: "庚", weight: 0.6 },
    { stem: "壬", weight: 0.3 },
    { stem: "戊", weight: 0.1 },
  ],
  酉: [{ stem: "辛", weight: 1 }],
  戌: [
    { stem: "戊", weight: 0.6 },
    { stem: "辛", weight: 0.3 },
    { stem: "丁", weight: 0.1 },
  ],
  亥: [
    { stem: "壬", weight: 0.7 },
    { stem: "甲", weight: 0.3 },
  ],
} satisfies Record<EarthlyBranch, HiddenStemEntry[]>;
