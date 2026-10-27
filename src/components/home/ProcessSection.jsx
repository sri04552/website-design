import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageSquareText,
  Palette,
  CheckCheck,
  Rocket,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      tag: "STRATEGY & SCOPE",
      badge: "Clear Roadmap",
      title: "Discovery & Project Blueprint",
      description:
        "A focused conversation to understand your business goals, target audience, and outline a fixed quote with clear milestones and zero surprise fees.",
      icon: MessageSquareText,
      iconColor: "text-sky-600 bg-sky-50 border-sky-200/80",
    },
    {
      step: "02",
      tag: "DESIGN & BUILD",
      badge: "Custom Crafted",
      title: "Custom Design & Rapid Build",
      description:
        "Clean, mobile-first design and functional builds tailored to your brand, with private preview links shared for your direct review and feedback.",
      icon: Palette,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200/80",
    },
    {
      step: "03",
      tag: "SPEED & QUALITY",
      badge: "Quality Verified",
      title: "Performance & Quality Testing",
      description:
        "Rigorous testing for sub-2 second mobile loading, local Google search visibility, ad tracking, and reliable automated workflows before going live.",
      icon: CheckCheck,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200/80",
    },
    {
      step: "04",
      tag: "LAUNCH & HANDOVER",
      badge: "100% Asset Ownership",
      title: "Official Launch & Full Handover",
      description:
        "Production deployment with 100% asset and code ownership transferred to you, complete with a walkthrough guide and ongoing support.",
      icon: Rocket,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
    },
  ];

  // Schema.org HowTo structured data for Google rich snippet visibility
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Sri Digital Studio Delivers Digital Projects in 4 Steps",
    description:
      "A structured 4-step framework covering project discovery, custom design & build, speed and conversion testing, and live handover with 100% asset ownership.",
    step: steps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.title,
      text: item.description,
    })),
  };

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative py-[48px] bg-white border-t border-slate-200/80 text-[#0F172A]"
    >
      {/* Schema.org HowTo Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-10 sm:mb-12">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-sky-800 text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" aria-hidden="true" />
            <span>HOW WE WORK WITH YOU</span>
          </div>

          {/* Main H2 */}
          <h2
            id="process-heading"
            className="text-2xl sm:text-3.5xl lg:text-[34px] font-extrabold tracking-tight text-[#0F172A] leading-[1.25]"
          >
            From Initial Idea to Live Results in 4 Clear Steps
          </h2>

          {/* Lead Prose strictly 14px-15px */}
          <p className="mt-3 text-[14px] sm:text-[15px] text-[#475569] leading-[1.7] font-normal max-w-2xl">
            A transparent, predictable roadmap with clear communication at every stage. No guesswork, no endless delays, and no micromanagement required.
          </p>
        </div>

        {/* 4-Step Modular Grid (2x2 on tablet/desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {steps.map((item) => {
            const IconComponent = item.icon;
            return (
              <article
                key={item.step}
                aria-labelledby={`step-heading-${item.step}`}
                className="group relative bg-[#F8FAFC] hover:bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Step Number, Tag & Badge */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#0F172A] text-white text-xs font-extrabold flex items-center justify-center shrink-0 tracking-wider">
                        {item.step}
                      </span>
                      <span className="text-[13px] sm:text-[14px] font-bold text-[#0284C7] uppercase tracking-wide">
                        {item.tag}
                      </span>
                    </div>

                    <span className="inline-flex items-center text-[11.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon & Title Row - Centered vertically */}
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.iconColor}`}
                      aria-hidden="true"
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3
                      id={`step-heading-${item.step}`}
                      className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#0284C7] transition-colors"
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Step Description strictly 14px-15px */}
                  <p className="text-[13.5px] sm:text-[14px] text-[#475569] leading-[1.65] font-normal">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Clean, Grounded Action Row */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-[14px] sm:text-[15px] text-[#475569] mb-3.5 font-normal">
            Have a project in mind for web, advertising, or automation?
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 active:bg-slate-900 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-xs hover:shadow transition-all"
            >
              <span>Contact Us for a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/916304299387?text=${encodeURIComponent(
                "Hello! I saw your 4-step process and would like to discuss a project with Sri Digital Studio."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp consultation"
              className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-900 border border-emerald-300/80 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
