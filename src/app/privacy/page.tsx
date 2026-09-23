"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  ArrowLeft,
  FileText,
  Lock,
  Cookie
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>LEGAL & GOVERNANCE</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Privacy Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6">
              LearnBuild Hub (“LearnBuild Hub”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide to us.
            </p>

            <div className="text-xs text-slate-400 font-semibold">
              Last Updated: September 23, 2026
            </div>
          </div>

          {/* Legal Navigation Tabs */}
          <div className="flex items-center gap-3 mt-10 border-t border-slate-800/80 pt-6 flex-wrap">
            <Link
              href="/privacy"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-md flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Link>

            <Link
              href="/terms"
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
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
          </div>
        </div>
      </section>

      {/* ================= 2. POLICY DOCUMENT CONTENT ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-slate max-w-none text-slate-700 font-normal leading-relaxed text-sm sm:text-base space-y-10">
            
            <p className="text-slate-600 leading-relaxed font-medium">
              This Privacy Policy explains how LearnBuild Hub collects, uses, stores, protects and handles information when you visit our website, submit an enquiry, contact us, use our services, or interact with our training and technology offerings. By using our website, you acknowledge that you have read and understood this Privacy Policy.
            </p>

            {/* Section 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">1</span>
                <span>Information We Collect</span>
              </h3>
              <p className="mb-4">
                Depending on how you interact with LearnBuild Hub, we may collect the following information:
              </p>
              
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">Information You Provide</h4>
              <p className="mb-3">When you submit a contact or enquiry form, request information, or communicate with us, we may collect:</p>
              <ul className="list-disc pl-6 space-y-1 mb-6 text-sm">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Company or Organisation Name, if provided</li>
                <li>Service or training requirements</li>
                <li>Project requirements</li>
                <li>Course or training interests</li>
                <li>Message or enquiry details</li>
                <li>Any other information you voluntarily provide</li>
              </ul>

              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">Technical Information</h4>
              <p className="mb-3">When you access our website, certain technical information may be processed automatically for website functionality, security and maintenance, including:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4 text-sm">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Date and time of access</li>
                <li>Basic website access and error logs</li>
              </ul>
              <p className="text-xs font-bold text-slate-500 bg-white p-3 rounded-xl border border-slate-200 inline-block">
                Note: We do not currently use Google Analytics, Meta Pixel or similar advertising/tracking platforms on our website.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">2</span>
                <span>How We Use Your Information</span>
              </h3>
              <p className="mb-3">We may use the information collected to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>Respond to your enquiries and requests</li>
                <li>Understand your project or business requirements</li>
                <li>Provide information about our services and training programs</li>
                <li>Contact you regarding your enquiry</li>
                <li>Prepare proposals or quotations where applicable</li>
                <li>Deliver requested services and technical deliverables</li>
                <li>Improve our website and services</li>
                <li>Maintain website security and prevent unauthorised activity</li>
                <li>Maintain necessary business records and comply with legal requirements</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">3</span>
                <span>Storage of Personal Information</span>
              </h3>
              <p className="mb-3">
                Information submitted through our website’s contact or enquiry forms may be stored in our database. This information may be used by authorised LearnBuild Hub personnel for the purpose of responding to enquiries, managing leads, providing services and maintaining business records.
              </p>
              <p>
                We take reasonable measures to protect stored information from unauthorised access, misuse, alteration or disclosure.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">4</span>
                <span>Sharing of Information</span>
              </h3>
              <p className="font-extrabold text-brand-orange mb-3">
                LearnBuild Hub does not sell your personal information.
              </p>
              <p className="mb-3">We may share information where reasonably necessary with:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Authorised members of LearnBuild Hub</li>
                <li>Hosting or database service providers</li>
                <li>Technology and infrastructure service providers</li>
                <li>Communication service providers</li>
                <li>Professional service providers where required</li>
                <li>Government authorities or law-enforcement agencies where legally required</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">5</span>
                <span>Data Security</span>
              </h3>
              <p>
                We take reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, loss, misuse, alteration or destruction. However, no internet transmission or electronic storage system can be guaranteed to be completely secure.
              </p>
            </div>

            {/* Section 6 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">6</span>
                <span>Data Retention</span>
              </h3>
              <p>
                We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, to maintain legitimate business records, or where retention is required by applicable law. When information is no longer reasonably required, we may delete or securely dispose of it.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">7</span>
                <span>Your Privacy Rights</span>
              </h3>
              <p className="mb-3">Subject to applicable law, you may have rights relating to your personal information, including requesting:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of personal information where applicable</li>
                <li>Withdrawal of consent where processing is based on consent</li>
                <li>Information regarding how your personal information is being processed</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">8</span>
                <span>Cookies and Similar Technologies</span>
              </h3>
              <p className="mb-3">
                Our website may use essential cookies or similar technical mechanisms where required for basic website functionality, security, sessions or user preferences.
              </p>
              <p>
                At present, LearnBuild Hub does not use Google Analytics, Meta Pixel or advertising cookies on this website.
              </p>
            </div>

            {/* Section 9 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">9</span>
                <span>Third-Party Websites</span>
              </h3>
              <p>
                Our website may contain links to third-party websites, platforms or services. LearnBuild Hub does not control the privacy practices of those third parties. We recommend reviewing their respective privacy policies before providing personal information.
              </p>
            </div>

            {/* Section 10 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">10</span>
                <span>Children’s Privacy</span>
              </h3>
              <p>
                Our website is not specifically intended for children. We do not knowingly collect personal information from children in circumstances where such collection requires parental or guardian consent under applicable law.
              </p>
            </div>

            {/* Section 11 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-black text-xs flex items-center justify-center">11</span>
                <span>Changes to This Privacy Policy</span>
              </h3>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our website, services, technology, business practices or applicable legal requirements. Any updated version will be published on this page with a revised “Last Updated” date.
              </p>
            </div>

            {/* Section 12: Contact Us */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-brand-orange" />
                <span>12. Contact Us</span>
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                If you have any questions, concerns or requests relating to this Privacy Policy or your personal information, please contact us:
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
