import React from "react";
import { Button } from "@/components/common/Button";
import { ArrowRight, Rocket } from "lucide-react";

export const BuildCTABlueprint: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 border border-blue-200 text-slate-900 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Have an idea to build?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium max-w-md">
              Let's turn your idea into a digital solution.
            </p>
          </div>

          <div className="flex items-center gap-6 z-10">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="rounded-full py-4 px-8 shadow-lg shadow-brand-blue/30"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start a Project
            </Button>

            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-brand-blue text-white items-center justify-center shadow-lg shadow-brand-blue/30 flex-shrink-0">
              <Rocket className="w-8 h-8" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
