import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock 
} from '../components/SharedUI';
import { BarChart3, PieChart, Activity, Calculator, LineChart } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_10_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-10"
        title="Statistiques et Base de Données"
        subtitle="Devenez l'analyste maître de la Data !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Calcul avec des fractions", "La notion de pourcentage"]}
        objectives={[
          "Calculer une Moyenne et une Moyenne Pondérée.",
          "Déterminer la Médiane d'une série statistique (séparer le monde en deux).",
          "Calculer l'Étendue (l'écart extrême des données).",
          "Lire et comprendre des Histogrammes et des Diagrammes Circulaires."
        ]}
      />

      <Section title="🌟 Introduction : Le super-pouvoir de la Data" icon="📊" color="slate">
        <p>
          Si je te donne une liste de 5 000 notes d'élèves, tu ne sauras rien en faire. C'est du bruit. Les Statistiques sont là pour <strong>extraire la vérité</strong> d'une montagne de données brutes, et les résumer en 3 ou 4 nombres magiques (Moyenne, Médiane, Étendue).
        </p>
        <p className="mt-4">
          Amazon, Netflix, TikTok : toutes ces entreprises utilisent exactement ce que tu vas apprendre aujourd'hui pour classer des données, regrouper des joueurs et deviner la tendance !
        </p>
      </Section>

      <Section title="1. La Moyenne (Le centre d'équilibre)" icon="⚖️" color="indigo">
        <p className="mb-4">La moyenne est le concept de <strong>partage équitable parfait</strong>. Si tous les élèves avaient eu exactement la même note tout en gardant le total global de la classe identique, quelle serait cette note ?</p>
        
        <h3 className="font-bold text-lg mb-2">La Moyenne Simple </h3>
        <div className="bg-muted p-4 rounded-xl mb-4 font-mono text-center">
          (Somme des valeurs) ÷ (Effectif total)
        </div>

        <h3 className="font-bold text-lg mb-2 mt-6">La Moyenne Pondérée (avec des "Poids")</h3>
        <p className="text-sm mb-4">Quand les valeurs ont un "Coefficient" (un coefficient 3 veut dire que la note compte 3 fois !), ou un Effectif de répétition.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
           <Calculator className="w-16 h-16 text-indigo-500 hidden md:block" />
           <div>
              <p className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">Exemple des contrôles :</p>
              <table className="w-full text-left border-collapse mb-4">
                <thead>
                  <tr className="border-b border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800">
                    <th className="p-2">Note</th>
                    <th className="p-2 border-l border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800">10</th>
                    <th className="p-2 border-l border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800">15</th>
                    <th className="p-2 border-l border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800">8</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-bold">Coefficient</td>
                    <td className="p-2 border-l border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 font-mono">1</td>
                    <td className="p-2 border-l border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 font-mono text-indigo-600 dark:text-indigo-400">3</td>
                    <td className="p-2 border-l border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 font-mono">2</td>
                  </tr>
                </tbody>
              </table>
              <div className="font-mono bg-card dark:bg-black/40 p-3 rounded-lg text-sm md:text-base border border-indigo-100 dark:border-indigo-900 shadow-inner">
                <><MathComponent math={"M = \\frac{(10 \\times 1) + (15 \\times 3) + (8 \\times 2)}{1 + 3 + 2}"} /></><br/><br/>
                <><MathComponent math={"M = \\frac{10 + 45 + 16}{6} = \\frac{71}{6} \\approx 11,83"} /></>
              </div>
           </div>
        </div>
      </Section>

      <Section title="2. La Médiane (Le juste milieu qui sépare les foules)" icon="⚔️" color="rose">
        <p className="mb-4">Contrairement à la moyenne qui est très influencée par LE Milliardaire dans la pièce, la Médiane est incorruptible. <strong>C'est la frontière exacte où 50% de la population est en-dessous, et 50% au-dessus.</strong></p>

        <InteractiveExercise 
          title="Le Grand Tri Secret !"
          question={<>Trouve la médiane de la série de salaires : <em>2000, 1500, 50000, 1800, 1600</em></>}
          steps={[
            <>🛑 <strong>ERREUR FATALE N°1 :</strong> Ne JAMAIS chercher le milieu tant que rien n'est trié !! Je dois les ranger par ordre croissant !</>,
            <>✅ Tri Croissant : 1500, 1600, 1800, 2000, 50000</>,
            <>🔍 Il y a 5 valeurs (un nombre IMPAIR). Le milieu parfait est la <strong>3ème valeur</strong>.</>,
            <>⚖️ La Médiane est donc <strong>1800</strong>. (Il y a bien 2 salaires plus pauvres, et 2 salaires plus riches autour d'elle).</>
          ]}
        />

        <InfoBlock title="Et si le nombre de valeurs est PAIR ?" type="warning">
           Série triée : 10, 12, <strong>14, 16</strong>, 18, 20. (Il y a 6 valeurs).<br/>
           Le milieu "saute" dans le vide au milieu du gouffre, entre la 3e et la 4e ! <br/>
           On prend donc un couteau parfait et on calcule la Moyenne entre ces deux là : <br/>
           $(14 + 16) \\div 2 = \\mathbf{15}$. La médiane est de 15 !
        </InfoBlock>
      </Section>

      <Section title="3. L'Étendue (Le gouffre entre le Maître et l'Élève)" icon="📏" color="emerald">
        <p className="mb-4">C'est la statistique la plus rapide et la plus agressive : elle mesure la volatilité du marché, ou <strong>l'Écart Absolu</strong>.</p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 py-4 px-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 text-center text-lg shadow-sm border-b-4 border-b-emerald-500 mb-6">
           <strong>ÉTENDUE</strong> = (Valeur la plus Grande) - (Valeur la plus Petite)
        </div>

        <div className="flex gap-4">
           <div className="flex-1 bg-card p-4 rounded-xl border border-border">
             <h4 className="font-bold mb-2">Classe A (Étendue de 2)</h4>
             <p className="text-sm">Notes : 11, 11, 12, 12, 13</p>
             <p className="text-xs text-muted-text mt-2">La classe est un bloc uni, ils ont tous le même niveau.</p>
           </div>
           
           <div className="flex-1 bg-card p-4 rounded-xl border border-border">
             <h4 className="font-bold mb-2">Classe B (Étendue de 18)</h4>
             <p className="text-sm">Notes : 2, 4, 12, 19, 20</p>
             <p className="text-xs text-muted-text mt-2">Le clan des excellents, et une rupture violente. La classe est éclatée.</p>
           </div>
        </div>
        <p className="mt-4 text-sm text-foreground italic text-center">La moyenne de ces deux classes est EXACTEMENT identique (11,8). Mais l'Étendue révèle que l'ambiance n'a rien à voir !</p>
      </Section>

      <Section title="4. Analyser les Graphiques" icon="📈" color="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800">
               <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3 flex items-center gap-2">
                 <BarChart3 className="w-5 h-5"/> L'Histogramme (ou Bâtons)
               </h4>
               <p className="text-sm mb-4 text-foreground">Utilisé pour observer les <strong>Effectifs</strong>. Plus le bâton est haut, plus il y a de monde dans cette catégorie de note.</p>
           </div>
           
           <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-800/60 dark:border-amber-800">
               <h4 className="font-bold text-amber-900 dark:text-amber-100 dark:text-amber-200 mb-3 flex items-center gap-2">
                 <PieChart className="w-5 h-5"/> Le Diagramme Circulaire (Camembert)
               </h4>
               <p className="text-sm mb-4 text-foreground">Représente des <strong>Fréquences</strong> ou des <strong>Pourcentages</strong>. <br/><br/><strong>Astuce absolue :</strong> La bulle entière est à nous = 360° ou 100%. Il suffit de faire un petit Tableau de Proportionnalité avec la croix !</p>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le plus gros piège pour calculer une Médiane ?</>}
            back={<><strong>Oublier de trier !!</strong><br/>Si l'exercice te donne "15, 2, 19", la médiane n'est surtout pas le '2'. Trie d'abord : 2, 15, 19. La médiane est quinze.</>}
          />
          <Flashcard 
            front={<>Dans un "Diagramme semi-circulaire", le total du tourbillon ne ferait pas 360° mais...?</>}
            back={<><strong>180 degrés !</strong><br/>C'est juste un simple Rapporteur (un demi-cercle posé sur un trait plat).</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si mon entreprise distribue les salaires suivants : [Boss = 1,000,000€] et [Les 9 ouvriers = 1000€ chacun]. Mon avocat sort dans la presse : 'Je suis fier, le salaire Moyen chez nous excède les 100,000 Euros !'. L'avocat ment-il mathématiquement ?",
              options: [
                "Oui, l'avocat ment délibérément la loi mathématique.",
                "Non, le calcul de la Moyenne donne bien 100,900€. (Mais c'est ignoble moralement car la MÉDIANE est de 1000€)."
              ],
              correctAnswer: 1,
              explanation: "Top ! La 'Moyenne' est une stat qui peut cacher une monstrueuse injustice si les valeurs extrêmes tirent le chiffre vers le haut ! C'est pour déjouer ce piège qu'on utilise la Médiane pour classer la population : 1000€ d'un bloc !"
            },
            {
              question: "Quelle est l'Étendue de la série des notes : { 5, 8, 8, 12, 15, 20 } ?",
              options: [
                "15 (car 20 - 5 = 15)",
                "25 (car 20 + 5 = 25)",
                "12 (La médiane du centre)",
              ],
              correctAnswer: 0,
              explanation: "Parfait. L'Étendue s'attaque juste au plus riche contre le plus pauvre (Max moins le Min)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Trier mes données avant TOUTE attaque de Médiane.",
            "Pour une Moyenne avec Effectifs : Je dois bien multiplier le Coeff AVANT l'addition du haut !",
            "Je connais la vérité de l'Étendue : Max - Min."
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

export default Course_College_3eme_10_Statistiques;
