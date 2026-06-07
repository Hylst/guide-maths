import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, StepList, AccordionFAQ, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Play, ChevronRight, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

const Course_5eme_01_Priorites_Operatoires: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State
  const scenarios = [
    {
      id: "scen1",
      title: "Normal vs Prioritaire (5 + 3 × 4)",
      expression: ["5", "+", "3", "×", "4"],
      steps: [
        { label: "Expression brute", expr: "5 + 3 × 4", highlight: [2, 3, 4], desc: "La multiplication (3 × 4) est prioritaire sur l'addition (le simple fantassin) ! On la repère d'abord." },
        { label: "Calcul prioritaire", expr: "5 + 12", highlight: [0, 1, 2], desc: "Nous calculons 3 × 4 = 12. L'expression devient 5 + 12." },
        { label: "Résultat final", expr: "17", highlight: [], desc: "Enfin, nous effectuons la somme basique : 5 + 12 = 17." }
      ]
    },
    {
      id: "scen2",
      title: "La Puissance des Parenthèses ((5 + 3) × 4)",
      expression: ["(", "5", "+", "3", ")", "×", "4"],
      steps: [
        { label: "Expression brute", expr: "(5 + 3) × 4", highlight: [0, 1, 2, 3, 4], desc: "Le bouclier suprême (les parenthèses) exige qu'on calcule ce qui est à l'intérieur en premier absolue !" },
        { label: "Parenthèses résolues", expr: "8 × 4", highlight: [0, 1, 2], desc: "Nous calculons 5 + 3 = 8. L'expression se simplifie en 8 × 4." },
        { label: "Résultat final", expr: "32", highlight: [], desc: "Nous terminons avec l'opération restante : 8 × 4 = 32. Regarde comme les parenthèses ont modifié le résultat par rapport au premier exemple !" }
      ]
    },
    {
      id: "scen3",
      title: "Le Combat de Gauche à Droite (20 - 5 + 3)",
      expression: ["20", "-", "5", "+", "3"],
      steps: [
        { label: "Expression brute", expr: "20 - 5 + 3", highlight: [0, 1, 2], desc: "Il n'y a que des additions et soustractions (même famille de fantassins). Pas de priorité innée ! On applique la règle du code de la route : on calcule strictement de gauche à droite." },
        { label: "Premier pas à gauche", expr: "15 + 3", highlight: [0, 1, 2], desc: "On calcule d'abord l'opération de gauche : 20 - 5 = 15. L'expression devient 15 + 3." },
        { label: "Résultat final", expr: "18", highlight: [], desc: "Nous finissons : 15 + 3 = 18. (Faire 5 + 3 en premier aurait donné 20 - 8 = 12 : une erreur monumentale !)" }
      ]
    }
  ];

  const [activeScenario, setActiveScenario] = useState<string>("scen1");
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  const scenarioData = scenarios.find(s => s.id === activeScenario)!;

  const handleNextStep = () => {
    if (currentStepIdx < scenarioData.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleResetScenario = (id: string) => {
    setActiveScenario(id);
    setCurrentStepIdx(0);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-5-PRIO"
        title="Les Priorités Opératoires"
        subtitle="Le Code de la Route du Calcul : Qui attaque en premier ?"
        duration="45 min"
        level="5ème (Cycle 4)"
        prerequisites={["Savoir additionner de tête", "Connaître ses tables de multiplication", "Différencier parenthèses, crochets et opérations de base"]}
        objectives={[
          "Comprendre l'ordre hiérarchique absolu des opérations de combat.",
          "Savoir utiliser le bouclier des parenthèses.",
          "Se prémunir du piège de la lecture directe de gauche à droite sur les boss.",
          "Découvrir le pouvoir de calcul mental malin avec la distributivité simple."
        ]}
      />

      {/* INTRODUCTION PÉDAGOGIQUE */}
      <Section title="👋 Le Code de la Route Universel" icon="🤔" color="blue">
        <p className="leading-relaxed">
          Imaginez un carrefour urbain ultra-fréquenté sans aucun feu rouge : c&apos;est la collision garantie ! En mathématiques, c&apos;est rigoureusement la même chose. Si on calcule les nombres dans n&apos;importe quel ordre au gré de nos envies, deux personnes obtiendront deux résultats différents pour une formule identique.
        </p>
        <p className="mt-4 leading-relaxed">
          Les <strong>priorités opératoires</strong> forment le code de la route international des maths. Grâce à elles, que l&apos;on résolve une formule à Paris, à Kyoto ou sur la planète Mars, <code>2 + 3 × 4</code> donnera toujours précisément <strong>le même résultat unique</strong>. Sans ces règles absolues, aucun algorithme informatique, fusée spatiale, ou transaction bancaire n&apos;existerait !
        </p>
        <InfoBlock type="funfact" title="L'Erreur des Débutants du XXème siècle">
          La toute première calculatrice grand public lancée dans les années 70 ne connaissait pas les règles de priorités ! Elle calculait stupidement de gauche à droite. Si tu tapais <code>2 + 3 × 4</code>, elle calculait 2+3 = 5, puis 5×4 = 20. Aujourd&apos;hui, la moindre calculette moderne sait que c&apos;est <strong>absolument faux</strong> !
        </InfoBlock>
      </Section>

      {/* INTERACTIVE PEDAGOGICAL SCHEMA: THE ROADMAP ARROW */}
      <Section title="👑 La Hiérarchie Royale des Opérations" icon={<ShieldCheck className="text-indigo-500" />} color="slate">
        <p className="mb-6 leading-relaxed">
          Pour mener à bien ton évaluation sans trembler devant l&apos;examinateur, tu dois respecter une <strong>pyramide du pouvoir</strong> stricte :
        </p>

        {/* Dynamic Hierarchy SVG Graphic */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-150 text-center mb-8">
          <svg viewBox="0 0 500 200" className="w-full max-w-md mx-auto">
            {/* Pyramid blocks */}
            <polygon points="250,15 380,180 120,180" fill="none" stroke="#6366f1" strokeWidth="3" />
            
            {/* Level 1: Parentheses */}
            <polygon points="250,15 285,65 215,65" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2" />
            <text x="250" y="45" textAnchor="middle" fill="#f43f5e" className="font-sans text-[10px] font-black uppercase tracking-wider">1. ( ) Parenthèses</text>
            <text x="250" y="58" textAnchor="middle" fill="#f43f5e" className="font-mono text-[9px] font-bold">Le Bouclier Absolu</text>

            {/* Level 2: Mult and Div */}
            <polygon points="215,65 285,65 330,125 170,125" fill="rgba(79, 70, 229, 0.15)" stroke="#4f46e5" strokeWidth="2" />
            <text x="250" y="95" textAnchor="middle" fill="#4f46e5" className="font-sans text-[10px] font-black uppercase tracking-wider">2. × / ÷ Boss</text>
            <text x="250" y="108" textAnchor="middle" fill="#4f46e5" className="font-mono text-[9px] font-bold">Multiplication / Division</text>

            {/* Level 3: Add and Sub */}
            <polygon points="170,125 330,125 372,175 128,175" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
            <text x="250" y="148" textAnchor="middle" fill="#047857" className="font-sans text-[10px] font-black uppercase tracking-wider">3. + / - Fantassins</text>
            <text x="250" y="161" textAnchor="middle" fill="#047857" className="font-mono text-[9px] font-bold">G.-à-D. si égalité</text>
          </svg>
        </div>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-rose-600 flex items-center gap-2">
              <span className="text-xl">🛡️</span> Étape 1 : Les Parenthèses (Le Bouclier Suprême)
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On <strong>COMMENCE TOUJOURS</strong> par les calculs à l&apos;intérieur des parenthèses. Elles sont immunisées contre toute attaque externe. S&apos;il y a des crochets ou des parenthèses imbriquées, on commence par les plus intérieures possibles.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-600 flex items-center gap-2">
              <span className="text-xl">⚔️</span> Étape 2 : Multiplications et Divisions (Les Boss d&apos;Élite)
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Ce sont les officiers. En l&apos;absence de parenthèses, elles coupent la route des additions et soustractions et exigent d&apos;être résolues <strong>EN PREMIER</strong>.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-emerald-600 flex items-center gap-2">
              <span className="text-xl">🚶</span> Étape 3 : Additions et Soustractions (Les Militants civils)
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Sauf indication d&apos;un boss omniprésent, on les calcule en dernier, en lisant <strong>strictement de GAUCHE à DROITE</strong>, dans le sens normal d&apos;écriture.
            </p>
          </div>
        </StepList>

        <TipBanner type="warning" title="Le Piège Fantassin Absolu !">
          Si tu te retrouves uniquement face à des opérations de même force (comme que des additions/soustractions, ou que des divisions/multiplications), <strong>on n&apos;additionne pas au hasard !</strong> Tu dois bêtement appliquer l&apos;ordre normal de gauche à droite.<br />
          <code>10 - 4 + 2</code> devient d&apos;abord <code>10 - 4 = 6</code>, puis <code>6 + 2 = 8</code>.
        </TipBanner>
      </Section>

      {/* DYNAMIC SANDBOX APPLICATION: RESOLUTION EVALUATOR */}
      <Section title="🛠️ Le Laboratoire : L'Évaluateur Visuel Pas-à-Pas" icon={<Calculator className="text-indigo-500" />} color="indigo">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Choisis un scénario de calcul piégé parmi les onglets ci-dessous. Déroule ensuite les étapes de résolution pas-à-pas pour observer quel morceau est ciblé en priorité et pourquoi.
        </p>

        {/* Tab configuration inside layout */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {scenarios.map(scen => (
            <button
              key={scen.id}
              onClick={() => handleResetScenario(scen.id)}
              className={`flex-1 px-4 py-3 text-xs font-bold rounded-2xl border transition-all text-center
                ${activeScenario === scen.id 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}
              `}
            >
              {scen.title}
            </button>
          ))}
        </div>

        {/* Dynamic Display Board of current calculation */}
        <div className="bg-card border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 lg:p-8 shadow-xl shadow-indigo-100/5">
          <div className="flex flex-col items-center">
            
            {/* Visual Formula view */}
            <div className="bg-slate-50 dark:bg-black/30 w-full min-h-[100px] flex items-center justify-center rounded-2xl border p-4 mb-6 relative">
              <span className="absolute top-2 left-4 text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                Visualisateur intelligent de priorité (Étape {currentStepIdx + 1}/{scenarioData.steps.length})
              </span>
              
              <div className="font-mono text-3xl font-black tracking-widest flex items-center gap-2">
                {scenarioData.steps[currentStepIdx].expr}
              </div>
            </div>

            {/* Step Explanation text content */}
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-l-indigo-500 w-full p-5 rounded-r-2xl mb-8 leading-relaxed">
              <strong className="text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block mb-1">
                {scenarioData.steps[currentStepIdx].label} :
              </strong>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {scenarioData.steps[currentStepIdx].desc}
              </p>
            </div>

            {/* Stepper buttons controller */}
            <div className="flex gap-4 w-full">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                className="flex-1 py-3 text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1"
              >
                Précédent
              </button>
              
              <button
                onClick={() => handleResetScenario(activeScenario)}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs"
                title="Recommencer"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIdx === scenarioData.steps.length - 1}
                className="flex-1 py-3 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-500 disabled:text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1"
              >
                {currentStepIdx === scenarioData.steps.length - 1 ? (
                  "Calcul Terminé !"
                ) : (
                  <>Étape suivante <ChevronRight size={14} /></>
                )}
              </button>
            </div>

          </div>
        </div>
      </Section>

      {/* PART THEORY ENRICHED: DISTRIBUTIVITY & CALCULATIONS */}
      <Section title="✨ La Magie de la Distributivité" icon="🪄" color="purple">
        <p className="leading-relaxed">
          La multiplication possède un super-pouvoir extraordinaire ! Elle peut <strong>se distribuer</strong> (se propager) sur toutes les additions et soustractions qui sont enfermées dans des parenthèses. C&apos;est l&apos;outil le plus rapide au monde pour calculer mentalement comme un ninja informatique.
        </p>

        <FormulaBox title="Loi de Distributivité Simple" formula="k \\times (a + b) = k \\times a + k \\times b" />

        <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/60 p-6 rounded-2xl my-6 leading-relaxed">
          <span className="font-bold text-purple-900 dark:text-purple-300 text-sm uppercase block mb-1">💡 Démonstration Pratique (Calcul Malin) :</span>
          <p className="text-slate-700 dark:text-slate-300">
            Imagine que tu doives calculer mentalement le produit {"$12 \\times 105$"}. C&apos;est délicat de tête !
          </p>
          <ul className="list-decimal list-inside mt-3 space-y-2 text-slate-800 dark:text-slate-200 font-mono text-xs">
            <li>Tu brises l&apos;armure du nombre 105 en faisant : <code>105 = 100 + 5</code>.</li>
            <li>La formule s&apos;écrit alors : {"$12 \\times (100 + 5)$"}.</li>
            <li>Tu distribues la force du 12 sur chacun des soldats : <br />
              {"$12 \\times (100 + 5) = (12 \\times 100) + (12 \\times 5)$"}
            </li>
            <li>Tu effectues les deux micro-calculs immédiats de tête : <br />
              {"$1200 + 60 = \\mathbf{1260}$ !"} C&apos;est magique et d&apos;une rapidité redoutable.
            </li>
          </ul>
        </div>
      </Section>

      {/* FLASHCARDS SECTION */}
      <Section title="🧠 Flashcards : Le Réflexe de Survie" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans le calcul <code>5 + 2 × 3</code>, que calcule-t-on en tout premier ?</>}
            back={<><strong>2 × 3 = 6</strong>. La multiplication est le boss prioritaire, elle prend l&apos;avantage absolu sur l&apos;addition !</>}
          />
          <Flashcard 
            front={<>Dans un calcul composé uniquement d&apos;additions et soustractions, comment procède-t-on ?</>}
            back={<>Les opérations étant de force identique, on calcule bêtement de <strong>gauche à droite</strong> !<br />Ex: 10 - 4 + 2 = 6 + 2 = 8.</>}
          />
        </div>
      </Section>

      {/* RESOLVED EXERCISES (CHECKLIST CRITERIA) */}
      <Section title="✍️ Exercices d&apos;Application Résolus" icon="📖" color="slate">
        <InteractiveExercise 
          title="Exercice Résolu 1 : Calcul complexe en chaîne"
          question={<>Calcule de manière extrêmement détaillée les étapes de l&apos;expression :<br />{"$A = 50 - [ 10 + 2 \\times (8 - 3) ]$"}</>}
          steps={[
            <><strong>Étape 1 : Le Coeur Profond (Les parenthèses) :</strong> On repère les parenthèses les plus enfouies : <code>(8 - 3)</code>. On effectue le calcul : <code>8 - 3 = 5</code>.<br />L&apos;expression devient : <code>50 - [ 10 + 2 × 5 ]</code>.</>,
            <><strong>Étape 2 : Le Boss dans les crochets :</strong> Dans le crochet <code>[ 10 + 2 × 5 ]</code>, nous avons une puissance addition et une multiplication. La multiplication <code>2 × 5</code> prend la priorité absolue. Elle donne 10.<br />L&apos;expression s&apos;écrit : <code>50 - [ 10 + 10 ]</code>.</>,
            <><strong>Étape 3 : Terminer les crochets :</strong> On effectue la somme à l&apos;intérieur des parenthèses carrées : <code>10 + 10 = 20</code>.<br />L&apos;expression se résout en : <code>50 - 20</code>.</>,
            <><strong>Étape 4 : Le Coup de grâce :</strong> On termine la dernière opération : <code>50 - 20 = 30</code>.<br />Le résultat final est {"$A = \\mathbf{30}$"} !</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice Résolu 2 : Factorisation / Distributivité inverse"
          question={<>Utilise la distributivité à l&apos;envers (l&apos;art de factoriser) pour calculer plus vite :<br />{"$B = 17 \\times 8 + 17 \\times 2$"}</>}
          steps={[
            <><strong>Étape 1 : Identifier le soldat commun :</strong> On remarque que la valeur <strong>17</strong> est répétée deux fois dans les multiplications. C&apos;est le facteur commun.</>,
            <><strong>Étape 2 : Mettre en facteur (Le bouclier commun) :</strong> On rassemble les soldats restants dans une parenthèse multipliée par ce facteur commun : <br />{"$B = 17 \\times (8 + 2)$"}.</>,
            <><strong>Étape 3 : Calcul prioritaire :</strong> On effectue d&apos;abord la parenthèse simplifiée : <code>8 + 2 = 10</code>. L&apos;expression devient extrêmement limpide : <br />{"$B = 17 \\times 10$"}.</>,
            <><strong>Étape 4 : Le résultat fulgurant :</strong> {"$17 \\times 10 = \\mathbf{170}$"}. D&apos;un seul coup d&apos;œil sans calculette !</>
          ]}
        />
      </Section>

      {/* FILL IN THE BLANKS SECTION */}
      <Section title="🎮 Simulateur de Sécurité Mathématique" icon="🕹️" color="emerald">
        <p className="mb-4">Démontre que tu possèdes les bons réflexes de navigation en complétant cette phrase :</p>
        <FillInTheBlanks 
          id="prio-eval"
          content={[
            "Dans l'expression 25 - 5 × 3 + 4, l'opération prioritaire absolue est la ",
            { options: ["soustraction", "multiplication", "addition"], correctAnswer: 1 },
            ". Une fois celle-ci effectuée, l'expression devient 25 - 15 + 4. On lit alors de ",
            { options: ["droite à gauche", "gauche à droite"], correctAnswer: 1 },
            ". Nous calculons donc d'abord ",
            { options: ["25 - 15", "15 + 4"], correctAnswer: 0 },
            " ce qui donne 10. Et on ajoute 4 pour obtenir un résultat final de ",
            { options: ["14", "6", "19"], correctAnswer: 0 },
            " !"
          ]}
        />
      </Section>

      {/* FAQ SECTION: MANDATORY AT LEAST 3 ENTRIES */}
      <Section title="❓ Questions Fréquentes (FAQ)" icon="🙋" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre les parenthèses rondes () et les crochets [] ?",
              answer: "Aucune différence mathématique ! C'est uniquement une coquetterie esthétique pour éviter de se mélanger les yeux quand il y a beaucoup de parenthèses les unes dans les autres. On utilise les crochets à l'extérieur, et les parenthèses rondes à l'intérieur."
            },
            {
              question: "Que se passe-t-il faces au trait de fraction ? Est-il prioritaire ?",
              answer: "Le trait de fraction agit comme des parenthèses invisibles géantes. Quand tu as un calcul du style (5 + 3) / 2, le numérateur entier et le dénominateur entier doivent être calculés d'abord séparément comme s'ils possédaient de solides boucliers !"
            },
            {
              question: "Si mon expression ne comporte aucun signe de priorité, d'où vient ce code de la route ?",
              answer: "Ce code de la route a été inventé au XVIème siècle lors du déploiement de l'imprimerie. Pour économiser l'encre des lettres de plomb et éviter d'imprimer des milliers de parenthèses, les scientifiques ont convenu d'un ordre de force logique par défaut pour toutes leurs transcriptions universelles !"
            }
          ]}
        />
      </Section>

      {/* QUIZ (MANDATORY AT LEAST 3 DETAILED MULTIPLE CHOICE) */}
      <Section title="🏆 Combat de Validation Final" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu effectues le calcul 12 - 4 + 4, quelle est la mauvaise idée ?",
              options: [
                "De le résoudre bêtement de gauche à droite (= 12).",
                "De calculer 4 + 4 = 8 d'abord, car le signe + ressemblerait à une priorité.",
                "D'utiliser une feuille de brouillon."
              ],
              correctAnswer: 1,
              explanation: "Faute redoutable ! L'addition n'est pas plus forte que la soustraction. Sans boss prioritaire, on balaie de gauche à droite : 12 - 4 = 8, puis 8 + 4 = 12."
            },
            {
              question: "Quel est le sort ultime de l'expression 5 × (2 + 4) ?",
              options: [
                "14 (On commence par 5 × 2)",
                "30 (On applique le bouclier des parenthèses: 2 + 4 = 6, puis 5 × 6)",
                "22"
              ],
              correctAnswer: 1,
              explanation: "Excellent ! Les parenthèses sont souveraines. On calcule d'abord 2 + 4 = 6, puis 5 × 6 = 30 !"
            },
            {
              question: "Que donne le calcul tordu 10 ÷ 2 × 5 ?",
              options: [
                "25 (D'abord division: 10/2 = 5, puis multiplication: 5 × 5)",
                "1 (D'abord multiplication: 2 × 5 = 10, puis division: 10/10)",
                "Aucun de ces résultats"
              ],
              correctAnswer: 0,
              explanation: "Gagné ! Multiplication et division sont de même force. On procède donc obligatoirement de gauche à droite : 10/2 = 5, puis 5 × 5 = 25 !"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais repérer et exécuter en priorité les calculs ceints de parenthèses.",
            "En cas d'absence de parenthèses, je décoche les multiplications et divisions en premier.",
            "Face à des additions/soustractions seules, je balaie strictement de gauche à droite.",
            "Je domine la distributivité simple pour résoudre astucieusement des calculs mentaux."
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

export default Course_5eme_01_Priorites_Operatoires;
