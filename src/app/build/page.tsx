import { Metadata } from "next";
import { BuildHero } from "@/components/build/BuildHero";
import { ServicesGrid } from "@/components/build/ServicesGrid";
import { ProcessTimeline } from "@/components/build/ProcessTimeline";
import { BuildCTA } from "@/components/build/BuildCTA";

export const metadata: Metadata = {
  title: "Build Digital Solutions | LearnBuild Hub",
  description:
    "Turn your ideas into modern websites, applications, software tools, and AI automation with LearnBuild Hub.",
};

export default function BuildPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BuildHero />
      <ServicesGrid />
      <ProcessTimeline />
      <BuildCTA />
    </div>
  );
}
