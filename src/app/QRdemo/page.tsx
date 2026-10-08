'use client';

import { useState } from 'react';

const menuItems = [

  { id: 1, name: 'Special Adrak Chai', price: 15, category: 'Beverages' },

  { id: 2, name: 'Bun Maska', price: 25, category: 'Snacks' },

  { id: 3, name: 'Aloo Samosa', price: 15, category: 'Snacks' },

  { id: 4, name: 'Cold Coffee', price: 50, category: 'Beverages' },

  { id: 5, name: 'Maggi Noodles', price: 30, category: 'Snacks' },

];

export default function QRMenuDemo() {

  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const [orderType, setOrderType] = useState<'dine-in' | 'delivery'>('dine-in');

  const [customerName, setCustomerName] = useState('');

  const [tableNumber, setTableNumber] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

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

  const handleWhatsAppOrder = () => {

    if (totalItemsCount === 0) return;

    // Validation checks

    if (!customerName.trim()) {

      setErrorMessage('Kripya apna Naam (Name) bharein!');

      return;

    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {

      setErrorMessage('Kripya Table Number bharein!');

      return;

    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {

      setErrorMessage('Kripya Delivery Address bharein!');

      return;

    }

    setErrorMessage(''); // Clear error if all validations pass

    const shopOwnerNumber = '919876543210'; // Dukaan wale ka WhatsApp number

    let message = `🛒 *New Order from QR Menu*\n`;

    message += `📋 *Order Type:* ${orderType === 'dine-in' ? 'Dine-In (Stall par)' : 'Home Delivery (Ghar ke liye)'}\n`;

    message += `👤 *Name:* ${customerName}\n`;

    if (orderType === 'dine-in') {

      message += `📍 *Table No:* ${tableNumber}\n`;

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

  return (
<main className="min-h-screen bg-gray-50 pb-28">

      {/* Header */}
<header className="bg-white shadow-sm p-4 sticky top-0 z-10">
<div className="max-w-md mx-auto flex justify-between items-center">
<div>
<h1 className="text-xl font-bold text-gray-800">Sharma Ji Chai Stall</h1>
<p className="text-xs text-green-600 font-medium">● Live Demo QR Menu</p>
</div>
<span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">

            LearnBuild Hub
</span>
</div>
</header>
<div className="max-w-md mx-auto p-4">

        {/* Order Type Selector Tabs */}
<div className="flex bg-gray-200 p-1 rounded-xl mb-4">
<button

            onClick={() => { setOrderType('dine-in'); setErrorMessage(''); }}

            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${

              orderType === 'dine-in' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'

            }`}
>

            🍽️ Dine-In (Stall Par)
</button>
<button

            onClick={() => { setOrderType('delivery'); setErrorMessage(''); }}

            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${

              orderType === 'delivery' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'

            }`}
>

            🛵 Home Delivery
</button>
</div>

        {/* Customer Details Form */}
<div className="bg-white p-3.5 rounded-xl shadow-sm mb-4 space-y-3 border">
<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">

            Required Details <span className="text-red-500">*</span>
</p>
<div>
<label className="block text-xs text-gray-600 mb-1 font-medium">Your Name *</label>
<input

              type="text"

              placeholder="Jaise: Rahul Sharma"

              value={customerName}

              onChange={(e) => { setCustomerName(e.target.value); setErrorMessage(''); }}

              className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

            />
</div>

          {orderType === 'dine-in' ? (
<div>
<label className="block text-xs text-gray-600 mb-1 font-medium">Table / Seat Number *</label>
<input

                type="text"

                placeholder="Jaise: Table 3 ya Counter"

                value={tableNumber}

                onChange={(e) => { setTableNumber(e.target.value); setErrorMessage(''); }}

                className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

              />
</div>

          ) : (
<div>
<label className="block text-xs text-gray-600 mb-1 font-medium">Delivery Address *</label>
<textarea

                placeholder="Apna pura pata (Address) yahan likhein..."

                value={deliveryAddress}

                onChange={(e) => { setDeliveryAddress(e.target.value); setErrorMessage(''); }}

                rows={2}

                className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"

              />
</div>

          )}

          {errorMessage && (
<p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">

              ⚠️ {errorMessage}
</p>

          )}
</div>

        {/* Menu Items List */}
<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu Items</h2>
<div className="space-y-3">

          {menuItems.map((item) => {

            const qty = cart[item.id] || 0;

            return (
<div key={item.id} className="bg-white p-3.5 rounded-xl shadow-sm border flex justify-between items-center">
<div>
<span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.category}</span>
<h3 className="font-semibold text-gray-800 mt-1">{item.name}</h3>
<p className="text-sm font-bold text-indigo-600">₹{item.price}</p>
</div>
<div className="flex items-center space-x-2">

                  {qty > 0 ? (
<div className="flex items-center bg-indigo-50 border border-indigo-200 rounded-lg overflow-hidden">
<button 

                        onClick={() => updateQuantity(item.id, -1)} 

                        className="px-3 py-1 text-indigo-700 font-bold hover:bg-indigo-100 transition"
>

                        -
</button>
<span className="px-2 text-sm font-semibold text-indigo-900">{qty}</span>
<button 

                        onClick={() => updateQuantity(item.id, 1)} 

                        className="px-3 py-1 text-indigo-700 font-bold hover:bg-indigo-100 transition"
>

                        +
</button>
</div>

                  ) : (
<button 

                      onClick={() => updateQuantity(item.id, 1)} 

                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
>

                      Add
</button>

                  )}
</div>
</div>

            );

          })}
</div>
</div>

      {/* Sticky Bottom Cart Bar */}

      {totalItemsCount > 0 && (
<div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-20">
<div className="max-w-md mx-auto flex justify-between items-center">
<div>
<p className="text-xs text-gray-500">{totalItemsCount} items selected</p>
<p className="text-lg font-bold text-gray-900">₹{calculateTotalAmount()}</p>
</div>
<button 

              onClick={handleWhatsAppOrder}

              className="bg-green-600 hover:gh-green-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md flex items-center space-x-2 transition"
>
<span>Order on WhatsApp 🚀</span>
</button>
</div>
</div>

      )}
</main>

  );

}
 
