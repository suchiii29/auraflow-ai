import React from 'react';
import { LayoutDashboard, Shield, Bell, Menu, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ view, setView, isOps, setIsOps }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => setView('landing')} className="cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center teal-glow">
            <Shield className="w-5 h-5 text-navy" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AURA<span className="text-teal text-shadow-teal">FLOW</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <button 
            onClick={() => setView('dashboard')}
            className={`hover:text-teal transition-colors ${view === 'dashboard' ? 'text-teal' : ''}`}
          >
            Dashboard
          </button>
          <button className="hover:text-teal transition-colors">Safety</button>
          <button className="hover:text-teal transition-colors">Amenities</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setIsOps(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${!isOps ? 'bg-teal text-navy' : 'text-white/60 hover:text-white'}`}
            >
              Attendee
            </button>
            <button 
              onClick={() => setIsOps(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isOps ? 'bg-amber text-navy' : 'text-white/60 hover:text-white'}`}
            >
              Ops Center
            </button>
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block"></div>
          
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
            <Bell className="w-5 h-5 text-white/80" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber rounded-full border-2 border-navy"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors hidden sm:block">
            <User className="w-5 h-5 text-white/80" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
