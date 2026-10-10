"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Standalone app routes that manage their own full-screen layouts
  const isStandaloneRoute =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/employee") ||
    pathname?.startsWith("/QRdemo") ||
    pathname?.startsWith("/clinic-demo") ||
    pathname === "/login" ||
    pathname === "/signup";

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
