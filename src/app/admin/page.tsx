"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Briefcase, CheckSquare, GraduationCap, 
  TrendingUp, Search, Bell, Plus, ArrowRight, Loader2, RefreshCw, Clock
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
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">New Lead</span>;
      case "followup":
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">Follow-up</span>;
      case "discussion":
        return <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold">In Discussion</span>;
      case "proposal":
        return <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">Proposal</span>;
      case "closed_won":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">Closed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{status}</span>;
    }
  };

  const getTaskStatusBadge = (status: CRMTask["status"]) => {
    switch (status) {
      case "Pending":
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">Pending</span>;
      case "In Progress":
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">In Progress</span>;
      case "Completed":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome Back, Admin 👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Here's an overview of your business and team activity.</p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:bg-white"
            />
          </div>

          <button className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">
              A
            </div>
            <div className="text-[11px] leading-tight hidden sm:block">
              <p className="font-bold text-slate-900">Aryan Shrivastav</p>
              <p className="text-slate-500 font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Total Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{totalClientsCount}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">All business leads</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Follow-ups */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Follow-ups</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{followupCount}</span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                <span>+6%</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Pending follow-ups</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Closed Clients */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Closed Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{closedCount}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <span>+29%</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Successfully closed</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Total Employees */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Total Employees</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{totalEmployeesCount}</span>
            </div>
            <span className="text-[11px] text-slate-400">Active team members</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Row: Client Status Breakdown & Leads Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Client Status Donut Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Client Status Breakdown</h3>
            <span className="text-xs font-bold text-slate-400">Total {totalClientsCount}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            {/* Donut representation */}
            <div className="relative w-36 h-36 rounded-full border-[14 border-brand-blue flex items-center justify-center flex-shrink-0 bg-slate-50">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900 block">{totalClientsCount}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Clients</span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 text-xs w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  New Lead
                </span>
                <span className="font-bold text-slate-900">{newLeadCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Follow-up
                </span>
                <span className="font-bold text-slate-900">{followupCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  In Discussion
                </span>
                <span className="font-bold text-slate-900">{discussionCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  Proposal Sent
                </span>
                <span className="font-bold text-slate-900">{proposalCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Closed Won
                </span>
                <span className="font-bold text-slate-900">{closedCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Trend Graph Bar Mock */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Leads Acquisition Trend</h3>
            <span className="text-xs font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-lg">This Year</span>
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
                  className={`w-full rounded-t-lg transition-all ${
                    i === 8 ? "bg-brand-blue shadow-md" : "bg-blue-100 hover:bg-blue-200"
                  }`}
                />
                <span className="text-[10px] font-bold text-slate-500">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Clients & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients / Leads */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Recent Clients / Leads</h3>
            <Link href="/admin/clients" className="text-xs font-bold text-brand-blue hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Company</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.slice(0, 5).map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-bold text-slate-900">{client.name}</td>
                    <td className="p-2.5 font-medium text-slate-600">{client.company}</td>
                    <td className="p-2.5">{getStatusBadge(client.status)}</td>
                    <td className="p-2.5 text-right">
                      <Link
                        href={`/admin/clients/details?id=${client.id}`}
                        className="text-xs font-bold text-brand-blue hover:underline"
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
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Recent Tasks & Assignments</h3>
            <Link href="/admin/tasks" className="text-xs font-bold text-brand-blue hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Task</th>
                  <th className="p-2.5">Assigned To</th>
                  <th className="p-2.5">Due Date</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.slice(0, 5).map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-bold text-slate-900 truncate max-w-[140px]">{task.title}</td>
                    <td className="p-2.5 font-medium text-slate-600">{task.assignedEmployeeName}</td>
                    <td className="p-2.5 text-slate-500">{task.deadline}</td>
                    <td className="p-2.5">{getTaskStatusBadge(task.status)}</td>
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
