"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Loader2,
} from "lucide-react";

export function ContactForm({ preselectedService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: preselectedService || "website-design",
    budget: "under-25k",
    message: "",
    honeypot: "", // hidden spam trap
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic client validation
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please share a few details about your project (min 10 characters).");
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
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setStatus("success");
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        service: "website-design",
        budget: "under-25k",
        message: "",
        honeypot: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to send message. Please reach out directly via WhatsApp."
      );
    }
  };

  const whatsappHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hi! I just sent a project inquiry for ${formData.service || "digital services"} on your website.`
      )}`
    : null;

  if (status === "success") {
    return (
      <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Inquiry Received Successfully!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. We review all inquiries carefully and will get back to you within 24 hours.
        </p>

        {whatsappHref && (
          <div className="pt-3">
            <Button
              href={whatsappHref}
              variant="whatsapp"
              size="md"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Need an instant reply? Chat on WhatsApp</span>
            </Button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs text-slate-500 hover:text-slate-700 underline block mx-auto pt-2"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5"
      noValidate
    >
      {/* Error alert */}
      {status === "error" && (
        <div
          role="alert"
          className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-lg flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot field (hidden from screen reader and human eye) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="form-honeypot">Leave this empty</label>
        <input
          id="form-honeypot"
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh V."
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
          />
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="contact-business"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Business / Shop Name
          </label>
          <input
            id="contact-business"
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Sri Balaji Enterprises"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ramesh@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
          />
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Phone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service */}
        <div>
          <label
            htmlFor="contact-service"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Service Interested In
          </label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
          >
            {siteConfig.services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            <option value="bundle">Full Digital Growth Bundle</option>
            <option value="consultation">General Consultation</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label
            htmlFor="contact-budget"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Estimated Budget
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
          >
            <option value="under-15k">₹10,000 to ₹20,000 (Starter project)</option>
            <option value="20k-40k">₹20,000 to ₹40,000 (Standard business scope)</option>
            <option value="40k-80k">₹40,000 to ₹80,000 (Multi-service / custom)</option>
            <option value="80k-plus">₹80,000+ (Full scale growth)</option>
            <option value="flexible">Flexible / Need guidance</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Project Details & Goals <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe what your business does and what you're hoping to achieve..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all resize-y"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
          className="w-full justify-center"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Project Inquiry</span>
            </>
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-slate-500">
        We respect your privacy. No spam, sales pressure, or sharing of contact details.
      </p>
    </form>
  );
}
