'use client'

import { useState } from 'react'

import { clinicConfig } from '@/config/clinic' // ya '@/data/clinic' jo aapne banaya h

export default function DoctorDashboard() {

  const [currentToken, setCurrentToken] = useState(8)

  const [patients, setPatients] = useState([

    { token: 8, name: "Rahul Verma", age: 32, phone: "9876543210", symptoms: "Fever & Headache", status: "serving" },

    { token: 9, name: "Pooja Singh", age: 24, phone: "9812345678", symptoms: "Cough & Cold", status: "waiting" },

    { token: 10, name: "Amit Kumar", age: 45, phone: "9765432109", symptoms: "Back Pain", status: "waiting" },

  ])

  const callNext = () => {

    setCurrentToken(prev => prev + 1)

    setPatients(prev =>

      prev.map(p => {

        if (p.token === currentToken) return { ...p, status: 'completed' }

        if (p.token === currentToken + 1) return { ...p, status: 'serving' }

        return p

      })

    )

  }

  return (
<div className="min-h-screen bg-slate-900 p-4 sm:p-6 text-slate-100">
<div className="max-w-xl mx-auto space-y-6">

        {/* Top Header */}
<div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
<div>
<h1 className="font-bold text-white text-base">{clinicConfig.name}</h1>
<p className="text-xs text-slate-400">Admin Panel • {clinicConfig.doctorName}</p>
</div>
<span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            Live System
</span>
</div>

        {/* Live Token Controller Card */}
<div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
<div>
<p className="text-xs uppercase tracking-widest text-emerald-100 font-semibold">Currently Serving</p>
<h2 className="text-5xl font-black mt-1 text-white">Token #{currentToken}</h2>
</div>
<button

            onClick={callNext}

            className="bg-slate-900 hover:bg-slate-950 active:scale-95 text-white font-bold px-6 py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg"
>

            Call Next ➔
</button>
</div>

        {/* Patient Queue List */}
<div className="space-y-3">
<h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Today's Token Queue</h3>

          {patients.map((p) => (
<div

              key={p.token}

              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${

                p.status === 'serving'

                  ? 'bg-emerald-950/40 border-emerald-500/50 ring-2 ring-emerald-500/20'

                  : p.status === 'completed'

                  ? 'bg-slate-800/40 border-slate-700 opacity-60'

                  : 'bg-slate-800 border-slate-700'

              }`}
>
<div className="flex items-center gap-3">
<span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${

                  p.status === 'serving' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'

                }`}>

                  #{p.token}
</span>
<div>
<h4 className="font-bold text-white text-sm">{p.name} ({p.age} yrs)</h4>
<p className="text-xs text-slate-400">{p.symptoms} • {p.phone}</p>
</div>
</div>
<span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${

                p.status === 'serving' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :

                p.status === 'completed' ? 'bg-slate-700 text-slate-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'

              }`}>

                {p.status}
</span>
</div>

          ))}
</div>
</div>
</div>

  )

}
 
