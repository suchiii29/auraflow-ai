import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  Compass, 
  Monitor, 
  Coffee, 
  LogOut, 
  Zap, 
  Brain, 
  Target 
} from 'lucide-react';

const LandingPage = ({ setView, setIsOps }) => {
  const [tickerStats, setTickerStats] = useState([
    { label: 'Avg Wait Time', value: '4.2 min', sub: '(was 14 min)', color: 'text-teal' },
    { label: 'Crowd Density', value: '67%', sub: 'capacity', color: 'text-white' },
    { label: 'Active Queues', value: '24', sub: 'zones', color: 'text-white' },
    { label: 'Staff Deployed', value: '142', sub: '', color: 'text-white' },
    { label: 'Pre-orders Today', value: '3,847', sub: '', color: 'text-white' },
    { label: 'Predicted Bottlenecks', value: '0', sub: '', color: 'text-amber' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerStats(prev => prev.map(stat => {
        if (stat.label === 'Crowd Density') {
          const val = parseInt(stat.value) + (Math.random() > 0.5 ? 1 : -1);
          return { ...stat, value: `${Math.max(0, Math.min(100, val))}%` };
        }
        if (stat.label === 'Pre-orders Today') {
          const val = parseInt(stat.value.replace(',', '')) + Math.floor(Math.random() * 5);
          return { ...stat, value: val.toLocaleString() };
        }
        return stat;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Activity, title: 'CrowdFlow AI', desc: 'Real-time density mapping and predictive movement analytics.' },
    { icon: Clock, title: 'QueueSync', desc: 'Dynamic wait-time load balancing across all venue entry points.' },
    { icon: Compass, title: 'AuraGuide AR', desc: 'Augmented reality wayfinding for seamless indoor navigation.' },
    { icon: Monitor, title: 'VenueSync Command', desc: 'Centralized operations hub with automated staff dispatching.' },
    { icon: Coffee, title: 'Pre-Order Hub', desc: 'AI-timed concessions prep to eliminate pickup windows.' },
    { icon: LogOut, title: 'Smart Exit', desc: 'Staggered egress routing to prevent post-event congestion.' },
  ];

  const steps = [
    { icon: Zap, title: 'Sense', desc: 'IoT sensors and vision AI capture every movement.' },
    { icon: Brain, title: 'Predict', desc: 'Neural engines anticipate bottlenecks before they form.' },
    { icon: Target, title: 'Act', desc: 'Real-time directives sent to staff and attendee apps.' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const container = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-navy min-h-screen text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 animated-grid overflow-hidden">
        <div className="absolute inset-0 stadium-gradient pointer-events-none"></div>
        
        <motion.div 
          className="max-w-5xl text-center z-10"
          initial="initial"
          animate="animate"
          variants={container}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black leading-none mb-6 tracking-tight"
          >
            Smart Venues.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-white">
              Seamless Moments.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AuraFlow uses AI to eliminate wait times, predict crowd movement, and create unforgettable event experiences.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => { setView('dashboard'); setIsOps(false); }}
              className="px-10 py-4 rounded-full bg-teal text-navy font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]"
            >
              Attendee View
            </button>
            <button 
              onClick={() => setIsOps(true)}
              className="px-10 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold text-lg transition-all hover:bg-white/10"
            >
              Ops Dashboard
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Aura Elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-teal/10 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber/5 blur-[120px] rounded-full pointer-events-none"
        />
      </section>

      {/* Live Stats Ticker */}
      <div className="bg-white/5 border-y border-white/10 py-4 marquee-container backdrop-blur-md sticky top-16 z-40">
        <div className="marquee-content inline-flex gap-16 px-8">
          {[...tickerStats, ...tickerStats].map((stat, i) => (
            <div key={i} className="flex flex-col items-center min-w-[140px]">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
                {stat.sub && <span className="text-[10px] text-white/40">{stat.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Venue Intelligence Suite</motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-teal mx-auto rounded-full"></motion.div>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="p-8 rounded-3xl glass-effect group hover:border-teal/50 transition-all hover:bg-teal/[0.02]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The AuraFlow Cycle</h2>
          <p className="text-white/40">From data points to delighted fans in milliseconds.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center px-8 relative z-10"
              >
                <div className="w-20 h-20 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mb-6 ring-8 ring-navy">
                  <step.icon className="w-10 h-10 text-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-teal/20 to-teal/0 mx-[-40px] opacity-30"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section className="py-24 text-center border-t border-white/5 bg-navy/50">
        <h2 className="text-3xl font-bold mb-8 italic">Ready to transform your venue?</h2>
        <button className="px-12 py-5 rounded-full bg-white text-navy font-black text-xl hover:scale-105 transition-all shadow-xl">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
