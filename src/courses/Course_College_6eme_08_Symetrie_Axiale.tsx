import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Copy, Scissors, Eye, Sliders, Play, RefreshCw } from 'lucide-react';

const AxialSymmetryVisualizer: React.FC = () => {
  const [distance, setDistance] = useState(50); // distance from mirror line (which is at X=150)

  // Axis is at X=150
  const axisX = 150;
  const pointAX = axisX - distance;
  const pointAPrimeX = axisX + distance;
  const pointY = 80;

  return (
    <div className="bg-rose-50/40 dark:bg-rose-950/20 p-6 md:p-8 rounded-[2rem] border border-rose-150 dark:border-rose-900 my-8 shadow-sm">
      <h3 className="font-bold text-rose-900 dark:text-rose-200 text-lg mb-4 flex items-center gap-2">
        <Copy className="text-rose-500 w-5 h-5 animate-pulse" />
        Simulateur de Miroir : Le Clone Cosmique
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Fais glisser le curseur pour déplacer le point d'encre <strong>A</strong> par rapport au miroir central rouge (d). Regarde comment son reflet clone <strong>A'</strong> imite chacun de ses déplacements à égale distance et de front !
      </p>

      {/* Slider for distance */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border mb-8 max-w-md mx-auto">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
          Distance au Miroir : <span className="text-rose-600 dark:text-rose-400 text-xl font-black">{distance} pixels</span>
        </label>
        <input 
          type="range" min="10" max="120" value={distance} 
          onChange={(e) => setDistance(parseInt(e.target.value))}
          className="w-full accent-rose-650 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 font-mono">
          <span>Très près</span>
          <span>Très loin</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-rose-100 dark:border-rose-950/60 flex flex-col md:flex-row items-center gap-10 justify-center">
        {/* SVG Mirror Screen */}
        <div className="w-72 h-44 flex-shrink-0">
          <svg viewBox="0 0 300 160" className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            {/* Mirror line (d) in center */}
            <line x1={axisX} y1="0" x2={axisX} y2="160" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5 5" />
            <text x={axisX + 8} y="20" className="text-[10px] font-black fill-rose-600 font-mono">(d) AXE</text>

            {/* Path connecting A and A' */}
            <line x1={pointAX} y1={pointY} x2={pointAPrimeX} y2={pointY} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />

            {/* Perpendicular angle marker square on axis at (150, 80) */}
            <rect x={axisX - 8} y={pointY - 8} width="8" height="8" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx={axisX - 4} cy={pointY - 4} r="1" fill="#6366f1" />

            {/* Point A */}
            <circle cx={pointAX} cy={pointY} r="7" fill="#6366f1" />
            <text x={pointAX - 6} y={pointY - 12} className="text-xs font-black fill-indigo-600 font-sans">A</text>
            <text x={pointAX - 12} y={pointY + 22} className="text-[9px] font-bold fill-indigo-500 font-mono">{distance}px</text>

            {/* Point A' (Clone) */}
            <circle cx={pointAPrimeX} cy={pointY} r="7" stroke="#10b981" strokeWidth="3" fill="#ffffff" />
            <text x={pointAPrimeX - 6} y={pointY - 12} className="text-xs font-black fill-emerald-600 font-sans">A'</text>
            <text x={pointAPrimeX - 4} y={pointY + 22} className="text-[9px] font-bold fill-emerald-500 font-mono">{distance}px</text>
          </svg>
        </div>

        {/* Dynamic labels detailing the symmetry conditions */}
        <div className="space-y-4 max-w-xs">
          <div className="border-l-4 border-rose-500 pl-4 py-1.5">
            <span className="text-[10px] uppercase font-black text-rose-500 tracking-wider block">TRAJET À L'ÉQUERRE</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Le trajet reliant <strong>A</strong> à son reflet <strong>A'</strong> croise l'axe à angle droit. C'est le pouvoir de la <strong>perpendicularité</strong>.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4 py-1.5">
            <span className="text-[10px] uppercase font-black text-emerald-500 tracking-wider block">ÉQUIDISTANCE PARFAITE</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              La distance entre A et l'axe vaut scrupuleusement la distance de l'axe à A' (<strong>{distance} px</strong>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_08_Symetrie_Axiale: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-08"
        title="La Symétrie Axiale"
        subtitle="Le Miroir Géométrique et la Magie du Pliage"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Géométrie de base (Savoir tracer des perpendiculaires)", "Mesurer au double-décimètre"]}
        objectives={[
          "Comprendre ce qu'est un axe de symétrie (effet miroir / pliage).",
          "Mémoriser les deux lois sacrées de construction (Angle Droit &amp; Même Distance).",
          "Connaître les propriétés de Conservation de la symétrie axiale.",
          "Trouver l'axe de symétrie de formes de base."
        ]}
      />

      <Section title="🌟 Introduction : Le Sortilège du Miroir" icon="🪞" color="slate">
        <p>
          Prends une feuille blanche fraîche, jette une grosse goutte d'encre noire dessus, et replie-la aussitôt en deux par le milieu d’un pli bien net. En rouvrant ta feuille... Magie ! Deux taches parfaitement identiques se font face, calquées l'une sur l'autre de part et d'autre de la pliure. 
        </p>
        <p className="mt-4">
          Tu viens de réaliser ta première **Symétrie Axiale** ! En géométrie, la pliure porte le nom très solennel d'<strong>Axe de Symétrie</strong> (souvent désigné par la lettre *(d)*). Ce n'est pas un dessin géométrique ordinaire, c'est une formule de duplication d'objets !
        </p>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          La symétrie axiale est omniprésente dans la nature et le design ! Le corps humain, les ailes des papillons, les visages, la forme des feuilles d'arbres ou encore la célèbre cathédrale Notre-Dame de Paris sont tous bâtis sur le principe d'une parfaite symétrie miroir verticale.
        </InfoBlock>
      </Section>

      <Section title="1. Le Rituel d'Apparition du Clone (A')" icon="🔥" color="indigo">
        <p className="mb-4">Pour qu'un point A se regarde dans le miroir de l'axe <em>(d)</em> et fasse spawn son clone parfait A', tu dois exécuter les deux lois du rituel :</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col md:flex-row gap-6 items-center my-6">
           <div className="flex-1">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Les 2 conditions du Rituel :</h3>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-305">
                <li><strong>Condition 1 (Perpendiculaire / Équerre) :</strong> Le segment reliant A à son clone A' <strong>doit percuter l'Axe de symétrie de face en formant un angle droit parfait (90°) !</strong> On ne pénètre jamais le miroir de côté ou de travers.</li>
                <li><strong>Condition 2 (L'Équidistance / Règle) :</strong> La distance entre le point A et ton axe doit être STRICTEMENT la même qu’entre l’axe et ton clone A'. Si A est positionné à 5 cm du miroir, son reflet s'installera à exactement 5 cm de l'autre côté !</li>
              </ul>
           </div>
        </div>
      </Section>

      <Section title="2. Notre Miroir Interactif" icon="📐" color="rose">
        <AxialSymmetryVisualizer />
        <InfoBlock title="Astuce Pratique de Construction" type="reminder">
          Si tu dois tracer un symétrique très rapidement sans galérer à mesurer à la règle, utilise <strong>ton compas</strong> ! Plante sa pointe sèche en métal sur ton axe de symétrie, ouvre-le jusqu'au point A d'origine, puis fais pivoter d'un demi-tour magique pour tracer instantanément A' de l'autre côté face à toi !
        </InfoBlock>
      </Section>

      <Section title="3. Les Pouvoirs de Rajeunissement (La Conservation)" icon="Scissors" color="emerald">
        <p className="mb-4">Le Miroir Axial détient un pouvoir absolu qu'on appelle la <strong>Conservation</strong>. Rien ne se déforme ni ne se brise dans le reflet !</p>

        <TipBanner title="Le Clone est Copie Conforme Absolue" type="success">
           La symétrie axiale <strong>conserve absolument tout !</strong><br/>
           <br/>
           Si tu symétrises un segment [AB] mesurant 10 cm, le segment clone [A'B'] fera précisément 10 cm <strong>(Conservation des longueurs)</strong>.<br/>
           Si tu dupliques un angle aigu de 20°, la bouche de l'angle du reflet fera exactement 20° <strong>(Conservation des mesures d'angles)</strong>.<br/>
           La seule chose qui s'inverse dans l'action, c'est le <strong>sens d'orientation</strong> (un point qui tournait dans le sens des aiguilles d'une montre tournera à l'envers dans son reflet).
        </TipBanner>
      </Section>
      
      <Section title="4. L'Objet SUR le miroir" icon="Sliders" color="blue">
        <InteractiveExercise 
          title="La Goutte de Peinture posée SUR la pliure"
          question={<>Ton point 'C' est complètement dessiné <strong>directement sur</strong> la ligne rouge de l'Axe de Symétrie (d). Où va apparaître son clone (C') ?</>}
          steps={[
            <div key="s1" className="text-sm"><strong>1. L'Analyse Panique :</strong> Appliquons notre règle universelle de distance par rapport au miroir. Quelle distance sépare C de l'axe ? Aucune ! Il est posé dessus, donc la distance est de 0 cm.</div>,
            <div key="s2" className="text-sm"><strong>2. L'apparition du Clone :</strong> Si ton point de départ n'a pas de distance au miroir, alors son reflet émerge aussi à une distance égale à 0. Il ne peut pas bouger !</div>,
            <div key="s3" className="text-sm"><strong>3. Résultat Ultime :</strong> Si un point est situé sur l'axe de symétrie, son symétrique est <strong>lui-même</strong>. Les points C et C' sont confondus comme par enchantement !</div>
          ]}
        />
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Trouver les axes de symétrie</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Détermine le nombre exact d'axes de symétrie (lignes de pliage équitables) que possèdent les trois figures classiques suivantes : <br />
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 px-2 py-1 rounded font-mono text-xs">1) Un Carré</code> / 
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 px-2 py-1 rounded font-mono text-xs ml-2">2) Un Rectangle</code> / 
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 px-2 py-1 rounded font-mono text-xs ml-2">3) Un Cercle</code>
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Le <strong>Carré</strong> possède précisément <strong>4 axes de symétrie</strong> : ses deux médiatrices de côtés (horizontale et verticale) ainsi que ses deux diagonales principales.</li>
                <li>Le <strong>Rectangle</strong> possède seulement <strong>2 axes de symétrie</strong> : ses deux médiatrices de côtés. Ses diagonales ne forment pas des axes de symétrie en pliage direct !</li>
                <li>Le <strong>Cercle</strong> possède une <strong>infinité d'axes de symétrie</strong> ! N'importe quelle droite qui traverse de part en part en passant par son milieu central (les diamètres) constitue un axe de symétrie parfait de découpe.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Conservation des Formes</h4>
            <p className="font-medium text-slate-700 dark:text-slate-350">
              Un triangle ABC a une aire globale mesurant exactement 18 cm². On fait subir à ce triangle une symétrie axiale par rapport à une droite (d) d'enclos. Quelle est la surface d'aire de la figure symétrique A'B'C' réplique ? Justifie ta réponse.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>D'après le cours officiel sur les propriétés de la symétrie axiale, celle-ci applique un principe imperturbable de <strong>conservation de l'aire et de la taille</strong> des figures.</li>
                <li>Le symétrique d'un triangle ABC est un triangle jumeau identique A'B'C'.</li>
                <li>Puisque l'aire se conserve sans subir la moindre altération géométrique, l'aire du triangle A'B'C' sera scrupuleusement équivalente à celle de ABC.</li>
                <li>On conclut avec superbe : l'aire de A'B'C' est donc de <strong>18 cm²</strong> !</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Le symétrique géométrique d'un segment est-il un triangle ?</>}
            back={<><strong>Alerte Erreur Fatale ! Surtout pas !</strong><br/>La symétrie axiale conserve scrupuleusement la nature même de ton objet ! Le symétrique d'un segment reste impérativement un segment de même longueur. On ne change pas un canard en dinosaure dans un miroir de géométrie !</>}
          />
          <Flashcard 
            front={<>Quelle est la position de l'axe de symétrie par rapport au segment qui relie un point à son clone ?</>}
            back={<>L'axe de symétrie est la <strong>médiatrice</strong> du segment reliant le point source à son clone ! Cela signifie que l'axe coupe ce segment perpendiculairement en passant par son milieu exact.</>}
          />
          <Flashcard 
            front={<>Si un segment mesure 7 cm, que vaudra la longueur de son image réplique ?</>}
            back={<>Sa longueur sera exactement de <strong>7 cm</strong> ! Cela est garanti par la propriété essentielle de conservation des distances de la symétrie axiale.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la définition savante de 'La Médiatrice' d'un segment ?",
              answer: "La médiatrice d'un segment est la droite magique qui coupe ce segment perpendiculairement (à l'équerre) en passant pile-poil par son milieu géométrique."
            },
            {
              question: "La lettre 'M' possède-t-elle un ou plusieurs axes de symétrie ?",
              answer: "La lettre M possède précisément un seul axe de symétrie vertical en son milieu central. Si tu la plies verticalement au milieu, les deux jambes s'alignent parfaitement !"
            },
            {
              question: "Faut-il toujours utiliser une règle graduée pour placer le symétrique d'un point ?",
              answer: "Pas obligatoirement ! S'il s'agit d'une feuille quadrillée, tu peux compter les carreaux d'écart horizontalement ou verticalement à l'équerre pour placer ton clone en 1 seconde !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "L'Angle DEF possède une ouverture de 78°. Son frère symétrique D'E'F' possèdera une ouverture de :",
              options: [
                "Je ne peux pas savoir, il faut mesurer avec mon rapporteur.",
                "102°, car le miroir a inversé la figure de sens.",
                "78° ! Les reflets ont scrupuleusement la même ouverture angulaire !"
              ],
              correctAnswer: 2,
              explanation: "Top ! Principe de conservation absolue des angles : l'ouverture de l'angle reste intacte à 78° dans le clone."
            },
            {
              question: "Le segment qui relie un point Z à son clone symétrique Z' est toujours d'arène :",
              options: [
                "Parallèle à l'axe de symétrie.",
                "Perpendiculaire à l'axe de symétrie.",
                "Incliné selon un angle de 45°."
              ],
              correctAnswer: 1,
              explanation: "Bingo ! Le trajet spirituel emprunté pour rencontrer son symétrique frappe scrupuleusement l'axe de front à angle droit (= Perpendiculaire)."
            },
            {
              question: "Si le point M est posé directement sur l'axe de symétrie, où s'affiche son symétrique M' ?",
              options: [
                "À l'autre bout de la feuille.",
                "Sur le point M lui-même (les deux points se superposent).",
                "On ne peut pas le tracer car c'est interdit."
              ],
              correctAnswer: 1,
              explanation: "Exact ! M et M' sont alors dits de manière savante 'confondus'. La distance de pliage étant nulle, le point ne bouge pas géométriquement !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mémorisé : l'Axe (d) = Miroir total ou pliure.",
            "Trajet d'apparition du clone : Angle droit face au mur + même distance d'encre.",
            "Conserver les super-pouvoirs : longueur clone = longueur source, angle clone = angle source."
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

export default Course_College_6eme_08_Symetrie_Axiale;
