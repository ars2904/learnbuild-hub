"use client";

import React, { useState, useEffect, use } from "react";

import Image from "next/image";

import {

  Utensils,

  Search,

  ShoppingCart,

  Sparkles,

  Leaf,

  Users,

  Heart,

  Plus,

  Minus,

  CheckCircle2,

  Phone,

  Clock,

  MapPin,

  X,

  Send

} from "lucide-react";

import { createClient } from "@supabase/supabase-js";

// Supabase client initialization

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MenuItem {

  id: string;

  name: string;

  description: string;

  price: number;

  category: string;

  is_veg: boolean;

  is_available: boolean;

  image_url?: string;

}

interface VendorData {

  id: string;

  name: string;

  tagline?: string;

  logo_url?: string;

  whatsapp_number: string;

  address?: string;

}

export default function VendorMenuPage({

  params,

}: {

  params: Promise<{ vendorSlug: string }>;

}) {

  const resolvedParams = use(params);

  const vendorSlug = resolvedParams.vendorSlug;

  // States

  const [showSplash, setShowSplash] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);

  const [vendor, setVendor] = useState<VendorData | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [customerName, setCustomerName] = useState<string>("");

  const [tableNumber, setTableNumber] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Dynamic Data Fetching from Supabase

  useEffect(() => {

    async function fetchVendorAndMenu() {

      try {

        setLoading(true);

        setErrorMsg(null);

        // Fetch Vendor

        const { data: vendorData, error: vError } = await supabase

          .from("vendors")

          .select("*")

          .eq("slug", vendorSlug)

          .single();

        if (vError || !vendorData) {

          setErrorMsg("Restaurant not found.");

          setLoading(false);

          return;

        }

        setVendor(vendorData);

        // Fetch Menu Items for Vendor

        const { data: itemsData, error: iError } = await supabase

          .from("menu_items")

          .select("*")

          .eq("vendor_id", vendorData.id)

          .eq("is_available", true);

        if (iError) {

          console.error("Error loading menu:", iError);

        } else if (itemsData) {

          setMenuItems(itemsData);

          // Extract Unique Categories Dynamically

          const uniqueCats = [

            "All",

            ...Array.from(

              new Set(itemsData.map((item: MenuItem) => item.category))

            ),

          ];

          setCategories(uniqueCats as string[]);

        }

      } catch (err) {

        console.error("Fetch Exception:", err);

        setErrorMsg("Failed to load restaurant data.");

      } finally {

        setLoading(false);

      }

    }

    if (vendorSlug) {

      fetchVendorAndMenu();

    }

  }, [vendorSlug]);

  // Splash Screen Timer

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2800);

    return () => clearTimeout(timer);

  }, []);

  // Cart Management Logic

  const updateQuantity = (itemId: string, delta: number) => {

    setCart((prev) => {

      const current = prev[itemId] || 0;

      const updated = current + delta;

      if (updated <= 0) {

        const { [itemId]: _, ...rest } = prev;

        return rest;

      }

      return { ...prev, [itemId]: updated };

    });

  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalCartPrice = Object.entries(cart).reduce((sum, [id, qty]) => {

    const item = menuItems.find((i) => i.id === id);

    return sum + (item ? item.price * qty : 0);

  }, 0);

  // Send WhatsApp Order Dynamic Link

  const handleSendWhatsAppOrder = () => {

    if (!vendor) return;

    if (Object.keys(cart).length === 0) {

      alert("Please select items to order!");

      return;

    }

    let message = `*NEW ORDER RECEIVED* 🚀\n\n`;

    message += `📍 *Restaurant:* ${vendor.name}\n`;

    message += `👤 *Customer Name:* ${customerName || "Guest"}\n`;

    message += `🍽️ *Table No:* ${tableNumber || "Takeaway"}\n`;

    message += `------------------------------\n`;

    Object.entries(cart).forEach(([id, qty]) => {

      const item = menuItems.find((i) => i.id === id);

      if (item) {

        message += `• ${qty}x ${item.name} - ₹${item.price * qty}\n`;

      }

    });

    message += `------------------------------\n`;

    message += `💰 *Total Amount:* ₹${totalCartPrice}\n\n`;

    message += `Please confirm and prepare my order. Thank you! 🙏`;

    const encodedMsg = encodeURIComponent(message);

    window.open(

      `https://wa.me/${vendor.whatsapp_number}?text=${encodedMsg}`,

      "_blank"

    );

  };

  // Dynamic Filtering Logic

  const filteredItems = menuItems.filter((item) => {

    const matchesCategory =

      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =

      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;

  });

  if (errorMsg) {

    return (
<div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
<div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
<Utensils className="w-8 h-8" />
</div>
<h2 className="text-xl font-bold text-slate-800">{errorMsg}</h2>
<p className="text-sm text-slate-500 mt-1">Please check the link or QR code.</p>
</div>

    );

  }

  return (
<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans max-w-md mx-auto shadow-xl relative overflow-hidden">

      {/* ==========================================

          1. DYNAMIC SPLASH SCREEN (Premium Dark Backdrop)

         ========================================== */}

      {showSplash && (
<div className="fixed inset-0 z-50 bg-[#0c1017] flex flex-col justify-between items-center text-center p-6 max-w-md mx-auto animate-fade-in select-none">

          {/* Top Decorative Tagline */}
<div className="absolute top-8 right-6 text-right">
<p className="font-serif italic text-amber-300/80 text-xs leading-tight">

              Good Food<br />Brings People<br />Together
</p>
<p className="text-amber-400/60 text-xs mt-1">♡</p>
</div>

          {/* Center Brand Identity */}
<div className="mt-16 flex flex-col items-center w-full">

            {/* Dynamic Restaurant Logo or Icon */}
<div className="relative mb-4">
<div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 to-orange-500/30 rounded-full flex items-center justify-center border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)]">

                {vendor?.logo_url ? (
<Image

                    src={vendor.logo_url}

                    alt={vendor.name}

                    width={56}

                    height={56}

                    className="rounded-xl object-cover"

                  />

                ) : (
<div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md">
<Utensils className="w-8 h-8 text-white stroke-[2.5]" />
</div>

                )}
</div>
</div>

            {/* Dynamic Name & Sub-tagline */}
<h1 className="text-2xl font-black tracking-wider text-white uppercase mt-2 px-2">

              {loading ? "LOADING..." : vendor?.name}
</h1>
<div className="flex items-center gap-3 my-1">
<span className="h-[1px] w-6 bg-amber-500/60"></span>
<span className="text-amber-400 tracking-[0.25em] text-[11px] font-bold uppercase">

                {vendor?.tagline || "DIGITAL MENU"}
</span>
<span className="h-[1px] w-6 bg-amber-500/60"></span>
</div>
<p className="text-[11px] text-slate-400 tracking-wide font-medium mt-1">

              Fresh Food • Fast Service • Great Taste
</p>

            {/* Welcome Animation */}
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

            {/* Value Pillars */}
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

          {/* LearnBuild Hub Branding Footer Card */}
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

          2. MAIN MENU PAGE (Clean Light UI Theme)

         ========================================== */}
<header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
<div className="flex items-center justify-between">
<div>
<h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">

              {vendor?.name}
</h2>
<p className="text-xs text-amber-600 font-bold">{vendor?.tagline || "Café & Dining"}</p>
</div>
<div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-amber-700 text-xs font-bold">
<Sparkles className="w-3.5 h-3.5 text-amber-500" /> Direct Order
</div>
</div>

        {/* Search Bar */}
<div className="mt-3 relative">
<Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
<input

            type="text"

            placeholder="Search dishes or beverages..."

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"

          />
</div>

        {/* Dynamic Horizontal Categories Scroll */}
<div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-0.5">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setSelectedCategory(cat)}

              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${

                selectedCategory === cat

                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"

                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"

              }`}
>

              {cat}
</button>

          ))}
</div>
</header>

      {/* Dynamic Menu Items Display */}
<main className="flex-1 p-4 pb-36 space-y-3">

        {loading ? (
<div className="text-center py-16 text-slate-400 text-xs font-medium">

            Fetching menu directly from server...
</div>

        ) : filteredItems.length === 0 ? (
<div className="text-center py-16 text-slate-400 text-xs font-medium">

            No items available in this category.
</div>

        ) : (

          filteredItems.map((item) => {

            const qty = cart[item.id] || 0;

            return (
<div

                key={item.id}

                className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex justify-between items-center gap-3 shadow-sm hover:shadow-md transition"
>
<div className="flex-1">
<div className="flex items-center gap-2">
<span

                      className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center p-[1px] ${

                        item.is_veg ? "border-emerald-600" : "border-rose-600"

                      }`}
