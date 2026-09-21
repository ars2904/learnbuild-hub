"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, GraduationCap, Code2 } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "LEARN" | "BUILD" | "GENERAL";
}

const faqData: FAQItem[] = [
  {
    question: "What is the difference between LEARN and BUILD on LearnBuild Hub?",
    answer:
      "LEARN connects you to practical skill development training and internship tracks provided by our partner Corizo (redirecting externally to https://corizo.in). BUILD is our internal agency service where we design and develop custom websites, mobile applications, and software solutions for clients.",
    category: "GENERAL",
  },
  {
    question: "Where do the LEARN training programs take place?",
    answer:
      "All learning tracks, course materials, and internship enrollment are managed on the Corizo platform (https://corizo.in). Clicking 'Explore Learn Tracks' safely redirects you to Corizo's official portal.",
    category: "LEARN",
  },
  {
    question: "How can I request a custom software or website build?",
    answer:
      "You can visit our internal /build page or navigate to our Contact page to share your project requirements. Our engineering team will review your proposal and set up a kick-off consultation.",
    category: "BUILD",
  },
  {
    question: "Do you offer mobile application and AI development?",
    answer:
      "Yes! Our BUILD agency specializes in Full-Stack Web Applications (React/Next.js), Mobile Applications (iOS/Android), and AI Workflow Automation.",
    category: "BUILD",
  },
  {
    question: "Are the learning tracks suitable for beginners?",
    answer:
      "Absolutely. The tracks on Corizo are designed to guide learners from fundamental concepts up to building industry-grade portfolio projects with mentor guidance.",
    category: "LEARN",
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-white border border-slate-200 mb-3 inline-block shadow-sm">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto">
            Everything you need to know about our dual LEARN & BUILD platform.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "bg-white border-brand-blue shadow-lg ring-1 ring-brand-blue/20"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        faq.category === "LEARN"
                          ? "bg-blue-100 text-brand-blue border border-blue-200"
                          : faq.category === "BUILD"
                          ? "bg-orange-100 text-brand-orange border border-orange-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed font-normal border-t border-slate-100 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
