"use client";

import React from "react";
import { motion } from "framer-motion";

interface TickerBarProps {
  items?: string[];
}

const defaultItems = [
  "LEARN (CORIZO PARTNER)",
  "BUILD (DIGITAL AGENCY)",
  "FULL-STACK WEB DEV",
  "MOBILE APPLICATIONS",
  "AI & AUTOMATION",
  "DATA ANALYTICS",
  "INNOVATE TOGETHER",
];

export const TickerBar: React.FC<TickerBarProps> = ({ items = defaultItems }) => {
  // Duplicate items to ensure smooth infinite loop seamless wrap
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-slate-900 text-white py-3.5 overflow-hidden relative border-y border-slate-800 select-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
        className="flex w-max items-center space-x-8 text-xs font-black tracking-widest uppercase"
      >
        {repeatedItems.map((item, index) => (
          <div key={index} className="inline-flex items-center space-x-8 flex-shrink-0">
            <span className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${index % 2 === 0 ? "bg-brand-blue" : "bg-brand-orange"} animate-pulse`} />
              <span className="text-slate-200">{item}</span>
            </span>
            <span className="text-blue-400/80 font-bold">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
