import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Eco_Solow: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [s, setS] = useState(0.25); // Taux d'épargne
  const [n, setN] = useState(0.02); // Croissance démographique
  const [delta, setDelta] = useState(0.05); // Taux de dépréciation
  const A = 1.5; // Technologie fixe
  const alpha = 0.4; // Élasticité du capital

  // Calcul du capital stationnaire k*
  // k* = (s * A / (n + delta))^(1 / (1 - alpha))
  const denominator = n + delta;
  const kStar = Math.pow((s * A) / denominator, 1 / (1 - alpha));
  const yStar = A * Math.pow(kStar, alpha);
  const cStar = (1 - s) * yStar; // Consommation stationnaire par habitant

  // Coordonnées pour tracer l'SVG d'équilibre de l'état stationnaire
  // On projette sur l'intervalle k de 0 à 150
  const pointsSavings: string[] = [];
  const pointsOutput: string[] = [];
  const maxK = 12;
  const scaleX = 40;
  const scaleY = 120;
  
  for (let ki = 0.1; ki <= maxK; ki += 0.2) {
    const yi = A * Math.pow(ki, alpha);
    const si = s * yi;
    const px = ki * scaleX + 50;
    const pyOutput = 350 - yi * scaleY;
    const pySavings = 350 - si * scaleY;
    pointsOutput.push(`${px},${pyOutput}`);
    pointsSavings.push(`${px},${pySavings}`);
  }

  // Ligne de dépréciation n + delta : (n + delta) * k
  const lineDeprX2 = maxK * scaleX + 50;
  const lineDeprY2 = 350 - (denominator * maxK) * scaleY;

  // Point stationnaire
  const pxStar = kStar * scaleX + 50;
  const pyStarSavings = 350 - (s * yStar) * scaleY;
  const pyStarOutput = 350 - yStar * scaleY;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-ECO"
        title="Sup Économie : Le Modèle de Solow"
        subtitle="Optimisation de la production macroéconomique : équations aux différences, capital par tête, et état stationnaire à long terme."
        duration="2h 00"
        level="École supérieure de Commerce / Université de Sciences Économiques"
        prerequisites={["Équations différentielles", "Dérivabilité et concavité", "Calcul de limites"]}
        objectives={[
          "Comprendre l'origine microéconomique de la fonction de production Cobb-Douglas.",
          "Savoir dériver l'équation fondamentale de Solow.",
          "Calculer et simuler analytiquement le stock de capital d'état stationnaire k*.",
          "Déterminer la Règle d'Or de l'accumulation du capital (optimisation de la consommation)."
        ]}
      />

      <Section title="🌿 Introduction Pédagogique : Pourquoi Modéliser la Croissance ?" icon="💡" color="indigo">
        <p className="mb-4">
          Pourquoi certains pays accumulent-ils plus de richesses que d'autres à long terme ? Comment l'épargne d'une nation influence-t-elle le niveau de vie de ses habitants ? Ce sont les questions fondamentales résolues de manière rigoureuse par <strong>Robert Solow</strong> (Prix Nobel d'Économie 1987). 
        </p>
        <p className="mb-4">
          L'originalité du modèle de Solow est de formaliser mathématiquement de manière dynamique comment une économie épargne, investit, subit la dépréciation matérielle et assiste au renouvellement de sa force de travail. Cet outil fournit aux décideurs publics les clés pour maximiser durablement le bien-être économique et la consommation de la population.
        </p>
        <InfoBlock type="info" title="L'Hypothèse Fondamentale : Marché Parfait">
          Le modèle de Solow suppose une économie à un seul bien de consommation/investissement produit dans un environnement concurrentiel parfait où les rendements d'échelle sont constants mais les rendements des facteurs de production individuels sont décroissants.
        </InfoBlock>
      </Section>

      <Section title="⚙️ La Fonction de Production de Cobb-Douglas" icon="⚙️" color="emerald">
        <p className="mb-4">
          L'offre globale de biens et services d'une économie est représentée par une fonction mathématique globale qui relie le PIB réel <MathComponent math="Y" /> aux facteurs capital physique <MathComponent math="K" /> et travail humain <MathComponent math="L" />.
        </p>

        <FormulaBox 
          title="Fonction de Production Cobb-Douglas" 
          math="Y = F(K, L) = A \cdot K^\alpha \cdot L^{1-\alpha} \quad \text{avec} \quad 0 < \alpha < 1" 
        />

        <p className="my-4">
          Où :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>A (Efficacité Globale des Facteurs) :</strong> Mesure le progrès technique, la productivité globale et la qualité institutionnelle.</li>
          <li><strong>{"\\alpha"} (Élasticité de la production au capital) :</strong> Représente la part historique des profits du capital dans le PIB total (environ 0.3 à 0.4 dans les pays développés).</li>
        </ul>

        <InfoBlock type="reminder" title="Propriété d'Homogénéité de Degré 1">
          La fonction de production possède la caractéristique remarquable de présenter des <strong>rendements d'échelle constants</strong>. Si l'on double simultanément le volume du capital et le nombre de travailleurs, la production totale double exactement :
          <MathComponent block math="F(\lambda K, \lambda L) = A (\lambda K)^\alpha (\lambda L)^{1-\alpha} = \lambda F(K, L)" />
        </InfoBlock>

        <p className="my-4">
          C'est précisément cette propriété qui nous autorise à normaliser toutes les équations par rapport à la taille de la population actively employée <MathComponent math="L" /> (en posant <MathComponent math="\lambda = 1/L" />) afin d'étudier l'intensité capitalistique par travailleur :
        </p>
        <FormulaBox 
          title="Variables par tête" 
          math="k = \frac{K}{L} \quad (\text{Capital par tête}), \quad y = \frac{Y}{L} \quad (\text{Production par tête})" 
        />
        <p className="my-4">
          Ainsi, en substituant dans la Cobb-Douglas :
          <MathComponent block math="y = \frac{F(K, L)}{L} = F\left(\frac{K}{L}, 1\right) = A \cdot k^\alpha" />
        </p>
        
        <InfoBlock type="funfact" title="La loi des rendements décroissants de Solow">
          Bien que les rendements d'échelle soient constants pour l'économie générale, les rendements factoriels pour le capital <MathComponent math="k" /> sont strictement <strong>décroissants</strong> :
          <MathComponent block math="f'(k) = \alpha A k^{\alpha-1} > 0 \quad \text{et} \quad f''(k) = \alpha(\alpha-1)A k^{\alpha-2} < 0" />
          Chaque unité additionnelle de capital par travailleur (nouveau PC, nouvelle machine) accroît la productivité individuelle mais de façon de moins en moins prononcée.
        </InfoBlock>
      </Section>

      <Section title="📊 Simulateur Interactif de l'Équilibre de Solow" icon="Sliders" color="indigo">
        <p className="mb-4 font-medium text-slate-700 dark:text-slate-300">
          Ajustez les curseurs ci-dessous pour modifier dynamiquement les paramètres macroéconomiques. Observez comment la courbe d'investissement croise la droite de dépréciation au point stationnaire <MathComponent math="k^*" />.
        </p>

        {/* Panel de Contrôle */}
        <div className="bg-slate-950 text-white p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 shadow-inner border border-slate-800">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Taux Épargne (s) : {(s * 100).toFixed(1)} %
            </label>
            <input 
              type="range" min="0.10" max="0.50" step="0.01" value={s} 
              onChange={(e) => setS(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Croissance démo (n) : {(n * 100).toFixed(1)} %
            </label>
            <input 
              type="range" min="0.01" max="0.10" step="0.01" value={n} 
              onChange={(e) => setN(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Dépréciation (δ) : {(delta * 100).toFixed(1)} %
            </label>
            <input 
              type="range" min="0.02" max="0.15" step="0.01" value={delta} 
              onChange={(e) => setDelta(parseFloat(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>
        </div>

        {/* Graphique SVG Interactif */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 600 400" className="w-full max-w-[550px] font-sans">
            {/* Grille Arrière plan */}
            <line x1="50" y1="350" x2="550" y2="350" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="50" x2="50" y2="350" stroke="#cbd5e1" strokeWidth="2" />

            {/* Tracé de la Production : y = A * k^alpha */}
            <path 
              d={`M ${pointsOutput.join(' L ')}`} 
              fill="none" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />
            {/* Tracé de l'Épargne : s * A * k^alpha */}
            <path 
              d={`M ${pointsSavings.join(' L ')}`} 
              fill="none" 
              stroke="#6366f1" 
              strokeWidth="4" 
            />

            {/* Tracé de la Dépréciation Générale : (n + delta) * k */}
            <line 
              x1="50" y1="350" 
              x2={lineDeprX2} y2={lineDeprY2} 
              stroke="#ef4444" 
              strokeWidth="3" 
            />

            {/* Ligne d'équilibre stationnaire k* */}
            <line 
              x1={pxStar} y1="350" 
              x2={pxStar} y2={pyStarOutput} 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="3 3"
            />

            {/* Points d'intersection */}
            <circle cx={pxStar} cy={pyStarSavings} r="6" fill="#6366f1" stroke="white" strokeWidth="2" />
            <circle cx={pxStar} cy={pyStarOutput} r="6" fill="#10b981" stroke="white" strokeWidth="2" />

            {/* Labels textuels */}
            <text x="530" y="375" className="text-xs fill-slate-500 font-bold">Capital k</text>
            <text x="15" y="45" className="text-xs fill-slate-500 font-bold">Flux y, i, d</text>
            
            <text x={lineDeprX2 - 20} y={lineDeprY2 - 10} className="text-xs fill-rose-500 font-bold">{"(n+δ)k"}</text>
            <text x="450" y="300" className="text-xs fill-indigo-500 font-bold">{"s f(k)"}</text>
            <text x="450" y="160" className="text-xs fill-slate-400 font-medium">{"f(k)"}</text>
            
            {/* Label k* */}
            <text x={pxStar - 10} y="368" className="text-xs fill-emerald-600 font-bold">{"k*"}</text>
            <text x={pxStar - 10} y={pyStarOutput - 12} className="text-xs fill-emerald-600 font-bold">{"y*"}</text>
          </svg>
        </div>

        {/* Détails Numériques */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Capital stationnaire k*</p>
            <p className="text-2xl text-indigo-700 dark:text-indigo-300 mt-1">{kStar.toFixed(3)}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Production stationnaire y*</p>
            <p className="text-2xl text-emerald-700 dark:text-emerald-300 mt-1">{yStar.toFixed(3)}</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Consommation c*</p>
            <p className="text-2xl text-rose-700 dark:text-rose-300 mt-1">{cStar.toFixed(3)}</p>
          </div>
        </div>
      </Section>

      <Section title="📐 L'Équation Dynamique Fondamentale" icon="📐" color="rose">
        <p className="mb-4">
          Le stock de capital <MathComponent math="K" /> s'accroît grâce à l'investissement global <MathComponent math="I" /> mais se réduit par l'usure physique (taux <MathComponent math="\delta" />) :
          <MathComponent block math="\dot{K} = \frac{dK}{dt} = I - \delta K" />
        </p>
        <p className="mb-4">
          Dans une économie fermée à l'équilibre, l'investissement représente exactement la proportion épargnée du revenu national complet, d'où <MathComponent math="I = s Y" />.
          Mais comment varie l'intensité capitale <MathComponent math="k = K/L" /> au cours du temps, sachant que la population ouvrière <MathComponent math="L" /> croît de manière continue au rythme exponentiel <MathComponent math="\dot{L}/L = n" /> ?
        </p>
        <p className="mb-4">
          Par différenciation mathématique de quotient :
          <MathComponent block math="\dot{k} = \frac{d}{dt}\left(\frac{K}{L}\right) = \frac{\dot{K} \cdot L - K \cdot \dot{L}}{L^2} = \frac{\dot{K}}{L} - \frac{K}{L} \cdot \frac{\dot{L}}{L}" />
        </p>
        <p className="mb-4">
          En substituant <MathComponent math="\dot{K}/L = s y - \delta k" /> et <MathComponent math="\dot{L}/L = n" />, on obtient l'équation de transition dynamique de Solow :
        </p>

        <FormulaBox 
          title="Équation de Transition Fondamentale de Solow" 
          math="\dot{k} = s \cdot f(k) - (n + \delta)k" 
        />

        <p className="my-4">
          Cette équation fondamentale stipule que la variation temporelle du capital par travailleur dépend de la différence entre l'investissement national effectif par habitant <MathComponent math="s f(k)" /> et le sillage requis pour équiper les nouveaux nés et compenser la vieillesse des machines <MathComponent math="(n+\delta)k" /> (point mort de l'investissement).
        </p>

        <InfoBlock type="warning" title="Stabilité asymptotique de l'État Stationnaire">
          <ul className="list-dash pl-6 space-y-1">
            <li>Si <MathComponent math="s f(k) > (n + \delta)k" /> : La courbe d'investissement est au-dessus. Le capital par tête s'accroît (<MathComponent math="\dot{k} > 0" />) vers la droite.</li>
            <li>Si <MathComponent math="s f(k) < (n + \delta)k" /> : La dépréciation l'emporte. Le capital se détériore (<MathComponent math="\dot{k} < 0" />) vers la gauche.</li>
            <li>Si <MathComponent math="s f(k) = (n + \delta)k" /> : Équilibre stationnaire stable complet (<MathComponent math="k^*" />), l'économie cesse de croître par tête.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="👑 Règle d'Or de Phelps (Golden Rule of Accumulation)" icon="🏆" color="purple">
        <p className="mb-4">
          Le but ultime d'un État n'est pas d'avoir le plus gros tas de machines possible (<MathComponent math="k^*" />), mais d'en tirer le bien-être social maximal. Le bien-être se mesure par la **consommation par habitant** à l'état stationnaire :
          <MathComponent block math="c^* = f(k^*) - s f(k^*) = f(k^*) - (n+\delta)k^*" />
        </p>
        <p className="mb-4">
          Pour trouver le taux d'épargne d'Or <MathComponent math="s_{\text{or}}" /> qui maximise la fonction de consommation stationnaire par rapport à <MathComponent math="k^*" />, on dérive <MathComponent math="c^*" /> par rapport à <MathComponent math="k^*" /> et l'on annule l'expression :
          <MathComponent block math="\frac{\partial c^*}{\partial k^*} = f'(k^*) - (n+\delta) = 0 \implies f'(k^*_{\text{or}}) = n + \delta" />
        </p>

        <FormulaBox 
          title="Règle d'Or de Phelps (Golden Rule)" 
          math="f'(k^*_{\text{or}}) = n + \delta \implies \alpha \cdot A (k^*_{\text{or}})^{\alpha-1} = n + \delta" 
        />

        <InfoBlock type="definition" title="Interprétation Écomathématique">
          La productivité marginale nette du capital à l'équilibre stationnaire doit être égale au taux de croissance démographique augmenté du taux d'usure physique. À ce stade exact de Règle d'Or, le taux d'épargne de la nation est égal à l'élasticité <MathComponent math="\alpha" /> : 
          <MathComponent block math="s_{\text{or}} = \alpha" />
        </InfoBlock>
      </Section>

      <Section title="💎 Résolution pas à pas d'exercices" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul complet de l'état stationnaire"
          question={<p>Soit une économie caractérisée par une fonction de Cobb-Douglas <MathComponent math="Y = K^{0.3} L^{0.7}" /> (donc <MathComponent math="A=1" />, <MathComponent math="\alpha=0.3" />). Le taux d'épargne vaut <MathComponent math="s = 20\%" />, le taux de dépréciation vaut <MathComponent math="\delta = 8\%" /> et la croissance de la main d'œuvre vaut <MathComponent math="n = 2\%" />. Calculer analytiquement le capital d'équilibre par tête <MathComponent math="k^*" /> et la production associée <MathComponent math="y^*" />.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser l'équation stationnaire d'égalité</p>
              <p>On sait que <MathComponent math="s \cdot f(k^*) = (n + \delta)k^*" />, soit ici :</p>
              <p><MathComponent math="0.20 \cdot (k^*)^{0.3} = (0.02 + 0.08) k^* = 0.10 \cdot k^*" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Isoler le rapport k*</p>
              <p>En divisant par <MathComponent math="(k^*)^{0.3}" />, nous établissons :</p>
              <p>{"$\\frac{0.20}{0.10} = 2 = \\frac{k^*}{(k^*)^{0.3}} = (k^*)^{0.7}$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Résoudre et déterminer k* et y*</p>
              <p>En élevant à la puissance inverse <MathComponent math="1/0.7 = 10/7 \approx 1.428" />, on termine :</p>
              <p><MathComponent math="k^* = 2^{\frac{1}{0.7}} = 2^{1.428} \approx 2.69" />.</p>
              <p>La production stationnaire par travailleur vaut alors : <MathComponent math="y^* = (k^*)^{0.3} = 2.69^{0.3} \approx 1.348" />.</p>
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Dérivée et Taux d'épargne optimal de Règle d'Or"
          question={<p>En conservant les paramètres de l'Exercice 1 (<MathComponent math="n=2\%" />, <MathComponent math="\delta=8\%" /> et <MathComponent math="\alpha=0.3" />), trouver la valeur exacte de l'intensité capitalistique d'équilibre de la règle d'or <MathComponent math="k^*_{\text{or}}" /> et déterminer le taux de l'épargne optimum qui y conduit.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser la condition de la Règle d'Or de Phelps</p>
              <p>La condition exige que <MathComponent math="f'(k^*_{\text{or}}) = n + \delta" />.</p>
              <p>Avec <MathComponent math="f(k) = k^{0.3}" />, on calcule la dérivée marginale : <MathComponent math="f'(k) = 0.3 k^{-0.7}" />.</p>
              <p>D'où l'équation d'égalité : <MathComponent math="0.3 \cdot (k^*_{\text{or}})^{-0.7} = 0.02 + 0.08 = 0.10" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Isoler le capital Kor</p>
              <p>Divisons par 0.3 : <MathComponent math="(k^*_{\text{or}})^{-0.7} = \frac{0.10}{0.3} = \frac{1}{3}" />.</p>
              <p>Pour éliminer le signe moins, inversons l'expression : <MathComponent math="(k^*_{\text{or}})^{0.7} = 3" />.</p>
              <p>D'où : <MathComponent math="k^*_{\text{or}} = 3^{\frac{1}{0.7}} = 3^{1.428} \approx 4.80" />.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Déduire la règle de Phelps pour s</p>
              <p>Par définition analytique, à la Règle d'Or, le taux d'épargne stationnaire optimal vaut :</p>
              <p>{"$s_{\\text{or}} = \\alpha = 30\\%$"}. Un pays voulant maximiser la consommation par tête de ses retraités et ouvriers à long terme doit épargner et investir exactement 30% du PIB total.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de mémorisation" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Quelle est la formule fondamentale de l'évolution du capital par tête dans le modèle de Solow ?</>}
            back={<>C'est {"$\\dot{k} = s f(k) - (n + \\delta)k$"} où {"$s f(k)$"} est l'investissement par tête, {"$n$"} est la croissance démographique et {"$\\delta$"} est la dépréciation.</>}
          />
          <Flashcard 
            front={<>Quel comportement présente le taux de croissance du capital par tête à l'état stationnaire ?</>}
            back={<>Le taux de croissance s'annule, soit {"$\\dot{k} = 0$"}. Les variables par tête ne croissent plus, l'économie a convergé vers sa productivité asymptotique limite.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Qu'est-ce que l'effet de convergence induit par Solow ?">
          Solow démontre la convergence absolue ou conditionnelle : deux pays partageant des taux d'épargne d'équilibre et de démographie proches convergeront irrémédiablement vers le même niveau stationnaire final de richesse par tête, quel que soit leur niveau de départ historique. Un pays pauvre bénéficie de rendements marginaux du capital initial très importants, ce qui le motive à croître très vite au démarrage pour rattraper son retard.
        </Accordion>
        <Accordion title="2. D'où vient la croissance à très long terme s'il y a un déclin stationnaire ?">
          Pour Solow, la seule chose qui permet de maintenir la croissance continue de la richesse par habitant est le <strong>progrès technique (A) exogène</strong>. Si l'indicateur d'innovation croît au taux permanent <MathComponent math="g" />, alors à long terme la production et le capital par tête croîtront tous deux précisément au taux permanent <MathComponent math="g" />, justifiant les investissements technologiques.
        </Accordion>
        <Accordion title="3. Quel est l'aspect négatif de sur-épargner au-delà de la Règle d'Or ?">
          Si une population épargne une fraction absurde de son PIB (ex: <MathComponent math="s = 75\%" />), son capital stationnaire sera énorme mais la population sera appauvrie, car elle investit presque tout pour l'amortissement d'un surplus colossal de machines redondantes. C'est l'<strong>inefficacité dynamique</strong>.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on double le capital K et le travail L de la Cobb-Douglas, par quel facteur la production Y est-elle multipliée ?",
              options: [
                "2 (la fonction présente des rendements d'échelle constants)",
                "4 (la fonction présente des rendements proportionnels au carré)",
                "Racine de 2 (rendements marginaux cumulés comprimés)"
              ],
              correctAnswer: 0,
              explanation: "Du fait que alpha + (1 - alpha) = 1, la fonction de Cobb-Douglas est homogène de degré 1, traduisant des rendements d'échelle constants globaux."
            },
            {
              question: "Quel comportement présente l'allure d'une courbe de production par tête y = f(k) ?",
              options: [
                "Strictement croissante et convexe",
                "Strictement croissante et concave",
                "Une droite parfaitement linéaire"
              ],
              correctAnswer: 1,
              explanation: "Comme f'(k) > 0 et f''(k) < 0, la fonction croît à taux décroissant, signifiant des rendements cumulés concaves."
            },
            {
              question: "Que se passe-t-il lorsque s*f(k) est strictement supérieur au point mort (n+δ)k ?",
              options: [
                "L'économie subit un effondrement dû au sur-stock",
                "Le capital par habitant augmente naturellement",
                "Les taux d'intérêt sans risque deviennent imaginaires"
              ],
              correctAnswer: 1,
              explanation: "Lorsque l'épargne dépasse le renouvellement d'usure, il y a accumulation nette positive (dot{k} > 0), poussant le capital par habitant à augmenter."
            },
            {
              question: "Pour quelle valeur de s le niveau de la consommation stationnaire par habitant est-il à son maximum absolu ?",
              options: [
                "s = 0",
                "s = alpha (Règle d'Or de Phelps)",
                "s = 1 (Épargne totale)"
              ],
              correctAnswer: 1,
              explanation: "Selon la règle d'accumulation d'Or de Phelps, la consommation utile est maximale lorsque le taux d'épargne d'équilibre s est précisément égal à l'exposant d'élasticité alpha."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je comprends les notions de variables par habitant (k et y) et leur dérivation.",
            "Je sais démontrer et résoudre l'équation macroéconomique stable de Robert Solow.",
            "Je maîtrise la résolution analytique de k* et y* à l'état stationnaire d'une Cobb-Douglas.",
            "Je sais énoncer les caractéristiques mathématiques de la Règle d'Or de Phelps."
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

export default Course_Sup_Eco_Solow;
