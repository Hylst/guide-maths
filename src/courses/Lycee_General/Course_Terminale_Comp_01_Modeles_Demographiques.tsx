import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';
import { Users, TrendingUp, BarChart2 } from 'lucide-react';

// Live Demographic Simulation Component
const DemographicSim = () => {
  const [p0, setP0] = useState(200);       // Initial Population
  const [r, setR] = useState(0.15);        // Growth Rate (15%)
  const [k, setK] = useState(1200);       // Carrying Capacity (K)
  const [steps, setSteps] = useState(20);   // Number of steps (Years)

  // Calculate populations for Malthus and Verhulst
  const malthusData: number[] = [p0];
  const verhulstData: number[] = [p0];

  for (let i = 1; i <= steps; i++) {
    // Malthus: P_(n+1) = (1 + r) * P_n
    const prevM = malthusData[i - 1];
    malthusData.push(Math.round(prevM * (1 + r)));

    // Verhulst: P_(n+1) = P_n + r * P_n * (1 - P_n / K)
    const prevV = verhulstData[i - 1];
    const nextV = prevV + r * prevV * (1 - prevV / k);
    verhulstData.push(Math.round(nextV));
  }

  // Find max value for graphing
  const maxMalthus = Math.max(...malthusData);
  const maxVal = Math.max(maxMalthus, k) * 1.1;

  // Sizes for SVG
  const width = 500;
  const height = 300;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  // Convert points to SVG coords
  const getCoords = (year: number, value: number) => {
    const x = paddingLeft + (year / steps) * graphWidth;
    const y = paddingTop + graphHeight - (Math.min(value, maxVal) / maxVal) * graphHeight;
    return `${x},${y}`;
  };

  const malthusPoints = malthusData.map((v, i) => getCoords(i, v)).join(' ');
  const verhulstPoints = verhulstData.map((v, i) => getCoords(i, v)).join(' ');

  // SVG capacity limit line Y-coordinate
  const kY = paddingTop + graphHeight - (k / maxVal) * graphHeight;

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
            Population Initiale {"$P_0$"} : <span className="text-indigo-600">{p0}</span>
          </label>
          <input 
            type="range" 
            min="50" 
            max="500" 
            step="10"
            value={p0} 
            onChange={(e) => setP0(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
            Taux de croissance {"$r$"} : <span className="text-indigo-600">{(r * 100).toFixed(0)} %</span>
          </label>
          <input 
            type="range" 
            min="0.05" 
            max="0.40" 
            step="0.01"
            value={r} 
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
            Capacité d'accueil {"$K$"} : <span className="text-emerald-600">{k}</span>
          </label>
          <input 
            type="range" 
            min="400" 
            max="2000" 
            step="50"
            value={k} 
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-2xl p-4 overflow-x-auto">
        <svg viewBox="0 0 500 300" className="w-full h-64 overflow-visible">
          {/* Grid lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = paddingTop + (graphHeight / 4) * i;
            const val = Math.round(maxVal - (maxVal / 4) * i);
            return (
              <g key={i}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                <text x={paddingLeft - 8} y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end" className="font-mono">{val}</text>
              </g>
            );
          })}

          {/* X axis ticks */}
          {Array.from({ length: 6 }).map((_, i) => {
            const idx = Math.round((steps / 5) * i);
            const x = paddingLeft + (idx / steps) * graphWidth;
            return (
              <g key={i}>
                <line x1={x} y1={paddingTop} x2={x} y2={paddingTop + graphHeight} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                <text x={x} y={paddingTop + graphHeight + 16} fill="#94a3b8" fontSize="10" textAnchor="middle" className="font-mono">An {idx}</text>
              </g>
            );
          })}

          {/* Carrying Capacity line K */}
          <line x1={paddingLeft} y1={kY} x2={width - paddingRight} y2={kY} stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />
          <text x={width - paddingRight - 8} y={kY - 6} fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="end">Limite K ({k})</text>

          {/* Malthus Curve */}
          <polyline 
            points={malthusPoints} 
            fill="none" 
            stroke="#6366f1" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Verhulst Curve */}
          <polyline 
            points={verhulstPoints} 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Axis borders */}
          <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + graphHeight} stroke="#475569" strokeWidth="2" />
          <line x1={paddingLeft} y1={paddingTop + graphHeight} x2={width - paddingRight} y2={paddingTop + graphHeight} stroke="#475569" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex flex-wrap justify-between gap-4 mt-4 font-semibold text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-4 h-2 bg-indigo-500 rounded-sm"></span>
          <span>Modèle Malthus (Exposant / Géométrique)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-2 bg-emerald-500 rounded-sm"></span>
          <span>Modèle Verhulst (Logistique S-courbe)</span>
        </div>
      </div>
    </div>
  );
};

