"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, CheckSquare, Users, Mail, Calendar, 
  User, LogOut, Briefcase, Menu, X, ExternalLink, ShieldCheck, UserCheck
} from "lucide-react";
import { Logo } from "@/components/common/Logo";

function ExpertSidebarContent({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  handleLogout 
}: { 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (v: boolean) => void; 
  handleLogout: () => void; 
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";

  const navItems = [
    { label: "Dashboard", href: "/employee", tab: "dashboard", icon: LayoutDashboard },
    { label: "My Tasks", href: "/employee?tab=tasks", tab: "tasks", icon: CheckSquare },
    { label: "My Students", href: "/employee?tab=students", tab: "students", icon: Users },
    { label: "Enquiries", href: "/employee?tab=enquiries", tab: "enquiries", icon: Mail },
    { label: "Calendar", href: "/employee?tab=calendar", tab: "calendar", icon: Calendar },
    { label: "Profile", href: "/employee?tab=profile", tab: "profile", icon: User },
  ];

  return (
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
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
              <UserCheck className="w-3 h-3 text-emerald-600" />
              <span>Expert</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-bold">Expert Mentor Portal</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = (item.tab === "dashboard" && (!currentTab || currentTab === "dashboard")) || currentTab === item.tab;
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-black"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 font-bold"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions & Profile */}
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
            <p className="font-bold text-slate-900 truncate text-[11px]">Expert Account</p>
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
  );
}

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Skip sidebar layout for login page
  if (pathname === "/employee/login") {
    return <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">{children}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("lb_employee_email");
    router.push("/employee/login");
  };

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

      {/* Desktop & Mobile Sidebar Shell */}
      <Suspense fallback={<div className="w-64 bg-white p-5 border-r border-slate-200">Loading sidebar...</div>}>
        <ExpertSidebarContent 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          handleLogout={handleLogout} 
        />
      </Suspense>

      {/* Main Employee Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
