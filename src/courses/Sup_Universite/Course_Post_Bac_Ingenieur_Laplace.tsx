import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, FormulaBox, 
  Quiz, Flashcard, InteractiveExercise, InteractiveChecklist, BentoGrid, BentoCard 
} from '../../components/SharedUI';
import { Sliders, Activity, Hammer, Zap, Award, Compass, HelpCircle } from 'lucide-react';

const LaplaceInteractiveVisualizer: React.FC = () => {
  // Damping ratio (amortissement) zeta and natural frequency (pulsation) omega_n
  const [zeta, setZeta] = useState<number>(0.3);
  const [omegaN, setOmegaN] = useState<number>(4.0);

  // Math for second-order response: H(s) = omega_n^2 / (s^2 + 2*zeta*omega_n*s + omega_n^2)
  // Step response y(t) analytic expression
  const stepResponsePoints = useMemo(() => {
    const list = [];
    const maxT = 3.0;
    const steps = 80;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxT;
      let y = 0;
      
      if (zeta < 1) {
        // Underdamped response
        const omegaD = omegaN * Math.sqrt(1 - zeta * zeta);
        y = 1 - Math.exp(-zeta * omegaN * t) * (
          Math.cos(omegaD * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t)
        );
      } else if (zeta === 1) {
        // Critically damped
        y = 1 - Math.exp(-omegaN * t) * (1 + omegaN * t);
      } else {
        // Overdamped
        const r = Math.sqrt(zeta * zeta - 1);
        const p1 = -omegaN * (zeta - r);
        const p2 = -omegaN * (zeta + r);
        
        // Coeffs determination
        const c1 = p2 / (p2 - p1);
        const c2 = -p1 / (p2 - p1);
        y = 1 + c1 * Math.exp(p1 * t) + c2 * Math.exp(p2 * t);
      }

      list.push({ t, y });
    }
    return list;
  }, [zeta, omegaN]);

  // Coordinates of poles in s-plane
  // s = -zeta*omega_n +/- j*omega_n*sqrt(1-zeta^2) if zeta < 1
  // s = -omega_n +/- omega_n*sqrt(zeta^2-1) if zeta >= 1
  const poles = useMemo(() => {
    if (zeta < 1) {
      const real = -zeta * omegaN;
      const imag = omegaN * Math.sqrt(1 - zeta * zeta);
      return [
        { real, imag },
        { real, imag: -imag }
      ];
    } else {
      const r = omegaN * Math.sqrt(zeta * zeta - 1);
      return [
        { real: -zeta * omegaN + r, imag: 0 },
        { real: -zeta * omegaN - r, imag: 0 }
      ];
    }
  }, [zeta, omegaN]);

  // Convert real graphical space [-10, 2] x [-6, 6] to 220x180 SVG pixels
  const sPlaneX = (val: number) => ((val + 10) / 12) * 220;
  const sPlaneY = (val: number) => 90 - (val / 6) * 90;

  // Convert time response coordinates [0, 3] x [0, 1.8] to 240x180 SVG pixels
  const respX = (t: number) => (t / 3) * 240;
  const respY = (y: number) => 160 - (y / 1.6) * 140;

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Activity className="text-indigo-600 animate-pulse" size={22} />
        Outil de Conception d'Ingénieur : Plan d'Amortissement Temporel & Frequentiel
      </h3>
      <p className="text-xs text-slate-505 text-center mb-6">
        Réglez le coefficient d'amortissement {"$\\zeta$"} et la pulsation propre {"$\\omega_n$"} pour projeter instantanément la position des pôles du plan complexe de Laplace vers la réponse indicielle réelle temporelle.
      </p>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* SLIDER 1: zeta damping coefficient */}
        <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
          <div className="flex justify-between text-xs font-semibold">
            <span> Coefficient d'amortissement : </span>
            <span className="font-mono text-indigo-600 font-bold">
              {"$\\zeta = $"} {zeta.toFixed(2)}
            </span>
          </div>
          <input 
            type="range" min="0.05" max="2.0" step="0.05" value={zeta} onChange={(e) => setZeta(Number(e.target.value))}
            className="w-full cursor-col-resize accent-indigo-650 h-1.5 bg-slate-200 dark:bg-slate-705 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>🏃 Sous-amorti (𝜉 &lt; 1)</span>
            <span>🚨 Critique (𝜉 = 1)</span>
            <span>🐢 Sur-amorti (𝜉 &gt; 1)</span>
          </div>
        </div>

        {/* SLIDER 2: omega_n natural frequency */}
        <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
          <div className="flex justify-between text-xs font-semibold">
            <span> Pulsation propre du système : </span>
            <span className="font-mono text-indigo-600 font-bold">
              {"$\\omega_n = $"} {omegaN.toFixed(1)} rad/s
            </span>
          </div>
          <input 
            type="range" min="1.0" max="8.0" step="0.2" value={omegaN} onChange={(e) => setOmegaN(Number(e.target.value))}
            className="w-full cursor-col-resize accent-indigo-650 h-1.5 bg-slate-200 dark:bg-slate-705 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Sluggish (𝜔 = 1.0)</span>
            <span>Ultra réactif (𝜔 = 8.0)</span>
          </div>
        </div>

      </div>

      {/* Graphs workspace grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT CHART: Pole Zero placement in Laplace s-plane */}
        <div className="bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[220px] shadow-inner text-white">
          <span className="absolute top-3 left-4 text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded border border-slate-800">
            📊 Plan Complexe de Laplace ѕ (Pôles)
          </span>

          <svg viewBox="0 0 220 180" className="w-full max-w-[210px] aspect-[11/9]">
            {/* Real and imaginary axes */}
            <line x1="0" y1="90" x2="220" y2="90" className="stroke-slate-800" strokeWidth="1" />
            <line x1="183.33" y1="0" x2="183.33" y2="180" className="stroke-slate-700" strokeWidth="1.2" /> {/* Origine Re=0 */}

            {/* Grid markings indicators */}
            <line x1={sPlaneX(-5)} y1="87" x2={sPlaneX(-5)} y2="93" className="stroke-slate-500" strokeWidth="0.8" />
            <text x={sPlaneX(-5) - 6} y="82" className="fill-slate-500 font-mono text-[6px]">-5</text>
            
            <line x1="180" y1={sPlaneY(4)} x2="186" y2={sPlaneY(4)} className="stroke-slate-500" strokeWidth="0.8" />
            <text x="189" y={sPlaneY(4) + 2} className="fill-slate-500 font-mono text-[6px]">+4j</text>
            
            <line x1="180" y1={sPlaneY(-4)} x2="186" y2={sPlaneY(-4)} className="stroke-slate-500" strokeWidth="0.8" />
            <text x="189" y={sPlaneY(-4) + 2} className="fill-slate-500 font-mono text-[6px]">-4j</text>

            <text x="210" y="86" className="fill-slate-450 font-mono text-[6px]">Re</text>
            <text x="172" y="10" className="fill-slate-450 font-mono text-[6px]">Im</text>

            {/* Render stability boundary shaded region */}
            <rect x="0" y="0" width="183.33" height="180" className="fill-indigo-500/5" />

            {/* Plot conjugated poles (marked as Red X) */}
            {poles.map((p, idx) => (
              <g key={`pole-${idx}`} className="text-rose-500">
                <line 
                  x1={sPlaneX(p.real) - 4} y1={sPlaneY(p.imag) - 4} 
                  x2={sPlaneX(p.real) + 4} y2={sPlaneY(p.imag) + 4} 
                  className="stroke-rose-450 animate-pulse" 
                  strokeWidth="2.5" 
                />
                <line 
                  x1={sPlaneX(p.real) - 4} y1={sPlaneY(p.imag) + 4} 
                  x2={sPlaneX(p.real) + 4} y2={sPlaneY(p.imag) - 4} 
                  className="stroke-rose-450 animate-pulse" 
                  strokeWidth="2.5" 
                />
              </g>
            ))}
          </svg>
          <div className="text-[9px] text-slate-505 mt-2 bg-slate-900 border border-slate-800 p-1.5 rounded text-center leading-tight">
            Pôles : <span className="text-rose-450 font-mono font-bold">
              {poles[0].real.toFixed(2)} {poles[0].imag !== 0 ? `± j ${poles[0].imag.toFixed(2)}` : ''}
            </span>
          </div>
        </div>

        {/* RIGHT CHART: step response y(t) graph */}
        <div className="bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[220px] shadow-inner text-white">
          <span className="absolute top-3 left-4 text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded border border-slate-800">
            📈 Réponse Temporelle indicielle (t)
          </span>

          <svg viewBox="0 0 240 180" className="w-full max-w-[210px] aspect-[11/9]">
            {/* Horizontal target guideline at y=1.0 */}
            <line x1="0" y1={respY(1.0)} x2="240" y2={respY(1.0)} className="stroke-slate-800" strokeWidth="1" strokeDasharray="3,3" />
            <text x="5" y={respY(1.0) - 4} className="fill-slate-500 font-mono text-[6px]">Cible d'amortissement (100%)</text>

            {/* Time response curve path */}
            {stepResponsePoints.length > 1 && (
              <polyline
                points={stepResponsePoints.map(p => `${respX(p.t)},${respY(p.y)}`).join(' ')}
                className="fill-none stroke-indigo-400"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Origin axis coordinates */}
            <line x1="0" y1="160" x2="240" y2="160" className="stroke-slate-700" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="180" className="stroke-slate-700" strokeWidth="1" />

            <text x="228" y="172" className="fill-slate-450 font-mono text-[6px]">t</text>
            <text x="6" y="12" className="fill-slate-450 font-mono text-[6px]">y(t)</text>
          </svg>
          
          <div className="text-[9px] text-slate-505 mt-2 bg-slate-900 border border-slate-800 p-1.5 rounded text-center leading-tight">
            Condition : <span className="font-bold uppercase text-indigo-400">
              {zeta < 1.0 ? 'Régime Oscillatoire' : zeta === 1.0 ? 'Amortissement Critique' : 'Régime Acyclique'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const Course_Post_Bac_Ingenieur_Laplace: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-LAP"
        title="La Transformée de Laplace"
        subtitle="De l'intégration complexe à l'automatique fréquentielle d'ingénieur : propriétés, équations différentielles et stabilité spectrale."
        duration="1h 10"
      />

      <InfoBlock type="info" title="L'outil universel de l'analyse des signaux et systèmes">
        Dans les sciences de l'ingénieur, la transformée de Laplace est un pont mathématique irremplaçable. Elle transforme des opérateurs intégro-différentiels temporels en simples relations algébriques multiplicatives. En projetant les variables dans le domaine complexe fréquentiel, elle offre une vision instantanée de la stabilité spectrale d'un composant de régulation d'origine électrique, aéronautique ou cinématique.
      </InfoBlock>

      <Section title="1. Définition et Correspondances Intégrales" icon="📐" color="slate">
        <p className="mb-4">
          Soit une fonction causale {"$f: \\mathbb{R}^+ \\to \\mathbb{R}$"} (nulle pour {"$t < 0$"}), continue par morceaux et à croissance exponentielle limitée. La transformée de Laplace unilatérale de {"$f$"}, notée {"$F(s)$"} ou {"$\\mathcal{L}\\{f\\}(s)$"}, est définie pour une variable complexe {"$s = \\sigma + j\\omega \\in \\mathbb{C}$"} par :
          {"$$\\mathcal{L}\\{f(t)\\}(s) = \\int_{0^{-}}^{+\\infty} f(t) e^{-st} \\, dt$$"}
        </p>

        <BentoGrid>
          <BentoCard title="Formulation Duale" icon={<Zap className="text-rose-500" size={18} />} color="rose">
            Elle unifie l'analyse de Fourier classique tout en élargissant son spectre d'intégration aux systèmes dissipatifs et instables grâce au terme d'amortissement réel {"$e^{-\\sigma t}$"}.
          </BentoCard>

          <BentoCard title="Algébrisation des Dérivées" icon={<Hammer className="text-indigo-650" size={18} />} color="indigo">
            C'est son utilité fondamentale : la dérivation temporelle équivaut à multiplier par {"$s$"} dans le domaine spectral, à condition d'intégrer les conditions initiales du système :
            <div className="bg-white dark:bg-slate-950 p-2.5 border border-indigo-150 rounded-lg text-center font-mono my-2 text-indigo-700 text-[11px] font-bold">
              {"$\\mathcal{L}\\{f'(t)\\}(s) = s F(s) - f(0^-)$"}
            </div>
          </BentoCard>

          <BentoCard title="Théorème de la Commutation" icon={<Compass className="text-emerald-650" size={18} />} color="emerald">
            Le produit de circonvolution temporel {"$(f * g)(t)$"} (qui est lourd à calculer à la main) se ramène à un simple produit arithmétique de fonctions de Laplace :
            <div className="bg-white dark:bg-slate-950 p-2.5 border border-emerald-150 rounded-lg text-center font-mono my-2 text-emerald-700 text-[11px] font-bold">
              {"$\\mathcal{L}\\{(f * g)(t)\\} = F(s) \\cdot G(s)$"}
            </div>
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section title="2. Les Pôles et la Stabilité Fréquentielle" icon="⚡" color="indigo">
        <p className="mb-4">
          La <strong>Fonction de Transfert</strong> {"$H(s)$"} d'un système est le rapport de la transformée de Laplace de sa sortie sur celle de sa commande d'entrée. C'est une fraction rationnelle de polynômes rationnels complexes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Thorème d'Amortissement Spectral stable" 
            math={"\\text{Stabilité} \\iff \\forall p \\in \\mathcal{P}, \\ \\text{Re}(p) < 0"} 
          />
          <FormulaBox 
            title="Théorème de la Valeur Finale" 
            math={"\\lim_{t \\to +\\infty} f(t) = \\lim_{s \\to 0} s F(s)"} 
          />
        </div>

        <TipBanner type="warning" title="Importance théorique des pôles à partie réelle strictement négative">
          Si un pôle posee sa partie réelle positive ou nulle (moitié droite du plan complexe de Laplace), le terme temporel associé contiendra une exponentielle croissante divergeante {"$e^{\\sigma_0 t}$"} ou des oscillations persistantes. Le système s'emballe et devient structurellement instable !
        </TipBanner>
      </Section>

      <Section title="3. Simulateur Interactif Frequenciel et Temporel" icon="🎮" color="indigo">
        <LaplaceInteractiveVisualizer />
      </Section>

      <Section title="🧠 Flashcards : Réflexes Fréquentiels" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous à décoder instantanément la stabilité d&apos;un système physique dans le plan de Laplace.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la condition nécessaire et suffisante pour qu&apos;un système de Laplace soit stable ?</>}
            back={<>Tous les pôles du système doivent avoir leur <strong>partie réelle strictement négative</strong> (situés dans la moitié gauche du plan complexe de Laplace).</>}
          />
          <Flashcard 
            front={<>À quoi correspond le produit de convolution de signaux dans le domaine spectral ?</>}
            back={<>Il se convertit en un simple <strong>produit arithmétique direct</strong> : {"$\\mathcal{L}\\{(f * g)(t)\\} = F(s) \\cdot G(s)$"}. C&apos;est d&apos;une simplicité d&apos;analyse spectaculaire !</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice de Résolution Différentielle" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice Résolu : Réponse d'un filtre RLC"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>On étudie la tension aux bornes d'un système électrique de second ordre dont l'équation différentielle s'énonce :</p>
              {"$$y''(t) + 3y'(t) + 2y(t) = x(t)$$"}
              <p>Où {"$x(t) = u(t)$"} est un signal échelon unité (c'est-à-dire {"$x(t) = 1$"} pour t &gt; 0, de transformée {"$X(s) = \\frac{1}{s}$"}). On suppose les conditions initiales rigoureusement nulles : {"$y(0) = y'(0) = 0$"}.</p>
              <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                <li>Exprimer la fonction de transfert complexe {"$H(s) = \\frac{Y(s)}{X(s)}$"}.</li>
                <li>Déterminer l'expression de la tension de sortie fréquente {"$Y(s)$"}.</li>
                <li>Résoudre la transformée de Laplace inverse pour trouver la réponse temporelle finale {"$y(t)$"}.</li>
              </ol>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Passage au domaine fréquentiel de Laplace</p>
              <p>Par application linéaire de la transformée de Laplace avec conditions initiales de repos (nulles), la dérivée seconde s'écrit {"$s^2 Y(s)$"} et la dérivée simple {"$s Y(s)$"}. L'équation différentielle algébrique devient :</p>
              {"$$s^2 Y(s) + 3s Y(s) + 2Y(s) = X(s)$$"}
              {"$$(s^2 + 3s + 2) Y(s) = X(s)$$"}
              <p>La fonction de transfert globale vaut ainsi :</p>
              {"$$H(s) = \\frac{Y(s)}{X(s)} = \\frac{1}{s^2 + 3s + 2}$$"}
            </div>,
            <div className="bg-amber-55/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Décomposition en éléments simples de Y(s)</p>
              <p>Puisque la commande est un échelon, la transformée de la sortie vaut :</p>
              {"$$Y(s) = H(s) X(s) = \\frac{1}{s(s^2 + 3s + 2)}$"}
              <p>Rendons les pôles explicites en factorisant le dénominateur quadratique : {"$s^2 + 3s + 2 = (s+1)(s+2)$"}. On réalise la division simple :</p>
              {"$$Y(s) = \\frac{1}{s(s+1)(s+2)} = \\frac{A}{s} + \\frac{B}{s+1} + \\frac{C}{s+2}$$"}
              <p>Donnons les valeurs des résidus complexes en multipliant par le pôle cible :</p>
              {"$$A = \\lim_{s \\to 0} s Y(s) = \\frac{1}{(1)(2)} = 0.5$$"}
              {"$$B = \\lim_{s \\to -1} (s+1) Y(s) = \\frac{1}{(-1)(-1 + 2)} = -1$$"}
              {"$$C = \\lim_{s \\to -2} (s+2) Y(s) = \\frac{1}{(-2)(-2 + 1)} = 0.5$$"}
              <p>On obtient l'expression simplifiée de la tension spectrale :</p>
              {"$$Y(s) = \\frac{0.5}{s} - \\frac{1}{s+1} + \\frac{0.5}{s+2}$$"}
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-110 text-xs leading-relaxed">
              <p>Étape 3 : Transformée inverse temporelle</p>
              <p>On applique le tableau des correspondances réciproques inverses de Laplace :</p>
              {"$$\\mathcal{L}^{-1}\\left\\{\\frac{1}{s}\\right\\} = u(t), \\quad \\mathcal{L}^{-1}\\left\\{\\frac{1}{s+a}\\right\\} = e^{-at} u(t)$"}
              <p>En remplaçant les facteurs polynomiaux par leurs temporels respectifs :</p>
              {"$$y(t) = \\left[ 0.5 - e^{-t} + 0.5 e^{-2t} \\right] u(t)$"}
              <p>Solution : La tension s'établit de façon stable à t infini vers sa valeur limite de 0.5, amortie par les deux constantes temporelles électriques.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Certification d'Ingénieur" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on retarde un signal temporel d'une durée Tau fixe f(t - Tau), comment est modifiée sa transformée de Laplace fréquentielle ?",
              options: [
                "Elle est divisée par Tau au dénominateur",
                "Elle est multipliée par le facteur exponentiel complexe e^(-Tau * s)",
                "Elle reste rigoureusement plane et inchangée"
              ],
              correctAnswer: 1,
              explanation: "C'est l'importante propriété de translation temporelle. Retarder un signal pur équivaut fréquentiellement à tourner sa phase complexe par le multiplicatif e^{-Tau * s}. C'est la base de modélisation des retards purs !"
            },
            {
              question: "Quel est l'amortissement caractéristique optimal d'un système de second ordre qui garantit la montée la plus vive sans provoquer d'oscillations oscillatoires ( overshoot ) ?",
              options: [
                "L'amortissement critique zeta = 1.0",
                "L'amortissement sous-amorti zeta = 0.1",
                "L'amortissement infini zeta = 100"
              ],
              correctAnswer: 0,
              explanation: "Pour zeta = 1.0, le régime est dit d'amortissement critique. Ses pôles sont réels doubles au même point. C'est le design le plus prisé en automatique mécanique ou hydrologique car il permet de rejoindre la consigne le plus rapidement possible sans subir d'oscillation !"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Connaître la définition de la transformée de Laplace unilatérale causale.",
            "Visualiser l'influence de la position des pôles complexes sur la trajectoire temporelle globale.",
            "Savoir décomposer une fraction complexe en éléments simples pour réaliser la transformée inverse.",
            "Maîtriser la condition mathématique nécessaire et suffisante de stabilité spectrale globale d'un automate branché."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_Ingenieur_Laplace;
