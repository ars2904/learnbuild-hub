import { Metadata } from "next";
import { BuildHeroBlueprint } from "@/components/build/BuildHeroBlueprint";
import { TickerBar } from "@/components/common/TickerBar";
import { ServicesGridBlueprint } from "@/components/build/ServicesGridBlueprint";
import { ProcessStepsBlueprint } from "@/components/build/ProcessStepsBlueprint";
import { BuildCTABlueprint } from "@/components/build/BuildCTABlueprint";

export const metadata: Metadata = {
  title: "Build Digital Solutions | LearnBuild Hub",
  description:
    "Turn your ideas into modern websites, applications, software tools, and AI automation with LearnBuild Hub.",
};

const buildTickerItems = [
  "WEB DEVELOPMENT",
  "SOFTWARE",
  "WEB APPS",
  "MOBILE APPS",
  "AI & AUTOMATION",
];

export default function BuildPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BuildHeroBlueprint />
      <TickerBar items={buildTickerItems} />
      <ServicesGridBlueprint />
      <ProcessStepsBlueprint />
      <BuildCTABlueprint />
    </div>
  );
}
