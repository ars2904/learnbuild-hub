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

  // Form State for Adding New Vendor

  const [showAddForm, setShowAddForm] = useState(false);

  const [shopName, setShopName] = useState('');

  const [slug, setSlug] = useState('');

  const [ownerWhatsapp, setOwnerWhatsapp] = useState('');

  const [validDays, setValidDays] = useState(30);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Vendors List

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

  // Auto-generate slug from Shop Name

  const handleShopNameChange = (name: string) => {

    setShopName(name);

    const generatedSlug = name

      .toLowerCase()

      .trim()

      .replace(/[^a-z0-9 -]/g, '')

      .replace(/\s+/g, '-')

      .replace(/-+/g, '-');

    setSlug(generatedSlug);

  };

  // 2. Add New Vendor to Supabase

  const handleAddVendor = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!shopName || !slug || !ownerWhatsapp) {

      setMessage('⚠️ Kripya saari details dhang se bharein!');

      return;

    }

    setIsSubmitting(true);

    setMessage('');

    // Expiry date calculation

    const expiryDate = new Date();

    expiryDate.setDate(expiryDate.getDate() + Number(validDays));

    const { error } = await supabase.from('vendors').insert([

      {

        shop_name: shopName,

        slug: slug,

        owner_whatsapp: ownerWhatsapp,

        subscription_expires_at: expiryDate.toISOString(),

      },

    ]);

    if (error) {

      setMessage(`❌ Error adding vendor: ${error.message}`);

    } else {

      setMessage(`✅ Success! ${shopName} add ho gaya hai (${validDays} days active).`);

      setShopName('');

      setSlug('');

      setOwnerWhatsapp('');

      setShowAddForm(false);

      fetchVendors(); // List refresh

    }

    setIsSubmitting(false);

  };

  // 3. Extend Subscription by 30 Days

  const handleExtendSubscription = async (vendorSlug: string, currentExpiry: string) => {

    const baseDate = new Date(currentExpiry) > new Date() ? new Date(currentExpiry) : new Date();

    baseDate.setDate(baseDate.getDate() + 30);

    const { error } = await supabase

      .from('vendors')

      .update({ subscription_expires_at: baseDate.toISOString() })

      .eq('slug', vendorSlug);

    if (error) {

      setMessage(`❌ Error updating ${vendorSlug}: ${error.message}`);

    } else {

      setMessage(`✅ Success! ${vendorSlug} ka plan 30 din extend ho gaya.`);

      fetchVendors();

    }

  };

  return (
<div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
<div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
<div>
<h1 className="text-2xl md:text-3xl font-black text-emerald-400">LearnBuild Hub Admin</h1>
<p className="text-xs text-gray-400 mt-1">Vendor Subscriptions & QR Management</p>
</div>
<div className="flex gap-2 w-full sm:w-auto">
<button

              onClick={() => setShowAddForm(!showAddForm)}

              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-xs px-4 py-2.5 rounded-xl font-bold transition shadow-lg"
>

              {showAddForm ? '❌ Close Form' : '➕ Add New Vendor'}
</button>
<button

              onClick={fetchVendors}

              className="bg-gray-800 hover:bg-gray-700 text-xs px-4 py-2.5 rounded-xl border border-gray-700 transition"
>

              🔄 Refresh List
</button>
</div>
</div>

        {/* Status Message */}

        {message && (
<div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-semibold">

            {message}
</div>

        )}

        {/* Add Vendor Form Modal/Section */}

        {showAddForm && (
<form

            onSubmit={handleAddVendor}

            className="bg-gray-800/80 border border-emerald-500/30 p-6 rounded-3xl space-y-4 shadow-2xl backdrop-blur-sm"
>
<h2 className="text-lg font-bold text-emerald-400 mb-2">➕ Register New Vendor / Shop</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="text-xs text-gray-300 block mb-1 font-semibold">Shop Name</label>
<input

                  type="text"

                  placeholder="e.g. Gupta Fast Food"

                  value={shopName}

                  onChange={(e) => handleShopNameChange(e.target.value)}

                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"

                  required

                />
</div>
<div>
<label className="text-xs text-gray-300 block mb-1 font-semibold">URL Slug (Auto-generated)</label>
<input

                  type="text"

                  placeholder="e.g. gupta-fast-food"

                  value={slug}

                  onChange={(e) => setSlug(e.target.value)}

                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-yellow-400 focus:outline-none focus:border-emerald-500 font-mono"

                  required

                />
</div>
<div>
<label className="text-xs text-gray-300 block mb-1 font-semibold">Owner WhatsApp Number</label>
<input

                  type="text"

                  placeholder="e.g. 919876543210"

                  value={ownerWhatsapp}

                  onChange={(e) => setOwnerWhatsapp(e.target.value)}

                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"

                  required

                />
</div>
<div>
<label className="text-xs text-gray-300 block mb-1 font-semibold">Initial Validity (Days)</label>
<input

                  type="number"

                  value={validDays}

                  onChange={(e) => setValidDays(Number(e.target.value))}

                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"

                  required

                />
</div>
</div>
<button

              type="submit"

              disabled={isSubmitting}

              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl transition shadow-md disabled:opacity-50 mt-2"
>

              {isSubmitting ? 'Adding Vendor...' : '🚀 Save Vendor & Activate Subscription'}
</button>
</form>

        )}

        {/* Vendors List */}

        {loading ? (
<div className="text-center py-20 text-gray-500 text-sm">Loading vendors...</div>

        ) : vendors.length === 0 ? (
<div className="text-center py-20 bg-gray-800/40 rounded-3xl border border-gray-800">
<p className="text-gray-400 text-sm">Koi bhi vendor database me registered nahi hai.</p>
</div>

        ) : (
<div className="grid gap-4">

            {vendors.map((vendor) => {

              const isExpired = new Date() > new Date(vendor.subscription_expires_at);

              return (
<div

                  key={vendor.id}

                  className="bg-gray-800/60 border border-gray-700/60 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg"
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

                      Slug: <code className="text-yellow-400 font-mono">/{vendor.slug}</code> | WhatsApp: {vendor.owner_whatsapp}
</p>
<p className="text-xs text-gray-400">

                      Expires On:{' '}
<span className={isExpired ? 'text-red-400 font-bold' : 'text-gray-200 font-semibold'}>

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
<div className="flex items-center gap-2 w-full md:w-auto">
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

                      className="flex-1 md:flex-none text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold shadow-md transition"
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
 
