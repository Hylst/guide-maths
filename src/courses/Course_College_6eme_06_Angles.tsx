import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Compass, Focus, View, ArrowUpRight, Sliders } from 'lucide-react';

const AngleCrocodileVisualizer: React.FC = () => {
  const [angleDegrees, setAngleDegrees] = useState(45);

  const rad = Math.PI / 180;
  // Summit is at (100, 100). Baseline is at dx=80 dy=0 -> (180, 100).
  // Opening jaw opens upwards.
  const topX = 100 + 80 * Math.cos(-angleDegrees * rad);
  const topY = 100 + 80 * Math.sin(-angleDegrees * rad);

  let angleCategory = '';
  let categoryColor = '';

  if (angleDegrees === 0) {
    angleCategory = 'Angle NUL (Mâchoires serrées !)';
    categoryColor = 'text-slate-500';
  } else if (angleDegrees < 90) {
    angleCategory = 'Angle AIGU (Il pique !)';
    categoryColor = 'text-amber-500';
  } else if (angleDegrees === 90) {
    angleCategory = 'Angle DROIT (L\'Équerre magique !)';
    categoryColor = 'text-rose-500 font-extrabold';
  } else if (angleDegrees < 180) {
    angleCategory = 'Angle OBTUS (Le dodu de jardin / transat de plage !)';
    categoryColor = 'text-sky-500';
  } else {
    angleCategory = 'Angle PLAT (L\'horizon pur !)';
    categoryColor = 'text-emerald-500 font-bold';
  }

  return (
    <div className="bg-amber-50/40 dark:bg-amber-950/20 p-6 md:p-8 rounded-[2rem] border border-amber-100 dark:border-amber-900 my-8 shadow-sm">
      <h3 className="font-bold text-amber-900 dark:text-amber-200 text-lg mb-4 flex items-center gap-2">
        <Compass className="text-amber-500 w-5 h-5 animate-pulse" />
        Simulateur Interactif : L'Ouverture du Crocodile
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Fais pivoter l'angle d'ouverture de la mâchoire supérieure en ajustant le curseur. Découvre en temps réel sa catégorie et son codage d'arène !
      </p>

      {/* Control slider */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-border mb-8 max-w-md mx-auto">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
          Ouverture : <span className="text-indigo-600 dark:text-indigo-400 text-2xl font-black">{angleDegrees}° degrès</span>
        </label>
        <input 
          type="range" min="0" max="180" value={angleDegrees} 
          onChange={(e) => setAngleDegrees(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2 font-mono">
          <span>0° (Fermé)</span>
          <span>90° (Droit)</span>
          <span>180° (Plat)</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-amber-100 dark:border-amber-950/60 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* SVG layout */}
        <div className="w-52 h-52 flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            {/* Protractor arc indicator */}
            {angleDegrees > 0 && (
              <path 
                d={`M 130 100 A 30 30 0 0 0 ${100 + 30 * Math.cos(-angleDegrees * rad)} ${100 + 30 * Math.sin(-angleDegrees * rad)}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
              />
            )}

            {/* Base line (Jaw bot) */}
            <line x1="100" y1="100" x2="180" y2="100" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <text x="185" y="104" className="text-[10px] font-bold fill-slate-500 font-sans">C</text>

            {/* Pivot block Summit B */}
            <circle cx="100" cy="100" r="6" fill="#f43f5e" />
            <text x="90" y="115" className="text-xs font-black fill-rose-600 font-sans">B (Sommet)</text>

            {/* Opening jaw (Jaw top) */}
            <line x1="100" y1="100" x2={topX} y2={topY} stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <text x={topX + (topX > 100 ? 5 : -10)} y={topY + (topY > 100 ? 10 : -5)} className="text-[10px] font-bold fill-emerald-600 font-sans">A</text>

            {/* Droit box marker if exactly 90 */}
            {angleDegrees === 90 && (
              <rect x="100" y="85" width="15" height="15" fill="none" stroke="#f43f5e" strokeWidth="2" />
            )}
          </svg>
        </div>

        {/* Text descriptions */}
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs font-black tracking-widest text-slate-400 block">NOM DU CADRAN</span>
          <div className="text-3xl font-mono font-black text-slate-800 dark:text-slate-100">
            {"$\\widehat{ABC}$"}
          </div>
          <p className={`text-base font-extrabold ${categoryColor} uppercase tracking-wider`}>
            {angleCategory}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Le chapeau pointu est posé sur la lettre <strong>B</strong> car c'est la charnière d'articulation. Les bras [BA) et [BC) partent dans leurs directions respectives.
          </p>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_06_Angles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-06"
        title="La Magie des Angles"
        subtitle="Repérer l'ouverture du Grand Crocodile"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Géométrie de base (Savoir ce qu'est une demi-droite)"]}
        objectives={[
          "Nommer un Angle avec l'Appellation des 3 Lettres sans se tromper.",
          "Mémoriser les 4 grandes Familles d'Angles (Aigu, Droit, Obtus, Plat).",
          "Manier ou Lire un Rapporteur sereinement lors des contrôles."
        ]}
      />

      <Section title="🌟 Introduction : C'est quoi un Angle ?" icon="🐊" color="slate">
        <p>
          Oublie la 'longueur' des traits ! Un Angle, c'est UNIQUEMENT <strong>L'ouverture</strong>, l'Écartement entre la mâchoire du bas et celle du haut. 
        </p>
        <p className="mt-4">
          Un crocodile avec des dents de 2 km, ou des dents de 4 cm... l'Angle de sa bouche sera IDENTIQUE s'il a ouvert la bouche avec le même écart. L'unité mondiale d'écartement est le <strong>Degré (°)</strong>, et l'outil souverain pour le mesurer de force est le Rapporteur.
        </p>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          La division d'un angle complet en 360° remonte aux Babyloniens, il y a de cela plus de 3 000 ans ! Ils observaient le mouvement de l'année terrestre qu'ils estimaient d'une durée d'environ 360 jours entiers, et ont donc découpé la ronde solaire céleste en 360 fuseaux.
        </InfoBlock>
      </Section>

      <Section title="1. Le Blason Sacré : (Le Chapeau des 3 Lettres)" icon="👑" color="indigo">
        <p className="mb-4">Tu n'as plus le droit de dire 'L'angle de gauche'. Comment nommer l'ouverture cosmique ?</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-indigo-900 dark:text-indigo-200">La Notation Ancestrale</h3>
           
           <div className="font-mono text-5xl font-black bg-card dark:bg-black/40 px-8 py-6 rounded-xl border border-indigo-100 shadow-lg text-indigo-600 dark:text-indigo-400 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[8px] text-indigo-500 font-bold transform origin-bottom scale-[2]">^</div>
             A<span className="text-rose-500">B</span>C
           </div>
           
           <div className="mt-8 space-y-4 max-w-lg w-full">
             <div className="bg-card p-4 rounded shadow-sm border-l-4 border-rose-500">
               <h4 className="font-bold text-rose-600 dark:text-rose-400">Le Cœur (La Lettre du Milieu)</h4>
               <p className="text-sm mt-1">C'est la règle d'or d'exclusion scolaire d'étourderie !! <strong>Le SOMMET de la charnière, la pointe du crochet, DOIT ÊTRE LA LETTRE DU PLEIN MILIEU.</strong> Ici 'B'. Le 'Chapeau Pointu' est posé sur la tête du B chéri.</p>
             </div>
             
             <div className="bg-card p-4 rounded shadow-sm border-l-4 border-sky-500">
               <h4 className="font-bold text-sky-600 dark:text-sky-400">Les 2 Ailiers (A et C)</h4>
               <p className="text-sm mt-1">Ce sont les cibles au bout des mâchoires. Tu pourrais choisir d'appeler l'angle <MathComponent math={"\\widehat{CBA}"} /> ! Cela représente exactement la même ouverture buccale. Les deux lettres périphériques représentent les demi-droites d'ouverture : <code>[BA)</code> et <code>[BC)</code>.</p>
             </div>
           </div>
        </div>
      </Section>

      <Section title="2. Notre Laboratoire Crocodile d'Angles" icon="📐" color="rose">
        <AngleCrocodileVisualizer />
        <InfoBlock title="Rappel de Base" type="reminder">
          Chaque angle au collège possède sa propre famille formelle selon son ouverture :
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Angle Aigu :</strong> Entre 0° et 89° (Strictement inférieur à un angle d'équerre).</li>
            <li><strong>Angle Droit :</strong> Pile-poil 90° (Vérifié par ton équerre).</li>
            <li><strong>Angle Obtus :</strong> Entre 91° et 179° (Plus large que l'équerre).</li>
            <li><strong>Angle Plat :</strong> Pile-poil 180° (Forme une ligne droite d'horizon).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="3. Les 4 Grandes Familles Naturelles" icon="🏰" color="amber">
        <p className="mb-4">Avant même de poser le moindre Rapporteur, ton œil divin doit savoir scanner la catégorie pure de l'Angle.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
           {/* Aigu */}
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm flex flex-col items-center">
             <div className="h-16 flex items-center justify-center">
               <div className="border-b-4 border-r-4 border-amber-600 w-8 h-8 transform rotate-45 skew-x-12"></div>
             </div>
             <span className="font-bold text-amber-700 dark:text-amber-300">L'Angle AIGU</span>
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">Le piquant ! Moins gros que l'équerre. Il fait entre <strong>0° et 89°</strong>. (Une pointe d'étoile).</p>
           </div>
           
           {/* Droit */}
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm flex flex-col items-center">
             <div className="h-16 flex items-center justify-center">
               <div className="border-b-4 border-r-4 border-rose-600 w-8 h-8 rounded-bl"></div>
             </div>
             <span className="font-bold text-rose-700 dark:text-rose-300">L'Angle DROIT</span>
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">Le Juge des tribunaux ! Il fait <strong>EXACTEMENT 90°</strong> absolus. Tu connais l'équerre.</p>
           </div>
           
           {/* Obtus */}
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm flex flex-col items-center">
             <div className="h-16 flex items-center justify-center">
               <div className="border-b-4 border-l-4 border-sky-600 w-12 h-6 -skew-x-[30deg]"></div>
             </div>
             <span className="font-bold text-sky-700 dark:text-sky-300">L'Angle OBTUS</span>
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">Le dodu ! Le relâché. L'angle d'un transat de jardin. Il oscille entre <strong>91° et 179°</strong>.</p>
           </div>
           
           {/* Plat */}
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm flex flex-col items-center">
             <div className="h-16 flex items-center justify-center">
               <div className="border-b-4 border-emerald-600 w-16 h-4 relative"><div className="absolute top-1/2 left-1/2 w-2 h-2 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div></div>
             </div>
             <span className="font-bold text-emerald-700 dark:text-emerald-300">L'Angle PLAT</span>
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">L'Océan infini d'horizon calme. Le grand écart Total. Exactement <strong>180°</strong>. Une ligne PURE.</p>
           </div>
        </div>
      </Section>

      <Section title="4. Le Rapporteur Double-Ligne" icon="🎯" color="emerald">
        <p className="mb-4">Tout le monde galère avec le rapporteur car IL A DEUX GRADUATIONS ! La ligne extérieure qui s'échelonne d'un côté (0 à 180), et la ligne intérieure qui part de l'autre (0 à 180). Comment s'y retrouver ?</p>

        <InteractiveExercise 
          title="Apprivoiser l'Anneau des Degrés"
          question={<>L'Angle dessiné est AIGU (Il pique fort, il a l'air de valoir un p'tit 30° de loin). Pourtant ton doigt glisse et tu lis "150°" sur le rapporteur... Que faire ?</>}
          steps={[
            <><strong>1. Le Centre est Divin :</strong> Positionne la Croix centrale du Rapporteur EXACTEMENT sur la charnière d'encre du sommet (la pique pointue) !</>,
            <><strong>2. L'Alignement de la Mâchoire :</strong> Fais pivoter ton plastique pour que le trait du ZERO de ton rapporteur se couche pile-poil sur un des côtés de l'angle.</>,
            <><strong>3. Le Choix du Zéro Initiateur :</strong> Regarde bien le point de contact. Le trait de l'angle pointe vers le 0 de quelle échelle ? Graduation interne ou externe ? C'est CETTE ÉCHELLE que tu dois suivre de force !</>,
            <><strong>4. L'Ascension :</strong> Suis les numéros de cette échelle jusqu'au croisement avec le second côté de ton dessin. 10, 20, 30. Victoire, ton angle mesure <strong>30°</strong> !</>
          ]}
        />
        
        <TipBanner title="Anti-Bugs Cerveau" type="warning">
           T'as le nez collé à la feuille et tu notes 150° pour un angle piquant ? Relève-toi et regarde de loin ! C'est physiquement IMPOSSIBLE qu'un angle si fermé fasse 150°. Ton cerveau a lu du mauvais côté de l'anneau, c'est le moment d'annuler cette étourderie et de renoter la bonne valeur !
        </TipBanner>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Nommer un angle complexe</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              On donne un triangle de sommets E, F, G. Comment se nomme la mâchoire angulaire d'ouverture située au niveau du sommet F ? Écris sa notation d'usage.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Le sommet de l'angle est <strong>F</strong>. Selon la règle universelle, la lettre du sommet doit occuper la position centrale.</li>
                <li>Les deux branches qui s'écartent depuis F sont les demi-droites [FE) et [FG).</li>
                <li>Les deux ailiers de l'angle sont ainsi E et G.</li>
                <li>On décore le tout d'un chapeau pointu protecteur. La notation correcte est donc : <span className="font-bold text-indigo-600">{"$\\widehat{EFG}$"}</span> ou également <span className="font-bold text-indigo-600">{"$\\widehat{GFE}$"}</span>.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Coupe de la Bissectrice</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              L'angle {"$\\widehat{XYZ}$"} mesure exactement 80° d'ouverture. La demi-droite [YI) est la bissectrice magique de cet angle. Combien mesure l'angle {"$\\widehat{XYI}$"} ?
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>La bissectrice [YI) est par définition le scalpel parfait de la géométrie : elle sépare n’importe quel angle en deux morceaux de tailles jumelles.</li>
                <li>L'angle de départ {"$\\widehat{XYZ}$"} mesure 80°.</li>
                <li>On divise donc mathématiquement ce gâteau d'angles par 2 : 80° / 2 = 40°.</li>
                <li>L’angle final {"$\\widehat{XYI}$"} mesure ainsi précisément <strong>40°</strong> !</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Un Angle peut-il faire plus de 180° en classe de Sixième ?</>}
            back={<><strong>Uniquement dans des devoirs complexes !</strong><br/>Généralement au collège, on étudie des angles fermés dits saillants de moins de 180°. Un angle mesurant par exemple 245° s'appelle un <strong>angle rentrant</strong>. Un cercle complet vaut 360°.</>}
          />
          <Flashcard 
            front={<>Si l'on grossit un angle à la loupe par 10, son ouverture multiplie par 10 ?</>}
            back={<><strong>Surtout pas ! Ça ne bouge jamais !</strong><br/>L'angle mesure l'écartement de direction entre les lignes ! Même si les traits tracés sur ta feuille font 2 kilomètres de long à la loupe, leur écart de mâchoires reste scrupuleusement identique en degrés !</>}
          />
          <Flashcard 
            front={<>Comment s'appelle l'angle mesurant exactement 180° ?</>}
            back={<>Il s'agit d'un <strong>Angle Plat</strong> ! Ses deux côtés se prolongent pour former une seule ligne droite continue et horizontale.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai les droites [xy) et [xz) d'arène, comment placer le sommet x dans le blason ?",
              answer: "Très simple ! Comme x est la base commune de tes demi-droites, il désigne le sommet principal. Tu le notes donc en plein milieu avec le chapeau pointu : $\\widehat{yxz}$."
            },
            {
              question: "Quand faut-il utiliser 'La valeur 90 degrés' plutôt que l'expression 'Angle Droit' ?",
              answer: "Il s'agit de la même vérité physique ! On utilise la notation chiffrée '90°' pour effectuer des opérations, des sommes d'angles ou de l'algèbre. On utilise l'expression littéraire 'Angle Droit' au cours de nos rédactions de démonstrations géométriques."
            },
            {
              question: "À quoi sert un rapporteur ?",
              answer: "Le rapporteur est l'instrument de dessin réservé aux mesures et au tracé des angles. Son unité est exclusivement découpée en degrés !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "On veut corriger Bob pour ce qu'il a écrit au tableau : 'L'Angle MNP est un angle aigu parfait de 125°'. Pourquoi ?",
              options: [
                "L'angle MNP aurait dû s'appeler PMN, question d'alphabet global !",
                "Un Angle 'Aigu' est physiquement bloqué sous la frontière des 90° ! 125° est donc impossible. Il est OBTUS !"
              ],
              correctAnswer: 1,
              explanation: "Top Suprême !! Le Scan Oculaire doit être immédiat. Tout ce qui pointe fermé est AIGU (moins de 90°). Un 125° est obligatoirement Obtus."
            },
            {
              question: "Comment se nomme la demi-droite d'origine le sommet qui coupe parfaitement un angle en deux angles égaux ?",
              options: [
                "La Bissectrice (Le Sabre divin)",
                "La Médiane transperçante.",
                "L'Axe du Milieu"
              ],
              correctAnswer: 0,
              explanation: "Grand Maître !! Le nom de ce vecteur qui sépare de moitié un angle (Ex: 60° divisé en deux angles jumeaux de 30°) s'appelle la BISSECTRICE ! Elle est très importante au collège."
            },
            {
              question: "Un angle aigu mesure 45°. On le juxtapose à un autre angle aigu de 45° pour former un nouvel angle d'ouverture globale. Comment se qualifie ce nouvel angle ?",
              options: [
                "C'est un angle aigu",
                "C'est un angle droit de 90°",
                "C'est un angle obtus"
              ],
              correctAnswer: 1,
              explanation: "Parfait ! 45° + 45° = 90° ! L'union de ces deux angles aigus forme ainsi l'angle droit de référence."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mémorisé : Les trois lettres du blason font château sur l'épaule 'Milieu' !",
            "Je Vois le Croco (Aigu/Obtus) de Loin AVANT de me tuer l'œil collé au Rapporteur.",
            "J'utilise le VRAI zéro du rapporteur sur la bonne ligne colorée d'origine !"
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

export default Course_College_6eme_06_Angles;
