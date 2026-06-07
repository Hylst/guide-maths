import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, Activity, HelpCircle } from 'lucide-react';

const Course_BTS_Industriel_03_Fourier: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [waveType, setWaveType] = useState<'square' | 'triangle' | 'sawtooth'>('square');
  const [numHarmonics, setNumHarmonics] = useState(3); // n = 1 to 10

  // Generate SVG path for the Fourier Synthesis dynamically
  const width = 360;
  const height = 150;
  const padding = 20;
  const scaleX = (width - 2 * padding) / (2 * Math.PI);
  const scaleY = (height - 2 * padding) / 2;

  // Compute Fourier approximation at point x (radians)
  const computeFourierY = (x: number, type: 'square' | 'triangle' | 'sawtooth', maxN: number) => {
    let sum = 0;
    if (type === 'square') {
      // Square wave: f(x) = 4/pi * sum_{k=1..maxN} (sin((2k-1)x) / (2k-1))
      for (let k = 1; k <= maxN; k++) {
        const n = 2 * k - 1;
        sum += Math.sin(n * x) / n;
      }
      return (4 / Math.PI) * sum;
    } else if (type === 'triangle') {
      // Triangle wave: f(x) = 8/(pi^2) * sum_{k=1..maxN} ( (-1)^(k-1) * sin((2k-1)x) / (2k-1)^2 )
      for (let k = 1; k <= maxN; k++) {
        const n = 2 * k - 1;
        const sign = k % 2 === 1 ? 1 : -1;
        sum += (sign * Math.sin(n * x)) / (n * n);
      }
      return (8 / (Math.PI * Math.PI)) * sum;
    } else {
      // Sawtooth wave: f(x) = 2/pi * sum_{n=1..maxN} ( (-1)^(n+1) * sin(n x) / n )
      for (let n = 1; n <= maxN; n++) {
        const sign = n % 2 === 1 ? 1 : -1;
        sum += (sign * Math.sin(n * x)) / n;
      }
      return (2 / Math.PI) * sum;
    }
  };

  // Compile path points into an SVG d string
  let pathD = '';
  for (let px = 0; px <= 180; px++) {
    // scale to [0, 2pi]
    const xVal = (px / 180) * 2 * Math.PI;
    const yVal = computeFourierY(xVal, waveType, numHarmonics);
    // Draw coordinates
    const graphX = padding + px * ((width - 2 * padding) / 180);
    const graphY = height / 2 - yVal * scaleY;
    if (px === 0) {
      pathD += `M ${graphX} ${graphY}`;
    } else {
      pathD += ` L ${graphX} ${graphY}`;
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-BTS-IND-03"
        title="BTS Industriel : Analyse de Fourier & Harmoniques"
        subtitle="Maîtrisez la décomposition spectrale des signaux périodiques industriels pour filtrer et décoder les ondes de puissance."
        duration="1h 40"
      />

      {/* 1. Introduction */}
      <Section title="🎯 Introduction Pédagogique" icon="📐" color="indigo">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Dans le monde de l'électricité industrielle et des transmissions sans fil, les oscillations pures n'existent que rarement à l'état naturel. La majorité des ondes alternatives de puissance (hacheurs, onduleurs, variateurs de vitesse) et des signaux de communication présentent des distorsions complexes.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Le physicien et mathématicien **Joseph Fourier** a démontré un résultat révolutionnaire : *Tout signal périodique continu par morceaux peut être reconstruit de façon unique par une somme infinie d'harmoniques de nature sinusoïdale pure*. Ce cours détaille les mathématiques derrière les séries de Fourier et propose un instrument interactif pour visualiser la synthèse harmonique.
        </p>
        <TipBanner type="info" title="L'importance de l'analyse spectrale">
          Les ingénieurs utilisent des analyseurs de spectre pour mesurer les harmoniques parasites réinjectées sur le réseau EDF, évitant ainsi la surchauffe des transformateurs bobinés industriels.
        </TipBanner>
      </Section>

      {/* 2. Interactive Synthesizer component */}
      <Section title="🎛️ Synthétiseur Harmonique de Fourier" icon="🎛️" color="emerald">
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Choisissez un type d'onde de référence ci-dessous et réglez le curseur de sommation pour observer comment l'empilement d'harmoniques élémentaires dessine et sculpte progressivement la forme géométrique voulue :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          {/* Wave type & sliders panel */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-950 dark:text-slate-50 text-base">
              <Sliders className="w-5 h-5 text-emerald-500" />
              Sélecteur de Signal
            </h4>

            {/* Select Wave type button group */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-medium text-slate-500">Forme d'onde souhaitée :</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setWaveType('square')}
                  className={`flex-1 py-1 px-2.5 rounded-lg border text-xs font-bold transition-all ${waveType === 'square' ? 'bg-emerald-600 border-emerald-650 text-white' : 'bg-white dark:bg-slate-950 border-slate-200 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}
                >
                  Carré
                </button>
                <button 
                  onClick={() => setWaveType('triangle')}
                  className={`flex-1 py-1 px-2.5 rounded-lg border text-xs font-bold transition-all ${waveType === 'triangle' ? 'bg-emerald-600 border-emerald-650 text-white' : 'bg-white dark:bg-slate-950 border-slate-200 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}
                >
                  Triangle
                </button>
                <button 
                  onClick={() => setWaveType('sawtooth')}
                  className={`flex-1 py-1 px-2.5 rounded-lg border text-xs font-bold transition-all ${waveType === 'sawtooth' ? 'bg-emerald-600 border-emerald-650 text-white' : 'bg-white dark:bg-slate-950 border-slate-200 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}
                >
                  Dents de scie
                </button>
              </div>
            </div>

            {/* Harmonic Count Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Nombre d'harmoniques (N) :</span>
                <span className="text-emerald-600 font-extrabold">{numHarmonics}</span>
              </div>
              <input 
                type="range" min="1" max="10" step="1" value={numHarmonics}
                onChange={(e) => setNumHarmonics(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-sans block mt-1">
                {waveType === 'square' && `Somme des fréquences impaires f, 3f, 5f ... jusqu'à ${2 * numHarmonics - 1}f.`}
                {waveType === 'triangle' && `Déclin rapide des amplitudes en 1/n² jusqu'à l'harmonique ${2 * numHarmonics - 1}.`}
                {waveType === 'sawtooth' && `Présence de toutes les harmoniques paires et impaires jusqu'au rang ${numHarmonics}.`}
              </span>
            </div>
          </div>

          {/* Interactive live rendering */}
          <div className="lg:col-span-8 flex flex-col items-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-mono">Signal Synthétisé : s(t)</span>
            
            <div className="relative w-full h-[160px] flex items-center justify-center">
              <svg width={width} height={height} className="border border-slate-100 dark:border-slate-800/40 rounded-lg bg-slate-50/50 dark:bg-slate-900/10">
                {/* Horizontal reference lines */}
                <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#94a3b8" strokeDasharray="3" />
                
                {/* Mathematical synthesized waveform path */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            <div className="w-full flex justify-between text-[11px] px-2 font-mono text-slate-500 mt-2">
              <span>0 (Début du motif)</span>
              <span>π (Demi-période)</span>
              <span>2π (Fin du motif)</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Detailed Theory section with LaTeX formulas */}
      <Section title="📘 Théorème de Dirichlet & Formules du Coefficient" icon="📚" color="slate">
        <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Soit un signal {"$f(t)$"} réel, périodique de période {"$T$"} et de pulsation fondamentale {"$\\omega = \\frac{2\\pi}{T}$"}. Sous les conditions de Dirichlet, on écrit sa décomposition en série trigonométrique réelle :
        </p>

        <FormulaBox 
          title="Décomposition de Fourier d'un Signal" 
          math="f(t) = a_0 + \sum_{n=1}^{+\infty} \left( a_n \cos(n\omega t) + b_n \sin(n\omega t) \right)" 
        />

        <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Les coefficients réels de la décomposition s'obtiennent par calcul intégral d'intégration sur une période :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-indigo-500 font-bold">Composante Continue</span>
            <MathComponent block math="a_0 = \frac{1}{T}\int_{t_0}^{t_0+T} f(t) dt" />
            <span className="text-[10px] text-slate-500 block text-center mt-2">Représente la moyenne arithmétique globale du signal.</span>
          </div>

          <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-indigo-500 font-bold">Coefficients Cosinus (paires)</span>
            <MathComponent block math="a_n = \frac{2}{T}\int_{t_0}^{t_0+T} f(t) \cos(n\omega t) dt" />
            <span className="text-[10px] text-slate-500 block text-center mt-2">Tous nuls si le signal est strictement impair.</span>
          </div>

          <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-indigo-500 font-bold">Coefficients Sinus (impaires)</span>
            <MathComponent block math="b_n = \frac{2}{T}\int_{t_0}^{t_0+T} f(t) \sin(n\omega t) dt" />
            <span className="text-[10px] text-slate-500 block text-center mt-2">Tous nuls si le signal est strictement pair.</span>
          </div>
        </div>

        <div className="space-y-4 my-6">
          <InfoBlock type="reminder" title="Mesure Harmonique de Puissance : Théorème de Parseval">
            Le théorème de Parseval garantit la conservation d'énergie globale entre la représentation temporelle et spectrale. La puissance efficace moyenne {"$P_{eff}^2$"} du signal alternative vaut :
            <MathComponent block math="P_{eff}^2 = F_{eff}^2 = a_0^2 + \sum_{n=1}^{+\infty} \frac{a_n^2 + b_n^2}{2}" />
            Cette relation permet aux électriciens de calculer la distortion de tension en extrayant la puissance perdue dans les harmoniques impropres.
          </InfoBlock>
        </div>
      </Section>

      {/* 4. Two solved exercises */}
      <Section title="🛠️ Exercices Résolus d'Examen" icon="🛠️" color="purple">
        <InteractiveExercise 
          title="Exercice 1 : Coefficients d'un créneau symétrique impair"
          question={
            <div className="space-y-2">
              <p>
                Un signal créneau carré d'amplitude alternant entre {"$-E$"} et {"$+E$"} sur une période {"$T = 2\\pi$"} (donc de pulsation {"$\\omega = 1$"}) est défini comme strictement impair.
              </p>
              <p className="font-semibold">
                Calculez analytiquement ses coefficients {"$a_0$"}, {"$a_n$"} et {"$b_n$"}.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Analyse de parité</p>
              <p>Le signal alternatif oscille symétriquement autour de l'axe des temps. Sa moyenne est donc nulle :</p>
              <MathComponent block math="a_0 = 0" />
              <p>De plus, le signal étant d'expression strictement impair ({"$f(-t) = -f(t)$"}), tous les termes cosinus associés s'annulent :</p>
              <MathComponent block math="a_n = 0 \quad (\forall n \geq 1)" />
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Calcul des coefficients b_n par intégration</p>
              <p>Le demi-créneau valant {"$E$"} de {"$0$"} à {"$\\pi$"}, et {"$-E$"} de {"$\\pi$"} à {"$2\\pi$"}, la relation donne :</p>
              <MathComponent block math="b_n = \frac{2}{\pi} \int_{0}^{\pi} E \sin(n t) dt = \frac{2E}{\pi} \left[ \frac{-\cos(n t)}{n} \right]_{0}^{\pi} = \frac{2E}{n\pi} (1 - \cos(n\pi))" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Écriture finale selon la parité de n</p>
              <p>Le cosinus vaut {"$\\cos(n\\pi) = (-1)^n$"}:</p>
              <p>Si {"$n$"} est pair : {"$1 - \cos(n\pi) = 1 - 1 = 0 \\implies b_n = 0$"}.</p>
              <p>Si {"$n$"} est impair : {"$1 - \cos(n\pi) = 1 - (-1) = 2 \\implies b_n = \\frac{4E}{n\\pi}$"}.</p>
              <p>On obtient l'expression de la série de Fourier synthétique :</p>
              <MathComponent block math="s(t) = \frac{4E}{\pi} \left( \sin(t) + \frac{1}{3}\sin(3t) + \frac{1}{5}\sin(5t) + \dots \right)" />
            </div>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Calcul de Taux de Distorsion Harmonique (THD)"
          question={
            <div className="space-y-2">
              <p>
                Un onduleur de navire de charge engendre un courant non sinusoïdal dont la valeur du courant fondamental efficace mesurée vaut {"$I_1 = 100\\text{ A}$"}. La mesure spectrale indique une harmonique de rang 3 efficace de {"$I_3 = 20\\text{ A}$"} et une harmonique de rang 5 efficace de {"$I_5 = 10\\text{ A}$"}. On néglige toutes les autres harmoniques de rang supérieur.
              </p>
              <p className="font-semibold">
                Calculez le Taux de Distorsion Harmonique globale (THD) de ce réseau électrique.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Se rappeler de la définition du THD pour le courant</p>
              <p>Le THD (Taux de Distorsion Harmonique) calcule le rapport de la puissance des signaux parasites de déformation par rapport au fondamental :</p>
              <MathComponent block math="\text{THD} = \frac{\sqrt{I_2^2 + I_3^2 + I_4^2 + I_5^2 + \dots}}{I_1}" />
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Évaluation numérique du numérateur</p>
              <p>En ne conservant que les valeurs données pour les termes 3 et 5 :</p>
              <MathComponent block math="I_{\text{parasite}} = \sqrt{I_3^2 + I_5^2} = \sqrt{20^2 + 10^2} = \sqrt{400 + 100} = \sqrt{500} \approx 22.36\text{ A}" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Calcul final du ratio en pourcentage</p>
              <MathComponent block math="\text{THD} = \frac{22.36}{100} = 0.2236 \implies 22.36\%" />
              <p>Ce réseau maritime comporte {"$22.36\\%$"} de parasites cumulés d'énergie, ce qui est supérieur à la limite normative industrielle classique qui exige un THD strictement inférieur à {"$5\\%$"}. Des filtres de selfs d'harmoniques doivent être implantés en sortie d'onduleur.</p>
            </div>
          ]}
        />
      </Section>

      {/* 5. Interactive Flashcards */}
      <Section title="⚡ Flashcards de Révision" icon="⚡" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Entrevoyez les secrets de Dirichlet en un clic :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Signaux symétriques de moyenne nulle</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Si le motif d'un signal alternatif est symétrique par rapport à l'axe des abscisses, que vaut d'emblée sa composante continue a_0 ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <MathComponent block math="a_0 = 0" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">La moyenne arithmétique globale s'écrit comme la valeur intégrée. Si les aires positives et négatives s'équilibrent par parité parfaite, la moyenne scalaire est nulle.</span>
              </div>
            }
          />

          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Théorème de Parseval</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Que permet fondamentalement de lier le théorème de Parseval en BTS ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Passer de l'amplitude au domaine énergétique RMS</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Il relie l'amplitude quadratique temporelle à la somme des carrés des coefficients de Fourier, liant l'énergie temporelle à son spectre fréquentiel.
                </p>
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
              question: "Quelle est la définition microscopique de l'effet d'harmonique ?",
              answer: (
                <p>
                  Une harmonique de rang {"$n$"} est une sinusoïde dont la fréquence est exactement égale à {"$n$"} fois la fréquence fondamentale d'origine du signal d'origine. Par exemple, si le fondamental d'un réseau est de {"$50\\text{ Hz}$"}, l'harmonique de rang 3 oscille de manière périodique à la fréquence de {"$150\\text{ Hz}$"}.
                </p>
              )
            },
            {
              question: "Pourquoi les harmoniques causent-elles de graves défauts d'échauffement sur les câbles industriels ?",
              answer: (
                <p>
                  Aux fréquences plus élevées (harmoniques de rang 3, 5, etc.), les flux magnétiques repoussent les charges électriques vers la superficie externe des câbles : c'est l'**effet de peau (pelliculaire)**. Cela réduit la section de cuivre utile restante pour le passage du courant, augmentant artificiellement la résistance apparente locale, d'où de violents échauffements thermiques destructeurs.
                </p>
              )
            },
            {
              question: "Qu'est-ce que le redoutable phénomène de Gibbs observée sur le synthétiseur ?",
              answer: (
                <p>
                  Le phénomène de Gibbs correspond aux oscillations d'amplitude (pics de dépassement de près de 9%) visibles de part et d'autre des points de discontinuité du signal créneau, lors de la sommation. Ce parasite d'approximation mathématique ne disparaît pas en intégrant un nombre infini de coefficients d'harmoniques ; il se décale simplement plus près de la discontinuité.
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
              question: "Si l'on décompose en série de Fourier un signal créneau strictly pair, que peut-on affirmer de manière immédiate sur ses coefficients ?",
              options: [
                "Tous les coefficients b_n sont obligatoirement nuls",
                "Tous les coefficients a_n sont obligatoirement nuls",
                "Le fondamental vaut zero"
              ],
              correctAnswer: 0,
              explanation: "Par les simplifications de parité trigonométrique, si f(t) est pair (symétrie miroir par rapport à l'ordonnée), les composantes sinus, qui sont des fonctions impaires, s'annulent toutes. Donc b_n = 0."
            },
            {
              question: "Un signal d'expression s(t) = 4 + 3 cos(100t) + 2 sin(300t) possède quelle valeur continue moyenne ?",
              options: [
                "a_0 = 2",
                "a_0 = 3",
                "a_0 = 4"
              ],
              correctAnswer: 2,
              explanation: "La composante continue correspond au coefficient arithmétique constant libre en dehors de la somme des termes oscillants cos/sin. Sa valeur numérique est donc directement lue : a_0 = 4."
            },
            {
              question: "Quelle est la fréquence de l'harmonique de rang 5 d'un réseau monophasé français classique de fréquence s(t) de 50 Hz ?",
              options: [
                "100 Hz",
                "250 Hz",
                "500 Hz"
              ],
              correctAnswer: 1,
              explanation: "Fréquence d'harmonique f_n = n * f_1, soit pour le rang 5 : f_5 = 5 * 50 = 250 Hz."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais énoncer le théorème fondamental de décomposition trigonométrique de Fourier.",
            "Je domine le calcul intégral pour la recherche des coefficients a0, an et bn.",
            "Je comprends les simplifications algébriques liées à la parité d'un signal.",
            "Je sais évaluer la puissance moyenne efficace d'un signal au moyen de Parseval."
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

export default Course_BTS_Industriel_03_Fourier;
