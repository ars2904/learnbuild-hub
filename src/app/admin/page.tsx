"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Briefcase, CheckSquare, GraduationCap, 
  TrendingUp, Search, Bell, Plus, ArrowRight, Loader2, RefreshCw, Clock, ShieldCheck, Sparkles
} from "lucide-react";
import { Client, CRMTask, Employee } from "@/lib/data/crm";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resCli, resTasks, resEmp] = await Promise.all([
        fetch("/api/admin/clients"),
        fetch("/api/admin/tasks"),
        fetch("/api/admin/employees"),
      ]);

      const [dataCli, dataTasks, dataEmp] = await Promise.all([
        resCli.json(),
        resTasks.json(),
        resEmp.json(),
      ]);

      if (dataCli.success) setClients(dataCli.data);
      if (dataTasks.success) setTasks(dataTasks.data);
      if (dataEmp.success) setEmployees(dataEmp.data);
    } catch (err) {
      console.error("Error loading admin CRM overview data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Metrics
  const totalClientsCount = clients.length;
  const followupCount = clients.filter((c) => c.status === "followup").length;
  const closedCount = clients.filter((c) => c.status === "closed_won").length;
  const totalEmployeesCount = employees.length;

  // Breakdown Counts
  const newLeadCount = clients.filter((c) => c.status === "lead").length;
  const discussionCount = clients.filter((c) => c.status === "discussion").length;
  const proposalCount = clients.filter((c) => c.status === "proposal").length;

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "lead":
        return <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-[10px] font-black uppercase">New Lead</span>;
      case "followup":
        return <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase">Follow-up</span>;
      case "discussion":
        return <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-black uppercase">In Discussion</span>;
      case "proposal":
        return <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-black uppercase">Proposal</span>;
      case "closed_won":
        return <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase">Closed Won</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-black uppercase">{status}</span>;
    }
  };

  const getTaskStatusBadge = (status: CRMTask["status"]) => {
    switch (status) {
      case "Pending":
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase">Pending</span>;
      case "In Progress":
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-[10px] font-black uppercase">In Progress</span>;
      case "Completed":
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase">Completed</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-black uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>LearnBuild Hub Executive Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            Welcome Back, Admin 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-normal max-w-xl">
            Real-time business telemetry, client acquisition metrics, employee task assignments, and active build solutions.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Overview</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Clients */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Total Clients / Leads</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalClientsCount}</span>
              {totalClientsCount > 0 ? (
                <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <TrendingUp className="w-3 h-3" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  0 Leads
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Acquired lead accounts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Follow-ups */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Active Follow-ups</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{followupCount}</span>
              <span className="text-xs font-extrabold text-amber-600 flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <span>Pending</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Scheduled callbacks</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Closed Clients */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Closed Won</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{closedCount}</span>
              <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span>Success</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Deals finalized</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Total Active Employees */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Team Directory</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalEmployeesCount}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Active staff accounts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Client Status Donut Breakdown */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-black text-slate-900">Client Status Breakdown</h3>
            <span className="text-xs font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Total {totalClientsCount}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            {/* Donut graphic */}
            <div className="relative w-36 h-36 rounded-full border-[12px] border-brand-blue flex items-center justify-center flex-shrink-0 bg-slate-50 shadow-inner">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900 block">{totalClientsCount}</span>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Clients</span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs w-full">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="flex items-center gap-2 text-slate-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  New Lead
                </span>
                <span className="font-black text-slate-900">{newLeadCount}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="flex items-center gap-2 text-slate-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Follow-up
                </span>
                <span className="font-black text-slate-900">{followupCount}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="flex items-center gap-2 text-slate-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  In Discussion
                </span>
                <span className="font-black text-slate-900">{discussionCount}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="flex items-center gap-2 text-slate-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  Proposal Sent
                </span>
                <span className="font-black text-slate-900">{proposalCount}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="flex items-center gap-2 text-slate-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Closed Won
                </span>
                <span className="font-black text-slate-900">{closedCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Acquisition Bar Trend Chart */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-black text-slate-900">Leads Acquisition Trend</h3>
            <span className="text-xs font-extrabold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              2026 Growth
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
            {[
              { month: "Jan", val: 15 },
              { month: "Feb", val: 22 },
              { month: "Mar", val: 18 },
              { month: "Apr", val: 28 },
              { month: "May", val: 32 },
              { month: "Jun", val: 25 },
              { month: "Jul", val: 35 },
              { month: "Aug", val: 42 },
              { month: "Sep", val: 48 },
            ].map((bar, i) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  style={{ height: `${(bar.val / 50) * 100}%` }}
                  className={`w-full rounded-t-xl transition-all ${
                    i === 8 ? "bg-brand-blue shadow-md" : "bg-blue-100 hover:bg-blue-200"
                  }`}
                />
                <span className="text-[10px] font-bold text-slate-500">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Clients & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">Recent Clients / Leads</h3>
            <Link href="/admin/clients" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.slice(0, 5).map((client) => (
                  <tr key={client.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3 font-black text-slate-900">{client.name}</td>
                    <td className="p-3 font-semibold text-slate-600">{client.company}</td>
                    <td className="p-3">{getStatusBadge(client.status)}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/clients/details?id=${client.id}`}
                        className="text-xs font-extrabold text-brand-blue hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">Recent Tasks & Assignments</h3>
            <Link href="/admin/tasks" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Task Title</th>
                  <th className="p-3">Assigned To</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.slice(0, 5).map((task) => (
                  <tr key={task.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3 font-black text-slate-900 truncate max-w-[140px]">{task.title}</td>
                    <td className="p-3 font-semibold text-slate-600">{task.assignedEmployeeName}</td>
                    <td className="p-3 text-slate-500 font-medium">{task.deadline}</td>
                    <td className="p-3">{getTaskStatusBadge(task.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
