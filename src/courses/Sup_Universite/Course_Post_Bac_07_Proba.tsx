import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import BinomialDist from '../../components/interactive/BinomialDist';

const Course_Post_Bac_07_Proba: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-PROBA"
        title="Probabilités et Variables Aléatoires"
        subtitle="Espaces probabilisés, fonctions caractéristiques et Lois des Grands Nombres."
        duration="1h 15"
      />

      <Section title="⚠️ Introduction : La Machine du Hasard" icon="🎰" color="emerald">
        <p>
          Au lycée, tu comptais des combinaisons de boules dans une urne. En Post-Bac, on structure mathématiquement le hasard avec la très stricte <strong>Théorie de la Mesure</strong> de Kolmogorov.
        </p>
        <p className="mt-2 mb-4">
          Le concept majeur, c'est l'Univers Ω (Oméga), la Tribu des événements possibles, et enfin la Mesure de Probabilité P qui vient y mettre un poids (entre 0 et 1).
        </p>

        <InfoBlock type="funfact" title="Le saviez-vous ? (Le Paradoxe de Monty Hall)">
          Dans le jeu télévisé "Let's Make a Deal", vous faites face à 3 portes. Derrière l'une se trouve une voiture, derrière les deux autres des chèvres. Vous choisissez la porte 1. L'animateur (qui sait où est la voiture) ouvre la porte 3, révélant une chèvre, et vous propose de changer pour la porte 2. Mathématiquement, <strong>changer de porte double vos chances de gagner (passant de 1/3 à 2/3) !</strong> C'est un grand classique des probabilités conditionnelles qui piège la plupart des esprits intuitifs.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Variables Aléatoires et Espérance" icon="🎲" color="indigo">
        <p className="mb-4">
          Une variable aléatoire X n'est pas "aléatoire". C'est une vraie <strong>Fonction</strong> déterministe qui associe un nombre/score à chaque résultat possible de l'univers !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="L'Espérance Mathématique E[X]" 
            math={"E(X) = \\sum x_i P(X = x_i) \\\\ \\text{(Centre de gravité)}"} 
          />
          <FormulaBox 
            title="Le Transfert" 
            math={"E(f(X)) = \\sum f(x_i) P(X = x_i) \\\\ \\text{Pas besoin de connaitre f(X)}"} 
          />
        </div>
        <div className="my-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>Propriété Magique (Linéarité) :</strong> L'espérance est <strong>toujours</strong> linéaire ! E[X + Y] = E[X] + E[Y]. Même si X et Y sont super liés et dépendants l'un de l'autre ! Par contre la variance V(X+Y), ça ne marche que si X et Y sont physiquement indépendants.
        </div>

        <InfoBlock type="reminder" title="Rappel">
          Si deux variables aléatoires {"$X$"} et {"$Y$"} sont indépendantes, alors leur covariance est contractée à zéro : {"$\\text{Cov}(X,Y) = 0$"}. La réciproque est généralement <strong>fausse</strong> (elles peuvent avoir une covariance nulle tout en étant fortement dépendantes non-linéairement). L'indépendance implique aussi : {"$E[XY] = E[X] E[Y]$"} et {"$V(X + Y) = V(X) + V(Y)$"}.
        </InfoBlock>
      </Section>

      <Section title="📜 Couple de Variables & Matrice de Covariance" icon="👯" color="amber">
        <p className="mb-4">
          C'est là que réside 100% de la Machine Learning et la prévision de la bourse. Si tu étugies X (la Température) et Y (les Ventes de Glaces), ces deux variables 'tournent' en même temps.
        </p>
        
        <InfoBlock type="definition" title="La Covariance Cov(X, Y)">
          C'est le baromètre de la sympathie. Si X monte et que Y monte avec lui : Cov &gt; 0. S'ils se croisent : Cov &lt; 0. S'ils sont indépendants : Cov = 0.<br/>
          Attention : Cov = 0 n'implique pas toujours l'Indépendance !
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : La covariance dans la régression et l'IA">
          Dans l'optimisation des réseaux de neurones ou l'analyse géométrique de données (comme l'ACP - Analyse en Composantes Principales), la <strong>matrice de covariance</strong> compile toutes les dépendances linéaires des features. Elle permet de factoriser les données, de supprimer les redondances de bruit, et d'orienter les axes de décision des modèles les plus complexes au sens du vecteur propre de covariation maximale.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Espérance avec Transformation"
          question={<p>Soit <><MathComponent math={"X"} /></> la variable aléatoire indiquant le résultat d'un dé parfait à 6 faces. On définit un jeu où l'on gagne <><MathComponent math={"Y = X^2"} /></> euros. Quelle est notre espérance de gain <><MathComponent math={"E[Y]"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le théorème de transfert</p>
              <p>Au lieu de chercher la loi de <><MathComponent math={"Y"} /></>, on applique le théorème : <><MathComponent math={"E[X^2] = \\sum_{k=1}^6 k^2 \\times P(X=k)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le calcul</p>
              <p>Chaque face a la probabilité <><MathComponent math={"1/6"} /></>. On fait donc <><MathComponent math={"\\frac{1}{6} \\times (1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2)"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La somme des carrés de 1 à 6 fait 91. L'espérance est de <><MathComponent math={"91/6 \\approx 15,16"} /></> euros !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Indépendance et Variance"
          question={<p>Soient <><MathComponent math={"X"} /></> et <><MathComponent math={"Y"} /></> deux variables aléatoires. On sait que <><MathComponent math={"V(X)=3"} /></>, <><MathComponent math={"V(Y)=4"} /></> et que <><MathComponent math={"V(X+Y) = 7"} /></>. Que peut-on dire de la Covariance entre <><MathComponent math={"X"} /></> et <><MathComponent math={"Y"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : La formule magique de la variance</p>
              <p>Rappelez-vous la formule qui lie variance et somme (l'analyse de la dimension 2) : <><MathComponent math={"V(X+Y) = V(X) + V(Y) + 2 \\times \\text{Cov}(X,Y)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Remplacer par les valeurs</p>
              <p>On injecte les valeurs de l'énoncé : <><MathComponent math={"7 = 3 + 4 + 2 \\times \\text{Cov}(X,Y)"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On a <><MathComponent math={"7 = 7 + 2\\text{Cov}(X,Y)"} /></>. Donc <><MathComponent math={"\\text{Cov}(X,Y) = 0"} /></>. Attention !! Les variables sont "non-corrélées", mais cela ne prouve PAS mathématiquement qu'elles sont indépendantes (sauf si elles étaient normales !).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si Cov(X,Y) = 0, alors X et Y sont Indépendantes.</>}
            back={<><strong>FAUX ! (Piège classique).</strong><br/><span className="text-sm">L'indépendance implique une covariance nulle, mais la réciproque est FAUSSE (sauf si le couple suit la fameuse Loi Normale Multivariée !).</span></>}
          />
          <Flashcard 
            front={<>La limite de (1 + x/n)^n quand n tend vers l'infini, c'est quoi ?</>}
            back={<><strong>La base de tout (e^x).</strong><br/><span className="text-sm">Oui ! C'est exp(x). Cette limite est fondamentale en proba pour prouver le fameux "Théorème Central Limite" via la fonction génératrice des moments.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Distributions & TCL" icon="🕹️" color="slate">
        <BinomialDist />

        <div className="mt-6">
          <FillInTheBlanks 
            id="pb-proba-eval"
            content={[
              "Le Théorème Central Limite (TCL) est la raison pour laquelle on utilise les statistiques. Prenez une expérience totalement absurde (lancer 1000 fois un coquillage au pif). Si vous additionnez les résultats de ces 1000 tirages, la variable aléatoire globale Sn va MAGIQUEMENT suivre une courbe en forme de ",
              { options: ["Sinus", "Exponentielle", "Cloche (Loi Normale)"], correctAnswer: 2 },
              ". \nPouvoir prédire que toute forme de hasard dans l'univers se 'moyennise' sous la forme d'une courbe de ",
              { options: ["Gauss", "Poisson", "Laplace"], correctAnswer: 0 },
              ", c'est la pierre angulaire de l'Intelligence Artificielle et des sondages électoraux."
            ]}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'Inégalité qui prouve mathématiquement que la Loi Forte des Grands Nombres fonctionne ?",
              options: [
                "L'inégalité Triangulaire",
                "L'inégalité de Bienaymé-Tchebychev",
                "L'inégalité de Bernoulli"
              ],
              correctAnswer: 1,
              explanation: "Bienaymé-Tchebychev : P(|X - E[X]| > a) <= V(X) / a². Elle majore brutalement la probabilité qu'une variable s'écarte trop de sa moyenne !"
            },
            {
              question: "L'univers n'a pas de mémoire. Cette phrase symbolise quelle loi de probabilité continue ?",
              options: [
                "La Loi Normale",
                "La Loi Exponentielle",
                "La Loi Uniforme"
              ],
              correctAnswer: 1,
              explanation: "La Loi Exponentielle modélise souvent la durée de vie avant de griller d'un composant électronique ou la perte d'un atome radioactif. 'Ne pas avoir de mémoire' signifie que ton atome a la MÊME probabilité de disparaitre demain, que s'il était né hier."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Tribus et événements.",
            "Espérance E[X] (Toujours linéaire).",
            "Variance V(X) (Quadratique: V(aX) = a²V(X) ).",
            "Indépendance => Le produit des probabilités croisées."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_07_Proba;
