"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code,
  Share2,
  Search,
  Bot,
  Palette,
  Video,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export function ServicesFilterableGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Services" },
    { id: "web", label: "Web Development" },
    { id: "ads", label: "Paid Advertising" },
    { id: "automation", label: "AI & Automation" },
    { id: "creative", label: "Branding & Video" },
  ];

  const services = [
    {
      id: "website-design",
      category: "web",
      categoryLabel: "Custom Web Engineering",
      turnaround: "10–14 Day Delivery",
      icon: Code,
      title: "Website Design & Custom Web Development",
      slug: "website-design",
      href: "/services/website-design",
      tagline:
        "High-performance, mobile-first websites engineered to load in under 1.5 seconds and turn visitors into phone calls and enquiries.",
      problemSolved:
        "Replaces bloated, slow-loading templates that lose mobile visitors and fail to rank on Google in Eluru and regional markets.",
      deliverables: [
        "Sub-1.5s mobile speed on 4G/5G connections (90+ Google PageSpeed score)",
        "Direct WhatsApp and click-to-call conversion funnels",
        "Semantic on-page local SEO markup & Schema architecture",
      ],
      idealFor: ["Local Retailers", "Clinics & Doctors", "Exporters & B2B", "Professional Firms"],
      badge: "Flagship Service",
    },
    {
      id: "meta-ads",
      category: "ads",
      categoryLabel: "Social Performance Marketing",
      turnaround: "3–5 Day Setup",
      icon: Share2,
      title: "Meta (Facebook & Instagram) Ads Management",
      slug: "meta-ads",
      href: "/services/meta-ads",
      tagline:
        "Laser-targeted advertising campaigns on Facebook and Instagram that put your offer in front of qualified local buyers ready to purchase.",
      problemSolved:
        "Stops wasting marketing budget on vanity 'boost post' clicks that generate zero verified customer inquiries.",
      deliverables: [
        "Geo-fenced local audience targeting (Eluru + surrounding Andhra Pradesh radius)",
        "High-converting visual ad creatives & compelling direct-response copy",
        "Direct WhatsApp Messenger lead capture with weekly transparent ROI reporting",
      ],
      idealFor: ["Showrooms & Boutiques", "Real Estate Promoters", "Hospitals & Labs", "Education Institutes"],
      badge: "High ROI",
    },
    {
      id: "google-ads",
      category: "ads",
      categoryLabel: "High-Intent Search Advertising",
      turnaround: "3–5 Day Setup",
      icon: Search,
      title: "Google Search Ads & Local PPC Management",
      slug: "google-ads",
      href: "/services/google-ads",
      tagline:
        "Capture active buyers the exact second they search for your products or services on Google Search and Google Maps.",
      problemSolved:
        "Eliminates wasted ad spend on broad informational queries by filtering negative keywords and targeting high-intent buying phrases.",
      deliverables: [
        "Keyword architecture targeting high-intent local search queries",
        "Negative keyword filters preventing wasted budget on irrelevant clicks",
        "Call tracking and conversion tracking setup directly to your phone",
      ],
      idealFor: ["Healthcare Specialists", "Emergency Services", "Industrial Suppliers", "Commercial Services"],
      badge: "Instant Demand",
    },
    {
      id: "ai-automation",
      category: "automation",
      categoryLabel: "Business Process Automation",
      turnaround: "5–7 Day Deployment",
      icon: Bot,
      title: "AI Automation & 24/7 WhatsApp Chatbots",
      slug: "ai-automation",
      href: "/services/ai-automation",
      tagline:
        "Intelligent automated assistants that qualify leads, answer customer questions, and dispatch catalog previews on WhatsApp 24/7.",
      problemSolved:
        "Stops losing valuable evening and weekend leads when staff is unavailable to answer repeated 'price please' inquiries.",
      deliverables: [
        "24/7 automated WhatsApp inquiry bot trained on your products and pricing",
        "Instant Google Sheets & CRM lead logging with owner notification alerts",
        "Smart routing rules escalating ready buyers directly to human phone calls",
      ],
      idealFor: ["High-Volume Retail", "Hospital Appointments", "Wholesale Distributors", "Customer Service Teams"],
      badge: "Operational Efficiency",
    },
    {
      id: "graphic-design",
      category: "creative",
      categoryLabel: "Brand Identity Systems",
      turnaround: "7–10 Day Delivery",
      icon: Palette,
      title: "Brand Identity Systems & Graphic Design",
      slug: "graphic-design",
      href: "/services/graphic-design",
      tagline:
        "Cohesive visual branding, vector logos, social media graphics, and print collateral that establish instant authority and trust.",
      problemSolved:
        "Fixes amateur, pixelated logos and inconsistent colors across social profiles, signage, and invoices that undermine customer confidence.",
      deliverables: [
        "Scalable master vector logo package (SVG, high-res PNG, PDF formats)",
        "Defined brand style guide with official color codes (HEX, CMYK) and typography",
        "Print-ready promotional banners, visiting cards, and social media template kit",
      ],
      idealFor: ["New Brand Launches", "Food & Dairy Brands", "Packaging Products", "Growing Enterprises"],
      badge: "Visual Authority",
    },
    {
      id: "ai-video",
      category: "creative",
      categoryLabel: "Short-Form Video Production",
      turnaround: "5–7 Day Delivery",
      icon: Video,
      title: "AI Video Generation for Social Media Reels",
      slug: "ai-video",
      href: "/services/ai-video",
      tagline:
        "High-impact 9:16 vertical video ads, localized product showcase reels, and bilingual explainer videos engineered for high retention.",
      problemSolved:
        "Solves the bottleneck of needing daily Instagram Reels and YouTube Shorts without paying for expensive camera crews and studio setups.",
      deliverables: [
        "1080x1920 vertical video reels optimized for Instagram, YouTube & Facebook",
        "Natural bilingual voiceover audio in clear Andhra Telugu and English",
        "Kinetic on-screen animated captions and strong first-3-second retention hooks",
      ],
      idealFor: ["Coaching Academies", "Product Showcases", "Event Promotions", "Social Influencer Brands"],
      badge: "High Engagement",
    },
  ];

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.category === activeFilter);

  return (
    <div className="space-y-8">
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

      {/* 6 High-Conversion Commercial Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.id}
              className="group bg-white rounded-2xl border border-sky-200/80 hover:border-[#00B8F0]/60 px-4 py-6 sm:p-8 shadow-[0_4px_20px_rgba(2,132,199,0.04)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.09)] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Card Top Strip: Category & Delivery Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7]">
                    {service.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                    <Clock className="w-3 h-3 text-[#0D8C7D]" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                {/* Service Title with Icon */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-[#0284C7] group-hover:bg-[#00B8F0]/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug group-hover:text-[#0284C7] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Tagline / Value Proposition (16px mobile, 15px desktop) */}
                <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                  {service.tagline}
                </p>

                {/* The Problem It Solves */}
                <div className="bg-rose-50/60 border border-rose-200/60 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-800 text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Problem Solved</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-normal">
                    {service.problemSolved}
                  </p>
                </div>

                {/* Concrete Deliverables Strip */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                    What You Receive:
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
                        className="text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <Link
                  href={service.href}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0284C7] font-semibold text-xs sm:text-sm transition-colors group/link"
                >
                  <span>Explore Complete Scope &amp; Deliverables</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/contact?service=${service.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base py-3 rounded-lg shadow-sm hover:shadow transition-all min-h-[48px]"
                >
                  <span>Start This Project</span>
                  <Sparkles className="w-4 h-4 text-white/90" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
