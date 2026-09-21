"use client";

import React, { useState } from "react";
import { Calendar, Clock, ArrowRight, Tag, Search, Sparkles } from "lucide-react";

interface SampleBlog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
}

const sampleBlogs: SampleBlog[] = [
  {
    id: "1",
    title: "How to Build Career-Ready Skills in 2026",
    excerpt:
      "A complete guide on transitioning from theoretical learning to hands-on project building.",
    category: "Learning",
    date: "Sep 20, 2026",
    readTime: "5 min read",
    color: "bg-blue-600 text-white",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    excerpt:
      "Exploring modern frameworks, server components, and dynamic user experience design.",
    category: "Technology",
    date: "Sep 15, 2026",
    readTime: "4 min read",
    color: "bg-slate-900 text-white",
  },
  {
    id: "3",
    title: "Internships: Your First Step Towards Real Advancement",
    excerpt:
      "Why real project experience is the most important factor in starting a successful tech career.",
    category: "Career",
    date: "Sep 10, 2026",
    readTime: "6 min read",
    color: "bg-amber-600 text-white",
  },
  {
    id: "4",
    title: "Welcome to LearnBuild Hub",
    excerpt:
      "Announcing our unified platform connecting skill training opportunities with digital solution building.",
    category: "Announcements",
    date: "Sep 01, 2026",
    readTime: "3 min read",
    color: "bg-brand-blue text-white",
  },
];

const categories = ["All", "Learning", "Technology", "Career", "Industry"];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = sampleBlogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO SECTION ================= */}
        <div className="relative mb-12">
          <div className="max-w-3xl">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-slate-500 uppercase bg-slate-100 border border-slate-200 mb-6 inline-block">
              INSIGHTS & IDEAS
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Our Blogs
            </h1>

            <p className="text-lg text-slate-600 font-normal">
              Ideas, insights and resources for learners and builders.
            </p>
          </div>

          {/* Handwritten Slant Accent Top Right */}
          <div className="hidden md:block absolute top-0 right-8 transform rotate-6 font-handwriting text-brand-blue text-xl sm:text-2xl font-bold select-none pointer-events-none">
            Learn <br />
            Explore <br />
            Thrive <br />
            <span className="text-brand-orange">Build Better</span>
          </div>
        </div>

        {/* ================= FILTER & SEARCH BAR ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* ================= BLOG CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bp-card bp-card-hover rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Card Header */}
                <div className={`h-40 w-full ${blog.color} p-6 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-white/90 text-slate-900 backdrop-blur-md">
                      {blog.category}
                    </span>
                  </div>

                  <div className="text-white/90 text-xs flex items-center gap-3 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-base font-extrabold text-slate-900 mb-2 hover:text-brand-blue transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More */}
              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline cursor-pointer">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
