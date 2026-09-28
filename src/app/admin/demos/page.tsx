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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <MonitorPlay className="w-8 h-8 text-amber-400" />
            <span>Client Demo Application Desk</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Manage incoming client project demo requests for ready-made build solutions.</p>
        </div>

        <button
          onClick={loadDemos}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors self-start sm:self-auto border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search client, email, or solution..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Demos Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-400" />
            <p className="text-xs font-medium">Loading demo requests from Supabase...</p>
          </div>
        ) : filteredDemos.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-medium">
            No demo application requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Client Contact</th>
                  <th className="p-3">Solution Track</th>
                  <th className="p-3">Company & Budget</th>
                  <th className="p-3">Project Requirements</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredDemos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white text-sm">{item.full_name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{item.email}</span>
                      </div>
                      <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </div>
                    </td>

                    <td className="p-3 font-black text-amber-400">{item.solution_title}</td>

                    <td className="p-3">
                      <div className="font-bold text-white flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.company_name || "Startup / Individual"}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Budget: {item.budget_range || "Standard"}</div>
                    </td>

                    <td className="p-3 max-w-xs text-slate-300">
                      <div className="line-clamp-2">{item.project_requirements || "Standard demo requested"}</div>
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === "scheduled" || item.status === "approved"
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
                        onClick={() => handleUpdateStatus(item.id, "scheduled")}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-[11px]"
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
