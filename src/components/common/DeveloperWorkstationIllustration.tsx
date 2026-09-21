"use client";

import React from "react";

export const DeveloperWorkstationIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => {
  return (
    <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="devDeskGrad" x1="0" y1="0" x2="500" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF7ED" />
          <stop offset="1" stopColor="#FFEDD5" />
        </linearGradient>
        <linearGradient id="devMonitorGrad" x1="140" y1="50" x2="340" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <filter id="orangeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#FF6B00" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Desk Base Surface */}
      <ellipse cx="250" cy="275" rx="220" ry="25" fill="#E2E8F0" opacity="0.6" />
      <rect x="50" y="240" width="400" height="12" rx="6" fill="#CBD5E1" />

      {/* Developer Ergonomic Chair (Back & Base) */}
      <g filter="url(#orangeShadow)">
        {/* Chair Base Wheels */}
        <line x1="330" y1="285" x2="390" y2="285" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <circle cx="330" cy="285" r="4" fill="#1E293B" />
        <circle cx="390" cy="285" r="4" fill="#1E293B" />
        <rect x="357" y="250" width="6" height="35" rx="2" fill="#64748B" />

        {/* Chair Seat */}
        <rect x="325" y="240" width="70" height="14" rx="4" fill="#1E293B" />
        
        {/* Chair Backrest */}
        <rect x="375" y="150" width="16" height="95" rx="8" fill="#334155" />
        <rect x="370" y="145" width="24" height="25" rx="6" fill="#FF6B00" />
      </g>

      {/* Engineer/Developer Character sitting in Chair working on Laptop */}
      <g>
        {/* Legs / Pants */}
        <path d="M 345 220 L 345 245 L 320 270" stroke="#334155" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 360 220 L 360 245 L 335 270" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />

        {/* Torso / Orange Shirt */}
        <path d="M 330 170 C 330 155, 360 155, 365 170 L 370 225 L 325 225 Z" fill="#FF6B00" />

        {/* Head & Hair */}
        <circle cx="342" cy="138" r="14" fill="#FDBA74" />
        <path d="M 330 135 C 330 120, 355 120, 356 135 Z" fill="#1E293B" />

        {/* Arms Reaching to Keyboard */}
        <path d="M 345 175 L 305 195 L 270 195" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 345 175 L 305 195 L 270 195" stroke="#FF6B00" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      </g>

      {/* Developer Desktop Monitor & Code IDE */}
      <g filter="url(#orangeShadow)">
        {/* Monitor Stand */}
        <rect x="220" y="210" width="40" height="30" rx="2" fill="#64748B" />
        <rect x="200" y="236" width="80" height="6" rx="3" fill="#475569" />

        {/* Large Developer Display Screen */}
        <rect x="130" y="55" width="220" height="155" rx="10" fill="url(#devMonitorGrad)" stroke="#334155" strokeWidth="3" />
        <rect x="138" y="63" width="204" height="139" rx="6" fill="#020617" />

        {/* macOS Control Dots */}
        <circle cx="148" cy="73" r="3" fill="#EF4444" />
        <circle cx="157" cy="73" r="3" fill="#F59E0B" />
        <circle cx="166" cy="73" r="3" fill="#10B981" />

        {/* Code Lines on Screen */}
        <rect x="146" y="86" width="60" height="18" rx="3" fill="#1E293B" />
        <line x1="152" y1="95" x2="195" y2="95" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />

        {/* Code Lines Left Pane */}
        <line x1="146" y1="115" x2="210" y2="115" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="156" y1="126" x2="230" y2="126" stroke="#A855F7" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="166" y1="137" x2="250" y2="137" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="166" y1="148" x2="220" y2="148" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="146" y1="159" x2="200" y2="159" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Live Status Indicator Bottom Right of Display */}
        <rect x="250" y="172" width="84" height="20" rx="10" fill="#059669" />
        <circle cx="262" cy="182" r="3" fill="#34D399" />
        <text x="270" y="185" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SYSTEM OK</text>
      </g>

      {/* Floating Gear / Engineering Icons */}
      <g>
        <circle cx="100" cy="80" r="18" fill="#FFF7ED" stroke="#FF6B00" strokeWidth="2" />
        <path d="M100 70 L100 90 M90 80 L110 80 M93 73 L107 87 M93 87 L107 73" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
        
        <circle cx="410" cy="80" r="16" fill="#F0FDF4" stroke="#10B981" strokeWidth="2" />
        <polyline points="402,80 408,86 418,74" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
};
