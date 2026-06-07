import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Tertiaire_03_Theorie_Decision: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Decision matrix payoffs under 3 states of the market
  // Strategy 1: Investir prudemment (Conservateur)
  // Strategy 2: Investir audacieusement (Aggressif)
  // Strategy 3: Innovation disruptive (Viral)

  // User-modifiable payoffs for dynamic calculation
  const [payoffMild1, setPayoffMild1] = useState(10);
  const [payoffMild2, setPayoffMild2] = useState(-5);
  const [payoffMild3, setPayoffMild3] = useState(-20);

  const [payoffStable1, setPayoffStable1] = useState(15);
  const [payoffStable2, setPayoffStable2] = useState(25);
  const [payoffStable3, setPayoffStable3] = useState(10);

  const [payoffHigh1, setPayoffHigh1] = useState(20);
  const [payoffHigh2, setPayoffHigh2] = useState(50);
  const [payoffHigh3, setPayoffHigh3] = useState(80);

  // Rows configuration
  const strategies = [
    { name: 'S1 : Prudente (Épargne)', mild: payoffMild1, stable: payoffStable1, high: payoffHigh1 },
    { name: 'S2 : Offensive (Expansion)', mild: payoffMild2, stable: payoffStable2, high: payoffHigh2 },
    { name: 'S3 : Disruptive (R&D)', mild: payoffMild3, stable: payoffStable3, high: payoffHigh3 },
  ];

  // 1. Maximax criteria (Gambler - max of max)
  const maximaxValues = strategies.map(s => Math.max(s.mild, s.stable, s.high));
  const bestMaximaxVal = Math.max(...maximaxValues);
  const maximaxStrategyIdx = maximaxValues.indexOf(bestMaximaxVal);

  // 2. Maximin criteria (Wald safety - max of min)
  const maximinValues = strategies.map(s => Math.min(s.mild, s.stable, s.high));
  const bestMaximinVal = Math.max(...maximinValues);
  const maximinStrategyIdx = maximinValues.indexOf(bestMaximinVal);

  // 3. Savage Regret matrix calculations
  // Max for each column
  const maxMildCol = Math.max(payoffMild1, payoffMild2, payoffMild3);
  const maxStableCol = Math.max(payoffStable1, payoffStable2, payoffStable3);
  const maxHighCol = Math.max(payoffHigh1, payoffHigh2, payoffHigh3);

  // Regrets row values
  const regretMild = strategies.map(s => maxMildCol - s.mild);
  const regretStable = strategies.map(s => maxStableCol - s.stable);
  const regretHigh = strategies.map(s => maxHighCol - s.high);

  // Max regret for each row
  const rowMaxRegret = strategies.map((_, idx) => Math.max(regretMild[idx], regretStable[idx], regretHigh[idx]));
  const bestRegretVal = Math.min(...rowMaxRegret);
  const savageStrategyIdx = rowMaxRegret.indexOf(bestRegretVal);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-TER-03"
        title="Modèles de Décision & Théorie des Jeux"
        subtitle="Outils quantitatifs de pilotage stratégique en univers incertain, critères de Wald, Savage, matrices des regrets et équilibres de Nash."
        duration="1h 20"
        level="BUT 2ème/3ème année (GEA / TC / MLT)"
        prerequisites={[
          "Calculs de probabilités de base",
          "Théorie des ensembles (matrices d'utilité)"
        ]}
        objectives={[
          "Distinguer la prise de décision en univers risqué (probabilités connues) de l'univers incertain (probabilités inconnues).",
          "Calculer et interpréter les optima sous les critères de Wald (Maximin), du MaxiMax, de Laplace et de Savage (Minimax de regret).",
          "Modéliser et résoudre un jeu de stratégie bilatéral à somme nulle.",
          "Définir et repérer un Équilibre de Nash et la notion de point-selle d'une matrice de gain."
        ]}
      />

      <Section title="⚖️ Théorie de la Décision en Univers Incertain" icon="⚖️" color="indigo">
        <p className="mb-4">
          Un directeur administratif ou stratégique doit arbitrer entre des investissements concurrents alors que l'avenir macroéconomique de son marché est imprévisible (Incertitude pure : aucune probabilité historique ne permet de quantifier les chances d'inflation ou de récession).
        </p>

        <InfoBlock type="definition" title="La Matrice des Gains">
          On formalise le problème par un tableau croisant :
          <ul className="list-disc pl-6 mt-2 space-y-1.5 text-sm">
            <li><strong>Les Décisions / Options (<MathComponent math="D_i" />) :</strong> Les stratégies contrôlables par l'agent décideur.</li>
            <li><strong>Les États de la Nature (<MathComponent math="E_j" />) :</strong> Les conjonctures environnementales incontrôlables du marché.</li>
            <li><strong>Les Gains (<MathComponent math="G_{ij}" />) :</strong> Les rendements ou utilités attendus de chaque croisement.</li>
          </ul>
        </InfoBlock>

        <p className="mt-4">
          Quatre grands mathématiciens ont modélisé l'attitude de rationalité de décision face à une telle matrice d'incertitude :
        </p>
      </Section>

      <Section title="🧮 Les 4 Grands Critères de Choix Rationnels" icon="📊" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
              🛡️ Le Critère de Wald (Pessimisme / MaxiMin)
            </h4>
            <p className="text-xs text-muted-text mb-3">
              Le décideur considère que la nature est hostile et que le pire état va se produire. Pour se prémunir, il identifie le gain minimal de chaque ligne et choisit l'option qui présente le <strong>maximum de ces minima</strong>.
            </p>
            <FormulaBox title="Sécurité absolue" math="\text{Wald} = \max_i \left[ \min_j G_{ij} \right]" />
          </div>

          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
              🎰 Le Critère du MaxiMax (Optimisme)
            </h4>
            <p className="text-xs text-muted-text mb-3">
              Le décideur est un joueur audacieux. Il parie sur une conjoncture idéale. Il extrait le gain maximal absolu par ligne de stratégie et choisit l'option offrant le <strong>maximum de ces maxima</strong>.
            </p>
            <FormulaBox title="Bénéfice maximal" math="\text{Maximax} = \max_i \left[ \max_j G_{ij} \right]" />
          </div>

          <div className="border border-border p-5 rounded-2xl bg-card col-span-1 md:col-span-2">
            <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
              📉 Le Critère de Savage : Minimiser le Regret
            </h4>
            <p className="text-xs text-muted-text mb-3">
              Savage propose d'enregistrer le remords d'avoir manqué une opportunité. Il calcule la <strong>matrice des regrets</strong> : pour chaque État (colonne), on soustrait le gain de chaque cellule au gain optimal possible de cette colonne <MathComponent math="R_{ij} = \max_k G_{kj} - G_{ij}" />.
              On cherche ensuite à minimiser l'impact du pire remords possible :
            </p>
            <FormulaBox title="Minimisation du regret maximal" math="\text{Savage} = \min_i \left[ \max_j R_{ij} \right]" />
          </div>
        </div>
      </Section>

      <Section title="🎮 Simulateur Interactif de Décision d'Entreprise" icon="🎮" color="purple">
        <p className="mb-6">
          Modifiez les gains financiers de la matrice projetée à l'aide des curseurs ci-dessous (la colonne de droite représente les ventes exceptionnelles). 
          Observez comment l'algorithme réévalue instantanément les stratégies optimales d'après les théories d'incertitudes de <strong>Wald, Maximax, et Savage</strong>.
        </p>

        {/* Dynamic Decision Matrix App */}
        <div className="bg-muted/50 dark:bg-slate-900 border border-border rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="space-y-4 lg:col-span-1">
            <h5 className="font-bold text-sm border-b pb-1 flex items-center gap-2">
              📊 Régler les Gains (k€)
            </h5>

            {/* Prudente mild/high */}
            <div className="bg-card p-3 rounded-xl border">
              <span className="text-xs font-bold block text-slate-500 mb-2">S1 : Prudente (Sécurisée)</span>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold flex justify-between">
                  <span>Récession :</span>
                  <span className="font-mono text-indigo-600 font-black">{payoffMild1} k€</span>
                </label>
                <input 
                  aria-label="Gain Recess S1"
                  type="range" min="0" max="30" step="2"
                  value={payoffMild1} onChange={(e) => setPayoffMild1(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 mt-1" 
                />
                
                <label className="text-[10px] uppercase font-bold flex justify-between">
                  <span>Forte demande :</span>
                  <span className="font-mono text-indigo-600 font-black">{payoffHigh1} k€</span>
                </label>
                <input 
                  aria-label="Gain Demande S1"
                  type="range" min="10" max="35" step="2"
                  value={payoffHigh1} onChange={(e) => setPayoffHigh1(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 mt-1" 
                />
              </div>
            </div>

            {/* Offensive mild/high */}
            <div className="bg-card p-3 rounded-xl border">
              <span className="text-xs font-bold block text-slate-500 mb-2">S2 : Offensive (Risquée)</span>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold flex justify-between">
                  <span>Récession :</span>
                  <span className="font-mono text-indigo-600 font-black">{payoffMild2} k€</span>
                </label>
                <input 
                  aria-label="Gain Recess S2"
                  type="range" min="-15" max="15" step="2"
                  value={payoffMild2} onChange={(e) => setPayoffMild2(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 mt-1" 
                />
                
                <label className="text-[10px] uppercase font-bold flex justify-between">
                  <span>Forte demande :</span>
                  <span className="font-mono text-indigo-600 font-black">{payoffHigh2} k€</span>
                </label>
                <input 
                  aria-label="Gain Demande S2"
                  type="range" min="30" max="60" step="2"
                  value={payoffHigh2} onChange={(e) => setPayoffHigh2(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 mt-1" 
                />
              </div>
            </div>

            {/* Disruptive mild/high */}
            <div className="bg-card p-3 rounded-xl border">
              <span className="text-xs font-bold block text-slate-500 mb-2">S3 : Disruptive (Ultra)</span>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold flex justify-between">
                  <span>Récession :</span>
                  <span className="font-mono text-indigo-600 font-black">{payoffMild3} k€</span>
                </label>
                <input 
                  aria-label="Gain Recess S3"
                  type="range" min="-40" max="5" step="2"
                  value={payoffMild3} onChange={(e) => setPayoffMild3(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 mt-1" 
                />
                
                <label className="text-[10px] uppercase font-bold flex justify-between">
                  <span>Forte demande :</span>
                  <span className="font-mono text-indigo-600 font-black">{payoffHigh3} k€</span>
                </label>
                <input 
                  aria-label="Gain Demande S3"
                  type="range" min="50" max="100" step="5"
                  value={payoffHigh3} onChange={(e) => setPayoffHigh3(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 mt-1" 
                />
              </div>
            </div>
          </div>

          {/* Table display column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border p-4 rounded-2xl shadow-inner">
              <h5 className="font-black text-sm text-foreground mb-3">📋 Matrice Détectrice de Gains (k€)</h5>
              
              <div className="overflow-x-auto">
                <table className="w-full border text-center text-xs">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-2 border">Méthode de Choix</th>
                      <th className="p-2 border bg-indigo-50/50 text-indigo-900">Récession</th>
                      <th className="p-2 border text-slate-700">Stable</th>
                      <th className="p-2 border bg-emerald-50/50 text-emerald-900">Forte Demande</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategies.map((strat, idx) => {
                      const isWaldChosen = idx === maximinStrategyIdx;
                      const isMaximaxChosen = idx === maximaxStrategyIdx;
                      const isSavageChosen = idx === savageStrategyIdx;

                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 border font-extrabold text-left">{strat.name}</td>
                          <td className="p-3 border bg-indigo-50/30 font-mono font-bold text-indigo-950">{strat.mild}</td>
                          <td className="p-3 border font-mono font-semibold text-slate-600">{strat.stable}</td>
                          <td className="p-3 border bg-emerald-50/30 font-mono font-bold text-emerald-950">{strat.high}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual Resolution Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Wald badge */}
              <div className="bg-card p-4 rounded-2xl border text-center relative overflow-hidden">
                <span className="text-xs uppercase font-bold text-indigo-400 block mb-1">🛡️ Profil Wald (Sécurité)</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 block my-2">
                  {strategies[maximinStrategyIdx].name.split(':')[0]}
                </span>
                <div className="text-[10px] block text-emerald-600 bg-emerald-50 max-w-[140px] font-bold mx-auto px-2 py-0.5 rounded-full border border-emerald-100">
                  MaxiMin = {bestMaximinVal} k€
                </div>
              </div>

              {/* Maximax badge */}
              <div className="bg-card p-4 rounded-2xl border text-center relative overflow-hidden">
                <span className="text-xs uppercase font-bold text-indigo-400 block mb-1">🎰 Profil Gambler (Maximax)</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 block my-2">
                  {strategies[maximaxStrategyIdx].name.split(':')[0]}
                </span>
                <div className="text-[10px] block text-emerald-600 bg-emerald-50 max-w-[140px] font-bold mx-auto px-2 py-0.5 rounded-full border border-emerald-100">
                  MaxiMax = {bestMaximaxVal} k€
                </div>
              </div>

              {/* Savage badge */}
              <div className="bg-card p-4 rounded-2xl border text-center relative overflow-hidden">
                <span className="text-xs uppercase font-bold text-indigo-400 block mb-1">⚖️ Profil Savage (Regret min)</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 block my-2">
                  {strategies[savageStrategyIdx].name.split(':')[0]}
                </span>
                <div className="text-[10px] block text-amber-600 bg-amber-50 max-w-[140px] font-bold mx-auto px-2 py-0.5 rounded-full border border-amber-100">
                  Pire Regret = {bestRegretVal} k€
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Section title="⚖️ Introduction à la Théorie des Jeux Bilatéraux" icon="🎮" color="amber">
        <p className="mb-4">
          La <strong>théorie des jeux</strong> modélise le conflit stratégique interactif entre plusieurs participants rationnels indépendants (ex: duel marketing de guerre des prix de deux supermarchés rivaux).
        </p>

        <InfoBlock type="definition" title="Le Point-Selle (Saddle Point)">
          Dans un jeu à somme nulle à deux joueurs (où le gain de l'un est rigoureusement la perte de l'autre), un élément de la matrice est un <strong>point-selle (ou minimax)</strong> s'il est simultanément :
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Le minimum de sa ligne (protection Wald du joueur A).</li>
            <li>Le maximum de sa colonne (minimisation des pertes du joueur B).</li>
          </ul>
          Si un point-selle existe, les deux adversaires adoptent des stratégies pures rigides stables.
        </InfoBlock>

        <InfoBlock type="funfact" title="L'Équilibre de Nash">
          Formulé par John Nash (Nobel d'économie), c'est une liste de choix stratégiques (un profil) où <strong>aucun joueur n'a d'intérêt à dévier unilatéralement sa ligne d'action</strong>. Si un joueur change unilatéralement sa décision alors que les autres maintiennent la leur, son gain diminue ou s'effondre.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercice Décisoire Résolu" icon="🎓" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Établissement d'une matrice des regrets de Savage"
          question={
            <div>
              <p>
                Un promoteur de logistique portuaire de conteneurs décide d'implanter un nouveau hangar. 
                Ses estimations de rentabilité d'investissements s'établissent ainsi selon l'activité douanière :
              </p>
              <div className="overflow-x-auto my-3">
                <table className="w-full border text-center text-xs">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-2 border">Actions</th>
                      <th className="p-2 border">Activité Faible</th>
                      <th className="p-2 border">Activité Excellente</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-2 border font-bold">Investir Petit (S1)</td><td className="p-2 border">12 M€</td><td className="p-2 border">16 M€</td></tr>
                    <tr><td className="p-2 border font-bold">Investir Géant (S2)</td><td className="p-2 border">-3 M€</td><td className="p-2 border">30 M€</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="font-bold">1. Établir la matrice des regrets de Savage.</p>
              <p className="font-bold">2. En déduire la décision optimale de Savage.</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Repérer les opportunités d'optimum par État</p>
              <p className="my-2">
                Le gain maximum de chaque colonne (conjoncture) représente le point de référence sans regret :
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Colonne Activité Faible : Max = <MathComponent math="12\text{ M\euro}" />.</li>
                <li>Colonne Activité Excellente : Max = <MathComponent math="30\text{ M\euro}" />.</li>
              </ul>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Établir la Table des Regrets de Savage</p>
              <p className="my-2">
                On soustrait chaque cellule au maximum de sa colonne respective <MathComponent math="R_{ij} = \max_G - G_{ij}" /> :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border">
                <li>
                  Stratégie S1 :
                  <br />- Regret Faible = 12 - 12 = 0 M€.
                  <br />- Regret Excellent = 30 - 16 = 14 M€.
                  <br /><strong>Pire Regret S1 = 14 M€.</strong>
                </li>
                <li className="mt-2">
                  Stratégie S2 :
                  <br />- Regret Faible = 12 - (-3) = 15 M€.
                  <br />- Regret Excellent = 30 - 30 = 0 M€.
                  <br /><strong>Pire Regret S2 = 15 M€.</strong>
                </li>
              </ul>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Application du minimax des regrets et décis d'action</p>
              <p className="my-2">
                Le critère de Savage impose de retenir l'option affichant le pire regret le plus faible (la sécurité d'adaptation d'opportunité) :
              </p>
              <p className="font-mono text-center text-sm my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$\\text{Choix de Savage} = \\min(14 \\ ; \\ 15) = 14\\text{ M\\euro} \\implies \\text{Décision S1 (Investir Petit)}$"}
              </p>
              <p className="mt-4 font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200">
                ✓ Conclusion : La stratégie S1 offre un regret de 14M€ contre 15M€ pour le risque de faillite d'hangar vide. C'est S1 que la logique de Savage recommande !
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards stratégiques" icon="🧠" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Qu'est-ce qu'un jeu à somme nulle dans la modélisation de la théorie des jeux ?</>}
            back={<>{"C'est un conflit d'antagonisme absolu où la somme des gains de tous les participants est systématiquement égale à 0 (l'argent gagné par l'un est intégralement retiré à la caisse de l'adversaire)."}</>}
          />
          <Flashcard 
            front={<>Comment s'énonce mathématiquement le critère de Wald (MaxiMin) ?</>}
            back={<>{"C'est le choix de prudence qui maximise le pire rendement possible : $\\max_i \\left[ \\min_j G_{ij} \\right]$."}</>}
          />
        </div>
      </Section>

      <Section title="📜 Foire Aux Questions stratégiques (FAQ)" icon="🎓" color="indigo">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'équilibre de Nash est-il capital dans les théories des prix et de la concurrence ?",
              answer: "L'équilibre de Nash modélise des guerres commerciales stables. Par le célèbre dilemme du prisonnier, Nash montre que deux marques choisissant d'abaisser sauvagement leurs marges à l'équilibre gagnent au final moins que s'ils s'entendaient, démontrant l'apport de la coopération."
            },
            {
              question: "Est-ce qu'une matrice de jeu possède toujours un point-selle ?",
              answer: "Non, de nombreuses matrices de jeux ne détiennent aucun point-selle stable en stratégies pures. Les joueurs doivent alors passer à des 'stratégies mixtes' en appliquant des profils de probabilités aléatoires d'action pour dérouter l'adversaire."
            },
            {
              question: "Qu'est ce que le critère de décision de Hurwicz ?",
              answer: "Le critère de Hurwicz propose un compromis entre l'optimisme total et la panique : il pondère le gain maximal (optimisme) par un facteur alpha et le gain minimal (pessimisme) par un facteur (1-alpha)."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation de Décision" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle décision Wald retient-il si une ligne présente des gains de [-10 k€, 5 k€, 45 k€] et une autre [2 k€, 4 k€, 6 k€] ?",
              options: [
                "La seconde ligne (Pire gain = 2 k€)",
                "La première ligne (Pire gain = -10 k€)",
                "Aucune décision stable",
                "Un choix au hasard"
              ],
              correctAnswer: 0,
              explanation: "Le pire des cas pour la ligne 1 est de perdre -10 k€. Le pire des cas pour la ligne 2 est de gagner 2 k€. Wald maximise le pire cas : Max(-10, 2) = 2 k€, donc retient la ligne 2."
            },
            {
              question: "Dans le jeu de stratégie du Dilemme du Prisonnier, pourquoi l'équilibre de Nash est-il qualifié de sous-optimal ?",
              options: [
                "Parce qu'il existe une autre solution collective offrant un meilleur gain global pour les deux.",
                "Parce que les joueurs refusent de collaborer à l'ANOVA.",
                "Parce qu'il n'y a pas de point-selle.",
                "Parce que le gain final est nul."
              ],
              correctAnswer: 0,
              explanation: "À l'équilibre de Nash du dilemme, les deux partenaires commettent une défection, alors que s'ils s'étaient fait confiance, ils auraient subi des peines beaucoup plus clémentes."
            },
            {
              question: "Un critère de Savage à regret nul signifie :",
              options: [
                "Que nous avons pris la décision la plus mauvaise possible.",
                "Que pour n'importe quel état de la nature, nous avons réalisé le gain d'optimalité ultime.",
                "Que l'ANOVA est déséquilibrée.",
                "Que le jeu est à somme non nulle."
              ],
              correctAnswer: 1,
              explanation: "Un regret nul (0) signifie que la stratégie retenue concorde rigoureusement avec le maximum possible pour cet état de l'environnement."
            }
          ]}
        />
      </Section>

      <InteractiveChecklist 
        items={[
          "Je sais structurer les gains d'un choix en univers incertain sous forme de matrice.",
          "Je sais calculer les décisions optimales selon les règles de Wald, MaxiMax, Hurwicz et Savage.",
          "Je comprends les notions d'Équilibrés de Nash et le calcul de point-selle."
        ]}
      />
    </div>
  );
};

export default Course_BUT_Tertiaire_03_Theorie_Decision;
