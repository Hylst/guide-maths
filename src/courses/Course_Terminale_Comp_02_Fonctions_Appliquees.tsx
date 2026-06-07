import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../components/SharedUI';
import { useProgress } from '../hooks/useProgress';
import { motion } from 'framer-motion';
import { LineChart, DollarSign, Activity } from 'lucide-react';

// Pricing Optimizer Interactive Sim
const ElasticitySim = () => {
  const [price, setPrice] = useState(20); // Slider current price
  
  // Linear Demand function: D(p) = 1000 - 20*p
  const d_p = Math.max(0, 1000 - 20 * price);
  const revenue = price * d_p;
  
  // Derivative of demand with respect to price: D'(p) = -20
  const deriv_d = -20;
  
  // Elasticity calculation: E(p) = p * D'(p) / D(p)
  const elasticity = d_p > 0 ? (price * deriv_d) / d_p : -999;

  // Generate SVG coordinates for graphing
  // Price from 0 to 50
  const maxPriceForGraph = 50;
  const maxRevenueForGraph = 13000; // Peak is at p=25, R=12500
  const maxDemandForGraph = 1000;

  const stepsCount = 50;
  const pointsDemand: string[] = [];
  const pointsRevenue: string[] = [];

  for (let p = 0; p <= maxPriceForGraph; p++) {
    const dem = Math.max(0, 1000 - 20 * p);
    const rev = p * dem;

    // SVG scaling
    const x = 50 + (p / maxPriceForGraph) * 400; // graph goes from 50 to 450
    const yDem = 220 - (dem / maxDemandForGraph) * 180; // graph goes from 20 to 200
    const yRev = 220 - (rev / maxRevenueForGraph) * 180;

    pointsDemand.push(`${x},${yDem}`);
    pointsRevenue.push(`${x},${yRev}`);
  }

  // Current selected position inside Graph
  const curX = 50 + (price / maxPriceForGraph) * 400;
  const curYDem = 220 - (d_p / maxDemandForGraph) * 180;
  const curYRev = 220 - (revenue / maxRevenueForGraph) * 180;

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-6">Optimiseur de Prix etÉlasticité de Demande</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
          <p className="text-xs font-bold uppercase text-slate-400">Demande Estimée</p>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{d_p.toFixed(0)} <span className="text-sm font-medium">unités</span></p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-2xl">
          <p className="text-xs font-bold uppercase text-indigo-500">Chiffre d'Affaires</p>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{revenue.toLocaleString('fr-FR')} €</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-4 rounded-2xl">
          <p className="text-xs font-bold uppercase text-emerald-500">Élasticité de la demande</p>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{elasticity === -999 ? "∞" : elasticity.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
          Prix unitaire du produit : <span className="text-indigo-600 font-extrabold text-lg">{price} €</span>
        </label>
        <input 
          type="range" 
          min="5" 
          max="45" 
          step="1"
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 font-semibold mt-1">
          <span>5 € (Prix très bas)</span>
          <span>45 € (Prix élevé)</span>
        </div>
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-2xl p-4 overflow-x-auto relative">
        <svg viewBox="0 0 500 250" className="w-full h-64 overflow-visible">
          {/* Axis labels */}
          <line x1="50" y1="20" x2="50" y2="220" stroke="#334155" strokeWidth="2" />
          <line x1="50" y1="220" x2="470" y2="220" stroke="#334155" strokeWidth="2" />

          {/* Grid helper */}
          <text x="40" y="24" fill="#64748b" fontSize="10" textAnchor="end">Max</text>
          <text x="40" y="222" fill="#64748b" fontSize="10" textAnchor="end">0</text>
          <text x="50" y="236" fill="#64748b" fontSize="10" textAnchor="middle">0 €</text>
          <text x="250" y="236" fill="#64748b" fontSize="10" textAnchor="middle">25 €</text>
          <text x="450" y="236" fill="#64748b" fontSize="10" textAnchor="middle">50 €</text>

          {/* Demand curve */}
          <polyline 
            points={pointsDemand.join(' ')} 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <text x="450" y="36" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="end">Courbe de Demande</text>

          {/* Revenue curve */}
          <polyline 
            points={pointsRevenue.join(' ')} 
            fill="none" 
            stroke="#6366f1" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <text x="250" y="60" fill="#6366f1" fontSize="10" fontWeight="bold" textAnchor="middle">Chiffre d'Affaires</text>

          {/* Current line guide */}
          <line x1={curX} y1="20" x2={curX} y2="220" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />

          {/* Demand point */}
          <circle cx={curX} cy={curYDem} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          {/* Revenue point */}
          <circle cx={curX} cy={curYRev} r="6" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
        </svg>

        {/* Informative overlay */}
        <div className="absolute top-4 right-4 bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 shadow-lg space-y-1">
          <p>📌 <strong className="text-yellow-400">Analyse de l'Équilibre</strong></p>
          <p>Prix optimal théorique : <strong>25 €</strong></p>
          <p>Élasticité à 25€ : <strong>-1,00</strong></p>
          <p>Prix actuel : <strong>{price} €</strong> ({elasticity > -1 ? "Demande peu élastique" : "Demande très élastique"})</p>
        </div>
      </div>
    </div>
  );
};

