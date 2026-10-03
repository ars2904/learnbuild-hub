"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, Calendar, Clock, Video, User, CheckCircle2, ArrowRight, Loader2, X, Check, ShieldCheck 
} from "lucide-react";
import { motion } from "framer-motion";
import { CMSWorkshop } from "@/lib/data/cmsStore";

export function HomeWorkshopBanner() {
  const [homeWorkshops, setHomeWorkshops] = useState<CMSWorkshop[]>([]);
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
          const featured = data.data.filter(
            (w: CMSWorkshop) => Boolean(w.showOnHome) || w.slug === "tech-career-guidance-call" || w.id === "ws-career-49"
          );
          setHomeWorkshops(featured);
        }
      })
      .catch((e) => console.warn("Failed fetching home workshops:", e))
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
        setErrorMsg(json.message || "Booking failed. Please try again.");
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

  if (loading || homeWorkshops.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>FEATURED CAREER GUIDANCE & MASTERCLASS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Confused About Your <span className="text-brand-blue">Tech Career?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Get 1-to-1 personalized guidance, clear your technology doubts, and plan your next engineering career step with confidence.
          </p>
        </div>

        {/* Featured Workshop Banners */}
        <div className="space-y-8">
          {homeWorkshops.map((ws) => (
            <div
              key={ws.id}
              className="rounded-3xl bg-slate-800/90 border border-slate-700/80 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch group hover:border-brand-blue/50 transition-all duration-300"
            >
              {/* Cover Image / Graphic Banner */}
              <div className="lg:w-1/2 relative min-h-[280px] sm:min-h-[360px] bg-slate-950 overflow-hidden flex items-center justify-center">
                <img
                  src={ws.coverImage || "/images/workshops/career-guidance-call.jpg"}
                  alt={ws.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-brand-blue text-white text-xs font-black uppercase shadow-md border border-blue-400/30">
                    {ws.category}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase shadow-md">
                    {ws.price > 0 ? `Just ₹${ws.price} for 49 Mins` : "REGISTRATION OPEN"}
                  </span>
                </div>
              </div>

              {/* Content Info & CTA */}
              <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Clock className="w-4 h-4" />
                      {ws.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <Video className="w-4 h-4" />
                      {ws.mode || "1-to-1 Online Call"}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {ws.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {ws.description}
                  </p>

                  {/* Key Discussion Checklist */}
                  {ws.agenda && ws.agenda.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">What We'll Cover:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-semibold">
                        {ws.agenda.slice(0, 6).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Speaker Details */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
                    <img
                      src={ws.speakerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                      alt={ws.speakerName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-blue"
                    />
                    <div>
                      <h5 className="text-xs font-black text-white">{ws.speakerName}</h5>
                      <p className="text-[11px] text-blue-300 font-bold">{ws.speakerRole}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => setSelectedWorkshop(ws)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Book Your Slot Now {ws.price > 0 ? `(₹${ws.price})` : ""}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`/workshop/${ws.slug}`}
                    className="text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Complete Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
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
                <h3 className="text-2xl font-black text-slate-900">Slot Booked Successfully!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>! Your seat for <strong className="text-brand-blue">{selectedWorkshop.title}</strong> is reserved. Joining details sent to <span className="text-amber-700 font-bold">{email}</span>.
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
                    <span>Career Guidance Booking</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {selectedWorkshop.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    {selectedWorkshop.duration} • {selectedWorkshop.price > 0 ? `₹${selectedWorkshop.price}` : "Registration"}
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
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Current Status / Qualification</label>
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
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Confirm Slot Booking</span>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
