import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, 
  Quiz, Flashcard, InteractiveExercise, FormulaBox, BentoGrid, BentoCard
} from '../../components/SharedUI';
import { Sliders, RefreshCw, Zap, TrendingUp, Cpu, Award } from 'lucide-react';

const PCAVisualizer: React.FC = () => {
  const [angle, setAngle] = useState<number>(-45);
  const [correlation, setCorrelation] = useState<number>(0.85);

  // Generate a fixed set of synthetic 2D points with specified correlation
  // Using a deterministic formula to avoid changing points on every render.
  const points = useMemo(() => {
    const rawData = [
      { u: -2.0, v: -1.2 },
      { u: -1.5, v: -0.7 },
      { u: -1.2, v: -1.1 },
      { u: -0.8, v: -0.4 },
      { u: -0.5, v: -0.9 },
      { u: -0.3, v: -0.1 },
      { u: -0.1, v: -0.3 },
      { u: 0.1, v: 0.2 },
      { u: 0.4, v: -0.1 },
      { u: 0.7, v: 0.5 },
      { u: 1.1, v: 0.8 },
      { u: 1.3, v: 0.6 },
      { u: 1.6, v: 1.4 },
      { u: 1.9, v: 1.1 },
      { u: 2.2, v: 1.8 }
    ];

    // Center of points is roughly (0,0)
    // Adjust correlation by blending v with u
    return rawData.map(pt => {
      const x = pt.u * 2.5;
      // When correlation is 1, y = x + noise. When 0, y is random noise
      const y = (pt.u * correlation + pt.v * (1 - Math.abs(correlation))) * 2.5;
      return { x, y };
    });
  }, [correlation]);

  // Convert angle in degrees to unit vector e_1 = (cos(theta), sin(theta))
  const rad = useMemo(() => (angle * Math.PI) / 180, [angle]);
  const cos = useMemo(() => Math.cos(rad), [rad]);
  const sin = useMemo(() => Math.sin(rad), [rad]);

  // Calculate coordinates of projections and the variance of the projections
  const projectionsInfo = useMemo(() => {
    let sumSq = 0;
    const projectedPoints = points.map(pt => {
      // Dot product: projCoord = x * cos + y * sin
      const projCoord = pt.x * cos + pt.y * sin;
      // 2D position of the projected point on the line
      const projX = projCoord * cos;
      const projY = projCoord * sin;
      sumSq += projCoord * projCoord;
      return { ptX: pt.x, ptY: pt.y, projX, projY, projCoord };
    });

    const variance = sumSq / points.length;
    return { projectedPoints, variance };
  }, [points, cos, sin]);

  // Ideal angle for PC1 (Principal Axis of maximum variance)
  // For positive correlation around 0.85, the maximum variance is along roughly ~38 degrees.
  const idealAngle = useMemo(() => {
    // Basic covariance analysis of simulated points
    let sXX = 0, sYY = 0, sXY = 0;
    points.forEach(pt => {
      sXX += pt.x * pt.x;
      sYY += pt.y * pt.y;
      sXY += pt.x * pt.y;
    });
    // Theta = 0.5 * atan2(2 * sXY, sXX - sYY)
    const optimalRad = 0.5 * Math.atan2(2 * sXY, sXX - sYY);
    let optimalAngle = (optimalRad * 180) / Math.PI;
    return Math.round(optimalAngle);
  }, [points]);

  const snapToPC1 = () => {
    setAngle(idealAngle);
  };

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Cpu className="text-indigo-600 animate-spin-slow" size={22} />
        Simulateur de Projection ACP : À la Recherche de la Variance Maximale
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Faites tourner l'axe de projection de la caméra linéaire et observez l'impact direct sur la variance des données projetées. Identifiez visuellement l'axe {"$PC_1$"} de l'ACP.
      </p>

      {/* Adjusters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-150 dark:border-slate-800">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><Sliders size={14} className="text-indigo-500" /> Angle de Projection ({"$\\theta$"}) :</span>
            <span className="font-mono text-indigo-600 font-bold">{angle}°</span>
          </div>
          <input 
            type="range" 
            min="-90" 
            max="90" 
            value={angle} 
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full tracking-wider cursor-col-resize accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
          />
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>Axe orthogonal (-90°)</span>
            <span>Axe orthogonal (+90°)</span>
          </div>
        </div>

        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-150 dark:border-slate-800">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-emerald-500" /> Corrélation des Données ({"$\\rho$"}) :</span>
            <span className="font-mono text-emerald-600 font-bold">{(correlation * 100).toFixed(0)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={(correlation * 100)} 
            onChange={(e) => setCorrelation(Number(e.target.value) / 100)}
            className="w-full tracking-wider cursor-col-resize accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
          />
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>Données sphériques (0%)</span>
            <span>Alignement strict (100%)</span>
          </div>
        </div>
      </div>

      {/* Main visualization grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* SVG Screen Left */}
        <div className="md:col-span-2 bg-slate-950 rounded-2xl p-4 flex items-center justify-center relative shadow-inner min-h-[320px]">
          <svg viewBox="-80 -80 160 160" className="w-full max-w-[340px] select-none">
            {/* Grid Lines */}
            <circle cx="0" cy="0" r="30" className="stroke-slate-800/60 fill-none stroke-dasharray-[2 2]" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="60" className="stroke-slate-800/60 fill-none stroke-dasharray-[2 2]" strokeWidth="0.5" />
            <line x1="-75" y1="0" x2="75" y2="0" className="stroke-slate-800" strokeWidth="0.5" />
            <line x1="0" y1="-75" x2="0" y2="75" className="stroke-slate-800" strokeWidth="0.5" />

            {/* Projection Line (rotating axis) */}
            <line 
              x1={-70 * cos} 
              y1={-70 * sin} 
              x2={70 * cos} 
              y2={70 * sin} 
              className="stroke-indigo-500" 
              strokeWidth="2.5" 
            />
            {/* Orthogonal projection line (PC2) */}
            <line 
              x1={-30 * -sin} 
              y1={-30 * cos} 
              x2={30 * -sin} 
              y2={30 * cos} 
              className="stroke-pink-500/40 fill-none stroke-dasharray-[3 3]" 
              strokeWidth="1" 
            />

            {/* Projection indicators & points */}
            {projectionsInfo.projectedPoints.map((item, idx) => (
              <g key={idx}>
                {/* Thin dashed projection line connecting raw point to projected axis */}
                <line 
                  x1={item.ptX} 
                  y1={item.ptY} 
                  x2={item.projX} 
                  y2={item.projY} 
                  className="stroke-slate-750 fill-none" 
                  strokeWidth="0.5" 
                />
                
                {/* Projected coordinates on the line */}
                <circle cx={item.projX} cy={item.projY} r="3" className="fill-indigo-400" />

                {/* Raw original high-dimensional points (represented as emerald dots) */}
                <circle cx={item.ptX} cy={item.ptY} r="4.5" className="fill-emerald-400 transition-all filter drop-shadow-[0_0_2px_rgba(52,211,153,0.5)]" />
              </g>
            ))}

            {/* Legend indicators */}
            <text x="-70" y="-68" className="fill-slate-500 font-mono text-[5px]">X : Dimension original 1</text>
            <text x="-70" y="-62" className="fill-slate-500 font-mono text-[5px]">Y : Dimension original 2</text>
          </svg>

          {/* Quick HUD Overlay */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-slate-800 rounded-lg text-[9px] font-mono text-slate-300">
            <span className="text-emerald-400 font-bold">●</span> Espace Brut (2D)<br />
            <span className="text-indigo-400 font-bold">●</span> Espace Projeté (PC1)
          </div>
        </div>

        {/* Analytics on Right */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-4 flex-1">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Zap size={14} className="text-amber-500 animate-bounce" /> Variance Projetée
            </div>

            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">Variance empirique (PC1)</span>
              <span className="text-3xl font-bold font-mono text-indigo-600 block my-1">
                {projectionsInfo.variance.toFixed(2)}
              </span>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (projectionsInfo.variance / 15) * 100)}%` }}
                />
              </div>
            </div>

            {/* Comparative info */}
            <div className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed space-y-1 bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-950">
              <p>📍 L'objectif de l'ACP est de maximiser cette variance.</p>
              <p>📍 Angle idéal calculé d'après les valeurs propres : <strong className="text-indigo-600 font-mono">{idealAngle}°</strong>.</p>
            </div>
          </div>

          <button 
            onClick={snapToPC1}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow transition-all ${
              Math.abs(angle - idealAngle) < 2 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:-translate-y-0.5'
            }`}
          >
            {Math.abs(angle - idealAngle) < 2 ? (
              <>
                <Award size={16} /> Axe de Variance Optimale ✓
              </>
            ) : (
              <>
                <RefreshCw size={14} className="animate-spin-slow" /> Snap vers PC1 (Max Var)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Course_Post_Bac_26_ACP: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-PCA"
        title="Analyse en Composantes Principales (ACP)"
        subtitle="Réduction de dimensionnalité, algèbre linéaire numérique, matrices de covariance et réduction orthogonale."
        duration="1h 05"
      />

      <InfoBlock type="info" title="L'importance de l'ACP en Data Science & IA">
        L'Analyse en Composantes Principales (ACP) est la méthode d'apprentissage non supervisé la plus emblématique. Face à des ensembles de données contenant des centaines de variables (ex: génétique, imagerie médicale, signaux boursiers), l'algorithme réduit la dimensionnalité tout en conservant le maximum d'information (variance). Elle repose sur une formulation mathématique extrêmement élégante reliant l'analyse de données à l'évaluation spectrale des matrices.
      </InfoBlock>

      <Section title="1. Formulation Vectorielle et Variance" icon="📊" color="slate">
        <p className="mb-4">
          Soit un échantillon de {"$N$"} individus décrits par {"$P$"} variables numériques, structuré dans une matrice globale {"$\\mathbf{X} \\in \\mathcal{M}_{N,P}(\\mathbb{R})$"}. Avant toute chose, pour éviter que l'échelle des variables ne biaise l'analyse, on procède à deux transformations cruciales :
        </p>

        <BentoGrid>
          <BentoCard title="1. Centrage" icon={<Sliders className="text-indigo-600" size={18} />} color="indigo">
            On soustrait la moyenne empirique de chaque variable. La moyenne de chaque colonne de la matrice de données devient rigoureusement égale à 0.
            <div className="bg-white dark:bg-slate-950 p-2 border border-indigo-100 rounded-lg text-center font-mono my-2 text-indigo-700">
              {"$\\mathbf{X}_{centré} = \\mathbf{X} - \\mathbf{\\mu}$"}
            </div>
          </BentoCard>

          <BentoCard title="2. Réduction" icon={<TrendingUp className="text-emerald-600" size={18} />} color="emerald">
            On divise chaque variable par son écart-type. Cela ramène la variance de chaque axe d'étude à 1. On parle alors d'une ACP normée.
            <div className="bg-white dark:bg-slate-950 p-2 border border-emerald-100 rounded-lg text-center font-mono my-2 text-emerald-700">
              {"$\\mathbf{x}^* = \\frac{\\mathbf{x} - \\bar{\\mathbf{x}}}{\\sigma_x}$"}
            </div>
          </BentoCard>

          <BentoCard title="3. But Linéaire" icon={<Cpu className="text-amber-600" size={18} />} color="amber">
            Trouver un nouvel ensemble d'axes (les composantes principales) orthogonaux entre eux, le long desquels la dispersion (la variance) est maximale.
          </BentoCard>
        </BentoGrid>

        <TipBanner type="info" title="La dualité de la projection">
          En mathématiques, projeter des points sur un axe de façon à <strong>maximiser la variance de la projection</strong> revient exactement au même problème géométrique que de <strong>minimiser la somme des carrés des distances de projection</strong> (l'erreur de reconstruction résiduelle). Tout cela s'exprime et se résout élégamment par le théorème spectral !
        </TipBanner>
      </Section>

      <Section title="2. La Matrice de Covariance et Diagonalisation" icon="⚡" color="indigo">
        <p className="mb-4">
          Lorsque les données de la matrice {"$\\mathbf{X}$"} sont centrées, la structure des corrélations mutuelles est contenue dans la <strong>matrice de variance-covariance empirique</strong>, notée {"$\\mathbf{\\Sigma}$"} ou {"$\\mathbf{V}$"}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <FormulaBox 
            title="Matrice de Covariance" 
            math={"\\mathbf{\\Sigma} = \\frac{1}{N} \\mathbf{X}^T \\mathbf{X}"} 
          />
          <FormulaBox 
            title="Équation aux Valeurs Propres" 
            math={"\\mathbf{\\Sigma} \\mathbf{v} = \\lambda \\mathbf{v}"} 
          />
        </div>

        <InfoBlock type="definition" title="Théorème Spectral & Propriétés Spectrales">
          La matrice de covariance {"$\\mathbf{\\Sigma}$"} est, par construction physique, une matrice <strong>symétrique réelle et semi-définie positive</strong> :
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Toutes ses valeurs propres {"$\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_p \\ge 0$"} sont des nombres réels positifs ou nuls.</li>
            <li>Ses vecteurs propres associés {"$\\mathbf{v}_k$"} forment une base orthonormale de {"$\\mathbb{R}^P$"} (les axes principaux).</li>
            <li>La valeur propre {"$\\lambda_k$"} représente exactement l'intensité de la <strong>variance conservée</strong> le long de la composante principale {"$PC_k$"}.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="3. Visualisation Interactive de la Projection" icon="🎮" color="indigo">
        <PCAVisualizer />
      </Section>

      <Section title="🧠 Flashcards : Compléments d&apos;Analyse de Données" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Maîtrisez les concepts de projection linéaire et d&apos;inertie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Pourquoi doit-on généralement centrer et réduire (standardiser) les données avant une ACP ?</>}
            back={<>Pour éviter que les variables ayant des <strong>unités d&apos;échelle plus grandes</strong> n&apos;écrasent artificiellement les autres et ne dictent à elles seules la direction des axes principaux.</>}
          />
          <Flashcard 
            front={<>À quoi correspond géométriquement la première composante principale PC1 ?</>}
            back={<>C&apos;est la direction d&apos;ellipse qui possède le <strong>maximum de dispersion (variance)</strong>. Elle est portée par le vecteur propre associé à la plus grande valeur propre {"$\\lambda_1$"}.</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice de Diagonalisation et d&apos;Inertie" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice Corrigé : Taux d'inertie expliquée"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>On applique une ACP sur une matrice de covariance à 3 dimensions. Après diagonalisation, on trouve trois valeurs propres distinctes :</p>
              {"$$\\lambda_1 = 4.2 \\quad ; \\quad \\lambda_2 = 1.3 \\quad ; \\quad \\lambda_3 = 0.5$$"}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <strong>Questions :</strong>
                <ol className="list-decimal pl-5 mt-1 space-y-1 font-mono text-xs">
                  <li>Quelle est la variance totale (inertie totale) de l'échantillon de données ?</li>
                  <li>Quel pourcentage de l'information (inertie de projection) conserve-t-on si on ne projette plus les données que sur le seul axe principal PC1 ?</li>
                </ol>
              </div>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Calculer l'inertie totale</p>
              <p>L'inertie totale (ou variance globale) est égale à la somme des variances individuelles de chaque dimension, ce qui correspond mathématiquement à la trace de la matrice de covariance, ou encore la somme de l'ensemble de ses valeurs propres :</p>
              {"$$I_{totale} = \\sum_{k=1}^{3} \\lambda_k = 4.2 + 1.3 + 0.5 = 6.0$$"}
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Calculer le taux d'inertie de la composante PC1</p>
              <p>Le ratio de l'information préservée par le premier axe principal {"$PC_1$"} s'écrit de manière absolue :</p>
              {"$$Ratio = \\frac{\\lambda_1}{I_{totale}} = \\frac{4.2}{6.0} = 0.70 = 70\\%$$"}
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-100 text-xs">
              <p>Solution finale : En réduisant nos données de 3 dimensions à seulement 1 dimension (l'axe principal {"$PC_1$"} optimal), on réussit à capturer 70% de l'information totale ! C'est ce taux d'inertie cumulée qui nous aide à juger de la pertinence de la projection linéaire.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Épreuve de Certification" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la relation entre le vecteur propre d'une matrice de covariance et l'axe de projection de la composante principale correspondante ?",
              options: [
                "Ils n'ont aucun rapport linéaire formel",
                "Le vecteur propre donne les coefficients (loadings) pour tracer la combinaison linéaire définissant l'axe principal",
                "Le vecteur propre est égal au vecteur moyenne de l'échantillon"
              ],
              correctAnswer: 1,
              explanation: "Les composantes principales du système sont calculées en effectuant la projection des données initiales sur les vecteurs propres de leur matrice de covariance. Les valeurs des éléments du vecteur propre donnent la pondération de chaque variable d'origine."
            },
            {
              question: "Si la somme de toutes les valeurs propres de notre matrice de covariance vaut 10, et que le premier axe principal possède une valeur propre de 7.5. Quelle conjecture faites-vous ?",
              options: [
                "L'axe PC1 explique 75% de la variance totale de notre système",
                "L'axe PC1 explique 10% de la variance de notre système",
                "La covariance entre PC1 et PC2 est égale à 7.5"
              ],
              correctAnswer: 0,
              explanation: "Le taux d'inertie expliquée de PC1 se calcule comme lambda_1 divisée par la somme globale locale de l'ensemble des valeurs propres (7.5 / 10 = 75%)."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Connaître l'utilité du centrage et de la réduction des variables de données.",
            "Comprendre pourquoi la matrice de covariance est symétrique réelle et diagonalisable.",
            "Savoir calculer le taux d'inertie cumulée expliqué par les premières composantes.",
            "Interpréter géométriquement les projections spectrales de variables corrélées."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_26_ACP;
