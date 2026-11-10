import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase, supabaseAdmin } from "@/lib/supabase";

function getAdminEmail() {
  return (
    process.env.ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "contact@amoghadigital.com"
  )
    .trim()
    .toLowerCase();
}

async function verifyAdmin(request) {
  const cookieStore = await cookies();
  const token =
    request.headers.get("Authorization")?.replace("Bearer ", "")?.trim() ||
    cookieStore.get("admin_access_token")?.value;

  if (!token) return null;

  const db = supabaseAdmin || supabase;
  if (!db) return null;

  try {
    const {
      data: { user },
      error,
    } = await db.auth.getUser(token);

    const adminEmail = getAdminEmail();
    if (error || !user || user.email?.toLowerCase() !== adminEmail) {
      return null;
    }
    return user;
  } catch (err) {
    return null;
  }
}

export async function POST(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const db = supabaseAdmin || supabase;
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const originalName = file.name || "image.png";
    const extension = originalName.split(".").pop().toLowerCase();
    const safeName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

    // Upload to Supabase Storage 'blog-images' bucket
    const { data, error } = await db.storage
      .from("blog-images")
      .upload(safeName, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message ||
            "Failed to upload image. Please make sure a public storage bucket named 'blog-images' is created in Supabase.",
        },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = db.storage
      .from("blog-images")
      .getPublicUrl(safeName);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: data.path,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to process image upload" },
      { status: 500 }
    );
  }
}
