import type { Metadata } from 'next'

export const metadata: Metadata = {

  title: 'Dr. Sharma Clinic | Live Token & Booking',

  description: 'Book instant appointments and track live queue status',

}

export default function ClinicDemoLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (
<div className="min-h-screen bg-slate-900 text-slate-900 font-sans antialiased flex items-center justify-center p-0 sm:p-4">
<div className="w-full max-w-md min-h-screen sm:min-h-[85vh] sm:rounded-3xl bg-slate-50 shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-800">

        {children}
</div>
</div>

  )

}
 
