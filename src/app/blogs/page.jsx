import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "Blogs & Insights | Amogha Digital",
  description:
    "Explore actionable guides, architectural case studies, and digital growth strategies covering Next.js web engineering, Meta Ads, Google Search PPC, and AI automation.",
  alternates: {
    canonical: "/blogs",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getPublishedPosts() {
  const db = supabaseAdmin || supabase;
  if (!db) return [];

  try {
    const { data, error } = await db
      .from("posts")
      .select("id, title, slug, excerpt, cover_image, category, author, read_time, published_at, created_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching published posts:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("Failed to load posts:", err);
    return [];
  }
}

export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params?.category || "All";
  const allPosts = await getPublishedPosts();

  const categories = [
    "All",
    "Website Design",
    "Meta Ads",
    "Google Ads",
    "AI Automation",
    "Growth Strategy",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Section (Preserved Dark Theme) */}
      <section className="relative bg-[#070D18] text-[#F5F7FC] pt-[123px] pb-[48px] border-b border-[#1E2C44] overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#00B8F0]/10 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Blogs", href: "/blogs" }]} />

          <div className="mt-8 max-w-3xl space-y-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#29374D] bg-[#14233D]/70 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#00B8F0]" />
              <span className="text-[12px] font-medium tracking-wider text-[#00B8F0] uppercase font-mono">
                INSIGHTS &amp; ENGINEERING GUIDES
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight text-[#F5F7FC] leading-[1.14]">
              Digital Growth, Architecture &amp;{" "}
              <span className="text-[#00B8F0] font-extrabold">Execution Guides.</span>
            </h1>

            <p className="text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal">
              Practical guides on web performance engineering, targeted customer acquisition via paid
              advertising, and 24/7 automated business workflows.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2 pt-2 border-t border-[#1E2C44]/70">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/blogs" : `/blogs?category=${encodeURIComponent(cat)}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[#00B8F0] text-[#070D18] shadow-xs"
                      : "bg-[#131F33] text-[#9BAAC2] hover:text-white border border-[#2B3E5C] hover:border-[#00B8F0]/50"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid Section (Light Theme) */}
      <section className="py-[48px] bg-[#F8FAFC]">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 sm:p-16 text-center max-w-xl mx-auto space-y-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
              <div className="w-14 h-14 rounded-full bg-slate-50 text-[#0284C7] border border-slate-200 flex items-center justify-center mx-auto">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="font-heading text-xl font-bold text-[#0F172A]">
                {activeCategory !== "All"
                  ? `No articles published under "${activeCategory}" yet`
                  : "New Articles Coming Soon"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our team is currently preparing in-depth guides on high-speed web architecture, Meta
                Ads scaling, and AI WhatsApp automation.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Have a Question? Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {filteredPosts.map((post) => {
                const dateFormatted = post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null;

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all group"
                  >
                    <div>
                      {/* Cover Image Thumbnail */}
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="relative aspect-[16/10] block w-full bg-slate-100 overflow-hidden"
                      >
                        {post.cover_image ? (
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-103 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                            <BookOpen className="w-10 h-10 opacity-40" />
                          </div>
                        )}

                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0284C7] border border-slate-200/80 shadow-xs backdrop-blur-md font-mono">
                            {post.category || "General"}
                          </span>
                        </div>
                      </Link>

                      {/* Content Info */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          {dateFormatted && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                              <span>{dateFormatted}</span>
                            </div>
                          )}
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{post.read_time || "4 min read"}</span>
                          </div>
                        </div>

                        <h2 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A] leading-snug group-hover:text-[#0284C7] transition-colors line-clamp-2">
                          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {post.excerpt && (
                          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Read CTA */}
                    <div className="px-5 sm:px-6 pb-5 pt-0">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0284C7] group-hover:text-[#0369A1] transition-colors"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
