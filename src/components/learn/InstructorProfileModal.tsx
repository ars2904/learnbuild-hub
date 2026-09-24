"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, BookOpen } from "lucide-react";
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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-md max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 flex flex-col my-auto"
        >
          {/* Top Header Navigation */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
            
            {/* Centered Avatar Hero */}
            <div className="flex flex-col items-center text-center pt-2">
              <div className="relative w-32 h-32 rounded-full bg-purple-100/70 p-2 mb-4 flex items-center justify-center border border-purple-200 shadow-sm overflow-hidden">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(instructor.name)}`;
                  }}
                />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">{instructor.name}</h3>
              <p className="text-xs font-bold text-slate-500 mb-4">{instructor.role}</p>

              {/* Skill Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
                {instructor.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="pt-2">
              <h4 className="text-sm font-black text-slate-900 mb-2">About</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {instructor.bio}
              </p>
            </div>

            {/* Courses Taught Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-black text-slate-900">Courses Taught</h4>
              </div>

              <ul className="space-y-2 pl-2">
                {instructor.coursesTaught.map((courseTitle, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <span>{courseTitle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  onClose();
                  onSelectAndEnroll(instructor.name);
                }}
                className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Select This Instructor →</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
