import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock
} from '../components/SharedUI';
import { BookOpen, Brain, HelpCircle, Trophy, Sparkles, Scale, Percent, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface PotenceSubstep {
  val: string;
  underline?: boolean;
}

interface StepData {
  title: string;
  description: string;
  calculation?: string;
  potence: {
    dividende: string;
    diviseur: string;
    quotient: string;
    substeps: PotenceSubstep[];
  };
}

const stepsDiv1: StepData[] = [
  {
    title: "Étape 0 : Préparation",
    description: "On veut diviser 845 par 6. On pose la potence. On commence par regarder le premier chiffre à gauche du dividende (le 8 des centaines). Est-ce que 8 est plus grand ou égal à 6 ? Oui ! Donc, on met un petit chapeau sur le 8 pour indiquer qu'on le divise lui en premier.",
    calculation: "On regarde le 8 (centaines)",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "",
      substeps: []
    }
  },
  {
    title: "Étape 1 : Diviser le premier chiffre",
    description: "Dans 8, combien de fois 6 ? On cherche dans la table de 6 : 1 × 6 = 6. C'est parfait car 2 × 6 = 12 est trop grand. Le résultat est 1. On écrit donc 1 au quotient. On calcule la soustraction : 8 - 6 = 2. Le reste temporaire est 2.",
    calculation: "8 - 6 = 2",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "1",
      substeps: [
        { val: "- 6", underline: true },
        { val: "  2" }
      ]
    }
  },
  {
    title: "Étape 2 : Abaisser le chiffre suivant",
    description: "Maintenant, on descend le chiffre suivant du dividende : le 4 (les dizaines). On l'écrit juste à côté de notre reste 2. Cela forme le nombre 24 !",
    calculation: "On abaisse le 4",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "1",
      substeps: [
        { val: "- 6", underline: true },
        { val: "  2 4" }
      ]
    }
  },
  {
    title: "Étape 3 : Diviser le nombre formé (24)",
    description: "Dans 24, combien de fois 6 ? On récite notre table de 6 : 6 × 4 = 24. C'est exact ! Donc, le résultat est 4. On écrit 4 au quotient à côté du 1 (ce qui fait 14). On calcule ensuite 4 × 6 = 24 et on soustrait : 24 - 24 = 0.",
    calculation: "24 - 24 = 0",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "1 4",
      substeps: [
        { val: "- 6", underline: true },
        { val: "  2 4" },
        { val: "- 24", underline: true },
        { val: "    0" }
      ]
    }
  },
  {
    title: "Étape 4 : Abaisser le dernier chiffre (5)",
    description: "On descend le dernier chiffre de notre dividende : le 5 (les unités). On l'écrit à côté du reste 0. Cela forme le nombre 5 !",
    calculation: "On abaisse le 5",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "1 4",
      substeps: [
        { val: "- 6", underline: true },
        { val: "  2 4" },
        { val: "- 24", underline: true },
        { val: "    0 5" }
      ]
    }
  },
  {
    title: "Étape 5 : Diviser 5 par 6",
    description: "Dans 5, combien de fois 6 ? Attention, 6 est plus grand que 5 ! Nous n'avons pas assez pour donner ne serait-ce que 1 à chacun. On écrit donc impérativement 0 au quotient (qui devient 140). On calcule 0 × 6 = 0, et on soustrait: 5 - 0 = 5. Le reste final est 5.",
    calculation: "5 - 0 = 5",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "1 4 0",
      substeps: [
        { val: "- 6", underline: true },
        { val: "  2 4" },
        { val: "- 24", underline: true },
        { val: "    0 5" },
        { val: "  - 0", underline: true },
        { val: "    5" }
      ]
    }
  },
  {
    title: "Étape 6 : Fin et Vérification !",
    description: "Il n'y a plus aucun chiffre à descendre ! Notre quotient final est 140 et notre reste final est 5. Est-ce que le reste 5 est plus petit que 6 (le diviseur) ? Oui, c'est juste ! Prouvons-le par le calcul : (140 × 6) + 5 = 840 + 5 = 845. Félicitations !",
    calculation: "Preuve : (140 × 6) + 5 = 845",
    potence: {
      dividende: "845",
      diviseur: "6",
      quotient: "1 4 0",
      substeps: [
        { val: "- 6", underline: true },
        { val: "  2 4" },
        { val: "- 24", underline: true },
        { val: "    0 5" },
        { val: "  - 0", underline: true },
        { val: "    5" }
      ]
    }
  }
];

