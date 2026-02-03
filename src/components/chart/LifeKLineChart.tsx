import React from "react";
import { Button } from "@/components/ui/button";

type LuckScorePoint = {
  year: number;
  age: number;
  score: number;
  trend: "up" | "down" | "stable";
};

type LifeKLineChartProps = {
  points: LuckScorePoint[];
};

const LifeKLineChart = ({ points }: LifeKLineChartProps) => {
  const [zoom, setZoom] = React.useState(1);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const width = Math.max(600, points.length * 60 * zoom);
  const height = 240;
  const padding = 28;
  const xStep = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  const scores = points.map((point) => point.score);
  const maxScore = Math.max(...scores, 0);
  const minScore = Math.min(...scores, 100);
  const peakIndex = scores.indexOf(maxScore);
  const lowIndex = scores.indexOf(minScore);

  const toX = (index: number) => padding + index * xStep;
  const toY = (score: number) =>
    padding + ((100 - score) / 100) * (height - padding * 2);

  const path = points
    .map((point, index) => {
      const x = toX(index);
      const y = toY(point.score);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const activePoint = activeIndex !== null ? points[activeIndex] : null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Life K-Line
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Luck trajectory over time
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => setZoom((z) => Math.min(2.5, z * 1.2))}>
            Zoom In
          </Button>
          <Button type="button" variant="outline" onClick={() => setZoom((z) => Math.max(0.6, z / 1.2))}>
            Zoom Out
          </Button>
          <Button type="button" variant="outline" onClick={() => setZoom(1)}>
            Reset
          </Button>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto" data-testid="life-kline-chart">
        <svg width={width} height={height} className="block">
          <path d={path} fill="none" stroke="#0f172a" strokeWidth={2} />
          {points.map((point, index) => {
            const x = toX(index);
            const y = toY(point.score);
            const isPeak = index === peakIndex;
            const isLow = index === lowIndex;
            return (
              <g key={`${point.year}-${point.age}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={isPeak || isLow ? 6 : 4}
                  fill={isPeak ? "#f97316" : isLow ? "#0ea5e9" : "#0f172a"}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                {(isPeak || isLow) && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className="fill-slate-500 text-[10px]"
                  >
                    {isPeak ? "Peak" : "Low"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      {activePoint ? (
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span>Year: {activePoint.year}</span>
          <span>Age: {activePoint.age}</span>
          <span>Score: {activePoint.score}</span>
          <span>Trend: {activePoint.trend}</span>
        </div>
      ) : null}
    </section>
  );
};

export default LifeKLineChart;
