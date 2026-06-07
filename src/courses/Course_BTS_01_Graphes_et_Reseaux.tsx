import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, FormulaBox
} from '../components/SharedUI';
import { Network, Sliders, Play, RotateCcw } from 'lucide-react';

const Course_BTS_01_Graphes_et_Reseaux: React.FC = () => {
  // Dijkstra state
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

  const activeNodes = bestPathInfo.path;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="BTS-01"
        title="Graphes et Réseaux"
        subtitle="Modélisation, étude de connexité, ordonnancement PERT et algorithmes fondamentaux sur les réseaux de transport et de communication."
        duration="4 heures"
        level="Post-Bac (BTS)"
        prerequisites={["Équations linéaires", "Algorithmique basique"]}
        objectives={[
          "Tracer un graphe et en extraire la matrice d'adjacence correspondante",
          "Calculer les degrés de sommets et valider la connexité du réseau",
          "Mettre en œuvre l'algorithme d'optimisation de Dijkstra pas à pas",
          "Analyser des chronologies et chemins critiques via la méthode PERT"
        ]}
      />

      <InfoBlock type="definition" title="Qu'est-ce qu'un Graphe ?">
        <p>
          Un graphe {"$G = (S, A)$"} est défini par un ensemble de sommets (ou nœuds) {"$S$"} reliés entre eux par un ensemble d'arêtes (ou liens) {"$A$"} ou d'arcs si le sens de parcours est contraint de façon unilatérale.
        </p>
      </InfoBlock>

      <Section title="📊 Théorie des Graphes & Matrice d'Adjacence" icon="📊" color="indigo">
        <p className="mb-4">
          La <strong>matrice d'adjacence</strong> {"$M$"} d'un graphe simple d'ordre {"$n$"} est une matrice carrée de taille {"$n \\times n$"} où le coefficient {"$m_{i,j}$"} indique le nombre d'arêtes reliant le sommet {"$i$"} au sommet {"$j$"}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FormulaBox 
            title="Matrice d'Adjacence" 
            math={"M = \\begin{pmatrix} 0 & 1 & 1 \\\\ 1 & 0 & 0 \\\\ 1 & 0 & 0 \\end{pmatrix}"} 
          />
          <FormulaBox 
            title="Degré d'un Sommet d(S)" 
            math={"d(s) = \\text{Nombre d'arêtes rattachées au sommet s}"} 
          />
        </div>

        <InfoBlock type="funfact" title="Graphes eulériens et éboueurs">
          <p>
            Un graphe admet un chemin eulérien (traversant chaque arête exactement une fois) si et seulement s'il comporte au plus 2 sommets de degré impair. C'est l'outil mathématique par excellence utilisé par les communes pour optimiser le trajet de collecte des déchets de voirie !
          </p>
        </InfoBlock>
      </Section>

      <Section title="⚡ Exercice Interactif : Algorithme de Dijkstra" icon={<Network className="w-5 h-5 text-emerald-600" />} color="emerald">
        <p className="mb-4">
          L'algorithme de <strong>Dijkstra</strong> permet de résoudre le problème du plus court chemin d'un sommet de départ {"$S_0$"} vers tous les autres sommets d'un graphe dont les arêtes possèdent des poids strictement positifs (coûts, distances, temps).
        </p>

        {/* DIJKSTRA INTERACTIVE APP */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Control Sliders */}
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block uppercase">
                Ajuster les Coûts des Routes :
              </span>
              <div>
                <label className="text-xs font-mono font-bold text-slate-550 block mb-1">Portion A → B (poids) : {ab}</label>
                <input 
                  type="range" min="1" max="10" step="1" value={ab}
                  onChange={(e) => setAb(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-550 block mb-1">Portion A → C (poids) : {ac}</label>
                <input 
                  type="range" min="1" max="10" step="1" value={ac}
                  onChange={(e) => setAc(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-550 block mb-1">Liaison B ↔ C (poids) : {bc}</label>
                <input 
                  type="range" min="1" max="10" step="1" value={bc}
                  onChange={(e) => setBc(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-550 block mb-1">Portion B → D (poids) : {bd}</label>
                <input 
                  type="range" min="1" max="10" step="1" value={bd}
                  onChange={(e) => setBd(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-550 block mb-1">Portion C → D (poids) : {cd}</label>
                <input 
                  type="range" min="1" max="10" step="1" value={cd}
                  onChange={(e) => setCd(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            {/* Visual network state */}
            <div className="bg-white dark:bg-slate-950 p-6 border rounded-2xl flex flex-col items-center justify-center">
              <span className="text-xs font-mono font-bold text-slate-400 mb-4 block uppercase tracking-wider">Visualisation Dijkstra</span>
              
              <svg width="220" height="150" className="overflow-visible mb-4">
                {/* Connections with values */}
                <line x1="30" y1="75" x2="110" y2="30" stroke={activeNodes.includes('A') && activeNodes.includes('B') ? '#10b981' : '#cbd5e1'} strokeWidth={activeNodes.includes('A') && activeNodes.includes('B') ? "3.5" : "1.5"} />
                <line x1="30" y1="75" x2="110" y2="120" stroke={activeNodes.includes('A') && activeNodes.includes('C') ? '#10b981' : '#cbd5e1'} strokeWidth={activeNodes.includes('A') && activeNodes.includes('C') ? "3.5" : "1.5"} />
                <line x1="110" y1="30" x2="110" y2="120" stroke={activeNodes.includes('B') && activeNodes.includes('C') ? '#10b981' : '#cbd5e1'} strokeWidth={activeNodes.includes('B') && activeNodes.includes('C') ? "3.5" : "1.5"} />
                <line x1="110" y1="30" x2="190" y2="75" stroke={activeNodes.includes('B') && activeNodes.includes('D') ? '#10b981' : '#cbd5e1'} strokeWidth={activeNodes.includes('B') && activeNodes.includes('D') ? "3.5" : "1.5"} />
                <line x1="110" y1="120" x2="190" y2="75" stroke={activeNodes.includes('C') && activeNodes.includes('D') ? '#10b981' : '#cbd5e1'} strokeWidth={activeNodes.includes('C') && activeNodes.includes('D') ? "3.5" : "1.5"} />

                {/* Node Circles */}
                <circle cx="30" cy="75" r="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <text x="35" y="79" fill="white" className="font-bold text-xs" textAnchor="middle">A</text>

                <circle cx="110" cy="30" r="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <text x="115" y="34" fill="white" className="font-bold text-xs" textAnchor="middle">B</text>

                <circle cx="110" cy="120" r="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <text x="115" y="124" fill="white" className="font-bold text-xs" textAnchor="middle">C</text>

                <circle cx="190" cy="75" r="14" fill="#10b981" stroke="#047857" strokeWidth="2" />
                <text x="195" y="79" fill="white" className="font-bold text-xs" textAnchor="middle">D</text>

                {/* Edge weights */}
                <text x="65" y="47" fill="#64748b" className="text-[10px] font-bold">{ab}</text>
                <text x="65" y="108" fill="#64748b" className="text-[10px] font-bold">{ac}</text>
                <text x="116" y="78" fill="#64748b" className="text-[10px] font-bold">{bc}</text>
                <text x="150" y="47" fill="#64748b" className="text-[10px] font-bold">{bd}</text>
                <text x="150" y="108" fill="#64748b" className="text-[10px] font-bold">{cd}</text>
              </svg>

              <div className="text-center">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-350">
                  Chemin Court Global : <span className="text-emerald-600 font-mono text-sm">{bestPathInfo.path.join(" → ")}</span>
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  Coût cumulé optimal = {bestPathInfo.cost}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards : Théorie des Graphes" icon="🧠" color="amber">
        <p className="mb-4">
          Un jeu interactif de consolidation de concepts pour réviser avant les interrogations de programmation de réseaux.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Qu'est-ce qu'un graphe dit connexe ?</>}
            back={<>C'est un graphe où il existe toujours au moins un chemin continu reliant deux sommets quelconques.</>}
          />
          <Flashcard 
            front={<>Comment calcule-t-on le degré d'un sommet dans un graphe simple ?</>}
            back={<>En dénombrant le nombre total d'arêtes reliant ce sommet à ses voisins.</>}
          />
          <Flashcard 
            front={<>Quelle est la règle d'Euler relative aux degrés des sommets ?</>}
            back={<>La somme de tous les degrés de tous les sommets est égale exactement à deux fois le nombre d'arêtes : {"$\\sum d(s_i) = 2 \\times |A|$"}.</>}
          />
          <Flashcard 
            front={<>À quelle condition l'algorithme de Dijkstra termine-t-il correctement ?</>}
            back={<>Si toutes les valeurs de pondérations portées par les arêtes du réseau sont positives ou nulles ({"$w_e \\ge 0$"}).</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Évaluation Graphes" icon="⚙" color="purple">
        <Quiz 
          questions={[
            {
              question: "Si la somme des degrés d'un graphe simple est 24, combien comporte-t-il d'arêtes ?",
              options: [
                "12 arêtes",
                "24 arêtes",
                "6 arêtes",
                "48 arêtes"
              ],
              correctAnswer: 0,
              explanation: "D'après la formule d'Euler (le lemme des poignées de mains), la somme des degrés vaut deux fois le nombre d'arêtes (2 * A = 24), d'où A = 12."
            },
            {
              question: "Quelle méthode permet d'identifier l'ordonnancement optimal des tâches sans goulet d'étranglement ?",
              options: [
                "L'algorithme de Dijkstra",
                "La méthode PERT (Program Evaluation and Review Technique)",
                "Le théorème d'Euler",
                "Le calcul barycentrique pondéré"
              ],
              correctAnswer: 1,
              explanation: "La méthode PERT est l'outil phare de recherche opérationnelle pour ordonnancer un réseau de tâches, calculer les dates au plus tôt/tard et définir le chemin critique."
            },
            {
              question: "Que représente le coefficient m_ij d'une matrice d'adjacence au carré M² ?",
              options: [
                "Le nombre de chemins de longueur exactement égale à 2 reliant le sommet i au sommet j",
                "Le carré de la distance séparant les deux nœuds",
                "La somme des degrés de chaque sommet",
                "L'existence d'une boucle fermée sur le nœud i"
              ],
              correctAnswer: 0,
              explanation: "En élevant une matrice d'adjacence d'ordre 1 à la puissance k, les coefficients de la matrice M^k représentent précisément le nombre de chaînes ou de chemins de longueur k entre le sommet i et j."
            }
          ]}
        />
      </Section>
    </div>
  );
};

export default Course_BTS_01_Graphes_et_Reseaux;
