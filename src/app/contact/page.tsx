"use client";

import React, { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Clock, 
  MapPin, 
  Phone,
  MessageSquare, 
  Instagram, 
  Youtube, 
  ChevronDown,
  Loader2,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form submit error:", err);
      setErrorMessage("Something went wrong. Please try again or email learnbuildh@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      q: "How long does it take to get a response?",
      a: "We usually respond to all inquiries within 24-48 hours during business days (Monday to Saturday)."
    },
    {
      q: "Can I suggest a new course?",
      a: "Yes! We are always expanding our learning catalog based on student demand. Feel free to request any course topic!"
    },
    {
      q: "Do you take custom project requests?",
      a: "Absolutely! Our technology solutions team builds full-stack web apps, mobile apps, enterprise suites, and custom software."
    },
    {
      q: "Are you open to collaborations?",
      a: "Yes, we partner with colleges, tech communities, startups, and enterprises for workshops, internships, and joint projects."
    },
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello LearnBuild Hub Team, I am reaching out regarding ${formData.subject || "an inquiry"}. My name is ${formData.name || ""}.`
  );
  const whatsappUrl = `https://wa.me/918149565351?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#090D16] text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-600/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[300px] bg-orange-500/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-500/10 border border-orange-500/20 mb-6 inline-block shadow-sm">
                GET IN TOUCH
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Let's build something <br />
                <span className="text-brand-blue">great together.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl mb-8">
                Have a question about our learning tracks, need a custom software solution, or want to apply for an internship? Connect directly via phone, WhatsApp, or send us an email dispatch.
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-blue/30 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {SITE_CONFIG.phone}</span>
                </a>

                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Card (Matching Image 1 mockup) */}
            <div className="lg:col-span-5 relative flex justify-center py-6 sm:py-0">
              <div className="relative w-full max-w-md overflow-visible">
                
                {/* Floating Angled Top-Right Badge Text */}
                <div className="absolute -top-6 -right-2 sm:-right-6 z-20 pointer-events-none text-right font-sans transform rotate-[6deg] leading-tight select-none">
                  <div className="text-yellow-400 font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    Ideas Questions
                  </div>
                  <div className="text-white font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    Collaboration Let's Talk!
                  </div>
                </div>

                {/* Dark Blue Card */}
                <div className="w-full rounded-[32px] bg-[#0B132B] border border-blue-900/40 p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-center text-center min-h-[320px]">
                  <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-brand-blue shadow-xl mb-6">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-black tracking-widest text-brand-blue uppercase mb-2">
                      GET IN TOUCH DIRECTLY
                    </div>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-2xl sm:text-3xl font-black text-white hover:text-blue-400 transition-colors block mb-2 tracking-tight"
                    >
                      {SITE_CONFIG.email}
                    </a>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">
                      We usually reply within 24-48 hours.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. MAIN 2-COLUMN FORM & CONTACT DETAILS ================= */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Send us an Email Message
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">
                  Form submissions dispatch directly to our primary inbox ({SITE_CONFIG.email}).
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">
                      Message Dispatched!
                    </h4>
                    <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm font-medium leading-relaxed">
                      Thank you! Your message has been sent successfully to {SITE_CONFIG.email}. The LearnBuild Hub team will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                      }}
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 transition-colors group-has-[:focus]:text-brand-blue">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Amit Sharma"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 transition-colors group-has-[:focus]:text-brand-blue">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="amit@example.com"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 transition-colors group-has-[:focus]:text-brand-blue">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 1234567891"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 transition-colors group-has-[:focus]:text-brand-blue">
                          Inquiry Subject <span className="text-rose-500">*</span>
                        </label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 cursor-pointer"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Course Enrollment">Course Enrollment</option>
                          <option value="Custom Software Project">Custom Software Project</option>
                          <option value="Ready-Made Solution Demo">Ready-Made Solution Demo</option>
                          <option value="Internship Application">Internship Application</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 transition-colors group-has-[:focus]:text-brand-blue">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can assist you..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20 focus:scale-[1.015] focus:shadow-xl focus:shadow-brand-blue/15 transition-all duration-200 placeholder:text-slate-400 placeholder:font-normal resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Email...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Email Message</span>
                          </>
                        )}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Verified Contact Channels & Social Links */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange mb-2 block">
                  VERIFIED CONTACT CHANNELS
                </span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
                  Direct Contact Info
                </h3>

                <div className="space-y-4">
                  {/* Phone / Call Box */}
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-brand-blue transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue border border-blue-200 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Phone / Direct Call</h5>
                      <span className="text-sm font-extrabold text-brand-blue group-hover:underline block">
                        {SITE_CONFIG.phone}
                      </span>
                      <span className="text-[11px] text-slate-400">Click to place direct call</span>
                    </div>
                  </a>

                  {/* WhatsApp Box */}
                  <a
                    href={SITE_CONFIG.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-emerald-500 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">WhatsApp Chat</h5>
                      <span className="text-sm font-extrabold text-emerald-600 group-hover:underline block">
                        {SITE_CONFIG.whatsapp}
                      </span>
                      <span className="text-[11px] text-slate-400">Click to open instant WhatsApp chat</span>
                    </div>
                  </a>

                  {/* Email Box */}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-orange-500 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Email Address</h5>
                      <span className="text-sm font-extrabold text-slate-900 group-hover:text-orange-600 block">
                        {SITE_CONFIG.email}
                      </span>
                      <span className="text-[11px] text-slate-400">Click to compose email</span>
                    </div>
                  </a>

                  {/* Location & Remote Office Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Location</h5>
                      <span className="text-xs font-bold text-slate-800 block">{SITE_CONFIG.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram & Social Media */}
              <div className="pt-6 border-t border-slate-200">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 block">
                  Official Instagram & Channels
                </h5>
                <div className="flex items-center gap-3">
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Follow on Instagram</span>
                  </a>
                  <a
                    href={SITE_CONFIG.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl bg-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. FAQ ACCORDION SECTION (Matching Image 2 mockup) ================= */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: FAQ Accordion */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                FREQUENT QUESTIONS
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Quick Answers
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-8">
                Here are some common questions. Still need help? Feel free to reach out using the form above.
              </p>

              <div className="w-full space-y-3">
                {faqItems.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-black text-sm text-slate-900"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dark Remote Team Quote Card */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="w-full rounded-[32px] bg-[#0B132B] border border-blue-900/40 p-8 sm:p-12 text-white shadow-2xl flex flex-col justify-between min-h-[380px]">
                
                <div>
                  <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-1">
                    Different places.
                  </h4>
                  <h4 className="text-3xl sm:text-4xl font-black text-brand-orange tracking-tight leading-tight mb-6">
                    Same goal.
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-md mb-12">
                    We're a remote team, working from different places, but connected by a shared passion — helping people learn and build.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <div className="text-yellow-400 font-extrabold text-xl sm:text-2xl tracking-tight mb-2">
                    “Better Learners Brighter Builders”
                  </div>
                  <div className="text-[10px] sm:text-xs font-black tracking-widest text-slate-400 uppercase">
                    IDEAS • SKILLS • PROJECTS • PEOPLE • A BETTER TOMORROW
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
