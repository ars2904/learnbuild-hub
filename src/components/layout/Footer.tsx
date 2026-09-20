import React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col space-y-4">
            <Logo showTagline={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering individuals through practical skill acquisition and building innovative digital technology solutions.
            </p>
            <div className="inline-flex items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Learn Path → Corizo Ecosystem
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                Build Path → Digital Solutions
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-blue-400 font-bold">↗</span>
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

          {/* V1 Ecosystem Note */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                LearnBuild Platform V1
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with our team to discuss custom website development, software applications, or learning paths.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span>Status: V1 Active</span>
              <span className="text-emerald-400 font-medium">● Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 LearnBuild Hub. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-slate-400">
            <span className="text-slate-400">Tagline:</span>
            <span className="font-bold text-white tracking-wider">
              "Learn. Build."
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
