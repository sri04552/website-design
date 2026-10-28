"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  ArrowRight,
  Home,
  Layers,
  BookOpen,
  User,
  PhoneCall,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener: transparent at top of homepage, sticky white header upon scroll
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 20);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "/", icon: Home },
    { label: "SERVICES", href: "/services", icon: Layers },
    { label: "BLOGS", href: "/blogs", icon: BookOpen },
    { label: "ABOUT", href: "/about", icon: User },
    { label: "CONTACT", href: "/contact", icon: PhoneCall },
  ];

  // Direct WhatsApp chat redirection for "Let's Talk" CTA
  const whatsappUrl = `https://wa.me/916304299387?text=${encodeURIComponent(
    "Hello! I would like to discuss a project with AMOGHA Digital."
  )}`;

  // Homepage starts transparent at scroll = 0, transitions to pure white when scrolled
  const isTransparent = pathname === "/" && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent text-[#F5F7FC]"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-[#0F172A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[75px]">
          {/* Left Brand Logo Image with Business Name Included */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group focus-visible:outline-[#00B8F0] rounded-lg py-1"
            aria-label="AMOGHA Digital Home"
          >
            <Image
              src={isTransparent ? "/assets/logo-blue.webp" : "/assets/logo-ribbon.webp"}
              alt="AMOGHA Digital"
              width={800}
              height={213}
              priority
              className="h-9 sm:h-10 w-auto object-contain transition-opacity duration-200"
            />
          </Link>

          {/* Desktop Right Navigation with WordPress-Style Hover Underline (Hidden below lg) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 lg:gap-8"
          >
            <div className="flex items-center gap-6 lg:gap-7">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                // Styling adapts based on whether header is transparent or white
                let linkColorClass = "";
                let underlineColorClass = "";

                if (isTransparent) {
                  linkColorClass = isActive
                    ? "text-[#00B8F0]"
                    : "text-[#9BAAC2] hover:text-[#F5F7FC]";
                  underlineColorClass = "bg-[#00B8F0]";
                } else {
                  linkColorClass = isActive
                    ? "text-[#0284C7] font-bold"
                    : "text-[#334155] hover:text-[#0F172A]";
                  underlineColorClass = "bg-[#0284C7]";
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 text-[13.5px] sm:text-[14px] font-semibold tracking-wider transition-colors duration-150 group ${linkColorClass}`}
                  >
                    <span>{item.label}</span>
                    {/* Animated underline on hover and active */}
                    <span
                      className={`absolute bottom-[-2px] left-0 h-[2px] transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      } ${underlineColorClass}`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 focus-visible:outline-[#00B8F0]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile & Tablet Animated Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus-visible:outline-[#00B8F0] ${
                isTransparent
                  ? "text-[#F5F7FC] hover:bg-[#14233D]"
                  : "text-[#0F172A] hover:bg-slate-100"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-300 transform ${
                    mobileMenuOpen
                      ? "opacity-0 rotate-90 scale-75 pointer-events-none"
                      : "opacity-100 rotate-0 scale-100 pointer-events-auto"
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute transition-all duration-300 transform ${
                    mobileMenuOpen
                      ? "opacity-100 rotate-0 scale-100 pointer-events-auto"
                      : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Navigation with Smooth Opening and Closing Transitions */}
      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 top-[75px] h-[calc(100dvh-75px)] z-50 px-6 py-6 flex flex-col justify-between overflow-y-auto lg:hidden transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 pointer-events-none invisible"
        } ${
          pathname === "/" && !isScrolled
            ? "bg-[#0B1220] border-t border-[#29374D] text-[#F5F7FC]"
            : "bg-white/98 backdrop-blur-md border-t border-slate-200 text-[#0F172A] shadow-2xl"
        }`}
      >
        <div className="space-y-4">
          <nav aria-label="Mobile Navigation" className="space-y-2.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              const isDarkTheme = pathname === "/" && !isScrolled;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold tracking-wider transition-all min-h-[50px] flex items-center gap-3.5 ${
                    isActive
                      ? isDarkTheme
                        ? "bg-[#14233D] text-[#00B8F0] shadow-sm"
                        : "bg-sky-50 text-[#0284C7] font-bold shadow-xs"
                      : isDarkTheme
                      ? "text-[#9BAAC2] hover:bg-[#14233D]/60 hover:text-[#F5F7FC]"
                      : "text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? isDarkTheme
                          ? "bg-[#00B8F0]/20 text-[#00B8F0]"
                          : "bg-[#0284C7]/10 text-[#0284C7]"
                        : isDarkTheme
                        ? "bg-[#14233D] text-slate-400"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Bottom CTA Button with Standard Equal Sizing */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-[#29374D] mt-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white text-base font-semibold px-6 py-3.5 rounded-lg shadow-sm transition-all min-h-[48px]"
          >
            <span>Start a Project Discussion</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
