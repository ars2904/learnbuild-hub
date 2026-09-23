"use client";

import React from "react";
import Image from "next/image";
import { CardVisualBanner } from "@/components/common/CardVisualBanner";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, ExternalLink, Sparkles } from "lucide-react";
import { BuildHeroBlueprint } from "@/components/build/BuildHeroBlueprint";
import { TickerBar } from "@/components/common/TickerBar";
import { ServicesGridBlueprint } from "@/components/build/ServicesGridBlueprint";
import { ReadyMadeSolutions } from "@/components/build/ReadyMadeSolutions";
import { ProcessStepsBlueprint } from "@/components/build/ProcessStepsBlueprint";
import { BuildCTABlueprint } from "@/components/build/BuildCTABlueprint";

const buildTickerItems = [
  "WEB DEVELOPMENT",
  "SOFTWARE ENGINEERING",
  "WEB APPLICATIONS",
  "MOBILE APPS",
  "READY-MADE SOLUTIONS",
  "AI & AUTOMATION",
];

const OUR_WORK_PROJECTS = [
  {
    title: "Apex Eduportal SaaS",
    category: "Full-Stack Web App",
    description: "Enterprise multi-tenant academy management platform featuring online student portals, automated billing, and live exam modules.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tech: ["Next.js 14", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    highlights: ["Multi-Tenant Architecture", "Automated Invoice Generation", "Real-Time Student Analytics"],
  },
  {
    title: "OmniCare Health Cloud",
    category: "Healthcare CRM",
    description: "Digital clinic suite streamlining patient booking, electronic health records (EHR), and automated prescription generation.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    highlights: ["HIPAA-Compliant Design", "Digital Prescription PDF Export", "SMS/WhatsApp Booking Alerts"],
  },
  {
    title: "FitPulse Gym Platform",
    category: "Web & Mobile Ecosystem",
    description: "Cross-platform mobile and web application for gym chains, handling subscription billing and trainer schedule bookings.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    tech: ["React Native", "Next.js", "PostgreSQL", "Stripe API"],
    highlights: ["Automated Subscription Reminders", "Trainer Allocation Calendar", "Mobile App for iOS & Android"],
  },
];

export default function BuildPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* 1. BUILD HERO */}
      <BuildHeroBlueprint />

      {/* 2. TICKER BAR */}
      <TickerBar items={buildTickerItems} />

      {/* 3. DEVELOPMENT SERVICES */}
      <ServicesGridBlueprint />

      {/* 4. OUR WORK - CASE STUDIES */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-orange-400 uppercase bg-orange-500/10 border border-orange-500/30 mb-3 inline-block shadow-sm">
              OUR WORK & CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Featured Client Engineering Work
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
              Discover how we architect production software, web applications, and enterprise platforms tailored to custom client needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OUR_WORK_PROJECTS.map((proj) => (
              <div
                key={proj.title}
                className="rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden flex flex-col hover:border-orange-500/50 transition-all duration-300 group shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <CardVisualBanner
                    imageUrl={proj.image}
                    title={proj.title}
                    category={proj.category}
                    type="solution"
                    className="h-52 w-full"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-slate-900/90 text-orange-400 text-[11px] font-black uppercase tracking-wider z-20 pointer-events-none shadow">
                    {proj.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-4">
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {proj.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md bg-slate-700/50 text-slate-300 text-[11px] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 5 READY-MADE SOFTWARE SOLUTIONS */}
      <section id="solutions" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReadyMadeSolutions showHeading={true} />
        </div>
      </section>

      {/* 6. PROCESS STEPS */}
      <ProcessStepsBlueprint />

      {/* 7. BUILD CTA */}
      <BuildCTABlueprint />
    </div>
  );
}
