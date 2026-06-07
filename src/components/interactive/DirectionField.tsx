import React, { useState, useRef } from 'react';

type ODESystem = 'logistic' | 'linear' | 'wave' | 'sinusoidal';

export default function DirectionField({ alt }: { alt?: string }) {
  const [odeType, setOdeType] = useState<ODESystem>('logistic');
  const [logisticR, setLogisticR] = useState<number>(1.2); // Growth rate r
  const [logisticK, setLogisticK] = useState<number>(2.0); // Carrying capacity K
  const [initPoint, setInitPoint] = useState({ x: -2.0, y: 1.0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Grid / Axis variables in math coordinate space
  // X range from -4 to +4, Y range from -1 to +3 (to perfectly frame logistic & waves)
  const minX = -4.0;
  const maxX = 4.0;
  const minY = -1.5;
  const maxY = 3.5;

  const width = 450;
  const height = 350;

  const toSvgX = (mx: number) => {
    return ((mx - minX) / (maxX - minX)) * width;
  };

  const toSvgY = (my: number) => {
    return height - ((my - minY) / (maxY - minY)) * height;
  };

  const toMathX = (svgX: number) => {
    return minX + (svgX / width) * (maxX - minX);
  };

  const toMathY = (svgY: number) => {
    return minY + ((height - svgY) / height) * (maxY - minY);
  };

  // Derivative function dy/dx = f(x, y)
  const f = (x: number, y: number): number => {
    switch (odeType) {
      case 'logistic':
        // dy/dx = r * y * (1 - y/K)
        return logisticR * y * (1.0 - y / logisticK);
      case 'linear':
        // dy/dx = x - y
        return x - y;
      case 'wave':
        // dy/dx = sin(x) - y * 0.5
        return Math.sin(x) - y * 0.5;
      case 'sinusoidal':
        // dy/dx = cos(x) * cos(y)
        return Math.cos(x) * Math.cos(y);
      default:
        return 0;
    }
  };

  // 4th-Order Runge-Kutta integration step
  const rk4Step = (x: number, y: number, h: number): number => {
    const k1 = h * f(x, y);
    const k2 = h * f(x + h / 2, y + k1 / 2);
    const k3 = h * f(x + h / 2, y + k2 / 2);
    const k4 = h * f(x + h, y + k3);
    return y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
  };

  // Generate direction field segments (grid of tangents)
  const cols = 22;
  const rows = 18;
  const segmentLength = 12; // px length of each segment

  const directionSegments = [];
  for (let c = 0; c < cols; c++) {
    const x = minX + (c / (cols - 1)) * (maxX - minX);
    for (let r = 0; r < rows; r++) {
      const y = minY + (r / (rows - 1)) * (maxY - minY);
      const dy_dx = f(x, y);
      
      // Calculate angle of tangent
      const angle = Math.atan(dy_dx);
      const dx_scr = Math.cos(angle) * (segmentLength / 2);
      const dy_scr = -Math.sin(angle) * (segmentLength / 2); // inverted Y axis for screen

      const sx = toSvgX(x);
      const sy = toSvgY(y);

      directionSegments.push({
        x1: sx - dx_scr,
        y1: sy - dy_scr,
        x2: sx + dx_scr,
        y2: sy + dy_scr,
        active: Math.abs(dy_dx) < 20, // filter infinity
      });
    }
  }

  // Compile the actual integral curve using RK4 integration
  // We integrate forwards and backwards from the selected initial point
  const integralPoints: { x: number; y: number }[] = [];
  const h = 0.05; // fixed step size
  
  // 1. Forward integration
  let currX = initPoint.x;
  let currY = initPoint.y;
  integralPoints.push({ x: currX, y: currY });
  while (currX < maxX && currY < maxY + 1 && currY > minY - 1) {
    currY = rk4Step(currX, currY, h);
    currX += h;
    integralPoints.push({ x: currX, y: currY });
  }

  // 2. Backward integration
  const backwardPoints: { x: number; y: number }[] = [];
  currX = initPoint.x;
  currY = initPoint.y;
  while (currX > minX && currY < maxY + 1 && currY > minY - 1) {
    currY = rk4Step(currX, currY, -h);
    currX -= h;
    backwardPoints.unshift({ x: currX, y: currY }); // prepend
  }

  const allPoints = [...backwardPoints, ...integralPoints];
  const curvePath = allPoints
    .map((pt, idx) => {
      const sx = toSvgX(pt.x);
      const sy = toSvgY(pt.y);
      return `${idx === 0 ? 'M' : 'L'} ${sx} ${sy}`;
    })
    .join(' ');

  // Pointer event handlers to move the initial condition tracker
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateInitFromCoords(e);
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateInitFromCoords(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const updateInitFromCoords = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    const x = Math.max(0, Math.min(width, rawX));
    const y = Math.max(0, Math.min(height, rawY));

    const mx = Math.round(toMathX(x) * 100) / 100;
    const my = Math.round(toMathY(y) * 100) / 100;
    setInitPoint({ x: mx, y: my });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-55 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Simulation Window */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          GLISSE LA CONDITION INITIALE {"$(x_0, y_0)$"} :
        </h4>

        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl touch-none cursor-crosshair shadow-md overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Main X/Y Axis */}
          <line
            x1="0"
            y1={toSvgY(0)}
            x2={width}
            y2={toSvgY(0)}
            stroke="#94a3b8"
            strokeWidth="2"
            className="opacity-60"
          />
          <line
            x1={toSvgX(0)}
            y1="0"
            x2={toSvgX(0)}
            y2={height}
            stroke="#94a3b8"
            strokeWidth="2"
            className="opacity-60"
          />

          {/* Direction Field Tangent segments */}
          {directionSegments.map((seg, idx) => {
            if (!seg.active) return null;
            return (
              <line
                key={idx}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="#6366f1"
                strokeWidth="1.2"
                className="opacity-30 dark:opacity-40"
              />
            );
          })}

          {/* Theoretical critical carrying capacity if in logistic mode */}
          {odeType === 'logistic' && (
            <line
              x1="0"
              y1={toSvgY(logisticK)}
              x2={width}
              y2={toSvgY(logisticK)}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              className="opacity-75"
            />
          )}

          {/* The computed Integral Curve (Solution) */}
          {allPoints.length > 1 && (
            <path
              d={curvePath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Draggable initial point target */}
          <circle
            cx={toSvgX(initPoint.x)}
            cy={toSvgY(initPoint.y)}
            r="8"
            fill="#e11d48"
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer active:scale-120 transition-transform shadow-lg"
          />
          <text
            x={toSvgX(initPoint.x) + 12}
            y={toSvgY(initPoint.y) - 8}
            fontSize="11"
            className="font-mono font-bold fill-rose-600 dark:fill-rose-400 select-none bg-card px-1 rounded"
          >
            y({initPoint.x.toFixed(1)}) = {initPoint.y.toFixed(2)}
          </text>

          {/* Carrying capacity text label */}
          {odeType === 'logistic' && (
            <text
              x={10}
              y={toSvgY(logisticK) - 6}
              fontSize="10"
              className="font-mono font-bold fill-emerald-600/90 select-none"
            >
              Capacité K = {logisticK}
            </text>
          )}

          {/* Axis numeric labels */}
          <text x={toSvgX(0) + 5} y={height - 8} fontSize="10" fill="#94a3b8" className="select-none font-mono">
            x
          </text>
          <text x={8} y={toSvgY(0) - 5} fontSize="10" fill="#94a3b8" className="select-none font-mono">
            y
          </text>
        </svg>

        {/* Math definition banner */}
        <div className="mt-3 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center w-full font-mono text-xs select-none">
          {odeType === 'logistic' && (
            <span>Équation Logistique : {"$\\frac{dy}{dx} = r \\cdot y \\left(1 - \\frac{y}{K}\\right)$"}</span>
          )}
          {odeType === 'linear' && (
            <span>Équation Linéaire : {"$\\frac{dy}{dx} = x - y$"} (Amorti stable)</span>
          )}
          {odeType === 'wave' && (
            <span>Équation d'Onde : {"$\\frac{dy}{dx} = \\sin(x) - 0.5 y$"}</span>
          )}
          {odeType === 'sinusoidal' && (
            <span>Champ d'Intégration Trigo : {"$\\frac{dy}{dx} = \\cos(x) \\cdot \\cos(y)$"}</span>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-2 text-foreground">Champ de Directions</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Le champ de directions montre instantanément en chaque point la pente tangente {"$\\frac{dy}{dx}$"}. Déplace la condition initiale rouge pour recalculer la solution exacte par Runge-Kutta 4.
          </p>

          <div className="space-y-2 mb-4">
            <button
              onClick={() => {
                setOdeType('logistic');
                setInitPoint({ x: -2.0, y: 0.5 });
              }}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                odeType === 'logistic'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>🌱 Croissance Logistique</span>
            </button>
            <button
              onClick={() => {
                setOdeType('linear');
                setInitPoint({ x: -2.0, y: 1.5 });
              }}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                odeType === 'linear'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>📐 Modèle Linéaire (x - y)</span>
            </button>
            <button
              onClick={() => {
                setOdeType('wave');
                setInitPoint({ x: -3.0, y: 0.0 });
              }}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                odeType === 'wave'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>🌊 Perturbation Ondulatoire</span>
            </button>
            <button
              onClick={() => {
                setOdeType('sinusoidal');
                setInitPoint({ x: 0.0, y: 0.0 });
              }}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                odeType === 'sinusoidal'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>🌀 Champ Trigonométrique</span>
            </button>
          </div>

          {/* Logistic parameters Sliders */}
          {odeType === 'logistic' && (
            <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-4 space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Taux de croissance r :</label>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={logisticR}
                  onChange={(e) => setLogisticR(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between font-mono text-[9px] text-muted-text mt-1">
                  <span>Lent (0.2)</span>
                  <span className="font-bold text-indigo-600">r = {logisticR}</span>
                  <span>Rapide (2.5)</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Capacité limite K :</label>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={logisticK}
                  onChange={(e) => setLogisticK(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between font-mono text-[9px] text-muted-text mt-1">
                  <span>Basse (0.5)</span>
                  <span className="font-bold text-indigo-600">K = {logisticK}</span>
                  <span>Haute (3.0)</span>
                </div>
              </div>
            </div>
          )}

          {/* Explanation Banner */}
          <div className="p-3.5 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs leading-normal">
            <span className="font-mono font-bold block mb-1 text-sm text-primary">
              ANALYSE GÉOMÉTRIQUE :
            </span>
            <span className="text-muted-text">
              {odeType === 'logistic' ? (
                <span>
                  Quand {"$y_0 > K$"}, le terme {"$(1 - y/K)$"} est négatif : la population décroît exponentiellement vers la capacité porteuse {"$K$"}. Quand {"$0 < y_0 < K$"}, la courbe est sigmoïde (forme de S). Si {"$y_0 \\le 0$"}, elle diverge vers le bas !
                </span>
              ) : odeType === 'linear' ? (
                <span>
                  La droite {"$y = x - 1$"} est une asymptote universelle (solution triviale). Toutes les autres courbes intégrales sont irrésistiblement attirées vers celle-ci par stabilité asymptotique.
                </span>
              ) : (
                <span>
                  Remarque la symétrie locale et périodique des tangentes. On observe des zones d'attraction (zones de convergence stable) et des zones de répulsion (vortex d'instabilité).
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
