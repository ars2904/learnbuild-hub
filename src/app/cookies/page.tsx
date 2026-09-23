"use client";

import React from "react";
import Link from "next/link";
import { 
  Cookie, 
  ShieldCheck, 
  FileText, 
  ArrowLeft, 
  Mail, 
  Phone, 
  CheckCircle2 
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function CookiePolicyPage() {
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
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-500/10 border border-orange-500/20 mb-4 inline-flex items-center gap-2 shadow-sm">
              <Cookie className="w-4 h-4 text-brand-orange" />
              <span>LEGAL & GOVERNANCE</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Cookie Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6">
              This Cookie Policy explains how LearnBuild Hub uses cookies and similar technologies on its website.
            </p>

            <div className="text-xs text-slate-400 font-semibold">
              Last Updated: September 23, 2026
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
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-md flex items-center gap-2"
            >
              <Cookie className="w-4 h-4" />
              <span>Cookie Policy</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. COOKIE POLICY CONTENT ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-slate max-w-none text-slate-700 font-normal leading-relaxed text-sm sm:text-base space-y-10">

            {/* Section 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">1</span>
                <span>What Are Cookies?</span>
              </h3>
              <p className="mb-3">
                Cookies are small text files that may be stored on your device when you visit a website.
              </p>
              <p>
                They can help websites remember information, maintain sessions, improve functionality and support website security.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">2</span>
                <span>How LearnBuild Hub Currently Uses Cookies</span>
              </h3>
              <p className="font-extrabold text-slate-900 mb-3 uppercase tracking-wider text-xs">
                At present, LearnBuild Hub does not use cookies for:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-4">
                <li>Google Analytics</li>
                <li>Advertising</li>
                <li>Behavioural advertising</li>
                <li>Meta/Facebook Pixel</li>
                <li>Cross-site advertising tracking</li>
                <li>Payment gateway tracking</li>
              </ul>
              <p className="mb-2 font-semibold text-slate-900 text-sm">
                We may use essential technical cookies or similar mechanisms where required for:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Website functionality</li>
                <li>User sessions & security</li>
                <li>Authentication, where applicable</li>
                <li>Remembering necessary technical preferences</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">3</span>
                <span>Essential Cookies</span>
              </h3>
              <p className="mb-3">
                Essential cookies are used only where necessary for the operation, security or functionality of the website. These cookies generally do not collect information for advertising purposes.
              </p>
              <p className="text-xs font-semibold text-slate-500 bg-white p-3 rounded-xl border border-slate-200 inline-block">
                Disabling essential cookies may affect certain website functions.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">4</span>
                <span>Analytics Cookies</span>
              </h3>
              <p>
                Currently, LearnBuild Hub does not use Google Analytics or other third-party analytics cookies. If analytics services are introduced in the future, this Cookie Policy will be updated to explain the relevant technology and its purpose.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">5</span>
                <span>Advertising Cookies</span>
              </h3>
              <p>
                LearnBuild Hub does not currently use advertising cookies or third-party advertising trackers on this website. If advertising or marketing technologies are introduced in the future, we will update this Cookie Policy accordingly.
              </p>
            </div>

            {/* Section 6 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">6</span>
                <span>Third-Party Services</span>
              </h3>
              <p>
                Certain third-party services used by the website may potentially place or use cookies or similar technologies depending on how the service is configured (e.g., embedded content, external communication services or other third-party functionality). Such services may have their own cookie and privacy policies.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">7</span>
                <span>Managing Cookies</span>
              </h3>
              <p className="mb-3">Most modern web browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
                <li>View stored cookies</li>
                <li>Delete cookies</li>
                <li>Block cookies</li>
                <li>Restrict certain types of cookies</li>
                <li>Receive notifications when cookies are being used</li>
              </ul>
              <p className="text-xs text-slate-500">
                You can manage cookie settings through your browser’s privacy or security settings. Blocking essential cookies may affect certain website functionality.
              </p>
            </div>

            {/* Section 8 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">8</span>
                <span>Changes to This Cookie Policy</span>
              </h3>
              <p>
                We may update this Cookie Policy when we introduce new technologies, analytics tools, advertising services, payment systems or other website functionality. Any changes will be published on this page with a revised “Last Updated” date.
              </p>
            </div>

            {/* Section 9: Contact Us */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-brand-orange" />
                <span>9. Contact Us</span>
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                If you have questions regarding our use of cookies or similar technologies, contact:
              </p>

              <div className="space-y-3 text-sm font-semibold">
                <div className="text-brand-orange font-bold text-lg">LearnBuild Hub</div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-400 underline">{SITE_CONFIG.email}</a></span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-blue-400" />
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
