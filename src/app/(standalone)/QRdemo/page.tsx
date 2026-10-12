"use client";

import { useEffect, useState } from "react";

import {

  Search,

  Star,

  ShoppingCart,

  Phone,

  MapPin,

  Share2,

} from "lucide-react";

export default function Page() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  const menuItems = [

    {

      name: "Classic Burger",

      price: 149,

      image:

        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",

    },

    {

      name: "Margherita Pizza",

      price: 249,

      image:

        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",

    },

    {

      name: "Chicken Biryani",

      price: 299,

      image:

        "https://images.unsplash.com/photo-1701579231349-d7459c40919d?w=800",

    },

    {

      name: "Paneer Wrap",

      price: 129,

      image:

        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",

    },

    {

      name: "Cold Coffee",

      price: 99,

      image:

        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",

    },

  ];

  if (showSplash) {

    return (
<main className="h-screen flex items-center justify-center bg-gradient-to-br from-[#071229] via-[#0a1f47] to-[#09152c] text-white">
<div className="text-center px-6">
<div className="w-28 h-28 rounded-full bg-orange-500 flex items-center justify-center mx-auto shadow-2xl mb-6 animate-pulse">
<span className="text-5xl">🍽️</span>
</div>
<h1 className="text-5xl font-bold">

            TASTY <span className="text-orange-500">BITES</span>
</h1>
<p className="text-2xl tracking-[8px] mt-1">CAFE</p>
<p className="text-gray-300 mt-4">

            Fresh Food • Fast Service • Great Taste
</p>
<h2 className="text-orange-400 text-4xl italic mt-10">

            Welcome!
</h2>
<p className="mt-6 text-lg text-gray-300">

            Preparing your menu...
</p>
<div className="flex justify-center gap-3 mt-4">
<div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce" />
<div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce delay-100" />
<div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce delay-200" />
</div>
<div className="mt-16 text-sm text-gray-400">

            Powered by
</div>
<h3 className="text-2xl font-bold mt-2">

            Learn<span className="text-orange-500">Build</span> Hub
</h3>
</div>
</main>

    );

  }

  return (
<main className="min-h-screen bg-[#081627] text-white pb-36">

      {/* Header */}
<div className="p-5 sticky top-0 z-50 backdrop-blur bg-[#081627]/90">
<div className="flex justify-between items-center mb-4">
<div>
<h1 className="text-3xl font-bold">

              TASTY <span className="text-orange-500">BITES</span>
</h1>
<p className="text-sm text-gray-300">

              Fresh Food • Fast Service
</p>
</div>
<div className="bg-green-500/20 px-3 py-2 rounded-full flex gap-2 items-center">
<Star size={14} fill="gold" />
<span>4.8</span>
</div>
</div>

        {/* Search */}
<div className="bg-white rounded-full flex items-center px-4 py-3">
<Search className="text-gray-500" />
<input

            placeholder="Search your favourite food..."

            className="ml-3 w-full outline-none text-black"

          />
</div>
</div>

      {/* Offer */}
<div className="px-5 mt-5">
<div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-4">
<h2 className="text-3xl font-bold">20% OFF</h2>
<p>On orders above ₹499</p>
</div>
</div>

      {/* Categories */}
<div className="flex gap-3 overflow-x-auto px-5 py-5">

        {["Burger", "Pizza", "Biryani", "Chinese", "Drinks"].map((cat) => (
<button

            key={cat}

            className="whitespace-nowrap bg-[#122742] px-5 py-3 rounded-xl border border-slate-700"
>

            {cat}
</button>

        ))}
</div>

      {/* Menu */}
<div className="px-5 space-y-4">
<h2 className="text-2xl font-bold mb-4">

          🔥 Bestsellers
</h2>

        {menuItems.map((item) => (
<div

            key={item.name}

            className="bg-[#10233d] rounded-2xl overflow-hidden flex"
>

            {item.image}
<div className="p-4 flex-1">
<h3 className="font-bold text-lg">

                {item.name}
</h3>
<p className="text-orange-400 font-bold text-xl mt-2">

                ₹{item.price}
</p>
<button className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl font-semibold">

                Add +
</button>
</div>
</div>

        ))}
</div>

      {/* Cart */}
<div className="fixed bottom-24 left-4 right-4 bg-[#10233d] rounded-2xl p-4 flex justify-between items-center border border-slate-700">
<div className="flex items-center gap-2">
<ShoppingCart />
<span>3 Items | ₹427</span>
</div>
<button className="text-orange-400 font-semibold">

          View Cart →
</button>
</div>

      {/* WhatsApp CTA */}
<div className="fixed bottom-0 left-0 right-0 bg-[#081627] p-4 border-t border-slate-800">
https://wa.me/918149565351

          WhatsApp Order
</a>
<div className="flex justify-around mt-4 text-sm text-gray-300">
<div className="flex items-center gap-1">
<Phone size={16} />

            Call
</div>
<div className="flex items-center gap-1">
<MapPin size={16} />

            Location
</div>
<div className="flex items-center gap-1">
<Share2 size={16} />

            Share
</div>
</div>
<div className="text-center mt-3 text-xs text-gray-500">

          Powered by LearnBuild Hub
</div>
</div>
</main>

  );

}

