"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CheckSquare, Calendar, UserCheck, Briefcase, 
  Clock, AlertTriangle, LogOut, Loader2, Sparkles, CheckCircle2,
  Search, Bell, Plus, MessageSquare, Phone, ArrowRight, User
} from "lucide-react";
import { CRMTask, Employee, Client } from "@/lib/data/crm";

export default function EmployeeDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [employeeEmail, setEmployeeEmail] = useState("sneha@learnbuildhub.com");
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [myClients, setMyClients] = useState<Client[]>([]);

  const fetchEmployeeData = async (email: string) => {
    setLoading(true);
    try {
      const [resEmp, resTasks, resCli] = await Promise.all([
        fetch("/api/admin/employees"),
        fetch(`/api/admin/tasks?employeeEmail=${encodeURIComponent(email)}`),
        fetch("/api/admin/clients"),
      ]);

      const [jsonEmp, jsonTasks, jsonCli] = await Promise.all([
        resEmp.json(),
        resTasks.json(),
        resCli.json(),
      ]);

      if (jsonEmp.success) {
        const found = jsonEmp.data.find(
          (e: Employee) => e.email.toLowerCase() === email.toLowerCase()
        );
        if (found) {
          setEmployeeInfo(found);
        } else if (jsonEmp.data.length > 0) {
          setEmployeeInfo(jsonEmp.data[0]);
        }
      }

      if (jsonTasks.success) {
        setTasks(jsonTasks.data);
      }

      if (jsonCli.success) {
        setMyClients(jsonCli.data);
      }
    } catch (err) {
      console.error("Error fetching employee dashboard data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("lb_employee_email") || "sneha@learnbuildhub.com";
    setEmployeeEmail(storedEmail);
    fetchEmployeeData(storedEmail);
  }, []);

  const handleUpdateStatus = async (task: CRMTask, newStatus: CRMTask["status"]) => {
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchEmployeeData(employeeEmail);
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("lb_employee_email");
    router.push("/employee/login");
  };

  // Metrics
  const totalAssigned = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  const getStatusBadge = (status: CRMTask["status"]) => {
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
            <span>Welcome, {employeeInfo?.name || "Sneha"} 👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Here are your tasks, clients and updates for today.</p>
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
            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
              S
            </div>
            <div className="text-[11px] leading-tight hidden sm:block">
              <p className="font-bold text-slate-900">{employeeInfo?.name || "Sneha Sharma"}</p>
              <p className="text-slate-500 font-medium">Employee</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">My Tasks</span>
            <span className="text-2xl font-black text-slate-900">{totalAssigned}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Total assigned</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Pending</span>
            <span className="text-2xl font-black text-amber-600">{pendingCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">To be completed</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">In Progress</span>
            <span className="text-2xl font-black text-blue-600">{inProgressCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Currently working</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Completed</span>
            <span className="text-2xl font-black text-emerald-600">{completedCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">This week</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Row: Today's Tasks & My Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Tasks Table */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Today's Tasks</h3>
            <span className="text-xs font-bold text-brand-blue">View All</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Client</th>
                  <th className="p-2.5">Due Date</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((task, idx) => (
                  <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-2.5 font-bold text-slate-900">{task.title}</td>
                    <td className="p-2.5 font-medium text-slate-600">{task.clientName || "General"}</td>
                    <td className="p-2.5 text-slate-500">{task.deadline}</td>
                    <td className="p-2.5">{getStatusBadge(task.status)}</td>
                    <td className="p-2.5 text-right">
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateStatus(task, e.target.value as CRMTask["status"])}
                        className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed ✓</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Clients List */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">My Clients</h3>
            <span className="text-xs font-bold text-brand-blue">View All</span>
          </div>

          <div className="space-y-3">
            {myClients.slice(0, 4).map((cli) => (
              <div key={cli.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                    {cli.company.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs">{cli.company}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{cli.serviceInterested}</p>
                  </div>
                </div>

                <Link
                  href={`/admin/clients/details?id=${cli.id}`}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold uppercase border border-amber-200 hover:bg-amber-100"
                >
                  {cli.status}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Row: Upcoming Deadlines & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Upcoming Deadlines</h3>
            <span className="text-xs font-bold text-brand-blue">View All</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {tasks.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 font-bold text-[10px]">
                    {t.deadline}
                  </span>
                  <span className="font-bold text-slate-900">{t.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-3 text-xs font-bold">
            <button className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center gap-2 transition-all text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Update Task Status</span>
            </button>

            <button className="p-3.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-2 transition-all text-left">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Add Note</span>
            </button>

            <button className="p-3.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center gap-2 transition-all text-left">
              <Phone className="w-4 h-4 text-purple-600" />
              <span>Contact Client</span>
            </button>

            <Link href="/admin/clients" className="p-3.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-2 transition-all text-left">
              <User className="w-4 h-4 text-amber-600" />
              <span>View Client Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
