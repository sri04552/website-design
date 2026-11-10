"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide public footer on all admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/916304299387?text=${encodeURIComponent(
    "Hello! I would like to discuss a project with Amogha Digital."
  )}`;

  return (
    <footer className="bg-[#0B1220] text-[#9BAAC2] border-t border-[#29374D]">
      {/* Main Footer Links */}
      <div className="py-[48px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Column 1: Company Identity (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block py-1" aria-label="Amogha Digital Home">
                <Image
                  src="/assets/amogha-digital-official-logo.webp"
                  alt="Amogha Digital - Digital Growth & Engineering Company"
                  title="Amogha Digital"
                  width={800}
                  height={213}
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </Link>

              <p className="text-[#8E9EB5] text-[13px] sm:text-[13.5px] leading-relaxed max-w-sm font-normal">
                {siteConfig.shortDescription}
              </p>

              <div className="pt-1 space-y-2 text-[12.5px] sm:text-[13px] text-[#8E9EB5]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D8C7D] shrink-0" />
                  <span>No lock-in contracts, 100% direct code ownership</span>
                </div>
              </div>
            </div>

            {/* Column 2: Core Services (3 cols on lg) */}
            <div className="space-y-3.5 lg:col-span-3">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider font-mono">
                Services
              </p>
              <ul className="space-y-2.5">
                {siteConfig.services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors flex items-center gap-1.5 group text-[13px] sm:text-[13.5px]"
                    >
                      <span>{service.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#00B8F0]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company Navigation (2 cols on lg) */}
            <div className="space-y-3.5 lg:col-span-2">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider font-mono">
                Company
              </p>
              <ul className="space-y-2.5 text-[13px] sm:text-[13.5px]">
                <li>
                  <Link
                    href="/"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block"
                  >
                    Services Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block"
                  >
                    Blogs &amp; Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Details (3 cols on lg) */}
            <div className="space-y-3.5 lg:col-span-3">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider font-mono">
                Contact Details
              </p>
              <ul className="space-y-3 text-[13px] sm:text-[13.5px]">
                {/* Email Channel */}
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#7E8FA6] uppercase font-mono block">Email</span>
                    <a
                      href="mailto:contact@amoghadigital.com"
                      className="text-[#F5F7FC] hover:text-[#00B8F0] font-medium transition-colors break-all"
                    >
                      contact@amoghadigital.com
                    </a>
                  </div>
                </li>

                {/* Direct Phone Channel */}
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-[#7E8FA6] uppercase font-mono block">Call Us</span>
                    <a
                      href="tel:+916304299387"
                      className="text-[#F5F7FC] hover:text-[#00B8F0] font-medium transition-colors font-mono"
                    >
                      +91 6304299387
                    </a>
                  </div>
                </li>

                {/* WhatsApp Channel */}
                <li className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-[#7E8FA6] uppercase font-mono block">WhatsApp</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F5F7FC] hover:text-[#00B8F0] font-medium transition-colors inline-flex items-center gap-1"
                    >
                      <span>Message on WhatsApp</span>
                      <ArrowRight className="w-3 h-3 text-[#00B8F0]" />
                    </a>
                  </div>
                </li>

                {/* Office Location */}
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-[#7E8FA6] uppercase font-mono block">Location</span>
                    <span className="text-[#8E9EB5]">
                      {siteConfig.location.city}, {siteConfig.location.state}, India
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#29374D]/60 py-6 text-[12px] sm:text-[12.5px] text-[#7E8FA6]">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="leading-relaxed">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/privacy-policy"
                className="hover:text-[#F5F7FC] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#F5F7FC] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
