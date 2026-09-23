"use client";

import React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Code2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Users, 
  GraduationCap, 
  Rocket, 
  Award,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Terminal,
  Building2,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
import { StudentWorkstationIllustration } from "@/components/common/StudentWorkstationIllustration";
import { DeveloperWorkstationIllustration } from "@/components/common/DeveloperWorkstationIllustration";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#090D16] text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-blue-600/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-orange-500/15 blur-[130px] pointer-events-none" />

        {/* Blueprint Dot Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#94A3B8 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>ABOUT LEARNBUILD HUB</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                <span className="text-white">Learn skills.</span> <br />
                <span className="inline-flex items-center gap-2 flex-wrap mt-1">
                  <span className="text-brand-orange">Build solutions.</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl mb-8">
                LearnBuild Hub helps students learn practical technology skills through hands-on training and helps businesses build custom websites, web apps, and software tools.
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
                <Link
                  href="/learn"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Learning</span>
                </Link>

                <Link
                  href="/build"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Explore Build Services</span>
                </Link>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800 text-xs sm:text-sm font-bold text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span>Practical Skill Tracks</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                  <span>Custom Digital Solutions</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Merit Internships</span>
                </span>
              </div>
            </motion.div>

            {/* Right Card Graphic (Matching Image 3 mockup) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center py-8 sm:py-0"
            >
              <div className="relative w-full max-w-md overflow-visible">
                
                {/* Floating Angled Top-Right Badge Text */}
                <div className="absolute -top-7 -right-2 sm:-right-6 z-20 pointer-events-none text-right font-sans transform rotate-[6deg] leading-tight select-none">
                  <div className="text-yellow-400 font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    Better Learners
                  </div>
                  <div className="text-white font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    Brighter Builders
                  </div>
                </div>

                {/* Floating Angled Bottom-Left Badge Text */}
                <div className="absolute -bottom-7 -left-2 sm:-left-6 z-20 pointer-events-none text-left font-sans transform -rotate-[6deg] leading-tight select-none">
                  <div className="text-sky-300 font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    Skills today
                  </div>
                  <div className="text-yellow-400 font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    A better tomorrow
                  </div>
                </div>

                {/* Dark Blue Card Box */}
                <div className="w-full rounded-[32px] bg-[#0B132B] border border-blue-900/40 p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-center text-center min-h-[340px]">
                  
                  <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-brand-blue shadow-xl mb-6">
                    <GraduationCap className="w-8 h-8 text-blue-400" />
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-black tracking-widest text-brand-orange uppercase mb-2">
                      LEARNBUILD HUB PHILOSOPHY
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-3">
                      GOOD PEOPLE BUILD GREAT THINGS
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xs leading-relaxed font-normal">
                      Bridging education with real execution so learners can turn ideas into tangible digital achievements.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 2. OUR VISION (EXACT MATCH TO MOCKUP DESIGN) ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Vision Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 block">
                OUR VISION
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                A more capable tomorrow.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal mb-8">
                We want to make practical, accessible learning easier for anyone who wants to build meaningful skills.
              </p>

              {/* Quote Card Left with Rounded Light Background and Thick Blue Bar Accent */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center gap-4 shadow-sm max-w-lg">
                <div className="w-1.5 h-12 bg-brand-blue rounded-full flex-shrink-0" />
                <p className="font-handwriting text-xl sm:text-2xl font-bold text-slate-900 tracking-wide">
                  “Learn something. Build something. Become something.”
                </p>
              </div>
            </motion.div>

            {/* Right Brown-to-Dark Gradient Card matching image mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#6B2800] via-[#421700] to-[#0B1120] p-10 sm:p-14 text-white shadow-2xl border border-orange-950 min-h-[280px] sm:min-h-[320px] flex flex-col justify-end overflow-hidden group">
                
                {/* Soft Radial Ambient Lighting */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[90px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-amber-300 leading-snug drop-shadow-md">
                    “A world with more doers, creators and problem solvers.”
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 3. TWO STRATEGIC PATHWAYS ================= */}
      <section className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-50 border border-orange-200 mb-3 inline-block shadow-sm">
              TWO STRATEGIC PATHWAYS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Learning Should Lead to Building
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
              We bring together structured skill courses and custom software development under one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* LEARN CARD */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bp-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/60 border border-blue-200 shadow-xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/30">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-brand-blue text-xs font-black uppercase tracking-wider">
                    Learn Pathway
                  </span>
                </div>

                <h3 className="text-4xl font-black text-brand-blue mb-2 tracking-tight">
                  LEARN
                </h3>
                <p className="text-base text-slate-700 leading-relaxed mb-6 font-medium">
                  Training, internships, and opportunities to develop practical skills.
                </p>

                {/* Vector illustration component */}
                <div className="my-6 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm flex flex-col items-center">
                  <StudentWorkstationIllustration className="w-full max-w-xs h-auto" />
                </div>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Practical Skill Development Tracks",
                    "8+ Advanced Technology Tracks (PHP, .NET, Java, Python, SQL)",
                    "Digital Marketing & Growth Funnel Training",
                    "1-3 Month Merit-Based Internship Program",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/learn"
                className="w-full py-3.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Explore Learn Tracks →</span>
              </Link>
            </motion.div>

            {/* BUILD CARD */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bp-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/60 border border-orange-200 shadow-xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/30">
                    <Code2 className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-brand-orange text-xs font-black uppercase tracking-wider">
                    Build Pathway
                  </span>
                </div>

                <h3 className="text-4xl font-black text-brand-orange mb-2 tracking-tight">
                  BUILD
                </h3>
                <p className="text-base text-slate-700 leading-relaxed mb-6 font-medium">
                  Build websites, software, and digital solutions tailored to your business needs.
                </p>

                {/* Vector illustration component */}
                <div className="my-6 p-4 rounded-2xl bg-white border border-orange-100 shadow-sm flex flex-col items-center">
                  <DeveloperWorkstationIllustration className="w-full max-w-xs h-auto" />
                </div>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Custom Websites & Responsive Web Apps",
                    "Cross-Platform Mobile Apps (iOS & Android)",
                    "Custom Software & AI Workflow Automations",
                    "5 Ready-Made Enterprise Management Systems",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/build"
                className="w-full py-3.5 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Explore Build Services →</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 4. OUR APPROACH: 4-STEP GROWTH METHODOLOGY ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-brand-blue mb-2 block">
              OUR METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              The 4-Step Growth Approach
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
              How we help learners build real practical capability step by step.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Learn",
                subtitle: "Structured Knowledge",
                desc: "Understand foundational concepts and modern tools with structured step-by-step guidance.",
                icon: BookOpen,
                badgeBg: "bg-blue-50 text-brand-blue border-blue-200",
              },
              {
                step: "02",
                title: "Build",
                subtitle: "Real Code Execution",
                desc: "Put concepts into practice immediately by building functional web apps, tools, and projects.",
                icon: Code2,
                badgeBg: "bg-orange-50 text-brand-orange border-orange-200",
              },
              {
                step: "03",
                title: "Apply",
                subtitle: "Merit Internships",
                desc: "Work on live project tasks, receive code feedback, and gain practical experience.",
                icon: Rocket,
                badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
              },
              {
                step: "04",
                title: "Grow",
                subtitle: "Portfolio & Career",
                desc: "Develop a strong portfolio, verified certificates, and practical skills for your career.",
                icon: TrendingUp,
                badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-black text-slate-400 tracking-widest uppercase">
                        Step {item.step}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl border ${item.badgeBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{item.title}</h3>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{item.subtitle}</div>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 5. CORE VALUES ================= */}
      <section className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              The Values We Work By
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
              Clear principles that shape how we teach and build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Practice Over Theory",
                desc: "We focus on writing working code and building real projects over pure video lectures.",
                icon: Terminal,
                color: "text-blue-600 bg-blue-50 border-blue-200",
              },
              {
                title: "Reliable Code Quality",
                desc: "Clean component structure, responsive design, and performance in every solution.",
                icon: ShieldCheck,
                color: "text-emerald-600 bg-emerald-50 border-emerald-200",
              },
              {
                title: "Merit & Support",
                desc: "Internships and progress earned through genuine effort, practice, and mentor reviews.",
                icon: Award,
                color: "text-amber-600 bg-amber-50 border-amber-200",
              },
              {
                title: "Client-Focused Delivery",
                desc: "Building custom software tools designed to help business operations grow smoothly.",
                icon: Cpu,
                color: "text-purple-600 bg-purple-50 border-purple-200",
              },
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl border ${val.color} flex items-center justify-center mb-5 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 6. BUILT FOR LEARNERS AT EVERY STAGE ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                WHO IS IT FOR?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Built for learners at every stage.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-normal mb-8">
                Whether you are a college student, beginner, career switcher, or business owner — our platform provides structured support.
              </p>

              <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/20 border border-orange-400/30 text-brand-orange flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-white mb-2">Our Mission</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  To create an environment where learners build real capability and businesses get reliable technology solutions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4 hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue border border-blue-200 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1">Students</h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Build practical engineering skills alongside your academic degree.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4 hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1">Beginners</h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Start learning programming fundamentals without feeling overwhelmed.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4 hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1">Career Switchers</h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Develop a verified project portfolio for software developer roles.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4 hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1">Businesses & Startups</h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Get custom software, websites, and pre-built management systems.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 7. FINAL DUAL CTA BANNER ================= */}
      <section className="py-20 md:py-28 bg-[#090D16] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange mb-3 block">
            GET STARTED WITH LEARNBUILD HUB
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Ready to Learn or Build?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Start your journey today by developing in-demand practical skills or creating custom digital solutions for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/learn"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Learning</span>
            </Link>

            <Link
              href="/build"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Build with Us</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
