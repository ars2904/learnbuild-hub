import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, GraduationCap, Code2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export const BlueprintHero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Top Subtitle Badge */}
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-white border border-slate-200 mb-6 shadow-sm">
              SAME PEOPLE. A BRIGHTER TOMORROW.
            </span>

            {/* Main Hero Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
              <span className="text-brand-blue">Learn Skills.</span> <br />
              <span className="text-brand-orange">Build Solutions.</span>
            </h1>

            {/* Paragraph Copy */}
            <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
              A platform that connects learning opportunities with real-world technology solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Button
                href="/learn"
                variant="learn"
                size="lg"
                className="w-full sm:w-auto rounded-full py-3.5 shadow-md shadow-brand-blue/20"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Learn
              </Button>

              <Button
                href="/build"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full py-3.5 border-2 border-slate-300 text-slate-800 hover:border-slate-900"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Build
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-4 border-t border-slate-200/80 w-full">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Skills</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                <span>Opportunities</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Ideas</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Real Impact</span>
              </span>
            </div>
          </div>

          {/* Right Visual Column (Student Hero Visual & Slant Annotation) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Handwritten Slant Text Overlay */}
            <div className="absolute -top-4 right-4 transform rotate-6 font-handwriting text-slate-600 text-xl sm:text-2xl z-20 pointer-events-none leading-tight">
              Learn <br />
              <span className="text-brand-blue font-bold">Create</span> <br />
              Build <br />
              <span className="text-brand-orange font-bold">A Better Tomorrow</span>
            </div>

            {/* Visual Card Frame */}
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-sky-200/60 via-blue-50 to-amber-100/40 border-4 border-white shadow-2xl p-8 flex flex-col justify-between min-h-[420px] items-center text-center">
              <div className="w-24 h-24 rounded-full bg-brand-blue text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-brand-blue/30 mt-6 mb-8">
                <span>LB</span>
              </div>

              <div className="relative z-10 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg w-full">
                <div className="text-xs font-black tracking-widest text-slate-400 uppercase mb-1">
                  LEARNBUILD HUB
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Empowering Learners & Engineering Solutions
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
