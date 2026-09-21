"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code2, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/common/Button";

export const CoursePlatformHero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-white">
      {/* Blueprint Dot Matrix Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#94A3B8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle Architectural Blueprint Accent Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-25 stroke-blue-300" fill="none">
        <line x1="10%" y1="0" x2="10%" y2="100%" strokeDasharray="6 6" strokeWidth="1" />
        <line x1="90%" y1="0" x2="90%" y2="100%" strokeDasharray="6 6" strokeWidth="1" />
        <circle cx="10%" cy="30%" r="120" strokeWidth="1" />
        <circle cx="90%" cy="40%" r="160" strokeWidth="1" />
      </svg>

      {/* Floating 3D/Tech Badges (Next.js, React, Python) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-20 right-16 z-20 items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xl text-xs font-black text-slate-800"
      >
        <span className="w-3 h-3 rounded-full bg-slate-900 flex items-center justify-center text-[8px] text-white">N</span>
        <span>Next.js 14</span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute bottom-24 left-16 z-20 items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xl text-xs font-black text-slate-800"
      >
        <span className="w-3 h-3 rounded-full bg-sky-500 text-white flex items-center justify-center text-[8px] font-bold">R</span>
        <span>React</span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute bottom-20 right-24 z-20 items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xl text-xs font-black text-slate-800"
      >
        <span className="w-3 h-3 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] font-bold">P</span>
        <span>Python</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Platform Pill Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-800 mb-8 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
          <span className="uppercase tracking-wider text-slate-900 font-extrabold">LEARNBUILD HUB PLATFORM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-brand-orange font-black tracking-widest uppercase">LEARN. BUILD.</span>
        </motion.div>

        {/* Hero Title with Floating Badge & Glowing Orange Terminal Container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]">
            <span className="relative inline-block text-brand-blue">
              Learn Practical Skills.
              {/* Floating Blue Pill Badge */}
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="hidden sm:inline-flex items-center gap-1.5 absolute -top-4 -right-12 px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-extrabold shadow-lg shadow-blue-500/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Course Certified</span>
              </motion.span>
            </span> 
            <br />
            <span className="inline-flex items-center gap-2 flex-wrap justify-center mt-2">
              <span className="text-brand-blue">Build</span> 
              {/* Glowing Orange Terminal Container */}
              <span className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-400 text-brand-orange rounded-3xl px-6 py-2 shadow-xl shadow-orange-500/20 inline-flex items-center gap-1 font-black">
                Real Solutions
                <span className="w-1 h-8 sm:h-12 bg-brand-orange animate-pulse inline-block rounded-full ml-1" />
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 leading-relaxed font-normal mb-12"
        >
          Access industry-aligned skill training tracks and custom software development under one unified platform.
        </motion.p>

        {/* Action Button Group */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-lg mx-auto"
        >
          <Button
            href="https://corizo.in"
            isExternal={true}
            variant="learn"
            size="lg"
            className="w-full sm:w-auto shadow-course rounded-full py-4 px-8 hover:scale-105 transition-all duration-300 font-extrabold"
            icon={<BookOpen className="w-5 h-5" />}
            iconPosition="left"
          >
            Explore Learn Tracks ↗
          </Button>

          <Button
            href="/build"
            variant="build"
            size="lg"
            className="w-full sm:w-auto shadow-orange-glow rounded-full py-4 px-8 hover:scale-105 transition-all duration-300 font-extrabold"
            icon={<Code2 className="w-5 h-5" />}
            iconPosition="left"
          >
            Explore Build Services
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
