import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Post_Bac_03_Series_Numeriques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-SERIES"
        title="Séries Numériques"
        subtitle="L'art d'additionner une infinité de nombres... et d'obtenir parfois un résultat fini."
        duration="1h 20"
      />

      <Section title="⚠️ Introduction : L'Infini qui tient dans la main" icon="♾️" color="emerald">
        <p>
          Si je te donne une infinité de nombres positifs à additionner, tu pourrais penser que le résultat va 'exploser' vers l'infini. Eh bien non ! 
        </p>
        <p className="mt-2">
          Si les nombres que tu ajoutes deviennent de plus en plus petits (et <strong>assez vite</strong> petits), la somme totale va se stabiliser sur un nombre précis. On dit que la série <strong>converge</strong>.
        </p>
      </Section>

      <Section title="⚖️ La Différence entre Suite et Série" icon="🕵️" color="indigo">
        <p className="mb-4">
          La confusion classique en Post-Bac est de mélanger la 'Suite' et la 'Série'.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="La Suite (U_n)" 
            math={"u_0, u_1, u_2, ..., u_n"} 
          />
          <FormulaBox 
            title="La Série (Σ U_n)" 
            math={"S_n = u_0 + u_1 + ... + u_n"} 
          />
        </div>
        <div className="mt-4 p-4 border border-rose-100 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl text-rose-950 dark:text-rose-50 text-sm">
          <strong>Condition Nécessaire (Le piège de base) :</strong> Si une série converge (c'est-à-dire si la somme totale fait un nombre fixe), alors obligatoirement, le terme que tu ajoutes à la fin (U_n) doit tendre vers 0. SINON, si tu ajoutes un nombre qui ne s'annule pas à l'infini, la somme explosera ! <strong>Si la limite de U_n n'est pas 0, on dit que la série diverge grossièrement.</strong>
        </div>
      </Section>

      <Section title="📜 La Série Harmonique et Riemann" icon="🏛️" color="amber">
        <p className="mb-4">
          Tendre vers zéro, ça ne suffit pas ! Il faut tendre vers zéro VITE. Voici l'exemple historique qui a fait bugger les mathématiciens de la Renaissance.
        </p>
        
        <InfoBlock type="definition" title="La Série Harmonique (1/n)">
          Même si la limite de 1/n est 0... Si tu fais 1 + 1/2 + 1/3 + 1/4 + 1/5 + ... ça donne L'INFINI !<br/>
          (La série harmonique diverge). Elle gagne des miettes, mais suffisamment à chaque fois pour que la somme totale n'arrête jamais de grandir.
        </InfoBlock>

        <div className="mt-4 text-center p-4 bg-muted rounded-xl border border-border">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Séries de Riemann</h4>
            <div className="font-mono text-lg text-foreground mt-2">
                Σ 1/(n^alpha)
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">Cette série est notre mètre-étalon pour les comparaisons. Elle converge <strong>si et seulement si alpha {">"} 1</strong>.</p>
            <p className="text-xs text-slate-500 mt-1">Exemple: Σ 1/n² converge (car 2 &gt; 1). Σ 1/√n diverge (car 0.5 &lt; 1).</p>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Convergence de série par équivalent"
          question={<p>On donne la série dont le terme général est <><MathComponent math={"u_n = \\frac{n^2 + 3}{n^4 - n + 1}"} /></>. Cette série est-elle convergente ou divergente ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le comportement à l'infini (équivalent)</p>
              <p>On regarde les termes dominants au numérateur et au dénominateur car ce sont des polynômes. En haut c'est <><MathComponent math={"n^2"} /></>, en bas c'est <><MathComponent math={"n^4"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Simplification du terme dominant</p>
              <p>Ainsi, on obtient que <><MathComponent math={"u_n \\sim \\frac{n^2}{n^4}"} /></>, ce qui se simplifie en <><MathComponent math={"u_n \\sim \\frac{1}{n^2}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La série des <><MathComponent math={"u_n"} /></> a donc la même nature que la série de terme général <><MathComponent math={"\\frac{1}{n^2}"} /></>. C'est une série de Riemann avec <><MathComponent math={"\\alpha = 2 > 1"} /></>, donc elle CONVERGE !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : La série subtile"
          question={<p>Que dire de la série de terme général <><MathComponent math={"v_n = \\sin\\left(\\frac{1}{\\sqrt{n}}\\right)"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Équivalent classique</p>
              <p>Rappelez-vous le développement de sinus en 0 : <><MathComponent math={"\\sin(x) \\sim x"} /></> quand <><MathComponent math={"x \\to 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Application</p>
              <p>Vu que <><MathComponent math={"\\frac{1}{\\sqrt{n}}"} /></> tend vers 0, on a <><MathComponent math={"v_n \\sim \\frac{1}{\\sqrt{n}}"} /></> ce qui s'écrit <><MathComponent math={"v_n \\sim \\frac{1}{n^{0.5}}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : C'est une série de Riemann avec <><MathComponent math={"\\alpha = 0,5 \\le 1"} /></> (et les termes de <><MathComponent math={"v_n"} /></> sont positifs à partir de <><MathComponent math={"n=1"} /></>). Par comparaison, la série DIVERGE !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si la limite de U_n vaut 0. Alors la série de U_n Converge.</>}
            back={<><strong>FAUX ! (C'est le plus grand piège)</strong><br/><span className="text-sm">L'exemple parfait est 1/n. Sa limite est 0, mais la série diverge car 1/n décroit trop lentement. Tendre vers 0 est une condition nécessaire, mais pas suffisante !</span></>}
          />
          <Flashcard 
            front={<>C'est quoi une Série Alternée ?</>}
            back={<><strong>Le balancier.</strong><br/><span className="text-sm">On alterne ! (+ - + - +). Par exemple Σ (-1)^n / n. Magiquement, le Théorème Spécial des Séries Alternées (TSSA) nous dit que si la valeur absolue décroit vers 0, la série va se stabiliser et converger !</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Séries" icon="🕹️" color="slate">
        <FillInTheBlanks 
          id="pb-ser-eval"
          content={[
            "La série géométrique Σ q^n. Si q = 0.5, la somme va converger car la valeur absolue de q est strictement inférieure à ",
            { options: ["0", "1", "2"], correctAnswer: 1 },
            ". \nEt la formule magique pour trouver le résultat de la somme infinie 1 + 0.5 + 0.25 + 0.125 + ... c'est 1 / (1 - q). Ce qui donne 1 / (1 - 0.5) = ",
            { options: ["1.5", "2", "L'infini"], correctAnswer: 1 },
            ". \nC'est la preuve mathématique que si je marche de la moitié vers une porte (0.5), puis de la moitié restante (0.25) à l'infini... la distance totale sera de '1' porte exacte !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle méthode j'utilise pour étudier la série des U_n si U_n est une suite positive et qui semble 'bizarre/complexe' ?",
              options: [
                "Je cherche des Équivalents en +infini pour la comparer à Riemann.",
                "Je calcule U_1, U_2, U_3 et je devine.",
                "Je conclus qu'elle diverge."
              ],
              correctAnswer: 0,
              explanation: "C'est la méthode reine. On cherche à quoi 'ressemble' U_n quand n est géant. Si U_n est équivalent à 1/n², alors comme 1/n² converge (Riemann), U_n converge aussi."
            },
            {
              question: "Si j'étudie Exp(x)... c'est en réalité une Série Entière ! Quelle est sa formule ?",
              options: [
                "Σ (-1)^n * x^n / n",
                "Σ x^n / n!",
                "Σ x^n"
              ],
              correctAnswer: 1,
              explanation: "Exp(x) = 1 + x + x²/2 + x³/6 + x^4/24... C'est la somme des '(x^n) / factorielle(n)'. Et devine quoi ? Comme n! est le terme qui grandit le plus vite en maths, l'exponentielle converge POUR TOUT x sur Terre."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "L'objectif n'est pas de calculer la valeur de la somme, c'est juste de dire si ça Converge ou Diverge (Nature).",
            "Si Lim U_n ≠ 0 => Divergence Grossière directe !",
            "Séries de Riemann (1/n^a) => Converge si a > 1.",
            "Pour les séries à termes positifs, je peux utiliser les Équivalents."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+25 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_03_Series_Numeriques;
