"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Lock, Mail, Briefcase, Loader2, AlertCircle, ArrowRight, CheckCircle2, ShieldCheck, Eye, EyeOff
} from "lucide-react";
import { loginUser } from "@/lib/supabase/auth";
import { Logo } from "@/components/common/Logo";

function EmployeeLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // Save employee email in localStorage for persistent session
      if (typeof window !== "undefined") {
        localStorage.removeItem("lb_admin_email");
        localStorage.setItem("lb_employee_email", email.trim().toLowerCase());
      }
      setSuccessMsg("Employee verified! Redirecting to Employee Dashboard...");
      setTimeout(() => router.push("/employee"), 800);
    } catch (err: any) {
      console.error("Employee login error:", err);
      setErrorMsg("Invalid credentials. Please check your assigned employee email and password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Logo showTagline={false} />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Employee Workbench Portal</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-1">
              Employee Sign In
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Access your assigned client tasks, deadlines, and project workflows.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="aman@learnbuildhub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Task Workbench</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-300">
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function EmployeeLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mb-2" />
          <span>Loading Employee Portal...</span>
        </div>
      }
    >
      <EmployeeLoginForm />
    </Suspense>
  );
}
