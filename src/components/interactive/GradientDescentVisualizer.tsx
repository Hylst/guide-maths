import React, { useState, useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function GradientDescentVisualizer({ alt }: { alt?: string }) {
  const [point, setPoint] = useState<Point | null>({ x: 2.8, y: -2.4 });
  const [learningRate, setLearningRate] = useState<number>(0.15);
  const [history, setHistory] = useState<Point[]>([{ x: 2.8, y: -2.4 }]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Canvas bounds: coordinates map from x: [-4, 4], y: [-4, 4]
  const cWidth = 400;
  const cHeight = 300;

  const minX = -4, maxX = 4;
  const minY = -3, maxY = 3;

  // Map coordinate units to SVG coordinates
  const mapX = (x: number) => ((x - minX) / (maxX - minX)) * cWidth;
  const mapY = (y: number) => cHeight - ((y - minY) / (maxY - minY)) * cHeight;
  
  // Unmap SVG coordinates to coordinate units
  const unmapX = (px: number) => (px / cWidth) * (maxX - minX) + minX;
  const unmapY = (py: number) => ((cHeight - py) / cHeight) * (maxY - minY) + minY;

  // Our quadratic cost bowl: f(x, y) = x^2 + 2*y^2 (slightly elliptical for better realism!)
  // Gradient df/dx = 2x, df/dy = 4y
  const getGradient = (p: Point) => {
    return {
      dx: 2 * p.x,
      dy: 4 * p.y
    };
  };

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Convert pixels to coord units
    const rx = (px / rect.width) * cWidth;
    const ry = (py / rect.height) * cHeight;

    const clickedX = unmapX(rx);
    const clickedY = unmapY(ry);

    const newPt = { x: clickedX, y: clickedY };
    setPoint(newPt);
    setHistory([newPt]);
    setIsRunning(false);
  };

  const takeStep = () => {
    if (!point) return;
    const grad = getGradient(point);
    
    // Gradient descent step: X_next = X_curr - lr * Grad
    const nextPt = {
      x: point.x - learningRate * grad.dx,
      y: point.y - learningRate * grad.dy
    };

    // If extremely close to zero, snap it and stop
    const dist = Math.sqrt(nextPt.x * nextPt.x + nextPt.y * nextPt.y);
    if (dist < 0.05) {
      setPoint({ x: 0, y: 0 });
      setHistory(prev => [...prev, { x: 0, y: 0 }]);
      setIsRunning(false);
    } else {
      setPoint(nextPt);
      setHistory(prev => [...prev, nextPt]);
    }
  };

  // Run automatic descent animation
  const toggleRun = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        takeStep();
      }, 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, point, learningRate]);

  const resetAll = () => {
    const initialPt = { x: 2.8, y: -2.4 };
    setPoint(initialPt);
    setHistory([initialPt]);
    setIsRunning(false);
  };

  // Calculate coordinates for concentric ellipses (contour curves)
  // f(x, y) = x^2 + 2*y^2 = C
  // rx = sqrt(C), ry = sqrt(C/2)
  const contourConstants = [0.8, 2, 4.5, 8, 12, 18];

  // Current point info
  const fVal = point ? (point.x * point.x + 2 * point.y * point.y) : 0;
  const currentGrad = point ? getGradient(point) : { dx: 0, dy: 0 };
  const gradMagnitude = Math.sqrt(currentGrad.dx * currentGrad.dx + currentGrad.dy * currentGrad.dy);

  let stabilityState = "Stable";
  if (learningRate > 0.45) {
    stabilityState = "⚠️ Instable (Divergence / Oscillations)";
  } else if (learningRate > 0.35) {
    stabilityState = "⚠️ Forte (Fortes oscillations)";
  } else if (learningRate < 0.08) {
    stabilityState = "Lente (Régulière mais très lente)";
  } else {
    stabilityState = "Excellente (Convergence fluide)";
  }

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden font-sans">
      <div className="p-5 bg-gradient-to-r from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-850 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">⛰️ {alt || "Simulateur de Descente de Gradient"}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Cliquez n'importe où sur l'isotherme pour placer une bille et cherchez le fond du bol.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-1.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Visualizer Panel */}
          <div className="md:col-span-2 flex flex-col items-center">
            
            <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 p-2 mb-4 relative cursor-crosshair overflow-hidden">
              <svg 
                width="100%" 
                viewBox={`0 0 ${cWidth} ${cHeight}`} 
                onClick={handleSVGClick}
                className="w-full h-auto select-none"
                aria-label="Isotherme de vallée"
                role="img"
              >
                {/* Valley Contours */}
                <g stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" fill="none">
                  {contourConstants.map((c, i) => {
                    const rX = Math.sqrt(c);
                    const rY = Math.sqrt(c / 2);
                    // Center in SVG is mapped from (0,0)
                    const svgRx = (rX / (maxX - minX)) * cWidth;
                    const svgRy = (rY / (maxY - minY)) * cHeight;
                    return (
                      <ellipse 
                        key={i} 
                        cx={mapX(0)} 
                        cy={mapY(0)} 
                        rx={svgRx} 
                        ry={svgRy} 
                      />
                    );
                  })}
                </g>

                {/* Axes grid lines */}
                <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={cHeight} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="0" y1={mapY(0)} x2={cWidth} y2={mapY(0)} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" strokeDasharray="4,4" />

                {/* Central Minimum point marker */}
                <circle cx={mapX(0)} cy={mapY(0)} r="4" className="fill-emerald-500" />
                <text x={mapX(0)} y={mapY(0) - 8} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-bold text-[9px] uppercase tracking-wider">
                  Minima (0,0)
                </text>

                {/* Trajectory history lines */}
                {history.length > 1 && (
                  <path 
                    d={history.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ')}
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* History step dots */}
                {history.map((p, i) => (
                  <circle 
                    key={i} 
                    cx={mapX(p.x)} 
                    cy={mapY(p.y)} 
                    r={i === history.length - 1 ? "5" : "3.5"} 
                    className={`${i === history.length - 1 ? 'fill-indigo-600 dark:fill-indigo-400' : 'fill-purple-300 dark:fill-purple-800'}`} 
                  />
                ))}

                {/* Vector indicators on the current active ball */}
                {point && (
                  <>
                    {/* Gradient Arrow (uphill) - Red/Rose */}
                    {gradMagnitude > 0.1 && (
                      <g>
                        {/* Scale the vector down so it fits nicely on screen */}
                        {(() => {
                          const scale = 0.2;
                          const startX = mapX(point.x);
                          const startY = mapY(point.y);
                          const endX = mapX(point.x + scale * currentGrad.dx);
                          const endY = mapY(point.y + scale * currentGrad.dy);
                          const angle = Math.atan2(endY - startY, endX - startX);
                          
                          return (
                            <>
                              <line 
                                x1={startX} 
                                y1={startY} 
                                x2={endX} 
                                y2={endY} 
                                stroke="#f43f5e" 
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                              />
                              {/* Arrow tip */}
                              <polygon 
                                points={`${endX},${endY} ${endX - 8 * Math.cos(angle - Math.PI/6)},${endY - 8 * Math.sin(angle - Math.PI/6)} ${endX - 8 * Math.cos(angle + Math.PI/6)},${endY - 8 * Math.sin(angle + Math.PI/6)}`}
                                fill="#f43f5e"
                              />
                            </>
                          );
                        })()}
                      </g>
                    )}

                    {/* Step Vector direction (downhill) - Emerald */}
                    {gradMagnitude > 0.1 && (
                      <g>
                        {(() => {
                          // Scale of descent movement
                          const stepX = - learningRate * currentGrad.dx;
                          const stepY = - learningRate * currentGrad.dy;
                          const startX = mapX(point.x);
                          const startY = mapY(point.y);
                          const endX = mapX(point.x + stepX);
                          const endY = mapY(point.y + stepY);
                          const angle = Math.atan2(endY - startY, endX - startX);
                          
                          return (
                            <>
                              <line 
                                x1={startX} 
                                y1={startY} 
                                x2={endX} 
                                y2={endY} 
                                stroke="#10b981" 
                                strokeWidth="2" 
                                strokeDasharray="3,2"
                                strokeLinecap="round"
                              />
                              <polygon 
                                points={`${endX},${endY} ${endX - 6 * Math.cos(angle - Math.PI/6)},${endY - 6 * Math.sin(angle - Math.PI/6)} ${endX - 6 * Math.cos(angle + Math.PI/6)},${endY - 6 * Math.sin(angle + Math.PI/6)}`}
                                fill="#10b981"
                              />
                            </>
                          );
                        })()}
                      </g>
                    )}
                  </>
                )}
              </svg>

              {/* Vector legend stickers */}
              <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-slate-150 dark:border-slate-800 text-[10px] font-semibold flex flex-col gap-1 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#f43f5e] relative inline-block"><span className="absolute right-0 top-1/2 -translate-y-1/2 border-l-[3px] border-l-[#f43f5e] border-y-[2px] border-y-transparent" /></span>
                  <span className="text-slate-600 dark:text-slate-400">Gradient (Montée ∇f)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#10b981] relative inline-block"><span className="absolute right-0 top-1/2 -translate-y-1/2 border-l-[3px] border-l-[#10b981] border-y-[2px] border-y-transparent" /></span>
                  <span className="text-slate-600 dark:text-slate-400">Pas proposé (- η∇f)</span>
                </div>
              </div>
            </div>

            {/* Action buttons bar */}
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={takeStep}
                disabled={!point || isRunning || (point.x === 0 && point.y === 0)}
                className="flex-1 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/35 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold transition-all border border-indigo-150/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📥 Faire un pas
              </button>
              <button
                type="button"
                onClick={toggleRun}
                disabled={!point || (point.x === 0 && point.y === 0)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-white shadow-md ${isRunning ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRunning ? '⏸️ Suspendre' : '▶️ Descente Auto'}
              </button>
            </div>
          </div>

          {/* Controls & Metrics sidebar */}
          <div className="flex flex-col gap-4">
            
            {/* Realtime coordinates box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
              <span className="text-[10px] tracking-wider font-bold text-slate-400 dark:text-slate-500 uppercase">Coordonnées</span>
              {point ? (
                <div className="mt-1 font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                  x = {point.x.toFixed(4)}<br/>
                  y = {point.y.toFixed(4)}
                </div>
              ) : (
                <div className="mt-1 text-sm text-slate-400 font-medium">Non défini</div>
              )}
            </div>

            {/* Cost function altitude f(x,y) */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
              <span className="text-[10px] tracking-wider font-bold text-slate-400 dark:text-slate-500 uppercase">Fonction de coût</span>
              <div className="mt-1 font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">
                f(x, y) = {fVal.toFixed(4)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-medium">
                Cible : f(0,0) = 0
              </div>
            </div>

            {/* Learning rate (lr) / Step size slider */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-wider font-bold text-slate-400 dark:text-slate-500 uppercase">Taux d'apprentissage (η)</span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{learningRate.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.65"
                step="0.05"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1 transition-all">
                Vitesse : <span className="text-indigo-600 dark:text-indigo-400">{stabilityState}</span>
              </div>
            </div>

            {/* Steps count badge */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl text-center">
              <span className="text-xs text-slate-500">Nombre total d'itérations :</span>
              <span className="ml-1.5 font-mono font-bold text-slate-800 dark:text-slate-200">{history.length - 1}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
