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
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-300" />
            <span>Website Contact Inquiries</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Contact Form Inbox Desk
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            View and respond to general website contact inquiries, customization queries, and business support messages.
          </p>
        </div>

        <button
          onClick={loadMessages}
          disabled={loading}
          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md cursor-pointer flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search sender name, email, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
          />
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
          No contact inquiries found in your inbox.
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
                      : "bg-blue-50 text-brand-blue border border-blue-200"
                  }`}>
                    {item.status || "unread"}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="text-slate-900">{item.name}</span>
                  <span className="text-slate-300">•</span>
                  <a href={`mailto:${item.email}`} className="text-brand-blue hover:underline">{item.email}</a>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 font-medium text-[11px]">{new Date(item.created_at).toLocaleString()}</span>
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {item.message}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-auto">
                <a
                  href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                  className="px-4 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md shadow-brand-blue/20"
                >
                  Reply via Email
                </a>

                <button
                  onClick={() => handleUpdateStatus(item.id, "replied")}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-emerald-700 font-bold text-xs transition-colors border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
