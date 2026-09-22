import React from "react";
import { ExternalLink, ArrowRight, GraduationCap, Code2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export const DualPathCards: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-brand-orange uppercase bg-brand-orange/10 border border-brand-orange/30 mb-3 inline-block">
            Choose Your Destination
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Two Strategic Pathways
          </h2>
        </div>

        {/* Two Large Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ==================== LEARN CARD ==================== */}
          <div className="group relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-blue-950/40 border border-blue-500/30 hover:border-blue-400/60 pro-card-hover flex flex-col justify-between overflow-hidden shadow-glow-blue">
            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 uppercase tracking-wider">
                Skill Tracks Platform
              </span>
            </div>

            <div>
              <h3 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                LEARN
              </h3>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                Training, internships and opportunities to develop practical skills.
              </p>

              {/* Highlights */}
              <ul className="space-y-3.5 mb-10">
                {[
                  "Practical Skill Development Tracks",
                  "Industry Internship Opportunities",
                  "Mentorship & Career Upskilling",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Action */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Opens internal <span className="text-blue-400 font-semibold">/learn</span> page
              </div>
              <Button
                href="/learn"
                variant="learn"
                size="md"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Learn →
              </Button>
            </div>
          </div>

          {/* ==================== BUILD CARD ==================== */}
          <div className="group relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-amber-950/30 border border-brand-orange/30 hover:border-brand-orange/60 pro-card-hover flex flex-col justify-between overflow-hidden shadow-glow-orange">
            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300">
                <Code2 className="w-8 h-8" />
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-xs font-bold text-brand-orange uppercase tracking-wider">
                Internal Engineering
              </span>
            </div>

            <div>
              <h3 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                BUILD
              </h3>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                Build websites, software and digital solutions.
              </p>

              {/* Highlights */}
              <ul className="space-y-3.5 mb-10">
                {[
                  "Custom Websites & Modern Web Apps",
                  "Scalable Software & Mobile Applications",
                  "AI Integrations & Workflow Automation",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Action */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Opens internal <span className="text-brand-orange font-semibold">/build</span> page
              </div>
              <Button
                href="/build"
                variant="build"
                size="md"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Build →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
