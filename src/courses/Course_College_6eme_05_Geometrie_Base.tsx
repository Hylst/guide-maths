import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { PenTool, Crosshair, Hexagon, Maximize, Sliders, PlayCircle } from 'lucide-react';

const GeometryVisualizer: React.FC = () => {
  const [geoType, setGeoType] = useState<'segment' | 'line' | 'ray'>('segment');
  const [lengthFactor, setLengthFactor] = useState(150); // slider control

  return (
    <div className="bg-indigo-50/40 dark:bg-indigo-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900 my-8 shadow-sm">
      <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-lg mb-4 flex items-center gap-2">
        <PenTool className="text-indigo-500 w-5 h-5 animate-pulse" />
        Simulateur Interactif : Les Formes de la Seconde Dimension
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Choisis l'un des trois types d'objets filaires de la géométrie et observe comment les barrières de codage (crochets ou parenthèses) transforment un simple trait en un laser infini !
      </p>

      {/* Selector switches */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setGeoType('segment')}
          className={`flex-1 min-w-[120px] py-2 px-4 rounded-xl font-bold text-sm transition-all border ${geoType === 'segment' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-border text-slate-600 hover:bg-slate-50'}`}
        >
          [ AB ] - Le Segment
        </button>
        <button 
          onClick={() => setGeoType('line')}
          className={`flex-1 min-w-[120px] py-2 px-4 rounded-xl font-bold text-sm transition-all border ${geoType === 'line' ? 'bg-sky-600 border-sky-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-border text-slate-600 hover:bg-slate-50'}`}
        >
          ( AB ) - La Droite
        </button>
        <button 
          onClick={() => setGeoType('ray')}
          className={`flex-1 min-w-[120px] py-2 px-4 rounded-xl font-bold text-sm transition-all border ${geoType === 'ray' ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-border text-slate-600 hover:bg-slate-50'}`}
        >
          [ AB ) - La Demi-droite
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 flex flex-col items-center">
        {/* Dynamic notation card */}
        <div className="text-center mb-6">
          <span className="text-xs font-black text-slate-400 tracking-wider block mb-1">NOTATION UNIVERSELLE</span>
          <div className="text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400">
            {geoType === 'segment' && '[ AB ]'}
            {geoType === 'line' && '( AB )'}
            {geoType === 'ray' && '[ AB )'}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-bold">
            {geoType === 'segment' && 'Segment AB de mesure finie (mesurable à la règle).'}
            {geoType === 'line' && 'Droite AB infinie de part et d\'autre (immesurable).'}
            {geoType === 'ray' && 'Demi-droite d\'origine A, passant par B (se prolonge à droite).'}
          </div>
        </div>

        {/* Interactive SVG Display */}
        <div className="w-full max-w-lg">
          <svg viewBox="0 0 400 120" className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-border w-full">
            {/* Draw Grid background lines optionally */}
            <line x1="0" y1="60" x2="400" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />

            {/* Point A index */}
            <circle cx="100" cy="60" r="4" fill="#6366f1" />
            <text x="100" y="45" className="text-xs font-black fill-indigo-600 text-center font-sans">A</text>

            {/* Point B index */}
            <circle cx="260" cy="60" r="4" fill="#10b981" />
            <text x="260" y="45" className="text-xs font-black fill-emerald-600 font-sans">B</text>

            {/* Dynamic interactive Line based on type selection */}
            {geoType === 'segment' && (
              <>
                {/* Real Segment */}
                <line x1="100" y1="60" x2="260" y2="60" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
                {/* Brackets at A */}
                <line x1="100" y1="48" x2="100" y2="72" stroke="#6366f1" strokeWidth="3" />
                <line x1="100" y1="48" x2="106" y2="48" stroke="#6366f1" strokeWidth="3" />
                <line x1="100" y1="72" x2="106" y2="72" stroke="#6366f1" strokeWidth="3" />
                {/* Brackets at B */}
                <line x1="260" y1="48" x2="260" y2="72" stroke="#6366f1" strokeWidth="3" />
                <line x1="260" y1="48" x2="254" y2="48" stroke="#6366f1" strokeWidth="3" />
                <line x1="260" y1="72" x2="254" y2="72" stroke="#6366f1" strokeWidth="3" />
              </>
            )}

            {geoType === 'line' && (
              <>
                {/* Infinite Line across canvas */}
                <line x1="0" y1="60" x2="400" y2="60" stroke="#0ea5e9" strokeWidth="3" />
                {/* Interactive guides showing infinite arrow */}
                <path d="M 15 54 L 5 60 L 15 66" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
                <path d="M 385 54 L 395 60 L 385 66" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
                {/* Parenthesis at A */}
                <path d="M 97 45 A 20 20 0 0 0 97 75" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
                {/* Parenthesis at B */}
                <path d="M 263 45 A 20 20 0 0 1 263 75" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
              </>
            )}

            {geoType === 'ray' && (
              <>
                {/* Semi-infinite Ray start at A, extending to end of canvas */}
                <line x1="100" y1="60" x2="400" y2="60" stroke="#10b981" strokeWidth="3.5" />
                <path d="M 385 54 L 395 60 L 385 66" fill="none" stroke="#10b981" strokeWidth="2.5" />
                {/* Bracket at A */}
                <line x1="100" y1="48" x2="100" y2="72" stroke="#10b981" strokeWidth="3" />
                <line x1="100" y1="48" x2="106" y2="48" stroke="#10b981" strokeWidth="3" />
                <line x1="100" y1="72" x2="106" y2="72" stroke="#10b981" strokeWidth="3" />
                {/* Open parenthesis at B (since it passes through B without stopping) */}
                <path d="M 263 45 A 20 20 0 0 1 263 75" fill="none" stroke="#10b981" strokeWidth="2.5" className="opacity-70" />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_05_Geometrie_Base: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-05"
        title="La Géométrie de Base"
        subtitle="L'Art du Trait, du Point et du Poème Mathématique"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Utilisation de la Règle (Savoir tracer droit)"]}
        objectives={[
          "Mémoriser l'Alphabet de la géométrie : Point, Droite, Segment, Demi-Droite.",
          "Comprendre le codage absolu (Parenthèses, Crochets).",
          "Mémoriser la loi de l'Appartenance (Symbole d'appartenance ou d'exclusion).",
          "Identifier Droites Sécantes, Parallèles et Perpendiculaires."
        ]}
      />

      <Section title="🌟 Introduction : Un nouveau langage secret" icon="📐" color="slate">
        <p>
          En Primaire, tu dessinais. 'C'est un trait' ou 'C'est un point'. En 6ème, tu deviens <strong>Architecte</strong>. La Géométrie est la seule matière scolaire qui possède son propre Dialecte Extraterrestre. 
        </p>
        <p className="mt-4">
          Une seule parenthèse mal placée sur ton énoncé de contrôle peut transformer un vulgaire trait de 5 cm en une autoroute Infinie vers la galaxie Andromeda. Il est temps d'apprendre les Codes de Sécurité de cet univers de traits de plume.
        </p>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          Le mot 'Géométrie' vient de l'ancien grec 'gê' (la Terre) et 'metron' (la mesure). À l'origine, les Égyptiens utilisaient ces dessins de cordes pour redessiner précisément les limites des champs agricoles effacés chaque année par l'inondation annuelle du Nil !
        </InfoBlock>
      </Section>

      <Section title="1. La Trinité du Feu (Segment, Droite, Le Demi-Loup)" icon="🔥" color="indigo">
        <p className="mb-4">Il n'existe que 3 objets filaires dans notre monde 2D. Apprends leurs Boucliers de codage :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-5 rounded-2xl border-t-8 border-indigo-400 shadow-sm text-center">
             <div className="flex items-center justify-center mb-4">
               <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
               <div className="w-16 h-1 bg-indigo-600"></div>
               <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
             </div>
             <h4 className="font-bold text-xl mb-1">[ AB ]</h4>
             <p className="font-bold text-indigo-700 dark:text-indigo-300">LE SEGMENT</p>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">C'est la seule chose <strong>Mesurable</strong> au monde. Les <strong className="text-indigo-600 dark:text-indigo-400">Crochets</strong> <code>[ ]</code> agissent comme des murs de béton armé. L'encre est enfermée entre le point A et le point B. C'est fini.</p>
           </div>
           
           <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border-t-8 border-sky-400 shadow-sm text-center">
             <div className="flex items-center justify-center mb-4 overflow-hidden relative w-32 mx-auto">
               <div className="w-full h-1 bg-sky-600 relative opacity-50"></div>
               <div className="absolute top-1/2 left-4 -translate-y-1/2 w-2 h-2 bg-sky-600 rounded-full"></div>
               <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-sky-600 rounded-full"></div>
             </div>
             <h4 className="font-bold text-xl mb-1">( AB )</h4>
             <p className="font-bold text-sky-700 dark:text-sky-300">LA DROITE</p>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">C'est le laser divisé <strong>Infini</strong> des deux côtés ! Les <strong className="text-sky-600">Parenthèses</strong> <code>( )</code> sont des portes ouvertes sur l'univers. Le faisceau transperce A, transperce B et ne s'arrête jamais.</p>
           </div>
           
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-5 rounded-2xl border-t-8 border-emerald-400 shadow-sm text-center">
             <div className="flex items-center justify-center mb-4 overflow-hidden relative w-32 mx-auto">
               <div className="absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full z-10"></div>
               <div className="absolute top-1/2 left-2 right-0 -translate-y-1/2 h-1 bg-emerald-600 opacity-50"></div>
               <div className="absolute top-1/2 right-8 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full z-10"></div>
             </div>
             <h4 className="font-bold text-xl mb-1">[ AB )</h4>
             <p className="font-bold text-emerald-700 dark:text-emerald-300">LA DEMI-DROITE</p>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">L'arme du Tireur d'élite. Elle naît en A (qui est bloqué par le <strong className="text-emerald-600 dark:text-emerald-400">Crochet</strong> <code>[</code>) et elle tire à <strong className="text-emerald-600 dark:text-emerald-400">l'Infini</strong> en passant par dessus B !</p>
           </div>
        </div>
      </Section>

      <Section title="2. Notre Laboratoire Géométrique" icon="⚙️" color="rose">
        <GeometryVisualizer />
        <InfoBlock title="Rappel de Base" type="reminder">
          On utilise TOUJOURS une règle pour tracer des lignes droites. Une ligne sinueuse tracée à main levée n'a aucune validité géométrique en mathématiques !
        </InfoBlock>
      </Section>

      <Section title="3. Le Symbole Secret d'Appartenance (Trident)" icon="🔱" color="rose">
        <p className="mb-4">Au lieu d'écrire 'Le point C est posé sur la ligne AB', les maîtres de l'Ordre utilisent le Trident sacral de l'océan :</p>

        <TipBanner title="Le Signe de L'Univers Mathématique" type="info">
           <MathComponent math={"C \\in [AB]"} /><br/>
           Le symbole {"$\\in$"} veut dire <strong>'Appartient À'</strong> !<br/>
           La phrase secrète signifie : 'Le petit point C a réussi à se poser pile-poil <strong>Sur</strong> le Trait de lumière créé entre A et B.'<br/>
           S'il est raté dans le vide spatial... On le barre : {"$\\notin$"} (N'appartient pas !).
        </TipBanner>
      </Section>

      <Section title="4. La Danse des Droites (Positions Relatives)" icon="💃" color="blue">
        <p className="mb-4">Deux droites posées sur l'univers de ta feuille n'ont que 2 grands choix de destinée...</p>

        <div className="space-y-4 font-medium my-6">
           <div className="bg-card p-5 rounded border-l-4 border-rose-500 shadow-sm">
             <div className="flex justify-between items-center">
               <h4 className="font-bold text-lg text-rose-600 dark:text-rose-400">1. SÉCANTES (Le Crash)</h4>
             </div>
             <p className="text-sm mt-2">Deux droites qui <strong>se coupent</strong> (se percutent) en un point de rendez-vous unique (L'intersection). <br/>Si le crash est <strong>parfait, dessinant un angle droit (90°) vérifié à l'équerre</strong>... elles sont dites <strong>PERPENDICULAIRES</strong> (Symbole caché : {"$\\perp$"}).</p>
           </div>

           <div className="bg-card p-5 rounded border-l-4 border-sky-500 shadow-sm">
             <div className="flex justify-between items-center">
               <h4 className="font-bold text-lg text-sky-600 dark:text-sky-400">2. PARALLÈLES (L'Amour Impossible)</h4>
             </div>
             <p className="text-sm mt-2">Deux droites qui voguent dans la même direction, conservant le même écart constant, et qui ne <strong>se rencontreront jamais</strong>, même à 4 millions d'années-lumière au bout de ta feuille ! (Symbole caché : //).</p>
           </div>
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Analyse de Codage</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Détermine la signification géométrique exacte des trois notations suivantes rédigées sur un polycopié de géométrie : <br />
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 px-2 py-1 rounded font-mono text-xs">A) [CD]</code> / 
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 px-2 py-1 rounded font-mono text-xs ml-2">B) (CD)</code> / 
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 px-2 py-1 rounded font-mono text-xs ml-2">C) CD</code>
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>La notation <strong>[CD]</strong> comporte deux crochets fermés. Cela désigne l'élément géométrique physique : <strong>le segment CD</strong>. Il possède un début en C, une fin en D, et peut se mesurer.</li>
                <li>La notation <strong>(CD)</strong> comporte des parenthèses. Cela désigne l'élément géométrique physique : <strong>la droite CD</strong>. C'est une ligne rectiligne s'étendant à l'infini et ne possédant pas de limites. On ne peut pas la mesurer.</li>
                <li>La notation <strong>CD</strong> (sans aucun symbole d'accompagnement) correspond à un nombre : <strong>la longueur entre C et D en centimètres</strong> (par exemple, CD = 6 cm).</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Déduction de Parallélisme</h4>
            <p className="font-medium text-slate-700 dark:text-slate-350">
              On donne la propriété d'architecture suivante : <em>'Si deux droites sont perpendiculaires à une même troisième droite, alors elles sont parallèles entre elles'</em>. <br />
              Sachant que la droite {"$(d_1)$"} est perpendiculaire à la droite {"$(d_3)$"}, et que la droite {"$(d_2)$"} est elle aussi perpendiculaire à {"$(d_3)$"}, que peut-on affirmer au sujet de {"$(d_1)$"} et {"$(d_2)$"} ?
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>On liste nos données : {"$(d_1) \\perp (d_3)$"} et {"$(d_2) \\perp (d_3)$"}.</li>
                <li>Les deux droites distinctes {"$(d_1)$"} et {"$(d_2)$"} sont perpendiculaires à une même droite de référence {"$(d_3)$"}.</li>
                <li>On applique le théorème énoncé ci-dessus : si deux droites sont perpendiculaires à une même droite, alors elles naviguent parallèlement.</li>
                <li>On conclut fermement : les droites <strong>{"$(d_1)$"} et {"$(d_2)$"} sont parallèles</strong> ! On note mathématiquement : {"$(d_1) \\mathbin{/\\mkern-5mu/} (d_2)$"}.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="⚔️ Exercice Guidé" icon="⚔️" color="amber">
        <InteractiveExercise
          title="Exercice : Devine l'Objet Mystère"
          question={<p>Je suis la ligne invisible qui démarre sagement au point A, traverse brutalement le point B et s'en va courir à l'infini jusqu'au bout de l'univers. Comment m'écrit-on mathématiquement ?</p>}
          steps={[
            <div key="e1" className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser le départ</p>
              <p className="mt-1">Ça démarre 'sagement', c'est-à-dire qu'il y a un début bloqué. Le symbole est le crochet <code>[</code> au point A.</p>
            </div>,
            <div key="e2" className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Analyser la fin</p>
              <p className="mt-1">Ça 'traverse' et ça part à l'infini côté B. Le symbole est la parenthèse <code>)</code> du côté de B.</p>
            </div>,
            <div key="sol" className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-150 text-sm">
              <p>Solution finale : Je suis la demi-droite <strong>[AB)</strong>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Le prof écrit `AB = 5 cm` au tableau. Il a oublié de mettre les crochets `[AB]` !! Tu lèves la main pour râler et corriger ?</>}
            back={<><strong>Alerte Erreur Fatale d'élève Impatient ! NON !</strong><br/>Le prof gère parfaitement : Quand on parle de la LONGUEUR (Le chiffre "5"), l'académie mondiale interdit de mettre des crochets ! `AB = 5` veut dire "La longueur de A à B vaut 5". Le Crochet `[AB]` désigne le Trait physique dessiné au crayon (L'Objet).</>}
          />
          <Flashcard 
            front={<>Complète ce symbole d'appartenance :<br/>"Soit M le milieu du segment [AB]. Donc M ... (AB)."</>}
            back={<><strong>M appartient à (AB)</strong><br/>Si le point M est au plein milieu du pont [AB], ALORS forcément qu'il est touché par l'Aura du Rayon Laser Divin Infini (AB) qui transperce toute l'éternité !! Oui il appartient ! On écrit {"$M \\in (AB)$"}.</>}
          />
          <Flashcard 
            front={<>Que désigne le symbole géométrique de la chaise renversée (⊥) ?</>}
            back={<>Il désigne la relation de <strong>perpendicularité</strong> entre deux droites ! Cela indique qu'elles se croisent en formant un angle droit parfait de 90°.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence entre un Point, un Crochet, et une Parenthèse au propre ?",
              answer: "Le point est la MATIÈRE PREMIÈRE, c'est une lettre MAJUSCULE à l'encre noire sur ton papier (A). Le Crochet c'est le Piquet pour accrocher le Trait Fil de fer afin qu'il ne file pas à l'Infini. La parenthèse est une fenêtre ouverte."
            },
            {
              question: "Ils m'ont piégé : 'Soient 3 points A, B, C Alignés. Comment sont les droites (AB) et (BC) ?'",
              answer: "Si A, B, C sont des petits oiseaux posés sur un même fil de Fer... Alors la ligne Infinie (AB) et la ligne Infinie (BC)... SONT EN FAIT LA MÊME LIGNE unique ! On dit que les Droites sont CONFONDUES ! (C'est des parallèles superposées absolues)."
            },
            {
              question: "Peut-on mesurer une demi-droite ?",
              answer: "Non, car une demi-droite s'étend à l'infini d'un côté. Étant infiniment longue, elle n'a pas de mesure chiffrable, tout comme la droite !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'écris [ EF ), qu'ai-je invoqué ?",
              options: [
                "Un Segment coincé entre E et F.",
                "Une Demi-droite qui part Infiniment du point E pour crever le point F.",
                "Une Demi-droite dont la racine (le départ) est en E, et qui traverse F sans s'arrêter vers l'espace."
              ],
              correctAnswer: 2,
              explanation: "Top ! Le crochet protège E, le signal démarre depuis le point E, transperce littéralement F et continue vers le mur magique des Parenthèses sans limites."
            },
            {
              question: "Répète après moi : La Notation en Majuscule 'CD' (sans symboles) représente ...",
              options: [
                "La droite.",
                "Le petit dessin à l'encre.",
                "La Mesure (longueur) du segment."
              ],
              correctAnswer: 2,
              explanation: "Top Boss des Boss. Pas de Symbole = La Mesure PURE. Ex: [CD] est un dessin sur ma feuille, mais CD = 12 centimètres."
            },
            {
              question: "Si la droite (d1) est parallèle à (d2), et que (d2) est parallèle à (d3), alors comment sont (d1) et (d3) ?",
              options: [
                "Elles sont Perpendiculaires.",
                "Elles sont Parallèles.",
                "Elles se croisent n'importe où."
              ],
              correctAnswer: 1,
              explanation: "Exact ! C'est la transitivité du parallélisme : si deux droites sont de fidèles navires parallèles à un même troisième navire, elles naviguent obligatoirement parallèlement entre elles !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "J'écris au Prof avec une Parenthèse Droite (AB) = Jamais ! C'est INFINI !",
            "Toute lettre désignant un objet 'Point' S'ÉCRIT EN MAJUSCULE.",
            "Le Signe Mathématique de Sécantes avec l'Équerre Parfaite est (T Inversé = Perpendiculaire)."
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

export default Course_College_6eme_05_Geometrie_Base;
