import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, StepList, Accordion, InteractiveExercise, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Terminale_05_Suites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [nVal, setNVal] = useState<number>(1);
  const u_n = 2 * Math.pow(0.5, nVal) + 5; // Suite qui converge vers 5

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-SUI"
        title="Suites & Récurrence"
        subtitle="Des cascades de nombres, l'effet domino, et la limite vers l'infini."
        duration="55 min"
      />

      <Section title="⚠️ Introduction : Discret vs Continu" icon="🪜" color="emerald">
        <p>
          Une fonction classique f(x) est continue : x peut prendre toutes les valeurs de l'univers (1.2, Pi, -8.76...). Mais les Suites Mathématiques vivent dans un monde <strong>discret</strong> : n est un entier naturel (0, 1, 2, 3...). C'est comme monter un escalier marche par marche au lieu de glisser sur une rampe.
        </p>
        <p className="mt-2">
          En Terminale, le Boss Final des suites, c'est de prouver qu'une propriété est vraie pour TOUTES les marches de l'escalier jusqu'à l'infini, sans avoir à les vérifier une par une. On utilise pour cela le majestueux <strong>Raisonnement par Récurrence</strong>.
        </p>
      </Section>

      <Section title="⚖️ L'Effet Domino (La Récurrence)" icon="🁸" color="indigo">
        <p className="mb-4">
          Le principe du Raisonnement par Récurrence est incroyablement logique. Imagine une chaine infinie de dominos.
        </p>
        
        <StepList>
          <div className="bg-card p-4 border border-border rounded-xl mb-2">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300">Étape 1 : l'Initialisation</h4>
            <p>Je prouve que je peux faire tomber le tout PREMIER domino (souvent pour n=0).</p>
          </div>
          <div className="bg-card p-4 border border-border rounded-xl mb-2">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300">Étape 2 : l'Hérédité</h4>
            <p><strong>C'est le coeur du calcul.</strong> Je SUPPOSE qu'un domino 'n' (au hasard) tombe (C'est mon Hypothèse de Récurrence). Et je prouve mathématiquement que SI ce domino 'n' tombe, ALORS il fait forcément chuter le domino suivant 'n+1'.</p>
          </div>
          <div className="bg-card p-4 border border-emerald-100 dark:border-emerald-800/60 rounded-xl">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300">Étape 3 : la Conclusion</h4>
            <p>Si la première marche tient, et que chaque marche permet d'atteindre la suivante... alors la totalité de l'escalier infini tient la route. La propriété est vraie pour tout entier n !</p>
          </div>
        </StepList>

        <Accordion title="Pourquoi on a du mal avec l'Hérédité ?">
          <div className="p-4 bg-card border border-border rounded-xl text-slate-700 dark:text-slate-300">
            Souvent, on n'arrive pas à comprendre qu'on a le droit d'utiliser l'hypothèse. "Mais monsieur, on suppose que c'est vrai, comment on peut le prouver ?" Non ! L'hérédité ne prouve pas que P(n) est vraie. Elle prouve juste que le MÉCANISME DE TRANSMISSION marche.
          </div>
        </Accordion>
      </Section>

      <Section title="🛠️ Le Simulateur de Convergence" icon="🔭" color="amber">
        <p className="mb-4">
          Une limite de suite s'étudie UNIQUEMENT quand n tend vers l'infini (on ne revient jamais en arrière dans le temps n). Observe cette suite U<sub>n</sub> = 2 * (0.5)ⁿ + 5.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Avance le temps (n = {nVal})</span>
              <input type="range" min="1" max="20" step="1" value={nVal} onChange={(e) => setNVal(parseInt(e.target.value))} className="accent-amber-500 w-64" />
            </label>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border">
            <div className={`font-mono text-4xl font-bold transition-all ${nVal > 15 ? 'text-emerald-600 dark:text-emerald-400 drop-shadow-md' : 'text-slate-900 dark:text-slate-100'}`}>
              U_{nVal} = {u_n.toFixed(6)}
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {nVal < 5 && "On commence haut, et on descend vite..."}
              {nVal >= 5 && nVal <= 10 && "La descente ralentit considérablement..."}
              {nVal > 10 && "On stagne ! La limite est proche de 5."}
            </p>
          </div>

           <div className="mt-4 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/60 p-3 rounded text-sm text-amber-950 dark:text-amber-50 text-left">
            <strong>Explication Mathématique :</strong> 0.5 est strictement compris entre -1 et 1. Sa puissance infinie (0.5)ⁿ tend vers ZERO. Le bout de formule "2 * 0" s'efface... Il ne reste que le +5 à la fin de l'éternité !
          </div>
        </div>
      </Section>

      <Section title="📜 Théorème des Gendarmes et Suites Géométriques" icon="⚡" color="rose">
        <p className="mb-4">Tu n'arriveras pas toujours à calculer une limite directement. Parfois, il faut tricher un peu en encadrant la cible.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Théorème des Gendarmes" 
            formula={<>Si V_n &le; U_n &le; W_n<br/>Et que V_n → L et W_n → L<br/>Alors U_n → L !</>} 
          />
          <FormulaBox 
            title="Le Sort de la Raison (qⁿ)" 
            formula={<>
              Si -1 &lt; q &lt; 1 : qⁿ → 0<br/>
              Si q &gt; 1 : qⁿ → +∞<br/>
              Si q &le; -1 : Pas de limite.
            </>} 
          />
        </div>
      </Section>

      <Section title="🧠 Suites Arithmético-Géométrique" icon="🔦" color="purple">
         <div className="grid grid-cols-1 gap-4">
          <Flashcard 
            front={<>C'est quoi une suite arithmético-géométrique (du genre <span className="font-mono">Un+1 = a * Un + b</span>) ?</>}
            back={<>C'est la pire ! Ce n'est ni arithmétique (à cause du '*a'), ni géométrique (à cause du '+b').<br/>Pour la résoudre au BAC, on est obligé d'inventer une <strong>Suite Auxiliaire Vn</strong> qui sera parfaitement géométrique !</>}
          />
        </div>
        <div className="mt-6">
          <TipBanner type="warning" title="Le piège des Suites Auxiliaires">
            Quand on te dit au BAC "Soit la suite <><MathComponent math={"v_n = u_n - 3"} /></>", l'objectif est TOUJOURS de prouver que <><MathComponent math={"v_n"} /></> est une suite géométrique. Tu dois donc calculer <><MathComponent math={"v_{n+1}"} /></>, remplacer <><MathComponent math={"u_{n+1}"} /></> par sa formule, et tu DOIS tomber à la fin sur <><MathComponent math={"v_{n+1} = q \\times v_n"} /></>.
          </TipBanner>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver la limite avec le Théorème des Gendarmes"
          question={<p>Déterminer la limite de <><MathComponent math={"u_n = \\frac{\\sin(n)}{n}"} /></> quand <><MathComponent math={"n \\to +\\infty"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Encadrer le terme rebelle</p>
              <p>On sait que pour tout <><MathComponent math={"n"} /></>, le sinus "oscille" entre -1 et 1. Donc <><MathComponent math={"-1 \\le \\sin(n) \\le 1"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Diviser l'inégalité</p>
              <p>Puisque <><MathComponent math={"n > 0"} /></>, on divise tout par <><MathComponent math={"n"} /></> sans changer le sens de l'inégalité : <><MathComponent math={"\\frac{-1}{n} \\le \\frac{\\sin(n)}{n} \\le \\frac{1}{n}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On a emprisonné <><MathComponent math={"u_n"} /></> entre deux gendarmes. Or lim <><MathComponent math={"-1/n = 0"} /></> et lim <><MathComponent math={"1/n = 0"} /></>. D'après le théorème des Gendarmes, la suite <><MathComponent math={"u_n"} /></> n'a pas le choix, elle est écrasée vers 0 !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Calculer un terme de suite"
          question={<p>Soit la suite définie par <><MathComponent math={"u_0 = 3"} /></> et <><MathComponent math={"u_{n+1} = 2u_n - 1"} /></>. Calculer <><MathComponent math={"u_2"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calcul de u₁</p>
              <p>Il faut d'abord calculer <><MathComponent math={"u_1"} /></> en utilisant <><MathComponent math={"u_0"} /></>. <><MathComponent math={"u_1 = 2 u_0 - 1 = 2(3) - 1 = 6 - 1 = 5"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Caclul de u₂</p>
              <p>Maintenant on utilise <><MathComponent math={"u_1"} /></> pour trouver <><MathComponent math={"u_2"} /></>. <><MathComponent math={"u_2 = 2 u_1 - 1 = 2(5) - 1 = 10 - 1 = 9"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"u_2"} /></> vaut 9. C'est l'effet domino !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Logique Discrète" icon="🕹️" color="slate">
        <p className="mb-4">Finis la phrase pour montrer que tu as tout compris :</p>
        <FillInTheBlanks 
          id="suite-eval"
          content={[
            "Dans le raisonnement par récurrence, l'hypothèse de récurrence c'est quand on <strong>suppose</strong> que la propriété est vraie au rang ",
            { options: ["P(n)", "n", "n+1"], correctAnswer: 1 },
            ". \nEnsuite sur les limites : Si une suite est strictement croissante ET qu'elle est <strong>majorée</strong> (bloquée par un plafond, par exemple elle ne dépasse jamais 10), alors le Théorème de Convergence Monotone dit qu'elle ",
            { options: ["converge forcément vers 10", "converge (vers un nombre ≤ 10)", "diverge vers l'infini"], correctAnswer: 1 },
            ". \nEnfin, la limite de (-0.8)ⁿ quand n tend vers l'infini vaut ",
            { options: ["+∞", "pas de limite (ça oscille)", "Zéro (0)"], correctAnswer: 2 },
            " car -0.8 est entre -1 et 1."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai U(n) = n² - n. Que vaut U(n+1) ?",
              options: [
                "n² - n + 1",
                "(n+1)² - (n+1)",
                "n²"
              ],
              correctAnswer: 1,
              explanation: "Règle Numéro 1 : Dans U(n+1), il faut remplacer TOUS LES 'n' de la formule par des parenthèses '(n+1)'. Donc (n+1)² - (n+1)."
            },
            {
              question: "Quelle est la limite de qⁿ si q = 1.01 ?",
              options: [
                "Zéro",
                "1",
                "+∞"
              ],
              correctAnswer: 2,
              explanation: "Même si ça a l'air petit, 1.01 est STRICTEMENT SUPÉRIEUR à 1. Quand tu le multiplies par lui même une infinité de fois, ça finira toujours par exploser vers l'infini."
            },
            {
              question: "Le théorème des Gendarmes d'encadrement s'utilise particulièrement avec quelles fonctions ?",
              options: [
                "Avec l'Exponentielle",
                "Avec le Logarithme (ln)",
                "Avec Sinus(n) et Cosinus(n)"
              ],
              correctAnswer: 2,
              explanation: "Bien sûr! Parce qu'on ne connait pas la limite de sin(n) et cos(n). Mais on SAIT à 100% qu'elles sont coincées entre -1 et 1. C'est parfait pour poser un encadrement des Gendarmes !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Rédiger une Récurrence : Initialisation, Hypothèse(Hérédité), Conclusion.",
            "Remplacer les 'n' par '(n+1)' proprement sans détruire le calcul.",
            "L'arme fatale : -1 < q < 1 implique qⁿ → 0.",
            "Gendarmes : Coincer une suite embêtante entre deux suites qui convergent vers le même L."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+20 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Terminale_05_Suites;
