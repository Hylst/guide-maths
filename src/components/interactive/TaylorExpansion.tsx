import React, { useState } from 'react';

type TaylorPreset = 'exp' | 'sin' | 'cos' | 'ln';

export default function TaylorExpansion({ alt }: { alt?: string }) {
  const [preset, setPreset] = useState<TaylorPreset>('exp');
  const [n, setN] = useState<number>(3);
  const [testPoint, setTestPoint] = useState<number>(1.0);

  // Math definitions
  const f = (x: number): number => {
    switch (preset) {
      case 'exp':
        return Math.exp(x);
      case 'sin':
        return Math.sin(x);
      case 'cos':
        return Math.cos(x);
      case 'ln':
        // Domain for ln(1+x) must be x > -1. We guard it.
        return Math.log(Math.max(0.001, 1 + x));
      default:
        return 0;
    }
  };

  const getTaylorPoly = (x: number, degree: number): number => {
    switch (preset) {
      case 'exp': {
        let sum = 1;
        let term = 1;
        for (let i = 1; i <= degree; i++) {
          term = (term * x) / i;
          sum += term;
        }
        return sum;
      }
      case 'sin': {
        let sum = 0;
        let term = x;
        // sin(x) = x - x^3/6 + x^5/120 - ...
        for (let i = 1; i <= degree; i++) {
          if (i % 2 === 1) {
            const power = i;
            const sign = ((i - 1) / 2) % 2 === 0 ? 1 : -1;
            let fact = 1;
            for (let j = 2; j <= power; j++) fact *= j;
            sum += sign * (Math.pow(x, power) / fact);
          }
        }
        return sum;
      }
      case 'cos': {
        let sum = 1;
        // cos(x) = 1 - x^2/2 + x^4/24 - x^6/720
        for (let i = 1; i <= degree; i++) {
          if (i % 2 === 0) {
            const power = i;
            const sign = (i / 2) % 2 === 0 ? 1 : -1;
            let fact = 1;
            for (let j = 2; j <= power; j++) fact *= j;
            sum += sign * (Math.pow(x, power) / fact);
          }
        }
        return sum;
      }
      case 'ln': {
        let sum = 0;
        // ln(1+x) = x - x^2/2 + x^3/3 - x^4/4 ...
        for (let i = 1; i <= degree; i++) {
          const sign = i % 2 === 1 ? 1 : -1;
          sum += sign * (Math.pow(x, i) / i);
        }
        return sum;
      }
      default:
        return 0;
    }
  };

  const getFormulaLaTeX = (): string => {
    switch (preset) {
      case 'exp': {
        const terms = ['1', 'x'];
        if (n >= 2) terms.push('\\frac{x^2}{2}');
        if (n >= 3) terms.push('\\frac{x^3}{6}');
        if (n >= 4) terms.push('\\frac{x^4}{24}');
        if (n >= 5) terms.push('\\frac{x^5}{120}');
        if (n >= 6) terms.push('\\frac{x^6}{720}');
        return `P_{${n}}(x) = ` + terms.slice(0, n + 1).join(' + ') + ` + o(x^{${n}})`;
      }
      case 'sin': {
        const terms = [];
        terms.push('x');
        if (n >= 3) terms.push('-\\frac{x^3}{6}');
        if (n >= 5) terms.push('+\\frac{x^5}{120}');
        let s = `P_{${n}}(x) = ` + terms.join(' ');
        if (n === 0) s = `P_{0}(x) = 0`;
        return s + ` + o(x^{${n}})`;
      }
      case 'cos': {
        const terms = ['1'];
        if (n >= 2) terms.push('-\\frac{x^2}{2}');
        if (n >= 4) terms.push('+\\frac{x^4}{24}');
        if (n >= 6) terms.push('-\\frac{x^6}{720}');
        let s = `P_{${n}}(x) = ` + terms.join(' ');
        return s + ` + o(x^{${n}})`;
      }
      case 'ln': {
        const terms = [];
        if (n >= 1) terms.push('x');
        if (n >= 2) terms.push('-\\frac{x^2}{2}');
        if (n >= 3) terms.push('+\\frac{x^3}{3}');
        if (n >= 4) terms.push('-\\frac{x^4}{4}');
        if (n >= 5) terms.push('+\\frac{x^5}{5}');
        if (n >= 6) terms.push('-\\frac{x^6}{6}');
        let s = `P_{${n}}(x) = ` + terms.join(' ');
        if (n === 0) s = `P_{0}(x) = 0`;
        return s + ` + o(x^{${n}})`;
      }
      default:
        return '';
    }
  };

  // Bounds for coordinate display
  // exp / sin / cos: x range [-3.5, 3.5], y range [-2.5, 3.5]
  // ln: x range [-0.95, 2.5], y range [-3, 2]
  const isLn = preset === 'ln';
  const minX = isLn ? -0.95 : -3.5;
  const maxX = isLn ? 2.5 : 3.5;
  const minY = isLn ? -3.0 : -2.5;
  const maxY = isLn ? 2.0 : 3.5;

  const width = 440;
  const height = 280;
  const paddingX = 40;
  const paddingY = 40;

  const toSvgX = (x: number) => {
    return paddingX + ((x - minX) / (maxX - minX)) * (width - 2 * paddingX);
  };

  const toSvgY = (y: number) => {
    return height - paddingY - ((y - minY) / (maxY - minY)) * (height - 2 * paddingY);
  };

  // Curve generation
  const steps = 110;
  const exactPoints: string[] = [];
  const taylorPoints: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const x = minX + (i / steps) * (maxX - minX);
    const yExact = f(x);
    const yTaylor = getTaylorPoly(x, n);

    exactPoints.push(`${toSvgX(x)},${toSvgY(yExact)}`);
    // Guard against crazy infinite Taylor outcomes on boundaries to keep SVG beautiful
    if (yTaylor >= minY - 5 && yTaylor <= maxY + 5) {
      taylorPoints.push(`${toSvgX(x)},${toSvgY(yTaylor)}`);
    }
  }

  const exactPath = `M ${exactPoints.join(' L ')}`;
  const taylorPath = taylorPoints.length > 1 ? `M ${taylorPoints.join(' L ')}` : '';

  const realVal = f(testPoint);
  const taylorVal = getTaylorPoly(testPoint, n);
  const absError = Math.abs(realVal - taylorVal);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Simulation Window */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          REPRÉSENTATIONS LOCALES (DL AUTOUR DE X = 0) :
        </h4>

        <svg
          width={width}
          height={height}
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl shadow-md overflow-hidden select-none"
        >
          {/* Reference Grid */}
          {Array.from({ length: 7 }).map((_, idx) => {
            const xVal = minX + (idx / 6) * (maxX - minX);
            const xPos = toSvgX(xVal);
            return (
              <line
                key={`grid-x-${idx}`}
                x1={xPos}
                y1={paddingY}
                x2={xPos}
                y2={height - paddingY}
                stroke="#e2e8f0"
                strokeDasharray="2,2"
                className="dark:stroke-slate-850"
              />
            );
          })}
          {Array.from({ length: 6 }).map((_, idx) => {
            const yVal = minY + (idx / 5) * (maxY - minY);
            const yPos = toSvgY(yVal);
            return (
              <line
                key={`grid-y-${idx}`}
                x1={paddingX}
                y1={yPos}
                x2={width - paddingX}
                y2={yPos}
                stroke="#e2e8f0"
                strokeDasharray="2,2"
                className="dark:stroke-slate-850"
              />
            );
          })}

          {/* Coordinate axes */}
          <line
            x1={paddingX - 10}
            y1={toSvgY(0)}
            x2={width - paddingX + 15}
            y2={toSvgY(0)}
            stroke="#64748b"
            strokeWidth="2"
          />
          <line
            x1={toSvgX(0)}
            y1={height - paddingY + 10}
            x2={toSvgX(0)}
            y2={paddingY - 15}
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Origin tick mark */}
          <circle cx={toSvgX(0)} cy={toSvgY(0)} r="3" fill="#64748b" />

          {/* Exact Curve */}
          <path
            d={exactPath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Taylor Polynomial Curve */}
          {taylorPath && (
            <path
              d={taylorPath}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1,0"
            />
          )}

          {/* Interactive marker dot at current testPoint */}
          <line
            x1={toSvgX(testPoint)}
            y1={toSvgY(minY)}
            x2={toSvgX(testPoint)}
            y2={toSvgY(maxY)}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="3,3"
            className="opacity-40"
          />

          {/* Marker dots */}
          <circle cx={toSvgX(testPoint)} cy={toSvgY(realVal)} r="5" fill="#f43f5e" />
          <circle cx={toSvgX(testPoint)} cy={toSvgY(taylorVal)} r="5" fill="#4f46e5" />

          {/* Labels & Legends */}
          <text x={toSvgX(maxX) + 5} y={toSvgY(0) + 12} fontSize="10" fill="#64748b" fontWeight="bold" className="font-mono">
            x
          </text>
          <text x={toSvgX(0) - 15} y={paddingY - 8} fontSize="10" fill="#64748b" fontWeight="bold" className="font-mono">
            y
          </text>

          {/* Unit tick markers */}
          <text x={toSvgX(1)} y={toSvgY(0) + 14} fontSize="9" fill="#94a3b8" textAnchor="middle" className="font-mono">
            1
          </text>
          <text x={toSvgX(0) - 12} y={toSvgY(1) + 4} fontSize="9" fill="#94a3b8" textAnchor="end" className="font-mono">
            1
          </text>
        </svg>

        {/* Dynamic analytics panel */}
        <div className="w-full mt-4 flex justify-between gap-3 text-xs font-mono">
          <div className="flex-1 p-2.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl text-center">
            <span className="block text-rose-800 dark:text-rose-400 font-bold">Valeur Réelle f(x) :</span>
            <span className="text-base font-bold text-rose-950 dark:text-rose-200">{realVal.toFixed(4)}</span>
          </div>
          <div className="flex-1 p-2.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 rounded-xl text-center">
            <span className="block text-indigo-800 dark:text-indigo-400 font-bold">Polynôme P_n(x) :</span>
            <span className="text-base font-bold text-indigo-950 dark:text-indigo-200">{taylorVal.toFixed(4)}</span>
          </div>
          <div className="flex-1 p-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-center">
            <span className="block text-amber-800 dark:text-amber-400 font-bold">Erreur locale :</span>
            <span className="text-base font-bold text-amber-950 dark:text-amber-200">{absError.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-1 text-foreground">Développements Limités</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Comprends comment le polynôme de Taylor (ligne de pointillés bleue) embrasse de plus en plus fidèlement la courbe réelle (rose) globale autour du point de contact d'origine $x = 0$.
          </p>

          {/* Preset Functions Picker */}
          <div className="mb-4">
            <label className="text-xs font-bold block mb-1">Sélectionne la fonction f(x) :</label>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => {
                  setPreset('exp');
                  setTestPoint(1.0);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  preset === 'exp' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Exponentielle
              </button>
              <button
                onClick={() => {
                  setPreset('sin');
                  setTestPoint(1.5);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  preset === 'sin' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Sinus
              </button>
              <button
                onClick={() => {
                  setPreset('cos');
                  setTestPoint(1.5);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  preset === 'cos' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Cosinus
              </button>
              <button
                onClick={() => {
                  setPreset('ln');
                  const currentLimit = 1.0;
                  setTestPoint(currentLimit);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  preset === 'ln' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                {"Logarithme ln(1+x)"}
              </button>
            </div>
          </div>

          {/* Order / Degree Slider */}
          <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-3">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Ordre du Développement n :</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">d = {n}</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between font-mono text-[8px] text-muted-text mt-1.5">
              <span>Constante (0)</span>
              <span>Modèle 6e degré (6)</span>
            </div>
          </div>

          {/* Point evaluation slider */}
          <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Évaluer au point d'abscisse x :</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">x = {testPoint.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={isLn ? -0.80 : -3.0}
              max={isLn ? 2.20 : 3.0}
              step="0.05"
              value={testPoint}
              onChange={(e) => setTestPoint(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Real-time analytical math formulation box */}
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-xl">
            <span className="font-bold font-mono text-primary block mb-1 text-[11px] uppercase">Formulation Analytique en $x=0$ :</span>
            <div className="text-muted-text text-[11px] font-mono leading-relaxed bg-white/70 dark:bg-black/30 p-2 rounded-lg border border-indigo-50 dark:border-indigo-950">
              {preset === 'exp' && (
                <span>
                  {n === 0 && 'P₀(x) = 1 + o(1)'}
                  {n === 1 && 'P₁(x) = 1 + x + o(x)'}
                  {n === 2 && 'P₂(x) = 1 + x + x²/2 + o(x²)'}
                  {n === 3 && 'P₃(x) = 1 + x + x²/2 + x³/6 + o(x³)'}
                  {n === 4 && 'P₄(x) = 1 + x + x²/2 + x³/6 + x⁴/24 + o(x⁴)'}
                  {n === 5 && 'P₅(x) = 1 + x + x²/2 + x³/6 + x⁴/24 + x⁵/120 + o(x⁵)'}
                  {n >= 6 && 'P₆(x) = 1 + x + x²/2 + x³/6 + x⁴/24 + x⁵/120 + x⁶/720 + o(x⁶)'}
                </span>
              )}
              {preset === 'sin' && (
                <span>
                  {n === 0 && 'P₀(x) = 0 + o(1)'}
                  {n >= 1 && n < 3 && 'P₁(x) = x + o(x)'}
                  {n >= 3 && n < 5 && 'P₃(x) = x - x³/6 + o(x³)'}
                  {n >= 5 && 'P₅(x) = x - x³/6 + x⁵/120 + o(x⁵)'}
                </span>
              )}
              {preset === 'cos' && (
                <span>
                  {n < 2 && 'P₀(x) = 1 + o(...)'}
                  {n >= 2 && n < 4 && 'P₂(x) = 1 - x²/2 + o(x³)'}
                  {n >= 4 && n < 6 && 'P₄(x) = 1 - x²/2 + x⁴/24 + o(x⁵)'}
                  {n >= 6 && 'P₆(x) = 1 - x²/2 + x⁴/24 - x⁶/720 + o(x⁷)'}
                </span>
              )}
              {preset === 'ln' && (
                <span>
                  {n === 0 && 'P₀(x) = 0 + o(1)'}
                  {n === 1 && 'P₁(x) = x + o(x)'}
                  {n === 2 && 'P₂(x) = x - x²/2 + o(x²)'}
                  {n === 3 && 'P₃(x) = x - x²/2 + x³/3 + o(x³)'}
                  {n === 4 && 'P₄(x) = x - x²/2 + x³/3 - x⁴/4 + o(x⁴)'}
                  {n === 5 && 'P₅(x) = x - x²/2 + x³/3 - x⁴/4 + x⁵/5 + o(x⁵)'}
                  {n >= 6 && 'P₆(x) = x - x²/2 + x³/3 - x⁴/4 + x⁵/5 - x⁶/6 + o(x⁶)'}
                </span>
              )}
            </div>
            <p className="text-[10px] text-muted-text mt-2 block italic">
              {preset === 'ln' && "Note : Le domaine de convergence de ln(1+x) est restreint à x ∈ ]-1, 1]. D'où la divergence visible pour x > 1 !"}
              {preset === 'exp' && "Note : L'exponentielle converge sur ℝ tout entier, plus n est grand, plus la fidélité est spectaculaire !"}
              {preset === 'sin' && "Note : Le sinus étant une fonction impaire, les termes d'indices pairs sont nuls !"}
              {preset === 'cos' && "Note : Le cosinus étant une fonction paire, les termes d'indices impairs sont nuls !"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
