import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ServicesFilterableGrid } from "@/components/services/ServicesFilterableGrid";
import { ServicesHeroDropdown } from "@/components/services/ServicesHeroDropdown";
import { ServicesFaqAccordion } from "@/components/services/ServicesFaqAccordion";
import { ServicesContactForm } from "@/components/services/ServicesContactForm";
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Calendar,
  PhoneCall,
  Search,
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

      {/* Hero Section: Enterprise Systems & Engineering Suite */}
      <section className="relative min-h-[500px] lg:min-h-[560px] border-b border-[#1E2E48] pt-[123px] pb-[48px] overflow-hidden flex items-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/assets/futuristic-analytics-dashboard-office.webp"
            alt="Futuristic Analytics Dashboard Office - High-Performance Digital Solutions"
            title="Amogha Digital - Digital Services & Growth Solutions"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-center"
          />
        </div>

        {/* Dark Vignette Overlay for High Contrast & Optimal Text Readability */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-[#070D18] via-[#070D18]/88 md:via-[#070D18]/75 to-[#070D18]/40 lg:to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-t from-[#070D18]/70 via-transparent to-transparent lg:hidden"
          aria-hidden="true"
        />

        <Container className="relative z-10 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6">
            {/* High-Impact Headline (Eyebrow removed as requested) */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#F5F7FC] leading-[1.14]">
              High-Performance Systems.{" "}
              <span className="block mt-1 sm:mt-1.5">
                Built for <span className="text-[#00B8F0] font-extrabold">Predictable Revenue.</span>
              </span>
            </h1>

            {/* Supporting Paragraph Matching Attached Mockup */}
            <p className="text-[15.5px] sm:text-[17px] text-[#9BAAC2] leading-[1.7] font-normal max-w-2xl font-sans">
              Engineered custom websites, targeted Meta and Google advertising funnels, and 24/7 intelligent automation to help you attract, convert and grow.
            </p>

            {/* Horizontally Aligned Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto font-sans">
              <a
                href="#proposal-form"
                className="inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-[15px] sm:text-[16px] px-7 py-3.5 rounded-xl shadow-sm hover:shadow transition-all min-h-[48px]"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <ServicesHeroDropdown />
            </div>

            {/* Trust Badges Strip (Google Rating, 100% Client Focus, ROI-Focused Lead Gen) */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-slate-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1424]/85 border border-[#1E2E48] backdrop-blur-md shadow-xs">
                {/* Official Google Multi-Color G Icon */}
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.09C3.26 21.3 7.36 24 12 24z" />
                  <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.38l4.01-3.09z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.7 1.26 6.62l4.01 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                </svg>
                <span>Google Rating 4.9/5 (200+ Reviews)</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1424]/85 border border-[#1E2E48] backdrop-blur-md shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
                <span>100% Client Focus</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1424]/85 border border-[#1E2E48] backdrop-blur-md shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
                <span>ROI-Focused Lead Generation</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Services Section matching attached mockup */}
      <section
        id="service-grid"
        className="relative bg-gradient-to-b from-[#F4F9FD] via-[#F8FBFE] to-white py-[48px] border-b border-[#E2EBF2] text-[#0F172A] overflow-hidden"
      >
        {/* Soft Radial Ambient Wash */}
        <div
          className="absolute top-0 inset-x-0 h-96 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(224,242,254,0.65)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
            {/* Main Section H2 */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-[#0F172A] leading-[1.2]">
              Digital Services Engineered for{" "}
              <span className="text-[#00B8F0] font-extrabold whitespace-nowrap">Real Business Growth</span>
            </h2>

            {/* Subtitle Paragraph */}
            <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#475569] leading-relaxed max-w-3xl mx-auto font-normal font-sans">
              Choose the digital solution that aligns with your growth goals. From high-converting websites to targeted ad campaigns and automation, every service is designed to deliver measurable results.
            </p>
          </div>

          {/* 6 Services Grid matching attached mockup */}
          <ServicesFilterableGrid />
        </Container>
      </section>

      {/* Section 3: Client Assurance & Guarantees Strip using Hero Section Background Colors */}
      <section className="relative bg-[#070D18] py-[48px] border-b border-[#1E2E48] text-[#F5F7FC] overflow-hidden">
        {/* Atmospheric Dark Glow matching Hero */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(20,35,61,0.85)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F5F7FC] tracking-tight">
              Built With Complete Transparency &amp; Ownership
            </h2>
            <p className="mt-2.5 text-[16px] sm:text-[15px] text-[#9BAAC2] leading-relaxed font-normal">
              Zero guesswork, zero hostage platforms, and zero recurring lock-in fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0B1526]/90 rounded-2xl border border-[#1E2E48] p-6 space-y-3 shadow-lg hover:border-[#00B8F0]/60 hover:shadow-[0_0_25px_rgba(0,184,240,0.12)] transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-[#0D8C7D]/20 border border-[#0D8C7D]/40 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#0D8C7D]/30 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-[#F5F7FC] text-base group-hover:text-[#00B8F0] transition-colors">
                100% Direct Ownership
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-[#9BAAC2] leading-relaxed font-normal">
                You own your source code, hosting, domain, and ad accounts outright. Zero hostage platforms, no recurring vendor lock-in.
              </p>
            </div>

            <div className="bg-[#0B1526]/90 rounded-2xl border border-[#1E2E48] p-6 space-y-3 shadow-lg hover:border-[#00B8F0]/60 hover:shadow-[0_0_25px_rgba(0,184,240,0.12)] transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/20 border border-[#00B8F0]/40 flex items-center justify-center text-[#00B8F0] group-hover:bg-[#00B8F0]/30 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-[#F5F7FC] text-base group-hover:text-[#00B8F0] transition-colors">
                Transparent Updates
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-[#9BAAC2] leading-relaxed font-normal">
                Review progress directly with live previews and straightforward milestone checkpoints. Complete visibility from start to finish.
              </p>
            </div>

            <div className="bg-[#0B1526]/90 rounded-2xl border border-[#1E2E48] p-6 space-y-3 shadow-lg hover:border-[#00B8F0]/60 hover:shadow-[0_0_25px_rgba(0,184,240,0.12)] transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/20 border border-[#00B8F0]/40 flex items-center justify-center text-[#00B8F0] group-hover:bg-[#00B8F0]/30 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-[#F5F7FC] text-base group-hover:text-[#00B8F0] transition-colors">
                SEO &amp; High Conversion
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-[#9BAAC2] leading-relaxed font-normal">
                Structured to rank high on Google Search and turn online visitors into verified phone calls, messages, and appointments.
              </p>
            </div>

            <div className="bg-[#0B1526]/90 rounded-2xl border border-[#1E2E48] p-6 space-y-3 shadow-lg hover:border-[#00B8F0]/60 hover:shadow-[0_0_25px_rgba(0,184,240,0.12)] transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-[#0D8C7D]/20 border border-[#0D8C7D]/40 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#0D8C7D]/30 transition-colors">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-[#F5F7FC] text-base group-hover:text-[#00B8F0] transition-colors">
                Direct Dedicated Support
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-[#9BAAC2] leading-relaxed font-normal">
                Speak directly with the specialists executing your project. Fast, frictionless communication via phone and WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: Project Proposal & Discussion Form */}
      <section id="proposal-form" className="bg-[#F8FAFC] py-[48px] border-b border-slate-200/90 text-[#0F172A]">
        <Container>
          <ServicesContactForm />
        </Container>
      </section>

      {/* Section 5: Services FAQ Section with exact 48px top and bottom padding */}
      <section className="bg-[#F0F7FF] py-[48px] border-b border-sky-100">
        <Container>
          <ServicesFaqAccordion />
        </Container>
      </section>
    </>
  );
}
