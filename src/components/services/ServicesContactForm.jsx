"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Code2,
  Share2,
  Search,
  Bot,
  Palette,
  Video,
  Sparkles,
  Layers,
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Clock,
  Lock,
  Check,
} from "lucide-react";

export function ServicesContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "website-design",
    budget: "flexible",
    message: "",
    honeypot: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const servicesList = [
    {
      id: "website-design",
      title: "Website Design",
      subtitle: "Custom SEO & Mobile Web",
      icon: Code2,
      color: "text-sky-600",
      activeBg: "border-sky-500 bg-sky-50/70",
    },
    {
      id: "meta-ads",
      title: "Meta Ads",
      subtitle: "FB & IG Lead Acquisition",
      icon: Share2,
      color: "text-blue-600",
      activeBg: "border-blue-500 bg-blue-50/70",
    },
    {
      id: "google-ads",
      title: "Google Ads",
      subtitle: "Search PPC & High Intent",
      icon: Search,
      color: "text-amber-600",
      activeBg: "border-amber-500 bg-amber-50/70",
    },
    {
      id: "ai-automation",
      title: "AI Automation",
      subtitle: "WhatsApp Bots & CRM Sync",
      icon: Bot,
      color: "text-teal-600",
      activeBg: "border-teal-500 bg-teal-50/70",
    },
    {
      id: "graphic-design",
      title: "Brand Identity",
      subtitle: "Logos & Visual Creatives",
      icon: Palette,
      color: "text-purple-600",
      activeBg: "border-purple-500 bg-purple-50/70",
    },
    {
      id: "ai-video",
      title: "AI Video Reels",
      subtitle: "High-Retention Video Ads",
      icon: Video,
      color: "text-rose-600",
      activeBg: "border-rose-500 bg-rose-50/70",
    },
    {
      id: "full-suite",
      title: "Full Growth Suite",
      subtitle: "End-to-End Digital Setup",
      icon: Sparkles,
      color: "text-[#00B8F0]",
      activeBg: "border-[#00B8F0] bg-cyan-50/70",
    },
    {
      id: "custom",
      title: "Custom Project",
      subtitle: "Consultation & Architecture",
      icon: Layers,
      color: "text-slate-700",
      activeBg: "border-slate-800 bg-slate-100/90",
    },
  ];

  const budgetOptions = [
    { id: "flexible", label: "Flexible / Open" },
    { id: "under-25k", label: "< ₹25,000" },
    { id: "25k-50k", label: "₹25k – ₹50k" },
    { id: "50k-1lakh", label: "₹50k – ₹1 Lakh" },
    { id: "above-1lakh", label: "₹1 Lakh+" },
  ];

  // Validation rules
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const cleanPhone = formData.phone.replace(/[^0-9+]/g, "");
  const isPhoneValid = cleanPhone.length >= 10;
  const isMessageValid = formData.message.trim().length >= 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Mark all required fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    if (!isNameValid) {
      setStatus("error");
      setErrorMessage("Please enter your name (minimum 2 characters).");
      return;
    }
    if (!isEmailValid) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address (e.g. name@company.com).");
      return;
    }
    if (!isPhoneValid) {
      setStatus("error");
      setErrorMessage("Please enter a valid phone or WhatsApp number (minimum 10 digits).");
      return;
    }
    if (!isMessageValid) {
      setStatus("error");
      setErrorMessage("Please share a brief note about your project requirements (minimum 10 characters).");
      return;
    }

    setStatus("submitting");

    try {
      const selectedServiceObj = servicesList.find((s) => s.id === formData.service);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: selectedServiceObj ? `${selectedServiceObj.title} (${selectedServiceObj.subtitle})` : formData.service,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project inquiry.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "An unexpected error occurred. Please contact us directly via WhatsApp."
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setFormData({
      name: "",
      businessName: "",
      email: "",
      phone: "",
      service: "website-design",
      budget: "flexible",
      message: "",
      honeypot: "",
    });
    setTouched({
      name: false,
      email: false,
      phone: false,
      message: false,
    });
  };

  const selectedServiceData = servicesList.find((s) => s.id === formData.service);

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hello! I just submitted an inquiry for ${
          selectedServiceData?.title || "digital services"
        } on your website. My name is ${formData.name || "Client"}.`
      )}`
    : null;

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl border border-emerald-200/90 p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(13,140,125,0.08)] max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Proposal Request Received!
          </h3>
          <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed max-w-md mx-auto">
            Thank you for reaching out. We have logged your project scope for{" "}
            <span className="font-semibold text-slate-900">{selectedServiceData?.title}</span>. Our team will review your requirements and respond with a personalized proposal within 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 max-w-md mx-auto text-left text-xs sm:text-[13px] text-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Clock className="w-4 h-4 text-[#00B8F0]" />
            <span>What happens next?</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            1. We review your goals and existing digital footprint.<br />
            2. We outline clear deliverables, architecture, and fixed pricing.<br />
            3. We follow up directly on your provided WhatsApp and email.
          </p>
        </div>

        {whatsappHref && (
          <div className="pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-semibold text-sm transition-all shadow-sm hover:shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Need an Instant Answer? Connect on WhatsApp</span>
            </a>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 underline transition-colors cursor-pointer"
          >
            Submit another project inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.06)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Premium Value Assurances & Direct Founder Line (5 cols on lg) */}
        <aside className="lg:col-span-5 bg-gradient-to-br from-[#0B1220] via-[#111C30] to-[#0B1220] text-white p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#29374D] relative overflow-hidden">
          {/* Subtle Ambient Lighting */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-[#00B8F0]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14233D] border border-[#29374D] text-[#00B8F0] text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT PROPOSAL REQUEST</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F7FC] leading-snug">
                Let&apos;s Build Systems That Drive Predictable Growth
              </h3>
              <p className="text-[14px] sm:text-[13.5px] text-[#9BAAC2] leading-relaxed">
                Tell us about your project. Every inquiry is reviewed directly by our core leadership to provide a fixed quote, clear scope, and verified delivery standards.
              </p>
            </div>

            {/* 4 Trust Value Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#14233D] border border-[#29374D] text-[#00B8F0] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">24-Hour Diagnostic Response</h4>
                  <p className="text-[12px] text-[#8E9EB5] leading-relaxed">
                    Personalized scope outline and pricing without sales delays.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#14233D] border border-[#29374D] text-[#0D8C7D] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">100% Direct Ownership</h4>
                  <p className="text-[12px] text-[#8E9EB5] leading-relaxed">
                    You own your source code, domain, and ad accounts outright.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#14233D] border border-[#29374D] text-[#00B8F0] flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Zero Lock-In &amp; Privacy</h4>
                  <p className="text-[12px] text-[#8E9EB5] leading-relaxed">
                    Strict privacy. We never share your data or contact details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#14233D] border border-[#29374D] text-[#0D8C7D] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Direct Founder Attention</h4>
                  <p className="text-[12px] text-[#8E9EB5] leading-relaxed">
                    No middlemen or junior account managers. Direct communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

            {/* Direct Contact Pill at Bottom */}
            <div className="relative z-10 pt-6 mt-6 border-t border-[#29374D]/80 space-y-2 text-xs text-[#9BAAC2]">
              <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                Prefer immediate messaging?
              </p>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0D8C7D] hover:text-[#00B8F0] font-semibold text-xs sm:text-[13px] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {siteConfig.contact.phone}</span>
                </a>
              )}
            </div>
        </aside>

        {/* Right Column: Modern High-Conversion Interactive Form (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-white">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot for spam bots */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Global Error Banner */}
            {status === "error" && errorMessage && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-[13px] animate-in fade-in"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Interactive Service Selector Grid (Modern replacement for select dropdown) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-900 tracking-wide uppercase">
                  1. Select Service Category <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-slate-500">
                  Click to choose
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {servicesList.map((svc) => {
                  const Icon = svc.icon;
                  const isSelected = formData.service === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, service: svc.id }))}
                      className={`relative p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[72px] sm:min-h-[82px] group ${
                        isSelected
                          ? "border-[#00B8F0] bg-gradient-to-br from-sky-50 to-cyan-50/50 shadow-xs shadow-[#00B8F0]/20 ring-2 ring-[#00B8F0]/20"
                          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#00B8F0] text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>

                      <div className="mt-1.5">
                        <div className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 leading-tight">
                          {svc.title}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                          {svc.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Contact Details with Icons & Instant Live Validation */}
            <div className="space-y-4 pt-1">
              <label className="block text-xs font-bold text-slate-900 tracking-wide uppercase">
                2. Your Contact Information
              </label>

              {/* Row: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-xs sm:text-[14px] transition-all focus:bg-white focus:outline-none ${
                        touched.name
                          ? isNameValid
                            ? "border-emerald-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
                            : "border-rose-300 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
                          : "border-slate-200 focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      {touched.name && (
                        isNameValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )
                      )}
                    </div>
                  </div>
                  {touched.name && !isNameValid && (
                    <p className="text-[11px] text-rose-600 pl-1 font-medium">
                      Please enter your name (min 2 characters).
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      name="businessName"
                      type="text"
                      placeholder="Company / Business Name (Optional)"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-xs sm:text-[14px] transition-all focus:bg-white focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-xs sm:text-[14px] transition-all focus:bg-white focus:outline-none ${
                        touched.email
                          ? isEmailValid
                            ? "border-emerald-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
                            : "border-rose-300 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
                          : "border-slate-200 focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      {touched.email && (
                        isEmailValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )
                      )}
                    </div>
                  </div>
                  {touched.email && !isEmailValid && (
                    <p className="text-[11px] text-rose-600 pl-1 font-medium">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-xs sm:text-[14px] transition-all focus:bg-white focus:outline-none ${
                        touched.phone
                          ? isPhoneValid
                            ? "border-emerald-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
                            : "border-rose-300 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
                          : "border-slate-200 focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      {touched.phone && (
                        isPhoneValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )
                      )}
                    </div>
                  </div>
                  {touched.phone && !isPhoneValid && (
                    <p className="text-[11px] text-rose-600 pl-1 font-medium">
                      Please enter a valid phone number (min 10 digits).
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Interactive Budget Selector Chips */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-900 tracking-wide uppercase">
                3. Estimated Project Budget <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {budgetOptions.map((opt) => {
                  const isSelected = formData.budget === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, budget: opt.id }))}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-[#0B1220] text-white shadow-xs scale-[1.02]"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Project Requirements / Message with Live Counter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-900 tracking-wide uppercase">
                  4. Project Goals / Details <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    isMessageValid ? "text-emerald-600 font-semibold" : "text-slate-400"
                  }`}
                >
                  {formData.message.trim().length}/10 min chars
                </span>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  rows={3}
                  required
                  placeholder="Share a few lines about your business, current website or ads status, and desired outcomes..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  className={`w-full p-3.5 rounded-xl border bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-xs sm:text-[14px] transition-all focus:bg-white focus:outline-none resize-y ${
                    touched.message
                      ? isMessageValid
                        ? "border-emerald-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
                        : "border-rose-300 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
                      : "border-slate-200 focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15"
                  }`}
                />
              </div>
              {touched.message && !isMessageValid && (
                <p className="text-[11px] text-rose-600 pl-1 font-medium">
                  Please share a few details about your project (min 10 characters).
                </p>
              )}
            </div>

            {/* Submit Action Strip with Modern High-Impact Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md shadow-[#0D8C7D]/20 hover:shadow-lg hover:shadow-[#0D8C7D]/30 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group min-h-[48px]"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Proposal Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Proposal Request</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NDA &amp; 100% Privacy Guaranteed</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
