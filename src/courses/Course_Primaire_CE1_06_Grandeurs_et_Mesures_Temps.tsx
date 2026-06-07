import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Clock, Calendar, Sun, Moon } from 'lucide-react';

const Course_Primaire_CE1_06_Grandeurs_et_Mesures_Temps: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE1-06"
        title="Mesures du Temps"
        subtitle="Apprendre à lire l'Heure et le Calendrier comme la montre de tes parents !"
        duration="40min"
        level="CE1"
        prerequisites={["Savoir compter jusqu'à 60"]}
        objectives={[
          "Lire l'heure exacte sur une montre à aiguilles.",
          "Distinguer la Petite Aiguille (Heure) de la Grande (Minutes).",
          "Naviguer dans les Mois du Calendrier."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La lecture de l'horloge analogique est particulièrement difficile parce qu'elle repose sur un calcul en base 60. Ne soyez pas trop exigeants au départ : l'important est d'abord de comprendre le sens de lecture et les mots de repère temporels (pile, et demie, et quart, moins le quart).
      </InfoBlock>

      <Section title="1. L'Horloge à Aiguilles (Le Cadran magique)" icon={<Clock className="w-6 h-6"/>} color="rose">
        <p className="mb-4">Voici la reine des mesures ! L'Horloge (ou LA MONSTRE A PILE). Elle a DEUX aiguilles vitales. C'est l'outil de temps du super héros de l'école primaire !</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-2xl border-t-8 border-rose-500 shadow-sm text-center relative">
               <div className="absolute top-2 right-2 text-rose-500 font-black text-2xl">P</div>
               <h3 className="font-bold text-rose-700 dark:text-rose-300 text-xl mb-4">La PETITE Aiguille</h3>
               <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-slate-200">Le Commandant LENT : "LES HEURES" 🚂</p>
               <p className="text-sm mt-3 text-slate-600 dark:text-slate-300">Elle est coute et tourne très lentement. Elle fait le tour de l'horloge en une demi-journée compléte ! Elle regarde Les gros chiffres écrit en grand (1, 2, 3.. 12).</p>
           </div>
           
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border-t-8 border-sky-500 shadow-sm text-center relative">
               <div className="absolute top-2 right-2 text-sky-500 font-black text-2xl">G</div>
               <h3 className="font-bold text-sky-700 text-xl mb-4">La GRANDE Aiguille</h3>
               <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-slate-200">Le Coureur Rapide : "LES MINUTES" ⚡</p>
               <p className="text-sm mt-3 text-slate-600 dark:text-slate-300">Elle est fine et touche le bord ! Elle fait Un tour complet en Pile-Poil.. 1 HEURE !. On compte ces minutes caché de 5 en 5 (Le '1' vaut '5min', le '2' vaut '10 min').</p>
           </div>
        </div>

        <TipBanner title="Le Secret de O'Clock (Pile !)" type="success">
           Quand la très GRANDE Aiguille (minutes) Pique tout en Haut, Droit dans le ciel sur le Nombre [12] : C'est L'HEURE PILE ! On dit "Il est 4 heures, tout pile ! 00 minutes !". 
        </TipBanner>
      </Section>

      <Section title="2. Les Demi-Heures (La Pizza coupée en deux)" icon={<Moon className="w-6 h-6"/>} color="indigo">
        <p className="mb-4">L'heure Tourne sur une Pizza. Quand la grande aiguille à fait tout le tour... c'est fini. Mais si elle s'arrete tout en bas... ?</p>

        <InteractiveExercise 
          title="Le Demi Tour"
          question={<>La Petite montre le [3]. La Grande pointe en bas droit vers l'enfer (sur le [6]). Quelle heure est-il dans l'univers ?</>}
          steps={[
            <><strong>1. L'heure (Petite) :</strong> Je regarde la commande. La petite aiguille dépasse le [3]. Elle est entre 3 et 4 !! Donc il est 'Trois Heures [et Quelque-Chose]'.</>,
            <><strong>2. Les Minutes (Grande) :</strong> La grande à fait pile la MOITIÉ du chemin ! Elle pointe sur le 6. La Moitié de 60 minutes... C'est 30 Minutes !</>,
            <><strong>3. La Lecture Magique :</strong> Il est <strong>"Trois heures et DEMIE" (3h30 !)</strong> ! L'art du gouter !</>
          ]}
        />
      </Section>

      <Section title="3. Le Calendrier et ces 12 Boss Démons (Les Mois)" icon={<Calendar className="w-6 h-6"/>} color="emerald">
        <p className="mb-4">Après L'Heure qui décrit la journée, on passe au Calendrier de l'Année pour prévoir la Neige Et les Anniversaires !</p>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/60 mb-6 font-mono text-center space-y-4">
           <div className="flex items-center justify-center gap-4 text-emerald-900 dark:text-emerald-100 font-bold flex-wrap">
             <span className="bg-card px-2 py-1 rounded shadow">1. Janvier</span>
             <span>➡️</span>
             <span className="bg-card px-2 py-1 rounded shadow">2. Février</span>
             <span>➡️</span>
             <span className="bg-card px-2 py-1 rounded shadow text-rose-500">...12. Décembre !!</span>
           </div>
           
           <div className="bg-card/50 p-4 rounded text-sm text-center">
             <h4 className="font-bold mb-2">Les 3 nombres de la Date Ultime</h4>
             <p>Pour écrire ton Anniversaire sur ton cahier, on utilise un code secret à 3 étages: <strong>Jour / Mois / Année</strong>. <br/> Exemple magique : <code>24 / 12 / 2026</code> (Le 24ème jour, du 12eme Mois (Decembre), de l'an 2026 ! Le noêl cosmique !)</p>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Combien de Temps met la GRANDE Aiguille des minutes pour Faire UN Tour complet sur son Cadran Blanc ?</>}
            back={<><strong>60 Minutes !! (Soit 1 HEURE Entière) !</strong><br/>Elle avance doucement, 60 fois, cran par cran. Une fois arrivé au sommet, Bam ! L'aiguille des heures à coté prend +1 Niveau !</>}
          />
          <Flashcard 
            front={<>Quelle Aiguille donne l'HEURE DANS CE CAUCHEMAR ??  (La Grosse lente ?, Ou la Très Fine Très Rapide ?</>}
            back={<><strong>La Petite Lente et Epaisse !!</strong><br/>La Petite c'est le Maitre de la montre, elle avance à son rithme d'escargot : Elle pointe le Capitan des Heures du monde de la Matrix !! (2h, 4h, 8h..)</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est La Petite Sœur de la Minute !! (Celle qui va hyper vite tac-tac-tac et ne s'arrête jamais d'angoisse en fond !) ?",
              options: [
                "L'Horaire.",
                "La Seconde ! Il en faut 60 pour faire une belle Minute !!",
                "Le Millénaire."
              ],
              correctAnswer: 1,
              explanation: "Top ! La trotteuse très fine tic-tic-tic... c'est les Secondes.  1 Heure = 60 minute.  1 Minute = 60 Secondes ! Magie du Chiffre 60."
            },
            {
              question: "Quand maman te dis: 'C'est pret à Midi Et Quart !' . Le QUART, c'est que la Grande Aiguille a avancé de combien de minutes !",
              options: [
                "De 15 Minutes d'Or (Le Quart de la de Pizza 60, tombé tout droit sur le Gros 3 du coté Droit de la Montre !!).",
                "De 40 Minutes.",
                "De 3 Heures."
              ],
              correctAnswer: 0,
              explanation: "Génial ! Exact ! Quart de la pizza ! La Moitié c'était Demi(30). Le quart = 15 MIN !!! (Il est 12h15 !)"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Petite Aiguille = L'Ogre lent des HEURES",
            "Grande Aiguille = Le Gardien Rapide Des MINUTES (De 5 en 5 !!)",
            "1 Heure à la maison = 60 Minutes Entière du monde physique !"
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

export default Course_Primaire_CE1_06_Grandeurs_et_Mesures_Temps;
