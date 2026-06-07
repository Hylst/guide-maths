import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Terminale_06_Combinatoire: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [nVal, setNVal] = useState<number>(3);
  
  // Calculate n!
  let fact = 1;
  for(let i=1; i<=nVal; i++) fact *= i;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-COMB"
        title="Dénombrement & Combinatoire"
        subtitle="Apprendre à compter l'impossible : codes, mots de passes, et tirages de loto."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : L'art de compter" icon="🧮" color="emerald">
        <p>
          "Combien y a-t-il de grilles de Loto possibles ?" "Combien d'anagrammes avec les lettres du mot MATHS ?" En probabilités, pour utiliser la formule (Cas Purs / Cas Totaux), il faut savoir compter les cas totaux.
        </p>
        <p className="mt-2">
          Le dénombrement, c'est l'ensemble des techniques mathématiques pour trouver le nombre de combinaisons possibles sans avoir à toutes les lister à la main (parce que ça te prendrait 15 ans).
        </p>
        
        <InfoBlock type="definition" title="Le Point de Départ : L'Arbre de Choix">
          Si tu dois choisir 1 Entrée parmi 3, PUIS 1 Plat parmi 4, PUIS 1 Dessert parmi 2... Le nombre total de menus différents est le <strong>Produit</strong> des choix : 3 × 4 × 2 = 24.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Avec ou Sans Ordre ? Avec ou Sans Remise ?" icon="🔍" color="indigo">
        <p className="mb-4">
          C'est la SEULE question à se poser avant de faire un calcul.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300">1. L'Ordre compte-t-il ?</h4>
            <ul className="text-sm space-y-1 mt-2">
              <li>- Mot de passe (123 ≠ 321) 👉 <strong>OUI</strong>.</li>
              <li>- Podium de course (Or, Argent) 👉 <strong>OUI</strong>.</li>
              <li>- Poignée de bonbons 👉 <strong>NON</strong>.</li>
            </ul>
          </div>
          <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
            <h4 className="font-bold text-rose-700 dark:text-rose-300">2. Répétition possible ?</h4>
            <ul className="text-sm space-y-1 mt-2">
              <li>- Code de Cadenas (333 est possible) 👉 <strong>OUI</strong>.</li>
              <li>- Tirer des cartes sans les remettre 👉 <strong>NON</strong>.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="🛠️ La Factorielle (La Permutation) (n!)" icon="💥" color="amber">
        <p className="mb-4">
          Combien y a-t-il de files d'attente possibles avec 'n' personnes ? Le résultat s'appelle la Factorielle, notée 'n!'.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          
          <div className="flex justify-center mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Choisis n (nombre d'objets) = {nVal}</span>
              <input type="range" min="1" max="10" step="1" value={nVal} onChange={(e) => setNVal(parseInt(e.target.value))} className="accent-amber-500 w-48" />
            </label>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60 inline-block text-left relative overflow-hidden">
            <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Calcul de {nVal}!</span>
            <div className="font-mono text-xl text-emerald-950 dark:text-emerald-50 font-bold">
              {nVal}! = {fact.toLocaleString()} arrangements
            </div>
          </div>
          
          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
            {nVal > 7 && "Ça explose vite ! C'est ce qu'on appelle l'explosion combinatoire. C'est pour ça que les mots de passe longs sont durs à pirater."}
            {nVal <= 7 && "On multiplie tous les nombres de 1 jusqu'à n."}
          </p>
        </div>
      </Section>

      <Section title="📜 Le Grimoire des 4 Formules" icon="⚡" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="1. P-Listes (Répétibles, Ordre)" 
            math={"n^p"} 
          />
          <FormulaBox 
            title="2. Permutations (Tous les objets, Ordre)" 
            math={"n!"} 
          />
          <FormulaBox 
            title="3. Arrangements (Certains objets, Ordre)" 
            math={"\\frac{n!}{(n-p)!}"} 
          />
          <FormulaBox 
            title="4. Combinaisons (Rien à faire de l'ordre)" 
            math={"\\binom{n}{p} = \\frac{n!}{p!(n-p)!}"} 
          />
        </div>
        <div className="mt-4 text-sm bg-card p-3 border border-border rounded-lg">
          La <strong>Combinaison</strong> (notée 'n parmi p' en parenthèses géantes) est la plus importante ! C'est le Loto, le Poker, la poignée de mains. On enlève l'ordre, donc on divise l'arrangement par p!.
        </div>
      </Section>

      <Section title="🧠 P-Liste ou Combinaison ?" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le digicode d'un immeuble contient 4 chiffres (de 0 à 9). Quelle formule ?</>}
            back={<><strong>P-Liste (n^p)</strong>.<br/>L'ordre est vital, et je peux répéter le même chiffre ! L'univers a n=10 choix possibles, tirés p=4 fois. Résultat = 10⁴ = 10 000 codes.</>}
          />
          <Flashcard 
            front={<>Le prof choisit 3 élèves au hasard dans une classe de 30 pour effacer le tableau. Quelle formule ?</>}
            back={<><strong>La Combinaison ! (n parmi p)</strong>.<br/>On ne peut pas choisir deux fois le même élève, et l'ordre dans lequel on les appelle ne change rien au groupe choisi !</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Codes de carte bleue"
          question={<p>Combien existe-t-il de codes de carte bleue (4 chiffres) commençant par 9 ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser les contraintes</p>
              <p>Le 1er chiffre est bloqué (c'est un 9), donc j'ai 1 seul choix pour cette position.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Analyser les autres positions</p>
              <p>Pour les 3 autres chiffres, il n'y a aucune contrainte. L'ordre compte et la répétition est possible (ex: 9333 est valide). J'ai 10 choix (de 0 à 9) pour chacun des 3 chiffres restants.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"1 \\times 10 \\times 10 \\times 10 = 1000"} /></> codes ! (C'est en fait tous les nombres de 9000 à 9999).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Tirage au sort de l'ordre de passage"
          question={<p>Le prof doit interroger 4 élèves choisis parmi 20, et veut faire la liste de leur ordre de passage au tableau. Combien y-a-t-il de listes de passage possibles ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : L'ordre ou pas ?</p>
              <p>Oui, l'ordre compte : passer 1er ou 4ème à l'oral, ce n'est pas la même angoisse !</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Répétition ou pas ?</p>
              <p>Non, on n'interroge pas le même élève deux fois. C'est un Arrangement : on choisit et on ordonne !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On a 20 choix pour le 1er, puis 19 pour le 2ème, 18 pour le 3ème et 17 pour le dernier. Le calcul est <><MathComponent math={"20 \\times 19 \\times 18 \\times 17 = 116 280"} /></> listes possibles !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Simulateur d'Enquête" icon="🕹️" color="slate">
        <p className="mb-4">Identifie la bonne méthode :</p>
        <FillInTheBlanks 
          id="comb-eval"
          content={[
            "Il y a 8 coureurs dans une course d'athlétisme. On veut connaître le nombre de podiums possibles (les 3 gagnants : Or, Argent, Bronze). L'ordre compte ? ",
            { options: ["Oui (Or ≠ Bronze)", "Non"], correctAnswer: 0 },
            ". Est-ce qu'on peut répéter le même coureur ? ",
            { options: ["Oui", "Non (Il ne peut pas être à la fois Or et Argent)"], correctAnswer: 1 },
            ". Il s'agit donc d'un ",
            { options: ["Arrangement (A)", "P-liste", "Combinaison (C)"], correctAnswer: 0 },
            ". Le calcul est simple : on choisit le premier (8 choix) × le deuxième (",
            { options: ["8", "7", "6"], correctAnswer: 1 },
            " choix) × le troisième (6 choix). Soit 8 × 7 × 6 = 336 podiums !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Que vaut conventionnellement Zéro Factorielle (0!) ?",
              options: [
                "0",
                "1",
                "-1"
              ],
              correctAnswer: 1,
              explanation: "Par convention mathématique internationale (et pour que les formules d'arrangements ne divisent pas par zéro), 0! = 1. (Il y a 1 seule façon de ranger 0 objet : c'est de ne rien faire)."
            },
            {
              question: "Si j'ai 5 livres différents et que je veux les ranger sur une étagère. Combien de rangements possibles ?",
              options: [
                "5! (soit 120)",
                "5^5 (soit 3125)",
                "25"
              ],
              correctAnswer: 0,
              explanation: "Je range TOUS mes objets, l'ordre compte. C'est une Permutation ! 5! = 5 × 4 × 3 × 2 × 1 = 120."
            },
            {
              question: "Combien y-t-il de combinaisons pour élire deux délégués dans une classe de 10 personnes ?",
              options: [
                "10 × 9 = 90",
                "(10 × 9) / 2 = 45",
                "10² = 100"
              ],
              correctAnswer: 1,
              explanation: "Il y a 10×9 = 90 binômes. M attention : déléguer [Alice et Bob] c'est pareil que [Bob et Alice] ! Du coup, on compte chaque paire 2 fois en trop. Il faut diviser par 2! (soit 2). Donc 45 paires."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Répétition OUI + Ordre OUI = Puissance (n^p)",
            "Répétition NON + Ordre OUI = Factorielle (n!) ou Arrangement",
            "Répétition NON + Ordre NON = Combinaison (k parmi n)",
            "Ne jamais essayer de tout dessiner quand n > 4 !!"
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

export default Course_Terminale_06_Combinatoire;
