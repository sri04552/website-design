"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function ServicesHeroDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const services = [
    {
      label: "Website Design & Development",
      href: "/services/website-design",
    },
    {
      label: "Meta Ads Management",
      href: "/services/meta-ads",
    },
    {
      label: "Google Ads & Search PPC",
      href: "/services/google-ads",
    },
    {
      label: "AI Automations & Chatbots",
      href: "/services/ai-automation",
    },
    {
      label: "Graphic Designing",
      href: "/services/graphic-design",
    },
    {
      label: "AI Video Generation",
      href: "/services/ai-video",
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
        <span>Services</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9BAAC2] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#00B8F0]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[calc(100vw-2.5rem)] sm:w-80 rounded-2xl bg-[#0B1526]/98 border border-[#1E2E48] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="space-y-0.5">
            {services.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-[15.5px] sm:text-[16px] font-medium text-[#F5F7FC] hover:text-[#00B8F0] hover:bg-[#131F33] transition-colors"
              >
                {svc.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
