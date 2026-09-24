"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Star, Clock, CheckCircle2, ChevronDown, 
  ArrowLeft, GraduationCap, Briefcase, ShieldCheck, Send, MonitorPlay,
  ArrowRight, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleCourses } from "@/data/courses";
import { EnrollmentModal } from "@/components/learn/EnrollmentModal";
import { DemoRequestModal } from "@/components/build/DemoRequestModal";
import { InstructorProfileModal } from "@/components/learn/InstructorProfileModal";
import { getInstructorsForCourse, Instructor } from "@/data/instructors";

type TabType = "overview" | "curriculum" | "learn" | "instructors" | "faqs";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const course = sampleCourses.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedInstructorForEnroll, setSelectedInstructorForEnroll] = useState<string>("");
  const [profileModalInstructor, setProfileModalInstructor] = useState<Instructor | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <GraduationCap className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-slate-600 mb-6 text-xs sm:text-sm">The course track you are looking for does not exist or has been updated.</p>
        <Link
          href="/learn"
          className="px-6 py-3 rounded-full bg-brand-blue text-white font-bold text-xs sm:text-sm shadow-md"
        >
          ← Back to All Learn Tracks
        </Link>
      </div>
    );
  }

  const instructors = getInstructorsForCourse(course.title);

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  const handleOpenEnrollWithInstructor = (instructorName: string = "") => {
    setSelectedInstructorForEnroll(instructorName);
    setEnrollModalOpen(true);
  };

  const scrollToSection = (tabId: TabType) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sampleFaqs = [
    {
      q: "What is the format of live mentorship?",
      a: "Classes include interactive live sessions with your assigned mentor, 1-on-1 code reviews, and project feedback."
    },
    {
      q: "Can I choose my preferred instructor?",
      a: "Yes! You can review mentor profiles and select your preferred instructor during enrollment."
    },
    {
      q: "Will I get a verified certificate upon completion?",
      a: "Yes, after completing the capstone project and curriculum modules, you receive an industry-recognized certificate."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-4 pb-16 sm:pt-10 sm:pb-28 overflow-x-hidden w-full">
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Skill Tracks</span>
          </Link>
        </div>

        {/* ================= HERO COURSE HEADER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 pb-8 sm:mb-10 sm:pb-10 border-b border-slate-200">
          
          {/* Left Text & Overview */}
          <div className="lg:col-span-7 flex flex-col items-start w-full min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-[11px] sm:text-xs font-extrabold border border-blue-200">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] sm:text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{course.rating} ★ Track Score</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4 leading-tight break-words w-full">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 mb-6 leading-relaxed break-words w-full">
              {course.tagline}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 w-full text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="truncate">Duration: <strong className="text-slate-900">{course.duration}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span className="truncate">Mode: <strong className="text-slate-900">{course.mode}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">Batch Size: <strong className="text-slate-900">20 Seats</strong></span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
              <button
                onClick={() => handleOpenEnrollWithInstructor("")}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-blue/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enroll Now</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 border border-slate-700"
              >
                <MonitorPlay className="w-4 h-4 text-blue-400" />
                <span>Request a Demo</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual Banner */}
          <div className="lg:col-span-5 w-full">
            <div className="bp-card rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3 sm:p-4">
              <div className="relative h-48 sm:h-64 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-bold text-blue-300">LearnBuild Hub Admissions</div>
                  <div className="text-xs sm:text-sm font-black">Industry Aligned Track</div>
                </div>
              </div>

              <div className="space-y-2 px-1 pb-1 text-xs font-semibold text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Certificate Included:</span>
                  <span className="font-bold text-slate-900">Yes • Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mentorship Support:</span>
                  <span className="font-bold text-slate-900">1-on-1 Code Reviews</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= HORIZONTAL SUB-TABS NAVIGATION BAR ================= */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 mb-8 sm:mb-12 w-full overflow-hidden">
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto py-3 px-1 no-scrollbar text-xs sm:text-sm font-bold w-full">
            {[
              { id: "overview", label: "Overview" },
              { id: "curriculum", label: "Curriculum" },
              { id: "learn", label: "What You'll Learn" },
              { id: "instructors", label: "Instructors" },
              { id: "faqs", label: "FAQs" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id as TabType)}
                  className={`pb-2 transition-all whitespace-nowrap border-b-2 flex-shrink-0 ${
                    isActive
                      ? "border-brand-blue text-brand-blue font-black"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= MAIN CONTENT & SIDEBAR GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 w-full">
          
          {/* Main Details (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-14 w-full min-w-0">
            
            {/* Overview Section */}
            <div id="overview" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
                Course Overview
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal break-words">
                {course.overview}
              </p>
            </div>

            {/* Curriculum Modules Accordion */}
            <div id="curriculum" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4 sm:mb-6">
                Course Curriculum & Modules
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {course.curriculum.map((mod, idx) => {
                  const isOpen = openModule === idx;
                  return (
                    <div
                      key={mod.moduleNumber}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen ? "bg-white border-brand-blue shadow-md" : "bg-white border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleModule(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 focus:outline-none min-w-0"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-brand-blue font-black text-[11px] sm:text-xs flex-shrink-0">
                            {mod.moduleNumber}
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words">
                            {mod.title}
                          </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform ${isOpen ? "rotate-180 text-brand-blue" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-slate-100"
                          >
                            <div className="p-4 sm:p-5 bg-slate-50/60 space-y-2.5">
                              {mod.topics.map((topic, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                                  <span className="break-words leading-relaxed">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What You Will Learn */}
            <div id="learn" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4 sm:mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug break-words">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= MEET YOUR INSTRUCTORS SECTION ================= */}
            <div id="instructors" className="scroll-mt-24 pt-2">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1 sm:mb-2">
                  Meet Your Instructors
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal">
                  Learn from experienced professionals who will guide you throughout the program.
                </p>
              </div>

              {/* Centered Cards Grid Matching Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {instructors.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-between group"
                  >
                    <div className="flex flex-col items-center w-full min-w-0">
                      {/* Centered Circular Avatar Container */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-100/70 p-2 mb-3 sm:mb-4 flex items-center justify-center border border-purple-200 overflow-hidden shadow-xs flex-shrink-0">
                        <img
                          src={inst.avatar}
                          alt={inst.name}
                          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(inst.name)}`;
                          }}
                        />
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1 truncate w-full">{inst.name}</h3>
                      <p className="text-xs font-bold text-slate-500 mb-3 sm:mb-4 line-clamp-2 w-full">{inst.role}</p>

                      {/* Skill Pills */}
                      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                        {inst.skills.slice(0, 3).map((sk, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue text-[10px] sm:text-[11px] font-bold border border-blue-100"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Link CTA */}
                    <button
                      onClick={() => setProfileModalInstructor(inst)}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-blue hover:text-blue-700 transition-colors group-hover:translate-x-0.5"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Section */}
            <div id="faqs" className="scroll-mt-24 pt-2 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4 sm:mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="space-y-3">
                {sampleFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-white"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left font-black text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 focus:outline-none"
                      >
                        <span className="break-words">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal break-words">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 w-full">
            
            {/* Eligibility Card */}
            <div className="bp-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-blue" />
                <span>Eligibility</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                {course.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-blue font-bold">•</span>
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Opportunities Card */}
            <div className="bp-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-orange" />
                <span>Career Opportunities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.careerOptions.map((career, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Sticky Buttons */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900 text-white shadow-xl space-y-3">
              <h4 className="text-base font-black mb-1">Ready to Start Learning?</h4>
              <p className="text-xs text-slate-300 mb-4 font-normal leading-relaxed">
                Develop practical skills and build real industry portfolio projects.
              </p>
              <button
                onClick={() => handleOpenEnrollWithInstructor("")}
                className="w-full py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                Enroll Now
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 flex items-center justify-center gap-2 border border-white/20"
              >
                <MonitorPlay className="w-4 h-4 text-blue-300" />
                <span>Apply for Demo</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Instructor Profile Details Modal */}
      <InstructorProfileModal
        isOpen={!!profileModalInstructor}
        instructor={profileModalInstructor}
        onClose={() => setProfileModalInstructor(null)}
        onSelectAndEnroll={(instName) => handleOpenEnrollWithInstructor(instName)}
      />

      {/* 3-Step Enrollment Wizard Modal */}
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        selectedCourseTitle={course.title}
        selectedInstructorName={selectedInstructorForEnroll}
      />

      {/* Demo Request Modal */}
      <DemoRequestModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        selectedSolutionTitle={course.title}
      />
    </div>
  );
}
