import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { motion } from 'motion/react';
import { Sliders, Activity, HelpCircle } from 'lucide-react';

const Course_BTS_Industriel_02_Resonance: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [excitationOmega, setExcitationOmega] = useState(5.0); // excitation frequency omega in rad/s
  const [dampingZeta, setDampingZeta] = useState(0.2); // zeta
  const omega0 = 5.0; // fixed natural frequency of 5 rad/s

  // Animate harmonic movement in SVG
  const [angle, setAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Math equations for amplitude response factor A
  // Normalized frequency r = omega / omega0
  const r = excitationOmega / omega0;
  // Dynamic amplification factor: G = 1 / sqrt( (1 - r^2)^2 + (2 * zeta * r)^2 )
  const resonanceAmplification = 1 / Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(2 * dampingZeta * r, 2));

  // Determine resonance peak existence
  const hasResonancePeak = dampingZeta < 1 / Math.sqrt(2); // zeta < 0.707
  const resonanceOmega = hasResonancePeak ? omega0 * Math.sqrt(1 - 2 * dampingZeta * dampingZeta) : 0;

  useEffect(() => {
    let animationId: number;
    if (isPlaying) {
      const run = () => {
        setAngle((prev) => (prev + excitationOmega * 0.05) % (2 * Math.PI));
        animationId = requestAnimationFrame(run);
      };
      animationId = requestAnimationFrame(run);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, excitationOmega]);

  // Mass visual position based on steady state harmonic response
  // Amplified by amplification * cosine/sine oscillation
  const baseOscillation = Math.sin(angle);
  const massDisplacement = baseOscillation * (20 * Math.min(resonanceAmplification, 8)); // lock visible limit

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-BTS-IND-02"
        title="BTS Industriel : Phénomène de Résonance"
        subtitle="Explorez le comportement des systèmes mécaniques et de filtrage électrique soumis à une excitation sinusoïdale forcée."
        duration="1h 25"
      />

      {/* 1. Introduction */}
      <Section title="🎯 Introduction Pédagogique" icon="📢" color="indigo">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Dans le module précédent, nous avons étudié les oscillations libres. Que se passe-t-il lorsqu'un système mécanique ou électrique subit en continu une <strong>force d'excitation extérieure alternative périodique</strong> (telle que le balourd d'un moteur rotatif déséquilibré ou l'onde radio collectée par une antenne) ?
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Le système entre dans le régime d'ondes forcées. Lorsque la fréquence d'excitation s'accorde avec la fréquence propre de la structure, des transferts énergétiques maximaux s'opèrent : c'est le phénomène redoutable de <strong>résonance</strong>. Il peut détruire un moteur industriel ou, au contraire, être le composant fondamental recherché pour isoler et filtrer des ondes télécom.
        </p>
        <TipBanner type="warning" title="Danger industriel">
          Le design industriel impose un calcul strict des fréquences de résonance des arbres de transmission pour interdire le fonctionnement stationnaire au régime critique de vitesse (vitesse critique de rotation / fouettement).
        </TipBanner>
      </Section>

      {/* 2. Interactive Simulation */}
      <Section title="⚡ Simulateur de Résonance de Tension / Force" icon="⚡" color="rose">
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Modifiez la pulsation de la force d'excitation ("$\\omega$") et le ratio d'amortissement ("$\\zeta$") de la structure. Observez comment l'amplitude de l'oscillation mécanique s'envole lorsque vous approchez de la pulsation propre de {"$\\omega_0 = 5.00\\text{ rad/s}$"} !
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          {/* Sliders layout */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-950 dark:text-slate-50 text-base">
              <Sliders className="w-5 h-5 text-indigo-500" />
              Force d'Excitation
            </h4>

            {/* Excitation frequency slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Pulsation Excitation ({"$\\omega$"}) :</span>
                <span className="text-rose-600 font-bold">{excitationOmega.toFixed(2)} rad/s</span>
              </div>
              <input 
                type="range" min="1.0" max="10.0" step="0.1" value={excitationOmega}
                onChange={(e) => setExcitationOmega(parseFloat(e.target.value))}
                className="w-full accent-rose-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Damping zeta slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Facteur d'Amortissement ({"$\\zeta$"}) :</span>
                <span className="text-rose-600 font-bold">{dampingZeta.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.05" max="1.5" step="0.05" value={dampingZeta}
                onChange={(e) => setDampingZeta(parseFloat(e.target.value))}
                className="w-full accent-rose-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all font-semibold text-xs flex items-center justify-center gap-1"
              >
                {isPlaying ? "Pause" : "Simuler"}
              </button>
            </div>
          </div>

          {/* Interactive animated SVG */}
          <div className="lg:col-span-4 flex flex-col items-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-mono">Structure sous Excitation</span>
            <div className="relative w-full h-[225px] flex items-center justify-center">
              <svg width="180" height="220" className="border border-dashed border-slate-100 dark:border-slate-800/40 rounded-lg bg-slate-50/20 dark:bg-slate-900/10">
                {/* Ceiling with excitation wave visual */}
                <rect x="10" y="10" width="160" height="10" fill="#94a3b8" />
                <path d={`M 10 20 Q 50 ${20 + 8 * Math.sin(angle)} 90 20 T 170 20`} fill="none" stroke="#f43f5e" strokeWidth="2.5" />

                {/* Animated spring responding to dynamic position */}
                <path 
                  d={`M 90 20 
                      L 90 40 
                      L 80 ${40 + (100 + massDisplacement - 60) * 0.15} 
                      L 100 ${40 + (100 + massDisplacement - 60) * 0.3} 
                      L 80 ${40 + (100 + massDisplacement - 60) * 0.45} 
                      L 100 ${40 + (100 + massDisplacement - 60) * 0.6}
                      L 80 ${40 + (100 + massDisplacement - 60) * 0.75}
                      L 100 ${40 + (100 + massDisplacement - 60) * 0.9}
                      L 90 ${100 + massDisplacement}`} 
                  fill="none" 
                  stroke="#475569" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Dynamic mass with color transition on high resonance active */}
                <circle 
                  cx="90" 
                  cy={100 + massDisplacement} 
                  r="24" 
                  className={`transition-all duration-75 stroke-2 ${resonanceAmplification > 2 ? 'fill-rose-500 stroke-rose-600 shadow-lg' : 'fill-slate-400 stroke-slate-500'}`}
                />
                
                <text x="90" y={104 + massDisplacement} textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">
                  {resonanceAmplification > 2.2 ? "RÉSONANCE" : "Masse"}
                </text>
              </svg>
            </div>
          </div>

          {/* Amplification factor panel */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-2 font-medium">Facteur d'Amplification (T)</span>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Amplification relative {"$A_v$"}:</div>
                  <div className="text-3xl font-extrabold text-rose-500 font-mono">
                    {resonanceAmplification.toFixed(2)}x
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                    L'amplitude du signal ou de la position est multipliée par {resonanceAmplification.toFixed(1)} par rapport à la consigne statique.
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="text-[11px] text-slate-500 font-medium">Fréquence de Résonance maximale :</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {hasResonancePeak ? `${resonanceOmega.toFixed(2)} rad/s` : "Aucun pic ! (ζ ≥ 0.707)"}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-sans border-t pt-3 mt-4">
              {dampingZeta < 0.3 ? "Amortissement faible : le pic de résonance est aigu et dangereux." : "Amortissement élevé : le pic de résonance est étouffé, la structure est sélective sans danger de destruction."}
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Detailed Theory section with LaTeX formulas */}
      <Section title="📘 Modélisation Harmonique & Analyse de Transfert" icon="📚" color="slate">
        <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Sous une excitation externe harmonique périodique de pulsation {"$\\omega$"}, le modèle différentiel s'écrit :
        </p>

        <FormulaBox 
          title="Équation canonique sous excitation alternative" 
          math="\frac{d^2 y}{dt^2} + 2\zeta\omega_0 \frac{dy}{dt} + \omega_0^2 y = E_0 e^{i\omega t}" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-350 leading-relaxed">
          En recherchant une solution stationnaire sous forme complexe {"$\\underline{y}(t) = \\underline{Y} e^{i\\omega t}$"}, nous obtenons la <strong>fonction de transfert harmonique</strong> complexe :
        </p>

        <FormulaBox 
          title="Fonction de Transfert" 
          math="\underline{H}(i\omega) = \frac{\underline{Y}}{E_0} = \frac{1}{\omega_0^2 - \omega^2 + 2i\zeta\omega_0\omega}" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          L'amplitude maximale réelle est donnée par le module de cette fonction de transfert, que l'on normalise au moyen de la variable réduite {"$u = \\frac{\omega}{\\omega_0}$"} :
        </p>

        <FormulaBox 
          title="Module canonique d'amplification harmonique" 
          math="G(u) = \frac{1}{\omega_0^2 \sqrt{(1-u^2)^2 + (2\zeta u)^2}}" 
        />

        <div className="space-y-4 my-6">
          <InfoBlock type="definition" title="La condition de résonance d'un système (ζ < 0.707)">
            Pour que le module présente une valeur maximale maximale supérieure à la valeur à l'origine statique (pic), il faut que la dérivée du polynôme sous la racine s'annule, ce qui est possible uniquement si :
            <MathComponent block math="\zeta < \frac{1}{\sqrt{2}} \approx 0.707" />
            La pulsation de résonance s'exprime alors par :
            <MathComponent block math="\omega_r = \omega_0 \sqrt{1 - 2\zeta^2}" />
          </InfoBlock>

          <InfoBlock type="reminder" title="Le Facteur de Qualité (Q)">
            Le facteur de qualité physique calcule l'amplification obtenue exactement à la fréquence propre {"$\\omega = \\omega_0$"} (soit {"$u = 1$"}). Il se définit par :
            <MathComponent block math="Q = \frac{1}{2\zeta}" />
            Plus l'amortissement {"$\\zeta$"} est proche de 0, plus le facteur de qualité {"$Q$"} est élevé, ce qui caractérise un pic de résonance d'une intensité extrême.
          </InfoBlock>
        </div>
      </Section>

      {/* 4. Two solved exercises */}
      <Section title="🛠️ Exercices Résolus d'Examen" icon="🛠️" color="purple">
        <InteractiveExercise 
          title="Exercice 1 : Résonance d'une table d'usinage rapide (Option Conception / Productique)"
          question={
            <div className="space-y-2">
              <p>
                Une fraiseuse numérique subit des micro-chocs dus aux dents de fraise à une fréquence industrielle de rotation de {"$f = 50\\text{ Hz}$"}. L'ensemble de la table mobile présente une masse cumulée de {"$M = 10\\text{ kg}$"} et est monté sur glissières d'élasticité totale de raideur {"$K = 10^5\\text{ N/m}$"}.
              </p>
              <p className="font-semibold">
                S'approche-t-on d'un risque physique de résonance destructive ?
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Calcul de la pulsation propre de la table d'usinage</p>
              <MathComponent block math="\omega_0 = \sqrt{\frac{K}{M}} = \sqrt{\frac{100 000}{10}} = \sqrt{10 000} = 100\text{ rad/s}" />
              <p>La pulsation propre de la glissière mobile de la fraiseuse numérique vaut donc {"$\\omega_0 = 100\\text{ rad/s}$"}.</p>
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Évaluation de la pulsation de l'excitation de l'outil rotatif</p>
              <p>L'effort rotatif dû à la rotation de la fraise possède une fréquence de {"$f = 50\\text{ Hz}$"}. La pulsation d'excitation temporelle {"$\\omega_e$"} est calculée par :</p>
              <MathComponent block math="\omega_e = 2\pi f = 2\pi \times 50 = 100\pi \approx 314.16\text{ rad/s}" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Conclusion et diagnostic de sécurité de fabrication</p>
              <p>Nous comparons les deux pulsations :</p>
              <p>Pulsation excitation : {"$\\omega_e \\approx 314.16\\text{ rad/s}$"} contre Pulsation propre : {"$\\omega_0 = 100\\text{ rad/s}$"}.</p>
              <p>Puisque la pulsation d'excitation est largement éloignée (plus de 3 fois supérieure), le système est hors domaine de résonance. Le châssis de la machine-outil n'offre aucun danger de fouettement lors des travaux de fraisage.</p>
            </div>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Facteur de Qualité d'un filtre RLC Télécom (BTS SIO / CIEL)"
          question={
            <div className="space-y-2">
              <p>
                Un filtre de réception radio Bluetooth utilise un condensateur {"$C = 20\\text{ pF}$"}, une bobine {"$L = 80\\text{ nH}$"} et une faible résistance série {"$R = 4\\ \\Omega$"}.
              </p>
              <p className="font-semibold">
                Calculez son facteur de qualité {"$Q$"} et donnez la bande passante associée.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Se remémorer la formule de Q pour le circuit RLC</p>
              <p>Pour un circuit RLC série, le facteur de qualité de filtrage se calcul par :</p>
              <MathComponent block math="Q = \frac{1}{R}\sqrt{\frac{L}{C}}" />
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Calcul numérique</p>
              <p>Convertissons les valeurs dans les unités SI :</p>
              <p>{"$L = 80 \times 10^{-9}\text{ H}$"} et {"$C = 20 \times 10^{-12}\text{ F}$"}.</p>
              <MathComponent block math="Q = \frac{1}{4}\sqrt{\frac{80 \times 10^{-9}}{20 \times 10^{-12}}} = \frac{1}{4}\sqrt{4000} \approx \frac{1}{4} \times 63.25 = 15.81" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Calcul de la bande passante</p>
              <p>La pulsation propre du filtre vaut :</p>
              <MathComponent block math="\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{1.6 \times 10^{-18}}} \approx 7.91 \times 10^8\text{ rad/s}" />
              <p>Ce qui donne une fréquence centrale de résonance {"$f_0 \\approx 125.8\\text{ MHz}$"}.</p>
              <p>La bande passante à -3dB vaut {"$\\Delta f = \\frac{f_0}{Q} = \\frac{125.8}{15.81} \\approx 7.96\\text{ MHz}$"}. C'est un filtre de haute sélectivité !</p>
            </div>
          ]}
        />
      </Section>

      {/* 5. Interactive Flashcards */}
      <Section title="⚡ Flashcards de Révision" icon="⚡" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Enregistrez les variables-clés de la résonance forcée :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Condition de Résonance</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Quelle est la valeur limite supérieure de ζ au-delà de laquelle aucune résonance mécanique n'est possible ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <MathComponent block math="\zeta_c = \frac{1}{\sqrt{2}} \approx 0.707" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">Au-delà de cette valeur critique (amortissement surcritique), la réponse décline monotonement sans jamais former de surtension ou pic de résonance.</span>
              </div>
            }
          />

          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Formule Surtension</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Comment se calcule le facteur d'amplification mécanique à la fréquence propre, caractérisant la surtension ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <MathComponent block math="Q = \frac{1}{2\zeta}" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">C'est la définition mathématique canonique du facteur de surtension, noté Q.</span>
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
              question: "La résonance est-elle toujours un danger qu'il faut fuir en ingénierie ?",
              answer: (
                <p>
                  Non ! En ingénierie mécanique structurelle (bâtiments, moteurs, ventilateurs, ponts), la résonance est effectivement l'ennemi juré à cause des efforts destructeurs engendrés. Cependant, en radio-télécom, traitement du signal ou imagerie par résonance magnétique (IRM), elle est exploitée volontairement pour isoler un signal utile noyé au sein d'un flot d'ondes parasites.
                </p>
              )
            },
            {
              question: "Pourquoi un pont tremble-t-il sous les pas répétés d'un peloton de militaires ?",
              answer: (
                <p>
                  Lorsque des dizaines de marcheurs foulent le pont de concert à la même cadence, ils provoquent une force d'excitation périodique unifiée. Si le rythme de marche coïncide avec la pulsation de flexion de la travée, celle-ci emmagasine l'énergie et commence à osciller d'une amplitude colossale de droite à gauche, menant à une rupture mécanique immédiate. C'est pourquoi l'ordre militaire historique est de rompre le pas avant de s'engager sur un pont.
                </p>
              )
            },
            {
              question: "Qu'est-ce que la bande passante à -3 dB d'un résonateur ?",
              answer: (
                <p>
                  La bande passante à -3 dB correspond à la gamme de fréquences au sein de laquelle l'énergie globale restituée par l'oscillateur est supérieure ou égale à la moitié de l'énergie maximale observée au pic. Plus la bande passante est étroite, plus le filtre est sélectif et précis.
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
              question: "Pour un rapport d'amortissement ζ = 0.5, quelle est la pulsation de résonance maximale ωr par rapport à la pulsation libre de base ω₀ ?",
              options: [
                "ωr = 0.5 * ω₀",
                "ωr = 0.707 * ω₀",
                "ωr = 0.866 * ω₀"
              ],
              correctAnswer: 1,
              explanation: "On utilise la formule : ωr = ω₀ * √(1 - 2*0.5²) = ω₀ * √(1 - 2*0.25) = ω₀ * √0.5 ≈ 0.707 * ω₀."
            },
            {
              question: "À quelle valeur de pulsation d'excitation ω correspond le facteur de surtension Q d'un circuit ?",
              options: [
                "À la pulsation propre ω0",
                "À 0 rad/s",
                "À une pulsation infinie"
              ],
              correctAnswer: 0,
              explanation: "Par définition d'épreuve académique, le facteur de surtension Q est mesuré en un point précis d'excitation où u = ω / ω₀ = 1, soit précisément à la pulsation propre ω0."
            },
            {
              question: "Quel facteur de qualité obtient-on pour un système de glissement quasi idéal présentant un amortissement ultra faible de ζ = 0.05 ?",
              options: [
                "Q = 5",
                "Q = 10",
                "Q = 20"
              ],
              correctAnswer: 1,
              explanation: "On applique la relation Q = 1 / (2*ζ) = 1 / (2 * 0.05) = 1 / 0.1 = 10."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je connais l'importance de l'analyse harmonique forcée.",
            "Je maîtrise l'inéquation donnant l'existence d'un pic de résonance.",
            "Je sais calculer analytiquement le facteur de surtension Q et la pulsation ωr.",
            "Je comprends les applications industrielles en télécom et structure mécanique."
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

export default Course_BTS_Industriel_02_Resonance;
