import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, message, honeypot } = body;

    // Honeypot check: Bots usually fill hidden fields
    if (honeypot) {
      // Silently return success to mislead the bot
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief message describing your project (minimum 10 characters)." },
        { status: 400 }
      );
    }

    const cleanedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      phone: phone ? phone.trim().slice(0, 30) : null,
      service: service ? service.trim().slice(0, 50) : "general",
      budget: budget ? budget.trim().slice(0, 50) : "unspecified",
      message: message.trim().slice(0, 2000),
      created_at: new Date().toISOString(),
    };

    // If Supabase is configured, store the record
    if (supabase) {
      const { error: dbError } = await supabase
        .from("inquiries")
        .insert([cleanedData]);

      if (dbError) {
        console.error("Supabase insert error:", dbError.message);
        // Still return success to user with fallback notice if table not yet migrated
      }
    } else {
      // In local development or before Supabase keys are placed in .env.local
      console.log("Contact form submission received (Supabase not configured):", {
        name: cleanedData.name,
        email: cleanedData.email,
        service: cleanedData.service,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We have received your inquiry and will respond within 24 hours.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your message. Please try WhatsApp directly." },
      { status: 500 }
    );
  }
}
