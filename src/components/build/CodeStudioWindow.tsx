"use client";

import React from "react";
import { Terminal, CheckCircle2, FileCode, Layers } from "lucide-react";
import { motion } from "framer-motion";

export const CodeStudioWindow: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full max-w-xl rounded-2xl overflow-hidden glass-panel-dark shadow-2xl border border-slate-700/80 ${className}`}>
      
      {/* Window Header Bar (macOS Traffic Light Dots) */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm" />
        </div>
        <div className="text-xs font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Code Studio IDE</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Editor Active Tabs Bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 text-xs select-none">
        <span className="px-3.5 py-1.5 rounded-t-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center gap-2 border-t border-x border-slate-700 shadow-sm">
          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
          <span>main.js</span>
          <span className="text-slate-500 hover:text-white transition-colors cursor-pointer ml-1">✕</span>
        </span>
        <span className="px-3 py-1 text-slate-500 font-mono text-[11px] hover:text-slate-300 cursor-pointer">
          app.tsx
        </span>
      </div>

      {/* Syntax Highlighted Code Display */}
      <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1.5 bg-slate-950/70 select-none">
        <div>
          <span className="text-purple-400 font-bold">import</span> React <span className="text-purple-400 font-bold">from</span> <span className="text-emerald-400">'react'</span>;
        </div>
        <div>
          <span className="text-purple-400 font-bold">import</span> &#123; NextApp &#125; <span className="text-purple-400 font-bold">from</span> <span className="text-emerald-400">'next/js'</span>;
        </div>
        <div className="text-slate-500 italic text-xs py-0.5">
          // Engineering scalable digital products & custom web applications
        </div>
        <div>
          <span className="text-blue-400 font-bold">export default function</span> <span className="text-amber-300 font-bold">App</span>() &#123;
        </div>
        <div className="pl-4">
          <span className="text-purple-400 font-bold">return</span> (
        </div>
        <div className="pl-8 text-cyan-300">
          &lt;<span className="text-cyan-400 font-bold">CodeStudio</span> platform=<span className="text-emerald-400">'LearnBuild'</span> /&gt;
        </div>
        <div className="pl-4">);</div>
        <div>&#125;;</div>
      </div>

      {/* Terminal Output Log Section */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-400 mb-2 border-b border-slate-900 pb-1.5 font-bold">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>TERMINAL LOG</span>
        </div>
        <div className="text-slate-400 space-y-1 text-[11px]">
          <div className="text-slate-500">[2033-38:25:3] Creating optimized production build...</div>
          <div className="text-slate-500">[2033-38:28:1] Collecting page traces & bundle data...</div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-emerald-400 font-extrabold flex items-center gap-2 mt-2.5 text-sm tracking-wide"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>✓ System Ready</span>
          </motion.div>
        </div>
      </div>

    </div>
  );
};
