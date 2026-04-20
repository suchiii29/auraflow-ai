import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Phone, MapPin, Activity, AlertTriangle, LifeBuoy } from 'lucide-react';

const SafetyView = () => {
  const firstAidLocations = [
    { id: 1, name: 'North Medical Hub', status: 'Available', wait: '0 mins' },
    { id: 2, name: 'East Plaza First Aid', status: 'Busy', wait: '5 mins' },
    { id: 3, name: 'Main Concourse Clinic', status: 'Available', wait: '2 mins' },
  ];

  const handleSOS = () => {
    alert('🚨 EMERGENCY SOS ACTIVATED. Security and Medical teams have been dispatched to your GPS location.');
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-black mb-4">Safety & Security</h1>
        <p className="text-white/60">Real-time assistance and emergency protocols.</p>
      </motion.div>

      {/* SOS Button Section */}
      <section className="mb-12">
        <div className="glass-effect rounded-[2rem] p-12 text-center border-red-500/20 bg-red-500/[0.02]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSOS}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-red-600 flex flex-col items-center justify-center gap-2 shadow-[0_0_50px_rgba(220,38,38,0.5)] mx-auto mb-8 relative group"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-red-600/30 -z-10"
            />
            <ShieldAlert className="w-12 h-12 md:w-16 md:h-16 text-white" />
            <span className="font-black text-xl md:text-2xl tracking-widest text-white">SOS</span>
          </motion.button>
          <h2 className="text-2xl font-bold mb-2">Emergency Help Needed?</h2>
          <p className="text-white/40 max-w-sm mx-auto">Tap the button above to alert venue security and medical staff immediately. Your location will be shared automatically.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Aid Locations */}
        <section className="glass-effect rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-teal/10">
              <Activity className="w-5 h-5 text-teal" />
            </div>
            <h2 className="text-xl font-bold">First Aid Locations</h2>
          </div>
          <div className="space-y-4">
            {firstAidLocations.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div>
                  <h3 className="font-bold">{loc.name}</h3>
                  <p className="text-xs text-white/40">{loc.status} • {loc.wait} wait</p>
                </div>
                <button 
                  onClick={() => alert(`Navigating to ${loc.name}`)}
                  className="p-2 rounded-lg bg-teal/10 hover:bg-teal/20 text-teal transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Security / Contacts */}
        <div className="space-y-8">
          <section className="glass-effect rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-amber/10">
                <Phone className="w-5 h-5 text-amber" />
              </div>
              <h2 className="text-xl font-bold">Security Support</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => alert('Calling Venue Security...')}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5">
                  <ShieldAlert className="w-6 h-6 text-white/80" />
                </div>
                <span className="text-sm font-bold">Call Security</span>
              </button>
              <button 
                onClick={() => alert('Opening Help Chat...')}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5">
                  <LifeBuoy className="w-6 h-6 text-white/80" />
                </div>
                <span className="text-sm font-bold">Support Chat</span>
              </button>
            </div>
          </section>

          {/* Quick Stats / Warning */}
          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-amber flex-shrink-0" />
            <div>
              <h4 className="font-bold text-amber mb-1">High Heat Warning</h4>
              <p className="text-xs text-white/60 leading-relaxed">Temperatures in the South Zone are exceeding 30°C. Stay hydrated and find shaded areas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Map */}
      <section className="mt-12">
        <div className="glass-effect rounded-[2rem] p-4 h-64 relative overflow-hidden group">
          <div className="absolute inset-0 bg-navy/80 flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-teal mx-auto mb-2" />
              <p className="font-bold">Medical Posts Map</p>
              <p className="text-xs text-white/40">Real-time coverage visualization</p>
            </div>
          </div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544642239-6f91af3cd9ec?auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center grayscale opacity-20" />
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse border-4 border-navy shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
          <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-teal-500 rounded-full animate-pulse border-4 border-navy shadow-[0_0_15px_rgba(0,212,170,0.8)]" />
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-teal-500 rounded-full animate-pulse border-4 border-navy shadow-[0_0_15px_rgba(0,212,170,0.8)]" />
        </div>
      </section>
    </div>
  );
};

export default SafetyView;
