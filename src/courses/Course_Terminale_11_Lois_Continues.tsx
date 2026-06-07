import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Terminale_11_Lois_Continues: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-CONT"
        title="Probabilités & Lois Continues"
        subtitle="Quand le temps devient infini : de la densité de probabilité à la Loi Uniforme."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : Du Discret au Continu" icon="🌦️" color="emerald">
        <p>
          Lancer un dé, c'est <strong>Discret</strong> (1, 2, 3... il y a des "trous" entre les nombres). \nMais attendre au feu rouge, le temps d'attente T peut prendre n'importe quelle valeur (1.2 sec, 1.2003 sec, π sec). C'est <strong>Continu</strong>.
        </p>
        <p className="mt-2">
          Dans le monde continu, la probabilité d'obtenir <strong>exactement</strong> "1.23456743 secondes", c'est 0%. C'est tellement précis que c'est impossible. Avec les lois continues, on ne calcule plus la probabilité d'un "point", mais la probabilité d'un <strong>INTERVALLE</strong> (ex: "attendre entre 1 et 2 secondes").
        </p>
        
        <InfoBlock type="definition" title="La Règle d'Or">
          Une probabilité devient alors symbolisée par l'<strong>Aire Sous Une Courbe</strong> (l'intégrale) d'une fonction spéciale appelée Fonction de Densité.
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Fonction de Densité (Le Parapluie)" icon="☂️" color="indigo">
        <p className="mb-4">
          Une fonction f(x) est une Densité si elle remplit trois conditions absolues.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="1. Positivité" 
            math={"f(x) \\ge 0"} 
          />
          <FormulaBox 
            title="2. Totale (L'univers)" 
            math={"\\int_{-\\infty}^{+\\infty} f(x) dx = 1"} 
          />
        </div>
        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>3. Continuité : </strong> La fonction doit être continue (à quelques exceptions près mais au lycée on va dire qu'elle ne fait pas de gros sauts magiques). Et l'intégrale complète de la fonction vaut 1, ce qui représente 100% de probabilité. L'intégrale entre a et b, calcule la probabilité de se trouver entre a et b.
        </div>
      </Section>

      <Section title="🧠 La Loi Uniforme" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>C'est quoi la Loi Uniforme [a; b] ?</>}
            back={<><strong>Aucun favoritisme !</strong><br/><span className="text-sm">Chaque instant a la même chance. C'est le rendez-vous aléatoire entre 14h et 16h. La densité f(x) est constante et vaut 1/(b-a).</span></>}
          />
          <Flashcard 
            front={<>Et la Loi Exponentielle (vu plus tard, ou en expertes) ?</>}
            back={<><strong>La loi d'attente radiaoctive ou de panne</strong><br/><span className="text-sm">Plus tu attends, moins il y a de "chance ou risque" que l'événement ne se soit toujours pas produit. Mais elle n'a pas de mémoire (durée de vie sans vieillissement).</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul de proba avec la Loi Uniforme"
          question={<p>La durée d'un film varie entre 90 et 120 minutes selon une loi uniforme. Quelle est la probabilité que le film dure exactement entre 100 et 110 minutes ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser l'intervalle total</p>
              <p>L'intervalle total est <><MathComponent math={"[90; 120]"} /></>. La largeur totale (l'univers) est de <><MathComponent math={"120 - 90 = 30"} /></> minutes.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Analyser l'intervalle cible</p>
              <p>On veut la probabilité d'être dans <><MathComponent math={"[100; 110]"} /></>. Cet intervalle a une largeur de <><MathComponent math={"110 - 100 = 10"} /></> minutes.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Dans une loi uniforme, c'est juste de la proportionnalité ! <><MathComponent math={"\\frac{\\text{Largeur Cible}}{\\text{Largeur Totale}} = \\frac{10}{30} = \\frac{1}{3}"} /></>. (Soit environ 33.3% de chance).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : La notion de Densité Vraie"
          question={<p>Soit une fonction constante <><MathComponent math={"f(x) = k"} /></> définie sur <><MathComponent math={"[0; 5]"} /></>. Quelle doit être la valeur de <><MathComponent math={"k"} /></> pour que <><MathComponent math={"f"} /></> soit une véritable fonction de densité de loi uniforme ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le Théorème Fondamental</p>
              <p>L'aire totale sous la courbe d'une fonction de densité DOIT valoir 1 (car ça représente 100% de la probabilité).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Calcul de l'aire du rectangle</p>
              <p>La courbe est un rectangle plat de largeur 5 (de 0 à 5) et de hauteur <><MathComponent math={"k"} /></>. L'aire est donc <><MathComponent math={"5 \\times k"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On résout <><MathComponent math={"5k = 1"} /></>, donc <><MathComponent math={"k = 1/5 = 0.2"} /></>. L'équation de la fonction est <><MathComponent math={"y = 0.2"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Simulateur" icon="🕹️" color="slate">
        <p className="mb-4">Test ton instinct, c'est facile !</p>
        <FillInTheBlanks 
          id="cont-eval"
          content={[
            "Mon bus passe entre 8h et 8h30 (30 minutes). Le temps d'attente suit une loi Uniforme sur l'intervalle [0; 30]. Je veux connaitre la proba d'attendre entre 10 et 20 minutes. La largeur de cet intervalle est de 10 min. La proba c'est ",
            { options: ["10/30", "20/30", "1/2"], correctAnswer: 0 },
            ". \nEt la proba d'attendre EXACTEMENT 15 minutes ? Elle vaut ",
            { options: ["0", "1/30", "15/30"], correctAnswer: 0 },
            " ! Car en continu, P(X = a) = 0."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si X suit une loi continue, que vaut P(X ≤ a) ?",
              options: [
                "L'intégrale de 'f' entre -∞ et a",
                "F(a)",
                "Les deux sont vrais"
              ],
              correctAnswer: 2,
              explanation: "C'est l'aire sous la courbe depuis le tout début jusqu'au point 'a'. Et puisqu'on l'évalue grâce à la primitive Grand F, F(a) - F(-∞) = F(a)."
            },
            {
              question: "L'Espérance (La moyenne) d'une loi uniforme sur [a; b], c'est quoi le plus logique ?",
              options: [
                "(b-a) / 2",
                "(a+b) / 2",
                "a * b"
              ],
              correctAnswer: 1,
              explanation: "Le milieu parfait ! Si tu attends de 10 à 20 min, en moyenne tu vas attendre (10+20)/2 = 15 minutes."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "En discret P(X=a) est la base. En continu P(X=a) = 0.",
            "Loi Uniforme sur [a; b] = Rectangle plat. Fct Densité = 1/(b-a).",
            "Moyenne (Espérance) d'une loi uniforme = (a+b)/2 le point milieu.",
            "Probabilité d'un intervalle = on calcule l'aire (l'intégrale) !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Terminale_11_Lois_Continues;
