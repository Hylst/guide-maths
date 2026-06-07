import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Ruler, Coins, AlignLeft, Divide } from 'lucide-react';

const Course_College_6eme_01_Nombres_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-01"
        title="Nombres Entiers et Décimaux"
        subtitle="L'art de l'Infiniment Petit et de la Virgule Magique"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Maîtriser les grands nombres entiers de l'école primaire", "Connaître le fonctionnement de l'argent et des centimes"]}
        objectives={[
          "Comprendre le Tableau de Numération (Classes des Milliards aux Millièmes).",
          "Placer correctement la virgule.",
          "Comparer et ranger des nombres décimaux.",
          "Passer de l'écriture en fraction décimale à l'écriture à virgule."
        ]}
      />

      <Section title="🌟 Introduction : Pourquoi couper les nombres ?" icon="🔪" color="slate">
        <p>
          En Primaire, tu as découvert un univers fait de gros blocs incassables : 1, 2, 3... les <strong>Nombres Entiers</strong>. 
          Mais très vite, dans la vraie vie, tu ne peux pas payer exactement "2 euros" pour une baguette à "1 euro et 20 centimes".
        </p>
        <p className="mt-4">
          C'est là qu'interviennent les <strong>Nombres Décimaux</strong>. La virgule est un microscope magique : elle ouvre un tout nouvel univers de nombres <em>entre</em> "1" et "2". L'infiniment petit !
        </p>
      </Section>

      <Section title="1. Le Tableau de Numération (Entier vs Décimal)" icon="📊" color="indigo">
        <p className="mb-4">Tout nombre est une association de "boîtes". Un nombre décimal est séparé exactement en deux mondes par une frontière infranchissable : <strong>La Virgule</strong>.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm overflow-x-auto my-6">
           <table className="w-full text-center border-collapse font-mono min-w-[600px]">
             <thead>
               <tr>
                 <th colSpan={3} className="border-b-2 border-r-4 border-indigo-800 p-2 text-indigo-700 dark:text-indigo-300">Partie ENTIÈRE<br/><span className="text-xs font-normal">(Le monde des Grands)</span></th>
                 <th className="p-2 border-b-2 font-black text-rose-500 text-2xl">,</th>
                 <th colSpan={3} className="border-b-2 border-indigo-800 p-2 text-emerald-700 dark:text-emerald-300">Partie DÉCIMALE<br/><span className="text-xs font-normal">(L'Infiniment Petit)</span></th>
               </tr>
               <tr className="text-sm">
                 <th className="border p-2">Centaines</th>
                 <th className="border p-2">Dizaines</th>
                 <th className="border-r-4 border-indigo-800 p-2">Unités</th>
                 <th className="p-2 font-black text-rose-500 text-lg"></th>
                 <th className="border p-2">Dixièmes (1/10)</th>
                 <th className="border p-2">Centièmes (1/100)</th>
                 <th className="border p-2">Millièmes (1/1000)</th>
               </tr>
             </thead>
             <tbody className="bg-card dark:bg-black/30 text-lg font-bold">
               <tr>
                 <td className="border p-3 text-slate-400"></td>
                 <td className="border p-3 text-indigo-600 dark:text-indigo-400">4</td>
                 <td className="border-r-4 border-indigo-800 p-3 text-indigo-600 dark:text-indigo-400">2</td>
                 <td className="p-3 text-rose-500 text-2xl font-black">,</td>
                 <td className="border p-3 text-emerald-600 dark:text-emerald-400">5</td>
                 <td className="border p-3 text-emerald-600 dark:text-emerald-400">0</td>
                 <td className="border p-3 text-emerald-600 dark:text-emerald-400">8</td>
               </tr>
             </tbody>
           </table>
           <p className="text-center font-bold mt-4">Nombre de l'exemple : 42,508. (Quarante-deux unités ET cinq-cent-huit millièmes)</p>
        </div>
      </Section>

      <Section title="2. Comparer : Le Piège de la Longueur" icon="⚖️" color="blue">
        <p className="mb-4">Le cerveau humain compare naturellement la longueur des mots. Mais en décimal, le nombre "le plus long" N'EST PAS forcément le plus grand !</p>

        <TipBanner title="Le Zéro Fantôme Inutile" type="warning">
           Le zéro mis TOUT À LA FIN de la partie décimale ne sert à rien ! C'est un zéro de confort.<br/>
           <strong>12,4 = 12,40 = 12,4000 !</strong><br/>
           Pour comparer <code>12,4</code> et <code>12,385</code>, ton cerveau bug car "385" a l'air plus grand que "4".<br/>
           <strong>La Ruse Suprême :</strong> Ajoute des zéros ! Transforme 12,4 en <strong>12,400</strong>. <br/>Maintenant compare : <code>12,400</code> vs <code>12,385</code>.  400 bat 385 !
        </TipBanner>
      </Section>

      <Section title="3. Les Fractions Décimales" icon="🍰" color="amber">
        <p className="mb-4">Une fraction décimale, c'est facile ! C'est une fraction dont le 'Bas' (Dénominateur) est 10, 100, ou 1000. Le nombre de "Zéros" en bas commande le nombre de chiffres derrière la virgule !</p>

        <InteractiveExercise 
          title="Le Glissement de Virgule"
          question={<>Convertis la fraction : <strong>345 / 100</strong> en nombre décimal virgule.</>}
          steps={[
            <><strong>1. Je compte les zéros au sous-sol :</strong> Le "100" possède <strong>2 zéros</strong>.</>,
            <><strong>2. J'écris le nombre du haut pur :</strong> J'écris "345" sur mon papier.</>,
            <><strong>3. La virgule glisse vers la GAUCHE :</strong> Puisqu'il y a 2 zéros, la virgule doit laisser exactement DEUX chiffres derrière elle (à sa droite) pour les punir en décimal.</>,
            <><strong>4. Fin :</strong> La virgule tombe entre le 3 et le 4. <strong>Réponse : 3,45.</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Lequel est le plus grand ? <strong>5,9</strong> ou <strong>5,12</strong> ?</>}
            back={<><strong>5,9 !</strong><br/>Ajoute le zéro invisible : 5,9 devient 5,90. Et 90 bat 12. Ne te fais plus jamais avoir par la longueur visuelle.</>}
          />
          <Flashcard 
            front={<>Le nombre entier "25" a-t-il une Virgule cachée ?</>}
            back={<><strong>Oui ! TOUJOURS.</strong><br/>Elle attend juste derrière son dos, invisible. "25" s'écrit formellement "25,0" (ou 25,000).</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "A quoi sert le chiffre des DIXIÈMES ?",
              answer: "Le dixième (le premier chiffre juste après la virgule) représente les pièces de 10 centimes de notre Euro ! C'est la coupure en 10 du gâteau entier 'Unité'."
            },
            {
              question: "Peut-on supprimer un 0 au MILIEU de la partie décimale (Ex: 14,05) ?",
              answer: "JAMAIS ! Seuls les zéros placés de manière totalement libre à l'EXTRÊME DROITE (comme 14,50) ou EXTRÊME GAUCHE (comme 014,5) sont inutiles et effaçables. Le zéro de 14,05 agit comme un mur protecteur pour tenir le '5' dans la case des Centièmes !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est le nombre décimal correspondant à '42 / 1000' ?",
              options: [
                "42,1000",
                "0,42",
                "0,042"
              ],
              correctAnswer: 2,
              explanation: "Top ! Il y a 3 zéros dans '1000'. Donc on doit FORCER le nombre à avoir 3 chiffres derrière la virgule. On ajoute des murs de zéros : 0,042 (Millième, Centième, Dixième)."
            },
            {
              question: "Dans le nombre 3 594,21. Quel est le chiffre de la CENTAINE ? (Pas sa valeur, juste le chiffre)",
              options: [
                "Le 5",
                "Le 2",
                "Le 9"
              ],
              correctAnswer: 0,
              explanation: "Parfait ! 'Centaine' c'est le 3ème pilier Entier (À gauche de la virgule : Unités, Dizaines, Centaines). Donc le 5 ! (Le 2 est le chiffre des 'Dixièmes', ne confonds plus !)"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Pour comparer deux nombres, j'ajoute TOUJOURS des zéros pour qu'ils aient la même longueur décimale.",
            "Division par 10/100/1000 &rarr; La virgule recule vers la Gauche (le nombre rapetisse).",
            "Multiplication par 10/100/1000 &rarr; La virgule avance vers la Droite (le nombre grandit)."
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

export default Course_College_6eme_01_Nombres_Decimaux;
