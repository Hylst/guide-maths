import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Industriel_02_Plans_Experiences: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // State for dynamic factors configuration
  // For interaction view between Factor A (Temp) and Factor B (Pressure)
  const [effectA, setEffectA] = useState(4.5); // Effect of temperature
  const [effectB, setEffectB] = useState(2.0); // Effect of pressure
  const [interactionAB, setInteractionAB] = useState(1.5); // Interaction between A and B
  const [baseValue, setBaseValue] = useState(12.0); // Baseline yield

  // Calculations of response Y for the 4 combinations of A (-1, +1) and B (-1, +1)
  // X_A, X_B can be -1 or +1
  const getY = (xA: number, xB: number) => {
    return baseValue + (effectA / 2) * xA + (effectB / 2) * xB + (interactionAB / 2) * xA * xB;
  };

  const yMM = getY(-1, -1); // Temp Bas, Press Bas
  const yMP = getY(-1, 1);  // Temp Bas, Press Haut
  const yPM = getY(1, -1);  // Temp Haut, Press Bas
  const yPP = getY(1, 1);   // Temp Haut, Press Haut

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-IND-02"
        title="Plans d'Expériences & Méthode Taguchi"
        subtitle="Optimisation industrielle de processus complexes, modélisation factorielle, calcul d'effets de facteurs et matrices d'interactions."
        duration="1h 30"
        level="BUT 2ème/3ème année (GIM / GMP / QLIO)"
        prerequisites={[
          "Statistiques descriptives (variance, covariance)",
          "Systèmes d'équations linéaires"
        ]}
        objectives={[
          "Comprendre l'inefficacité des essais « un facteur à la fois » et la puissance du plan factoriel.",
          "Modéliser et analyser un plan factoriel complet à 2 niveaux (plans 2^k).",
          "Calculer rigoureusement les effets principaux de facteurs et leurs interactions.",
          "Découvrir la méthode de réduction des tables orthogonales d'expérimentation de Taguchi."
        ]}
      />

      <Section title="🔬 Pourquoi utiliser un Plan d'Expériences ?" icon="🧪" color="indigo">
        <p className="mb-4">
          Optimiser un processus industriel (vitesse de coupe d'usinage, température de recuit, dosage d'additif plastique) implique souvent de manipuler plusieurs et variables combinées.
        </p>

        <TipBanner type="warning" title="La méthode traditionnelle inefficace : 'Un Facteur à la Fois' (One Factor At a Time)">
          L'approche intuitive mais erronée consiste à fixer tous les paramètres et à faire varier un seul facteur, puis répéter pour les autres. 
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm bg-amber-500/10 p-3 rounded-lg">
            <li><strong>Surcoût économique majeur :</strong> Elle demande un nombre astronomique d'essais.</li>
            <li><strong>Cécité sur les interactions :</strong> Elle est mathématiquement incapable de modéliser l'influence synergique ou inhibitrice entre facteurs (ex: deux produits chimiques inoffensifs seuls devenant corrosifs si mélangés).</li>
          </ul>
        </TipBanner>

        <p className="mt-4">
          La méthode mathématique des <strong>Plans d'Expériences (DoE : Design of Experiments)</strong> résout ce défi en distribuant de façon stratégique et corrélée des niveaux de facteurs prédéfinis afin d'extraire le maximum d'informations d'un minimum d'essais réels.
        </p>

        <InfoBlock type="definition" title="Vocabulaire de Base">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Réponse :</strong> La variable de sortie à optimiser (ex: dureté, allongement, taux de défauts). Notée <MathComponent math="Y" />.</li>
            <li><strong>Facteurs :</strong> Les variables d'entrée supposées influencer la réponse (ex: Température, Pression). Notés <MathComponent math="X_i" />.</li>
            <li><strong>Niveau :</strong> Les valeurs de consigne prises par un facteur. Souvent normées sur deux états : Niveau Bas (<MathComponent math="-1" />) et Niveau Haut (<MathComponent math="+1" />).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="📐 Le Plan Factoriel Complet 2^k" icon="📊" color="emerald">
        <p className="mb-4">
          Dans le cas le plus courant, on souhaite tester <MathComponent math="k" /> facteurs à deux niveaux. Un plan factoriel complet requiert alors exactement <MathComponent math="2^k" /> essais expérimentaux pour balayer toutes les configurations de la table.
        </p>

        <FormulaBox 
          title="Modèle Mathématique Linéaire (k=3)" 
          math="Y = a_0 + a_1 X_1 + a_2 X_2 + a_3 X_3 + a_{12}(X_1 X_2) + a_{13}(X_1 X_3) + a_{23}(X_2 X_3) + a_{123}(X_1 X_2 X_3)" 
        />

        <p className="my-4">
          Où les coefficients représentent :
        </p>

        <ul className="list-disc pl-6 my-4 space-y-1.5 text-sm">
          <li><strong><MathComponent math="a_0" /> :</strong> La réponse moyenne globale de l'arbre expérimental.</li>
          <li><strong><MathComponent math="a_i" /> :</strong> Le demi-effet d'action du facteur <MathComponent math="X_i" /> (quand <MathComponent math="X_i" /> passe de -1 à +1, la réponse varie de <MathComponent math="E_i = 2a_i" />).</li>
          <li><strong><MathComponent math="a_{ij}" /> :</strong> Le demi-effet d'interaction croisé entre les deux facteurs <MathComponent math="X_i" /> et <MathComponent math="X_j" />.</li>
        </ul>

        <InfoBlock type="info" title="Formule d'Évaluation des Effets">
          Si l'on dispose d'une table d'expériences équilibrée, l'effet propre <MathComponent math="E_i" /> d'un facteur ou d'une interaction s'évalue par le ratio entre le produit scalaire du vecteur de réponse <MathComponent math="\mathbf{Y}" /> avec la colonne codée correspondante, et le nombre de répliques :
          <FormulaBox math="E_i = 2a_i = \frac{\sum (X_i \cdot Y)}{2^{k-1}}" />
        </InfoBlock>
      </Section>

      <Section title="🎮 Simulateur Interactif d'Interactions" icon="🎮" color="purple">
        <p className="mb-6">
          Ajustez les effets principaux et l'intensité d'interaction à l'aide des glissières ci-dessous pour apprécier le concept d'interaction géométrique. 
          Sur le graphique de droite, observez que des lignes parallèles indiquent une absence d'interaction, tandis que des lignes croisées révèlent une forte interaction synergique ou antagoniste !
        </p>

        {/* Interactive App content */}
        <div className="bg-muted/50 dark:bg-slate-900 border border-border rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controllers Column */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
              🛠️ Coefficients du Modèle
            </h4>

            {/* Baseline Value info */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Rendement de Base (<MathComponent math="a_0" />) :</span>
                <span className="font-mono text-indigo-600">{baseValue.toFixed(1)} g</span>
              </label>
              <input 
                aria-label="Rendement moyen a0"
                type="range" min="5" max="25" step="0.5" 
                value={baseValue} onChange={(e) => setBaseValue(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Effect of A (Temperature) */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Effet de A-Température (<MathComponent math="E_A" />) :</span>
                <span className="font-mono text-indigo-600">{(effectA).toFixed(1)} g</span>
              </label>
              <input 
                aria-label="Effet thermique"
                type="range" min="-10" max="10" step="0.5" 
                value={effectA} onChange={(e) => setEffectA(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Effect of B (Pressure) */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Effet de B-Pression (<MathComponent math="E_B" />) :</span>
                <span className="font-mono text-indigo-600">{(effectB).toFixed(1)} g</span>
              </label>
              <input 
                aria-label="Effet de pression"
                type="range" min="-10" max="10" step="0.5" 
                value={effectB} onChange={(e) => setEffectB(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Interaction AB */}
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50">
              <label className="text-sm font-bold text-amber-900 dark:text-amber-100 flex justify-between">
                <span>⚡ Interaction AB (<MathComponent math="I_{AB}" />) :</span>
                <span className="font-mono">{interactionAB >= 0 ? `+${interactionAB.toFixed(1)}` : interactionAB.toFixed(1)} g</span>
              </label>
              <input 
                aria-label="Intensité d'interaction AB"
                type="range" min="-8" max="8" step="0.5" 
                value={interactionAB} onChange={(e) => setInteractionAB(parseFloat(e.target.value))}
                className="w-full accent-amber-500 mt-2" 
              />
              <span className="text-xs text-slate-500 mt-1 block">
                Modifie la pente relative des lignes d'influence réciproques.
              </span>
            </div>
          </div>

          {/* Results Plot Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border p-4 rounded-2xl shadow-inner relative">
              <h5 className="font-bold text-sm text-foreground mb-4 flex items-center justify-between">
                <span>📉 Graphe d'Interactions de Taguchi</span>
                <span className="text-xs bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded">Enveloppe à 2 Niveaux</span>
              </h5>

              {/* Interaction Plot SVG */}
              <svg viewBox="0 0 450 220" className="w-full h-auto overflow-visible select-none">
                {/* Background area */}
                <rect x="50" y="20" width="340" height="150" fill="#f8fafc" rx="4" />

                {/* Y Axis Grid Lines */}
                {[0, 25, 50, 75, 100].map((level, i) => {
                  const y = 20 + (150 * i) / 4;
                  return (
                    <g key={i}>
                      <line x1="50" y1={y} x2="390" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="45" y={y + 3} className="text-[7px] fill-slate-400 font-mono text-right" textAnchor="end">
                        {(30 - (30 * i) / 4).toFixed(0)}g
                      </text>
                    </g>
                  );
                })}

                {/* Level X Labels */}
                {/* Left side: A- (-1 / Temp Bas) */}
                <line x1="100" y1="20" x2="100" y2="175" stroke="#cbd5e1" />
                <text x="100" y="190" className="text-[9px] fill-slate-700 font-black text-center" textAnchor="middle">Niveau A- (Froid)</text>

                {/* Right side: A+ (+1 / Temp Haut) */}
                <line x1="340" y1="20" x2="340" y2="175" stroke="#cbd5e1" />
                <text x="340" y="190" className="text-[9px] fill-slate-700 font-black text-center" textAnchor="middle">Niveau A+ (Chaud)</text>

                {/* Plot calculations mapping */}
                {/* Scale factor: let maximum possible Y value be 35g, minimum 0g */}
                {/* y_mapped = 170 - (val / 35) * 150 */}
                {(() => {
                  const getSvgY = (val: number) => {
                    const constrainedVal = Math.max(0, Math.min(35, val));
                    return 170 - (constrainedVal / 35) * 150;
                  };

                  const yLeftBMinus = getSvgY(yMM); // A- , B-
                  const yRightBMinus = getSvgY(yPM); // A+ , B-

                  const yLeftBPlus = getSvgY(yMP); // A- , B+
                  const yRightBPlus = getSvgY(yPP); // A+ , B+

                  return (
                    <g>
                      {/* Line 1: Response relative to Temp under Low Pressure (B-) */}
                      <path d={`M 100 ${yLeftBMinus} L 340 ${yRightBMinus}`} fill="none" stroke="#2563eb" strokeWidth="2.5" />
                      <circle cx="100" cy={yLeftBMinus} r="4" fill="#2563eb" />
                      <text x="94" y={yLeftBMinus + 3} className="text-[7.5px] fill-blue-700 font-black" textAnchor="end">{yMM.toFixed(1)}g</text>
                      <circle cx="340" cy={yRightBMinus} r="4" fill="#2563eb" />
                      <text x="346" y={yRightBMinus + 3} className="text-[7.5px] fill-blue-700 font-black" textAnchor="start">{yPM.toFixed(1)}g</text>

                      {/* Line 2: Response relative to Temp under High Pressure (B+) */}
                      <path d={`M 100 ${yLeftBPlus} L 340 ${yRightBPlus}`} fill="none" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="3 1" />
                      <circle cx="100" cy={yLeftBPlus} r="4" fill="#ea580c" />
                      <text x="94" y={yLeftBPlus + 3} className="text-[7.5px] fill-orange-700 font-black" textAnchor="end">{yMP.toFixed(1)}g</text>
                      <circle cx="340" cy={yRightBPlus} r="4" fill="#ea580c" />
                      <text x="346" y={yRightBPlus + 3} className="text-[7.5px] fill-orange-700 font-black" textAnchor="start">{yPP.toFixed(1)}g</text>
                    </g>
                  );
                })()}
              </svg>

              {/* Legend of Plot */}
              <div className="flex gap-4 justify-center text-xs mt-3 bg-muted p-2.5 rounded-xl border">
                <span className="flex items-center gap-1.5 font-bold text-blue-600">
                  <span className="w-3 h-1 bg-blue-600 inline-block" /> Niveau B- (Pression basse)
                </span>
                <span className="flex items-center gap-1.5 font-bold text-orange-600">
                  <span className="w-3 h-1 bg-orange-600 border-b border-dashed inline-block" /> Niveau B+ (Pression haute)
                </span>
              </div>
            </div>

            {/* Analysis card */}
            <div className="bg-card p-4 rounded-2xl border">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">💡 Interprétation Visuelle</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                {Math.abs(interactionAB) < 0.5 ? (
                  "Les lignes sont presque parallèles ! L'interaction entre la température et la pression est très faible ou négligeable. Vous pouvez optimiser ces facteurs séparément."
                ) : (
                  "Les lignes se croisent ou ont des pentes fortement divergentes ! Il y a une forte interaction entre la pression et la température. Le rendement optimal à température haute dépend fondamentalement de la pression appliquée."
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="⚙️ Maîtrise des Tables Orthogonales de Taguchi" icon="🛠️" color="amber">
        <p className="mb-4">
          Dès que le nombre de facteurs <MathComponent math="k" /> augmente, le nombre d'essais du plan factoriel complet explose : à <MathComponent math="8" /> facteurs, il faut <MathComponent math="2^8 = 256" /> essais.
        </p>

        <InfoBlock type="funfact" title="L'Apport Fondateur de Taguchi">
          L'ingénieur statisticien de Toyota, Genichi Taguchi, a structuré des <strong>plans fractionnaires optimaux</strong> appelés <strong>tables orthogonales</strong> (notées L4, L8, L9, L16). 
          Par exemple, une table <strong>L8</strong> permet d'étudier jusqu'à <MathComponent math="7" /> facteurs différents en réalisant indifféremment seulement <strong>8 essais</strong> au lieu de 128 ! Tout ceci à condition que les interactions d'ordre supérieur soient considérées négligeables.
        </InfoBlock>

        <TipBanner type="info" title="Orthogonalité géométrique">
          Le mot « orthogonal » signifie que dans la table d'essais, chaque facteur contient autant de signes <MathComponent math="+" /> que de signes <MathComponent math="-" />. De plus, sur n'importe quel sous-ensemble de deux colonnes, tous les couples possibles <MathComponent math="(-,-) \ ; \ (-,+) \ ; \ (+,-) \ ; \ (+,+)" /> apparaissent un nombre rigoureusement égal de fois. Cela garantit un découplage mathématique parfait lors de l'ANOVA.
        </TipBanner>
      </Section>

      <Section title="⚔️ Exercices Pratiques d'Évaluation" icon="🎓" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Calcul d'Effets et modèle factoriel Complet"
          question={
            <div>
              <p>
                Un fondeur d'aluminium qualifie une presse sous vide. Il étudie l'influence de la Température (A) et du Temps d'injection (B) sur la dureté du métal coulé. 
                Voici les résultats mesurés pour les 4 essais :
              </p>
              <div className="overflow-x-auto my-3">
                <table className="w-full border text-center text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-2 border">Essai n°</th>
                      <th className="p-2 border">A (Temp)</th>
                      <th className="p-2 border">B (Temps)</th>
                      <th className="p-2 border">Dureté Y (HB)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-2 border">1</td><td className="p-2 border">-1 (120°C)</td><td className="p-2 border">-1 (5s)</td><td className="p-2 border">80 HB</td></tr>
                    <tr><td className="p-2 border">2</td><td className="p-2 border">+1 (160°C)</td><td className="p-2 border">-1 (5s)</td><td className="p-2 border">110 HB</td></tr>
                    <tr><td className="p-2 border">3</td><td className="p-2 border">-1 (120°C)</td><td className="p-2 border">+1 (10s)</td><td className="p-2 border">90 HB</td></tr>
                    <tr><td className="p-2 border">4</td><td className="p-2 border">+1 (160°C)</td><td className="p-2 border">+1 (10s)</td><td className="p-2 border">114 HB</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="font-bold">Calculer l'effet propre du facteur A, du facteur B et de leur interaction AB.</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Calcul de l'effet principal du Facteur A (Température)</p>
              <p className="my-2">
                L'effet <MathComponent math="E_A" /> est mesuré en faisant la moyenne de la réponse lorsque A est haut, moins la moyenne de la réponse lorsque A est bas :
              </p>
              <p className="font-mono text-center my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$E_A = \\frac{(Y_2 + Y_4)}{2} - \\frac{(Y_1 + Y_3)}{2} = \\frac{(110 + 114)}{2} - \\frac{(80 + 90)}{2} = 112 - 85 = 27\\text{ HB}$"}
              </p>
              <p className="text-sm">Passer de 120°C à 160°C augmente la dureté moyenne de 27 points Brinell.</p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Calcul de l'effet principal du Facteur B (Temps d'injection)</p>
              <p className="my-2">
                De la même manière, calculons l'effet de B :
              </p>
              <p className="font-mono text-center my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$E_B = \\frac{(Y_3 + Y_4)}{2} - \\frac{(Y_1 + Y_2)}{2} = \\frac{(90 + 114)}{2} - \\frac{(80 + 110)}{2} = 102 - 95 = 7\\text{ HB}$"}
              </p>
              <p className="text-sm">Passer de 5s à 10s d'injection augmente la dureté moyenne de 7 points Brinell.</p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Calcul de la colonne d'interaction AB et conclusion</p>
              <p className="my-2">
                Le vecteur codé de la colonne d'interaction se forme par produit de signe colonnes A et B :
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Essai 1 (A- , B-) : <MathComponent math="X_{AB1} = (-1) \times (-1) = +1" /></li>
                <li>Essai 2 (A+ , B-) : <MathComponent math="X_{AB2} = (+1) \times (-1) = -1" /></li>
                <li>Essai 3 (A- , B+) : <MathComponent math="X_{AB3} = (-1) \times (+1) = -1" /></li>
                <li>Essai 4 (A+ , B+) : <MathComponent math="X_{AB4} = (+1) \times (+1) = +1" /></li>
              </ul>
              <p className="my-2">
                L'effet d'interaction <MathComponent math="I_{AB}" /> vaut :
              </p>
              <p className="font-mono text-center my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$I_{AB} = \\frac{(Y_1 + Y_4)}{2} - \\frac{(Y_2 + Y_3)}{2} = \\frac{(80 + 114)}{2} - \\frac{(110 + 90)}{2} = 97 - 100 = -3\\text{ HB}$"}
              </p>
              <p className="text-sm font-bold text-emerald-600">
                ✓ L'interaction est faible (-3) et négative. Il y a un excellent lissage, A et B coopèrent presque parfaitement !
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de mémorisation de DoE" icon="🧠" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Combien d'essais sont requis pour réaliser un plan factoriel complet à 4 facteurs ayant chacun 2 niveaux ?</>}
            back={<>{"Il faut réaliser $2^4 = 16$ essais expérimentaux."}</>}
          />
          <Flashcard 
            front={<>Dans un modèle d'ANOVA de Taguchi, comment calcule-t-on l'interaction codée de deux facteurs ?</>}
            back={<>{"Elle s'obtient en multipliant algébriquement ligne par ligne les signes $(-1$ ou $+1)$ des colonnes associées aux deux facteurs étudiés."}</>}
          />
        </div>
      </Section>

      <Section title="📜 Foire Aux Questions (FAQ)" icon="🎓" color="indigo">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les plans de Taguchi introduisent-ils le concept de « bruit » ?",
              answer: "Taguchi sépare les facteurs contrôlables (par exemple la température ou la pression de l'injecteur) des facteurs incontrôlables ou perturbateurs appelés bruits (tels que l'humidité de l'usine, la provenance irrégulière de la matière). Son but est de trouver une combinaison stable qui rend le procédé insensible ou robuste de façon passive aux bruits."
            },
            {
              question: "Qu'est ce que le concept d'aliasing (confondu) dans les plans d'expériences fractionnaires ?",
              answer: "Dans les plans fractionnaires (ex: plans 2^{k-1}), on n'exécute qu'une fraction des expériences. Mathématiquement, cela implique que certains effets principaux partagent la même signature vectorielle que des interactions croisées. On dit qu'ils sont 'aliassés' ou 'confondus'. On fait l'hypothèse physique que les interactions d'ordre élevé sont nulles."
            },
            {
              question: "Quelle est l'utilité du ratio Signal/Bruit (S/N) proposé par Taguchi ?",
              answer: "Le ratio S/N quantifie la dispersion autour de la moyenne. Taguchi utilise trois types de fonctions pour ce ratio selon l'objectif visé : 'le plus petit possible' (pour éliminer un jeu d'usure), 'nominal est le meilleur' (pour viser un diamètre précis) ou 'le plus grand possible' (pour maximiser la résistance à l'usure)."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'évaluation d'Aptitude" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'effet propre d'un facteur Température sur la résistance à la casse d'une éprouvette vaut EA = 12 Mpa, quel est la valeur du coefficient linéaire aA dans l'écriture du modèle mathématique ?",
              options: [
                "12 Mpa",
                "6 Mpa",
                "24 Mpa",
                "3 Mpa"
              ],
              correctAnswer: 1,
              explanation: "Par définition, l'effet propre d'un facteur est la différence entre le niveau haut et bas. Le coefficient aA représente la pente par rapport au milieu de l'amplitude, donc la moitié de l'effet global : aA = EA / 2 = 6 Mpa."
            },
            {
              question: "Parmi les tables orthogonales suivantes, laquelle permet d'étudier 7 facteurs indépendants à 2 niveaux en seulement 8 essais ?",
              options: [
                "L4",
                "L8",
                "L9",
                "L16"
              ],
              correctAnswer: 1,
              explanation: "La table L8 de Taguchi est conçue pour étudier jusqu'à 7 facteurs de 2 niveaux au moyen de 8 essais."
            },
            {
              question: "Sur un graphe d'interactions, si la courbe de réponse de B au niveau Haut de A et celle au niveau Bas de A forment deux segments parallèles de pentes égales :",
              options: [
                "L'interaction AB est maximale.",
                "L'interaction AB est nulle ou négligeable.",
                "Les facteurs A et B sont impossibles à tarer.",
                "L'ANOVA est instable."
              ],
              correctAnswer: 1,
              explanation: "Le parallélisme parfait sur le graphique indique que l'influence de B est rigoureusement identique quelle que soit la valeur de consigne de A, traduisant une interaction nulle."
            }
          ]}
        />
      </Section>

      <InteractiveChecklist 
        items={[
          "Je sais identifier les biais d'une démarche un facteur à la fois.",
          "Je suis capable de calculer les effets principaux et d'interaction sur un plan factoriel complet 2^k.",
          "Je comprends le principe d'évaluation de robustesse et l'usage des tables orthogonales de Taguchi."
        ]}
      />
    </div>
  );
};

export default Course_BUT_Industriel_02_Plans_Experiences;
