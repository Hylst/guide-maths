import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Ruler, Car, Scale, Clock } from 'lucide-react';

const Course_College_4eme_07_Proportionnalite: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-07"
        title="Proportionnalité et Vitesses"
        subtitle="Voyage dans le Temps et l'Espace avec le Produit en Croix !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Tableaux de proportionnalité de 5ème", "Les bases des fractions"]}
        objectives={[
          "Mémoriser l'arme absolue : Le Produit en Croix.",
          "Convertir le temps (Alerte rouge : 1h30 ≠ 1,30 h).",
          "Calculer une Vitesse Moyenne, une Distance ou un Temps (v = d/t).",
          "Représenter une proportionnalité par un Graphique (La Droite)."
        ]}
      />

      <Section title="🌟 Introduction : Tout est lié" icon="🔗" color="slate">
        <p>
          La proportionnalité est le cœur de la vraie vie. Si 2 baguettes coûtent 2€, alors 4 baguettes coûtent 4€. C'est ça la proportionnalité : les deux grandeurs (Quantité et Prix) grandissent ou rétrécissent <strong>exactement à la même vitesse de multiplication</strong>.
        </p>
      </Section>

      <Section title="1. L'Arme Absolue : Le Produit en Croix" icon="⚔️" color="indigo">
        <p className="mb-4">Tu n'as plus besoin de chercher le multiplicateur commun ! Le "Produit en Croix" est un algorithme inratable pour trouver n'importe quelle case manquante dans un tableau.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm my-6">
           <h3 className="font-bold text-center mb-4 text-lg text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Tableau Magique : Le Prix des Pommes</h3>
           <div className="flex justify-center mb-4 font-mono text-xl">
             <table className="bg-card dark:bg-black/30 border-collapse rounded overflow-hidden shadow">
               <tbody>
                 <tr>
                   <td className="border p-3">kg</td>
                   <td className="border p-3 text-emerald-600 dark:text-emerald-400 font-bold">5</td>
                   <td className="border p-3 text-indigo-600 dark:text-indigo-400 font-bold">12</td>
                 </tr>
                 <tr>
                   <td className="border p-3">Prix (€)</td>
                   <td className="border p-3 text-indigo-600 dark:text-indigo-400 font-bold">15</td>
                   <td className="border p-3 text-rose-500 font-bold">?</td>
                 </tr>
               </tbody>
             </table>
           </div>
           
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl">
             <p className="font-bold mb-2">Les 2 Étapes Fatales :</p>
             <ul className="space-y-2">
               <li><span className="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded text-sm mr-2">1. Multiplication Croisée</span> On multiplie toujours la 'Diagonale Pleine' (les deux nombres qui sont face à face en biais). <strong>12 &times; 15 = 180</strong>.</li>
               <li><span className="bg-rose-200 dark:bg-rose-800 px-2 py-1 rounded text-sm mr-2">2. Division Foudroyante</span> On divise le résultat par le 'Solitaire' (le nombre qui reste, en face du Point d'Interrogation). <strong>180 &divide; 5 = 36</strong>.</li>
             </ul>
             <p className="text-center font-bold text-rose-600 dark:text-rose-400 mt-4 text-lg">Leur prix est de 36€ !</p>
           </div>
        </div>
      </Section>

      <Section title="2. Le Piège Mondial de la Conversion de Temps" icon="⏳" color="amber">
        <p className="mb-4">Le Brevet se nourrit de cette erreur : Penser que nos minutes sont une échelle de 100.</p>
        
        <TipBanner title="Règle d'or absolue" type="warning">
           1h30 <strong>N'EST PAS ÉGAL</strong> à 1,30 heures ! <br/>
           L'heure est en Base 60 ! 30 minutes, c'est la MOITIÉ d'une heure. Donc 1h30 = <strong>1,5 heures</strong> !
        </TipBanner>

        <div className="bg-card border-x-4 border-amber-500 p-4 rounded shadow mt-4">
           <h3 className="font-bold mb-2">Comment convertir proprement une durée en Décimal :</h3>
           <p className="text-sm text-muted-text mb-2">Tu dois diviser tes minutes (seules) par 60 !</p>
           <ul className="list-disc pl-5 font-mono text-sm space-y-1 mb-2">
             <li>15 minutes &rarr; 15 &divide; 60 = 0,25 h (Un quart d'heure)</li>
             <li>45 minutes &rarr; 45 &divide; 60 = 0,75 h (Trois quarts)</li>
             <li>12 minutes &rarr; 12 &divide; 60 = 0,2 h</li>
           </ul>
           <p className="font-bold text-amber-600 dark:text-amber-400 mt-4">Exemple : 2h15 min = 2,25 heures (et PAS 2,15!)</p>
        </div>
      </Section>

      <Section title="3. Vitesses : Le Triangle Magique v = d / t" icon="🚗" color="blue">
        <p className="mb-4">Il y a 3 lettres : <strong>V</strong>itesse (km/h), <strong>D</strong>istance (km), <strong>T</strong>emps (heures). Si tu en connais 2, tu peux trouver la 3ème avec le Triangle Magique.</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-sky-50 dark:bg-sky-900/20 py-8 rounded-[2rem] border border-sky-200 dark:border-sky-800 my-6 shadow-sm">
           <div className="w-32 h-32 relative text-center flex flex-col items-center">
             <svg viewBox="0 0 100 100" className="absolute object-contain">
               <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-500" />
               <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" strokeWidth="2" className="text-sky-500" />
               <line x1="50" y1="65" x2="50" y2="90" stroke="currentColor" strokeWidth="2" className="text-sky-500" />
             </svg>
             <div className="absolute top-[25px] font-black text-2xl text-rose-500">D</div>
             <div className="absolute top-[68px] left-[32px] font-black text-xl text-indigo-500">V</div>
             <div className="absolute top-[68px] right-[32px] font-black text-xl text-emerald-500">T</div>
           </div>
           
           <div className="space-y-4 font-mono bg-card dark:bg-black/40 p-4 rounded-xl">
             <p className="text-sm"><strong className="text-indigo-600 dark:text-indigo-400">V</strong> = D <span className="opacity-50">/</span> T (D en haut divise T en bas)</p>
             <p className="text-sm"><strong className="text-emerald-600 dark:text-emerald-400">T</strong> = D <span className="opacity-50">/</span> V (D en haut divise V en bas)</p>
             <p className="text-sm"><strong className="text-rose-600 dark:text-rose-400">D</strong> = V &times; T (V et T sont au même niveau, ils se multiplient !)</p>
           </div>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Le Chrono du Marathon"
          question={<p>Un marathonien court exactement à une vitesse constante de 12 km/h. La course fait 42 km. Combien de temps (en heures décimales) mettra-t-il pour finir ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le Triangle Magique</p>
              <p>On cherche le Temps (T). D'après le triangle magique, T = D / V.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le Calcul</p>
              <p>On remplace : Distance D = 42, Vitesse V = 12. Donc T = 42 / 12.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : T = 3,5 ! Il mettra donc 3 heures et demie (soit 3h30).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="4. Représentation Graphique" icon="📈" color="emerald">
        <p className="mb-4">Au brevet, la phrase magique qui vaut 2 points "Cadeau" :</p>
        
        <InfoBlock title="Le Sceau de Validation" type="info">
           "La courbe est une <strong>Ligne Droite</strong> ET elle passe par <strong>l'Origine du repère (0,0)</strong>, DONC c'est une situation de proportionnalité."
        </InfoBlock>
        
        <p className="mt-4 text-sm mt-4">Si c'est une ligne courbée, ou si c'est une ligne droite qui démarre à (0, 10)... Ce n'est PAS proportionnel ! L'Essence de la Proportionnalité, c'est que Zéro Baguette coûte Zéro Euro ! Passsage par (0,0) obligatoire !</p>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le cycliste a roulé de 14h20 à 16h40. Combien de temps s'est écoulé en Décimal ?</>}
            back={<>1. On calcule durée : 16h40 - 14h20 = 2h20.<br/>2. Je convertis les 20 min en heures : 20 &divide; 60 = 0,33 h.<br/>3. Le temps est <strong>2,33 heures</strong> ! (Utilise 2,33 dans tes formules de Vitesse !)</>}
          />
          <Flashcard 
            front={<>Comment passer de km/h (Vitesse Voiture) à m/s (Vitesse Vent/Son) ?</>}
            back={<><strong>Le pont magique "3,6" !</strong><br/>- De km/h vers m/s &rarr; On Divise par 3,6 !<br/>- De m/s vers km/h &rarr; On Multiplie par 3,6 !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'utilise le Produit en croix, j'ai quand même tous les points ?",
              answer: "Oui, c'est l'outil universel accépté. Pense juste à écrire l'opération sur ta copie (Exemple: 'On calcule 12×15 / 5 = ...'). Ne met pas juste la réponse brute."
            },
            {
              question: "Si j'ai v=120, d=300, et je cherche 't' et que ça me donne 2,5. C'est 2h05 ou 2h50 ?",
              answer: "La calculette te ressort du système DECIMAL. 2,5 signifie '2 Heures ET DEMIE'. Donc c'est 2 Heures et 30 Minutes. (Pour convertir le \",5\" décimal en minutes du monde réel : On fait 0,5 × 60 = 30) !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Je roule à 80 km/h. Je dois parcourir 200 km. Combien de temps va durer le voyage ?",
              options: [
                "2h20",
                "2,5 heures (Donc 2h30)",
                "200 × 80 = 16 000 h"
              ],
              correctAnswer: 1,
              explanation: "Top ! J'utilise le triangle magique : T = D / V. Donc T = 200 / 80 = 2,5. Le 2,5 décimal représente 2 heures pleines, et '0,5' c'est une Demi-heure. Donc 2 heures et 30 minutes !"
            },
            {
              question: "Je veux acheter 8 stylos. 3 stylos coûtent 4,50 €. Quel produit en croix est le bon ?",
              options: [
                "(8 × 4,50) ÷ 3",
                "(3 × 8) ÷ 4,50",
                "(4,50 ÷ 8) × 3"
              ],
              correctAnswer: 0,
              explanation: "Excellent ! Si je fais un tableau mental : (Stylos: 3 -> 8. Prix: 4,50 -> ?). La diagonale pleine relie le 8 et le prix du haut 4,50 ! On les multiplie (8×4,50) = 36. Et on divise le tout par le solitaire restant (3). 36÷3=12€. Les 8 stylos font 12€ !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je ne ferai JAMAIS d'opération avec '1h30' = 1,30 sur ma calculette. JAMAIS !",
            "Je vérifie si le résultat 'Vitesse' n'a pas une erreur d'échelle (Trouver 4000 km/h pour un vélo...).",
            "La constante de Proportionnalité c'est juste 'Le Résultat Final' / 'La Case du Haut'."
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

export default Course_College_4eme_07_Proportionnalite;
