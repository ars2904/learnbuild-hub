"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, Edit, Plus, Phone, Mail, Calendar, 
  UserCheck, CheckSquare, Clock, MessageSquare, Loader2, CheckCircle2
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
        if (jsonCli.success) {
          const found = jsonCli.data.find((c: Client) => c.id === clientId);
          if (found) {
            setClient(found);
          } else {
            setClient(INITIAL_CLIENTS[0]);
          }
        } else {
          setClient(INITIAL_CLIENTS[0]);
        }

        const resTasks = await fetch("/api/admin/tasks");
        const jsonTasks = await resTasks.json();
        if (jsonTasks.success) {
          setTasks(jsonTasks.data.filter((t: CRMTask) => t.clientId === clientId || t.clientName === (client?.company || "ABC Pvt Ltd")));
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
    if (!newNote || !client) return;

    const newRecord = {
      id: `f-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      note: newNote,
      addedBy: client.assignedEmployeeName || "Admin",
    };

    const updatedHistory = [newRecord, ...(client.followupHistory || [])];
    const updatedClient = { ...client, followupHistory: updatedHistory, notes: newNote };
    setClient(updatedClient);
    setNewNote("");
    setAddingNote(false);

    try {
      await fetch("/api/admin/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, notes: newNote }),
      });
    } catch (err) {
      console.error("Error saving followup note:", err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
        <p className="text-xs font-medium">Loading client CRM record...</p>
      </div>
    );
  }

  const targetClient = client || INITIAL_CLIENTS[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Link href="/admin/clients" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link href="/admin/clients" className="hover:underline">Clients</Link>
              <span>/</span>
              <span className="text-slate-900">{targetClient.company}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{targetClient.company}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setAddingNote(!addingNote)}
            className="px-4 py-2.5 rounded-xl bg-blue-50 text-brand-blue hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>+ Log Follow-up</span>
          </button>
          <Link
            href="/admin/tasks"
            className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-brand-blue/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Task</span>
          </Link>
        </div>
      </div>

      {/* Header Info Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900">{targetClient.company}</h2>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase">
              {targetClient.status}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold uppercase">
              Hot Lead
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">{targetClient.serviceInterested}</p>
        </div>

        <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="text-slate-400 font-medium block">Contact Director:</span>
            <span className="font-bold text-slate-900 text-sm">{targetClient.name}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Phone:</span>
            <span className="font-bold text-slate-900">{targetClient.phone}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Email:</span>
            <span className="font-bold text-brand-blue">{targetClient.email}</span>
          </div>
        </div>
      </div>

      {/* Add Follow-up Note Form Popup */}
      {addingNote && (
        <form onSubmit={handleAddFollowup} className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
          <h4 className="text-xs font-black text-slate-900">Log New Client Follow-up Interaction</h4>
          <textarea
            rows={2}
            required
            placeholder="Enter follow-up call notes, client requirements, or next steps..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddingNote(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-brand-blue text-white font-bold text-xs shadow-md"
            >
              Save Interaction
            </button>
          </div>
        </form>
      )}

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        {[
          { id: "overview", label: "Overview" },
          { id: "followups", label: "Follow-ups" },
          { id: "tasks", label: "Tasks" },
          { id: "notes", label: "Notes" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 transition-all ${
              activeTab === tab.id
                ? "text-brand-blue border-b-2 border-brand-blue font-black"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Details Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Client Information */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900">Client Information</h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Company Name</span>
              <span className="font-bold text-slate-900">{targetClient.company}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Contact Person</span>
              <span className="font-bold text-slate-900">{targetClient.name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Email Address</span>
              <span className="font-bold text-brand-blue">{targetClient.email}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Phone Number</span>
              <span className="font-bold text-slate-900">{targetClient.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Service Interested</span>
              <span className="font-bold text-slate-900">{targetClient.serviceInterested}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Lead Source</span>
              <span className="font-bold text-slate-900">{targetClient.source || "Website Enquiry"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Lead Status</span>
              <span className="font-bold text-amber-600 uppercase">{targetClient.status}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Next Follow-up Date</span>
              <span className="font-bold text-slate-900">{targetClient.nextFollowup || "2026-09-28"}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium block mb-1">Additional Details & Requirement Notes</span>
            <p className="p-3 rounded-xl bg-slate-50 text-slate-700 font-normal leading-relaxed">
              {targetClient.notes || "Need a company website with custom admin panel and project tracking integration."}
            </p>
          </div>
        </div>

        {/* Right Column: Assigned To & Follow-up History & Tasks */}
        <div className="lg:col-span-5 space-y-6">
          {/* Assigned To Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                SS
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Assigned Executive</span>
                <h4 className="font-black text-slate-900 text-sm">{targetClient.assignedEmployeeName || "Sneha Sharma"}</h4>
                <p className="text-[11px] text-slate-500 font-medium">Sales & Client Executive</p>
              </div>
            </div>

            <button className="text-xs font-bold text-brand-blue hover:underline">
              Change
            </button>
          </div>

          {/* Follow-up History Timeline */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900">Follow-up History</h4>
              <button onClick={() => setAddingNote(true)} className="text-xs font-bold text-brand-blue hover:underline">
                + Add
              </button>
            </div>

            <div className="space-y-3 text-xs pt-1">
              {(targetClient.followupHistory && targetClient.followupHistory.length > 0
                ? targetClient.followupHistory
                : [
                    { id: "1", date: "23 Sep 2026", note: "Initial call with client. Discussed requirements.", addedBy: "Sneha Sharma" },
                    { id: "2", date: "20 Sep 2026", note: "Sent company profile and portfolio deck.", addedBy: "Sneha Sharma" },
                    { id: "3", date: "18 Sep 2026", note: "Client showed interest, will follow up next week.", addedBy: "Sneha Sharma" },
                  ]
              ).map((rec) => (
                <div key={rec.id} className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-0">
                  <span className="w-2 h-2 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">{rec.date}</span>
                    <p className="text-slate-700 font-medium">{rec.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tasks */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900">Related Tasks</h4>
              <Link href="/admin/tasks" className="text-xs font-bold text-brand-blue hover:underline">
                + Add
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { title: "Call client for detailed requirements", date: "28 Sep" },
                { title: "Send proposal & scope document", date: "29 Sep" },
                { title: "Prepare quotation breakdown", date: "30 Sep" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-brand-blue" />
                    <span className="font-semibold text-slate-800">{task.title}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">{task.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ClientDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-500 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-brand-blue mb-2 mx-auto" />
          <span>Loading Client Record...</span>
        </div>
      }
    >
      <ClientDetailsForm />
    </Suspense>
  );
}
