"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, BookOpen, MonitorPlay, Users, FileText, Settings, Video,
  Plus, Edit3, Trash2, X, CheckCircle2, Loader2, Save, Image, Sparkles, ExternalLink, Star, Check,
  Columns, Eye, Clock, User, Layout, Bold, Italic, Heading1, Heading2, Heading3, Table, List, ListOrdered, Quote, Code, Link as LinkIcon
} from "lucide-react";
import { CMSCourse, CMSSolution, CMSInstructor, CMSBlog, CMSWorkshop, CMSSiteSettings } from "@/lib/data/cmsStore";
import { getUserSession } from "@/lib/supabase/auth";
import { 
  normalizeBlogFromDb, normalizeWorkshopFromDb, normalizeCourseFromDb, 
  normalizeSolutionFromDb, normalizeInstructorFromDb 
} from "@/lib/cms-normalizer";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "solutions" | "instructors" | "blogs" | "workshops" | "settings">("solutions");
  const [loading, setLoading] = useState(true);

  // Data States
  const [courses, setCourses] = useState<CMSCourse[]>([]);
  const [solutions, setSolutions] = useState<CMSSolution[]>([]);
  const [instructors, setInstructors] = useState<CMSInstructor[]>([]);
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [workshops, setWorkshops] = useState<CMSWorkshop[]>([]);
  const [settings, setSettings] = useState<CMSSiteSettings>({
    heroTitle: "",
    heroSubtitle: "",
    announcementBanner: "",
    contactEmail: "",
    contactPhone: "",
    whatsappPhone: "",
    studentsTrainedCount: "",
    placementRate: "",
    projectsDeliveredCount: "",
    satisfactionRate: "",
  });

  // Modal States
  const [modalType, setModalType] = useState<"course" | "solution" | "instructor" | "blog" | "workshop" | null>(null);
  const [blogViewMode, setBlogViewMode] = useState<"split" | "form" | "preview">("split");
  const [workshopViewMode, setWorkshopViewMode] = useState<"split" | "form" | "preview">("split");
  const [editItem, setEditItem] = useState<any>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchAllContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms");
      const json = await res.json();
      if (json.success && json.data) {
        setCourses(json.data.courses || []);
        setSolutions(json.data.solutions || []);
        setInstructors(json.data.instructors || []);
        setBlogs(json.data.blogs || []);
        setWorkshops(json.data.workshops || []);
        if (json.data.settings) setSettings(json.data.settings);
      }
    } catch (err) {
      console.error("Error loading CMS content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const session = await getUserSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers,
        body: JSON.stringify({ type: "settings", settings }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving site settings:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    try {
      const session = await getUserSession();
      const headers: Record<string, string> = {};
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }
      await fetch(`/api/cms?type=${type}&id=${id}`, { method: "DELETE", headers });
      fetchAllContent();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleOpenAdd = (type: "course" | "solution" | "instructor" | "blog" | "workshop") => {
    setModalType(type);
    if (type === "solution") {
      setEditItem({
        id: "",
        title: "",
        category: "Education Tech",
        tag: "Ready to Deploy",
        description: "",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
        demoUrl: "/admin/demos",
        priceEstimate: "₹1,49,000",
        features: ["Student & Staff Directory", "Fee Collection Gateway", "Parent WhatsApp Alerts"],
        techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        featured: true,
      });
    } else if (type === "instructor") {
      setEditItem({
        id: "",
        name: "",
        role: "Senior Software Architect & Mentor",
        bio: "Experienced developer with 8+ years building production applications.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        expertise: ["Full-Stack", "React", "Next.js", "Node.js"],
        experienceYears: 8,
        rating: 4.9,
        studentsCount: 1500,
      });
    } else if (type === "workshop") {
      setEditItem({
        id: "",
        slug: "",
        title: "",
        tagline: "Live Hands-on Engineering Masterclass",
        description: "",
        category: "Engineering",
        eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
        duration: "2 Hours • Live Interactive",
        mode: "Live Online Masterclass",
        price: 0,
        speakerName: "Saurabh Upadhyay",
        speakerRole: "Senior AI & Cloud Solutions Architect",
        speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        agenda: [
          "Architecture & Core Concepts Overview",
          "Live Hands-on Coding & System Setup",
          "Production Deployment & Monitoring Best Practices",
          "Live Q&A & Mentorship Session",
        ],
        whatYouWillLearn: [
          "Building production microservices",
          "Real-time deployment & API integration",
        ],
        status: "upcoming",
      });
    } else if (type === "blog") {
      setEditItem({
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        category: "Engineering",
        authorName: "LearnBuild Hub Tech Team",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        externalUrl: "",
        readTime: "5 min read",
        publishedAt: new Date().toISOString(),
        featured: true,
      });
    } else {
      setEditItem({
        id: "",
        title: "",
        category: "Web Engineering",
        description: "",
        price: 34999,
        originalPrice: 49999,
        duration: "16 Weeks",
        badge: "Most Popular",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      });
    }
  };

  const handleOpenEdit = (type: "course" | "solution" | "instructor" | "blog" | "workshop", item: any) => {
    setModalType(type);
    if (type === "blog") {
      setEditItem(normalizeBlogFromDb(item));
    } else if (type === "workshop") {
      setEditItem(normalizeWorkshopFromDb(item));
    } else if (type === "course") {
      setEditItem(normalizeCourseFromDb(item));
    } else if (type === "solution") {
      setEditItem(normalizeSolutionFromDb(item));
    } else if (type === "instructor") {
      setEditItem(normalizeInstructorFromDb(item));
    } else {
      setEditItem({ ...item });
    }
  };

  const insertBlogSnippet = (prefix: string, suffix: string = "") => {
    setEditItem((prev: any) => {
      if (!prev) return prev;
      const currentContent = prev.content || "";
      return {
        ...prev,
        content: currentContent ? `${currentContent}\n${prefix}${suffix}` : `${prefix}${suffix}`,
      };
    });
  };

  const parseInlineMarkdown = (text: string) => {
    if (!text) return "";
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i} className="italic text-slate-800">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold underline hover:text-blue-700">
              {match[1]}
            </a>
          );
        }
      }
      return part;
    });
  };

  const renderMarkdownPreview = (text: string) => {
    if (!text || text.trim() === "") {
      return (
        <p className="text-slate-400 italic text-xs py-4 text-center font-medium">
          Start writing article content in the left form editor to see live rendering preview...
        </p>
      );
    }

    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let inTable = false;
    let tableLines: string[] = [];

    const processTable = (tLines: string[], keyPrefix: string) => {
      const rows = tLines.filter(l => !l.match(/^\|?\s*[-:]+[-|\s:]*$/));
      if (rows.length === 0) return null;

      const parseRow = (rowStr: string) => {
        return rowStr
          .trim()
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map(cell => cell.trim());
      };

      const headerCells = parseRow(rows[0]);
      const bodyRows = rows.slice(1).map(r => parseRow(r));

      return (
        <div key={keyPrefix} className="my-4 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black">
                {headerCells.map((h, i) => (
                  <th key={i} className="px-3.5 py-2.5 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                    {parseInlineMarkdown(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bodyRows.map((r, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/80 hover:bg-blue-50/30"}>
                  {r.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2.5 text-slate-700 font-medium">
                      {parseInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    lines.forEach((line, idx) => {
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${idx}`} className="my-4 p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
              <pre>{codeBlockLines.join("\n")}</pre>
            </div>
          );
          codeBlockLines = [];
          inCodeBlock = false;
        } else {
          if (inTable && tableLines.length > 0) {
            elements.push(processTable(tableLines, `table-${idx}`));
            tableLines = [];
            inTable = false;
          }
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        return;
      }

      const isTableLine = line.trim().startsWith("|") && line.trim().endsWith("|");
      if (isTableLine) {
        inTable = true;
        tableLines.push(line);
        return;
      } else if (inTable) {
        elements.push(processTable(tableLines, `table-${idx}`));
        tableLines = [];
        inTable = false;
      }

      if (line.startsWith("# ")) {
        elements.push(<h1 key={idx} className="text-xl font-extrabold text-slate-900 mt-5 mb-2 tracking-tight">{parseInlineMarkdown(line.replace("# ", ""))}</h1>);
      } else if (line.startsWith("## ")) {
        elements.push(<h2 key={idx} className="text-base font-black text-brand-blue mt-4 mb-2 tracking-tight">{parseInlineMarkdown(line.replace("## ", ""))}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={idx} className="text-sm font-bold text-slate-800 mt-3 mb-1">{parseInlineMarkdown(line.replace("### ", ""))}</h3>);
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote key={idx} className="p-3.5 my-3 border-l-4 border-brand-blue bg-blue-50/70 rounded-r-2xl text-slate-700 italic text-xs font-medium shadow-sm">
            {parseInlineMarkdown(line.replace("> ", ""))}
          </blockquote>
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li key={idx} className="ml-4 text-xs text-slate-700 list-disc font-medium my-1">
            {parseInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
          </li>
        );
      } else if (line.match(/^\d+\.\s+/)) {
        elements.push(
          <li key={idx} className="ml-4 text-xs text-slate-700 list-decimal font-medium my-1">
            {parseInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}
          </li>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={idx} className="h-2" />);
      } else {
        elements.push(<p key={idx} className="text-xs text-slate-700 leading-relaxed my-1.5 font-normal">{parseInlineMarkdown(line)}</p>);
      }
    });

    if (inTable && tableLines.length > 0) {
      elements.push(processTable(tableLines, `table-end`));
    }

    return elements;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalType || !editItem) return;
    setSubmitting(true);

    const payload = { ...editItem };
    if (modalType === "blog") {
      const generatedSlug = payload.slug || (payload.title ? payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `blog-${Date.now()}`);
      payload.slug = generatedSlug;
      if (!payload.publishedAt) {
        payload.publishedAt = new Date().toISOString();
      }
    } else if (modalType === "workshop") {
      const generatedSlug = payload.slug || (payload.title ? payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `workshop-${Date.now()}`);
      payload.slug = generatedSlug;
    }

    const isEdit = Boolean(payload.id && payload.id.length > 3 && !payload.id.startsWith("temp"));
    const endpoint = "/api/cms";
    const method = isEdit ? "PUT" : "POST";

    const typeKey = modalType === "course" ? "courses" : modalType === "solution" ? "solutions" : modalType === "instructor" ? "instructors" : modalType === "workshop" ? "workshops" : "blogs";

    try {
      const session = await getUserSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify({ type: typeKey, item: payload }),
      });
      setModalType(null);
      setEditItem(null);
      fetchAllContent();
    } catch (err) {
      console.error("Error saving CMS item:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span>Dynamic Website Content Management System (CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Website Content & Media Controller
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage software solutions, instructor profiles, blogs, live workshops, hero banners, and stat counters.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          className="px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Preview Live Website</span>
        </a>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-slate-200/80 shadow-sm overflow-x-auto text-xs font-bold">
        {[
          { id: "solutions", label: "Software Solutions", icon: MonitorPlay, count: solutions.length },
          { id: "instructors", label: "Instructors & Mentors", icon: Users, count: instructors.length },
          { id: "blogs", label: "Blog & Articles", icon: FileText, count: blogs.length },
          { id: "workshops", label: "Live Workshops", icon: Video, count: workshops.length },
          { id: "settings", label: "Hero & Site Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-md font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading CMS content data...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: SOFTWARE SOLUTIONS */}
          {activeTab === "solutions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Ready-Made Software Solutions</h3>
                  <p className="text-xs text-slate-500">Manage pre-built software suites displayed on the <code className="text-blue-600 font-bold">/build</code> page.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("solution")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Solution Suite</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map((sol) => (
                  <div key={sol.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase">
                          {sol.tag || sol.category}
                        </span>
                        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow">
                          {sol.priceEstimate || "₹1,49,000"}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900">{sol.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">{sol.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(sol.techStack || []).slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue text-[10px] font-bold border border-blue-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("solution", sol)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("solutions", sol.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTORS & MENTORS */}
          {activeTab === "instructors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Instructors & Domain Mentors</h3>
                  <p className="text-xs text-slate-500">Manage instructor profiles linked to course tracks and public pages.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("instructor")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Instructor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.map((inst) => (
                  <div key={inst.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={inst.avatar} alt={inst.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue" />
                        <div>
                          <h4 className="text-base font-black text-slate-900">{inst.name}</h4>
                          <p className="text-xs font-bold text-amber-600">{inst.role}</p>
                          <span className="text-[10px] text-slate-500 font-semibold">{inst.experienceYears || 8}+ Years Exp • ★ {inst.rating || 4.9}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 font-medium">{inst.bio}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {(inst.expertise || []).map((exp, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("instructor", inst)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("instructors", inst.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BLOGS & ARTICLES */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Blog Posts & External Articles</h3>
                  <p className="text-xs text-slate-500">Publish articles, tutorial links, and case studies displayed on <code className="text-blue-600 font-bold">/blogs</code>.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("blog")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Blog Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase">
                          {blog.category}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900 line-clamp-2">{blog.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">{blog.excerpt}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-1">
                        <span>By: {blog.authorName}</span>
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("blog", blog)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("blogs", blog.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WORKSHOPS & MASTERCLASSES */}
          {activeTab === "workshops" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Live Workshops & Masterclasses</h3>
                  <p className="text-xs text-slate-500">Manage unlisted live masterclasses displayed on <code className="text-blue-600 font-bold">/workshop</code>.</p>
                </div>

                <button
                  onClick={() => handleOpenAdd("workshop")}
                  className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Workshop</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.map((ws) => (
                  <div key={ws.id} className="p-5 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={ws.coverImage} alt={ws.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase">
                          {ws.category}
                        </span>
                        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow">
                          {ws.price === 0 ? "FREE ENTRY" : `₹${ws.price}`}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900 line-clamp-2">{ws.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">{ws.description}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-1">
                        <span>Speaker: {ws.speakerName}</span>
                        <span className="text-blue-600 font-extrabold">{ws.status.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEdit("workshop", ws)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete("workshops", ws.id)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HERO & SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Hero Section & Global Site Settings</h3>
                  <p className="text-xs text-slate-500">Edit homepage title, banner announcements, stat counters, and support contact numbers.</p>
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={submitting}
                  className="px-6 py-3 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Site Settings</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Site settings saved and updated live on the public website!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Top Announcement Banner</label>
                  <input
                    type="text"
                    value={settings.announcementBanner}
                    onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Hero Main Title</label>
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Students Trained</label>
                    <input
                      type="text"
                      value={settings.studentsTrainedCount}
                      onChange={(e) => setSettings({ ...settings, studentsTrainedCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-amber-600 font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Placement Rate</label>
                    <input
                      type="text"
                      value={settings.placementRate}
                      onChange={(e) => setSettings({ ...settings, placementRate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-600 font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Projects Delivered</label>
                    <input
                      type="text"
                      value={settings.projectsDeliveredCount}
                      onChange={(e) => setSettings({ ...settings, projectsDeliveredCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-brand-blue font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Satisfaction Score</label>
                    <input
                      type="text"
                      value={settings.satisfactionRate}
                      onChange={(e) => setSettings({ ...settings, satisfactionRate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-purple-600 font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">WhatsApp Support Phone</label>
                    <input
                      type="text"
                      value={settings.whatsappPhone}
                      onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-600 font-bold text-xs"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* DYNAMIC ITEM EDIT / ADD MODAL */}
      {modalType && editItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          {modalType === "blog" ? (
            /* ================= SPLIT-SCREEN BLOG STUDIO MODAL ================= */
            <div className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden my-auto">
              {/* STUDIO TOP HEADER */}
              <div className="px-6 py-4 bg-slate-900 text-white border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Instant Live Publisher</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {editItem.id ? "Edit Blog Article Studio" : "Live Split-Screen Blog Editor & Publisher"}
                  </h3>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Mode Switcher Buttons */}
                  <div className="flex items-center p-1 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setBlogViewMode("split")}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        blogViewMode === "split" ? "bg-brand-blue text-white shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span>Split View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBlogViewMode("form")}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        blogViewMode === "form" ? "bg-brand-blue text-white shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Form Only</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBlogViewMode("preview")}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        blogViewMode === "preview" ? "bg-brand-blue text-white shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setModalType(null);
                      setEditItem(null);
                    }}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* STUDIO MAIN BODY GRID */}
              <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 overflow-hidden bg-slate-50/50">
                  
                  {/* LEFT COLUMN: ARTICLE EDITOR FORM */}
                  {(blogViewMode === "split" || blogViewMode === "form") && (
                    <div className={`p-6 overflow-y-auto space-y-4 ${blogViewMode === "form" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""}`}>
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
                          <FileText className="w-4 h-4 text-brand-blue" />
                          <span>Article Core Details</span>
                        </h4>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Article Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. How Much Does a Website Cost in 2026?"
                            value={editItem.title || ""}
                            onChange={(e) => {
                              const titleVal = e.target.value;
                              const autoSlug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              setEditItem((prev: any) => ({
                                ...prev,
                                title: titleVal,
                                name: titleVal,
                                slug: prev.slugManual ? prev.slug : autoSlug,
                              }));
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">URL Slug (Auto-generated)</label>
                            <input
                              type="text"
                              required
                              placeholder="how-much-does-a-website-cost-in-2026"
                              value={editItem.slug || ""}
                              onChange={(e) => setEditItem({ ...editItem, slug: e.target.value, slugManual: true })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Category</label>
                            <select
                              value={editItem.category || "Engineering"}
                              onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold focus:outline-none focus:border-brand-blue"
                            >
                              <option value="Engineering">Engineering</option>
                              <option value="Technology">Technology</option>
                              <option value="Artificial Intelligence">Artificial Intelligence</option>
                              <option value="Programming">Programming</option>
                              <option value="Career">Career</option>
                              <option value="Digital Marketing">Digital Marketing</option>
                              <option value="Projects">Projects</option>
                              <option value="Learning">Learning</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Author Name</label>
                            <input
                              type="text"
                              value={editItem.authorName || "LearnBuild Hub Tech Team"}
                              onChange={(e) => setEditItem({ ...editItem, authorName: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Estimated Read Time</label>
                            <input
                              type="text"
                              placeholder="5 min read"
                              value={editItem.readTime || "5 min read"}
                              onChange={(e) => setEditItem({ ...editItem, readTime: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold focus:outline-none focus:border-brand-blue"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Cover Image URL</label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={editItem.coverImage || ""}
                            onChange={(e) => setEditItem({ ...editItem, coverImage: e.target.value, image: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Short Excerpt / Summary</label>
                          <textarea
                            rows={2}
                            placeholder="Brief summary displayed on blog cards..."
                            value={editItem.excerpt || ""}
                            onChange={(e) => setEditItem({ ...editItem, excerpt: e.target.value, description: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-black uppercase text-slate-700">Full Article Content & Rich Formatting</label>
                            <span className="text-[11px] text-blue-600 font-bold">Live Markdown & Table Enabled</span>
                          </div>

                          {/* RICH FORMATTING TOOLBAR */}
                          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-100 border border-slate-200 mb-2">
                            <button
                              type="button"
                              title="Bold (**text**)"
                              onClick={() => insertBlogSnippet("**", "bold text**")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-black text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Bold className="w-3.5 h-3.5" />
                              <span>Bold</span>
                            </button>

                            <button
                              type="button"
                              title="Italic (*text*)"
                              onClick={() => insertBlogSnippet("*", "italic text*")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 italic font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Italic className="w-3.5 h-3.5" />
                              <span>Italic</span>
                            </button>

                            <button
                              type="button"
                              title="Heading 1 (Large)"
                              onClick={() => insertBlogSnippet("# ", "Main Section Title")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-900 font-extrabold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Heading1 className="w-3.5 h-3.5 text-brand-blue" />
                              <span>H1</span>
                            </button>

                            <button
                              type="button"
                              title="Heading 2 (Medium)"
                              onClick={() => insertBlogSnippet("## ", "Section Subheading")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Heading2 className="w-3.5 h-3.5 text-brand-blue" />
                              <span>H2</span>
                            </button>

                            <button
                              type="button"
                              title="Heading 3 (Small)"
                              onClick={() => insertBlogSnippet("### ", "Subtopic Header")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Heading3 className="w-3.5 h-3.5 text-brand-blue" />
                              <span>H3</span>
                            </button>

                            <button
                              type="button"
                              title="Insert Formatted Table"
                              onClick={() => insertBlogSnippet(
                                "| Track / Feature | Description | Duration |\n| --- | --- | --- |\n| Web Engineering | React 18, Next.js 14, Node.js & Postgres | 16 Weeks |\n| AI & ML Track | Python, PyTorch, RAG & Vector DBs | 20 Weeks |"
                              )}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Table className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Table</span>
                            </button>

                            <button
                              type="button"
                              title="Bullet List"
                              onClick={() => insertBlogSnippet("- Bullet Point Item 1\n- Bullet Point Item 2\n- Bullet Point Item 3")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <List className="w-3.5 h-3.5" />
                              <span>Bullets</span>
                            </button>

                            <button
                              type="button"
                              title="Numbered List"
                              onClick={() => insertBlogSnippet("1. First Step\n2. Second Step\n3. Third Step")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <ListOrdered className="w-3.5 h-3.5" />
                              <span>Numbered</span>
                            </button>

                            <button
                              type="button"
                              title="Callout Quote"
                              onClick={() => insertBlogSnippet("> 💡 TIP: LearnBuild Hub provides 1-on-1 live code reviews.")}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Quote className="w-3.5 h-3.5 text-brand-blue" />
                              <span>Quote</span>
                            </button>

                            <button
                              type="button"
                              title="Code Block"
                              onClick={() => insertBlogSnippet("```javascript\nconst server = express();\nserver.listen(3000);\n```")}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs border border-slate-700 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Code className="w-3.5 h-3.5 text-amber-400" />
                              <span>Code</span>
                            </button>

                            <button
                              type="button"
                              title="Insert Link"
                              onClick={() => insertBlogSnippet("[LearnBuild Hub Website](https://learnbuildhub.com)")}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <LinkIcon className="w-3.5 h-3.5 text-brand-blue" />
                              <span>Link</span>
                            </button>
                          </div>

                          <textarea
                            rows={12}
                            placeholder="Write your article here using markdown or quick toolbar above..."
                            value={editItem.content || ""}
                            onChange={(e) => setEditItem({ ...editItem, content: e.target.value })}
                            className="w-full p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 text-xs font-mono leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">External Link (Optional - redirect if hosted on Medium/Substack)</label>
                          <input
                            type="text"
                            placeholder="https://medium.com/@learnbuild/..."
                            value={editItem.externalUrl || ""}
                            onChange={(e) => setEditItem({ ...editItem, externalUrl: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RIGHT COLUMN: REAL-TIME LIVE PREVIEW */}
                  {(blogViewMode === "split" || blogViewMode === "preview") && (
                    <div className={`p-6 overflow-y-auto ${blogViewMode === "preview" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""}`}>
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col min-h-[500px]">
                        {/* BROWSER STYLE HEADER BAR */}
                        <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                            </div>
                            <span className="text-[11px] text-slate-500 font-mono pl-2 border-l border-slate-300">
                              https://learnbuildhub.com/blogs/{editItem.slug || "sample-article"}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                            Real-Time Preview
                          </span>
                        </div>

                        {/* LIVE ARTICLE PREVIEW BODY */}
                        <div className="p-6 sm:p-8 space-y-6">
                          {/* Banner & Category */}
                          <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-900 border border-slate-200">
                            <img
                              src={editItem.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"}
                              alt={editItem.title || "Cover image preview"}
                              className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                              <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider border border-white/20">
                                {editItem.category || "Engineering"}
                              </span>
                            </div>
                          </div>

                          {/* Headline & Metadata */}
                          <div className="space-y-3">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                              {editItem.title || "Untitled Blog Post"}
                            </h2>

                            <div className="flex items-center gap-4 text-xs text-slate-500 font-bold border-b border-slate-100 pb-3">
                              <div className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-brand-blue" />
                                <span>{editItem.authorName || "LearnBuild Hub Tech Team"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{editItem.readTime || "5 min read"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Excerpt Callout */}
                          {editItem.excerpt && (
                            <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-brand-blue text-slate-700 text-xs font-semibold leading-relaxed">
                              {editItem.excerpt}
                            </div>
                          )}

                          {/* Formatted Content Body */}
                          <div className="prose prose-slate max-w-none text-xs leading-relaxed">
                            {renderMarkdownPreview(editItem.content)}
                          </div>

                          {/* CTA Callout */}
                          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-2 mt-8">
                            <h4 className="text-sm font-black text-white">Ready to Build Production Software?</h4>
                            <p className="text-xs text-blue-200">
                              Learn full-stack engineering, AI microservices, and modern web application development with live mentor guidance at LearnBuild Hub.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
                  <div className="text-xs text-slate-500 font-medium hidden sm:block">
                    Changes are saved instantly to PostgreSQL database and pushed live to website visitors.
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalType(null);
                        setEditItem(null);
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>{editItem.id ? "Update Live Blog" : "Publish Live Article"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : modalType === "workshop" ? (
            /* ================= SPLIT-SCREEN WORKSHOP STUDIO MODAL ================= */
            <div className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden my-auto">
              {/* STUDIO TOP HEADER */}
              <div className="px-6 py-4 bg-slate-900 text-white border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-1">
                    <Video className="w-3 h-3 text-emerald-400" />
                    <span>Unlisted Workshop Masterclass Studio</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {editItem.id ? "Edit Workshop Masterclass" : "Create New Unlisted Workshop"}
                  </h3>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Mode Switcher Buttons */}
                  <div className="flex items-center p-1 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setWorkshopViewMode("split")}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        workshopViewMode === "split" ? "bg-brand-blue text-white shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span>Split View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkshopViewMode("form")}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        workshopViewMode === "form" ? "bg-brand-blue text-white shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Form Only</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkshopViewMode("preview")}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        workshopViewMode === "preview" ? "bg-brand-blue text-white shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setModalType(null);
                      setEditItem(null);
                    }}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* STUDIO MAIN BODY GRID */}
              <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 overflow-hidden bg-slate-50/50">
                  
                  {/* LEFT COLUMN: WORKSHOP EDITOR FORM */}
                  {(workshopViewMode === "split" || workshopViewMode === "form") && (
                    <div className={`p-6 overflow-y-auto space-y-5 ${workshopViewMode === "form" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""}`}>
                      {/* Section 1: Workshop Core Details */}
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
                          <Video className="w-4 h-4 text-brand-blue" />
                          <span>Workshop Core Details</span>
                        </h4>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Workshop Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Building Production AI Microservices with Python & Next.js"
                            value={editItem.title || ""}
                            onChange={(e) => {
                              const titleVal = e.target.value;
                              const autoSlug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              setEditItem((prev: any) => ({
                                ...prev,
                                title: titleVal,
                                name: titleVal,
                                slug: prev.slugManual ? prev.slug : autoSlug,
                              }));
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">URL Slug</label>
                            <input
                              type="text"
                              required
                              placeholder="building-production-ai-microservices"
                              value={editItem.slug || ""}
                              onChange={(e) => setEditItem({ ...editItem, slug: e.target.value, slugManual: true })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Category</label>
                            <select
                              value={editItem.category || "Engineering"}
                              onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold focus:outline-none focus:border-brand-blue"
                            >
                              <option value="Engineering">Engineering</option>
                              <option value="Artificial Intelligence">Artificial Intelligence</option>
                              <option value="Full-Stack Web">Full-Stack Web</option>
                              <option value="Cloud & DevOps">Cloud & DevOps</option>
                              <option value="Cybersecurity">Cybersecurity</option>
                              <option value="Data Science">Data Science</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Tagline / Short Subtitle</label>
                          <input
                            type="text"
                            placeholder="Live Hands-on Masterclass for Developers & Engineers"
                            value={editItem.tagline || ""}
                            onChange={(e) => setEditItem({ ...editItem, tagline: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Price (₹, 0 for Free)</label>
                            <input
                              type="number"
                              value={editItem.price !== undefined ? editItem.price : 0}
                              onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-emerald-700 text-xs font-bold focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Duration & Type</label>
                            <input
                              type="text"
                              value={editItem.duration || "2 Hours • Live Interactive"}
                              onChange={(e) => setEditItem({ ...editItem, duration: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Status</label>
                            <select
                              value={editItem.status || "upcoming"}
                              onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-blue-600 text-xs font-bold focus:outline-none focus:border-brand-blue"
                            >
                              <option value="upcoming">Upcoming</option>
                              <option value="completed">Completed</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Event Date & Time (ISO / Local)</label>
                          <input
                            type="text"
                            placeholder="e.g. Oct 15, 2026 • 6:30 PM IST"
                            value={editItem.eventDate || ""}
                            onChange={(e) => setEditItem({ ...editItem, eventDate: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      {/* Section 2: Speaker Information */}
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
                          <User className="w-4 h-4 text-brand-blue" />
                          <span>Speaker Profile</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Speaker Name</label>
                            <input
                              type="text"
                              value={editItem.speakerName || "Saurabh Upadhyay"}
                              onChange={(e) => setEditItem({ ...editItem, speakerName: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Speaker Role / Designation</label>
                            <input
                              type="text"
                              value={editItem.speakerRole || "Senior Software Architect & Mentor"}
                              onChange={(e) => setEditItem({ ...editItem, speakerRole: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-blue-600 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Speaker Avatar URL</label>
                          <input
                            type="text"
                            value={editItem.speakerAvatar || ""}
                            onChange={(e) => setEditItem({ ...editItem, speakerAvatar: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      {/* Section 3: Media & Banner */}
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
                          <Image className="w-4 h-4 text-brand-blue" />
                          <span>Cover Banner Image</span>
                        </h4>

                        <div>
                          <label className="block text-xs font-black uppercase text-slate-700 mb-1">Cover Image URL</label>
                          <input
                            type="text"
                            value={editItem.coverImage || ""}
                            onChange={(e) => setEditItem({ ...editItem, coverImage: e.target.value, image: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      {/* Section 4: Detailed Overview & Rich Formatting */}
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-brand-blue" />
                            <span>Detailed Masterclass Overview</span>
                          </h4>
                          <span className="text-[11px] text-blue-600 font-bold">Markdown & Formatting Supported</span>
                        </div>

                        {/* Formatting Toolbar */}
                        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-100 border border-slate-200 mb-2">
                          <button
                            type="button"
                            title="Bold (**text**)"
                            onClick={() => insertBlogSnippet("**", "bold text**")}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-black text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                          >
                            <Bold className="w-3.5 h-3.5" />
                            <span>Bold</span>
                          </button>

                          <button
                            type="button"
                            title="Heading 2"
                            onClick={() => insertBlogSnippet("## ", "Section Subheading")}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                          >
                            <Heading2 className="w-3.5 h-3.5 text-brand-blue" />
                            <span>H2</span>
                          </button>

                          <button
                            type="button"
                            title="Bullet List"
                            onClick={() => insertBlogSnippet("- Bullet Point Item 1\n- Bullet Point Item 2")}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1 shadow-sm transition-all"
                          >
                            <List className="w-3.5 h-3.5" />
                            <span>Bullets</span>
                          </button>

                          <button
                            type="button"
                            title="Insert Table"
                            onClick={() => insertBlogSnippet(
                              "| Session | Topic | Key Takeaway |\n| --- | --- | --- |\n| Part 1 | Architecture & Setup | System Design |\n| Part 2 | Live Coding & Deploy | Cloud Deployment |"
                            )}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center gap-1 shadow-sm transition-all"
                          >
                            <Table className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Table</span>
                          </button>
                        </div>

                        <textarea
                          rows={6}
                          placeholder="Write workshop overview, key requirements, prerequisites, and learning highlights..."
                          value={editItem.description || ""}
                          onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono leading-relaxed resize-y focus:outline-none focus:border-brand-blue"
                        />
                      </div>

                      {/* Section 5: Interactive Agenda Breakdown */}
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <ListOrdered className="w-4 h-4 text-brand-blue" />
                            <span>Interactive Agenda Timeline</span>
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              const currAgenda = Array.isArray(editItem.agenda) ? editItem.agenda : [];
                              setEditItem({ ...editItem, agenda: [...currAgenda, ""] });
                            }}
                            className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-brand-blue font-bold text-xs flex items-center gap-1 border border-blue-200 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Agenda Step</span>
                          </button>
                        </div>

                        <div className="space-y-2.5">
                          {(Array.isArray(editItem.agenda) ? editItem.agenda : []).map((agStep: string, agIdx: number) => (
                            <div key={agIdx} className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center border border-slate-200 shrink-0">
                                {agIdx + 1}
                              </span>
                              <input
                                type="text"
                                placeholder={`Agenda Step ${agIdx + 1}`}
                                value={agStep}
                                onChange={(e) => {
                                  const newAgenda = [...(editItem.agenda || [])];
                                  newAgenda[agIdx] = e.target.value;
                                  setEditItem({ ...editItem, agenda: newAgenda });
                                }}
                                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newAgenda = (editItem.agenda || []).filter((_: any, i: number) => i !== agIdx);
                                  setEditItem({ ...editItem, agenda: newAgenda });
                                }}
                                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 6: What You Will Learn Takeaways */}
                      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>What Students Will Learn</span>
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              const currPoints = Array.isArray(editItem.whatYouWillLearn) ? editItem.whatYouWillLearn : [];
                              setEditItem({ ...editItem, whatYouWillLearn: [...currPoints, ""] });
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Outcome Point</span>
                          </button>
                        </div>

                        <div className="space-y-2.5">
                          {(Array.isArray(editItem.whatYouWillLearn) ? editItem.whatYouWillLearn : []).map((learnPoint: string, learnIdx: number) => (
                            <div key={learnIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <input
                                type="text"
                                placeholder={`Takeaway Point ${learnIdx + 1}`}
                                value={learnPoint}
                                onChange={(e) => {
                                  const newPoints = [...(editItem.whatYouWillLearn || [])];
                                  newPoints[learnIdx] = e.target.value;
                                  setEditItem({ ...editItem, whatYouWillLearn: newPoints });
                                }}
                                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newPoints = (editItem.whatYouWillLearn || []).filter((_: any, i: number) => i !== learnIdx);
                                  setEditItem({ ...editItem, whatYouWillLearn: newPoints });
                                }}
                                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RIGHT COLUMN: LIVE WORKSHOP PAGE PREVIEW */}
                  {(workshopViewMode === "split" || workshopViewMode === "preview") && (
                    <div className={`p-6 overflow-y-auto bg-slate-900 text-white ${workshopViewMode === "preview" ? "lg:col-span-2 max-w-5xl mx-auto w-full" : ""}`}>
                      <div className="space-y-6">
                        {/* URL Bar Preview Header */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                          <Globe className="w-3.5 h-3.5 text-blue-400" />
                          <span className="font-mono text-[11px] text-slate-400">Previewing Direct Link:</span>
                          <span className="font-mono text-[11px] text-blue-300 font-bold truncate">
                            https://learnbuildhub.com/workshop/{editItem.slug || "masterclass-slug"}
                          </span>
                        </div>

                        {/* Live Hero Banner Preview */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-extrabold uppercase tracking-wider">
                              {editItem.category || "Engineering"}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider">
                              {(editItem.status || "UPCOMING").toUpperCase()}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                              {editItem.price === 0 || !editItem.price ? "FREE MASTERCLASS" : `₹${editItem.price}`}
                            </span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                            {editItem.title || "Masterclass Title Placeholder"}
                          </h2>

                          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                            {editItem.tagline || "Live Hands-on Masterclass for Developers & Engineers"}
                          </p>

                          {/* Speaker Card Preview */}
                          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                            <img
                              src={editItem.speakerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                              alt={editItem.speakerName}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-600"
                            />
                            <div>
                              <div className="text-xs font-black text-white">{editItem.speakerName || "Saurabh Upadhyay"}</div>
                              <div className="text-[11px] text-blue-400 font-bold">{editItem.speakerRole || "Senior Software Architect"}</div>
                            </div>
                          </div>
                        </div>

                        {/* Cover Image Preview */}
                        {editItem.coverImage && (
                          <div className="rounded-2xl overflow-hidden border border-slate-800">
                            <img src={editItem.coverImage} alt="Cover" className="w-full h-48 object-cover" />
                          </div>
                        )}

                        {/* Description Preview */}
                        <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-800 space-y-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">About This Masterclass</h4>
                          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                            {renderMarkdownPreview(editItem.description || "")}
                          </div>
                        </div>

                        {/* Agenda Timeline Preview */}
                        {Array.isArray(editItem.agenda) && editItem.agenda.length > 0 && (
                          <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-800 space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Curriculum & Agenda Timeline</h4>
                            <div className="space-y-2.5">
                              {editItem.agenda.map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
                                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 font-black text-[11px] flex items-center justify-center shrink-0">
                                    0{i + 1}
                                  </span>
                                  <span className="text-slate-200 font-semibold">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* What You Will Learn Checklist Preview */}
                        {Array.isArray(editItem.whatYouWillLearn) && editItem.whatYouWillLearn.length > 0 && (
                          <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-800 space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Key Takeaways & Learning Outcomes</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {editItem.whatYouWillLearn.map((item: string, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="font-medium">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM STUDIO FOOTER TOOLBAR */}
                <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Unlisted Workshop Link active upon save</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalType(null);
                        setEditItem(null);
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>{editItem.id ? "Update Live Workshop" : "Publish Workshop"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* ================= STANDARD MODAL FOR COURSES, SOLUTIONS, INSTRUCTORS ================= */
            <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900 capitalize">
                  {editItem.id ? `Edit ${modalType}` : `Add New ${modalType}`}
                </h3>
                <button
                  onClick={() => {
                    setModalType(null);
                    setEditItem(null);
                  }}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={editItem.title || editItem.name || ""}
                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Image / Avatar URL</label>
                  <input
                    type="text"
                    value={editItem.image || editItem.avatar || editItem.coverImage || ""}
                    onChange={(e) => setEditItem({ ...editItem, image: e.target.value, avatar: e.target.value, coverImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Description / Bio / Excerpt</label>
                  <textarea
                    rows={3}
                    value={editItem.description || editItem.bio || editItem.excerpt || ""}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value, bio: e.target.value, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                  />
                </div>

                {/* SPECIFIC FIELDS PER TYPE */}
                {modalType === "solution" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Category</label>
                        <input
                          type="text"
                          value={editItem.category || ""}
                          onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Price Estimate</label>
                        <input
                          type="text"
                          value={editItem.priceEstimate || ""}
                          onChange={(e) => setEditItem({ ...editItem, priceEstimate: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-emerald-600 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        placeholder="Next.js, Node.js, PostgreSQL"
                        value={Array.isArray(editItem.techStack) ? editItem.techStack.join(", ") : editItem.techStack || ""}
                        onChange={(e) => setEditItem({ ...editItem, techStack: e.target.value.split(",").map((s: string) => s.trim()) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-semibold"
                      />
                    </div>
                  </>
                )}

                {modalType === "instructor" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Role Title</label>
                        <input
                          type="text"
                          value={editItem.role || ""}
                          onChange={(e) => setEditItem({ ...editItem, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Rating Score</label>
                        <input
                          type="number"
                          step="0.1"
                          value={editItem.rating || 4.9}
                          onChange={(e) => setEditItem({ ...editItem, rating: parseFloat(e.target.value) || 4.9 })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-amber-600 text-xs font-bold"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setModalType(null);
                      setEditItem(null);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Item</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
