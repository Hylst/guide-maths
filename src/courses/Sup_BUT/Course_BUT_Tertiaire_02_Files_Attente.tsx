import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Tertiaire_02_Files_Attente: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // State for arrival rate (lambda) and service rate (mu) (customers per hour)
  const [lambda, setLambda] = useState(15);
  const [mu, setMu] = useState(20);

  // Calculations
  const rho = lambda / mu;
  const isSaturated = rho >= 1.0;

  // Queue metrics (Kendall notation M/M/1)
  const averageL = !isSaturated ? rho / (1 - rho) : Infinity; // Mean number of customers in system
  const averageLq = !isSaturated ? (rho * rho) / (1 - rho) : Infinity; // Mean number of customers in queue
  const averageW = !isSaturated ? (1 / (mu - lambda)) * 60 : Infinity; // Mean time in system (minutes)
  const averageWq = !isSaturated ? (rho / (mu - lambda)) * 60 : Infinity; // Mean wait time in queue (minutes)

  // Array representing visual customer queue depth
  // Caps at 12 avatars for SVG room boundaries
  const totalAvatars = !isSaturated ? Math.min(12, Math.round(averageLq + 1)) : 12;
  const avatars = Array.from({ length: isSaturated ? 12 : totalAvatars });

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-TER-02"
        title="Files d'Attente & Chaînes de Markov"
        subtitle="Modélisation statistique de l'attente logistique, processus de Poisson, modèle de Kendall M/M/1 et optimisation de guichets."
        duration="1h 25"
        level="BUT 2ème/3ème année (GEA / TC / MLT)"
        prerequisites={[
          "Lois de probabilité usuelles (Loi de Poisson, Loi Exponentielle)",
          "Suites géométriques convergentes"
        ]}
        objectives={[
          "Comprendre l'aspect probabiliste d'un flux de services industriels.",
          "Modéliser une file d'attente sous la notation standard de Kendall M/M/1.",
          "Calculer l'intensité du trafic (taux d'occupation), le nombre moyen de clients et le temps d'attente moyen.",
          "Démontrer la condition stationnaire d'équilibre et éviter la divergence d'engorgement."
        ]}
      />

      <Section title="⏱️ Le Défi de l'Attente Logistique" icon="⏳" color="indigo">
        <p className="mb-4">
          Un client qui attend trop longtemps au guichet d'une banque ou dans une file électronique de S.A.V. est un client perdu pour la marque. Inversement, recruter trop d'agents dégrade la rentabilité de l'entreprise.
        </p>

        <InfoBlock type="definition" title="La Notation de Kendall">
          Pour classifier les systèmes d'attente, on utilise l'écriture normalisée de Kendall : <strong>A / B / s / K</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li><strong>A :</strong> La loi de distribution du flux d'arrivée des clients (ex: <strong>M</strong> pour Markovien/Poisson, random).</li>
            <li><strong>B :</strong> La loi de distribution de la durée de traitement (ex: <strong>M</strong> pour exponentiel sans mémoire).</li>
            <li><strong>s :</strong> Le nombre de guichets ou serveurs en parallèle (ex: <strong>1</strong>).</li>
            <li><strong>K :</strong> La capacité totale maximale du système (infini si omis).</li>
          </ul>
        </InfoBlock>

        <p className="mt-4">
          Le modèle élémentaire et le plus répandu est la file <strong>M/M/1</strong> : les arrivées suivent un processus de Poisson de taux <MathComponent math="\lambda" /> par heure, le temps de service est exponentiel de moyenne <MathComponent math="1/\mu" />, avec un seul serveur.
        </p>
      </Section>

      <Section title="🧮 Lois Mathématiques de la file M/M/1" icon="📊" color="emerald">
        <p className="mb-4">
          Pour que le système de service tende vers un régime stationnaire équilibré (qu'il ne sature pas), l'intensité de trafic <MathComponent math="\rho" /> doit impérativement être inférieure à 100 %.
        </p>

        <FormulaBox title="Condition de Stabilité & Intensité de Trafic" math="\rho = \frac{\lambda}{\mu} < 1" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              Nombre moyen de clients
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-xs uppercase block text-indigo-600 font-bold">Dans le système complet (L) :</span>
                <FormulaBox math="L = \frac{\rho}{1 - \rho} = \frac{\lambda}{\mu - \lambda}" />
              </li>
              <li>
                <span className="text-xs uppercase block text-indigo-600 font-bold">Dans la file d'attente pure (Lq) :</span>
                <FormulaBox math="L_q = \frac{\rho^2}{1 - \rho}" />
              </li>
            </ul>
          </div>

          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              Temps moyen de séjour
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-xs uppercase block text-indigo-600 font-bold">Dans le système complet (W) :</span>
                <FormulaBox math="W = \frac{1}{\mu - \lambda}" />
              </li>
              <li>
                <span className="text-xs uppercase block text-indigo-600 font-bold">Dans la file d'attente pure (Wq) :</span>
                <FormulaBox math="W_q = \frac{\rho}{\mu - \lambda}" />
              </li>
            </ul>
          </div>
        </div>

        <InfoBlock type="warning" title="L'Effet non linéaire magique">
          Lorsque <MathComponent math="\rho" /> s'approche de <MathComponent math="1.0" /> (par exemple <MathComponent math="\rho = 0.95" />), l'attente n'augmente pas de manière linéaire : elle <strong>explose de manière hyperbolique</strong> ! 
          C'est le danger majeur des files d'attente : un guichet occupé à 95 % du temps n'a pas 95 % d'attente habituelle, il subit des congestions colossales.
        </InfoBlock>
      </Section>

      <Section title="🎮 Simulateur Interactif de Guichet unique" icon="🎮" color="purple">
        <p className="mb-6">
          Modifiez d'une part le flux moyen de clients arrivant à la caisse (<MathComponent math="\lambda" />) et d'autre part la vitesse d'encaissement de l'hôte de caisse (<MathComponent math="\mu" />). 
          Visualisez l'impact instantané sur l'intensité du trafic et observez l'allongement de la file de clients dessinée ci-dessous.
        </p>

        {/* Dynamic Supermarket Checkout Simulator */}
        <div className="bg-muted/50 dark:bg-slate-900 border border-border rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Column */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
              👥 Paramètres du Flux
            </h4>

            {/* Lambda Arrival Rate */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>⚡ Flux d'arrivée (<MathComponent math="\lambda" />) :</span>
                <span className="font-mono text-indigo-600 font-bold">{lambda} clients/h</span>
              </label>
              <input 
                aria-label="Taux d'arrivée"
                type="range" min="5" max="35" step="1" 
                value={lambda} onChange={(e) => setLambda(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Mu Service Rate */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>⏱️ Capacité de service (<MathComponent math="\mu" />) :</span>
                <span className="font-mono text-indigo-600 font-bold">{mu} clients/h</span>
              </label>
              <input 
                aria-label="Taux de service"
                type="range" min="10" max="40" step="1" 
                value={mu} onChange={(e) => setMu(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Metrics quick display */}
            <div className="bg-card p-4 rounded-2xl border text-center">
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Taux d'occupation caissier</span>
              <span className={`text-2xl font-black ${rho >= 1.0 ? 'text-rose-500' : rho >= 0.85 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {isSaturated ? '≥ 100%' : `${(rho * 100).toFixed(1)}%`}
              </span>
              <span className="text-[10px] block mt-1 text-slate-500">
                {isSaturated ? 'Saturation infinie !' : rho >= 0.85 ? 'Risque fort de congestion' : 'Fluide / Équilibré'}
              </span>
            </div>
          </div>

          {/* Graphical Queue Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border p-4 rounded-2xl shadow-inner relative overflow-hidden">
              <h5 className="font-bold text-sm text-foreground mb-4 flex items-center justify-between">
                <span>📋 Visualisation de la file à la Caisse</span>
                <span className="text-xs bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded">Taux de rotation réel</span>
              </h5>

              {/* Saturation Alert Banner overlay */}
              {isSaturated && (
                <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-xs flex flex-col justify-center items-center text-center p-4 z-10 transition-all">
                  <span className="bg-rose-600 text-white font-black text-xs uppercase px-4 py-2 rounded-full shadow-md animate-bounce mb-2">
                    🚨 SYSTEME CONGESTIONNÉ (λ ≥ μ)
                  </span>
                  <p className="text-xs font-semibold text-rose-900 max-w-sm">
                    Le flux d'arrivée dépasse la capacité matérielle de service. La file d'attente diverge de manière infinie ! Pour rétablir l'équilibre, augmentez la capacité de service ou ouvrez une seconde caisse.
                  </p>
                </div>
              )}

              {/* Queue drawing SVG */}
              <div className="my-2 bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 flex items-center justify-between">
                
                {/* SVG representing people inline */}
                <svg viewBox="0 0 400 100" className="w-full h-auto overflow-visible select-none">
                  {/* Checkout counter barrier */}
                  <rect x="360" y="20" width="30" height="60" fill="#cbd5e1" rx="4" />
                  <text x="375" y="55" className="text-[9px] fill-slate-600 font-bold text-center" textAnchor="middle">Caisse</text>
                  <circle cx="375" cy="35" r="4" fill="#ef4444" className="animate-pulse" />

                  {/* Cashier avatar */}
                  <circle cx="375" cy="73" r="6" fill="#4f46e5" />
                  
                  {/* Drawing queuing clients */}
                  {!isSaturated && avatars.map((_, idx) => {
                    const x = 330 - idx * 26; // Space them out
                    return (
                      <g key={idx} className="transition-all duration-300">
                        {/* Body */}
                        <path d={`M ${x-6} 80 C ${x-6} 65, ${x+6} 65, ${x+6} 80 Z`} fill={idx === 0 ? "#10b981" : "#94a3b8"} />
                        {/* Head */}
                        <circle cx={x} cy={60} r="5" fill={idx === 0 ? "#10b981" : "#94a3b8"} />
                        {/* Number Indicator */}
                        {idx === 0 && (
                          <text x={x} y={51} className="text-[6px] fill-emerald-600 font-bold" textAnchor="middle">Servi</text>
                        )}
                      </g>
                    );
                  })}
                  
                  {isSaturated && avatars.map((_, idx) => {
                    const x = 330 - idx * 26;
                    return (
                      <g key={idx}>
                        <path d={`M ${x-6} 80 C ${x-6} 65, ${x+6} 65, ${x+6} 80 Z`} fill="#ef4444" />
                        <circle cx={x} cy={60} r="5" fill="#ef4444" />
                      </g>
                    );
                  })}
                </svg>

              </div>
            </div>

            {/* Metrics panel showing calculations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Moyenne attente caisse</span>
                <span className="text-xl font-black text-indigo-900 dark:text-indigo-200">
                  {isSaturated ? '∞' : `${averageWq.toFixed(1)} min`}
                </span>
                <span className="text-[9px] block text-slate-400 mt-1">{"$W_q = \\frac{\\rho}{\\mu - \\lambda}$"}</span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Moyenne séjour total</span>
                <span className="text-xl font-black text-indigo-900 dark:text-indigo-200">
                  {isSaturated ? '∞' : `${averageW.toFixed(1)} min`}
                </span>
                <span className="text-[9px] block text-slate-400 mt-1">{"$W = \\frac{1}{\\mu - \\lambda}$"}</span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Nb moyen en file</span>
                <span className="text-xl font-black text-indigo-900 dark:text-indigo-200">
                  {isSaturated ? '∞' : averageLq.toFixed(2)}
                </span>
                <span className="text-[9px] block text-slate-400 mt-1">{"$L_q = L - \\rho$"}</span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Probabilité caisse vide</span>
                <span className="text-xl font-black text-indigo-900 dark:text-indigo-200">
                  {isSaturated ? '0%' : `${((1 - rho) * 100).toFixed(0)} %`}
                </span>
                <span className="text-[9px] block text-slate-400 mt-1">$P_0 = 1 - \rho$</span>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Section title="⚖️ Les Processus de Poisson : Modélisation Algébrique" icon="📊" color="amber">
        <p className="mb-4">
          Un flux d'arrivées "sans mémoire" et au hasard suit mathématiquement une <strong>Loi de Poisson</strong>. La probabilité d'enregistrer précisément <MathComponent math="k" /> arrivées de clients au cours d'une fenêtre de temps <MathComponent math="t" /> s'exprime par :
        </p>

        <FormulaBox title="Distribution de Poisson" math="P(X = k) = \frac{e^{-\lambda t} (\lambda t)^k}{k!}" />

        <p className="my-4">
          Tandis que l'intervalle de temps s'écoulant entre deux entrées de clients consécutives suit une <strong>loi exponentielle continue</strong> d'écart type <MathComponent math="1/\lambda" />.
        </p>

        <InfoBlock type="reminder" title="Comprendre le modèle M/M/1 via les chaines de Markov">
          La file d'attente à guichet unique s'étudie comme une chaîne de Markov à temps continu sur un espace d'états infini <MathComponent math="E = \{0, 1, 2, \dots\}" /> représentant le nombre de clients présents. 
          Les transitions n'ont lieu qu'entre états adjacents :
          <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
            <li>De l'état <MathComponent math="i" /> vers <MathComponent math="i+1" /> : Taux de transition <MathComponent math="\lambda" /> (arrivée d'un client).</li>
            <li>De l'état <MathComponent math="i" /> vers <MathComponent math="i-1" /> : Taux de transition <MathComponent math="\mu" /> (guichet libéré).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercice de logistique Résolu" icon="🎓" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Rentabilité et dimensionnement d'un bureau de vote"
          question={
            <div>
              <p>
                Un scrutin municipal regroupe un bassin d'électeurs. Le flux d'arrivée des votants est estimé à <MathComponent math="\lambda = 45\text{ votants/heure}" />. 
                Une urne tenue par un bénévole permet d'émarger et voter en moyenne en 1.2 minute par électeur (soit une capacité d'accueil exponentielle).
              </p>
              <p className="mt-2 font-bold">1. Calculer le taux de service horaire μ de l'urne.</p>
              <p className="font-bold">2. En déduire la longueur moyenne de la file d'attente devant l'isoloir.</p>
              <p className="font-bold">3. Calculer le temps d'attente moyen de séjour d'un citoyen.</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Calcul de la capacité de service horaire μ</p>
              <p className="my-2">
                Puisque l'émargement complet d'un électeur requiert 1.2 minute de service de façon unitaire, convertissons cette capacité d'action sur une durée horaire de d'une heure (60 minutes) :
              </p>
              <p className="font-mono text-center my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$\\mu = \\frac{60\\text{ minutes}}{1.2\\text{ minute/votant}} = 50\\text{ votants par heure}$"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Évaluation du taux d'occupation ρ et de la longueur Lq de la file</p>
              <p className="my-2">
                Le ratio d'intensité d'activité vaut : <MathComponent math="\rho = \frac{\lambda}{\mu} = \frac{45}{50} = 0.90" /> (l'urne est occupée à 90% du temps).
              </p>
              <p className="text-sm">
                Calculons la longueur moyenne de la file d'attente pure (Sujets en queue de file) :
              </p>
              <p className="font-mono text-center text-sm my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$L_q = \\frac{\\rho^2}{1 - \\rho} = \\frac{0.90^2}{1 - 0.90} = \\frac{0.81}{0.10} = 8.1\\text{ votants en file}$"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Estimation du temps d'attente moyen de présence</p>
              <p className="my-2">
                Le temps total passé à la mairie par un citoyen se formule par <MathComponent math="W = \frac{1}{\mu - \lambda}" /> :
              </p>
              <p className="font-mono text-center text-sm my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$W = \\frac{1}{50 - 45} = \\frac{1}{5}\\text{ d'heure} = 12\\text{ minutes total de présence}$"}
              </p>
              <p className="mt-4 font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200">
                ✓ Conclusion : Malgré une vitesse d'exécution très proche de l'arrivée (45 vs 50), la nature fluctuante et aléatoire des flux génère une file stable de 8 personnes et 12 minutes de présence. L'organisation est validée !
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de théorie des files" icon="🧠" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Selon la notation de Kendall, que signifie la lettre 'M' couramment rencontrée ?</>}
            back={<>{"Elle signifie 'Markovien' (sans mémoire), matérialisant des arrivées chaotiques selon une loi de Poisson, ou un service de loi Exponentielle."}</>}
          />
          <Flashcard 
            front={<>Qu'est-ce que l'indice d'intensité de trafic ρ (rho) exprime intuitivement ?</>}
            back={<>{"Il exprime la probabilité que le serveur soit occupé à servir un client à un instant t. C'est le taux d'utilisation de la ressource."}</>}
          />
        </div>
      </Section>

      <Section title="📜 Foire Aux Questions d'Attente (FAQ)" icon="🎓" color="indigo">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale de résultats entre les modèles M/M/1 et M/D/1 ?",
              answer: "Dans le modèle M/D/1, le temps de service est déterministe (D pour Deterministic, de variabilité nulle : ex: un composteur électronique automatique). Les files d'attente s'en trouvent divisées par deux car on supprime l'incertitude liée au rythme variable du serveur humain !"
            },
            {
              question: "Pourquoi l'attente semble toujours plus pénible psychologiquement pour un client ?",
              answer: "La loi d'optimisation commerciale tertiaire démontre que l'attente inoccupée paraît plus longue. Les managers logistiques déploient donc du marketing d'ambiance (écrans d'information, miroirs à côté des ascenseurs, friandises aux caisses) pour occuper passivement le cerveau du consommateur."
            },
            {
              question: "Comment traite-t-on le cas multi-serveur (modèle M/M/s) ?",
              answer: "Les lois de probabilités changent : les clients forment une unique file commune et sont orientés vers le premier des s guichets qui se libère. Ce modèle évite les files multiples asymétriques frustrantes et sature beaucoup moins vite à flux d'arrivée égal."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'évaluation de files" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une station-service accueille λ = 12 voitures/heure. Le pompiste gère μ = 15 voitures/heure. Quel est la probabilité de trouver la station vide ?",
              options: [
                "20 %",
                "80 %",
                "0 %",
                "50 %"
              ],
              correctAnswer: 0,
              explanation: "Le taux d'occupation de l'activité rho vaut λ/μ = 12/15 = 0.80 (80%). La probabilité que personne ne soit présent (station vide) vaut P0 = 1 - rho = 1 - 0.80 = 0.20 soit 20%."
            },
            {
              question: "Que se produit-il mathématiquement dans une file M/M/1 si λ devient strictement égal à μ ?",
              options: [
                "L'attente est stabilisée au niveau optimal.",
                "Le serveur chôme la moitié de sa journée.",
                "La file d'attente diverge de manière infinie car rho = 1.",
                "Le système s'inverse sous loi normale."
              ],
              correctAnswer: 2,
              explanation: "Dès que λ = μ, le diviseur (1-rho) de la formule de Little de la longueur devient 0, provoquant un comportement divergent et une file qui croît continuellement sans limite."
            },
            {
              question: "Quel modèle de Kendall correspond à une file d'attente à arrivées aléatoires, service fixe robotisé et 3 serveurs ?",
              options: [
                "M/M/1",
                "M/D/3",
                "D/M/1",
                "G/G/3"
              ],
              correctAnswer: 1,
              explanation: "M: arrivées Poisson; D: durée déterministe (fixe, automatisable); 3: trois guichets parallèles. Soit la file M/D/3."
            }
          ]}
        />
      </Section>

      <InteractiveChecklist 
        items={[
          "Je comprends la modélisation de flux d'un système à l'aide de données d'intervalles exponentiels.",
          "Je sais calculer l'intensité de trafic rho et identifier la barrière critique de saturation.",
          "Je maîtrise l'évaluation complète des files M/M/1 (L, Lq, W, Wq) et modélise les issues d'exploitations."
        ]}
      />
    </div>
  );
};

export default Course_BUT_Tertiaire_02_Files_Attente;