const Course_Terminale_Comp_01_Modeles_Demographiques: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Terminale_Complementaires/01_Terminale_Comp_01_Modeles_Demographiques.md";

  const checklistItems = [
    "Maîtriser le modèle linéaire et malthusien de croissance progressive.",
    "Comprendre la notion de capacité limite de charge d'un environnement (K).",
    "Résoudre et analyser des suites arithmético-géométriques et logistiques.",
    "Interpréter les comportements limites d'une population à long terme."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="T.COMP" 
        title="Modèles Démographiques" 
        subtitle="Analyses de l'évolution de populations à l'aide de modèles discrets et continus."
        level="Terminale Complémentaire"
        duration="3h"
        objectives={[
          "Formuler des modèles simples d'évolution démographique.",
          "Comprendre les comportements exponentiels de Malthus.",
          "Modéliser des scénarios d'autorégulation de Verhulst.",
          "Étudier la convergence de suites récurrentes associées."
        ]}
      />

      <InfoBlock type="info" title="Pourquoi modéliser la démographie ?">
        La croissance des ressources alimentaires suit souvent une loi linéaire, tandis que celle des espèces suit des lois plus complexes. L'étude mathématique des modèles démographiques permet de prévoir la viabilité des populations, d'anticiper les famines ou de réguler les écosystèmes sauvages.
      </InfoBlock>

      <Section title="La théorie de croissance illimitée (Malthus)" color="slate" icon={<TrendingUp className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            En 1798, l'économiste anglais Thomas Malthus postule que sans régulation extérieure, une population s'accroît selon une progression géométrique (taux constant) :
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center font-mono">
            {"$$P_{n+1} = (1 + r) \\cdot P_n$$"}
          </div>
          <p>
            Où {"$P_n$"} représente la population à l'étape {"$n$"} et {"$r \\ge 0$"} désigne le taux d'accroissement naturel de la population.
          </p>
          <TipBanner type="warning" title="Limites évidentes du modèle">
            Ce modèle est pertinent pour de courtes périodes ou des milieux aux ressources infinies (ex: des bactéries dans une boîte de Pétri fraîche). Néanmoins, dans la vie réelle, la nourriture et l'espace sont limited, empêchant une croissance exponentielle éternelle.
          </TipBanner>
        </div>
      </Section>

      <Section title="Le modèle autorégulé : Logistique (Verhulst)" color="indigo" icon={<Users className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Pour intégrer la limitation des ressources, Pierre-François Verhulst introduit en 1838 une rétroaction corrective proportionnelle à la saturation du milieu : la population ne peut pas dépasser une limite soutenable {"$K$"} (carrying capacity).
          </p>
          <InfoBlock type="definition" title="Équation de Verhulst Discrète">
            Le modèle de Verhulst s'écrit sous forme de suite récurrente :
            <div className="font-mono text-center my-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              {"$$P_{n+1} = P_n + r \\cdot P_n \\cdot \\left(1 - \\frac{P_n}{K}\\right)$$"}
            </div>
            Le terme de freinage {"$\\left(1 - \\frac{P_n}{K}\\right)$"} est proche de 1 si la population est faible, et devient négatif si {"$P_n > K$"}, provoquant une autorégulation instantanée.
          </InfoBlock>
        </div>
      </Section>

      <Section title="Simulation Interactive: Malthus vs Verhulst" color="emerald" icon={<BarChart2 className="text-emerald-500 w-6 h-6"/>}>
        <p className="mb-4 text-center text-slate-600 dark:text-slate-350 font-medium">
          Ajustez les réglettes ci-dessous pour apprécier la différence fondamentale entre croissance exponentielle illimitée et saturation auto-stable.
        </p>
        <DemographicSim />
      </Section>

      <Section title="Exercices Résolus pas à pas" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Étude de l'évolution d'animaux dans un parc naturel"
          question={
            <>
              On estime que chaque année, la population de bouquetins d'une réserve augmente de 8% par naissance/décès, et subit une chasse contrôlée de 15 spécimens retirés par an. La population initiale est de {"$P_0 = 300$"}.
              <br/>
              1. Exprimer {"$P_{n+1}$"} en fonction de {"$P_n$"}.
              <br/>
              2. Déterminer la population stable théorique.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Modélisation mathématique de l'évolution</strong>
              <p className="mt-2">
                Chaque année, on applique une hausse de 8% (coefficient multiplicateur de {"$1.08$"}) et on soustrait 15 de la population totale :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$P_{n+1} = 1.08 \\cdot P_n - 15$$"}
              </div>
              <p className="text-sm text-slate-500 mt-1">C'est une suite arithmético-géométrique classique.</p>
            </>,
            <>
              <strong>Étape 2 : Chercher l'état d'équilibre stationnaire</strong>
              <p className="mt-2">
                La population reste stable si {"$P_{n+1} = P_n = L$"}. Résolvons l'équation de point fixe :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$L = 1.08 \\cdot L - 15$$"}
              </div>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$0.08 \\cdot L = 15 \\implies L = \\frac{15}{0.08} = 187.5$$"}
              </div>
              <p className="mt-1">
                Le point fixe est de 188 animaux. Comme la population initiale (300) est supérieure à 188, la population va continuer d'augmenter d'année en année sans converger vers ce seuil instable.
              </p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Suite logistique normalisée"
          question={
            <>
              Soit la suite logistique simplifiée définie par {"$x_0 = 0.2$"} et pour tout entier {"$n \\ge 0$"} :
              <p className="font-mono text-center p-2 bg-slate-100 dark:bg-slate-800 rounded my-2">{"$x_{n+1} = 3 \\cdot x_n(1 - x_n)$"}</p>
              Déterminez le premier terme {"$x_1$"} et calculez l'état stationnaire théorique non nul de la suite.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul de x_1</strong>
              <p className="mt-2">
                On injecte la condition initiale {"$x_0 = 0.2$"} :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$x_1 = 3 \\cdot 0.2 \\cdot (1 - 0.2) = 3 \\cdot 0.2 \\cdot 0.8 = 0.48$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Recherche de la limite non nulle</strong>
              <p className="mt-2">
                On résout {"$x = 3x(1 - x)$"}. Si {"$x \\neq 0$"}, alors en divisant par x de chaque côté :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200">
                {"$$1 = 3(1 - x) \\implies 1 = 3 - 3x \\implies 3x = 2 \\implies x = \\frac{2}{3} \\approx 0.667$$"}
              </div>
              <p className="mt-1">
                La population normalisée se stabilise ainsi de manière harmonieuse vers deux tiers de sa taille théorique maximale.
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Qu'est-ce que le modèle de Verhulst continu ?",
            answer: "En temps continu, la croissance logistique s'écrit par une équation différentielle P'(t) = r * P(t) * (1 - P(t) / K). Sa solution analytique est la célèbre fonction logistique en S : f(t) = K / (1 + C * e^(-r*t))."
          },
          {
            question: "Les suites logistiques sont-elles chaotiques ?",
            answer: "Oui, c'est l'une de leurs propriétés remarquables développée par Robert May. Pour des valeurs du paramètre r de Verhulst élevées ( supérieures à 3.57 ), l'évolution de la suite devient extrêmement sensible aux conditions initiales et adopte un comportement non périodique chaotique."
          },
          {
            question: "Comment choisir entre modèle arithmétique et modèle géométrique ?",
            answer: "Choisissez un modèle arithmétique (linéaire) lorsque l'accroissement est absolu et constant (ex: 20 individus de plus par an), et un modèle géométrique lorsque l'accroissement dépend de la taille de la population (ex: 3% d'augmentation)."
          }
        ]} />
      </Section>

      <Section title="Flashcards" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formule d'évolution de la suite géométrique correspondante au modèle de Malthus ?</>}
            back={<>{"$$P_n = P_0 \\cdot (1+r)^n$$"}</>}
          />
          <Flashcard 
            front={<>Que représente K dans le modèle de Verhulst ?</>}
            back={<>La <strong>capacité de charge ou d'accueil de l'environnement</strong>, c'est-à-dire la quantité optimale ou maximale théorique de résidents tolérables.</>}
          />
        </div>
      </Section>

      <Section title="Quiz d'évaluation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si la population actuelle vaut exactement K dans le modèle de Verhulst discret, quelle est la population à l'étape suivante ?",
              options: ["La population diminue de moitié", "La population reste exactement égale à K", "La population double"],
              correctAnswer: 1,
              explanation: "Comme P_n = K, le terme (1 - P_n/K) vaut 0. Ainsi, l'accroissement r * P_n * 0 est nul et la population reste égale à K !"
            },
            {
              question: "Si une population de 100 individus croît selon le modèle de Malthus avec un taux r = 20% par an, quelle sera la population après 2 ans ?",
              options: ["140 individus", "144 individus", "120 individus"],
              correctAnswer: 1,
              explanation: "Après 2 ans, P = P_0 * (1.20)^2 = 100 * 1.44 = 144 individus."
            },
            {
              question: "Quel modèle démographique utilise à la fois un coefficient de multiplication et une constante d'ajout/retrait constante ?",
              options: ["La suite arithmético-géométrique", "Le modèle exponentiel de Malthus", "La suite arithmétique classique"],
              correctAnswer: 0,
              explanation: "Il s'agit d'un modèle sous la forme P_(n+1) = a * P_n + b, qui est exactement d'ordre arithmético-géométrique."
            }
          ]}
        />
      </Section>

      <div onClick={() => validateCourse(courseId)}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Terminale_Comp_01_Modeles_Demographiques;
