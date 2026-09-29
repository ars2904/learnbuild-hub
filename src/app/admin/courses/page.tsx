"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, Plus, Edit3, Trash2, Loader2, RefreshCw, X, CheckCircle2, AlertCircle, 
  Sparkles, ExternalLink, Eye, EyeOff, Layout, Layers, Star, Clock, GraduationCap, 
  ShieldCheck, Send, MonitorPlay, ChevronDown, Check, Trash, Search, ArrowRight, HelpCircle
} from "lucide-react";

interface CourseModule {
  moduleNumber: string;
  title: string;
  topics: string[];
}

export default function AdminCoursesCMSPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  // View mode in modal: "split" | "form" | "preview"
  const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
  const [previewTab, setPreviewTab] = useState<"overview" | "curriculum" | "learn" | "faqs">("overview");
  const [previewModuleOpen, setPreviewModuleOpen] = useState<number | null>(0);

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Comprehensive Form State matching /learn/[slug]
  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    title: "",
    tagline: "",
    category: "Web Engineering",
    duration: "10 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Internship Track",
    rating: 4.9,
    studentsEnrolled: 150,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    overview: "",
    prerequisites: "Basic computer literacy and enthusiasm to learn logic.",
    whatYouWillLearn: [
      "Frontend UI Development with React 18 & Next.js",
      "Backend REST & GraphQL APIs with Express & Node.js",
      "Database Systems with PostgreSQL, Supabase & Prisma",
      "Production Deployment with Vercel, Docker & CI/CD",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Frontend Architecture & Modern React",
        topics: ["HTML5/CSS3 Fundamentals", "TypeScript & React 18 Components", "State Management & Tailwind CSS"],
      },
      {
        moduleNumber: "Module 02",
        title: "Full-Stack Server Systems & Database",
        topics: ["Next.js App Router & Server Actions", "PostgreSQL Database & Prisma ORM", "Authentication & API Security"],
      },
    ] as CourseModule[],
    eligibility: [
      "Students, engineers, and tech enthusiasts building a full-stack career.",
    ],
    careerOptions: [
      "Full-Stack Software Engineer",
      "Frontend Developer",
      "Backend Developer",
    ],
  });

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      setCourses(data.data || []);
    } catch (err) {
      console.error("Failed loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      id: "",
      slug: "",
      title: "",
      tagline: "",
      category: "Web Engineering",
      duration: "10 Weeks • Hands-on Projects",
      level: "Beginner to Advanced",
      mode: "Live Mentorship & Internship Track",
      rating: 4.9,
      studentsEnrolled: 150,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      overview: "Master modern software engineering with hands-on projects, 1-on-1 mentorship, and real-world deployment pipelines.",
      prerequisites: "Basic computer literacy and enthusiasm to learn logic.",
      whatYouWillLearn: [
        "Frontend UI Development with React 18 & Next.js",
        "Backend REST APIs with Express & Node.js",
        "Database Systems with PostgreSQL, Supabase & Prisma",
        "Production Deployment with Vercel, Docker & CI/CD",
      ],
      curriculum: [
        {
          moduleNumber: "Module 01",
          title: "Frontend Architecture & Modern React",
          topics: ["HTML5/CSS3 Fundamentals", "TypeScript & React 18 Components", "State Management & Tailwind CSS"],
        },
        {
          moduleNumber: "Module 02",
          title: "Full-Stack Server Systems & Database",
          topics: ["Next.js App Router & Server Actions", "PostgreSQL Database & Prisma ORM", "Authentication & API Security"],
        },
      ],
      eligibility: [
        "Students, engineers, and tech enthusiasts building a full-stack career.",
      ],
      careerOptions: [
        "Full-Stack Software Engineer",
        "Frontend Developer",
        "Backend Developer",
      ],
    });
    setMsg("");
    setViewMode("split");
    setModalOpen(true);
  };

  const handleOpenEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      id: course.id || "",
      slug: course.slug || "",
      title: course.title || "",
      tagline: course.tagline || course.shortDescription || "",
      category: course.category || "Web Engineering",
      duration: course.duration || "10 Weeks • Hands-on Projects",
      level: course.level || "Beginner to Advanced",
      mode: course.mode || "Live Mentorship & Internship Track",
      rating: course.rating || 4.9,
      studentsEnrolled: course.studentsEnrolled || 150,
      image: course.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      overview: course.overview || course.shortDescription || "",
      prerequisites: course.prerequisites || "Basic programming logic recommended.",
      whatYouWillLearn: Array.isArray(course.whatYouWillLearn) && course.whatYouWillLearn.length > 0 
        ? course.whatYouWillLearn 
        : ["Core Technical Skills", "Hands-on Capstone Project", "Mentorship Code Reviews"],
      curriculum: Array.isArray(course.curriculum) && course.curriculum.length > 0 
        ? course.curriculum 
        : [
            {
              moduleNumber: "Module 01",
              title: "Foundations & Core Principles",
              topics: ["Introduction to Concepts", "Hands-on Lab 1", "Best Practices"],
            }
          ],
      eligibility: Array.isArray(course.eligibility) && course.eligibility.length > 0
        ? course.eligibility
        : ["Students and professionals looking to upskill"],
      careerOptions: Array.isArray(course.careerOptions) && course.careerOptions.length > 0
        ? course.careerOptions
        : ["Industry Engineer", "Specialist"],
    });
    setMsg("");
    setViewMode("split");
    setModalOpen(true);
  };

  // Helper auto-slug
  const handleTitleChange = (val: string) => {
    const slugified = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && editingCourse ? prev.slug : slugified,
    }));
  };

  // What you will learn helpers
  const handleAddOutcome = () => {
    setFormData((prev) => ({
      ...prev,
      whatYouWillLearn: [...prev.whatYouWillLearn, ""],
    }));
  };
  const handleUpdateOutcome = (index: number, val: string) => {
    const updated = [...formData.whatYouWillLearn];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, whatYouWillLearn: updated }));
  };
  const handleRemoveOutcome = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatYouWillLearn: prev.whatYouWillLearn.filter((_, i) => i !== index),
    }));
  };

  // Curriculum helpers
  const handleAddModule = () => {
    setFormData((prev) => ({
      ...prev,
      curriculum: [
        ...prev.curriculum,
        {
          moduleNumber: `Module 0${prev.curriculum.length + 1}`,
          title: "New Curriculum Module",
          topics: ["Topic 1", "Topic 2"],
        },
      ],
    }));
  };
  const handleUpdateModule = (index: number, field: string, val: any) => {
    const updated = [...formData.curriculum];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, curriculum: updated }));
  };
  const handleRemoveModule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");

    try {
      const method = editingCourse ? "PUT" : "POST";
      const payload = {
        ...formData,
        id: formData.id || formData.slug || `crs-${Date.now()}`,
      };

      const res = await fetch("/api/admin/courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        loadCourses();
      } else {
        setMsg(data.message || "Operation failed.");
      }
    } catch (err) {
      setMsg("Server connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
      loadCourses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const categories = ["All", "Web Engineering", "AI & Data", "Mobile Dev", "Cloud & DevOps", "Digital Marketing"];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategoryFilter === "All" || c.category === selectedCategoryFilter;
    const matchesSearch =
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-300" />
            <span>Course Catalog & Curriculum Management</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Courses & Engineering Tracks
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
            Manage course tracks, modules, prerequisites, outcomes, and side-by-side live previews matching public <code className="text-amber-300">/learn/[slug]</code> pages.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategoryFilter === cat
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Courses Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading courses catalog...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500">
          <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-bold text-slate-900 mb-1">No Courses Found</p>
          <p className="text-xs mb-4">No course tracks match your selected filter criteria.</p>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-full bg-brand-blue text-white font-bold text-xs"
          >
            + Add First Course Track
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id || course.slug}
              className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow">
                    {course.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow flex items-center gap-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>{course.rating || 4.9}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{course.title}</h3>
                  <p className="text-xs font-bold text-brand-blue mt-0.5">{course.tagline || course.shortDescription || course.level}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                  {course.overview || course.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-1 border-t border-slate-100">
                  <span>Duration: {course.duration || "10 Weeks"}</span>
                  <span>Mode: {course.mode?.split(" ")[0] || "Live"}</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1.5 border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit</span>
                  </button>

                  <Link
                    href={`/learn/${course.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 transition-colors"
                    title="View Public Course Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                  title="Delete Course Track"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DUAL-PANE UNIFIED COURSE EDITOR MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-7xl h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-6 sm:py-4 bg-slate-900 text-white border-b border-slate-800 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {editingCourse ? `Editing Track: ${formData.title}` : "Create New Engineering Course Track"}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Side-by-side Course Editor with Live Visual Snug Preview matching <code className="text-blue-300">/learn/[slug]</code>
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* View Mode Toggle Buttons */}
                <div className="inline-flex p-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold">
                  <button
                    onClick={() => setViewMode("split")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      viewMode === "split" ? "bg-brand-blue text-white shadow" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Split View</span>
                  </button>
                  <button
                    onClick={() => setViewMode("form")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      viewMode === "form" ? "bg-brand-blue text-white shadow" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Form Only</span>
                  </button>
                  <button
                    onClick={() => setViewMode("preview")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      viewMode === "preview" ? "bg-brand-blue text-white shadow" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error / Alert banner */}
            {msg && (
              <div className="px-6 py-3 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{msg}</span>
              </div>
            )}

            {/* Modal Body: Left Editor Form + Right Live Preview */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-50">
              
              {/* LEFT PANE: Editor Form */}
              <div
                className={`${
                  viewMode === "preview"
                    ? "hidden"
                    : viewMode === "split"
                    ? "lg:col-span-6 border-r border-slate-200"
                    : "lg:col-span-12"
                } overflow-y-auto p-4 sm:p-6 space-y-6 bg-white`}
              >
                <form id="courseForm" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Section 1: Basic Info */}
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>1. Track Identity & Basic Metadata</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Course Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Full-Stack Web Engineering Track"
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">URL Slug *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. full-stack-web-engineering"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono font-semibold focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Tagline / Catchphrase</label>
                      <input
                        type="text"
                        placeholder="Master modern web engineering from front-end UI design to scalable server APIs."
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                        >
                          <option value="Web Engineering">Web Engineering</option>
                          <option value="AI & Data">AI & Data</option>
                          <option value="Mobile Dev">Mobile Dev</option>
                          <option value="Cloud & DevOps">Cloud & DevOps</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          placeholder="10 Weeks • Hands-on"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Rating Score</label>
                        <input
                          type="number"
                          step="0.1"
                          max="5.0"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 4.9 })}
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  {/* Section 2: Overview & Prerequisites */}
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>2. Overview & Prerequisites</span>
                    </h4>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Detailed Course Overview Paragraph</label>
                      <textarea
                        rows={4}
                        placeholder="Detailed explanation of what this course track covers..."
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Prerequisites</label>
                      <input
                        type="text"
                        placeholder="Basic programming logic recommended."
                        value={formData.prerequisites}
                        onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  {/* Section 3: What You'll Learn */}
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>3. What You'll Learn Outcomes</span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddOutcome}
                        className="px-3 py-1 rounded-lg bg-blue-100 text-brand-blue font-extrabold text-[11px] hover:bg-blue-200"
                      >
                        + Add Outcome
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.whatYouWillLearn.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            placeholder={`Outcome #${idx + 1}`}
                            onChange={(e) => handleUpdateOutcome(idx, e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveOutcome(idx)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Curriculum Modules Builder */}
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>4. Curriculum Modules Builder</span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddModule}
                        className="px-3 py-1 rounded-lg bg-blue-100 text-brand-blue font-extrabold text-[11px] hover:bg-blue-200"
                      >
                        + Add Module
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.curriculum.map((mod, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-300 space-y-3 relative">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={mod.moduleNumber}
                              onChange={(e) => handleUpdateModule(idx, "moduleNumber", e.target.value)}
                              className="w-24 px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px] font-bold"
                            />
                            <input
                              type="text"
                              value={mod.title}
                              placeholder="Module Title"
                              onChange={(e) => handleUpdateModule(idx, "title", e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveModule(idx)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1">Topics (comma or line separated):</label>
                            <input
                              type="text"
                              value={Array.isArray(mod.topics) ? mod.topics.join(", ") : mod.topics}
                              onChange={(e) => handleUpdateModule(idx, "topics", e.target.value.split(",").map(t => t.trim()))}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </form>
              </div>

              {/* RIGHT PANE: Live Visual Snug Preview */}
              <div
                className={`${
                  viewMode === "form"
                    ? "hidden"
                    : viewMode === "split"
                    ? "lg:col-span-6"
                    : "lg:col-span-12"
                } overflow-y-auto p-4 sm:p-6 bg-slate-100 border-l border-slate-200`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Visual Preview</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    Renders real-time public page layout
                  </span>
                </div>

                {/* Simulated Public Course Details Component */}
                <div className="bp-card rounded-3xl bg-white border border-slate-200 shadow-xl p-4 sm:p-6 text-slate-900 overflow-hidden font-sans">
                  
                  {/* Hero Header */}
                  <div className="space-y-4 pb-6 border-b border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-[10px] font-black uppercase tracking-wider border border-blue-200">
                        {formData.category || "Web Engineering"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{formData.rating || 4.9} ★ Score</span>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {formData.title || "Untitled Engineering Track"}
                    </h2>

                    <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                      {formData.tagline || "Master modern web engineering from front-end UI design to scalable server APIs."}
                    </p>

                    {/* Quick Metadata Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700">
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span className="truncate">{formData.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <GraduationCap className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                        <span className="truncate">{formData.mode?.split(" ")[0] || "Live"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate col-span-2 sm:col-span-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>20 Seats / Cohort</span>
                      </div>
                    </div>

                    {/* Preview CTA Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button className="px-5 py-2.5 rounded-full bg-brand-blue text-white font-black text-xs uppercase tracking-wider shadow">
                        Enroll Now
                      </button>
                      <button className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-wider">
                        Request Demo
                      </button>
                    </div>

                    {/* Course Banner Image */}
                    <div className="relative h-40 sm:h-48 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                      <img
                        src={formData.image}
                        alt="Course banner"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[10px] font-bold text-blue-300">LearnBuild Hub Admissions</div>
                        <div className="text-xs font-black">{formData.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Sub-tabs Navigation inside Preview */}
                  <div className="border-b border-slate-200 my-4 flex items-center gap-4 text-xs font-bold overflow-x-auto no-scrollbar">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "curriculum", label: "Curriculum" },
                      { id: "learn", label: "What You'll Learn" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setPreviewTab(tab.id as any)}
                        className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                          previewTab === tab.id
                            ? "border-brand-blue text-brand-blue font-extrabold"
                            : "border-transparent text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Display */}
                  {previewTab === "overview" && (
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] mb-1">Overview</h4>
                        <p>{formData.overview || "No overview specified yet."}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                        <h4 className="font-bold text-brand-blue text-[11px] mb-0.5">Prerequisites:</h4>
                        <p className="font-medium text-slate-800">{formData.prerequisites}</p>
                      </div>
                    </div>
                  )}

                  {previewTab === "curriculum" && (
                    <div className="space-y-3">
                      <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px]">Curriculum Modules</h4>
                      {formData.curriculum.map((mod, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                            <span className="text-brand-blue">{mod.moduleNumber}: {mod.title}</span>
                          </div>
                          <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5 pl-1">
                            {(Array.isArray(mod.topics) ? mod.topics : [mod.topics]).map((t, ti) => (
                              <li key={ti}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {previewTab === "learn" && (
                    <div className="space-y-3">
                      <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px]">What You'll Learn</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {formData.whatYouWillLearn.map((outcome, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-950">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{outcome || "Learning outcome point"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Modal Footer / Save bar */}
            <div className="p-4 sm:px-6 bg-slate-900 text-white border-t border-slate-800 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400 hidden sm:inline">
                All changes sync directly to public site & database
              </span>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="courseForm"
                  disabled={submitting}
                  className="px-7 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Track...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingCourse ? "Update Course Track" : "Publish Course Track"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
