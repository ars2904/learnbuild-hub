"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Send, GraduationCap, Users, Loader2 } from "lucide-react";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourseTitle?: string;
  selectedInstructorName?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  selectedCourseTitle = "Full-Stack Web Engineering Track",
  selectedInstructorName = "",
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: selectedCourseTitle,
    qualification: "Undergraduate",
    instructor: selectedInstructorName || "Any Available Senior Mentor",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync props when modal opens or selected course changes
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        course: selectedCourseTitle || prev.course,
        instructor: selectedInstructorName || "Any Available Senior Mentor",
      }));
      setStep(1);
    }
  }, [isOpen, selectedCourseTitle, selectedInstructorName]);

  // Reset state when closing modal
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
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
        setStep(2);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit enrollment enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment submission error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your network connection and try again.");
    }
  };

  if (!isOpen) return null;

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
          className="relative w-full max-w-lg max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 flex flex-col my-auto"
        >
          {/* Header Banner */}
          <div className="p-5 sm:p-6 bg-white border-b border-slate-100 relative flex-shrink-0">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Enroll in {formData.course}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fill in your contact details to enroll in this track.
                </p>
              </div>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100 text-xs font-bold">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-brand-blue" : "text-slate-400"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  step === 1 ? "bg-brand-blue text-white" : "bg-blue-100 text-brand-blue"
                }`}>
                  1
                </span>
                <span>Your Contact Details</span>
              </div>

              <div className={`flex items-center gap-2 ${step === 2 ? "text-brand-blue" : "text-slate-400"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  step === 2 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  2
                </span>
                <span>Confirmation</span>
              </div>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
            {errorMessage && (
              <div className="p-3 mb-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: YOUR CONTACT DETAILS */}
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h4 className="text-base font-black text-slate-900">Student Information</h4>
                  <p className="text-xs text-slate-500">Provide your contact details below to apply for admission.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                        Phone / Whatsapp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                      Education / Qualification
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue transition-all cursor-pointer"
                    >
                      <option value="Undergraduate (B.Tech / BCA / B.Sc / B.Com)">Undergraduate Student</option>
                      <option value="Postgraduate (M.Tech / MCA / M.Sc)">Postgraduate Student</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other Qualification">Other Qualification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Any specific goals or questions regarding this program?"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70 cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enrollment Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: SUCCESS / CONFIRMATION */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h4 className="text-2xl font-black text-slate-900 mb-2">
                  Enrollment Enquiry Submitted!
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed mb-6 font-medium">
                  Thank you! Your enrollment application has been received. Our admissions team will contact you shortly to complete your onboarding.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 w-full mb-6 text-left space-y-1.5 shadow-xs">
                  <div><span className="font-bold text-slate-900">Course Track:</span> {formData.course}</div>
                  <div><span className="font-bold text-slate-900">Applicant Name:</span> {formData.fullName}</div>
                  <div><span className="font-bold text-slate-900">Email:</span> {formData.email}</div>
                  <div><span className="font-bold text-slate-900">Phone:</span> {formData.phone}</div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Done & Close
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
