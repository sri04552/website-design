import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServicesFilterableGrid } from "@/components/services/ServicesFilterableGrid";
import { ServicesFaqAccordion } from "@/components/services/ServicesFaqAccordion";
import { ServicesContactForm } from "@/components/services/ServicesContactForm";
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Search,
  Globe2,
  MessageSquare,
  Cpu,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Digital Services & Growth Solutions | Web, Ads & AI | Amogha Digital",
  description:
    "High-performance website development, targeted Meta & Google Ads, and 24/7 AI WhatsApp automation for growing businesses across India and worldwide.",
  keywords: [
    "Website Design Company",
    "Web Development Agency",
    "Meta Ads Management",
    "Google Ads Management Agency",
    "AI Automation Chatbots",
    "WhatsApp Business Automation",
    "Graphic Design & Brand Identity",
    "AI Video Marketing Reels",
    "Full Service Digital Agency",
    "Ecommerce Web Development",
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
          "End-to-end digital solutions including custom website design, paid advertising campaigns, brand identity, and AI workflow automation.",
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
              "@type": "Country",
              name: "India",
            },
            {
              "@type": "AdministrativeArea",
              name: "Worldwide",
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

      {/* Hero Section: Modern Editorial Layout with 48px Bottom Padding */}
      <section className="relative bg-[#0B1220] border-b border-[#29374D] pt-[123px] pb-[48px] overflow-hidden">
        {/* Layered Radial Mesh Lighting */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(20,35,61,0.9)_0%,rgba(11,18,32,1)_100%)]"
          aria-hidden="true"
        />

        {/* Zero-Overhead CSS Architectural Grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#14233D_1px,transparent_1px),linear-gradient(to_bottom,#14233D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] opacity-30"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

          <div className="max-w-4xl mt-6 space-y-6">
            {/* Eyebrow Badge kept strictly for Hero */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/80 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#00B8F0] uppercase">
                DIGITAL SERVICES &amp; SOLUTIONS
              </span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#F5F7FC] leading-[1.12]">
              High-Performance Systems.{" "}
              <span className="block mt-1 sm:mt-2">
                Built for <span className="text-[#00B8F0]">Predictable Revenue</span>.
              </span>
            </h1>

            {/* Supporting Paragraph (16px mobile, 15px desktop) */}
            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-2xl">
              Engineering custom websites, targeted Meta and Google advertising funnels, and 24/7 automated WhatsApp workflows designed to capture and convert qualified buyers.
            </p>

            {/* Horizontally Aligned Action Buttons with Standard min-h-[48px] */}
            <div className="pt-1 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#proposal-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base px-7 py-3.5 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
              >
                <span>Request Project Proposal</span>
                <Sparkles className="w-4 h-4 text-white/90" />
              </a>

              <a
                href="#service-grid"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14233D] hover:bg-[#1A2C4C] text-[#F5F7FC] font-semibold text-base px-6 py-3.5 rounded-lg border border-[#29374D] hover:border-[#00B8F0]/40 transition-all min-h-[48px]"
              >
                <span>Explore All 6 Services</span>
                <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
              </a>
            </div>

            {/* SEO-focused 3-Pillar Growth Strip */}
            <div className="pt-4 border-t border-[#29374D]/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-[13px] text-[#9BAAC2]">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00B8F0] shrink-0" />
                <span>Google Ranking &amp; SEO Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0D8C7D] shrink-0" />
                <span>100% Direct Code &amp; Account Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00B8F0] shrink-0" />
                <span>ROI-Focused Lead Generation Systems</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Services Section with exact 48px top and bottom padding */}
      <section
        id="service-grid"
        className="relative bg-[#F0F7FF] py-[48px] border-b border-sky-100 text-[#0F172A] overflow-hidden"
      >
        {/* Soft Radial Ambient Wash */}
        <div
          className="absolute top-0 inset-x-0 h-96 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(224,242,254,0.85)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mb-10">
            {/* Main Section H2 */}
            <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[34px] font-extrabold tracking-tight text-[#0F172A] leading-[1.25]">
              Digital Services Engineered for Real Business Growth
            </h2>

            {/* Subtitle Paragraph */}
            <p className="mt-3 text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal">
              Choose the digital solution that aligns with your growth goals. From high-converting websites to targeted ad campaigns and automation, every service is engineered for tangible business results.
            </p>
          </div>

          {/* Filterable Grid with Home Page Card Styles & New Key Highlights UI */}
          <ServicesFilterableGrid />
        </Container>
      </section>

      {/* Client Assurance & Guarantees Strip with exact 48px top and bottom padding */}
      <section className="bg-[#F8FAFC] py-[48px] border-b border-slate-200 text-[#0F172A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Built With Complete Transparency &amp; Ownership
            </h2>
            <p className="mt-2.5 text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Zero guesswork, zero hostage platforms, and zero recurring lock-in fees.
            </p>
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
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Transparent Updates
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Review progress directly with live previews and straightforward milestone checkpoints. Complete visibility from start to finish.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00B8F0]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                SEO &amp; High Conversion
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Structured to rank high on Google Search and turn online visitors into verified phone calls, messages, and appointments.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D8C7D]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Direct Dedicated Support
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Speak directly with the specialists executing your project. Fast, frictionless communication via phone and WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Serving Across India & Worldwide Section with exact 48px top and bottom padding */}
      <section className="bg-white py-[48px] border-b border-slate-200">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-sky-50/60 via-white to-blue-50/60 border border-sky-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(2,132,199,0.06)]">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
              <h2 className="font-heading text-2xl sm:text-3.5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Serving Growing Businesses Across India &amp; Globally
              </h2>
              <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                As an independent digital agency, we deliver complete end-to-end digital solutions for businesses in every state and industry, backed by seamless remote collaboration and proven growth frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Clear Multi-Lingual Collaboration
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  Smooth, transparent communication in English and regional languages so your business requirements, target audience, and goals are understood and executed with precision.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#0D8C7D] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Frictionless Remote Execution
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  From real-time preview links and digital asset approvals to WhatsApp status updates, our cloud-first workflow keeps you informed at every milestone wherever your company is based.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0284C7] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Dedicated Direct Attention
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  Work directly with our core specialists rather than through middle agencies. We provide dedicated attention, transparent reporting, and high accountability for every project.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services FAQ Section with exact 48px top and bottom padding */}
      <section className="bg-[#F0F7FF] py-[48px] border-b border-sky-100">
        <Container>
          <ServicesFaqAccordion />
        </Container>
      </section>

      {/* Last Section: Contact & Project Proposal Form with All Services Dropdown */}
      <section id="proposal-form" className="bg-[#F8FAFC] py-[48px] border-t border-slate-200/90 text-[#0F172A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 space-y-2.5">
            <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[36px] font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Ready to Scale Your Business? Let&apos;s Discuss Your Project
            </h2>
            <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal max-w-2xl mx-auto">
              Fill out the form below to receive a customized proposal and transparent pricing for your digital requirements. We typically respond within 24 hours.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ServicesContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
