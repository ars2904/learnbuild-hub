"use client";

import React from "react";

export const DeveloperWorkstationIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => {
  return (
    <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Soft Background Radial Light */}
        <radialGradient id="buildDeskGlow" cx="250" cy="150" r="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF7ED" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* Primary Monitor Screen Gradient */}
        <linearGradient id="mainMonitorGrad" x1="120" y1="40" x2="380" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>

        {/* Laptop Screen Gradient */}
        <linearGradient id="laptopGrad" x1="50" y1="130" x2="150" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>

        {/* Ambient Drop Shadows */}
        <filter id="deskDropShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#EA580C" floodOpacity="0.12" />
        </filter>
        <filter id="glowGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF6B00" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Ambient Radial Lighting */}
      <rect width="500" height="300" fill="url(#buildDeskGlow)" rx="16" />

      {/* Modern Desk Surface Base */}
      <ellipse cx="250" cy="265" rx="210" ry="20" fill="#E2E8F0" opacity="0.6" />
      <rect x="60" y="242" width="380" height="10" rx="5" fill="#CBD5E1" />

      {/* MAIN DEVELOPER DISPLAY (Ultra-Wide Monitor) */}
      <g filter="url(#deskDropShadow)">
        {/* Monitor Base Stand */}
        <rect x="225" y="200" width="50" height="42" rx="4" fill="#64748B" />
        <rect x="195" y="238" width="110" height="6" rx="3" fill="#475569" />

        {/* Outer Bezel Frame */}
        <rect x="110" y="35" width="280" height="170" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="3" />
        {/* Inner Screen Display */}
        <rect x="118" y="43" width="264" height="154" rx="8" fill="url(#mainMonitorGrad)" />

        {/* IDE Title Window Bar */}
        <rect x="118" y="43" width="264" height="24" rx="8" fill="#1E293B" />
        
        {/* Window Control Buttons */}
        <circle cx="132" cy="55" r="4" fill="#EF4444" />
        <circle cx="144" cy="55" r="4" fill="#F59E0B" />
        <circle cx="156" cy="55" r="4" fill="#10B981" />
        
        {/* Active IDE Tab Pill */}
        <rect x="172" y="47" width="95" height="16" rx="4" fill="#020617" />
        <text x="180" y="59" fill="#FF6B00" fontSize="9" fontWeight="800" fontFamily="monospace">App.tsx • Build</text>

        {/* Editor Sidebar */}
        <rect x="118" y="67" width="36" height="130" fill="#090D16" />
        <rect x="126" y="78" width="20" height="3" rx="1.5" fill="#3B82F6" />
        <rect x="126" y="88" width="14" height="3" rx="1.5" fill="#64748B" />
        <rect x="126" y="98" width="18" height="3" rx="1.5" fill="#64748B" />

        {/* Code Lines in Main IDE Area */}
        {/* Line 1: import */}
        <rect x="166" y="78" width="45" height="4" rx="2" fill="#F43F5E" />
        <rect x="217" y="78" width="70" height="4" rx="2" fill="#38BDF8" />
        {/* Line 2: Component export */}
        <rect x="166" y="90" width="60" height="4" rx="2" fill="#A855F7" />
        <rect x="232" y="90" width="85" height="4" rx="2" fill="#F59E0B" />
        {/* Line 3: Indented Return block */}
        <rect x="180" y="102" width="35" height="4" rx="2" fill="#3B82F6" />
        <rect x="221" y="102" width="90" height="4" rx="2" fill="#10B981" />
        {/* Line 4: Deep Indent state */}
        <rect x="194" y="114" width="75" height="4" rx="2" fill="#FF6B00" />
        <rect x="275" y="114" width="55" height="4" rx="2" fill="#38BDF8" />
        {/* Line 5: Render JSX */}
        <rect x="194" y="126" width="110" height="4" rx="2" fill="#A855F7" />
        {/* Line 6: Closing tags */}
        <rect x="180" y="138" width="40" height="4" rx="2" fill="#F59E0B" />
        <rect x="166" y="150" width="25" height="4" rx="2" fill="#F43F5E" />

        {/* Live Terminal Panel at Bottom Right of Screen */}
        <rect x="250" y="142" width="124" height="48" rx="6" fill="#090D16" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.5" />
        <text x="258" y="155" fill="#34D399" fontSize="8" fontWeight="700" fontFamily="monospace">$ npm run build</text>
        <text x="258" y="167" fill="#94A3B8" fontSize="8" fontWeight="600" fontFamily="monospace">✓ Compiled (0 errors)</text>
        <rect x="258" y="174" width="6" height="8" fill="#FF6B00" className="animate-pulse" />
      </g>

      {/* COMPANION DEVELOPER LAPTOP (Left Side) */}
      <g filter="url(#deskDropShadow)">
        {/* Laptop Display */}
        <rect x="55" y="135" width="90" height="90" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <rect x="60" y="140" width="80" height="80" rx="4" fill="url(#laptopGrad)" />
        {/* Code Graphics on Laptop */}
        <line x1="68" y1="152" x2="115" y2="152" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="164" x2="125" y2="164" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="174" x2="110" y2="174" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="184" x2="130" y2="184" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="194" x2="100" y2="194" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* Laptop Base Keyboard Surface */}
        <path d="M 40 226 L 160 226 L 170 240 L 30 240 Z" fill="#64748B" />
        <rect x="65" y="228" width="70" height="8" rx="2" fill="#334155" />
      </g>

      {/* DEVELOPER MOUSE & MOUSEPAD (Right Side) */}
      <rect x="360" y="234" width="45" height="12" rx="6" fill="#94A3B8" opacity="0.6" />
      <rect x="375" y="226" width="16" height="18" rx="7" fill="#1E293B" />
      <line x1="383" y1="228" x2="383" y2="233" stroke="#FF6B00" strokeWidth="1.5" />

      {/* FLOATING ENGINEERING ACCENT BADGES */}
      <g filter="url(#glowGlow)">
        {/* Gear / Architecture Icon Top Right */}
        <circle cx="435" cy="75" r="22" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="2" />
        <path d="M 435 63 L 435 87 M 423 75 L 447 75 M 426 66 L 444 84 M 426 84 L 444 66" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
        
        {/* Code Check Badge Top Left */}
        <circle cx="65" cy="75" r="20" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
        <polyline points="57,75 63,81 74,68" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
};
