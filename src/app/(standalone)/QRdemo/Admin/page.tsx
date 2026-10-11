'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default function AdminDashboard() {
 const [vendors, setVendors] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
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
   fetchVendors();
 }, []);
 // Smart Expiry Calculation Logic
 // Agar subscription abhi active hai, toh purani expiry date se aage extend hoga, warna aaj ki date se.
 const calculateNewExpiryDate = (currentExpiry: string | null, months: number) => {
   let baseDate = new Date();
   if (currentExpiry) {
     const expDate = new Date(currentExpiry);
     if (expDate > baseDate) {
       baseDate = expDate;
     }
   }
   if (months === 1) {
     baseDate.setDate(baseDate.getDate() + 30); // 30 Days / 1 Month
   } else if (months === 6) {
     baseDate.setMonth(baseDate.getMonth() + 6); // 6 Months
   } else if (months === 12) {
     baseDate.setFullYear(baseDate.getFullYear() + 1); // 1 Year (12 Months)
   }
   return baseDate.toISOString();
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
     fetchVendors(); // Refresh vendor list
   }
 };
 // State add karo
const [searchQuery, setSearchQuery] = useState('');
// Filtered vendors list
const filteredVendors = vendors.filter((v) =>
 v.shop_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
 v.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
 v.owner_whatsapp?.includes(searchQuery)
);
 return (
<div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
 <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
<input
           type="text"
           placeholder="🔍 Search vendor by shop name, slug or WhatsApp..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500"
         />
</div>
<div className="max-w-2xl mx-auto space-y-6">
       {/* Top Header */}
<div className="flex justify-between items-center bg-slate-900 p-5 rounded-2xl border border-slate-800">
<div>
<h1 className="text-xl font-black text-white">LearnBuild Hub Admin 🚀</h1>
<p className="text-xs text-slate-400 mt-0.5">Vendor Subscriptions & Package Management</p>
</div>
<button
           onClick={fetchVendors}
           className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md"
>
           Refresh List 🔄
</button>
</div>
       {/* Vendors List */}
       {loading ? (
<div className="text-center py-12 text-slate-400 text-xs font-semibold animate-pulse">
           Loading vendors data...
</div>
       ) : vendors.length === 0 ? (
<div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
           No vendors found!
</div>
       ) : (
<div className="space-y-4">
           {vendors.map((vendor) => {
             const expiryDate = new Date(vendor.subscription_expires_at);
             const isExpired = vendor.subscription_expires_at && expiryDate < new Date();
             return (
<div
                 key={vendor.id}
                 className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm"
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
                     {isExpired ? '⏳ Inactive / Expired' : '✅ Active'}
</span>
</div>
<div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 flex justify-between items-center">
<span>Expires On:</span>
<span className="font-bold text-slate-200">
                     {vendor.subscription_expires_at
                       ? new Date(vendor.subscription_expires_at).toLocaleString()
                       : 'No Expiry Set'}
</span>
</div>
                 {/* Action Section with View Menu & Dropdown for Renewal */}
<div className="flex items-center gap-3 pt-1">
<a
                     href={`/${vendor.slug}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition"
>
                     👁️ View Menu
</a>
<div className="flex-1">
<select
                       defaultValue=""
                       onChange={(e) => {
                         handleRenewalChange(vendor, e.target.value);
                         e.target.value = ""; // Reset dropdown after selection
                       }}
                       className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 px-3 rounded-xl text-xs font-bold border border-violet-500 transition cursor-pointer focus:outline-none"
>
<option value="" disabled className="bg-slate-900 text-slate-400">
                         🔄 Renew Subscription
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
</div>
 );
}
