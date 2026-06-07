import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Seconde_03_Fonctions_Ref: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [xVal, setXVal] = useState<number>(2);

  const carre = xVal * xVal;
  const inverse = xVal !== 0 ? (1 / xVal).toFixed(2) : "Impossible !";
  const racine = xVal >= 0 ? Math.sqrt(xVal).toFixed(2) : "Impossible !";

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-FREF"
        title="Fonctions de Référence"
        subtitle="Le Panthéon des courbes mathématiques : Carré, Inverse, Racine et Cube."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Construire des châteaux" icon="🏰" color="emerald">
        <p>
          Au collège, tu as découvert les <strong>fonctions affines</strong> (des droites). Mais dans le monde réel, beaucoup de phénomènes ne sont pas droits : la chute d'une pomme, la croissance d'une population ou le volume d'une sphère.
        </p>
        <p className="mt-2">
          En Seconde, tu découvres les <strong>Fonctions de Référence</strong>. Ce sont les briques de base de l'analyse mathématique, comme les pièces d'un Lego géant. Connaître leurs courbes, c'est pouvoir modéliser presque n'importe quoi.
        </p>
        
        <InfoBlock type="definition" title="Qu'est-ce qu'une fonction de référence ?">
          C'est une fonction classique, connue de tous les mathématiciens, dont on connait par cœur le domaine de définition (sur quels x elle existe), les variations (quand elle monte ou descend) et l'allure de la courbe.
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Fonction Carrée f(x) = x²" icon="🎢" color="indigo">
        <p className="mb-4">
          La courbe la plus élégante du lycée. Elle s'appelle la <strong>Parabole</strong>.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl text-center mb-6">
          <p className="font-mono text-xl font-bold text-indigo-900 dark:text-indigo-100">
            f(x) = x²
          </p>
        </div>

        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Définie sur ℝ :</strong> On peut mettre n'importe quel nombre x au carré.</li>
          <li><strong>Positive :</strong> Un carré est <strong>toujours positif ou nul</strong> ! La courbe ne descend jamais sous l'axe (y &lt; 0 impossible).</li>
          <li><strong>Paire (Symétrie) :</strong> f(-x) = f(x). Exemple : (-3)² = 9, et 3² = 9. La courbe est symétrique par rapport à l'axe vertical (axe des ordonnées).</li>
          <li><strong>Variations :</strong> Décroissante pour les x négatifs (elle descend vers 0), puis Croissante pour les x positifs (elle remonte).</li>
        </ul>
      </Section>

      <Section title="🚀 Le Multivers des Fonctions" icon="🪐" color="amber">
        <p className="mb-4">
          Manipule la valeur de <span className="font-mono font-bold">x</span> pour voir comment les différentes fonctions réagissent.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="font-bold text-slate-600 dark:text-slate-400">x = </span>
            <input type="range" min="-5" max="5" step="0.5" value={xVal} onChange={(e) => setXVal(parseFloat(e.target.value))} className="w-48 accent-amber-500" />
            <span className="font-mono text-lg font-bold bg-card border border-slate-300 rounded px-2 w-16">{xVal}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-xl border-2 transition-all ${carre >= 0 ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/60' : 'bg-slate-100 border-border'}`}>
              <span className="block font-bold text-sm text-indigo-900 dark:text-indigo-100 uppercase mb-2">La Carrée : x²</span>
              <span className="font-mono text-xl font-bold text-indigo-950 dark:text-indigo-50">{carre}</span>
            </div>
            
            <div className={`p-4 rounded-xl border-2 transition-all ${xVal === 0 ? 'bg-rose-100 border-rose-300 animate-pulse' : 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/60'}`}>
              <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">L'Inverse : 1/x</span>
              <span className={`font-mono text-xl font-bold ${xVal === 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-950 dark:text-emerald-50'}`}>{inverse}</span>
              {xVal === 0 && <p className="text-xs text-rose-900 dark:text-rose-100 font-bold mt-2">Division par zéro interdite ! Asymptote verticale !</p>}
            </div>

            <div className={`p-4 rounded-xl border-2 transition-all ${xVal < 0 ? 'bg-rose-100 border-rose-300 animate-pulse' : 'bg-purple-50/50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/60'}`}>
              <span className="block font-bold text-sm text-purple-900 dark:text-purple-100 uppercase mb-2">La Racine : √x</span>
              <span className={`font-mono text-xl font-bold ${xVal < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-purple-950 dark:text-purple-50'}`}>{racine}</span>
              {xVal < 0 && <p className="text-xs text-rose-900 dark:text-rose-100 font-bold mt-2">La racine d'un nombre négatif n'existe pas dans R !</p>}
            </div>
          </div>
        </div>
      </Section>

      <Section title="📜 La Galerie d'Art" icon="🖼️" color="rose">
        <p className="mb-4">Tu dois reconnaitre à vue l'allure de leurs courbes.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="La Parabole (x²)" 
            formula={<>Un grand U tourné vers le haut.<br/><span className="text-sm font-normal">Symétrique à gauche et à droite de l'axe des ordonnées. Passe par l'origine O(0;0).</span></>} 
          />
          <FormulaBox 
            title="L'Hyperbole (1/x)" 
            formula={<>Deux branches détachées.<br/><span className="text-sm font-normal">La courbe est coupée en deux car x=0 est interdit ! Symétrique par rapport à l'origine (Fonction Impaire).</span></>} 
          />
          <FormulaBox 
            title="La Demi-Parabole (√x)" 
            formula={<>Un arc qui part de zéro et monte lentement.<br/><span className="text-sm font-normal">Elle n'existe QUE pour x positif. Fonction strictement croissante.</span></>} 
          />
          <FormulaBox 
            title="Le S (x³)" 
            formula={<>Une courbe en S qui monte toujours.<br/><span className="text-sm font-normal">(-2)³ = -8. La courbe monte, marque une pause en 0, puis repart vers le haut. Impaire.</span></>} 
          />
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux : L'ordre des puissances" icon="🔦" color="purple">
         <p className="mb-4">Où est passé ton bon sens ? Un carré est-il <strong>toujours</strong> plus grand que le nombre de départ ?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si x = 5, que dire de x et x² ?</>}
            back={<>5² = 25. <strong>25 &gt; 5. Donc x² &gt; x.</strong><br/><span className="text-sm">Logique.</span></>}
          />
          <Flashcard 
            front={<>Mais si x = 0.5, que dire de x et x² ?</>}
            back={<>0.5² = 0.25 ! <strong>0.25 &lt; 0.5. Donc x² &lt; x.</strong><br/><span className="text-sm">Attention : Entre 0 et 1, élever au carré RAPETISSE le nombre !</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Comparer des carrés"
          question={<p>Connaissant le sens de variation de la fonction carrée, comparer (sans les calculer) les nombres <><MathComponent math={"(-3,14)^2"} /></> et <><MathComponent math={"(-3,15)^2"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Placer les nombres</p>
              <p>Les nombres <><MathComponent math={"a = -3,15"} /></> et <><MathComponent math={"b = -3,14"} /></> sont négatifs. L'ordre de ces nombres est : <><MathComponent math={"-3,15 < -3,14"} /></> (celui qui a le plus de dettes est le plus petit).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer la fonction</p>
              <p>Sur l'intervalle <><MathComponent math={"]-\\infty; 0]"} /></> (les négatifs), la fonction carrée [<><MathComponent math={"x \\mapsto x^2"} /></>] est strictement DÉCROISSANTE. Cela signifie qu'elle INVERSE l'ordre.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Puisque <><MathComponent math={"a < b"} /></>, alors <><MathComponent math={"a^2 > b^2"} /></>. <br/>Donc : <><MathComponent math={"(-3,15)^2 > (-3,14)^2"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Résoudre une inéquation graphique"
          question={<p>Résoudre l'inéquation <><MathComponent math={"\\sqrt{x} > 3"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le domaine de définition</p>
              <p>D'abord, la racine n'existe que si <><MathComponent math={"x \\ge 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Mettre au carré</p>
              <p><><MathComponent math={"\\sqrt{x}"} /></> et 3 sont des nombres positifs. Mettre au carré des nombres positifs conserve l'ordre ! Donc <><MathComponent math={"x > 3^2"} /></> ce qui donne <><MathComponent math={"x > 9"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Les solutions sont tous les nombres strictement supérieurs à 9. En intervalle : <><MathComponent math={"S = ]9 ; +\\infty["} /></>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Simulateur d'Identification" icon="🕹️" color="slate">
        <p className="mb-4">Remplis l'étude de ces fonctions mythiques :</p>
        <FillInTheBlanks 
          id="fref-eval"
          content={[
            "La fonction inverse f(x) = 1/x n'est pas définie en 0. Sur ]-∞; 0[ et sur ]0; +∞[, elle est strictement ",
            { options: ["croissante", "décroissante", "constante"], correctAnswer: 1 },
            ". La courbe de la fonction carrée est symétrique par rapport à l'axe des ",
            { options: ["abscisses", "ordonnées", "droites"], correctAnswer: 1 },
            ", ce qui traduit le fait qu'elle est PAIRE. À l'inverse, f(x)=x³ est symétrique par rapport à l'",
            { options: ["origine (0,0)", "axe des abscisses", "infinité"], correctAnswer: 0 },
            ", elle est donc IMPAIRE. Enfin, si on compare 0.8 et (0.8)², on sait que ",
            { options: ["(0.8)² > 0.8", "(0.8)² < 0.8"], correctAnswer: 1 },
            " car 0.8 est compris entre 0 et 1."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si a < b < 0 (deux nombres négatifs, a plus petit que b). Comment se classent a² et b² ?",
              options: [
                "a² < b²",
                "a² > b²",
                "Impossible à dire sans les valeurs."
              ],
              correctAnswer: 1,
              explanation: "Règle de 'rangement' : la fonction carrée est DÉCROISSANTE sur l'intervalle des nombres négatifs. Donc elle INVERSE l'ordre. Si a = -5 et b = -2 (-5 < -2), on a a²=25 et b²=4, donc 25 > 4."
            },
            {
              question: "Quel est le domaine de définition de f(x) = √(x) ?",
              options: [
                "ℝ (tous les réels)",
                "]-∞; 0]",
                "[0; +∞["
              ],
              correctAnswer: 2,
              explanation: "On ne peut calculer la racine que d'un nombre POSITIF OU NUL. Donc de 0 (inclus) jusqu'à +l'infini."
            },
            {
              question: "Comment s'appelle la courbe représentative de la fonction Inverse (1/x) ?",
              options: [
                "Une Parabole",
                "Une Hyperbole",
                "Une Asymptote"
              ],
              correctAnswer: 1,
              explanation: "C'est l'Hyperbole. (L'asymptote n'est pas une courbe, c'est la droite dont l'hyperbole se rapproche infiniment sans la toucher)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Parabole (Carré) : Paire, ne descend pas sous 0, décroît puis croît.",
            "Hyperbole (Inverse) : Impaire, interdite en 0, toujours décroissante séparément.",
            "Racine Carrée : Réservée aux nombres positifs, croissante.",
            "L'ordre des choses : Entre 0 et 1, x³ < x² < x < √x. Mais après 1, √x < x < x² < x³ !"
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

export default Course_Seconde_03_Fonctions_Ref;
