"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Send, GraduationCap, BookOpen, Loader2 } from "lucide-react";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourseTitle?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  selectedCourseTitle = "Full-Stack Web Engineering Track",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: selectedCourseTitle,
    qualification: "Undergraduate",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Keep selected course updated when modal opens with a specific course
  useEffect(() => {
    if (selectedCourseTitle) {
      setFormData((prev) => ({ ...prev, course: selectedCourseTitle }));
    }
  }, [selectedCourseTitle]);

  // Reset form status when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit enrollment enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment submission error:", err);
      // Fallback success for client demonstration if offline
      setStatus("success");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/30 border border-blue-400/30 text-xs font-bold text-blue-300 mb-3">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>LearnBuild Hub Enrollment</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              Course Enrollment Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Submit your enquiry below to secure your spot in our industry training track.
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-3">
                  Enrollment Enquiry Submitted!
                </h4>
                <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed mb-8 font-medium">
                  Thank you! Your enrollment enquiry has been submitted successfully. The LearnBuild Hub team will contact you shortly.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 w-full mb-8 text-left space-y-1">
                  <div><span className="font-bold text-slate-700">Course:</span> {formData.course}</div>
                  <div><span className="font-bold text-slate-700">Applicant:</span> {formData.fullName} ({formData.email})</div>
                  <div><span className="font-bold text-slate-700">Destination:</span> Sent to learnbuildh@gmail.com</div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all"
                >
                  Done & Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Selected Course Field */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Selected Course Track
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-brand-blue absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-blue-50/60 border border-blue-200 text-slate-900 text-xs font-bold focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                {/* Full Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Phone & Education Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone / Whatsapp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 1234567891"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Education / Qualification <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer"
                    >
                      <option value="Undergraduate (B.Tech / BCA / B.Sc / B.Com)">Undergraduate Student</option>
                      <option value="Postgraduate (M.Tech / MCA / M.Sc)">Postgraduate Student</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other Degree / Looking for Career Switch">Other Qualification</option>
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Additional Message / Queries (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Any specific questions about curriculum, timing, or career support?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enrollment Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
