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
  ArrowRight,
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
      number: "01",
      category: "web",
      tag: "WEBSITE DESIGN",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      icon: Code2,
      title: "Website Design & Development",
      slug: "website-design",
      href: "/services/website-design",
      image: "/assets/website-design.webp",
      imageAlt: "Custom responsive website design and SEO web development",
      tagline:
        "Custom, mobile-friendly websites designed to rank high on Google search and convert visitors into paying clients.",
      deliverables: [
        "Google SEO architecture for higher local & national rankings",
        "Mobile-first responsive design & conversion-focused layout",
        "Direct WhatsApp and click-to-call lead generation buttons",
      ],
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
        "Targeted advertising campaigns on Facebook and Instagram that put your offer in front of active buyers ready to purchase.",
      deliverables: [
        "Precision audience targeting for verified buyer demographics",
        "High-converting ad copywriting & scroll-stopping visuals",
        "Direct WhatsApp lead generation and transparent ROI tracking",
      ],
    },
    {
      id: "google-ads",
      number: "03",
      category: "ads",
      tag: "GOOGLE ADS",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Search,
      title: "Google Ads & Search PPC",
      slug: "google-ads",
      href: "/services/google-ads",
      image: "/assets/google-ads.webp",
      imageAlt: "High-intent Google Search advertising and PPC campaign management",
      tagline:
        "Capture active buyers the moment they search for your products or services on Google Search and Google Maps.",
      deliverables: [
        "High-intent buyer keyword research & competitive ad placement",
        "Negative keyword filtering to eliminate wasted advertising budget",
        "Direct phone call and customer inquiry conversion tracking",
      ],
    },
    {
      id: "ai-automation",
      number: "04",
      category: "automation",
      tag: "AI AUTOMATION",
      tagColor: "bg-teal-50 text-teal-700 border-teal-200",
      icon: Bot,
      title: "AI Automation & WhatsApp Chatbots",
      slug: "ai-automation",
      href: "/services/ai-automation",
      image: "/assets/ai-automation.webp",
      imageAlt: "24/7 automated WhatsApp business customer assistant",
      tagline:
        "Automate customer inquiries, lead qualification, and appointment booking with 24/7 intelligent automated workflows.",
      deliverables: [
        "24/7 automated customer responses and instant inquiry handling",
        "Instant lead notifications synced directly to your phone and CRM",
        "Automated appointment booking and instant catalog sharing",
      ],
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
      imageAlt: "Custom brand logos and commercial graphic design collateral",
      tagline:
        "Distinctive brand identity, memorable logos, and commercial marketing assets that build credibility and customer trust.",
      deliverables: [
        "Custom brand logo design & complete visual identity guidelines",
        "High-impact social media creatives & promotional advertising banners",
        "Print-ready business stationery, brochures & marketing collateral",
      ],
    },
    {
      id: "ai-video",
      number: "06",
      category: "creative",
      tag: "AI VIDEO",
      tagColor: "bg-rose-50 text-rose-700 border-rose-200",
      icon: Video,
      title: "AI Video Creation for Reels & Ads",
      slug: "ai-video",
      href: "/services/ai-video",
      image: "/assets/ai-video.webp",
      imageAlt: "High-retention vertical 9:16 video reels and commercial advertisements",
      tagline:
        "Engaging promotional videos and social media reels designed to build audience trust and drive customer conversions.",
      deliverables: [
        "High-engagement vertical 9:16 reels for Instagram & YouTube",
        "Persuasive promotional scriptwriting & dynamic visual hooks",
        "Professional voiceover narration tailored to your target audience",
      ],
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

      {/* Services Grid Using Home Page Card Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.id}
              aria-labelledby={`card-heading-${service.id}`}
              className="bg-white rounded-xl border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Visual Showcase Banner with subtle hover zoom */}
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
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </figure>

              {/* Card Body matching Home Page padding and layout */}
              <div className="px-4 py-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  {/* Tag & Icon Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase border ${service.tagColor}`}
                    >
                      {service.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#00B8F0]/10 group-hover:text-[#00B8F0] transition-colors">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Card Title matching Home Page Size */}
                  <h3
                    id={`card-heading-${service.id}`}
                    className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight group-hover:text-[#0284C7] transition-colors leading-[1.3]"
                  >
                    {service.title}
                  </h3>

                  {/* SEO-friendly Value Proposition (16px mobile, 15px desktop) */}
                  <p className="mt-2.5 text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                    {service.tagline}
                  </p>

                  {/* Modern Redesigned Key Highlights with clean feature capsules */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-slate-200/70 text-xs sm:text-[13px] text-slate-700 font-medium group-hover:bg-sky-50/40 group-hover:border-sky-200/80 transition-colors"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#0D8C7D] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <a
                    href="#proposal-form"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById("proposal-form");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                        window.dispatchEvent(
                          new CustomEvent("select-service", {
                            detail: { serviceId: service.id },
                          })
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0284C7] hover:text-[#00B8F0] transition-colors group/cta cursor-pointer"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