const stepsDiv2: StepData[] = [
  {
    title: "Étape 0 : Préparation",
    description: "On veut diviser 375 par 12. C'est une division à 2 chiffres ! On regarde d'abord le premier chiffre à gauche : 3. C'est trop petit pour y trouver 12. Alors, on prend les deux premiers chiffres : 37 !",
    calculation: "On regarde le 37",
    potence: {
      dividende: "375",
      diviseur: "12",
      quotient: "",
      substeps: []
    }
  },
  {
    title: "Étape 1 : Diviser le premier bloc",
    description: "Dans 37, combien de fois 12 ? On cherche dans la table de 12 : 12 × 1 = 12, 12 × 2 = 24, 12 × 3 = 36 (très proche !), 12 × 4 = 48 (trop grand). Donc ça y va 3 fois. On écrit 3 au quotient. On fait 3 × 12 = 36 et on soustrait : 37 - 36 = 1.",
    calculation: "37 - 36 = 1",
    potence: {
      dividende: "375",
      diviseur: "12",
      quotient: "3",
      substeps: [
        { val: "- 3 6", underline: true },
        { val: "    1" }
      ]
    }
  },
  {
    title: "Étape 2 : Abaisser le chiffre suivant",
    description: "On descend le chiffre suivant du dividende : le 5 (les unités). On l'écrit juste à côté de notre reste temporaire 1. Cela forme le nombre 15 !",
    calculation: "On abaisse le 5",
    potence: {
      dividende: "375",
      diviseur: "12",
      quotient: "3",
      substeps: [
        { val: "- 3 6", underline: true },
        { val: "    1 5" }
      ]
    }
  },
  {
    title: "Étape 3 : Diviser le nombre formé",
    description: "Dans 15, combien de fois 12 ? Ça y va 1 fois (1 × 12 = 12, 2 × 12 = 24 est trop grand). On écrit 1 au quotient à côté du 3 (qui devient 31). On soustrait : 15 - 12 = 3.",
    calculation: "15 - 12 = 3",
    potence: {
      dividende: "375",
      diviseur: "12",
      quotient: "3 1",
      substeps: [
        { val: "- 3 6", underline: true },
        { val: "    1 5" },
        { val: "  - 1 2", underline: true },
        { val: "      3" }
      ]
    }
  },
  {
    title: "Étape 4 : Fin et Vérification !",
    description: "Il n'y a plus aucun chiffre à descendre ! Notre quotient final est 31, et notre reste final est 3. Notre reste 3 est bien strictement inférieur à notre diviseur 12 ! Faisons la preuve finale : (31 × 12) + 3 = 372 + 3 = 375. C'est parfait !",
    calculation: "Preuve : (31 × 12) + 3 = 375",
    potence: {
      dividende: "375",
      diviseur: "12",
      quotient: "3 1",
      substeps: [
        { val: "- 3 6", underline: true },
        { val: "    1 5" },
        { val: "  - 1 2", underline: true },
        { val: "      3" }
      ]
    }
  }
];

