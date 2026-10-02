"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, Edit3, Plus, Phone, Mail, Calendar, 
  UserCheck, CheckSquare, Clock, MessageSquare, Loader2, CheckCircle2, Briefcase, Building2
} from "lucide-react";
import { Client, CRMTask, INITIAL_CLIENTS, INITIAL_TASKS } from "@/lib/data/crm";

function ClientDetailsForm() {
  const searchParams = useSearchParams();
  const clientId = searchParams?.get("id") || "cli-101";

  const [client, setClient] = useState<Client | null>(null);
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "followups" | "tasks" | "notes">("overview");

  // New Follow-up note state
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resCli = await fetch("/api/admin/clients");
        const jsonCli = await resCli.json();
        let targetClient = null;
        if (jsonCli.success) {
          targetClient = jsonCli.data.find((c: Client) => c.id === clientId);
        }
        if (!targetClient) targetClient = INITIAL_CLIENTS[0];
        setClient(targetClient);

        const resTasks = await fetch("/api/admin/tasks");
        const jsonTasks = await resTasks.json();
        if (jsonTasks.success) {
          setTasks(jsonTasks.data.filter((t: CRMTask) => t.clientId === clientId || t.clientName === targetClient?.company));
        } else {
          setTasks(INITIAL_TASKS.filter((t) => t.clientId === clientId));
        }
      } catch (err) {
        console.error("Error loading client details:", err);
        setClient(INITIAL_CLIENTS[0]);
      }
      setLoading(false);
    };

    fetchData();
  }, [clientId]);

  const handleAddFollowup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !client) return;

    setAddingNote(true);
    const updatedHistory = [
      ...(client.followupHistory || []),
      {
        id: `f-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        note: newNote,
        addedBy: "Admin User",
      },
    ];

    const updatedClient = {
      ...client,
      followupHistory: updatedHistory,
      notes: newNote,
    };

    try {
      await fetch("/api/admin/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, notes: newNote }),
      });
      setClient(updatedClient);
      setNewNote("");
    } catch (err) {
      console.error("Error adding followup:", err);
    }
    setAddingNote(false);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
        <p className="text-xs font-medium">Loading client details...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Client record not found.</p>
        <Link href="/admin/clients" className="text-brand-blue font-bold hover:underline">
          Return to Clients List
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-brand-blue" />
          <span>Back to Clients Pipeline</span>
        </Link>

        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs uppercase tracking-wider">
          Status: {client.status}
        </span>
      </div>

      {/* Client Profile Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-200 mb-2">
            <Building2 className="w-4 h-4 text-blue-300" />
            <span>{client.company}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {client.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Interested Track: <strong className="text-white">{client.serviceInterested}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white">
            <span className="text-[10px] font-bold text-blue-200 uppercase block">Assigned Executive:</span>
            <span className="font-extrabold text-amber-300">{client.assignedEmployeeName || "Unassigned"}</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-slate-200/80 shadow-sm text-xs font-bold">
        {[
          { id: "overview", label: "Client Overview" },
          { id: "followups", label: "Follow-up Timeline" },
          { id: "tasks", label: "Assigned Tasks" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-black"
                : "text-slate-600 hover:text-brand-blue hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact & Deal Details Card */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
              Contact Information
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-bold block">Email Address:</span>
                <span className="font-bold text-brand-blue text-sm">{client.email}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Phone / WhatsApp:</span>
                <span className="font-bold text-slate-900 text-sm">{client.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Company / Business:</span>
                <span className="font-bold text-slate-900">{client.company}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Lead Source:</span>
                <span className="font-semibold text-slate-700">{client.source || "Website Enquiry"}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Est. Deal Value:</span>
                <span className="font-black text-emerald-600 text-base">₹{client.contractValue?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Discussion Notes & Summary */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
              Project Requirements & Discussion Summary
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {client.notes || "Client is looking for a comprehensive digital solution with custom admin dashboards and integrated workflow modules."}
            </p>

            {/* Quick Action to Add Followup */}
            <form onSubmit={handleAddFollowup} className="space-y-3 pt-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600">Log New Follow-up Note</label>
              <textarea
                rows={3}
                placeholder="Log discussion details or call summary..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15 resize-none"
              />
              <button
                type="submit"
                disabled={addingNote || !newNote.trim()}
                className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md disabled:opacity-50 cursor-pointer"
              >
                {addingNote ? "Saving Note..." : "Add Follow-up Note"}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "followups" && (
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
            Follow-up History Timeline
          </h3>

          <div className="space-y-3">
            {(client.followupHistory || []).map((f) => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-500 font-bold">
                  <span>{f.date}</span>
                  <span className="text-brand-blue">Logged by {f.addedBy}</span>
                </div>
                <p className="text-slate-800 font-medium text-xs leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
            Assigned Tasks for {client.company}
          </h3>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-black text-slate-900">{task.title}</h4>
                  <p className="text-slate-500 font-medium">{task.description}</p>
                  <p className="text-brand-blue font-bold pt-1">Assigned to: {task.assignedEmployeeName} • Due: {task.deadline}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientDetailsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading details...</div>}>
      <ClientDetailsForm />
    </Suspense>
  );
}
