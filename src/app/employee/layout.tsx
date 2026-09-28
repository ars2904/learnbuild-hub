"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, CheckSquare, Users, Mail, Calendar, 
  User, LogOut, Briefcase, Menu, X, ArrowLeft
} from "lucide-react";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Skip sidebar layout for login page
  if (pathname === "/employee/login") {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">{children}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("lb_employee_email");
    router.push("/employee/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/employee", icon: LayoutDashboard },
    { label: "My Tasks", href: "/employee", icon: CheckSquare },
    { label: "My Clients", href: "/admin/clients", icon: Users },
    { label: "Enquiries", href: "/admin/messages", icon: Mail },
    { label: "Calendar", href: "/employee", icon: Calendar },
    { label: "Profile", href: "/employee", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">
            LB
          </div>
          <span className="font-black text-sm tracking-tight text-white">Employee Workbench</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 font-black">
              LB
            </div>
            <div>
              <h1 className="font-black text-base text-white leading-none mb-1">LearnBuild Hub</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <Briefcase className="w-3 h-3" />
                <span>Employee Portal</span>
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === 0 && pathname === "/employee";
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
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

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Employee Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
