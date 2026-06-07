import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Play, RotateCcw, HelpCircle, TrendingUp, Sparkles } from 'lucide-react';

const Course_CPGE_BL_Proba: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator States
  const [p, setP] = useState<number>(0.4);
  const [simResults, setSimResults] = useState<number[]>([]);
  const [currentSimAttempt, setCurrentSimAttempt] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simMessage, setSimMessage] = useState<string>("Prêt pour la simulation.");

  // Run a single simulation step-by-step
  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentSimAttempt([]);
    setSimMessage("Lancement de l'épreuve de Bernoulli répétée...");
    
    let attempts: number[] = []; // 0 for failure, 1 for success
    let stepCount = 0;
    
    const interval = setInterval(() => {
      const isSuccess = Math.random() < p;
      stepCount++;
      if (isSuccess) {
        attempts.push(1);
        setCurrentSimAttempt([...attempts]);
        setSimMessage(`Succès au lancer #${stepCount} ! Variable géométrique X = ${stepCount}.`);
        setSimResults(prev => [stepCount, ...prev]);
        setIsRunning(false);
        clearInterval(interval);
      } else {
        attempts.push(0);
        setCurrentSimAttempt([...attempts]);
        setSimMessage(`Lancer #${stepCount} : Échec. On continue...`);
        if (stepCount >= 20) {
          setSimMessage("Arrêt de sécurité après 20 lancers infructueux !");
          setSimResults(prev => [20, ...prev]);
          setIsRunning(false);
          clearInterval(interval);
        }
      }
    }, 250);
  };

  const resetSimulation = () => {
    setSimResults([]);
    setCurrentSimAttempt([]);
    setSimMessage("Prêt pour la simulation.");
    setIsRunning(false);
  };

  // Compute stats
  const simCount = simResults.length;
  const simAverage = simCount > 0 ? (simResults.reduce((a, b) => a + b, 0) / simCount).toFixed(2) : "0.00";
  const theoreticalAverage = (1 / p).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-CPGE-BL"
        title="CPGE B/L : Probabilités Infinitésimales"
        subtitle="Séries aléatoires, variables discrètes infinies, lois usuelles et applications aux modèles économiques d'utilité."
        duration="1h 45"
        level="CPGE Hypokhâgne / Khâgne B/L"
        prerequisites={["Séries numériques simples", "Variables aléatoires finies", "Calcul de limites"]}
        objectives={[
          "Comprendre le passage de l'univers fini à l'univers dénombrable infini (fondation de Kolmogorov).",
          "Calculer des somme de séries pour des espérances et variances de variables infinies.",
          "Maîtriser les propriétés fondamentales des lois de Poisson et Géométriques.",
          "Appliquer les probabilités aux problématiques économiques d'actualisation et de choix stratégiques."
        ]}
      />

      <Section title="🎯 Introduction aux Probabilités sur un Univers Infini" icon="🎒" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En CPGE B/L, l'analyse et les probabilités se croisent pour étudier des phénomènes où le nombre de résultats possibles n'est plus fini, mais <strong>dénombrable</strong> (en bijection avec l'ensemble des entiers naturels <MathComponent math="\mathbb{N}" />). C'est le cadre parfait pour modéliser des temps d'attente théoriques illimités (comme l'apparition d'un krach boursier) ou des processus de guichets de service.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Pour manipuler ces probabilités, nous combinons les techniques d'intégration et surtout de <strong>séries numériques convergentes</strong>. Rien ne se perd au passage à la limite, à condition que la somme des probabilités de tous les événements élémentaires reste unitaire.
        </p>

        <InfoBlock type="definition" title="Espace probabilisé dénombrable">
          Soit <MathComponent math="\Omega = \{x_n, n \in \mathbb{N}\}" /> un univers dénombrable. 
          Une famille de réels <MathComponent math="(p_n)_{n \in \mathbb{N}}" /> définit une loi de probabilité sur <MathComponent math="\Omega" /> si et seulement si :
          <MathComponent block math="\forall n \in \mathbb{N}, \ p_n \ge 0 \quad \text{et} \quad \sum_{n=0}^{+\infty} p_n = 1" />
          La probabilité d'un événement quelconque <MathComponent math="A \subset \Omega" /> est alors :
          <MathComponent block math="P(A) = \sum_{x_n \in A} P(\{x_n\})" />
        </InfoBlock>

        <TipBanner type="info" title="Zoom sur le théorème de la somme unitaire">
          Pour valider qu'une suite de réels forme une loi de probabilité sur des valeurs entières, on cherche systématiquement à calculer la somme totale de la série. Si cette série diverge ou si sa somme est différente de 1, alors l'univers ou la mesure est mal formulé.
        </TipBanner>
      </Section>

      <Section title="📊 Espérance, Théorème de Transfert et Variance" icon="⚖️" color="emerald">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Puisque l'univers est infini, l'espérance <MathComponent math="E(X)" /> d'une variable aléatoire réelle devient la somme d'une série numérique infinie. Elle n'existe que si la série sous-jacente est <strong>absolument convergente</strong>, garantissant que l'ordre des termes n'altère pas le résultat (Théorème de Dirichlet).
        </p>

        <FormulaBox 
          title="Espérance d'une Variable Aléatoire Discrète Infinie" 
          math="E(X) = \sum_{n=0}^{+\infty} x_n P(X = x_n)" 
        />

        <InfoBlock type="warning" title="Condition de convergence absolue">
          Si la série ne converge pas absolument, la variable <MathComponent math="X" /> n'admet pas d'espérance réelle. C'est le cas par exemple du <strong>Paradoxe de Saint-Pétersbourg</strong>, où l'espérance est de la forme :
          <MathComponent block math="\sum_{k=1}^{+\infty} 2^k \times \frac{1}{2^k} = 1 + 1 + 1 + \dots = +\infty" />
          Ici, bien que le jeu soit parfait, aucun agent économique réel ne peut miser une fortune infinie pour y participer.
        </InfoBlock>

        <h3 className="text-xl font-bold mt-8 mb-3 text-emerald-950 dark:text-emerald-300">Théorème de Transfert</h3>
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Si <MathComponent math="g" /> est une fonction réelle définie sur les valeurs de <MathComponent math="X" />, l'espérance de <MathComponent math="g(X)" /> est définie par :
          <MathComponent block math="E(g(X)) = \sum_{n=0}^{+\infty} g(x_n) P(X = x_n)" />
          sous réserve de convergence absolue de la série <MathComponent math="\sum |g(x_n)| P(X = x_n)" />.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-emerald-950 dark:text-emerald-300">Variance et Écart-Type</h3>
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La variance mesure la dispersion des valeurs autour de l'espérance. Par la formule de König-Huygens, on la calcule souvent par :
          <MathComponent block math="V(X) = E(X^2) - [E(X)]^2" />
          Sous condition que <MathComponent math="X" /> admette un moment d'ordre 2, c'est-à-dire que la série pour <MathComponent math="E(X^2)" /> converge absolument.
        </p>
      </Section>

      <Section title="📈 Lois Usuelles : Loi Géométrique & Loi de Poisson" icon="💰" color="amber">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-amber-950 dark:text-amber-300 mb-2">1. La Loi Géométrique {"$\\mathcal{G}(p)$"}</h3>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
              Elle modélise le temps d'attente du premier succès lors d'un schéma d'épreuves de Bernoulli indépendantes de probabilité de succès <MathComponent math="p \in ]0, 1[" />.
            </p>
            
            <FormulaBox 
              title="Formule de la Loi Géométrique" 
              math="P(X = k) = p(1-p)^{k-1} \quad (k \in \mathbb{N}^*)" 
            />

            <p className="my-4 text-base text-slate-700 dark:text-slate-300">
              L'espérance de la loi géométrique vaut <MathComponent math="E(X) = \frac{1}{p}" /> et sa variance vaut <MathComponent math="V(X) = \frac{1-p}{p^2}" />.
            </p>

            <InfoBlock type="reminder" title="Absence de mémoire (Memorylessness)">
              La loi géométrique est l'unique loi de probabilité discrète sur {"$\\mathbb{N}^*$"} à être sans mémoire :
              <MathComponent block math="\forall (n, k) \in \mathbb{N}^2, \ P(X > n+k \mid X > n) = P(X > k)" />
              C'est-à-dire que l'attente passée n'influence en aucun cas la probabilité d'un succès futur immédiat.
            </InfoBlock>
          </div>

          <div className="border-t border-amber-200/50 pt-6">
            <h3 className="text-2xl font-bold text-amber-950 dark:text-amber-300 mb-2">2. La Loi de Poisson {"$\\mathcal{P}(\\lambda)$"}</h3>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
              Aussi appelée "loi des événements rares", elle est extrêmement utilisée pour modéliser le nombre d'occurrences d'un événement sur un intervalle de temps donné (appels téléphoniques, transactions financières, arrivées de clients).
            </p>
            
            <FormulaBox 
              title="Formule de la Loi de Poisson (paramètre \\lambda > 0)" 
              math="P(X = k) = e^{-\\lambda} \frac{\\lambda^k}{k!} \quad (k \in \mathbb{N})" 
            />

            <p className="my-4 text-base text-slate-700 dark:text-slate-300">
              Son espérance vaut <MathComponent math="E(X) = \lambda" /> et sa variance vaut également <MathComponent math="V(X) = \lambda" />.
            </p>

            <InfoBlock type="funfact" title="Convergence de la loi binomiale">
              La loi de Poisson est la limite de la loi binomiale {"$\\mathcal{B}(n, p)$"} quand {"$n \\to +\\infty$"} et {"$p \\to 0$"} de telle sorte que le produit {"$np \\to \\lambda$"}. C'est une approximation robuste dès que {"$n \\ge 30$"} et {"$p \\le 0.1$"}.
            </InfoBlock>
          </div>
        </div>
      </Section>

      <Section title="🕹️ Simulateur Tactique d'Épreuves Géométriques" icon="🎲" color="purple">
        <p className="mb-6 text-base text-slate-700 dark:text-slate-300">
          Modifiez la probabilité de succès d'un unique essai <MathComponent math="p" /> à l'aide du curseur ci-dessous. Visualisez la distribution théorique du nombre d'essais requis <MathComponent math="X = k" />, puis lancez une simulation interactive pas-à-pas pour voir comment la variable aléatoire converge expérimentalement !
        </p>

        <div className="bg-slate-50 dark:bg-slate-900 border rounded-3xl p-6 md:p-8 space-y-8 shadow-inner">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Probabilité de succès immédiat p = {p.toFixed(2)}
              </label>
              <input 
                type="range" 
                min="0.05" 
                max="0.95" 
                step="0.05"
                value={p}
                onChange={(e) => {
                  setP(parseFloat(e.target.value));
                  resetSimulation();
                }}
                className="w-full h-2 bg-indigo-200 dark:bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2">
                <span>p = 0.05 (Rare)</span>
                <span>p = 0.50</span>
                <span>p = 0.95 (Fréquent)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-indigo-600/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Play size={18} /> Lancer le dé (Simulation)
              </button>
              <button
                onClick={resetSimulation}
                className="p-3.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-all"
                title="Réinitialiser"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* SVG Theoretical Bar Chart vs Experimental Roll dots */}
          <div className="bg-card border border-border-strong/50 rounded-2xl p-6">
            <h4 className="font-bold text-indigo-950 dark:text-indigo-200 mb-4 flex items-center justify-between">
              <span>Graphique : Loi de probabilité théorique P(X = k)</span>
              <span className="text-xs py-1 px-2.5 bg-indigo-50 dark:bg-indigo-950 border border-indigo-150 text-indigo-700 rounded-md">Pour k de 1 à 8</span>
            </h4>
            
            <div className="w-full overflow-hidden">
              <svg viewBox="0 0 500 180" className="w-full h-auto">
                {/* Axes */}
                <line x1="40" y1="140" x2="480" y2="140" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="140" stroke="#94a3b8" strokeWidth="2" />
                
                {/* Render bars */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const k = i + 1;
                  const prob = p * Math.pow(1 - p, k - 1);
                  const barHeight = prob * 110; 
                  const x = 50 + i * 52;
                  const y = 140 - barHeight;

                  return (
                    <g key={k} className="group cursor-pointer">
                      <rect 
                        x={x} 
                        y={y} 
                        width="34" 
                        height={barHeight} 
                        fill="#6366f1" 
                        rx="4"
                        className="transition-all duration-300 hover:fill-amber-500" 
                      />
                      <text x={x + 17} y="156" textAnchor="middle" className="fill-slate-500 font-mono text-xs font-bold">{k}</text>
                      <text x={x + 17} y={y - 6} textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 font-mono text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{(prob * 100).toFixed(1)}%</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-center font-mono text-xs text-slate-400 mt-2">Axe horizontal : Nombre de lancers k avant le premier succès. Survoler pour afficher le taux exact.</p>
          </div>

          {/* Real-time Tossing Simulation Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-card border rounded-2xl md:col-span-2">
              <h5 className="font-bold text-sm tracking-wider uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-500 animate-pulse" /> Essai en cours (Lancers successifs)
              </h5>
              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-sm leading-relaxed mb-4 min-h-[50px] shadow-inner">
                {simMessage}
              </div>
              <div className="flex flex-wrap gap-2">
                {currentSimAttempt.map((val, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-transform duration-300 scale-105 ${val === 1 ? 'bg-emerald-500 text-white animate-bounce' : 'bg-rose-500 text-white'}`}
                  >
                    #{idx + 1}: {val === 1 ? "SUCCÈS 🟢" : "ÉCHEC 🔴"}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 bg-card border rounded-2xl flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-sm tracking-wider uppercase text-slate-400 mb-3 block">
                  📈 Statistiques locales
                </h5>
                <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-300 text-sm">
                  <li className="flex justify-between border-b pb-1">
                    <span>Simulations effectuées :</span>
                    <strong className="text-foreground">{simCount}</strong>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span>Espérance théorique (1/p) :</span>
                    <strong className="text-indigo-600">{theoreticalAverage}</strong>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span>Moyenne observée :</span>
                    <strong className="text-emerald-600">{simAverage}</strong>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 leading-normal mt-3">
                Par la Loi Forte des Grands Nombres, la moyenne observée tend vers l'espérance mathématique {theoreticalAverage} lorsque le nombre de lancers d'un dé virtuel ou pièce biaisée grandit.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🛠️ Exercices Résolus de Khâgne" icon="📝" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Calcul de l'espérance par séries dérivées"
          question={<p>Soit <MathComponent math="X" /> une variable aléatoire suivant une loi géométrique de paramètre <MathComponent math="p \in ]0, 1[" />. Démontrer rigoureusement que <MathComponent math="E(X) = \frac{1}{p}" /> en n'utilisant que des techniques de dérivation formelle sur les séries géométriques.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser l'égalité de base par définition</p>
              <p className="mt-2 text-sm leading-relaxed">
                Par définition, l'espérance mathématique est donnée par la somme :
                <MathComponent block math="E(X) = \sum_{k=1}^{+\infty} k P(X = k) = \sum_{k=1}^{+\infty} k \cdot p(1-p)^{k-1}" />
                On peut sortir la constante réelle <MathComponent math="p" /> de la somme, car elle ne dépend pas de l'index sommatoire :
                <MathComponent block math="E(X) = p \sum_{k=1}^{+\infty} k (1-p)^{k-1}" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Recourir à la dérivation terme à terme</p>
              <p className="mt-2 text-sm leading-relaxed">
                Pour tout réel <MathComponent math="q \in ]0, 1[" />, on sait que la somme de la série géométrique simple classique est :
                <MathComponent block math="\sum_{k=0}^{+\infty} q^k = \frac{1}{1-q}" />
                Sur l'intervalle ouvert <MathComponent math="]0, 1[" />, la fonction <MathComponent math="q \mapsto \sum_{k=0}^{+\infty} q^k" /> est infiniment dérivable et on peut dériver terme à terme. En dérivant de chaque côté par rapport à <MathComponent math="q" />, on obtient :
                <MathComponent block math="\sum_{k=1}^{+\infty} k q^{k-1} = \frac{d}{dq}\left(\frac{1}{1-q}\right) = \frac{1}{(1-q)^2}" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Substitution finale avec q = 1 - p</p>
              <p className="mt-2 text-sm leading-relaxed">
                Posons maintenant <MathComponent math="q = 1-p" />. Comme <MathComponent math="p \in ]0, 1[" />, on a bien <MathComponent math="q \in ]0, 1[" />. Remplaçons dans notre calcul d'espérance :
                <MathComponent block math="E(X) = p \sum_{k=1}^{+\infty} k q^{k-1} = p \times \frac{1}{(1-q)^2} = p \times \frac{1}{(1-(1-p))^2}" />
                Puisque <MathComponent math="1 - (1 - p) = p" />, l'équation se simplifie par :
                <MathComponent block math="E(X) = p \times \frac{1}{p^2} = \frac{1}{p}" />
                La série converge absolument et l'espérance est bien rigoureusement égale à <MathComponent math="1/p" />. CQFD.
              </p>
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Calcul de l'espérance d'une loi de Poisson"
          question={<p>Soit <MathComponent math="Y" /> une variable aléatoire suivant une loi de Poisson <MathComponent math="\mathcal{P}(\lambda)" /> de paramètre <MathComponent math="\lambda > 0" />. Démontrer que <MathComponent math="E(Y) = \lambda" /> par calcul algébrique direct.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Formuler le terme à calculer</p>
              <p className="mt-2 text-sm leading-relaxed">
                Par définition de l'espérance d'une variable discrète sur <MathComponent math="\mathbb{N}" /> :
                <MathComponent block math="E(Y) = \sum_{k=0}^{+\infty} k \cdot P(Y = k) = \sum_{k=0}^{+\infty} k \cdot e^{-\lambda} \frac{\lambda^k}{k!}" />
                Pour <MathComponent math="k = 0" />, le terme d'indice vaut 0, on peut donc démarrer la somme à <MathComponent math="k = 1" /> :
                <MathComponent block math="E(Y) = \sum_{k=1}^{+\infty} k \cdot e^{-\lambda} \frac{\lambda^k}{k!}" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Simplification factorielle et factorisation</p>
              <p className="mt-2 text-sm leading-relaxed">
                On remarque que pour <MathComponent math="k \ge 1" />, on peut simplifier par <MathComponent math="k" /> le quotient <MathComponent math="\frac{k}{k!}" />, ce qui donne <MathComponent math="\frac{1}{(k-1)!}" />. On factorise par <MathComponent math="\lambda" /> et par <MathComponent math="e^{-\lambda}" /> :
                <MathComponent block math="E(Y) = e^{-\lambda} \sum_{k=1}^{+\infty} \frac{\lambda^k}{(k-1)!} = e^{-\lambda} \cdot \lambda \sum_{k=1}^{+\infty} \frac{\lambda^{k-1}}{(k-1)!}" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Changement d'indice et série exponentielle</p>
              <p className="mt-2 text-sm leading-relaxed">
                Effectuons le changement d'indice de sommation <MathComponent math="j = k-1" />. Quand <MathComponent math="k" /> varie de 1 à <MathComponent math="+\infty" />, <MathComponent math="j" /> varie de 0 à <MathComponent math="+\infty" />.
                <MathComponent block math="E(Y) = \lambda e^{-\lambda} \sum_{j=0}^{+\infty} \frac{\lambda^j}{j!}" />
                On reconnaît la somme de la série exponentielle de base qui converge vers <MathComponent math="e^\lambda" /> :
                <MathComponent block math="E(Y) = \lambda e^{-\lambda} \cdot e^{\lambda} = \lambda e^0 = \lambda" />
                L'espérance d'une loi de Poisson est donc exactement égale à son paramètre de taux <MathComponent math="\lambda" />.
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🗃️ Flashcards de Révision Rapide" icon="🧠" color="amber">
        <p className="mb-6 text-base text-slate-700 dark:text-slate-300">
          Cliquez sur les cartes pour retourner et tester vos connaissances sur les théorèmes à restituer obligatoirement lors des examens.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Quelle condition stricte faut-il vérifier pour s'assurer de l'existence de l'espérance ?"
            back="La série définissant l'espérance doit absolument converger : la somme des valeurs absolues |x_k|*P(X=x_k) doit être finie."
          />
          <Flashcard 
            front="Quelle loi de probabilité n'a pas de mémoire (sans vieillissement) ? Donnez sa formule."
            back="La loi géométrique. P(X=k) = p(1-p)^{k-1} pour k ≥ 1."
          />
          <Flashcard 
            front="Quelle est la variance de la Loi de Poisson de paramètre λ ?"
            back="La variance d'une loi de Poisson de paramètre λ est exactement égale à son paramètre λ (V(X) = λ)."
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'espérance s'appelle-t-elle ainsi et peut-elle être négative ?",
              answer: "L'espérance représente la moyenne pondérée à long terme d'un processus répétitif. Elle peut être négative (par exemple dans un jeu d'argent défavorable). Elle s'interprète comme l'argent moyen que l'on espère recevoir."
            },
            {
              question: "Quelle est la différence fondamentale entre un univers fini et un univers dénombrable ?",
              answer: "Un univers fini contient un nombre fixé N d'éléments. Un univers dénombrable est infini mais ses éléments peuvent être numérotés un à un (comme l'ensemble des entiers naturels). Cela nécessite l'utilisation des intégrales de Riemann ou des séries d'analyse."
            },
            {
              question: "Que se passe-t-il si un processus économique a un taux d'actualisation de loi géométrique ?",
              answer: "Cela modélise la dépréciation du futur. Plus un événement bénéfique recule dans le temps, plus sa valeur présente calculée est amoindrie exponentiellement."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'Évaluation Finale" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle condition sur une série de probabilités définit une loi discrète complète ?",
              options: [
                "La somme des termes de la série doit converger vers 0",
                "Leur somme de 0 à l'infini doit valoir 1 et chaque terme doit être positif ou nul",
                "Leurs termes doivent alterner de signe pour compenser l'erreur"
              ],
              correctAnswer: 1,
              explanation: "Pour former un espace probabilisé complet d'un univers dénombrable, la somme totale de tous les états mutuellement exclusifs doit valoir exactement 1 unitaire."
            },
            {
              question: "Si X suit une loi géométrique de paramètre p = 0.25, que vaut son espérance ?",
              options: [
                "4",
                "0.25",
                "1.33"
              ],
              correctAnswer: 0,
              explanation: "L'espérance d'une loi géométrique vaut 1/p. Avec p = 0.25 = 1/4, 1/p vaut 4."
            },
            {
              question: "Pour une loi de Poisson de paramètre λ = 3. Comment formule-t-on P(Y = 0) ?",
              options: [
                "1",
                "e^{-3}",
                "3 * e^{-3}"
              ],
              correctAnswer: 1,
              explanation: "D'après la formule de la loi de Poisson : pour k = 0, P(Y = 0) = e^{-3} * 3^0 / 0! = e^{-3} * 1 / 1 = e^{-3}."
            },
            {
              question: "Quel théorème permet de calculer directement l'espérance de la fonction g(X) d'une VA ?",
              options: [
                "Le théorème central limite",
                "Le théorème de transfert",
                "Le théorème de d'Alembert"
              ],
              correctAnswer: 1,
              explanation: "Le théorème de transfert permet de calculer l'espérance d'une composée g(X) sans avoir à déterminer au préalable la loi de la nouvelle variable g(X)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais définir un univers dénombrable et l'axiomatisation de Kolmogorov.",
            "Je connais la formule de l'espérance et la nécessité de convergence absolue.",
            "Je maîtrise la formule, l'espérance (1/p) et l'absence de mémoire de la loi géométrique.",
            "Je sais calculer l'espérance d'une loi de Poisson de taux λ par dérivation / factorisation géométrique."
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

export default Course_CPGE_BL_Proba;
