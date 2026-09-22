"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen, Search, ArrowRight, GraduationCap, CheckCircle2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { sampleCourses, Course } from "@/data/courses";
import { EnrollmentModal } from "@/components/learn/EnrollmentModal";

const categories = ["All", "Web Engineering", "AI & Data", "Mobile Dev", "Cloud & DevOps"];

export default function LearnCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<string>("");

  const filteredCourses = sampleCourses.filter((course) => {
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

  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-blue uppercase bg-blue-50 border border-blue-200 mb-4 inline-block shadow-sm"
          >
            PRACTICAL SKILL TRACKS
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4"
          >
            Learn Industry <span className="text-brand-blue">Skills.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Hands-on training, industry projects, expert mentorship, and career internship opportunities under LearnBuild Hub.
          </motion.p>
        </div>

        {/* ================= SEARCH & FILTER TABS ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
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

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search skill tracks or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* ================= COURSE CARDS GRID ================= */}
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
                className="bp-card bp-card-hover rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all"
              >
                <div>
                  {/* Course Visual Banner */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Top Pill Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-brand-blue backdrop-blur-md shadow">
                        {course.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold text-amber-700 bg-amber-50/95 border border-amber-200 flex items-center gap-1 shadow">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{course.rating} ★</span>
                      </span>
                    </div>

                    {/* Bottom Banner Title Overlay */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
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
                  <Link
                    href={`/learn/${course.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-blue hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

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

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        selectedCourseTitle={selectedCourseForEnrollment}
      />
    </div>
  );
}
