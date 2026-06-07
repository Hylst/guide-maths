import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Sliders, Activity } from 'lucide-react';

const Course_BTS_Industriel_01_Vibrations: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Physical parameters for the simulation
  const [mass, setMass] = useState(2); // m in kg
  const [springK, setSpringK] = useState(50); // k in N/m
  const [dampingC, setDampingC] = useState(4); // c in N*s/m
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [curve, setCurve] = useState<{ t: number; y: number }[]>([]);

  // Derived calculations
  const omega0 = Math.sqrt(springK / mass); // rad/s
  const zeta = dampingC / (2 * Math.sqrt(springK * mass)); // damping ratio
  const pseudoOmega = omega0 * Math.sqrt(Math.abs(1 - zeta * zeta));

  // Determine regime name and description
  let regimeName = "Inconnu";
  let regimeColor = "indigo";
  let regimeDesc = "";
  if (zeta < 1) {
    regimeName = "Régime Pseudo-Périodique (Sous-amorti)";
    regimeColor = "indigo";
    regimeDesc = "Le système oscille tout en s'amortissant exponentiellement au cours du temps.";
  } else if (Math.abs(zeta - 1) < 0.05) {
    regimeName = "Régime Critique";
    regimeColor = "emerald";
    regimeDesc = "Le retour à l'équilibre se fait le plus rapidement possible, sans aucune oscillation.";
  } else {
    regimeName = "Régime Apériodique (Sur-amorti)";
    regimeColor = "amber";
    regimeDesc = "L'amortissement est très fort. Le système retourne lentement à l'équilibre sans osciller.";
  }

  // Physics animation loop
  useEffect(() => {
    let animationId: number;
    if (isPlaying) {
      const step = () => {
        setTime((prev) => {
          const next = prev + 0.05;
          // Calculate theoretical position: y(0) = 40, y'(0) = 0
          let val = 0;
          const yInitial = 35;
          if (zeta < 1) {
            // Underdamped oscillation
            val = yInitial * Math.exp(-zeta * omega0 * next) * Math.cos(pseudoOmega * next);
          } else if (zeta > 1) {
            // Overdamped return
            const r1 = -zeta * omega0 + omega0 * Math.sqrt(zeta * zeta - 1);
            const r2 = -zeta * omega0 - omega0 * Math.sqrt(zeta * zeta - 1);
            // Constants from initial conditions: A + B = yInitial, A*r1 + B*r2 = 0
            const B = (yInitial * r1) / (r1 - r2);
            const A = yInitial - B;
            val = A * Math.exp(r1 * next) + B * Math.exp(r2 * next);
          } else {
            // Critical
            const C2 = yInitial;
            const C1 = yInitial * omega0;
            val = (C1 * next + C2) * Math.exp(-omega0 * next);
          }

          // Append to curve graph for history
          setCurve((c) => {
            const updated = [...c, { t: next, y: val }];
            if (updated.length > 50) updated.shift();
            return updated;
          });

          return next;
        });
        animationId = requestAnimationFrame(step);
      };
      animationId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, zeta, omega0, pseudoOmega]);

  const resetSimulation = () => {
    setTime(0);
    setCurve([]);
  };

  // SVG representation parameters
  const heightOffset = 100;
  // Dynamic mass position based on computed y
  const currentY = curve.length > 0 ? curve[curve.length - 1].y : 35;
  const massPos = heightOffset + currentY * 1.5;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-BTS-IND-01"
        title="BTS Industriel : Vibrations & Équations Différentielles"
        subtitle="Apprenez à modéliser, animer, et résoudre les équations différentielles linéaires régissant les oscillateurs mécaniques et électriques."
        duration="1h 30"
      />

      {/* 1. Introduction */}
      <Section title="🎯 Introduction Pédagogique" icon="📐" color="indigo">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Dans tous les secteurs industriels (mécanique générale, aéronautique, thermique, génie électrique), l'étude des vibrations est capitale. Qu'il s'agisse de concevoir des amortisseurs de voiture, la suspension de moteurs industriels, ou de comprendre les filtres passe-bande électriques RLC, l'outil mathématique central reste identique : les <strong>équations différentielles linéaires du second ordre à coefficients constants homogènes</strong>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Ce cours présente les méthodes rigoureuses de résolution de ces équations canoniques et permet de visualiser simultanément la traduction physique (mouvement, courbes de trajectoire) des coefficients réels choisis. Parcourez chaque étape, explorez notre simulateur interactif et validez vos compétences pour débloquer votre progression !
        </p>
        <TipBanner type="info" title="Lien math-industrie">
          En BTS, nous faisons le lien permanent entre la constante de temps des ingénieurs, les pôles de la fonction de transfert complexes et la forme de la réponse transitoire d'un système asservi.
        </TipBanner>
      </Section>

      {/* 2. Interactive SVG animation */}
      <Section title="⚙️ Simulateur Interactif d'Amortisseur" icon="⚙️" color="emerald">
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Modifiez en temps réel les curseurs physiques ci-dessous pour changer la masse, la raideur du ressort ou la force de l'amortisseur hydraulique : observez comment le régime oscille ou s'éteint instantanément !
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          {/* Sliders layout */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-950 dark:text-slate-50 text-base">
              <Sliders className="w-5 h-5 text-indigo-500" />
              Réglages Physiques
            </h4>

            {/* Mass slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Masse (m) :</span>
                <span className="text-indigo-600 font-bold">{mass} kg</span>
              </div>
              <input 
                type="range" min="0.5" max="10" step="0.5" value={mass}
                onChange={(e) => { setMass(parseFloat(e.target.value)); resetSimulation(); }}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Spring constant slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Raideur Ressort (k) :</span>
                <span className="text-indigo-600 font-bold">{springK} N/m</span>
              </div>
              <input 
                type="range" min="10" max="150" step="5" value={springK}
                onChange={(e) => { setSpringK(parseFloat(e.target.value)); resetSimulation(); }}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Damping coefficient slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Frottement Amortisseur (c) :</span>
                <span className="text-indigo-600 font-bold">{dampingC} N·s/m</span>
              </div>
              <input 
                type="range" min="0" max="40" step="1" value={dampingC}
                onChange={(e) => { setDampingC(parseFloat(e.target.value)); resetSimulation(); }}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Simulation controls */}
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all font-semibold text-xs flex items-center justify-center gap-1"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Lancer"}
              </button>
              <button 
                onClick={resetSimulation}
                className="py-2 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all font-semibold text-xs flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Interactive animated SVG mechanical schematic */}
          <div className="lg:col-span-4 flex flex-col items-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-mono">Schéma d'Oscillation</span>
            <div className="relative w-full h-[220px] flex items-center justify-center">
              <svg width="180" height="220" className="border border-dashed border-slate-100 dark:border-slate-800/40 rounded-lg bg-slate-50/20 dark:bg-slate-900/10">
                {/* Ceiling */}
                <rect x="10" y="10" width="160" height="10" fill="#94a3b8" />
                <line x1="20" y1="20" x2="160" y2="20" stroke="#475569" strokeWidth="2" />

                {/* Spring - SVG winding chain */}
                <path 
                  d={`M 40 20 
                      L 40 35 
                      L 30 ${35 + (massPos - 60) * 0.15} 
                      L 50 ${35 + (massPos - 60) * 0.3} 
                      L 30 ${35 + (massPos - 60) * 0.45} 
                      L 50 ${35 + (massPos - 60) * 0.6}
                      L 30 ${35 + (massPos - 60) * 0.75}
                      L 50 ${35 + (massPos - 60) * 0.9}
                      L 40 ${massPos}`} 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Hydraulic damper cylinder */}
                <line x1="120" y1="20" x2="120" y2="50" stroke="#64748b" strokeWidth="3" />
                <rect x="105" y="50" width="30" height="50" fill="none" stroke="#64748b" strokeWidth="3" />
                {/* Piston moving in the cylinder */}
                <line x1="120" y1="40" x2="120" y2={`${massPos + 10}`} stroke="#0f172a" strokeWidth="2.5" />
                <line x1="110" y1={`${massPos + 10}`} x2="130" y2={`${massPos + 10}`} stroke="#10b981" strokeWidth="4" />

                {/* Mass object */}
                <rect 
                  x="20" 
                  y={massPos} 
                  width="120" 
                  height="30" 
                  rx="6" 
                  className="fill-indigo-500/90 dark:fill-indigo-600/90 stroke-indigo-600 dark:stroke-indigo-500" 
                  strokeWidth="2" 
                />
                
                {/* Label mass value inside */}
                <text x="80" y={massPos + 18} textAnchor="middle" fill="#ffffff" className="font-mono text-[10px] font-bold">
                  {mass} kg
                </text>
              </svg>
            </div>
          </div>

          {/* Physical feedback parameters panel */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-2">Constantes Calculées</span>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Pulsation propre ({"$\\omega_0$"}) :</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {omega0.toFixed(2)} <span className="text-xs text-slate-500">rad/s</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Facteur d'amortissement ({"$\\zeta$"}) :</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {zeta.toFixed(3)}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Régime physique actuel :</div>
                  <div className={`mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-${regimeColor}-100 dark:bg-${regimeColor}-900/30 text-${regimeColor}-800 dark:text-${regimeColor}-200`}>
                    {regimeName}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-sans border-t pt-3 mt-4">
              {regimeDesc}
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Detailed Theory section with LaTeX formulas */}
      <Section title="📘 Théorie Fondamentale & Régimes Dynamiques" icon="📚" color="slate">
        <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Un oscillateur harmonique linéaire amorti libre se modélise par l'équation différentielle homogène du second ordre suivante, nommée <strong>équation canonique temporelle</strong> :
        </p>

        <FormulaBox 
          title="Équation Différentielle Canonique Temporelle" 
          math="\frac{d^2 y}{dt^2} + 2\zeta\omega_0 \frac{dy}{dt} + \omega_0^2 y = 0" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour en trouver les solutions analytiques réelles, on pose l'équation caractéristique associée avec l'inconnue complexe {"$r$"} :
        </p>

        <FormulaBox 
          title="Équation Caractéristique" 
          math="r^2 + 2\zeta\omega_0 r + \omega_0^2 = 0" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Le discriminant réduit associé vaut : {"$\\Delta' = (\\zeta\\omega_0)^2 - \\omega_0^2 = \\omega_0^2(\\zeta^2 - 1)$"}. Son signe dépend exclusivement de la valeur relative de la variable amortie {"$\\zeta$"} par rapport à 1.
        </p>

        <div className="space-y-4 my-6">
          <InfoBlock type="definition" title="1. Régime Pseudo-Périodique (ζ < 1)">
            Lorsque le discriminant est strictement négatif, l'équation admet deux racines complexes conjuguées :
            <MathComponent block math="r_{1,2} = -\zeta\omega_0 \pm i \omega_0 \sqrt{1-\zeta^2} = -\alpha \pm i \omega" />
            La pseudo-pulsation est <MathComponent math="\omega = \omega_0 \sqrt{1-\zeta^2}" />. Les solutions physiques s'écrivent :
            <MathComponent block math="y(t) = e^{-\zeta\omega_0 t} \left( A \cos(\omega t) + B \sin(\omega t) \right)" />
            Les oscillations s'atténuent suivant une enveloppe exponentielle d'équation <MathComponent math="\pm C e^{-\zeta\omega_0 t}" />.
          </InfoBlock>

          <InfoBlock type="reminder" title="2. Régime Critique (ζ = 1)">
            Le discriminant s'annule. L'équation caractéristique admet une racine double réelle :
            <MathComponent block math="r_0 = -\omega_0" />
            Les solutions réelles de l'équation différentielle s'écrivent sous la forme :
            <MathComponent block math="y(t) = (A t + B) e^{-\omega_0 t}" />
            C'est l'amortissement théorique idéal utilisé dans les verins hydrauliques de portes coupe-feu ou de coffres arrière : il garantit la fermeture rapide sans aucun choc oscillatoire.
          </InfoBlock>

          <InfoBlock type="funfact" title="3. Régime Apériodique (ζ > 1)">
            Le discriminant est positif. Les deux racines sont de pures valeurs négatives réelles :
            <MathComponent block math="r_{1,2} = -\zeta\omega_0 \pm \omega_0 \sqrt{\zeta^2 - 1}" />
            L'équation ne comporte aucun élément trigonométrique. Le retour est purement apériodique :
            <MathComponent block math="y(t) = A e^{r_1 t} + B e^{r_2 t}" />
            Le fluide visqueux amortit tellement le déplacement qu'il ralentit son défilement.
          </InfoBlock>
        </div>
      </Section>

      {/* 4. Two solved exercises */}
      <Section title="🛠️ Exercices Résolus d'Examen" icon="🛠️" color="purple">
        <InteractiveExercise 
          title="Exercice 1 : Suspension de Châssis (Option Travaux Publics / CPI)"
          question={
            <div className="space-y-2">
              <p>
                Un amortisseur routier supporte une fraction de carrosserie équivalente à une masse {"$M = 400\\text{ kg}$"}. La raideur du ressort associé à la suspension vaut {"$K = 10000\\text{ N/m}$"}. On néglige les masses non suspendues.
              </p>
              <p className="font-semibold">
                1. Calculez la pulsation propre {"$\\omega_0$"} du système suspendu.
              </p>
              <p className="font-semibold">
                2. On injecte de l'huile moteur de coefficient d'amortissement {"$C = 2000\\text{ N}\\cdot\\text{s/m}$"}. Les oscillations sont-elles de nature pseudo-périodiques ?
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Calcul de la pulsation propre</p>
              <p>On applique la formule fondamentale du système masse-ressort simple :</p>
              <MathComponent block math="\omega_0 = \sqrt{\frac{K}{M}} = \sqrt{\frac{10000}{400}} = \sqrt{25} = 5\text{ rad/s}" />
              <p>La fréquence propre des vibrations de caisse associée vaut environ : {"$f_0 \\approx 0.8\\text{ Hz}$"}.</p>
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Calcul du coefficient d'amortissement critique</p>
              <p>Le coefficient d'amortissement critique {"$C_{crit}$"} correspond au cas {"$\\zeta = 1$"}. On utilise la relation :</p>
              <MathComponent block math="C_{crit} = 2 \sqrt{K M} = 2 \sqrt{10000 \times 400} = 2 \sqrt{4\cdot 10^6} = 2 \times 2000 = 4000\text{ N}\cdot\text{s/m}" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Calcul du facteur d'amortissement d'origine hydraulique et conclusion</p>
              <p>Le ratio d'amortissement physique {"$\\zeta$"} vaut :</p>
              <MathComponent block math="\zeta = \frac{C}{C_{crit}} = \frac{2000}{4000} = 0.5" />
              <p>Puisque {"$\\zeta = 0.5 < 1$"}, le système est en <strong>régime pseudo-périodique sous-amorti</strong>. La carrosserie va effectuer des rebonds à la pseudo-pulsation {"$\\omega = 5 \\sqrt{1 - 0.5^2} \\approx 4.33\\text{ rad/s}$"} avant de s'arrêter complètement.</p>
            </div>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Transitoire de Circuit RLC (Génie Électrotechnique)"
          question={
            <div className="space-y-2">
              <p>
                Un circuit électrotechnique bouchon comprend une résistance en série de {"$R = 100\\ \\Omega$"}, une grande bobine d'inductance {"$L = 0.1\\text{ H}$"} et un condensateur plan de capacité {"$C = 10\\ \\mu\\text{F}$"}. 
              </p>
              <p className="font-semibold">
                Calculez les racines réelles ou complexes de l'équation caractéristique associée aux oscillations de tension, puis déterminez le régime physique.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Poser l'équation différentielle du circuit RLC</p>
              <p>La loi des mailles appliquée au circuit série alimenté par un échelon nul donne :</p>
              <MathComponent block math="L \frac{d^2 i}{dt^2} + R \frac{di}{dt} + \frac{1}{C} i = 0 \implies \frac{d^2 i}{dt^2} + \frac{R}{L} \frac{di}{dt} + \frac{1}{LC} i = 0" />
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Évaluation numérique du discriminant</p>
              <p>L'équation caractéristique s'écrit : {"$r^2 + \\frac{R}{L} r + \\frac{1}{LC} = 0$"}. Soit numériquement :</p>
              <MathComponent block math="r^2 + \frac{100}{0.1} r + \frac{1}{0.1 \times 10 \times 10^{-6}} = 0 \implies r^2 + 1000 r + 10^6 = 0" />
              <p>Calculons le discriminant réel {"$\\Delta$"}:</p>
              <MathComponent block math="\Delta = 1000^2 - 4 \times 1 \times 10^6 = 10^6 - 4 \cdot 10^6 = -3 \cdot 10^6 < 0" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Expression des racines complexes et conclusion</p>
              <p>Le discriminant est strictement négatif. Il y a donc deux solutions complexes conjuguées :</p>
              <MathComponent block math="r_{1,2} = \frac{-1000 \pm i \sqrt{3 \cdot 10^6}}{2} \approx -500 \pm 866 i" />
              <p>Le système physique oscille donc à une fréquence pseudo-périodique amortie par l'effet Joule de la résistance à la féquence {"$f = \\frac{866}{2\\pi} \\approx 137.8\\text{ Hz}$"}.</p>
            </div>
          ]}
        />
      </Section>

      {/* 5. Interactive Flashcards */}
      <Section title="⚡ Flashcards de Révision" icon="⚡" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Cliquez sur chaque carte ci-dessous pour retourner et mémoriser instantanément les relations mathématiques primordiales de BTS :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Formule Physique</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Quelle est l'expression de la pseudo-pulsation d'un oscillateur amorti ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-indigo-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <MathComponent block math="\omega = \omega_0 \sqrt{1-\zeta^2}" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">Valide exclusivement pour un ratio d'amortissement {"$\\zeta < 1$"}.</span>
              </div>
            }
          />

          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Régime Limite</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Quel régime physique offre le retour le plus rapide à l'équilibre sans risque de dépassement ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-indigo-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Le Régime Critique</span>
                <MathComponent math="\zeta = 1" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">C'est la frontière mathématique idéale entre les oscillations et la viscosité étouffante.</span>
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
              question: "Quelle est la différence physique réelle entre la pulsation propre (ω₀) et la pseudo-pulsation (ω) ?",
              answer: (
                <p>
                  La pulsation propre ({"$\\omega_0$"}) correspondrait à la vitesse de rotation libre du système en l'absence microscopique de tout frottement ({"$\\zeta = 0$"}). En présence de résistance électrique ou de viscosité hydraulique ({"$\\zeta > 0$"}), la résistance mécanique freine le cycle, réduisant la fréquence observée : d'où la pseudo-pulsation {"$\\omega = \\omega_0 \\sqrt{1-\\zeta^2}$"}, qui est toujours inférieure à {"$\\omega_0$"}.
                </p>
              )
            },
            {
              question: "Pourquoi l'oscillateur s'appelle-t-il 'pseudo-périodique' au lieu de périodique ?",
              answer: (
                <p>
                  Une fonction est périodique si elle se répète exactement à l'identique d'amplitude : {"$f(t+T) = f(t)$"}. Or, à cause de l'enveloppe exponentielle décroissante due à la perte d'énergie thermique (amortissement), l'amplitude maximale décline constamment. Ainsi, les passages à zéro sont réguliers (pseudo-période), mais les sommets d'amplitude diminuent. Ce n'est donc pas périodique au sens littéral du terme, d'où le terme 'pseudo'.
                </p>
              )
            },
            {
              question: "Comment dimensionner les suspensions automobiles pour le confort passager ?",
              answer: (
                <p>
                  Les ingénieurs cherchent un amortissement proche d'un ratio de {"$\\zeta \\approx 0.7$"}. Ce ratio spécifique (un peu sous-amorti) offre un amortissement extrêmement protecteur sans raideur excessive, évitant à la carrosserie de tressauter indéfiniment tout en lissant les dénivellations de la chaussée.
                </p>
              )
            }
          ]}
        />
      </Section>

      {/* 7. Comprehensive Quiz with 3 questions minimum */}
      <Section title="📝 Mini-Quiz de Validation" icon="🎓" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Répondez correctement à ces 3 questions réelles de synthèse d'examens BTS pour prouver votre maîtrise du modèle de vibrations :
        </p>

        <Quiz 
          questions={[
            {
              question: "Que vaut la racine caractéristique double réelle d'un système oscillant en régime critique ?",
              options: [
                "-ζ ω₀",
                "-ω₀",
                "i ω₀"
              ],
              correctAnswer: 1,
              explanation: "Pour ζ = 1, l'équation r² + 2ω₀r + ω₀² s'identifie à (r+ω₀)² = 0, dont la solution double réelle unique est r₀ = -ω₀."
            },
            {
              question: "Si le ratio d'amortissement ζ vaut 0.8, quelle est la proportion de la pseudo-pulsation ω par rapport à la pulsation propre d'origine ω₀ ?",
              options: [
                "60 %",
                "80 %",
                "100 %"
              ],
              correctAnswer: 0,
              explanation: "La relation donne ω = ω₀ * √(1 - 0.8²) = ω₀ * √(1 - 0.64) = ω₀ * √0.36 = 0.60 * ω₀, soit exactement 60% de sa valeur."
            },
            {
              question: "En génie électrique, pour un circuit RLC série, par quoi le coefficient d'amortissement ζ est-il physiquement provoqué ?",
              options: [
                "L'inductance pure de la bobine",
                "L'effet joule thermique de la résistance R",
                "Le stockage de charge dans le condensateur"
              ],
              correctAnswer: 1,
              explanation: "Seul l'élément résistif R dissipe l'énergie calorifique sous forme d'effet Joule, créant le déclin d'amplitude (damping). L'inductance et la capacité ne font que transférer l'énergie sans perte."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais écrire l'équation différentielle temporelle canonique d'un oscillateur.",
            "Je sais calculer analytiquement le coefficient d'amortissement ζ.",
            "Je sais identifier instantanément les 3 régimes d'oscillation libre.",
            "Je maîtrise le calcul des racines complexes et des pseudo-périodes pour mon diplôme de BTS."
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

export default Course_BTS_Industriel_01_Vibrations;
