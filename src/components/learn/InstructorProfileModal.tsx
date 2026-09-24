"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Award, CheckCircle2, BookOpen, GraduationCap, Sparkles, UserCheck } from "lucide-react";
import { Instructor } from "@/data/instructors";

interface InstructorProfileModalProps {
  instructor: Instructor | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAndEnroll: (instructorName: string) => void;
}

export const InstructorProfileModal: React.FC<InstructorProfileModalProps> = ({
  instructor,
  isOpen,
  onClose,
  onSelectAndEnroll,
}) => {
  if (!isOpen || !instructor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 flex flex-col my-auto"
        >
          {/* Fixed Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 sm:p-6 pr-14 sm:pr-16 text-white relative flex-shrink-0 border-b border-slate-800">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white flex items-center justify-center transition-all shadow-md z-30 active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-300 mb-2">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>Mentor Profile Preview</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
              Meet Your Instructor
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Direct 1-on-1 industry mentorship and project guidance throughout your course.
            </p>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* Instructor Header Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 p-1 flex-shrink-0 border border-blue-200 shadow-sm">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h4 className="text-xl font-black text-slate-900">{instructor.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{instructor.rating} Mentor Rating</span>
                  </span>
                </div>
                <p className="text-xs font-bold text-brand-blue mb-2">{instructor.role}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-500">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Verified Senior Industry Mentor</span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                <span>About Mentor</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                {instructor.bio}
              </p>
            </div>

            {/* Skill Badges */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Core Tech Expertise
              </h5>
              <div className="flex flex-wrap gap-2">
                {instructor.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/60 text-brand-blue text-xs font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses Mentored */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Tracks Mentored</span>
              </h5>
              <div className="space-y-2">
                {instructor.coursesTaught.map((courseTitle, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{courseTitle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onSelectAndEnroll(instructor.name);
                }}
                className="w-full py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Select {instructor.name} & Enroll Now →</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
