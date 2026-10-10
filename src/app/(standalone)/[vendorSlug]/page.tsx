'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
// Supabase client initialization
const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const categories = ['All', 'Starters', 'Beverages', 'Chinese', 'Main Course'];

const menuItems = [

  { id: 1, name: 'Special Adrak Chai', price: 15, category: 'Beverages', desc: 'Garam garam adrak wali chai ☕', bg: 'bg-amber-50 text-amber-900 border-amber-200' },

  { id: 2, name: 'Bun Maska', price: 25, category: 'Starters', desc: 'Classic butter bun 🍞', bg: 'bg-yellow-50 text-yellow-900 border-yellow-200' },

  { id: 3, name: 'Aloo Samosa', price: 15, category: 'Starters', desc: 'Crispy and spicy 🥟', bg: 'bg-orange-50 text-orange-900 border-orange-200' },

  { id: 4, name: 'Cold Coffee', price: 50, category: 'Beverages', desc: 'Thandi thandi creamy coffee 🧋', bg: 'bg-cyan-50 text-cyan-900 border-cyan-200' },

  { id: 5, name: 'Veg Hakka Noodles', price: 80, category: 'Chinese', desc: 'Toss up with fresh veggies 🍜', bg: 'bg-rose-50 text-rose-900 border-rose-200' },

  { id: 6, name: 'Paneer Chilli', price: 120, category: 'Chinese', desc: 'Spicy restaurant style 🌶️', bg: 'bg-red-50 text-red-900 border-red-200' },

  { id: 7, name: 'Dal Tadka & Rice', price: 110, category: 'Main Course', desc: 'Ghar jaisa khana 🍛', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },

];

