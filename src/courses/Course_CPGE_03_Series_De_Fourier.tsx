import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../components/SharedUI';
import { useProgress } from '../hooks/useProgress';
import { motion } from 'framer-motion';
import { Activity, Sliders, Zap, HelpCircle } from 'lucide-react';

const FourierCpgeVisualizer: React.FC = () => {
  const [waveform, setWaveform] = useState<'sawtooth' | 'square' | 'triangle'>('sawtooth');
  const [nTerms, setNTerms] = useState<number>(5);
  const [zoomDiscontinuity, setZoomDiscontinuity] = useState<boolean>(true);

  const fourier = useMemo(() => {
    // Generate SVG path for the selected signal
    const width = 240;
    const height = 140;
    const centerY = height / 2;

    const evalFourier = (t: number, terms: number) => {
      let sum = 0;
      if (waveform === 'sawtooth') {
        // Sawtooth: (2/pi) * Sum_{n=1}^{N} (-1)^(n-1) * sin(n * t) / n
        for (let n = 1; n <= terms; n++) {
          const sign = n % 2 === 1 ? 1 : -1;
          sum += (sign * Math.sin(n * t)) / n;
        }
        sum = sum * (2 / Math.PI);
      } else if (waveform === 'square') {
        // Square: (4/pi) * Sum_{k=1,3,...}^{N} sin(k * t) / k
        for (let k = 1; k <= terms; k += 2) {
          sum += Math.sin(k * t) / k;
        }
        sum = sum * (4 / Math.PI);
      } else {
        // Triangle: (8/pi^2) * Sum_{k=1,3,...}^{N} (-1)^((k-1)/2) * sin(k * t) / k^2
        for (let k = 1; k <= terms; k += 2) {
          const sign = ((k - 1) / 2) % 2 === 0 ? 1 : -1;
          sum += (sign * Math.sin(k * t)) / (k * k);
        }
        sum = sum * (8 / (Math.PI * Math.PI));
      }
      return sum;
    };

    const signalPoints: string[] = [];
    const approximationPoints: string[] = [];

    // Screen spans t from -Math.PI to Math.PI visually
    for (let px = 10; px <= 230; px++) {
      const t = ((px - 120) / 110) * Math.PI; // scale factor
      
      // Compute raw signal value
      let rawVal = 0;
      if (waveform === 'sawtooth') {
        // f(t) = t / pi for t in [-pi, pi]
        rawVal = t / Math.PI;
      } else if (waveform === 'square') {
        // f(t) = signum(t)
        rawVal = t >= 0 ? 0.7 : -0.7;
      } else {
        // f(t) = 1 - 2*abs(t)/pi
        rawVal = 0.8 - (1.6 * Math.abs(t)) / Math.PI;
      }

      const pYRaw = centerY - rawVal * 50;
      signalPoints.push(`${px},${pYRaw}`);

      // Compute Fourier sum
      const approxVal = evalFourier(t, nTerms);
      const pYApprox = centerY - approxVal * 50;
      approximationPoints.push(`${px},${pYApprox}`);
    }

    // Gibbs overshoot calculation near x = 0 (or discontinuous points)
    // Gibbs overshoot converges mathematically to ~1.089 * jump size
    const gibbsOvershootVal = 18.2; // roughly ~9.0% elevation

    return {
      rawPath: signalPoints.join(' L '),
      approxPath: approximationPoints.join(' L '),
      gibbsOvershootVal,
      centerY
    };
  }, [waveform, nTerms]);

  // Compute partial sum representing the Riemann zeta sequence or Euler formula
  const eulerZetaSum = useMemo(() => {
    let sum = 0;
    for (let k = 1; k <= nTerms; k++) {
      sum += 1 / (k * k);
    }
    return sum;
  }, [nTerms]);

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Activity className="text-purple-600 animate-pulse" size={22} />
        Démonstrateur Rigoureux de Dirichlet et Phénomène de Gibbs
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Sélectionnez un signal et ajustez le nombre {"$N$"} de polynômes trigonométriques pour visualiser l'ondulation locale de Gibbs et la régularisation de Dirichlet aux discontinuités.
      </p>

      {/* Control Selector */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'sawtooth', label: 'Dent de Scie (Discontinu)' },
          { id: 'square', label: 'Créneau Symétrique' },
          { id: 'triangle', label: 'Triangle (Continu C0)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setWaveform(tab.id as any)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${waveform === tab.id ? 'bg-purple-600 border-purple-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 border-slate-200 text-slate-600 dark:text-slate-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders and diagnostic */}
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders size={12} /> Réglages de la Somme de Fourier
            </h4>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Degré limite de l'harmonique (N) :</span>
                <span className="text-purple-650 font-mono font-black">N = {nTerms}</span>
              </div>
              <input 
                type="range" min="1" max="23" step={waveform === 'sawtooth' ? 1 : 2} value={nTerms} onChange={(e) => setNTerms(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-650"
              />
            </div>

            <div className="flex items-center gap-3">
              <input 
                id="zoom-input"
                type="checkbox" 
                checked={zoomDiscontinuity} 
                onChange={() => setZoomDiscontinuity(!zoomDiscontinuity)} 
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="zoom-input" className="text-xs font-bold text-slate-650 dark:text-slate-300 cursor-pointer select-none">
                Surligner le raccordement de Dirichlet
              </label>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/25 border border-purple-100 dark:border-purple-950 space-y-2 text-xs">
            <h4 className="text-xs font-bold text-purple-800 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} /> Diagnostic Théorique d'Isométrie :
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Convergence uniforme ?</span>
                <strong className={waveform === 'triangle' ? 'text-emerald-500' : 'text-rose-500'}>
                  {waveform === 'triangle' ? 'Oui (Théorème Dirichlet C0)' : 'Non (Jump disjoint)'}
                </strong>
              </div>
              <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-1 mt-1 font-semibold text-purple-750 dark:text-purple-400">
                <span>Série de Riemann calculée {"$\\sum_{1}^N \\frac{1}{k^2}$"} :</span>
                <strong className="font-mono">{eulerZetaSum.toFixed(5)}</strong>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 leading-normal">
                <span>Limite au sens de Basel {"$\\pi^2/6$"} :</span>
                <strong className="font-mono">1.64493</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Graph rendering Dirichlet Midpoint */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Écran Fourier (Oscilloscope HD)</span>

          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-2 relative shadow-inner overflow-hidden">
            <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
              {/* Axes and coordinate ticks */}
              <line x1="10" y1="70" x2="230" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="120" y1="5" x2="120" y2="135" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

              {/* Original periodic signal curve in dashed slate */}
              <path d={`M ${fourier.rawPath}`} stroke="#b45309" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.4" />

              {/* Fourier approximation Sn(f) in deep purple */}
              <path d={`M ${fourier.approxPath}`} stroke="#a855f7" strokeWidth="2.5" fill="none" />

              {/* Dirichlet jump indicator dot at the boundary discontinuities */}
              {zoomDiscontinuity && (waveform === 'sawtooth' || waveform === 'square') && (
                <>
                  {/* Left bound jump end */}
                  <circle cx="10" cy={fourier.centerY} r="3.5" fill="#ef4444" />
                  {/* Right bound jump end */}
                  <circle cx="230" cy={fourier.centerY} r="3.5" fill="#ef4444" />
                  {/* Middle discontinuity point (exactly at x = pi and -pi) showing convergence of Dirichlet average at jumper */}
                  <circle cx="120" cy={fourier.centerY} r="5" fill="#10b981" />
                  
                  {/* Gibbs overshoot arrow indicating the ~9% overshoot peak */}
                  {waveform === 'square' && (
                    <g>
                      <line x1="128" y1="28" x2="128" y2="40" stroke="#f43f5e" strokeWidth="1" />
                      <circle cx="128" cy="28" r="1.5" fill="#f43f5e" />
                    </g>
                  )}
                </>
              )}
            </svg>

            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[9px] text-purple-400 font-mono rounded-md flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              <span>Analyseur harmonique Dirichlet</span>
            </div>
            
            {(waveform === 'square' || waveform === 'sawtooth') && zoomDiscontinuity && (
              <div className="absolute bottom-2 right-2 text-[8px] bg-slate-900/95 text-slate-100 p-2 rounded border border-purple-900 leading-snug font-mono pointer-events-none">
                <div className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                  <span>● Dirichlet : Midpoint = 0.0</span>
                </div>
                <div className="flex items-center gap-1 text-rose-500">
                  <span className="w-1 h-1 rounded-full bg-rose-500"></span>
                  <span>● Gibbs : Overshoot Peak</span>
                </div>
              </div>
            )}
          </div>
          <span className="text-[9px] text-slate-400 mt-2 font-mono text-center">
            Vert : Point régularisé de Dirichlet à la discontinuité. <br />
            Rose : Ondulations du phénomène de Gibbs.
          </span>
        </div>
      </div>
    </div>
  );
};

const Course_CPGE_03_Series_De_Fourier: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/04_Post_Bac/CPGE/03_CPGE_03_Series_De_Fourier.md";

  const checklistItems = [
    "Formuler les polynômes trigonométriques et calculer les coefficients de Fourier complexes c(n).",
    "Appliquer le Théorème de Dirichlet pour identifier la limite ponctuelle des séries de Fourier.",
    "Formuler le Théorème de Parseval et exploiter le produit scalaire sur l'espace L2.",
    "Comprendre le phénomène de Gibbs et l'obstruction à la convergence uniforme.",
    "Résoudre le problème de Bâle grâce à l'analyse spectrale polynomiale."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="FOU" 
        title="Analyse Harmonique des Séries de Fourier" 
        subtitle="Découvrez le formalisme mathématique rigoureux de l'analyse spectrale : préhilbertiens complexes, théorèmes de Dirichlet de Dirichlet fort, égalité de Parseval et théorème de Gibbs."
        level="CPGE MPSI / PCSI / MP"
        duration="4.5h"
        objectives={[
          "Maitriser le calcul des coefficients réels et complexes de Fourier.",
          "Analyser de façon rigoureuse les théorèmes de convergences simple et uniforme de Dirichlet.",
          "Exploiter l'identité de Parseval pour évaluer les intégrales réelles complexes complexes.",
          "Étudier l'accumulation harmonique et la nature de Basel."
        ]}
      />

      <InfoBlock type="info" title="L'esprit de l'analyse harmonique en CPGE">
        L'analyse harmonique représente l'un des sommets du programme de Spé. Elle unifie de façon géométrique deux branches fondamentales des mathématiques : l'**Analyse** (théorie de la convergence des suites de fonctions) et l'**Algèbre linéaire** (espace de dimension infinie doté d'un produit scalaire, où les fonctions trigonométriques forment une famille orthogonale de vecteurs unitaires).
      </InfoBlock>

      <Section title="1. Coefficients de Fourier et Isométrie préhilbertienne" color="slate" icon="📐">
        <div className="space-y-4">
          <p>
            Soit l'espace vectoriel des fonctions d'une variable réelle, à valeurs complexes, périodiques de période {"$T$"} et continues par morceaux. On munit cet espace d'un produit scalaire hermitien canonique :
          </p>
          <div className="font-mono text-center p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-indigo-700 dark:text-indigo-400 font-black text-xs md:text-sm">
            {"$$\\langle f, g \\rangle = \\frac{1}{T} \\int_{0}^{T} \\overline{f(t)} g(t) \\,\\mathrm{d}t$$"}
          </div>

          <p>
            Dans ce formalisme d'espace préhilbertien, les fonctions exponentielles élémentaires de pulsation {"$e_n(t) = e^{j n \\omega t}$"} forment une famille orthonormale. Les **coefficients de Fourier complexes** ne sont rien d'autre que les coordonnées de projection de la fonction sur cette base hilbertienne :
          </p>

          <BentoGrid>
            <BentoCard title="Expression complexe c(n)" color="slate">
              <p className="text-xs text-zinc-500 mb-2">Coordonnées spectrales exponentielles :</p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                {"$$c_n(f) = \\frac{1}{T} \\int_{0}^{T} f(t) e^{-j n \\omega t} \\,\\mathrm{d}t$$"}
              </div>
            </BentoCard>

            <BentoCard title="Coefficients réels a(n) et b(n)" color="indigo">
              <div className="font-mono text-xs font-bold text-indigo-900 dark:text-indigo-100 flex flex-col gap-1 py-1">
                <span>Le calcul combiné donne :</span>
                <span className="text-center font-black text-indigo-700 dark:text-indigo-400">{"$$a_n = c_n + c_{-n}$$"}</span>
                <span className="text-center font-black text-indigo-700 dark:text-indigo-450">{"$$b_n = j(c_n - c_{-n})$$"}</span>
              </div>
            </BentoCard>

            <BentoCard title="Théorème fondamental de Parseval (Conservation d'énergie)" color="purple" colSpan={3}>
              <p className="text-xs text-zinc-400 mb-2">La norme L2 de la fonction correspond strictement au cumul quadratique des coordonnées de sa décomposition spectrale :</p>
              <div className="font-mono text-center p-2.5 bg-white dark:bg-slate-950 rounded border text-purple-750 dark:text-purple-400 font-bold text-xs">
                {"$$\\frac{1}{T} \\int_{0}^{T} |f(t)|^2 \\,\\mathrm{d}t = \\sum_{n=-\\infty}^{+\\infty} |c_n(f)|^2 = a_0^2 + \\sum_{n=1}^{+\\infty} \\frac{a_n^2 + b_n^2}{2}$$"}
              </div>
              <p className="text-[10px] text-indigo-600 font-bold mt-1.5 leading-normal">C'est la généralisation directe de Pythagore à toutes les dimensions infinies du spectre de Hilbert.</p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="2. Convergence Dirichlet et Convergence Uniforme" color="indigo" icon="🎯">
        <div className="space-y-4">
          <p>
            Reconstituer analytiquement la fonction d'origine en sommant ses harmoniques infinitésimales pose des contraintes profondes de topologie de convergence.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] space-y-4">
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-400">Théorème de Convergence de Dirichlet (1829) :</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Soit {"$f$"} une fonction périodique et de classe {"$C^1$"} par morceaux. Pour tout réel {"$x$"}, la série de Fourier de f converge ponctuellement vers la valeur moyenne régularisée symétrique :
            </p>
            <div className="font-mono text-center py-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-black text-sm md:text-base">
              {"$$\\lim_{N \\to \\infty} S_N(f)(x) = \\frac{f(x^+) + f(x^-)}{2}$$"}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              • Aux points de continuité de la fonction, {"$f(x^+) = f(x^-) = f(x)$"}, d'où convergence simple vers {"$f(x)$"} !
              <br />
              • Aux points de discontinuité de raccordement, le spectre converge rigoureusement vers le **milieu de la discontinuité** !
            </p>
          </div>

          <TipBanner type="info" title="Théorème de Dirichlet Fort (Normalisation)">
            Si la fonction périodique {"$f$"} is continue sur ℝ et de classe {"$C^1$"} par morceaux, alors la série de Fourier de f est **normalement convergente**, et donc uniformément convergente sur l'ensemble complet de ℝ vers {"$f$"}.
          </TipBanner>
        </div>
      </Section>

      <Section title="3. Le Phénomène de Gibbs et son Obstruction Uniforme" color="purple" icon="🚨">
        <div className="space-y-4">
          <p>
            Le comportement des séries au voisinage direct des sauts de discontinuité recèle des singularités d'oscillation. Même lorsque {"$N$"} tend vers l'infini, la somme de Fourier {"$S_N(f)$"} déborde et dépasse de manière persistante la valeur de la courbe.
          </p>
          
          <InfoBlock type="reminder" title="Obstruction topologique fondamentale">
            Contrairement à une idée reçue, aux voisinages des discontinuités de jump, bien que la série de Fourier converge ponctuellement (Dirichlet), elle **ne peut pas** y converger uniformément. L'amplitude de l'overshoot résiduel (Gibbs oscillation) converge vers une proportion constante bien définie :
            <div className="font-mono text-center my-3 p-2 bg-slate-100 dark:bg-slate-950 border rounded font-black text-rose-700 dark:text-rose-400">
              {"$$\\text{Overshoot} \\approx \\frac{2}{\\pi} \\int_0^\\pi \\frac{\\sin t}{t} \\,\\mathrm{d}t - 1 \\approx 0.08949 \\quad (\\sim 9\\% \\text{ du saut})$$"}
            </div>
            Ce débordement systématique par pic de Gibbs explique les oscillations stridentes (bruits d'écho) inhérents à tous les filtres audio et vidéo numériques d'écrêtement brutal.
          </InfoBlock>
        </div>
      </Section>

      <Section title="4. Simulateur de Dirichlet-Gibbs" color="slate" icon="🎛️">
        <FourierCpgeVisualizer />
      </Section>

      <Section title="Exercices Résolus d'Analyse Harmonique" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Solution de Parseval sur la somme de Riemann et le Problème de Bâle"
          question={
            <>
              Soit la fonction réelle périodique {"$f$"} de période {"$2\\pi$"}, définie sur l'intervalle d'origine {"$]-\\pi ; \\pi]$"} par :
              {"$$f(t) = t$$"}.
              <br />
              1. En appliquant la décompostion harmonique, vérifier que les coefficients réels cosinus d'ordre n de cette onde impaire sont nuls {"$a_n = 0_R$"}.
              <br />
              2. Confirmer que la contribution sinus vaut {"$b_n = \\frac{2(-1)^{n-1}}{n}$"}.
              <br />
              3. En exploitant l'isométrie du théorème de Parseval sur cet ensemble, démontrer la valeur exacte de la série convergente de Riemann de Bâle :
              {"$$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul des coefficients par parité</strong>
              <p className="mt-2 text-sm leading-relaxed">
                • Notre fonction est impaire (puisque {"$f(-t) = -t = -f(t)$"} sur l'intervalle).
                Par définition directe de parité, sa composante de de décalage continue moyenne est nulle, tout comme l'intégrative des sinusites paires :
                {"$$a_0 = 0 \\quad \\text{et} \\quad a_n = 0 \\quad \\forall n \\ge 1$$"}.
                <br />
                • Calculons le coefficient sinus {"$b_n$"}. La loi de décomposition sur un intervalle de base s'énonce :
                {"$$b_n = \\frac{2}{2\\pi} \\int_{-\\pi}^{\\pi} t \\sin(n t) \\,\\mathrm{d}t = \\frac{2}{\\pi} \\int_{0}^{\\pi} t \\sin(n t) \\,\\mathrm{d}t$$"}.
              </p>
            </>,
            <>
              <strong>Étape 2 : Intégration par parties analytique</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Appliquons une intégration par parties en posant :
                {"$$u(t) = t \\implies u'(t) = 1 \\quad , \\quad v'(t) = \\sin(dt) \\implies v(t) = -\\frac{\\cos(nt)}{n}$$"}.
                On a : {"$$\\int_{0}^{\\pi} t \\sin(n t) \\,\\mathrm{d}t = \\left[ -\\frac{t \\cos(nt)}{n} \\right]_0^\\pi - \\int_0^\\pi -\\frac{\\cos(nt)}{n} \\,\\mathrm{d}t$$"}.
                <br />
                Puisque {"$\\int_0^\\pi \\cos(nt) \\,\\mathrm{d}t = 0$"} pour tout entier {"$n \\ge 1$"}, il ne reste que le terme des bornes :
                {"$$\\text{Intégrale} = -\\frac{\\pi \\cos(n\\pi)}{n} = -\\frac{\\pi (-1)^n}{n} = \\frac{\\pi (-1)^{n-1}}{n}$$"}.
                En multipliant par le coefficient d'échelle extérieur, nous obtenons :
                {"$$b_n = \\frac{2}{\\pi} \\left( \\frac{\\pi (-1)^{n-1}}{n} \\right) = \\frac{2 (-1)^{n-1}}{n}$$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Application rigoureuse de Parseval</strong>
              <p className="text-sm mt-1 leading-relaxed">
                Appliquons désormais l'isométrie énergétique de Parseval :
                {"$$\\frac{1}{T} \\int_{-\\pi}^{\\pi} |f(t)|^2 \\,\\mathrm{d}t = a_0^2 + \\sum_{n=1}^{\\infty} \\frac{a_n^2 + b_n^2}{2} = \\sum_{n=1}^{\\infty} \\frac{b_n^2}{2}$$"}.
                <br />
                • Calculons la norme physique L2 (valeur de l'énergie moyenne intégrative) :
                {"$$\\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} t^2 \\,\\mathrm{d}t = \\frac{1}{2\\pi} \\left[ \\frac{t^3}{3} \\right]_{-\\pi}^\\pi = \\frac{1}{2\\pi} \\left( \\frac{2\\pi^3}{3} \\right) = \\frac{\\pi^2}{3}$$"}.
                <br />
                • Calculons le terme somme-produit :
                {"$$\\sum_{n=1}^{\\infty} \\frac{b_n^2}{2} = \\sum_{n=1}^{\\infty} \\frac{1}{2} \\left( \\frac{4}{n^2} \\right) = 2 \\sum_{n=1}^{\\infty} \\frac{1}{n^2}$$"}.
                Force l'égalité des facteurs de part et d'autre :
                {"$$2 \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{3} \\implies \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$$"}.
              </p>
              <div className="font-mono text-center my-3.5 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-sm">
                Conclusion : Riemann totalisé au rang 2 donne exactement π^2/6. Le Problème d'analyse de Basel est résolu !
              </div>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Application de Parseval pour de l'énergie au rang d'harmonique 4"
          question={
            <>
              Pour un signal périodique complexe d'alimentation, on estime les coefficients d'harmoniques de Fourier réels calculés :
              <br />
              {"$$a_0 = 12\\text{ V} \\quad , \\quad a_1 = 5\\text{ V} \\quad , \\quad b_1 = 3\\text{ V} \\quad , \\quad a_2 = 2\\text{ V} \\quad , \\quad b_2 = 1\\text{ V}$$"}.
              <br />
              Tous les autres coefficients d'ordre supérieur à 2 sont nuls.
              <br />
              Trouver la valeur efficace de tension globale exacte {"$V_{\\text{eff}}$"} appliquée au circuit.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Poser l'égalité spectrale de Parseval</strong>
              <p className="mt-2 text-sm leading-relaxed">
                La formulation de l'égalité de Parseval pour des tensions s'exprime par le cumul de de toutes les puissances indépendantes :
                {"$$V_{\\text{eff}}^2 = a_0^2 + \\sum_{n=1}^{\\infty} \\frac{a_n^2 + b_n^2}{2}$$"}.
              </p>
            </>,
            <>
              <strong>Étape 2 : Remplacer par les variables réelles mesurées</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Puisque les termes sont nuls pour {"$k > 2$"}, sommons isolément :
                <br />
                {"$$V_{\\text{eff}}^2 = a_0^2 + \\frac{a_1^2 + b_1^2}{2} + \\frac{a_2^2 + b_2^2}{2}$$"}
                <br />
                {"$$V_{\\text{eff}}^2 = (12)^2 + \\frac{5^2 + 3^2}{2} + \\frac{2^2 + 1^2}{2}$$"}
                <br />
                {"$$V_{\\text{eff}}^2 = 144 + \\frac{25 + 9}{2} + \\frac{4 + 1}{2}$$"}
              </p>
            </>,
            <>
              <strong>Étape 3 : Calcul arithmétique de la puissance</strong>
              <p className="text-sm mt-1 leading-relaxed">
                Additionnons les fractions partielles calculées :
                {"$$V_{\\text{eff}}^2 = 144 + \\frac{34}{2} + \\frac{5}{2} = 144 + 17 + 2.5 = 163.5\\text{ V}^2$$"}.
                <br />
                D'où la tension RMS globale :
                {"$$V_{\\text{eff}} = \\sqrt{163.5} \\approx 12.787\\text{ Volts}$$"}.
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-sm">
                La tension totale efficace efficace est de exactement 12.79 V.
              </div>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon={<HelpCircle className="text-indigo-600 w-5 h-5"/>}>
        <AccordionFAQ items={[
          {
            question: "Théorème de Dirichlet vs Théorème de Dirichlet Fort : quelle subtilité ?",
            answer: "C'est une question de nuance de topologie d'analyse. Le théorème de Dirichlet simple garantit la convergence point par point (ponctuelle) de la série vers f(x), sans contrainte globale uniforme. Le théorème de Dirichlet fort exige que la fonction f soit continue sur ℝ de classe C1 par morceaux. Dans ce cas, nous obtenons la convergence uniforme et normale sur ℝ complet."
          },
          {
            question: "Pourquoi l'oscillateur s'appelle de Gibbs alors qu'Euler l'a mesuré ?"
            ,answer: "C'est un fait historique classique des publications scientifiques. En réalité, le physicien Albert Michelson avait observé l'overshoot sur des machines analogiques sans que les mathématiciens n'y croient. C'est Josiah Willard Gibbs qui en a réexprimé formellement la limite analytique constante (~0.089) en 1899, d'où le nom de phénomène de Gibbs."
          },
          {
            question: "Est-on limité aux fonctions à valeurs complexes pour appliquer la décomposition ?",
            answer: "Absolument pas, l'analyse de Fourier fonctionne de manière totalement unifiée sur les réels. On choisit la notation complexes trigonométriques complexes c_n = coordonnée de proj par commodité analytique pour s'épargner les fastidieuses de trigonométrie d'Euler."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formulation de la convergence Dirichlet à une discontinuité de saut ?</>}
            back={<>La série converge précisément vers <strong>{"$\\frac{f(x^+) + f(x^-)}{2}$"}</strong>. C'est la valeur de la moyenne symétrique regularisée au saut.</>}
          />
          <Flashcard 
            front={<>Quelle est l'amplitude asymptotique d'overshoot du phénomène de Gibbs ?</>}
            back={<>Elle correspond à environ <strong>9%</strong> du saut de tension global. Elle ne diminue pas si on augmente N, elle s'amincit simplement.</>}
          />
        </div>
      </Section>

      <Section title="Quiz de Validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Quelle est la nature de la convergence d'une série de Fourier si la fonction est continue par morceaux et de classe C1 sur ℝ complet ?",
              options: ["Convergence simple seulement", "Convergence normale (et uniforme)", "Divergence quadratique"],
              correctAnswer: 1,
              explanation: "Rappel théorème de Dirichlet fort : si la fonction est de classe C1 par morceaux et totalement continue, on obtient la convergence normale, qui garantit la convergence uniforme des oscillations."
            },
            {
              question: "Si sur [0, T], le signal f(t) est de moyenne nulle et que Parseval donne une somme de coefficients de Fourier de 18. Quelle est la valeur efficace de tension ?",
              options: ["3 V", "9 V", "6 V"],
              correctAnswer: 0,
              explanation: "Parseval : Veff^2 = sum_k |c_k|^2 = 18 pour d'autres échelles réelles complexes bilatérales, sum c_k. c_n^2 bilatéral V_eff^2 = 9 ou 18 selon l'usage d'échelle, Veff = sqrt(9) = 3 V."
            },
            {
              question: "Selon Riemann et Fourier, quelle est l'évaluation exacte des somme des inverses pairs au rang 4 : sum_{1}^{∞} 1/n^4 ?",
              options: ["π^4 / 90", "π^4 / 45", "π^4 / 120"],
              correctAnswer: 0,
              explanation: "Théorème de Parseval appliqué à l'énergie de la fonction parabole f(t)=t^2 fournit de manière exacte la somme de Riemann d'exposant 4, qui vaut π^4 / 90."
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

export default Course_CPGE_03_Series_De_Fourier;
