import fs from "fs";
import path from "path";
import Image from "next/image";
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
  ArrowDown,
  CheckCircle2,
  Radio,
} from "lucide-react";

export const metadata = {
  title: "Contact Amogha Digital | Web Development, Performance Ads & AI Automation Company",
  description:
    "Get in touch with Amogha Digital company for high-performance custom website development, Meta & Google Ads management, and 24/7 AI WhatsApp automation. Fast direct replies within minutes.",
  keywords: [
    "Contact Amogha Digital",
    "Web Development Company India",
    "Hire Next.js Developers India",
    "Meta Ads Agency India",
    "Google Ads Management Company",
    "WhatsApp AI Automation Company",
    "Digital Marketing Company India",
    "Performance Marketing Agency",
    "Direct Web Engineering Firm",
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Amogha Digital Company",
    description:
      "Connect directly with Amogha Digital company for enterprise-grade custom web development, high-ROI paid advertising, and 24/7 WhatsApp AI automation. Direct engineer access with replies within minutes.",
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
          contactType: "Customer Support and Project Consultation",
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

  // Check if user has placed contact-hero.webp in public/assets/
  const contactHeroPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "contact-hero.webp"
  );
  const hasContactHeroImage = fs.existsSync(contactHeroPath);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section: Distinctive 2-Column Split Company Communications Showcase */}
      <section className="relative bg-[#0A101C] border-b border-[#1E2C44] pt-[123px] pb-[48px] overflow-hidden">
        {/* Dual-Zone Communications Lighting: Warm Emerald Direct Beacon + Cool Cyan Asset Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_20%_40%,rgba(13,140,125,0.18)_0%,transparent_50%),radial-gradient(circle_at_80%_45%,rgba(0,184,240,0.18)_0%,transparent_55%),radial-gradient(ellipse_90%_40%_at_50%_0%,rgba(20,38,68,0.7)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Linear Telemetry Radar Pulse Scanlines & Waveform Lattice */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black_70%,transparent_100%)] opacity-60"
          aria-hidden="true"
        />

        {/* Signal Broadcast Subtle Pulse Accent */}
        <div
          className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full border border-[#00B8F0]/10 pointer-events-none animate-pulse opacity-40 [mask-image:radial-gradient(circle,black_50%,transparent_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Company Introduction & Direct Actions (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Live Availability Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-emerald-400 uppercase font-mono">
                  TEAM ONLINE • REPLIES WITHIN MINUTES
                </span>
              </div>

              {/* Asymmetric, Bold Headline */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#F5F7FC] leading-[1.14]">
                Direct Company Access.{" "}
                <span className="block mt-1 sm:mt-2 text-[#00B8F0]">
                  No Sales Pitch, Just Real Results.
                </span>
              </h1>

              {/* Supporting Copy (16px mobile, 15px desktop) */}
              <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-xl">
                Ready to build a high-converting website, scale profitable customer acquisition with Meta &amp; Google ads, or automate client communications on WhatsApp? Partner directly with our core engineering and marketing team—no account managers or middlemen.
              </p>

              {/* Instant Quick-Connect Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all min-h-[48px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Live Chat</span>
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
                  <span>Free Architecture &amp; Scope Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B8F0]" />
                  <span>100% Code &amp; Ad Account Ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D8C7D]" />
                  <span>Direct Core Team Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase Centerpiece (5 cols on lg) */}
            <div className="lg:col-span-5">
              {hasContactHeroImage ? (
                /* Dynamic Custom Image (Loaded from public/assets/contact-hero.webp) */
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[#29374D] shadow-[0_20px_50px_rgba(0,184,240,0.14)] group">
                  <Image
                    src="/assets/contact-hero.webp"
                    alt="Amogha Digital company operations, custom web development, and digital marketing command desk"
                    title="Amogha Digital - Digital Growth & Engineering Company"
                    width={1586}
                    height={992}
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Real-time Status Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-[#0A101C]/90 backdrop-blur-md border border-white/10 text-xs text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-medium">Direct Company Line Active</span>
                    </div>
                    <span className="text-[#00B8F0] font-mono text-[11px]">
                      Avg Reply: &lt; 5 mins
                    </span>
                  </div>
                </div>
              ) : (
                /* Polished Architectural Glass Telemetry Terminal (Active while user generates image) */
                <div className="relative rounded-2xl border border-[#29374D] bg-gradient-to-br from-[#111C30] via-[#0F1A2D] to-[#0B1220] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,184,240,0.08)] overflow-hidden space-y-5">
                  {/* Subtle Ambient Lighting */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#00B8F0]/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Node Header */}
                  <div className="flex items-center justify-between border-b border-[#29374D]/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#14233D] border border-[#29374D] flex items-center justify-center text-[#00B8F0]">
                        <Radio className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">
                          Company Operations Node
                        </div>
                        <div className="text-[11px] text-emerald-400 font-mono">
                          Live • Open for Client Projects
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#14233D] border border-white/10 text-[11px] font-mono text-[#9BAAC2]">
                      2026
                    </span>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#14233D]/60 border border-[#29374D]/80 space-y-1">
                      <div className="text-[11px] text-[#8E9EB5]">Response Time</div>
                      <div className="text-sm font-bold text-[#00B8F0] font-mono">
                        &lt; 5 Minutes
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#14233D]/60 border border-[#29374D]/80 space-y-1">
                      <div className="text-[11px] text-[#8E9EB5]">Asset Ownership</div>
                      <div className="text-sm font-bold text-[#0D8C7D] font-mono">
                        100% Direct
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#14233D]/60 border border-[#29374D]/80 space-y-1">
                      <div className="text-[11px] text-[#8E9EB5]">Technical Middlemen</div>
                      <div className="text-sm font-bold text-white font-mono">
                        Zero
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#14233D]/60 border border-[#29374D]/80 space-y-1">
                      <div className="text-[11px] text-[#8E9EB5]">Initial Estimate</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        100% Free
                      </div>
                    </div>
                  </div>

                  {/* Direct Line Bar */}
                  <div className="p-4 rounded-xl bg-[#0B1220] border border-[#29374D] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="text-slate-400 text-[11px]">Primary WhatsApp:</div>
                      <div className="text-white font-bold font-mono">
                        {siteConfig.contact.phone}
                      </div>
                    </div>
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#0D8C7D] hover:bg-[#0B7568] text-white text-xs font-semibold transition-colors"
                      >
                        Message Now
                      </a>
                    )}
                  </div>
                </div>
              )}
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
            {/* Left Column: Company Channels & Assurance (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <div className="space-y-3">
                <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[38px] font-extrabold tracking-tight text-[#0F172A] leading-[1.18]">
                  Direct Company Channels
                </h2>
                <p className="text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal">
                  Work directly with the digital specialists building, managing, and scaling your systems. No sales reps, no agency markups.
                </p>
              </div>

              {/* 3 Real-World Commitments */}
              <div className="space-y-4 pt-2 border-t border-slate-200/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Clock className="w-4 h-4 text-[#0284C7]" />
                    <span>Replies Within Minutes</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed pl-6">
                    Every message is personally reviewed and answered within minutes.
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
                    <span>Company Location &amp; Delivery</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    Based in {siteConfig.location.city}, {siteConfig.location.state}
                  </p>
                  <p className="text-xs text-slate-500">
                    Serving businesses across India &amp; global markets with 100% remote delivery.
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
                We review every inquiry immediately and reply within minutes with an initial scope review, technical recommendation, and price estimate. No waiting around.
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
