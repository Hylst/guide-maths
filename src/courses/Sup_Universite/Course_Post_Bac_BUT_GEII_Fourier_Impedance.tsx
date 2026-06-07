import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, HelpCircle, Zap, Activity, Award } from 'lucide-react';

const Course_Post_Bac_BUT_GEII_Fourier_Impedance: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State: R, L, C, and frequency f
  const [R, setR] = useState<number>(50); // Ohms
  const [L_mH, setL] = useState<number>(150); // mH
  const [C_uF, setC] = useState<number>(20); // uF
  const [f, setF] = useState<number>(50); // Hz

  // Intermediate computations
  const omega = 2 * Math.PI * f;
  const L = L_mH / 1000;
  const C = C_uF / 1000000;

  const X_L = L * omega; // Reactance inductive
  const X_C = C > 0 ? 1 / (C * omega) : 0; // Reactance capacitive

  // Total reactance
  const X_total = X_L - X_C;

  // Impedance magnitude and phase
  const Z_mag = Math.sqrt(R * R + X_total * X_total);
  const Z_phase_rad = Math.atan2(X_total, R);
  const Z_phase_deg = (Z_phase_rad * 180) / Math.PI;

  // Resonance frequency: f_0 = 1 / (2 * pi * sqrt(L * C))
  const f_0 = 1 / (2 * Math.PI * Math.sqrt(L * C));

  // Graph styling coordinates
  const scale = 1.2; // Pixels per Ohm (approx)
  const originX = 140;
  const originY = 140;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="GEII-MATH-HARMONIC"
        title="BUT GEII : Impédance Complexe et Analyse Harmonique"
        subtitle="Modélisation avancée des circuits alternatifs sinusoïdaux, diagrammes de phasors et décomposition spectrale spectaculaire par séries de Fourier."
        duration="1h 50"
        level="BUT GEII (A1)"
        prerequisites={["Nombres complexes (Euler, écriture polaire)", "Lois de Kirchhoff en DC", "Équations différentielles simples"]}
        objectives={[
          "Passer instantanément du domaine temporel sinusoïdal au domaine des complexes (représentation vectorielle de Fresnel/Phasor).",
          "Calculer analytiquement l'impédance complexe totale de mailles RLC en série et parallèle.",
          "Déterminer et interpréter la fréquence de résonance électrique d'un système oscillant passif.",
          "Décomposer un signal périodique asymétrique arbitraire en harmoniques de Fourier distinctes."
        ]}
      />

      <Section title="⚡ Électricité Alternative & Phasors Complexes" icon="⚡" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En Génie Électrique, l'alimentation par réseaux alternatifs sinusoïdaux est la règle universelle. Les tensions et courants sont fonctions du temps, décrits par trois paramètres principaux: l'amplitude maximale, la pulsation temporelle et la phase originale.
        </p>

        <MathComponent block math="u(t) = U_{max} \cos(\omega t + \phi_u)" />

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Résoudre des réseaux de circuits imbriqués avec ces composantes trigonométriques imposerait des calculs trigonométriques indigestes contenant des additions de termes de phases différentes. Heureusement, Leonhard Euler a introduit l'écriture exponentielle complexe, permettant de linéariser complètement l'étude de ces ondes par l'usage des <strong>phasors</strong>.
        </p>

        <InfoBlock type="definition" title="Le Phasor Complexe">
          On associe au signal de tension sinusoïdal temporel <MathComponent math="u(t)" /> sa bijection complexe canonique :
          <MathComponent block math="\underline{u}(t) = U_{max} e^{j(\omega t + \phi_u)} = \underline{U} e^{j\omega t}" />
          Où <MathComponent math="\underline{U} = U_{max} e^{j\phi_u}" /> représente le **phasor ou amplitude complexe** (un vecteur invariant par rapport au temps). 
          <br /><br />
          <strong>Note de notation :</strong> Pour ne jamais confondre l'unité ou variable d'intensité électrique <MathComponent math="i(t)" /> avec la coordonnée imaginaire pure principale, les physiciens et ingénieurs écrivent uniformément :
          <MathComponent block math="j^2 = -1" />
        </InfoBlock>

        <TipBanner type="info" title="Avantage Algébrique">
          Sous cette transformation d'un circuit linéaire, modifier des opérations de dérivation temporelle <MathComponent math="d/dt" /> complexes se résume à une simple multiplication algébrique directe par <MathComponent math="j\omega" />. À l'inverse, l'intégration se ramène à une division algébrique par <MathComponent math="j\omega" />.
        </TipBanner>
      </Section>

      <Section title="🔬 Impédances d'Éléments R, L, C" icon="🔬" color="emerald">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En appliquant l'outil phasor aux composants fondamentaux de l'électronique analogique passive, nous obtenons la <strong>loi d'Ohm généralisée</strong> sous forme complexe d'impédances d'éléments :
        </p>

        <FormulaBox formula="\underline{U} = \underline{Z} \cdot \underline{I}" />

        <div className="overflow-x-auto my-6 border border-slate-100 rounded-xl">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-indigo-700 bg-indigo-50/50 uppercase">
              <tr>
                <th scope="col" className="px-6 py-4">Composant Électrique</th>
                <th scope="col" className="px-6 py-4">Relation Temporelle</th>
                <th scope="col" className="px-6 py-4">Impédance Complexe {"$\\underline{Z}$"}</th>
                <th scope="col" className="px-6 py-4">Partie Réelle {"$R$"}</th>
                <th scope="col" className="px-6 py-4">Réactance {"$X$"}</th>
                <th scope="col" className="px-6 py-4">Déphasage Courant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white">
                <td className="px-6 py-4 font-bold text-slate-900">Résistance ($R$)</td>
                <td className="px-6 py-4 font-mono text-xs">{"$u(t) = R \\cdot i(t)$"}</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\underline{Z}_R = R$"}</td>
                <td className="px-6 py-4">{"$R$"}</td>
                <td className="px-6 py-4">{"$0$"}</td>
                <td className="px-6 py-4 text-emerald-600 font-medium font-mono">0 (En phase)</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-slate-900">Inductance ($L$)</td>
                <td className="px-6 py-4 font-mono text-xs">{"$u(t) = L \\frac{di}{dt}$"}</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\underline{Z}_L = j L \\omega$"}</td>
                <td className="px-6 py-4">{"$0$"}</td>
                <td className="px-6 py-4">{"$L \\omega$"}</td>
                <td className="px-6 py-4 text-rose-500 font-medium font-mono">+90° (Tension en avance)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-bold text-slate-900">Condensateur ($C$)</td>
                <td className="px-6 py-4 font-mono text-xs">{"$i(t) = C \\frac{du}{dt}$"}</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\underline{Z}_C = \\frac{1}{j C \\omega} = -j \\frac{1}{C \\omega}$"}</td>
                <td className="px-6 py-4">{"$0$"}</td>
                <td className="px-6 py-4 font-mono">{"$-1/(C\\omega)$"}</td>
                <td className="px-6 py-4 text-blue-500 font-medium font-mono">-90° (Tension en retard)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <InfoBlock type="definition" title="Résistance et Réactance">
          L'impédance se décompose en somme de coordonnées rectangulaires : 
          <MathComponent block math="\underline{Z} = R + jX" />
          Où <MathComponent math="R \ge 0" /> est la **Résistance** disisipative mesurée en Ohms ($\Omega$) et <MathComponent math="X \in \mathbb{R}" /> représente la **Réactance** accumulant l'énergie de manière non-dissipative.
        </InfoBlock>
      </Section>

      <Section title="🎮 Simulateur Interactif : Phasors du Circuit RLC en Série" icon="🎮" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Modifiez les paramètres de votre montage RLC série à l'aide des potentiomètres. Voyez en direct comment s'additionnent géométriquement les trois impédances passives dans le plan complexe de Fresnel pour définir l'impédance équivalente absolue <MathComponent math="\underline{Z}_{eq} = R + j(L\omega - 1/(C\omega))" /> !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          {/* Slider list */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Résistance (R) :</span>
                <span className="text-emerald-600 font-bold">{R} Ω</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={R}
                onChange={(e) => setR(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Inductance (L) :</span>
                <span className="text-rose-500 font-bold">{L_mH} mH</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={L_mH}
                onChange={(e) => setL(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Capacité (C) :</span>
                <span className="text-blue-500 font-bold">{C_uF} µF</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={C_uF}
                onChange={(e) => setC(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Fréquence d'onde (f) :</span>
                <span className="text-indigo-500 font-bold">{f} Hz</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={f}
                onChange={(e) => setF(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-xs space-y-2">
              <div className="font-bold text-muted-text text-[10px] uppercase tracking-wider">Résultats électriques de calcul</div>
              <div className="flex justify-between">
                <span>Impédance Inductance (<MathComponent math="X_L" />) :</span>
                <span className="font-mono font-bold text-rose-500">+{X_L.toFixed(1)}j Ω</span>
              </div>
              <div className="flex justify-between">
                <span>Impédance Condensateur (<MathComponent math="X_C" />) :</span>
                <span className="font-mono font-bold text-blue-500">-{X_C.toFixed(1)}j Ω</span>
              </div>
              <div className="flex justify-between">
                <span>Somme des Réactances (<MathComponent math="X_{\text{tot}}" />) :</span>
                <span className="font-mono font-bold text-indigo-700">{(X_total).toFixed(1)}j Ω</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span>Module équivalent <MathComponent math="|Z_{\text{eq}}|" /> :</span>
                <span className="font-mono font-bold text-indigo-900 dark:text-indigo-200">{Z_mag.toFixed(1)} Ω</span>
              </div>
              <div className="flex justify-between">
                <span>Déphasage T/I :</span>
                <span className="font-mono font-bold text-indigo-900 dark:text-indigo-200">{Z_phase_deg.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span>Fréquence résonante (<MathComponent math="f_0" />) :</span>
                <span className="font-mono font-bold text-emerald-500">{f_0.toFixed(1)} Hz</span>
              </div>
            </div>
          </div>

          {/* Graphical output representation */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={280} height={280} className="overflow-visible select-none">
                {/* Axes */}
                <line x1={20} y1={originY} x2={260} y2={originY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1={originX} y1={20} x2={originX} y2={260} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

                <text x={255} y={originY - 5} fontSize="9" fontWeight="bold" fill="#64748b">Re (R)</text>
                <text x={originX + 5} y={25} fontSize="9" fontWeight="bold" fill="#64748b">Im (jX)</text>

                {/* Draw Vector R (horizontal, rightward, green) */}
                <line 
                  x1={originX} 
                  y1={originY} 
                  x2={originX + R * scale} 
                  y2={originY} 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                />
                <polygon points={`${originX + R * scale},${originY} ${originX + R * scale - 6},${originY - 4} ${originX + R * scale - 6},${originY + 4}`} fill="#10b981" />
                <text x={originX + (R * scale) / 2 - 5} y={originY + 15} fontSize="10" fontWeight="bold" fill="#10b981">R</text>

                {/* Draw Vector XL (imaginary, upward, red) */}
                {/* Note: SVG Y is inverted (up is negative Y) */}
                <line 
                  x1={originX + R * scale} 
                  y1={originY} 
                  x2={originX + R * scale} 
                  y2={originY - X_L * scale} 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeDasharray="4,2"
                />
                <polygon points={`${originX + R * scale},${originY - X_L * scale} ${originX + R * scale - 4},${originY - X_L * scale + 5} ${originX + R * scale + 4},${originY - X_L * scale + 5}`} fill="#ef4444" />
                <text x={originX + R * scale + 8} y={originY - (X_L * scale) / 2} fontSize="10" fontWeight="bold" fill="#ef4444">jX_L</text>

                {/* Draw Vector XC (imaginary, downward from end of XL, blue) */}
                <line 
                  x1={originX + R * scale} 
                  y1={originY - X_L * scale} 
                  x2={originX + R * scale} 
                  y2={originY - X_L * scale + X_C * scale} 
                  stroke="#3b82f6" 
                  strokeWidth="2.5" 
                  strokeDasharray="4,2"
                />
                <polygon points={`${originX + R * scale},${originY - X_L * scale + X_C * scale} ${originX + R * scale - 4},${originY - X_L * scale + X_C * scale - 5} ${originX + R * scale + 4},${originY - X_L * scale + X_C * scale - 5}`} fill="#3b82f6" />
                <text x={originX + R * scale - 30} y={originY - X_L * scale + (X_C * scale) / 2} fontSize="10" fontWeight="bold" fill="#3b82f6">-jX_C</text>

                {/* Resultant Equilvalent Vector Z (indigo from origin to end point R + jX_tot) */}
                {(() => {
                  const endX = originX + R * scale;
                  const endY = originY - X_total * scale;
                  return (
                    <>
                      <line 
                        x1={originX} 
                        y1={originY} 
                        x2={endX} 
                        y2={endY} 
                        stroke="#6366f1" 
                        strokeWidth="4" 
                      />
                      <polygon points={`${endX},${endY} ${endX - (Z_phase_deg > 0 ? 8 : 4)},${endY + (Z_phase_deg > 0 ? 5 : -5)} ${endX - (Z_phase_deg > 0 ? 4 : 8)},${endY + (Z_phase_deg > 0 ? 8 : -1)}`} fill="#6366f1" />
                    </>
                  );
                })()}
                
                {/* Arc representation of angle */}
                <path 
                  d={`M ${originX + 25} ${originY} A 25 25 0 0 ${Z_phase_deg > 0 ? 0 : 1} ${originX + 25 * Math.cos(Z_phase_rad)} ${originY - 25 * Math.sin(Z_phase_rad)}`}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                />
                <text x={originX + 30} y={originY - Z_phase_deg / 4} fontSize="9" fontWeight="bold" fill="#4f46e5">φ</text>

                {/* Circuit RLC Series Icon */}
                <rect x={15} y={15} width={100} height={35} rx={6} fill="#f1f5f9" stroke="#cbd5e1" />
                <text x={22} y={35} fontSize="9" fontWeight="bold" fill="#475569">SERIES R-L-C</text>
              </svg>
            </div>
            <p className="mt-3 text-xs text-muted-text italic text-slate-500 text-center">
              Diagramme de Fresnel : Résonnance à f_0 = {f_0.toFixed(0)} Hz. {f > f_0 ? "Comportement inductif (avance)." : "Comportement capacitif (retard)."}
            </p>
          </div>
        </div>
      </Section>

      <Section title="📈 Séries de Fourier & Analyse Spectrale" icon="📐" color="purple">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En Génie Électrique, tous les signaux réels ne sont pas de pures sinusoïdes stables. Par exemple, les alimentations à découpage modernes ou les onduleurs industriels produisent des signaux en créneaux (modulations de largeur d'impulsion). L'outil mathématique pour injecter ces signaux asymétriques complexes dans notre équation normale d'impédance est la **décomposition spectrale par Séries de Fourier**.
        </p>

        <InfoBlock type="definition" title="Décomposition Harmonique Infinie">
          Soit $s(t)$ un signal continu par morceaux et périodique de période $T$ (pulsation de base $\omega_1 = 2\pi/T$). On l'exprime sous forme de somme harmonique infinie :
          <MathComponent block math="s(t) = a_0 + \sum_{n=1}^{+\infty} \left( a_n \cos(n \omega_1 t) + b_n \sin(n \omega_1 t) \right)" />
          Où :
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li>La composante continue moyenne vaut : <MathComponent math="a_0 = \frac{1}{T}\int_{0}^{T} s(t) dt" /></li>
            <li>Les coefficients de la parité cosinus valent : <MathComponent math="a_n = \frac{2}{T}\int_{0}^{T} s(t) \cos(n \omega_1 t) dt" /></li>
            <li>Les coefficients de l'imparité sinus valent : <MathComponent math="b_n = \frac{2}{T}\int_{0}^{T} s(t) \sin(n \omega_1 t) dt" /></li>
          </ul>
        </InfoBlock>

        <TipBanner type="info" title="Relation de Parseval: Conservation d'Énergie">
          La puissance active totale moyenne d'un signal périodique équivaut scrupuleusement à la somme quadratique arithmétique de la puissance de chaque harmonique unitaire prise indépendamment :
          <MathComponent block math="P_{moy} = a_0^2 + \sum_{n=1}^{+\infty} \frac{a_n^2 + b_n^2}{2}" />
        </TipBanner>
      </Section>

      <Section title="✏️ Résolution d'Exercices Guidés" icon="✏️" color="indigo">
        <InteractiveExercise
          title="Exercice 1 : Calcul de vecteur d'impédance complexe totale"
          question={<p>On associe en série une bobine réelle (de résistance interne {"$r = 10 \\ \\Omega$"} et d'inductance {"$L = 80 \\text{ mH}$"}) avec un condensateur parfait de capacité {"$C = 4.7 \\ \\mu\\text{F}$"}. Déterminer l'expression de l'impédance équivalente absolue {"$\\underline{Z}_{eq}$"} sous une alimentation de fréquence stable de f = 100 Hz.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 1 : Calculer la pulsation en rad/s</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Calculons la pulsation correspondant à la fréquence donnée :
                <br />
                <MathComponent block math="\omega = 2 \pi f = 2 \times 3.14159 \times 100 \approx 628.32 \text{ rad/s}" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Évaluation des réactances réelles</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                La réactance pour notre inductance L et notre condensateur C valent :
                <br />
                • Reactance inductive : <MathComponent block math="X_L = L\omega = 0.08 \times 628.32 \approx 50.27 \ \Omega" />
                • Reactance capacitive : <MathComponent block math="X_C = \frac{1}{C\omega} = \frac{1}{4.7 \times 10^{-6} \times 628.32} \approx 338.63 \ \Omega" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Addition complexe équivalente en série</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
                Puisque l'association est purement en série, les impédances s'additionnent directement :
                <MathComponent block math="\underline{Z}_{ser} = \underline{Z}_{bobine} + \underline{Z}_C = (r + jX_L) - jX_C" />
                <MathComponent block math="\underline{Z}_{ser} = 10 + j(50.27 - 338.63) = 10 - j 288.36 \ \Omega" />
                L'impédance de notre association équivalente est donc essentiellement capacitive avec un module de :
                <MathComponent block math="|Z_{eq}| = \sqrt{10^2 + (-288.36)^2} \approx 288.5 \ \Omega" />
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards conceptuelles" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Qu'est-ce que l'onde harmonique fondamentale d'un signal ?"
            back="C'est la première harmonique périodique de décomposition (de fréquence n = 1) possédant une fréquence rigoureusement égale à la fréquence d'échantillonnage de base f1 du signal périodique complet."
          />
          <Flashcard 
            front="Pourquoi l'impédance d'un condensateur tend vers l'infini à fréquence nulle ?"
            back="À fréquence nulle (DC), la pulsation ω = 0, donc Z_C = 1/(jC_ω) tend vers l'infini. Le condensateur agit alors physiquement comme un interrupteur complètement ouvert."
          />
          <Flashcard 
            front="Qu'est-ce que l'admittance équivalente Y ?"
            back="L'admittance est la grandeur duale inverse algébrique de l'impédance : Y = 1/Z. Elle s'exprime en Siemens (S) et simplifie grandement l'analyse algorithmique des nœuds branchés en parallèle."
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes des Étudiants" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'avance de phase inductive engendre-t-elle un déphasage positif en tension ?",
              answer: "L'équation temporelle u(t) = L di/dt montre que la tension dépend immédiatement du gradient d'accroissement du courant. Pour une onde sinusoïdale, cela entraîne un décalage de quart de quart de cycle vers la gauche, induisant une tension qui atteint son pic 90° avant l'onde du courant."
            },
            {
              question: "Qu'est-ce que le phénomène de résonance série ?",
              answer: "Le phénomène d'adéquation d'impédance survient à la pulsation d'absorption ω_0 où les réactances inductive et capacitive se compensent exactement (jLω = -1/(jCω)). L'impédance totale n'est plus bridée que par la résistance R du circuit, créant un pic d'intensité du courant."
            },
            {
              question: "Quels sont les effets de la dérive des harmoniques sur l'échauffement des fils ?",
              answer: "Les harmoniques augmentent la puissance quadratique moyenne (RMS) mais ne participent pas à l'énergie active utile mécanique. L'effet Joule s'accroît, échauffant excessivement les conducteurs de masse (Pollution du Facteur de Puissance cos φ)."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz Validation de Maîtrise" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si on branche en parallèle un résistor R de 100 Ohms avec une réactance capacitive de -j100 Ohms à f, quelle est l'impédance équivalente ?",
              options: [
                "Z_eq = 100 - j100 Ohms",
                "Z_eq = 50 - j50 Ohms",
                "Z_eq = 200 - j50 Ohms"
              ],
              correctAnswer: 1,
              explanation: "Pour deux impédances parallèles Z1 et Z2, l'impédance est Z_eq = (Z1*Z2)/(Z1+Z2). Ici Z_eq = (100 * -j100)/(100 - j100) = -j10000 / (100*(1-j)) = -j100 / (1-j) = (-j100*(1+j))/2 = (100 - j100)/2 = 50 - j50 Ohms."
            },
            {
              question: "Comment varie l'impédance d'une pure inductance de 1 Henry si la pulsation double ?",
              options: [
                "L'impédance est inversée par quadrature d'Euler",
                "L'impédance double également par rapport à la pulsation directe",
                "L'impédance diminue de moitié par effet de peau"
              ],
              correctAnswer: 1,
              explanation: "Z_L = L * omega. Étant donné qu'un lien purement proportionnel lie l'impédance à la pulsation ω, doubler la pulsation double immédiatement la réactance de l'inductance."
            },
            {
              question: "Quelle est la valeur moyenne d'un signal triangulaire symétrique asymétrique n'oscillant que sur la partie positive de 0V à 6V ?",
              options: [
                "La valeur moyenne est de 0V par compensation",
                "La valeur moyenne est égale à 3V",
                "La valeur moyenne est égale à 4.24V"
              ],
              correctAnswer: 1,
              explanation: "Pour un triangle oscillant entre 0V et Vmax de manière symétrique d'alternance, sa valeur moyenne correspond géométriquement au point milieu exact de l'amplitude, soit Vmax / 2 = 6 / 2 = 3V."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais poser un phasor complexe pour représenter une onde trigonométrique alternative commune.",
            "Je sais démontrer et modéliser l'impédance complexe de dipôles R, L, C.",
            "Je comprends l'origine et le calcul des déphasages négatifs induits par les capacités.",
            "Je maîtrise le calcul spectral des séries de Fourier pour décomposer les signaux carrés."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_BUT_GEII_Fourier_Impedance;
