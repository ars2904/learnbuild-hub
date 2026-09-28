"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail, Loader2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { loginStudent } from "@/lib/supabase/auth";

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await loginStudent(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Student login error:", err);
      setErrorMsg(err.message || "Invalid email or password. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-blue/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">Student Sign In</h1>
          <p className="text-xs text-slate-400 font-medium">Access your enrolled tracks, mentor sessions, and progress.</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 transition-all placeholder:text-slate-500 placeholder:font-normal"
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
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 transition-all placeholder:text-slate-500 placeholder:font-normal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Links */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-2 text-xs">
          <p className="text-slate-400">
            Don't have a student account?{" "}
            <Link href="/signup" className="font-bold text-brand-blue hover:underline">
              Create Student Account
            </Link>
          </p>

          <p className="pt-2">
            <Link href="/admin/login" className="inline-flex items-center gap-1 font-bold text-slate-400 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Portal Access →</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
