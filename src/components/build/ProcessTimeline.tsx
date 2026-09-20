import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Search, Compass, Code, Rocket } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "Understand the idea and requirements.",
    icon: Search,
  },
  {
    step: "02",
    title: "Plan",
    description: "Define the solution and development approach.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Build",
    description: "Design and develop the product.",
    icon: Code,
  },
  {
    step: "04",
    title: "Launch",
    description: "Test, refine and deliver.",
    icon: Rocket,
  },
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Execution Methodology"
          title="Our Build Process"
          subtitle="A structured, transparent four-step approach to turning concept into reality."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-brand-orange/60 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-400">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-brand-orange flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
