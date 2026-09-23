"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CardVisualBanner } from "@/components/common/CardVisualBanner";
import { Check, MonitorPlay, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { READY_MADE_SOLUTIONS, ReadyMadeSolution } from "@/data/solutions";
import { DemoRequestModal } from "./DemoRequestModal";

interface ReadyMadeSolutionsProps {
  limit?: number;
  showHeading?: boolean;
}

export const ReadyMadeSolutions: React.FC<ReadyMadeSolutionsProps> = ({
  limit,
  showHeading = true,
}) => {
  const [selectedSolution, setSelectedSolution] = useState<ReadyMadeSolution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displaySolutions = limit ? READY_MADE_SOLUTIONS.slice(0, limit) : READY_MADE_SOLUTIONS;

  const handleOpenDemo = (solution: ReadyMadeSolution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full">
      {showHeading && (
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>Ready-Made Software Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Pre-Built Enterprise Systems Ready to Deploy
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Skip months of development with our custom-tailorable, battle-tested software suites for educational, business, and healthcare institutions.
          </p>
        </div>
      )}

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displaySolutions.map((solution) => (
          <div
            key={solution.id}
            className="group relative rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Card Image Banner */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <CardVisualBanner
                imageUrl={solution.image}
                title={solution.title}
                category={solution.badge}
                type="solution"
                className="h-48 w-full"
              />
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow">
                  {solution.badge}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                  {solution.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
                  {solution.description}
                </p>

                {/* Key Features List */}
                <div className="space-y-2 mb-6">
                  {solution.keyFeatures.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack & Request Demo CTA */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {solution.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenDemo(solution)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-brand-blue/25 transition-all group/btn"
                >
                  <MonitorPlay className="w-4 h-4 text-orange-400 group-hover/btn:text-white transition-colors" />
                  <span>Request Live Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal */}
      <DemoRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSolutionTitle={selectedSolution?.title}
      />
    </section>
  );
};
