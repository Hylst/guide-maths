import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, FormulaBox, TipBanner, InfoBlock
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';
import { 
  Search, 
  Layers, 
  HelpCircle, 
  Calculator, 
  Compass, 
  TrendingUp, 
  Hash, 
  Divide, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  X,
  AlertCircle,
  Square
} from 'lucide-react';

// =========================================================================
// INTERACTIVE CALCULATOR SUB-COMPONENTS
// =========================================================================

// 1. Pythagoras Calculator
const PythagorasCalc: React.FC = () => {
  const [mode, setMode] = useState<'hypotenuse' | 'side'>('hypotenuse');
  const [valA, setValA] = useState<number>(3);
  const [valB, setValB] = useState<number>(4);
  const [valC, setValC] = useState<number>(5);
  const [error, setError] = useState<string>('');

  const calculate = useMemo(() => {
    if (mode === 'hypotenuse') {
      const c2 = valA * valA + valB * valB;
      const c = Math.sqrt(c2);
      return {
        result: c,
        formula: `c = \\sqrt{a^2 + b^2} = \\sqrt{${valA}^2 + ${valB}^2} = \\sqrt{${c2}} \\approx ${c.toFixed(4)}`,
        explanation: `L'hypoténuse mesure environ ${c.toFixed(2)} cm.`
      };
    } else {
      if (valC <= valA) {
        return {
          result: 0,
          formula: `b = \\sqrt{c^2 - a^2}`,
          explanation: "Invalide : L'hypoténuse (c) doit être strictement supérieure au côté adjacent (a) !"
        };
      }
      const b2 = valC * valC - valA * valA;
      const b = Math.sqrt(b2);
      return {
        result: b,
        formula: `b = \\sqrt{c^2 - a^2} = \\sqrt{${valC}^2 - ${valA}^2} = \\sqrt{${b2}} \\approx ${b.toFixed(4)}`,
        explanation: `Le côté manquant mesure environ ${b.toFixed(2)} cm.`
      };
    }
  }, [mode, valA, valB, valC]);

  return (
    <div className="mt-4 p-5 bg-muted/60 dark:bg-slate-900/40 border border-border rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="font-bold flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-indigo-500" /> Simulateur de Pythagore</span>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => setMode('hypotenuse')}
            className={`px-2.5 py-1 rounded-lg font-bold ${mode === 'hypotenuse' ? 'bg-indigo-600 text-white shadow' : 'bg-card border text-muted-text'}`}
          >
            Trouver c (Hypoténuse)
          </button>
          <button 
            type="button"
            onClick={() => setMode('side')}
            className={`px-2.5 py-1 rounded-lg font-bold ${mode === 'side' ? 'bg-indigo-600 text-white shadow' : 'bg-card border text-muted-text'}`}
          >
            Trouver b (Un côté)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {mode === 'hypotenuse' ? (
          <>
            <div>
              <label className="block text-[10px] text-muted-text uppercase font-mono font-black mb-1">Côté a</label>
              <input 
                type="number" 
                value={valA} 
                onChange={(e) => setValA(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 rounded-xl border bg-card" 
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted-text uppercase font-mono font-black mb-1">Côté b</label>
              <input 
                type="number" 
                value={valB} 
                onChange={(e) => setValB(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 rounded-xl border bg-card" 
              />
            </div>
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 border border-indigo-100 dark:border-indigo-900/30 rounded-xl flex flex-col justify-center">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-600">Hypoténuse c²</span>
              <span className="text-sm font-black text-indigo-900 dark:text-indigo-200">{(valA*valA + valB*valB).toFixed(1)}</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-[10px] text-muted-text uppercase font-mono font-black mb-1">Côté Connu a</label>
              <input 
                type="number" 
                value={valA} 
                onChange={(e) => setValA(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 rounded-xl border bg-card" 
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted-text uppercase font-mono font-black mb-1">Hypoténuse c</label>
              <input 
                type="number" 
                value={valC} 
                onChange={(e) => setValC(Math.max(0.2, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 rounded-xl border bg-card" 
              />
            </div>
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 border border-indigo-100 dark:border-indigo-900/30 rounded-xl flex flex-col justify-center">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-600">Côté Restant b²</span>
              <span className="text-sm font-black text-indigo-900 dark:text-indigo-200">{(valC*valC - valA*valA > 0 ? valC*valC - valA*valA : 0).toFixed(1)}</span>
            </div>
          </>
        )}
      </div>

      <div className="p-3 bg-card border rounded-xl flex flex-col justify-center items-center text-center space-y-2">
        <span className="text-[10px] uppercase font-mono font-black text-muted-text">Équation appliquée :</span>
        <div className="py-1">
          <MathComponent math={calculate.formula} />
        </div>
        <p className="font-bold text-foreground text-xs">{calculate.explanation}</p>
      </div>
    </div>
  );
};

// 2. Discriminant / Second Degré Calculator
const DiscriminantCalc: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  const calculate = useMemo(() => {
    if (a === 0) {
      return {
        delta: 0,
        type: 'first_degree',
        formula: `x = -\\frac{c}{b} = -\\frac{${c}}{${b}} = ${(-c / b).toFixed(4)}`,
        explanation: "Puisque a = 0, nous sommes face à une équation du premier degré !"
      };
    }
    const delta = b * b - 4 * a * c;
    if (delta > 0) {
      const r1 = (-b - Math.sqrt(delta)) / (2 * a);
      const r2 = (-b + Math.sqrt(delta)) / (2 * a);
      return {
        delta,
        type: 'two_roots',
        formula: `\\Delta = ${b}^2 - 4(${a})(${c}) = ${delta} > 0 \\\\ x_1 = \\frac{-(${b}) - \\sqrt{${delta}}}{2(${a})} = ${r1.toFixed(3)} \\\\ x_2 = \\frac{-(${b}) + \\sqrt{${delta}}}{2(${a})} = ${r2.toFixed(3)}`,
        explanation: `Deux racines réelles distinctes : x₁ ≈ ${r1.toFixed(2)} et x₂ ≈ ${r2.toFixed(2)}.`
      };
    } else if (delta === 0) {
      const r0 = -b / (2 * a);
      return {
        delta,
        type: 'one_root',
        formula: `\\Delta = 0 \\\\ x_0 = \\frac{-(${b})}{2(${a})} = ${r0.toFixed(3)}`,
        explanation: `Une racine double réelle unique : x₀ = ${r0.toFixed(2)}.`
      };
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-delta) / (2 * a);
      return {
        delta,
        type: 'complex_roots',
        formula: `\\Delta = ${delta} < 0 \\\\ z_1 = ${real.toFixed(2)} - ${imag.toFixed(2)}i \\\\ z_2 = ${real.toFixed(2)} + ${imag.toFixed(2)}i`,
        explanation: "Aucune racine réelle. Deux racines complexes conjuguées."
      };
    }
  }, [a, b, c]);

  return (
    <div className="mt-4 p-5 bg-muted/60 dark:bg-slate-900/40 border border-border rounded-2xl text-xs space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="font-bold flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-indigo-500" /> Solveur d'équation (ax² + bx + c)</span>
        <span className="text-[10px] font-mono text-indigo-500 uppercase bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded font-black">Niveau 1ère & Sup</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] text-muted-text font-black uppercase font-mono mb-1">Coeff a</label>
          <input 
            type="number" 
            value={a} 
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-1.5 rounded-xl border bg-card" 
          />
        </div>
        <div>
          <label className="block text-[10px] text-muted-text font-black uppercase font-mono mb-1">Coeff b</label>
          <input 
            type="number" 
            value={b} 
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-1.5 rounded-xl border bg-card" 
          />
        </div>
        <div>
          <label className="block text-[10px] text-muted-text font-black uppercase font-mono mb-1">Coeff c</label>
          <input 
            type="number" 
            value={c} 
            onChange={(e) => setC(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-1.5 rounded-xl border bg-card" 
          />
        </div>
      </div>

      <div className="p-3 bg-card border rounded-xl flex flex-col justify-center items-center text-center space-y-2">
        <span className="text-[10px] uppercase font-mono font-black text-muted-text">Calcul du Discriminant & Racines :</span>
        <div className="py-2 overflow-x-auto max-w-full">
          <MathComponent math={calculate.formula} />
        </div>
        <p className="font-bold text-foreground text-xs">{calculate.explanation}</p>
      </div>
    </div>
  );
};

// 3. Trigonometry Calculator
const TrigonometryCalc: React.FC = () => {
  const [degAngle, setDegAngle] = useState<number>(30);

  const stats = useMemo(() => {
    const rad = (degAngle * Math.PI) / 180;
    const cosV = Math.cos(rad);
    const sinV = Math.sin(rad);
    const tanV = cosV !== 0 ? Math.tan(rad) : NaN;
    const cos2sin2 = cosV * cosV + sinV * sinV;

    return {
      rad,
      cosV,
      sinV,
      tanV,
      cos2sin2
    };
  }, [degAngle]);

  return (
    <div className="mt-4 p-5 bg-muted/60 dark:bg-slate-900/40 border border-border rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="font-bold flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-emerald-500" /> Observateur du Cercle Trigonométrique</span>
        <span className="text-[10px] font-mono text-emerald-600 uppercase bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded font-black">Interactif 2D</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="font-medium">Angle θ (en degrés) :</span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{degAngle}° (≈ {stats.rad.toFixed(3)} rad)</span>
        </div>
        <input 
          type="range"
          min="0"
          max="360"
          step="5"
          value={degAngle}
          onChange={(e) => setDegAngle(parseInt(e.target.value))}
          className="w-full h-1.5 bg-card border rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Unit Circle Miniature Plot */}
        <div className="bg-card border p-3 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase font-mono font-black text-muted-text mb-2 block">Vecteur Position (cos θ, sin θ)</span>
          <svg width="110" height="110" className="overflow-visible select-none">
            {/* Axis grid */}
            <circle cx="55" cy="55" r="40" fill="none" stroke="rgba(0,0,0,0.06)" className="dark:stroke-white/10" strokeWidth="1.5" />
            <line x1="10" y1="55" x2="100" y2="55" stroke="rgba(0,0,0,0.15)" className="dark:stroke-white/20" strokeWidth="1" />
            <line x1="55" y1="10" x2="55" y2="100" stroke="rgba(0,0,0,0.15)" className="dark:stroke-white/20" strokeWidth="1" />
            
            {/* Angle vector line */}
            {(() => {
              const vx = 55 + 40 * stats.cosV;
              const vy = 55 - 40 * stats.sinV;
              return (
                <>
                  <line x1="55" y1="55" x2={vx} y2={vy} stroke="#10b981" strokeWidth="2.5" />
                  <circle cx={vx} cy={vy} r="4" className="fill-emerald-500 stroke-white" strokeWidth="1.5" />
                  <text x={vx + 6} y={vy - 6} fontSize="8" className="fill-emerald-600 font-bold dark:fill-emerald-400">θ</text>
                </>
              );
            })()}
          </svg>
        </div>

        {/* Math results list */}
        <div className="bg-card border p-3 rounded-2xl flex flex-col justify-between space-y-1.5 text-[11px] font-mono">
          <div className="flex justify-between border-b border-border/50 pb-1">
            <span className="text-muted-text">cos(θ) :</span>
            <span className="font-bold text-foreground">{stats.cosV.toFixed(4)}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-1">
            <span className="text-muted-text">sin(θ) :</span>
            <span className="font-bold text-foreground">{stats.sinV.toFixed(4)}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-1">
            <span className="text-muted-text">tan(θ) :</span>
            <span className="font-bold text-foreground">{isNaN(stats.tanV) ? 'Indéfinie' : stats.tanV.toFixed(4)}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-emerald-500 font-black">cos² + sin²:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.cos2sin2.toFixed(1)} (= 1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Binomial Distribution Calculator
const BinomialCalc: React.FC = () => {
  const [n, setN] = useState<number>(10);
  const [p, setP] = useState<number>(0.5);
  const [k, setK] = useState<number>(5);

  const choose = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    const fact = (num: number): number => {
      let r = 1;
      for (let i = 2; i <= num; i++) r *= i;
      return r;
    };
    return Math.round(fact(n) / (fact(k) * fact(n - k)));
  };

  const calculate = useMemo(() => {
    const coeff = choose(n, k);
    const proba = coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
    
    // Mean and standard deviation
    const mean = n * p;
    const stdDev = Math.sqrt(n * p * (1 - p));

    return {
      coeff,
      proba,
      mean,
      stdDev
    };
  }, [n, p, k]);

  return (
    <div className="mt-4 p-5 bg-muted/60 dark:bg-slate-900/40 border border-border rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="font-bold flex items-center gap-1.5"><Hash className="w-3.5 h-3.5 text-rose-500" /> Calculateur Loi Binomiale</span>
        <span className="text-[10px] font-mono text-rose-600 uppercase bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded font-black">Niveau Terminale</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* N input */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-bold text-[10px] text-muted-text font-mono uppercase">Lancers n :</span>
            <span className="font-bold font-mono">{n}</span>
          </div>
          <input 
            type="range"
            min="1"
            max="15"
            step="1"
            value={n}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setN(val);
              if (k > val) setK(val);
            }}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* P input */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-bold text-[10px] text-muted-text font-mono uppercase">Proba p :</span>
            <span className="font-bold font-mono">{p.toFixed(2)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={p}
            onChange={(e) => setP(parseFloat(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* K input */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-bold text-[10px] text-muted-text font-mono uppercase">Succès k :</span>
            <span className="font-bold font-mono">{k}</span>
          </div>
          <input 
            type="range"
            min="0"
            max={n}
            step="1"
            value={k}
            onChange={(e) => setK(parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Probability Box details */}
      <div className="p-3 bg-card border rounded-xl flex flex-col justify-center items-center text-center space-y-2">
        <span className="text-[10px] uppercase font-mono font-black text-muted-text">Application Formule Binomiale :</span>
        <div className="py-2 overflow-x-auto max-w-full">
          <MathComponent 
            math={`P(X = ${k}) = \\binom{${n}}{${k}} \\times ${p.toFixed(2)}^{${k}} \\times ${((1-p)).toFixed(2)}^{${n-k}}`} 
          />
        </div>
        <div className="text-xs font-bold text-foreground">
          Combinaisons <MathComponent math={`\\binom{n}{k}`} /> = <span className="text-indigo-600">{calculate.coeff}</span> • Résultat : <span className="text-emerald-600">P(X = {k}) ≈ {(calculate.proba * 100).toFixed(4)} %</span>
        </div>
        <div className="text-[10px] font-mono text-muted-text flex gap-4">
          <span>Espérance E(X) = n.p = {calculate.mean.toFixed(2)}</span>
          <span>Écart-type σ ≈ {calculate.stdDev.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};

// 5. Sequence Calculator
const SequenceCalc: React.FC = () => {
  const [seqType, setSeqType] = useState<'arith' | 'geom'>('arith');
  const [u0, setU0] = useState<number>(2);
  const [stepVal, setStepVal] = useState<number>(3);
  const [targetN, setTargetN] = useState<number>(8);

  const calculate = useMemo(() => {
    if (seqType === 'arith') {
      const un = u0 + targetN * stepVal;
      const sum = ((targetN + 1) * (u0 + un)) / 2;
      return {
        formula: `u_{${targetN}} = u_0 + n \\cdot r = ${u0} + ${targetN} \\cdot ${stepVal} = ${un}`,
        sumFormula: `S_{${targetN}} = \\frac{(${targetN}+1)(u_0 + u_{${targetN}})}{2} = \\frac{${targetN + 1}(${u0} + ${un})}{2} = ${sum}`,
        term: un,
        sumTotal: sum
      };
    } else {
      const un = u0 * Math.pow(stepVal, targetN);
      let sum = 0;
      if (stepVal === 1) {
        sum = u0 * (targetN + 1);
      } else {
        sum = u0 * ((1 - Math.pow(stepVal, targetN + 1)) / (1 - stepVal));
      }
      return {
        formula: `u_{${targetN}} = u_0 \\cdot q^n = ${u0} \\cdot ${stepVal}^{${targetN}} = ${un.toFixed(2)}`,
        sumFormula: `S_{${targetN}} = u_0 \\frac{1-q^{${targetN}+1}}{1-q} = ${u0} \\frac{1-${stepVal}^{${targetN + 1}}}{1-${stepVal}} = ${sum.toFixed(2)}`,
        term: un,
        sumTotal: sum
      };
    }
  }, [seqType, u0, stepVal, targetN]);

  return (
    <div className="mt-4 p-5 bg-muted/60 dark:bg-slate-900/40 border border-border rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="font-bold flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Calculateur Sommation & Indices de Suites</span>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => { setSeqType('arith'); setStepVal(3); }}
            className={`px-2.5 py-1 rounded-lg font-bold ${seqType === 'arith' ? 'bg-indigo-600 text-white shadow' : 'bg-card border text-muted-text'}`}
          >
            Arithmétique
          </button>
          <button 
            type="button"
            onClick={() => { setSeqType('geom'); setStepVal(2); }}
            className={`px-2.5 py-1 rounded-lg font-bold ${seqType === 'geom' ? 'bg-indigo-600 text-white shadow' : 'bg-card border text-muted-text'}`}
          >
            Géométrique
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        <div>
          <label className="block text-[9px] text-muted-text font-black uppercase font-mono mb-1">Premier Terme u0</label>
          <input 
            type="number" 
            value={u0} 
            onChange={(e) => setU0(parseFloat(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-xl border bg-card" 
          />
        </div>
        <div>
          <label className="block text-[9px] text-muted-text font-black uppercase font-mono mb-1">
            {seqType === 'arith' ? 'Raison (r)' : 'Raison (q)'}
          </label>
          <input 
            type="number" 
            value={stepVal} 
            onChange={(e) => setStepVal(parseFloat(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-xl border bg-card" 
          />
        </div>
        <div>
          <label className="block text-[9px] text-muted-text font-black uppercase font-mono mb-1">Indice Target n</label>
          <input 
            type="number" 
            min="0"
            max="40"
            value={targetN} 
            onChange={(e) => setTargetN(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-2.5 py-1.5 rounded-xl border bg-card" 
          />
        </div>
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 px-2 rounded-xl flex flex-col justify-center">
          <span className="text-[9px] uppercase font-mono font-black text-indigo-600">Calcul u_n</span>
          <span className="text-xs font-black text-indigo-900 dark:text-indigo-200">{calculate.term.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-3 bg-card border rounded-xl flex flex-col justify-center items-center text-center space-y-2">
        <span className="text-[10px] uppercase font-mono font-black text-muted-text">Équations de suite appliquées :</span>
        <div className="py-2 flex flex-col gap-2 border-b w-full items-center">
          <MathComponent math={calculate.formula} />
          <MathComponent math={calculate.sumFormula} />
        </div>
        <p className="font-bold text-foreground text-xs">
          Somme cumulée S_{targetN} = <span className="text-emerald-500">{calculate.sumTotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};


// =========================================================================
// MATH FORMULARY REGISTRY (TS DATA)
// =========================================================================

interface FormulaItem {
  id: string;
  category: 'algebra_analysis' | 'geometry_trig' | 'proba_stats' | 'sequences_limits' | 'post_bac';
  categoryLabel: string;
  level: string;
  title: string;
  math: string;
  description: string;
  example: string;
  calculatorType?: 'pythagoras' | 'discriminant' | 'trigonometry' | 'binomial' | 'sequence';
}

const FORMULARY_DATABASE: FormulaItem[] = [
  // Categoris: algebra_analysis
  {
    id: "identites",
    category: "algebra_analysis",
    categoryLabel: "Algèbre & Analyse",
    level: "Collège & Lycée",
    title: "Identités Remarquables (Développer & Factoriser)",
    math: "(a+b)^2 = a^2 + 2ab + b^2 \\\\ (a-b)^2 = a^2 - 2ab + b^2 \\\\ (a-b)(a+b) = a^2 - b^2",
    description: "Permet de factoriser des polynômes et simplifier des calculs littéraux critiques.",
    example: "Pour développer (2x + 3)², on applique la première formule avec a=2x et b=3 : (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9."
  },
  {
    id: "second_deg",
    category: "algebra_analysis",
    categoryLabel: "Algèbre & Analyse",
    level: "Première Générale",
    title: "Discriminant d'un Second Degré",
    math: "\\Delta = b^2 - 4ac \\\\ x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} \\quad ; \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} \\quad (\\Delta > 0)",
    description: "Résolution systématique de l'équation parabolique ax² + bx + c = 0. Si le discriminant delta est nul, il y a une racine double réelle unique.",
    example: "Pour x² - 5x + 6 = 0: a=1, b=-5, c=6. Delta = 25 - 24 = 1. Racines: x₁=2, x₂=3.",
    calculatorType: "discriminant"
  },
  {
    id: "derivees_ref",
    category: "algebra_analysis",
    categoryLabel: "Algèbre & Analyse",
    level: "Lycée",
    title: "Dérivées de Références Usuelles",
    math: "\\frac{d}{dx}(x^n) = n x^{n-1} \\quad \\frac{d}{dx}(e^x) = e^x \\\\ \\frac{d}{dx}(\\ln x) = \\frac{1}{x} \\quad \\frac{d}{dx}(\\sqrt{x}) = \\frac{1}{2\\sqrt{x}}",
    description: "Formules représentant le coefficient directeur instantané nécessaire à la détection du sens de variation.",
    example: "La dérivée de la fonction polynomiale f(x) = x³ - 4x est f'(x) = 3x² - 4."
  },
  {
    id: "derivees_ops",
    category: "algebra_analysis",
    categoryLabel: "Algèbre & Analyse",
    level: "Lycée",
    title: "Opérations sur les Dérivées",
    math: "(u+v)' = u' + v' \\quad (uv)' = u'v + uv' \\\\ \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2} \\quad (u \\circ v)' = (u' \\circ v) \\times v'",
    description: "Comment dériver de manière structurée les combinaisons de plusieurs sous-fonctions.",
    example: "Pour dériver f(x) = x.ln(x), on utilise (uv)' avec u=x, v=ln(x): f'(x) = 1.ln(x) + x.(1/x) = ln(x) + 1."
  },

  // Category: geometry_trig
  {
    id: "pythagore",
    category: "geometry_trig",
    categoryLabel: "Géométrie & Trigonométrie",
    level: "Collège",
    title: "Théorème de Pythagore",
    math: "a^2 + b^2 = c^2 \\iff c = \\sqrt{a^2 + b^2}",
    description: "Dans un triangle rectangle, le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.",
    example: "Si les deux côtés perpendiculaires mesurent 3 cm et 4 cm, l'hypoténuse est c = √(3² + 4²) = √25 = 5 cm.",
    calculatorType: "pythagoras"
  },
  {
    id: "relations_trig",
    category: "geometry_trig",
    categoryLabel: "Géométrie & Trigonométrie",
    level: "Lycée",
    title: "Relations Fondamentales sur le Cercle Trigonométrique",
    math: "\\cos^2(x) + \\sin^2(x) = 1 \\quad ; \\quad \\tan(x) = \\frac{\\sin(x)}{\\cos(x)}",
    description: "Définition vectorielle liant l'ordonnée et l'abscisse de la sphère unitaire.",
    example: "Si l'on sait que sin(x) = 0.6 et x est compris entre 0 et 90°, cos(x) = √(1 - 0.36) = √0.64 = 0.8.",
    calculatorType: "trigonometry"
  },
  {
    id: "addition_trig",
    category: "geometry_trig",
    categoryLabel: "Géométrie & Trigonométrie",
    level: "Terminale & Sup",
    title: "Formules d'Addition Trigonométriques",
    math: "\\cos(a+b) = \\cos a\\cos b - \\sin a\\sin b \\\\ \\sin(a+b) = \\sin a\\cos b + \\cos a\\sin b",
    description: "Extrêmement utiles en électricité alternative, oscillateurs mécaniques et décomposition d'harmoniques.",
    example: "cos(2x) = cos(x+x) = cos²(x) - sin²(x)."
  },

  // Category: proba_stats
  {
    id: "binomiale",
    category: "proba_stats",
    categoryLabel: "Probabilités & Stats",
    level: "Première & Terminale",
    title: "Loi Binomiale (Schéma de Bernoulli)",
    math: "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k} \\\\ \\binom{n}{k} = \\frac{n!}{k!(n-k)!}",
    description: "Permet de mesurer précisément le nombre d'occurrences d'une variable aléatoire discrète modélisant des épreuves répétées disjointes.",
    example: "Lancer 5 pièces d'or équilibrées: n=5, p=0.5, k=3 succès (piles). P(X=3) = 10 * 0.5³ * 0.5² = 0.3125 (31.25%).",
    calculatorType: "binomial"
  },
  {
    id: "proba_totales",
    category: "proba_stats",
    categoryLabel: "Probabilités & Stats",
    level: "Lycée",
    title: "Formule des Probabilités Conditions & Totales",
    math: "P_A(B) = \\frac{P(A \\cap B)}{P(A)} \\\\ P(B) = \\sum_{i=1}^m P(A_i) \\times P_{A_i}(B)",
    description: "Comment diviser l'arbre des probabilités pour calculer l'apparition globale d'un phénomène.",
    example: "Si deux ateliers produisent des vis (Atelier A à 60% avec 2% de défauts, Atelier B à 40% avec 5% de défauts). P(Défaut) = 0.60*0.02 + 0.40*0.05 = 0.032 (3.2%)."
  },

  // Category: sequences_limits
  {
    id: "suites_prop",
    category: "sequences_limits",
    categoryLabel: "Suites & Limites",
    level: "Lycée",
    title: "Suites Arithmétiques & Géométriques",
    math: "\\text{Arithmétique : } u_n = u_0 + n.r \\quad ; \\quad S_n = \\frac{(n+1)(u_0 + u_n)}{2} \\\\ \\text{Géométrique : } u_n = u_0 . q^n \\quad ; \\quad S_n = u_0 \\frac{1-q^{n+1}}{1-q}",
    description: "Formules de termes généraux et sommes des termes cumulés pour des progressions régulières.",
    example: "Suite géométrique de terme de départ u0 = 3, raison q = 2. Le terme u5 = 3 * 2⁵ = 96.",
    calculatorType: "sequence"
  },
  {
    id: "croissances_comp",
    category: "sequences_limits",
    categoryLabel: "Suites & Limites",
    level: "Terminale & Sup",
    title: "Théorème de Croissances Comparées",
    math: "\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\quad ; \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x^n} = 0 \\quad (n > 0)",
    description: "Savoir laquelle l'emporte à l'infini pour lever facilement les formes indéterminées.",
    example: "Puisque l'exponentielle écrase les monômes, la limite de f(x) = e^x - x² quand x tend vers +infini est +infini."
  },

  // Category: post_bac
  {
    id: "euler_moivre",
    category: "post_bac",
    categoryLabel: "Post-Bac / Classes Préparatoires",
    level: "Post-Bac / Experts",
    title: "Formules d'Euler & De Moivre",
    math: "\\cos(x) = \\frac{e^{ix} + e^{-ix}}{2} \\quad ; \\quad \\sin(x) = \\frac{e^{ix} - e^{-ix}}{2i} \\\\ (\\cos x + i \\sin x)^n = \\cos(nx) + i \\sin(nx)",
    description: "Le pont magique reliant les fonctions trigonométriques pures à l'exponentielle imaginaire complexe.",
    example: "L'identité d'Euler célèbre se déduit si x=pi: e^(i.pi) = cos(pi) + i.sin(pi) = -1 + 0 = -1, d'où: e^(i.pi) + 1 = 0."
  },
  {
    id: "taylor_young",
    category: "post_bac",
    categoryLabel: "Post-Bac / Classes Préparatoires",
    level: "Classes Préparatoires / Licence",
    title: "Développement Limité de Taylor-Young",
    math: "f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x-a)^k + o\\big((x-a)^n\\big) \\\\ e^x = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\dots + \\frac{x^n}{n!} + o(x^n)",
    description: "Approximation locale d'une fonction analytique de classe C^n au voisinage d'un point sous forme d'un polynôme fini.",
    example: "Au voisinage de 0, cos(x) s'approche de 1 - x² / 2. Pratique pour intégrer ce qui n'est pas simple au départ."
  }
];

// =========================================================================
// MAIN COMPONENT EXPORT
// =========================================================================

const Course_Ressources_Formulaire: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  
  // Track expanded calculators indices
  const [expandedCalcs, setExpandedCalcs] = useState<Record<string, boolean>>({});

  const toggleCalculator = (id: string) => {
    setExpandedCalcs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter formulas based on category tab, level dropdown, and search query
  const filteredFormulas = useMemo(() => {
    return FORMULARY_DATABASE.filter(item => {
      // 1. Tab filter
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false;
      }
      
      // 2. Level filter
      if (selectedLevel !== 'all') {
        if (selectedLevel === 'college' && !item.level.includes('Collège')) return false;
        if (selectedLevel === 'lycee' && !item.level.includes('Lycée') && !item.level.includes('Générale') && !item.level.includes('Terminale') && !item.level.includes('Première')) return false;
        if (selectedLevel === 'post_bac' && !item.category.includes('post_bac') && !item.level.includes('Post-Bac')) return false;
      }

      // 3. Search text query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inExample = item.example.toLowerCase().includes(query);
        const inCategory = item.categoryLabel.toLowerCase().includes(query);
        const inLevel = item.level.toLowerCase().includes(query);
        return inTitle || inDesc || inExample || inCategory || inLevel;
      }

      return true;
    });
  }, [searchQuery, activeTab, selectedLevel]);

  // Available Category tabs list
  const tabsList = [
    { id: 'all', label: 'Toutes les formules' },
    { id: 'algebra_analysis', label: 'Algèbre & Analyse' },
    { id: 'geometry_trig', label: 'Géométrie & Trigo' },
    { id: 'proba_stats', label: 'Probabilités & Stats' },
    { id: 'sequences_limits', label: 'Suites & Limites' },
    { id: 'post_bac', label: 'Post-Bac & Sup' }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="RES-FORM"
        title="Formulaire de Mathématiques"
        subtitle="Ta bible des formules fondamentales du Collège au Post-Bac. Filtre par branche, cherche en direct et lance les simulateurs de calcul numériques !"
        duration="Interactif"
      />

      {/* Main search and filter layout */}
      <div className="bg-card border border-border-strong rounded-3xl p-6 shadow-sm mb-10 space-y-5">
        
        {/* Search header & level filter grid */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar input with live binding */}
          <div className="relative w-full md:w-3/5 text-xs text-foreground bg-muted dark:bg-slate-900 rounded-2xl border border-border transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 flex items-center px-3.5 py-1.5">
            <Search className="w-4 h-4 text-muted-text flex-shrink-0 mr-2.5" />
            <input 
              type="text"
              placeholder="Rechercher une formule (ex: second degré, dérivée, sinus, Pythagore...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 ring-0 focus:outline-none py-1 text-sm placeholder-muted-text/75"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-muted-text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sizing dropdown selection for Levels */}
          <div className="flex items-center gap-2 w-full md:w-auto self-stretch md:self-auto justify-end">
            <span className="text-xs text-muted-text font-bold whitespace-nowrap">Niveau d'étude :</span>
            <select
              aria-label="Sélection de niveau d'étude"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3.5 py-2.5 bg-muted dark:bg-slate-900 border border-border rounded-xl text-xs font-bold text-foreground focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <option value="all">Tous Niveaux</option>
              <option value="college">Collège (6ème à 3ème)</option>
              <option value="lycee">Lycée (2nde à Terminale)</option>
              <option value="post_bac">Supérieur (Prépas / Universités)</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex border-b border-border/80 overflow-x-auto hide-scrollbar p-1 gap-1">
          {tabsList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all relative ${
                activeTab === tab.id 
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 shadow-sm' 
                  : 'text-muted-text hover:text-foreground hover:bg-slate-100/40 dark:hover:bg-slate-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Help indicators */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-text pt-1 border-t border-border/40">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Astuce : Clique sur le bouton orange <strong>🧮 Ouvrir le Simulateur</strong> pour calculer vos chiffres réels.
          </span>
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {filteredFormulas.length} formule{filteredFormulas.length > 1 ? 's' : ''} trouvée{filteredFormulas.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Main Formula list mapping */}
      <div className="space-y-8">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((item) => {
            const isCalcOpen = !!expandedCalcs[item.id];
            
            return (
              <div 
                key={item.id}
                className="bg-card border border-border-strong rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Visual side highlights decor */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  item.category === 'algebra_analysis' ? 'bg-indigo-500' :
                  item.category === 'geometry_trig' ? 'bg-emerald-500' :
                  item.category === 'proba_stats' ? 'bg-rose-500' :
                  item.category === 'sequences_limits' ? 'bg-purple-500' : 'bg-amber-500'
                }`} />

                {/* Sub-header tags row */}
                <div className="flex justify-between items-start mb-4 pl-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#10b981] bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
                    {item.level}
                  </span>
                  <span className="text-[10px] font-mono text-muted-text-subtle uppercase">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Form Title */}
                <h3 className="text-lg md:text-xl font-black text-foreground mb-4 pl-2 leading-tight">
                  {item.title}
                </h3>

                {/* Main Rendered block math box */}
                <div className="my-5 p-6 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl flex items-center justify-center overflow-x-auto">
                  <div className="text-sm md:text-base text-center text-indigo-900 dark:text-indigo-100 font-bold max-w-full">
                    <MathComponent math={item.math} />
                  </div>
                </div>

                {/* Description details */}
                <div className="space-y-3 text-xs md:text-sm pl-2 mb-4">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                  <div className="p-3 bg-muted rounded-xl text-xs flex flex-col gap-1 text-muted-text border border-border">
                    <span className="font-bold text-[10px] uppercase font-mono text-foreground">Exemple Pratique :</span>
                    <span className="leading-relaxed font-serif">{item.example}</span>
                  </div>
                </div>

                {/* Dynamic mini action tools drawer */}
                {item.calculatorType && (
                  <div className="pt-2 pl-2">
                    <button
                      type="button"
                      onClick={() => toggleCalculator(item.id)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 font-bold text-xs rounded-xl shadow-sm text-slate-950 flex items-center gap-1.5 transition-all select-none"
                    >
                      <Calculator className="w-4 h-4" /> 
                      {isCalcOpen ? 'Masquer le simulateur...' : '🧮 Ouvrir le Simulateur Interactif'}
                      {isCalcOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Render exact calculator matching properties */}
                    {isCalcOpen && (
                      <div className="transition-all animate-fadeIn">
                        {item.calculatorType === 'pythagoras' && <PythagorasCalc />}
                        {item.calculatorType === 'discriminant' && <DiscriminantCalc />}
                        {item.calculatorType === 'trigonometry' && <TrigonometryCalc />}
                        {item.calculatorType === 'binomial' && <BinomialCalc />}
                        {item.calculatorType === 'sequence' && <SequenceCalc />}
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-card rounded-[2.5rem] border border-dashed border-border-strong flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="w-12 h-12 text-muted-text-subtle animate-spin" />
            <h3 className="text-lg font-bold text-foreground">Aucune formule correspondante</h3>
            <p className="text-xs text-muted-text leading-relaxed max-w-sm">
              Modifie ton filtre de catégories ou affine ta recherche ci-dessus pour d'autres options.
            </p>
            <button 
              type="button"
              onClick={() => { setSearchQuery(''); setActiveTab('all'); setSelectedLevel('all'); }}
              className="px-4 py-1.5 rounded-lg border text-xs font-bold hover:bg-muted text-primary"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Outro tip box */}
      <div className="mt-14">
        <InfoBlock type="reminder" title="Conseils de révision active pour les épreuves">
          N'essaie pas d'apprendre ces formules par cœur sans les appliquer ! Utilise nos exercices interactifs et nos simulateurs ci-dessus. Modifie sans réserve les curseurs pour voir l'effet immédiat des variables sur les coordonnées géométriques ou les indices polynomiaux.
        </InfoBlock>
      </div>
    </div>
  );
};

export default Course_Ressources_Formulaire;
