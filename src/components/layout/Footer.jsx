import Image from "next/image";
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
              <Link href="/" className="inline-block py-1" aria-label="Amogha Digital Home">
                <Image
                  src="/assets/logo-blue.webp"
                  alt="Amogha Digital"
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
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Core Services */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#F5F7FC] uppercase tracking-wider">
                Services
              </p>
              <ul className="space-y-2.5">
                {siteConfig.services.slice(0, 3).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors flex items-center gap-1.5 group text-[13px] sm:text-[13.5px]"
                    >
                      <span>{service.shortTitle}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#00B8F0]" />
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
              <ul className="space-y-2.5">
                {siteConfig.services.slice(3).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors flex items-center gap-1.5 group text-[13px] sm:text-[13.5px]"
                    >
                      <span>{service.shortTitle}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#00B8F0]" />
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
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/blogs"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block text-[13px] sm:text-[13.5px]"
                  >
                    Blogs & Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block text-[13px] sm:text-[13.5px]"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block text-[13px] sm:text-[13.5px]"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors block text-[13px] sm:text-[13.5px]"
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
                Privacy
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#F5F7FC] transition-colors"
              >
                Enquiries
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
