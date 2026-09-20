import React from "react";
import { Button } from "@/components/common/Button";
import { ArrowRight, MessageSquareCode } from "lucide-react";

export const BuildCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center mx-auto mb-6">
              <MessageSquareCode className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Have an idea to build?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Let's turn your idea into a digital solution.
            </p>

            <div className="flex justify-center">
              <Button
                href="/contact"
                variant="build"
                size="lg"
                className="shadow-vibe-orange"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
