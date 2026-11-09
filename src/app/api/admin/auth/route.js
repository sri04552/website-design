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

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, token, session } = body;
    const adminEmail = getAdminEmail();
    const db = supabaseAdmin || supabase;

    // ACTION 1: SYNC SESSION (Called when user clicks magic link in email)
    if (action === "sync-session") {
      const userEmail = session?.user?.email?.toLowerCase();
      const accessToken = session?.access_token;

      if (!accessToken || userEmail !== adminEmail) {
        return NextResponse.json(
          { error: "Access Denied: Unauthorized admin session." },
          { status: 403 }
        );
      }

      const cookieStore = await cookies();
      cookieStore.set("admin_access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true, message: "Session synced successfully" });
    }

    if (!db) {
      return NextResponse.json(
        { error: "Database configuration is missing. Please verify Supabase keys in Vercel or .env.local." },
        { status: 500 }
      );
    }

    // ACTION 2: SEND OTP
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
              "Access Denied: Only the authorized administrator (sriworkspace8@gmail.com) can access this portal.",
          },
          { status: 403 }
        );
      }

      // Determine redirect URL for magic link fallback
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const emailRedirectTo = `${siteUrl}/admin/login`;

      const { error } = await db.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: true,
          emailRedirectTo,
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
        message: `Verification message sent to ${normalizedEmail}. Check your inbox for the code or login link.`,
      });
    }

    // ACTION 3: VERIFY OTP
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
              "Invalid or expired verification code. Please check your email or click the login link in your email.",
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

    // ACTION 4: LOGOUT
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
