import type { BaziChart } from "../types/chart.js";
import type { UsefulGodAnalysis } from "../types/analysis.js";
import type { Element } from "../constants/fiveElements.js";
import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import { determineChartPattern } from "./chartPattern.js";
import { calculateDayMasterStrength } from "./dayMasterStrength.js";
import { heavenlyStemInfo } from "../constants/heavenlyStems.js";
import { generatingCycle, controllingCycle } from "../constants/fiveElements.js";
import { earthlyBranchInfo } from "../constants/earthlyBranches.js";

type ClimateState = "COLD" | "HOT" | "DRY" | "DAMP" | "NEUTRAL";

const climateByMonth: Record<EarthlyBranch, ClimateState> = {
  亥: "COLD",
  子: "COLD",
  丑: "DAMP",
  寅: "NEUTRAL",
  卯: "NEUTRAL",
  辰: "DAMP",
  巳: "HOT",
  午: "HOT",
  未: "DRY",
  申: "NEUTRAL",
  酉: "NEUTRAL",
  戌: "DRY",
};

const unique = (items: Element[]) => Array.from(new Set(items));

const producerOf = (element: Element) =>
  generatingCycle[(generatingCycle.indexOf(element) + 4) % 5];

const producedBy = (element: Element) =>
  generatingCycle[(generatingCycle.indexOf(element) + 1) % 5];

const controls = (element: Element) =>
  controllingCycle[(controllingCycle.indexOf(element) + 1) % 5];

const controlledBy = (element: Element) =>
  controllingCycle[(controllingCycle.indexOf(element) + 4) % 5];

const climatePreference = (climate: ClimateState): Element[] => {
  switch (climate) {
    case "COLD":
    case "DAMP":
      return ["火"];
    case "HOT":
    case "DRY":
      return ["水"];
    default:
      return [];
  }
};

const dominantElement = (chart: BaziChart): Element => {
  const elements: Element[] = [
    heavenlyStemInfo[chart.yearPillar.heavenlyStem as HeavenlyStem].element,
    heavenlyStemInfo[chart.monthPillar.heavenlyStem as HeavenlyStem].element,
    heavenlyStemInfo[chart.hourPillar.heavenlyStem as HeavenlyStem].element,
    earthlyBranchInfo[chart.yearPillar.earthlyBranch as EarthlyBranch].element,
    earthlyBranchInfo[chart.monthPillar.earthlyBranch as EarthlyBranch].element,
    earthlyBranchInfo[chart.dayPillar.earthlyBranch as EarthlyBranch].element,
    earthlyBranchInfo[chart.hourPillar.earthlyBranch as EarthlyBranch].element,
  ];

  const counts: Record<Element, number> = {
    木: 0,
    火: 0,
    土: 0,
    金: 0,
    水: 0,
  };

  elements.forEach((element) => {
    counts[element] += 1;
  });

  return (Object.entries(counts) as [Element, number][]).reduce((max, entry) =>
    entry[1] > max[1] ? entry : max,
  )[0];
};

export const determineUsefulGod = (chart: BaziChart): UsefulGodAnalysis => {
  const dayStem = chart.dayPillar.heavenlyStem as HeavenlyStem;
  const dayElement = heavenlyStemInfo[dayStem].element;
  const strength = calculateDayMasterStrength(chart);
  const pattern = determineChartPattern(chart);
  const climate = climateByMonth[chart.monthPillar.earthlyBranch as EarthlyBranch];
  const climateGods = climatePreference(climate);

  let favorable: Element[] = [];
  let unfavorable: Element[] = [];

  if (strength === "Follow") {
    const dominant = dominantElement(chart);
    favorable = [dominant];
    unfavorable = [dayElement];
  } else if (strength === "Weak") {
    favorable = [dayElement, producerOf(dayElement)];
    unfavorable = [producedBy(dayElement), controls(dayElement), controlledBy(dayElement)];
  } else {
    favorable = [producedBy(dayElement), controls(dayElement), controlledBy(dayElement)];
    unfavorable = [dayElement, producerOf(dayElement)];
  }

  if (climate !== "NEUTRAL") {
    favorable = unique([...climateGods, ...favorable]);
  }

  return {
    dayMasterStrength: strength,
    pattern,
    favorableGods: unique(favorable),
    unfavorableGods: unique(unfavorable),
  };
};
