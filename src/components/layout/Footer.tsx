import React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { Mail, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1120] border-t border-slate-800 text-slate-300 relative overflow-hidden">
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand & Overview */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col space-y-5">
            <Logo showTagline={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Empowering individuals through practical skill acquisition and engineering innovative custom digital technology solutions.
            </p>
            
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Learn Path → Practical Skill Tracks</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Path → Digital Solutions</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-5">
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-3.5 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch Card */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col justify-between p-6 rounded-3xl bg-slate-900/90 border border-slate-800/80 shadow-2xl backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-orange">
                  Get In Touch
                </h4>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
                Have questions about courses or custom software projects? Connect directly with our team.
              </p>
              <a 
                href="mailto:learnbuildh@gmail.com" 
                className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 w-full"
              >
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="truncate">learnbuildh@gmail.com</span>
              </a>
            </div>
            
            <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-400">Support SLA</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>24h Response</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 LearnBuild Hub. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/learnbuildhub?stkn=MXR0aW1ldzRsZ2xwZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5"
            >
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-slate-400 font-medium">Tagline:</span>
              <span className="font-bold text-white tracking-widest uppercase">
                "Learn. Build."
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
