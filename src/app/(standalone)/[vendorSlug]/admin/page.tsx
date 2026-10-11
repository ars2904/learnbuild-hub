'use client';

import { useState, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';

import { useParams } from 'next/navigation';

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

const categories = ['Starters', 'Beverages', 'Chinese', 'Main Course', 'Desserts'];

export default function VendorMenuAdmin() {

  const params = useParams();

  const vendorSlug = params?.vendorSlug as string;

  const [vendor, setVendor] = useState<any>(null);

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // Form states for adding / editing menu item

  const [name, setName] = useState('');

  const [price, setPrice] = useState('');

  const [category, setCategory] = useState('Starters');

  const [description, setDescription] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null); // Track item being edited

  const [submitting, setSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  // Fetch Vendor & Menu Items

  useEffect(() => {

    if (vendorSlug) {

      fetchVendorAndMenu();

    }

  }, [vendorSlug]);

  const fetchVendorAndMenu = async () => {

    setLoading(true);

    const { data: vendorData, error: vendorError } = await supabase

      .from('vendors')

      .select('*')

      .eq('slug', vendorSlug)

      .maybeSingle();

    if (vendorError || !vendorData) {

      console.error('Error fetching vendor:', vendorError?.message);

      setVendor(null);

      setLoading(false);

      return;

    }

    setVendor(vendorData);

    const { data: itemsData, error: itemsError } = await supabase

      .from('vendor_menu_items')

      .select('*')

      .eq('vendor_id', vendorData.id)

      .order('created_at', { ascending: false });

    if (itemsError) {

      console.error('Error fetching items:', itemsError.message);

    } else {

      setMenuItems(itemsData || []);

    }

    setLoading(false);

  };

  // Handle Form Submit (Add or Update)

  const handleSubmitItem = async (e: React.FormEvent) => {

    e.preventDefault();

    setErrorMessage('');

    if (!name.trim() || !price.trim()) {

      setErrorMessage('⚠️ Kripya item ka naam aur price bharein!');

      return;

    }

    setSubmitting(true);

    if (editingId) {

      // Update existing item

      const { error } = await supabase

        .from('vendor_menu_items')

        .update({

          name: name.trim(),

          price: Number(price),

          category: category,

          description: description.trim(),

        })

        .eq('id', editingId);

      if (error) {

        setErrorMessage('❌ Error updating item: ' + error.message);

      } else {

        resetForm();

        fetchVendorAndMenu();

      }

    } else {

      // Insert new item

      const { error } = await supabase.from('vendor_menu_items').insert([

        {

          vendor_id: vendor.id,

          name: name.trim(),

          price: Number(price),

          category: category,

          description: description.trim(),

        },

      ]);

      if (error) {

        setErrorMessage('❌ Error adding item: ' + error.message);

      } else {

        resetForm();

        fetchVendorAndMenu();

      }

    }

    setSubmitting(false);

  };

  // Populate form for editing

  const handleEditClick = (item: any) => {

    setEditingId(item.id);

    setName(item.name);

    setPrice(item.price.toString());

    setCategory(item.category);

    setDescription(item.description || '');

    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to form

  };

  // Reset Form

  const resetForm = () => {

    setName('');

    setPrice('');

    setDescription('');

    setCategory('Starters');

    setEditingId(null);

  };

  // Delete Item Handler

  const handleDeleteItem = async (itemId: string) => {

    if (!confirm('Kya aap is item ko delete karna chahte hain?')) return;

    const { error } = await supabase

      .from('vendor_menu_items')

      .delete()

      .eq('id', itemId);

    if (error) {

      alert('Error deleting item: ' + error.message);

    } else {

      fetchVendorAndMenu();

    }

  };

  if (loading) {

    return (
<div className="min-h-screen bg-slate-950 flex items-center justify-center">
<div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
</div>

    );

  }

  if (!vendor) {

    return (
<div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
<div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl max-w-sm shadow-xl">
<h1 className="text-xl font-bold text-red-400">Vendor Not Found ❌</h1>
<p className="text-xs text-slate-400 mt-2">Yeh admin URL galat hai.</p>
</div>
</div>

    );

  }

  return (
<div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans pb-24">
<div className="max-w-xl mx-auto space-y-6">

        {/* Top Header */}
<div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
<div>
<h1 className="text-lg font-black text-white">{vendor.shop_name} 🛠️</h1>
<p className="text-xs text-violet-400 mt-0.5 font-mono">Menu Management Dashboard</p>
</div>
<a

            href={`/${vendor.slug}`}

            target="_blank"

            rel="noopener noreferrer"

            className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-md"
>

            👁️ View Menu
</a>
</div>

        {/* Add / Edit Menu Item Form */}
<div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
<div className="flex justify-between items-center">
<h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
<span>{editingId ? '✏️ Edit Menu Item' : '➕ Add New Dish / Item'}</span>
</h2>

            {editingId && (
<button

                onClick={resetForm}

                className="text-[10px] bg-slate-800 text-slate-300 px-3 py-1 rounded-xl font-bold hover:bg-slate-700 transition"
>

                Cancel Edit ✕
</button>

            )}
</div>
<form onSubmit={handleSubmitItem} className="space-y-3.5">
<div>
<label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Item Name *</label>
<input

                type="text"

                placeholder="e.g. Masala Chai, Veg Burger..."

                value={name}

                onChange={(e) => setName(e.target.value)}

                className="w-full mt-1 bg-slate-950 text-white placeholder-slate-600 text-xs px-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"

              />
</div>
<div className="grid grid-cols-2 gap-3">
<div>
<label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Price (₹) *</label>
<input

                  type="number"

                  placeholder="e.g. 50"

                  value={price}

                  onChange={(e) => setPrice(e.target.value)}

                  className="w-full mt-1 bg-slate-950 text-white placeholder-slate-600 text-xs px-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"

                />
</div>
<div>
<label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category *</label>
<select

                  value={category}

                  onChange={(e) => setCategory(e.target.value)}

                  className="w-full mt-1 bg-slate-950 text-white text-xs px-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-violet-500 transition cursor-pointer"
>

                  {categories.map((cat) => (
<option key={cat} value={cat} className="bg-slate-900 text-white">

                      {cat}
</option>

                  ))}
</select>
</div>
</div>
<div>
<label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Description (Optional)</label>
<input

                type="text"

                placeholder="e.g. Garam garam aur masaledaar..."

                value={description}

                onChange={(e) => setDescription(e.target.value)}

                className="w-full mt-1 bg-slate-950 text-white placeholder-slate-600 text-xs px-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-violet-500 transition"

              />
</div>

            {errorMessage && (
<p className="text-xs text-rose-400 font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">

                {errorMessage}
</p>

            )}
<button

              type="submit"

              disabled={submitting}

              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black py-3 rounded-2xl text-xs transition shadow-lg mt-2 cursor-pointer"
>

              {submitting ? 'Saving...' : editingId ? '💾 Update Menu Item' : '🚀 Save & Add Item'}
</button>
</form>
</div>

        {/* Existing Menu Items List */}
<div className="space-y-3">
<h2 className="text-sm font-black text-slate-300 uppercase tracking-wider px-1">

            📋 Existing Menu Items ({menuItems.length})
</h2>

          {menuItems.length === 0 ? (
<div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">

              No items added yet. Use the form above to add dishes! 🍽️
</div>

          ) : (

            menuItems.map((item) => (
<div

                key={item.id}

                className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex justify-between items-center gap-3 shadow-md"
>
<div className="space-y-1">
<span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">

                    {item.category}
</span>
<h4 className="font-bold text-sm text-white">{item.name}</h4>

                  {item.description && (
<p className="text-[11px] text-slate-400">{item.description}</p>

                  )}
<p className="text-xs font-black text-emerald-400">₹{item.price}</p>
</div>
<div className="flex items-center gap-2">
<button

                    onClick={() => handleEditClick(item)}

                    className="bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 border border-violet-500/30 px-3 py-2 rounded-2xl text-xs font-bold transition"
>

                    ✏️ Edit
</button>
<button

                    onClick={() => handleDeleteItem(item.id)}

                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-2 rounded-2xl text-xs font-bold transition"
>

                    🗑️ Delete
</button>
</div>
</div>

            ))

          )}
</div>
</div>
</div>

  );

}
 
