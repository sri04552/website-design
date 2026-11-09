"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Inbox,
  FileText,
  Plus,
  LogOut,
  ExternalLink,
  Trash2,
  Edit3,
  Search,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  Upload,
  X,
  Loader2,
  Lock,
  Unlock,
  ImageIcon,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inquiries"); // 'inquiries' | 'blogs'

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiriesSearch, setInquiriesSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Blog Posts State
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsSearch, setPostsSearch] = useState("");

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState("create"); // 'create' | 'edit'
  const [editorLoading, setEditorLoading] = useState(false);
  const [editorError, setEditorError] = useState("");
  const [editorTab, setEditorTab] = useState("write"); // 'write' | 'preview'
  const [isSlugLocked, setIsSlugLocked] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [postForm, setPostForm] = useState({
    id: null,
    title: "",
    slug: "",
    category: "Website Design",
    author: "Amogha Digital",
    cover_image: "",
    excerpt: "",
    content: "",
    published: true,
  });

  const categories = [
    "Website Design",
    "Meta Ads",
    "Google Ads",
    "AI Automation",
    "Graphic Design",
    "Growth Strategy",
    "Tech & Engineering",
  ];

  // Helper to slugify
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Auth Protection Check
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const authRes = await fetch("/api/admin/auth");
        const authData = await authRes.json();

        if (!authData?.authenticated) {
          if (isMounted) {
            setSession(null);
            window.location.href = "/admin/login";
          }
          return;
        }

        if (supabase) {
          const {
            data: { session: clientSession },
          } = await supabase.auth.getSession();

          if (isMounted) {
            setSession(clientSession || { access_token: "cookie", user: authData.user });
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setSession({ access_token: "cookie", user: authData.user });
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          window.location.href = "/admin/login";
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Inquiries
  const fetchInquiries = useCallback(async () => {
    if (!session?.access_token) return;
    setInquiriesLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error("Failed to fetch inquiries:", e);
    } finally {
      setInquiriesLoading(false);
    }
  }, [session]);

  // Fetch Blog Posts
  const fetchPosts = useCallback(async () => {
    if (!session?.access_token) return;
    setPostsLoading(true);
    try {
      const res = await fetch("/api/admin/posts", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      }
    } catch (e) {
      console.error("Failed to fetch posts:", e);
    } finally {
      setPostsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchInquiries();
      fetchPosts();
    }
  }, [session, fetchInquiries, fetchPosts]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      if (supabase) {
        await supabase.auth.signOut();
      }
    } finally {
      window.location.href = "/admin/login";
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!confirm("Are you sure you want to delete this lead inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (e) {
      alert("Failed to delete inquiry.");
    }
  };

  // Delete Post
  const handleDeletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      alert("Failed to delete post.");
    }
  };

  // Open Editor for New Post
  const handleOpenCreateModal = () => {
    setEditorMode("create");
    setEditorError("");
    setEditorTab("write");
    setIsSlugLocked(true);
    setPostForm({
      id: null,
      title: "",
      slug: "",
      category: "Website Design",
      author: "Amogha Digital",
      cover_image: "",
      excerpt: "",
      content: "",
      published: true,
    });
    setIsEditorOpen(true);
  };

  // Open Editor for Existing Post
  const handleOpenEditModal = (post) => {
    setEditorMode("edit");
    setEditorError("");
    setEditorTab("write");
    setIsSlugLocked(true);
    setPostForm({
      id: post.id,
      title: post.title || "",
      slug: post.slug || "",
      category: post.category || "Website Design",
      author: post.author || "Amogha Digital",
      cover_image: post.cover_image || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      published: Boolean(post.published),
    });
    setIsEditorOpen(true);
  };

  // Handle Cover Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setEditorError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setPostForm((prev) => ({ ...prev, cover_image: data.url }));
    } catch (err) {
      setEditorError(err.message || "Image upload failed. You can paste an image URL directly instead.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Quick insertion helpers in content
  const insertContentMarkup = (prefix, suffix = "") => {
    setPostForm((prev) => ({
      ...prev,
      content: prev.content + `\n\n${prefix}${suffix}`,
    }));
  };

  // Save Post (Create / Update)
  const handleSavePost = async (e) => {
    e.preventDefault();
    setEditorError("");

    if (!postForm.title.trim()) {
      setEditorError("Please enter a post title.");
      return;
    }
    if (!postForm.content.trim()) {
      setEditorError("Please write content for this blog post.");
      return;
    }

    setEditorLoading(true);

    try {
      const endpoint = "/api/admin/posts";
      const method = editorMode === "create" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(postForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      setIsEditorOpen(false);
      fetchPosts();
    } catch (err) {
      setEditorError(err.message || "Failed to save post");
    } finally {
      setEditorLoading(false);
    }
  };

  // Filtered lists
  const filteredInquiries = inquiries.filter((inq) => {
    const q = inquiriesSearch.toLowerCase();
    return (
      inq.name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.service?.toLowerCase().includes(q) ||
      inq.message?.toLowerCase().includes(q)
    );
  });

  const filteredPosts = posts.filter((p) => {
    const q = postsSearch.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q)
    );
  });

  // Strict Protection Gatekeeper: NEVER render dashboard if not authenticated
  if (loading || !session?.user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-[#0F172A]">
        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
          <Loader2 className="w-6 h-6 text-[#0D8C7D] animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Verifying security authorization...
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Redirecting to authentication login...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Top Header Bar (Dark Architectural Hero Nav) */}
      <header className="border-b border-[#1E2C44] bg-[#0A101D] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#14233D] border border-[#2B3E5C] flex items-center justify-center p-1.5 group-hover:border-[#00B8F0]/60 transition-colors">
                <Image
                  src="/assets/amogha-digital-official-logo.webp"
                  alt="Amogha Digital"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-base sm:text-lg text-[#F5F7FC] tracking-tight">
                Amogha<span className="text-[#00B8F0]">Digital</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-[#2B3E5C]">|</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#131F33] text-[#00B8F0] border border-[#2B3E5C]">
              Admin Control Center
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#9BAAC2] hover:text-[#00B8F0] px-3 py-1.5 rounded-lg border border-[#2B3E5C] hover:border-[#00B8F0]/50 transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <span className="text-xs text-[#9BAAC2] hidden md:inline-block max-w-[180px] truncate font-mono">
              {session?.user?.email}
            </span>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 px-3 py-1.5 rounded-lg border border-rose-800/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area (Light Theme) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300/80 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Inbox className="w-4 h-4 text-[#0D8C7D]" />
              <span>Customer Inquiries</span>
              <span
                className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  activeTab === "inquiries"
                    ? "bg-[#0D8C7D]/10 text-[#0D8C7D] font-bold"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4 text-[#0284C7]" />
              <span>Blog Articles</span>
              <span
                className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  activeTab === "blogs"
                    ? "bg-[#0284C7]/10 text-[#0284C7] font-bold"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {posts.length}
              </span>
            </button>
          </div>

          {activeTab === "blogs" && (
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Blog Post</span>
            </button>
          )}
        </div>

        {/* TAB 1: INQUIRIES / LEADS (Light Theme) */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {/* Search and Refresh Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search leads by name, email, or service..."
                  value={inquiriesSearch}
                  onChange={(e) => setInquiriesSearch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:ring-3 focus:ring-sky-100 focus:outline-none pl-10 shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                onClick={fetchInquiries}
                disabled={inquiriesLoading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[#0D8C7D] ${
                    inquiriesLoading ? "animate-spin" : ""
                  }`}
                />
                <span>Refresh Leads</span>
              </button>
            </div>

            {/* Inquiries Table / Cards */}
            {inquiriesLoading && inquiries.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0D8C7D] mb-2" />
                <p className="text-sm">Loading inquiries from database...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-[#0D8C7D] flex items-center justify-center mx-auto">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {inquiriesSearch ? "No matching inquiries found" : "No inquiries received yet"}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  When potential clients submit the Contact or Services forms on your website, their
                  project details will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Client / Contact</th>
                        <th className="py-3.5 px-4">Service Needed</th>
                        <th className="py-3.5 px-4">Message Preview</th>
                        <th className="py-3.5 px-4">Received Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredInquiries.map((inq) => {
                        const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9+]/g, "") : null;
                        const whatsappDigits = inq.phone ? inq.phone.replace(/[^0-9]/g, "") : null;
                        const dateFormatted = inq.created_at
                          ? new Date(inq.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Recent";

                        return (
                          <tr
                            key={inq.id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td className="py-4 px-4 sm:px-6">
                              <div className="font-bold text-slate-900">{inq.name}</div>
                              <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                                <Mail className="w-3 h-3 text-[#0284C7]" />
                                <a
                                  href={`mailto:${inq.email}`}
                                  className="hover:text-[#0284C7] transition-colors"
                                >
                                  {inq.email}
                                </a>
                              </div>
                              {cleanPhone && (
                                <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5 font-mono">
                                  <Phone className="w-3 h-3 text-[#0D8C7D]" />
                                  <a
                                    href={`tel:${cleanPhone}`}
                                    className="hover:text-[#0D8C7D] transition-colors"
                                  >
                                    {inq.phone}
                                  </a>
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4">
                              <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                                {inq.service || "General Inquiry"}
                              </span>
                            </td>

                            <td className="py-4 px-4 max-w-xs sm:max-w-md">
                              <p className="line-clamp-2 text-xs text-slate-700 leading-relaxed">
                                {inq.message}
                              </p>
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="text-[11px] text-[#0284C7] hover:underline mt-1 font-semibold cursor-pointer"
                              >
                                View full details
                              </button>
                            </td>

                            <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                              {dateFormatted}
                            </td>

                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                {whatsappDigits && (
                                  <a
                                    href={`https://wa.me/${whatsappDigits}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Chat on WhatsApp"
                                    className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-[#0D8C7D] text-[#0D8C7D] hover:text-white flex items-center justify-center transition-colors border border-emerald-200"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                  </a>
                                )}

                                <a
                                  href={`mailto:${inq.email}?subject=Regarding your inquiry at Amogha Digital`}
                                  title="Send Email"
                                  className="w-8 h-8 rounded-lg bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white flex items-center justify-center transition-colors border border-sky-200"
                                >
                                  <Mail className="w-4 h-4" />
                                </a>

                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  title="Delete Lead"
                                  className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-rose-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BLOG CMS (Light Theme) */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            {/* Search and Stats Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search articles by title or category..."
                  value={postsSearch}
                  onChange={(e) => setPostsSearch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:outline-none pl-10 shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                onClick={fetchPosts}
                disabled={postsLoading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[#0D8C7D] ${postsLoading ? "animate-spin" : ""}`}
                />
                <span>Refresh Articles</span>
              </button>
            </div>

            {/* Posts Grid */}
            {postsLoading && posts.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0D8C7D] mb-2" />
                <p className="text-sm">Loading articles...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-[#0284C7] flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {postsSearch ? "No matching articles found" : "No blog posts published yet"}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Start sharing your engineering insights, web speed case studies, or AI automation
                  articles with prospective clients.
                </p>
                <button
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center justify-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Your First Article</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => {
                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                          {post.cover_image ? (
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-103 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-8 h-8 opacity-40" />
                            </div>
                          )}

                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            {post.published ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                Draft
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Article Info */}
                        <div className="p-5">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span className="font-bold text-[#0284C7] uppercase tracking-wider font-mono">
                              {post.category || "General"}
                            </span>
                            <span>{post.read_time || "4 min read"}</span>
                          </div>

                          <h3 className="font-heading text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#0284C7] transition-colors">
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Live</span>
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(post)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
                            title="Edit Post"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
                            title="Delete Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL 1: VIEW INQUIRY DETAILS (Light Theme) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                {selectedInquiry.service || "General Inquiry"}
              </span>
              <h3 className="font-heading text-xl font-bold text-slate-900 mt-2">
                Inquiry from {selectedInquiry.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Received on{" "}
                {new Date(selectedInquiry.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="space-y-4 py-3 border-y border-slate-200 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block text-xs">Email Address:</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-[#0284C7] hover:underline font-medium"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Phone / WhatsApp:</span>
                  <span className="text-slate-900 font-medium font-mono">
                    {selectedInquiry.phone || "Not provided"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-xs mb-1 font-semibold uppercase tracking-wider">
                  Client Project Requirements / Message:
                </span>
                <div className="bg-slate-50 p-4 rounded-xl text-slate-800 text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto border border-slate-200">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
              {selectedInquiry.phone && (
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your project inquiry at Amogha Digital`}
                className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0275B0] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Reply Email</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FULL BLOG POST EDITOR (Light Theme) */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-900">
            {/* Editor Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0284C7]" />
                <h2 className="font-heading text-lg font-bold text-slate-900">
                  {editorMode === "create" ? "Write New Blog Article" : "Edit Blog Article"}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex p-0.5 rounded-lg bg-slate-200 border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setEditorTab("write")}
                    className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                      editorTab === "write"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab("preview")}
                    className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                      editorTab === "preview"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Live Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {editorError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs sm:text-[13px]"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{editorError}</span>
                </div>
              )}

              {editorTab === "write" ? (
                <form id="blog-form" onSubmit={handleSavePost} className="space-y-4">
                  {/* Title & Slug */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Article Heading / Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Why Sub-2 Second Website Speed Dictates Real Revenue in 2026"
                      value={postForm.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setPostForm((prev) => ({
                          ...prev,
                          title: newTitle,
                          slug: isSlugLocked ? slugify(newTitle) : prev.slug,
                        }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:ring-3 focus:ring-sky-100 focus:outline-none"
                    />
                  </div>

                  {/* Slug & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-700">
                          URL Slug (`/blogs/[slug]`)
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsSlugLocked(!isSlugLocked)}
                          className="text-[11px] text-[#0284C7] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {isSlugLocked ? (
                            <>
                              <Lock className="w-3 h-3" />
                              <span>Auto-generated</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3 h-3" />
                              <span>Custom Edit</span>
                            </>
                          )}
                        </button>
                      </div>
                      <input
                        type="text"
                        disabled={isSlugLocked}
                        value={postForm.slug}
                        onChange={(e) =>
                          setPostForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                        }
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 disabled:opacity-60 text-xs font-mono text-slate-900 focus:border-[#00B8F0] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Article Category
                      </label>
                      <select
                        value={postForm.category}
                        onChange={(e) =>
                          setPostForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:border-[#00B8F0] focus:outline-none cursor-pointer"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cover Image & Upload */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Cover Image (Upload File or Paste Image URL)
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://... or upload below"
                        value={postForm.cover_image}
                        onChange={(e) =>
                          setPostForm((prev) => ({ ...prev, cover_image: e.target.value }))
                        }
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:outline-none"
                      />

                      <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer transition-colors shrink-0">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0D8C7D]" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {postForm.cover_image && (
                      <div className="mt-2 relative aspect-[16/9] max-w-xs rounded-xl overflow-hidden border border-slate-300">
                        <Image
                          src={postForm.cover_image}
                          alt="Cover preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Short Excerpt / Google Meta Summary (1-2 sentences)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="A quick summary of what this article covers for preview cards and Google search results..."
                      value={postForm.excerpt}
                      onChange={(e) =>
                        setPostForm((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Rich Content Area with Format Helpers */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Article Content (Headings, Paragraphs, Lists) <span className="text-rose-500">*</span>
                      </label>

                      {/* Quick Insert Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => insertContentMarkup("## Heading Title")}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 border border-slate-300 cursor-pointer"
                          title="Add H2 Heading"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup("### Subheading")}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 border border-slate-300 cursor-pointer"
                          title="Add H3 Heading"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup("- Bullet point 1\n- Bullet point 2")}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 border border-slate-300 cursor-pointer"
                          title="Add Bullet List"
                        >
                          List
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup("> Important key takeaway note")}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 border border-slate-300 cursor-pointer"
                          title="Add Quote"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContentMarkup("![Image Description](https://image-url.com)")
                          }
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 border border-slate-300 cursor-pointer"
                          title="Add Inline Image"
                        >
                          Image
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={12}
                      required
                      placeholder="Write your article here. You can use standard formatting:

## Introduction
Start with an engaging introduction explaining the problem...

## Why Speed Dictates Conversions
Explain the core concepts and findings...

- Bullet item 1
- Bullet item 2

> A key takeaway or expert quote.

## Conclusion
Wrap up with actionable takeaways."
                      value={postForm.content}
                      onChange={(e) =>
                        setPostForm((prev) => ({ ...prev, content: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00B8F0] focus:outline-none font-mono resize-y leading-relaxed"
                    />
                  </div>

                  {/* Publish Status Toggle */}
                  <div className="pt-2 flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={postForm.published}
                        onChange={(e) =>
                          setPostForm((prev) => ({ ...prev, published: e.target.checked }))
                        }
                        className="w-4 h-4 rounded border-slate-300 text-[#0D8C7D] focus:ring-0 cursor-pointer"
                      />
                      <span>Publish live immediately (uncheck to save as draft)</span>
                    </label>
                  </div>
                </form>
              ) : (
                /* LIVE PREVIEW TAB */
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 max-w-2xl mx-auto space-y-6">
                  {postForm.cover_image && (
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200">
                      <Image
                        src={postForm.cover_image}
                        alt={postForm.title || "Preview"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider font-mono">
                      {postForm.category}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                      {postForm.title || "Your Post Title Here"}
                    </h1>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>By {postForm.author}</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>

                  {postForm.excerpt && (
                    <p className="text-base text-slate-700 border-l-4 border-[#0284C7] pl-4 italic bg-white p-3 rounded-r-lg">
                      {postForm.excerpt}
                    </p>
                  )}

                  <div className="text-sm text-slate-800 space-y-4 whitespace-pre-wrap leading-relaxed">
                    {postForm.content || "Write some content to preview how it looks here..."}
                  </div>
                </div>
              )}
            </div>

            {/* Editor Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="blog-form"
                disabled={editorLoading}
                className="inline-flex items-center gap-2 bg-[#0D8C7D] hover:bg-[#0B7568] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs disabled:opacity-60 cursor-pointer"
              >
                {editorLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Article...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {editorMode === "create"
                        ? postForm.published
                          ? "Publish Article Live"
                          : "Save as Draft"
                        : "Update Article"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
