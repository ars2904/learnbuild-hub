"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Smartphone, Bot } from "lucide-react";
import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { CodeStudioWindow } from "@/components/build/CodeStudioWindow";

export const BuildHeroBlueprint: React.FC = () => {
  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#0B0F19] text-white">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-emerald-500/15 blur-[160px] rounded-full pointer-events-none" />

      {/* SVG Glowing Background Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-cyan-500/40" fill="none">
        <path d="M 0 120 Q 300 120, 420 320 T 850 320 T 1300 520" strokeWidth="1.5" strokeDasharray="5 5" />
        <path d="M 180 0 Q 180 220, 650 220 T 1100 420" strokeWidth="1.5" />
        <circle cx="420" cy="320" r="4" fill="#06B6D4" />
        <circle cx="650" cy="220" r="4" fill="#10B981" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-300 uppercase bg-slate-800/80 border border-slate-700/80 mb-6 shadow-sm backdrop-blur-md">
              IDEAS TO IMPACT
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
              Build Digital <br />
              <span className="text-cyan-400 font-black drop-shadow-[0_0_30px_rgba(6,182,212,0.45)]">Solutions.</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed font-normal mb-8">
              Turning ideas into modern websites, applications and digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-full py-3.5 shadow-lg shadow-cyan-500/30 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>

              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full border border-slate-700 hover:border-slate-400 text-white font-bold text-sm bg-slate-900/60 backdrop-blur-md transition-all"
              >
                <span>View Our Work</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Code Studio IDE Window + Floating Service Pills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            
            {/* Floating Tech Badges (Top Right) */}
            <div className="absolute -top-6 right-0 z-30 flex flex-col gap-2">
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-bold text-slate-200 shadow-xl backdrop-blur-md"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Web Applications</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-bold text-slate-200 shadow-xl backdrop-blur-md"
              >
                <Smartphone className="w-4 h-4 text-orange-400" />
                <span>Mobile Apps</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-bold text-slate-200 shadow-xl backdrop-blur-md"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>AI & Automation</span>
              </motion.div>
            </div>

            {/* Code Studio Window Graphic */}
            <CodeStudioWindow />

          </motion.div>

        </div>
      </div>
    </section>
  );
};
