import React, { useState } from 'react';

type FourierWaveShape = 'square' | 'sawtooth' | 'triangle';

export default function FourierReconstruction({ alt }: { alt?: string }) {
  const [waveShape, setWaveShape] = useState<FourierWaveShape>('square');
  const [harmonicsCount, setHarmonicsCount] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeOffset, setTimeOffset] = useState<number>(0);

  // Trigger continuous animation of offset if playing
  React.useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (isPlaying) {
        setTimeOffset((prev) => (prev + 0.04) % (2 * Math.PI));
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  // Exact ideal wave functions
  const getIdealWave = (t: number): number => {
    // period is 2 * PI
    const normalizedT = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    switch (waveShape) {
      case 'square':
        return normalizedT < Math.PI ? 1.0 : -1.0;
      case 'sawtooth':
        // goes from -1 to 1 linearly on [0, 2PI]
        return -1.0 + 2.0 * (normalizedT / (2 * Math.PI));
      case 'triangle':
        // goes from 0 up to 1, then down to -1, then up
        if (normalizedT < Math.PI / 2) {
          return (4 * normalizedT) / (2 * Math.PI);
        } else if (normalizedT < (3 * Math.PI) / 2) {
          return 2.0 - (4 * normalizedT) / (2 * Math.PI);
        } else {
          return -4.0 + (4 * normalizedT) / (2 * Math.PI);
        }
      default:
        return 0;
    }
  };

  // Fourier approximation
  const getFourierApprox = (t: number): number => {
    let sum = 0;
    switch (waveShape) {
      case 'square': {
        // s(t) = 4/pi * sum_k=0..N-1 [ sin((2k+1)t) / (2k+1) ]
        for (let k = 0; k < harmonicsCount; k++) {
          const n = 2 * k + 1;
          sum += Math.sin(n * t) / n;
        }
        return (4.0 / Math.PI) * sum;
      }
      case 'sawtooth': {
        // s(t) = 2/pi * sum_n=1..N [ (-1)^(n+1) * sin(nt) / n ]
        // We accumulate n harmonic ranks
        for (let n = 1; n <= harmonicsCount * 2; n++) {
          const sign = n % 2 === 1 ? 1 : -1;
          sum += (sign * Math.sin(n * t)) / n;
        }
        // normalized relative to match square heights
        return (2.0 / Math.PI) * sum * 1.5;
      }
      case 'triangle': {
        // s(t) = 8/pi^2 * sum_k=0..N-1 [ (-1)^k * sin((2k+1)t) / (2k+1)^2 ]
        for (let k = 0; k < harmonicsCount; k++) {
          const n = 2 * k + 1;
          const sign = k % 2 === 0 ? 1 : -1;
          sum += (sign * Math.sin(n * t)) / (n * n);
        }
        return (8.0 / (Math.PI * Math.PI)) * sum * 1.5;
      }
      default:
        return 0;
    }
  };

  // Dimensions
  const width = 450;
  const height = 180;
  const paddingX = 35;
  const paddingY = 25;

  const toSvgX = (t: number) => {
    // We display 2 full periods of [0, 4*PI]
    return paddingX + (t / (4 * Math.PI)) * (width - 2 * paddingX);
  };

  const toSvgY = (y: number) => {
    // Signal ranges approx [-1.5, 1.5]
    return height / 2 - (y / 1.7) * (height / 2 - paddingY);
  };

  // Path generation
  const steps = 140;
  const idealPoints: string[] = [];
  const approxPoints: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * (4 * Math.PI);
    const tAnimate = t - timeOffset;

    const yIdeal = getIdealWave(tAnimate);
    const yApprox = getFourierApprox(tAnimate);

    idealPoints.push(`${toSvgX(t)},${toSvgY(yIdeal)}`);
    approxPoints.push(`${toSvgX(t)},${toSvgY(yApprox)}`);
  }

  const idealPath = `M ${idealPoints.join(' L ')}`;
  const approxPath = `M ${approxPoints.join(' L ')}`;

  // Build spectrum array for visualization
  const getSpectrumHeights = () => {
    const list = [];
    const maxH = 15; // harmonic ranks
    if (waveShape === 'square') {
      for (let k = 0; k < maxH; k++) {
        const n = 2 * k + 1;
        const amplitude = 4.0 / (Math.PI * n);
        const active = k < harmonicsCount;
        list.push({ label: `${n}f`, value: amplitude, active });
      }
    } else if (waveShape === 'sawtooth') {
      for (let n = 1; n <= maxH; n++) {
        const amplitude = 2.0 / (Math.PI * n);
        const active = n <= harmonicsCount * 2;
        list.push({ label: `${n}f`, value: amplitude, active });
      }
    } else {
      // triangle
      for (let k = 0; k < maxH; k++) {
        const n = 2 * k + 1;
        const amplitude = 8.0 / (Math.PI * Math.PI * n * n);
        const active = k < harmonicsCount;
        list.push({ label: `${n}f`, value: amplitude, active });
      }
    }
    return list.slice(0, 10); // show top 10 frequencies
  };

  const spectrum = getSpectrumHeights();

  // Energy computed via Parseval approximation
  const getParsevalEnergy = (): number => {
    let sum = 0;
    if (waveShape === 'square') {
      for (let k = 0; k < harmonicsCount; k++) {
        const n = 2 * k + 1;
        const amp = 4.0 / (Math.PI * n);
        sum += (amp * amp) / 2; // mean square power
      }
      return sum;
    } else if (waveShape === 'sawtooth') {
      for (let n = 1; n <= harmonicsCount * 2; n++) {
        const amp = 2.0 / (Math.PI * n);
        sum += (amp * amp) / 2;
      }
      return sum;
    } else {
      for (let k = 0; k < harmonicsCount; k++) {
        const n = 2 * k + 1;
        const amp = 8.0 / (Math.PI * Math.PI * n * n);
        sum += (amp * amp) / 2;
      }
      return sum;
    }
  };

  const totalIdealEnergy = waveShape === 'square' ? 1.0 : waveShape === 'sawtooth' ? 0.333 : 0.083;
  const currentEnergyVal = getParsevalEnergy() * (waveShape === 'square' ? 2.0 : 4.5); // normalized scaled
  const energyPercentage = Math.min(100, Math.round((currentEnergyVal / totalIdealEnergy) * 100));

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Simulation Window */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          RECONSTRUCTION HARMONIQUE (OSCILLOSCOPE) :
        </h4>

        {/* Oscilloscope canvas */}
        <div className="relative">
          <svg
            width={width}
            height={height}
            className="border border-slate-200 dark:border-slate-800 bg-black rounded-2xl shadow-md overflow-hidden select-none"
          >
            {/* Oscilloscope Grid Background */}
            {Array.from({ length: 9 }).map((_, idx) => {
              const x = paddingX + (idx / 8) * (width - 2 * paddingX);
              return (
                <line
                  key={`line-ox-${idx}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={height}
                  stroke="#164e63"
                  strokeWidth="0.8"
                  strokeDasharray="2,5"
                  className="opacity-40"
                />
              );
            })}
            {Array.from({ length: 5 }).map((_, idx) => {
              const y = paddingY + (idx / 4) * (height - 2 * paddingY);
              return (
                <line
                  key={`line-oy-${idx}`}
                  x1={0}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="#164e63"
                  strokeWidth="0.8"
                  strokeDasharray="2,5"
                  className="opacity-40"
                />
              );
            })}

            {/* Timings Horizontal Center Line */}
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#0891b2" strokeWidth="1" className="opacity-60" />

            {/* Ideal theoretical Waveform outline */}
            <path d={idealPath} fill="none" stroke="#475569" strokeWidth="2.0" strokeDasharray="4,4" className="opacity-55" />

            {/* Glowing reconstructed wave Fourier sum */}
            <path d={approxPath} fill="none" stroke="#10b981" strokeWidth="2.8" className="drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]" />

            {/* Dynamic Status Badges in Canvas corners */}
            <text x={paddingX + 5} y={paddingY + 5} fill="#10b981" fontSize="9" className="font-mono">
              ★ HARMONIQUES SYNCHRONISÉS : {harmonicsCount}
            </text>
            <text x={width - paddingX - 5} y={paddingY + 5} fill="#64748b" fontSize="9" textAnchor="end" className="font-mono">
              CH1 : 500mV {isPlaying ? '● LIVE' : '|| PAUSED'}
            </text>
          </svg>
        </div>

        {/* Spectrum Analyzer Graph (Parseval & amplitudes) */}
        <div className="w-full mt-4">
          <h5 className="text-[10px] font-bold text-muted-text font-mono mb-2 text-center uppercase">
            ANALYSEUR DE SPECTRE DISCRET (COEFFICIENTS AMP AM) :
          </h5>
          <div className="flex h-16 justify-between items-end px-6 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-slate-850 rounded-xl pt-2">
            {spectrum.map((bar, idx) => {
              // Scale height relative to absolute max possible value (ideal 1st rank on square wave: 4/PI = 1.27)
              const pct = (bar.value / 1.3) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-4 rounded-t-sm transition-all duration-300 relative group flex justify-center" style={{ height: `${pct}%` }}>
                    <div
                      className={`w-full h-full rounded-t-sm ${
                        bar.active ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    />
                    {/* Tooltip on hovering frequency */}
                    <span className="absolute bottom-full mb-1 scale-0 group-hover:scale-100 bg-slate-850 text-white text-[8px] font-mono px-1 rounded-sm border pointer-events-none z-10">
                      {(bar.value * 10).toFixed(2)}v
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 mt-1 select-none">{bar.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-1 text-foreground">Analyse Spectrale Fourier</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Visualise comment des ondes trigonométriques fluides cumulées forment des signaux de transition brusque. C'est la base absolue des filtres et du décodage vibratoire numérique.
          </p>

          {/* Waveform Selector */}
          <div className="mb-4">
            <label className="text-xs font-bold block mb-1">Profil du signal périodique :</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setWaveShape('square')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  waveShape === 'square' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Créneau
              </button>
              <button
                onClick={() => setWaveShape('sawtooth')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  waveShape === 'sawtooth' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Dents de scie
              </button>
              <button
                onClick={() => setWaveShape('triangle')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  waveShape === 'triangle' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
                }`}
              >
                Triangle
              </button>
            </div>
          </div>

          {/* Summation Harmonics slider */}
          <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl mb-3">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Nombre de rangs harmoniques :</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">k = {harmonicsCount}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={harmonicsCount}
              onChange={(e) => setHarmonicsCount(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between font-mono text-[8px] text-muted-text mt-1.5">
              <span>Sinus pur (1)</span>
              <span>Reconstruction fine (20)</span>
            </div>
          </div>

          {/* Play / pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
              isPlaying ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-450' : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-450'
            }`}
          >
            {isPlaying ? (
              <>
                <svg className="w-3 h-3 fill-current animate-pulse" viewBox="0 0 24 24"><rect x="4" y="4" width="4" height="16"/><rect x="16" y="4" width="4" height="16"/></svg>
                Mettre sur Pause l'Onde
              </>
            ) : (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Lancer l'Animation
              </>
            )}
          </button>
        </div>

        {/* Parseval energy progress bar */}
        <div className="mt-4 p-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl">
          <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-primary mb-1">
            <span>Puissance acquise (Parseval) :</span>
            <span className="text-emerald-600 dark:text-emerald-450">{energyPercentage}%</span>
          </div>
          {/* Progress bar container */}
          <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden border">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${energyPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-text mt-1.5 leading-snug">
            {waveShape === 'square' && 'Un signal carré s\'ajuste par harmoniques impaires. On atteint 90%+ d\'énergie dès k=3.'}
            {waveShape === 'sawtooth' && 'Les dents de scie réclament l\'intégralité des multiples (harmoniques paires et impaires) pour adoucir le plan incliné.'}
            {waveShape === 'triangle' && 'La décroissance spectrale est exponentielle quadratique (1/n²). Un seul harmonique suffit à capter 99% de l\'énergie !'}
          </p>
        </div>
      </div>
    </div>
  );
}
