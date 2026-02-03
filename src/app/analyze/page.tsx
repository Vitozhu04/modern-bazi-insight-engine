"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import BirthDataForm from "@/components/chart/BirthDataForm";
import FourPillars from "@/components/chart/FourPillars";
import FiveElementsChart from "@/components/chart/FiveElementsChart";
import TenGodsBadges from "@/components/chart/TenGodsBadges";
import LuckPillarsTimeline from "@/components/chart/LuckPillarsTimeline";
import LifeKLineChart from "@/components/chart/LifeKLineChart";
import AnalysisCards from "@/components/chat/AnalysisCards";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import type { FullReport, LuckScorePoint, AdviceAccessory } from "@/engine/types/analysis";

export default function AnalyzePage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const analyzeEndpoint = apiBaseUrl ? `${apiBaseUrl}/api/v1/analyze` : "/api/v1/analyze";
  const interpretEndpoint = apiBaseUrl ? `${apiBaseUrl}/api/v1/interpret` : "/api/v1/interpret";

  const { messages, sendMessage, isStreaming } = useStreamingChat({
    endpoint: interpretEndpoint,
  });

  const [birthData, setBirthData] = React.useState({
    gregorianDate: "2000-01-01T12:00:00Z",
    longitude: 120,
    gender: "Male" as const,
  });

  const [report, setReport] = React.useState<FullReport | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const provider = process.env.NEXT_PUBLIC_LLM_PROVIDER;

  const handleFormSubmit = async (data: typeof birthData) => {
    setBirthData(data);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(analyzeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result: FullReport = await response.json();
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCurrentAge = (): number => {
    const birthYear = new Date(birthData.gregorianDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const getCurrentLuckScore = (): number => {
    if (!report?.lifeKline?.length) return 0;
    const currentAge = calculateCurrentAge();
    const currentYearPoint = report.lifeKline.find((p: LuckScorePoint) => p.age === currentAge);
    return currentYearPoint?.score ?? report.lifeKline[report.lifeKline.length - 1]?.score ?? 0;
  };

  const formatAdvice = () => {
    if (!report?.actionableAdvice) {
      return { title: "Actionable Advice", items: ["Submit your birth data to receive personalized advice."] };
    }
    const { accessories, directions, colors, notes } = report.actionableAdvice;
    const items: string[] = [];
    if (accessories?.length) {
      items.push(`Lucky accessories: ${accessories.map((a: AdviceAccessory) => a.name).join(", ")}`);
    }
    if (directions?.length) {
      items.push(`Favorable directions: ${directions.join(", ")}`);
    }
    if (colors?.length) {
      items.push(`Lucky colors: ${colors.join(", ")}`);
    }
    if (notes) {
      items.push(notes);
    }
    return { title: "Actionable Advice", items: items.length ? items : ["Analysis complete."] };
  };

  const initialMessages = [
    {
      role: "assistant" as const,
      content: "Share your question and I will focus on career and wealth timing.",
    },
  ];

  const allMessages = [...initialMessages, ...messages];

  const pillars = report
    ? {
        year: report.baziChart.yearPillar,
        month: report.baziChart.monthPillar,
        day: report.baziChart.dayPillar,
        hour: report.baziChart.hourPillar,
      }
    : null;

  const klinePoints = report?.lifeKline?.map((p: { year: number; age: number; score: number; trend: "up" | "down" | "stable" }) => ({
    year: p.year,
    age: p.age,
    score: p.score,
    trend: p.trend,
  })) ?? [];

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Analysis Workspace
          </span>
          <h1 className="text-3xl font-semibold text-slate-900">AI Guidance</h1>
        </div>
        <div
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          data-testid="analyze-grid"
        >
          <div className="space-y-6 min-w-0">
            <BirthDataForm onSubmit={handleFormSubmit} />
            
            {isLoading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="animate-pulse text-slate-500">Calculating your Bazi chart...</div>
              </div>
            )}
            
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}
            
            {pillars && !isLoading && (
              <>
                <FourPillars pillars={pillars} />
                <FiveElementsChart weights={report.fiveElements} />
                <TenGodsBadges tenGodsByPillar={report.baziChart.tenGods} />
                <LuckPillarsTimeline
                  pillars={report.baziChart.tenYearLuckPillars}
                  currentAge={calculateCurrentAge()}
                />
                {klinePoints.length > 0 && <LifeKLineChart points={klinePoints} />}
              </>
            )}
            
            {!pillars && !isLoading && !error && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                Enter your birth data and click &quot;Calculate&quot; to generate your Bazi chart.
              </div>
            )}
          </div>
          <div className="space-y-6 min-w-0">
            <AnalysisCards
              pattern={report?.usefulGod?.pattern ?? "—"}
              usefulGod={report?.usefulGod?.favorableGods?.[0] ?? "—"}
              luckScore={getCurrentLuckScore()}
              advice={formatAdvice()}
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="space-y-4">
                {allMessages.map((message, index) => (
                  <ChatMessage
                    key={`${message.role}-${index}`}
                    role={message.role}
                    content={message.content}
                  />
                ))}
                {isStreaming ? (
                  <ChatMessage role="assistant" content="" isLoading />
                ) : null}
              </div>
              <div className="mt-4">
                <ChatInput
                  onSend={(message: string) =>
                    sendMessage(
                      message,
                      provider ? { birthData, provider } : { birthData }
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
