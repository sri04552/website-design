import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFaqAccordion } from "@/components/contact/ContactFaqAccordion";
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Project Consultation & Advisory | Amogha Digital",
  description:
    "Initiate your project discussion with Amogha Digital. We engineer custom high-performance web platforms, targeted performance advertising campaigns, and intelligent AI automation workflows.",
  keywords: [
    "Contact Amogha Digital",
    "Digital Engineering Consultation",
    "Enterprise Web Development",
    "Performance Marketing Agency",
    "Google Ads Management",
    "Meta Ads Agency",
    "AI Workflow Automation",
    "Next.js Development Agency",
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Amogha Digital",
    description:
      "Initiate a project consultation with Amogha Digital for custom web engineering, performance advertising, and AI workflow automation.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: "Amogha Digital",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      url: siteConfig.url,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phone,
          contactType: "Project Consultation and Technical Enquiries",
          areaServed: ["IN", "Worldwide"],
          availableLanguage: ["English", "Telugu", "Hindi"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.state,
        addressCountry: "IN",
      },
    },
  };

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        "Hello! I would like to schedule an executive project discussion with Amogha Digital."
      )}`
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section: Project Consultation & Advisory with Full-Width Background Color */}
      <section className="relative w-full min-h-[500px] lg:min-h-[560px] border-b border-[#1E2E48] pt-[123px] pb-[48px] overflow-hidden flex items-center bg-[#070D18]">
        {/* Full-Width Atmospheric Radial Glow matching Services Page */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(20,35,61,0.85)_0%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Full-Width Ambient Cyan/Blue Glow for Atmospheric Depth */}
        <div
          className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#00B8F0]/10 rounded-full blur-[140px] pointer-events-none z-0"
          aria-hidden="true"
        />

        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Authoritative Editorial Introduction & Direct Actions (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Bold Headline (Eyebrow removed as requested) */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight text-[#F5F7FC] leading-[1.12]">
                Let’s Build What’s Next.{" "}
                <span className="block mt-1 sm:mt-2 text-[#00B8F0] font-extrabold">
                  Start a Conversation.
                </span>
              </h1>

              {/* Supporting Copy (16px mobile, 15px desktop) */}
              <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal max-w-xl font-sans">
                Whether you are looking to engineer a high-performance web platform, accelerate qualified customer acquisition through targeted advertising, or automate operations with AI systems, our specialists are ready to help you plan, execute, and scale.
              </p>

              {/* Instant Action Buttons with Standard min-h-[48px] */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto font-sans">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all min-h-[48px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Now</span>
                  </a>
                )}

                <a
                  href="#enquiry-form"
                  className="inline-flex items-center justify-center gap-2 bg-[#131F33] hover:bg-[#1A2A45] active:bg-[#0F1929] text-[#F5F7FC] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-[#2B3E5C] hover:border-[#00B8F0]/70 shadow-xs hover:shadow-[0_0_20px_rgba(0,184,240,0.15)] transition-all min-h-[48px] focus-visible:outline-[#00B8F0]"
                >
                  <span>Submit Project Details</span>
                  <ArrowDown className="w-4 h-4 text-[#00B8F0]" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Showcase (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[#1E2E48] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <Image
                  src="/assets/amogha-digital-collaborative-tech-meeting-project-consultation.webp"
                  alt="Amogha Digital technical leadership and consulting team discussing a digital transformation project with clients"
                  title="Amogha Digital - Collaborative Project Consultation & Client Advisory Meeting"
                  width={1586}
                  height={992}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Contact & Consultation Section with exact 48px padding */}
      <section
        id="enquiry-form"
        className="bg-[#F8FAFC] py-[48px] border-b border-slate-200 text-[#0F172A]"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Enquiries & Communication Channels (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <div className="space-y-3">
                <h2 className="font-heading text-2xl sm:text-3.5xl lg:text-[38px] font-extrabold tracking-tight text-[#0F172A] leading-[1.18]">
                  Get in Touch Directly
                </h2>
                <p className="text-[16px] sm:text-[15px] text-[#475569] leading-[1.75] font-normal">
                  Have a question or want to discuss a new project? Reach out through WhatsApp, phone, or email. We are always happy to help.
                </p>
              </div>

              {/* Direct Communication Channels List with Authentic WhatsApp Icon */}
              <div className="space-y-3.5 pt-3 border-t border-slate-200/80">
                {/* Email Channel */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00B8F0] border border-sky-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-heading text-sm font-bold text-slate-900">Email</h3>
                    <p className="text-xs sm:text-[13.5px] text-[#475569]">
                      <a
                        href="mailto:contact@amoghadigital.com"
                        className="text-[#0284C7] hover:text-[#00B8F0] font-semibold transition-colors break-all"
                      >
                        contact@amoghadigital.com
                      </a>
                    </p>
                    <p className="text-[12px] text-slate-500">
                      Send us your requirements, blueprints, or RFPs directly.
                    </p>
                  </div>
                </div>

                {/* WhatsApp Channel with Authentic WhatsApp SVG Icon */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
                    <svg
                      className="w-5 h-5 fill-[#25D366]"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-heading text-sm font-bold text-slate-900">WhatsApp</h3>
                    <p className="text-xs sm:text-[13.5px] text-[#475569]">
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappNumber || "916304299387"}?text=${encodeURIComponent(
                          "Hello! I would like to discuss a project with Amogha Digital."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D8C7D] hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Message on WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </p>
                    <p className="text-[12px] text-slate-500">
                      Fast, real-time responses for quick consultations and enquiries.
                    </p>
                  </div>
                </div>

                {/* Call Now Channel */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0284C7] border border-blue-100 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-heading text-sm font-bold text-slate-900">Call Now</h3>
                    <p className="text-xs sm:text-[13.5px] text-[#475569]">
                      <a
                        href="tel:+916304299387"
                        className="text-slate-900 hover:text-[#0284C7] font-semibold font-mono transition-colors"
                      >
                        +91 6304299387
                      </a>
                    </p>
                    <p className="text-[12px] text-slate-500">
                      Speak directly with our technical team during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Enquiry & Contact Form (7 cols on lg) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Accordion FAQ Section with exact 48px padding */}
      <section className="bg-white py-[48px] border-b border-slate-200 text-[#0F172A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Clear answers regarding our engagement model, project scoping, and delivery standards.
            </p>
          </div>

          <ContactFaqAccordion />
        </Container>
      </section>
    </>
  );
}