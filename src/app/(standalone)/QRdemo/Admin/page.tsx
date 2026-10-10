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
 // Package Duration Calculation Function (1 Month / 6 Months / 1 Year)
 const calculateNewExpiryDate = (months: number) => {
   const date = new Date(); // Current date se calculate hoga
   if (months === 1) {
     date.setDate(date.getDate() + 30); // 30 Days
   } else if (months === 6) {
     date.setMonth(date.getMonth() + 6); // 6 Months
   } else if (months === 12) {
     date.setFullYear(date.getFullYear() + 1); // 1 Year
   }
   return date.toISOString();
 };
 // Extend or Update Subscription Expiry
 const handleExtendSubscription = async (vendorId: string, months: number) => {
   const newExpiry = calculateNewExpiryDate(months);
   const { error } = await supabase
     .from('vendors')
     .update({ subscription_expires_at: newExpiry })
     .eq('id', vendorId);
   if (error) {
     alert('Error updating subscription: ' + error.message);
   } else {
     alert(`Subscription successfully extended for ${months === 1 ? '1 Month (30 Days)' : months === 6 ? '6 Months' : '1 Year'}!`);
     fetchVendors(); // Refresh list
   }
 };
 return (
<div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
<div className="max-w-2xl mx-auto space-y-6">
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
                 {/* Package Duration Action Buttons */}
<div className="space-y-2 pt-1">
<p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                     Assign Package / Extend Duration:
</p>
<div className="grid grid-cols-3 gap-2">
<button
                       onClick={() => handleExtendSubscription(vendor.id, 1)}
                       className="bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 py-2 rounded-xl text-xs font-bold transition"
>
                       + 1 Month (30D)
</button>
<button
                       onClick={() => handleExtendSubscription(vendor.id, 6)}
                       className="bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 py-2 rounded-xl text-xs font-bold transition"
>
                       + 6 Months
</button>
<button
                       onClick={() => handleExtendSubscription(vendor.id, 12)}
                       className="bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 py-2 rounded-xl text-xs font-bold transition"
>
                       + 1 Year
</button>
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
