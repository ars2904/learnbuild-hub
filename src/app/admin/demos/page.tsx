"use client";

import React, { useState, useEffect } from "react";
import { 
  MonitorPlay, Loader2, RefreshCw, Search, Building2, Phone, Mail, 
  Plus, Trash2, X, MessageSquare, CheckCircle2, Calendar, Eye, Send, Sparkles 
} from "lucide-react";

export default function AdminDemosPage() {
  const [demos, setDemos] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDemoForWhatsApp, setSelectedDemoForWhatsApp] = useState<any | null>(null);
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState("");

  // Form State for Add Demo
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    solutionTitle: "School Management System",
    companyName: "",
    projectRequirements: "",
    budgetRange: "₹1,50,000 - ₹3,00,000",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [resDemos, resSol] = await Promise.all([
        fetch("/api/admin/leads?type=demos"),
        fetch("/api/solutions"),
      ]);

      const [dataDemos, dataSol] = await Promise.all([
        resDemos.json(),
        resSol.json(),
      ]);

      setDemos(dataDemos.data || []);
      setSolutions(dataSol.data || []);
    } catch (err) {
      console.error("Failed loading demo requests:", err);
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
        body: JSON.stringify({ id, type: "demos", status: newStatus }),
      });
      loadData();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDeleteDemo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this demo request record?")) return;
    try {
      await fetch(`/api/admin/leads?type=demos&id=${id}`, { method: "DELETE" });
      loadData();
    } catch (err) {
      console.error("Delete demo error:", err);
    }
  };

  const handleCreateDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          solutionTitle: "School Management System",
          companyName: "",
          projectRequirements: "",
          budgetRange: "₹1,50,000 - ₹3,00,000",
        });
        loadData();
      }
    } catch (err) {
      console.error("Create demo error:", err);
    }
  };

  // Helper to open WhatsApp Preview modal with pre-filled client submitted details
  const openWhatsAppModal = (item: any) => {
    setSelectedDemoForWhatsApp(item);
    const prefilledText = `Hello ${item.full_name || ''} 👋,

Thank you for requesting a live software demo for *${item.solution_title || 'LearnBuild Solution'}*!

📌 *Organization:* ${item.company_name || 'Independent / Startup'}
💡 *Project Requirements:* ${item.project_requirements || 'Standard Demo'}
💰 *Budget Range:* ${item.budget_range || 'Standard'}

Our technical team is ready to schedule a live demo walkthrough for you. Please let us know your available time slot!`;

    setCustomWhatsAppMsg(prefilledText);
  };

  const triggerSendWhatsApp = () => {
    if (!selectedDemoForWhatsApp) return;
    const cleanPhone = (selectedDemoForWhatsApp.phone || "").replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWhatsAppMsg)}`;
    window.open(url, "_blank");
  };

  const filteredDemos = demos.filter((item) => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesSearch =
      item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution_title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <MonitorPlay className="w-3.5 h-3.5 text-amber-300" />
            <span>Software Solution Demo Desk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Client Demo Applications Desk
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            View, add, delete, and manage incoming client project demo requests for ready-made build software suites.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Demo Request</span>
          </button>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search client name, email, solution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold w-full sm:w-auto">
          {[
            { id: "all", label: "All Demos" },
            { id: "pending", label: "Pending" },
            { id: "contacted", label: "Contacted" },
            { id: "scheduled", label: "Scheduled" },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st.id
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {st.label}
            </button>
          ))}
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
            No demo application requests found matching your filter.
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

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openWhatsAppModal(item)}
                          className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                          title="Contact via WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(item.id, "contacted")}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors"
                        >
                          Contacted
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(item.id, "scheduled")}
                          className="px-2.5 py-1 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-[11px] shadow-sm transition-colors"
                        >
                          Scheduled
                        </button>

                        <button
                          onClick={() => handleDeleteDemo(item.id)}
                          className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                          title="Delete Demo Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MANUAL ADD DEMO MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Add Manual Demo Request</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDemo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Singh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Target Solution Track</label>
                  <select
                    value={formData.solutionTitle}
                    onChange={(e) => setFormData({ ...formData, solutionTitle: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  >
                    <option value="School & College Management Software Suite">School & College ERP</option>
                    <option value="Hospital & Multi-Specialty Clinic ERP">Hospital Clinic ERP</option>
                    <option value="Multi-Vendor E-Commerce & Marketplace Suite">E-Commerce Suite</option>
                    {solutions.map((sol) => (
                      <option key={sol.id} value={sol.title}>
                        {sol.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Academy"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Budget Range</label>
                  <input
                    type="text"
                    placeholder="₹1,50,000 - ₹3,00,000"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Project Requirements / Customization Needs</label>
                <textarea
                  rows={3}
                  placeholder="Custom modules required or specific integration requirements..."
                  value={formData.projectRequirements}
                  onChange={(e) => setFormData({ ...formData, projectRequirements: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                >
                  Save Demo Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP PRE-FILLED MESSAGE CUSTOMIZER MODAL */}
      {selectedDemoForWhatsApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-black text-slate-900">WhatsApp Message Dispatch</h3>
              </div>
              <button
                onClick={() => setSelectedDemoForWhatsApp(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-xs text-slate-800">
              <span className="font-bold text-emerald-800 block">Client Contact: {selectedDemoForWhatsApp.full_name}</span>
              <p><strong>Phone:</strong> {selectedDemoForWhatsApp.phone} | <strong>Solution Track:</strong> {selectedDemoForWhatsApp.solution_title}</p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                Preview & Edit WhatsApp Pre-filled Message Below
              </label>
              <textarea
                rows={7}
                value={customWhatsAppMsg}
                onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium leading-relaxed focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedDemoForWhatsApp(null)}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={triggerSendWhatsApp}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open & Send on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
