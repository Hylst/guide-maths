import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { MoveUpRight, FastForward, Repeat, Merge, Sliders, RefreshCw, Compass } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_08_Vecteurs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Vector Interactive Grid Game State
  const [vectorSumMode, setVectorSumMode] = useState<'chasles' | 'parallelogram'>('chasles');
  const [uCoords, setUCoords] = useState<{ x: number; y: number }>({ x: 3, y: 1 });
  const [vCoords, setVCoords] = useState<{ x: number; y: number }>({ x: 1, y: -3 });

  // Grid constants
  const cellSize = 22;
  const gridCenter = 110; // (5, 5) on index

  const handleAdjustVector = (vecName: 'u' | 'v', axis: 'x' | 'y', value: number) => {
    if (vecName === 'u') {
      setUCoords(prev => ({ ...prev, [axis]: Math.max(-5, Math.min(5, prev[axis] + value)) }));
    } else {
      setVCoords(prev => ({ ...prev, [axis]: Math.max(-5, Math.min(5, prev[axis] + value)) }));
    }
  };

  const handleResetSim = () => {
    setVectorSumMode('chasles');
    setUCoords({ x: 3, y: 1 });
    setVCoords({ x: 1, y: -3 });
  };

  // Coordinates formulas inputs
  const sumX = uCoords.x + vCoords.x;
  const sumY = uCoords.y + vCoords.y;

  // Render variables
  const uxCoord = gridCenter + uCoords.x * cellSize;
  const uyCoord = gridCenter - uCoords.y * cellSize; // subtract because SVG y goes down

  // In Chasles, v starts from u's endpoint
  const vxCoordChasles = uxCoord + vCoords.x * cellSize;
  const vyCoordChasles = uyCoord - vCoords.y * cellSize;

  // In Parallelogram, both start from center
  const vxCoordPara = gridCenter + vCoords.x * cellSize;
  const vyCoordPara = gridCenter - vCoords.y * cellSize;

  const wXCoord = gridCenter + sumX * cellSize;
  const wYCoord = gridCenter - sumY * cellSize;

  return (
    <div id="vecteur-course-root" className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        id="vecteur-header"
        acronym="MATH-3EME-08"
        title="Vecteurs et Translations"
        subtitle="Domptez les flèches directionnelles mathématiques pour modéliser le mouvement !"
        duration="1h 15"
        level="3ème (Cycle 4)"
        prerequisites={["Géométrie classique", "Se repérer dans le plan cartésien", "Règles d'addition"]}
        objectives={[
          "Comprendre la Translation comme un glissement rigide sans déformation.",
          "Définir un Vecteur par sa Trinité sacrée : Direction, Sens, et Norme (longueur).",
          "Maîtriser l'addition géométrique de vecteurs avec la Relation de Chasles.",
          "Savoir calculer les coordonnées d'un vecteur et le milieu d'un segment dans le plan."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Repérage cartésien de base">
        Avant de manipuler des vecteurs, rappelle-toi que chaque point dans le plan est repéré par un couple unique de coordonnées {"$(x ; y)$"}. Le premier nombre {"$x$"} désigne l&apos;<strong>abscisse</strong> (position sur l&apos;axe horizontal) et le second nombre {"$y$"} désigne l&apos;<strong>ordonnée</strong> (position sur l&apos;axe vertical). Par exemple, le point {"$A(2 ; -3)$"} se situe de 2 unités vers la droite et 3 unités vers le bas !
      </InfoBlock>

      <Section id="intro" title="🌟 Introduction : Modéliser le vent et le mouvement" icon="🚠" color="slate">
        <p>
          En géométrie élémentaire de primaire, nous dessinons des objets statiques posés au sol : des triangles, des cercles, des quadrilatères. Mais comment modéliser l'élan, la force d'un vent rugissant ou la dérive d'un bateau sur un océan plat ?
        </p>
        <p className="mt-4">
          C'est ici qu'intervient la <strong>Translation</strong> (l'action de glisser). Et pour symboliser ce déplacement exact de manière universelle, les ingénieurs utilisent le super-pouvoir du <strong>Vecteur !</strong> Une flèche magique transmissible, représentable de mille manières mais conservant toujours le même ADN directionnel.
        </p>
      </Section>

      {/* SVG INTERACTIVE GEOMETRIC VECTOR COMPASS GRID APPLET */}
      <Section id="coordonnees-interactive" title="🏹 Le Laboratoire Vectoriel Cartésien" icon="🧬" color="indigo">
        <TipBanner id="vector-banner" title="Manipulez la somme de deux vecteurs sur la carte" type="info">
          Modifiez les composantes horizontales et verticales des vecteurs {"$\\vec{u}$"} et {"$\\vec{v}$"} à l'aide des glissiers. Observez comment le vecteur somme {"$\\vec{w} = \\vec{u} + \\vec{v}$"} se construit en direct dans le plan !
        </TipBanner>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch bg-card border border-border-strong rounded-[2rem] p-6 shadow-md">
          {/* Controls - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-2xs uppercase tracking-wider text-slate-400 font-bold block">1. Configuration des Vecteurs :</span>
              
              {/* u controller */}
              <div className="bg-slate-50 dark:bg-slate-900 border p-3 rounded-2xl">
                <p className="text-xs font-bold text-rose-500 mb-2">Vecteur {"$\\vec{u}$"} (Rouge) :</p>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>Horizontal (x) : <strong>{uCoords.x}</strong></span>
                  <div className="flex gap-1">
                    <button onClick={() => handleAdjustVector('u', 'x', -1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">-</button>
                    <button onClick={() => handleAdjustVector('u', 'x', 1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs font-mono mt-2">
                  <span>Vertical (y) : <strong>{uCoords.y}</strong></span>
                  <div className="flex gap-1">
                    <button onClick={() => handleAdjustVector('u', 'y', -1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">-</button>
                    <button onClick={() => handleAdjustVector('u', 'y', 1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">+</button>
                  </div>
                </div>
              </div>

              {/* v controller */}
              <div className="bg-slate-50 dark:bg-slate-900 border p-3 rounded-2xl">
                <p className="text-xs font-bold text-indigo-500 mb-2">Vecteur {"$\\vec{v}$"} (Bleu) :</p>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>Horizontal (x) : <strong>{vCoords.x}</strong></span>
                  <div className="flex gap-1">
                    <button onClick={() => handleAdjustVector('v', 'x', -1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">-</button>
                    <button onClick={() => handleAdjustVector('v', 'x', 1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs font-mono mt-2">
                  <span>Vertical (y) : <strong>{vCoords.y}</strong></span>
                  <div className="flex gap-1">
                    <button onClick={() => handleAdjustVector('v', 'y', -1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">-</button>
                    <button onClick={() => handleAdjustVector('v', 'y', 1)} className="w-6 h-6 border rounded bg-card hover:bg-slate-100 font-bold">+</button>
                  </div>
                </div>
              </div>

              {/* Sum Mode Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 block uppercase">2. Méthode géométrique d'addition :</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setVectorSumMode('chasles')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      vectorSumMode === 'chasles' 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Chasles (Bout-à-Bout)
                  </button>
                  <button 
                    onClick={() => setVectorSumMode('parallelogram')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      vectorSumMode === 'parallelogram' 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Parallélogramme (Origine)
                  </button>
                </div>
              </div>
            </div>

            {/* Sum stats output */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-4 rounded-xl font-mono text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1 uppercase tracking-wider">Calcul analytique :</span>
              <span>{"$\\vec{w} = \\vec{u} + \\vec{v}$"}</span>
              <br />
              <span>{"$w_x = u_x + v_x = $"} {uCoords.x} + {vCoords.x} = <strong>{sumX}</strong></span>
              <br />
              <span>{"$w_y = u_y + v_y = $"} {uCoords.y} + {vCoords.y} = <strong>{sumY}</strong></span>
            </div>

            <button 
              onClick={handleResetSim}
              className="py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-2 w-fit"
            >
              <RefreshCw size={14} /> Réinitialiser
            </button>
          </div>

          {/* SVG coordinate system rendering - 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-between items-center bg-slate-50 dark:bg-slate-950 rounded-3xl p-4 border border-dashed min-h-[350px]">
            <span className="text-2xs font-extrabold tracking-widest text-slate-400 uppercase select-none">Carte interactive Vectorielle</span>

            <div className="relative w-full h-64 flex items-center justify-center my-2">
              <svg className="w-64 h-64 bg-background rounded-2xl border shadow-inner overflow-hidden" viewBox="0 0 220 220">
                {/* Visual Grid Lines */}
                {Array.from({ length: 11 }).map((_, idx) => {
                  const pos = idx * cellSize;
                  return (
                    <g key={idx}>
                      <line x1={pos} y1="0" x2={pos} y2="220" stroke="currentColor" strokeWidth="1" className="text-slate-100 dark:text-slate-900" />
                      <line x1="0" y1={pos} x2="220" y2={pos} stroke="currentColor" strokeWidth="1" className="text-slate-100 dark:text-slate-900" />
                    </g>
                  );
                })}

                {/* Main Cartesian Axes */}
                <line x1="110" y1="0" x2="110" y2="220" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />
                <line x1="0" y1="110" x2="220" y2="110" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />

                {/* Arrow head markers defs */}
                <defs>
                  <marker id="u-head" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto" className="text-rose-500" fill="currentColor">
                    <polygon points="0 0, 6 2, 0 4" />
                  </marker>
                  <marker id="v-head" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto" className="text-indigo-500" fill="currentColor">
                    <polygon points="0 0, 6 2, 0 4" />
                  </marker>
                  <marker id="w-head" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto" className="text-emerald-500" fill="currentColor">
                    <polygon points="0 0, 6 2, 0 4" />
                  </marker>
                </defs>

                {/* Sum Vector (w) - Starting at Grid center always */}
                <line 
                  x1={gridCenter} 
                  y1={gridCenter} 
                  x2={wXCoord} 
                  y2={wYCoord} 
                  stroke="currentColor" 
                  className="text-emerald-500" 
                  strokeWidth="3.5" 
                  markerEnd="url(#w-head)" 
                />

                {/* Vector u - Starts at Grid center */}
                <line 
                  x1={gridCenter} 
                  y1={gridCenter} 
                  x2={uxCoord} 
                  y2={uyCoord} 
                  stroke="currentColor" 
                  className="text-rose-500" 
                  strokeWidth="2.5" 
                  markerEnd="url(#u-head)" 
                />

                {/* Vector v and helpers based on selected method */}
                {vectorSumMode === 'chasles' ? (
                  <g>
                    {/* v plotted consecutively at u's tip */}
                    <line 
                      x1={uxCoord} 
                      y1={uyCoord} 
                      x2={vxCoordChasles} 
                      y2={vyCoordChasles} 
                      stroke="currentColor" 
                      className="text-indigo-500" 
                      strokeWidth="2.5" 
                      markerEnd="url(#v-head)" 
                    />
                  </g>
                ) : (
                  <g>
                    {/* v plotted at same origin as u */}
                    <line 
                      x1={gridCenter} 
                      y1={gridCenter} 
                      x2={vxCoordPara} 
                      y2={vyCoordPara} 
                      stroke="currentColor" 
                      className="text-indigo-500" 
                      strokeWidth="2.5" 
                      markerEnd="url(#v-head)" 
                    />
                    {/* Dashed parallel projection of u from v's tip */}
                    <line 
                      x1={vxCoordPara} 
                      y1={vyCoordPara} 
                      x2={wXCoord} 
                      y2={wYCoord} 
                      stroke="currentColor" 
                      className="text-rose-500/50" 
                      strokeDasharray="3" 
                      strokeWidth="1.5" 
                    />
                    {/* Dashed parallel projection of v from u's tip */}
                    <line 
                      x1={uxCoord} 
                      y1={uyCoord} 
                      x2={wXCoord} 
                      y2={wYCoord} 
                      stroke="currentColor" 
                      className="text-indigo-500/50" 
                      strokeDasharray="3" 
                      strokeWidth="1.5" 
                    />
                  </g>
                )}
              </svg>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Glissez et observez comment l'addition vectorielle {"$\\vec{u} + \\vec{v}$"} fusionne de manière analytique et géométrique, peu importe le point de départ choisi !
            </p>
          </div>
        </div>
      </Section>

      <Section id="translation" title="1. La Translation : le baiser de glissement" icon="🏂" color="indigo">
        <p className="mb-4">
          Imaginez un chariot de montagnes russes sur des rails parfaitement droits. Une <strong>Translation</strong> est l'action de faire GLISSER une figure plane le long d'un parcours rectiligne sans jamais la faire pivoter ni déformer ses traits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-sky-50 dark:bg-sky-900/10 p-6 rounded-[2rem] border border-sky-100 shadow-sm space-y-2">
                <h4 className="font-bold text-sky-800 dark:text-sky-300">Ce qui se CONSERVE :</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>✅ Toutes les longueurs de segments d'origine.</li>
                  <li>✅ L'intégralité des mesures d'angles intérieurs.</li>
                  <li>✅ Les surfaces, l'aire et le périmètre total.</li>
                  <li>✅ Le parallélisme d'origine des lignes.</li>
                </ul>
           </div>
           
           <div className="bg-rose-50/50 dark:bg-rose-900/10 p-6 rounded-[2rem] border border-rose-100 shadow-sm space-y-2">
                <h4 className="font-bold text-rose-900 dark:text-rose-300">Ce qui est INTERDIT :</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>❌ Faire pivoter la forme (c'est une Rotation).</li>
                  <li>❌ Retourner la forme "effet miroir" (c'est une Symétrie).</li>
                  <li>❌ Étioler ou rétrécir le gabarit (c'est une Homothétie).</li>
                </ul>
           </div>
        </div>
      </Section>

        <InfoBlock title="Le saviez-vous ? Le mot « Vecteur » et les moustiques !" type="funfact">
          En latin, le mot « vector » signifie « conducteur » ou « transporteur ». Au cours de l&apos;histoire, l&apos;humanité a inventé de multiples usages pour ce terme : 
          <br />- En <strong>mathématiques</strong>, il transporte un point d&apos;un endroit à un autre de manière idéale.
          <br />- En <strong>médecine</strong> (biologie), un vecteur désigne un organisme vivant (comme le redoutable moustique tigre) qui transporte un virus pour l&apos;inoculer d&apos;un hôte à un autre !
        </InfoBlock>

      <Section id="vecteur" title="2. Qu'est-ce qu'un Vecteur ?" icon="🏹" color="emerald">
        <p className="mb-4">
          Le chemin rectiligne emprunté par notre translation géométrique est matérialisé par <strong>un Vecteur</strong>. On le note avec une élégante flèche pointée vers la droite s'appuyant sur ses deux points d'ancrage, comme ceci : <strong className="font-serif italic text-lg">{"$\\vec{AB}$"}</strong>.
        </p>
        
        <div className="bg-card p-6 rounded-2xl border border-border-strong border-l-8 border-emerald-500 shadow-sm my-6 relative overflow-hidden">
          <MoveUpRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 text-emerald-500/10" />
          <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-lg mb-3">La Trinité de l'ADN d'un Vecteur</h3>
          <p className="mb-3 text-sm text-slate-500">Un vecteur n'est pas un segment statique, c'est un flux de déplacement caractérisé par trois composantes indissociables :</p>
          <ul className="space-y-3 text-sm">
             <li><span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded font-bold mr-2">1. La Direction :</span> C'est la droite ou l'autoroute de déplacement. Son inclinaison (ex : la droite (AB)).</li>
             <li><span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded font-bold mr-2">2. Le Sens :</span> C'est le sens de la flèche de l'autoroute. Est-ce qu'on se déplace de A vers B, ou de B vers A ?</li>
             <li><span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded font-bold mr-2">3. La Norme (Longueur) :</span> C'est l'amplitude de poussée, soit la distance géométrique pure entre les extrémités [AB].</li>
          </ul>
        </div>
        
        <InfoBlock id="inverse-vec" title="Ne confondez pas le sens des aiguilles !" type="warning">
           Pour l&apos;addition géométrique de vecteurs, la règle d&apos;or est toujours : l&apos;ordre et la direction !
           <br />
           Dire <strong>{"$\\vec{AB}$"}</strong> signifie "S'élancer du point d'origine A pour aboutir au terminus B". 
           <br />
           C'est le strict opposé directionnel du vecteur opposé <strong>{"$\\vec{BA}$"}</strong> : 
           <br />
           <code>{"$\\vec{AB} = -\\vec{BA}$"}</code> (Marche arrière forcée !).
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Les vecteurs colinéaires et le parallélisme absolu">
          Deux vecteurs sont dits <strong>colinéaires</strong> s&apos;ils possèdent la même direction exacte (ils glissent parallèlement). 
          <br />On peut passer de l&apos;un à l&apos;un à l&apos;autre en multipliant par un nombre de proportionnalité réel {"$k$"}, comme cela : 
          <br /><code>{"$\\vec{v} = k \\times \\vec{u}$"}</code>. 
          <br />C&apos;est la technique maîtresse du collège pour prouver de manière analytique irréfutable que deux droites de l&apos;espace sont parfaitement parallèles !
        </InfoBlock>
      </Section>

      <Section id="coordonnees-analytiques" title="3. Les Coordonnées de Vecteur dans le plan" icon="📊" color="blue">
        <p className="mb-4">
          Dans un repère cartésien muni de deux axes, un vecteur possède des coordonnées représentées verticalement entre parenthèses : <strong>{"$\\vec{u} \\begin{pmatrix} x_u \\\\ y_u \\end{pmatrix}$"}</strong>.
        </p>

        <div className="bg-sky-50 dark:bg-sky-900/10 p-5 rounded-3xl border border-sky-100 shadow-sm my-6">
          <p className="text-sm font-bold text-sky-800 dark:text-sky-300 mb-2 uppercase tracking-wide">La Formule de Calcul au Brevet :</p>
          <p className="text-sm text-slate-600 mb-4">
            Pour deux points d'origine <code>{"$A(x_A ; y_A)$"}</code> et d'arrivée <code>{"$B(x_B ; y_B)$"}</code>, les coordonnées du vecteur <code>{"$\\vec{AB}$"}</code> se calculent TOUJOURS en faisant "Arrivée moins Départ" :
          </p>
          <div className="bg-background py-3 border rounded-2xl text-center font-mono text-base md:text-lg font-black text-indigo-700 dark:text-indigo-300">
            {"$\\vec{AB} \\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$"}
          </div>
          <p className="text-xs text-slate-400 mt-3 font-semibold">
            ⚠️ Attention à l'ordre ! C'est le piège numéro 1 des élèves de 3ème de faire Départ moins Arrivée. Retenez l'astuce de la formule : "Le terminus passe devant le quai de départ !".
          </p>
        </div>
      </Section>

      <Section id="chasles" title="4. L'Enchantement Divin de Chasles" icon="✨" color="amber">
        <p className="mb-4">
          Le mathématicien français Michel Chasles (1793-1880) a formalisé la plus belle loi d'enchaînement de l'univers géométrique : la relation magique d'addition de vecteurs.
        </p>

        <div className="bg-amber-50/50 dark:bg-amber-950/15 p-6 rounded-3xl border border-amber-200/60 shadow-sm flex flex-col md:flex-row items-center gap-6 my-6">
          <div className="flex-1">
            <h4 className="font-extrabold text-amber-800 dark:text-amber-400 mb-2 uppercase tracking-wide">La Relation de Chasles :</h4>
            <div className="font-mono text-xl font-black text-amber-600 dark:text-amber-300 mb-3 bg-background px-4 py-2.5 rounded-xl border inline-block">
              {"$\\vec{AB} + \\vec{BC} = \\vec{AC}$"}
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Bilan physique d'étape :</strong> Je glisse d'abord du port A au phare de repos B. Puis, sans m'arrêter, je poursuis ma trajectoire glissée du phare B à l'aéroport d'accueil C.
              <br />
              Mon déplacement final net s'avère parfaitement équivalent à un voyage à vol d'oiseau direct de A vers C ! La lettre charnière B s'effondre logiquement d'absorption !
            </p>
          </div>
          <div className="w-40 h-40 bg-card border-2 border-dashed border-amber-500 rounded-[2rem] flex flex-col items-center justify-center text-center p-3 shadow-inner">
            <span className="text-xs font-bold font-mono">Bout-à-Bout</span>
            <span className="text-xs text-amber-600 font-bold mt-1">{"$AB+BC$"}<br/>{"$\\downarrow$"}<br/>{"$AC$"}</span>
          </div>
        </div>
      </Section>

      {/* TWO DETAILED SOLVED EXERCISES SECTION */}
      <Section id="exercices-resolus" title="✏️ Dossier de Méthodologie" icon="✍️" color="emerald">
        
        {/* Exercise 1 */}
        <InteractiveExercise 
          title="Exercice 1 : Simplification de somme vectorielle avec Chasles"
          question={(
            <div>
              <p className="mb-2">
                Le professeur vous donne une montagne à simplifier pendant l'examen de Brevet :
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border text-center font-mono my-3">
                {"$\\vec{S} = \\vec{AD} + \\vec{FE} - \\vec{CE} + \\vec{DF}$"}
              </div>
              <p className="font-bold">
                Simplifier l'expression {"$\\vec{S}$"} au maximum pour obtenir un unique vecteur simple !
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Neutraliser les soustractions gênantes :</strong>
              <p className="mt-1 text-slate-600">
                La relation de Chasles s'applique avec un signe d'addition. Pour éliminer le moins, on inverse le sens du vecteur concerné :
                <br />
                <code>{"$- \\vec{CE} = + \\vec{EC}$"}</code>.
                <br />
                Notre somme s'écrit désormais : <code>{"$\\vec{S} = \\vec{AD} + \\vec{FE} + \\vec{EC} + \\vec{DF}$"}</code>.
              </p>
            </>,
            <>
              <strong>2. Trier les termes pour rapprocher les gares de correspondance (tri de Chasles) :</strong>
              <p className="mt-1 text-slate-600">
                On déplace les blocs sommés librement pour que la fin d'un premier vecteur coïncide avec le départ du suivant :
                <br />
                Apparition du chemin : 
                - De A à D (<code>{"$\\vec{AD}$"}</code>)
                - Puis de D à F (<code>{"$\\vec{DF}$"}</code>)
                - Puis de F à E (<code>{"$\\vec{FE}$"}</code>)
                - Puis de E à C (<code>{"$\\vec{EC}$"}</code>)
              </p>
            </>,
            <>
              <strong>3. Sommation consécutive par la loi d'enchaînement :</strong>
              <p className="mt-1 text-slate-600">
                Écrivons dans cet ordre impeccable :
                <br />
                <code>{"$\\vec{S} = \\vec{AD} + \\vec{DF} + \\vec{FE} + \\vec{EC}$"}</code>.
                <br />
                Par vagues successives d'aimantations de Chasles :
                <br />
                <code>{"$(\\vec{AD} + \\vec{DF}) + \\vec{FE} + \\vec{EC} = \\vec{AF} + \\vec{FE} + \\vec{EC}$"}</code>
                <br />
                <code>{"$= \\vec{AE} + \\vec{EC}$"}</code>
                <br />
                <code>{"$= \\vec{AC}$"}</code>.
              </p>
              <p className="font-bold text-emerald-600 mt-2">Le résultat ultime simplifié à l'épée de Chasles est {"$\\vec{AC}$"} !</p>
            </>
          ]}
        />

        {/* Exercise 2 */}
        <InteractiveExercise 
          title="Exercice 2 : Calcul analytique de coordonnées dans un repère"
          question={(
            <div>
              <p className="mb-2">
                On vous donne trois coordonnées de points dans un repère cartésien parfait :
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border text-center font-mono my-3">
                {"$A(1 ; 2)$"} &nbsp;&nbsp;&nbsp;&nbsp; {"$B(4 ; 3)$"} &nbsp;&nbsp;&nbsp;&nbsp; {"$C(2 ; -1)$"}
              </div>
              <p className="font-bold">
                1. Calculez précisément les coordonnées du vecteur {"$\\vec{AB}$"}. <br />
                2. Trouvez les coordonnées du point D(x ; y) pour que le quadrilatère ABDC soit un parallélogramme.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Calcul des composantes de vecteur AB :</strong>
              <p className="mt-1 text-slate-600 font-mono">
                Formula : {"$AB = \\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix} = \\begin{pmatrix} 4 - 1 \\\\ 3 - 2 \\end{pmatrix}$"}
                <br />
                <code>{"$\\vec{AB} \\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$"}</code>.
              </p>
            </>,
            <>
              <strong>2. Traduction de la propriété vectorielle du parallélogramme (Règle d'or) :</strong>
              <p className="mt-1 text-slate-600">
                Puisque ABDC est un parallélogramme parfait (attention au piège croisé de lettrage !), cela signifie rigoureusement que le vecteur glissé du bas équivaut exactement au vecteur glissé du haut :
                <br />
                <code>{"$\\vec{AB} = \\vec{CD}$"}</code> (et non pas BD !).
              </p>
            </>,
            <>
               <strong>3. Poser l'égalité arithmétique de coordonnées :</strong>
               <p className="mt-1 text-slate-600">
                 Détaillons les coordonnées du vecteur <code>{"$\\vec{CD}$"}</code> :
                 <br />
                 <code>{"$\\vec{CD} \\begin{pmatrix} x_D - x_C \\\\ y_D - y_C \\end{pmatrix} = \\begin{pmatrix} x_D - 2 \\\\ y_D - (-1) \\end{pmatrix} = \\begin{pmatrix} x_D - 2 \\\\ y_D + 1 \\end{pmatrix}$"}</code>.
                 <br />
                 Puisque <code>{"$\\vec{AB} = \\vec{CD}$"}</code>, nous égalisons ligne par ligne :
                 <br />
                 - Ligne horizontale : <code>{"$x_D - 2 = 3 \\iff x_D = 5$"}</code>.
                 <br />
                 - Ligne verticale : <code>{"$y_D + 1 = 1 \\iff y_D = 0$"}</code>.
               </p>
            </>,
            <>
               <strong>4. Conclusion :</strong>
               <p className="mt-1 text-slate-600">
                 Le point recherché possède pour coordonnées absolues : <strong>{"$D(5 ; 0)$"}</strong>.
               </p>
            </>
          ]}
        />
      </Section>

      <Section id="flashcards" title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande de réduire par Chasles : <strong>{"$\\vec{AB} + \\vec{BA}$"}</strong>. Quelle est la solution ?</>}
            back={<>Selon Chasles : AB + BA = AA.<br/>Or sauter du point A vers la destination point A équivaut à un trajet de longueur nulle de départ ! <br/>C'est le <strong>Vecteur Nul {"$\\vec{0}$"}</strong> !</>}
          />
          <Flashcard 
            front={<>Quelle propriété géométrique essentielle est équivalente à l'égalité vectorielle <strong>{"$\\vec{AB} = \\vec{CD}$"}</strong> ?</>}
            back={<>L'égalité vectorielle prouve formellement que le quadrilatère <strong>ABDC</strong> (attention à la permutation de fin d'étiquettes !) est un <strong>Parallélogramme</strong>.</>}
          />
          <Flashcard 
            front={<>Comment calcule-t-on le milieu I d'un segment [AB] à partir de ses coordonnées ?</>}
            back={<>C'est la simple moyenne arithmétique des coordonnées de départ !<br/><code>{"$x_I = \\frac{x_A + x_B}{2}$"}</code><br/><code>{"$y_I = \\frac{y_A + y_B}{2}$"}</code>.</>}
          />
          <Flashcard 
            front={<>Que signifient des vecteurs colinéaires en géométrie ?</>}
            back={<>S'ils partagent la même autoroute de direction (colinéarité), cela certifie mathématiquement que les droites supports qui les portent sont parfaitement <strong>parallèles</strong> !</>}
          />
        </div>
      </Section>

      <Section id="faq" title="❓ FAQ Vectorielle" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est l'origine étymologique du mot 'Vecteur' ?",
              answer: "Le mot provient directement du verbe latin 'vehere' qui veut dire transporter ou véhiculer. C'est l'outil porteur qui transporte chaque pixel géométrique d'une figure d'un quai de départ vers sa plateforme d'accueil."
            },
            {
              question: "Pourquoi tracer une flèche au-dessus des lettres en écriture manuscrite ?",
              answer: "Pour que l'intégralité du monde comprenne que vous manipulez une force de déplacement (un vecteur) et non pas une simple longueur de segment. L'écriture AB désigne un chiffre en cm, alors que la balise fléchée désigne un mouvement d'inclinaison."
            },
            {
              question: "Peut-on multiplier deux vecteurs entre eux au collège ?",
              answer: "Non, au collège, vous n'avez pas encore les armes pour cela ! Vous verrez au lycée que la multiplication vectorielle s'appelle le produit scalaire, et qu'il sert à mesurer le travail d'une force physique."
            }
          ]}
        />
      </Section>

      <Section id="quiz" title="🎯 Épreuve Finale d'Échelons" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Simplifiez la somme suivante par Chasles : { v = AB + BD }",
              options: [
                "AD",
                "DA",
                "ABD"
              ],
              correctAnswer: 0,
              explanation: "Top ! La gare d'étape B se volatilise d'absorption par Chasles. AB + BD = AD. Le voyageur est parti de A pour s'arrêter à D."
            },
            {
              question: "On a A(3 ; 10) et B(5 ; 4). Quelles sont les coordonnées du vecteur AB ?",
              options: [
                "(2 ; -6)",
                "(-2 ; 6)",
                "(8 ; 14)"
              ],
              correctAnswer: 0,
              explanation: "Parfait ! x_B - x_A = 5 - 3 = 2. Et y_B - y_A = 4 - 10 = -6. Les coordonnées sont bien (2 ; -6)."
            },
            {
              question: "Si j'affirme que vector(MN) = vector(PQ), quel quadrilatère est un parallélogramme ?",
              options: [
                "MNPQ",
                "MNQP",
                "MPNQ"
              ],
              correctAnswer: 1,
              explanation: "Génial ! Souvenez-vous du croisement d'ordre de fin de parcours : MN = PQ correspond rigoureusement au parallélogramme classique MNQP (et non MNPQ) !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="essentials-checklist"
          items={[
            "Je connais la Trinité constituant un vecteur (Direction, Sens, Norme).",
            "Je sais additionner des flèches avec la relation sacrée de Chasles.",
            "Je sais calculer les coordonnées d'un glissement cartésien (Arrivée moins Départ).",
            "J'ai testé l'addition interactive u + v et visualisé son tracé résultant."
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

export default Course_College_3eme_08_Vecteurs;
