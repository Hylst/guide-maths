import React, { useState } from 'react';

type CompareMode = 'poisson' | 'normal' | 'none';

export default function BinomialDist({ alt }: { alt?: string }) {
  const [n, setN] = useState<number>(30);
  const [p, setP] = useState<number>(0.2);
  const [compareMode, setCompareMode] = useState<CompareMode>('poisson');
  const [hoveredK, setHoveredK] = useState<number | null>(null);

  // Precompute factorial logarithms to safely compute choose(n, k) without overflows
  const logFactorial = (num: number): number => {
    let ans = 0;
    for (let i = 2; i <= num; i++) {
      ans += Math.log(i);
    }
    return ans;
  };

  const getBinomialProb = (numN: number, k: number, probP: number): number => {
    if (k < 0 || k > numN) return 0;
    if (probP <= 0) return k === 0 ? 1 : 0;
    if (probP >= 1) return k === numN ? 1 : 0;

    const logBinomial =
      logFactorial(numN) -
      logFactorial(k) -
      logFactorial(numN - k) +
      k * Math.log(probP) +
      (numN - k) * Math.log(1 - probP);

    return Math.exp(logBinomial);
  };

  // Poisson probability mass function for lambda = n * p
  const getPoissonProb = (lambda: number, k: number): number => {
    if (k < 0 || lambda <= 0) return 0;
    const logPoisson = -lambda + k * Math.log(lambda) - logFactorial(k);
    return Math.exp(logPoisson);
  };

  // Normal Gaussian probability density function for mu = np, sigma = sqrt(np(1-p))
  const getNormalDensity = (mu: number, sigma: number, x: number): number => {
    if (sigma <= 0) return 0;
    const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  };

  // Stat computations
  const mean = n * p;
  const variance = n * p * (1 - p);
  const stdDev = Math.sqrt(variance);

  // Layout parameters
  const width = 450;
  const height = 260;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 35;

  // X range of bins (will show values from 0 up to max(15, min(n, ceil(mean + 4 * stdDev))))
  const maxVisibleK = Math.max(12, Math.min(n, Math.ceil(mean + 3.8 * stdDev)));
  const visibleBinsCount = maxVisibleK + 1;

  // Calculate coordinates mapping
  const toSvgX = (k: number) => {
    return paddingLeft + (k / maxVisibleK) * (width - paddingLeft - paddingRight);
  };

  // Find max probability to scale Y axis dynamically
  let maxProb = 0.05;
  for (let k = 0; k <= maxVisibleK; k++) {
    const bProb = getBinomialProb(n, k, p);
    if (bProb > maxProb) maxProb = bProb;

    if (compareMode === 'poisson') {
      const pProb = getPoissonProb(mean, k);
      if (pProb > maxProb) maxProb = pProb;
    }
  }
  // add 10% safety margin on Y limit
  maxProb *= 1.15;

  const toSvgY = (prob: number) => {
    return height - paddingBottom - (prob / maxProb) * (height - paddingTop - paddingBottom);
  };

  // Generate Normal/Gaussian curve samples mapping
  const normalCurvePoints = [];
  if (compareMode === 'normal' && stdDev > 0.1) {
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const kVal = (i / steps) * maxVisibleK;
      const densK = getNormalDensity(mean, stdDev, kVal);
      // To match discrete scaling area of bar height, normal dens is equivalent to discrete prob on 1-width bins
      normalCurvePoints.push({
        x: toSvgX(kVal),
        y: toSvgY(densK),
      });
    }
  }
  const normalPath = normalCurvePoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');

  // Generate Poisson discrete overlay points for curve connection
  const poissonCurvePoints = [];
  if (compareMode === 'poisson') {
    for (let k = 0; k <= maxVisibleK; k++) {
      poissonCurvePoints.push({
        x: toSvgX(k),
        y: toSvgY(getPoissonProb(mean, k)),
      });
    }
  }
  const poissonPath = poissonCurvePoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Simulation Window */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          DISTRIBUTION DE PROBABILITÉS P(X = k) :
        </h4>

        <svg
          width={width}
          height={height}
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl shadow-md overflow-hidden"
        >
          {/* Grid lines for probabilities */}
          <line x1={paddingLeft} y1={toSvgY(0.1)} x2={width - paddingRight} y2={toSvgY(0.1)} stroke="#e2e8f0" strokeDasharray="2,2" className="dark:stroke-slate-800/60" />
          <line x1={paddingLeft} y1={toSvgY(0.2)} x2={width - paddingRight} y2={toSvgY(0.2)} stroke="#e2e8f0" strokeDasharray="2,2" className="dark:stroke-slate-800/60" />
          <line x1={paddingLeft} y1={toSvgY(0.3)} x2={width - paddingRight} y2={toSvgY(0.3)} stroke="#e2e8f0" strokeDasharray="2,2" className="dark:stroke-slate-800/60" />

          {/* Probability axes values */}
          <text x={paddingLeft - 8} y={toSvgY(0) + 4} fontSize="9" fill="#94a3b8" textAnchor="end" className="font-mono">
            0%
          </text>
          <text x={paddingLeft - 8} y={toSvgY(0.1) + 4} fontSize="9" fill="#94a3b8" textAnchor="end" className="font-mono">
            10%
          </text>
          <text x={paddingLeft - 8} y={toSvgY(0.2) + 4} fontSize="9" fill="#94a3b8" textAnchor="end" className="font-mono">
            20%
          </text>
          {maxProb > 0.3 && (
            <text x={paddingLeft - 8} y={toSvgY(0.3) + 4} fontSize="9" fill="#94a3b8" textAnchor="end" className="font-mono">
              30%
            </text>
          )}

          {/* Bar thickness based on total visible elements */}
          {(() => {
            const barSpacing = (width - paddingLeft - paddingRight) / visibleBinsCount;
            const barWidth = Math.max(3, barSpacing * 0.72);

            return Array.from({ length: maxVisibleK + 1 }).map((_, k) => {
              const bProb = getBinomialProb(n, k, p);
              const barH = height - paddingBottom - toSvgY(bProb);
              const xPos = toSvgX(k) - barWidth / 2;

              return (
                <g key={k}>
                  {/* Binomial PMF Bar */}
                  <rect
                    x={xPos}
                    y={toSvgY(bProb)}
                    width={barWidth}
                    height={Math.max(1, barH)}
                    fill={hoveredK === k ? '#4f46e5' : '#3b82f6'}
                    fillOpacity={0.8}
                    stroke={hoveredK === k ? '#312e81' : '#1d4ed8'}
                    strokeWidth="1"
                    className="transition-all duration-100 cursor-pointer"
                    onMouseEnter={() => setHoveredK(k)}
                    onMouseLeave={() => setHoveredK(null)}
                  />
                  
                  {/* Poisson discrete points marker */}
                  {compareMode === 'poisson' && (
                    <circle
                      cx={toSvgX(k)}
                      cy={toSvgY(getPoissonProb(mean, k))}
                      r="3.5"
                      fill="#f97316"
                      className="opacity-90"
                    />
                  )}

                  {/* Tick labels */}
                  {(k % Math.ceil(maxVisibleK / 8) === 0 || k === maxVisibleK) && (
                    <text
                      x={toSvgX(k)}
                      y={height - paddingBottom + 14}
                      fontSize="9"
                      fill="#64748b"
                      textAnchor="middle"
                      className="font-mono select-none"
                    >
                      {k}
                    </text>
                  )}
                </g>
              );
            });
          })()}

          {/* Poisson overlay path hook */}
          {compareMode === 'poisson' && (
            <path
              d={poissonPath}
              fill="none"
              stroke="#ea580c"
              strokeWidth="2"
              strokeDasharray="4,4"
              className="opacity-80"
            />
          )}

          {/* Normal Gaussian density approximation line overlay */}
          {compareMode === 'normal' && normalCurvePoints.length > 1 && (
            <path
              d={normalPath}
              fill="none"
              stroke="#ec4899"
              strokeWidth="2.5"
              className="opacity-90"
            />
          )}

          {/* Reference line indicators inside grid */}
          <line
            x1={paddingLeft}
            y1={height - paddingBottom}
            x2={width - paddingRight}
            y2={height - paddingBottom}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <line
            x1={paddingLeft}
            y1={paddingTop - 10}
            x2={paddingLeft}
            y2={height - paddingBottom}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Mean indicator reference line */}
          <line
            x1={toSvgX(mean)}
            y1={paddingTop - 5}
            x2={toSvgX(mean)}
            y2={height - paddingBottom}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
          <text
            x={toSvgX(mean) + 4}
            y={paddingTop + 5}
            fontSize="9"
            className="font-mono font-bold fill-emerald-600 dark:fill-emerald-400 select-none"
          >
            E(X) = {mean.toFixed(1)}
          </text>
        </svg>

        {/* Hover info panel */}
        <div className="h-10 mt-2 text-xs font-mono select-none flex items-center justify-center text-center">
          {hoveredK !== null ? (
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 font-bold">Binomiale : </span>
              <span>P(X = {hoveredK}) = <span className="font-bold">{(getBinomialProb(n, hoveredK, p) * 100).toFixed(2)}%</span></span>
              {compareMode === 'poisson' && (
                <span className="ml-3 border-l pl-3 border-slate-300 dark:border-slate-700">
                  <span className="text-orange-600 font-bold">Poisson : </span>
                  <span>P(Y = {hoveredK}) = <span className="font-bold">{(getPoissonProb(mean, hoveredK) * 100).toFixed(2)}%</span></span>
                </span>
              )}
            </div>
          ) : (
            <span className="text-muted-text">Survole une barre bleue pour inspecter les probabilités exactes.</span>
          )}
        </div>
      </div>

      {/* Control Panel / Variables */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-1 text-foreground">Lois Binomiale & Limites</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Visualise comment la distribution Bernoulli répétée {"$\\mathcal{B}(n, p)$"} change selon ses paramètres fondamentaux.
          </p>

          {/* Comparaison Modes */}
          <div className="mb-4">
            <label className="text-xs font-bold block mb-1.5">Comparer la convergence avec :</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setCompareMode('none')}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  compareMode === 'none'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Simple Binomiale
              </button>
              <button
                onClick={() => setCompareMode('poisson')}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  compareMode === 'poisson'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Loi de Poisson
              </button>
              <button
                onClick={() => setCompareMode('normal')}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  compareMode === 'normal'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Loi Normale
              </button>
            </div>
          </div>

          {/* Slider n trials */}
          <div className="p-2.5 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-3">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Nombre d'épreuves n :</span>
              <span className="font-mono text-indigo-600 text-xs font-black">n = {n}</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Slider probability p */}
          <div className="p-2.5 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Probabilité de succès p :</span>
              <span className="font-mono text-indigo-600 text-xs font-black">p = {p.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.95"
              step="0.01"
              value={p}
              onChange={(e) => setP(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Real-time stats tables */}
          <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs space-y-1 font-mono leading-relaxed shadow-sm">
            <div className="font-mono font-bold text-primary block mb-1 text-[11px] uppercase">Indicateurs de Distribution :</div>
            <div className="flex justify-between">
              <span className="text-muted-text">Espérance E(X) [np] :</span>
              <span className="font-bold text-emerald-600">{mean.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Variance Var(X) [npq] :</span>
              <span className="font-bold text-emerald-600">{variance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Écart-Type σ :</span>
              <span className="font-bold text-emerald-600">{stdDev.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Dynamic educational comment */}
        <div className="mt-3.5 p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs leading-normal">
          <span className="font-bold font-mono text-primary block mb-0.5 text-[11px]">CONVERGENCE DES LIMITES :</span>
          <span className="text-muted-text text-[11px]">
            {compareMode === 'poisson' ? (
              <span>
                Quand {"$n \\to \\infty$"} et {"$p \\to 0$"} de sorte que les espérances se stabilisent, la Binomiale converge de manière remarquable vers la loi de Poisson de paramètre {"$\\lambda = np$ ="} {mean.toFixed(2)}.
              </span>
            ) : compareMode === 'normal' ? (
              <span>
                Selon le **Théorème de Moivre-Laplace**, lorsque {"$np \\ge 5$"} et {"$n(1-p) \\ge 5$"}, la distribution discrète Binomiale s'ajuste parfaitement à la courbe de Gauss continue {"$\\mathcal{N}(\\mu, \\sigma^2)$"}.
              </span>
            ) : (
              <span>
                Fais varier {"$p$"} de gauche à droite. Remarque comment la cloche devient parfaitement symétrique autour de {"$0.50$"} et s'étire selon le nombre d'essais {"$n$"} !
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
