import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, AccordionFAQ, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Percent, RefreshCw, Scissors, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Course_5eme_03_Fractions_Calculs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Slicer Sandbox State
  const [num, setNum] = useState<number>(4);
  const [den, setDen] = useState<number>(6);

  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  const currentGcd = gcd(num, den);
  const canSimplify = currentGcd > 1 && den > 1;

  const handleSimplify = () => {
    if (!canSimplify) return;
    setNum(prev => prev / currentGcd);
    setDen(prev => prev / currentGcd);
    confetti({ particleCount: 60, spread: 50, colors: ['#10b981', '#34d399', '#059669'] });
  };

  const handleResetFraction = () => {
    setNum(4);
    setDen(6);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-5-FRAC"
        title="Fractions et Calculs"
        subtitle="L'Art des Brisures : Maîtrisez le découpage, l'addition et la simplification de parts."
        duration="40 min"
        level="5ème (Cycle 4)"
        prerequisites={["Connaître ses tables de multiplication", "Comprendre le concept de division", "Savoir additionner des petits nombres"]}
        objectives={[
          "Comprendre qu'une fraction est le quotient exact de deux nombres entiers.",
          "Savoir fabriquer des fractions égales (clones) en multipliant ou divisant.",
          "Simplifier une fraction pour la rendre irréductible.",
          "Additionner ou soustraire des fractions partageant le même dénominateur."
        ]}
      />

      {/* INTRODUCTION PÉDAGOGIQUE */}
      <Section title="🍕 Introduction : La Lame Fractale" icon="🗡️" color="indigo">
        <p className="leading-relaxed">
          Partager équitablement un butin ou une pizza de manière approximative, c&apos;est risquer la discorde ! En mathématiques, la <strong>fraction</strong> est l&apos;outil d&apos;orfèvre parfait. Elle permet d&apos;exprimer des proportions d&apos;une précision chirurgicale absolue, là où nos nombres à virgule ordinaires s&apos;épuisent et échouent.
        </p>
        <p className="mt-4 leading-relaxed font-semibold text-slate-800 dark:text-slate-100">
          Un bref rappel d&apos;anatomie de combat :
        </p>
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 rounded-[2rem] p-6 mt-4">
          <ul className="space-y-4 font-medium text-indigo-950 dark:text-indigo-200">
            <li className="flex items-start gap-3">
              <span className="text-xl">⚔️</span> 
              <div>
                <strong>Le Numérateur (le nombre du HAUT) :</strong> C&apos;est la quantité active de parts dont tu disposes physiquement.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🛡️</span> 
              <div>
                <strong>Le Dénominateur (le nombre du BAS) :</strong> C&apos;est le diviseur fondamental. Il indique en combien de parts rigoureusement égales l&apos;unité d&apos;origine a été morcelée.
              </div>
            </li>
          </ul>
        </div>
      </Section>

      {/* INTERACTIVE COMPLIANT WORKSPACE SANDBOX */}
      <Section title="🔮 Le Laboratoire : Le Trancheur de Pizza Interactif" icon={<Scissors className="text-emerald-500" />} color="emerald">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Ajuste le <strong>Numérateur</strong> et le <strong>Dénominateur</strong>. Observe la pizza se découper en direct. Si la fraction est simplifiable (clonable avec des nombres plus petits), clique sur le bouton magique pour la nettoyer !
        </p>

        <div className="bg-card border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 lg:p-8 shadow-xl shadow-emerald-500/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Render Fraction Interactive Slices */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner flex items-center justify-center p-4">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                  {/* Pizza base plate */}
                  <circle cx="100" cy="100" r="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

                  {/* Draw slices */}
                  {Array.from({ length: den }).map((_, idx) => {
                    const angleStep = 360 / den;
                    const startAngle = idx * angleStep - 90;
                    const endAngle = (idx + 1) * angleStep - 90;

                    const rad = Math.PI / 180;
                    const x1 = 100 + 78 * Math.cos(startAngle * rad);
                    const y1 = 100 + 78 * Math.sin(startAngle * rad);
                    const x2 = 100 + 78 * Math.cos(endAngle * rad);
                    const y2 = 100 + 78 * Math.sin(endAngle * rad);

                    const isColored = idx < num;
                    const pathD = `M 100 100 L ${x1} ${y1} A 78 78 0 0 1 ${x2} ${y2} Z`;

                    return (
                      <path
                        key={idx}
                        d={pathD}
                        fill={isColored ? 'rgba(16, 185, 129, 0.75)' : 'none'}
                        stroke="#059669"
                        strokeWidth="1.5"
                      />
                    );
                  })}

                  {/* Inner golden ring wrapper */}
                  <circle cx="100" cy="100" r="78" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                </svg>

                {/* Micro info float badge */}
                <div className="absolute bottom-3 right-3 bg-white dark:bg-slate-800 border px-3 py-1 rounded-full text-[10px] font-mono font-bold text-slate-500">
                  Ratio: {((num / den) * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Controls interface */}
            <div className="flex flex-col justify-center">
              
              {/* Numerator Slider */}
              <div className="mb-6">
                <div className="flex justify-between font-bold text-xs uppercase mb-2 text-indigo-700 dark:text-indigo-400">
                  <span>⚔️ Numérateur (Haut)</span>
                  <span>{num} parts</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={den}
                  aria-label="Ajusteur de numérateur"
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Denominator Slider */}
              <div className="mb-8">
                <div className="flex justify-between font-bold text-xs uppercase mb-2 text-emerald-700 dark:text-emerald-400">
                  <span>🛡️ Dénominateur (Bas)</span>
                  <span>{den} morceaux max</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  aria-label="Ajusteur de dénominateur"
                  value={den}
                  onChange={(e) => {
                    const newDen = parseInt(e.target.value);
                    setDen(newDen);
                    if (num > newDen) setNum(newDen);
                  }}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSimplify}
                  disabled={!canSimplify}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all
                    ${canSimplify 
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20 hover:bg-emerald-600 scale-102' 
                      : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'}
                  `}
                >
                  <Sparkles size={14} /> Simplifier (Divise par {currentGcd})
                </button>

                <button
                  onClick={handleResetFraction}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 "
                >
                  <RefreshCw size={14} /> Réécrire
                </button>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* PARTIE THÉORIE ENRICHIE */}
      <Section title="🧬 Les Clones : Fractions Égales" icon="🪞" color="slate">
        <p className="leading-relaxed">
          Magie absolue des nombres brisés : Deux expressions de fractions peuvent être <strong>exactement identiques</strong> (des clones physiques) même si elles se dessinent avec des chiffres complètement différents à l&apos;écran !
        </p>
        
        <InfoBlock type="info" title="L'Équilibre Absolu">
          Tu as le droit inaliénable de MULTIPLIER ou de DIVISER le numérateur (Haut) ET le dénominateur (Bas) par <strong>exactement le même nombre</strong> (sauf Zéro). Cela ne change en rien la valeur finale du quotient !
        </InfoBlock>

        <FormulaBox title="La Règle de Clonage" math="\\frac{a \\times k}{b \\times k} = \\frac{a}{b}" />

        <p className="leading-relaxed mt-4">
          Quand on utilise ce pouvoir infini pour DIVISER, on appelle cela <strong>SIMPLIFIER LA FRACTION</strong>. Le but ultime est de rendre la fraction la plus petite et épurée possible : on l&apos;appelle alors une fraction <strong>irréductible</strong>.
        </p>
      </Section>

      <Section title="⚔️ L'Épreuve de l'Addition et de la Soustraction" icon="🛡️" color="rose">
        <p className="leading-relaxed">
          Pour additionner ou soustraire deux brisures, il y a une <strong>Loi de Bronze</strong>, implacable, absolue :
        </p>

        <div className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800/60 p-6 rounded-[2rem] mt-6 shadow-sm shadow-rose-100/10">
          <h3 className="font-bold text-lg text-rose-900 dark:text-rose-100 mb-3 uppercase tracking-wider">La Règle de Bronze</h3>
          <ol className="list-decimal list-inside space-y-3 font-semibold text-rose-950 dark:text-rose-50 text-xs md:text-sm">
            <li>Elles DOIVENT impérativement partager le <strong>même bouclier (Même Dénominateur !).</strong></li>
            <li>Si le dénominateur est différent, tu <strong>dois</strong> cloner l&apos;une d&apos;elles en multipliant son Haut et son Bas pour les harmoniser !</li>
            <li>On <strong>NE TOUCHE JAMAIS</strong> au Dénominateur lors de la somme finale : on se contente d&apos;additionner ou soustraire les Numérateurs (le Haut).</li>
          </ol>
        </div>

        <FormulaBox title="Somme de fractions" math="\\frac{a}{d} + \\frac{b}{d} = \\frac{a + b}{d}" />
      </Section>

      {/* DETAILED INTERACTIVE SOLVED EXERCISES (MANDATORY REQUIREMENT) */}
      <Section title="✍️ Fiches de Combat et Exercices Corrigés" icon="⚙️" color="indigo">
        <InteractiveExercise 
          title="Exercice Résolu 1 : L'addition asymétrique de fractions"
          question={<>Calcule de manière extrêmement propre l&apos;expression suivante :<br />{"$A = \\frac{5}{12} + \\frac{1}{3}$"}</>}
          steps={[
            <><strong>Étape 1 : Analyser les boucliers (Dénominateurs) :</strong> Les denominators sont 12 et 3. Ils sont asymétriques, on ne peut pas additionner directement. Comme {"$12 = 3 \\times 4$"}, on va harmoniser la deuxième fraction.</>,
            <><strong>Étape 2 : Fabriquer le clone :</strong> On multiplie le haut et le bas de {"$\\frac{1}{3}$"} par <code>4</code> : <br />{"$\\frac{1 \\times 4}{3 \\times 4} = \\frac{4}{12}$"}.</>,
            <><strong>Étape 3 : Effectuer la somme :</strong> Désormais les boucliers sont identiques. On ajoute uniquement les épées (le haut) : <br />{"$\\frac{5}{12} + \\frac{4}{12} = \\frac{5 + 4}{12} = \\frac{9}{12}$"}.</>,
            <><strong>Étape 4 : Simplifier le résultat final :</strong> 9 et 12 appartiennent tous les deux à la table de 3. On divise en haut et en bas par 3 pour soigner la fraction : <br />{"$\\frac{9 \\div 3}{12 \\div 3} = \\mathbf{\\frac{3}{4}}$"} !</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice Résolu 2 : Simplifier jusqu'à l'irréductible"
          question={<>Simplifie au maximum possible pour obtenir la fraction la plus épurée :<br />{"$B = \\frac{60}{84}$"}</>}
          steps={[
            <><strong>Étape 1 : Retirer les facteurs pairs :</strong> Les deux nombres se terminent par un chiffre pair. On peut donc diviser le haut et le bas immédiatement par 2 : <br />{"$\\frac{60 \\div 2}{84 \\div 2} = \\frac{30}{42}$"}.</>,
            <><strong>Étape 2 : Diviser de nouveau par 2 :</strong> Les nombres obtenus sont encore pairs ! On recommence par 2 : <br />{"$\\frac{30 \\div 2}{42 \\div 2} = \\frac{15}{21}$"}.</>,
            <><strong>Étape 3 : Détecter la table de 3 :</strong> 15 et 21 sont tous deux divisibles par 3 (table de multiplication). On applique la division par 3 : <br />{"$\\frac{15 \\div 3}{21 \\div 3} = \\frac{5}{7}$"}.</>,
            <><strong>Étape 4 : Proclamer l'irréductibilité :</strong> 5 et 7 sont des nombres premiers (pas de diviseur commun). Notre fraction finale épurée et résolue est {"$\\mathbf{\\frac{5}{7}}$"} !</>
          ]}
        />
      </Section>

      {/* FLASHCARDS INTERACTIVE COMPONENT */}
      <Section title="🧠 Entraînement Flashcards" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Peut-on calculer directement l&apos;expression : <code>3/5 + 1/5</code> ?</>}
            back={<><strong>OUI !</strong> Le bouclier inférieur est identique (5). On ajoute simplement les numérateurs du haut : 3 + 1 = 4. Résultat : <strong>4/5</strong>.</>}
          />
          <Flashcard 
            front={<>Quelle est l&apos;action secrète du trait de fraction visible entre deux nombres ?</>}
            back={<>C&apos;est une **division invisible** ! Par exemple, <code>12/4</code> est rigoureusement égal au nombre entier <code>3</code> (car 12 divisé par 4 donne 3).</>}
          />
        </div>
      </Section>

      {/* FILL IN THE BLANKS TEXT HOLES */}
      <Section title="🕹️ Mission d'Harmonisation" icon="🕹️" color="emerald">
        <p className="mb-4">Complète la préparation finale avant le défi d&apos;évaluation :</p>
        <FillInTheBlanks 
          id="frac-evaluation-sec"
          content={[
            "Pour soustraire 7/10 et 2/5, je m'aperçois que les ",
            { options: ["numérateurs", "dénominateurs"], correctAnswer: 1 },
            " sont différents. Je dois cloner la fraction 2/5 en la multipliant par ",
            { options: ["2", "5", "10"], correctAnswer: 0 },
            " en haut et en bas. Elle devient alors ",
            { options: ["4/10", "10/25", "4/5"], correctAnswer: 0 },
            ". Je peux enfin soustraire les numérateurs (7 - 4) ce qui donne un résultat final irréprochable de ",
            { options: ["5/10", "3/10", "3/5"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      {/* FAQ SECTION (MANDATORY REQUIREMENT) */}
      <Section title="❓ Questions Fréquentes (FAQ)" icon="🙋" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi n'additionne-t-on pas bêtement les dénominateurs (le bas) ?",
              answer: "Parce que le dénominateur indique la TAILLE d'une part de gâteau, tandis que le numérateur indique la QUANTITÉ de parts accumulées. Si tu manges 1 part d'une pizza coupée en 4, et encore 1 part d'une autre pizza coupée en 4, tu n'as pas mangé 2 parts d'une pizza coupée en 8 ! Tu as mangé 2/4 (qui fait la moitié d'un gâteau complet)."
            },
            {
              question: "Existe-t-il une astuce infaillible pour trouver rapidement par quoi simplifier ?",
              answer: "Oui ! Apprends les critères de divisibilité simples :\n- Si les nombres finissent par 0, 2, 4, 6, 8, ils se divisent par 2.\n- S'ils se finissent par 0 ou 5, ils se divisent par 5.\n- Si la somme de leurs chiffres est dans la table de 3, ils se divisent par 3 !"
            },
            {
              question: "Que se passe-t-il si un dénominateur vaut zéro ?",
              answer: "C'est la catastrophe absolue ! Diviser par zéro est formellement interdit en mathématiques et fait crasher les ordinateurs. Une fraction ne peut jamais posséder un 0 comme dénominateur de son bouclier."
            }
          ]}
        />
      </Section>

      {/* FINAL QUIZ COMPLIANCE */}
      <Section title="💎 Épreuve Finale du Trancheur" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle fraction est un CLONE exact d'un demi (1/2) ?",
              options: [
                "2/4 (Car 1×2 et 2×2)",
                "50/100 (Car 1×50 et 2×50)",
                "Toutes les réponses ci-dessus sont vraies !"
              ],
              correctAnswer: 2,
              explanation: "Incroyable ! Tant qu'on multiplie le haut et le bas par la même quantité, le clone conserve la proportion exacte."
            },
            {
              question: "Si tu calcules l'addtion de fractions 4/70 + 6/70, quel est le score final ?",
              options: [
                "10/140 (L'horreur absolue !)",
                "10/70 (La maîtrise parfaite !)",
                "10"
              ],
              correctAnswer: 1,
              explanation: "Bravo ! On conserve toujours le dénominateur d'origine intact, on se contente d'ajouter l'énergie active des numérateurs du haut."
            },
            {
              question: "À quelle valeur est égale la fraction irréductible de 15/20 ?",
              options: [
                "3/4 (On divise haut / bas par 5)",
                "5/6",
                "3/40"
              ],
              correctAnswer: 0,
              explanation: "Gagné ! En divisant 15 par 5 on obtient 3, et 20 par 5 donne 4. Le résultat irréductible est bien 3/4."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je domine l'anatomie d'une fraction : le numérateur combat en haut, le dénominateur veille en bas.",
            "Je sais cloner des fractions égales en multipliant ou divisant de manière équitable.",
            "Je sais simplifier une expression fractionnaire par divisions successives.",
            "Je m'interdis d'additionner ou de soustraire les dénominateurs inférieurs."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_03_Fractions_Calculs;