"use client";

import { useEffect, useState } from "react";

import {

  Search,

  Star,

  ShoppingCart,

  Phone,

  MapPin,

  Share2,

} from "lucide-react";

export default function Page() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  const menuItems = [

    {

      name: "Classic Burger",

      price: 149,

      image:

        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",

    },

    {

      name: "Margherita Pizza",

      price: 249,

      image:

        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",

    },

    {

      name: "Chicken Biryani",

      price: 299,

      image:

        "https://images.unsplash.com/photo-1701579231349-d7459c40919d?w=800",

    },

    {

      name: "Paneer Wrap",

      price: 129,

      image:

        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",

    },

    {

      name: "Cold Coffee",

      price: 99,

      image:

        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",

    },

  ];

  if (showSplash) {

    return (
<main className="h-screen flex items-center justify-center bg-gradient-to-br from-[#071229] via-[#0a1f47] to-[#09152c] text-white">
<div className="text-center px-6">
<div className="w-28 h-28 rounded-full bg-orange-500 flex items-center justify-center mx-auto shadow-2xl mb-6 animate-pulse">
<span className="text-5xl">🍽️</span>
</div>
<h1 className="text-5xl font-bold">

            TASTY <span className="text-orange-500">BITES</span>
</h1>
<p className="text-2xl tracking-[8px] mt-1">CAFE</p>
<p className="text-gray-300 mt-4">

            Fresh Food • Fast Service • Great Taste
</p>
<h2 className="text-orange-400 text-4xl italic mt-10">

            Welcome!
</h2>
<p className="mt-6 text-lg text-gray-300">

            Preparing your menu...
</p>
<div className="flex justify-center gap-3 mt-4">
<div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce" />
<div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce delay-100" />
<div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce delay-200" />
</div>
<div className="mt-16 text-sm text-gray-400">

            Powered by
</div>
<h3 className="text-2xl font-bold mt-2">

            Learn<span className="text-orange-500">Build</span> Hub
</h3>
</div>
</main>

    );

  }

  return (
<main className="min-h-screen bg-[#081627] text-white pb-36">

      {/* Header */}
<div className="p-5 sticky top-0 z-50 backdrop-blur bg-[#081627]/90">
<div className="flex justify-between items-center mb-4">
<div>
<h1 className="text-3xl font-bold">

              TASTY <span className="text-orange-500">BITES</span>
</h1>
<p className="text-sm text-gray-300">

              Fresh Food • Fast Service
</p>
</div>
<div className="bg-green-500/20 px-3 py-2 rounded-full flex gap-2 items-center">
<Star size={14} fill="gold" />
<span>4.8</span>
</div>
</div>

        {/* Search */}
<div className="bg-white rounded-full flex items-center px-4 py-3">
<Search className="text-gray-500" />
<input

            placeholder="Search your favourite food..."

            className="ml-3 w-full outline-none text-black"

          />
</div>
</div>

      {/* Offer */}
<div className="px-5 mt-5">
<div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-4">
<h2 className="text-3xl font-bold">20% OFF</h2>
<p>On orders above ₹499</p>
</div>
</div>

      {/* Categories */}
<div className="flex gap-3 overflow-x-auto px-5 py-5">

        {["Burger", "Pizza", "Biryani", "Chinese", "Drinks"].map((cat) => (
<button

            key={cat}

            className="whitespace-nowrap bg-[#122742] px-5 py-3 rounded-xl border border-slate-700"
>

            {cat}
</button>

        ))}
</div>

      {/* Menu */}
<div className="px-5 space-y-4">
<h2 className="text-2xl font-bold mb-4">

          🔥 Bestsellers
</h2>

        {menuItems.map((item) => (
<div

            key={item.name}

            className="bg-[#10233d] rounded-2xl overflow-hidden flex"
>

            {item.image}
<div className="p-4 flex-1">
<h3 className="font-bold text-lg">

                {item.name}
</h3>
<p className="text-orange-400 font-bold text-xl mt-2">

                ₹{item.price}
</p>
<button className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl font-semibold">

                Add +
</button>
</div>
</div>

        ))}
</div>

      {/* Cart */}
<div className="fixed bottom-24 left-4 right-4 bg-[#10233d] rounded-2xl p-4 flex justify-between items-center border border-slate-700">
<div className="flex items-center gap-2">
<ShoppingCart />
<span>3 Items | ₹427</span>
</div>
<button className="text-orange-400 font-semibold">

          View Cart →
</button>
</div>

      {/* WhatsApp CTA */}
<div className="fixed bottom-0 left-0 right-0 bg-[#081627] p-4 border-t border-slate-800">
https://wa.me/918149565351

          WhatsApp Order
</a>
<div className="flex justify-around mt-4 text-sm text-gray-300">
<div className="flex items-center gap-1">
<Phone size={16} />

            Call
</div>
<div className="flex items-center gap-1">
<MapPin size={16} />

            Location
</div>
<div className="flex items-center gap-1">
<Share2 size={16} />

            Share
</div>
</div>
<div className="text-center mt-3 text-xs text-gray-500">

          Powered by LearnBuild Hub
</div>
</div>
</main>

  );

}
 
