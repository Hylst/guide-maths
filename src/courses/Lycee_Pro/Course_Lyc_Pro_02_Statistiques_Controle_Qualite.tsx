import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, BarChart3, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

// Interactive Quality Control Assembly Line Simulation
const QualityControlLine = () => {
  const [tolerance, setTolerance] = useState(0.8); // Tolerance interval in mm (0.2 to 2.0)
  
  // Static batch of 8 manufactured cylindrical metal axes. Target = 50.0 mm
  const baseParts = [
    { id: 1, label: "Axe #1", val: 50.1 },
    { id: 2, label: "Axe #2", val: 49.3 },
    { id: 3, label: "Axe #3", val: 50.0 },
    { id: 4, label: "Axe #4", val: 50.9 },
    { id: 5, label: "Axe #5", val: 49.8 },
    { id: 6, label: "Axe #6", val: 50.2 },
    { id: 7, label: "Axe #7", val: 48.9 },
    { id: 8, label: "Axe #8", val: 50.1 },
  ];

  // Compute stats on the current parts with the current tolerance bounds
  const results = useMemo(() => {
    const target = 50.0;
    const minVal = target - tolerance;
    const maxVal = target + tolerance;
    
    let accepted = 0;
    let rejected = 0;

    const partsWithStatus = baseParts.map(part => {
      const isAccepted = part.val >= minVal && part.val <= maxVal;
      if (isAccepted) accepted++;
      else rejected++;

      return {
        ...part,
        isAccepted,
        diff: part.val - target
      };
    });

    const rejectRate = (rejected / baseParts.length) * 100;

    return {
      parts: partsWithStatus,
      accepted,
      rejected,
      rejectRate,
      minVal,
      maxVal
    };
  }, [tolerance]);

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-4">
        Simulateur de Triage : Qualité Ligne d'Assemblage
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Ajustez l'intervalle de tolérance de fabrication pour trier automatiquement les arbres de transmission défectueux.
      </p>

      {/* Main Grid controls & visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Interactive Bounds controls */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-3">
              Intervalle de tolérance choisi : <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">±{tolerance.toFixed(1)} mm</span>
            </label>
            <input 
              type="range" 
              min="0.2" 
              max="2.0" 
              step="0.1"
              value={tolerance} 
              onChange={(e) => setTolerance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>Hautement Strict (±0.2mm)</span>
              <span>Tolérance Laxiste (±2.0mm)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Spécifications du produit :</h4>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
              <span>Cible standard idéale :</span>
              <strong className="font-mono text-slate-800 dark:text-slate-200">50.00 mm</strong>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Seuil inférieur acceptable :</span>
              <strong className="text-amber-600 font-mono">{(results.minVal).toFixed(2)} mm</strong>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Seuil supérieur acceptable :</span>
              <strong className="text-amber-600 font-mono">{(results.maxVal).toFixed(2)} mm</strong>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-2 border-t text-slate-750 dark:text-slate-200">
              <span>Taux de rebus (déchets) :</span>
              <span className={`font-mono ${results.rejectRate > 35 ? 'text-rose-500' : 'text-emerald-500'}`}>{results.rejectRate.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Right: Conveyor-belt graphic mockup */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">État du lot en direct</span>
          <div className="w-full h-56 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between shadow-inner">
            
            {/* Upper limit red line */}
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-rose-400 z-10 opacity-70" style={{ top: `${35 - tolerance * 15}%` }}>
              <span className="absolute right-2 -top-2.5 text-[8px] font-bold text-rose-500 bg-white px-1 border rounded">Tolérance Max</span>
            </div>

            {/* Target green line */}
            <div className="absolute left-0 right-0 border-t border-dashed border-emerald-400 z-10 opacity-40 top-[50%]" />

            {/* Lower limit red line */}
            <div className="absolute left-0 right-0 border-b-2 border-dashed border-rose-400 z-10 opacity-70" style={{ bottom: `${35 - tolerance * 15}%` }}>
              <span className="absolute right-2 -bottom-2.5 text-[8px] font-bold text-rose-500 bg-white px-1 border rounded">Tolérance Min</span>
            </div>

            {/* Simulated parts moving */}
            <div className="flex justify-center items-center gap-2 relative h-full">
              {results.parts.map((p, idx) => {
                // Compute y offset depending on the difference
                const yOffset = p.diff * 60; // scale factor
                return (
                  <motion.div 
                    key={p.id}
                    layoutId={`part-${p.id}`}
                    animate={{ y: yOffset }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-6 h-12 rounded-lg flex flex-col items-center justify-between p-1 shadow-sm border ${p.isAccepted ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/30 border-rose-500 text-rose-800 dark:text-rose-300'}`}
                  >
                    <span className="text-[7px] font-bold">#{p.id}</span>
                    <span className="text-[8px] font-mono leading-none">{p.val.toFixed(1)}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded animate-pulse" />
          </div>
          <span className="text-xs font-bold text-slate-400 mt-2 uppercase">Ligne de calibrage laser</span>
        </div>
      </div>
    </div>
  );
};

// Variable Custom Statistic Tool (Students increase and see calculations update)
const CustomStatsCalculator = () => {
  const [items, setItems] = useState<number[]>([120, 122, 119, 121, 120, 123, 118, 120]);

  const handleValChange = (index: number, action: 'inc' | 'dec') => {
    setItems(prev => {
      const next = [...prev];
      if (action === 'inc') next[index] += 1;
      else next[index] -= 1;
      return next;
    });
  };

  // Stats Computations
  const stats = useMemo(() => {
    // 1. Mean (Moyenne)
    const totalSum = items.reduce((acc, current) => acc + current, 0);
    const mean = totalSum / items.length;

    // 2. Range (Étendue)
    const sorted = [...items].sort((a, b) => a - b);
    const minVal = sorted[0];
    const maxVal = sorted[sorted.length - 1];
    const range = maxVal - minVal;

    // 3. Median (Médiane)
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];

    return {
      sum: totalSum,
      mean,
      range,
      median,
      minVal,
      maxVal
    };
  }, [items]);

  return (
    <div className="bg-card border-2 border-slate-150 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 justify-center">
        <BarChart3 className="text-indigo-600"/> Calculateur de Statistiques d'Échantillons
      </h3>
      <p className="text-slate-500 text-xs text-center mb-6">
        Modifiez les valeurs mesurées des pièces ci-dessous pour actualiser instantanément l'analyse statistique (Moyenne, Médiane et Étendue).
      </p>

      {/* Value grids */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
        {items.map((val, idx) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 flex flex-col items-center shadow-sm">
            <span className="text-[9px] font-bold text-slate-400 mb-1">Pièce {idx+1}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{val}</span>
            <div className="flex gap-1 mt-1.5 border-t pt-1.5 w-full justify-center">
              <button 
                onClick={() => handleValChange(idx, 'dec')}
                className="w-5 h-5 bg-card border rounded flex items-center justify-center text-xs text-slate-500 font-bold hover:bg-slate-100 transition shadow-sm"
              >
                -
              </button>
              <button 
                onClick={() => handleValChange(idx, 'inc')}
                className="w-5 h-5 bg-card border rounded flex items-center justify-center text-xs text-slate-500 font-bold hover:bg-slate-100 transition shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Calculations results */}
      <BentoGrid>
        <BentoCard title="Moyenne (Position)" icon={<HelpCircle className="w-4 h-4" />} color="slate">
          <div className="font-bold text-xl text-slate-800 dark:text-white font-mono">
            {stats.mean.toFixed(2)}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Somme des valeurs divisée par l'effectif total.</p>
        </BentoCard>

        <BentoCard title="Médiane (Position)" icon={<ShieldCheck className="w-4 h-4" />} color="indigo">
          <div className="font-bold text-xl text-indigo-700 dark:text-indigo-300 font-mono">
            {stats.median.toFixed(1)}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Valeur centrale séparant la série en deux lots égaux.</p>
        </BentoCard>

        <BentoCard title="Étendue (dispersion)" icon={<AlertTriangle className="w-4 h-4" />} color="rose">
          <div className="font-bold text-xl text-rose-700 dark:text-rose-300 font-mono">
            {stats.range}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Différence : max ({stats.maxVal}) - min ({stats.minVal}).</p>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

const Course_Lyc_Pro_02_Statistiques_Controle_Qualite: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Professionnel/02_Lyc_Pro_02_Statistiques_Controle_Qualite.md";

  const checklistItems = [
    "Identifier la population, l'échantillon et le caractère de l'étude.",
    "Calculer la moyenne arithmétique d'une série statistique de mesures.",
    "Déterminer la médiane d'une série après classement croissant.",
    "Interpréter l'indicateur de dispersion de l'étendue.",
    "Calculer un pourcentage de pièces hors tolérance (taux de rebus).",
    "Prendre des décisions d'arrêt ou de validation de chaîne de production basées sur les données."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="QC" 
        title="Statistiques & Contrôle Qualité" 
        subtitle="Appliquer les indicateurs fondamentaux pour inspecter la conformité et la stabilité des pièces en usine."
        level="Lycée Professionnel"
        duration="2h"
        objectives={[
          "Savoir calculer la moyenne d'un échantillonnage de pièces industrielles.",
          "Déterminer et comprendre l'indicateur de dispersion de l'étendue.",
          "Comprendre et utiliser le concept d'intervalle de tolérance en fabrication.",
          "Savoir exploiter des fréquences pour chiffrer les pourcentages de déchet (taux de rebuts)."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Comment ordonner une série statistique">
        Avant de calculer une médiane, rappelle-toi qu&apos;il faut obligatoirement classer toutes les valeurs de la série dans l&apos;ordre croissant ! La médiane est le filtre central : si l&apos;effectif est pair, on prend la moyenne des deux valeurs du milieu. Si l&apos;effectif est impair, la médiane est la valeur centrale parfaite.
      </InfoBlock>

      <InfoBlock type="funfact" title="Le saviez-vous ? L'origine industrielle des statistiques modernes">
        La plupart des méthodes statistiques de contrôle qualité modernes ont été créées en 1924 par l&apos;ingénieur américain Walter Shewhart aux célèbres usines de la compagnie Bell (inventeur du téléphone). Bell fabriquait des milliers de commutateurs physiques complexes et devait s&apos;assurer de leur fiabilité sans avoir besoin de tester absolument chaque relais métallique individuellement, ce qui aurait coûté trop cher ! Shewhart a ainsi inventé la légendaire « carte de contrôle ».
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : La méthode du Six Sigma (6σ)">
        Dans les grandes multinationales industrielles (automobile, microprocesseurs, aéronautique), on applique le concept très célèbre du <strong>Six Sigma</strong>. Le but ultime de cette démarche est d&apos;ajuster les tolérances et d&apos;éliminer la dispersion pour qu&apos;il n&apos;y ait pas plus de 3,4 pièces défectueuses par million de pièces fabriquées ! Cela requiert une maîtrise mathématique totale de l&apos;étendue et de la distribution statistique.
      </InfoBlock>

      <InfoBlock type="info" title="L'importance de la régularité statistique">
        En usine de haute précision, aucune pièce fabriquée n'est rigoureusement identique à la précédente (usure d'outils, micro-vibrations). Un bon technicien n'exige pas le produit parfait absolu, mais un produit **statistiquement maitrisé**, dont la moyenne et l'étendue restent à l'intérieur de balises de tolérance strictes.
      </InfoBlock>

      <Section title="1. Indicateurs de Centre : Moyenne et Médiane" color="slate" icon={<BarChart3 className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Les indicateurs de position (ou tendance centrale) caractérisent le centre d'une distribution de données.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl">
              <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-2">La Moyenne Arithmétique</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Elle représente la somme de toutes les observations divisée par le nombre total de pièces étudiées (l'effectif total {"$N$"}).
              </p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-black rounded border font-bold text-indigo-600">
                {"$$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_N}{N}$$"}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl">
              <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-2">La Médiane</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                C'est la valeur centrale divisant l'échantillon trié par ordre croissant en deux groupes de même effectif (50% inférieurs, 50% supérieurs).
              </p>
              <p className="text-xs text-slate-500 italic">
                *Remarque :* Si l'effectif est pair, la médiane correspond à la moyenne du couple de valeurs centrales.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="2. Indicateur de Dispersion : L'Étendue" color="rose" icon="📏">
        <div className="space-y-4">
          <p>
            Alors que la moyenne et la médiane résument le centre des observations, l'**étendue** exprime la largeur du nuage de points statistique ou sa dispersion globale.
          </p>

          <InfoBlock type="definition" title="Formule de l'Étendue">
            L'étendue d'une série est la différence mathématique directe existant entre la valeur la plus grande (le maximum) et la valeur la plus petite (le minimum) de la série :
            <div className="font-mono text-center my-3 bg-slate-100 dark:bg-slate-950 p-2 rounded border text-indigo-700 dark:text-indigo-400">
              {"$$\\text{Étendue} = \\text{Valeur Max} - \\text{Valeur Min}$$"}
            </div>
            Dans un contrôle qualité, une étendue trop grande trahit une instabilité majeure de la machine d'usinage (ex : jeu mécanique, vibrations).
          </InfoBlock>
        </div>
      </Section>

      <Section title="3. L'Échantillon interactif à modifier" color="indigo" icon={<Settings />}>
        <CustomStatsCalculator />
      </Section>

      <Section title="4. L'Intervalle de Tolérance Industrielle" color="emerald" icon="🏭">
        <div className="space-y-4">
          <p>
            Les ingénieurs bureaux d'études dictent toujours une **valeur nominale cible** flanquée d'un **intervalle de tolérance**. Les pièces en dehors de cet intervalle sont classées comme rebuts.
          </p>
          <TipBanner type="warning" title="Risque Industriel : Pièces Hors-Cotes">
            Si l'étendue d'un échantillon dépasse l'intervalle de tolérance autorisé, vous devez impérativement arrêter la production à l'usine pour calibrer à nouveau l'ensemble des fraiseuses ou des tours CNC.
          </TipBanner>
          <QualityControlLine />
        </div>
      </Section>

      <Section title="Exercices Industriels Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Calcul de Tolérance et Décision de Production"
          question={
            <>
              Un constructeur aéronautique cherche à valider un lot de bagues de serrage en téflon. La cote exigée est de {"$24\\text{ mm}$"} avec une tolérance admissible de {"$\\pm 0.3\\text{ mm}$"}.
              Un contrôleur en bout de ligne prélève un échantillon de 5 pièces et relève :
              <br />
              <strong>Lot de mesures : </strong> 24.1mm, 23.8mm, 24.0mm, 24.4mm, 23.9mm.
              <br />
              1. Définir les seuils minimum et maximum tolérés par le cahier des charges.
              <br />
              2. Détecter si des pièces de cet échantillon sont réputées hors-cotes de fabrication.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul des valeurs limites de tolérance</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le constructeur autorise un écart maximal de {"$0.3\\text{ mm}$"} par rapport à la cible {"$24\\text{ mm}$"} :
                <br />
                • {"$\\text{Limite de Tolérance Minimale (LMin)} = 24 - 0.3 = 23.7\\text{ mm}$"}.
                <br />
                • {"$\\text{Limite de Tolérance Maximale (LMax)} = 24 + 0.3 = 24.3\\text{ mm}$"}.
              </p>
            </>,
            <>
              <strong>Étape 2 : Filtrer les pièces défectueuses</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Revue des dimensions mesurées une par une vis-à-vis des balises {"$[23.7\\text{ ; } 24.3]$"} :
                <br />
                • 24.1mm, 23.8mm, 24.0mm, 23.9mm sont à l'intérieur de l'intervalle (Conformes).
                <br />
                • **24.4mm** dépasse la limite maximale autorisée (24.3mm). Cette pièce est non-conforme (défectueuse).
              </p>
              <div className="font-mono text-center my-2 p-2 bg-rose-50 dark:bg-rose-900/10 text-rose-700 dark:text-rose-400 border rounded">
                {"$$\\text{Taux de rebuts} = \\frac{1}{5} \\times 100 = 20\\%$$"}
              </div>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Comparaison de deux séries"
          question={
            <>
              Deux robots d'emballage différents A et B conditionnent des boîtes de conserve de {"$400\\text{ g}$"}. On étudie le poids moyen et l'étendue sur un échantillon de 6 boîtes par robot :
              <br />
              • **Robot A :** moyenne de {"$401\\text{ g}$"}, étendue de {"$1.5\\text{ g}$"}.
              <br />
              • **Robot B :** moyenne de {"$400.5\\text{ g}$"}, étendue de {"$8.0\\text{ g}$"}.
              <br />
              Quel robot s'avère être le plus fiable d'un point de vue de la régularité industrielle ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Analyser les moyennes de poids des conserves</strong>
              <p className="mt-2 text-sm">
                Les deux moyennes ({"$401\\text{ g}$"} et {"$400.5\\text{ g}$"}) sont extrêmement proches du poids contractuel cible de {"$400\\text{ g}$"}. Le critère de la moyenne seule ne permet pas de départager la fiabilité structurelle des machines.
              </p>
            </>,
            <>
              <strong>Étape 2 : Analyser la dispersion (l'étendue)</strong>
              <p className="mt-2 text-sm leading-relaxed">
                L'étendue du Robot A est minuscule ({"$1.5\\text{ g}$"}), cela garantit que toutes ses conserves pèsent approximativement entre 400g et 402g.
                <br />
                L'étendue du Robot B de {"$8.0\\text{ g}$"} révèle un problème récurrent de dispersion de poids (certaines conserves risquent de ne faire que 396g et d'autres 404g).
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded border font-bold">
                {"$$\\text{Étendue}_A (1.5\\text{g}) \\ll \\text{Étendue}_B (8.0\\text{g})$$"}
              </div>
              <p className="text-sm mt-1">Le <strong>Robot A</strong> est largement le plus stable et le plus fiable.</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Est-ce qu'une valeur moyenne peut être impactée par une seule pièce aberrante ?",
            answer: "Oui, absolument ! La moyenne arithmétique est qualifiée de très sensible aux valeurs extrêmes. Si une pièce rate complètement d'une façon gigantesque, elle va faire glisser la moyenne à elle seule, alors que la médiane y résistera parfaitement."
          },
          {
            question: "Quelle décision prendre si la moyenne de l'échantillon est bonne mais l'étendue est mauvaise ?",
            answer: "C'est un signal d'alerte critique. Même si en moyenne les pièces semblent bien chargées, l'étendue large trahit le fait qu'il y a des pièces extrêmes trop grandes et d'autres trop petites. La machine de coupe a un jeu d'axe ou une usure importante des dents de coupe. Il faut calibrer l'outil ou le changer."
          },
          {
            question: "À quoi sert l'utilisation de la médiane au lieu de la moyenne ?",
            answer: "La médiane partage l'effectif en deux parts équitables. Elle permet d'attester de la vraie régularité d'une chaîne sans laisser les rebuts anormaux (pièces très ratées) biaiser entièrement la représentation de la série."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Qu'est-ce qu'un effectif en statistiques ?</>}
            back={<>L'effectif représente le nombre total d'observations recueillies lors d'une étude de prélèvements (noté <strong>N</strong>).</>}
          />
          <Flashcard 
            front={<>Comment s'appelle l'écart de soustraction entre la valeur la plus haute et la plus basse ?</>}
            back={<>C'est l'<strong>Étendue</strong> d'une série statistique, qui quantifie l'erreur de dispersion de la chaîne.</>}
          />
        </div>
      </Section>

      <Section title="Quiz de validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si l'on ordonne 5 pièces : 10mm, 12mm, 13mm, 15mm, 19mm. Quelle est la médiane de cette série ?",
              options: ["13 mm", "13.8 mm (la moyenne)", "12 mm (la deuxième)"],
              correctAnswer: 0,
              explanation: "Comme le nombre de pièces est égal à 5 (impair), la médiane est exactement l'élément central en position (5+1)/2 = 3ème, à savoir 13 mm."
            },
            {
              question: "Quelle est l'étendue de la série statistique de poids suivants : 40g, 42g, 39g, 45g, 40g ?",
              options: ["5g", "6g (45g - 39g)", "40g (poids récurrent)"],
              correctAnswer: 1,
              explanation: "La valeur maximale est 45g et la minimale est 39g. L'étendue vaut donc la différence directe : 45g - 39g = 6g."
            },
            {
              question: "Dans une production de 500 axes, on prélève 25 pièces pour analyse. Les 25 pièces constituent :",
              options: ["La population globale", "L'échantillon d'enquête", "Le caractère quantitatif"],
              correctAnswer: 1,
              explanation: "Les 500 axes fabriqués sont la population entière de l'étude, tandis que les 25 pièces prélevées représentent l'échantillon."
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

export default Course_Lyc_Pro_02_Statistiques_Controle_Qualite;
