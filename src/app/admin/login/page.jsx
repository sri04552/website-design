"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  KeyRound,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // 'email' | 'otp'
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // 1. Check if already authenticated via session API
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated) {
          router.replace("/admin");
        }
      })
      .catch(() => {});
  }, [router]);

  // 2. Listen for Magic Link clicks from email (URL hash token or Supabase auth event)
  useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setStatus("loading");
        try {
          const res = await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "sync-session",
              session,
            }),
          });
          if (res.ok) {
            window.location.href = "/admin";
          }
        } catch (e) {
          console.error("Session sync error:", e);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification email.");
      }

      setStatus("idle");
      setStep("otp");
      setResendTimer(60);
      setMessage(
        data.message ||
          `Verification code and login link have been sent to ${email.trim()}.`
      );
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to send verification code. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length < 6) {
      setErrorMessage("Please enter the 6-digit code sent to your email.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          email: email.trim().toLowerCase(),
          token: cleanOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code.");
      }

      setStatus("success");
      // Hard reload to /admin to ensure fresh cookie is registered
      window.location.href = "/admin";
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message ||
          "Invalid or expired verification code. If your email has a login link, clicking it will also sign you in."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-12 select-none text-[#0F172A]">
      <div className="w-full max-w-md">
        {/* Brand Header: Logo Only (No box behind it, enlarged size) */}
        <div className="text-center mb-7">
          <div className="flex justify-center mb-5">
            <Link
              href="/"
              title="Return to Website"
              className="inline-block transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/assets/amogha-digital-ribbon-logo.webp"
                alt="Amogha Digital Logo"
                width={120}
                height={120}
                priority
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto"
              />
            </Link>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            {step === "email" ? "Admin Sign In" : "Verify Authentication"}
          </h1>
          <p className="mt-2 text-sm text-[#475569] leading-relaxed">
            {step === "email"
              ? "Enter your administrator email to receive your single-use login code or direct magic link."
              : `A verification message was sent to ${email}`}
          </p>
        </div>

        {/* Card Container (Light Theme) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          {/* Error Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs sm:text-[13px]"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {message && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-900 text-xs sm:text-[13px]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">{message}</span>
            </div>
          )}

          {/* Step 1: Request Email OTP */}
          {step === "email" ? (
            <form onSubmit={handleSendOtp} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold text-slate-700 tracking-wide"
                >
                  Administrator Email Address
                </label>
                <div className="relative">
                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoFocus
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:ring-4 focus:ring-[#00B8F0]/10 focus:outline-none transition-all pl-10"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-xs hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[48px]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Login Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Step 2: Enter OTP or Click Link */
            <form onSubmit={handleVerifyOtp} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-otp"
                  className="block text-xs font-semibold text-slate-700 tracking-wide"
                >
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    autoFocus
                    maxLength={8}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\s+/g, ""))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-center font-mono text-xl tracking-[0.3em] text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal focus:border-[#00B8F0] focus:ring-4 focus:ring-[#00B8F0]/10 focus:outline-none transition-all"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Dual-Option Guidance Note */}
              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl text-xs text-sky-900 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <span>Two Ways to Sign In:</span>
                </p>
                <p className="text-[11.5px] leading-relaxed text-sky-800">
                  1. Enter the 6-digit code above and click the button below, <strong>OR</strong>
                  <br />
                  2. Simply click the <strong>Log In link</strong> inside the email you received to enter automatically.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-xs hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[48px]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setErrorMessage("");
                  }}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Email</span>
                </button>

                {resendTimer > 0 ? (
                  <span className="text-slate-400">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#0D8C7D] hover:underline font-semibold cursor-pointer"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#0D8C7D] transition-colors"
            >
              Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
