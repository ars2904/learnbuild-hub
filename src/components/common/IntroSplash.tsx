"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Code2, Sparkles } from "lucide-react";

interface IntroSplashProps {
  onComplete?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<"converge" | "logo" | "text" | "exit">("converge");

  useEffect(() => {
    const hasSeen = typeof window !== "undefined" && sessionStorage.getItem("hasSeenIntroSplash") === "true";
    if (hasSeen) {
      if (onComplete) onComplete();
      return;
    }

    setIsVisible(true);

    // Timeline sequence
    const t1 = setTimeout(() => setStep("logo"), 600);
    const t2 = setTimeout(() => setStep("text"), 1100);
    const t3 = setTimeout(() => setStep("exit"), 1800);
    const t4 = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem("hasSeenIntroSplash", "true");
      } catch (e) {
        // Ignore storage errors in restricted iframe/private mode
      }
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem("hasSeenIntroSplash", "true");
    } catch (e) {}
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] overflow-hidden select-none pointer-events-auto"
        >
          {/* Cyber Grid Background Pattern */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

          {/* Glowing Center Radial Light */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 via-brand-orange/20 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-lg px-4 text-center">
            
            {/* ================= STEP 1: CONVERGENCE BEAMS ================= */}
            <div className="relative w-72 h-24 flex items-center justify-center mb-6">
              
              {/* Left Beam: LEARN (Blue) */}
              <motion.div
                initial={{ x: -160, opacity: 0, scale: 0.8 }}
                animate={
                  step === "converge"
                    ? { x: -30, opacity: 1, scale: 1 }
                    : { x: 0, opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-bold shadow-glow-blue"
              >
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <span className="text-sm tracking-wider uppercase">LEARN</span>
              </motion.div>

              {/* Right Beam: BUILD (Orange) */}
              <motion.div
                initial={{ x: 160, opacity: 0, scale: 0.8 }}
                animate={
                  step === "converge"
                    ? { x: 30, opacity: 1, scale: 1 }
                    : { x: 0, opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-bold shadow-glow-orange"
              >
                <span className="text-sm tracking-wider uppercase">BUILD</span>
                <Code2 className="w-5 h-5 text-brand-orange" />
              </motion.div>

              {/* ================= STEP 2: CONVERGED LOGO EMBLEM ================= */}
              {(step === "logo" || step === "text" || step === "exit") && (
                <motion.div
                  initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  className="relative w-20 h-20 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-2xl"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Hexagon Frame */}
                    <polygon
                      points="50,4 90,25 90,75 50,96 10,75 10,25"
                      fill="#0A192F"
                      stroke="#0052CC"
                      strokeWidth="5"
                    />
                    <polygon
                      points="50,10 84,29 84,71 50,90 16,71 16,29"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeOpacity="0.8"
                      fill="none"
                    />

                    {/* Open Book */}
                    <path
                      d="M 22 72 Q 36 64 50 72 Q 64 64 78 72 L 78 68 Q 64 60 50 68 Q 36 60 22 68 Z"
                      fill="#FFFFFF"
                    />

                    {/* Code Symbol */}
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

                    {/* Growth Arrow */}
                    <path
                      d="M 38 52 Q 55 42 74 22 L 64 22 M 74 22 L 74 32"
                      stroke="#FF6B00"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              )}
            </div>

            {/* ================= STEP 3: BRAND TYPOGRAPHY REVEAL ================= */}
            {(step === "text" || step === "exit") && (
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tight">
                  <span className="text-white">Learn</span>
                  <span className="text-brand-orange">Build</span>
                  <span className="text-blue-400 ml-1">Hub</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span className="text-blue-400">Learn.</span>
                  <span className="text-brand-orange">Build.</span>
                </div>
              </motion.div>
            )}

            {/* Skip Button (Accessibility & Speed) */}
            <button
              onClick={handleSkip}
              className="absolute bottom-6 right-6 text-xs text-slate-400 hover:text-white underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
