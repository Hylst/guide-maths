import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

// Approximation polynomiale d'Abramowitz et Stegun de la loi normale cumulative N(x)
function cumulativeNormal(x: number): number {
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (x >= 0.0) {
    const t = 1.0 / (1.0 + p * x);
    return (1.0 - c * Math.exp(-x * x / 2.0) * t *
      (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
  } else {
    const t = 1.0 / (1.0 - p * x);
    return (c * Math.exp(-x * x / 2.0) * t *
      (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
  }
}

const Course_Sup_Finance_BlackScholes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [vol, setVol] = useState(0.20); // Volatilité σ ajustable par slider
  const [T, setT] = useState(1.0); // Temps restant avant l'échéance t=1 an
  const K = 100; // Prix d'exercice d'achat (Strike) fixe
  const r = 0.04; // Taux sans risque fixe (4%)

  // Calcul analytique Black-Scholes pour tracer le graphique de l'option Call
  const pointsCall: string[] = [];
  const pointsIntrinsic: string[] = [];
  const scaleS = 3.6; // graduation sur 150 points d'action max
  const scaleC = 5.0; // graduation de l'option max
  const originX = 50;
  const originY = 320;

  for (let sSec = 40; sSec <= 150; sSec += 2) {
    // Calcul de d1 et d2
    let callPrice = 0;
    if (vol > 0 && T > 0) {
      const d1 = (Math.log(sSec / K) + (r + (vol * vol) / 2) * T) / (vol * Math.sqrt(T));
      const d2 = d1 - vol * Math.sqrt(T);
      callPrice = sSec * cumulativeNormal(d1) - K * Math.exp(-r * T) * cumulativeNormal(d2);
    } else {
      callPrice = Math.max(0, sSec - K);
    }

    const intrinsic = Math.max(0, sSec - K);
    
    // Coordonnées SVG
    const px = (sSec - 40) * scaleS + originX;
    const pyCall = originY - callPrice * scaleC;
    const pyIntrinsic = originY - intrinsic * scaleC;

    pointsCall.push(`${px},${pyCall}`);
    pointsIntrinsic.push(`${px},${pyIntrinsic}`);
  }

  // Calcul des métriques pour S0 = 100
  const S0 = 100;
  const d1_0 = (Math.log(S0 / K) + (r + (vol * vol) / 2) * T) / (vol * Math.sqrt(T));
  const d2_0 = d1_0 - vol * Math.sqrt(T);
  const nd1 = cumulativeNormal(d1_0);
  const nd2 = cumulativeNormal(d2_0);
  const callValue0 = S0 * nd1 - K * Math.exp(-r * T) * nd2;

  // Lettres grecques
  const deltaOption = nd1; // delta du Call
  const thetaOption = - (S0 * Math.exp(- d1_0 * d1_0 / 2) * vol) / (2 * Math.sqrt(2 * Math.PI * T)) - r * K * Math.exp(-r * T) * nd2;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-FIN"
        title="Sup Finance : Évaluation quantitative et Modèle de Black-Scholes"
        subtitle="Principes de valorisation d'actifs en temps continu : équations de diffusion, le lemme d'Itô, équation EDP de Black-Scholes-Merton et les Grecques."
        duration="2h 15"
        level="École de Finance / Actuariat / Université de Sciences Financières"
        prerequisites={["Calcul Stochastique (Mouvement brownien)", "Équations aux Dérivées Partielles (EDP)", "Intégrales gaussiennes"]}
        objectives={[
          "Comprendre l'évaluation stochastique modélisée par le lemme d'Itô.",
          "Établir l'Équation aux Dérivées Partielles (EDP) de Black-Scholes.",
          "Dériver et utiliser la formule fermée de Black-Scholes d'un Call Européen.",
          "Maîtriser et interpréter le rôle couverture des Grecques (Delta, Gamma, Vega, Theta)."
        ]}
      />

      <Section title="🎻 Modélisation en Temps Continu : Fondements de la volatilité" icon="Activity" color="indigo">
        <p className="mb-4">
          En finance quantitative, contrairement au monde simplifié discret à une période, le cours d'un actif financier fluctue de manière <strong>continue et imprévisible</strong>. 
          Pour capturer cette dynamique de marché erratique, Fischer Black, Myron Scholes et Robert Merton ont révolutionné la science actuarielle en s'appuyant sur les mathématiques de la physique statistique.
        </p>
        <p className="mb-4">
          Le cours de l'actif sous-jacent <MathComponent math="S_t" /> est modélisé par une équation différentielle stochastique (EDS) décrivant un <strong>Mouvement Brownien Géométrique</strong> :
        </p>

        <FormulaBox 
          title="Équation du Mouvement Brownien Géométrique" 
          math="dS_t = \mu \cdot S_t \cdot dt + \sigma \cdot S_t \cdot dW_t" 
        />

        <p className="my-4">
          Où :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><MathComponent math="\mu" /> représente le drift ou tendance moyenne de rendement historique.</li>
          <li><MathComponent math="\sigma" /> constitue la <strong>volatilité instantanée</strong> du marché.</li>
          <li><MathComponent math="dW_t" /> exprime la différentielle du processus de Wiener (bruit blanc gaussien de moyenne 0 et de variance dt).</li>
        </ul>

        <InfoBlock type="definition" title="Le Lemme d'Itô">
          Le calcul de dérivation standard n'est pas applicable aux processus stochastiques car le terme <MathComponent math="(dW_t)^2" /> n'est pas négligeable devant <MathComponent math="dt" /> (en réalité <MathComponent math="(dW_t)^2 = dt" />). Le **Lemme d'Itô** démontre qu'une fonction de prix <MathComponent math="f = C(S, t)" /> varie selon l'équation de Taylor développée au second ordre :
          <MathComponent block math="df = \left( \frac{\partial f}{\partial t} + \mu S \frac{\partial f}{\partial S} + \frac{1}{2} \sigma^2 S^2 \frac{\partial^2 f}{\partial S^2} \right) dt + \sigma S \frac{\partial f}{\partial S} dW_t" />
        </InfoBlock>
      </Section>

      <Section title="⚖️ L'EDP de Black-Scholes et l'Égalité d'Arbitrage" icon="Scaling" color="rose">
        <p className="mb-4">
          L'idée géniale du modèle est de constituer un <strong>portefeuille de réplication sans risque</strong> composé d'une unité de dérivé <MathComponent math="C" /> vendue à découvert, protégée par l'achat d'une quantité mathématique <MathComponent math="\Delta = \partial C / \partial S" /> d'actifs réels sous-jacents.
        </p>
        <p className="mb-4">
          En appliquant le Lemme d'Itô à ce portefeuille composite, la composante brownienne risquée s'annule complètement. Pour interdire toute opportunité d'arbitrage sur les marchés financiers, le rendement déterministe de ce portefeuille de couverture parfait doit équivaloir au taux sans risque <MathComponent math="r" />. 
          Nous établissons ainsi l'Équation aux Dérivées Partielles la plus célèbre de la finance :
        </p>

        <FormulaBox 
          title="L'Équation aux Dérivées Partielles (EDP) de Black-Scholes" 
          math="\frac{\partial C}{\partial t} + r \cdot S \cdot \frac{\partial C}{\partial S} + \frac{1}{2} \sigma^2 \cdot S^2 \cdot \frac{\partial^2 C}{\partial S^2} = r \cdot C" 
        />

        <InfoBlock type="reminder" title="Disparition du drift psychologique">
          Remarquez l'absence totale de la tendance historique <MathComponent math="\mu" /> dans l'EDP ! Le prix d'équilibre théorique d'un produit dérivé ne dépend d'aucune espérance subjective de hausse du sous-jacent. C'est l'essence de la **valorisation neutre au risque**.
        </InfoBlock>
      </Section>

      <Section title="📈 Simulateur de Prime d'Option de Black-Scholes" icon="Sliders" color="indigo">
        <p className="mb-4">
          Utilisez les curseurs pour modifier dynamiquement les caractéristiques géomathématiques. Observez l'allure de la courbe de valeur d'option (en bleu) par rapport à sa droite intrinsèque de payoff final de remboursement à l'échéance <MathComponent math="\max(S_T - K, 0)" /> (en orange, strike <MathComponent math="K=100" />€).
        </p>

        {/* Panel de Contrôle */}
        <div className="bg-slate-950 text-white p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 shadow-inner border border-slate-800">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Volatilité Instantanée (σ) : {(vol * 100).toFixed(0)} %
            </label>
            <input 
              type="range" min="0.05" max="0.60" step="0.05" value={vol} 
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Maturité Résiduelle (T) : {T.toFixed(2)} An(s)
            </label>
            <input 
              type="range" min="0.05" max="3.00" step="0.05" value={T} 
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>
        </div>

        {/* Graphique SVG des courbes de valeur */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 450 350" className="w-full max-w-[420px] font-sans">
            {/* Axes */}
            <line x1="50" y1="320" x2="420" y2="320" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="320" stroke="#cbd5e1" strokeWidth="2" />

            {/* Droite intrinsèque Payoff */}
            <path 
              d={`M ${pointsIntrinsic.join(' L ')}`} 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />

            {/* Courbe de Black-Scholes */}
            <path 
              d={`M ${pointsCall.join(' L ')}`} 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="4" 
            />

            {/* Point de test pour S0=100 */}
            <circle 
              cx={(S0 - 40) * scaleS + originX} 
              cy={originY - callValue0 * scaleC} 
              r="6" 
              fill="#ef4444" 
              stroke="white" 
              strokeWidth="2" 
            />

            {/* Labels */}
            <text x="380" y="342" className="text-xs fill-slate-500 font-bold">Actif S</text>
            <text x="12" y="35" className="text-xs fill-slate-500 font-bold">Call C(S)</text>
            <text x="250" y="315" className="text-xs fill-orange-500 font-bold">Payoff d'Échéance</text>
            <text x="100" y="240" className="text-xs fill-blue-500 font-bold">Prix Black-Scholes</text>
            <text x={(S0 - 40) * scaleS + originX - 45} y={originY - callValue0 * scaleC - 15} className="text-[10px] fill-rose-600 font-bold">S₀=100 , C₀={callValue0.toFixed(2)}€</text>
          </svg>
        </div>

        {/* Détails Numériques */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Valeur du Call Européen</p>
            <p className="text-xl text-blue-700 dark:text-blue-300 mt-1">{callValue0.toFixed(3)} €</p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Sensibilité Delta (Δ)</p>
            <p className="text-xl text-indigo-700 dark:text-indigo-300 mt-1">{(deltaOption * 100).toFixed(1)} %</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Érosion Theta (Θ / jour)</p>
            <p className="text-xl text-rose-700 dark:text-rose-300 mt-1">{(thetaOption / 365).toFixed(3)} €/j</p>
          </div>
        </div>
      </Section>

      <Section title="💎 La Formule Fermée d'Évaluation de Black-Scholes" icon="CheckSquare" color="emerald">
        <p className="mb-4">
          La résolution analytique de l'EDP de Black-Scholes sous la contrainte finale de Payoff <MathComponent math="C_T = \max(S_T - K, 0)" /> livre la formule d'évaluation de Call fermée la plus employée de la planète :
        </p>

        <FormulaBox 
          title="Formule de Black-Scholes Call Européen" 
          math="C_0 = S_0 \cdot N(d_1) - K \cdot e^{-r \cdot T} \cdot N(d_2)" 
        />

        <p className="my-4">
          Où <MathComponent math="N(x)" /> est la fonction de répartition cumulative d'une loi normale centrée réduite gaussienne <MathComponent math="\mathcal{N}(0, 1)" />, et :
        </p>
        <FormulaBox 
          title="Variables Intermédiaires d1 et d2" 
          math="d_1 = \frac{\ln(S_0 / K) + \left(r + \frac{\sigma^2}{2}\right)T}{\sigma \sqrt{T}} \quad \text{et} \quad d_2 = d_1 - \sigma \sqrt{T}" 
        />

        <InfoBlock type="warning" title="Interprétation Probabiliste">
          <ul className="list-dash pl-6 space-y-1">
            <li><strong>{"N(d_2)"} :</strong> Représente la probabilité neutre au risque que l'option finisse dans la monnaie à l'échéance (c'est-à-dire que <MathComponent math="S_T > K" />).</li>
            <li><strong>{"N(d_1)"} :</strong> Constitue le ratio de couverture idéal (Delta) requis à tout instant pour immuniser le portefeuille de réplication synthétique.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="📐 Étude de cas quantitatifs" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice corrigé : Calcul du Call aux limites"
          question={<p>Soit les conditions initiales d'une action à <MathComponent math="S_0 = K = 100" />€ (à la monnaie). On pose le taux <MathComponent math="r = 0" /> et la maturité <MathComponent math="T = 1" />. Exprimer analytiquement les valeurs simplifiées de <MathComponent math="d_1" />, <MathComponent math="d_2" /> et le Call final en fonction de la volatilité <MathComponent math="\sigma" />.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Simplifier d1 et d2</p>
              <p>Comme <MathComponent math="S_0 = K" />, <MathComponent math="\ln(S_0/K) = \ln(1) = 0" />.</p>
              <p>Avec <MathComponent math="r = 0" /> et <MathComponent math="T = 1" />, les équations deviennent :</p>
              <p>{"$d_1 = \\frac{0.5 \\sigma^2}{\\sigma} = \\frac{\\sigma}{2}$"}</p>
              <p>{"$d_2 = \\frac{\\sigma}{2} - \\sigma = -\\frac{\\sigma}{2}$"}.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Formuler le prix du Call</p>
              <p>On injecte dans l'expression générique :</p>
              <p>{"$C_0 = 100 \\left( N\\left(\\frac{\\sigma}{2}\\right) - N\\left(-\\frac{\\sigma}{2}\\right) \\right)$"}.</p>
              <p>Par symétrie gaussienne, pour tout réel <MathComponent math="x" />, on a <MathComponent math="N(-x) = 1 - N(x)" />, donc :</p>
              <p>{"$C_0 = 100 \\left( 2 N\\left(\\frac{\\sigma}{2}\\right) - 1 \\right)$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Application numérique avec σ = 20%</p>
              <p>Pour <MathComponent math="\sigma = 0.20" /> :</p>
              <p>{"$C_0 = 100 \\left( 2 N(0.10) - 1 \\right)$"}.</p>
              <p>Une table normale nous donne <MathComponent math="N(0.10) \approx 0.5398" />.</p>
              <p>D'où : <MathComponent math="C_0 = 100 \times (2 \times 0.5398 - 1) = 100 \times 0.0796 \approx 7.96" />€. 
              Cette modélisation rapide livre instantanément le coût d'une assurance boursière contre les krachs volatils !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de synthèse" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Quelle est la définition mathématique précise du Delta d'une option ?</>}
            back={<>Le Delta (Δ) est la dérivée première de la prime par rapport au cours de l'action : {"$\\Delta = \\partial C / \\partial S$"}. Pour un Call Européen, il vaut précisément {"$N(d_1)$"}.</>}
          />
          <Flashcard 
            front={<>Quelle relation mathématique de parité lie le prix d'un Call et d'un Put ?</>}
            back={<>La parité Call-Put stipule que {"$C_t + K e^{-r(T-t)} = P_t + S_t$"}, interdisant tout arbitrage d'évaluation asymétrique simple.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Qu'est-ce que la volatilité implicite en finance ?">
          La volatilité implicite est la volatilité d'équilibre <MathComponent math="\sigma" /> obtenue en inversant l'équation mathématique stochastique de Black-Scholes à partir de la prime réelle observée de manière vivante sur les marchés d'options. Elle indique le niveau d'incertitude ou de peur que le consensus boursier anticipe pour le futur de l'actif.
        </Accordion>
        <Accordion title="2. Pourquoi le modèle de Black-Scholes sous-estime-t-il les variations extrêmes ?">
          Le modèle postule une distribution gaussienne (loi normale) continue pour les rendements de l'action. Cependant, la réalité empirique présente des **queues de distribution épaisses (fat tails)** : les krachs ou hausses massives surviennent beaucoup plus souvent que ce que prédit une gaussienne. Pour compenser ce biais, le marché applique des primes de risques de crises (d'où le sourire de volatilité ou volatility smile).
        </Accordion>
        <Accordion title="3. Pourquoi appelle-t-on le Theta l'usure temporelle ?">
          Le Theta (Θ) mesure la sensibilité du prix de l'option par rapport au temps de détention résiduel. À moins d'une explosion de volatilité ou du cours, l'option perd chaque jour de la valeur suite au tarissement graduel du délai pour espérer qu'elle dépasse son Strike. C'est pourquoi le Theta d'un acheteur d'options est strictement négatif.
        </Accordion>
      </Section>

      <Section title="📝 Quiz de validation quantitative" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel terme de l'EDP de Black-Scholes traduit l'influence de la volatilité et de la courbure convexe du Call ?",
              options: [
                "L'intégrale de dérive (r * S * dC/dS)",
                "Le terme du second ordre lié au Lemme d'Itô (1/2 * sigma^2 * S^2 * d2C/dS2)",
                "Le terme lié à la parité de change (r * C)"
              ],
              correctAnswer: 1,
              explanation: "Le terme (1/2 * sigma^2 * S^2 * d2C/dS2) exprime la convexité théorique de l'option de par sa nature de produit asymétrique (le Gamma), amplifié par la volatilité marchande."
            },
            {
              question: "Pour un Call à la monnaie (S0 = K), lorsque la maturité devient très grande (T -> ∞), vers quelle valeur converge N(d1) ?",
              options: [
                "0 (l'option s'annule nécessairement)",
                "1 (la probabilité de finir au-dessus tend vers la certitude absolue)",
                "0.5 (équiprobabilité d'équilibre de stagnation)"
              ],
              correctAnswer: 1,
              explanation: "Lorsque la maturité T tend vers l'infini, d1 tend vers l'infini et N(d1) converge vers 1, signifiant que le Call se réplique comme l'action réelle elle-même à long terme."
            },
            {
              question: "Quelle est la valeur à l'échéance T d'un Call de strike K=120 si le sous-jacent vaut 150 ?",
              options: [
                "0 (périmé car inférieur)",
                "30 € (le payoff intrinsèque max(150-120, 0))",
                "15 €"
              ],
              correctAnswer: 1,
              explanation: "À l'échéance d'une option européenne, sa valeur se résume exactement à sa valeur de remboursement intrinsèque brute : max(S - K, 0) = max(150 - 120, 0) = 30."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je comprends les bases fondamentales des processus stochastiques Browniens.",
            "Je sais énoncer et dériver géométriquement l'EDP stochastique de Black-Scholes.",
            "Je maîtrise le calcul analytique fermée de d1, d2 et de la prime optionnelle.",
            "Je sais définir et interpréter l'utilité des Grecques de décalage directionnel."
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

export default Course_Sup_Finance_BlackScholes;
