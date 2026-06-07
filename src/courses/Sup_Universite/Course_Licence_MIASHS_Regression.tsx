import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, HelpCircle, Activity, Play } from 'lucide-react';

const Course_Licence_MIASHS_Regression: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator state: user chooses slope and intercept
  const [slope, setSlope] = useState<number>(1.2);
  const [intercept, setIntercept] = useState<number>(40);

  // Rigid dataset for coordinate regression fitting
  // Real relation: roughly y = 1.6 * x + 30
  const dataPoints = [
    { x: 30, y: 70 },
    { x: 70, y: 155 },
    { x: 110, y: 190 },
    { x: 160, y: 310 },
    { x: 220, y: 360 }
  ];

  // Mathematical OLS values for "Auto Fit"
  // Let's compute them manually beforehand
  // Mean X: 118, Mean Y: 217
  // Covariance(X,Y) = 8780, Variance(X) = 5216
  // => Optimal slope = 1.68, Optimal intercept = 217 - 1.68 * 118 = 18.76
  const handleAutoFit = () => {
    setSlope(1.68);
    setIntercept(18.76);
  };

  // Compute Sum of Squared Residuals (SSR)
  const computeSSR = () => {
    let sum = 0;
    dataPoints.forEach((pt) => {
      const predY = slope * pt.x + intercept;
      const res = pt.y - predY;
      sum += res * res;
    });
    return Math.round(sum);
  };

  const ssr = computeSSR();

  // SVG dimensions
  const width = 300;
  const height = 300;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-LIC-MIASHS"
        title="Licence MIASHS : Régression Linéaire Multiple"
        subtitle="Modélisation économétrique exhaustive, moindres carrés ordinaires (MCO), équation normale, et théorème de Gauss-Markov."
        duration="1h 40"
        level="Licence MIASHS (L2/L3)"
        prerequisites={["Algèbre linéaire (inversion matricielle)", "Analyse multivariable (différentielles, gradient)", "Probabilités d'estimation"]}
        objectives={[
          "Formuler un modèle de régression linéaire sous forme matricielle canonique.",
          "Estimer analytiquement les coefficients par la méthode fondamentale des moindres carrés ordinaires.",
          "Comprendre les hypothèses fondamentales nécessaires sous le Théorème de Gauss-Markov.",
          "Analyser l'utilité du coefficient de détermination R² d'adéquation globale."
        ]}
      />

      <Section title="📈 Modélisation de la Régression et Moindres Carrés" icon="📊" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La licence MIASHS lie l'analyse statistique à l'expérimentation réelle. La <strong>Régression Linéaire</strong> sert à modéliser la dépendance d'une variable quantitative à expliquer (variable endogène) par rapport à d'autres variables explicatives (exogènes).
        </p>

        <InfoBlock type="definition" title="Équation de Régression Matrix">
          Soit <MathComponent math="Y" /> le vecteur des observations réelles. On exprime le modèle sous forme matricielle :
          <MathComponent block math="Y = X \beta + \varepsilon" />
          Où :
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li><MathComponent math="Y \in \mathbb{R}^n" /> est le vecteur colonne des observations à expliquer.</li>
            <li><MathComponent math="X \in \mathcal{M}_{n, p+1}(\mathbb{R})" /> est la matrice des variables explicatives complétée d'une colonne de <MathComponent math="1" /> pour représenter la constante (l'intercept).</li>
            <li><MathComponent math="\beta \in \mathbb{R}^{p+1}" /> est le vecteur des paramètres inconnus à estimer.</li>
            <li><MathComponent math="\varepsilon \in \mathbb{R}^n" /> représente le vecteur d'aléa ou de résidu d'erreur.</li>
          </ul>
        </InfoBlock>

        <InfoBlock type="definition" title="Estimateur MCO (Moindres Carrés Ordinaires)">
          Le critère d'estimation consiste à minimiser la somme des carrés des résidus (SSR). En annulant le gradient par rapport à <MathComponent math="\beta" />, on obtient l'<strong>équation normale</strong> :
          <MathComponent block math="(X^T X)\hat{\beta} = X^T Y" />
          Si la matrice d'information <MathComponent math="X^T X" /> est inversible (absence complète de colrupture/multicolinéarité), l'estimateur unique s'écrit :
          <MathComponent block math="\hat{\beta} = (X^T X)^{-1} X^T Y" />
        </InfoBlock>
      </Section>

      <Section title="⚖️ Théorème de Gauss-Markov et Variance de l'Estimateur" icon="🎯" color="emerald">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          L'estimateur des moindres carrés offre d'excellentes caractéristiques mathématiques si certaines hypothèses stochastiques d'erreurs d'observation sont réunies.
        </p>

        <TipBanner type="info" title="Hypothèses fondamentales de Gauss-Markov">
          L'aléa résiduel <MathComponent math="\varepsilon" /> doit suivre des lois équitables :
          <ul className="list-decimal pl-6 mt-2 space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <li><strong>Espérance nulle :</strong> (Pas d'erreur systématique) <MathComponent math="E(\varepsilon) = 0" /></li>
            <li><strong>Homoscédasticité :</strong> (Variance identique) <MathComponent math="Var(\varepsilon) = \sigma^2 I_n" /></li>
            <li><strong>Absence d'auto-corrélation :</strong> <MathComponent math="Cov(\varepsilon_i, \varepsilon_j) = 0 \ \forall i \ne j" /></li>
          </ul>
        </TipBanner>

        <InfoBlock type="definition" title="Théorème BLUE (Gauss-Markov)">
          Sous ces hypothèses de base, l'estimateur MCO <MathComponent math="\hat{\beta}" /> est le <strong>meilleur estimateur linéaire sans biais</strong> (BLUE - Best Linear Unbiased Estimator). C'est-à-dire qu'il possède la variance minimale absolue parmi l'ensemble des estimateurs linéaires et non-biaisés.
        </InfoBlock>
      </Section>

      <Section title="🎮 Simulateur Interactif de Moindres Carrés et SSR" icon="🎮" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Prenez le rôle du solveur analytique MCO ! Manipulez la **pente** de la droite et son **intercept** (ordonnée à l'origine) pour l'ajuster manuellement au nuage de points de données statistiques réels (marqués en bleu). Observez le tracé des distances verticales résiduelles (traits pointillés roses) et cherchez à **minimiser au maximum** la somme des carrés des erreurs (**SSR**).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800-strong shadow-sm">
          {/* Controls details */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Pente de la droite : <MathComponent math="\beta_1" /></span>
                <span className="text-primary font-bold">{slope}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.05"
                value={slope}
                onChange={(e) => setSlope(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Intercept : <MathComponent math="\beta_0" /></span>
                <span className="text-emerald-500 font-bold">{intercept}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={intercept}
                onChange={(e) => setIntercept(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">Somme des Carrés Résiduels (SSR) :</span>
              <span className="font-mono text-lg font-extrabold text-primary">{ssr}</span>
            </div>

            <button
              onClick={handleAutoFit}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Calculer la Régression Optimale (MCO)
            </button>
          </div>

          {/* Interactive Plot */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={width} height={height} className="overflow-visible select-none">
                {/* Horizontal reference grid */}
                <line x1={0} y1={height - 50} x2={width} y2={height - 50} stroke="#cbd5e1" strokeDasharray="3,3" />
                <line x1={50} y1={0} x2={50} y2={height} stroke="#cbd5e1" strokeDasharray="3,3" />

                {/* Plot prediction line */}
                {/* Visual coordinate mapping: Y_svg = height - Y_math */}
                {/* X ranges from 0 to 250 */}
                {(() => {
                  const pt1X = 10;
                  const pt1Y = height - (slope * pt1X + intercept);
                  const pt2X = 280;
                  const pt2Y = height - (slope * pt2X + intercept);
                  return (
                    <line
                      x1={pt1X}
                      y1={pt1Y}
                      x2={pt2X}
                      y2={pt2Y}
                      stroke="#4f46e5"
                      strokeWidth="3"
                    />
                  );
                })()}

                {/* Plot Residual Lines */}
                {dataPoints.map((pt, idx) => {
                  const predYMat = slope * pt.x + intercept;
                  const predYSvg = height - predYMat;
                  const ptYSvg = height - pt.y;
                  return (
                    <line
                      key={idx}
                      x1={pt.x}
                      y1={ptYSvg}
                      x2={pt.x}
                      y2={predYSvg}
                      stroke="#ec4899"
                      strokeWidth="1.5"
                      strokeDasharray="3,2"
                    />
                  );
                })}

                {/* Plot Data points */}
                {dataPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={height - pt.y}
                    r={6}
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Legend labels */}
                <text x={width - 40} y={height - 55} fontSize="9" fill="#94a3b8" fontWeight="bold">X</text>
                <text x={60} y={15} fontSize="9" fill="#94a3b8" fontWeight="bold">Y</text>
              </svg>
            </div>
            <p className="mt-2 text-xs text-muted-text italic text-slate-500 text-center">
              Droite d'ajustement modélisée : Y = {slope} * X + {intercept}
            </p>
          </div>
        </div>
      </Section>

      <Section title="⚡ Qualité d'Ajustement et R²" icon="⚡" color="amber">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Comment mesurer la proportion d'information captée par notre droite de régression ? On décompose la variance totale :
        </p>

        <InfoBlock type="definition" title="Le coefficient de détermination R²">
          Soit la somme totale des carrés (SST) et la somme expliquée par la régression (SSE) :
          <MathComponent block math="R^2 = \frac{SSE}{SST} = 1 - \frac{SSR}{SST}" />
          Le R² vaut entre <MathComponent math="0" /> et <MathComponent math="1" />. Plus il est proche de 1, plus la variance observée est expliquée par le modèle unitaire développé.
        </InfoBlock>
      </Section>

      <Section title="✏️ Résolution Mathématique Résolue" icon="✏️" color="indigo">
        <InteractiveExercise
          title="Exercice 1 : Calcul analytique d'une pente 2D"
          question={<p>Soit 3 points d'observations d'une régression simple : A(1, 2), B(2, 4) et C(4, 5). Calculer analytiquement les paramètres optimaux d'intercept {"$\\hat{\\beta}_0$"} et de pente {"$\\hat{\\beta}_1$"} en résolvant manuellement le critère analytique.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 1 : Calculer les moyennes empiriques</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Calculons la moyenne de la coordonnée X et celle de Y :
                <br />
                <MathComponent block math="\bar{X} = \frac{1 + 2 + 4}{3} = \frac{7}{3} \approx 2.33" />
                <MathComponent block math="\bar{Y} = \frac{2 + 4 + 5}{3} = \frac{11}{3} \approx 3.67" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Calculer la covariance et la variance d'explication</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                La covariance empirique Cov(X, Y) et la variance Var(X) s'écrivent :
                <br />
                <MathComponent block math="Cov(X, Y) = \frac{1}{3}\sum (X_i - \bar{X})(Y_i - \bar{Y}) = \frac{1}{3}(1\times 2 + 2\times 4 + 4\times 5) - \bar{X}\bar{Y} = 10 - \frac{77}{9} = \frac{13}{9}" />
                <MathComponent block math="Var(X) = \frac{1}{3}(1^2 + 2^2 + 4^2) - \bar{X}^2 = 7 - \frac{49}{9} = \frac{14}{9}" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Détermination des coefficients optimaux</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
                La pente de l'estimateur s'obtient par rapport aux moindres carrés ordinaires simples :
                <MathComponent block math="\hat{\beta}_1 = \frac{Cov(X, Y)}{Var(X)} = \frac{13/9}{14/9} = \frac{13}{14} \approx 0.93" />
                L'ordonnée à l'origine en découle directement via le point moyen :
                <MathComponent block math="\hat{\beta}_0 = \bar{Y} - \hat{\beta}_1 \bar{X} = \frac{11}{3} - \frac{13}{14} \times \frac{7}{3} = \frac{11}{3} - \frac{13}{6} = \frac{9}{6} = 1.5" />
                L'équation optimale de la droite de régression unitaire d'ajustement est donc :
                <MathComponent block math="Y = 0.93 X + 1.5" />
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Diagnostic Statistique" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Qu'est-ce que l'endogénéité dans un modèle de régression ?"
            back="C'est le biais produit si une variable statistique explicative est corrélée avec la perturbation d'erreur e. Cela invalide l'estimation BLUE classique."
          />
          <Flashcard 
            front="Quelle est l'interprétation géométrique du Hat Matrix H ?"
            back="La matrice de projection orthogonale H projette orthogonalement le vecteur Y des observations complexes réelles dans l'espace formé par les vecteurs explicatifs de X."
          />
          <Flashcard 
            front="La multicolinéarité empêche-t-elle l'estimation ?"
            back="Oui, si deux variables explicatives sont parfaitement corrélées, le rang de la matrice XᵀX chute, rendant l'inversion de la matrice d'information impossible."
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les résidus d'erreurs ont-ils une somme toujours nulle ?",
              answer: "Par construction pure de l'algorithme d'estimation. Annuler la première dérivée par rapport à l'ordonnée à l'origine force la somme arithmétique globale de l'aléa estimé à s'annuler théoriquement : Σ(Y_est - Y_reel) = 0."
            },
            {
              question: "Quelle est la différence fondamentale entre homoscédasticité et hétéroscédasticité ?",
              answer: "L'homoscédasticité signale une variance d'erreur constante. Si l'amplitude du résidu d'erreur augmente corrélativement avec la croissance d'une variable explicative (hétéroscédasticité), on doit appliquer les moindres carrés généralisés (WLS)."
            },
            {
              question: "Qu'est-ce que le test statistique de Student d'un coefficient ?",
              answer: "Il évalue l'hypothèse nulle H0 que la valeur réelle du paramètre β_i est nulle. Si la p-value associée est très restreinte, on conclut que la variable explicative a un impact statistiquement significatif sur le modèle."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation Finale" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle méthode matricielle est utilisée pour inverser numériquement et estimer b = (XᵀX)⁻¹ Xᵀ Y dans la réalité ?",
              options: [
                "L'inversion asymptotique de Levenberg-Marquardt",
                "La décomposition QR ou la décomposition en valeurs singulières (SVD)",
                "La transformation analytique unitaire de Fourier"
              ],
              correctAnswer: 1,
              explanation: "Inverser de manière classique XᵀX est numériquement instable en présence de bruit. On préfère la décomposition QR de la matrice d'explication pour garantir une précision absolue."
            },
            {
              question: "Si le coefficient de détermination R² d'un ajustement linéaire vaut zéro, que peut-on en déduire ?",
              options: [
                "L'explication est parfaite, l'erreur est de variance nulle",
                "Le modèle n'explique absolument rien de la variance totale, la moyenne est un meilleur estimateur",
                "Il y a un biais d'héro-scédasticité complexe"
              ],
              correctAnswer: 1,
              explanation: "Un R² nul caractérise l'absence complète de l'influence de la variable explicative, la prédiction linéaire se réduisant à tracer la constante moyenne globale Y_mean."
            },
            {
              question: "Quel est l'impact de l'omission d'une variable explicative importante corrélée aux autres ?",
              options: [
                "Il n'y a aucun impact, le théorème de Gauss-Markov assure le reste",
                "Cela introduit un biais de sélection et d'endogénéité qui rend les estimateurs restants biaisés",
                "La variance de l'aléa résiduel devient nulle"
              ],
              correctAnswer: 1,
              explanation: "À cause de la corrélation, la composante de la variable oubliée est capturée par la variable restant dans le modèle, rendant son estimateur biaisé et non consistant."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais poser l'équation matricielle complète de la régression linéaire générale.",
            "Je sais démontrer et résoudre l'équation normale des moindres carrés ordinaires.",
            "Je comprends les hypothèses de Gauss-Markov permettant l'obtention de l'estimateur BLUE.",
            "Je sais exploiter et analyser l'indice d'ajustement global R²."
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

export default Course_Licence_MIASHS_Regression;
