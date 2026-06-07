import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Ruler, Maximize2, MoveVertical, Footprints } from 'lucide-react';

const Course_Primaire_CP_04_Mesures_Longueurs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CP-04"
        title="Les Longueurs (Mesurer)"
        subtitle="Qui est le plus grand, le plus petit ?"
        duration="35min"
        level="CP"
        prerequisites={["Savoir comparer ce qui est grand et petit"]}
        objectives={[
          "Utiliser les mots : Long, Court, Haut, Bas.",
          "Savoir ranger du Plus Petit au Plus Grand.",
          "Découvrir l'outil du maître : La Règle !"
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La mesure au CP commence par de la comparaison directe (mettre de objets côte à côte), puis on introduit l'unité de référence artificielle, qui est le centimètre, avec l'utilisation de la règle. Le défi n°1 est souvent d'apprendre à l'enfant à aligner correctement le bout de l'objet avec la graduation zéro (et non le bord de la règle).
      </InfoBlock>

      <Section title="1. Petit ou Grand ? Long ou Court ?" icon={<MoveVertical className="w-6 h-6"/>} color="blue">
        <p className="mb-4">Dans la vie, tout n'a pas la même taille ! Une fourmi est petite, un immeuble est géant.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-xl border border-sky-200 text-center flex flex-col justify-end items-center h-48 relative">
             <div className="w-4 h-8 bg-sky-500 rounded flex-shrink-0"></div>
             <p className="font-bold text-sky-700 mt-4">COURT / PETIT</p>
             <p className="text-xs absolute top-2 left-2 text-slate-500">Comme une gomme</p>
           </div>
           
           <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/60 text-center flex flex-col justify-end items-center h-48 relative">
             <div className="w-4 h-32 bg-indigo-500 rounded flex-shrink-0"></div>
             <p className="font-bold text-indigo-700 dark:text-indigo-300 mt-4">LONG / GRAND</p>
             <p className="text-xs absolute top-2 left-2 text-slate-500">Comme une Girafe</p>
           </div>
        </div>

        <TipBanner title="Le Rangement (L'Escalier)" type="success">
           Ranger "par taille", ça s'appelle L'ORDRE CROISSANT : c'est faire un escalier. On met <strong>le plus petit en premier</strong> (Tout en bas), puis le moyen, puis le GÉANT tout à la fin en haut !
        </TipBanner>
      </Section>

      <Section title="2. L'Outil Magique : La Règle (Le Centimètre)" icon={<Ruler className="w-6 h-6"/>} color="rose">
        <p className="mb-4">Pour pas se faire arnaquer, on mesure ! Au CP on utilise <strong>La RÈGLE Graduée</strong>. Graduée ça veut dire qu'il y a plein de petits traits et des numéros dessus.</p>

        <InteractiveExercise 
          title="Comment Mesurer un Crayon ?"
          question={<>Où dois-je poser mon crayon contre la règle pour trouver sa taille exacte ?</>}
          steps={[
            <><strong>1. Le Piège du Bout :</strong> Ne pose PAS le crayon au tout bout en plastique de la règle ! C'est faux !</>,
            <><strong>2. Le ZÉRO Magique :</strong> Tu DOIS poser le début de ton crayon pile poil sur la marque du <strong>ZERO (0)</strong> dessiné. C'est le point de Départ de la course.</>,
            <><strong>3. La Lecture :</strong> Regarde où s'arrête la mine de ton crayon. Si elle tombe sur le nombre "12"... Ton crayon mesure <strong>12 Centimètres (cm) !</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Si j'aligne une Fourmi, un Chat et un Eléphant de Gauche à Droite. C'est l'ordre...</>}
            back={<><strong>Croissant ! (Du plus petit au plus grand)</strong><br/>Comme une graine qui Pousse et devient un Grand Arbre.</>}
          />
          <Flashcard 
            front={<>Quand je place mon crayon sur ma Règle, je met son culsur le bout de la règle ou sur le trait (0) ??</>}
            back={<><strong>Sur Le Trait ZÉRO (0) !!!</strong><br/>C'est très important. Le bout de la règle est souvent cassé ou abimé, le ZERO est le vrai départ du chef !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quel mot doit-on dire pour la taille d'un spaghetti bien cuit et filamenteux ?",
              options: [
                "C'est Lourd.",
                "C'est Très Long !",
                "C'est pointu."
              ],
              correctAnswer: 1,
              explanation: "Top ! La Longueur sert à comparer ce qui est Long (Loin) ou Court !! Le spaghetti est Long !"
            },
            {
              question: "Si ton pouce est aligné sur le 0 de la règle, et que son bout touche le Trait du 3. Ton doigt mesure :",
              options: [
                "3 Kilomètres.",
                "3 Centimètres (cm) !",
                "10 Centimètres."
              ],
              correctAnswer: 1,
              explanation: "Exact ! Sur les règles de l'école c'est des Centimètres (cm c'est pour Centi - Mètres) !! 3 cm c'est parfait !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais dire Long et Court.",
            "L'Escalier Croissant : De mon petit doigt au grand bras.",
            "Sur une règle, on Commence TOUJOURS au ZÉRO [ 0 ] !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider la Leçon (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CP_04_Mesures_Longueurs;
