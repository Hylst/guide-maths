import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Seconde_04_Calcul_Litteral: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [aVal, setAVal] = useState<number>(3);
  const [bVal, setBVal] = useState<number>(5);

  const ir1 = aVal * aVal + 2 * aVal * bVal + bVal * bVal;
  const dev = (aVal + bVal) * (aVal + bVal);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-CAL"
        title="Calcul Littéral & Équations"
        subtitle="Développer, factoriser, et dompter les x une fois pour toutes."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : La Gymnastique des Lettres" icon="🔤" color="emerald">
        <p>
          Pourquoi mettre des x, des a et des b partout ? Parce qu'en maths, on veut créer des formules générales qui marchent <strong>tout le temps</strong>, pas juste pour 2 ou pour 5.
        </p>
        <p className="mt-2">
          Le calcul littéral, c'est l'art de savoir plier, déplier, et simplifier ces formules géantes sans changer leur valeur finale. C'est le fondement absolu des mathématiques au lycée. Si tu rates la marche du calcul littéral, tu trébucheras dans tous les autres chapitres.
        </p>
        
        <InfoBlock type="definition" title="Le Vocabulaire Sacré">
          - <strong>Développer :</strong> Transformer un produit en somme (On "déplie", on casse les parenthèses).<br/>
          - <strong>Factoriser :</strong> Transformer une somme en produit (On "compacte", on met en facteurs, on crée des parenthèses).<br/>
          - <strong>Réduire :</strong> Rassembler ceux qui se ressemblent (les x² avec les x², les x avec les x, les nombres avec les nombres).
        </InfoBlock>
      </Section>

      <Section title="⚔️ Les 3 Identités Remarquables" icon="👑" color="indigo">
        <p className="mb-4">
          Ce sont les raccourcis ultimes. Connaître ces 3 formules te fait gagner des heures de calcul en contrôle, et surtout, elles sont indispensables pour réussir à factoriser !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FormulaBox 
            title="Le Carré de la Somme" 
            formula={<>(a + b)² = a² + 2ab + b²</>} 
          />
          <FormulaBox 
            title="Le Carré de la Différence" 
            formula={<>(a - b)² = a² - 2ab + b²</>} 
          />
          <FormulaBox 
            title="La Différence de Carrés" 
            formula={<>(a - b)(a + b) = a² - b²</>} 
          />
        </div>

        <Accordion title="Pourquoi 2ab ? Le secret du double produit !">
          <div className="p-4 bg-card border border-border rounded-xl space-y-2">
            <p className="text-slate-700 dark:text-slate-300">L'erreur la plus commune du monde entier est d'écrire <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">(a+b)² = a² + b²</span>.</p>
            <p className="font-bold text-rose-900 dark:text-rose-100">C'est FAUX ! L'archange des maths pleure à chaque fois.</p>
            <p className="text-slate-700 dark:text-slate-300">Preuve : (a+b)² = (a+b)(a+b) = a×a + a×b + b×a + b×b = a² + ab + ab + b² = <strong>a² + 2ab + b²</strong>.</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🛠️ Vérificateur d'Identité" icon="⚖️" color="amber">
        <p className="mb-4">
          Vérifions que l'égalité parfaite (a+b)² = a² + 2ab + b² fonctionne avec n'importe quels nombres.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center gap-8 mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Choix de a = {aVal}</span>
              <input type="range" min="-5" max="10" step="1" value={aVal} onChange={(e) => setAVal(parseInt(e.target.value))} className="accent-indigo-500 w-32" />
            </label>
            <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Choix de b = {bVal}</span>
              <input type="range" min="-5" max="10" step="1" value={bVal} onChange={(e) => setBVal(parseInt(e.target.value))} className="accent-rose-500 w-32" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/60">
              <span className="block font-bold text-sm text-indigo-900 dark:text-indigo-100 uppercase mb-2">Méthode 1 : Calcul direct de (a+b)²</span>
              <span className="font-mono text-lg text-slate-900 dark:text-slate-100 block mb-1">({aVal} + {bVal})²</span>
              <span className="font-mono text-lg text-slate-900 dark:text-slate-100 block mb-2">({aVal + bVal})²</span>
              <span className="font-mono text-2xl font-bold text-indigo-950 dark:text-indigo-50">{dev}</span>
            </div>
            <div className="p-4 bg-rose-50/50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/60">
              <span className="block font-bold text-sm text-rose-900 dark:text-rose-100 uppercase mb-2">Méthode 2 : L'identité a² + 2ab + b²</span>
              <span className="font-mono text-lg text-slate-900 dark:text-slate-100 block mb-1">{aVal}² + 2×{aVal}×{bVal} + {bVal}²</span>
              <span className="font-mono text-lg text-slate-900 dark:text-slate-100 block mb-2">{aVal*aVal} + {2*aVal*bVal} + {bVal*bVal}</span>
              <span className="font-mono text-2xl font-bold text-rose-950 dark:text-rose-50">{ir1}</span>
            </div>
          </div>
          <p className="mt-4 text-emerald-700 dark:text-emerald-300 font-bold">Peu importe le choix de a et b, ça fait toujours pareil !</p>
        </div>
      </Section>

      <Section title="🧠 L'Art de l'Équation Produit-Nul" icon="🔦" color="purple">
         <p className="mb-4">En Seconde, tu apprends à résoudre des équations beaucoup plus complexes qu'au collège. L'astuce majestueuse, c'est le <strong>Produit-Nul</strong>.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Règle du Produit-Nul : Si <strong>A × B = 0</strong>, que peux-tu dire ?</>}
            back={<>Soit A = 0, soit B = 0 !<br/><span className="text-sm">Impossible que le résultat d'une multiplication soit 0 si aucun des deux morceaux ne vaut 0.</span></>}
          />
          <Flashcard 
            front={<>Comment on résout <strong>(2x - 4)(x + 3) = 0</strong> ?</>}
            back={<>On le casse en deux : <br/>2x - 4 = 0 👉 x = 2.<br/>x + 3 = 0 👉 x = -3.<br/>Les solutions sont 2 et -3.</>}
          />
        </div>
        
        <div className="mt-6 bg-slate-100 dark:bg-slate-800 p-4 border border-slate-300 dark:border-slate-700 rounded-xl">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">La règle ultime pour résoudre une équation au lycée :</h4>
          <ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 space-y-2">
            <li>On passe <strong>TOUT</strong> du même côté pour avoir "... = 0".</li>
            <li>On <strong>FACTORISE</strong> ce qu'il y a à gauche (grâce au facteur commun ou aux identités remarquables).</li>
            <li>On applique la règle de l'<strong>équation Produit-Nul</strong> pour trouver les valeurs de x.</li>
          </ol>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Factorisation par facteur commun"
          question={<p>Factoriser l'expression suivante au maximum : <><MathComponent math={"E = (2x + 1)(x - 3) + (2x + 1)(5x + 2)"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Repérer le facteur commun</p>
              <p>On remarque que la parenthèse <><MathComponent math={"(2x + 1)"} /></> apparaît dans les deux termes de l'addition.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Mettre en facteur</p>
              <p>On écrit <><MathComponent math={"(2x + 1)"} /></> une seule fois devant un grand crochet, et on recopie tout le reste à l'intérieur :<br/><><MathComponent math={"E = (2x + 1) [ (x - 3) + (5x + 2) ]"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Réduire l'intérieur du crochet</p>
              <p>On supprime les petites parenthèses à l'intérieur : <><MathComponent math={"x - 3 + 5x + 2 = 6x - 1"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La forme factorisée est <><MathComponent math={"E = (2x + 1)(6x - 1)"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Résolution d'équation cachée"
          question={<p>Résoudre l'équation : <><MathComponent math={"x^2 - 25 = 0"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Identifier le problème</p>
              <p>C'est une équation de degré 2 (avec un carré). On ne sait pas isoler <><MathComponent math={"x"} /></> directement au lycée. La règle est donc : tout mettre du même côté (déjà fait) et FACTORISER.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Factoriser avec une identité remarquable</p>
              <p>On reconnaît <><MathComponent math={"a^2 - b^2"} /></> avec <><MathComponent math={"a = x"} /></> et <><MathComponent math={"b = 5"} /></>. <br/>Donc <><MathComponent math={"x^2 - 25 = (x - 5)(x + 5)"} /></>. L'équation devient <><MathComponent math={"(x - 5)(x + 5) = 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Règle du Produit Nul</p>
              <p>Soit <><MathComponent math={"x - 5 = 0"} /></> (donc <><MathComponent math={"x = 5"} /></>). <br/>Soit <><MathComponent math={"x + 5 = 0"} /></> (donc <><MathComponent math={"x = -5"} /></>).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"\\mathcal{S} = \\{ -5 ; 5 \\}"} /></>. Il y a deux solutions !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Symétrie" icon="🕹️" color="slate">
        <p className="mb-4">Développe (sans te tromper sur les signes !) :</p>
        <FillInTheBlanks 
          id="diff-eval"
          content={[
            "On me demande de développer l'expression A = (x - 5)². C'est la 2ème identité remarquable. J'écris x² - 2×x×5 + 5², ce qui donne x² - ",
            { options: ["10x", "5x", "2x"], correctAnswer: 0 },
            " + ",
            { options: ["25", "-25", "10"], correctAnswer: 0 },
            ". Bravo ! Maintenant, je dois développer B = (3x + 2)(3x - 2). Je reconnais la 3ème identité (a+b)(a-b). Cela fait (3x)² - 2². Attention, le carré de 3x s'applique au 3 ET au x ! Cela donne donc ",
            { options: ["3x² - 4", "9x - 4", "9x² - 4"], correctAnswer: 2 },
            ". Parfait !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la factorisation de (x² - 16) ?",
              options: [
                "(x - 4)²",
                "(x - 16)(x + 16)",
                "(x - 4)(x + 4)"
              ],
              correctAnswer: 2,
              explanation: "Ici on a a² - b², avec a=x et b=4 (car 4²=16). La factorisation donne (a-b)(a+b), c'est-à-dire (x-4)(x+4)."
            },
            {
              question: "Si j'ai l'équation x² = 9. Quelles sont les solutions ?",
              options: [
                "x = 3 uniquement",
                "x = 3 ou x = -3",
                "x = 4.5"
              ],
              correctAnswer: 1,
              explanation: "L'erreur classique est d'oublier le négatif ! (-3)² = 9 aussi ! (Tu peux le prouver en faisant x² - 9 = 0, soit (x-3)(x+3)=0)."
            },
            {
              question: "Le double produit dans le développement de (2x + 7)² vaut :",
              options: [
                "14x",
                "28x",
                "9x"
              ],
              correctAnswer: 1,
              explanation: "Le double produit c'est 2ab. Donc 2 × (2x) × (7). 2×2x = 4x. Et 4x × 7 = 28x !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais mes 3 identités remarquables par cœur (et dans les deux sens !).",
            "Je n'oublie JAMAIS le double produit (+2ab ou -2ab) quand je fais le carré d'une parenthèse.",
            "Je n'écris jamais a²+b²=(a+b)², ce qui provoquerait la fin du monde.",
            "Pour résoudre f(x)=0, je passe tout du même côté et je factorise pour faire un produit-nul."
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

export default Course_Seconde_04_Calcul_Litteral;