const Course_Primaire_CM1_03_Division_Posee: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [activePart, setActivePart] = useState<'dividende' | 'diviseur' | 'quotient' | 'reste'>('dividende');
  const [simMode, setSimMode] = useState<'oneDigit' | 'twoDigits'>('oneDigit');
  const [simStep, setSimStep] = useState(0);

  const activeSteps = simMode === 'oneDigit' ? stepsDiv1 : stepsDiv2;
  const maxStep = activeSteps.length - 1;

  const handleNextStep = () => {
    if (simStep < maxStep) setSimStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (simStep > 0) setSimStep(prev => prev - 1);
  };

  const handleResetSim = () => {
    setSimStep(0);
  };

  const handleModeChange = (mode: 'oneDigit' | 'twoDigits') => {
    setSimMode(mode);
    setSimStep(0);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM1-03"
        title="La Division Posée"
        subtitle="Maitrise la technique la plus redoutable du Primaire !"
        duration="45 min"
        level="CM1 (Cycle 3)"
        prerequisites={["Sens de la division (partage)", "Tables de multiplication"]}
        objectives={[
          "Maîtriser le vocabulaire : diviseur, dividende, quotient, reste.",
          "Poser et calculer une division euclidienne à 1 chiffre.",
          "Poser et calculer une division euclidienne à 2 chiffres."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La division posée est souvent considérée comme l'opération la plus impressionnante de l'école primaire car elle combine à la fois la division (la recherche du quotient), la multiplication et la soustraction. L'essentiel au CM1 est de bien assimiler le vocabulaire (dividende, diviseur, quotient, reste) et d'automatiser l'algorithme par étapes ("Je pose, j'abaisse, je divise, je soustrais"). Une table de Pythagore à disposition peut grandement aider à lever la charge mentale du calcul pur !
      </InfoBlock>

      <Section title="1. Introduction : Le partage équitable" icon={<Scale className="w-6 h-6" />} color="slate">
        <p>
          Lorsque tu dois distribuer 850 cartes de jeu entre 6 amis de manière totalement équitable, l'opération qui s'impose est la <strong>division posée</strong>. C'est l'opération la plus rigoureuse de l'école primaire car elle combine toutes les autres : tu auras besoin de la multiplication, de la soustraction et bien sûr de ton sens du partage !
        </p>
        <p className="mt-4">
          Poser une division s'appelle effectuer une "division euclidienne" (du nom d'un célèbre mathématicien antique). Le but est de trouver le résultat (le <strong>quotient</strong>) et l'éventuel surplus que l'on ne peut plus partager (le <strong>reste</strong>).
        </p>
      </Section>

      <TipBanner title="Mission : L'encadrement préliminaire" type="info">
        <p>Avant d'affronter la potence, il faut toujours <strong>estimer la taille du résultat</strong> (combien de chiffres aura le quotient). Prenons {"$845 \\div 6$"}:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Est-ce que le résultat est plus grand que 1 ? Oui (1 × 6 = 6).</li>
          <li>Est-ce que le résultat est plus grand que 10 ? Oui (10 × 6 = 60).</li>
          <li>Est-ce que le résultat est plus grand que 100 ? Oui (100 × 6 = 600).</li>
          <li>Est-ce que c'est plus grand que 1 000 ? Non (1000 × 6 = 6000, c'est trop grand).</li>
        </ul>
        <p className="mt-2 text-indigo-900 dark:text-indigo-200 font-medium">Le Quotient se trouve donc entre 100 et 1 000. Il aura obligatoirement <strong>3 chiffres</strong>. Savoir cela évitera de grosses erreurs de calcul par la suite.</p>
      </TipBanner>

      <Section title="2. Explications et Théorie" icon={<BookOpen className="w-6 h-6" />} color="indigo">
        <h3 className="text-xl font-bold mt-4 mb-2">2.1 Le vocabulaire de la potence</h3>
        <p className="mb-6">Le dispositif pour calculer s'appelle une "potence". Clique sur les différentes zones du schéma interactif pour découvrir leur rôle secret !</p>

        {/* Interactive Potence SVG widget */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 border border-indigo-100 dark:from-slate-900/40 dark:to-slate-950 dark:border-indigo-900/40 p-6 rounded-[2rem] my-8 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* SVG Potence Drawing */}
            <div className="flex justify-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative">
              <svg viewBox="0 0 240 240" className="w-56 h-auto" id="potence-svg">
                {/* Potence Lines (The "T" shape) */}
                <line x1="120" y1="20" x2="120" y2="220" stroke="#475569" strokeWidth="4" />
                <line x1="120" y1="70" x2="220" y2="70" stroke="#475569" strokeWidth="4" />

                {/* ZONE DIVIDENDE */}
                <g 
                  className="cursor-pointer" 
                  onClick={() => setActivePart('dividende')}
                >
                  <rect x="10" y="10" width="100" height="50" fill={activePart === 'dividende' ? "#fce7f3" : "transparent"} className={activePart === 'dividende' ? "dark:fill-rose-950/40" : ""} rx="5" />
                  <text x="60" y="42" fill={activePart === 'dividende' ? "#ec4899" : "#64748b"} fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">7 5</text>
                  <text x="60" y="55" fill="#ec4899" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Dividende</text>
                </g>

                {/* ZONE DIVISEUR */}
                <g 
                  className="cursor-pointer" 
                  onClick={() => setActivePart('diviseur')}
                >
                  <rect x="130" y="10" width="80" height="50" fill={activePart === 'diviseur' ? "#fef9c3" : "transparent"} className={activePart === 'diviseur' ? "dark:fill-amber-950/40" : ""} rx="5" />
                  <text x="170" y="42" fill={activePart === 'diviseur' ? "#eab308" : "#64748b"} fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">6</text>
                  <text x="170" y="55" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Diviseur</text>
                </g>

                {/* ZONE QUOTIENT */}
                <g 
                  className="cursor-pointer" 
                  onClick={() => setActivePart('quotient')}
                >
                  <rect x="130" y="80" width="80" height="50" fill={activePart === 'quotient' ? "#f3e8ff" : "transparent"} className={activePart === 'quotient' ? "dark:fill-purple-950/40" : ""} rx="5" />
                  <text x="170" y="112" fill={activePart === 'quotient' ? "#a855f7" : "#64748b"} fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">1 2</text>
                  <text x="170" y="125" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Quotient</text>
                </g>

                {/* ZONE RESTE */}
                <g 
                  className="cursor-pointer" 
                  onClick={() => setActivePart('reste')}
                >
                  <rect x="10" y="170" width="100" height="45" fill={activePart === 'reste' ? "#d1fae5" : "transparent"} className={activePart === 'reste' ? "dark:fill-emerald-950/40" : ""} rx="5" />
                  {/* Interim calculations text simulation */}
                  <line x1="20" y1="100" x2="80" y2="100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2" />
                  <text x="60" y="195" fill={activePart === 'reste' ? "#10b981" : "#64748b"} fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">3</text>
                  <text x="60" y="208" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Reste</text>
                </g>
              </svg>
            </div>

            {/* Explanatory notes detailing active selected part */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center min-h-[220px]">
              {activePart === 'dividende' && (
                <div className="animate-fade-in block">
                  <div className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-lg w-max mb-3 dark:bg-rose-950/40 dark:text-rose-300">DIVIDENDE (Le Trésor)</div>
                  <p className="text-sm text-slate-650 dark:text-slate-300">
                    C'est <strong>la quantité totale</strong> que l'on veut découper ou distribuer de manière équitable. <br/><br/>
                    Dans notre exemple {"$75 \\div 6$"}, le trésor de départ est de <strong>75 pièces d'or</strong>.
                  </p>
                </div>
              )}
              {activePart === 'diviseur' && (
                <div className="animate-fade-in block">
                  <div className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg w-max mb-3 dark:bg-amber-950/40 dark:text-amber-400">DIVISEUR (Les Parts)</div>
                  <p className="text-sm text-slate-650 dark:text-slate-300">
                    C'est <strong>le nombre de parts</strong> que l'on veut faire, ou le nombre de personnes qui récoltent le trésor.<br/><br/>
                    Dans notre exemple, nous divisons nos pièces entre <strong>6 aventuriers</strong>.
                  </p>
                </div>
              )}
              {activePart === 'quotient' && (
                <div className="animate-fade-in block">
                  <div className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg w-max mb-3 dark:bg-purple-950/40 dark:text-purple-300">QUOTIENT (La Part Reçue)</div>
                  <p className="text-sm text-slate-650 dark:text-slate-300">
                    C'est <strong>le résultat final</strong> de notre partage équitable ! Chaque diviseur aura exactement cette valeur.<br/><br/>
                    Ici, chacun des 6 aventuriers recevra exactement <strong>12 pièces d'or</strong>.
                  </p>
                </div>
              )}
              {activePart === 'reste' && (
                <div className="animate-fade-in block">
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg w-max mb-3 dark:bg-emerald-950/40 dark:text-emerald-305">RESTE (Le Rab)</div>
                  <p className="text-sm text-slate-650 dark:text-slate-300">
                    C'est <strong>ce qu'il reste dans la bourse</strong> à la fin du grand partage équitable, car on n'en a pas assez pour en donner une autre entière à tout le monde.<br/><br/>
                    Le reste de cette division vaut <strong>3</strong>. Personne ne peut les prendre !
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <TipBanner title="Règle d'or absolue !" type="warning">
          Le reste doit <strong>toujours</strong> être strictement plus petit que le Diviseur ! Sinon, le partage n'est pas terminé !
        </TipBanner>

        <h3 className="text-xl font-bold mt-8 mb-2">2.2 L'algorithme en 4 étapes (La boucle)</h3>
        <p>Pour résoudre une division à la main, tu dois effectuer une boucle fermée jusqu'à épuisement des chiffres de gauche à droite :</p>
        <ol className="list-decimal space-y-2 mt-4 ml-6 font-medium">
          <li><strong>Chercher</strong> : Dans {"\"...\""}, combien de fois {"\"...\""} ? Je cherche dans mes tables.</li>
          <li><strong>Écrire au quotient</strong> : Je place le nombre trouvé au Quotient.</li>
          <li><strong>Multiplier et soustraire</strong> : Je calcule la soustraction pour trouver le reste temporaire.</li>
          <li><strong>Descendre</strong> : Je descends le chiffre suivant du Dividende à côté de mon petit reste et la boucle recommence à l'étape 1.</li>
        </ol>

        <h3 className="text-xl font-bold mt-10 mb-2">2.3 Simulateur Interactif : Suis le Guide !</h3>
        <p className="mb-6">
          Rien ne vaut la pratique visuelle pour comprendre. Utilise ce simulateur pour voir comment la potence se remplit et comment se calculent les soustractions tape par étape. Tu as le choix entre une division classique à 1 chiffre et une division avancée à 2 chiffres !
        </p>

        {/* Simulator Widget Frame */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-[2rem] p-6 md:p-8 my-8 shadow-sm">
          {/* Mode Selector Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button 
              onClick={() => handleModeChange('oneDigit')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${simMode === 'oneDigit' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
            >
              Division à 1 chiffre (845 ÷ 6)
            </button>
            <button 
              onClick={() => handleModeChange('twoDigits')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${simMode === 'twoDigits' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
            >
              Division à 2 chiffres (375 ÷ 12)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Descriptive explanation */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {activeSteps[simStep].title}
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base mt-2">
                  {activeSteps[simStep].description}
                </p>
                {activeSteps[simStep].calculation && (
                  <div className="mt-4 p-3 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl font-mono text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-300">
                    Calcul en cours : {activeSteps[simStep].calculation}
                  </div>
                )}
              </div>

              {/* Step Navigation controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-900">
                <button 
                  onClick={handlePrevStep}
                  disabled={simStep === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs sm:text-sm shadow-sm border border-slate-200 dark:border-slate-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Précédent
                </button>
                <span className="text-2xs sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Étape {simStep} sur {maxStep}
                </span>
                {simStep === maxStep ? (
                  <button 
                    onClick={handleResetSim}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                ) : (
                  <button 
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Dynamic drawing or table simulating the blackboard */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col justify-center items-center shadow-sm min-h-[240px]">
              <div className="grid grid-cols-2 gap-0 relative font-mono text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 w-full max-w-[200px]">
                {/* Left part: Dividende and substeps */}
                <div className="flex flex-col items-end pr-4 border-r-2 border-slate-400 dark:border-slate-705 min-h-[160px] pt-1">
                  <div className="relative">
                    {/* Chapeau vertical indicator on active division block */}
                    {simStep > 0 && simStep < 4 && simMode === 'oneDigit' && (
                      <span className="absolute -top-3 left-0 text-indigo-500 font-bold text-sm tracking-tighter leading-none select-none">⌒</span>
                    )}
                    {simStep === 0 && simMode === 'oneDigit' && (
                      <span className="absolute -top-2 left-0 text-slate-400 font-bold text-xs select-none">...</span>
                    )}
                    {simStep > 0 && simStep < 2 && simMode === 'twoDigits' && (
                      <span className="absolute -top-3 left-0 text-indigo-500 font-bold text-sm tracking-tighter leading-none select-none">⌒⌒</span>
                    )}
                    {simStep === 0 && simMode === 'twoDigits' && (
                      <span className="absolute -top-2 left-0 text-slate-400 font-bold text-xs select-none">...</span>
                    )}
                    {activeSteps[simStep].potence.dividende}
                  </div>
                  
                  {/* Dynamic subdivisions representing written parts */}
                  <div className="mt-3 flex flex-col items-end space-y-1 w-full text-right tracking-wider">
                    {activeSteps[simStep].potence.substeps.map((sub, ridx) => (
                      <div 
                        key={ridx} 
                        className={`w-full ${sub.underline ? 'border-b-2 border-slate-400 dark:border-slate-700' : ''} pr-0.5`}
                      >
                        {sub.val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right part: Diviseur (top) and Quotient (bottom) */}
                <div className="flex flex-col items-start pl-4 pt-1">
                  {/* Diviseur */}
                  <div className="border-b-2 border-slate-400 dark:border-slate-705 pb-2 w-full text-left">
                    {activeSteps[simStep].potence.diviseur}
                  </div>
                  
                  {/* Quotient */}
                  <div className="pt-2.5 text-indigo-600 dark:text-indigo-400 w-full text-left min-h-[40px]">
                    {activeSteps[simStep].potence.quotient || (
                      <span className="text-slate-300 dark:text-slate-800 animate-pulse">?</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-12 mb-2">2.4 L'antidote ultime : La preuve</h3>
        <p>Tu as terminé ? Comment savoir si c'est juste ? L'équation de vérification est :</p>
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 my-4 text-center text-lg font-bold text-emerald-900 dark:text-emerald-100 font-mono">
          {"(Quotient $\\times$ Diviseur) + Reste = Dividende"}
        </div>
      </Section>

      <InteractiveExercise 
        title="La preuve d'Antoine" 
        question={<>Antoine a effectué la division de <strong>150 par 7</strong>. Il a trouvé un Quotient de <code>20</code> et un Reste de <code>5</code>. Sans refaire toute la division, aide son grand frère à vérifier s'il a raison à l'aide de la preuve euclidienne.</>}
        steps={[
          <>On pose la formule de la preuve : <strong>{"(Quotient $\\times$ Diviseur) + Reste = Dividende"}</strong>.</>,
          <>On remplace par les valeurs d'Antoine : <strong>(20 × 7) + 5</strong></>,
          <>La multiplication d'abord : <strong>20 × 7 = 140</strong>.</>,
          <>On ajoute le reste : <strong>140 + 5 = 145</strong>.</>,
          <>Antoine s'est trompé ! Le résultat de sa preuve est 145. Son dividende de départ était 150. (Le vrai calcul donne 21 avec un reste de 3).</>
        ]}
      />

      <Section title="3. Quiz & Flashcards" icon={<Brain className="w-6 h-6" />} color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Comment s'appelle officiellement la figure en forme de T que l'on dessine pour poser et résoudre une division ?</>}
            back={<>On l'appelle la <strong>"Potence"</strong> de la division euclidienne.</>}
          />
          <Flashcard 
            front={<>La division est terminée. Je trouve un reste égal à 9, alors que mon diviseur était 7. Quelle est la conclusion ?</>}
            back={<>C'est mathématiquement impossible. Le Reste d'une division doit <strong>absolument toujours</strong> être strictement inférieur au Diviseur. Il y a une erreur !</>}
          />
        </div>
      </Section>
      
      <Section title="Foire Aux Questions" icon={<HelpCircle className="w-6 h-6" />} color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Dois-je obligatoirement écrire avec des traits et des zéros le brouillon des petites soustractions intermédiaires ?",
              answer: "Au CM1, oui. C'est ce qu'on appelle la division posée avec les soustractions intermédiaires apparentes. Cela évite beaucoup de fautes de calcul mental fatales. Plus tard, au collège, ta vitesse mentale s'avérera meilleure."
            },
            {
              question: "Si un nombre descendu forme seulement un '0', par exemple, j'ai 12 et je descends le 0, ça fait 120. Et si ça forme '00' ?",
              answer: "Si tu descends un 0 et que ton reste temporaire devient '00', la question de la boucle reste exactement la même ! 'Dans 00, combien de fois il y a le grand diviseur ?' La réponse sera bien évidemment 'Zéro fois'. Tu inscris donc formellement ce beau 0 du côté de ton Quotient."
            }
          ]}
        />
      </Section>

      <Section title="4. Épreuve Finale" icon={<Trophy className="w-6 h-6" />} color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la règle d'or concernant le Reste dans une division euclidienne ?",
              options: [
                "Le reste doit toujours être pair.",
                "Le reste doit être plus grand que le diviseur.",
                "Le reste doit toujours être strictement plus petit que le Diviseur.",
                "Le reste n'existe pas."
              ],
              correctAnswer: 2,
              explanation: "Le Reste correspond aux 'miettes' qu'on ne peut plus distribuer équitablement. Si le reste de la division est plus grand que le diviseur, on pourrait donner une part de plus à tout le monde."
            },
            {
              question: "Comment vérifie-t-on le résultat d'une division euclidienne ?",
              options: [
                "Dividende = (Quotient + Reste) × Diviseur",
                "Dividende = (Quotient × Diviseur) + Reste",
                "Dividende = Diviseur + Quotient"
              ],
              correctAnswer: 1,
              explanation: "De la preuve euclidienne : Dividende = (Quotient × Diviseur) + Reste."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais les mots Dividende, Diviseur, Quotient, Reste.",
            "Je connais les 4 étapes de la boucle de division.",
            "Je me souviens de l'astuce de la preuve de fin de calcul !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+25 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM1_03_Division_Posee;
