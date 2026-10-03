"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Calendar, Clock, Video, Users, CheckCircle2, ArrowRight, ShieldCheck, 
  BookOpen, Star, User, Loader2, Search, X, Check
} from "lucide-react";
import { motion } from "framer-motion";
import { CMSWorkshop } from "@/lib/data/cmsStore";

export default function WorkshopLandingPage() {
  const [workshops, setWorkshops] = useState<CMSWorkshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<CMSWorkshop | null>(null);

  // Form Registration State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("Undergraduate Student");
  const [submitting, setSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/workshops", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setWorkshops(data.data);
        }
      })
      .catch((e) => console.warn("Failed loading workshops:", e))
      .finally(() => setLoading(false));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/workshop-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId: selectedWorkshop.id,
          workshopTitle: selectedWorkshop.title,
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

  const closeModal = () => {
    setSelectedWorkshop(null);
    setRegisterSuccess(false);
    setErrorMsg("");
    setFullName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 space-y-16 relative z-10">
        
        {/* HERO BANNER */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-black shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>EXCLUSIVE LIVE ENGINEERING MASTERCLASSES & WORKSHOPS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight"
          >
            LearnBuild Hub <span className="text-brand-blue">Live Workshops</span> & Bootcamps
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Interactive live sessions with senior software architects, AI engineers, and full-stack mentors. Build production microservices, LLM agents, and SaaS systems in real-time.
          </motion.p>
        </div>

        {/* WORKSHOPS GRID */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-blue mx-auto" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading Live Masterclass Schedule...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((ws) => (
              <div 
                key={ws.id}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={ws.coverImage || "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80"} 
                      alt={ws.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-blue text-[10px] font-black uppercase border border-blue-200 shadow-sm">
                        {ws.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shadow-sm">
                        {ws.price > 0 ? `₹${ws.price}` : "REGISTRATION OPEN"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-bold">
                      <span className="flex items-center gap-1.5 text-amber-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(ws.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-brand-blue">
                        <Video className="w-4 h-4" />
                        {ws.mode || "Live Online"}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-brand-blue transition-colors">
                      {ws.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {ws.description}
                    </p>

                    {/* Speaker Info */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img 
                        src={ws.speakerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} 
                        alt={ws.speakerName} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue"
                      />
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{ws.speakerName}</h4>
                        <p className="text-[11px] text-brand-blue font-bold">{ws.speakerRole}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4">
                  <Link
                    href={`/workshop/${ws.slug}`}
                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors"
                  >
                    View Details & Agenda
                  </Link>

                  <button
                    onClick={() => setSelectedWorkshop(ws)}
                    className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Reserve Seat Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* REGISTRATION MODAL */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative my-auto text-slate-900">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {registerSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Seat Reserved Successfully!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>! You are confirmed for <strong className="text-brand-blue">{selectedWorkshop.title}</strong>. We have sent joining instructions to <span className="text-amber-700 font-bold">{email}</span>.
                </p>
                <button
                  onClick={closeModal}
                  className="px-8 py-3 rounded-2xl bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-[10px] font-bold uppercase mb-2">
                    <Video className="w-3.5 h-3.5" />
                    <span>Masterclass Seat Registration</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {selectedWorkshop.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    {new Date(selectedWorkshop.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {selectedWorkshop.duration}
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saurabh Upadhyay"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="saurabh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Current Role / Qualification</label>
                    <select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
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
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Confirm Workshop Registration</span>}
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
