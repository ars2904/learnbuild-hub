import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BookOpen, Code } from "lucide-react";

export const PlatformConcept: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-950/60 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Platform Architecture"
          title="Two Paths. One Platform."
          subtitle="LearnBuild Hub bridges practical skill acquisition with end-to-end digital technology execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LEARN Path Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 pro-card">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
                Practical Skill Tracks
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-3">
              LEARN PATHWAY
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              Develop practical skills through training and internship opportunities offered via internal LearnBuild Hub skill tracks. Build real project experience and expand your capabilities.
            </p>
          </div>

          {/* BUILD Path Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-brand-orange/20 hover:border-brand-orange/40 transition-all duration-300 pro-card">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3.5 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
                <Code className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-3.5 py-1.5 rounded-full border border-brand-orange/20">
                LearnBuild Agency
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-3">
              BUILD PATHWAY
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              Turn ideas into modern websites, software applications, and digital solutions engineered by our technology team using modern development practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
