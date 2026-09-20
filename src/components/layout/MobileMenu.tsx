"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string; isExternal?: boolean }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden flex flex-col bg-[#0A0D14] text-white w-screen h-screen h-[100dvh] overflow-hidden transition-all duration-300">
      {/* Menu Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0A0D14] flex-shrink-0">
        <Logo showTagline={true} />
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links List */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.isExternal) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl text-base font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all active:scale-[0.99]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                    {link.name} (Corizo)
                  </span>
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-semibold transition-all active:scale-[0.99] ${
                  isActive
                    ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/40 font-bold shadow-lg"
                    : "text-slate-200 bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? "text-brand-orange opacity-100" : "text-slate-400 opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Footer in Mobile Menu */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            LearnBuild Hub &copy; 2026. All rights reserved.
          </p>
          <div className="mt-2 text-xs font-bold text-brand-orange tracking-widest uppercase">
            Learn. Build.
          </div>
        </div>
      </div>
    </div>
  );
};
