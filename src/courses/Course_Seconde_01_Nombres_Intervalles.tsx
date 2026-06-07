import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, Accordion, InteractiveExercise, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Seconde_01_Nombres_Intervalles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [val1, setVal1] = useState<number>(-2);
  const [val2, setVal2] = useState<number>(3);

  const unionMin = Math.min(val1, val2) - 1;
  const unionMax = Math.max(val1, val2) + 2;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-INT"
        title="Nombres et Intervalles"
        subtitle="L'alphabet des Mathématiques et le domaine du continu."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : Les Ensembles de Nombres" icon="🌍" color="emerald">
        <p>
          En mathématiques, les nombres ne flottent pas dans le vide. Ils appartiennent à des grandes "familles" emboîtées les unes dans les autres, comme des poupées russes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-muted p-4 border border-border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 font-serif text-lg mb-1">ℕ - Entiers Naturels</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">0, 1, 2, 3... Les nombres pour compter les moutons. Positifs et sans virgule.</p>
          </div>
          <div className="bg-muted p-4 border border-border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 font-serif text-lg mb-1">ℤ - Entiers Relatifs</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">... -2, -1, 0, 1, 2 ... La famille de la température et de la banque. Avec le moins !</p>
          </div>
          <div className="bg-muted p-4 border border-border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 font-serif text-lg mb-1">𝔻 - Décimaux</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">2.5 ; -4.125. Nombre fini de chiffres après la virgule (la division s'arrête).</p>
          </div>
          <div className="bg-muted p-4 border border-border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 font-serif text-lg mb-1">ℚ - Rationnels</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">1/3 ; 5/7. Toutes les fractions. La division peut ne jamais s'arrêter mais tourne en boucle.</p>
          </div>
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 border border-indigo-100 dark:border-indigo-800/60 rounded-xl md:col-span-2">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 font-serif text-lg mb-1">ℝ - Nombres Réels</h4>
            <p className="text-sm text-indigo-950 dark:text-indigo-50">TOUS les nombres ! Y compris les monstres irrationnels comme π ou √2 (qui ne s'arrêtent jamais et ne tournent pas en boucle).</p>
          </div>
        </div>

        <div className="mt-6">
          <TipBanner type="warning" title="Piège classique">
            Attention, le nombre <><MathComponent math={"\\frac{10}{2}"} /></> est une fraction, donc à première vue on pourrait dire qu'il appartient uniquement à <><MathComponent math={"\\mathbb{Q}"} /></> (Rationnels). Mais c'est faux ! <><MathComponent math={"\\frac{10}{2} = 5"} /></>, c'est donc d'abord un entier naturel <><MathComponent math={"\\mathbb{N}"} /></> (et donc il appartient à tous les autres groupes plus grands).
          </TipBanner>
        </div>
      </Section>

      <Section title="⚖️ La Magie des Intervalles" icon="📏" color="indigo">
        <p className="mb-4">
          Un <strong>intervalle</strong> est un morceau continu de la droite des réels. <br/>
          On utilise des <strong>crochets</strong> pour dire si on "prend" ou si on "rejette" les nombres aux bords.
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-center gap-3">
            <span className="font-mono bg-slate-100 px-2 py-1 rounded font-bold w-16 text-center">[-2; 3]</span>
            <span>x est compris entre -2 et 3, <strong>inclus</strong>. Un crochet qui embrasse le nombre veut dire qu'il est dedans.</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="font-mono bg-slate-100 px-2 py-1 rounded font-bold w-16 text-center">]-2; 3[</span>
            <span>x est strictement compris entre -2 et 3. Les crochets tournent le dos : on <strong>exclut</strong> les bords.</span>
          </li>
          <li className="flex items-center gap-3 text-rose-700 dark:text-rose-300">
            <span className="font-mono bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/60 px-2 py-1 rounded font-bold w-16 text-center">[1; +∞[</span>
            <span>Pour l'infini, le crochet est <strong>TOUJOURS OUVERT</strong> (tourné vers l'extérieur). On ne peut pas attraper l'infini !</span>
          </li>
        </ul>
      </Section>

      <Section title="🛠️ Simulateur Union (∪) et Intersection (∩)" icon="🔗" color="amber">
        <p className="mb-4">
          On peut coller ensemble ou superposer des intervalles !<br/>
          <strong>L'Intersection (∩)</strong> : C'est le "ET". Les nombres qui sont DANS l'un ET DANS l'autre (la zone commune).<br/>
          <strong>L'Union (∪)</strong> : C'est le "OU". Les nombres qui sont dans l'un, OU dans l'autre, OU dans les deux (la grande fusion).
        </p>
        
        <div className="bg-card border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex gap-4 items-center justify-center mb-6 border-b pb-4">
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-3 rounded-lg text-indigo-950 dark:text-indigo-50 font-mono">
              I = [{val1}; 5]
            </div>
            <div className="bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/60 p-3 rounded-lg text-rose-950 dark:text-rose-50 font-mono">
              J = [0; {val2}]
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Bord de I</span>
              <input type="range" min="-5" max="-1" step="1" value={val1} onChange={(e) => setVal1(parseInt(e.target.value))} className="accent-indigo-500 w-24" />
            </label>
            <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Bord de J</span>
              <input type="range" min="1" max="10" step="1" value={val2} onChange={(e) => setVal2(parseInt(e.target.value))} className="accent-rose-500 w-24" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60">
              <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Intersection I ∩ J (Commune)</span>
              <span className="font-mono text-lg font-bold">
                 {Math.max(val1, 0)} &le; x &le; {Math.min(5, val2)} <br/>
                [{Math.max(val1, 0)}; {Math.min(5, val2)}]
              </span>
            </div>
            <div className="p-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/60">
              <span className="block font-bold text-sm text-amber-900 dark:text-amber-100 uppercase mb-2">Union I ∪ J (Fusion)</span>
              <span className="font-mono text-lg font-bold">
                 [{Math.min(val1, 0)}; {Math.max(5, val2)}]
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Cartes de la Distance" icon="⚡" color="purple">
         <p className="mb-4">Dernier concept de Seconde : la <strong>Valeur Absolue</strong>, notée |x|.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Que fait mathématiquement la valeur absolue <strong>|x|</strong> ?</>}
            back={<>Elle donne la 'distance' par rapport à Zéro. Elle rend tout le monde <strong>positif</strong> !<br/>|-5| = 5, et |3| = 3.</>}
          />
          <Flashcard 
            front={<>Que signifie l'inéquation <strong>|x| &le; 2</strong> ?</>}
            back={<>Cela signifie que la distance entre x et 0 est plus petite que 2. Donc x est coincé dans l'intervalle <strong>[-2; 2]</strong>.</>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Familles" icon="🕹️" color="slate">
        <p className="mb-4">Es-tu capable de trier ces nombres ?</p>
        <FillInTheBlanks 
          id="int-eval"
          content={[
            "Je regarde le nombre -3, il appartient à l'ensemble des entiers ",
            { options: ["naturels", "relatifs", "irrationnels"], correctAnswer: 1 },
            " ℤ. Le nombre 4/3 ne s'arrête jamais si on le tape à la calculatrice (1.3333...), c'est donc un rationnel ℚ, mais PAS un décimal. Le symbole de l'union c'est le ",
            { options: ["U à l'endroit (∪)", "U à l'envers (∩)", "V au carré"], correctAnswer: 0 },
            ". Et si je veux écrire 'tous les nombres strictement plus grands que 5', j'écris l'intervalle ",
            { options: ["[5; +∞[", "]5; +∞[", "]-∞; 5]"], correctAnswer: 1 },
            "."
          ]}
        />
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver la famille la plus petite"
          question={<p>À quel ensemble (le plus petit possible) appartient le nombre <><MathComponent math={"-4.5"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser le nombre</p>
              <p><><MathComponent math={"-4.5"} /></> a un signe moins (donc il n'est pas dans <><MathComponent math={"\\mathbb{N}"} /></>).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Regarder la virgule</p>
              <p>Il possède des chiffres après la virgule qui s'arrêtent, il n'est donc pas dans les entiers <><MathComponent math={"\\mathbb{Z}"} /></>. Mais puisque la décimale est finie (le '5' est le dernier chiffre), c'est un nombre décimal.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le plus petit ensemble auquel il appartient est <><MathComponent math={"\\mathbb{D}"} /></> (les décimaux).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Union et Intersection"
          question={<p>Déterminer l'intersection de <><MathComponent math={"I = [-4 ; 2]"} /></> et <><MathComponent math={"J = [0 ; 7]"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Comprendre l'intersection</p>
              <p>Le symbole <><MathComponent math={"\\cap"} /></> (intersection) demande de prendre UNIQUEMENT les nombres qui sont à la fois dans <><MathComponent math={"I"} /></> et dans <><MathComponent math={"J"} /></> en même temps.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Regarder les bornes</p>
              <p>Les nombres communs commencent là où <><MathComponent math={"J"} /></> commence (en 0) et s'arrêtent là où <><MathComponent math={"I"} /></> s'arrête (en 2).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"I \\cap J = [0 ; 2]"} /></>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Lequel de ces nombres est un décimal (𝔻), mais n'est pas un entier (ni ℕ, ni ℤ) ?",
              options: [
                "2",
                "-5",
                "-2.75"
              ],
              correctAnswer: 2,
              explanation: "2 et -5 sont des entiers (et donc aussi des décimaux par extension). Mais -2.75 a des chiffres après la virgule, il est purement décimal."
            },
            {
              question: "Si I = [0; 10] et J = [5; 20]. Que vaut I ∩ J (l'intersection) ?",
              options: [
                "[5; 10]",
                "[0; 20]",
                "[10; 20]"
              ],
              correctAnswer: 0,
              explanation: "L'intersection, c'est la zone commune. La zone recouverte à la fois par I et J se trouve entre 5 et 10. Donc [5; 10]."
            },
            {
              question: "Comment écrit-on l'intervalle pour l'inéquation : x ≥ -3 ?",
              options: [
                "]-∞; -3]",
                "[-3; +∞[",
                "]-3; +∞["
              ],
              correctAnswer: 1,
              explanation: "x est PLUS GRAND ou ÉGAL à -3. Donc on commence (crochet fermé car INCLUS) à -3, et on va jusqu'à l'infini (crochet ouvert)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais l'ordre des ensembles : N ⊂ Z ⊂ D ⊂ Q ⊂ R.",
            "Je sais que l'infini prend TOUJOURS un crochet ouvert.",
            "Je connais la différence entre l'Union ∪ (le OU) et l'Intersection ∩ (le ET).",
            "J'ai compris que la valeur absolue détruit le signe moins."
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

export default Course_Seconde_01_Nombres_Intervalles;
