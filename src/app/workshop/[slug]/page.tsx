"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, Clock, Video, User, CheckCircle2, ArrowRight, Loader2, Sparkles, X, Check 
} from "lucide-react";
import { CMSWorkshop } from "@/lib/data/cmsStore";

export default function WorkshopDetailPage({ params }: { params: { slug: string } }) {
  const [workshop, setWorkshop] = useState<CMSWorkshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form Registration State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("Undergraduate Student");
  const [submitting, setSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`/api/workshops?slug=${encodeURIComponent(params.slug)}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setWorkshop(data.data);
        }
      })
      .catch((err) => console.error("Error loading workshop:", err))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshop) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/workshop-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId: workshop.id,
          workshopTitle: workshop.title,
          fullName,
          email,
          phone,
          qualification,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setRegisterSuccess(true);
      } else {
        setErrorMsg(json.message || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Connection error. Please check your network.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue mx-auto" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Workshop Details...</p>
        </div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 px-4">
        <div className="max-w-xl mx-auto text-center space-y-5 bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-2xl font-black text-white">Workshop Not Found</h2>
          <p className="text-xs text-slate-400">The workshop you are looking for does not exist or may have expired.</p>
          <Link
            href="/workshop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Workshops</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(workshop.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation */}
        <Link
          href="/workshop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-blue" />
          <span>Back to All Masterclasses</span>
        </Link>

        {/* Hero Banner Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-900/50 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-black text-xs uppercase tracking-wider border border-blue-400/30">
              {workshop.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase border border-emerald-500/30">
              {workshop.price === 0 ? "FREE ENTRY" : `₹${workshop.price}`}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {workshop.title}
          </h1>

          <p className="text-sm sm:text-base text-blue-200 leading-relaxed max-w-3xl">
            {workshop.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Date & Time</span>
                <span className="text-xs font-extrabold text-white">{formattedDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Duration</span>
                <span className="text-xs font-extrabold text-white">{workshop.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Format</span>
                <span className="text-xs font-extrabold text-white">{workshop.mode || "Live Online Masterclass"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Agenda & What You Learn */}
          <div className="lg:col-span-2 space-y-8">
            {/* Agenda Section */}
            {workshop.agenda && workshop.agenda.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Workshop Agenda & Breakdown</span>
                </h3>
                <ul className="space-y-3 pt-2">
                  {workshop.agenda.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <span className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue font-black flex items-center justify-center flex-shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What You Will Learn */}
            {workshop.whatYouWillLearn && workshop.whatYouWillLearn.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Key Takeaways & Hands-on Skills</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {workshop.whatYouWillLearn.map((skill, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Instructor & Reserve CTA */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-center">
              <img 
                src={workshop.speakerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} 
                alt={workshop.speakerName} 
                className="w-20 h-20 rounded-full object-cover border-4 border-brand-blue mx-auto shadow-lg"
              />

              <div>
                <h4 className="text-base font-black text-white">{workshop.speakerName}</h4>
                <p className="text-xs text-blue-300 font-semibold">{workshop.speakerRole}</p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Free Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* REGISTRATION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative my-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {registerSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Seat Reserved Successfully!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{fullName}</strong>! You are confirmed for <strong className="text-blue-300">{workshop.title}</strong>.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-8 py-3 rounded-2xl bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {workshop.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    {formattedDate}
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saurabh Upadhyay"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="saurabh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-1">Qualification</label>
                    <select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    >
                      <option value="Undergraduate Student">Undergraduate Student (B.Tech / BCA / B.Sc)</option>
                      <option value="Postgraduate Student">Postgraduate Student (M.Tech / MCA)</option>
                      <option value="Working Software Professional">Working Software Professional</option>
                      <option value="Entrepreneur / Founder">Entrepreneur / Founder</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Confirm Free Masterclass Registration</span>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
