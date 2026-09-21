"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
  id: string;
  category: "LEARN" | "BUILD" | "WEB" | "AI";
  type: string;
  typeColor: string;
  title: string;
  description: string;
  badge: string;
  rating: string;
  tags: string[];
  ctaText: string;
  ctaHref: string;
  isExternal: boolean;
}

const tracks: Track[] = [
  {
    id: "1",
    category: "LEARN",
    type: "LEARN PATH",
    typeColor: "bg-blue-100 text-blue-700 border-blue-200",
    title: "Full-Stack Web Development Track",
    description: "Learn modern web engineering from front-end UI design to server APIs.",
    badge: "8 Weeks • Hands-on",
    rating: "4.9 ★",
    tags: ["React", "Next.js", "Node.js"],
    ctaText: "Explore Track",
    ctaHref: "https://corizo.in",
    isExternal: true,
  },
  {
    id: "2",
    category: "BUILD",
    type: "BUILD SERVICE",
    typeColor: "bg-orange-100 text-orange-700 border-orange-200",
    title: "Custom Web Application Engineering",
    description: "Turn business requirements into high-performing production web apps.",
    badge: "Production Ready",
    rating: "4.9 ★",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    ctaText: "Start Project",
    ctaHref: "/contact",
    isExternal: false,
  },
  {
    id: "3",
    category: "LEARN",
    type: "LEARN PATH",
    typeColor: "bg-blue-100 text-blue-700 border-blue-200",
    title: "AI & Machine Learning Track",
    description: "Gain practical experience building intelligent AI models and data pipelines.",
    badge: "10 Weeks • Internship",
    rating: "4.9 ★",
    tags: ["Python", "AI LLMs", "Analytics"],
    ctaText: "Explore Track",
    ctaHref: "https://corizo.in",
    isExternal: true,
  },
  {
    id: "4",
    category: "BUILD",
    type: "BUILD SERVICE",
    typeColor: "bg-orange-100 text-orange-700 border-orange-200",
    title: "Mobile Application Engineering",
    description: "Cross-platform mobile application development for iOS and Android.",
    badge: "Native Performance",
    rating: "4.9 ★",
    tags: ["React Native", "iOS", "Android"],
    ctaText: "Start Project",
    ctaHref: "/contact",
    isExternal: false,
  },
];

const filterTabs = [
  { id: "ALL", label: "All Offerings" },
  { id: "LEARN", label: "Learn Tracks ↗" },
  { id: "BUILD", label: "Build Services →" },
];

export const TrackShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredTracks = tracks.filter((track) => {
    if (activeTab === "ALL") return true;
    return track.category === activeTab;
  });

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-slate-100 border border-slate-200 mb-3 inline-block">
            FEATURED OFFERINGS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Featured Skill Tracks & Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal">
            Discover our top practical learning paths and software engineering services.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-white bg-slate-900 shadow-md scale-105"
                    : "text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Course-Style Showcase Grid with Framer Motion Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTracks.map((track) => (
              <motion.div
                key={track.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bp-card bp-card-hover rounded-3xl p-6 bg-white border border-slate-200 flex flex-col justify-between shadow-sm transition-shadow hover:shadow-xl"
              >
                <div>
                  {/* Header Pills */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${track.typeColor}`}>
                      {track.type}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {track.rating}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug">
                    {track.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                    {track.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {track.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {track.badge}
                  </span>
                  {track.isExternal ? (
                    <a
                      href={track.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline group"
                    >
                      <span>{track.ctaText}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={track.ctaHref}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-orange hover:underline group"
                    >
                      <span>{track.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
