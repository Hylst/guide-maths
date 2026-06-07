import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';
import { 
  Sliders, 
  Play, 
  ChevronRight, 
  RotateCcw, 
  Terminal, 
  Eye, 
  Compass, 
  HelpCircle,
  TrendingUp,
  LineChart,
  Code
} from 'lucide-react';

type FunctionType = 'affine' | 'quadratic' | 'trig' | 'exp';

const Course_Ressources_Outils_Numeriques: React.FC = () => {
  // ----------------------------------------------------
  // SECTION 1: GRAPHER STATES & UTILS
  // ----------------------------------------------------
  const [funType, setFunType] = useState<FunctionType>('quadratic');
  const [coeffA, setCoeffA] = useState<number>(1.0);
  const [coeffB, setCoeffB] = useState<number>(0.0);
  const [coeffC, setCoeffC] = useState<number>(-2.0);
  
  // Interactive coordinates on tooltip hover
  const [hoveredPt, setHoveredPt] = useState<{ x: number; y: number; px: number; py: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // SVG dimensions
  const width = 450;
  const height = 350;
  const xMin = -6;
  const xMax = 6;
  const yMin = -6;
  const yMax = 6;

  // Coordinate mapping functions
  const toSvgX = (mx: number) => ((mx - xMin) / (xMax - xMin)) * width;
  const toSvgY = (my: number) => height - ((my - yMin) / (yMax - yMin)) * height;
  const toMathX = (sx: number) => xMin + (sx / width) * (xMax - xMin);
  const toMathY = (sy: number) => yMin + ((height - sy) / height) * (yMax - yMin);

  // Math functions
  const evalFunc = (x: number): number => {
    switch (funType) {
      case 'affine':
        return coeffA * x + coeffB;
      case 'quadratic':
        return coeffA * x * x + coeffB * x + coeffC;
      case 'trig':
        return coeffA * Math.sin(coeffB * x || 1) + coeffC;
      case 'exp':
        // Safe exponential to prevent infinite graphs
        return coeffA * Math.exp(Math.max(-5, Math.min(2, coeffB * x))) + coeffC;
      default:
        return 0;
    }
  };

  // Build LaTeX formula representation based on active parameters
  const formulaLatex = useMemo(() => {
    const formatCoeff = (val: number, name: string, isFirst = false) => {
      if (val === 0) return '';
      let str = '';
      if (val > 0) str = isFirst ? '' : ' + ';
      else str = ' - ';
      
      const absVal = Math.abs(val);
      if (absVal === 1 && name !== '') {
        str += name;
      } else {
        str += absVal.toFixed(1) + name;
      }
      return str;
    };

    switch (funType) {
      case 'affine': {
        const partA = formatCoeff(coeffA, 'x', true);
        const partB = coeffB > 0 ? ` + ${coeffB.toFixed(1)}` : coeffB < 0 ? ` - ${Math.abs(coeffB).toFixed(1)}` : '';
        return `f(x) = ${partA === '' ? '0' : partA}${partB}`;
      }
      case 'quadratic': {
        const partA = formatCoeff(coeffA, 'x^2', true);
        const partB = coeffB > 0 ? ` + ${coeffB.toFixed(1)}x` : coeffB < 0 ? ` - ${Math.abs(coeffB).toFixed(1)}x` : '';
        const partC = coeffC > 0 ? ` + ${coeffC.toFixed(1)}` : coeffC < 0 ? ` - ${Math.abs(coeffC).toFixed(1)}` : '';
        return `f(x) = ${partA === '' ? '0' : partA}${partB}${partC}`;
      }
      case 'trig': {
        const partA = coeffA.toFixed(1);
        const partB = coeffB.toFixed(1);
        const partC = coeffC > 0 ? ` + ${coeffC.toFixed(1)}` : coeffC < 0 ? ` - ${Math.abs(coeffC).toFixed(1)}` : '';
        return `f(x) = ${partA} \\sin(${partB} x)${partC}`;
      }
      case 'exp': {
        const partA = coeffA.toFixed(1);
        const partB = coeffB.toFixed(1);
        const partC = coeffC > 0 ? ` + ${coeffC.toFixed(1)}` : coeffC < 0 ? ` - ${Math.abs(coeffC).toFixed(1)}` : '';
        return `f(x) = ${partA} e^{${partB} x}${partC}`;
      }
    }
  }, [funType, coeffA, coeffB, coeffC]);

  // Generate path points
  const pathD = useMemo(() => {
    const points: string[] = [];
    const step = 0.05;
    for (let x = xMin; x <= xMax; x += step) {
      const y = evalFunc(x);
      if (!isNaN(y) && isFinite(y) && y >= yMin - 10 && y <= yMax + 10) {
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        points.push(`${points.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      }
    }
    return points.join(' ');
  }, [funType, coeffA, coeffB, coeffC]);

  // Generate grid marks
  const gridLines = useMemo(() => {
    const ticks: { type: 'h' | 'v'; mathVal: number; svgVal: number }[] = [];
    for (let x = xMin; x <= xMax; x += 1) {
      if (x !== 0) ticks.push({ type: 'v', mathVal: x, svgVal: toSvgX(x) });
    }
    for (let y = yMin; y <= yMax; y += 1) {
      if (y !== 0) ticks.push({ type: 'h', mathVal: y, svgVal: toSvgY(y) });
    }
    return ticks;
  }, []);

  // Compute key mathematical features
  const mathFeatures = useMemo(() => {
    const f0 = evalFunc(0);
    
    // Find approximate roots in interval [-6, 6]
    const roots: number[] = [];
    const step = 0.02;
    for (let x = xMin; x <= xMax - step; x += step) {
      const y1 = evalFunc(x);
      const y2 = evalFunc(x + step);
      if (y1 * y2 <= 0) {
        // Linear interpolation for root
        const root = x - y1 * (step / (y2 - y1));
        if (!roots.some(r => Math.abs(r - root) < 0.15)) {
          if (!isNaN(root) && isFinite(root)) {
            roots.push(root);
          }
        }
      }
    }

    return {
      intercept: f0,
      roots: roots.filter(r => r >= xMin && r <= xMax)
    };
  }, [funType, coeffA, coeffB, coeffC]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    
    // Map to math
    const mx = toMathX(sx);
    const my = evalFunc(mx);
    
    if (!isNaN(my) && isFinite(my) && my >= yMin && my <= yMax) {
      setHoveredPt({
        x: mx,
        y: my,
        px: toSvgX(mx),
        py: toSvgY(my)
      });
    } else {
      setHoveredPt(null);
    }
  };

  // ----------------------------------------------------
  // SECTION 2: PYTHON IDE EXECUTOR STATES
  // ----------------------------------------------------
  const [pyU0, setPyU0] = useState<number>(2.0);
  const [pyA, setPyA] = useState<number>(1.5);
  const [pyB, setPyB] = useState<number>(-1.0);
  const [pyN, setPyN] = useState<number>(8);

  // Simulation execution tracking
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simLines, setSimLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [simStep, setSimStep] = useState<number>(0);
  const [simVariables, setSimVariables] = useState<{ u: number; i: number; termes: number[] }>({
    u: 2.0,
    i: 0,
    termes: [2.0]
  });

  // Scripts templates
  const pyCodeLines = [
    { line: 1, text: 'u = u0', comment: '# On initialise u avec le terme initial' },
    { line: 2, text: 'termes = [u]', comment: '# On crée la liste avec le premier terme' },
    { line: 3, text: 'for i in range(1, n + 1):', comment: '# On répète n fois la boucle' },
    { line: 4, text: '    u = a * u + b', comment: '# On calcule le terme suivant' },
    { line: 5, text: '    termes.append(u)', comment: '# On l\'ajoute dans la liste des résultats' },
  ];

  // Stop current active simulator
  const resetPySimulation = () => {
    setIsSimulating(false);
    setCurrentLineIndex(-1);
    setSimStep(0);
    setSimVariables({
      u: pyU0,
      i: 0,
      termes: [pyU0]
    });
    setSimLines([
      `>>> console.ready()`,
      `>>> variables initialisées : u0 = ${pyU0.toFixed(1)}, a = ${pyA.toFixed(1)}, b = ${pyB.toFixed(1)}, n = ${pyN}`
    ]);
  };

  // Run the sequence simulation step by step
  const executeNextPyLine = () => {
    if (!isSimulating) {
      setIsSimulating(true);
      setCurrentLineIndex(0); // line 1: u = u0
      const initU = pyU0;
      setSimVariables({
        u: initU,
        i: 0,
        termes: [initU]
      });
      setSimLines(prev => [
        ...prev,
        `> Ligne 1: Affectation de u = u0 (= ${initU})`
      ]);
      setSimStep(1);
      return;
    }

    // Step state transition simulator
    // Steps sequence:
    // Step 1 (line 1 executed, now standing on line 2): termes = [u]
    // Step 2 (line 2 executed, now standing on line 3): entering loop for i=1
    // Step 3 (line 3 executed, now standing on line 4): computing term for current i
    // Step 4 (line 4 executed, now standing on line 5): appending to list
    // Step 5 (line 5 executed, loop increment or exit)
    
    setSimStep(prevStep => {
      const nextStep = prevStep + 1;
      
      if (prevStep === 1) {
        // Line 2: termes = [u]
        setCurrentLineIndex(1);
        setSimLines(prev => [...prev, `> Ligne 2: termes = [${simVariables.u.toFixed(2)}]`]);
        return nextStep;
      }
      
      if (prevStep === 2) {
        // Line 3: entering loop for i=1
        const currentI = 1;
        setCurrentLineIndex(2);
        setSimVariables(v => ({ ...v, i: currentI }));
        setSimLines(prev => [...prev, `> Ligne 3: Boucle démarrée, i = ${currentI}`]);
        return nextStep;
      }

      // Loop math processing
      const currentI = simVariables.i;
      if (currentI <= pyN) {
        const subStep = (prevStep - 3) % 3;

        if (subStep === 0) {
          // Line 4: compute next u
          setCurrentLineIndex(3);
          const oldU = simVariables.u;
          const nextU = pyA * oldU + pyB;
          setSimVariables(v => ({ ...v, u: nextU }));
          setSimLines(prev => [
            ...prev,
            `> Ligne 4: u = ${pyA.toFixed(1)} * ${oldU.toFixed(2)} + (${pyB.toFixed(1)}) = ${nextU.toFixed(2)}`
          ]);
          return nextStep;
        }

        if (subStep === 1) {
          // Line 5: append u to list
          setCurrentLineIndex(4);
          const updatedTermes = [...simVariables.termes, simVariables.u];
          setSimVariables(v => ({ ...v, termes: updatedTermes }));
          setSimLines(prev => [
            ...prev,
            `[Console IPYTHON] termes = [${updatedTermes.map(t => t.toFixed(1)).join(', ')}]`
          ]);
          return nextStep;
        }

        if (subStep === 2) {
          // Line 3: increment i or finish
          const nextI = currentI + 1;
          if (nextI <= pyN) {
            setCurrentLineIndex(2);
            setSimVariables(v => ({ ...v, i: nextI }));
            setSimLines(prev => [...prev, `----------------------------------------`, `> Ligne 3: i incrémenté, nouvelle boucle i = ${nextI}`]);
            return nextStep;
          } else {
            // End of program
            setCurrentLineIndex(-1);
            setSimLines(prev => [
              ...prev,
              `>>> Fin de boucle atteinte après ${pyN} itérations.`,
              `>>> Résultat final : termes = ${JSON.stringify(simVariables.termes.map(t => parseFloat(t.toFixed(2))))}`
            ]);
            setIsSimulating(false);
            return 0;
          }
        }
      }
      
      return nextStep;
    });
  };

  const autoRunPySimulation = () => {
    // Computes all terms immediately with console output
    setIsSimulating(false);
    setCurrentLineIndex(-1);
    
    let u = pyU0;
    const list = [u];
    const logs = [
      `>>> Lancement automatique de l'algorithme...`,
      `>>> termes initialisés : [${u.toFixed(2)}]`
    ];

    for (let i = 1; i <= pyN; i++) {
      const nextU = pyA * u + pyB;
      list.push(nextU);
      logs.push(`Étape i=${i} : u = ${pyA.toFixed(1)} * ${u.toFixed(1)} + (${pyB.toFixed(1)}) = ${nextU.toFixed(2)}`);
      u = nextU;
    }

    logs.push(`>>> Succès ! Tableau des valeurs finales : [${list.map(t => t.toFixed(2)).join(', ')}]`);
    
    setSimVariables({
      u: u,
      i: pyN,
      termes: list
    });
    setSimLines(logs);
  };

  // Synchronise simulation u0 update
  useEffect(() => {
    resetPySimulation();
  }, [pyU0, pyA, pyB, pyN]);

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="RES-TOOL"
        title="Outils Numériques & Simulateurs"
        subtitle="Expérimente en temps réel avec nos outils d'analyse géométrique et de programmation."
        duration="Interactif"
      />

      {/* Intro explain banner */}
      <TipBanner 
        type="info"
        title="Apprentissage par l'action & manipulation"
      >
        Manipule les curseurs, fais varier les coefficients en temps réel et observe instantanément les conséquences sur les graphiques et le code !
      </TipBanner>

      {/* SECTION 1: GRAPHER */}
      <Section title="🧮 Traceur de fonctions en direct" icon="📈" color="indigo">
        <p className="mb-6 text-muted-text text-sm leading-relaxed">
          Un traceur graphique interactif conçu pour comprendre la dynamique des fonctions classiques (Affines, Paraboles du Second Degré, Trigonométriques, Exponentielles). 
          Fais varier les paramètres coefficients avec les curseurs pour voir l'équation se déformer sous tes yeux.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Template select */}
            <div className="bg-card p-4 rounded-2xl border border-border-strong shadow-sm">
              <span className="text-[10px] uppercase font-mono font-black text-primary/70 block mb-3">Famille de Fonction</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'affine', label: 'Affine', desc: 'f(x) = ax + b' },
                  { id: 'quadratic', label: 'Second Degré', desc: 'f(x) = ax² + bx + c' },
                  { id: 'trig', label: 'Trigonométrique', desc: 'f(x) = a.sin(bx) + c' },
                  { id: 'exp', label: 'Exponentielle', desc: 'f(x) = a.e^(bx) + c' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setFunType(type.id as FunctionType);
                      // Apply sensible default parameters for this family
                      if (type.id === 'affine') { setCoeffA(1.5); setCoeffB(-1.0); }
                      else if (type.id === 'quadratic') { setCoeffA(1.0); setCoeffB(0.0); setCoeffC(-2.0); }
                      else if (type.id === 'trig') { setCoeffA(2.0); setCoeffB(1.0); setCoeffC(0.0); }
                      else if (type.id === 'exp') { setCoeffA(1.0); setCoeffB(0.8); setCoeffC(-3.0); }
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      funType === type.id
                        ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'border-border-strong hover:bg-muted text-muted-text'
                    }`}
                  >
                    <div className="font-bold text-xs">{type.label}</div>
                    <div className="text-[10px] opacity-75">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders panel */}
            <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-mono font-black text-muted-text flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-500" /> Réglage des Coefficients
              </span>

              {/* COEFF A Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">Coeff a :</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{coeffA.toFixed(1)}</span>
                </div>
                <input 
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={coeffA}
                  onChange={(e) => setCoeffA(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* COEFF B Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">
                    {funType === 'exp' || funType === 'trig' ? 'Fréquence b :' : 'Coeff b :'}
                  </span>
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{coeffB.toFixed(1)}</span>
                </div>
                <input 
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={coeffB}
                  onChange={(e) => setCoeffB(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* COEFF C Slider */}
              {funType !== 'affine' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">Décalage c (ordonnée) :</span>
                    <span className="font-mono font-bold text-pink-600 dark:text-pink-400">{coeffC.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range"
                    min="-4"
                    max="4"
                    step="0.1"
                    value={coeffC}
                    onChange={(e) => setCoeffC(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              )}
            </div>

            {/* Analysis card */}
            <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-mono font-black text-muted-text block">Analyse algébraique</span>
              
              <div className="p-3 bg-muted rounded-xl border border-border flex items-center justify-center text-center">
                <MathComponent math={formulaLatex} />
              </div>

              <div className="space-y-2 text-xs text-muted-text">
                <div className="flex justify-between border-b border-border/40 pb-1.5">
                  <span>Intersection axe ordonnées :</span>
                  <span className="font-bold font-mono text-foreground">f(0) = {mathFeatures.intercept.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span>Racines réelles f(x) = 0 :</span>
                  <span className="font-bold font-mono text-foreground">
                    {mathFeatures.roots.length === 0 
                      ? "Aucune sur [-6, 6]" 
                      : mathFeatures.roots.map(r => r.toFixed(2)).join(' ; ')
                    }
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Graph visualizer column */}
          <div className="lg:col-span-7 bg-card p-5 rounded-[2rem] border border-border-strong shadow-sm flex flex-col items-center">
            
            <div className="w-full flex justify-between items-center mb-4">
              <span className="text-xs font-black uppercase text-muted-text flex items-center gap-1.5 font-mono">
                <Compass className="w-4 h-4 text-emerald-500 animate-pulse" /> Écran Graphique de la Calculatrice
              </span>
              <div className="text-[10px] font-mono text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-full px-2.5 py-0.5">
                Mode Grapheur
              </div>
            </div>

            {/* SVG Graph rendering */}
            <div className="relative border border-border-strong bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl p-2 w-full flex justify-center">
              <svg 
                ref={svgRef}
                width={width}
                height={height}
                className="overflow-visible select-none cursor-crosshair max-w-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredPt(null)}
              >
                {/* Horizontal & Vertical Grid Lines */}
                {gridLines.map((gl, i) => (
                  <line 
                    key={i}
                    x1={gl.type === 'v' ? gl.svgVal : 0}
                    y1={gl.type === 'h' ? gl.svgVal : 0}
                    x2={gl.type === 'v' ? gl.svgVal : width}
                    y2={gl.type === 'h' ? gl.svgVal : height}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="0.8"
                    strokeDasharray={gl.mathVal % 2 === 0 ? '0' : '2'}
                  />
                ))}

                {/* Major Axes */}
                <line x1={0} y1={toSvgY(0)} x2={width} y2={toSvgY(0)} stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="2" />
                <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={height} stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="2" />

                {/* Axes ticks numbers */}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((tick) => (
                  <React.Fragment key={tick}>
                    {/* X Axis label */}
                    <text 
                      x={toSvgX(tick)} 
                      y={toSvgY(0) + 14} 
                      fontSize="9" 
                      className="fill-slate-400 font-bold font-mono text-center" 
                      textAnchor="middle"
                    >
                      {tick}
                    </text>
                    {/* Y Axis label */}
                    <text 
                      x={toSvgX(0) - 10} 
                      y={toSvgY(tick) + 3} 
                      fontSize="9" 
                      className="fill-slate-400 font-bold font-mono" 
                      textAnchor="end"
                    >
                      {tick}
                    </text>
                  </React.Fragment>
                ))}

                {/* Function Line Plot */}
                <path 
                  d={pathD}
                  fill="none"
                  stroke="url(#color-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Plot roots as gold circles */}
                {mathFeatures.roots.map((root, i) => (
                  <circle 
                    key={i}
                    cx={toSvgX(root)}
                    cy={toSvgY(0)}
                    r="5"
                    className="fill-amber-500 stroke-white dark:stroke-slate-900"
                    strokeWidth="2"
                  />
                ))}

                {/* Math crosshair & hovering marker */}
                {hoveredPt && (
                  <>
                    <line 
                      x1={hoveredPt.px} 
                      y1={0} 
                      x2={hoveredPt.px} 
                      y2={height} 
                      stroke="currentColor" 
                      className="text-slate-300 dark:text-slate-700" 
                      strokeDasharray="3 3" 
                    />
                    <line 
                      x1={0} 
                      y1={hoveredPt.py} 
                      x2={width} 
                      y2={hoveredPt.py} 
                      stroke="currentColor" 
                      className="text-slate-300 dark:text-slate-700" 
                      strokeDasharray="3 3" 
                    />
                    <circle 
                      cx={hoveredPt.px} 
                      cy={hoveredPt.py} 
                      r="7" 
                      className="fill-indigo-600 stroke-white dark:stroke-slate-900 shadow-lg" 
                      strokeWidth="2.5" 
                    />
                  </>
                )}

                {/* SVG Colors Gradients definitions */}
                <defs>
                  <linearGradient id="color-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Float values popup */}
              {hoveredPt ? (
                <div className="absolute top-4 left-4 bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur border border-slate-700/60 text-white rounded-xl p-2.5 text-xs font-mono shadow-xl space-y-0.5 pointer-events-none transition-all">
                  <div className="font-bold text-indigo-400">f(x) Curseur</div>
                  <div>x = {hoveredPt.x.toFixed(2)}</div>
                  <div>y = {hoveredPt.y.toFixed(2)}</div>
                </div>
              ) : (
                <div className="absolute top-4 left-4 bg-muted/95 border border-border-strong text-muted-text/80 rounded-xl px-2.5 py-1.5 text-[11px] font-medium pointer-events-none flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-500" /> Glisse le curseur de souris sur le graphique !
                </div>
              )}
            </div>

            <div className="mt-4 w-full flex justify-between text-xs text-muted-text font-medium px-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block" /> Racines réelles
              </span>
              <span>Intervalle affiché : x ∈ [-5 ; 5]</span>
            </div>
            
          </div>

        </div>
      </Section>

      {/* SECTION 2: PYTHON INTERACTIVE SIMULATOR */}
      <Section title="🐍 Interpréteur Python de suites interactif" icon="🖥️" color="emerald">
        <p className="mb-6 text-muted-text text-sm leading-relaxed">
          Au lycée et en études supérieures, les algorithmes de calcul de suites et de recherche par dichotomie sont omniprésents. 
          Débogue ce script Python pas-à-pas pour visualiser comment l'interpréteur met à jour les variables term après term dans les registres de mémoire !
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* IDE view with active lines highlighting */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#1e1e24] rounded-2xl overflow-hidden shadow-lg border border-slate-800">
              {/* Header Bar */}
              <div className="bg-[#18181c] px-4 py-3 flex justify-between items-center border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-mono font-bold text-slate-400 ml-3 flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-emerald-400" /> main.py
                  </span>
                </div>
                <div className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-800 rounded font-black text-slate-400">
                  Python 3.10
                </div>
              </div>

              {/* Code lines */}
              <div className="p-4 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 space-y-1.5">
                {pyCodeLines.map((item, idx) => {
                  const isActive = currentLineIndex === idx;
                  return (
                    <div 
                      key={item.line} 
                      className={`flex items-start py-0.5 rounded px-2 -mx-2 transition-all ${
                        isActive 
                          ? 'bg-emerald-500/15 border-l-4 border-emerald-500 text-white font-black' 
                          : 'opacity-85'
                      }`}
                    >
                      <span className="w-5 text-slate-500 text-right select-none pr-3 font-medium">{item.line}</span>
                      <div className="flex-1 space-y-0.5">
                        <span className={idx === 2 ? 'text-indigo-400 font-bold' : idx === 3 || idx === 4 ? 'text-emerald-300' : 'text-slate-200'}>
                          {item.text}
                        </span>
                        <span className="text-slate-500 text-[10px] pl-2 block sm:inline italic">
                          {item.comment}
                        </span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-mono uppercase bg-emerald-500 text-slate-900 rounded font-black px-1.5 py-0.2 animate-pulse self-center">
                          Actif
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Variable Monitor Panel */}
            <div className="bg-card p-4 rounded-2xl border border-border-strong shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-mono font-black text-muted-text block">Variables en mémoire (Inspecteur)</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted rounded-xl text-center">
                  <div className="text-[10px] text-muted-text-subtle font-mono uppercase">Indicateur i</div>
                  <div className="text-lg font-black font-mono text-emerald-500">{isSimulating ? simVariables.i : 'N/A'}</div>
                </div>

                <div className="p-3 bg-muted rounded-xl text-center">
                  <div className="text-[10px] text-muted-text-subtle font-mono uppercase">Valeur u</div>
                  <div className="text-lg font-black font-mono text-indigo-500">{simVariables.u.toFixed(2)}</div>
                </div>

                <div className="p-3 bg-muted rounded-xl text-center">
                  <div className="text-[10px] text-muted-text-subtle font-mono uppercase">Longueur liste</div>
                  <div className="text-lg font-black font-mono text-purple-500">{simVariables.termes.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive controls and chart visualizer */}
          <div className="lg:col-span-6 space-y-5">
            {/* Params selection inside Section */}
            <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-mono font-black text-muted-text block">Formule Récurrente de Suite (u_(n+1) = a * u_n + b)</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* param u0 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Valeur initiale u0 :</span>
                    <span className="font-mono text-indigo-500">{pyU0.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={pyU0}
                    disabled={isSimulating}
                    onChange={(e) => setPyU0(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-muted rounded-lg h-1.5 cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* param a */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Paramètre a (pente) :</span>
                    <span className="font-mono text-indigo-500">{pyA.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range"
                    min="-1.5"
                    max="2.5"
                    step="0.1"
                    value={pyA}
                    disabled={isSimulating}
                    onChange={(e) => setPyA(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-muted rounded-lg h-1.5 cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* param b */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Paramètre b (constante) :</span>
                    <span className="font-mono text-indigo-500">{pyB.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={pyB}
                    disabled={isSimulating}
                    onChange={(e) => setPyB(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-muted rounded-lg h-1.5 cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* param n iterations */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Nombre d'itérations n :</span>
                    <span className="font-mono text-indigo-500">{pyN}</span>
                  </div>
                  <input 
                    type="range"
                    min="2"
                    max="12"
                    step="1"
                    value={pyN}
                    disabled={isSimulating}
                    onChange={(e) => setPyN(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 bg-muted rounded-lg h-1.5 cursor-pointer disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                <button
                  onClick={autoRunPySimulation}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Play className="w-4 h-4" /> Calcul Rapide
                </button>
                <button
                  onClick={executeNextPyLine}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <ChevronRight className="w-4 h-4" /> 
                  {isSimulating ? 'Étape Suivante' : 'Simuler pas-à-pas'}
                </button>
                <button
                  onClick={resetPySimulation}
                  className="px-4 py-2.5 rounded-xl border border-border-strong hover:bg-muted font-bold text-xs flex items-center justify-center gap-1.5 text-muted-text"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {/* Terminal console mockup */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 shadow-md font-mono text-[11px] text-emerald-400 space-y-1.5 max-h-48 overflow-y-auto">
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-1.5 mb-1 select-none">
                <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> TERMINAL INTERACTIF OUTPUT</span>
                <span>Python Compiler</span>
              </div>
              {simLines.map((log, i) => (
                <div key={i} className="leading-snug">{log}</div>
              ))}
            </div>

            {/* Quick Chart mapping values */}
            {simVariables.termes.length > 1 && (
              <div className="bg-card p-4 rounded-2xl border border-border-strong shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-mono font-black text-muted-text flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Convergence de la suite u_n
                </span>
                
                {/* Render SVG Line Chart representation */}
                <div className="h-24 bg-muted/60 border border-border/80 rounded-xl p-2 relative flex items-end">
                  <svg className="w-full h-full overflow-visible">
                    {/* Grid lines inside mini-chart */}
                    {[0.25, 0.5, 0.75].map((ratio, idx) => (
                      <line 
                        key={idx}
                        x1={0}
                        y1={ratio * 100}
                        x2={400}
                        y2={ratio * 100}
                        stroke="rgba(0,0,0,0.05)"
                        className="dark:stroke-white/5"
                        strokeDasharray="2 2"
                      />
                    ))}

                    {/* Chart Polyline line */}
                    {(() => {
                      const maxVal = Math.max(...simVariables.termes, 10);
                      const minVal = Math.min(...simVariables.termes, -5);
                      const range = maxVal - minVal || 1;
                      
                      const points = simVariables.termes.map((val, idx) => {
                        const x = (idx / pyN) * 100; // percent width
                        const y = 100 - ((val - minVal) / range) * 85 - 5; // percent height
                        return `${x}% ${y}%`;
                      });

                      return (
                        <>
                          {/* Main line */}
                          <polyline 
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            points={points.map((pt, idx) => {
                              // evaluate relative to actual container width during mounting
                              const px = (idx / pyN) * 280 + 10;
                              const py = 75 - ((simVariables.termes[idx] - minVal) / range) * 60;
                              return `${px},${py}`;
                            }).join(' ')}
                          />
                          {/* Points */}
                          {simVariables.termes.map((val, idx) => {
                            const px = (idx / pyN) * 280 + 10;
                            const py = 75 - ((val - minVal) / range) * 60;
                            return (
                              <circle 
                                key={idx}
                                cx={px}
                                cy={py}
                                r="3.5"
                                className="fill-emerald-400 stroke-white dark:stroke-slate-900"
                                strokeWidth="1.5"
                              />
                            );
                          })}
                        </>
                      );
                    })()}
                  </svg>
                  
                  {/* Min / Max indicators */}
                  <div className="absolute top-1 right-2 text-[9px] font-bold text-muted-text font-mono">
                    Max: {Math.max(...simVariables.termes).toFixed(1)}
                  </div>
                  <div className="absolute bottom-1 right-2 text-[9px] font-bold text-muted-text font-mono">
                    Min: {Math.min(...simVariables.termes).toFixed(1)}
                  </div>
                  <div className="absolute left-2 bottom-1 text-[9px] text-muted-text/80 font-serif">
                    Indices n →
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </Section>
    </div>
  );
};

export default Course_Ressources_Outils_Numeriques;
