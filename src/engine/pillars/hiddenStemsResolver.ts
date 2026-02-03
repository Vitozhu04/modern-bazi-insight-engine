import type { EarthlyBranch } from "../constants/earthlyBranches.js";
import { hiddenStems } from "../constants/index.js";
import type { HiddenStemEntry } from "../constants/hiddenStems.js";

export const resolveHiddenStems = (branch: EarthlyBranch): HiddenStemEntry[] =>
  hiddenStems[branch];
