"use client";

import React from "react";
import { motion } from "framer-motion";

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "Understand the idea and requirements.",
  },
  {
    step: "02",
    title: "Plan",
    description: "Define the solution and approach.",
  },
  {
    step: "03",
    title: "Build",
    description: "Design and develop the product.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Test, refine and deliver.",
  },
];

export const ProcessStepsBlueprint: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Our Process
          </h2>
          <p className="text-slate-600 text-base font-normal">
            A simple and transparent development process.
          </p>
        </motion.div>

        {/* 4 Circular Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bp-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div>
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-12 h-12 rounded-full border-2 border-brand-blue text-brand-blue font-black flex items-center justify-center text-sm mb-6 shadow-sm bg-blue-50/50"
                >
                  {item.step}
                </motion.div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
