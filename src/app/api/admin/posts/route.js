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

function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

// GET /api/admin/posts - List all posts for admin (drafts + published)
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
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data || [] });
}

// POST /api/admin/posts - Create a new blog post
export async function POST(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, cover_image, category, author, published } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Post title is required" }, { status: 400 });
    }
    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Post content is required" }, { status: 400 });
    }

    const finalSlug = slug && slug.trim() ? generateSlug(slug) : generateSlug(title);
    const readTime = calculateReadTime(content);
    const now = new Date().toISOString();

    const newPost = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt ? excerpt.trim() : null,
      content: content.trim(),
      cover_image: cover_image ? cover_image.trim() : null,
      category: category ? category.trim() : "General",
      author: author ? author.trim() : "Amogha Digital",
      read_time: readTime,
      published: Boolean(published),
      published_at: published ? now : null,
      created_at: now,
      updated_at: now,
    };

    const db = supabaseAdmin || supabase;
    const { data, error } = await db.from("posts").insert([newPost]).select().single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A blog post with this URL slug already exists. Please choose a unique title or slug." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to create post" }, { status: 500 });
  }
}

// PUT /api/admin/posts - Update an existing blog post
export async function PUT(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, slug, excerpt, content, cover_image, category, author, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Post title is required" }, { status: 400 });
    }
    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Post content is required" }, { status: 400 });
    }

    const finalSlug = slug && slug.trim() ? generateSlug(slug) : generateSlug(title);
    const readTime = calculateReadTime(content);
    const now = new Date().toISOString();

    const updatePayload = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt ? excerpt.trim() : null,
      content: content.trim(),
      cover_image: cover_image ? cover_image.trim() : null,
      category: category ? category.trim() : "General",
      author: author ? author.trim() : "Amogha Digital",
      read_time: readTime,
      published: Boolean(published),
      updated_at: now,
    };

    const db = supabaseAdmin || supabase;
    const { data, error } = await db
      .from("posts")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/admin/posts - Delete a blog post by ID
export async function DELETE(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const db = supabaseAdmin || supabase;
  const { error } = await db.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Post deleted" });
}
