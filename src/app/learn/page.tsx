"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardVisualBanner } from "@/components/common/CardVisualBanner";
import { 
  Star, 
  Clock, 
  Search, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  MessageSquare,
  Sparkles,
  Code2,
  Cpu,
  Coffee,
  Terminal,
  Layers,
  Globe,
  Database,
  Sliders
} from "lucide-react";
import { motion } from "framer-motion";
import { sampleCourses } from "@/data/courses";
import { TECH_TRACKS } from "@/data/techTracks";
import { EnrollmentModal } from "@/components/learn/EnrollmentModal";
import { InternshipModal } from "@/components/learn/InternshipModal";
import { DemoRequestModal } from "@/components/build/DemoRequestModal";

const categories = ["All", "Digital Marketing", "Web Engineering", "AI & Data", "Mobile Dev", "Cloud & DevOps"];

const trackIconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-brand-blue" />,
  Cpu: <Cpu className="w-6 h-6 text-purple-600" />,
  Coffee: <Coffee className="w-6 h-6 text-amber-700" />,
  Terminal: <Terminal className="w-6 h-6 text-emerald-600" />,
  Layers: <Layers className="w-6 h-6 text-sky-600" />,
  Globe: <Globe className="w-6 h-6 text-blue-600" />,
  Database: <Database className="w-6 h-6 text-indigo-600" />,
  Sliders: <Sliders className="w-6 h-6 text-orange-600" />,
};

