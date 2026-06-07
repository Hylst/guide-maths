import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, Activity, Table } from 'lucide-react';

const Course_BTS_Tertiaire_02_Estimation_Echantillonnage: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [sampleSize, setSampleSize] = useState(100); // n
  const [confidenceLevel, setConfidenceLevel] = useState(95); // 90, 95, 99

  // Statistics derived variables
  // Standard deviation of reference population
  const populationSigma = 15;
  const sampleMean = 120; // arbitrary centered point

  // Select t_alpha (z_critical)
  let zCritical = 1.96;
  if (confidenceLevel === 90) zCritical = 1.645;
  else if (confidenceLevel === 95) zCritical = 1.96;
  else if (confidenceLevel === 99) zCritical = 2.576;

  // Standard error of the mean
  const standardError = populationSigma / Math.sqrt(sampleSize);
  // Interval margin of error
  const marginOfError = zCritical * standardError;

  const minInterval = sampleMean - marginOfError;
  const maxInterval = sampleMean + marginOfError;

  // Generate dynamic bell curve SVG path with shaded interval bounds
  const width = 450;
  const height = 180;
  const paddingX = 40;
  const paddingY = 20;

  // Center point
  const centerX = width / 2;
  const scaleX = 40; // width expansion
  const scaleY = 120; // curve multiplier

  // Gaussian analytical function
  const gaussianY = (x: number) => {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  };

  // Compile full Gaussian curve path
  let bellPath = '';
  for (let px = 0; px <= 200; px++) {
    const xVal = ((px - 100) / 100) * 4; // x from -4 to +4
    const yVal = gaussianY(xVal);
    const graphX = centerX + xVal * scaleX;
    const graphY = height - paddingY - yVal * scaleY;
    if (px === 0) {
      bellPath += `M ${graphX} ${graphY}`;
    } else {
      bellPath += ` L ${graphX} ${graphY}`;
    }
  }

  // Draw shaded rects/intervals of confidence: from -zCritical to +zCritical
  // Standardized bounds: (-marginOfError / stdError) -> translates to +/- zCritical
  const leftBoundX = centerX - zCritical * scaleX;
  const rightBoundX = centerX + zCritical * scaleX;

  // Compile shaded interval path
  let shadePath = `M ${leftBoundX} ${height - paddingY}`;
  for (let px = 0; px <= 200; px++) {
    const xVal = ((px - 100) / 100) * 4; // x from -4 to 4
    if (xVal >= -zCritical && xVal <= zCritical) {
      const yVal = gaussianY(xVal);
      const graphX = centerX + xVal * scaleX;
      const graphY = height - paddingY - yVal * scaleY;
      shadePath += ` L ${graphX} ${graphY}`;
    }
  }
  shadePath += ` L ${rightBoundX} ${height - paddingY} Z`;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-BTS-TER-02"
        title="BTS Tertiaire : Estimation & Échantillonnage"
        subtitle="Apprenez à extrapoler de manière scientifiquement rigoureuse les paramètres réels d'une population industrielle à partir de sondages partiels."
        duration="1h 35"
      />

      {/* 1. Introduction */}
      <Section title="🎯 Introduction Pédagogique" icon="📐" color="indigo">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Dans le cadre d'études de marché, de sondages d'opinion, ou de contrôle statistique de conformité de pièces d'usine (BTS Tertiaire / CG / Qualité), il est matériellement impossible de contrôler l'intégralité d'une population d'objets ou de clients (cela prendrait trop de temps et détruirait parfois la marchandise). On prélève alors un **échantillon représentatif aléatoire**.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          L'**inférence statistique** est la branche des mathématiques qui traite ce passage stratégique du sous-ensemble (l'échantillon observé) au tout (la population globale). Ce cours vous guide de la fluctuation de échantillonnage à l'écriture mathématique rigoureuse d'un <strong>intervalle de confiance</strong> à un seuil d'incertitude planifié.
        </p>
        <TipBanner type="info" title="Loi des grands nombres">
          Plus la taille de échantillon n grandit, plus la précision statistiques s'accroît et l'écart-type d'erreur se resserre par un facteur racine de n, diminuant de fait la taille de notre fourchette d'incertitude.
        </TipBanner>
      </Section>

      {/* 2. Interactive SVG gaussian normal curve simulation */}
      <Section title="📊 Visualiseur Graphique d'Intervalle de Confiance" icon="📊" color="emerald">
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Modifiez la taille de votre échantillon ("$n$") ou baissez la probabilité de certitude désirée ("$1-\\alpha$"). Observez en temps réel le resserrement ou l'élargissement de l'intervalle shaded (zone verte) sous la fonction de densité gaussienne normale :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          {/* Sliders panel */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-950 dark:text-slate-50 text-base">
              <Sliders className="w-5 h-5 text-indigo-500" />
              Réglages Statistique
            </h4>

            {/* Sample Size slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Taille Échantillon (n) :</span>
                <span className="text-indigo-650 font-bold">n = {sampleSize}</span>
              </div>
              <input 
                type="range" min="30" max="600" step="10" value={sampleSize}
                onChange={(e) => setSampleSize(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Confidence Threshold selectors */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-medium text-slate-500">Seuil de certitude désiré (1-α) :</span>
              <div className="flex gap-2">
                {[90, 95, 99].map(level => (
                  <button 
                    key={level}
                    onClick={() => setConfidenceLevel(level)}
                    className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${confidenceLevel === level ? 'bg-indigo-600 border-indigo-650 text-white shadow-sm' : 'bg-white dark:bg-slate-950 border-slate-200 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}
                  >
                    {level} %
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 leading-tight">
              Pour un seuil de certitude de {confidenceLevel} %, l'indice critique standardisé normal associé vaut {"$u_{\\alpha} = "}{zCritical}{"$"}.
            </div>
          </div>

          {/* Bell curve dynamic rendering */}
          <div className="lg:col-span-4 flex flex-col items-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-mono">Loi Normale Shaded</span>
            <div className="relative w-full h-[180px] flex items-center justify-center">
              <svg width={width} height={height} className="rounded-lg">
                {/* Horizontal ground reference */}
                <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#94a3b8" strokeWidth="1.5" />
                <line x1={centerX} y1={paddingY} x2={centerX} y2={height - paddingY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />

                {/* Shaded Interval selection */}
                <path d={shadePath} fill="#10b981" fillOpacity="0.25" />

                {/* Bell Curve line */}
                <path d={bellPath} fill="none" stroke="#4f46e5" strokeWidth="2.5" />

                {/* Vertical interval bound lines */}
                <line x1={leftBoundX} y1={paddingY + 30} x2={leftBoundX} y2={height - paddingY} stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                <line x1={rightBoundX} y1={paddingY + 30} x2={rightBoundX} y2={height - paddingY} stroke="#10b981" strokeWidth="2" strokeDasharray="4" />

                {/* Labels near vertical bounds */}
                <text x={leftBoundX - 10} y={height - paddingY + 12} textAnchor="middle" className="text-[9px] font-mono fill-emerald-600 font-bold">-u_α</text>
                <text x={rightBoundX + 10} y={height - paddingY + 12} textAnchor="middle" className="text-[9px] font-mono fill-emerald-600 font-bold">+u_α</text>
              </svg>
            </div>
          </div>

          {/* Mathematical results panel */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-2 font-medium">Bilan d'Incertitude d'Échantillon</span>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Intervalle de confiance :</div>
                  <div className="text-base font-extrabold text-indigo-650 font-mono">
                    [{minInterval.toFixed(2)} ; {maxInterval.toFixed(2)}]
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Pour une moyenne expérimentale observée de 120.</span>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Marge d'erreur globale (Δx) :</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono">
                    ± {marginOfError.toFixed(3)}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-sans border-t pt-3 mt-4">
              En quadruplant le nombre de sondages, vous divisez mathématiquement par deux la marge d'erreur globale de fluctuation.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Detailed Theory section with LaTeX formulas */}
      <Section title="📘 Fluctuations & Formules de l'Intervalle de Confiance" icon="📚" color="slate">
        <p className="mb-4 text-slate-700 dark:text-slate-350 leading-relaxed">
          Soit un échantillon aléatoire de taille {"$n \\ge 30$"} extrait d'une population globale de moyenne inconnue {"$\\mu$"} et d'écart-type connu {"$\\sigma$"}. D'après le théorème central limite, l'écart-type de la moyenne échantillonnée s'écrit :
        </p>

        <FormulaBox 
          title="Écart-type de Fluctuations (Erreur Standard)" 
          math="\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour reconstituer rationnellement le paramètre d'espérance réelle sous-jacent à partir de la moyenne d'échantillon mesurée {"$\\bar{x}$"}, on définit l'<strong>intervalle de confiance bilatérale</strong> :
        </p>

        <FormulaBox 
          title="Formule Standardisée de l'Intervalle de Confiance" 
          math="IC_{1-\alpha}(\mu) = \left[ \bar{x} - u_{\alpha} \frac{\sigma}{\sqrt{n}} \ ; \ \bar{x} + u_{\alpha} \frac{\sigma}{\sqrt{n}} \right]" 
        />

        <div className="space-y-4 my-6">
          <InfoBlock type="definition" title="Le coefficient d'écart réduit normalisé u_α">
            La variable {"$u_{\\alpha}$"} est issue de l'inversion de la fonction de répartition de la loi normale centrée réduite {"$\\mathcal{N}(0,1)$"} pour un niveau de risque d'erreur consenti {"$\\alpha$"}.
            Les trois valeurs d'examens BTS incontournables sont :
            <ul className="list-disc pl-5 mt-2 space-y-1 font-mono text-xs">
              <li>Pour {"$1-\\alpha = 90\\%$ (soit $\\alpha = 10\\%$)"} : {"$u_{\\alpha} = 1.645$"}</li>
              <li>Pour {"$1-\\alpha = 95\\%$ (soit $\\alpha = 5\\%$)"} : {"$u_{\\alpha} = 1.96$"} <span className="text-indigo-500 font-bold">(Le plus fréquent)</span></li>
              <li>Pour {"$1-\\alpha = 99\\%$ (soit $\\alpha = 1\\%$)"} : {"$u_{\\alpha} = 2.576$"}</li>
            </ul>
          </InfoBlock>

          <InfoBlock type="reminder" title="Intervalle de confiance d'une proportion p">
            Si le sondage concerne une proportion de conformité {"$p$"}, pour un taux observé d'échantillon {"$f$"} (avec {"$nf \\ge 5$"} et {"$n(1-f) \\ge 5$"}), l'intervalle d'évaluation s'écrit de manière canonique sous la forme :
            <MathComponent block math="IC_{0.95}(p) = \left[ f - 1.96 \sqrt{\frac{f(1-f)}{n}} \ ; \ f + 1.96 \sqrt{\frac{f(1-f)}{n}} \right]" />
          </InfoBlock>
        </div>
      </Section>

      {/* 4. Two solved exercises */}
      <Section title="🛠️ Exercices Résolus d'Examen" icon="🛠️" color="purple">
        <InteractiveExercise 
          title="Exercice 1 : Évaluation de conformité de diamètres (Option Qualité de production)"
          question={
            <div className="space-y-2">
              <p>
                Un atelier d'emboutissage livre des axes métalliques. On prélève un échantillon de {"$n = 100\\text{ axes}$"}. La mesure expérimentale indique un diamètre moyen de {"$\\bar{x} = 20.05\\text{ mm}$"}. On connaît de longue date l'écart-type de la machine-outil qui s'établit à {"$\\sigma = 0.2\\text{ mm}$"}.
              </p>
              <p className="font-semibold">
                Calculez l'intervalle de confiance de la moyenne réelle macroscopique de production au niveau de certitude académique standard de 95 %.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Poser les variables de l'énoncé et repérer le coefficient critique</p>
              <p>Taille de échantillon : {"$n = 100$"}</p>
              <p>Moyenne d'échantilloange : {"$\\bar{x} = 20.05$"}</p>
              <p>Écart-type de production : {"$\\sigma = 0.2$"}</p>
              <p>Pour un seuil de confiance de {"$95\\%$"}, la valeur critique normale d'écart réduit est : {"$u_{\\alpha} = 1.96$"}.</p>
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Évaluation quantitative de la marge d'erreur</p>
              <p>On applique le calcul standard de marge d'incertitude de fluctuation de la moyenne :</p>
              <MathComponent block math="\Delta x = u_{\alpha} \frac{\sigma}{\sqrt{n}} = 1.96 \times \frac{0.2}{\sqrt{100}} = 1.96 \times \frac{0.2}{10} = 1.96 \times 0.02 = 0.0392\text{ mm}" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Écriture finale de l'intervalle et conclusion de conformité</p>
              <p>On calcule les bornes inférieure et supérieure :</p>
              <p>Borne inférieure : {"$20.05 - 0.0392 = 20.0108\\text{ mm}$"}</p>
              <p>Borne supérieure : {"$20.05 + 0.0392 = 20.0892\\text{ mm}$"}</p>
              <p>L'intervalle se note :</p>
              <MathComponent block math="IC_{0.95}(\mu) = [20.011\text{ mm} \ ; \ 20.089\text{ mm}]" />
              <p>Nous affirmons avec seulement 5% de risque d'erreur que le vrai diamètre moyen du lot global d'usine d'emboutissage est compris entre 20.011 mm et 20.089 mm.</p>
            </div>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Sondage marketing de panel clients (Taille d'échantillon requise)"
          question={
            <div className="space-y-2">
              <p>
                Un cabinet tertiaire désire estimer la proportion réelle {"$p$"} d'intention d'achat d'un nouveau progiciel financier de comptabilité intégrée. On s'attend à ce que cette proportion avoisine les {"$20\\%$"} de parts de marché.
              </p>
              <p className="font-semibold">
                Déterminez la taille minimale d'échantillon {"$n$"} d'entreprises qu'il faut interroger pour que la marge d'erreur de fluctuate d'estimation à 95 % ne dépasse pas ± 2 %.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Analyser l'inéquation de marge d'erreur de proportion</p>
              <p>La marge d'incertitude sur une proportion est donnée sous l'approximation par la relation :</p>
              <MathComponent block math="\Delta p = 1.96 \times \sqrt{\frac{p(1-p)}{n}}" />
              <p>On impose {"$\\Delta p \\le 0.02$"} avec la conjecture d'intention d'achat d'environ {"$p = 0.2$"}.</p>
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Isoler l'inconnue algébrique n en passant au carré</p>
              <MathComponent block math="1.96 \times \sqrt{\frac{0.2 \times 0.8}{n}} \le 0.02 \implies \sqrt{\frac{0.16}{n}} \le \frac{0.02}{1.96} \approx 0.010204" />
              <p>Élevons chaque membre au carré pour neutraliser la racine :</p>
              <MathComponent block math="\frac{0.16}{n} \le (0.010204)^2 \approx 0.00010412 \implies n \ge \frac{0.16}{0.00010412}" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Conclusion quantitative</p>
              <MathComponent block math="n \ge 1536.64" />
              <p>Le cabinet comptable doit impérativement solliciter un échantillon d'un minimum de <strong>1537 dirigeants d'entreprises</strong> pour fiabiliser et garantir son enquête à plus ou moins 2% près de précision.</p>
            </div>
          ]}
        />
      </Section>

      {/* 5. Interactive Flashcards */}
      <Section title="⚡ Flashcards de Révision" icon="⚡" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Vérifiez vos réflexes statistiques clés :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Vocabulaire Statistique</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Quelle est la différence fondamentale entre fluctuation et estimation ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <p className="text-[11px] text-slate-605 dark:text-slate-400">
                  La **fluctuation** part de la population connue pour analyser les échantillons théoriques. L'**estimation** réalise le chemin inverse : elle part des chiffres mesurés de l'unique échantillon pour en inférer par intervalle les paramètres réels de la population cachée.
                </p>
              </div>
            }
          />

          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Indice de confiance standard</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Quel coefficient u_α d'écart réduit doit-on affecter systématiquement dans l'intervalle à 99% ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <MathComponent block math="u_{\alpha} = 2.576" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">Plus vous exigez de certitude quant au résultat d'intervalle, plus la dimension de la zone d'erreur s'accroît.</span>
              </div>
            }
          />
        </div>
      </Section>

      {/* 6. FAQ Section */}
      <Section title="💡 Questions Fréquentes (FAQ)" icon="❓" color="amber">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la signification concrete de l'appellation 'Confiance à 95%' ?",
              answer: (
                <p>
                  Cela veut dire que si l'on répétait mathématiquement le prélèvement d'échantillons de taille identique 100 fois d'affilée pour assembler l'intervalle dans chaque cas, 95 de ces intervalles contiendraient véritablement la vraie espérance inconnue de la population. Seulement 5 fois sur 100, la fourchette d'incertitude construite passerait à côté du résultat réel.
                </p>
              )
            },
            {
              question: "Pourquoi est-il exigé que la taille de l'échantillon d'observation n soit supérieure ou égale à 30 ?",
              answer: (
                <p>
                  C'est le seuil empirique universel sous lequel l'application s'autorise à appliquer l'approximation du **Théorème Central Limite (TCL)**. Au-delà de {"$n \\ge 30$"}, la distribution de la moyenne converge puissamment vers une loi normale symétrique, même si la distribution de base de la population initiale d'origine s'avérait asymétrique ou discontinue.
                </p>
              )
            },
            {
              question: "Quelle est la différence entre une estimation ponctuelle et une estimation par intervalle ?",
              answer: (
                <p>
                  L'estimation ponctuelle cherche à désigner un chiffre scalaire unique approché (ex: donner la moyenne de échantillon {"$20.05$"}). C'est une estimation rapide mais sans aucune rigueur de probabilité de justesse exacte. L'estimation par intervalle remédie à cela en fournissant une fourchette logique combinée à une probabilité de certitude formelle (ex: intervalle de confiance à 95%).
                </p>
              )
            }
          ]}
        />
      </Section>

      {/* 7. Comprehensive Quiz with 3 questions minimum */}
      <Section title="📝 Mini-Quiz de Validation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on multiplie par 9 le nombre de prélèvements d'axes n dans une étude statistique de conformité, qu'advient-il de l'amplitude globale de l'intervalle de confiance ?",
              options: [
                "L'amplitude de l'intervalle est divisée par 9",
                "L'amplitude de l'intervalle est divisée par 3",
                "L'amplitude s'élargit exponentiellement"
              ],
              correctAnswer: 1,
              explanation: "La précision est gouvernée par le dénominateur de la formule : √(n). Si n devient 9n, le diviseur d'erreur devient √(9n) = 3√(n). L'amplitude de l'intervalle est donc divisée précisément par 3."
            },
            {
              question: "Pour une proportion estimée de f = 0.50 sur un échantillon conséquent de taille n = 100 axes, quelle est la marge d'erreur globale au seuil de confiance de 95% ?",
              options: [
                "± 1.96 %",
                "± 5.00 %",
                "± 9.80 %"
              ],
              correctAnswer: 2,
              explanation: "La formule de proportion s'écrit : margin = 1.96 * √(f*(1-f)/n) = 1.96 * √(0.25/100) = 1.96 * √(0.0025) = 1.96 * 0.05 = 0.098 soit ± 9.80%."
            },
            {
              question: "Le théorème central limite énonce que sous réserve de n ≥ 30, la moyenne échantillonnée converge vers quelle loi mathématique fondamentale ?",
              options: [
                "La Loi Uniforme sur l'échantillon",
                "La Loi Normale (Gaussienne)",
                "La Loi de Poisson de probabilité rare"
              ],
              correctAnswer: 1,
              explanation: "Le Théorème Central Limite (TCL) est l'un des piliers des probabilités mathématiques de BTS. Il stipule que la moyenne de variables indépendantes et identiquement distribuées converge asymptotiquement vers la Loi Normale (Loi d'enveloppe en cloche de Gauss)."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais faire la différence entre fluctuation d'échantillonnage et inférence statistique.",
            "Je sais calculer l'intervalle de confiance bilatéral pour une espérance et une proportion.",
            "Je connais les coefficients d'écarts u_α correspondant aux seuils académiques habituels.",
            "Je sais dimensionner la taille critique n par résolution algébrique d'inéquation."
          ]}
        />
      </Section>

      {/* 8. Course Complete button */}
      {!isCompleted && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={onValidateCourse}
            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-650 hover:to-teal-700 text-white rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-xl font-bold"
          >
            <Activity className="w-6 h-6 animate-pulse" />
            Valider le Cours & Débloquer (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_BTS_Tertiaire_02_Estimation_Echantillonnage;
