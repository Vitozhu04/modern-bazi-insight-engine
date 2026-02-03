import React from "react";
import {
  heavenlyStemInfo,
} from "../../engine/constants/heavenlyStems.js";
import {
  earthlyBranchInfo,
} from "../../engine/constants/earthlyBranches.js";

type HiddenStem = {
  stem: string;
  weight: number;
};

type Pillar = {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenStems: HiddenStem[];
};

type FourPillarsProps = {
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
  };
};

const elementClass: Record<string, string> = {
  木: "text-emerald-600",
  火: "text-rose-500",
  土: "text-amber-600",
  金: "text-slate-600",
  水: "text-sky-600",
};

const getStemElement = (stem: string) => {
  const info = heavenlyStemInfo[stem as keyof typeof heavenlyStemInfo];
  return info?.element;
};

const getBranchElement = (branch: string) => {
  const info = earthlyBranchInfo[branch as keyof typeof earthlyBranchInfo];
  return info?.element;
};

const FourPillars = ({ pillars }: FourPillarsProps) => {
  const items = [
    { label: "Year", pillar: pillars.year },
    { label: "Month", pillar: pillars.month },
    { label: "Day", pillar: pillars.day },
    { label: "Hour", pillar: pillars.hour },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-6 md:grid-cols-4 items-start">
        {items.map(({ label, pillar }) => {
          const stemElement = getStemElement(pillar.heavenlyStem);
          const branchElement = getBranchElement(pillar.earthlyBranch);

          return (
            <div
              key={label}
              className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {label}
              </span>
              <div className="flex flex-col gap-2">
                <span
                  className={`text-3xl font-semibold ${
                    stemElement ? elementClass[stemElement] : "text-slate-900"
                  }`}
                >
                  {pillar.heavenlyStem}
                </span>
                <span
                  className={`text-3xl font-semibold ${
                    branchElement
                      ? elementClass[branchElement]
                      : "text-slate-900"
                  }`}
                >
                  {pillar.earthlyBranch}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-xs text-slate-500">
                <span className="text-[0.65rem] uppercase tracking-[0.2em]">
                  Hidden Stems
                </span>
                <div className="flex flex-wrap gap-2">
                  {pillar.hiddenStems.map((hidden) => (
                    <span
                      key={`${label}-${hidden.stem}`}
                      className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700"
                    >
                      {hidden.stem} · {Math.round(hidden.weight * 100)}%
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FourPillars;
