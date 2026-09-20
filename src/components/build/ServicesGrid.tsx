import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Globe, LayoutGrid, Cpu, Smartphone, Bot, CheckCircle } from "lucide-react";

export const buildServicesList = [
  {
    icon: Globe,
    title: "1. Website Development",
    description: "Business websites, landing pages and modern web experiences.",
    highlights: ["Responsive & Mobile-First", "SEO Optimized", "High Performance"],
  },
  {
    icon: LayoutGrid,
    title: "2. Web Applications",
    description: "Custom web applications designed around business requirements.",
    highlights: ["Tailored Workflows", "Scalable Architecture", "Intuitive Interfaces"],
  },
  {
    icon: Cpu,
    title: "3. Software Development",
    description: "Custom software and digital business tools.",
    highlights: ["Enterprise Grade Code", "API Integration Ready", "Robust Security"],
  },
  {
    icon: Smartphone,
    title: "4. Mobile Applications",
    description: "Modern mobile application development.",
    highlights: ["Cross-Platform & Native", "Smooth UX & Animations", "App Store Ready"],
  },
  {
    icon: Bot,
    title: "5. AI & Automation",
    description: "AI integrations and workflow automation.",
    highlights: ["Smart Process Automation", "LLM & AI Integration", "Efficiency Boost"],
  },
];

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Offerings"
          title="Engineering & Development Services"
          subtitle="Comprehensive digital services designed to turn business ideas into high-performing software."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildServicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-brand-orange/60 vibe-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-brand-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 pt-4 border-t border-slate-200">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
