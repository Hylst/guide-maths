import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, HelpCircle, Sparkles, MoveRight } from 'lucide-react';

const Course_CPGE_BL_AlgebreLineaire: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State: 2x2 Matrix coefficients
  const [a11, setA11] = useState<number>(2);
  const [a12, setA12] = useState<number>(0);
  const [a21, setA21] = useState<number>(0.5);
  const [a22, setA22] = useState<number>(1);

  // User test vector x
  const [x1, setX1] = useState<number>(1);
  const [x2, setX2] = useState<number>(1);

  // Computed Output Vector y = Ax
  const y1 = a11 * x1 + a12 * x2;
  const y2 = a21 * x1 + a22 * x2;

  // Calcul du polynôme caractéristique de la matrice A :
  // P(X) = X^2 - Tr(A)X + Det(A)
  const trace = a11 + a22;
  const det = a11 * a22 - a12 * a21;
  const delta = trace * trace - 4 * det;

  // Calcul des valeurs propres
  let lambda1: number | null = null;
  let lambda2: number | null = null;
  if (delta >= 0) {
    lambda1 = (trace + Math.sqrt(delta)) / 2;
    lambda2 = (trace - Math.sqrt(delta)) / 2;
  }

  // Check if current x is an eigenvector
  // Ax = lambda * x  ->  y1 = lambda * x1  et  y2 = lambda * x2
  let ratio1 = x1 !== 0 ? y1 / x1 : null;
  let ratio2 = x2 !== 0 ? y2 / x2 : null;
  const isEigen = ratio1 !== null && ratio2 !== null && Math.abs(ratio1 - ratio2) < 0.1;
  const detectedEigenvalue = isEigen && ratio1 ? ratio1 : null;

  // SVG Coordinates translation
  // Origin is at 140, 140
  const scale = 35; // px per unit
  const oX = 140;
  const oY = 140;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-CPGE-BL-LINEA"
        title="CPGE B/L : Algèbre Linéaire & Réduction"
        subtitle="Espaces vectoriels, matrices d'endomorphisme, réduction de dimension, valeurs propres et diagonalisation d'applications linéaires complexes."
        duration="1h 50"
        level="CPGE Hypokhâgne / Khâgne B/L"
        prerequisites={["Systèmes d'équations linéaires", "Calcul matriciel et inverse", "Déterminants d'ordre 2 ou 3"]}
        objectives={[
          "Comprendre le fonctionnement géométrique d'un endomorphisme représenté par sa matrice associée.",
          "Calculer analytiquement le polynôme caractéristique et déterminer les valeurs propres réelles.",
          "Extraire les sous-espaces propres associés à chaque valeur propre par résolution de noyaux.",
          "Maîtriser les critères théoriques stricts de diagonalisabilité en dimension finie."
        ]}
      />

      <Section title="📐 Espaces Vectoriels et Endomorphismes" icon="📐" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En CPGE B/L, l'algèbre linéaire est le pivot central de la modélisation mathématique quantitative. Qu'il s'agisse de comptabilité matricielle nationale, d'analyse statistique multivariée des populations, ou de l'étude géométrique des fonctions, les **espaces vectoriels** et les **applications linéaires** forment la structure d'accueil commune.
        </p>

        <InfoBlock type="definition" title="Endomorphisme linéaire">
          Soit <MathComponent math="E" /> un <MathComponent math="\mathbb{R}" />-espace vectoriel de dimension finie <MathComponent math="n" />. Une application <MathComponent math="f: E \to E" /> est un **endomorphisme** si elle conserve les opérations fondamentales de combinaison linéaire :
          <MathComponent block math="\forall (\vec{u}, \vec{v}) \in E^2, \forall (\lambda, \mu) \in \mathbb{R}^2, \quad f(\lambda\vec{u} + \mu\vec{v}) = \lambda f(\vec{u}) + \mu f(\vec{v})" />
          Une fois la base <MathComponent math="B" /> de <MathComponent math="E" /> fixée, l'endomorphisme est représenté de manière rigoureuse par sa matrice carrée <MathComponent math="A = \text{Mat}_B(f) \in \mathcal{M}_n(\mathbb{R})" />.
        </InfoBlock>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Changer la base d'observation modifie la matrice associée, mais conserve les propriétés profondes intrinsèques de l'application (comme sa trace, son rang, et son déterminant). L'enjeu de la **réduction des endomorphismes** est de débusquer une base privilégiée où la matrice devient la plus simple possible : une **matrice diagonale**.
        </p>
      </Section>

      <Section title="💎 Valeurs Propres, Vecteurs Propres et Noyau" icon="💎" color="emerald">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La diagonalisation repose sur la recherche de directions vectorielles invariantes ou stables par rapport à la transformation linéaire.
        </p>

        <InfoBlock type="definition" title="Vecteurs Propres et Spectre">
          Soit <MathComponent math="f" /> un endomorphisme de <MathComponent math="E" /> (de matrice <MathComponent math="A" />).
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Un réel <MathComponent math="\lambda" /> est une **valeur propre** de <MathComponent math="f" /> s'il existe un vecteur **non nul** <MathComponent math="\vec{x}" /> tel que : 
              <br />
              <MathComponent block math="A\vec{x} = \lambda\vec{x}" />
            </li>
            <li>Le vecteur non nul <MathComponent math="\vec{x}" /> est alors appelé **vecteur propre** de <MathComponent math="A" /> associé à <MathComponent math="\lambda" />.</li>
            <li>L'ensemble de toutes les valeurs propres est appelé le **spectre** de <MathComponent math="A" />, noté <MathComponent math="\text{Sp}(A)" />.</li>
          </ul>
        </InfoBlock>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Pour trouver ces valeurs propres mécaniquement, on cherche à annuler l'injectivité de la matrice <MathComponent math="(A - \lambda I_n)" />, ce qui revient à résoudre l'annulation algébrique de son déterminant :
        </p>

        <FormulaBox formula="P_A(X) = \det(A - X I_n) = 0" />

        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Le polynôme $P_A(X)$ est appelé le **polynôme caractéristique**. Les valeurs propres sont rigoureusement ses racines réelles ou complexes.
        </p>
      </Section>

      <Section title="🎮 Simulateur Interactif : Métamorphose Vectorielle en 2D" icon="🎮" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Configurez les coefficients de votre matrice carrée 2D <MathComponent math="A = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}" />. Choisissez ensuite les coordonnées de votre vecteur d'essai <MathComponent math="\vec{x}" />. Observez comment la transformation le projette sur le vecteur résultant <MathComponent math="A\vec{x}" /> (en rose). Essayez de trouver une configuration où le vecteur de base et le vecteur transformé s'alignent parfaitement : <strong>vous tiendrez alors un vecteur propre de la matrice !</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          {/* Controllers */}
          <div className="md:col-span-5 space-y-5">
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
              <div className="font-bold text-slate-900 border-b border-slate-100 pb-2 text-xs uppercase tracking-wider mb-3">CONSTRUCTION DE LA MATRICE A</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">a11 : {a11.toFixed(1)}</span>
                  <input type="range" min="-2.0" max="2.0" step="0.5" value={a11} onChange={(e) => setA11(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">a12 : {a12.toFixed(1)}</span>
                  <input type="range" min="-2.0" max="2.0" step="0.5" value={a12} onChange={(e) => setA12(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">a21 : {a21.toFixed(1)}</span>
                  <input type="range" min="-2.0" max="2.0" step="0.5" value={a21} onChange={(e) => setA21(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">a22 : {a22.toFixed(1)}</span>
                  <input type="range" min="-2.0" max="2.0" step="0.5" value={a22} onChange={(e) => setA22(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
              <div className="font-bold text-slate-900 border-b border-slate-100 pb-2 text-xs uppercase tracking-wider mb-3">COORDONNÉES DU VECTEUR X</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">x1 (Horizontal) : {x1.toFixed(1)}</span>
                  <input type="range" min="-3" max="3" step="0.2" value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">x2 (Vertical) : {x2.toFixed(1)}</span>
                  <input type="range" min="-3" max="3" step="0.2" value={x2} onChange={(e) => setX2(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-xs space-y-2">
              <div className="font-bold text-[10px] uppercase tracking-wider text-muted-text">Analyse Algébrique Locale</div>
              <div className="flex justify-between">
                <span>Comportement d'analyse ($x$) :</span>
                <span className="font-mono text-emerald-600 font-bold">[{x1.toFixed(1)}, {x2.toFixed(1)}]</span>
              </div>
              <div className="flex justify-between">
                <span>Vecteur transformé ($Ax$) :</span>
                <span className="font-mono text-rose-500 font-bold">[{y1.toFixed(1)}, {y2.toFixed(1)}]</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span>Valeurs propres réelles :</span>
                <span className="font-mono font-bold text-indigo-700">
                  {lambda1 !== null && !isNaN(lambda1) ? `${lambda1.toFixed(2)}` : "Irrationnelles"} 
                  {lambda2 !== null && !isNaN(lambda2) && lambda1 !== lambda2 ? ` et ${lambda2.toFixed(2)}` : ""}
                </span>
              </div>
              {isEigen && (
                <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-center rounded-lg animate-pulse">
                  ✨ Alignement optimal ! Vecteur propre détecté (λ ≈ {detectedEigenvalue?.toFixed(1)}) !
                </div>
              )}
            </div>
          </div>

          {/* SVG Eigenspace visual plane view */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={280} height={280} className="overflow-visible select-none">
                {/* Visual grid subdivisions */}
                <line x1={0} y1={oY} x2={280} y2={oY} stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1={oX} y1={0} x2={oX} y2={280} stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Grid subdivisions lines coordinate loop */}
                {[-3, -2, -1, 1, 2, 3].map(coord => (
                  <React.Fragment key={coord}>
                    <line x1={0} y1={oY - coord * scale} x2={280} y2={oY - coord * scale} stroke="#f1f5f9" strokeWidth="1" />
                    <line x1={oX + coord * scale} y1={0} x2={oX + coord * scale} y2={280} stroke="#f1f5f9" strokeWidth="1" />
                  </React.Fragment>
                ))}

                {/* Vector x (base plane green) */}
                <line 
                  x1={oX} 
                  y1={oY} 
                  x2={oX + x1 * scale} 
                  y2={oY - x2 * scale} 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                />
                <polygon points={`${oX + x1 * scale},${oY - x2 * scale} ${oX + x1 * scale - (x1 > 0 ? 5 : -5)},${oY - x2 * scale + (x2 > 0 ? 5 : -5)} ${oX + x1 * scale - (x1 > 0 ? 2 : -2)},${oY - x2 * scale + (x2 > 0 ? 8 : -8)}`} fill="#10b981" />
                <text x={oX + x1 * scale + 5} y={oY - x2 * scale - 5} fontSize="10" fontWeight="bold" fill="#10b981">x</text>

                {/* Vector Ax (resulting plane rose) */}
                <line 
                  x1={oX} 
                  y1={oY} 
                  x2={oX + y1 * scale} 
                  y2={oY - y2 * scale} 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeDasharray="3,1"
                />
                <circle cx={oX + y1 * scale} cy={oY - y2 * scale} r="4" fill="#ef4444" />
                <text x={oX + y1 * scale + 5} y={oY - y2 * scale + 15} fontSize="10" fontWeight="bold" fill="#ef4444">Ax</text>

                {/* Label tags axes */}
                <text x={265} y={oY - 5} fontSize="9" fontWeight="bold" fill="#94a3b8">x1</text>
                <text x={oX + 5} y={20} fontSize="9" fontWeight="bold" fill="#94a3b8">x2</text>
              </svg>
            </div>
            <p className="mt-3 text-xs italic text-slate-500 text-center">
              Le repère cartésien représente la transformation linéaire globale. {isEigen ? "Le vecteur x n'a subi qu'un étirement." : "Le vecteur x a été dévié et étiré."}
            </p>
          </div>
        </div>
      </Section>

      <Section title="🔍 Critères Théoriques de Diagonalisabilité" icon="🔍" color="slate">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En CPGE B/L, l'analyse ne se limite pas à des simulations numériques 2D. Nous devons poser des démonstrations mathématiques robustes sur la diagonalisabilité d'une matrice <MathComponent math="A \in \mathcal{M}_n(\mathbb{R})" />.
        </p>

        <InfoBlock type="reminder" title="Théorème de Diagonalisabilité">
          Une matrice carrée <MathComponent math="A" /> de dimension <MathComponent math="n" /> est diagonalisable si et seulement s'il existe une base de vecteurs propres. En termes algébriques, cela se ramène à deux conditions cumulatives obligatoires :
          <ol className="list-decimal pl-6 mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li>Le polynôme caractéristique <MathComponent math="P_A(X)" /> est **scindé** sur <MathComponent math="\mathbb{R}" /> (il se décompose entièrement produit de facteurs du premier degré).</li>
            <li>Pour chaque valeur propre <MathComponent math="\lambda" />, la dimension de son sous-espace propre associé <MathComponent math="E_\lambda = \ker(A - \lambda I_n)" /> est rigoureusement égale à sa multiplicité algébrique dans le polynôme.</li>
          </ol>
        </InfoBlock>

        <TipBanner type="success" title="Cas Particulier Pratique Royal">
          Si <MathComponent math="P_A(X)" /> admet <MathComponent math="n" /> racines réelles **distinctes**, alors la matrice <MathComponent math="A" /> est d'office diagonalisable sans investigation supplémentaire. De même, toute matrice **symétrique réelle adjoint** est diagonalisable dans une base orthonormée de vecteurs propres.
        </TipBanner>
      </Section>

      <Section title="✏️ Résolution d'Exercices Guidés" icon="✏️" color="emerald">
        <InteractiveExercise
          title="Exercice 3 : Diagonalisation d'une matrice d'ordre 2"
          question={<p>Soit la matrice carrée d'ordre 2 suivante : {"$A = \\begin{pmatrix} 3 & 2 \\\\ 1 & 2 \\end{pmatrix}$"}. Démontrer que la réduction est possible, calculer ses valeurs propres et sa matrice diagonale associée D.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 1 : Calculer le polynôme caractéristique</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Calculons le polynôme caractéristique : $P_A(X) = \det(A - X I_2)$ :
                <br />
                <MathComponent block math="P_A(X) = \det\begin{pmatrix} 3-X & 2 \\ 1 & 2-X \end{pmatrix} = (3-X)(2-X) - 2" />
                <MathComponent block math="P_A(X) = X^2 - 5X + 6 - 2 = X^2 - 5X + 4" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Chercher les racines de P_A(X)</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                On résout le polynôme trinôme du second degré $X^2 - 5X + 4 = 0$. Le discriminant vaut :
                <br />
                <MathComponent block math="\Delta = (-5)^2 - 4(1)(4) = 25 - 16 = 9 = 3^2" />
                Les racines réelles distinctes sont donc :
                <MathComponent block math="\lambda_1 = \frac{5 + 3}{2} = 4 \quad \text{et} \quad \lambda_2 = \frac{5 - 3}{2} = 1" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Conclure sur la diagonalisabilité</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
                Puisque la matrice carrée $A$ de dimension $2$ possède deux valeurs propres réelles distinctes ($\lambda_1 = 4$ et $\lambda_2 = 1$), elle est d'office diagonalisable. Elle est semblable à la matrice diagonale pure :
                <MathComponent block math="D = \begin{pmatrix} 4 & 0 \\ 0 & 1 \end{pmatrix}" />
                De plus, les sous-espaces propres associés $E_4$ et $E_1$ sont de dimension 1, engendrés par des vecteurs linéairement indépendants.
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards conceptuelles" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Quels sont les invariants préservés par changement de base ?"
            back="La trace (somme des éléments diagonaux), le déterminant (produit des valeurs propres), et le polynôme caractéristique lui-même."
          />
          <Flashcard 
            front="Qu'est-ce qu'une matrice semblable ?"
            back="A et B sont semblables s'il existe une matrice inversible P de passage telle que A = P * B * P^-1. Elles modélisent le même endomorphisme sous deux bases d'observation différentes."
          />
          <Flashcard 
            front="Qu'implique une valeur propre nulle (λ = 0) ?"
            back="Si λ = 0 est valeur propre de A, alors det(A) = 0. Le noyau de la matrice Ker(A) est non vide, signifiant que la matrice n'est pas inversible."
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes des Étudiants" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la signification géométrique de la trace d'un endomorphisme ?",
              answer: "La trace d'une matrice représente la somme de ses valeurs propres complexes cumulées. C'est un invariant géométrique physique traduisant le facteur de déformation globale d'échelle de volume lors de l'application de la transformation."
            },
            {
              question: "Que se passe-t-il si le discriminant du polynôme caractéristique est strictement négatif ?",
              answer: "Les valeurs propres sont alors des nombres complexes conjugués. L'endomorphisme n'est pas diagonalisable sur R, mais l'est sur C. Géométriquement, cela correspond à des opérations contenant des angles de rotation dans le plan."
            },
            {
              question: "Pourquoi l'ordre des éléments dans la matrice diagonale D a-t-il une importance ?",
              answer: "L'ordre des valeurs propres sur la diagonale de D doit correspondre scrupuleusement à l'alignement des colonnes de vecteurs propres positionnés dans la matrice de passage P associée. Échanger l'ordre casse la similarité matricielle."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz Validation de Maîtrise" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si une matrice carrée 4x4 possède un polynôme caractéristique égal à P_A(X) = X(X-1)^2(X-3). Quelles sont ses valeurs propres ?",
              options: [
                "0, 1 (double) et 3",
                "1, 2, et 4, par translation",
                "Les valeurs propres sont indéterminées sans noyau"
              ],
              correctAnswer: 0,
              explanation: "Les valeurs propres sont les valeurs annulant le polynôme caractéristique. En posant P_A(X) = 0, on identifie immédiatement la racine simple 0, la racine double 1 (multiplicité 2) et la racine simple 3."
            },
            {
              question: "Toute matrice symétrique à coefficients réels est...",
              options: [
                "De déterminant d'office nul",
                "Strictement triangulaire supérieure",
                "Toujours diagonalisable sur le corps des réels"
              ],
              correctAnswer: 2,
              explanation: "D'après le théorème spectral fondamental, toute matrice symétrique réelle est diagonalisable sur l'ensemble des réels dans une base orthonormée de vecteurs propres."
            },
            {
              question: "Si A est semblable à une matrice diagonale D. Comment d'exprime la puissance de matrice A^k ?",
              options: [
                "A^k est indéfinie par non-linéarité",
                "A^k = P * D^k * P^-1",
                "A^k = P^k * D * P^(-k)"
              ],
              correctAnswer: 1,
              explanation: "Puisque A = P D P^-1, en calculant récursivement, les termes intérieurs s'annulent (P^-1 * P = I_n), ce qui donne directement A^k = P D^k P^-1, simplifiant considérablement le calcul d'évolution de puissance."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je comprends ce qu'est une direction invariante ou vecteur propre associé à un endomorphisme.",
            "Je sais poser le polynôme caractéristique pour extraire les valeurs propres par racines.",
            "Je sais démontrer et modéliser la diagonalisabilité d'une matrice carrée quelconque.",
            "Je sais ordonner la matrice de passage P pour rétablir une similarité matricielle exacte."
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

export default Course_CPGE_BL_AlgebreLineaire;
