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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-brand-blue" />
            <span>Student Enrollment Leads</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Manage student inquiries, assign 1-on-1 mentors, and update application status.</p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors self-start sm:self-auto border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search student name, email, or track..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white font-medium focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold w-full sm:w-auto">
            {["all", "pending", "contacted", "enrolled"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg uppercase text-[10px] transition-all ${
                  filterStatus === st
                    ? "bg-brand-blue text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
            <p className="text-xs font-medium">Loading enrollments from Supabase...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-medium">
            No enrollment inquiries found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Student / Applicant</th>
                  <th className="p-3">Requested Course Track</th>
                  <th className="p-3">Assigned Mentor</th>
                  <th className="p-3">Qualification & Message</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white text-sm">{item.full_name}</div>
                      <div className="text-[11px] text-slate-400">{item.email}</div>
                      <div className="text-[11px] text-brand-blue font-bold">{item.phone}</div>
                    </td>

                    <td className="p-3">
                      <div className="font-black text-white">{item.course_title}</div>
                      <div className="text-[10px] text-slate-500">Submitted: {new Date(item.created_at).toLocaleDateString()}</div>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <select
                          value={item.instructor_name || "Any Available Senior Mentor"}
                          onChange={(e) => handleAssignInstructor(item.id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 font-bold focus:outline-none cursor-pointer"
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

                    <td className="p-3 max-w-xs">
                      <div className="font-semibold text-slate-300">{item.qualification}</div>
                      <div className="text-[11px] text-slate-400 truncate">{item.message || "No extra notes"}</div>
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === "enrolled" || item.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : item.status === "contacted"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {item.status || "pending"}
                      </span>
                    </td>

                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleUpdateStatus(item.id, "contacted")}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold border border-slate-700"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "enrolled")}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
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
