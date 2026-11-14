import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Search,
  Smartphone,
  PhoneCall,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Website Design & Development | High-Converting Business Websites | Amogha Digital",
  description:
    "Fast, modern, high-converting custom business websites engineered to win customers, dominate local search, and drive qualified phone calls and WhatsApp enquiries.",
  alternates: {
    canonical: `${siteConfig.url}/services/website-design`,
  },
};

export default function WebsiteDesignPage() {
  const whatsappUrl = `https://wa.me/916304299387?text=${encodeURIComponent(
    "Hello! I am interested in building a high-converting website for my business with Amogha Digital."
  )}`;

  return (
    <div className="bg-[#070D18] text-[#F5F7FC] min-h-screen">
      {/* Full Hero Section with TemplateMonster / Dribbble-grade UI UX */}
      <section className="relative w-full border-b border-[#1E2E48] pt-[123px] pb-[48px] overflow-hidden">
        {/* Full-Width Atmospheric Radial Glow */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(20,35,61,0.85)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Ambient Top-Right Cyan Aura */}
        <div
          className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#00B8F0]/10 rounded-full blur-[140px] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Ambient Bottom-Left Teal Aura */}
        <div
          className="absolute bottom-10 left-5 w-[420px] h-[420px] bg-[#0D8C7D]/12 rounded-full blur-[130px] pointer-events-none z-0"
          aria-hidden="true"
        />

        <Container className="relative z-10 w-full">
          {/* Top Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#00B8F0] hover:text-[#38BDF8] transition-colors font-mono tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>SERVICES / WEBSITE DESIGN &amp; DEVELOPMENT</span>
            </Link>
          </div>

          {/* 2-Column High-Impact Hero Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Value Proposition, Action Buttons */}
            <div className="lg:col-span-6 space-y-6">
              {/* Bold Conversion Headline */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#F5F7FC] leading-[1.12] tracking-tight">
                Custom Websites Built for{" "}
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#00E5FF] via-[#00B8F0] to-[#38BDF8] bg-clip-text text-transparent font-extrabold">
                  High Lead Conversion.
                </span>
              </h1>

              {/* Supporting Copy Focused on Business Growth */}
              <p className="text-[16px] sm:text-[17px] text-[#9BAAC2] leading-[1.75] font-normal max-w-xl font-sans">
                We design and build fast, modern business websites that turn casual visitors into verified phone calls, WhatsApp enquiries, and loyal clients. 100% custom-crafted for your brand with zero monthly rental fees.
              </p>

              {/* Action Buttons with Standard min-h-[48px] */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto font-sans">
                <a
                  href="#contact-section"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-[15px] sm:text-[16px] px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(13,140,125,0.35)] hover:shadow-[0_6px_25px_rgba(13,140,125,0.5)] transition-all min-h-[48px] group"
                >
                  <span>Request a Free Blueprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#131F33]/90 hover:bg-[#1A2A45] active:bg-[#0F1929] text-[#F5F7FC] font-semibold text-[15px] sm:text-[16px] px-6 py-3.5 rounded-xl border border-[#2B3E5C] hover:border-[#00B8F0]/70 backdrop-blur-md shadow-xs hover:shadow-[0_0_20px_rgba(0,184,240,0.15)] transition-all min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#00E5FF]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-slate-300">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1424]/85 border border-[#1E2E48] backdrop-blur-md shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" aria-hidden="true" />
                  <span>100% Asset Ownership</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1424]/85 border border-[#1E2E48] backdrop-blur-md shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" aria-hidden="true" />
                  <span>Sub-Second Fast Loading</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1424]/85 border border-[#1E2E48] backdrop-blur-md shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D8C7D] shrink-0" aria-hidden="true" />
                  <span>Zero Recurring Rental Fees</span>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Device Showcase with Dribbble-style Floating Badges */}
            <div className="lg:col-span-6 relative mt-4 lg:mt-0">
              {/* Soft Ambient Cyan Backlight Reflection */}
              <div
                className="absolute -inset-4 bg-gradient-to-r from-[#00B8F0]/20 via-[#0D8C7D]/20 to-[#00E5FF]/20 rounded-3xl blur-2xl opacity-60 pointer-events-none"
                aria-hidden="true"
              />

              {/* Showcase Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1E2E48] bg-[#0B1526]/85 p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,184,240,0.2)] group transition-all duration-300 hover:border-[#00B8F0]/60">
                <Image
                  src="/assets/website-design-hero-devices-showcase.webp"
                  alt="Amogha Digital custom website design displayed across desktop monitor, tablet, and smartphone screens"
                  title="Amogha Digital - High-Converting Website Design Showcase"
                  width={1600}
                  height={1000}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-[1.015]"
                />

                {/* Floating Metric Badge 1 (Top-Left): Speed Metric */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#070D18]/94 border border-[#1E2E48] px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2.5 pointer-events-none">
                  <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#F5F7FC] flex items-center gap-1.5 font-sans leading-none">
                      <span>Sub-Second Load</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    </div>
                    <div className="text-[10px] text-[#9BAAC2] font-mono mt-1">99+ Google PageSpeed</div>
                  </div>
                </div>

                {/* Floating Metric Badge 2 (Bottom-Right): 100% Direct Ownership */}
                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 bg-[#070D18]/94 border border-[#1E2E48] px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2.5 pointer-events-none">
                  <div className="w-7 h-7 rounded-lg bg-[#0D8C7D]/25 border border-[#0D8C7D]/50 flex items-center justify-center text-[#10B981] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#F5F7FC] font-sans leading-none">100% Asset Ownership</div>
                    <div className="text-[10px] text-[#9BAAC2] font-mono mt-1">Direct Code &amp; Domain Handover</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero 4-Pillar Advantage Cards Strip (TemplateMonster Style) */}
          <div className="mt-12 sm:mt-14 pt-8 border-t border-[#1E2E48]/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Feature 1 */}
              <div className="bg-[#0B1526]/80 rounded-2xl border border-[#1E2E48] p-5 space-y-2.5 shadow-sm hover:border-[#00B8F0]/50 hover:shadow-[0_0_20px_rgba(0,184,240,0.1)] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-xl bg-[#00B8F0]/15 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] group-hover:bg-[#00B8F0] group-hover:text-white transition-colors">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-[#F5F7FC] text-[15px] group-hover:text-[#00B8F0] transition-colors">
                  Instant Mobile Speed
                </h3>
                <p className="text-[13px] text-[#9BAAC2] leading-relaxed font-normal">
                  Sub-second loading ensures zero impatient customers drop off before seeing your offers.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#0B1526]/80 rounded-2xl border border-[#1E2E48] p-5 space-y-2.5 shadow-sm hover:border-[#00B8F0]/50 hover:shadow-[0_0_20px_rgba(0,184,240,0.1)] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-xl bg-[#0D8C7D]/20 border border-[#0D8C7D]/40 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#0D8C7D] group-hover:text-white transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-[#F5F7FC] text-[15px] group-hover:text-[#00B8F0] transition-colors">
                  One-Tap Lead Capture
                </h3>
                <p className="text-[13px] text-[#9BAAC2] leading-relaxed font-normal">
                  Sticky WhatsApp and Call buttons placed strategically where high-intent buyers tap.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#0B1526]/80 rounded-2xl border border-[#1E2E48] p-5 space-y-2.5 shadow-sm hover:border-[#00B8F0]/50 hover:shadow-[0_0_20px_rgba(0,184,240,0.1)] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-xl bg-[#00B8F0]/15 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] group-hover:bg-[#00B8F0] group-hover:text-white transition-colors">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-[#F5F7FC] text-[15px] group-hover:text-[#00B8F0] transition-colors">
                  Google Search Ready
                </h3>
                <p className="text-[13px] text-[#9BAAC2] leading-relaxed font-normal">
                  Structured to help active searchers in your target area discover your business first.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#0B1526]/80 rounded-2xl border border-[#1E2E48] p-5 space-y-2.5 shadow-sm hover:border-[#00B8F0]/50 hover:shadow-[0_0_20px_rgba(0,184,240,0.1)] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-xl bg-[#0D8C7D]/20 border border-[#0D8C7D]/40 flex items-center justify-center text-[#10B981] group-hover:bg-[#0D8C7D] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-[#F5F7FC] text-[15px] group-hover:text-[#00B8F0] transition-colors">
                  100% Direct Ownership
                </h3>
                <p className="text-[13px] text-[#9BAAC2] leading-relaxed font-normal">
                  Zero monthly platform rental fees. You own your code, domains, and data completely.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
