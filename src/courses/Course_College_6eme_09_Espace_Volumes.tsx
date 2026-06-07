import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Box, Layers, PlaySquare, Pyramid } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_6eme_09_Espace_Volumes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-09"
        title="Espace et Volumes"
        subtitle="Quitter le sol plat : La Conquête de la Troisième Dimension (3D)"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Perimètres et Aires (La 2D)", "Les unités (cm, dm, m)"]}
        objectives={[
          "Reconnaître le Pavé Droit et de Cube (Solides).",
          "Calculer un Volume en sortant l'arme secrète (Base × Hauteur).",
          "Mémoriser l'unité Suprême : Le Cube du mètre ('³').",
          "Calculer des tranches et des cubes empilables."
        ]}
      />

      <Section title="🌟 Introduction : Adieu l'Écran Plat" icon="🚀" color="slate">
        <p>
          L'Aire (Le 2D) de ton rectangle précédent, c'était le sol d'un immeuble, ou une dalle TV plate, ou un champ d'herbe de 1 millimètre d'épaisseur. Les choses n'avaient pas de profondeur.
        </p>
        <p className="mt-4">
          En 6ème, tu passes en 3D. Tu utilises <strong>LES VOLUMES</strong>. Tu vas tirer la dalle vers le ciel et créer les Murs de l'Immeuble. Le Volume c'est pas le carrelage (Aïre), c'est <strong>la Quantité d'Air ou d'Eau</strong> nécéssaire pour remplir un bocal à POISSON !!
        </p>
      </Section>

      <Section title="1. Le Monstre de la Galaxie : 'Le Pavé Droit'" icon="Box" color="indigo">
        <p className="mb-4">Il y a un boss emblématique. Oublie le Rectangle. Souhaite la bienvenue à sa version 3D gonflée.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
           <div className="flex-1 w-full order-2 md:order-1 relative h-48 bg-card dark:bg-black/40 rounded-xl overflow-hidden shadow border border-indigo-100 flex items-center justify-center p-8">
             {/* Fake 3D Box in CSS */}
             <div className="relative w-24 h-16 bg-indigo-500 border border-indigo-700">
               {/* Top Face */}
               <div className="absolute -top-6 left-3 w-24 h-6 bg-indigo-300 border border-indigo-600 transform skew-x-[30deg]"></div>
               {/* Right Face */}
               <div className="absolute top-[-12px] right-[-12px] w-6 h-16 bg-indigo-700 border border-indigo-800 transform skew-y-[60deg]"></div>
               <span className="absolute -left-6 top-1/2 -mt-4 text-sm font-bold text-slate-400">&uarr;</span>
               <span className="absolute -left-6 top-1/2 mt-0 text-xs font-bold whitespace-nowrap">Hauteur (h)</span>
               <span className="absolute -bottom-6 left-8 text-xs font-bold whitespace-nowrap">Longueur (L)</span>
               <span className="absolute -right-8 bottom-0 -mt-2 text-xs font-bold whitespace-nowrap">Profondeur (l)</span>
             </div>
           </div>
           
           <div className="flex-[1.5] order-1 md:order-2 space-y-4">
             <h3 className="font-bold text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Anatomie d'un Solide (Vocabulaire Divin) :</h3>
             <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
               <li><strong>Les Faces :</strong> Les grandes Plaques de contreplaqué (Il y en a 6, comme un Dé de casino).</li>
               <li><strong>Les Arêtes :</strong> Ce sont les traits, la barrière qui relient deux plaques (Les arêtes coupent les doigts).</li>
               <li><strong>Les Sommets :</strong> Les Pics Assassins piquant vers l'exterieur à chaque intersection !!</li>
             </ul>
           </div>
        </div>
      </Section>

      <Section title="2. Le Secret de la Magie Volumique (La Fusion Multiplicative)" icon="Layers" color="blue">
        <p className="mb-4">Pour connaitre le Volume Absolu (l'intérieur total de la boîte), il y a LA Règle ! Et si tu la mémorises, tu sais calculer n'importe quelle boite de carton sur Terre.</p>

        <TipBanner title="La Formule Sanglante : Base × Hauteur !" type="success">
           <strong>Étape 1 : Trouve d'abord la Surface 'posée' par terre (La Dalle)</strong><br/>
           Si ton fond est un rectangle (L=5, l=3), son "Air du Culte" au sol est de : 5 × 3 = 15 centimètres Carrelés (cm²).<br/><br/>
           <strong>Étape 2 : L'Ascension (La fusée dans l'espace 3D)</strong><br/>
           Je prends ma Base par terre (15) et Je LA MULTIPLIE PAR LA HAUTEUR du bâtiment vers le ciel ! (Ex Hauteur 4 cm).<br/>
           15 × 4 = <strong>60</strong>.<br/><br/>
           Le Volume total de la Terre en boite, d'Air respirable, ou d'Eau, est de <strong>60 cm³</strong> ! C'est la loi "Superficie de Base × Hauteur".
        </TipBanner>
      </Section>

      <Section title="3. Les Unités (L'Évolution du Mètre : [³])" icon="Pyramid" color="rose">
        <p className="mb-4">Il faut arrêter d'utiliser <code>cm</code> ou <code>cm²</code> avec les Volume 3D !</p>

        <InteractiveExercise 
          title="Pourquoi le [3] au bout !!?"
          question={<>Au lieu du m² normal (Le 2 des superficies), la maitresse utilise <MathComponent math={"m^3"} />  ? (Mètre CUBE).</>}
          steps={[
            <><strong>1. L'origine :</strong> Une ligne a 1 dimension. (m). / L'Aire et Multipliée avec 2 axes (L et largeur) dans un carrelage à plat.. Donc Exposant '2'.. (m²)</>,
            <><strong>2. L'Espaaace  3D :</strong> Puisque tu as multiplié 3 batons entre-eux : L × l × h !. Le resultat developpe de l'espace tridimensionnel : C'est L'Exposant '3' !! Donc [ <MathComponent math={"cm^3"} /> ].</>,
            <><strong>3. La Galère Fantôme Du Tableau :</strong> Tu te rappeles que les <MathComponent math={"cm^2"} /> avaient 2 sous colonnes dans leurs case de transfo ? Bah Les Volume en ('³')... en <strong>ONT 3 ENTIEREMENT VIDES !</strong> C'est la Fausse Triple. A chaque saut de grandeur (ex <MathComponent math={"dm^3"} /> vers <MathComponent math={"cm^3"} />), c'est un bon Multiplié non pas par 10.. ni 100... mais <strong>Par 1000 !</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me tend un cube fait de Rubik's ! 10cm x 10cm x 10cm. Comment je calcule sont Volume direct ?</>}
            back={<><strong>La loi Absolue x × x × x !</strong><br/>Un cube c'est juste un cas bizzare de pavé droit où tous les murs ont la même taille ! (B × h) = <MathComponent math={"10\\times10"} /> Base... * 10 de hauteur. = <MathComponent math={"10\\times10\\times10 = 1000"} /> cm³ d'eau !</>}
          />
          <Flashcard 
            front={<>Si j'ai convertis une piscine 3D en tableau, 1 dm³ ça veut strictement rien dire dans l'eau réelle pour moi ! Ca donne quoi en cuisine ?</>}
            back={<><strong>Un Litre !!! (L'Équivalence d'Or).</strong><br/>Grave bien ceci dans la roche : <strong>1 Litre (1L) = 1 dm³ !</strong> (Le volume d'une boite vide de lait brique de 10cm x 10cm x 10 cm au fond).</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'utilise L * l... et que je n'ai AUCUNE HAUTEUR (ex: h = zéro). Combien vaut le Volume ?",
              answer: "L'arme L * l * 0 s'éteint et le feu meurt. Formellement : Volume = 0 cm³. Un objet plat ne peut emprisonner AUCUNE GOUTTE d'eau. C'est le carrelage seul mort sans air !"
            },
            {
              question: "A quoi sert le mot 'Cylindre' de notre programme ?",
              answer: "C'est un Pavé droit mais sans carrés ! Sa BASE posée par terre est Le Monstre Rond : Le Cercle ! On fait l'Aire du Cercle (Sol) et on Multpiplie ce tas Rond par la Hauteur de La canette de Coca ! La Formule est Identique." // Bien qu'officialisé plus tard, c'est l'essence. 
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle Dimension Physique permet de représenter Le Volume Volumétrique ?",
              options: [
                "2D (Car le monde se calcule en Aïre-Aérienne).",
                "3D ! (Les trois murs des Axes x, y, z : L'Espace entier).",
                "1D Lignes Filaires."
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! C'est Le Règne Absolu Divin Trois Dimensions 3D ! L'Espace du cube. La Puissance (3) C'est pas pour faire style décoratif de chiffre !"
            },
            {
              question: "Ouvre Toi l'Esprit. Si un Cube a un côté (Arette pure) mesurant 2 ! Son Volume d'air enfermée sera-t-il :",
              options: [
                "8.",
                "6.",
                "4."
              ],
              correctAnswer: 0,
              explanation: "Bingo ! Oublies pas la formule. L × l × h ! Pour un cube Magique pur. Ca va faire 'coté' * 'coté' * 'coté'. Soit : 2 × 2 × 2 = (4) × 2 = 8 !!"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle en Tête : Le Rectangle s'est métamorphosé Magiquement en PAVÉ DROIT.",
            "Formulation à Graver : SURFACE au Sol &times; Ascension HAUTEUR Vers Le Ciel.",
            "La Base secrète est que Une boite Magique d'1 dm³ enferme le Graal : 1 Litre De Coca cola !."
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

export default Course_College_6eme_09_Espace_Volumes;
