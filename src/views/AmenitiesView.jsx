import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Pizza, Beer, MapPin, Wifi, Car, ShoppingBag, ArrowRight, Star } from 'lucide-react';

const AmenitiesView = () => {
  const [activeCategory, setActiveCategory] = useState('food');

  const menuItems = {
    food: [
      { id: 1, name: 'Artisan Stadium Pizza', price: '$14.99', rating: 4.8, icon: Pizza },
      { id: 2, name: 'Gourmet Wagyu Burger', price: '$18.50', rating: 4.9, icon: Pizza },
      { id: 3, name: 'Cold Brew Nitrogen Coffee', price: '$6.00', rating: 4.7, icon: Coffee },
      { id: 4, name: 'Craft IPA Pint', price: '$11.00', rating: 4.6, icon: Beer },
    ],
    merch: [
      { id: 101, name: 'AuraFlow Limited Jersey', price: '$85.00', rating: 5.0, icon: ShoppingBag },
      { id: 102, name: 'Smart Fan Scarf', price: '$22.00', rating: 4.7, icon: ShoppingBag },
      { id: 103, name: 'Neon Venue Cap', price: '$28.00', rating: 4.5, icon: ShoppingBag },
    ]
  };

  const restrooms = [
    { zone: 'North A', capacity: 'Low Wait', dist: '50m' },
    { zone: 'East B', capacity: 'Busy', dist: '120m' },
    { zone: 'South Conc', capacity: 'Available', dist: '200m' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-black mb-4">Venue Amenities</h1>
        <p className="text-white/60">Everything you need for a comfortable experience.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Menu & Merch */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-effect rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveCategory('food')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'food' ? 'bg-teal text-navy' : 'bg-white/5 text-white/60'}`}
                >
                  Food & Drink
                </button>
                <button 
                  onClick={() => setActiveCategory('merch')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'merch' ? 'bg-teal text-navy' : 'bg-white/5 text-white/60'}`}
                >
                  Merchandise
                </button>
              </div>
              <div className="flex items-center gap-2 text-teal text-sm">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                Kitchen Open
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {menuItems[activeCategory].map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-teal/30 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-white/5 text-teal group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1 text-amber text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {item.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-teal font-black text-xl">{item.price}</span>
                      <button 
                        onClick={() => alert(`Added ${item.name} to cart`)}
                        className="px-4 py-2 rounded-lg bg-teal/10 hover:bg-teal text-teal hover:text-navy transition-all font-bold text-xs"
                      >
                        Order Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Parking & WiFi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="glass-effect rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5">
                  <Car className="w-5 h-5 text-teal" />
                </div>
                <h2 className="text-xl font-bold">Parking Info</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Your Vehicle</span>
                  <span className="font-bold">Zone B, Row 4</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-teal"></div>
                </div>
                <p className="text-xs text-white/40">Zone B is currently at 75% capacity.</p>
                <button 
                  onClick={() => alert('Opening Find My Car AR...')}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Find My Car
                </button>
              </div>
            </section>

            <section className="glass-effect rounded-3xl p-8 border-teal/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-teal/10">
                  <Wifi className="w-5 h-5 text-teal" />
                </div>
                <h2 className="text-xl font-bold">Smart WiFi</h2>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-teal/5 border border-teal/10">
                  <p className="text-xs text-white/40 mb-1">Network Name</p>
                  <p className="font-mono font-bold text-teal">AuraFlow_Ultra_5G</p>
                </div>
                <button 
                  onClick={() => alert('Connecting to Venue WiFi...')}
                  className="w-full py-3 rounded-xl bg-teal text-navy font-bold text-sm hover:scale-[1.02] transition-transform"
                >
                  Connect Automatically
                </button>
                <p className="text-[10px] text-center text-white/30 italic">High-speed browsing included with your ticket.</p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Restrooms & Logistics */}
        <div className="space-y-8">
          <section className="glass-effect rounded-3xl p-8 h-full">
            <h2 className="text-xl font-bold mb-6">Nearby Restrooms</h2>
            <div className="space-y-6">
              {restrooms.map((rr, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-white/10 h-20 flex flex-col justify-center">
                  <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-8 rounded-full bg-teal/30"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{rr.zone}</h4>
                      <p className="text-xs text-white/40">{rr.dist} away</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${rr.capacity === 'Busy' ? 'bg-amber/10 text-amber' : 'bg-teal/10 text-teal'}`}>
                      {rr.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
              <ShoppingBag className="w-8 h-8 text-white/20 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Pre-order Pickup</h3>
              <p className="text-xs text-white/40 mb-4">Save time and skip the queue. Order directly in the app.</p>
              <button 
                onClick={() => alert('Scanning for pickup lockers...')}
                className="text-teal text-sm font-bold flex items-center justify-center gap-1 mx-auto hover:gap-2 transition-all"
              >
                Find Pickup Lockers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesView;
