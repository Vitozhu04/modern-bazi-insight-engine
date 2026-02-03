"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Analyze", href: "/analyze" },
];

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-slate-900">Modern Bazi</span>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-slate-500 md:inline">
            Insight Engine
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
            aria-label="Toggle theme"
          >
            Theme
          </button>
          <Button type="button" className="h-9 px-4 text-sm">
            Get Analysis
          </Button>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>
      {open ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-slate-900">
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="mt-2 rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600"
              aria-label="Toggle theme"
            >
              Theme
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
