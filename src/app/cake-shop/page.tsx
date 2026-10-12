'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, ExternalLink, ShoppingBag, ArrowRight, 
  Star, CheckCircle2, ArrowLeft, Heart, Eye
} from 'lucide-react';

export default function CakeShopShowcasePage() {
  const demoUrl = "https://the-cake-shop-delta.vercel.app/";

  return (
    <div className="min-h-screen bg-[#070b19] text-white font-sans selection:bg-pink-500 selection:text-white flex flex-col justify-between relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Decorative Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-amber-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed -bottom-20 right-0 w-[450px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between z-10 mb-8">
        <Link 
          href="/demo"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Demos</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>LearnBuild Hub Showcase</span>
        </div>
      </header>

      {/* Main Content Area: Centered Feature Card */}
      <main className="max-w-4xl mx-auto w-full z-10 my-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-2 border-pink-500/20 shadow-2xl shadow-pink-500/10 backdrop-blur-2xl overflow-hidden p-6 sm:p-10 transition-all">
          
          {/* Card Top Pill & Category */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                Live Interactive Demo
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9★ Customer Rating Experience</span>
            </div>
          </div>

          {/* Grid Layout: Visual Banner on Left/Top, Info on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Preview Banner */}
            <div className="md:col-span-5 relative group">
              <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" 
                  alt="The Velvet Crumb Cake Demo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Floating Tag over Image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">The Velvet Crumb</p>
                    <p className="text-[10px] text-pink-300 font-medium">Artisanal Pâtisserie Studio</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                    100% Eggless
                  </span>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  The Cake Shop <br />
                  <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                    Digital Storefront & Ordering
                  </span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  A high-converting online bakery and custom patisserie application built with instant WhatsApp ordering, flavor weight selection, eggless filters, and real-time product showcases.
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "Artisanal Cake & Dessert Gallery",
                  "Direct 1-Click WhatsApp Ordering",
                  "Eggless & Custom Portion Filters",
                  "Mobile-First Responsive Layout",
                  "Real-Time Flavor Search & Filter",
                  "Zero Platform Commissions"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Launch Cake Shop Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <Link
                  href="/demo"
                  className="py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>More Demos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[11px] text-slate-500 text-center sm:text-left">
                ⚡ Click above to explore the live website demo hosted on Vercel.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding Strip */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-slate-500 z-10 pt-8">
        <p>© LearnBuild Hub • Custom Web Applications, SaaS Platforms & Digital Storefronts</p>
      </footer>
    </div>
  );
}
