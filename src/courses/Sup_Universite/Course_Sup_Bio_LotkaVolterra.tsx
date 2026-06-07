import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Bio_LotkaVolterra: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [alpha, setAlpha] = useState(0.40); // Taux de natalité ajustable des proies

  const beta = 0.02; // Taux de capture/prédation constante
  const gamma = 0.30; // Taux de mortalité naturelle des prédateurs
  const delta = 0.01; // efficacité de conversion nutritionnelle

  // Intégration numérique d'Euler Lotka-Volterra
  // Échelles temporelles : 40 pas de dx=0.5
  const stepsCount = 50;
  const dt = 0.5;

  const preysHistory: number[] = [];
  const predsHistory: number[] = [];

  let currentPrey = 35.0; // Proies initiales x(0)
  let currentPred = 10.0; // Prédateurs initiaux y(0)

  for (let step = 0; step <= stepsCount; step++) {
    preysHistory.push(currentPrey);
    predsHistory.push(currentPred);

    // dx = x*(alpha - beta * y)
    // dy = -y*(gamma - delta * x)
    const dx = currentPrey * (alpha - beta * currentPred);
    const dy = -currentPred * (gamma - delta * currentPrey);

    currentPrey = Math.max(2, currentPrey + dx * dt);
    currentPred = Math.max(2, currentPred + dy * dt);
  }

  // Coordonnées graphiques SVG (taille 500x320)
  const xOrigin = 55;
  const yOrigin = 270;
  const xScale = 8; // 50 pas sur 400 pixels
  const yScale = 2.4; // max population environ 100 sur 240 pixels

  const pointsPreys: string[] = preysHistory.map((val, idx) => `${xOrigin + idx * xScale},${yOrigin - val * yScale}`);
  const pointsPreds: string[] = predsHistory.map((val, idx) => `${xOrigin + idx * xScale},${yOrigin - val * yScale}`);

  // Point fixe non trivial calculé analytiquement :
  // x* = gamma / delta
  // y* = alpha / beta
  const eqPrey = gamma / delta;
  const eqPred = alpha / beta;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-BIO"
        title="Sup Biologie : Relations Proies-Prédateurs de Lotka-Volterra"
        subtitle="Modélisation différentielle non linéaire des écosystèmes : équations de compétition, étude des points fixes de phase, et cycles d'oscillations stables."
        duration="2h 15"
        level="École Nationale d'Agronomie / Faculté de Biologie & AgroParisTech"
        prerequisites={["Équations différentielles ordinaires (EDO)", "Jacobienne et linéarisation", "Plan de phase et portrait de stabilité"]}
        objectives={[
          "Formuler analytiquement les équations cellulaires couplées de Lotka-Volterra.",
          "Déterminer les états d'équilibre ou points fixes d'une dynamique d'espèces.",
          "Utiliser le théorème de Hartman-Grobman pour linéariser le système couplé.",
          "Démontrer l'existence d'une intégrale première (conservatrice) sur les trajectoires fermées."
        ]}
      />

      <Section title="🦊 La Dynamique des Écosystèmes Concurrents" icon="Compass" color="indigo">
        <p className="mb-4">
          Comment expliquer les fluctuations cycliques apparemment coordonnées des populations d'espèces sauvages dans la nature ? Durant la Première Guerre Mondiale, le biologiste italien Umberto d'Ancona observe une hausse surprenante de la proportion de poissons prédateurs (sélaciens) dans les filets de pêche de l'Adriatique, suite au coup d'arrêt de la pêche commerciale. 
        </p>
        <p className="mb-4">
          Le mathématicien **Vito Volterra** et le biostatisticien américain **Alfred Lotka** ont développé indépendamment, en 1925, l'ossature théorique de la **dynamique des populations sauvages**, posant les jalons de l'écologie mathématique moderne.
        </p>

        <InfoBlock type="definition" title="Le Cadre Biologique">
          On suit simultanément la cinétique évolutive de deux populations d'individus qui interagissent :
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>x(t) :</strong> L'effectif des <strong>proies</strong> (ex: lapins) disposant d'une ressource végétale illimitée.</li>
            <li><strong>y(t) :</strong> L'effectif des <strong>prédateurs</strong> (ex: renards) dépendants exclusivement de la prédation des proies pour subsister.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="⚙️ Les Équations Différentielles de Lotka-Volterra" icon="Cpu" color="emerald">
        <p className="mb-4">
          La cinétique de croissance couplée s'auto-régule à travers un système autonome d'équations différentielles de premier ordre fortement couplé :
        </p>

        <FormulaBox 
          title="Modèle Proie-Prédateur de Lotka-Volterra" 
          math="\begin{aligned} \frac{dx}{dt} &= x \cdot (\alpha - \beta \cdot y) \\ \frac{dy}{dt} = -y \cdot (\gamma - \delta \cdot x) \end{aligned}" 
        />

        <p className="my-4">
          Où :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>{"\\alpha"} (Natalité des proies) :</strong> La vitesse naturelle d'explosion des proies en l'absence de prédateurs sauvages.</li>
          <li><strong>{"\\beta"} (Taux de prédation) :</strong> Modélise l'efficacité de capture des prédateurs lors des rencontres proies-prédateurs.</li>
          <li><strong>{"\\gamma"} (Mortalité des prédateurs) :</strong> Le coefficient de déclin naturel des carnivores dénués de proies de chasse.</li>
          <li><strong>{"\\delta"} (Efficacité nutritionnelle) :</strong> Le taux d'aptitude à engendrer de nouvelles descendances viables à partir de l'apport énergétique carnasse consommé.</li>
        </ul>
      </Section>

      <Section title="📊 Simulateur Numérique de cycles Proies-Prédateurs" icon="Sliders" color="indigo">
        <p className="mb-4 text-slate-705 dark:text-slate-300 font-medium">
          Ajustez le curseur du taux de croissance <MathComponent math="\alpha" /> des proies. Regardez comment la constante de natalité déplace et étire les cycles géométriques d'oscillations. Observez le décalage de phase typique : les prédateurs (courbe rose) grimpent toujours un quart de cycle après la prolifération de leurs proies alimentaires (courbe verte).
        </p>

        {/* Panel de commande */}
        <div className="bg-slate-950 text-white p-5 rounded-3xl mb-8 shadow-inner border border-slate-800">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
            Taux de Natalité des Proies (α) : {alpha.toFixed(2)}
          </label>
          <input 
            type="range" min="0.20" max="0.65" step="0.05" value={alpha} 
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Graphique SVG des oscillations */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 500 300" className="w-full max-w-[450px] font-sans">
            {/* Grille axes */}
            <line x1={xOrigin} y1={yOrigin} x2="470" y2={yOrigin} stroke="#cbd5e1" strokeWidth="2" />
            <line x1={xOrigin} y1="30" x2={xOrigin} y2={yOrigin} stroke="#cbd5e1" strokeWidth="2" />

            {/* Légende en fond */}
            <text x="320" y="55" className="text-[10px] fill-emerald-600 font-bold">{"Proies - x(t)"}</text>
            <text x="320" y="75" className="text-[10px] fill-rose-500 font-bold">{"Prédateurs - y(t)"}</text>

            {/* Tracés de courbes stochastiques d'Euler */}
            <path d={`M ${pointsPreys.join(' L ')}`} fill="none" stroke="#10b981" strokeWidth="3" />
            <path d={`M ${pointsPreds.join(' L ')}`} fill="none" stroke="#f43f5e" strokeWidth="3" />

            {/* Axes Labels */}
            <text x="440" y="290" className="text-[10px] fill-slate-500 font-bold">Temps t</text>
            <text x="12" y="45" className="text-[10px] fill-slate-500 font-bold">Effectif</text>
          </svg>
        </div>

        {/* Détails du point stable */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Équilibre stationnaire Proies (x*)</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{eqPrey.toFixed(0)} individus</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Équilibre stationnaire Prédateurs (y*)</p>
            <p className="text-xl text-rose-700 dark:text-rose-300 mt-1">{eqPred.toFixed(0)} individus</p>
          </div>
        </div>
      </Section>

      <Section title="⚙️ Portrait de Phase et Résolution Qualitative" icon="CheckSquare" color="purple">
        <p className="mb-4">
          La résolution analytique directe du système différentiel couplé de Lotka-Volterra est une impasse car les fonctions ne s'intègrent pas de manière circulaire élémentaire. En revanche, l'analyse qualitative de stabilité apporte des réponses exactes.
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">1. Recherche de points fixes d'annulation</h3>
        <p className="mb-4">
          Les points fixes d'arrêt de dérive répondent aux équations d'annulations des vitesses <MathComponent math="dx/dt = 0" /> et <MathComponent math="dy/dt = 0" />. On isole exactement deux points stationnaires :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Le point d'extinction totale : <MathComponent math="(x^*, y^*) = (0, 0)" />.</li>
          <li>Le point d'équilibre dynamique symbiotique : 
            <MathComponent block math="(x^*, y^*) = \left( \frac{\gamma}{\delta}, \frac{\alpha}{\beta} \right)" />
          </li>
        </ul>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">2. Existence d'une constante d'intégration première</h3>
        <p className="mb-4">
          En mariant les deux équations différentielles croisées par division : 
          <MathComponent block math="\frac{dy}{dx} = \frac{-y(\gamma - \delta x)}{x(\alpha - \beta y)} \implies \frac{\alpha - \beta y}{y} dy + \frac{\gamma - \delta x}{x} dx = 0" />
        </p>
        <p className="mb-4">
          Par intégration séparable immédiate, nous démontrons l'existence d'un invariant conservationniste stochastique remarquable :
        </p>
        <FormulaBox 
          title="Intégrale Première Invariante H" 
          math="H(x, y) = \delta \cdot x - \gamma \cdot \ln(x) + \beta \cdot y - \alpha \cdot \ln(y) = Cc_{\text{onstante}}" 
        />
        <p className="my-4 text-slate-600 dark:text-slate-400 font-semibold">
          Comme les trajectoires de phase se résument aux courbes de niveaux fermées de la fonction de Lyapunov H, les effectifs décrivent des orbites parfaitement cycliques ne pouvant converger ni diverger à l'infini !
        </p>
      </Section>

      <Section title="🎯 Résolution pas à pas de cas pratiques" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice d'analyse : Linéarisation jacobienne autour du point fixe"
          question={<p>Déterminer la matrice jacobienne du système de Lotka-Volterra au point d'équilibre non trivial {"$(x^*, y^*) = (\\gamma/\\delta, \\alpha/\\beta)$"} et prouver qu'il s'agit localement d'un centre neutre d'oscillation stable (valeurs propres complexes imagées pures).</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Calculer la matrice jacobienne générale</p>
              <p>Soit le champ de vecteur différentiel géométrique :</p>
              <p><MathComponent block math="f(x, y) = \alpha x - \beta xy \quad \text{et} \quad g(x, y) = \delta xy - \gamma y" /></p>
              <p>Les dérivées d'évaluation s'écrivent :</p>
              <p><MathComponent block math="J(x, y) = \begin{pmatrix} \frac{\partial f}{\partial x} & \frac{\partial f}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y} \end{pmatrix} = \begin{pmatrix} \alpha - \beta y & -\beta x \\ \delta y & \delta x - \gamma \end{pmatrix}" /></p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Évaluer au point fixe désigné</p>
              <p>Substituons <MathComponent math="x^* = \gamma/\delta" /> et <MathComponent math="y^* = \alpha/\beta" /> :</p>
              <p><MathComponent block math="J(x^*, y^*) = \begin{pmatrix} \alpha - \beta(\alpha/\beta) & -\beta(\gamma/\delta) \\ \delta(\alpha/\beta) & \delta(\gamma/\delta) - \gamma \end{pmatrix} = \begin{pmatrix} 0 & -\frac{\beta \gamma}{\delta} \\ \frac{\delta \alpha}{\beta} & 0 \end{pmatrix}" /></p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Résoudre l'équation aux valeurs propres</p>
              <p>Le polynôme caractéristique associé s'obtient ainsi :</p>
              <p>{"$\\det(J - \\lambda I) = \\lambda^2 - \\text{Tr}(J)\\lambda + \\det(J) = \\lambda^2 + \\alpha \\gamma = 0$"}</p>
              <p>D'où deux valeurs propres imaginaires conjuguées pures symétriques : </p>
              <p>{"$\\lambda_{1, 2} = \\pm i \\sqrt{\\alpha \\gamma}$"}.</p>
              <p>L'absence de partie réelle prouve que le système décrit localement un **centre stable** oscillant de période propre {"$T = 2\\pi / \\sqrt{\\alpha \\gamma}$"}. C'est la confirmation mathématique rigoureuse des cycles d'espèces !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Mémorisation active" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Qu'arrive-t-il au système de Lotka-Volterra si la pêche industrielle prélève une part constante de poissons ?</>}
            back={<>C'est le Paradoxe de Volterra : pêcher prélève les deux groupes de façon proportionnelle, mais cela augmente l'effectif stationnaire moyen des proies (x*) tout en détruisant les prédateurs (y*).</>}
          />
          <Flashcard 
            front={<>Le système de Lotka-Volterra présente-t-il un comportement de chaos stochastique déterministe ?</>}
            back={<>Non. Comme le système n'a que 2 dimensions continues, le théorème de Poincaré-Bendixson interdit toute trajectoire chaotique stochastique erratique. Il faut au moins 3 dimensions (ex: attracteur de Lorenz).</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Comment rendre ce modèle proie-prédateur plus biologiquement réaliste ?">
          Pour pallier l'hypothèse de foisonnement illimité des proies en l'absence de prédateurs, on insère un facteur de saturation logistique d'habitat de capacité d'accueil limite <MathComponent math="K" /> : <MathComponent math="dx/dt = \alpha x(1 - x/K) - \beta xy" />. Ceci tasse l'hyperbole pour stabiliser les équilibres en s'épurant des oscillations cycliques infinies au profit d'équilibres fixes amortis.
        </Accordion>
        <Accordion title="2. Qu'est-ce que la réponse fonctionnels d'Holling ?">
          Holling a modélisé que le prélèvement d'un prédateur décline par saturation psychologique de digestion quand la densité de proies abonde. On injecte une fonction d'Holling de type II de taux de prédation de la forme <MathComponent math="a \frac{x}{1+ahx}" /> au lieu de la simple forme linéaire <MathComponent math="\beta x" />, complexifiant ainsi l'analyse de bifurcation.
        </Accordion>
        <Accordion title="3. Pourquoi appelle-t-on d'Ancona le fondateur empirique de Lotka-Volterra ?">
          Parce qu'il a mesuré d'importantes séries temporelles historiques de prises de bateaux entre Trieste et Fiume avant et après la guerre de 14-18, prouvant que la baisse de l'effort de pêche modifiait structurellement le ratio symbiotique de prédation maritime.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation de dynamique biologique" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la nature du point stationnaire trivial (0, 0) dans le modèle de Lotka-Volterra ?",
              options: [
                "Un foyer attracteur asymptotiquement stable (creuset)",
                "Un point-selle instable de divergence asymétrique",
                "Un centre stable de rotation simple"
              ],
              correctAnswer: 1,
              explanation: "Autour de l'origine (0,0), la jacobienne produit une valeur propre positive (alpha, croissance des proies) et une valeur propre négative (-gamma, déclin des prédateurs). C'est la modélisation parfaite d'un point col ou point-selle instable binaire."
            },
            {
              question: "Si la constante de natalité des proies alpha double brutalement, le point fixe stationnaire des prédateurs y* :",
              options: [
                "Est divisé par 2",
                "Est multiplié par 2 car y* = alpha / beta",
                "Reste exactement inchangé"
              ],
              correctAnswer: 1,
              explanation: "D'après la formule y* = alpha / beta, la quantité d'équilibre de prédateurs que l'environnement peut soutenir est proportionnelle à la fertilité naturelle des proies."
            },
            {
              question: "Dans quel sens tourne le portrait de phase de Lotka-Volterra (avec les proies x en abscisse et prédateurs y en ordonnée) ?",
              options: [
                "Dans le sens trigonométrique direct",
                "Dans le sens horaire des aiguilles d'une montre",
                "Le mouvement se fige instantanément"
              ],
              correctAnswer: 0,
              explanation: "La trajectoire décrit des orbites closes parcourues dans le sens trigonométrique : d'abord prolifération des proies x, suivie de la prolifération retardée de prédateurs y, provoquant l'effondrement des proies x puis enfin l'extinction des prédateurs y."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais formuler le système différentiel de Lotka-Volterra.",
            "Je sais dériver les points fixes d'équilibre stationnaire biologique.",
            "Je maîtrise la linéarisation jacobienne autour des états stationnaires.",
            "Je comprends la déviation temporelle déphasée des cycles d'espèces."
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

export default Course_Sup_Bio_LotkaVolterra;
