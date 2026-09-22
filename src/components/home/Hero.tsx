import React from "react";
import { ArrowRight, BookOpen, Code, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/common/Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Cyber Grid & Glowing Radial Lights */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-r from-blue-600/25 via-brand-orange/20 to-indigo-600/25 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-slate-900/90 border border-white/10 text-xs sm:text-sm font-bold text-slate-300 mb-8 backdrop-blur-xl shadow-2xl">
          <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
          <span className="tracking-wide uppercase text-white">LEARNBUILD HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <span className="text-brand-orange font-black uppercase tracking-wider">Learn. Build.</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
          Learn Skills. <br className="hidden sm:inline" />
          <span className="gradient-text-orange-pro">
            Build Solutions.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-normal mb-12 drop-shadow-sm">
          LearnBuild Hub brings practical skill learning opportunities and custom digital technology engineering under one unified modern brand.
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-lg mx-auto mb-16">
          <Button
            href="/learn"
            variant="learn"
            size="lg"
            className="w-full sm:w-auto shadow-glow-blue"
            icon={<BookOpen className="w-5 h-5" />}
            iconPosition="left"
          >
            Explore Learn Pathway
          </Button>

          <Button
            href="/build"
            variant="build"
            size="lg"
            className="w-full sm:w-auto shadow-glow-orange"
            icon={<Code className="w-5 h-5" />}
            iconPosition="left"
          >
            Explore Build Services
          </Button>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Internal Practical Skill Tracks</span>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <Code className="w-5 h-5 text-brand-orange flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Custom Software Engineering</span>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md sm:col-span-2 md:col-span-1">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Modern Technology Stack</span>
          </div>
        </div>
      </div>
    </section>
  );
};
