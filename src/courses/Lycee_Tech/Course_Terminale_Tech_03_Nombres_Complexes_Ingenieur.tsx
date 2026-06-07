import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Zap, HelpCircle, ArrowRight, Activity, Percent, Compass, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

// Interactive RLC circuit and Fresnel Vector Complex Plane diagram
const RLCComplexPlaneSim = () => {
  const [res, setRes] = useState<number>(47); // Resistance in Ohms (10 to 200)
  const [ind, setInd] = useState<number>(150); // Inductance in milliHenrys (10 to 500)
  const [cap, setCap] = useState<number>(33); // Capacitance in microFarads (10 to 100)
  const [freq, setFreq] = useState<number>(50); // AC Frequency in Hz (10 to 200)

  const calc = useMemo(() => {
    // omega = 2 * pi * f
    const r = res;
    const omega = 2 * Math.PI * freq;
    // L in Henry, C in Farad
    const lH = ind / 1000;
    const cF = cap / 1000000;

    // Reactances
    const zL_im = lH * omega; // Reactance of inductor Lw (Positive imaginary part)
    const zC_im = -1 / (cF * omega); // Reactance of capacitor -1/Cw (Negative imaginary part)
    const total_im = zL_im + zC_im; // Reactance X = Lw - 1/Cw

    // Impedance magnitude |Z| = sqrt(R^2 + X^2)
    const magnitude = Math.sqrt(r * r + total_im * total_im);
    // Phase shift angle in radians
    const angleRad = Math.atan2(total_im, r);
    const angleDeg = (angleRad * 180) / Math.PI;

    return {
      omega,
      zL_im,
      zC_im,
      total_im,
      magnitude,
      angleRad,
      angleDeg
    };
  }, [res, ind, cap, freq]);

  // Scaler for the visual SVG complex plane vector drawing
  const complexScale = useMemo(() => {
    const values = [res, Math.abs(calc.zL_im), Math.abs(calc.zC_im), Math.abs(calc.total_im)];
    const maxVal = Math.max(...values, 50);
    return 75 / maxVal; // Limit drawing coordinates to a neat box (width/height radius ~80)
  }, [res, calc]);

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2">
        Simulateur RLC : Impédance et Diagramme de Fresnel
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Modifiez les paramètres du circuit RLC série pour observer les vecteurs d'impédances complexes (notation de l'ingénieur en {"$j$"}).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Input sliders and material calculations */}
        <div className="space-y-5">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Résistance (R) : <span className="text-indigo-605 font-mono font-black">{res} Ω</span>
              </label>
              <input 
                type="range" 
                min="10" 
                max="150" 
                step="5"
                value={res} 
                onChange={(e) => setRes(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Inductance (L) : <span className="text-indigo-605 font-mono font-black">{ind} mH</span>
              </label>
              <input 
                type="range" 
                min="20" 
                max="450" 
                step="10"
                value={ind} 
                onChange={(e) => setInd(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Capacité (C) : <span className="text-indigo-605 font-mono font-black">{cap} µF</span>
              </label>
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={cap} 
                onChange={(e) => setCap(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Fréquence du Courant Alternatif (f) : <span className="text-indigo-605 font-mono font-black">{freq} Hz</span>
              </label>
              <input 
                type="range" 
                min="10" 
                max="180" 
                step="5"
                value={freq} 
                onChange={(e) => setFreq(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900 space-y-2">
            <h4 className="text-xs font-bold text-indigo-805 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} /> Impédance Totale Équivalente :
            </h4>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Pulsation ({"$\\omega$"}) :</span>
                <strong className="font-mono text-slate-800 dark:text-slate-100">{calc.omega.toFixed(1)} rad/s</strong>
              </div>
              <div className="flex justify-between">
                <span>Partie Réelle R :</span>
                <strong className="text-slate-800 dark:text-slate-100 font-mono">{res} Ω</strong>
              </div>
              <div className="flex justify-between">
                <span>Partie Imaginaire J(X) :</span>
                <strong className={`font-mono ${calc.total_im >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  j ({calc.total_im.toFixed(2)}) Ω
                </strong>
              </div>
              <div className="flex justify-between border-t border-indigo-100 dark:border-indigo-900 pt-1.5">
                <span>Forme Algébrique ({"$Z$"}) :</span>
                <strong className="font-mono text-indigo-700 dark:text-indigo-400">{res} + j({calc.total_im.toFixed(1)}) Ω</strong>
              </div>
              <div className="flex justify-between text-indigo-700 dark:text-indigo-450 font-bold">
                <span>Module (Module de Z) |Z| :</span>
                <strong className="font-mono">{calc.magnitude.toFixed(2)} Ω</strong>
              </div>
              <div className="flex justify-between text-indigo-700 dark:text-indigo-455">
                <span>Déphasage angle ({"$\\theta$"}) :</span>
                <strong className="font-mono">{calc.angleDeg.toFixed(1)}°</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Beautiful interactive custom SVG complex plane representation */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Représentation Plane de Fresnel</span>
          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-4 shadow-inner relative">
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Complex Coordinate Axes */}
              {/* Real Axis horizontal (centered at y=100) */}
              <line x1="10" y1="100" x2="190" y2="100" stroke="#94a3b8" strokeWidth="1" />
              <text x="190" y="93" fill="#64748b" className="text-[7.5px] font-bold">Re (Ω)</text>
              {/* Imaginary Axis vertical (centered at x=60 to leave space for right side vector) */}
              <line x1="60" y1="10" x2="60" y2="190" stroke="#94a3b8" strokeWidth="1" />
              <text x="64" y="18" fill="#64748b" className="text-[7.5px] font-bold">Im - j (Ω)</text>

              {/* Grid origin mark */}
              <circle cx="60" cy="100" r="1.5" fill="#475569" />

              {/* R resistance vector (horizontal purely real positive) */}
              {(() => {
                const rx = 60 + res * complexScale;
                const ry = 100;
                
                // L inductive reactance vector (vertical purely imaginary positive, up in SVG coordinate meaning y - decreases)
                const lx = 60;
                const ly = 100 - calc.zL_im * complexScale;

                // C capacitive reactance vector (vertical purely imaginary negative, down in SVG coordinate meaning y + increases)
                const cx = 60;
                const cy = 100 - calc.zC_im * complexScale;

                // Total combined Z impedance vector
                const zx = rx;
                const zy = 100 - calc.total_im * complexScale;

                return (
                  <>
                    {/* Resistance vector (Horizontal, red/orange) */}
                    <line x1="60" y1="100" x2={rx} y2={ry} stroke="#f97316" strokeWidth="2.5" />
                    <polygon points={`${rx},${ry} ${rx-5},${ry-3} ${rx-5},${ry+3}`} fill="#f97316" />
                    <text x={rx - 8} y={ry + 10} fill="#f97316" className="text-[7px] font-bold">R</text>

                    {/* Inductance vector vector (Up, green) */}
                    <line x1="60" y1="100" x2={lx} y2={ly} stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
                    <polygon points={`${lx},${ly} ${lx-3},${ly+4} ${lx+3},${ly+4}`} fill="#10b981" />
                    <text x={lx + 5} y={ly + 8} fill="#10b981" className="text-[7px] font-semibold">jLω</text>

                    {/* Capacitance vector vector (Down, blue) */}
                    <line x1="60" y1="100" x2={cx} y2={cy} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
                    <polygon points={`${cx},${cy} ${cx-3},${cy-4} ${cx+3},${cy-4}`} fill="#3b82f6" />
                    <text x={cx + 5} y={cy - 4} fill="#3b82f6" className="text-[7px] font-semibold">-j/(Cω)</text>

                    {/* Reactance X combined vector (dotted) */}
                    <line x1={rx} y1="100" x2={zx} y2={zy} stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 3" />

                    {/* Total combined impedance vector Z (indigo) */}
                    <line x1="60" y1="100" x2={zx} y2={zy} stroke="#4f46e5" strokeWidth="3" />
                    {/* Arrow head for Z */}
                    {(() => {
                      const dx = zx - 60;
                      const dy = zy - 100;
                      const len = Math.sqrt(dx*dx + dy*dy);
                      if (len > 0) {
                        const ux = dx / len;
                        const uy = dy / len;
                        const ax = zx;
                        const ay = zy;
                        // perpendicular vector
                        const px = -uy;
                        const py = ux;
                        const p1x = ax - 6 * ux + 3 * px;
                        const p1y = ay - 6 * uy + 3 * py;
                        const p2x = ax - 6 * ux - 3 * px;
                        const p2y = ay - 6 * uy - 3 * py;
                        return <polygon points={`${ax},${ay} ${p1x},${p1y} ${p2x},${p2y}`} fill="#4f46e5" />;
                      }
                      return null;
                    })()}
                    <text x={zx + 5} y={zy - 4} fill="#4f46e5" className="text-[8px] font-black">Z</text>

                    {/* Phase shift arc */}
                    {calc.magnitude > 20 && (
                      <path 
                        d={`M ${60 + 15} 100 A 15 15 0 0 ${calc.total_im < 0 ? 1 : 0} ${60 + 15 * Math.cos(calc.angleRad)} ${100 - 15 * Math.sin(calc.angleRad)}`} 
                        fill="none" 
                        stroke="#6366f1" 
                        strokeWidth="1.2"
                      />
                    )}
                    <text x="82" y={calc.total_im >= 0 ? "95" : "109"} fill="#6366f1" className="text-[7px] font-extrabold">{calc.angleDeg.toFixed(0)}°</text>
                  </>
                );
              })()}
            </svg>
            
            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[9px] text-emerald-400 font-mono rounded-md flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Analyse f={freq}Hz</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Vecteurs d'Impédances dans le plan complexe</span>
        </div>
      </div>
    </div>
  );
};

const Course_Terminale_Tech_03_Nombres_Complexes_Ingenieur: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Technologique/03_Terminale_Tech_03_Nombres_Complexes_Ingenieur.md";

  const checklistItems = [
    "Manipuler l'unité imaginaire d'atelier j définie par j² = -1 en physique appliquée.",
    "Formuler le module d'un complexe pour évaluer la grandeur efficace d'un circuit alternatif.",
    "Définir et calculer la partie réelle et la partie imaginaire d'une impédance RLC.",
    "Déduire l'argument d'un nombre complexe sous forme d'exponentielle pour chiffrer un retard d'onde.",
    "Construire le diagramme vectoriel de Fresnel d'impédances en série."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="CPL" 
        title="Complexes pour l'Ingénieur" 
        subtitle="S'approprier l'outil des nombres complexes (forme exponentielle, trigonométrique) appliqué aux circuits électriques RLC, signaux et filtres."
        level="Terminale Technologique"
        duration="2.5h"
        objectives={[
          "Passer d'une écriture algébrique z = a + jb à une formulation exponentielle pour analyser des ondes.",
          "Modéliser analytiquement l'impédance totale complexe d'un montage RLC.",
          "Interpréter le module en tant qu'impédance totale équivalente efficace.",
          "Associer l'argument au retard temporel (déphasage) du courant par rapport à la tension."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : L'unité imaginaire d'atelier j et ses puissances">
        En sciences de l&apos;ingénieur, l&apos;unité imaginaire est notée {"$j$"} (pour ne pas confondre avec l&apos;intensité électrique {"$i$"}). Elle est définie par la relation fondamentale : <code>{"$j^2 = -1$"}</code>. Tout nombre complexe {"$z$"} admet une forme algébrique unique {"$z = x + j y$"} où {"$x$"} désigne la partie réelle et {"$y$"} la partie imaginaire !
      </InfoBlock>

      <InfoBlock type="funfact" title="Le saviez-vous ? L'origine des duels de mathématiciens pour imposer les imaginaires">
        Au XVIe siècle, en Italie, les mathématiciens comme Cardan et Tartaglia s&apos;affrontaient dans des duels publics féroces pour résoudre des équations du troisième degré. C&apos;est pour remporter ces joutes et débloquer des formules de calcul de racines réelles que Bombelli a inventé des nombres « impossibles », dont le carré était négatif. Jugés d&apos;abord inutiles par Descartes qui les baptisa « imaginaires », ils sont aujourd&apos;hui les piliers de l&apos;électricité moderne !
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : Les filtres passe-bas et la coupure de fréquence">
        En ingénierie du son et du signal, on utilise les nombres complexes pour modéliser le comportement de filtres audio (comme les égaliseurs de nos applications de musique). La fonction de transfert en impédance complexe montre comment, au-delà d&apos;une certaine fréquence de coupure, la partie imaginaire de l&apos;impédance du condensateur grandit, atténuant ainsi de manière spectaculaire les fréquences aiguës pour ne laisser filtrer que les fréquences basses et chaleureuses.
      </InfoBlock>

      <InfoBlock type="info" title="Pourquoi les ingénieurs aiment les imaginaires ?">
        Dans le domaine des ondes sinusoidales (courant alternatif 50Hz de nos prises, ondes WiFi, ondes sonores de sonar), manipuler des équations trigonométriques complexes avec des sinus et cosinus imbriqués s'avère mathématiquement laborieux. En projetant ces fluctuations périodiques dans le **plan complexe**, les rotations complexes de phases se transforment en simples multiplications de facteurs ! L'ingénieur simplifie ainsi de colossales équations différentielles en simples opérations algébriques.
      </InfoBlock>

      <Section title="1. La notation complexe : De l'Algèbre à l'Électricité" color="slate" icon={<Zap className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            En mathématiques académiques, on note {"$i$"} l'unité imaginaire. En technologie et sciences industrielles, on la remplace rigoureusement par la lettre {"$j$"} pour se prémunir de toute confusion fatale avec l'intensité du courant électrique, traditionnellement notée {"$i(t)$"}.
          </p>

          <BentoGrid>
            <BentoCard title="Forme Algébrique" color="slate">
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$z = a + jb$$"}
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                • {"$a = \\text{Re}(z)$"} correspond à la **partie réelle** (effet purement résistif dissipative).
                <br />
                • {"$b = \\text{Im}(z)$"} correspond à la **partie imaginaire** (effet réactif de stockage d'énergie).
              </p>
            </BentoCard>

            <BentoCard title="Forme Exponentielle" color="slate">
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$z = r e^{j\\theta}$$"}
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                • {"$r = |z| = \\sqrt{a^2 + b^2}$"} est le **module** (amplitude efficace du signal).
                <br />
                • {"$\\theta = \\arg(z)$"} est l'**argument** (phase à l'origine ou déphasage temporel).
              </p>
            </BentoCard>

            <BentoCard title="Passage mathématique" color="amber">
              <div className="font-mono text-xs font-bold text-amber-900 dark:text-amber-100 flex flex-col gap-1.5 py-1">
                <span>• Module : {"$r = \\sqrt{a^2 + b^2}$"}</span>
                <span>• Argument : {"$\\cos(\\theta) = \\frac{a}{r}$"}</span>
                <span>• Argument : {"$\\sin(\\theta) = \\frac{b}{r}$"}</span>
              </div>
              <p className="text-[10px] text-amber-500 leading-normal">
                Pour passer à la forme exponentielle rapidement sans erreur d'arc-tangente.
              </p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="2. Les Impédances Complexes des composants" color="indigo" icon={<Radio className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            En courant continu, seul le conducteur ohmique s'oppose au passage du courant (Résistance {"$R$"}). En courant alternatif à pulsation {"$\\omega = 2\\pi f$"}, la bobine d'induction et le condensateur s'opposent aussi de façon complexe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <strong className="text-orange-600 block text-xs mb-1 uppercase font-bold">Résistance R</strong>
              <div className="font-mono text-sm font-black text-slate-850 dark:text-slate-200 my-2">
                {"$$Z_R = R$$"}
              </div>
              <p className="text-[10px] text-slate-500">Pas de partie imaginaire. Aucune modification du décalage temporel phase (0°).</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <strong className="text-emerald-600 block text-xs mb-1 uppercase font-bold">Inductance L</strong>
              <div className="font-mono text-sm font-black text-slate-850 dark:text-slate-200 my-2">
                {"$$Z_L = j L \\omega$$"}
              </div>
              <p className="text-[10px] text-slate-500">Purement imaginaire positive. Provoque une avance de phase de exactement +90°.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <strong className="text-blue-600 block text-xs mb-1 uppercase font-bold">Condensateur C</strong>
              <div className="font-mono text-sm font-black text-slate-810 dark:text-slate-200 my-2">
                {"$$Z_C = \\frac{1}{j C \\omega} = -j \\frac{1}{C \\omega}$$"}
              </div>
              <p className="text-[10px] text-slate-500">Purement imaginaire négative. Provoque un retard de phase de exactement -90°.</p>
            </div>
          </div>

          <InfoBlock type="reminder" title="Impédance équivalente RLC en série">
            Dans un circuit composé de R, L et C connectés en série, les impédances s'additionnent de manière linéaire pour donner l'impédance totale équivalente complexe :
            <div className="font-mono text-center my-2.5 p-2 bg-slate-100 dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-extrabold">
              {"$$Z_{\\text{totale}} = Z_R + Z_L + Z_C = R + j \\left( L \\omega - \\frac{1}{C \\omega} \\right)$$"}
            </div>
          </InfoBlock>
        </div>
      </Section>

      <Section title="3. Simulateur d'Impédance Complexe Appliquée" color="purple" icon={<Compass />}>
        <RLCComplexPlaneSim />
      </Section>

      <Section title="Exercices Industriels Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Filtre Passe-Haut d'un signal audio"
          question={
            <>
              Un ingénieur acoustique conçoit un circuit filtre séparateur d'enceinte. Dans ce circuit, l'impédance complexe totale vaut :
              <br />
              {"$$Z = 100 - j 100\\text{ }\\Omega$$"}
              <br />
              1. Calculer le module de cette impédance pour déterminer l'opposition globale efficace que subit le courant d'entrée.
              <br />
              2. Déterminer son argument, puis écrire ce nombre sous forme exponentielle afin d'en déduire le déphasage.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calculer le module |Z|</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On identifie {"$a = 100$"} (partie résistance) et {"$b = -100$"} (partie condensateur réactif) :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$|Z| = \\sqrt{100^2 + (-100)^2} = \\sqrt{10\\,000 + 10\\,000} = \\sqrt{20\\,000} = 100\\sqrt{2} \\approx 141.4\\text{ }\\Omega$$"}
              </div>
              <p className="text-xs text-slate-500">L'impédance globale efficace traversée par les fréquences d'aigu de l'enceinte est d'environ 141.4 Ohms.</p>
            </>,
            <>
              <strong>Étape 2 : Déterminer la valeur de l'argument et l'angle</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On calcule les cosinus et sinus pour situer le complexe dans les quatre quadrants du plan :
                <br />
                • {"$\\cos(\\theta) = \\frac{a}{|Z|} = \\frac{100}{141.4} = \\frac{\\sqrt{2}}{2}$"}
                <br />
                • {"$\\sin(\\theta) = \\frac{b}{|Z|} = \\frac{-100}{141.4} = -\\frac{\\sqrt{2}}{2}$"}
              </p>
              <p className="text-sm mt-2">
                L'angle qui possède un cosinus positif et un sinus négatif est l'angle classique :
              </p>
              <div className="font-mono text-center my-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$\\theta = -\\frac{\\pi}{4}\\text{ rad} = -45^\\circ$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Restitution de l'écriture exponentielle</strong>
              <p className="mt-2 text-sm">
                On assemble le module et l'argument pour obtenir l'expression finale d'ingénierie :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-lg">
                {"$$Z = 100\\sqrt{2} e^{-j\\frac{\\pi}{4}}$$"}
              </div>
              <p className="text-xs text-slate-500 italic mt-1.5">Le signe moins de l'argument (-45°) indique un déphasage capacitif d'un quart de période de retard du courant.</p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Fréquence de Résonance d'une Antenne"
          question={
            <>
              Une antenne de récepteur télécom RLC série présente une impédance globale de :
              <br />
              {"$$Z = R + j\\left( L\\omega - \\frac{1}{C\\omega} \\right)$$"}.
              <br />
              La **résonance** se produit de façon électrique lorsque la partie imaginaire s'annule complètement (les parties capacitives et inductives se compensent parfaitement).
              <br />
              Déterminer la formulation de la fréquence de résonance d'onde {"$f_0$"} correspondante en fonction de d'inductance {"$L$"} et de la capacité {"$C$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Poser l'annulation de la réactance imaginaire</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Annuler la partie imaginaire signifie résoudre le système d'égalités suivant :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded font-semibold">
                {"$$L\\omega - \\frac{1}{C\\omega} = 0 \\implies L\\omega = \\frac{1}{C\\omega}$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Isoler la pulsation de résonance omega(0)</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On multiplie les membres de droite et de gauche par de l'omega :
                <br />
                {"$\\omega^2 = \\frac{1}{LC} \\implies \\omega_0 = \\frac{1}{\\sqrt{LC}}$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Exprimer la fréquence f(0)</strong>
              <p className="text-sm mt-1">
                Comme la relation de pulsation temporelle est {"$\\omega_0 = 2\\pi f_0$"}, on isole enfin l'inconnue finale recherchée :
              </p>
              <div className="font-mono text-center my-2.5 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-base animate-pulse">
                {"$$f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$$"}
              </div>
              <p className="text-[11px] text-slate-500 italic mt-1">C'est la mythique formule universelle de résonance de Thomson, utilisée pour accorder toutes les radios du globe !</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Que se passe-t-il visuellement sur le diagramme de Fresnel à la résonance du circuit ?",
            answer: "À la résonance, la flèche verte qui pointe vers le haut (jLω) et la flèche bleue qui pointe vers le bas (-j/Cω) ont exactement la même taille et s'annulent. Le vecteur d'impédance finale se réduit au vecteur orange (uniquement la résistance réelle). Le circuit se comporte alors à cette fréquence comme s'il était purement résistif !"
          },
          {
            question: "Quelle est la définition d'un décibel (dB) en physique industrielle ?",
            answer: "En traitement de signal, on utilise le gain calculé à l'aide des modules d'impédances complexes par la relation G_dB = 20 * log10(|H|), permettant d'analyser l'atténuation sur une échelle logarithmique commode."
          },
          {
            question: "Comment calculer facilement un diviseur complexe à la main ?",
            answer: "Pour simplifier le quotient de deux fractions complexes, on multiplie toujours le numérateur et le dénominateur par la quantité conjuguée du dénominateur (comme z = a - jb pour z_bar). Cela permet d'obtenir un dénominateur purement réel et d'identifier de suite parties réelles et imaginaires."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans un diagramme vectoriel, de combien de degrés de phase une bobine pure décale-t-elle le signal ?</>}
            back={<>Une inductance pure engendre une avance temporelle de phase de exactement <strong>+90°</strong> (ou {"$+\\frac{\\pi}{2}\\text{ rad}$"}).</>}
          />
          <Flashcard 
            front={<>Déterminer la forme exponentielle du nombre z = 3j</>}
            back={<>Le module vaut 3 et l'argument est sur l'axe imaginaire positif (+90°). Donc {"$z = 3 e^{j\\frac{\\pi}{2}}$"}.</>}
          />
        </div>
      </Section>

      <Section title="Quiz de validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si l'impédance complexe d'un circuit de contrôle vaut Z = 3 + j4 Ohms, quel est le module de cette impédance ?",
              options: ["5 Ω", "7 Ω (la somme)", "25 Ω (le carré)"],
              correctAnswer: 0,
              explanation: "Rappel du calcul de module classique de Pythagore : sqrt(3² + 4²) = sqrt(9 + 16) = sqrt(25) = 5 Ω."
            },
            {
              question: "Quelle relation de phase correspond à l'argument d'un condensateur pur ?",
              options: ["0° (en phase)", "-90° (retard de phase)", "+90° (avance de phase)"],
              correctAnswer: 1,
              explanation: "Comme l'impédance vaut Zc = -j / (Cw), le vecteur pointe directement vers le bas de l'axe imaginaire, d'où un déphasage négatif de -90° (retard)."
            },
            {
              question: "Si j² = -1, que vaut le produit du complexe (1 + j)(1 - j) ?",
              options: ["0", "2", "j"],
              correctAnswer: 1,
              explanation: "Il s'agit d'une identité remarquable d'une quantité multipliée par son conjugué : (1.0)² - (j)² = 1.0 - (-1.0) = 1.0 + 1.0 = 2."
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

export default Course_Terminale_Tech_03_Nombres_Complexes_Ingenieur;
