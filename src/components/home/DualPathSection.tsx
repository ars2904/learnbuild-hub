import React from "react";
import { GraduationCap, Code2, ArrowRight, Laptop, BookOpen } from "lucide-react";
import { Button } from "@/components/common/Button";

export const DualPathSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-slate-50/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Two Paths. One Platform.
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Whether you want to learn new skills or build digital solutions, LearnBuild Hub gives you a clear path forward.
          </p>

          {/* Handwritten Slant Quote */}
          <div className="hidden md:block absolute -top-4 right-12 transform rotate-6 font-handwriting text-brand-blue text-xl sm:text-2xl font-bold select-none pointer-events-none">
            Learn Today <br />
            <span className="text-brand-orange">Build Tomorrow</span>
          </div>
        </div>

        {/* Two Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* LEARN CARD (Left) */}
          <div className="bp-card bp-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-white border border-slate-200 shadow-md">
            <div>
              {/* 3D Illustration Graphic Box */}
              <div className="h-44 w-full rounded-2xl bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100/60 border border-blue-200/80 flex flex-col items-center justify-center p-6 mb-8 relative overflow-hidden">
                <div className="w-20 h-20 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/30 mb-2">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div className="w-28 h-4 bg-amber-400 rounded-full shadow-sm" />
              </div>

              <h3 className="text-3xl font-black text-brand-blue mb-3 tracking-tight">
                LEARN
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                Training, internships and opportunities to develop practical skills.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
              <Button
                href="https://corizo.in"
                isExternal={true}
                variant="learn"
                size="md"
                className="rounded-full py-3 px-6 shadow-md shadow-brand-blue/20"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Learn
              </Button>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                →
              </div>
            </div>
          </div>

          {/* BUILD CARD (Right) */}
          <div className="bp-card bp-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-white border border-slate-200 shadow-md">
            <div>
              {/* 3D Illustration Graphic Box */}
              <div className="h-44 w-full rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100/60 border border-purple-200/80 flex flex-col items-center justify-center p-6 mb-8 relative overflow-hidden">
                <div className="w-20 h-20 rounded-2xl bg-brand-purple text-white flex items-center justify-center shadow-lg shadow-brand-purple/30 mb-2">
                  <Laptop className="w-10 h-10" />
                </div>
                <div className="w-28 h-4 bg-slate-900 rounded-full shadow-sm" />
              </div>

              <h3 className="text-3xl font-black text-brand-purple mb-3 tracking-tight">
                BUILD
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                Build websites, software and digital solutions.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
              <Button
                href="/build"
                variant="build"
                size="md"
                className="rounded-full py-3 px-6 shadow-md shadow-brand-orange/20"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Build
              </Button>
              <div className="w-10 h-10 rounded-full bg-purple-50 text-brand-purple flex items-center justify-center font-bold">
                →
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
