'use client';

import { useState, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';

import { useParams } from 'next/navigation';

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

const categories = ['All', 'Starters', 'Beverages', 'Chinese', 'Main Course'];

export default function QRMenuDemo() {

  const params = useParams();

  const vendorSlug = params?.vendorSlug as string;

  const [vendor, setVendor] = useState<any>(null);

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showSplash, setShowSplash] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  const [menuSearch, setMenuSearch] = useState('');

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [orderType, setOrderType] = useState<'dine-in' | 'delivery'>('dine-in');

  const [customerName, setCustomerName] = useState('');

  const [tableNumber, setTableNumber] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Fetch Vendor details and their specific Menu Items from Supabase

  useEffect(() => {

    if (vendorSlug) {

      fetchVendorAndMenu();

    }

  }, [vendorSlug]);

  const fetchVendorAndMenu = async () => {

    setLoading(true);

    // 1. Fetch vendor by slug

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

    const vData = vendorData as any;

    const expiryDate = new Date(vData?.subscription_expires_at);

    const currentDate = new Date();

    if (vData?.subscription_expires_at && expiryDate < currentDate) {

      setVendor({ ...vData, isExpired: true });

      setLoading(false);

      return;

    }

    setVendor(vData);

    // 2. Fetch menu items belonging to this vendor's ID

    const { data: itemsData, error: itemsError } = await supabase

      .from('vendor_menu_items')

      .select('*')

      .eq('vendor_id', vData.id);

    if (itemsError) {

      console.error('Error fetching menu items:', itemsError.message);

      setMenuItems([]);

    } else {

      setMenuItems(itemsData || []);

    }

    setLoading(false);

  };

  // Auto-hide Splash Screen after 2.2 seconds

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2200);

    return () => clearTimeout(timer);

  }, []);

  // Filter items based on category and search query

  const filteredItems = menuItems.filter((item) => {

    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||

                          (item.description && item.description.toLowerCase().includes(menuSearch.toLowerCase()));

    return matchesCategory && matchesSearch;

  });

  // Cart operations (using item.id which is UUID string)

  const updateQuantity = (id: string, delta: number) => {

    setCart((prev) => {

      const current = prev[id] || 0;

      const updated = current + delta;

      if (updated <= 0) {

        const { [id]: _, ...rest } = prev;

        return rest;

      }

      return { ...prev, [id]: updated };

    });

  };

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {

    const item = menuItems.find((m) => m.id === id);

    return sum + (item ? Number(item.price) * qty : 0);

  }, 0);

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Send WhatsApp Order

  const handleWhatsAppOrder = () => {

    setErrorMessage('');

    if (!customerName.trim()) {

      setErrorMessage('⚠️ Kripya apna naam (Full Name) bharein!');

      return;

    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {

      setErrorMessage('⚠️ Kripya apna Table / Seat Number bharein!');

      return;

    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {

      setErrorMessage('⚠️ Kripya apna Delivery Address bharein!');

      return;

    }

    if (totalItemsCount === 0) {

      setErrorMessage('⚠️ Kripya menu se kam se kam ek item add karein!');

      return;

    }

    const shopTitle = vendor?.shop_name || 'QR Menu';

    const targetNumber = vendor?.owner_whatsapp;

    if (!targetNumber) {

      setErrorMessage('❌ Vendor WhatsApp contact missing!');

      return;

    }

    let msg = `🛒 *NEW ORDER - ${shopTitle.toUpperCase()}*\n\n`;

    msg += `👤 *Customer Name:* ${customerName}\n`;

    msg += `📌 *Order Type:* ${orderType === 'dine-in' ? 'Dine-In (Stall)' : 'Home Delivery'}\n`;

    if (orderType === 'dine-in') {

      msg += `🪑 *Table/Seat No:* ${tableNumber}\n`;

    } else {

      msg += `🏠 *Delivery Address:* ${deliveryAddress}\n`;

    }

    msg += `\n📋 *ITEMS ORDERED:*\n`;

    Object.entries(cart).forEach(([id, qty]) => {

      const item = menuItems.find((m) => m.id === id);

      if (item) {

        msg += `• ${item.name} x ${qty} = ₹${Number(item.price) * qty}\n`;

      }

    });

    msg += `\n💰 *TOTAL AMOUNT:* ₹${totalAmount}\n`;

    msg += `\nPlease confirm my order!`;

    const encodedMsg = encodeURIComponent(msg);

    window.open(`https://wa.me/${targetNumber}?text=${encodedMsg}`, '_blank');

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
<h1 className="text-xl font-bold text-red-400">Shop Not Found ❌</h1>
<p className="text-xs text-slate-400 mt-2">

            Yeh QR menu inactive hai ya URL galat hai.
</p>
</div>
</div>

    );

  }

  if (vendor?.isExpired) {

    return (
<div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
<div className="bg-rose-500/10 border border-rose-500/30 p-8 rounded-3xl max-w-sm space-y-3 shadow-2xl">
<span className="text-4xl">⏳</span>
<h1 className="text-xl font-bold text-rose-400">Subscription Expired</h1>
<p className="text-xs text-slate-400">

            Is shop ka digital menu ka subscription khatam ho gaya hai. Kripya dukaandaar se sampark karein.
</p>
<div className="pt-2 text-[10px] text-slate-500 font-medium">

            Powered by LearnBuild Hub 🚀
</div>
</div>
</div>

    );

  }

  return (
<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">

      {/* Grand Splash Screen */}

      {showSplash && (
<div className="fixed inset-0 bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-600 flex flex-col items-center justify-center z-50 text-white p-6 shadow-2xl transition-opacity duration-700">
<div className="animate-bounce mb-6 bg-white/20 p-6 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl">
<span className="text-6xl">🍔</span>
</div>
<h1 className="text-3xl font-black tracking-tight text-center drop-shadow-lg text-white">

            {vendor.shop_name}
</h1>
<p className="text-pink-100 text-xs mt-3 font-bold tracking-wider uppercase bg-black/25 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">

            ⚡ SCAN. SELECT. WHATSAPP ORDER.
</p>
<div className="absolute bottom-8 text-xs text-white/80 font-semibold tracking-wider">

            Powered by LearnBuild Hub 🚀
</div>
</div>

      )}

      {/* Vibrant Header Banner */}
<div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white p-5 shadow-xl sticky top-0 z-30">
<div className="max-w-md mx-auto flex justify-between items-center">
<div>
<h2 className="text-lg font-black tracking-wide flex items-center gap-1.5">

              {vendor.shop_name} 🌟
</h2>
<p className="text-[11px] text-violet-200 font-medium tracking-wide">✨ Live QR Digital Menu</p>
</div>
<span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-black border border-white/30 shadow-sm">

            LEARNBUILD HUB
</span>
</div>
</div>
<div className="max-w-md mx-auto p-4 space-y-4">

        {/* Order Type Toggle */}
<div className="grid grid-cols-2 gap-2 bg-slate-200/90 p-1.5 rounded-2xl border border-slate-300/80 shadow-inner">
<button

            onClick={() => setOrderType('dine-in')}

            className={`py-3 text-xs font-black rounded-xl transition shadow-sm ${

              orderType === 'dine-in'

                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'

                : 'text-slate-600 hover:text-slate-900'

            }`}
>

            🍽️ Dine-In (Stall)
</button>
<button

            onClick={() => setOrderType('delivery')}

            className={`py-3 text-xs font-black rounded-xl transition shadow-sm ${

              orderType === 'delivery'

                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'

                : 'text-slate-600 hover:text-slate-900'

            }`}
>

            🛵 Home Delivery
</button>
</div>

        {/* Customer Details Input Card */}
<div className="bg-white p-4 rounded-3xl shadow-md border border-slate-200/90 space-y-3">
<h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
<span>👤 Customer Details</span> <span className="text-rose-500">*</span>
</h3>
<input

            type="text"

            placeholder="Your Full Name *"

            value={customerName}

            onChange={(e) => setCustomerName(e.target.value)}

            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-600 focus:bg-white transition"

          />

          {orderType === 'dine-in' ? (
<input

              type="text"

              placeholder="Table / Seat Number * (e.g. Table 4)"

              value={tableNumber}

              onChange={(e) => setTableNumber(e.target.value)}

              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-600 focus:bg-white transition"

            />

          ) : (
<textarea

              placeholder="Full Delivery Address *"

              value={deliveryAddress}

              onChange={(e) => setDeliveryAddress(e.target.value)}

              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-600 focus:bg-white transition h-16 resize-none"

            />

          )}
</div>

        {errorMessage && (
<div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs font-bold shadow-sm">

            {errorMessage}
</div>

        )}

        {/* Search Bar for Menu Items */}
<div className="relative">
<input

            type="text"

            placeholder="🔍 Search dishes..."

            value={menuSearch}

            onChange={(e) => setMenuSearch(e.target.value)}

            className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-medium px-4 py-3.5 rounded-2xl border border-slate-200/90 shadow-md focus:outline-none focus:border-violet-600 transition"

          />
</div>

        {/* Category Tabs */}
<div className="flex gap-2 overflow-x-auto no-scrollbar py-1">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setActiveCategory(cat)}

              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition shadow-sm ${

                activeCategory === cat

                  ? 'bg-violet-600 text-white shadow-md scale-105'

                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'

              }`}
>

              {cat}
</button>

          ))}
</div>

        {/* Dynamic Menu Items List from Supabase */}
<div className="space-y-3.5">

          {filteredItems.length === 0 ? (
<div className="text-center py-10 bg-white rounded-3xl border border-slate-200 p-6 text-slate-400 text-xs font-semibold shadow-sm">

              No menu items found for this shop yet! Add items from Supabase. 🍽️
</div>

          ) : (

            filteredItems.map((item) => {

              const qty = cart[item.id] || 0;

              return (
<div

                  key={item.id}

                  className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/90 flex justify-between items-center gap-3 transition"
>
<div className="space-y-1.5">
<span className="text-[10px] font-black px-2.5 py-1 rounded-lg border bg-violet-50 text-violet-800 border-violet-200">

                      {item.category}
</span>
<h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>

                    {item.description && (
<p className="text-[11px] text-slate-500 font-medium">{item.description}</p>

                    )}
<p className="font-black text-sm text-violet-700">₹{item.price}</p>
</div>
<div className="flex items-center gap-2">

                    {qty === 0 ? (
<button

                        onClick={() => updateQuantity(item.id, 1)}

                        className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 px-4 py-2.5 rounded-2xl font-black text-xs transition shadow-sm"
>

                        + Add
</button>

                    ) : (
<div className="flex items-center bg-violet-600 text-white rounded-2xl overflow-hidden shadow-md">
<button

                          onClick={() => updateQuantity(item.id, -1)}

                          className="px-3.5 py-2 font-black hover:bg-violet-700 transition text-xs"
>

                          -
</button>
<span className="px-2.5 font-black text-xs">{qty}</span>
<button

                          onClick={() => updateQuantity(item.id, 1)}

                          className="px-3.5 py-2 font-black hover:bg-violet-700 transition text-xs"
>

                          +
</button>
</div>

                    )}
</div>
</div>

              );

            })

          )}
</div>
</div>

      {/* Floating Bottom Cart Bar */}

      {totalItemsCount > 0 && (
<div className="fixed bottom-5 left-4 right-4 max-w-md mx-auto z-40">
<div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border border-slate-700 flex justify-between items-center">
<div>
<p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Cart</p>
<p className="font-black text-sm text-emerald-400">

                {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} | ₹{totalAmount}
</p>
</div>
<button

              onClick={handleWhatsAppOrder}

              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 transition shadow-lg transform active:scale-95"
>
<span>Send Order</span>
<span>💬</span>
</button>
</div>
</div>

      )}
</div>

  );

}
 
