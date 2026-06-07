import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Industriel_01_MSP: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // State for Interactive Application
  const [targetMean, setTargetMean] = useState(20.0);
  const [sigma, setSigma] = useState(0.03);
  const [itWidth, setItWidth] = useState(0.30); // TS - TI
  const [sampleSize, setSampleSize] = useState(5);
  const [drift, setDrift] = useState(0.0); // Simulated process drift

  // Calculations
  const ts = targetMean + itWidth / 2;
  const ti = targetMean - itWidth / 2;
  const standardError = sigma / Math.sqrt(sampleSize);
  
  const lsc = targetMean + 3 * standardError;
  const lic = targetMean - 3 * standardError;
  const lsa = targetMean + 2 * standardError;
  const lia = targetMean - 2 * standardError;

  // Capability indices
  const currentMean = targetMean + drift;
  const cp = itWidth / (6 * sigma);
  const cpk = Math.min((ts - currentMean) / (3 * sigma), (currentMean - ti) / (3 * sigma));

  // Simulated control points (10 samples)
  const basePoints = [0.1, -0.4, 0.8, -0.2, 0.3, 1.2, 0.1, -0.9, 0.5, -0.1];
  const points = basePoints.map((val, idx) => {
    // Add cumulative drift for later points to show trend
    const pointDrift = drift * (idx / 9);
    const value = targetMean + pointDrift + val * standardError;
    return value;
  });

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-IND-01"
        title="Maîtrise Statistique des Procédés (MSP)"
        subtitle="Modélisation statistique de la variabilité industrielle, cartes de contrôle de Shewhart et indicateurs de capabilité de procédé."
        duration="1h 20"
        level="BUT 2ème année (GIM / GMP / QLIO)"
        prerequisites={[
          "Loi Normale (Théorème Central Limite)",
          "Formules de moyenne et écart-type d'échantillonnage"
        ]}
        objectives={[
          "Distinguer la variabilité commune de la variabilité spéciale par l'analyse statistique.",
          "Calculer et tarer les limites de contrôle et de surveillance d'une carte de Shewhart.",
          "Maîtriser les indices de capabilité machine et de capabilité de procédé (Cp et Cpk).",
          "Interpréter les dérives de processus sur une ligne de production autonome."
        ]}
      />

      <Section title="⚙️ Introduction & Enjeux de la MSP" icon="🛠️" color="indigo">
        <p className="mb-4">
          Dans l'industrie manufacturière de haute précision, il est impossible de fabriquer deux pièces rigoureusement identiques. L'usure des outils, le jeu mécanique, les changements thermiques et la disparité des matières premières induisent de légères fluctuations de dimensions.
        </p>

        <InfoBlock type="definition" title="Le Concept Fondateur : Variabilité">
          La <strong>variabilité</strong> d'un procédé industriel se structure en deux sous-ensembles :
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <strong>Causes Communes (Aléatoires) :</strong> Fluctuation naturelle et stable. Modélisée mathématiquement par un bruit gaussien stationnaire d'écart-type <MathComponent math="\sigma" />. Le procédé est dit "sous contrôle statistique".
            </li>
            <li>
              <strong>Causes Spéciales (Systématiques) :</strong> Fluctuation singulière et anormale (dérive thermique, bris d'outil, réglage défaillant). Elle modifie brusquement la moyenne ou détériore gravement l'écart-type.
            </li>
          </ul>
        </InfoBlock>

        <p className="mt-4">
          Le rôle de la <strong>MSP (ou SPC : Statistical Process Control)</strong> est de détecter l'émergence d'une cause spéciale <em>avant</em> de produire des rebuts hors tolérances, en mesurant périodiquement de petits échantillons aléatoires de taille <MathComponent math="n" />.
        </p>

        <TipBanner type="info" title="Loi Théorique d'Échantillonnage">
          D'après le <strong>Théorème Central Limite (TCL)</strong>, quelle que soit la loi de la population mère de moyenne <MathComponent math="\mu" /> et d'écart-type <MathComponent math="\sigma" />, la moyenne d'un échantillon de taille <MathComponent math="n" /> suit une loi normale d'écart-type résiduel :
          <FormulaBox math="\sigma_{\bar{X}} = \frac{\sigma}{\sqrt{n}}" />
        </TipBanner>
      </Section>

      <Section title="📈 Cartes de Contrôle de Shewhart" icon="📈" color="emerald">
        <p className="mb-4">
          La <strong>carte de contrôle à la moyenne (<MathComponent math="\bar{X}" />)</strong> permet de suivre l'évolution centripète globale de la production. Elle dispose de 3 droites horizontales de référence et de deux paires de limites d'alarme :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Limites de Contrôle (LSC / LIC)
            </h4>
            <p className="text-sm text-muted-text mb-4">
              Fixées à l'intervalle bilatéral de tolérance statistique à 99,73% (intervalle à <MathComponent math="\pm 3\sigma" />). Si un point franchit ces limites, le procédé est arrêté immédiatement.
            </p>
            <FormulaBox title="Seuils d'arrêt" math="\text{LIC} = \mu - 3\frac{\sigma}{\sqrt{n}} \quad ; \quad \text{LSC} = \mu + 3\frac{\sigma}{\sqrt{n}}" />
          </div>

          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Limites de Surveillance (LSA / LIA)
            </h4>
            <p className="text-sm text-muted-text mb-4">
              Fixées à l'intervalle d'avertissement de tolérance statistique à 95,44% (intervalle à <MathComponent math="\pm 2\sigma" />). Alerte préventive pour l'ajusteur.
            </p>
            <FormulaBox title="Seuils d'alerte" math="\text{LIA} = \mu - 2\frac{\sigma}{\sqrt{n}} \quad ; \quad \text{LSA} = \mu + 2\frac{\sigma}{\sqrt{n}}" />
          </div>
        </div>

        <InfoBlock type="warning" title="Anti-Piège classique de Partiel">
          <strong>Attention :</strong> Ne confondez jamais les limites de contrôle statistique d'Shewhart (LSC/LIC) et les limites de tolérances exigées par le client (TSI/TII). 
          <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
            <li>Les tolérances du client s'appliquent aux <strong>pièces individuelles</strong>.</li>
            <li>Les limites de Shewhart s'appliquent à la <strong>moyenne des échantillons de taille <MathComponent math="n" /></strong>.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="🎛️ Application Interactive & Simulateur de Dérive" icon="🎮" color="purple">
        <p className="mb-6">
          Manipulez les curseurs industriels pour observer le comportement d'une carte de contrôle en temps réel. Ajustez le curseur <strong>"Dérive progressive"</strong> pour simuler l'usure d'un outil d'usinage et voir comment les moyennes d'échantillons sortent de la zone de contrôle spécifiée.
        </p>

        {/* Dynamic Sandbox UI */}
        <div className="bg-muted/50 dark:bg-slate-900 border border-border rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
              🔧 Paramètres Ligne
            </h4>

            {/* Target Mean */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Cible (<MathComponent math="\mu" />) :</span>
                <span className="font-mono text-indigo-600">{targetMean.toFixed(2)} mm</span>
              </label>
              <input 
                aria-label="Cible de la moyenne"
                type="range" min="19.9" max="20.1" step="0.02" 
                value={targetMean} onChange={(e) => setTargetMean(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Sigma */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Dispersion (<MathComponent math="\sigma" />) :</span>
                <span className="font-mono text-indigo-600">{sigma.toFixed(3)} mm</span>
              </label>
              <input 
                aria-label="Dispersion sigma"
                type="range" min="0.015" max="0.06" step="0.005" 
                value={sigma} onChange={(e) => setSigma(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* IT Width */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>IT Client (<MathComponent math="\text{TS} - \text{TI}" />) :</span>
                <span className="font-mono text-indigo-600">{itWidth.toFixed(2)} mm</span>
              </label>
              <input 
                aria-label="Intervalle de tolérance client"
                type="range" min="0.16" max="0.40" step="0.02" 
                value={itWidth} onChange={(e) => setItWidth(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Sample size */}
            <div>
              <span className="text-sm font-semibold block mb-2">Taille échantillon (n) :</span>
              <div className="flex gap-2">
                {[4, 5, 9, 16].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSampleSize(num)}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-xs ${sampleSize === num ? 'bg-indigo-600 text-white' : 'bg-card border hover:bg-slate-100 text-slate-600'}`}
                  >
                    n = {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated tool wear (drift) */}
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50">
              <label className="text-sm font-bold text-amber-900 dark:text-amber-100 flex justify-between">
                <span>⚠️ Dérive progressive :</span>
                <span className="font-mono">{drift > 0 ? `+${drift.toFixed(3)} mm` : '0.00 mm'}</span>
              </label>
              <input 
                aria-label="Dérive de processus"
                type="range" min="0" max="0.12" step="0.01" 
                value={drift} onChange={(e) => setDrift(parseFloat(e.target.value))}
                className="w-full accent-amber-500 mt-2" 
              />
              <span className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1 block leading-relaxed">
                Représente l'usure de l'outil qui modifie la moyenne réelle du processus.
              </span>
            </div>
          </div>

          {/* Visual SVG Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border p-4 rounded-2xl shadow-inner relative">
              <h5 className="font-bold text-sm text-foreground mb-3 flex items-center justify-between">
                <span>📉 Carte de Contrôle Interactive de Shewhart</span>
                <span className="text-xs bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded">Axe X : n° de prélèvement</span>
              </h5>
              
              {/* Plotting the Card */}
              <svg viewBox="0 0 450 200" className="w-full h-auto overflow-visible select-none">
                {/* Background Grid and Zones */}
                <rect x="30" y="20" width="390" height="150" fill="#f8fafc" rx="4" />
                
                {/* Tolerances Limit (Client) - TSI/TII */}
                <line x1="30" y1="5" x2="420" y2="5" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="422" y="9" className="text-[7.5px] fill-rose-600 font-bold">TS client</text>

                <line x1="30" y1="185" x2="420" y2="185" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="422" y="189" className="text-[7.5px] fill-rose-600 font-bold">TI client</text>

                {/* targetMean Line (Cible) */}
                <line x1="30" y1="95" x2="420" y2="95" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="422" y="98" className="text-[7px] fill-indigo-600 font-bold">Cible</text>

                {/* Control Limits LSC / LIC */}
                <line x1="30" y1="40" x2="420" y2="40" stroke="#f43f5e" strokeWidth="1.2" />
                <text x="422" y="43" className="text-[7px] fill-rose-600 font-bold">LSC ({lsc.toFixed(2)})</text>

                <line x1="30" y1="150" x2="420" y2="150" stroke="#f43f5e" strokeWidth="1.2" />
                <text x="422" y="153" className="text-[7px] fill-rose-600 font-bold">LIC ({lic.toFixed(2)})</text>

                {/* Surveillance Limits LSA / LIA */}
                <line x1="30" y1="58" x2="420" y2="58" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 2" />
                <text x="422" y="61" className="text-[6.5px] fill-amber-600 font-bold">LSA</text>

                <line x1="30" y1="132" x2="420" y2="132" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 2" />
                <text x="422" y="135" className="text-[6.5px] fill-amber-600 font-bold">LIA</text>

                {/* Draw simulated points connecting line */}
                <path
                  d={points.map((pt, idx) => {
                    const x = 50 + idx * 37;
                    // Map mm values into SVG y coordinates
                    // Let y = 95 - ((pt - targetMean) / (itWidth*0.7)) * 95
                    const mappedY = 95 - ((pt - targetMean) / 0.18) * 55;
                    return `${idx === 0 ? 'M' : 'L'} ${x} ${mappedY}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />

                {/* Draw points */}
                {points.map((pt, idx) => {
                  const x = 50 + idx * 37;
                  const mappedY = 95 - ((pt - targetMean) / 0.18) * 55;
                  const isOutOfControl = pt > lsc || pt < lic;
                  const isSurvivalWarn = pt > lsa || pt < lia;

                  let color = "#1e293b";
                  if (isOutOfControl) color = "#ef4444";
                  else if (isSurvivalWarn) color = "#f59e0b";

                  return (
                    <g key={idx}>
                      <circle 
                        cx={x} cy={mappedY} r={isOutOfControl ? "4" : "3"} 
                        fill={color} 
                        className="transition-all duration-300" 
                      />
                      {isOutOfControl && (
                        <circle 
                          cx={x} cy={mappedY} r="7" 
                          fill="none" stroke="#ef4444" strokeWidth="1" 
                          className="animate-ping" 
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Statistics Result Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Capabilité machine</span>
                <span className={`text-2xl font-black ${cp >= 1.33 ? 'text-emerald-500' : cp >= 1.0 ? 'text-amber-500' : 'text-rose-500'}`}>
                  Cp = {cp.toFixed(2)}
                </span>
                <span className="text-[10px] block font-semibold text-slate-500 mt-1">
                  {cp >= 1.33 ? 'Conforme / Capable' : 'Insuffisant'}
                </span>
              </div>
              
              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Capabilité de procédé</span>
                <span className={`text-2xl font-black ${cpk >= 1.33 ? 'text-emerald-500' : cpk >= 1.0 ? 'text-amber-500' : 'text-rose-500'}`}>
                  Cpk = {cpk.toFixed(2)}
                </span>
                <span className="text-[10px] block font-semibold text-slate-500 mt-1">
                  {cpk >= 1.33 ? 'Procédé centré' : 'Déréglage !'}
                </span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Écart type résiduel</span>
                <span className="text-lg font-mono font-bold text-indigo-900 dark:text-indigo-200">
                  {standardError.toFixed(4)}
                </span>
                <span className="text-[9px] block text-slate-400 mt-1">$\sigma_r = \sigma/\sqrt{"n"}$</span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">État de la ligne</span>
                {drift > lsc - targetMean ? (
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-3 py-1 rounded-full border border-rose-200 inline-block mt-1 animate-pulse">
                    🚨 HORS CONTRÔLE
                  </span>
                ) : drift > lsa - targetMean ? (
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-3 py-1 rounded-full border border-amber-200 inline-block mt-1">
                    ⚠️ ALERTE DÉRIVE
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full border border-emerald-200 inline-block mt-1">
                    ✓ PRODUCTION OK
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="⚖️ Capabilités Cp et Cpk : Formulations Mathématiques" icon="📊" color="amber">
        <p className="mb-4">
          La performance quantitative d'une cellule de production ne s'estime pas uniquement en suivant si elle est centrée sur la cible, mais en mesurant la proportion de pièces aptes à s'insérer dans l'intervalle de tolérance géométrique du client (TI et TS).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2 mb-2">
              1. L'Indice de Capabilité Machine (Cp)
            </h4>
            <p className="text-sm leading-relaxed text-muted-text">
              Il calcule le ratio d'élasticité entre l'enveloppe de tolérance tolérée et l'amplitude de dispersion naturelle de la machine (<MathComponent math="6\sigma" />), modélisant 99.73 % de sa production sous loi normale.
            </p>
            <FormulaBox title="Dispersion potentielle" math="C_p = \frac{\text{TS} - \text{TI}}{6\sigma}" />
          </div>

          <div>
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2 mb-2">
              2. L'Indice de Capabilité de Procédé Centré (Cpk)
            </h4>
            <p className="text-sm leading-relaxed text-muted-text">
              Il corrige la capabilité potentielle Cp en se mesurant relativement au barycentre réel du procédé <MathComponent math="\bar{X}" />. Il s'assure qu'un décentrage n'écrase pas une des deux tolérances.
            </p>
            <FormulaBox title="Dispersion effective" math="C_{pk} = \min\left( \frac{\text{TS} - \mu}{3\sigma} , \frac{\mu - \text{TI}}{3\sigma} \right)" />
          </div>
        </div>

        <InfoBlock type="reminder" title="Seuils de Performance Industrielle">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Si <MathComponent math="C_p > 1.33" /> :</strong> Le procédé est déclaré "capable". La machine est excellente pour réaliser l'exigence.</li>
            <li><strong>Si <MathComponent math="1.00 \le C_p \le 1.33" /> :</strong> Procédé moyennement capable ; surveillance rapprochée requise.</li>
            <li><strong>Si <MathComponent math="C_p < 1.00" /> :</strong> Procédé non conforme. Il y aura systématiquement et intrinsèquement production de pièces défaillantes (rebuts catastrophiques).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices d'Ingénierie Résolus" icon="🎓" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Établissement de carte d'usinage mécanique de pignons"
          question={
            <div>
              <p>
                Une fraiseuse rectifieuse produit des pignons en acier auto-lubrifiés. On souhaite paramétrer sa carte de contrôle à la moyenne. 
                Une étude de capabilité d'usinage préliminaire donne les données suivantes :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                <li>Diamètre extérieur cible : <MathComponent math="\mu = 35.000\text{ mm}" />.</li>
                <li>Écart-type de production estimé de la broche : <MathComponent math="\sigma = 0.012\text{ mm}" />.</li>
                <li>Taille de prélèvement d'échantillons programmée : <MathComponent math="n = 9" /> arbres par lot.</li>
              </ul>
              <p className="mt-2 font-bold">1. Calculer l'écart-type de prélèvement résiduel.</p>
              <p className="font-bold">2. En déduire les limites de contrôle strictes (LSC / LIC) et d'alerte (LSA / LIA).</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Écart-type d'échantillonnage</p>
              <p className="my-2">
                En appliquant le théorème de réduction de l'échantillon d'Shewhart :
              </p>
              <p className="font-mono text-center my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$\\sigma_{\\bar{X}} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{0.012}{\\sqrt{9}} = \\frac{0.012}{3} = 0.004\\text{ mm}$"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Calcul des limites de contrôle LIC / LSC</p>
              <p className="my-2">
                Les limites de contrôle se calculent à un niveau de confiance bilatéral de <MathComponent math="\pm 3\sigma_{\bar{X}}" /> de part et d'autre de la cible :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>LIC : </strong> <MathComponent math="\mu - 3\sigma_{\bar{X}} = 35.000 - 3(0.004) = 35.000 - 0.012 = 34.988\text{ mm}" />.
                </li>
                <li>
                  <strong>LSC : </strong> <MathComponent math="\mu + 3\sigma_{\bar{X}} = 35.000 + 3(0.004) = 35.000 + 0.012 = 35.012\text{ mm}" />.
                </li>
              </ul>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Calcul des limites d'alerte LIA / LSA</p>
              <p className="my-2">
                Les limites d'alerte intermédiaire ou limites de surveillance se définissent à un intervalle <MathComponent math="\pm 2\sigma_{\bar{X}}" /> :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>LIA : </strong> <MathComponent math="\mu - 2\sigma_{\bar{X}} = 35.000 - 2(0.004) = 34.992\text{ mm}" />.
                </li>
                <li>
                  <strong>LSA : </strong> <MathComponent math="\mu + 2\sigma_{\bar{X}} = 35.000 + 2(0.004) = 35.008\text{ mm}" />.
                </li>
              </ul>
              <p className="mt-4 font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200">
                ✓ Conclusion : Dès qu'un échantillon moyen de dimension sort de [34.992 ; 35.008] mm, l'ajusteur surveille la ligne, si l'un d'eux sort de [34.988 ; 35.012] mm, l'usine s'arrête immédiatement !
              </p>
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Comparatif de capabilité d'injecteurs plastiques"
          question={
            <div>
              <p>
                Un sous-traitant automobile fournit des injecteurs dont une partie critique possède un diamètre de tolérance <MathComponent math="[42.20 \, ; \, 42.80]\text{ mm}" />.
                Deux presses injectrices (A et B) sont testées pour valider une production en série :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                <li><strong>Presse A :</strong> Moyenne réelle <MathComponent math="\mu_A = 42.50\text{ mm}" />, écart-type <MathComponent math="\sigma_A = 0.07\text{ mm}" />.</li>
                <li><strong>Presse B :</strong> Moyenne réelle <MathComponent math="\mu_B = 42.58\text{ mm}" /> (presse un peu décentrée), mais écart-type excellent <MathComponent math="\sigma_B = 0.04\text{ mm}" />.</li>
              </ul>
              <p className="mt-2 font-bold">Laquelle de ces deux presses d'injection assure la meilleure conformité globale (plus fort indicateur Cpk) ?</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Tolérances et capabilité potentielle Cp</p>
              <p className="my-2">
                L'intervalle de tolérance vaut : <MathComponent math="\text{IT} = \text{TS} - \text{TI} = 42.80 - 42.20 = 0.60\text{ mm}" />.
              </p>
              <p className="text-sm">Calcul de Cp pour A et B :</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><MathComponent math="C_{pA} = \frac{0.60}{6 \times 0.07} = \frac{0.60}{0.42} \approx 1.43" /> (Potentiellement apte car <MathComponent math="> 1.33" />)</li>
                <li><MathComponent math="C_{pB} = \frac{0.60}{6 \times 0.04} = \frac{0.60}{0.24} = 2.50" /> (Excellent potentiel de précision)</li>
              </ul>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Calcul du Cpk effectif pour la Presse A (centrée)</p>
              <p className="my-2">
                Puisque <MathComponent math="\mu_A = 42.50\text{ mm}" /> est parfaitement centré au milieu de la tolérance :
              </p>
              <p className="font-mono text-indigo-600 bg-slate-50 dark:bg-slate-900 text-center py-2 rounded-xl my-2">
                {"$C_{pkA} = C_{pA} = 1.43$"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Calcul du Cpk effectif pour la Presse B (secu contre rebut supérieur)</p>
              <p className="my-2">
                Puisque <MathComponent math="\mu_B = 42.58\text{ mm}" /> est décentré vers le haut, calculons la distance relative :
              </p>
              <p className="text-sm border-l-4 pl-4 font-semibold text-slate-700 dark:text-slate-300">
                {"$C_{pkB} = \\min\\left( \\frac{42.80 - 42.58}{3(0.04)} , \\frac{42.58 - 42.20}{3(0.04)} \\right) = \\min\\left( \\frac{0.22}{0.12} , \\frac{0.38}{0.12} \\right) \\approx \\min(1.83 \\, ; \\, 3.17) = 1.83$"}
              </p>
              <p className="mt-4 font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200">
                ✓ Conclusion : Malgré son décentrage léger, la <strong>Presse B</strong> est largement meilleure avec un <MathComponent math="C_{pk} = 1.83" /> comparé au <MathComponent math="1.43" /> de la presse A. C'est elle que l'on qualifie !
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de mémorisation Rapide" icon="🧠" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la formule d'établissement des limites de contrôle LSC d'Shewhart ?</>}
            back={<>{"$\\text{LSC} = \\mu + 3 \\frac{\\sigma}{\\sqrt{n}}$ où $n$ est la taille de l'échantillon d'observation."}</>}
          />
          <Flashcard 
            front={<>Quelle est la distinction mathématique fondamentale entre Cp et Cpk ?</>}
            back={<>{"$C_p = \\frac{TS-TI}{6\\sigma}$ mesure l'aptitude potentielle brute de la machine si elle était parfaitement centrée, alors que $C_{pk}$ pénalise le décentrage par rapport aux exigences clients."}</>}
          />
        </div>
      </Section>

      <Section title="📜 Foire Aux Questions d'Usine (FAQ)" icon="🎓" color="indigo">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi privilégie-t-on des tailles d'échantillons de n = 5 dans la pratique ?",
              answer: "La taille d'échantillon n=5 est un compromis d'optimalité historique. Elle est suffisamment économique sur une chaîne de production, tout en amorçant parfaitement le Théorème Central Limite permettant d'assimiler la distribution de la moyenne d'échantillon à une loi normale."
            },
            {
              question: "Quelle est la différence fondamentale entre capabilité machine (Cp) et capabilité procédé (Pp) ?",
              answer: "L'indice de capabilité machine (Cp) est basé sur une production à court terme très stable permettant d'évaluer le potentiel brut d'une machine neuve. La capabilité procédé (Pp) intègre la variabilité d'une vraie production long-terme avec le roulement d'équipe, le changement de matière et les micro-fluctuations d'environnement."
            },
            {
              question: "Que doit faire concrètement un pilote de ligne de production si la moyenne de l'échantillon franchit la LSA sans franchir la LSC ?",
              answer: "Il ne doit PAS arrêter la fabrication. Franchir une limite de surveillance (LSA) signifie que le processus subit une fluctuation suspecte de faible probabilité normale (~5%). L'ajusteur doit augmenter la cadence de contrôle et chercher s'il y a amorce d'une dérive de température ou usure mineure."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation de validation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Un procédé d'écart-type machine σ = 0.05 mm est taré sur un lot de taille n = 25. Quel est l'écart-type de sa moyenne ?",
              options: [
                "0.010 mm",
                "0.002 mm",
                "0.050 mm",
                "0.250 mm"
              ],
              correctAnswer: 0,
              explanation: "Par la formule d'échantillonnage de Shewhart, σ(X̄) = σ / √n = 0.05 / √25 = 0.05 / 5 = 0.01 mm."
            },
            {
              question: "Laquelle des affirmations suivantes est correcte concernant les tolérances du client et les limites de contrôle ?",
              options: [
                "L'IT est fixé par la statistique d'Shewhart et la capabilité.",
                "Les limites d'alerte doivent coïncider avec l'intervalle de tolérance client.",
                "L'amplitude de l'intervalle [LIC, LSC] est d'autant plus étroite que n est grand.",
                "Les tolérances du client s'élargissent automatiquement si la broche s'use."
              ],
              correctAnswer: 2,
              explanation: "Puisque les limites de contrôle utilisent σ / √n, l'augmentation du nombre de prélèvements n réduit la variabilité d'échantillonnage de la moyenne, rétrécissant le corridor [LIC ; LSC]."
            },
            {
              question: "Quelle est la capabilité Cp d'une meule dont l'IT = 0.36 mm et dont l'écart-type vaut σ = 0.02 mm ?",
              options: [
                "1.00",
                "1.33",
                "3.00",
                "6.00"
              ],
              correctAnswer: 2,
              explanation: "Cp = IT / 6σ = 0.36 / (6 * 0.02) = 0.36 / 0.12 = 3.00! Ce procédé est exceptionnel (conforme par rapport à la dispersion demandée)."
            }
          ]}
        />
      </Section>

      <InteractiveChecklist 
        items={[
          "Je sais énoncer le théorème central limite appliqué aux moyennes d'échantillons n.",
          "Je maîtrise le calcul complet des droites de contrôle LIC/LSC et de surveillance LIA/LSA.",
          "Je sais formuler et calculer les indices de performance Cp, Cpk et valider l'adéquation client."
        ]}
      />
    </div>
  );
};

export default Course_BUT_Industriel_01_MSP;
