import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';
import { Compass, Scissors, Box, Layers, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

// Interactive Machining Chamfer (Biseau) Trigonometric Simulator
const MachiningBiseauSim = () => {
  const [base, setBase] = useState(60);     // base width in mm (30 to 120)
  const [height, setHeight] = useState(40); // height depth in mm (20 to 100)

  // Trigonometric and Pythagorean calculations
  const values = useMemo(() => {
    const hypotenuse = Math.sqrt(base * base + height * height);
    const angleRad = Math.atan(height / base);
    const angleDeg = (angleRad * 180) / Math.PI;

    // Metal wedge plate properties (thickness is 15 mm)
    const thickness = 15;
    const baseArea = (base * height) / 2; // Triangle area in mm²
    const totalVolume = baseArea * thickness; // Volume in mm³
    const volumeCm = totalVolume / 1000; // in cm³

    // Raw rectangular block weight vs finished weight
    // Mild steel density is approx 7.85 g/cm³
    const rawVolumeCm = (base * height * thickness) / 1000;
    const rawWeightG = rawVolumeCm * 7.85;
    const finishedWeightG = volumeCm * 7.85;
    const wasteWeightG = rawWeightG - finishedWeightG;

    return {
      hypotenuse,
      angleDeg,
      volumeCm,
      finishedWeightG,
      wasteWeightG,
      rawWeightG
    };
  }, [base, height]);

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-4">
        Simulateur CNC : Ajustage de Biseau d'Angle
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Modifiez les dimensions de fraisage de la plaque métallique pour voir la longueur de coupe et l'angle d'usinage programmés pour la machine-outil.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Input sliders and materials stats */}
        <div className="space-y-6">
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Longueur Fraisée (Basse) : <span className="text-indigo-600 font-mono font-black">{base} mm</span>
              </label>
              <input 
                type="range" 
                min="30" 
                max="120" 
                step="5"
                value={base} 
                onChange={(e) => setBase(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Profondeur Fraisée (Hauteur) : <span className="text-indigo-600 font-mono font-black">{height} mm</span>
              </label>
              <input 
                type="range" 
                min="20" 
                max="100" 
                step="5"
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900 space-y-2.5">
            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass size={14} /> Paramètres de Programmation G-Code :
            </h4>
            <div className="flex justify-between text-xs">
              <span>Diagonale (Trajectoire Fraiseuse) :</span>
              <strong className="font-mono text-slate-800 dark:text-slate-100">{values.hypotenuse.toFixed(2)} mm</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span>Angle d'attaque de coupe :</span>
              <strong className="text-indigo-700 dark:text-indigo-400 font-mono">{values.angleDeg.toFixed(1)}°</strong>
            </div>
            <div className="flex justify-between text-xs border-t pt-2 mt-2">
              <span>Volume de matière retiré :</span>
              <strong className="font-mono text-slate-850 dark:text-slate-200">{values.volumeCm.toFixed(1)} cm³</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span>Poids des copeaux (acier) perdus :</span>
              <strong className="text-rose-600 font-mono">{values.wasteWeightG.toFixed(1)} g</strong>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Interactive SVG */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Schéma de la découpe</span>
          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-4 shadow-inner relative">
            <svg 
              viewBox="0 0 200 180" 
              className="w-full h-full max-h-48 drop-shadow-md overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Uncut metal plate box area */}
              <rect x="20" y="20" width="160" height="130" fill="#e2e8f0" rx="3" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" className="opacity-60" />

              {/* Wedge cut metal part shape */}
              {/* Dimensions relative: max base is 120 (mapped to 160 width), max height is 100 (mapped to 130 height) */}
              {(() => {
                const mapBase = (base / 120) * 160;
                const mapHeight = (height / 100) * 130;
                
                // SVG points of remaining plate. The cutout removes the bottom-right corner triangle
                // Points: (20,20) -> (180,20) -> (180, 150-mapHeight) -> (180-mapBase, 150) -> (20, 150)
                const p1 = "20,20";
                const p2 = "180,20";
                const p3 = `180,${150 - mapHeight}`;
                const p4 = `${180 - mapBase},150`;
                const p5 = "20,150";

                return (
                  <>
                    {/* Metal body */}
                    <polygon 
                      points={`${p1} ${p2} ${p3} ${p4} ${p5}`} 
                      fill="url(#metalGrad)" 
                      stroke="#475569" 
                      strokeWidth="3.5" 
                      strokeLinejoin="round"
                    />

                    {/* Cutout hollow triangle dashed to show the removed chunk */}
                    <polygon 
                      points={`180,150 ${p3} ${p4}`} 
                      fill="#f8fafc" 
                      fillOpacity="0.8"
                      stroke="#ef4444" 
                      strokeWidth="2" 
                      strokeDasharray="3 3"
                    />

                    {/* Laser tool cutting path highlight */}
                    <line 
                      x1={`${180 - mapBase}`} 
                      y1="150" 
                      x2="180" 
                      y2={`${150 - mapHeight}`} 
                      stroke="#818cf8" 
                      strokeWidth="45"
                      strokeOpacity="0.12"
                      strokeLinecap="round"
                    />
                    
                    {/* Measurement arrows */}
                    {/* Base side arrow */}
                    <line x1={`${180 - mapBase}`} y1="165" x2="180" y2="165" stroke="#4f46e5" strokeWidth="1.5" />
                    <polygon points={`${180 - mapBase},165 ${180 - mapBase + 4},162 ${180 - mapBase + 4},168`} fill="#4f46e5" />
                    <polygon points={`180,165 176,162 176,168`} fill="#4f46e5" />
                    <text x={`${180 - mapBase / 2}`} y="177" textAnchor="middle" fill="#4f46e5" className="text-[10px] font-mono font-bold">{base}mm</text>

                    {/* Height side arrow */}
                    <line x1="192" y1={`${150 - mapHeight}`} x2="192" y2="150" stroke="#4f46e5" strokeWidth="1.5" />
                    <polygon points={`192,${150 - mapHeight} 189,${150 - mapHeight + 4} 195,${150 - mapHeight + 4}`} fill="#4f46e5" />
                    <polygon points={`192,150 189,146 195,146`} fill="#4f46e5" />
                    <text x="195" y={`${150 - mapHeight / 2}`} dominantBaseline="middle" fill="#4f46e5" className="text-[10px] font-mono font-bold" transform={`rotate(90, 195, ${150 - mapHeight / 2})`}>{height}mm</text>

                    {/* Cut path label (z) on hypotenuse */}
                    <text 
                      x={`${180 - mapBase / 2 + 10}`} 
                      y={`${150 - mapHeight / 2 - 10}`} 
                      fill="#312e81" 
                      className="text-[10px] font-mono font-black"
                    >
                      {"z="}{values.hypotenuse.toFixed(1)}mm
                    </text>

                    {/* Angle arc symbol */}
                    <path 
                      d={`M ${180 - mapBase + 12} 150 A 12 12 0 0 1 ${180 - mapBase + (mapBase > 0 ? 10 : 0)} 140`} 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="1.5"
                    />
                    <text x={`${180 - mapBase + 18}`} y="146" fill="#ef4444" className="text-[8px] font-bold">{values.angleDeg.toFixed(0)}°</text>
                  </>
                );
              })()}

              {/* Tool defs for metal gradient rendering */}
              <defs>
                <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#cfd8dc" />
                  <stop offset="50%" stopColor="#eceff1" />
                  <stop offset="100%" stopColor="#b0bec5" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* CNC coordinates hub overlay */}
            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[10px] text-emerald-400 font-mono rounded-lg flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>G01 X{base} Y{height} F150</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 mt-2 uppercase">Aperçu en deux dimensions (en mm)</span>
        </div>
      </div>
    </div>
  );
};

