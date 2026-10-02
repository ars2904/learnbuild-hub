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

const categories = ["All", "Technology", "Programming", "Projects", "Career", "AI", "Learning", "Digital Marketing"];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogList, setBlogList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const mapped = data.data.map((b: any) => ({
            id: b.id,
            title: b.title,
            excerpt: b.excerpt || b.content?.slice(0, 150) || "",
            category: b.category || "Technology",
            author: b.authorName || b.author || "LearnBuild Team",
            date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Sep 2026",
            readTime: b.readTime || "5 min read",
            image: b.coverImage || b.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
            externalUrl: b.externalUrl || null,
            featured: b.featured || false,
          }));
          setBlogList(mapped);
        }
      })
      .catch((e) => console.warn("Failed fetching dynamic blogs:", e))
      .finally(() => setLoading(false));
  }, []);

  const featuredArticle = blogList.find((b) => b.featured) || blogList[0];

  const filteredBlogs = blogList.filter((blog) => {
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

        {/* ================= FEATURED ARTICLE CARD (If available) ================= */}
        {featuredArticle && (
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
        )}

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

        {/* ================= EMPTY STATE / ARTICLES GRID ================= */}
        {blogList.length === 0 && !loading ? (
          <div className="py-16 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl max-w-2xl mx-auto my-8 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No Published Blog Articles Yet</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Articles published by administrators in the Admin Dashboard will appear live here in real-time.
            </p>
          </div>
        ) : (
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
        )}

      </div>
    </div>
  );
}
