import React, { useState, useRef, useEffect, useMemo } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function VectorField({ alt }: { alt?: string }) {
  const [trajectories, setTrajectories] = useState<Point[][]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Differential equation: dy/dx = f(x, y)
  // Let's use a simple linear system or a non-linear one.
  // Example: dy/dx = y - x
  const f = (x: number, y: number) => y - x;

  // Grid settings
  const xMin = -5, xMax = 5;
  const yMin = -5, yMax = 5;
  const step = 0.5;

  // Map coordinates to SVG space
  // x: [-5, 5] -> [0, 400]
  // y: [-5, 5] -> [400, 0]
  const mapX = (x: number) => ((x - xMin) / (xMax - xMin)) * 400;
  const mapY = (y: number) => 400 - ((y - yMin) / (yMax - yMin)) * 400;
  const unmapX = (px: number) => (px / 400) * (xMax - xMin) + xMin;
  const unmapY = (py: number) => yMax - (py / 400) * (yMax - yMin);

  // Generate vector field
  const vectorField = useMemo(() => {
    const vectors = [];
    for (let x = xMin; x <= xMax; x += step) {
      for (let y = yMin; y <= yMax; y += step) {
        const dx = 1;
        const dy = f(x, y);
        
        // Normalize the vector for display
        const len = Math.sqrt(dx * dx + dy * dy);
        const scale = (step * 0.8) / len;
        
        const vx = dx * scale;
        const vy = dy * scale;
        
        vectors.push({
          x, y,
          vx, vy,
          len
        });
      }
    }
    return vectors;
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const px = e.clientX - svgRect.left;
    const py = e.clientY - svgRect.top;
    
    const startX = unmapX(px);
    const startY = unmapY(py);

    // Compute trajectory using Euler's method
    const trajectory: Point[] = [];
    let currX = startX;
    let currY = startY;
    const dt = 0.05;
    
    // Forward
    for (let i = 0; i < 200; i++) {
      if (currX > xMax || currX < xMin || currY > yMax || currY < yMin) break;
      trajectory.push({ x: currX, y: currY });
      const dy = f(currX, currY);
      currX += dt;
      currY += dy * dt;
    }

    // Backward
    currX = startX;
    currY = startY;
    const backwardTrajectory: Point[] = [];
    for (let i = 0; i < 200; i++) {
      if (currX > xMax || currX < xMin || currY > yMax || currY < yMin) break;
      backwardTrajectory.unshift({ x: currX, y: currY });
      const dy = f(currX, currY);
      currX -= dt;
      currY -= dy * dt;
    }

    setTrajectories([...trajectories, [...backwardTrajectory, ...trajectory]]);
  };

  const clearTrajectories = () => setTrajectories([]);

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{alt || "Champ de Vecteurs"}</h3>
          <p className="text-sm text-slate-500">Cliquez sur le graphique pour tracer une courbe solution.</p>
        </div>
        <button 
          onClick={clearTrajectories}
          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-sm font-medium transition-colors"
        >
          Effacer
        </button>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-slate-50 rounded-lg border border-slate-200 p-2 mb-4 relative cursor-crosshair">
          <svg 
            ref={svgRef}
            width="100%" 
            viewBox="0 0 400 400" 
            className="w-full h-auto"
            onPointerDown={handlePointerDown}
            aria-label="Champ de vecteurs interactif"
            role="img"
          >
            {/* Axes */}
            <g aria-hidden="true">
              <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="400" stroke="#94a3b8" strokeWidth="2" />
              <line x1="0" y1={mapY(0)} x2="400" y2={mapY(0)} stroke="#94a3b8" strokeWidth="2" />
            </g>
            
            {/* Vector Field */}
            <g stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {vectorField.map((v, i) => {
                const x1 = mapX(v.x - v.vx/2);
                const y1 = mapY(v.y - v.vy/2);
                const x2 = mapX(v.x + v.vx/2);
                const y2 = mapY(v.y + v.vy/2);
                
                // Arrow head
                const angle = Math.atan2(y2 - y1, x2 - x1);
                const a1 = angle - Math.PI / 6;
                const a2 = angle + Math.PI / 6;
                const len = 4;
                
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} />
                    <line x1={x2} y1={y2} x2={x2 - len * Math.cos(a1)} y2={y2 - len * Math.sin(a1)} />
                    <line x1={x2} y1={y2} x2={x2 - len * Math.cos(a2)} y2={y2 - len * Math.sin(a2)} />
                  </g>
                );
              })}
            </g>
            
            {/* Trajectories */}
            {trajectories.map((traj, i) => {
              const d = traj.map((p, j) => `${j === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ');
              return (
                <path 
                  key={i} 
                  d={d} 
                  fill="none" 
                  stroke={`hsl(${(i * 137.5) % 360}, 70%, 50%)`} 
                  strokeWidth="2.5" 
                />
              );
            })}
          </svg>
        </div>
        
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 w-full max-w-md text-center">
          <div className="font-mono text-lg text-indigo-700">
            y' = y - x
          </div>
          <div className="text-sm text-slate-500 mt-2">
            Équation différentielle du premier ordre.
          </div>
        </div>
      </div>
    </div>
  );
}
