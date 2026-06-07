import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, 
  Quiz, Flashcard, InteractiveExercise, FormulaBox
} from '../../components/SharedUI';
import { Sliders, Zap, ToggleLeft, ToggleRight, Cpu, HelpCircle } from 'lucide-react';

const BooleanSimulator: React.FC = () => {
  const [a, setA] = useState<boolean>(false);
  const [b, setB] = useState<boolean>(false);

  // Compute standard logical gates
  const andGate = a && b;
  const orGate = a || b;
  const xorGate = a !== b;
  const nandGate = !(a && b);
  const norGate = !(a || b);
  const notA = !a;
  const notB = !b;

  // Morgan rule check: Not(A or B) === (Not A) and (Not B)
  const morganLeft = !(a || b);
  const morganRight = (!a) && (!b);
  const morganValid = morganLeft === morganRight;

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Cpu className="text-indigo-600 animate-pulse" size={22} />
        Simulateur de Portes Logiques & Lois de Morgan
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Basculez les entrées de contrôle {"$A$"} et {"$B$"} pour piloter en temps réel le flux d'informations binaires et vérifier comment les lois de De Morgan s'architecturent physiquement dans les puces électroniques.
      </p>

      {/* Inputs Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => setA(!a)}
          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            a 
              ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-500 text-indigo-700 dark:text-indigo-400 font-bold shadow-md' 
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-350'
          }`}
        >
          <span className="text-sm font-mono tracking-wider">Entrée A</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono">{a ? 'HIGH (1)' : 'LOW (0)'}</span>
            {a ? <ToggleRight className="text-indigo-600" size={24} /> : <ToggleLeft className="text-slate-400" size={24} />}
          </div>
        </button>

        <button 
          onClick={() => setB(!b)}
          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            b 
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold shadow-md' 
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-350'
          }`}
        >
          <span className="text-sm font-mono tracking-wider">Entrée B</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono">{b ? 'HIGH (1)' : 'LOW (0)'}</span>
            {b ? <ToggleRight className="text-emerald-600" size={24} /> : <ToggleLeft className="text-slate-400" size={24} />}
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real-time gates table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sliders size={12} /> Sorties des Portes Logiques
          </h4>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            {/* AND Gate */}
            <div className="flex items-center justify-between p-1.5 rounded-lg border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <span className="font-mono">Porte ET (AND) : {"$A \\cdot B$"}</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${andGate ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                {andGate ? '1' : '0'}
              </span>
            </div>

            {/* OR Gate */}
            <div className="flex items-center justify-between p-1.5 rounded-lg border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <span className="font-mono">Porte OU (OR) : {"$A + B$"}</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${orGate ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                {orGate ? '1' : '0'}
              </span>
            </div>

            {/* XOR Gate */}
            <div className="flex items-center justify-between p-1.5 rounded-lg border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <span className="font-mono">Porte OU Exclusif (XOR) : {"$A \\oplus B$"}</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${xorGate ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                {xorGate ? '1' : '0'}
              </span>
            </div>

            {/* NAND Gate */}
            <div className="flex items-center justify-between p-1.5 rounded-lg border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <span className="font-mono">Porte NON-ET (NAND) : {"$\\overline{A \\cdot B}$"}</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${nandGate ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                {nandGate ? '1' : '0'}
              </span>
            </div>

            {/* NOR Gate */}
            <div className="flex items-center justify-between p-1.5 rounded-lg border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <span className="font-mono">Porte NON-OU (NOR) : {"$\\overline{A + B}$"}</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${norGate ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                {norGate ? '1' : '0'}
              </span>
            </div>
          </div>
        </div>

        {/* Morgan Laws on right */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500" /> Théorème de De Morgan
          </h4>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-950 space-y-4 text-xs">
            <div>
              <p className="font-semibold text-indigo-950 dark:text-indigo-200 mb-1">Première Loi :</p>
              <div className="bg-white dark:bg-slate-950 p-2.5 rounded border border-indigo-150 text-center font-mono font-bold tracking-wide text-indigo-700 dark:text-indigo-400">
                {"$$\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$$"}
              </div>
            </div>

            <div className="space-y-1 bg-white/70 dark:bg-slate-900/60 p-3 rounded-lg border border-indigo-100 dark:border-indigo-950">
              <div className="flex justify-between">
                <span>Membre gauche {"$\\overline{A+B}$"} :</span>
                <span className="font-mono font-bold text-amber-600">{morganLeft ? '1' : '0'}</span>
              </div>
              <div className="flex justify-between">
                <span>Membre droit {"$\\overline{A} \\cdot \\overline{B}$"} :</span>
                <span className="font-mono font-bold text-amber-600">{morganRight ? '1' : '0'}</span>
              </div>
              <div className="flex justify-between border-t border-indigo-100 dark:border-indigo-900 pt-1 text-[10px] text-slate-400 mt-1">
                <span>Identité validée physiquement :</span>
                <span className="text-emerald-600 font-bold">{morganValid ? 'VRAI ✓' : 'FAUX'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Truth Table with Highlighted Current Row */}
      <div className="mt-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Table de Vérité de l'état actuel</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs text-slate-700 bg-white dark:bg-slate-950">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 font-semibold border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-2 font-mono">Input A</th>
                <th className="px-4 py-2 font-mono">Input B</th>
                <th className="px-4 py-2 font-mono">A • B (ET)</th>
                <th className="px-4 py-2 font-mono">A + B (OU)</th>
                <th className="px-4 py-2 font-mono">A ⊕ B (XOR)</th>
                <th className="px-4 py-2 font-mono">NON(A)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rowA: false, rowB: false },
                { rowA: false, rowB: true },
                { rowA: true, rowB: false },
                { rowA: true, rowB: true }
              ].map((row, idx) => {
                const isActive = row.rowA === a && row.rowB === b;
                return (
                  <tr 
                    key={idx} 
                    className={`border-b border-slate-100 dark:border-slate-900 transition-colors ${
                      isActive 
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 font-bold border-l-4 border-l-amber-500' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                    }`}
                  >
                    <td className="px-4 py-2 font-mono">{row.rowA ? '1' : '0'}</td>
                    <td className="px-4 py-2 font-mono">{row.rowB ? '1' : '0'}</td>
                    <td className="px-4 py-2 font-mono">{(row.rowA && row.rowB) ? '1' : '0'}</td>
                    <td className="px-4 py-2 font-mono">{(row.rowA || row.rowB) ? '1' : '0'}</td>
                    <td className="px-4 py-2 font-mono">{(row.rowA !== row.rowB) ? '1' : '0'}</td>
                    <td className="px-4 py-2 font-mono">{row.rowA ? '0' : '1'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Course_BTS_04_Algebre_de_Boole_et_Logique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BTS-SIO-BOOLE"
        title="Algèbre de Boole & Logique Combinatoire"
        subtitle="Variables binaires, lois fondamentales, diagrammes de Karnaugh et conception matérielle de circuits."
        duration="1h 10"
      />

      <InfoBlock type="info" title="L'importance de ce module en informatique">
        L'Algèbre de Boole est la passerelle entre l'algèbre pure et l'électricité. Conçue par George Boole en 1854, elle fut transposée à l'électronique de calcul par Claude Shannon en 1937. C'est grâce à cette théorie qu'on conçoit aujourd'hui des processeurs contenant des milliards de transistors manipulant uniquement des 0 (pas de courant) et des 1 (présence de courant).
      </InfoBlock>

      <Section title="1. Postulats et Fonctions de base" icon="⚡" color="indigo">
        <p className="mb-4">
          Une variable booléenne prend uniquement ses valeurs dans l'ensemble binaire {"$\\mathbb{B} = \\{0, 1\\}$"}. Les trois opérateurs de base sont les piliers de toute logique numérique :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">1. Multiplication (ET / AND)</h4>
            <div className="font-mono text-indigo-600 font-bold bg-white dark:bg-slate-950 px-2 py-1 border rounded my-2">
              {"$S = A \\cdot B$"}
            </div>
            <p className="text-xs text-slate-550">S est vraie si et seulement si A ET B sont vraies simultanément.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">2. Addition (OU / OR)</h4>
            <div className="font-mono text-indigo-600 font-bold bg-white dark:bg-slate-950 px-2 py-1 border rounded my-2">
              {"$S = A + B$"}
            </div>
            <p className="text-xs text-slate-555">S est vraie si au moins l'une des deux entrées A OU B est vraie.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">3. Inversion (NON / NOT)</h4>
            <div className="font-mono text-indigo-600 font-bold bg-white dark:bg-slate-950 px-2 py-1 border rounded my-2">
              {"$S = \\overline{A}$"}
            </div>
            <p className="text-xs text-slate-555">Intervertit rigoureusement l'état : si A = 1 alors S = 0 et inversement.</p>
          </div>
        </div>

        <TipBanner type="info" title="Loi d'idempotence et d'absorption">
          Contrairement aux mathématiques classiques, en algèbre de Boole :
          {"$$A + A = A \\quad \\text{et} \\quad A \\cdot A = A$$"}
          De plus, la logique simplifie par absorption : {"$A + (A \\cdot B) = A$"}.
        </TipBanner>
      </Section>

      <Section title="2. Les Théorèmes de Morgan et l'Universalité" icon="🛡️" color="amber">
        <p className="mb-4">
          Le mathématicien Auguste De Morgan a établi un lien de dualité absolu entre le produit logique et la somme logique. Ces deux formules sont cruciales :
        </p>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-4 rounded-2xl mb-4 text-sm space-y-2">
          <p><strong>Règle d'or de De Morgan :</strong> "La négation d'une conjonction est la disjonction des négations, et inversement."</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaBox 
              title="Loi 1 : Négation d'une Somme" 
              math={"\\overline{A + B} = \\overline{A} \\cdot \\overline{B}"} 
            />
            <FormulaBox 
              title="Loi 2 : Négation d'un Produit" 
              math={"\\overline{A \\cdot B} = \\overline{A} + \\overline{B}"} 
            />
          </div>
        </div>

        <InfoBlock type="funfact" title="L'universalité des portes NAND et NOR">
          En microélectronique de silicium, la construction physique d'une porte inversée (NAND ou NOR) nécessite largement moins de transistors CMOS qu'une porte AND ou OR classique. Or, le théorème de De Morgan démontre qu'à l'aide de portes NAND uniquement (ou NOR uniquement), on peut reconstruire n'importe quelle fonction logique ! On appelle cela des **portes universelles**. Cela permet d'optimiser radicalement la fabrication des puces de mémoire flash.
        </InfoBlock>
      </Section>

      <Section title="3. Simulateur Interactif de Portes et Circuits" icon="🎮" color="indigo">
        <BooleanSimulator />
      </Section>

      <Section title="🧠 Flashcards : Réflexes Algébriques" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez votre mémoire à reconnaître instantanément les simplifications logiques et les théorèmes de De Morgan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Que vaut {"$A + (A \\cdot B)$"} en algèbre de Boole ?</>}
            back={<>Elle vaut simplement {"$A$"} ! C&apos;est la <strong>loi d&apos;absorption</strong> : si A est vrai, l&apos;expression est vraie ; si A est faux, toute l&apos;expression est fausse.</>}
          />
          <Flashcard 
            front={<>Quelle est la porte logique universelle la plus utilisée en industrie ?</>}
            back={<>La porte <strong>NAND</strong> (NON-ET). À elle seule, elle peut reproduire le ET, le OU et le NON, permettant de fabriquer des processeurs complets avec un seul type de transistor physique.</>}
          />
        </div>
      </Section>

      <Section title="4. Exercices Corrigés de Simplification Algébrique" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Simplification d'une équation logique complexe"
          question={
            <div className="space-y-2">
              <p>Simplifier au maximum l'expression binaire logique suivante en appliquant les lois fondamentales (symétrie, distributivité, De Morgan) :</p>
              {"$$F = A \\cdot \\overline{B} \\cdot C + A \\cdot B \\cdot C + A \\cdot \\overline{C}$$"}
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Regrouper par factorisation commune</p>
              <p>On remarque que le facteur {"$A \\cdot C$"} est commun aux deux premiers termes. Factorisons :</p>
              {"$$F = A \\cdot C \\cdot (\\overline{B} + B) + A \\cdot \\overline{C}$$"}
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Appliquer la loi du tiers exclu</p>
              <p>Par postulat, la somme d'une variable et de sa négation vaut toujours 1 {"$B + \\overline{B} = 1$"}. L'expression s'énonce :</p>
              {"$$F = A \\cdot C \\cdot 1 + A \\cdot \\overline{C} = A \\cdot C + A \\cdot \\overline{C}$$"}
            </div>,
            <div className="bg-amber-55/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 3 : Factoriser par A</p>
              <p>On met de nouveau A en facteur :</p>
              {"$$F = A \\cdot (C + \\overline{C})$"}
              <p>Puisque {"$C + \\overline{C} = 1$"}, on obtient de manière limpide :</p>
              {"$$F = A \\cdot 1 = A$$"}
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-100 text-xs">
              <p>Solution finale : L'équation monstrueuse d'origine se simplifie en un simple fil : F = A. Les signaux B et C n'ont absolument aucune influence sur le résultat final. C'est l'essence de l'optimisation logique combinatoire !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Épreuve de Certification" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle expression est l'équivalente exacte de NON(A ET B) selon les principes de De Morgan ?",
              options: [
                "NON(A) ET NON(B)",
                "NON(A) OU NON(B)",
                "NON(A OU B)"
              ],
              correctAnswer: 1,
              explanation: "Rappel de la deuxième loi de De Morgan : la négation d'un produit (ET) devient la somme (OU) des négations."
            },
            {
              question: "Que donne l'évaluation binaire de l'expression (A XOR B) lorsque A = 1 et B = 1 ?",
              options: [
                "1",
                "0",
                "Deux"
              ],
              correctAnswer: 1,
              explanation: "Le OU Exclusif (XOR) renvoie 1 si et seulement si une seule des entrées est à 1. Lorsque les deux sont à 1, la condition exclusive échoue et renvoie 0."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Connaître l'ensemble binaire variable B = {0, 1}.",
            "Maîtriser les lois fondamentales (idempotence, complémentarité, absorption).",
            "Savoir appliquer De Morgan pour transformer des réseaux de portes logiques.",
            "Simplifier des équations logiques par factorisation et parité."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+35 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_BTS_04_Algebre_de_Boole_et_Logique;
