"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  GraduationCap, BookOpen, Award, CheckCircle2, Clock, 
  Search, Bell, ArrowRight, Play, Video, Loader2, Sparkles, User, Briefcase, Lock, Unlock, Save, ExternalLink, ShieldCheck, Mail, Phone, Code2, Users, Star, MessageSquare, Calendar
} from "lucide-react";
import { getUserSession } from "@/lib/supabase/auth";
import { StudentProfile, IssuedCertificate } from "@/lib/data/studentStore";
import { INSTRUCTORS, Instructor } from "@/data/instructors";
import { SITE_CONFIG } from "@/lib/constants";

function formatEmailToName(email: string): string {
  if (!email || !email.includes("@")) return "Student User";
  const username = email.split("@")[0];
  return username.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function StudentDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "tracks";

  const [loading, setLoading] = useState(true);
  
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
    progress: 65,
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

  // Mentors Tab States
  const [mentors, setMentors] = useState<Instructor[]>(INSTRUCTORS.slice(0, 3));
  const [selectedMentor, setSelectedMentor] = useState<Instructor | null>(INSTRUCTORS[0]);
  const [sessionNote, setSessionNote] = useState("");
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

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
        setStudent({
          ...found,
          progress: found.progress !== undefined ? found.progress : 65,
        });
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
          progress: 65,
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
          isStudentEdit: true,
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

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setSessionSubmitted(true);
    setTimeout(() => {
      setSessionSubmitted(false);
      setSessionNote("");
    }, 4000);
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

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading your student dashboard...</p>
        </div>
      ) : (
        <>
          {/* VIEW 1: MY ENROLLED TRACKS */}
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

                {/* Dynamic Progress & Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-bold block">Course Duration:</span>
                    <span className="text-slate-900 font-bold text-sm">16 Weeks • Live Mentorship</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-bold block">Curriculum Progress:</span>
                    <span className="text-emerald-600 font-bold text-sm">
                      {student.progress !== undefined ? `${student.progress}%` : "65%"} Completed
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-bold block">Certificate Status:</span>
                    <span className="text-amber-600 font-bold text-sm">Eligible for Capstone Exam</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: MY ASSIGNED EXPERT MENTOR (Refactored to Crisp Light Theme) */}
          {activeTab === "mentor" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Your Assigned Expert Mentor</h3>
                <p className="text-xs text-slate-500">Guide and reviewer assigned to your learning track by LearnBuild Hub.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Mentors Selection List */}
                <div className="space-y-4">
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-blue" />
                    <span>Your Assigned Mentors</span>
                  </h2>

                  <div className="space-y-3">
                    {mentors.map((mentor) => {
                      const isSelected = selectedMentor?.id === mentor.id;
                      return (
                        <button
                          key={mentor.id}
                          onClick={() => setSelectedMentor(mentor)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                            isSelected
                              ? "bg-blue-50/90 border-brand-blue ring-2 ring-brand-blue/20 shadow-md"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                            <Image
                              src={mentor.avatar}
                              alt={mentor.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-slate-900 text-sm truncate">{mentor.name}</h3>
                            <p className="text-xs text-brand-blue font-bold truncate">{mentor.role}</p>
                            <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-600 font-bold">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>{mentor.rating} Mentor Rating</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Guaranteed SLA Info */}
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2 text-emerald-950">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Guaranteed Response SLA</span>
                    </div>
                    <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                      Mentors review pull requests & answer queries within 24 hours. Emergency code support available on WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Mentor Profile Detail & Booking View */}
                {selectedMentor && (
                  <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-md space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-blue-100 border-2 border-brand-blue flex-shrink-0">
                            <Image
                              src={selectedMentor.avatar}
                              alt={selectedMentor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-black text-slate-900">{selectedMentor.name}</h2>
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase">
                                Active Mentor
                              </span>
                            </div>
                            <p className="text-xs font-bold text-brand-blue">{selectedMentor.role}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">Verified Senior Instructor at LearnBuild Hub</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <a
                            href={`${SITE_CONFIG.whatsappLink}?text=Hi%20${encodeURIComponent(selectedMentor.name)},%20I%20am%20${encodeURIComponent(student.name)}%20from%20LearnBuild%20Student%20Portal.%20I%20have%20a%20mentorship%20question.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${SITE_CONFIG.email}?subject=Mentorship%20Request%20-%20${encodeURIComponent(selectedMentor.name)}`}
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </a>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Mentor Expertise & Specialization</h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {selectedMentor.bio}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Technical Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMentor.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 space-y-4">
                        <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-blue" />
                          <span>Schedule 1-on-1 Code Review or Doubt Clearing</span>
                        </h4>

                        {sessionSubmitted ? (
                          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <span>Your 1-on-1 mentorship session request has been submitted! Your mentor will confirm your meeting slot shortly.</span>
                          </div>
                        ) : (
                          <form onSubmit={handleBookSession} className="space-y-3">
                            <textarea
                              rows={3}
                              required
                              placeholder={`Describe what you'd like to work on with ${selectedMentor.name}...`}
                              value={sessionNote}
                              onChange={(e) => setSessionNote(e.target.value)}
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue placeholder:text-slate-400 font-medium"
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-slate-500 font-medium">
                                Logged in as: <strong className="text-slate-900 font-bold">{student.email}</strong>
                              </span>
                              <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                              >
                                <span>Request Slot</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 3: VERIFIED CERTIFICATES */}
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

          {/* VIEW 4: PROFILE SETTINGS */}
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

        </>
      )}

    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-slate-400 font-bold text-xs">Loading Student Portal...</div>}>
      <StudentDashboardContent />
    </Suspense>
  );
}
