import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../components/SharedUI';
import { useProgress } from '../hooks/useProgress';
import { motion } from 'framer-motion';
import { LineChart, Sliders, Zap, HelpCircle } from 'lucide-react';

const PolynomialVisualizer: React.FC = () => {
  const [a, setA] = useState<number>(0.5); // coefficient at X^3
  const [b, setB] = useState<number>(-1);  // coefficient at X^2
  const [c, setC] = useState<number>(-2);  // coefficient at X^1
  const [d, setD] = useState<number>(1);   // coefficient at X^0

  const curveData = useMemo(() => {
    const points: string[] = [];
    const svgWidth = 240;
    const svgHeight = 160;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Scale factors: x spans [-3, 3] -> multiplied by 30 to get pixels
    // y spans [-6, 6] -> multiplied by 12 to get pixels
    const xScale = 35;
    const yScale = 12;

    const evalP = (x: number) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    const evalDeriv = (x: number) => 3 * a * Math.pow(x, 2) + 2 * b * x + c;

    const pPoints: string[] = [];
    const dPoints: string[] = [];

    for (let px = 10; px <= 230; px++) {
      const x = (px - centerX) / xScale;
      
      const yP = evalP(x);
      const pyP = centerY - yP * yScale;
      if (pyP >= 5 && pyP <= svgHeight - 5) {
        pPoints.push(`${px},${pyP}`);
      }

      const yD = evalDeriv(x);
      const pyD = centerY - yD * yScale;
      if (pyD >= 5 && pyD <= svgHeight - 5) {
        dPoints.push(`${px},${pyD}`);
      }
    }

    // Rough numerical real root estimate in range [-3, 3] for display
    const realRoots: number[] = [];
    for (let x = -3.2; x <= 3.2; x += 0.05) {
      const val1 = evalP(x);
      const val2 = evalP(x + 0.05);
      if (val1 * val2 <= 0) {
        // Simple linear interpolation for cleaner visually centered root dot
        const root = x - val1 * (0.05 / (val2 - val1));
        if (!realRoots.some(r => Math.abs(r - root) < 0.2)) {
          realRoots.push(Number(root.toFixed(3)));
        }
      }
    }

    return {
      pPath: pPoints.length > 1 ? `M ${pPoints.join(' L ')}` : '',
      dPath: dPoints.length > 1 ? `M ${dPoints.join(' L ')}` : '',
      roots: realRoots,
      centerX,
      centerY,
      xScale,
      yScale
    };
  }, [a, b, c, d]);

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8" id="poly-sim-card">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2" id="poly-sim-title">
        <LineChart className="text-indigo-650" size={22} id="poly-sim-icon" />
        Interactif : Racines et Dérivées de Polynômes de degré 3
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Ajustez les coefficients réels du polynôme {"$P(X) = aX^3 + bX^2 + cX + d$"} et observez en direct les points stationnaires, les racines réelles et sa dérivée.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders Area */}
        <div className="space-y-4" id="poly-controls">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3" id="coeff-panel">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5" id="coeff-hdr">
              <Sliders size={12} /> Coefficients réels :
            </h4>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Coeff cubique (a) :</span>
                <span className="text-indigo-600 font-mono font-black" id="a-val">{a.toFixed(2)}</span>
              </div>
              <input 
                id="a-range"
                type="range" min="-1.5" max="1.5" step="0.1" value={a} onChange={(e) => setA(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Coeff quadratique (b) :</span>
                <span className="text-indigo-600 font-mono font-black" id="b-val">{b.toFixed(2)}</span>
              </div>
              <input 
                id="b-range"
                type="range" min="-3" max="3" step="0.2" value={b} onChange={(e) => setB(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Coeff linéaire (c) :</span>
                <span className="text-indigo-600 font-mono font-black" id="c-val">{c.toFixed(2)}</span>
              </div>
              <input 
                id="c-range"
                type="range" min="-4" max="4" step="0.2" value={c} onChange={(e) => setC(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Ordonnée origine (d) :</span>
                <span className="text-indigo-600 font-mono font-black" id="d-val">{d.toFixed(1)}</span>
              </div>
              <input 
                id="d-range"
                type="range" min="-3" max="3" step="0.5" value={d} onChange={(e) => setD(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-950 space-y-2 text-xs" id="poly-diag">
            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5" id="poly-diag-hdr">
              <Zap size={14} /> Roots and Relations diagnostics :
            </h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Nombre de racines réelles estimées :</span>
                <strong className="text-indigo-950 dark:text-indigo-200 font-mono">{curveData.roots.length}</strong>
              </div>
              <div className="flex flex-col border-t border-slate-250/50 dark:border-slate-850 pt-1 mt-1">
                <span className="text-slate-400 font-mono text-[10px]">Racines identifiées {"$x_{\\text{roots}}$"} :</span>
                {curveData.roots.length > 0 ? (
                  <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-xs" id="roots-list-str">
                    {curveData.roots.map(r => r.toFixed(2)).join('  ;  ')}
                  </strong>
                ) : (
                  <strong className="text-amber-600 italic">Aucune (100% complexe dans la fenêtre)</strong>
                )}
              </div>
              {a !== 0 && (
                <div className="flex justify-between border-t border-dashed border-slate-200 dark:border-slate-800 pt-1.5 mt-1">
                  <span>Somme des racines réelles/C x1+x2+x3 = {"$-b/a$"} :</span>
                  <strong className="font-mono text-indigo-650">{(-b/a).toFixed(2)}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Polynomial Graphic on Right */}
        <div className="flex flex-col items-center" id="poly-canvas-container">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Tracé graphique du Polynôme</span>

          <div className="w-full h-64 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 relative shadow-inner" id="poly-canvas">
            <svg viewBox="0 0 240 160" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg" id="poly-svg">
              {/* Axes coordinate grid */}
              <line x1="10" y1="80" x2="230" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="120" y1="10" x2="120" y2="150" stroke="#cbd5e1" strokeWidth="1.5" />
              
              {/* Vertical Tick lines on axis representing standard integers */}
              {[-2, -1, 1, 2].map(val => (
                <line 
                  key={val}
                  x1={120 + val * curveData.xScale} y1="76" 
                  x2={120 + val * curveData.xScale} y2="84" 
                  stroke="#94a3b8" strokeWidth="1" 
                />
              ))}

              {/* Curve of the derivative P'(X) in dash array slate */}
              {curveData.dPath && (
                <path d={curveData.dPath} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
              )}

              {/* Curve of the primary Polynomial P(X) in blue */}
              {curveData.pPath && (
                <path d={curveData.pPath} stroke="#6366f1" strokeWidth="2.5" fill="none" />
              )}

              {/* Red dot anchors symbolizing real roots intersections with X-axis */}
              {curveData.roots.map((rootVal, idx) => {
                const rx = 120 + rootVal * curveData.xScale;
                if (rx >= 10 && rx <= 230) {
                  return (
                    <circle key={idx} cx={rx} cy="80" r="4.5" fill="#ef4444" className="animate-pulse" />
                  );
                }
                return null;
              })}
            </svg>

            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[9px] text-indigo-400 font-mono rounded-md flex items-center gap-1.5 shadow" id="poly-status">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>Visualisation polynomiale</span>
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] text-slate-400 space-y-0.5 font-mono text-right pointer-events-none bg-white/70 dark:bg-black/70 p-1 rounded" id="poly-legend">
              <div className="text-indigo-650 font-bold">• P(X)</div>
              <div className="text-slate-500 font-bold">-- P'(X)</div>
              <div className="text-rose-600 font-bold">● Racines Réelles</div>
            </div>
          </div>
          <span className="text-[10px] text-zinc-400 mt-2 font-mono">Axes : horizontal = indéterminée X, vertical = P(X)</span>
        </div>
      </div>
    </div>
  );
};

const Course_CPGE_02_Polynomes: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/04_Post_Bac/CPGE/02_CPGE_02_Polynomes.md";

  const checklistItems = [
    "Maîtriser la loi algébrique d'addition et de produit dans l'anneau K[X].",
    "Résoudre une division euclidienne de polynômes ou une division selon les puissances croissantes.",
    "Définir le PGCD de polynômes avec l'algorithme d'Euclide et l'identité de Bézout.",
    "Caractériser les racines d'un polynôme et leur multiplicité à l'aide des dérivées successives (formule de Taylor).",
    "Appliquer rigoureusement les relations de Viète entre les racines et les coefficients d'un polynôme."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8" id="cpge2-course-root">
      <CourseHeader 
        id="cpge2-header"
        acronym="POL" 
        title="Arithmétique des Polynômes" 
        subtitle="Explorez l'algèbre formelle des polynômes : structures d'anneau de K[X], division euclidienne, racines multiples, relations coefficients-racines et théorème de d'Alembert-Gauss."
        level="CPGE MPSI / PCSI / MP"
        duration="4.0h"
        objectives={[
          "Associer la structure d'anneau aux polynômes formels à une indéterminée.",
          "Exécuter des divisions euclidiennes et identifier le reste algébrique.",
          "Déterminer la multiplicité d'une racine via les équations différentielles de Taylor.",
          "Factoriser des polynômes sur l'ensemble réel ℝ ou complexe ℂ."
        ]}
      />

      <InfoBlock id="cpge2-intro" type="info" title="L'importance de l'indéterminée en prépa">
        En lycée, on perçoit souvent le polynôme comme une simple fonction {"$x \\mapsto P(x)$"}. En classe préparatoire, on franchit une étape d'abstraction essentielle : le polynôme est traité comme un **objet algébrique formel** à part entière, caractérisé par sa suite presque nulle de coefficients réels ou complexes. Cette conceptualisation modélise l'espace {"$K[X]$"}, analogue formel de l'anneau {"$\\mathbb{Z}$"}, pour en développer une arithmétique rigoureuse.
      </InfoBlock>

      <Section id="cpge2-sec-1" title="1. Divisibilité et Division Euclidienne" color="slate" icon="📐">
        <div className="space-y-4">
          <p>
            Soient deux polynômes {"$A, B \\in K[X]$"} avec {"$B \\neq 0$"}. Il existe un unique couple de polynômes {"$(Q, R) \\in K[X]^2$"} satisfaisant les axiomes de la division euclidienne :
          </p>
          <div className="font-mono text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-indigo-700 dark:text-indigo-400 font-black text-lg" id="div-eucl-eq">
            {"$$A = BQ + R \\quad \\text{avec} \\quad \\deg(R) < \\deg(B)$$"}
          </div>

          <p>
            Où {"$Q$"} s'appelle le polynôme quotient, et {"$R$"} s'appelle le polynôme reste de la division euclidienne formelle.
          </p>

          <BentoGrid id="cpge2-bento-properties">
            <BentoCard id="cpge2-bc-deg" title="Propriété du produit" color="slate">
              <p className="text-xs text-zinc-550 mb-2">Le degré du produit est la somme stricte des degrés individuels :</p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold">
                {"$$\\deg(P \\times Q) = \\deg(P) + \\deg(Q)$$"}${"\\quad (\\text{si } P, Q \\neq 0)$$"}
              </div>
            </BentoCard>

            <BentoCard id="cpge2-bc-pgcd" title="PGCD de polynômes" color="indigo">
              <p className="text-xs text-indigo-550/80 mb-2">Formulé en un idéal, le PGCD de deux polynômes s'établit via l'algorithme d'Euclide :</p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold">
                {"$$\\operatorname{PGCD}(A, B) = R_{k}$$"}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">C'est le dernier reste non nul normé de la suite des divisions euclidiennes successives.</p>
            </BentoCard>

            <BentoCard id="cpge2-bc-bezout" title="Théorème de Bézout" color="purple" colSpan={3}>
              <p className="text-xs text-zinc-400 mb-2">Deux polynômes A et B sont premiers entre eux si et seulement s'il existe U, V dans K[X] tels que :</p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-slate-950 rounded border text-purple-750 dark:text-purple-400 font-bold">
                {"$$AU + BV = 1_K$$"}
              </div>
              <p className="text-[10px] text-indigo-500 mt-1 font-bold">Cette formulation est centrale pour effectuer les décompositions en éléments simples complexes.</p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section id="cpge2-sec-2" title="2. Racines et Multiplicité" color="indigo" icon="📍">
        <div className="space-y-4">
          <p>
            Soient {"$P \\in K[X]$"} et {"$\\alpha \\in K$"}. On dit que {"$\\alpha$"} est une **racine** de {"$P$"} si et seulement si {"$P(\\alpha) = 0_K$"}. Cela équivaut à certifier que le polynôme unitaire linéaire {"$X - \\alpha$"} divise le polynôme formel {"$P$"}.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] space-y-4" id="mult-def-card">
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-400">Définition de la Multiplicité {"$m \\ge 1$"} :</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Un élément {"$\\alpha$"} est dit racine de multiplicité exactement {"$m$"} si le monôme de puissance {"$(X - \\alpha)^m$"} divise {"$P(X)$"}, alors que la puissance supérieure {"$(X - \\alpha)^{m+1}$"} ne le divise pas. On s'appuie en CPGE sur la formule de Taylor et les dérivées successives :
            </p>
            <div className="font-mono text-center py-2.5 bg-white dark:bg-slate-950 rounded border text-indigo-750 dark:text-indigo-400 font-black text-sm" id="taylor-mult-eq">
              {"$$P(\\alpha) = P'(\\alpha) = \\dots = P^{(m-1)}(\\alpha) = 0_K \\quad \\text{et} \\quad P^{(m)}(\\alpha) \\neq 0_K$$"}
            </div>
          </div>

          <TipBanner id="cpge2-multiple-root-banner" type="warning" title="Condition de racine multiple">
            Un polynôme admet une racine multiple {"$\\alpha$"} de multiplicité supérieure ou égale à 2 si et seulement si {"$\\alpha$"} est une racine commune simultanée de {"$P$"} et de son polynôme dérivé {"$P'$"} :
            <div className="font-mono text-center my-2 p-1.5 text-indigo-700 dark:text-indigo-450 font-black" id="deriv-mult-eq">
              {"$$P(\\alpha) = 0 \\quad \\text{et} \\quad P'(\\alpha) = 0$$"}
            </div>
          </TipBanner>
        </div>
      </Section>

      <Section id="cpge2-sec-3" title="3. Relations entre Coefficients et Racines (Relations de Viète)" color="purple" icon="✨">
        <div className="space-y-4">
          <p>
            Soit un polynôme scindé de degré n à coefficients réels ou complexes doté de ses racines {"$x_1, x_2, \\dots, x_n$"}. En posant le polynôme sous sa formulation développée :
          </p>
          <div className="font-mono text-center p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-850 text-indigo-700 dark:text-indigo-400 font-black text-sm max-w-2xl mx-auto" id="vieta-poly-eq">
            {"$$P(X) = a_n X^n + a_{n-1} X^{n-1} + \\dots + a_1 X + a_0$$"}
          </div>

          <p>
            Les sommes symétriques élémentaires des racines satisfont rigoureusement les équations d'or de Viète :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="vieta-grid">
            <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-card" id="vieta-sum-box">
              <span className="text-xs uppercase font-bold text-slate-400">Somme des racines (S) :</span>
              <div className="font-mono text-center p-2.5 bg-slate-100 dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-black text-sm my-2">
                {"$$\\sum_{i=1}^{n} x_i = -\\frac{a_{n-1}}{a_n}$$"}
              </div>
              <p className="text-xs text-slate-500">
                La somme globale des racines équivaut au quotient opposé du second terme par le terme principal directeur de tête.
              </p>
            </div>

            <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-card" id="vieta-prod-box">
              <span className="text-xs uppercase font-bold text-slate-400">Produit des racines (P) :</span>
              <div className="font-mono text-center p-2.5 bg-slate-100 dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-black text-sm my-2">
                {"$$\\prod_{i=1}^{n} x_i = (-1)^n \\frac{a_0}{a_n}$$"}
              </div>
              <p className="text-xs text-slate-500">
                L'ensemble du produit cumulé correspond au terme d'origine pondé par la dimension alternée du signe de degré de puissance.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="cpge2-sec-4" title="4. Laboratoire de comportement Polynomial" color="slate" icon="📈">
        <PolynomialVisualizer />
      </Section>

      <Section id="cpge2-exercises" title="Exercices Corrigés de Niveau CPGE" color="amber" icon="🧠">
        <InteractiveExercise 
          id="cpge2-ex-1"
          title="Exercice 1 : Trouver le reste de la division par (X - a)(X - b)"
          question={
            <>
              Soit un polynôme quelconque {"$P \\in K[X]$"}.
              <br />
              Soient deux scalaires distincts {"$a, b \\in K$"} (donc {"$a \\neq b$"}). Let's express rest the division euclidienne of {"$P$"} by the polynomial {"$B(X) = (X-a)(X-b)$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Hypothèse sur l'ordonnée et le degré du polynôme reste</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Formulons l'axiome fondamental de division euclidienne sur K[X] :
                {"$$P(X) = (X-a)(X-b) Q(X) + R(X)$$"}.
                <br />
                Puisque le diviseur {"$B(X)$"} est de degré exact 2, le reste {"$R(X)$"} doit impérativement satisfaire l'inégalité de dimension degré :
                {"$$\\deg(R) < 2 \\implies R(X) = \\alpha X + \\beta$$"}, avec les inconnues {"$(\\alpha, \\beta) \\in K^2$"} à déterminer.
              </p>
            </>,
            <>
              <strong>Étape 2 : Évaluer en les points critiques d'interpolation de Lagrange</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Pour faire s'annuler le facteur d'indéterminée {"$Q(X)$"}, évaluons la formule générale en les points singuliers du diviseur {"$X = a$"} et {"$X = b$"}.
                <br />
                • En {"$X = a$"} : {"$P(a) = (a - a)(a - b) Q(a) + R(a) \\implies P(a) = \\alpha a + \\beta$"}.
                <br />
                • En {"$X = b$"} : {"$P(b) = (b - a)(b - b) Q(b) + R(b) \\implies P(b) = \\alpha b + \\beta$"}.
                <br />
                Nous obtenons un système linéaire de 2 équations à 2 inconnues.
              </p>
            </>,
            <>
              <strong>Étape 3 : Résolution matricielle du système et conclusion</strong>
              <p className="text-sm mt-1 leading-relaxed">
                Soustrayons les deux équations pour isoler la pente du binôme :
                {"$$P(a) - P(b) = \\alpha(a - b) \\implies \\alpha = \\frac{P(a) - P(b)}{a - b}$$"}.
                <br />
                Substituons cette constante pour en extraire la valeur d'ordonnée :
                {"$$\\beta = P(a) - a \\left( \\frac{P(a) - P(b)}{a - b} \\right) = \\frac{a P(b) - b P(a)}{a - b}$$"}.
              </p>
              <div className="font-mono text-center my-3.5 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-750 dark:text-emerald-400 border rounded font-black text-sm" id="cpge2-ex1-result-eq">
                {"$$R(X) = \\frac{P(a) - P(b)}{a - b} X + \\frac{a P(b) - b P(a)}{a - b}$$"}
              </div>
              <p className="text-xs text-slate-500 italic mt-1">C'est la formule générale du reste linéaire, qui correspond géométriquement à la droite sécante passant par les points de coordonnées évalués du graphe !</p>
            </>
          ]}
        />

        <InteractiveExercise 
          id="cpge2-ex-2"
          title="Exercice 2 : Recherche de coefficients pour racines triples"
          question={
            <>
              Soit le polynôme complexe dépendant d'un couple réel {"$(a, b) \\in \\mathbb{R}^2$"} :
              <br />
              {"$$P_a(X) = X^5 - 5X + b$$"}.
              <br />
              Déterminer si possible la constante d'ordonnée {"$b$"} de telle sorte que le polynôme admette une racine réelle triple de multiplicité supérieure ou égale à 3.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Appliquer Taylor et la dérivation au rang k</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Soit {"$\\alpha$"} la racine triple cherchée. Les axiomes de multiplicité de Taylor imposent simultanément :
                {"$$P(\\alpha) = 0 \\quad , \\quad P'(\\alpha) = 0 \\quad , \\quad P''(\\alpha) = 0$$"}.
                Calculons successivement les polynômes dérivés d'ordre rationnel :
                <br />
                • {"$P'(X) = 5X^4 - 5$"}
                <br />
                • {"$P''(X) = 20X^3$"}
              </p>
            </>,
            <>
              <strong>Étape 2 : Cibles réelles sur les racines des dérivées</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Mettons à l'épreuve l'annulation de la dérivée de second ordre :
                <br />
                {"$$P''(\\alpha) = 0 \\implies 20\\alpha^3 = 0 \\implies \\alpha = 0$$"}.
                <br />
                La seule racine possible capable d'être d'ordre multiplicité 3 est donc obligatoirement la racine triviale {"$\\alpha = 0$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Évaluation de validité des équations</strong>
              <p className="text-sm mt-1 leading-relaxed">
                Testons l'évaluation de cette constante sur la dérivée de premier ordre :
                {"$$P'(0) = 5(0)^4 - 5 = -5 \\neq 0$$"}.
                <br />
                Ce qui signifie que la dérivée première ne s'annule en aucun cas en 0. Le système d'équations est incompatible.
              </p>
              <div className="font-mono text-center my-2 p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border rounded font-black text-sm" id="cpge2-ex2-result-str">
                Conclusion : Il n'existe aucun couple d'entiers ou réels b permettant à ce polynôme de degré 5 d'admettre une racine d'ordre de multiplicité 3.
              </div>
            </>
          ]}
        />
      </Section>

      <Section id="cpge2-faq" title="Questions Fréquentes (FAQ)" color="slate" icon={<HelpCircle className="text-indigo-600 w-5 h-5"/>}>
        <AccordionFAQ id="cpge2-faq-accordion" items={[
          {
            question: "Quelle est la différence fondamentale de factorisation entre ℝ[X] et ℂ[X] ?",
            answer: "Selon le théorème fondamental de l'algèbre (d'Alembert-Gauss), tout polynôme non constant est scindé sur ℂ[X], donc s'écrit uniquement comme produit de termes de premier degré (X - a). Sur ℝ[X], l'anneau n'est pas algébriquement clos : les facteurs irréductibles de base du polynôme sont de premier degré ou de second degré à discriminant strictement négatif."
          },
          {
            question: "Comment effectuer rapidement une division selon les puissances croissantes ?",
            answer: "C'est un outil très puissant pour trouver des limites ou effectuer des intégrations d'éléments rationnels en coordonnées nulles. On effectue la division usuelle mais en classant les termes et les monômes de gauche à droite par puissances croissantes (coefficients constants en premier) au lieu de l'ordre décroissant habituel."
          },
          {
            question: "À quoi sert d'évaluer le reste d'un polynôme à l'aide des structures congruences ?",
            answer: "Cela permet de résoudre des puissances gigantesques de polynômes dans les équations. Par exemple, pour évaluer ce que vaut le reste de la division de X^n par (X^2 - 1), on travaille par congruence de polynômes modulo (X^2 - 1), ce qui simplifie radicalement les dimensions linéaires."
          }
        ]} />
      </Section>

      <Section id="cpge2-flashcards" title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            id="cpge2-fc-1"
            front={<>Quelle est la formule liant le degré d'une somme de deux polynômes ?</>}
            back={<>Le degré satisfait l'inégalité triangulaire algébrique : <strong>{"$\\deg(P+Q) \\le \\max(\\deg(P), \\deg(Q))$"}.</strong> Si les degrés sont distincts, il y a égalité stricte.</>}
          />
          <Flashcard 
            id="cpge2-fc-2"
            front={<>Que vaut le produit des racines d'un polynôme complexe unitaire de degré pair 4 ?</>}
            back={<>Rappel Viète : le produit vaut exactement <strong>{"$x_1 x_2 x_3 x_4 = (-1)^4 \\frac{a_0}{a_4} = \\frac{a_0}{a_4}$"}.</strong> Puisque le degré de puissance est pair, le signe alterné est positif.</>}
          />
        </div>
      </Section>

      <Section id="cpge2-quiz" title="Quiz de Validation" color="indigo" icon="🎯">
        <Quiz 
          id="cpge2-quiz-comp"
          questions={[
            {
              question: "Si α est une racine de multiplicité m = 2 pour le polynôme P, que vaut la valeur de sa dérivée première P'(α) ?",
              options: ["P'(α) ≠ 0", "P'(α) = 1_K", "P'(α) = 0"],
              correctAnswer: 2,
              explanation: "Règle de Taylor et dérivation : pour une multiplicité supérieure ou égale à 2, la racine annule à la fois le polynôme et sa dérivée première : P(α) = 0 et P'(α) = 0."
            },
            {
              question: "Quel est le reste de la division euclidienne du polynôme P(X) par le monôme unitaire linéaire (X - a) ?",
              options: ["P(a)", "0_K", "P'(a)"],
              correctAnswer: 0,
              explanation: "D'après la division euclidienne : P(X) = (X - a)Q(X) + R(X). R étant de degré < 1, c'est une constante. En évaluant en X = a, on a directement R(a) = P(a)."
            },
            {
              question: "Si la somme de 3 racines d'un polynôme de degré 3 unitaire vaut exactement S = 6, quel est le coefficient à l'indéterminée X^2 ?",
              options: ["6", "-6", "2"],
              correctAnswer: 1,
              explanation: "Rappel relation de Viète : S = x1 + x2 + x3 = -a2/a3. Notre polynôme étant unitaire, a3 = 1. Donc S = -a2 = 6, d'où a2 = -6."
            }
          ]}
        />
      </Section>

      <div onClick={() => validateCourse(courseId)} id="checklist-trigger">
        <InteractiveChecklist id="cpge2-checklist" items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_CPGE_02_Polynomes;
