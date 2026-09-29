"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, BookOpen, MonitorPlay, Users, FileText, Settings, 
  Plus, Edit3, Trash2, X, CheckCircle2, Loader2, Save, Image, Sparkles, ExternalLink, Star, Check
} from "lucide-react";
import { CMSCourse, CMSSolution, CMSInstructor, CMSBlog, CMSSiteSettings } from "@/lib/data/cmsStore";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "solutions" | "instructors" | "blogs" | "settings">("solutions");
  const [loading, setLoading] = useState(true);

  // Data States
  const [courses, setCourses] = useState<CMSCourse[]>([]);
  const [solutions, setSolutions] = useState<CMSSolution[]>([]);
  const [instructors, setInstructors] = useState<CMSInstructor[]>([]);
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [settings, setSettings] = useState<CMSSiteSettings>({
    heroTitle: "",
    heroSubtitle: "",
    announcementBanner: "",
    contactEmail: "",
    contactPhone: "",
    whatsappPhone: "",
    studentsTrainedCount: "",
    placementRate: "",
    projectsDeliveredCount: "",
    satisfactionRate: "",
  });

  // Modal States
  const [modalType, setModalType] = useState<"course" | "solution" | "instructor" | "blog" | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchAllContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms");
      const json = await res.json();
      if (json.success && json.data) {
        setCourses(json.data.courses || []);
        setSolutions(json.data.solutions || []);
        setInstructors(json.data.instructors || []);
        setBlogs(json.data.blogs || []);
        if (json.data.settings) setSettings(json.data.settings);
      }
    } catch (err) {
      console.error("Error loading CMS content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "settings", settings }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving site settings:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    try {
      await fetch(`/api/cms?type=${type}&id=${id}`, { method: "DELETE" });
      fetchAllContent();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleOpenAdd = (type: "course" | "solution" | "instructor" | "blog") => {
    setModalType(type);
    if (type === "solution") {
      setEditItem({
        id: "",
        title: "",
        category: "Education Tech",
        tag: "Ready to Deploy",
        description: "",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
        demoUrl: "/admin/demos",
        priceEstimate: "₹1,49,000",
        features: ["Student & Staff Directory", "Fee Collection Gateway", "Parent WhatsApp Alerts"],
        techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        featured: true,
      });
    } else if (type === "instructor") {
      setEditItem({
        id: "",
        name: "",
        role: "Senior Software Architect & Mentor",
        bio: "Experienced developer with 8+ years building production applications.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        expertise: ["Full-Stack", "React", "Next.js", "Node.js"],
        experienceYears: 8,
        rating: 4.9,
        studentsCount: 1500,
      });
    } else if (type === "blog") {
      setEditItem({
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        category: "Engineering",
        authorName: "LearnBuild Hub Tech Team",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        externalUrl: "",
        readTime: "5 min read",
        publishedAt: new Date().toISOString(),
        featured: true,
      });
    } else {
      setEditItem({
        id: "",
        title: "",
        category: "Web Engineering",
        description: "",
        price: 34999,
        originalPrice: 49999,
        duration: "16 Weeks",
        badge: "Most Popular",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      });
    }
  };

  const handleOpenEdit = (type: "course" | "solution" | "instructor" | "blog", item: any) => {
    setModalType(type);
    setEditItem({ ...item });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalType || !editItem) return;
    setSubmitting(true);

    const isEdit = Boolean(editItem.id && editItem.id.length > 3 && !editItem.id.startsWith("temp"));
    const endpoint = "/api/cms";
    const method = isEdit ? "PUT" : "POST";

    const typeKey = modalType === "course" ? "courses" : modalType === "solution" ? "solutions" : modalType === "instructor" ? "instructors" : "blogs";

    try {
      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: typeKey, item: editItem }),
      });
      setModalType(null);
      setEditItem(null);
      fetchAllContent();
    } catch (err) {
      console.error("Error saving CMS item:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span>Dynamic Website Content Management System (CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Website Content & Media Controller
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage software solutions, instructor profiles, blogs with external links, hero banners, and stat counters without code redeployment.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          className="px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Preview Live Website</span>
        </a>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-slate-200/80 shadow-sm overflow-x-auto text-xs font-bold">
        {[
          { id: "solutions", label: "Software Solutions", icon: MonitorPlay, count: solutions.length },
          { id: "instructors", label: "Instructors & Mentors", icon: Users, count: instructors.length },
          { id: "blogs", label: "Blog & Articles", icon: FileText, count: blogs.length },
          { id: "settings", label: "Hero & Site Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-md font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading CMS content data...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: SOFTWARE SOLUTIONS */}
          {activeTab === "solutions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Ready-Made Software Solutions</h3>
                  <p className="text-xs text-slate-500">Manage pre-built software suites displayed on the <code className="text-blue-600 font-bold">/build</code> page.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("solution")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Solution Suite</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map((sol) => (
                  <div key={sol.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase">
                          {sol.tag || sol.category}
                        </span>
                        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow">
                          {sol.priceEstimate || "₹1,49,000"}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900">{sol.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">{sol.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(sol.techStack || []).slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue text-[10px] font-bold border border-blue-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("solution", sol)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("solutions", sol.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTORS & MENTORS */}
          {activeTab === "instructors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Instructors & Domain Mentors</h3>
                  <p className="text-xs text-slate-500">Manage instructor profiles linked to course tracks and public pages.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("instructor")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Instructor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.map((inst) => (
                  <div key={inst.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={inst.avatar} alt={inst.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue" />
                        <div>
                          <h4 className="text-base font-black text-slate-900">{inst.name}</h4>
                          <p className="text-xs font-bold text-amber-600">{inst.role}</p>
                          <span className="text-[10px] text-slate-500 font-semibold">{inst.experienceYears || 8}+ Years Exp • ★ {inst.rating || 4.9}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 font-medium">{inst.bio}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {(inst.expertise || []).map((exp, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("instructor", inst)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("instructors", inst.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BLOGS & ARTICLES */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Blog Posts & External Articles</h3>
                  <p className="text-xs text-slate-500">Publish articles, tutorial links, and case studies displayed on <code className="text-blue-600 font-bold">/blogs</code>.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("blog")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Blog Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase">
                          {blog.category}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900 line-clamp-2">{blog.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">{blog.excerpt}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-1">
                        <span>By: {blog.authorName}</span>
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("blog", blog)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("blogs", blog.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HERO & SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Hero Section & Global Site Settings</h3>
                  <p className="text-xs text-slate-500">Edit homepage title, banner announcements, stat counters, and support contact numbers.</p>
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={submitting}
                  className="px-6 py-3 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Site Settings</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Site settings saved and updated live on the public website!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Top Announcement Banner</label>
                  <input
                    type="text"
                    value={settings.announcementBanner}
                    onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Hero Main Title</label>
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Students Trained</label>
                    <input
                      type="text"
                      value={settings.studentsTrainedCount}
                      onChange={(e) => setSettings({ ...settings, studentsTrainedCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-amber-600 font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Placement Rate</label>
                    <input
                      type="text"
                      value={settings.placementRate}
                      onChange={(e) => setSettings({ ...settings, placementRate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-600 font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Projects Delivered</label>
                    <input
                      type="text"
                      value={settings.projectsDeliveredCount}
                      onChange={(e) => setSettings({ ...settings, projectsDeliveredCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-brand-blue font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Satisfaction Score</label>
                    <input
                      type="text"
                      value={settings.satisfactionRate}
                      onChange={(e) => setSettings({ ...settings, satisfactionRate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-purple-600 font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">WhatsApp Support Phone</label>
                    <input
                      type="text"
                      value={settings.whatsappPhone}
                      onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-600 font-bold text-xs"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* DYNAMIC ITEM EDIT / ADD MODAL */}
      {modalType && editItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900 capitalize">
                {editItem.id ? `Edit ${modalType}` : `Add New ${modalType}`}
              </h3>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditItem(null);
                }}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Title / Name *</label>
                <input
                  type="text"
                  required
                  value={editItem.title || editItem.name || ""}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Image / Avatar URL</label>
                <input
                  type="text"
                  value={editItem.image || editItem.avatar || editItem.coverImage || ""}
                  onChange={(e) => setEditItem({ ...editItem, image: e.target.value, avatar: e.target.value, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Description / Bio / Excerpt</label>
                <textarea
                  rows={3}
                  value={editItem.description || editItem.bio || editItem.excerpt || ""}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value, bio: e.target.value, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* SPECIFIC FIELDS PER TYPE */}
              {modalType === "solution" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={editItem.category || ""}
                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Price Estimate</label>
                      <input
                        type="text"
                        value={editItem.priceEstimate || ""}
                        onChange={(e) => setEditItem({ ...editItem, priceEstimate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-emerald-600 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Next.js, Node.js, PostgreSQL"
                      value={Array.isArray(editItem.techStack) ? editItem.techStack.join(", ") : editItem.techStack || ""}
                      onChange={(e) => setEditItem({ ...editItem, techStack: e.target.value.split(",").map((s: string) => s.trim()) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-semibold"
                    />
                  </div>
                </>
              )}

              {modalType === "instructor" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Role Title</label>
                      <input
                        type="text"
                        value={editItem.role || ""}
                        onChange={(e) => setEditItem({ ...editItem, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Rating Score</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editItem.rating || 4.9}
                        onChange={(e) => setEditItem({ ...editItem, rating: parseFloat(e.target.value) || 4.9 })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-amber-600 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Expertise Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editItem.expertise) ? editItem.expertise.join(", ") : editItem.expertise || ""}
                      onChange={(e) => setEditItem({ ...editItem, expertise: e.target.value.split(",").map((s: string) => s.trim()) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-semibold"
                    />
                  </div>
                </>
              )}

              {modalType === "blog" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Category</label>
                      <select
                        value={editItem.category || "Engineering"}
                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Technology">Technology</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Programming">Programming</option>
                        <option value="Career">Career</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Read Time</label>
                      <input
                        type="text"
                        placeholder="5 min read"
                        value={editItem.readTime || ""}
                        onChange={(e) => setEditItem({ ...editItem, readTime: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">External Article Link (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://medium.com/... or https://dev.to/..."
                      value={editItem.externalUrl || ""}
                      onChange={(e) => setEditItem({ ...editItem, externalUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-mono"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setModalType(null);
                    setEditItem(null);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Item</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
