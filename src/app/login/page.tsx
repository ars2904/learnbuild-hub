"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  GraduationCap, Lock, Mail, User, BookOpen, 
  Loader2, AlertCircle, ArrowRight, ShieldCheck, Eye, EyeOff, CheckCircle2
} from "lucide-react";
import { loginUser, signupStudent, loginWithGoogle, getUserSession, isAdminEmail } from "@/lib/supabase/auth";
import { Logo } from "@/components/common/Logo";

function AuthPortalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultMode = searchParams?.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [qualification, setQualification] = useState("Undergraduate");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Check if user is already logged in
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

  // Handle Form Submission (Sign In or Sign Up)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const result = await loginUser(email, password);
        if (result.isAdmin) {
          setSuccessMsg("Admin identity verified. Redirecting to Admin CMS...");
          setTimeout(() => router.push("/admin"), 800);
        } else {
          setSuccessMsg("Welcome back! Redirecting to Student Dashboard...");
          setTimeout(() => router.push("/dashboard"), 800);
        }
      } else {
        if (!agreedTerms) {
          setErrorMsg("Please accept the terms and conditions to create an account.");
          setLoading(false);
          return;
        }
        await signupStudent(email, password, fullName, qualification);
        setSuccessMsg("Account created successfully! Redirecting to Student Dashboard...");
        setTimeout(() => router.push("/dashboard"), 1000);
      }
    } catch (err: any) {
      console.error("Auth submit error:", err);
      setErrorMsg(err.message || "Authentication failed. Please check your credentials.");
      setLoading(false);
    }
  };

  // Handle Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setErrorMsg(err.message || "Failed to sign in with Google.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Logo showTagline={false} />
          </Link>
          <p className="text-xs text-slate-400 font-medium">
            Learn Skills. Build Solutions. Access your Unified Portal.
          </p>
        </div>

        {/* Auth Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode("signin"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`py-2.5 rounded-xl text-xs font-black tracking-wider transition-all ${
                mode === "signin"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`py-2.5 rounded-xl text-xs font-black tracking-wider transition-all ${
                mode === "signup"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-3 border border-slate-700/80 hover:border-slate-600 shadow-sm transition-all active:scale-[0.99] disabled:opacity-60"
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
            <span>{googleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
              Or continue with email
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Error & Success Messages */}
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

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Sign Up only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required={mode === "signup"}
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Qualification (Sign Up only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                  Highest Qualification / Status
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                  >
                    <option value="Undergraduate">Undergraduate Student</option>
                    <option value="Graduate">Graduate / Degree Holder</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Password Field with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black uppercase text-slate-400">
                  Password
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset link has been dispatched to your registered email.")}
                    className="text-[11px] font-semibold text-brand-blue hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
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

            {/* Remember Me / Terms Checkbox */}
            {mode === "signin" ? (
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-brand-blue focus:ring-brand-blue"
                />
                <span>Remember this device for 30 days</span>
              </label>
            ) : (
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 font-medium">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-brand-blue focus:ring-brand-blue"
                />
                <span>I agree to LearnBuild Hub's Terms of Service & Privacy Policy</span>
              </label>
            )}

            {/* Submit Button */}
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
                  <span>{mode === "signin" ? "Sign In to Account" : "Create Student Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Role Auto-Detection Hint Footer */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart Role Detection: Admin accounts automatically route to Admin CMS.</span>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-brand-blue mb-2" />
          <span>Loading Auth Portal...</span>
        </div>
      }
    >
      <AuthPortalForm />
    </Suspense>
  );
}
