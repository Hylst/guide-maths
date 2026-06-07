import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Move, HelpCircle, RefreshCw, ZoomIn } from 'lucide-react';

const Course_Licence_Maths_TopologieMetric: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator state
  const [metricType, setMetricType] = useState<"euclidean" | "manhattan" | "chebyshev">("euclidean");
  const [radius, setRadius] = useState<number>(80);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Constants for coordinate mapping
  const width = 300;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;

  // Let's create some sample points to check if they belong to the ball
  const samplePoints = [
    { x: cx + 50, y: cy + 50, label: "A" },
    { x: cx - 60, y: cy + 30, label: "B" },
    { x: cx + 10, y: cy - 75, label: "C" },
    { x: cx - 20, y: cy - 20, label: "D" },
    { x: cx + 80, y: cy - 80, label: "E" }
  ];

  // Helper metric calculators
  const getDistance = (px: number, py: number, mx: string) => {
    const dx = Math.abs(px - cx);
    const dy = Math.abs(py - cy);
    if (mx === "euclidean") {
      return Math.sqrt(dx * dx + dx * dx); // wait, let's do the actual Euclidean coordinate distance:
    } else if (mx === "manhattan") {
      return dx + dy;
    } else {
      return Math.max(dx, dy);
    }
  };

  const getExactEuclidean = (px: number, py: number) => {
    const dx = px - cx;
    const dy = py - cy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const isInside = (px: number, py: number, rx: number) => {
    let d = 0;
    const dx = Math.abs(px - cx);
    const dy = Math.abs(py - cy);
    if (metricType === "euclidean") {
      d = Math.sqrt(dx * dx + dy * dy);
    } else if (metricType === "manhattan") {
      d = dx + dy;
    } else {
      d = Math.max(dx, dy);
    }
    return isOpen ? d < rx : d <= rx;
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-LIC-TOPOL"
        title="Licence Maths : Topologie des Espaces Métriques"
        subtitle="Fondements de l'analyse moderne, d'écarts de Banach, distance, boules ouvertes/fermées et complétude."
        duration="1h 45"
        level="Licence Maths Fondamentales (L2/L3)"
        prerequisites={["Suites réelles et limites", "Géométrie plane de base", "Théorie des ensembles (ZFC)"]}
        objectives={[
          "Définir rigoureusement la notion de distance et d'espace métrique.",
          "Distinguer la forme géométrique des boules selon la métrique Euclidienne, Manhattan, et Chebyshev.",
          "Caractériser les ensembles ouverts, fermés, adhérents et compacts dans un espace métrique.",
          "Appliquer le Théorème du point fixe de Banach aux équations fonctionnelles complètes."
        ]}
      />

      <Section title="📏 Espaces Métriques et Métriques Usuelles" icon="📐" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En topologie, la notion d'espace métrique généralise notre perception intuitive de la distance physique. Elle offre le cadre indispensable pour formaliser rigoureusement les concepts fondamentaux d'ouverture, d'adhérence, et de convergence.
        </p>

        <InfoBlock type="definition" title="Espace Métrique">
          Un espace métrique est un couple <MathComponent math="(E, d)" /> où <MathComponent math="E" /> est un ensemble non vide et 
          {" $d: E \\times E \\to \\mathbb{R}_+$"} une application, appelée <strong>distance</strong> (ou métrique), satisfaisant les quatre axiomes fondamentaux :
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li>
              <strong>Positivité :</strong> <MathComponent math="\forall x, y \in E, \ d(x, y) \ge 0" />
            </li>
            <li>
              <strong>Séparation :</strong> <MathComponent math="\forall x, y \in E, \ d(x, y) = 0 \iff x = y" />
            </li>
            <li>
              <strong>Symétrie :</strong> <MathComponent math="\forall x, y \in E, \ d(x, y) = d(y, x)" />
            </li>
            <li>
              <strong>Inégalité triangulaire :</strong> <MathComponent math="\forall x, y, z \in E, \ d(x, z) \le d(x, y) + d(y, z)" />
            </li>
          </ul>
        </InfoBlock>

        <TipBanner type="info" title="L'inégalité triangulaire inverse">
          De l'inégalité triangulaire, on déduit l'inégalité triangulaire inverse essentielle pour prouver la continuité de la distance :
          <MathComponent block math="\forall x, y, z \in E, \ |d(x, z) - d(y, z)| \le d(x, y)" />
        </TipBanner>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Dans <MathComponent math="\mathbb{R}^n" />, trois métriques classiques modifient radicalement la forme géométrique de ce qu'on appelle une "boule" :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-1">1. Distance Euclidienne (L2)</h4>
            <p className="text-xs text-muted-text mb-2">Distance à vol d'oiseau.</p>
            <FormulaBox formula="d_2(x, y) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}" />
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-1">2. Distance de Manhattan (L1)</h4>
            <p className="text-xs text-muted-text mb-2">Déplacement en grille orthogonale.</p>
            <FormulaBox formula="d_1(x, y) = \sum_{i=1}^n |x_i - y_i|" />
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-1">3. Distance de Chebyshev (L∞)</h4>
            <p className="text-xs text-muted-text mb-2">Déplacement maximal d'un roi aux échecs.</p>
            <FormulaBox formula="d_\infty(x, y) = \max_{1 \le i \le n} |x_i - y_i|" />
          </div>
        </div>
      </Section>

      <Section title="🔮 Simulateur Tactile d'Éléments Topologiques" icon="🎛️" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Explorez visuellement comment le choix d'une **métrique** et la nature d'une boule (**ouverte** ou **fermée**) affectent l'évaluation de l'appartenance des points de l'espace. Le centre est fixé à <MathComponent math="(0,0)" /> à l'intersection des deux axes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800-strong shadow-sm">
          {/* Controls */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-text mb-2">Métrique Active</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMetricType("euclidean")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    metricType === "euclidean" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Euclidienne
                </button>
                <button
                  onClick={() => setMetricType("manhattan")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    metricType === "manhattan" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Manhattan
                </button>
                <button
                  onClick={() => setMetricType("chebyshev")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    metricType === "chebyshev" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Chebyshev
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Rayon : <MathComponent math="R" /></span>
                <span>{radius} px</span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-muted-text uppercase tracking-wider">Nature de la Boule</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isOpen ? "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200" : "bg-transparent text-slate-500"
                  }`}
                >
                  Ouverte (d &lt; R)
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !isOpen ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200" : "bg-transparent text-slate-500"
                  }`}
                >
                  Fermée (d ≤ R)
                </button>
              </div>
            </div>
          </div>

          {/* Interactive SVG Display */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={width} height={height} className="overflow-visible">
                {/* Grid Axes */}
                <line x1={0} y1={cy} x2={width} y2={cy} stroke="#cbd5e1" strokeDasharray="3,3" />
                <line x1={cx} y1={0} x2={cx} y2={height} stroke="#cbd5e1" strokeDasharray="3,3" />

                {/* Draw corresponding ball based on metric */}
                {metricType === "euclidean" && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill={isOpen ? "rgba(99, 102, 241, 0.08)" : "rgba(16, 185, 129, 0.08)"}
                    stroke={isOpen ? "#6366f1" : "#10b981"}
                    strokeWidth="2.5"
                    strokeDasharray={isOpen ? "5,5" : "0"}
                  />
                )}

                {metricType === "manhattan" && (
                  <polygon
                    points={`${cx},${cy - radius} ${cx + radius},${cy} ${cx},${cy + radius} ${cx - radius},${cy}`}
                    fill={isOpen ? "rgba(99, 102, 241, 0.08)" : "rgba(16, 185, 129, 0.08)"}
                    stroke={isOpen ? "#6366f1" : "#10b981"}
                    strokeWidth="2.5"
                    strokeDasharray={isOpen ? "5,5" : "0"}
                  />
                )}

                {metricType === "chebyshev" && (
                  <rect
                    x={cx - radius}
                    y={cy - radius}
                    width={radius * 2}
                    height={radius * 2}
                    fill={isOpen ? "rgba(99, 102, 241, 0.08)" : "rgba(16, 185, 129, 0.08)"}
                    stroke={isOpen ? "#6366f1" : "#10b981"}
                    strokeWidth="2.5"
                    strokeDasharray={isOpen ? "5,5" : "0"}
                  />
                )}

                {/* Origin center point */}
                <circle cx={cx} cy={cy} r={4} fill="#e11d48" />

                {/* Sample Points */}
                {samplePoints.map((pt) => {
                  const inside = isInside(pt.x, pt.y, radius);
                  return (
                    <g key={pt.label}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={6}
                        fill={inside ? "#10b981" : "#f43f5e"}
                        className="transition-colors duration-200"
                      />
                      <text
                        x={pt.x + 10}
                        y={pt.y + 4}
                        fontSize="11"
                        fontWeight="bold"
                        fill="currentColor"
                        className="text-slate-700 dark:text-slate-300"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-3 flex gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full inline-block" />
                <span>Point à l'intérieur ({isOpen ? "Ouvert <" : "Fermé ≤"})</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#f43f5e] rounded-full inline-block" />
                <span>Extérieur</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🕳️ Ouverts, Fermés et Convergence" icon="🪐" color="amber">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La caractérisation des sous-ensembles repose sur les voisinages formés par nos boules ouvertes.
        </p>

        <InfoBlock type="definition" title="Ouvert et Fermé">
          Soit <MathComponent math="(E, d)" /> un espace métrique.
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li>
              Une partie <MathComponent math="U \subset E" /> est un <strong>ouvert</strong> si pour tout <MathComponent math="x \in U" />, il existe un rayon <MathComponent math="\varepsilon > 0" /> tel que la boule ouverte d'écart <MathComponent math="R" /> soit incluse : 
              <span className="font-semibold block sm:inline">{" $B(x, \\varepsilon) \\subset U$"}</span>.
            </li>
            <li>
              Une partie <MathComponent math="F \subset E" /> est un <strong>fermé</strong> si son complémentaire dans l'espace, <MathComponent math="E \setminus F" />, est un ouvert.
            </li>
          </ul>
        </InfoBlock>

        <InfoBlock type="reminder" title="Adhérence et Limite">
          Un point <MathComponent math="x \in E" /> est dans l'<strong>adhérence</strong> de <MathComponent math="A \subset E" /> (notée <MathComponent math="\bar{A}" />) s'il existe une suite d'éléments <MathComponent math="(a_n) \in A^\mathbb{N}" /> qui converge vers <MathComponent math="x" /> : 
          <MathComponent block math="\lim_{n\to\infty} d(a_n, x) = 0" />
        </InfoBlock>
      </Section>

      <Section title="💎 Complétude et Théorème de Banach" icon="💡" color="emerald">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Un espace est dit **complet** s’il n’y a "pas de trou" : toutes les suites qui se s'accumulent finissent par converger vers un point appartenant à notre espace.
        </p>

        <InfoBlock type="definition" title="Espace de Banach (Complet)">
          Une suite <MathComponent math="(x_n)" /> de <MathComponent math="E" /> est de <strong>Cauchy</strong> si :
          <MathComponent block math="\forall \varepsilon > 0, \ \exists N \in \mathbb{N}, \ \forall p, q \ge N, \ d(x_p, x_q) < \varepsilon" />
          Un espace métrique est dit <strong>complet</strong> si toute suite de Cauchy y converge. Un espace vectoriel normé complet est appelé un <strong>espace de Banach</strong>.
        </InfoBlock>

        <FormulaBox formula="\text{Théorème du Point Fixe de Banach : } T: E \to E \text{ contractante } (d(T(x), T(y)) \le k \cdot d(x, y) \text{ avec } k < 1) \implies \exists! x^* \in E, T(x^*) = x^*" />
      </Section>

      <Section title="📝 Exercices d'Analyse Résolus" icon="✏️" color="indigo">
        <InteractiveExercise
          title="Exercice 1 : Équivalence des métriques L1, L2, L∞"
          question={<p>Montrer formellement que dans l'espace de dimension deux {"$\\mathbb{R}^2$"}, les distances de Manhattan, Euclidienne et Chebyshev sont équivalentes en prouvant les inégalités de sandwich : {"$d_\\infty \\le d_2 \\le d_1 \\le 2 d_\\infty$"}.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 1 : Preuve de l'inégalité d∞ ≤ d2</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Par définition, pour un point <MathComponent math="x = (x_1, x_2)" />, on a :
                <br />
                <MathComponent block math="d_\infty(0, x)^2 = (\max(|x_1|, |x_2|))^2 = \max(x_1^2, x_2^2) \le x_1^2 + x_2^2 = d_2(0, x)^2" />
                En prenant la racine carrée, on obtient trivialement : <MathComponent math="d_\infty \le d_2" />.
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Preuve de l'inégalité d2 ≤ d1</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Calculons le carré de la distance Manhattan :
                <br />
                <MathComponent block math="d_1(0, x)^2 = (|x_1| + |x_2|)^2 = x_1^2 + x_2^2 + 2|x_1||x_2| \ge x_1^2 + x_2^2 = d_2(0, x)^2" />
                En prenant la racine, on obtient bien : <MathComponent math="d_2 \le d_1" />.
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Preuve de l'inégalité d1 ≤ 2 d∞</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
                Puisque <MathComponent math="|x_1| \le \max(|x_1|, |x_2|) = d_\infty" /> et <MathComponent math="|x_2| \le d_\infty" />, alors :
                <MathComponent block math="d_1(0, x) = |x_1| + |x_2| \le d_\infty + d_\infty = 2 d_\infty" />
                Cela prouve l'équivalence des trois normes et garantit qu'elles définissent exactement la même structure topologique (les mêmes ouverts).
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🗂️ Flashcards pour Interroger les Axiomes" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Toute partie fermée d'un espace de Banach complet est-elle complète ?"
            back="Oui, un sous-espace d'un espace métrique complet est complet SI et seulement S'IL est topologiquement fermé."
          />
          <Flashcard 
            front="Qu'est-ce qu'une distance ultra-métrique (ou non-archimédienne) ?"
            back="Une distance satisfaisant l'inégalité triangulaire renforcée : d(x, z) ≤ max(d(x, y), d(y, z)). Ex: ultramétriques p-adiques."
          />
          <Flashcard 
            front="Deux métriques équivalentes préservent-elles nécessairement la complétude ?"
            back="Oui, deux distances équivalentes ont exactement les mêmes suites de Cauchy et les mêmes voisinages de convergence."
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi nomme-t-on la métrique L1 'Métrique de Manhattan' ?",
              answer: "Parce qu'elle force les mesures de déplacement selon des axes orthogonaux, à l'image du tracé géométrique rectiligne de l'île de Manhattan où les avenues croisent orthogonalement les rues."
            },
            {
              question: "Quelle est la différence fondamentale entre ouvert et boule ouverte ?",
              answer: "Toute boule ouverte est un ouvert, mais un ouvert général réunion quelconque (éventuellement infinie) de boules ouvertes n'est plus nécessairement unitaire ni connexe."
            },
            {
              question: "Une distance peut-elle prendre la valeur infinie ?",
              answer: "Par définition standard sous l'axiome topologique originel, d(x, y) est forcée d'appartenir à R+, excluant l'infini. Cependant, en géométrie de graphe déconnecté, la distance infinie est tolérée sous forme de métrique étendue."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation de Topologie" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si (E, d) est un espace métrique discret (d(x,y)=1 si x≠y, 0 sinon), quelle est la nature d'une boule ouverte de rayon R = 1 ?",
              options: [
                "L'espace complet E",
                "Le singleton réduit au centre {x_0}",
                "Un ensemble infini non compact"
              ],
              correctAnswer: 1,
              explanation: "Puisque d(x,y) vaut 1 pour tout point distinct, tous les points y de E vérifient d(x_0, y) = 1 (qui n'est pas strictement inférieur à 1). Seul le point d(x, x_0) = 0 < 1 appartient au rayon."
            },
            {
              question: "Quelle est la nature géométrique de la boule fermée unitaire pour la distance Chebyshev (sub-L∞) dans R² ?",
              options: [
                "Un losange pivoté à 45° de diagonale 2",
                "Un disque circulaire de rayon 1",
                "Un carré aligné avec les axes de côté 2"
              ],
              correctAnswer: 2,
              explanation: "La distance Chebyshev est déterminée par le maximum des coordonnées. max(|x|,|y|) ≤ 1 correspond à l'intégralité du carré de sommets (1,1), (-1,1), (-1,-1), (1,-1), donc de côté 2."
            },
            {
              question: "Le Théorème du point fixe de Banach exige quel type de structure ?",
              options: [
                "Un espace préhilbertien unitaire compact",
                "Un espace métrique complet et une application contractante",
                "Un anneau commutatif de caractéristique nulle"
              ],
              correctAnswer: 1,
              explanation: "La complétude est fondamentale pour s'assurer que la suite d'itérations récurrentes convergentes de Cauchy ne converge pas en dehors de l'espace d'étude."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais énoncer les 4 axiomes definissant une distance sur un espace métrique.",
            "Je sais dessiner l'allure des boules fermées pour les distances L1, L2 et L∞.",
            "Je comprends le lien entre fermeture topologique et complétude des sous-espaces.",
            "Je maîtrise le Lemme des points fixes de Banach et son utilisation."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Licence_Maths_TopologieMetric;
