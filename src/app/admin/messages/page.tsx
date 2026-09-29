"use client";

import React, { useState, useEffect } from "react";
import { 
  Mail, Loader2, RefreshCw, Search, CheckCircle2, 
  Plus, Trash2, X, MessageSquare, Send, Sparkles, Phone 
} from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMsgForWhatsApp, setSelectedMsgForWhatsApp] = useState<any | null>(null);
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState("");

  // Form State for Add Inquiry
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads?type=messages");
      const data = await res.json();
      setMessages(data.data || []);
    } catch (err) {
      console.error("Failed loading contact messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "messages", status: newStatus }),
      });
      loadMessages();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact inquiry record?")) return;
    try {
      await fetch(`/api/admin/leads?type=messages&id=${id}`, { method: "DELETE" });
      loadMessages();
    } catch (err) {
      console.error("Delete message error:", err);
    }
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        loadMessages();
      }
    } catch (err) {
      console.error("Create contact message error:", err);
    }
  };

  // WhatsApp Pre-filled Message Helper
  const openWhatsAppModal = (item: any) => {
    setSelectedMsgForWhatsApp(item);
    const prefilledText = `Hello ${item.name || ''} 👋,

Thank you for reaching out to LearnBuild Hub regarding "*${item.subject || 'Your Inquiry'}*".

📌 *Your Inquiry:* "${item.message || ''}"

Our client solutions team is reviewing your query. Please let us know if you have any additional questions!`;

    setCustomWhatsAppMsg(prefilledText);
  };

  const triggerSendWhatsApp = () => {
    if (!selectedMsgForWhatsApp) return;
    const cleanPhone = (selectedMsgForWhatsApp.phone || "").replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWhatsAppMsg)}`;
    window.open(url, "_blank");
  };

  const filteredMessages = messages.filter((item) => {
    const matchesStatus = statusFilter === "all" || (item.status || "unread") === statusFilter;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-300" />
            <span>Website Contact Desk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Contact Form Inbox Desk
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            View, log offline inquiries, respond via Email or WhatsApp, and manage inquiry statuses.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inquiry</span>
          </button>

          <button
            onClick={loadMessages}
            disabled={loading}
            className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search sender, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold w-full sm:w-auto">
          {[
            { id: "all", label: "All Inbox" },
            { id: "unread", label: "Unread" },
            { id: "replied", label: "Replied" },
            { id: "contacted", label: "Contacted" },
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

      {/* Messages List Cards */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading inbox messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500 text-xs font-bold">
          No contact inquiries found in your inbox matching your filters.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-black text-slate-900 text-base">{item.subject}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    item.status === "replied"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : item.status === "contacted"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-blue-50 text-brand-blue border border-blue-200"
                  }`}>
                    {item.status || "unread"}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="text-slate-900">{item.name}</span>
                  <span className="text-slate-300">•</span>
                  <a href={`mailto:${item.email}`} className="text-brand-blue hover:underline">{item.email}</a>
                  {item.phone && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-700 font-bold">{item.phone}</span>
                    </>
                  )}
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 font-medium text-[11px]">{new Date(item.created_at).toLocaleString()}</span>
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {item.message}
                </p>
              </div>

              {/* Actions Toolbar */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-auto">
                <a
                  href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                  className="px-4 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md shadow-brand-blue/20"
                >
                  Reply Email
                </a>

                {item.phone && (
                  <button
                    onClick={() => openWhatsAppModal(item)}
                    className="p-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                    title="Contact via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </button>
                )}

                <button
                  onClick={() => handleUpdateStatus(item.id, "replied")}
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-emerald-700 font-bold text-xs transition-colors border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Replied</span>
                </button>

                <button
                  onClick={() => handleDeleteMessage(item.id)}
                  className="p-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MANUAL ADD INQUIRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Add Manual Contact Inquiry</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Sender Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Gupta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="suresh@techventures.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Phone / WhatsApp (Optional)</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Inquiry Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom ERP & CRM Solution Query"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Inquiry Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Inquiry message content..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                  Save Contact Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP PRE-FILLED MESSAGE CUSTOMIZER MODAL */}
      {selectedMsgForWhatsApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-black text-slate-900">WhatsApp Inquiry Response</h3>
              </div>
              <button
                onClick={() => setSelectedMsgForWhatsApp(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-xs text-slate-800">
              <span className="font-bold text-emerald-800 block">Sender: {selectedMsgForWhatsApp.name}</span>
              <p><strong>Subject:</strong> {selectedMsgForWhatsApp.subject}</p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                Preview & Edit WhatsApp Pre-filled Message Below
              </label>
              <textarea
                rows={6}
                value={customWhatsAppMsg}
                onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium leading-relaxed focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedMsgForWhatsApp(null)}
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
