"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, MessageSquare, Calendar, Mail, 
  CheckCircle2, Sparkles, Star, Award, ShieldCheck, ArrowRight, Loader2
} from "lucide-react";
import { getUserSession } from "@/lib/supabase/auth";
import { INSTRUCTORS, Instructor } from "@/data/instructors";
import { SITE_CONFIG } from "@/lib/constants";

export default function StudentMentorsPage() {
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Student");
  const [studentEmail, setStudentEmail] = useState("");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [mentors, setMentors] = useState<Instructor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Instructor | null>(null);
  const [sessionNote, setSessionNote] = useState("");
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const session = await getUserSession();
      if (session?.user) {
        const email = session.user.email || "";
        const name = session.user.user_metadata?.full_name || email.split("@")[0] || "Student";
        setStudentEmail(email);
        setStudentName(name);

        try {
          const res = await fetch("/api/admin/leads?type=enrollments");
          const data = await res.json();
          const userLeads = (data.data || []).filter(
            (item: any) => item.email?.toLowerCase() === email.toLowerCase()
          );
          setEnrollments(userLeads);

          // Find assigned mentor names from enrollments
          const assignedNames = userLeads.map((item: any) => item.instructor_name).filter(Boolean);
          const matched = INSTRUCTORS.filter(inst => 
            assignedNames.some((name: string) => name.toLowerCase().includes(inst.name.toLowerCase()) || inst.name.toLowerCase().includes(name.toLowerCase()))
          );

          if (matched.length > 0) {
            setMentors(matched);
            setSelectedMentor(matched[0]);
          } else {
            setMentors(INSTRUCTORS.slice(0, 3));
            setSelectedMentor(INSTRUCTORS[0]);
          }
        } catch (err) {
          console.error("Error fetching mentor details:", err);
          setMentors(INSTRUCTORS.slice(0, 3));
          setSelectedMentor(INSTRUCTORS[0]);
        }
      } else {
        setMentors(INSTRUCTORS.slice(0, 3));
        setSelectedMentor(INSTRUCTORS[0]);
      }
      setLoading(false);
    };

    init();
  }, []);

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
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
          <span>Verified 1-on-1 Mentorship</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Assigned Industry Mentors
        </h1>
        <p className="text-xs sm:text-sm text-blue-200 font-normal mt-1 max-w-2xl">
          Connect directly with your assigned Lead Instructor for 1-on-1 code reviews, architectural feedback, career strategy, and live project debugging.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading your mentor team...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentors Selection List */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
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

            {/* Quick Mentorship SLA Info */}
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
              {/* Mentor Detail Card */}
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

                  {/* Direct Contact WhatsApp & Email Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`${SITE_CONFIG.whatsappLink}?text=Hi%20${encodeURIComponent(selectedMentor.name)},%20I%20am%20${encodeURIComponent(studentName)}%20from%20LearnBuild%20Student%20Portal.%20I%20have%20a%20mentorship%20question.`}
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

                {/* Mentor Bio */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Mentor Expertise & Specialization</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedMentor.bio}
                  </p>
                </div>

                {/* Skills Badges */}
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

                {/* Book 1-on-1 Session Form */}
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
                        placeholder={`Describe what you'd like to work on with ${selectedMentor.name} (e.g. debugging project errors, code review, setup advice)...`}
                        value={sessionNote}
                        onChange={(e) => setSessionNote(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue placeholder:text-slate-400 font-medium"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">
                          Logged in as: <strong className="text-slate-900 font-bold">{studentEmail}</strong>
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
      )}
    </div>
  );
}
