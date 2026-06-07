import React, { useState, useRef } from 'react';

export default function ThalesConfigurations({ alt }: { alt?: string }) {
  const [config, setConfig] = useState<'classique' | 'papillon'>('classique');
  const [scale, setScale] = useState(0.6); // Ratio k = AM/AB = AN/AC

  const A = { x: 200, y: 100 };
  const B = { x: 100, y: 300 };
  const C = { x: 350, y: 300 };

  // Calculate M and N based on scale
  let M = { x: 0, y: 0 };
  let N = { x: 0, y: 0 };

  if (config === 'classique') {
    M = { x: A.x + scale * (B.x - A.x), y: A.y + scale * (B.y - A.y) };
    N = { x: A.x + scale * (C.x - A.x), y: A.y + scale * (C.y - A.y) };
  } else {
    // Papillon: scale is negative relative to A
    M = { x: A.x - scale * (B.x - A.x), y: A.y - scale * (B.y - A.y) };
    N = { x: A.x - scale * (C.x - A.x), y: A.y - scale * (C.y - A.y) };
  }

  // Calculate lengths
  const dist = (p1: {x:number, y:number}, p2: {x:number, y:number}) => 
    Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

  const AB = dist(A, B);
  const AC = dist(A, C);
  const BC = dist(B, C);
  const AM = dist(A, M);
  const AN = dist(A, N);
  const MN = dist(M, N);

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{alt || "Configurations de Thalès"}</h3>
          <p className="text-sm text-slate-500">Modifiez le rapport k pour voir les longueurs proportionnelles.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setConfig('classique')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${config === 'classique' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
          >
            Classique
          </button>
          <button 
            onClick={() => setConfig('papillon')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${config === 'papillon' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
          >
            Papillon
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="w-full mb-6">
          <div className="flex justify-between mb-1">
            <label htmlFor="scale-input" className="text-sm font-medium text-slate-700">Rapport k = {scale.toFixed(2)}</label>
          </div>
          <input 
            id="scale-input"
            type="range" min="0.1" max="1.5" step="0.05" value={scale} 
            onChange={(e) => setScale(parseFloat(e.target.value))} 
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="w-full max-w-md bg-slate-50 rounded-lg border border-slate-200 p-2 mb-6 relative">
          <svg width="100%" viewBox="0 0 400 400" className="w-full h-auto">
            {/* Lines */}
            <line x1={M.x} y1={M.y} x2={B.x} y2={B.y} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            <line x1={N.x} y1={N.y} x2={C.x} y2={C.y} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#3b82f6" strokeWidth="3" />
            <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#3b82f6" strokeWidth="3" />
            <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#3b82f6" strokeWidth="3" />
            
            <line x1={A.x} y1={A.y} x2={M.x} y2={M.y} stroke="#e11d48" strokeWidth="3" />
            <line x1={A.x} y1={A.y} x2={N.x} y2={N.y} stroke="#e11d48" strokeWidth="3" />
            <line x1={M.x} y1={M.y} x2={N.x} y2={N.y} stroke="#e11d48" strokeWidth="3" />
            
            {/* Points */}
            <circle cx={A.x} cy={A.y} r="6" fill="#1e293b" />
            <text x={A.x - 5} y={A.y - 10} fontSize="16" fontWeight="bold" fill="#1e293b">A</text>
            
            <circle cx={B.x} cy={B.y} r="6" fill="#3b82f6" />
            <text x={B.x - 20} y={B.y + 5} fontSize="16" fontWeight="bold" fill="#3b82f6">B</text>
            
            <circle cx={C.x} cy={C.y} r="6" fill="#3b82f6" />
            <text x={C.x + 10} y={C.y + 5} fontSize="16" fontWeight="bold" fill="#3b82f6">C</text>
            
            <circle cx={M.x} cy={M.y} r="6" fill="#e11d48" />
            <text x={M.x - 20} y={M.y + 5} fontSize="16" fontWeight="bold" fill="#e11d48">M</text>
            
            <circle cx={N.x} cy={N.y} r="6" fill="#e11d48" />
            <text x={N.x + 10} y={N.y + 5} fontSize="16" fontWeight="bold" fill="#e11d48">N</text>
          </svg>
        </div>
        
        <div className="w-full bg-slate-100 p-4 rounded-xl border border-slate-200" aria-live="polite">
          <div className="flex justify-around items-center text-lg font-mono mb-4">
            <div className="flex flex-col items-center">
              <span className="text-rose-600 font-bold border-b-2 border-slate-800 pb-1">AM</span>
              <span className="text-blue-600 font-bold pt-1">AB</span>
            </div>
            <span className="text-slate-400">=</span>
            <div className="flex flex-col items-center">
              <span className="text-rose-600 font-bold border-b-2 border-slate-800 pb-1">AN</span>
              <span className="text-blue-600 font-bold pt-1">AC</span>
            </div>
            <span className="text-slate-400">=</span>
            <div className="flex flex-col items-center">
              <span className="text-rose-600 font-bold border-b-2 border-slate-800 pb-1">MN</span>
              <span className="text-blue-600 font-bold pt-1">BC</span>
            </div>
          </div>
          
          <div className="flex justify-around items-center text-sm font-mono bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex flex-col items-center">
              <span className="text-rose-600 pb-1">{AM.toFixed(1)}</span>
              <span className="text-blue-600 border-t border-slate-300 pt-1">{AB.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">=</span>
            <div className="flex flex-col items-center">
              <span className="text-rose-600 pb-1">{AN.toFixed(1)}</span>
              <span className="text-blue-600 border-t border-slate-300 pt-1">{AC.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">=</span>
            <div className="flex flex-col items-center">
              <span className="text-rose-600 pb-1">{MN.toFixed(1)}</span>
              <span className="text-blue-600 border-t border-slate-300 pt-1">{BC.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">=</span>
            <div className="font-bold text-emerald-600 text-lg">
              {scale.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
