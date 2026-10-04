export const dynamic = 'force-dynamic';
export default function SchoolDemoPage() {
 return (
<div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
     {/* Top Bar / Header */}
<header className="bg-white shadow-sm sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
<h1 className="text-xl font-bold text-blue-700">St. Xavier's Model School</h1>
<a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
           Admissions Open 2026
</a>
</div>
</header>
     {/* Hero Section */}
<section className="bg-blue-900 text-white py-16 px-4 text-center">
<div className="max-w-3xl mx-auto">
<span className="bg-blue-800 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
           Affiliated to CBSE | Session 2026-27
</span>
<h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight">
           Shaping Bright Futures with Excellence & Values
</h2>
<p className="text-base md:text-lg text-blue-200 mb-8">
           Providing world-class education, modern smart classes, sports, and holistic development for your child.
</p>
<a href="#contact" className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition inline-block">
           Apply For Admission Now
</a>
</div>
</section>
     {/* Stats Section */}
<section className="py-10 bg-white border-b">
<div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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
<p className="text-gray-600 text-sm mt-1">Activities</p>
</div>
</div>
</section>
     {/* Admission Form Section */}
<section id="contact" className="py-16 bg-gray-100 px-4">
<div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border">
<h3 className="text-2xl font-bold text-center mb-2 text-blue-900">Admission Enquiry 2026</h3>
<p className="text-gray-500 text-center text-sm mb-6">Fill the form and our counselor will get back to you.</p>
<form onSubmit={(e) => { e.preventDefault(); alert('Enquiry submitted successfully!'); }} className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Parent's Name</label>
<input type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Enter your name" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
<input type="tel" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Enter mobile number" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
<select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
<option>Nursery / KG</option>
<option>Class 1st to 5th</option>
<option>Class 6th to 8th</option>
<option>Class 9th to 12th</option>
</select>
</div>
<button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
             Submit Enquiry
</button>
</form>
</div>
</section>
     {/* Footer */}
<footer className="bg-gray-900 text-white py-6 text-center text-xs">
<p>&copy; 2026 St. Xavier's Model School. Powered by <span className="text-blue-400 font-semibold">LearnBuildHub</span></p>
</footer>
</div>
 );
}
