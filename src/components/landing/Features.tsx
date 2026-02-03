import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI 深度解读",
    description:
      "Structured interpretation that balances classical rules with data signals.",
  },
  {
    title: "多重印证",
    description:
      "Cross-validated evidence across pillars, luck cycles, and five elements.",
  },
  {
    title: "克制的美",
    description:
      "Minimalist visuals that keep attention on insight, not spectacle.",
  },
  {
    title: "数据安全",
    description:
      "Privacy-first processing with clear data boundaries and transparency.",
  },
  {
    title: "动态可视化",
    description:
      "Life K-Line and elemental balance rendered as readable signals.",
  },
  {
    title: "可操作建议",
    description:
      "Actionable guidance grounded in useful god and climate adjustments.",
  },
];

const Features = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Core Capabilities
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Insights you can trust, visuals you can act on.
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Each module is engineered for clarity: no mysticism, only measurable
            signals and grounded recommendations.
          </p>
        </div>
        <div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          data-testid="features-grid"
        >
          {features.map((feature) => (
            <Card key={feature.title} className="border border-slate-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <span className="text-sm font-semibold">{feature.title[0]}</span>
                </div>
                <CardTitle className="text-xl text-slate-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
