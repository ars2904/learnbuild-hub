'use client'

import { useState } from 'react'
import { clinicConfig } from '@/config/clinic';
 
export default function ClinicDemoPage() {

  const [selectedSlot, setSelectedSlot] = useState('10:30 AM')

  const [consultType, setConsultType] = useState<'clinic' | 'online'>('clinic')

  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({

    name: '',

    phone: '',

    age: '',

    symptoms: '',

  })

  const timeSlots = [

    '10:00 AM', '10:30 AM', '11:00 AM', 

    '11:30 AM', '05:00 PM', '05:30 PM', '06:00 PM'

  ]

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    if (!formData.name || !formData.phone) {

      alert('Kripya naam aur phone number bharein!')

      return

    }

    setIsSubmitted(true)

  }

  const clinicWhatsApp = '919140034860' // Aap apna ya doctor ka WhatsApp number yahan daal sakte hain

  const whatsappMessage = encodeURIComponent(

    `*NEW CLINIC APPOINTMENT*\n\n👤 *Patient:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🎂 *Age:* ${formData.age || 'N/A'}\n⏰ *Slot:* ${selectedSlot}\n🏥 *Type:* ${consultType === 'clinic' ? 'In-Clinic Visit' : 'Video Consult'}\n💬 *Issue:* ${formData.symptoms || 'General Checkup'}`

  )

  return (
<div className="flex flex-col flex-1 bg-slate-50">

      {/* Hero Banner */}
<div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white p-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
<div className="flex items-center gap-4 relative z-10">
<div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/20">

            🩺
</div>
<div>
<h1 className="text-lg font-bold tracking-tight">Dr. Sharma Clinic</h1>
<p className="text-emerald-100 text-xs font-medium">M.D. General Physician • 12+ Yrs Exp</p>
</div>
</div>
<div className="mt-4 inline-flex items-center gap-2 bg-emerald-900/30 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-400/20 w-full justify-between">
<span className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            Live Queue Status
</span>
<span className="font-bold text-emerald-200">Token #08 in progress</span>
</div>
</div>

      {!isSubmitted ? (

        /* Booking Form */
<form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 flex flex-col justify-between">
<div className="space-y-5">

            {/* Consultation Type Selector */}
<div>
<label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">

                Consultation Type
</label>
<div className="grid grid-cols-2 gap-3">

                {[

                  { id: 'clinic', title: 'In-Clinic Visit', sub: 'Pay at Clinic' },

                  { id: 'online', title: 'Video Consult', sub: 'Instant Link' },

                ].map((item) => (
<button

                    type="button"

                    key={item.id}

                    onClick={() => setConsultType(item.id as any)}

                    className={`p-3 text-left rounded-2xl border-2 transition-all ${

                      consultType === item.id

                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 shadow-sm'

                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'

                    }`}
>
<p className="text-xs font-bold">{item.title}</p>
<p className="text-[10px] text-slate-400">{item.sub}</p>
</button>

                ))}
</div>
</div>

            {/* Time Slot Grid */}
<div>
<label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">

                Select Time Slot
</label>
<div className="grid grid-cols-3 gap-2">

                {timeSlots.map((slot) => (
<button

                    type="button"

                    key={slot}

                    onClick={() => setSelectedSlot(slot)}

                    className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${

                      selectedSlot === slot

                        ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'

                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'

                    }`}
>

                    {slot}
</button>

                ))}
</div>
</div>

            {/* Patient Inputs */}
<div className="space-y-3">
<label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">

                Patient Information
</label>
<input

                type="text"

                required

                placeholder="Patient Full Name *"

                value={formData.name}

                onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"

              />
<div className="grid grid-cols-2 gap-3">
<input

                  type="tel"

                  required

                  placeholder="Phone Number *"

                  value={formData.phone}

                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}

                  className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"

                />
<input

                  type="number"

                  placeholder="Age"

                  value={formData.age}

                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}

                  className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"

                />
</div>
<textarea

                rows={2}

                placeholder="Health Issue / Symptoms (e.g., Fever, Cough)"

                value={formData.symptoms}

                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}

                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400 resize-none"

              />
</div>
</div>

          {/* Submit Button */}
<div className="pt-4">
<button

              type="submit"

              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/25"
>

              Confirm Appointment & Get Token ➔
</button>
</div>
</form>

      ) : (

        /* Success Screen View */
<div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-6">
<div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner">

            ✓
</div>
<div>
<h2 className="text-xl font-bold text-slate-800">Booking Confirmed!</h2>
<p className="text-xs text-slate-500 mt-1">Aapka token successfully generate ho gaya hai.</p>
</div>
<div className="w-full bg-white border border-slate-200 rounded-3xl p-5 text-left space-y-3 shadow-sm">
<div className="flex justify-between items-center border-b border-slate-100 pb-3">
<span className="text-xs text-slate-400 uppercase font-semibold">Assigned Token</span>
<span className="text-2xl font-black text-emerald-600">#12</span>
</div>
<div className="flex justify-between text-xs">
<span className="text-slate-500">Patient Name:</span>
<span className="font-semibold text-slate-800">{formData.name}</span>
</div>
<div className="flex justify-between text-xs">
<span className="text-slate-500">Time Slot:</span>
<span className="font-semibold text-slate-800">{selectedSlot}</span>
</div>
<div className="flex justify-between text-xs">
<span className="text-slate-500">Consultation Type:</span>
<span className="font-semibold text-slate-800">{consultType === 'clinic' ? 'In-Clinic Visit' : 'Video Consult'}</span>
</div>
</div>
<div className="w-full space-y-3 pt-2">
<a

              href={`https://wa.me/${clinicWhatsApp}?text=${whatsappMessage}`}

              target="_blank"

              rel="noopener noreferrer"

              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
>

              Send Details to Doctor WhatsApp 💬
</a>
<button

              onClick={() => setIsSubmitted(false)}

              className="text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2 block mx-auto underline"
>

              ← Book another appointment
</button>
</div>
</div>

      )}
</div>

  )

}
 
