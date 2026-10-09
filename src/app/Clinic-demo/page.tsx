'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClinicBookingPage() {
  const router = useRouter()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    symptoms: '',
  })

  const timeSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '05:00 PM', '05:30 PM', '06:00 PM']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) {
      alert('Please select a time slot!')
      return
    }

    // Yahan aap Supabase mein data save karne ke baad success page par bhej sakte hain
    const queryParams = new URLSearchParams({
      name: formData.name,
      phone: formData.phone,
      slot: selectedSlot,
    })
    
    router.push(`/clinic-demo/success?${queryParams.toString()}`)
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-600 p-6 text-white text-center">
          <h1 className="text-xl font-bold">Dr. Sharma Clinic</h1>
          <p className="text-emerald-100 text-sm mt-1">General Physician & Child Care</p>
          <div className="mt-3 inline-block bg-emerald-700 text-xs px-3 py-1 rounded-full">
            🟢 Open Now • Next Token: #08
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Step 1: Select Slot */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    selectedSlot === slot
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Patient Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Patient Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Verma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Age</label>
                <input
                  type="number"
                  placeholder="28"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Brief Issue / Symptoms</label>
              <textarea
                rows={2}
                placeholder="Fever & cough since 2 days..."
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-sm"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </main>
  )
}
