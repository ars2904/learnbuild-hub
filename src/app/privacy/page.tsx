"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  MessageSquare
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 bg-[#090D16] text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-600/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[300px] bg-orange-500/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-3xl">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-500/10 border border-orange-500/20 mb-6 inline-flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>DATA GOVERNANCE & PRIVACY</span>
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              Privacy Policy & <br />
              <span className="text-brand-blue">Data Protection.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal mb-8">
              At LearnBuild Hub, we respect your personal privacy. This document outlines how we collect, handle, and safeguard information submitted across our learning tracks, technology solutions, and internship applications.
            </p>

            <div className="text-xs text-slate-400 font-medium">
              Last updated: September 23, 2026 • Official Governance Document
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. TRUST HIGHLIGHT STRIP ================= */}
      <section className="py-8 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white tracking-wider">Zero Data Selling</h4>
                <p className="text-[11px] text-slate-400">We never sell data to third parties.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white tracking-wider">Encrypted Forms</h4>
                <p className="text-[11px] text-slate-400">Direct secure email dispatches.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white tracking-wider">No Unsolicited Spam</h4>
                <p className="text-[11px] text-slate-400">Only relevant application replies.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white tracking-wider">Full User Control</h4>
                <p className="text-[11px] text-slate-400">Request deletion anytime.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. MAIN PRIVACY POLICY ARTICLES ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-slate max-w-none space-y-12">
            
            {/* Article 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue text-white font-black text-sm flex items-center justify-center">1</span>
                <span>Information We Collect</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal mb-4">
                We only collect personal information that you voluntarily provide when submitting an inquiry or application on our website:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Contact Information:</strong> Full Name, Email Address, Phone / WhatsApp number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Educational & Career Details:</strong> Qualifications, preferred technology track, portfolio/GitHub link (submitted during course enrollment or internship applications).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Client & Enterprise Requirements:</strong> School/Company name, custom software requirements, and demo requests.</span>
                </li>
              </ul>
            </div>

            {/* Article 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue text-white font-black text-sm flex items-center justify-center">2</span>
                <span>How We Use Your Information</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal mb-4">
                Your submitted data is used strictly for the operational purpose intended by your form submission:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>To process course enrollments, verify merit internship eligibility, and send demo credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>To communicate directly regarding your software project specs via email (<code className="text-brand-blue font-bold">{SITE_CONFIG.email}</code>) or WhatsApp (<code className="text-emerald-600 font-bold">{SITE_CONFIG.phone}</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>To send essential updates regarding your selected training program or build deliverables.</span>
                </li>
              </ul>
            </div>

            {/* Article 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue text-white font-black text-sm flex items-center justify-center">3</span>
                <span>Data Protection & Security</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal mb-4">
                We employ strict organizational and technical measures to protect your personal information against unauthorized access, loss, or alteration:
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Form submissions dispatch directly through secure serverless API routes to our verified inbox. We do not store unencrypted credit card or payment financial data on our servers.
              </p>
            </div>

            {/* Article 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue text-white font-black text-sm flex items-center justify-center">4</span>
                <span>Your Data Rights & Deletion Requests</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal mb-4">
                You retain full ownership of your data. You may request to review, update, or completely delete your submitted contact records from our systems at any time.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Simply email your deletion request to <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-blue font-bold hover:underline">{SITE_CONFIG.email}</a> with the subject line <strong>"Data Deletion Request"</strong>.
              </p>
            </div>

            {/* Article 5 */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-brand-orange" />
                <span>Contact Our Data Officer</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-normal mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how LearnBuild Hub handles your personal information, reach out directly:
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>{SITE_CONFIG.email}</span>
                </a>

                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {SITE_CONFIG.whatsapp}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
