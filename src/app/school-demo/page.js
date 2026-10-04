// File path: app/school-demo/page.js

import React from 'react';

export default function SchoolDemoPage() {

  return (
<div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Navbar */}
<header className="bg-white shadow-sm sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
<h1 className="text-xl font-bold text-blue-600">St. Xavier's Model School</h1>
<a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">

            Admissions Open 2026
</a>
</div>
</header>

      {/* Hero Section */}
<section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 px-4 text-center">
<div className="max-w-4xl mx-auto">
<span className="bg-blue-700 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">

            Affiliated to CBSE | Session 2026-27
</span>
<h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 leading-tight">

            Shaping Bright Futures with Excellence & Values
</h1>
<p className="text-lg text-blue-200 mb-8">

            Providing world-class education, modern computer labs, sports, and holistic development for your child.
</p>
<div className="flex justify-center gap-4">
<a href="#contact" className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400">

              Apply For Admission
</a>
<a href="#about" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition">

              Learn More
</a>
</div>
</div>
</section>

      {/* Highlights / Stats */}
<section className="py-12 bg-white border-b">
<div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
<div className="p-4">
<h3 className="text-3xl font-bold text-blue-600">25+</h3>
<p className="text-gray-600 text-sm mt-1">Years of Legacy</p>
</div>
<div className="p-4">
<h3 className="text-3xl font-bold text-blue-600">100%</h3>
<p className="text-gray-600 text-sm mt-1">Board Results</p>
</div>
<div className="p-4">
<h3 className="text-3xl font-bold text-blue-600">30+</h3>
<p className="text-gray-600 text-sm mt-1">Expert Faculty</p>
</div>
<div className="p-4">
<h3 className="text-3xl font-bold text-blue-600">15+</h3>
<p className="text-gray-600 text-sm mt-1">Sports & Activities</p>
</div>
</div>
</section>

      {/* About Section */}
<section id="about" className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
<div>
<h2 className="text-3xl font-bold mb-4 text-gray-900">Welcome to Our School Campus</h2>
<p className="text-gray-600 mb-4 leading-relaxed">

            We believe in nurturing young minds through a balanced approach of academics, discipline, and creative exploration. Our smart classes and dedicated mentors ensure every child reaches their maximum potential.
</p>
<ul className="space-y-2 text-gray-700">
<li className="flex items-center gap-2">✅ Smart Classrooms & Science Labs</li>
<li className="flex items-center gap-2">✅ Safe Transport Facility Across City</li>
<li className="flex items-center gap-2">✅ Special Focus on Computer & Coding Skills</li>
</ul>
</div>
<div className="bg-blue-100 h-72 rounded-xl flex items-center justify-center text-blue-500 font-semibold shadow-inner">

          [School Campus / Activity Image Placeholder]
</div>
</section>

      {/* Admission Enquiry Form Section */}
<section id="contact" className="py-16 bg-blue-50 px-4">
<div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
<h2 className="text-2xl font-bold text-center mb-2">Admission Enquiry 2026-27</h2>
<p className="text-gray-500 text-center text-sm mb-6">Fill out the form below and our counselor will call you back.</p>
<form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Demo form submitted successfully!'); }}>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Parent's / Guardian's Name</label>
<input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your name" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
<input type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter mobile number" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Class Seeking Admission For</label>
<select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
<option>Nursery / Kindergarten</option>
<option>Class 1st to 5th</option>
<option>Class 6th to 8th</option>
<option>Class 9th & 10th</option>
<option>Class 11th & 12th</option>
</select>
</div>
<button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">

              Submit Enquiry
</button>
</form>
</div>
</section>

      {/* Footer */}
<footer className="bg-gray-900 text-white py-8 text-center text-sm">
<p>&copy; 2026 St. Xavier's Model School. Powered by <span className="text-blue-400 font-semibold">LearnBuildHub</span></p>
</footer>
</div>

  );

}
 
