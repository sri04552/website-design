import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Function to send email notification to the site owner
async function sendNotificationEmail(data) {
  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@example.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_SENDER_EMAIL ||
            "Amogha Digital Leads <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: data.email,
          subject: `New Lead [${data.service}]: ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <div style="border-bottom: 2px solid #00B8F0; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="color: #0F172A; margin: 0; font-size: 20px;">New Project Inquiry Received</h2>
                <p style="color: #64748B; margin: 4px 0 0 0; font-size: 13px;">A new client submitted the project form on your website.</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #475569;">Full Name:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
                  <td style="padding: 8px 0; color: #0284C7;"><a href="mailto:${data.email}" style="color: #0284C7; text-decoration: underline;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone / WhatsApp:</td>
                  <td style="padding: 8px 0; color: #0F172A;">${data.phone ? `<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="color: #0D8C7D; font-weight: bold;">${data.phone}</a>` : 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Service Requested:</td>
                  <td style="padding: 8px 0; color: #0284C7; font-weight: bold;">${data.service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Estimated Budget:</td>
                  <td style="padding: 8px 0; color: #0F172A;">${data.budget || 'Flexible / Discussion'}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #00B8F0; border-radius: 8px;">
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #334155; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Project Requirements / Message:</p>
                <p style="margin: 0; color: #1e293b; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${data.message}</p>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                Submitted at ${data.created_at} via Amogha Digital Website.
              </div>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend API error:", errorText);
      } else {
        console.log("Email notification delivered successfully to:", receiverEmail);
      }
    } catch (emailErr) {
      console.error("Failed to send email notification via Resend:", emailErr);
    }
  } else {
    console.log("Email notification skipped (RESEND_API_KEY not configured in .env.local). Lead logged:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
    });
  }
}

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
      service: service ? service.trim().slice(0, 60) : "General Inquiry",
      budget: budget ? budget.trim().slice(0, 50) : "Flexible / Discussion",
      message: message.trim().slice(0, 2000),
      created_at: new Date().toISOString(),
    };

    // 1. Send email notification (if credentials exist)
    await sendNotificationEmail(cleanedData);

    // 2. If Supabase is configured, store the record
    if (supabase) {
      const { error: dbError } = await supabase
        .from("inquiries")
        .insert([cleanedData]);

      if (dbError) {
        console.error("Supabase insert error:", dbError.message);
      }
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
      { error: "An unexpected error occurred while submitting your message. Please reach out via WhatsApp directly." },
      { status: 500 }
    );
  }
}
