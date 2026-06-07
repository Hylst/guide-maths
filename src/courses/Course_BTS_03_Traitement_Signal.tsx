import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../components/SharedUI';
import { useProgress } from '../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, Volume2, Sliders, Zap, HelpCircle } from 'lucide-react';

const SignalInteractiveSim: React.FC = () => {
  const [waveform, setWaveform] = useState<'square' | 'triangle' | 'sawtooth'>('square');
  const [harmonics, setHarmonics] = useState<number>(3); // Number of harmonics N (1 to 15)
  const [frequency, setFrequency] = useState<number>(1); // Base frequency f (1 to 4)

  const calcSignalPath = useMemo(() => {
    const points: string[] = [];
    const width = 200;
    const height = 120;
    const centerY = height / 2;

    // We plot 150 coordinate points along the physical SVG canvas
    for (let x = 10; x <= 210; x++) {
      // Map x position [10, 210] to time t within [0, 2.0] seconds
      const t = ((x - 10) / width) * 2;
      const omega = 2 * Math.PI * frequency;

      let yVal = 0;

      if (waveform === 'square') {
        // Square wave: (4/pi) * Sum_{k=1,3,...}^{N} sin(k * w * t) / k
        for (let k = 1; k <= harmonics; k += 2) {
          yVal += Math.sin(k * omega * t) / k;
        }
        yVal = yVal * (4 / Math.PI);
      } else if (waveform === 'triangle') {
        // Triangle wave: (8/pi^2) * Sum_{k=1,3,...}^{N} (-1)^((k-1)/2) * sin(k * w * t) / k^2
        for (let k = 1; k <= harmonics; k += 2) {
          const sign = ((k - 1) / 2) % 2 === 0 ? 1 : -1;
          yVal += (sign * Math.sin(k * omega * t)) / (k * k);
        }
        yVal = yVal * (8 / (Math.PI * Math.PI));
      } else {
        // Sawtooth wave: (2/pi) * Sum_{k=1}^{N} (-1)^(k-1) * sin(k * w * t) / k
        for (let k = 1; k <= harmonics; k++) {
          const sign = k % 2 === 1 ? 1 : -1; // Standard sawtooth representation
          yVal += (sign * Math.sin(k * omega * t)) / k;
        }
        yVal = yVal * (2 / Math.PI);
      }

      // Project yVal (ranging roughly between -1 and 1) to height canvas (-40 to +40 pixels)
      const ySvg = centerY - yVal * 42;
      points.push(`${x},${ySvg}`);
    }

    return `M ${points.join(' L ')}`;
  }, [waveform, harmonics, frequency]);

  // Generate individual spectrum heights for the bar chart
  const spectrumData = useMemo(() => {
    const spectrum: { freq: number; amp: number }[] = [];
    for (let k = 1; k <= 9; k++) {
      let amp = 0;
      if (waveform === 'square') {
        amp = k % 2 === 1 && k <= harmonics ? 4 / (Math.PI * k) : 0;
      } else if (waveform === 'triangle') {
        amp = k % 2 === 1 && k <= harmonics ? 8 / (Math.PI * Math.PI * k * k) : 0;
      } else {
        amp = k <= harmonics ? 2 / (Math.PI * k) : 0;
      }
      spectrum.push({ freq: k, amp: amp });
    }
    return spectrum;
  }, [waveform, harmonics]);

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8" id="signal-sim-card">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2" id="signal-sim-title">
        <Activity className="text-indigo-600 animate-pulse" size={22} id="signal-sim-icon" />
        Générateur de Séries de Fourier : Synthesizer Interactif
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Sélectionnez un signal théorique et faites glisser le nombre d'harmoniques pour observer l'effet de synthèse de Fourier et son spectre de fréquences.
      </p>

      {/* Selector Tabs */}
      <div className="flex gap-2 mb-6" id="waveform-tabs">
        {[
          { id: 'square', label: 'Signal Carré' },
          { id: 'triangle', label: 'Signal Triangle' },
          { id: 'sawtooth', label: 'Dent de Scie' }
        ].map(tab => (
          <button
            key={tab.id}
            id={`tab-button-${tab.id}`}
            onClick={() => setWaveform(tab.id as any)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${waveform === tab.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 border-slate-200 text-slate-600 dark:text-slate-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders on Left */}
        <div className="space-y-5" id="sliders-container">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-4" id="controls-panel">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5" id="controls-hdr">
              <Sliders size={12} /> Ajuster la Décomposition
            </h4>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-650 dark:text-slate-300">Nombre d'harmoniques (N) :</span>
                <span className="text-indigo-600 font-mono font-black" id="harmonics-val">{harmonics} sinus</span>
              </div>
              <input 
                id="harmonics-range"
                type="range" min="1" max="15" step={waveform === 'sawtooth' ? 1 : 2} value={harmonics} onChange={(e) => setHarmonics(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[9px] text-slate-400">Plus {"$N$"} est élevé, plus le signal se rapproche d'un tracé parfait sans oscillations aux angles (Phénomène de Gibbs).</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-650 dark:text-slate-300">Fréquence Fondamentale (f) :</span>
                <span className="text-indigo-600 font-mono font-black" id="frequency-val">{frequency} Hz</span>
              </div>
              <input 
                id="frequency-range"
                type="range" min="1" max="4" step="1" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-950 space-y-1.5" id="spectrum-panel">
            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5" id="spectrum-hdr">
              <Zap size={14} /> Spectre Fréquentiel Correspondant :
            </h4>
            <div className="flex items-end justify-between h-20 pt-4 px-2 border-b border-indigo-100 dark:border-indigo-900" id="spectrum-chart">
              {spectrumData.map((bar, idx) => (
                <div key={idx} id={`spectrum-bar-wrapper-${idx}`} className="flex flex-col items-center flex-1 group">
                  <div 
                    id={`spectrum-bar-${idx}`}
                    style={{ height: `${Math.max(2, bar.amp * 60)}px` }} 
                    className={`w-3 rounded-t-sm transition-all duration-300 ${bar.amp > 0 ? 'bg-indigo-600 group-hover:bg-indigo-400' : 'bg-slate-250 dark:bg-slate-800'}`}
                  />
                  <span className="text-[8px] font-mono text-slate-450 mt-1">{bar.freq}f</span>
                </div>
              ))}
            </div>
            <span className="text-[9px] block text-center text-indigo-500/80 italic font-mono">Largeur du spectre défilant de f à 9f</span>
          </div>
        </div>

        {/* Oscilloscope View on Right */}
        <div className="flex flex-col items-center" id="oscilloscope-container">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Tracé oscilloscope (Tension V en fonction du temps t)</span>

          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-2 shadow-inner relative" id="oscilloscope-display">
            <svg viewBox="0 0 220 140" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg" id="oscilloscope-svg">
              {/* Grid Lines inside the Oscilloscope Screen */}
              <line x1="10" y1="20" x2="210" y2="20" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="10" y1="40" x2="210" y2="40" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="10" y1="60" x2="210" y2="60" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="10" y1="80" x2="210" y2="80" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="10" y1="100" x2="210" y2="100" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="10" y1="120" x2="210" y2="120" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />

              <line x1="60" y1="10" x2="60" y2="130" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="110" y1="10" x2="110" y2="130" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="160" y1="10" x2="160" y2="130" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Dynamic Signal Path */}
              <path 
                id="signal-path"
                d={calcSignalPath} 
                stroke="#6366f1" 
                strokeWidth="2.5" 
                fill="none" 
              />
            </svg>

            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[9px] text-indigo-400 font-mono rounded-md flex items-center gap-1.5 shadow" id="scope-status">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>Oscilloscope 500 MS/s</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Axes : horizontal = Temps (s), vertical = Amplitude (V)</span>
        </div>
      </div>
    </div>
  );
};

const Course_BTS_03_Traitement_Signal: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/04_Post_Bac/BTS/03_BTS_03_Traitement_Signal.md";

  const checklistItems = [
    "Résoudre et calculer les valeurs moyennes et efficaces d'un signal périodique usuel (carré, sinusoïde).",
    "Comprendre la formule de décomposition en séries de Fourier trigonométriques.",
    "Manipuler le Théorème de Parseval pour évaluer la puissance efficace totale d'un spectre.",
    "Établir la fonction de transfert complexes H(jω) d'un filtre pour en déduire les atténuations en décibels (dB).",
    "Appliquer le critère de Shannon pour concevoir l'échantillonnage de signaux analogiques en numérique."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8" id="bts3-course-root">
      <CourseHeader 
        id="bts3-header"
        acronym="TS" 
        title="Traitement du Signal" 
        subtitle="Modéliser analytiquement les signaux physiques, comprendre la décomposition spectrale en harmoniques et concevoir l'acquisition de données numériques."
        level="BTS Électronique / Systèmes"
        duration="2.5h"
        objectives={[
          "Caractériser des signaux continus et périodiques (période, fréquence, valeurs intégrées).",
          "Calculer les premiers coefficients réels des séries de Fourier d'une onde carrée ou triangle.",
          "Déterminer et tracer les réponses fréquentielles (Gains, phases) de filtres analogiques passifs.",
          "Comprendre le théorème d'échantillonnage de Shannon pour éviter le repliement de spectre (aliasing)."
        ]}
      />

      <InfoBlock id="bts3-intro-block" type="info" title="Pourquoi traiter mathématiquement un signal physique ?">
        La température captée par une sonde, le signal audio d'un convertisseur DAC, ou les ondes radio d'un récepteur WiFi sont, par nature, des signaux analogiques fluctuations d'ondes continues. Pour que des processeurs ou ordinateurs puissent manipuler ces informations, il faut transformer ces ondes en équations de signaux discrets, isoler leurs différentes harmoniques de fréquences pures, puis planifier le hachage d'acquisition de tension. C'est l'essence même du traitement du signal.
      </InfoBlock>

      <Section id="bts3-sec-1" title="1. Métriques fondamentales des signaux périodiques" color="slate" icon={<Activity className="text-slate-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Soit un signal périodique {"$s(t)$"} de période {"$T$"} et de pulsation temporelle {"$\\omega = 2\\pi f = \\frac{2\\pi}{T}$"} (exprimée en rad/s). On distingue deux indicateurs intégraux fondamentaux :
          </p>

          <BentoGrid id="bts3-bento-metrics">
            <BentoCard id="bts3-bc-moyenne" title="Valeur Moyenne" color="slate">
              <p className="text-xs text-zinc-500 leading-normal mb-2">
                Représente la composante continue ou le décalage (offset) de tension du signal de référence :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$\\langle s \\rangle = S_{\\text{moy}} = \\frac{1}{T} \\int_{0}^{T} s(t) \\,\\mathrm{d}t$$"}
              </div>
            </BentoCard>

            <BentoCard id="bts3-bc-rms" title="Valeur Efficace (RMS)" color="indigo">
              <p className="text-xs text-zinc-500 leading-normal mb-2">
                Représente la puissance dissipative thermique équivalente que dégagerait la tension dans une résistance :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$S_{\\text{eff}} = \\sqrt{\\frac{1}{T} \\int_{0}^{T} s^2(t) \\,\\mathrm{d}t}$$"}
              </div>
            </BentoCard>

            <BentoCard id="bts3-bc-rapports" title="Rapports Usuels" color="amber">
              <div className="font-mono text-xs font-bold text-amber-900 dark:text-amber-100 flex flex-col gap-1 py-0.5">
                <span>• Pour un signal sinusoïdal de valeur crête {"$S_{\\text{max}}$"} :</span>
                <span className="text-center font-black text-indigo-650">{"$S_{\\text{eff}} = \\frac{S_{\\text{max}}}{\\sqrt{2}}$"}</span>
                <span>• Pour un signal carré symétrique d'amplitude ±A :</span>
                <span className="text-center font-black text-indigo-650">{"$S_{\\text{eff}} = A$"}</span>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section id="bts3-sec-2" title="2. Analyse Spectrale et Décomposition de Fourier" color="indigo" icon={<Radio className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Selon le théorème de Fourier, tout signal périodique physique de forme complexe peut être décomposé en une somme infinie de signaux purement sinusoïdaux : un **fondamental** pulsant à la fréquence du signal de base, et des **harmoniques** de fréquences multiples entiers {"$n f$"}.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] space-y-3" id="harmonics-eq-card">
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-400">Équation Harmonique Générale :</h4>
            <div className="font-mono text-center my-3 p-3 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-black text-sm md:text-base overflow-x-auto">
              {"$$s(t) = a_0 + \\sum_{n=1}^{\\infty} \\left[ a_n \\cos(n \\omega t) + b_n \\sin(n \\omega t) \\right]$$"}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              • {"$a_0$"} correspond à la composante moyenne moyenne continue (équivalent à {"$S_{\\text{moy}}$"}).
              <br />
              • {"$a_n$"} et {"$b_n$"} mesurent les amplitudes spectrales affectées à chaque harmonique sinusoïdale d'ordre {"$n$"}.
            </p>
          </div>

          <InfoBlock id="bts3-parseval-block" type="reminder" title="Le Théorème de Parseval">
            Le théorème de Parseval établit que la puissance efficace globale cumulée du signal correspond à la somme des puissances harmoniques indépendantes :
            <div className="font-mono text-center my-2.5 p-2 bg-slate-100 dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-extrabold" id="parseval-eq">
              {"$$S_{\\text{eff}}^2 = a_0^2 + \\sum_{n=1}^{\\infty} \\frac{a_n^2 + b_n^2}{2}$$"}
            </div>
          </InfoBlock>
        </div>
      </Section>

      <Section id="bts3-sec-3" title="3. Simulateur d'Analyse Spectrale Active" color="purple" icon={<Volume2 />}>
        <SignalInteractiveSim />
      </Section>

      <Section id="bts3-sec-4" title="4. Numérisation : Théorème d'acquisition de Shannon" color="slate" icon="🎛️">
        <div className="space-y-4">
          <p>
            Pour numériser correctement un signal acoustique ou physique sans introduire de distorsions ou de "fréquences fantômes" destructrices de spectre, il faut échantillonner le signal à intervalles réguliers d'horloge de fréquence {"$f_e$"}.
          </p>

          <TipBanner id="bts3-shannon-banner" type="warning" title="Le Critère de Shannon-Nyquist">
            La fréquence de hachage d'échantillonnage {"$f_e$"} doit être supérieure au double de la fréquence maximale réelle contenue dans le spectre originel du signal traité :
            <div className="font-mono text-center my-2.5 p-2 text-indigo-700 dark:text-indigo-400 font-black text-lg" id="shannon-eq">
              {"$$f_e > 2 f_{\\text{max}}$$"}
            </div>
            Si cette condition n'est pas remplie, il se produit un phénomène fâcheux d'**aliasing (repliement de spectre)**. Les hautes fréquences se replient et viennent polluer les basses fréquences audibles d'un bruit strident insoluble.
          </TipBanner>
        </div>
      </Section>

      <Section id="bts3-exercises" title="Exercices Résolus d'Ingénierie des Signaux" color="amber" icon="🧠">
        <InteractiveExercise 
          id="bts3-ex-1"
          title="Exercice 1 : Calcul de coefficients harmoniques d'un signal créneau"
          question={
            <>
              Soit un signal périodique créneau symétrique {"$v(t)$"} d'amplitude alternative ±A, de période {"$T$"}. La fonction est impaire (symétrie par rapport à l'origine).
              <br />
              1. En tenant compte de la parité de cette onde alternative, que valent d'emblée la moyenne {"$a_0$"} et les coefficients spectraux cosinus {"$a_n$"} ?
              <br />
              2. Déterminer la formulation analytique des coefficients sinus {"$b_n$"} associés aux harmoniques.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Simplification par analyse des parités du signal</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le signal créneau d'amplitude alternative symétrique oscille de façon idéale entre +A et -A avec un taux de cycle de service égal à exactly 50% :
                <br />
                • Intégrer l'onde sur une période complète montre que la surface positive compense à 100% la surface négative. La moyenne est donc nulle, soit : {"$a_0 = 0$"}.
                <br />
                • Le signal étant **impair** (puisqu'un créneau symétrique satisfait {"$v(-t) = -v(t)$"}), toutes ses composantes de phases harmoniques cosinus (qui sont paires) sont nulles : {"$a_n = 0$"} pour tout entier {"$n \\ge 1$"}.
              </p>
            </>,
            <>
              <strong>Étape 2 : Évaluation intégrale de b(n)</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Puisque le signal is impair, seuls les coefficients sinus subsistent. Appliquons la formulation d'Euler sur une demi-période pour en simplifier le calcul de surface :
                {"$$b_n = \\frac{4}{T} \\int_{0}^{T/2} v(t) \\sin(n \\omega t) \\,\\mathrm{d}t$$"}.
                <br />
                Sachant que sur l'intervalle {"$]0 ; T/2[$"}, {"$v(t) = A$"} :
                {"$$b_n = \\frac{4}{T} \\int_{0}^{T/2} A \\sin(n \\omega t) \\,\\mathrm{d}t = \\frac{4A}{T} \\left[ -\\frac{\\cos(n \\omega t)}{n \\omega} \\right]_{0}^{T/2}$$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Résolution finale des coefficients spectraux</strong>
              <p className="text-sm mt-1 leading-relaxed">
                Rappelons que {"$\\omega = \\frac{2\\pi}{T}$"} et donc que {"$\\omega \\frac{T}{2} = \\pi$"}. Substituons les bornes :
                {"$$b_n = \\frac{4A}{n \\times 2\\pi} \\left( -\\cos(n\\pi) + \\cos(0) \\right) = \\frac{2A}{n\\pi} \\left( 1 - (-1)^n \\right)$$"}.
                <br />
                De ce fait :
                <br />
                • Si {"$n$"} est pair, {"$(-1)^n = 1 \\implies b_n = 0$"}.
                <br />
                • Si {"$n$"} est impair, {"$(-1)^n = -1 \\implies 1 - (-1)^n = 2$"}.
              </p>
              <div className="font-mono text-center my-3.5 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-base" id="bts3-ex1-result-eq">
                {"$$b_n = \\frac{4A}{n\\pi} \\quad \\text{pour } n \\text{ impair}$$"}
              </div>
              <p className="text-xs text-slate-500 italic">C'est la décomposition de Fourier classique du signal créneau, expliquant le spectre décroissant d'harmoniques de notre simulateur !</p>
            </>
          ]}
        />

        <InteractiveExercise 
          id="bts3-ex-2"
          title="Exercice 2 : Atténuation en Décibels et Fréquence de coupure"
          question={
            <>
              Un module de filtre passe-bas du premier ordre d'une carte réseau possède une fonction de transfert complexe définie par :
              <br />
              {"$$H(j\\omega) = \\frac{1}{1 + j\\frac{\\omega}{\\omega_c}}$$"}.
              <br />
              La fréquence de coupure réglementaire {"$f_c$"} est définie lorsque la valeur efficace de tension en sortie est atténuée de exactement {"$-3\\text{ dB}$"}.
              <br />
              1. Montrer que cette atténuation de Gain survient lorsque le module de la fonction de transfert complexe vaut exactement {"$|H(j\\omega)| = \\frac{1}{\\sqrt{2}}$"}.
              <br />
              2. Confirmer que cela correspond à la pulsation d'angle où {"$\\omega = \\omega_c$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Lien entre Gain en décibels (dB) et module</strong>
              <p className="mt-2 text-sm leading-relaxed">
                La définition physique industrielle décibel du gain de puissance s'écrit :
                {"$$G_{\\text{dB}} = 10 \\log_{10} \\left( |H|^2 \\right) = 20 \\log_{10} \\left( |H| \\right)$$"}.
                <br />
                Posons la valeur d'atténuation cherchée égale à -3dB :
                {"$$20 \\log_{10} \\left( |H| \\right) = -3 \\implies \\log_{10} \\left( |H| \\right) = -0.15$$"}.
                <br />
                En appliquant la fonction inverse puissance de 10 :
                {"$$|H| = 10^{-0.15} \\approx 0.7079 \\approx \\frac{1}{\\sqrt{2}} \\quad \\text{(Validé !)}$$"}
              </p>
            </>,
            <>
              <strong>Étape 2 : Résolution de l'égalité par le module rationnel</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Calculons maintenant le module analytique de la fraction complexe :
                {"$$|H(j\\omega)| = \\frac{|1|}{\\left| 1 + j\\frac{\\omega}{\\omega_c} \\right|} = \\frac{1}{\\sqrt{1^2 + \\left( \\frac{\\omega}{\\omega_c} \\right)^2}}$$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Isoler la pulsation cible</strong>
              <p className="text-sm mt-1 leading-relaxed">
                On force l'égalité entre les deux modules calculés de part et d'autre :
                {"$$\\frac{1}{\\sqrt{1 + \\left( \\frac{\\omega}{\\omega_c} \\right)^2}} = \\frac{1}{\\sqrt{2}} \\implies 1 + \\left( \\frac{\\omega}{\\omega_c} \\right)^2 = 2$$"}.
                <br />
                En soustrayant 1 :
                {"$$\\left( \\frac{\\omega}{\\omega_c} \\right)^2 = 1 \\implies \\frac{\\omega}{\\omega_c} = 1 \\implies \\omega = \\omega_c$$"} (puisque la pulsation est positive).
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-sm" id="bts3-ex2-result-eq">
                Une atténuation de -3dB se produit exactement pour une pulsation égale à ω_c (fréquence f_c).
              </div>
            </>
          ]}
        />
      </Section>

      <Section id="bts3-faq" title="Questions Fréquentes (FAQ)" color="slate" icon={<HelpCircle className="text-indigo-600 w-5 h-5"/>}>
        <AccordionFAQ id="bts3-faq-accordion" items={[
          {
            question: "Qu'est-ce que le filtre anti-repliement (anti-aliasing) et à quoi sert-il ?",
            answer: "C'est un filtre analogique passe-bas très abrupt placé juste avant le convertisseur numérique (ADC). Son rôle est d'éliminer de manière matérielle toutes les fréquences supérieures à la fréquence limite Nyquist (fe/2) contenues dans le signal d'origine avant échantillonnage complexe, bloquant l'aliasing de racine."
          },
          {
            question: "Quelle est la différence fondamentale entre traitement analogique et numérique ?",
            answer: "Le traitement de signal analogique s'effectue en temps réel continu à l'aide de composants discrets physiques (condensateurs, résistances, amplificateurs). Le traitement de signal numérique (DSP) requiert l'échantillonnage de tensions, les codes d'octets discrets et applique des algorithmes mathématiques séquentiels (comme la transformée de Fourier rapide FFT) après conversion."
          },
          {
            question: "Comment extraire facilement la valeur de la phase d'un filtre complexe ?",
            answer: "La phase totale déphasée induite par un montage se calcule en prenant l'argument de la fonction complexe de transfert H(jw). Pour un quotient de fractions comme A/B, la relation est simplement Arg(A/B) = Arg(A) - Arg(B)."
          }
        ]} />
      </Section>

      <Section id="bts3-flashcards" title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            id="bts3-fc-1"
            front={<>Quelle est la formule liant la période, fréquence, pulsation ?</>}
            back={<>Une période T se lie de cette manière complexe : <strong>{"$\\omega = 2\\pi f = \\frac{2\\pi}{T}$"}</strong>. ω est en rad/s, f est en Hertz (cycles par seconde).</>}
          />
          <Flashcard 
            id="bts3-fc-2"
            front={<>Pour un son de fréquence maximale 20 kHz, quelle est la fréquence théorique de Shannon Nyquist minimale ?</>}
            back={<>La fréquence fe minimale requise est précisément le double : <strong>40 kHz</strong>. C'est pourquoi le format CD audio est historiquement normalisé à 44.1 kHz.</>}
          />
        </div>
      </Section>

      <Section id="bts3-quiz" title="Quiz de Validation" color="indigo" icon="🎯">
        <Quiz 
          id="bts3-quiz-comp"
          questions={[
            {
              question: "Quelle valeur efficace RMS mesure-t-on pour de la tension alternative sinusoïdale domestique de 325V crête ?",
              options: ["230 V", "325 V", "162.5 V"],
              correctAnswer: 0,
              explanation: "Tension efficace classique : 325V / sqrt(2) ≈ 230 V. C'est la tension nominale disponible aux prises du secteur en Europe."
            },
            {
              question: "Si le gain en décibels d'un montage amplificateur est égal à exactly +20 dB, de quel facteur le signal de tension a-t-il été amplifié ?",
              options: ["Facteur 10", "Facteur 20", "Facteur 100"],
              correctAnswer: 0,
              explanation: "Rappel : G(dB) = 20 * log10(Vs/Ve). Ainsi, Vs/Ve = 10^(20/20) = 10^1 = 10. Le signal a donc décuplé en tension !"
            },
            {
              question: "Laquelle de ces pulsations d'horloge fe provoque un dédoublement parasite d'aliasing sur un signal d'émetteur de 100 MHz ?",
              options: ["fe = 150 MHz (insatisfaisant)", "fe = 250 MHz", "fe = 400 MHz"],
              correctAnswer: 0,
              explanation: "Le critère de Shannon Nyquist requiert fe > 2 * fmax = 200 MHz. échantillonner à 150 MHz va inévitablement corrompre le spectre par aliasing."
            }
          ]}
        />
      </Section>

      <div onClick={() => validateCourse(courseId)} id="checklist-trigger">
        <InteractiveChecklist id="bts3-checklist" items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_BTS_03_Traitement_Signal;
