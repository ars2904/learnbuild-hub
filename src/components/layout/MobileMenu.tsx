"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ExternalLink, ArrowRight, Home, BookOpen, Code, Info, FileText, Mail } from "lucide-react";
import { Logo } from "@/components/common/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string; isExternal?: boolean }>;
}

const navIcons: Record<string, React.ElementType> = {
  Home: Home,
  Learn: BookOpen,
  Build: Code,
  About: Info,
  Blogs: FileText,
  Contact: Mail,
};

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
    <div className="fixed inset-0 z-[100] lg:hidden flex flex-col bg-white text-slate-900 w-screen h-screen h-[100dvh] overflow-hidden transition-all duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white flex-shrink-0">
        <Logo showTagline={true} />
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between bg-slate-50/50">
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const IconComponent = navIcons[link.name] || ArrowRight;

            if (link.isExternal) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl text-base font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all active:scale-[0.99]"
                >
                  <span className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-brand-blue" />
                    {link.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-brand-blue" />
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-bold transition-all active:scale-[0.99] ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30"
                    : "text-slate-700 bg-white hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                  {link.name}
                </span>
                <ArrowRight className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA Button (Screen 6 Blueprint) */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-brand-blue/30"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-center text-xs text-slate-400">
            LearnBuild Hub &copy; 2026. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
