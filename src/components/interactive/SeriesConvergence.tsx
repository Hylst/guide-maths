import React, { useState } from 'react';

type SeriesType = 'geometric' | 'harmonic' | 'riemann' | 'alternating';

export default function SeriesConvergence({ alt }: { alt?: string }) {
  const [seriesType, setSeriesType] = useState<SeriesType>('geometric');
  const [numTerms, setNumTerms] = useState<number>(15);
  const [geometricQ, setGeometricQ] = useState<number>(0.7);

  const maxN = 40;

  // Calculate terms and partial sums
  const getTermValue = (n: number): number => {
    switch (seriesType) {
      case 'geometric':
        return Math.pow(geometricQ, n);
      case 'harmonic':
        return 1.0 / n;
      case 'riemann':
        return 1.0 / (n * n);
      case 'alternating':
        return (n % 2 === 1 ? 1.0 : -1.0) / n;
      default:
        return 0;
    }
  };

  const terms: number[] = [];
  const partialSums: number[] = [];
  let runningSum = 0;

  for (let idx = 1; idx <= numTerms; idx++) {
    const val = getTermValue(idx);
    terms.push(val);
    runningSum += val;
    partialSums.push(runningSum);
  }

  // Determine limits/convergence explanations
  const getExplanation = () => {
    switch (seriesType) {
      case 'geometric':
        const absQ = Math.abs(geometricQ);
        if (absQ < 1.0) {
          const limit = geometricQ / (1.0 - geometricQ); // assuming n starting from 1: q^1 + q^2 + ...
          return {
            status: 'CONVERGENTE',
            text: `La série géométrique converge car |q| = ${absQ.toFixed(2)} < 1. Sa somme infinie vaut exactement q/(1-q) = ${limit.toFixed(4)}.`,
            color: 'text-emerald-600 dark:text-emerald-400',
          };
        } else {
          return {
            status: 'DIVERGENTE',
            text: `La série géométrique diverge car |q| = ${absQ.toFixed(2)} ≥ 1. Les termes ne tendent pas vers 0 ou explosent !`,
            color: 'text-rose-600 dark:text-rose-400',
          };
        }
      case 'harmonic':
        return {
          status: 'DIVERGENTE',
          text: `La série harmonique diverge ! Étonnamment, bien que les termes généraux tendent vers 0 (1/n → 0), l'accumulation grandit à l'infini comme ln(N).`,
          color: 'text-rose-600 dark:text-rose-400',
        };
      case 'riemann':
        const riemannLimit = Math.PI * Math.PI / 6.0; // sum_{n=1}^inf 1/n^2 = pi^2/6
        return {
          status: 'CONVERGENTE',
          text: `La série converge (Règle de Riemann alpha=2 > 1). Somme infinie (Problème de Bâle) : π²/6 ≈ ${riemannLimit.toFixed(4)}.`,
          color: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'alternating':
        const altLimit = Math.log(2); // ln(2)
        return {
          status: 'CONVERGENTE (Série Alternée)',
          text: `La série converge vers ln(2) ≈ ${altLimit.toFixed(4)} par oscillations amorties (Critère spécial des séries alternées).`,
          color: 'text-emerald-600 dark:text-emerald-400',
        };
    }
  };

  const explanation = getExplanation();

  // SVG dimensions & scales
  const width = 450;
  const height = 280;
  const paddingX = 40;
  const paddingY = 30;

  // Find max amplitude for scaling the Y axis
  const allYValues = [...terms, ...partialSums];
  const maxY = Math.max(...allYValues, 1.5);
  const minY = Math.min(...allYValues, -0.5);

  const toSvgX = (index: number) => {
    // scale index (1 to numTerms) inside the chart width
    const range = numTerms > 1 ? numTerms - 1 : 1;
    return paddingX + ((index - 1) / range) * (width - 2 * paddingX);
  };

  const toSvgY = (val: number) => {
    const scaleY = (height - 2 * paddingY) / (maxY - minY);
    return height - paddingY - (val - minY) * scaleY;
  };

  // Build Sum SVG curve points path
  const sumPointsPath = partialSums
    .map((sum, idx) => {
      const x = toSvgX(idx + 1);
      const y = toSvgY(sum);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Chart Screen */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          CUMUL DES SOMMES PARTIELLES (S_N) :
        </h4>
        
        <svg
          width={width}
          height={height}
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl shadow-md p-1"
        >
          {/* Grid lines & levels */}
          <line
            x1={paddingX}
            y1={toSvgY(0)}
            x2={width - paddingX}
            y2={toSvgY(0)}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          {seriesType === 'geometric' && Math.abs(geometricQ) < 1.0 && (
            <line
              x1={paddingX}
              y1={toSvgY(geometricQ / (1.0 - geometricQ))}
              x2={width - paddingX}
              y2={toSvgY(geometricQ / (1.0 - geometricQ))}
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="opacity-70"
            />
          )}

          {/* Draw bars for individual terms u_n */}
          {terms.map((term, idx) => {
            const x = toSvgX(idx + 1);
            const y0 = toSvgY(0);
            const y1 = toSvgY(term);
            return (
              <line
                key={idx}
                x1={x}
                y1={y0}
                x2={x}
                y2={y1}
                stroke="#6366f1"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-40 hover:opacity-100 transition-opacity"
              />
            );
          })}

          {/* Partial Sums connected curve Line */}
          {partialSums.length > 1 && (
            <path
              d={sumPointsPath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Dots on Sum curve */}
          {partialSums.map((sum, idx) => {
            const x = toSvgX(idx + 1);
            const y = toSvgY(sum);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="4.5"
                fill="#ec4899"
                stroke="white"
                strokeWidth="1.5"
                className="cursor-pointer hover:scale-130 transition-transform"
              />
            );
          })}

          {/* X axis labels (1, N) */}
          <text x={paddingX} y={height - 8} fontSize="10" fill="#94a3b8" fontFamily="monospace">
            n=1
          </text>
          <text x={width - paddingX - 10} y={height - 8} fontSize="10" fill="#94a3b8" fontFamily="monospace">
            N={numTerms}
          </text>
          
          {/* Y value markers */}
          <text x={8} y={toSvgY(0) + 4} fontSize="10" fill="#94a3b8" fontFamily="monospace">
            0
          </text>
          <text x={8} y={toSvgY(1) + 4} fontSize="10" fill="#94a3b8" fontFamily="monospace">
            1.0
          </text>
        </svg>
        
        {/* Sum Indicator */}
        <div className="mt-3 flex gap-6 text-sm font-mono select-none">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Dernier terme {"$u_n = $"} {terms[terms.length - 1].toFixed(4)}
          </span>
          <span className="text-pink-600 dark:text-pink-400 font-bold">
            Somme cumulée {"$S_N = $"} {runningSum.toFixed(4)}
          </span>
        </div>
      </div>

      {/* Control Panel / Selection */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-2 text-foreground">Séries Classiques</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Sélectionne un type de série pour projeter sa convergence ou sa divergence analytiques instantanées :
          </p>

          <div className="space-y-2 mb-4">
            <button
              onClick={() => setSeriesType('geometric')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                seriesType === 'geometric'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>📈 Série Géométrique (qⁿ)</span>
              {seriesType === 'geometric' && <small className="opacity-90">q = {geometricQ}</small>}
            </button>
            <button
              onClick={() => setSeriesType('harmonic')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                seriesType === 'harmonic'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>🎻 Série Harmonique (1/n)</span>
            </button>
            <button
              onClick={() => setSeriesType('riemann')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                seriesType === 'riemann'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>🪐 Série Riemann (1/n²)</span>
            </button>
            <button
              onClick={() => setSeriesType('alternating')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                seriesType === 'alternating'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>🔀 Alternée ((-1)ⁿ⁺¹ / n)</span>
            </button>
          </div>

          {/* Geometric slider (only shown if geometric selected) */}
          {seriesType === 'geometric' && (
            <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-4">
              <label className="text-xs font-bold block mb-1">Raison q de la suite :</label>
              <input
                type="range"
                min="-1.3"
                max="1.3"
                step="0.1"
                value={geometricQ}
                onChange={(e) => setGeometricQ(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between font-mono text-[9px] text-muted-text mt-1">
                <span>-1.3 (Diverge)</span>
                <span className="font-bold text-indigo-600">q = {geometricQ}</span>
                <span>1.3 (Diverge)</span>
              </div>
            </div>
          )}

          {/* Explanation Banner */}
          <div className="p-3.5 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs leading-normal">
            <span className={`font-mono font-bold block mb-1 text-sm ${explanation.color}`}>
              {explanation.status}
            </span>
            <span className="text-muted-text">{explanation.text}</span>
          </div>
        </div>

        {/* Adjust range N slider */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <label className="text-xs font-bold block mb-1 flex justify-between">
            <span>Nombre de termes cumulés N :</span>
            <span className="font-mono text-indigo-600">{numTerms}</span>
          </label>
          <input
            type="range"
            min="3"
            max={maxN}
            step="1"
            value={numTerms}
            onChange={(e) => setNumTerms(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
