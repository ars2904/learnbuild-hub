'use client'

import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const slot = searchParams.get('slot')
  const phone = searchParams.get('phone')

  const clinicWhatsApp = '919876543210' // Doctor ka WhatsApp number
  const whatsappMessage = encodeURIComponent(
    `Hello, my appointment is booked.\nName: ${name}\nSlot: ${slot}\nPhone: ${phone}`
  )

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h2 className="text-lg font-bold text-slate-800">Appointment Confirmed!</h2>
        <p className="text-sm text-slate-600">
          Thank you, <span className="font-semibold">{name}</span>. Your slot for <span className="font-semibold">{slot}</span> has been registered.
        </p>

        <div className="pt-2">
          <a
            href={`https://wa.me/${clinicWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-sm text-center"
          >
            Send Details to Doctor on WhatsApp 💬
          </a>
        </div>
      </div>
    </main>
  )
}
