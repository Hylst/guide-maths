import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Compass, Focus, View, ArrowUpRight } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

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
          "Nommer un Angle avec l'Appellation des 3 Lettres sans rien casser.",
          "Mémoriser les 4 grandes Familles d'Angles (Aigu, Droit, Obtus, Plat).",
          "Manier ou Lire un Rapporteur sans tuer le Jury."
        ]}
      />

      <Section title="🌟 Introduction : C'est quoi un Angle ?" icon="🐊" color="slate">
        <p>
          Oublie la "longueur" des traits. Un Angle, c'est UNIQUEMENT <strong>L'ouverture</strong>, l'Ecartement entre la mâchoire du bas et celle du haut ! 
        </p>
        <p className="mt-4">
          Un crocodile avec des dents de 2 km, ou des dents de 4 cm... l'Angle de sa bouche sera IDENTIQUE s'il a ouvert la bouche avec le même écart. L'unité mondiale d'écartement est le <strong>Degré (°)</strong>, et l'outil absolu est le Rapporteur.
        </p>
      </Section>

      <Section title="1. Le Blason Sacré : (Le Chapeau des 3 Lettres)" icon="👑" color="indigo">
        <p className="mb-4">Tu n'as plus le droit de dire "L'angle de gauche". Comment nommer l'ouverture cosmique ?</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">La Notation Ancestrale</h3>
           
           <div className="font-mono text-5xl font-black bg-card dark:bg-black/40 px-8 py-6 rounded-xl border border-indigo-100 shadow-lg text-indigo-600 dark:text-indigo-400 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[8px] text-indigo-500 font-bold transform origin-bottom scale-[2]">^</div>
             A<span className="text-rose-500">B</span>C
           </div>
           
           <div className="mt-8 space-y-4 max-w-lg w-full">
             <div className="bg-card p-4 rounded shadow-sm border-l-4 border-rose-500">
               <h4 className="font-bold text-rose-600 dark:text-rose-400">Le Cœur (La Lettre du Milieu)</h4>
               <p className="text-sm mt-1">C'est la règle d'or d'expulsion scolaire !! <strong>Le SOMMET de la charnière, la pointe du crochet, DOIT ÊTRE LA LETTRE DU PLEIN MILIEU.</strong> Ici 'B'. Le "Chapeau Pointu" est posé sur la tête du B chéri.</p>
             </div>
             
             <div className="bg-card p-4 rounded shadow-sm border-l-4 border-sky-500">
               <h4 className="font-bold text-sky-600 dark:text-sky-400">Les 2 Ailiers (A et C)</h4>
               <p className="text-sm mt-1">C'est les Cibles au bout des mâchoires. Tu pouvais choisir de l'appeler <MathComponent math={"\\widehat{CBA}"} /> ! Ça représente exactement la même bouche de croco. Les deux Lettres du bord décrivent les "Demi-Droites" supportant l'angle : `[BA) et [BC)`.</p>
             </div>
           </div>
        </div>
      </Section>

      <Section title="2. Les 4 Grandes Familles Naturelles" icon="🏰" color="amber">
        <p className="mb-4">Avant même de poser le moindre Rapporteur, ton oeil divin doit savoir scanner la catégorie pure de l'Angle.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
           {/* Aigu */}
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm flex flex-col items-center">
             <div className="h-16 flex items-center justify-center">
               <div className="border-b-4 border-r-4 border-amber-600 w-8 h-8 transform rotate-45 skew-x-12"></div>
             </div>
             <span className="font-bold text-amber-700 dark:text-amber-300">L'Angle AIGU</span>
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">Le piquant ! Moins gros que l'equerre. Il fait entre <strong>0° et 89°</strong>. (Une pointe d'étoile).</p>
           </div>
           
           {/* Droit */}
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm flex flex-col items-center">
             <div className="h-16 flex items-center justify-center">
               <div className="border-b-4 border-r-4 border-rose-600 w-8 h-8 rounded-bl"></div> {/* Simulation droit */}
             </div>
             <span className="font-bold text-rose-700 dark:text-rose-300">L'Angle DROIT</span>
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">Le Juge des tribunaux ! Il fait <strong>EXACTEMENT 90°</strong> absolus. Tu connais l'equerre.</p>
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
             <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">L'Océan infini d'horizon calme. Le grand écart Total. Exxaaaactement <strong>180°</strong>. Une ligne PURE.</p>
           </div>
        </div>
      </Section>

      <Section title="3. Le Rapporteur Double-Ligne (L'Épreuve du feu)" icon="🎯" color="emerald">
        <p className="mb-4">Tout le monde galère avec le rapporteur car IL A DEUX GRADUATIONS ! La ligne rouge qui part de la gauche (0 à 180), et la ligne Bleue qui part de la droite (180 à 0).</p>

        <InteractiveExercise 
          title="Apprivoiser l'Anneau des Degrés"
          question={<>L'Angle dessiné est AIGU (Il pique fort, il a l'air de valoir un p'tit 30° d'oeil). Mais OOPS le côté gauche du rapporteur marque "150" sur le Zero de depart... La calculatrice pleure.</>}
          steps={[
            <><strong>1. Le Centre est Divin :</strong> Positionne la Croix du millieu du Rapporteur EXACTEMENT sur la Pique-Sommet encre du croco !</>,
            <><strong>2. L'Alignement de la Mâchoire :</strong> Fais pivoter ton anneau pour que la ligne de base du ZERO de ton rapporteur se couche pile-poils et fusionne avec un des deux traits encre.</>,
            <><strong>3. Le Choix d'une Vie (Gauche ou Droite ?) :</strong> Le zéro "Alignateur" touche le trait noir du dessin. Regarde bien CE Zéro. Fait-il partie de l'anneau Interne, ou Externe ? C'est LUI que tu DOIS LIRE !!! L'autre Zéro (Le 180 de l'autre bout) c'est le menteur du diable.</>,
            <><strong>4. Ascension de compte :</strong> Remonte l'échelle de ce zéro jusqu'au coup de Lazer (2ème trait d'encre). 10, 20, 30. Victoire C'est 30° !!</>
          ]}
        />
        
        <TipBanner title="Anti-Bugs Cerveau" type="warning">
           T'as le nez collé à la feuille et tu notes 150° !! Relève-Toi ! Regarde de loin. Ton angle pique comme un Pic à Brochette !! C'EST PHYSIQUEMENT IMPOSSIBLE QU'IL SOIT OBTUS A 150 ! Ton cerveau a lu du mauvais côté de l'anneau, C'EST le moment d'annuler cet aveuglement ! Tu notes le bon 30° salvateur !
        </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Un Angle peut valoir 250° au Collège en Sixième ?</>}
            back={<><strong>Uniquement dans la vie noire ! (Angle Rentrant)</strong><br/>Normalement 99.9% des Mathématiques bloquent le calcul d'ouverture Max "Bosse de Gauffre" du transat à L'ANGLE PLAT = 180°. Mais pour Info si tu fais 'Le Tour', le cercle Total vaut <strong>360°</strong>.</>}
          />
          <Flashcard 
            front={<>Je prends Le gros Croco (DEF), et avec une loupe géante, je grossis de x4 ma figure d'encre. Quelle est la nouvelle taille en degrés ?</>}
            back={<><strong>RIEN NE BOUGE !! (Sauf que le croco mangera plus d'enfants) !</strong><br/>J'ai dis que l'Angle c'est <strong>L'Ecartement du vide d'origine !</strong> Ça reste un même espace Trivial, l'Ouverture de la mâchoire Reste le Parfait Même Degré !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai les droits [xy) et [xz), le sommet n'a pas de nom comme 'A' ou 'B', mais 'x' (petit), je peux le mettre dans le blason ?",
              answer: "Oui ! Et en Minuscule. Les lettres minuscules désignent souvents La Demi droite Infinie 'x', le sommet est aussi 'x'. Tu peux le nommer : $\\widehat{y\\textbf{x}z}$. Le petit x porte le chapeau du sommet !"
            },
            {
              question: "A quel moment dois je dire 'Je lis 90 degrés' au lieu de 'L'angle est droit' ?",
              answer: "C'est la différence entre Le Statut Social (Famille Droit) et la Précision Millimetrique Mesurée (90°). Utilise '90°' dans les formules de calcul, et 'Angle Droit' dans les blablas pour les theoreme !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "On veut tuer Bob pour ce qu'il a écrit au tableau : L'Angle MNP est un angle aigu parfait de 125°. Pourquoi ?",
              options: [
                "L'angle MNP aurait du s'appeller PMN, question d'alphabet global !",
                "Un Angle 'Aigu' est Physiquement bloqué sous 90°(Equerre) ! 125 est impossible. C'est OBTUS !"
              ],
              correctAnswer: 1,
              explanation: "Top Suprême !! Le Scan Oculaire doit être Immédiat. Tous ce qui pointe Petit est AIGU (- de 90°). Un 125 est Fatalement Dodu et Ouvert ! OBTUuussss ! (Obtus)."
            },
            {
              question: "Comment se nomme le Lazer-Milieu qui coupe Parfaitement la Mâchoire d'un angle en 2 angles Jumeaux magiques Egaux ?",
              options: [
                "La Bissectrice (Le Sabre divin)",
                "La Mediane Transperçante.",
                "L'Oxe du Milieu"
              ],
              correctAnswer: 0,
              explanation: "Grand Maitre !! Le nom barbare de ce fleau qui coupe en 2 un angle (Ex: 60° coupé en un bloc Jumeau de [30°|30°]) s'appelle la BISSECTRICE (Demi droitr issue du sommet) ! Elle est vénérée au Collège."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mémorisé: Les trois lettres du blason font chateau sur l'épaule 'Milieu' !",
            "Je Vois le Croco (Aigu/Obtus) de Loin AVANT de me tuer l'oeil collé au Rapporteur",
            "J'utilise le VRAI zero du rapporteur sur la bonne ligne colorée !"
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
