"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  KeyRound,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
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

  // Check if already authenticated via session API
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

  // Countdown timer for resend OTP
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
        throw new Error(data.error || "Failed to send verification code.");
      }

      setStatus("idle");
      setStep("otp");
      setResendTimer(60);
      setMessage(data.message || `A 6-digit verification code has been sent to ${email.trim()}.`);
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
      // Hard redirect to /admin to ensure fresh cookie is picked up
      window.location.href = "/admin";
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Invalid or expired verification code. Please check and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00B8F0]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header: Logo Only (Medium size, no brand text, no badge) */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Link
              href="/"
              title="Return to Website"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#14233D] border border-[#2B3E5C] flex items-center justify-center p-3 hover:border-[#00B8F0]/60 transition-all shadow-lg hover:scale-105"
            >
              <Image
                src="/assets/amogha-digital-official-logo.webp"
                alt="Logo"
                width={80}
                height={80}
                priority
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F5F7FC] tracking-tight">
            {step === "email" ? "Admin Sign In" : "Enter Verification Code"}
          </h1>
          <p className="mt-2 text-sm text-[#9BAAC2]">
            {step === "email"
              ? "Enter your administrator email to receive a single-use verification code."
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#0F172A]/90 border border-[#1E2C44] rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Error Message Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-start gap-2.5 text-rose-200 text-xs sm:text-[13px]"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {message && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-start gap-2.5 text-emerald-200 text-xs sm:text-[13px]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{message}</span>
            </div>
          )}

          {/* Step 1: Request OTP */}
          {step === "email" ? (
            <form onSubmit={handleSendOtp} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold text-[#CBD5E1] tracking-wide"
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
                    className="w-full px-4 py-3 rounded-xl border border-[#2B3E5C] bg-[#131F33]/90 text-sm text-[#F5F7FC] placeholder:text-[#64748B] focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15 focus:outline-none transition-all pl-10"
                  />
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    <span>Sending Code...</span>
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
            /* Step 2: Verify OTP */
            <form onSubmit={handleVerifyOtp} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-otp"
                  className="block text-xs font-semibold text-[#CBD5E1] tracking-wide"
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
                    className="w-full px-4 py-3 rounded-xl border border-[#2B3E5C] bg-[#131F33]/90 text-center font-mono text-xl tracking-[0.3em] text-[#F5F7FC] placeholder:text-[#64748B] placeholder:tracking-normal focus:border-[#00B8F0] focus:ring-3 focus:ring-[#00B8F0]/15 focus:outline-none transition-all"
                  />
                  <KeyRound className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00B8F0] hover:bg-[#00A3D6] active:bg-[#008BB8] text-[#070D18] font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-xs hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[48px]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Access Admin Dashboard</span>
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
                  className="inline-flex items-center gap-1 text-[#9BAAC2] hover:text-[#F5F7FC] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Email</span>
                </button>

                {resendTimer > 0 ? (
                  <span className="text-[#64748B]">Resend code in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#00B8F0] hover:underline font-semibold cursor-pointer"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#1E2C44] text-center">
            <Link
              href="/"
              className="text-xs text-[#9BAAC2] hover:text-[#00B8F0] transition-colors"
            >
              Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
