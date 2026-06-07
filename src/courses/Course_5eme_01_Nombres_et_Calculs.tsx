import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  StepList, InteractiveExercise, Flashcard
} from '../components/SharedUI';

const Course_5eme_01_Nombres_et_Calculs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-INTRO"
        title="Nombres et Calculs (Introduction)"
        subtitle="L'Arsenal : Comprendre comment forger les nombres pour survivre dans la Matrice."
        duration="15 min"
      />

      <Section title="🌍 Le Code Source de l'Univers" icon="🚀" color="indigo">
        <p>
          Le calcul n'est pas un banal jeu d'enfants : c'est la <strong>colonne vertébrale</strong> qui maintient l'Univers ! En 5ème, la difficulté monte : tu quittes le petit village des nombres tout mignons pour plonger dans l'abysse profond des mathématiques !
        </p>
        <p className="mt-4">
          Dans ce thème, tu vas acquérir <strong>L'Arsenal</strong> nécessaire pour affronter le programme du cycle 4 :
        </p>
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 rounded-xl p-6 mt-6 shadow-inner">
          <ul className="space-y-3 font-medium text-indigo-950 dark:text-indigo-50">
            <li className="flex items-center gap-2"><span className="text-xl">🛡️</span> <strong>Les Priorités Opératoires :</strong> Le code de Survie Absolu ou comment ne pas exploser la matrice !</li>
            <li className="flex items-center gap-2"><span className="text-xl">🌌</span> <strong>Les Nombres Relatifs :</strong> Le portail sous le Zéro qui ouvre vers l'infinité des températures et des dettes !</li>
            <li className="flex items-center gap-2"><span className="text-xl">🍕</span> <strong>Les Fractions :</strong> L'art divin et chirurgical de partager précisément un trésor !</li>
            <li className="flex items-center gap-2"><span className="text-xl">🪄</span> <strong>Calcul Littéral :</strong> L'invocation de formules universelles à l'aide des LETTRES magiques !</li>
          </ul>
        </div>
      </Section>

      <Section title="🛠 Les Piliers du calcul de Survie" icon="🏛️" color="slate">
        <StepList>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. La Loi de L'Ordre</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On ne calcule jamais au hasard ! Les parenthèses sont héroïques, suivies par la Multiplication et la Division. Sans cette rigueur, rien n'a de sens !
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. Le Grimoire des Lettres</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Utiliser des LETTRES (comme <i>x</i>) n'est pas pour compliquer les choses, c'est le passage d'une valeur isolée à une <strong>Formule Magique</strong> qui survivra à tous les nombres !
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">3. Au-delà du Zéro</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Les larmes du ciel, les dettes bancaires, les températures glaciales en Sibérie... Le monde ne s'arrête pas à la frontière du Zéro. Il y a un miroir parfait de l'autre côté !
            </p>
          </div>
        </StepList>

        <InfoBlock type="funfact" title="Le Père Fondateur">
          Le Savant Perse <strong>Al-Khwarizmi</strong> (780 - 850) est le grand-père de l'Algèbre ! C'est d'ailleurs de son propre nom qu'est dérivé le super-mot <strong>"Algorithme"</strong> que l'on utilise partout en informatique !
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Évaluation d'une situation"
          question={<p>Dans une expression contenant uniquement des additions et des multiplications, et SANS parenthèses, par quelle opération dois-tu TOUJOURS commencer ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Réflexion</p>
              <p>Rappelle-toi la hiérarchie des opérations. Certaines sont prioritaires sur d'autres car elles sont plus "fortes".</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'élimination</p>
              <p>L'addition est l'opération de base. La multiplication, c'est comme une super-addition. Elle domine !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Il faut toujours commencer par la MULTIPLICATION ! C'est LA règle d'or pour survivre au calcul sans parenthèses.</p>
            </div>
          ]}
        />
        
        <InteractiveExercise
          title="Exercice 2 : Reconnaître le bon domaine"
          question={<p>Comment appelle-t-on la branche des mathématiques qui consiste à utiliser des lettres à la place des nombres pour écrire des formules générales ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Les indices</p>
              <p>Tu vas l'utiliser énormément pour résoudre des équations plus tard !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : C'est le Calcul Littéral (on dit aussi l'Algèbre) ! "Littéral" parce que cela vient de "Lettre".</p>
            </div>
          ]}
        />
      </Section>
      
      <Section title="🧠 Flashcards : Le Savoir Condensé" icon="⚡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard
            front={<div className="text-2xl font-bold">Le Zéro</div>}
            back={<div className="text-xl">La porte qui sépare les Nombres Positifs des Nombres Négatifs.</div>}
          />
          <Flashcard
            front={<div className="text-2xl font-bold">La Lettre 'x'</div>}
            back={<div className="text-xl">L'inconnue magique qui permet d'écrire des équations dans le Calcul Littéral !</div>}
          />
        </div>
      </Section>

      <Section title="🎯 Avant de plonger..." icon="🎮" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si ton petit frère te dit : 'De toute façon rien n'existe en dessous de zéro !' :",
              options: [
                "Il a raison, on ne peut pas avoir moins de zéro pomme dans sa poche.",
                "C'est faux ! Le royaume NÉGATIF existe pour mesurer la dette, les altitudes sous la mer ou la température !"
              ],
              correctAnswer: 1,
              explanation: "Exact ! Le zéro n'est plus un mur infranchissable, mais une simple porte vers l'autre côté. Tu vas bientôt apprendre à dompter les Nombres Relatifs."
            },
            {
              question: "La Multiplication est-elle un boss plus fort que l'Addition ?",
              options: [
                "Oui, elle frappe prioritairement au cours d'un combat mathématique sans parenthèse.",
                "Non, on les calcule de gauche à droite toutes confondues."
              ],
              correctAnswer: 0,
              explanation: "Absolument ! La multiplication est une addition répétée en boucle et sur-vitaminée : elle l'emporte toujours (si les parenthèses n'interviennent pas pour l'en empêcher) !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "J'ai compris que l'enjeu principal en 5ème est d'étendre mes pouvoirs de calcul.",
            "Je sais que les nombres peuvent exister sous le zéro.",
            "Je suis prêt à invoquer la magie des lettres avec le futur calcul littéral."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider l'Introduction (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_01_Nombres_et_Calculs;
