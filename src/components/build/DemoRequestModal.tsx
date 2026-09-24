"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Send, MonitorPlay, MessageSquare, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSolutionTitle?: string;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  selectedSolutionTitle = "School Management System",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    solutionTitle: selectedSolutionTitle,
    companyName: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedSolutionTitle) {
      setFormData((prev) => ({ ...prev, solutionTitle: selectedSolutionTitle }));
    }
  }, [selectedSolutionTitle]);

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
      const response = await fetch("/api/demo", {
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
        setErrorMessage(data.message || "Failed to submit demo request. Please try again.");
      }
    } catch (err) {
      console.error("Demo request submission error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your network connection and try again.");
    }
  };

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello LearnBuild Hub Team, I would like to request a live demo for "${formData.solutionTitle}". My name is ${formData.name || ""}.`
  );
  const whatsappUrl = `https://wa.me/918149565351?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-6 sm:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-blue-200 mb-3">
              <MonitorPlay className="w-4 h-4 text-blue-400" />
              <span>LearnBuild Hub Live Demo</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              Apply for Live Demo
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 font-normal">
              Schedule a personalized live demonstration & walkthrough with our technical team.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
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
                  Demo Request Received!
                </h4>
                <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed mb-6 font-medium">
                  Thank you! Your demo request for <strong className="text-slate-900">{formData.solutionTitle}</strong> has been emailed to our team ({SITE_CONFIG.email}).
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 w-full mb-6 text-left space-y-1.5">
                  <div><span className="font-bold text-slate-800">Target Track / Solution:</span> {formData.solutionTitle}</div>
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
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    Done & Close
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

                {/* Selected Course Track / Solution */}
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-blue">
                    Target Course Track / Software Solution
                  </label>
                  <select
                    name="solutionTitle"
                    value={formData.solutionTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 cursor-pointer"
                  >
                    {/* Pre-fill custom course/solution title if passed */}
                    {formData.solutionTitle &&
                      ![
                        "School Management System",
                        "Office Management System",
                        "Gym & Fitness Management",
                        "Library Management System",
                        "Healthcare CRM & Clinic Management",
                        "Digital Marketing & Growth Track",
                        "Full-Stack Web Engineering Track",
                        "AI & Machine Learning Engineering Track",
                        "Mobile App Development Track",
                        "Cloud & DevOps Engineering Track"
                      ].includes(formData.solutionTitle) && (
                        <option value={formData.solutionTitle}>{formData.solutionTitle}</option>
                      )}
                    <option value="Digital Marketing & Growth Track">Digital Marketing & Growth Track</option>
                    <option value="Full-Stack Web Engineering Track">Full-Stack Web Engineering Track</option>
                    <option value="AI & Machine Learning Engineering Track">AI & Machine Learning Engineering Track</option>
                    <option value="Mobile App Development Track">Mobile App Development Track</option>
                    <option value="Cloud & DevOps Engineering Track">Cloud & DevOps Engineering Track</option>
                    <option value="School Management System">School Management System</option>
                    <option value="Office Management System">Office Management System</option>
                    <option value="Gym & Fitness Management">Gym & Fitness Management</option>
                    <option value="Library Management System">Library Management System</option>
                    <option value="Healthcare CRM & Clinic Management">Healthcare CRM & Clinic Management</option>
                  </select>
                </div>

                {/* Full Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-blue">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Vikram Singh"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-blue">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="vikram@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* Phone & Organization Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-blue">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="1234567891"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-blue">
                      School / Company / Clinic Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Apex Academy"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* Message / Special Needs */}
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 transition-colors group-has-[:focus]:text-brand-blue">
                    Customization Needs / Comments (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Tell us about your organization size or custom feature requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 py-3.5 rounded-full bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Demo...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Demo Request</span>
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
                    <span>Chat on WhatsApp</span>
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
