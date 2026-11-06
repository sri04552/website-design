"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";

export function ServicesFaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do we get started on a project?",
      answer:
        "Getting started begins with a straightforward 15-minute diagnostic discussion via WhatsApp or phone. We discuss your business objectives, review any existing digital assets, and send a transparent scope document with fixed deliverables, clear milestones, and timelines before any commitment is made.",
    },
    {
      question: "Do I have to pay the entire project fee upfront?",
      answer:
        "No. Projects follow milestone-based payments (typically 50% deposit upon blueprint agreement, and 50% upon final testing approval and live domain handover). You only approve final payment after thoroughly testing your live staging build.",
    },
    {
      question: "Do I get 100% full ownership of my website, code, and accounts?",
      answer:
        "Yes, completely. You retain 100% direct ownership of your domain, hosting, code repositories, ad accounts, and creative files from day one. We never hold client assets hostage and there are zero recurring vendor lock-in fees.",
    },
    {
      question: "How does ad budget work for Meta and Google Ads?",
      answer:
        "You pay ad spend directly to Google and Meta using your own business card or UPI. We manage campaign structure, keyword research, targeting, ad creatives, and weekly optimization under a clear, transparent management retainer.",
    },
    {
      question: "Can the 24/7 WhatsApp AI bot handle multiple languages and customer inquiries?",
      answer:
        "Yes. Our WhatsApp automated assistants are configured to understand and respond in English, Hindi, and regional languages. It handles common inquiries, shares product or service details, captures qualified lead information, and escalates active inquiries directly to your phone.",
    },
    {
      question: "What happens after my website or campaign goes live?",
      answer:
        "We do not disappear after launch. We provide a hands-on walkthrough showing you how to manage new inquiries, monitor early ad performance to reduce cost-per-lead, and offer ongoing direct support for updates, maintenance, and future growth.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center flex flex-col items-center mb-10 sm:mb-12">
        {/* Main H2 */}
        <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[34px] font-extrabold tracking-tight text-[#0F172A] leading-[1.25]">
          Frequently Asked Questions
        </h2>

        {/* Lead Prose */}
        <p className="mt-3 text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal max-w-2xl mx-auto">
          Have questions about our pricing, timelines, or how our services work? Here are straight, transparent answers to the questions business owners ask us most.
        </p>
      </div>

      {/* FAQ Accordion Stack */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-sky-200/80 shadow-[0_2px_12px_rgba(2,132,199,0.03)] hover:border-sky-300 transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`services-faq-answer-${index}`}
                className="w-full px-4 py-5 sm:p-6 flex items-center justify-between gap-4 text-left font-bold text-[#0F172A] hover:text-[#0284C7] transition-colors focus-visible:outline-[#00B8F0] cursor-pointer"
              >
                <span className="text-[15px] sm:text-base leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                    isOpen
                      ? "bg-[#0284C7] text-white border-[#0284C7] rotate-180"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={`services-faq-answer-${index}`}
                  role="region"
                  className="px-4 sm:px-6 pb-6 pt-0"
                >
                  <p className="pt-2 text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Support Bar with standardized card padding and equal button sizes */}
      <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-sky-200/80 px-4 py-6 sm:p-8 shadow-xs text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-base font-bold text-[#0F172A]">
            Have a question not listed here?
          </h3>
          <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-1">
            We are always happy to answer your specific questions with zero sales pressure.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
