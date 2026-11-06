"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PhoneCall,
  MessageSquare,
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

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const servicesList = [
    { value: "website-design", label: "Website Design & Development" },
    { value: "meta-ads", label: "Meta Ads Management (Facebook & Instagram)" },
    { value: "google-ads", label: "Google Ads & Search PPC" },
    { value: "ai-automation", label: "AI Automation & WhatsApp Chatbots" },
    { value: "graphic-design", label: "Brand Identity & Graphic Design" },
    { value: "ai-video", label: "AI Video Creation for Reels & Ads" },
    { value: "full-suite", label: "All-in-One Digital Growth Package" },
    { value: "custom", label: "Custom Digital Project / Consultation" },
  ];

  const budgetOptions = [
    { value: "flexible", label: "Flexible / Open to Recommendation" },
    { value: "under-25k", label: "Under ₹25,000" },
    { value: "25k-50k", label: "₹25,000 – ₹50,000" },
    { value: "50k-1lakh", label: "₹50,000 – ₹1,00,000" },
    { value: "above-1lakh", label: "₹1,00,000+" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your phone or WhatsApp number.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage(
        "Please provide brief details about your project or requirements (minimum 10 characters)."
      );
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project inquiry.");
      }

      setStatus("success");
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
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message ||
          "An unexpected error occurred. Please contact us directly via WhatsApp."
      );
    }
  };

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hello! I would like to inquire about ${
          servicesList.find((s) => s.value === formData.service)?.label || "digital services"
        } for my business.`
      )}`
    : null;

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200/90 p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(13,140,125,0.08)] max-w-2xl mx-auto space-y-5">
        <div className="w-14 h-14 bg-emerald-50 text-[#0D8C7D] border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Inquiry Submitted Successfully!
          </h3>
          <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed max-w-md mx-auto">
            Thank you for sharing your project details. We have received your request and will review your requirements and respond within 24 hours.
          </p>
        </div>

        {whatsappHref && (
          <div className="pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-semibold text-sm transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Need an Instant Response? Chat on WhatsApp</span>
            </a>
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
          >
            Submit another project inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.04)] space-y-6"
    >
      {/* Spam honeypot trap */}
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

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="service-form-name"
            className="block text-xs font-semibold text-slate-900 tracking-wide"
          >
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="service-form-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="service-form-business"
            className="block text-xs font-semibold text-slate-900 tracking-wide"
          >
            Business / Company Name <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="service-form-business"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Apex Enterprises"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Row 2: Email & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="service-form-email"
            className="block text-xs font-semibold text-slate-900 tracking-wide"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="service-form-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. ramesh@example.com"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="service-form-phone"
            className="block text-xs font-semibold text-slate-900 tracking-wide"
          >
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            id="service-form-phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Row 3: Services Option Dropdown & Budget Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="service-form-service"
            className="block text-xs font-semibold text-slate-900 tracking-wide"
          >
            Select Required Service <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="service-form-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              {servicesList.map((svc) => (
                <option key={svc.value} value={svc.value}>
                  {svc.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="service-form-budget"
            className="block text-xs font-semibold text-slate-900 tracking-wide"
          >
            Estimated Budget Range <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <select
              id="service-form-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Message / Requirements */}
      <div className="space-y-1.5">
        <label
          htmlFor="service-form-message"
          className="block text-xs font-semibold text-slate-900 tracking-wide"
        >
          Project Details / Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="service-form-message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your business goals, current website status, or desired outcomes..."
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#00B8F0] focus:ring-2 focus:ring-[#00B8F0]/20 focus:outline-none transition-all resize-y"
        />
      </div>

      {/* Submit Button & Direct WhatsApp Link */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[48px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Project Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="text-center sm:text-right">
          <p className="text-xs text-slate-500">
            Prefer direct messaging?{" "}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0D8C7D] font-semibold hover:underline"
              >
                Chat on WhatsApp
              </a>
            ) : (
              <span className="font-semibold text-slate-700">{siteConfig.contact.phone}</span>
            )}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            100% Privacy. Zero spam. We reply within 24 hours.
          </p>
        </div>
      </div>
    </form>
  );
}
