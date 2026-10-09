'use client';

import { useState, useEffect } from 'react';

// Sample categories and items

const categories = ['All', 'Starters', 'Beverages', 'Chinese', 'Main Course'];

const menuItems = [

  { id: 1, name: 'Special Adrak Chai', price: 15, category: 'Beverages', desc: 'Garam garam adrak wali chai' },

  { id: 2, name: 'Bun Maska', price: 25, category: 'Starters', desc: 'Classic butter bun' },

  { id: 3, name: 'Aloo Samosa', price: 15, category: 'Starters', desc: 'Crispy and spicy' },

  { id: 4, name: 'Cold Coffee', price: 50, category: 'Beverages', desc: 'Thandi thandi creamy coffee' },

  { id: 5, name: 'Veg Hakka Noodles', price: 80, category: 'Chinese', desc: 'Toss up with fresh veggies' },

  { id: 6, name: 'Paneer Chilli', price: 120, category: 'Chinese', desc: 'Spicy restaurant style' },

  { id: 7, name: 'Dal Tadka & Rice', price: 110, category: 'Main Course', desc: 'Ghar jaisa khana' },

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

  // 2 Seconds Splash Screen Timer

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 2000);

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

      setErrorMessage('Please enter your Name!');

      return;

    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {

      setErrorMessage('Please enter your Table/Seat Number!');

      return;

    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {

      setErrorMessage('Please enter your Delivery Address!');

      return;

    }

    setErrorMessage('');

    const shopOwnerNumber = '919876543210'; 

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

  // 1. Splash Screen View

  if (showSplash) {

    return (
<div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-gray-900 flex flex-col items-center justify-center z-50 text-white p-6">
<div className="animate-bounce mb-4 bg-white/10 p-4 rounded-full backdrop-blur-md">
<span className="text-4xl">⚡</span>
</div>
<h1 className="text-3xl font-extrabold tracking-tight text-center">Sharma Ji Chai & Fast Food</h1>
<p className="text-indigo-200 text-sm mt-2 font-medium">Scan. Select. Direct WhatsApp Order.</p>
<div className="absolute bottom-10 flex items-center space-x-2 text-xs text-indigo-300">
<span>Powered by LearnBuild Hub</span>
</div>
</div>

    );

  }

  // 2. Main Menu View

  return (
<main className="min-h-screen bg-gray-50 pb-32 max-w-md mx-auto shadow-xl border-x relative">

      {/* App Header */}
<header className="bg-white sticky top-0 z-20 shadow-sm border-b px-4 py-3">
<div className="flex justify-between items-center">
<div>
<h1 className="text-lg font-bold text-gray-900">Sharma Ji Stall</h1>
<p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live QR Menu
</p>
</div>
<span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">

            LearnBuild Hub
</span>
</div>
</header>
<div className="p-4 space-y-4">

        {/* Order Type Toggle */}
<div className="flex bg-gray-200 p-1 rounded-xl">
<button

            onClick={() => { setOrderType('dine-in'); setErrorMessage(''); }}

            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${

              orderType === 'dine-in' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-600'

            }`}
>

            🍽️ Dine-In (Stall)
</button>
<button

            onClick={() => { setOrderType('delivery'); setErrorMessage(''); }}

            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${

              orderType === 'delivery' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-600'

            }`}
>

            🛵 Home Delivery
</button>
</div>

        {/* Customer Details Form */}
<div className="bg-white p-4 rounded-2xl shadow-sm border space-y-3">
<p className="text-xs font-bold text-gray-400 uppercase tracking-wider">

            Customer Info <span className="text-red-500">*</span>
</p>
<div>
<input

              type="text"

              placeholder="Your Full Name *"

              value={customerName}

              onChange={(e) => { setCustomerName(e.target.value); setErrorMessage(''); }}

              className="w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"

            />
</div>

          {orderType === 'dine-in' ? (
<div>
<input

                type="text"

                placeholder="Table / Seat Number * (e.g. Table 4)"

                value={tableNumber}

                onChange={(e) => { setTableNumber(e.target.value); setErrorMessage(''); }}

                className="w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"

              />
</div>

          ) : (
<div>
<textarea

                placeholder="Complete Delivery Address * (House no, Street...)"

                value={deliveryAddress}

                onChange={(e) => { setDeliveryAddress(e.target.value); setErrorMessage(''); }}

                rows={2}

                className="w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"

              />
</div>

          )}

          {errorMessage && (
<p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">

              ⚠️ {errorMessage}
</p>

          )}
</div>

        {/* Category Filter Tabs */}
<div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-none">

          {categories.map((cat) => (
<button

              key={cat}

              onClick={() => setActiveCategory(cat)}

              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${

                activeCategory === cat

                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'

                  : 'bg-white text-gray-600 border hover:bg-gray-100'

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
<div key={item.id} className="bg-white p-3.5 rounded-2xl shadow-sm border flex justify-between items-center transition-all hover:border-indigo-200">
<div className="pr-2">
<span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">{item.category}</span>
<h3 className="font-bold text-gray-800 text-sm mt-1">{item.name}</h3>
<p className="text-xs text-gray-400">{item.desc}</p>
<p className="text-sm font-extrabold text-indigo-600 mt-1">₹{item.price}</p>
</div>
<div className="flex items-center">

                  {qty > 0 ? (
<div className="flex items-center bg-indigo-600 text-white rounded-xl overflow-hidden shadow-md">
<button 

                        onClick={() => updateQuantity(item.id, -1)} 

                        className="px-3 py-1.5 font-bold hover:bg-indigo-700 transition"
>

                        -
</button>
<span className="px-2 text-xs font-bold">{qty}</span>
<button 

                        onClick={() => updateQuantity(item.id, 1)} 

                        className="px-3 py-1.5 font-bold hover:bg-indigo-700 transition"
>

                        +
</button>
</div>

                  ) : (
<button 

                      onClick={() => updateQuantity(item.id, 1)} 

                      className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl transition border border-indigo-200"
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
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t shadow-2xl p-4 z-30 rounded-t-3xl">
<div className="flex justify-between items-center">
<div>
<p className="text-xs text-gray-500 font-medium">{totalItemsCount} items selected</p>
<p className="text-lg font-black text-gray-900">₹{calculateTotalAmount()}</p>
</div>
<button 

              onClick={handleWhatsAppOrder}

              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-green-200 flex items-center space-x-2 transition-all active:scale-95"
>
<span>Order on WhatsApp 🚀</span>
</button>
</div>
</div>

      )}
</main>

  );

}
 
