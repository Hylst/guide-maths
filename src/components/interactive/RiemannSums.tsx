import React, { useState } from 'react';

type RiemannMethod = 'left' | 'right' | 'midpoint' | 'trapezoid';

export default function RiemannSums({ alt }: { alt?: string }) {
  const [n, setN] = useState<number>(10);
  const [method, setMethod] = useState<RiemannMethod>('left');
  const [funcPreset, setFuncPreset] = useState<'wave' | 'polynomial' | 'exponential'>('wave');

  // X range of integration
  const a = 0.5;
  const b = 4.5;

  // Presets of functions f(x) and their mathematical exact analytical integrals on [a, b]
  const f = (x: number): number => {
    switch (funcPreset) {
      case 'wave':
        // f(x) = sin(x) + 1.5
        return Math.sin(x) + 1.5;
      case 'polynomial':
        // f(x) = -0.15*x^3 + 0.9*x^2 - 1.2*x + 2.0
        return -0.15 * Math.pow(x, 3) + 0.9 * Math.pow(x, 2) - 1.2 * x + 2.0;
      case 'exponential':
        // f(x) = 3 * e^(-x/2)
        return 3 * Math.exp(-x / 2.0);
      default:
        return 2.0;
    }
  };

  const getExactIntegral = (): number => {
    switch (funcPreset) {
      case 'wave':
        // Integral of sin(x) + 1.5 is -cos(x) + 1.5x
        const intF = (x: number) => -Math.cos(x) + 1.5 * x;
        return intF(b) - intF(a);
      case 'polynomial':
        // Integral of -0.15*x^3 + 0.9*x^2 - 1.2*x + 2.0 is -0.15*x^4/4 + 0.9*x^3/3 - 1.2*x^2/2 + 2x
        const intP = (x: number) =>
          -0.0375 * Math.pow(x, 4) + 0.3 * Math.pow(x, 3) - 0.6 * Math.pow(x, 2) + 2.0 * x;
        return intP(b) - intP(a);
      case 'exponential':
        // Integral of 3 * e^(-x/2) is -6 * e^(-x/2)
        const intE = (x: number) => -6.0 * Math.exp(-x / 2.0);
        return intE(b) - intE(a);
      default:
        return 0;
    }
  };

  // Dimensions
  const width = 450;
  const height = 300;
  const paddingX = 40;
  const paddingY = 40;

  const toSvgX = (mx: number) => {
    return paddingX + ((mx - 0) / 5) * (width - 2 * paddingX);
  };

  const toSvgY = (my: number) => {
    return height - paddingY - (my / 4) * (height - 2 * paddingY);
  };

  // Calculations of the approximate sum
  const dx = (b - a) / n;
  let riemannSum = 0;
  const rectanglesOrTrapezoids: { points: string; heightVal: number; xLeft: number; xRight: number }[] = [];

  for (let i = 0; i < n; i++) {
    const xl = a + i * dx;
    const xr = xl + dx;
    let evalX = xl;

    if (method === 'right') evalX = xr;
    else if (method === 'midpoint') evalX = xl + dx / 2;

    const yVal = f(evalX);

    if (method === 'trapezoid') {
      const yl = f(xl);
      const yr = f(xr);
      const midArea = (yl + yr) / 2;
      riemannSum += midArea * dx;

      // Draw quadrilaterals for trapezoidal rule
      const p1 = `${toSvgX(xl)},${toSvgY(0)}`;
      const p2 = `${toSvgX(xl)},${toSvgY(yl)}`;
      const p3 = `${toSvgX(xr)},${toSvgY(yr)}`;
      const p4 = `${toSvgX(xr)},${toSvgY(0)}`;
      rectanglesOrTrapezoids.push({
        points: `${p1} ${p2} ${p3} ${p4}`,
        heightVal: midArea,
        xLeft: xl,
        xRight: xr,
      });
    } else {
      riemannSum += yVal * dx;

      const p1 = `${toSvgX(xl)},${toSvgY(0)}`;
      const p2 = `${toSvgX(xl)},${toSvgY(yVal)}`;
      const p3 = `${toSvgX(xr)},${toSvgY(yVal)}`;
      const p4 = `${toSvgX(xr)},${toSvgY(0)}`;
      rectanglesOrTrapezoids.push({
        points: `${p1} ${p2} ${p3} ${p4}`,
        heightVal: yVal,
        xLeft: xl,
        xRight: xr,
      });
    }
  }

  const exactVal = getExactIntegral();
  const errorVal = Math.abs(exactVal - riemannSum);

  // Generate math-points for the exact smooth curve representation
  const curveSteps = 100;
  const curvePoints = [];
  for (let i = 0; i <= curveSteps; i++) {
    const mx = a + (i / curveSteps) * (b - a);
    curvePoints.push(`${toSvgX(mx)},${toSvgY(f(mx))}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Simulation Window */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          APPROXIMATION DE L'AIRE PAR SUBDIVISIONS :
        </h4>

        <svg
          width={width}
          height={height}
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl shadow-md overflow-hidden select-none"
        >
          {/* Base references */}
          {/* Grid lines */}
          <line x1={toSvgX(0)} y1={toSvgY(1)} x2={toSvgX(5)} y2={toSvgY(1)} stroke="#e2e8f0" strokeDasharray="2,2" className="dark:stroke-slate-850" />
          <line x1={toSvgX(0)} y1={toSvgY(2)} x2={toSvgX(5)} y2={toSvgY(2)} stroke="#e2e8f0" strokeDasharray="2,2" className="dark:stroke-slate-850" />
          <line x1={toSvgX(0)} y1={toSvgY(3)} x2={toSvgX(5)} y2={toSvgY(3)} stroke="#e2e8f0" strokeDasharray="2,2" className="dark:stroke-slate-850" />

          {/* Subdivisions Rectangles / Trapezoids */}
          {rectanglesOrTrapezoids.map((rect, idx) => (
            <polygon
              key={idx}
              points={rect.points}
              fill="#fbbf24"
              fillOpacity={0.4}
              stroke="#b45309"
              strokeWidth="1.2"
              className="hover:fill-amber-400 hover:fill-opacity-65 transition-all duration-150 cursor-pointer"
            />
          ))}

          {/* Boundaries labels x=a and x=b */}
          <line
            x1={toSvgX(a)}
            y1={toSvgY(0)}
            x2={toSvgX(a)}
            y2={toSvgY(3.5)}
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            className="opacity-40"
          />
          <line
            x1={toSvgX(b)}
            y1={toSvgY(0)}
            x2={toSvgX(b)}
            y2={toSvgY(3.5)}
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            className="opacity-40"
          />

          {/* Exact continuous mathematical curve */}
          <path
            d={curvePath}
            fill="none"
            stroke="#ea580c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Core Coordinate Axis */}
          <line
            x1={paddingX - 10}
            y1={toSvgY(0)}
            x2={width - paddingX + 10}
            y2={toSvgY(0)}
            stroke="#475569"
            strokeWidth="2.5"
          />
          <line
            x1={toSvgX(0)}
            y1={height - paddingY + 10}
            x2={toSvgX(0)}
            y2={paddingY - 10}
            stroke="#475569"
            strokeWidth="2.5"
          />

          {/* Boundary coordinate points */}
          <text x={toSvgX(a)} y={toSvgY(0) + 18} fontSize="11" fontWeight="bold" fill="#ea580c" textAnchor="middle" className="font-mono">
            a = {a}
          </text>
          <text x={toSvgX(b)} y={toSvgY(0) + 18} fontSize="11" fontWeight="bold" fill="#ea580c" textAnchor="middle" className="font-mono">
            b = {b}
          </text>

          {/* Axis Labels */}
          <text x={width - paddingX + 18} y={toSvgY(0) + 4} fontSize="11" fill="#475569" fontWeight="bold" className="font-mono">
            x
          </text>
          <text x={toSvgX(0) - 15} y={paddingY - 15} fontSize="11" fill="#475569" fontWeight="bold" className="font-mono">
            y
          </text>
        </svg>

        {/* Dynamic calculation cards */}
        <div className="w-full mt-4 flex justify-between gap-3 text-xs font-mono">
          <div className="flex-1 p-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-center">
            <span className="block text-amber-800 dark:text-amber-400 font-bold">Somme Riemann :</span>
            <span className="text-base font-bold text-amber-950 dark:text-amber-200">{riemannSum.toFixed(4)}</span>
          </div>
          <div className="flex-1 p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl text-center">
            <span className="block text-emerald-800 dark:text-emerald-400 font-bold">Valeur Réelle :</span>
            <span className="text-base font-bold text-emerald-950 dark:text-emerald-200">{exactVal.toFixed(4)}</span>
          </div>
          <div className="flex-1 p-2.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl text-center">
            <span className="block text-rose-800 dark:text-rose-400 font-bold">Erreur absolue :</span>
            <span className="text-base font-bold text-rose-950 dark:text-rose-200">{errorVal.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-1 text-foreground">Intégration de Riemann</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Expérimente avec les subdivisions. La somme converge rigoureusement vers l'intégrale réelle lorsque n augmente.
          </p>

          {/* Presets */}
          <div className="mb-4">
            <label className="text-xs font-bold block mb-1">Fonction à intégrer f(x) :</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setFuncPreset('wave')}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  funcPreset === 'wave'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Trigo
              </button>
              <button
                onClick={() => setFuncPreset('polynomial')}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  funcPreset === 'polynomial'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Degré 3
              </button>
              <button
                onClick={() => setFuncPreset('exponential')}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  funcPreset === 'exponential'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Exponentiel
              </button>
            </div>
            <div className="text-center font-mono text-[9px] text-indigo-600 dark:text-indigo-400 font-bold mt-1.5 select-none">
              {funcPreset === 'wave' && 'f(x) = sin(x) + 1.5'}
              {funcPreset === 'polynomial' && 'f(x) = -0.15x³ + 0.9x² - 1.2x + 2'}
              {funcPreset === 'exponential' && 'f(x) = 3 * e^(-x/2)'}
            </div>
          </div>

          {/* Methods Selection */}
          <div className="mb-4">
            <label className="text-xs font-bold block mb-1.5">Méthode de subdivision :</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setMethod('left')}
                className={`py-2 rounded-xl text-xs font-semibold cursor-pointer border ${
                  method === 'left' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Sommes à Gauche
              </button>
              <button
                onClick={() => setMethod('right')}
                className={`py-2 rounded-xl text-xs font-semibold cursor-pointer border ${
                  method === 'right' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Sommes à Droite
              </button>
              <button
                onClick={() => setMethod('midpoint')}
                className={`py-2 rounded-xl text-xs font-semibold cursor-pointer border ${
                  method === 'midpoint' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Point Milieu
              </button>
              <button
                onClick={() => setMethod('trapezoid')}
                className={`py-2 rounded-xl text-xs font-semibold cursor-pointer border ${
                  method === 'trapezoid' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Règle des Trapèzes
              </button>
            </div>
          </div>

          {/* Slider n subdivisions */}
          <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-4">
            <label className="text-xs font-bold block mb-1">Nombre d'intervalles n :</label>
            <input
              type="range"
              min="4"
              max="60"
              step="1"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between font-mono text-[9px] text-muted-text mt-1.5">
              <span>Grossier (4)</span>
              <span className="font-bold text-indigo-600 text-xs">n = {n}</span>
              <span>Lisse (60)</span>
            </div>
          </div>

          {/* Theoretical dynamic comment */}
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs leading-normal">
            <span className="font-bold font-mono text-primary block mb-1 text-[11px]">DYNAMIQUE ANALYTIQUE :</span>
            <span className="text-muted-text text-[11px]">
              {method === 'left' && 'Les rectangles prélèvent la hauteur f(x) à la borne gauche. L\'erreur est de l\'ordre de O(1/n).'}
              {method === 'right' && 'Les rectangles prélèvent la hauteur f(x) à la borne droite. L\'erreur d\'approximation échelle O(1/n).'}
              {method === 'midpoint' && 'La méthode du point milieu compense automatiquement les erreurs bilatérales du premier ordre : l\'erreur chute à O(1/n²).'}
              {method === 'trapezoid' && 'La règle des trapèzes forme des pentes linéaires locales. Elle converge en O(1/n²), très supérieure aux sommes gauches/droites.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
