import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Bell, 
  User, 
  X, 
  Ticket, 
  Clock, 
  Settings, 
  LogOut,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ view, setView, isOps, setIsOps }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'notifs' | 'profile' | null
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      text: "Gate B is now less crowded - use for faster entry", 
      time: "2 min ago", 
      dot: "bg-teal",
      read: false 
    },
    { 
      id: 2, 
      text: "Your pre-order #1042 is ready for pickup at Counter 3", 
      time: "5 min ago", 
      dot: "bg-amber",
      read: false 
    },
    { 
      id: 3, 
      text: "Halftime show starts in 10 minutes at South Plaza", 
      time: "8 min ago", 
      dot: "bg-blue-500",
      read: false 
    }
  ]);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target) &&
          profileRef.current && !profileRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dismissNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const menuItems = [
    { icon: Ticket, label: "My Tickets" },
    { icon: Clock, label: "Order History" },
    { icon: Settings, label: "Accessibility Settings" },
    { icon: LogOut, label: "Logout", color: "text-red-400" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
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
          <button 
            onClick={() => setView('safety')}
            className={`hover:text-teal transition-colors ${view === 'safety' ? 'text-teal' : ''}`}
          >
            Safety
          </button>
          <button 
            onClick={() => setView('amenities')}
            className={`hover:text-teal transition-colors ${view === 'amenities' ? 'text-teal' : ''}`}
          >
            Amenities
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => { setIsOps(false); setView('dashboard'); }}
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
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'notifs' ? null : 'notifs')}
              className={`p-2 rounded-full transition-colors relative ${activeDropdown === 'notifs' ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <Bell className="w-5 h-5 text-white/80" />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber rounded-full border-2 border-navy"></span>
              )}
            </button>

            <AnimatePresence>
              {activeDropdown === 'notifs' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 glass-effect rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-[60]"
                >
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-widest text-white/40">Notifications</span>
                    <span className="text-[10px] bg-teal/10 text-teal px-2 py-0.5 rounded-full font-bold">{notifications.length} NEW</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-12 text-center">
                        <Info className="w-8 h-8 text-white/10 mx-auto mb-2" />
                        <p className="text-xs text-white/40">All caught up!</p>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group relative">
                          <div className="flex gap-3 pr-6">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`}></div>
                            <div className="space-y-1">
                              <p className="text-xs leading-relaxed text-white/80">{n.text}</p>
                              <p className="text-[10px] text-white/30">{n.time}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => dismissNotif(n.id)}
                            className="absolute top-4 right-4 p-1 rounded-md hover:bg-white/10 text-white/20 hover:text-white/60 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button 
                      onClick={() => setNotifications([])}
                      className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-teal hover:bg-teal/5 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
              className={`p-2 rounded-full transition-colors hidden sm:block ${activeDropdown === 'profile' ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <User className="w-5 h-5 text-white/80" />
            </button>

            <AnimatePresence>
              {activeDropdown === 'profile' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-72 glass-effect rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-[60]"
                >
                  <div className="p-6 bg-white/[0.02] border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-blue-600 flex items-center justify-center font-black text-navy text-lg ring-4 ring-white/5">
                        NS
                      </div>
                      <div>
                        <h3 className="font-bold text-white leading-none mb-1">N Suchitra</h3>
                        <p className="text-xs text-white/40">attendee@auraflow.in</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    {menuItems.map((item, i) => (
                      <button 
                        key={i}
                        onClick={() => alert(`Opening ${item.label}...`)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group ${item.color || 'text-white/70'}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-white/20 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                  <div className="px-6 py-4 bg-teal/5 border-t border-white/5 text-[10px] text-white/30 text-center italic">
                    Premium Member • AuraFlow Bengaluru
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
