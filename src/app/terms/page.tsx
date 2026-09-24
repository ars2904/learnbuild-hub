"use client";

import React from "react";
import Link from "next/link";
import { 
  FileText, 
  ShieldCheck, 
  Cookie, 
  ArrowLeft, 
  Mail, 
  Phone, 
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-20 bg-[#090D16] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-600/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[300px] bg-orange-500/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-3xl">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-orange uppercase bg-orange-500/10 border border-orange-500/20 mb-4 inline-flex items-center gap-2 shadow-sm">
              <FileText className="w-4 h-4 text-brand-orange" />
              <span>LEGAL & GOVERNANCE</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Terms & Conditions
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6">
              Welcome to LearnBuild Hub. These Terms & Conditions (“Terms”) govern your use of the LearnBuild Hub website and your interaction with our technology, digital solutions, training, career-support and related services.
            </p>

            <div className="text-xs text-slate-400 font-semibold">
              Last Updated: September 23, 2026
            </div>
          </div>

          {/* Legal Navigation Tabs */}
          <div className="flex items-center gap-3 mt-10 border-t border-slate-800/80 pt-6 flex-wrap">
            <Link
              href="/privacy"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Link>

            <Link
              href="/terms"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Terms & Conditions</span>
            </Link>

            <Link
              href="/cookies"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <Cookie className="w-4 h-4" />
              <span>Cookie Policy</span>
            </Link>

            <Link
              href="/refund"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refund Policy</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. TERMS CONTENT ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-slate max-w-none text-slate-700 font-normal leading-relaxed text-sm sm:text-base space-y-10">
            
            <p className="text-slate-600 leading-relaxed font-medium">
              By accessing or using our website, you agree to comply with these Terms. If you do not agree with these Terms, please discontinue use of the website.
            </p>

            {/* Section 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">1</span>
                <span>About LearnBuild Hub</span>
              </h3>
              <p className="mb-3">
                LearnBuild Hub is a technology and digital solutions brand offering services and programs that may include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Website Development</li>
                <li>Web Application Development</li>
                <li>Software Development</li>
                <li>Custom Business Software</li>
                <li>Digital Solutions</li>
                <li>AI and Technology Solutions</li>
                <li>Digital Marketing Services</li>
                <li>Industry-Oriented Training</li>
                <li>Technical Skill Development</li>
                <li>Project-Based Learning</li>
                <li>Career and Interview Support</li>
              </ul>
              <p className="mt-4 text-xs font-medium text-slate-500">
                Specific services offered may vary depending on availability and the requirements of the client or participant.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">2</span>
                <span>Use of Our Website</span>
              </h3>
              <p className="mb-3">You agree to use our website only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Use the website for fraudulent or unlawful activities</li>
                <li>Attempt to gain unauthorised access to the website or its systems</li>
                <li>Introduce malicious software, viruses or harmful code</li>
                <li>Attempt to disrupt website functionality</li>
                <li>Misuse enquiry or contact forms</li>
                <li>Submit false or misleading information</li>
                <li>Copy or reproduce website content without permission</li>
                <li>Use our website to infringe the rights of another person or organisation</li>
              </ul>
              <p className="mt-3 text-xs font-semibold text-slate-600">
                We reserve the right to restrict access where we reasonably believe the website is being misused.
              </p>
            </div>

            {/* Section 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">3</span>
                <span>Services and Enquiries</span>
              </h3>
              <p className="mb-3">
                Information displayed on our website is intended to provide general information about LearnBuild Hub and its offerings.
              </p>
              <p>
                Submitting an enquiry does not automatically create a client relationship, service agreement or contractual obligation. Specific project requirements, scope, timelines, pricing, deliverables and responsibilities will be agreed separately where applicable.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">4</span>
                <span>Software and Development Services</span>
              </h3>
              <p className="mb-3">
                For software development or digital projects, the final scope of work may be defined through a proposal, quotation, Statement of Work (SOW), agreement or other written communication.
              </p>
              <p className="mb-3 font-semibold text-slate-900">Project-related terms may include:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Project scope and features</li>
                <li>Development timeline & payment schedule</li>
                <li>Client responsibilities & revision limits</li>
                <li>Deployment requirements & maintenance/support terms</li>
                <li>Intellectual property rights</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Where a separate agreement exists, the terms of that agreement will govern the relevant project.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">5</span>
                <span>Training Programs</span>
              </h3>
              <p className="mb-3">
                LearnBuild Hub may offer technical, digital, career-oriented or industry-focused training programs. Training details such as course content, duration, batch schedule, delivery method, fees, certification, project work, mentorship, and placement support may vary by program.
              </p>
              <p>
                Specific terms applicable to a particular training program will be communicated before enrolment.
              </p>
            </div>

            {/* Section 6 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">6</span>
                <span>Certificates</span>
              </h3>
              <p>
                Where applicable, LearnBuild Hub may issue certificates of training or completion based on the requirements of the relevant program. A certificate issued by LearnBuild Hub represents completion or participation in the applicable LearnBuild Hub program and should not be interpreted as government accreditation, statutory approval, university affiliation or regulatory certification unless explicitly stated and legally authorised.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">7</span>
                <span>Intellectual Property</span>
              </h3>
              <p className="mb-3">
                Unless otherwise stated, the LearnBuild Hub website and its content, including logo, branding, text, graphics, images, website design, videos, original learning materials, software/product concepts, and other original content are owned by or licensed to LearnBuild Hub.
              </p>
              <p>
                You may not reproduce, modify, distribute, publish, sell or commercially exploit our proprietary content without prior written permission.
              </p>
            </div>

            {/* Section 8 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">8</span>
                <span>Client Materials</span>
              </h3>
              <p>
                If you provide LearnBuild Hub with content, documents, images, logos, data, trademarks or other materials for a project, you represent that you have the necessary rights or permissions to provide those materials. You remain responsible for the legality and ownership of materials supplied by you.
              </p>
            </div>

            {/* Section 9 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">9</span>
                <span>Third-Party Services</span>
              </h3>
              <p>
                Our website or services may integrate with or link to third-party services, platforms, APIs or software. Such third-party services may operate under their own terms and privacy policies. LearnBuild Hub is not responsible for the independent policies, availability or actions of third-party services.
              </p>
            </div>

            {/* Section 10 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">10</span>
                <span>Pricing and Payments</span>
              </h3>
              <p>
                Where a service or training program involves payment, applicable pricing, payment schedules and other commercial terms will be communicated separately through a quotation, invoice, proposal, agreement or relevant payment page. Unless specifically stated otherwise, prices and service details displayed for informational purposes do not constitute a binding offer.
              </p>
            </div>

            {/* Section 11 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">11</span>
                <span>Cancellation and Student Refund Policy</span>
              </h3>
              <p className="mb-3">
                LearnBuild Hub maintains a transparent, time-tiered refund policy for all training tracks and courses:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm font-semibold text-slate-800 mb-4">
                <li><strong className="text-emerald-700">Day 1 (First Day):</strong> 100% Full Refund if a student decides the course track isn't the right fit.</li>
                <li><strong className="text-amber-700">Days 2 to 7:</strong> 30% Partial Refund for requests submitted within the first week.</li>
                <li><strong className="text-rose-700">Day 8 Onwards:</strong> No refund (0%) as seat allocations, mentor assignments, and course infrastructure are locked.</li>
              </ul>
              <p className="text-xs text-slate-600 font-medium">
                For complete details on submitting a request, please visit our dedicated <Link href="/refund" className="text-brand-blue font-bold underline">Refund Policy Page</Link>.
              </p>
            </div>

            {/* Section 12 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">12</span>
                <span>Availability of Website</span>
              </h3>
              <p>
                We aim to keep our website available and functional, but we do not guarantee uninterrupted or error-free access at all times. The website may occasionally be unavailable because of maintenance, updates, hosting issues, technical problems, security incidents, or third-party service interruptions beyond our reasonable control.
              </p>
            </div>

            {/* Section 13 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">13</span>
                <span>Disclaimer</span>
              </h3>
              <p>
                Information provided on this website is for general informational purposes. While we make reasonable efforts to maintain accurate information, we do not guarantee that all website content will always be complete, current or error-free. Specific results from training, career support, digital marketing, software development or other services may vary depending on individual circumstances, project requirements, market conditions and other factors.
              </p>
            </div>

            {/* Section 14 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">14</span>
                <span>Limitation of Liability</span>
              </h3>
              <p>
                To the extent permitted by applicable law, LearnBuild Hub will not be responsible for indirect, incidental, special or consequential losses arising from the use of our website or information provided through it. Nothing in these Terms is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.
              </p>
            </div>

            {/* Section 15 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">15</span>
                <span>Changes to These Terms</span>
              </h3>
              <p>
                We may update these Terms from time to time. Updated Terms will be published on this page with the revised “Last Updated” date. Your continued use of the website after an update constitutes continued use subject to the updated Terms.
              </p>
            </div>

            {/* Section 16 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">16</span>
                <span>Governing Law</span>
              </h3>
              <p>
                These Terms shall be governed by and interpreted in accordance with the applicable laws of India. Any dispute will be subject to the jurisdiction of the courts having appropriate jurisdiction under applicable law.
              </p>
            </div>

            {/* Section 17: Contact Us */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-brand-orange" />
                <span>17. Contact Us</span>
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                For questions regarding these Terms & Conditions, please reach out to us:
              </p>

              <div className="space-y-3 text-sm font-semibold">
                <div className="text-brand-orange font-bold text-lg">LearnBuild Hub</div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-400 underline">{SITE_CONFIG.email}</a></span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Phone/WhatsApp: <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{SITE_CONFIG.phone}</a></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
