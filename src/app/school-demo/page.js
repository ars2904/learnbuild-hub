"use client";

import React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Code2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Users, 
  GraduationCap, 
  Rocket, 
  Award,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Terminal,
  Building2,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
import { StudentWorkstationIllustration } from "@/components/common/StudentWorkstationIllustration";
import { DeveloperWorkstationIllustration } from "@/components/common/DeveloperWorkstationIllustration";

export default function SchoolDemoPage() {
 return (
<div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'sans-serif' }}>
     {/* Header */}
<header style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
<div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1d4ed8', margin: 0 }}>St. Xavier's Model School</h1>
<a href="#contact" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
           Admissions Open 2026
</a>
</div>
</header>
     {/* Hero Section */}
<section style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '60px 20px', textAlign: 'center' }}>
<div style={{ maxWidth: '700px', margin: '0 auto' }}>
<span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
           Affiliated to CBSE | Session 2026-27
</span>
<h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '16px', marginBottom: '16px', lineHeight: '1.2' }}>
           Shaping Bright Futures with Excellence & Values
</h2>
<p style={{ fontSize: '16px', color: '#93c5fd', marginBottom: '30px' }}>
           Providing world-class education, modern smart classes, sports, and holistic development for your child.
</p>
<a href="#contact" style={{ backgroundColor: '#eab308', color: '#111827', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
           Apply For Admission Now
</a>
</div>
</section>
     {/* Stats Section */}
<section style={{ padding: '40px 20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
<div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
<div>
<h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>25+</h3>
<p style={{ color: '#4b5563', fontSize: '14px', marginTop: '4px' }}>Years of Legacy</p>
</div>
<div>
<h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>100%</h3>
<p style={{ color: '#4b5563', fontSize: '14px', marginTop: '4px' }}>Board Results</p>
</div>
<div>
<h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>30+</h3>
<p style={{ color: '#4b5563', fontSize: '14px', marginTop: '4px' }}>Expert Faculty</p>
</div>
<div>
<h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>15+</h3>
<p style={{ color: '#4b5563', fontSize: '14px', marginTop: '4px' }}>Activities</p>
</div>
</div>
</section>
     {/* Admission Form Section */}
<section id="contact" style={{ padding: '60px 20px', backgroundColor: '#f3f4f6' }}>
<div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
<h3 style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#1e3a8a' }}>Admission Enquiry 2026</h3>
<p style={{ color: '#6b7280', textAlign: 'center', fontSize: '13px', marginBottom: '24px' }}>Fill the form and our counselor will get back to you.</p>
<form onSubmit={(e) => { e.preventDefault(); alert('Enquiry submitted successfully!'); }}>
<div style={{ marginBottom: '16px' }}>
<label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Parent's Name</label>
<input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} placeholder="Enter your name" />
</div>
<div style={{ marginBottom: '16px' }}>
<label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Phone Number</label>
<input type="tel" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} placeholder="Enter mobile number" />
</div>
<div style={{ marginBottom: '20px' }}>
<label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Class</label>
<select style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
<option>Nursery / KG</option>
<option>Class 1st to 5th</option>
<option>Class 6th to 8th</option>
<option>Class 9th to 12th</option>
</select>
</div>
<button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>
             Submit Enquiry
</button>
</form>
</div>
</section>
     {/* Footer */}
<footer style={{ backgroundColor: '#111827', color: '#ffffff', padding: '24px 20px', textAlign: 'center', fontSize: '12px' }}>
<p style={{ margin: 0 }}>&copy; 2026 St. Xavier's Model School. Powered by <span style={{ color: '#60a5fa', fontWeight: '600' }}>LearnBuildHub</span></p>
</footer>
</div>
 );
}
