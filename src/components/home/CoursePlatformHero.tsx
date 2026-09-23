"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code2, Sparkles, Cpu, Layers, Terminal, ShieldCheck } from "lucide-react";
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

      {/* ================= FLOATING TECH BADGES (LEFT & RIGHT) ================= */}
      {/* Floating 1: React 18 (Left Top) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:flex absolute top-20 left-12 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-sky-200 shadow-xl backdrop-blur-md text-xs font-black text-slate-800"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
        <span className="text-sky-600 font-extrabold">React 18</span>
        <span className="text-[10px] text-slate-400 font-semibold">• Frontend</span>
      </motion.div>

      {/* Floating 2: Next.js 14 (Left Bottom) */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:flex absolute bottom-28 left-16 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-xs font-black text-white"
      >
        <span className="w-5 h-5 rounded-lg bg-white text-slate-900 flex items-center justify-center font-mono text-[10px] font-black">N</span>
        <span>Next.js 14 App Router</span>
      </motion.div>

      {/* Floating 3: Python & AI (Right Top) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:flex absolute top-24 right-12 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-amber-200 shadow-xl backdrop-blur-md text-xs font-black text-slate-800"
      >
        <Cpu className="w-4 h-4 text-amber-500" />
        <span className="text-amber-700 font-extrabold">Python & AI Models</span>
      </motion.div>

      {/* Floating 4: Cloud & DevOps (Right Bottom) */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:flex absolute bottom-32 right-16 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-indigo-200 shadow-xl backdrop-blur-md text-xs font-black text-slate-800"
      >
        <Layers className="w-4 h-4 text-indigo-500" />
        <span className="text-indigo-700 font-extrabold">Cloud & DevOps</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Platform Pill Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-800 mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-brand-orange" />
          <span className="uppercase tracking-wider text-slate-900 font-extrabold">LEARNBUILD HUB PLATFORM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-brand-orange font-black tracking-widest uppercase">LEARN. BUILD.</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]">
            <span className="text-brand-blue">
              Learn skills.
            </span> 
            <br />
            <span className="inline-flex items-center gap-2 flex-wrap justify-center mt-2">
              <span className="text-brand-blue">Build</span> 
              {/* Glowing Orange Container */}
              <span className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-400 text-brand-orange rounded-3xl px-6 py-2 shadow-xl shadow-orange-500/20 inline-flex items-center gap-1 font-black">
                solutions.
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
          className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 leading-relaxed font-normal mb-10"
        >
          LearnBuild Hub bridges high-impact technology education with end-to-end software product development for modern businesses.
        </motion.p>

        {/* Action Button Group */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-lg mx-auto mb-14"
        >
          <Button
            href="/learn"
            variant="learn"
            size="lg"
            className="w-full sm:w-auto shadow-course rounded-full py-4 px-8 hover:scale-105 transition-all duration-300 font-extrabold"
            icon={<BookOpen className="w-5 h-5" />}
            iconPosition="left"
          >
            Explore Learning →
          </Button>

          <Button
            href="/build"
            variant="build"
            size="lg"
            className="w-full sm:w-auto shadow-orange-glow rounded-full py-4 px-8 hover:scale-105 transition-all duration-300 font-extrabold"
            icon={<Code2 className="w-5 h-5" />}
            iconPosition="left"
          >
            Explore Our Work
          </Button>
        </motion.div>

        {/* PRO HIGH-FIDELITY CORE TECHNOLOGIES STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Title Indicator */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
              <Terminal className="w-4 h-4 text-brand-orange" />
              <span>CORE TECHNOLOGIES</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Designed Technology Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { name: "React 18", color: "bg-sky-500/10 text-sky-400 border-sky-500/30" },
                { name: "Next.js 14", color: "bg-white/10 text-slate-200 border-white/20" },
                { name: "Python & AI", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
                { name: "TypeScript", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
                { name: "Node.js", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
                { name: "Cloud & DevOps", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
              ].map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-extrabold shadow-sm transition-all cursor-default ${tech.color}`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
