import React, { useState } from 'react';

export default function ArithmeticSequence({ alt }: { alt?: string }) {
  const [u0, setU0] = useState(2);
  const [r, setR] = useState(1.5);
  const [nMax, setNMax] = useState(10);

  // Generate sequence points
  const points = [];
  for (let n = 0; n <= nMax; n++) {
    points.push({ n, un: u0 + n * r });
  }

  // Calculate bounds for SVG
  const minUn = Math.min(...points.map(p => p.un), 0);
  const maxUn = Math.max(...points.map(p => p.un), 10);
  
  // Map coordinates to SVG space
  // x: [0, nMax] -> [40, 360]
  // y: [minUn, maxUn] -> [360, 40]
  const mapX = (n: number) => 40 + (n / nMax) * 320;
  const mapY = (un: number) => {
    const range = maxUn - minUn || 1;
    return 360 - ((un - minUn) / range) * 320;
  };

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "Suite Arithmétique"}</h3>
        <p className="text-sm text-slate-500">Modifiez le premier terme u₀ et la raison r.</p>
      </div>
      
      <div className="p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="u0-input" className="text-sm font-medium text-slate-700">Premier terme u₀ = {u0.toFixed(1)}</label>
            </div>
            <input 
              id="u0-input"
              type="range" min="-5" max="10" step="0.5" value={u0} 
              onChange={(e) => setU0(parseFloat(e.target.value))} 
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="r-input" className="text-sm font-medium text-slate-700">Raison r = {r.toFixed(1)}</label>
            </div>
            <input 
              id="r-input"
              type="range" min="-3" max="5" step="0.5" value={r} 
              onChange={(e) => setR(parseFloat(e.target.value))} 
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="nmax-input" className="text-sm font-medium text-slate-700">Nombre de termes n = {nMax}</label>
            </div>
            <input 
              id="nmax-input"
              type="range" min="5" max="20" step="1" value={nMax} 
              onChange={(e) => setNMax(parseInt(e.target.value, 10))} 
              className="w-full accent-indigo-600"
            />
          </div>
          
          <div className="p-4 bg-slate-100 rounded-lg space-y-3" aria-live="polite">
            <div className="font-mono text-sm">
              <span className="font-bold text-indigo-700">Formule de récurrence :</span>
              <br />
              u<sub className="text-xs">n+1</sub> = u<sub className="text-xs">n</sub> {r >= 0 ? '+' : ''} {r}
            </div>
            <div className="font-mono text-sm">
              <span className="font-bold text-emerald-700">Formule explicite :</span>
              <br />
              u<sub className="text-xs">n</sub> = {u0} {r >= 0 ? '+' : ''} {r} × n
            </div>
            <div className="font-mono text-sm pt-2 border-t border-slate-300">
              u<sub className="text-xs">{nMax}</sub> = {(u0 + nMax * r).toFixed(1)}
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center bg-slate-50 rounded-lg border border-slate-200 p-2">
          <svg width="100%" viewBox="0 0 400 400" className="max-w-[300px]">
            {/* Grid */}
            <g stroke="#e2e8f0" strokeWidth="1">
              {Array.from({length: 11}).map((_, i) => (
                <line key={`h${i}`} x1="40" y1={40 + i*32} x2="360" y2={40 + i*32} />
              ))}
            </g>
            
            {/* Axes */}
            <line x1="40" y1={mapY(0)} x2="360" y2={mapY(0)} stroke="#64748b" strokeWidth="2" />
            <line x1="40" y1="40" x2="40" y2="360" stroke="#64748b" strokeWidth="2" />
            
            {/* Axis labels */}
            <text x="365" y={mapY(0) + 5} fontSize="12" fill="#64748b">n</text>
            <text x="25" y="35" fontSize="12" fill="#64748b">u_n</text>
            
            {/* Points and lines */}
            {points.map((p, i) => (
              <g key={i}>
                {/* Dotted line to axis */}
                <line 
                  x1={mapX(p.n)} y1={mapY(0)} 
                  x2={mapX(p.n)} y2={mapY(p.un)} 
                  stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" 
                />
                
                {/* Step line showing 'r' */}
                {i > 0 && (
                  <path 
                    d={`M ${mapX(points[i-1].n)} ${mapY(points[i-1].un)} L ${mapX(p.n)} ${mapY(points[i-1].un)} L ${mapX(p.n)} ${mapY(p.un)}`} 
                    fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3"
                  />
                )}
                
                {/* Point */}
                <circle 
                  cx={mapX(p.n)} cy={mapY(p.un)} 
                  r="4" fill="#4f46e5" 
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
