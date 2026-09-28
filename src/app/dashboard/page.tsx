"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, BookOpen, Award, CheckCircle2, Clock, 
  Search, Bell, ArrowRight, Play, Video, Loader2, Sparkles
} from "lucide-react";
import { getUserSession } from "@/lib/supabase/auth";

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Rahul Gupta");
  const [studentEmail, setStudentEmail] = useState("rahul@example.com");

  useEffect(() => {
    getUserSession().then((session) => {
      if (session?.user) {
        const email = session.user.email || "rahul@example.com";
        const name = session.user.user_metadata?.full_name || email.split("@")[0] || "Rahul Gupta";
        setStudentEmail(email);
        setStudentName(name);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome Back, {studentName} 👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Continue your learning journey.</p>
        </div>

        {/* Header Controls */}
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
            <span className="w-2 h-2 rounded-full bg-brand-blue absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">
              R
            </div>
            <div className="text-[11px] leading-tight hidden sm:block">
              <p className="font-bold text-slate-900">{studentName}</p>
              <p className="text-slate-500 font-medium">Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Enrolled Courses</span>
            <span className="text-2xl font-black text-slate-900">3</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">In Progress</span>
            <span className="text-2xl font-black text-blue-600">2</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Completed</span>
            <span className="text-2xl font-black text-emerald-600">1</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">Certificates</span>
            <span className="text-2xl font-black text-purple-600">1</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Row: My Courses & Upcoming Live Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">My Courses</h3>
            <Link href="/learn" className="text-xs font-bold text-brand-blue hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {/* Course 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {`</>`}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Full-Stack Web Development</h4>
                    <p className="text-[11px] text-slate-500 font-medium">HTML • CSS • JavaScript • React • Node</p>
                  </div>
                </div>

                <Link
                  href="/learn"
                  className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-brand-blue/20 self-start sm:self-auto"
                >
                  Continue
                </Link>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Progress</span>
                  <span className="text-brand-blue">65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full w-[65%]" />
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    Py
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Python for Beginners</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Python • Projects • Automation • Data</p>
                  </div>
                </div>

                <Link
                  href="/learn"
                  className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-brand-blue/20 self-start sm:self-auto"
                >
                  Continue
                </Link>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Progress</span>
                  <span className="text-brand-blue">30%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full w-[30%]" />
                </div>
              </div>
            </div>

            {/* Course 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    DM
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Digital Marketing & Growth</h4>
                    <p className="text-[11px] text-slate-500 font-medium">SEO • Social Media • Performance Ads</p>
                  </div>
                </div>

                <Link
                  href="/dashboard/certificates"
                  className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs border border-emerald-200 self-start sm:self-auto"
                >
                  View Certificate
                </Link>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Progress</span>
                  <span className="text-emerald-600">100% Completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Upcoming Live Classes</h3>
            <span className="text-xs font-bold text-brand-blue">View All</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { day: "26", month: "SEP", topic: "React Components & State", track: "Web Development", time: "5:00 PM - 6:00 PM" },
              { day: "27", month: "SEP", topic: "Python Automation Scripts", track: "Python for Beginners", time: "6:00 PM - 7:00 PM" },
              { day: "29", month: "SEP", topic: "Digital Marketing Campaign Optimization", track: "Digital Marketing", time: "5:00 PM - 6:00 PM" },
            ].map((cls, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black leading-none">{cls.day}</span>
                    <span className="text-[9px] font-bold uppercase">{cls.month}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{cls.topic}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{cls.track} • {cls.time}</p>
                  </div>
                </div>

                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs shadow-sm flex-shrink-0"
                >
                  Join
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements & Circular Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Announcements */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-black text-slate-900">Recent Announcements</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900">New course material uploaded for Web Development</p>
                <span className="text-[11px] text-slate-400 font-medium">2 days ago</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Live class schedule updated for this week</p>
                <span className="text-[11px] text-slate-400 font-medium">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Progress */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-black text-slate-900">Overall Track Progress</h3>
          <div className="flex items-center justify-around text-center pt-2">
            <div>
              <div className="w-14 h-14 rounded-full border-4 border-brand-blue flex items-center justify-center font-black text-xs text-slate-900 mx-auto mb-1">
                65%
              </div>
              <span className="text-[11px] font-bold text-slate-600 block">Web Dev</span>
            </div>
            <div>
              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 flex items-center justify-center font-black text-xs text-slate-900 mx-auto mb-1">
                30%
              </div>
              <span className="text-[11px] font-bold text-slate-600 block">Python</span>
            </div>
            <div>
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-xs text-slate-900 mx-auto mb-1">
                100%
              </div>
              <span className="text-[11px] font-bold text-slate-600 block">Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
