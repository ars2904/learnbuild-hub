"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, BookOpen, Award, CheckCircle2, Clock, 
  Search, Bell, ArrowRight, Play, Video, Loader2, Sparkles, User, Briefcase, Lock, Unlock, Save, ExternalLink, ShieldCheck, Mail, Phone, Code2
} from "lucide-react";
import { getUserSession } from "@/lib/supabase/auth";
import { StudentProfile, IssuedCertificate } from "@/lib/data/studentStore";

function formatEmailToName(email: string): string {
  if (!email || !email.includes("@")) return "Student User";
  const username = email.split("@")[0];
  return username.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tracks" | "mentor" | "certificates" | "profile" | "internship">("tracks");
  
  const [student, setStudent] = useState<StudentProfile>({
    id: "std-user",
    name: "Student User",
    email: "student@learnbuildhub.com",
    phone: "",
    courseTitle: "Full-Stack Web Engineering Track",
    courseSlug: "full-stack-web-engineering",
    expertId: "emp-101",
    expertName: "Senior Lead Mentor",
    status: "active",
    qualification: "Undergraduate",
    bio: "Learning software engineering with live mentorship.",
    profileLocked: false,
    hasInternship: false,
    createdAt: new Date().toISOString(),
  });

  const [certificates, setCertificates] = useState<IssuedCertificate[]>([]);

  // Profile Edit Form
  const [profileForm, setProfileForm] = useState({
    name: student.name,
    phone: student.phone,
    qualification: student.qualification,
    bio: student.bio,
    githubUrl: student.githubUrl || "",
    linkedinUrl: student.linkedinUrl || "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  const fetchStudentData = async (email: string, userMetaName?: string) => {
    setLoading(true);
    try {
      const [resStd, resCert] = await Promise.all([
        fetch(`/api/admin/students?email=${encodeURIComponent(email)}`),
        fetch(`/api/admin/certificates?email=${encodeURIComponent(email)}`),
      ]);

      const [jsonStd, jsonCert] = await Promise.all([
        resStd.json(),
        resCert.json(),
      ]);

      if (jsonStd.success && jsonStd.data && jsonStd.data.length > 0) {
        const found = jsonStd.data[0];
        setStudent(found);
        setProfileForm({
          name: found.name,
          phone: found.phone || "",
          qualification: found.qualification || "",
          bio: found.bio || "",
          githubUrl: found.githubUrl || "",
          linkedinUrl: found.linkedinUrl || "",
        });
      } else {
        const dynamicName = userMetaName || formatEmailToName(email);
        const dynamicStudent: StudentProfile = {
          id: `std-${Date.now()}`,
          name: dynamicName,
          email: email,
          phone: "+91 98765 00000",
          courseTitle: "Full-Stack Web Engineering Track",
          courseSlug: "full-stack-web-engineering",
          expertId: "emp-101",
          expertName: "Senior Lead Mentor",
          status: "active",
          qualification: "Undergraduate",
          bio: "Student software engineer pursuing full-stack engineering & cloud track.",
          profileLocked: false,
          hasInternship: false,
          createdAt: new Date().toISOString(),
        };
        setStudent(dynamicStudent);
        setProfileForm({
          name: dynamicName,
          phone: dynamicStudent.phone,
          qualification: dynamicStudent.qualification,
          bio: dynamicStudent.bio,
          githubUrl: "",
          linkedinUrl: "",
        });
      }

      if (jsonCert.success && jsonCert.data) {
        setCertificates(jsonCert.data);
      }
    } catch (err) {
      console.error("Error fetching student dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserSession().then((session) => {
      const email = session?.user?.email || localStorage.getItem("lb_student_email") || "student@learnbuildhub.com";
      const userMetaName = session?.user?.user_metadata?.full_name;
      fetchStudentData(email, userMetaName);
    });
  }, []);

  const handleSaveStudentProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (student.profileLocked) {
      alert("🔒 Profile is locked for student editing. Please contact Admin to update your profile.");
      return;
    }

    setProfileSaving(true);
    setProfileMsg("");
    try {
      const res = await fetch("/api/admin/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: student.id,
          email: student.email,
          ...profileForm,
          isStudentEdit: true, // Triggers profile locking on save!
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStudent(json.data);
        setProfileMsg("🔒 Profile updated and locked successfully! Contact Admin for further changes.");
      } else {
        setProfileMsg(json.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
            <span>Student Learning Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Welcome Back, {student.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Enrolled Track: <strong className="text-amber-300">{student.courseTitle}</strong> • Assigned Mentor: <strong className="text-emerald-300">{student.expertName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/learn"
            className="px-5 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>Browse Skill Tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-slate-200/80 shadow-sm overflow-x-auto text-xs font-bold">
        {[
          { id: "tracks", label: "My Enrolled Tracks", icon: BookOpen },
          { id: "mentor", label: "My Assigned Expert", icon: User },
          { id: "certificates", label: "Verified Certificates", icon: Award, count: certificates.length },
          { id: "profile", label: "Profile Settings", icon: User },
          ...(student.hasInternship ? [{ id: "internship", label: "My Internship Application", icon: Briefcase }] : []),
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-md font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading your student dashboard...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: MY ENROLLED TRACKS */}
          {activeTab === "tracks" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Enrolled Learning Tracks</h3>
                  <p className="text-xs text-slate-500">View course syllabus, progress, and 1-on-1 mentor sessions.</p>
                </div>

                <Link
                  href="/learn"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline uppercase tracking-wider"
                >
                  <span>Browse All Skill Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-[10px] font-black uppercase tracking-wider border border-blue-200">
                      Active Enrollment
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{student.courseTitle}</h4>
                    <p className="text-xs text-slate-600 mt-1 font-medium">Assigned Expert Mentor: <strong className="text-amber-700">{student.expertName}</strong></p>
                  </div>

                  <Link
                    href={`/learn/${student.courseSlug}`}
                    className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2"
                  >
                    <span>View Track Syllabus →</span>
                  </Link>
                </div>

                {/* Progress & Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-bold block">Course Duration:</span>
                    <span className="text-slate-900 font-bold text-sm">16 Weeks • Live Mentorship</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-bold block">Curriculum Progress:</span>
                    <span className="text-emerald-600 font-bold text-sm">65% Completed</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-bold block">Certificate Status:</span>
                    <span className="text-amber-600 font-bold text-sm">Eligible for Capstone Exam</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ASSIGNED EXPERT */}
          {activeTab === "mentor" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Your Assigned Expert Mentor</h3>
                <p className="text-xs text-slate-500">Guide and reviewer assigned to your learning track by LearnBuild Hub.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 p-1 border-2 border-brand-blue overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt={student.expertName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-black text-slate-900">{student.expertName}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black uppercase">
                      Lead Mentor
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500">Lead Software Architect & Tech Educator • 8+ Years Experience</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Conducts 1-on-1 code reviews, architectural feedback, and capstone project evaluations for your enrolled track.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Full-Stack Web", "React & Next.js", "Node.js", "System Design"].map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100 text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VERIFIED CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Verified Certificates of Completion</h3>
                <p className="text-xs text-slate-500">Official certificates issued to you by the LearnBuild Hub Academic Board.</p>
              </div>

              {certificates.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500 space-y-3">
                  <Award className="w-12 h-12 text-slate-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No Certificates Issued Yet</h4>
                  <p className="text-xs max-w-sm mx-auto text-slate-500">
                    Complete your capstone project and course evaluations to receive your official verified certificate issued by Admin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border-2 border-amber-400 shadow-xl space-y-4 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-amber-300">
                        <span>LEARNBUILD HUB VERIFIED CERTIFICATE</span>
                        <span>{cert.certificateNumber}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300 block">Certificate of Completion</span>
                        <h4 className="text-xl font-black text-amber-400">{cert.studentName}</h4>
                        <p className="text-xs font-semibold text-white">{cert.courseTitle}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-slate-300 font-bold">
                        <span>Grade: <strong className="text-emerald-400">{cert.grade}</strong></span>
                        <span className="text-amber-300 font-mono">CODE: {cert.verificationCode}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE SETTINGS & 1-TIME LOCK */}
          {activeTab === "profile" && (
            <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Student Profile Settings</h3>
                  <p className="text-xs text-slate-500">Edit your profile details. Note: Profile locks for editing after your first save.</p>
                </div>

                <div className={`px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                  student.profileLocked
                    ? "bg-rose-50 border-rose-200 text-rose-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                }`}>
                  {student.profileLocked ? <Lock className="w-3.5 h-3.5 text-rose-600" /> : <Unlock className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>{student.profileLocked ? "Profile Locked" : "Editable Once"}</span>
                </div>
              </div>

              {profileMsg && (
                <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                  student.profileLocked
                    ? "bg-amber-50 border border-amber-200 text-amber-900"
                    : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                }`}>
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>{profileMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveStudentProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    disabled={student.profileLocked}
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold disabled:opacity-70 disabled:bg-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      disabled={student.profileLocked}
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold disabled:opacity-70 disabled:bg-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      disabled={student.profileLocked}
                      value={profileForm.qualification}
                      onChange={(e) => setProfileForm({ ...profileForm, qualification: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold disabled:opacity-70 disabled:bg-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Bio / Student Intro</label>
                  <textarea
                    rows={3}
                    disabled={student.profileLocked}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium resize-none disabled:opacity-70 disabled:bg-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">GitHub Profile URL</label>
                    <input
                      type="text"
                      disabled={student.profileLocked}
                      placeholder="https://github.com/..."
                      value={profileForm.githubUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium disabled:opacity-70 disabled:bg-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      disabled={student.profileLocked}
                      placeholder="https://linkedin.com/in/..."
                      value={profileForm.linkedinUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium disabled:opacity-70 disabled:bg-slate-100"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {student.profileLocked ? (
                    <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Profile locked for editing. Only Admin can modify.</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">
                      ⚠️ Note: Profile locks for editing after saving.
                    </span>
                  )}

                  {!student.profileLocked && (
                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    >
                      {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save & Lock Profile</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: CONDITIONAL INTERNSHIP APPLICATION (Only rendered if student.hasInternship === true) */}
          {activeTab === "internship" && student.hasInternship && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">My Internship Application & Status</h3>
                <p className="text-xs text-slate-500">Track your merit-based internship application details.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-[10px] font-black uppercase tracking-wider border border-orange-200">
                      Internship Record
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-2">{student.internshipDetails?.role || "Full-Stack Web Intern"}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Company / Unit: {student.internshipDetails?.company || "LearnBuild Hub Labs"}</p>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue border border-blue-200 text-xs font-black uppercase">
                    Status: {student.internshipDetails?.status || "In Review"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Applied Date:</span>
                    <span className="font-semibold">{student.internshipDetails?.appliedDate || "2026-09-20"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Evaluation Mentor:</span>
                    <span className="font-extrabold text-brand-blue">{student.expertName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
