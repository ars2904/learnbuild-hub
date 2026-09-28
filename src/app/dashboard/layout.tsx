"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  GraduationCap, Users, Award, LogOut, ArrowLeft, 
  Menu, X, Sparkles, BookOpen
} from "lucide-react";
import { getUserSession, logoutUser } from "@/lib/supabase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    getUserSession().then((session) => {
      if (!session) {
        // Unauthenticated -> redirect to /login
        router.push("/login");
      } else {
        setUserEmail(session.user?.email || "");
        setUserName(session.user?.user_metadata?.full_name || session.user?.email?.split("@")[0] || "Student");
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  const navItems = [
    { label: "My Enrolled Tracks", href: "/dashboard", icon: GraduationCap },
    { label: "My Assigned Mentor", href: "/dashboard/mentors", icon: Users },
    { label: "Verified Certificates", href: "/dashboard/certificates", icon: Award },
    { label: "Browse Skill Tracks", href: "/learn", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white font-black text-xs">
            LB
          </div>
          <span className="font-black text-sm tracking-tight text-white">Student Portal</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-500 flex items-center justify-center text-white shadow-lg shadow-brand-blue/30 font-black">
              LB
            </div>
            <div>
              <h1 className="font-black text-base text-white leading-none mb-1">LearnBuild Hub</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-blue">
                <Sparkles className="w-3 h-3 text-brand-blue" />
                <span>Student Portal</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profile & Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Website</span>
          </Link>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <p className="font-bold text-white truncate text-xs">{userName || "Student"}</p>
              <p className="text-[11px] text-slate-400 truncate">{userEmail || "student@example.com"}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
