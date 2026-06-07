import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { XSquare, ArrowUpRight, ShieldAlert, AlignVerticalSpaceAround } from 'lucide-react';

const Course_Primaire_CE2_03_Multiplication_posee: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE2-03"
        title="La Multiplication posée"
        subtitle="Dompter le Tableau Magique des Retenues Volantes"
        duration="45min"
        level="CE2"
        prerequisites={["L'Addition posée", "Les tables de multiplication (jusqu'à 9)"]}
        objectives={[
          "Comprendre le fonctionnement d'une multiplication en colonnes.",
          "Gérer les retenues qui se multiplient SUR LE COTÉ.",
          "Multiplier avec un multiplicateur à UN SEUL chiffre."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La multiplication posée en colonnes requiert de la gymnastique mentale : l'enfant doit à la fois multiplier des chiffres et additionner des retenues au bon moment. L'astuce majeure du CE2 consiste à noter la retenue sur le côté (et non en haut) pour éviter de l'additionner avant d'avoir multiplié. Veillez à ce que les tables de 2 à 9 soient bien mémorisées ou accessibles sur un mémo de table de Pythagore.
      </InfoBlock>

      <Section title="1. L'Alignement et l'Attaque par le Bas" icon={<AlignVerticalSpaceAround className="w-6 h-6" />} color="indigo">
        <p className="mb-4">Contrairement à l'addition où c'est juste un mur de briques à empiler, la multiplication posée ressemble à une Attaque d'Avion : Le chiffre du Bas va Tirer sur tous les chiffres du haut !</p>
        
        <TipBanner title="Le Boss du Bas" type="info">
           On pose <strong>le grand nombre EN HAUT</strong> (ex: 234) et <strong>le petit nombre EN BAS</strong> (ex: 3).<br/>
           Le nombre du bas (le 3) va attaquer chaque chiffre du haut, de la DROITE vers la GAUCHE. (Unités, puis Dizaines, puis Centaines !).
        </TipBanner>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 mt-6 shadow-sm text-center">
          <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-4">Le Schéma de l'Attaque (24 x 2)</h4>
          <div className="font-mono text-2xl tracking-[0.5em] text-right inline-block border-r-4 border-indigo-300 pr-4 relative">
             <div className="absolute top-1/2 left-[-40px] text-red-500 text-lg">🔫</div>
             <div>24</div>
             <div>x&nbsp;2</div>
             <div className="border-t border-slate-400">---</div>
             <div className="text-emerald-600 dark:text-emerald-400 font-bold">48</div>
          </div>
          <p className="text-sm mt-4 text-slate-700 dark:text-slate-300">
            <strong>Tir 1 :</strong> Le 2 du bas vise le 4 en haut à droite. (2 x 4 = 8). J'écris 8 !<br/>
            <strong>Tir 2 :</strong> Le 2 du bas vise le 2 en haut à gauche. (2 x 2 = 4). J'écris 4 !
          </p>
        </div>
      </Section>

      <Section title="2. Les Retenues Volantes (Le Cauchemar National)" icon={<ArrowUpRight className="w-6 h-6" />} color="rose">
        <p className="mb-4">Que se passe-t-il si un Tir dépasse le résultat de 9 ? (ex: 3 x 4 = 12). La boite explose, et une Retenue nait ! Mais ATTENTION ! En multiplication, la retenue Ne Vole Pas en Haut !!</p>

        <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border-l-4 border-red-500 mb-6 relative">
           <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2"><ShieldAlert size={20}/> La Zone Interdite</h4>
           <p className="font-bold">INTERDIT de poser la retenue de la multiplication en haut de la colonne Suivante !!</p>
           <p className="text-sm mt-1">Si tu fais ca, ton cerveau va la Multiplier par erreur lors du 2éme Tir !! Les retenues de multiplications se mettent <strong>SUR LE COTÉ GAUCHE, HORS DE LA ZONE DE COMBAT !</strong>.</p>
        </div>

        <InteractiveExercise 
          title="Le Calcul de 47 x 3 (Zone Rouge)"
          question={<>Comment faire le Combat sans se tromper de retenue ?</>}
          steps={[
            <><strong>1. Tir Unités :</strong> Le 3 d'en bas tir sur le 7 d'en haut. <strong>3 x 7 = 21 !</strong>. Explosion !</>,
            <><strong>2. La Retenue Sécurisée :</strong> Je pose le '1' en bas sous les unités... MAIS le '2' (les dizaines), je l'écris Tout Seul <strong>A Gauche du Calcul en gros ! (+2)</strong>.</>,
            <><strong>3. Tir Dizaine :</strong> Le 3 en bas vise ensuite le 4 en haut. <strong>3 x 4 = 12 !</strong>.</>,
            <><strong>4. L'Absorption de la retenue :</strong> Maintenant j'ai 12. Mon oeil regarde ma reserve a Gauche. Ah ! Un '+2'. Je fais <strong>12 + 2 = 14 !</strong>.</>,
            <><strong>5. La Victoire :</strong> J'écris 14 en Bar. Le résultat est 141 !! Magie ! Et je PBARRE ma retenue pour dire quelle est morte.</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans 58 x 2... Le Premier tir de "2 x 8" fait '16'. Que fais tu du 1 de la dizaine ?</>}
            back={<><strong>Je le stock à Gauche en dehors du calcul ! (Reserve)</strong><br/>Si je le place au dessus du '5', je me ferais Avoire lors du "2 x 5" !! On stock les retenues de Multiplication a Part !</>}
          />
          <Flashcard 
            front={<>Pendant le calcul : J'ai fait mon gros TIR de multiplication (ex 4x5=20). Comment j'utilise la Retenue que j'avais mise de coté (+3 par ex) ? Je la multiplie ??</>}
            back={<><strong>Alerte FAUX !!</strong><br/>La retenue mise de coté est une ADDITION ! Une fois le gros calcul fait (4x5=20), Tu RAJOUTES ta retenue (20 + 3 = 23 !). Jamais tu ne la multiplie !!</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quel nombre je dois poser en HAUT de la colonne pour Multiplier?",
              options: [
                "N'importe Lequel c'est l'anarchie.",
                "Le Super Nombre Le Plus Long (Le plus grand).",
                "Le plus Petit."
              ],
              correctAnswer: 1,
              explanation: "Top ! Tu poses le Mastodonte en Haut (ex 429), et le petit Soldat En Bas(x3). Le soldat tir en haut de droite a gauche facilement. L'inverse serait impossible a dessiner dans son cahier !"
            },
            {
              question: "L'arme absolu pour eviter les erreurs de retenues ?",
              options: [
                "Ne pas en faire.",
                "Croiser les doigts très fort.",
                "Ecrire la retenue Loin à Gauche, et LA BARRER d'un coup de Crayon quand on l'a ADDITIONNÉE ! L'effacer de l'histoire !"
              ],
              correctAnswer: 2,
              explanation: "Oui ! Barrer la retenue c'est le Geste Supême des CM1 qui ne se trompent jamais ! Ca l'empeche d'être re-comptée par megarde 2 minutes apres !"
            }
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

export default Course_Primaire_CE2_03_Multiplication_posee;
