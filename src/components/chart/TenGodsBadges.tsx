import React from "react";
import { tenGods } from "../../engine/constants/tenGods.js";

type TenGodsByPillar = Record<"year" | "month" | "day" | "hour", string[]>;

type TenGodsBadgesProps = {
  tenGodsByPillar: TenGodsByPillar;
};

const explanations: Record<string, string> = {
  比肩: "Peer support and self-alignment.",
  劫财: "Competitive energy and bold risk.",
  食神: "Creative output and steady prosperity.",
  伤官: "Expressive drive and disruption.",
  偏财: "Opportunity, resourcefulness, external wealth.",
  正财: "Stable income and grounded value.",
  七杀: "Pressure, ambition, decisive action.",
  正官: "Structure, responsibility, recognition.",
  偏印: "Intuition, unconventional learning.",
  正印: "Support, mentorship, protection.",
};

const TenGodsBadges = ({ tenGodsByPillar }: TenGodsBadgesProps) => {
  const counts = tenGods.reduce<Record<string, number>>((acc, god) => {
    acc[god] = 0;
    return acc;
  }, {});

  Object.values(tenGodsByPillar)
    .flat()
    .forEach((god) => {
      if (counts[god] !== undefined) {
        counts[god] += 1;
      }
    });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Ten Gods
          </p>
          <h3 className="text-lg font-semibold text-slate-900">Ten Gods Profile</h3>
        </div>
        <span className="text-xs text-slate-500">
          Hover for description
        </span>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {tenGods.map((god) => {
          const count = counts[god] ?? 0;
          return (
            <li key={god}>
              <div
                className={`flex items-center justify-between rounded-full border px-3 py-2 text-xs font-semibold ${
                  count > 0
                    ? "border-slate-900 text-slate-900"
                    : "border-slate-200 text-slate-400"
                }`}
                title={explanations[god] ?? ""}
              >
                <span>{god}</span>
                <span>{count}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TenGodsBadges;
