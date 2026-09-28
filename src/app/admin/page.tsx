"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, MonitorPlay, Mail, BookOpen, Users, 
  ArrowRight, Loader2, RefreshCw, CheckCircle2, Clock, Briefcase, 
  TrendingUp, Activity, UserCheck, ShieldCheck, Sparkles, ArrowUpRight
} from "lucide-react";

export default function AdminDashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrollmentsCount: 0,
    demosCount: 0,
    messagesCount: 0,
    coursesCount: 0,
    instructorsCount: 0,
    clientsCount: 0,
    employeesCount: 0,
    tasksCount: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [enrollRes, demoRes, msgRes, courseRes, instRes, cliRes, empRes, taskRes] = await Promise.all([
        fetch("/api/admin/leads?type=enrollments"),
        fetch("/api/admin/leads?type=demos"),
        fetch("/api/admin/leads?type=messages"),
        fetch("/api/admin/courses"),
        fetch("/api/admin/instructors"),
        fetch("/api/admin/clients"),
        fetch("/api/admin/employees"),
        fetch("/api/admin/tasks"),
      ]);

      const [enrollData, demoData, msgData, courseData, instData, cliData, empData, taskData] = await Promise.all([
        enrollRes.json(),
        demoRes.json(),
        msgRes.json(),
        courseRes.json(),
        instRes.json(),
        cliRes.json(),
        empRes.json(),
        taskRes.json(),
      ]);

      const enrollments = enrollData.data || [];
      const demos = demoData.data || [];
      const messages = msgData.data || [];
      const courses = courseData.data || [];
      const instructors = instData.data || [];
      const clients = cliData.data || [];
      const employees = empData.data || [];
      const tasks = taskData.data || [];

      setStats({
        enrollmentsCount: enrollments.length,
        demosCount: demos.length,
        messagesCount: messages.length,
        coursesCount: courses.length,
        instructorsCount: instructors.length,
        clientsCount: clients.length,
        employeesCount: employees.length,
        tasksCount: tasks.length,
      });

      setRecentEnrollments(enrollments.slice(0, 5));
    } catch (err) {
      console.error("Failed loading admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "enrollments", status: newStatus }),
      });
      loadDashboardData();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Executive Hero Banner */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-blue-400/30 text-xs font-bold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>Executive Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            LearnBuild Hub Operations & CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl">
            Real-time control tower for student leads, enterprise clients, employee task assignment, and system metrics.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all border border-slate-700 flex items-center gap-2 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-brand-blue ${loading ? "animate-spin" : ""}`} />
            <span>Sync Metrics</span>
          </button>
          
          <Link
            href="/admin/clients"
            className="px-5 py-3 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>Open Client CRM</span>
          </Link>
        </div>
      </div>

      {/* Primary CRM & Enterprise Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total CRM Clients</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-brand-blue flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-white">{loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-600" /> : stats.clientsCount}</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.5%</span>
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Managed Accounts</span>
            <Link href="/admin/clients" className="text-brand-blue font-bold hover:underline flex items-center gap-0.5">
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Active Employees</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-white">{loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-600" /> : stats.employeesCount}</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Team Credentials</span>
            <Link href="/admin/employees" className="text-emerald-400 font-bold hover:underline flex items-center gap-0.5">
              <span>Manage</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Active Tasks</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-white">{loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-600" /> : stats.tasksCount}</span>
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
              <span>Deadlines Set</span>
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Tasks Engine</span>
            <Link href="/admin/tasks" className="text-purple-400 font-bold hover:underline flex items-center gap-0.5">
              <span>Assign</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Student Enrollments</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-white">{loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-600" /> : stats.enrollmentsCount}</span>
            <span className="text-xs font-bold text-amber-400">Live Leads</span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Inbound Pipeline</span>
            <Link href="/admin/enrollments" className="text-amber-400 font-bold hover:underline flex items-center gap-0.5">
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Management Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-brand-blue flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Client Portfolio & CRM</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Add new enterprise clients, manage deal status pipelines (Leads, Follow-ups, Proposals, Closed/Won), and record contract values.
            </p>
          </div>
          <Link
            href="/admin/clients"
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <span>Launch CRM Dashboard →</span>
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Employee Credentials</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Register team employees with designations, generate automated login email/password credentials, and manage team privileges.
            </p>
          </div>
          <Link
            href="/admin/employees"
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <span>Manage Employee Accounts →</span>
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Task Delegation Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Create task assignments with deadlines and priorities, delegate directly to assigned employees, and monitor completion progress.
            </p>
          </div>
          <Link
            href="/admin/tasks"
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <span>Assign Tasks & Deadlines →</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Recent Student Inquiries</h3>
            <p className="text-xs text-slate-400">Incoming course enrollments needing admin approval or follow-up.</p>
          </div>

          <Link
            href="/admin/enrollments"
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
            <p className="text-xs font-medium">Syncing activity logs...</p>
          </div>
        ) : recentEnrollments.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs font-medium">
            No inquiry records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Student Name</th>
                  <th className="p-3.5">Course Track</th>
                  <th className="p-3.5">Assigned Mentor</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right rounded-r-xl">Quick Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentEnrollments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{item.full_name}</div>
                      <div className="text-[11px] text-slate-400">{item.email} • {item.phone}</div>
                    </td>
                    <td className="p-3.5 font-bold text-brand-blue">{item.course_title}</td>
                    <td className="p-3.5 font-medium text-slate-300">{item.instructor_name || "Lead Instructor"}</td>
                    <td className="p-3.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === "approved" || item.status === "enrolled"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : item.status === "contacted"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {item.status || "pending"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(item.id, "contacted")}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold border border-slate-700 transition-colors"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "approved")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-colors"
                      >
                        Enrolled
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
