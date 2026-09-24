"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Mail, 
  Phone, 
  CheckCircle2,
  RefreshCw,
  Clock,
  AlertCircle,
  FileText,
  Cookie
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-20 bg-[#090D16] text-white overflow-hidden border-b border-slate-800">
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
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 mb-4 inline-flex items-center gap-2 shadow-sm">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>GUARANTEE & TRANSPARENCY</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Cancellation & Refund Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6">
              At LearnBuild Hub, we believe in complete transparency and student satisfaction. This policy defines our clear, time-tiered refund timeline for all training tracks and courses.
            </p>

            <div className="text-xs text-slate-400 font-semibold">
              Last Updated: September 24, 2026
            </div>
          </div>

          {/* Legal Navigation Tabs */}
          <div className="flex items-center gap-3 mt-10 border-t border-slate-800/80 pt-6 flex-wrap">
            <Link
              href="/privacy"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Link>

            <Link
              href="/terms"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Terms & Conditions</span>
            </Link>

            <Link
              href="/cookies"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <Cookie className="w-4 h-4" />
              <span>Cookie Policy</span>
            </Link>

            <Link
              href="/refund"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refund Policy</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. REFUND POLICY HIGHLIGHT CARDS ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Timeline Visual Grid */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2 text-center">
              Student Refund Timeline Breakdown
            </h2>
            <p className="text-slate-600 text-center text-sm font-medium mb-10">
              Clear, step-by-step refund terms based on course attendance days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Day 1: 100% Full Refund */}
              <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-200 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
                  100% Guaranteed
                </div>

                <div>
                  <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow">
                    Day 1
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    100% Full Refund
                  </h3>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4">
                    If you attend Day 1 of the course track and decide the program or curriculum isn't the right fit for you, you are entitled to a <strong>100% full refund</strong>.
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero Questions Asked</span>
                </div>
              </div>

              {/* Day 2 to 7: 30% Refund */}
              <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
                  Partial Refund
                </div>

                <div>
                  <span className="w-10 h-10 rounded-2xl bg-amber-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow">
                    Days 2–7
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    30% Partial Refund
                  </h3>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4">
                    If a refund request is submitted between <strong>Day 2 and Day 7</strong> of course commencement, a <strong>30% partial refund</strong> will be issued.
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-200 flex items-center gap-2 text-xs font-bold text-amber-800">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Pro-rated Resource Offset</span>
                </div>
              </div>

              {/* Day 8+: No Refund */}
              <div className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-200 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-600 text-white px-3 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
                  No Refund
                </div>

                <div>
                  <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow">
                    Day 8+
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    No Refund (0%)
                  </h3>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4">
                    From <strong>Day 8 onward</strong>, no refunds will be processed as seat allocations, mentor assignments, and project infrastructure are locked.
                  </p>
                </div>

                <div className="pt-4 border-t border-rose-200 flex items-center gap-2 text-xs font-bold text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Seat Allocation Locked</span>
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Legal Clauses */}
          <div className="prose prose-slate max-w-none text-slate-700 font-normal leading-relaxed text-sm sm:text-base space-y-10">
            
            {/* Clause 1: How to Request */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">1</span>
                <span>How to Submit a Refund Request</span>
              </h3>
              <p className="mb-3">
                To request a refund under the eligible timeline, students must submit a formal written request containing their full name, registered email address, phone number, and course name.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Send an email to <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-blue font-bold underline">{SITE_CONFIG.email}</a> with the subject line <strong>"Refund Request - [Your Name]"</strong>.</li>
                <li>Or contact our team directly via WhatsApp at <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">{SITE_CONFIG.phone}</a>.</li>
              </ul>
            </div>

            {/* Clause 2: Processing Timeframe */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">2</span>
                <span>Processing & Payment Method</span>
              </h3>
              <p className="mb-3">
                Approved refunds will be processed back to the original payment source (bank account, UPI, credit/debit card) within <strong>5 to 7 business days</strong> following approval notification.
              </p>
            </div>

            {/* Clause 3: Software Services Note */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</span>
                <span>Custom Software & Enterprise Projects</span>
              </h3>
              <p className="mb-3">
                Please note that this course refund timeline applies specifically to student training tracks and educational programs. Custom software development, website design, and B2B software client engineering deliverables are governed by individual Statement of Work (SOW) milestone agreements.
              </p>
            </div>

            {/* Contact Support Banner */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-emerald-400" />
                <span>Need Assistance with a Refund?</span>
              </h3>
              <p className="text-slate-300 text-sm mb-6 font-normal">
                Our support team is here to assist you. If you have any questions regarding your course eligibility or refund status, feel free to reach out to us directly:
              </p>

              <div className="space-y-3 text-sm font-semibold">
                <div className="text-emerald-400 font-bold text-lg">LearnBuild Hub Admissions & Support</div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-400 underline">{SITE_CONFIG.email}</a></span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Phone/WhatsApp: <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{SITE_CONFIG.phone}</a></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
