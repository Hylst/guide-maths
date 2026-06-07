import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, HelpCircle, Target, TrendingUp, Sparkles } from 'lucide-react';

const Course_CPGE_BL_Optimisation: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State: x, y (representing the quantities of goods consumed)
  // Cobb-Douglas Utility function: U(x, y) = x^0.5 * y^0.5
  // Budget constraint: P_x * x + P_y * y = R
  // Here, budget is fixed at R = 4, P_x = 1, P_y = 1
  const Budget_R = 4;
  const [x, setX] = useState<number>(1.2);
  const [y, setY] = useState<number>(2.0);

  // Computed Utility U = sqrt(x * y)
  const Utility = Math.sqrt(x * y);

  // Gradient of Utility: grad(U) = ( dU/dx, dU/dy )
  // dU/dx = 0.5 * sqrt(y/x), dU/dy = 0.5 * sqrt(x/y)
  const dUdx = x > 0 ? 0.5 * Math.sqrt(y / x) : 0;
  const dUdy = y > 0 ? 0.5 * Math.sqrt(x / y) : 0;

  // Budget constraint value check: x + y
  const actualExpenditure = x + y;
  const isOnBudget = Math.abs(actualExpenditure - Budget_R) < 0.15;

  // Tangency / Lagrange condition: dU/dx / P_x = dU/dy / P_y  ->  dU/dx = dU/dy for P_x=P_y=1
  // That occurs exactly when x = y = 2
  const isOptimal = isOnBudget && Math.abs(x - y) < 0.2;

  // Visual Coordinates
  const scale = 50; // pixels per unit
  const oX = 30;
  const oY = 220;

  // Gradient vector scale
  const vecScale = 45;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-CPGE-BL-OPTIM"
        title="CPGE B/L : Calcul Différentiel et Optimisation"
        subtitle="Dérivées partielles, vecteurs gradients, extrema locaux et optimisation économique sous contrainte de budget via le Lagrangien."
        duration="1h 55"
        level="CPGE Hypokhâgne / Khâgne B/L"
        prerequisites={["Calcul différentiel de fonctions d'une variable", "Équations de plans cartésiens", "Résolution de systèmes linéaires"]}
        objectives={[
          "Calculer analytiquement les dérivées partielles d'ordre 1 et 2 d'une fonction de plusieurs variables.",
          "Déterminer et tracer les isocourbes d'une fonction d'utilité bidimensionnelle (Cobb-Douglas).",
          "Identifier les points critiques et caractériser les extrema locaux à l'aide de la matrice Hessienne.",
          "Résoudre des problèmes d'optimisation sous contrainte d'égalité par l'analyse du Lagrangien."
        ]}
      />

      <Section title="🗺️ Fonctions de Plusieurs Variables et Isocourbes" icon="🗺️" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En CPGE B/L, l'analyse mathématique s'associe fidèlement aux sciences économiques. Les choix rationnels d'un consommateur ou la productivité globale d'une entreprise s'expriment sous forme de fonctions dépendant de plusieurs variables simultanées (par exemple, le capital accumulé $K$ et le volume de travail salarié $L$).
        </p>

        <InfoBlock type="definition" title="Isocourbe (ou Courbe de Niveau)">
          Pour une fonction réelle de deux variables réelles <MathComponent math="f: \mathbb{R}^2 \to \mathbb{R}" />, l'isocourbe associée au niveau de valeur stable <MathComponent math="C \in \mathbb{R}" /> est le sous-ensemble de points du plan :
          <MathComponent block math="\mathcal{C}_k = \{ (x,y) \in \mathcal{D}_f \ | \ f(x,y) = C \}" />
          En microéconomie, ces courbes de niveau égalisent l'utilité ressentie par le consommateur et portent le nom de **courbes d'indifférence**.
        </InfoBlock>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Afin de quantifier la pente locale de notre surface tridimensionnelle de valeur, nous étudions l'accroissement monotone par rapport aux deux directions orthogonales du repère cartésien ordonné. C'est le cadre du **calcul différentiel**.
        </p>
      </Section>

      <Section title="📈 Dérivées Partielles et Vecteur Gradient" icon="📈" color="emerald">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Dériver partiellement revient à geler une des variables comme s'il s'agissait d'une constante inerte, puis de dériver normalement l'expression par rapport à la variable restante étudiée.
        </p>

        <InfoBlock type="definition" title="Dérivées partielles premières">
          Soit <MathComponent math="f" /> une fonction différentiable définie sur un ouvert de <MathComponent math="\mathbb{R}^2" />. Pour un point de coordonnées <MathComponent math="(x_0, y_0)" />, la dérivée partielle première par rapport à la coordonnée <MathComponent math="x" /> s'écrit :
          <MathComponent block math="\frac{\partial f}{\partial x}(x_0, y_0) = \lim_{h \to 0} \frac{f(x_0+h, y_0) - f(x_0, y_0)}{h}" />
        </InfoBlock>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Réunir ces dérivées partielles fondamentales dans une structure de coordonnées vectorielles ordonnées définit le **vecteur gradient** :
        </p>

        <FormulaBox formula="\vec{\nabla} f(x,y) = \begin{pmatrix} \frac{\partial f}{\partial x}(x,y) \\ \frac{\partial f}{\partial y}(x,y) \end{pmatrix}" />

        <TipBanner type="info" title="Propriété Géométrique Cruciale">
          En tout point différentiable du plan, le vecteur gradient pointe rigoureusement dans la direction de la **plus forte pente positive** d'accroissement de la surface. De plus, il est systématiquement **orthogonal** à la courbe de niveau passant par ce point précis.
        </TipBanner>
      </Section>

      <Section title="🎮 Simulateur Interactif : Lagrangien & Équilibre du Consommateur" icon="🎮" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Ici, la fonction d'utilité Cobb-Douglas d'un ménage est modélisée par <MathComponent math="U(x, y) = \sqrt{x \cdot y}" />. La contrainte de budget est fixée par la ligne de dépense <MathComponent math="R = p_x x + p_y y = 4" /> (avec <MathComponent math="p_x = p_y = 1" />), représentée par la diagonale orange. Ajustez vos consommations de biens <MathComponent math="x" /> (pain) et <MathComponent math="y" /> (fromage). 
          <strong>Trouvez le panier de consommation optimal : celui qui maximise l'utilité en coïncidant exactement avec la contrainte de budget (isocourbe tangente à la droite de budget) !</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          {/* Controls list */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Quantité de bien x :</span>
                <span className="text-emerald-600 font-bold">{x.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.8"
                step="0.1"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Quantité de bien y :</span>
                <span className="text-blue-500 font-bold">{y.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.8"
                step="0.1"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-xs space-y-2">
              <div className="font-bold text-[10px] uppercase tracking-wider text-muted-text">Bilan de l'Équilibre Microéconomique</div>
              <div className="flex justify-between">
                <span>Dépense Réelle ($x + y$) :</span>
                <span className={`font-mono font-bold ${isOnBudget ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {actualExpenditure.toFixed(2)} € (Budget : 4.00 €)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Utilité ressentie $U(x,y)$ :</span>
                <span className="font-mono font-bold text-indigo-700">{Utility.toFixed(3)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span>Gradient d'Utilité $\nabla U$ :</span>
                <span className="font-mono text-slate-600 dark:text-slate-400">
                  [{dUdx.toFixed(2)}, {dUdy.toFixed(2)}]
                </span>
              </div>
              {isOptimal && (
                <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-center rounded-lg animate-pulse">
                  ✨ Panier Optimum Optimisé ! Tangence parfaite atteinte à (x=2.0, y=2.0) pour U = 2.00 !
                </div>
              )}
            </div>
          </div>

          {/* SVG representation coordinate contour level curves */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={280} height={240} className="overflow-visible select-none">
                {/* Axes lines coordinates */}
                <line x1={oX} y1={oY} x2={270} y2={oY} stroke="#475569" strokeWidth="1.5" />
                <line x1={oX} y1={20} x2={oX} y2={oY} stroke="#475569" strokeWidth="1.5" />

                <text x={265} y={oY + 12} fontSize="8" fontWeight="bold" fill="#64748b">Bien X</text>
                <text x={oX - 18} y={25} fontSize="8" fontWeight="bold" fill="#64748b">Bien Y</text>

                {/* Draw isocurves for U = 1, U = 1.414, U = 2 */}
                {[0.8, 1.3, 1.8, 2.0].map((level, i_u) => {
                  const pts: string[] = [];
                  for (let tempX = 0.3; tempX <= 4.0; tempX += 0.1) {
                    const tempY = (level * level) / tempX;
                    const svgX = oX + tempX * scale;
                    const svgY = oY - tempY * scale;
                    if (svgX <= 265 && svgY >= 20) {
                      pts.push(`${svgX},${svgY}`);
                    }
                  }
                  return (
                    <polyline 
                      key={i_u}
                      fill="none" 
                      stroke={level === 2.0 ? "#6366f1" : "#cbd5e1"} 
                      strokeWidth={level === 2.0 ? "2" : "1"} 
                      points={pts.join(" ")} 
                    />
                  );
                })}

                {/* Draw budget constraint line x + y = 4 */}
                {/* Coordinates: (0, 4) to (4, 0) */}
                <line 
                  x1={oX + 0 * scale} 
                  y1={oY - Budget_R * scale} 
                  x2={oX + Budget_R * scale} 
                  y2={oY - 0 * scale} 
                  stroke="#f97316" 
                  strokeWidth="2.5" 
                />
                <text x={180} y={65} rotate="-45" fontSize="8" fontWeight="bold" fill="#f97316">Ligne Budgetaire: x+y=4</text>

                {/* Current point (x, y) */}
                <circle cx={oX + x * scale} cy={oY - y * scale} r="5" fill="#6366f1" />

                {/* Draw Gradient Vector at current point */}
                {(() => {
                  const startX = oX + x * scale;
                  const startY = oY - y * scale;
                  const endX = startX + dUdx * vecScale;
                  const endY = startY - dUdy * vecScale; // Inverted Y coordinates
                  return (
                    <>
                      <line 
                        x1={startX} 
                        y1={startY} 
                        x2={endX} 
                        y2={endY} 
                        stroke="#10b981" 
                        strokeWidth="2.5" 
                      />
                      <polygon points={`${endX},${endY} ${endX - 5},${endY + 3} ${endX - 3},${endY + 6}`} fill="#10b981" />
                      <text x={endX + 5} y={endY} fontSize="8" fontWeight="bold" fill="#10b981">∇U</text>
                    </>
                  );
                })()}

                {/* Label tags axes ticks */}
                <text x={oX + 2 * scale} y={oY + 12} fontSize="7" fill="#64748b" textAnchor="middle">2.0</text>
                <text x={oX + 4 * scale} y={oY + 12} fontSize="7" fill="#64748b" textAnchor="middle">4.0</text>
                <text x={oX - 10} y={oY - 2 * scale + 3} fontSize="7" fill="#64748b" textAnchor="end">2.0</text>
                <text x={oX - 10} y={oY - 4 * scale + 3} fontSize="7" fill="#64748b" textAnchor="end">4.0</text>
              </svg>
            </div>
            <p className="mt-3 text-xs italic text-slate-500 text-center">
              Les isocourbes violettes détaillent les niveaux d'utilité Cobb-Douglas croissants. {isOptimal ? "Tangence d'équilibre optimale !" : "La droite de budget coupe l'isocourbe."}
            </p>
          </div>
        </div>
      </Section>

      <Section title="⛓️ Le Multiplicateur de Lagrange" icon="⛓️" color="slate">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Résoudre analytiquement l'intersection d'isocourbes non-linéaires en dimension arbitrairement élevée se heurte vite aux limites de la substitution directe. Joseph-Louis Lagrange formula une technique élégante qui unifie l'objectif d'optimisation et la contrainte au sein d'une fonction d'analyse unique : **le Lagrangien**.
        </p>

        <InfoBlock type="definition" title="La Fonction Lagrangienne">
          Pour maximiser $U(x,y)$ sous contrainte d'égalité stricte $g(x,y) = R - p_x x - p_y y = 0$. Nous formons la fonction de trois variables réelles :
          <MathComponent block math="\mathcal{L}(x, y, \lambda) = U(x,y) + \lambda \cdot g(x,y)" />
          Où <MathComponent math="\lambda \in \mathbb{R}" /> est appelé le **multiplicateur de Lagrange** (interprété en économie comme l'utilité marginale de la monnaie disponible).
        </InfoBlock>

        <TipBanner type="info" title="Considération des Points Stationnaires">
          Lagrange a démontré que l'optimum contraint se trouve nécessairement parmi les points de stationnarité totale du Lagrangien, où toutes ses dérivées partielles s'annulent de concert :
          <MathComponent block math="\frac{\partial \mathcal{L}}{\partial x} = 0, \quad \frac{\partial \mathcal{L}}{\partial y} = 0, \quad \frac{\partial \mathcal{L}}{\partial \lambda} = 0" />
          En d'autres termes, à l'optimum, le vecteur gradient d'utilité et celui de contrainte sont **colinéaires** : <MathComponent math="\vec{\nabla} U(x,y) = \lambda \vec{\nabla} g(x,y)" />.
        </TipBanner>
      </Section>

      <Section title="✏️ Résolution d'Exercices Guidés" icon="✏️" color="emerald">
        <InteractiveExercise
          title="Exercice 4 : Recherche d'extremum d'un consommateur Cobb-Douglas"
          question={<p>Déterminer analytiquement le panier d'équilibre d'utilité optimal maximizing {"$U(x,y) = x \\cdot y$"} sous la contrainte budgétaire stricte {"$2x + 4y = 40$"}.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 1 : Poser la fonction lagrangienne</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                La contrainte s'écrit sous forme homogène : <MathComponent math="g(x,y) = 40 - 2x - 4y = 0" />.
                <br />
                Formons la Lagrangienne associée :
                <MathComponent block math="\mathcal{L}(x, y, \lambda) = x \cdot y + \lambda(40 - 2x - 4y)" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 2 : Annuler les dérivées partielles</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                On cherche le point stationnaire du système :
                <br />
                • <MathComponent math="\frac{\partial \mathcal{L}}{\partial x} = y - 2\lambda = 0 \implies y = 2\lambda" />
                <br />
                • <MathComponent math="\frac{\partial \mathcal{L}}{\partial y} = x - 4\lambda = 0 \implies x = 4\lambda" />
                <br />
                • <MathComponent math="\frac{\partial \mathcal{L}}{\partial \lambda} = 40 - 2x - 4y = 0" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Résoudre et déterminer le panier optimal</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
                En injectant les expressions de x et y dans la contrainte budgétaire :
                <MathComponent block math="2(4\lambda) + 4(2\lambda) = 40 \implies 8\lambda + 8\lambda = 40 \implies 16\lambda = 40 \implies \lambda = 2.5" />
                On en déduit immédiatement le panier de biens optimal :
                <MathComponent block math="x^* = 4(2.5) = 10 \quad \text{et} \quad y^* = 2(2.5) = 5" />
                L'utilité optimale obtenue vaut $U(10, 5) = 50$.
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards conceptuelles" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Qu'est-ce que la matrice Hessienne ?"
            back="C'est la matrice carrée des dérivées partielles secondes d'une fonction de plusieurs variables. Son déterminant et sa trace en un point critique permettent de définir la nature locale de l'extremum (minimum, maximum ou point selle)."
          />
          <Flashcard 
            front="Qu'est-ce qu'un point col ou point selle ?"
            back="C'est un point critique stationnaire (le gradient s'y annule) qui correspond à un maximum local selon une direction et un minimum local selon une autre direction orthogonale."
          />
          <Flashcard 
            front="Que traduit géométriquement la colinéarité des gradients ?"
            back="Elle signifie qu'au point optimal d'intersection, la courbe de niveau d'utilité et la droite de contrainte budgétaire possèdent la même tangente locale."
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes des Étudiants" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la signification économique du multiplicateur de Lagrange λ ?",
              answer: "En économie, le multiplicateur λ s'interprète comme la sensibilité de variation du niveau optimal d'utilité par rapport à un accroissement marginal unitaire de la ressource budgétaire R (Utilité Marginale du Revenu)."
            },
            {
              question: "Pourquoi l'optimum se trouve-t-il forcément sur une tangence d'isocourbes ?",
              answer: "Si le budget coupait l'isocourbe au lieu d'y être tangent, cela signifierait que l'on pourrait se déplacer le long de la ligne de budget pour atteindre instantanément une courbe d'indifférence d'utilité supérieure."
            },
            {
              question: "Comment traite-t-on le cas de plusieurs contraintes d'égalité simultanées ?",
              answer: "Il suffit d'accroître le Lagrangien avec de nouveaux multiplicateurs pour chaque contrainte : L(x, y, λ1, λ2) = U(x, y) + λ1 * g1(x, y) + λ2 * g2(x, y). L'analyse de stationnarité globale reste identique."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz Validation de Maîtrise" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la dérivée partielle première d_f/d_x de la fonction f(x, y) = 3x^2 * y + 5y^3 par rapport à x ?",
              options: [
                "df/dx = 6x * y",
                "df/dx = 6x + 15y^2",
                "df/dx = 3x^2 + 5y^3"
              ],
              correctAnswer: 0,
              explanation: "Pour calculer df/dx, y est traitée comme une constante inerte. En dérivant 3x^2 * y par rapport à x on obtient 6x * y. Le terme 5y^3 est traité comme une constante pure et sa dérivée s'annule."
            },
            {
              question: "Soit f une fonction de classe C^2. Si en un point critique stationnaire, le déterminant de la matrice Hessienne est strictement négatif, de quel type de point s'agit-il ?",
              options: [
                "Il s'agit d'un point selle (ou point col)",
                "Il s'agit d'un maximum local strict",
                "Il s'agit d'un minimum local strict"
              ],
              correctAnswer: 0,
              explanation: "Si le déterminant de la matrice Hessienne (produit des courbures principales) est strictement négatif, cela signifie que la surface monte dans une direction et descend dans une direction orthogonale : s'établit d'office un point selle."
            },
            {
              question: "Dans un cadre microéconomique, que représente le taux marginal de substitution (TMS) de bien x par rapport à y ?",
              options: [
                "Le ratio du coût absolu d'acquisition des biens",
                "Le ratio inversé des utilités marginales : (dU/dx) / (dU/dy)",
                "La dérive de l'inflation moyenne"
              ],
              correctAnswer: 1,
              explanation: "Pour conserver un niveau d'utilité invariant lors d'une substitution (dU = 0), on en déduit que d_y / d_x = - (dU/dx) / (dU/dy). C'est la valeur absolue de cette pente d'échange, nommée TMS."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais calculer les dérivées partielles premières d'une fonction de plusieurs variables.",
            "Je sais modéliser et tracer des lignes d'indifférence d'utilité Cobb-Douglas.",
            "Je comprends le théorème de colinéarité des vecteurs gradients à l'optimum de tangence.",
            "Je maîtrise l'écriture algébrique globale du Lagrangien pour résoudre un problème contraint."
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

export default Course_CPGE_BL_Optimisation;
