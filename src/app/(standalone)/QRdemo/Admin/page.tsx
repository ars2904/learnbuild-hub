'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default function SuperAdminDashboard() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [pin, setPin] = useState('');
 const [pinError, setPinError] = useState('');
 const [vendors, setVendors] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 // Add Vendor Modal States
 const [showAddModal, setShowAddModal] = useState(false);
 const [newShopName, setNewShopName] = useState('');
 const [newSlug, setNewSlug] = useState('');
 const [newOwnerWhatsapp, setNewOwnerWhatsapp] = useState('');
 const [newSubMonths, setNewSubMonths] = useState('12');
 const [isSubmitting, setIsSubmitting] = useState(false);
 // Pin Login Handler
 const handlePinSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   if (pin === '4860') {
     setIsAuthenticated(true);
     setPinError('');
   } else {
     setPinError('❌ Galat Passcode! Sahih 4-digit code daalein.');
   }
 };
 // Fetch all vendors
 const fetchVendors = async () => {
   setLoading(true);
   const { data, error } = await supabase
     .from('vendors')
     .select('*')
     .order('created_at', { ascending: false });
   if (error) {
     console.error('Error fetching vendors:', error.message);
   } else {
     setVendors(data || []);
   }
   setLoading(false);
 };
 useEffect(() => {
   if (isAuthenticated) {
     fetchVendors();
   }
 }, [isAuthenticated]);
 // Smart Expiry Calculation Logic
 const calculateNewExpiryDate = (currentExpiry: string | null, months: number) => {
   let baseDate = new Date();
   if (currentExpiry) {
     const expDate = new Date(currentExpiry);
     if (expDate > baseDate) {
       baseDate = expDate;
     }
   }
   if (months === 1) {
     baseDate.setDate(baseDate.getDate() + 30);
   } else if (months === 6) {
     baseDate.setMonth(baseDate.getMonth() + 6);
   } else if (months === 12) {
     baseDate.setFullYear(baseDate.getFullYear() + 1);
   }
   return baseDate.toISOString();
 };
 // Handle Adding New Vendor
 const handleAddVendor = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!newShopName.trim() || !newSlug.trim() || !newOwnerWhatsapp.trim()) {
     alert('⚠️ Kripya sabhi fields (Shop Name, Slug, WhatsApp) bharein!');
     return;
   }
   setIsSubmitting(true);
   const formattedSlug = newSlug.toLowerCase().trim().replace(/\s+/g, '-');
   const expiryDate = calculateNewExpiryDate(null, Number(newSubMonths));
   const { error } = await supabase.from('vendors').insert([
     {
       shop_name: newShopName.trim(),
       slug: formattedSlug,
       owner_whatsapp: newOwnerWhatsapp.trim(),
       subscription_expires_at: expiryDate,
     },
   ]);
   setIsSubmitting(false);
   if (error) {
     alert('❌ Error adding vendor: ' + error.message);
   } else {
     alert('🚀 Naya vendor successfully add ho gaya!');
     setShowAddModal(false);
     setNewShopName('');
     setNewSlug('');
     setNewOwnerWhatsapp('');
     setNewSubMonths('12');
     fetchVendors();
   }
 };
 // Handle Subscription Renewal from Dropdown
 const handleRenewalChange = async (vendor: any, selectedValue: string) => {
   if (!selectedValue) return;
   const months = Number(selectedValue);
   const newExpiry = calculateNewExpiryDate(vendor.subscription_expires_at, months);
   const { error } = await supabase
     .from('vendors')
     .update({ subscription_expires_at: newExpiry })
     .eq('id', vendor.id);
   if (error) {
     alert('Error updating subscription: ' + error.message);
   } else {
     alert(`Subscription successfully extended for ${months === 1 ? '1 Month (30 Days)' : months === 6 ? '6 Months' : '1 Year'}!`);
     fetchVendors();
   }
 };
 // Search Filtered Vendors
 const filteredVendors = vendors.filter((v) =>
   v.shop_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
   v.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
   v.owner_whatsapp?.includes(searchQuery)
 );
 // LOGIN SCREEN FOR SUPER ADMIN
 if (!isAuthenticated) {
   return (
<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
<div className="max-w-sm w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 text-center">
<div className="space-y-2">
<span className="text-4xl">👑</span>
<h1 className="text-xl font-black text-white">Super Admin Access</h1>
<p className="text-xs text-slate-400">Master PIN daal kar login karein.</p>
</div>
<form onSubmit={handlePinSubmit} className="space-y-4">
<input
             type="password"
             placeholder="Enter 4-digit PIN (e.g. 4860)"
             value={pin}
             maxLength={4}
             onChange={(e) => setPin(e.target.value)}
             className="w-full text-center tracking-widest text-lg font-mono bg-slate-950 text-white placeholder-slate-600 px-4 py-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"
           />
           {pinError && (
<p className="text-xs text-rose-400 font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
               {pinError}
</p>
           )}
<button
             type="submit"
             className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black py-3.5 rounded-2xl text-xs transition shadow-lg cursor-pointer"
>
             🔓 Unlock Admin Panel
</button>
</form>
<div className="text-[10px] text-slate-500">
           LearnBuild Hub Control Center 🚀
</div>
</div>
</div>
   );
 }
 return (
<div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
<div className="max-w-2xl mx-auto space-y-6">
       {/* Top Header */}
<div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
<div>
<h1 className="text-base sm:text-xl font-black text-white">LearnBuild Hub Admin 🚀</h1>
<p className="text-xs text-slate-400 mt-0.5">Vendor Subscriptions & System Control</p>
</div>
<div className="flex items-center gap-2">
<button
             onClick={() => setShowAddModal(true)}
             className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 rounded-2xl text-xs font-black transition shadow-md flex items-center gap-1 cursor-pointer"
>
             ➕ Add Vendor
</button>
<button
             onClick={fetchVendors}
             className="bg-violet-600 hover:bg-violet-500 text-white px-3 py-2.5 rounded-2xl text-xs font-bold transition shadow-md cursor-pointer"
>
             🔄
</button>
</div>
</div>
       {/* Search Bar for Vendors */}
<div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-sm">
<input
           type="text"
           placeholder="🔍 Search vendor by shop name, slug, or WhatsApp..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"
         />
</div>
       {/* Vendors List */}
       {loading ? (
<div className="text-center py-12 text-slate-400 text-xs font-semibold animate-pulse">
           Loading vendors data...
</div>
       ) : filteredVendors.length === 0 ? (
<div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
           No vendors found matching your search!
</div>
       ) : (
<div className="space-y-4">
           {filteredVendors.map((vendor) => {
             const expiryDate = new Date(vendor.subscription_expires_at);
             const isExpired = vendor.subscription_expires_at && expiryDate < new Date();
             return (
<div
                 key={vendor.id}
                 className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-md"
>
<div className="flex justify-between items-start">
<div>
<h3 className="font-bold text-base text-white">{vendor.shop_name}</h3>
<p className="text-[11px] text-slate-400 mt-0.5">
                       Slug: <span className="text-violet-400 font-mono">/{vendor.slug}</span> | WhatsApp: {vendor.owner_whatsapp}
</p>
</div>
<span
                     className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
                       isExpired
                         ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                         : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                     }`}
>
                     {isExpired ? '⏳ Expired' : '✅ Active'}
</span>
</div>
<div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 flex justify-between items-center">
<span>Subscription Expires On:</span>
<span className="font-bold text-slate-200">
                     {vendor.subscription_expires_at
                       ? new Date(vendor.subscription_expires_at).toLocaleString()
                       : 'No Expiry Set'}
</span>
</div>
                 {/* Actions & Renewal Dropdown */}
<div className="flex items-center gap-2 pt-1">
<a
                     href={`/${vendor.slug}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center py-2.5 rounded-2xl text-xs font-bold border border-slate-700 transition"
>
                     👁️ Menu
</a>
<a
                     href={`/${vendor.slug}/admin`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 bg-violet-950/80 hover:bg-violet-900 text-violet-300 text-center py-2.5 rounded-2xl text-xs font-bold border border-violet-800/50 transition"
>
                     🛠️ Edit Menu
</a>
<div className="flex-1">
<select
                       defaultValue=""
                       onChange={(e) => {
                         handleRenewalChange(vendor, e.target.value);
                         e.target.value = "";
                       }}
                       className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 px-3 rounded-2xl text-xs font-bold border border-violet-500 transition cursor-pointer focus:outline-none"
>
<option value="" disabled className="bg-slate-900 text-slate-400">
                         🔄 Renew
</option>
<option value="1" className="bg-slate-900 text-white">
                         + 1 Month (30 Days)
</option>
<option value="6" className="bg-slate-900 text-white">
                         + 6 Months
</option>
<option value="12" className="bg-slate-900 text-white">
                         + 1 Year (12 Months)
</option>
</select>
</div>
</div>
</div>
             );
           })}
</div>
       )}
</div>
     {/* ==========================================
         ADD NEW VENDOR MODAL POPUP
        ========================================== */}
     {showAddModal && (
<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
<div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-5">
<div className="flex justify-between items-center border-b border-slate-800 pb-3">
<h2 className="text-base font-black text-white flex items-center gap-2">
<span>➕</span> Add New Vendor / Restaurant
</h2>
<button
               onClick={() => setShowAddModal(false)}
               className="text-slate-400 hover:text-white text-sm font-bold p-1"
>
               ✕
</button>
</div>
<form onSubmit={handleAddVendor} className="space-y-4">
<div>
<label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                 Shop / Restaurant Name *
</label>
<input
                 type="text"
                 placeholder="e.g. Sharma Ji Fast Food"
                 value={newShopName}
                 onChange={(e) => {
                   setNewShopName(e.target.value);
                   // Auto-generate slug from name
                   setNewSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
                 }}
                 className="w-full bg-slate-950 text-white placeholder-slate-600 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"
                 required
               />
</div>
<div>
<label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                 Custom URL Slug * (e.g. sharma-ji)
</label>
<input
                 type="text"
                 placeholder="sharma-ji"
                 value={newSlug}
                 onChange={(e) => setNewSlug(e.target.value)}
                 className="w-full bg-slate-950 text-white placeholder-slate-600 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500 transition font-mono"
                 required
               />
</div>
<div>
<label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                 Owner WhatsApp Number * (with country code)
</label>
<input
                 type="text"
                 placeholder="e.g. 918149565351"
                 value={newOwnerWhatsapp}
                 onChange={(e) => setNewOwnerWhatsapp(e.target.value)}
                 className="w-full bg-slate-950 text-white placeholder-slate-600 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"
                 required
               />
</div>
<div>
<label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                 Initial Subscription Plan *
</label>
<select
                 value={newSubMonths}
                 onChange={(e) => setNewSubMonths(e.target.value)}
                 className="w-full bg-slate-950 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500 transition cursor-pointer"
>
<option value="1">1 Month (30 Days Trial)</option>
<option value="6">6 Months (Smart Plan)</option>
<option value="12">1 Year (VIP Annual Plan)</option>
</select>
</div>
<div className="flex gap-2 pt-2">
<button
                 type="button"
                 onClick={() => setShowAddModal(false)}
                 className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-bold transition"
>
                 Cancel
</button>
<button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-black transition shadow-lg disabled:opacity-50"
>
                 {isSubmitting ? 'Adding...' : 'Save & Register 🚀'}
</button>
</div>
</form>
</div>
</div>
     )}
</div>
 );
}
