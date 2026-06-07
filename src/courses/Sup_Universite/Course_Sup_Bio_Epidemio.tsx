import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Bio_Epidemio: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [beta, setBeta] = useState(0.35); // Taux de contact/transmission ajustable
  const [gamma, setGamma] = useState(0.15); // Taux de guérison ajustable

  // Simulation numérique déterministe du système SIR par méthode d'Euler
  // Paramètres initiaux
  const N_pop = 1000;
  const initialI = 5;
  const initialS = N_pop - initialI;
  const initialR = 0;

  // L'intégration numérique se fait sur 40 pas (jours)
  const stepsCount = 40;
  const dt = 1.0; // Pas de temps de 1 jour

  const sHistory: number[] = [initialS];
  const iHistory: number[] = [initialI];
  const rHistory: number[] = [initialR];

  let currentS = initialS;
  let currentI = initialI;
  let currentR = initialR;

  for (let step = 1; step <= stepsCount; step++) {
    // Équations différentielles approchées par Euler :
    // dS = -beta * S * I / N
    // dI = (beta * S * I / N - gamma * I)
    // dR = gamma * I
    const dS = -beta * currentS * currentI / N_pop;
    const dI = (beta * currentS * currentI / N_pop) - (gamma * currentI);
    const dR = gamma * currentI;

    currentS = Math.max(0, currentS + dS * dt);
    currentI = Math.max(0, currentI + dI * dt);
    currentR = Math.max(0, currentR + dR * dt);

    sHistory.push(currentS);
    iHistory.push(currentI);
    rHistory.push(currentR);
  }

  // Coordonnées pour l'affichage SVG (taille 500x320)
  const xOrigin = 55;
  const yOrigin = 270;
  const xScale = 10; // 40 pas sur 400 pixels
  const yScale = 0.22; // max pop 1000 sur 220 pixels

  const pointsS: string[] = sHistory.map((val, idx) => `${xOrigin + idx * xScale},${yOrigin - val * yScale}`);
  const pointsI: string[] = iHistory.map((val, idx) => `${xOrigin + idx * xScale},${yOrigin - val * yScale}`);
  const pointsR: string[] = rHistory.map((val, idx) => `${xOrigin + idx * xScale},${yOrigin - val * yScale}`);

  // Temps du pic infectieux
  const peakIVal = Math.max(...iHistory);
  const peakDay = iHistory.indexOf(peakIVal);

  const r0Value = beta / (gamma || 1);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-BIO"
        title="Sup Biologie : Modèles Épidémiologiques SIR"
        subtitle="Modélisation dynamique déterministe pour la santé publique : système différentiel couplé de Kermack-McKendrick et effet de seuil d'immunité."
        duration="2h 15"
        level="École Nationale d'Agronomie / Faculté de Médecine & Biostatistiques"
        prerequisites={["Systèmes différentiels linéaires", "Analyse qualitative de stabilité", "Éléments d'intégration numérique"]}
        objectives={[
          "Formuler rigoureusement les trois équations différentielles non linéaires du modèle SIR.",
          "Modéliser analytiquement le taux de propagation R0 d'un foyer pathogène.",
          "Déterminer et démontrer mathématiquement le seuil d'immunité collective de troupeau.",
          "Résoudre et analyser qualitativement un portrait de phase épidémique."
        ]}
      />

      <Section title="🌿 Modélisation Logique et Compartimentale du Vivant" icon="Dna" color="indigo">
        <p className="mb-4">
          Dans l'univers biologique et agronomique, comprendre la cinétique temporelle d'un pathogène (virus, bactérie, champignon) constitue une composante stratégique d'aide à la décision. 
          Pour cela, on utilise l'approche **compartimentale** développée en 1927 par William Kermack et Anderson McKendrick.
        </p>
        <p className="mb-4">
          La population est supposée d'effectif constant <MathComponent math="N" /> et cloisonnée en trois profils bien définis qui échangent de manière irréversible :
        </p>
        
        <InfoBlock type="definition" title="Les Compartiments SIR">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>S (Sains / Susceptibles) :</strong> Sujets sains n'ayant jamais été exposés au virus, et donc immunitairement vierges de toutes défenses.</li>
            <li><strong>I (Infectés / Contagieux) :</strong> Sujets transportant l'agent infectant et capables de le projeter activement aux susceptibilités voisines.</li>
            <li><strong>R (Rétablis / Retirés) :</strong> Sujets guéris qui ont développé des anticorps protecteurs durables, ou retirés de la population (neutralisation).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="⚙️ L'Équation Cinétique de Kermack-McKendrick" icon="Cpu" color="emerald">
        <p className="mb-4">
          La vitesse de transition d'une boîte à l'autre se modélise par un système homogène couplé d'équations différentielles non linéaires de premier ordre :
        </p>

        <FormulaBox 
          title="Le Système d'Équations Différentielles SIR" 
          math="\begin{aligned} \frac{dS}{dt} &= -\beta \cdot \frac{S \cdot I}{N} \\ \frac{dI}{dt} &= \beta \cdot \frac{S \cdot I}{N} - \gamma \cdot I \\ \frac{dR}{dt} &= \gamma \cdot I \end{aligned}" 
        />

        <p className="my-4">
          Où :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>{"\\beta"} (Taux de transmission) :</strong> Rend compte de la contagiosité moyenne liée aux nombres de contacts physiques rapprochés par jour.</li>
          <li><strong>{"\\gamma"} (Taux de guérison/rétablissement) :</strong> Définit l'effort immunitaire de neutralisation d'évacuation, équivalant à l'inverse de la durée d'infectiosité (<MathComponent math="D = 1/\gamma" />).</li>
        </ul>

        <InfoBlock type="reminder" title="Théorème de Conservation de Masse">
          En effectuant la somme des dérivées : <MathComponent math="\frac{dS}{dt} + \frac{dI}{dt} + \frac{dR}{dt} = 0" />. 
          Par intégration directe, l'effectif total est conservé à chaque instant de l'expérience :
          <MathComponent block math="S(t) + I(t) + R(t) = N" />
        </InfoBlock>
      </Section>

      <Section title="📊 Simulateur Numérique SIR (Méthode d'Euler)" icon="Sliders" color="indigo">
        <p className="mb-4 text-slate-700 dark:text-slate-300 font-medium">
          Ajustez les paramètres du virus. Observez l'évolution instantanée des Sains (courbe bleue), des Infectés (courbe rouge) et des Rétablis (courbe verte). Les équations différentielles sont intégrées dynamiquement à la seconde sous vos yeux.
        </p>

        {/* Panel de réglage */}
        <div className="bg-slate-950 text-white p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 shadow-inner border border-slate-800">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Taux de transmission (β) : {beta.toFixed(2)}
            </label>
            <input 
              type="range" min="0.10" max="0.80" step="0.05" value={beta} 
              onChange={(e) => setBeta(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <p className="text-[10px] text-slate-450 mt-1">Équivaut à la force de contagion par contact inter-compartiment.</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Taux de rétablissement (γ) : {gamma.toFixed(2)} (Durée : {(1/gamma).toFixed(1)} j)
            </label>
            <input 
              type="range" min="0.05" max="0.40" step="0.02" value={gamma} 
              onChange={(e) => setGamma(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <p className="text-[10px] text-slate-450 mt-1">Équivaut à la rapidité de guérison immunitaire.</p>
          </div>
        </div>

        {/* Tracé SVG interactif */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 500 300" className="w-full max-w-[450px] font-sans">
            {/* Grille axes */}
            <line x1={xOrigin} y1={yOrigin} x2="470" y2={yOrigin} stroke="#cbd5e1" strokeWidth="2" />
            <line x1={xOrigin} y1="30" x2={xOrigin} y2={yOrigin} stroke="#cbd5e1" strokeWidth="2" />

            {/* Tracés de courbes */}
            <path d={`M ${pointsS.join(' L ')}`} fill="none" stroke="#3b82f6" strokeWidth="3" />
            <path d={`M ${pointsI.join(' L ')}`} fill="none" stroke="#ef4444" strokeWidth="3.5" />
            <path d={`M ${pointsR.join(' L ')}`} fill="none" stroke="#10b981" strokeWidth="3" />

            {/* Projections du pic */}
            <line 
              x1={xOrigin + peakDay * xScale} y1={yOrigin} 
              x2={xOrigin + peakDay * xScale} y2={yOrigin - peakIVal * yScale} 
              stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3"
            />

            {/* Labels d'axes */}
            <text x="440" y="290" className="text-[10px] fill-slate-500 font-bold">Jours t</text>
            <text x="12" y="45" className="text-[10px] fill-slate-500 font-bold">Effectif N</text>

            {/* Légende rapide */}
            <text x="310" y="55" className="text-[10px] fill-blue-500 font-bold">{"Sains (S)"}</text>
            <text x="310" y="75" className="text-[10px] fill-red-500 font-bold">{"Infectés (I)"}</text>
            <text x="310" y="95" className="text-[10px] fill-emerald-500 font-bold">{"Rétablis (R)"}</text>
            <text x={xOrigin + peakDay * xScale - 15} y={yOrigin - peakIVal * yScale - 10} className="text-[9px] fill-red-650 font-bold">Pic : Jour {peakDay}</text>
          </svg>
        </div>

        {/* Détails Épidémiologiques */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Taux de Reproduction (R0)</p>
            <p className="text-xl text-blue-700 dark:text-blue-300 mt-1">{r0Value.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-2xl border border-red-100 dark:border-red-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Hauteur Maximal d'Infectés (I)</p>
            <p className="text-xl text-red-700 dark:text-red-300 mt-1">{peakIVal.toFixed(0)} d'individus</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Seuil épidémologique d'extinction</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{r0Value > 1 ? "Épidémie Active" : "Contrôlée"}</p>
          </div>
        </div>
      </Section>

      <Section title="🦠 Analyse qualitative et Nombre de reproduction R0" icon="CheckSquare" color="rose">
        <p className="mb-4">
          La clé du modèle réside dans l'étude analytique du démarrage de l'infection. Débutons avec un unique porteur viral dans une population de sujets intégralement sains (où <MathComponent math="S(0) \approx N" />). L'équation dynamique des infectés s'isole :
          <MathComponent block math="\frac{dI}{dt} = \left( \beta \cdot \frac{S}{N} - \gamma \right) I \approx (\beta - \gamma) I" />
        </p>
        <p className="mb-4">
          S'ensuit que <MathComponent math="I(t)" /> présente au début une croissance exponentielle de la forme <MathComponent math="I(t) \propto e^{(\beta - \gamma)t}" /> si et seulement si la constante exponentielle est positive (<MathComponent math="\beta > \gamma" />). On isole ainsi la formule du nombre de reproduction de base :
        </p>

        <FormulaBox 
          title="Taux de Reproduction de Base (R0)" 
          math="R_0 = \frac{\beta}{\gamma}" 
        />

        <InfoBlock type="warning" title="Philosophie Mathématique du R0">
          <ul className="list-dash pl-6 space-y-1">
            <li>Si <MathComponent math="R_0 > 1" /> : <MathComponent math="dI/dt > 0" /> au départ. Le virus s'installe d'abord sous forme de flambée épidémique.</li>
            <li>Si <MathComponent math="R_0 < 1" /> : <MathComponent math="dI/dt < 0" />. Le taux d'évacuation ou guérison bat le taux de transition, le virus s'éteint spontanément sans créer d'outbreak.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="💎 Études de cas mathématiques" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice corrigé 1 : Seuil d'immunité collective"
          question={<p>Afin d'endiguer une épidémie de grippe saisonnière de <MathComponent math="R_0 = 4" />, les autorités médicales lancent une campagne de vaccination massive. Calculer le pourcentage exact d'immunisation minimal de troupeau {"$g_c$"} requis pour éteindre immédiatement toute progression virale.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser la condition d'extinction</p>
              <p>L'extinction exige que le rythme de progression des infectés s'inverse, d'où :</p>
              <p><MathComponent block math="\frac{dI}{dt} \le 0 \implies \left( \beta \frac{S}{N} - \gamma \right) I \le 0" /></p>
              <p>Divisons par <MathComponent math="I > 0" />, d'où :</p>
              <p><MathComponent block math="\frac{S}{N} \le \frac{\gamma}{\beta} = \frac{1}{R_0}" /></p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Introduire le taux de vaccination gc</p>
              <p>Si une portion <MathComponent math="g_c" /> de la population totale est vaccinée/immunisée, alors la proportion de sujets sains sensibles restants est au plus de <MathComponent math="S/N = 1 - g_c" />.</p>
              <p>On exprime l'inéquation en termes de couverture vaccinale :</p>
              <p>{"$1 - g_c \\le \\frac{1}{R_0} \\implies g_c \\ge 1 - \\frac{1}{R_0}$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Application numérique avec R0 = 4</p>
              <p>En remplaçant par les valeurs données :</p>
              <p>{"$g_c \\ge 1 - \\frac{1}{4} = 0.75$"}.</p>
              <p>Il est indispensable de vacciner ou d'immuniser au moins <strong>75.0%</strong> de la population pour juguler complètement le foyer de grippe !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Mémorisation" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Le modèle Compartimental SIR est-il en mesure d'intégrer des taux de natalité et mortalité ?</>}
            back={<>Oui. C'est le modèle démographique SIR avec naissances et décès constants. L'équation de Sains devient : {"$\\frac{dS}{dt} = \\mu N - \\beta \\frac{SI}{N} - \\mu S$"}.</>}
          />
          <Flashcard 
            front={<>Pourquoi l'épidémie s'arrête-t-elle alors qu'il reste encore des individus sains de profil Susceptibles ?</>}
            back={<>Lorsque la fraction de Sains descend sous le seuil critique {"$1/R_0$"}, les infectés guérissent plus vite qu'ils ne contaminent, entraînant le repli définitif du virus.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Qu'est-ce que l'équation d'asymptote d'une épidémie ?">
          Par calcul de division d'équations <MathComponent math="dS/dI" />, Kermack-McKendrick démontrent une relation d'équilibre remarquable d'échéance à l'infini :
          <MathComponent block math="S(\infty) = S(0) \cdot e^{-R_0 \left( 1 - \frac{S(\infty)}{N} \right)}" />
          Cette relation prouve qu'une épidémie ne tue jamais la totalité des Sains (donc <MathComponent math="S(\infty) > 0" />).
        </Accordion>
        <Accordion title="2. Quelle limite présente un modèle SIR continu déterministe ?">
          Le modèle postule une homogénéité parfaite de mélange de population (chaque personne a la même probabilité de croiser n'importe quel individu) et ignore les réseaux complexes (clusters). Pour des analyses géographiques fines, on utilise plutôt des simulations multi-agents discrètes.
        </Accordion>
        <Accordion title="3. Quelles variantes de compartiments existent en biologie ?">
          On utilise fréquemment le modèle **SEIR**, qui insère un compartiment **E (Exposés / Incubés)** pour modéliser le temps de latence où le patient porte le virus de manière silencieuse sans être contagieux encore, ou le modèle **SIRS** où l'immunité décline avec le temps permettant au patient de redevenir sensible.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation épidémique" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si beta = 0.50 et la durée de la maladie est de 4 jours, que vaut la valeur du coefficient R0 ?",
              options: [
                "2.0 (donc épidémie active)",
                "0.125",
                "8.0"
              ],
              correctAnswer: 0,
              explanation: "Le taux de guérison gamma vaut 1/4 = 0.25. Par conséquent, R0 = beta / gamma = 0.50 / 0.25 = 2.0."
            },
            {
              question: "Quelle relation mathématique caractérise l'allure de la courbe de Sains S(t) ?",
              options: [
                "Strictement croissante",
                "Monotone strictement décroissante",
                "Indéfiniment cyclique et stable"
              ],
              correctAnswer: 1,
              explanation: "Comme dS/dt = -β*S*I/N <= 0 à tout instant t, les susceptibilités ne peuvent que décroître à long terme."
            },
            {
              question: "Que se passe-t-il lorsque le volume d'infectés atteint le pic maximum de l'épidémie ?",
              options: [
                "Le taux de Sains vaut précisément N / R0",
                "Il ne reste plus aucun sujet rétabli",
                "Le taux de transmission beta tend vers l'infini"
              ],
              correctAnswer: 0,
              explanation: "Au sommet de la courbe (pic), la dérivée dI/dt s'annule : dI/dt = (beta * S / N - gamma) I = 0 => S/N = gamma / beta = 1/R0, plaçant le niveau de sains restants exactement à N/R0."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais les fondements compartimentaux du modèle SIR.",
            "Je sais démontrer dynamiquement le taux de propagation de base R0.",
            "Je maîtrise le calcul analytique fermée du seuil d'immunité collective de troupeau.",
            "Je sais simuler qualitativement l'évolution en cascade des trois courbes."
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

export default Course_Sup_Bio_Epidemio;
