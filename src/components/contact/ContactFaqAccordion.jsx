"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function ContactFaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      question: "What should we prepare for our initial project consultation?",
      answer:
        "A brief overview of your business objectives, target audience, timeline expectations, and any existing digital platforms (websites, advertising accounts, or workflows) is helpful. If you have an RFP or technical brief, you can share it directly and our team will prepare a structured initial evaluation.",
    },
    {
      question: "How are project timelines and commercial terms established?",
      answer:
        "We operate on fixed-scope, milestone-based pricing. Following our initial discovery discussion, we formulate a comprehensive proposal outlining technical architecture, deliverables, timelines, and transparent commercial terms before any engagement commences.",
    },
    {
      question: "How do you manage client engagements remotely?",
      answer:
        "We deliver projects seamlessly across India and globally using dedicated cloud staging environments, structured milestone demonstrations, clear technical documentation, and direct digital communication channels.",
    },
    {
      question: "Who retains ownership of the source code, analytics, and ad accounts?",
      answer:
        "You retain 100% intellectual property ownership of all custom source code, repositories, creative assets, analytics accounts, and advertising accounts from day one. All deliverables are transferred with zero vendor lock-in.",
    },
    {
      question: "What support and ongoing optimization do you provide post-launch?",
      answer:
        "Every engagement includes comprehensive post-launch deployment support, performance monitoring, and team handover. We also provide ongoing service level agreements for continuous technical enhancements, performance tuning, and digital campaign optimization.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-2.5 sm:space-y-3 max-w-4xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-xl border transition-colors duration-150 overflow-hidden ${
              isOpen
                ? "bg-white border-[#00B8F0]/40 shadow-xs"
                : "bg-[#F8FAFC] border-slate-200/90 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00B8F0]"
            >
              <span
                className={`font-heading text-sm sm:text-base font-bold transition-colors ${
                  isOpen ? "text-[#0284C7]" : "text-slate-900"
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  isOpen
                    ? "bg-[#0284C7] text-white border-[#0284C7] rotate-45"
                    : "bg-slate-50 text-slate-500 border-slate-200"
                }`}
                aria-hidden="true"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 pb-4 pt-1 text-[15px] sm:text-[14.5px] text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
