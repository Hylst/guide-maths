import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MoveRight, RefreshCw, MoveDiagonal, Copy } from 'lucide-react';

const Course_College_4eme_09_Transformations: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-09"
        title="Translations et Rotations"
        subtitle="Voyages rectilignes et Danse tournoyante du plan"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Symétrie centrale et axiale (5ème)", "Utilisation du compas", "Notion d'angle"]}
        objectives={[
          "Comprendre qu'une Translation est un Glissement pur.",
          "Construire l'image d'une figure par une translation (Vecteur).",
          "Comprendre qu'une Rotation est un Tourne-disque (Centre et Angle).",
          "Mémoriser les propriétés de conservation de ces transformations."
        ]}
      />

      <Section title="🌟 Introduction : Les 4 grands déplacements" icon="🚂" color="slate">
        <p>
          Depuis la 6ème, tu apprends à déplacer des objets géométriques sans les déformer. Tu connais l'effet Miroir (Symétrie axiale) et le Demi-tour parfait (Symétrie centrale).
        </p>
        <p className="mt-4">
          La 4ème t'offre deux nouveaux pouvoirs : <strong>La Translation</strong> (Le Téléphérique ou tapis roulant) et <strong>La Rotation</strong> (La Grande Roue ou le tourne-disque). Après ça, le plan géométrique n'aura plus aucun secret pour toi.
        </p>
      </Section>

      <Section title="1. La Translation (Le Tapis Roulant)" icon="🛷" color="indigo">
        <p className="mb-4">Une translation est le déplacement le plus simple du monde : la figure <strong>Glisse</strong>. Elle ne tourne SURTOUT PAS, elle ne se retourne pas.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold mb-4 text-indigo-700 dark:text-indigo-300">Les 3 ordres du Glissement :</h3>
           <div className="flex gap-4 items-center justify-center font-mono">
              <div className="bg-card dark:bg-black/40 p-4 border rounded-xl text-center shadow-lg transform -translate-x-8">
                 P
              </div>
              <MoveRight className="w-16 h-16 text-indigo-500 animate-pulse" />
              <div className="bg-card dark:bg-black/40 p-4 border border-indigo-500 rounded-xl text-center shadow-lg text-indigo-600 dark:text-indigo-400 font-bold transform translate-x-8">
                 P' (Image)
              </div>
           </div>
           
           <ul className="space-y-4 mt-8 w-full">
             <li className="flex items-start gap-2">
               <span className="bg-indigo-200 dark:bg-indigo-800 rounded px-2 font-bold min-w-max">Direction</span>
               <span>La ligne droite sur laquelle le tapis glisse (Ex: L'horizontale, la diagonale AB...)</span>
             </li>
             <li className="flex items-start gap-2">
               <span className="bg-indigo-200 dark:bg-indigo-800 rounded px-2 font-bold min-w-max">Sens</span>
               <span>La flèche au bout du trait (Ex: Vers le Haut, Vers la Droite, "De A vers B"). À ne pas confondre avec la Direction ! (L'autoroute du Sud est une Direction. Aller vers Paris ou vers Marseille, ce sont les 2 Sens).</span>
             </li>
             <li className="flex items-start gap-2">
               <span className="bg-indigo-200 dark:bg-indigo-800 rounded px-2 font-bold min-w-max">Longueur</span>
               <span>La distance du voyage (Ex: Glisse de 5 cm).</span>
             </li>
           </ul>
        </div>
      </Section>

      <Section title="2. Construire une Translation (La méthode du compas)" icon="📏" color="blue">
        <p className="mb-4">Au compas, la translation consiste secrètement à tracer des <strong>Parallélogrammes</strong> invisibles !</p>

        <InteractiveExercise 
          title="Translader le point M avec le vecteur AB"
          question={<>L'énoncé dit : "Construis le point M', image de M par la translation qui transforme A en B". <em>Comment utiliser ton compas sans règle ni équerre ?</em></>}
          steps={[
             <><strong>L'Ordre secret :</strong> Le texte 'qui transforme A en B' te donne la flèche de référence. C'est l'étalon du voyage.</>,
             <><strong>Étape 1 (Le Rayon Voyage) :</strong> Pique le compas sur A, ouvre-le jusqu'à B. (Tu as 'sauvegardé' la longueur du voyage). Garde cet écartement, pique sur M et trace un grand arc de cercle (vers où la flèche regarde).</>,
             <><strong>Étape 2 (Le Rayon Écartement) :</strong> Pique sur A (le départ de la flèche), ouvre le compas jusqu'à M. (Tu as calculé l'écart entre le tapis et le point). Garde cet écartement, pique sur B et croise ton premier arc !</>,
             <><strong>Final :</strong> La croix obtenue est M'. Impressionnant : Le quadrilatère ABM'M est un <strong>parallélogramme parfait !</strong></>
          ]}
        />
      </Section>

      <Section title="3. La Rotation (La platine Vinyle)" icon="🔄" color="amber">
        <p className="mb-4">Contrairement à la symétrie centrale (qui est une rotation stricte, ennuyeuse et bloquée à 180°), la <strong>Rotation de 4ème</strong> permet de tourner du nombre de degrés que l'on souhaite.</p>

        <InfoBlock type="warning" title="Les 3 informations vitales">
           <p className="mb-4 text-sm">Pour faire pivoter une figure, le cerveau a besoin de 3 données absolues :</p>
           <ul className="space-y-2 font-medium">
             <li><strong>1. Le Centre :</strong> C'est le piquet (Point O) où tu vas planter la pointe métallique de ton compas. C'est l'axe de la roue.</li>
             <li><strong>2. L'Angle :</strong> L'ouverture du mouvement (ex: 60°, 90°, 45°). À mesurer au rapporteur.</li>
             <li><strong>3. Le Sens de rotation :</strong> On tourne vers la droite ou la gauche ?
                <ul className="ml-6 list-disc text-sm font-normal mt-1">
                  <li><strong>Sens Horaire :</strong> Le sens des aiguilles d'une montre (Le plus commun).</li>
                  <li><strong>Sens Anti-Horaire (ou Trigonométrique) :</strong> Le sens mathématique pur, la marche arrière.</li>
                </ul>
             </li>
           </ul>
        </InfoBlock>
      </Section>

      <Section title="4. Le dogme des Invariants (La Magie des Transformations)" icon="✨" color="emerald">
        <p className="mb-4">Que tu glisses (Translation) ou que tu tournes (Rotation), la figure d'origine <strong>ne meurt pas, elle est clonée.</strong></p>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 my-6 shadow-sm">
           <p className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-2">Propriétés de Conservation à citer au Brevet :</p>
           <p className="italic text-sm text-muted-text mb-4">"Les translations et les rotations conservent..."</p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
             <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-bold text-sm">📏 Les Longueurs</div>
             <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-bold text-sm">📐 Les Angles</div>
             <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-bold text-sm">🟦 Les Aires</div>
             <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-bold text-sm">➖ L'Alignement</div>
           </div>
           
           <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-300">
             <strong>Conséquence royale :</strong> Si tu transformes un carré d'aire 10cm², son image SERA un carré parfait de 10cm². Jamais un losange, jamais une figure aplatie.
           </p>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est l'image du point O (Le centre de la Rotation) par une rotation de centre O ?</>}
            back={<><strong>Alerte piège : C'est le point O lui-même !</strong><br/>Le centre de la roue ne bouge pas, il tourne sur lui-même de manière sur-place. On l'appelle un point 'Invariant'.</>}
          />
          <Flashcard 
            front={<>J'effectue une translation horizontale, puis la MEME avec une flèche à l'envers. Que se passe-t-il ?</>}
            back={<>Tu reviens à ta place initiale parfaite ! C'est la translation de vecteur "Nul". L'effet a été annulé par le sens inverse sur la même direction et longueur.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence entre Rotation de 180° et Symétrie Centrale ?",
              answer: "IL N'Y EN A AUCUNE ! Le génie des Maths, c'est que faire un pique-compas avec le symétrique, et faire tourner une roue de 180 degrés autour de ce point amène physiquement ton objet PUREMENT au même endroit. C'est la même magie nommée différemment."
            },
            {
              question: "Si la copie du brevet me dit 'Translation de vecteur AB', c'est quoi un vecteur ?",
              answer: "Le Vecteur, c'est juste un mot lycéen pour dire 'La Flèche'. Un vecteur possède la trinité : Direction de la flèche, Sens de la pointe de la flèche, et Longueur de la tige de la flèche. C'est tout !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Pour dessiner la Rotation d'un Triangle ABC, de centre O (qui est dehors), de 90° horaire. Je trace :",
              options: [
                "Un cercle passant par A, B et C, puis je l'avance de 90°.",
                "Je mesure 90° sur chaque pointe du triangle pour les tordre.",
                "Je relie [OA]. Je pose mon rapporteur sur [OA] au point O. Je mesure 90° Horaire. Je tire un trait et je reporte la longueur OA au compas pour trouver A'. Je fais pareil pour B, puis C."
              ],
              correctAnswer: 2,
              explanation: "Incroyable ! La rotation est personnelle. Le point O est le piquet. Le rayon du point A jusqu'à O est sacré. On lève ce rayon de 90° comme une grue, et on place A'. Et tu recommences le processus mental 3 fois sans t'embrouiller pour fermer ton triangle final."
            },
            {
              question: "Toute l'école glisse le long d'une descente de ski en conservant son orientation (sans tourner). Quel est son déplacement Mathématique ?",
              options: [
                "Une Symétrie Axiale.",
                "Une Translation.",
                "Une Rotation descendante."
              ],
              correctAnswer: 1,
              explanation: "Excellence absolue. Un glissement SANS TOURNER, où la tête regarde toujours tout face comme devant, est la définition officielle de la Translation (Tapis roulant)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je ne trace pas une translation juste 'A vue d'oeil', le compas montre les 2 coups d'arc croisés.",
            "Rotation : Je repère l'ongle Horaire (Montre) vs Anti-Horaire (Inversé).",
            "Mémorisé : La symétrie centrale est un nom pour la 'Rotation de 180°'."
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

export default Course_College_4eme_09_Transformations;
