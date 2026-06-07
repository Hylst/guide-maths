import React, { useState, useEffect, useRef } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Play, RotateCcw, Sliders, Footprints } from 'lucide-react';

const Course_Licence_MIASHS_MarkovChain: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Probability parameters for transition matrix
  // pAA = 1 - pAB, pBB = 1 - pBA
  const [pAB, setPAB] = useState<number>(0.3); // Prob of transitioning from State A to State B
  const [pBA, setPBA] = useState<number>(0.4); // Prob of transitioning from State B to State A

  const pAA = 1 - pAB;
  const pBB = 1 - pBA;

  // Simulator state
  const [currentState, setCurrentState] = useState<"A" | "B">("A");
  const [probA, setProbA] = useState<number>(1.0); // Initial probability vector [1, 0]
  const [probB, setProbB] = useState<number>(0.0);
  const [stepCount, setStepCount] = useState<number>(0);

  // Animated active ball trajectory coordinate
  const [agentPos, setAgentPos] = useState<{ x: number, y: number }>({ x: 75, y: 150 });

  // Compute stationary distribution analytically
  // \pi_A * pAB = \pi_B * pBA  => \pi_A / \pi_B = pBA / pAB
  // Since \pi_A + \pi_B = 1:
  // \pi_A = pBA / (pAB + pBA) and \pi_B = pAB / (pAB + pBA)
  const denom = pAB + pBA;
  const stationaryA = denom > 0 ? parseFloat((pBA / denom).toFixed(3)) : 0.5;
  const stationaryB = denom > 0 ? parseFloat((pAB / denom).toFixed(3)) : 0.5;

  // Positions on the SVG graph
  const xA = 70;
  const yA = 150;
  const xB = 230;
  const yB = 150;

  // Sync agent position based on state selection
  useEffect(() => {
    if (currentState === "A") {
      setAgentPos({ x: xA, y: yA });
    } else {
      setAgentPos({ x: xB, y: yB });
    }
  }, [currentState]);

  // Handle single step simulation
  const handleSimulateStep = () => {
    // 1. Simulate agent transition randomly
    const rand = Math.random();
    let nextAgentState: "A" | "B" = "A";
    if (currentState === "A") {
      nextAgentState = rand < pAB ? "B" : "A";
    } else {
      nextAgentState = rand < pBA ? "A" : "B";
    }
    setCurrentState(nextAgentState);

    // 2. Compute true probability vector evolution: v_{n+1} = v_n * P
    const nextProbA = probA * pAA + probB * pBA;
    const nextProbB = probA * pAB + probB * pBB;
    setProbA(parseFloat(nextProbA.toFixed(4)));
    setProbB(parseFloat(nextProbB.toFixed(4)));
    setStepCount((prev) => prev + 1);
  };

  // Reset simulation state
  const handleReset = () => {
    setCurrentState("A");
    setProbA(1.0);
    setProbB(0.0);
    setStepCount(0);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-LIC-MARKOV"
        title="Licence MIASHS : Chaînes de Markov à États Finis"
        subtitle="Processus stochastiques dynamiques, matrices de transition, théorème de convergence ergodique et états absorbants."
        duration="1h 45"
        level="Licence MIASHS (L3)"
        prerequisites={["Probabilités de base (conditionnement)", "Calcul matriciel (produit, diagonalisation, trace)"]}
        objectives={[
          "Formuler rigoureusement un processus stochastique sous la propriété de Markov.",
          "Construire et manipuler la matrice de transition d'une chaîne à états finis.",
          "Rechercher analytiquement la distribution stationnaire unique d'une chaîne de Markov.",
          "Distinguer les classes d'équivalence, la récurrence, la transitivité et l'absorption."
        ]}
      />

      <Section title="🎲 Propriété de Markov et Modélisation Stochastique" icon="📐" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Dans le domaine interdisciplinaire MIASHS, les chaînes de Markov représentent un puissant outil pour modéliser des évolutions temporelles aléatoires (cours de la bourse, transitions d'attention d'utilisateurs, files d'attente d'équipements logistiques).
        </p>

        <InfoBlock type="definition" title="Propriété de Markov">
          Un processus stochastique à temps discret <MathComponent math="(X_n)_{n \in \mathbb{N}}" /> d'un espace d'états fini <MathComponent math="S" /> est une <strong>chaîne de Markov</strong> s'il est "sans mémoire". Sa distribution future dépend du présent mais pas des états passés :
          <MathComponent block math="\mathbb{P}(X_{n+1} = j \mid X_n = i, X_{n-1} = i_{n-1}, \dots, X_0 = i_0) = \mathbb{P}(X_{n+1} = j \mid X_n = i)" />
          On appelle cette probabilité de transition élémentaire : <MathComponent math="P_{ij}" />.
        </InfoBlock>

        <TipBanner type="info" title="Nature de la matrice de transition">
          La matrice de transition <MathComponent math="P = (P_{ij})_{i, j \in S}" /> est une <strong>matrice stochastique</strong> :
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <li>Toutes ses entrées sont positives : <MathComponent math="P_{ij} \ge 0" /></li>
            <li>La somme de chaque ligne est rigoureusement égale à 1 (loi des probabilités totales) : <MathComponent math="\sum_{j \in S} P_{ij} = 1 \ \forall i" /></li>
          </ul>
        </TipBanner>
      </Section>

      <Section title="⚖️ Classification des États et Distribution Stationnaire" icon="⚖️" color="emerald">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En faisant évoluer une chaîne sur le long terme, l'état probabiliste de l'agent tend fréquemment vers une distribution d'équilibre immuable, appelée la **distribution stationnaire**.
        </p>

        <InfoBlock type="definition" title="Distribution Stationnaire">
          Une distribution de probabilité <MathComponent math="\pi" /> (vecteur ligne positif où <MathComponent math="\sum_{i \in S} \pi_i = 1" />) est dite <strong>stationnaire</strong> pour une chaîne de matrice <MathComponent math="P" /> si elle vérifie :
          <MathComponent block math="\pi P = \pi" />
          Cela signifie que <MathComponent math="\pi" /> est un vecteur propre à gauche de la matrice <MathComponent math="P" /> associé à sa valeur propre de Perron-Frobenius égale à 1.
        </InfoBlock>

        <FormulaBox formula="\text{Équation de Chapman-Kolmogorov : } P_{ij}^{(n)} = \mathbb{P}(X_{n} = j \mid X_0 = i) \implies P^{(n)} = P^n" />
      </Section>

      <Section title="🎮 Simulateur Interactif de Chaîne de Markov à 2 États" icon="🕹️" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Modifiez les probabilités de transition d'un agent se déplaçant entre le **State A** et le **State B**. Cliquez sur **Effectuer une Étape** pour voir le point rouge de l'agent se déplacer et observez pas à pas comment le vecteur probabiliste converge asymétriquement vers la distribution stationnaire calculée analytiquement !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800-strong shadow-sm">
          {/* Controls parameters */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Transition de A vers B : <MathComponent math="P(A \to B)" /></span>
                <span className="text-primary font-bold">{pAB}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={pAB}
                onChange={(e) => setPAB(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Transition de B vers A : <MathComponent math="P(B \to A)" /></span>
                <span className="text-rose-500 font-bold">{pBA}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={pBA}
                onChange={(e) => setPBA(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="bg-muted p-4 rounded-xl border border-border text-xs space-y-3">
              <div className="font-bold uppercase tracking-wider text-muted-text">Distribution en direct (Pas d'évol : {stepCount})</div>
              <div className="flex justify-between">
                <span>Vecteur de probabilité :</span>
                <span className="font-mono font-bold text-indigo-600">[{probA}, {probB}]</span>
              </div>
              <div className="flex justify-between">
                <span>Distribution stationnaire attendue :</span>
                <span className="font-mono font-bold text-emerald-500">[{stationaryA}, {stationaryB}]</span>
              </div>
              <div className="flex justify-between">
                <span>État discret de l'agent :</span>
                <span className="font-bold text-rose-500">Node {currentState}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSimulateStep}
                className="flex-1 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1"
              >
                <Footprints className="w-3.5 h-3.5" />
                Effectuer une Étape
              </button>
              <button
                onClick={handleReset}
                className="px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive directed graph */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={300} height={300} className="overflow-visible">
                {/* Connection paths (A -> B and B -> A as curved lines) */}
                <path
                  d="M 90 135 Q 150 100 210 135"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeDasharray="4,2"
                />
                <polygon points="210,135 204,130 203,136" fill="#6366f1" />

                <path
                  d="M 210 165 Q 150 200 90 165"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeDasharray="4,2"
                />
                <polygon points="90,165 96,170 97,164" fill="#ef4444" />

                {/* Nodes representing states */}
                <circle cx={xA} cy={yA} r={30} fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2" />
                <text x={xA - 7} y={yA + 6} fontSize="16" fontWeight="bold" fill="currentColor" className="text-slate-800 dark:text-slate-100">A</text>

                <circle cx={xB} cy={yB} r={30} fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
                <text x={xB - 7} y={yB + 6} fontSize="16" fontWeight="bold" fill="currentColor" className="text-slate-800 dark:text-slate-100">B</text>

                {/* Self Transition Loops */}
                <path d="M 50 135 A 15 15 0 1 1 50 165" fill="none" stroke="#6366f1" strokeWidth="2" />
                <text x={18} y={154} fontSize="10" fontWeight="bold" fill="currentColor" className="text-slate-500">pAA</text>

                <path d="M 250 135 A 15 15 0 1 1 250 165" fill="none" stroke="#ef4444" strokeWidth="2" />
                <text x={268} y={154} fontSize="10" fontWeight="bold" fill="currentColor" className="text-slate-500">pBB</text>

                {/* Probability values near arrows */}
                <text x={140} y={110} fontSize="11" fontWeight="bold" fill="#6366f1">{pAB}</text>
                <text x={140} y={202} fontSize="11" fontWeight="bold" fill="#ef4444">{pBA}</text>

                {/* Animated Agent Dot */}
                <circle
                  cx={agentPos.x}
                  cy={agentPos.y}
                  r={8}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-300 shadow-md"
                />
              </svg>
            </div>
            <p className="mt-2 text-xs text-muted-text italic text-slate-500 text-center">
              Agent virtuel actuellement localisé sur le {currentState}.
            </p>
          </div>
        </div>
      </Section>

      <Section title="💎 Théorème de Convergence Ergodique" icon="💡" color="amber">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Quand est-on certain de converger vers un état stable à coup sûr ? Cela requiert l'ergodicité de la chaîne.
        </p>

        <InfoBlock type="reminder" title="Théorème de convergence">
          Une chaîne de Markov est dite <strong>ergodique</strong> (ou irréductible et apériodique) si on peut atteindre n'importe quel état à partir de n'importe quel autre et qu'il n'existe pas de phénomène oscillatoire périodique. 
          <br />
          Toute chaîne de Markov ergodique sur un espace d'états fini possède une **unique distribution stationnaire** <MathComponent math="\pi" /> vers laquelle le système converge, quel que soit le vecteur d'état probabiliste initial :
          <MathComponent block math="\lim_{n \to \infty} P^n = \mathbf{1} \pi" />
        </InfoBlock>
      </Section>

      <Section title="✏️ Exercice d'Analyse Algébrique Résolu" icon="✏️" color="indigo">
        <InteractiveExercise
          title="Exercice 1 : Calcul analytique de distribution stationnaire d'ordre 3"
          question={<p>On considère un système d'évaluation client à 3 niveaux (A, B, C) représenté par la matrice stochastique : P = [[0.6, 0.4, 0], [0.3, 0.5, 0.2], [0, 0.4, 0.6]]. Déterminer la distribution stationnaire unique de ce modèle.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 1 : Poser le système linéaire πP = π</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Notons le vecteur stationnaire <MathComponent math="\pi = (\pi_A, \pi_B, \pi_C)" />. L'égalité <MathComponent math="\pi P = \pi" /> équivaut à 3 équations scalaires :
                <br />
                • <MathComponent block math="0.6 \pi_A + 0.3 \pi_B = \pi_A \iff 0.3 \pi_B = 0.4 \pi_A \iff \pi_A = \frac{3}{4} \pi_B" />
                • <MathComponent block math="0.4 \pi_A + 0.5 \pi_B + 0.4 \pi_C = \pi_B" />
                • <MathComponent block math="0.2 \pi_B + 0.6 \pi_C = \pi_C \iff 0.2 \pi_B = 0.4 \pi_C \iff \pi_C = \frac{1}{2} \pi_B" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Condition de normalisation de probabilité totale</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                La somme des éléments du vecteur propre stochastique doit s'égaler à l'unité de mesure totale :
                <MathComponent block math="\pi_A + \pi_B + \pi_C = 1" />
                Réinjectons les relations trouvées à l'étape précédente en fonction de la seule variable <MathComponent math="\pi_B" /> :
                <MathComponent block math="\frac{3}{4}\pi_B + \pi_B + \frac{1}{2}\pi_B = 1 \iff \left(\frac{3}{4} + \frac{4}{4} + \frac{2}{4}\right)\pi_B = 1 \iff \frac{9}{4}\pi_B = 1 \iff \pi_B = \frac{4}{9}" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100 font-medium">
              <p>Étape 3 : Résolution complète et distribution finale</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100">
                On en déduit l'ensemble des coordonnées du vecteur d'équilibre stochastique :
                <br />
                • <MathComponent block math="\pi_A = \frac{3}{4} \times \frac{4}{9} = \frac{3}{9} = \frac{1}{3} \approx 0.333" />
                • <MathComponent block math="\pi_B = \frac{4}{9} \approx 0.444" />
                • <MathComponent block math="\pi_C = \frac{1}{2} \times \frac{4}{9} = \frac{2}{9} \approx 0.222" />
                L'unique vecteur stationnaire d'équilibre stable du système vaut :
                <MathComponent block math="\pi = \left(\frac{1}{3}, \frac{4}{9}, \frac{2}{9}\right)" />
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Probabilités Avancées" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Qu'est-ce qu'un état absorbant dans une chaîne de Markov ?"
            back="C'est un état i tel que P_ii = 1. Une fois que l'agent l'atteint, il n'en repart plus jamais (probabilité de transition sortante nulle)."
          />
          <Flashcard 
            front="Que stipule l'Irréductibilité d'une chaîne ?"
            back="Une chaîne est dite irréductible si son graphe est fortement connexe : il existe toujours un chemin de transition possible entre tout couple d'état (i, j)."
          />
          <Flashcard 
            front="Une chaîne infinie admet-elle toujours une distribution stationnaire ?"
            back="Non, la stationnarité sur des espaces dénombrables infinis (Z) exige la récurrence positive (loi forte des grands nombres de Markov)."
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi la propriété de Markov s'appelle-t-elle 'propriété sans mémoire' ?",
              answer: "Parce que l'histoire passée de la trajectoire n'a aucun impact sur les futurs sauts probabilistes. Si on connait l'état physique exact à l'instant n, le comportement futur est uniquement modélisé par P sans se préoccuper de comment l'agent y est parvenu."
            },
            {
              question: "Quelle est la signification réelle de la valeur propre 1 en théorie matricielle ?",
              answer: "Par le théorème de Perron-Frobenius, toute matrice stochastique admet la valeur propre 1. Puisque la somme de chaque ligne vaut 1, le vecteur colonne unitaire 1 est un vecteur propre à droite pour la valeur propre 1. Par symétrie de spectre, un vecteur stochastique à gauche existe également."
            },
            {
              question: "Quel rapport y a-t-il entre chaînes de Markov et l'algorithme originel de Google (PageRank) ?",
              answer: "L'algorithme originel PageRank modélise la navigation sur le web comme un surfeur aléatoire naviguant de liens en liens. L'importance relative d'une page web correspond à sa coordonnée d'équilibre stationnaire π_i sous une chaîne de Markov géante ergodique."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation de Fin d'Épreuve" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Soit une matrice de transition P d'une chaîne de Markov d'ordre 2 : P = [[0.2, 0.8], [0.5, 0.5]]. Quelle est la probabilité que X₂ = A sachant que X₀ = A ?",
              options: [
                "Une probabilité de 0.2",
                "Une probabilité de 0.44",
                "Une probabilité de 0.5"
              ],
              correctAnswer: 1,
              explanation: "On cherche l'élément (1,1) de la matrice élevée au carré P² : P²(1,1) = P(1,1)×P(1,1) + P(1,2)×P(2,1) = 0.2×0.2 + 0.8×0.5 = 0.04 + 0.4 = 0.44."
            },
            {
              question: "Comment appelle-t-on une chaîne de Markov dont tous les états communiquent entre eux ?",
              options: [
                "Une chaîne de transition absorbante",
                "Une chaîne de transition irréductible",
                "Un processus stochastique asymétrique discret"
              ],
              correctAnswer: 1,
              explanation: "L'irréductibilité stipule que l'espace complet ne forme qu'une seule classe de communication fermée connexe, rendant possible d'aller de tout point à un autre."
            },
            {
              question: "Quelle est la condition nécessaire pour qu'une chaîne de Markov à temps discret conserve la stationnarité du vecteur de départ ?",
              options: [
                "Le vecteur initial est orthogonal à l'axe des ordonnées",
                "Le vecteur initial est solution de π P = π",
                "Le déterminant de la matrice de transition s'égorger à la moyenne"
              ],
              correctAnswer: 1,
              explanation: "Si le vecteur initial est déjà le vecteur stationnaire π, la multiplication successive conduit à un état identique stable : X_n aura toujours exactement π comme distribution de probabilité."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais définir rigoureusement la propriété probabiliste de chaîne de Markov.",
            "Je sais dresser le graphe de transition d'une chaîne à états finis sous forme dirigée.",
            "Je sais calculer le vecteur de distribution de stationnarité unique.",
            "Je comprends le concept de convergence asymptotique de Chapman-Kolmogorov."
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

export default Course_Licence_MIASHS_MarkovChain;
