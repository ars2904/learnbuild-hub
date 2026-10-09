import React from 'react';
import NoticeTicker from '@/components/school-demo/NoticeTicker';
import HeroSection from '@/components/school-demo/HeroSection';

export default function SchoolDemoPage() {
  return (
    <div>
      {/* Notice Board Ticker */}
      <NoticeTicker />

      {/* Hero Banner */}
      <HeroSection />

      {/* Aap yahan apne baaki sections (About, Facilities, Enquiry Form) add kar sakte hain */}
    </div>
  );
}
