"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, Plus, Search, Filter, Phone, Mail, 
  CheckCircle2, Clock, AlertCircle, Trash2, Edit, X, Loader2, DollarSign, UserCheck
} from "lucide-react";
import { Client } from "@/lib/data/crm";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "lead" as Client["status"],
    serviceInterested: "Custom Web Application & Software",
    contractValue: 100000,
    assignedEmployeeName: "",
    notes: "",
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      const json = await res.json();
      if (json.success) {
        setClients(json.data);
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          status: "lead",
          serviceInterested: "Custom Web Application & Software",
          contractValue: 100000,
          assignedEmployeeName: "",
          notes: "",
        });
        fetchClients();
      }
    } catch (err) {
      console.error("Error creating client:", err);
    }
  };

  const handleUpdateStatus = async (client: Client, newStatus: Client["status"]) => {
    try {
      const res = await fetch("/api/admin/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchClients();
      }
    } catch (err) {
      console.error("Error updating client status:", err);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client record?")) return;
    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchClients();
      }
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  // Metrics Calculation
  const totalClients = clients.length;
  const followupCount = clients.filter((c) => c.status === "followup").length;
  const closedCount = clients.filter((c) => c.status === "closed_won").length;
  const totalPipelineValue = clients.reduce((sum, c) => sum + (c.contractValue || 0), 0);

  // Filtering
  const filteredClients = clients.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "lead":
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-extrabold uppercase">Inbound Lead</span>;
      case "followup":
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-extrabold uppercase">Follow-up Required</span>;
      case "proposal":
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-extrabold uppercase">Proposal Sent</span>;
      case "closed_won":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase">Closed / Won</span>;
      case "closed_lost":
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-extrabold uppercase">Closed / Lost</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-blue-400/30 text-xs font-bold text-blue-300 mb-2">
            <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
            <span>Admin CRM System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Client Portfolio & CRM Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track leads, follow-ups, proposal statuses, and total deal contract values.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* CRM Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Clients</span>
          <p className="text-3xl font-black text-white">{totalClients}</p>
          <span className="text-[11px] text-slate-500">Managed in CRM pipeline</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase">Active Follow-ups</span>
          <p className="text-3xl font-black text-amber-400">{followupCount}</p>
          <span className="text-[11px] text-slate-500">Pending client interactions</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase">Closed / Won Clients</span>
          <p className="text-3xl font-black text-emerald-400">{closedCount}</p>
          <span className="text-[11px] text-slate-500">Active contracts & accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-brand-blue uppercase">Pipeline Value</span>
          <p className="text-3xl font-black text-brand-blue">₹{totalPipelineValue.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-slate-500">Total deal contract value</span>
        </div>
      </div>

      {/* Controls: Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
          {[
            { id: "all", label: "All Clients" },
            { id: "lead", label: "Leads" },
            { id: "followup", label: "Follow-ups" },
            { id: "proposal", label: "Proposals" },
            { id: "closed_won", label: "Closed / Won" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-brand-blue text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by client or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-semibold focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Clients Grid / List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading CRM client portfolio...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400">
          <Briefcase className="w-10 h-10 mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-bold text-white mb-1">No Clients Found</p>
          <p className="text-xs">No client records match your current status filter or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white">{client.name}</h3>
                    <p className="text-xs font-bold text-brand-blue">{client.company}</p>
                  </div>
                  {getStatusBadge(client.status)}
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{client.phone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Service Interested</span>
                  <p className="text-xs font-semibold text-slate-200">{client.serviceInterested}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Contract Value:</span>
                  <span className="font-black text-emerald-400 text-sm">₹{(client.contractValue || 0).toLocaleString("en-IN")}</span>
                </div>

                {client.notes && (
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/60 text-xs text-slate-400 italic">
                    "{client.notes}"
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <select
                    value={client.status}
                    onChange={(e) => handleUpdateStatus(client, e.target.value as Client["status"])}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 focus:outline-none focus:border-brand-blue"
                  >
                    <option value="lead">Lead</option>
                    <option value="followup">Follow-up</option>
                    <option value="proposal">Proposal</option>
                    <option value="closed_won">Closed / Won</option>
                    <option value="closed_lost">Closed / Lost</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                  title="Delete Client Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">Add New Client to CRM</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Star Enterprises"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Client["status"] })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                  >
                    <option value="lead">Inbound Lead</option>
                    <option value="followup">Follow-up Required</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="closed_won">Closed / Won</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contract Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="150000"
                    value={formData.contractValue}
                    onChange={(e) => setFormData({ ...formData, contractValue: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Services Interested</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom Web App & Cloud Infrastructure"
                  value={formData.serviceInterested}
                  onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Client Notes / Details</label>
                <textarea
                  rows={3}
                  placeholder="Notes from initial discussion..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-md"
                >
                  Save Client Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
