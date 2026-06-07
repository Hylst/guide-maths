import React, { useState, useRef, useEffect } from 'react';

export default function VectorChasles({ alt }: { alt?: string }) {
  const [points, setPoints] = useState({
    A: { x: 100, y: 300 },
    B: { x: 250, y: 150 },
    C: { x: 350, y: 250 }
  });
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    setDragging(id);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = Math.max(20, Math.min(380, e.clientX - svgRect.left));
    const y = Math.max(20, Math.min(380, e.clientY - svgRect.top));
    
    setPoints(prev => ({ ...prev, [dragging]: { x, y } }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(null);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  // Calculate arrow heads
  const getArrowHead = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const len = 15;
    const a1 = angle - Math.PI / 6;
    const a2 = angle + Math.PI / 6;
    
    const x1 = p2.x - len * Math.cos(a1);
    const y1 = p2.y - len * Math.sin(a1);
    const x2 = p2.x - len * Math.cos(a2);
    const y2 = p2.y - len * Math.sin(a2);
    
    return `${p2.x},${p2.y} ${x1},${y1} ${x2},${y2}`;
  };

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "Relation de Chasles"}</h3>
        <p className="text-sm text-slate-500">Déplacez les points A, B et C pour voir la relation vectorielle.</p>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-slate-50 rounded-lg border border-slate-200 p-2 mb-6 relative touch-none">
          <svg 
            ref={svgRef}
            width="100%" 
            viewBox="0 0 400 400" 
            className="w-full h-auto"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            aria-label="Représentation graphique de la relation de Chasles"
            role="img"
          >
            {/* Grid */}
            <g stroke="#e2e8f0" strokeWidth="1" aria-hidden="true">
              {Array.from({length: 21}).map((_, i) => (
                <line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="400" />
              ))}
              {Array.from({length: 21}).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i*20} x2="400" y2={i*20} />
              ))}
            </g>
            
            {/* Vector AB */}
            <line x1={points.A.x} y1={points.A.y} x2={points.B.x} y2={points.B.y} stroke="#3b82f6" strokeWidth="3" />
            <polygon points={getArrowHead(points.A, points.B)} fill="#3b82f6" />
            
            {/* Vector BC */}
            <line x1={points.B.x} y1={points.B.y} x2={points.C.x} y2={points.C.y} stroke="#10b981" strokeWidth="3" />
            <polygon points={getArrowHead(points.B, points.C)} fill="#10b981" />
            
            {/* Vector AC */}
            <line x1={points.A.x} y1={points.A.y} x2={points.C.x} y2={points.C.y} stroke="#e11d48" strokeWidth="3" strokeDasharray="5 5" />
            <polygon points={getArrowHead(points.A, points.C)} fill="#e11d48" />
            
            {/* Points */}
            <g>
              <circle cx={points.A.x} cy={points.A.y} r="12" fill="#3b82f6" className="cursor-grab active:cursor-grabbing" onPointerDown={(e) => handlePointerDown(e, 'A')} aria-label="Point A" role="button" tabIndex={0} />
              <text x={points.A.x - 20} y={points.A.y + 20} fontSize="16" fontWeight="bold" fill="#1e293b" aria-hidden="true">A</text>
              
              <circle cx={points.B.x} cy={points.B.y} r="12" fill="#10b981" className="cursor-grab active:cursor-grabbing" onPointerDown={(e) => handlePointerDown(e, 'B')} aria-label="Point B" role="button" tabIndex={0} />
              <text x={points.B.x + 15} y={points.B.y - 15} fontSize="16" fontWeight="bold" fill="#1e293b" aria-hidden="true">B</text>
              
              <circle cx={points.C.x} cy={points.C.y} r="12" fill="#e11d48" className="cursor-grab active:cursor-grabbing" onPointerDown={(e) => handlePointerDown(e, 'C')} aria-label="Point C" role="button" tabIndex={0} />
              <text x={points.C.x + 15} y={points.C.y + 20} fontSize="16" fontWeight="bold" fill="#1e293b" aria-hidden="true">C</text>
            </g>
          </svg>
        </div>
        
        <div className="flex items-center space-x-4 text-lg font-mono bg-slate-100 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center text-blue-600">
            <span className="font-bold">AB</span>
            <span className="text-xs ml-1">→</span>
          </div>
          <span className="text-slate-400">+</span>
          <div className="flex items-center text-emerald-600">
            <span className="font-bold">BC</span>
            <span className="text-xs ml-1">→</span>
          </div>
          <span className="text-slate-400">=</span>
          <div className="flex items-center text-rose-600">
            <span className="font-bold">AC</span>
            <span className="text-xs ml-1">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
