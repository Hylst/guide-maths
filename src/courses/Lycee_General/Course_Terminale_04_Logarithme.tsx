import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_04_Logarithme: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [valE, setValE] = useState<number>(1);
  const resultExp = Math.exp(valE).toFixed(2);
  const resultLn = Math.log(Math.exp(valE)).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-LN"
        title="Fonction Logarithme Népérien"
        subtitle="Détruire des exponentielles et transformer des produits en sommes."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Le Mirom de l'Exponentielle" icon="🪞" color="emerald">
        <p>
          En Première, tu as rencontré la fonction Exponentielle (e^x), une fusée qui monte si vite qu'elle bat toutes les autres fonctions vers l'infini.
        </p>
        <p className="mt-2">
          Mais comment fait-on pour résoudre une équation comme <strong>e^x = 10</strong> ? On ne peut pas "diviser par e". Il nous faut un 'destructeur' d'exponentielle, une fonction réciproque qui annule son effet. Voici le <strong>Logarithme Népérien</strong>, noté <strong>ln</strong>.
        </p>
        
        <InfoBlock type="definition" title="La Définition Fondamentale">
          La fonction <span className="font-mono">ln</span> est définie sur <strong>]0 ; +∞[</strong>.<br/>
          (On ne peut pas calculer le logarithme d'un nombre négatif, ni de zéro).<br/>
          Pour tout x &gt; 0, <strong>e^(ln(x)) = x</strong>. <br/>
          Et pour tout x réel, <strong>ln(e^x) = x</strong>.
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Transformation Alchimique" icon="🧪" color="indigo">
        <p className="mb-4">
          Le Logarithme a été inventé il y a 400 ans pour simplifier les calculs astronomiques géants. Son pouvoir absolu ? Il transforme les multiplications embêtantes en simples additions !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Produit = Somme" 
            math={"\\ln(a \\times b) = \\ln(a) + \\ln(b)"} 
          />
          <FormulaBox 
            title="Puissance = Multiplication" 
            math={"\\ln(a^n) = n \\times \\ln(a)"} 
          />
        </div>
        <div className="mt-4 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>Grâce à la deuxième formule :</strong> On peut 'faire tomber' l'exposant n. C'est l'outil indispensable pour résoudre des problèmes de Seuil ou de demi-vie (par exemple : "Au bout de combien d'années mon capital de 1000€ dépassera 5000€ avec 3% d'intérêts : 1000 * 1.03^n &gt; 5000").
        </div>
      </Section>

      <Section title="🛠️ L'Annihilateur (ln vs e)" icon="💣" color="amber">
        <p className="mb-4">
          Vérifie par toi-même que ln et exp s'annulent mutuellement.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          
          <div className="flex justify-center mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Choisis x = {valE}</span>
              <input type="range" min="-5" max="5" step="1" value={valE} onChange={(e) => setValE(parseInt(e.target.value))} className="accent-amber-500 w-48" />
            </label>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60 text-center w-full md:w-auto">
              <p className="text-sm text-emerald-900 dark:text-emerald-100 font-bold mb-1">1. L'exponentielle (e^x)</p>
              <p className="font-mono text-xl">e^{valE} ≈ {resultExp}</p>
            </div>
            <div className="text-2xl text-slate-400 font-bold">👉</div>
            <div className="p-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/60 text-center w-full md:w-auto">
              <p className="text-sm text-amber-900 dark:text-amber-100 font-bold mb-1">2. Le Logarithme de ce résultat</p>
              <p className="font-mono text-xl">ln({resultExp}) = {Math.round(Number(resultLn))}</p>
            </div>
          </div>
          <p className="mt-4 text-emerald-700 dark:text-emerald-300 font-bold">L'opération ln() a détruit le travail de l'exponentielle et nous a rendu le '{valE}' de départ !</p>
        </div>
      </Section>

      <Section title="📜 La Courbe : Symétrie Axiale" icon="🖼️" color="rose">
        <p className="mb-4">Dans un repère orthonormé, la courbe de ln est exactement le reflet de la courbe de l'exponentielle par rapport à la droite diagonale <strong>y = x</strong>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Points de passages obligatoires de LN</>}
            back={<><strong>ln(1) = 0</strong><br/><strong>ln(e) = 1</strong><br/><span className="text-sm">Rappelle-toi que e^0=1 et e^1=e. C'est juste l'inverse !</span></>}
          />
          <Flashcard 
            front={<>Variations et Limites</>}
            back={<>La fonction est STRICTEMENT CROISSANTE.<br/>En 0 : la limite est <strong>-∞</strong> (Asymptote verticale).<br/>En +∞ : elle tend vers +∞, MAIS de façon extrêmement lente (c'est la plus faible de toutes les fonctions).</>}
          />
        </div>
      </Section>

      <Section title="🧠 La Dérivée du Logarithme" icon="🔦" color="purple">
         <p className="mb-4">C'est la plus belle dérivée de Terminale. Si simple, si élégante.</p>
         <FormulaBox 
          title="Dérivée Classique" 
          math={"(ln(x))' = 1/x"} 
        />
        <div className="mt-4">
          <FormulaBox 
            title="Dérivée Composée" 
            math={"(ln(u))' = \\frac{u'}{u}"} 
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Simplification de Logarithme"
          question={<p>Transforme l'expression <><MathComponent math={"\\ln(8)"} /></> en utilisant uniquement <><MathComponent math={"\\ln(2)"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Décomposer l'intérieur</p>
              <p>On sait que <><MathComponent math={"8 = 2 \\times 2 \\times 2"} /></>, ou encore <><MathComponent math={"8 = 2^3"} /></>. Donc <><MathComponent math={"\\ln(8) = \\ln(2^3)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer la formule de la puissance</p>
              <p>La règle d'or du logarithme dit que <><MathComponent math={"\\ln(a^n) = n \\ln(a)"} /></>. L'exposant 'tombe' devant.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"\\ln(2^3) = 3 \\ln(2)"} /></> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Équation avec deux Logarithmes"
          question={<p>Résoudre l'équation <><MathComponent math={"\\ln(x) + \\ln(2) = \\ln(10)"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Fusionner les logarithmes</p>
              <p>On utilise la formule <><MathComponent math={"\\ln(a) + \\ln(b) = \\ln(a \\times b)"} /></>. Le côté gauche devient <><MathComponent math={"\\ln(x \\times 2) = \\ln(2x)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'équation simplifiée</p>
              <p>On a donc <><MathComponent math={"\\ln(2x) = \\ln(10)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Retirer le ln</p>
              <p>Comme la fonction ln est strictement monotone, si <><MathComponent math={"\\ln(A) = \\ln(B)"} /></> alors <><MathComponent math={"A = B"} /></>. On peut 'effacer' les ln : <><MathComponent math={"2x = 10"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"2x = 10 \\implies x = 5"} /></>. (Vérification : <><MathComponent math={"\\ln(5) + \\ln(2) = \\ln(5 \\times 2) = \\ln(10)"} /></>).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Résolution" icon="🕹️" color="slate">
        <p className="mb-4">Résolvons l'équation 3 × e^(2x) = 15 :</p>
        <FillInTheBlanks 
          id="ln-eval"
          content={[
            "On a 3 × e^(2x) = 15. D'abord on isole l'exponentielle en divisant par 3 : e^(2x) = ",
            { options: ["12", "5", "45"], correctAnswer: 1 },
            ". \nMaintenant on applique 'ln' de chaque côté pour exploser l'exponentielle : ln(e^(2x)) = ln(5). \nOr, ln(e^(2x)) se simplifie en ",
            { options: ["2", "x", "2x"], correctAnswer: 2 },
            ". \nOn obtient 2x = ln(5). Donc x = ",
            { options: ["ln(5)/2", "ln(2.5)", "ln(5) - 2"], correctAnswer: 0 },
            ". Attention, ln(5)/2 n'est pas égal à ln(2.5) ! On laisse la valeur exacte."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Simplifier l'expression : ln(e²) + e^(ln(4))",
              options: [
                "2e + 4",
                "6",
                "e² + 4"
              ],
              correctAnswer: 1,
              explanation: "ln(e²) ça fait bêtement 2. Et e^(ln(4)) ça fait bêtement 4. Donc 2 + 4 = 6."
            },
            {
              question: "C'est quoi la dérivée de f(x) = ln(3x² + 5) ?",
              options: [
                "1 / (3x² + 5)",
                "6x / (3x² + 5)",
                "ln(6x)"
              ],
              correctAnswer: 1,
              explanation: "Formule (ln(u))' = u' / u. Ici u = 3x²+5, donc u' = 6x. La dérivée est donc le quotient 6x sur (3x²+5)."
            },
            {
              question: "Quelle est la limite de x * ln(x) en 0 ?",
              options: [
                "0",
                "-∞",
                "C'est une Formule indéterminée 0 × (-∞)"
              ],
              correctAnswer: 0,
              explanation: "Oui c'est une F.I., MAIS d'après les Croissances Comparées étudiées au chapitre des limites, x l'emporte toujours sur le pauvre petit ln. C'est donc le 0 de 'x' qui écrase la limite. Résultat = 0."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "ln(1) = 0 et ln(e) = 1.",
            "ln() tue e^() et inversement.",
            "Je sais que ln(A * B) = ln(A) + ln(B) (La transfo magique).",
            "La dérivée de ln(x) est 1/x."
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

export default Course_Terminale_04_Logarithme;
