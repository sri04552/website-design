import fs from "fs";
import path from "path";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFaqAccordion } from "@/components/contact/ContactFaqAccordion";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Project Consultation & Advisory | Amogha Digital",
  description:
    "Initiate your project discussion with Amogha Digital. We engineer custom high-performance web platforms, targeted performance advertising campaigns, and intelligent AI automation workflows.",
  keywords: [
    "Contact Amogha Digital",
    "Digital Engineering Consultation",
    "Enterprise Web Development",
    "Performance Marketing Agency",
    "Google Ads Management",
    "Meta Ads Agency",
    "AI Workflow Automation",
    "Next.js Development Agency",
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Amogha Digital",
    description:
      "Initiate a project consultation with Amogha Digital for custom web engineering, performance advertising, and AI workflow automation.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: "Amogha Digital",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      url: siteConfig.url,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phone,
          contactType: "Project Consultation and Technical Inquiries",
          areaServed: ["IN", "Worldwide"],
          availableLanguage: ["English", "Telugu", "Hindi"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.state,
        addressCountry: siteConfig.location.country,
      },
      sameAs: [
        siteConfig.socialLinks?.twitter,
        siteConfig.socialLinks?.linkedin,
        siteConfig.socialLinks?.instagram,
      ].filter(Boolean),
    },
  };

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        siteConfig.contact.whatsappDefaultMessage
      )}`
    : null;

  // Check for SEO-optimized corporate office boardroom background
  const heroBgCustomPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "amogha-digital-corporate-office-boardroom-contact-hero-bg.webp"
  );
  const heroBgFallbackPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "contact-hero-bg.webp"
  );
  const hasCustomHeroBg = fs.existsSync(heroBgCustomPath);
  const hasFallbackHeroBg = fs.existsSync(heroBgFallbackPath);

  const heroBgSrc = hasCustomHeroBg
    ? "/assets/amogha-digital-corporate-office-boardroom-contact-hero-bg.webp"
    : hasFallbackHeroBg
    ? "/assets/contact-hero-bg.webp"
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section: High-Level Executive Project Consultation & Advisory */}
      <section className="relative min-h-[460px] border-b border-[#1E2C44] pt-[123px] pb-[48px] overflow-hidden">
        {/* Background Image Container (Automatically loads contact-hero-bg.webp once provided) */}
        {heroBgSrc ? (
          <>
            <div className="absolute inset-0 pointer-events-none z-0">
              <Image
                src={heroBgSrc}
                alt="Amogha Digital corporate advisory headquarters"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none z-0 bg-[#070D18]/80 backdrop-blur-[1px]"
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#0A101D] pointer-events-none z-0" />
        )}

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Authoritative Editorial Introduction & Direct Actions (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dignified Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/70 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#00B8F0] uppercase font-mono">
                  PROJECT CONSULTATION &amp; ADVISORY
                </span>
              </div>

              {/* Bold Headline */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-extrabold tracking-tight text-[#F5F7FC] leading-[1.12]">
                Let’s Build What’s Next.{" "}
                <span className="block mt-1 sm:mt-2 text-[#00B8F0]">
                  Start a Conversation.
                </span>
              </h1>

              {/* Supporting Copy (16px mobile, 15px desktop) */}
              <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-xl">
                Whether you are looking to engineer a high-performance web platform, accelerate qualified customer acquisition through targeted advertising, or automate operations with AI systems, our specialists are ready to help you plan, execute, and scale.
              </p>

              {/* Instant Action Buttons with Standard min-h-[48px] */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all min-h-[48px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Now</span>
                  </a>
                )}

                <a
                  href="#inquiry-form"
                  className="inline-flex items-center justify-center gap-2 bg-[#14233D] hover:bg-[#1A2C4C] text-[#F5F7FC] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-[#29374D] hover:border-[#00B8F0]/40 transition-all min-h-[48px]"
                >
                  <span>Submit Project Details</span>
                  <ArrowDown className="w-4 h-4 text-[#00B8F0]" />
                </a>
              </div>

              {/* Reassurance Micro-Strip */}
              <div className="pt-3 border-t border-[#29374D]/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#8E9EB5]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D8C7D]" />
                  <span>Confidential Feasibility Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B8F0]" />
                  <span>100% Code &amp; Asset Ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D8C7D]" />
                  <span>Direct Technical Leadership</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[#29374D] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <Image
                  src="/assets/amogha-digital-project-consultation-advisory-desk.webp"
                  alt="Amogha Digital project consultation and client advisory desk"
                  title="Amogha Digital - Project Consultation & Advisory"
                  width={1586}
                  height={992}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Contact & Consultation Section with exact 48px padding */}
      <section
        id="inquiry-form"
        className="bg-[#F8FAFC] py-[48px] border-b border-slate-200 text-[#0F172A]"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Inquiries & Communication Channels (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <div className="space-y-3">
                <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[38px] font-extrabold tracking-tight text-[#0F172A] leading-[1.18]">
                  Connect With Our Team
                </h2>
                <p className="text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal">
                  Speak directly with our senior engineers and digital marketing directors to explore your requirements, review technical feasibility, and plan your execution roadmap.
                </p>
              </div>

              {/* Direct Communication Channels Card */}
              <div className="space-y-3 pt-2">
                {/* Phone & WhatsApp Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <Phone className="w-4 h-4 text-[#0D8C7D]" />
                      <span>Direct Advisory Line</span>
                    </div>
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D8C7D] hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Contact Now</span>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 font-medium font-mono">
                    {siteConfig.contact.phone}
                  </p>
                  <p className="text-xs text-slate-500">
                    Direct communication for scoping discussions and scheduled discovery calls.
                  </p>
                </div>

                {/* Direct Email Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <Mail className="w-4 h-4 text-[#0284C7]" />
                      <span>Corporate Inquiries</span>
                    </div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:underline"
                    >
                      <span>Compose</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">
                    {siteConfig.contact.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    Submit RFPs, detailed briefs, or existing platform audit requests.
                  </p>
                </div>

                {/* Location & Remote Delivery Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-slate-700" />
                    <span>Regional Office &amp; Global Delivery</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    Based in {siteConfig.location.city}, {siteConfig.location.state}
                  </p>
                  <p className="text-xs text-slate-500">
                    Delivering high-performance digital solutions across India and international markets.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Inquiry & Contact Form (7 cols on lg) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Accordion FAQ Section with exact 48px padding */}
      <section className="bg-white py-[48px] border-b border-slate-200 text-[#0F172A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Clear answers regarding our engagement model, project scoping, and delivery standards.
            </p>
          </div>

          <ContactFaqAccordion />
        </Container>
      </section>
    </>
  );
}
