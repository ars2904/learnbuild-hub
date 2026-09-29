"use client";

import React, { useState, useEffect } from "react";
import { MonitorPlay, Loader2, RefreshCw, Search, Building2, Phone, Mail } from "lucide-react";

export default function AdminDemosPage() {
  const [demos, setDemos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadDemos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads?type=demos");
      const data = await res.json();
      setDemos(data.data || []);
    } catch (err) {
      console.error("Failed loading demo requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemos();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "demos", status: newStatus }),
      });
      loadDemos();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const filteredDemos = demos.filter(
    (item) =>
      item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <MonitorPlay className="w-3.5 h-3.5 text-amber-300" />
            <span>Software Solution Demos</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Client Demo Application Desk
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage incoming client project demo requests for ready-made build software suites.
          </p>
        </div>

        <button
          onClick={loadDemos}
          disabled={loading}
          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md cursor-pointer flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search client, email, or solution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Demos Table Card */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
            <p className="text-xs font-medium">Loading demo requests...</p>
          </div>
        ) : filteredDemos.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-bold">
            No demo application requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-extrabold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Client Contact</th>
                  <th className="p-3.5">Solution Track</th>
                  <th className="p-3.5">Company & Budget</th>
                  <th className="p-3.5">Project Requirements</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDemos.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-black text-slate-900 text-sm">{item.full_name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{item.email}</span>
                      </div>
                      <div className="text-[11px] text-brand-blue font-extrabold flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-black text-brand-blue">{item.solution_title}</td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.company_name || "Startup / Individual"}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold">Budget: {item.budget_range || "Standard"}</div>
                    </td>

                    <td className="p-3.5 max-w-xs text-slate-700 font-medium">
                      <div className="line-clamp-2">{item.project_requirements || "Standard demo requested"}</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.status === "scheduled" || item.status === "approved"
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
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "scheduled")}
                        className="px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-[11px] shadow-sm transition-colors"
                      >
                        Scheduled
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
