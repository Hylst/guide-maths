import React, { useState, useEffect, useMemo, useRef } from 'react';

interface PathData {
  id: number;
  points: { t: number; y: number }[];
  color: string;
}

export default function StochasticProcessSim({ alt }: { alt?: string }) {
  const [processType, setProcessType] = useState<'wiener' | 'gbm'>('gbm');
  const [drift, setDrift] = useState<number>(0.2); // mu
  const [valatility, setVolatility] = useState<number>(0.3); // sigma
  const [numPaths, setNumPaths] = useState<number>(3);
  const [running, setRunning] = useState<boolean>(true);
  const [tick, setTick] = useState<number>(0);
  const [paths, setPaths] = useState<PathData[]>([]);

  // Chart coordinate constants
  const cWidth = 420;
  const cHeight = 280;
  const padding = 25;

  // Simulate parameters
  const steps = 100;
  const T = 1.0;
  const dt = T / steps;

  // Colors list for multiple paths
  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'];

  // Generate paths using Euler Maruyama
  // W_(t+dt) = W_t + sqrt(dt) * Z
  // GBM: dS_t = S_t * (mu*dt + sigma*dW_t)  => S_(t+dt) = S_t * exp((mu - sigma^2/2)dt + sigma*sqrt(dt)*Z)
  const generateNewPaths = () => {
    const newPaths: PathData[] = [];
    const S0 = 100; // Starting Stock price for GBM, or start at 0 for Wiener

    for (let p = 0; p < numPaths; p++) {
      const points = [{ t: 0, y: processType === 'wiener' ? 0 : S0 }];
      let currentVal = points[0].y;
      
      for (let s = 1; s <= steps; s++) {
        const t = s * dt;
        // Standard normal random variable using Box-Muller
        const u1 = Math.random() || 0.0001;
        const u2 = Math.random() || 0.0001;
        const randNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

        if (processType === 'wiener') {
          // Wiener process has drift mu*t and volatility sigma*W_t
          const dW = Math.sqrt(dt) * randNormal;
          currentVal = currentVal + drift * dt + valatility * dW;
        } else {
          // Geometric Brownian Motion
          const exponent = (drift - 0.5 * valatility * valatility) * dt + valatility * Math.sqrt(dt) * randNormal;
          currentVal = currentVal * Math.exp(exponent);
        }

        points.push({ t, y: currentVal });
      }

      newPaths.push({
        id: p,
        points,
        color: colors[p % colors.length]
      });
    }

    setPaths(newPaths);
  };

  // Trigger path generation when parameters change
  useEffect(() => {
    generateNewPaths();
  }, [processType, numPaths, drift, valatility]);

  // Tick timer for path animation simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => {
        setTick(prev => (prev >= steps ? 0 : prev + 1));
      }, 50);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  // If tick is at 0, regenerate paths just to make it a live loop
  useEffect(() => {
    if (tick === 0 && running) {
      generateNewPaths();
    }
  }, [tick]);

  // Max and Min values in currently active paths for automatic scale adjustment
  const scaleBounds = useMemo(() => {
    let max = processType === 'wiener' ? 2 : 150;
    let min = processType === 'wiener' ? -2 : 50;

    paths.forEach(p => {
      // Look at points up to the current tick
      const visiblePts = p.points.slice(0, tick + 1);
      visiblePts.forEach(pt => {
        if (pt.y > max) max = pt.y;
        if (pt.y < min) min = pt.y;
      });
    });

    const range = max - min;
    return {
      min: min - range * 0.1,
      max: max + range * 0.1
    };
  }, [paths, tick, processType]);

  // Coordinate scales mapping functions
  const mapT = (t: number) => padding + (t / T) * (cWidth - 2 * padding);
  const mapY = (y: number) => {
    const minYBound = scaleBounds.min;
    const maxYBound = scaleBounds.max;
    return cHeight - padding - ((y - minYBound) / (maxYBound - minYBound)) * (cHeight - 2 * padding);
  };

  // Theoretical analytical expectation curve E[X_t]
  const expectationPoints = useMemo(() => {
    const list = [];
    const S0 = 100;
    for (let s = 0; s <= steps; s++) {
      const t = s * dt;
      let expY = 0;
      if (processType === 'wiener') {
        expY = drift * t; // expectation for Wiener process with drift
      } else {
        expY = S0 * Math.exp(drift * t); // E[S_t] = S0 * exp(mu * t)
      }
      list.push({ t, y: expY });
    }
    return list;
  }, [processType, drift]);

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden font-sans">
      <div className="p-5 bg-gradient-to-r from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-850 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">📈 {alt || "Simulateur de Processus Aléatoires"}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Pour simuler l'évolution d'actifs à Wall-Street (GBM) ou d'une fluctuation physique (Wiener).</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-stretch sm:self-auto">
          <button 
            type="button"
            onClick={() => { setProcessType('gbm'); }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${processType === 'gbm' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Black-Scholes (GBM)
          </button>
          <button 
            type="button"
            onClick={() => { setProcessType('wiener'); }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${processType === 'wiener' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Mouv. Brownien (Wiener)
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Chart visual area */}
          <div className="md:col-span-2 flex flex-col items-center">
            
            <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 p-2 relative overflow-hidden">
              <svg 
                width="100%" 
                viewBox={`0 0 ${cWidth} ${cHeight}`} 
                className="w-full h-auto select-none"
                aria-label="Processus stochastique graphique"
                role="img"
              >
                {/* Horizontal time line grid */}
                <line x1={mapT(0)} y1={mapY(processType === 'wiener' ? 0 : 100)} x2={mapT(T)} y2={mapY(processType === 'wiener' ? 0 : 100)} stroke="rgba(148, 163, 184, 0.25)" strokeWidth="1.5" />
                
                {/* Expected trajectory (analytical expectation average) */}
                <path 
                  d={expectationPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapT(p.t)} ${mapY(p.y)}`).join(' ')} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2" 
                  strokeDasharray="5,4" 
                />

                {/* Simulated random paths (animated up to active tick) */}
                {paths.map(p => {
                  const visiblePts = p.points.slice(0, tick + 1);
                  if (visiblePts.length < 2) return null;
                  const d = visiblePts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mapT(pt.t)} ${mapY(pt.y)}`).join(' ');
                  return (
                    <path 
                      key={p.id} 
                      d={d} 
                      fill="none" 
                      stroke={p.color} 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Point indicators on active tick */}
                {paths.map(p => {
                  if (tick >= p.points.length) return null;
                  const activePt = p.points[tick];
                  return (
                    <circle 
                      key={p.id} 
                      cx={mapT(activePt.t)} 
                      cy={mapY(activePt.y)} 
                      r="4" 
                      fill={p.color} 
                      className="ring-2 ring-white" 
                    />
                  );
                })}

                {/* Chart Y labels bounds */}
                <text x={padding - 3} y={padding + 12} textAnchor="end" className="fill-slate-400 text-[9px] font-mono">
                  {scaleBounds.max.toFixed(0)}
                </text>
                <text x={padding - 3} y={cHeight - padding - 4} textAnchor="end" className="fill-slate-400 text-[9px] font-mono">
                  {scaleBounds.min.toFixed(0)}
                </text>
                
                {/* Axis indicators */}
                <text x={cWidth - padding} y={cHeight - 6} textAnchor="end" className="fill-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Temps (t = {paths[0]?.points[tick]?.t.toFixed(2) || '1.0'})
                </text>
              </svg>

              {/* Expectations markers */}
              <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 border border-slate-150 dark:border-slate-800 px-2 py-1.5 rounded-xl text-[10px] font-semibold flex items-center gap-2 shadow-sm">
                <span className="w-3.5 h-0.5 border-t-2 border-dashed border-emerald-500 inline-block" />
                <span className="text-slate-600 dark:text-slate-400">Moyenne Espérée E[X_t]</span>
              </div>
            </div>

            {/* Simulated controllers */}
            <div className="flex gap-3 mt-4 w-full">
              <button
                type="button"
                onClick={() => { setTick(0); generateNewPaths(); }}
                className="flex-1 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/35 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold transition-all border border-indigo-150/40"
              >
                🔄 Régénérer
              </button>
              <button
                type="button"
                onClick={() => setRunning(!running)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-white shadow-md ${running ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'}`}
              >
                {running ? '⏸️ Arrêter' : '▶️ Relancer'}
              </button>
            </div>
          </div>

          {/* Form parameters sidebar */}
          <div className="flex flex-col gap-4">
            
            {/* Drift control (mu) */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="tracking-wider font-bold text-slate-400 dark:text-slate-500 uppercase text-[9px]">Drift (μ / Tendance)</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{drift >= 0 ? '+' : ''}{drift.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-0.4"
                max="0.8"
                step="0.1"
                value={drift}
                onChange={(e) => setDrift(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="text-[9px] text-slate-500">Pousse les courbes vers le haut/bas en moyenne.</span>
            </div>

            {/* Volatility control (sigma) */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="tracking-wider font-bold text-slate-400 dark:text-slate-500 uppercase text-[9px]">Volatilité (σ / Hasard)</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{valatility.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={valatility}
                onChange={(e) => setVolatility(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="text-[9px] text-slate-500">Contrôle l'amplitude exponentielle des secousses.</span>
            </div>

            {/* Number of paths */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="tracking-wider font-bold text-slate-400 dark:text-slate-500 uppercase text-[9px]">Nb de Chemins</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{numPaths}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={numPaths}
                onChange={(e) => setNumPaths(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
