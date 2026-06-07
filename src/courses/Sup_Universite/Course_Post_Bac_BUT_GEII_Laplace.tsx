import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, HelpCircle, Zap, Activity, Award } from 'lucide-react';

const Course_Post_Bac_BUT_GEII_Laplace: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State: K (gain of system) and tau (time constant of first order)
  const [K, setK] = useState<number>(1.5);
  const [tau, setTau] = useState<number>(0.5); // seconds
  const [stepInput, setStepInput] = useState<number>(1);

  // Time points and data calculation for step response curves of first order
  // y(t) = K * stepInput * (1 - e^(-t / tau))
  const maxTime = 3.0; // seconds
  const pointsCount = 60;
  const graphPoints: { t: number; input: number; output: number }[] = [];
  for (let idx = 0; idx <= pointsCount; idx++) {
    const t = (idx / pointsCount) * maxTime;
    const input = stepInput;
    const output = K * stepInput * (1 - Math.exp(-t / tau));
    graphPoints.push({ t, input, output });
  }

  // Coordinate projection helper
  const scaleX = 260 / maxTime; // Pixels per second
  const scaleY = 60; // Pixels per Volt/unit amplitude
  const originX = 30;
  const originY = 220;

  // Render polyline string for step output response
  const pointsStr = graphPoints.map(p => {
    const x = originX + p.t * scaleX;
    const y = originY - p.output * scaleY;
    if (isNaN(y)) return "";
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="GEII-MATH-LAPLACE"
        title="BUT GEII : Transformée de Laplace et Asservissements Linéaires"
        subtitle="Modélisation fréquentielle continue des systèmes dynamiques réels, fonctions de transfert et stabilité des boucles de régulation feedback."
        duration="1h 55"
        level="BUT GEII (A2)"
        prerequisites={["Équations différentielles linéaires ordinaires", "Nombres complexes", "Intégration d'exponentielles"]}
        objectives={[
          "Comprendre l'opérateur intégral de Laplace pour convertir les dérivées en simples multiplications complexes par p.",
          "Déterminer et modéliser la fonction de transfert d'un système physique de premier et de second ordre.",
          "Calculer analytiquement la réponse temporelle transitoire d'un système à un échelon ou une impulsion.",
          "Analyser l'erreur de consigne et appliquer la formule de Black pour stabiliser un asservissement rebouclé."
        ]}
      />

      <Section title="🌀 L'Opérateur Harmonique de Laplace" icon="🌀" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En automatisme et électronique analogique industrielle, l'analyse temporelle directe d'un système complexe d'équations différentielles entrelacées est extrêmement lourde. Pour surmonter cet obstacle, nous appliquons une transformation intégrale puissante développée par Pierre-Simon de Laplace. Elle projette une fonction du temps réel <MathComponent math="f(t)" /> vers un domaine complexe spectral de pulsation généralisée <MathComponent math="p \in \mathbb{C}" /> (parfois notée <MathComponent math="s" /> à l'international).
        </p>

        <InfoBlock type="definition" title="La Transformée de Laplace">
          La transformée de Laplace unilatérale d'une fonction causale <MathComponent math="f(t)" /> (nulle pour <MathComponent math="t < 0" />) est l'intégrale impropre :
          <MathComponent block math="F(p) = \mathcal{L}\{f(t)\} = \int_{0}^{+\infty} f(t) e^{-pt} dt" />
          Où l'opérateur complexe $p = \sigma + j\omega$ intègre à la fois un amortissement exponentiel réel $\sigma$ et une composante oscillatoire de pulsation $\omega$.
        </InfoBlock>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La propriété magique qui fait le succès de cet outil en BUT GEII est le théorème de la dérivation temporelle :
        </p>

        <FormulaBox formula="\mathcal{L}\left\{\frac{df(t)}{dt}\right\} = p \cdot F(p) - f(0^+)" />

        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Grâce à cette égalité fondamentale, n'importe quelle équation différentielle linéaire ordinaire complexe à coefficients constants se résout sous forme d'une simple **équation algébrique fractionnaire polynomiale** !
        </p>
      </Section>

      <Section title="📋 Table des Transformées Usuelles de Référence" icon="📋" color="slate">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Les signaux d'entrée fondamentaux injectés dans les montages d'automatique correspondent à des formes géométriques universelles simples :
        </p>

        <div className="overflow-x-auto border border-slate-100 rounded-xl my-4">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-indigo-700 bg-indigo-50/50 uppercase">
              <tr>
                <th scope="col" className="px-6 py-4">Signal Temporel causale {"$f(t)$"}</th>
                <th scope="col" className="px-6 py-4">Description physique</th>
                <th scope="col" className="px-6 py-4">Transformée {"$F(p) = \\mathcal{L}\\{f(t)\\}$"}</th>
                <th scope="col" className="px-6 py-4">Domaine de convergence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="bg-white">
                <td className="px-6 py-4 font-bold text-slate-900">{"$\\delta(t)$"}</td>
                <td className="px-6 py-4 text-xs font-sans text-slate-600">Impulsion de Dirac (choc de tension infini)</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">1</td>
                <td className="px-6 py-4">Tout {"$p$"}</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-slate-900">{"$u(t)$"}</td>
                <td className="px-6 py-4 text-xs font-sans text-slate-600">Échelon de consigne unitaire (fermeture d'interrupteur)</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\frac{1}{p}$"}</td>
                <td className="px-6 py-4">{"$\\text{Re}(p) > 0$"}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-bold text-slate-900">{"$t \\cdot u(t)$"}</td>
                <td className="px-6 py-4 text-xs font-sans text-slate-600">Rampe de consigne (variation linéaire continue)</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\frac{1}{p^2}$"}</td>
                <td className="px-6 py-4">{"$\\text{Re}(p) > 0$"}</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-slate-900">{"$e^{-a t} \\cdot u(t)$"}</td>
                <td className="px-6 py-4 text-xs font-sans text-slate-600">Amortissement exponentiel monotone</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\frac{1}{p + a}$"}</td>
                <td className="px-6 py-4">{"$\\text{Re}(p) > -a$"}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-bold text-slate-900">{"$\\sin(\\omega t) \\cdot u(t)$"}</td>
                <td className="px-6 py-4 text-xs font-sans text-slate-600">Oscillateur harmonique parfait pur</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{"$\\frac{\\omega}{p^2 + \\omega^2}$"}</td>
                <td className="px-6 py-4">{"$\\text{Re}(p) > 0$"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="🎮 Simulateur Interactif : Réponse Temporelle d'un Premier Ordre" icon="🎮" color="emerald">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Un modèle d'automatique premier ordre fondamental s'exprime par la fonction de transfert complexe : 
          <MathComponent math="H(p) = \frac{K}{1 + \tau p}" />. 
          Modifiez sa constante de temps $\tau$ (vitesse d'ajustement du système) et son gain statique $K$ pour observer en temps réel sa réponse temporelle transitoire induite par un échelon de consigne :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          {/* Sliders and data values */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Amplitude Échelon (U_in) :</span>
                <span className="text-indigo-600 font-bold">{stepInput} V</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={stepInput}
                onChange={(e) => setStepInput(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Gain Statique (K) :</span>
                <span className="text-emerald-600 font-bold">{K.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={K}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Constante de temps (τ) :</span>
                <span className="text-amber-500 font-bold">{tau.toFixed(2)} sec</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.2"
                step="0.05"
                value={tau}
                onChange={(e) => setTau(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-xs space-y-2">
              <div className="font-bold text-muted-text text-[10px] uppercase tracking-wider">Mesures Pratiques Système</div>
              <div className="flex justify-between">
                <span>Temps de réponse à 95% ($3\tau$) :</span>
                <span className="font-mono font-bold text-amber-600">{(3 * tau).toFixed(2)} s</span>
              </div>
              <div className="flex justify-between">
                <span>Temps de montée à 99% ($4.6\tau$) :</span>
                <span className="font-mono font-bold text-amber-700">{(4.6 * tau).toFixed(2)} s</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span>Valeur asymptotique finale ($t \to \infty$) :</span>
                <span className="font-mono font-bold text-indigo-900 dark:text-indigo-200">{(K * stepInput).toFixed(2)} V</span>
              </div>
            </div>
          </div>

          {/* SVG Step Graph plotting */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={280} height={240} className="overflow-visible select-none">
                {/* Graph background grids */}
                <line x1={30} y1={160} x2={270} y2={160} stroke="#e2e8f0" strokeWidth="1" />
                <line x1={30} y1={100} x2={270} y2={100} stroke="#e2e8f0" strokeWidth="1" />
                <line x1={130} y1={20} x2={130} y2={220} stroke="#e2e8f0" strokeWidth="1" />
                <line x1={230} y1={20} x2={230} y2={220} stroke="#e2e8f0" strokeWidth="1" />

                {/* Main Axes */}
                <line x1={originX} y1={originY} x2={270} y2={originY} stroke="#475569" strokeWidth="1.5" />
                <line x1={originX} y1={20} x2={originX} y2={originY} stroke="#475569" strokeWidth="1.5" />

                <text x={265} y={originY + 12} fontSize="8" fontWeight="bold" fill="#64748b">Temps (s)</text>
                <text x={originX - 18} y={25} fontSize="8" fontWeight="bold" fill="#64748b">Amplitude (V)</text>

                {/* X labels */}
                <text x={originX + 1 * scaleX} y={originY + 12} fontSize="7" fill="#64748b" textAnchor="middle">1.0s</text>
                <text x={originX + 2 * scaleX} y={originY + 12} fontSize="7" fill="#64748b" textAnchor="middle">2.0s</text>
                <text x={originX + 3 * scaleX} y={originY + 12} fontSize="7" fill="#64748b" textAnchor="middle">3.0s</text>

                {/* Y labels */}
                <text x={originX - 8} y={originY - 1 * scaleY} fontSize="7" fill="#64748b" textAnchor="end">1V</text>
                <text x={originX - 8} y={originY - 2 * scaleY} fontSize="7" fill="#64748b" textAnchor="end">2V</text>

                {/* Draw Input Step (dotted blue line) */}
                <line 
                  x1={originX} 
                  y1={originY - stepInput * scaleY} 
                  x2={270} 
                  y2={originY - stepInput * scaleY} 
                  stroke="#3b82f6" 
                  strokeWidth="2.0" 
                  strokeDasharray="4,4"
                />
                <text x={235} y={originY - stepInput * scaleY - 6} fontSize="8" fontWeight="bold" fill="#3b82f6">U_in(t)</text>

                {/* Step Output response (smooth curve polyline) */}
                <polyline 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  points={pointsStr} 
                />

                {/* Markers detailing response at t = tau (63%) and t = 3tau (95%) */}
                {(() => {
                  const x_tau = originX + tau * scaleX;
                  const y_tau = originY - K * stepInput * 0.632 * scaleY;
                  const x_3tau = originX + 3 * tau * scaleX;
                  const y_3tau = originY - K * stepInput * 0.95 * scaleY;

                  return (
                    <>
                      {tau < maxTime && (
                        <>
                          <circle cx={x_tau} cy={y_tau} r="4" fill="#f59e0b" />
                          <line x1={x_tau} y1={y_tau} x2={x_tau} y2={originY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                          <text x={x_tau} y={y_tau - 8} fontSize="7" fontWeight="bold" fill="#f59e0b" textAnchor="middle">τ (63%)</text>
                        </>
                      )}
                      {3 * tau < maxTime && (
                        <>
                          <circle cx={x_3tau} cy={y_3tau} r="4" fill="#b45309" />
                          <line x1={x_3tau} y1={y_3tau} x2={x_3tau} y2={originY} stroke="#b45309" strokeWidth="1" strokeDasharray="2,2" />
                          <text x={x_3tau} y={originY - 4} fontSize="6" fontWeight="bold" fill="#b45309" textAnchor="middle">3τ (95%)</text>
                        </>
                      )}
                    </>
                  );
                })()}

                {/* Title badge inside graph */}
                <rect x={160} y={15} width={100} height={22} rx={4} fill="#f8fafc" stroke="#e2e8f0" />
                <text x={210} y={29} fontSize="7" fontWeight="bold" fill="#1e293b" textAnchor="middle">1er Ordre : H(p)</text>
              </svg>
            </div>
          </div>
        </div>
      </Section>

      <Section title="⛓️ Systèmes Asservis Bouclés (Feedback)" icon="⚙️" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En Génie Électrique, piloter un actionneur en boucle ouverte est hasardeux (les perturbations externes dévient la sortie réelle). On reboucle le système : on soustrait à la consigne la mesure de la sortie réelle pour obtenir l'erreur $\varepsilon$. Un correcteur (souvent de type proportionnel-intégral-dérivé ou PID) analyse cet écart pour ajuster optimalement la commande.
        </p>

        {/* Closed loop diagram in SVG */}
        <div className="flex justify-center my-6">
          <svg width="460" height="110" className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
            {/* Input Arrow */}
            <line x1="10" y1="50" x2="60" y2="50" stroke="#334155" strokeWidth="1.5" />
            <polygon points="60,50 53,46 53,54" fill="#334155" />
            <text x="20" y="42" fontSize="9" fontWeight="bold" fill="#334155">Consigne U_in(p)</text>

            {/* Summation junction circle */}
            <circle cx="75" cy="50" r="14" fill="#ffffff" stroke="#334155" strokeWidth="2" />
            <text x="75" y="53" fontSize="12" fontWeight="bold" fill="#334155" textAnchor="middle">+</text>
            <text x="75" y="76" fontSize="10" fontWeight="bold" fill="#e11d48" textAnchor="middle">-</text>

            {/* Error Arrow */}
            <line x1="89" y1="50" x2="134" y2="50" stroke="#334155" strokeWidth="1.5" />
            <polygon points="134,50 127,46 127,54" fill="#334155" />
            <text x="110" y="42" fontSize="9" fontWeight="semibold" fill="#475569">ε(p)</text>

            {/* Forward transfer function box */}
            <rect x="135" y="32" width="100" height="36" rx="6" fill="#6366f1" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="185" y="54" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">Chaîne Directe A(p)</text>

            {/* Middle arrow */}
            <line x1="235" y1="50" x2="330" y2="50" stroke="#334155" strokeWidth="1.5" />
            <polygon points="330,50 323,46 323,54" fill="#334155" />

            {/* Output Node */}
            <circle cx="280" cy="50" r="3" fill="#10b981" />
            
            {/* Output Arrow */}
            <line x1="280" y1="50" x2="280" y2="90" stroke="#334155" strokeWidth="1.5" />
            <line x1="280" y1="90" x2="160" y2="90" stroke="#334155" strokeWidth="1.5" />
            <line x1="160" y1="90" x2="160" y2="76" stroke="#334155" strokeWidth="1.5" />
            <polygon points="160,76 156,83 164,83" fill="#334155" />
            
            <text x="350" y="44" fontSize="9" fontWeight="bold" fill="#10b981">Sortie Y(p)</text>

            {/* Feedback box */}
            <rect x="110" y="76" width="100" height="30" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
            <text x="160" y="94" fontSize="9" fontWeight="bold" fill="#ffffff" textAnchor="middle">Feedback B(p)</text>

            {/* Feedback feedback back arrow to sum junction */}
            <line x1="110" y1="91" x2="75" y2="91" stroke="#334155" strokeWidth="1.5" />
            <line x1="75" y1="91" x2="75" y2="64" stroke="#334155" strokeWidth="1.5" />
            <polygon points="75,64 71,71 79,71" fill="#334155" />
          </svg>
        </div>

        <InfoBlock type="definition" title="La Formule de Black">
          Pour modéliser l'impédance de transfert globale d'un schéma rebouclé, on applique l'algébre de Black. Le ratio unifié Consigne/Sortie, ou fonction de transfert en boucle fermée (FTBF), s'exprime analytiquement par :
          <MathComponent block math="H_{BF}(p) = \frac{Y(p)}{U_{in}(p)} = \frac{A(p)}{1 + A(p) \cdot B(p)}" />
        </InfoBlock>
      </Section>

      <Section title="✏️ Résolution d'Exercices Guidés" icon="✏️" color="emerald">
        <InteractiveExercise
          title="Exercice 2 : Calcul de fonction de transfert d'un filtre R-C"
          question={<p>On considère un filtre électrique passif RC passe-bas standard. L'entrée est la tension v_e(t), et la sortie mesurée est la tension aux bornes du condensateur v_s(t). Déterminer la transformée de sa relation et sa fonction globale de transfert spectral H(p).</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 1 : Poser la loi des mailles temporelle</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                La loi d'Ohm et celle des mailles en série stipulent :
                <br />
                <MathComponent block math="v_e(t) = R \cdot i(t) + v_s(t)" />
                Le courant liant le condensateur s'écrivant par la dérivée : <MathComponent math="i(t) = C \frac{dv_s(t)}{dt}" />
                <br />
                On remplace et on obtient l'équation différentielle classique de premier ordre :
                <MathComponent block math="v_e(t) = R C \frac{dv_s(t)}{dt} + v_s(t)" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Projection dans le domaine complexe de Laplace</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                En supposant desconditions initiales rigoureusement nulles ($v_s(0)=0$), nous projetons l'équation différentielle :
                <br />
                <MathComponent block math="V_e(p) = R C \cdot p \cdot V_s(p) + V_s(p)" />
                On factorise par la variable de tension de sortie complexe obtenue $V_s(p)$ :
                <MathComponent block math="V_e(p) = (1 + R C p) \cdot V_s(p)" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Rationaliser le ration H(p)</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
                La fonction de transfert globale s'exprime par le ratio Sortie/Entrée :
                <MathComponent block math="H(p) = \frac{V_s(p)}{V_e(p)} = \frac{1}{1 + R C p}" />
                On identifie notre constante de temps physique de relaxation : $\tau = RC$. 
                Le filtre RC est bien un système de premier ordre parfait pur de gain unitaire $K=1$.
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards conceptuelles" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Qu'est-ce qu'un pôle d'une fonction de transfert complète ?"
            back="Un pôle est une racine complexe du polynôme du dénominateur D(p). Sa position dans le plan complexe détermine entièrement la stabilité naturelle transitoire du circuit."
          />
          <Flashcard 
            front="Quelle est la condition nécessaire de stabilité stricte d'un asservissement ?"
            back="Tous les pôles complexes de sa fonction de transfert globale en boucle fermée doivent impérativement posséder une partie réelle strictement négative (située dans le demi-plan gauche)."
          />
          <Flashcard 
            front="A quoi correspond un dépassement indiciel (Overshoot) ?"
            back="Pour un deuxième ordre sous-amorti (m < 1), c'est l'excursion de la sortie au-dessus de sa valeur stabilisée à la suite d'un échelon brutal de consigne."
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes des Étudiants" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre la transformée de Fourier et celle de Laplace ?",
              answer: "Fourier projette le signal sur des ondes exclusivement oscillatoires réelles imaginaires pures p = jω (analyse de spectre stable). Laplace ajoute une coordonnée réelle d'amortissement exponentiel de pulsation p = σ + jω, permettant de traiter de manière rigoureuse des signaux instables divergent ou transitoire."
            },
            {
              question: "Pourquoi les conditions initiales du théorème de dérivation s'annulent-elles souvent ?",
              answer: "En automatisme et contrôle, on étudie le comportement dynamique d'un système à partir de sa mise en marche depuis un état stationnaire stable standard, soit f(0^+) = 0. Cela simplifie les calculs matriciels."
            },
            {
              question: "Qu'est-ce que l'erreur statique de consigne d'un asservissement ?",
              answer: "C'est l'écart final persistant entre la consigne d'entrée stable et la sortie physique contrôlée stable obtenue à t → ∞. L'intégration dans le correcteur permet de réduire cette erreur statique à zéro."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz Validation de Maîtrise" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la transformée de Laplace inverse exacte du polynôme rationnel Y(p) = 2 / (p + 3) ?",
              options: [
                "y(t) = 2 * e^(3t) * u(t)",
                "y(t) = 2 * e^(-3t) * u(t)",
                "y(t) = -6 * t * u(t)"
              ],
              correctAnswer: 1,
              explanation: "D'après les transformées usuelles, L^-1{ 1 / (p + a) } = e^(-at) u(t). Par linéarité, multiplier par l'amplitude 2 nous donne directement y(t) = 2 * e^(-3t) * u(t)."
            },
            {
              question: "Pour un système de premier ordre H(p) = 5 / (1 + 2p), quelle est la valeur finale à la suite d'un échelon d'amplitude 4V ?",
              options: [
                "La valeur finale vaut 5V",
                "La valeur finale vaut 20V",
                "La valeur finale vaut 9V"
              ],
              correctAnswer: 1,
              explanation: "La valeur finale suite à un écuron est régie par le théorème de la valeur finale ou simplement le produit du gain statique K par la consigne de tension : V_asymptote = K * U_in = 5 * 4 = 20V."
            },
            {
              question: "Quelle est la formule d'asservissement en boucle fermée pour une chaîne directe C(p) correcteur et un circuit G(p) avec retour unitaire ?",
              options: [
                "H_BF(p) = C(p) * G(p) / (1 + C(p) * G(p))",
                "H_BF(p) = C(p) / (1 + G(p))",
                "H_BF(p) = G(p) / (1 - C(p))"
              ],
              correctAnswer: 0,
              explanation: "Puisque la chaîne de retour feedback unitaire vaut B(p) = 1, et que la chaîne directe interne vaut A(p) = C(p) * G(p), par la formule de Black on obtient directement : FTBF(p) = (C * G) / (1 + C * G)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je comprends le remplacement de l'opérateur de dérivation temporelle d/dt par la coordonnée complexe p.",
            "Je sais lire la table de référence des transformées de Laplace temporelles d'ondes.",
            "Je sais identifier les pôles du dénominateur pour étudier la stabilité d'un asservissement.",
            "Je sais appliquer la formule algébrique de Black pour reboucler un schéma fonctionnel."
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

export default Course_Post_Bac_BUT_GEII_Laplace;
