import Link from "next/link";
import { siteConfig } from "@/config/site";
import { portfolioProjects } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function ServiceDetailPage({ service }) {
  if (!service) return null;

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hi! I'm interested in your ${service.title} service for my business.`
      )}`
    : "/contact#whatsapp-note";

  // Related concept projects
  const relatedProjects = portfolioProjects.filter(
    (p) => p.serviceSlug === service.slug
  );

  return (
    <div className="pb-20 space-y-16 sm:space-y-24">
      {/* Top Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-8 sm:pt-12 pb-14 sm:pb-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.shortTitle, href: service.slug ? `/services/${service.slug}` : "/services" },
            ]}
          />

          <div className="max-w-4xl mt-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <Badge variant="primary">{service.badge}</Badge>
              <span className="text-xs text-slate-500 font-medium">
                Tailored for Eluru & Pan-India
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {service.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {service.heroSubheadline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button href="#service-contact" variant="primary" size="lg">
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href={whatsappHref} variant="whatsapp" size="lg">
                <span>Start Direct Consultation</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The Problem & Solution Breakdown */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Problem Card */}
            <div className="lg:col-span-6 bg-rose-50/50 border border-rose-200/80 rounded-3xl px-4 py-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{service.problemStatement.headline}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-600">
                Most businesses struggle with the same recurring issues:
              </p>
              <ul className="space-y-3 pt-2">
                {service.problemStatement.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution Card */}
            <div className="lg:col-span-6 bg-blue-50/50 border border-blue-200/80 rounded-3xl px-4 py-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{service.solutionStatement.headline}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {service.solutionStatement.description}
              </p>
              <div className="pt-2 border-t border-blue-200/60">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct WhatsApp & Call funnels</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Transparent tracking & ownership</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fast execution & testing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero agency overhead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Deliverables Grid */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <Badge variant="primary" className="mb-3">
              Included Deliverables
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              What You Receive With This Service
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Concrete items delivered with every project. No ambiguity, hidden surprises, or unfinished assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 px-4 py-6 sm:p-6 shadow-xs space-y-2 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Ideal for banner */}
          {service.idealFor && (
            <div className="mt-12 bg-white rounded-2xl border border-slate-200 px-4 py-6 sm:p-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Who This Service Helps Most
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                {service.idealFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Step by Step Process */}
      {service.process && (
        <section>
          <Container>
            <div className="max-w-3xl mb-12">
              <Badge variant="neutral" className="mb-3">
                Workflow
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                How We Execute This Service
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                A structured 4-step workflow keeping you informed at every milestone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 px-4 py-6 sm:p-6 shadow-xs space-y-3"
                >
                  <span className="text-2xl font-black text-blue-600">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    {step.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related Demonstration Showcase */}
      {relatedProjects.length > 0 && (
        <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <Container>
            <div className="max-w-2xl mb-8">
              <Badge variant="dark" className="bg-slate-800 text-blue-400 border-slate-700 mb-3">
                Concept Application
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How This Looks in Practice
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                Explore a functional demonstration project built using this exact service stack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-6 sm:p-7 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-400">
                      {p.clientType}
                    </span>
                    <Badge variant="neutral" className="bg-slate-700 text-slate-200 border-slate-600 text-[10px]">
                      Demonstration
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {p.summary}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-700/80 text-xs">
                    <span className="text-slate-400">{p.location}</span>
                    <Link
                      href="/portfolio"
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <span>View in Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {service.faqs && (
        <section>
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <Badge variant="neutral">Questions Answered</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  FAQs About {service.shortTitle}
                </h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 px-4 py-5 sm:p-6"
                  >
                    <h3 className="text-base font-bold text-slate-900 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed pl-7">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Dedicated Contact Form Anchor */}
      <section id="service-contact" className="scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 space-y-2">
              <Badge variant="primary">Get Started</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Start Your {service.shortTitle} Project
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Fill out the form below or message directly on WhatsApp to discuss your timeline, requirements, and scope.
              </p>
            </div>

            <ContactForm preselectedService={service.id} />
          </div>
        </Container>
      </section>
    </div>
  );
}
