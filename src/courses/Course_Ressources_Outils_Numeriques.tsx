import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz
} from '../components/SharedUI';
import { Play, RotateCcw, Code, Cpu, Terminal, Layers } from 'lucide-react';

const Course_Ressources_Outils_Numeriques: React.FC = () => {
  // Python simulator state
  const [aValue, setAValue] = useState<number>(0.8);
  const [bValue, setBValue] = useState<number>(3);
  const [u0Value, setU0Value] = useState<number>(10);
  const [steps, setSteps] = useState<{ n: number; u: number }[]>([{ n: 0, u: 10 }]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Procédure de calcul des valeurs pour la suite u_{n+1} = a*u_n + b
  const runSimulation = () => {
    setIsRunning(true);
    let currentU = u0Value;
    const computedSteps = [{ n: 0, u: currentU }];
    
    for (let i = 1; i <= 6; i++) {
      currentU = aValue * currentU + bValue;
      computedSteps.push({ n: i, u: parseFloat(currentU.toFixed(4)) });
    }
    setSteps(computedSteps);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsRunning(false);
    }
  };

  const handleResetSim = () => {
    setSteps([{ n: 0, u: u0Value }]);
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="RES-TOOL"
        title="Outils Numériques en Mathématiques"
        subtitle="Apprenez à dompter les algorithmes Python, les calculatrices graphiques (NumWorks, TI, Casio) et Geogebra pour accélérer vos résolutions."
        duration="N/A"
      />

      <InfoBlock type="info" title="L'alliance de l'esprit et de la machine">
        <p>
          En mathématiques modernes, savoir poser une équation à la main est indispensable, mais savoir la programmer ou la modéliser sur ordinateur est la clé pour aborder des applications concrètes (physique, finance, intelligence artificielle).
        </p>
      </InfoBlock>

      <Section title="🐍 Exercice Interactif : Algorithmique & Python" icon={<Terminal className="w-5 h-5" />} color="indigo">
        <p className="mb-4">
          La modélisation algorithmique permet d'étudier des suites récurrentes de type {"$u_{n+1} = a \\cdot u_n + b$"} sur de longues durées. 
          Configurez les paramètres ci-dessous et simulez l'évaluation du script Python pas à pas.
        </p>

        {/* ALGORITHM INTERACTIVE SIMULATOR */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-400" /> Console Python Interactive
            </span>
            <div className="flex gap-2">
              <button 
                onClick={runSimulation}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all flex items-center gap-1 text-white"
              >
                <Play size={12} /> Compiler & Init
              </button>
              <button 
                onClick={handleResetSim}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 text-slate-300"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Code display */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs md:text-sm leading-relaxed text-slate-300 relative select-none">
              <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-bold uppercase">Source Code</div>
              <p className="text-indigo-400">def <span className="text-indigo-200">calcul_suite</span>(a, b, u0, n):</p>
              <p className="pl-4 text-emerald-400">u = u0 <span className="text-slate-600"># Initialisation</span></p>
              <p className="pl-4 text-indigo-400">for <span className="text-slate-300">i</span> in <span className="text-indigo-200">range</span>(1, n+1):</p>
              <p className="pl-8 text-indigo-300">u = a * u + b <span className="text-slate-600"># Récurrence</span></p>
              <p className="pl-4 text-indigo-400">return <span className="text-indigo-300">u</span></p>
              
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                <span className="text-slate-500 text-[10px] font-bold block uppercase tracking-wider">Configurez les Variables :</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Pente (a)</label>
                    <input 
                      type="number" step="0.1" value={aValue} 
                      onChange={(e) => setAValue(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Ajout (b)</label>
                    <input 
                      type="number" step="1" value={bValue} 
                      onChange={(e) => setBValue(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">u0 initial</label>
                    <input 
                      type="number" step="1" value={u0Value} 
                      onChange={(e) => setU0Value(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Tracing state */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider mb-3">État d'exécution pas-à-pas :</span>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Étape n (Indice)</span>
                    <span className="font-bold text-indigo-400">i = {currentStep}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Valeur de u(n)</span>
                    <span className="font-bold text-emerald-400">u = {steps[currentStep]?.u ?? 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-500">Calcul en cours :</span>
                    <span className="text-slate-300">
                      {currentStep === 0 ? 'Initialisation' : `${aValue} * ${steps[currentStep-1]?.u} + ${bValue} = ${steps[currentStep]?.u}`}
                    </span>
                  </div>
                </div>
              </div>

              {isRunning && (
                <button 
                  onClick={handleNextStep}
                  className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-xs text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <Cpu className="w-4 h-4" /> Passer à l'indice i = {currentStep + 1}
                </button>
              )}

              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Historique de la mémoire</span>
                <div className="flex flex-wrap gap-2">
                  {steps.slice(0, currentStep + 1).map((el, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded font-mono text-[10px]">
                      u_{el.n} = {el.u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧮 Astuces pour la Calculatrice Graphique" icon={<Layers className="w-5 h-5" />} color="emerald">
        <p className="mb-4">
          La calculatrice est la meilleure arme en examen si on l'utilise efficacement pour vérifier ses résultats analytiques.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBlock type="reminder" title="Le Mode Grapheur">
            <p className="text-sm">
              Saisissez l'équation d'une fonction (ex : {"$f(x) = x e^x$"}). Utilisez la touche <strong>Trace / Calcul</strong> pour repérer numériquement les extrémums, les extrema locaux de la dérivée sans faire le calcul à la main, idéal pour valider sa démarche.
            </p>
          </InfoBlock>
          <InfoBlock type="definition" title="Le Mode Tableur">
            <p className="text-sm">
              Saisissez l'expression d'une suite définie par récurrence ou formule explicite. Le tableau généré vous permet de comparer d'un coup d'œil les termes de la suite pour identifier s'ils convergent ou divergent vers l'infini.
            </p>
          </InfoBlock>
        </div>
      </Section>

      <Section title="🧠 Flashcards : Outils Numériques" icon="🧠" color="amber">
        <p className="mb-4">
          Un entraînement rapide pour maîtriser les fonctionnalités logicielles incontournables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>En Python, quelle syntaxe utilise-t-on pour tester l'égalité stricte entre deux valeurs ?</>}
            back={<>On utilise le double égal <strong>==</strong> (tandis qu'un simple égal <strong>=</strong> sert pour l'affectation dans une variable).</>}
          />
          <Flashcard 
            front={<>Quelle fonction Python permet de générer une boucle d'indices de 0 à 9 ?</>}
            back={<>La fonction <strong>range(10)</strong>.</>}
          />
          <Flashcard 
            front={<>Qu'est-ce qu'une table de valeurs sur calculatrice ?</>}
            back={<>Une table numérique calculant instantanément {"$f(x)$"} pour un pas donné de {"$x$"} (ex: {"$x = 1$"}, {"$x = 1.1$"}, ...).</>}
          />
          <Flashcard 
            front={<>Comment s'appelle l'instruction Python pour renvoyer le résultat d'une fonction mathématique ?</>}
            back={<>L'instruction <strong>return</strong>.</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Test Rétro-Numérique" icon="⚙" color="purple">
        <Quiz 
          questions={[
            {
              question: "Que fait l'instruction range(2, 6) en Python ?",
              options: [
                "Génère les entiers : 2, 3, 4, 5, 6",
                "Génère les entiers : 2, 3, 4, 5",
                "Calcule l'intervalle [2 ; 6]",
                "Calcule 2 puissance 6"
              ],
              correctAnswer: 1,
              explanation: " range(debut, fin) en Python inclut l'indice de début mais exclut toujours l'indice de fin. On s'arrête donc à 5."
            },
            {
              question: "Dans quel cas utilise-t-on Geogebra d'un point de vue algébrique ?",
              options: [
                "Créer une base de données",
                "Tracer des figures dynamiques et visualiser des intersections complexes",
                "Calculer l'écart-type d'une série continue uniquement",
                "Écrire un code Python compilable"
              ],
              correctAnswer: 1,
              explanation: "Geogebra est l'outil phare de géométrie dynamique, idéal pour tracer des courbes, des vecteurs de l'espace, et observer les intersections de droites."
            },
            {
              question: "Si j'écris 'x = x + 3', de quelle opération informatique s'agit-il ?",
              options: [
                "Une équation insoluble",
                "Une affectation mettant à jour la variable x en lui ajoutant 3",
                "Un test d'égalité logique",
                "Une fonction récursive pure"
              ],
              correctAnswer: 1,
              explanation: "Dans la majorité des langages de programmation dont Python, l'instruction active 'x = x + 3' évalue la partie droite et affecte la nouvelle valeur à la variable de gauche."
            }
          ]}
        />
      </Section>
    </div>
  );
};

export default Course_Ressources_Outils_Numeriques;
