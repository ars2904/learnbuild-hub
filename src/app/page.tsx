"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CardVisualBanner } from "@/components/common/CardVisualBanner";
import Link from "next/link";
import { 
  Briefcase, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Code2, 
  MonitorPlay,
  FileText
} from "lucide-react";
import { CoursePlatformHero } from "@/components/home/CoursePlatformHero";
import { RichDualModules } from "@/components/home/RichDualModules";
import { TrackShowcase } from "@/components/home/TrackShowcase";
import { ReadyMadeSolutions } from "@/components/build/ReadyMadeSolutions";
import { HomeCTA } from "@/components/home/HomeCTA";
import { IntroSplash } from "@/components/common/IntroSplash";
import { InternshipModal } from "@/components/learn/InternshipModal";

// Sample projects preview
const SAMPLE_PROJECTS = [
  {
    title: "Apex Eduportal SaaS",
    category: "Full-Stack Web App",
    description: "Enterprise multi-tenant academy management platform with automated billing and student dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tech: ["Next.js 14", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "OmniCare Clinic System",
    category: "Healthcare CRM",
    description: "Digital doctor booking, electronic medical records, and automated prescription workflow.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "FitPulse Gym Platform",
    category: "Custom Web & Mobile App",
    description: "Member management, automated WhatsApp renewal reminders, and subscription analytics.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    tech: ["React Native", "Next.js", "PostgreSQL"],
  },
];

// Sample blog preview
const SAMPLE_BLOGS = [
  {
    id: "1",
    title: "Why Modern Full-Stack Engineers Choose Next.js 14 & App Router",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    excerpt: "Explore how Server Components, Streaming SSR, and Route Handlers are transforming full-stack web development.",
  },
  {
    id: "2",
    title: "Integrating AI & LLMs into Production Web Applications",
    category: "AI",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
    excerpt: "A practical step-by-step guide to embedding OpenAI & PyTorch AI microservices into enterprise SaaS platforms.",
  },
  {
    id: "3",
    title: "5 Growth Marketing Strategies Every Tech Startup Needs in 2026",
    category: "Digital Marketing",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    excerpt: "How organic SEO, Meta ad retargeting, and automated email funnels drive scalable customer acquisition.",
  },
];

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative bg-white overflow-hidden">
      {/* Intro Animation */}
      <IntroSplash onComplete={() => setIntroFinished(true)} />

      <div
        className={`transition-opacity duration-500 ${
          introFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* 1. HERO SECTION */}
        <CoursePlatformHero />

        {/* 2. DUAL MODULES (Learn preview & Build preview) */}
        <RichDualModules />

        {/* 3. FEATURED LEARNING TRACKS */}
        <TrackShowcase />

        {/* 4. SELECTED PROJECTS (Build Work Preview) */}
        <section className="py-16 md:py-24 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider mb-3">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Build Portfolio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Selected Client Projects & Case Studies
                </h2>
              </div>

              <Link
                href="/build"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>View All Custom Build Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SAMPLE_PROJECTS.map((proj) => (
                <div
                  key={proj.title}
                  className="rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden flex flex-col hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <CardVisualBanner
                      imageUrl={proj.image}
                      title={proj.title}
                      category={proj.category}
                      type="solution"
                      className="h-48 w-full"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 text-orange-400 text-[11px] font-black uppercase tracking-wider z-20 pointer-events-none shadow">
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

        {/* 5. INTERNSHIP CTA BANNER */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-4">
                  <Briefcase className="w-3.5 h-3.5 text-white" />
                  <span>Merit-Based Internship Program</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  Gain Real-World Engineering & Product Experience
                </h2>
                <p className="text-orange-100 text-base sm:text-lg leading-relaxed font-normal">
                  Work on production codebases, build enterprise features, and get 1-on-1 mentorship during a 1–3 month merit-based internship.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                  onClick={() => setIsInternshipModalOpen(true)}
                  className="w-full sm:w-auto py-4 px-8 rounded-full bg-white hover:bg-slate-100 text-orange-600 font-extrabold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                >
                  Apply for Internship →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. READY-MADE SOLUTIONS PREVIEW */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReadyMadeSolutions limit={3} showHeading={true} />
            
            <div className="text-center mt-12">
              <Link
                href="/build"
                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <span>View All Ready-Made Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. BLOG PREVIEW SECTION */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-black uppercase tracking-wider mb-3">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Insights & Articles</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Latest Insights from LearnBuild Hub
                </h2>
              </div>

              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue hover:text-blue-700 transition-colors"
              >
                <span>Explore All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SAMPLE_BLOGS.map((blog) => (
                <Link
                  key={blog.id}
                  href="/blogs"
                  className="group rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <CardVisualBanner
                      imageUrl={blog.image}
                      title={blog.title}
                      category={blog.category}
                      type="blog"
                      className="h-48 w-full"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-black uppercase tracking-wider z-20 pointer-events-none shadow">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 mb-2">
                        {blog.readTime}
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL LEARN + BUILD CTA */}
        <HomeCTA />

        {/* Internship Modal */}
        <InternshipModal
          isOpen={isInternshipModalOpen}
          onClose={() => setIsInternshipModalOpen(false)}
        />
      </div>
    </div>
  );
}
