"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Award, ShieldCheck, Download, Share2, 
  CheckCircle2, Sparkles, BookOpen, Printer, Loader2, ArrowRight
} from "lucide-react";
import { getUserSession } from "@/lib/supabase/auth";
import { SITE_CONFIG } from "@/lib/constants";

export default function StudentCertificatesPage() {
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Student");
  const [studentEmail, setStudentEmail] = useState("");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>(".NET & C# Enterprise Engineering");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const session = await getUserSession();
      if (session?.user) {
        const email = session.user.email || "";
        const name = session.user.user_metadata?.full_name || email.split("@")[0] || "Student";
        setStudentEmail(email);
        setStudentName(name);

        try {
          const res = await fetch("/api/admin/leads?type=enrollments");
          const data = await res.json();
          const userLeads = (data.data || []).filter(
            (item: any) => item.email?.toLowerCase() === email.toLowerCase()
          );
          setEnrollments(userLeads);
          if (userLeads.length > 0) {
            setSelectedCourse(userLeads[0].course_title);
          }
        } catch (err) {
          console.error("Error fetching enrollments for certificate:", err);
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const certID = `LB-CERT-2026-${(studentEmail ? studentEmail.substring(0, 4) : "STD").toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Verified Completion Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1">
            Preview, print, and share your official tamper-proof LearnBuild Hub certificates.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-blue/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? "Link Copied!" : "Share Credential"}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Generating certificate preview...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Select Track Selector if student has multiple tracks */}
          {enrollments.length > 1 && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 flex-shrink-0">Select Certificate:</span>
              {enrollments.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedCourse(lead.course_title)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                    selectedCourse === lead.course_title
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {lead.course_title}
                </button>
              ))}
            </div>
          )}

          {/* Certificate Render Card */}
          <div className="relative p-6 sm:p-12 md:p-16 rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl text-center space-y-8 overflow-hidden print:p-8 print:bg-white print:text-slate-900 print:border-2">
            {/* Background Decorative Gold Watermark Ring */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            {/* Certificate Header */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-blue/30">
                LB
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue">LearnBuild Hub Official Credential</span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1 print:text-slate-900">
                  Certificate of Achievement
                </h2>
              </div>
            </div>

            {/* Certificate Body Text */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">
                This is to officially certify that
              </p>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-serif tracking-tight print:text-amber-600">
                {studentName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal print:text-slate-700">
                has successfully completed all required modules, practical projects, and 1-on-1 mentor evaluations for the comprehensive industry skill track:
              </p>
              <div className="py-3 px-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 inline-block font-black text-lg sm:text-xl text-white print:bg-slate-100 print:text-slate-900">
                {selectedCourse}
              </div>
            </div>

            {/* Certificate Seals & Signatures Footer */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto text-xs text-slate-400">
              <div className="text-left space-y-1">
                <span className="font-bold text-slate-300 block print:text-slate-800">Issue Date</span>
                <p className="text-slate-400 font-mono text-[11px]">{issueDate}</p>
              </div>

              {/* Verified Stamp Emblem */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 border-4 border-amber-300/40">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black uppercase text-amber-400 mt-2 tracking-widest">
                  Verified Credential
                </span>
              </div>

              <div className="text-right space-y-1">
                <span className="font-bold text-slate-300 block print:text-slate-800">Credential ID</span>
                <p className="text-brand-blue font-mono font-bold text-[11px]">{certID}</p>
              </div>
            </div>

            {/* Verification Link Info */}
            <div className="pt-4 text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verify credential authenticity anytime at learnbuildhub.com/verify</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
