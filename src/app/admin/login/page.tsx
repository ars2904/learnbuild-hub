"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { loginAdmin } from "@/lib/supabase/auth";

export default function AdminLoginPage() {
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
      await loginAdmin(email, password);
      router.push("/admin");
    } catch (err: any) {
      console.error("Admin login error:", err);
      setErrorMsg(err.message || "Invalid credentials or unauthenticated user.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-blue to-blue-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-blue/30">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight mb-1">LearnBuild Hub</h2>
        <p className="text-xs font-bold text-slate-400">Admin Portal Sign In</p>
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
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              placeholder="admin@learnbuildhub.com"
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
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In to Admin Portal →</span>
          )}
        </button>
      </form>

      <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
        <p className="font-bold text-white flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
          <span>Supabase Auth Integration</span>
        </p>
        <p>Use your Supabase admin user credentials. You can add admin users in your Supabase Dashboard under <strong>Authentication ➡️ Users</strong>.</p>
      </div>
    </div>
  );
}
