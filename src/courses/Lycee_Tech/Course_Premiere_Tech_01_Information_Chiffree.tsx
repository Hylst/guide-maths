import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ArrowRightLeft, Percent, HelpCircle, Activity, ChevronRight, Calculator } from 'lucide-react';
import confetti from 'canvas-confetti';

// Interactive Successive & Reciprocal Evolution Simulator
const EvolutionSimulator = () => {
  const [initialValue, setInitialValue] = useState<number>(100);
  const [rate1, setRate1] = useState<number>(20); // rate 1 in %
  const [rate2, setRate2] = useState<number>(-10); // rate 2 in %

  const results = useMemo(() => {
    // CM1 & CM2
    const cm1 = 1 + rate1 / 100;
    const cm2 = 1 + rate2 / 100;
    // Intermediary value
    const IntermediaryValue = initialValue * cm1;
    // Final value
    const finalValue = IntermediaryValue * cm2;
    // Global CM
    const cmGlobal = cm1 * cm2;
    // Global Rate in %
    const rateGlobal = (cmGlobal - 1) * 100;
    // Reciprocal CM
    const cmReciprocal = 1 / cmGlobal;
    // Reciprocal Rate in %
    const rateReciprocal = (cmReciprocal - 1) * 100;

    return {
      cm1,
      cm2,
      IntermediaryValue,
      finalValue,
      cmGlobal,
      rateGlobal,
      cmReciprocal,
      rateReciprocal
    };
  }, [initialValue, rate1, rate2]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-4">
        Simulateur d'Évolutions Successives et Réciproques
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Modifiez les taux d'évolution successifs pour visualiser l'impact global et calculer instantanément le taux retour (réciproque).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left column: Controls */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Valeur Initiale (ex. Prix HT) : <span className="text-indigo-605 font-mono font-black">{initialValue} €</span>
              </label>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                step="10"
                value={initialValue} 
                onChange={(e) => setInitialValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Taux d'Évolution 1 : <span className={`font-mono font-black ${rate1 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{rate1 >= 0 ? '+' : ''}{rate1}%</span>
              </label>
              <input 
                type="range" 
                min="-50" 
                max="150" 
                step="5"
                value={rate1} 
                onChange={(e) => setRate1(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Taux d'Évolution 2 : <span className={`font-mono font-black ${rate2 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{rate2 >= 0 ? '+' : ''}{rate2}%</span>
              </label>
              <input 
                type="range" 
                min="-50" 
                max="150" 
                step="5"
                value={rate2} 
                onChange={(e) => setRate2(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950/40 space-y-3">
            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator size={14} /> Coefficients Multiplicateurs (CM) :
            </h4>
            <div className="flex justify-between text-xs">
              <span>Coeff. Multiplicateur 1 ({"$C_{M1}$"}) :</span>
              <strong className="font-mono text-slate-800 dark:text-slate-100">{results.cm1.toFixed(4)}</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span>Coeff. Multiplicateur 2 ({"$C_{M2}$"}) :</span>
              <strong className="font-mono text-slate-800 dark:text-slate-100">{results.cm2.toFixed(4)}</strong>
            </div>
            <div className="flex justify-between text-xs border-t border-indigo-100 dark:border-indigo-900 pt-2 font-bold text-indigo-700 dark:text-indigo-300">
              <span>Coeff. Global ({"$C_{Mg}$"}) :</span>
              <span className="font-mono">{results.cmGlobal.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Right column: Flow Diagram Representation */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Visualisation du Flux</span>
          
          <div className="w-full flex flex-col space-y-4 items-stretch p-4 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
            {/* Step 1: Initial */}
            <div className="flex justify-between items-center p-2.5 bg-white dark:bg-slate-900 border rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 font-bold">Valeur Initiale</span>
              <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">{initialValue.toFixed(2)} €</span>
            </div>

            {/* Transition 1 */}
            <div className="flex flex-col items-center justify-center -my-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rate1 >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                {rate1 >= 0 ? '×' : '×'} {results.cm1.toFixed(4)} ({rate1 >= 0 ? '+' : ''}{rate1}%)
              </span>
              <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-705"></div>
            </div>

            {/* Step 2: Intermediary */}
            <div className="flex justify-between items-center p-2.5 bg-white dark:bg-slate-900 border rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 font-bold">Valeur Niveau 1</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{results.IntermediaryValue.toFixed(2)} €</span>
            </div>

            {/* Transition 2 */}
            <div className="flex flex-col items-center justify-center -my-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rate2 >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                {rate2 >= 0 ? '×' : '×'} {results.cm2.toFixed(4)} ({rate2 >= 0 ? '+' : ''}{rate2}%)
              </span>
              <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-705"></div>
            </div>

            {/* Step 3: Final */}
            <div className="flex justify-between items-center p-2.5 bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded-xl shadow-sm">
              <span className="text-xs text-indigo-700 dark:text-indigo-300 font-black">Valeur Finale</span>
              <span className="font-mono font-black text-indigo-700 dark:text-indigo-300">{results.finalValue.toFixed(2)} €</span>
            </div>

            {/* Global & Reciprocal summary cards inside the box */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mt-1 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Évolution Globale :</span>
                <span className={`font-bold font-mono ${results.rateGlobal >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {results.rateGlobal >= 0 ? '+' : ''}{results.rateGlobal.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center bg-indigo-500/10 dark:bg-indigo-500/15 p-2 rounded-lg border border-indigo-400/20">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                  <ArrowRightLeft size={12} /> Évolution Réciproque :
                </span>
                <span onClick={triggerConfetti} className="font-bold font-mono text-indigo-700 dark:text-indigo-300 cursor-pointer hover:underline">
                  {results.rateReciprocal >= 0 ? '+' : ''}{results.rateReciprocal.toFixed(2)}%
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Course_Premiere_Tech_01_Information_Chiffree: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Technologique/01_Premiere_Tech_01_Information_Chiffree.md";

  const checklistItems = [
    "Démontrer qu'une sous-population représente une proportion globale (proportion de proportions).",
    "Associer un taux d'évolution à son coefficient multiplicateur réciproque.",
    "Calculer un taux d'évolution globale après deux hausses ou baisses successives.",
    "Déterminer et appliquer le taux d'évolution réciproque pour ramener à la valeur initiale.",
    "Lire, dresser et analyser des tableaux d'indices d'évolution de prix."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="INF" 
        title="Information Chiffreé" 
        subtitle="Maîtriser les proportions de proportions, les évolutions successives, les coefficients multiplicateurs et les taux réciproques."
        level="Première Technologique"
        duration="2h"
        objectives={[
          "Interpréter les proportions d'une sous-population au sein d'un ensemble de référence.",
          "Faire le lien rigoureux entre un taux d'évolution en pourcentage et le coefficient multiplicateur.",
          "Modéliser et calculer des successions de hausses ou baisses à l'aide des produits de coefficients.",
          "Calculer à coup sûr le taux d'évolution réciproque et l'appliquer en gestion."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Comment transformer un pourcentage en décimal">
        Pour effectuer rapidement tes calculs, souviens-toi qu&apos;exprimer une part ou une proportion de {"$t\\%$"} revient simplement à diviser par 100 : {"$\\frac{t}{100}$"}. Par exemple, 15 % s&apos;écrit mathématiquement 0,15 et 3 % s&apos;écrit 0,03 !
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : Les pièges du taux d'évolution global">
        Si une action en bourse perd 50 % de sa valeur puis gagne à nouveau 50 % le lendemain, l&apos;investisseur non averti pourrait penser qu&apos;il a retrouvé sa mise de départ. C&apos;est une illusion d&apos;optique financière ! 
        <br />En réalité, les coefficients successifs donnent un multiplicateur global de : 
        <br /><code>{"$C_G = 0.50 \\times 1.50 = 0.75$"}</code>, ce qui correspond à une perte nette et irrémédiable de 25 % ! Pour annuler une baisse de 50 %, il faut une hausse compensatrice de 100 % !
      </InfoBlock>

      <InfoBlock type="info" title="L'Information Chiffrée : L'œil du gestionnaire et du décideur">
        Qu'il s'agisse de mesurer la progression d'un chiffre d'affaires, la part d'un groupe industriel sur un marché ou l'inflation sur les matières premières, les pourcentages et les indices sont partout. Maîtriser ces outils évite les erreurs de décision fréquentes, comme celle de croire qu'une baisse de 20% est compensée par une hausse de 20%.
      </InfoBlock>

      <Section title="1. Proportions et Sous-populations" color="slate" icon={<Percent className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Soit un ensemble de référence {"$E$"} de taille {"$N_E$"}, contenant un sous-ensemble {"$A$"} de taille {"$N_A$"}, lui-même contenant un sous-ensemble {"$B$"} de taille {"$N_B$"}.
          </p>

          <BentoGrid>
            <BentoCard title="Proportion Simple" color="slate">
              <p className="text-sm mb-2">La proportion de la sous-population {"$A$"} dans la population {"$E$"} est :</p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold">
                {"$$p = \\frac{N_A}{N_E}$$"}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">La valeur est toujours comprise entre 0 et 1. On l'exprime souvent en pourcentage en multipliant par 100.</p>
            </BentoCard>

            <BentoCard title="Proportion de Proportions" color="indigo">
              <p className="text-sm mb-2">Si {"$B$"} représente une proportion {"$p_1$"} de {"$A$"}, et {"$A$"} représente une proportion {"$p_2$"} de {"$E$"} :</p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold">
                {"$$p_{\\text{global}} = p_1 \\times p_2$$"}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">La proportion de {"$B$"} dans l'ensemble de référence total {"$E$"} s'obtient donc en multipliant les proportions individuelles.</p>
            </BentoCard>
          </BentoGrid>

          <InfoBlock type="funfact" title="Le saviez-vous ?">
            Si dans une entreprise technologique, 40% des salariés sont dans l'équipe d'ingénierie, et que parmi ces ingénieurs, 25% travaillent spécifiquement sur de l'Intelligence Artificielle. Alors la proportion globale de spécialistes IA dans l'entreprise entière est simplement de :
            <div className="font-mono text-center p-1.5 my-2 bg-slate-100 dark:bg-slate-950 rounded font-black text-indigo-600">
              {"$$0.40 \\times 0.25 = 0.10 \\implies 10\\%$$"}
            </div>
            Cela illustre parfaitement les formules de proportions imbriquées !
          </InfoBlock>
        </div>
      </Section>

      <Section title="2. Taux d'Évolution et Coefficient Multiplicateur" color="indigo" icon={<TrendingUp className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Pour traduire mathématiquement une variation absolue d'une grandeur passant de sa valeur de départ {"$V_D$"} à sa valeur d'arrivée {"$V_A$"}, on introduit deux indicateurs clés.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 p-5 rounded-2xl">
              <h4 className="font-bold text-sm text-indigo-750 dark:text-indigo-300 mb-2">Taux d'Évolution (rate)</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Le taux de variation (ou taux de croissance) mesure l'évolution relative par rapport à la valeur de départ.
              </p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-black rounded border font-bold text-indigo-600">
                {"$$t = \\frac{V_A - V_D}{V_D}$$"}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 p-5 rounded-2xl">
              <h4 className="font-bold text-sm text-indigo-750 dark:text-indigo-300 mb-2">Coefficient Multiplicateur (CM)</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                C'est le facteur unique par lequel on doit multiplier la valeur de départ {"$V_D$"} pour obtenir la valeur d'arrivée {"$V_A$"}.
              </p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-black rounded border font-bold text-indigo-600">
                {"$$C_M = \\frac{V_A}{V_D} = 1 + t$$"}
              </div>
            </div>
          </div>

          <TipBanner type="warning" title="Évolution à taux négatifs">
            Si le taux {"$t$"} exprime une baisse, il s'exprime sous forme négative. Ainsi, une remise de 12% correspond à un taux {"$t = -0.12$"} et son coefficient multiplicateur associé vaut :
            <div className="font-mono text-center font-bold text-indigo-600 py-1">
              {"$C_M = 1 + (-0.12) = 0.88$"}
            </div>
          </TipBanner>
        </div>
      </Section>

      <Section title="3. Simulateur Interactif d'Évolution Globale" color="purple" icon={<Activity />}>
        <EvolutionSimulator />
      </Section>

      <Section title="4. Évolutions Successives et Réciproques" color="rose" icon={<ArrowRightLeft className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Lorsque plusieurs variations (hausses ou baisses) s'appliquent de manière consécutive dans le temps.
          </p>

          <InfoBlock type="definition" title="Formule d'Évolution Successive">
            Si une grandeur subit plusieurs évolutions successives de taux {"$t_1, t_2, \\dots, t_n$"}, son coefficient multiplicateur global est égal au **produit** des coefficients multiplicateurs individuels :
            <div className="font-mono text-center my-3 bg-slate-100 dark:bg-slate-950 p-2.5 rounded border text-indigo-700 dark:text-indigo-400">
              {"$$C_{Mg} = C_{M1} \\times C_{M2} \\times \\dots \\times C_{Mn}$$"}
            </div>
            Le taux de variation global de cette suite s'obtient alors de manière finale par :
            <div className="font-mono text-center my-3 bg-slate-100 dark:bg-slate-950 p-2.5 rounded border text-indigo-700 dark:text-indigo-400">
              {"$$t_{\\text{global}} = C_{Mg} - 1$$"}
            </div>
          </InfoBlock>

          <InfoBlock type="reminder" title="L'Évolution Réciproque (Retour mathématique)">
            Pour ramener une valeur d'arrivée {"$V_A$"} à son niveau de départ initial {"$V_D$"}, on applique le **coefficient multiplicateur réciproque** :
            <div className="font-mono text-center my-3 bg-slate-100 dark:bg-slate-950 p-2.5 rounded border text-indigo-700 dark:text-indigo-400">
              {"$$C_{\\text{réciproque}} = \\frac{1}{C_{Mg}}$$"}
            </div>
            Le taux réciproque correspondant est alors calculé par :
            <div className="font-mono text-center my-3 bg-slate-100 dark:bg-slate-950 p-2.5 rounded border text-indigo-700 dark:text-indigo-400">
              {"$$t_{\\text{réciproque}} = C_{\\text{réciproque}} - 1 = \\frac{1}{C_{Mg}} - 1$$"}
            </div>
          </InfoBlock>
        </div>
      </Section>

      <Section title="Exercices de Gestion Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Successions d'évolutions et mythe de l'annulation"
          question={
            <>
              Le prix d'une carte graphique professionnelle subit une première augmentation de {"$20\\%$"} pendant la pénurie de semi-conducteurs, puis une baisse de {"$20\\%$"} lors du retour à la normale.
              <br />
              1. Le prix revient-il à sa valeur initiale à l'issue de ces deux variations consécutives ?
              <br />
              2. Déterminer la variation globale en pourcentage subie par le produit.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calculer les coefficients multiplicateurs individuels</strong>
              <p className="mt-2 text-sm">
                La hausse de {"$20\\%$"} correspond à :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$C_{M1} = 1 + \\frac{20}{100} = 1.20$$"}
              </div>
              <p className="text-sm">
                La baisse de {"$20\\%$"} correspond à :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$C_{M2} = 1 - \\frac{20}{100} = 0.80$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Calculer le coefficient global</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le coefficient multiplicateur global est le produit cumulé :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$C_{Mg} = C_{M1} \\times C_{M2} = 1.20 \\times 0.80 = 0.96$$"}
              </div>
              <p className="text-xs text-slate-500">Comme le coefficient global est de 0.96 et non de 1.00, le prix n'a pas retrouvé sa valeur initiale.</p>
            </>,
            <>
              <strong>Étape 3 : Calculer le taux global d'évolution</strong>
              <p className="mt-2">
                On soustrait 1 au coefficient multiplicateur global :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-lg">
                {"$$t_{\\text{global}} = 0.96 - 1 = -0.04 \\implies -4\\%$$"}
              </div>
              <p className="text-sm mt-1">Au global, le matériel informatique a subi une baisse globale nette de <strong>4%</strong>.</p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Taux réciproque de la TVA immobilière"
          question={
            <>
              Un cabinet comptable audite un projet de construction bois. Le prix TTC (Toutes Taxes Comprises) d'un lot est de {"$240\\,000\\text{ €}$"}. Le taux de TVA d'application standard en France est de {"$20\\%$"}.
              <br />
              1. Trouver la proportion et le coefficient multiplicateur réciproque qui permet de déduire la TVA de façon simplifiée afin de retrouver le prix de base HT (Hors Taxes).
              <br />
              2. Calculer le montant exact en Euros payé au titre de la TVA.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Lien entre HT et TTC</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le passage du montant HT au TTC équivaut à une augmentation de de {"$20\\%$"}, soit :
                <br />
                {"$\\text{TTC} = \\text{HT} \\times 1.20$"}.
              </p>
            </>,
            <>
              <strong>Étape 2 : Utiliser le coefficient réciproque</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Pour retrouver la valeur HT à partir du TTC, on applique la multiplication réciproque par le diviseur direct :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-150 rounded">
                {"$$C_{\\text{réciproque}} = \\frac{1}{1.20} \\approx 0.8333$$"}
              </div>
              <p className="text-xs text-slate-500">Ainsi : {"$\\text{HT} = \\frac{\\text{TTC}}{1.20}$"}.</p>
            </>,
            <>
              <strong>Étape 3 : Chiffrage numérique et TVA</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On applique la formule aux données financières :
                <br />
                • {"$\\text{Prix HT} = \\frac{240\\,000}{1.20} = 200\\,000\\text{ €}$"}.
                <br />
                Le montant réel de la taxe représente le reliquat :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-base">
                {"$$\\text{Montant TVA} = 240\\,000 - 200\\,000 = 40\\,000\\text{ €}$$"}
              </div>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Pourquoi est-ce faux d'additionner les pourcentages d'évolution successifs ?",
            answer: "Parce que chaque nouvelle évolution s'applique sur la dernière valeur calculée révisée (la valeur intermédiaire) et non pas sur la valeur brute initiale. Additionner les pourcentages revient à ignorer cet effet d'intérêts de composition mathématique."
          },
          {
            question: "Qu'est-ce qu'un indice d'évolution et comment l'utilise-t-on ?",
            answer: "Un indice de base 100 est un outil de mesure pratique pour observer les fluctuations temporelles sans s'encombrer de monnaies différentes. L'indice se calcule comme la proportion : base_t = (Val_t / Val_base) * 100. Ainsi, si un indice vaut 108 au bout d'un an, cela représente instantanément une hausse de 8% par rapport à l'instant de base."
          },
          {
            question: "Quelle est la formule du taux réciproque d'une hausse complexe ?",
            answer: "Si une hausse a multiplié par 4 le prix (comme dans les crypto-monnaies), la valeur a été multipliée par CM = 4. L'inverse vaut 1/4 = 0.25 (donc CM_recip = 0.25). Le taux réciproque est 0.25 - 1 = -0.75, soit une baisse nécessaire de 75% pour ramener le cours à l'initial !"
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quel est le coefficient multiplicateur d'une baisse de 15% ?</>}
            back={<>Le coefficient multiplicateur vaut {"$1 - 0.15 = \\mathbf{0.85}$"}.</>}
          />
          <Flashcard 
            front={<>Si le CM global de deux évolutions successives vaut 1.05, quelle est la hausse cumulée en % ?</>}
            back={<>La hausse cumulée vaut {"$(1.05 - 1) \\times 100 = \\mathbf{5\\%}$"}.</>}
          />
        </div>
      </Section>

      <Section title="Quiz de validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si 12% des habitants d'une métropole sont étudiants, et 60% d'entre eux possèdent un abonnement de vélo en libre service. Quel est le pourcentage global d'habitants étudiants cyclistes ?",
              options: ["7.2%", "15%", "5%"],
              correctAnswer: 0,
              explanation: "On multiplie les deux proportions : 0.12 × 0.60 = 0.072, ce qui représente exactement 7.2% de la métropole globale."
            },
            {
              question: "Quel coefficient multiplicateur correspond à une hausse de 150% d'une matière première ?",
              options: ["1.50", "2.50", "0.50"],
              correctAnswer: 1,
              explanation: "C'est 1 + 150/100 = 1 + 1.50 = 2.50. Attention, la quantité double et s'accroît encore de moitié."
            },
            {
              question: "Pour compenser une baisse de 50% sur le prix d'un article, de combien doit-on augmenter le prix réduit pour retrouver la valeur initiale ?",
              options: ["De 50%", "De 100%", "De 150%"],
              correctAnswer: 1,
              explanation: "Baisse de 50% correspond à CM = 0.50. Le coefficient réciproque est 1/0.50 = 2.00, ce qui équivaut à un doublement, soit une hausse de (2 - 1) × 100 = 100%."
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

export default Course_Premiere_Tech_01_Information_Chiffree;
