"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Edit, Trash2, Loader2, RefreshCw, X, Star, AlertCircle } from "lucide-react";

export default function AdminInstructorsCMSPage() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInst, setEditingInst] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    gender: "male",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    skillsStr: "",
    bio: "",
    coursesTaughtStr: "",
    rating: 4.9,
  });

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const loadInstructors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/instructors");
      const data = await res.json();
      setInstructors(data.data || []);
    } catch (err) {
      console.error("Failed loading instructors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  const handleOpenCreate = () => {
    setEditingInst(null);
    setFormData({
      id: "",
      name: "",
      role: "",
      gender: "male",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      skillsStr: "React, Node.js, TypeScript, PostgreSQL",
      bio: "",
      coursesTaughtStr: "Full-Stack Web Engineering Track",
      rating: 4.9,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (inst: any) => {
    setEditingInst(inst);
    setFormData({
      id: inst.id,
      name: inst.name,
      role: inst.role,
      gender: inst.gender || "male",
      avatar: inst.avatar,
      skillsStr: Array.isArray(inst.skills) ? inst.skills.join(", ") : inst.skills || "",
      bio: inst.bio,
      coursesTaughtStr: Array.isArray(inst.courses_taught) ? inst.courses_taught.join(", ") : inst.courses_taught || "",
      rating: inst.rating,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this instructor from database?")) return;

    try {
      await fetch(`/api/admin/instructors?id=${id}`, { method: "DELETE" });
      loadInstructors();
    } catch (err) {
      console.error("Delete instructor error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");

    const skills = formData.skillsStr.split(",").map((s) => s.trim()).filter(Boolean);
    const coursesTaught = formData.coursesTaughtStr.split(",").map((s) => s.trim()).filter(Boolean);

    try {
      const method = editingInst ? "PUT" : "POST";
      const res = await fetch("/api/admin/instructors", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills,
          coursesTaught,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        loadInstructors();
      } else {
        setMsg(data.message || "Failed saving instructor.");
      }
    } catch (err) {
      console.error("Save instructor error:", err);
      setMsg("Error saving instructor to database.");
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
            <Users className="w-8 h-8 text-brand-blue" />
            <span>Instructor Manager CMS</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Add, update, or remove mentor profiles live in your Supabase database.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadInstructors}
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
            <span>Add New Instructor</span>
          </button>
        </div>
      </div>

      {/* Instructors Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading instructors from database...</p>
        </div>
      ) : instructors.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs font-medium">
          No instructors found. Click "+ Add New Instructor" to add one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                    <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">{inst.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                        ★ {inst.rating}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-brand-blue">{inst.role}</p>
                    <p className="text-[11px] text-slate-400 capitalize">Gender: {inst.gender || "male"}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{inst.bio}</p>

                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(inst.skills) && inst.skills.slice(0, 4).map((sk: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => handleOpenEdit(inst)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Edit className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(inst.id)}
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

      {/* Create / Edit Instructor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-800 p-6 overflow-y-auto my-auto space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black">{editingInst ? "Edit Instructor Profile" : "Add New Instructor"}</h3>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-slate-400 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. Senior Full-Stack Engineering Lead"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Technical Skills (Comma separated)</label>
                <input
                  type="text"
                  value={formData.skillsStr}
                  onChange={(e) => setFormData({ ...formData, skillsStr: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  placeholder="React, Next.js, Node.js, PostgreSQL"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Courses Taught (Comma separated titles)</label>
                <input
                  type="text"
                  value={formData.coursesTaughtStr}
                  onChange={(e) => setFormData({ ...formData, coursesTaughtStr: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-blue"
                  placeholder="Full-Stack Web Engineering Track, Node.js & React Modern Stack"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-slate-400 mb-1">Bio / Profile Description</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:border-brand-blue resize-none"
                  placeholder="Specializes in..."
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
                  <span>Save Instructor to DB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
