import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, FormulaBox 
} from '../components/SharedUI';

const Course_5eme_04_Proportionnalite_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PROP"
        title="Proportionnalité et Statistiques"
        subtitle="Dompter le Tableau Magique et manier les masses de données."
        duration="45 min"
      />

      <Section title="⚖️ La Loi de l'Équilibre" icon="🍏" color="emerald">
        <p>
          Si 3 pommes coûtent 6 euros... combien coûteront 10 pommes ?
        </p>
        <p className="mt-2">
          La réponse ne s'invente pas ! Elle est strictement dictée par <strong>l'équilibre de la Proportion</strong>. Dans le monde des mathématiques, des grandeurs (comme la quantité et le prix) sont <em>proportionnelles</em> si l'une évolue exactement à la même vitesse que l'autre grâce à un multiplicateur.
        </p>
        
        <InfoBlock type="warning" title="La Condition d'une Proportion">
          Toutes les relations de la vie réelle ne sont pas proportionnelles ! Par exemple, ton âge et ta taille ne le sont pas (tu ne feras pas 3 mètres à 40 ans si tu faisais 1m50 à 20 ans). Le <strong>Produit en Croix</strong> ne fonctionne QUE pour des grandeurs strictement proportionnelles !
        </InfoBlock>
      </Section>

      <Section title="❌ Le Produit en Croix (L'Arme Absolue)" icon="⚔️" color="rose">
        <p>
          Quand il te manque UNE seule valeur dans un tableau de proportionnalité (3 cases remplies, 1 vide), le <strong>Produit en Croix</strong> trouve la case vide en un instant.
        </p>

        <div className="bg-muted border-2 border-border p-8 rounded-2xl my-6 flex flex-col md:flex-row items-center justify-center gap-12 shadow-inner">
          
          <div className="relative">
            {/* Table structure */}
            <div className="grid grid-cols-2 text-center text-2xl font-bold bg-card border-2 border-slate-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b-2 border-r-2 border-slate-800 w-24">3</div>
              <div className="p-4 border-b-2 border-slate-800 w-24">10</div>
              <div className="p-4 border-r-2 border-slate-800 w-24">6</div>
              <div className="p-4 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-900/20 w-24">?</div>
            </div>
            
            {/* Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
              <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="#10b981" strokeWidth="4" strokeDasharray="6" strokeLinecap="round" />
              <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#f43f5e" strokeWidth="4" strokeDasharray="6" strokeLinecap="round" />
            </svg>
          </div>

          <div className="max-w-xs text-center md:text-left">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">Les 2 Étapes :</h3>
            <ol className="list-decimal list-inside text-slate-600 dark:text-slate-400 space-y-2 font-medium">
              <li>Tu <strong>Multiplies</strong> la diagonale magique (les deux nombres en face l'un de l'autre) : <code>10 × 6 = 60</code>.</li>
              <li>Tu <strong>Divises</strong> par le nombre qui reste seul (le 3) : <code>60 ÷ 3 = 20</code>.</li>
            </ol>
            <p className="mt-4 font-bold text-indigo-600 dark:text-indigo-400 text-xl text-center">? = 20</p>
          </div>

        </div>
      </Section>

      <Section title="📊 La Fréquence (Statistiques)" icon="📈" color="indigo">
        <p>
          Dans un champ de bataille (ou une classe d'école), tu as souvent besoin d'analyser les forces en présence. La <strong>Fréquence</strong> est le Pourcentage d'une "tribu" (effectif recherché) par rapport au groupe <strong>TOTAL</strong>.
        </p>

        <FormulaBox formula="Fréquence = (Effectif cible) / (Effectif TOTAL)" title="Formule de la Fréquence" />
        
        <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
          <strong>Exemple :</strong> S'il y a 5 filles dans une classe totale de 20 élèves.
          La fréquence est <code>5 / 20 = 0.25</code>.
          En multipliant par 100, on trouve <strong>25%</strong> !
        </p>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formule du <strong>Produit en Croix</strong> pour trouver une 4ème case vide ?</>}
            back={<>Je <strong>multiplie</strong> les nombres sur la diagonale sans trou, et je <strong>divise</strong> par le dernier nombre restant.</>}
          />
          <Flashcard 
            front={<>Comment calcule-t-on une <strong>Fréquence</strong> ?</>}
            back={<><strong>Fréquence = Effectif ciblé ÷ Effectif TOTAL</strong> (Et pour avoir le pourcentage, on multiplie juste le résultat par 100).</>}
          />
        </div>
      </Section>

      <Section title="📝 Épreuves de Décryptage (Exercices)" icon="✍️" color="slate">
        <Accordion title="Exercice 1 : Le Trésor des Pourcentages">
          <p className="font-medium mb-4">Dans un collège de 500 élèves (Effectif Total), 150 aiment les mathématiques ! Quel est le pourcentage de ces chevaliers mathématiques ?</p>
          <div className="bg-muted p-4 rounded-xl font-mono text-sm md:text-base space-y-4 border border-border">
            <p>1. <strong>La fraction brute de la Fréquence (F) :</strong></p>
            <p className="text-slate-600 dark:text-slate-400 pl-4">{`F = 150 / 500`}</p>
            
            <p className="mt-4">2. <strong>Transformation pure en % (/100) :</strong></p>
            <p className="text-slate-600 dark:text-slate-400 pl-4">Pour que 500 devienne 100 en bas (un pourcentage), je dois diviser le haut et le bas par 5.</p>
            <p className="text-slate-600 dark:text-slate-400 pl-4">{`F = (150 ÷ 5) / (500 ÷ 5)`}</p>
            <p className="text-slate-600 dark:text-slate-400 pl-4">{`F = 30 / 100`}</p>
            
            <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mt-4 pl-4">Résultat : 30% d'élèves adorent les maths !</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Simulateur de Croix" icon="🕹️" color="purple">
        <p className="mb-4">Voyons si tu as assimilé la technique secrète.</p>
        <FillInTheBlanks 
          id="prop-eval"
          content={[
            "Dans mon tableau, j'ai 5 bonbons qui coûtent 2€. Je veux connaître le prix de 15 bonbons. Ma diagonale sans trou est composée de 15 et de ",
            { options: ["5", "2", "?"], correctAnswer: 1 },
            ". Je calcule cette diagonale, ce qui me fait ",
            { options: ["10", "30", "15"], correctAnswer: 1 },
            ". Enfin, je divise ce résultat final par l'unique nombre restant dans le tableau, qui est ",
            { options: ["5", "10", "?", "15"], correctAnswer: 0 },
            ". Le résultat ultime est donc ",
            { options: ["6€", "4€", "10€"], correctAnswer: 0 },
            " ! C'est le pouvoir du produit en croix !"
          ]}
        />
      </Section>

      <Section title="🎯 Quiz de Survie" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans un tableau proportionnel, si je DOUBLE la quantité en haut, que se passe-t-il pour le prix en bas ?",
              options: [
                "Absolument rien, le prix reste fixe.",
                "Je dois DOUBLER le prix en bas aussi, c'est la loi de la proportion !."
              ],
              correctAnswer: 1,
              explanation: "C'est la règle d'or de la proportion ! Si X grandit d'un multiplicateur (×2), alors Y doit obligatoirement grandir de CE MÊME multiplicateur (×2)."
            },
            {
              question: "Puis-je faire un Produit en Croix pour calculer la taille de mon frère par rapport à son âge ?",
              options: [
                "Oui, car tout se calcule avec des pourcentages !",
                "NON ! L'âge et la taille ne sont pas proportionnels dans la vraie vie."
              ],
              correctAnswer: 1,
              explanation: "Exact ! Faire un produit en croix sur des choses non-proportionnelles donnera un résultat absurde (ex: si je mesure 1m à 4 ans, je mesurerais 10m à 40 ans...)."
            },
            {
              question: "Si 1/4 des élèves portent des lunettes, quel est ce pourcentage ?",
              options: [
                "14%",
                "40%",
                "25%"
              ],
              correctAnswer: 2,
              explanation: "1/4 c'est la fraction pour un quart. 1 divisé par 4 = 0.25 = 25% ! (Ou bien on multiplie par 25 le haut et le bas pour avoir 25/100)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier si une situation est proportionnelle ou non.",
            "Je remplis une case vide dans un tableau de proportion en un éclair avec le Produit en Croix.",
            "Je calcule une fréquence en divisant la cible étudiée par l'effectif TOTAL de l'expérience.",
            "Je transforme une fraction (/4, /5) ou une décimale (0.25) en un pourcentage (%)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_04_Proportionnalite_Statistiques;
