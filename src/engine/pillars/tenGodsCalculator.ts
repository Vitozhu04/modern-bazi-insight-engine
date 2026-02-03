import { getTenGod } from "../constants/tenGods.js";
import type { HeavenlyStem } from "../constants/heavenlyStems.js";
import type { Pillar, TenGodsByPillar } from "../types/chart.js";

interface PillarSet {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

const resolveTenGod = (dayStem: HeavenlyStem, targetStem: string) =>
  getTenGod(dayStem, targetStem as HeavenlyStem);

export const calculateTenGods = (pillars: PillarSet): TenGodsByPillar => {
  const dayStem = pillars.day.heavenlyStem as HeavenlyStem;

  return {
    year: [resolveTenGod(dayStem, pillars.year.heavenlyStem)],
    month: [resolveTenGod(dayStem, pillars.month.heavenlyStem)],
    day: [resolveTenGod(dayStem, pillars.day.heavenlyStem)],
    hour: [resolveTenGod(dayStem, pillars.hour.heavenlyStem)],
  };
};
