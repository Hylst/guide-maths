import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, Accordion, InteractiveExercise 
} from '../components/SharedUI';

const Course_5eme_12_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRolls(prev => [...prev, roll]);
  };

  const getStats = (target: number) => {
    if (diceRolls.length === 0) return 0;
    const count = diceRolls.filter(r => r === target).length;
    return ((count / diceRolls.length) * 100).toFixed(1);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PRB"
        title="Probabilités"
        subtitle="Dompter le hasard et prévoir l'imprévisible."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : L'Empire du Hasard" icon="🎲" color="rose">
        <p>
          Il y a des choses dont on est sûr (le soleil se lèvera demain) et des choses impossibles (un cochon va voler). Mais entre les deux, il y a l'immense océan du <strong>Hasard</strong>.
        </p>
        <p className="mt-2">
          Les probabilités, c'est la branche des mathématiques qui essaie de mesurer, de calculer et de prédire la <strong>chance qu'un événement se produise</strong>.
        </p>
        
        <InfoBlock type="definition" title="L'Échelle des Probabilités">
          Une probabilité fonctionne TOUJOURS sur une échelle stricte et fermée : <br/>
          - <strong>0</strong> : L'événement est <em>Impossible</em>.<br/>
          - <strong>1</strong> : L'événement est <em>Certain</em> (100%).<br/>
          - <strong>Entre 0 et 1</strong> : C'est probable. Souvent sous forme de fraction (1/2, 1/6) ou de pourcentage (50%).<br/>
          <strong>ATTENTION : Une probabilité de 1,5 N'EXISTE PAS.</strong>
        </InfoBlock>
      </Section>

      <Section title="⚖️ Événements et Issues" icon="🎯" color="indigo">
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 rounded-2xl p-6 text-slate-700 dark:text-slate-300">
          <p className="font-medium mb-4">Quand on lance un dé classique à 6 faces, qu'est-ce qui peut arriver ?</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>L'Univers (les issues possibles) :</strong> Il y a 6 issues (1, 2, 3, 4, 5, 6).</li>
            <li><strong>L'Événement :</strong> Une condition précise qu'on surveille. Par exemple, "Obtenir un nombre pair".</li>
            <li><strong>Obtenir la proba :</strong> Combien de faces sont paires ? (2, 4, 6) soit 3 faces sur les 6 possibles.</li>
          </ul>
          <div className="mt-6 p-4 bg-card rounded-xl font-mono text-center text-lg text-indigo-950 dark:text-indigo-50 border border-indigo-100 shadow-sm">
            Proba(Pair) = 3 / 6 = 1 / 2 = <strong>0,5</strong> (soit 50%)
          </div>
        </div>
      </Section>

      <Section title="⚙️ Le Simulateur de Réalité" icon="💻" color="emerald">
        <p className="mb-4">
          La <em>théorie</em> dit qu'on a exactement 1 chance sur 6 (soit environ 16.6%) de tomber sur la face "6". Mais que dit la <em>pratique</em> quand on lance vraiment les dés ?
        </p>
        <div className="bg-card border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <button 
            onClick={rollDice}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-transform active:scale-95 mb-6"
          >
            Lancer le Dé 🎲
          </button>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[3rem]">
            {diceRolls.slice(-10).map((r, i) => (
              <span key={i} className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-300 rounded font-bold text-lg">
                {r}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[1,2,3,4,5,6].map(face => (
              <div key={face} className="bg-muted p-2 rounded border">
                Face {face} : <strong className="text-indigo-600 dark:text-indigo-400">{getStats(face)}%</strong>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Total de lancers : {diceRolls.length}. Note comme l'expérience réelle s'approche doucement des 16.6% théoriques si tu lances beaucoup de fois (Loi des Grands Nombres).
          </p>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : La Loterie du Casier"
          question={<p>Dans une classe, il y a 10 casiers. 3 sont peints en rouge, et 7 sont peints en bleu. Tu choisis un casier au hasard, les yeux fermés. Quelle est la probabilité que tu choisisses un casier rouge ? Et un casier bleu ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le calcul total</p>
              <p>Il y a 10 casiers au total. Donc le diviseur de notre fraction sera toujours 10.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Les cas favorables</p>
              <p>Il y a 3 casiers rouges. Donc la probabilité pour le rouge est 3 / 10.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La probabilité de tirer un rouge est de 3/10 (ou 0.3 ou 30%). La probabilité de tirer un bleu est de 7/10 (ou 0.7 ou 70%). Note bien que 0.3 + 0.7 = 1 ! L'univers est complet.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes de Parieur" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si un événement à une probabilité de <strong>0</strong>, comment s'appelle-t-il ?</>}
            back={<>Un événement <strong>impossible</strong>. (Ex: Tirer un 7 sur un dé classique).</>}
          />
          <Flashcard 
            front={<>Que vaut la somme des probabilités de <strong>toutes les issues possibles</strong> d'une expérience ?</>}
            back={<><strong>Exactement 1</strong>. (100% au total). Si je ne gagne pas, je perds. 0.3 + 0.7 = 1.</>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Chance" icon="🕹️" color="slate">
        <p className="mb-4">Voyons si tu es prêt(e) pour le casino (mathématique) :</p>
        <FillInTheBlanks 
          id="prb-eval"
          content={[
            "Dans un jeu de 32 cartes (sans joker), je veux tirer un As. Il y a 4 As dans le paquet. Donc la probabilité est la fraction ",
            { options: ["4/32", "1/32", "32/4"], correctAnswer: 0 },
            ". Si je simplifie cette fraction, j'obtiens exactement ",
            { options: ["1/4", "1/8", "1/2"], correctAnswer: 1 },
            ". D'un autre côté, je cherche à tirer une carte 'bleue'. Il n'y en a pas, c'est rouge ou noir. La probabilité est donc de ",
            { options: ["0", "1", "-1"], correctAnswer: 0 },
            ". Et on peut dire que l'événement de 'Tirer une carte noire OU rouge' a une probabilité de ",
            { options: ["0,5", "1", "0"], correctAnswer: 1 },
            ", c'est un événement certain !"
          ]}
        />
      </Section>

      <Section title="🎯 Le Pari Final" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si la probabilité qu'il pleuve demain est de 0,3. Quelle est la probabilité qu'il ne pleuve PAS demain ?",
              options: [
                "0,7",
                "1,3",
                "0"
              ],
              correctAnswer: 0,
              explanation: "Les deux événements 'Pleuvoir' et 'Ne pas pleuvoir' couvrent TOUT. Leur somme doit faire 1. 1 - 0,3 = 0,7."
            },
            {
              question: "On fait tourner une roue de loterie parfaite divisée en 5 couleurs égales. La couleur Rouge occupe 2 parts. Quelle est la proba de tomber sur Rouge ?",
              options: [
                "2/3",
                "2/5",
                "5/2"
              ],
              correctAnswer: 1,
              explanation: "Le nombre de parts favorables (2) divisé par le nombre TOTAL de parts (5). Soit 2/5."
            },
            {
              question: "Une probabilité peut-elle être négative (ex: -0,5) ?",
              options: [
                "Oui, si on a vraiment très peu de chances !",
                "Non, JAMAIS !"
              ],
              correctAnswer: 1,
              explanation: "Absolument impossible. Une probabilité est toujours 'enfermée' entre 0 (0%) et 1 (100%)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la règle d'or : une probabilité est toujours comprise entre 0 et 1.",
            "Je sais que Impossible = 0 et Certain = 1.",
            "Je sais calculer une proba simple : Nombre de cas favorables / Nombre de cas totaux.",
            "Je sais que la probabilité 'contraire' s'obtient en faisant : 1 - (Proba de l'événement initial)."
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

export default Course_5eme_12_Probabilites;
