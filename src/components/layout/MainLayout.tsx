"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
// SIRF in standalone routes aur vendors par Header/Footer HIDE hoga
 // Baaki learnbuildhub.com/learn, /blogs, /contact, /xyz kitne bhi naye pages banao, sab par dikhega!
 const isStandaloneRoute =
   pathname?.startsWith('/admin') ||
   pathname?.startsWith('/dashboard') ||
   pathname?.startsWith('/employee') ||
   pathname?.startsWith('/QRdemo') ||
   pathname?.startsWith('/clinic-demo') ||
   pathname?.startsWith('/login') ||
   pathname?.startsWith('/signup') ||
   pathname?.includes('/admin');
 // Vendor routes check (Example: /sharma-ji, /yadav-chai)
 // Yeh tabhi true hoga jab path sirf single slash ho (jaise /slug) aur standard route na ho
 const isVendorSlugRoute =
   !isStandaloneRoute &&
   pathname !== '/' &&
   !pathname?.startsWith('/learn') &&
   !pathname?.startsWith('/build') &&
   !pathname?.startsWith('/blog') &&
   !pathname?.startsWith('/blogs') &&
   !pathname?.startsWith('/contact') &&
   !pathname?.startsWith('/about') &&
   pathname?.split('/').filter(Boolean).length === 1 &&
   // Check if path is actually a vendor (slug without fixed top-level folders)
   !['learn', 'build', 'blogs', 'blog', 'contact', 'about', 'services', 'pricing'].includes(
     pathname?.split('/').filter(Boolean)[0] || ''
   );
 const hideHeaderFooter = isStandaloneRoute || isVendorSlugRoute;
 return (
<>
     {!hideHeaderFooter && <Navbar />}
<main>{children}</main>
     {!hideHeaderFooter && <Footer />}
</>
 );
}
 

  if (isStandaloneRoute) {
    return (
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
