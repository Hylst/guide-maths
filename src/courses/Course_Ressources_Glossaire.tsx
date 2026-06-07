import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from '../components/MathComponent';
import { 
  Search, Brain, HelpCircle, GraduationCap, Sparkles, CheckCircle2, ChevronRight, RotateCcw, 
  Layers, Sliders, Play, Move, Zap, Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Term {
  word: string;
  definition: string;
  level: 'primaire' | 'college' | 'lycee' | 'superieur';
  category: 'Arithmétique' | 'Géométrie' | 'Algèbre' | 'Analyse' | 'Algorithmique';
  mathFormula?: string;
  explanation: string;
  illustrationId: string;
}

// ---------------------------------------------------------------------------
// SANDBOX COMPONENTS DEFINITIONS
// ---------------------------------------------------------------------------

// 1. Fractions Sandbox (Arithmétique)
const FractionSharingSandbox: React.FC = () => {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(8);

  // Safeguard
  const safeNum = Math.min(num, den);

  const radius = 90;
  const cx = 110;
  const cy = 110;

  // Generate pie sectors
  const sectors = [];
  for (let i = 0; i < den; i++) {
    const angleStart = (360 / den) * i - 90;
    const angleEnd = (360 / den) * (i + 1) - 90;
    
    const radStart = (angleStart * Math.PI) / 180;
    const radEnd = (angleEnd * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(radStart);
    const y1 = cy + radius * Math.sin(radStart);
    const x2 = cx + radius * Math.cos(radEnd);
    const y2 = cy + radius * Math.sin(radEnd);

    const largeArc = 360 / den > 180 ? 1 : 0;
    const isColored = i < safeNum;

    // SVG arc path
    const pathData = `
      M ${cx} ${cy}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

    sectors.push(
      <path
        key={i}
        d={pathData}
        className={`${
          isColored 
            ? 'fill-indigo-500 stroke-indigo-600 dark:fill-indigo-600 dark:stroke-indigo-400' 
            : 'fill-slate-100 stroke-slate-200 dark:fill-slate-800 dark:stroke-slate-700'
        } transition-colors duration-300 stroke-[1.5]`}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="relative shrink-0 w-[220px] h-[220px]">
        <svg width="220" height="220">
          <circle cx={cx} cy={cy} r={radius} className="stroke-slate-300 dark:stroke-slate-700 fill-none stroke-[2]" />
          {sectors}
        </svg>
      </div>
      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Ajustez la fraction</h4>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Numérateur (parts colorées) : <strong>{safeNum}</strong></span>
            </div>
            <input 
              type="range" min="1" max={den} value={safeNum} 
              onChange={(e) => setNum(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Dénominateur (parts totales) : <strong>{den}</strong></span>
            </div>
            <input 
              type="range" min="2" max="12" value={den} 
              onChange={(e) => {
                const newDen = parseInt(e.target.value, 10);
                setDen(newDen);
                if (num > newDen) setNum(newDen);
              }}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="p-3 bg-card rounded-xl border border-border-strong text-center">
          <span className="text-sm font-medium mr-2 text-muted-text">Proportion :</span>
          <span className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {safeNum} / {den} = {((safeNum / den) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

// 2. Relative Numbers Line (Arithmétique)
const RelativeNumberLineSandbox: React.FC = () => {
  const [val1, setVal1] = useState(3);
  const [val2, setVal2] = useState(-5);

  const startX = 140; // index zero represents x=140
  const stepWidth = 12; // units are spaced by 12px

  const result = val1 + val2;

  // Render scale marks from -10 to +10
  const marks = [];
  for (let i = -10; i <= 10; i++) {
    const x = startX + i * stepWidth;
    marks.push(
      <g key={i} className="select-none">
        <line x1={x} y1="40" x2={x} y2={i === 0 ? "52" : "46"} className={i === 0 ? "stroke-indigo-600 dark:stroke-indigo-400 stroke-2" : "stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]"} />
        {i % 2 === 0 && (
          <text x={x} y="64" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400 dark:fill-slate-500">
            {i > 0 ? `+${i}` : i}
          </text>
        )}
      </g>
    );
  }

  const arc1End = startX + val1 * stepWidth;
  const arc2End = startX + result * stepWidth;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[280px] h-[100px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="280" height="90">
          {/* Main line */}
          <line x1="10" y1="40" x2="270" y2="40" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
          {/* Arrow */}
          <polygon points="270,36 276,40 270,44" className="fill-slate-300 dark:fill-slate-700" />
          
          {marks}

          {/* First path arc (val1, blue color) */}
          {val1 !== 0 && (
            <path
              d={`M ${startX} 40 Q ${(startX + arc1End) / 2} 10 ${arc1End} 40`}
              fill="none"
              className="stroke-blue-500 dark:stroke-blue-400 stroke-[2.5]"
              markerEnd="url(#arrow-blue)"
            />
          )}

          {/* Second path arc (val2, emerald color) */}
          {val2 !== 0 && (
            <path
              d={`M ${arc1End} 40 Q ${(arc1End + arc2End) / 2} ${val2 > 0 ? 15 : 25} ${arc2End} 40`}
              fill="none"
              className="stroke-emerald-500 dark:stroke-emerald-400 stroke-[2.5]"
            />
          )}

          {/* Points dot */}
          <circle cx={startX} cy="40" r="4" className="fill-slate-400" />
          <circle cx={arc1End} cy="40" r="4.5" className="fill-blue-500 dark:fill-blue-400" />
          <circle cx={arc2End} cy="40" r="5" className="fill-emerald-500 dark:fill-emerald-400 animate-pulse" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Additionner des relatifs</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-semibold block mb-1">Nombre 1 : <strong className="text-blue-600">{val1 > 0 ? `+${val1}` : val1}</strong></span>
            <input 
              type="range" min="-5" max="5" value={val1} 
              onChange={(e) => setVal1(parseInt(e.target.value, 10))}
              className="w-full accent-blue-500"
            />
          </div>
          <div>
            <span className="text-xs font-semibold block mb-1">Nombre 2 : <strong className="text-emerald-600">{val2 > 0 ? `+${val2}` : val2}</strong></span>
            <input 
              type="range" min="-5" max="5" value={val2} 
              onChange={(e) => setVal2(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 rounded-xl text-center">
          <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wide mb-1">Équation Linéaire</p>
          <span className="font-mono text-base font-bold text-foreground">
            ({val1 > 0 ? `+${val1}` : val1}) + ({val2 > 0 ? `+${val2}` : val2}) = <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{result > 0 ? `+${result}` : result}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// 3. Pythagoras Theorem Sandbox (Géométrie)
const PythagoreanTheoremSandbox: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);

  const scale = 20;
  const ox = 70;
  const oy = 210;

  // Scaled coordinates
  const ax = ox + a * scale;
  const ay = oy;
  const bx = ox;
  const by = oy - b * scale;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[280px] h-[280px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center relative overflow-hidden">
        <svg width="280" height="280">
          <g>
            {/* Draw side A square */}
            <rect x={ox} y={oy} width={a * scale} height={a * scale} className="fill-rose-500/10 stroke-rose-500/50 stroke-1 stroke-dasharray-[2]" />
            {/* Draw side B square */}
            <rect x={ox - b * scale} y={oy - b * scale} width={b * scale} height={b * scale} className="fill-blue-500/10 stroke-blue-500/50 stroke-1 stroke-dasharray-[2]" />
            
            {/* Hypotenuse rotation square */}
            <polygon 
              points={`
                ${ax},${ay} 
                ${ax - b * scale},${ay - a * scale} 
                ${bx - b * scale},${by - a * scale} 
                ${bx},${by}
              `} 
              className="fill-emerald-500/10 stroke-emerald-500/50 stroke-1 stroke-dasharray-[2]" 
            />

            {/* Main triangle */}
            <polygon points={`${ox},${oy} ${ax},${ay} ${bx},${by}`} className="fill-slate-100 dark:fill-slate-800 stroke-slate-900 dark:stroke-slate-100 stroke-2" />

            {/* Vertices indicator labels */}
            <text x={ox + (a * scale) / 2} y={oy + 14} textAnchor="middle" className="text-[10px] font-bold fill-rose-600 dark:fill-rose-400">a = {a}</text>
            <text x={ox - 14} y={oy - (b * scale) / 2} textAnchor="end" className="text-[10px] font-bold fill-blue-600 dark:fill-blue-400">b = {b}</text>
            <text x={ox + (a * scale) / 2 + 10} y={oy - (b * scale) / 2 - 10} textAnchor="middle" className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400">c</text>

            {/* Right angle sign */}
            <rect x={ox} y={oy - 8} width="8" height="8" className="fill-none stroke-slate-500" />
          </g>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Vérifiez les carrés d'aires</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-semibold block mb-1">Côté adjacent a : <strong>{a}</strong></span>
            <input 
              type="range" min="2" max="6" value={a} 
              onChange={(e) => setA(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500"
            />
          </div>
          <div>
            <span className="text-xs font-semibold block mb-1">Côté opposé b : <strong>{b}</strong></span>
            <input 
              type="range" min="2" max="6" value={b} 
              onChange={(e) => setB(parseInt(e.target.value, 10))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        <div className="p-3 bg-card border border-border-strong rounded-xl text-xs space-y-1.5 font-mono">
          <p className="font-sans font-bold text-foreground text-sm border-b pb-1 mb-1 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-500" /> Relations géométriques :
          </p>
          <div className="flex justify-between">
            <span className="text-rose-500">Aire Carré Opposé (a²) :</span>
            <span>{a}² = <strong>{a * a}</strong></span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-500">Aire Carré Adjacent (b²) :</span>
            <span>{b}² = <strong>{b * b}</strong></span>
          </div>
          <div className="flex justify-between border-t pt-1 font-bold text-emerald-500">
            <span>Aire Hypoténuse (c² = a² + b²) :</span>
            <span>{a*a} + {b*b} = <strong>{a*a + b*b}</strong></span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 italic text-center">
            Hypoténuse c = √{a*a + b*b} ≈ {Math.sqrt(a*a + b*b).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Barycenter Sandbox (Géométrie)
const BarycenterSandbox: React.FC = () => {
  const [wA, setWA] = useState(3);
  const [wB, setWB] = useState(3);
  const [wC, setWC] = useState(3);

  // Vertices of triangle
  const A = { x: 130, y: 40 };
  const B = { x: 40, y: 200 };
  const C = { x: 220, y: 200 };

  // Calculate coordinates of interactive weighted barycenter
  const totalW = wA + wB + wC;
  const G = {
    x: (wA * A.x + wB * B.x + wC * C.x) / totalW,
    y: (wA * A.y + wB * B.y + wC * C.y) / totalW
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[260px] h-[240px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="260" height="240">
          {/* Main Triangle lines */}
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} className="fill-slate-50 dark:fill-slate-900/50 stroke-slate-300 dark:stroke-slate-700 stroke-2" />

          {/* Attraction strings from vertices to barycenter */}
          <line x1={A.x} y1={A.y} x2={G.x} y2={G.y} className="stroke-indigo-400 dark:stroke-indigo-600 stroke-[2] stroke-dasharray-[3]" />
          <line x1={B.x} y1={B.y} x2={G.x} y2={G.y} className="stroke-emerald-400 dark:stroke-emerald-600 stroke-[2] stroke-dasharray-[3]" />
          <line x1={C.x} y1={C.y} x2={G.x} y2={G.y} className="stroke-amber-400 dark:stroke-amber-600 stroke-[2] stroke-dasharray-[3]" />

          {/* Nodes */}
          <circle cx={A.x} cy={A.y} r={6 + wA*0.7} className="fill-indigo-500 stroke-white dark:stroke-slate-950 stroke-2" />
          <text x={A.x} y={A.y - 12} textAnchor="middle" className="text-[10px] font-black fill-indigo-600 dark:fill-indigo-400">A (w={wA})</text>

          <circle cx={B.x} cy={B.y} r={6 + wB*0.7} className="fill-emerald-500 stroke-white dark:stroke-slate-950 stroke-2" />
          <text x={B.x - 12} y={B.y + 12} textAnchor="middle" className="text-[10px] font-black fill-emerald-600 dark:fill-emerald-400">B (w={wB})</text>

          <circle cx={C.x} cy={C.y} r={6 + wC*0.7} className="fill-amber-500 stroke-white dark:stroke-slate-950 stroke-2" />
          <text x={C.x + 12} y={C.y + 12} textAnchor="middle" className="text-[10px] font-black fill-amber-600 dark:fill-amber-400">C (w={wC})</text>

          {/* Barycenter G */}
          <circle cx={G.x} cy={G.y} r="8" className="fill-slate-900 dark:fill-white stroke-indigo-500 stroke-[2]" />
          <circle cx={G.x} cy={G.y} r="3" className="fill-indigo-500" />
          <text x={G.x} y={G.y - 14} textAnchor="middle" className="text-xs font-black fill-slate-950 dark:fill-slate-100">G</text>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Poids des sommets</h4>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-0.5">
              <span className="text-indigo-600 font-bold">Masse de A : {wA}</span>
            </div>
            <input 
              type="range" min="1" max="10" value={wA} 
              onChange={(e) => setWA(parseInt(e.target.value, 10))}
              className="w-full h-1 accent-indigo-500"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-0.5">
              <span className="text-emerald-600 font-bold">Masse de B : {wB}</span>
            </div>
            <input 
              type="range" min="1" max="10" value={wB} 
              onChange={(e) => setWB(parseInt(e.target.value, 10))}
              className="w-full h-1 accent-emerald-500"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-0.5">
              <span className="text-amber-600 font-bold">Masse de C : {wC}</span>
            </div>
            <input 
              type="range" min="1" max="10" value={wC} 
              onChange={(e) => setWC(parseInt(e.target.value, 10))}
              className="w-full h-1 accent-amber-500"
            />
          </div>
        </div>

        <div className="p-3 bg-card border border-border-strong rounded-xl text-center">
          <span className="text-xs font-semibold text-muted-text uppercase block mb-1">Coordonnées Pondérées</span>
          <span className="font-mono text-xs font-bold text-foreground">
            G = (( {wA}A + {wB}B + {wC}C ) / {totalW})
          </span>
        </div>
      </div>
    </div>
  );
};

// 5. Roots of Unity Sandbox (Algèbre)
const RootsOfUnitySandbox: React.FC = () => {
  const [n, setN] = useState(5);

  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;

  // Calculate vertices
  const vertices = [];
  const polygonPoints = [];
  for (let k = 0; k < n; k++) {
    const theta = (2 * Math.PI * k) / n;
    const vx = cx + r * Math.cos(theta);
    const vy = cy - r * Math.sin(theta); // invert Y for standard math axis orientation
    vertices.push({ x: vx, y: vy, angle: (360 * k) / n });
    polygonPoints.push(`${vx},${vy}`);
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[240px] h-[240px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2 relative">
        <svg width={size} height={size}>
          {/* Grid axis */}
          <line x1="10" y1={cy} x2={size-10} y2={cy} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <line x1={cx} y1="10" x2={cx} y2={size-10} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          
          {/* Unit circle */}
          <circle cx={cx} cy={cy} r={r} className="stroke-slate-300 dark:stroke-slate-700 fill-none stroke-[2]" />

          {/* Regular unit polygon connecting lines */}
          <polygon points={polygonPoints.join(' ')} className="fill-indigo-500/5 stroke-indigo-500/60 stroke-2" />

          {/* Vectors & dots */}
          {vertices.map((v, idx) => (
            <g key={idx}>
              <line x1={cx} y1={cy} x2={v.x} y2={v.y} className="stroke-indigo-400 dark:stroke-indigo-600 stroke-1" />
              <circle cx={v.x} cy={v.y} r="5" className="fill-indigo-600 stroke-white dark:stroke-slate-950 stroke-2 hover:scale-125 transition-transform" />
              <text x={v.x + (v.x > cx ? 10 : -10)} y={v.y + (v.y > cy ? 12 : -5)} textAnchor={v.x > cx ? 'start' : 'end'} className="text-[9px] font-bold fill-slate-700 dark:fill-slate-300">
                z{idx}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Degré n du polygone</h4>
        </div>
        <div>
          <span className="text-xs font-semibold block mb-2">Nombre de sommets (racines) : <strong className="text-indigo-600 text-sm">{n}</strong></span>
          <input 
            type="range" min="2" max="12" value={n} 
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1 text-xs font-mono">
          <p className="font-sans font-bold text-foreground text-sm border-b pb-0.5 mb-1">Équation des sommets :</p>
          <div className="text-indigo-600 dark:text-indigo-400 font-bold text-center py-1">zⁿ = 1</div>
          <p className="text-[11px] text-slate-500 italic">Forme générale d'une racine complexe pour k ∈ [0, {n-1}] :</p>
          <div className="text-[11px] bg-card border px-2 py-1 rounded text-center text-foreground font-semibold">
            {"z_k = e^{i \\frac{2k\\pi}{"}{n}{"}}"}
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Matrix Multiplication Sandbox (Algèbre)
const MatrixMultiplicationSandbox: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 0 });

  const A = [
    [1, 2],
    [3, 4],
    [-2, 0]
  ];

  const B = [
    [2, -1, 3],
    [0, 4, 1]
  ];

  // Selected calculus details
  const r = selectedCell ? selectedCell.r : 0;
  const c = selectedCell ? selectedCell.c : 0;

  // Dot product computations
  // c_ij = a_i0*b_0j + a_i1*b_1j
  const a0 = A[r][0];
  const a1 = A[r][1];
  const b0 = B[0][c];
  const b1 = B[1][c];
  const cellSum = a0 * b0 + a1 * b1;

  return (
    <div className="p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40 space-y-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
        {/* Matrice A */}
        <div>
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-2">Matrice A (3×2)</span>
          <div className="inline-grid grid-cols-2 gap-1 border-x-2 border-slate-400 dark:border-slate-600 px-2 py-1 bg-card dark:bg-slate-950 rounded-md">
            {A.map((rowArr, rowIdx) => rowArr.map((val, colIdx) => {
              const isHighlighted = selectedCell && selectedCell.r === rowIdx;
              return (
                <div 
                  key={`${rowIdx}-${colIdx}`} 
                  className={`w-9 h-8 flex items-center justify-center font-mono font-bold rounded-md text-xs transition-colors ${
                    isHighlighted ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30' : 'text-foreground'
                  }`}
                >
                  {val}
                </div>
              );
            }))}
          </div>
        </div>

        <div className="font-bold text-slate-400 font-mono text-xl">×</div>

        {/* Matrice B */}
        <div>
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-2">Matrice B (2×3)</span>
          <div className="inline-grid grid-cols-3 gap-1 border-x-2 border-slate-400 dark:border-slate-600 px-2 py-1 bg-card dark:bg-slate-950 rounded-md">
            {B.map((rowArr, rowIdx) => rowArr.map((val, colIdx) => {
              const isHighlighted = selectedCell && selectedCell.c === colIdx;
              return (
                <div 
                  key={`${rowIdx}-${colIdx}`} 
                  className={`w-9 h-8 flex items-center justify-center font-mono font-bold rounded-md text-xs transition-colors ${
                    isHighlighted ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30' : 'text-foreground'
                  }`}
                >
                  {val}
                </div>
              );
            }))}
          </div>
        </div>

        <div className="font-bold text-slate-400 font-mono text-xl">=</div>

        {/* Matrice Résultante C */}
        <div>
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-2">Produit C (3×3)</span>
          <div className="inline-grid grid-cols-3 gap-1 border-x-2 border-indigo-500 px-2 py-1 bg-card dark:bg-slate-950 rounded-md">
            {[0, 1, 2].map((rowIdx) => [0, 1, 2].map((colIdx) => {
              const isSelected = selectedCell && selectedCell.r === rowIdx && selectedCell.c === colIdx;
              const val = A[rowIdx][0] * B[0][colIdx] + A[rowIdx][1] * B[1][colIdx];
              return (
                <button 
                  key={`${rowIdx}-${colIdx}`} 
                  onClick={() => setSelectedCell({ r: rowIdx, c: colIdx })}
                  className={`w-9 h-8 flex items-center justify-center font-mono font-extrabold rounded-md text-xs transition-all ${
                    isSelected 
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500 scale-105' 
                      : 'bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/25'
                  }`}
                >
                  {val}
                </button>
              );
            }))}
          </div>
        </div>
      </div>

      {selectedCell && (
        <div className="bg-card dark:bg-slate-950 border border-indigo-200 dark:border-slate-800 p-4 rounded-xl space-y-1.5 shadow-sm">
          <p className="text-xs font-bold text-indigo-600 uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Produit scalaire de la ligne {r + 1} par la colonne {c + 1} :
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-xs py-2 bg-muted/65 rounded-lg border border-border-strong/40">
            <span className="text-indigo-600 font-bold">({A[r][0]} × {B[0][c]})</span>
            <span>+</span>
            <span className="text-emerald-600 font-bold">({A[r][1]} × {B[1][c]})</span>
            <span>=</span>
            <span>{a0 * b0} + {a1 * b1}</span>
            <span>=</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm">{cellSum}</span>
          </div>
          <p className="text-[10px] text-slate-400 italic text-center">
            Cliquez sur un autre chiffre de la Matrice Résultante C pour voir son calcul.
          </p>
        </div>
      )}
    </div>
  );
};

// 7. Derivative/Accroissement Sandbox (Analyse)
const DerivativeSecantTangentSandbox: React.FC = () => {
  const [h, setH] = useState(1.5);

  const ox = 30; // base coordinates
  const oy = 180;
  const scaleX = 40;
  const scaleY = 40;

  // Function to plot: f(x) = (x-1.5)^2 * 0.3 + 1
  const f = (x: number) => {
    return Math.pow(x - 1.5, 2) * 0.3 + 1;
  };

  // Base point x0 = 1.0
  const x0 = 1.0;
  const y0 = f(x0);
  const x0_svg = ox + x0 * scaleX;
  const y0_svg = oy - y0 * scaleY;

  // Limit point B based on h
  const xH = x0 + h;
  const yH = f(xH);
  const xH_svg = ox + xH * scaleX;
  const yH_svg = oy - yH * scaleY;

  // Slope calculation
  const slope = (yH - y0) / h;

  // Generate polynomial curve path
  const curvePoints = [];
  for (let sx = 0.2; sx <= 4.0; sx += 0.1) {
    const sy = f(sx);
    curvePoints.push(`${ox + sx * scaleX},${oy - sy * scaleY}`);
  }

  // Draw secant line of slope m passing through x0, y0
  // Line equation: y - y0 = slope * (x - x0) => y = y0 + slope*(x-x0)
  const secantX1 = 0.2;
  const secantY1 = y0 + slope * (secantX1 - x0);
  const secantX2 = 4.2;
  const secantY2 = y0 + slope * (secantX2 - x0);

  // Exact Tangent equation at x0=1.0 (Slope f'(1.0) = 2*(1.0-1.5)*0.3 = -0.3)
  const trueSlope = -0.3;
  const tangentY1 = y0 + trueSlope * (secantX1 - x0);
  const tangentY2 = y0 + trueSlope * (secantX2 - x0);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[240px] h-[220px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="240" height="220">
          {/* Axis */}
          <line x1="20" y1={oy} x2="220" y2={oy} className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />
          <line x1={ox} y1="10" x2={ox} y2="200" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />

          {/* Polynomial curve path */}
          <path d={`M ${curvePoints.join(' L ')}`} fill="none" className="stroke-slate-400 dark:stroke-slate-600 stroke-[2.5]" />

          {/* Exact target Tangent line in red */}
          <line 
            x1={ox + secantX1*scaleX} y1={oy - tangentY1*scaleY} 
            x2={ox + secantX2*scaleX} y2={oy - tangentY2*scaleY} 
            className="stroke-red-500 stroke-[2]" 
          />

          {/* Secant line in blue */}
          <line 
            x1={ox + secantX1*scaleX} y1={oy - secantY1*scaleY} 
            x2={ox + secantX2*scaleX} y2={oy - secantY2*scaleY} 
            className="stroke-blue-500 stroke-[1.5] stroke-dasharray-[2]" 
          />

          {/* Highlight Points */}
          <circle cx={x0_svg} cy={y0_svg} r="5" className="fill-red-500" />
          <circle cx={xH_svg} cy={yH_svg} r="5" className="fill-blue-500" />

          {/* Vertical drop helpers */}
          <line x1={x0_svg} y1={y0_svg} x2={x0_svg} y2={oy} className="stroke-slate-300/60 dark:stroke-slate-800/60 stroke-1 stroke-dasharray-[2]" />
          <line x1={xH_svg} y1={yH_svg} x2={xH_svg} y2={oy} className="stroke-slate-300/60 dark:stroke-slate-800/60 stroke-1 stroke-dasharray-[2]" />

          <text x={x0_svg} y={oy + 12} textAnchor="middle" className="text-[8px] fill-slate-400">x₀</text>
          <text x={xH_svg} y={oy + 12} textAnchor="middle" className="text-[8px] fill-slate-400">x₀+h</text>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Intervalle h</h4>
        </div>
        <div>
          <span className="text-xs font-semibold block mb-2">Distance h séparant les points : <strong className="text-blue-500 text-sm">{h.toFixed(2)}</strong></span>
          <input 
            type="range" min="0.05" max="2.0" step="0.05" value={h} 
            onChange={(e) => setH(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 text-xs font-mono">
          <p className="font-sans font-bold text-foreground text-sm border-b pb-1 mb-1">Observation Séquentielle :</p>
          <div className="flex justify-between">
            <span>Pente Tangente réelle :</span>
            <span className="text-red-500 font-bold">{trueSlope.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-1">
            <span>Pente de la sécante :</span>
            <span className="text-blue-500 font-extrabold">{slope.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 italic text-center">
            {h < 0.2 ? '🎉 h est très petit! La sécante s\'est superposée à la Tangente.' : 'Glissez le variateur h vers la gauche (proche de 0) pour converger vers la dérivée.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// 8. Riemann Integrals Sandbox (Analyse)
const RiemannIntegralSandbox: React.FC = () => {
  const [n, setN] = useState(8);

  const ox = 30;
  const oy = 180;
  const widthArea = 180;
  const scaleY = 40;

  // Curve to integrate: f(x) = 1.6 + sin(x) * 0.8
  const f = (x: number) => {
    return 1.6 + Math.sin(x) * 0.8;
  };

  // Generate polynomial curve path on [0, 4]
  const curvePoints = [];
  const maxInterval = 4.0;
  for (let sx = 0.0; sx <= maxInterval; sx += 0.05) {
    const sy = f(sx);
    curvePoints.push(`${ox + (sx / maxInterval) * widthArea},${oy - sy * scaleY}`);
  }

  // Exact integral on [0, 4]: Integral of 1.6+0.8sin(x) = 1.6x - 0.8cos(x)
  // Value at 4: 1.6*4 - 0.8*cos(4) = 6.4 - 0.8*(-0.6536) = 6.4 + 0.5229 = 6.9229
  // Value at 0: 0 - 0.8*cos(0) = -0.8
  // Total exact value = 6.9229 - (-0.8) = 7.7229
  const exactArea = 7.723;

  // Rectangles generation
  const rects = [];
  const deltaX = maxInterval / n;
  let riemannSum = 0;

  for (let i = 0; i < n; i++) {
    const rxStart = deltaX * i;
    // Lower left corner sample point (left Riemann Sum)
    const rySample = f(rxStart);
    riemannSum += rySample * deltaX;

    const rWidth = (deltaX / maxInterval) * widthArea;
    const rHeight = rySample * scaleY;
    const rx_svg = ox + (rxStart / maxInterval) * widthArea;
    const ry_svg = oy - rHeight;

    rects.push(
      <rect
        key={i}
        x={rx_svg}
        y={ry_svg}
        width={rWidth}
        height={rHeight}
        className="fill-indigo-400/20 stroke-indigo-500/50 stroke-[1.5] transition-all duration-200"
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[240px] h-[220px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="240" height="220">
          {/* Axis */}
          <line x1="20" y1={oy} x2="220" y2={oy} className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />
          <line x1={ox} y1="10" x2={ox} y2="200" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />

          {/* Slices representation */}
          {rects}

          {/* Main function plot */}
          <path d={`M ${curvePoints.join(' L ')}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400 stroke-2" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Nombre de rectangles (n)</h4>
        </div>
        <div>
          <span className="text-xs font-semibold block mb-2">Quantité de subdivisions n : <strong className="text-indigo-600 text-sm">{n}</strong></span>
          <input 
            type="range" min="2" max="40" value={n} 
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 rounded-xl space-y-1.5 text-xs font-mono">
          <p className="font-sans font-bold text-foreground text-sm border-b pb-0.5 mb-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-primary" /> Convergence des calculs d'aire :
          </p>
          <div className="flex justify-between">
            <span>Aire continue (Intégrale exacte) :</span>
            <span><strong>{exactArea.toFixed(3)}</strong></span>
          </div>
          <div className="flex justify-between border-t pt-1">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Somme discrète de Riemann S_n :</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{riemannSum.toFixed(3)}</span>
          </div>
          <div className="text-[10px] text-slate-400 italic text-center mt-1">
            {n > 25 ? '💪 Impressionnant! L\'erreur d\'aire tend vers zéro.' : 'Faites glisser l\'intervalle vers la droite pour augmenter le nombre de rectangles.'}
          </div>
        </div>
      </div>
    </div>
  );
};

// 8.1 Fibonacci Golden Spiral Sandbox (Analyse/Géométrie)
const FibonacciGoldSpiralSandbox: React.FC = () => {
  const [step, setStep] = useState(3);

  // Fibonacci numbers
  const fib = [1, 1, 2, 3, 5, 8, 13, 21];

  const size = 260;
  const scale = 5.5; // multiplier for size

  // Starting bottom-left layout coordinates inside SVG space to center the spiral properly
  const rectsData = [
    { x: 120, y: 120, w: fib[0], h: fib[0], d: 'TL' },
    { x: 120 + fib[0]*scale, y: 120, w: fib[1], h: fib[1], d: 'TR' },
    { x: 120, y: 120 - fib[2]*scale, w: fib[2], h: fib[2], d: 'BL' },
    { x: 120 - fib[3]*scale, y: 120 - fib[2]*scale, w: fib[3], h: fib[3], d: 'BR' },
    { x: 120 - fib[3]*scale, y: 120 + fib[1]*scale, w: fib[4], h: fib[4], d: 'TR' },
    { x: 120 + fib[0]*scale + fib[1]*scale, y: 120 - fib[2]*scale + fib[4]*scale, w: fib[5], h: fib[5], d: 'TL' }, // index 5 (F=8)
    { x: 120 - fib[3]*scale + fib[4]*scale, y: 120 - fib[2]*scale - fib[6]*scale, w: fib[6], h: fib[6], d: 'BL' }  // index 6 (F=13)
  ];

  const renderedSquares = rectsData.slice(0, step);

  // Spiral continuous SVG path generator
  let pathD = "";
  renderedSquares.forEach((sq, i) => {
    const sw = sq.w * scale;
    const sh = sq.h * scale;
    
    // Draw spiral quarterly arcs
    if (i === 0) {
      // Small quadrant inside the first F=1 square
      pathD += `M ${sq.x} ${sq.y} A ${sw} ${sh} 0 0 1 ${sq.x + sw} ${sq.y + sh}`;
    } else if (i === 1) {
      pathD += ` M ${sq.x} ${sq.y + sh} A ${sw} ${sh} 0 0 1 ${sq.x + sw} ${sq.y}`;
    } else if (i === 2) {
      pathD += ` M ${sq.x + sw} ${sq.y + sh} A ${sw} ${sh} 0 0 1 ${sq.x} ${sq.y}`;
    } else if (i === 3) {
      pathD += ` M ${sq.x + sw} ${sq.y} A ${sw} ${sh} 0 0 1 ${sq.x} ${sq.y + sh}`;
    } else if (i === 4) {
      pathD += ` M ${sq.x} ${sq.y} A ${sw} ${sh} 0 0 1 ${sq.x + sw} ${sq.y + sh}`;
    } else if (i === 5) {
      pathD += ` M ${sq.x} ${sq.y + sh} A ${sw} ${sh} 0 0 1 ${sq.x + sw} ${sq.y}`;
    } else if (i === 6) {
      pathD += ` M ${sq.x + sw} ${sq.y + sh} A ${sw} ${sh} 0 0 1 ${sq.x} ${sq.y}`;
    }
  });

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[260px] h-[240px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2 relative">
        <svg width={size} height="240">
          {/* Rectangles */}
          {renderedSquares.map((sq, idx) => (
            <rect 
              key={idx}
              x={sq.x}
              y={sq.y}
              width={sq.w * scale}
              height={sq.h * scale}
              className="fill-amber-500/10 stroke-amber-500/50 stroke-1"
            />
          ))}

          {/* Fibonacci spiral path in orange */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              className="stroke-amber-600 dark:stroke-amber-400 stroke-2 animate-draw"
            />
          )}

          {/* Square tags */}
          {renderedSquares.map((sq, idx) => (
            <text 
              key={`label-${idx}`}
              x={sq.x + (sq.w * scale) / 2}
              y={sq.y + (sq.h * scale) / 2 + 3}
              textAnchor="middle"
              className="text-[8px] font-mono font-bold fill-amber-700/60 dark:fill-amber-400/60"
            >
              {fib[idx]}
            </text>
          ))}
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Construire la Spirale</h4>
        </div>
        <div>
          <span className="text-xs font-semibold block mb-2">Étape de récurrence (F_k) : <strong className="text-amber-600 text-sm">{step} (F = {fib[step-1]})</strong></span>
          <input 
            type="range" min="1" max="7" value={step} 
            onChange={(e) => setStep(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/60 rounded-xl space-y-1.5 text-xs font-mono">
          <p className="font-sans font-bold text-foreground text-sm border-b pb-0.5 mb-1">Formule de Fibonacci :</p>
          <div className="py-1">
            {"F_n = F_{n-1} + F_{n-2}"}
          </div>
          <p className="text-[10px] text-slate-500">Suite récurrente additive convergeant vers le Nombre d'Or φ (Phi) :</p>
          <div className="text-[11px] font-bold text-center text-amber-700 dark:text-amber-400 pt-0.5">
            lim (F_n / F_(n-1)) = 1.618...
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Laplace Harmonic Sandbox (Analyse/Supérieur)
const LaplaceHarmonicSandbox: React.FC = () => {
  const [alpha, setAlpha] = useState(0.5);
  const [omega, setOmega] = useState(3.0);

  // Time domain points plotted: f(t) = e^(-alpha * t) * cos(omega * t)
  // plotted for t in [0.0, 5.0]
  const ox = 25;
  const oy = 90;
  const timeWidth = 110;
  const scaleY = 30;

  const points = [];
  const maxT = 6.0;
  for (let t = 0.0; t <= maxT; t += 0.08) {
    const value = Math.exp(-alpha * t) * Math.cos(omega * t);
    const tx = ox + (t / maxT) * timeWidth;
    const ty = oy - value * scaleY;
    points.push(`${tx},${ty}`);
  }

  // Laplace Plane drawing (3D poles mapping in S-plane)
  // Pole exists at s_pole = -alpha ± i * omega
  const cx = 190;
  const cy = 90;
  const radiusS_scale = 14;

  const px = cx - alpha * radiusS_scale;
  const pyUpper = cy - omega * radiusS_scale;
  const pyLower = cy + omega * radiusS_scale;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[270px] h-[180px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2 select-none">
        <svg width="270" height="170">
          {/* Axis Time Domain on Left */}
          <text x={ox} y="25" className="text-[8px] font-black uppercase tracking-wider fill-slate-400">f(t) (Temps)</text>
          <line x1={ox} y1="35" x2={ox} y2="150" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
          <line x1={ox} y1={oy} x2={ox + timeWidth + 10} y2={oy} className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
          
          <path d={`M ${points.join(' L ')}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400 stroke-2" />

          {/* Divider */}
          <line x1="155" y1="20" x2="155" y2="150" className="stroke-slate-200 dark:stroke-slate-800 stroke-1" />

          {/* S-Plane Complex Diagram on Right */}
          <text x={cx} y="25" textAnchor="middle" className="text-[8px] font-black uppercase tracking-wider fill-slate-400">Plan Complexe S</text>
          <line x1={cx - 30} y1={cy} x2={cx + 35} y2={cy} className="stroke-slate-300/80 dark:stroke-slate-700/85 stroke-[1.5]" />
          <line x1={cx} y1="35" x2={cx} y2="150" className="stroke-slate-300/80 dark:stroke-slate-700/85 stroke-[1.5]" />

          <text x={cx + 25} y={cy + 10} className="text-[7px] fill-slate-400 font-bold">Re(s)</text>
          <text x={cx + 5} y="44" className="text-[7px] fill-slate-400 font-bold">Im(s)</text>

          {/* Poles 'X' */}
          <g>
            {/* Pole 1 */}
            <line x1={px - 4} y1={pyUpper - 4} x2={px + 4} y2={pyUpper + 4} className="stroke-red-500 stroke-2" />
            <line x1={px + 4} y1={pyUpper - 4} x2={px - 4} y2={pyUpper + 4} className="stroke-red-500 stroke-2" />
            
            {/* Pole 2 */}
            <line x1={px - 4} y1={pyLower - 4} x2={px + 4} y2={pyLower + 4} className="stroke-red-500 stroke-2" />
            <line x1={px + 4} y1={pyLower - 4} x2={px - 4} y2={pyLower + 4} className="stroke-red-500 stroke-2" />

            {/* Projection line to omega axis */}
            <line x1={px} y1={pyUpper} x2={cx} y2={pyUpper} className="stroke-red-400/40 stroke-dasharray-[2] stroke-1" />
            <line x1={px} y1={pyUpper} x2={px} y2={cy} className="stroke-red-400/40 stroke-dasharray-[2] stroke-1" />
            <text x={cx + 6} y={pyUpper + 3} className="text-[7px] fill-red-500 font-bold font-mono">iω</text>
            <text x={px} y={cy + 10} textAnchor="middle" className="text-[7px] fill-red-500 font-bold font-mono">-α</text>
          </g>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-text">Pôles harmoniques</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-semibold block mb-1">Amortissement α : <strong>{alpha.toFixed(1)}</strong></span>
            <input 
              type="range" min="0.1" max="1.5" step="0.1" value={alpha} 
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <span className="text-xs font-semibold block mb-1">Pulsor-Fréquentiel ω : <strong>{omega.toFixed(1)}</strong></span>
            <input 
              type="range" min="1.0" max="5.0" step="0.5" value={omega} 
              onChange={(e) => setOmega(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1 text-xs font-mono">
          <p className="font-sans font-bold text-foreground text-sm border-b pb-0.5 mb-1">Transformée de Laplace associée :</p>
          <div className="text-[11px] italic text-slate-500">L{"{ e^{-α t} cos(ω t) } ="}</div>
          <div className="p-1 bg-card border rounded text-center text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
            {"(s + α) / ( (s + α)² + ω² )"}
          </div>
        </div>
      </div>
    </div>
  );
};


// ---------------------------------------------------------------------------
// NEW INTERACTIVE SANDBOXES BATCH 1
// ---------------------------------------------------------------------------

const VectorPlaneSandbox: React.FC = () => {
  const [ux, setUx] = useState(3);
  const [uy, setUy] = useState(2);
  const [vx, setVx] = useState(-2);
  const [vy, setVy] = useState(3);

  const cx = 110;
  const cy = 110;
  const scale = 20;

  const rx = ux + vx;
  const ry = uy + vy;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[220px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center relative">
        <svg width="220" height="220">
          <line x1="10" y1={cy} x2="210" y2={cy} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <line x1={cx} y1="10" x2={cx} y2="210" className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          
          <line x1={cx} y1={cy} x2={cx + ux * scale} y2={cy - uy * scale} className="stroke-indigo-500 stroke-[3]" />
          <text x={cx + ux * scale + 6} y={cy - uy * scale - 2} className="text-[10px] font-bold fill-indigo-500">u⃗</text>

          <line x1={cx} y1={cy} x2={cx + vx * scale} y2={cy - vy * scale} className="stroke-emerald-500 stroke-[3]" />
          <text x={cx + vx * scale - 12} y={cy - vy * scale - 2} className="text-[10px] font-bold fill-emerald-500">v⃗</text>

          <line x1={cx} y1={cy} x2={cx + rx * scale} y2={cy - ry * scale} className="stroke-amber-500 stroke-[2] stroke-dasharray-[2]" />
          <text x={cx + rx * scale + 6} y={cy - ry * scale + 10} className="text-[9px] font-bold fill-amber-500">u⃗+v⃗</text>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Ajustez les vecteurs</h4>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="font-semibold block text-indigo-500">u⃗ : ({ux}, {uy})</span>
            <input type="range" min="-4" max="4" value={ux} onChange={(e) => setUx(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-500" />
            <input type="range" min="-4" max="4" value={uy} onChange={(e) => setUy(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-500 mt-1" />
          </div>
          <div>
            <span className="font-semibold block text-emerald-500">v⃗ : ({vx}, {vy})</span>
            <input type="range" min="-4" max="4" value={vx} onChange={(e) => setVx(parseInt(e.target.value, 10))} className="w-full h-1 accent-emerald-500" />
            <input type="range" min="-4" max="4" value={vy} onChange={(e) => setVy(parseInt(e.target.value, 10))} className="w-full h-1 accent-emerald-500 mt-1" />
          </div>
        </div>
        <div className="p-2 border border-border-strong rounded-xl bg-card text-center font-mono text-[10px] space-y-0.5">
          <div>Somme u⃗+v⃗ = <span className="font-bold text-amber-500">({rx}, {ry})</span></div>
          <div>u⃗·v⃗ = {ux}×{vx} + {uy}×{vy} = <span className="font-bold text-slate-700 dark:text-slate-300">{ux*vx + uy*vy}</span></div>
        </div>
      </div>
    </div>
  );
};

const TrigoCircleSandbox: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState(45);

  const cx = 110;
  const cy = 110;
  const r = 80;

  const rad = (angleDeg * Math.PI) / 180;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);

  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[220px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center relative">
        <svg width="220" height="220">
          <circle cx={cx} cy={cy} r={r} className="stroke-slate-200 dark:stroke-slate-800 fill-none stroke-[1.5]" />
          <line x1="10" y1={cy} x2="210" y2={cy} className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
          <line x1={cx} y1="10" x2={cx} y2="210" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
          <line x1={cx} y1={cy} x2={px} y2={py} className="stroke-slate-900 dark:stroke-slate-200 stroke-[2]" />
          <line x1={cx} y1={cy} x2={px} y2={cy} className="stroke-blue-500 stroke-[3.5]" />
          <line x1={px} y1={cy} x2={px} y2={py} className="stroke-rose-500 stroke-[3.5]" />
          <circle cx={px} cy={py} r="4" className="fill-indigo-600 stroke-white dark:stroke-slate-950" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Angle en degrés</h4>
        <div>
          <span className="text-xs font-semibold block mb-2">Orientation θ : <strong className="text-indigo-600">{angleDeg}°</strong></span>
          <input type="range" min="0" max="360" value={angleDeg} onChange={(e) => setAngleDeg(parseInt(e.target.value, 10))} className="w-full accent-indigo-600" />
        </div>
        <div className="p-3 bg-card border border-border-strong rounded-xl text-[10px] space-y-1 font-mono">
          <div className="flex justify-between">
            <span className="text-blue-500 font-bold">Cosinus (cos X) :</span>
            <span><strong>{cosVal.toFixed(3)}</strong></span>
          </div>
          <div className="flex justify-between">
            <span className="text-rose-500 font-bold">Sinus (sin Y) :</span>
            <span><strong>{sinVal.toFixed(3)}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GaussBellSandbox: React.FC = () => {
  const [sigma, setSigma] = useState(1.0);

  const cx = 110;
  const cy = 120;

  const f = (x: number) => {
    return (1.2 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x, 2) / (2 * Math.pow(sigma, 2)));
  };

  const points = [];
  for (let sx = -4.0; sx <= 4.0; sx += 0.2) {
    const sy = f(sx);
    const px = cx + (sx / 4.0) * 100;
    const py = cy - sy * 60;
    points.push(`${px},${py}`);
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[160px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="220" height="150">
          <line x1="10" y1={cy} x2="210" y2={cy} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <path d={`M ${points[0].split(',')[0]} ${cy} L ${points.join(' L ')} L ${points[points.length-1].split(',')[0]} ${cy} Z`} className="fill-purple-500/10" />
          <path d={`M ${points.join(' L ')}`} fill="none" className="stroke-purple-600 dark:stroke-purple-400 stroke-2" />
          <line x1={cx - sigma * 25} y1="30" x2={cx - sigma * 25} y2={cy} className="stroke-purple-400/40 stroke-dasharray-[2] stroke-1" />
          <line x1={cx + sigma * 25} y1="30" x2={cx + sigma * 25} y2={cy} className="stroke-purple-400/40 stroke-dasharray-[2] stroke-1" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Dispersion de Gauss</h4>
        <div>
          <span className="text-xs font-semibold block mb-2">Écart-type σ : <strong className="text-purple-600">{sigma.toFixed(2)}</strong></span>
          <input type="range" min="0.4" max="1.8" step="0.1" value={sigma} onChange={(e) => setSigma(parseFloat(e.target.value))} className="w-full accent-purple-600" />
        </div>
      </div>
    </div>
  );
};

const ParabolaSandbox: React.FC = () => {
  const [b, setB] = useState(0);
  const [cVal, setCVal] = useState(-2);

  const a = 1;
  const delta = b * b - 4 * a * cVal;

  const cx = 110;
  const cy = 110;
  const scale = 14;

  const points = [];
  for (let sx = -4.0; sx <= 4.0; sx += 0.25) {
    const sy = a * sx * sx + b * sx + cVal;
    points.push(`${cx + sx * scale},${cy - sy * scale}`);
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[180px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="220" height="170">
          <line x1="10" y1={cy} x2="210" y2={cy} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <line x1={cx} y1="10" x2={cx} y2="160" className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <path d={`M ${points.join(' L ')}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400 stroke-2" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Polynôme ax²+bx+c</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="font-semibold block mb-1">Index b : <strong>{b}</strong></span>
            <input type="range" min="-3" max="3" value={b} onChange={(e) => setB(parseInt(e.target.value, 10))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <span className="font-semibold block mb-1">Origine c : <strong>{cVal}</strong></span>
            <input type="range" min="-4" max="2" value={cVal} onChange={(e) => setCVal(parseInt(e.target.value, 10))} className="w-full accent-indigo-600" />
          </div>
        </div>
        <div className="p-2 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 rounded-xl text-[10px] font-mono text-center">
          Discriminant Δ = <span className="font-bold">{delta}</span> ({delta > 0 ? 'Deux racines' : delta === 0 ? 'Une racine' : 'Zéro racine'})
        </div>
      </div>
    </div>
  );
};


// ---------------------------------------------------------------------------
// NEW INTERACTIVE SANDBOXES BATCH 2
// ---------------------------------------------------------------------------

const DeterminantAreaSandbox: React.FC = () => {
  const [ux, setUx] = useState(3);
  const [uy, setUy] = useState(1);
  const [vx, setVx] = useState(1);
  const [vy, setVy] = useState(3);

  const cx = 110;
  const cy = 110;
  const scale = 22;

  const dx = ux * scale;
  const dy = uy * scale;
  const ex = vx * scale;
  const ey = vy * scale;

  const detVal = ux * vy - uy * vx;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[220px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="220" height="220">
          <line x1="10" y1={cy} x2="210" y2={cy} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <line x1={cx} y1="10" x2={cx} y2="210" className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          
          <polygon 
            points={`${cx},${cy} ${cx + dx},${cy - dy} ${cx + dx + ex},${cy - dy - ey} ${cx + ex},${cy - ey}`} 
            className="fill-indigo-500/15 stroke-indigo-500/30 stroke-1 stroke-dasharray-[2]" 
          />

          <line x1={cx} y1={cy} x2={cx + dx} y2={cy - dy} className="stroke-indigo-600 stroke-[3]" />
          <line x1={cx} y1={cy} x2={cx + ex} y2={cy - ey} className="stroke-emerald-600 stroke-[3]" />
          
          <circle cx={cx + dx} cy={cy - dy} r="4" className="fill-indigo-600" />
          <circle cx={cx + ex} cy={cy - ey} r="4" className="fill-emerald-600" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Vecteurs du Déterminant</h4>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-indigo-600 font-bold">V1 (X, Y) : ({ux}, {uy})</span>
            <input type="range" min="0" max="4" value={ux} onChange={(e) => setUx(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-500" />
            <input type="range" min="0" max="4" value={uy} onChange={(e) => setUy(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-500 mt-1" />
          </div>
          <div>
            <span className="text-emerald-600 font-bold">V2 (X, Y) : ({vx}, {vy})</span>
            <input type="range" min="0" max="4" value={vx} onChange={(e) => setVx(parseInt(e.target.value, 10))} className="w-full h-1 accent-emerald-500" />
            <input type="range" min="0" max="4" value={vy} onChange={(e) => setVy(parseInt(e.target.value, 10))} className="w-full h-1 accent-emerald-500 mt-1" />
          </div>
        </div>

        <div className="p-2.5 bg-card border border-border-strong rounded-xl text-[10px] space-y-1 font-mono">
          <div className="flex justify-between font-bold">
            <span>Aire Absolue de surface :</span>
            <span className="text-indigo-600">|{ux}×{vy} - {uy}×{vx}| = {Math.abs(detVal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplexPlanePointSandbox: React.FC = () => {
  const [real, setReal] = useState(3);
  const [imag, setImag] = useState(2);

  const cx = 110;
  const cy = 110;
  const scale = 22;

  const px = cx + real * scale;
  const py = cy - imag * scale;

  const mod = Math.sqrt(real * real + imag * imag);
  const argDeg = (Math.atan2(imag, real) * 180) / Math.PI;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[220px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2">
        <svg width="220" height="220">
          <line x1="10" y1={cy} x2="210" y2={cy} className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          <line x1={cx} y1="10" x2={cx} y2="210" className="stroke-slate-200 dark:stroke-slate-800 stroke-[1.5]" />
          
          <line x1={cx} y1={cy} x2={px} y2={py} className="stroke-indigo-600 stroke-[2]" />
          <line x1={px} y1={py} x2={px} y2={cy} className="stroke-indigo-400/40 stroke-dasharray-[2] stroke-1" />
          <line x1={px} y1={py} x2={cx} y2={py} className="stroke-indigo-400/40 stroke-dasharray-[2] stroke-1" />

          <circle cx={px} cy={py} r="5" className="fill-indigo-600 stroke-white dark:stroke-slate-950 stroke-1" />
          <text x={px + 6} y={py - 6} className="text-[10px] font-bold fill-indigo-600">z = {real} + {imag}i</text>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Partie Réelle et Imaginaire</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="font-semibold block mb-1">Partie Réelle : <strong>{real}</strong></span>
            <input type="range" min="-4" max="4" value={real} onChange={(e) => setReal(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-600" />
          </div>
          <div>
            <span className="font-semibold block mb-1">Partie Imaginaire : <strong>{imag}</strong></span>
            <input type="range" min="-4" max="4" value={imag} onChange={(e) => setImag(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-600" />
          </div>
        </div>

        <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 rounded-xl space-y-1 text-xs font-mono">
          <div className="flex justify-between">
            <span>Module |z| :</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-400">{mod.toFixed(3)}</span>
          </div>
          <div className="flex justify-between border-t pt-1">
            <span>Argument Arg(z) :</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-400">{argDeg.toFixed(1)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThalesSandbox: React.FC = () => {
  const [scaleFactor, setScaleFactor] = useState(1.4);

  const cx = 30;
  const cy = 180;

  const A = { x: 120, y: 150 };
  const B = { x: 100, y: 80 };

  const Ap = { x: cx + (A.x - cx) * scaleFactor, y: cy - (cy - A.y) * scaleFactor };
  const Bp = { x: cx + (B.x - cx) * scaleFactor, y: cy - (cy - B.y) * scaleFactor };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[200px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2 relative">
        <svg width="220" height="200">
          <line x1={cx} y1={cy} x2="210" y2={120} className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />
          <line x1={cx} y1={cy} x2="180" y2="40" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />
          
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="stroke-indigo-600 stroke-[3.5]" />
          <line x1={Ap.x} y1={Ap.y} x2={Bp.x} y2={Bp.y} className="stroke-emerald-600 stroke-[3.5]" />

          <circle cx={cx} cy={cy} r="4" className="fill-slate-900 dark:fill-white" />
          <text x={cx} y={cy + 12} className="text-[10px] font-bold fill-muted-text">O</text>

          <circle cx={A.x} cy={A.y} r="4" className="fill-indigo-600" />
          <text x={A.x + 4} y={A.y + 11} className="text-[9px] font-bold fill-indigo-600">A</text>
          
          <circle cx={B.x} cy={B.y} r="4" className="fill-indigo-600" />
          <text x={B.x - 8} y={B.y - 4} className="text-[9px] font-bold fill-indigo-600">B</text>

          <circle cx={Ap.x} cy={Ap.y} r="4" className="fill-emerald-600" />
          <text x={Ap.x + 4} y={Ap.y + 11} className="text-[9px] font-bold fill-emerald-600">A'</text>
          
          <circle cx={Bp.x} cy={Bp.y} r="4" className="fill-emerald-600" />
          <text x={Bp.x - 10} y={Bp.y - 4} className="text-[9px] font-bold fill-emerald-600">B'</text>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Facteur k (Zoom)</h4>
        <div>
          <span className="text-xs font-semibold block mb-2">Multiplicateur k : <strong className="text-emerald-500">{scaleFactor.toFixed(2)}</strong></span>
          <input type="range" min="1.1" max="1.8" step="0.1" value={scaleFactor} onChange={(e) => setScaleFactor(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
        </div>
      </div>
    </div>
  );
};

const BigOComplexitySandbox: React.FC = () => {
  const [nVal, setNVal] = useState(10);

  const cx = 30;
  const cy = 160;

  const o_1 = 15;
  const o_log = Math.log2(nVal) * 12 + 15;
  const o_n = nVal * 3.5 + 15;
  const o_n2 = Math.pow(nVal, 1.8) * 0.3 + 15;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[190px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-2 relative">
        <svg width="220" height="180">
          <line x1="20" y1={cy} x2="210" y2={cy} className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />
          <line x1={cx} y1="10" x2={cx} y2="170" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" />

          <line x1={cx} y1={cy - 15} x2="210" y2={cy - 15} className="stroke-emerald-500 stroke-2" />
          <path d={`M ${cx},${cy} Q 110,${cy-25} 210,${cy-45}`} fill="none" className="stroke-teal-500 stroke-2" />
          <line x1={cx} y1={cy} x2="210" y2={cy - 85} className="stroke-blue-500 stroke-2" />
          <path d={`M ${cx},${cy} Q 80,${cy-10} 210,${cy-150}`} fill="none" className="stroke-rose-500 stroke-2" />

          <line x1={cx + nVal * 4.3} y1="10" x2={cx + nVal * 4.3} y2={cy} className="stroke-slate-400/50 stroke-dasharray-[2]" />
          <circle cx={cx + nVal * 4.3} cy={cy - o_1} r="3" className="fill-emerald-500" />
          <circle cx={cx + nVal * 4.3} cy={cy - o_log} r="3" className="fill-teal-500" />
          <circle cx={cx + nVal * 4.3} cy={cy - o_n} r="3" className="fill-blue-500" />
          <circle cx={cx + nVal * 4.3} cy={cy - o_n2} r="3" className="fill-rose-500" />
        </svg>
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Taille des données N</h4>
        <div>
          <span className="text-xs font-semibold block mb-2">Entrées N : <strong className="text-blue-500">{nVal}</strong></span>
          <input type="range" min="2" max="35" value={nVal} onChange={(e) => setNVal(parseInt(e.target.value, 10))} className="w-full accent-blue-500" />
        </div>
      </div>
    </div>
  );
};


// ---------------------------------------------------------------------------
// NEW INTERACTIVE SANDBOXES BATCH 3
// ---------------------------------------------------------------------------

const ScratchLoopSandbox: React.FC = () => {
  const [iterationsCount, setIterationsCount] = useState(5);
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [progressVal, setProgressVal] = useState(0);

  const handleRunBlock = () => {
    if (running) return;
    setRunning(true);
    setProgressVal(0);
    setActiveStep(0);
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < iterationsCount) {
        setActiveStep(1); 
        setProgressVal(prev => prev + 1);
        current++;
      } else {
        clearInterval(interval);
        setActiveStep(2); 
        setRunning(false);
      }
    }, 400);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[190px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong p-3 flex flex-col justify-between">
        <div className="space-y-1.5 text-[10px] text-white">
          <div className={`p-1.5 bg-orange-500 rounded-lg font-bold flex items-center gap-1 transition-all ${activeStep === 0 ? 'ring-2 ring-orange-500/50 scale-[1.01]' : ''}`}>
            quand Drapeau Vert cliqué
          </div>
          
          <div className={`p-1.5 bg-amber-500 rounded-lg font-bold transition-all ml-2 border-l-4 border-amber-600 ${activeStep === 1 ? 'ring-2 ring-amber-500/50 scale-[1.01]' : ''}`}>
            répéter <span className="p-0.5 px-1 bg-white/20 rounded">{iterationsCount}</span> fois :
            <div className="mt-0.5 pl-3 text-[9px] text-amber-50">
              ajouter 1 à Variable_X
            </div>
          </div>

          <div className={`p-1.5 bg-indigo-500 rounded-lg font-bold transition-all ${activeStep === 2 ? 'ring-2 ring-indigo-500/50 scale-[1.01]' : ''}`}>
            dire Variable_X pendant 2s
          </div>
        </div>

        <button 
          onClick={handleRunBlock}
          disabled={running}
          className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-lg text-[10px] transition-all flex items-center justify-center gap-1 shadow-sm"
        >
          <Play className="w-3 h-3 fill-current" />
          {running ? 'Exécution...' : 'Lancer l\'Algorithme'}
        </button>
      </div>

      <div className="flex-1 w-full space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Nombre de Répétitions</h4>
        <div>
          <span className="text-xs font-semibold block mb-1">Boucle N fois : <strong className="text-amber-500">{iterationsCount}</strong></span>
          <input type="range" min="2" max="10" value={iterationsCount} onChange={(e) => setIterationsCount(parseInt(e.target.value, 10))} disabled={running} className="w-full accent-amber-500" />
        </div>
        <div className="p-2 bg-card border border-border-strong rounded-xl text-[10px] space-y-0.5 font-mono text-center">
          <span className="text-[9px] text-slate-400 block uppercase">Mémoire de Variable_X</span>
          <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{progressVal} / {iterationsCount}</span>
        </div>
      </div>
    </div>
  );
};

const PgcdEuclideSandbox: React.FC = () => {
  const [numA, setNumA] = useState(48);
  const [numB, setNumB] = useState(18);

  const euclidAlgorithm = (a: number, b: number) => {
    let trace = [];
    let x = Math.max(a, b);
    let y = Math.min(a, b);
    if (y === 0) return { trace: [], pgcd: x };

    while (y !== 0) {
      const q = Math.floor(x / y);
      const r = x % y;
      trace.push({ dividend: x, divisor: y, quotient: q, remainder: r });
      x = y;
      y = r;
    }
    return { trace, pgcd: x };
  };

  const { trace, pgcd } = euclidAlgorithm(numA, numB);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-muted/30 dark:bg-slate-900/40 rounded-2xl border border-border-strong/40">
      <div className="shrink-0 w-[220px] h-[190px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong p-3 flex flex-col justify-start overflow-y-auto space-y-1.5 select-none scrollbar-none">
        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider text-center border-b pb-1">Divisions successives</p>
        {trace.map((t, idx) => (
          <div key={idx} className="p-1 px-2 border border-border-strong rounded bg-muted/60 text-[9px] font-mono text-foreground">
            {t.dividend} = {t.divisor} × {t.q} {t.dividend === t.divisor * t.quotient + t.remainder ? '' : ''}{t.divisor} × {t.quotient} + <strong className="text-indigo-600 dark:text-indigo-400">{t.remainder}</strong>
          </div>
        ))}
      </div>

      <div className="flex-1 w-full space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text">Ajustez les valeurs</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="font-semibold block mb-1">Nombre A : <strong>{numA}</strong></span>
            <input type="range" min="10" max="120" value={numA} onChange={(e) => setNumA(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-500" />
          </div>
          <div>
            <span className="font-semibold block mb-1">Nombre B : <strong>{numB}</strong></span>
            <input type="range" min="5" max="60" value={numB} onChange={(e) => setNumB(parseInt(e.target.value, 10))} className="w-full h-1 accent-indigo-500" />
          </div>
        </div>

        <div className="p-2 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 rounded-xl text-center">
          <span className="text-[10px] uppercase text-muted-text tracking-wider block">PGCD({numA}, {numB}) = <strong className="text-sm text-emerald-600">{pgcd}</strong></span>
        </div>
      </div>
    </div>
  );
};

const GenericIllustration: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="w-full h-[180px] bg-card dark:bg-slate-950 rounded-xl border border-border-strong flex items-center justify-center p-4">
      {id === 'geometry-isometric' && (
        <svg width="180" height="150" className="opacity-85">
          <polygon points="40,110 90,110 65,60" className="fill-indigo-500/10 stroke-indigo-500 stroke-2" />
          <path d="M 100 85 L 125 85" fill="none" className="stroke-slate-400 stroke-dasharray-[2] stroke-[1.5]" />
          <polygon points="120,81 126,85 120,89" className="fill-slate-400" />
          <polygon points="110,110 160,110 135,60" className="fill-emerald-500/10 stroke-emerald-500 stroke-2" />
        </svg>
      )}
      {id === 'homothetic-zoom' && (
        <svg width="180" height="150" className="opacity-85">
          <circle cx="30" cy="110" r="4.5" className="fill-slate-400" />
          <line x1="30" y1="110" x2="160" y2="50" className="stroke-slate-300 stroke-dasharray-[2]" />
          <line x1="30" y1="110" x2="140" y2="120" className="stroke-slate-300 stroke-dasharray-[2]" />
          <polygon points="75,85 105,85 90,65" className="fill-indigo-500/15 stroke-indigo-500 stroke-[1.5]" />
          <polygon points="120,70 165,70 142,40" className="fill-emerald-500/20 stroke-emerald-500 stroke-2" />
        </svg>
      )}
      {id === 'factorial-calc' && (
        <svg width="180" height="150" className="opacity-85 font-mono">
          <text x="90" y="55" textAnchor="middle" className="text-lg font-black fill-indigo-600">5! = 120</text>
          <text x="90" y="85" textAnchor="middle" className="text-[10px] text-slate-500">5 × 4 × 3 × 2 × 1</text>
          <line x1="30" y1="98" x2="150" y2="98" className="stroke-slate-200" />
          <text x="90" y="115" textAnchor="middle" className="text-[9px] text-slate-400">Permutations d'un ensemble de 5 éléments</text>
        </svg>
      )}
      {id === 'fermat-calc' && (
        <svg width="180" height="150" className="opacity-85 font-mono">
          <text x="90" y="52" textAnchor="middle" className="text-xs font-bold fill-indigo-600">F_n = 2^(2^n) + 1</text>
          <text x="90" y="76" textAnchor="middle" className="text-[10px] fill-emerald-600 font-extrabold">F_0=3, F_1=5, F_2=17</text>
          <text x="90" y="94" textAnchor="middle" className="text-[9px] fill-slate-500">Nombres premiers majeurs historiques</text>
          <text x="90" y="116" textAnchor="middle" className="text-[8px] fill-slate-400">Démontrés composites pour n = 5 par Euler</text>
        </svg>
      )}
      {id === 'matrix-identity' && (
        <svg width="180" height="150" className="opacity-85 font-mono">
          <text x="90" y="35" textAnchor="middle" className="text-xs font-bold text-slate-400">Identité multiplicative I₃</text>
          <g>
            <text x="65" y="70" className="font-bold text-sm fill-indigo-600">1</text>
            <text x="90" y="70" className="font-bold text-sm fill-slate-300">0</text>
            <text x="115" y="70" className="font-bold text-sm fill-slate-300">0</text>
            <text x="65" y="95" className="font-bold text-sm fill-slate-300">0</text>
            <text x="90" y="95" className="font-bold text-sm fill-indigo-600">1</text>
            <text x="115" y="95" className="font-bold text-sm fill-slate-300">0</text>
            <text x="65" y="120" className="font-bold text-sm fill-slate-300">0</text>
            <text x="90" y="120" className="font-bold text-sm fill-slate-300">0</text>
            <text x="115" y="120" className="font-bold text-sm fill-indigo-600">1</text>
          </g>
        </svg>
      )}
      {id === 'bijection-map' && (
        <svg width="180" height="150" className="opacity-85">
          <ellipse cx="50" cy="80" rx="20" ry="45" className="fill-none stroke-indigo-400 stroke-1 stroke-dasharray-[2]" />
          <ellipse cx="130" cy="80" rx="20" ry="45" className="fill-none stroke-emerald-400 stroke-1 stroke-dasharray-[2]" />
          <circle cx="50" cy="55" r="3.5" className="fill-indigo-600" />
          <circle cx="50" cy="80" r="3.5" className="fill-indigo-600" />
          <circle cx="50" cy="105" r="3.5" className="fill-indigo-600" />
          <circle cx="130" cy="55" r="3.5" className="fill-emerald-600" />
          <circle cx="130" cy="80" r="3.5" className="fill-emerald-600" />
          <circle cx="130" cy="105" r="3.5" className="fill-emerald-600" />
          <line x1="56" y1="55" x2="124" y2="55" className="stroke-slate-400 stroke-[1.5]" />
          <line x1="56" y1="80" x2="124" y2="80" className="stroke-slate-400 stroke-[1.5]" />
          <line x1="56" y1="105" x2="124" y2="105" className="stroke-slate-400 stroke-[1.5]" />
        </svg>
      )}
      {id === 'algo-conditional' && (
        <svg width="180" height="150" className="opacity-85 font-mono">
          <polygon points="90,30 135,55 90,80 45,55" className="fill-amber-500/10 stroke-amber-500 stroke-[1.5]" />
          <text x="90" y="58" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">Si X &gt; 5 ?</text>
          
          <line x1="135" y1="55" x2="165" y2="55" className="stroke-slate-400" />
          <line x1="165" y1="55" x2="165" y2="90" className="stroke-slate-400" />
          <text x="156" y="50" className="text-[8px] fill-emerald-600 font-bold">VRAI</text>
          
          <line x1="45" y1="55" x2="20" y2="55" className="stroke-slate-400" />
          <line x1="20" y1="55" x2="20" y2="90" className="stroke-slate-400" />
          <text x="24" y="50" className="text-[8px] fill-rose-500 font-bold">FAUX</text>
          
          <rect x="135" y="90" width="46" height="25" rx="5" className="fill-emerald-500/15 stroke-emerald-500" />
          <text x="158" y="105" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">Action A</text>

          <rect x="-1" y="90" width="46" height="25" rx="5" className="fill-rose-500/15 stroke-rose-500" />
          <text x="22" y="105" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">Action B</text>
        </svg>
      )}
      {id === 'binomial-tree' && (
        <svg width="180" height="150" className="opacity-85">
          <circle cx="90" cy="30" r="4.5" className="fill-slate-400" />
          <line x1="90" y1="30" x2="50" y2="70" className="stroke-slate-300" />
          <line x1="90" y1="30" x2="130" y2="70" className="stroke-slate-300" />
          <text x="63" y="44" className="text-[8px]">p</text>
          <text x="113" y="44" className="text-[8px]">1-p</text>
          <circle cx="50" cy="70" r="4.5" className="fill-emerald-500" />
          <circle cx="130" cy="70" r="4.5" className="fill-rose-500" />
        </svg>
      )}
      {id === 'decision-tree' && (
        <svg width="180" height="150" className="opacity-85">
          <circle cx="90" cy="25" r="4.5" className="fill-indigo-500" />
          <line x1="90" y1="25" x2="50" y2="75" className="stroke-slate-300" />
          <line x1="90" y1="25" x2="130" y2="75" className="stroke-slate-300" />
          
          <circle cx="50" cy="75" r="4.5" className="fill-indigo-500" />
          <circle cx="130" cy="75" r="4.5" className="fill-indigo-500" />

          <line x1="50" y1="75" x2="25" y2="125" className="stroke-slate-300" />
          <line x1="50" y1="75" x2="75" y2="125" className="stroke-slate-300" />
          
          <circle cx="25" cy="125" r="4.5" className="fill-emerald-500" />
          <circle cx="75" cy="125" r="4.5" className="fill-emerald-500" />
        </svg>
      )}
      {id === 'segment-perpendicular' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="75" x2="160" y2="75" className="stroke-indigo-600 stroke-2" />
          <circle cx="40" cy="75" r="4" className="fill-indigo-600" />
          <circle cx="140" cy="75" r="4" className="fill-indigo-600" />
          
          <line x1="90" y1="15" x2="90" y2="135" className="stroke-emerald-500 stroke-[2] stroke-dasharray-[2]" />
          <rect x="90" y="67" width="8" height="8" className="fill-none stroke-emerald-500" />
        </svg>
      )}
      {id === 'angle-bisector' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="110" x2="160" y2="110" className="stroke-indigo-600 stroke-2" />
          <line x1="20" y1="110" x2="140" y2="30" className="stroke-indigo-600 stroke-2" />
          <line x1="20" y1="110" x2="160" y2="70" className="stroke-emerald-500 stroke-[2] stroke-dasharray-[2]" />
        </svg>
      )}
      {id === 'exp-growth' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="130" x2="160" y2="130" className="stroke-slate-300" />
          <line x1="30" y1="15" x2="30" y2="140" className="stroke-slate-300" />
          <path d="M 30,125 Q 90,120 150,20" fill="none" className="stroke-indigo-600 stroke-[2.5]" />
          <circle cx="30" cy="125" r="4" className="fill-indigo-600" />
          <text x="44" y="121" className="text-[8px] font-bold fill-indigo-600">e⁰ = 1</text>
        </svg>
      )}
      {id === 'ln-curve' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="110" x2="160" y2="110" className="stroke-slate-300" />
          <line x1="60" y1="15" x2="60" y2="140" className="stroke-slate-300" />
          <path d="M 65,140 Q 75,100 160,75" fill="none" className="stroke-emerald-600 stroke-[2.5]" />
          <circle cx="100" cy="110" r="4" className="fill-emerald-600" />
        </svg>
      )}
      {id === 'sequence-limit' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="110" x2="160" y2="110" className="stroke-slate-300" />
          <line x1="30" y1="15" x2="30" y2="140" className="stroke-slate-300" />
          <line x1="30" y1="50" x2="160" y2="50" className="stroke-emerald-500 stroke-1 stroke-dasharray-[2]" />
          <circle cx="45" cy="100" r="3" className="fill-indigo-500" />
          <circle cx="60" cy="75" r="3" className="fill-indigo-500" />
          <circle cx="75" cy="62" r="3" className="fill-indigo-500" />
          <circle cx="90" cy="56" r="3" className="fill-indigo-500" />
          <circle cx="105" cy="53" r="3" className="fill-indigo-500" />
        </svg>
      )}
      {id === 'asymptote-line' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="110" x2="160" y2="110" className="stroke-slate-300" />
          <line x1="80" y1="15" x2="80" y2="140" className="stroke-slate-300" />
          <line x1="120" y1="15" x2="120" y2="140" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[3]" />
          <path d="M 85,108 Q 110,100 116,15" fill="none" className="stroke-indigo-600 stroke-2" />
        </svg>
      )}
      {id === 'expectation-average' && (
        <svg width="180" height="150" className="opacity-85">
          <line x1="20" y1="110" x2="160" y2="110" className="stroke-slate-400 stroke-2" />
          <polygon points="90,110 96,125 84,125" className="fill-indigo-600" />
          <circle cx="90" cy="110" r="4.5" className="fill-indigo-600" />
          <circle cx="50" cy="100" r="8" className="fill-indigo-400" />
          <circle cx="130" cy="98" r="10" className="fill-emerald-400" />
        </svg>
      )}
      {id === 'matrix-trace' && (
        <svg width="180" height="150" className="opacity-85 font-mono">
          <text x="90" y="32" textAnchor="middle" className="text-[10px] font-black fill-slate-400">Somme diagonale Tr(A)</text>
          <g>
            <text x="55" y="65" className="font-extrabold fill-indigo-600">a₁₁</text>
            <text x="90" y="65" className="fill-slate-300">a₁₂</text>
            <text x="125" y="65" className="fill-slate-300">a₁₃</text>
            <text x="55" y="95" className="fill-slate-300">a₂₁</text>
            <text x="90" y="95" className="font-extrabold fill-indigo-600">a₂₂</text>
            <text x="125" y="95" className="fill-slate-300">a_23</text>
            <text x="55" y="125" className="fill-slate-300">a₃₁</text>
            <text x="90" y="125" className="fill-slate-300">a₃₂</text>
            <text x="125" y="125" className="font-extrabold fill-indigo-600">a₃₃</text>
          </g>
        </svg>
      )}
      {id === 'gradient-vector' && (
        <svg width="180" height="150" className="opacity-85">
          <path d="M 30,75 Q 90,40 150,75" fill="none" className="stroke-slate-200" />
          <path d="M 45,75 Q 90,55 135,75" fill="none" className="stroke-slate-300" />
          <path d="M 60,75 Q 90,65 120,75" fill="none" className="stroke-slate-400" />
          <circle cx="90" cy="72" r="3" className="fill-indigo-600" />
          <line x1="90" y1="72" x2="90" y2="30" className="stroke-rose-500 stroke-[2.5]" />
          <polygon points="90,26 86,33 94,33" className="fill-rose-500" />
          <text x="96" y="38" className="text-[8px] font-bold fill-rose-500">∇f Gradient</text>
        </svg>
      )}
      {id === 'generic-tree' && (
        <svg width="180" height="150" className="opacity-80">
          <circle cx="90" cy="30" r="5" className="fill-indigo-500" />
          <line x1="90" y1="30" x2="50" y2="80" className="stroke-slate-300" />
          <line x1="90" y1="30" x2="130" y2="80" className="stroke-slate-300" />
          <circle cx="50" cy="80" r="5" className="fill-indigo-500" />
          <circle cx="130" cy="80" r="5" className="fill-indigo-500" />
        </svg>
      )}
    </div>
  );
};


// ---------------------------------------------------------------------------
// MASTER GLOSSARY TERM REGISTRY INDEX
// ---------------------------------------------------------------------------

const termsData: Term[] = [
  {
    word: "Fraction de Partage",
    definition: "Représentation d’une proportion ou d’une division d'un tout en parts géométriques parfaitement équitables.",
    level: "primaire",
    category: "Arithmétique",
    mathFormula: "Pression = \\frac{Part}{Total} = \\frac{N}{D}",
    explanation: "D’usage quotidien pour la division de gâteaux ou pizzas, la fraction exprime la portion d'une aire coloriée par rapport au total de découpes.",
    illustrationId: "fraction-sharing"
  },
  {
    word: "Nombres Relatifs / Droite",
    definition: "Extension arithmétique introduisant des valeurs négatives pour repérer des reculs géométriques ou des températures sous zéro.",
    level: "college",
    category: "Arithmétique",
    mathFormula: "(+a) + (-b) = c",
    explanation: "Permet de concevoir l'axe numérique comme une route transitable bidirectionnelle à partir du point d'ancrage central d'origine neutre.",
    illustrationId: "relative-numbers"
  },
  {
    word: "Théorème de Pythagore",
    definition: "Relation fondamentale liant l'aire des trois carrés construits sur les côtés d'un triangle rectangle.",
    level: "college",
    category: "Géométrie",
    mathFormula: "a^2 + b^2 = c^2",
    explanation: "L'aire construite sur l'hypoténuse est l'exacte somme des deux autres aires latérales assemblées, démontrant ainsi le principe trigonométrique.",
    illustrationId: "pythagoras-theorem"
  },
  {
    word: "Barycentre de Masse",
    definition: "Le point d'équilibre physique et vectoriel de plusieurs points ordonnés pondérés par des masses d'échelle.",
    level: "lycee",
    category: "Géométrie",
    mathFormula: "\\sum a_i \\overrightarrow{GB_i} = \\overrightarrow{0}",
    explanation: "Le barycentre matérialise le centre de gravité. Augmenter la masse d'un sommet y attire inexorablement le point d'équilibre.",
    illustrationId: "barycenter-gravity"
  },
  {
    word: "Suite de Fibonacci / Or",
    definition: "Suite récurrente additive où chaque terme est la somme ordonnée des deux précédents. Son ratio converge vers le Nombre de Proportion d'Or.",
    level: "college",
    category: "Analyse",
    mathFormula: "F_{n} = F_{n-1} + F_{n-2}",
    explanation: "La spirale formée par les carrés successifs de Fibonacci régit de nombreuses conceptions esthétiques de canevas et d'éléments de la nature végétale.",
    illustrationId: "fibonacci-spiral"
  },
  {
    word: "Racines de l'Unité",
    definition: "Solutions complexes de l'équation cyclotomique formant des polygones harmoniques réguliers et inscrits sur le cercle trigonométrique.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "z^n = 1 \\implies z_k = e^{i \\frac{2k\\pi}{n}}",
    explanation: "Le degré N détermine la quantité de sommets répartis de manière géométriquement symétrique tout autour du cercle de rayon principal 1.",
    illustrationId: "roots-of-unity"
  },
  {
    word: "Multiplication Matricielle",
    definition: "Opération combinant deux tableaux orthonormés pour donner naissance à une troisième matrice de transition de dimensions conjuguées.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "C_{ij} = \\sum_{k=1}^N A_{ik} B_{kj}",
    explanation: "Chaque cellule finale correspond au produit croisé des coordonnées horizontales de la première matrice par les coordonnées verticales de la seconde.",
    illustrationId: "matrix-multiplication"
  },
  {
    word: "Accroissement / Dérivée",
    definition: "Limite exacte géométrique vers laquelle tend le taux de variation infinitésimal d’une fonction sécante vers sa tangente.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}",
    explanation: "La sécante pivotant autour du point de focalisation se plaque intimement sur l'inclinaison instantanée de la courbe (derivée) à mesure que l'intervalle h s'anéantit.",
    illustrationId: "derivative-secant"
  },
  {
    word: "Intégrale de Riemann",
    definition: "Calcul continu d'une aire sous-jacente par la subdivision géométrique discrète en d'infinis rectangles de largeur différentielle.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\int_a^b f(x)dx = \\lim_{n \\to \\infty} S_n",
    explanation: "Augmenter drastiquement le nombre de tranches rectangulaires diminue continuellement les écarts d'aires pour épouser fidèlement le tracé.",
    illustrationId: "riemann-rectangle"
  },
  {
    word: "Transformée de Laplace",
    definition: "Opérateur intégral transformant des fonctions d'équations différentielles temporelles en équations algébriques harmoniques plus faciles à résoudre.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "\\mathcal{L}\\{f(t)\\} = \\int_0^{\\infty} e^{-st}f(t)dt",
    explanation: "Projette le comportement du temps (gauche) dans l'univers complexe d'impulsions (S, droite) représenté par des pôles et des fréquences harmoniques.",
    illustrationId: "laplace-harmonic"
  },
  {
    word: "Abscisse",
    definition: "Coordonnée horizontale d’un point dans un repère cartésien bidimensionnel, indiquant sa distance orientée par rapport à l'axe des ordonnées.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "x_P",
    explanation: "Sur l'axe plat, l'abscisse mesure le déplacement global de gauche à droite à partir du point d'origine.",
    illustrationId: "vector-plane"
  },
  {
    word: "Ordonnée",
    definition: "Coordonnée verticale d’un point dans un repère cartésien bidimensionnel, indiquant sa hauteur orientée par rapport à l'axe horizontal.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "y_P",
    explanation: "Dans le repère de coordonnées, l'ordonnée mesure la distance de déplacement vers le haut ou vers le bas.",
    illustrationId: "vector-plane"
  },
  {
    word: "Bissectrice d'un Angle",
    definition: "Demi-droite d'origine le sommet d'un angle divisant ce dernier en deux fractions angulaires d'égales amplitudes.",
    level: "college",
    category: "Géométrie",
    mathFormula: "\\widehat{AOM} = \\widehat{MOB}",
    explanation: "La bissectrice est également l'ensemble de tous les points équidistants des deux côtés du demi-plan de l'angle.",
    illustrationId: "angle-bisector"
  },
  {
    word: "Médiatrice",
    definition: "Droite perpendiculaire à un segment passant par son exact milieu géométrique.",
    level: "college",
    category: "Géométrie",
    mathFormula: "MA = MB",
    explanation: "C'est l'ensemble de tous les points du plan qui sont distants de manière rigoureusement égale des deux extrémités de ce segment.",
    illustrationId: "segment-perpendicular"
  },
  {
    word: "Cercle Trigonométrique",
    definition: "Cercle de rayon 1 centré à l'origine, servant à définir géométriquement les fonctions cosinus, sinus et tangente de n'importe quel angle.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\cos^2(\\theta) + \\sin^2(\\theta) = 1",
    explanation: "Glisser le point d'angle projette sa coordonnée sur les axes horizontaux et verticaux du plan cartésien.",
    illustrationId: "trigo-circle"
  },
  {
    word: "Loi Normale / Gauss",
    definition: "Distribution de probabilité continue définie par une courbe en cloche symétrique autour de son espérance moyenne.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
    explanation: "Modélise les fluctuations aléatoires naturelles d'origine cumulée comme les tailles des populations ou les erreurs de précisions physiques.",
    illustrationId: "stats-gauss"
  },
  {
    word: "Loi Binomiale",
    definition: "Probabilité d'obtenir une quantité spécifique de succès lors de la répétition d'épreuves de Bernoulli indépendantes.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}",
    explanation: "Elle utilise un arbre à choix binaire successifs pour dénombrer toutes les issues de victoires ou de défaites.",
    illustrationId: "binomial-tree"
  },
  {
    word: "Matrice Identité",
    definition: "Matrice carrée dont la diagonale principale est uniquement constituée de 1 et tous les autres facteurs de coefficients nuls.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "A \\cdot I = A",
    explanation: "Elle agit comme le nombre neutre 1 lors des opérations de produit multiplicatif matriciel de l'espace vectoriel.",
    illustrationId: "matrix-identity"
  },
  {
    word: "Déterminant",
    definition: "Valeur scalaire extraite d'une matrice carrée caractérisant le facteur multiplicatif d'échelle volumique de la transformation.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "\\det(M) = ad - bc",
    explanation: "L'aire absolue du parallélogramme formé par deux colonnes exprime le déterminant en dimension vectorielle deux.",
    illustrationId: "determinant-span"
  },
  {
    word: "Factorielle",
    definition: "Le produit de tous les entiers positifs consécutifs inférieurs ou égaux au nombre d'évaluation donné.",
    level: "lycee",
    category: "Arithmétique",
    mathFormula: "n! = n \\times (n-1) \\times \\dots \\times 1",
    explanation: "Dénombre l'agencement total ordonné (permutations possibles) d'une collection discrète fermée composée de N membres distincts.",
    illustrationId: "factorial-calc"
  },
  {
    word: "Limite d'une Suite",
    definition: "La valeur vers laquelle se rapprochent infiniment les éléments d'une suite indexée à mesure que l'index grandit.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\lim_{n \\to \\infty} u_n = L",
    explanation: "Démontre la convergence vers un seuil immuable à travers l'analyse de voisinages de plus en plus resserrés.",
    illustrationId: "sequence-limit"
  },
  {
    word: "Asymptote",
    definition: "Droite limite dont une courbe ou fonction se rapproche infiniment à l'approche d'une valeur singulière ou de l'infini.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\lim_{x \\to \\infty} [f(x) - (ax+b)] = 0",
    explanation: "Une barrière ou ligne de guidage vers laquelle la trajectoire tend à se coller sans jamais formellement la croiser.",
    illustrationId: "asymptote-line"
  },
  {
    word: "Vecteur",
    definition: "Entité mathématique modélisant un déplacement muni d'une direction, d'un sens trigonométrique et d'une longueur.",
    level: "college",
    category: "Géométrie",
    mathFormula: "\\overrightarrow{AB} = \\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}",
    explanation: "Représente le glissement direct reliant spatialement deux points distincts du plan ou de l'espace.",
    illustrationId: "vector-plane"
  },
  {
    word: "Produit Scalaire",
    definition: "Opération bilinéaire combinant deux vecteurs pour retourner une valeur d'énergie scalaire proportionnelle à leurs projections croisées.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y",
    explanation: "Calcule l'ombre projetée d'un vecteur sur la droite directionnelle d'un autre pour estimer leur alignement coopératif.",
    illustrationId: "vector-plane"
  },
  {
    word: "Polynôme du Second Degré",
    definition: "Expression algébrique quadratique décrivant une courbe parabolique plane orientée verticalement.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "f(x) = a x^2 + b x + c",
    explanation: "L'intersection de cette cloche ou cuvette avec l'axe horizontal dépend intégralement du signe de son discriminant.",
    illustrationId: "poly-parabola"
  },
  {
    word: "Fonction Exponentielle",
    definition: "Fonction transcendantale qui est sa propre dérivée, avec un taux d'accroissement proportionnel à sa valeur actuelle.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "f'(x) = f(x) \\quad f(0) = 1",
    explanation: "Gouverne tous les phénomènes de croissances continues rapides ou de décompositions radioactives d'isotopes.",
    illustrationId: "exp-growth"
  },
  {
    word: "Logarithme Népérien",
    definition: "Fonction réciproque de la fonction exponentielle, transformant de ce fait les produits scalaires d'échelles de croissance en sommes additives.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\ln(a \\times b) = \\ln(a) + \\ln(b)",
    explanation: "Sert de référence pour modéliser le temps de calcul, l'intensité acoustique en décibels, ou la richesse des échelles d'informations de pH.",
    illustrationId: "ln-curve"
  },
  {
    word: "Nombres Complexes / Plan",
    definition: "Extension d'univers bidimensionnel dotée de l'unité imaginaire i dont le carré parfait est négatif.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "z = a + i b \\quad (i^2 = -1)",
    explanation: "Chaque nombre complexe correspond à un point précis du plan géométrique permettant d'effectuer des rotations d'angles avec facilité.",
    illustrationId: "complex-point"
  },
  {
    word: "Théorème de Thalès",
    definition: "Principe de conservation géométrique stipulant qu'un faisceau de droites parallèles découpe des segments homothétiques proportionnels.",
    level: "college",
    category: "Géométrie",
    mathFormula: "\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}",
    explanation: "Essentiel pour calculer des hauteurs inaccessibles historiques (comme Thalès face à la pyramide de Khéops) par simple comparaison d'ombres projetées.",
    illustrationId: "thales-triangles"
  },
  {
    word: "Complexité / Grand O",
    definition: "Notation universelle mesurant l'évolution de la consommation de ressources de calcul machine (temps ou espace mémoire) selon la taille N.",
    level: "superieur",
    category: "Algorithmique",
    mathFormula: "T(n) = O(N \\log N)",
    explanation: "Permet de classifier la rapidité de traitement de différents algorithmes de tri ou de recherche en faisant abstraction du matériel hôte.",
    illustrationId: "complexity-bigo"
  },
  {
    word: "Boucle / Répétition",
    definition: "Structure logique répétitive permettant d'exécuter un bloc d'instructions de manière conditionnelle ou itérative répétée.",
    level: "primaire",
    category: "Algorithmique",
    mathFormula: "\\text{Boucle } N \\text{ fois}",
    explanation: "La base absolue de l'écriture en programmation (Scratch ou Python/JS) pour éviter d'écrire manuellement des lignes identiques fastidieuses.",
    illustrationId: "algo-loop"
  },
  {
    word: "PGCD",
    definition: "Le Plus Grand Commun Diviseur partagé par deux nombres entiers non nuls.",
    level: "college",
    category: "Arithmétique",
    mathFormula: "\\text{PGCD}(a,b) = d",
    explanation: "Déterminé traditionnellement par l'algorithme des divisions euclidiennes successives remontant à l'Antiquité grecque.",
    illustrationId: "pgcd-euclide"
  },
  {
    word: "Algorithme Glouton",
    definition: "Approche de résolution effectuant pas à pas le meilleur choix optimal local direct, dans l'espoir d'approcher un optimum global.",
    level: "lycee",
    category: "Algorithmique",
    mathFormula: "O(1) \\text{ choix glouton}",
    explanation: "Appliqué couramment pour le problème classique du rendu de monnaie ou de remplissage d'un sac à dos.",
    illustrationId: "algo-conditional"
  },
  {
    word: "Graphe",
    definition: "Une structure mathématique composée d'un ensemble de sommets reliés de manière arbitraire par des arcs directionnels ou des arêtes d'échelles.",
    level: "lycee",
    category: "Algorithmique",
    mathFormula: "G = (V, E)",
    explanation: "Sert à modéliser n'importe quel réseau (routes physiques, lignes électriques, connexions internet de serveurs ou d'amis sur réseaux sociaux).",
    illustrationId: "generic-tree"
  },
  {
    word: "Espérance Mathématique",
    definition: "Moyenne pondérée des gains ou pertes possibles d'une variable aléatoire discrète sur d'infinis scénarios.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "E(X) = \\sum x_i p_i",
    explanation: "Elle définit si un jeu de hasard est mathématiquement équitable (E = 0), gagnant (E > 0) ou structurellement défavorable (E < 0).",
    illustrationId: "expectation-average"
  },
  {
    word: "Matrice Inverse",
    definition: "Matrice conjuguée qui, multipliée par la matrice d'origine, produit la matrice de transition neutre Identité.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "M \\cdot M^{-1} = I",
    explanation: "Équivaut à faire une division pour des tableaux de nombres. Indispensable pour inverser des systèmes linéaires d'équations multivariées.",
    illustrationId: "matrix-identity"
  },
  {
    word: "Trace d'une Matrice",
    definition: "Somme algébrique directe des coefficients positionnés sur la grande diagonale d'une matrice carrée.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "\\text{Tr}(A) = \\sum a_{ii}",
    explanation: "Il s'agit d'un invariant algébrique majeur qui conserve sa valeur exacte même après un changement de base vectorielle orthogonale.",
    illustrationId: "matrix-trace"
  },
  {
    word: "Homothétie",
    definition: "Transformation géométrique faisant grandir ou rétrécir des figures à partir d'un centre focal fixe d'échelle selon un rapport constant K.",
    level: "college",
    category: "Géométrie",
    mathFormula: "\\overrightarrow{OM'} = k \\overrightarrow{OM}",
    explanation: "Représente l'équivalent purement géométrique d'un effet zoom d'appareil photo numérique ou de projection d'ombre.",
    illustrationId: "homothetic-zoom"
  },
  {
    word: "Convergence",
    definition: "Fait mathématique pour une suite, une série ou un algorithme de s'approcher d'un seuil limite fixe fini sans jamais diverger vers l'infini.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "|u_n - L| < \\varepsilon",
    explanation: "Assure aux physiciens et ingénieurs que les calculs de simulations d'échelles de temps vont se stabiliser de manière parfaitement fiable.",
    illustrationId: "sequence-limit"
  },
  {
    word: "Gradient",
    definition: "Vecteur regroupant toutes les dérivées partielles d'une fonction, pointant toujours vers la direction de plus forte pente montante.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "\\nabla f = \\begin{pmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{pmatrix}",
    explanation: "C'est l'outil mathématique fondamental sous-jacent à la descente de gradient, l'algorithme d'apprentissage des réseaux d'intelligence artificielle.",
    illustrationId: "gradient-vector"
  },
  {
    word: "Arbre de Décision",
    definition: "Graphe hiérarchique acyclique modélisant une suite ordonnée de choix conditionnels pour aboutir à une classification définitive.",
    level: "superieur",
    category: "Algorithmique",
    mathFormula: "\\text{Entropie } = - \\sum p_i \\log p_i",
    explanation: "Utilisé à la fois comme structure d'aide à la prise de décision stratégique ou comme algorithme de machine learning supervisé.",
    illustrationId: "decision-tree"
  },
  {
    word: "Médiane d'une Série",
    definition: "Valeur statistique centrale coupant une population triée en deux fractions rigoureusement équivalentes à 50% chacune.",
    level: "college",
    category: "Analyse",
    mathFormula: "P(X \\le M) \\ge 0.5",
    explanation: "Contrairement à la moyenne arithmétique simple, la médiane est insensible aux valeurs extrêmes aberrantes isolées d'une série statistique.",
    illustrationId: "expectation-average"
  },
  {
    word: "Théorème de Pythagore",
    definition: "Dans un triangle rectangle, le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.",
    level: "college",
    category: "Géométrie",
    mathFormula: "BC^2 = AB^2 + AC^2",
    explanation: "Permet de lier de manière rigide les trois côtés d'un triangle droit pour la charpente, la navigation, ou le calcul de distances.",
    illustrationId: "segment-perpendicular"
  },
  {
    word: "Nombre Premier",
    definition: "Entier naturel strictement supérieur à 1 qui n'admet que deux diviseurs distincts : 1 et lui-même.",
    level: "primaire",
    category: "Arithmétique",
    mathFormula: "p \\in \\{2, 3, 5, 7, 11, \\dots\\}",
    explanation: "Les nombres premiers sont les 'atomes' de l'arithmétique : tout nombre entier se décompose de façon unique en un produit de facteurs premiers.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Nombre d'Or",
    definition: "Proportion géométrique unique définie par le rapport où le tout est au grand segment ce que le grand segment est au petit.",
    level: "lycee",
    category: "Géométrie",
    mathFormula: "\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618",
    explanation: "On le retrouve dans les spirales de tournesols, les coquillages ronds, et de nombreuses œuvres d'art architecturales classiques.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Carré d'un Nombre",
    definition: "Résultat de la multiplication d'un nombre par lui-même.",
    level: "primaire",
    category: "Arithmétique",
    mathFormula: "x^2 = x \\times x",
    explanation: "Géométriquement, cela représente l'aire exacte d'un carré plat dont les côtés mesurent la longueur de ce nombre.",
    illustrationId: "factorial-calc"
  },
  {
    word: "Périmètre",
    definition: "Longueur totale du contour fermé d'une figure géométrique plane bidimensionnelle.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "P = 2\\pi R \\quad \\text{ou} \\quad P = 4c",
    explanation: "Mesurer le périmètre revient à calculer la longueur de fil de fer nécessaire pour clôturer précisément un terrain.",
    illustrationId: "segment-perpendicular"
  },
  {
    word: "Aire",
    definition: "Mesure de la superficie ou de l'étendue bidimensionnelle d'une surface fermée.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "A = \\pi R^2 \\quad \\text{ou} \\quad A = c^2",
    explanation: "Représente la quantité totale de peinture nécessaire pour recouvrir ou peindre intégralement l'intérieur d'une forme géométrique.",
    illustrationId: "determinant-span"
  },
  {
    word: "Vecteurs Colinéaires",
    definition: "Deux vecteurs dont les directions géométriques sont rigoureusement parallèles dans l'espace ou le plan.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "\\vec{u} = k \\cdot \\vec{v}",
    explanation: "S'ils sont colinéaires, l'un est simplement la version dilatée, rétrécie ou inversée de l'autre.",
    illustrationId: "vector-plane"
  },
  {
    word: "Produit Vectoriel",
    definition: "Opération bilinéaire antisymétrique sur deux vecteurs retournant un troisième vecteur orthogonal à leurs directions communes.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "\\vec{u} \\wedge \\vec{v} = \\vec{w}",
    explanation: "La norme de ce nouveau vecteur orthogonal mesure précisément l'aire plane du parallélogramme formé par les deux vecteurs.",
    illustrationId: "gradient-vector"
  },
  {
    word: "Espace Vectoriel",
    definition: "Structure algébrique combinant un ensemble d'éléments (les vecteurs) munis d'additions internes et de multiplications par des scalaires.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "u, v \\in E \\implies a u + b v \\in E",
    explanation: "Forme le socle unifié de l'algèbre linéaire moderne, applicable aux réseaux de neurones, à la physique quantique et à la CAO.",
    illustrationId: "matrix-identity"
  },
  {
    word: "Système Linéaire",
    definition: "Collection d'équations du premier degré partageant le même ensemble de variables inconnues à résoudre de manière synchrone.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "A \\cdot X = B",
    explanation: "Se résout de manière systématique par la méthode historique d'élimination de Gauss-Jordan ou par inversion de matrice.",
    illustrationId: "matrix-identity"
  },
  {
    word: "Équation Différentielle",
    definition: "Équation reliant une fonction inconnue d'une ou plusieurs variables réelles à ses propres taux de variation dérivées successives.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "y' - a y = f(x)",
    explanation: "Outil maître pour formuler les lois physiques fondamentales de la gravitation, de la chaleur, des marchés économiques, et de l'électromagnétisme.",
    illustrationId: "exp-growth"
  },
  {
    word: "Suites Adjacentes",
    definition: "Deux suites numériques distinctes dont l'une est strictement croissante, l'autre strictement décroissante, et dont la différence de valeur converge vers zéro.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\lim_{n \\to \\infty} (v_n - u_n) = 0",
    explanation: "Ces deux suites enserrent un nombre réel unique comme un étau, forçant leur convergence synchrone vers cette unique limite commune.",
    illustrationId: "sequence-limit"
  },
  {
    word: "Théorème des Gendarmes",
    definition: "Théorème d'encadrement stipulant que si une suite est prise en étau entre deux suites convergeant vers la même limite, elle converge aussi vers cette limite.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "u_n \\le v_n \\le w_n \\implies \\lim v_n = L",
    explanation: "Très pratique pour déterminer des limites complexes de fonctions oscillantes en les encadrant par des fonctions plus faciles.",
    illustrationId: "sequence-limit"
  },
  {
    word: "Trigonométrie",
    definition: "Branche de la géométrie mesurant les relations proportionnelles entre les longueurs des côtés et les amplitudes d'angles de triangles.",
    level: "college",
    category: "Géométrie",
    mathFormula: "\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypoténuse}}",
    explanation: "Permet de calculer des distances inaccessibles en mer ou en astronomie à partir d'un unique angle visuel de visée.",
    illustrationId: "trigo-circle"
  },
  {
    word: "Coefficient Directeur",
    definition: "Pente numérique d'une droite tracée dans un repère, mesurant l'inclinaison de cette droite par rapport à l'axe des abscisses.",
    level: "college",
    category: "Analyse",
    mathFormula: "m = \\frac{y_B - y_A}{x_B - x_A}",
    explanation: "Représente la quantité de hauteur gagnée ou perdue verticalement pour chaque avancée d'une unique unité vers la droite.",
    illustrationId: "poly-parabola"
  },
  {
    word: "Optimisation Convexe",
    definition: "Sous-domaine de l'analyse étudiant la recherche du minimum global d'une fonction convexe sur un ensemble de contraintes convexes stables.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "f(a u + b v) \\le a f(u) + b f(v)",
    explanation: "La convexité garantit que tout minimum local trouvé est mathématiquement le minimum global supérieur incontestable de l'espace.",
    illustrationId: "gradient-vector"
  },
  {
    word: "Bijection",
    definition: "Relation ou application établissant une correspondance parfaite un-à-un entre chaque élément d'un ensemble de départ et de destination.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "\\forall y \\in Y, \\exists ! x \\in X : f(x) = y",
    explanation: "Permet d'affirmer que deux ensembles ont exactement la même taille (le même cardinal) sans avoir à compter leurs éléments.",
    illustrationId: "bijection-map"
  },
  {
    word: "Théorème de Rolle",
    definition: "Principe stipulant que si une fonction dérivable prend deux valeurs égales en deux points, sa dérivée s'annule au moins une fois entre ces points.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "f(a) = f(b) \\implies f'(c) = 0",
    explanation: "Géométriquement, cela signifie qu'il y a forcément un sommet ou un creux où la tangente devient parfaitement horizontale.",
    illustrationId: "asymptote-line"
  },
  {
    word: "Théorème des Valeurs Intermédiaires",
    definition: "Théorème garantissant qu'une fonction continue sur un intervalle fermé prend au moins une fois toutes les valeurs situées entre ses bornes d'extrémités.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "f(a) \\le u \\le f(b) \\implies f(c) = u",
    explanation: "Si vous montez un sentier d'altitude en continu de 1000m à 2000m, vous passerez forcément par l'altitude exacte de 1500m.",
    illustrationId: "asymptote-line"
  },
  {
    word: "Écart-Type",
    definition: "Indicateur statistique mesurant l'intensité de la dispersion d'une collection de données autour de leur moyenne arithmétique globale.",
    level: "college",
    category: "Analyse",
    mathFormula: "\\sigma = \\sqrt{V(X)}",
    explanation: "Un écart-type faible indique que les mesures sont très resserrées autour de la moyenne, formant un groupe homogène.",
    illustrationId: "stats-gauss"
  },
  {
    word: "Variance",
    definition: "Espérance mathématique de l'écart au carré de la variable aléatoire par rapport à sa propre moyenne.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "V(X) = E(X^2) - [E(X)]^2",
    explanation: "Mesure la volatilité brute ou le niveau de risque moyen d'un portefeuille d'actions financières ou d'un processus physique.",
    illustrationId: "expectation-average"
  },
  {
    word: "Combinaison",
    definition: "Nombre de façons distinctes de choisir un groupe non ordonné d'éléments parmi une collection d'objets disponibles.",
    level: "lycee",
    category: "Arithmétique",
    mathFormula: "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}",
    explanation: "Utilisé pour calculer les chances de gagner à des jeux de tirages comme le Loto, où l'ordre des numéros sortis n'importe pas.",
    illustrationId: "factorial-calc"
  },
  {
    word: "Variable Aléatoire",
    definition: "Fonction associant une valeur numérique quantifiable à chaque issue possible d'une expérience aléatoire expérimentale.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "X : \\Omega \\to \\mathbb{R}",
    explanation: "Permet de traduire mathématiquement le hasard (lancer de dés, température du lendemain) sous forme d'équations réelles.",
    illustrationId: "binomial-tree"
  },
  {
    word: "Fonction de Densité",
    definition: "Fonction caractérisant une variable aléatoire continue, dont l'intégrale sur un domaine mesure la probabilité que la variable appartienne à ce domaine.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "P(a \\le X \\le b) = \\int_a^b f(x)dx",
    explanation: "La probabilité correspond à l'aire sous la courbe d'intensité. L'aire totale sous la courbe est par définition égale à 1.",
    illustrationId: "stats-gauss"
  },
  {
    word: "Graphe Orienté",
    definition: "Graphe dont toutes les liaisons (les arêtes) possèdent un sens de parcours unique matérialisé par des flèches directrices.",
    level: "superieur",
    category: "Algorithmique",
    mathFormula: "G = (V, A) \\quad A \\subseteq V \\times V",
    explanation: "Modélise les cours d'eau à sens unique, les transactions financières unilatérales, ou les liens d'abonnements unidirectionnels sur le web.",
    illustrationId: "generic-tree"
  },
  {
    word: "Rapport d'Échelle",
    definition: "Facteur multiplicatif constant reliant des dimensions réelles aux dimensions représentées sur un plan ou une maquette.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "k = \\frac{\\text{Dimensions carte}}{\\text{Dimensions réelles}}",
    explanation: "Une échelle de 1/100 signifie de manière transparente que 1 centimètre mesuré sur le plan physique correspond à 100 centimètres dans la réalité.",
    illustrationId: "homothetic-zoom"
  },
  {
    word: "Nombres de Fermat",
    definition: "Famille historique d'entiers naturels de forme exponentielle double dont Fermat conjecturait qu'ils étaient tous premiers.",
    level: "superieur",
    category: "Arithmétique",
    mathFormula: "F_n = 2^{2^n} + 1",
    explanation: "Euler a invalidé cette hypothèse en 1732 en démontrant de manière géniale que F5 était premier avec un produit de grands diviseurs.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Médienne Statistique",
    definition: "Valeur statistique qui partage une population ordonnée en deux groupes d'effectifs strictement identiques à 50% de part et d'autre.",
    level: "primaire",
    category: "Analyse",
    mathFormula: "\\tilde{x}",
    explanation: "Si 5 élèves ont pour notes : 8, 11, 12, 15, 19. La médiane est 12 : exactement autant d'élèves ont eu au-dessus qu'en dessous.",
    illustrationId: "expectation-average"
  },
  {
    word: "Vitesse Moyenne",
    definition: "Rapport proportionnel constant calculant la distance parcourue divisée par le temps total d'écoulement du parcours.",
    level: "primaire",
    category: "Analyse",
    mathFormula: "v = \\frac{d}{t}",
    explanation: "Si un véhicule parcourt à allure constante 120 kilomètres en 2 heures, sa vitesse moyenne globale de déplacement est de 60 km/h.",
    illustrationId: "exp-growth"
  },
  {
    word: "Fraction Génératrice",
    definition: "Représentation fractionnaire simple et irréductible de n'importe quel nombre rationnel à développement décimal périodique infini.",
    level: "college",
    category: "Arithmétique",
    mathFormula: "0.333\\dots = \\frac{1}{3}",
    explanation: "Permet de capturer avec exactitude et sans aucune perte d'information des divisions décimales qui ne tombent jamais juste.",
    illustrationId: "factorial-calc"
  },
  {
    word: "Congruence",
    definition: "Relation stipulant que la différence de deux nombres entiers est divisible de manière parfaite par un entier naturel tiers appelé le modulo.",
    level: "lycee",
    category: "Arithmétique",
    mathFormula: "a \\equiv b \\pmod n",
    explanation: "C'est l'arithmétique des horloges : 13 modulo 12 équivaut à 1 heure de l'après-midi. Clé absolue de la cryptographie RSA d'Internet.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Sous-Espace Vectoriel",
    definition: "Partie stable d'un espace vectoriel conservant toutes les propriétés géométriques lors de combinaisons linéaires.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "\\forall u,v \\in F, \\quad a u + b v \\in F",
    explanation: "Une droite ou un plan plat passant rigoureusement par l'origine forment de magnifiques sous-espaces vectoriels rigides.",
    illustrationId: "matrix-identity"
  },
  {
    word: "Algorithme des K-Plus Proches Voisins",
    definition: "Algorithme d'apprentissage automatique supervisé classant une donnée selon les votes majoritaires de ses plus proches exemples.",
    level: "superieur",
    category: "Algorithmique",
    mathFormula: "d(p, q) = \\sqrt{\\sum (p_i - q_i)^2}",
    explanation: "L'apprentissage se fait par simple calcul de distance spatiale à la recherche de points similaires déjà enregistrés en mémoire.",
    illustrationId: "decision-tree"
  },
  {
    word: "Loi des Grands Nombres",
    definition: "Théorème de probabilité stipulant que la moyenne empirique d'un grand nombre de tirages converge vers l'espérance théorique.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "P\\left(\\lim_{n\\to\\infty} \\bar{X}_n = \\mu\\right) = 1",
    explanation: "Plus vous lancez une pièce de monnaie équilibrée un grand nombre de fois, plus la proportion de faces obtenues se rapproche de l'exacte valeur théorique de 50%.",
    illustrationId: "stats-gauss"
  },
  {
    word: "Théorème Central Limite",
    definition: "Théorème de convergence stipulant que la somme de variables de même loi tend vers une distribution normale en cloche de Gauss.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "\\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2)",
    explanation: "Explique l'omniprésence naturelle de la courbe gaussienne pour modéliser des incertitudes cumulées (bruits, tailles humaines).",
    illustrationId: "stats-gauss"
  },
  {
    word: "Nombre Pi (\\pi)",
    definition: "Rapport constant et invariant entre la circonférence d'un cercle quelconque et son diamètre horizontal.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "\\pi = \\frac{\\text{Circonférence}}{\\text{Diamètre}} \\approx 3.14159",
    explanation: "Nombre irrationnel et transcendant, il régit la géométrie des sphères, la trigonométrie et l'analyse ondulatoire harmonique.",
    illustrationId: "trigo-circle"
  },
  {
    word: "Suite Géométrique",
    definition: "Suite numérique ordonnée dont chaque terme est le produit du précédent par un nombre invariable appelé la raison.",
    level: "college",
    category: "Analyse",
    mathFormula: "u_n = u_0 \\cdot q^n",
    explanation: "Modélise les croissances exponentielles, comme les calculs d'intérêts financiers capitalisés ou la propagation de virus informatiques.",
    illustrationId: "exp-growth"
  },
  {
    word: "Suite Arithmétique",
    definition: "Suite numérique régulière dont l'écart de transition entre termes consécutifs reste strictement égal à une raison stable.",
    level: "college",
    category: "Analyse",
    mathFormula: "u_n = u_0 + n \\cdot r",
    explanation: "Traduit une progression rectiligne constante (comme un loyer augmentant de 10 € chaque mois de manière prévisible).",
    illustrationId: "relative-numbers"
  },
  {
    word: "Coordonnées Polaires",
    definition: "Système de repérage bidimensionnel caractérisant tout point par son rayon vecteur et son angle d'azimut.",
    level: "lycee",
    category: "Géométrie",
    mathFormula: "x = r \\cos(\\theta), \\quad y = r \\sin(\\theta)",
    explanation: "Remplace idéalement le repère cartésien standard pour formuler des spirales, des orbites de satellites ou des rotations physiques.",
    illustrationId: "trigo-circle"
  },
  {
    word: "Nombre Transcendant",
    definition: "Nombre réel ou complexe qui n'est la solution d'aucune équation polynomiale non nulle à coefficients rationnels originaux.",
    level: "superieur",
    category: "Arithmétique",
    mathFormula: "\\forall P \\in \\mathbb{Q}[X], \\ P(x) \\neq 0",
    explanation: "Fascinants, ces nombres sont infiniment plus abondants que les nombres algébriques. Pi et e en sont de célèbres exemples démontrés.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Crible d'Ératosthène",
    definition: "Méthode systématique pour lister tous les nombres premiers inférieurs à une barre limite déterminée.",
    level: "primaire",
    category: "Algorithmique",
    mathFormula: "p \\le \\sqrt{N} \\iff \\text{filtrage multiples}",
    explanation: "Fonctionne en éliminant un par un les multiples des nombres premiers consécutifs. Ce qui subsiste forme la liste des nombres premiers.",
    illustrationId: "pgcd-euclide"
  },
  {
    word: "Théorème de Bézout",
    definition: "Théorème d'arithmétique stipulant que deux entiers sont premiers entre eux si et seulement s'il existe une combinaison linéaire égale à 1.",
    level: "lycee",
    category: "Arithmétique",
    mathFormula: "a u + b v = 1 \\iff \\text{PGCD}(a,b) = 1",
    explanation: "Pilier de l'arithmétique modulaire, il permet de calculer des inverses modulaires requis pour crypter des clés de sécurité numériques.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Point d'Inflexion",
    definition: "Point singulier d'une courbe plane où la trajectoire bascule d'une forme convexe (tournée vers le haut) à concave.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "f''(x_0) = 0 \\quad \\text{avec changement de signe}",
    explanation: "C'est l'endroit exact où la droite tangente idéale traverse de manière transparente la courbe physique de la fonction.",
    illustrationId: "derivative-secant"
  },
  {
    word: "Vecteur Propre",
    definition: "Vecteur non nul d'un espace vectoriel dont la direction est préservée par un endomorphisme linéaire.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "A u = \\lambda u \\quad (u \\neq 0)",
    explanation: "Après transformation, le vecteur n'a subi qu'un étirement ou un raccourcissement mesuré par le nombre scalaire lambda.",
    illustrationId: "matrix-multiplication"
  },
  {
    word: "Probabilités Totales",
    definition: "Formule calculant les chances d'un événement global en agrégeant ses probabilités disjointes sur un système complet d'événements.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "P(B) = \\sum P(B | A_i) P(A_i)",
    explanation: "Permet de diviser pour régner : on résout une énigme générale en décomposant l'univers en plusieurs branches de scénarios faciles.",
    illustrationId: "binomial-tree"
  },
  {
    word: "Symétrie Axiale",
    definition: "Transformation géométrique plane effectuant un miroir parfait par rapport à une droite directrice appelée axe de symétrie.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "(MM') \\perp \\Delta \\quad \\text{et } d(M,\\Delta) = d(M',\\Delta)",
    explanation: "C'est le reflet de l'autre côté d'un pli droit où la figure conserve idéalement toutes ses proportions et ses angles intérieurs.",
    illustrationId: "vector-plane"
  },
  {
    word: "Symétrie Centrale",
    definition: "Inversion géométrique par rapport à un point pivot fixe, équivalente à un demi-tour à 180 degrés.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "\\overrightarrow{IM'} = - \\overrightarrow{IM}",
    explanation: "La figure est projetée tête en bas par rapport au centre. Chaque segment garde la même longueur mais pointe en direction inverse.",
    illustrationId: "vector-plane"
  },
  {
    word: "Asymptote Oblique",
    definition: "Droite inclinée limite vers laquelle converge une courbe de fonction lorsque la variable tend vers l'infini.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0",
    explanation: "La distance verticale séparant la courbe de la droite tend vers zéro, créant un alignement presque parfait à la lisière de l'infini.",
    illustrationId: "derivative-secant"
  },
  {
    word: "Ensemble de Cantor",
    definition: "Ensemble mathématique fractal construit par suppression récursive du tiers central des segments.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "C = \\bigcap_{n=0}^\\infty C_n",
    explanation: "Exceptionnel car il est totalement discontinu et de longueur cumulée nulle, tout en possédant autant de points qu'une ligne continue entière.",
    illustrationId: "generic-tree"
  },
  {
    word: "Constante d'Euler",
    definition: "Nombre limite traduisant la différence asymptotique entre la somme harmonique et le logarithme népérien.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "\\gamma = \\lim_{n\\to\\infty} \\left(\\sum_{k=1}^n \\frac{1}{k} - \\ln(n)\\right)",
    explanation: "D'une valeur d'environ 0,57721, son exacte classification algébrique reste à ce jour une énigme majeure (rationnel ou irrationnel ?).",
    illustrationId: "sequence-limit"
  },
  {
    word: "Matrice de Transition",
    definition: "Matrice carrée dont les lignes décrivent les probabilités de déplacement d'un état à un autre dans une chaîne de Markov.",
    level: "lycee",
    category: "Algèbre",
    mathFormula: "P_{ij} = P(X_{t+1}=j | X_t=i)",
    explanation: "La somme de chaque ligne vaut rigoureusement 1 (100%). Outil clé de prédiction météo, d'évolution boursière ou de comportements clients.",
    illustrationId: "matrix-multiplication"
  },
  {
    word: "Nombre de Catalan",
    definition: "Famille de nombres entiers intervenant dans de multiples exercices de dénombrement combinatoire.",
    level: "superieur",
    category: "Arithmétique",
    mathFormula: "C_n = \\frac{1}{n+1}\\binom{2n}{n}",
    explanation: "Calcule le nombre d'expressions correctement parenthésées possibles ou la quantité d'arbres binaires distincts à N+1 feuilles.",
    illustrationId: "factorial-calc"
  },
  {
    word: "Logarithme Décimal",
    definition: "Fonction réciproque des puissances de dix, transformant les produits en simples sommes.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "\\log_{10}(10^x) = x",
    explanation: "Mesure la magnitudes de séismes (échelle de Richter), l'acidité d'un milieu (pH) ou la décibel-puissance de signaux sonores.",
    illustrationId: "exp-growth"
  },
  {
    word: "Coordonnées Sphériques",
    definition: "Système de repérage tridimensionnel décrivant l'espace via un rayon, une colatitude et une longitude.",
    level: "superieur",
    category: "Géométrie",
    mathFormula: "x = r\\sin(\\theta)\\cos(\\phi) \\quad y = r\\sin(\\theta)\\sin(\\phi)",
    explanation: "Permet de repérer avec exactitude la position de satellites d'après leur distance géocentrique et leurs coordonnées angulaires.",
    illustrationId: "vector-plane"
  },
  {
    word: "Théorème de Gödel",
    definition: "Théorème métamathématique stipulant que tout système formel cohérent contient des propositions vraies indémontrables.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "\\text{Cohérence} \\implies \\exists \\text{ proposition indécidable}",
    explanation: "Limite fondamentale et définitive du pouvoir démonstratif formel en mathématiques, détruisant le rêve de complétude absolue.",
    illustrationId: "fermat-calc"
  },
  {
    word: "Inégalité de Cauchy-Schwarz",
    definition: "Relation universelle stipulant que le produit scalaire de deux vecteurs est majoré par le produit de leurs normes respectives.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "|\\langle x, y \\rangle| \\le \\|x\\| \\cdot \\|y\\|",
    explanation: "Une des inégalités transversales les plus célèbres, clé de voûte de l'analyse fonctionnelle et de l'analyse de données de variance.",
    illustrationId: "determinant-span"
  },
  {
    word: "Théorème d'Al-Kashi",
    definition: "Généralisation trigonométrique du théorème de Pythagore s'appliquant aux triangles quelconques non rectangles.",
    level: "lycee",
    category: "Géométrie",
    mathFormula: "a^2 = b^2 + c^2 - 2bc \\cos(A)",
    explanation: "Aussi nommé Loi des Cosinus, il déploie la formule idoine pour calculer la longueur du troisième côté dès que l'angle opposé est connu.",
    illustrationId: "pythagoras-theorem"
  },
  {
    word: "Convexe et Concave",
    definition: "Propriété de courbure d'une fonction d'après la position relative de son tracé par rapport à ses cordes rectilignes sécantes.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "f(\\lambda x + (1-\\lambda)y) \\le \\lambda f(x) + (1-\\lambda)f(y)",
    explanation: "Sur une portion convexe, les tangentes soutiennent idéalement la courbe par en dessous (à la manière d'une cuvette retenant l'eau).",
    illustrationId: "poly-parabola"
  },
  {
    word: "Translation",
    definition: "Déplacement rectiligne glissant l'ensemble du plan ou d'une figure selon la direction et l'amplitude d'un vecteur d'orientation.",
    level: "primaire",
    category: "Géométrie",
    mathFormula: "\\overrightarrow{MM'} = \\vec{u}",
    explanation: "Chaque sommet subit rigoureusement le même glissement sans subir aucune déformation, rotation ou inversion de forme.",
    illustrationId: "vector-plane"
  },
  {
    word: "Théorème de Green-Riemann",
    definition: "Théorème reliant l'intégrale curviligne le long d'une courbe fermée simple à l'intégrale double sur le domaine intérieur.",
    level: "superieur",
    category: "Analyse",
    mathFormula: "\\oint_{\\partial D} Pdx+Qdy = \\iint_D (\\partial_x Q - \\partial_y P)dxdy",
    explanation: "Associe l'écoulement d'un liquide sur une frontière à l'activité physique se déroulant à l'intérieur du domaine.",
    illustrationId: "riemann-rectangle"
  },
  {
    word: "Matrice Symétrique",
    definition: "Matrice carrée de dimensions conjuguées identique à sa propre version transposée.",
    level: "superieur",
    category: "Algèbre",
    mathFormula: "A_{ij} = A_{ji} \\iff A = A^T",
    explanation: "Naturellement omniprésente dans l'analyse de réseaux routiers symétriques, de corrélations statistiques géantes ou d'énergie.",
    illustrationId: "matrix-multiplication"
  },
  {
    word: "Algorithme de Tri à Bulles",
    definition: "Algorithme d'ordonnancement consistant à inspecter puis échanger les éléments adjacents mal ordonnés d'un tableau.",
    level: "college",
    category: "Algorithmique",
    mathFormula: "C(n) = \\mathcal{O}(n^2) \\quad \\text{comparaisons}",
    explanation: "Les éléments les plus volumineux 'remontent' successivement de proche en proche vers la fin de la collection comme de petites bulles d'air.",
    illustrationId: "algo-loop"
  },
  {
    word: "Cercle d'Euler",
    definition: "Cercle remarquable passant par neuf points caractéristiques d'un triangle quelconque.",
    level: "lycee",
    category: "Géométrie",
    mathFormula: "R_{euler} = \\frac{1}{2} R_{circonscrit}",
    explanation: "Il traverse les trois milieux des côtés, les pieds des trois hauteurs, et les trois milieux des segments reliant l'orthocentre aux sommets.",
    illustrationId: "pythagoras-theorem"
  },
  {
    word: "Loi de Poisson",
    definition: "Loi de probabilité discrète modélisant le nombre d'événements indépendants survenant dans un intervalle de temps fixe.",
    level: "lycee",
    category: "Analyse",
    mathFormula: "P(X=k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}",
    explanation: "Représente les événements rares et imprévisibles, comme le taux de pannes de machines, l'arrivée de clients à un guichet, ou l'impact d'éclairs.",
    illustrationId: "binomial-tree"
  }
];

// ---------------------------------------------------------------------------
// MASTER WRAPPER VIEW PORT
// ---------------------------------------------------------------------------

const Course_Ressources_Glossaire: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<'Tous' | 'Arithmétique' | 'Géométrie' | 'Algèbre' | 'Analyse' | 'Algorithmique'>('Tous');
  const [selectedLevel, setSelectedLevel] = useState<'Tous' | 'primaire' | 'college' | 'lycee' | 'superieur'>('Tous');
  const [sortBy, setSortBy] = useState<'word-asc' | 'word-desc' | 'level-asc' | 'level-desc' | 'xp-asc'>('word-asc');
  const [selectedLetter, setSelectedLetter] = useState<string>('Tous');
  
  // XP tracker local
  const [unlockedXP, setUnlockedXP] = useState<Record<string, boolean>>({});

  // Compute available leading letters based on termsData
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    termsData.forEach(t => {
      const firstChar = t.word.charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (firstChar >= 'A' && firstChar <= 'Z') {
        letters.add(firstChar);
      }
    });
    return ['Tous', ...Array.from(letters).sort()];
  }, []);

  // Optimized Search, Filter, and Sorting mechanism
  const filteredTerms = useMemo(() => {
    let result = termsData.filter(term => {
      const normalizedWord = term.word.toLowerCase();
      const normalizedDefinition = term.definition.toLowerCase();
      const normalizedExplanation = term.explanation.toLowerCase();
      const query = searchTerm.toLowerCase();

      // Search matching across multiple fields
      const matchesSearch = normalizedWord.includes(query) || 
                            normalizedDefinition.includes(query) ||
                            normalizedExplanation.includes(query);

      const matchesCat = selectedCat === 'Tous' || term.category === selectedCat;
      const matchesLevel = selectedLevel === 'Tous' || term.level === selectedLevel;

      // Filter by dynamic first letter
      let matchesLetter = true;
      if (selectedLetter !== 'Tous') {
        const firstChar = term.word.charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        matchesLetter = firstChar === selectedLetter;
      }

      return matchesSearch && matchesCat && matchesLevel && matchesLetter;
    });

    // Apply strict sorting choices
    result.sort((a, b) => {
      if (sortBy === 'word-asc') {
        return a.word.localeCompare(b.word);
      } else if (sortBy === 'word-desc') {
        return b.word.localeCompare(a.word);
      } else if (sortBy === 'level-asc') {
        const levels = { primaire: 1, college: 2, lycee: 3, superieur: 4 };
        return levels[a.level] - levels[b.level];
      } else if (sortBy === 'level-desc') {
        const levels = { primaire: 1, college: 2, lycee: 3, superieur: 4 };
        return levels[b.level] - levels[a.level];
      } else if (sortBy === 'xp-asc') {
        const aUnlocked = unlockedXP[a.illustrationId] ? 1 : 0;
        const bUnlocked = unlockedXP[b.illustrationId] ? 1 : 0;
        return aUnlocked - bUnlocked; // Non-unlocked interactive sandboxes first to encourage exploration
      }
      return 0;
    });

    return result;
  }, [searchTerm, selectedCat, selectedLevel, selectedLetter, sortBy, unlockedXP]);

  const triggerXPGain = (termId: string) => {
    if (!unlockedXP[termId]) {
      setUnlockedXP(prev => ({ ...prev, [termId]: true }));
      
      // Trigger a mini-confetti explosion
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#6366f1", "#10b981", "#ec4899"]
      });
      
      // Attempt to save XP to local storage (connecting to hook stats engine implicitly by adding a custom event)
      try {
        const currentXP = parseInt(localStorage.getItem('guide-maths-custom-xp') || '0', 10);
        localStorage.setItem('guide-maths-custom-xp', (currentXP + 5).toString());
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderSandbox = (id: string, word: string) => {
    switch (id) {
      case 'fraction-sharing': return <FractionSharingSandbox />;
      case 'relative-numbers': return <RelativeNumberLineSandbox />;
      case 'pythagoras-theorem': return <PythagoreanTheoremSandbox />;
      case 'barycenter-gravity': return <BarycenterSandbox />;
      case 'fibonacci-spiral': return <FibonacciGoldSpiralSandbox />;
      case 'roots-of-unity': return <RootsOfUnitySandbox />;
      case 'matrix-multiplication': return <MatrixMultiplicationSandbox />;
      case 'derivative-secant': return <DerivativeSecantTangentSandbox />;
      case 'riemann-rectangle': return <RiemannIntegralSandbox />;
      case 'laplace-harmonic': return <LaplaceHarmonicSandbox />;
      case 'vector-plane': return <VectorPlaneSandbox />;
      case 'trigo-circle': return <TrigoCircleSandbox />;
      case 'stats-gauss': return <GaussBellSandbox />;
      case 'poly-parabola': return <ParabolaSandbox />;
      case 'determinant-span': return <DeterminantAreaSandbox />;
      case 'complex-point': return <ComplexPlanePointSandbox />;
      case 'thales-triangles': return <ThalesSandbox />;
      case 'complexity-bigo': return <BigOComplexitySandbox />;
      case 'algo-loop': return <ScratchLoopSandbox />;
      case 'pgcd-euclide': return <PgcdEuclideSandbox />;
      default: return <GenericIllustration id={id} />;
    }
  };

  // Vocab Game Section
  const [gameIndex, setGameIndex] = useState(0);
  const [gameSelected, setGameSelected] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<'correct' | 'wrong' | null>(null);

  const gameQuestions = [
    {
      definition: "La limite géométrique du taux de variation d'une sécante lorsque l'intervalle d'étude tend vers zéro.",
      options: ["Primitive", "Accroissement / Dérivée", "Barycentre de Masse", "Racines de l'Unité"],
      correct: "Accroissement / Dérivée"
    },
    {
      definition: "L'opérateur de sommation continue sous une courbe par subdivision infinitésimale de rectangles.",
      options: ["Multiplication Matricielle", "Théorème de Pythagore", "Intégrale de Riemann", "Suite de Fibonacci"],
      correct: "Intégrale de Riemann"
    },
    {
      definition: "Le point d'équilibre de masses matérielles ordonnées et pondérées en géométrie dans l'espace ou de plan.",
      options: ["Barycentre de Masse", "Racines de l'Unité", "Fraction de Partage", "Transformée de Laplace"],
      correct: "Barycentre de Masse"
    }
  ];

  const handleGameAnswer = (opt: string) => {
    setGameSelected(opt);
    if (opt === gameQuestions[gameIndex].correct) {
      setGameResult('correct');
      confetti({ particleCount: 30, spread: 30, origin: { y: 0.85 } });
    } else {
      setGameResult('wrong');
    }
  };

  const handleNextGame = () => {
    setGameSelected(null);
    setGameResult(null);
    setGameIndex((gameIndex + 1) % gameQuestions.length);
  };

  // Total XP currently showing
  const currentTotalGlossaryXP = Object.keys(unlockedXP).length * 5;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="RES-GLOS"
        title="Glossaire Interactif V6"
        subtitle="Explorez le dictionnaire illustré de mathématiques. Manipulez les curseurs géométriques et découvrez instantanément les formules en action physique."
        duration="15 min"
      />

      <InfoBlock type="definition" title="Le Pouvoir du Visuel Interactif">
        <p>
          Bloquer en mathématiques provient souvent d'une incapacité à visualiser les concepts abstraits. Manipulez les curseurs ci-dessous : chaque terme dispose d’une <strong>Sandbox vectorielle SVG ou harmonique animée</strong> pour assimiler intuitivement les relations complexes.
        </p>
      </InfoBlock>

      {/* SEARCH FILTERS PANEL */}
      <div className="bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-border-strong p-6 md:p-8 rounded-[2rem] mb-12 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Chercher un concept (ex: Riemann, Pythagore...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-16 py-3 bg-muted/60 dark:bg-slate-950 border border-border-strong rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 text-foreground transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/40 dark:hover:bg-indigo-950/50 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg px-2 py-1.5 transition-all"
              >
                Effacer
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl px-4 py-2 select-none">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                XP Glossaire : +{currentTotalGlossaryXP} XP
              </span>
            </div>
            
            <div className="text-[11px] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 rounded-xl px-4 py-2 font-bold whitespace-nowrap">
              {filteredTerms.length} {filteredTerms.length > 1 ? 'concepts trouvés' : 'concept trouvé'}
            </div>
          </div>
        </div>

        {/* Index Alphabétique Interactif (A-Z bar) */}
        <div className="border-t border-b border-border-strong/60 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-muted-text">Index Alphabétique :</span>
            {selectedLetter !== 'Tous' && (
              <button 
                onClick={() => setSelectedLetter('Tous')}
                className="text-[9px] bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/60 font-bold px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 transition-all"
              >
                Réinitialiser
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {availableLetters.map(letter => {
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`min-w-[28px] h-[28px] text-[11px] font-bold rounded-lg transition-all flex items-center justify-center ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm scale-110' 
                      : 'bg-muted/30 dark:bg-slate-900/40 hover:bg-muted border border-border-strong/50 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {letter === 'Tous' ? 'Tous' : letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories togglers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          
          {/* Discipline group */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-muted-text">Discipline</div>
            <div className="flex flex-wrap gap-1.5">
              {(['Tous', 'Arithmétique', 'Géométrie', 'Algèbre', 'Analyse', 'Algorithmique'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCat === cat 
                      ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]' 
                      : 'bg-muted/50 dark:bg-slate-900 border border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Niveau group */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-muted-text">Niveau Académique</div>
            <div className="flex flex-wrap gap-1.5">
              {(['Tous', 'primaire', 'college', 'lycee', 'superieur'] as const).map(lev => (
                <button
                  key={lev}
                  onClick={() => setSelectedLevel(lev)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === lev 
                      ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]' 
                      : 'bg-muted/50 dark:bg-slate-900 border border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                  }`}
                >
                  {lev === 'Tous' ? 'Tout' : lev === 'superieur' ? 'Supérieur' : lev.charAt(0).toUpperCase() + lev.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tri / Selector group */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-muted-text">Ordre de Tri</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setSortBy('word-asc')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left whitespace-nowrap transition-all border ${
                  sortBy === 'word-asc'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-300'
                    : 'bg-muted/30 dark:bg-slate-900 border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                }`}
              >
                🔤 Alphabétique (A-Z)
              </button>
              <button
                onClick={() => setSortBy('word-desc')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left whitespace-nowrap transition-all border ${
                  sortBy === 'word-desc'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-300'
                    : 'bg-muted/30 dark:bg-slate-900 border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                }`}
              >
                🔤 Alphabétique (Z-A)
              </button>
              <button
                onClick={() => setSortBy('level-asc')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left whitespace-nowrap transition-all border ${
                  sortBy === 'level-asc'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-300'
                    : 'bg-muted/30 dark:bg-slate-900 border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                }`}
              >
                📈 Niveau Croissant
              </button>
              <button
                onClick={() => setSortBy('level-desc')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left whitespace-nowrap transition-all border ${
                  sortBy === 'level-desc'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-300'
                    : 'bg-muted/30 dark:bg-slate-900 border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                }`}
              >
                📉 Niveau Décroissant
              </button>
              <button
                onClick={() => setSortBy('xp-asc')}
                className={`col-span-2 px-2 py-1.5 rounded-lg text-[10px] font-bold text-center whitespace-nowrap transition-all border flex items-center justify-center gap-1 ${
                  sortBy === 'xp-asc'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900/40 dark:text-emerald-300'
                    : 'bg-muted/30 dark:bg-slate-900 border-border-strong text-slate-600 dark:text-slate-400 hover:bg-muted'
                }`}
              >
                🔓 Sandboxes à explorer d'abord (XP)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CONCEPTS ALPHABETICAL INDEX */}
      <div className="space-y-8 mb-12">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => {
            const isXPClaimed = unlockedXP[term.illustrationId];

            return (
              <div 
                key={term.illustrationId} 
                className="bg-card rounded-[2rem] border border-border-strong shadow-lg shadow-slate-100/10 dark:shadow-none overflow-hidden transition-all duration-300"
              >
                <div className="p-6 md:p-8 space-y-6">
                  {/* Card head layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border-strong/60 pb-5">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase ${
                          term.level === 'superieur' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' :
                          term.level === 'lycee' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' :
                          'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {term.level === 'superieur' ? 'Supérieur' : term.level}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {term.category}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                        {term.word}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => triggerXPGain(term.illustrationId)}
                        disabled={isXPClaimed}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isXPClaimed 
                            ? 'bg-emerald-500 text-white cursor-default' 
                            : 'bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 hover:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        }`}
                      >
                        {isXPClaimed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Validé V6 (+5 XP)
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 animate-bounce" />
                            Explorer (+5 XP)
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Body layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4 prose prose-slate max-w-none text-muted-text text-sm">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-extrabold text-foreground mb-1">Définition :</h4>
                        <p className="leading-relaxed font-semibold bg-slate-50/30 dark:bg-slate-900/20 p-3 rounded-xl border border-dashed text-slate-800 dark:text-slate-300">
                          {term.definition}
                        </p>
                      </div>

                      {term.mathFormula && (
                        <div className="p-3 bg-muted/60 dark:bg-slate-950 border border-border-strong rounded-xl text-center">
                          <MathComponent block math={term.mathFormula} />
                        </div>
                      )}

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-extrabold text-foreground mb-1">Explication :</h4>
                        <p className="leading-relaxed">{term.explanation}</p>
                      </div>
                    </div>

                    {/* Interactive Sandbox workspace */}
                    <div 
                      className="border border-border-strong/70 rounded-2xl overflow-hidden p-1 bg-slate-50/20 dark:bg-slate-900/10"
                    >
                      {renderSandbox(term.illustrationId, term.word)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-12 bg-card rounded-[2rem] border border-border-strong text-muted-text">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="font-bold text-lg text-foreground">Aucun concept trouvé</p>
            <p className="text-sm">Essayez de saisir d'autres critères de tri sémantique.</p>
          </div>
        )}
      </div>

      {/* INTERACTIVE DEFINITIONS TRAINING GAME */}
      <Section title="🎮 Dictionnaire Entraîneur : Jeu des Définitions" icon="🌀" color="emerald">
        <p className="mb-6 text-sm text-slate-500 leading-relaxed">
          Serez-vous capable de retrouver le terme correspondant à la définition académique ? Jouez pour rafler de nouveaux points.
        </p>

        <div className="bg-emerald-50/25 dark:bg-slate-900/40 border border-emerald-100 dark:border-slate-800 p-6 md:p-8 rounded-[2rem]">
          <div className="flex items-center justify-between border-b border-emerald-100/80 dark:border-slate-800 pb-4 mb-6">
            <p className="text-xs uppercase font-mono font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Entraîneur Vocabulaire • Défi {gameIndex + 1}
            </p>
            <span className="text-xs font-mono font-bold text-emerald-600/70">{gameIndex + 1} / {gameQuestions.length}</span>
          </div>

          <div className="min-h-[80px] text-lg md:text-xl font-bold text-slate-950 dark:text-slate-100 mb-8 leading-snug">
            &ldquo;{gameQuestions[gameIndex].definition}&rdquo;
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {gameQuestions[gameIndex].options.map(opt => {
              const isSelected = gameSelected === opt;
              const isCorrectOpt = opt === gameQuestions[gameIndex].correct;
              const style = isSelected 
                ? (gameResult === 'correct' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.01]' : 'bg-rose-600 text-white border-rose-600 shadow-md scale-[1.01]')
                : (gameSelected && isCorrectOpt ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-black' : 'bg-card border-border-strong hover:border-emerald-400 text-foreground');

              return (
                <button
                  key={opt}
                  disabled={gameSelected !== null}
                  onClick={() => handleGameAnswer(opt)}
                  className={`px-5 py-4 border rounded-xl text-left font-bold text-sm transition-all flex justify-between items-center ${style}`}
                >
                  <span>{opt}</span>
                  {gameSelected && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {gameSelected && (
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border-strong transition-all">
              <span className={`text-sm font-black ${gameResult === 'correct' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                {gameResult === 'correct' ? '✓ Superbe ! Vous maitrisez la définition.' : `✗ Écart de lexique. La bonne réponse était "${gameQuestions[gameIndex].correct}".`}
              </span>
              <button 
                onClick={handleNextGame}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center gap-1"
              >
                Suivant <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* VOCABULARY FLASHCARDS */}
      <Section title="🧠 Flashcards de Mémoire" icon="🧠" color="amber">
        <p className="mb-6 text-sm text-slate-500 leading-relaxed">
          Entrainez votre cerveau à retenir les formulations complexes qui tombent régulièrement lors des évaluations écrites.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la signification géométrique de l'<strong>Abscisse</strong> ?</>}
            back={<>C'est l'emplacement horizontal le long du repère, symbolisé par {"$x$"}.</>}
          />
          <Flashcard 
            front={<>Qu'est-ce qu'une <strong>Asymptote</strong> verticale géométrique ?</>}
            back={<>C'est la droite limite d'une fonction divergeant vers l'infini : {"$\\lim_{x \\to a} f(x) = \\pm \\infty$"}.</>}
          />
          <Flashcard 
            front={<>Quelle est la propriété fondamentale d'un barycentre G de masses égales ?</>}
            back={<>Il coïncide géométriquement avec le centre de gravité ou isobarycentre du polygone.</>}
          />
          <Flashcard 
            front={<>Définition d'une fonction de <strong>Densité de Probabilité</strong> ?</>}
            back={<>C'est une fonction positive continue d'aire sous-jacente infinie égale à {"$1$"} : {"$\\int_{-\\infty}^{+\\infty} f(t)dt = 1$"}.</>}
          />
        </div>
      </Section>

      <Section title="🔍 Étymologie & Analyse Lexicale" icon="🔎" color="blue">
        <InteractiveExercise 
          title={"Décomposer et comprendre l'étymologie de \"Diamètre\""}
          question={
            <>
              Le mot géométrique <strong>&ldquo;Diamètre&rdquo;</strong> provient directement du grec ancien &ldquo;diametros&rdquo;. 
              <br />
              Sauras-tu identifier les racines étymologiques de ce terme fondamental et leur sens littéral ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Le Préfixe &ldquo;Dia-&rdquo;</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le préfixe grec <strong>dia</strong> signifie &ldquo;à travers&rdquo;, &ldquo;d'un bout à l'autre&rdquo; ou indique une séparation/transition spatiale.
              </p>
            </>,
            <>
              <strong>Étape 2 : Le Suffixe &ldquo;-mètre&rdquo;</strong>
              <p className="mt-2 text-sm leading-relaxed">
                La racine <strong>metron</strong> renvoie directement à la &ldquo;mesure&rdquo; ou à l'action de quantifier une grandeur physique ou géométrique.
              </p>
            </>,
            <>
              <strong>Étape 3 : Synthèse sémantique géométrique</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le diamètre est donc, par définition historique et étymologique, la <strong>&ldquo;mesure prise à travers&rdquo;</strong> une figure (le cercle), traversant son centre pour en donner la largeur totale d'un point à un autre de sa frontière.
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="📝 Évaluation de Vocabulaire Académique" icon="🎯" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel mot désigne un segment de droite reliant un sommet d'un triangle au milieu du côté opposé ?",
              options: [
                "La hauteur",
                "La médiatrice",
                "La médiane"
              ],
              correctAnswer: 2,
              explanation: "La médiane passe par un sommet et le milieu du côté opposé. La médiatrice passe par le milieu mais est perpendiculaire, et la hauteur passe par le sommet mais est perpendiculaire au côté opposé."
            },
            {
              question: "Qu'est-ce qu'une bijection en mathématiques ?",
              options: [
                "Une fonction dont chaque élément de l'ensemble d'arrivée admet un unique antécédent dans l'ensemble de départ.",
                "Une fonction toujours croissante ou positive.",
                "Le point de croisement des ordonnées d'une équation linéaire."
              ],
              correctAnswer: 0,
              explanation: "Une application est bijective si tout élément de son ensemble d'arrivée a exactement un seul antécédent dans son ensemble de départ."
            }
          ]}
        />
      </Section>

    </div>
  );
};

export default Course_Ressources_Glossaire;
