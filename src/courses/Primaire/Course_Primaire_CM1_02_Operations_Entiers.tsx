import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Calculator, ArrowRight, CornerRightDown, HelpCircle, ChevronRight, ChevronLeft, Play } from 'lucide-react';

const Course_Primaire_CM1_02_Operations_Entiers: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [multStep, setMultStep] = useState<number>(0);

  const stepsData = [
    {
      title: "Étape 1 : Le départ !",
      desc: "Nous allons calculer 43 × 25. Nous posons le calcul en alignant bien les unités sous les unités, les dizaines sous les dizaines.",
      highlight: "all"
    },
    {
      title: "Étape 2 : Unités d'abord (43 × 5)",
      desc: "On commence par multiplier 43 par le chiffre des unités, c'est-à-dire 5. 3 × 5 = 15 (on pose 5 et retient 1). Puis 4 × 5 = 20, plus la retenue 1 = 21. Première ligne s'écrit 215 !",
      highlight: "line1"
    },
    {
      title: "Étape 3 : Le Zéro de Décalage !",
      desc: "Maintenant, nous allons multiplier par les dizaines (le chiffre 2). Puisque ce sont des dizaines, on doit ABSOLUMENT poser un zéro (le zéro magique) tout à droite sur la seconde ligne !",
      highlight: "zero"
    },
    {
      title: "Étape 4 : Dizaines ensuite (43 × 2)",
      desc: "On multiplie 43 par le chiffre 2. 3 × 2 = 6, puis 4 × 2 = 8. On écrit 86 à côté de notre zéro magique. La deuxième ligne s'écrit 860 !",
      highlight: "line2"
    },
    {
      title: "Étape 5 : L'Addition Finale",
      desc: "On trace la ligne finale pour faire l'addition des deux étages : 215 + 860 = 1075. Notre produit magique est terminé !",
      highlight: "sum"
    }
  ];
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CM1-OPE"
        title="Opérations sur les Entiers"
        subtitle="Maîtriser l'addition, la soustraction, et la multiplication posée à plusieurs chiffres."
        duration="35 min"
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Au CM1, l'élève consolide et approfondit les notions opératoires à plusieurs chiffres. L'accent est mis sur la précision de l'alignement vertical (les unités sous les unités) et sur la rigueur du calcul des retenues, notamment pour la soustraction à plusieurs chiffres et la multiplication à deux chiffres en colonne, qui présente la difficulté additionnelle du décalage (le fameux "zéro magique").
      </InfoBlock>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Le comptable du Roi
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Ton rôle grandit ! Tu n'es plus le gérant d'une simple ferme, tu es aujourd'hui le Grand Comptable du Roi. Dans tes livres de compte, tu notes l'or qui rentre au château (les impôts) et l'or qui sort (pour les travaux ou l'armée). Tu travailles avec des nombres immenses qui dépassent les centaines de milliers.
          Pour ne pas te tromper (ce qui mettrait le Roi très en colère), tes opérations posées d'addition, de soustraction, et de multiplication doivent être parfaites. L'astuce magique des grands comptables est de toujours <strong>estimer</strong> d'abord l'opération dans la tête. Par exemple, si tu additionnes 19 800 et 10 100, tu sais déjà mentalement que le résultat sera "proche de 30 000".
        </p>
      </div>

      <Section title="1. Les 4 Opérations" icon={<Calculator className="w-6 h-6" />} color="emerald">
        <p className="mb-4">
          Au CM1, on continue de calculer mais avec des nombres beaucoup plus grands. Il faut impérativement bien poser ses calculs en colonnes (et maitriser ses tables de multiplication !).
        </p>
        <InfoBlock type="info" title="Les règles en colonne">
          On aligne toujours tout sur la droite : les Unités sous les Unités, les Dizaines sous les Dizaines !<br/>
          Attention aux <strong>retenues</strong> : on pose l'unité, on retient la dizaine dans la colonne d'à côté.
        </InfoBlock>
      </Section>

      <Section title="2. La Multiplication à 2 chiffres" icon={<MathComponent math={"\\times"} />} color="indigo">
        <p className="mb-4">
          Quand on multiplie par un nombre à deux chiffres, comme {"$43 \\times 25$"}, on fait en réalité DEUX calculs séparés, qu'on va additionner ensuite.
        </p>
        
        {/* Interactive Column Mult Widget */}
        <div className="bg-gradient-to-br from-indigo-50/55 to-slate-50 border border-indigo-100 dark:from-slate-900/40 dark:to-slate-950 dark:border-indigo-900/40 p-6 rounded-[2rem] my-8 shadow-inner">
          <h4 className="font-bold text-center text-indigo-950 dark:text-indigo-50 text-lg mb-6 flex items-center justify-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-500" />
            La Multiplication Posée Étape-par-Étape
          </h4>

          {/* Interactive display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Column calculation SVG */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex justify-center">
              <svg viewBox="0 0 200 240" className="w-48 h-auto" id="mult-svg">
                {/* Math layout grid lines */}
                <line x1="20" y1="40" x2="180" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="80" x2="180" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="120" x2="180" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="160" x2="180" y2="160" stroke="#f1f5f9" strokeWidth="1" />

                {/* Grid Columns notation */}
                <text x="75" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">D</text>
                <text x="115" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">U</text>

                {/* Row 1: 43 */}
                <text x="75" y="65" fill={multStep >= 1 ? "#3b82f6" : "#64748b"} fontSize="28" fontWeight="bold" fontFamily="monospace">4</text>
                <text x="115" y="65" fill={multStep >= 1 ? "#3b82f6" : "#64748b"} fontSize="28" fontWeight="bold" fontFamily="monospace">3</text>

                {/* Row 2: x 25 */}
                <text x="35" y="105" fill="#64748b" fontSize="24" fontWeight="bold" fontFamily="monospace">×</text>
                <text x="75" y="105" fill={multStep === 3 ? "#eab308" : "#64748b"} fontSize="28" fontWeight="bold" fontFamily="monospace">2</text>
                <text x="115" y="105" fill={multStep === 1 ? "#ec4899" : "#64748b"} fontSize="28" fontWeight="bold" fontFamily="monospace">5</text>

                {/* Separator 1 */}
                <line x1="20" y1="120" x2="150" y2="120" stroke="#475569" strokeWidth="2" />

                {/* Subtotal 1 (43 x 5 = 215) */}
                {multStep >= 1 && (
                  <g>
                    <text x="35" y="150" fill="#ec4899" fontSize="28" fontWeight="bold" fontFamily="monospace">{multStep >= 1 ? "2" : ""}</text>
                    <text x="75" y="150" fill="#ec4899" fontSize="28" fontWeight="bold" fontFamily="monospace">{multStep >= 1 ? "1" : ""}</text>
                    <text x="115" y="150" fill="#ec4899" fontSize="28" fontWeight="bold" fontFamily="monospace">{multStep >= 1 ? "5" : ""}</text>
                  </g>
                )}

                {/* Subtotal 2 (43 x 20 = 860) */}
                {multStep >= 2 && (
                  <g>
                    <text x="35" y="190" fill={multStep >= 3 ? "#eab308" : "#94a3b8"} fontSize="28" fontWeight="bold" fontFamily="monospace">{multStep >= 3 ? "8" : ""}</text>
                    <text x="75" y="190" fill={multStep >= 3 ? "#eab308" : "#94a3b8"} fontSize="28" fontWeight="bold" fontFamily="monospace">{multStep >= 3 ? "6" : ""}</text>
                    {/* Zéro magique - highlight on step 2 */}
                    <text x="115" y="190" fill="#ef4444" fontSize="28" fontWeight="black" fontFamily="monospace">0</text>
                  </g>
                )}

                {/* Separator 2 */}
                {multStep >= 4 && (
                  <line x1="20" y1="205" x2="150" y2="205" stroke="#475569" strokeWidth="2" />
                )}

                {/* Total Row (1075) */}
                {multStep === 4 && (
                  <g>
                    <text x="-5" y="235" fill="#10b981" fontSize="28" fontWeight="black" fontFamily="monospace">1</text>
                    <text x="35" y="235" fill="#10b981" fontSize="28" fontWeight="black" fontFamily="monospace">0</text>
                    <text x="75" y="235" fill="#10b981" fontSize="28" fontWeight="black" fontFamily="monospace">7</text>
                    <text x="115" y="235" fill="#10b981" fontSize="28" fontWeight="black" fontFamily="monospace">5</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Stepper text explanation */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-150 dark:border-slate-700 min-h-[140px]">
                <h5 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                  {stepsData[multStep].title}
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {stepsData[multStep].desc}
                </p>
              </div>

              {/* Controls */}
              <div className="flex justify-between gap-3 pt-2">
                <button
                  disabled={multStep === 0}
                  onClick={() => setMultStep((prev) => prev - 1)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl hover:bg-slate-300 hover:dark:bg-slate-600 font-bold text-xs disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Précédent
                </button>

                <div className="flex items-center text-xs font-mono text-slate-500">
                  Étape {multStep + 1} / 5
                </div>

                {multStep < 4 ? (
                  <button
                    onClick={() => setMultStep((prev) => prev + 1)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 font-bold text-xs transition-all flex items-center gap-1"
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setMultStep(0)}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-bold text-xs transition-all flex items-center gap-1"
                  >
                    Recommencer <Play className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="3. Vrai ou Faux" icon={<HelpCircle className="w-6 h-6" />} color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans une soustraction, je peux inverser l'ordre si c'est plus facile.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">L'addition est commutative (3+5 = 5+3). Mais la soustraction ne l'est pas ! 5-3 (j'ai 5 bonbons, on m'en prend 3) n'a rien à voir avec 3-5. Le plus grand doit OBLIGATOIREMENT être en haut.</span></>}
          />
          <Flashcard 
            front={<>Si j'oublie le zéro de décalage, ma multiplication s'effondre.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Oublier le zéro quand tu passes au chiffre des dizaines, c'est comme diviser ton résultat de cet étage par dix. L'addition finale sera totalement fausse. N'oublie jamais ton zéro !</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Poser une addition difficile"
          question={<p>Dans l'opération <><MathComponent math={"68 + 45"} /></>, que fais-tu de la retenue sur la colonne des unités ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calculer la première colonne (les unités)</p>
              <p>On fait <><MathComponent math={"8 + 5 = 13"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Tu écris le chiffre des unités (le "3") tout en bas, sous la barre. Et tu notes le chiffre des dizaines de 13 (le "1") tout en haut de la colonne des dizaines ! Dans la colonne des dizaines on fera <><MathComponent math={"1 + 6 + 4"} /></> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : La soustraction avec retenue par 'emprunt'"
          question={<p>Dans l'opération <><MathComponent math={"82 - 39"} /></>, comment soustraire 9 à 2 ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le problème ("on ne peut pas !")</p>
              <p><><MathComponent math={"2 - 9"} /></> c'est impossible. On a 2 Unités et le brigand nous en demande 9.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'emprunt à la banque (les dizaines)</p>
              <p>La colonne des Unités va "casser" une des 8 Dizaines du voisin pour lui piquer 10 unités ! Le 8 devient un 7 barré. Notre 2 devient <><MathComponent math={"2 + 10 = 12"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : L'opération devient possible : <><MathComponent math={"12 - 9 = 3"} /></> dans la colonne des Unités. Et dans les dizaines, on fait <><MathComponent math={"7 - 3 = 4"} /></>. Total : 43.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Complète avec le bon vocabulaire des opérations :</p>
        <FillInTheBlanks 
          id="cm1-ope-eval"
          content={[
            "Le résultat d'une addition avec un signe +, s'appelle une ",
            { options: ["somme", "différence", "produit"], correctAnswer: 0 },
            ". \nLe résultat d'une soustraction avec le signe -, s'appelle la ",
            { options: ["somme", "différence", "produit"], correctAnswer: 1 },
            ". \nEt enfin, le résultat d'une multiplication posée en signe ×, s'appelle un ",
            { options: ["reste", "résultat", "produit"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Combien fait 30 × 40 de tête sans le poser ?",
              options: [
                "120",
                "1200",
                "70"
              ],
              correctAnswer: 1,
              explanation: "Règle des mulitplication avec des zéros : on fait 3 × 4 = 12. Puis on réinjecte les deux zéros 'enlevés'. Ça fait 1200 !"
            },
            {
              question: "Si j'écris 235 sur la première ligne, et 64 sur la seconde ligne sans mettre de zéro décalé sous le 6, mon calcul c'est :",
              options: [
                "235 × 64",
                "235 × (6 + 4), c'est à dire 235 × 10",
                "Je n'ai calculé que 235 × 64 mais mal aligné"
              ],
              correctAnswer: 1,
              explanation: "En ne décalant pas ton deuxième chiffre avec un zéro, la structure logique pense que tu as simplement multiplié 235 par le CHIFFRE 6 de tout à l'heure, comme s'il s'agissait d'Unités. Tu auras donc calculé l'équivalent de faire 235 × (4+6) = 235 × 10."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "J'aligne toujours mes calculs à droite (unité sous unité).",
            "La soustraction pose toujours le nombre le plus grand en haut.",
            "Je souligne mon OBLIGATION de mettre mon zéro de décalage dans la multiplication à plusieurs étages.",
            "Je connais les mots Somme, Différence et Produit."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM1_02_Operations_Entiers;
