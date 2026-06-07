import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Boxes, KeySquare, Blocks, Coins } from 'lucide-react';

const Course_Primaire_CE1_01_Nombres_jusqua_1000: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE1-01"
        title="Les Nombres jusqu'à 1 000"
        subtitle="Construire des Châteaux avec des Unités, Dizaines et Centaines"
        duration="45min"
        level="CE1"
        prerequisites={["Savoir compter jusqu'à 100"]}
        objectives={[
          "Comprendre qu'une Centaine c'est 10 dizaines.",
          "Lire, Écrire et Décomposer les nombres jusqu'à 999.",
          "Comparer des nombres (Plus grand / Plus petit)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Le CE1 marque l'entrée dans les grands nombres avec la découverte de la "Centaine". C'est un cap très important car l'enfant doit conceptualiser que 10 dizaines se transforment en une nouvelle unité de mesure. La manipulation de matériel en base 10 (plaques, barres, cubes) est essentielle.
      </InfoBlock>

      <Section title="1. La Magie des Centaines (Le Gros Cube)" icon={<Boxes className="w-6 h-6"/>} color="blue">
        <p className="mb-4">Au CP, on a appris qu'avec 10 petits cubes d'Unités, on fabriquait 1 Barre de Dizaine.</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 shadow-sm flex flex-col md:flex-row gap-6 items-center my-6">
           <div className="flex-1 text-center">
             <div className="text-4xl mb-2">🧊</div>
             <div className="font-bold text-sky-700">1 Unité (u)</div>
             <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Le tout petit bloc.</p>
           </div>
           
           <div className="text-slate-400 font-bold text-2xl">👉 x10 👉</div>

           <div className="flex-1 text-center">
             <div className="text-4xl mb-2 flex justify-center">
                <div className="h-16 w-3 bg-indigo-500 rounded-sm"></div>
             </div>
             <div className="font-bold text-indigo-700 dark:text-indigo-300">1 Dizaine (d)</div>
             <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">1 Barre = 10 Unités.</p>
           </div>

           <div className="text-slate-400 font-bold text-2xl">👉 x10 👉</div>

           <div className="flex-1 text-center">
             <div className="text-4xl mb-2 flex justify-center">
               <div className="h-16 w-16 bg-emerald-500 rounded border-2 border-emerald-600 shadow-sm"></div>
             </div>
             <div className="font-bold text-emerald-700 dark:text-emerald-300">1 Centaine (c)</div>
             <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">La Plaque Magique !<br/>1 Plaque = 10 Barres = 100 Unités.</p>
           </div>
        </div>
        
        <TipBanner title="Le Secret de la Boîte de 100" type="success">
           Quand tu as 99 billes, et que tu en gagnes UNE de plus... BOUM ! La boîte à Dizaines déborde et se transforme en une Plaque Verte de CENT ! (100). Le nombre s'écrit avec 3 chiffres !
        </TipBanner>
      </Section>

      <Section title="2. Lire et Écrire : Le Tableau Merveilleux" icon={<KeySquare className="w-6 h-6"/>} color="indigo">
        <p className="mb-4">Pour ne jamais se perdre dans les nombres, on utilise un tableau avec 3 colonnes de la droite vers la gauche : <strong>c d u</strong>.</p>

        <div className="overflow-hidden rounded-xl border border-indigo-100 dark:border-indigo-800/60 my-6">
          <table className="w-full text-center">
             <thead>
               <tr className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">
                 <th className="p-4 text-xl">Centaines (c)</th>
                 <th className="p-4 text-xl">Dizaines (d)</th>
                 <th className="p-4 text-xl">Unités (u)</th>
                 <th className="p-4 text-xl bg-muted dark:bg-slate-800">Le Nombre Magique</th>
               </tr>
             </thead>
             <tbody className="bg-card dark:bg-slate-900">
               <tr>
                 <td className="p-4 text-2xl font-bold text-emerald-600 dark:text-emerald-400">2</td>
                 <td className="p-4 text-2xl font-bold text-sky-600">4</td>
                 <td className="p-4 text-2xl font-bold text-rose-600 dark:text-rose-400">5</td>
                 <td className="p-4 text-xl font-bold bg-muted dark:bg-slate-800">Deux-cent-quarante-cinq</td>
               </tr>
               <tr className="border-t border-border-strong dark:border-slate-800">
                 <td className="p-4 text-2xl font-bold text-emerald-600 dark:text-emerald-400">4</td>
                 <td className="p-4 text-2xl font-bold text-sky-600">0</td>
                 <td className="p-4 text-2xl font-bold text-rose-600 dark:text-rose-400">8</td>
                 <td className="p-4 text-xl font-bold bg-muted dark:bg-slate-800">Quatre-cent-huit (Pas de dizaines !)</td>
               </tr>
             </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. La Décomposition (Couper le Gâteau)" icon={<Blocks className="w-6 h-6"/>} color="amber">
        <p className="mb-4">Tout grand nombre peut se couper en morceaux ! C'est ce qu'on appelle la Décomposition.</p>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-5 rounded-2xl border-l-4 border-amber-500 mb-6 font-mono text-center text-xl">
           <span className="text-slate-900 dark:text-slate-100 dark:text-slate-200">324 = </span>
           <strong className="text-emerald-600 dark:text-emerald-400">300</strong> + 
           <strong className="text-sky-600"> 20</strong> + 
           <strong className="text-rose-600 dark:text-rose-400"> 4</strong>
        </div>

        <InteractiveExercise 
          title="Le Jeu de la Décomposition !"
          question={<>Comment écrire le nombre <strong>507</strong> en additionnant ses plaques, ses barres et ses petits cubes ?</>}
          steps={[
            <><strong>1. Je regarde les Centaines :</strong> Le premier chiffre est 5. J'ai 5 Plaques vertes. C'est <strong>500</strong>.</>,
            <><strong>2. Je regarde les Dizaines :</strong> Le chiffre du milieu est 0. Ouh la la ! Pas de barre de dizaine du tout !. C'est 0.</>,
            <><strong>3. Je regarde les Unités :</strong> Le dernier chiffre est 7. J'ai 7 petits cubes. C'est <strong>7</strong>.</>,
            <><strong>Le Résultat Final :</strong> On assemble : <strong>507 = 500 + 7</strong>. Magie !!</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Combien de Dizaines y a t-il dans le nombre <strong>100</strong> ?</>}
            back={<><strong>10 Dizaines !</strong><br/>Si je prends 10 petites barres (10) et que je les colle les unes contre les autres... BOUM, j'ai une grande plaque verte de 100 !</>}
          />
          <Flashcard 
            front={<>Quel est le plus grand ? <strong>459</strong> ou <strong>495</strong> ?</>}
            back={<><strong>C'est 495 !!</strong><br/>On regarde d'abord les Centaines: 4 VS 4 (Egalité !). On regarde ensuite les Dizaines : 5 VS 9... Le 9 gagne ! 495 est le champion.</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quelle est la bonne décomposition du nombre 830 ?",
              options: [
                "800 + 3",
                "800 + 30",
                "80 + 30"
              ],
              correctAnswer: 1,
              explanation: "Super ! Dans 830, le 3 est au milieu (Dizaine) ! Donc c'est 3 barres de 10 = 30 !! (800+30)."
            },
            {
              question: "On a 3 Plaques Centaines, 0 Dizaines et 4 petits Cubes Unités. Quel est le nombre mystère ?",
              options: [
                "34",
                "340",
                "304"
              ],
              correctAnswer: 2,
              explanation: "Génial ! Le Piège !! Si tu oublies le '0' au milieu, la Plaque Centaine rétrécit et devient une dizaine ! Le Zéro est le Super Gardien de la place libre ! 304 !!"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que 10 dizaines = 1 centaine (100).",
            "Je sais que le zéro garde la place quand il n'y a pas de dizaines ou d'unités (ex: 708 ou 240).",
            "Mémorisé: Pour comparer 2 nombres, je regarde le 1er chiffre à gauche en premier (le patron des centaines !)."
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

export default Course_Primaire_CE1_01_Nombres_jusqua_1000;
