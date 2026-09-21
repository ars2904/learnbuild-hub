import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const VisionSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-slate-100 border border-slate-200 mb-6">
              OUR VISION
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
              A More Skilled <br />
              and <span className="text-brand-orange">Creative</span> Tomorrow.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
              We believe in a future where learning leads to opportunity and ideas turn into real solutions. LearnBuild Hub is our step towards making that future accessible to everyone.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              <span>About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Visual Column: 3D Architectural Stairs & Pillar Graphic */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Handwritten Quote Accent */}
            <div className="absolute -top-4 right-8 transform rotate-3 font-handwriting text-slate-600 text-xl sm:text-2xl z-20 pointer-events-none">
              "Same curiosity. <br />
              <span className="text-brand-orange">A brighter tomorrow."</span>
            </div>

            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100/60 via-amber-50/40 to-slate-100 border border-slate-200/80 p-8 sm:p-12 shadow-2xl flex flex-col justify-between min-h-[380px]">
              
              {/* Sunlit Arch Inset */}
              <div className="absolute top-0 right-0 w-44 h-64 rounded-bl-full bg-gradient-to-b from-sky-200/80 to-amber-200/50 border-l border-b border-white pointer-events-none" />

              {/* Inscribed Monument Pillar */}
              <div className="relative z-10 max-w-[200px] p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg">
                <div className="space-y-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                  <div className="text-brand-blue font-extrabold text-sm">LEARN</div>
                  <div className="text-brand-orange font-extrabold text-sm">BUILD</div>
                  <div>CREATE</div>
                  <div>OPPORTUNITY</div>
                  <div className="text-slate-900 font-extrabold">TOGETHER</div>
                </div>
              </div>

              {/* Staircase Step Bars Graphic */}
              <div className="relative z-10 mt-8 space-y-2 pt-6 border-t border-slate-200/60">
                <div className="w-full h-3 bg-white rounded-full shadow-sm" />
                <div className="w-4/5 h-3 bg-slate-200 rounded-full" />
                <div className="w-3/5 h-3 bg-slate-300 rounded-full" />
                <div className="w-2/5 h-3 bg-slate-400 rounded-full" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
