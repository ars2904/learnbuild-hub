import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export default function SchoolDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Demo Top Alert Bar (Client ko batane ke liye ki ye live demo hai) */}
      <div className="bg-blue-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span>🎓 LearnBuild Hub School Web Solution - Live Demo Preview</span>
        <Link 
          href="/" 
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-0.5 rounded-full text-xs transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Hub
        </Link>
      </div>

      {/* School Specific Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/school-demo" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-none">Sunrise Public School</span>
              <span className="text-xs text-slate-500 font-medium">Affiliated to CBSE, New Delhi</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/school-demo" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/school-demo/admissions" className="hover:text-blue-600 transition-colors">Admissions</Link>
            <Link href="/school-demo/gallery" className="hover:text-blue-600 transition-colors">Gallery</Link>
            <Link href="/school-demo/portal" className="bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-600 px-4 py-2 rounded-lg border border-slate-200 transition-all">
              Parent Portal
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* School Specific Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Sunrise Public School</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering students with knowledge, character, and leadership skills for a brighter tomorrow. Lucknow & Varanasi Region.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/school-demo/admissions" className="hover:text-white transition-colors">Admission Guidelines</Link></li>
              <li><Link href="/school-demo/portal" className="hover:text-white transition-colors">Student & Parent Login</Link></li>
              <li><Link href="/school-demo/gallery" className="hover:text-white transition-colors">Campus Photo Gallery</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Powered By</p>
            <p className="text-xs text-slate-400 mb-2">
              Designed & Developed as a live digital showcase by <span className="text-blue-400 font-medium">LearnBuild Hub</span>.
            </p>
            <Link href="/" className="inline-block text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-600/30 transition-colors font-medium">
              Get Your School Website →
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 Sunrise Public School. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
