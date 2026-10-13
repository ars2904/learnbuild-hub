"use client";

import React from "react";

import { usePathname } from "next/navigation";

import {Navbar} from "./Navbar";

import Footer from "./Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  // Standalone routes jahan Navbar aur Footer nahi chahiye

  const isStandaloneRoute =

    pathname?.startsWith('/admin') ||

    pathname?.startsWith('/dashboard') ||

    pathname?.startsWith('/employee') ||

    pathname?.startsWith('/QRdemo') ||

    pathname?.startsWith('/clinic-demo') ||

    pathname?.startsWith('/login') ||

    pathname?.startsWith('/signup') ||

    pathname?.includes('/admin');

  // Vendor routes check (jaise /sharma-ji, /yadav-chai)

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

    !['learn', 'build', 'blogs', 'blog', 'contact', 'about', 'services', 'pricing'].includes(

      pathname?.split('/').filter(Boolean)[0] || ''

    );

  const hideHeaderFooter = isStandaloneRoute || isVendorSlugRoute;

  // Agar standalone route hai (jaise admin/dashboard) toh sirf children return karo

  if (isStandaloneRoute) {

    return (
<main className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between">

        {children}
</main>

    );

  }

  // Normal website aur vendor pages ke liye layout

  return (
<>

      {!hideHeaderFooter && <Navbar />}
<main className="flex-1 w-full pt-20">{children}</main>

      {!hideHeaderFooter && <Footer />}
</>

  );

}
 
