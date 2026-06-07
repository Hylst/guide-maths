import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../components/SharedUI';
import { useProgress } from '../hooks/useProgress';
import { motion } from 'framer-motion';
import { AreaChart, Compass, Award } from 'lucide-react';

// Regression and Least Squares Interactive Component
const RegressionSim = () => {
  const [a, setA] = useState(1.2);    // User slope (Mayer/Manual fitting)
  const [b, setB] = useState(10);     // User intercept
  const [isAuto, setIsAuto] = useState(false); // Toggle least squares automatic fitting

  // Static Point Cloud representing advertising budget (X in k€) and sales volume (Y in thousands units)
  const points = [
    { x: 10, y: 22 },
    { x: 15, y: 35 },
    { x: 20, y: 30 },
    { x: 30, y: 56 },
    { x: 40, y: 62 }
  ];

  // Mathematical Calculations for optimal line
  const n = points.length;
  const meanX = points.reduce((sum, p) => sum + p.x, 0) / n;
  const meanY = points.reduce((sum, p) => sum + p.y, 0) / n;

  // Covariance(x,y) and Variance(x)
  let num = 0;
  let den = 0;
  points.forEach(p => {
    num += (p.x - meanX) * (p.y - meanY);
    den += Math.pow(p.x - meanX, 2);
  });

  const optimalA = num / den;
  const optimalB = meanY - optimalA * meanX;

  // Active Line selection
  const activeA = isAuto ? optimalA : a;
  const activeB = isAuto ? optimalB : b;

  // Compute Sum of Squared Errors (SSE)
  let sse = 0;
  points.forEach(p => {
    const predictedY = activeA * p.x + activeB;
    sse += Math.pow(p.y - predictedY, 2);
  });

  // Convert coordinate points to SVG Coords
  // Domain X: 0 to 50, Y: 0 to 80
  const getCoords = (ptX: number, ptY: number) => {
    const svcX = 60 + (ptX / 50) * 380; // Scale 60 to 440
    const svcY = 220 - (ptY / 80) * 180; // Scale 220 to 40
    return { x: svcX, y: svcY };
  };

  const svgPoints = points.map(p => getCoords(p.x, p.y));
  const svgG = getCoords(meanX, meanY);

  // Line points
  const lineP1 = getCoords(0, activeB);
  const lineP2 = getCoords(50, activeA * 50 + activeB);

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button 
          onClick={() => setIsAuto(false)} 
          className={`px-5 py-2 font-bold rounded-xl transition-all ${!isAuto ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          🎮 Ajustement Manuel (Ajustez les Sliders)
        </button>
        <button 
          onClick={() => setIsAuto(true)} 
          className={`px-5 py-2 font-bold rounded-xl transition-all ${isAuto ? "bg-emerald-600 text-white shadow-md animate-pulse" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          🤖 Ajustement Moindres Carrés (Optimal)
        </button>
      </div>

      {!isAuto && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pente (a) : <span className="text-indigo-600 font-extrabold">{a.toFixed(2)}</span></label>
            <input 
              type="range" 
              min="0.5" 
              max="2.5" 
              step="0.05"
              value={a} 
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ordonnée à l'origine (b) : <span className="text-indigo-600 font-extrabold">{b.toFixed(1)}</span></label>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="0.5"
              value={b} 
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Équation Droite</p>
          <p className="text-lg font-bold text-slate-800 dark:text-white">{"$y = "}{activeA.toFixed(2)}{"x + "}{activeB.toFixed(1)}</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
          <p className="text-[10px] font-bold text-indigo-500 uppercase">Point Moyen G</p>
          <p className="text-lg font-bold text-indigo-700 dark:text-indigo-400">({meanX.toFixed(1)} ; {meanY.toFixed(1)})</p>
        </div>
        <div className={`p-3 rounded-xl border transition-colors duration-300 ${sse < 165 ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-rose-50 border-rose-100 text-rose-700"}`}>
          <p className="text-[10px] font-bold uppercase opacity-80">Somme des résidus au carré (Moindres Carrés)</p>
          <p className="text-lg font-black">{sse.toFixed(1)}</p>
        </div>
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-2xl p-4 overflow-x-auto relative">
        <svg viewBox="0 0 500 250" className="w-full h-64 overflow-visible">
          {/* Axis borders */}
          <line x1="60" y1="20" x2="60" y2="220" stroke="#334155" strokeWidth="2" />
          <line x1="60" y1="220" x2="470" y2="220" stroke="#334155" strokeWidth="2" />

          {/* Grid guidelines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = 20 + (180 / 4) * i;
            const value = 80 - 20 * i;
            return (
              <g key={i}>
                <line x1="60" y1={y} x2="470" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                <text x="50" y={y + 4} fill="#64748b" fontSize="9" textAnchor="end">{value}</text>
              </g>
            );
          })}

          <text x="60" y="234" fill="#64748b" fontSize="9" textAnchor="middle">X = 0</text>
          <text x="250" y="234" fill="#64748b" fontSize="9" textAnchor="middle">X = 25</text>
          <text x="440" y="234" fill="#64748b" fontSize="9" textAnchor="middle">X = 50</text>

          {/* Residual guide vertical dashed lines */}
          {points.map((p, idx) => {
            const coord = svgPoints[idx];
            const predY = activeA * p.x + activeB;
            const coordPred = getCoords(p.x, predY);
            return (
              <line 
                key={idx} 
                x1={coord.x} 
                y1={coord.y} 
                x2={coordPred.x} 
                y2={coordPred.y} 
                stroke="#f43f5e" 
                strokeWidth="1.5" 
                strokeDasharray="2 2" 
              />
            );
          })}

          {/* Adjust Line */}
          <line 
            x1={lineP1.x} 
            y1={lineP1.y} 
            x2={lineP2.x} 
            y2={lineP2.y} 
            stroke={isAuto ? "#10b981" : "#6366f1"} 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />

          {/* Point Cloud Dots */}
          {svgPoints.map((pt, idx) => (
            <g key={idx}>
              <circle cx={pt.x} cy={pt.y} r="6" fill="#f43f5e" stroke="#000" strokeWidth="1.5" />
              <text x={pt.x + 8} y={pt.y - 8} fill="#94a3b8" fontSize="8" className="font-mono">{points[idx].y}</text>
            </g>
          ))}

          {/* Mean point G */}
          <path d={`M ${svgG.x - 7} ${svgG.y} L ${svgG.x + 7} ${svgG.y} M ${svgG.x} ${svgG.y - 7} L ${svgG.x} ${svgG.y + 7}`} stroke="#eab308" strokeWidth="2.5" />
          <circle cx={svgG.x} cy={svgG.y} r="5" fill="none" stroke="#eab308" strokeWidth="2" />
          <text x={svgG.x + 8} y={svgG.y + 12} fill="#eab308" fontSize="10" fontWeight="bold">G ({meanX} ; {meanY})</text>
        </svg>

        <div className="absolute top-4 right-4 bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 shadow-md space-y-1">
          <p>🔬 <span className="font-bold text-rose-400">Résidus (SSE)</span></p>
          <p>Somme des écarts verticaux</p>
          <p>du nuage de points au carré.</p>
          <p>Le but est de la rendre la plus </p>
          <p>petite possible !</p>
        </div>
      </div>
    </div>
  );
};

const Course_Terminale_Comp_03_Statistiques_Ajustement: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Complementaires/03_Terminale_Comp_03_Statistiques_Ajustement.md";

  const checklistItems = [
    "Savoir calculer les coordonnées de l'unique point moyen G(x̄, ȳ) d'un nuage.",
    "Comprendre la théorie mathématique de minimisation de la méthode des moindres carrés.",
    "Calculer l'équation de la droite d'ajustement affine par moindres carrés.",
    "Mettre en oeuvre un changement de variable logarithmique pour effectuer un ajustement exponentiel."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="T.COMP" 
        title="Statistiques à Deux Variables" 
        subtitle="Méthodes d'ajustement linéaire et non linéaire par moindres carrés et modélisations prédictives."
        level="Terminale Complémentaire"
        duration="3h"
        objectives={[
          "Tracer un nuage de points et calculer son point moyen G.",
          "Comprendre le principe géométrique des moindres carrés.",
          "Déterminer les paramètres d'une droite d'ajustement affine.",
          "Utiliser des ajustements exponentiels (changement de variable)."
        ]}
      />

      <InfoBlock type="info" title="Pourquoi faire des ajustements de données ?">
        Les ingénieurs, économistes et météorologues collectent des données expérimentales bruitées. Un ajustement statistique permet d'extraire la tendance de fond d'un nuage de points indiscipliné d'une part, et de réaliser des prévisions futures fiables par interpolation ou extrapolation d'autre part.
      </InfoBlock>

      <Section title="Nuage de points et Point Moyen G" color="slate" icon={<Compass className="text-amber-500 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Soient deux caractères quantitatifs {"$X$"} et {"$Y$"} étudiés conjointement sur une population de taille {"$n$"}. Les couples de données sont représentés sous forme de nuage de points {"$M_i(x_i, y_i)$"}.
          </p>
          
          <InfoBlock type="definition" title="Le Point Moyen G">
            Le point central du nuage de points est appelé <strong>Point Moyen ("point de gravité") G</strong>. Ses coordonnées correspondent de manière simple aux moyennes arithmétiques de chaque coordonnée :
            <div className="font-mono text-center my-4 bg-slate-50 dark:bg-slate-900 border p-3 rounded-lg border-slate-100 dark:border-slate-800">
              {"$$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i \\qquad \\bar{y} = \\frac{1}{n} \\sum_{i=1}^{n} y_i$$"}
            </div>
            La droite de régression de moindres carrés passe <strong>obligatoirement et à chaque fois</strong> par ce point moyen {"$G(\\bar{x}, \\bar{y})$"}.
          </InfoBlock>
        </div>
      </Section>

      <Section title="Principe de la Droite des Moindres Carrés" color="indigo" icon={<AreaChart className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            L'ajustement affine par la méthode des moindres carrés consiste à chercher une droite d'équation {"$y = ax + b$"} qui minimise la somme des carrés des écarts verticaux (résidus) de tous les points à cette droite :
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center font-mono">
            {"$$S(a,b) = \\sum_{i=1}^{n} (y_i - (a x_i + b))^2 \\quad \\leftarrow \\text{la plus minimale possible !}$$"}
          </div>
          <p>
            Les formules théoriques des paramètres optimaux sont donnés par l'analyse différentielle :
          </p>
          <BentoGrid>
            <BentoCard title="Coefficient Directeur (Pente)" color="indigo" colSpan={1}>
              <div className="text-center font-mono py-2 text-md font-bold bg-white dark:bg-slate-950 border rounded-xl border-slate-100 dark:border-slate-800">
                {"$$a = \\frac{\\text{Cov}(x,y)}{\\text{V}(x)}$$"}
              </div>
            </BentoCard>
            <BentoCard title="Ordonnée à l'Origine" color="emerald" colSpan={1}>
              <div className="text-center font-mono py-2 text-md font-bold bg-white dark:bg-slate-950 border rounded-xl border-slate-100 dark:border-slate-800">
                {"$$b = \\bar{y} - a \\cdot \\bar{x}$$"}
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="Schéma Interactif : Moindres Carrés" color="emerald" icon="▶️">
        <p className="mb-4 text-center text-slate-600 dark:text-slate-350 font-medium">
          Démontrez de manière visuelle en quoi consiste la méthode en activant ou désactivant l'ajustement statistique automatique ci-dessous.
        </p>
        <RegressionSim />
      </Section>

      <Section title="Ajustement non linéaire par changement de variable" color="amber" icon={<Award className="text-amber-500 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Lorsque le nuage s'incurve, une droite ne modélise plus correctement l'évolution de la tendance. On effectue alors un ajustement multiplicatif exponentiel sous la forme {"$y = C \\cdot e^{kx}$"}.
          </p>
          <TipBanner type="info" title="Méthode de linéarisation logarithmique">
             En prenant le logarithme népérien de la relation, on formalise une droiture affine :
             <div className="font-mono text-center my-3 p-2 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 rounded-lg">
                {"$$\\ln(y) = \\ln(C \\cdot e^{kx}) = \\ln(C) + k \\cdot x$$"}
             </div>
             En posant la variable intermédiaire {"$z = \\ln(y)$"}, on se ramène à l'étude classique du modèle rectiligne {"$z = ax + b$"} avec les moindres carrés.
          </TipBanner>
        </div>
      </Section>

      <Section title="Exercices Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Calcul de la droite de Mayer simplifiée"
          question={
            <>
              Soient les données de chiffre d'affaires d'une entreprise :
              <table className="w-full border-collapse border border-slate-200 my-4 text-center font-mono">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border p-2">Année x</th>
                    <td className="border p-2">1</td>
                    <td className="border p-2">2</td>
                    <td className="border p-2">3</td>
                    <td className="border p-2">4</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="border p-2 bg-slate-100 dark:bg-slate-800">CA y (k€)</th>
                    <td className="border p-2">10</td>
                    <td className="border p-2">15</td>
                    <td className="border p-2">18</td>
                    <td className="border p-2">25</td>
                  </tr>
                </tbody>
              </table>
              Calculez les coordonnées du Point Moyen G, et déterminez l'équation de la droite d'ajustement par moindres carrés sachant que la covariance vaut {"$Cov(x,y) = 5.75$"} et la variance {"$V(x) = 1.25$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Coordonnées du Point Moyen G</strong>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$\\bar{x} = \\frac{1+2+3+4}{4} = 2.5$$"}
              </div>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$\\bar{y} = \\frac{10+15+18+25}{4} = 17$$"}
              </div>
              <p className="mt-2 text-sm">Le point moyen est G(2.5 ; 17).</p>
            </>,
            <>
              <strong>Étape 2 : Coefficient directeur a de la droite</strong>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$a = \\frac{\\text{Cov}(x,y)}{\\text{V}(x)} = \\frac{5.75}{1.25} = 4.6$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Calcul de b et conclusion</strong>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$b = \\bar{y} - a \\bar{x} = 17 - 4.6(2.5) = 17 - 11.5 = 5.5$$"}
              </div>
              <p className="mt-2 font-bold text-center text-indigo-600">
                Régression finale : {"$y = 4.6x + 5.5$"}
              </p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Changement de Variable Exponentiel"
          question={
            <>
              On étudie l'évolution de bactéries. On applique le changement de variable logarithmique de la table {"$z_i = \\ln(y_i)$"} et on obtient l'équation d'ajustement affine par régression suivante :
              <p className="font-mono text-center p-2 bg-slate-100 dark:bg-slate-800 rounded my-2">{"$z = 0.5x + 3$"}</p>
              Exprimez la population théorique initiale {"$y$"} en fonction de la durée de l'expérience {"$x$"} sous la forme de loi exponentielle {"$y = C \\cdot e^{kx}$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Isoler y à partir du système de changement</strong>
              <p className="mt-2">
                Puisque {"$z = \\ln(y)$"}, on s'affranchit du logarithme en passant à la fonction réciproque exponentielle de part d'autre de l'égalité :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$y = e^z$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Injecter l'expression ajustée</strong>
              <p className="mt-2">
                On y remplace {"$z$"} par l'expression {"$0.5x + 3$"} trouvée :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$y = e^{0.5x + 3} = e^3 \\cdot e^{0.5x}$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Simplifier la constante</strong>
              <p className="mt-2">
                On évalue {"$e^3 \\approx 20.08$"}. L'expression correspond donc à :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg p-3 border">
                {"$$y \\approx 20.08 \\cdot e^{0.5x}$$"}
              </div>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Que se passe-t-il s'il n'y a aucune corrélation linéaire ?",
            answer: "Si les points du nuage sont éparpillés d'une manière circulaire uniforme sans structure apparente directionnelle, le coefficient de corrélation linéaire est proche de 0. Dans ce cas, une regression affine par les moindres carrés n'a mathématiquement aucune pertinence pour réaliser des prédictions."
          },
          {
            question: "Quelle est la différence entre interpolation et extrapolation ?",
            answer: "L'interpolation consiste à estimer une valeur manquante située à l'intérieur de l'intervalle d'étude existant du nuage de points. L'extrapolation consiste en revanche à projeter des estimations plus risquées en dehors de l'intervalle connu de mesures d'apprentissage (ex: deviner le CA dans 10 ans)."
          },
          {
            question: "L'erreur totale (SSE) peut-elle être nulle ?",
            answer: "Oui, mais uniquement si tous les points du nuage de données expérimentales sont d'ores et déjà parfaitement co-linéaires et alignés sur une seule et même droite théorique exacte."
          }
        ]} />
      </Section>

      <Section title="Flashcards" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formule théorique des coordonnées du point moyen d'un nuage de n points ?</>}
            back={<>{"$$G(\\bar{x}, \\bar{y}) = \\left( \\frac{1}{n} \\sum x_i \\,;\\, \\frac{1}{n} \\sum y_i \\right)$$"}</>}
          />
          <Flashcard 
            front={<>Si z = ln(y), à quelle relation finale sur y conduit l'équation de régression z = ax + b ?</>}
            back={<>{"$$y = e^b \\cdot e^{ax}$$"}</>}
          />
        </div>
      </Section>

      <Section title="Quiz d'évaluation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si la moyenne des x est de 5, et la moyenne des y est de 20. La droite de moindres carrés d'ajustement y = ax + b :",
              options: ["Passe obligatoirement par le point (5 ; 20)", "Ne passe jamais par le point (5 ; 20)", "Ne dépend d'aucune de ces données"],
              correctAnswer: 0,
              explanation: "Le point moyen G de coordonnées (5 ; 20) appartient obligatoirement à la droite d'ajustement !"
            },
            {
              question: "Quelle est la variable de substitution classique permettant de se ramener à un ajustement linéaire pour étudier y = C * e^(kx) ?",
              options: ["z = y^2", "z = ln(y)", "z = e^y"],
              correctAnswer: 1,
              explanation: "Le logarithme népérien z = ln(y) transforme les produits exponentiels en expressions additives affines simples."
            },
            {
              question: "La méthode des moindres carrés cherche à minimiser la valeur cumulée de :",
              options: ["La somme des écarts verticaux absolus", "Le produit des coordonnées", "La somme des carrés des résidus verticaux"],
              correctAnswer: 2,
              explanation: "Le nom fait référence géométriquement à la minimisation des surfaces de carrés formés par les écarts verticaux."
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

export default Course_Terminale_Comp_03_Statistiques_Ajustement;
