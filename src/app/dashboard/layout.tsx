"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  GraduationCap, Users, Award, LogOut, ExternalLink, 
  Menu, X, Sparkles, BookOpen, ShieldCheck
} from "lucide-react";
import { getUserSession, logoutUser } from "@/lib/supabase/auth";
import { Logo } from "@/components/common/Logo";

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
    { label: "My Assigned Expert", href: "/dashboard/mentors", icon: Users },
    { label: "Verified Certificates", href: "/dashboard/certificates", icon: Award },
    { label: "Browse Skill Tracks", href: "/learn", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden p-4 bg-white/95 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <Logo showTagline={false} />

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/95 border-r border-slate-200/80 p-5 flex flex-col justify-between backdrop-blur-xl shadow-sm transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-5 mb-5 border-b border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <Logo showTagline={false} />
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue">
                <Sparkles className="w-3 h-3 text-brand-blue" />
                <span>Student</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-bold">Student Learning Portal</p>
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
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs transition-all ${
                    isActive
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-black"
                      : "text-slate-600 hover:text-brand-blue hover:bg-blue-50/70 font-bold"
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profile & Actions */}
        <div className="pt-5 border-t border-slate-100 space-y-3">
          <Link
            href="/"
            className="w-full py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200 shadow-sm"
          >
            <span>Preview Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
          </Link>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Logged In</p>
              <p className="font-bold text-slate-900 truncate text-[11px]">{userName || "Student"}</p>
              <p className="text-[10px] text-slate-500 truncate">{userEmail || "student@learnbuildhub.com"}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors flex-shrink-0 border border-rose-200"
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
