import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, FormulaBox, 
  Quiz, Flashcard, InteractiveExercise, InteractiveChecklist, BentoGrid, BentoCard 
} from '../../components/SharedUI';
import { Sliders, RefreshCw, Layers, Sparkles, Check, ArrowRight, TrendingUp } from 'lucide-react';

// Simplex Algorithm 2D Polyhedron Visualizer
const SimplexVisualizer: React.FC = () => {
  // Model parameters
  const [c1, setC1] = useState<number>(3); // Profit Product 1
  const [c2, setC2] = useState<number>(5); // Profit Product 2
  const [b1, setB1] = useState<number>(10); // Resource 1 limit (x1 + 2x2 <= b1)
  const [b2, setB2] = useState<number>(12); // Resource 2 limit (2x1 + x2 <= b2)
  const [currentStep, setCurrentStep] = useState<number>(0); // Simplex step

  // Analytical calculations of the feasible region boundaries
  // Constraints: Line 1: x1 + 2x2 = b1 | Line 2: 2x1 + x2 = b2
  const intersection = useMemo(() => {
    // Solve:
    // x1 + 2x2 = b1  => x1 = b1 - 2x2
    // 2(b1 - 2x2) + x2 = b2 => 2b1 - 4x2 + x2 = b2 => 3x2 = 2b1 - b2 => x2* = (2b1 - b2)/3
    const x2 = (2 * b1 - b2) / 3;
    const x1 = b1 - 2 * x2;
    return { x1, x2, isValid: x1 >= 0 && x2 >= 0 };
  }, [b1, b2]);

  // Compute all corners of the polygon in order
  const vertices = useMemo(() => {
    const list = [];
    
    // 1. Origin ( हमेशा वैध )
    list.push({ id: 0, label: "A (Origine)", x1: 0, x2: 0 });

    // 2. Intercept on x2-axis: min(b1/2, b2)
    const interceptX2 = Math.min(b1 / 2, b2);
    list.push({ id: 1, label: "B (Axe x2)", x1: 0, x2: interceptX2 });

    // 3. Intersection if valid
    if (intersection.isValid) {
      list.push({ id: 2, label: "C (Optimal)", x1: intersection.x1, x2: intersection.x2 });
    }

    // 4. Intercept on x1-axis: min(b1, b2/2)
    const interceptX1 = Math.min(b1, b2 / 2);
    list.push({ id: 3, label: "D (Axe x1)", x1: interceptX1, x2: 0 });

    return list;
  }, [b1, b2, intersection]);

  // Simplex path simulation from (0,0) to optimal
  // Traditional simplex selects entering variable x2 (largest coefficient 5 vs 3),
  // goes to B (0, b1/2), then pivots to C (intersection) if valid, or stays at B.
  const simplexPath = useMemo(() => {
    const path = [];
    path.push(vertices[0]); // Start at A(0,0)

    // Pivot 1: entering x2 (since c2=5 is higher than c1=3 usually)
    // Limits: s1 (x2 <= b1/2) vs s2 (x2 <= b2). Tightest limit is vertex B
    const ptB = vertices.find(v => v.id === 1);
    if (ptB) path.push(ptB);

    // Pivot 2: entering x1. Moves to intersection C if valid, or stays at B
    if (intersection.isValid) {
      const ptC = vertices.find(v => v.id === 2);
      if (ptC) path.push(ptC);
    }

    return path;
  }, [vertices, intersection]);

  const activeVertex = simplexPath[Math.min(currentStep, simplexPath.length - 1)] || vertices[0];

  // Slack variables values at the active vertex
  const slacks = useMemo(() => {
    const s1 = b1 - (activeVertex.x1 + 2 * activeVertex.x2);
    const s2 = b2 - (2 * activeVertex.x1 + activeVertex.x2);
    return {
      s1: Math.max(0, s1),
      s2: Math.max(0, s2)
    };
  }, [activeVertex, b1, b2]);

  // Objective Z at the active vertex
  const zValue = activeVertex.x1 * c1 + activeVertex.x2 * c2;

  // Render variables dictionary for Simplex representation
  const isOptimal = currentStep === simplexPath.length - 1;

  // Convert real mathematical space [0, 16] x [0, 16] to 240x240 SVG coordinates
  const realToSvgX = (x: number) => 30 + (x / 14) * 200;
  const realToSvgY = (y: number) => 210 - (y / 14) * 200;

  // Create SVG points string for the polyhedron
  const svgPolyPointsStr = useMemo(() => {
    const pts = [];
    pts.push(`${realToSvgX(0)},${realToSvgY(0)}`);
    // Top intercept on x2
    const topX2 = Math.min(b1 / 2, b2);
    pts.push(`${realToSvgX(0)},${realToSvgY(topX2)}`);
    // Intersection
    if (intersection.isValid) {
      pts.push(`${realToSvgX(intersection.x1)},${realToSvgY(intersection.x2)}`);
    }
    // Right intercept on x1
    const rightX1 = Math.min(b1, b2 / 2);
    pts.push(`${realToSvgX(rightX1)},${realToSvgY(0)}`);
    return pts.join(' ');
  }, [b1, b2, intersection]);

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-5xl mx-auto my-8">
      
      {/* Visualizer Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-150 dark:border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={20} />
            Simulateur Graphique du Simplexe (2 Variables)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Visualisez le polyèdre des contraintes et observez comment l'algorithme "marche" de sommet en sommet vers l'optimum.
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex gap-2">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-50"
          >
            Étape Précédente
          </button>
          <button
            onClick={() => setCurrentStep(prev => Math.min(simplexPath.length - 1, prev + 1))}
            disabled={isOptimal}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 disabled:bg-emerald-600"
          >
            {isOptimal ? (
              <>
                <Check size={14} /> Optimum Atteint !
              </>
            ) : (
              <>
                Pivoter (Simplexe) <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders and control column (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sliders size={14} className="text-indigo-600" /> Options de Modélisation
          </h4>

          {/* Sliders Container */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-150 dark:border-slate-800 rounded-2xl space-y-4">
            {/* Profit coef 1 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Profit {"$c_1$"} (Produit x₁) :</span>
                <span className="font-mono text-indigo-600">{c1} €</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={c1}
                onChange={(e) => {
                  setC1(parseInt(e.target.value));
                  setCurrentStep(0);
                }}
                className="w-full h-1.5 accent-indigo-600 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
            </div>

            {/* Profit coef 2 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Profit {"$c_2$"} (Produit x₂) :</span>
                <span className="font-mono text-indigo-600">{c2} €</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={c2}
                onChange={(e) => {
                  setC2(parseInt(e.target.value));
                  setCurrentStep(0);
                }}
                className="w-full h-1.5 accent-indigo-600 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
            </div>

            {/* Constraint Limit 1 */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Ressource {"$b_1$"} (Mat. Première) :</span>
                <span className="font-mono text-indigo-600">{b1} kg</span>
              </div>
              <input
                type="range"
                min="6"
                max="14"
                step="1"
                value={b1}
                onChange={(e) => {
                  setB1(parseInt(e.target.value));
                  setCurrentStep(0);
                }}
                className="w-full h-1.5 accent-indigo-600 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <span className="text-[9px] text-slate-400 italic font-mono block mt-1">Équation : x₁ + 2x₂ ≤ {b1}</span>
            </div>

            {/* Constraint Limit 2 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Ressource {"$b_2$"} (Temps de Main d'Œuvre) :</span>
                <span className="font-mono text-indigo-600">{b2} h</span>
              </div>
              <input
                type="range"
                min="6"
                max="14"
                step="1"
                value={b2}
                onChange={(e) => {
                  setB2(parseInt(e.target.value));
                  setCurrentStep(0);
                }}
                className="w-full h-1.5 accent-indigo-600 cursor-col-resize bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <span className="text-[9px] text-slate-400 italic font-mono block mt-1">Équation : 2x₁ + x₂ ≤ {b2}</span>
            </div>

            <button
              onClick={() => {
                setC1(3);
                setC2(5);
                setB1(10);
                setB2(12);
                setCurrentStep(0);
              }}
              className="w-full text-xs font-bold py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-1"
            >
              <RefreshCw size={11} /> Réinitialiser
            </button>
          </div>

          {/* Quick results card */}
          <div className="bg-emerald-550/10 text-emerald-800 dark:text-emerald-300 rounded-2xl p-4 border border-emerald-500/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wide block">Statut Actuel du Simplexe :</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-1.5 bg-white dark:bg-slate-950/60 rounded border border-emerald-500/10">
                <span className="text-[9px] text-slate-400">Sommet en cours:</span>
                <span className="block font-bold mt-0.5">{activeVertex.label}</span>
              </div>
              <div className="p-1.5 bg-white dark:bg-slate-950/60 rounded border border-emerald-500/10">
                <span className="text-[9px] text-slate-400">Profit Z obtenu :</span>
                <span className="block font-bold text-emerald-600 mt-0.5">{zValue.toFixed(1)} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual representation and Tableaux columns (8 cols on lg) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Constrained Polyhedron SVG Drawing */}
          <div className="bg-slate-955 rounded-2xl p-4 flex flex-col items-center justify-between border border-slate-900 bg-slate-950 min-h-[260px]">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block self-start">
              📐 Polyèdre des Contraintes et Chemin du Simplexe
            </span>

            <div className="w-full flex-1 flex items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-full max-w-[210px] aspect-square overflow-visible">
                {/* Horizontal & Vertical grid axes */}
                <line x1="30" y1="210" x2="230" y2="210" className="stroke-slate-700" strokeWidth="1" />
                <line x1="30" y1="10" x2="30" y2="210" className="stroke-slate-700" strokeWidth="1" />
                
                {/* Axes labels */}
                <text x="225" y="222" className="fill-slate-500 text-[8px] font-mono font-bold">x₁</text>
                <text x="18" y="15" className="fill-slate-500 text-[8px] font-mono font-bold">x₂</text>

                {/* Drawn Feasible Region Polygon */}
                <polygon
                  points={svgPolyPointsStr}
                  className="fill-indigo-500/15 stroke-indigo-500/30"
                  strokeWidth="1.5"
                />

                {/* Constraint Line 1: x1 + 2x2 = b1 */}
                <line
                  x1={realToSvgX(0)}
                  y1={realToSvgY(b1 / 2)}
                  x2={realToSvgX(b1)}
                  y2={realToSvgY(0)}
                  className="stroke-amber-500 stroke-dasharray-[2,2] opacity-60"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                
                {/* Constraint Line 2: 2x1 + x2 = b2 */}
                <line
                  x1={realToSvgX(0)}
                  y1={realToSvgY(b2)}
                  x2={realToSvgX(b2 / 2)}
                  y2={realToSvgY(0)}
                  className="stroke-rose-450 stroke-dasharray-[2,2] opacity-60"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />

                {/* Simplex search path line tracking */}
                <polyline
                  points={simplexPath.map(v => `${realToSvgX(v.x1)},${realToSvgY(v.x2)}`).join(' ')}
                  className="fill-none stroke-emerald-500/40"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Plot corners circles */}
                {vertices.map(v => {
                  const isActive = v.x1 === activeVertex.x1 && v.x2 === activeVertex.x2;
                  return (
                    <circle
                      key={`corner-${v.id}`}
                      cx={realToSvgX(v.x1)}
                      cy={realToSvgY(v.x2)}
                      r={isActive ? "5" : "3.5"}
                      className={`transition-all ${
                        isActive 
                          ? "fill-emerald-500 stroke-white ring-2 ring-emerald-500" 
                          : "fill-indigo-400 stroke-slate-900"
                      }`}
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Arrow head direction indicating path */}
                {simplexPath.map((v, idx) => {
                  if (idx === 0) return null;
                  const prev = simplexPath[idx - 1];
                  // Place a small green arrow mid-way
                  const midX = (realToSvgX(prev.x1) + realToSvgX(v.x1)) / 2;
                  const midY = (realToSvgY(prev.x2) + realToSvgY(v.x2)) / 2;
                  return (
                    <circle
                      key={`arrow-${idx}`}
                      cx={midX}
                      cy={midY}
                      r="1.5"
                      className="fill-emerald-400"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex gap-4 text-[7px] font-mono text-slate-500 pb-1 w-full justify-between px-2">
              <span>🟪 Polygone Admissible (Feasible Set)</span>
              <span>🟢 Sommet Actuel</span>
              <span>⚡ Chemin du Simplexe</span>
            </div>
          </div>

          {/* Simplex Dictionary / Tableau Representation */}
          <div className="bg-slate-950 rounded-2xl p-4 flex flex-col justify-between border border-slate-900 min-h-[260px]">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
              📊 Dictionnaire algébrique du Simplexe
            </span>

            <div className="flex-1 flex flex-col justify-center space-y-4 py-4 font-mono text-[10px] text-slate-200">
              
              {/* Variable state summary */}
              <div className="grid grid-cols-2 gap-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[8px] block uppercase font-bold">En base (Basiques) :</span>
                  <div className="text-xs text-indigo-400 font-bold">
                    {activeVertex.id === 0 && <>s₁ = {slacks.s1}, s₂ = {slacks.s2}</>}
                    {activeVertex.id === 1 && <>x₂ = {activeVertex.x2.toFixed(1)}, s₂ = {slacks.s2.toFixed(1)}</>}
                    {activeVertex.id === 2 && <>x₁ = {activeVertex.x1.toFixed(1)}, x₂ = {activeVertex.x2.toFixed(1)}</>}
                    {activeVertex.id === 3 && <>x₁ = {activeVertex.x1.toFixed(1)}, s₁ = {slacks.s1.toFixed(1)}</>}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-[8px] block uppercase font-bold">Hors base (Nulles) :</span>
                  <div className="text-xs text-rose-450 font-bold">
                    {activeVertex.id === 0 && <>x₁ = 0, x₂ = 0</>}
                    {activeVertex.id === 1 && <>x₁ = 0, s₁ = 0</>}
                    {activeVertex.id === 2 && <>s₁ = 0, s₂ = 0</>}
                    {activeVertex.id === 3 && <>x₂ = 0, s₂ = 0</>}
                  </div>
                </div>
              </div>

              {/* Dynamic equations of dictionary */}
              <div className="space-y-1.5 p-2 bg-slate-900/40 rounded-xl border border-slate-800/60 leading-normal">
                <span className="text-slate-500 text-[8px] block uppercase font-bold">Écritures des dicos (substitution)</span>
                {activeVertex.id === 0 && (
                  <>
                    <div>s₁ = {b1} - x₁ - 2x₂</div>
                    <div>s₂ = {b2} - 2x₁ - x₂</div>
                    <div className="text-emerald-400 font-bold">Z = {c1}x₁ + {c2}x₂</div>
                  </>
                )}
                {activeVertex.id === 1 && (
                  <>
                    {/* s1 = b1 - x1 - 2x2 => 2x2 = b1 - x1 - s1 => x2 = b1/2 - 0.5x1 - 0.5s1 */}
                    <div>x₂ = {(b1/2).toFixed(1)} - 0.5x₁ - 0.5s₁</div>
                    {/* s2 = b2 - 2x1 - x2 = b2 - 2x1 - (b1/2 - 0.5x1 - 0.5s1) = (b2 - b1/2) - 1.5x1 + 0.5s1 */}
                    <div>s₂ = {(b2 - b1/2).toFixed(1)} - 1.5x₁ + 0.5s₁</div>
                    <div className="text-emerald-400 font-bold">Z = {(b1/2 * c2).toFixed(1)} + {(c1 - 0.5 * c2).toFixed(2)}x₁ - {(0.5 * c2).toFixed(1)}s₁</div>
                  </>
                )}
                {activeVertex.id === 2 && (
                  <>
                    <h5 className="text-emerald-500 font-bold">CONVERGENCE DES PIVOTS OPTIMALE</h5>
                    <div className="text-xs text-slate-400">
                      Tous les coefficients des variables hors-base dans l'expression de Z sont négatifs. Augmenter x₁ ou x₂ détruirait le profit : l'algorithme s'arrête !
                    </div>
                  </>
                )}
                {activeVertex.id === 3 && (
                  <>
                    {/* 2x1 + x2 = b2 => 2x1 = b2 - x2 - s2 => x1 = b2/2 - 0.5x2 - 0.5s2 */}
                    <div>x₁ = {(b2/2).toFixed(1)} - 0.5x₂ - 0.5s₂</div>
                    <div>s₁ = {(b1 - b2/2).toFixed(1)} - 1.5x₂ + 0.5s₂</div>
                    <div className="text-emerald-400 font-bold">Z = {(b2/2 * c1).toFixed(1)} + {(c2 - 0.5 * c1).toFixed(2)}x₂ - {(0.5 * c1).toFixed(1)}s₂</div>
                  </>
                )}
              </div>

            </div>

            <p className="text-[8px] text-slate-500 text-center font-mono leading-tight">
              Le simplexe progresse en éliminant les variables de Z ayant de forts coefficients positifs d'opportunité en base jusqu'à s'assurer que l'expression finale ne présente que des gradients négatifs.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const Course_Post_Bac_BUT_GEA_Simplexe: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="GEA-MATH-RO"
        title="Recherche Opérationnelle & Algorithme du Simplexe"
        subtitle="Optimisation linéaire de portefeuilles industriels : écriture standard, dictionnaires d'itération et parcours bivarié de polyèdres de décision."
        duration="1h 20"
      />

      <InfoBlock type="info" title="L'optimisation globale sous contraintes">
        La recherche opérationnelle (RO) est née durant la Seconde Guerre mondiale pour rationaliser l'acheminement des vivres et des munitions. Aujourd'hui, elle structure toute l'aide à la décision en gestion, logistique et planification industrielle. Dès lors que le nombre de variables dépasse l'entendement humain, l'algorithme du Simplexe de George Dantzig s'avère d'une efficacité redoutable pour balayer avec méthode les sommets d'un polyèdre convexe multidimensionnel.
      </InfoBlock>

      <Section title="1. Modélisation et Mise sous Forme Standard" icon="📐" color="indigo">
        <p className="mb-4 text-sm leading-relaxed">
          Pour résoudre un programme linéaire avec l'algorithme du Simplexe, nous devons d'abord formaliser mathématiquement le problème de gestion sous sa <strong>forme standard</strong>, qui requiert des égalités et des variables non-négatives.
        </p>

        <FormulaBox 
          title="Écriture canonique matricielle" 
          math={"\\max Z = c^T x \\quad \\text{sous contrainte } A x \\le b \\quad \\text{et } x \\ge 0"} 
        />

        <p className="my-4 text-sm leading-relaxed">
          Pour éliminer les inégalités de type {"$a_{i1}x_1 + a_{i2}x_2 \\le b_i$"}, nous ajoutons pour chaque ligne de contrainte une variable positive appelée <strong>variable d'écart (slack variable)</strong>, notée {"$s_i$"}, représentant le surplus inutilisé de la ressource correspondante :
        </p>

        <FormulaBox 
          title="Transformation en Égalités Standard" 
          math={"a_{i1} x_1 + a_{i2} x_2 + s_i = b_i \\quad \\text{avec } s_i \\ge 0"} 
        />
      </Section>

      <Section title="2. Dictionnaires de Base et Pivotage de Dantzig" icon="⚡" color="slate">
        <p className="mb-4 text-sm leading-relaxed">
          Un dictionnaire (ou tableau) du Simplexe sépare les variables en deux groupes exclusifs :
          <br />
          - Les <strong>variables en base (basiques)</strong>, dont les valeurs sont immédiatement lues à gauche des égalités.<br />
          - Les <strong>variables hors-base (non-basiques)</strong>, affectées à la valeur 0 pour fixer un sommet de l'espace admissible.
        </p>

        <BentoGrid>
          <BentoCard title="Choix de la Variable Entrante" icon={<TrendingUp className="text-emerald-500" size={18} />} color="emerald">
            À chaque étape de pivotage, on sélectionne pour entrer dans la base la variable hors-base ayant le <strong>coefficient positif le plus grand</strong> dans la ligne de profit {"$Z$"}. C'est elle qui offre le meilleur levier d'amélioration marginale du résultat.
          </BentoCard>

          <BentoCard title="Test du Ratio Minimum (Sortante)" icon={<RefreshCw className="text-rose-500" size={18} />} color="rose">
            Pour déterminer quelle variable doit libérer sa place et sortir de la base, on évalue le ratio {"$b_i / a_{ij}$"} sur toutes les lignes. La ligne donnant le <strong>ratio strictement minimum</strong> désigne la variable sortante pour ne pas franchir la frontière des contraintes.
          </BentoCard>

          <BentoCard title="Critère d'Arêt de l'Algorithme" icon={<Layers className="text-amber-500" size={18} />} color="amber">
            L'algorithme s'arrête de lui-même dès lors que tous les coefficients de rentabilité devant les variables hors-base dans l'expression résiduelle de {"$Z$"} deviennent négatifs ou nuls. Aucun mouvement d'amélioration n'est alors physiquement possible.
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section title="3. Laboratoire Interactif de Pivotage" icon="🔬" color="indigo">
        <SimplexVisualizer />
      </Section>

      <Section title="🧠 Flashcards : Algorithme du Simplexe" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous à conceptualiser l&apos;algorithme du Simplexe de George Dantzig.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Qu&apos;est-ce qu&apos;une variable d&apos;écart (slack variable) ?</>}
            back={<>C&apos;est une variable ajoutée positive représentant les <strong>ressources inutilisées</strong>. Elle permet de transformer une inégalité {"$A \\cdot x \\le b$"} en une équation stricte {"$A \\cdot x + s = b$"} résoluble matriciellement.</>}
          />
          <Flashcard 
            front={<>À quelle condition géométrique s&apos;arrête l&apos;algorithme du Simplexe ?</>}
            back={<>Il s&apos;arrête quand les coefficients de l&apos;équation du profit Z devant toutes les variables hors-base sont <strong>inférieurs ou égaux à 0</strong>. On a alors atteint un sommet optimal.</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice d&apos;Analyse Classique Corrigé" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice Résolu : Pivotage à la main de Dantzig"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>Soit le programme linéaire standard d'optimisation suivant :</p>
              {"$$\\max Z = 4x_1 + 3x_2$$"}
              {"$$\\text{Sujet à : } \\begin{cases} 2x_1 + x_2 \\le 8 \\\\ x_1 + 2x_2 \\le 7 \\end{cases}$$"}
              <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                <li>Établir le dictionnaire du Simplexe de départ (Sommet {"$x_1=0, x_2=0$"}).</li>
                <li>Déterminer les variables entrante et sortante du premier pivot de recherche.</li>
                <li>Écrire le dictionnaire final optimal et donner la solution.</li>
              </ol>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Dictionnaire initial et variables</p>
              <p>On introduit les variables d'écart positives {"$s_1, s_2 \\ge 0$"}. La forme standard s'exprime comme l'ensemble des égalités :</p>
              {"$$s_1 = 8 - 2x_1 - x_2$$"}
              {"$$s_2 = 7 - x_1 - 2x_2$$"}
              {"$$Z = 4x_1 + 3x_2$$"}
              <p>Dans ce dico initial, les variables en base sont {"$\\{s_1, s_2\\}$"} valant respectivement 8 et 7. Les variables hors-base sont {"$\\{x_1, x_2\\}$"} valant 0.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 text-xs text-slate-800 dark:text-emerald-110">
              <p className="font-bold text-emerald-900 dark:text-emerald-550 mb-1">Étape 2 : Identication du premier pivot des ratios</p>
              <p><strong>Variable entrante :</strong> Le coefficient de {"$x_1$"} dans Z (4) est supérieur à celui de {"$x_2$"} (3). Donc <strong>{"$x_1$"} entre en base</strong>.</p>
              <p><strong>Variable sortante (Ratio Test) :</strong> Évaluons la limite imposée par chaque ligne :</p>
              {"$$\\text{Ligne 1 : } x_1 \\le 8 / 2 = 4$$"}
              {"$$\\text{Ligne 2 : } x_1 \\le 7 / 1 = 7$$"}
              <p>La limite la plus restrictive est 4 sur la première ligne, ce qui pousse la variable d'écart <strong>{"$s_1$"} à sortir de la base</strong>.</p>
              <p><strong>Pivotage :</strong> On isole {"$x_1$"} de la Ligne 1 :</p>
              {"$$2x_1 = 8 - s_1 - x_2 \\implies x_1 = 4 - 0.5s_1 - 0.5x_2$$"}
              <p>En remplaçant cette expression de {"$x_1$"} dans s₂ et Z, on en tire le deuxième dictionnaire intermédiaire :</p>
              {"$$s_2 = 7 - (4 - 0.5s_1 - 0.5x_2) - 2x_2 = 3 + 0.5s_1 - 1.5x_2$$"}
              {"$$Z = 4(4 - 0.5s_1 - 0.5x_2) + 3x_2 = 16 - 2s_1 + x_2$$"}
            </div>,
            <div className="bg-slate-50 dark:bg-slate-900 text-xs p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">Étape 3 : Second pivot et solution finale optimale</p>
              <p>Dans le second dictionnaire, seul le terme devant {"$x_2$"} est positif (1), donc <strong>{"$x_2$"} entre en base</strong>.</p>
              <p>Le seul ratio d'inéquation négatif se trouve sur la ligne {"$s_2$"}:</p>
              {"$$1.5x_2 \\le 3 \\implies x_2 \\le 2$$"}
              <p>Donc <strong>{"$s_2$"} sort de la base</strong>. Isolez {"$x_2$"}:</p>
              {"$$1.5x_2 = 3 + 0.5s_1 - s_2 \\implies x_2 = 2 + \\frac{1}{3}s_1 - \\frac{2}{3}s_2$$"}
              <p>Substituons cette écriture dans les autres variables et dans l'objectif de Z :</p>
              {"$$x_1 = 4 - 0.5s_1 - 0.5\\left(2 + \\frac{1}{3}s_1 - \\frac{2}{3}s_2\\right) = 3 - \\frac{2}{3}s_1 + \\frac{1}{3}s_2$$"}
              {"$$Z = 16 - 2s_1 + \\left(2 + \\frac{1}{3}s_1 - \\frac{2}{3}s_2\\right) = 18 - \\frac{5}{3}s_1 - \\frac{2}{3}s_2$$"}
              <p><strong>Conclusion :</strong> Dans l'expression de Z finale, tous les coefficients devant les écarts {"$s_1, s_2$"} sont strictement négatifs. L'optimum est donc atteint et vaut :</p>
              {"$$\\text{Solution optimale : } (x_1^*, x_2^*) = (3, 2) \\quad \\text{avec } Z^* = 18 \\text{ €}$$"}
            </div>
          ]}
        />
      </Section>

      <Section title="5. Contrôle Qualité de Recherche Opérationnelle" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle variable choisit-on de faire entrer en base à chaque pas de pivotage ?",
              options: [
                "Celle qui offre le plus petit ratio d'inéquation.",
                "Celle qui présente le coefficient positif de profit le plus grand dans la ligne de Z.",
                "Celle qui s'élève au carré de façon exponentielle."
              ],
              correctAnswer: 1,
              explanation: "Pour faire progresser Z le plus rapidement possible, l'algorithme du Simplexe sélectionne en priorité de pivotage la variable hors-base offrant la plus forte contribution marginale, soit le plus grand coefficient positif dans Z."
            },
            {
              question: "Que représente physiquement une variable d'écart sᵢ à l'optimum du problème ?",
              options: [
                "L'excédent de profit non-capitalisé.",
                "La fraction non consommée de la ressource i correspondante.",
                "La probabilité de faire faillite durant le projet."
              ],
              correctAnswer: 1,
              explanation: "Les variables d'écart mesurent précisément la marge inutilisée : si s_i = 0, la ressource est saturée (contrainte active). Si s_i > 0, il reste de la marge de manœuvre matérielle ou financière."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Traduire un énoncé concret de gestion commerciale sous sa forme canonique d'inéquations.",
            "Ajouter correctement des variables d'écart pour standardiser le problème.",
            "Déterminer les variables entrantes et sortantes lors d'un test de pivot de Dantzig.",
            "Lire et interpréter l'optimum et ses variables duales d'écart sur le dictionnaire final."
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

export default Course_Post_Bac_BUT_GEA_Simplexe;
