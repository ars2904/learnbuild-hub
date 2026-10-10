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
 const [message, setMessage] = useState('');
 // 1. Saare Vendors ki list fetch karo
 const fetchVendors = async () => {
   setLoading(true);
   const { data, error } = await supabase
     .from('vendors')
     .select('*')
     .order('created_at', { ascending: false });
   if (error) {
     console.error('Error fetching vendors:', error);
   } else {
     setVendors(data || []);
   }
   setLoading(false);
 };
 useEffect(() => {
   fetchVendors();
 }, []);
 // 2. 30 Days Extend karne ka function
 const handleExtendSubscription = async (slug: string, currentExpiry: string) => {
   // Agar expiry date nikal chuki hai toh aaj se 30 din jodo, warna purani expiry me 30 din aage badhao
   const baseDate = new Date(currentExpiry) > new Date() ? new Date(currentExpiry) : new Date();
   baseDate.setDate(baseDate.getDate() + 30);
   const { error } = await supabase
     .from('vendors')
     .update({ subscription_expires_at: baseDate.toISOString() })
     .eq('slug', slug);
   if (error) {
     setMessage(`❌ Error updating ${slug}: ${error.message}`);
   } else {
     setMessage(`✅ Success! ${slug} ka subscription 30 din extend ho gaya hai.`);
     fetchVendors(); // List refresh karo
   }
 };
 return (
<div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
<div className="max-w-4xl mx-auto">
<div className="flex justify-between items-center mb-8">
<div>
<h1 className="text-2xl md:text-3xl font-black text-emerald-400">LearnBuild Hub Admin</h1>
<p className="text-xs text-gray-400 mt-1">Vendor Subscriptions & QR Management Dashboard</p>
</div>
<button
           onClick={fetchVendors}
           className="bg-gray-800 hover:bg-gray-700 text-xs px-4 py-2 rounded-xl border border-gray-700 transition"
>
           🔄 Refresh List
</button>
</div>
       {message && (
<div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-semibold">
           {message}
</div>
       )}
       {loading ? (
<div className="text-center py-20 text-gray-500">Loading vendors data...</div>
       ) : vendors.length === 0 ? (
<div className="text-center py-20 bg-gray-800/50 rounded-3xl border border-gray-800">
<p className="text-gray-400 text-sm">Koi bhi vendor registered nahi hai database me.</p>
</div>
       ) : (
<div className="grid gap-4">
           {vendors.map((vendor) => {
             const isExpired = new Date() > new Date(vendor.subscription_expires_at);
             return (
<div
                 key={vendor.id}
                 className="bg-gray-800/60 border border-gray-700/60 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg"
>
<div className="space-y-1">
<div className="flex items-center gap-2">
<h3 className="font-bold text-lg text-white">{vendor.shop_name}</h3>
<span
                       className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                         isExpired
                           ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                           : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                       }`}
>
                       {isExpired ? '🔴 INACTIVE' : '🟢 ACTIVE'}
</span>
</div>
<p className="text-xs text-gray-400">
                     Slug: <code className="text-yellow-400">/{vendor.slug}</code> | WhatsApp: {vendor.owner_whatsapp}
</p>
<p className="text-xs text-gray-400">
                     Expires On:{' '}
<span className={isExpired ? 'text-red-400 font-bold' : 'text-gray-200'}>
                       {new Date(vendor.subscription_expires_at).toLocaleDateString('en-IN', {
                         day: 'numeric',
                         month: 'short',
                         year: 'numeric',
                         hour: '2-digit',
                         minute: '2-digit',
                       })}
</span>
</p>
</div>
<div className="flex items-center gap-3 w-full md:w-auto">
<a
                     href={`/${vendor.slug}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-xs bg-gray-700 hover:bg-gray-600 px-4 py-2.5 rounded-xl font-medium text-center transition"
>
                     👁️ View Menu
</a>
<button
                     onClick={() => handleExtendSubscription(vendor.slug, vendor.subscription_expires_at)}
                     className="flex-1 md:flex-none text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition"
>
                     ➕ Extend +30 Days
</button>
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
