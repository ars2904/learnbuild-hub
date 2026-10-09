import React from 'react';
import { ArrowRight, Award, Users, BookOpen, Bell } from 'lucide-react';

export default function SchoolDemoPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Notice Ticker */}
      <div className="bg-amber-500 text-slate-900 py-2.5 px-4 flex items-center shadow-inner overflow-hidden">
        <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-xs bg-amber-600 text-white px-3 py-1 rounded shrink-0 z-10">
          <Bell className="w-4 h-4"/>
          <span>Notice Board</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap relative w-full ml-4">
          <p className="text-xs sm:text-sm font-medium animate-marquee">
            📢 Admissions Open for Academic Session 2026-27 • 🏆 Annual Sports Meet on 15th November • 📝 Exam Timetable Released on Portal
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6">
            <Award className="w-4 h-4"/>
            <span>Ranked Among Top CBSE Schools in Uttar Pradesh</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Empowering Minds, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Shaping Future Leaders
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            Welcome to Sunrise Public School. We provide world-class education, state-of-the-art smart labs, and a holistic environment focused on academic excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer">
              <span>Admissions Open 2026</span>
              <ArrowRight className="w-4 h-4"/>
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-slate-800 max-w-2xl">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">25+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Years of Excellence</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">100%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Board Result Record</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">40+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Expert Faculty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
