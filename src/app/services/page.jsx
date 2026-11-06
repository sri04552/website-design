import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServicesFilterableGrid } from "@/components/services/ServicesFilterableGrid";
import { ServicesFaqAccordion } from "@/components/services/ServicesFaqAccordion";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  Globe2,
  MessageSquare,
  Cpu,
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
              "@type": "AdministrativeArea",
              name: "Telugu States (Andhra Pradesh & Telangana)",
            },
            {
              "@type": "Country",
              name: "India",
            },
          ],
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section (Deep Midnight Theme with Layered Radial Lighting & Masked Grid) */}
      <section className="relative bg-[#0B1220] border-b border-[#29374D] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        {/* Layered Radial Mesh Lighting */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(20,35,61,0.9)_0%,rgba(11,18,32,1)_100%)]"
          aria-hidden="true"
        />

        {/* Subtle Zero-Overhead CSS Architectural Grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#14233D_1px,transparent_1px),linear-gradient(to_bottom,#14233D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] opacity-30"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

          <div className="max-w-4xl mt-8 space-y-6">
            {/* Eyebrow Badge matching Homepage */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/80 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#00B8F0] uppercase">
                Digital Presence to Business Systems
              </span>
            </div>

            {/* Cinematic Main H1 Title */}
            <h1 className="font-heading text-3xl sm:text-4.5xl lg:text-5.5xl font-extrabold tracking-tight text-[#F5F7FC] leading-[1.12]">
              Digital Services &amp; Growth Systems Engineered for{" "}
              <span className="text-[#00B8F0]">Measurable Revenue</span>
            </h1>

            {/* Supporting Paragraph (16px mobile, 15px desktop matching homepage) */}
            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-3xl">
              We engineer custom, mobile-first websites that load in under 1.5 seconds, run targeted Meta and Google ad campaigns that produce qualified buyer inquiries, and deploy 24/7 WhatsApp AI automation that saves your team hours every week. Built to scale modern businesses seamlessly.
            </p>

            {/* Horizontally Aligned Action Buttons with Standard min-h-[48px] */}
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

      {/* Main Services Section (Atmospheric Soft Sky Tint Background) */}
      <section
        id="service-grid"
        className="relative bg-[#F0F7FF] py-16 sm:py-24 border-b border-sky-100 text-[#0F172A] overflow-hidden"
      >
        {/* Soft Radial Ambient Wash */}
        <div
          className="absolute top-0 inset-x-0 h-96 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(224,242,254,0.85)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mb-12 sm:mb-16">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/90 text-sky-800 text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" aria-hidden="true" />
              <span>CORE CAPABILITIES &amp; DELIVERABLES</span>
            </div>

            {/* Main Section H2 matching Homepage */}
            <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[36px] font-extrabold tracking-tight text-[#0F172A] leading-[1.25]">
              Digital Services Engineered for Real Business Growth
            </h2>

            {/* Subtitle Paragraph matching Homepage Typography */}
            <p className="mt-3 text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal">
              Every capability is executed with clean architecture, verified performance standards, and 100% direct code and account ownership. Filter by business focus to find your solution.
            </p>
          </div>

          {/* Unique, Modern Filterable Grid with Rich Visual Assets */}
          <ServicesFilterableGrid />
        </Container>
      </section>

      {/* Client Assurance & Guarantees Strip */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 border-b border-slate-200 text-[#0F172A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-sky-800 text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D8C7D]" />
              <span>CLIENT ASSURANCE &amp; PEACE OF MIND</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Engineered With Zero Guesswork &amp; Zero Lock-In
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0D8C7D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                100% Direct Ownership
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                You own your source code, hosting, domain, and ad accounts outright. Zero hostage platforms, no recurring vendor lock-in.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Live Milestone Staging
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Review progress on private staging links updated every 3 to 4 days. Complete visibility without black-box development delays.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00B8F0]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Sub-1.5s Speed Standard
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Every website is engineered to achieve 90+ Google Mobile PageSpeed scores. Fast loading keeps visitors from bouncing.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D8C7D]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Direct Technical Contact
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Speak directly with the specialist building your project. Fast, frictionless communication via phone and WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Serving Telugu States & Pan-India Section (Atmospheric Gradient Container) */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-sky-50/60 via-white to-blue-50/60 border border-sky-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(2,132,199,0.06)]">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/90 text-[#0284C7] text-xs font-semibold tracking-wider uppercase shadow-2xs">
                <Globe2 className="w-3.5 h-3.5 text-[#00B8F0]" />
                <span>NATIONWIDE SERVICE REACH</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3.5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Tailored for Telugu States, Engineered to Scale Pan-India
              </h2>
              <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                We partner with ambitious business owners across Telugu states and nationwide. Our systems are built to eliminate geographic friction and scale your customer acquisition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Fluent Bilingual Collaboration
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  Comfortable communication in clear Telugu or English so your business requirements, product nuances, and vision are executed accurately with zero lost context.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#0D8C7D] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Frictionless Remote Delivery
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  From interactive staging links and digital asset sign-offs to WhatsApp status updates, our cloud-first workflow keeps you informed at every milestone without travel overhead.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0284C7] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Dedicated Direct Support
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  No junior account managers or call center queues. You receive dedicated, direct founder-level access for every project, regardless of where your company is based.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services FAQ Section (Interactive Accordion matching Homepage) */}
      <section className="bg-[#F0F7FF] py-16 sm:py-24 border-b border-sky-100">
        <Container>
          <ServicesFaqAccordion />
        </Container>
      </section>

      {/* Final Diagnostic Conversion CTA (Dark Midnight Theme matching Homepage) */}
      <section className="relative bg-[#0B1220] py-16 sm:py-24 text-center overflow-hidden">
        {/* Deep Atmospheric Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(20,35,61,0.9)_0%,rgba(11,18,32,1)_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D] text-[11px] font-semibold text-[#00B8F0] uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" />
              <span>Zero-Pressure Project Consultation</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight leading-tight">
              Not Sure Which Solution Fits Your Current Business Stage?
            </h2>

            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-relaxed font-normal max-w-2xl mx-auto">
              Share your current business website URL or outline your growth objectives. We will analyze your digital footprint and provide a clear, prioritized action plan with zero sales pressure.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base px-7 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
              >
                <span>Request Project Proposal</span>
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
