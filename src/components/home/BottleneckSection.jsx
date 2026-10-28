import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function BottleneckSection() {
  const bottlenecks = [
    {
      id: "speed-seo",
      tag: "WEBSITE SPEED & GOOGLE SEARCH",
      problemTitle: "Slow Loading on Mobile Phones & Buried on Google Page 2",
      problemDescription:
        "When potential customers search for your services on their phones, they will not wait 4 to 5 seconds for a slow page to load. They leave and call your competitor instead. Google notices this high drop-off and pushes your website further down the search results.",
      solutionTitle: "Lightning-Fast Mobile Pages That Rank on Top of Google",
      solutionDescription:
        "We build clean, ultra-fast websites that open instantly in under 2 seconds on any mobile connection. We optimize your local Google search tags so neighborhood clients find you first and can tap one button to call or WhatsApp you directly.",
    },
    {
      id: "ad-waste",
      tag: "ADVERTISING THAT ACTUALLY WORKS",
      problemTitle: "Spending Money on Ads but Getting Zero Real Inquiries",
      problemDescription:
        "Many business owners spend thousands on Facebook or Instagram 'boost post' buttons, only to get random likes and accidental clicks from people who never buy. You end up burning your monthly marketing budget with no genuine phone calls to show for it.",
      solutionTitle: "Ads Shown Only to People Ready to Buy Right Now",
      solutionDescription:
        "We set up targeted Google and social media campaigns focused strictly on high-intent buyers in your city actively searching for your services today. Every rupee spent brings genuine customer inquiries directly to your WhatsApp and phone.",
    },
    {
      id: "response-leak",
      tag: "NEVER MISS A CUSTOMER INQUIRY",
      problemTitle: "Losing Customers in the Evening and on Weekends",
      problemDescription:
        "Over 60% of customers search for services at night or during weekends when your office is closed. If they fill out an inquiry form and do not hear back within minutes, they move on and message another business that replies immediately.",
      solutionTitle: "Instant 24/7 WhatsApp Replies That Book Customers For You",
      solutionDescription:
        "We connect a smart automated WhatsApp assistant that welcomes new visitors in under 2 seconds, answers common questions, shares your pricing or catalog, and collects appointment details even while you sleep.",
    },
  ];

  // Schema.org FAQPage structured data for Google rich snippet visibility
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bottlenecks.map((item) => ({
      "@type": "Question",
      name: item.problemTitle,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${item.problemDescription} How we fix it: ${item.solutionDescription}`,
      },
    })),
  };

  return (
    <section
      id="bottlenecks"
      aria-labelledby="bottlenecks-heading"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F0F7FF] border-t border-sky-100 text-[#0F172A]"
    >
      {/* Schema.org FAQ Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric 2-Column Split: Editorial & Visual Left, Problem/Solution Stack Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Context, Visual & Action (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-start">
            {/* Eyebrow Pill - Hidden on Mobile and Tablet, Visible on Desktop */}
            <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/90 text-sky-800 text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" aria-hidden="true" />
              <span>WHY YOUR WEBSITE ISN&apos;T GETTING CUSTOMERS</span>
            </div>

            {/* Main H2 */}
            <h2
              id="bottlenecks-heading"
              className="text-2xl sm:text-3.5xl lg:text-[34px] font-extrabold tracking-tight text-[#0F172A] leading-[1.25]"
            >
              The 3 Hidden Reasons Most Business Websites Fail to Get Calls
            </h2>

            {/* Supporting Visual Mockup */}
            <div className="mt-5 w-full rounded-2xl overflow-hidden border border-sky-200/80 shadow-[0_6px_24px_rgba(2,132,199,0.06)] bg-white">
              <figure className="relative aspect-[16/10] w-full m-0 bg-[#E0F2FE]">
                <Image
                  src="/assets/bottleneck-solution.webp"
                  alt="Comparison of common website bottlenecks like slow mobile speed and missed inquiries versus automated lead capture solutions"
                  title="Website Problem and Solution Diagnostic"
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  unoptimized
                />
                <figcaption className="sr-only">
                  Diagnostic illustration showing how slow mobile websites and delayed responses cause businesses to lose customers to competitors.
                </figcaption>
              </figure>
            </div>

            {/* Supporting Prose with increased 2px font size */}
            <p className="mt-5 text-[16px] sm:text-[17px] text-[#475569] leading-[1.75] font-normal">
              Most businesses do not have bad products or services. Their website simply leaks potential customers before they have a chance to call. Whether your site is too slow on mobile phones, your ad budget gets spent on random clicks, or customer inquiries go unanswered after work hours, here is how we fix each leak so you get steady, qualified customer enquiries.
            </p>

            {/* WhatsApp Direct Action Button with standardized size */}
            <div className="mt-6 w-full">
              <a
                href={`https://wa.me/916304299387?text=${encodeURIComponent(
                  "Hello! I saw your website breakdown and want to discuss fixing my website to get more customer inquiries."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discuss fixing your website bottlenecks directly on WhatsApp"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Fix Your Website Leaks on WhatsApp</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Stacked Problem-Solution Transformation Rows (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {bottlenecks.map((item) => (
              <article
                key={item.id}
                aria-labelledby={`heading-${item.id}`}
                className="bg-white rounded-2xl border border-sky-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(2,132,199,0.04)] hover:shadow-[0_8px_28px_rgba(2,132,199,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                {/* Module Category Tag without divider lines or badges */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* The Problem Block - Apple-style spacious typography */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" aria-hidden="true" />
                    <span>The Problem</span>
                  </div>
                  <h3
                    id={`heading-${item.id}`}
                    className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug"
                  >
                    {item.problemTitle}
                  </h3>
                  <p className="text-[16px] sm:text-[17px] text-[#475569] leading-relaxed font-normal">
                    {item.problemDescription}
                  </p>
                </div>

                {/* The Solution Block - Apple-style clean elevated card */}
                <div className="mt-6 rounded-xl bg-emerald-50/70 border border-emerald-100 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>Our Solution</span>
                  </div>
                  <h4 className="mt-2 text-base sm:text-lg font-bold text-emerald-950 leading-snug">
                    {item.solutionTitle}
                  </h4>
                  <p className="mt-2 text-[16px] sm:text-[17px] text-emerald-950/90 leading-relaxed font-normal">
                    {item.solutionDescription}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
