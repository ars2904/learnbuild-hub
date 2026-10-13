'use client';

import { useState, useEffect } from 'react';

import { 

  Utensils, 

  Search, 

  Leaf, 

  Users, 

  Heart, 

  Plus, 

  Minus, 

  ShoppingCart, 

  Phone, 

  Share2, 

  Star 

} from 'lucide-react';

// Static Categories List

const categories = ['All', 'Starters', 'Main Course', 'Beverages', 'Chinese', 'Desserts'];

// Static Dummy Menu Items Data

const staticMenuItems = [

  {

    id: '1',

    name: 'Special Masala Chai',

    category: 'Beverages',

    price: 20,

    description: 'Hot aromatic tea brewed with ginger, cardamom, and fresh milk.',

  },

  {

    id: '2',

    name: 'Crispy Samosa (2 Pcs)',

    category: 'Starters',

    price: 30,

    description: 'Golden fried crispy pastry stuffed with spiced potato filling.',

  },

  {

    id: '3',

    name: 'Paneer Tikka Grill',

    category: 'Starters',

    price: 220,

    description: 'Soft cottage cheese marinated in Indian spices and grilled to perfection.',

  },

  {

    id: '4',

    name: 'Veg Special Biryani',

    category: 'Main Course',

    price: 180,

    description: 'Fragrant basmati rice cooked with fresh garden veggies and rich spices.',

  },

  {

    id: '5',

    name: 'Butter Paneer Masala',

    category: 'Main Course',

    price: 240,

    description: 'Rich tomato and cashew gravy with soft paneer cubes.',

  },

  {

    id: '6',

    name: 'Cold Coffee with Ice Cream',

    category: 'Beverages',

    price: 120,

    description: 'Thick creamy blended cold coffee topped with vanilla scoop.',

  },

  {

    id: '7',

    name: 'Veg Hakka Noodles',

    category: 'Chinese',

    price: 150,

    description: 'Wok-tossed noodles with crunchy fresh vegetables and mild spices.',

  },

];

