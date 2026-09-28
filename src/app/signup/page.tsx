"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail, User, BookOpen, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { signupStudent } from "@/lib/supabase/auth";

export default function StudentSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("Undergraduate");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await signupStudent(email, password, fullName, qualification);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Student signup error:", err);
      setErrorMsg(err.message || "Failed to create account. Please try again.");
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
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">Create Account</h1>
          <p className="text-xs text-slate-400 font-medium">Join LearnBuild Hub to track your courses & live 1-on-1 mentorship.</p>
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
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 transition-all placeholder:text-slate-500 placeholder:font-normal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
              Email Address *
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
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 transition-all placeholder:text-slate-500 placeholder:font-normal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
              Education / Qualification
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-brand-blue cursor-pointer"
              >
                <option value="Undergraduate">Undergraduate Student</option>
                <option value="Postgraduate">Postgraduate Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Other Degree">Other Qualification</option>
              </select>
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-blue hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