const Course_Terminale_Comp_02_Fonctions_Appliquees: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Complementaires/02_Terminale_Comp_02_Fonctions_Appliquees.md";

  const checklistItems = [
    "Distinguer et calculer le coût marginal, le coût moyen et le profit d'une entreprise.",
    "Dériver des quotients pour dresser des tableaux de variations applicatifs.",
    "Formuler l'élasticité de la demande par rapport au prix d'achat.",
    "Identifier les extrema d'une fonction économique pour déterminer le rendement optimal."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="T.COMP" 
        title="Fonctions Appliquées (Économie)" 
        subtitle="Modélisations, coût marginal, élasticité de la demande et calculs d'optimisation."
        level="Terminale Complémentaire"
        duration="3h"
        objectives={[
          "Traduire une situation réelle en fonctions d'analyse.",
          "Comprendre le lien entre dérivation et coût marginal.",
          "Maîtriser le concept économique d'élasticité de marché.",
          "Résoudre des problèmes complexes de maximisation de bénéfices."
        ]}
      />

      <InfoBlock type="info" title="L'alliance des mathématiques et de l'économie">
        La gestion financière moderne s'appuie intégralement sur l'analyse fonctionnelle. Grâce au calcul différentiel (dérivées), une entreprise ne se contente plus de compter ses gains passés : elle prévoit le comportement futur de l'offre et optimise scientifiquement ses prix de vente.
      </InfoBlock>

      <Section title="La triade de l'analyse marginale" color="slate" icon={<DollarSign className="text-amber-500 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Soient {"$x$"} la quantité d'objets fabriqués, et {"$C(x)$"} le coût total de production de ces objets.
          </p>
          <BentoGrid>
            <BentoCard title="Coût Moyen" color="indigo" colSpan={1}>
              <p className="text-sm mb-2 text-slate-600 dark:text-slate-350">Coût unitaire moyen de fabrication :</p>
              <div className="text-center font-mono py-2 text-lg font-bold bg-white dark:bg-slate-900 border rounded-xl border-slate-100 dark:border-slate-800">
                {"$$C_M(x) = \\frac{C(x)}{x}$$"}
              </div>
            </BentoCard>
            <BentoCard title="Coût Marginal" color="amber" colSpan={2}>
              <p className="text-sm mb-2 text-slate-700 dark:text-amber-100">Coût d'un objet supplémentaire produit :</p>
              <div className="text-center font-mono py-2 text-lg font-bold bg-white dark:bg-slate-950 border rounded-xl border-slate-100 dark:border-slate-800 text-amber-700 dark:text-amber-400">
                {"$$C_m(x) = C(x+1) - C(x) \\approx C'(x)$"}
              </div>
              <p className="text-xs text-amber-500 mt-2 font-medium">✨ En mathématiques économiques, on assimile le coût marginal à la dérivée première du coût total.</p>
            </BentoCard>
          </BentoGrid>

          <TipBanner type="info" title="Propriété de point critique">
            Le coût moyen est minimum lorsque le coût moyen est égal au coût marginal : {"$C_M(x) = C_m(x)$"}. En ce point, fabriquer une unité de plus commence à coûter plus cher que le coût unitaire moyen historique.
          </TipBanner>
        </div>
      </Section>

      <Section title="L'Élasticité de la Demande" color="indigo" icon={<Activity className="text-indigo-500 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            L'<strong>élasticité</strong> de la demande par rapport au prix {"$p$"} est le rapport mesurant la variation relative de la demande provoquée par une hausse relative de 1% du prix.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl text-center font-mono text-xl">
            {"$$E(p) = \\frac{p \\cdot D'(p)}{D(p)}$$$"}
          </div>
          <p>
            Comme la demande diminue généralement quand le prix augmente ({"$D'(p) < 0$"}), l'élasticité est presque toujours <strong>négative</strong>.
          </p>
          
          <BentoGrid>
            <BentoCard title="Élasticité Faible (|E| < 1)" color="slate">
              <p className="text-xs text-slate-600 dark:text-slate-350">La demande varie peu face aux variations de prix. (ex: Essence, médicaments, alimentation de base).</p>
            </BentoCard>
            <BentoCard title="Élasticité Forte (|E| > 1)" color="rose">
              <p className="text-xs text-rose-800 dark:text-rose-250">La demande chute brutalement si le prix monte. (ex: Produits de luxe échangeables, marques concurrentielles).</p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="Application Interactive : Optimisation Pricing" color="emerald" icon={<LineChart className="text-emerald-500 w-6 h-6"/>}>
        <p className="mb-4 text-center text-slate-650 font-medium">
          Étudiez la rentabilité en déplaçant le curseur de prix du produit ci-dessous. Observez la zone où l'élasticité est unitaire (autour de 25€).
        </p>
        <ElasticitySim />
      </Section>

      <Section title="Exercices Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Minimisation d'un coût moyen"
          question={
            <>
              Une usine fabrique une pâte polymère. Le coût de production quotidien en euros pour {"$x$"} kg est donné par :
              <p className="font-mono text-center p-2 bg-slate-100 dark:bg-slate-800 rounded my-2">{"$C(x) = x^2 + 100x + 900$"}</p>
              Où {"$x \\in [10, 100]$"}. Déterminer la quantité {"$x$"} qui minimise le coût moyen journalier, et vérifier que ce coût moyen minimal est égal au coût marginal.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Formuler le coût moyen C_M(x)</strong>
              <p className="mt-2">
                Le coût moyen s'obtient en divisant le coût total par x :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$C_M(x) = \\frac{C(x)}{x} = \\frac{x^2 + 100x + 900}{x} = x + 100 + \\frac{900}{x}$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Dériver le coût moyen</strong>
              <p className="mt-2">
                Dérivons cette fonction par rapport à {"$x$"} :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$C_M'(x) = 1 - \\frac{900}{x^2}$$"}
              </div>
              <p className="mt-2">
                Cherchons la racine où la dérivée s'annule :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$1 - \\frac{900}{x^2} = 0 \\implies x^2 = 900 \\implies x = 30 \\quad (\\text{car } x > 0)$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Vérification de la propriété économique</strong>
              <p className="mt-2">
                Pour {"$x = 30$"} :
                <br/>
                • Coût moyen : {"$C_M(30) = 30 + 100 + \\frac{900}{30} = 160$"} € / kg.
                <br/>
                • Coût marginal : {"$C_m(x) = C'(x) = 2x + 100 \\implies C_m(30) = 2(30) + 100 = 160$"} € / kg.
                <br/>
                On a bien {"$C_M(30) = C_m(30)$"}. Le coût moyen est optimal à l'intersection exacte des deux courbes !
              </p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Calcul de l'élasticité de prix"
          question={
            <>
              La demande hebdomadaire pour un parfum de marque est définie par {"$D(p) = 200 - 4p$"} pour un tarif unitaire {"$p$"} en euros.
              <br/>
              Calculez l'élasticité de la demande de ce produit pour un prix déterminé de {"$p = 30$"} €, puis interprétez le comportement du marché.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calculer la dérivée de la fonction de demande</strong>
              <p className="mt-2">
                La fonction de demande {"$D(p) = 200 - 4p$"} a pour fonction dérivée par rapport à p :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$D'(p) = -4$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Appliquer la formule d'élasticité</strong>
              <p className="mt-2">
                On injecte {"$p = 30$"} dans l'équation d'élasticité :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$D(30) = 200 - 4(30) = 80$$"}
              </div>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$E(30) = \\frac{30 \\cdot D'(30)}{D(30)} = \\frac{30 \\cdot (-4)}{80} = -1.5$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Interprétez le résultat</strong>
              <p className="mt-2">
                Comme l'élasticité vaut {"$-1.5$"} (ou sa valeur absolue {"$|-1.5| = 1.5 > 1$"}), la demande est dite <strong>élastique</strong>. 
                <br/>
                Cela signifie qu'une augmentation de prix de 1% pour ce parfum se traduirait de manière concrète par une baisse notable de la demande de 1,5% de la part des consommateurs !
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Quelle est la signification réelle d'une élasticité nulle E = 0 ?",
            answer: "Une élasticité de zéro désigne une demande parfaitement rigide ou inélastique. Peu importe le prix d'achat, les clients achètent la même quantité fixe. C'est le cas typique pour des médicaments vitaux de survie ou de l'eau en quantité minime."
          },
          {
            question: "Quelle relation unit le bénéfice d'une firme et le profit marginal ?",
            answer: "Le profit global B(x) est de la forme B(x) = Recette(x) - Coût(x). Le profit marginal est maximal lorsque sa dérivée B'(x) = R'(x) - C'(x) s'annule, ce qui revient à fixer la production finale exacte à laquelle la recette marginale vaut le coût marginal."
          },
          {
            question: "Est-ce qu'un profit moyen existe aussi ?",
            answer: "Oui, le bénéfice moyen est également défini comme B(x)/x, et son maximum théorique répond aux mêmes directives géométriques que les calculs de coûts unitaires minimaux."
          }
        ]} />
      </Section>

      <Section title="Flashcards" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Donnez la formule mathématique du coût moyen {"$C_M(x)$"} ?</>}
            back={<>{"$$C_M(x) = \\frac{C(x)}{x}$$"}</>}
          />
          <Flashcard 
            front={<>Qu'est-ce qu'une demande élastique ?</>}
            back={<span>C'est une demande dont la réactivité aux prix est forte, de sorte que {"$|E(p)| > 1$"}. Toute variation tarifaire implique d'importantes conséquences sur le volume vendu.</span>}
          />
        </div>
      </Section>

      <Section title="Quiz d'évaluation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si le coût de production total d'une firme est C(x) = 5x^2 + 10x. Quelle est sa fonction de coût marginal C_m(x) ?",
              options: ["5x + 10", "15x", "10x + 10"],
              correctAnswer: 2,
              explanation: "Le coût marginal s'assimile à la dérivée C'(x). La dérivée de 5x^2 + 10x est exactement 10x + 10."
            },
            {
              question: "Une élasticité de la demande de -0.4 signifie que face à une augmentation de prix de 10% :",
              options: ["La demande augmente de 4%", "La demannde baisse de 4%", "La demande baisse de 40%"],
              correctAnswer: 1,
              explanation: "Comme le ratio d'élasticité est multiplicateur linéaire, hausse prix de 10% * (-0.4) = baisse de 4% de la demande hebdomadaire."
            },
            {
              question: "Le chiffre d'affaires maximal d'une entreprise est atteint théoriquement lorsque l'élasticité vaut :",
              options: ["E = 0", "E = -1", "E = -2"],
              correctAnswer: 1,
              explanation: "L'élasticité unitaire (égale à -1) correspond au point culminant où toute petite hausse de prix compense d'une manière géométriquement parfaite la baisse de demande."
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

export default Course_Terminale_Comp_02_Fonctions_Appliquees;
