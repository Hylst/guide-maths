import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_07_Loi_Binomiale: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [n, setN] = useState<number>(10);
  const [p, setP] = useState<number>(0.5);
  
  const esperance = (n * p).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-BINO"
        title="Loi Binomiale & Grands Nombres"
        subtitle="Modéliser le succès, l'échec et la répétition pour prédire l'avenir."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : Succès ou Échec" icon="🎲" color="emerald">
        <p>
          Il y a des situations dans la vie qui sont binaires : Je gagne ou je perds. Je touche la cible ou je la rate. Pile ou Face. C'est ce qu'on appelle une <strong>Épreuve de Bernoulli</strong>.
        </p>
        <p className="mt-2">
          Si on répète cette épreuve 'n' fois, de manière totalement indépendante (le résultat du 1er tir ne change pas la proba du 2ème), on entre dans le royaume mythique de la <strong>Loi Binomiale</strong>.
        </p>
      </Section>

      <Section title="⚖️ La Formule Monstrueuse" icon="👹" color="indigo">
        <p className="mb-4">
          Combien j'ai de chances de faire EXACTEMENT 3 Faces si je lance une pièce 10 fois ? La calculette le fait, mais la formule explique tout.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl text-center mb-6">
          <p className="font-mono text-xl text-indigo-900 dark:text-indigo-100">
            {"P(X = k) = "} <span className="font-bold">{"\\binom{n}{k}"}</span> × <span className="text-emerald-700 dark:text-emerald-300">{"p^k"}</span> × <span className="text-rose-700 dark:text-rose-300">{"(1-p)^{n-k}"}</span>
          </p>
        </div>

        <ul className="space-y-4">
          <li className="flex gap-2">
            <span className="bg-emerald-100 text-emerald-900 dark:text-emerald-100 px-2 rounded font-mono font-bold">{"p^k"}</span>
            <span>La probabilité d'obtenir les 'k' succès.</span>
          </li>
          <li className="flex gap-2">
            <span className="bg-rose-100 text-rose-900 dark:text-rose-100 px-2 rounded font-mono font-bold">{"(1-p)^{n-k}"}</span>
            <span>La probabilité de subir les échecs restants.</span>
          </li>
          <li className="flex gap-2">
            <span className="bg-slate-200 text-slate-900 dark:text-slate-100 px-2 rounded font-mono font-bold">{"\\binom{n}{k}"}</span>
            <span>Le coefficient binomial. Il compte sur combien de branches de l'arbre tes 3 succès peuvent se répartir !</span>
          </li>
        </ul>
      </Section>

      <Section title="🛠️ Calculateurs d'Espérance" icon="🎯" color="amber">
        <p className="mb-4">
          L'Espérance (E(X)), c'est la moyenne ! "Si je répète l'expérience des millions de fois, en moyenne je gagne combien ?"
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center gap-8 mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Nombre d'essais (n) = {n}</span>
              <input type="range" min="1" max="100" step="1" value={n} onChange={(e) => setN(parseInt(e.target.value))} className="accent-amber-500 w-32" />
            </label>
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Proba de Succès (p) = {p}</span>
              <input type="range" min="0.01" max="0.99" step="0.01" value={p} onChange={(e) => setP(parseFloat(e.target.value))} className="accent-rose-500 w-32" />
            </label>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60 inline-block text-left relative overflow-hidden">
            <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Espérance de X (La Moyenne)</span>
            <div className="font-mono text-xl text-emerald-950 dark:text-emerald-50 font-bold mb-2">
              E(X) = n × p
            </div>
            <div className="font-mono text-2xl text-emerald-950 dark:text-emerald-50 font-bold mt-2 pt-2 border-t border-emerald-300">
              E(X) = {esperance} succès.
            </div>
          </div>
        </div>
      </Section>

      <Section title="📜 La Loi des Grands Nombres" icon="🧠" color="rose">
        <p className="mb-4">Si je lance un dé 6 fois, je n'aurais sans doute pas exactement une fois chaque face. Par contre, si je lance ce pauvre dé 6 Milliards de fois...</p>
        
        <div className="bg-card p-4 border border-rose-100 dark:border-rose-800/60 rounded-xl">
          <p className="font-bold text-rose-900 dark:text-rose-100">Théorème (vulgarisé) :</p>
          <p className="text-slate-700 dark:text-slate-300 mt-2">Plus tu répètes une expérience aléatoire (n grand), plus la <strong>fréquence observée</strong> d'un événement se rapproche inexorablement de la <strong>probabilité théorique</strong> de cet événement.</p>
          <p className="mt-2 text-sm text-slate-500 italic">C'est grâce à cette loi que les Casinos font fortune de manière prévisible, malgré le hasard individuel de chaque joueur !</p>
        </div>
      </Section>
      
      <Section title="🧠 Cartes Flash (Synthèse)" icon="⚡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelles sont les conditions de la Loi Binomiale ?</>}
            back={<>1. Épreuve de Bernoulli (2 issues : Succès/Échec).<br/>2. Répétée "n" fois.<br/>3. De manière indépendante et identique.</>}
          />
          <Flashcard 
            front={<>Formule de la Variance de la Loi Binomiale ?</>}
            back={<><><MathComponent math={"V(X) = n \\times p \\times (1 - p)"} /></>.</>}
          />
        </div>
        <div className="mt-4">
          <TipBanner type="info" title="L'usage de la calculatrice">
            La formule de probabilité (P(X=k)) est sublime, mais pour P(X ≤ k), il faut additionner toutes les probabilités de 0 à k. Heureusement, c'est ce que fait la fonction <strong>BinomialFRép</strong> (ou BinomCD) de la calculatrice !
          </TipBanner>
        </div>
      </Section>
      
      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Le Tireur d'Élite"
          question={<p>Un tireur a 80% de chance d'atteindre sa cible (p=0.8). Il tire 5 fois (n=5). Comment modéliser sa probabilité de toucher exactement 3 cibles ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Identifier X</p>
              <p>On note <><MathComponent math={"X"} /></> le nombre de cibles atteintes. <><MathComponent math={"X"} /></> suit une loi binomiale <><MathComponent math={"\\mathcal{B}(5, 0.8)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer la formule brutale</p>
              <p>On cherche <><MathComponent math={"P(X=3)"} /></>. La formule dit : <><MathComponent math={"\\binom{n}{k} \\times p^k \\times (1-p)^{n-k}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"\\binom{5}{3} \\times 0.8^3 \\times (1-0.8)^{5-3}"} /></> <br/>Soit <><MathComponent math={"10 \\times 0.8^3 \\times 0.2^2 \\approx 0.2048"} /></> (soit <><MathComponent math={"20.48\\%"} /></> de chance !)</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : La notion de 'Au moins une fois'"
          question={<p>Une machine a <><MathComponent math={"10\\%"} /></> de chance de tomber en panne chaque jour. Sur 5 jours, comment calculer la probabilité qu'elle tombe en panne au moins 1 fois ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser "Au moins 1"</p>
              <p>Calculer <><MathComponent math={"P(X \\ge 1)"} /></> c'est long, car c'est <><MathComponent math={"P(X=1) + P(X=2) + P(X=3) + ..."} /></></p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'astuce de l'événement contraire</p>
              <p>Le contraire de "au moins une fois", c'est <strong>"Zéro fois !"</strong>. On peut donc utiliser <><MathComponent math={"1 - P(X=0)"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"P(X=0)"} /></> c'est que des échecs (que des jours sans panne). La probabilité de 0 panne c'est <><MathComponent math={"0.9^5"} /></>. <br/>Donc la probabilité d'au moins 1 panne est <><MathComponent math={"1 - 0.9^5 \\approx 1 - 0.590 = 0.410"} /></> (soit <><MathComponent math={"41\\%"} /></>).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Pour utiliser une Loi Binomiale B(n, p), de quoi doit-on être certain concernant les 'n' épreuves ?",
              options: [
                "Qu'elles sont Dépendantes les unes des autres.",
                "Qu'elles sont Indépendantes et Identiques.",
                "Qu'il n'y en a que 2 au maximum."
              ],
              correctAnswer: 1,
              explanation: "Règle de fer ! Si tirer une carte rouge empêche d'en tirer une autre au tour suivant (Tirage Sans Remise), l'épreuve a changé, les probas ont bougé, donc ce N'EST PLUS une loi Binomiale."
            },
            {
              question: "Si X suit B(20 ; 0.5), quelle est l'Espérance ?",
              options: [
                "20",
                "10",
                "0.5"
              ],
              correctAnswer: 1,
              explanation: "E(X) = n × p. Donc 20 × 0.5 = 10. (Si tu lances 20 pièces, tu auras en moyenne 10 Piles, c'est logique !)"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais justifier le modèle : Répétition, n fois, Indépendant, 2 issues p et 1-p.",
            "L'Espérance, c'est bêtement n multiplié par p.",
            "Je sais me servir de la calculatrice pour trouver P(X=k) ou P(X≤k)."
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

export default Course_Terminale_07_Loi_Binomiale;
