"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, Clock, User, Sparkles, BookOpen, ExternalLink, ArrowRight, Loader2, Share2, Check 
} from "lucide-react";



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

const renderMarkdownContent = (text: string) => {
  if (!text || text.trim() === "") return null;

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
      <div key={keyPrefix} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white font-black">
              {headerCells.map((h, i) => (
                <th key={i} className="px-4 py-3 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                  {parseInlineMarkdown(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bodyRows.map((r, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/80 hover:bg-blue-50/30"}>
                {r.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-slate-700 font-medium">
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
          <div key={`code-${idx}`} className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 shadow-inner">
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
      elements.push(<h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight">{parseInlineMarkdown(line.replace("# ", ""))}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={idx} className="text-xl sm:text-2xl font-black text-brand-blue mt-6 mb-3 tracking-tight">{parseInlineMarkdown(line.replace("## ", ""))}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={idx} className="text-lg font-bold text-slate-800 mt-5 mb-2">{parseInlineMarkdown(line.replace("### ", ""))}</h3>);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={idx} className="p-4 my-5 border-l-4 border-brand-blue bg-blue-50/70 rounded-r-2xl text-slate-700 italic text-sm font-medium shadow-sm">
          {parseInlineMarkdown(line.replace("> ", ""))}
        </blockquote>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={idx} className="ml-6 text-sm text-slate-700 list-disc font-medium my-1.5 leading-relaxed">
          {parseInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
        </li>
      );
    } else if (line.match(/^\d+\.\s+/)) {
      elements.push(
        <li key={idx} className="ml-6 text-sm text-slate-700 list-decimal font-medium my-1.5 leading-relaxed">
          {parseInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={idx} className="h-3" />);
    } else {
      elements.push(<p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed my-2.5 font-normal">{parseInlineMarkdown(line)}</p>);
    }
  });

  if (inTable && tableLines.length > 0) {
    elements.push(processTable(tableLines, `table-end`));
  }

  return elements;
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs?slug=${encodeURIComponent(params.slug)}`, {
      cache: "no-store",
      headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setBlog(data.data);
        }
      })
      .catch((err) => console.error("Error loading blog article:", err))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading Article Reader...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-xl mx-auto text-center space-y-5 bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Article Not Found</h2>
          <p className="text-xs text-slate-600">The blog article you are trying to view does not exist or may have been updated.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = blog.published_at || blog.publishedAt 
    ? new Date(blog.published_at || blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Sep 2026";

  return (
    <article className="min-h-screen bg-white pt-8 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue" />
            <span>Back to Insights & Articles</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Article"}</span>
          </button>
        </div>

        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-black text-xs uppercase tracking-wider border border-brand-blue/20">
              {blog.category || "Engineering"}
            </span>
            <span className="text-xs text-slate-400 font-bold">•</span>
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {blog.read_time || blog.readTime || "5 min read"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue font-black flex items-center justify-center border border-blue-200">
                <User className="w-4 h-4" />
              </div>
              <span>{blog.author_name || blog.authorName || blog.author || "LearnBuild Hub Tech Team"}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Cover Image Banner */}
        <div className="relative rounded-3xl overflow-hidden h-64 sm:h-96 bg-slate-900 border border-slate-200 shadow-xl">
          <img
            src={blog.cover_image || blog.coverImage || blog.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Callout Summary */}
        {blog.excerpt && (
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 border-l-4 border-brand-blue text-slate-800 text-sm sm:text-base font-semibold leading-relaxed shadow-sm">
            {blog.excerpt}
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none">
          {renderMarkdownContent(blog.content || blog.excerpt || "")}
        </div>

        {/* External Link Redirect (if applicable) */}
        {(blog.external_url || blog.externalUrl) && (
          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl border border-slate-800">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                External Publication
              </span>
              <h4 className="text-base font-black text-white mt-1">Read original publication on Medium or Dev.to</h4>
            </div>

            <a
              href={blog.external_url || blog.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shrink-0"
            >
              <span>Open External Article</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Bottom LearnBuild CTA Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white space-y-4 border border-blue-800/50 shadow-2xl mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Hands-on Engineering Mentorship</span>
          </div>
          <h3 className="text-2xl font-black text-white">Want to Build Production SaaS & AI Products Like This?</h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
            Join LearnBuild Hub to master full-stack software development, cloud architecture, and Generative AI microservices through 1-on-1 mentor guidance.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/learn"
              className="px-6 py-3 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <span>Explore Tech Tracks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider border border-white/20"
            >
              <span>Book Mentorship Call</span>
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
