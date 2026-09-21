"use client";

import React from "react";

export const StudentWorkstationIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => {
  return (
    <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="studentDeskGrad" x1="0" y1="0" x2="500" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EFF6FF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="laptopScreenGrad" x1="160" y1="90" x2="340" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <filter id="shadowBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0052CC" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Desk Base Surface */}
      <ellipse cx="250" cy="275" rx="220" ry="25" fill="#E2E8F0" opacity="0.6" />
      <rect x="50" y="240" width="400" height="12" rx="6" fill="#CBD5E1" />

      {/* Stacked Study Books (Left Side) */}
      <g filter="url(#shadowBlur)">
        {/* Bottom Book (Deep Blue) */}
        <rect x="70" y="210" width="100" height="22" rx="4" fill="#0052CC" />
        <rect x="70" y="210" width="14" height="22" rx="2" fill="#003D99" />
        <line x1="90" y1="221" x2="160" y2="221" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

        {/* Middle Book (Sky Blue) */}
        <rect x="76" y="186" width="92" height="20" rx="4" fill="#2563EB" />
        <rect x="76" y="186" width="12" height="20" rx="2" fill="#1D4ED8" />
        <line x1="94" y1="196" x2="158" y2="196" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />

        {/* Top Book (Amber Gold) */}
        <rect x="82" y="164" width="84" height="18" rx="4" fill="#F59E0B" />
        <rect x="82" y="164" width="10" height="18" rx="2" fill="#D97706" />
        <line x1="98" y1="173" x2="156" y2="173" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Student Laptop Setup (Center) */}
      <g filter="url(#shadowBlur)">
        {/* Laptop Screen Body */}
        <rect x="160" y="80" width="180" height="130" rx="12" fill="url(#laptopScreenGrad)" stroke="#475569" strokeWidth="3" />
        
        {/* Screen Display Area */}
        <rect x="170" y="90" width="160" height="110" rx="6" fill="#0F172A" />
        
        {/* Course Video Player & Code Lines */}
        <rect x="180" y="100" width="80" height="50" rx="4" fill="#1E293B" />
        <circle cx="220" cy="125" r="12" fill="#0052CC" />
        <polygon points="216,119 228,125 216,131" fill="#FFFFFF" />

        {/* Code/Lesson Lines Right Side */}
        <line x1="270" y1="106" x2="320" y2="106" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        <line x1="270" y1="118" x2="310" y2="118" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="270" y1="130" x2="315" y2="130" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="270" y1="142" x2="300" y2="142" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* Progress Bar Bottom of Screen */}
        <rect x="180" y="170" width="140" height="8" rx="4" fill="#334155" />
        <rect x="180" y="170" width="105" height="8" rx="4" fill="#0052CC" />

        {/* Laptop Base Keyboard */}
        <path d="M140 212 L360 212 L380 240 L120 240 Z" fill="#94A3B8" />
        <path d="M145 214 L355 214 L370 236 L130 236 Z" fill="#CBD5E1" />
        <rect x="230" y="222" width="40" height="10" rx="2" fill="#64748B" />
      </g>

      {/* Notebook & Certificate Badge (Right Side) */}
      <g filter="url(#shadowBlur)">
        {/* Open Notebook */}
        <path d="M 360 190 L 440 180 L 440 235 L 360 245 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M 360 190 L 400 185 L 400 240 L 360 245 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="370" y1="200" x2="395" y2="197" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="370" y1="210" x2="395" y2="207" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="370" y1="220" x2="395" y2="217" stroke="#0052CC" strokeWidth="1.5" />

        {/* Pen */}
        <line x1="355" y1="185" x2="385" y2="240" stroke="#0052CC" strokeWidth="4" strokeLinecap="round" />
        <circle cx="355" cy="185" r="2.5" fill="#F59E0B" />
      </g>

      {/* Floating Learning Elements (Lightbulb & Certificate Badge) */}
      <g>
        {/* Lightbulb (Idea/Learning) */}
        <circle cx="250" cy="45" r="20" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <path d="M245 42 Q250 35 255 42 Q250 50 245 42 Z" fill="#F59E0B" />
        <rect x="246" y="58" width="8" height="6" rx="1" fill="#D97706" />

        {/* Floating Sparks */}
        <circle cx="215" cy="40" r="3" fill="#38BDF8" />
        <circle cx="285" cy="40" r="3" fill="#38BDF8" />
        <circle cx="250" cy="15" r="2" fill="#F59E0B" />
      </g>
    </svg>
  );
};
