import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, 
  Quiz, Flashcard, InteractiveExercise, FormulaBox, BentoGrid, BentoCard
} from '../../components/SharedUI';
import { Sliders, Zap, ArrowRight, Play, Award, RotateCcw, Brain } from 'lucide-react';

const BackpropVisualizer: React.FC = () => {
  // Simple network parameters:
  // x (input) -> w1 -> h (hidden) -> w2 -> y (output)
  // Loss: E = 0.5 * (y - target)^2
  const [x, setX] = useState<number>(1.0);
  const [target, setTarget] = useState<number>(0.5);
  const [w1, setW1] = useState<number>(0.8);
  const [b1, setB1] = useState<number>(0.1);
  const [w2, setW2] = useState<number>(-0.4);
  const [b2, setB2] = useState<number>(-0.2);
  const [lr, setLr] = useState<number>(1.0); // Learning rate

  const [step, setStep] = useState<'idle' | 'forwarded' | 'propagated'>('idle');

  // Sigmoid activation function
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  // Sigmoid derivative: s * (1 - s)
  const sigmoidDeriv = (s: number) => s * (1 - s);

  // Computations
  const forwardPass = useMemo(() => {
    const net1 = w1 * x + b1;
    const h = sigmoid(net1);
    const net2 = w2 * h + b2;
    const y = sigmoid(net2);
    const loss = 0.5 * Math.pow(y - target, 2);
    return { net1, h, net2, y, loss };
  }, [x, w1, b1, w2, b2, target]);

  const backpropPass = useMemo(() => {
    const { h, y } = forwardPass;
    // dE/dy = y - target
    const dE_dy = y - target;
    // dy/dnet2 = s'(net2) = y * (1 - y)
    const dy_dnet2 = sigmoidDeriv(y);
    // dE/dnet2 (delta_output) = dE/dy * dy/dnet2
    const delta_out = dE_dy * dy_dnet2;

    // dE/dw2 = delta_out * h
    const dE_dw2 = delta_out * h;
    // dE/db2 = delta_out
    const dE_db2 = delta_out;

    // Backward to hidden layer
    // dE/dh = delta_out * w2
    const dE_dh = delta_out * w2;
    // dh/dnet1 = h * (1 - h)
    const dh_dnet1 = sigmoidDeriv(h);
    // dE/dnet1 (delta_hidden) = dE/dh * dh/dnet1
    const delta_hid = dE_dh * dh_dnet1;

    // dE/dw1 = delta_hid * x
    const dE_dw1 = delta_hid * x;
    // dE/db1 = delta_hid
    const dE_db1 = delta_hid;

    return {
      dE_dy,
      dy_dnet2,
      delta_out,
      dE_dw2,
      dE_db2,
      dE_dh,
      dh_dnet1,
      delta_hid,
      dE_dw1,
      dE_db1
    };
  }, [forwardPass, x, w2, target]);

  const handleStepForward = () => {
    setStep('forwarded');
  };

  const handleBackward = () => {
    setStep('propagated');
  };

  const handleUpdate = () => {
    const { dE_dw1, dE_db1, dE_dw2, dE_db2 } = backpropPass;
    setW1(prev => prev - lr * dE_dw1);
    setB1(prev => prev - lr * dE_db1);
    setW2(prev => prev - lr * dE_dw2);
    setB2(prev => prev - lr * dE_db2);
    setStep('idle');
  };

  const handleReset = () => {
    setW1(0.8);
    setB1(0.1);
    setW2(-0.4);
    setB2(-0.2);
    setStep('idle');
  };

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Brain className="text-indigo-600 animate-pulse" size={22} />
        Simulateur Interactif de Rétropropagation (Chain Rule)
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Faites tourner à la main les engrenages différentiels d'un neurone artificiel. Observez la descente de gradient et la propagation des corrections via les dérivées partielles.
      </p>

      {/* Inputs block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <label className="flex flex-col bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-150 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">Entrée ({"$x$"})</span>
          <input 
            type="number" 
            step="0.1"
            value={x} 
            onChange={(e) => { setX(Number(e.target.value)); setStep('idle'); }}
            className="font-mono font-bold text-sm bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="flex flex-col bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-150 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">Cible ({"$y_{cible}$"})</span>
          <input 
            type="number" 
            step="0.05"
            min="0.01"
            max="0.99"
            value={target} 
            onChange={(e) => { setTarget(Number(e.target.value)); setStep('idle'); }}
            className="font-mono font-bold text-sm bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-100"
          />
        </label>
        <div className="flex flex-col bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-150 dark:border-slate-800 col-span-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex justify-between">
            <span>Taux de gradient ({"$\\eta$"}) :</span>
            <span className="font-mono text-indigo-600 font-bold">{lr}</span>
          </span>
          <input 
            type="range" 
            min="0.1" 
            max="3" 
            step="0.1"
            value={lr} 
            onChange={(e) => setLr(Number(e.target.value))}
            className="w-full mt-2 cursor-col-resize accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-700 rounded appearance-none"
          />
        </div>
      </div>

      {/* Main interactive canvas area */}
      <div className="bg-slate-950 rounded-2xl p-6 relative shadow-inner overflow-x-auto">
        <div className="min-w-[600px] flex items-center justify-between py-6">
          {/* Input Layer */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center font-mono font-bold text-slate-300 shadow">
              {x.toFixed(1)}
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Input x</span>
          </div>

          <div className="flex-1 px-4 relative flex flex-col items-center">
            {/* Arrow with Weight */}
            <div className="text-white text-[10px] font-mono bg-indigo-950/80 px-2 py-1 rounded border border-indigo-800 mb-1 z-10">
              w₁ = {w1.toFixed(3)}
            </div>
            <div className="w-full border-t border-slate-800 pointer-events-none absolute top-1/2 -translate-y-1/2" />
            <ArrowRight className="text-slate-700 self-end -mr-1" size={16} />
            {step === 'propagated' && (
              <span className="text-[9px] font-mono text-pink-400 animate-pulse mt-1">
                𝜕E/𝜕w₁ = {backpropPass.dE_dw1.toFixed(3)}
              </span>
            )}
          </div>

          {/* Hidden Layer */}
          <div className="flex flex-col items-center gap-1">
            <div className={`w-20 h-20 rounded-full border-2 transition-all flex flex-col items-center justify-center font-mono shadow ${
              step !== 'idle' ? 'bg-indigo-950/40 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}>
              <span className="text-[8px] opacity-60">Net₁ = {(w1*x + b1).toFixed(2)}</span>
              <span className="text-sm font-bold">{step !== 'idle' ? forwardPass.h.toFixed(3) : '?'}</span>
              <span className="text-[8px] text-pink-400 bg-pink-950/20 px-1 rounded">b₁={b1.toFixed(2)}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Hidden h</span>
            {step === 'propagated' && (
              <span className="text-[9px] font-mono text-pink-400 animate-pulse mt-1">
                𝜕E/𝜕b₁ = {backpropPass.dE_db1.toFixed(3)}
              </span>
            )}
          </div>

          <div className="flex-1 px-4 relative flex flex-col items-center">
            {/* Arrow with Weight */}
            <div className="text-white text-[10px] font-mono bg-indigo-950/80 px-2 py-1 rounded border border-indigo-800 mb-1 z-10">
              w₂ = {w2.toFixed(3)}
            </div>
            <div className="w-full border-t border-slate-800 pointer-events-none absolute top-1/2 -translate-y-1/2" />
            <ArrowRight className="text-slate-700 self-end -mr-1" size={16} />
            {step === 'propagated' && (
              <span className="text-[9px] font-mono text-pink-400 animate-pulse mt-1">
                𝜕E/𝜕w₂ = {backpropPass.dE_dw2.toFixed(3)}
              </span>
            )}
          </div>

          {/* Output Layer */}
          <div className="flex flex-col items-center gap-1">
            <div className={`w-20 h-20 rounded-full border-2 transition-all flex flex-col items-center justify-center font-mono shadow ${
              step !== 'idle' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}>
              <span className="text-[8px] opacity-60">Net₂ = {(w2*forwardPass.h + b2).toFixed(2)}</span>
              <span className="text-sm font-bold">{step !== 'idle' ? forwardPass.y.toFixed(3) : '?'}</span>
              <span className="text-[8px] text-pink-400 bg-pink-950/20 px-1 rounded">b₂={b2.toFixed(2)}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Output y</span>
            {step === 'propagated' && (
              <span className="text-[9px] font-mono text-pink-400 animate-pulse mt-1">
                𝜕E/𝜕b₂ = {backpropPass.dE_db2.toFixed(3)}
              </span>
            )}
          </div>
        </div>

        {/* Global Error Display */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-slate-800 rounded-lg text-xs font-mono">
          <span className="text-indigo-400 uppercase tracking-wider text-[9px] font-bold block mb-0.5">Calcul de l'erreur MSE</span>
          Loss = <strong className="text-rose-400">{step !== 'idle' ? forwardPass.loss.toFixed(5) : '?'}</strong>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {step === 'idle' && (
          <button 
            onClick={handleStepForward}
            className="flex items-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all shadow shadow-indigo-600/20 cursor-pointer hover:-translate-y-0.5"
          >
            <Play size={14} /> 1. Propager l'Entrée (Forward Pass)
          </button>
        )}

        {step === 'forwarded' && (
          <button 
            onClick={handleBackward}
            className="flex items-center gap-2 py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-xs transition-all shadow shadow-pink-600/20 cursor-pointer hover:-translate-y-0.5"
          >
            <RotateCcw className="rotate-180" size={14} /> 2. Calculer les Gradients (Backpropagation)
          </button>
        )}

        {step === 'propagated' && (
          <button 
            onClick={handleUpdate}
            className="flex items-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all shadow shadow-emerald-600/20 cursor-pointer hover:-translate-y-0.5"
          >
            <Award size={14} /> 3. Mettre à Jour les Poids (Gradient Descent)
          </button>
        )}

        <button 
          onClick={handleReset}
          className="flex items-center gap-2 py-3 px-4 bg-slate-200 hover:bg-slate-350 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all cursor-pointer"
        >
          <RotateCcw size={12} /> Réinitialiser
        </button>
      </div>

      {/* Mathematical Breakdown overlay */}
      {step === 'propagated' && (
        <div className="mt-6 p-4 rounded-xl bg-pink-50/50 dark:bg-pink-950/15 border border-pink-100 dark:border-pink-900 text-xs text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
          <p className="font-bold text-pink-900 dark:text-pink-300">🔍 Détail Mathématique des Dérivations Partielles (Chain Rule) :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
            <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-pink-100 dark:border-pink-950">
              <span className="text-pink-600 font-bold">1. Gradient de la couche de sortie :</span>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>{"$\\frac{\\partial E}{\\partial y} = y - y_{cible} = $"} {(forwardPass.y - target).toFixed(3)}</li>
                <li>{"$\\frac{\\partial y}{\\partial net_2} = y(1-y) = $"} {sigmoidDeriv(forwardPass.y).toFixed(3)}</li>
                <li>{"$\\delta_{out} = \\frac{\\partial E}{\\partial net_2} = \\frac{\\partial E}{\\partial y} \\cdot \\frac{\\partial y}{\\partial net_2} = $"} {backpropPass.delta_out.toFixed(3)}</li>
                <li>{"$\\frac{\\partial E}{\\partial w_2} = \\delta_{out} \\cdot h = $"} {backpropPass.dE_dw2.toFixed(3)}</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-pink-100 dark:border-pink-955">
              <span className="text-pink-600 font-bold">2. Gradient de la couche cachée :</span>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>{"$\\frac{\\partial E}{\\partial h} = \\delta_{out} \\cdot w_2 = $"} {backpropPass.dE_dh.toFixed(3)}</li>
                <li>{"$\\frac{\\partial h}{\\partial net_1} = h(1-h) = $"} {sigmoidDeriv(forwardPass.h).toFixed(3)}</li>
                <li>{"$\\delta_{hid} = \\delta_{out} \\cdot w_2 \\cdot h(1-h) = $"} {backpropPass.delta_hid.toFixed(3)}</li>
                <li>{"$\\frac{\\partial E}{\\partial w_1} = \\delta_{hid} \\cdot x = $"} {backpropPass.dE_dw1.toFixed(3)}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Course_Post_Bac_Ingenieur_Deep_Learning: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-DL"
        title="Fondements Mathématiques du Deep Learning & Rétropropagation"
        subtitle="Réseaux de neurones artificiels, décomposition différentielle de l'erreur, règle de la chaîne (chain rule) et gradients stochastiques."
        duration="1h 20"
      />

      <InfoBlock type="info" title="L'analogie du gradient dans le brouillard">
        Imaginez que vous êtes perdu au sommet d'une montagne enveloppée d'un épais brouillard. Pour redescendre dans la vallée (trouver le minimum global de l'erreur), la seule information sensorielle dont vous disposez est l'inclinaison de la pente sous vos pieds. En marchant toujours dans le sens de la plus grande descente (la direction opposée au vecteur gradient), vous finirez par atteindre la plaine. C'est précisément ainsi qu'apprennent les intelligences artificielles !
      </InfoBlock>

      <Section title="1. Structure Matricielle d'un Neurone Artificiel" icon="⚡" color="indigo">
        <p className="mb-4">
          Un modèle d'apprentissage profond est une composition gigantesque de fonctions non-linéaires paramétrées. Pour un neurone unique, le processus de transformation se divise en deux étapes successives :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BentoCard title="1. Somme Pondérée Linéaire" icon={<Sliders className="text-indigo-650" size={18} />} color="indigo">
            L'entrée du neurone {"$z$"} est calculée en effectuant le produit scalaire des entrées {"$\\mathbf{X}$"} et des poids synaptiques {"$\\mathbf{W}$"}, auquel on ajoute une constante de biais {"$b$"} :
            <div className="bg-white dark:bg-slate-950 p-2 border border-indigo-150 rounded-lg text-center font-mono my-2 text-indigo-700">
              {"$z = \\sum_{i} w_i x_i + b$"}
            </div>
          </BentoCard>

          <BentoCard title="2. Activation Non Linéaire" icon={<Brain className="text-emerald-650" size={18} />} color="emerald">
            Afin de permettre au réseau de modéliser des frontières non-linéaires complexes, l'activation linéaire {"$z$"} passe dans une fonction d'activation {"$f$"} (comme la fonction Sigmoïde ou ReLU) :
            <div className="bg-white dark:bg-slate-950 p-2 border border-emerald-150 rounded-lg text-center font-mono my-2 text-emerald-700">
              {"$a = f(z) = \\frac{1}{1 + e^{-z}}$"}
            </div>
          </BentoCard>
        </div>
      </Section>

      <Section title="2. Le Théorème Fondamental de la Rétropropagation" icon="🛡️" color="rose">
        <p className="mb-4">
          L'apprentissage consiste à ajuster les poids synaptiques afin de minimiser une fonction d'erreur globale {"$E$"} (par exemple l'erreur quadratique moyenne). Pour un poids {"$w$"} situé profondément dans les premières couches, le théorème de dérivation des fonctions composées (la <strong>Règle de la Chaîne</strong> ou <strong>Chain Rule</strong>) est l'outil indispensable.
        </p>

        <div className="bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-950 p-5 rounded-2xl mb-4 text-sm space-y-2">
          <p><strong>Règle de la chaîne (Chain Rule) pour f(g(x)) :</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaBox 
              title="Formulation Différentielle" 
              math={"\\frac{\\partial E}{\\partial w_i} = \\frac{\\partial E}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_i}"} 
            />
            <FormulaBox 
              title="Descente de Gradient relative" 
              math={"w_i \\leftarrow w_i - \\eta \\frac{\\partial E}{\\partial w_i}"} 
            />
          </div>
        </div>

        <TipBanner type="info" title="L'origine algorithmique">
          Formulée à l'origine dans les années 1970 par Paul Werbos, la rétropropagation du gradient a révolutionné le domaine de l'IA lors de sa formalisation par Yann LeCun, Geoff Hinton et Joshua Bengio dans les années 1980. Elle évite d'avoir à perturber individuellement chaque poids numérique par approximation d'Euler, calculant le gradient exact analytiquement en une passe unique.
        </TipBanner>
      </Section>

      <Section title="3. Simulateur Interactif de Rétropropagation" icon="🎮" color="indigo">
        <BackpropVisualizer />
      </Section>

      <Section title="🧠 Flashcards : Théorie des Réseaux Neuronal" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous sur les concepts clés de rétropropagation et d&apos;apprentissage profond.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la dérivée remarquable de la fonction sigmoïde {"$\\sigma(x)$"} ?</>}
            back={<>Elle vaut {"$\\sigma(x)(1 - \\sigma(x))$"} ! Cette structure incroyablement simple permet de calculer très rapidement les gradients locaux lors de la rétropropagation.</>}
          />
          <Flashcard 
            front={<>Qu&apos;est-ce que le problème de disparition du gradient (vanishing gradient) ?</>}
            back={<>Dans les réseaux profonds, multiplier de nombreux gradients locaux inférieurs à 1 (comme avec sigmoïde) via la règle de dérivation en chaîne fait tendre le gradient final vers 0, bloquant l&apos;apprentissage des premières couches. ReLU résout ce problème.</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice de Dérivation Analytique" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice Corrigé : Dérivée de l'erreur par rapport au biais"
          question={
            <div className="space-y-2">
              <p>On considère un neurone unique avec une entrée {"$x=1$"}, une cible {"$y_{cible}=0.5$"}, un poids unique {"$w=0.4$"} et un biais {"$b=0.1$"}. On évalue sa sortie via la fonction sigmoïde {"$y = \\sigma(net)$"} où {"$net = w \\cdot x + b$"}. </p>
              <p>Calculer la valeur exacte du gradient de l'erreur quadratique {"$E = \\frac{1}{2}(y - y_{cible})^2$"} par rapport au biais {"$b$"}, soit {"$\\frac{\\partial E}{\\partial b}$"}.</p>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Évaluer la propagation avant (Forward)</p>
              <p>On calcule le signal d'entrée combiné {"$net$"} :</p>
              {"$$net = w \\cdot x + b = 0.4 \\cdot 1 + 0.1 = 0.5$$"}
              <p>On applique la sigmoïde : {"$y = \\sigma(0.5) \\approx 0.622$"}.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Appliquer les dérivées partielles (Chain Rule)</p>
              <p>On applique la chain rule pour décomposer {"$\\frac{\\partial E}{\\partial b}$"} :</p>
              {"$$\\frac{\\partial E}{\\partial b} = \\frac{\\partial E}{\\partial y} \\cdot \\frac{\\partial y}{\\partial net} \\cdot \\frac{\\partial net}{\\partial b}$$"}
              <p>Calculons chaque terme séparément :</p>
              <ul className="list-disc pl-5 mt-1">
                <li>{"$\\frac{\\partial E}{\\partial y} = y - y_{cible} = 0.622 - 0.5 = 0.122$"}</li>
                <li>{"$\\frac{\\partial y}{\\partial net} = y(1-y) = 0.622 \\cdot 0.378 \\approx 0.235$"}</li>
                <li>{"$\\frac{\\partial net}{\\partial b} = 1$"}</li>
              </ul>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-100 text-xs font-mono">
              <p>Solution finale : On multiplie les termes obtenus :</p>
              {"$$\\frac{\\partial E}{\\partial b} = 0.122 \\cdot 0.235 \\cdot 1 \\approx 0.0287$$"}
              <p>Un pas de descente de gradient avec un taux d'apprentissage de lr=1 mettra à jour le biais : b = 0.1 - 0.0287 = 0.0713, faisant décroître l'écart à la cible.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Épreuve de Certification" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Pourquoi privilégie-t-on le mode 'rétropropagation' (Backward check) plutôt que d'estimer les gradients par approximation de premier ordre (Forward perturbations) ?",
              options: [
                "L'approximation stochastique est instable numériquement",
                "La rétropropagation calcule tous les gradients de l'ensemble des couches en une seule passe linéaire, alors que l'approximation de premier ordre nécessite d'évaluer le réseau P fois pour P paramètres",
                "Le mode backward est plus esthétique mécaniquement"
              ],
              correctAnswer: 1,
              explanation: "Rappel de complexité : Pour un réseau contenant un milliard de paramètres, perturber individuellement chaque paramètre pour observer son impact sur l'erreur nécessiterait un milliard de propagations avant. La rétropropagation résout ce problème en effectuant une seule passe backward extrêmement optimisée mathématiquement."
            },
            {
              question: "Quelle est la dérivée exacte de la fonction d'activation Sigmoïde f(z) = 1 / (1 + e^-z) exprimée en fonction de son activation de sortie 'a' ?",
              options: [
                "a + a^2",
                "a * (1 - a)",
                "e^-a"
              ],
              correctAnswer: 1,
              explanation: "C'est l'une des propriétés formelles les plus somptueuses de la sigmoïde : f'(z) = f(z) * (1 - f(z)) = a * (1 - a). Cette écriture simplifie magnifiquement l'implémentation algorithmique de la backpropagation."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Connaître le fonctionnement d'un neurone formel (produit scalaire et activation).",
            "Maîtriser l'application de la règle de dérivation en chaîne (Chain Rule).",
            "Comprendre comment l'erreur globale pilote la mise à jour des poids.",
            "Identifier le rôle crucial du taux d'apprentissage eta pour éviter l'explosion stochastique."
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

export default Course_Post_Bac_Ingenieur_Deep_Learning;
