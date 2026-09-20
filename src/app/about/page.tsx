import { Metadata } from "next";
import { Button } from "@/components/common/Button";
import { BookOpen, Code, Compass, ShieldCheck, Target, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | LearnBuild Hub",
  description:
    "LearnBuild Hub brings together learning opportunities and digital technology solutions under one brand.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen py-8 md:py-16">
      {/* Hero Banner */}
      <section className="relative pb-12 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 mb-6 shadow-sm">
            Platform Vision
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            About LearnBuild Hub
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            "LearnBuild Hub brings together learning opportunities and digital technology solutions under one brand."
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* LEARN Pillar Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-blue-200/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-600/30">
                  <BookOpen className="w-7 h-7" />
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  LEARN
                </h2>

                <p className="text-slate-700 text-base font-semibold leading-relaxed mb-4">
                  Training, internships and practical skill development through our external learning ecosystem partner, Corizo.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Students and professionals can access training tracks and gain industry exposure to prepare for real-world projects.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <Button
                  href="https://corizo.in"
                  isExternal={true}
                  variant="learn"
                  size="md"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Explore Corizo Platform
                </Button>
              </div>
            </div>

            {/* BUILD Pillar Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-orange-200/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center mb-6 shadow-md shadow-brand-orange/30">
                  <Code className="w-7 h-7" />
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  BUILD
                </h2>

                <p className="text-slate-700 text-base font-semibold leading-relaxed mb-4">
                  Technology solutions including websites, software, applications and AI/automation built to modern standards.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  We work closely with clients to engineer tailored web applications, native & cross-platform mobile apps, and automated workflows.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <Button
                  href="/build"
                  variant="build"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Build Services
                </Button>
              </div>
            </div>
          </div>

          {/* Mission & Principles */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md">
            <h3 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Our Core Mission
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <Target className="w-8 h-8 text-brand-orange mb-3" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Clarity</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Providing clear pathways between learning practical skills and building technology products.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Quality</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Delivering modern, scalable, and well-engineered solutions without fluff or unsupported claims.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <Compass className="w-8 h-8 text-amber-500 mb-3" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Growth</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Empowering learners to grow into builders, and enabling businesses to expand through technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
