import { controllingCycle, generatingCycle } from "./fiveElements.js";
import { heavenlyStemInfo, type HeavenlyStem } from "./heavenlyStems.js";

export const tenGods = [
  "比肩",
  "劫财",
  "食神",
  "伤官",
  "偏财",
  "正财",
  "七杀",
  "正官",
  "偏印",
  "正印",
] as const;

export type TenGod = (typeof tenGods)[number];

type Relationship = "same" | "iProduce" | "producesMe" | "iControl" | "controlsMe";
type PolarityMatch = "same" | "opposite";

const tenGodByRelationship: Record<Relationship, Record<PolarityMatch, TenGod>> = {
  same: { same: "比肩", opposite: "劫财" },
  iProduce: { same: "食神", opposite: "伤官" },
  iControl: { same: "偏财", opposite: "正财" },
  controlsMe: { same: "七杀", opposite: "正官" },
  producesMe: { same: "偏印", opposite: "正印" },
};

const produces = (from: string, to: string) => {
  const fromIndex = generatingCycle.indexOf(from as (typeof generatingCycle)[number]);
  const toIndex = generatingCycle.indexOf(to as (typeof generatingCycle)[number]);
  if (fromIndex === -1 || toIndex === -1) {
    return false;
  }
  return (fromIndex + 1) % generatingCycle.length === toIndex;
};

const controls = (from: string, to: string) => {
  const fromIndex = controllingCycle.indexOf(from as (typeof controllingCycle)[number]);
  const toIndex = controllingCycle.indexOf(to as (typeof controllingCycle)[number]);
  if (fromIndex === -1 || toIndex === -1) {
    return false;
  }
  return (fromIndex + 1) % controllingCycle.length === toIndex;
};

const getRelationship = (dayMaster: HeavenlyStem, target: HeavenlyStem): Relationship => {
  const dayElement = heavenlyStemInfo[dayMaster].element;
  const targetElement = heavenlyStemInfo[target].element;

  if (dayElement === targetElement) {
    return "same";
  }
  if (produces(dayElement, targetElement)) {
    return "iProduce";
  }
  if (produces(targetElement, dayElement)) {
    return "producesMe";
  }
  if (controls(dayElement, targetElement)) {
    return "iControl";
  }
  return "controlsMe";
};

const getPolarityMatch = (dayMaster: HeavenlyStem, target: HeavenlyStem): PolarityMatch =>
  heavenlyStemInfo[dayMaster].polarity === heavenlyStemInfo[target].polarity
    ? "same"
    : "opposite";

export const getTenGod = (dayMaster: HeavenlyStem, target: HeavenlyStem): TenGod => {
  const relationship = getRelationship(dayMaster, target);
  const polarityMatch = getPolarityMatch(dayMaster, target);
  return tenGodByRelationship[relationship][polarityMatch];
};
