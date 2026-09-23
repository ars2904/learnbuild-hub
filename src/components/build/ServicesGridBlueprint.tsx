"use client";

import React from "react";
import Link from "next/link";
import { Globe, LayoutGrid, Cpu, Smartphone, Bot, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const servicesData = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Business websites, landing pages and modern web experiences.",
  },
  {
    icon: LayoutGrid,
    title: "Web Applications",
    description: "Custom web applications designed around your business requirements.",
  },
  {
    icon: Cpu,
    title: "Software Development",
    description: "Custom software and digital business tools.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Modern mobile application development for Android and iOS platforms.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "AI integrations and workflow automation to improve efficiency.",
  },
];

export const ServicesGridBlueprint: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4 border-b border-slate-200/80 pb-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Our Services
            </h2>
            <p className="text-slate-600 text-base font-normal">
              Technology solutions for a better tomorrow.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bp-card bp-card-hover p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between transition-shadow hover:shadow-xl cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
