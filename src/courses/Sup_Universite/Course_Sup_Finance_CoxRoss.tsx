import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Finance_CoxRoss: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [strike, setStrike] = useState(95); // Strike ajustable de 80 à 120

  // Paramètres de l'arbre CRR
  const S0 = 100;
  const u = 1.15; // Facteur "Up"
  const d = 0.85; // Facteur "Down"
  const r = 0.05; // Taux sans risque (5%)
  const disc = Math.exp(-r); // Facteur d'actualisation continu pour une étape (t=1an ou dt=1)

  // Calcl de la probabilité neutre au risque
  // p = ((1+r) - d) / (u - d)  --> On utilise l'actualisation standard (e^r - d)/(u-d) pour le CRR continu
  const e_r = Math.exp(r);
  const p = (e_r - d) / (u - d);

  // Étape 2 : Prix de l'action à chaque nœud
  const Suu = S0 * u * u;
  const Sud = S0 * u * d;
  const Sdd = S0 * d * d;

  // Étape 2 : Payoffs de l'option Call à l'échéance t=2
  const Cuu = Math.max(0, Suu - strike);
  const Cud = Math.max(0, Sud - strike);
  const Cdd = Math.max(0, Sdd - strike);

  // Étape 1 : Valorisation par induction rétrograde à t=1
  const Cu = disc * (p * Cuu + (1 - p) * Cud);
  const Cd = disc * (p * Cud + (1 - p) * Cdd);

  // Étape 0 : Valorisation à t=0
  const C0 = disc * (p * Cu + (1 - p) * Cd);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-FIN"
        title="Sup Finance : Options Binomiales et Arbres de Cox-Ross-Rubinstein"
        subtitle="Modélisation discrète de l'évolution boursière : loi binomiale, portefeuilles de couverture auto-financés, et induction à rebours."
        duration="2h 00"
        level="École de Finance / Actuariat / Université de Sciences Financières"
        prerequisites={["Probabilités discrètes", "Suites géométriques", "Notion d'arbitrage de change"]}
        objectives={[
          "Comprendre le principe d'évaluation stochastique par duplication de portefeuille.",
          "Dériver la probabilité neutre au risque d'un univers binomial discrétisé.",
          "Écrire l'algorithme d'induction rétrograde pour valoriser des options européennes.",
          "Analyser le comportement d'options de style américain et leur exercice anticipé."
        ]}
      />

      <Section title="🌿 Approche Discrète : Le cadre d'arbitrage de Cox-Ross-Rubinstein" icon="GitFork" color="indigo">
        <p className="mb-4">
          Avant d'étudier la complexité infinie des équations différentielles stochastiques du modèle de Black-Scholes, comment peut-on évaluer rigoureusement le prix équitable d'une option d'achat ? En 1979, John Cox, Stephen Ross et Mark Rubinstein ont développé une formulation discrète d'une formidable clarté pédagogique et d'une féroce efficacité computationnelle : le **modèle binomial CRR**.
        </p>
        <p className="mb-4">
          L'hypothèse de base consiste à diviser le temps qui s'écoule avant l'échéance de l'option en <MathComponent math="N" /> sous-périodes élémentaires. À chaque étape, le cours actuel de l'action <MathComponent math="S" /> ne peut subir que deux évolutions possibles :
        </p>

        <FormulaBox 
          title="Évolutions Binomiales" 
          math="S \to u \cdot S \quad (\text{Hausse, 'Up'}) \quad \text{ou} \quad S \to d \cdot S \quad (\text{Baisse, 'Down'})" 
        />

        <p className="my-4">
          Avec les restrictions fondamentales interdisant l'arbitrage direct de marché :
          <MathComponent block math="d < e^r < u" />
          Où <MathComponent math="r" /> est le taux sans risque associé à chaque période élémentaire de capitalisation.
        </p>
      </Section>

      <Section title="💎 Duplication de Portefeuille et Évaluation Neutre au Risque" icon="Dna" color="emerald">
        <p className="mb-4">
          Pour évaluer le prix d'un produit dérivé, on applique le principe fondamental d'<strong>Absence d'Opportunité d'Arbitrage</strong>. Nous créons un portefeuille composé d'une quantité <MathComponent math="\Delta" /> d'actions réelles et d'un prêt d'argent sans risque <MathComponent math="B" />, conçu de manière à répliquer exactement les gains futurs du dérivé, que le marché monte ou baisse :
          <MathComponent block math="\Delta \cdot u S + B e^ r = C_{\text{up}}" />
          <MathComponent block math="\Delta \cdot d S + B e^ r = C_{\text{down}}" />
        </p>
        <p className="mb-4">
          La résolution de ce système d'équations linéaires détermine les paramètres de duplication parfaite :
          <MathComponent block math="\Delta = \frac{C_{\text{up}} - C_{\text{down}}}{(u - d)S} \quad \text{et} \quad B = e^{-r} \frac{u C_{\text{down}} - d C_{\text{up}}}{u - d}" />
        </p>
        <p className="mb-4">
          Par égalité d'arbitrage, le prix de l'option d'aujourd'hui doit égaler le coût de constitution de ce portefeuille de réplication synthétique <MathComponent math="C = \Delta S + B" />. En substituant <MathComponent math="\Delta" /> et <MathComponent math="B" />, on obtient la formule magique simplifiée :
        </p>

        <FormulaBox 
          title="Le Prix Binomial Neutre au Risque" 
          math="C = e^{-r} \cdot \left[ p \cdot C_{\text{up}} + (1-p) \cdot C_{\text{down}} \right]" 
        />

        <p className="my-4">
          Où <MathComponent math="p" /> est la **probabilité neutre au risque** (risk-neutral probability) :
        </p>
        <FormulaBox 
          title="Probabilité d'évaluation Neutre au Risque" 
          math="p = \frac{e^r - d}{u - d}" 
        />

        <InfoBlock type="warning" title="Philosophie Actuarielle">
          Cette constante <MathComponent math="p" /> n'est pas la probabilité réelle ou historique d'avoir une hausse, car elle ne dépend pas de la psychologie des opérateurs boursiers. Elle exprime une probabilité virtuelle fictive sous laquelle le prix actuel de l'actif risqué équivaut à son espérance stochastique d'échéance actualisée au taux sans risque.
        </InfoBlock>
      </Section>

      <Section title="⚡ Solveur Binomial Interactif (Arbre à 2 Étapes)" icon="Sliders" color="indigo">
        <p className="mb-4 text-slate-700 dark:text-slate-300 font-medium">
          Modifiez le prix d'exercice (Strike <MathComponent math="K" />) d'achat de l'option Call à l'aide du curseur. Suivez comment les valeurs finales des payoffs (à droite) se modifient et se propagent à rebours à travers l'arbre pour recalculer en temps réel le prix du Call initial <MathComponent math="C_0" /> !
        </p>

        {/* Panel de réglage du Strike */}
        <div className="bg-slate-950 text-white p-5 rounded-3xl mb-8 shadow-inner border border-slate-800">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
            Prix d'Exercice Strike (K) : {strike} €
          </label>
          <input 
            type="range" min="80" max="120" step="1.0" value={strike} 
            onChange={(e) => setStrike(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Arbre Développé dessiné en SVG */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 520 280" className="w-full max-w-[480px] font-sans">
            {/* Lignes de liaison de l'arbre */}
            <line x1="60" y1="140" x2="210" y2="70" stroke="#94a3b8" strokeWidth="2" />
            <line x1="60" y1="140" x2="210" y2="210" stroke="#94a3b8" strokeWidth="2" />

            <line x1="210" y1="70" x2="380" y2="35" stroke="#94a3b8" strokeWidth="2" />
            <line x1="210" y1="70" x2="380" y2="105" stroke="#94a3b8" strokeWidth="2" />
            <line x1="210" y1="210" x2="380" y2="175" stroke="#94a3b8" strokeWidth="2" />
            <line x1="210" y1="210" x2="380" y2="245" stroke="#94a3b8" strokeWidth="2" />

            {/* Nœud Initial t=0 */}
            <g transform="translate(60, 140)">
              <circle r="24" fill="#6366f1" stroke="white" strokeWidth="2" />
              <text x="0" y="-4" className="text-[10px] fill-white text-center font-bold" textAnchor="middle">S₀=100</text>
              <text x="0" y="8" className="text-[10px] fill-yellow-300 text-center font-bold" textAnchor="middle">C₀={C0.toFixed(2)}</text>
              <text x="0" y="34" className="text-[9px] fill-slate-500 font-bold" textAnchor="middle">Départ t=0</text>
            </g>

            {/* Nœuds d'étape t=1 */}
            <g transform="translate(210, 70)">
              <circle r="24" fill="#a855f7" stroke="white" strokeWidth="2" />
              <text x="0" y="-4" className="text-[10px] fill-white text-center font-bold" textAnchor="middle">{"S_u=115"}</text>
              <text x="0" y="8" className="text-[10px] fill-yellow-200 text-center font-bold" textAnchor="middle">C_u={Cu.toFixed(2)}</text>
              <text x="0" y="34" className="text-[9px] fill-slate-500 font-bold" textAnchor="middle">Etape t=1 (Up)</text>
            </g>
            <g transform="translate(210, 210)">
              <circle r="24" fill="#a855f7" stroke="white" strokeWidth="2" />
              <text x="0" y="-4" className="text-[10px] fill-white text-center font-bold" textAnchor="middle">{"S_d=85"}</text>
              <text x="0" y="8" className="text-[10px] fill-yellow-100 text-center font-bold" textAnchor="middle">C_d={Cd.toFixed(2)}</text>
              <text x="0" y="-28" className="text-[9px] fill-slate-500 font-bold" textAnchor="middle">Etape t=1 (Down)</text>
            </g>

            {/* Nœuds d'échéance t=2 */}
            <g transform="translate(380, 35)">
              <circle r="24" fill="#10b981" stroke="white" strokeWidth="2" />
              <text x="0" y="-4" className="text-[9px] fill-white text-center font-bold" textAnchor="middle">S_uu=132.2</text>
              <text x="0" y="8" className="text-[10px] fill-yellow-200 text-center font-bold" textAnchor="middle">C_uu={Cuu.toFixed(2)}</text>
              <text x="0" y="34" className="text-[9px] fill-slate-500 font-bold" textAnchor="middle">Echéance t=2</text>
            </g>
            <g transform="translate(380, 140)">
              <circle r="24" fill="#10b981" stroke="white" strokeWidth="2" />
              <text x="0" y="-4" className="text-[10px] fill-white text-center font-bold" textAnchor="middle">S_ud=97.7</text>
              <text x="0" y="8" className="text-[10px] fill-yellow-200 text-center font-bold" textAnchor="middle">C_ud={Cud.toFixed(2)}</text>
            </g>
            <g transform="translate(380, 245)">
              <circle r="24" fill="#10b981" stroke="white" strokeWidth="2" />
              <text x="0" y="-4" className="text-[9px] fill-white text-center font-bold" textAnchor="middle">S_dd=72.2</text>
              <text x="0" y="8" className="text-[10px] fill-yellow-200 text-center font-bold" textAnchor="middle">C_dd={Cdd.toFixed(2)}</text>
            </g>
          </svg>
        </div>

        {/* Détails Variables */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Probabilité Neutre au Risque (p)</p>
            <p className="text-xl text-indigo-700 dark:text-indigo-300 mt-1">{(p * 100).toFixed(2)} %</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Actualisation d'étape (e^-r)</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{disc.toFixed(4)}</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Prix équitable de l'Option</p>
            <p className="text-xl text-rose-700 dark:text-rose-300 mt-1">{C0.toFixed(3)} €</p>
          </div>
        </div>
      </Section>

      <Section title="📐 Induction Rétrograde et Arbres Multitemps" icon="RefreshCw" color="purple">
        <p className="mb-4">
          La force algorithmique majeure des arbres binomiaux est de s'étendre à <MathComponent math="N" /> périodes très simplement par programmation récursive d'induction à rebours.
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">1. L'indépendance de construction temporelle</h3>
        <p className="mb-4">
          On dresse en premier lieu l'arborescence des prix de l'actif sous-jacent. Un nœud à l'instant <MathComponent math="t" /> et de coordonnée hauteur de hausse <MathComponent math="j" /> (nombre de hausses accumulées) hérite de la formule d'évolution géométrique simple :
          <MathComponent block math="S(t, j) = S_0 \cdot u^j \cdot d^{t-j}" />
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">2. Le principe d'induction à rebours</h3>
        <p className="mb-4">
          On commence par affecter les valeurs de l'option sur la couche terminale d'échéance <MathComponent math="t = N" /> : <MathComponent math="C(N, j) = \max(S(N, j) - K, 0)" />.
          Puis, on remonte les échelons du temps pas à pas vers la gauche en calculant l'équivalent stochastique actualisé :
          <MathComponent block math="C(t, j) = e^{-r \cdot \Delta t} \left[ p \cdot C(t+1, j+1) + (1-p) \cdot C(t+1, j) \right]" />
        </p>

        <InfoBlock type="warning" title="La supériorité pour les Options Américaines">
          Contrairement au modèle de Black-Scholes continu qui s'avère incapable de valoriser analytiquement les options de style **Américain** (qui peuvent être exercées à tout instant par leur détenteur avant l'échéance), l'arbre binomial le résout avec l'équation de Bellman de programmation dynamique :
          <MathComponent block math="C_{\text{américain}}(t, j) = \max\left( S(t, j) - K, \ e^{-r \Delta t} \left[ p C(t+1, j+1) + (1-p) C(t+1, j) \right] \right)" />
        </InfoBlock>
      </Section>

      <Section title="💎 Études de cas mathématiques" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice corrigé : Évaluation analytique complète sur 2 étapes"
          question={<p>Dériver analytiquement l'équation générale condensée du prix initial d'un Call européen {"$C_0$"} sur un horizon à deux pas de temps dans l'arbre binomial de Cox-Ross-Rubinstein.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Écrire les équations d'actualisation de l'étape 1</p>
              <p>On exprime les valeurs de transition intermédiaire de l'étape 1 par espérance neutre au risque actualisée :</p>
              <p>{"$C_u = e^{-r} (p C_{uu} + (1-p) C_{ud})$"}</p>
              <p>{"$C_d = e^{-r} (p C_{ud} + (1-p) C_{dd})$"}.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Réinjecter dans l'équation de l'étape 0</p>
              <p>Le prix initial vaut :</p>
              <p>{"$C_0 = e^{-r} (p C_u + (1-p) C_d)$"}</p>
              <p>Remplaçons {"$C_u$"} et {"$C_d$"} : </p>
              <p>{"$C_0 = e^{-2r} \\left[ p(p C_{uu} + (1-p) C_{ud}) + (1-p)(p C_{ud} + (1-p) C_{dd}) \\right]$"}</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Factoriser et interpréter selon la loi Binomiale</p>
              <p>En regroupant les termes, on simplifie d'un coup de maître :</p>
              <p><MathComponent block math="C_0 = e^{-2r} \left[ p^2 C_{uu} + 2p(1-p) C_{ud} + (1-p)^2 C_{dd} \right]" /></p>
              <p>C'est exactement l'espérance calculée selon une **loi binomiale d'ordre 2** ! Pour N périodes, la formule se généralise de façon canonique :</p>
              <p><MathComponent block math="C_0 = e^{-r \cdot N} \sum_{k=0}^N \binom{N}{k} p^k (1-p)^{N-k} \max(S_0 u^k d^{N-k} - K, 0)" /></p>
              <p>C'est cette équation discrète exacte qui finit par converger géométriquement vers la formule de Black-Scholes lorsque N tend vers l'infini !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Mémorisation active" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Sous quelle condition le modèle d'arbre binomial CRR converge-t-il vers la formule standard de Black-Scholes ?</>}
            back={<>Lorsque le nombre de subdivisions temporelles Tend vers l'infini, à condition de calibrer la déviance par les formules de calibration de Cox : {"$u = e^{\\sigma \\sqrt{\\Delta t}}$"} et {"$d = e^{-\\sigma \\sqrt{\\Delta t}}$"}.</>}
          />
          <Flashcard 
            front={<>Quel avantage mathématique unique distingue la méthode des arbres CRR de la méthode analytique classique de Black-Scholes ?</>}
            back={<>Les arbres binomiaux permettent le calcul dynamique d'évaluation de clauses complexes d'exercices anticipés propres aux options de style américain (conditions de barrières d'arrêts).</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Comment calibre-t-on les facteurs de hausse u et baisse d dans la pratique ?">
          Pour faire correspondre les fluctuations discrètes à la volatilité réelle continue <MathComponent math="\sigma" /> mesurée sur les marchés boursiers, Cox, Ross et Rubinstein ont prouvé qu'il faut fixer :
          <MathComponent block math="u = e^{\sigma \sqrt{\Delta t}} \quad \text{et} \quad d = e^{-\sigma \sqrt{\Delta t}} = \frac{1}{u}" />
          Où <MathComponent math="\Delta t = T/N" /> est l'amplitude de chaque pas temporel en années.
        </Accordion>
        <Accordion title="2. Qu'est-ce que l'arbitrage par portefeuille d'évaluation auto-financé ?">
          Un portefeuille de duplication est auto-financé si aucun apport de capitaux extérieurs n'est requis ni autorisé pour ajuster les couvertures d'étapes. À chaque pas, la vente ou l'achat d'actions <MathComponent math="\Delta" /> requiert l'équivalent monétaire exact fourni par la liquidation ou la souscription du prêt sans risque <MathComponent math="B" />, confirmant l'exacte équivalence de valeur financière brute.
        </Accordion>
        <Accordion title="3. Pourquoi l'arbre binomial est-il préféré pour les algorithmes informatiques d'options ?">
          En présence de produits exotiques dont les clauses de remboursement dépendent du chemin emprunté (path-dependent), ou pour les clauses américaines, l'arbre offre une structure de tableau indexé parfaite en complexité algorithmique linéaire <MathComponent math="O(N^2)" />, éliminant les lenteurs d'intégrations de Monte-Carlo.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation de connaissances" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si p est supérieur à 1 ou inférieur à 0, qu'en conclut-on sur les conditions d'arbitrage de marché ?",
              options: [
                "L'univers financier est en équilibre idéal",
                "Il existe des opportunités d'arbitrage évidentes (donc d < e^r < u est enfreint)",
                "Les cours de la bourse sont nécessairement stables"
              ],
              correctAnswer: 1,
              explanation: "Pour que la probabilité neutre au risque p = (e^r - d)/(u - d) soit comprise dans [0, 1], la restriction d < e^r < u doit impérativement s'appliquer. Autrement, un investisseur rationnel pourrait emprunter à taux sans risque pour s'enrichir à coup sûr, brisant l'hypothèse d'absence d'arbitrage."
            },
            {
              question: "Quelle méthode applique-t-on pour valoriser l'arbre binomial à partir des conditions aux limites finales ?",
              options: [
                "L'induction rétrograde (on remonte le temps de la droite vers la gauche)",
                "La méthode matricielle de Taylor par décalage prospectif",
                "Le tirage statistique au sort de Monte-Carlo"
              ],
              correctAnswer: 0,
              explanation: "La méthode d'évaluation à rebours ou induction rétrograde remonte le graphe de la droite (échéance finale connue par formule de payoff intrinsèque) vers la gauche (date présente de prix d'équilibre initial)."
            },
            {
              question: "Qu'exprime mathématiquement la loi de Bellman de choix pour une option américaine à un nœud de l'arbre ?",
              options: [
                "L'annulation globale des risques de change",
                "Le maximum entre la valeur de l'exercice anticipé immédiat et la valeur actualisée de continuation de l'arbre",
                "La moyenne pondérée simple des nœuds de déviation"
              ],
              correctAnswer: 1,
              explanation: "Pour les contrats de style américain, le détenteur peut encaisser le remboursement sur-le-champ (valeur d'exercice immédiat) ou conserver l'option active (valeur actualisée de continuation rétrograde), faisant de sa valeur le maximum des deux alternatives."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais l'organisation binaire et géométrique d'un arbre d'actif de Cox-Ross-Rubinstein.",
            "Je sais dériver analytiquement le portefeuille d'évaluation auto-financé et sa probabilité p.",
            "Je maîtrise l'induction à rebours pas à pas pour évaluer une option Call.",
            "Je comprends les enjeux et particularités mathématiques de l'exercice anticipé d'options américaines."
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

export default Course_Sup_Finance_CoxRoss;
