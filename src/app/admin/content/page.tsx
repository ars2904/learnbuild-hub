"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, BookOpen, MonitorPlay, Users, FileText, Settings, 
  Plus, Edit3, Trash2, X, CheckCircle2, Loader2, Save, Image, Sparkles
} from "lucide-react";
import { CMSCourse, CMSSolution, CMSInstructor, CMSBlog, CMSSiteSettings } from "@/lib/data/cmsStore";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "solutions" | "instructors" | "blogs" | "settings">("courses");
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalType || !editItem) return;

    const isEdit = Boolean(editItem.id && editItem.id.length > 5 && !editItem.id.startsWith("temp"));
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
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-bold text-blue-300 mb-2">
            <Globe className="w-3.5 h-3.5 text-brand-blue" />
            <span>Dynamic Website Content Management System (CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Website Content & Media Controller
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage public courses, ready-made software solutions, instructor profiles, blogs, hero banners, and stat counters without code redeployment.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-2 border border-slate-700 transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Preview Live Website</span>
        </a>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto text-xs font-bold">
        {[
          { id: "courses", label: "Courses Track", icon: BookOpen, count: courses.length },
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
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-black"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: COURSES */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Public Courses Directory ({courses.length})</h2>
            <button
              onClick={() => {
                setModalType("course");
                setEditItem({
                  title: "",
                  slug: "",
                  category: "Software Development",
                  description: "",
                  price: 29999,
                  originalPrice: 39999,
                  duration: "12 Weeks",
                  badge: "Popular",
                  rating: 4.9,
                  studentsCount: 500,
                  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                  instructorName: "Rohit Verma",
                  syllabus: ["Frontend Web Development", "Backend Architecture", "Cloud Deployment"],
                  skills: ["React", "Node.js", "TypeScript"],
                  featured: true,
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((crs) => (
              <div key={crs.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img src={crs.image} alt={crs.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-brand-blue/90 backdrop-blur-sm text-white text-[10px] font-black uppercase">
                      {crs.badge || crs.category}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white leading-snug">{crs.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{crs.description}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-extrabold text-amber-400">₹{crs.price?.toLocaleString()}</span>
                    <span className="text-slate-400">{crs.duration}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setModalType("course");
                      setEditItem(crs);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 border border-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Course</span>
                  </button>

                  <button
                    onClick={() => handleDelete("courses", crs.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SOLUTIONS */}
      {activeTab === "solutions" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Ready-Made Software Solutions ({solutions.length})</h2>
            <button
              onClick={() => {
                setModalType("solution");
                setEditItem({
                  title: "",
                  category: "Enterprise Software",
                  tag: "Ready to Deploy",
                  description: "",
                  image: "https://images.unsplash.com/photo-1556742049-0a6796d49cb4?auto=format&fit=crop&w=800&q=80",
                  demoUrl: "/admin/demos",
                  priceEstimate: "₹1,49,000",
                  features: ["Admin Dashboard", "User Roles", "Payment Gateway Integration"],
                  techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
                  featured: true,
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Software Solution</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div key={sol.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm text-slate-950 text-[10px] font-black uppercase">
                      {sol.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white leading-snug">{sol.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{sol.description}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-black text-emerald-400">{sol.priceEstimate}</span>
                    <span className="text-slate-400">{sol.category}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setModalType("solution");
                      setEditItem(sol);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 border border-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Solution</span>
                  </button>

                  <button
                    onClick={() => handleDelete("solutions", sol.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: INSTRUCTORS */}
      {activeTab === "instructors" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Instructors & Mentors ({instructors.length})</h2>
            <button
              onClick={() => {
                setModalType("instructor");
                setEditItem({
                  name: "",
                  role: "Software Architect",
                  bio: "",
                  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                  expertise: ["Full-Stack", "System Design"],
                  experienceYears: 5,
                  rating: 4.9,
                  studentsCount: 1000,
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Instructor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((inst) => (
              <div key={inst.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="flex items-center gap-4">
                  <img src={inst.avatar} alt={inst.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
                  <div>
                    <h3 className="text-base font-black text-white">{inst.name}</h3>
                    <p className="text-xs font-bold text-amber-400">{inst.role}</p>
                    <p className="text-[11px] text-slate-400">{inst.experienceYears}+ Yrs Experience • ★ {inst.rating}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{inst.bio}</p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setModalType("instructor");
                      setEditItem(inst);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 border border-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => handleDelete("instructors", inst.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: BLOGS */}
      {activeTab === "blogs" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Blog Posts & Articles ({blogs.length})</h2>
            <button
              onClick={() => {
                setModalType("blog");
                setEditItem({
                  title: "",
                  slug: "",
                  excerpt: "",
                  content: "",
                  category: "Engineering",
                  authorName: "Sneha Sharma",
                  authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                  coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
                  readTime: "5 min read",
                  publishedAt: new Date().toISOString(),
                  featured: true,
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Blog Post</span>
            </button>
          </div>

          <div className="space-y-4">
            {blogs.map((b) => (
              <div key={b.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={b.coverImage} alt={b.title} className="w-20 h-20 rounded-2xl object-cover border border-slate-700 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-brand-blue/20 text-brand-blue text-[10px] font-black uppercase">
                      {b.category}
                    </span>
                    <h3 className="text-base font-black text-white">{b.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{b.excerpt}</p>
                    <p className="text-[11px] text-slate-500">By {b.authorName} • {b.readTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                  <button
                    onClick={() => {
                      setModalType("blog");
                      setEditItem(b);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Article</span>
                  </button>

                  <button
                    onClick={() => handleDelete("blogs", b.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SITE SETTINGS & HERO */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-black text-white">Homepage & Business Meta Settings</h2>
              <p className="text-xs text-slate-400">Update public hero headline, stats counters, contact numbers, and top announcement banner.</p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Site Settings Saved Successfully! Changes are live on the website.</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Top Announcement Banner</label>
              <input
                type="text"
                value={settings.announcementBanner}
                onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hero Section Headline</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-black focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hero Section Subtitle / Paragraph</label>
              <textarea
                rows={3}
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-brand-blue resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Students Trained Counter</label>
                <input
                  type="text"
                  value={settings.studentsTrainedCount}
                  onChange={(e) => setSettings({ ...settings, studentsTrainedCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Placement Rate Counter</label>
                <input
                  type="text"
                  value={settings.placementRate}
                  onChange={(e) => setSettings({ ...settings, placementRate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Projects Delivered Counter</label>
                <input
                  type="text"
                  value={settings.projectsDeliveredCount}
                  onChange={(e) => setSettings({ ...settings, projectsDeliveredCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-brand-blue text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Satisfaction Rating Counter</label>
                <input
                  type="text"
                  value={settings.satisfactionRate}
                  onChange={(e) => setSettings({ ...settings, satisfactionRate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-400 text-xs font-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">WhatsApp Support Phone</label>
                <input
                  type="text"
                  value={settings.whatsappPhone}
                  onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* CMS ITEM EDIT / CREATE MODAL */}
      {modalType && editItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white capitalize">
                {editItem.id ? `Edit ${modalType}` : `Add New ${modalType}`}
              </h3>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditItem(null);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title / Name *</label>
                <input
                  type="text"
                  required
                  value={editItem.title || editItem.name || ""}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={editItem.image || editItem.avatar || editItem.coverImage || ""}
                  onChange={(e) => setEditItem({ ...editItem, image: e.target.value, avatar: e.target.value, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description / Bio / Excerpt</label>
                <textarea
                  rows={3}
                  value={editItem.description || editItem.bio || editItem.excerpt || ""}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value, bio: e.target.value, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium resize-none"
                />
              </div>

              {modalType === "course" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={editItem.price || 0}
                      onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Duration</label>
                    <input
                      type="text"
                      value={editItem.duration || ""}
                      onChange={(e) => setEditItem({ ...editItem, duration: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              {modalType === "solution" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price Estimate</label>
                    <input
                      type="text"
                      value={editItem.priceEstimate || ""}
                      onChange={(e) => setEditItem({ ...editItem, priceEstimate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tag</label>
                    <input
                      type="text"
                      value={editItem.tag || ""}
                      onChange={(e) => setEditItem({ ...editItem, tag: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setModalType(null);
                    setEditItem(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs shadow-md"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
