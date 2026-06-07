import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Tertiaire_01_Ordonnancement_PERT: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // State for task durations in PERT network project
  const [durA, setDurA] = useState(4); // Task A: Conception (prerequisite for B and C)
  const [durB, setDurB] = useState(3); // Task B: Marketing (prerequisite for D)
  const [durC, setDurC] = useState(5); // Task C: Production (prerequisite for D)
  const [durD, setDurD] = useState(2); // Task D: Distribution / Launch

  // Calculations of early/late milestone dates
  // Node 1: Start (Date = 0)
  const early1 = 0;
  
  // Node 2: After Task A is completed
  const early2 = early1 + durA;

  // Node 3: After Task B is completed (via Node 2)
  const early3 = early2 + durB;

  // Node 4: After Task C is completed (via Node 2)
  const early4 = early2 + durC;

  // Node 5: Target End (After D is completed, requiring both Node 3 and Node 4 to launch)
  // Early date of Node 5 is max(early3 + D, early4 + D)
  const early5 = Math.max(early3 + durD, early4 + durD);

  // Late Dates (calculated backwards starting from target date = early5)
  const late5 = early5;
  const late4 = late5 - durD;
  const late3 = late5 - durD;
  
  // Node 2 is grandfather of 3 and 4, so late2 = min(late3 - B, late4 - C)
  const late2 = Math.min(late3 - durB, late4 - durC);
  const late1 = late2 - durA;

  // Slacks (Marge totale)
  // Task B slack = late3 - early2 - durB
  // Task C slack = late4 - early2 - durC
  const slackB = late3 - early2 - durB;
  const slackC = late4 - early2 - durC;

  // Identify Critical Path tasks (slack === 0)
  const isA_Critical = (late2 - early1 - durA) === 0;
  const isB_Critical = slackB === 0;
  const isC_Critical = slackC === 0;
  const isD_Critical = (late5 - Math.max(early3, early4) - durD) === 0;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-TER-01"
        title="Ordonnancement PERT & Graphes de Projets"
        subtitle="Théorie des graphes de précédence, méthode du chemin critique (CPM), calcul des marges libres et optimisation temporelle de ressources."
        duration="1h 15"
        level="BUT 2ème année (GEA / TC / MLT)"
        prerequisites={[
          "Concepts de graphes (sommets, arcs orientés)",
          "Recherche de extremum (fonctions max et min)"
        ]}
        objectives={[
          "Modéliser un portefeuille industriel de tâches sous forme de réseau PERT orienté.",
          "Déterminer les dates au plus tôt et au plus tard de chaque étape du projet par récurrence directe et rétrograde.",
          "Identifier de façon systématique le chemin critique (Critical Path Method).",
          "Calculer les marges totales et les marges libres pour optimiser l'affectation des ressources tertiaires."
        ]}
      />

      <Section title="🕸️ Introduction aux Graphes d'Ordonnancement" icon="🕸️" color="indigo">
        <p className="mb-4">
          Dans la gestion logistique de projets d'envergure (lancement de produits de grande consommation, implantation d'une nouvelle plateforme de distribution), coordonner des centaines de tâches connexes est le quotidien des cadres tertiaires.
        </p>

        <InfoBlock type="definition" title="La Méthode PERT">
          La méthode <strong>PERT (Program Evaluation and Review Technique)</strong> a été théorisée par la Marine américaine pour ordonnancer de grands projets. Elle s'appuie sur la théorie des graphes :
          <ul className="list-disc pl-6 mt-2 space-y-1.5 text-sm">
            <li><strong>Les Sommets (ou Événements/Étapes) :</strong> Représentent le début ou la fin d'une tâche. Ils ne durent pas. Ils détiennent deux informations de gestion : la date au plus tôt et la date au plus tard.</li>
            <li><strong>Les Arcs (ou Activités/Tâches) :</strong> Représentent les processus en cours de réalisation. Ils possèdent une durée estimée en jours ou semaines.</li>
          </ul>
        </InfoBlock>

        <p className="mt-4">
          Un projet est modélisé comme un graphe orienté sans circuit (DAG). Les liaisons indiquent des relations de subordination technique de précédence (ex: impossible de peindre un mur avant d'avoir coulé la dalle de fondation).
        </p>
      </Section>

      <Section title="⏱️ Algorigramme de calcul des Dates et Marges" icon="⏱️" color="emerald">
        <p className="mb-4">
          La planification d'un réseau PERT comporte deux phases de calcul distinctes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              FORWARD PASS : Calcul des Dates au Plus Tôt
            </h4>
            <p className="text-sm text-muted-text mb-4">
              On parcourt le graphe de gauche à droite. La date au plus tôt d'un événement correspond au chemin le plus long menant de l'origine à cette étape.
            </p>
            <FormulaBox title="Recurrence directe" math="t_{t\hat{o}t}(j) = \max_{i} \left[ t_{t\hat{o}t}(i) + d(i, j) \right]" />
          </div>

          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              BACKWARD PASS : Calcul des Dates au Plus Tard
            </h4>
            <p className="text-sm text-muted-text mb-4">
              On repart de l'événement terminal d'arrivée. On parcourt le graphe à rebours de droite à gauche pour déterminer la date limite préservant la date globale d'arrivée.
            </p>
            <FormulaBox title="Recurrence retrograde" math="t_{tard}(i) = \min_{j} \left[ t_{tard}(j) - d(i, j) \right]" />
          </div>
        </div>

        <InfoBlock type="reminder" title="Concept-Clé : Marge Totale et Chemin Critique">
          <p className="text-sm">
            La <strong>marge totale (slack)</strong> d'une tâche est le retard maximum qu'on peut accorder à cette tâche sans retarder la date de livraison finale du projet :
          </p>
          <FormulaBox math="\text{Marge}(i, j) = t_{tard}(j) - t_{t\hat{o}t}(i) - d(i, j)" />
          <p className="text-sm mt-3">
            Le <strong>Chemin Critique (Critical Path)</strong> est la suite continue d'étapes de marge totale rigoureusement nulle : <MathComponent math="\text{Marge} = 0" />. Toute tâche située sur ce chemin critique ne tolère aucun retard de fabrication sous peine de pénalités contractuelles.
          </p>
        </InfoBlock>
      </Section>

      <Section title="🎮 Simulateur Interactif de Graphe PERT" icon="🎮" color="purple">
        <p className="mb-6">
          Modifiez les curseurs temporels d'ordonnancement pour piloter la durée des 4 phases de développement d'un nouveau projet. 
          Sur le graphe dynamique ci-dessous, observez en temps réel le recalcul automatique des jalons (date au plus tôt / date au plus tard) de chaque noeud d'étape et le passage en <strong>rouge vibrant du chemin critique optimal</strong> !
        </p>

        {/* Dynamic PERT Solver Setup */}
        <div className="bg-muted/50 dark:bg-slate-900 border border-border rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
              ⏳ Durées des Tâches
            </h4>

            {/* Task A */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Phase A : Conception :</span>
                <span className="font-mono text-indigo-600 font-bold">{durA} jours</span>
              </label>
              <input 
                aria-label="Durée tâche A"
                type="range" min="2" max="8" step="1" 
                value={durA} onChange={(e) => setDurA(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Task B */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Phase B : Plan Marketing :</span>
                <span className="font-mono text-indigo-600 font-bold">{durB} jours</span>
              </label>
              <input 
                aria-label="Durée tâche B"
                type="range" min="1" max="6" step="1" 
                value={durB} onChange={(e) => setDurB(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
              <span className="text-xs text-slate-400 block mt-1">Dure moins longtemps que C.</span>
            </div>

            {/* Task C */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Phase C : Usinage Pré-série :</span>
                <span className="font-mono text-indigo-600 font-bold">{durC} jours</span>
              </label>
              <input 
                aria-label="Durée tâche C"
                type="range" min="2" max="10" step="1" 
                value={durC} onChange={(e) => setDurC(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Task D */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Phase D : Campagne Médias :</span>
                <span className="font-mono text-indigo-600 font-bold">{durD} jours</span>
              </label>
              <input 
                aria-label="Durée tâche D"
                type="range" min="1" max="5" step="1" 
                value={durD} onChange={(e) => setDurD(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Marges calculations card */}
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50">
              <h5 className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-2">🔍 Marges d'Action</h5>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                <div className="flex justify-between">
                  <span>Marge tâche B :</span>
                  <span className={`font-mono font-bold ${slackB === 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{slackB} jours (Tampon)</span>
                </div>
                <div className="flex justify-between">
                  <span>Marge tâche C :</span>
                  <span className={`font-mono font-bold ${slackC === 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{slackC} jours (Tampon)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical PERT View */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border p-4 rounded-2xl shadow-inner relative">
              <h5 className="font-bold text-sm text-foreground mb-4 flex items-center justify-between">
                <span>🕸️ Réseau de Graphe PERT d'Événements</span>
                <span className="text-xs text-slate-500 font-mono">Rouge = critique</span>
              </h5>

              {/* Network Graph SVG */}
              <svg viewBox="0 0 450 200" className="w-full h-auto overflow-visible select-none unique-svg-pert">
                {/* Node Drawing Helper component */}
                {/* We map the 5 nodes with their (x, y) coordinates and text early/late */}
                {/* Node 1: Start (30, 100) */}
                <g>
                  <circle cx="45" cy="100" r="18" fill="#f8fafc" stroke={late1 === early1 ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
                  <line x1="45" y1="82" x2="45" y2="118" stroke="#cbd5e1" />
                  <text x="35" y="103" className="text-[7.5px] fill-slate-700 font-mono font-black">{early1}</text>
                  <text x="50" y="103" className="text-[7.5px] fill-slate-700 font-mono font-black">{late1}</text>
                  <text x="45" y="128" className="text-[6.5px] fill-slate-500 font-bold" textAnchor="middle">Nœud 1 (Début)</text>
                </g>

                {/* Node 2: After Task A (145, 100) */}
                <g>
                  <circle cx="150" cy="100" r="18" fill="#f8fafc" stroke={late2 === early2 ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
                  <line x1="150" y1="82" x2="150" y2="118" stroke="#cbd5e1" />
                  <text x="140" y="103" className="text-[7.5px] fill-slate-700 font-mono font-black">{early2}</text>
                  <text x="155" y="103" className="text-[7.5px] fill-slate-700 font-mono font-black">{late2}</text>
                  <text x="150" y="128" className="text-[6.5px] fill-slate-500 font-bold" textAnchor="middle">Nœud 2</text>
                </g>

                {/* Node 3: After Marketing B (265, 50) */}
                <g>
                  <circle cx="270" cy="45" r="18" fill="#f8fafc" stroke={late3 === early3 ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
                  <line x1="270" y1="27" x2="270" y2="63" stroke="#cbd5e1" />
                  <text x="260" y="48" className="text-[7.5px] fill-slate-700 font-mono font-black">{early3}</text>
                  <text x="275" y="48" className="text-[7.5px] fill-slate-700 font-mono font-black">{late3}</text>
                  <text x="270" y="73" className="text-[6.5px] fill-slate-500 font-bold" textAnchor="middle">Nœud 3</text>
                </g>

                {/* Node 4: After Production C (265, 150) */}
                <g>
                  <circle cx="270" cy="155" r="18" fill="#f8fafc" stroke={late4 === early4 ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
                  <line x1="270" y1="137" x2="270" y2="173" stroke="#cbd5e1" />
                  <text x="260" y="158" className="text-[7.5px] fill-slate-700 font-mono font-black">{early4}</text>
                  <text x="275" y="158" className="text-[7.5px] fill-slate-700 font-mono font-black">{late4}</text>
                  <text x="270" y="183" className="text-[6.5px] fill-slate-500 font-bold" textAnchor="middle">Nœud 4</text>
                </g>

                {/* Node 5: Terminal End (385, 100) */}
                <g>
                  <circle cx="390" cy="100" r="18" fill="#f8fafc" stroke={late5 === early5 ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
                  <line x1="390" y1="82" x2="390" y2="118" stroke="#cbd5e1" />
                  <text x="380" y="103" className="text-[7.5px] fill-slate-700 font-mono font-black">{early5}</text>
                  <text x="395" y="103" className="text-[7.5px] fill-slate-700 font-mono font-black">{late5}</text>
                  <text x="390" y="128" className="text-[6.5px] fill-slate-500 font-bold" textAnchor="middle">Nœud 5 (Fin)</text>
                </g>

                {/* Connectors / Arrows with Task Label details */}
                {/* Arrow 1 -> 2 (Task A) */}
                <g>
                  <path d="M 63 100 L 132 100" stroke={isA_Critical ? "#ef4444" : "#94a3b8"} strokeWidth={isA_Critical ? "3" : "1.5"} fill="none" />
                  <path d="M 132 100 L 126 97 L 126 103 Z" fill={isA_Critical ? "#ef4444" : "#94a3b8"} />
                  <text x="97" y="92" className="text-[8px] fill-indigo-700 font-black text-center" textAnchor="middle">Tâche A ({durA}j)</text>
                </g>

                {/* Arrow 2 -> 3 (Task B) */}
                <g>
                  <path d="M 166 88 L 254 53" stroke={isB_Critical ? "#ef4444" : "#94a3b8"} strokeWidth={isB_Critical ? "3" : "1.5"} fill="none" />
                  <path d="M 254 53 L 246 52 L 249 58 Z" fill={isB_Critical ? "#ef4444" : "#94a3b8"} />
                  <text x="204" y="62" className="text-[8px] fill-indigo-700 font-black text-center" textAnchor="middle">Tâche B ({durB}j)</text>
                </g>

                {/* Arrow 2 -> 4 (Task C) */}
                <g>
                  <path d="M 166 112 L 254 147" stroke={isC_Critical ? "#ef4444" : "#94a3b8"} strokeWidth={isC_Critical ? "3" : "1.5"} fill="none" />
                  <path d="M 254 147 L 249 142 L 246 148 Z" fill={isC_Critical ? "#ef4444" : "#94a3b8"} />
                  <text x="204" y="140" className="text-[8px] fill-indigo-700 font-black text-center" textAnchor="middle">Tâche C ({durC}j)</text>
                </g>

                {/* Arrow 3 -> 5 (Task D via upper milestone) */}
                <g>
                  <path d="M 286 53 L 374 88" stroke={isD_Critical && isB_Critical ? "#ef4444" : "#94a3b8"} strokeWidth={isD_Critical && isB_Critical ? "3" : "1.5"} fill="none" />
                  <path d="M 374 88 L 369 82 L 366 88 Z" fill={isD_Critical && isB_Critical ? "#ef4444" : "#94a3b8"} />
                  <text x="336" y="66" className="text-[8px] fill-indigo-700 font-black text-center" textAnchor="middle">Tâche D ({durD}j)</text>
                </g>

                {/* Arrow 4 -> 5 (Task D via lower milestone) */}
                <g>
                  <path d="M 286 147 L 374 112" stroke={isD_Critical && isC_Critical ? "#ef4444" : "#94a3b8"} strokeWidth={isD_Critical && isC_Critical ? "3" : "1.5"} fill="none" />
                  <path d="M 374 112 L 366 112 L 369 118 Z" fill={isD_Critical && isC_Critical ? "#ef4444" : "#94a3b8"} />
                  <text x="336" y="138" className="text-[8px] fill-indigo-700 font-black text-center" textAnchor="middle">Tâche D ({durD}j)</text>
                </g>
              </svg>
            </div>

            {/* Results Metrics Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Durée Globale du Projet</span>
                <span className="text-3xl font-black text-indigo-600 block">
                  {early5} jours
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-1">Date finale au plus tôt (Event 5)</span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Chemin Critique Identifié</span>
                <span className="text-sm font-black text-rose-500 bg-rose-50 border border-rose-200 rounded-full px-3 py-1 inline-block mt-2">
                  {isC_Critical ? "A → C → D" : "A → B → D"}
                </span>
                <span className="text-[9px] text-rose-700 font-bold block mt-1">Zéro tolérance de retard sur ces phases !</span>
              </div>

              <div className="bg-card p-4 rounded-2xl border text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Activité Pilote Goulot</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block mt-2">
                  {isC_Critical ? "Phase C (Usinage)" : "Phase B (Marketing)"}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">C'est elle qui pénalise le projet en cet état.</span>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Section title="⚖️ Formulation de Marges et Cheminements" icon="📊" color="amber">
        <p className="mb-4">
          Un manager logistique tertiaire utilise deux variantes de marges pour piloter l'approvisionnement des stocks ou les équipes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">
              1. La Marge Libre (Free Slack)
            </h4>
            <p className="text-sm leading-relaxed text-muted-text">
              Délai maximal de retard possible sans décaler la date au plus tôt des tâches immédiatement successeuses. Elle n'impacte en rien la suite directe du graphe.
            </p>
            <FormulaBox title="Marge libre de la tâche (i => j)" math="\text{Marge Libre} = t_{t\hat{o}t}(j) - t_{t\hat{o}t}(i) - d(i, j)" />
          </div>

          <div>
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">
              2. La Marge Totale (Total Slack)
            </h4>
            <p className="text-sm leading-relaxed text-muted-text">
              Délai maximal de retard possible en se réservant de retarder les étapes suivantes, du moment que cela ne repousse pas l'échéance contractuelle ultime de fin du projet.
            </p>
            <FormulaBox title="Marge totale de la tâche (i => j)" math="\text{Marge Totale} = t_{tard}(j) - t_{t\hat{o}t}(i) - d(i, j)" />
          </div>
        </div>
      </Section>

      <Section title="⚔️ Exercice Logistique Résolu" icon="🎓" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Réduction de coût et crashing d'activité"
          question={
            <div>
              <p>
                Un prestataire de e-commerce s'engage à implanter sa solution d'achat sous 12 jours (pénalité de 500 € par jour de dépassement). 
                La tâche critique actuelle (Tâche C) dure 8 jours et coûte 2 000 €. 
                L'équipe informatique propose de réduire sa durée à 6 jours par le biais d'heures supplémentaires d'un coût de 400 € au total.
              </p>
              <p className="font-bold mt-2">Ce « crashing » (compression de projet) est-il rentable pour l'entreprise ?</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Évaluation de la situation de base (Sans compression)</p>
              <p className="my-2">
                Le chemin critique actuel impose une durée totale de projet de <MathComponent math="14\text{ jours}" />.
              </p>
              <p className="text-sm">
                Calcul des pénalités induites par le dépassement :
              </p>
              <p className="font-mono text-center my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$\\text{Retard} = 14\\text{j} - 12\\text{j} = 2\\text{ jours de retard} \\quad \\implies 2 \\times 500\\text{ \\euro} = 1000\\text{ \\euro}$"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Évaluation après compression de la tâche critique</p>
              <p className="my-2">
                En injectant 400 € de ressources, la tâche critique C est réduite de 2 jours. 
                La durée globale du projet tombe à <MathComponent math="12\text{ jours}" /> (exactement l'engagement contractuel).
              </p>
              <p className="text-sm">
                Les pénalités de retard sont entièrement éliminées (0 €).
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Bilan économique comparatif</p>
              <p className="my-2">
                Faisons la balance financière :
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Bénéfice de pénalité sauvée : <MathComponent math="1000\text{ \euro}" />.</li>
                <li>Investissement en heures supplémentaires : <MathComponent math="400\text{ \euro}" />.</li>
                <li><strong>Gain net d'optimisation : </strong> <MathComponent math="1000 - 400 = 600\text{ \euro}" />.</li>
              </ul>
              <p className="mt-4 font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200">
                ✓ Conclusion : Le crashing est extrêmement rentable pour l'entreprise logistique, qui économise 600 € nets et préserve sa réputation client !
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de gestion de projet" icon="🧠" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la marge totale d'une tâche d'ordonnancement située sur le chemin critique CPM ?</>}
            back={<>{"Elle est rigoureusement égale à 0. Tout retard sur son exécution retarde d'autant la fin du projet."}</>}
          />
          <Flashcard 
            front={<>Que représente une tâche virtuelle (dummy activity) en formalisme de réseau PERT ?</>}
            back={<>{"C'est une tâche fictive de durée nulle $t=0$ qui sert uniquement à matérialiser une contrainte d'antériorité géométrique entre deux nœuds déconnectés."}</>}
          />
        </div>
      </Section>

      <Section title="📜 Foire Aux Questions d'Ordonnancement (FAQ)" icon="🎓" color="indigo">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les progiciels ERP modernes convertissent-ils le PERT en diagramme de GANTT ?",
              answer: "Le graphe PERT est fabuleux pour le calcul théorique algorithmique d'ordonnancement et des marges. Cependant, pour un opérateur sur le terrain, le diagramme de GANTT à échelle chronologique horizontale linéaire est bien plus intuitif pour planifier visuellement les charges d'ateliers jour après jour."
            },
            {
              question: "Quelle est la différence fondamentale entre les formalismes MPM et PERT ?",
              answer: "Dans le PERT (américain), les événements sont des jalons stockés sur les sommets, et les tâches sont portées par les arcs. Dans la méthode potentiels MPM (française), c'est l'inverse : les tâches de projet figurent sur les sommets du graphe, et les arcs portent uniquement les relations de dépendance temporelles de décalage."
            },
            {
              question: "De quelle manière formule-t-on l'incertitude sur la durée dans un PERT probabiliste ?",
              answer: "Taguchi et l'industrie utilisent trois estimations par tâche : l'optimiste (o), la réaliste (r) et la pessimiste (p). La durée espérée est calculée par une moyenne pondérée t_e = (o + 4r + p) / 6 issue de la distribution de probabilité d'une loi Bêta."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation de Planification" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une tâche dure 6 jours. Son jalon amont a pour date au plus tôt 4. Son jalon aval a pour date au plus tard 12. Quelle est la marge totale de cette tâche ?",
              options: [
                "2 jours",
                "4 jours",
                "0 jour",
                "6 jours"
              ],
              correctAnswer: 0,
              explanation: "Marge totale = t_tard(aval) - t_tot(amont) - durée = 12 - 4 - 6 = 2 jours."
            },
            {
              question: "Que peut-on affirmer au sujet d'un réseau de graphe MPM ?",
              options: [
                "Il comporte obligatoirement des circuits fermés.",
                "Les tâches fictives de durée nulle y sont indispensables.",
                "Le chemin critique est celui qui présente le total de durées cumulées le plus élevé du graphe.",
                "La marge libre y est toujours supérieure à la marge totale."
              ],
              correctAnswer: 2,
              explanation: "Le chemin d'exécution le plus long (le goulot d'étranglement temporel cumulatif) détermine la durée de réalisation minimale du projet."
            },
            {
              question: "Si la tâche critique B subit une avarie et s'allonge de 3 jours, que se passe-t-il sur la date d'arrivée d'un projet ?",
              options: [
                "Elle ne bouge pas si les autres tâches ont de la marge.",
                "Le projet est écourté de 3 jours par compensation.",
                "La date finale est décalée de 3 jours d'interruption.",
                "La marge libre du projet augmente de 3."
              ],
              correctAnswer: 2,
              explanation: "La tâche critique ayant une marge nulle, tout allongement de sa durée se répercute linéairement jour pour jour sur le jalon terminal."
            }
          ]}
        />
      </Section>

      <InteractiveChecklist 
        items={[
          "Je sais dessiner un réseau PERT et structurer ses sommets d'événements.",
          "Je sais mener les calculs des dates au plus tôt et au plus tard.",
          "Je sais repérer le chemin critique et estimer les marges totale et libre."
        ]}
      />
    </div>
  );
};

export default Course_BUT_Tertiaire_01_Ordonnancement_PERT;
