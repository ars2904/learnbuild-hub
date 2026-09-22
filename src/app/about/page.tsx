"use client";

import React from "react";
import Link from "next/link";
import { 
  BookOpen, Code2, TrendingUp, Sparkles, ArrowRight, 
  CheckCircle2, Target, Heart, Eye, Users, GraduationCap, 
  Rocket, Layers, Award, Compass, MessageSquare 
} from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ================= 1. HERO SECTION (DARK ATMOSPHERIC BANNER) ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#090D16] text-white overflow-hidden">
        {/* Ambient Glow & Radial Lighting */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-blue-600/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-brand-orange/15 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 mb-6 inline-block shadow-sm">
                ABOUT LEARNBUILD HUB?
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Learn skills. <br />
                <span className="text-brand-blue">Build projects.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl mb-8">
                LearnBuild Hub is a learning platform focused on practical, career-oriented education. We help learners move beyond simply watching courses by encouraging them to understand concepts, build real projects, and develop skills they can actually use.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
                <Link
                  href="/learn"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Badges below CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800 text-xs font-extrabold text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Practical Learning</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  <span>Project Focused</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Career Oriented</span>
                </span>
              </div>
            </div>

            {/* Right Atmospheric Graphic with Floating Handwriting Quotes */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Handwritten Quote Floating Top */}
              <div className="absolute -top-8 right-0 transform rotate-6 font-handwriting text-amber-300 text-xl sm:text-2xl z-20 pointer-events-none drop-shadow-md">
                Better Learners <br />
                <span className="text-white">Brighter Builders</span>
              </div>

              {/* Handwritten Quote Floating Bottom */}
              <div className="absolute -bottom-8 left-0 transform -rotate-6 font-handwriting text-blue-300 text-lg sm:text-xl z-20 pointer-events-none drop-shadow-md">
                Skills today <br />
                <span className="text-amber-400">A better tomorrow</span>
              </div>

              {/* Central Visual Card */}
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-slate-800 shadow-2xl p-8 flex flex-col items-center justify-center min-h-[360px]">
                <div className="w-20 h-20 rounded-2xl bg-brand-blue/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-xl mb-6">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-black tracking-widest text-brand-orange uppercase mb-1">
                    LEARNBUILD HUB PHILOSOPHY
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    GOOD PEOPLE BUILD GREAT THINGS
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Bridging education with real execution so learners can turn ideas into tangible digital achievements.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. LEARNING SHOULD LEAD TO BUILDING ================= */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header & Paragraph */}
            <div className="lg:col-span-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                WHAT IS LEARNBUILD HUB?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Learning should lead to <span className="text-brand-blue">building.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We believe learning becomes more valuable when you can put it into practice. LearnBuild Hub brings together structured courses, practical learning resources, and project-based experiences to help learners turn knowledge into something tangible.
              </p>
            </div>

            {/* Right 3 Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Learn */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Learn</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Structured courses designed to make complex concepts easier to understand.
                  </p>
                </div>
              </div>

              {/* Card 2: Build */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Build</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Apply what you learn through practical projects and challenges.
                  </p>
                </div>
              </div>

              {/* Card 3: Progress */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Progress</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Develop skills, confidence, and a portfolio that reflects what you can actually do.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. OUR APPROACH: 5-STEP PROCESS FLOW ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                OUR APPROACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Not just courses. <br />
                <span className="text-brand-blue">A path to capability.</span>
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md font-medium leading-relaxed">
              We focus on a simple but powerful approach — learn, practice, build, improve, and progress. It's a complete learning cycle designed to help you turn knowledge into real skills.
            </p>
          </div>

          {/* 5 Horizontal Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {[
              { num: "01", title: "Learn", desc: "Understand the fundamentals.", icon: BookOpen, color: "bg-blue-100 text-brand-blue border-blue-200" },
              { num: "02", title: "Practice", desc: "Work with examples and exercises.", icon: Sparkles, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
              { num: "03", title: "Build", desc: "Create practical projects.", icon: Code2, color: "bg-purple-100 text-purple-600 border-purple-200" },
              { num: "04", title: "Improve", desc: "Learn from mistakes and refine your work.", icon: Target, color: "bg-orange-100 text-brand-orange border-orange-200" },
              { num: "05", title: "Progress", desc: "Build confidence and a stronger portfolio.", icon: Award, color: "bg-rose-100 text-rose-600 border-rose-200" },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative group hover:bg-white hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black text-slate-400 tracking-wider">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl border ${step.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 4. WHY LEARNERS CHOOSE US & BUILT FOR LEARNERS ================= */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Why Learners Choose Us */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                  WHY LEARNBUILD HUB?
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                  Why learners choose us.
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                  We focus on what actually matters — practical skills, real projects, and genuine growth.
                </p>

                <ul className="space-y-4">
                  {[
                    { title: "Practical learning", desc: "Focus on understanding and application." },
                    { title: "Project-oriented", desc: "Learn by creating, not just watching." },
                    { title: "Structured content", desc: "Follow a clear learning path." },
                    { title: "Career-focused", desc: "Develop skills relevant to real-world work." },
                    { title: "Beginner-friendly", desc: "Start from the fundamentals and progress naturally." },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-sm font-extrabold text-slate-900 block">{item.title}</span>
                        <span className="text-xs text-slate-600 font-medium">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Who Is It For (4 Audience Cards) */}
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                WHO IS IT FOR?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
                Built for learners at every stage.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1">Students</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Build skills alongside your academic studies.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1">Beginners</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Start learning without feeling overwhelmed.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1">Career Starters</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Develop practical skills and projects for your portfolio.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1">Continuous Learners</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Keep expanding your knowledge as technology evolves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5. OUR VISION: A MORE CAPABLE TOMORROW ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                OUR VISION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                A more capable tomorrow.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                We want to make practical, accessible learning easier for anyone who wants to build meaningful skills.
              </p>

              <blockquote className="p-4 rounded-2xl bg-slate-50 border-l-4 border-brand-blue text-slate-800 text-base font-bold italic font-handwriting">
                “Learn something. Build something. Become something.”
              </blockquote>
            </div>

            {/* Vision Mountain Image Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 p-8 text-white min-h-[260px] flex flex-col justify-end shadow-xl border border-slate-800">
                <div className="relative z-10">
                  <p className="font-handwriting text-xl sm:text-2xl text-amber-200 max-w-sm drop-shadow-md">
                    “A world with more doers, creators and problem solvers.”
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. AN ECOSYSTEM FOR YOUR JOURNEY ================= */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
              MORE THAN A COURSE PLATFORM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              An ecosystem for your journey.
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              LearnBuild Hub is designed as an ecosystem where learning, building, and personal growth come together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue border border-blue-200 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mb-1">Courses</h4>
              <p className="text-xs text-slate-600 font-medium">Learn from structured content.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mb-1">Projects</h4>
              <p className="text-xs text-slate-600 font-medium">Apply knowledge in real-world tasks.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange border border-orange-200 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mb-1">Progress</h4>
              <p className="text-xs text-slate-600 font-medium">Track your journey and achievements.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mb-1">Community</h4>
              <p className="text-xs text-slate-600 font-medium">Be part of a growing community of learners.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 7. BOTTOM READY TO START BUILDING BANNER ================= */}
      <section className="py-16 md:py-24 bg-[#090D16] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange mb-3 block">
            READY TO START BUILDING?
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Your next skill is closer than you think.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
            Explore courses designed to help you turn knowledge into practical skills.
          </p>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 uppercase tracking-wider"
          >
            <span>Explore Courses →</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
