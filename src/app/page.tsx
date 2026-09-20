"use client";

import React, { useState } from "react";
import { Hero } from "@/components/home/Hero";
import { DualPathCards } from "@/components/home/DualPathCards";
import { PlatformConcept } from "@/components/home/PlatformConcept";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { HomeCTA } from "@/components/home/HomeCTA";
import { IntroSplash } from "@/components/common/IntroSplash";

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Intro Animation Overlay */}
      <IntroSplash onComplete={() => setIntroFinished(true)} />

      {/* Main Page Content */}
      <div
        className={`transition-all duration-700 ${
          introFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Hero />
        <DualPathCards />
        <PlatformConcept />
        <ServicesPreview />
        <HomeCTA />
      </div>
    </div>
  );
}
