"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Send, Briefcase, MessageSquare, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrack?: string;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  isOpen,
  onClose,
  selectedTrack = "Web Engineering Track",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    track: selectedTrack,
    experience: "Student (B.Tech / BCA / MCA / B.Sc)",
    duration: "2 Months",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedTrack) {
      setFormData((prev) => ({ ...prev, track: selectedTrack }));
    }
  }, [selectedTrack]);

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

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage("Please enter a valid contact phone or WhatsApp number.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/internship", {
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
        setErrorMessage(data.message || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error("Internship application submission error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your network connection and try again.");
    }
  };

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello LearnBuild Hub Team, I want to apply for the Internship Program in ${formData.track || "Technology"}. My name is ${formData.name || ""}.`
  );
  const whatsappUrl = `https://wa.me/918149565351?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
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
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 p-5 sm:p-6 pr-14 sm:pr-16 text-white relative flex-shrink-0 border-b border-orange-700/50">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white flex items-center justify-center transition-all shadow-md z-30 active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Briefcase className="w-4 h-4 text-white" />
              <span>LearnBuild Hub Career Track</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
              Apply for Internship
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 font-normal">
              1-3 Months Merit-Based Live Engineering & Product Projects
            </p>
          </div>

          {/* Scrollable Form Body */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-3">
                  Application Submitted!
                </h4>
                <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed mb-6 font-medium">
                  Your internship application has been received and emailed to support ({SITE_CONFIG.email}). Our review team will verify your details.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 w-full mb-6 text-left space-y-1.5">
                  <div><span className="font-bold text-slate-800">Track:</span> {formData.track}</div>
                  <div><span className="font-bold text-slate-800">Applicant:</span> {formData.name} ({formData.email})</div>
                  <div><span className="font-bold text-slate-800">Phone:</span> {formData.phone}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Apply via WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Track selection */}
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                    Target Internship Track <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 cursor-pointer"
                  >
                    <option value="Web Engineering Track">Web Engineering Track (React / Next.js / Node.js)</option>
                    <option value="Digital Marketing Track">Digital Marketing & Growth Track</option>
                    <option value="Python Full-Stack & AI Track">Python Full-Stack & AI Track</option>
                    <option value="Java Spring Boot Track">Java & Spring Boot Enterprise Track</option>
                    <option value=".NET & C# Track">.NET & C# Enterprise Track</option>
                    <option value="PHP & Laravel Track">PHP & Laravel Track</option>
                    <option value="Mobile App Development Track">Mobile Application Track (React Native / Flutter)</option>
                    <option value="SQL & Databases Track">SQL & Relational Databases Track</option>
                  </select>
                </div>

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Amit Verma"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="amit@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* Phone & Duration Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="1234567891"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                      Preferred Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 cursor-pointer"
                    >
                      <option value="1 Month">1 Month (Focused Capstone)</option>
                      <option value="2 Months">2 Months (Recommended Standard)</option>
                      <option value="3 Months">3 Months (Advanced Product Project)</option>
                    </select>
                  </div>
                </div>

                {/* Status / Experience */}
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                    Current Qualification / Status
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 cursor-pointer"
                  >
                    <option value="Student (B.Tech / BCA / MCA / B.Sc)">Student (B.Tech / BCA / MCA / B.Sc)</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Working Professional Switching Career">Working Professional</option>
                    <option value="Self-Taught Developer">Self-Taught / Enthusiast</option>
                  </select>
                </div>

                {/* Message / Portfolio */}
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-orange">
                    GitHub / LinkedIn / Portfolio Link or Notes (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Share any GitHub repo, portfolio URL, or topics you want to work on."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-orange/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Apply via WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
