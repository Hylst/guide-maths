import React, { useState, useMemo } from 'react';

export default function ParabolaRoots({ alt }: { alt?: string }) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-4);

  const delta = b * b - 4 * a * c;
  
  let roots: number[] = [];
  if (delta > 0) {
    roots = [
      (-b - Math.sqrt(delta)) / (2 * a),
      (-b + Math.sqrt(delta)) / (2 * a)
    ];
  } else if (delta === 0) {
    roots = [-b / (2 * a)];
  }

  // Generate path for the parabola
  const pathData = useMemo(() => {
    let d = "";
    for (let x = -10; x <= 10; x += 0.2) {
      const y = a * x * x + b * x + c;
      // Map x from [-10, 10] to [0, 400]
      // Map y from [-10, 10] to [400, 0]
      const px = (x + 10) * 20;
      const py = 400 - (y + 10) * 20;
      
      if (x === -10) {
        d += `M ${px} ${py} `;
      } else {
        d += `L ${px} ${py} `;
      }
    }
    return d;
  }, [a, b, c]);

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "Parabole et Racines"}</h3>
        <p className="text-sm text-slate-500">Modifiez les coefficients pour observer l'effet sur la parabole et ses racines.</p>
      </div>
      
      <div className="p-6 flex flex-col md:flex-row gap-8">
        {/* Controls */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="a-input" className="text-sm font-medium text-slate-700">a = {a.toFixed(1)}</label>
            </div>
            <input 
              id="a-input"
              type="range" min="-5" max="5" step="0.1" value={a} 
              onChange={(e) => setA(parseFloat(e.target.value) || 0.1)} 
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="b-input" className="text-sm font-medium text-slate-700">b = {b.toFixed(1)}</label>
            </div>
            <input 
              id="b-input"
              type="range" min="-10" max="10" step="0.5" value={b} 
              onChange={(e) => setB(parseFloat(e.target.value))} 
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="c-input" className="text-sm font-medium text-slate-700">c = {c.toFixed(1)}</label>
            </div>
            <input 
              id="c-input"
              type="range" min="-10" max="10" step="0.5" value={c} 
              onChange={(e) => setC(parseFloat(e.target.value))} 
              className="w-full accent-indigo-600"
            />
          </div>
          
          <div className="p-4 bg-slate-100 rounded-lg" aria-live="polite">
            <div className="font-mono text-sm mb-2">
              f(x) = {a}x² {b >= 0 ? '+' : ''} {b}x {c >= 0 ? '+' : ''} {c}
            </div>
            <div className="font-mono text-sm mb-2">
              Δ = b² - 4ac = {delta.toFixed(2)}
            </div>
            <div className="text-sm font-medium mt-3">
              {delta > 0 && <span className="text-emerald-600">Deux racines réelles : x₁ = {roots[0].toFixed(2)}, x₂ = {roots[1].toFixed(2)}</span>}
              {delta === 0 && <span className="text-amber-600">Une racine double : x₀ = {roots[0].toFixed(2)}</span>}
              {delta < 0 && <span className="text-rose-600">Aucune racine réelle</span>}
            </div>
          </div>
        </div>

        {/* SVG Visualization */}
        <div className="flex-1 flex justify-center items-center bg-slate-50 rounded-lg border border-slate-200 p-2">
          <svg width="100%" viewBox="0 0 400 400" className="max-w-[300px]">
            {/* Grid */}
            <g stroke="#e2e8f0" strokeWidth="1">
              {Array.from({length: 21}).map((_, i) => (
                <line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="400" />
              ))}
              {Array.from({length: 21}).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i*20} x2="400" y2={i*20} />
              ))}
            </g>
            {/* Axes */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="#64748b" strokeWidth="2" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#64748b" strokeWidth="2" />
            
            {/* Parabola */}
            <path d={pathData} fill="none" stroke="#4f46e5" strokeWidth="3" />
            
            {/* Roots */}
            {roots.map((r, i) => (
              <circle 
                key={i} 
                cx={(r + 10) * 20} 
                cy="200" 
                r="5" 
                fill="#10b981" 
                stroke="white" 
                strokeWidth="2" 
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
