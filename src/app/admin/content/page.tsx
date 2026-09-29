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
            Manage public courses, ready-made software solutions, instructor profiles, blogs, hero banners, and stat counters without code redeployment.
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
                  : "text-slate-600 hover:text-brand-blue hover:bg-slate-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
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
            <h2 className="text-xl font-black text-slate-900">Public Courses Directory ({courses.length})</h2>
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
              className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((crs) => (
              <div key={crs.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={crs.image} alt={crs.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                      {crs.badge || crs.category}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">{crs.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{crs.description}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-black text-brand-blue text-sm">₹{crs.price?.toLocaleString()}</span>
                    <span className="text-slate-500 font-bold">{crs.duration}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setModalType("course");
                      setEditItem(crs);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Course</span>
                  </button>

                  <button
                    onClick={() => handleDelete("courses", crs.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
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
            <h2 className="text-xl font-black text-slate-900">Ready-Made Software Solutions ({solutions.length})</h2>
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
              className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Software Solution</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div key={sol.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {sol.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">{sol.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{sol.description}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-black text-emerald-600 text-sm">{sol.priceEstimate}</span>
                    <span className="text-slate-500 font-bold">{sol.category}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setModalType("solution");
                      setEditItem(sol);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Solution</span>
                  </button>

                  <button
                    onClick={() => handleDelete("solutions", sol.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
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
            <h2 className="text-xl font-black text-slate-900">Instructors & Mentors ({instructors.length})</h2>
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
              className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Instructor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((inst) => (
              <div key={inst.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="flex items-center gap-4">
                  <img src={inst.avatar} alt={inst.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-black text-slate-900">{inst.name}</h3>
                    <p className="text-xs font-bold text-amber-600">{inst.role}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">{inst.experienceYears}+ Yrs Experience • ★ {inst.rating}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">{inst.bio}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setModalType("instructor");
                      setEditItem(inst);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => handleDelete("instructors", inst.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
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
            <h2 className="text-xl font-black text-slate-900">Blog Posts & Articles ({blogs.length})</h2>
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
              className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Blog Post</span>
            </button>
          </div>

          <div className="space-y-4">
            {blogs.map((b) => (
              <div key={b.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <img src={b.coverImage} alt={b.title} className="w-20 h-20 rounded-2xl object-cover border border-slate-200 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue text-[10px] font-black uppercase tracking-wider border border-blue-200">
                      {b.category}
                    </span>
                    <h3 className="text-base font-black text-slate-900">{b.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-1">{b.excerpt}</p>
                    <p className="text-[11px] text-slate-400 font-medium">By {b.authorName} • {b.readTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                  <button
                    onClick={() => {
                      setModalType("blog");
                      setEditItem(b);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit Article</span>
                  </button>

                  <button
                    onClick={() => handleDelete("blogs", b.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
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
        <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-black text-slate-900">Homepage & Business Meta Settings</h2>
              <p className="text-xs text-slate-500 font-medium">Update public hero headline, stats counters, contact numbers, and top announcement banner.</p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Site Settings Saved Successfully! Changes are live on the website.</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Top Announcement Banner</label>
              <input
                type="text"
                value={settings.announcementBanner}
                onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Hero Section Headline</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Hero Section Subtitle / Paragraph</label>
              <textarea
                rows={3}
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Students Trained Counter</label>
                <input
                  type="text"
                  value={settings.studentsTrainedCount}
                  onChange={(e) => setSettings({ ...settings, studentsTrainedCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-amber-600 text-xs font-black focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Placement Rate Counter</label>
                <input
                  type="text"
                  value={settings.placementRate}
                  onChange={(e) => setSettings({ ...settings, placementRate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-emerald-600 text-xs font-black focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Projects Delivered Counter</label>
                <input
                  type="text"
                  value={settings.projectsDeliveredCount}
                  onChange={(e) => setSettings({ ...settings, projectsDeliveredCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-brand-blue text-xs font-black focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Satisfaction Rating Counter</label>
                <input
                  type="text"
                  value={settings.satisfactionRate}
                  onChange={(e) => setSettings({ ...settings, satisfactionRate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-purple-600 text-xs font-black focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">Contact Phone</label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">WhatsApp Support Phone</label>
                <input
                  type="text"
                  value={settings.whatsappPhone}
                  onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-emerald-600 text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* CMS ITEM EDIT / CREATE MODAL */}
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
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editItem.image || editItem.avatar || editItem.coverImage || ""}
                  onChange={(e) => setEditItem({ ...editItem, image: e.target.value, avatar: e.target.value, coverImage: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Description / Bio / Excerpt</label>
                <textarea
                  rows={3}
                  value={editItem.description || editItem.bio || editItem.excerpt || ""}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value, bio: e.target.value, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                />
              </div>

              {modalType === "course" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={editItem.price || 0}
                      onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-brand-blue text-xs font-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editItem.duration || ""}
                      onChange={(e) => setEditItem({ ...editItem, duration: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              {modalType === "solution" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Price Estimate</label>
                    <input
                      type="text"
                      value={editItem.priceEstimate || ""}
                      onChange={(e) => setEditItem({ ...editItem, priceEstimate: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-emerald-600 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Tag</label>
                    <input
                      type="text"
                      value={editItem.tag || ""}
                      onChange={(e) => setEditItem({ ...editItem, tag: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                    />
                  </div>
                </div>
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
                  className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
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
