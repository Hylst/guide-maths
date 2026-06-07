import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Premiere_04_Exponentielle: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [xValue, setXValue] = useState<number>(0);

  const expValue = Math.exp(xValue);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-EXP"
        title="La Fonction Exponentielle"
        subtitle="La seule courbe qui croît aussi vite que sa propre vitesse."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : Le Rêve du Bactériologiste" icon="🧫" color="emerald">
        <p>
          Imagine une bactérie qui se dédouble chaque seconde. À t=0, tu as 1 bactérie. À t=1, tu en as 2. À t=2, tu en as 4... Très vite, tu en as des milliards. C'est ça, la <strong>croissance exponentielle</strong>.
        </p>
        <p className="mt-2">
          En mathématiques, les chercheurs se sont posé une question folle : <em>"Existe-t-il une fonction dont la vitesse de croissance (la dérivée) est exactement égale à elle-même ?"</em>
        </p>
        
        <InfoBlock type="definition" title="La Naissance de e^x">
          La réponse est OUI. La fonction <strong>exponentielle</strong>, notée exp(x) ou <strong>eˣ</strong>, est l'unique fonction qui vérifie f'(x) = f(x) et f(0) = 1. Elle décolle vers l'infini avec une puissance terrifiante.
        </InfoBlock>
      </Section>

      <Section title="🚀 Le Décollage Vertical" icon="📈" color="indigo">
        <p className="mb-4">Voyons comment cette courbe s'emballe. (Rappel : le nombre 'e' vaut environ 2,718).</p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="font-bold text-slate-700 dark:text-slate-300">Puissance x = </span>
            <input 
              type="range" 
              min="-2" max="5" step="0.5"
              value={xValue} 
              onChange={(e) => setXValue(parseFloat(e.target.value))}
              className="accent-indigo-500 cursor-pointer w-48"
            />
            <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400 bg-card px-3 py-1 border-2 border-indigo-100 dark:border-indigo-800/60 rounded min-w-[3rem] text-center">{xValue}</span>
          </div>

          <div className="p-4 bg-card rounded-xl border border-border inline-block text-left min-w-[250px]">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-2 border-b pb-1">Résultat immédiat</h4>
            <div className="font-mono text-2xl text-slate-900 dark:text-slate-100">
              e<sup className="text-sm">{xValue}</sup> = <strong className="text-emerald-600 dark:text-emerald-400">{expValue > 100 ? expValue.toFixed(0) : expValue.toFixed(3)}</strong>
            </div>
            
            <p className="text-xs text-slate-500 mt-3 pt-2 border-t">
              {xValue < 0 && "Pour x négatif, le résultat est tout petit (proche de 0), mais JAMAIS négatif !"}
              {xValue === 0 && "Tout nombre à la puissance 0 vaut 1. Règle d'or absolue."}
              {xValue > 0 && xValue < 3 && "Croissance modérée, ça commence à monter."}
              {xValue >= 3 && "EXPLOSION ! La courbe devient quasiment verticale."}
            </p>
          </div>
        </div>
      </Section>

      <Section title="📜 Les Pouvoirs Magiques (Propriétés Algébriques)" icon="⚡" color="amber">
        <p className="mb-4">La fonction exponentielle se comporte exactement comme les puissances du collège. Elle transforme les additions dans le "ciel" (en exposant) en multiplications sur "terre" !</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Produit → Somme" 
            math={"e^a \\times e^b = e^{a + b}"} 
          />
          <FormulaBox 
            title="Quotient → Différence" 
            math={"\\frac{e^a}{e^b} = e^{a - b}"} 
          />
          <FormulaBox 
            title="Inverse" 
            math={"\\frac{1}{e^a} = e^{-a}"} 
          />
          <FormulaBox 
            title="Puissance de puissance" 
            math={"(e^a)^n = e^{a \\times n}"} 
          />
        </div>
        
        <div className="mt-4 bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/60 p-4 rounded-xl text-rose-950 dark:text-rose-50 font-bold text-center">
          LA RÈGLE DE FER : eˣ est STRICTEMENT POSITIVE. <br/>
          Pour n'importe quel x, eˣ &gt; 0. (La courbe ne passe jamais sous 0).
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Simplification d'expression"
          question={<p>Simplifier l'expression <><MathComponent math={"A = \\frac{e^3 \\times e^{-1}}{e^5}"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le numérateur</p>
              <p>On applique la règle <><MathComponent math={"e^a \\times e^b = e^{a+b}"} /></>. Donc <><MathComponent math={"e^3 \\times e^{-1} = e^{3 + (-1)} = e^2"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le quotient</p>
              <p>On a maintenant <><MathComponent math={"A = \\frac{e^2}{e^5}"} /></>. On applique la règle du quotient <><MathComponent math={"\\frac{e^a}{e^b} = e^{a-b}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"A = e^{2 - 5} = e^{-3}"} /></>. (Ce qui s'écrit aussi <><MathComponent math={"\\frac{1}{e^3}"} /></>).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Résolution d'équation"
          question={<p>Résoudre l'équation <><MathComponent math={"e^{2x+1} - 1 = 0"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Isoler l'exponentielle</p>
              <p>On ajoute 1 des deux côtés : <><MathComponent math={"e^{2x+1} = 1"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Astuce de la puissance</p>
              <p>On sait que <><MathComponent math={"1"} /></> s'écrit <><MathComponent math={"e^0"} /></>. L'équation devient donc <><MathComponent math={"e^{2x+1} = e^0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Identifier les exposants</p>
              <p>Puisque la fonction exponentielle ne prend qu'une seule fois chaque valeur, on peut 'supprimer' les 'e' et dire que les exposants doivent être égaux : <><MathComponent math={"2x + 1 = 0"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"2x = -1"} /></> donc <><MathComponent math={"x = -0.5"} /></> (ou <><MathComponent math={"x = -\\frac{1}{2}"} /></>).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes Mentales" icon="💡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la dérivée de <strong>f(x) = eˣ</strong> ?</>}
            back={<><strong>f'(x) = eˣ</strong>. <br/>C'est la SEULE fonction au monde (avec f(x)=0) qui est sa propre dérivée.</>}
          />
          <Flashcard 
            front={<>L'équation <strong>eˣ = -5</strong> a combien de solutions ?</>}
            back={<><strong>ZÉRO solution.</strong><br/><span className="text-sm">eˣ est toujours strictement positive, elle ne peut jamais valoir un nombre négatif ou nul.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Simplification" icon="🕹️" color="slate">
        <p className="mb-4">Utilise les pouvoirs magiques pour simplifier :</p>
        <FillInTheBlanks 
          id="exp-eval"
          content={[
            "On me demande de simplifier le produit A = e³ × e². Selon la règle, je dois ",
            { options: ["multiplier", "additionner", "soustraire"], correctAnswer: 1 },
            " les exposants. Donc A = e^(3+2) = ",
            { options: ["e^6", "e^5", "e^9"], correctAnswer: 1 },
            ". Ensuite, je veux résoudre eˣ = 1. Je sais par cœur que pour n'importe quel nombre, la puissance 0 donne 1. Donc x vaut ",
            { options: ["0", "1", "e"], correctAnswer: 0 },
            ". Enfin, la fonction eˣ est strictement croissante car sa dérivée est elle-même, et on a dit qu'elle était toujours ",
            { options: ["négative", "positive"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Combien vaut e⁰ ?",
              options: [
                "0",
                "1",
                "Environ 2.718"
              ],
              correctAnswer: 1,
              explanation: "Tout nombre non nul à la puissance 0 vaut 1. L'exponentielle de 0 est donc 1."
            },
            {
              question: "Quelle est l'expression simplifiée de (e^x)² ?",
              options: [
                "e^(x²)",
                "e^(2x)",
                "2e^x"
              ],
              correctAnswer: 1,
              explanation: "Règle des puissances : (e^a)^b = e^(a×b). Donc (e^x)² = e^(x×2) = e^(2x)."
            },
            {
              question: "Quel est le comportement de la courbe de exp(x) quand x devient très grand et très négatif (ex: x = -100) ?",
              options: [
                "La courbe descend sous zéro.",
                "La courbe se rapproche de zéro sans jamais le toucher (asymptote).",
                "La courbe tend vers -100."
              ],
              correctAnswer: 1,
              explanation: "e^-100 c'est 1 / e^100. C'est 1 divisé par un nombre colossal, donc ça donne 0,000000... La courbe rase l'axe horizontal, mais reste toujours au-dessus !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que e⁰ = 1 et e¹ = e ≈ 2.718.",
            "Je connais par cœur les formules de simplification (produit = somme).",
            "J'ai gravé dans mon crâne que eˣ > 0 dans 100% des cas.",
            "Je sais que la dérivée de eˣ est eˣ (!)."
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

export default Course_Premiere_04_Exponentielle;
