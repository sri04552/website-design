import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1220] text-[#9BAAC2] border-t border-[#29374D]">
      {/* Main Footer Links */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Column 1: Studio Identity */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#00B8F0]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                  </svg>
                </div>
                <span
                  className="font-extrabold text-[#F5F7FC] text-lg tracking-[0.12em] uppercase"
                  style={{
                    fontFamily: "var(--font-automata), var(--font-manrope), sans-serif",
                  }}
                >
                  {siteConfig.name}
                </span>
              </Link>

              <p className="text-[#9BAAC2] text-[14px] leading-[1.7] max-w-sm">
                {siteConfig.shortDescription}
              </p>

              <div className="pt-2 space-y-2 text-xs text-[#9BAAC2]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0D8C7D] shrink-0" />
                  <span>No lock-in contracts, 100% direct code ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00B8F0] shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Core Services */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider">
                Services
              </p>
              <ul className="space-y-2 text-sm">
                {siteConfig.services.slice(0, 3).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors flex items-center gap-1 group text-[14px]"
                    >
                      <span>{service.shortTitle}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00B8F0]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Specialized Solutions */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider">
                Specialized
              </p>
              <ul className="space-y-2 text-sm">
                {siteConfig.services.slice(3).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors flex items-center gap-1 group text-[14px]"
                    >
                      <span>{service.shortTitle}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00B8F0]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Studio Navigation */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider">
                Studio
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/portfolio"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors text-[14px]"
                  >
                    Demonstration Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors text-[14px]"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors text-[14px]"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors text-[14px]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#29374D]/60 py-6 text-xs text-[#9BAAC2]">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved. Independent
              freelance digital services studio based in {siteConfig.location.city},{" "}
              {siteConfig.location.state}.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-[#F5F7FC] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#F5F7FC] transition-colors"
              >
                Inquiries
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
