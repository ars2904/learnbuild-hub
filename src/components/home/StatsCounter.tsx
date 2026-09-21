"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Award, Code2, Users } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  color: string;
}

const statsData: StatItem[] = [
  {
    icon: Star,
    value: 4.9,
    suffix: " ★",
    label: "Platform Rating",
    description: "Average score across learners & clients",
    color: "text-amber-500 bg-amber-50 border-amber-200",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Skill Tracks",
    description: "Industry relevant career pathways",
    color: "text-brand-blue bg-blue-50 border-blue-200",
  },
  {
    icon: Code2,
    value: 100,
    suffix: "%",
    label: "Practical & Real-World",
    description: "Hands-on projects & client solutions",
    color: "text-brand-orange bg-orange-50 border-orange-200",
  },
  {
    icon: Users,
    value: 2,
    suffix: " Solutions",
    label: "Dual Platform",
    description: "LEARN (Corizo) & BUILD (Agency)",
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
];

function CounterNumber({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const isDecimal = value % 1 !== 0;
    const duration = 1500; // ms
    const steps = 60;
    const stepTime = duration / steps;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatted = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export const StatsCounter: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-blue/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-brand-orange/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md flex flex-col justify-between hover:border-slate-600 transition-all shadow-lg"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border ${stat.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                    <CounterNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-sm font-extrabold text-slate-200 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-400 font-medium leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
