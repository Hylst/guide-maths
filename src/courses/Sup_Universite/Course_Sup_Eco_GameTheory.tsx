import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Eco_GameTheory: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [c1, setC1] = useState(20); // Coût marginal ajustable de la firme 1
  const c2 = 20; // Coût marginal constant de la firme 2
  const a = 100; // Demande maximale : P(Q) = a - bQ
  const b = 1; // Pente de la demande

  // Cournot Équilibre calcul
  // q1* = (a - 2*c1 + c2) / 3b
  // q2* = (a - 2*c2 + c1) / 3b
  const q1Star = Math.max(0, (a - 2 * c1 + c2) / (3 * b));
  const q2Star = Math.max(0, (a - 2 * c2 + c1) / (3 * b));
  
  // Coordonnées graphiques SVG pour tracer les droites de réaction
  // Droite de réaction 1 : q1*(q2) = (a - c1 - b*q2) / 2b => q2 = (a - c1)/b - 2 q1
  // Droite de réaction 2 : q2*(q1) = (a - c2 - b*q1) / 2b => q2 = (a - c2)/2b - q1/2
  const scale = 2.5;
  const originX = 50;
  const originY = 320;

  // Points reaction firme 1 (q1 en abscisse, q2 en ordonnée)
  // q1 = 0 => q2 = (a - c1) / b ; q2 = 0 => q1 = (a - c1) / 2b
  const rf1_x1 = originX;
  const rf1_y1 = originY - (a - c1) * scale;
  const rf1_x2 = originX + ((a - c1) / 2) * scale;
  const rf1_y2 = originY;

  // Points reaction firme 2
  // q1 = 0 => q2 = (a - c2) / 2b ; q2 = 0 => q1 = (a - c2) / b
  const rf2_x1 = originX;
  const rf2_y1 = originY - ((a - c2) / 2) * scale;
  const rf2_x2 = originX + (a - c2) * scale;
  const rf2_y2 = originY;

  // Coordonnées du point d'équilibre de Cournot-Nash
  const eqX = originX + q1Star * scale;
  const eqY = originY - q2Star * scale;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-ECO"
        title="Sup Économie : Duopoles et Théorie des Jeux"
        subtitle="Modélisation stratégique des oligopoles concurrentiels : équilibres stables de Cournot, Bertrand et Stackelberg."
        duration="2h 15"
        level="École supérieure de Commerce / Université de Sciences Économiques"
        prerequisites={["Écritures fonctions de profit", "Optimisation unimodale", "Notion d'équilibre de Nash"]}
        objectives={[
          "Savoir formuler analytiquement les fonctions de réaction ou meilleure réponse de deux firmes.",
          "Dériver l'équilibre de Cournot-Nash de jeux de quantité.",
          "Comprendre le paradoxe de Bertrand sur la guerre des prix.",
          "Modéliser le duopole asymétrique séquentiel de Stackelberg."
        ]}
      />

      <Section title="🏁 Strategic Oligopolies : Introduction aux jeux" icon="Gamepad2" color="indigo">
        <p className="mb-4">
          Comment les grandes entreprises déterminent-elles leurs volumes de production ou leurs prix de vente sur des marchés à forte intensité concurrentielle ? Contrairement au monopole ou à la concurrence parfaite, l'oligopole est le domaine de la <strong>théorie des jeux</strong> : chaque firme doit tenir compte des choix supposés de sa rivale pour assurer sa propre rentabilité.
        </p>
        <p className="mb-4">
          L'étude formelle des duopoles (marchés à deux vendeurs) s'exprime par le concept fondamental d'<strong>équilibre de Nash</strong> : une configuration macroéconomique où aucune firme ne souhaite unilatéralement dévier de sa stratégie actuelle.
        </p>
        <InfoBlock type="definition" title="Le Marché Linéaire">
          On modélise la demande de marché de biens par une fonction inverse de prix décroissante :
          <MathComponent block math="P(Q) = a - b \cdot Q \quad \text{avec} \quad Q = q_1 + q_2" />
          Où :
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><MathComponent math="P" /> représente le prix d'équilibre de vente sur le marché.</li>
            <li><MathComponent math="q_1, q_2" /> sont les volumes de production respectifs des deux firmes concurrentes.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="⚔️ Le Modèle de Cournot : Concurrence par les Quantités" icon="Workflow" color="emerald">
        <p className="mb-4">
          Dans le modèle d'Antoine Augustin Cournot, les firmes fixent de manière <strong>simultanée</strong> leurs quantités respectives produites <MathComponent math="q_1" /> et <MathComponent math="q_2" />. Le prix de vente s'ajuste ensuite sur le marché.
        </p>
        <p className="mb-4">
          Chaque firme <MathComponent math="i" /> cherche à maximiser sa propre fonction de profit, qui dépend également des choix de production de son homologue :
          <MathComponent block math="\Pi_i(q_1, q_2) = P(q_1 + q_2) \cdot q_i - c_i \cdot q_i = (a - bq_1 - bq_2)q_i - c_i q_i" />
        </p>

        <InfoBlock type="reminder" title="Les fonctions de meilleure réponse">
          Pour trouver la réaction optimale de la firme 1 face à un volume arbitraire <MathComponent math="q_2" /> choisi par son homologue, on dérive son profit par rapport à <MathComponent math="q_1" /> :
          <MathComponent block math="\frac{\partial \Pi_1}{\partial q_1} = a - 2bq_1 - bq_2 - c_1 = 0 \implies q_1^*(q_2) = \frac{a - c_1 - bq_2}{2b}" />
          C'est la <strong>fonction de réaction</strong> de la firme 1. De manière analogue, la réaction de la firme 2 s'exprime :
          <MathComponent block math="q_2^*(q_1) = \frac{a - c_2 - bq_1}{2b}" />
        </InfoBlock>
      </Section>

      <Section title="⚖️ Simulateur Interactif des Courbes de Réaction" icon="Sliders" color="indigo">
        <p className="mb-4">
          Ajustez le curseur pour simuler une modification du coût marginal de production de la firme 1 (<MathComponent math="c_1" />). Voyez comment sa courbe de réaction (en violet) se déplace, déplaçant par conséquent le point d'équilibre de Nash vers une configuration asymétrique favorable à la firme 2 !
        </p>

        {/* Panel de Contrôle */}
        <div className="bg-slate-950 text-white p-5 rounded-3xl mb-8 shadow-inner border border-slate-800">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
            Coût Marginal Firme 1 (c₁) : {c1} €
          </label>
          <input 
            type="range" min="10" max="50" step="5" value={c1} 
            onChange={(e) => setC1(parseInt(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Graphique SVG des droites de réaction */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 450 350" className="w-full max-w-[420px] font-sans">
            {/* Axes */}
            <line x1="50" y1="320" x2="420" y2="320" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="320" stroke="#cbd5e1" strokeWidth="2" />

            {/* Droite de réaction firme 1 */}
            <line 
              x1={rf1_x1} y1={rf1_y1} 
              x2={rf1_x2} y2={rf1_y2} 
              stroke="#8b5cf6" 
              strokeWidth="3" 
            />

            {/* Droite de réaction fime 2 */}
            <line 
              x1={rf2_x1} y1={rf2_y1} 
              x2={rf2_x2} y2={rf2_y2} 
              stroke="#10b981" 
              strokeWidth="3" 
            />

            {/* Point d'équilibre de Cournot-Nash */}
            <circle cx={eqX} cy={eqY} r="7" fill="#ef4444" stroke="white" strokeWidth="2" />

            {/* Projections du point d'équilibre */}
            <line x1={eqX} y1={eqY} x2={eqX} y2="320" stroke="#ef4444" strokeDasharray="3 3" />
            <line x1={eqX} y1={eqY} x2="50" y2={eqY} stroke="#ef4444" strokeDasharray="3 3" />

            {/* Labels et Légende */}
            <text x="400" y="342" className="text-xs fill-slate-500 font-bold">Quantité q₁</text>
            <text x="12" y="35" className="text-xs fill-slate-500 font-bold">Quantité q₂</text>
            <text x={eqX - 18} y="338" className="text-xs fill-slate-800 font-bold">{"q₁*"}</text>
            <text x="25" y={eqY + 4} className="text-xs fill-slate-800 font-bold">{"q₂*"}</text>
            
            <text x={rf1_x2 + 10} y="310" className="text-xs fill-violet-500 font-bold">{"R₁"}</text>
            <text x={rf2_x2 - 15} y="310" className="text-xs fill-emerald-500 font-bold">{"R₂"}</text>
          </svg>
        </div>

        {/* Indication des volumes */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-violet-50 dark:bg-violet-950/40 p-4 rounded-2xl border border-violet-100 dark:border-violet-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Quantité Firme 1 (q₁*)</p>
            <p className="text-xl text-violet-700 dark:text-violet-300 mt-1">{q1Star.toFixed(2)} unités</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Quantité Firme 2 (q₂*)</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{q2Star.toFixed(2)} unités</p>
          </div>
        </div>
      </Section>

      <Section title="💎 Modèles Alternatifs : Bertrand et Stackelberg" icon="Combine" color="amber">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">1. Le Paradoxe de Bertrand (Concurrence par les prix)</h3>
            <p className="mb-4">
              Joseph Bertrand postule en 1883 que les clients choisissent toujours le fournisseur le moins cher. Si les firmes choisissent simultanément non pas leurs volumes de production mais leurs <strong>prix nominaux de vente</strong> <MathComponent math="p_1" /> et <MathComponent math="p_2" />, la rivalité s'envenime. 
            </p>
            <p className="mb-4">
              Si <MathComponent math="p_1 > p_2" />, la firme 2 capture 100% de la clientèle. La firme 1 a donc intérêt à sous-coter son prix d'un centime d'euro. Cette baisse mutuelle agressive conduit à l'unique équilibre :
            </p>
            <FormulaBox 
              title="Condition d'Équilibre de Bertrand (Paradoxe)" 
              math="p_1^* = p_2^* = Cc_{\text{marginal}}" 
            />
            <p className="my-4 font-semibold text-slate-600 dark:text-slate-400">
              C'est le paradoxe : deux firmes suffisent à recréer l'exacte concurrence parfaite où les profits des monopoles s'évaporent complètement.
            </p>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">2. Le Duopole Séquentiel de Stackelberg (Asymétrie)</h3>
            <p className="mb-4">
              Heinrich von Stackelberg introduit la notion de temporalité asymétrique. Un <strong>Leader</strong> (firme 1, précurseur de marché) choisit sa quantité en premier. Le <strong>Follower</strong> (firme 2) observe ce choix et y réagit ensuite selon sa propre courbe de réponse <MathComponent math="q_2^*(q_1)" />.
            </p>
            <p className="mb-4">
              Le leader intègre cette anticipation rationnelle directement dans sa fonction de profit avant de prendre sa décision :
              <MathComponent block math="\max_{q_1} \Pi_1(q_1, q_2^*(q_1)) = \left(a - bq_1 - b\left( \frac{a - c_2 - bq_1}{2b} \right)\right)q_1 - c_1 q_1" />
            </p>
            <InfoBlock type="warning" title="Avantage au Premier Entrant (First-Mover Advantage)">
              Comme le leader impose sa quantité en contraignant le follower à réduire sa propre voilure, Stackelberg prouve que le leader obtient un profit strictement supérieur à l'équilibre symétrique de Cournot-Nash.
            </InfoBlock>
          </div>
        </div>
      </Section>

      <Section title="🎯 Exercice Résolu pas à pas" icon="BookOpen" color="emerald">
        <InteractiveExercise
          title="Exercice d'évaluation : Équilibre de Cournot vs Stackelberg"
          question={<p>Soit la demande de marché {"$P(Q) = 140 - Q$"} (avec <MathComponent math="Q=q_1+q_2" />). Les deux firmes ont un coût marginal constant et identique de <MathComponent math="c=20" />€. Calculer l'équilibre de Cournot-Nash symétrique, puis comparer au duopole séquentiel de Stackelberg où la firme 1 est leader.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Obtenir les fonctions de réaction symétriques</p>
              <p>Le profit de la firme 1 s'écrit :</p>
              <p><MathComponent block math="\Pi_1 = (140 - q_1 - q_2)q_1 - 20q_1 = (120 - q_1 - q_2)q_1" /></p>
              <p>On annule la dérivée partielle par rapport à <MathComponent math="q_1" /> :</p>
              <p><MathComponent block math="120 - 2q_1 - q_2 = 0 \implies q_1^*(q_2) = \frac{120 - q_2}{2}" /></p>
              <p>Par symétrie, la réaction de la firme 2 correspond à : <MathComponent math="q_2^*(q_1) = \frac{120 - q_1}{2}" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Résolution du point d'équilibre de Cournot</p>
              <p>On résout le système d'équations :</p>
              <p><MathComponent block math="q_1 = \frac{120 - \frac{120 - q_1}{2}}{2} = 30 + \frac{q_1}{4} \implies \frac{3}{4} q_1 = 30 \implies q_1^C = 40" /></p>
              <p>Par symétrie, <MathComponent math="q_2^C = 40" />. La production totale vaut <MathComponent math="Q^C = 80" /> pour un prix <MathComponent math="P^C = 140 - 80 = 60" />€.</p>
              <p>Profit de chaque firme : <MathComponent math="\Pi^C = (60 - 20) \times 40 = 1600" />€.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Résolution de l'asymétrie de Stackelberg</p>
              <p>La firme 1, leader, anticipe que <MathComponent math="q_2^*(q_1) = 60 - 0.5 q_1" />.</p>
              <p>Elle substitue dans son profit :</p>
              <p><MathComponent block math="\Pi_1^S = (120 - q_1 - (60 - 0.5 q_1))q_1 = (60 - 0.5 q_1)q_1" /></p>
              <p>Par optimisation de la dérivée : <MathComponent math="60 - q_1 = 0 \implies q_1^S = 60" />.</p>
              <p>Le follower réagit : <MathComponent math="q_2^S = 60 - 0.5 \times 60 = 30" />.</p>
              <p>Production totale : <MathComponent math="Q^S = 90" />. Prix de vente : <MathComponent math="P^S = 140 - 90 = 50" />€.</p>
              <p>Profit du leader : <MathComponent math="\Pi_1^S = (50 - 20) \times 60 = 1800" />€ (supérieur à Cournot !).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de révision" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Quel est l'unique critère suffisant caractérisant un équilibre de Nash stable ?</>}
            back={<>Aucun des agents stratégiques ne peut augmenter ses gains ou bénéfices de façon unilatérale, en conservant le choix des rivaux inchangé.</>}
          />
          <Flashcard 
            front={<>Quelle différence fondamentale sépare Bertrand et Cournot ?</>}
            back={<>Bertrand théorise la lutte concurrentielle par les prix (profits marginaux réduits à néant) tandis que Cournot étudie la concurrence rationnelle par les volumes.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Comment les firmes contournent-elles le paradoxe destructeur de Bertrand ?">
          Pour éviter de réduire leurs prix de vente à leur coût marginal de production et ruiner leurs marges, les entreprises différencient leurs produits (image de marque, brevets, innovations) ou mettent en oeuvre des clauses d'alignement de prix, détruisant l'hypothèse d'homogénéité du modèle.
        </Accordion>
        <Accordion title="2. Qu'arrive-t-il si les firmes décident de s'entendre (Cartel) ?">
          Si elles coopèrent, elles agissent à la manière d'un unique monopole en résolvant la maximisation du profit total partagé. Elles réduisent la production globale pour faire bondir les prix artificiellement. Cependant, c'est une configuration instable : chaque firme a une tentation rationnelle d'enfreindre secrètement l'accord (triche) pour accaparer l'intégralité du marché. Ce dilemme s'exprime comme un authentique Dilemme du Prisonnier.
        </Accordion>
        <Accordion title="3. Quelle est la pertinence pratique de la théorie séquentielle de Stackelberg ?">
          Elle s'applique précisément aux situations où une entreprise historique majeure, très bien dotée en capital, installe ses infrastructures de production à grande échelle en premier, face à de petits rivaux (followers) qui s'introduisent à posteriori sur des segments résiduels du marché.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est l'équilibre d'un jeu de duopole de Bertrand avec coûts marginaux de production identiques 'c' ?",
              options: [
                "p1 = p2 = c (les prix égalent les coûts marginaux)",
                "p1 = p2 = Prix de monopole",
                "Les prix oscillent indéfiniment sans s'arrêter"
              ],
              correctAnswer: 0,
              explanation: "Comme les clients choisissent toujours le moins cher, la seule issue stable où aucun ne souhaite unilatéralement s'aligner ou dévier est de converger vers le coût de production physique (P=Cm)."
            },
            {
              question: "Par rapport à l'équilibre de Cournot, le duopole séquentiel de Stackelberg propose un volume global de biens :",
              options: [
                "Strictement inférieur, augmentant les prix",
                "Exactement équivalent",
                "Strictement supérieur, baissant le prix moyen pour le consommateur"
              ],
              correctAnswer: 2,
              explanation: "Le duopole de Stackelberg produit un volume de biens global plus élevé (Q = 3/4 (a-c) contre Q = 2/3 (a-c) pour Cournot), ce qui en fait un modèle socialement plus vertueux pour le consommateur final."
            },
            {
              question: "Que représente analytiquement une équation de meilleure réponse ou courbe de réaction ?",
              options: [
                "L'évolution temporelle de la bourse d'échange",
                "Le choix idéal d'une firme rationnelle pour toute valeur imagée de son adversaire",
                "Le coût total global lié aux impôts"
              ],
              correctAnswer: 1,
              explanation: "La fonction de réaction q1*(q2) trace le plan d'action optimal ou meilleure réponse de la firme 1 face à n'importe quelle stratégie q2 choisie par son concurrent."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la nature d'un équilibre stratégique de Nash.",
            "Je sais dériver les fonctions d'action optimale de Cournot.",
            "Je maîtrise le mécanisme d'induction à rebours du duopole séquentiel de Stackelberg.",
            "Je comprends les enjeux concurrentiels de la guerre des prix de Bertrand."
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

export default Course_Sup_Eco_GameTheory;
