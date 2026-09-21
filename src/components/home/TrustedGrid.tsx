"use client";

import React from "react";
import { BookOpen, TrendingUp, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const trustedCards = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Practical skills",
    color: "text-brand-blue bg-blue-50 border-blue-200",
  },
  {
    icon: TrendingUp,
    title: "Thrive",
    description: "Your career",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Digital solutions",
    color: "text-brand-orange bg-orange-50 border-orange-200",
  },
  {
    icon: Sparkles,
    title: "Create",
    description: "Real impact",
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
];

export const TrustedGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Trusted Learning. Real Solutions.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Explore opportunities. Build what's next.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustedCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bp-card bp-card-hover p-8 rounded-3xl text-center flex flex-col items-center justify-center bg-white border border-slate-200 shadow-sm cursor-pointer transition-shadow hover:shadow-xl"
              >
                <div className={`w-14 h-14 rounded-2xl border ${card.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
