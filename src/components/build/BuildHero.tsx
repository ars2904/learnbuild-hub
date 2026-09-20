import React from "react";
import { Button } from "@/components/common/Button";
import { Code2, ArrowRight } from "lucide-react";

export const BuildHero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs sm:text-sm font-extrabold text-brand-orange mb-6 shadow-sm">
          <Code2 className="w-4 h-4" />
          <span>Technology & Software Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
          Build Digital Solutions.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-10">
          Turning ideas into modern websites, applications and digital solutions.
        </p>

        <div className="flex justify-center">
          <Button
            href="/contact"
            variant="build"
            size="lg"
            className="shadow-vibe-orange"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
};
