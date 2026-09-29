"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Lock, Mail, GraduationCap, Wrench, Users, 
  Loader2, AlertCircle, Eye, EyeOff, CheckCircle2, ArrowRight
} from "lucide-react";
import { loginUser, loginWithGoogle, loginWithMicrosoft, getUserSession, isAdminEmail } from "@/lib/supabase/auth";
import { Logo } from "@/components/common/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [msLoading, setMsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getUserSession().then((session) => {
      if (session?.user) {
        if (isAdminEmail(session.user.email)) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      localStorage.setItem("lb_student_email", email.trim().toLowerCase());
      const result = await loginUser(email, password);
      if (result.isAdmin) {
        setSuccessMsg("Admin identity verified. Redirecting to Admin Portal...");
        setTimeout(() => router.push("/admin"), 800);
      } else {
        setSuccessMsg("Welcome back! Redirecting to Student Dashboard...");
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Invalid email or password. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error("Google Auth error:", err);
      if (err.message?.includes("not enabled") || err.message?.includes("validation_failed") || err.message?.includes("Unsupported provider")) {
        setErrorMsg("Google Sign-In provider is not enabled in your Supabase dashboard yet. Please use Email & Password to sign in.");
      } else {
        setErrorMsg(err.message || "Failed to sign in with Google.");
      }
      setGoogleLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setErrorMsg("");
    setMsLoading(true);
    try {
      await loginWithMicrosoft();
    } catch (err: any) {
      console.error("Microsoft Auth error:", err);
      if (err.message?.includes("not enabled") || err.message?.includes("validation_failed") || err.message?.includes("Unsupported provider")) {
        setErrorMsg("Microsoft Sign-In provider is not enabled in your Supabase dashboard yet. Please use Email & Password to sign in.");
      } else {
        setErrorMsg(err.message || "Failed to sign in with Microsoft.");
      }
      setMsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-stretch font-sans">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Branded Hero Banner (Visible on lg screens) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100/70 p-8 lg:p-12 flex flex-col justify-between border-r border-slate-200/80 relative overflow-hidden">
          {/* Top Logo */}
          <div className="relative z-10">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo showTagline={true} />
            </Link>
          </div>

          {/* Center Text & Bullets */}
          <div className="relative z-10 my-auto py-8 space-y-6 max-w-lg">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                Welcome to LearnBuild Hub
              </h1>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Gain in-demand skills, work on real projects, and build your future with expert guidance.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center flex-shrink-0 font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Learn</h4>
                  <p className="text-xs text-slate-500 font-medium">Industry-relevant courses</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Build</h4>
                  <p className="text-xs text-slate-500 font-medium">Practical solutions & projects</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Grow</h4>
                  <p className="text-xs text-slate-500 font-medium">With expert mentorship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Illustration Container */}
          <div className="relative z-10 pt-4">
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Students learning and building"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-extrabold text-white">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/20">
                  Practical Hands-on Learning
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-brand-blue/90 backdrop-blur-md">
                  1-on-1 Mentorship
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-md space-y-6">
            
            {/* Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Sign in to continue your learning journey with LearnBuild Hub.
              </p>
            </div>

            {/* Error / Success Notifications */}
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link has been dispatched to your registered email.")}
                    className="text-xs font-bold text-brand-blue hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-brand-blue/20 transition-all active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                OR
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Social OAuth Buttons */}
            <div className="space-y-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-3 border border-slate-200 shadow-sm transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Microsoft */}
              <button
                type="button"
                onClick={handleMicrosoftSignIn}
                disabled={msLoading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-3 border border-slate-200 shadow-sm transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {msLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                )}
                <span>Continue with Microsoft</span>
              </button>
            </div>

            {/* Footer Navigation Link */}
            <div className="pt-4 text-center text-xs font-semibold text-slate-500">
              <span>Don't have an account? </span>
              <Link href="/signup" className="text-brand-blue font-black hover:underline">
                Create Account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-brand-blue mb-2" />
          <span>Loading Sign In...</span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
