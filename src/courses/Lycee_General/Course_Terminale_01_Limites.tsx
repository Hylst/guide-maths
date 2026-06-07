import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_01_Limites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [xVal, setXVal] = useState<number>(10);

  // Pour illustrer lim 1/x
  const limValue = (1 / xVal).toFixed(4);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-LIM"
        title="Limites & Continuité"
        subtitle="Voyage vers l'infini, Asymptotes, et le pouvoir du TVI."
        duration="60 min"
      />

      <Section title="⚠️ Introduction : Toucher l'Intouchable" icon="🚀" color="emerald">
        <p>
          Que se passe-t-il tout au bout de l'axe des abscisses, là où l'humain ne peut plus aller ? L'infini n'est pas un nombre, c'est un concept, une direction.
        </p>
        <p className="mt-2">
          La notion de <strong>Limite</strong> (notée <span className="italic font-serif">lim</span>) nous permet mathématiquement de calculer ce qui se passe quand on se <em>rapproche</em> d'une valeur interdite, ou quand on tend vers l'infini. C'est l'outil ultime pour tracer des courbes parfaites avec leurs asymptotes !
        </p>
        
        <InfoBlock type="definition" title="Notation Officielle">
          <span className="font-mono bg-card px-2 py-1 rounded">lim (x → +∞) f(x) = L</span><br/>
          Se lit : "La limite de f(x) quand x tend vers plus l'infini est égale à L."
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Guerre des Infinis (Règles Opératoires)" icon="⚔️" color="indigo">
        <p className="mb-4">
          Un grand nombre plus un grand nombre, ça fait quoi ? Toujours plus grand ! Mais l'infini multiplié par 0, ça donne quoi ?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-4 border border-border rounded-xl shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">✅ Ce qui marche bien</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>+∞ + (+∞) = +∞</strong> (Monstrueux + Monstrueux)</li>
              <li><strong>+∞ × (+∞) = +∞</strong></li>
              <li><strong>L / ∞ = 0</strong> (Un gâteau divisé par une infinité de personnes : chacun reçoit une miette indivisible, soit 0).</li>
            </ul>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-900/20 p-4 border border-rose-100 dark:border-rose-800/60 rounded-xl shadow-sm">
            <h4 className="font-bold text-rose-900 dark:text-rose-100 mb-2">☠️ Les 4 Formes Indéterminées (FI)</h4>
            <p className="text-sm text-rose-950 dark:text-rose-50 mb-2">La calculette explose. Le cerveau bugge. Il va falloir ruser (factoriser, développer) pour lever l'indétermination !</p>
            <ul className="space-y-1 text-sm font-mono text-rose-900 dark:text-rose-100">
              <li>1. ∞ - ∞</li>
              <li>2. 0 × ∞</li>
              <li>3. ∞ / ∞</li>
              <li>4. 0 / 0</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="🛠️ Le Simulateur d'Asymptote (f(x) = 1/x)" icon="🔬" color="amber">
        <p className="mb-4">
          Que fait la fonction inverse (1/x) quand x devient titanesque ?
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center mb-6">
             <label className="flex flex-col items-center w-full max-w-sm">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Fais tendre x vers +∞ (De 10 à 10 000)</span>
              <input type="range" min="10" max="10000" step="10" value={xVal} onChange={(e) => setXVal(parseInt(e.target.value))} className="accent-amber-500 w-full" />
            </label>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60 inline-block text-left relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-emerald-100 opacity-50">
              <span className="text-6xl">∞</span>
            </div>
            <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Valeur de f(x)</span>
            <div className="font-mono text-lg text-emerald-950 dark:text-emerald-50 z-10 relative">
              <p>Pour x = {xVal}, f(x) = {limValue}</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">Plus x grandit, plus le résultat se rapproche inlassablement de ZÉRO. On dit que <strong>la droite y=0 est une Asymptote Horizontale</strong>.</p>
        </div>
      </Section>

      <Section title="📜 La Croissance Comparée (Le Jeu de Pouvoir)" icon="⚡" color="rose">
        <p className="mb-4">Quand on tombe sur la Formule Indéterminée "+∞ / +∞", qui gagne la course vers l'infini ? L'exponentielle (e^x), la puissance (xⁿ) ou logarithme (ln) ?</p>
        
        <FormulaBox 
          title="L'Ordre Sacré vers +∞" 
          formula={<>ln(x) &lt;&lt;&lt; x^n &lt;&lt;&lt; e^x</>} 
        />
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 bg-card p-3 border border-border rounded-lg">Exemple : lim(e^x / x) en +∞. L'exponentielle est infiniment plus forte que x. C'est elle qui impose sa loi. Le résultat est +∞. À l'inverse, lim(ln(x) / x) en +∞ donne 0, car le x du bas écrase le ln du haut !</p>
      </Section>

      <Section title="🧠 Continuité et le surpuissant TVI" icon="🔦" color="purple">
         <p className="mb-4">Une fonction est <strong>continue</strong> si on peut tracer sa courbe "sans lever le crayon". Si c'est le cas, elle débloque un théorème magique.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le Théorème des Valeurs Intermédiaires (TVI), c'est quoi ?</>}
            back={<>Si tu es en bas de la montagne (y=-5), que tu veux monter au sommet (y=10), et que le chemin est continu... tu seras FORCÉMENT passé par toutes les altitudes intermédiaires (comme y=0) au moins une fois !</>}
          />
          <Flashcard 
            front={<>Le TVI Corollaire, pour trouver la solution UNIQUE de f(x)=0 ?</>}
            back={<>Il faut 3 conditions !<br/>1. f est <strong>Continue</strong>.<br/>2. f change de signe (le fameux [-5; 10]).<br/>3. f est <strong>Strictement Monotone</strong> (elle ne fait que monter ou que descendre).</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul de limite d'un polynôme"
          question={<p>Déterminer la limite de <><MathComponent math={"f(x) = -3x^3 + 2x^2 + 5"} /></> quand <><MathComponent math={"x \\to +\\infty"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Règle du plus haut degré</p>
              <p>En <><MathComponent math={"+\\infty"} /></> et <><MathComponent math={"-\\infty"} /></>, un polynôme a la même limite que son terme de plus haut degré.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Isoler ce terme</p>
              <p>Ici, le terme dominant est <><MathComponent math={"-3x^3"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : lim <><MathComponent math={"x^3"} /></> en <><MathComponent math={"+\\infty"} /></> vaut <><MathComponent math={"+\\infty"} /></>. Multiplié par -3 (un négatif), la limite s'inverse. La limite finale vaut donc <><MathComponent math={"-\\infty"} /></> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Forme Indéterminée et Factorisation"
          question={<p>Lever l'indétermination et calculer la limite de <><MathComponent math={"g(x) = \\frac{2x^2 + 3}{x^2 - 1}"} /></> quand <><MathComponent math={"x \\to +\\infty"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Constater l'indéterminée</p>
              <p>Le haut tend vers <><MathComponent math={"+\\infty"} /></>, le bas tend vers <><MathComponent math={"+\\infty"} /></>. C'est la forme "∞ / ∞".</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Astuce des fonctions rationnelles</p>
              <p>Comme pour les polynômes, on peut factoriser par le terme de plus haut degré en haut et en bas, ce qui revient à ne conserver QUE les termes de plus haut degré de chaque côté !</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Simplifier la fraction</p>
              <p>On regarde <><MathComponent math={"\\frac{2x^2}{x^2}"} /></>... Que l'on peut simplifier dramatiquement en barrant les <><MathComponent math={"x^2"} /></> !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Il reste juste 2/1. La limite de <><MathComponent math={"g(x)"} /></> et l'asymptote horizontale de la courbe est donc la ligne <><MathComponent math={"y = 2"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Théorème" icon="🕹️" color="slate">
        <p className="mb-4">La rédaction du Corrolaire du TVI doit être parfaite au Bac :</p>
        <FillInTheBlanks 
          id="lim-eval"
          content={[
            "La fonction f est un polynôme, elle est donc ",
            { options: ["discontinue", "continue", "paire"], correctAnswer: 1 },
            " et dérivable sur ℝ. D'après le tableau de variations, f est ",
            { options: ["strictement croissante", "strictement mignonne", "sérieusement descendante"], correctAnswer: 0 },
            " sur l'intervalle [0; 5]. De plus f(0) = -2 et f(5) = 8. Le nombre ",
            { options: ["5", "0", "8"], correctAnswer: 1 },
            " est bien compris entre f(0) et f(5) car ils sont de signes contraires. D'après le ",
            { options: ["TKI (Kilo)", "TVI", "TDI"], correctAnswer: 1 },
            ", l'équation f(x)=0 admet une ",
            { options: ["infinité de solutions", "unique solution α", "solution négative"], correctAnswer: 1 },
            " sur l'intervalle [0; 5]."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle limite est une FORME INDÉTERMINÉE ?",
              options: [
                "0 / +∞",
                "+∞ + (-∞)",
                "(-∞) × (-∞)"
              ],
              correctAnswer: 1,
              explanation: "0 / ∞ ça fait 0 (0 diviser par un truc immense). -∞ × -∞ ça fait +∞ (règle des signes). Par contre, +∞ - ∞, personne ne sait qui l'emporte, c'est une F.I. !"
            },
            {
              question: "Si lim(x→2) f(x) = +∞. Qu'est ce qu'on peut dire graphiquement ?",
              options: [
                "La droite y=2 est asymptote horizontale.",
                "La droite x=2 est asymptote verticale.",
                "Il n'y a pas d'asymptote."
              ],
              correctAnswer: 1,
              explanation: "Quand on se rapproche de x=2 (un point FIXE), la courbe s'envole vers le plafond. Le mur invisible vertical est situé en x=2 !"
            },
            {
              question: "Grâce aux croissances comparées, que vaut lim (x→+∞) d'un polynôme comme (x³ - 50x²) ?",
              options: [
                "-∞",
                "0",
                "+∞"
              ],
              correctAnswer: 2,
              explanation: "En +∞ et -∞, c'est le terme de PLUS HAUT DEGRÉ qui impose sa loi ! Ici le x³ gagne contre le x². Donc c'est la limite de x³, soit +∞."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais les 4 Formes Indéterminées par cœur (0/0, ∞/∞, 0×∞, ∞-∞).",
            "Pour les polynômes en ∞ : seul le boss final (le terme du plus haut degré) compte.",
            "L'Exponentielle (e^x) explose toutes les autres fonctions en +∞ (Croissance Comparée).",
            "TVI Corollaire = 3 mots clés : Continue, Strictement Monotone, Changement de Signe !"
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

export default Course_Terminale_01_Limites;
