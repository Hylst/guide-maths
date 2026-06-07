import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Target, Shuffle, Split, ListOrdered, GitBranch, ShieldAlert } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

// Interactive 2-Stage Tree and Urn Simulator
const InteractiveTreeSimulator: React.FC = () => {
  const [redCount, setRedCount] = useState<number>(3);
  const [blueCount, setBlueCount] = useState<number>(2);
  const [withReplacement, setWithReplacement] = useState<boolean>(false);

  const totalT1 = redCount + blueCount;
  
  // First draw probabilities
  const pR1 = redCount / totalT1;
  const pB1 = blueCount / totalT1;

  // Second draw probabilities if replacement
  const pR2_R1_rep = redCount / totalT1;
  const pB2_R1_rep = blueCount / totalT1;
  const pR2_B1_rep = redCount / totalT1;
  const pB2_B1_rep = blueCount / totalT1;

  // Second draw probabilities if non-replacement
  const pR2_R1_no = (redCount - 1) / (totalT1 - 1);
  const pB2_R1_no = blueCount / (totalT1 - 1);
  const pR2_B1_no = redCount / (totalT1 - 1);
  const pB2_B1_no = (blueCount - 1) / (totalT1 - 1);

  // Apply conditional probabilities depending on mode
  const pR2_R1 = withReplacement ? pR2_R1_rep : pR2_R1_no;
  const pB2_R1 = withReplacement ? pB2_R1_rep : pB2_R1_no;
  const pR2_B1 = withReplacement ? pR2_B1_rep : pR2_B1_no;
  const pB2_B1 = withReplacement ? pB2_B1_rep : pB2_B1_no;

  // Total paths calculations
  const pathRR = pR1 * pR2_R1;
  const pathRB = pR1 * pB2_R1;
  const pathBR = pB1 * pR2_B1;
  const pathBB = pB1 * pB2_B1;

  // Simplified fractions calculation (display text helpers)
  const getFractionText = (num: number, den: number) => {
    if (num < 0) return "0";
    return `${num}/${den}`;
  };

  return (
    <div className="not-prose bg-card border border-border rounded-[2rem] p-6 md:p-8 my-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <GitBranch className="w-6 h-6 text-indigo-500" />
        <h3 className="text-xl font-bold text-foreground">Schéma Interactif : Arbre Pondéré Dynamique</h3>
      </div>

      <p className="text-sm text-muted-text mb-6">
        Configurez le nombre de billes rouges et bleues de l'urne de départ, puis basculez entre les modes <strong>Avec remise</strong> (événements indépendants) et <strong>Sans remise</strong> (dépendants) pour voir l'arbre s’ajuster instantanément !
      </p>

      {/* Inputs panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Billes Rouges</span>
            <span className="text-rose-600 font-extrabold">{redCount}</span>
          </div>
          <input 
            type="range"
            min="2"
            max="8"
            step="1"
            value={redCount}
            onChange={(e) => setRedCount(parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Billes Bleues</span>
            <span className="text-blue-600 font-extrabold">{blueCount}</span>
          </div>
          <input 
            type="range"
            min="2"
            max="8"
            step="1"
            value={blueCount}
            onChange={(e) => setBlueCount(parseInt(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-500 mb-2 truncate">Mode de Tirage (2 Épreuves)</span>
          <div className="flex bg-muted p-1 rounded-xl gap-2 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setWithReplacement(true)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                withReplacement 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-muted-text hover:bg-slate-200'
              }`}
            >
              Avec Remise
            </button>
            <button
              onClick={() => setWithReplacement(false)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !withReplacement 
                  ? 'bg-rose-600 text-white' 
                  : 'text-muted-text hover:bg-slate-200'
              }`}
            >
              Sans Remise (Ninja)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
        
        {/* Dynamic Tree Drawing using custom coordinates */}
        <div className="lg:col-span-7 flex justify-center items-center bg-card rounded-2xl p-4 border border-dashed border-slate-200 dark:border-slate-800 min-h-[260px] relative overflow-hidden">
          <svg viewBox="0 0 340 220" className="w-full h-full max-h-[250px]" style={{ overflow: 'visible' }}>
            {/* Start Node */}
            <circle cx="20" cy="110" r="6" fill="#6366f1" />
            <text x="15" y="96" fill="#3b82f6" fontSize="9" fontWeight="bold">Urne ({totalT1} B)</text>

            {/* Path lines - First Stage */}
            <line x1="20" y1="110" x2="110" y2="55" stroke="#ef4444" strokeWidth="2.5" />
            <line x1="20" y1="110" x2="110" y2="165" stroke="#3b82f6" strokeWidth="2.5" />

            {/* Path Labels - First Stage */}
            <rect x="52" y="66" width="28" height="15" rx="4" fill="#fee2e2" stroke="#f87171" strokeWidth="1" />
            <text x="66" y="77" fill="#dc2626" fontSize="10" fontWeight="black" textAnchor="middle">{redCount}/{totalT1}</text>

            <rect x="52" y="138" width="28" height="15" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1" />
            <text x="66" y="149" fill="#2563eb" fontSize="10" fontWeight="black" textAnchor="middle">{blueCount}/{totalT1}</text>

            {/* Stage 1 Nodes */}
            <circle cx="110" cy="55" r="5" fill="#ef4444" />
            <text x="110" y="44" fill="#dc2626" fontSize="10" fontWeight="extraBold" textAnchor="middle">R1</text>

            <circle cx="110" cy="165" r="5" fill="#3b82f6" />
            <text x="110" y="181" fill="#2563eb" fontSize="10" fontWeight="extraBold" textAnchor="middle">B1</text>

            {/* Path lines - Second Stage (Top Branch R1) */}
            <line x1="110" y1="55" x2="220" y2="25" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="110" y1="55" x2="220" y2="85" stroke="#3b82f6" strokeWidth="1.5" />

            {/* Path Labels - Top Branch T2 */}
            <rect x="150" y="24" width="30" height="15" rx="4" fill="#fee2e2" stroke="#f87171" strokeWidth="0.5" />
            <text x="165" y="35" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">
              {getFractionText(withReplacement ? redCount : redCount - 1, withReplacement ? totalT1 : totalT1 - 1)}
            </text>

            <rect x="150" y="66" width="30" height="15" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="0.5" />
            <text x="165" y="77" fill="#2563eb" fontSize="9" fontWeight="bold" textAnchor="middle">
              {getFractionText(blueCount, withReplacement ? totalT1 : totalT1 - 1)}
            </text>

            {/* Path lines - Second Stage (Bottom Branch B1) */}
            <line x1="110" y1="165" x2="220" y2="135" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="110" y1="165" x2="220" y2="195" stroke="#3b82f6" strokeWidth="1.5" />

            {/* Path Labels - Bottom Branch T2 */}
            <rect x="150" y="134" width="30" height="15" rx="4" fill="#fee2e2" stroke="#f87171" strokeWidth="0.5" />
            <text x="165" y="145" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">
              {getFractionText(redCount, withReplacement ? totalT1 : totalT1 - 1)}
            </text>

            <rect x="150" y="176" width="30" height="15" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="0.5" />
            <text x="165" y="187" fill="#2563eb" fontSize="9" fontWeight="bold" textAnchor="middle">
              {getFractionText(withReplacement ? blueCount : blueCount - 1, withReplacement ? totalT1 : totalT1 - 1)}
            </text>

            {/* End Nodes & Outcomes labels */}
            <circle cx="220" cy="25" r="4" fill="#e11d48" />
            <text x="228" y="29" fill="#9f1239" fontSize="9" fontWeight="black">[R, R] : {(pathRR * 100).toFixed(1)}%</text>

            <circle cx="220" cy="85" r="4" fill="#0284c7" />
            <text x="228" y="89" fill="#0369a1" fontSize="9" fontWeight="black">[R, B] : {(pathRB * 100).toFixed(1)}%</text>

            <circle cx="220" cy="135" r="4" fill="#e11d48" />
            <text x="228" y="139" fill="#9f1239" fontSize="9" fontWeight="black">[B, R] : {(pathBR * 100).toFixed(1)}%</text>

            <circle cx="220" cy="195" r="4" fill="#0284c7" />
            <text x="228" y="199" fill="#0369a1" fontSize="9" fontWeight="black">[B, B] : {(pathBB * 100).toFixed(1)}%</text>
          </svg>
        </div>

        {/* Probabilities Outcomes Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-xs">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <h4 className="font-extrabold text-[#4f46e5] mb-3 uppercase text-xs tracking-wider">Calcul des de destins finaux :</h4>
            
            <div className="space-y-3 font-medium">
              <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500">
                <span className="font-bold">P(Deux Rouges [R, R]) :</span><br/>
                <span className="font-mono text-[10px] text-slate-500">
                  {pR1.toFixed(2)} × {pR2_R1.toFixed(2)} = <strong>{(pathRR * 100).toFixed(1)}%</strong>
                </span>
              </div>
              
              <div className="p-2 rounded bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-indigo-400">
                <span className="font-bold">P(Une de chaque couleur) :</span><br/>
                <span className="text-[10.5px] text-slate-600 block mb-1">Chemin [R,B] OU chemin [B,R] (on additionne) :</span>
                <span className="font-mono text-[10px] text-slate-500">
                  ({pR1.toFixed(2)} × {pB2_R1.toFixed(2)}) + ({pB1.toFixed(2)} × {pR2_B1.toFixed(2)}) = <strong>{((pathRB + pathBR) * 100).toFixed(1)}%</strong>
                </span>
              </div>

              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500">
                <span className="font-bold">P(Au moins une Rouge) :</span><br/>
                <span className="text-[10.5px] text-slate-600 block mb-1">Formule ninja : l'inverse de [B, B] (Aucune rouge) :</span>
                <span className="font-mono text-[10px] text-slate-500">
                  1 - P([B, B]) = 1 - {pathBB.toFixed(2)} = <strong>{((1 - pathBB) * 100).toFixed(1)}%</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Course_College_3eme_11_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-11"
        title="Probabilités à 2 Épreuves (Ninja)"
        subtitle="Entrez dans la matrice des univers parallèles !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Probabilités simples (Loi de base)", "Additionner et multiplier des fractions"]}
        objectives={[
          "Différencier Événements Indépendants et Dépendants (Avec ou Sans remise).",
          "Construire et lire un Arbre de Probabilités Pondéré.",
          "Multiplier les branches pour trouver la probabilité d'un chemin unifié.",
          "Additionner les chemins quand plusieurs scénarios gagnent."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Comment calculer une probabilité simple ?">
        Dans un univers de hasard simple (appelé situation d&apos;équiprobabilité), la probabilité d&apos;un événement se calcule toujours en divisant le nombre de cas favorables par le nombre total de cas possibles : 
        <br /><code>{"$P(A) = \\frac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issues}}$"}</code>. 
        <br />Ce résultat est toujours compris entre 0 (événement impossible) et 1 (événement certain).
      </InfoBlock>

      <Section title="🌟 Introduction : L'effet Papillon de la Destinée" icon="🦋" color="slate">
        <p>
          Au cours d'initiation aux probabilités, nous avons appris à jeter un seul dé équilibré ou à puiser une seule carte dans un paquet de 32. C'était "un univers ponctuel à une seule dimension". <br />
          Mais dans la vie courante, la prise de décision et les jeux de hasard s'enchaînent de manière chronologique : vous piochez un premier jeton <strong>PUIS</strong> vous en piochez un second, sans pour autant le remettre dans l'urne.
        </p>
        <p className="mt-4">
          Comment modéliser et calculer rigoureusement ces enchaînements temporels d'univers parallèles ? C'est le royaume des <strong>Épreuves Composées</strong> et du plus puissant vecteur d'automatisation logique de ce chapitre : l'<strong>Arbre Pondéré</strong>.
        </p>
      </Section>

      <Section title="1. Indépendance vs Tirage Sans Remise" icon="🔄" color="indigo">
        <p className="mb-4">
          Le plus gros piège de ce chapitre ne réside pas dans le calcul fractionnaire mais dans l'analyse de l'énoncé. L'univers global change-t-il entre l'étape N°1 et l'étape N°2 ?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800 shadow-sm">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-3 flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-emerald-500" /> Événements Indépendants (Avec Remise)
            </h4>
            <p className="text-sm mb-4 leading-relaxed">
              Le premier événement <strong>n'a aucune influence physique</strong> sur le second essai. L’objet d’étude reste inchangé.
            </p>
            <ul className="text-xs space-y-2 mb-4 font-semibold text-emerald-900 dark:text-emerald-100">
              <li>• Lancer un dé deux fois de suite.</li>
              <li>• Tirer une boule, enregistrer sa couleur, puis la <strong>remettre</strong> dans l'urne.</li>
            </ul>
            <div className="bg-emerald-100/50 dark:bg-[#064e3b]/40 p-3 rounded-lg text-center font-bold text-xs">
              L'univers global reste STRICTEMENT IDENTIQUE.
            </div>
          </div>
          
          <div className="bg-rose-50/50 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800 shadow-sm">
            <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-3 flex items-center gap-2">
              <Split className="w-5 h-5 text-rose-500" /> Événements Dépendants (Sans Remise)
            </h4>
            <p className="text-sm mb-4 leading-relaxed">
              Le premier résultat <strong>détruit ou modifie</strong> la structure de l'univers pour le second essai.
            </p>
            <ul className="text-xs space-y-2 mb-4 font-semibold text-rose-900 dark:text-rose-100">
              <li>• Piocher une carte de jeu et la <strong>conserver</strong> dans sa main.</li>
              <li>• Tirer une bille d'un sac et ne pas la replacer avant le second tour.</li>
            </ul>
            <div className="bg-rose-100/50 dark:bg-[#7f1d1d]/40 p-3 rounded-lg text-center font-bold text-xs">
              L'échantillon total DIMINUE d'un élément !
            </div>
          </div>
        </div>

        <InfoBlock title="Le saviez-vous ? Blaise Pascal et Pierre de Fermat, inventeurs du calcul de probabilités" type="funfact">
          C&apos;est en 1654, à la suite d&apos;une série de lettres échangées entre deux géants de la pensée française, <strong>Blaise Pascal</strong> et <strong>Pierre de Fermat</strong>, qu&apos;est née la théorie moderne des probabilités. Ils tentaient de résoudre le « Problème des partis », inventé par un joueur professionnel appelé le Chevalier de Méré : comment répartir équitablement les mises d&apos;un jeu de hasard si les joueurs sont interrompus en cours de partie avant la fin règlementaire ? Leurs correspondances ont fondé un domaine entier des mathématiques !
        </InfoBlock>
      </Section>

      <Section title="2. Construire l'Arbre Magique" icon="🌲" color="blue">
        <p className="mb-4">
          Pour visualiser les bifurcations chronologiques de notre destin, nous dessinons un <strong>arbre de probabilités pondéré</strong>. Il est régenté par trois lois immuables :
        </p>
        
        <div className="bg-card p-6 rounded-2xl border border-l-8 border-sky-500 shadow-sm my-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border-border">
          <GitBranch className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-48 h-48 text-sky-500/10 pointer-events-none" />
          <div className="flex-1 z-10">
            <h3 className="font-bold text-sky-800 dark:text-sky-400 text-lg mb-4">La Constitution d'un Arbre Parfait</h3>
            <ul className="space-y-4 text-xs md:text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="bg-sky-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0 text-xs text-center">1</span>
                <div>
                  <strong>Les Nœuds :</strong> C'est la bifurcation temporelle (l'action de piocher). De chaque nœud sortent plusieurs branches de possibilités.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-sky-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0 text-xs text-center">2</span>
                <div>
                  <strong>Les Branches :</strong> Elles portent chacune un coefficient fractionnaire appelé <strong>Poids</strong>. Ce poids est la probabilité d'emprunter ce chemin.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-sky-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0 text-xs text-center">3</span>
                <div>
                  <strong>La Loi du Nœud :</strong> La somme des probabilités de toutes les branches issues d'un même nœud doit <strong>toujours être strictement égale à 1</strong> (soit 100% de notre univers local).
                </div>
              </li>
            </ul>
          </div>
        </div>

        <InfoBlock type="info" title="Zoom sur : Les arbres infinis et les arbres à plus de deux épreuves">
          Si l&apos;on multipliait le nombre d&apos;épreuves (par exemple tirer 5 fois de suite dans une urne), l&apos;arbre de probabilité commencerait à ressembler à une touffe géante de branches incontrôlables ! 
          <br />Pour d&apos;immenses suites d&apos;actions chronologiques répétées (comme le mouvement brownien des molécules de gaz ou la modélisation financière des cours de bourse), on utilise des outils de modélisation mathématique plus profonds comme les <strong>chaînes de Markov</strong>. L&apos;état futur ne dépend alors que de l&apos;état présent, un principe fondamental des systèmes dynamiques et des IA actuelles !
        </InfoBlock>
      </Section>

      {/* Insert our epic dynamic interactive simulator here */}
      <InteractiveTreeSimulator />

      <Section title="3. Règle #1 : Le Multiplicateur de Destin (Horizontal)" icon="✖️" color="amber">
        <p className="mb-4 text-sm md:text-base leading-relaxed">
          Pour évaluer la probabilité combinée d'un itinéraire chronologique complet bien déterminé (Exemple : "Avoir obtenu d'abord une bille Rouge au tirage 1, <strong>ET ENCORE</strong> une Rouge au tirage 2"), nous employons la loi de multiplication des intersections :
        </p>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-300 dark:border-amber-800 text-center shadow-inner mb-6">
          <p className="font-serif font-black text-xl text-amber-900 dark:text-amber-200 mb-2">"LE LONG D'UN CHEMIN, ON MULTIPLIE LES PROBABILITÉS."</p>
          <p className="font-mono text-xs">{"$P(A \\cap B) = P(A) \\times P_A(B)$"}</p>
        </div>

        <InteractiveExercise 
          title="Modélisation d'un tirage sans remise"
          question={
            <>
              Une urne close contient <strong>3 billes Rouges et 2 billes Bleues</strong> (soit 5 au total). On tire coup sur coup DEUX billes <strong>SANS REMISE</strong>. <br />
              Quelle est la probabilité fractionnaire d'extraire la combinaison exacte Rouge-Rouge ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Analyser le Tirage N°1</strong><br/>
              Au départ, nous avons 3 billes Rouges disponibles sur un total complet de 5.<br/>
              La probabilité de la branche N°1 d'obtenir Rouge est de : <strong>{"$\\frac{3}{5}$"}</strong>.
            </>,
            <>
              <strong>Étape 2 : Analyser le Tirage N°2 (Effet sans remise !)</strong><br/>
              Puisque le tirage s'effectue sans replacement, nous avons extrait et conservé une bille Rouge. <br />
              Pour la suite du parcours, l'urne ne compte plus que <strong>2 billes Rouges</strong> et un total de <strong>4 billes seulement</strong> !<br/>
              La probabilité de la seconde branche partant vers le rouge est ainsi de : <strong>{"$\\frac{2}{4}$"}</strong> (qui se simplifie en {"$\\frac{1}{2}$"}).
            </>,
            <>
              <strong>Étape 3 : Calcul final de la trajectoire</strong><br/>
              On multiplie le long du chemin tracé : <br/>
              {"$P(\\text{Rouge } \\cap \\text{ Rouge}) = \\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10}$"} (soit exactement 30% d'occurrences).
            </>
          ]}
        />
      </Section>

      <Section title="4. Règle #2 : L'Addition des Mondes (Vertical)" icon="➕" color="emerald">
        <p className="mb-4 leading-relaxed">
          Parfois, l’énoncé d'examen ne précise pas l'ordre d'obtention de notre cible (Exemple : "Calculer la trajectoire d'obtention de <strong>billes de couleurs différentes</strong>"). <br />
          Ici, nous cumulons deux univers favorables distincts : [Rouge, puis Bleu] <strong>OU</strong> [Bleu, puis Rouge].
        </p>

        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-center shadow-inner mb-6">
          <p className="font-serif font-black text-xl text-emerald-900 dark:text-emerald-200 mb-2">"LORSQUE PLUSIEURS CHEMINS GAGNENT, ON LES ADDITIONNE."</p>
          <p className="font-mono text-xs">{"$P(\\text{Gain}) = P(\\text{Chemin A}) + P(\\text{Chemin B})$"}</p>
        </div>
        
        <TipBanner title="L'arme secrète Ninja : Le passage par le Contraire !" type="warning">
          Une consigne au brevet particulièrement redoutable vous impose : <em>"Calculer la probabilité d'obtenir <strong>au moins une</strong> bille rouge au terme du parcours."</em>.<br />
          Lister et additionner tous les chemins contenant au moins une branche rouge peut s'avérer fastidieux et est source d'erreurs. <br />
          <strong>L'astuce suprême :</strong> Identifiez le seul et unique cas tragique de défaite. "Au moins une rouge" a pour contraire absolu : "Zéro bille rouge" (soit la combinaison homogène <em>[Bleu - Bleu]</em>).<br />
          On applique alors la loi du complément : <br />
          <span className="block text-center font-bold text-indigo-700 dark:text-indigo-300 my-2">{"$P(\\text{Au moins 1 Rouge}) = 1 - P(\\text{Bleu, Bleu})$"}</span>
        </TipBanner>
      </Section>

      <Section title="5. Exercices Résolus" icon="📝" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Le digicode défectueux"
          question={
            <>
              Un coffre fort est protégé par un digicode comportant deux boutons uniques : {"$A$"} et {"$B$"}. <br />
              Le code correct est {"$A-A$"} à deux étapes. Une personne tape au hasard un code à deux boutons.<br/>
              1. En modélisant par un arbre (on considère l'indépendance avec remise), déduire l'univers total.<br/>
              2. Quelle est la probabilité que la personne saisisse le bon code A-A ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Construction de l'univers possible</strong><br/>
              À chaque appui, on dispose de deux issues possibles d'une probabilité identique de {"$1/2$"}.<br/>
              L'univers complet comporte 4 issues distinctes (on multiplie les alternatives) : <br/>
              {"$\\Omega = \\{ A-A, A-B, B-A, B-B \\}$"}.
            </>,
            <>
              <strong>Étape 2 : Calcul du chemin d'accès au but</strong><br/>
              Le bon chemin est d'engager A (un demi), puis d'engager encore A (un demi). <br/>
              {"$P(A-A) = P(A) \\times P(A) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$"} (soit 25%).
            </>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Sélection de billes dans le noir"
          question={
            <>
              Un tiroir comporte 3 chaussettes Rouges (R) et 1 chaussette Noire (N). Une personne tire au hasard DEUX chaussettes dans l'obscurité complète pour s'habiller (sans remise).<br />
              Quelle est la probabilité d'obtenir une paire de couleur unie (R-R ou N-N) ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calculer le premier chemin favorable R-R</strong><br/>
              - Tirage 1 : On a 3 Rouges sur 4 chaussettes au total, soit : {"$P(R1) = \\frac{3}{4}$"}.<br/>
              - Tirage 2 : Si l'on pioche une seconde rouge, il n'en reste plus que 2 sur un total de 3, soit : {"$P_{R1}(R2) = \\frac{2}{3}$"}.<br/>
              - Chemin global R-R = {"$\\frac{3}{4} \\times \\frac{2}{3} = \\frac{6}{12} = \\frac{1}{2}$"}.
            </>,
            <>
              <strong>Étape 2 : Analyser le chemin d'échec ou d'alternative N-N</strong><br/>
              Puisqu'il n'existe qu'<strong>une seule chaussette noire au départ</strong>, il est rigoureusement impossible d'obtenir une paire noire-noire sans remise ! Sa probabilité est nulle : {"$P(N-N) = 0$"}.
            </>,
            <>
              <strong>Étape 3 : Additionner les possibilités de couleur unie</strong><br/>
              La probabilité d'avoir une paire unie se résume uniquement au chemin R-R car le chemin N-N est impossible : <br/>
              {"$P(\\text{Paire unie}) = P(R-R) + P(N-N) = \\frac{1}{2} + 0 = \\frac{1}{2}$"} (soit 50% de chance d'obtenir des chaussettes assorties).
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Vrai ou Faux : Si l'on additionne sans exception toutes les probabilités situées au bout de chaque branche finale d'un arbre, quelle valeur obtient-on ?</>}
            back={<><strong>VRAI ABSOLU ! On obtient rigoureusement 1 (soit 100%).</strong><br/>La somme de tous les destins cumulés d'un arbre représente le champ total des possibles. C'est le moyen parfait de vérifier si vos fractions ne comportent pas d'erreurs en plein contrôle !</>}
          />
          <Flashcard 
            front={<>Quelle est la traduction en signe d'opération mathématique des conjonctions communes "ET" et "OU" ?</>}
            back={<>La conjonction <strong>"ET"</strong> se traduit par une **multiplication ("×")** (je veux tirer une rouge au premier essai ET une noire au second).<br/><br/>La conjonction <strong>"OU"</strong> se traduit par une **addition ("+")** (je veux la combinaison R-B OU la combinaison B-R).</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Faut-il systématiquement simplifier les fractions sur chaque branche d'un arbre ?",
              answer: "Ce n'est pas recommandé si vous voulez éviter des erreurs de calcul ! Conserver le même dénominateur global brut sur vos branches facilite grandement les additions finales de chemins, car vous n'aurez pas besoin de rechercher à nouveau un dénominateur commun."
            },
            {
              question: "Peut-on utiliser un arbre pondéré pour plus de 2 tirages ?",
              answer: "Tout à fait ! Cependant, l'arbre se ramifie de façon exponentielle. À 3 tirages, un arbre à deux issues comportera déjà 8 branches terminales. Veillez à soigner la présentation sur votre copie."
            },
            {
              question: "Qu'est-ce qu'une probabilité conditionnelle dans un arbre sans remise ?",
              answer: "C'est la probabilité de l'événement de l'étape 2 sachant ce qui s'est concrètement produit à l'étape 1. Elle s'écrit formellement P_A(B) et se situe directement sur la branche de l’épreuve 2."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on fait rouler un dé de 6 faces, puis qu'on jette une pièce équilibrée. Quelle expression décrit au mieux ce système ?",
              options: [
                "Une suite d'événements parfaitement indépendants (la pièce ne conserve aucune mémoire du dé).",
                "Des événements dépendants car les deux s'enchaînent.",
                "Un système non calculable car les deux objets n'ont aucun rapport."
              ],
              correctAnswer: 0,
              explanation: "Félicitations ! Lancer deux objets sans interaction physique produit toujours des épreuves dites indépendantes."
            },
            {
              question: "Un sachet contient 2 bonbons Verts et 8 Noirs (10 au total). On tire coup sur coup 2 bonbons SANS REMISE. Quelle est la probabilité d'obtenir deux bonbons Noirs ?",
              options: [
                "$\\frac{8}{10} \\times \\frac{8}{10}$",
                "$\\frac{8}{10} \\times \\frac{7}{9}$",
                "$\\frac{8}{10} + \\frac{7}{10}$"
              ],
              correctAnswer: 1,
              explanation: "Top ! On multiplie le long du parcours. De plus, à l'étape 2 (sans replacement), il ne reste plus que 7 noirs parmi 9 bonbons au total."
            },
            {
              question: "En lançant deux fois de suite une pièce équilibrée, quelle est la probabilité d'obtenir la combinaison Face-Face ?",
              options: [
                "$\\frac{1}{2}$",
                "$\\frac{1}{4}$",
                "$\\frac{1}{8}$"
              ],
              correctAnswer: 1,
              explanation: "Parfait ! La pièce n'ayant pas de mémoire (tirage avec remise de fait), la probabilité équivaut à 1/2 au premier jet, multiplié par 1/2 au second jet, soit 1/4 (25% d'occurrences)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais distinguer visuellement un tirage Avec Remise d'un tirage Sans Remise.",
            "Je sais multiplier les probabilités le long d'un même chemin d'un arbre.",
            "J'additionne les fractions des différents embranchements victorieux.",
            "Je maîtrise la formule ninja du passage par le contraire (1 - P(échec) ) pour simplifier."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_College_3eme_11_Probabilites;
