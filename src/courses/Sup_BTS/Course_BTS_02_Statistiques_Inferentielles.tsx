import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, LineChart, ShieldCheck, CheckCircle2, Sliders, Zap, HelpCircle } from 'lucide-react';

const StatsInteractiveSim: React.FC = () => {
  const [size, setSize] = useState<number>(120); // sample size n from 30 to 500
  const [percent, setPercent] = useState<number>(45); // sample success proportion from 5 to 95%
  const [confLevel, setConfLevel] = useState<number>(95); // 90, 95 or 99%

  const calc = useMemo(() => {
    const n = size;
    const p = percent / 100;
    
    // Critical value z
    let z = 1.96;
    if (confLevel === 90) z = 1.645;
    if (confLevel === 99) z = 2.576;

    // Standard Error = sqrt( p*(1-p) / n )
    const standardError = Math.sqrt((p * (1 - p)) / n);
    const marginOfError = z * standardError;

    const lowerBound = Math.max(0, p - marginOfError);
    const upperBound = Math.min(1, p + marginOfError);

    return {
      n,
      p,
      z,
      standardError,
      marginOfError,
      lowerBound,
      upperBound
    };
  }, [size, percent, confLevel]);

  // SVG dimensions: 220 x 220. Let's center the Gauss curve at x = 110.
  // The scale represents standard errors.
  const gaussWidth = useMemo(() => {
    // Width of highlighted central region in pixels. Let's map 1 standard error to 22 pixels.
    const stdErrPixels = calc.standardError * 400; // visual zoom multiplier
    return calc.z * stdErrPixels;
  }, [calc]);

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <LineChart className="text-emerald-600" size={22} />
        Simulateur d'Intervalle de Confiance : La Bell Curve
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Faites varier la taille de l'échantillon et observez comment la zone d'incertitude rétrécit ou s'élargit autour de la vraie valeur.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders on Left */}
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders size={12} /> Réglages de l'Échantillon
            </h4>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-650 dark:text-slate-300">Taille de l'échantillon (n) :</span>
                <span className="text-emerald-600 font-mono font-black">{size} pièces</span>
              </div>
              <input 
                type="range" min="30" max="450" step="5" value={size} onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-[9px] text-slate-400">Plus {"$n$"} est grand, plus le coût d'audit augmente mais l'erreur baisse.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-650 dark:text-slate-300">Fréquence observée (f) :</span>
                <span className="text-emerald-600 font-mono font-black">{percent}%</span>
              </div>
              <input 
                type="range" min="5" max="95" step="1" value={percent} onChange={(e) => setPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-650 dark:text-slate-300 mb-2">Niveau de Confiance attendu :</span>
              <div className="flex gap-2">
                {[90, 95, 99].map(level => (
                  <button
                    key={level}
                    onClick={() => setConfLevel(level)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${confLevel === level ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 border-slate-200 text-slate-600 dark:text-slate-300'}`}
                  >
                    {level}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-950 space-y-1.5">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} /> Indicateurs Inférentiels Calculés :
            </h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Marge d'erreur locale (E) :</span>
                <strong className="text-slate-800 dark:text-slate-100 font-mono">± {(calc.marginOfError * 100).toFixed(2)} %</strong>
              </div>
              <div className="flex justify-between">
                <span>Écart-type de proportion estimé :</span>
                <strong className="text-slate-800 dark:text-slate-100 font-mono">{(calc.standardError * 100).toFixed(3)} %</strong>
              </div>
              <div className="flex justify-between border-t border-emerald-100 dark:border-emerald-900 pt-1.5 mt-1.5 text-emerald-700 dark:text-emerald-400 font-black">
                <span>Intervalle de confiance :</span>
                <strong className="font-mono">
                  [ {(calc.lowerBound * 100).toFixed(1)}% ; {(calc.upperBound * 100).toFixed(1)}% ]
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Normal Curve on Right */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Loi Normale d'Échantillonnage</span>

          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-2 shadow-inner relative">
            <svg viewBox="0 0 220 200" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
              {/* Generate standard Gauss normal curve path */}
              {(() => {
                // Background curve path (whole range)
                let bgPoints = [];
                for (let x = 10; x <= 210; x++) {
                  const z = (x - 110) / 32; // Standard deviation = 32px
                  const y = 140 - 90 * Math.exp(-0.5 * z * z);
                  bgPoints.push(`${x},${y}`);
                }
                const curvePath = `M ${bgPoints.join(' L ')}`;

                // Left & Right bounds of simulation
                const leftX = Math.max(10, 110 - gaussWidth);
                const rightX = Math.min(210, 110 + gaussWidth);

                // Build polygon points for shaded confidence intervals
                let confidencePoints = [];
                confidencePoints.push(`${leftX},140`); // start at base coordinate
                for (let x = Math.ceil(leftX); x <= Math.floor(rightX); x++) {
                  const z = (x - 110) / 32;
                  const y = 140 - 90 * Math.exp(-0.5 * z * z);
                  confidencePoints.push(`${x},${y}`);
                }
                confidencePoints.push(`${rightX},140`); // close polygon at base
                const confidencePath = confidencePoints.length > 2 ? `M ${confidencePoints.join(' L ')} Z` : '';

                return (
                  <>
                    {/* Shaded confidence interval region under curve */}
                    {confidencePath && (
                      <path d={confidencePath} fill="#10b981" fillOpacity="0.15" />
                    )}

                    {/* Unshaded curve line */}
                    <path d={curvePath} stroke="#64748b" strokeWidth="2.5" fill="none" />

                    {/* Base horizontal line */}
                    <line x1="5" y1="140" x2="215" y2="140" stroke="#475569" strokeWidth="1.5" />

                    {/* Central mean vertical tick line */}
                    <line x1="110" y1="50" x2="110" y2="140" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="110" cy="50" r="1.5" fill="#10b981" />
                    <text x="110" y="44" fill="#10b981" textAnchor="middle" className="text-[7.5px] font-bold font-mono">f = {calc.p.toFixed(2)}</text>

                    {/* Indicator lines and ticks representing confidence borders */}
                    <line x1={leftX} y1="65" x2={leftX} y2="140" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x={leftX} y="152" fill="#f43f5e" textAnchor="middle" className="text-[7px] font-bold font-mono">{(calc.lowerBound * 100).toFixed(0)}%</text>

                    <line x1={rightX} y1="65" x2={rightX} y2="140" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x={rightX} y="152" fill="#f43f5e" textAnchor="middle" className="text-[7px] font-bold font-mono">{(calc.upperBound * 100).toFixed(0)}%</text>

                    {/* Horizontal dimension bar illustrating Margin of Error */}
                    <line x1={leftX} y1="170" x2={rightX} y2="170" stroke="#10b981" strokeWidth="2" />
                    <line x1={leftX} y1="166" x2={leftX} y2="174" stroke="#10b981" strokeWidth="1.5" />
                    <line x1={rightX} y1="166" x2={rightX} y2="174" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="182" fill="#047857" textAnchor="middle" className="text-[8px] font-black font-semibold">I.C. ({confLevel}%) Largeur = {(calc.marginOfError * 200).toFixed(1)} %</text>
                  </>
                );
              })()}
            </svg>

            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[9px] text-emerald-400 font-mono rounded-md flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Thermie CLT Active</span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-400 mt-2 font-mono">Vert : Zone de piégeage du paramètre réel</span>
        </div>
      </div>
    </div>
  );
};

const Course_BTS_02_Statistiques_Inferentielles: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/04_Post_Bac/BTS/02_BTS_02_Statistiques_Inferentielles.md";

  const checklistItems = [
    "Distinguer estimation ponctuelle et estimation par intervalle de confiance.",
    "Formuler l'écart-type de la moyenne d'un échantillon s'appuyant sur √n.",
    "Déterminer et encadrer mathématiquement un intervalle de confiance de proportion aux seuils 95% et 99%.",
    "Estimer l'écart ou la taille d'échantillon idéale pour une marge d'erreur prescrite.",
    "Comprendre le risque d'erreur de première espèce α dans les audits industriels."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="SI" 
        title="Statistiques Inférentielles" 
        subtitle="Apprendre à extrapoler avec précision les propriétés d'une population globale à partir d'audits partiels et à maîtriser les intervalles de confiance."
        level="BTS Informatique / Management"
        duration="3.0h"
        objectives={[
          "Passer du recensement prohibitif à l'échantillonnage scientifique partiel.",
          "Exploiter le Théorème Central Limite pour modéliser des incertitudes.",
          "Chiffrer et dessiner les limites supérieures/inférieures d'un intervalle de confiance.",
          "Distinguer et évaluer la probabilité intrinsèque de se tromper lors d'un contrôle qualité."
        ]}
      />

      <InfoBlock type="info" title="Pourquoi l'Inférence ?">
        Dans l'industrie ou la finance, vous ne pouvez pas inspecter la totalité de la production (recensement impossible, destructif ou trop onéreux). À la place, vous auditez un petit groupe (échantillon). La statistique inférentielle fournit les outils théoriques pour **mesurer l'incertitude** de ces projections. Elle nous permet de déclarer : _« Il y a 95% de chances que le nombre de bugs réels de notre serveur soit compris entre 2% et 4% »_.
      </InfoBlock>

      <Section title="1. Échantillonnage et Théorème Central Limite (T.C.L.)" color="slate" icon={<BarChart3 className="text-slate-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Soit une population de taille infinie caractérisée par une moyenne réelle cible {"$\\mu$"} et un écart-type réel {"$\\sigma$"}. Lorsque l'on extrait au hasard un échantillon indépendant de taille {"$n \\ge 30$"}, la variable aléatoire de la **moyenne de l'échantillon** (notée {"$\\bar{X}$"}) suit de manière asymptotique une loi normale :
          </p>

          <BentoGrid>
            <BentoCard title="Espérance mathématique" color="slate">
              <p className="text-xs text-zinc-550 leading-normal mb-2">
                La moyenne attendue de notre échantillon correspond rigoureusement à la moyenne vraie globale :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$E(\\bar{X}) = \\mu$$"}
              </div>
            </BentoCard>

            <BentoCard title="Fluctuation d'Écart-type" color="indigo">
              <p className="text-xs text-zinc-550 leading-normal mb-2">
                L'écart-type de la moyenne se resserre proportionnellement à la racine carrée de l'effectif :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$\\sigma_{\\bar{X}} = \\frac{\\sigma}{\\sqrt{n}}$$"}
              </div>
              <p className="text-[10px] text-indigo-500 font-bold leading-normal">
                Plus l'échantillon est gros, plus notre estimation de la moyenne devient fiable et précise.
              </p>
            </BentoCard>

            <BentoCard title="Formulation T.C.L." color="purple" colSpan={3}>
              <p className="text-xs text-zinc-400 leading-normal mb-2">
                Pour une variable de moyenne pondérée, quelle que soit la loi originale de la population (uniforme, exponentielle ou autre), la moyenne d'échantillon tend vers :
              </p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-slate-950 rounded border text-purple-750 dark:text-purple-400 font-bold">
                {"$$\\bar{X} \\sim \\mathcal{N}\\left(\\mu, \\frac{\\sigma}{\\sqrt{n}}\\right)$$"}
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="2. Intervalles de Confiance de Proportion" color="indigo" icon={<ShieldCheck className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Lorsque la proportion True {"$p$"} d'un caractère de la population est inconnue, nous l'estimons à l'aide de la fréquence observée {"$f$"} mesurée sur l'échantillon. Un **intervalle de confiance** fournit une plage qui « piège » la proportion réelle avec un seuil de probabilité fixé d'avance {"$1 - \\alpha$"}.
          </p>

          <TipBanner type="info" title="Formule d'usage à 95%">
            Dans la grande majorité des contrôles qualité industriels ou de sondages, on retient la valeur critique {"$z = 1.96$"}. L'intervalle de confiance s'écrit alors :
            <div className="font-mono text-center my-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded text-indigo-700 dark:text-indigo-400 font-black text-sm md:text-base">
              {"$$I_{0.95} = \\left[ f - 1.96 \\sqrt{\\frac{f(1-f)}{n}} \\text{ } ; \\text{ } f + 1.96 \\sqrt{\\frac{f(1-f)}{n}} \\right]$$"}
            </div>
          </TipBanner>

          <InfoBlock type="reminder" title="Conditions de validité">
            Pour appliquer validement cette approximation de loi normale binomiale, les conditions d'effectifs suivantes doivent être impérativement satisfaites :
            <div className="font-mono text-xs font-bold text-center my-2 text-rose-700 dark:text-rose-400">
              {"$$n \\ge 30 \\quad , \\quad n f \\ge 5 \\quad , \\quad n(1-f) \\ge 5$$"}
            </div>
          </InfoBlock>
        </div>
      </Section>

      <Section title="3. Simulateur Interactif d'Intervalle de Confiance" color="purple" icon={<LineChart />}>
        <StatsInteractiveSim />
      </Section>

      <Section title="Exercices Résolus de Contrôle Qualité" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Intervalle appliqué aux défauts de puces électroniques"
          question={
            <>
              Un ingénieur de production inspecte un lot de microcontrôleurs. Sur un échantillon prélevé aléatoirement de {"$n = 400$"} composants, on détecte {"$16$"} pièces défectueuses.
              <br />
              1. Calculer la fréquence d'erreur ponctuelle {"$f$"} de l'échantillon.
              <br />
              2. Déterminer l'intervalle de confiance à un niveau de confiance de {"$95\\%$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul de la proportion d'erreur locale</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On identifie l'effectif {"$n = 400$"} et le nombre total de défauts {"$k = 16$"} :
              </p>
              <div className="font-mono text-center my-2.5 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$f = \\frac{16}{400} = 0.04 \\quad (4\\%)$$"}
              </div>
              <p className="text-xs text-slate-500">
                La proportion ponctuelle trouvée est de exactement 4% d'anomalies sur cet échantillon.
              </p>
            </>,
            <>
              <strong>Étape 2 : Vérification rigoureuse des conditions réglementaires</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Examinons si le lot permet d'appliquer la courbe normale en toute sécurité :
                <br />
                • {"$n = 400 \\ge 30$"} (Validé !)
                <br />
                • {"$n \\times f = 400 \\times 0.04 = 16 \\ge 5$"} (Validé !)
                <br />
                • {"$n \\times (1-f) = 400 \\times 0.96 = 384 \\ge 5$"} (Validé !)
              </p>
            </>,
            <>
              <strong>Étape 3 : Calcul de la marge et formulation finale de l'I.C.</strong>
              <p className="mt-1 text-sm leading-relaxed">
                Appliquons l'erreur standard pondérée :
                {"$$\\sigma_e = \\sqrt{\\frac{f(1-f)}{n}} = \\sqrt{\\frac{0.04 \\times 0.96}{400}} = \\sqrt{\\frac{0.0384}{400}} = \\sqrt{0.000096} \\approx 0.0098$$"}.
                <br />
                De là, la marge d'incertitude à 95% vaut :
                {"$$\\text{Marge} = 1.96 \\times 0.0098 \\approx 0.0192 \\quad (1.92\\%)$$"}
              </p>
              <div className="font-mono text-center my-2 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-sm md:text-base">
                {"$$I_{0.95} = [0.04 - 0.0192 \\text{ } ; \\text{ } 0.04 + 0.0192] = [2.08\\% \\text{ } ; \\text{ } 5.92\\%]$$"}
              </div>
              <p className="text-xs text-slate-500 italic mt-1.5">L'entreprise peut donc certifier avec un risque d'erreur contrôlé à 5% que le taux de défaut global réel de l'usine est d'au plus 5.92%.</p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Détermination de la taille idéale d'audit"
          question={
            <>
              Un service de support réseau audite le taux de satisfaction d'une plateforme web. On estime d'après l'historique que la proportion globale de clients satisfaits est d'environ {"$p = 0.80$"} (80%).
              <br />
              On souhaite affiner cette estimation en calculant un échantillon de taille {"$n$"} de sorte que la marge d'erreur visée à 95% ne dépasse pas la valeur stricte de {"$E = 0.02$"} (±2%).
              <br />
              Trouver l'échantillon minimal requis.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Poser l'équation de la marge d'erreur prescrite</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Ciblons les variables requises : {"$E = 0.02$"}, {"$p = 0.80$"} et {"$z = 1.96$"}.
                L'équation s'énonce :
              </p>
              <div className="font-mono text-center my-2.5 p-2 bg-slate-100 dark:bg-slate-800 rounded font-semibold">
                {"$$z \\sqrt{\\frac{p(1-p)}{n}} \\le E \\implies 1.96 \\sqrt{\\frac{0.80 \\times 0.20}{n}} \\le 0.02$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Isoler l'inconnue n à l'aide de l'algèbre</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Élevons chaque membre au carré pour faire sauter la racine complexe :
                <br />
                {"$$1.96^2 \\left( \\frac{0.16}{n} \\right) \\le 0.02^2$$"}
                <br />
                {"$$3.8416 \\times \\frac{0.16}{n} \\le 0.0004$$"}
                <br />
                {"$$\\frac{0.614656}{n} \\le 0.0004 \\implies n \\ge \\frac{0.614656}{0.0004}$$"}
              </p>
            </>,
            <>
              <strong>Étape 3 : Calcul final de la taille minimale de sondage</strong>
              <p className="text-sm mt-1">
                La division donne :
              </p>
              <div className="font-mono text-center my-2.5 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-750 dark:text-emerald-400 border rounded font-black text-lg">
                {"$$n \\ge 1536.64 \\implies n_{\\text{min}} = 1537\\text{ clients}$$"}
              </div>
              <p className="text-[11px] text-slate-500 italic mt-1">Remarque importante : Pour diviser par 2 l'erreur de nos estimations (de 4% à 2%), nous devons multiplier l'effectif total par une puissance géométrique de 4.</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon={<HelpCircle className="text-indigo-600 w-5 h-5"/>}>
        <AccordionFAQ items={[
          {
            question: "Quelle est la signification rigoureuse d'un intervalle de confiance à 95 % ?",
            answer: "Cela ne veut pas dire qu'il y a 95% de chances que l'un des paramètres précis soit dedans. Le paramètre réel p est fixe (il n'est pas aléatoire). Cela signifie que si on reproduit 100 fois une extraction d'échantillons sur la population totale, environ 95 de ces intervalles de confiance piégeront effectivement la valeur vraie moyenne ciblée."
          },
          {
            question: "Est-on obligé d'utiliser la loi normale pour tous les échantillons ?",
            answer: "Si l'effectif d'observation n est très petit (inférieur à 30), le T.C.L. ne converge pas de manière mathématiquement fiable. Dans ce cas, nous devons impérativement supposer que la population mère suit une loi normale d'origine et concevoir des calculs d'intervalles s'appuyant sur la loi de Student."
          },
          {
            question: "Pourquoi l'intervalle est-il d'autant plus large que le seuil de confiance augmente ?",
            answer: "C'est un arbitrage obligatoire. Si vous voulez un niveau de certitude extrême de ne pas vous tromper (par exemple 99% au lieu de 95%), la fenêtre physique calculée doit obligatoirement être plus large pour englober et capturer les valeurs extrêmes improbables, d'où z_critique = 2.576"
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formule de l'écart-type de fréquence standard f ?</>}
            back={<>L'estimé de fluctuation vaut exactement {"$\\sigma_f = \\sqrt{\\frac{f(1-f)}{n}}$"}. Sa valeur maximale absolue est au milieu théorique où f = 0.50.</>}
          />
          <Flashcard 
            front={<>Quel est l'impact théorique direct si on multiplie par 100 la taille globale de notre échantillon n ?</>}
            back={<>En multipliant n par 100, la racine carrée réduit la marge d'erreur E par un facteur exact de <strong>10</strong> (la fenêtre est 10 fois plus étroite, devenant ultra-précise).</>}
          />
        </div>
      </Section>

      <Section title="Quiz de Validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si sur 100 serveurs observés, la fréquence d'erreur constatée est f = 0.10. Quel est l'estimé d'écart-type d'échantillonnage de cette proportion ?",
              options: ["0.03 (soit 3%)", "0.09 (soit 9%)", "0.009 (soit 0.9%)"],
              correctAnswer: 0,
              explanation: "Calcul d'erreur standard : sqrt(0.1*0.9 / 100) = sqrt(0.09 / 100) = sqrt(0.0009) = 0.03 (soit exactement 3% d'écart-type)."
            },
            {
              question: "Quelle est la valeur critique z pour un intervalle de confiance bilatéral au seuil conventionnel de 99% ?",
              options: ["2.576", "1.96", "1.645"],
              correctAnswer: 0,
              explanation: "Le seuil d'intégration bilatérale laissant 0.5% d'erreur de part et d'autre de la courbe de Gauss est défini par x = 2.576 écarts-types."
            },
            {
              question: "Quelle taille d'échantillon minimale requiert au moins le Théorème Central Limite ?",
              options: ["n ≥ 30", "n ≥ 100", "n ≥ 10"],
              correctAnswer: 0,
              explanation: "Règle statistique conventionnelle universelle : pour n ≥ 30, la forme d'approximation par une loi normale est considérée exploitable en ingénierie."
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

export default Course_BTS_02_Statistiques_Inferentielles;
