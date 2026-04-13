import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Label
} from 'recharts';
import { 
  Users, 
  AlertCircle, 
  Clock, 
  Shield, 
  ChevronRight, 
  CheckCircle,
  MoreHorizontal,
  Plus,
  Minus,
  Brain
} from 'lucide-react';

const OpsCommandCenter = () => {
  // Chart Data Simulation
  const [chartData, setChartData] = useState(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      time: i,
      gates: 60 + Math.random() * 10,
      concessions: 40 + Math.random() * 20,
      exits: 20 + Math.random() * 10
    }));
  });

  // SLA Monitor State
  const [slaZones, setSlaZones] = useState([
    { zone: 'Gate A', wait: 8, length: 120, status: 'On Target' },
    { zone: 'Gate B', wait: 15, length: 240, status: 'Watch' },
    { zone: 'Gate C', wait: 22, length: 310, status: 'Alert' },
    { zone: 'Concessions North', wait: 5, length: 45, status: 'On Target' },
    { zone: 'Concessions South', wait: 18, length: 180, status: 'Watch' },
    { zone: 'Merch Stand Main', wait: 12, length: 90, status: 'On Target' },
    { zone: 'VIP Entry', wait: 3, length: 15, status: 'On Target' },
    { zone: 'East Deck', wait: 28, length: 400, status: 'Alert' },
  ]);

  // Alert State
  const initialAlerts = [
    { id: 1, text: "Predicted bottleneck at Gate C in 18 min — recommend opening Gate D", type: 'amber', active: true },
    { id: 2, text: "Concession Zone B queue will exceed 12 min at halftime — pre-position 3 staff", type: 'amber', active: true },
    { id: 3, text: "Post-game exit surge predicted in 22 min — activate staggered dismissal protocol", type: 'red', active: true },
    { id: 4, text: "All systems normal — no critical alerts reported", type: 'green', active: true },
  ];
  const [alerts, setAlerts] = useState(initialAlerts);

  // Staff Deployed State (Grid Map)
  const [staffGrid, setStaffGrid] = useState([
    { id: 1, name: 'Zone A', count: 24 },
    { id: 2, name: 'Zone B', count: 32 },
    { id: 3, name: 'Zone C', count: 18 },
    { id: 4, name: 'Zone D', count: 14 },
    { id: 5, name: 'Inner Circle', count: 24 },
    { id: 6, name: 'Concourses', count: 30 },
  ]);

  const totalStaff = useMemo(() => staffGrid.reduce((sum, z) => sum + z.count, 0), [staffGrid]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const next = {
          time: last.time + 1,
          gates: Math.max(0, Math.min(100, last.gates + (Math.random() * 4 - 2))),
          concessions: Math.max(0, Math.min(100, last.concessions + (Math.random() * 6 - 3))),
          exits: Math.max(0, Math.min(100, last.exits + (Math.random() * 2 - 1)))
        };
        return [...prev.slice(1), next];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDispatch = (zoneName) => {
    setSlaZones(prev => prev.map(z => 
      z.zone === zoneName ? { ...z, status: 'Watch', wait: Math.max(5, z.wait - 5) } : z
    ));
  };

  const adjustStaff = (id, delta) => {
    setStaffGrid(prev => prev.map(z => 
      z.id === id ? { ...z, count: Math.max(0, z.count + delta) } : z
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Target': return 'bg-teal/20 text-teal border-teal/20';
      case 'Watch': return 'bg-amber/20 text-amber border-amber/20';
      case 'Alert': return 'bg-red-500/20 text-red-500 border-red-500/20';
      default: return 'bg-white/10 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#050810] pt-24 pb-12 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Row Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Attendance', value: '38,420', sub: '/ 45,000', icon: Users, color: 'text-white' },
            { label: 'Active Incidents', value: '2', sub: 'Urgent', icon: AlertCircle, color: 'text-amber' },
            { label: 'Avg Queue Wait', value: '4.2', sub: 'min', icon: Clock, color: 'text-teal' },
            { label: 'Staff On-Duty', value: totalStaff, sub: 'Personnel', icon: Shield, color: 'text-white' },
          ].map((m, i) => (
            <div key={i} className="glass-effect p-6 rounded-3xl border border-white/5 relative group">
               <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                     <m.icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">{m.label}</span>
               </div>
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{m.value}</span>
                  <span className="text-xs font-medium text-white/40">{m.sub}</span>
               </div>
            </div>
          ))}
        </div>

        {/* Section 1: Crowd Heatmap */}
        <div className="glass-effect p-8 rounded-3xl border border-white/10 h-96">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div>
               <h3 className="font-bold uppercase tracking-widest text-sm text-white/80">60-Minute Density Stream</h3>
            </div>
            <div className="flex gap-6">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40"><div className="w-2 h-2 rounded bg-teal"></div> Gates</div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40"><div className="w-2 h-2 rounded bg-white/40"></div> Concessions</div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40"><div className="w-2 h-2 rounded bg-amber"></div> Exits</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGates" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D4AA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} stroke="#ffffff10" fontSize={10} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0E1A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
              />
              <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="5 5">
                <Label value="Congestion Alert" position="insideTopRight" fill="#ef4444" fontSize={10} fontWeight="bold" />
              </ReferenceLine>
              <Area type="monotone" dataKey="gates" stroke="#00D4AA" fillOpacity={1} fill="url(#colorGates)" />
              <Area type="monotone" dataKey="concessions" stroke="#ffffff40" fill="transparent" />
              <Area type="monotone" dataKey="exits" stroke="#FFB800" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Section 2: Queue SLA Monitor */}
          <div className="glass-effect rounded-3xl border border-white/10 overflow-hidden flex flex-col">
            <div className="p-8 pb-4">
               <h3 className="font-bold uppercase tracking-widest text-sm text-white/80">Queue SLA Monitor</h3>
            </div>
            <div className="flex-1 overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="text-[10px] uppercase font-bold tracking-widest text-white/30 border-b border-white/5">
                     <tr>
                        <th className="px-8 py-4">Zone</th>
                        <th className="px-6 py-4">Wait</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {slaZones.map((z, i) => (
                       <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-4 font-bold">{z.zone}</td>
                          <td className="px-6 py-4">
                             <div className="flex items-baseline gap-1">
                                <span className={`${z.wait > 20 ? 'text-red-500' : 'text-white'} font-black`}>{z.wait}</span>
                                <span className="text-[10px] text-white/40">m</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(z.status)}`}>
                                {z.status}
                             </span>
                          </td>
                          <td className="px-8 py-4 text-right">
                             {z.status === 'Alert' ? (
                               <button 
                                onClick={() => handleDispatch(z.zone)}
                                className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-[10px] font-bold uppercase hover:bg-red-600 transition-all hover:scale-105"
                               >
                                  Dispatch Staff
                               </button>
                             ) : (
                               <MoreHorizontal className="w-5 h-5 text-white/10 ml-auto" />
                             )}
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>

          {/* Section 3: AI Predictive Alerts */}
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-teal" />
                  <h3 className="font-bold uppercase tracking-widest text-sm text-white/80">AI Predictive Feed</h3>
               </div>
               <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">v2.4 Engine Active</span>
            </div>
            
            <div className="space-y-4 flex-1">
              {alerts.map(alert => alert.active && (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-6 rounded-3xl border ${
                    alert.type === 'red' ? 'bg-red-500/10 border-red-500/20' : 
                    alert.type === 'amber' ? 'bg-amber/10 border-amber/20' : 
                    'bg-teal/10 border-teal/20'
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed mb-6">{alert.text}</p>
                  <div className="flex gap-4">
                     <button 
                      onClick={() => setAlerts(prev => prev.map(a => a.id === alert.id ? {...a, active: false}: a))}
                      className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                        alert.type === 'red' ? 'bg-red-500 text-white' : 
                        alert.type === 'amber' ? 'bg-amber text-navy' : 
                        'bg-teal text-navy'
                      } hover:scale-105`}
                     >
                        Take Action
                     </button>
                     <button className="px-6 py-2 rounded-xl text-[10px] font-bold uppercase text-white/40 hover:text-white transition-all">Dismiss</button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Section 4: Staff Dispatch Map */}
            <div className="glass-effect p-8 rounded-3xl border border-white/10 mt-2">
               <h3 className="font-bold uppercase tracking-widest text-sm text-white/80 mb-6">Staff Reallocation Grid</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {staffGrid.map(z => (
                    <div key={z.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-2">{z.name}</span>
                       <div className="flex items-center justify-between">
                          <span className="text-xl font-black">{z.count}</span>
                          <div className="flex gap-1">
                             <button onClick={() => adjustStaff(z.id, -1)} className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"><Minus className="w-3 h-3 text-white/40"/></button>
                             <button onClick={() => adjustStaff(z.id, 1)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"><Plus className="w-3 h-3 text-teal"/></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpsCommandCenter;
