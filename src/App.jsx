import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import LandingPage from './views/LandingPage';
import AttendeeDashboard from './views/AttendeeDashboard';
import OpsCommandCenter from './views/OpsCommandCenter';
import { useSimulatedData } from './hooks/useSimulatedData';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [view, setView] = useState('landing');
  const [isOps, setIsOps] = useState(false);
  const [activeTab, setActiveTab] = useState('nav');
  const stats = useSimulatedData();

  const renderView = () => {
    if (isOps) {
      return <OpsCommandCenter stats={stats} />;
    }

    switch (view) {
      case 'landing':
        return <LandingPage setView={setView} setIsOps={setIsOps} />;
      case 'dashboard':
        return <AttendeeDashboard stats={stats} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <LandingPage setView={setView} setIsOps={setIsOps} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white selection:bg-teal selection:text-navy font-sans">
      <Navbar 
        view={view} 
        setView={setView} 
        isOps={isOps} 
        setIsOps={setIsOps} 
      />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={isOps ? 'ops' : view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isOps && view === 'dashboard' && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;
