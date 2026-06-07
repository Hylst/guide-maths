import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, GitFork, ArrowRight, Activity, Compass, ShieldAlert, Award, Grid, Sliders, Zap, HelpCircle } from 'lucide-react';

// Interactive short-path visualizer illustrating Dijkstra on a beautiful node-link diagram
const DijkstraInteractiveSim: React.FC = () => {
  const [ab, setAb] = useState<number>(4);
  const [ac, setAc] = useState<number>(2);
  const [bc, setBc] = useState<number>(1);
  const [bd, setBd] = useState<number>(5);
  const [cd, setCd] = useState<number>(3);

  const bestPathInfo = useMemo(() => {
    const paths = [
      { path: ['A', 'B', 'D'], cost: ab + bd, edges: ['AB', 'BD'] },
      { path: ['A', 'C', 'D'], cost: ac + cd, edges: ['AC', 'CD'] },
      { path: ['A', 'C', 'B', 'D'], cost: ac + bc + bd, edges: ['AC', 'BC', 'BD'] },
      { path: ['A', 'B', 'C', 'D'], cost: ab + bc + cd, edges: ['AB', 'BC', 'CD'] }
    ];

    let minIndex = 0;
    let minCost = Infinity;
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].cost < minCost) {
        minCost = paths[i].cost;
        minIndex = i;
      }
    }
    return paths[minIndex];
  }, [ab, ac, bc, bd, cd]);

  const activeEdges = bestPathInfo.edges;
  const activeNodes = bestPathInfo.path;

  // Node coordinates inside the 220x220 SVG space
  const coords: Record<string, { x: number; y: number }> = {
    A: { x: 30, y: 110 },
    B: { x: 110, y: 40 },
    C: { x: 110, y: 180 },
    D: { x: 190, y: 110 }
  };

  const isEdgeHighlighted = (u: string, v: string) => {
    const key1 = u + v;
    const key2 = v + u;
    return activeEdges.includes(key1) || activeEdges.includes(key2);
  };

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-2">
        <Network className="text-indigo-650" size={22} />
        Simulateur Dijkstra : Trouvez le Plus Court Chemin
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Modifiez le poids des arêtes ci-dessous et observez l'algorithme de Dijkstra recalculer instantanément le chemin optimal entre A et D dans le réseau électrique/logistique.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders on the left */}
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sliders size={12} /> Configurer les Poids des Arêtes
            </h4>
            
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">Portion A → B (Indice de trafic / km) :</span>
                <span className="text-indigo-600 font-mono">{ab}</span>
              </div>
              <input 
                type="range" min="1" max="15" value={ab} onChange={(e) => setAb(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">Portion A → C (Route secondaire) :</span>
                <span className="text-indigo-600 font-mono">{ac}</span>
              </div>
              <input 
                type="range" min="1" max="15" value={ac} onChange={(e) => setAc(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">Liaison centrale B ↔ C :</span>
                <span className="text-indigo-600 font-mono">{bc}</span>
              </div>
              <input 
                type="range" min="1" max="15" value={bc} onChange={(e) => setBc(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">Portion B → D (Rocade nord) :</span>
                <span className="text-indigo-600 font-mono">{bd}</span>
              </div>
              <input 
                type="range" min="1" max="15" value={bd} onChange={(e) => setBd(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">Portion C → D (Rocade sud) :</span>
                <span className="text-indigo-600 font-mono">{cd}</span>
              </div>
              <input 
                type="range" min="1" max="15" value={cd} onChange={(e) => setCd(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900 space-y-1.5">
            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} /> Tracé Optimisé par Dijkstra :
            </h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Sommets traversés :</span>
                <strong className="text-slate-800 dark:text-slate-100 font-mono">{activeNodes.join(' → ')}</strong>
              </div>
              <div className="flex justify-between border-t border-indigo-100 dark:border-indigo-900 pt-1 mt-1 font-bold text-indigo-700 dark:text-indigo-400">
                <span>Coût Total Optimal (Chemin le plus court) :</span>
                <strong className="font-mono">{bestPathInfo.cost} unités</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time SVG Graph on the right */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Diagramme Topologique de Flux</span>
          
          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-2 shadow-inner relative">
            <svg viewBox="0 0 220 220" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2005/svg">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Edge lines */}
              {/* Edge A-B */}
              <line 
                x1={coords.A.x} y1={coords.A.y} x2={coords.B.x} y2={coords.B.y} 
                stroke={isEdgeHighlighted('A', 'B') ? '#4f46e5' : '#cbd5e1'} 
                strokeWidth={isEdgeHighlighted('A', 'B') ? '4' : '2'}
                filter={isEdgeHighlighted('A', 'B') ? 'url(#glow)' : ''}
              />
              <text x={(coords.A.x + coords.B.x)/2 - 12} y={(coords.A.y + coords.B.y)/2 - 4} fill="#6366f1" className="text-[10px] font-mono font-bold">{ab}</text>

              {/* Edge A-C */}
              <line 
                x1={coords.A.x} y1={coords.A.y} x2={coords.C.x} y2={coords.C.y} 
                stroke={isEdgeHighlighted('A', 'C') ? '#4f46e5' : '#cbd5e1'} 
                strokeWidth={isEdgeHighlighted('A', 'C') ? '4' : '2'}
                filter={isEdgeHighlighted('A', 'C') ? 'url(#glow)' : ''}
              />
              <text x={(coords.A.x + coords.C.x)/2 - 12} y={(coords.A.y + coords.C.y)/2 + 10} fill="#6366f1" className="text-[10px] font-mono font-bold">{ac}</text>

              {/* Edge B-C */}
              <line 
                x1={coords.B.x} y1={coords.B.y} x2={coords.C.x} y2={coords.C.y} 
                stroke={isEdgeHighlighted('B', 'C') ? '#4f46e5' : '#cbd5e1'} 
                strokeWidth={isEdgeHighlighted('B', 'C') ? '4' : '2'}
                filter={isEdgeHighlighted('B', 'C') ? 'url(#glow)' : ''}
              />
              <text x={(coords.B.x + coords.C.x)/2 + 5} y={(coords.B.y + coords.C.y)/2} fill="#6366f1" className="text-[10px] font-mono font-bold">{bc}</text>

              {/* Edge B-D */}
              <line 
                x1={coords.B.x} y1={coords.B.y} x2={coords.D.x} y2={coords.D.y} 
                stroke={isEdgeHighlighted('B', 'D') ? '#4f46e5' : '#cbd5e1'} 
                strokeWidth={isEdgeHighlighted('B', 'D') ? '4' : '2'}
                filter={isEdgeHighlighted('B', 'D') ? 'url(#glow)' : ''}
              />
              <text x={(coords.B.x + coords.D.x)/2 + 8} y={(coords.B.y + coords.D.y)/2 - 4} fill="#6366f1" className="text-[10px] font-mono font-bold">{bd}</text>

              {/* Edge C-D */}
              <line 
                x1={coords.C.x} y1={coords.C.y} x2={coords.D.x} y2={coords.D.y} 
                stroke={isEdgeHighlighted('C', 'D') ? '#4f46e5' : '#cbd5e1'} 
                strokeWidth={isEdgeHighlighted('C', 'D') ? '4' : '2'}
                filter={isEdgeHighlighted('C', 'D') ? 'url(#glow)' : ''}
              />
              <text x={(coords.C.x + coords.D.x)/2 + 8} y={(coords.C.y + coords.D.y)/2 + 10} fill="#6366f1" className="text-[10px] font-mono font-bold">{cd}</text>

              {/* Nodes drawing */}
              {Object.entries(coords).map(([nodeName, point]) => {
                const isActive = activeNodes.includes(nodeName);
                return (
                  <g key={nodeName}>
                    <circle 
                      cx={point.x} cy={point.y} r="14" 
                      fill={isActive ? '#4f46e5' : '#f8fafc'} 
                      stroke={isActive ? '#818cf8' : '#64748b'} 
                      strokeWidth="2" 
                    />
                    <text 
                      x={point.x} y={point.y + 4} 
                      textAnchor="middle" 
                      fill={isActive ? '#ffffff' : '#334155'} 
                      className="text-[10px] font-black font-sans pointer-events-none"
                    >
                      {nodeName}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/85 text-[9px] text-indigo-400 font-mono rounded-md flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>Calcul Dijkstra Actif</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Arêtes indigo = Chemin le plus court</span>
        </div>
      </div>
    </div>
  );
};

const Course_BTS_01_Graphes_et_Reseaux: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/04_Post_Bac/BTS/01_BTS_01_Graphes_et_Reseaux.md";

  const checklistItems = [
    "Distinguer graphe orienté et non-orienté, et identifier les sommets et arêtes.",
    "Bâtir rigoureusement la matrice d'adjacence associée à un graphe.",
    "Calculer les matrices de transitions successives d'un réseau de transport.",
    "Appliquer l'algorithme de Dijkstra étape par étape (tableau d'états).",
    "Méthodologie PERT : évaluer les dates au plus tôt, date au plus tard et déduire le chemin critique."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="GR" 
        title="Graphes et Réseaux" 
        subtitle="S'approprier l'outil des graphes pour modéliser des problèmes d'optimisation, de transport, de télécommunications et d'ordonnancement de projets."
        level="BTS Informatique / Industriel"
        duration="3.0h"
        objectives={[
          "Traduire des contraintes réelles sous forme de graphes (sommets/arêtes).",
          "Calculer et exploiter la matrice d'adjacence pour dénombrer des chemins de longueur n.",
          "Mettre en oeuvre l'algorithme de Dijkstra pour optimiser des coûts de transport de données ou d'énergie.",
          "Modéliser et analyser un planning industriel à l'aide des diagrammes PERT et MPM."
        ]}
      />

      <InfoBlock type="info" title="L'importance de la théorie des graphes dans votre métier">
        Qu'il s'agisse de tracer la route d'un paquet IP à travers internet, d'organiser la distribution électrique d'une chaîne logistique, ou de planifier la construction de modules logiciels, vous manipulez constamment des structures interdépendantes. La théorie des graphes formalise ces réseaux d'un point de vue algébrique, transformant des questions visuelles complexes en purs calculs matriciels automatisables.
      </InfoBlock>

      <Section title="1. Vocabulaire Fondamental et Modélisation" color="slate" icon={<GitFork className="text-slate-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Un graphe {"$G = (S, A)$"} est défini par un ensemble de **sommets** (notés {"$S$"}) de points physiques, et un ensemble d'**arêtes** ou d'**arcs** (notés {"$A$"}) décrivant les liaisons qui les couplent.
          </p>

          <BentoGrid>
            <BentoCard title="Graphes Non-Orientés" color="slate">
              <p className="text-xs text-zinc-500 leading-normal mb-2">
                Les relations sont bilatérales. Une liaison entre {"$u$"} et {"$v$"} se note sous forme de paire indifférenciée :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$E = \\{u, v\\}$$"}
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Exemple: Un réseau d'interphones locaux ou une ligne bidirectionnelle de train.
              </p>
            </BentoCard>

            <BentoCard title="Graphes Orientés" color="indigo">
              <p className="text-xs text-zinc-500 leading-normal mb-2">
                Le transfert possède un sens de circulation obligatoire. Une liaison se note en couple :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$E = (u, v)$$"}
              </div>
              <p className="text-[10px] text-indigo-500 leading-normal">
                Exemple: Des circuits imprimés d'alimentation, des liaisons réseau émetteur-récepteur.
              </p>
            </BentoCard>

            <BentoCard title="Pondération" color="amber">
              <div className="font-mono text-xs font-bold text-amber-900 dark:text-amber-100 flex flex-col gap-1.5 py-1">
                <span>• Sommets = Routeurs IP</span>
                <span>• Arêtes = Câbles réseau</span>
                <span>• Poids = Latence (ms)</span>
              </div>
              <p className="text-[10px] text-amber-600 leading-normal mt-2">
                La pondération permet de chiffrer analytiquement des longueurs de câbles, des débits ou des contraintes économiques de coûts.
              </p>
            </BentoCard>
          </BentoGrid>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">La Matrice d'Adjacence</h3>
          <p>
            La matrice d'adjacence {"$M$"} d'un graphe à {"$n$"} sommets est une matrice carrée de taille {"$n \\times n$"} où le coefficient de la ligne {"$i$"} et de la colonne {"$j$"}, noté {"$m_{i,j}$"}, représente le nombre de liaisons directes du sommet {"$i$"} vers le sommet {"$j$"}.
          </p>
          <InfoBlock type="reminder" title="Nombre de chemins de longueur k">
            Le saviez-vous ? Le coefficient d'ordre {"$m^{(k)}_{i,j}$"} de la matrice puissance {"$M^k$"} est égal au nombre exact de chemins constitués de exactement {"$k$"} étapes consécutives raccordant le sommet {"$i$"} au sommet {"$j$"} !
          </InfoBlock>
        </div>
      </Section>

      <Section title="2. Plus Court Chemin : Algorithme de Dijkstra" color="indigo" icon={<Activity className="text-indigo-500 w-6 h-6" />}>
        <div className="space-y-4">
          <p>
            Créé en 1956 par Edsger Dijkstra, son algorithme permet de déterminer le tracé de coût cumulé minimal reliant un sommet initial donné à tous les autres sommets dans un graphe pondéré par des poids **strictement positifs**.
          </p>
          
          <div className="border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/50 space-y-3">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-400 text-sm uppercase tracking-wider">Fonctionnement pas-à-pas :</h4>
            <ol className="list-decimal pl-5 text-sm space-y-2 text-slate-600 dark:text-slate-450">
              <li>On initialise le tableau en fixant la distance du point de départ à <code className="font-mono bg-indigo-50 text-indigo-700 px-1 rounded">0</code>, et à l'infini <code className="font-mono">{"$\\infty$"}</code> pour tous les autres sommets.</li>
              <li>On choisit le sommet non visité ayant la distance provisoire la plus faible, et on le déclare **définitif**.</li>
              <li>Pour chacun de ses sommets voisins non explorés, on évalue la nouvelle distance cumulée théorique : si elle est inférieure à la distance actuellement enregistrée, on met à jour la valeur et le nœud précédent.</li>
              <li>On réitère les étapes 2 et 3 jusqu'à ce que tous les nœuds de destination d'intérêt soient définitivement fixés.</li>
            </ol>
          </div>
        </div>
      </Section>

      <Section title="3. Simulateur Interactif Dijkstra" color="purple" icon={<Compass />}>
        <DijkstraInteractiveSim />
      </Section>

      <Section title="4. Plannings de Projets : Ordonnancement PERT" color="amber" icon="📊">
        <div className="space-y-4">
          <p>
            Dans la gestion de projets de génie logiciel ou industriels, les graphes de type **PERT** (Program Evaluation and Review Technique) modélisent le flux d'exécution ordonné de tâches de fabrication en tenant compte de leurs antériorités strictes.
          </p>
          
          <BentoGrid>
            <BentoCard title="Date au plus tôt" color="slate">
              <p className="text-xs text-zinc-500 leading-normal mb-1">
                Le moment le plus proche du début où une tâche peut démarrer sans retarder les étapes préalables indispensables :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$t_{\\text{tôt}}(j) = \\max_{i} \\{ t_{\\text{tôt}}(i) + d(i) \\}$$"}
              </div>
            </BentoCard>

            <BentoCard title="Date au plus tard" color="rose">
              <p className="text-xs text-zinc-500 leading-normal mb-1">
                La date butoir ultime où une tâche doit être terminée sous peine de cumuler du retard sur la date de fin globale contractuelle du projet :
              </p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                {"$$t_{\\text{tard}}(i) = \\min_{j} \\{ t_{\\text{tard}}(j) - d(i) \\}$$"}
              </div>
            </BentoCard>

            <BentoCard title="Chemin Critique" color="indigo" colSpan={3}>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Le **chemin critique** est le chemin du réseau constitué exclusivement de nœuds où la marge de manœuvre temporelle totale est rigoureusement nulle (date au plus tôt = date au plus tard). Tout retard sur n'importe quel élément de ce chemin décale d'autant l'échéance finale de livraison du système !
              </p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="Exercices Résolus pas-à-pas" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Transit de données et puissance matricielle"
          question={
            <>
              Soit un réseau internet composé de quatre nœuds de transit localisés à {`A, B, C et D`}.
              La matrice d'adjacence {"$M$"} du graphe orienté de ce réseau de fibres est définie par :
              <br />
              {"$$M = \\begin{pmatrix} 0 & 1 & 1 & 0 \\\\ 1 & 0 & 1 & 1 \\\\ 0 & 0 & 0 & 1 \\\\ 1 & 0 & 0 & 0 \\end{pmatrix}$$"}
              <br />
              1. Bâtir le graphe sagittal correspondant à cette matrice d'adjacence.
              <br />
              2. À l'aide du produit de matrices, évaluer le coefficient {"$m^{(2)}_{1,4}$"} de la matrice puissance {"$M^2$"} pour déterminer les liaisons indirectes effectives en 2 sauts IP reliant A à D.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Analyse des connexions directes</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Identifions les connexions définies par les lignes de la matrice d'adjacence :
                <br />
                • Ligne 1 (Nœud A) : possède des 1 vers B (colonne 2) et C (colonne 3). Pas de boucle locale vers A ou vers D.
                <br />
                • Ligne 2 (Nœud B) : possède des connexions vers A (axe de retour), C et D.
                <br />
                • Ligne 3 (Nœud C) : possède une unique connexion vers D.
                <br />
                • Ligne 4 (Nœud D) : possède une unique connexion de retour vers A.
              </p>
            </>,
            <>
              <strong>Étape 2 : Multiplication matricielle pour M²</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le coefficient d'indice (1,4) ou l'élément {"$m^{(2)}_{1,4}$"} de la ligne 1 colonne 4 s'évalue en combinant la première ligne de {"$M$"} et la quatrième colonne de {"$M$"} :
              </p>
              <div className="font-mono text-center my-2.5 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$m^{(2)}_{1,4} = m_{1,1}m_{1,4} + m_{1,2}m_{2,4} + m_{1,3}m_{3,4} + m_{1,4}m_{4,4}$$"}
              </div>
              <p className="mt-2 text-sm">
                En appliquant les coefficients définis à l'origine :
                <br />
                {"$$m^{(2)}_{1,4} = (0 \\times 0) + (1 \\times 1) + (1 \\times 1) + (0 \\times 0) = 0 + 1 + 1 + 0 = 2$$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Interprétation technologique</strong>
              <p className="text-sm mt-2">
                Le résultat de la puissance matricielle étant égal à 2, il existe exactement deux et seulement deux itinéraires de télécommunication distincts permettant d'envoyer un signal de A à D en exactement deux sauts :
                <br />
                1. Le chemin passant par B : **A → B → D** (car A → B et B → D existent).
                <br />
                2. Le chemin passant par C : **A → C → D** (car A → C et C → D existent).
              </p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Recherche de chemins critiques d'assemblage"
          question={
            <>
              L'échéance de déploiement d'une application internet de gestion d'atelier comprend les phases de conception et de programmation ordonnées comme suit :
              <br />
              • Tâche E (Cahier des charges) : durée 4 jours, aucune tâche antérieure.
              <br />
              • Tâche F (Développement BDD) : durée 6 jours, antériorité requise E.
              <br />
              • Tâche G (Fichiers d'intégration) : durée 3 jours, antériorité requise E.
              <br />
              • Tâche H (Tests croisés) : durée 2 jours, antécédents requis F et G indispensables.
              <br />
              Déterminer la date minimale de livraison de cette application ainsi que le chemin critique.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul des dates au plus tôt</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On part du point initial, jour 0 :
                <br />
                • {"$t_{\\text{tôt}}(E) = 0$"} (durée 4 jours, donc termine au jour 4).
                <br />
                • Pour F (démarre après E) : {"$t_{\\text{tôt}}(F) = 4$"} (durée 6 jours, donc de 4 à 10).
                <br />
                • Pour G (démarre après E) : {"$t_{\\text{tôt}}(G) = 4$"} (durée 3 jours, donc de 4 à 7).
                <br />
                • Pour H (requiert F et G terminées, on cherche le maximum requis pour débuter) :
                {"$$t_{\\text{tôt}}(H) = \\max \\{ t_{\\text{tôt}}(F)+6 , t_{\\text{tôt}}(G)+3 \\} = \\max \\{ 4+6 , 4+3 \\} = \\max(10, 7) = 10$$"}.
              </p>
            </>,
            <>
              <strong>Étape 2 : Date finale et marge de manœuvre</strong>
              <p className="mt-2 text-sm leading-relaxed">
                La tâche H dure 2 jours. Ayant sa date de début au plus tôt à 10, elle s'achèvera au jour :
                {"$$10 + 2 = 12\\text{ jours au plus tôt.}$$"}
                Toute marge sur le planning global se calcule en posant la date finale fixée à 12 au plus tard.
              </p>
            </>,
            <>
              <strong>Étape 3 : Identification du chemin critique</strong>
              <p className="text-sm mt-1">
                Remontons le réseau temporel pour mesurer où les dates au plus tard égalent celles au plus tôt :
                <br />
                • Pour H : date de début au plus tard = 10 (marge = 0).
                <br />
                • Pour F : date au plus tard de fin = 10, donc début au plus tard = 4 (marge = 10 - 6 - 4 = 0).
                <br />
                • Pour G : date au plus tard de fin = 10, donc début au plus tard = 7 (marge libre = 10 - 3 - 4 = 3 jours !).
              </p>
              <div className="font-mono text-center my-2.5 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-black text-base">
                Chemin Critique : E → F → H
              </div>
              <p className="text-[11px] text-zinc-500 italic">La tâche G n'étant pas critique, elle dispose de 3 jours de battement calendaire sans affecter la date globale de fin.</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon={<HelpCircle className="text-indigo-600 w-5 h-5"/>}>
        <AccordionFAQ items={[
          {
            question: "L'algorithme de Dijkstra fonctionne-t-il sur des graphes avec des poids négatifs ?",
            answer: "Non! C'est une limite majeure de l'algorithme. Si des poids négatifs existent, Dijkstra peut invalider et verrouiller prématurément un itinéraire sous-optimal avant d'avoir pu analyser le raccourci représenté par l'arête négative. Dans ce cas, on doit utiliser l'algorithme de Bellman-Ford ou d'A* modifié."
          },
          {
            question: "Quelle est la différence concrète entre un graphe eulérien et un graphe hamiltonien ?",
            answer: "Un graphe possède un chemin eulérien si l'on peut traverser toutes les arêtes du graphe exactement une fois (sans repasser sur la même route). Un graphe possède un chemin hamiltonien si l'on peut visiter tous les sommets du réseau exactement une fois sans exception."
          },
          {
            question: "Comment repérer rapidement si un graphe non orienté possède un cycle eulérien ?",
            answer: "Selon le théorème d'Euler, un graphe connexe admet un cycle eulérien si et seulement si tous ses sommets ont un degré pair (nombre pair d'arêtes raccordées). S'il contient exactement 2 sommets de degré impair, il admet seulement une chaîne eulérienne (qui débutera sur un impair et se finira sur l'autre)."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans un graphe, qu'est-ce que le degré d'un sommet ?</>}
            back={<>Le <strong>degré</strong> est égal au nombre total d'arêtes reliées de façon directe à ce sommet. Pour un sommet de graphe orienté, on différencie le demi-degré intérieur et extérieur.</>}
          />
          <Flashcard 
            front={<>Qu'est-ce qu'un graphe connexe ?</>}
            back={<>Un graphe est dit <strong>connexe</strong> s'il existe toujours au moins une chaîne reliant deux sommets quelconques du graphe (pas de partie d'îlot isolé inaccessible et coupée du réseau électrique/IP).</>}
          />
        </div>
      </Section>

      <Section title="Quiz de Validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si la matrice d'adjacence d'un graphe à 3 sommets contient la ligne 1 : [0, 2, 0], cela signifie :",
              options: [
                "Il existe 2 routes distinctes directes reliant le sommet 1 au sommet 2.",
                "Il existe un cycle de longueur 2 raccordé au sommet 1.",
                "Tous les chemins partant de 1 mènent à 2."
              ],
              correctAnswer: 0,
              explanation: "Le coefficient m(1,2) = 2 indique la présence exacte de deux liaisons directes (chemins parallèles distincts) raccordant le nœud de départ 1 au nœud d'arrivée 2."
            },
            {
              question: "Quelle est la condition obligatoire de convergence de l'algorithme de Dijkstra ?",
              options: [
                "Toutes les pondérations d'arêtes doivent être positives ou nulles.",
                "Tous les sommets du graphe doivent posséder le même degré.",
                "Le graphe doit obligatoirement être sans cycle."
              ],
              correctAnswer: 0,
              explanation: "La convergence mathématique est garantie uniquement si l'additivité des coûts reste positive, évitant les sous-boucles infinies à valeur décroissante incontrôlable."
            },
            {
              question: "Lors de la planification PERT d'un réseau de tâches, qu'est-ce qu'une marge totale libre ?",
              options: [
                "C'est le retard maximum possible toléré sur une tâche sans retarder le début au plus tôt des suivantes.",
                "C'est le temps total de vacances programmé par votre bureau d'étude.",
                "Il s'agit du trajet reliant les nœuds non raccordés."
              ],
              correctAnswer: 0,
              explanation: "La marge libre représente précisément le retard maximal que l'on peut appliquer à l'achèvement d'une tâche sans décaler l'entrée en action de ses tâches successeures."
            }
          ]}
        />
      </Section>

      <div onClick={() => validateCourse(courseId)}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_BTS_01_Graphes_et_Reseaux;
