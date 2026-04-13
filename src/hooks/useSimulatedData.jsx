import { useState, useEffect } from 'react';

export const useSimulatedData = () => {
  const [stats, setStats] = useState({
    crowdDensity: 68,
    avgWaitTime: 12,
    activeZones: 14,
    zones: [
      { id: 'A', density: 45, status: 'Normal', flow: 'Inbound' },
      { id: 'B', density: 82, status: 'High', flow: 'Internal' },
      { id: 'C', density: 31, status: 'Low', flow: 'Outbound' },
      { id: 'D', density: 55, status: 'Normal', flow: 'Inbound' },
    ],
    queues: [
      { id: 'Gate 1', wait: 8, trend: 'Down' },
      { id: 'Food Hall', wait: 22, trend: 'Up' },
      { id: 'Merch Shop', wait: 15, trend: 'Stable' },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        crowdDensity: Math.min(100, Math.max(0, prev.crowdDensity + (Math.random() * 4 - 2))),
        avgWaitTime: Math.min(60, Math.max(2, prev.avgWaitTime + (Math.random() * 2 - 1))),
        zones: prev.zones.map(z => ({
          ...z,
          density: Math.min(100, Math.max(0, z.density + (Math.random() * 6 - 3)))
        })),
        queues: prev.queues.map(q => ({
          ...q,
          wait: Math.min(60, Math.max(1, q.wait + (Math.random() * 2 - 1)))
        }))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
