import React from "react";
import { BookOpen, Layers, Rocket, Users } from "lucide-react";

export const featureItems = [
  {
    icon: BookOpen,
    title: "Practical Approach",
    description: "Real skills and real solutions for the real world.",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    icon: Layers,
    title: "Unified Platform",
    description: "Learning and technology under one brand.",
    color: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    icon: Rocket,
    title: "Future Ready",
    description: "Built for individuals, businesses and what's next.",
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  {
    icon: Users,
    title: "Meaningful Impact",
    description: "Skills, solutions and opportunities that create value.",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
];

export const FeatureBar: React.FC = () => {
  return (
    <section className="py-12 bg-white/80 border-y border-slate-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4 p-2">
                <div className={`p-3 rounded-2xl border ${item.color} flex-shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
