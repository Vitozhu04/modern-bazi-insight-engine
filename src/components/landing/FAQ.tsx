import React from "react";

const faqs = [
  {
    question: "What data do you need to calculate my chart?",
    answer:
      "We need your birth date, time, longitude, and gender to calculate true solar time and the four pillars accurately.",
  },
  {
    question: "How accurate is the Life K-Line?",
    answer:
      "It is based on solar term boundaries and quantified element interactions, giving you a trend line that is comparable year over year.",
  },
  {
    question: "Is my data stored or shared?",
    answer:
      "We process analysis results without selling data. You control your inputs and can delete them anytime.",
  },
  {
    question: "Can I use this for career planning?",
    answer:
      "Yes. The engine highlights timing windows and elemental support so you can plan decisions with better clarity.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            FAQ
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Questions we hear most often.
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Clear answers to help you decide when to explore deeper analysis.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                {faq.question}
                <span className="text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
