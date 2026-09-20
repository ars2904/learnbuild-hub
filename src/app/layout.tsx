import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LearnBuild Hub | Learn. Build.",
  description:
    "LearnBuild Hub connects practical skill learning opportunities with custom website, software, application, and AI/automation solutions.",
  keywords: [
    "LearnBuild Hub",
    "Learn Build",
    "Training Internships",
    "Website Development",
    "Software Development",
    "Mobile Applications",
    "AI Automation",
  ],
  authors: [{ name: "LearnBuild Hub Team" }],
  openGraph: {
    title: "LearnBuild Hub | Learn. Build.",
    description: "Learn Skills. Build Solutions.",
    url: "https://learnbuildhub.com",
    siteName: "LearnBuild Hub",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#030712] text-slate-100 antialiased relative">
        <Navbar />
        <main className="flex-1 w-full pt-20 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
