"use client";

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, Loader2, RefreshCw, CheckCircle2, UserCheck, Search, Filter, 
  MessageSquare, Eye, X, BookOpen, Clock, Phone, Mail, Award, AlertCircle, ArrowRight
} from "lucide-react";

export default function AdminEnrollmentsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Detail Modal
  const [selectedEnrollment, setSelectedEnrollment] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsRes, instRes, crsRes] = await Promise.all([
        fetch("/api/admin/leads?type=enrollments"),
        fetch("/api/admin/instructors"),
        fetch("/api/courses"),
      ]);

      const [leadsData, instData, crsData] = await Promise.all([
        leadsRes.json(),
        instRes.json(),
        crsRes.json(),
      ]);

      setLeads(leadsData.data || []);
      setInstructors(instData.data || []);
      setCourses(crsData.data || []);
    } catch (err) {
      console.error("Failed loading enrollment data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "enrollments", status: newStatus }),
      });
      loadData();
      if (selectedEnrollment && selectedEnrollment.id === id) {
        setSelectedEnrollment((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleAssignInstructor = async (id: string, instructorName: string) => {
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "enrollments", instructor_name: instructorName }),
      });
      loadData();
      if (selectedEnrollment && selectedEnrollment.id === id) {
        setSelectedEnrollment((prev: any) => prev ? { ...prev, instructor_name: instructorName } : null);
      }
    } catch (err) {
      console.error("Assign instructor error:", err);
    }
  };

  const triggerWhatsAppContact = (item: any) => {
    const cleanPhone = (item.phone || "").replace(/[^0-9]/g, "");
    const message = `Hello ${item.full_name} 👋,

Thank you for enrolling in *${item.course_title}* at LearnBuild Hub!

We have received your application. Your assigned mentor is *${item.instructor_name || 'Senior Instructor'}*.

Please let us know your preferred time for a quick orientation call.`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Helper to find connected course metadata
  const getConnectedCourse = (courseTitle: string) => {
    return courses.find((c) => c.title?.toLowerCase() === courseTitle?.toLowerCase() || c.slug?.toLowerCase() === courseTitle?.toLowerCase());
  };

  const filteredLeads = leads.filter((item) => {
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesCourse = filterCourse === "all" || item.course_title?.toLowerCase() === filterCourse.toLowerCase();
    const matchesSearch =
      item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course_title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCourse && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enrolled":
      case "approved":
        return <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase">Enrolled</span>;
      case "contacted":
        return <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black uppercase">Contacted</span>;
      case "rejected":
        return <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase">Rejected</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-200 text-[10px] font-black uppercase">Pending</span>;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
            <span>Admissions & Student Applications</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Student Enrollment Desk
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            View student applications, connect course tracks, assign 1-on-1 mentors, and contact applicants via WhatsApp.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md cursor-pointer flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Applications</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search student, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold overflow-x-auto">
            {["all", "pending", "contacted", "enrolled", "rejected"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl uppercase text-[10px] transition-all cursor-pointer ${
                  filterStatus === st
                    ? "bg-brand-blue text-white shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Course Track Dropdown Filter */}
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">All Course Tracks</option>
            {courses.map((crs) => (
              <option key={crs.id} value={crs.title}>
                {crs.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
            <p className="text-xs font-medium">Loading student enrollments...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-bold">
            No enrollment inquiries found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-extrabold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Student / Applicant</th>
                  <th className="p-3.5">Connected Course Track</th>
                  <th className="p-3.5">Assigned Mentor</th>
                  <th className="p-3.5">Qualification & Notes</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((item) => {
                  const connectedCrs = getConnectedCourse(item.course_title);
                  return (
                    <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-black text-slate-900 text-sm">{item.full_name}</div>
                        <div className="text-[11px] text-slate-500 font-semibold">{item.email}</div>
                        <div className="text-[11px] text-brand-blue font-extrabold">{item.phone}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-black text-slate-900">{item.course_title}</div>
                        {connectedCrs && (
                          <div className="text-[10px] text-emerald-700 font-bold pt-0.5">
                            Duration: {connectedCrs.duration || '12 Weeks'} • Price: ₹{connectedCrs.price?.toLocaleString()}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400 font-medium">Applied: {new Date(item.created_at).toLocaleDateString()}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <select
                            value={item.instructor_name || "Any Available Senior Mentor"}
                            onChange={(e) => handleAssignInstructor(item.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
                          >
                            <option value="Any Available Senior Mentor">Any Available Mentor</option>
                            {instructors.map((inst) => (
                              <option key={inst.id} value={inst.name}>
                                {inst.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <div className="font-bold text-slate-800">{item.qualification}</div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">{item.message || "No extra notes"}</div>
                      </td>

                      <td className="p-3.5">
                        {getStatusBadge(item.status || "pending")}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedEnrollment(item)}
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4 text-brand-blue" />
                          </button>

                          <button
                            onClick={() => triggerWhatsAppContact(item)}
                            className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200"
                            title="Chat via WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4 text-emerald-600" />
                          </button>

                          <button
                            onClick={() => handleUpdateStatus(item.id, "contacted")}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200"
                          >
                            Contacted
                          </button>

                          <button
                            onClick={() => handleUpdateStatus(item.id, "enrolled")}
                            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-sm"
                          >
                            Enroll
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STUDENT ENROLLMENT DETAIL MODAL */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-6 my-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider">Student Application Detail</span>
                <h3 className="text-xl font-black text-slate-900">{selectedEnrollment.full_name}</h3>
              </div>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs">
              {/* Student Metadata Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 font-bold block">Email:</span>
                    <span className="font-bold text-brand-blue text-sm">{selectedEnrollment.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Phone:</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedEnrollment.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Qualification:</span>
                    <span className="font-bold text-slate-800">{selectedEnrollment.qualification}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Applied On:</span>
                    <span className="font-semibold text-slate-700">{new Date(selectedEnrollment.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Connected Course Track Card */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider block">Connected Course Track</span>
                <h4 className="text-base font-black text-slate-900">{selectedEnrollment.course_title}</h4>
                {getConnectedCourse(selectedEnrollment.course_title) && (
                  <div className="text-xs text-slate-700 space-y-1 pt-1 font-medium">
                    <p><strong>Track Duration:</strong> {getConnectedCourse(selectedEnrollment.course_title)?.duration}</p>
                    <p><strong>Course Fee:</strong> ₹{getConnectedCourse(selectedEnrollment.course_title)?.price?.toLocaleString()}</p>
                  </div>
                )}
              </div>

              {/* Application Message */}
              {selectedEnrollment.message && (
                <div className="space-y-1">
                  <span className="text-slate-500 font-bold block">Applicant Note / Message:</span>
                  <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-medium leading-relaxed">
                    "{selectedEnrollment.message}"
                  </p>
                </div>
              )}

              {/* Assigned Instructor Selector */}
              <div className="space-y-1.5 pt-2">
                <span className="text-slate-600 font-black uppercase tracking-wider text-[10px]">Assign 1-on-1 Senior Mentor</span>
                <select
                  value={selectedEnrollment.instructor_name || "Any Available Senior Mentor"}
                  onChange={(e) => handleAssignInstructor(selectedEnrollment.id, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:border-brand-blue"
                >
                  <option value="Any Available Senior Mentor">Any Available Senior Mentor</option>
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.name}>
                      {inst.name} ({inst.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions Toolbar in Modal */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => triggerWhatsAppContact(selectedEnrollment)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedEnrollment.id, "rejected")}
                  className="px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEnrollment.id, "enrolled")}
                  className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm"
                >
                  Confirm Enrollment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