>
<span

                        className={`w-1.5 h-1.5 rounded-full ${

                          item.is_veg ? "bg-emerald-600" : "bg-rose-600"

                        }`}

                      />
</span>
<h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
</div>

                  {item.description && (
<p className="text-xs text-slate-500 mt-1 line-clamp-2">

                      {item.description}
</p>

                  )}
<p className="text-sm font-black text-slate-900 mt-2">

                    ₹{item.price}
</p>
</div>

                {/* Plus / Minus Quantity Buttons */}
<div>

                  {qty === 0 ? (
<button

                      onClick={() => updateQuantity(item.id, 1)}

                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1"
>
<Plus className="w-3.5 h-3.5 stroke-[3]" /> ADD
</button>

                  ) : (
<div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl overflow-hidden shadow-inner">
<button

                        onClick={() => updateQuantity(item.id, -1)}

                        className="p-1.5 text-slate-700 hover:bg-slate-200"
>
<Minus className="w-3.5 h-3.5" />
</button>
<span className="px-2 text-xs font-black text-slate-900">{qty}</span>
<button

                        onClick={() => updateQuantity(item.id, 1)}

                        className="p-1.5 text-slate-700 hover:bg-slate-200"
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
</main>

      {/* Sticky Bottom WhatsApp Order Bar */}

      {totalCartCount > 0 && (
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-4 z-40 rounded-t-2xl shadow-[0_-10px_25px_rgba(0,0,0,0.08)] space-y-2.5">
<div className="flex gap-2">
<input

              type="text"

              placeholder="Your Name (Optional)"

              value={customerName}

              onChange={(e) => setCustomerName(e.target.value)}

              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"

            />
<input

              type="text"

              placeholder="Table No."

              value={tableNumber}

              onChange={(e) => setTableNumber(e.target.value)}

              className="w-24 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"

            />
</div>
<button

            onClick={handleSendWhatsAppOrder}

            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-between transition"
>
<div className="flex items-center gap-2">
<ShoppingCart className="w-4 h-4" />
<span className="text-xs font-medium">{totalCartCount} Items</span>
</div>
<span className="text-xs tracking-wide uppercase font-black">Order on WhatsApp</span>
<span className="text-sm font-black bg-emerald-700 px-2 py-0.5 rounded-lg">₹{totalCartPrice}</span>
</button>
</div>

      )}
</div>

  );

}
 
