'use client';

import { useState, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';

import { useParams } from 'next/navigation';

import { Utensils, Search, Sparkles, Leaf, Users, Heart, Plus, Minus, ShoppingCart } from 'lucide-react';

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

const categories = ['All', 'Starters', 'Beverages', 'Chinese', 'Main Course', 'Desserts'];

export default function QRMenuDemo() {

  const params = useParams();

  const vendorSlug = params?.vendorSlug as string;

  const [vendor, setVendor] = useState<any>(null);

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [showSplash, setShowSplash] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  const [menuSearch, setMenuSearch] = useState('');

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [orderType, setOrderType] = useState<'dine-in' | 'delivery'>('dine-in');

  const [customerName, setCustomerName] = useState('');

  const [tableNumber, setTableNumber] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Fetch Vendor details and their specific Menu Items from Supabase in background

  useEffect(() => {

    if (vendorSlug) {

      fetchVendorAndMenu();

    }

  }, [vendorSlug]);

  const fetchVendorAndMenu = async () => {

    const { data: vendorData, error: vendorError } = await supabase

      .from('vendors')

      .select('*')

      .eq('slug', vendorSlug)

      .maybeSingle();

    if (vendorError || !vendorData) {

      setVendor(null);

      return;

    }

    const vData = vendorData as any;

    const expiryDate = new Date(vData?.subscription_expires_at);

    const currentDate = new Date();

    if (vData?.subscription_expires_at && expiryDate < currentDate) {

      setVendor({ ...vData, isExpired: true });

      return;

    }

    setVendor(vData);

    const { data: itemsData, error: itemsError } = await supabase

      .from('vendor_menu_items')

      .select('*')

      .eq('vendor_id', vData.id);

    if (!itemsError) {

      setMenuItems(itemsData || []);

    }

  };

  // Auto-hide Splash Screen after 2.5 seconds

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  // Filter items based on category and search query

  const filteredItems = menuItems.filter((item) => {

    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||

                          (item.description && item.description.toLowerCase().includes(menuSearch.toLowerCase()));

    return matchesCategory && matchesSearch;

  });

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

  if (vendor?.isExpired) {

    return (
<div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
<div className="bg-rose-500/15 border border-rose-500/30 p-8 rounded-3xl max-w-sm space-y-3 shadow-2xl">
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
<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32 max-w-md mx-auto relative overflow-hidden shadow-2xl">

      {/* ==========================================

          1. NEW SPLASH SCREEN DESIGN (Dark & Premium)

         ========================================== */}

      {showSplash && (
<div className="fixed inset-0 z-50 bg-[#0c1017] flex flex-col justify-between items-center text-center p-6 max-w-md mx-auto select-none">

          {/* Top Right Slogan */}
<div className="absolute top-8 right-6 text-right">
<p className="font-serif italic text-amber-300/80 text-xs leading-tight">

              Good Food<br />Brings People<br />Together
</p>
<p className="text-amber-400/60 text-xs mt-1">♡</p>
</div>

          {/* Center Brand Identity */}
<div className="mt-16 flex flex-col items-center w-full">
<div className="relative mb-4">
<div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 to-orange-500/30 rounded-full flex items-center justify-center border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
<div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md">
<Utensils className="w-8 h-8 text-white stroke-[2.5]" />
</div>
</div>
</div>

            {/* Dynamic Shop Name */}
<h1 className="text-2xl font-black tracking-wider text-white uppercase mt-2 px-2">

              {vendor?.shop_name || 'DIGITAL MENU'}
</h1>
<div className="flex items-center gap-3 my-1">
<span className="h-[1px] w-6 bg-amber-500/60"></span>
<span className="text-amber-400 tracking-[0.25em] text-[11px] font-bold uppercase">

                CAFE & DINING
</span>
<span className="h-[1px] w-6 bg-amber-500/60"></span>
</div>
<p className="text-[11px] text-slate-400 tracking-wide font-medium mt-1">

              Fresh Food • Fast Service • Great Taste
</p>

            {/* Welcome & Loader */}
<div className="mt-10 flex flex-col items-center">
<span className="font-serif italic text-4xl text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">

                Welcome!
</span>
<p className="text-xs text-slate-400 mt-2 font-medium">

                Preparing your menu...
</p>
<div className="flex gap-2 mt-3">
<span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce"></span>
<span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
</div>
</div>

            {/* 3 Value Pillars */}
<div className="grid grid-cols-3 gap-3 w-full mt-10 pt-5 border-t border-slate-800/80 px-2">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
<Leaf className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">GOOD FOOD</span>
</div>
<div className="flex flex-col items-center border-x border-slate-800 px-1">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
<Users className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">HAPPIER PEOPLE</span>
</div>
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
<Heart className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">BRIGHTER DAYS</span>
</div>
</div>
</div>

          {/* LearnBuild Hub Footer Branding */}
<div className="w-full bg-white text-slate-900 rounded-t-3xl pt-3.5 pb-4 px-6 shadow-2xl mt-auto">
<p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-0.5">

              Powered by
</p>
<div className="flex items-center justify-center gap-2">
<div className="w-6 h-6 bg-[#0b1329] rounded-md p-1 flex items-center justify-center">
<span className="text-orange-500 font-black text-xs">{"</>"}</span>
</div>
<div className="text-left leading-none">
<span className="font-black text-sm text-[#0b1329]">LearnBuild</span>
<span className="font-black text-sm text-orange-500 ml-0.5">Hub</span>
<p className="text-[8px] text-amber-700 font-bold tracking-wider uppercase">Learn. Build. Grow.</p>
</div>
</div>
<p className="text-[9px] text-slate-400 font-medium tracking-wider mt-1.5 pt-1.5 border-t border-slate-100">

              Digital Menus for a Smarter Tomorrow
</p>
</div>
</div>

      )}

      {/* ==========================================

          2. CLEAN HEADER BAR

         ========================================== */}
<header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
<div className="flex justify-between items-center">
<div>
<h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">

              {vendor?.shop_name || 'Loading Shop...'}
</h2>
<p className="text-xs text-amber-600 font-bold">✨ Live QR Digital Menu</p>
</div>
<div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-amber-700 text-xs font-bold shadow-sm">
<Sparkles className="w-3.5 h-3.5 text-amber-500" /> LEARNBUILD HUB
</div>
</div>
</header>
<div className="p-4 space-y-4">

        {/* Order Type Toggle */}
<div className="grid grid-cols-2 gap-2 bg-slate-200/90 p-1.5 rounded-2xl border border-slate-300/80 shadow-inner">
<button

            onClick={() => setOrderType('dine-in')}

            className={`py-3 text-xs font-black rounded-xl transition shadow-sm ${

              orderType === 'dine-in'

                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'

                : 'text-slate-600 hover:text-slate-900'

            }`}
>

            🍽️ Dine-In (Stall)
</button>
<button

            onClick={() => setOrderType('delivery')}

            className={`py-3 text-xs font-black rounded-xl transition shadow-sm ${

              orderType === 'delivery'

                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'

                : 'text-slate-600 hover:text-slate-900'

            }`}
>

            🛵 Home Delivery
</button>
</div>

        {/* Customer Details Input Card */}
<div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/90 space-y-3">
<h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
<span>👤 Customer Details</span> <span className="text-rose-500">*</span>
</h3>
<input

            type="text"

            placeholder="Your Full Name *"

            value={customerName}

            onChange={(e) => setCustomerName(e.target.value)}

            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition"

          />

          {orderType === 'dine-in' ? (
<input

              type="text"

              placeholder="Table / Seat Number * (e.g. Table 4)"

              value={tableNumber}

              onChange={(e) => setTableNumber(e.target.value)}

              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition"

            />

          ) : (
<textarea

              placeholder="Full Delivery Address *"

              value={deliveryAddress}

              onChange={(e) => setDeliveryAddress(e.target.value)}

              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition h-16 resize-none"

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
<Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
<input

            type="text"

            placeholder="Search dishes or beverages..."

            value={menuSearch}

            onChange={(e) => setMenuSearch(e.target.value)}

            className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-medium pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200/90 shadow-sm focus:outline-none focus:border-amber-500 transition"

          />
</div>

        {/* Category Tabs */}
<div className="flex gap-2 overflow-x-auto no-scrollbar py-1">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setActiveCategory(cat)}

              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition shadow-sm ${

                activeCategory === cat

                  ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105'

                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'

              }`}
>

              {cat}
</button>

          ))}
</div>

        {/* Dynamic Menu Items List */}
<div className="space-y-3">

          {filteredItems.length === 0 ? (
<div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 text-slate-400 text-xs font-semibold shadow-sm">

              No menu items found for this shop yet! Add items from your admin panel. 🍽️
</div>

          ) : (

            filteredItems.map((item) => {

              const qty = cart[item.id] || 0;

              return (
<div

                  key={item.id}

                  className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/90 flex justify-between items-center gap-3 transition"
>
<div className="space-y-1.5 flex-1">
<span className="text-[10px] font-black px-2.5 py-1 rounded-lg border bg-amber-50 text-amber-800 border-amber-200">

                      {item.category}
</span>
<h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>

                    {item.description && (
<p className="text-[11px] text-slate-500 font-medium line-clamp-2">{item.description}</p>

                    )}
<p className="font-black text-sm text-slate-900">₹{item.price}</p>
</div>
<div className="flex items-center gap-2">

                    {qty === 0 ? (
<button

                        onClick={() => updateQuantity(item.id, 1)}

                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-2xl font-black text-xs transition shadow-sm flex items-center gap-1"
>
<Plus className="w-3.5 h-3.5 stroke-[3]" /> ADD
</button>

                    ) : (
<div className="flex items-center bg-slate-100 border border-slate-300 rounded-2xl overflow-hidden shadow-inner">
<button

                          onClick={() => updateQuantity(item.id, -1)}

                          className="px-3 py-2 text-slate-700 font-black hover:bg-slate-200 transition text-xs"
>
<Minus className="w-3.5 h-3.5" />
</button>
<span className="px-2.5 font-black text-xs text-slate-900">{qty}</span>
<button

                          onClick={() => updateQuantity(item.id, 1)}

                          className="px-3 py-2 text-slate-700 font-black hover:bg-slate-200 transition text-xs"
>
<Plus className="w-3.5 h-3.5" />
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
<div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
<div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] flex justify-between items-center">
<div>
<p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Cart</p>
<p className="font-black text-sm text-slate-900">

                {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} | ₹{totalAmount}
</p>
</div>
<button

              onClick={handleWhatsAppOrder}

              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-600/20 transform active:scale-95"
>
<ShoppingCart className="w-4 h-4" />
<span>Order on WhatsApp</span>
</button>
</div>
</div>

      )}
</div>

  );

}
 
