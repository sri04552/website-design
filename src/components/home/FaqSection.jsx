"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // Open first FAQ by default

  const faqs = [
    {
      question: "How much does a custom website or digital marketing project cost?",
      answer:
        "Every project is tailored to your business needs, but we operate with 100% fixed-price quotes and zero surprise charges. After a quick 20-minute discussion to understand your goals, we provide an itemized blueprint and a fixed quote with clear milestones before any work begins.",
    },
    {
      question: "Do I get 100% full ownership of my website, code, and accounts?",
      answer:
        "Yes, completely. Unlike agencies that hold clients hostage with proprietary platforms or registered accounts under their own names, you receive 100% direct ownership of your domain, hosting, code repositories, ad accounts, and creative files from day one.",
    },
    {
      question: "How does the 24/7 WhatsApp lead automation work?",
      answer:
        "We connect an intelligent automated WhatsApp assistant that welcomes new visitors in under 2 seconds. It answers common questions about your services or pricing, collects appointment details, and immediately alerts you on your phone so you never miss an inquiry outside business hours.",
    },
    {
      question: "Can we work together if my business is located outside Eluru?",
      answer:
        "Yes! While we are based in Eluru and regularly meet regional clients in person, we work with businesses across Andhra Pradesh and pan-India. All collaboration, screen shares, and progress reviews are handled smoothly via WhatsApp, Google Meet, and interactive preview links.",
    },
    {
      question: "Why custom-engineered websites instead of slow generic templates?",
      answer:
        "Slow generic website templates rely on heavy, bloated third-party plugins that cause sluggish loading speeds (4 to 6 seconds), frequent security vulnerabilities, and demoted Google search rankings. We build clean, modern, lightweight websites that load in under 2 seconds on mobile data, pass Google Core Web Vitals, and keep visitors engaged.",
    },
    {
      question: "What happens after my website or ad campaigns are launched?",
      answer:
        "We do not disappear after launch. We provide a hands-on walkthrough showing you how to manage new inquiries, monitor early ad performance to reduce cost-per-lead, and offer ongoing direct support for updates, maintenance, and future growth.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Schema.org FAQPage structured data for Google rich snippet visibility
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F0F7FF] border-t border-sky-100 text-[#0F172A]"
    >
      {/* Schema.org FAQ Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center flex flex-col items-center mb-10 sm:mb-12">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/90 text-sky-800 text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" aria-hidden="true" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            {/* Main H2 */}
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3.5xl lg:text-[34px] font-extrabold tracking-tight text-[#0F172A] leading-[1.25]"
            >
              Everything You Need to Know Before Getting Started
            </h2>

            {/* Lead Prose */}
            <p className="mt-3 text-[14px] sm:text-[15px] text-[#475569] leading-[1.7] font-normal max-w-2xl">
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
                    aria-controls={`faq-answer-${index}`}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-bold text-[#0F172A] hover:text-[#0284C7] transition-colors focus-visible:outline-[#00B8F0]"
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
                      id={`faq-answer-${index}`}
                      role="region"
                      className="px-5 sm:px-6 pb-6 pt-0"
                    >
                      <p className="pt-2 text-[14px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Support Bar with standardized card padding */}
          <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-sky-200/80 p-6 sm:p-8 shadow-xs text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-base font-bold text-[#0F172A]">
                Have a question not listed here?
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#64748B] mt-1">
                We are always happy to answer your specific questions with zero sales pressure.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                <span>Send an Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/916304299387?text=${encodeURIComponent(
                  "Hello! I have a question about your digital services that was not in the FAQ."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ask your question directly on WhatsApp"
                className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300/80 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
