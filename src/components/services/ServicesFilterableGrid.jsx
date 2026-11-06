"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Share2,
  Search,
  Bot,
  Palette,
  Video,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function ServicesFilterableGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Capabilities" },
    { id: "web", label: "Web Development" },
    { id: "ads", label: "Paid Advertising" },
    { id: "automation", label: "AI & Automation" },
    { id: "creative", label: "Branding & Video" },
  ];

  const services = [
    {
      id: "website-design",
      number: "01",
      category: "web",
      tag: "WEBSITE DESIGN",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      icon: Code2,
      title: "Website Design & Development",
      slug: "website-design",
      href: "/services/website-design",
      image: "/assets/website-design.webp",
      imageAlt: "Custom responsive website design and mobile web development",
      tagline:
        "High-performance, mobile-first websites engineered to load in under 1.5 seconds and turn visitors into direct phone calls and customer enquiries.",
      problemSolved:
        "Replaces bloated, slow-loading templates that lose mobile visitors and fail to rank on Google in local search markets.",
      deliverables: [
        "Sub-1.5s mobile speed on 4G/5G connections (90+ PageSpeed score)",
        "Direct WhatsApp and click-to-call conversion hooks",
        "Semantic on-page Local SEO markup and Schema architecture",
      ],
      idealFor: ["Showrooms & Retailers", "Clinics & Doctors", "Exporters & B2B", "Professional Services"],
    },
    {
      id: "meta-ads",
      number: "02",
      category: "ads",
      tag: "META ADS",
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Share2,
      title: "Meta Ads Management (FB & IG)",
      slug: "meta-ads",
      href: "/services/meta-ads",
      image: "/assets/meta-ads.webp",
      imageAlt: "Targeted Facebook and Instagram advertising campaigns and lead generation",
      tagline:
        "Laser-targeted advertising campaigns on Facebook and Instagram that put your offer in front of qualified buyers ready to purchase.",
      problemSolved:
        "Stops wasting marketing budget on vanity 'boost post' clicks that generate zero verified customer inquiries.",
      deliverables: [
        "Geo-fenced local buyer audience targeting tailored to your market",
        "High-converting visual ad creatives and direct-response copywriting",
        "Direct WhatsApp Messenger lead capture with transparent weekly ROI tracking",
      ],
      idealFor: ["Retail Showrooms", "Real Estate Promoters", "Hospitals & Diagnostics", "Educational Academies"],
    },
    {
      id: "google-ads",
      number: "03",
      category: "ads",
      tag: "GOOGLE ADS",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Search,
      title: "Google Ads & Local Search PPC",
      slug: "google-ads",
      href: "/services/google-ads",
      image: "/assets/google-ads.webp",
      imageAlt: "High-intent Google Search advertising and PPC campaign management",
      tagline:
        "Capture active buyers the exact second they search for your products or services on Google Search and Google Maps.",
      problemSolved:
        "Eliminates wasted ad spend on broad informational queries by filtering negative keywords and bidding on high-intent buying terms.",
      deliverables: [
        "Keyword hierarchy targeting high-intent local search queries",
        "Negative keyword exclusion filters preventing wasted ad spend",
        "Conversion and call tracking setup connected directly to your phone",
      ],
      idealFor: ["Healthcare Specialists", "Emergency Services", "Industrial Suppliers", "Commercial Services"],
    },
    {
      id: "ai-automation",
      number: "04",
      category: "automation",
      tag: "AI AUTOMATION",
      tagColor: "bg-teal-50 text-teal-700 border-teal-200",
      icon: Bot,
      title: "AI Automation & WhatsApp Bots",
      slug: "ai-automation",
      href: "/services/ai-automation",
      image: "/assets/ai-automation.webp",
      imageAlt: "Intelligent automated 24/7 WhatsApp customer service assistant",
      tagline:
        "Intelligent automated assistants that qualify leads, answer customer questions, and dispatch catalog previews on WhatsApp 24/7.",
      problemSolved:
        "Stops losing valuable evening and weekend customer inquiries when staff is unavailable to respond.",
      deliverables: [
        "24/7 automated WhatsApp inquiry bot trained on your products and pricing",
        "Instant Google Sheets & CRM lead logging with owner notification alerts",
        "Smart routing rules escalating ready buyers directly to human phone calls",
      ],
      idealFor: ["High-Volume Retail", "Hospital Appointments", "Wholesale Distributors", "Customer Support"],
    },
    {
      id: "graphic-design",
      number: "05",
      category: "creative",
      tag: "BRAND IDENTITY",
      tagColor: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Palette,
      title: "Brand Identity & Graphic Design",
      slug: "graphic-design",
      href: "/services/graphic-design",
      image: "/assets/graphic-design.webp",
      imageAlt: "Professional vector brand logo and commercial graphic design collateral",
      tagline:
        "Cohesive visual branding, vector logos, social media graphics, and print collateral that establish instant authority and customer trust.",
      problemSolved:
        "Fixes blurry, pixelated logos and inconsistent colors across social profiles, signage, and invoices that undermine customer confidence.",
      deliverables: [
        "Scalable master vector logo package (SVG, high-res PNG, PDF formats)",
        "Defined brand style guide with official color codes (HEX, CMYK) and typography",
        "Print-ready promotional banners, visiting cards, and social media template kit",
      ],
      idealFor: ["New Brand Launches", "Food & Dairy Brands", "Packaging Products", "Growing Enterprises"],
    },
    {
      id: "ai-video",
      number: "06",
      category: "creative",
      tag: "AI VIDEO",
      tagColor: "bg-rose-50 text-rose-700 border-rose-200",
      icon: Video,
      title: "AI Video Generation for Reels",
      slug: "ai-video",
      href: "/services/ai-video",
      image: "/assets/ai-video.webp",
      imageAlt: "High-retention vertical 9:16 video reels and AI short-form commercials",
      tagline:
        "High-impact 9:16 vertical video ads, localized product showcase reels, and bilingual explainer videos engineered for high retention.",
      problemSolved:
        "Solves the bottleneck of needing daily Instagram Reels and YouTube Shorts without paying for expensive camera crews and studio setups.",
      deliverables: [
        "1080x1920 vertical video reels optimized for Instagram, YouTube & Facebook",
        "Natural bilingual voiceover audio in clear Telugu and Indian English",
        "Kinetic on-screen animated captions and strong first-3-second retention hooks",
      ],
      idealFor: ["Coaching Academies", "Product Showcases", "Event Promotions", "Social Influencer Brands"],
    },
  ];

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.category === activeFilter);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pb-2">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#00B8F0] text-[#0B1220] shadow-sm shadow-[#00B8F0]/30 scale-[1.02]"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 6 Modern, Unique Commercial Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#00B8F0]/60 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.09)] hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Visual Showcase Banner with Micro-Zoom */}
              <figure className="relative aspect-[16/10] w-full overflow-hidden bg-[#F1F5F9] m-0">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out"
                  unoptimized
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating Monogram / Number Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider font-mono shadow-sm">
                    {service.number}
                  </span>
                </div>

                {/* Floating Category Pill */}
                <div className="absolute top-3.5 right-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border shadow-sm ${service.tagColor}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{service.tag}</span>
                  </span>
                </div>
              </figure>

              {/* Card Content with Standardized 16px Mobile / 32px Desktop Padding */}
              <div className="px-4 py-6 sm:p-8 flex flex-col flex-1 justify-between space-y-5">
                <div className="space-y-4">
                  {/* Card Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#0F172A] leading-snug group-hover:text-[#0284C7] transition-colors">
                    {service.title}
                  </h3>

                  {/* Value Proposition (16px mobile, 15px desktop) */}
                  <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                    {service.tagline}
                  </p>

                  {/* Problem Solved Callout */}
                  <div className="bg-rose-50/70 border border-rose-200/70 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>The Problem We Fix:</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-normal">
                      {service.problemSolved}
                    </p>
                  </div>

                  {/* Tangible Deliverables List */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                      Core Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-[13.5px] text-slate-700 leading-normal"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0D8C7D] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For Badges */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {service.idealFor.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button (Full-Width High-Impact CTA) */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={service.href}
                    className="w-full inline-flex items-center justify-between px-5 py-3 rounded-lg bg-sky-50 hover:bg-[#00B8F0] text-[#0284C7] hover:text-[#0B1220] font-semibold text-xs sm:text-sm transition-all duration-150 group/btn shadow-2xs"
                  >
                    <span>Explore Full Scope &amp; Deliverables</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
