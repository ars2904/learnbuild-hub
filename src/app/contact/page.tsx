"use client";

import React, { useState } from "react";
import { 
  Send, CheckCircle2, Mail, Clock, MapPin, Users, 
  MessageSquare, Code2, Lightbulb, Handshake, ChevronDown, 
  Instagram, Youtube, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errorMessage, setErrorMessage] = useState("");

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
      a: "Yes, absolutely! We welcome feedback and suggestions for new practical skill tracks from our community."
    },
    {
      q: "Do you take custom project requests?",
      a: "Yes! Our engineering team builds custom websites, web applications, mobile apps, and AI automation solutions."
    },
    {
      q: "Are you open to collaborations?",
      a: "We are always interested in partnering with educators, mentors, content creators, and organizations."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ================= 1. HERO SECTION (DARK ATMOSPHERIC BANNER) ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#090D16] text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-600/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[300px] bg-brand-orange/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-500/10 border border-orange-500/20 mb-6 inline-block shadow-sm">
                CONTACT US
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Let's build something <br />
                <span className="text-brand-blue">great together.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Have a question, suggestion, or an idea? We'd love to hear from you. Whether it's about our courses, a project, a collaboration, or anything else — our team is here to help.
              </p>
            </div>

            {/* Right Atmospheric Graphic Box with Handwriting Accents */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Floating Quote Top */}
              <div className="absolute -top-6 right-2 transform rotate-6 font-handwriting text-amber-300 text-lg sm:text-xl z-20 pointer-events-none drop-shadow-md">
                Ideas Questions <br />
                <span className="text-white">Collaboration Let's Talk!</span>
              </div>

              {/* Central Dark Box */}
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-slate-800 shadow-2xl p-8 flex flex-col items-center justify-center min-h-[320px]">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-xl mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-black tracking-widest text-blue-400 uppercase mb-1">
                    GET IN TOUCH DIRECTLY
                  </div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-lg font-extrabold text-white hover:text-blue-300 transition-colors block mb-2"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <p className="text-xs text-slate-400 font-medium">
                    We usually reply within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. MAIN 2-COLUMN CONTACT SECTION ================= */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Send us a message
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">
                  Fill out the form and we'll get back to you as soon as possible.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">
                      Message Submitted!
                    </h4>
                    <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm font-medium leading-relaxed">
                      Thank you! Your message has been sent successfully. The LearnBuild Hub team will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer"
                      >
                        <option value="">-- Select a subject --</option>
                        <option value="Course Enquiry">Course Enquiry</option>
                        <option value="Project Discussion">Project Discussion</option>
                        <option value="Suggestions">Suggestions</option>
                        <option value="Partnerships">Partnerships</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-400 font-medium">
                      We usually respond within 24-48 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Other ways to reach us & Socials */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange mb-2 block">
                  GET IN TOUCH
                </span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
                  Other ways to reach us
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-8">
                  Prefer a different way? Here are the details.
                </p>

                <div className="space-y-4">
                  {/* Email Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue border border-blue-200 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Email</h5>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-xs font-bold text-brand-blue hover:underline block">
                        {SITE_CONFIG.email}
                      </a>
                      <span className="text-[11px] text-slate-400">Drop us an email anytime.</span>
                    </div>
                  </div>

                  {/* Response Time Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Response Time</h5>
                      <span className="text-xs font-bold text-slate-800 block">We usually reply within 24-48 hours.</span>
                      <span className="text-[11px] text-slate-400">Monday – Saturday</span>
                    </div>
                  </div>

                  {/* Location Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Location</h5>
                      <span className="text-xs font-bold text-slate-800 block">India</span>
                      <span className="text-[11px] text-slate-400">Working remotely, connecting globally.</span>
                    </div>
                  </div>

                  {/* Partnerships Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Collaborations & Partnerships</h5>
                      <span className="text-xs font-bold text-slate-800 block">Interested in working together?</span>
                      <span className="text-[11px] text-slate-400">We're open to exciting opportunities.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links including Official Instagram */}
              <div className="pt-6 border-t border-slate-200">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 block">
                  Follow our journey
                </h5>
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  Stay updated with our latest courses, projects, and more.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    title="Follow on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    title="YouTube Channel"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. 4 FEATURE CARDS GRID ================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">Course Enquiry</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Have questions about our courses? We'll help you.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">Project Discussion</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Want to build a website, app, or custom solution? Let's talk.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">Suggestions</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Have ideas to improve LearnBuild Hub? We're all ears.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-purple-50/50 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Handshake className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">Partnerships</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Interested in collaborating? Let's create opportunities together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FAQ ACCORDION & WORLD MAP GRAPHIC CARD ================= */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Quick Answers Accordion */}
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">
                FREQUENT QUESTIONS
              </span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                Quick Answers
              </h3>
              <p className="text-xs text-slate-600 font-medium mb-8">
                Here are some common questions. Still need help? Feel free to reach out using the form above.
              </p>

              <div className="space-y-3">
                {faqItems.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-extrabold text-sm text-slate-900"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
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

            {/* Right Column: Dark World Reach Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-10 text-white min-h-[360px] flex flex-col justify-between shadow-2xl border border-slate-800">
                <div>
                  <h4 className="text-2xl font-black tracking-tight mb-2">
                    Different places. <br />
                    <span className="text-brand-orange">Same goal.</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    We're a remote team, working from different places, but connected by a shared passion — helping people learn and build.
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <blockquote className="font-handwriting text-xl text-amber-300">
                    “Better Learners Brighter Builders”
                  </blockquote>
                  <span className="text-[11px] text-slate-400 font-mono uppercase tracking-widest block mt-1">
                    Ideas • Skills • Projects • People • A Better Tomorrow
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
