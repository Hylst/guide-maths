import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, 
  Quiz, Flashcard, InteractiveExercise, FormulaBox, BentoGrid, BentoCard
} from '../../components/SharedUI';
import { Sliders, RefreshCw, Play, Pause, Compass, Zap, HelpCircle, Award, Target } from 'lucide-react';

type FunctionType = 'bowl' | 'banana' | 'rastrigin';
type AlgoType = 'gd' | 'momentum' | 'adam';

interface OptimizedPoint {
  x: number;
  y: number;
}

const GradientDescentInteractiveVisualizer: React.FC = () => {
  const [funType, setFunType] = useState<FunctionType>('bowl');
  const [algo, setAlgo] = useState<AlgoType>('gd');
  const [lr, setLr] = useState<number>(0.08);
  const [startPoint, setStartPoint] = useState<OptimizedPoint>({ x: -2.0, y: 2.2 });
  const [path, setPath] = useState<OptimizedPoint[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [v, setV] = useState<{ x: number, y: number }>({ x: 0, y: 0 }); // for momentum
  const [adamM, setAdamM] = useState<{ x: number, y: number }>({ x: 0, y: 0 }); // for adam m
  const [adamV, setAdamV] = useState<{ x: number, y: number }>({ x: 0, y: 0 }); // for adam v
  const [adamT, setAdamT] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Evaluate f(x,y) for visualization background contour effects
  const getFVal = (x: number, y: number): number => {
    switch (funType) {
      case 'bowl':
        return 0.5 * (x * x + 1.5 * y * y);
      case 'banana':
        // Modified Rosenbrock for nice visual scale in range [-3, 3]
        return Math.pow(x - 1, 2) + 2.5 * Math.pow(y - x * x, 2);
      case 'rastrigin':
        // Wave pattern
        return x * x + y * y - 2.0 * Math.cos(2 * Math.PI * x) - 2.0 * Math.cos(2 * Math.PI * y) + 4;
      default:
        return 0;
    }
  };

  // Evaluate gradient of f(x,y)
  const getGradient = (x: number, y: number): { dx: number, dy: number } => {
    switch (funType) {
      case 'bowl':
        return { dx: x, dy: 1.5 * y };
      case 'banana':
        // d/dx [ (x-1)^2 + 2.5*(y - x^2)^2 ] = 2*(x-1) + 5*(y - x^2)*(-2x)
        return {
          dx: 2 * (x - 1) - 10 * x * (y - x * x),
          dy: 5 * (y - x * x)
        };
      case 'rastrigin':
        // d/dx [ x^2 + y^2 - 2*cos(2pi*x) - 2*cos(2pi*y) ] = 2x + 4*pi*sin(2pi*x)
        return {
          dx: 2 * x + 4 * Math.PI * Math.sin(2 * Math.PI * x),
          dy: 2 * y + 4 * Math.PI * Math.sin(2 * Math.PI * y)
        };
      default:
        return { dx: 0, dy: 0 };
    }
  };

  // Initialize path when functions change or startPoint changes
  useEffect(() => {
    setPath([startPoint]);
    setV({ x: 0, y: 0 });
    setAdamM({ x: 0, y: 0 });
    setAdamV({ x: 0, y: 0 });
    setAdamT(0);
    setIsRunning(false);
  }, [startPoint, funType, algo]);

  // Perform single step of optimization
  const performStep = () => {
    if (path.length === 0) return;
    const current = path[path.length - 1];
    
    // Check for convergence or NaN
    if (Math.abs(current.x) > 6 || Math.abs(current.y) > 6 || isNaN(current.x) || isNaN(current.y)) {
      setIsRunning(false);
      return;
    }

    const { dx, dy } = getGradient(current.x, current.y);
    let nextPoint: OptimizedPoint = { ...current };

    if (algo === 'gd') {
      nextPoint = {
        x: current.x - lr * dx,
        y: current.y - lr * dy
      };
    } else if (algo === 'momentum') {
      const beta = 0.9;
      const nextVx = beta * v.x + lr * dx;
      const nextVy = beta * v.y + lr * dy;
      setV({ x: nextVx, y: nextVy });
      nextPoint = {
        x: current.x - nextVx,
        y: current.y - nextVy
      };
    } else if (algo === 'adam') {
      const beta1 = 0.9;
      const beta2 = 0.999;
      const eps = 1e-8;
      const nextT = adamT + 1;

      // Update biased first moment estimate
      const mX = beta1 * adamM.x + (1 - beta1) * dx;
      const mY = beta1 * adamM.y + (1 - beta1) * dy;
      // Update biased second raw moment estimate
      const vX = beta2 * adamV.x + (1 - beta2) * dx * dx;
      const vY = beta2 * adamV.y + (1 - beta2) * dy * dy;

      setAdamM({ x: mX, y: mY });
      setAdamV({ x: vX, y: vY });
      setAdamT(nextT);

      // Compute bias-corrected first moment estimate
      const mHatX = mX / (1 - Math.pow(beta1, nextT));
      const mHatY = mY / (1 - Math.pow(beta1, nextT));
      // Compute bias-corrected second raw moment estimate
      const vHatX = vX / (1 - Math.pow(beta2, nextT));
      const vHatY = vY / (1 - Math.pow(beta2, nextT));

      nextPoint = {
        x: current.x - lr * mHatX / (Math.sqrt(vHatX) + eps),
        y: current.y - lr * mHatY / (Math.sqrt(vHatY) + eps)
      };
    }

    // Append to path, keep limit to avoid overload
    setPath(prev => [...prev.slice(0, 150), nextPoint]);
  };

  // Autonomous loop execution
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        performStep();
      }, 80);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, path, lr, algo, funType]);

  // Click on SVG coordinates map space to define initial learning point
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert SVG view port [0, 300] to coordinates [-3, 3]
    const xCoord = ((clickX / rect.width) * 6) - 3;
    const yCoord = -(((clickY / rect.height) * 6) - 3); // SVG has inverted y coordinate

    setStartPoint({ x: Math.round(xCoord * 100) / 100, y: Math.round(yCoord * 100) / 100 });
  };

  const getGlobalMin = (): { x: number, y: number } => {
    if (funType === 'banana') return { x: 1, y: 1 };
    return { x: 0, y: 0 };
  };

  const globalMin = getGlobalMin();

  // Convert real coordinate x, y (-3 to 3) to SVG space (0 to 300)
  const toSvgX = (coordX: number) => ((coordX + 3) / 6) * 300;
  const toSvgY = (coordY: number) => ((-coordY + 3) / 6) * 300;

  // Render decorative contours inside the SVG based on function structure
  const renderContours = () => {
    const list = [];
    if (funType === 'bowl') {
      // Oval rings centered around 0,0
      for (let r = 0.5; r <= 3.5; r += 0.5) {
        list.push(
          <ellipse
            key={`bowl-${r}`}
            cx="150"
            cy="150"
            rx={r * 45}
            ry={r * 37}
            className="stroke-indigo-900/40 fill-none"
            strokeWidth="0.8"
            strokeDasharray="1,3"
          />
        );
      }
    } else if (funType === 'banana') {
      // Banana valleys, following roughly y = x^2
      // Draw curves parallel to parabolas to simulate banana contours
      for (let offset = -0.4; offset <= 2.2; offset += 0.4) {
        const pointsArray = [];
        for (let x = -2.0; x <= 2.0; x += 0.1) {
          const y = x * x + offset;
          pointsArray.push(`${toSvgX(x)},${toSvgY(y)}`);
        }
        list.push(
          <path
            key={`banana-${offset}`}
            d={`M ${pointsArray.join(' L ')}`}
            className="stroke-amber-600/30 fill-none"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        );
      }
    } else if (funType === 'rastrigin') {
      // Multiple concentric micro-wells around integer points
      for (let nx = -2; nx <= 2; nx += 1) {
        for (let ny = -2; ny <= 2; ny += 1) {
          list.push(
            <circle
              key={`rast-${nx}-${ny}`}
              cx={toSvgX(nx)}
              cy={toSvgY(ny)}
              r="10"
              className="stroke-emerald-600/25 fill-none"
              strokeWidth="0.5"
            />
          );
          list.push(
            <circle
              key={`rast2-${nx}-${ny}`}
              cx={toSvgX(nx)}
              cy={toSvgY(ny)}
              r="22"
              className="stroke-indigo-500/10 fill-none text-xs"
              strokeWidth="0.5"
              strokeDasharray="1,2"
            />
          );
        }
      }
    }
    return list;
  };

  const getAccuracy = () => {
    if (path.length === 0) return 0;
    const finalPt = path[path.length - 1];
    const dist = Math.sqrt(Math.pow(finalPt.x - globalMin.x, 2) + Math.pow(finalPt.y - globalMin.y, 2));
    return dist;
  };

  const distToGoal = getAccuracy();

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Compass className="text-indigo-600 animate-spin-slow" size={22} />
        Tableau d'Exploration Algorithmique de Descente de Gradient
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Sélectionnez un relief analytique, un algorithme d'optimisation et réglez le pas {"$\\eta$"}. Cliquez n'importe où sur la carte pour définir la position de départ {"$x_0$"} et lancez la descente géométrique.
      </p>

      {/* Control knobs and dashboard selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* RELIEF SELECTOR */}
        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest"> relief analytique (f) </label>
          <div className="grid grid-cols-1 gap-2 pt-1.5">
            <button 
              onClick={() => setFunType('bowl')}
              className={`p-2 rounded-xl text-left text-xs font-bold transition-all border ${
                funType === 'bowl' 
                  ? 'bg-indigo-650 text-white border-indigo-600' 
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 dark:border-slate-850 hover:bg-slate-50'
              }`}
            >
              🥗 Cuvette Convexe Simple
            </button>
            <button 
              onClick={() => setFunType('banana')}
              className={`p-2 rounded-xl text-left text-xs font-bold transition-all border ${
                funType === 'banana' 
                  ? 'bg-indigo-650 text-white border-indigo-600' 
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 dark:border-slate-850 hover:bg-slate-50'
              }`}
            >
              🍌 Vallée de Rosenbrock (Banane)
            </button>
            <button 
              onClick={() => setFunType('rastrigin')}
              className={`p-2 rounded-xl text-left text-xs font-bold transition-all border ${
                funType === 'rastrigin' 
                  ? 'bg-indigo-650 text-white border-indigo-600' 
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 dark:border-slate-850 hover:bg-slate-50'
              }`}
            >
              🌊 Rastrigin (Minimas multiples)
            </button>
          </div>
        </div>

        {/* ALGORITHM SELECTOR */}
        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest"> variante d'optimiseur </label>
          <div className="grid grid-cols-1 gap-2 pt-1.5">
            <button 
              onClick={() => { setAlgo('gd'); setLr(0.08); }}
              className={`p-2 rounded-xl text-left text-xs font-bold transition-all border ${
                algo === 'gd' 
                  ? 'bg-indigo-650 text-white border-indigo-600' 
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 dark:border-slate-850 hover:bg-slate-50'
              }`}
            >
              🏃 SGD classique (Pas fixe)
            </button>
            <button 
              onClick={() => { setAlgo('momentum'); setLr(0.05); }}
              className={`p-2 rounded-xl text-left text-xs font-bold transition-all border ${
                algo === 'momentum' 
                  ? 'bg-indigo-650 text-white border-indigo-600' 
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 dark:border-slate-850 hover:bg-slate-50'
              }`}
            >
              🏈 Momentum (Heavy-Ball)
            </button>
            <button 
              onClick={() => { setAlgo('adam'); setLr(0.15); }}
              className={`p-2 rounded-xl text-left text-xs font-bold transition-all border ${
                algo === 'adam' 
                  ? 'bg-indigo-650 text-white border-indigo-600' 
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 dark:border-slate-850 hover:bg-slate-50'
              }`}
            >
              🧠 Adam (Moment adaptatif)
            </button>
          </div>
        </div>

        {/* LEARNING RATE SLIDER */}
        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <span> Taux d'Apprentissage (Pas) </span>
              <span className="font-mono text-indigo-600 font-bold">{lr.toFixed(3)}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
              Un learning-rate trop grand provoque des oscillations instables. Trop petit, l'apprentissage devient très lent.
            </p>
          </div>
          
          <div className="pt-2">
            <input 
              type="range" 
              min="0.005" 
              max="0.4" 
              step="0.005"
              value={lr} 
              onChange={(e) => setLr(Number(e.target.value))}
              className="w-full tracking-wider cursor-col-resize accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>𝜂 = 0.005</span>
              <span>𝜂 = 0.400</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Side: interactive SVG Map screen */}
        <div className="md:col-span-2 bg-slate-950 rounded-2xl p-5 flex flex-col items-center justify-center relative min-h-[340px] shadow-inner select-none">
          <svg 
            viewBox="0 0 300 300" 
            className="w-full max-w-[300px] aspect-square rounded-xl bg-slate-900 border border-slate-800 cursor-crosshair"
            onClick={handleMapClick}
          >
            {/* Horizontal & Vertical Axis */}
            <line x1="0" y1="150" x2="300" y2="150" className="stroke-slate-850" strokeWidth="0.8" />
            <line x1="150" y1="0" x2="150" y2="300" className="stroke-slate-850" strokeWidth="0.8" />

            {/* Render contour rings according to selected function */}
            {renderContours()}

            {/* Target global optimum position */}
            <g transform={`translate(${toSvgX(globalMin.x)}, ${toSvgY(globalMin.y)})`}>
              <circle r="8" className="fill-none stroke-emerald-500 animate-ping opacity-75" strokeWidth="1.5" />
              <circle r="4" className="fill-emerald-400" />
              <circle r="2" className="fill-white" />
            </g>

            {/* Render Trajectory Path */}
            {path.length > 1 && (
              <polyline
                points={path.map(pt => `${toSvgX(pt.x)},${toSvgY(pt.y)}`).join(' ')}
                className="fill-none stroke-indigo-400"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Render Trajectory point steps */}
            {path.map((pt, idx) => (
              <circle 
                key={`path-pt-${idx}`} 
                cx={toSvgX(pt.x)} 
                cy={toSvgY(pt.y)} 
                r={idx === path.length - 1 ? "5" : "2"} 
                className={idx === path.length - 1 ? "fill-rose-450 stroke-white strike-width-1" : "fill-indigo-305 opacity-80"} 
              />
            ))}

            {/* Label coordinate markings */}
            <text x="5" y="142" className="fill-slate-600 font-mono text-[6px]">-3</text>
            <text x="285" y="142" className="fill-slate-600 font-mono text-[6px]">+3</text>
            <text x="154" y="295" className="fill-slate-600 font-mono text-[6px]">-3</text>
            <text x="154" y="10" className="fill-slate-600 font-mono text-[6px]">+3</text>
          </svg>

          {/* Quick interactive note */}
          <div className="mt-3 text-center text-[10px] text-slate-500">
            💡 Cliquez n'importe où sur la carte ci-dessus pour déplacer l'origine de descente.
          </div>

          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-slate-800 rounded-lg text-[9px] font-mono text-slate-300">
            <span className="text-rose-400 font-bold">●</span> Position ({path.length > 0 ? path[path.length - 1].x.toFixed(2) : '0'}, {path.length > 0 ? path[path.length - 1].y.toFixed(2) : '0'})<br />
            <span className="text-emerald-400 font-bold">🎯</span> Minimum ({globalMin.x}, {globalMin.y})
          </div>
        </div>

        {/* Right Side: Step logs and action controls */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-155 dark:border-slate-800 space-y-4 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Zap size={14} className="text-amber-500 animate-pulse" /> Diagnostic d'Étape
            </div>

            <div className="space-y-2">
              <div className="px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450">Itérations :</span>
                <span className="font-bold text-indigo-600 text-sm">{path.length - 1}</span>
              </div>

              <div className="px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450">Écart à la cible :</span>
                <span className={`font-bold text-sm ${distToGoal < 0.05 ? 'text-emerald-500' : 'text-slate-800 dark:text-slate-200'}`}>
                  {distToGoal.toFixed(4)}
                </span>
              </div>

              <div className="px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450">f(x, y) final :</span>
                <span className="font-bold text-rose-500">
                  {path.length > 0 ? getFVal(path[path.length - 1].x, path[path.length - 1].y).toFixed(5) : '?' }
                </span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 leading-relaxed bg-slate-100 dark:bg-slate-950 p-3 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-900">
              {algo === 'gd' && (
                <p>⚠️ <strong>SGD Fixe :</strong> Avance proportionnellement à la pente. Si le relief est accidenté (Rastrigin), il reste bloqué dans un creux local.</p>
              )}
              {algo === 'momentum' && (
                <p>🏈 <strong>Momentum :</strong> Ajoute une inertie physique. La 'balle' accumule de la vitesse, lui permettant d'éviter les oscillations de creux et de franchir de petites bosses !</p>
              )}
              {algo === 'adam' && (
                <p>🧠 <strong>Adam :</strong> Divise la mise à jour par la moyenne glissante des variances. Permet d'avancer vite là où c'est plat, et de freiner à l'approche du minimum.</p>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={performStep}
                disabled={isRunning}
                className="py-2.5 px-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} /> Étape unique
              </button>

              <button 
                onClick={() => setPath([startPoint])}
                className="py-2.5 px-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-705 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                Reset trace
              </button>
            </div>

            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow transition-all ${
                isRunning 
                  ? 'bg-amber-550 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-indigo-650 hover:bg-indigo-700 text-white shadow-indigo-600/20'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={14} /> Mettre sur Pause
                </>
              ) : (
                <>
                  <Play size={14} /> Lancer l'Algorithme (Auto)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Course_Post_Bac_Ingenieur_Descente_Gradient: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-GD"
        title="Optimisation Convexe & Descente de Gradient"
        subtitle="De la convexité globale à l'optimisation adaptative des réseaux profonds : algorithmes, convergence et théorie spectrale."
        duration="1h 15"
      />

      <InfoBlock type="info" title="L'importance de l'Optimisation en Intelligence Artificielle">
        Toute tâche d'apprentissage machine (Machine Learning) se résume à un problème d'optimisation mathématique : nous écrivons une fonction de perte indiquant la gravité de l'erreur commise par l'algorithme, puis nous cherchons le jeu de paramètres qui minimise cette perte. Comprendre la convexité, les taux de convergence et les trajectoires géométriques des optimiseurs de second ordre est d'une importance capitale pour tout ingénieur et data scientist.
      </InfoBlock>

      <Section title="1. La Convexité : Le Graal de l'Optimisation" icon="📐" color="slate">
        <p className="mb-4">
          En optimisation, une fonction {"$f: U \subset \mathbb{R}^d \to \mathbb{R}$"} est dite <strong>convexe</strong> si son épigraphe est un ensemble convexe. Géométriquement, cela signifie que le segment reliant n'importe quel couple de points de la fonction se situe intégralement au-dessus de sa courbe.
        </p>

        <BentoGrid>
          <BentoCard title="Formulation Standard" icon={<Sliders className="text-indigo-600" size={18} />} color="indigo">
            Pour tout couple de points {"$(u, v)$"} et tout coefficient de mélange {"$\\lambda \\in [0, 1]$"}, la condition s'énonce :
            <div className="bg-white dark:bg-slate-950 p-2 border border-indigo-150 rounded-lg text-center font-mono my-2 text-indigo-700">
              {"$f(\\lambda u + (1-\\lambda)v) \\le \\lambda f(u) + (1-\\lambda)f(v)$"}
            </div>
          </BentoCard>

          <BentoCard title="Propriété des Minimas" icon={<Target className="text-emerald-650" size={18} />} color="emerald">
            C'est la propriété magique : pour une fonction convexe, <strong>tout minimum local est un minimum global</strong>. Il n'existe aucun relief trompeur ou piège secondaire.
          </BentoCard>

          <BentoCard title="Caractérisation Différentielle" icon={<Zap className="text-amber-600" size={18} />} color="amber">
            Si {"$f$"} est deux fois différentiable, elle est convexe si et seulement si sa matrice Hessienne {"$\\mathbf{H}$"} est semi-définie positive en tout point :
            <div className="bg-white dark:bg-slate-950 p-2 border border-amber-100 rounded-lg text-center font-mono my-2 text-amber-700">
              {"$\\mathbf{x}^T \\mathbf{H}(A) \\mathbf{x} \\ge 0$"}
            </div>
          </BentoCard>
        </BentoGrid>

        <TipBanner type="info" title="La distinction fondamentale">
          Dans le cas non convexe (comme Rastrigin ou les réseaux de neurones profonds), l'algorithme doit naviguer dans des océans de minima locaux, de points de selle et de plateaux infinis. C'est pour cela que de simples règles de descente classiques s'avèrent inefficaces, et qu'on utilise des stratégies physiques (inertie) ou adaptatrices d'échelle !
        </TipBanner>
      </Section>

      <Section title="2. Algorithmes de Premier Ordre" icon="⚖️" color="indigo">
        <p className="mb-4">
          Le gradient d'une fonction, noté {"$\\nabla f$"}, est un vecteur qui pointe vers la pente de croissance locale la plus raide. En faisant un pas dans la direction opposée, nous sommes assurés de faire décroître l'altitude.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <FormulaBox 
            title="Descente de Gradient Standard (SGD)" 
            math={"x_{k+1} = x_k - \\eta \\nabla f(x_k)"} 
          />
          <FormulaBox 
            title="SGD avec Momentum (Inertie)" 
            math={"v_{k+1} = \\beta v_k + \\eta \\nabla f(x_k) \\quad ; \\quad x_{k+1} = x_k - v_{k+1}"} 
          />
        </div>

        <InfoBlock type="definition" title="Le rôle théorique de la constante d'accélération (Momentum)">
          Introduit à l'origine par Boris Polyak sous le nom du théorème de la 'Heavy-Ball' (boule lourde), le momentum associe un terme d'inertie {"$\\beta$"} à l'optimiseur. Si la direction de descente reste constante sur plusieurs étapes, la vitesse s'accumule phénoménalement, propulsant le point au-delà des zones rugueuses et des oscillations brusques des ravins profonds.
        </InfoBlock>
      </Section>

      <Section title="3. Simulateur Interactif d'Optimisation" icon="🎮" color="indigo">
        <GradientDescentInteractiveVisualizer />
      </Section>

      <Section title="🧠 Flashcards : Théories des Gradients" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous à conceptualiser les dynamiques de descente de gradient et les chemins de convergence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Pourquoi soustrait-on le gradient ({"$- \\eta \\nabla f$"}) pour minimiser une fonction ?</>}
            back={<>Parce que le gradient {"$\\nabla f$"} est le vecteur qui pointe vers la direction de <strong>croissance locale la plus raide</strong>. S&apos;y opposer garantit d&apos;aller vers le bas.</>}
          />
          <Flashcard 
            front={<>Quel est le risque d&apos;avoir un taux d&apos;apprentissage (learning rate) {"$\\eta$"} trop élevé ?</>}
            back={<>Le système risque de sauter par-dessus le minimum global, d&apos;osciller violemment de part et d&apos;autre du canyon et de finir par <strong>diverger</strong> de façon instable.</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice de Convergence et de Matrice Hessienne" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice Corrigé : Taux d'apprentissage optimal"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>On cherche à minimiser la fonction d'altitude quadratique bidimensionnelle :</p>
              {"$$f(x,y) = \\frac{1}{2} (x^2 + 10y^2)$$"}
              <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                <li>Calculer la matrice Hessienne {"$\\mathbf{H}$"} de cette fonction.</li>
                <li>Déterminer sa plus grande valeur propre {"$\\lambda_{max}$"}.</li>
                <li>En déduire le taux d'apprentissage maximal {"$\\eta_{max}$"} théorique au-dessus duquel la méthode de descente de gradient standard diverge.</li>
              </ol>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs text-slate-705">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Calculer la matrice Hessienne</p>
              <p>On calcule le vecteur gradient :</p>
              {"$$\\nabla f(x,y) = \\begin{pmatrix} \\partial f/\\partial x \\\\ \\partial f/\\partial y \\end{pmatrix} = \\begin{pmatrix} x \\\\ 10y \\end{pmatrix}$$"}
              <p>On évalue les dérivées secondes pour former la matrice de courbure Hessienne :</p>
              {"$$\\mathbf{H} = \\begin{pmatrix} \\partial^2 f/\\partial x^2 & \\partial^2 f/\\partial x \\partial y \\\\ \\partial^2 f/\\partial y \\partial x & \\partial^2 f/\\partial y^2 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 10 \\end{pmatrix}$$"}
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs text-slate-705">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Déduire les valeurs propres</p>
              <p>La matrice étant diagonale, ses valeurs propres s'identifient immédiatement sur la diagonale principale :</p>
              {"$$\\lambda_1 = 1 \\quad ; \\quad \\lambda_2 = 10$$"}
              <p>La valeur propre maximale de courbure est donc {"$\\lambda_{max} = 10$"}. Cet axe vertical est 10 fois plus courbé que l'axe horizontal, ce qui correspond géométriquement à un ravin très étroit.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-110 text-xs leading-relaxed">
              <p>Étape 3 : Taux d'apprentissage limite</p>
              <p>La théorie spectrale de la convergence de premier ordre énonce que le pas maximale admissible pour éviter l'explosion dynamique vaut :</p>
              {"$$\\eta_{max} = \\frac{2}{\\lambda_{max}} = \\frac{2}{10} = 0.2$$"}
              <p>Solution : Si l'utilisateur configure un taux d'apprentissage supérieur à 0.2 (par exemple 0.25), une petite oscillation sur l'axe y grandira géométriquement à chaque pas, menant à une divergence totale de l'algorithme. C'est pourquoi la connaissance de la matrice Hessienne est cruciale pour réguler les pas !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Épreuve de Certification" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Pourquoi l'algorithme de descente de gradient classique (SGD) a-t-il tendance à osciller fortement dans les ravins étroits ?",
              options: [
                "Parce que le pas de gradient cherche toujours à reculer vers l'origine",
                "Parce que la pente est extrêmement raide sur les parois du ravin, mais plate le long de son lit, poussant l'algorithme à shooter d'un flanc à l'autre",
                "Parce que les fonctions convexes n'ont pas de dérivée admissible sur les bords"
              ],
              correctAnswer: 1,
              explanation: "Dans un ravin étroit (comme notre relief banane), les dérivées perpendiculaires à la vallée sont gigantesques comparées aux dérivées le long du lit du ravin. Le gradient pointe donc quasi-perpendicularément à la vallée, causant d'affreux rebonds latéraux inefficaces."
            },
            {
              question: "Quel rôle joue le paramètre d'amortissement epsilon (e-8) dans le dénominateur de l'algorithme adaptatif Adam ?",
              options: [
                "Il accélère la convergence linéaire globale",
                "Il empêche l'algorithme de planter par une division par zéro lorsque la moyenne des gradients cumulés devient nulle",
                "Il sert de terme d'amortissement harmonique physique"
              ],
              correctAnswer: 1,
              explanation: "Le terme epsilon (couramment fixé à 10^-8) est un terme de sécurité purement numérique. Pendant l'apprentissage, si un paramètre converge parfaitement, son gradient s'annule, ce qui annulerait également sa moyenne quadratique v_t. Diviser par la racine de v_t provoquerait alors une division par zéro mortelle pour le code d'apprentissage !"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Être capable de vérifier la convexité d'une fonction analytique à l'aide de sa Hessienne.",
            "Comprendre géométriquement les notions de minima locaux, points de selle et minimum global.",
            "Visualiser et interpréter le comportement oscillatoire d'une descente de gradient dans un ravin étroit.",
            "Savoir pourquoi Adam et les variantes adaptatives résolvent la disparité des gradients selon les directions."
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

export default Course_Post_Bac_Ingenieur_Descente_Gradient;
