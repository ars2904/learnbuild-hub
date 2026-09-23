import React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Mail, Phone, MessageSquare, ArrowUpRight, ShieldCheck, Sparkles, Instagram, ChevronRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#090D16] via-[#0B1220] to-[#070A12] text-slate-300 relative overflow-hidden border-t border-slate-800/80">
      
      {/* Top Accent Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Overview (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Logo showTagline={true} theme="dark" />
            <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              LearnBuild Hub equips learners with practical technology skills and builds custom web, mobile, and software solutions for modern businesses.
            </p>
            
            {/* Quick Channel Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold flex items-center gap-2 hover:bg-pink-500/20 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">
                Quick Links
              </h3>
            </div>
            <ul className="space-y-3 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs & Solutions (3 Cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">
                Programs & Services
              </h3>
            </div>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li>
                <Link href="/learn" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Full-Stack Web Engineering</span>
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Digital Marketing & Growth</span>
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>8+ Advanced Technology Tracks</span>
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>1-3 Month Merit Internships</span>
                </Link>
              </li>
              <li>
                <Link href="/build#solutions" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Ready-Made Software Suites</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Info (3 Cols) */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-orange">
                    Direct Contact
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-blue-400 font-semibold transition-all group border border-slate-700/50"
                  >
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{SITE_CONFIG.email}</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-semibold transition-all group border border-slate-700/50"
                  >
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{SITE_CONFIG.phone}</span>
                  </a>

                  <a
                    href={SITE_CONFIG.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/50 text-emerald-400 font-semibold transition-all group"
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp: {SITE_CONFIG.whatsapp}</span>
                  </a>
                </div>
              </div>
              
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-400">Support SLA</span>
                <span className="text-emerald-400 font-bold">24-48h Response</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Tagline Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <p>© 2026 LearnBuild Hub. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors underline underline-offset-4 font-medium">
              Privacy Policy
            </Link>
          </div>

          <div className="flex items-center space-x-2 text-slate-300">
            <span className="font-bold text-slate-400">Tagline:</span>
            <span className="font-black text-white tracking-widest uppercase">
              <span className="text-brand-blue">"Learn skills.</span>{" "}
              <span className="text-brand-orange">Build solutions."</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