export default function LearnCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<string>("");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedCourseForDemo, setSelectedCourseForDemo] = useState<string>("");
  const [internshipModalOpen, setInternshipModalOpen] = useState(false);
  const [selectedInternshipTrack, setSelectedInternshipTrack] = useState<string>("Web Engineering Track");

  const techTrackSlugs = TECH_TRACKS.map((t) => t.slug);
  const coreFeaturedCourses = sampleCourses.filter((course) => !techTrackSlugs.includes(course.slug));

  const filteredCourses = coreFeaturedCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.whatYouWillLearn.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenEnrollModal = (courseTitle: string) => {
    setSelectedCourseForEnrollment(courseTitle);
    setEnrollModalOpen(true);
  };

  const handleOpenDemoModal = (courseTitle: string) => {
    setSelectedCourseForDemo(courseTitle);
    setDemoModalOpen(true);
  };

  const handleOpenInternshipModal = (trackTitle: string) => {
    setSelectedInternshipTrack(trackTitle);
    setInternshipModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-blue uppercase bg-blue-50 border border-blue-200 mb-4 inline-block shadow-sm"
          >
            LEARN & UPSKILL PLATFORM
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4"
          >
            Courses, Tech Tracks & <span className="text-brand-blue">Internships</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Hands-on learning programs, specialized technology tracks, and live merit-based internship opportunities built for modern career success.
          </motion.p>
        </div>

        {/* ================= 1. FEATURED COURSES SECTION ================= */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Learning Courses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Explore our core training curricula with live mentorship.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search courses or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Courses Found</h3>
              <p className="text-sm text-slate-500">Try searching for a different keyword or select another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bp-card rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all"
                >
                  <div>
                    {/* Course Visual Banner */}
                    <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                      <CardVisualBanner
                        imageUrl={course.image}
                        title={course.title}
                        category={course.category}
                        type="course"
                        className="h-48 w-full"
                      />
                      
                      {/* Top Pill Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-brand-blue backdrop-blur-md shadow">
                          {course.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold text-amber-700 bg-amber-50/95 border border-amber-200 flex items-center gap-1 shadow">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating} ★</span>
                        </span>
                      </div>

                      {/* Bottom Banner Duration Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white z-20 pointer-events-none">
                        <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-slate-900 mb-2 leading-snug hover:text-brand-blue transition-colors">
                        <Link href={`/learn/${course.slug}`}>{course.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6 line-clamp-3">
                        {course.shortDescription}
                      </p>

                      {/* Key Highlights / Skill Tags */}
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Core Learning Skills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {course.whatYouWillLearn.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-[11px] font-bold text-slate-700 line-clamp-1"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Card Action Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenDemoModal(course.title)}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-blue transition-colors group/btn"
                    >
                      <span>Apply for Demo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleOpenEnrollModal(course.title)}
                      className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-brand-blue/20 transition-all hover:scale-105"
                    >
                      Enroll Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ================= 2. 8 ADVANCED TECHNOLOGY TRACKS SECTION ================= */}
        <section className="mb-24 pt-12 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 border border-indigo-200 mb-3 inline-block shadow-sm">
              SPECIALIZED TECHNOLOGY TRACKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Advanced Tech & Language Tracks
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
              Targeted skill development across major enterprise languages, frameworks, and customizable curricula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_TRACKS.map((track) => (
              <div
                key={track.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-brand-blue transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      href={`/learn/${track.slug}`}
                      className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform"
                    >
                      {trackIconMap[track.iconName] || <Code2 className="w-6 h-6 text-brand-blue" />}
                    </Link>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    <Link href={`/learn/${track.slug}`}>{track.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 line-clamp-2">
                    {track.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2 mb-6">
                    {track.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Badges & Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-1.5">
                      {track.options.map((opt) => (
                        <span
                          key={opt}
                          className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue text-[10px] font-bold"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                    {track.capstone && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-extrabold">
                        Capstone
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => handleOpenDemoModal(track.title)}
                      className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-brand-blue transition-colors"
                    >
                      Apply for Demo
                    </button>

                    <button
                      onClick={() => handleOpenEnrollModal(track.title)}
                      className="px-4 py-2 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                    >
                      Enroll Track
                    </button>
                  </div>

                  <div className="text-center pt-1 border-t border-slate-100/80">
                    <Link
                      href={`/learn/${track.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-blue hover:underline uppercase tracking-wider"
                    >
                      <span>Explore Track Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 3. INTERNSHIP PROGRAM SECTION ================= */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-orange-400 uppercase bg-orange-500/10 border border-orange-500/30 mb-4 inline-block shadow-sm">
                MERIT-BASED INTERNSHIP PROGRAM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                1–3 Months Practical Internship
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
                Work directly with engineering mentors on active software projects, develop production-grade code, and earn an industry-recognized merit certificate.
              </p>
            </div>

            {/* 4-Step Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  step: "Step 01",
                  title: "Online Application",
                  desc: "Select your preferred technology track and share your background or portfolio details.",
                },
                {
                  step: "Step 02",
                  title: "Skill Screening",
                  desc: "A brief technical assessment & phone/WhatsApp discussion with our mentor team.",
                },
                {
                  step: "Step 03",
                  title: "Selection & Onboarding",
                  desc: "Get matched with a mentor, codebase repository, and live project deliverables.",
                },
                {
                  step: "Step 04",
                  title: "Live Engineering & Certificate",
                  desc: "Build feature modules, receive code reviews, and earn a verified completion certificate.",
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 relative flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-black text-orange-400 uppercase tracking-widest block mb-2">
                      {s.step}
                    </span>
                    <h3 className="text-lg font-black text-white mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto text-center">
              <button
                onClick={() => handleOpenInternshipModal("Web Engineering Track")}
                className="w-full sm:w-auto py-4 px-8 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all"
              >
                Apply for Internship →
              </button>

              <a
                href="https://wa.me/918149565351?text=Hello%20LearnBuild%20Hub%20Team%2C%20I%20want%20to%20apply%20for%20the%20Internship%20Program."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Apply via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Course Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        selectedCourseTitle={selectedCourseForEnrollment}
      />

      {/* Demo Request Modal */}
      <DemoRequestModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        selectedSolutionTitle={selectedCourseForDemo}
      />

      {/* Internship Modal */}
      <InternshipModal
        isOpen={internshipModalOpen}
        onClose={() => setInternshipModalOpen(false)}
        selectedTrack={selectedInternshipTrack}
      />
    </div>
  );
}
