"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { useParams } from "next/navigation";

import {

  Utensils,

  Search,

  ShoppingCart,

  CheckCircle2,

  Phone,

  Clock,

  Sparkles,

  MapPin,

  Leaf,

  Users,

  Heart,

  ChevronRight,

  Plus,

  Minus,

} from "lucide-react";

// ==========================================

// TYPES DEFINITION

// ==========================================

interface MenuItem {

  id: string;

  name: string;

  description: string;

  price: number;

  category: string;

  isVeg: boolean;

  isAvailable: boolean;

  image?: string;

}

interface VendorData {

  name: string;

  tagline: string;

  benefits: string; // e.g., "Fresh Food • Fast Service • Great Taste"

  logoUrl?: string;

  whatsappNumber: string;

  address?: string;

}

export default function VendorMenuPage() {

  const params = useParams();

  const vendorSlug = params?.vendorSlug as string;

  // State Management

  const [showSplash, setShowSplash] = useState<boolean>(true);

  const [loadingData, setLoadingData] = useState<boolean>(true);

  const [vendor, setVendor] = useState<VendorData | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [customerName, setCustomerName] = useState<string>("");

  const [tableNumber, setTableNumber] = useState<string>("");

  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");

  // 1. Fetch Vendor Data & Menu Items from Supabase/API

  useEffect(() => {

    async function fetchData() {

      try {

        setLoadingData(true);

        // TODO: Replace with your actual Supabase / API fetch query using vendorSlug

        // const { data: vendorData } = await supabase.from('vendors').select('*').eq('slug', vendorSlug).single();

        // const { data: items } = await supabase.from('menu_items').select('*').eq('vendor_id', vendorData.id);

        // MOCK DATA FALLBACK (Aapke backend fetch ke according)

        const mockVendor: VendorData = {

          name: vendorSlug ? vendorSlug.replace(/-/g, " ").toUpperCase() : "TASTY BITES",

          tagline: "CAFE",

          benefits: "Fresh Food  •  Fast Service  •  Great Taste",

          whatsappNumber: "918149565351",

          address: "FC Road, Pune",

        };

        const mockItems: MenuItem[] = [

          { id: "1", name: "Paneer Tikka Grill", description: "Cottage cheese cubes marinated & grilled in tandoor", price: 249, category: "Starters", isVeg: true, isAvailable: true },

          { id: "2", name: "Butter Chicken Special", description: "Creamy tomato gravy with tender boneless chicken", price: 349, category: "Main Course", isVeg: false, isAvailable: true },

          { id: "3", name: "Veg Special Biryani", description: "Fragrant basmati rice cooked with garden fresh veggies", price: 220, category: "Main Course", isVeg: true, isAvailable: true },

          { id: "4", name: "Cold Coffee with Ice Cream", description: "Rich blended coffee topped with vanilla scoop", price: 149, category: "Beverages", isVeg: true, isAvailable: true },

          { id: "5", name: "Crispy Veg Nuggets", description: "Golden fried vegetable bites served with mint dip", price: 179, category: "Starters", isVeg: true, isAvailable: true },

        ];

        setVendor(mockVendor);

        setMenuItems(mockItems);

        // Extract unique categories

        const uniqueCategories = ["All", ...Array.from(new Set(mockItems.map((item) => item.category)))];

        setCategories(uniqueCategories);

      } catch (err) {

        console.error("Error fetching vendor data:", err);

      } finally {

        setLoadingData(false);

      }

    }

    if (vendorSlug) {

      fetchData();

    }

  }, [vendorSlug]);

  // 2. Splash Screen Auto-Hide Timer (2.5 seconds)

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2600);

    return () => clearTimeout(timer);

  }, []);

  // Cart Helper Functions

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

  // Send Order to WhatsApp

  const handleSendWhatsAppOrder = () => {

    if (!vendor) return;

    if (Object.keys(cart).length === 0) {

      alert("Please add items to your cart first!");

      return;

    }

    let message = `*NEW ORDER RECEIVED* 🚀\n\n`;

    message += `📍 *Restaurant:* ${vendor.name}\n`;

    message += `👤 *Customer Name:* ${customerName || "Guest"}\n`;

    message += `🍽️ *Type:* ${orderType === "dine-in" ? `Dine-In (Table No: ${tableNumber || "N/A"})` : "Takeaway"}\n`;

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

    window.open(`https://wa.me/${vendor.whatsappNumber}?text=${encodedMsg}`, "_blank");

  };

  // Filter items by category & search

  const filteredItems = menuItems.filter((item) => {

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;

  });

  return (
<div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">

      {/* ==========================================

          1. SPLASH SCREEN COMPONENT (Exact Design Match)

         ========================================== */}

      {showSplash && (
<div className="fixed inset-0 z-50 bg-[#0B0F17] flex flex-col justify-between items-center text-center p-6 max-w-md mx-auto animate-fade-in select-none">

          {/* Top Subtle Slogan */}
<div className="absolute top-8 right-6 text-right">
<p className="font-serif italic text-amber-200/80 text-xs leading-tight">

              Good Food<br />Brings People<br />Together
</p>
<p className="text-amber-400/60 text-xs mt-1">♡</p>
</div>

          {/* Upper Section: Logo & Branding */}
<div className="mt-14 flex flex-col items-center w-full">

            {/* Chef Hat Icon with Glowing Accent */}
<div className="relative mb-3">
<div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 to-orange-500/30 rounded-full flex items-center justify-center border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
<div className="w-14 h-14 bg-gradient-to-b from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
<Utensils className="w-8 h-8 text-white stroke-[2.5]" />
</div>
</div>
</div>

            {/* Restaurant Title */}
<h1 className="text-3xl font-black tracking-wider text-white uppercase font-sans mt-2">

              {vendor?.name || "TASTY BITES"}
</h1>
<div className="flex items-center gap-3 my-1">
<span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/60"></span>
<span className="text-amber-400 tracking-[0.3em] text-xs font-semibold uppercase">

                {vendor?.tagline || "CAFE"}
</span>
<span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/60"></span>
</div>
<p className="text-[11px] text-gray-400 tracking-wide font-medium mt-1">

              {vendor?.benefits || "Fresh Food  •  Fast Service  •  Great Taste"}
</p>

            {/* Cursive Welcome & Animated Loader */}
<div className="mt-10 flex flex-col items-center">
<span className="font-serif italic text-4xl text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]">

                Welcome!
</span>
<p className="text-xs text-gray-400 mt-3 font-medium tracking-wide">

                Preparing your menu...
</p>

              {/* Pulsing Dots Loader */}
<div className="flex gap-2 mt-3">
<span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce"></span>
<span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
</div>
</div>

            {/* 3 Value Pillars */}
<div className="grid grid-cols-3 gap-4 w-full mt-10 pt-6 border-t border-gray-800/80 px-2">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1.5">
<Leaf className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">GOOD FOOD</span>
</div>
<div className="flex flex-col items-center border-x border-gray-800/60 px-1">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1.5">
<Users className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">HAPPIER PEOPLE</span>
</div>
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1.5">
<Heart className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">BRIGHTER DAYS</span>
</div>
</div>
</div>

          {/* Bottom Curved "Powered by LearnBuild Hub" Footer Card */}
<div className="w-full bg-gradient-to-b from-white to-gray-100 text-gray-900 rounded-t-3xl pt-4 pb-5 px-6 shadow-2xl border-t border-amber-300/30 mt-auto">
<p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">

              Powered by
</p>
<div className="flex items-center justify-center gap-2">
<div className="w-7 h-7 bg-[#0b1329] rounded-lg p-1 flex items-center justify-center shadow">
<span className="text-orange-500 font-extrabold text-xs">{"</>"}</span>
</div>
<div className="text-left leading-none">
<span className="font-extrabold text-base text-[#0b1329] tracking-tight">LearnBuild</span>
<span className="font-extrabold text-base text-orange-500 tracking-tight ml-0.5">Hub</span>
<p className="text-[9px] text-amber-700 font-bold tracking-wider uppercase">Learn. Build. Grow.</p>
</div>
</div>
<p className="text-[9px] text-gray-500 font-medium tracking-wider mt-2 pt-2 border-t border-gray-200">

              Digital Menus for a Smarter Tomorrow
</p>
</div>
</div>

      )}

      {/* ==========================================

          2. MAIN MENU PAGE CONTENT

         ========================================== */}
<header className="sticky top-0 z-30 bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-800 p-4">
<div className="flex items-center justify-between">
<div>
<h2 className="text-lg font-bold text-white uppercase tracking-wide">

              {vendor?.name || "TASTY BITES"}
</h2>
<p className="text-xs text-amber-400 font-medium">{vendor?.tagline || "CAFE"}</p>
</div>
<div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-semibold">
<Sparkles className="w-3.5 h-3.5" /> Direct Menu
</div>
</div>

        {/* Search Bar */}
<div className="mt-3 relative">
<Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
<input

            type="text"

            placeholder="Search delicious items..."

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"

          />
</div>

        {/* Categories Horizontal Scroll */}
<div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setSelectedCategory(cat)}

              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${

                selectedCategory === cat

                  ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"

                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"

              }`}
>

              {cat}
</button>

          ))}
</div>
</header>

      {/* Menu List */}
<main className="flex-1 p-4 pb-32 space-y-3">

        {filteredItems.length === 0 ? (
<div className="text-center py-12 text-gray-500 text-sm">

            No menu items found.
</div>

        ) : (

          filteredItems.map((item) => {

            const qty = cart[item.id] || 0;

            return (
<div

                key={item.id}

                className="bg-gray-900/80 border border-gray-800/80 rounded-2xl p-3.5 flex justify-between items-center gap-3 hover:border-gray-700 transition"
>
<div className="flex-1">
<div className="flex items-center gap-2">
<span

                      className={`w-3 h-3 rounded-sm border flex items-center justify-center p-[1px] ${

                        item.isVeg ? "border-green-500" : "border-red-500"

                      }`}
>
<span

                        className={`w-1.5 h-1.5 rounded-full ${

                          item.isVeg ? "bg-green-500" : "bg-red-500"

                        }`}

                      />
</span>
<h3 className="font-semibold text-sm text-gray-100">{item.name}</h3>
</div>
<p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
<p className="text-sm font-bold text-amber-400 mt-2">₹{item.price}</p>
</div>

                {/* Add / Quantity Button */}
<div>

                  {qty === 0 ? (
<button

                      onClick={() => updateQuantity(item.id, 1)}

                      className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-4 py-2 rounded-xl transition shadow-md shadow-amber-500/10 flex items-center gap-1"
>
<Plus className="w-3.5 h-3.5" /> ADD
</button>

                  ) : (
<div className="flex items-center bg-gray-800 border border-amber-500/40 rounded-xl overflow-hidden">
<button

                        onClick={() => updateQuantity(item.id, -1)}

                        className="p-1.5 text-amber-400 hover:bg-gray-700"
>
<Minus className="w-3.5 h-3.5" />
</button>
<span className="px-2.5 text-xs font-bold text-white">{qty}</span>
<button

                        onClick={() => updateQuantity(item.id, 1)}

                        className="p-1.5 text-amber-400 hover:bg-gray-700"
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

      {/* Bottom Sticky Cart & Order Details Drawer */}

      {totalCartCount > 0 && (
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-900 border-t border-gray-800 p-4 z-40 rounded-t-2xl shadow-2xl space-y-3">
<div className="flex gap-2">
<input

              type="text"

              placeholder="Your Name (Optional)"

              value={customerName}

              onChange={(e) => setCustomerName(e.target.value)}

              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"

            />
<input

              type="text"

              placeholder="Table No."

              value={tableNumber}

              onChange={(e) => setTableNumber(e.target.value)}

              className="w-24 bg-gray-800 border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"

            />
</div>
<button

            onClick={handleSendWhatsAppOrder}

            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-between transition"
>
<div className="flex items-center gap-2">
<ShoppingCart className="w-4 h-4" />
<span className="text-xs font-medium">{totalCartCount} Items</span>
</div>
<span className="text-sm">Send Order via WhatsApp</span>
<span className="text-sm font-black bg-emerald-700 px-2.5 py-0.5 rounded-lg">₹{totalCartPrice}</span>
</button>
</div>

      )}
</div>

  );

}
 
