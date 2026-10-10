'use client';
import React from 'react';
import Link from 'next/link';
interface DemoCard {
 id: string;
 title: string;
 category: string;
 description: string;
 icon: string;
 link: string;
 badge?: string;
 gradient: string;
}
const demos: DemoCard[] = [
 {
   id: 'whatsapp-qr',
   title: 'WhatsApp QR Ordering Demo',
   category: 'Food Stalls & Restaurants',
   description: 'Instant digital ordering system with automated WhatsApp checkout for street vendors and cafes.',
   icon: '📱',
   link: '/QRdemo',
   badge: 'Popular',
   gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
 },
 {
   id: 'school-website',
   title: 'School Website Demo',
   category: 'Education Portal',
   description: 'Modern, highly responsive landing page tailored for modern schools and educational institutes.',
   icon: '🏫',
   link: '/school-demo',
   badge: 'Live',
   gradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30'
 },
 {
   id: 'school-software',
   title: 'School Management Software',
   category: 'ERP Solution',
   description: 'Complete ERP portal for student attendance, fee management, report cards, and notice boards.',
   icon: '🎓',
   link: '#',
   badge: 'Coming Soon',
   gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
 },
 {
   id: 'crm-software',
   title: 'CRM Software',
   category: 'Business Operations',
   description: 'Manage leads, track sales pipelines, and automate customer follow-ups with ease.',
   icon: '📊',
   link: '#',
   badge: 'Coming Soon',
   gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30'
 },
 {
   id: 'hr-payroll',
   title: 'HR & Payroll System',
   category: 'Corporate Enterprise',
   description: 'Automated employee attendance, leave management, and monthly salary slip generator.',
   icon: '💼',
   link: '#',
   badge: 'Coming Soon',
   gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30'
 },
 {
   id: 'clinic-appointment',
   title: 'Clinic Appointment System',
   category: 'Healthcare',
   description: 'Mobile-first doctor appointment booking flow with instant WhatsApp confirmation.',
   icon: '🏥',
   link: '/clinic-demo',
   badge: 'Live',
   gradient: 'from-rose-500/20 to-red-500/10 border-rose-500/30'
 }
];
export default function DemoGallery() {
 return (
<div className="min-h-screen bg-[#070b19] text-white font-sans selection:bg-cyan-500 selection:text-white px-6 py-12 lg:px-20">
     {/* Background Decorative Glows */}
<div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
     {/* Header Section */}
<header className="max-w-6xl mx-auto text-center space-y-4 mb-16 relative z-10">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
         ⚡ LearnBuild Hub Demo Center
</div>
<h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
         Explore Our Live <br />
<span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
           Software & Web Products
</span>
</h1>
<p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
         Select any interactive demonstration below to test the features and experience how our digital solutions work for your business.
</p>
</header>
     {/* Grid Cards Section */}
<main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
       {demos.map((item) => (
<div
           key={item.id}
           className={`group rounded-3xl border bg-gradient-to-b ${item.gradient} p-7 flex flex-col justify-between backdrop-blur-xl hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/40`}
>
<div className="space-y-4">
             {/* Header inside Card */}
<div className="flex items-center justify-between">
<span className="text-4xl">{item.icon}</span>
               {item.badge && (
<span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border ${
                   item.badge === 'Live' || item.badge === 'Popular'
                     ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                     : 'bg-white/5 text-slate-400 border-white/10'
                 }`}>
                   {item.badge}
</span>
               )}
</div>
<div>
<p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                 {item.category}
</p>
<h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                 {item.title}
</h3>
</div>
<p className="text-slate-300 text-xs leading-relaxed">
               {item.description}
</p>
</div>
           {/* Action Button */}
<div className="pt-6 mt-4 border-t border-white/10">
             {item.link !== '#' ? (
<Link
                 href={item.link}
                 className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
>
<span>Launch Live Demo</span>
<span>→</span>
</Link>
             ) : (
<button
                 disabled
                 className="w-full py-3 rounded-2xl bg-white/5 text-slate-500 font-bold text-xs border border-white/10 cursor-not-allowed flex items-center justify-center gap-2"
>
<span>Preview Coming Soon</span>
</button>
             )}
</div>
</div>
       ))}
</main>
     {/* Footer */}
<footer className="mt-20 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
<p>© LearnBuild Hub • Custom Web Apps & SaaS Solutions</p>
</footer>
</div>
 );
}
