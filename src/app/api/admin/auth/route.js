import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase, supabaseAdmin } from "@/lib/supabase";

function getAdminEmail() {
  return (
    process.env.ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "sriworkspace8@gmail.com"
  )
    .trim()
    .toLowerCase();
}

// POST /api/admin/auth - Handles OTP request, verification, and logout
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, token } = body;
    const adminEmail = getAdminEmail();
    const db = supabaseAdmin || supabase;

    if (!db) {
      return NextResponse.json(
        { error: "Database configuration is missing. Please verify your Supabase keys." },
        { status: 500 }
      );
    }

    // ACTION 1: SEND OTP
    if (action === "send-otp") {
      if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Email is required." }, { status: 400 });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // STRICT ADMIN CHECK: Reject any email that is not the authorized admin email
      if (normalizedEmail !== adminEmail) {
        return NextResponse.json(
          {
            error:
              "Access Denied: This email address is not registered as an authorized administrator.",
          },
          { status: 403 }
        );
      }

      // Request OTP from Supabase Auth
      const { error } = await db.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        return NextResponse.json(
          { error: error.message || "Failed to send verification code." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `A 6-digit verification code has been sent to ${normalizedEmail}.`,
      });
    }

    // ACTION 2: VERIFY OTP
    if (action === "verify-otp") {
      if (!email || !token) {
        return NextResponse.json(
          { error: "Email and verification code are required." },
          { status: 400 }
        );
      }

      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail !== adminEmail) {
        return NextResponse.json(
          { error: "Access Denied: Unauthorized administrator email." },
          { status: 403 }
        );
      }

      const { data, error } = await db.auth.verifyOtp({
        email: normalizedEmail,
        token: token.trim(),
        type: "email",
      });

      if (error || !data?.session) {
        return NextResponse.json(
          {
            error:
              error?.message ||
              "Invalid or expired verification code. Please check your email and try again.",
          },
          { status: 401 }
        );
      }

      // Set secure HTTP-only cookie for middleware protection
      const cookieStore = await cookies();
      cookieStore.set("admin_access_token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        session: data.session,
        user: data.user,
      });
    }

    // ACTION 3: LOGOUT
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete("admin_access_token");
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Authentication error occurred" },
      { status: 500 }
    );
  }
}

// GET /api/admin/auth - Check active session
export async function GET(request) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("admin_access_token")?.value ||
    request.headers.get("Authorization")?.replace("Bearer ", "")?.trim();

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const db = supabaseAdmin || supabase;
  if (!db) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }

  try {
    const {
      data: { user },
      error,
    } = await db.auth.getUser(token);

    const adminEmail = getAdminEmail();
    if (error || !user || user.email?.toLowerCase() !== adminEmail) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
