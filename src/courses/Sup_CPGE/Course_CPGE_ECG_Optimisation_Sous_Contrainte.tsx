import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, FormulaBox, 
  Quiz, Flashcard, InteractiveExercise, InteractiveChecklist, BentoGrid, BentoCard 
} from '../../components/SharedUI';
import { Sliders, RefreshCw, Compass, TrendingUp, DollarSign, Award, Target, HelpCircle } from 'lucide-react';

const ConstraintOptimizationInteractiveVisualizer: React.FC = () => {
  // Price of good X, price of good Y, budget B
  const [px, setPx] = useState<number>(1.2);
  const [py, setPy] = useState<number>(1.6);
  const [budget, setBudget] = useState<number>(5.5);

  // Preference peak coordinates (bliss point)
  const [xPeak, setXPeak] = useState<number>(3.5);
  const [yPeak, setYPeak] = useState<number>(3.5);

  // Math calculation of optimal point and Lagrange multiplier
  // Maximize f(x, y) = 15 - (x - xPeak)^2 - 2*(y - yPeak)^2
  // Subject to g(x, y) = px * x + py * y - budget <= 0 (x>=0, y>=0)
  
  // Is the constraint active? (If price of peak is greater than budget)
  const isConstraintActive = (px * xPeak + py * yPeak > budget);

  // Analytical Lagrange Multiplier Lambda:
  // grad f = lambda * grad g
  // [-2*(x - xPeak)] = lambda * px  =>  x = xPeak - (lambda * px) / 2
  // [-4*(y - yPeak)] = lambda * py  =>  y = yPeak - (lambda * py) / 4
  // Substitute in px * x + py * y = budget:
  // px * [xPeak - (lambda * px) / 2] + py * [yPeak - (lambda * py) / 4] = budget
  // px*xPeak + py*yPeak - budget = lambda * (px^2 / 2 + py^2 / 4)
  // lambda = 4 * (px*xPeak + py*yPeak - budget) / (2*px^2 + py^2)
  const lambda = isConstraintActive 
    ? (4 * (px * xPeak + py * yPeak - budget)) / (2 * px * px + py * py)
    : 0;

  const xRaw = isConstraintActive ? xPeak - (lambda * px) / 2 : xPeak;
  const yRaw = isConstraintActive ? yPeak - (lambda * py) / 4 : yPeak;

  // Clamp values to non-negative quadrant for realistic display
  const xOpt = Math.max(0, Math.min(5, xRaw));
  const yOpt = Math.max(0, Math.min(5, yRaw));

  // Compute Utility value
  const getUtilityValue = (x: number, y: number): number => {
    return 15 - Math.pow(x - xPeak, 2) - 2 * Math.pow(y - yPeak, 2);
  };

  const currentUtility = getUtilityValue(xOpt, yOpt);

  // Coord converter for 300x300 SVG with (0,0) to (5,5) bounds
  const toSvgX = (x: number) => (x / 5) * 300;
  const toSvgY = (y: number) => 300 - (y / 5) * 300;

  // Render elegant concentric utility ellipses
  const renderContourEllipses = () => {
    const list = [];
    // Levels of utility from peak downwards
    const offsetLevels = [0.8, 2.0, 4.0, 7.0];
    for (const dU of offsetLevels) {
      // (x-xPeak)^2 + 2*(y-yPeak)^2 = dU
      // rx = sqrt(dU), ry = sqrt(dU / 2)
      const rxStr = Math.sqrt(dU);
      const ryStr = Math.sqrt(dU / 2);
      list.push(
        <ellipse
          key={`contour-${dU}`}
          cx={toSvgX(xPeak)}
          cy={toSvgY(yPeak)}
          rx={(rxStr / 5) * 300}
          ry={(ryStr / 5) * 300}
          className="stroke-indigo-500/30 fill-none"
          strokeWidth="1"
          strokeDasharray="2,3"
        />
      );
    }
    return list;
  };

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Compass className="text-indigo-600 animate-spin-slow" size={22} />
        Tableau Graphique des Multiplicateurs de Lagrange
      </h3>
      <p className="text-xs text-slate-505 text-center mb-6">
        Simulez la théorie de l'optimum du consommateur en économie. Réglez les prix, le budget et le sommet de volupté pour observer le point de tangence géométrique.
      </p>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* LEFT PANEL: Budget Line Controls */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <DollarSign size={14} className="text-emerald-500" /> Paramètres Budgétaires (Contrainte)
          </label>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span> Prix du bien X : </span>
                <span className="font-mono text-emerald-600 font-bold">p_x = {px.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.5" max="3" step="0.1" value={px} onChange={(e) => setPx(Number(e.target.value))}
                className="w-full cursor-col-resize accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-705 rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span> Prix du bien Y : </span>
                <span className="font-mono text-emerald-600 font-bold">p_y = {py.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.5" max="3" step="0.1" value={py} onChange={(e) => setPy(Number(e.target.value))}
                className="w-full cursor-col-resize accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-705 rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span> Budget Total disponible : </span>
                <span className="font-mono text-emerald-600 font-bold">B = {budget.toFixed(1)} €</span>
              </div>
              <input 
                type="range" min="1.5" max="9" step="0.2" value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full cursor-col-resize accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-705 rounded"
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Preference Bliss point */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Target size={14} className="text-indigo-500" /> Point de Félicité (Volupté Maximale)
          </label>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span> Coordonnée X de félicité : </span>
                <span className="font-mono text-indigo-650 font-bold">x_s = {xPeak.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="1.0" max="4.5" step="0.1" value={xPeak} onChange={(e) => setXPeak(Number(e.target.value))}
                className="w-full cursor-col-resize accent-indigo-505 h-1.5 bg-slate-200 dark:bg-slate-705 rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span> Coordonnée Y de félicité : </span>
                <span className="font-mono text-indigo-650 font-bold">y_s = {yPeak.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="1.0" max="4.5" step="0.1" value={yPeak} onChange={(e) => setYPeak(Number(e.target.value))}
                className="w-full cursor-col-resize accent-indigo-505 h-1.5 bg-slate-200 dark:bg-slate-705 rounded"
              />
            </div>
          </div>
          
          <div className="text-[10px] text-slate-400 leading-tight">
            Le point de félicité représente le panier d'achat idéal si le budget de l'agent économique était infini. Si le budget est suffisant, l'optimum s'établit exactement sur ce sommet.
          </div>
        </div>

      </div>

      {/* Main visualizer and diagnostics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Dynamic SVG Visual plot */}
        <div className="md:col-span-2 bg-slate-950 rounded-2xl p-5 flex flex-col items-center justify-center relative min-h-[320px] shadow-inner">
          <svg 
            viewBox="0 0 300 300"
            className="w-full max-w-[270px] aspect-square rounded-xl bg-slate-900 border border-slate-800"
          >
            {/* Grid coordinate system */}
            {[1, 2, 3, 4].map(idx => (
              <g key={`grid-lines-${idx}`}>
                <line x1={toSvgX(idx)} y1="0" x2={toSvgX(idx)} y2="300" className="stroke-slate-800" strokeWidth="0.5" />
                <line x1="0" y1={toSvgY(idx)} x2="300" y2={toSvgY(idx)} className="stroke-slate-800" strokeWidth="0.5" />
              </g>
            ))}

            {/* Render utility concentric ellipses */}
            {renderContourEllipses()}

            {/* Bliss summit target */}
            <g transform={`translate(${toSvgX(xPeak)}, ${toSvgY(yPeak)})`}>
              <line x1="-8" y1="0" x2="8" y2="0" className="stroke-indigo-400" strokeWidth="1.2" />
              <line x1="0" y1="-8" x2="0" y2="8" className="stroke-indigo-400" strokeWidth="1.2" />
              <circle r="3.5" className="fill-indigo-500 stroke-white" strokeWidth="0.8" />
            </g>

            {/* Budget region fill (x*px + y*py <= B) */}
            {/* Draw a polygon for x >= 0, y >= 0, inside budget */}
            <polygon
              points={`0,300 0,${toSvgY(budget / py)} ${toSvgX(budget / px)},300`}
              className="fill-emerald-500/10 pointer-events-none"
            />

            {/* Budget Constraint Line (g = 0) */}
            <line 
              x1="0" 
              y1={toSvgY(budget / py)} 
              x2={toSvgX(budget / px)} 
              y2="300" 
              className="stroke-emerald-400" 
              strokeWidth="2.5" 
            />

            {/* Optimal Tangency point */}
            <g transform={`translate(${toSvgX(xOpt)}, ${toSvgY(yOpt)})`}>
              <circle r="7.5" className="fill-none stroke-rose-500 animate-ping opacity-60" strokeWidth="1.2" />
              <circle r="4.5" className="fill-rose-500 stroke-white" strokeWidth="1" />
            </g>

            {/* Render Gradients Tangent arrows if constraint is active */}
            {isConstraintActive && (
              <>
                {/* grad f arrow in Rose color */}
                <line 
                  x1={toSvgX(xOpt)} 
                  y1={toSvgY(yOpt)} 
                  x2={toSvgX(xOpt + (xPeak - xOpt) * 0.4)} 
                  y2={toSvgY(yOpt + (yPeak - yOpt) * 0.4)} 
                  className="stroke-rose-450" 
                  strokeWidth="2" 
                  markerEnd="url(#arrow-f)"
                />
                
                {/* grad g arrow in Emerald color */}
                <line 
                  x1={toSvgX(xOpt)} 
                  y1={toSvgY(yOpt)} 
                  x2={toSvgX(xOpt + px * 0.4)} 
                  y2={toSvgY(yOpt + py * 0.4)} 
                  className="stroke-emerald-400" 
                  strokeWidth="2" 
                />
              </>
            )}

            {/* Labels and values on borders */}
            <text x="5" y="15" className="fill-slate-500 text-[8px] font-mono font-black">Coordonnée Y : Biens de Service</text>
            <text x="180" y="295" className="fill-slate-500 text-[8px] font-mono font-black">Coordonnée X : Biens de Consom.</text>
          </svg>

          {/* Key tags bottom */}
          <div className="flex gap-4 mt-3 text-[10px] font-mono text-slate-350">
            <div><span className="text-indigo-400">●</span> Sommet Félicité</div>
            <div><span className="text-emerald-400">━</span> Budget Linéaire</div>
            <div><span className="text-rose-500">●</span> Panier Optimal</div>
          </div>
        </div>

        {/* Diagnostic parameters console */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-4 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <TrendingUp size={14} className="text-indigo-600 animate-pulse" /> Diagnostic Optimal
            </div>

            <div className="space-y-2">
              <div className="px-3 py-2 bg-white dark:bg-slate-950 rounded-lg border border-slate-100 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450">Panier Optimal X* :</span>
                <span className="font-bold text-slate-850 dark:text-slate-205">{xOpt.toFixed(3)}</span>
              </div>

              <div className="px-3 py-2 bg-white dark:bg-slate-950 rounded-lg border border-slate-100 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450">Panier Optimal Y* :</span>
                <span className="font-bold text-slate-850 dark:text-slate-205">{yOpt.toFixed(3)}</span>
              </div>

              <div className="px-3 py-2 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg border border-indigo-100/50 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450 font-semibold text-indigo-805">Multiplicateur {"$\\lambda^*$"} :</span>
                <span className="font-bold text-indigo-600 text-sm">{lambda.toFixed(4)}</span>
              </div>

              <div className="px-3 py-2 bg-rose-50/50 dark:bg-rose-950/20 rounded-lg border border-rose-100/50 font-mono text-xs flex justify-between items-center">
                <span className="text-slate-450">Utilité f(X*, Y*) :</span>
                <span className="font-bold text-rose-600 font-bold">{currentUtility.toFixed(3)}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-505 leading-relaxed bg-slate-100 dark:bg-slate-950 p-3 rounded-lg border border-slate-150 space-y-1.5">
              {isConstraintActive ? (
                <p>💡 <strong>Contrainte Active :</strong> Le consommateur a épuisé tout son budget. Les deux gradients de volupté et de prix pointent dans la même direction orthogonale, assurant la tangence parfaite !</p>
              ) : (
                <p>🤩 <strong>Contrainte Inactive :</strong> Le budget est tellement élevé que le consommateur peut se payer le panier idéal qui sature ses envies. Le multiplicateur {"$\\lambda^*$"} tombe à 0.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Course_CPGE_ECG_Optimisation_Sous_Contrainte: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-ECG-OPT"
        title="Optimisation Sous Contrainte"
        subtitle="Théorie des extremums liés, multiplicateurs de Lagrange et interprétation économique en microéconomie des concours d'Écoles de Commerce (HEC, ESSEC, ESCP)."
        duration="1h 20"
      />

      <InfoBlock type="info" title="L'un des piliers des écrits de Mathématiques pour l'ECG">
        Que ce soit à HEC, l'ESSEC ou l'EM Lyon, les problèmes d'analyse traitent fréquemment des fonctions de plusieurs variables où l'on cherche à maximiser une production ou minimiser un coût de revient sous une contrainte technique ou financière. La méthode des multiplicateurs de Lagrange permet de transformer un problème d'optimisation sous contrainte fermée en la recherche d'un point critique classique d'une fonction d'altitude augmentée, appelée le <strong>Lagrangien</strong>.
      </InfoBlock>

      <Section title="1. Extremums Liés et position du Problème" icon="📐" color="slate">
        <p className="mb-4">
          Considérons deux fonctions de plusieurs variables, {"$f, g: U \subset \mathbb{R}^n \to \mathbb{R}$"}, supposées de classe {"$\\mathcal{C}^1$"}. Notre objectif mathématique est de chercher les extremums globaux ou locaux de la fonction objectif {"$f$"} restreinte à l'ensemble de niveau zero de la contrainte, appelé la surface de contrainte :
          {"$$\\mathcal{C} = \\left\\{ u \\in U \\ ; \\ g(u) = c \\right\\}$$"}
        </p>

        <BentoGrid>
          <BentoCard title="Extremum Libre vs Extremum Lié" icon={<Target className="text-rose-500" size={18} />} color="rose">
            Un extremum libre se caractérise par l'annulation complète du gradient : {"$\\nabla f(x) = 0$"}. 
            A contrario, un extremum lié sur {"$\\mathcal{C}$"} peut se produire en un point où le gradient de l'objectif n'est pas nul ! C'est ce qui rend l'analyse plus subtile.
          </BentoCard>

          <BentoCard title="Condition Géométrique de Tangence" icon={<Compass className="text-indigo-650" size={18} />} color="indigo">
            Au point optimal {"$u^*$"}, les courbes de niveau de {"$f$"} doivent être parfaitement tangentes à la surface de contrainte {"$g(u) = c$"}. Cela implique géométriquement que les deux gradients sont colinéaires !
          </BentoCard>

          <BentoCard title="Théorème de Lagrange" icon={<Award className="text-emerald-650" size={18} />} color="emerald">
            S'il existe un extremum local lié en {"$u^*$"} (qui est un point régulier de la contrainte), alors il existe un scalaire réel {"$\\lambda \\in \mathbb{R}$"} tel que :
            <div className="bg-white dark:bg-slate-950 p-2 border border-emerald-150 rounded-lg text-center font-mono my-2 text-emerald-700 text-xs font-bold">
              {"$\\nabla f(u^*) = \\lambda \\nabla g(u^*)$"}
            </div>
            Le scalaire {"$\\lambda$"} est appelé le <strong>multiplicateur de Lagrange</strong>.
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section title="2. Le Lagrangien et la Recherche des Points Critiques" icon="⚡" color="indigo">
        <p className="mb-4">
          La méthode ingénieuse de Joseph-Louis Lagrange consiste à regrouper l'objectif et la contrainte de façon linéaire dans une unique fonction auxiliaire appelée <strong>Lagrangien</strong>, définie par :
          {"$$\\mathcal{L}(u, \\lambda) = f(u) - \\lambda (g(u) - c)$$"}
        </p>

        <TipBanner type="info" title="Conversion magique du problème">
          Grâce à cette astuce, la recherche des extremums liés de {"$f$"} sous la contrainte {"$g = c$"} se ramène exactement à la recherche des points critiques <strong>libres et classiques</strong> du Lagrangien par rapport à l'ensemble de ses variables, y compris {"$\\lambda$"} !
        </TipBanner>

        <div className="my-6">
          <FormulaBox 
            title="Système des Conditions du Premier Ordre (C.P.O)" 
            math={"\\begin{cases} \\frac{\\partial \\mathcal{L}}{\\partial x_k}(u, \\lambda) = 0 \\quad \\forall k \\in \\{1, \\dots, n\\} \\\\ \\frac{\\partial \\mathcal{L}}{\\partial \\lambda}(u, \\lambda) = -(g(u) - c) = 0 \\end{cases}"} 
          />
        </div>

        <InfoBlock type="definition" title="Le rôle d'amortissement de la Hessienne Bordée (C.S.O)">
          Savoir identifier un point critique lié est une chose, prouver sa nature (maximum ou minimum local lié) en est une autre. Dans le supérieur ou pour les problèmes approfondis des concours, on étudie la matrice Hessienne dite <strong>'Bordée'</strong> (Bordered Hessian), obtenue en collant les coefficients de contraintes autour de la Hessienne de {"$f$"}.
        </InfoBlock>
      </Section>

      <Section title="3. Laboratoire Économique de Tangence Linéaire" icon="🔬" color="indigo">
        <ConstraintOptimizationInteractiveVisualizer />
      </Section>

      <Section title="🧠 Flashcards : Théorème de Lagrange & Optimisation" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous à interpréter l&apos;optimisation sous contrainte pour préparer au mieux les concours.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est l&apos;interprétation économique du multiplicateur de Lagrange {"$\\lambda$"} ?</>}
            back={<>Il s&apos;agit du <strong>prix ombre</strong> (shadow price). Il exprime la variation de la valeur optimale de la fonction d&apos;utilité si l&apos;on desserre la contrainte budgétaire d&apos;une unité marginale.</>}
          />
          <Flashcard 
            front={<>Un extremum lié sous contrainte est-il nécessairement un point critique libre de la fonction d&apos;origine ?</>}
            back={<><strong>Non !</strong> Un extremum lié ne vérifie pas forcément {"$\\nabla f = \\vec{0}$"}. Géométriquement, les courbes de niveau de f et de la contrainte g doivent simplement être tangentes (gradients colinéaires).</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice Classique de Concours" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Optimalité de Cobb-Douglas et Allocation budgétaire"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>Un consommateur cherche à maximiser sa fonction d'utilité analytique :</p>
              {"$$U(x, y) = x^2 y$$"}
              <p>Sujette à la contrainte budgétaire stricte :</p>
              {"$$2x + y = 120$$"}
              <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                <li>Établir l'expression de la fonction de Lagrangien {"$\\mathcal{L}(x, y, \\lambda)$"}.</li>
                <li>Déterminer l'unique panier optimal kritique {"$(x^*, y^*)$"} et le multiplicateur de Lagrange {"$\\lambda^*$"}.</li>
                <li>Vérifier qu'au panier optimal, le ratio de l'utilité marginale sur les prix s'égalise bien pour chaque produit.</li>
              </ol>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Écriture du Lagrangien</p>
              <p>La fonction de contrainte s'écrit sous forme nul : {"$g(x,y) = 2x + y - 120 = 0$"}. La formule du Lagrangien s'établit alors :</p>
              {"$$\\mathcal{L}(x, y, \\lambda) = x^2 y - \\lambda (2x + y - 120)$$"}
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Application des C.P.O et résolution</p>
              <p>Calculons les dérivées partielles du Lagrangien :</p>
              {"$$\\frac{\\partial \\mathcal{L}}{\\partial x} = 2xy - 2\\lambda = 0 \\implies xy = \\lambda$$"}
              {"$$\\frac{\\partial \\mathcal{L}}{\\partial y} = x^2 - \\lambda = 0 \\implies x^2 = \\lambda$$"}
              {"$$\\frac{\\partial \\mathcal{L}}{\\partial \\lambda} = -(2x + y - 120) = 0 \\implies 2x + y = 120$$"}
              <p>En identifiant la valeur de {"$\\lambda$"}, nous obtenons :</p>
              {"$$xy = x^2 \\implies y = x \\quad \\text{(puisque } x > 0\\text{)}$$"}
              <p>En injectant cette égalité dans l'équation de contrainte budgétaire :</p>
              {"$$2x + y = 120 \\implies 2x + x = 120 \\implies 3x = 120 \\implies x^* = 40$$"}
              <p>Nous en déduisons instantanément :</p>
              {"$$y^* = 40 \\quad ; \\quad \\lambda^* = (x^*)^2 = 40^2 = 1600$$"}
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-110 text-xs leading-relaxed">
              <p>Étape 3 : Interprétation marginale des prix</p>
              <p>Évaluons les utilités marginales :</p>
              {"$$U'_x(x^*, y^*) = 2x^* y^* = 2 \\times 40 \\times 40 = 3200$$"}
              {"$$U'_y(x^*, y^*) = (x^*)^2 = 1600$$"}
              <p>Ratios de satisfaction par euro dépensé :</p>
              {"$$\\frac{U'_x}{p_x} = \\frac{3200}{2} = 1600 \\quad ; \\quad \\frac{U'_y}{p_y} = \\frac{1600}{1} = 1600$$"}
              <p>On constate que ce ratio d'utilité marginale marginalisé s'égalise précisément à la valeur de notre multiplicateur de Lagrange {"$\\lambda^* = 1600$"}. Cela démontre l'excellence de la théorie !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Épreuve de Certification Écrit / Oral" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'interprétation économique concrète de la valeur de lambda*, le multiplicateur de Lagrange à l'optimum ?",
              options: [
                "C'est l'élasticité directe de la demande par rapport à l'offre globale",
                "C'est l'utilité marginale du revenu (ou budget), autrement nommée le prix fictif de l'argent",
                "C'est le coût total d'amortissement technologique de l'usine d'assemblage"
              ],
              correctAnswer: 1,
              explanation: "Le multiplicateur lambda* mesure la sensibilité infinitésimale de la satisfaction par rapport à de nouvelles ressources financières : si vous augmentez votre budget d'un euro elementaire, l'utilité maximale atteinte augmentera exactement de lambda* unités. C'est le précieux shadow price (prix de l'ombre de la contrainte) !"
            },
            {
              question: "Si le problème d'optimisation est défini par une contrainte de type inégalité 'budget inférieur ou égal à B', et que l'optimum libre se trouve déjà strictement dans le budget, quelle est la valeur de lambda* ?",
              options: [
                "lambda* est égal à +1.0 par défaut",
                "lambda* s'annule rigoureusement (lambda* = 0)",
                "lambda* tend vers plus l'infini"
              ],
              correctAnswer: 1,
              explanation: "C'est la condition d'exclusion mutuelle ou complémentarité des conditions de Karush-Kuhn-Tucker (KKT). Si le point optimal libre de vos désirs respecte d'ores et déjà la limite de budget, alors la contrainte n'est pas limitante (elle est inactive). Un ajout de budget supplémentaire n'améliore pas votre bonheur instantané, donc la valeur marginale de l'argent lambda* s'annule."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Être capable d'écrire la formulation de la fonction de Lagrangien associée à une contrainte unilatérale.",
            "Résoudre un système critique issu des conditions du premier ordre.",
            "Comprendre géométriquement l'interprétation de tangence des courbes d'isovaleurs.",
            "Maîtriser le sens économique du précieux multiplicateur de Lagrange dans l'allocation optimale."
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

export default Course_CPGE_ECG_Optimisation_Sous_Contrainte;
