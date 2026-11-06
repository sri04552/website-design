"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";

export function ContactForm({ preselectedService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: preselectedService || "website-design",
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
    { id: "website-design", label: "Website Design & Development" },
    { id: "meta-ads", label: "Meta Ads (Facebook & Instagram)" },
    { id: "google-ads", label: "Google Ads & Search PPC" },
    { id: "ai-automation", label: "AI Automation & WhatsApp Bots" },
    { id: "graphic-design", label: "Brand Identity & Graphic Design" },
    { id: "ai-video", label: "AI Video Creation for Reels & Ads" },
    { id: "full-suite", label: "All-in-One Digital Growth Package" },
    { id: "custom", label: "Custom Project / Consultation" },
  ];

  const budgetOptions = [
    { id: "flexible", label: "Flexible / Open" },
    { id: "under-25k", label: "< ₹25,000" },
    { id: "25k-50k", label: "₹25,000 – ₹50,000" },
    { id: "50k-1lakh", label: "₹50,000 – ₹1,00,000" },
    { id: "above-1lakh", label: "₹1,00,000+" },
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

    // Mark all required as touched
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
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }
    if (!isPhoneValid) {
      setStatus("error");
      setErrorMessage("Please enter a valid phone or WhatsApp number (minimum 10 digits).");
      return;
    }
    if (!isMessageValid) {
      setStatus("error");
      setErrorMessage("Please share a brief note about your requirements (minimum 10 characters).");
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
          service: selectedServiceObj ? selectedServiceObj.label : formData.service,
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

  const selectedServiceObj = servicesList.find((s) => s.id === formData.service);

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hello! I just submitted an inquiry for ${
          selectedServiceObj?.label || "digital services"
        } on your contact page. My name is ${formData.name || "Client"}.`
      )}`
    : null;

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-12 text-center shadow-[0_10px_30px_rgba(13,140,125,0.06)] max-w-2xl mx-auto space-y-6">
        <div className="w-14 h-14 bg-emerald-50 text-[#0D8C7D] border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Inquiry Submitted Successfully
          </h3>
          <p className="text-[16px] sm:text-[15px] text-[#475569] leading-relaxed max-w-md mx-auto">
            Thank you for reaching out. We have logged your request for{" "}
            <span className="font-semibold text-slate-900">{selectedServiceObj?.label}</span>. We are reviewing your project details right now and will reply within minutes.
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
              <span>Need an Instant Reply? Connect on WhatsApp</span>
            </a>
          </div>
        )}

        <div className="pt-3">
          <button
            type="button"
            onClick={resetForm}
            className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
          >
            Submit another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(15,23,42,0.04)] space-y-6"
    >
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

      {/* Error Message */}
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-[13.5px]"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-snug font-medium">{errorMessage}</span>
        </div>
      )}

      {/* 1. Services Selection Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
          Service Needed <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {servicesList.map((svc) => {
            const isSelected = formData.service === svc.id;
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, service: svc.id }))}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#0F172A] text-white shadow-xs ring-1 ring-[#0F172A]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90"
                }`}
              >
                {svc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Contact Fields: Name & Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div className="space-y-1">
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold text-slate-900 uppercase tracking-wider"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
              touched.name && !isNameValid
                ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                : "border-slate-300 bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100"
            }`}
          />
          {touched.name && !isNameValid && (
            <p className="text-[11px] text-rose-600 font-medium">
              Please enter your name (minimum 2 characters).
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="contact-business"
            className="block text-xs font-bold text-slate-900 uppercase tracking-wider"
          >
            Company Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="contact-business"
            name="businessName"
            type="text"
            placeholder="e.g. Acme Enterprises"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Contact Fields: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold text-slate-900 uppercase tracking-wider"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
              touched.email && !isEmailValid
                ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                : "border-slate-300 bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100"
            }`}
          />
          {touched.email && !isEmailValid && (
            <p className="text-[11px] text-rose-600 font-medium">
              Please provide a valid email address.
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="contact-phone"
            className="block text-xs font-bold text-slate-900 uppercase tracking-wider"
          >
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
              touched.phone && !isPhoneValid
                ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                : "border-slate-300 bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100"
            }`}
          />
          {touched.phone && !isPhoneValid && (
            <p className="text-[11px] text-rose-600 font-medium">
              Please enter a valid phone number (minimum 10 digits).
            </p>
          )}
        </div>
      </div>

      {/* 4. Budget Range Selection */}
      <div className="space-y-2 pt-1">
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
          Estimated Budget Range <span className="text-slate-400 font-normal lowercase">(optional)</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => {
            const isSelected = formData.budget === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, budget: opt.id }))}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-sky-50 text-[#0284C7] border border-sky-300 font-semibold"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Requirements Message */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="contact-message"
            className="block text-xs font-bold text-slate-900 uppercase tracking-wider"
          >
            Project Requirements <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {formData.message.trim().length} chars (min 10)
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Briefly describe your business goals, target audience, or current digital challenges..."
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur("message")}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none resize-y ${
            touched.message && !isMessageValid
              ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              : "border-slate-300 bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100"
          }`}
        />
        {touched.message && !isMessageValid && (
          <p className="text-[11px] text-rose-600 font-medium">
            Please share a few details about your project (minimum 10 characters).
          </p>
        )}
      </div>

      {/* Submit Button (Full Width, text: Submit only) */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-base py-3.5 px-6 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[48px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
}
