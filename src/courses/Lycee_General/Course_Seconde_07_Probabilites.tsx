import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Seconde_07_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [pA, setPA] = useState<number>(0.5);
  const [pB, setPB] = useState<number>(0.4);
  const [pAinterB, setPAinterB] = useState<number>(0.1);

  const pAunionB = (pA + pB - pAinterB).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-PROB"
        title="Probabilités"
        subtitle="Dompter le hasard avec des arbres, des tableaux et des formules de logique."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Est-ce qu'on est sûr ?" icon="🎲" color="emerald">
        <p>
          Le monde n'est pas fait que de certitudes. Est-ce qu'il va pleuvoir demain ? Est-ce que cette pièce va tomber sur Pile ? C'est le royaume de l'aléatoire.
        </p>
        <p className="mt-2">
          Les probabilités permettent de mesurer scientifiquement la chance qu'un événement se produise. C'est la base des jeux d'argent, des assurances, de la météo et même de l'intelligence artificielle !
        </p>
        
        <InfoBlock type="definition" title="Le Vocabulaire du Hasard">
          - <strong>L'Univers (noté Ω) :</strong> La liste de TOUTES les issues possibles. (Ex: pour un dé, Ω = {"{"}1, 2, 3, 4, 5, 6{"}"}).<br/>
          - <strong>L'Événement :</strong> Un sous-ensemble de l'univers. (Ex: A = "Faire un nombre pair" = {"{"}2, 4, 6{"}"}).<br/>
          - <strong>Événement Élémentaire :</strong> Un événement qui ne contient qu'UNE SEULE issue. (Ex: "Faire un 3").
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Loi de base (Équiprobabilité)" icon="⚖️" color="indigo">
        <p className="mb-4">
          Quand le dé est "non pipé", toutes les faces ont la même chance de sortir. C'est ce qu'on appelle la situation d'<strong>équiprobabilité</strong>.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl text-center mb-6">
          <p className="font-mono text-xl font-bold text-indigo-900 dark:text-indigo-100">
            {"P(A) = \\frac{\\text{Nombre d'issues favorables à A}}{\\text{Nombre TOTAL d'issues dans Ω}}"}
          </p>
          <p className="text-sm mt-2 text-indigo-700 dark:text-indigo-300">La probabilité est TOUJOURS un nombre compris entre 0 et 1 (ou 0% et 100%).</p>
        </div>

        <Accordion title="Et si P(A) = 0 ? Et si P(A) = 1 ?">
          <div className="p-4 bg-white border border-slate-100 dark:border-slate-800/60 rounded-xl">
            <p className="mb-2">Si P(A) = 0 : L'événement est <strong>impossible</strong>. (Ex: Faire 7 avec un dé à 6 faces).</p>
            <p>Si P(A) = 1 : L'événement est <strong>certain</strong>. (Ex: Faire un nombre inférieur à 10).</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🛠️ Le Chasseur d'Intersections (A ∩ B et A ∪ B)" icon="🔗" color="amber">
        <p className="mb-4">
          C'est LE truc de Seconde. Les mots 'ET' et 'OU' se traduisent en mathématiques par des symboles spéciaux (∩ et ∪) qui ont une formule bien précise.
        </p>
        
        <div className="bg-slate-50/50 dark:bg-slate-900/20 border-2 border-slate-100 dark:border-slate-800/60 p-6 rounded-2xl shadow-sm md:text-center">
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">P(A) = {pA}</span>
              <input type="range" min="0" max="1" step="0.1" value={pA} onChange={(e) => setPA(parseFloat(e.target.value))} className="accent-indigo-500 w-32" />
            </label>
            <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">P(B) = {pB}</span>
              <input type="range" min="0" max="1" step="0.1" value={pB} onChange={(e) => setPB(parseFloat(e.target.value))} className="accent-rose-500 w-32" />
            </label>
            <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">P(A ∩ B) = {pAinterB}</span>
              <input type="range" min="0" max={Math.min(pA, pB)} step="0.1" value={pAinterB} onChange={(e) => setPAinterB(parseFloat(e.target.value))} className="accent-amber-500 w-32" />
              <span className="text-xs text-slate-500 max-w-[120px]">(L'intersection ne peut dépasser au max que le plus petit de A ou B)</span>
            </label>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/60">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wider text-sm mb-2">Calcul de l'Union : P(A ∪ B)</h4>
            <div className="font-mono text-lg mb-2 text-emerald-950 dark:text-emerald-50">
              <p>Formule : P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
              <p className="font-bold border-t border-emerald-300 pt-2 mt-2">
                P(A ∪ B) = {pA} + {pB} - {pAinterB} = {pAunionB}
              </p>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">Pourquoi on soustrait l'intersection ? Parce qu'en faisant P(A) + P(B), on a compté la zone commune (le "ET") <strong>deux fois</strong> ! Donc il faut en enlever un.</p>
          </div>
        </div>
      </Section>

      <Section title="📜 Les Diagrammes Salvador" icon="⚡" color="rose">
        <p className="mb-4">Pour aider le cerveau à voir ces ensembles, on dessine souvent des 'patates' (les diagrammes de Venn).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="A ∩ B (Intersection)" 
            formula={<>Le <strong>ET</strong>.<br/><span className="text-sm font-normal">C'est la zone où les deux patates A et B se chevauchent. La condition doit être vraie pour les DEUX !</span></>} 
          />
          <FormulaBox 
            title="A ∪ B (Union)" 
            formula={<>Le <strong>OU</strong>.<br/><span className="text-sm font-normal">C'est TOUTE la surface de la patate A + TOUTE la surface de la patate B (fusion). (Même si on a les deux, ça passe !)</span></>} 
          />
        </div>
      </Section>

      <Section title="🧠 Événements Contraires et Incompatibles" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>C'est quoi <strong>l'Événement Contraire</strong> (noté <span className="overline">A</span>) ?</>}
            back={<>C'est exactement l'opposé : "A ne se réalise pas".<br/>Et on le calcule hyper facilement : <strong>P(<span className="overline">A</span>) = 1 - P(A)</strong>.</>}
          />
          <Flashcard 
            front={<>C'est quoi <strong>Deux événements Incompatibles</strong> ?</>}
            back={<>Ils ne peuvent JAMAIS se produire en même temps (ex: "Faire un nombre pair" et "Faire 3").<br/>Donc <strong>P(A ∩ B) = 0</strong> !</>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Logique" icon="🕹️" color="slate">
        <p className="mb-4">Démêle ce petit problème de probabilités :</p>
        <FillInTheBlanks 
          id="prob-eval"
          content={[
            "Dans une classe, 30% des élèves aiment le Basket (B), 50% aiment le Foot (F). Si 10% aiment les DEUX, l'intersection P(B ∩ F) vaut ",
            { options: ["0.1", "0.8", "0.2"], correctAnswer: 0 },
            ". Je veux calculer P(B ∪ F), c'est-à-dire ceux qui aiment l'un OU l'autre. J'applique la formule : 0.3 + 0.5 - ",
            { options: ["0", "0.1", "0.8"], correctAnswer: 1 },
            " ce qui fait 0.7. Et la probabilité de l'événement contraire 'N'aime ni l'un ni l'autre' est 1 - 0.7 = ",
            { options: ["0.3", "0", "0.7"], correctAnswer: 0 },
            ". Trop facile."
          ]}
        />
      </Section>

      <Section title="8. Atelier de Devoir (Exercice Interactif)" icon="Brain" color="indigo">
        <InteractiveExercise 
          title="Le tirage du jeu de cartes"
          question="Dans un jeu de 32 cartes, on tire une carte. Soit A 'Tirer un cœur' et B 'Tirer un Roi'. Calcule $P(A \\cup B)$."
          steps={[
            <><strong>Étape 1 :</strong> Calculer <MathComponent math={"P(A)"} />. Il y a 8 cœurs sur 32. Donc $P(A) = \\frac{8}{32}$.</>,
            <><strong>Étape 2 :</strong> Calculer <MathComponent math={"P(B)"} />. Il y a 4 Rois. Donc $P(B) = \\frac{4}{32}$.</>,
            <><strong>Étape 3 :</strong> Calculer <MathComponent math={"P(A \\cap B)"} />. L'intersection, c'est 'Le Roi de cœur'. Il y en a 1 seul. Donc $P(A \\cap B) = \\frac{1}{32}$.</>,
            <><strong>Étape finale :</strong> $P(A \\cup B) = \\frac{8}{32} + \\frac{4}{32} - \\frac{1}{32} = \\frac{11}{32}$.</>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la probabilité d'obtenir un 'Roi' en tirant 1 carte dans un jeu de 32 (il y a 4 Rois) ?",
              options: [
                "1/32",
                "4/32 (donc 1/8)",
                "4/1"
              ],
              correctAnswer: 1,
              explanation: "Nombre de cas favorables (4 rois) divisé par le nombre total de possibilités (32 cartes). 4/32, qu'on peut simplifier en 1/8."
            },
            {
              question: "Si P(A) = 0.6 et P(B) = 0.3. Et que A et B sont incompatibles. Que vaut P(A ∪ B) ?",
              options: [
                "0.9",
                "0.18",
                "Impossible à savoir."
              ],
              correctAnswer: 0,
              explanation: "Comme ils sont incompatibles, P(A ∩ B) = 0. La formule dit P(A ∪ B) = P(A) + P(B) - P(A ∩ B), donc 0.6 + 0.3 - 0 = 0.9 ! Magique."
            },
            {
              question: "Le symbole ∩ se lit comment dans une phrase mathématique ?",
              options: [
                "OU (l'Union)",
                "ET (l'Intersection)",
                "MOINS (la Soustraction)"
              ],
              correctAnswer: 1,
              explanation: "Le chapeau à l'envers (∩) c'est le 'ET'. Le chapeau en U (∪) c'est le 'OU'."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "P(Univers) = 1 et la somme des probas de tous les événements élémentaires fait 1.",
            "Je connais la formule de l'événement contraire : P(non_A) = 1 - P(A).",
            "Je connais la formule sacrée : P(A ∪ B) = P(A) + P(B) - P(A ∩ B).",
            "Je traduis 'ET' par l'Intersection (∩) et 'OU' par l'Union (∪)."
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

export default Course_Seconde_07_Probabilites;
