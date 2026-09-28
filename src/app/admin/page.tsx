"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, MonitorPlay, Mail, BookOpen, Users, 
  ArrowRight, Loader2, RefreshCw, CheckCircle2, Clock
} from "lucide-react";

export default function AdminDashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrollmentsCount: 0,
    demosCount: 0,
    messagesCount: 0,
    coursesCount: 0,
    instructorsCount: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [enrollRes, demoRes, msgRes, courseRes, instRes] = await Promise.all([
        fetch("/api/admin/leads?type=enrollments"),
        fetch("/api/admin/leads?type=demos"),
        fetch("/api/admin/leads?type=messages"),
        fetch("/api/admin/courses"),
        fetch("/api/admin/instructors"),
      ]);

      const [enrollData, demoData, msgData, courseData, instData] = await Promise.all([
        enrollRes.json(),
        demoRes.json(),
        msgRes.json(),
        courseRes.json(),
        instRes.json(),
      ]);

      const enrollments = enrollData.data || [];
      const demos = demoData.data || [];
      const messages = msgData.data || [];
      const courses = courseData.data || [];
      const instructors = instData.data || [];

      setStats({
        enrollmentsCount: enrollments.length,
        demosCount: demos.length,
        messagesCount: messages.length,
        coursesCount: courses.length,
        instructorsCount: instructors.length,
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
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Overview</h1>
          <p className="text-xs text-slate-400 font-medium">Real-time metrics, student leads & content management.</p>
        </div>

        <button
          onClick={loadDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors self-start sm:self-auto border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Student Enrollments", count: stats.enrollmentsCount, icon: GraduationCap, color: "text-brand-blue", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Demo Requests", count: stats.demosCount, icon: MonitorPlay, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Contact Inquiries", count: stats.messagesCount, icon: Mail, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Active Courses", count: stats.coursesCount, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
          { label: "Active Instructors", count: stats.instructorsCount, icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`p-5 rounded-2xl border ${card.bg} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{card.label}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-3xl font-black text-white">
                {loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-600" /> : card.count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-lg font-black text-white mb-1">Content Management System (CMS)</h3>
          <p className="text-xs text-slate-300">Create or update course tracks, edit mentor bios, or manage student leads.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/courses"
            className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs transition-all shadow-md shadow-brand-blue/30 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Manage Courses</span>
          </Link>

          <Link
            href="/admin/instructors"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition-all border border-slate-700 flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Mentors</span>
          </Link>
        </div>
      </div>

      {/* Recent Student Enrollments Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Recent Student Enrollments</h3>
            <p className="text-xs text-slate-400">Latest course inquiries submitted by prospective students.</p>
          </div>

          <Link
            href="/admin/enrollments"
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
            <p className="text-xs font-medium">Loading recent leads...</p>
          </div>
        ) : recentEnrollments.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs font-medium">
            No enrollment inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Course Track</th>
                  <th className="p-3">Assigned Mentor</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentEnrollments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white">{item.full_name}</div>
                      <div className="text-[11px] text-slate-400">{item.email} • {item.phone}</div>
                    </td>
                    <td className="p-3 font-semibold text-brand-blue">{item.course_title}</td>
                    <td className="p-3 font-medium text-slate-300">{item.instructor_name || "Any Available"}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === "approved" || item.status === "enrolled"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : item.status === "contacted"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {item.status || "pending"}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(item.id, "contacted")}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold border border-slate-700"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "approved")}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
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
