import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      tag: "STRATEGY & SCOPE",
      badge: "Clear Roadmap",
      description:
        "A focused conversation to understand your business goals, target audience, and outline a fixed quote with clear milestones and zero surprise fees.",
    },
    {
      step: "02",
      tag: "DESIGN & BUILD",
      badge: "Custom Crafted",
      description:
        "Clean, mobile-first design and functional builds tailored to your brand, with private preview links shared for your direct review and feedback.",
    },
    {
      step: "03",
      tag: "SPEED & QUALITY",
      badge: "Quality Verified",
      description:
        "Rigorous testing for sub-2 second mobile loading, local Google search visibility, ad tracking, and reliable automated workflows before going live.",
    },
    {
      step: "04",
      tag: "LAUNCH & HANDOVER",
      badge: "100% Asset Ownership",
      description:
        "Production deployment with 100% asset and code ownership transferred to you, complete with a walkthrough guide and ongoing support.",
    },
  ];

  // Schema.org HowTo structured data for Google rich snippet visibility
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Amogha Digital Delivers Digital Projects in 4 Steps",
    description:
      "A structured 4-step framework covering project discovery, custom design & build, speed and conversion testing, and live handover with 100% asset ownership.",
    step: steps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.tag,
      text: item.description,
    })),
  };

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative py-[24px] lg:py-[48px] bg-white border-t border-slate-200/80 text-[#0F172A]"
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

          {/* Lead Prose increased by 2px */}
          <p className="mt-3 text-[16px] sm:text-[17px] text-[#475569] leading-[1.75] font-normal max-w-2xl">
            A transparent, predictable roadmap with clear communication at every stage. No guesswork, no endless delays, and no micromanagement required.
          </p>
        </div>

        {/* 4-Step Modular Grid (2x2 on tablet/desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {steps.map((item) => {
            return (
              <article
                key={item.step}
                aria-labelledby={`step-heading-${item.step}`}
                className="group relative bg-[#F8FAFC] hover:bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300/80 px-4 py-6 sm:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Tag & Badge without number or divider lines */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3
                      id={`step-heading-${item.step}`}
                      className="text-sm sm:text-base font-bold text-[#0284C7] uppercase tracking-wide"
                    >
                      {item.tag}
                    </h3>

                    <span className="inline-flex items-center text-[11.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Step Description increased by 2px */}
                  <p className="text-[15.5px] sm:text-[16px] text-[#475569] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Clean, Grounded Action Row with standardized equal button sizes */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-[16px] sm:text-[17px] text-[#475569] mb-4 font-normal">
            Have a project in mind for web, advertising, or automation?
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 active:bg-slate-900 text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
            >
              <span>Contact Us for a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/916304299387?text=${encodeURIComponent(
                "Hello! I saw your 4-step process and would like to discuss a project with Amogha Digital."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct project consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-900 border border-emerald-300/80 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-lg transition-colors min-h-[48px]"
            >
              <span>Direct Project Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
