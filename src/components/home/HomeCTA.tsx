import React from "react";
import { Button } from "@/components/common/Button";
import { ExternalLink, ArrowRight } from "lucide-react";

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Ready to Learn or Build?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Start your journey today by developing in-demand practical skills or creating custom digital solutions for your business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Button
                href="/learn"
                variant="learn"
                size="lg"
                className="w-full sm:w-auto shadow-vibe-blue"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Learn
              </Button>

              <Button
                href="/build"
                variant="build"
                size="lg"
                className="w-full sm:w-auto shadow-vibe-orange"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Build
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
