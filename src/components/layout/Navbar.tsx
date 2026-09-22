"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "@/lib/constants";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isBuildPage = pathname === "/build";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo showTagline={true} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                if (link.isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-blue hover:bg-slate-100 transition-all"
                      title="LearnBuild Platform Tracks"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "text-brand-blue bg-blue-50 font-bold border-b-2 border-brand-blue"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Button */}
            <div className="hidden lg:flex items-center space-x-3">
              {isBuildPage ? (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-blue/20 hover:shadow-lg transition-all"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-blue/20 hover:shadow-lg transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Modal */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
};
