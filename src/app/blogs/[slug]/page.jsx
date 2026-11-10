import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import {
  Calendar,
  ArrowLeft,
  Share2,
  MessageSquare,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

const sampleFallbackPost = {
  id: "sample-nextjs-architecture",
  title: "Why High-Speed Next.js Websites Outrank Traditional Templates in 2026",
  slug: "why-high-speed-nextjs-websites-outrank-traditional-templates",
  excerpt:
    "Discover why modern businesses are moving away from bloated, slow-loading templates toward custom Next.js architectures that achieve sub-second load times and dominate Google search results.",
  category: "Website Design",
  author: "Amogha Digital",
  cover_image: "/assets/custom-website-design-development-amogha-digital.webp",
  read_time: "4 min read",
  published_at: "2026-11-09T12:00:00.000Z",
  created_at: "2026-11-09T12:00:00.000Z",
  content: `In today's fast-moving digital landscape, your website is often the very first touchpoint between a prospective client and your business. Yet, over 70% of business websites in regional markets continue to suffer from sluggish loading speeds, bloated third-party plugins, and poor mobile responsiveness.

Google's Core Web Vitals algorithms now actively penalize slow websites by demoting them in search results. When a prospective customer in Eluru or pan-India searches for your services, even a two-second delay in page loading can increase bounce rates by over 50%.

## The Hidden Cost of Bloated Templates

Traditional website builders and generic templates often load dozens of unnecessary CSS frameworks, unoptimized JavaScript bundles, and intrusive tracking scripts.

- Slow Mobile Loading: Generic templates often take 4 to 6 seconds to become interactive on 4G and 5G mobile networks.
- Security Vulnerabilities: Outdated plugins and complex database hooks create constant attack surfaces for spammers and malicious actors.
- Lower Search Rankings: Google prioritizes websites that achieve perfect Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) scores.

> A fast website is not a luxury. It is the foundation of high-converting digital advertising, qualified customer acquisition, and search engine authority.

## Why Next.js and Modern Architecture Win

At Amogha Digital, we engineer web platforms using Next.js, React, and Tailwind CSS. This modern stack provides distinct advantages:

### 1. Instant Sub-Second Page Loads
By generating static HTML at build time and hydrating only what is necessary, pages load almost instantaneously on both mobile devices and desktop screens.

### 2. Built-In Image and Asset Optimization
Images are automatically served in modern WebP formats, resized dynamically for the visitor's screen resolution, and cached at edge nodes worldwide.

### 3. Maximum Conversion Rates for Paid Advertising
When you run Meta Ads or Google Search campaigns, sending paid clicks to a lightning-fast landing page dramatically reduces cost per acquisition and increases WhatsApp enquiry submissions.

## Getting Started

If your current website is slow, difficult to update, or failing to generate qualified phone calls and messages, it is time for a modern architectural upgrade. Contact our team today for a transparent, zero-sales-pressure technical audit of your existing web presence.`,
};

async function getPostBySlug(slug) {
  const db = supabaseAdmin || supabase;
  if (!db) {
    return slug === sampleFallbackPost.slug ? sampleFallbackPost : null;
  }

  try {
    const { data, error } = await db
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return slug === sampleFallbackPost.slug ? sampleFallbackPost : null;
    }
    return data;
  } catch (err) {
    return slug === sampleFallbackPost.slug ? sampleFallbackPost : null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Amogha Digital",
    };
  }

  const siteUrl = siteConfig.url || "https://example.com";
  const postUrl = `${siteUrl}/blogs/${post.slug}`;
  const ogImage = post.cover_image || `${siteUrl}/assets/amogha-digital-official-logo.webp`;

  return {
    title: `${post.title} | Amogha Digital`,
    description: post.excerpt || "Read this article on Amogha Digital.",
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author || "Amogha Digital"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

// Simple Markdown / Formatted text parser
function renderArticleContent(rawContent) {
  if (!rawContent) return null;

  const lines = rawContent.split("\n");
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-4 space-y-2 list-disc list-inside text-slate-700">
          {currentList.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${index}`}
          className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A] mt-8 mb-3"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${index}`}
          className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-10 mb-4 border-b border-slate-200 pb-2.5"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="my-6 border-l-4 border-[#0284C7] pl-4 py-2 text-slate-700 italic bg-slate-50 border-y border-r border-slate-200/80 rounded-r-xl"
        >
          {trimmed.slice(2)}
        </blockquote>
      );
    } else if (trimmed.startsWith("![") && trimmed.includes("](") && trimmed.endsWith(")")) {
      const altMatch = trimmed.match(/!\[(.*?)\]/);
      const urlMatch = trimmed.match(/\((.*?)\)/);
      if (urlMatch) {
        elements.push(
          <div key={`img-${index}`} className="my-8 relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <Image
              src={urlMatch[1]}
              alt={altMatch ? altMatch[1] : "Blog illustration"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        );
      }
    } else {
      elements.push(
        <p key={`p-${index}`} className="my-4 text-[16px] sm:text-[15.5px] text-slate-700 leading-[1.85] font-normal">
          {trimmed}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = siteConfig.url || "https://example.com";
  const currentUrl = `${siteUrl}/blogs/${post.slug}`;

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  // JSON-LD Structured Data for Google rich results
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? [post.cover_image] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Organization",
      name: post.author || siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/amogha-digital-official-logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
  };

  const shareText = encodeURIComponent(`${post.title} - Read on Amogha Digital`);
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <article className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero / Header Section (Preserved Dark Theme) */}
      <header className="relative bg-[#070D18] text-[#F5F7FC] pt-[123px] pb-[40px] border-b border-[#1E2C44]">
        <Container className="max-w-4xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider bg-[#14233D] text-[#00B8F0] border border-[#2B3E5C] font-mono">
                {post.category || "General"}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#F5F7FC] tracking-tight leading-[1.18]">
              {post.title}
            </h1>

            {/* Author & Meta Line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#9BAAC2] pt-2 border-t border-[#1E2C44]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#14233D] border border-[#2B3E5C] flex items-center justify-center text-[10px] text-[#00B8F0] font-bold">
                  AD
                </div>
                <span className="font-medium text-[#F5F7FC]">{post.author || "Amogha Digital"}</span>
              </div>

              {publishedDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00B8F0]" />
                  <span>{publishedDate}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Body (Light Theme) */}
      <section className="py-[48px] bg-[#F8FAFC] text-[#0F172A]">
        <Container className="max-w-4xl">
          {/* Featured Cover Image */}
          {post.cover_image && (
            <div className="mb-10 relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Lead Excerpt */}
          {post.excerpt && (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-[#0284C7] border border-slate-200/90 text-slate-700 text-base sm:text-lg leading-relaxed font-medium shadow-xs">
              {post.excerpt}
            </div>
          )}

          {/* Formatted Article Content */}
          <div className="article-content">{renderArticleContent(post.content)}</div>

          {/* Share & Consultation Row */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Share:</span>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-[#0D8C7D] text-[#0D8C7D] hover:text-white border border-emerald-200/60 flex items-center justify-center transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Twitter / X"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bottom Consultation Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A]">
                Need help engineering your digital platform?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
                Speak directly with our senior developers and advertising directors to plan your next
                custom build with zero sales pressure.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] active:bg-[#085E54] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-xs shrink-0"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
