import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "A disciplined introduction to your chart.",
    features: [
      "Full Bazi chart plotting",
      "Basic five element distribution",
      "5 AI deep analysis queries/month",
    ],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$19.9",
    description: "Full-spectrum insight with actionable guidance.",
    features: [
      "Life K-Line (1-100 years)",
      "Advanced five elements weighting",
      "Useful God + actionable advice",
      "100 AI deep analysis queries/month",
    ],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "Custom",
    description: "API access for teams building on the engine.",
    features: [
      "CalculationEngine API",
      "Volume-based pricing",
      "Dedicated support",
    ],
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Pricing
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Plans that scale with your curiosity.
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Start with precision fundamentals, then unlock deeper analysis when
            you are ready.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={
                tier.featured
                  ? "border-2 border-slate-900 bg-slate-900 text-white"
                  : "border border-slate-200"
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={
                      tier.featured ? "text-white" : "text-slate-900"
                    }
                  >
                    {tier.name}
                  </CardTitle>
                  {tier.featured ? (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Most Popular
                    </span>
                  ) : null}
                </div>
                <p
                  className={
                    tier.featured ? "text-sm text-slate-200" : "text-sm text-slate-600"
                  }
                >
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={
                        tier.featured
                          ? "text-3xl font-semibold text-white"
                          : "text-3xl font-semibold text-slate-900"
                      }
                    >
                      {tier.price}
                    </span>
                    {tier.name === "Pro" ? (
                      <span className="text-sm text-slate-300">/month</span>
                    ) : null}
                  </div>
                </div>
                <ul className="flex flex-1 flex-col gap-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        className={
                          tier.featured
                            ? "mt-1 h-2 w-2 rounded-full bg-white"
                            : "mt-1 h-2 w-2 rounded-full bg-slate-400"
                        }
                      />
                      <span
                        className={
                          tier.featured ? "text-slate-100" : "text-slate-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={tier.featured ? "bg-white text-slate-900" : undefined}
                  variant={tier.featured ? "default" : "outline"}
                  type="button"
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
