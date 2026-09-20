"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/common/Button";
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
            ? "bg-[#0A0D14]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3"
            : "bg-[#0A0D14]/70 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo showTagline={true} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                if (link.isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all hover:scale-105"
                      title="External Training Platform (Corizo)"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "text-brand-orange bg-brand-orange/15 font-bold border border-brand-orange/30 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA — ONLY SHOW WHEN ON /build PAGE */}
            <div className="hidden lg:flex items-center space-x-3 min-w-[140px] justify-end">
              {isBuildPage ? (
                <Button href="/contact" size="sm" variant="build" icon={<ArrowRight className="w-4 h-4" />}>
                  Start a Project
                </Button>
              ) : null}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
};
