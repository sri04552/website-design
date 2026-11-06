import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServicesFilterableGrid } from "@/components/services/ServicesFilterableGrid";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  MapPin,
  Layers,
  PhoneCall,
  Clock,
  Code,
  Share2,
  Bot,
} from "lucide-react";

export const metadata = {
  title: "Digital Services in Eluru & AP | Web, Ads & AI | Amogha Digital",
  description:
    "High-performance website development, targeted Meta & Google Ads, and 24/7 AI WhatsApp automation for businesses in Eluru, Andhra Pradesh, and across India.",
  keywords: [
    "Website Design Eluru",
    "Web Development Company Andhra Pradesh",
    "Meta Ads Management Eluru",
    "Google Ads Management Vijayawada",
    "AI Automation Chatbots India",
    "WhatsApp Business Automation Andhra Pradesh",
    "Graphic Design Services Eluru",
    "AI Video Marketing Reels",
    "Custom Business Websites Eluru",
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteConfig.url}/services`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Amogha Digital Services Suite",
        description:
          "Full-funnel digital solutions including custom web development, paid advertising, and AI automation.",
        itemListElement: siteConfig.services.map((service, index) => ({
          "@type": "Service",
          position: index + 1,
          name: service.title,
          description: service.tagline,
          url: `${siteConfig.url}${service.href}`,
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          areaServed: [
            {
              "@type": "City",
              name: "Eluru",
            },
            {
              "@type": "State",
              name: "Andhra Pradesh",
            },
            {
              "@type": "Country",
              name: "India",
            },
          ],
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long does it take to launch a custom business website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A standard custom business website typically launches in 10 to 14 business days from scope confirmation. We share live staging links every 3 to 4 days so you review progress at each milestone.",
            },
          },
          {
            "@type": "Question",
            name: "Do I own 100% of my website code, domain, and advertising accounts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, absolutely. You retain 100% direct ownership of your domain, hosting, source code repository, and ad accounts. We never hold client assets hostage and there are zero recurring vendor lock-in fees.",
            },
          },
          {
            "@type": "Question",
            name: "How do Meta and Google Ads work together for local businesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google Search Ads capture customers actively searching for your service right now (e.g., 'diagnostic center near me'). Meta Ads (Facebook & Instagram) build brand awareness and put targeted offers in front of local demographics who match your ideal customer profile.",
            },
          },
        ],
      },
    ],
  };

  const bundles = [
    {
      tier: "TIER 1",
      name: "Local Business Launchpad",
      tagline: "Essential digital presence for businesses ready to dominate local search.",
      turnaround: "10–14 Days",
      popular: false,
      deliverables: [
        "Custom, mobile-first website (sub-1.5s load speed)",
        "Google Business Profile & Google Maps verification setup",
        "Direct WhatsApp click-to-chat & phone call conversion funnels",
        "On-page Local SEO schema & semantic search markup",
        "100% direct code & domain ownership with zero lock-in",
      ],
      idealFor: "Retailers, clinics, local showrooms, and new regional ventures.",
    },
    {
      tier: "TIER 2",
      name: "Customer Acquisition Engine",
      tagline: "High-intent lead generation stack designed for predictable weekly inquiries.",
      turnaround: "7–10 Days",
      popular: true,
      deliverables: [
        "High-converting landing page optimized for mobile conversions",
        "Targeted Meta (FB & IG) OR Google Search Ads campaign setup",
        "Negative keyword filters & geo-fenced Andhra Pradesh audience targeting",
        "Direct WhatsApp lead routing & call tracking setup",
        "Weekly performance reports detailing cost per inquiry",
      ],
      idealFor: "Showrooms, real estate promoters, hospitals, and high-ticket service providers.",
    },
    {
      tier: "TIER 3",
      name: "Digital Autopilot Suite",
      tagline: "End-to-end digital operations: custom web app, paid ads & 24/7 AI automation.",
      turnaround: "14–21 Days",
      popular: false,
      deliverables: [
        "Full custom web application with interactive product/service catalog",
        "Integrated Meta & Google Ads campaigns driving steady traffic",
        "24/7 intelligent WhatsApp AI chatbot for instant lead qualification",
        "Automated Google Sheets / CRM lead sync with instant phone notifications",
        "Dedicated monthly performance optimization & priority technical support",
      ],
      idealFor: "Established enterprises, exporters, and multi-location business operations.",
    },
  ];

  const serviceFaqs = [
    {
      q: "How do we get started on a project?",
      a: "Getting started begins with a straightforward 15-minute diagnostic call or WhatsApp conversation. We discuss your business objectives, review any existing digital assets, and send a transparent scope document with fixed deliverables, clear milestones, and timelines.",
    },
    {
      q: "Do I have to pay the entire project fee upfront?",
      a: "No. Projects follow milestone-based payments (typically 50% deposit upon blueprint agreement, and 50% upon final testing approval and live domain handover). You only approve final payment after thoroughly testing your live staging build.",
    },
    {
      q: "How does ad budget work for Meta and Google Ads?",
      a: "You pay ad spend directly to Google and Meta using your own business credit/debit card or UPI. We manage campaign structure, keyword research, targeting, ad creatives, and weekly optimization under a clear, transparent management retainer.",
    },
    {
      q: "Can the 24/7 WhatsApp AI bot handle Telugu and English queries?",
      a: "Yes. Our WhatsApp assistants can be configured to understand and respond in bilingual Telugu, English, or conversational colloquial phrasing. It answers frequently asked questions, shares pricing or catalog details, and escalates complex questions directly to your phone.",
    },
    {
      q: "What happens after my website or campaign goes live?",
      a: "We provide comprehensive handover documentation, verify all analytics and search console indexing, and include complimentary post-launch support to ensure everything operates flawlessly.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section (Dark Midnight Theme) */}
      <section className="bg-[#0B1220] border-b border-[#29374D] pt-28 sm:pt-36 pb-16 sm:pb-24">
        <Container>
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

          <div className="max-w-4xl mt-8 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/80 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#00B8F0] uppercase">
                Commercial Growth Systems
              </span>
            </div>

            {/* Main H1 Title */}
            <h1 className="font-heading text-3xl sm:text-4.5xl lg:text-5.5xl font-extrabold tracking-tight text-[#F5F7FC] leading-[1.15]">
              Digital Services &amp; Growth Systems Engineered for{" "}
              <span className="text-[#00B8F0]">Measurable Revenue</span>
            </h1>

            {/* SEO-Rich Lead Supporting Paragraph */}
            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-3xl">
              We engineer custom, mobile-first websites that load in under 1.5 seconds, run targeted Meta and Google ad campaigns that produce qualified local buyer inquiries, and deploy 24/7 WhatsApp AI automation that saves your team hours every week. Built for ambitious enterprises in Eluru, Andhra Pradesh, and across India.
            </p>

            {/* Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base px-7 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
              >
                <span>Request Project Proposal</span>
                <Sparkles className="w-4 h-4 text-white/90" />
              </Link>

              <a
                href="#service-grid"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14233D] hover:bg-[#1A2C4C] text-[#F5F7FC] font-semibold text-base px-6 py-3.5 rounded-lg border border-[#29374D] hover:border-[#00B8F0]/40 transition-all min-h-[48px]"
              >
                <span>Explore All 6 Services</span>
                <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Services Grid Section (Light Slate / Sky Theme) */}
      <section id="service-grid" className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3">
              Solutions Matrix
            </span>
            <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Core Capabilities: Web Engineering, Paid Advertising &amp; Automation
            </h2>
            <p className="mt-3 text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Every service is delivered with transparent milestone tracking, clean documentation, and 100% client asset ownership. Filter by business goal to find your ideal solution.
            </p>
          </div>

          {/* Interactive Client Filterable Grid */}
          <ServicesFilterableGrid />
        </Container>
      </section>

      {/* Growth Bundles Section (Upsell Packages) */}
      <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Packages
            </span>
            <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Full-Funnel Digital Growth Bundles
            </h2>
            <p className="mt-3 text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Combine custom web engineering, targeted paid acquisition, and automated operational workflows into a single synchronized growth engine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {bundles.map((bundle, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border px-4 py-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  bundle.popular
                    ? "bg-[#0B1220] border-[#00B8F0] text-white shadow-xl lg:scale-105 z-10"
                    : "bg-[#F8FAFC] border-slate-200 text-[#0F172A] shadow-xs"
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00B8F0] text-[#0B1220] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    Most Popular Growth Stack
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        bundle.popular ? "text-[#00B8F0]" : "text-[#0284C7]"
                      }`}
                    >
                      {bundle.tier}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        bundle.popular
                          ? "bg-[#14233D] text-[#9BAAC2] border-[#29374D]"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {bundle.turnaround}
                    </span>
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl font-bold leading-snug ${
                      bundle.popular ? "text-white" : "text-[#0F172A]"
                    }`}
                  >
                    {bundle.name}
                  </h3>

                  <p
                    className={`text-[16px] sm:text-[15px] leading-relaxed font-normal ${
                      bundle.popular ? "text-[#9BAAC2]" : "text-[#475569]"
                    }`}
                  >
                    {bundle.tagline}
                  </p>

                  <div className="pt-2 border-t border-slate-200/40 space-y-2.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        bundle.popular ? "text-slate-300" : "text-slate-900"
                      }`}
                    >
                      Package Inclusions:
                    </span>
                    <ul className="space-y-2">
                      {bundle.deliverables.map((item, dIdx) => (
                        <li
                          key={dIdx}
                          className={`flex items-start gap-2 text-xs sm:text-[13.5px] leading-normal ${
                            bundle.popular ? "text-slate-200" : "text-slate-700"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              bundle.popular ? "text-[#00B8F0]" : "text-[#0D8C7D]"
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`pt-3 border-t text-xs leading-relaxed ${
                      bundle.popular
                        ? "border-[#29374D] text-[#9BAAC2]"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    <strong className={bundle.popular ? "text-slate-200" : "text-slate-800"}>
                      Best Suited For:
                    </strong>{" "}
                    {bundle.idealFor}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/40">
                  <Link
                    href={`/contact?bundle=${encodeURIComponent(bundle.name)}`}
                    className={`w-full inline-flex items-center justify-center gap-2 font-semibold text-base py-3.5 rounded-lg transition-all min-h-[48px] ${
                      bundle.popular
                        ? "bg-[#00B8F0] hover:bg-[#00A3D6] text-[#0B1220] shadow-md"
                        : "bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white shadow-sm"
                    }`}
                  >
                    <span>Enquire About {bundle.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Client Assurance & Guarantees Strip */}
      <section className="bg-[#F8FAFC] py-14 sm:py-20 border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2.5 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-[#0D8C7D]" />
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                100% Direct Asset Ownership
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                You own your source code, domain, and ad accounts outright. Zero hostage platforms, no recurring vendor lock-in.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2.5 shadow-2xs">
              <Clock className="w-6 h-6 text-[#0284C7]" />
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                Live Milestone Staging
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Review progress on private staging links updated every 3 to 4 days. Complete visibility without black-box delays.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2.5 shadow-2xs">
              <Zap className="w-6 h-6 text-[#00B8F0]" />
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                Sub-1.5s Speed Guarantee
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Websites engineered to achieve 90+ Google Mobile PageSpeed scores. Fast loading keeps visitors from bouncing.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2.5 shadow-2xs">
              <PhoneCall className="w-6 h-6 text-[#0D8C7D]" />
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                Direct Technical Contact
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Speak directly with the specialist building your project. Fast, frictionless communication via phone and WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Regional Focus & Service Coverage */}
      <section className="bg-white py-12 sm:py-16 border-b border-slate-200">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Local In-Person Presence &amp; Pan-India Remote Capability
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Based in Eluru, Andhra Pradesh with flexible in-person consultations and seamless remote project execution nationwide.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2">
              {[
                "Eluru (HQ & In-Person)",
                "Vijayawada & Amaravati",
                "West Godavari District",
                "Andhra Pradesh Regional",
                "Remote Pan-India Clients",
              ].map((location, lIdx) => (
                <span
                  key={lIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>{location}</span>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Services FAQ Section */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-2">
                Questions Answered
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-extrabold text-[#0F172A] tracking-tight">
                Frequently Asked Questions About Our Services
              </h2>
              <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                Straight answers about project timelines, pricing, ad spend, and code ownership.
              </p>
            </div>

            <div className="space-y-4">
              {serviceFaqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-white rounded-xl border border-sky-200/80 p-5 sm:p-6 space-y-2 shadow-2xs"
                >
                  <h3 className="text-base font-bold text-[#0F172A] flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed pl-7 font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final Diagnostic Conversion CTA (Dark Theme) */}
      <section className="bg-[#0B1220] py-16 sm:py-24 text-center">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#29374D] bg-[#14233D] text-[11px] font-semibold text-[#00B8F0] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" />
              <span>Zero-Pressure Project Consultation</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Not Sure Which Solution Fits Your Current Business Stage?
            </h2>

            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-relaxed font-normal max-w-2xl mx-auto">
              Share your business website URL or current growth challenge. We will analyze your digital footprint and outline a clear, prioritized action plan tailored to your budget and timeline.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base px-7 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
              >
                <span>Request Free Project Consultation</span>
                <Sparkles className="w-4 h-4 text-white/90" />
              </Link>

              <a
                href={`https://wa.me/916304299387?text=${encodeURIComponent(
                  "Hello! I am reviewing your services page and would like guidance on which solution fits my business best."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14233D] hover:bg-[#1A2C4C] text-[#F5F7FC] font-semibold text-base px-6 py-3.5 rounded-lg border border-[#29374D] hover:border-[#00B8F0]/40 transition-all min-h-[48px]"
              >
                <span>Direct WhatsApp Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
