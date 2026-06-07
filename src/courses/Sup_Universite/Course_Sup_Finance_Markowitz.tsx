import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Finance_Markowitz: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [rho, setRho] = useState(0.20); // Corrélation ajustable par slider de -1 à +1
  
  // Paramètres des deux actifs risqués
  const rA = 0.12; // Rentabilité Actif 1 : 12%
  const sA = 0.18; // Volatilité Actif 1 : 18%
  const rB = 0.06; // Rentabilité Actif 2 : 6%
  const sB = 0.10; // Volatilité Actif 2 : 10%
  const rf = 0.03; // Taux sans risque : 3%

  // Calculer l'hyperbole d'efficience
  const pointsFrontier: string[] = [];
  const originX = 60;
  const originY = 320;
  const scaleX = 1400; // Multiplicateur pour abscisses (volatilité)
  const scaleY = 1800; // Multiplicateur pour ordonnées (rentabilité)

  // On calcule l'hyperbole pour w de -0.2 à 1.2 par pas de 0.05
  let minVarW = (sB * sB - sA * sB * rho) / (sA * sA + sB * sB - 2 * sA * sB * rho);
  // Borner le poids de variance minimale
  if (minVarW < -5) minVarW = -5;
  if (minVarW > 5) minVarW = 5;

  let minSigma = 100;
  let minSigmaY = 0;
  let minSigmaX = 0;

  for (let w = -0.10; w <= 1.10; w += 0.02) {
    const rPort = w * rA + (1 - w) * rB;
    const varPort = w * w * sA * sA + (1 - w) * (1 - w) * sB * sB + 2 * w * (1 - w) * rho * sA * sB;
    const sPort = Math.sqrt(Math.max(0, varPort));
    
    const gx = originX + sPort * scaleX;
    const gy = originY - rPort * scaleY;
    pointsFrontier.push(`${gx},${gy}`);

    if (sPort < minSigma) {
      minSigma = sPort;
      minSigmaY = gy;
      minSigmaX = gx;
    }
  }

  // Calcul du portefeuille de tangence optimal (Max Sharpe Ratio)
  // Formule analytique pour 2 actifs :
  const excessA = rA - rf;
  const excessB = rB - rf;
  const numW = excessA * sB * sB - excessB * sA * sB * rho;
  const denW = excessA * sB * sB + excessB * sA * sA - (excessA + excessB) * sA * sB * rho;
  let wTangency = numW / (denW || 1);
  if (wTangency < 0) wTangency = 0;
  if (wTangency > 1) wTangency = 1;

  const rTang = wTangency * rA + (1 - wTangency) * rB;
  const sTang = Math.sqrt(Math.max(0, wTangency * wTangency * sA * sA + (1 - wTangency) * (1 - wTangency) * sB * sB + 2 * wTangency * (1 - wTangency) * rho * sA * sB));
  const sharpeTang = (rTang - rf) / (sTang || 1);

  // Coordonnées du portefeuille de tangence
  const gxTang = originX + sTang * scaleX;
  const gyTang = originY - rTang * scaleY;

  // Droite d'Allocation Active des Capital (CAL) : part du taux sans risque rf au point de tangence et s'étend
  const calX1 = originX;
  const calY1 = originY - rf * scaleY;
  const calX2 = originX + 0.25 * scaleX;
  const rCal2 = rf + sharpeTang * 0.25;
  const calY2 = originY - rCal2 * scaleY;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-FIN"
        title="Sup Finance : Théorie Moderne du Portefeuille de Markowitz"
        subtitle="Modélisation et optimisation des choix financiers sous contrainte linéaire de budget : variance de portefeuille, décorrélation active, et frontière efficiente."
        duration="2h 15"
        level="École de Finance / Actuariat / Université de Sciences Financières"
        prerequisites={["Probabilités multidimensionnelles", "Formes quadratiques symétriques", "Théorème des multiplicateurs de Lagrange"]}
        objectives={[
          "Formuler rigoureusement l'espérance et la variance d'un portefeuille d'actifs risqués.",
          "Modéliser l'effet réducteur de la corrélation sur le risque global (diversification).",
          "Calculer analytiquement les coordonnées du Portefeuille de Variance Minimale.",
          "Déterminer les équations de la Frontière Efficiente et de la Droite d'Allocation du Capital (CAL)."
        ]}
      />

      <Section title="💼 Fondements du Couple Rendement-Risque" icon="Scale" color="indigo">
        <p className="mb-4">
          Comment concilier le désir humain d'obtenir la rentabilité financière la plus élevée avec la prudence rationnelle face au risque boursier ? En 1952, l'économiste <strong>Harry Markowitz</strong> (Prix Nobel d'Économie 1990) a posé les jalons de la finance moderne en formalisant le concept mathématique de <strong>diversification d'actifs</strong>.
        </p>
        <p className="mb-4">
          Un investisseur alloue sa fortune entre <MathComponent math="N" /> actifs financiers risqués. Le portefeuille est défini par le vecteur des poids d'exposition de capital <MathComponent math="w = (w_1, w_2, \dots, w_N)^T" /> qui obéit à la contrainte budgétaire :
          <MathComponent block math="\sum_{i=1}^N w_i = 1" />
        </p>

        <InfoBlock type="definition" title="Formulation du Rendement et de la Variance d'un Portefeuille">
          La rentabilité attendue d'un portefeuille <MathComponent math="R_p" /> s'exprime comme l'espérance pondérée des rentabilités individuelles :
          <MathComponent block math="E(R_p) = \sum_{i=1}^N w_i E(R_i) = w^T E(R)" />
          Cependant, le risque boursier se modélise par la <strong>variance boursière</strong> de cette somme pondérée conditionnée par les covariances d'actifs :
          <MathComponent block math="\sigma_p^2 = \text{Var}(R_p) = \sum_{i=1}^N \sum_{j=1}^N w_i w_j \sigma_{ij} = w^T \Sigma w" />
          Où <MathComponent math="\Sigma" /> représente la matrice de variance-covariance symétrique semi-définie positive d'ordre N.
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Puissance de la Décorrélation d'actifs" icon="TrendingUp" color="rose">
        <p className="mb-4">
          Considérons le cas simple mais très parlant d'un portefeuille composé de seulement deux actifs risqués, A et B, de poids respectifs <MathComponent math="w" /> et <MathComponent math="1-w" />. Sa variance s'écrit :
        </p>

        <FormulaBox 
          title="Variance d'un portefeuille à deux actifs" 
          math="\sigma_p^2 = w^2 \sigma_A^2 + (1-w)^2 \sigma_B^2 + 2w(1-w)\rho_{AB}\sigma_A\sigma_B" 
        />

        <p className="my-4">
          Où <MathComponent math="\rho_{AB}" /> est le coefficient de corrélation linéaire boursier d'ordre : <MathComponent math="-1 \le \rho_{AB} \le 1" />.
        </p>

        <InfoBlock type="reminder" title="L'Effet magique de la diversification">
          <ul className="list-dash pl-6 space-y-1">
            <li>Si <MathComponent math="\rho = 1" /> : Corrélation parfaite. L'écart-type est linéaire : <MathComponent math="\sigma_p = w \sigma_A + (1-w)\sigma_B" />. Aucune réduction de risque.</li>
            <li>Si <MathComponent math="\rho < 1" /> : L'écart-type du portefeuille est <strong>strictement inférieur</strong> à la moyenne pondérée des écarts-types individuels. C'est la diversification !</li>
            <li>Si <MathComponent math="\rho = -1" /> : Corrélation parfaitement négative. Le risque peut être annulé de manière absolue (<MathComponent math="\sigma_p = 0" />) !</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="📊 Simulateur Interactif de Frontière Efficiente" icon="Sliders" color="indigo">
        <p className="mb-4 text-slate-700 dark:text-slate-300 font-medium">
          Manipulez le curseur ci-dessous pour modifier la corrélation <MathComponent math="\rho" /> boursière. Regardez comment l'hyperbole se déplace vers la gauche, permettant d'abaisser considérablement le risque global du portefeuille sans altérer la rentabilité.
        </p>

        {/* Panel de corrélation */}
        <div className="bg-slate-950 text-white p-5 rounded-3xl mb-8 shadow-inner border border-slate-800">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex justify-between">
            <span>Coefficient de corrélation (ρ_AB) : {rho.toFixed(2)}</span>
            <span className="text-indigo-400 font-mono">
              {rho < 0 ? "Corrélation négative (Diversification forte)" : rho === 1 ? "Corrélation parfaite (Zéro diversification)" : "Corrélation positive modérée"}
            </span>
          </label>
          <input 
            type="range" min="-1.00" max="1.00" step="0.05" value={rho} 
            onChange={(e) => setRho(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Tracé SVG de la frontière d'accumulation */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 450 350" className="w-full max-w-[420px] font-sans">
            {/* Grille Arrière plan */}
            <line x1="50" y1="320" x2="420" y2="320" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="320" stroke="#cbd5e1" strokeWidth="2" />

            {/* Droite CAL: Capital Allocation Line */}
            <line 
              x1={calX1} y1={calY1} 
              x2={calX2} y2={calY2} 
              stroke="#cbd5e1" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />
            {/* Droite CAL prolongée en couleur d'action */}
            <line 
              x1={calX1} y1={calY1} 
              x2={gxTang} y2={gyTang} 
              stroke="#ef4444" 
              strokeWidth="3" 
            />

            {/* Frontière de Markowitz */}
            <path 
              d={`M ${pointsFrontier.join(' L ')}`} 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="3" 
            />

            {/* Point de variance minimale MVP et Tangency */}
            <circle cx={minSigmaX} cy={minSigmaY} r="5" fill="#10b981" />
            <circle cx={gxTang} cy={gyTang} r="6" fill="#8b5cf6" stroke="white" strokeWidth="2" />

            {/* Point actif A et B individuels */}
            <circle cx={originX + sA * scaleX} cy={originY - rA * scaleY} r="5" fill="#f59e0b" />
            <circle cx={originX + sB * scaleX} cy={originY - rB * scaleY} r="5" fill="#3b82f6" />

            {/* Labels descriptifs */}
            <text x="360" y="342" className="text-xs fill-slate-500 font-bold">Risque Ecart-type σ</text>
            <text x="12" y="35" className="text-xs fill-slate-500 font-bold">Rendement E(R)</text>
            
            <text x={originX + sA * scaleX + 10} y={originY - rA * scaleY + 4} className="text-[10px] fill-amber-600 font-bold">Actif A (12%)</text>
            <text x={originX + sB * scaleX + 10} y={originY - rB * scaleY + 4} className="text-[10px] fill-blue-600 font-bold">Actif B (6%)</text>
            
            <text x={minSigmaX - 35} y={minSigmaY - 8} className="text-[10px] fill-emerald-600 font-bold">MVP (Min Var)</text>
            <text x={gxTang + 10} y={gyTang - 4} className="text-[10px] fill-violet-600 font-bold">Tangence T (Sharpe Max)</text>
            <text x="70" y="295" className="text-[9px] fill-rose-500 font-bold">Sans Risque rf (3%)</text>
          </svg>
        </div>

        {/* Détails Portefeuille Optimal */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">MVP Volatilité Minimale</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{(minSigma * 100).toFixed(2)} %</p>
          </div>
          <div className="bg-violet-50 dark:bg-violet-950/40 p-4 rounded-2xl border border-violet-100 dark:border-violet-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Exposition Actif A (w_A)</p>
            <p className="text-xl text-violet-700 dark:text-violet-300 mt-1">{(wTangency * 100).toFixed(1)} %</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Ratio de Sharpe Maximum</p>
            <p className="text-xl text-rose-700 dark:text-rose-300 mt-1">{sharpeTang.toFixed(3)}</p>
          </div>
        </div>
      </Section>

      <Section title="📐 Dérivation Mathématique des Portefeuilles d'Efficience" icon="Cpu" color="purple">
        <p className="mb-4">
          Trouver un portefeuille optimal sur la frontière se formule comme un programme d'optimisation quadratique sous contrainte linéaire de budget.
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">1. Résolution de variance minimale globale</h3>
        <p className="mb-4">
          L'investisseur veut avoir l'écart-type minimal absolu (le portefeuille de rebroussement hyperbole MVP) quel que soit le rendement. Pour deux actifs risqués, on dérive la variance <MathComponent math="\sigma_p^2" /> par rapport au poids <MathComponent math="w" /> et on la pose égale à 0 :
          <MathComponent block math="\frac{d \sigma_p^2}{dw} = 2w\sigma_A^2 - 2(1-w)\sigma_B^2 + 2(1-2w)\rho\sigma_A\sigma_B = 0" />
        </p>
        <p className="mb-4">
          La résolution isole immédiatement l'unique poids optimal de l'actif risqué A dans le MVP :
        </p>
        <FormulaBox 
          title="Poids de Variance Minimale MVP" 
          math="w^*_{\text{MVP}} = \frac{\sigma_B^2 - \rho \sigma_A \sigma_B}{\sigma_A^2 + \sigma_B^2 - 2 \rho \sigma_A \sigma_B}" 
        />

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">2. Frontière efficiente globale (N Actifs)</h3>
        <p className="mb-4">
          Pour optimiser un grand portefeuille à N actifs, on cherche à minimiser la variance globale multidimensionnelle stochastique, tout en exigeant un niveau cible de rentabilité espéré <MathComponent math="\mu_p" /> et en satisfaisant la contrainte résiduelle de budget. Le Lagrangien complet s'écrit de la façon suivante :
          <MathComponent block math="\mathcal{L}(w, \lambda_1, \lambda_2) = \frac{1}{2} w^T \Sigma w + \lambda_1 \cdot (\mu_p - w^T E(R)) + \lambda_2 \cdot (1 - w^T \mathbf{1})" />
        </p>
        <p className="mb-4">
          Les dérivées partielles par rapport aux vecteurs traduisent un système d'équations linéaires résoluble par algèbre matricielle binaire : 
          <MathComponent block math="\Sigma w^* - \lambda_1 E(R) - \lambda_2 \mathbf{1} = 0 \implies w^* = \Sigma^{-1} (\lambda_1 E(R) + \lambda_2 \mathbf{1})" />
        </p>
      </Section>

      <Section title="💎 Résolution d'Évaluation de Cas Pratiques" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice corrigé : Calcul du Portefeuille à Variance Minimale"
          question={<p>On associe deux actifs risqués de volatilités respectives {"$\\sigma_A = 20\\%$"} et {"$\\sigma_B = 10\\%$"}. Le coefficient de corrélation linéaire vaut {"$\\rho = -0.5$"}. Déterminer les répartitions budgétaires exactes {"$w_A$"}$ et {"$w_B$"}$ pour immuniser au mieux le portefeuille contre la variance.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser et convertir les données numériques</p>
              <p>On exprime les volatilités sous forme fractionnaire décimale :</p>
              <p><MathComponent math="\sigma_A = 0.20 \implies \sigma_A^2 = 0.04" /></p>
              <p><MathComponent math="\sigma_B = 0.10 \implies \sigma_B^2 = 0.01" /></p>
              <p>Et le terme de covariance croisé :</p>
              <p><MathComponent math="\rho \sigma_A \sigma_B = -0.5 \times 0.20 \times 0.10 = -0.01" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Appliquer la formule analytique du MVP</p>
              <p>Sujet à l'équation de Markowitz, le poids du bien risqué A vaut :</p>
              <p>{"$w_A = \\frac{0.01 - (-0.01)}{0.04 + 0.01 - 2(-0.01)} = \\frac{0.01 + 0.01}{0.05 + 0.02} = \\frac{0.02}{0.07} = \\frac{2}{7} \\approx 28.57\\%$"}</p>
              <p>De fait, l'actif B hérite du poids résiduel :</p>
              <p>{"$w_B = 1 - w_A = \\frac{5}{7} \\approx 71.43\\%$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Calculer la volatilité de variance minimale optimale</p>
              <p>On injecte ces poids pour obtenir l'écart-type final du portefeuille MVP :</p>
              <p><MathComponent block math="\sigma_p^2 = (2/7)^2 (0.04) + (5/7)^2 (0.01) + 2(2/7)(5/7)(-0.01) = \frac{0.16 + 0.25 - 0.20}{49} = \frac{0.21}{49} \approx 0.00428" /></p>
              <p>L'écart-type final de l'ensemble vaut : <MathComponent math="\sigma_p = \sqrt{0.00428} \approx 6.54\%" />.</p>
              <p>Notez la puissance mathématique de Markowitz : l'investisseur obtient un risque final de <strong>6.54%</strong> qui est largement inférieur au risque isolé des deux actifs pourtant valorisés indépendamment à 10% et 20% ! C'est le triomphe de la diversification boursière.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Mémorisation active" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Qu'est-ce qu'un portefeuille efficient selon Markowitz ?</>}
            back={<>Un portefeuille est dit efficient boursièrement s'il offre le rendement attendu le plus élevé possible pour un niveau de risque d'écart-type consenti fixé.</>}
          />
          <Flashcard 
            front={<>Quelle est la formule du ratio de Sharpe d'un portefeuille ?</>}
            back={<>C'est {"$S = \\frac{E(R_p) - r_f}{\\sigma_p}$"}, qui évalue la rentabilité excédentaire acquise par unité de risque prise par l'investisseur.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Qu'est-ce du point de vue quantitatif que le portefeuille de Tangence ?">
          Le portefeuille de tangence est le point optimal risqué unique de la frontière qui maximise de manière absolue le Ratio de Sharpe. En traçant une ligne droite reliant la rentabilité sans risque <MathComponent math="r_f" /> à la frontière (Capital Allocation Line - CAL), la plus forte pente admissible correspond exactement au profil tangent, constituant le choix de portefeuille idéal de tout investisseur.
        </Accordion>
        <Accordion title="2. Pourquoi le modèle CAPM / MEDAF s'appuie-t-il sur Markowitz ?">
          Harry Markowitz a jeté les bases du Modèle d'Évaluation des Actifs Financiers (MEDAF). Si tous les agents modélisent rationnellement le couple rendement-risque par sa méthode, ils détiennent tous le portefeuille tangent risqué comme portefeuille de marché global de référence. Le risque individuel d'un actif s'épure alors de sa volatilité spécifique pour n'être jugé que par sa sensibilité systématique (le coefficient Bêta).
        </Accordion>
        <Accordion title="3. Quelles sont les limites critiques de ce modèle à la monnaie ?">
          La théorie suppose que les rentabilités passées reflètent rigoureusement les distributions de probabilités futures de variance et espérance. En pratique, les corrélations boursières et les covariances d'actifs fluctuent et ont la fâcheuse propriété d'exploser vers 1 lors des crises mondiales systémiques, éliminant provisoirement l'effet de diversification au pire moment.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation boursière" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si la corrélation entre l'actif A et l'actif B vaut précisément r_AB = 1, quel est le poids d'exposition MVP de chaque actif permettant d'obtenir un risque nul ?",
              options: [
                "w = 0.5 (équipondéré)",
                "Il est impossible d'obtenir un risque nul avec une corrélation de un",
                "Cela dépend de la valeur du cours de l'or"
              ],
              correctAnswer: 1,
              explanation: "Une corrélation de 1 n'offre aucune diversification géométrique possible. La variance d'un portefeuille boursier d'un couple corrélé à 1 ne peut jamais descendre sous le risque de l'actif le moins volatil."
            },
            {
              question: "Quelle est la caractéristique géométrique du point initial de la Capital Allocation Line (CAL) ?",
              options: [
                "Abscisse nulle (risque nul) et ordonnée égale au taux d'intérêt sans risque rf",
                "Intersection avec l'ordonnée au niveau de rentabilité de marché",
                "Le point de tangence maximal"
              ],
              correctAnswer: 0,
              explanation: "La CAL représente l'allocation liant l'actif certain sans risque (écart-type constant de 0, rentabilité garantie rf) aux expositions risquées de frontière."
            },
            {
              question: "Qu'indique un ratio de Sharpe négatif pour un fonds financier ?",
              options: [
                "Que le fonds a un risque de faillite imminente",
                "Que son espérance de rendement est plus faible que le simple taux sans risque proposé par l'État",
                "Que son Bêta est strictement un"
              ],
              correctAnswer: 1,
              explanation: "Un ratio inférieur à zéro signale que l'investisseur prend un risque d'écart-type volatile inutile car son gain espéré brut est battu par la rémunération certaine de l'actif sans risque."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la formulation théorique d'espérance et variance matricielle de Markowitz.",
            "Je sais dériver analytiquement le portefeuille optimal de variance minimale MVP.",
            "Je maîtrise la recherche géo-mathématique du portefeuille tangent de Sharpe maximal.",
            "Je comprends l'influence du taux de corrélation linéaire boursier sur l'hyperbole."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Sup_Finance_Markowitz;
