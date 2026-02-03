import React from "react";

type Pillar = {
  heavenlyStem: string;
  earthlyBranch: string;
};

type LuckPillar = {
  startAge: number;
  endAge: number;
  pillar: Pillar;
};

type LuckPillarsTimelineProps = {
  pillars: LuckPillar[];
  currentAge?: number;
};

const LuckPillarsTimeline = ({
  pillars,
  currentAge,
}: LuckPillarsTimelineProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Luck Pillars
          </p>
          <h3 className="text-lg font-semibold text-slate-900">Ten-Year Cycles</h3>
        </div>
        <span className="text-xs text-slate-500">Swipe to explore</span>
      </div>
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-4">
          {pillars.map((pillar) => {
            const isCurrent =
              currentAge !== undefined &&
              currentAge >= pillar.startAge &&
              currentAge <= pillar.endAge;

            return (
              <div
                key={`${pillar.startAge}-${pillar.endAge}`}
                data-current={isCurrent}
                data-testid={`luck-${pillar.startAge}-${pillar.endAge}`}
                className={`flex min-w-[160px] flex-col gap-3 rounded-xl border p-4 transition ${
                  isCurrent
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-900"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {pillar.startAge}-{pillar.endAge}
                </span>
                <div className="text-2xl font-semibold">
                  {pillar.pillar.heavenlyStem}
                  {pillar.pillar.earthlyBranch}
                </div>
                <span className={`text-xs ${isCurrent ? "text-slate-300" : "text-slate-500"}`}>
                  {isCurrent ? "Current Pillar" : "Upcoming"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LuckPillarsTimeline;
