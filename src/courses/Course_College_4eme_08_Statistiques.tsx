import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { BarChart, Target, Zap, LayoutList } from 'lucide-react';

const Course_College_4eme_08_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-08"
        title="Statistiques (Moyenne Pondérée)"
        subtitle="Agis comme un data analyst pour l'école"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Calculer une Moyenne simple (5ème)"]}
        objectives={[
          "Comprendre la différence entre Moyenne Numérique et Moyenne PONDÉRÉE.",
          "Calculer la Moyenne Pondérée de tes propres bulletins (L'Épreuve Ultime).",
          "Interpréter un tableau d'effectifs sans se faire piéger.",
          "Calculer les fréquences d'apparition (Pourcentages cachés)."
        ]}
      />

      <Section title="🌟 Introduction : Le poids des choses" icon="⚖️" color="slate">
        <p>
          Si tu as un 18/20 en Arts Plastiques (qui dure 1h) et un 4/20 au Brevet Blanc de Mathématiques (qui vaut la moitié du trimestre), est-ce que ta Moyenne est juste (18+4)/2 = 11/20 ? Non !
        </p>
        <p className="mt-4">
          Le monde réel utilise des "Coefficients" (des Poids). Le 4 en Maths pèse beaucoup plus lourd en gravité dans l'univers de l'école que le 18 en Art. Tu dois le 'Cloner' autant de fois que vaut son coefficient. C'est l'essence de la <strong>Moyenne Pondérée</strong>.
        </p>
      </Section>

      <Section title="1. La Moyenne Pondérée (Le Bulletin)" icon="📉" color="indigo">

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-lg">Le Casier Judiciaire du Trimestre :</h3>
           <div className="bg-card dark:bg-black/30 p-2 rounded shadow border border-indigo-100 dark:border-indigo-800/60 font-mono text-center mb-6">
             <table className="border-collapse mx-auto min-w-[300px]">
               <thead>
                 <tr>
                   <th className="border p-2">Matière</th>
                   <th className="border p-2">SVT</th>
                   <th className="border p-2">Maths</th>
                   <th className="border p-2">EPS</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td className="border p-2 font-bold">Notes (Valeur)</td>
                   <td className="border p-2">12</td>
                   <td className="border p-2 text-rose-500">5</td>
                   <td className="border p-2 text-emerald-500">18</td>
                 </tr>
                 <tr>
                   <td className="border p-2 font-bold bg-muted">Coef (Effectif)</td>
                   <td className="border p-2 bg-muted text-sky-600 font-bold">2</td>
                   <td className="border p-2 bg-muted text-sky-600 font-bold">4</td>
                   <td className="border p-2 bg-muted text-sky-600 font-bold">1</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <p className="font-bold text-muted-text w-full text-left mb-2">Les 2 Étapes de Survie :</p>
           
           <div className="space-y-4 w-full">
              <div className="bg-card p-4 rounded shadow-sm border-l-4 border-emerald-500">
                <span className="font-bold">Étape 1 : Le Grand Choc (Le Haut de la fraction)</span>
                <p className="text-sm mt-1">Multiplie chaque Note par son Poids pour créer l'Argent Global :</p>
                <div className="font-mono mt-2 bg-muted p-2 rounded text-center">
                  (12 &times; 2) &nbsp;&nbsp; + &nbsp;&nbsp; (5 &times; 4) &nbsp;&nbsp; + &nbsp;&nbsp; (18 &times; 1)<br/>
                  24 + 20 + 18 = <strong className="text-rose-500 text-lg">62</strong>
                </div>
              </div>

              <div className="bg-card p-4 rounded shadow-sm border-l-4 border-sky-500">
                <span className="font-bold">Étape 2 : Diviser par les Poids (La Chute fatale !)</span>
                <p className="text-sm mt-1">On ne divise <strong>Surtout Pas</strong> par le nombre de matières (3). On divise par le SOMME GLOBALE des Coefficients de la classe (La somme du Sol) !</p>
                <div className="font-mono mt-2 bg-muted p-2 rounded text-center">
                  (Coef SVT: 2) + (Coef Math: 4) + (Coef EPS: 1) = <strong className="text-sky-600 text-lg">7</strong>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded text-center text-white shadow-lg">
                <span className="font-bold text-lg">Bilan &rarr; La Moyenne = 62 &divide; 7 = <strong>8,8 / 20</strong></span><br/>
                <span className="text-xs italic">(L'illusion du 18 n'a pas résisté à la gravité du coef 4 des maths...)</span>
              </div>
           </div>
        </div>
      </Section>

      <Section title="2. Tableaux avec Classes (Le mystère du Centre)" icon="🏢" color="amber">
        <p className="mb-4">Si le prof a relevé les tailles de 1000 élèves du bahut, il ne va pas écrire 1000 nombres dans un tableau. Il va créer des groupes (des 'Classes'). Exemple : élèves mesurant entre [1m50 ; 1m60[.</p>

        <TipBanner title="Le Point Pivot" type="info">
           Quand on te demande la Moyenne d'un groupe comme `[150 ; 160[`, quel nombre choisir pour le multiplier au poids ?<br/>
           Tu dois <strong>TOUJOURS</strong> calculer le point du MILIEU parfait (Le Centre de Classe) :<br/>
           (150 + 160) &divide; 2 = <strong>155 cm</strong>. C'est ce '155' qui va être utilisé dans ton calcul de Moyenne globale !
        </TipBanner>

      </Section>

      <Section title="3. La Fréquence (L'Échelle des Pourcentages)" icon="PieChart" color="emerald">
        <p className="mb-4">L'Effectif c'est le nombre de personnes ayant voté X. La Fréquence c'est le poid relatif dans l'univers global. C'est toujours bloqué entre 0 et 1 (Ou 0 et 100%).</p>

        <InteractiveExercise 
          title="La Fabrication d'un Pourcentage"
          question={<>Sur une île de 400 habitants (Effectif Total), 80 ont voté Vert. Quelle est leur Fréquence en % ?</>}
          steps={[
            <><strong>La Formule Brutale :</strong> Fréquence = (Mon Bout de Gâteau) &divide; (Le Gâteau Entier)</>,
            <><strong>On applique :</strong> F = 80 &divide; 400</>,
            <><strong>La calculette sort une décimale :</strong> 0,2.</>,
            <><strong>Passage en Pourcentages :</strong> Le symbole "%" veut litéralement dire "... sur 100". On mutliplie la décimale fraîche par 100 !<br/>0,2 &times; 100 = <strong>20 %.</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le prof met `[10 ; 15[` sur une case du tableau. Un élève a eu exactement 15/20. Est-ce qu'on le range dans cette case ?</>}
            back={<><strong>NON !! Le crochet fuit !</strong><br/>Le crochet ouvrant vers l'extérieur `[` repousse le nombre. L'élève de 15 ira dans la case voisine d'à coté `[15 ; 20[` dont le crochet l'embrasse chaleureusement vers l'intérieur.</>}
          />
          <Flashcard 
            front={<>J'ai trouvé une fréquence totale en additionnant la ligne de mon tableau, et je trouve 1,02. C'est bon ?</>}
            back={<><strong>Absolument Impossible !!</strong><br/>L'univers est parfait ! La somme de toutes les fréquences décimales doit valoir EXACTEMENT <strong>1</strong>. (Et la somme en Pourcentage doit valoir 100%). Recompte tes arrondis.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Au Brevet, ils écrivent 'Effectif' ou 'Coefficient' ?",
              answer: "Effectif ! L'Effectif d'une note, c'est le nombre d'élèves l'ayant obtenu. Si y'a écrit Note:12 et Effectif:3. Ça marche EXACTEMENT comme des Coefficients ! Tu fais (12 × 3)..."
            },
            {
              question: "Si y'a pas de coefs dans mon bulletin pour trouver ma moyenne ?",
              answer: "C'est que c'est une Moyenne Simple de Cinquième ! L'Effectif de chaque Note vaut 1, le monde est beau et égalitaire. Tu additionne tes Notes et tu Divises par le Nb de Matières."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "J'ai eu un 14 (Coef 2) et un 6 (Coef 3). Quelle est ma Moyenne ?",
              options: [
                "(14 + 6) / 2 = 10",
                "((14×2) + (6×3)) / 5 = 9,2",
                "((14×2) + (6×3)) / 2 = 23"
              ],
              correctAnswer: 1,
              explanation: "Top de Top ! Tu n'es pas tombé dans le piège ! Le total des points amassés en haut est de 46. Mais la SOMME DES COEFS vaut 5 ! Donc 46 / 5 = 9,2."
            },
            {
              question: "Le groupe de poids des boxeurs `[60 ; 70[` compte 10 boxeurs. Quel poids fictif je vais donner à la machine pour calculer la moyenne du club ?",
              options: [
                "60",
                "65",
                "70"
              ],
              correctAnswer: 1,
              explanation: "Magnifique ! 65 c'est la Milieu parfait de la Balance entre 60kg et 70kg ((60+70)/2). C'est le clone absolu de ce groupe pour la calculatrice !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Moyenne Pondérée = La Grosse Addition du Haut &divide; L'Addition simple des Coefs en Bas.",
            "Somme Totale des Fréquence Décimale = Toujours 1 (L'Unité !)",
            "Milieu de classe : `(Début + Fin) / 2`"
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

export default Course_College_4eme_08_Statistiques;
