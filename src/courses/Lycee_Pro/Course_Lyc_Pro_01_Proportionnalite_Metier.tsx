import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Layers, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// Concrete Mixer Interactive Gauge SVG
const ConcreteDosageSim = () => {
  const [volume, setVolume] = useState(150); // Concrete volume in Liters (50 to 500)

  // Standard proportions per Liter of finished concrete
  // Densities/dosages: 350 kg cement, 700 kg sand, 1100 kg gravel, 180 L water for 1000L of concrete
  const cement = volume * 0.35;
  const sand = volume * 0.70;
  const gravel = volume * 1.10;
  const water = volume * 0.18;
  const totalWeight = cement + sand + gravel + water;

  // Percentage height for visual stacked bar (normalized to 100%)
  const totalRatio = 0.35 + 0.70 + 1.10 + 0.18;
  const cementHeight = (0.35 / totalRatio) * 100;
  const sandHeight = (0.70 / totalRatio) * 100;
  const gravelHeight = (1.10 / totalRatio) * 100;
  const waterHeight = (0.18 / totalRatio) * 100;

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-6">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-6">
        Simulateur de Dosage : Bétonnière Professionnelle
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Input sliders */}
        <div className="space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
            Sur un chantier, la fabrication du béton respecte une loi de **proportionnalité stricte**. En ajustant le volume total souhaité, observez comment les composants s'adaptent de façon proportionnelle selon les règles de l'art.
          </p>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
              Volume de béton requis : <span className="text-indigo-600 font-extrabold text-lg">{volume} Litres</span>
            </label>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="10"
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400 font-bold mt-1">
              <span>50 L (Petite dalle)</span>
              <span>500 L (Fondation)</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantités exactes à charger :</h4>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-red-400 rounded-full"></span> Ciment (Dosage 350kg/m³) :</span>
              <strong className="text-slate-800 dark:text-white font-mono">{cement.toFixed(1)} kg</strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-400 rounded-full"></span> Sable (Dosage 700kg/m³) :</span>
              <strong className="text-slate-800 dark:text-white font-mono">{sand.toFixed(1)} kg</strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-400 rounded-full"></span> Gravillons (Dosage 1100kg/m³) :</span>
              <strong className="text-slate-800 dark:text-white font-mono">{gravel.toFixed(1)} kg</strong>
            </div>
            <div className="flex justify-between text-sm border-b pb-2">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-400 rounded-full"></span> Eau (Dosage 180L/m³) :</span>
              <strong className="text-slate-800 dark:text-white font-mono">{water.toFixed(1)} L</strong>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1">
              <span>Poids Total estimé :</span>
              <span className="text-indigo-600 font-mono">{totalWeight.toFixed(0)} kg</span>
            </div>
          </div>
        </div>

        {/* Right: Graphic representation of dosage */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Répartition interactive</p>
          <div className="relative w-40 h-72 bg-slate-100 dark:bg-slate-950 border-4 border-slate-300 dark:border-slate-800 rounded-t-lg rounded-b-[2rem] overflow-hidden shadow-inner flex flex-col justify-end">
            
            {/* Water Layer */}
            <motion.div 
              className="bg-blue-400 border-t border-blue-300 flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{ height: `${waterHeight}%` }}
              layout
            >
              <span>Eau {((waterHeight)).toFixed(0)}%</span>
            </motion.div>

            {/* Gravel Layer */}
            <motion.div 
              className="bg-emerald-400 border-t border-emerald-300 flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{ height: `${gravelHeight}%` }}
              layout
            >
              <span>Gravier {((gravelHeight)).toFixed(0)}%</span>
            </motion.div>

            {/* Sand Layer */}
            <motion.div 
              className="bg-amber-400 border-t border-amber-300 flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{ height: `${sandHeight}%` }}
              layout
            >
              <span>Sable {((sandHeight)).toFixed(0)}%</span>
            </motion.div>

            {/* Cement Layer */}
            <motion.div 
              className="bg-red-400 flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{ height: `${cementHeight}%` }}
              layout
            >
              <span>Ciment {((cementHeight)).toFixed(0)}%</span>
            </motion.div>

            {/* Inner shadows / texture reflections */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-black/20 pointer-events-none" />
          </div>
          <span className="text-xs font-bold text-slate-400 mt-3 uppercase text-center">Bétonnière proportionnelle</span>
        </div>
      </div>
    </div>
  );
};