export default function StaticDemoQRMenu() {

  const [showSplash, setShowSplash] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  const [menuSearch, setMenuSearch] = useState('');

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [orderType, setOrderType] = useState<'dine-in' | 'delivery'>('dine-in');

  const [customerName, setCustomerName] = useState('');

  const [tableNumber, setTableNumber] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Static Shop Info

  const shopName = "TASTY BITES CAFE";

  const shopWhatsApp = "918149565351"; // Sample Demo WhatsApp Number

  // Auto-hide Splash Screen after 2.5 seconds

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  // Filter static items based on selected category and search string

  const filteredItems = staticMenuItems.filter((item) => {

    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||

                          item.description.toLowerCase().includes(menuSearch.toLowerCase());

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

    const item = staticMenuItems.find((m) => m.id === id);

    return sum + (item ? item.price * qty : 0);

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

    let msg = `🛒 *NEW DEMO ORDER - ${shopName}*\n\n`;

    msg += `👤 *Customer Name:* ${customerName}\n`;

    msg += `📌 *Order Type:* ${orderType === 'dine-in' ? 'Dine-In (Stall)' : 'Home Delivery'}\n`;

    if (orderType === 'dine-in') {

      msg += `🪑 *Table/Seat No:* ${tableNumber}\n`;

    } else {

      msg += `🏠 *Delivery Address:* ${deliveryAddress}\n`;

    }

    msg += `\n📋 *ITEMS ORDERED:*\n`;

    Object.entries(cart).forEach(([id, qty]) => {

      const item = staticMenuItems.find((m) => m.id === id);

      if (item) {

        msg += `• ${item.name} x ${qty} = ₹${item.price * qty}\n`;

      }

    });

    msg += `\n💰 *TOTAL AMOUNT:* ₹${totalAmount}\n`;

    msg += `\nPlease confirm my order!`;

    const encodedMsg = encodeURIComponent(msg);

    window.open(`https://wa.me/${shopWhatsApp}?text=${encodedMsg}`, '_blank');

  };

  const handleCallRestaurant = () => {

    window.open(`tel:${shopWhatsApp}`, '_self');

  };

  const handleShareMenu = () => {

    if (navigator.share) {

      navigator.share({

        title: shopName,

        text: 'Check out our digital menu demo and order on WhatsApp!',

        url: window.location.href,

      }).catch(() => {});

    } else {

      navigator.clipboard.writeText(window.location.href);

      alert('Demo Menu link copied to clipboard!');

    }

  };

  return (
<div className="min-h-screen bg-[#0B0F17] text-gray-100 font-sans pb-24 max-w-md mx-auto relative overflow-hidden shadow-2xl">
<style jsx global>{`

        .no-scrollbar::-webkit-scrollbar {

          display: none;

        }

        .no-scrollbar {

          -ms-overflow-style: none;

          scrollbar-width: none;

        }

      `}</style>

      {/* ==========================================

          1. SPLASH SCREEN (STATIC ANIMATED DEMO)

         ========================================== */}

      {showSplash && (
<div className="fixed inset-0 z-50 bg-[#0B0F17] flex flex-col justify-between items-center text-center p-6 max-w-md mx-auto select-none">
<div className="absolute top-8 right-6 text-right">
<p className="font-serif italic text-amber-300/80 text-xs leading-tight">

              Good Food<br />Brings People<br />Together
</p>
<p className="text-amber-400/60 text-xs mt-1">♡</p>
</div>
<div className="mt-16 flex flex-col items-center w-full">
<div className="relative mb-4">
<div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 to-orange-500/30 rounded-full flex items-center justify-center border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
<div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md">
<Utensils className="w-8 h-8 text-white stroke-[2.5]" />
</div>
</div>
</div>
<h1 className="text-2xl font-black tracking-wider text-white uppercase mt-2 px-2">

              {shopName}
</h1>
<div className="flex items-center gap-3 my-1">
<span className="h-[1px] w-6 bg-amber-500/60"></span>
<span className="text-amber-400 tracking-[0.25em] text-[11px] font-bold uppercase">

                DEMO MENU
</span>
<span className="h-[1px] w-6 bg-amber-500/60"></span>
</div>
<p className="text-[11px] text-gray-400 tracking-wide font-medium mt-1">

              Fresh Food • Fast Service • Great Taste
</p>
<div className="mt-10 flex flex-col items-center">
<span className="font-serif italic text-4xl text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">

                Welcome!
</span>
<p className="text-xs text-gray-400 mt-2 font-medium">

                Preparing your menu...
</p>
<div className="flex gap-2 mt-3">
<span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce"></span>
<span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
</div>
</div>
<div className="grid grid-cols-3 gap-3 w-full mt-10 pt-5 border-t border-gray-800/80 px-2">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
<Leaf className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">GOOD FOOD</span>
</div>
<div className="flex flex-col items-center border-x border-gray-800 px-1">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
<Users className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">HAPPIER PEOPLE</span>
</div>
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
<Heart className="w-4 h-4" />
</div>
<span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">BRIGHTER DAYS</span>
</div>
</div>
</div>
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

          2. COMPACT HEADER BAR

         ========================================== */}
<header className="sticky top-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-b border-gray-800/80 px-4 py-3">
<div className="flex justify-between items-center">
<div className="flex items-center gap-2.5">
<div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
<Utensils className="w-4 h-4 text-white" />
</div>
<div>
<h2 className="text-sm font-black tracking-wide text-white uppercase">

                {shopName}
</h2>
<p className="text-[10px] text-amber-400 font-medium">Fresh Food • Fast Service</p>
</div>
</div>
<div className="flex items-center gap-1 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-full text-[11px] text-amber-400 font-bold">
<Star className="w-3 h-3 fill-amber-400" /> 4.8
</div>
</div>
</header>
<div className="p-3 space-y-3">

        {/* Compact Category Slider */}
<div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setActiveCategory(cat)}

              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm shrink-0 ${

                activeCategory === cat

                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25 scale-105'

                  : 'bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800'

              }`}
>
<span className="text-xs">

                {cat === 'All' ? '🍽️' : cat === 'Starters' ? '🍟' : cat === 'Beverages' ? '🥤' : cat === 'Chinese' ? '🍜' : cat === 'Main Course' ? '🍛' : '🍰'}
</span>

              {cat}
</button>

          ))}
</div>

        {/* Customer Details Input Card */}
<div className="bg-gray-900/90 border border-gray-800 p-3 rounded-2xl shadow-md space-y-2.5">
<div className="grid grid-cols-2 gap-1.5 bg-gray-950 p-1 rounded-xl border border-gray-800">
<button

              onClick={() => setOrderType('dine-in')}

              className={`py-1.5 text-[11px] font-black rounded-lg transition ${

                orderType === 'dine-in'

                  ? 'bg-amber-500 text-slate-950 shadow'

                  : 'text-gray-400 hover:text-white'

              }`}
>

              🍽️ Dine-In (Table)
</button>
<button

              onClick={() => setOrderType('delivery')}

              className={`py-1.5 text-[11px] font-black rounded-lg transition ${

                orderType === 'delivery'

                  ? 'bg-amber-500 text-slate-950 shadow'

                  : 'text-gray-400 hover:text-white'

              }`}
>

              🛵 Home Delivery
</button>
</div>
<div className="grid grid-cols-2 gap-2">
<input

              type="text"

              placeholder="Your Full Name *"

              value={customerName}

              onChange={(e) => setCustomerName(e.target.value)}

              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-base text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"

            />

            {orderType === 'dine-in' ? (
<input

                type="text"

                placeholder="Table No. (e.g. 4) *"

                value={tableNumber}

                onChange={(e) => setTableNumber(e.target.value)}

                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"

              />

            ) : (
<input

                type="text"

                placeholder="Delivery Address *"

                value={deliveryAddress}

                onChange={(e) => setDeliveryAddress(e.target.value)}

                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"

              />

            )}
</div>
</div>

        {/* Search Input Bar */}
<div className="relative">
<Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
<input

            type="text"

            placeholder="Search your favourite food..."

            value={menuSearch}

            onChange={(e) => setMenuSearch(e.target.value)}

            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition shadow-inner"

          />
</div>

        {errorMessage && (
<div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-[11px] font-bold shadow-sm">

            {errorMessage}
</div>

        )}

        {/* Menu Items List */}
<div className="space-y-2.5">
<div className="flex items-center justify-between px-1">
<h3 className="text-xs font-black text-white tracking-wider uppercase">

              🔥 Menu & Bestsellers
</h3>
<span className="text-[11px] text-amber-400 font-medium">{filteredItems.length} items</span>
</div>

          {filteredItems.length === 0 ? (
<div className="text-center py-10 bg-gray-900 border border-gray-800 rounded-2xl p-4 text-gray-400 text-xs shadow-inner">

              No items matching your search! 🍽️
</div>

          ) : (

            filteredItems.map((item) => {

              const qty = cart[item.id] || 0;

              return (
<div

                  key={item.id}

                  className="bg-gray-900 border border-gray-800/90 rounded-2xl p-3 flex justify-between items-center gap-3 shadow-md hover:border-gray-700 transition"
>
<div className="space-y-1 flex-1">
<span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">

                      {item.category}
</span>
<h4 className="font-bold text-xs text-white">{item.name}</h4>
<p className="text-[10px] text-gray-400 line-clamp-1">{item.description}</p>
<p className="font-black text-xs text-amber-400">₹{item.price}</p>
</div>
<div className="flex items-center">

                    {qty === 0 ? (
<button

                        onClick={() => updateQuantity(item.id, 1)}

                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black px-3.5 py-2 rounded-xl text-xs transition shadow-sm flex items-center gap-1"
>
<Plus className="w-3 h-3 stroke-[3]" /> Add
</button>

                    ) : (
<div className="flex items-center bg-gray-800 border border-amber-500/40 rounded-xl overflow-hidden shadow-inner">
<button

                          onClick={() => updateQuantity(item.id, -1)}

                          className="px-2.5 py-1.5 text-amber-400 font-black hover:bg-gray-700 transition text-xs"
>
<Minus className="w-3 h-3" />
</button>
<span className="px-2 font-black text-xs text-white">{qty}</span>
<button

                          onClick={() => updateQuantity(item.id, 1)}

                          className="px-2.5 py-1.5 text-amber-400 font-black hover:bg-gray-700 transition text-xs"
>
<Plus className="w-3 h-3" />
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

      {/* ==========================================

          3. BOTTOM FLOATING ACTIONS

         ========================================== */}
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0B0F17]/95 backdrop-blur-md border-t border-gray-800 p-2.5 z-40 space-y-2 shadow-2xl rounded-t-2xl">

        {totalItemsCount > 0 && (
<button

            onClick={handleWhatsAppOrder}

            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-between shadow-lg shadow-emerald-600/20 transition"
>
<div className="flex items-center gap-1.5">
<ShoppingCart className="w-3.5 h-3.5" />
<span>{totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} | ₹{totalAmount}</span>
</div>
<div className="flex items-center gap-1">
<span>Order on WhatsApp</span>
<span className="text-sm">💬</span>
</div>
</button>

        )}
<div className="grid grid-cols-2 gap-2">
<button

            onClick={handleCallRestaurant}

            className="flex items-center justify-center gap-1.5 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-gray-300 transition"
>
<Phone className="w-3.5 h-3.5 text-amber-400" /> Call
</button>
<button

            onClick={handleShareMenu}

            className="flex items-center justify-center gap-1.5 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-gray-300 transition"
>
<Share2 className="w-3.5 h-3.5 text-amber-400" /> Share
</button>
</div>
<div className="text-center pt-0.5">
<p className="text-[9px] text-gray-500 font-medium">

            Powered by <strong className="text-gray-400 font-bold">LearnBuild Hub</strong> | Learn. Build. Grow. 🚀
</p>
</div>
</div>
</div>

  );

}
 
