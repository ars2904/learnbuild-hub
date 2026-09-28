"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CheckSquare, Calendar, UserCheck, Briefcase, 
  Clock, AlertTriangle, LogOut, Loader2, Sparkles, CheckCircle2
} from "lucide-react";
import { CRMTask, Employee } from "@/lib/data/crm";

export default function EmployeeDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [employeeEmail, setEmployeeEmail] = useState("aman@learnbuildhub.com");
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchEmployeeData = async (email: string) => {
    setLoading(true);
    try {
      const [resEmp, resTasks] = await Promise.all([
        fetch("/api/admin/employees"),
        fetch(`/api/admin/tasks?employeeEmail=${encodeURIComponent(email)}`),
      ]);

      const [jsonEmp, jsonTasks] = await Promise.all([
        resEmp.json(),
        resTasks.json(),
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
    } catch (err) {
      console.error("Error fetching employee tasks:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("lb_employee_email") || "aman@learnbuildhub.com";
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

  const filteredTasks = tasks.filter((t) => statusFilter === "all" || t.status === statusFilter);

  // Metrics
  const totalAssigned = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  const getPriorityBadge = (priority: CRMTask["priority"]) => {
    switch (priority) {
      case "Urgent":
        return <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase">Urgent Priority</span>;
      case "High":
        return <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase">High Priority</span>;
      case "Medium":
        return <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase">Medium Priority</span>;
      case "Low":
        return <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-[10px] font-black uppercase">Low Priority</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-10 font-sans space-y-8 max-w-7xl mx-auto">
      {/* Top Employee Profile Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-300 mb-3">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Employee Workbench</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Welcome, {employeeInfo?.name || "Employee"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
            {employeeInfo?.designation || "Team Member"} • <span className="text-brand-blue">{employeeInfo?.department || "Engineering"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-right hidden sm:block">
            <p className="text-slate-400 font-medium">Logged in work email:</p>
            <p className="font-bold text-emerald-400 truncate">{employeeEmail}</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 border border-rose-500/20 transition-all flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Assigned Tasks</span>
          <p className="text-3xl font-black text-white">{totalAssigned}</p>
          <span className="text-[11px] text-slate-500">Total assigned to you</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-blue-400 uppercase">In Progress</span>
          <p className="text-3xl font-black text-blue-400">{inProgressCount}</p>
          <span className="text-[11px] text-slate-500">Currently active tasks</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase">Pending Review</span>
          <p className="text-3xl font-black text-amber-400">{pendingCount}</p>
          <span className="text-[11px] text-slate-500">Awaiting execution</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase">Completed</span>
          <p className="text-3xl font-black text-emerald-400">{completedCount}</p>
          <span className="text-[11px] text-slate-500">Finished tasks</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
        {[
          { id: "all", label: "My Tasks" },
          { id: "Pending", label: "Pending" },
          { id: "In Progress", label: "In Progress" },
          { id: "Under Review", label: "Under Review" },
          { id: "Completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === tab.id
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assigned Tasks Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-emerald-400" />
          <p className="text-xs font-medium">Loading your assigned tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-2">
          <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400/40" />
          <h3 className="text-lg font-black text-white">All Caught Up!</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You currently have no assigned tasks matching this filter. Great job!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-white">{task.title}</h3>
                  {getPriorityBadge(task.priority)}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {task.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      <span>Associated Client:</span>
                    </span>
                    <span className="font-extrabold text-white">{task.clientName || "Internal"}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Completion Deadline:</span>
                    </span>
                    <span className="font-extrabold text-amber-400">{task.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400">Update Task Progress:</span>
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task, e.target.value as CRMTask["status"])}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-extrabold text-emerald-400 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed ✓</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
