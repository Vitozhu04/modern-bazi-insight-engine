import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-slate-900">
            Modern Bazi Insight Engine
          </span>
          <span className="text-xs text-slate-500">
            Precision-driven Bazi analysis for modern decision makers.
          </span>
        </div>
        <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span>Privacy</span>
          <span>Methodology</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
