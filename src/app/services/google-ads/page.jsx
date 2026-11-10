import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Google Ads & Search PPC | Amogha Digital",
  description:
    "Capture active buyers at the moment they search for your products or services.",
};

export default function GoogleAdsPage() {
  return (
    <div className="min-h-[70vh] bg-[#070D18] text-[#F5F7FC] pt-[123px] pb-[48px] flex items-center">
      <Container>
        <div className="max-w-3xl space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#00B8F0] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FC] tracking-tight">
            Google Ads &amp; Search PPC
          </h1>
          <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-relaxed">
            Capture active buyers at the moment they search for your products or services. Full service details coming soon.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
