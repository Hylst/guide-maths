import React, { useState, useRef, useEffect } from 'react';

export default function TopologicalSpaces({ alt }: { alt?: string }) {
  const [setType, setSetType] = useState<'open' | 'closed' | 'neither'>('open');
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG dimensions
  const width = 400;
  const height = 300;

  // Center of our custom set shape
  const cx = 200;
  const cy = 150;
  const rx = 120;
  const ry = 80;

  // Let's model a smooth oval/ellipse as our set A:
  // (x - cx)^2 / rx^2 + (y - cy)^2 / ry^2 = 1
  const checkInside = (x: number, y: number) => {
    const term = Math.pow(x - cx, 2) / Math.pow(rx, 2) + Math.pow(y - cy, 2) / Math.pow(ry, 2);
    return term <= 1;
  };

  // Distance from pointer to the ellipse boundary (approximate simple radial distance)
  const getDistanceToBoundary = (x: number, y: number) => {
    // Angle from center to point
    const dx = x - cx;
    const dy = y - cy;
    const angle = Math.atan2(dy, dx);

    // Boundary point at same angle
    const bx = cx + rx * Math.cos(angle);
    const by = cy + ry * Math.sin(angle);

    // Euclidean distance
    const dist = Math.sqrt(Math.pow(x - bx, 2) / Math.pow(y - by, 2));
    
    // Exact distance calculation
    return Math.sqrt(Math.pow(x - bx, 2) + Math.pow(y - by, 2));
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale local coordinated if necessary (viewBox is 400x300, matching viewBox to actual coordinates)
    const viewX = (x / rect.width) * width;
    const viewY = (y / rect.height) * height;

    setPointerPos({ x: viewX, y: viewY });
  };

  const handlePointerLeave = () => {
    setPointerPos(null);
  };

  // Determine pointer state
  let isInside = false;
  let distToBoundary = 0;
  let epsilon = 0;
  let currentPosText = "Placez votre curseur sur l'espace d'étude";
  let pointTypeLabel = "";

  if (pointerPos) {
    isInside = checkInside(pointerPos.x, pointerPos.y);
    distToBoundary = getDistanceToBoundary(pointerPos.x, pointerPos.y);

    if (setType === 'open') {
      if (isInside) {
        // In an open set, the boundary itself is excluded.
        // We ensure epsilon shrinks to 0 on the exact edge.
        epsilon = Math.max(2, distToBoundary - 2); 
        currentPosText = "Point Intérieur : On peut TOUJOURS dessiner une boule ouverte autour !";
        pointTypeLabel = `Boule B(x, ε) avec ε = ${Math.round(epsilon)}px`;
      } else {
        currentPosText = "Hors de l'Ouvert (extérieur).";
      }
    } else if (setType === 'closed') {
      if (isInside) {
        if (distToBoundary < 12) {
          // Boundary point inside closed set
          currentPosText = "Point Frontière : Il appartient au Fermé, mais toute boule déborde dehors !";
          pointTypeLabel = "La frontière fait partie de l'ensemble.";
        } else {
          currentPosText = "Point adéhrent intérieur.";
        }
      } else {
        currentPosText = "Hors du Fermé.";
      }
    } else { // neither
      // Left half (x < 200) behaves closed, right half behaves open
      const isLeft = pointerPos.x < cx;
      if (isInside) {
        if (isLeft) {
          currentPosText = "Côté Gauche Fermé : Frontière incluse. Le point frontière appartient à l'ensemble.";
        } else {
          if (distToBoundary < 10) {
            currentPosText = "Côté Droit Ouvert : La frontière n'appartient PAS à l'ensemble !";
          } else {
            currentPosText = "Point intérieur.";
          }
        }
      } else {
        currentPosText = "À l'extérieur.";
      }
    }
  }

  // Generate sequence converging to border for closed set illustration
  const convergingPoints = [];
  if (setType === 'closed' && pointerPos && !isInside) {
    // Generate a sequence of dots starting near center and ending exactly on pointerPos
    const steps = 6;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      // Start of sequence inside (near center), end is close to pointer poser
      const px = cx + (pointerPos.x - cx) * t * 0.9;
      const py = cy + (pointerPos.y - cy) * t * 0.9;
      convergingPoints.push({ x: px, y: py, label: `x_${i}` });
    }
  }

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden font-sans">
      <div className="p-5 bg-gradient-to-r from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-850 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">🍩 {alt || "Visualisateur de Topologie Interactive"}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Jouez avec les voisinages, ouverts et fermés en déplaçant votre souris.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-stretch sm:self-auto">
          <button 
            type="button"
            onClick={() => setSetType('open')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${setType === 'open' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-205'}`}
          >
            Ouvert
          </button>
          <button 
            type="button"
            onClick={() => setSetType('closed')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${setType === 'closed' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-205'}`}
          >
            Fermé
          </button>
          <button 
            type="button"
            onClick={() => setSetType('neither')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${setType === 'neither' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-205'}`}
          >
            Ni l'un ni l'autre (Semi)
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        {/* Main Canvas Area */}
        <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 overflow-hidden relative" style={{ height: '300px' }}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${width} ${height}`} 
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="w-full h-full select-none"
            aria-label="Espace de topologie"
            role="img"
          >
            {/* Grid background pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Set A visualization */}
            {/* Base transparent fill */}
            <ellipse 
              cx={cx} 
              cy={cy} 
              rx={rx} 
              ry={ry} 
              className={`transition-all duration-300 ${isInside ? 'fill-indigo-500/10 dark:fill-indigo-400/15' : 'fill-indigo-500/5 dark:fill-indigo-400/5'}`}
            />

            {/* Set Boundary lines according to setType */}
            {setType === 'open' && (
              <ellipse 
                cx={cx} 
                cy={cy} 
                rx={rx} 
                ry={ry} 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="2" 
                strokeDasharray="6,6"
              />
            )}

            {setType === 'closed' && (
              <ellipse 
                cx={cx} 
                cy={cy} 
                rx={rx} 
                ry={ry} 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="3.5"
              />
            )}

            {setType === 'neither' && (
              <>
                {/* Left side closed border */}
                <path 
                  d={`M ${cx} ${cy - ry} A ${rx} ${ry} 0 0 0 ${cx} ${cy + ry}`} 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="3.5" 
                />
                
                {/* Right side open border */}
                <path 
                  d={`M ${cx} ${cy + ry} A ${rx} ${ry} 0 0 0 ${cx} ${cy - ry}`} 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="2" 
                  strokeDasharray="6,6" 
                />
              </>
            )}

            {/* Label "Ensemble A" */}
            <text x={cx} y={cy - 25} textAnchor="middle" className="fill-indigo-600/70 dark:fill-indigo-400/80 font-bold text-sm tracking-widest uppercase">
              Ensemble A
            </text>

            {/* If set is closed and pointer is outside, show sequences of points converging to the boundary point */}
            {setType === 'closed' && convergingPoints.map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="3" className="fill-emerald-500/60" />
                {i === convergingPoints.length - 1 && (
                  <text x={pt.x} y={pt.y - 8} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 text-[10px] font-bold">
                    u_n
                  </text>
                )}
              </g>
            ))}

            {/* Pointer-dependent elements */}
            {pointerPos && (
              <>
                {/* Pointer interactive dot */}
                <circle 
                  cx={pointerPos.x} 
                  cy={pointerPos.y} 
                  r="5" 
                  className={`${isInside ? 'fill-indigo-600 dark:fill-indigo-400' : 'fill-slate-500'} ring-4 ${isInside ? 'ring-indigo-100 dark:ring-indigo-900/40' : 'ring-slate-100'} transition-all`} 
                />

                {/* Neighbourhood Circle B(x, epsilon) */}
                {setType === 'open' && isInside && epsilon > 0 && (
                  <g>
                    <circle 
                      cx={pointerPos.x} 
                      cy={pointerPos.y} 
                      r={epsilon} 
                      fill="rgba(99, 102, 241, 0.12)" 
                      stroke="#4f46e5" 
                      strokeWidth="1.5" 
                      strokeDasharray="3,3" 
                    />
                    <line 
                      x1={pointerPos.x} 
                      y1={pointerPos.y} 
                      x2={pointerPos.x + epsilon} 
                      y2={pointerPos.y} 
                      stroke="#4f46e5" 
                      strokeWidth="1.5" 
                    />
                    <text 
                      x={pointerPos.x + epsilon / 2} 
                      y={pointerPos.y - 4} 
                      textAnchor="middle" 
                      className="fill-indigo-800 dark:fill-indigo-200 text-[10px] font-bold"
                    >
                      ε
                    </text>
                  </g>
                )}
                
                {/* For closed set hover on boundary */}
                {setType === 'closed' && isInside && distToBoundary < 14 && (
                  <circle 
                    cx={pointerPos.x} 
                    cy={pointerPos.y} 
                    r="8" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    className="animate-ping"
                  />
                )}
              </>
            )}
          </svg>
          
          {/* Inside set pointer coordinates tag */}
          {pointerPos && (
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-150 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isInside ? 'bg-indigo-500' : 'bg-slate-400'}`} />
              x = ({Math.round(pointerPos.x)}, {Math.round(pointerPos.y)})
            </div>
          )}
        </div>

        {/* Dynamic Legend Feedback */}
        <div className="w-full mt-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors">
              {currentPosText}
            </div>
            {pointTypeLabel && (
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                {pointTypeLabel}
              </div>
            )}
          </div>
          
          {/* Explanation chip */}
          <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-705 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {setType === 'open' && "∀ x ∈ A, ∃ ε > 0, B(x,ε) ⊂ A"}
            {setType === 'closed' && "A est fermé ⟺ (u_n ∈ A ⟶ L ∈ A)"}
            {setType === 'neither' && "Semi-ouvert : ni ouvert, ni fermé"}
          </div>
        </div>
      </div>
    </div>
  );
}
