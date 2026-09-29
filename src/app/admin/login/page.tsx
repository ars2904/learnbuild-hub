"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/lib/supabase/auth";
import { Logo } from "@/components/common/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await loginAdmin(email, password);
      router.push("/admin");
    } catch (err: any) {
      console.error("Admin login error:", err);
      setErrorMsg(err.message || "Invalid admin credentials. Please check your email and password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Logo showTagline={false} />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
            <span>Executive Admin Portal</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-1">
              Admin Sign In
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Access master CRM, lead management, and employee delegation controls.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="saurabh.srivastav2023@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-600"
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
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected with 256-Bit SSL & Supabase Auth Security</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}
