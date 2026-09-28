"use client";

import React, { useState, useEffect } from "react";
import { Mail, Loader2, RefreshCw, Search, CheckCircle2 } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredMessages = messages.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Mail className="w-8 h-8 text-emerald-400" />
            <span>Contact Form Inbox Desk</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">View and respond to general contact form inquiries submitted from the website.</p>
        </div>

        <button
          onClick={loadMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors self-start sm:self-auto border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search sender name, email, or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-medium focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Messages List Cards */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-emerald-400" />
          <p className="text-xs font-medium">Loading inbox messages from Supabase...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs font-medium">
          No contact inquiries found in your inbox.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-black text-white text-base">{item.subject}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    item.status === "replied"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}>
                    {item.status || "unread"}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <span>{item.name}</span>
                  <span className="text-slate-600">•</span>
                  <a href={`mailto:${item.email}`} className="text-brand-blue hover:underline">{item.email}</a>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500 text-[11px]">{new Date(item.created_at).toLocaleString()}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/50 p-3 rounded-2xl border border-slate-800/80">
                  {item.message}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                  className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs transition-colors shadow-md shadow-brand-blue/20"
                >
                  Reply via Email
                </a>

                <button
                  onClick={() => handleUpdateStatus(item.id, "replied")}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs transition-colors border border-slate-700 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Replied</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
