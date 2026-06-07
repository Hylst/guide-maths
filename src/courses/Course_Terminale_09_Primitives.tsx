import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Terminale_09_Primitives: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [b, setB] = useState<number>(5);
  // Aire sous f(x)=2x entre 0 et b
  const aire = b * b;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-INT"
        title="Primitives & Intégrales"
        subtitle="Remonter le temps de la dérivation et mesurer des aires infiniment complexes."
        duration="55 min"
      />

      <Section title="⚠️ Introduction : Inverser le flux temporel" icon="⏳" color="emerald">
        <p>
          Si je te donne f(x) = x², tu sais la dériver en f'(x) = 2x. <br/>
          Mais si je te donne une vitesse v(x) = 2x, peux-tu <strong>deviner de quelle fonction elle provient</strong> ? Cette fonction originale s'appelle la <strong>Primitive</strong> (notée Grand F).
        </p>
        <p className="mt-2">
          Le coup de génie des mathématiques (le Théorème Fondamental de l'Analyse), c'est de lier cette manipulation algébrique abstraite avec un concept purement géométrique : <strong>Le calcul de l'Aire sous une courbe</strong> (l'Intégrale).
        </p>
      </Section>

      <Section title="⚖️ La quête du Graal F(x)" icon="🗡️" color="indigo">
        <p className="mb-4">
          Trouver une primitive est infiniment plus dur que dériver. Il n'y a pas de méthode mécanique universelle. Il faut bidouiller et reconnaitre des 'modèles'.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Puissance" 
            math={"\\text{Si } f(x) = x^n \\text{ alors } F(x) = \\frac{x^{n+1}}{n+1}"} 
          />
          <FormulaBox 
            title="La fameuse constante" 
            math={"\\text{Toute fct } F(x) + k \\text{ est aussi primitive (car la dérivée de } k \\text{ vaut 0)}"} 
          />
        </div>
        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>L'astuce suprême :</strong> Dérive toujours mentalement ta proposition de Primitive pour vérifier si tu retombes bien sur ta f(x) de départ ! C'est le seul chapitre où tu as le droit à une auto-vérification instantanée.
        </div>
      </Section>

      <Section title="🛠️ Le Simulateur d'Aire (Intégrale)" icon="📏" color="amber">
        <p className="mb-4">
          L'intégrale de f entre a et b correspond à l'Aire sous la courbe. <br/>Testerons avec la fonction f(x) = 2x. C'est une droite !
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Borne Supérieure 'b' = {b}</span>
              <input type="range" min="1" max="10" step="1" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="accent-amber-500 w-64" />
            </label>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Méthode Géométrique</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">La zone entre 0 et {b} est un Triangle !</p>
              <p className="font-mono mt-1">Base × Hauteur / 2</p>
              <p className="font-mono mt-1">{b} × (2×{b}) / 2</p>
              <p className="font-mono font-bold text-emerald-950 dark:text-emerald-50 text-xl mt-2">{aire} u.a.</p>
            </div>
            
            <div className="p-4 bg-rose-50/50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/60">
              <h4 className="font-bold text-sm text-rose-900 dark:text-rose-100 uppercase mb-2">Méthode Intégrale</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Primitive de 2x 👉 F(x) = x²</p>
              <p className="font-mono mt-1">∫(0 à {b}) 2x dx = F({b}) - F(0)</p>
              <p className="font-mono mt-1">{b}² - 0²</p>
              <p className="font-mono font-bold text-rose-950 dark:text-rose-50 text-xl mt-2">{aire} u.a.</p>
            </div>
          </div>
          <p className="mt-4 text-emerald-700 dark:text-emerald-300 font-bold">C'est le miracle des mathématiques. L'algèbre pure donne EXACTEMENT le résultat de la géométrie.</p>
        </div>
      </Section>

      <Section title="📜 Linéarité et Relation de Chasles" icon="⚡" color="rose">
        <p className="mb-4">Les intégrales se manipulent très facilement. C'est comme manipuler des blocs de Lego de différentes longueurs.</p>
        
        <div className="bg-card overflow-hidden rounded-xl border border-border divide-y divide-slate-200">
          <div className="p-4">
            <p className="font-bold text-rose-900 dark:text-rose-100">Relation de Chasles</p>
            <p className="font-mono text-sm mt-1">∫(a à c) f(x) dx = ∫(a à b) f(x) dx + ∫(b à c) f(x) dx</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Le calcul de l'aire de A à C est l'addition de l'aire de A à B, puis de B à C.</p>
          </div>
          <div className="p-4">
            <p className="font-bold text-indigo-900 dark:text-indigo-100">Inversion des bornes</p>
            <p className="font-mono text-sm mt-1">∫(b à a) f(x) dx = - ∫(a à b) f(x) dx</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Si tu remontes le temps (borne haut plus petite que borne bas), l'aire devient négative.</p>
          </div>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>L'intégrale (l'aire) est TOUJOURS positive.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Si la courbe est SOUS l'axe des abscisses, l'intégrale (calculée de gauche à droite) est NÉGATIVE. L'intégrale est une aire 'algébrique'.</span></>}
          />
          <Flashcard 
            front={<>Si f(x) = e^(3x), une primitive est F(x) = e^(3x).</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Si tu dérives e^(3x), ça fait 3*e^(3x). Pas e^(3x) ! Pour compenser, la primitive est <strong>(1/3) * e^(3x)</strong>.</span></>}
          />
        </div>
        <div className="mt-6">
          <TipBanner type="warning" title="Le piège des bornes">
            On calcule l'intégrale de 'a' à 'b' (où b est plus grand que a) en faisant la différence <><MathComponent math={"F(b) - F(a)"} /></>. Attention, si tu inverses les bornes de l'intégrale, alors l'aire calculée change de signe : <><MathComponent math={"\\int_a^b f(x)dx = - \\int_b^a f(x)dx"} /></>.
          </TipBanner>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Deviner une primitive simple"
          question={<p>Quelle est une primitive de <><MathComponent math={"f(x) = x^4"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Augmenter la puissance</p>
              <p>On sait qu'en dérivant, la puissance diminue de 1. Donc pour trouver une primitive, on fait l'inverse : on augmente la puissance de 1. Le candidat naturel est <><MathComponent math={"x^5"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Vérifier en dérivant et ajuster</p>
              <p>Si je dérive <><MathComponent math={"x^5"} /></>, j'obtiens <><MathComponent math={"5x^4"} /></>. Problème : j'ai un "5" en trop par rapport à <><MathComponent math={"x^4"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution :  Il faut diviser par 5. La primitive est donc <><MathComponent math={"F(x) = \\frac{x^5}{5}"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Calculer une intégrale de base"
          question={<p>Calculer la valeur de <><MathComponent math={"\\int_0^2 3x^2 dx"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Trouver la primitive</p>
              <p>Quelle fonction donne <><MathComponent math={"3x^2"} /></> quand on la dérive ? C'est <><MathComponent math={"F(x) = x^3"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer F(b) - F(a)</p>
              <p>On calcule F pour la borne du haut (2) et la borne du bas (0) : <><MathComponent math={"F(2) - F(0) = 2^3 - 0^3"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"2^3 = 8"} /></>. L'intégrale vaut 8 !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Simulateur d'Intégration" icon="🕹️" color="slate">
        <p className="mb-4">Calcule cette aire diabolique :</p>
        <FillInTheBlanks 
          id="int-eval"
          content={[
            "Je dois calculer l'aire sous la courbe f(x) = 3x² entre 1 et 2. D'abord, je devine la primitive F(x). Qu'est-ce qui donne 3x² quand je le dérive ? C'est ",
            { options: ["x³", "6x", "x⁴/4"], correctAnswer: 0 },
            ". \nEnsuite j'applique le calcul de l'intégrale : F(Borne Sup) - F(Borne Inf). Soit F(2) - ",
            { options: ["F(0)", "F(1)", "F(-1)"], correctAnswer: 1 },
            ". \nJe calcule F(2) = 2³ = 8. Je calcule F(1) = 1³ = 1. \nLe résultat final (l'aire) est 8 - 1 = ",
            { options: ["7", "9", "4"], correctAnswer: 0 },
            ". Bam."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai F(x) = ln(x) + C. Quelle était la fonction f(x) de départ qu'on cherchait à intégrer ?",
              options: [
                "1/x",
                "x",
                "e^x"
              ],
              correctAnswer: 0,
              explanation: "Rien de plus simple. On dérive la primitive ! La dérivée de ln(x) c'est 1/x. Donc oui, la primitive de 1/x c'est bien ln(x)."
            },
            {
              question: "Valeur Moyenne : La Formule μ = [1 / (b-a)] × ∫(a à b) f(x) dx sert à quoi ?",
              options: [
                "À trouver la médiane géométrique.",
                "À trouver la valeur constante qui aurait donné LA MÊME AIRE totale (le rectangle équivalent).",
                "À rien."
              ],
              correctAnswer: 1,
              explanation: "Imagine un champ de blé biscornu (f). Si tu aplanis toutes les bosses pour faire un rectangle plat parfait qui garde le même volume total de blé, la hauteur de ce rectangle, c'est la Valeur Moyenne."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle d'or : On dérive toujours la Primitive posée au brouillon pour se vérifier.",
            "L'Intégrale ∫ f(x) dx = F(b) - F(a).",
            "Si la courbe est en-dessous de 0, l'intégrale est négative !",
            "Une primitive s'écrit avec un '+ C' à la fin, pour signifier l'infinité des solutions parallèles."
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

export default Course_Terminale_09_Primitives;
