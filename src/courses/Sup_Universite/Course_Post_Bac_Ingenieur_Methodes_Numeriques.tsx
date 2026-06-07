import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, FormulaBox, 
  Quiz, Flashcard, InteractiveExercise, InteractiveChecklist, BentoGrid, BentoCard 
} from '../../components/SharedUI';
import { Sliders, Activity, Hammer, Zap, Award, Compass, HelpCircle, RefreshCw, Play, Layers } from 'lucide-react';

// Subcomponent 1: Newton-Raphson and Numerical Integration interactive playground
const NumericalMethodsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'newton' | 'integration'>('newton');

  // Tab 1: Newton-Raphson parameters
  const [x0, setX0] = useState<number>(3.5);
  const [newtonStepCount, setNewtonStepCount] = useState<number>(1);

  // Tab 2: Integration parameters
  const [subdivisions, setSubdivisions] = useState<number>(4);
  const [integrationMethod, setIntegrationMethod] = useState<'trapeze' | 'simpson'>('trapeze');

  // Math functions for Newton: f(x) = x^3 - 2x - 5
  // f'(x) = 3x^2 - 2
  const fNewton = (x: number) => Math.pow(x, 3) - 2 * x - 5;
  const dfNewton = (x: number) => 3 * Math.pow(x, 2) - 2;
  const rootNewton = 2.0945514815423265; // analytical root

  // Generate sequence of Newton-Raphson steps starting from x0
  // up to stepCount
  const newtonSteps = useMemo(() => {
    const list = [];
    let curr = x0;
    for (let i = 0; i < 5; i++) {
      const y = fNewton(curr);
      const dy = dfNewton(curr);
      const nextX = curr - y / dy;
      list.push({
        step: i,
        x: curr,
        y: y,
        dy: dy,
        nextX: nextX
      });
      curr = nextX;
    }
    return list;
  }, [x0]);

  const currentNewtonData = newtonSteps[Math.min(newtonStepCount - 1, newtonSteps.length - 1)];

  // Convert real graph space [0, 4.5] x [-10, 30] to 300x240 SVG coordinates
  const graphToSvgX = (x: number) => (x / 4.5) * 300;
  const graphToSvgY = (y: number) => 240 - ((y + 10) / 40) * 240;

  // Render continuous function curve f(x) = x^3 - 2x - 5
  const newtonCurvePointsStr = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60) * 4.5;
      const y = fNewton(x);
      points.push(`${graphToSvgX(x)},${graphToSvgY(y)}`);
    }
    return points.join(' ');
  }, []);

  // Tab 2: Integration f(x) = sin(x) + 1.2 from a = 0.5 to b = 3.5
  const intA = 0.5;
  const intB = 3.5;
  const fInt = (x: number) => Math.sin(x) + 1.2;

  // Exact Analytical integral of sin(x) + 1.2
  // Integral = [-cos(x) + 1.2x] matches -cos(3.5)+1.2*3.5 - (-cos(0.5)+1.2*0.5)
  const exactIntegral = useMemo(() => {
    const F = (x: number) => -Math.cos(x) + 1.2 * x;
    return F(intB) - F(intA);
  }, [intA, intB]);

  // Numerical approximation
  const { aproxVal, errorPct, elements } = useMemo(() => {
    const h = (intB - intA) / subdivisions;
    let sum = 0;
    const items = [];

    if (integrationMethod === 'trapeze') {
      // Trapezoidal Rule: h/2 * (f(a) + 2*f(x1) + ... + f(b))
      for (let i = 0; i < subdivisions; i++) {
        const xL = intA + i * h;
        const xR = xL + h;
        const yL = fInt(xL);
        const yR = fInt(xR);
        const area = (h / 2) * (yL + yR);
        sum += area;
        items.push({ xL, xR, yL, yR, area, type: 'trapeze' });
      }
    } else {
      // Simpson's Rule: h/6 * (f(xL) + 4*f(xM) + f(xR))
      for (let i = 0; i < subdivisions; i++) {
        const xL = intA + i * h;
        const xR = xL + h;
        const xM = (xL + xR) / 2;
        const yL = fInt(xL);
        const yR = fInt(xR);
        const yM = fInt(xM);
        const area = (h / 6) * (yL + 4 * yM + yR);
        sum += area;
        items.push({ xL, xR, yL, yR, xM, yM, area, type: 'simpson' });
      }
    }

    const diff = Math.abs(exactIntegral - sum);
    const err = (diff / exactIntegral) * 100;

    return {
      aproxVal: sum,
      errorPct: err,
      elements: items
    };
  }, [subdivisions, integrationMethod, intA, intB, exactIntegral]);

  // Convert real graph space [0, 4] x [0, 2.5] to 300x200 SVG coordinates for Integration
  const intToSvgX = (x: number) => (x / 4) * 300;
  const intToSvgY = (y: number) => 200 - (y / 2.5) * 200;

  const intCurvePointsStr = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60) * 4;
      const y = fInt(x);
      points.push(`${intToSvgX(x)},${intToSvgY(y)}`);
    }
    return points.join(' ');
  }, []);

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      {/* Navigation tabs */}
      <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('newton')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'newton' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass size={16} />
          Newton-Raphson (Zéros)
        </button>
        <button
          onClick={() => setActiveTab('integration')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'integration' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers size={16} />
          Quadratures (Intégration)
        </button>
      </div>

      {/* Content wrapper */}
      {activeTab === 'newton' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Control Column */}
            <div className="space-y-4">
              <h4 className="text-md font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Sliders size={16} className="text-indigo-600" />
                Paramètres d'Optimisation
              </h4>
              
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl space-y-4 border border-slate-150 dark:border-slate-850">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Point de départ initial {"$x_0$"} :</span>
                    <span className="font-mono text-indigo-600 font-bold">{x0.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.1"
                    value={x0}
                    onChange={(e) => {
                      setX0(Number(e.target.value));
                      setNewtonStepCount(1);
                    }}
                    className="w-full h-1.5 cursor-col-resize accent-indigo-600 bg-slate-200 dark:bg-slate-705 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>1.0 (Pente douce)</span>
                    <span>4.0 (Pente forte)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Étape de l'algorithme :</span>
                    <span className="font-mono text-indigo-600 font-bold">Étape {newtonStepCount}/5</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setNewtonStepCount(prev => Math.max(1, prev - 1))}
                      disabled={newtonStepCount === 1}
                      className="px-3 py-1 bg-white dark:bg-slate-950 text-xs border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded font-semibold disabled:opacity-50"
                    >
                      Retour
                    </button>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={newtonStepCount}
                      onChange={(e) => setNewtonStepCount(Number(e.target.value))}
                      className="flex-1 h-1.5 cursor-col-resize accent-indigo-600 bg-slate-200 dark:bg-slate-705 rounded-lg appearance-none"
                    />
                    <button
                      onClick={() => setNewtonStepCount(prev => Math.min(5, prev + 1))}
                      disabled={newtonStepCount === 5}
                      className="px-3 py-1 bg-white dark:bg-slate-950 text-xs border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded font-semibold disabled:opacity-50"
                    >
                      Suivant
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setX0(3.5);
                      setNewtonStepCount(1);
                    }}
                    className="w-full text-xs font-bold py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw size={12} /> Réinitialiser
                  </button>
                </div>
              </div>

              {/* Step statistics console representation */}
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block"> Console de calculs : Étape {newtonStepCount}</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-100 flex flex-col">
                    <span className="text-[10px] text-slate-400">Position {"$x_k$"}</span>
                    <span className="font-bold text-slate-800 dark:text-indigo-200">{currentNewtonData.x.toFixed(6)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-100 flex flex-col">
                    <span className="text-[10px] text-slate-400">Valeur {"$f(x_k)$"}</span>
                    <span className="font-bold text-slate-800 dark:text-indigo-200">{currentNewtonData.y.toFixed(6)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-100 flex flex-col">
                    <span className="text-[10px] text-slate-400">Dérivée {"$f'(x_k)$"}</span>
                    <span className="font-bold text-slate-800 dark:text-indigo-200">{currentNewtonData.dy.toFixed(6)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-100 flex flex-col">
                    <span className="text-[10px] text-slate-400">Prochain {"$x_{k+1}$"}</span>
                    <span className="font-bold text-emerald-600">{currentNewtonData.nextX.toFixed(6)}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 pt-1 leading-relaxed">
                  Notez la convergence quadratique : le nombre de décimales correctes double approximativement à chaque pas lorsque l'on s'approche de l'unique racine réelle {"$\\approx 2.09455$"}.
                </div>
              </div>
            </div>

            {/* Graphics plotting column with beautiful interactive tangents */}
            <div className="bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[280px]">
              <span className="absolute top-3 left-4 text-[9px] font-mono text-slate-450 uppercase space-x-1.5">
                <span>📈 Courbe</span>
                <span className="text-indigo-400">{"$y = x^3 - 2x - 5$"}</span>
              </span>

              <svg viewBox="0 0 300 240" className="w-full max-w-[280px] aspect-[5/4] bg-slate-900 border border-slate-850 rounded-xl overflow-hidden">
                {/* Axes and Origin lines */}
                <line x1="0" y1={graphToSvgY(0)} x2="300" y2={graphToSvgY(0)} className="stroke-slate-800" strokeWidth="1" />
                <line x1={graphToSvgX(0)} y1="0" x2={graphToSvgX(0)} y2="240" className="stroke-slate-800" strokeWidth="1" />

                {/* Vertical grid lines */}
                {[1, 2, 3, 4].map(val => (
                  <g key={`grid-x-${val}`}>
                    <line x1={graphToSvgX(val)} y1="0" x2={graphToSvgX(val)} y2="240" className="stroke-slate-850" strokeWidth="0.5" />
                    <text x={graphToSvgX(val) - 4} y={graphToSvgY(0) + 12} className="fill-slate-500 font-mono text-[7px]">{val}</text>
                  </g>
                ))}

                {/* Analytical root position marker */}
                <line x1={graphToSvgX(rootNewton)} y1={graphToSvgY(-4)} x2={graphToSvgX(rootNewton)} y2={graphToSvgY(4)} className="stroke-emerald-500" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx={graphToSvgX(rootNewton)} cy={graphToSvgY(0)} r="3" className="fill-emerald-500 stroke-slate-900" strokeWidth="0.8" />

                {/* Continuous main function curve */}
                <polyline
                  points={newtonCurvePointsStr}
                  className="fill-none stroke-indigo-500"
                  strokeWidth="2"
                />

                {/* Current tangent and projection steps mapping */}
                <g>
                  {/* Point (x_k, f(x_k)) */}
                  <circle 
                    cx={graphToSvgX(currentNewtonData.x)} 
                    cy={graphToSvgY(currentNewtonData.y)} 
                    r="4" 
                    className="fill-rose-500 stroke-white" 
                    strokeWidth="1" 
                  />
                  
                  {/* Tangent line drawn down to x-intercept */}
                  <line 
                    x1={graphToSvgX(currentNewtonData.x)} 
                    y1={graphToSvgY(currentNewtonData.y)} 
                    x2={graphToSvgX(currentNewtonData.nextX)} 
                    y2={graphToSvgY(0)} 
                    className="stroke-rose-400" 
                    strokeWidth="1.5" 
                  />

                  {/* Intercept point (x_{k+1}, 0) */}
                  <circle 
                    cx={graphToSvgX(currentNewtonData.nextX)} 
                    cy={graphToSvgY(0)} 
                    r="4" 
                    className="fill-emerald-500 stroke-white" 
                    strokeWidth="1" 
                  />

                  {/* Vertical dashed guideline to curve evaluated value */}
                  <line 
                    x1={graphToSvgX(currentNewtonData.nextX)} 
                    y1={graphToSvgY(0)} 
                    x2={graphToSvgX(currentNewtonData.nextX)} 
                    y2={graphToSvgY(fNewton(currentNewtonData.nextX))} 
                    className="stroke-slate-400 stroke-dasharray-[2,2]" 
                    strokeWidth="1" 
                    strokeDasharray="2,3"
                  />
                </g>
              </svg>

              <div className="flex justify-between w-full text-[9px] font-mono text-slate-400 mt-2 px-1">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Étape Courante {"$x_k$"}</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Intersection {"$x_{k+1}$"}</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-indigo-505"></span> Courbe Objective</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Control Column */}
            <div className="space-y-4">
              <h4 className="text-md font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Sliders size={16} className="text-indigo-600" />
                Paramètres d'Intégration
              </h4>

              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl space-y-4 border border-slate-150 dark:border-slate-850">
                {/* Method selector */}
                <div>
                  <span className="block text-xs font-semibold mb-2 text-slate-600 dark:text-slate-300">Formule d'approximation :</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIntegrationMethod('trapeze')}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        integrationMethod === 'trapeze'
                          ? 'bg-indigo-600 border-indigo-650 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-805 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Méthode des Trapèzes
                    </button>
                    <button
                      onClick={() => setIntegrationMethod('simpson')}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        integrationMethod === 'simpson'
                          ? 'bg-indigo-600 border-indigo-650 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-805 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Méthode de Simpson
                    </button>
                  </div>
                </div>

                {/* Subdivisions Count */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Nombre d'intervalles (N) :</span>
                    <span className="font-mono text-indigo-600 font-bold">N = {subdivisions}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    step={integrationMethod === 'simpson' ? "2" : "1"} // Simpson usually prefers even subdivisions
                    value={subdivisions}
                    onChange={(e) => setSubdivisions(Number(e.target.value))}
                    className="w-full h-1.5 cursor-col-resize accent-indigo-600 bg-slate-200 dark:bg-slate-705 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>N = 2 (Rapide)</span>
                    <span>N = 16 (Très précis)</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 leading-tight pt-1">
                  Les formules de quadrature segmentent l'aire fermée {"$[a, b]$"} en N tranches de largeur uniforme {"$h$"}, puis estiment le volume de chaque tranche par interpolation polynomiale linéaire (Trapèze) ou quadratique (Simpson).
                </div>
              </div>

              {/* Statistics/Results summary banner */}
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">📊 Évaluation Numérique</span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between p-1.5 bg-white dark:bg-slate-950 rounded border border-slate-100">
                    <span className="text-slate-450">Valeur Analytique (Réelle) :</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{exactIntegral.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between p-1.5 bg-white dark:bg-slate-950 rounded border border-slate-100">
                    <span className="text-slate-450">Aproximation Numérique :</span>
                    <span className="font-bold text-indigo-600">{aproxVal.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between p-1.5 bg-rose-50/50 dark:bg-rose-950/10 rounded border border-rose-100/30">
                    <span className="text-rose-900 dark:text-rose-250">Erreur Relative Globale :</span>
                    <span className="font-bold text-rose-600">{errorPct.toFixed(4)} %</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic plots for Integration */}
            <div className="bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[280px]">
              <span className="absolute top-3 left-4 text-[9px] font-mono text-slate-455 uppercase space-x-1.5">
                <span>📈 Intégration de f(x) de 0.5 à 3.5</span>
              </span>

              <svg viewBox="0 0 300 200" className="w-full max-w-[280px] aspect-[3/2] bg-slate-900 border border-slate-850 rounded-xl overflow-hidden">
                {/* Horizontal reference lines */}
                <line x1="0" y1={intToSvgY(0)} x2="300" y2={intToSvgY(0)} className="stroke-slate-800" strokeWidth="1" />
                <line x1="0" y1={intToSvgY(1)} x2="300" y2={intToSvgY(1)} className="stroke-slate-850/60" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="0" y1={intToSvgY(2)} x2="300" y2={intToSvgY(2)} className="stroke-slate-850/60" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* Draw numerical integration blocks */}
                {elements.map((el, idx) => {
                  const pointsStr = el.type === 'trapeze' 
                    ? `${intToSvgX(el.xL)},${intToSvgY(0)} ` +
                      `${intToSvgX(el.xL)},${intToSvgY(el.yL)} ` +
                      `${intToSvgX(el.xR)},${intToSvgY(el.yR)} ` +
                      `${intToSvgX(el.xR)},${intToSvgY(0)}`
                    : // Simpson quadratic representation (drawn as simple polygon approximation for visual simplicty)
                      `${intToSvgX(el.xL)},${intToSvgY(0)} ` +
                      `${intToSvgX(el.xL)},${intToSvgY(el.yL)} ` +
                      `${intToSvgX(el.xM)},${intToSvgY(el.yM)} ` +
                      `${intToSvgX(el.xR)},${intToSvgY(el.yR)} ` +
                      `${intToSvgX(el.xR)},${intToSvgY(0)}`;

                  return (
                    <g key={`block-${idx}`}>
                      <polygon
                        points={pointsStr}
                        className="fill-indigo-500/20 stroke-indigo-400"
                        strokeWidth="1.2"
                      />
                      {/* Vertical separator dashed gridline */}
                      <line 
                        x1={intToSvgX(el.xR)} 
                        y1={intToSvgY(0)} 
                        x2={intToSvgX(el.xR)} 
                        y2={intToSvgY(el.yR)} 
                        className="stroke-slate-700" 
                        strokeWidth="0.8" 
                        strokeDasharray="2,2"
                      />
                    </g>
                  );
                })}

                {/* Continuous main function curve sin(x) + 1.2 */}
                <polyline
                  points={intCurvePointsStr}
                  className="fill-none stroke-indigo-450"
                  strokeWidth="2.5"
                />

                {/* Bounds indicators a and b */}
                <text x={intToSvgX(0.5) - 3} y={intToSvgY(0) + 12} className="fill-slate-400 font-mono text-[7px]">a</text>
                <text x={intToSvgX(3.5) - 3} y={intToSvgY(0) + 12} className="fill-slate-400 font-mono text-[7px]">b</text>
              </svg>

              <div className="flex justify-between w-full text-[9px] font-mono text-slate-400 mt-2 px-1">
                <span>🎨 Surface de Quadrature</span>
                <span>📈 Courbe de Référence</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const Course_Post_Bac_Ingenieur_Methodes_Numeriques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-NUM"
        title="Méthodes Numériques & Algorithmique"
        subtitle="De l'approximation locale à la convergence quadratique : algorithmes stabilisés de recherche de zéros et formules de quadrature de Newton-Cotes."
        duration="1h 35"
      />

      <InfoBlock type="info" title="L'indispensable numérique de l'ingénieur">
        À de rares exceptions analytiques près, la majorité des systèmes d'équations physiques ou financières rencontrés dans l'industrie ne possèdent pas de solutions explicites formulables au sens de Leibniz (avec des radicaux ou des transcendantes). Les ingénieurs doivent alors concevoir des processus numériques discrets stables et rapides, en mesurant à chaque pas la vitesse de convergence algorithmique théorique.
      </InfoBlock>

      <Section title="1. Recherche de Racines : l'Algorithme de Newton-Raphson" icon="📐" color="indigo">
        <p className="mb-4">
          La méthode de Newton-Raphson s'appuie sur une approximation affine locale répétée : au lieu de chercher les zéros d'une courbe sinueuse {"$f(x) = 0$"}, on trace la tangente à cette courbe en un point d'estimation {"$x_k$"} et on calcule analytiquement l'intersection de cette droite avec l'axe horizontal.
        </p>

        <FormulaBox 
          title="Relation de Récurrence Discrète de Newton-Raphson" 
          math={"x_{k+1} = x_k - \\frac{f(x_k)}{f'(x_k)}"} 
        />

        <BentoGrid>
          <BentoCard title="Vitesse de Convergence" icon={<Zap className="text-amber-500" size={18} />} color="amber">
            Si la racine {"$\\alpha$"} est simple et que la condition de départ est suffisamment robuste, la convergence est d'ordre 2 (quadratique) : l'erreur vérifie {"$|e_{k+1}| \\le C |e_k|^2$"}. Le nombre de décimales exactes double à chaque pas !
          </BentoCard>

          <BentoCard title="Le Risque des Pentes Nulles" icon={<Activity className="text-rose-500" size={18} />} color="rose">
            Si le point d'essai {"$x_k$"} s'établit proche d'un extremum local induisant {"$f'(x_k) \\approx 0$"}, l'algorithme subit une divison par un terme minuscule et projette la valeur suivante à l'infini. C'est l'instabilité de division de pente !
          </BentoCard>

          <BentoCard title="Alternative de la Dichotomie" icon={<Compass className="text-emerald-500" size={18} />} color="emerald">
            À l'inverse de la vitesse explosive de Newton, la dichotomie (méthode de bissection) est d'ordre linéaire mais assure une convergence imperturbable dès lors que la fonction change de signe aux bornes {"$[a, b]$"}.
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section title="2. Intégration Numérique : Formules de Quadrature" icon="⚡" color="slate">
        <p className="mb-4">
          Pour évaluer numériquement {"$\\int_a^b f(x) \\, dx$"}, nous l'approchons par une somme finie pondérée de valeurs de {"$f$"} estimées en différents nœuds discrets. C'est la famille des méthodes de Newton-Cotes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <FormulaBox 
            title="Formule des Trapèzes (Ordre d'Erreur O(h²))" 
            math={"I \\approx \\frac{h}{2} \\left( f(a) + 2 \\sum_{i=1}^{N-1} f(x_i) + f(b) \\right)"} 
          />
          <FormulaBox 
            title="Formule de Simpson (Ordre d'Erreur O(h⁴))" 
            math={"I \\approx \\frac{h}{6} \\left[ f(a) + f(b) + 2 \\sum_{i=1}^{N-1} f(x_i) + 4 \\sum_{i=0}^{N-1} f\\left(\\frac{x_i + x_{i+1}}{2}\\right) \\right]"} 
          />
        </div>

        <TipBanner type="info" title="Formule de Simpson : Précision inattendue d'ordre 3">
          Bien qu'elle approxime localement la fonction par des morceaux paraboliques de degré 2, la formule de Simpson est mathématiquement exacte pour tous les polynômes de degré inférieur ou égal à 3 (ordre 3). C'est ce qui en fait un outil à bas coût de calcul extrêmement performant pour toute l'analyse technique d'ingénierie.
        </TipBanner>
      </Section>

      <Section title="3. Laboratoire Interactif de Simulation Algorithmique" icon="🔬" color="indigo">
        <NumericalMethodsVisualizer />
      </Section>

      <Section title="4. Algorithme Python Pratique de Résolution" icon="⚙️" color="indigo">
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto space-y-2 relative shadow-inner">
          <div className="absolute top-3 right-4 bg-slate-900 px-3 py-1 rounded border border-slate-800 text-[10px] text-slate-400 font-bold">
            python3
          </div>
          <p className="text-slate-500 text-[10px] uppercase font-bold mb-2"># Implémentation stabilisée de Newton-Raphson</p>
          <pre className="text-indigo-200">
{`def newton_raphson(f, df, x0, tol=1e-10, max_iter=50):
    x = x0
    for i in range(max_iter):
        pente = df(x)
        if abs(pente) < 1e-15:
            raise ValueError("Erreur : Dérivée trop proche de zéro, arrêt de l'algorithme.")
        
        prochain_x = x - f(x) / pente
        print(f"Étape {i+1} : x = {prochain_x:.12f}, f(x) = {f(prochain_x):.3e}")
        
        if abs(prochain_x - x) < tol:
            return prochain_x
        x = prochain_x
        
    raise TimeoutError("L'algorithme n'a pas convergé dans les limites fixées.")`}
          </pre>
        </div>
      </Section>

      <Section title="🧠 Flashcards : Méthodes Numériques d&apos;Analyse" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous sur les critères d&apos;ordre de convergence et de précision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la vitesse (ordre) de convergence de la méthode de Newton-Raphson ?</>}
            back={<>Sa convergence est <strong>quadratique</strong> (ordre 2), sous réserve que le point initial {"$x_0$"} soit assez proche de la racine simple (où {"$f'(r) \\neq 0$"}). Le nombre de décimales correctes double à chaque étape !</>}
          />
          <Flashcard 
            front={<>Comment évolue l&apos;erreur de la méthode des trapèzes composés quand on multiplie par 2 le nombre d&apos;intervalles ?</>}
            back={<>L&apos;erreur d&apos;approximation globale est divisée par environ <strong>4</strong> ! Cette méthode est d&apos;ordre 2, son erreur résiduelle scale en {"$\\mathcal{O}(h^2)$"} où h est le pas.</>}
          />
        </div>
      </Section>

      <Section title="5. Exercice d&apos;Analyse Classique" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice corrigé : Étude de l'erreur des trapèzes"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>On cherche à évaluer numériquement la valeur de l'intégrale suivante :</p>
              {"$$I = \\int_{0}^{2} e^{-x^2} \\, dx$$"}
              <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                <li>Déterminer un majorant analytique de la dérivée seconde de l'objectif sur l'intervalle d'évaluation.</li>
                <li>En déduire le nombre d'intervalles requis {"$N$"} si l'on souhaite garantir une erreur stricte inférieure à {"$10^{-4}$"} par la méthode des trapèzes composés.</li>
              </ol>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Calcul des dérivées de Gaussienne</p>
              <p>Posons {"$f(x) = e^{-x^2}$"}. Dérivons de manière itérative :</p>
              {"$$f'(x) = -2x e^{-x^2}$$"}
              {"$$f''(x) = (4x^2 - 2) e^{-x^2}$$"}
              <p>Étudions les valeurs limites sur {"$[0, 2]$"}. Le maximum absolu de la dérivée seconde s'établit en {"$x=0$"} où {"$|f''(0)|=2$"} et en {"$x=2$"} où {"$|f''(2)| = |14 e^{-4}| \\approx 0.256$"}. Donc sur cet intervalle complet, on en déduit le majorant absolu : </p>
              {"$$M_2 = \\sup_{x \\in [0,2]} |f''(x)| = 2$$"}
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-110 text-xs leading-relaxed">
              <p>Étape 2 : Majoration d'erreur globale</p>
              <p>La formule du reste global pour la méthode des trapèzes s'énonce comme :</p>
              {"$$|R_N| \\le \\frac{(b-a)^3}{12 N^2} M_2$$"}
              <p>En remplaçant les constantes par leurs valeurs numériques correspondantes (avec b-a = 2) :</p>
              {"$$|R_N| \\le \\frac{2^3}{12 N^2} \\times 2 = \\frac{16}{12 N^2} = \\frac{4}{3 N^2}$$"}
              <p>Pour s'assurer d'une précision de 4 décimales, on résout l'inéquation d'erreur :</p>
              {"$$\\frac{4}{3 N^2} \\le 10^{-4} \\implies N^2 \\ge \\frac{4 \\times 10^4}{3} \\approx 13333.33$$"}
              {"$$N \\ge \\sqrt{13333.33} \\approx 115.47$$"}
              <p>On valide donc un découpage minimal de 116 intervalles pour garantir la précision demandée !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="6. Épreuve de Certification d'Algorithmique" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle méthode offre la vitesse de convergence la plus élevée pour extraire localement un pôle de fonction régulière récurrente ?",
              options: [
                "La méthode de Bissection ( linéaire )",
                "La méthode du Point Fixe linéaire",
                "L'algorithme de Newton-Raphson ( quadratique )"
              ],
              correctAnswer: 2,
              explanation: "Newton-Raphson s'impose grâce à sa convergence quadratique (ordre 2). Dès lors que l'on se rapproche du point optimal, chaque itération double approximativement le volume global de précision finale !"
            },
            {
              question: "Si l'on cherche à intégrer un polynôme d'ordre 3 à l'aide de la formule Simpson sur une portion fermée, comment s'établit l'erreur relative ?",
              options: [
                "L'erreur relative est strictement égale à 0 (l'estimation est exacte)",
                "L meurent asymptotiquement d'ordre O(h²)",
                "Elle s'annule pour les équations paires uniquement"
              ],
              correctAnswer: 0,
              explanation: "La méthode de Simpson est conçue pour intégrer de manière parfaite tous les polynômes de degré inférieur ou égal à 3 (cubiques). L'erreur analytique dépend de la dérivée quatrième f⁽⁴⁾(x). Pour un polynôme de degré 3, sa dérivée quatrième s'estompe à 0, conférant à Simpson une exactitude totale !"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Être capable de justifier et d'écrire la récurrence polynomiale de Newton-Raphson.",
            "Visualiser et contourner le danger des dérivées nulles.",
            "Distinguer la méthode de trapèze et celle de Simpson quant à leur ordre d'erreur en h.",
            "Évaluer un majorant analytique d'erreur pour dimensionner un échantillonnage numérique d'intégration."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_Ingenieur_Methodes_Numeriques;
