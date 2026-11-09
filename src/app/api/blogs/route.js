import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function GET(request) {
  const db = supabaseAdmin || supabase;
  if (!db) {
    return NextResponse.json({ posts: [] });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "50", 10);

  let query = db
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, category, author, read_time, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message, posts: [] }, { status: 500 });
  }

  return NextResponse.json({ posts: data || [] });
}
