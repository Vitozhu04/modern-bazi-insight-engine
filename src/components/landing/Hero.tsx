import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,41,59,0.18),_transparent_55%)]" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(71,85,105,0.35),_transparent_70%)] blur-2xl" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-24 text-left md:px-10">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Modern Metaphysics
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Modern Bazi Insight Engine
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 sm:text-xl">
            观象入元，见心知命
          </p>
          <p className="max-w-2xl text-base text-slate-500">
            Structured chart intelligence, precision solar timing, and visual
            insight to guide decisions with clarity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button className="h-11 px-6 text-base" type="button">
            获取我的命盘分析
          </Button>
          <div className="text-sm text-slate-500">
            Powered by true solar time and quantified five-element analytics.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
