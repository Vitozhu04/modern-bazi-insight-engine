import React from "react";

const testimonials = [
  {
    quote:
      "The Life K-Line made my decision horizon feel tangible. I could finally see the rhythm.",
    name: "Lina Chen",
    role: "Product Lead",
  },
  {
    quote:
      "It reads like an analyst report, not a fortune. Clear, measured, and usable.",
    name: "Marcus Ng",
    role: "Strategy Consultant",
  },
  {
    quote:
      "The visual balance of the five elements helped me plan my next move with confidence.",
    name: "Sofia Park",
    role: "Founder",
  },
  {
    quote:
      "I appreciate the restraint. It respects the tradition without the noise.",
    name: "Adrian Lee",
    role: "Design Director",
  },
  {
    quote:
      "The system highlights focus years in a way that I can actually schedule around.",
    name: "Kai Wu",
    role: "Operations Manager",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Trusted Voices
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Professionals using Bazi insight like a decision dashboard.
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Evidence-backed perspectives, curated for clarity and immediate action.
          </p>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex gap-6 whitespace-nowrap py-8 pl-8 pr-12 animate-marquee group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="min-w-[260px] max-w-[320px] whitespace-normal rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-slate-600">“{testimonial.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
