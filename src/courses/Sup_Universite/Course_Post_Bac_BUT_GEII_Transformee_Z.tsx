import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, FormulaBox, 
  Quiz, Flashcard, InteractiveExercise, InteractiveChecklist, BentoGrid, BentoCard 
} from '../../components/SharedUI';
import { Sliders, Activity, Award, Compass, RefreshCw, Play, Layers, Sparkles, AlertTriangle } from 'lucide-react';

// Biquad filter simulation for interactive playground
const PoleZeroVisualizer: React.FC = () => {
  // Input parameters
  const [poleR, setPoleR] = useState<number>(0.7);
  const [poleTheta, setPoleTheta] = useState<number>(45); // degrees
  const [zeroR, setZeroR] = useState<number>(1.0);
  const [zeroTheta, setZeroTheta] = useState<number>(120); // degrees
  const [inputType, setInputType] = useState<'impulse' | 'step'>('impulse');

  // Convert angles to radians
  const pRad = (poleTheta * Math.PI) / 180;
  const zRad = (zeroTheta * Math.PI) / 180;

  // Pole/zero complex coordinates
  const poles = useMemo(() => {
    return [
      { re: poleR * Math.cos(pRad), im: poleR * Math.sin(pRad) },
      { re: poleR * Math.cos(-pRad), im: poleR * Math.sin(-pRad) }
    ];
  }, [poleR, pRad]);

  const zeros = useMemo(() => {
    return [
      { re: zeroR * Math.cos(zRad), im: zeroR * Math.sin(zRad) },
      { re: zeroR * Math.cos(-zRad), im: zeroR * Math.sin(-zRad) }
    ];
  }, [zeroR, zRad]);

  const isStable = poleR < 1.0;

  // Filter coefficients: H(z) = (z^2 + b1 z + b2) / (z^2 + a1 z + a2)
  // Which corresponds to difference equation: y[n] = x[n] + b1 x[n-1] + b2 x[n-2] - a1 y[n-1] - a2 y[n-2]
  const filterCoefficients = useMemo(() => {
    const a1 = -2 * poleR * Math.cos(pRad);
    const a2 = poleR * poleR;
    const b1 = -2 * zeroR * Math.cos(zRad);
    const b2 = zeroR * zeroR;
    return { a1, a2, b1, b2 };
  }, [poleR, pRad, zeroR, zRad]);

  // Compute Frequency Response on unit circle: z = e^{j omega}
  const frequencyResponse = useMemo(() => {
    const points = [];
    const N = 64; // resolution
    const { a1, a2, b1, b2 } = filterCoefficients;

    for (let i = 0; i <= N; i++) {
      const omega = (i / N) * Math.PI; // from 0 to Pi (Nyquist frequency)
      
      // Numerator: e^{j 2 omega} + b1 e^{j omega} + b2
      const numRe = Math.cos(2 * omega) + b1 * Math.cos(omega) + b2;
      const numIm = Math.sin(2 * omega) + b1 * Math.sin(omega);
      
      // Denominator: e^{j 2 omega} + a1 e^{j omega} + a2
      const denRe = Math.cos(2 * omega) + a1 * Math.cos(omega) + a2;
      const denIm = Math.sin(2 * omega) + a1 * Math.sin(omega);

      const numMagSq = numRe * numRe + numIm * numIm;
      const denMagSq = denRe * denRe + denIm * denIm;

      // Handle division by zero
      const magnitude = denMagSq > 1e-9 ? Math.sqrt(numMagSq / denMagSq) : 10;
      points.push({ omega, magnitude });
    }
    return points;
  }, [filterCoefficients]);

  // Max magnitude for scaling graph
  const maxMag = useMemo(() => {
    const vals = frequencyResponse.map(p => p.magnitude);
    const max = Math.max(...vals, 1);
    return max > 10 ? 10 : max; // clamp at 10 for drawing nicely
  }, [frequencyResponse]);

  // Simulated Time Domain Response: stems of y[n]
  const timeResponse = useMemo(() => {
    const steps = 30; // plot 30 points
    const { a1, a2, b1, b2 } = filterCoefficients;
    const x = new Array(steps).fill(0);
    const y = new Array(steps).fill(0);

    // Set input signal
    if (inputType === 'impulse') {
      x[0] = 1.0;
    } else {
      // Step input
      for (let i = 0; i < steps; i++) x[i] = 1.0;
    }

    // Difference equation recurrence loop
    for (let n = 0; n < steps; n++) {
      const x_0 = x[n];
      const x_1 = n >= 1 ? x[n - 1] : 0;
      const x_2 = n >= 2 ? x[n - 2] : 0;
      const y_1 = n >= 1 ? y[n - 1] : 0;
      const y_2 = n >= 2 ? y[n - 2] : 0;

      y[n] = x_0 + b1 * x_1 + b2 * x_2 - a1 * y_1 - a2 * y_2;

      // Unstable safeguard: if explodes, clamp values
      if (isNaN(y[n]) || Math.abs(y[n]) > 100) {
        y[n] = y[n] > 0 ? 100 : -100;
      }
    }

    return y.map((value, n) => ({ n, value }));
  }, [filterCoefficients, inputType]);

  const maxTimeValue = useMemo(() => {
    const absVals = timeResponse.map(r => Math.abs(r.value));
    const max = Math.max(...absVals, 1);
    return max;
  }, [timeResponse]);

  // SVG dimensions for Z-plane graph
  const zSize = 200;
  const zCenter = zSize / 2;
  const zScale = 70; // 70px per unit

  const toZCoordX = (val: number) => zCenter + val * zScale;
  const toZCoordY = (val: number) => zCenter - val * zScale;

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-5xl mx-auto my-8">
      {/* Visualizer Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-150 dark:border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={20} />
            Laboratoire de Conception de Filtres Numériques (Biquad)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Manipulez les pôles et les zéros conjugués pour observer la réponse harmonique et temporelle.
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex gap-2">
          <button
            onClick={() => setInputType('impulse')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              inputType === 'impulse'
                ? 'bg-indigo-600 border-indigo-650 text-white'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350'
            }`}
          >
            Réponse Impulsionnelle {"$h[n]$"}
          </button>
          <button
            onClick={() => setInputType('step')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              inputType === 'step'
                ? 'bg-indigo-600 border-indigo-650 text-white'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350'
            }`}
          >
            Réponse Échelon {"$s[n]$"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Sliders size={14} className="text-indigo-600" /> Paramètres d'Entrée
          </h4>

          {/* Stable warning banner if pole R >= 1 */}
          {!isStable ? (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-900/40 text-xs flex items-start gap-1.5">
              <AlertTriangle className="text-rose-500 mt-0.5 shrink-0" size={14} />
              <div>
                <span className="font-bold">Système Instable !</span> Les pôles sont à l'extérieur ou sur le cercle unité ({"$r \\ge 1$"}). Le filtre diverge à l'infini.
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/25 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-150 dark:border-emerald-900/30 text-xs flex items-start gap-1.5">
              <Award className="text-emerald-500 mt-0.5 shrink-0" size={14} />
              <div>
                <span className="font-bold">Filtre Stable</span> Tous les pôles sont strictement confinés à l'intérieur du cercle unité ({"$r < 1$"}). Les oscillations temporelles s'amortissent.
              </div>
            </div>
          )}

          {/* Sliders container */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-150 dark:border-slate-800/80 rounded-2xl space-y-4">
            {/* Pole Radius */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Module des pôles ({"$r$"}) :</span>
                <span className="font-mono text-indigo-600">{poleR.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.1"
                step="0.02"
                value={poleR}
                onChange={(e) => setPoleR(parseFloat(e.target.value))}
                className="w-full h-1.5 accent-indigo-600 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>0.00 (Centre)</span>
                <span>1.00 (Limite)</span>
                <span>1.10 (Instable)</span>
              </div>
            </div>

            {/* Pole Angle */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Angle des pôles ({"$\\theta$"}) :</span>
                <span className="font-mono text-indigo-600">{poleTheta}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="3"
                value={poleTheta}
                onChange={(e) => setPoleTheta(parseInt(e.target.value))}
                className="w-full h-1.5 accent-indigo-600 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>0° (Basses Freq)</span>
                <span>90° (Moyennes)</span>
                <span>180° (Hautes)</span>
              </div>
            </div>

            {/* Zero Radius */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Module des zéros ({"$R$"}) :</span>
                <span className="font-mono text-rose-600">{zeroR.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="2.0"
                step="0.05"
                value={zeroR}
                onChange={(e) => setZeroR(parseFloat(e.target.value))}
                className="w-full h-1.5 accent-rose-500 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>0.00</span>
                <span>1.00 (Cercle Unité)</span>
                <span>2.00 (Extérieur)</span>
              </div>
            </div>

            {/* Zero Angle */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Angle des zéros ({"$\\phi$"}) :</span>
                <span className="font-mono text-rose-600">{zeroTheta}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="3"
                value={zeroTheta}
                onChange={(e) => setZeroTheta(parseInt(e.target.value))}
                className="w-full h-1.5 accent-rose-500 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>0° (Atténue Bas)</span>
                <span>90° (Moyen)</span>
                <span>180° (Atténue Haut)</span>
              </div>
            </div>

            <button
              onClick={() => {
                setPoleR(0.7);
                setPoleTheta(45);
                setZeroR(1.0);
                setZeroTheta(120);
                setInputType('impulse');
              }}
              className="w-full text-xs font-bold py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={12} /> Réinitialiser le filtre
            </button>
          </div>

          {/* Dynamic Difference Equation coefficients readout */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-900 font-mono text-[10px] space-y-1 text-slate-300 shadow-inner">
            <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wide">Équation aux Différences Récurrente :</span>
            <div className="text-green-400 font-bold pt-1 text-xs">
              y[n] = x[n] 
              {filterCoefficients.b1 >= 0 ? ` + ${filterCoefficients.b1.toFixed(3)}` : ` - ${Math.abs(filterCoefficients.b1).toFixed(3)}`} x[n-1] 
              {filterCoefficients.b2 >= 0 ? ` + ${filterCoefficients.b2.toFixed(3)}` : ` - ${Math.abs(filterCoefficients.b2).toFixed(3)}`} x[n-2]
            </div>
            <div className="text-indigo-400 font-bold text-xs">
              {"       "}
              {filterCoefficients.a1 >= 0 ? ` - ${filterCoefficients.a1.toFixed(3)}` : ` + ${Math.abs(filterCoefficients.a1).toFixed(3)}`} y[n-1] 
              {filterCoefficients.a2 >= 0 ? ` - ${filterCoefficients.a2.toFixed(3)}` : ` + ${Math.abs(filterCoefficients.a2).toFixed(3)}`} y[n-2]
            </div>
            <div className="text-slate-500 text-[9px] pt-1 border-t border-slate-850 mt-2">
              Coefficients : <br />
              {"$a_1$"} = {filterCoefficients.a1.toFixed(4)}, {"$a_2$"} = {filterCoefficients.a2.toFixed(4)}<br />
              {"$b_1$"} = {filterCoefficients.b1.toFixed(4)}, {"$b_2$"} = {filterCoefficients.b2.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Graphs Area Column (8 cols on lg) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          
          {/* Graph 1: Z-Plane (Poles/Zeros) */}
          <div className="bg-slate-950 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden border border-slate-900 min-h-[260px]">
            <span className="absolute top-2.5 left-4 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              🟢 Plan d'Argand en Z
            </span>

            <div className="w-full flex-1 flex items-center justify-center py-2">
              <svg viewBox={`0 0 ${zSize} ${zSize}`} className="w-full max-w-[210px] aspect-square overflow-visible">
                {/* Grid Axes */}
                <line x1="0" y1={zCenter} x2={zSize} y2={zCenter} className="stroke-slate-800" strokeWidth="1" />
                <line x1={zCenter} y1="0" x2={zCenter} y2={zSize} className="stroke-slate-800" strokeWidth="1" />
                
                {/* Grid markings */}
                {[-1.5, -1.0, -0.5, 0.5, 1.0, 1.5].map((val) => (
                  <g key={`grid-mark-${val}`}>
                    <line x1={toZCoordX(val)} y1={zCenter-3} x2={toZCoordX(val)} y2={zCenter+3} className="stroke-slate-700" strokeWidth="1" />
                    <line x1={zCenter-3} y1={toZCoordY(val)} x2={zCenter+3} y2={toZCoordY(val)} className="stroke-slate-700" strokeWidth="1" />
                    {val === 1.0 && <text x={toZCoordX(val)+2} y={zCenter+11} className="fill-slate-500 text-[8px] font-mono">1</text>}
                    {val === -1.0 && <text x={toZCoordX(val)-9} y={zCenter+11} className="fill-slate-500 text-[8px] font-mono">-1</text>}
                  </g>
                ))}

                {/* Unit Circle |z| = 1 */}
                <circle 
                  cx={zCenter} 
                  cy={zCenter} 
                  r={zScale} 
                  className="fill-none stroke-slate-550 stroke-dasharray-[2,2]" 
                  strokeWidth="1.2" 
                  strokeDasharray="2,2" 
                />

                {/* Plot Zeros (circles) */}
                {zeros.map((z, idx) => (
                  <g key={`zero-plot-${idx}`}>
                    <circle
                      cx={toZCoordX(z.re)}
                      cy={toZCoordY(z.im)}
                      r="4.5"
                      className="fill-none stroke-rose-500 hover:fill-rose-500/20 cursor-pointer transition-colors"
                      strokeWidth="2"
                    />
                    {/* Interactive trace connecting zero to origin */}
                    <line x1={zCenter} y1={zCenter} x2={toZCoordX(z.re)} y2={toZCoordY(z.im)} className="stroke-rose-550/20" strokeWidth="0.8" />
                  </g>
                ))}

                {/* Plot Poles (X crosses) */}
                {poles.map((p, idx) => {
                  const x = toZCoordX(p.re);
                  const y = toZCoordY(p.im);
                  return (
                    <g key={`pole-plot-${idx}`}>
                      {/* X lines */}
                      <line x1={x - 4.5} y1={y - 4.5} x2={x + 4.5} y2={y + 4.5} className="stroke-indigo-400" strokeWidth="2.2" />
                      <line x1={x + 4.5} y1={y - 4.5} x2={x - 4.5} y2={y + 4.5} className="stroke-indigo-400" strokeWidth="2.2" />
                      {/* Radius trace */}
                      <line x1={zCenter} y1={zCenter} x2={x} y2={y} className="stroke-indigo-400/20" strokeWidth="0.8" />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex gap-4 text-[8px] font-mono text-slate-400 pb-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 border border-rose-500 rounded-full"></span> {"Zéros ($z_0$)"}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-indigo-400 font-bold font-sans">✕</span> {"Pôles ($p_0$)"}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 border-t border-dashed border-slate-600"></span> Cercle Unité
              </span>
            </div>
          </div>

          {/* Graph 2: Frequency Response */}
          <div className="bg-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-slate-900 min-h-[260px]">
            <span className="absolute top-2.5 left-4 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              {"📈 Réponse Harmonique $|H(e^{j\\omega})|$"}
            </span>

            {/* SVG plotting curve */}
            <div className="w-full flex-1 flex py-6 items-center">
              <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                {/* Grid horizontal markers */}
                <line x1="0" y1="110" x2="200" y2="110" className="stroke-slate-800" strokeWidth="1" />
                <line x1="0" y1="60" x2="200" y2="60" className="stroke-slate-850" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="0" y1="10" x2="200" y2="10" className="stroke-slate-850" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* Convert our response frequency array to SVG coordinates */}
                <polyline
                  points={frequencyResponse.map(pt => {
                    const x = (pt.omega / Math.PI) * 200;
                    // Scale magnitude: from y=110 (mag 0) to y=10 (mag maxMag)
                    const normalizedY = maxMag > 0 
                      ? 110 - (pt.magnitude / maxMag) * 100 
                      : 110;
                    return `${x},${Math.max(10, Math.min(110, normalizedY))}`;
                  }).join(' ')}
                  className="fill-none stroke-indigo-500"
                  strokeWidth="2.2"
                />

                {/* X labels at 0, f_s/4, f_s/2 */}
                <text x="0" y="119" className="fill-slate-500 text-[7px] font-mono">0</text>
                <text x="90" y="119" className="fill-slate-500 text-[7px] font-mono">f_s/4</text>
                <text x="175" y="119" className="fill-slate-500 text-[7px] font-mono">f_s/2 (Nyquist)</text>

                {/* Y max label */}
                <text x="2" y="8" className="fill-slate-450 text-[6px] font-mono">Max: {maxMag.toFixed(1)}</text>
              </svg>
            </div>

            <p className="text-[9px] leading-relaxed text-slate-400 text-center font-mono">
              Notez comment les pôles proches du cercle créent un pic de résonance, tandis que les zéros étouffent la fréquence équivalente.
            </p>
          </div>

          {/* Graph 3: Temporal Response (Stem plot) spans both columns if large, or single */}
          <div className="bg-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-slate-900 md:col-span-2 min-h-[220px]">
            <span className="absolute top-2.5 left-4 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              {"📊 Chronogramme Temporel Discret (Réponse Temporelle $y[n]$)"}
            </span>

            <div className="w-full flex-1 flex items-center pt-8 py-2">
              <svg viewBox="0 0 450 140" className="w-full h-full overflow-visible">
                {/* Baseline reference (Zero) */}
                <line x1="0" y1="70" x2="450" y2="70" className="stroke-slate-700" strokeWidth="1" />
                <line x1="0" y1="15" x2="450" y2="15" className="stroke-slate-800" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="0" y1="125" x2="450" y2="125" className="stroke-slate-800" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* Draw stems */}
                {timeResponse.map((pt) => {
                  const x = (pt.n / 29) * 440 + 5;
                  // Center is y=70, scale so that max value is 55px offset
                  const offset = maxTimeValue > 0 ? (pt.value / maxTimeValue) * 55 : 0;
                  const y = 70 - offset;

                  return (
                    <g key={`stem-${pt.n}`}>
                      {/* Vertical stick */}
                      <line x1={x} y1="70" x2={x} y2={y} className="stroke-indigo-400" strokeWidth="1.5" />
                      {/* Head circle */}
                      <circle cx={x} cy={y} r="3" className="fill-indigo-450 stroke-slate-950" strokeWidth="0.9" />
                      {/* Index small labels */}
                      {pt.n % 5 === 0 && (
                        <text x={x - 3} y="79" className="fill-slate-500 text-[6px] font-mono">{pt.n}</text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-2">
              <span>Échantillon $n$</span>
              <span>Valeur Max: {maxTimeValue.toFixed(4)}</span>
              <span>Signal discret temporel</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Course_Post_Bac_BUT_GEII_Transformee_Z: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="GEII-MATH-Z"
        title="Transformée en Z et Filtres Numériques"
        subtitle="Séquences discrètes, pôles-zéros, fonctions de transfert et stabilité des systèmes numériques en génie électrique."
        duration="1h 45"
      />

      <InfoBlock type="info" title="Pourquoi la Transformée en Z est le pilier du GEII ?">
        Dans les systèmes intégrés modernes, l'introduction de microcontrôleurs et de processeurs de signal discrets (DSP) a remplacé presque tous les filtres analogiques passifs (R, L, C). L'étude des signaux discrets échantillonnés à intervalle fixe ne pouvant plus être traitée par la transformation de Laplace, la transformée en Z s'impose comme l'outil algébrique universel pour concevoir, simuler et stabiliser les systèmes asservis et filtres discrets en temps réel.
      </InfoBlock>

      <Section title="1. Définition Mathématique de la Transformée en Z" icon="🎚️" color="indigo">
        <p className="mb-4 text-sm leading-relaxed">
          Soit une séquence discrète {"$x[n]$"} définie pour {"$n \\in \\mathbb{Z}$"}. La transformée en Z bilatérale est convertie par la somme de série infinie convergente suivante :
        </p>

        <FormulaBox 
          title="Expression Algébrique de la Transformée en Z (X(z))" 
          math={"\\mathcal{Z}\\{x[n]\\} = X(z) = \\sum_{n=-\\infty}^{+\\infty} x[n] z^{-n}"} 
        />

        <p className="my-4 text-sm leading-relaxed">
          Où {"$z$"} est une variable complexe tridimensionnelle qui peut être représentée sous forme polaire : {"$z = r e^{j\\omega}$"}. La série converge uniquement pour certaines valeurs de {"$z$"} formant une région du plan appelée la <strong>Région de Convergence (ROC)</strong>.
        </p>

        <BentoGrid>
          <BentoCard title="L'Échelon Unitaire Discret" icon={<Layers className="text-indigo-500" size={18} />} color="indigo">
            Pour l'échelon discret {"$u[n]$"} (valant 1 pour {"$n \\ge 0$"}), l'expression donne :
            <div className="font-mono text-center text-[10px] mt-2 text-indigo-200">
              {"$U(z) = \\sum_{n=0}^{\\infty} z^{-n} = \\frac{1}{1-z^{-1}} = \\frac{z}{z-1}$"}
            </div>
            La série converge pour {"$|z| > 1$"}.
          </BentoCard>

          <BentoCard title="Le Retard Temporel Discret" icon={<Compass className="text-amber-500" size={18} />} color="amber">
            Retarder un signal de {"$k$"} échantillons équivaut magiquement à une simple multiplication par {"$z^{-k}$"} :
            <div className="font-mono text-center text-[10px] mt-2 text-amber-200">
              {"$\\mathcal{Z}\\{x[n-k]\\} = z^{-k} X(z)$"}
            </div>
            C'est le théorème du retard, analogue au glissement temporel de Laplace.
          </BentoCard>

          <BentoCard title="La Région de Convergence (ROC)" icon={<Activity className="text-rose-500" size={18} />} color="rose">
            La convergence d'une série géométrique impose des bandes de valeurs strictement définies. Pour une suite causale, la ROC s'étend de l'extérieur du cercle passant par le pôle le plus éloigné jusqu'à l'infini.
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section title="2. Équation aux Différences et Fonction de Transfert" icon="⚡" color="slate">
        <p className="mb-4 text-sm leading-relaxed">
          Un filtre numérique linéaire et invariant dans le temps (système LTI) traite des échantillons à l'aide d'une récurrence temporelle discrète appelée <strong>équation aux différences</strong> :
        </p>

        <FormulaBox 
          title="Équation Temporelle Générique (Filtre IIR)" 
          math={"y[n] = \\sum_{i=0}^{M} b_i x[n-i] - \\sum_{i=1}^{N} a_i y[n-i]"} 
        />

        <p className="my-4 text-sm leading-relaxed">
          En appliquant le théorème de linéarité et du retard temporel de la transformée en Z, nous pouvons transformer cette récurrence différentielle complexe en un produit purement algébrique rationnel de fractions :
        </p>

        <FormulaBox 
          title="Fonction de Transfert H(z)" 
          math={"H(z) = \\frac{Y(z)}{X(z)} = \\frac{b_0 + b_1 z^{-1} + b_2 z^{-2} + \\dots + b_M z^{-M}}{1 + a_1 z^{-1} + a_2 z^{-2} + \\dots + a_N z^{-N}}"} 
        />

        <TipBanner type="info" title="Filtres FIR (RIF) vs IIR (RII)">
          Un filtre est dit à <strong>Réponse Impulsionnelle Finie (FIR)</strong> si tous les coefficients de bouclage {"$a_i$"} s'annulent. La sortie ne dépend alors que des entrées passées, éliminant tout risque d'oscillations infinies instables. À l'inverse, l'introduction de pôles d'un filtre à <strong>Réponse Impulsionnelle Infinie (IIR)</strong> apporte une bien plus grande sélectivité fréquentielle pour un coût matériel minime, mais introduit un risque majeur d'instabilité.
        </TipBanner>
      </Section>

      <Section title="3. Stabilité des Systèmes et Positionnement des Pôles" icon="📊" color="indigo">
        <p className="mb-4 text-sm leading-relaxed">
          De la même manière que la stabilité continue (Laplace) exige des pôles dans le demi-plan gauche de la droite complexe, la stabilité des systèmes numériques discrets obéit à une règle géométrique très simple :
        </p>

        <div className="bg-slate-50 dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-3 my-6">
          <h4 className="text-md font-bold text-slate-850 dark:text-white flex items-center gap-2">
            🧭 Le Théorème Fondamental de Stabilité en Z
          </h4>
          <p className="text-sm leading-relaxed">
            Un système LTI discret causal est stable (au sens BIBO - Bounded-Input Bounded-Output) si et seulement si <strong>tous les pôles de sa fonction de transfert {"$H(z)$"} sont strictement confinés à l'intérieur du cercle unité</strong> du plan complexe :
          </p>
          <div className="font-mono text-center text-xs text-indigo-600 bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
            {"\\text{Filtre stable} \\iff |p_i| < 1, \\quad \\forall i \\in \\{1, 2, \\dots, N\\}"}
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            - Si un pôle vérifie {"$|p| = 1$"}, le système présente des oscillations entretenues instables au sens strict (résonateur marginal).<br />
            - Si un seul pôle franchit la frontière {"$|p| > 1$"}, l'amplitude de la sortie temporellement diverge vers l'infini géométriquement.
          </p>
        </div>
      </Section>

      <Section title="4. Laboratoire Interactif de Tracé Harmonique" icon="🔬" color="indigo">
        <PoleZeroVisualizer />
      </Section>

      <Section title="5. Code Algorithmique en C/Python pour Processeur DSP" icon="🐍" color="indigo">
        <p className="mb-4 text-sm leading-relaxed">
          En ingénierie GEII, concevoir un filtre simulé est inutile sans son implémentation efficace d'échantillonnage direct. Voici un code Python propre simulant le traitement temps réel d'une chaîne de mesures perturbée par un filtre biquad stable :
        </p>

        <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl border border-slate-805 font-mono text-xs overflow-x-auto space-y-2 relative shadow-inner">
          <div className="absolute top-3 right-4 bg-slate-900 px-3 py-1 rounded border border-slate-800 text-[10px] text-slate-450 font-bold">
            biquad_filtering.py
          </div>
          <p className="text-slate-500 text-[10px] uppercase font-bold mb-2"># Structure Directe II de filtre Biquad en temps réel</p>
          <pre className="text-indigo-200 leading-relaxed">
{`class RealTimeBiquadFilter:
    def __init__(self, b0, b1, b2, a1, a2):
        self.b0, self.b1, self.b2 = b0, b1, b2
        self.a1, self.a2 = a1, a2
        # Éléments de mémoire temporelle des registres
        self.x1 = 0.0
        self.x2 = 0.0
        self.y1 = 0.0
        self.y2 = 0.0

    def process(self, x_current):
        # Équation aux différences récurrente
        y_current = (self.b0 * x_current + 
                     self.b1 * self.x1 + 
                     self.b2 * self.x2 - 
                     self.a1 * self.y1 - 
                     self.a2 * self.y2)
        
        # Décalage de l'historique mémoire
        self.x2 = self.x1
        self.x1 = x_current
        self.y2 = self.y1
        self.y1 = y_current
        
        return y_current

# Exemple d'init : Passe-Bas Résonant stable (r = 0.9, theta = 45°)
filter_instance = RealTimeBiquadFilter(
    b0=1.0, b1=0.2, b2=1.0, 
    a1=-1.2728,  # -2 * 0.9 * cos(45)
    a2=0.8100    # 0.9^2
)`}
          </pre>
        </div>
      </Section>

      <Section title="🧠 Flashcards : Théories Temporelles et Discrètes" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous sur les pôles complexes discrets et la région de convergence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la condition nécessaire et suffisante de stabilité d&apos;un filtre discret via ses pôles ?</>}
            back={<>Tous les pôles du système doivent être situés <strong>strictement à l&apos;intérieur du cercle unité</strong> du plan complexe Z (c&apos;est-à-dire un module inférieur à 1 : {"$|p_k| < 1$"}).</>}
          />
          <Flashcard 
            front={<>Que représente physiquement le multiplicateur {"$z^{-1}$"} dans le domaine discret temporel ?</>}
            back={<>Il modélise un <strong>retard pur d&apos;une période d&apos;échantillonnage</strong>, se traduisant algorithmiquement par un registre mémoire de décalage {"$x[n-1]$"}.</>}
          />
        </div>
      </Section>

      <Section title="6. Exercice Théorique d&apos;Examen" icon="⚡" color="amber">
        <InteractiveExercise
          title="Exercice Résolu : Détermination d'ordre et de stabilité"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>On donne la réponse impulsionnelle d'un capteur discret défini par :</p>
              {"$$h[n] = \\left( \\frac{1}{2} \\right)^n u[n] + 3^n u[-n-1]$$"}
              <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                <li>Exprimer sa transformée en Z sous forme analytique fractionnaire rationnelle.</li>
                <li>Déterminer sa Région de Convergence (ROC) et en déduire l'étude de stabilité associée.</li>
              </ol>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Séparation des deux branches et calcul de la somme</p>
              <p>On applique la définition terme à terme de la transformée en Z :</p>
              {"$$H(z) = \\sum_{n=-\\infty}^{+\\infty} h[n] z^{-n} = \\sum_{n=0}^{\\infty} \\left(\\frac{1}{2}\\right)^n z^{-n} + \\sum_{n=-\\infty}^{-1} 3^n z^{-n}$$"}
              <p>La première somme est la transformée causale classique :</p>
              {"$$H_1(z) = \\frac{1}{1 - \\frac{1}{2}z^{-1}} = \\frac{z}{z - 1/2} \\quad \\text{avec convergences pour } |z| > \\frac{1}{2}$$"}
              <p>La deuxième somme (anti-causale) se réorganise en posant {"$m = -n$"} :</p>
              {"$$\\sum_{m=1}^{\\infty} 3^{-m} z^m = \\sum_{m=1}^{\\infty} \\left( \\frac{z}{3} \\right)^m = \\frac{z/3}{1 - z/3} = \\frac{z}{3-z} = -\\frac{z}{z-3}$$"}
              <p>Cette somme géométrique converge uniquement si {"$|\\frac{z}{3}| < 1 \\implies |z| < 3$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 text-xs text-slate-800 dark:text-emerald-110">
              <p className="font-bold text-emerald-900 dark:text-emerald-550 mb-1">Étape 2 : Assemblage rationnel et ROC</p>
              <p>La transformée totale s'exprime comme l'intersection algébrique des deux parties :</p>
              {"$$H(z) = \\frac{z}{z - 1/2} - \\frac{z}{z-3}$$"}
              {"$$H(z) = z \\left[ \\frac{z - 3 - (z - 1/2)}{(z - 1/2)(z - 3)} \\right] = \\frac{-2.5 z}{(z - 1/2)(z - 3)}$$"}
              <p><strong>Région de Convergence (ROC) :</strong> L'intersection des deux domaines de convergence nous donne une couronne fermée :</p>
              {"$$\\text{ROC} = \\left\\{ z \\in \\mathbb{C} \\quad \\text{tel que } \\frac{1}{2} < |z| < 3 \\right\\}$$"}
              <p><strong>Conclusion sur la Stabilité :</strong> Comme le cercle unité de module 1 ({"$|z| = 1$"}) est strictement contenu à l'intérieur de cette couronne ROC (puisque {"$0.5 < 1 < 3$"}), les séries convergent de manière absolue sur cette frontière harmonique. Le système est donc <strong>parfaitement stable (BIBO)</strong> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="7. Contrôle des Connaissances" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on retarde un signal discret de 3 périodes d'échantillonnage, comment affecte-t-on sa représentation dans le plan en Z ?",
              options: [
                "On retranche 3 à l'équation rationnelle.",
                "On multiplie l'expression harmonique par z⁻³.",
                "On divise la variable complexe par 3."
              ],
              correctAnswer: 1,
              explanation: "Le théorème du retard énonce classiquement que retarder une séquence discrète de k échantillons se traduit algébriquement dans le domaine complexe par une simple multiplication directe par z⁻ᵏ."
            },
            {
              question: "Laquelle de ces affirmations garantit la stabilité BIBO absolue d'un filtre IIR causal ?",
              options: [
                "Tous les zéros doivent être à l'intérieur du cercle unité.",
                "Au moins un pôle doit se trouver à l'origine absolue (z = 0).",
                "Tous ses pôles complexes doivent avoir un module strictement inférieur à 1."
              ],
              correctAnswer: 2,
              explanation: "Pour qu'un système causal reste stable, la réponse impulsionnelle doit s'éteindre de façon asymptotique. Ce comportement géométrique nécessite absolument que tous les pôles complexes du dénominateur résident strictement à l'intérieur du cercle de rayon 1 (cercle unité)."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Connaître l'expression discrète bilatérale de la transformée en Z.",
            "Visualiser et identifier les pôles et zéros conjugués d'une fonction de transfert rationnelle.",
            "Formuler une équation récurrente pratique à partir de sa fonction de transfert associée.",
            "Vérifier géométriquement la stabilité d'un système à l'aide de la position du pôle dominant."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+45 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_BUT_GEII_Transformee_Z;
