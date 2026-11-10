"use client";

import Image from "next/image";
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
  const services = [
    {
      id: "website-design",
      icon: Code2,
      badgeLabel: "</>",
      title: "Website Design & Development",
      slug: "website-design",
      href: "/services#proposal-form",
      image: "/assets/website-design-development-workspace-amogha-digital.webp",
      imageAlt:
        "Custom responsive website design and SEO web development architecture by Amogha Digital",
      description:
        "Custom, mobile-friendly websites designed to turn visitors into loyal customers.",
    },
    {
      id: "meta-ads",
      icon: Share2,
      badgeLabel: "Meta",
      title: "Meta Ads Management",
      slug: "meta-ads",
      href: "/services#proposal-form",
      image: "/assets/meta-ads-management-workspace-amogha-digital.webp",
      imageAlt:
        "Targeted Meta Facebook and Instagram advertising campaigns for lead generation by Amogha Digital",
      description:
        "Targeted advertising campaigns on Facebook and Instagram to get more leads.",
    },
    {
      id: "google-ads",
      icon: Search,
      badgeLabel: "PPC",
      title: "Google Ads & Search PPC",
      slug: "google-ads",
      href: "/services#proposal-form",
      image: "/assets/google-ads-ppc-growth-workspace-amogha-digital.webp",
      imageAlt:
        "Google Ads PPC and high-intent search campaign management by Amogha Digital",
      description:
        "Capture active buyers at the moment they search for your products or services.",
    },
    {
      id: "ai-automation",
      icon: Bot,
      badgeLabel: "AI",
      title: "AI Automations & Chatbots",
      slug: "ai-automation",
      href: "/services#proposal-form",
      image:
        "/assets/smart-business-ai-automation-workspace-amogha-digital.webp",
      imageAlt:
        "24/7 intelligent AI workflow automations and WhatsApp business chatbots by Amogha Digital",
      description:
        "Automate repetitive tasks and enhance customer interactions with AI.",
    },
    {
      id: "graphic-design",
      icon: Palette,
      badgeLabel: "UI",
      title: "Graphic Designing",
      slug: "graphic-design",
      href: "/services#proposal-form",
      image:
        "/assets/modern-graphic-design-studio-workspace-amogha-digital.webp",
      imageAlt:
        "High-impact graphic design, commercial brand identity, and visual marketing assets by Amogha Digital",
      description:
        "Stunning visuals that communicate your brand with impact.",
    },
    {
      id: "ai-video",
      icon: Video,
      badgeLabel: "Reels",
      title: "AI Video Generation",
      slug: "ai-video",
      href: "/services#proposal-form",
      image:
        "/assets/ai-video-editing-generation-workspace-amogha-digital.webp",
      imageAlt:
        "AI video generation and commercial marketing video reels creation by Amogha Digital",
      description:
        "Create professional videos with the power of AI, faster than ever.",
    },
  ];

  const handleSelectService = (e, serviceId) => {
    e.preventDefault();
    const target = document.getElementById("proposal-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("select-service", {
          detail: { serviceId },
        })
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <article
            key={service.id}
            aria-labelledby={`card-heading-${service.id}`}
            onClick={(e) => handleSelectService(e, service.id)}
            className="group relative bg-white rounded-2xl border border-[#E2E8F0]/90 p-4 sm:p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-[#00B8F0]/50 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-4.5 cursor-pointer"
          >
            {/* Visual Thumbnail Showcase */}
            <div className="relative w-full sm:w-[130px] md:w-[125px] lg:w-[140px] aspect-[4/3] sm:aspect-square shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-100/90 shadow-2xs">
              <Image
                src={service.image}
                alt={service.imageAlt}
                title={`Amogha Digital - ${service.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 140px, 150px"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch space-y-2.5">
              <div>
                {/* Header Row: Title & Top-Right Icon Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3
                    id={`card-heading-${service.id}`}
                    className="font-heading text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug group-hover:text-[#00B8F0] transition-colors"
                  >
                    {service.title}
                  </h3>

                  {/* Top-Right Circular Badge */}
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EBF7FD] text-[#00B8F0] border border-[#D5EBF9] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#00B8F0] group-hover:text-white transition-all duration-300"
                    aria-hidden="true"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Description Copy */}
                <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-[#64748B] leading-relaxed font-normal font-sans">
                  {service.description}
                </p>
              </div>

              {/* Action Link: Learn More -> */}
              <div className="pt-1">
                <a
                  href="#proposal-form"
                  onClick={(e) => handleSelectService(e, service.id)}
                  aria-label={`Learn more about ${service.title} and request a quote`}
                  className="inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-semibold text-[#00B8F0] group-hover:text-[#0090C0] transition-colors font-sans"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
