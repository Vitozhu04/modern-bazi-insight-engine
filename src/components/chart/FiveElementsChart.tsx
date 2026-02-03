import React from "react";

type FiveElementsWeight = {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
};

type FiveElementsChartProps = {
  weights: FiveElementsWeight;
};

const palette = {
  wood: "#10b981",
  fire: "#f43f5e",
  earth: "#f59e0b",
  metal: "#64748b",
  water: "#0ea5e9",
};

const FiveElementsChart = ({ weights }: FiveElementsChartProps) => {
  const total =
    weights.wood +
    weights.fire +
    weights.earth +
    weights.metal +
    weights.water;

  const elements = [
    { key: "wood", label: "木", value: weights.wood, color: palette.wood },
    { key: "fire", label: "火", value: weights.fire, color: palette.fire },
    { key: "earth", label: "土", value: weights.earth, color: palette.earth },
    { key: "metal", label: "金", value: weights.metal, color: palette.metal },
    { key: "water", label: "水", value: weights.water, color: palette.water },
  ];

  let cumulative = 0;
  const gradientStops = elements.map((element) => {
    const percent = total === 0 ? 0 : (element.value / total) * 100;
    const start = cumulative;
    cumulative += percent;
    return `${element.color} ${start}% ${cumulative}%`;
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(${gradientStops.join(",")})` }}
          />
          <div className="absolute inset-4 rounded-full bg-white shadow-sm" />
          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Five Elements
            </p>
            <p className="text-lg font-semibold text-slate-900">Distribution</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {elements.map((element) => {
            const percent = total === 0 ? 0 : Math.round((element.value / total) * 100);
            return (
              <div key={element.key} className="flex items-center gap-4">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: element.color }}
                >
                  {element.label}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{element.label}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${percent}%`, backgroundColor: element.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FiveElementsChart;
