"use client";

import React, { useState } from "react";
import { CoursePlatformHero } from "@/components/home/CoursePlatformHero";
import { RichDualModules } from "@/components/home/RichDualModules";
import { TrackShowcase } from "@/components/home/TrackShowcase";
import { StatsCounter } from "@/components/home/StatsCounter";
import { TickerBar } from "@/components/common/TickerBar";
import { TrustedGrid } from "@/components/home/TrustedGrid";
import { FAQSection } from "@/components/home/FAQSection";
import { IntroSplash } from "@/components/common/IntroSplash";

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* Intro Animation */}
      <IntroSplash onComplete={() => setIntroFinished(true)} />

      {/* Course & Tech Platform Assembly */}
      <div
        className={`transition-all duration-700 ${
          introFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <CoursePlatformHero />
        <RichDualModules />
        <TrackShowcase />
        <StatsCounter />
        <TickerBar />
        <TrustedGrid />
        <FAQSection />
      </div>
    </div>
  );
}
