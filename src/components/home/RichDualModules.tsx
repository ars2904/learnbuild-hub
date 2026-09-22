"use client";

import React from "react";
import { ArrowRight, GraduationCap, Code2, CheckCircle2, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { StudentWorkstationIllustration } from "@/components/common/StudentWorkstationIllustration";
import { DeveloperWorkstationIllustration } from "@/components/common/DeveloperWorkstationIllustration";

export const RichDualModules: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-slate-50/70 border-y border-slate-200/80 overflow-hidden">
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-50 border border-orange-200 mb-3 inline-block shadow-sm">
            Two Strategic Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Choose Your Destination
          </h2>
        </motion.div>

        {/* Dual Course & Tech Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* ================= LEARN MODULE ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="group relative bp-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-sky-50/50 to-blue-50/70 border border-blue-200 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-blue-400 hover:ring-2 hover:ring-blue-400/20"
          >
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/30"
                >
                  <GraduationCap className="w-7 h-7" />
                </motion.div>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-xs font-extrabold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 Track Rating</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
                    <Sparkles className="w-3 h-3 text-brand-blue" />
                    <span>Skill Pathways</span>
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-4xl sm:text-5xl font-black text-brand-blue mb-2 tracking-tight">
                LEARN
              </h3>

              <p className="text-base text-slate-600 leading-relaxed mb-6 font-medium">
                Training, internships and opportunities to develop practical skills.
              </p>

              {/* Custom Vector Illustration: Student Learning Workstation */}
              <div className="my-6 p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-sm flex flex-col items-center">
                <StudentWorkstationIllustration className="w-full max-w-xs h-auto" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue mt-2">
                  Student Learning Workstation & Course Tracks
                </span>
              </div>

              {/* Course Skill Chips */}
              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 block">
                  Popular Skill Tracks:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Full-Stack Web Dev", "Data Analytics", "AI & Machine Learning", "Cloud & DevOps"].map((skill) => (
                    <motion.span 
                      key={skill}
                      whileHover={{ scale: 1.06, backgroundColor: "#eff6ff" }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-slate-700 shadow-sm cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 mb-8">
                {[
                  "Practical Skill Development Tracks",
                  "Industry Internship Opportunities",
                  "Mentorship & Career Upskilling",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>5+ Industry Skill Modules Available</span>
              </div>
              <Button
                href="/learn"
                variant="learn"
                size="md"
                className="w-full sm:w-auto shadow-course rounded-full py-3 px-6 group/btn"
                icon={<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
              >
                Explore Learn Tracks →
              </Button>
            </div>
          </motion.div>

          {/* ================= BUILD MODULE ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="group relative bp-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-orange-50/50 to-amber-50/70 border border-orange-200 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-orange-400 hover:ring-2 hover:ring-orange-400/20"
          >
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/30"
                >
                  <Code2 className="w-7 h-7" />
                </motion.div>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-200 text-xs font-extrabold text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 Client Rating</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800">
                    <Sparkles className="w-3 h-3 text-brand-orange" />
                    <span>Digital Solutions</span>
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-4xl sm:text-5xl font-black text-brand-orange mb-2 tracking-tight">
                BUILD
              </h3>

              <p className="text-base text-slate-600 leading-relaxed mb-6 font-medium">
                Build websites, software and digital solutions tailored to your business needs.
              </p>

              {/* Custom Vector Illustration: Software Engineer Workstation */}
              <div className="my-6 p-4 rounded-2xl bg-white/90 border border-orange-100 shadow-sm flex flex-col items-center">
                <DeveloperWorkstationIllustration className="w-full max-w-xs h-auto" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mt-2">
                  Developer Workstation & Software Engineering Desk
                </span>
              </div>

              {/* Service Capabilities Chips */}
              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 block">
                  Core Engineering Offerings:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Web Applications", "Mobile Apps (iOS/Android)", "AI & Automation Workflows", "Custom Software"].map((tech) => (
                    <motion.span 
                      key={tech}
                      whileHover={{ scale: 1.06, backgroundColor: "#fff7ed" }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-orange-200 text-xs font-bold text-slate-700 shadow-sm cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 mb-8">
                {[
                  "Custom Websites & Modern Web Apps",
                  "Scalable Software & Mobile Applications",
                  "AI Integrations & Workflow Automation",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Custom Web, App & AI Solutions</span>
              </div>
              <Button
                href="/build"
                variant="build"
                size="md"
                className="w-full sm:w-auto shadow-orange-glow rounded-full py-3 px-6 group/btn"
                icon={<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
              >
                Explore Build Services →
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
