import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Share2,
  Search,
  Bot,
  Palette,
  Video,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function CapabilitiesSection() {
  const capabilities = [
    {
      id: "website-design",
      tag: "WEBSITE DESIGN",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      icon: Code2,
      title: "Website Design & Development",
      description:
        "From custom business websites and landing pages to e-commerce stores, we build fast, mobile-friendly websites designed to rank on Google and convert local visitors into paying clients.",
      image: "/assets/website-design.webp",
      imageAlt:
        "Professional website design and development services for businesses in Eluru and Andhra Pradesh",
      imageTitle: "Website Design & Development",
      imageCaption:
        "Custom website design, business websites, e-commerce stores, and responsive web development optimized for local SEO.",
      href: "/services/website-design",
      ctaText: "Explore Website Design",
      ctaAriaLabel: "Learn more about website design and development services",
    },
    {
      id: "meta-ads",
      tag: "META ADS",
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Share2,
      title: "Meta Ads Management (FB & IG)",
      description:
        "Targeted Facebook and Instagram ad campaigns that put your products and services directly in front of ready-to-buy customers in Eluru and across India with measurable ROI.",
      image: "/assets/meta-ads.webp",
      imageAlt:
        "Meta Ads management dashboard displaying Facebook and Instagram advertising campaign performance and qualified lead generation",
      imageTitle: "Meta Ads Management (Facebook & Instagram)",
      imageCaption:
        "Targeted Facebook and Instagram paid advertising campaigns generating verified inquiries and customer conversions.",
      href: "/services/meta-ads",
      ctaText: "Explore Meta Ads",
      ctaAriaLabel: "Learn more about Meta Facebook and Instagram advertising services",
    },
    {
      id: "google-ads",
      tag: "GOOGLE ADS",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Search,
      title: "Google Ads Management",
      description:
        "High-intent Google Search and Local Service ads that capture active buyers searching for your specific products and services when purchasing intent is at its highest.",
      image: "/assets/google-ads.webp",
      imageAlt:
        "Google Ads management analytics dashboard showing search campaign conversion rates and cost per acquisition metrics",
      imageTitle: "Google Ads Search & Local Services Campaign Management",
      imageCaption:
        "High-intent Google Search advertising campaigns capturing qualified local search buyers in Andhra Pradesh.",
      href: "/services/google-ads",
      ctaText: "Explore Google Ads",
      ctaAriaLabel: "Learn more about Google Ads search and local campaign management",
    },
    {
      id: "ai-automation",
      tag: "WORKFLOW AUTOMATION",
      tagColor: "bg-teal-50 text-teal-700 border-teal-200",
      icon: Bot,
      title: "Business Workflow Automation & AI Chatbots",
      description:
        "Automate customer inquiries, lead qualification, and appointment bookings with 24/7 intelligent WhatsApp bots and workflow automations that sync directly with your CRM.",
      image: "/assets/ai-automation.webp",
      imageAlt:
        "24/7 automated WhatsApp business chatbot and CRM workflow automation interface",
      imageTitle: "Business Workflow Automation & WhatsApp AI Chatbots",
      imageCaption:
        "Intelligent WhatsApp chatbots and business workflow automation to handle inquiries and schedule appointments 24/7.",
      href: "/services/ai-automation",
      ctaText: "Explore Automation",
      ctaAriaLabel: "Learn more about business workflow automation and WhatsApp chatbot solutions",
    },
    {
      id: "graphic-design",
      tag: "GRAPHIC DESIGN",
      tagColor: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Palette,
      title: "Graphic Design & Brand Identity",
      description:
        "Cohesive brand identity packages, social media advertising creatives, marketing collateral, and print assets that establish authority and lasting brand recall.",
      image: "/assets/graphic-design.webp",
      imageAlt:
        "Professional graphic design and brand identity mockups including logo systems, social media banners, and advertising creatives",
      imageTitle: "Graphic Design & Visual Brand Identity",
      imageCaption:
        "Comprehensive graphic design and corporate visual identity deliverables for modern businesses.",
      href: "/services/graphic-design",
      ctaText: "Explore Graphic Design",
      ctaAriaLabel: "Learn more about graphic design and branding services",
    },
    {
      id: "ai-video",
      tag: "AI VIDEO",
      tagColor: "bg-rose-50 text-rose-700 border-rose-200",
      icon: Video,
      title: "AI Video Generation & Commercial Reels",
      description:
        "High-impact promotional video ads, product showcase reels, and localized social media video content produced quickly without expensive production crews.",
      image: "/assets/ai-video.webp",
      imageAlt:
        "AI video generation and commercial social media video reel production preview for digital marketing",
      imageTitle: "AI Video Generation & Commercial Reel Production",
      imageCaption:
        "High-impact promotional AI video ads and social media video content engineered for high engagement.",
      href: "/services/ai-video",
      ctaText: "Explore AI Video",
      ctaAriaLabel: "Learn more about AI video generation and commercial reel production",
    },
  ];

  // Schema.org structured data for all 6 service listings
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} - Core Services`,
    description:
      "Website design, Meta & Google ads, workflow automation, graphic design, and AI video generation for businesses in Eluru and pan-India.",
    itemListElement: capabilities.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: item.title,
        description: item.description,
        serviceType: item.tag,
        provider: {
          "@type": "LocalBusiness",
          name: siteConfig.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.location.city,
            addressRegion: siteConfig.location.state,
            addressCountry: siteConfig.location.country,
          },
        },
        areaServed: siteConfig.location.serviceArea,
        url: `${siteConfig.url}${item.href}`,
        image: `${siteConfig.url}${item.image}`,
      },
    })),
  };

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative py-[48px] bg-[#F8FAFC] border-t border-slate-200/90 text-[#0F172A]"
    >
      {/* Schema.org ItemList Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="max-w-3xl mx-auto text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-sky-700 text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" aria-hidden="true" />
            <span>SERVICES &amp; EXPERTISE</span>
          </div>

          {/* Section Main H2 */}
          <h2
            id="capabilities-heading"
            className="text-2xl sm:text-3.5xl lg:text-[38px] font-extrabold tracking-tight text-[#0F172A] leading-[1.2]"
          >
            Digital Services Engineered for Real Business Growth
          </h2>

          {/* Section Subtitle Paragraph strictly 14px-15px */}
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#475569] leading-[1.65] max-w-2xl mx-auto font-normal">
            Clean website design, targeted customer acquisition, and 24/7 automation built to help businesses in Eluru and pan-India capture and convert qualified leads.
          </p>
        </header>

        {/* 6 Services Responsive Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                aria-labelledby={`card-heading-${item.id}`}
                className="bg-white rounded-xl border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Visual Image Header */}
                <figure className="relative aspect-[16/10] w-full overflow-hidden bg-[#F1F5F9] m-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    title={item.imageTitle}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out"
                    unoptimized
                  />
                  <figcaption className="sr-only">
                    {item.imageCaption}
                  </figcaption>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </figure>

                {/* Compact Card Content */}
                <div className="p-5 sm:p-5.5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Tag & Icon Row */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10.5px] font-bold tracking-wider uppercase border ${item.tagColor}`}
                      >
                        {item.tag}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#00B8F0]/10 group-hover:text-[#00B8F0] transition-colors">
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3
                      id={`card-heading-${item.id}`}
                      className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight group-hover:text-[#0284C7] transition-colors leading-[1.3]"
                    >
                      {item.title}
                    </h3>

                    {/* Concise 2-line Description strictly 14px-15px */}
                    <p className="mt-2 text-[14px] sm:text-[14.5px] text-[#475569] leading-[1.6] font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <Link
                      href={item.href}
                      aria-label={item.ctaAriaLabel}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0D8C7D] hover:text-[#0B7568] transition-colors group/link"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Compact Consultation Strip */}
        <aside
          aria-label="Free Consultation & Growth Audit"
          className="mt-8 sm:mt-10 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3.5"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0F172A]">
              Need a custom package or want to discuss a new digital project?
            </h4>
            <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
              Available for in-person meetings in Eluru and virtual consultations across India.
            </p>
          </div>
          <a
            href={`https://wa.me/916304299387?text=${encodeURIComponent(
              "Hello! I am interested in discussing digital services for my business."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat directly on WhatsApp about your digital project"
            className="inline-flex items-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white text-xs sm:text-sm font-semibold px-4.5 py-2 rounded-lg shadow-xs hover:shadow transition-all shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
}
