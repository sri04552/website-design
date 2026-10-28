import Link from "next/link";
import { ParticleBackground } from "@/components/canvas/ParticleBackground";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { BottleneckSection } from "@/components/home/BottleneckSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FaqSection } from "@/components/home/FaqSection";

export const metadata = {
  title: "AMOGHA Digital | Web Development, Performance Marketing & AI Automation",
  description:
    "We engineer high-performance custom websites, ROI-driven marketing campaigns, and intelligent AI automation systems designed to capture qualified leads, streamline operations, and scale modern businesses in Eluru and pan-India.",
  keywords: [
    "Web Development Eluru",
    "Website Design Andhra Pradesh",
    "Meta Ads Management",
    "Google Ads Freelancer",
    "AI Automation Chatbots",
    "Digital Marketing Eluru",
    "High Performance Business Websites",
  ],
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "High-performance website development, targeted paid advertising, and AI workflow automation.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.state,
        addressCountry: siteConfig.location.country,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section sized to exact 100dvh for responsive fullscreen fit across all mobile and desktop devices */}
      <section
        className="relative h-[100dvh] min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0B1220] px-4 sm:px-6 lg:px-8"
        aria-label="Hero Section"
      >
        {/* Deep atmospheric radial glow centered behind content */}
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(20,35,61,0.85)_0%,rgba(11,18,32,0)_100%)]"
          aria-hidden="true"
        />

        {/* Subtle animated sparse particle network */}
        <ParticleBackground />

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pt-8 sm:pt-12">
          {/* Eyebrow Label with Magic Star Icon & Theme Blue Text */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/80 backdrop-blur-xs mb-6 sm:mb-8 transition-colors hover:border-[#00B8F0]/40 shadow-xs">
            {/* Magic Star Icon */}
            <Sparkles
              className="w-3.5 h-3.5 text-[#00B8F0] shrink-0"
              aria-hidden="true"
            />
            {/* Theme Blue Text */}
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#00B8F0] uppercase">
              Digital Presence to Business Systems
            </span>
          </div>

          {/* Cinematic Headline */}
          <h1 className="font-heading text-4xl sm:text-5.5xl lg:text-[64px] font-extrabold tracking-tight text-[#F5F7FC] leading-[1.12] sm:leading-[1.1] max-w-4xl">
            <span className="block">Grow Your Business.</span>
            <span className="block mt-1 sm:mt-2">
              <span className="text-[#00B8F0]">Automate</span> What Comes Next.
            </span>
          </h1>

          {/* SEO-Optimized Supporting Paragraph with increased 2px font size */}
          <p className="mt-5 sm:mt-7 text-[16px] sm:text-[17px] text-[#9BAAC2] max-w-[720px] leading-[1.75] font-normal">
            We engineer high-performance custom websites, ROI-driven marketing
            campaigns, and intelligent AI automation systems designed to
            capture qualified leads, streamline operations, and scale modern
            businesses in Eluru and pan-India.
          </p>

          {/* Horizontally Aligned CTA Buttons with standard min-h-[48px] */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary CTA - Darkened Teal */}
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 min-h-[48px] focus-visible:outline-[#00B8F0]"
            >
              <span>Start a Project</span>
              <Sparkles className="w-4 h-4 text-white/90" />
            </Link>

            {/* Secondary CTA - High-contrast visible button */}
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 active:bg-slate-800 text-white border border-slate-600 hover:border-slate-400 font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-lg transition-all duration-150 shadow-xs hover:shadow min-h-[48px] focus-visible:outline-[#00B8F0]"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Core Capabilities & Services */}
      <CapabilitiesSection />

      {/* Section 3: The Problem & Solution Bottleneck Grid */}
      <BottleneckSection />

      {/* Section 4: Transparent 4-Step Working Process */}
      <ProcessSection />

      {/* Section 5: Frequently Asked Questions (FAQ) */}
      <FaqSection />
    </>
  );
}
