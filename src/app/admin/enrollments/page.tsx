"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Loader2, RefreshCw, CheckCircle2, UserCheck, Search, Filter } from "lucide-react";

export default function AdminEnrollmentsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsRes, instRes] = await Promise.all([
        fetch("/api/admin/leads?type=enrollments"),
        fetch("/api/admin/instructors"),
      ]);

      const [leadsData, instData] = await Promise.all([
        leadsRes.json(),
        instRes.json(),
      ]);

      setLeads(leadsData.data || []);
      setInstructors(instData.data || []);
    } catch (err) {
      console.error("Failed loading enrollments:", err);
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
    } catch (err) {
      console.error("Assign instructor error:", err);
    }
  };

  const filteredLeads = leads.filter((item) => {
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesSearch =
      item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course_title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

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
            Student Enrollment Leads Desk
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage student course applications, assign 1-on-1 senior mentors, and track enrollment statuses.
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search student name, email, or track..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold w-full sm:w-auto overflow-x-auto">
            {["all", "pending", "contacted", "enrolled"].map((st) => (
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
                  <th className="p-3.5">Requested Course Track</th>
                  <th className="p-3.5">Assigned Mentor</th>
                  <th className="p-3.5">Qualification & Message</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-black text-slate-900 text-sm">{item.full_name}</div>
                      <div className="text-[11px] text-slate-500 font-semibold">{item.email}</div>
                      <div className="text-[11px] text-brand-blue font-extrabold">{item.phone}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-black text-slate-900">{item.course_title}</div>
                      <div className="text-[10px] text-slate-400 font-medium">Submitted: {new Date(item.created_at).toLocaleDateString()}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <select
                          value={item.instructor_name || "Any Available Senior Mentor"}
                          onChange={(e) => handleAssignInstructor(item.id, e.target.value)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
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
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.status === "enrolled" || item.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.status === "contacted"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-brand-blue border border-blue-200"
                      }`}>
                        {item.status || "pending"}
                      </span>
                    </td>

                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => handleUpdateStatus(item.id, "contacted")}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors cursor-pointer"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "enrolled")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-sm transition-colors cursor-pointer"
                      >
                        Enrolled
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
