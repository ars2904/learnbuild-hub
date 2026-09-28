"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, GraduationCap, MonitorPlay, Mail, 
  BookOpen, Users, LogOut, ShieldCheck, Menu, X, ArrowLeft,
  Briefcase, UserCheck, CheckSquare
} from "lucide-react";
import { getAdminSession, logoutAdmin } from "@/lib/supabase/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Skip auth check if currently on /admin/login page
    if (pathname === "/admin/login") return;

    getAdminSession().then((session) => {
      if (!session) {
        // Redirect to login if unauthenticated
        router.push("/admin/login");
      } else {
        setUserEmail(session.user?.email || "Admin User");
      }
    });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">{children}</div>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Clients / Leads", href: "/admin/clients", icon: Briefcase },
    { label: "Employees", href: "/admin/employees", icon: UserCheck },
    { label: "Tasks", href: "/admin/tasks", icon: CheckSquare },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Enquiries", href: "/admin/messages", icon: Mail },
    { label: "Demo Requests", href: "/admin/demos", icon: MonitorPlay },
    { label: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white font-black text-xs">
            LB
          </div>
          <span className="font-black text-sm tracking-tight text-white">LearnBuild Admin</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop & Mobile Sidebar */}
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
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin CMS</span>
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
            target="_blank"
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </Link>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Logged In</p>
              <p className="font-bold text-white truncate text-[11px]">{userEmail || "Admin User"}</p>
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

      {/* Main Content Body */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
