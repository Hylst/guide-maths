import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, Accordion, InteractiveExercise 
} from '../components/SharedUI';

const Course_5eme_11_Calcul_Litteral: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [boxValue, setBoxValue] = useState<number>(5);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-LIT"
        title="Calcul Littéral"
        subtitle="Le monde mystérieux de la lettre 'x'."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : La Boîte Magique" icon="📦" color="rose">
        <p>
          En primaire, tu as appris à manipuler des nombres fixés. <code className="bg-slate-100 text-slate-900 dark:text-slate-100 px-1 rounded">2 + 3 = 5</code>. C'est sûr et certain.
        </p>
        <p className="mt-2">
          Mais dans le monde du mathématicien supérieur, on a besoin d'exprimer des choses sans connaître la valeur exacte d'avance. Pour cela, on utilise une "boîte magique" que l'on appelle une <strong>variable</strong>, et qu'on note souvent <em>x</em>.
        </p>
        
        <InfoBlock type="definition" title="La Lettre x">
          La lettre <strong>x</strong> (ou n'importe quelle autre lettre comme <em>a, b, y, n</em>) n'est qu'un contenant. C'est une boîte vide qui attend qu'on y glisse un nombre. Le "Calcul Littéral" c'est l'art d'utiliser ces boîtes pour écrire des formules générales !
        </InfoBlock>

        <div className="my-8 flex flex-col justify-center items-center bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100">
          <h4 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-4 whitespace-nowrap">Expression : <code className="bg-card p-2 rounded-lg shadow-sm">2 × x + 3</code></h4>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Fais varier la valeur secrète de la boîte <span className="font-bold text-rose-600 dark:text-rose-400 px-1 bg-rose-100 rounded">x</span> pour voir le résultat en temps réel !</p>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-700 dark:text-slate-300">Si x = </span>
            <input 
              type="range" 
              min="0" max="10" 
              value={boxValue} 
              onChange={(e) => setBoxValue(parseInt(e.target.value))}
              className="accent-rose-500 hover:accent-rose-600 transition-all cursor-pointer"
            />
            <span className="font-bold text-xl text-rose-600 dark:text-rose-400 bg-card px-3 py-1 border-2 border-rose-100 dark:border-rose-800/60 rounded min-w-[3rem] text-center">{boxValue}</span>
          </div>

          <div className="mt-6 text-2xl font-mono bg-card p-4 rounded-xl shadow-inner text-indigo-950 dark:text-indigo-50 border border-border flex items-center justify-center min-w-[200px]">
            2 × {boxValue} + 3 = <strong className="text-emerald-600 dark:text-emerald-400 ml-2">{2 * boxValue + 3}</strong>
          </div>
        </div>
      </Section>

      <Section title="👻 La Disparition du Signe ×" icon="🎩" color="purple">
        <p className="mb-4">
          Dans le monde merveilleux du calcul littéral, les mathématiciens sont devenus paresseux. Ils ont décidé de masquer le signe "multiplié" quand il n'est pas strictement nécessaire (surtout devant une lettre ou une parenthèse).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-card border-2 border-border rounded-xl p-4">
            <h4 className="text-slate-500 line-through text-sm uppercase tracking-wider mb-2">Ancien Style</h4>
            <p className="text-xl font-mono text-slate-900 dark:text-slate-100">2 × x</p>
            <p className="text-xl font-mono text-slate-900 dark:text-slate-100 mt-2">a × b</p>
            <p className="text-xl font-mono text-slate-900 dark:text-slate-100 mt-2">3 × (x + 1)</p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 rounded-xl p-4">
            <h4 className="text-emerald-700 dark:text-emerald-300 font-bold text-sm uppercase tracking-wider mb-2">Style Ninja</h4>
            <p className="text-2xl font-mono font-bold text-emerald-950 dark:text-emerald-50">2x</p>
            <p className="text-2xl font-mono font-bold text-emerald-950 dark:text-emerald-50 mt-2">ab</p>
            <p className="text-2xl font-mono font-bold text-emerald-950 dark:text-emerald-50 mt-2">3(x + 1)</p>
          </div>
        </div>
      </Section>

      <Section title="⚖️ Distribuer : Le Facteur de l'Équation" icon="📭" color="slate">
        <p className="mb-4">
          Quand tu as un facteur (le nombre multiplicateur) devant une parenthèse, il doit être distribué à <strong>chacun</strong> des éléments à l'intérieur. C'est comme un facteur qui glisse un prospectus dans chaque boîte aux lettres de l'immeuble.
        </p>

        <Accordion title="Voir la méthode de Distribution (Développement)">
          <div className="p-4 bg-card border border-border rounded-xl">
            <p className="mb-2 font-medium text-slate-700 dark:text-slate-300">Développer l'expression <strong>A = 4(x + 5)</strong></p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li>Le <strong className="text-rose-600 dark:text-rose-400">4</strong> est notre facteur (notre livreur).</li>
              <li>Il distribue sur le premier terme : <strong className="text-rose-600 dark:text-rose-400">4</strong> × <span className="text-indigo-600 dark:text-indigo-400">x</span> = 4x</li>
              <li>Il distribue sur le second terme : <strong className="text-rose-600 dark:text-rose-400">4</strong> × <span className="text-emerald-600 dark:text-emerald-400">5</span> = 20</li>
            </ul>
            <p className="mt-4 text-xl text-center bg-muted p-2 border-t font-mono">
              <strong>A = 4x + 20</strong>
            </p>
          </div>
        </Accordion>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : La Réduction"
          question={<p>Dans l'expression <code>3x + 5x</code>, peut-on réduire (simplifier) l'expression ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser les familles</p>
              <p>Tu as 3 boîtes "x" et 5 boîtes "x". Elles sont dans la même famille !</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Regrouper</p>
              <p>3 pommes + 5 pommes, ça fait 8 pommes. Pareil pour les x !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Oui ! <code>3x + 5x = 8x</code>.</p>
            </div>
          ]}
        />
        
        <InteractiveExercise
          title="Exercice 2 : La Bataille des Familles"
          question={<p>Et dans l'expression <code>4x + 7</code>, peut-on simplifier pour obtenir <code>11x</code> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser les familles</p>
              <p>Tu as 4 boîtes "x" et le nombre 7 tout seul (sans "x").</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : NON ! C'est le piège ultime ! On ne mélange jamais la famille des "x" avec la famille des nombres tout seuls. L'expression reste <code>4x + 7</code>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes de Réflexes Cérébraux" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Que signifie "<strong>développer</strong>" en mathématiques ?</>}
            back={<>Transformer un <strong>produit</strong> (multiplication) en une <strong>somme</strong> ou différence (en utilisant la distributivité).</>}
          />
          <Flashcard 
            front={<>L'expression <strong>x × x</strong> s'écrit de manière plus courte... comment ?</>}
            back={<><strong>x²</strong> (x au carré). <br/><span className="text-sm">Ne pas confondre avec 2x qui est la somme de x + x !</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Entraînement de Traduction" icon="🕹️" color="indigo">
        <p className="mb-4">Décode ces mystères algébriques :</p>
        <FillInTheBlanks 
          id="lit-eval"
          content={[
            "L'expression littérale de 'le double de x' s'écrit ",
            { options: ["x2", "2x", "x+2"], correctAnswer: 1 },
            ". Et l'expression de 'x augmenté de 5' s'écrit ",
            { options: ["5x", "x5", "x+5"], correctAnswer: 2 },
            ". Bon, maintenant on me donne la formule magique P = 2L + 2l. Il n'y a pas de signe de multiplication. C'est normal, c'est la fameuse disparition ! Le signe caché entre le 2 et le L est bien un signe ",
            { options: ["+", "×", "-"], correctAnswer: 1 },
            "."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Algébrique" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la traduction correcte de 'Le carré de x' ?",
              options: [
                "2x (c'est 2 fois x)",
                "x² (c'est x multiplié par lui-même)"
              ],
              correctAnswer: 1,
              explanation: "Le carré s'écrit avec m'exposant 2 (²). x × x = x² ! L'expression 2x c'est le double de x."
            },
            {
              question: "Si j'évalue l'expression A = 3x - 1 pour x = 4, combien vaut A ?",
              options: [
                "A = 11",
                "A = 33"
              ],
              correctAnswer: 0,
              explanation: "Je remplace x par 4. Ça fait donc 3 × 4 - 1. Soit 12 - 1 = 11. (Attention '3x' n'est pas le nombre 34 !)"
            },
            {
              question: "Comment développe-t-on l'expression 5(a - 2) ?",
              options: [
                "5a - 2",
                "5a - 10"
              ],
              correctAnswer: 1,
              explanation: "Le facteur 5 est distribué au 'a' ET au '-2'. Cela donne 5×a - 5×2 = 5a - 10."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que 'x' est une boîte magique qui peut contenir n'importe quel nombre.",
            "Je connais la règle des signes invisibles : 3a signifie 3 × a.",
            "Je ne confonds jamais 2x (x+x) avec x² (x×x).",
            "Je sais développer : k(a+b) = ka + kb sans oublier de multiplier le deuxième terme."
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

export default Course_5eme_11_Calcul_Litteral;
