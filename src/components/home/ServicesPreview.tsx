import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/Button";
import { Globe, LayoutGrid, Cpu, Smartphone, Bot, ArrowRight } from "lucide-react";

export const servicesData = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Business websites, landing pages and modern web experiences designed for maximum impact.",
  },
  {
    icon: LayoutGrid,
    title: "Web Applications",
    description: "Custom web applications designed around specific business requirements and workflows.",
  },
  {
    icon: Cpu,
    title: "Software Development",
    description: "Custom software and digital business tools built for performance and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Modern mobile application development for iOS and Android platforms.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Smart AI integrations and workflow automation to streamline operations.",
  },
];

export const ServicesPreview: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Build Capabilities"
          title="Digital Technology Solutions"
          subtitle="We craft modern digital products tailored to your business needs."
        />

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-brand-orange/50 pro-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTA */}
        <div className="text-center">
          <Button
            href="/build"
            variant="build"
            size="lg"
            className="shadow-glow-orange"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Explore Our Services →
          </Button>
        </div>
      </div>
    </section>
  );
};
