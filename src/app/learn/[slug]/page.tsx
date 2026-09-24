"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Star, Clock, CheckCircle2, ChevronDown, 
  ArrowLeft, GraduationCap, Briefcase, ShieldCheck, Send, MonitorPlay,
  UserCheck, Sparkles, Award, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleCourses } from "@/data/courses";
import { EnrollmentModal } from "@/components/learn/EnrollmentModal";
import { DemoRequestModal } from "@/components/build/DemoRequestModal";
import { InstructorProfileModal } from "@/components/learn/InstructorProfileModal";
import { getInstructorsForCourse, Instructor } from "@/data/instructors";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const course = sampleCourses.find((c) => c.slug === slug);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedInstructorForEnroll, setSelectedInstructorForEnroll] = useState<string>("");
  const [profileModalInstructor, setProfileModalInstructor] = useState<Instructor | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <GraduationCap className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-3xl font-black text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-slate-600 mb-6">The course track you are looking for does not exist or has been updated.</p>
        <Link
          href="/learn"
          className="px-6 py-3 rounded-full bg-brand-blue text-white font-bold text-sm shadow-md"
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

  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-20 md:pt-10 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Skill Tracks</span>
          </Link>
        </div>

        {/* ================= HERO COURSE HEADER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 pb-12 border-b border-slate-200">
          
          {/* Left Text & Overview */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-brand-blue text-xs font-black uppercase tracking-wider border border-blue-200">
                {course.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{course.rating} ★ Track Score</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-slate-700 mb-6 leading-relaxed">
              {course.tagline}
            </p>

            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8 w-full text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-orange" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{course.mode}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleOpenEnrollWithInstructor("")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enroll Now in this Track</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 border border-slate-700"
              >
                <MonitorPlay className="w-4 h-4 text-blue-400" />
                <span>Apply for Demo</span>
              </button>
            </div>
          </div>

          {/* Right Banner Card Visual */}
          <div className="lg:col-span-5">
            <div className="bp-card rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl p-4">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-blue-300">LearnBuild Hub Admissions</div>
                  <div className="text-sm font-black">Industry Aligned Track</div>
                </div>
              </div>

              <div className="space-y-3 px-2 pb-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Certificate Included:</span>
                  <span className="font-bold text-slate-900">Yes • Verified</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Internship Support:</span>
                  <span className="font-bold text-slate-900">Hands-on Industry Project</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Format:</span>
                  <span className="font-bold text-slate-900">Live Mentorship & Self-Paced</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= COURSE OVERVIEW & WHAT YOU WILL LEARN ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Main Details (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Section */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                Course Overview
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {course.overview}
              </p>
            </div>

            {/* What You Will Learn */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                What You Will Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Modules Accordion */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                Course Curriculum & Modules
              </h2>

              <div className="space-y-4">
                {course.curriculum.map((mod, idx) => {
                  const isOpen = openModule === idx;
                  return (
                    <div
                      key={mod.moduleNumber}
                      className={`rounded-2xl border transition-all ${
                        isOpen ? "bg-white border-brand-blue shadow-md" : "bg-white border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleModule(idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-brand-blue font-black text-xs">
                            {mod.moduleNumber}
                          </span>
                          <span className="font-extrabold text-slate-900 text-base">
                            {mod.title}
                          </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-slate-100"
                          >
                            <div className="p-5 bg-slate-50/50 space-y-2">
                              {mod.topics.map((topic, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                  <span>{topic}</span>
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

            {/* ================= MEET YOUR INSTRUCTORS & MENTORS ================= */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-brand-blue mb-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Dedicated Mentorship</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Meet Your Instructors & Mentors
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium max-w-xs">
                  Choose your mentor when enrolling to get personalized 1-on-1 code reviews & guidance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instructors.map((inst) => (
                  <div
                    key={inst.id}
                    className="bp-card p-5 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Avatar + Top Row */}
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={inst.avatar}
                          alt={inst.name}
                          className="w-14 h-14 rounded-2xl object-cover bg-blue-50 border border-blue-200 shadow-xs flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="text-lg font-black text-slate-900 truncate">{inst.name}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold flex items-center gap-1 flex-shrink-0">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{inst.rating}</span>
                            </span>
                          </div>
                          <p className="text-xs font-bold text-brand-blue truncate mt-0.5">{inst.role}</p>
                        </div>
                      </div>

                      {/* Bio Snippet */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {inst.bio}
                      </p>

                      {/* Key Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {inst.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setProfileModalInstructor(inst)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>

                      <button
                        onClick={() => handleOpenEnrollWithInstructor(inst.name)}
                        className="w-full py-2.5 px-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                      >
                        <span>Select Mentor</span>
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Requirements & Career (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Eligibility Card */}
            <div className="bp-card p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-blue" />
                <span>Eligibility</span>
              </h3>
              <ul className="space-y-3 text-xs text-slate-600 font-medium">
                {course.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-blue font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Opportunities Card */}
            <div className="bp-card p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
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

            {/* Prerequisites */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-black uppercase text-slate-500 mb-2">Prerequisites</h4>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {course.prerequisites}
              </p>
            </div>

            {/* Sidebar Sticky Buttons */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-3">
              <h4 className="text-base font-black mb-1">Ready to Start Learning?</h4>
              <p className="text-xs text-slate-300 mb-4 font-normal">
                Develop practical skills and build real industry portfolio projects.
              </p>
              <button
                onClick={() => handleOpenEnrollWithInstructor("")}
                className="w-full py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                Enroll Now
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 border border-white/20"
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

      {/* Enrollment Modal */}
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
