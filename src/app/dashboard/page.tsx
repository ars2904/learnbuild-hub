"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, Clock, CheckCircle2, 
  ArrowRight, UserCheck, BookOpen, Loader2, Sparkles
} from "lucide-react";
import { getUserSession } from "@/lib/supabase/auth";

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Student");
  const [studentEmail, setStudentEmail] = useState("");
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const session = await getUserSession();
      if (session?.user) {
        const email = session.user.email || "";
        const name = session.user.user_metadata?.full_name || email.split("@")[0] || "Student";
        setStudentEmail(email);
        setStudentName(name);

        // Fetch enrollments matching this email from Supabase
        try {
          const res = await fetch("/api/admin/leads?type=enrollments");
          const data = await res.json();
          const userLeads = (data.data || []).filter(
            (item: any) => item.email?.toLowerCase() === email.toLowerCase()
          );
          setEnrollments(userLeads);
        } catch (err) {
          console.error("Error fetching student enrollments:", err);
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-900/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-blue-400/30 text-xs font-bold text-blue-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Welcome back, {studentName}!</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            My Learning Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1">
            Track your course progress, view module topics, and connect with your 1-on-1 mentor.
          </p>
        </div>

        <Link
          href="/learn"
          className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse Skill Tracks</span>
        </Link>
      </div>

      {/* Enrolled Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-blue" />
            <span>Enrolled Skill Tracks</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">
            {enrollments.length} Active {enrollments.length === 1 ? "Track" : "Tracks"}
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
            <p className="text-xs font-medium">Loading your enrolled courses...</p>
          </div>
        ) : enrollments.length === 0 ? (
          /* Empty State if student hasn't enrolled in any track yet */
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-brand-blue flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-1">No Active Enrollments Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You haven't enrolled in a skill track yet. Explore our industry-aligned tracks and select your preferred 1-on-1 mentor!
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-md"
            >
              <span>Explore Learn Tracks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Enrolled Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase">
                      {item.status || "Enrolled"}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Submitted: {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2">{item.course_title}</h3>

                  {/* Assigned Mentor Card */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400">Assigned 1-on-1 Mentor:</span>
                      <span className="font-black text-brand-blue flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{item.instructor_name || "Senior Mentor"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar mock */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400">Curriculum Progress</span>
                    <span className="text-brand-blue">Module 1 / Active</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-brand-blue rounded-full w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Help & Mentorship Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-black text-white">Need 1-on-1 Mentor Guidance?</h4>
            <p className="text-xs text-slate-400">Book code review sessions or ask questions to your mentor.</p>
          </div>
        </div>

        <Link
          href="/dashboard/mentors"
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex-shrink-0"
        >
          View Mentor Details →
        </Link>
      </div>
    </div>
  );
}
