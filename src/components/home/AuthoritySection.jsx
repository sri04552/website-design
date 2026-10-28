import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  MapPin,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function AuthoritySection() {
  const auditPoints = [
    {
      metric: "Mobile Page Speed",
      bad: "5.8s+ load time on bloated templates (53% bounce)",
      good: "Sub-2.0s Core Web Vitals on regional 4G & 5G networks",
      icon: Zap,
    },
    {
      metric: "Search Engine Indexing",
      bad: "Zero local schema; invisible to nearby searchers",
      good: "Schema.org Geo & Postal markup for top Google rank",
      icon: TrendingUp,
    },
    {
      metric: "Inquiry Capture",
      bad: "Long 7-field forms with 80% user drop-off rate",
      good: "1-click direct WhatsApp chat & instant notification",
      icon: MessageCircle,
    },
    {
      metric: "Code & Asset Rights",
      bad: "Proprietary CMS lock-in with monthly hostage fees",
      good: "100% direct code ownership with zero vendor lock-in",
      icon: ShieldCheck,
    },
  ];

  // Schema.org FAQ/LocalBusiness structured data for SEO authority
  const authorityJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description:
      "High-performance website development, local SEO optimization, and digital customer acquisition serving Eluru, Vijayawada, Andhra Pradesh, and clients across India.",
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
    },
    areaServed: [
      "Eluru",
      "Vijayawada",
      "West Godavari",
      "Andhra Pradesh",
      "India",
    ],
  };

  return (
    <section
      id="authority"
      aria-labelledby="authority-heading"
      className="relative py-[48px] bg-[#F0F7FF] border-t border-sky-100 text-[#0F172A]"
    >
      {/* Schema.org LocalBusiness Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorityJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric 2-Column Real-World Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Local Authority & SEO Prose (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/90 text-sky-800 text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" aria-hidden="true" />
              <span>LOCAL SEARCH AUTHORITY • PAN-INDIA SCALE</span>
            </div>

            {/* Main H2 */}
            <h2
              id="authority-heading"
              className="text-2xl sm:text-3.5xl lg:text-[38px] font-extrabold tracking-tight text-[#0F172A] leading-[1.2]"
            >
              Why Mobile Speed &amp; Local Search Readiness Dictate Real Revenue
            </h2>

            {/* Structured SEO Prose strictly 14px-15px */}
            <div className="mt-4 space-y-3.5 text-[14px] sm:text-[15px] text-[#475569] leading-[1.7] font-normal">
              <p>
                In competitive markets across Eluru and Andhra Pradesh, over 70% of high-intent buying decisions originate on smartphones. When a prospective customer searches for your services, Google evaluates page speed, mobile layout stability, and structured schema data before deciding which business ranks at the top.
              </p>
              <p>
                A beautiful design that takes 5+ seconds to load loses more than half its traffic before anyone reads the headline. We engineer every asset with clean semantic HTML, local PostalAddress schema, and friction-free communication channels so search engines rank your business and visitors convert immediately.
              </p>
            </div>

            {/* Regional Coverage Tag Strip */}
            <div className="mt-5 pt-4 border-t border-sky-200/60 w-full">
              <p className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
                Targeted Geographic Focus &amp; Service Reach:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Eluru (HQ & In-Person)",
                  "Vijayawada & Amaravati",
                  "West Godavari District",
                  "Andhra Pradesh Regional",
                  "Remote Pan-India Clients",
                ].map((region, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sky-200/80 text-[12px] font-semibold text-slate-700 shadow-2xs"
                  >
                    <MapPin className="w-3 h-3 text-[#0284C7]" aria-hidden="true" />
                    <span>{region}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Infrastructure Audit Card (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl border border-sky-200/80 px-4 py-5 sm:p-6 shadow-[0_8px_30px_rgba(2,132,199,0.06)] flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="border-b border-slate-100 pb-3.5 mb-4">
                  <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider">
                    INFRASTRUCTURE BENCHMARK
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mt-0.5 leading-snug">
                    Standard Website vs. Engineered Growth Asset
                  </h3>
                </div>

                {/* Comparative Checklist Items */}
                <div className="space-y-3.5">
                  {auditPoints.map((pt, idx) => {
                    const Icon = pt.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-slate-50/80 rounded-xl p-3 sm:p-3.5 border border-slate-100"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                            {pt.metric}
                          </h4>
                        </div>

                        {/* Traditional / Bad */}
                        <div className="flex items-start gap-2 text-[12px] text-rose-600/90 leading-tight mb-1">
                          <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{pt.bad}</span>
                        </div>

                        {/* Engineered / Good */}
                        <div className="flex items-start gap-2 text-[12.5px] font-medium text-emerald-800 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" aria-hidden="true" />
                          <span>{pt.good}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Micro-CTA */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/916304299387?text=${encodeURIComponent(
                    "Hello! I would like a free search visibility and speed audit of my current business website."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Request free search and speed audit on WhatsApp"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xs hover:shadow transition-all"
                >
                  <span>Request Free Search &amp; Speed Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
