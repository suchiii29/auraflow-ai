import React from 'react';
import { Home, Map, Utensils, Calendar, Settings } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'nav', icon: Map, label: 'Wayfind' },
    { id: 'queue', icon: Calendar, label: 'Queue' },
    { id: 'preorder', icon: Utensils, label: 'Order' },
    { id: 'myevent', icon: Home, label: 'My Event' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/10 px-4 py-3 pb-8 md:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-teal' : 'text-white/40'}`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-teal/10' : ''}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
