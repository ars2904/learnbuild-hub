"use client";

import React, { useState } from "react";
import { 
  Code2, 
  Bot, 
  Cpu, 
  TrendingUp, 
  Smartphone, 
  Database, 
  Terminal, 
  Globe, 
  Layers, 
  Sparkles,
  BookOpen,
  FileCode2,
  Server,
  Zap,
  Building2,
  Dumbbell,
  BookMarked
} from "lucide-react";

interface CardVisualBannerProps {
  imageUrl?: string;
  title: string;
  category?: string;
  type?: "course" | "blog" | "solution";
  className?: string;
}

export const CardVisualBanner: React.FC<CardVisualBannerProps> = ({
  imageUrl,
  title,
  category = "Technology",
  type = "course",
  className = "h-48 w-full",
}) => {
  const [imageError, setImageError] = useState(false);

  // Helper to pick category theme icon and gradient style
  const getThemeConfig = (catName: string, titleText: string) => {
    const text = (catName + " " + titleText).toLowerCase();

    if (text.includes("ai") || text.includes("machine learning") || text.includes("llm") || text.includes("python")) {
      return {
        icon: Bot,
        gradient: "from-purple-950 via-slate-900 to-blue-950",
        accentColor: "text-purple-400",
        borderColor: "border-purple-500/30",
        badgeBg: "bg-purple-500/20 text-purple-300 border-purple-400/30",
        glow: "bg-purple-600/25",
        tag: "AI & ML LAB",
      };
    }

    if (text.includes("marketing") || text.includes("growth") || text.includes("seo") || text.includes("digital")) {
      return {
        icon: TrendingUp,
        gradient: "from-amber-950 via-slate-900 to-orange-950",
        accentColor: "text-amber-400",
        borderColor: "border-amber-500/30",
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
        glow: "bg-amber-600/25",
        tag: "GROWTH & MARKETING",
      };
    }

    if (text.includes("mobile") || text.includes("react native") || text.includes("flutter") || text.includes("app")) {
      return {
        icon: Smartphone,
        gradient: "from-cyan-950 via-slate-900 to-blue-950",
        accentColor: "text-cyan-400",
        borderColor: "border-cyan-500/30",
        badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
        glow: "bg-cyan-600/25",
        tag: "MOBILE DEV",
      };
    }

    if (text.includes("database") || text.includes("sql") || text.includes("postgres")) {
      return {
        icon: Database,
        gradient: "from-emerald-950 via-slate-900 to-teal-950",
        accentColor: "text-emerald-400",
        borderColor: "border-emerald-500/30",
        badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
        glow: "bg-emerald-600/25",
        tag: "DATA ARCHITECTURE",
      };
    }

    if (text.includes("java") || text.includes(".net") || text.includes("c#") || text.includes("backend") || text.includes("spring")) {
      return {
        icon: Server,
        gradient: "from-blue-950 via-slate-900 to-indigo-950",
        accentColor: "text-blue-400",
        borderColor: "border-blue-500/30",
        badgeBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
        glow: "bg-blue-600/25",
        tag: "ENTERPRISE BACKEND",
      };
    }

    if (text.includes("school") || text.includes("education") || text.includes("academy")) {
      return {
        icon: BookMarked,
        gradient: "from-blue-950 via-slate-900 to-sky-950",
        accentColor: "text-sky-400",
        borderColor: "border-sky-500/30",
        badgeBg: "bg-sky-500/20 text-sky-300 border-sky-400/30",
        glow: "bg-sky-600/25",
        tag: "EDTECH SYSTEM",
      };
    }

    if (text.includes("office") || text.includes("management") || text.includes("clinic") || text.includes("crm")) {
      return {
        icon: Building2,
        gradient: "from-indigo-950 via-slate-900 to-slate-950",
        accentColor: "text-indigo-400",
        borderColor: "border-indigo-500/30",
        badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
        glow: "bg-indigo-600/25",
        tag: "ENTERPRISE CRM",
      };
    }

    if (text.includes("gym") || text.includes("fitness")) {
      return {
        icon: Dumbbell,
        gradient: "from-rose-950 via-slate-900 to-orange-950",
        accentColor: "text-rose-400",
        borderColor: "border-rose-500/30",
        badgeBg: "bg-rose-500/20 text-rose-300 border-rose-400/30",
        glow: "bg-rose-600/25",
        tag: "FITNESS TECH",
      };
    }

    // Default Full-Stack / Web / Technology theme
    return {
      icon: Code2,
      gradient: "from-slate-900 via-blue-950 to-slate-950",
      accentColor: "text-brand-orange",
      borderColor: "border-blue-500/30",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      glow: "bg-blue-600/25",
      tag: "FULL-STACK LAB",
    };
  };

  const theme = getThemeConfig(category, title);
  const IconComponent = theme.icon;

  // Render external image if provided AND has no load error
  if (imageUrl && !imageError) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
      </div>
    );
  }

  // Stylish Illustrated Fallback Banner (100% Bulletproof, 0 Network Errors)
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} border-b border-white/10 ${className}`}>
      
      {/* Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Ambient Lighting Glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${theme.glow} blur-3xl pointer-events-none`} />

      {/* Center Icon & Graphic */}
      <div className="relative z-10 h-full w-full p-6 flex flex-col justify-between items-start">
        
        {/* Top Tech Category Tag */}
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${theme.badgeBg}`}>
            {theme.tag}
          </span>
        </div>

        {/* Center Icon Graphic */}
        <div className="flex items-center gap-3 mt-auto">
          <div className={`w-12 h-12 rounded-2xl bg-slate-900/80 border ${theme.borderColor} flex items-center justify-center shadow-xl`}>
            <IconComponent className={`w-6 h-6 ${theme.accentColor}`} />
          </div>
          <div className="truncate max-w-[200px]">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300 block truncate">
              {category}
            </span>
            <span className="text-[11px] font-bold text-slate-400 block truncate">
              LearnBuild Hub Track
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
