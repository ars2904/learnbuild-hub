'use client';

import { useState, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';

import { useParams } from 'next/navigation';

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

const categories = ['All', 'Starters', 'Beverages', 'Chinese', 'Main Course'];

const menuItems = [

  { id: 1, name: 'Special Adrak Chai', price: 15, category: 'Beverages', desc: 'Garam garam adrak wali chai ☕', bg: 'bg-amber-50 text-amber-900 border-amber-200' },

  { id: 2, name: 'Bun Maska', price: 25, category: 'Starters', desc: 'Classic butter bun 🍞', bg: 'bg-yellow-50 text-yellow-900 border-yellow-200' },

  { id: 3, name: 'Aloo Samosa', price: 15, category: 'Starters', desc: 'Crispy and spicy 🥟', bg: 'bg-orange-50 text-orange-900 border-orange-200' },

  { id: 4, name: 'Cold Coffee', price: 50, category: 'Beverages', desc: 'Thandi thandi creamy coffee 🥤', bg: 'bg-cyan-50 text-cyan-900 border-cyan-200' },

  { id: 5, name: 'Veg Hakka Noodles', price: 80, category: 'Chinese', desc: 'Toss up with fresh veggies 🍜', bg: 'bg-rose-50 text-rose-900 border-rose-200' },

  { id: 6, name: 'Paneer Chilli', price: 120, category: 'Chinese', desc: 'Spicy restaurant style 🌶️', bg: 'bg-red-50 text-red-900 border-red-200' },

  { id: 7, name: 'Dal Tadka & Rice', price: 110, category: 'Main Course', desc: 'Ghar jaisa khana 🍲', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },

];

export default function QRMenuDemo() {

  const params = useParams();

  const vendorSlug = params?.vendorSlug as string;

  const [vendor, setVendor] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [showSplash, setShowSplash] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const [orderType, setOrderType] = useState<'dine-in' | 'delivery'>('dine-in');

  const [customerName, setCustomerName] = useState('');

  const [tableNumber, setTableNumber] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Fetch Vendor details from Supabase using slug with expiry check

  useEffect(() => {

    if (vendorSlug) {

      fetchVendor();

    }

  }, [vendorSlug]);

  const fetchVendor = async () => {

    setLoading(true);

    const { data, error } = await supabase

      .from('vendors')

      .select('*')

      .eq('slug', vendorSlug)

      .maybeSingle();

    if (error) {

      console.error('Error fetching vendor:', error.message);

      setVendor(null);

    } else if (data) {

      const vendorData = data as any;

      const expiryDate = new Date(vendorData?.subscription_expires_at);

      const currentDate = new Date();

      if (vendorData?.subscription_expires_at && expiryDate < currentDate) {

        setVendor({ ...vendorData, isExpired: true });

      } else {

        setVendor(vendorData);

      }

    } else {

      setVendor(null);

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

  // Cart operations

  const updateQuantity = (id: number, delta: number) => {

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

    const item = menuItems.find((m) => m.id === Number(id));

    return sum + (item ? item.price * qty : 0);

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

      const item = menuItems.find((m) => m.id === Number(id));

      if (item) {

        msg += `• ${item.name} x ${qty} = ₹${item.price * qty}\n`;

      }

    });

    msg += `\n💰 *TOTAL AMOUNT:* ₹${totalAmount}\n`;

    msg += `\nPlease confirm my order!`;

    const encodedMsg = encodeURIComponent(msg);

    window.open(`https://wa.me/${targetNumber}?text=${encodedMsg}`, '_blank');

  };

  const filteredItems = activeCategory === 'All' 

    ? menuItems 

    : menuItems.filter((i) => i.category === activeCategory);

  if (loading) {

    return (
<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
<p className="text-sm font-semibold tracking-wider text-emerald-400 animate-pulse">

          ⚡ Loading Digital Menu...
</p>
</div>

    );

  }

  if (!vendor) {

    return (
<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
<div className="bg-red-500/10 border border-red-500/30 p-6 rounded-3xl max-w-sm">
<h1 className="text-xl font-bold text-red-400">Shop Not Found ❌</h1>
<p className="text-xs text-gray-400 mt-2">

            Yeh QR menu inactive hai ya URL galat hai.
</p>
</div>
</div>

    );

  }

  // Subscription Expired Screen

  if (vendor?.isExpired) {

    return (
<div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
<div className="bg-rose-500/10 border border-rose-500/30 p-8 rounded-3xl max-w-sm space-y-3">
<span className="text-4xl">⏳</span>
<h1 className="text-xl font-bold text-rose-400">Subscription Expired</h1>
<p className="text-xs text-slate-400">

            Is shop ka digital menu ka subscription khatam ho gaya hai. Kripya dukaandaar se sampark karein.
</p>
<div className="pt-2 text-[10px] text-slate-500">

            Powered by LearnBuild Hub 🚀
</div>
</div>
</div>

    );

  }

  return (
<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">

      {/* 1. Colorful Splash Screen */}

      {showSplash && (
<div className="fixed inset-0 bg-gradient-to-tr from-orange-600 via-pink-600 to-purple-700 flex flex-col items-center justify-center z-50 text-white p-6 shadow-2xl transition-opacity duration-500">
<div className="animate-bounce mb-5 bg-white/20 p-5 rounded-3xl backdrop-blur-xl border border-white/30">
<span className="text-5xl">🍔</span>
</div>
<h1 className="text-3xl font-black tracking-tight text-center drop-shadow-md text-white">

            {vendor.shop_name}
</h1>
<p className="text-pink-100 text-xs mt-2 font-semibold tracking-wide uppercase bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">

            ⚡ SCAN. SELECT. DIRECT WHATSAPP ORDER.
</p>
<div className="absolute bottom-8 text-xs text-white/80 font-medium tracking-wider">

            Powered by LearnBuild Hub 🚀
</div>
</div>

      )}

      {/* 2. Top Header Banner */}
<div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 shadow-lg sticky top-0 z-30">
<div className="max-w-md mx-auto flex justify-between items-center">
<div>
<h2 className="text-lg font-black tracking-wide flex items-center gap-1">

              {vendor.shop_name} 🌟
</h2>
<p className="text-[10px] text-violet-200 font-medium">Live QR Digital Menu</p>
</div>
<span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-lg font-bold border border-white/20">

            LEARNBUILD HUB
</span>
</div>
</div>
<div className="max-w-md mx-auto p-4 space-y-5">

        {/* Order Type Toggle */}
<div className="grid grid-cols-2 gap-2 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/60">
<button

            onClick={() => setOrderType('dine-in')}

            className={`py-2.5 text-xs font-bold rounded-xl transition ${

              orderType === 'dine-in'

                ? 'bg-violet-600 text-white shadow-md'

                : 'text-slate-600 hover:text-slate-900'

            }`}
>

            🍽️ Dine-In (Stall)
</button>
<button

            onClick={() => setOrderType('delivery')}

            className={`py-2.5 text-xs font-bold rounded-xl transition ${

              orderType === 'delivery'

                ? 'bg-violet-600 text-white shadow-md'

                : 'text-slate-600 hover:text-slate-900'

            }`}
>

            🛵 Home Delivery
</button>
</div>

        {/* Customer Details Input Card */}
<div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 space-y-3">
<h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">

            Customer Details <span className="text-rose-500">*</span>
</h3>
<input

            type="text"

            placeholder="Your Full Name *"

            value={customerName}

            onChange={(e) => setCustomerName(e.target.value)}

            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500"

          />

          {orderType === 'dine-in' ? (
<input

              type="text"

              placeholder="Table / Seat Number * (e.g. Table 4)"

              value={tableNumber}

              onChange={(e) => setTableNumber(e.target.value)}

              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500"

            />

          ) : (
<textarea

              placeholder="Full Delivery Address *"

              value={deliveryAddress}

              onChange={(e) => setDeliveryAddress(e.target.value)}

              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 h-16 resize-none"

            />

          )}
</div>

        {/* Error Notification */}

        {errorMessage && (
<div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">

            {errorMessage}
</div>

        )}

        {/* Category Tabs */}
<div className="flex gap-2 overflow-x-auto no-scrollbar py-1">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setActiveCategory(cat)}

              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${

                activeCategory === cat

                  ? 'bg-violet-600 text-white shadow-md'

                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'

              }`}
>

              {cat}
</button>

          ))}
</div>

        {/* Menu Items List */}
<div className="space-y-3">

          {filteredItems.map((item) => {

            const qty = cart[item.id] || 0;

            return (
<div

                key={item.id}

                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex justify-between items-center gap-3"
>
<div className="space-y-1">
<span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.bg}`}>

                    {item.category}
</span>
<h4 className="font-bold text-sm text-slate-800">{item.name}</h4>
<p className="text-[11px] text-slate-500">{item.desc}</p>
<p className="font-extrabold text-sm text-violet-700">₹{item.price}</p>
</div>
<div className="flex items-center gap-2">

                  {qty === 0 ? (
<button

                      onClick={() => updateQuantity(item.id, 1)}

                      className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 px-4 py-2 rounded-xl font-bold text-xs transition"
>

                      + Add
</button>

                  ) : (
<div className="flex items-center bg-violet-600 text-white rounded-xl overflow-hidden shadow-sm">
<button

                        onClick={() => updateQuantity(item.id, -1)}

                        className="px-3 py-1.5 font-bold hover:bg-violet-700 transition text-xs"
>

                        -
</button>
<span className="px-2 font-black text-xs">{qty}</span>
<button

                        onClick={() => updateQuantity(item.id, 1)}

                        className="px-3 py-1.5 font-bold hover:bg-violet-700 transition text-xs"
>

                        +
</button>
</div>

                  )}
</div>
</div>

            );

          })}
</div>
</div>

      {/* Floating Bottom Cart Bar */}

      {totalItemsCount > 0 && (
<div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
<div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex justify-between items-center">
<div>
<p className="text-[10px] text-slate-400 font-semibold uppercase">Your Cart</p>
<p className="font-black text-sm text-emerald-400">

                {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} | ₹{totalAmount}
</p>
</div>
<button

              onClick={handleWhatsAppOrder}

              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition shadow-lg"
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
 
