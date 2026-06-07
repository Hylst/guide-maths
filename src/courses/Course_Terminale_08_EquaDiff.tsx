import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Terminale_08_EquaDiff: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-DIFF"
        title="Équations Différentielles"
        subtitle="Quand la fonction et sa propre dérivée sont mélangées dans une même équation."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Trouver qui je suis" icon="🕵️" color="emerald">
        <p>
          Au collège, on cherche un nombre 'x' (ex: $2x = 8$ 👉 $x = 4$). Ici, l'inconnue n'est pas un nombre... C'est <strong>une Fonction ($y$) entière !</strong>
        </p>
        <p className="mt-2">
          Une Équation Différentielle relie une fonction $y$ (la position) à sa dérivée $y'$ (la vitesse). C'est le Graal de la physique pour calculer la chute d'un parachute, ou la décharge d'un condensateur.
        </p>
        
        <InfoBlock type="definition" title="Le But du Jeu">
          Résoudre <strong>$y' = 5y$</strong> signifie : "Trouvez-moi l'identité secrète de la fonction $y$, sachant que quand on la dérive, elle devient exactement 5 fois plus grande !"
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Formule Fondamentale y' = ay + b" icon="📐" color="indigo">
        <p className="mb-4">
          C'est la plus grande forme d'équation au lycée, et la solution est une formule par cœur, qui fait TOUJOURS appel à l'exponentielle (car c'est la seule fonction dont la dérivée lui ressemble).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Type 1 : $y' = ay$" 
            math={"y(t) = C \\times e^{at}"} 
          />
          <FormulaBox 
            title="Type 2 : $y' = ay + b$" 
            math={"y(t) = C \\times e^{at} - \\frac{b}{a}"} 
          />
        </div>
        <div className="mt-4 p-4 border border-rose-100 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl text-rose-950 dark:text-rose-50 text-sm">
          <strong>C'est quoi ce "C" magique ?</strong> $C$ est la "Constante d'intégration" (un nombre aléatoire). L'équation admet donc une *infinité* de fonctions solutions possibles. Pour fixer $C$ et trouver THE solution unique, la physique doit donner une <strong>Condition Initiale</strong> (ex: "Au départ, à l'instant $t=0$, la température $y$ vaut 20°C").
        </div>
      </Section>

      <Section title="🧠 Condition Initiale : Fixer la constante" icon="🔦" color="purple">
         <div className="grid grid-cols-1 gap-4">
          <Flashcard 
            front={<>J'ai trouvé la solution générale <span className="font-mono text-indigo-200 dark:text-indigo-400"><MathComponent math="y(t) = C e^{2t} - 5" /></span>. Et la prof me dit que <strong><MathComponent math="y(0) = 15" /></strong>. Je fais quoi ?</>}
            back={<>Tu remplaces 't' par 0, et tu forces le résultat à valoir 15 !<br/><MathComponent block math="y(0) = C \times e^{0} - 5 = 15" /><br/>Comme <MathComponent math="e^0 = 1" />, ça donne <MathComponent math="C - 5 = 15" />. Donc <MathComponent math="C = 20" /> !<br/>La solution finale et UNIQUE est donc : <strong><MathComponent math="y(t) = 20 e^{2t} - 5" /></strong>.</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver la solution de y' = 3y"
          question={<p>Résoudre l'équation différentielle <><MathComponent math={"y' = 3y"} /></> sachant que <><MathComponent math={"y(0) = 4"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Forme générale</p>
              <p>On reconnaît la forme <><MathComponent math={"y' = ay"} /></> avec <><MathComponent math={"a = 3"} /></>. Donc la solution générale est <><MathComponent math={"y(t) = C \\times e^{3t}"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer la condition initiale</p>
              <p>On nous donne <><MathComponent math={"y(0) = 4"} /></>. Donc <><MathComponent math={"C \\times e^{3 \\times 0} = 4"} /></>. Puisque <><MathComponent math={"e^0 = 1"} /></>, on obtient <><MathComponent math={"C \\times 1 = 4"} /></>, soit <><MathComponent math={"C = 4"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"y(t) = 4e^{3t}"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Équation de type y' = ay + b"
          question={<p>Déterminer la solution générale de l'équation <><MathComponent math={"2y' + 6y = 10"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Isoler y'</p>
              <p>L'équation n'est pas sous la bonne forme. On passe le 6y de l'autre côté : <><MathComponent math={"2y' = -6y + 10"} /></>. On divise tout par 2 : <><MathComponent math={"y' = -3y + 5"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Identifier a et b</p>
              <p>Ici, <><MathComponent math={"a = -3"} /></> et <><MathComponent math={"b = 5"} /></>. La formule dit <><MathComponent math={"y(t) = C e^{at} - \\frac{b}{a}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"y(t) = C e^{-3t} - \\frac{5}{-3}"} /></>, ce qui se simplifie en <><MathComponent math={"y(t) = C e^{-3t} + \\frac{5}{3}"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Formules" icon="🕹️" color="slate">
        <p className="mb-4">Résolvons l'équation : <MathComponent math="y' = -2y + 6" /></p>
        <FillInTheBlanks 
          id="equa-eval"
          content={[
            "On identifie $a = -2$ et $b = 6$. Je sors ma formule de type $y'=ay+b$. La forme générale des solutions est $C e^{at} - b/a$. Ce qui me donne : C × e^(",
            { options: ["6t", "-2t", "4t"], correctAnswer: 1 },
            ") - 6 / (-2). C'est-à-dire : C × e^(-2t) + ",
            { options: ["3", "-3", "4"], correctAnswer: 0 },
            ". \nMaintenant la Condition Initiale : on me dit que $y(0) = 10$. Je pose $C e^{0} + 3 = 10$. Donc $C + 3 = 10$. Alors $C = ",
            { options: ["10", "-3", "7"], correctAnswer: 2 },
            ". \nL'unique solution incroyable de mon problème est donc $y(t) = 7 e^{-2t} + 3$."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "La solution de $y' = 4y$ est $y(t) = C e^{4t}$. Pourquoi ?",
              options: [
                "Au pif.",
                "Parce que si on dérive $C \\times e^{4t}$, le '4' descend et on obtient bien $4 \\times C \\times e^{4t}$, donc $4y$ !",
                "Car l'exponentielle est toujours positive."
              ],
              correctAnswer: 1,
              explanation: "Exactement ! L'équation $y'=4y$ exige de trouver une fonction dont la dérivée fait 'fois 4'. Grâce à la dérivée composée $(e^u)'= u'e^u$, le $4$ de l'exposant 'descend' multiplier le tout quand on dérive."
            },
            {
              question: "J'ai l'équation différentielle $y' + 3y = 0$. Quelle est sa solution générale ?",
              options: [
                "$y(t) = C e^{3t}$",
                "$y(t) = C e^{-3t}$",
                "$y(t) = -3 e^t$"
              ],
              correctAnswer: 1,
              explanation: "Attention au piège classique ! Il faut METTRE SOUS LA FORME $y' = ay$. Donc on passe le $3y$ de l'autre côté : $y' = -3y$. D'où $y(t) = C e^{-3t}$ !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Remettre l'équation sous la forme $y' = ay + b$.",
            "Réciter la formule : $y(t)=C e^{at}-\\frac{b}{a}$",
            "Savoir que $-\\frac{b}{a}$ a le bon goût de devenir $+$ si $a$ est négatif.",
            "Utiliser $y(0)$ pour trouver $C$, en sachant que $e^0=1$."
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

export default Course_Terminale_08_EquaDiff;
