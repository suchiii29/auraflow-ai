import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map as MapIcon, 
  Users, 
  Coffee, 
  MessageCircle, 
  ChevronRight, 
  Clock, 
  Navigation, 
  CheckCircle, 
  Send,
  Loader2,
  Trash2,
  Plus,
  Minus,
  MapPin
} from 'lucide-react';
import { getAIResponse } from '../utils/aiService';

const AttendeeDashboard = ({ stats }) => {
  const [activeTab, setActiveTab] = useState('nav');
  const [showRoute, setShowRoute] = useState(false);
  
  // Tab 2: Queue States
  const [queues, setQueues] = useState([
    { id: 1, name: 'Concessions Zone A', wait: 12, length: 18, joined: false, timeLeft: 0, pos: 0 },
    { id: 2, name: 'Restroom Block 2', wait: 3, length: 5, joined: false, timeLeft: 0, pos: 0 },
    { id: 3, name: 'Merch Stand', wait: 25, length: 42, joined: false, timeLeft: 0, pos: 0 },
    { id: 4, name: 'VIP Lounge', wait: 8, length: 10, joined: false, timeLeft: 0, pos: 0 },
    { id: 5, name: 'Beer Garden', wait: 15, length: 24, joined: false, timeLeft: 0, pos: 0 },
    { id: 6, name: 'Info Desk', wait: 2, length: 3, joined: false, timeLeft: 0, pos: 0 },
  ]);

  // Tab 3: Pre-Order States
  const menuItems = [
    { id: 1, name: 'Stadium Burger', price: 14.50, emoji: '🍔' },
    { id: 2, name: 'Classic Hotdog', price: 9.00, emoji: '🌭' },
    { id: 3, name: 'Loaded Fries', price: 11.00, emoji: '🍟' },
    { id: 4, name: 'Craft IPA', price: 12.00, emoji: '🍺' },
    { id: 5, name: 'Soft Drink', price: 6.50, emoji: '🥤' },
    { id: 6, name: 'Vegan Bowl', price: 13.50, emoji: '🥗' },
    { id: 7, name: 'Popcorn XL', price: 8.00, emoji: '🍿' },
    { id: 8, name: 'Ice Cream', price: 7.00, emoji: '🍦' },
  ];
  const [cart, setCart] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Tab 4: AI Concierge States
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm AuraGuide, your personal venue assistant for the Bengaluru Sports Arena. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // General Simulation Intervals
  useEffect(() => {
    const queueInterval = setInterval(() => {
      setQueues(prev => prev.map(q => {
        if (q.joined && q.timeLeft > 0) {
          const newTime = q.timeLeft - 1;
          const newPos = Math.max(1, Math.ceil(q.pos - (Math.random() > 0.7 ? 1 : 0)));
          return { ...q, timeLeft: newTime, pos: newPos };
        }
        // General wait time fluctuation
        return { ...q, wait: Math.max(1, q.wait + (Math.random() > 0.5 ? 1 : -1)) };
      }));
    }, 5000);

    return () => clearInterval(queueInterval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handlers
  const handleJoinQueue = (id) => {
    setQueues(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, joined: true, timeLeft: q.wait * 60, pos: q.length + 1 };
      }
      return q;
    }));
  };

  const updateCart = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const handleSendMessage = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);

    const response = await getAIResponse(msg);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find(m => m.id === parseInt(id));
    return sum + (item.price * qty);
  }, 0);

  // SVG Map Component
  const StadiumMap = () => (
    <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-2xl">
      {/* Stadium Outer Border */}
      <path d="M100,50 Q200,30 300,50 Q380,80 380,150 Q380,220 300,250 Q200,270 100,250 Q20,220 20,150 Q20,80 100,50" 
        fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      
      {/* Central Pitch */}
      <rect x="140" y="100" width="120" height="100" rx="10" fill="rgba(0,212,170,0.05)" stroke="rgba(0,212,170,0.2)" />
      
      {/* Zones */}
      {/* Gate A - North (Red) */}
      <circle cx="200" cy="40" r="15" className="fill-red-500/20 stroke-red-500 cursor-pointer hover:fill-red-500/40 transition-all" />
      <text x="200" y="45" textAnchor="middle" className="text-[10px] fill-white font-bold pointer-events-none">A</text>
      
      {/* Gate B - West (Yellow) */}
      <circle cx="40" cy="150" r="15" className="fill-amber/20 stroke-amber cursor-pointer hover:fill-amber/40 transition-all" />
      <text x="40" y="155" textAnchor="middle" className="text-[10px] fill-white font-bold pointer-events-none">B</text>
      
      {/* Gate C - East (Green) */}
      <circle cx="360" cy="150" r="15" className="fill-teal/20 stroke-teal cursor-pointer hover:fill-teal/40 transition-all" />
      <text x="360" y="155" textAnchor="middle" className="text-[10px] fill-white font-bold pointer-events-none">C</text>

      {/* Areas */}
      <path d="M110,80 L140,80 L140,220 L110,220 Z" className="fill-teal/10 stroke-teal/30" />
      <text x="125" y="155" textAnchor="middle" className="text-[8px] fill-white/40 font-bold uppercase rotate-90 origin-center translate-x-12 translate-y-[-125px]">Concessions</text>
      
      <circle cx="100" cy="80" r="8" className="fill-teal/40" />
      <text x="100" y="83" textAnchor="middle" className="text-[6px] fill-navy font-bold pointer-events-none">WC</text>
      
      <circle cx="300" cy="220" r="10" className="fill-red-500/40" />
      <text x="300" y="223" textAnchor="middle" className="text-[6px] fill-white font-bold pointer-events-none">AID</text>

      {/* Animated Route */}
      {showRoute && (
        <motion.path 
          d="M45,165 L100,165 L100,220 L200,220" 
          fill="none" 
          stroke="#00D4AA" 
          strokeWidth="3" 
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
    </svg>
  );

  return (
    <div className="min-h-screen bg-navy text-white pt-24 pb-32 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div>
            <span className="text-xs font-bold text-teal uppercase tracking-widest">Bengaluru Sports Arena</span>
          </div>
          <h1 className="text-3xl font-black">Attendee Dashboard</h1>
          <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
             <div className="p-2 rounded-lg bg-teal/10">
                <MapPin className="w-4 h-4 text-teal" />
             </div>
             <div>
                <span className="text-xs text-white/40 block">Current Location</span>
                <span className="text-sm font-bold">You are near Gate B</span>
             </div>
          </div>
        </header>

        {/* Tab Interface */}
        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/10 overflow-x-auto scrollbar-hide">
          {[
            { id: 'nav', icon: MapIcon, label: 'Navigation' },
            { id: 'queue', icon: Users, label: 'Queues' },
            { id: 'order', icon: Coffee, label: 'Pre-Order' },
            { id: 'chat', icon: MessageCircle, label: 'AuraGuide' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-teal text-navy shadow-lg shadow-teal/20' : 'text-white/40 hover:text-white/70'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'nav' && (
              <div className="space-y-6">
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden overflow-x-auto">
                    <StadiumMap />
                    <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase font-bold tracking-widest text-white/40">
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal"></div> Clear</div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber"></div> Moderate</div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Congested</div>
                    </div>
                 </div>
                 <button 
                  onClick={() => setShowRoute(!showRoute)}
                  className="w-full py-4 bg-teal text-navy font-black rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                 >
                   <Navigation className="w-5 h-5" />
                   {showRoute ? 'HIDE ROUTE' : 'BEST ROUTE TO YOUR SEAT'}
                 </button>
              </div>
            )}

            {activeTab === 'queue' && (
              <div className="grid grid-cols-1 gap-4">
                {queues.map(q => (
                  <div key={q.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-2xl ${q.joined ? 'bg-teal/10' : 'bg-white/5'}`}>
                          {q.id === 2 ? <div className="text-xl">🚽</div> : <div className="text-xl">🍔</div>}
                       </div>
                       <div>
                          <div className="font-bold text-white mb-1">{q.name}</div>
                          {q.joined ? (
                             <div className="text-[10px] text-teal uppercase font-bold tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse"></div>
                                In Queue • Position #{q.pos}
                             </div>
                          ) : (
                             <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                                Wait: {q.wait} min • Length: {q.length}
                             </div>
                          )}
                       </div>
                    </div>
                    {q.joined ? (
                      <div className="text-right">
                         <div className="text-2xl font-black text-teal">
                            {Math.floor(q.timeLeft / 60)}:{String(q.timeLeft % 60).padStart(2, '0')}
                         </div>
                         <div className="text-[10px] text-white/40 font-bold uppercase">Estimated</div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleJoinQueue(q.id)}
                        className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-teal hover:text-navy transition-all"
                      >
                        JOIN
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'order' && (
              <div className="pb-20">
                <div className="grid grid-cols-2 gap-4">
                   {menuItems.map(item => (
                     <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-3xl text-center group">
                        <div className="text-4xl mb-4 p-4 grayscale group-hover:grayscale-0 transition-all">{item.emoji}</div>
                        <div className="font-bold text-sm mb-1">{item.name}</div>
                        <div className="text-teal font-black mb-4">${item.price.toFixed(2)}</div>
                        <div className="flex items-center justify-center gap-4">
                           <button onClick={() => updateCart(item.id, -1)} className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10"><Minus className="w-3 h-3"/></button>
                           <span className="font-bold w-4">{cart[item.id] || 0}</span>
                           <button onClick={() => updateCart(item.id, 1)} className="p-1.5 rounded-lg bg-teal/10 text-teal hover:bg-teal/20"><Plus className="w-3 h-3"/></button>
                        </div>
                     </div>
                   ))}
                </div>

                <AnimatePresence>
                  {cartTotal > 0 && !orderConfirmed && (
                    <motion.div 
                      initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                      className="fixed bottom-24 left-4 right-4 max-w-2xl mx-auto bg-teal p-4 rounded-2xl flex items-center justify-between shadow-2xl z-50 text-navy"
                    >
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-tighter">Your Cart</span>
                          <span className="text-xl font-black">${cartTotal.toFixed(2)}</span>
                       </div>
                       <button 
                        onClick={() => setOrderConfirmed(true)}
                        className="bg-navy text-white px-8 py-3 rounded-xl font-black uppercase text-sm"
                       >
                          Place Order
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {orderConfirmed && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="mt-8 p-8 bg-teal/10 border border-teal text-center rounded-3xl"
                    >
                       <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" />
                       <h3 className="text-2xl font-black text-white mb-2">Order Confirmed!</h3>
                       <p className="text-white/60 mb-6 text-sm">Pickup Slot: <span className="text-teal font-bold uppercase tracking-wider">Zone B - 14:45</span></p>
                       <button onClick={() => {setOrderConfirmed(false); setCart({});}} className="text-teal text-[10px] font-black uppercase tracking-widest border-b border-teal/20">Close</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="flex flex-col h-[500px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                 <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-teal" />
                       </div>
                       <div>
                          <div className="text-sm font-bold">AuraGuide</div>
                          <div className="text-[10px] text-teal uppercase font-bold animate-pulse">Online Assistant</div>
                       </div>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-full"><Trash2 className="w-4 h-4 text-white/20"/></button>
                 </div>

                 <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-teal text-navy font-medium' : 'bg-white/5 border border-white/10 text-white/80'}`}>
                            {m.text}
                         </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                         <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-teal animate-spin" />
                            <span className="text-xs text-white/40">Searching venue data...</span>
                         </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                 </div>

                 <div className="p-4 border-t border-white/10 space-y-4">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                       {["Nearest restroom?", "Wait at Gate A?", "Best exit?", "Vegan food?"].map(query => (
                         <button 
                          key={query}
                          onClick={() => handleSendMessage(query)}
                          className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:border-teal/50 transition-all text-white/40 hover:text-white"
                         >
                           {query}
                         </button>
                       ))}
                    </div>
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                      className="flex gap-2"
                    >
                       <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything about the venue..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal transition-all"
                       />
                       <button 
                        type="submit"
                        disabled={!input.trim()}
                        className="p-4 bg-teal text-navy rounded-2xl disabled:opacity-50 transition-all active:scale-95"
                       >
                          <Send className="w-5 h-5" />
                       </button>
                    </form>
                 </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
