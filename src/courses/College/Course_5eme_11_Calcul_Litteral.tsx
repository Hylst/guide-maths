import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, TipBanner, InteractiveExercise, FormulaBox
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_11_Calcul_Litteral: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Calculator play state
  const [boxValue, setBoxValue] = useState<number>(5);

  // Distributivity interactive parameters: k(ax + b)
  const [valK, setValK] = useState<number>(3);
  const [valA, setValA] = useState<number>(2);
  const [valB, setValB] = useState<number>(4);

  // Calculated expansion: k*a x + k*b
  const multKA = valK * valA;
  const multKB = valK * valB;

  // Format the equation to be pretty under the JSX
  const bSign = valB >= 0 ? '+' : '-';
  const kbSign = multKB >= 0 ? '+' : '-';
  const absB = Math.abs(valB);
  const absKB = Math.abs(multKB);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-LIT"
        title="Calcul Littéral"
        subtitle="L'art d'utiliser des lettres pour écrire des formules générales et maîtriser la distributivité."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Opérations prioritaires", "Nombres relatifs"]}
        objectives={[
          "Utiliser des expressions littérales pour résoudre des problèmes concrets",
          "Calculer la valeur d'une expression pour des valeurs numériques données",
          "Simplifier l'écriture d'expressions (omission du signe ×, regroupement de termes)",
          "Appliquer la distributivité simple pour développer ou factoriser"
        ]}
      />

      <Section title="⚠️ La Boîte Magique (Le Concept de Variable)" icon="📦" color="rose">
        <p className="lead text-lg">
          En primaire, tu as appris à manipuler des nombres fixés. <code className="bg-slate-100 text-slate-900 dark:text-slate-100 px-1 rounded">2 + 3 = 5</code>. C'est sûr et certain.
        </p>
        <p className="mt-4">
          Mais dans le monde du mathématicien supérieur, on a besoin d'exprimer des règles sans connaître la valeur exacte d'avance. Pour cela, on utilise une "boîte magique" que l'on appelle une <strong>variable</strong>, et qu'on note souvent <em>x</em>.
        </p>
        
        <InfoBlock type="definition" title="La Variable">
          La lettre <strong>x</strong> (ou n'importe quelle autre lettre comme <em>y, a, b</em>) sert de contenant universel. C'est un espace vide prêt à accueillir n'importe quel nombre auquel nous donnerons vie.
        </InfoBlock>

        {/* Real-time variable box sandbox */}
        <div className="my-8 flex flex-col justify-center items-center bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-850">
          <h4 className="text-xl font-bold text-indigo-950 dark:text-indigo-100 mb-4">Évaluation de l'expression : <code className="bg-card p-2 rounded-lg shadow-sm">2x + 3</code></h4>
          <p className="text-sm text-slate-500 mb-6 text-center">Fais varier la valeur secrète de la boîte <span className="font-bold text-rose-600 px-1 bg-rose-100 rounded">x</span> pour voir le résultat s'actualiser en temps réel !</p>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-700 dark:text-slate-300">Si x = </span>
            <input 
              type="range" 
              min="0" max="10" 
              value={boxValue} 
              onChange={(e) => setBoxValue(parseInt(e.target.value))}
              className="accent-rose-500 hover:accent-rose-600 transition-all cursor-pointer"
            />
            <span className="font-bold text-xl text-rose-605 bg-card px-3 py-1 border-2 border-rose-100 dark:border-rose-900 rounded-xl min-w-[3rem] text-center">{boxValue}</span>
          </div>

          <div className="mt-6 text-2xl font-mono bg-card p-4 rounded-xl shadow-inner text-indigo-950 dark:text-indigo-50 border border-border flex items-center justify-center min-w-[200px]">
            2 × {boxValue} + 3 = <strong className="text-emerald-600 dark:text-emerald-400 ml-2">{2 * boxValue + 3}</strong>
          </div>
        </div>
      </Section>

      <Section title="👻 La Fin des Multiplications Visibles" icon="🎩" color="purple">
        <p className="mb-4">
          Par commodité, les mathématiciens omettent le signe de multiplication "×" devant une lettre ou une parenthèse pour simplifier l'écriture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center my-6">
          <div className="bg-card border-2 border-border rounded-xl p-4">
            <h4 className="text-slate-500 line-through text-sm uppercase tracking-wider mb-2">Ancienne écriture</h4>
            <p className="text-xl font-mono text-slate-900 dark:text-slate-100">3 × x</p>
            <p className="text-xl font-mono text-slate-900 dark:text-slate-100 mt-2">a × b</p>
            <p className="text-xl font-mono text-slate-900 dark:text-slate-100 mt-2">4 × (x + 2)</p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 rounded-xl p-4">
            <h4 className="text-emerald-700 dark:text-emerald-300 font-bold text-sm uppercase tracking-wider mb-2">Écriture simplifiée</h4>
            <p className="text-2xl font-mono font-bold text-emerald-950 dark:text-emerald-50">3x</p>
            <p className="text-2xl font-mono font-bold text-emerald-950 dark:text-emerald-50 mt-2">ab</p>
            <p className="text-2xl font-mono font-bold text-emerald-950 dark:text-emerald-50 mt-2">4(x + 2)</p>
          </div>
        </div>

        <TipBanner type="warning" title="Le Piège du Nombre Pur">
          Attention, tu ne peux pas masquer la multiplication entre deux nombres fixes ! <br/>
          <strong className="text-rose-600">3 × 5 ne s'écrira JAMAIS 35 !</strong> Ce serait un contresens total !
        </TipBanner>
      </Section>

      <Section title="⚖️ La Distributivité en Action" icon="📭" color="indigo">
        <p className="mb-4">
          La <strong>distributivité</strong> consiste à attribuer de force le facteur multiplicateur situé à l'extérieur d'une parenthèse à chacun des membres résidant à l'intérieur.
        </p>

        {/* Real-time interactive distributivity sandbox k(ax + b) */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm">
          <h4 className="font-bold text-center text-lg mb-4 text-indigo-805 dark:text-indigo-400">Interactif : Manipuler la Distributivité Simple</h4>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 justify-between">
                <span>Facteur externe <strong className="text-indigo-600">k</strong> :</span>
                <input 
                  type="range" min="1" max="10" value={valK} 
                  onChange={(e) => setValK(parseInt(e.target.value))}
                  className="w-24 accent-indigo-500"
                />
                <span className="font-mono bg-slate-100 px-2 rounded">{valK}</span>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <span>Coefficient <strong className="text-rose-500">a</strong> de x :</span>
                <input 
                  type="range" min="1" max="5" value={valA} 
                  onChange={(e) => setValA(parseInt(e.target.value))}
                  className="w-24 accent-rose-500"
                />
                <span className="font-mono bg-slate-100 px-2 rounded">{valA}</span>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <span>Nombre constant <strong className="text-emerald-500">b</strong> :</span>
                <input 
                  type="range" min="-10" max="10" value={valB} 
                  onChange={(e) => setValB(parseInt(e.target.value))}
                  className="w-24 accent-emerald-500"
                />
                <span className="font-mono bg-slate-100 px-2 rounded">{valB}</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 text-center max-w-xs font-mono">
              <span className="text-xs text-slate-500 font-extrabold block mb-2 uppercase">Étape par Étape</span>
              <div className="text-base text-slate-700 dark:text-slate-300">
                {valK}({valA}x {bSign} {absB})
              </div>
              <div className="text-xs text-indigo-500 my-1 font-semibold">
                = ({valK} × {valA}x) + ({valK} × ({valB}))
              </div>
              <div className="text-lg font-black text-indigo-700 dark:text-indigo-300 mt-2">
                = {multKA}x {kbSign} {absKB}
              </div>
            </div>
          </div>
        </div>

        <FormulaBox title="La Règle de Distributivité" math={"k(a + b) = k \\times a + k \\times b"} />
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Que veut dire "<strong>développer</strong>" en mathématiques ?</>}
            back={<>C'est transformer un <strong>produit</strong> (multiplication) en une <strong>somme</strong> ou différence.</>}
          />
          <Flashcard 
            front={<>Que veut dire "<strong>factoriser</strong>" ?</>}
            back={<>C'est l'exact inverse : transformer une <strong>somme</strong> en <strong>produit</strong>.</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Simplification d'expression"
          question="Réduis l'expression suivante au maximum : A = 3x + 12x - 5."
          steps={[
            "J'identifie les familles de termes : j'ai des termes en 'x' (3x et 12x) et un terme constant (-5).",
            "J'associe les éléments de la même famille : 3x + 12x = 15x. Je ne touche pas au -5 qui appartient à une autre famille.",
            "J'obtiens l'expression réduite finale : A = 15x - 5."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Développement distributeur"
          question="Développe et réduis l'expression suivante : B = 4(2x - 5) + 3."
          steps={[
            "J'applique la distributivité simple sur la première partie : 4 × 2x - 4 × 5 = 8x - 20.",
            "Je réintègre le terme constant situé à l'extérieur : B = 8x - 20 + 3.",
            "Je réduis la constante : -20 + 3 = -17. J'en déduis l'écriture finale : B = 8x - 17."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi n'a-t-on pas le droit de réunir 3x et 5 ?",
              answer: "Parce qu'ils ne représentent pas la même entité. C'est comme vouloir additionner 3 clés et 5 euros. On ne peut pas les fusionner pour faire '8 clés d'euros' ! On les écrit donc séparés."
            },
            {
              question: "Quelle est la notation pour multiplier un nombre par lui-même ?",
              answer: "On utilise l'exposant 2 (le carré) : x × x = x² !"
            },
            {
              question: "Quelle est la différence fondamentale entre 2x et x² ?",
              answer: "2x exprime la somme x + x (on multiplie la variable par 2). x² exprime la multiplication x × x (on élève la variable au carré). Si x = 5, alors 2x = 10, alors que x² = 25 !"
            }
          ]}
        />
      </Section>

      <Section title="🎮 Test d'Alignement" icon="🕹️" color="indigo">
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

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Développe l'expression : 6(3 - x).",
              options: [
                "18 - x",
                "18 - 6x",
                "18x - 6"
              ],
              correctAnswer: 1,
              explanation: "On distribue le 6 : 6×3 - 6×x = 18 - 6x."
            },
            {
              question: "Calcule l'expression 5x² pour x = 3.",
              options: [
                "45",
                "225",
                "30"
              ],
              correctAnswer: 0,
              explanation: "Priorité à l'exposant : 3² = 9. Puis on multiplie : 5 × 9 = 45."
            },
            {
              question: "Simplifie l'écriture de l'expression : a × 1 × b",
              options: [
                "ab",
                "1ab",
                "a + b"
              ],
              correctAnswer: 0,
              explanation: "Multiplier par 1 ne change pas la valeur d'un terme. Et l'on peut omettre les signes fois pour écrire simplement 'ab'."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je comprends ce qu'est une variable et je sais évaluer des formules.",
            "Je sais omettre le signe × devant les lettres et parenthèses.",
            "Je sais développer des expressions rattachées à la distributivité.",
            "Je sais regrouper les familles d'éléments au sein de simplifications."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
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
