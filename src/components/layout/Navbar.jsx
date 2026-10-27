"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowRight } from "lucide-react";

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
    { label: "HOME", href: "/" },
    { label: "SERVICES", href: "/services" },
    { label: "BLOGS", href: "/blogs" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  // Direct WhatsApp chat redirection for "Let's Talk" CTA
  const whatsappUrl = `https://wa.me/916304299387?text=${encodeURIComponent(
    "Hello! I would like to discuss a project for my business."
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
          {/* Left Brand Wordmark with Automata Display Font Style */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-[#00B8F0] rounded-lg p-1"
          >
            {/* Minimalist infinity loop icon matching reference */}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isTransparent ? "text-[#00B8F0]" : "text-[#0284C7]"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
              </svg>
            </div>
            {/* Brand Wordmark styled in Automata Display Font Style */}
            <span
              className={`text-sm sm:text-base lg:text-lg uppercase transition-colors tracking-[0.14em] font-extrabold ${
                isTransparent ? "text-[#F5F7FC]" : "text-[#0F172A]"
              }`}
              style={{
                fontFamily: "'AutomateDisplay', var(--font-manrope), sans-serif",
              }}
            >
              {siteConfig.name || "AUTOMATE MEDIA"}
            </span>
          </Link>

          {/* Desktop Right Navigation with WordPress-Style Hover Underline */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8"
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
                    className={`relative py-1 text-[13px] sm:text-[13.5px] font-semibold tracking-wider transition-colors duration-150 group ${linkColorClass}`}
                  >
                    <span>{item.label}</span>
                    {/* WordPress-style animated underline on hover and active */}
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

            {/* Darkened Teal Primary CTA Button - Redirects directly to WhatsApp chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 focus-visible:outline-[#00B8F0]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0D8C7D] hover:bg-[#0B7568] text-white text-xs font-semibold px-2.5 py-1.5 rounded-md"
            >
              <span>Talk</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg transition-colors focus-visible:outline-[#00B8F0] ${
                isTransparent
                  ? "text-[#F5F7FC] hover:bg-[#14233D]"
                  : "text-[#0F172A] hover:bg-slate-100"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[75px] bottom-0 bg-[#0B1220] z-50 border-t border-[#29374D] px-6 py-6 flex flex-col justify-between md:hidden"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm sm:text-base font-semibold tracking-wider ${
                      isActive
                        ? "bg-[#14233D] text-[#00B8F0]"
                        : "text-[#9BAAC2] hover:bg-[#14233D]/60 hover:text-[#F5F7FC]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-5 border-t border-[#29374D] space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-full"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
