import React, { useState } from 'react';

export default function DerivativeSecant({ alt }: { alt?: string }) {
  const [h, setH] = useState(2);
  const a = 1; // Base point x-coordinate

  // Function: f(x) = x^2
  const f = (x: number) => x * x;
  
  const fa = f(a);
  const fah = f(a + h);
  
  // Tangent slope: f'(a) = 2a
  const tangentSlope = 2 * a;
  
  // Secant slope: (f(a+h) - f(a)) / h
  const secantSlope = h !== 0 ? (fah - fa) / h : tangentSlope;

  // Map coordinates to SVG space
  // x: [-1, 4] -> [0, 400]
  // y: [-1, 16] -> [400, 0]
  const mapX = (x: number) => ((x + 1) / 5) * 400;
  const mapY = (y: number) => 400 - ((y + 1) / 17) * 400;

  // Generate curve path
  let pathData = "";
  for (let x = -1; x <= 4; x += 0.1) {
    const px = mapX(x);
    const py = mapY(f(x));
    if (x === -1) pathData += `M ${px} ${py} `;
    else pathData += `L ${px} ${py} `;
  }

  // Tangent line
  const tLineX1 = -1;
  const tLineY1 = fa + tangentSlope * (tLineX1 - a);
  const tLineX2 = 4;
  const tLineY2 = fa + tangentSlope * (tLineX2 - a);

  // Secant line
  const sLineX1 = -1;
  const sLineY1 = fa + secantSlope * (sLineX1 - a);
  const sLineX2 = 4;
  const sLineY2 = fa + secantSlope * (sLineX2 - a);

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "De la sécante à la tangente"}</h3>
        <p className="text-sm text-slate-500">Rapprochez h de 0 pour voir la sécante devenir la tangente.</p>
      </div>
      
      <div className="p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="h-input" className="text-sm font-medium text-slate-700">h = {h.toFixed(2)}</label>
            </div>
            <input 
              id="h-input"
              type="range" min="-2" max="2" step="0.05" value={h} 
              onChange={(e) => setH(parseFloat(e.target.value))} 
              className="w-full accent-indigo-600"
            />
          </div>
          
          <div className="p-4 bg-slate-100 rounded-lg space-y-3" aria-live="polite">
            <div className="font-mono text-sm">
              f(x) = x²
            </div>
            <div className="font-mono text-sm">
              a = {a}, f(a) = {fa}
            </div>
            <div className="font-mono text-sm">
              a+h = {(a+h).toFixed(2)}, f(a+h) = {fah.toFixed(2)}
            </div>
            <div className="pt-2 border-t border-slate-300 font-mono text-sm">
              Taux d'accroissement (Sécante) :
              <br />
              <span className="text-rose-600 font-bold">
                {h !== 0 ? ((fah - fa) / h).toFixed(2) : "Indéfini"}
              </span>
            </div>
            <div className="font-mono text-sm">
              Nombre dérivé f'(a) (Tangente) :
              <br />
              <span className="text-emerald-600 font-bold">
                {tangentSlope.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center bg-slate-50 rounded-lg border border-slate-200 p-2">
          <svg width="100%" viewBox="0 0 400 400" className="max-w-[300px]">
            {/* Axes */}
            <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="400" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1={mapY(0)} x2="400" y2={mapY(0)} stroke="#94a3b8" strokeWidth="2" />
            
            {/* Curve */}
            <path d={pathData} fill="none" stroke="#334155" strokeWidth="3" />
            
            {/* Tangent */}
            <line 
              x1={mapX(tLineX1)} y1={mapY(tLineY1)} 
              x2={mapX(tLineX2)} y2={mapY(tLineY2)} 
              stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" 
            />
            
            {/* Secant */}
            {h !== 0 && (
              <line 
                x1={mapX(sLineX1)} y1={mapY(sLineY1)} 
                x2={mapX(sLineX2)} y2={mapY(sLineY2)} 
                stroke="#e11d48" strokeWidth="2" 
              />
            )}
            
            {/* Points */}
            <circle cx={mapX(a)} cy={mapY(fa)} r="5" fill="#10b981" />
            <text x={mapX(a) + 10} y={mapY(fa) + 15} fontSize="14" fill="#10b981" fontWeight="bold">A</text>
            
            {h !== 0 && (
              <>
                <circle cx={mapX(a + h)} cy={mapY(fah)} r="5" fill="#e11d48" />
                <text x={mapX(a + h) + 10} y={mapY(fah) - 10} fontSize="14" fill="#e11d48" fontWeight="bold">M</text>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