const Course_Lyc_Pro_03_Geometrie_et_Usinage: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Professionnel/03_Lyc_Pro_03_Geometrie_et_Usinage.md";

  const checklistItems = [
    "Appliquer le théorème de Pythagore pour calculer une longueur d'outil de coupe.",
    "Calculer les angles d'un biseau d'usinage en choisissant la formule trigonométrique adéquate (SOH CAH TOA).",
    "Définir des aires de formes géométriques élémentaires chantiers (surfaces triangulaires).",
    "Calculer des volumes de solides cylindriques ou prismatiques pour quantifier des masses d'objets.",
    "Formuler de façon rigoureuse des conversions d'unités volumiques de mm³ en cm³ d'atelier."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="GEO" 
        title="Géométrie & Tracé d'Usinage" 
        subtitle="Mettre en oeuvre Pythagore, la trigonométrie d'atelier et les calculs de volumes appliqués au travail des métaux et du bois."
        level="Lycée Professionnel"
        duration="2h"
        objectives={[
          "Utiliser le théorème de Pythagore pour déterminer des longueurs de coupe diagonale.",
          "Sélectionner et appliquer les fonctions sinus, cosinus ou tangente en usinage.",
          "Calculer des aires planes et des volumes tridimensionnels de solides industriels.",
          "Traiter de manière exacte des calculs de déchets de copeaux et de poids de brut métallique."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : SOH CAH TOA en poche">
        N&apos;oublie jamais ce fameux mot magique pour te rappeler instantanément des formules trigonométriques indispensables de coupe : <strong>SOH-CAH-TOA</strong> !
        <br />- <strong>SOH :</strong> Sinus = Opposé / Hypoténuse
        <br />- <strong>CAH :</strong> Cosinus = Adjacent / Hypoténuse
        <br />- <strong>TOA :</strong> Tangente = Opposé / Adjacent
      </InfoBlock>

      <InfoBlock type="funfact" title="Le saviez-vous ? Le secret millénaire du fil à plomb">
        Pour monter des cathédrales parfaitement verticales ou régler d&apos;immenses machines de forge, les bâtisseurs n&apos;avaient pas de lasers de précision. Ils utilisaient simplement un outil d&apos;une efficacité redoutable : le <strong>fil à plomb</strong> ! Grâce à la gravité terrestre, la direction du fil est rigoureusement perpendiculaire au plan horizontal terrestre, formant d&apos;office un angle parfait de 90° avec le sol.
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : La vitesse de coupe et la géométrie des dents">
        En fraisage, la forme géométrique d&apos;une dent (ses angles de dépouille et d&apos;attaque) détermine la manière dont le copeau est cisaillé. Si l&apos;angle d&apos;affûtage est trop faible, l&apos;outil frotte et la pièce brûle. S&apos;il est trop grand, la dent s&apos;ébrèche. Usiner, c&apos;est de la géométrie de précision en action rapide à l&apos;échelle du micromètre !
      </InfoBlock>

      <InfoBlock type="info" title="L'intelligence spatiale : Du dessin à la matière">
        En usinage CNC, en chaudronnerie ou en ébénisterie, le technicien matérialise des modèles mathématiques abstraits. Découper une plaque d'acier, rainurer un biseau ou vérifier l'équerrage d'un ouvrage de charpente exige une parfaite maîtrise des relations de géométrie et des ratios trigonométriques.
      </InfoBlock>

      <Section title="1. Équerrage et Distances : Théorème de Pythagore" color="slate" icon={<Scissors className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Le théorème de Pythagore est l'outil primordial d'atelier pour valider qu'un assemblage présente un équerre parfaite ou pour mesurer une trajectoire oblique d'outil d'alésage.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl my-6">
            <h4 className="font-extrabold text-indigo-700 dark:text-indigo-300 text-base mb-3">La règle pratique du 3-4-5 en chantier :</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Pour valider un angle droit sur une cloison de plaquiste ou une fondation maçonnerie, tracez un repère à {"$30\\text{ cm}$"} sur la première ligne, {"$40\\text{ cm}$"} sur la seconde. Si l'écart diagonal vaut très exactement {"$50\\text{ cm}$"}, l'équerrage est parfait.
            </p>
            <div className="font-mono text-center p-2.5 bg-white dark:bg-black rounded border font-semibold text-indigo-600 max-w-sm mx-auto shadow-inner text-sm">
              {"$$30^2 + 40^2 = 900 + 1\\,600 = 2\\,500 = 50^2$$"}
            </div>
          </div>
        </div>
      </Section>

      <Section title="2. Programmation d'Angles : La Trigonométrie de Coupe" color="indigo" icon={<Compass className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Pour calculer l'angle de chanfrein d'un biseau, le technicien s'appuie sur les ratios fondamentaux du triangle rectangle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <strong className="text-indigo-600 block text-sm mb-1">Cosinus (CAH)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                {"$$\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypoténuse}}$"}
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <strong className="text-indigo-600 block text-sm mb-1">Sinus (SOH)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                {"$$\\sin(\\theta) = \\frac{\\text{Opposé}}{\\text{Hypoténuse}}$"}
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <strong className="text-rose-600 block text-sm mb-1">Tangente (TOA)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                {"$$\\tan(\\theta) = \\frac{\\text{Opposé}}{\\text{Adjacent}}$"}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="3. Simulateur Interactif d'Angle de Fraisage" color="purple" icon={<Play />}>
        <MachiningBiseauSim />
      </Section>

      <Section title="4. Volumes Usituels et Quantités de Matière" color="emerald" icon={<Box />}>
        <div className="space-y-4">
          <p>
            Afin de commander la masse brute d'un alliage ou d'un carreau de bois nécessaire pour la réalisation d'une commande d'alésage cylindrique, on utilise la formule de volume :
          </p>

          <BentoGrid>
            <BentoCard title="Cylindre droit" color="slate">
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$V = \\pi \\times R^2 \\times h$$"}
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Indispensable pour calculer le volume d'un axe de piston, d'un arbre rotatif ou d'une canette métallique de stockage.
              </p>
            </BentoCard>

            <BentoCard title="Prisme droit triangulaire" color="slate">
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$V = \\frac{b \\times c}{2} \\times h$$"}
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Utilisé pour calculer le volume exact d'une cale d'angle de machine ou de biseau chanfreiné de menuiserie.
              </p>
            </BentoCard>

            <BentoCard title="Conversion utile" color="amber">
              <div className="font-mono text-sm font-bold text-amber-900 dark:text-amber-100 flex flex-col gap-1 py-1">
                <span>• 1 cm³ = 1 000 mm³</span>
                <span>• 1 L = 1 000 cm³</span>
                <span>• 1 L = 1 dm³</span>
              </div>
              <p className="text-[10px] text-amber-500 leading-normal">
                Assurez-vous de diviser vos mm³ par 1000 pour obtenir des cm³ d'atelier pratiques.
              </p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="Exercices de Fraisage Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Calcul de longueur de biseau en chaudronnerie"
          question={
            <>
              Un chaudronnier doit souder une cale d'angle rectangulaire. Pour cela, il effectue une coupe oblique (le biseau). Les dimensions des côtés perpendiculaires fraisés de la cale sont de {"$80\\text{ mm}$"} en largeur (base) et de {"$60\\text{ mm}$"} en hauteur.
              <br />
              1. Calculer la longueur géométrique de la ligne diagonale soudée à découper à la disqueuse ou cisaille CNC.
              <br />
              2. Déterminer l'angle d'ajustement à l'axe horizontal.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Hypoténuse par le théorème de Pythagore</strong>
              <p className="mt-2 text-sm">
                La cale forme un triangle rectangle. La longueur de découpe {"$L$"} correspond à l'hypoténuse :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$L = \\sqrt{80^2 + 60^2} = \\sqrt{6\\,400 + 3\\,600} = \\sqrt{10\\,000} = 100\\text{ mm}$$"}
              </div>
              <p className="text-xs text-slate-500">Le technicien doit exécuter un trait de coupe de exactement 100 mm.</p>
            </>,
            <>
              <strong>Étape 2 : Déterminer l'angle de chanfrein</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On connaît le côté opposé ({"$60\\text{ mm}$"}) et le côté adjacent ({"$80\\text{ mm}$"}). On applique l'arc-tangente (TOA) :
                <br />
                {"$$\\tan(\\theta) = \\frac{\\text{Opposé}}{\\text{Adjacent}} = \\frac{60}{80} = 0.75$$"}
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded border">
                {"$$\\theta = \\arctan(0.75) \\approx 36.9^\\circ$$"}
              </div>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Masse de copeaux de rabotage d'acier"
          question={
            <>
              Un tourneur rabote un arbre cylindrique en acier doux (densité {"$7.85\\text{ g/cm}^3$"}) pour réduire son rayon de {"$20\\text{ mm}$"} à {"$18\\text{ mm}$"}, sur une longueur d'usinage cylindrique de {"$150\\text{ mm}$"}.
              <br />
              1. Calculer le volume de matière en mm³ retiré sous forme de copeaux de métal.
              <br />
              2. En déduire le volume en cm³, puis le poids en grammes de copeaux produits.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Volume de matière soustrait</strong>
              <p className="mt-2 text-xs leading-relaxed">
                Le volume retiré équivaut à la soustraction du volume du grand cylindre moins le volume du petit cylindre :
                <br />
                • {"$V_{\\text{brut}} = \\pi \\times 20^2 \\times 150 = 60\\,000\\pi \\approx 188\\,495.5\\text{ mm}^3$"}
                <br />
                • {"$V_{\\text{fini}} = \\pi \\times 18^2 \\times 150 = 48\\,600\\pi \\approx 152\\,681.4\\text{ mm}^3$"}
                <br />
                • {"$\\Delta V = V_{\\text{brut}} - V_{\\text{fini}} = 11\\,400\\pi \\approx 35\\,814.1\\text{ mm}^3$"}
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$\\text{Volume perdu} \\approx 35\\,814.1\\text{ mm}^3$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Conversion en centimètres cubes</strong>
              <p className="mt-2 text-sm">
                Pour passer de millimètres cubes à centimètres cubes d'atelier, on divise par 1 000 :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-150 rounded">
                {"$$\\Delta V_{\\text{cm}^3} = \\frac{35\\,814.1}{1\\,000} \\approx 35.81\\text{ cm}^3$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Calcul de la masse de déchets (copeaux)</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On multiplie la densité de l'acier par le volume en cm³ :
                <br />
                {"$$\\text{Masse} = 35.81 \\times 7.85 \\approx 281.1\\text{ g}$$"}
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-base">
                {"$$\\text{Masse de copeaux} \\approx 281\\text{ g}$$"}
              </div>
              <p className="text-[11px] text-slate-500 italic mt-1">Le technicien de sablage devra ramasser environ 281 grammes de limaille dans le bac à déchets.</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Quelle est la touche de calculatrice à utiliser si je cherche un angle à partir d'une valeur de tangente ?",
            answer: "Sur une calculatrice scientifique de chantier, vous devez presser le bouton [Seconde] (ou SHIFT) puis la touche [TAN]. L'écriture affichée à l'écran sera 'arctan' ou 'tan⁻¹'. Pensez à vérifier que votre machine calcule bien en degrés [Deg] et non pas en radians !"
          },
          {
            question: "Comment ne pas s'embrouiller entre SOH, CAH et TOA lors d'un tracé d'ouvrage ?",
            answer: "Apprenez le mot mnémotechnique s'il vous plaît :\nSOH-CAH-TOA :\n• SOH : Sinus = Opposé / Hypoténuse\n• CAH : Cosinus = Adjacent / Hypoténuse\n• TOA : Tangente = Opposé / Adjacent\nC'est rapide, efficace et évite 100% des erreurs d'inversion."
          },
          {
            question: "Est-ce normal qu'un biseau ait deux angles d'usinage trigonométriques différents ?",
            answer: "Tout à fait ! Dans un triangle rectangle, la somme des deux angles aigus vaut toujours 90°. Si l'un de vos angles d'ajustage de biseau vaut 30°, l'autre angle opposé du triangle vaut instantanément 60° (90 - 30). Cela dépend de l'orientation de référence pour l'avance d'outil."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans un triangle rectangle, quel côté fait face à l'angle droit ?</>}
            back={<>C'est l'<strong>Hypoténuse</strong>, qui correspond également au côté le plus long à découper.</>}
          />
          <Flashcard 
            front={<>Quel rapport trigonométrique relie le côté opposé au côté adjacent ?</>}
            back={<>C'est le rapport de la <strong>Tangente</strong> (règle mnémotechnique TOA).</>}
          />
        </div>
      </Section>

      <Section title="Quiz de validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si une cale de coffrage possède des dimensions de 30mm de hauteur et 40mm de base, quelle est sa longueur d'hypoténuse ?",
              options: ["50 mm", "70 mm (la somme)", "35 mm (la moyenne)"],
              correctAnswer: 0,
              explanation: "D'après Pythagore : 30² + 40² = 900 + 1600 = 2500, et la racine carrée de 2500 vaut בדיוק 50 mm."
            },
            {
              question: "Le rapport trigonométrique correspondant à Cosinus d'un angle aigu dans un triangle rectangle est égal à :",
              options: ["Opposé / Hypoténuse", "Adjacent / Hypoténuse", "Opposé / Adjacent"],
              correctAnswer: 1,
              explanation: "Rappel de la formule mnémotechnique CAH : Cosinus = Adjacent divisé par l'Hypoténuse."
            },
            {
              question: "Quel volume de copeaux en mm³ s'écoule d'un cubage total de 4.5 cm³ d'acier raboté ?",
              options: ["45 mm³", "450 mm³", "4 500 mm³"],
              correctAnswer: 2,
              explanation: "Comme 1 cm³ = 1 000 mm³, on effectue la multiplication linéaire suivante : 4.5 × 1 000 = 4 500 mm³."
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

export default Course_Lyc_Pro_03_Geometrie_et_Usinage;
