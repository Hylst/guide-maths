import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Activity, HelpCircle, Sparkles, Database } from 'lucide-react';

interface MathGrapherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FunctionPreset = 'quadratic' | 'trigonometric' | 'exponential' | 'logarithmic' | 'inverse';

export default function MathGrapherModal({ isOpen, onClose }: MathGrapherModalProps) {
  const [preset, setPreset] = useState<FunctionPreset>('quadratic');
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(0);
  const [coeffC, setCoeffC] = useState<number>(0);

  // Math coordinates limits & dimensions
  const width = 360;
  const height = 260;
  const scaleX = 30; // pixels per unit
  const scaleY = 30; // pixels per unit
  const centerX = width / 2;
  const centerY = height / 2;

  // Compute the function values
  const pointsPath = useMemo(() => {
    const points: string[] = [];
    const step = 0.05;
    
    // Bounds in math units
    const minX = -centerX / scaleX;
    const maxX = centerX / scaleX;

    for (let x = minX; x <= maxX; x += step) {
      let y = 0;
      let valid = true;

      // Calculate y based on the math formula
      switch (preset) {
        case 'quadratic':
          // f(x) = a*x^2 + b*x + c
          y = coeffA * x * x + coeffB * x + coeffC;
          break;
        case 'trigonometric':
          // f(x) = a * sin(b*x) + c ; clamp b to avoid extreme frequencies
          y = coeffA * Math.sin((coeffB || 1) * x) + coeffC;
          break;
        case 'exponential':
          // f(x) = a * e^(b*x) + c
          try {
            y = coeffA * Math.exp(coeffB * x) + coeffC;
          } catch {
            valid = false;
          }
          break;
        case 'logarithmic':
          // f(x) = a * ln(x) + c
          if (x > 0.01) {
            y = coeffA * Math.log(x) + coeffC;
          } else {
            valid = false;
          }
          break;
        case 'inverse':
          // f(x) = a/x + c
          if (Math.abs(x) > 0.05) {
            y = coeffA / x + coeffC;
          } else {
            valid = false;
          }
          break;
        default:
          valid = false;
      }

      // Filter out infinity, NaNs and off-chart lines
      if (valid && !isNaN(y) && isFinite(y)) {
        const svgX = centerX + x * scaleX;
        const svgY = centerY - y * scaleY;
        
        // Only push points within a reasonable bounding margin
        if (svgY >= -50 && svgY <= height + 50) {
          points.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
        }
      }
    }

    if (points.length === 0) return '';
    return `M ${points.join(' L ')}`;
  }, [preset, coeffA, coeffB, coeffC, centerX, centerY, scaleX, scaleY]);

  // Generate grid marks
  const gridLines = useMemo(() => {
    const horizontal: React.ReactNode[] = [];
    const vertical: React.ReactNode[] = [];

    // Horizontal grid lines & ticks
    for (let yVal = -4; yVal <= 4; yVal++) {
      if (yVal === 0) continue;
      const ySvg = centerY - yVal * scaleY;
      horizontal.push(
        <line
          id={`grid-h-${yVal}`}
          key={`h-${yVal}`}
          x1="10"
          y1={ySvg}
          x2={width - 10}
          y2={ySvg}
          className="stroke-slate-200 dark:stroke-slate-800/60 stroke-[1]"
        />
      );
    }

    // Vertical grid lines & ticks
    for (let xVal = -6; xVal <= 6; xVal++) {
      if (xVal === 0) continue;
      const xSvg = centerX + xVal * scaleX;
      vertical.push(
        <line
          id={`grid-v-${xVal}`}
          key={`v-${xVal}`}
          x1={xSvg}
          y1="10"
          x2={xSvg}
          y2={height - 10}
          className="stroke-slate-200 dark:stroke-slate-800/60 stroke-[1]"
        />
      );
    }

    return { horizontal, vertical };
  }, [centerX, centerY, scaleX, scaleY]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
        <motion.div
          id="math-grapher-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-card w-full max-w-2xl rounded-[2.5rem] border border-border-strong shadow-2xl relative overflow-hidden flex flex-col"
        >
          {/* Subtle upper background glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-purple-500" />
          
          {/* Header */}
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-border-strong/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-foreground">Mini-Grapheur Virtuel</h3>
                <p className="text-3xs font-extrabold uppercase tracking-widest text-muted-text-subtle">Visualisation Analytique de Fonctions</p>
              </div>
            </div>
            <button
              id="math-grapher-close"
              onClick={onClose}
              className="p-2.5 bg-muted/50 hover:bg-muted text-muted-text hover:text-foreground rounded-full transition-all active:scale-90"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Model Content area */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: The Interactive Plot screen */}
            <div className="flex flex-col items-center">
              <div className="w-full h-[260px] bg-slate-50 dark:bg-slate-950 border border-border-strong rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center">
                <svg width={width} height={height} className="select-none overflow-hidden">
                  {/* Grid Lines */}
                  {gridLines.horizontal}
                  {gridLines.vertical}
                  
                  {/* Cartesian Axis Lines */}
                  <line x1="10" y1={centerY} x2={width - 10} y2={centerY} className="stroke-slate-400 dark:stroke-slate-700 stroke-[1.5]" />
                  <line x1={centerX} y1="10" x2={centerX} y2={height - 10} className="stroke-slate-400 dark:stroke-slate-700 stroke-[1.5]" />
                  
                  {/* Axis arrow tips */}
                  <polygon points={`${width-8},${centerY-3} ${width},${centerY} ${width-8},${centerY+3}`} className="fill-slate-400 dark:fill-slate-700" />
                  <polygon points={`${centerX-3},8 ${centerX},0 ${centerX+3},8`} className="fill-slate-400 dark:fill-slate-700" />

                  {/* Origin O */}
                  <circle cx={centerX} cy={centerY} r="3" className="fill-slate-600" />
                  <text x={centerX - 10} y={centerY + 12} className="text-[10px] font-bold fill-slate-400">O</text>

                  {/* Curve plotted path */}
                  {pointsPath && (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      d={pointsPath}
                      fill="none"
                      className="stroke-indigo-500 dark:stroke-indigo-400 stroke-[2.5]"
                    />
                  )}
                </svg>

                {/* Floating visual indicators or labels */}
                <div className="absolute top-3 left-3 flex gap-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 rounded-full">
                    {preset === 'quadratic' && 'Seconde Degré'}
                    {preset === 'trigonometric' && 'Onde Trigonométrique'}
                    {preset === 'exponential' && 'Fonction Exponentielle'}
                    {preset === 'logarithmic' && 'Logarithme Népérien'}
                    {preset === 'inverse' && 'Fonction Inverse'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Setting parameters */}
            <div className="space-y-5">
              <div className="space-y-1.5 animate-in fade-in duration-200">
                <label className="text-[10px] font-black uppercase tracking-wider text-muted-text block">Sélectionnez le type :</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                  <button
                    id="preset-quad"
                    onClick={() => { setPreset('quadratic'); setCoeffA(1); setCoeffB(-2); setCoeffC(-1); }}
                    className={`px-3 py-2 text-3xs font-extrabold tracking-tight border rounded-xl transition-all cursor-pointer ${
                      preset === 'quadratic' 
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm' 
                        : 'bg-muted/40 hover:bg-muted border-border-strong text-muted-text hover:text-foreground'
                    }`}
                  >
                    📈 Polynôme
                  </button>
                  <button
                    id="preset-trig"
                    onClick={() => { setPreset('trigonometric'); setCoeffA(2); setCoeffB(1.5); setCoeffC(0); }}
                    className={`px-3 py-2 text-3xs font-extrabold tracking-tight border rounded-xl transition-all cursor-pointer ${
                      preset === 'trigonometric' 
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm' 
                        : 'bg-muted/40 hover:bg-muted border-border-strong text-muted-text hover:text-foreground'
                    }`}
                  >
                    🌊 Sinusoïde
                  </button>
                  <button
                    id="preset-expo"
                    onClick={() => { setPreset('exponential'); setCoeffA(1); setCoeffB(0.5); setCoeffC(-2); }}
                    className={`px-3 py-2 text-3xs font-extrabold tracking-tight border rounded-xl transition-all cursor-pointer ${
                      preset === 'exponential' 
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm' 
                        : 'bg-muted/40 hover:bg-muted border-border-strong text-muted-text hover:text-foreground'
                    }`}
                  >
                    🌀 Exponentielle
                  </button>
                  <button
                    id="preset-log"
                    onClick={() => { setPreset('logarithmic'); setCoeffA(2); setCoeffB(0); setCoeffC(0); }}
                    className={`px-3 py-2 text-3xs font-extrabold tracking-tight border rounded-xl transition-all cursor-pointer ${
                      preset === 'logarithmic' 
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm' 
                        : 'bg-muted/40 hover:bg-muted border-border-strong text-muted-text hover:text-foreground'
                    }`}
                  >
                    📖 Logarithme
                  </button>
                  <button
                    id="preset-inv"
                    onClick={() => { setPreset('inverse'); setCoeffA(2); setCoeffB(0); setCoeffC(1); }}
                    className={`px-3 py-2 text-3xs font-extrabold tracking-tight border rounded-xl transition-all cursor-pointer ${
                      preset === 'inverse' 
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm' 
                        : 'bg-muted/40 hover:bg-muted border-border-strong text-muted-text hover:text-foreground'
                    }`}
                  >
                    🔄 Inverse
                  </button>
                </div>
              </div>

              {/* Sliders and controls */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-text border-b pb-1">
                  <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ajusteurs de coefficients</span>
                </div>
                
                {/* Coefficient A */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-3xs font-bold text-muted-text">
                    <span>Amplitude / Pente (a) :</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{coeffA.toFixed(1)}</span>
                  </div>
                  <input
                    id="slider-coeff-a"
                    type="range" min="-4" max="4" step="0.5" value={coeffA}
                    onChange={(e) => setCoeffA(parseFloat(e.target.value))}
                    className="w-full h-1 accent-indigo-500"
                  />
                </div>

                {/* Coefficient B */}
                {preset !== 'logarithmic' && (
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-3xs font-bold text-muted-text">
                      <span>Fréquence / Extension (b) :</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{coeffB.toFixed(1)}</span>
                    </div>
                    <input
                      id="slider-coeff-b"
                      type="range" min="-4" max="4" step="0.5" value={coeffB}
                      onChange={(e) => setCoeffB(parseFloat(e.target.value))}
                      className="w-full h-1 accent-indigo-500"
                    />
                  </div>
                )}

                {/* Coefficient C */}
                {preset !== 'inverse' && preset !== 'logarithmic' && (
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-3xs font-bold text-muted-text">
                      <span>Décalage vertical (c) :</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{coeffC.toFixed(1)}</span>
                    </div>
                    <input
                      id="slider-coeff-c"
                      type="range" min="-4" max="4" step="0.5" value={coeffC}
                      onChange={(e) => setCoeffC(parseFloat(e.target.value))}
                      className="w-full h-1 accent-indigo-500"
                    />
                  </div>
                )}
              </div>

              {/* Equation display */}
              <div className="p-4 bg-muted/30 border border-border-strong rounded-2xl">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-text block mb-1">Équation Analytique :</span>
                <div className="text-center font-mono font-black text-sm text-foreground select-all py-1">
                  {preset === 'quadratic' && `f(x) = ${coeffA}x² ${coeffB >= 0 ? '+' : ''}${coeffB}x ${coeffC >= 0 ? '+' : ''}${coeffC}`}
                  {preset === 'trigonometric' && `f(x) = ${coeffA}·sin(${coeffB}x) ${coeffC >= 0 ? '+' : ''}${coeffC}`}
                  {preset === 'exponential' && `f(x) = ${coeffA}·e^(${coeffB}x) ${coeffC >= 0 ? '+' : ''}${coeffC}`}
                  {preset === 'logarithmic' && `f(x) = ${coeffA}·ln(x) ${coeffC >= 0 ? '+' : ''}${coeffC}`}
                  {preset === 'inverse' && `f(x) = ${coeffA}/x ${coeffC >= 0 ? '+' : ''}${coeffC}`}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
