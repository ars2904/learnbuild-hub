import { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Calendar, Clock, ArrowRight, Tag, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs & Insights | LearnBuild Hub",
  description:
    "Read technology, software development, and skill development articles from LearnBuild Hub.",
};

interface SampleBlog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageBg: string;
}

const sampleBlogs: SampleBlog[] = [
  {
    id: "1",
    title: "Building Scalable Modern Web Applications in 2026",
    excerpt:
      "A clean architectural guide on structuring React and Next.js applications for future growth and API integration.",
    category: "Software Development",
    date: "Sep 15, 2026",
    readTime: "5 min read",
    imageBg: "from-blue-500 to-indigo-600",
  },
  {
    id: "2",
    title: "Transitioning From Skill Learning to Production Building",
    excerpt:
      "How practical project workflows help learners bridge the gap between theoretical knowledge and real client code.",
    category: "Career & Learning",
    date: "Sep 10, 2026",
    readTime: "4 min read",
    imageBg: "from-brand-orange to-amber-500",
  },
  {
    id: "3",
    title: "Practical AI Integrations for Digital Solutions",
    excerpt:
      "Integrating intelligent automation and LLM workflows to streamline business operations effectively.",
    category: "AI & Automation",
    date: "Sep 05, 2026",
    readTime: "6 min read",
    imageBg: "from-emerald-500 to-teal-600",
  },
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Knowledge & Insights"
          title="LearnBuild Hub Blogs"
          subtitle="Articles, technical guides, and updates on software development, AI, and skill acquisition."
        />

        {/* CMS Connection Notice */}
        <div className="max-w-3xl mx-auto mb-12 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>V1 Blog Structure Ready for CMS / Backend Integration</span>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-slate-300 overflow-hidden flex flex-col justify-between transition-all duration-300 vibe-card-hover shadow-sm"
            >
              <div>
                {/* Visual Header / Thumbnail Box */}
                <div
                  className={`h-48 w-full bg-gradient-to-br ${blog.imageBg} p-6 flex flex-col justify-between text-white relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/90 text-slate-900 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      <Tag className="w-3 h-3 text-brand-orange" />
                      {blog.category}
                    </span>
                  </div>

                  <div className="text-white/90 text-xs flex items-center gap-4 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-brand-orange transition-colors leading-snug">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange group-hover:text-orange-700 transition-colors cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
