import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Post_Bac_06_Integration: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-INTEG"
        title="Intégration et Primitives Avancées"
        subtitle="Intégrales Généralisées (impropres), Riemann, Lebesgue et les changements de variables."
        duration="1h 25"
      />

      <Section title="⚠️ Introduction : Oublie l'intervalle gentil [a, b]" icon="🌊" color="emerald">
        <p>
          Au Lycée, on calcule des intégrales sur un domaine borné, comme entre 0 et 5. On n'a jamais de problème grave car la fonction ne part ni à l'infini (en ordonnées), ni ne s'étale sur la longueur éternellement (en abscisses).
        </p>
        <p className="mt-2">
          En post-bac, on casse les murs. Que se passe-t-il si la borne va jusqu'à <strong>+∞</strong> ? Qu'est-ce qui arrive si on veut l'aire sous 1/x de <strong>0</strong> à 1 (alors qu'en 0, la fonction part à l'infini verticale !) ? On appelle ça une intégrale Généralisée ou Impropre.
        </p>
      </Section>

      <Section title="⚖️ Nature de l'intégrale : Converge ou Diverge ?" icon="🔭" color="indigo">
        <p className="mb-4">
          C'est le même combat que pour les Séries Numériques. On ne cherche pas à connaitre la valeur exacte en priorité. On cherche à savoir si l'aire totale est FINIE (Convergente) ou INFINIE / Indéfinie (Divergente).
        </p>
        
        <TipBanner type="info" title="L'Astuce des Équivalents">
          Comme pour les Séries Numériques, le but de l'étudiant est de se débarrasser des calculs immenses en disant : "Ma fonction compliquée ressemble beaucoup à 1/x² en l'infini. Or je SAIS que 1/x² converge. Donc ma fonction compliquée converge ! " (C'est le théorème de Comparaison, valable UNIQUEMENT pour les fonctions positives f{">"}0).
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormulaBox 
            title="La Convergence en +∞" 
            math={"\\int_{a}^{+\\infty} f(x) dx \\\\ \\text{La courbe de f s'écrase sur 0}"} 
          />
          <FormulaBox 
            title="La Convergence en 'b'" 
            math={"\\int_{a}^{b} f(x) dx \\\\ \\text{Où un mur infini se dresse en x=b}"} 
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Intégrale Impropre en +∞"
          question={<p>Étudier la convergence de l'intégrale <><MathComponent math={"\\int_{1}^{+\\infty} \\frac{1}{x^2 + \\sqrt{x}} dx"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le comportement à l'infini</p>
              <p>On cherche un équivalent de la fonction quand <><MathComponent math={"x \\to +\\infty"} /></>. Au dénominateur, entre <><MathComponent math={"x^2"} /></> et <><MathComponent math={"\\sqrt{x}"} /></>, c'est <><MathComponent math={"x^2"} /></> le terme dominant.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'équivalent</p>
              <p>Donc <><MathComponent math={"\\frac{1}{x^2 + \\sqrt{x}} \\sim \\frac{1}{x^2}"} /></> en <><MathComponent math={"+\\infty"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Par le théorème de Riemann, l'intégrale de <><MathComponent math={"\\frac{1}{x^2}"} /></> sur ["<MathComponent math={"1, +\\infty"} />"] converge car <><MathComponent math={"\\alpha = 2 > 1"} /></>. Comme les fonctions sont positives, par théorème de comparaison, notre intégrale CONVERGE également !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Intégrale Impropre en 0"
          question={<p>Étudier la convergence de l'intégrale <><MathComponent math={"\\int_{0}^{1} \\frac{1}{\\sqrt{x^3 + x}} dx"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le comportement en 0</p>
              <p>Cette fois, on est au voisinage de 0. Le terme dominant n'est plus la plus grande puissance, mais la plus petite ! Donc en 0, <><MathComponent math={"x^3 + x \\sim x"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'équivalent</p>
              <p>On en déduit que <><MathComponent math={"\\frac{1}{\\sqrt{x^3 + x}} \\sim \\frac{1}{\\sqrt{x}} = \\frac{1}{x^{0.5}}"} /></> quand <><MathComponent math={"x \\to 0^+"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : D'après les critères de Riemann en 0, l'intégrale de <><MathComponent math={"\\frac{1}{x^{0.5}}"} /></> converge car <><MathComponent math={"\\alpha = 0.5 < 1"} /></>. L'intégrale est donc CONVERGENTE !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📜 Les Critères de Riemann (Les Mètres-Étalons)" icon="📏" color="amber">
        <p className="mb-4">
          Ce sont vos constantes universelles d'intégration. Tout l'exercice consistera à ramener votre monstre vers l'un de ces deux cas de référence.
        </p>
        
        <div className="flex flex-col gap-4">
            <div className="p-4 bg-card border border-amber-100 dark:border-amber-800/60 rounded-xl">
                <span className="font-bold text-amber-900 dark:text-amber-100">1. Le problème de LA LONGUEUR (en +∞)</span>
                <p className="text-sm mt-2">L'intégrale de 1 / x^a de [1 à +∞] CONVERGE <strong>si et seulement si a &gt; 1</strong>.<br/> <span className="italic">(Il faut que ça s'écrase vite vers la droite. a=2, l'aire totale est bornée. a=1, il en reste trop, ça diverge à l'infini).</span></p>
            </div>
            <div className="p-4 bg-card border border-amber-100 dark:border-amber-800/60 rounded-xl">
                <span className="font-bold text-amber-900 dark:text-amber-100">2. Le problème de LA HAUTEUR (en 0)</span>
                <p className="text-sm mt-2">L'intégrale de 1 / x^a de [0 à 1] CONVERGE <strong>si et seulement si a &lt; 1</strong>.<br/> <span className="italic">(En zéro, l'asymptote devient la star. Pour converger, on veut une racine. Il faut que a=0.5. Si a=2 pour 1/x², alors la "colonne" est si gigantesque qu'elle pèse une aire infinie !).</span></p>
            </div>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si Intégrale de f(x) converge, alors f(x) doit forcément tendre vers 0.</>}
            back={<><strong>FAUX ! (Piège atroce).</strong><br/><span className="text-sm">Grosse exception par rapport aux séries. Avec les intégrales, tu peux avoir des "pics" très très hauts (elle ne tend pas vers 0) mais si ces pics sont très très FINS (largeur de plus en plus petite), l'aire du pic vaut presque 0. L'aire totale peut tout même converger !</span></>}
          />
          <Flashcard 
            front={<>Le changement de variable dt = dx / 2, c'est légal ?</>}
            back={<><strong>VRAI ! (Et c'est vital).</strong><br/><span className="text-sm">Si tu veux intégrer cos(2x), alors tu poses u = 2x. Donc la différentielle (la variation ultra petite) devient du = 2 * dx. Donc dx = du / 2 ! En changeant de monde, tu dois juste ajuster la taille de la règle millimétrique =).</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Changement de Règles" icon="🕹️" color="slate">
        <FillInTheBlanks 
          id="pb-integ-eval"
          content={[
            "Soit I l'intégrale de 1 / (1 + x²). Le cours dit que la primitive de ça, c'est la fonction ",
            { options: ["log(1+x²)", "arctan(x)", "-1/x"], correctAnswer: 1 },
            ". \nOr je veux calculer de -∞ à +∞ l'aire sous cette cloche. On sait que arctan a pour limites -π/2 en l'infini gauche et +π/2 en l'infini droit. Par le calcul des bornes F(b) - F(a) = (π/2) - (-π/2) = ",
            { options: ["0", "π", "L'infini"], correctAnswer: 1 },
            ". \nC'est merveilleux ! Une courbe illimitée dans l'espace qui englobe la surface magique exacte de Pi !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'étudie une intégrale avec DEUX soucis en même temps (un problème en zéro à cause de la division par x, et un problème en +infini à cause de la borne). Que dois-je faire ?",
              options: [
                "Je multiplie les deux équivalents.",
                "Je coupe l'intégrale en DEUX grâce à la relation de Chasles.",
                "Je pose x = 1/t"
              ],
              correctAnswer: 1,
              explanation: "Il est VITAL d'isoler les problèmes malades. Par exemple on va couper arbitrairement en x=1. On s'occupera d'une part de [0 à 1] avec l'équivalent de x=0. Et de l'autre de [1 à l'infini] avec son propre comportement. Si les deux convergent séparément, le grand Tout converge !"
            },
            {
              question: "Quelle est la primitive de ln(x) ?",
              options: [
                "1 / x",
                "x*ln(x) - x",
                "x * e^x"
              ],
              correctAnswer: 1,
              explanation: "Grand classique qu'il faut retenir par coeur ! On le retrouve en faisant une Intégration par Partie (IPP) où on feinte en disant que l'intégrale = 1 * ln(x). On dérive le log, et on intègre le 1."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je commence toujours par vérifier l'existence Continue ou non de la courbe.",
            "Relation de Chasles pour isoler les Singularités et l'infini.",
            "Comparaison avec l'Étalon RIEMANN (soit en ∞, soit en 0).",
            "La Convergence Absolue (mettre la fonction dans |f|) entraine de facto la convergence simple."
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

export default Course_Post_Bac_06_Integration;
