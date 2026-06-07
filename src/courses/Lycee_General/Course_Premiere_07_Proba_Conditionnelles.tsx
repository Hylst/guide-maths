import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Premiere_07_Proba_Conditionnelles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [pM, setPM] = useState<number>(0.1); 
  const [pT_given_M, setPT_given_M] = useState<number>(0.9);
  const [pT_given_notM, setPT_given_notM] = useState<number>(0.05);

  // M = Malade, T = Test Positif
  // P(M)
  const pNotM = 1 - pM;
  // Branches
  const pM_inter_T = pM * pT_given_M;
  const pM_inter_notT = pM * (1 - pT_given_M);
  const pNotM_inter_T = pNotM * pT_given_notM;
  const pNotM_inter_notT = pNotM * (1 - pT_given_notM);

  // Proba Totale
  const pT = pM_inter_T + pNotM_inter_T;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-PRC"
        title="Probabilités Conditionnelles"
        subtitle="Le monde du 'Sachant Que' et l'art de l'Arbre Pondéré."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : L'Indice qui Change Tout" icon="🕵️" color="emerald">
        <p>
          Au collège, on calcule la probabilité de tirer un Roi dans un jeu de cartes : P(Roi) = 4/32. Facile. 
        </p>
        <p className="mt-2">
          Mais imagine qu'on te donne un indice : <strong className="text-emerald-700 dark:text-emerald-300">"Sais-tu que la carte tirée est une figure peinte en rouge ?"</strong> <br/>
          Soudainement, l'univers des possibles (le jeu complet) s'effondre. Tu ne regardes plus que les figures rouges. La probabilité d'avoir le Roi change drastiquement ! C'est ça, la <strong>probabilité conditionnelle</strong>. L'information modifie la chance.
        </p>
        
        <InfoBlock type="definition" title="La Notation">
          On le note <strong>P<sub>A</sub>(B)</strong> ou <strong>P(B | A)</strong> : "La probabilité que B se produise, <strong>SACHANT QUE</strong> l'événement A s'est déjà réalisé."
        </InfoBlock>
      </Section>

      <Section title="📜 La Formule Reine (& L'Arbre)" icon="🌳" color="amber">
        <p className="mb-4">
          La formule officielle permet de lier le "ET" (l'intersection ∩) au "SACHANT QUE".
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormulaBox 
            title="Le 'Sachant que'" 
            math={"P_A(B) = \\frac{P(A \\cap B)}{P(A)}"} 
          />
          <FormulaBox 
            title="Le 'Et' (Intersection)" 
            math={"P(A \\cap B) = P(A) \\times P_A(B)"} 
          />
        </div>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 border border-amber-100 dark:border-amber-800/60 rounded-xl">
          <h4 className="font-bold text-amber-950 dark:text-amber-50 mb-2">Les 2 Règles d'Or de l'Arbre Pondéré :</h4>
          <ol className="list-decimal list-inside text-amber-900 dark:text-amber-100 space-y-2">
            <li>La somme des probabilités issues d'un même nœud vaut <strong>1</strong>.</li>
            <li>La probabilité d'un "chemin complet" s'obtient en <strong>multipliant</strong> les probabilités rencontrées. (Ce qui donne l'intersection ∩).</li>
          </ol>
        </div>
      </Section>

      <Section title="⚙️ Simulateur de Dépistage (Le Paradoxe Médical)" icon="🏥" color="indigo">
        <p className="mb-4">
          Un classique absolu. On étudie une maladie, et la fameuse précision d'un test médical. 
          <br/><strong>M</strong> : Être Malade. <strong>T</strong> : Avoir un test positif.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm overflow-x-auto">
          <div className="flex flex-col gap-4 mb-6 max-w-sm mx-auto">
            <label className="flex flex-col">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">P(M) - % de malades réels</span>
              <input type="range" min="0.01" max="0.5" step="0.01" value={pM} onChange={(e) => setPM(parseFloat(e.target.value))} className="accent-indigo-500" />
              <span className="text-xs text-center font-mono">{(pM * 100).toFixed(0)}%</span>
            </label>
            <label className="flex flex-col">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">P<sub>M</sub>(T) - Test Vrai Positif</span>
              <input type="range" min="0.5" max="0.99" step="0.01" value={pT_given_M} onChange={(e) => setPT_given_M(parseFloat(e.target.value))} className="accent-emerald-500" />
              <span className="text-xs text-center font-mono">{(pT_given_M * 100).toFixed(0)}% chance que le test marche si on est malade.</span>
            </label>
            <label className="flex flex-col">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">P<sub>nonM</sub>(T) - Faux Positif (!)</span>
              <input type="range" min="0.01" max="0.2" step="0.01" value={pT_given_notM} onChange={(e) => setPT_given_notM(parseFloat(e.target.value))} className="accent-rose-500" />
              <span className="text-xs text-center font-mono">{(pT_given_notM * 100).toFixed(0)}% chance que le test crie 'Malade !' alors que tout va bien.</span>
            </label>
          </div>

          <div className="p-4 bg-card rounded-xl border border-slate-300">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-4 border-b pb-2">Formule des Probabilités Totales</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Quelle est la probabilité totale d'avoir un test Positif P(T) ? On additionne les "bouts de branches" qui mènent à T :</p>
            <div className="font-mono bg-slate-100 p-2 rounded text-sm overflow-x-auto whitespace-nowrap">
              P(T) = <span className="text-indigo-600 dark:text-indigo-400">P(M ∩ T)</span> + <span className="text-rose-600 dark:text-rose-400">P(nonM ∩ T)</span><br/>
              P(T) = ({pM.toFixed(2)} × {pT_given_M.toFixed(2)}) + ({pNotM.toFixed(2)} × {pT_given_notM.toFixed(2)})<br/>
              P(T) = {pM_inter_T.toFixed(3)} + {pNotM_inter_T.toFixed(3)} = <strong>{pT.toFixed(3)}</strong>
            </div>

            <div className="mt-4 p-3 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/60 rounded-lg">
              <span className="font-bold text-amber-950 dark:text-amber-50 block mb-1">Inversion de Bayes (Question Piège du Bac) :</span>
              <span className="text-sm text-amber-900 dark:text-amber-100">
                "J'ai un test positif. Quelle est la vraie probabilité que je sois VRAIMENT malade ?"<br/>
                P<sub>T</sub>(M) = P(M ∩ T) / P(T) = {pM_inter_T.toFixed(3)} / {pT.toFixed(3)} = <strong>{((pM_inter_T / pT)*100).toFixed(1)}% !</strong>
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul de Probabilité Conditionnelle"
          question={<p>Dans un groupe, <><MathComponent math={"40\\%"} /></> des personnes aiment le thé, et <><MathComponent math={"12\\%"} /></> aiment à la fois le thé ET le café. On choisit au hasard une personne qui aime le thé. Quelle est la probabilité qu'elle aime aussi le café ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Modélisation</p>
              <p><><MathComponent math={"P(T) = 0.40"} /></> (aime le thé).<br/><><MathComponent math={"P(T \\cap C) = 0.12"} /></> (aime thé ET café).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : La formule du sachant que</p>
              <p>On cherche <><MathComponent math={"P_T(C)"} /></>, c'est-à-dire <><MathComponent math={"P(C \\mid T)"} /></>.<br/>La formule est : <><MathComponent math={"P_T(C) = \\frac{P(T \\cap C)}{P(T)}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"P_T(C) = \\frac{0.12}{0.40} = \\frac{12}{40} = \\frac{3}{10} = 0.3"} /></>. (Donc <><MathComponent math={"30\\%"} /></>).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Indépendance ?"
          question={<p>On tire une carte dans un jeu de 32 cartes. <br/>A : "Tirer un roi" <br/>B : "Tirer un cœur" <br/>Ces deux événements sont-ils indépendants ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calculer P(A) et P(B)</p>
              <p><><MathComponent math={"P(A) = 4/32 = 1/8"} /></> (il y a 4 rois).<br/><><MathComponent math={"P(B) = 8/32 = 1/4"} /></> (il y a 8 cœurs).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Calculer l'intersection P(A ∩ B)</p>
              <p>L'intersection, c'est "Le roi de cœur". Il y en a 1 seul. Donc <><MathComponent math={"P(A \\cap B) = 1/32"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Le test d'indépendance</p>
              <p>On compare <><MathComponent math={"P(A \\cap B)"} /></> avec <><MathComponent math={"P(A) \\times P(B)"} /></>.<br/><><MathComponent math={"P(A) \\times P(B) = \\frac{1}{8} \\times \\frac{1}{4} = \\frac{1}{32}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"P(A \\cap B) = P(A) \\times P(B)"} /></>. Les événements sont parfaitement INDÉPENDANTS. (Savoir que c'est un cœur ne change pas tes chances d'avoir un roi !)</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes Flash (Indépendance)" icon="⚡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Que signifie mathématiquement que A et B sont <strong>Indépendants</strong> ?</>}
            back={<>Cela signifie que le 'sachant que' ne change rien : <br/><strong>P<sub>A</sub>(B) = P(B)</strong>.<br/><span className="text-sm">En pratique on utilise la formule de test : P(A ∩ B) = P(A) × P(B).</span></>}
          />
          <Flashcard 
            front={<>La somme de <strong>P<sub>A</sub>(B) + P<sub>A</sub>(non B)</strong> vaut quoi ?</>}
            back={<><strong>Elle vaut 1.</strong><br/><span className="text-sm">C'est la règle d'un nœud sur l'arbre. Attention : P<sub>A</sub>(B) + P<sub>nonA</sub>(B) NE VAUT PAS 1 !</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Test de Lecture d'Arbre" icon="🕹️" color="slate">
        <p className="mb-4">Voyons si tu parviens à extraire les données :</p>
        <FillInTheBlanks 
          id="condi-eval"
          content={[
            "Dans mon lycée 60% des élèves mangent à la cantine, soit P(C)=0.6. Parmi ceux qui mangent à la cantine, 30% prennent un dessert, soit P",
            { options: ["_C(D)", "_D(C)", "(C inter D)"], correctAnswer: 0 },
            "=0.3. Si je veux calculer la probabilité de l'événement 'l'élève mange à la cantine ET prend un dessert' (C ∩ D), je dois ",
            { options: ["additionner", "multiplier"], correctAnswer: 1 },
            " ces deux nombres : 0.6 × 0.3 = 0.18. La probabilités des événements totaux s'appelle la loi des probabilités ",
            { options: ["sommées", "totales", "complètes"], correctAnswer: 1 },
            "."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si P(A)=0.5, P(B)=0.2 et P(A ∩ B)=0.1. Les événements sont-ils indépendants ?",
              options: [
                "Oui, car P(A) × P(B) = 0.5 × 0.2 = 0.10, ce qui équivaut à la valeur de (A ∩ B).",
                "Non, car P(A ∩ B) n'est pas égal à zéro.",
                "On n'a pas assez d'informations pour le savoir."
              ],
              correctAnswer: 0,
              explanation: "Règle absolue : A et B sont indépendants SI ET SEULEMENT SI P(A ∩ B) = P(A) × P(B). Ici c'est le cas."
            },
            {
              question: "La formule de P_B(A) c'est :",
              options: [
                "P(A ∩ B) / P(A)",
                "P(A ∩ B) / P(B)",
                "P(A) × P_A(B)"
              ],
              correctAnswer: 1,
              explanation: "L'astuce : on divise TOUJOURS par la probabilité de l'événement CONNU. Puisque B est l'indice (le sachant que), on divise par P(B)."
            },
            {
              question: "S'il y a 3 branches principales partant du point de départ d'un arbre, quelle est la règle ?",
              options: [
                "Leur somme doit valoir 3.",
                "Leur somme doit valoir 1.",
                "Elles doivent forcement être au nombre de 2, un arbre à 3 branches ça n'existe pas."
              ],
              correctAnswer: 1,
              explanation: "L'univers complet d'un jeu de probabilité vaut toujours 1. Que tu le coupes en 2, 3 ou 15 branches, la somme des branches d'un même nœud fera toujours 1."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais traduire un énoncé français en notation mathématique : P_A(B) ou P(A ∩ B).",
            "Je sais que 'multiplier les branches' permet de trouver le 'ET' (l'intersection).",
            "Je connais la formule pour inverser un arbre (Formule de Bayes cachée).",
            "Je sais prouver l'indépendance avec : P(A ∩ B) = P(A) × P(B)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Premiere_07_Proba_Conditionnelles;
