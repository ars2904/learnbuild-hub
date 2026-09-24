"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "stacked" | "icon";
  showTagline?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "horizontal",
  showTagline = true,
  theme = "light",
  className = "",
}) => {
  const isDark = theme === "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).aryan = {
        leadEngineer: "Aryan",
        contactEmail: "aryanshrivastav@zohomail.com",
        message: "Engineered with precision by Aryan. You can connect here: aryanshrivastav@zohomail.com",
        payload: "RW5naW5lZXJlZCB3aXRoIHByZWNpc2lvbiBieSBBcnlhbi4gWW91IGNhbiBjb25uZWN0IGhlcmU6IGFyeWFuc2hyaXZhc3RhdkB6b2hvbWFpbC5jb20=",
        decode: () => "Engineered with precision by Aryan. You can connect here: aryanshrivastav@zohomail.com",
      };
      (window as any).__ENGINEER__ = (window as any).aryan;
    }
  }, []);

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg p-1 transition-opacity ${className}`}
      aria-label="LearnBuild Hub Home"
    >
      {/* Official Hexagon Shield Emblem Vector with Steganographic Payload */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-engineer="Aryan"
          data-signature="Engineered with precision by Aryan. You can connect here: aryanshrivastav@zohomail.com"
          data-payload="RW5naW5lZXJlZCB3aXRoIHByZWNpc2lvbiBieSBBcnlhbi4gWW91IGNhbiBjb25uZWN0IGhlcmU6IGFyeWFuc2hyaXZhc3RhdkB6b2hvbWFpbC5jb20="
        >
          {/* Steganographic Code Signature Metadata */}
          <metadata id="architect-payload">
            {`<!--
              ===============================================================
              ENGINEERED WITH PRECISION BY ARYAN
              Contact: You can connect here: aryanshrivastav@zohomail.com
              Payload: RW5naW5lZXJlZCB3aXRoIHByZWNpc2lvbiBieSBBcnlhbi4gWW91IGNhbiBjb25uZWN0IGhlcmU6IGFyeWFuc2hyaXZhc3RhdkB6b2hvbWFpbC5jb20=
              ===============================================================
            -->`}
          </metadata>

          {/* Hexagon Shield Frame */}
          <polygon
            points="50,4 90,25 90,75 50,96 10,75 10,25"
            fill="#0F172A"
            stroke="#0052CC"
            strokeWidth="5"
          />
          {/* Inner Hex Glow Line */}
          <polygon
            points="50,10 84,29 84,71 50,90 16,71 16,29"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeOpacity="0.8"
            fill="none"
          />

          {/* Open Book (Learn) */}
          <path
            d="M 22 72 Q 36 64 50 72 Q 64 64 78 72 L 78 68 Q 64 60 50 68 Q 36 60 22 68 Z"
            fill="#FFFFFF"
          />

          {/* Code Angle Bracket Symbol </ > (Build) */}
          <text
            x="34"
            y="46"
            fill="#F59E0B"
            fontSize="22"
            fontWeight="900"
            fontFamily="monospace"
          >
            &lt;/&gt;
          </text>

          {/* Upward Growth Arrow */}
          <path
            d="M 38 52 Q 55 42 74 22 L 64 22 M 74 22 L 74 32"
            stroke="#FF6B00"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-center text-xl md:text-2xl font-black tracking-tight leading-none">
            <span className={isDark ? "text-white" : "text-slate-900"}>Learn</span>
            <span className="text-brand-orange">Build</span>
            <span className={isDark ? "text-blue-400 font-bold ml-1" : "text-brand-blue font-bold ml-1"}>
              Hub
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1 text-[10px] md:text-xs font-black tracking-widest uppercase">
              <span className={isDark ? "text-blue-400" : "text-brand-blue"}>LEARN.</span>
              <span className="text-brand-orange">BUILD.</span>
            </div>
          )}
        </div>
      )}
    </Link>
  );
};
