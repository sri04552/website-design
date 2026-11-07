"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

export function ContactForm({ preselectedService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService || "website-design",
    budget: "Flexible / Discussion",
    message: "",
    honeypot: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const servicesList = [
    { id: "website-design", label: "Website Design & Development" },
    { id: "meta-ads", label: "Meta Ads (Facebook & Instagram)" },
    { id: "google-ads", label: "Google Ads Management" },
    { id: "ai-automation", label: "AI & WhatsApp Lead Automation" },
    { id: "graphic-design", label: "Brand Identity & Graphic Design" },
    { id: "ai-video", label: "AI Commercial Video Creation" },
    { id: "full-suite", label: "All-in-One Digital Growth Package" },
    { id: "custom", label: "Custom Project / Consultation" },
  ];

  // Validation rules
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
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

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!isNameValid) {
      setStatus("error");
      setErrorMessage("Please enter your name (minimum 2 characters).");
      return;
    }
    if (!isEmailValid) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!isMessageValid) {
      setStatus("error");
      setErrorMessage("Please share a brief note about your project (minimum 10 characters).");
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
        err.message || "An unexpected error occurred. Please reach out directly via WhatsApp."
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "website-design",
      budget: "Flexible / Discussion",
      message: "",
      honeypot: "",
    });
    setTouched({
      name: false,
      email: false,
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
      <div className="bg-white rounded-2xl border border-emerald-200/80 p-8 sm:p-10 text-center shadow-[0_10px_30px_rgba(13,140,125,0.06)] space-y-5">
        <div className="w-14 h-14 bg-emerald-50 text-[#0D8C7D] border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-bold text-[#0F172A] tracking-tight">
            Inquiry Received
          </h3>
          <p className="text-[15px] text-[#475569] leading-relaxed max-w-md mx-auto">
            Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. We
            have logged your request for{" "}
            <span className="font-semibold text-slate-900">{selectedServiceObj?.label}</span>. Our
            technical team will evaluate your scope and reply shortly.
          </p>
        </div>

        {whatsappHref && (
          <div className="pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-semibold text-sm transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Continue on WhatsApp</span>
            </a>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
      {/* Form Header */}
      <div className="mb-6">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
          Send a Message
        </h3>
        <p className="mt-1 text-sm text-[#64748B]">
          Tell us about your project and we’ll review technical feasibility within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
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

        {/* Error Alert */}
        {status === "error" && errorMessage && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs sm:text-[13px]"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="block text-xs font-semibold text-slate-700 tracking-wide"
            >
              Your Name <span className="text-rose-500">*</span>
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
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
                touched.name && !isNameValid
                  ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-3 focus:ring-rose-100"
                  : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/10"
              }`}
            />
            {touched.name && !isNameValid && (
              <p className="text-[11px] text-rose-600 font-medium">
                Please enter your name (minimum 2 characters).
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="block text-xs font-semibold text-slate-700 tracking-wide"
            >
              Email Address <span className="text-rose-500">*</span>
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
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
                touched.email && !isEmailValid
                  ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-3 focus:ring-rose-100"
                  : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/10"
              }`}
            />
            {touched.email && !isEmailValid && (
              <p className="text-[11px] text-rose-600 font-medium">
                Please provide a valid email address.
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone / WhatsApp & Service Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-phone"
              className="block text-xs font-semibold text-slate-700 tracking-wide"
            >
              Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/10 focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-service"
              className="block text-xs font-semibold text-slate-700 tracking-wide"
            >
              Service Needed
            </label>
            <div className="relative">
              <select
                id="contact-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-900 transition-all focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/10 focus:outline-none cursor-pointer pr-10"
              >
                {servicesList.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 3: Message / Scope */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold text-slate-700 tracking-wide"
          >
            Project Details <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            placeholder="Tell us about your project, current bottlenecks, or goals..."
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur("message")}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none resize-y ${
              touched.message && !isMessageValid
                ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-3 focus:ring-rose-100"
                : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/10"
            }`}
          />
          {touched.message && !isMessageValid && (
            <p className="text-[11px] text-rose-600 font-medium">
              Please share a few details about your project (minimum 10 characters).
            </p>
          )}
        </div>

        {/* Submit Button (Full Width) */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-xs hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[48px]"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