// Interactive Cross-Multiplication (Produit en Croix) Tool
const CrossMultiplicationTool = () => {
  const [valA, setValA] = useState<string>("10"); // e.g. 10 kg
  const [valB, setValB] = useState<string>("25"); // e.g. 25 €
  const [valC, setValC] = useState<string>("30"); // e.g. 30 kg
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [isComputing, setIsComputing] = useState(false);

  const handleCalculate = () => {
    const a = parseFloat(valA);
    const b = parseFloat(valB);
    const c = parseFloat(valC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      alert("Veuillez saisir des nombres valides. La cellule A ne peut pas être nulle.");
      return;
    }

    setIsComputing(true);
    setTimeout(() => {
      // D = (B * C) / A
      const d = (b * c) / a;
      setCalcResult(d);
      setIsComputing(false);
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ['#6366f1', '#10b981'] });
    }, 600);
  };

  return (
    <div className="bg-card border-2 border-indigo-50 dark:border-indigo-950/20 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto my-8">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 justify-center">
        <Calculator className="text-indigo-600 w-5 h-5"/> Calculez la 4ème Proportionnelle (Règle de Trois)
      </h3>
      <p className="text-slate-500 text-xs text-center mb-6">
        Modifiez les valeurs des trois cases connues pour calculer dynamiquement la cellule inconnue (?).
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto relative mb-6">
        
        {/* Cel A */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase mb-2">Quantité Initiale (A)</span>
          <input 
            type="number" 
            value={valA} 
            onChange={(e) => { setValA(e.target.value); setCalcResult(null); }}
            className="w-full text-center font-mono font-bold text-lg bg-white dark:bg-black rounded-lg p-1.5 focus:ring-2 focus:ring-indigo-500 outline-none border border-slate-200 dark:border-slate-700" 
            placeholder="A"
          />
        </div>

        {/* Cel B */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase mb-2">Valeur Associée (B)</span>
          <input 
            type="number" 
            value={valB} 
            onChange={(e) => { setValB(e.target.value); setCalcResult(null); }}
            className="w-full text-center font-mono font-bold text-lg bg-white dark:bg-black rounded-lg p-1.5 focus:ring-2 focus:ring-indigo-500 outline-none border border-slate-200 dark:border-slate-700" 
            placeholder="B"
          />
        </div>

        {/* Diagonal Multiplier Indicator arrow line (A to ?) and (B to C) */}
        <div className="col-span-2 flex justify-center py-2 text-indigo-500 text-xs font-bold">
          <span className="animate-pulse">× Multiplication Diagonale B et C, ÷ Division par A</span>
        </div>

        {/* Cel C */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase mb-2">Nouvelle Quantité (C)</span>
          <input 
            type="number" 
            value={valC} 
            onChange={(e) => { setValC(e.target.value); setCalcResult(null); }}
            className="w-full text-center font-mono font-bold text-lg bg-white dark:bg-black rounded-lg p-1.5 focus:ring-2 focus:ring-indigo-500 outline-none border border-slate-200 dark:border-slate-700" 
            placeholder="C"
          />
        </div>

        {/* Cel D (Calculated Result) */}
        <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl p-4 border-2 border-indigo-400 flex flex-col items-center justify-center relative">
          <span className="text-xs font-black text-indigo-600 uppercase mb-2 tracking-wider">Résultat (D = ?)</span>
          <AnimatePresence mode="wait">
            {isComputing ? (
              <motion.div key="loader" className="h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            ) : calcResult !== null ? (
              <motion.span 
                key="result"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-mono font-black text-xl text-indigo-700 dark:text-indigo-400"
              >
                {calcResult % 1 === 0 ? calcResult : calcResult.toFixed(2)}
              </motion.span>
            ) : (
              <span key="placeholder" className="font-mono font-bold text-lg text-slate-400">?</span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={handleCalculate}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        >
          Résoudre par produit en croix
        </button>
      </div>

      {calcResult !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-xs font-mono"
        >
          {"$$D = \\frac{\\text{B} \\times \\text{C}}{\\text{A}} = \\frac{"}{valB}{" \\times "}{valC}{"}{"}{valA}{"} = "}{calcResult.toFixed(2)}{"$$"}
        </motion.div>
      )}
    </div>
  );
};

const Course_Lyc_Pro_01_Proportionnalite_Metier: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Professionnel/01_Lyc_Pro_01_Proportionnalite_Metier.md";

  const checklistItems = [
    "Démontrer qu'une situation relève de la proportionnalité.",
    "Calculer un coefficient de proportionnalité pour passer d'une ligne à l'autre.",
    "Trouver une quatrième proportionnelle par la technique du produit en croix.",
    "Résoudre des problèmes d'ajustements d'échelles de plans (plans et maquettes).",
    "Appliquer de façon experte des pourcentages d'augmentation (TVA) et de réduction (remise commerciale)."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="PRO" 
        title="Proportionnalité Professionnelle" 
        subtitle="Maîtriser les rapports, échelles, produits en croix et calculs de pourcentages appliqués aux métiers."
        level="Lycée Professionnel"
        duration="2h"
        objectives={[
          "Traduire des besoins de terrain (dosage, devis, échelle) en rapports mathématiques sains.",
          "Savoir appliquer la formule de la quatrième proportionnelle (produit en croix).",
          "Calculer et utiliser les échelles de plans d'ingénierie et de chantiers.",
          "Manier les augmentations de TVA et les rabais commerciaux lors des facturations."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Les rapports et le coefficient multiplicateur">
        Pour réussir tes calculs de chantiers, rappelle-toi que deux proportions sont égales si leur quotient reste constant. Si l&apos;on a {"$\\frac{a}{b} = \\frac{c}{d}$"}, alors leurs produits croisés sont rigoureusement équivalents : {"$a \\times d = b \\times c$"}. On peut ainsi passer d&apos;une ligne à l&apos;autre en utilisant un coefficient multiplicateur de proportionnalité unique !
      </InfoBlock>

      <InfoBlock type="funfact" title="Le saviez-vous ? L'échelle de réduction la plus célèbre">
        L&apos;une des plus célèbres utilisations de la proportionnalité à grande échelle est la fabrication des cartes géographiques. La carte d&apos;état-major française utilise traditionnellement l&apos;échelle de {"$\\frac{1}{25\\,000}$"}. Cela signifie qu&apos;un tout petit centimètre mesuré sur le papier représente exactement 25 000 centimètres de terrain, soit 250 mètres réels de marche !
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : La TVA, ce taux universel">
        En comptabilité d&apos;entreprise, la Taxe sur la Valeur Ajoutée (TVA) est un taux proportionnel direct appliqué sur le prix Hors Taxes (HT). Un taux de TVA classique de 20 % signifie simplement que pour 100 € HT facturés, vous reversez l&apos;équivalent de 20 € à l&apos;État, pour un prix de vente Toutes Taxes Comprises (TTC) final de 120 €. La proportionnalité est de ce fait la colonne vertébrale de l&apos;impôt !
      </InfoBlock>

      <InfoBlock type="info" title="La Proportionnalité : Le couteau suisse des métiers">
        Que vous exerciez dans la coiffure (mélange de nuances chimiques), la boulangerie (ajustement de recettes), le bâtiment (dilution de béton ou mortier) ou la vente (calcul de marge), la proportionnalité est l'outil quotidien indispensable. Elle garantit l'exactitude des mélanges et la justesse économique des contrats.
      </InfoBlock>

      <Section title="1. Reconnaître et Modéliser la Proportionnalité" color="slate" icon={<Layers className="text-indigo-600 w-6.h-6"/>}>
        <div className="space-y-4">
          <p>
            Deux grandeurs sont dites **proportionnelles** si l'on peut passer de l'une à l'autre en multipliant par un nombre unique non nul, appelé le **coefficient de proportionnalité**.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 my-6">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex-1">
              <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-2">Exemple concret en atelier :</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Si un rouleau de câble électrique de {"$15\\text{ m}$"} pèse {"$2.7\\text{ kg}$"}, un câble du même modèle de {"$45\\text{ m}$"} pèsera exactement le triple, soit :
              </p>
              <div className="text-center font-mono py-2 bg-white dark:bg-black border rounded-lg mt-2 font-bold text-slate-800 dark:text-slate-200">
                {"$$2.7 \\times 3 = 8.1\\text{ kg}$$"}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex-1">
              <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-2">Représentation graphique :</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Graphiquement, une situation de proportionnalité se traduit toujours par un ensemble d'alignements de points sur une **droite rectiligne passant obligatoirement par l'origine** du repère (zéro).
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="2. Le Produit en Croix (Quatrième Proportionnelle)" color="indigo" icon={<Scale className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Lorsque vous connaissez trois valeurs dans un tableau à 4 cellules, la quatrième valeur {"$x$"} se calcule grâce à l'équivalence des produits croisés.
          </p>
          
          <InfoBlock type="definition" title="Théorème et Règle du Produit en Croix">
            Soit le tableau de proportionnalité suivant :
            <div className="overflow-x-auto my-4">
              <table className="w-48 mx-auto text-center border-collapse border border-slate-200 text-sm font-mono bg-white dark:bg-slate-900">
                <tbody>
                  <tr>
                    <td className="border p-2 bg-slate-50 dark:bg-slate-800 font-bold">{"$a$"}</td>
                    <td className="border p-2 bg-slate-50 dark:bg-slate-800 font-bold">{"$b$"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">{"$c$"}</td>
                    <td className="border p-2 text-indigo-600 font-black">{"$x$"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            La règle d'égalité croisée affirme que :
            <div className="font-mono text-center my-3 bg-slate-100 dark:bg-slate-950 p-2 rounded border text-indigo-700 dark:text-indigo-400">
              {"$$a \\times x = b \\times c \\implies x = \\frac{b \\times c}{a}$$"}
            </div>
          </InfoBlock>

          <CrossMultiplicationTool />
        </div>
      </Section>

      <Section title="3. Application Interactive de Dosage" color="emerald" icon="🏗️">
        <ConcreteDosageSim />
      </Section>

      <Section title="4. Les Échelles et Mesures Graphiques" color="purple" icon="📐">
        <div className="space-y-4">
          <p>
            L'**échelle** d'un graphique ou d'une carte est le coefficient de proportionnalité reliant les longueurs réelles à celles représentées sur le support d'étude.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center font-mono">
            {"$$\\text{Échelle} = \\frac{\\text{Longueur sur le plan (cm)}}{\\text{Longueur réelle (cm)}}$$"}
          </div>
          <TipBanner type="info" title="Attention aux unités lors du calcul">
            Pour pouvoir diviser les deux valeurs et obtenir un rapport d'échelle adéquat (comme {"$\\frac{1}{100}$"} ou {"$\\frac{1}{50}$"}), vous devez obligatoirement exprimer la dimension du plan et la dimension terrain dans la **même unité de mesure** (majoritairement en centimètres).
          </TipBanner>
        </div>
      </Section>

      <Section title="Exercices Pratiques Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Calcul de Devis avec Remise Commerciale"
          question={
            <>
              Un ferronnier d'art facture de base un portail métallique de prestige à {"$1\\,800\\text{ €}$"} HT.
              En raison d'un léger retard sur le chantier, l'artisan consent à accorder à son client professionnel un rabais commercial de {"$8\\%$"} sur le prix d'achat initial.
              <br />
              1. Déterminer le montant absolu de la remise en euros.
              <br />
              2. Calculer le coût final HT que devra régler le client.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul de la remise absolue</strong>
              <p className="mt-2">
                Le montant d'une remise est proportionnel à la somme initiale :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$\\text{Remise} = 1\\,800 \\times \\frac{8}{100} = 144\\text{ €}$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Calcul du prix réduit de facturation</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On déduit la remise du prix brut initial (méthode de retrait linéaire) :
                <br />
                {"$\\text{Prix final HT} = 1\\,800 - 144 = 1\\,656\\text{ €}$"}.
                <br />
                *Astuce par coefficient multiplicateur :* Appliquer une baisse de {"$8\\%$"} revient directement à multiplier par {"$1 - 0.08 = 0.92$"} :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded border">
                {"$$1\\,800 \\times 0.92 = 1\\,656\\text{ €}$$"}
              </div>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Lecture de plan à l'échelle (Chantier)"
          question={
            <>
              Sur un plan de pose de canalisations d'échelle {"$\\frac{1}{50}$"}, la distance mesurée à la règle graduée entre le compteur de raccordement d'eau d'une maison et la chaudière centrale est de {"$18.4\\text{ cm}$"}.
              <br />
              Quelle est la distance réelle (sur le terrain) qui sépare ces deux organes, exprimée en mètres ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Comprendre le coefficient d'échelle</strong>
              <p className="mt-2 leading-relaxed text-sm">
                L'échelle {"$\\frac{1}{50}$"} signifie que {"$1\\text{ cm}$"} sur le plan représente {"$50\\text{ cm}$"} dans la réalité des tranchées de chantier.
              </p>
            </>,
            <>
              <strong>Étape 2 : Appliquer le produit linéaire pour trouver la taille réelle</strong>
              <p className="mt-2 leading-relaxed">
                On multiplie la valeur papier par le dénominateur de l'échelle :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$\\text{Distance réelle} = 18.4 \\times 50 = 920\\text{ cm}$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Conversion d'unité en Mètres</strong>
              <p className="mt-2">
                Pour exprimer de manière correcte ce résultat en mètres :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-lg">
                {"$$920\\text{ cm} = 9.20\\text{ m}$$"}
              </div>
              <p className="text-sm mt-1">L'artisan devra donc commander au moins {"$9.2\\text{ m}$"} de tuyaux PEHD.</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Quelle est la différence entre coefficient de proportionnalité et coefficient multiplicateur ?",
            answer: "Le coefficient de proportionnalité désigne de façon unifiée la relation globale linéaire liant deux grandeurs (ex: poids par mètre de câble). Le coefficient multiplicateur est une écriture simplificatrice utilisée pour quantifier de manière directe et rapide des réductions ou hausses (ex: multiplier par 1.20 pour ajouter une TVA de 20%)."
          },
          {
            question: "Comment calculer un pourcentage facilement de tête lors d'une évaluation ?",
            answer: "Une astuce classique consiste à décomposer les pourcentages :\n• 10% s'obtient instantanément en divisant par 10 (décaler la virgule à gauche d'un rang).\n• 5% s'obtient en divisant par 2 la valeur des 10% trouvée.\n• 1% s'obtient en divisant la somme initiale par 100."
          },
          {
            question: "Est-ce qu'une échelle de 2:1 est possible ?",
            answer: "Oui, tout à fait ! C'est ce que l'on qualifie d'échelle d'agrandissement. Elle est très utilisée en micromécanique ou en horlogerie pour dessiner des rouages de montres minuscules d'une manière géante et lisible sur papier."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formule simplifiée de la quatrième proportionnelle avec le produit en croix ?</>}
            back={<>{"$$x = \\frac{b \\times c}{a}$$"} d'après l'équivalence des diagonales.</>}
          />
          <Flashcard 
            front={<>Comment appliquer directement une remise de 15% par coefficient multiplicateur ?</>}
            back={<>On multiplie la valeur initiale par {"$(1 - 0.15)$"}, c'est-à-dire par le coefficient de retrait direct de <strong>0.85</strong>.</>}
          />
        </div>
      </Section>

      <Section title="Quiz de validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si 5 kg de peinture spéciale couvrent exactement 20 m², quelle quantité de peinture faut-il pour couvrir 60 m² ?",
              options: ["10 kg", "15 kg", "25 kg"],
              correctAnswer: 1,
              explanation: "Comme les surfaces à peindre ont triplé (20 m² × 3 = 60 m²), la peinture doit également tripler de manière proportionnelle : 5 kg × 3 = 15 kg !"
            },
            {
              question: "Quelle est la distance réelle correspondant à une ligne de 5 cm tracée sur un dessin industriel à l'échelle 1:200 ?",
              options: ["10 mètres", "1 000 cm (soit 10 m)", "2.5 cm (soit un millième)"],
              correctAnswer: 1,
              explanation: "La distance réelle vaut 5 cm × 200 = 1 000 cm, ce qui est égal à 10 mètres dans le monde physique réel."
            },
            {
              question: "Pour ajouter la taxe sur la valeur ajoutée (TVA) de 20% à un devis de menuiserie, on effectue un produit direct par :",
              options: ["0.20", "1.20", "120"],
              correctAnswer: 1,
              explanation: "Hausse de 20% correspond au coefficient 1 + 20/100 = 1.20."
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

export default Course_Lyc_Pro_01_Proportionnalite_Metier;