export default function QRMenuDemo() {

  const [showSplash, setShowSplash] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const [orderType, setOrderType] = useState<'dine-in' | 'delivery'>('dine-in');

  const [customerName, setCustomerName] = useState('');

  const [tableNumber, setTableNumber] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2200);

    return () => clearTimeout(timer);

  }, []);

  const updateQuantity = (id: number, delta: number) => {

    setCart((prev) => {

      const currentQty = prev[id] || 0;

      const newQty = currentQty + delta;

      if (newQty <= 0) {

        const copy = { ...prev };

        delete copy[id];

        return copy;

      }

      return { ...prev, [id]: newQty };

    });

  };

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const calculateTotalAmount = () => {

    return Object.entries(cart).reduce((total, [id, qty]) => {

      const item = menuItems.find((p) => p.id === Number(id));

      return total + (item ? item.price * qty : 0);

    }, 0);

  };

  const filteredItems = activeCategory === 'All' 

    ? menuItems 

    : menuItems.filter(item => item.category === activeCategory);

  const handleWhatsAppOrder = () => {

    if (totalItemsCount === 0) return;

    if (!customerName.trim()) {

      setErrorMessage('Kripya apna Naam bharein!');

      return;

    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {

      setErrorMessage('Kripya Table / Seat Number bharein!');

      return;

    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {

      setErrorMessage('Kripya Delivery Address bharein!');

      return;

    }

    setErrorMessage('');

    const shopOwnerNumber = vendor?.owner_whatsapp; 

    let message = `🛒 *New Order from QR Menu*\n`;

    message += `📋 *Type:* ${orderType === 'dine-in' ? 'Dine-In (Stall)' : 'Home Delivery'}\n`;

    message += `👤 *Name:* ${customerName}\n`;

    if (orderType === 'dine-in') {

      message += `📍 *Table:* ${tableNumber}\n`;

    } else {

      message += `🏠 *Address:* ${deliveryAddress}\n`;

    }

    message += `--------------------------\n`;

    Object.entries(cart).forEach(([id, qty]) => {

      const item = menuItems.find((p) => p.id === Number(id));

      if (item) {

        const itemTotal = item.price * qty;

        message += `• ${item.name} x ${qty} = ₹${itemTotal}\n`;

      }

    });

    message += `--------------------------\n`;

    message += `💰 *Total Bill: ₹${calculateTotalAmount()}*\n`;

    message += `_Powered by LearnBuild Hub_`;

    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${shopOwnerNumber}?text=${encodedMessage}`, '_blank');

  };

  // Colorful Splash Screen

  if (showSplash) {

    return (
<div className="fixed inset-0 bg-gradient-to-tr from-orange-600 via-pink-600 to-purple-700 flex flex-col items-center justify-center z-50 text-white p-6 shadow-2xl">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none"></div>
<div className="animate-bounce mb-5 bg-white/20 p-5 rounded-3xl backdrop-blur-xl shadow-inner border border-white/30">
<span className="text-5xl">🍔</span>
</div>
<h1 className="text-3xl font-black tracking-tight text-center drop-shadow-md">{vendor?.shop_name}</h1>
<p className="text-pink-100 text-xs mt-2 font-semibold tracking-wide uppercase bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">

          ⚡ Scan. Select. Direct WhatsApp Order.
</p>
<div className="absolute bottom-8 text-xs text-white/80 font-medium tracking-wider">

          Powered by LearnBuild Hub 🚀
</div>
</div>

    );

  }

  // Colorful & Modern Menu Interface

  return (
<main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-32 max-w-md mx-auto shadow-2xl border-x relative">

      {/* Vibrant Header */}
<header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white sticky top-0 z-20 shadow-md px-4 py-3.5 rounded-b-2xl">
<div className="flex justify-between items-center">
<div>
<h1 className="text-lg font-black tracking-tight">{vendor?.shop_name} 🌟</h1>
<p className="text-[11px] text-emerald-300 font-bold flex items-center gap-1.5 mt-0.5">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live QR Digital Menu
</p>
</div>
<span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-white/20 shadow-sm">

            LearnBuild Hub
</span>
</div>
</header>
<div className="p-4 space-y-4">

        {/* Order Type Toggle */}
<div className="flex bg-indigo-100/60 p-1.5 rounded-2xl border border-indigo-200">
<button

            onClick={() => { setOrderType('dine-in'); setErrorMessage(''); }}

            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${

              orderType === 'dine-in' ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' : 'text-indigo-900 hover:bg-indigo-200/50'

            }`}
>

            🍽️ Dine-In (Stall)
</button>
<button

            onClick={() => { setOrderType('delivery'); setErrorMessage(''); }}

            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${

              orderType === 'delivery' ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' : 'text-indigo-900 hover:bg-indigo-200/50'

            }`}
>

            🛵 Home Delivery
</button>
</div>

        {/* Customer Details Form */}
<div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-3">
<p className="text-xs font-black text-indigo-600 uppercase tracking-wider">

            Customer Details <span className="text-red-500">*</span>
</p>
<div>
<input

              type="text"

              placeholder="Your Full Name *"

              value={customerName}

              onChange={(e) => { setCustomerName(e.target.value); setErrorMessage(''); }}

              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"

            />
</div>

          {orderType === 'dine-in' ? (
<div>
<input

                type="text"

                placeholder="Table / Seat Number * (e.g. Table 4)"

                value={tableNumber}

                onChange={(e) => { setTableNumber(e.target.value); setErrorMessage(''); }}

                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"

              />
</div>

          ) : (
<div>
<textarea

                placeholder="Complete Delivery Address * (House no, Street...)"

                value={deliveryAddress}

                onChange={(e) => { setDeliveryAddress(e.target.value); setErrorMessage(''); }}

                rows={2}

                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-medium"

              />
</div>

          )}

          {errorMessage && (
<p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">

              ⚠️ {errorMessage}
</p>

          )}
</div>

        {/* Colorful Category Filter Tabs */}
<div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-none">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setActiveCategory(cat)}

              className={`px-4 py-2 text-xs font-black rounded-2xl whitespace-nowrap transition-all shadow-sm ${

                activeCategory === cat

                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-200 scale-105'

                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'

              }`}
>

              {cat}
</button>

          ))}
</div>

        {/* Menu Items Cards */}
<div className="space-y-3">

          {filteredItems.map((item) => {

            const qty = cart[item.id] || 0;

            return (
<div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:shadow-md hover:border-indigo-100">
<div className="pr-2">
<span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black border ${item.bg}`}>

                    {item.category}
</span>
<h3 className="font-extrabold text-gray-900 text-sm mt-1.5">{item.name}</h3>
<p className="text-xs text-gray-500 font-medium mt-0.5">{item.desc}</p>
<p className="text-sm font-black text-indigo-600 mt-1.5">₹{item.price}</p>
</div>
<div className="flex items-center">

                  {qty > 0 ? (
<div className="flex items-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl overflow-hidden shadow-md">
<button 

                        onClick={() => updateQuantity(item.id, -1)} 

                        className="px-3.5 py-2 font-black hover:bg-black/10 transition"
>

                        -
</button>
<span className="px-2.5 text-xs font-black">{qty}</span>
<button 

                        onClick={() => updateQuantity(item.id, 1)} 

                        className="px-3.5 py-2 font-black hover:bg-black/10 transition"
>

                        +
</button>
</div>

                  ) : (
<button 

                      onClick={() => updateQuantity(item.id, 1)} 

                      className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-black rounded-2xl transition border border-indigo-200 shadow-sm"
>

                      + Add
</button>

                  )}
</div>
</div>

            );

          })}
</div>
</div>

      {/* Floating Bottom Cart Bar */}

      {totalItemsCount > 0 && (
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t shadow-2xl p-4 z-30 rounded-t-3xl">
<div className="flex justify-between items-center">
<div>
<p className="text-xs text-gray-500 font-bold">{totalItemsCount} items selected</p>
<p className="text-lg font-black text-gray-900">₹{calculateTotalAmount()}</p>
</div>
<button 

              onClick={handleWhatsAppOrder}

              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-green-200 flex items-center space-x-2 transition-all active:scale-95"
>
<span>Order on WhatsApp 🚀</span>
</button>
</div>
</div>

      )}
</main>

  );

}
 
