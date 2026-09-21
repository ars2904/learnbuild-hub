import React from "react";
import { GraduationCap, Code2, ExternalLink, ArrowRight, BookOpen, Laptop } from "lucide-react";
import { Button } from "@/components/common/Button";

export const ArchwayPortals: React.FC = () => {
  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Archways & Dual Cards Perspective Container */}
        <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
          
          {/* ================= BACKGROUND 3D ARCHWAYS ================= */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 pointer-events-none opacity-95">
            
            {/* Left Archway: Learn (Blue) */}
            <div className="relative w-44 sm:w-64 lg:w-72 h-[380px] sm:h-[480px] lg:h-[520px] rounded-t-full bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900 border-4 border-white shadow-2xl overflow-hidden flex flex-col items-center justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 pointer-events-none" />
              {/* Stacked Books & Laptop Pedestal Graphic */}
              <div className="relative z-10 flex flex-col items-center mb-8">
                <div className="w-20 sm:w-28 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 flex items-center justify-center text-white mb-2 shadow-lg">
                  <Laptop className="w-8 h-8" />
                </div>
                <div className="w-24 sm:w-32 h-6 bg-amber-400 rounded-lg shadow-md border border-white/40 mb-1" />
                <div className="w-28 sm:w-36 h-6 bg-blue-900 rounded-lg shadow-md border border-white/40" />
              </div>
            </div>

            {/* Center Archway: Sunlit Gateway to Future City */}
            <div className="relative w-48 sm:w-68 lg:w-80 h-[420px] sm:h-[520px] lg:h-[560px] rounded-t-full bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 border-4 border-white shadow-2xl overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-100 opacity-90" />
              {/* Luminous Sunburst & City Skyline */}
              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="w-24 h-24 rounded-full bg-yellow-300/80 blur-md mb-6 animate-pulse" />
                <div className="w-full h-32 bg-gradient-to-t from-emerald-600/40 via-emerald-400/20 to-transparent rounded-t-3xl border-t border-white/50" />
              </div>
            </div>

            {/* Right Archway: Build (Orange) */}
            <div className="relative w-44 sm:w-64 lg:w-72 h-[380px] sm:h-[480px] lg:h-[520px] rounded-t-full bg-gradient-to-b from-orange-500 via-amber-600 to-orange-800 border-4 border-white shadow-2xl overflow-hidden flex flex-col items-center justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 pointer-events-none" />
              {/* Laptop Pedestal Graphic */}
              <div className="relative z-10 flex flex-col items-center mb-8">
                <div className="w-24 sm:w-32 h-16 bg-slate-900 border-2 border-slate-700 rounded-xl flex items-center justify-center text-brand-orange mb-2 shadow-2xl">
                  <Code2 className="w-8 h-8" />
                </div>
                <div className="w-28 sm:w-36 h-4 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* ================= FOREGROUND FLOATING DUAL CARDS ================= */}
          <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-64 items-center">
            
            {/* Floating LEARN Card (Left) */}
            <div className="studio-card studio-card-hover rounded-3xl p-8 sm:p-10 max-w-md mx-auto md:mx-0 shadow-arch-card border border-slate-200/90 bg-white/95 backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center mb-6 shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>

              <h3 className="text-3xl font-black text-brand-blue mb-3 tracking-tight">
                LEARN
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                Training, internships and opportunities to develop practical skills.
              </p>

              <div className="flex flex-col gap-2">
                <Button
                  href="https://corizo.in"
                  isExternal={true}
                  variant="learn"
                  size="md"
                  className="w-full shadow-vibe-blue rounded-full py-3"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Explore Learn
                </Button>
                <span className="text-[11px] text-center text-slate-400 font-semibold mt-1">
                  Redirects to Corizo.in
                </span>
              </div>
            </div>

            {/* Floating BUILD Card (Right) */}
            <div className="studio-card studio-card-hover rounded-3xl p-8 sm:p-10 max-w-md mx-auto md:mx-0 shadow-arch-card border border-slate-200/90 bg-white/95 backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-brand-orange flex items-center justify-center mb-6 shadow-sm">
                <Code2 className="w-7 h-7" />
              </div>

              <h3 className="text-3xl font-black text-brand-orange mb-3 tracking-tight">
                BUILD
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                Build websites, software and digital solutions.
              </p>

              <div className="flex flex-col gap-2">
                <Button
                  href="/build"
                  variant="build"
                  size="md"
                  className="w-full shadow-vibe-orange rounded-full py-3"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Build →
                </Button>
              </div>
            </div>

          </div>

          {/* Archway Bottom Center Caption */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center z-20">
            <span className="text-xs sm:text-sm font-bold text-slate-500 italic font-handwriting tracking-wide">
              Different Paths. A Brighter Tomorrow.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
