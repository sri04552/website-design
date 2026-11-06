import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Start Your Project | Amogha Digital",
  description:
    "Get in touch with Amogha Digital for custom website development, Meta & Google ads management, and 24/7 AI WhatsApp automation. Fast 24-hour turnaround.",
  keywords: [
    "Contact Amogha Digital",
    "Hire Web Developer India",
    "Meta Ads Agency Contact",
    "Google Ads Management Inquiry",
    "WhatsApp AI Automation Consultation",
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
      "Get in touch for custom website development, Meta & Google Ads management, and AI workflow automation.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.state,
        addressCountry: siteConfig.location.country,
      },
      areaServed: siteConfig.location.serviceArea,
    },
  };

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        siteConfig.contact.whatsappDefaultMessage
      )}`
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section: Architectural Dark Layout with exact 48px bottom padding */}
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
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

          <div className="max-w-4xl mt-6 space-y-6">
            {/* Eyebrow Badge strictly on Hero */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/80 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#00B8F0] uppercase">
                GET IN TOUCH • DIRECT COLLABORATION
              </span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#F5F7FC] leading-[1.12]">
              Let&apos;s Discuss Your Project.{" "}
              <span className="block mt-1 sm:mt-2 text-[#00B8F0]">
                Direct Feedback Within 24 Hours.
              </span>
            </h1>

            {/* Supporting Paragraph (16px mobile, 15px desktop) */}
            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-2xl">
              Whether you are launching a new website, scaling customer acquisition with Meta &amp; Google ads, or automating client inquiries on WhatsApp, we are here to help. Speak directly with our team with zero sales friction.
            </p>

            {/* 3-Pillar Benchmark Strip */}
            <div className="pt-4 border-t border-[#29374D]/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-[13px] text-[#9BAAC2]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00B8F0] shrink-0" />
                <span>Direct Founder Discussion</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0D8C7D] shrink-0" />
                <span>100% Direct Asset Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00B8F0] shrink-0" />
                <span>Fixed Milestone Pricing</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Contact & Consultation Section with exact 48px padding */}
      <section className="bg-[#F8FAFC] py-[48px] border-b border-slate-200 text-[#0F172A]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Studio Channels & Assurance (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <div className="space-y-3">
                <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[38px] font-extrabold tracking-tight text-[#0F172A] leading-[1.18]">
                  Direct Studio Channels
                </h2>
                <p className="text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal">
                  Skip the middle managers and sales reps. You speak directly with the specialists building and optimizing your digital systems.
                </p>
              </div>

              {/* 3 Real-World Commitments */}
              <div className="space-y-4 pt-2 border-t border-slate-200/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Clock className="w-4 h-4 text-[#0284C7]" />
                    <span>24-Hour Diagnostic Response</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed pl-6">
                    Every message is personally reviewed and answered within 24 business hours.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#0D8C7D]" />
                    <span>Fixed Scope &amp; Clear Milestones</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed pl-6">
                    Transparent deliverables, agreed timelines, and zero surprise fees.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#0D8C7D]" />
                    <span>100% Asset Ownership</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed pl-6">
                    You own all source code, domains, and ad accounts outright from day one.
                  </p>
                </div>
              </div>

              {/* Direct Communication Channels Card */}
              <div className="space-y-3 pt-2">
                {/* Phone & WhatsApp Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <Phone className="w-4 h-4 text-[#0D8C7D]" />
                      <span>Phone &amp; WhatsApp</span>
                    </div>
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D8C7D] hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Live</span>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 font-medium font-mono">
                    {siteConfig.contact.phone}
                  </p>
                  <p className="text-xs text-slate-500">
                    Fastest way to reach us for new project discussions.
                  </p>
                </div>

                {/* Direct Email Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <Mail className="w-4 h-4 text-[#0284C7]" />
                      <span>Direct Email</span>
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
                    Send RFPs, project briefs, or existing site audits directly.
                  </p>
                </div>

                {/* Location & Remote Delivery Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-slate-700" />
                    <span>Location &amp; Delivery</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    Based in {siteConfig.location.city}, {siteConfig.location.state}
                  </p>
                  <p className="text-xs text-slate-500">
                    {siteConfig.contact.availabilityNote}
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

      {/* Assurance FAQ Section with exact 48px padding */}
      <section className="bg-white py-[48px] border-b border-slate-200 text-[#0F172A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Frequently Asked Questions Before Reaching Out
            </h2>
            <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Straightforward answers to the questions business owners ask us most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-base">
                How fast will I receive a response?
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                We review every inquiry personally and respond within 24 business hours with an initial scope review, technical recommendation, and price estimate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-base">
                Is the initial consultation free?
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Yes, 100% free. We discuss your business objectives and provide a clear quote and timeline outline before any financial commitment is requested.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-base">
                Can we collaborate if our business is located elsewhere?
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Yes. We work seamlessly with clients across India and globally using live cloud staging links, digital asset sign-offs, and instant WhatsApp communication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-base">
                Do you hold our code or ad accounts hostage?
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Never. You retain 100% direct ownership of your domain, hosting, code repositories, ad accounts, and creative assets from day one. Zero vendor lock-in.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
