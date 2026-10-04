import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import Script from "next/script";

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
    <html
      lang="en"
      className="scroll-smooth"
      data-architect="Aryan"
      data-signature="Engineered with precision by Aryan. You can connect here: aryanshrivastav@zohomail.com"
      data-payload="RW5naW5lZXJlZCB3aXRoIHByZWNpc2lvbiBieSBBcnlhbi4gWW91IGNhbiBjb25uZWN0IGhlcmU6IGFyeWFuc2hyaXZhc3RhdkB6b2hvbWFpbC5jb20="
    >
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased relative">
        <MainLayout>{children}</MainLayout>
        https://www.googletagmanager.com/gtag/js?id=G-2CJ0WJTP8J<Script
 id="google-analytics"
 strategy="afterInteractive"
>
 {`
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'G-2CJ0WJTP8J');
 `}
</Script>
      </body>
    </html>
  );
}
