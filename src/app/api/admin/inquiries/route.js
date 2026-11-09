import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

async function verifyAdmin(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.replace("Bearer ", "").trim();
  const db = supabaseAdmin || supabase;
  if (!db) return null;

  try {
    const {
      data: { user },
      error,
    } = await db.auth.getUser(token);
    if (error || !user) return null;
    return user;
  } catch (err) {
    return null;
  }
}

// GET /api/admin/inquiries - List all submitted leads
export async function GET(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const db = supabaseAdmin || supabase;
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await db
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inquiries: data || [] });
}

// DELETE /api/admin/inquiries - Delete an inquiry by ID
export async function DELETE(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
  }

  const db = supabaseAdmin || supabase;
  const { error } = await db.from("inquiries").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Inquiry deleted" });
}
