import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Star,
  TrendingUp,
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
    <div className="bg-[#FAFBFD] text-[#0F172A] min-h-screen">
      {/* Light Theme Bento Hero Section (Inspired by ClickBoost / Dribbble Reference) */}
      <section className="relative w-full border-b border-slate-200/80 pt-[115px] sm:pt-[123px] pb-[48px] overflow-hidden bg-[#FAFBFD]">
        {/* Soft Ambient Radial Wash for Subtle Depth */}
        <div
          className="absolute top-0 inset-x-0 h-[600px] pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(224,242,254,0.65)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10 w-full">
          {/* Top Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors font-mono tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>SERVICES / WEBSITE DESIGN &amp; DEVELOPMENT</span>
            </Link>
          </div>

          {/* 2-Column Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Editorial Content, Value Proposition & Action CTAs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Bold Conversion Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight">
                Turn Clicks into{" "}
                <span className="block mt-1 sm:mt-1.5 text-[#0284C7]">
                  Conversions.
                </span>
              </h1>

              {/* Supporting Copy Focused on Business Growth */}
              <p className="text-[16px] sm:text-[17px] text-[#475569] leading-[1.7] font-normal max-w-xl font-sans">
                We design and build fast, modern business websites engineered to win trust, rank on Google, and turn casual visitors into verified phone calls, WhatsApp bookings, and paying clients.
              </p>

              {/* Dual Action CTAs matching Reference Design */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto font-sans">
                {/* Primary Action Button */}
                <a
                  href="#proposal-form"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] active:bg-[#D84315] text-white font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-full shadow-[0_4px_18px_rgba(255,87,34,0.35)] hover:shadow-[0_6px_22px_rgba(255,87,34,0.45)] transition-all min-h-[48px]"
                >
                  <span>Start Now</span>
                </a>

                {/* Secondary Pill Button with Circular Arrow */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0F172A] hover:bg-[#1E293B] active:bg-[#020617] text-white font-semibold text-[15px] px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all min-h-[48px]"
                >
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Bottom Client Guarantees Strip */}
              <div className="pt-6 sm:pt-8 border-t border-slate-200/90">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block mb-3">
                  Verified Client Guarantees
                </span>
                <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-[13px] font-semibold text-slate-700 font-sans">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D8C7D]" />
                    <span>100% Asset Ownership</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#0284C7]" />
                    <span>Sub-Second Load Speed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0D8C7D]" />
                    <span>Zero Monthly Hostage Fees</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4-Piece Asymmetric Bento Collage (Exact Reference Layout) */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-3.5 sm:gap-4.5 items-stretch">
                {/* Left Sub-Column (5 Cols on desktop): Card 1 (Stat) + Card 3 (Growth Graph) */}
                <div className="col-span-12 sm:col-span-5 flex flex-col gap-3.5 sm:gap-4.5">
                  {/* Card 1: Vibrant Coral/Orange Highlight Card */}
                  <div className="relative bg-[#FF5722] rounded-3xl p-5 text-white shadow-[0_12px_30px_rgba(255,87,34,0.25)] flex flex-col justify-between overflow-visible">
                    <div>
                      {/* Avatar Stack */}
                      <div className="flex items-center -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                          AK
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-800">
                          RS
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-sky-200 flex items-center justify-center text-[10px] font-bold text-sky-800">
                          MD
                        </div>
                      </div>

                      {/* Stat Number */}
                      <div className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                        120+
                      </div>
                      <p className="mt-1 text-xs text-white/90 font-medium leading-snug">
                        Businesses scaled with custom websites
                      </p>
                    </div>

                    {/* Circular Accent Badge Overlapping Card Junction */}
                    <div className="hidden sm:flex absolute -right-4 -bottom-4 w-11 h-11 rounded-full bg-[#0F172A] border-2 border-white shadow-lg items-center justify-center text-white z-20">
                      <Star className="w-5 h-5 text-[#FFB703] fill-[#FFB703]" />
                    </div>
                  </div>

                  {/* Card 3: Growth Metric Card */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                        Lead Growth
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0D8C7D] bg-emerald-50 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        +240%
                      </span>
                    </div>

                    {/* Stylized Upward Growth Chart Line */}
                    <div className="my-3 h-14 w-full flex items-end">
                      <svg
                        className="w-full h-12 overflow-visible"
                        viewBox="0 0 100 40"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 35 Q 25 32, 45 22 T 80 12 T 100 4"
                          stroke="#FF5722"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M0 35 Q 25 32, 45 22 T 80 12 T 100 4 L 100 40 L 0 40 Z"
                          fill="url(#coral-gradient)"
                          opacity="0.15"
                        />
                        <defs>
                          <linearGradient id="coral-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF5722" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <p className="text-[12px] text-slate-500 font-medium">
                      Steady organic customer acquisition
                    </p>
                  </div>
                </div>

                {/* Right Sub-Column (7 Cols on desktop): Card 2 (Tall Portrait Photo + Stacked Floating Stat Badges) */}
                <div className="col-span-12 sm:col-span-7 relative">
                  <div className="relative h-full min-h-[290px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)] bg-slate-100 group">
                    <Image
                      src="/assets/website-design-consultant-portrait.webp"
                      alt="Amogha Digital website design specialist reviewing a live digital client project"
                      title="Amogha Digital - Website Design Consultation Specialist"
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      priority
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    />

                    {/* Stack of 3 Dark Floating Stat Badges on Right Edge (Exact Reference Design) */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                      {/* Badge 1 */}
                      <div className="bg-[#0F172A]/92 backdrop-blur-md text-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-white/10 text-right min-w-[125px]">
                        <span className="text-[11px] text-slate-400 block font-medium">Satisfied Rate</span>
                        <span className="text-base font-extrabold text-[#00E5FF] font-heading">98%</span>
                      </div>

                      {/* Badge 2 */}
                      <div className="bg-[#0F172A]/92 backdrop-blur-md text-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-white/10 text-right min-w-[125px]">
                        <span className="text-[11px] text-slate-400 block font-medium">Ownership</span>
                        <span className="text-base font-extrabold text-[#FFB703] font-heading">100%</span>
                      </div>

                      {/* Badge 3 */}
                      <div className="bg-[#0F172A]/92 backdrop-blur-md text-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-white/10 text-right min-w-[125px]">
                        <span className="text-[11px] text-slate-400 block font-medium">Load Delay</span>
                        <span className="text-base font-extrabold text-[#10B981] font-heading">0.6s</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Spanning Full Width (12 Cols): Card 4 (Collaborative Tech Meeting Photo) */}
                <div className="col-span-12">
                  <div className="relative aspect-[16/6] sm:aspect-[16/5] rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.05)] bg-slate-100 group">
                    <Image
                      src="/assets/amogha-digital-collaborative-tech-meeting-project-consultation.webp"
                      alt="Amogha Digital project consultation and website architecture meeting"
                      title="Amogha Digital - Collaborative Website Architecture & Planning Session"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Gradient Overlay for Crisp Framing */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Discreet Corner Tag */}
                    <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-xs border border-white/50">
                      Collaborative Project Planning
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
