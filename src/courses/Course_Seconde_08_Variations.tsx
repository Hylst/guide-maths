import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Seconde_08_Variations: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-VAR"
        title="Variations & Étude de Fonctions"
        subtitle="Lire l'avenir dans les montagnes russes des courbes mathématiques."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Un langage visuel" icon="🎢" color="emerald">
        <p>
          Au lieu de donner de longs discours mathématiques pour expliquer qu'une fonction monte un peu, puis descend beaucoup, on utilise un outil redoutable : <strong>Le Tableau de Variations</strong>.
        </p>
        <p className="mt-2">
          C'est littéralement une carte au trésor simplifiée qui résume en quelques flèches toute l'histoire de la fonction. En Seconde, tu apprends à traduire un graphique en tableau, et un tableau en graphique.
        </p>
        
        <InfoBlock type="definition" title="Vocabulaire de la dynamique">
          - <strong>Croissante :</strong> La courbe MONTE (quand on la regarde de la gauche vers la droite).<br/>
          - <strong>Décroissante :</strong> La courbe DESCEND.<br/>
          - <strong>Maximum / Minimum (les Extremums) :</strong> Les sommets de la montagne ou le fond des vallées. M attention, on donne souvent la valeur de y (la hauteur) atteinte en x (la position).
        </InfoBlock>
      </Section>

      <Section title="⚖️ Lecture Graphique d'Inéquations" icon="👁️" color="indigo">
        <p className="mb-4">
          Résoudre f(x) = k, c'est facile : on trace un trait horizontal à la hauteur k sur l'axe Y, et on regarde où ça coupe la courbe en lisant les x.
          Mais pour les inéquations ?
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-6">
          <ul className="space-y-4">
            <li>
              <strong>Résoudre f(x) &gt; k :</strong> On cherche tous les <span className="font-mono bg-white px-1">x</span> pour lesquels la courbe de f est <strong>strictement AU-DESSUS</strong> de la ligne horizontale y=k. La réponse est un <strong>intervalle</strong> de l'axe des abscisses.
            </li>
            <li>
              <strong>Résoudre f(x) &le; g(x) :</strong> On cherche tous les <span className="font-mono bg-white px-1">x</span> pour lesquels la courbe f est <strong>EN DESSOUS ou au même niveau</strong> que la courbe g.
            </li>
          </ul>
        </div>

        <Accordion title="Pourquoi la réponse est souvent avec un symbole U (Union) ?">
          <div className="p-4 bg-white border border-slate-100 dark:border-slate-800/60 rounded-xl">
            <p>Imagine des montagnes russes (la courbe) avec de l'eau à hauteur 0. La courbe passe au-dessus de l'eau à gauche, plonge sous l'eau au milieu, puis remonte au-dessus à droite.</p>
            <p className="mt-2">Si on te demande f(x) &gt; 0 (les zones hors de l'eau), il y a 2 zones séparées ! La réponse sera par exemple <strong>[-5 ; -2] ∪ [4 ; 7]</strong>.</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🛠️ Le Tableau de Signes vs Tableau de Variations" icon="📝" color="amber">
        <p className="mb-4">Ne confonds jamais ces deux tableaux ! L'un gère le + et le -, l'autre gère les flèches Haut et Bas. Une fonction peut très bien être croissante tout en étant négative !</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">📊 Tableau de SIGNES</h4>
            <p className="text-sm text-emerald-950 dark:text-emerald-50 mb-2">On regarde si la courbe est <strong>au-dessus ou en-dessous</strong> de l'axe des abscisses (la mer).</p>
            <div className="font-mono bg-white p-2 rounded text-xs">
              x &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-∞ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+∞<br/>
              -------------------------------------------------<br/>
              f(x)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+
            </div>
            <p className="text-xs mt-2 text-emerald-700 dark:text-emerald-300">La fonction passe de négative à positive en croisant l'axe au point x=-2.</p>
          </div>

          <div className="p-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/60">
            <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">📈 Tableau de VARIATIONS</h4>
            <p className="text-sm text-amber-950 dark:text-amber-50 mb-2">On regarde si la courbe <strong>monte ou descend</strong>. Et là où les montagnes s'arrêtent, on note le Maximum/Minimum.</p>
            <div className="font-mono bg-white p-2 rounded text-xs leading-loose">
              x &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5<br/>
              -------------------------------------------------<br/>
              f(x)&nbsp;&nbsp;&nbsp;&nbsp; -5 ↘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↗ 12<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -10
            </div>
            <p className="text-xs mt-2 text-amber-700 dark:text-amber-300">Elle descend jusqu'à f(1)=-10, puis remonte au sommet f(5)=12.</p>
          </div>
        </div>
      </Section>

      <Section title="📜 La Parité (Paire / Impaire)" icon="🎭" color="rose">
        <p className="mb-4">Certaines fonctions ont le bon goût d'être symétriques, ce qui permet de diviser le travail d'étude par deux !</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Fonction PAIRE" 
            formula={<>f(-x) = f(x)</>} 
          />
          <FormulaBox 
            title="Fonction IMPAIRE" 
            formula={<>f(-x) = -f(x)</>} 
          />
        </div>
        <div className="mt-4 text-sm bg-rose-50/50 dark:bg-rose-900/20 p-3 rounded-lg border border-rose-100 dark:border-rose-800/60 text-rose-900 dark:text-rose-100">
          <strong>En dessin :</strong> Une fonction <strong>Paire</strong> (comme x²) est le reflet d'elle-même dans un miroir posé sur l'axe vertical (axe des ordonnées). Une fonction <strong>Impaire</strong> (comme x³) fait une rotation de 180° autour de l'origine O(0;0).
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux ?" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si le tableau de variations dit que la fonction est strictement croissante entre x=1 et x=5, est-ce que ça veut dire que les valeurs de y sont positives ?</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Elle peut très bien monter de y = -50 à y = -30. Elle est bien en train de monter (croissante), mais tout en restant sous l'eau (négative).</span></>}
          />
          <Flashcard 
            front={<>C'est quoi la différence entre f(x) ≥ 3 et f(x) &gt; 3 quand on lit la réponse sur l'axe des x ?</>}
            back={<>Les crochets !<br/><span className="text-sm">Avec ≥, on PREND le(s) point(s) où la droite coupe (crochets fermés). Avec &gt;, c'est STRICTEMENT au-dessus, on rejette le point exact (crochets ouverts).</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Lecture" icon="🕹️" color="slate">
        <p className="mb-4">Traduisons ensemble ce tableau de variations :</p>
        <FillInTheBlanks 
          id="var-eval"
          content={[
            "Je lis un tableau de variations. Pour x allant de -3 à 2, il y a une flèche qui descend de 5 à -1. Cela signifie que sur cet intervalle, la fonction f est ",
            { options: ["constante", "croissante", "décroissante"], correctAnswer: 2 },
            ". Le minimum atteint est ",
            { options: ["-1", "2", "-3"], correctAnswer: 0 },
            " et il est atteint en x = ",
            { options: ["2", "-1", "5"], correctAnswer: 0 },
            ". On me donne une information supplémentaire : la courbe g(x) est l'axe des abscisses. Les solutions de f(x) > g(x), c'est la même chose que résoudre l'inéquation ",
            { options: ["f(x) < 0", "f(x) > 0", "f(x) = 0"], correctAnswer: 1 },
            "."
          ]}
        />
      </Section>

      <Section title="8. Atelier de Lecture (Exercice Interactif)" icon="Brain" color="indigo">
        <InteractiveExercise 
          title="Décryptage du Tableau"
          question="Un tableau affiche une flèche montante de $x = -2$ (où $y = 1$) jusqu'à $x = 3$ (où $y = 8$). Quel est le maximum de la fonction sur cet intervalle et pour quel $x$ est-il atteint ?"
          steps={[
            <><strong>Étape 1 :</strong> On regarde le sens de la flèche. Elle monte, donc la fonction est croissante.</>,
            <><strong>Étape 2 :</strong> Le point le plus haut de cette flèche (le sommet) est à la fin de la flèche.</>,
            <><strong>Étape 3 :</strong> Au sommet de la flèche, on lit les valeurs : en haut c'est le <MathComponent math={"x"} /> et au bout de la flèche c'est le <MathComponent math={"y"} /> !</>,
            <><strong>Étape finale :</strong> Le maximum est donc <strong><MathComponent math={"8"} /></strong>, et il est atteint en <strong><MathComponent math={"x = 3"} /></strong>.</>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si f est une fonction PAIRE, et qu'on sait que f(4) = 10. Que vaut f(-4) ?",
              options: [
                "-10",
                "10",
                "-4"
              ],
              correctAnswer: 1,
              explanation: "Règle de la fonction Paire : f(-x) = f(x). Les opposés donnent exactement le même résultat ! Donc f(-4) = f(4) = 10."
            },
            {
              question: "Sur un tableau de variations de -5 à +5, il y a une flèche qui va de y=0 (en x=-5) à y=8 (en x=1), puis une flèche qui descend à y=-4 (en x=5). Quel est le Maximum global de la fonction ?",
              options: [
                "1",
                "8",
                "y=-4"
              ],
              correctAnswer: 1,
              explanation: "Le maximum est la plus grande valeur atteinte par f(x), c'est-à-dire l'altitude la plus élevée. Ici, l'altitude max est 8."
            },
            {
              question: "Résoudre graphiquement f(x) ≤ 0, c'est chercher les points de la courbe qui sont :",
              options: [
                "À gauche de l'axe des ordonnées.",
                "En bas à droite !",
                "Sous (ou sur) l'axe des abscisses."
              ],
              correctAnswer: 2,
              explanation: "f(x) représente la HAUTEUR (y). Donc c'est comme dire 'y ≤ 0', soit l'altitude est inférieure ou égale au niveau de la mer (l'axe des abscisses)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Variations = Flèches (Croissant/Décroissant). Signes = Pluses et Moins (+ / -).",
            "Moyennant le graphique, je sais trouver les intervalles où f(x) > k.",
            "L'Extremum (Max ou Min) est une valeur 'y', atteinte en 'x'.",
            "Une fonction paire est son propre reflet g/d (axe ordonnées)."
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

export default Course_Seconde_08_Variations;
