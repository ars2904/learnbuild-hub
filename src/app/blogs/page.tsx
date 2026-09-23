"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CardVisualBanner } from "@/components/common/CardVisualBanner";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search, Sparkles, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: "Technology" | "Programming" | "Projects" | "Career" | "AI" | "Learning" | "Digital Marketing";
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const ALL_BLOGS: BlogArticle[] = [
  {
    id: "featured-1",
    title: "The Shift to Full-Stack Next.js 14 App Router & Server Components in Production",
    excerpt: "Discover why tech startups and enterprises are moving to Next.js 14 App Router, Server Actions, and streaming SSR to build ultra-fast, SEO-optimized web products.",
    category: "Technology",
    author: "LearnBuild Hub Tech Team",
    date: "Sep 22, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Building Career-Ready Engineering Skills Beyond Tutorial Hell",
    excerpt: "Why watching video tutorials alone won't make you a developer. Learn how real-world project execution and code reviews transform your career trajectory.",
    category: "Learning",
    author: "Mentorship Team",
    date: "Sep 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Embedding Large Language Models & AI Microservices into React Applications",
    excerpt: "A practical guide to connecting Python FastAPI backend LLM endpoints with frontend React hooks and real-time streaming state.",
    category: "AI",
    author: "AI Engineering Lab",
    date: "Sep 18, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Digital Marketing & Performance Ad Strategies for Modern Startups",
    excerpt: "How combining organic Search Engine Optimization (SEO) with targeted Meta & Google PPC ads generates predictable customer growth.",
    category: "Digital Marketing",
    author: "Growth Team",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "How Merit-Based Internships Build Real Production Portfolio Value",
    excerpt: "Why contributing to active SaaS applications and working with senior code reviewers prepares you for high-paying engineering roles.",
    category: "Career",
    author: "Career Development Cell",
    date: "Sep 12, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Architecting Relational PostgreSQL Schemas for Scalable Web Applications",
    excerpt: "Best practices for index optimization, foreign key constraints, migration strategies, and ORM query performance tuning.",
    category: "Programming",
    author: "Backend Architecture Team",
    date: "Sep 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Case Study: Deploying a Multi-Tenant School Management Platform",
    excerpt: "Walkthrough of how LearnBuild Hub built and launched an enterprise education suite serving thousands of active students.",
    category: "Projects",
    author: "Solutions Engineering",
    date: "Sep 05, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
  },
];

const categories = ["All", "Technology", "Programming", "Projects", "Career", "AI", "Learning", "Digital Marketing"];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle = ALL_BLOGS.find((b) => b.featured) || ALL_BLOGS[0];

  const filteredBlogs = ALL_BLOGS.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-blue uppercase bg-blue-50 border border-blue-200 mb-4 inline-block shadow-sm"
          >
            LEARNBUILD INSIGHTS & ENGINEERING BLOG
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4"
          >
            Technology, AI & <span className="text-brand-blue">Growth Articles</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            In-depth guides, case studies, programming tutorials, and digital marketing strategies from the LearnBuild Hub team.
          </motion.p>
        </div>

        {/* ================= FEATURED ARTICLE CARD ================= */}
        <div className="mb-16">
          <div className="rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px]">
              <CardVisualBanner
                imageUrl={featuredArticle.image}
                title={featuredArticle.title}
                category={featuredArticle.category}
                type="blog"
                className="w-full h-full min-h-[300px] lg:min-h-[400px]"
              />
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3.5 py-1 rounded-full bg-brand-orange text-white text-xs font-black uppercase tracking-wider shadow">
                  Featured Article
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-blue-300 mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  By {featuredArticle.author}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CATEGORIES & SEARCH ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
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

        {/* ================= ARTICLES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <CardVisualBanner
                    imageUrl={blog.image}
                    title={blog.title}
                    category={blog.category}
                    type="blog"
                    className="h-48 w-full"
                  />
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium mb-4">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {blog.author}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:translate-x-1 transition-transform cursor-pointer">
                  <span>Read Article</span>
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
