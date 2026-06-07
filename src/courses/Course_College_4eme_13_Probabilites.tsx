import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Dice5, Shuffle, BarChart3, Scale3d } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_4eme_13_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-13"
        title="Les Probabilités (Initiation au Hasard)"
        subtitle="Apprends à tricher proprement comme un Mathématicien"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Les Fractions élémentaires", "Conversion d'une fraction en Pourcentages (%)"]}
        objectives={[
          "Lier le langage de la chance avec un mot noble : Évènement.",
          "Traduire le Hasard en une Fraction rigoureuse (Comprise entre 0 et 1).",
          "Calculer la probabilité d'un Lancer de Dés, de tirelire d'urnes ou d'une Roue.",
          "Maitriser l'Événement Contraire ('Au moins', 'Sauf')."
        ]}
      />

      <Section title="🌟 Introduction : Dompter l'Aleatoire" icon="🎰" color="slate">
        <p>
          Depuis la nuit des temps, l'homme essaye de prévoir l'avenir et de gagner aux jeux d'argent. Le cerveau humain est très mauvais pour juger le Hasard : il trouve des logiques de malédictions ("J'ai fait cinq fois Pile, le Face DOIT sortir maintenant !" <strong>C'est faux</strong>).
        </p>
        <p className="mt-4">
          La 4ème introduit un système rigoureux : La Probabilité. C'est l'art de donner un chiffre entre <strong className="text-rose-500">0</strong> (Impossible Absolu) et <strong className="text-emerald-500">1</strong> (Certain et Fatidique) aux chances d'une action future.
        </p>
      </Section>

      <Section title="1. Vocabulaire des Joueurs" icon="📖" color="indigo">
        <p className="mb-4">Tu ne peux pas faire des phrases comme "J'ai la chance que le nombre pair s'aligne". Tu dois structurer ton lexique.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-6 my-6">
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl border flex-1">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Expérience Aléatoire</h4>
             <p className="text-sm">Une action (jeu) où on ne PEUT PAS connaître à l'avance ni prévoir avec absolue certitude le résultat final par son cerveau ou calcul de gravité (Ex: Taper dans un ballon n'est pas un tirage Aléatoire ! Tirer un dé, oui).</p>
           </div>
           
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl border flex-1">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Issue (& L'Univers)</h4>
             <p className="text-sm">Une 'Issue' est le point unitaire vivant comme une 'Face 6'. <br/>L'Univers c'est le 'Menu': Les 6 nombres possibles pour la vie du cube [1, 2, 3, 4, 5, 6] ensemble !</p>
           </div>
           
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl border-l-4 border-indigo-500 flex-1 shadow-md">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Évènement (Lettre 'A')</h4>
             <p className="text-sm">C'est la CONDITION ou le BUT que tu fixes. <br/>"A = Tirer un nombre Strictement Pair". L'Évènement A regroupe 3 Issues soldats : [les faces 2, 4, et 6].</p>
           </div>
        </div>
      </Section>

      <Section title="2. La Formule Fondatrice de Laplace" icon="➗" color="blue">
        <p className="mb-4">Si les dés ne sont PAS PIPÉS, c'est-à-dire que chaque face du dès est un "Tirage Equiprobable" (Chance égale d'apparaitre). On applique la plus grande fraction historique !</p>

        <div className="bg-card p-6 rounded-2xl border-x-8 border-sky-500 shadow-sm flex flex-col items-center my-6 text-center max-w-2xl mx-auto">
           <h3 className="font-serif italic font-bold text-lg mb-2 text-sky-700 dark:text-sky-300">Formule Magistrale (A mémoriser pitié)</h3>
           <div className="font-mono text-xl md:text-2xl font-black bg-card dark:bg-black/30 w-full p-4 rounded-xl mt-4 border border-sky-200">
             <span className="block border-b-2 border-foreground pb-2 mb-2">
               Nombre de cas FAVORABLES (Issues Gagnantes)
             </span>
             <span className="block">
               Nombre TOTAL de possibilités (L'Univers)
             </span>
           </div>
           
           <div className="mt-6 flex flex-col items-center">
             <p className="font-bold text-sky-600 dark:text-sky-400 mb-2">Exemple: Je veux tirer une boule ROUGE. L'urne a [3 Rouges] et [5 Noires].</p>
             <p className="bg-muted p-2 rounded w-full"><strong>Haut :</strong> Combien d'Issues me font GAGNER ? Il y a "3" boules gagnantes au fond.</p>
             <p className="bg-muted p-2 rounded w-full mt-2"><strong>Bas (Le Piège) :</strong> Nombre Total !! 3 gagnantes + 5 noires = C'est Un Univers de Huit ("8").</p>
             <p className="font-bold text-xl mt-4">P(Rouge) = <strong className="text-sky-600 bg-card dark:bg-black/50 px-3 py-1 rounded-lg border shadow-inner">3 / 8</strong></p>
           </div>
        </div>
      </Section>

      <Section title="3. L'Évènement Contraire (Le Bouclier de la Flemme)" icon="🛡️" color="emerald">
        <p className="mb-4">Parfois l'Évènement "A = Ne pas tirer la Face 6" est ultra long à calculer en Additionnant tout ! La Loi affirme : [Mes chances + Celles de l'ennemi] valent toujours "L'UNITÉ" (100% , soit le nombre 1 entier).</p>

        <InteractiveExercise 
          title="L'Esquive de Calcul (1 - Combatant)"
          question={<>Dans une Roue de casino folle de 1 à 100 ! Tu Gagnes SI tu as 'N'IMPORTE QUOI SAUF LE 100'. Calcule la probabilité P(A).</>}
          steps={[
             <><strong>La Douleur du Front (Mauvaise méthode) :</strong> Je dois faire P(1)+P(2)+P(3)... jusqu'à 99. La calculette fond en larmes pendant quinze jours. Fin.</>,
             <><strong>La Ruse de l'Archer (Évènement Contraire) :</strong> Je vais prendre sa force contre moi en inversant ma vision !</>,
             <>Quel est l'inverse Mortel (L'ennemi) ? <em>"Tirer UNIQUEMENT la fameuse face de la Terreur : 100"</em>.</>,
             <>Probabilité de l'ennemi : P(Ennemi)= 1 case gagnante sur / Tirage 100 possible. P(E) = <strong>1 / 100.</strong></>,
             <><strong>Équation Frappe-Finale :</strong> Ma survie est [L'Univers Entier (Le "1" pur de 100%)] MOINS l'Ennemi : <br/><code>P(A) = 1 - (1/100)</code></>,
             <>Résultat de Survie Rapide = <strong>99 / 100 !</strong> Efficace et magistral</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Calcule la chance d'obtenir la Face 7 sur un dé cubique non pipé classique de base 6.</>}
            back={<><strong>Zéro (0). O/6 Si tu veux la fraction.</strong><br/>C'est appelé L'Évènement IMPOSSIBLE ! Et un Événement 'Obtenir moins de 10', vaudrait (6/6)= <strong>1</strong>. C'est l'Évènement CERTAIN absolut.</>}
          />
          <Flashcard 
            front={<>Le prof met un point d'intérogation : La probabilité est de -0.5 ou bien de 1.8 ou de 3/2 ?</>}
            back={<><strong>Un mensonge cosmique de la loi mathématique !!!</strong><br/>Une chance est TOUJOURS incluse entre <><MathComponent math={"[0\\% ; 100\\%]"} /></>. C'est l'encadrement en fraction : <><MathComponent math={"0 \\le P(A) \\le 1"} /></>. Une fraction ne peut JAMAIS avoir un numérateur dominant le bas, c'est mort.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si je lance 2 fois une pièce (Pile/Face). Est ce que j'additionne mes chances (1/2 + 1/2) pour faire une chance finale de (2/2 = 1) d'avoir Pile ?",
              answer: "AHH ALERTE ROUGE! Tu Viens de tiser le paradoxe des jeux du Diable. Si ça marchait tu serais Dieu de Pile : 'Je tire 2 fois j'aurai FORCEMENT Pile (Le Faux chiffre '1')'. NON ! En multi-Expérience, les univers se divisent, on Mutliplie! Tu auras 1/2 * 1/2 = 1/4. (Les joies de l'Arbre que tu verras en 3ème en Approfondissement)."
            },
            {
              question: "C'est grave de laisser '3 / 6' sur mon Brevet de base au Tirage Dés 1-2-3 ?",
              answer: "Pas grave, mais ça sent l'Amas de médiocrité. Tout jury frissonne de joie devant '3 / 6' suivi du signe Égal puis ' = 1 / 2 '. C'est pur. Rendre la fraction de chance Irréductible est l'âme du Mathematicien."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans une urne il y a 8 jetons lettres T. V. E. R. T. E. B. R. Je tire un jeton au Hasard, quelle est la proportion de Chance P(Tirer 'T') ? ",
              options: [
                "1 / 8  (Car c'est juste 1 lettre de l'alphabet globalée dans l'univers)",
                "2 / 8  Qui simplifie en (1 / 4)",
                "1 / 6  (Car il y a 6 VRAIES lettres différentes au format alphabet sans compter doublons...)"
              ],
              correctAnswer: 1,
              explanation: "Top Suprême !! 'T' et 'T' sont deux jetons distincts PHYSQIEMENT dans la boîte. On met la main, on a bien 2 Chances sur 8 Jetons-Univers-Spatiaux (Univers à base 8 !). Donc 2/8 -> 1/4 (Soit 25% de Chance)."
            },
            {
              question: "L'évènement A vaut {`$P(A) = 0,35$`}. Calcule la chance de survie pure de l'évènement dit 'Contraire de A' (Noté A Barre dans les lycées) ?",
              options: [
                "-0,35",
                "0,75",
                "0,65"
              ],
              correctAnswer: 2,
              explanation: "Incroyable ! P(Survie) = 'Le Monde Parfait 1' - L'évènement A. L'unité mondiale 1 moins 0,35 = 0,65 (Soit les fameux 65% complémentaires dans la tarte du Hasard)!"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de Fer du Hasard: Probabilité FINALE comprise IMMANQUABLEMENT entre [0 et 1].",
            "Marge erreur : Bien compter le Puit / Bassin Univers Total avant de former le dénominateur de Ratio.",
            "Toujours Simplifier."
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

export default Course_College_4eme_13_Probabilites;
