import { Metadata } from "next";
import Link from "next/link";
import { Eye, Target, Heart, ArrowRight, BookOpen, Code2 } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export const metadata: Metadata = {
  title: "About Us | LearnBuild Hub",
  description:
    "LearnBuild Hub brings together learning opportunities and digital technology solutions under one brand.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-slate-100 border border-slate-200 mb-6 shadow-sm">
              OUR STORY
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
              About <span className="text-brand-blue">LearnBuild Hub</span>
            </h1>

            <p className="text-lg font-bold text-slate-800 mb-6">
              A platform for learners, creators and builders.
            </p>

            <p className="text-slate-600 text-base leading-relaxed font-normal max-w-xl">
              LearnBuild Hub brings together learning opportunities and digital technology solutions under one brand. We believe in creating real opportunities for individuals to learn, advance their skills and turn their ideas into impactful digital solutions.
            </p>
          </div>

          {/* Right Building Graphic with Official Hexagon Emblem & Slant Copy */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -top-4 right-4 transform rotate-6 font-handwriting text-slate-600 text-xl sm:text-2xl z-20 pointer-events-none">
              People <br />
              Skills <br />
              <span className="text-brand-blue font-bold">Technology</span> <br />
              <span className="text-brand-orange font-bold">Impact</span>
            </div>

            <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border-4 border-white shadow-2xl p-10 flex flex-col items-center justify-center min-h-[380px] text-white">
              {/* Restored Hexagon Emblem */}
              <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-blue-500/40 flex items-center justify-center shadow-2xl mb-4 p-2">
                <Logo variant="icon" />
              </div>
              <div className="text-sm font-black tracking-widest uppercase text-blue-200 mt-2">
                LearnBuild Architecture
              </div>
              <div className="text-xs text-slate-400 font-semibold mt-1">
                Learn. Build.
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3 PILLARS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bp-card bp-card-hover p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center mb-6 shadow-sm">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A future where learning and technology create new opportunities.
            </p>
          </div>

          <div className="bp-card bp-card-hover p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-brand-orange flex items-center justify-center mb-6 shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To connect people with the right skills and technology to build a better tomorrow.
            </p>
          </div>

          <div className="bp-card bp-card-hover p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-6 shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Our Values</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Learning, Innovation, Opportunity, Impact.
            </p>
          </div>
        </div>

        {/* ================= TWO SIDES. ONE VISION. ================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/80 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Two Sides. One Vision.
            </h2>
            <p className="text-slate-600 text-base font-normal max-w-2xl mx-auto">
              LearnBuild Hub combines learning opportunities and technology solutions to create a better tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* LEARN */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-blue font-extrabold text-xl mb-3">
                  <BookOpen className="w-6 h-6" />
                  <span>LEARN</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  Training, internships and practical skill development through our learning ecosystem partner, Corizo.
                </p>
              </div>
              <a
                href="https://corizo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
              >
                <span>Explore Corizo Platform</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* BUILD */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-orange font-extrabold text-xl mb-3">
                  <Code2 className="w-6 h-6" />
                  <span>BUILD</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  Technology solutions including websites, software applications, and digital business tools.
                </p>
              </div>
              <Link
                href="/build"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange hover:underline"
              >
                <span>Explore Build Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quote Block */}
          <div className="text-center max-w-xl mx-auto pt-6 border-t border-slate-200">
            <blockquote className="text-slate-700 text-base font-semibold italic">
              “Skills create opportunities. Ideas create impact. Together, they build a better tomorrow.”
            </blockquote>
          </div>
        </div>

      </div>
    </div>
  );
}
