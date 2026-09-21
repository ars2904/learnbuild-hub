"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, MessageSquare, User, FileText, PhoneCall, HelpCircle, Code2 } from "lucide-react";
import { ContactFormData } from "@/types/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-3xl mb-12">
          <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-slate-100 border border-slate-200 mb-6 inline-block">
            LET'S CONNECT
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Get in Touch
          </h1>

          <p className="text-lg text-slate-600 font-normal">
            We'd love to hear from you. Whether you have a question, a project idea or just want to say hello, feel free to reach out.
          </p>
        </div>

        {/* ================= 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bp-card p-6 rounded-3xl bg-white border border-slate-200 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-brand-blue border border-blue-200 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Fill out the form and we'll get back to you.
                </p>
              </div>
            </div>

            <div className="bp-card p-6 rounded-3xl bg-white border border-slate-200 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-orange-50 text-brand-orange border border-orange-200 flex-shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  Discuss a Project
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Tell us about your idea and let's build it together.
                </p>
              </div>
            </div>

            <div className="bp-card p-6 rounded-3xl bg-white border border-slate-200 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex-shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  General Inquiries
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Have a question? We're here to help.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bp-card p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Message Submitted!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm font-medium">
                    Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your message has been received.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    >
                      <option value="">Select a subject...</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Web Applications">Web Applications</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Mobile Applications">Mobile Applications</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-blue/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
