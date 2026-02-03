import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdviceSection = {
  title: string;
  items: string[];
};

type AnalysisCardsProps = {
  pattern: string;
  usefulGod: string;
  luckScore: number;
  advice: AdviceSection;
};

const AnalysisCards = ({
  pattern,
  usefulGod,
  luckScore,
  advice,
}: AnalysisCardsProps) => {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.2em] text-slate-500">
              格局
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-slate-900">
            {pattern}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.2em] text-slate-500">
              喜用神
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-slate-900">
            {usefulGod}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.2em] text-slate-500">
              运势评分
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-slate-900">
            {luckScore}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-slate-900">{advice.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-slate-600">
            {advice.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default AnalysisCards;
