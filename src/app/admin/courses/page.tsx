"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Edit, Trash2, Loader2, RefreshCw, X, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminCoursesCMSPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    title: "",
    tagline: "",
    category: "Web Engineering",
    duration: "8 Weeks",
    level: "Beginner to Advanced",
    mode: "Live Mentorship Track",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    overview: "",
    prerequisites: "Basic programming logic recommended.",
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
      duration: "8 Weeks",
      level: "Beginner to Advanced",
      mode: "Live Mentorship Track",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      overview: "",
      prerequisites: "Open to all motivated learners.",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      id: course.id,
      slug: course.slug,
      title: course.title,
      tagline: course.tagline,
      category: course.category,
      duration: course.duration,
      level: course.level,
      mode: course.mode,
      rating: course.rating,
      image: course.image,
      overview: course.overview,
      prerequisites: course.prerequisites,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course from database?")) return;

    try {
      await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
      loadCourses();
    } catch (err) {
      console.error("Delete course error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");

    try {
      const method = editingCourse ? "PUT" : "POST";
      const res = await fetch("/api/admin/courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        loadCourses();
      } else {
        setMsg(data.message || "Failed saving course.");
      }
    } catch (err) {
      console.error("Save course error:", err);
      setMsg("Error saving course to database.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-brand-blue" />
            <span>Course Manager CMS</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Create, edit, or archive course tracks live in your Supabase database.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadCourses}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>
      </div>

      {/* Courses Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading courses from database...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs font-medium">
          No courses found. Click "+ Create New Course" to add one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase border border-slate-800">
                    {course.category}
                  </div>
                </div>

                <h3 className="text-lg font-black text-white leading-tight mb-1">{course.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">{course.tagline}</p>

                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-400">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">{course.duration}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">{course.level}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">★ {course.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Edit className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(course.id)}
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors border border-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Course Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-800 p-6 overflow-y-auto my-auto space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black">{editingCourse ? "Edit Course Track" : "Create New Course Track"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {msg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. Node.js Microservices Track"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Slug (URL) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                    placeholder="e.g. nodejs-microservices-track"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Mobile Dev">Mobile Dev</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  placeholder="Short engaging tagline..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Level</label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:border-brand-blue resize-none"
                  placeholder="Detailed course description..."
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black uppercase tracking-wider flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Course to DB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
