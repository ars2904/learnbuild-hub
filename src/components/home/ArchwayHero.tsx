"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const ArchwayHero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-12 md:pt-12 md:pb-16 overflow-hidden text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-r from-blue-500/10 via-amber-400/10 to-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Handwritten Slant Accent Top-Left */}
        <div className="hidden lg:block absolute top-8 left-12 transform -rotate-6 text-slate-500 font-handwriting text-xl sm:text-2xl leading-tight opacity-90 select-none pointer-events-none">
          New <br />
          <span className="text-slate-800 font-bold">Skills</span> <br />
          Brighter <br />
          <span className="text-blue-600 font-bold underline underline-offset-4">Opportunities</span>
        </div>

        {/* Handwritten Slant Accent Top-Right */}
        <div className="hidden lg:block absolute top-8 right-12 transform rotate-6 text-slate-500 font-handwriting text-xl sm:text-2xl leading-tight opacity-90 select-none pointer-events-none">
          Ideas <br />
          to <br />
          <span className="text-brand-orange font-bold underline underline-offset-4">Impact</span>
        </div>

        {/* Small Top Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-6 shadow-sm"
        >
          <span>SAME CURIOSITY. A BRIGHTER TOMORROW.</span>
        </motion.div>

        {/* Main Hero Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-6 leading-[1.05]"
        >
          <span className="text-brand-blue">Learn</span> Today. <br />
          <span className="text-brand-orange">Build</span> Tomorrow.
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          LearnBuild Hub connects practical learning opportunities with digital technology solutions — helping individuals advance their skills and turn ideas into real-world solutions.
        </motion.p>
      </div>
    </section>
  );
};
