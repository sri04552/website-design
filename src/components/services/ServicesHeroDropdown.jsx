"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Code2,
  Share2,
  Search,
  Bot,
  Palette,
  Video,
} from "lucide-react";

export function ServicesHeroDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const services = [
    {
      label: "Website Design & Development",
      href: "/services/website-design",
      icon: Code2,
      desc: "Custom, mobile-friendly websites",
    },
    {
      label: "Meta Ads Management",
      href: "/services/meta-ads",
      icon: Share2,
      desc: "Facebook & Instagram targeted funnels",
    },
    {
      label: "Google Ads & Search PPC",
      href: "/services/google-ads",
      icon: Search,
      desc: "High-intent search customer capture",
    },
    {
      label: "AI Automations & Chatbots",
      href: "/services/ai-automation",
      icon: Bot,
      desc: "24/7 WhatsApp & CRM automation",
    },
    {
      label: "Graphic Designing",
      href: "/services/graphic-design",
      icon: Palette,
      desc: "Brand identity & visual marketing",
    },
    {
      label: "AI Video Generation",
      href: "/services/ai-video",
      icon: Video,
      desc: "Commercial video ads & reels",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2.5 bg-[#131F33]/90 hover:bg-[#1A2A45] active:bg-[#0F1929] text-[#F5F7FC] font-semibold text-[15px] sm:text-[16px] px-6 py-3.5 rounded-xl border border-[#2B3E5C] hover:border-[#00B8F0]/70 backdrop-blur-md shadow-xs hover:shadow-[0_0_20px_rgba(0,184,240,0.15)] transition-all min-h-[48px] cursor-pointer"
      >
        <span>Explore 6 Services</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9BAAC2] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#00B8F0]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[calc(100vw-2.5rem)] sm:w-96 rounded-2xl bg-[#0B1526]/98 border border-[#1E2E48] p-2.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-[#1E2E48]/80 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8F0] font-mono">
              6 Core Digital Services
            </span>
            <span className="text-[10px] text-[#9BAAC2] font-mono">Direct Links</span>
          </div>
          <div className="space-y-1">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#131F33] transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#14233D] border border-[#2B3E5C] flex items-center justify-center text-[#00B8F0] shrink-0 group-hover:border-[#00B8F0]/50 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#F5F7FC] group-hover:text-[#00B8F0] transition-colors">
                      {svc.label}
                    </div>
                    <div className="text-xs text-[#9BAAC2] truncate">
                      {svc.desc}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-2 pt-2 border-t border-[#1E2E48]/80 px-2 flex items-center justify-between text-xs text-[#9BAAC2]">
            <span>Need full overview?</span>
            <a
              href="#service-grid"
              onClick={() => setIsOpen(false)}
              className="text-[#00B8F0] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Scroll to Grid</span>
              <span>&darr;</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
