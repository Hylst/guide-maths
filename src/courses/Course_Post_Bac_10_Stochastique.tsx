import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Post_Bac_10_Stochastique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-STOCHAST"
        title="Calcul Stochastique & Processus"
        subtitle="Mouvement Brownien, Chaînes de Markov, Lemme d'Itô et la finance de marché."
        duration="1h 45"
      />

      <Section title="⚠️ Introduction : Le Temps Aléatoire" icon="🌩️" color="emerald">
        <p>
          Une variable aléatoire X, c'est comme jeter un dé et regarder le score. Un processus stochastique X(t), c'est <strong>une trajectoire qui évolue avec le temps</strong> : le cours de l'action Apple d'heure en heure, le parcours zigzagant d'une particule au microscope, ou les embouteillages du periphérique.
        </p>
        <p className="mt-2">
          Le monde réel n'est pas lisse (pas dérivable). C'est pour ça qu'on a créé un calcul "Stochastique", où l'équation différentielle ne se fait plus par rapport aux variables gentilles des physiciens (dx et dt), mais par rapport au HASARD ABSOLU (le fameux dW : le battement de l'aléatoire 'brownien').
        </p>
      </Section>

      <Section title="⚖️ Les Processus de Markov & Mouvement Brownien" icon="⛓️" color="indigo">
        <p className="mb-4">
          La propriété fondatrice des ces mondes (que ce soit en chaine discrète, ou en courbe continue) !
        </p>
        
        <InfoBlock type="definition" title="La Propriété de Markov (L'amnésie)">
          <strong>'Le Futur ne dépend que du Présent, et pas du Passé !'</strong><br/>
          (Où je serai dans 1 minute ne dépend QUE de l'endroit exact où je me trouve LÀ MAINTENANT. Peu importe par où je suis passé les 10 denières heures pour arriver ici).
        </InfoBlock>

        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>Le Mouvement Brownien standard W(t) :</strong> C'est la limite ultime de ces modèles.
          <ul className="list-disc pl-4 mt-2">
            <li>Il commence toujours à W(0) = 0.</li>
            <li>Ses apparitions/trajectoires sont Continues de loin (pas de sauts géants par téléportation).</li>
            <li>Mais elles font tellement de zigzags microscopiques... qu'elles sont <strong>Nulle Part Dérivables</strong> ! Mathématiquement, tu ne peux construire AUCUNE tangente précise en un point donné de cette tempête.</li>
          </ul>
        </div>
      </Section>

      <Section title="📜 La Formule Magique de Wall-Street : Itô" icon="📈" color="amber">
        <p className="mb-4">
          Vu que la courbe n'est pas lisse (elle est nulle part dérivable !). Les approximations de Taylor (f(t+dt) = f(t) + f'.dt) qu'on étudie en Calcul Différentiel ÉCHOUENT totalement !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Le modèle dérivable classique" 
            math={"df = f'(x) dx"} 
          />
          <FormulaBox 
            title="Le Lemme d'Itô" 
            math={"df = f' dx + \\frac{1}{2} f'' \\times (dx)^2 \\\\ \\text{On ajoute la dérivée SECONDE !}"} 
          />
        </div>
        <div className="mt-4 p-4 bg-muted border border-amber-100 dark:border-amber-800/60 rounded-xl text-amber-950 dark:text-amber-50 text-sm">
          <strong>L'Incroyable Axiome (dt = dW²) :</strong> En mécanique basique, dt² ou dx² (un infiniment petit au carré) ça fait Zéro très très vite, alors on l'ignore. Mais dans le monde chaotique Brownien... les petits zigzags (dW) ont tellement d'impact qu'ils vibrent très forts. Au point que <strong>la variance (le hasard au carré dW²) est parfaitement égale au temps exact d'écoulement (dt)</strong> ! C'est ce qui rajoute le terme de la dérivée 2nde.
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Le Lemme d'Itô en Action"
          question={<p>On considère le mouvement brownien standard <><MathComponent math={"W_t"} /></>. On veut utiliser le lemme d'Itô pour calculer la différentielle stochastique <><MathComponent math={"df"} /></> de la fonction <><MathComponent math={"f(W_t) = W_t^2"} /></>. Que vaut <><MathComponent math={"df(W_t)"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Les dérivées classiques</p>
              <p>On pose <><MathComponent math={"f(x) = x^2"} /></>. Ses dérivées sont <><MathComponent math={"f'(x) = 2x"} /></> et <><MathComponent math={"f''(x) = 2"} /></> (dérivée seconde constante !).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Remplacement dans la formule magique</p>
              <p>Le lemme d'Itô nous dit : <><MathComponent math={"df = f'(W_t) dW_t + \\frac{1}{2} f''(W_t) dt"} /></> (Rappel : on force <><MathComponent math={"(dW_t)^2 = dt"} /></>).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"df = 2W_t dW_t + \\frac{1}{2} \\times 2 \\times dt"} /></>. Donc <><MathComponent math={"df = 2W_t dW_t + dt"} /></>. <br/>En analyse standard ça aurait été simplement 2xdx. Ici, l'aléatoire a littéralement créé un terme de "temps" (dt) qui s'est rajouté tout seul !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : La Martingale Suprême"
          question={<p>La variable <><MathComponent math={"M_t = W_t^2 - t"} /></> est-elle une Martingale ? (C'est-à-dire l'espérance de la variation <><MathComponent math={"E[dM_t]"} /></> est-elle toujours nulle ?)</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Différentier M_t</p>
              <p>Par définition <><MathComponent math={"M_t = f(W_t) - t"} /></> avec l'exercice précédent. Donc <><MathComponent math={"dM_t = d(W_t^2) - dt"} /></>. Sachant que <><MathComponent math={"d(W_t^2) = 2W_t^2 dW_t + dt"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Simplification Magique</p>
              <p><><MathComponent math={"dM_t = (2W_t dW_t + dt) - dt = 2W_t dW_t"} /></>. Les "dt" déterministes se sont annihilés !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : L'espérance de TOUTE intégrale de <><MathComponent math={"dW_t"} /></> est toujours égale à zéro (le hasard pur a une moyenne de zéro). Donc <><MathComponent math={"E[dM_t] = 0"} /></>. La fonction <><MathComponent math={"W_t^2 - t"} /></> est le jeu parfait : une MARTINGALE !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le modèle Black-Scholes a gagné le prix Nobel.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">En 1997, Scholes et Merton ont gagné le monde avec une Équation aux Dérivées Partielles Stochastique permettant de donner le prix EXACT 'Sans risque' qu'on devrait parier sur une action financière aléatoire.</span></>}
          />
          <Flashcard 
            front={<>Un processus est une 'Martingale' si il a beaucoup de variance.</>}
            back={<><strong>FAUX ! (Martingale = Jeu Juste)</strong><br/><span className="text-sm">Une martingale est un pari parfait : l'Espérance de mes gains demain E[X(t+1)], SACHANT tout ce qu'on sait à l'instant (t)... est ÉGALE à X(t) l'argent que je possède aujourd'hui ! (Donc en moyenne je ne peux ni gagner ni perdre). C'est la base de construction de toute la finance mathématique.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur Stochastique" icon="🕹️" color="slate">
        <FillInTheBlanks 
          id="pb-stoch-eval"
          content={[
            "Pour modéliser l'évolution d'une action financière S(t), on utilise l'Équation Différentielle Stochastique (EDS) classique de Black-Scholes : dS(t) = S(t) ( μ dt + σ dW ). 1: La lettre mu, c'est le 'Drift', c'est l'évolution ",
            { options: ["Aléatoire", "Certaine et Déterministe", "Biaisée"], correctAnswer: 1 },
            " du cours de l'action dans le temps. \n2: La lettre grecque sigma est fondamentale, elle représente la ",
            { options: ["Volatilité", "Vélocité", "Distance"], correctAnswer: 0 },
            " de l'action, c'est-à-dire l'ampleur des secousses que l'action prend face aux rumeurs du marché et des zigzags du mouvement brownien dW!"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la particularité troublante des trajectoires d'un Mouvement Brownien par rapport à nos mathématiques de Descartes  ?",
              options: [
                "Elles sont négatives",
                "Ces trajectoires sont continues partout, mais dérivables NULLE PART.",
                "Elles ont une limite."
              ],
              correctAnswer: 1,
              explanation: "Incroyable : La courbe est solide, chaque point colle l'autre en zoomant. Mais si tu zooms, ce sont des pointes inifnies, des zig-zags à l'intérieur des zigzags, la pente d'une tangente est impossible à attraper. Ca crève les mathématiques usuelles."
            },
            {
              question: "Si j'ai un modèle où les sauts ne sont plus Continus, mais DiSCRETS. (C'est à dire que je saute d'un état A, vers B ou C par % de chances). J'utilise quelle théorie de base ?",
              options: [
                "Des chaînes de Markov",
                "Le monde d'Itô",
                "La géométrie de Riemann"
              ],
              correctAnswer: 0,
              explanation: "Les chaines de Markov sont composées de Noeuds (états ou villes) et de fleches pour les probabilités de transition P_ij : Par exemple la meteo demain sachant la meteo de ce matin."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Processus Stochastique (Famille de V.A. indicées par le temps : Xt).",
            "La Filtration : L'ensemble de toutes les informations mathématiques connues jusqu'à l'instant 't'.",
            "Mouvement Brownin (W) : Espérance=0, Variance=t. Continu mais avec secousses infinies.",
            "Formule de Ito et Calcul Avancé dS, dW, c'est le coeur du pricing et de la bourse moderne."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+50 XP) & Gagner le diplôme de l'Olympe Mathématique !
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_10_Stochastique;
