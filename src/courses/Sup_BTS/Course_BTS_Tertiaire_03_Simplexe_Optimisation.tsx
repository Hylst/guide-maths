import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, Activity, Landmark } from 'lucide-react';

const Course_BTS_Tertiaire_03_Simplexe_Optimisation: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [resourceA, setResourceA] = useState(80); // Slider constraints limit A: x + 2y <= A
  const [resourceB, setResourceB] = useState(120); // Slider constraints limit B: 3x + y <= B

  // Solve the 2D linear program algebraically in real time!
  // Maximize profit: Z = 4x + 3y
  // Constraints:
  // C1: x + 2y <= resourceA
  // C2: 3x + y <= resourceB
  // C3, C4: x >= 0, y >= 0
  
  // Pivot vertex intersection of the two inequalities:
  // x + 2y = A
  // 3x + y = B  =>  y = B - 3x  =>  x + 2(B-3x) = A  =>  x + 2B - 6x = A  =>  5x = 2B - A  =>  x = (2B-A)/5
  // y = B - 3*(2B-A)/5 = (5B - 6B + 3A)/5 = (3A-B)/5
  
  const optimumX = Math.max(0, (2 * resourceB - resourceA) / 5);
  const optimumY = Math.max(0, (3 * resourceA - resourceB) / 5);
  
  // Objective Profit value
  const optimalProfit = 4 * optimumX + 3 * optimumY;

  // SVG parameters for drawing the feasible polygon area
  const width = 240;
  const height = 200;
  const scale = 1.1; // mapping multiplier to fit inside frame

  // Axis lines coordinates conversion
  const mapX = (x: number) => 30 + (x * scale);
  const mapY = (y: number) => height - 30 - (y * scale);

  // Compute boundary crossings coordinate values
  // C1 line: x + 2y = A => (x=0, y=A/2) and (x=A, y=0)
  const c1yMax = resourceA / 2;
  const c1xMax = resourceA;

  // C2 line: 3x + y = B => (x=0, y=B) and (x=B/3, y=0)
  const c2yMax = resourceB;
  const c2xMax = resourceB / 3;

  // Vertices of the admissible region polygon
  // We take: (0,0), (0, min(A/2, B)), (optimum_x, optimum_y), (min(A, B/3), 0)
  const v1 = { x: 0, y: 0 };
  const v2 = { x: 0, y: Math.min(c1yMax, c2yMax) };
  const v3 = { x: optimumX, y: optimumY };
  const v4 = { x: Math.min(c1xMax, c2xMax), y: 0 };

  const polyPoints = `${mapX(v1.x)},${mapY(v1.y)} ${mapX(v2.x)},${mapY(v2.y)} ${mapX(v3.x)},${mapY(v3.y)} ${mapX(v4.x)},${mapY(v4.y)}`;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-BTS-TER-03"
        title="BTS Tertiaire : Optimisation & Simplexe"
        subtitle="Appliquez les outils de la recherche opérationnelle pour maximiser scientifiquement les marges bénéficiaires de l'industrie."
        duration="1h 45"
      />

      {/* 1. Introduction */}
      <Section title="🎯 Introduction Pédagogique" icon="💰" color="indigo">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Dans l'exercice quotidien des affaires, un directeur logistique ou un contrôleur de gestion fait face à des décisions arbitraires stratégiques : comment allouer au mieux les ressources rares d'une chaîne de montage (heures de main-d'œuvre, stocks de matières premières, budgets marketing) pour engendrer le profit financier le plus massif possible ?
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          C'est le domaine de la **Recherche Opérationnelle (RO)**. Ce cours traite de la formulation d'un <strong>programme linéaire d'optimisation</strong> sous contraintes fermées, de sa résolution géométrique dans un repère plan et introduit l'élaboration de l'**algorithme algébrique complexe du Simplexe** mis au point par Dantzig.
        </p>
        <TipBanner type="info" title="Applications réelles">
          L'optimisation linéaire régit aujourd'hui l'intégralité des systèmes ERP, de planification de plannings d'équipements de vols de compagnies aériennes, et des calculs de routages de livraison de colis urbains.
        </TipBanner>
      </Section>

      {/* 2. Interactive SVG 2D Linear Programming simulator */}
      <Section title="🎮 Simulateur Interactif d'Optimisation de Production" icon="⚙️" color="emerald">
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Une menuiserie fabrique des chaises ($x$ à 4€ de marge) et des tables ($y$ à 3€ de marge). Les contraintes d'heures de rabotage et de vernis dépendent des curseurs. Observez l'intersection optimale (point rouge) glisser le long de la frontière d'admissibilité (zone verte armée) :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          {/* Sliders panel */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-950 dark:text-slate-50 text-base">
              <Sliders className="w-5 h-5 text-indigo-500" />
              Ressources d'Atelier
            </h4>

            {/* Slider Constraint 1 */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Contrainte Rabotage (A) :</span>
                <span className="text-indigo-650 font-bold">{resourceA} heures</span>
              </div>
              <input 
                type="range" min="40" max="150" step="5" value={resourceA}
                onChange={(e) => setResourceA(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-sans">
                Formule : {"$x + 2y \\le "}{resourceA}{"$"}.
              </span>
            </div>

            {/* Slider Constraint 2 */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Contrainte Vernis (B) :</span>
                <span className="text-indigo-650 font-bold">{resourceB} heures</span>
              </div>
              <input 
                type="range" min="60" max="150" step="5" value={resourceB}
                onChange={(e) => setResourceB(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-sans">
                Formule : {"$3x + y \\le "}{resourceB}{"$"}.
              </span>
            </div>
          </div>

          {/* Interactive animated 2D SVG graph */}
          <div className="lg:col-span-4 flex flex-col items-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-mono">Plan des Solutions Admissibles (x, y)</span>
            <div className="relative w-full h-[200px] flex items-center justify-center">
              <svg width={width} height={height} className="rounded-lg">
                {/* Axes */}
                <line x1="25" y1={height - 30} x2={width - 10} y2={height - 30} stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="30" y1="10" x2="30" y2={height - 25} stroke="#94a3b8" strokeWidth="1.5" />

                {/* Shaded Feasible Admissible Polygon (Convex hull) */}
                <polygon points={polyPoints} fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" />

                {/* Constraint Line C1 (Blue) */}
                <line 
                  x1={mapX(0)} y1={mapY(c1yMax)} 
                  x2={mapX(c1xMax)} y2={mapY(0)} 
                  stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.6"
                />

                {/* Constraint Line C2 (Purple) */}
                <line 
                  x1={mapX(0)} y1={mapY(c2yMax)} 
                  x2={mapX(c2xMax)} y2={mapY(0)} 
                  stroke="#a855f7" strokeWidth="2" strokeOpacity="0.6"
                />

                {/* Highlight Optimum Vertex Point (Red) */}
                <circle cx={mapX(optimumX)} cy={mapY(optimumY)} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />

                {/* Labels */}
                <text x={width - 20} y={height - 15} textAnchor="middle" className="text-[10px] font-mono fill-slate-500 font-bold">x</text>
                <text x="18" y="15" textAnchor="middle" className="text-[10px] font-mono fill-slate-500 font-bold">y</text>
              </svg>
            </div>
          </div>

          {/* Algebraic values outputs */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-2 font-medium">Vertex Optimal Calculé</span>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Fabrication Maximale (x*, y*) :</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                    {optimumX.toFixed(1)} Chaises / {optimumY.toFixed(1)} Tables
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium font-bold text-indigo-550">Profit maximal (Z*) :</div>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-500 font-mono">
                    {optimalProfit.toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-sans border-t pt-3 mt-4">
              Ce profit maximal est calculé analytiquement de manière stricte par le théorème de programmation linéaire : l'optimum se trouve obligatoirement sur l'un des sommets (corners) du polygone admissible.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Detailed Theory section with LaTeX formulas */}
      <Section title="📘 Formulation de Programme Linéaire & Tableaux du Simplexe" icon="📚" color="slate">
        <p className="mb-4 text-slate-700 dark:text-slate-350 leading-relaxed">
          Pour poser un programme linéaire de maximisation mathématique sous forme canonique, nous écrivons l'architecture suivante :
        </p>

        <FormulaBox 
          title="Programme Linéaire Canonique" 
          math="\text{Maximiser } Z = c_1 x_1 + c_2 x_2 + \dots + c_n x_n \\ \text{sous les contraintes : } \begin{cases} a_{11} x_1 + a_{12} x_2 + \dots \le b_1 \\ a_{21} x_1 + a_{22} x_2 + \dots \le b_2 \\ x_1 \ge 0, \ x_2 \ge 0 \end{cases}" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour basculer du formalisme continu géométrique à l'algorithme informatique matriciel du Simplexe de Dantzig, on transforme les inéquations d'enveloppe en équations strictes en injectant des variables positives de compensation nommées <strong>variables d'écart</strong> (notées {"$e_1, e_2$"}), qui chiffrent le gaspillage :
        </p>

        <FormulaBox 
          title="Modèle Algébrique de Dictionnaire" 
          math="a_{11} x_1 + a_{12} x_2 + e_1 = b_1 \quad \text{avec } e_1 \ge 0" 
        />

        <div className="space-y-4 my-6">
          <InfoBlock type="definition" title="La règle de sélection du pivot du Simplexe">
            Pour cheminer de sommet en sommet admissible en accroissant constamment le gain, l'algorithme applique le pivot de Gauss-Jordan :
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li><strong>Variable entrante</strong> : On choisit la variable hors-base possédant le coefficient positif le plus fort (le plus rentable) de l'équation objective {"$Z$"}.</li>
              <li><strong>Variable sortante</strong> : On choisit la ligne de base d'écart qui sature en premier (le plus petit rapport strictement positif entre la constante de second membre {"$b_i$"} et le coefficient strictement positif de la colonne entrante).</li>
              <li>Le croisement indique la cellule du <strong>Pivot de Gauss</strong> pour la réduction de tableau.</li>
            </ul>
          </InfoBlock>

          <InfoBlock type="reminder" title="Optimum global convexe">
            La programmation linéaire s'exécute dans un espace géométrique convexe. Cela garantit qu'un extremum optimal local trouvé de sommet en sommet par sélection de pivot successif constitue de manière universelle l'<strong>Optimum Global absolu</strong> de l'énoncé.
          </InfoBlock>
        </div>
      </Section>

      {/* 4. Two solved exercises */}
      <Section title="🛠️ Exercices Résolus d'Examen" icon="🛠️" color="purple">
        <InteractiveExercise 
          title="Exercice 1 : Modélisation graphique de mix de production (BTS CG)"
          question={
            <div className="space-y-2">
              <p>
                Un atelier de maroquinerie fabrique des portefeuilles {"$x$"} (bénéfice net {"$6\\text{ €}$"}) et des sacs de sport {"$y$"} (bénéfice net {"$10\\text{ €}$"}).
              </p>
              <p>Contraintes d'atelier à satisfaire d'heures-matière :</p>
              <p>{"$2x + y \\le 10$"}${"$x + 2y \\le 8$"}${"$x, y \\ge 0$"}</p>
              <p className="font-semibold">
                Calculez géométriquement ou algébriquement le point de fonctionnement maximal optimisant les bénéfices.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Expression de la fonction objectif de rentabilité</p>
              <p>On cherche à maximiser le gain logistique global, noté {"$Z$"}:</p>
              <MathComponent block math="Z = 6x + 10y" />
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Résolution de la liaison des deux lignes d'inégalités</p>
              <p>L'optimum régnant sur le croisement de saturation des barrières limitatives :</p>
              <MathComponent block math="\begin{cases} 2x + y = 10 \implies y = 10 - 2x \\ x + 2y = 8 \end{cases} \implies x + 2(10 - 2x) = 8" />
              <p>Réduisons le membre de gauche :</p>
              <MathComponent block math="x + 20 - 4x = 8 \implies -3x = -12 \implies x = 4" />
              <p>On en déduit l'ordonnée {"$y$"} :</p>
              <MathComponent block math="y = 10 - 2(4) = 2" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Évaluation du profit final maximum de l'entreprise</p>
              <p>On injecte les coordonnées optimales {"$x^* = 4$"} et {"$y^* = 2$"} dans la fonction économique d'objectif :</p>
              <MathComponent block math="Z^* = 6(4) + 10(2) = 24 + 20 = 44\text{ €}" />
              <p>Le mix de gestion idéal impose d'assembler <strong>4 portefeuilles et 2 sacs de sport par jour</strong> pour engendrer une marge bénéficiaire de <strong>44 € par jour</strong>. Tout autre mix admissible sous la courbe dégagerait des profits moindres.</p>
            </div>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Initialisation du dictionnaire et choix de pivot du Simplexe"
          question={
            <div className="space-y-2">
              <p>
                Soit le programme d'optimisation : Maximiser {"$Z = 5x_1 + 8x_2$"} sous les contraintes :
              </p>
              <p>{"$3x_1 + 4x_2 \\le 24$"}${"$2x_1 + x_2 \\le 10$"}</p>
              <p className="font-semibold">
                Posez les variables d'écart pour écrire le dictionnaire initial et identifiez la colonne pivot de la variable entrante.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Injection des variables d'écart e_1 et e_2</p>
              <p>Toute inéquation de type inférieur ou égal exige l'intégration d'une variable positive compensatoire pour équilibrer l'égalité :</p>
              <MathComponent block math="\begin{cases} 3x_1 + 4x_2 + e_1 = 24 \\ 2x_1 + x_2 + e_2 = 10 \end{cases}" />
            </div>,
            <div className="space-y-2 flex flex-col justify-start">
              <p className="font-bold text-slate-800">Étape 2 : Écriture de la fonction objectif d'index avec les variables d'écart</p>
              <p>On exprime les variables d'écart de base en fonction des variables de décision hors-base :</p>
              <MathComponent block math="\begin{cases} e_1 = 24 - 3x_1 - 4x_2 \\ e_2 = 10 - 2x_1 - x_2 \end{cases}" />
              <p className="mt-2">L'équation économique s'indexe à l'identique :</p>
              <MathComponent block math="Z = 5x_1 + 8x_2" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Choix de la variable pivot d'entrée de base</p>
              <p>Dans l'équation de {"$Z$"}, la variable possédant le coefficient positif d'apport le plus fort est {"$x_2$"} (apport unitaire de {"$8$"} par rapport à {"$5$"} pour {"$x_1$"}).</p>
              <p><strong>{"$x_2$"} est donc désignée d'autorité comme la variable entrante dans la base.</strong></p>
            </div>
          ]}
        />
      </Section>

      {/* 5. Interactive Flashcards */}
      <Section title="⚡ Flashcards de Révision" icon="⚡" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Assimilez instantanément la recherche opérationnelle :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Vocabulaire Théorique</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Que modélise concrètement une 'variable d'écart' au Simplexe ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">C'est la capacité d'ateliers inutilisée</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                  La variable d'écart chiffre la différence algébrique positive entre la capacite ressource limite tolérée et la quantité réellement consommée de mix. Un écart de 0 indique une contrainte purement saturée à l'optimum.
                </p>
              </div>
            }
          />

          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Extremum Théorème d'angle</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Pourquoi l'optimum d'un programme linéaire réside-t-il obligatoirement sur l'un des sommets ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">C'est un espace linéaire de convexité plane</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Une ligne droite de profit (droite isochline de gain) glissant de façon uniforme à travers une zone de convexité atteint son point scalaire d'éloignement extrême sur le bord extérieur le plus saillant des d'angles de liaison.
                </p>
              </div>
            }
          />
        </div>
      </Section>

      {/* 6. FAQ Section */}
      <Section title="💡 Questions Fréquentes (FAQ)" icon="❓" color="amber">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi privilégier le Simplexe par rapport à la méthode géométrique standard de repérage ?",
              answer: (
                <p>
                  La méthode de repérage géométrique est formidable de pédagogie mais reste strictement indépassable et cantonnée à des modèles à de faibles 2 dimensions de décision (plans {"$x,y$"}). Dès que l'on formule un mix comprenant 5 produits distincts et 20 contraintes, le cerveau humain perd pied. L'algorithme du Simplexe, purement algébrique et matriciel, permet à l'informatique de résoudre des milliers de contraintes de manière optimale.
                </p>
              )
            },
            {
              question: "Que se passe-t-il si un programme linéaire ne comporte aucune solution ?",
              answer: (
                <p>
                  Dans les cas où les inéquations formulées s'avèrent de nature totalement contradictoires (par exemple exiger {"$x \\ge 100$"} alors qu'un stock rigide interdit de dépasser {"$x \\le 50$"}), l'espace convexe d'admissibilité est un ensemble vide. Le Simplexe le détecte de suite dès la phase 1 en constatant l'impossibilité de converger vers un dictionnaire initial admissible.
                </p>
              )
            },
            {
              question: "Qu'est-ce que l'analyse de sensibilité post-optimale en contrôle de gestion ?",
              answer: (
                <p>
                  L'analyse de sensibilité permet de mesurer de manière préventive de combien varie la rentabilité {"$Z$"} en réponse à la hausse marginale d'unitaire d'une contrainte ressource (les **prix d'ombre** d'ateliers ou coefficients d'opportunité duale). Cela calcule combien l'entreprise peut dépenser pour rajouter un supplément d'heures de rabotage.
                </p>
              )
            }
          ]}
        />
      </Section>

      {/* 7. Comprehensive Quiz with 3 questions minimum */}
      <Section title="📝 Mini-Quiz de Validation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "En maximisation logistique, comment choisit-on de manière mathématiquement unifiée la variable pivot d'entrée d'un dictionnaire ?",
              options: [
                "On prend celle dont le coefficient est le plus fort d'apport positif dans l'expression objective de Z",
                "On prend celle dont le coefficient est le plus fort négatif",
                "On tire au sort sans calcul"
              ],
              correctAnswer: 0,
              explanation: "Pour hisser les gains le plus vite possible, le Simplexe sélectionne toujours la variable hors-base qui pèse positivement le plus gros montant sur l'expression Z* (le coefficient unitaire le plus élevé)."
            },
            {
              question: "Un programme possède la contrainte suivante de bernier : x + 2y ≤ 100. À l'optimum calculé du Simplexe, l'écart de base vaut e_1 = 15. Quelle est l'interprétation concrète de ce constat pour l'atelier ?",
              options: [
                "L'atelier a consommé la totalité des heures disponibles",
                "L'atelier a dépassé de 15 h les horaires admis",
                "Il subsiste une réserve inexploitée de 15 h de temps d'ateliers à l'optimum"
              ],
              correctAnswer: 2,
              explanation: "Puisque e_1 = 100 - (x + 2y) = 15 > 0, l'ateliers n'a consommé à l'optimum que 85 h sur les 100 h admises. Il subsiste concrètement 15 h d'inactivité de rabotage."
            },
            {
              question: "Quelle est la nature géométrique de l'espace de faisabilité délimité par l'intersection de contraintes linéaires ?",
              options: [
                "Un polygone (polytope) strictement convexe",
                "Une spirale logarithmique fermée",
                "Un anneau discontinu"
              ],
              correctAnswer: 0,
              explanation: "Puisque les contraintes s'expriment par des demi-plans définis par d'affines inégalités du premier degré, leur intersection topologique compose de fait un polytope (en dimension n) qui est géométriquement et strictement convexe."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais traduire et formuler un problème logistique complet de mix en programme linéaire.",
            "Je maîtrise la méthode géométrique plane d'identification optium de sommets.",
            "Je sais manipuler les variables d'écart pour modéliser le dictionnaire.",
            "Je sais appliquer la règle du pivot de Dantzig sur un tableau du Simplexe de BTS."
          ]}
        />
      </Section>

      {/* 8. Course Complete button */}
      {!isCompleted && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={onValidateCourse}
            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-650 hover:to-teal-700 text-white rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-xl font-bold"
          >
            <Activity className="w-6 h-6 animate-pulse" />
            Valider le Cours & Débloquer (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_BTS_Tertiaire_03_Simplexe_Optimisation;
