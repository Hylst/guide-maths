import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../components/SharedUI';

const Course_Primaire_CP_03_Geometrie_Formes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CP-GEO"
        title="Tracés et Formes"
        subtitle="Apprendre à tracer avec une règle et reconnaître les ronds, les carrés et les triangles."
        duration="25 min"
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        En CP, la géométrie c'est de l'action ! On apprend à tracer droit en tenant fermement sa règle. Laissez votre enfant s'entraîner sur des feuilles volantes. La reconnaissance sensorielle des formes (toucher les sommets, longer les côtés) consolide la mémoire.
      </InfoBlock>

      <Section title="⚠️ La Règle et les Points" icon="📏" color="emerald">
        <p className="mb-4">
          La <strong>Règle</strong> est ton outil principal en géométrie. Elle permet de tracer des lignes parfaitement droites !
        </p>
        <InfoBlock type="info" title="Comment tracer un trait droit ?">
          Pour tracer une ligne d'un point à un autre point : on place le bord de la règle bien aligné contre les deux points. On met ses doigts de l'autre main FERMEMENT au milieu de la règle pour l'empêcher de glisser. Puis on trace !
        </InfoBlock>
      </Section>

      <Section title="⚖️ Les Grandes Formes" icon="🔵" color="indigo">
        <p className="mb-4">
          Autour de nous, tout est fait de formes géométriques. Voici les 4 rois :
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-4">
          <ul className="text-sm list-disc pl-4 space-y-2 text-indigo-950 dark:text-indigo-50">
            <li><strong>Le Carré 🟩 :</strong> Il a 4 côtés de la <strong>même taille</strong>. Il a des coins bien droits (comme une table carrée).</li>
            <li><strong>Le Rectangle 🟦 :</strong> Il a 4 côtés aussi, avec des coins droits, mais il a deux côtés très longs, et deux côtés tout petits (comme une porte).</li>
            <li><strong>Le Triangle 🔺 :</strong> Facile à reconnaître, il a exactement <strong>3 pointes</strong> et 3 côtés ! (comme un chapeau pointu).</li>
            <li><strong>Le Cercle 🔴 :</strong> Il n'a aucun coin, aucune ligne droite. C'est un trait dessiné tout en rondeur (comme une roue ou le soleil).</li>
          </ul>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le cercle peut être dessiné à la règle.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">La règle ne fait QUE des lignes toutes droites ! Un cercle est tout rond. On le trace à main levée, avec un pochoir ou, plus tard, avec un compas.</span></>}
          />
          <Flashcard 
            front={<>Un carré a le même nombre de côtés qu'un rectangle.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Les deux ont exactement 4 côtés et 4 coins ! La seule différence, c're que le carré a 4 côtés PAREILS.</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Devine la forme"
          question={<p>J'ai 3 sommets (3 pointes) et 3 côtés. Si tu me dessines, on dirait une montagne ou une part de pizza. Qui suis-je ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Compter les bouts pointus</p>
              <p>On nous dit "3 pointes". Un carré en a 4. Un rond en a 0.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Une forme à 3 pointes, c'est obligatoirement un <strong>Triangle</strong> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Alignement"
          question={<p>Comment vérifier si 3 points A, B, et C dessinés sur une feuille sont alignés ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Chercher le bon outil</p>
              <p>L'outil pour faire du "droit", c'est la règle.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Je pose le bord de ma RÈGLE le long des points. Si les 3 points touchent le bord de la règle en même temps, alors ils sont bien <strong>alignés</strong> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Trouve la bonne forme :</p>
        <FillInTheBlanks 
          id="cp-geo-eval"
          content={[
            "La télévision du salon, ou mon cahier de texte ont 4 côtés avec de la longueur. Ils ont la forme d'un ",
            { options: ["Carré", "Rectangle", "Rond"], correctAnswer: 1 },
            ". \nLa balle avec laquelle je joue dans la cour a une forme toute ",
            { options: ["Carrée", "Triangle", "Ronde"], correctAnswer: 2 },
            ". \nEt pour tirer un beau trait bien droit il est interdit de le faire seulement à la main, il Faut utiliser ma ",
            { options: ["Règle", "Gomme", "Trousse"], correctAnswer: 0 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si je veux tracer un trait qui relie le chat dessiné à gauche de la page à la souris de droite, que dois-je faire ?",
              options: [
                "Tracer fort à main levée le plus vite possible.",
                "Poser la règle pour qu'elle touche le chat et la souris, la tenir fort au milieu, et tirer un trait propre.",
                "Je demande au maître."
              ],
              correctAnswer: 1,
              explanation: "Bien utiliser la règle est la compétence magique numéro 1 du CP en géométrie. La tenir fermement au milieu de la main forte est le secret pour ne pas qu'elle dérape !"
            },
            {
              question: "Combien y a-t-il de côtés dans LE CARRÉ ?",
              options: [
                "2 grands et 2 petits",
                "4 côtés complètement identiques",
                "3 côtés"
              ],
              correctAnswer: 1,
              explanation: "Le carré est la figure 'parfaite'. Ses 4 coins sont droits et ses 4 côtés ont la MÊME TAILE (identiques)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais placer et tenir ma règle sans qu'elle glisse.",
            "Le Triangle a 3 côtés.",
            "Le Carré a 4 côtés pareils.",
            "Le Rectangle a 4 côtés, mais est allongé.",
            "Le Cercle n'a qu'un bord tout rond."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+5 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CP_03_Geometrie_Formes;
