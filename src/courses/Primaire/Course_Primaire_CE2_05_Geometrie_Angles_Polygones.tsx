import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../../components/SharedUI';

const Course_Primaire_CE2_05_Geometrie_Angles_Polygones: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CE2-GEO"
        title="Angles et Polygones"
        subtitle="Repérer les angles droits et nommer les figures géométriques."
        duration="30 min"
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La géométrie au CE2 demande de passer d'une observation perceptive et globale à une observation analytique. L'enfant doit apprendre à caractériser les figures de façon rigoureuse : compter les sommets, mesurer et comparer les côtés, et surtout, repérer les angles droits à l'aide de l'équerre d'écolier. C'est l'année idéale pour fabriquer son propre "gabarit d'angle droit" en papier plié pour matérialiser le geste !
      </InfoBlock>

      <Section title="⚠️ Les Angles Droits" icon="📐" color="emerald">
        <p className="mb-4">
          Un <strong>angle droit</strong> est un coin "parfaitement carré". Tu peux le vérifier en utilisant une <strong>équerre</strong>.
        </p>
        <InfoBlock type="definition" title="Qu'est-ce qu'un angle droit ?">
          C'est un coin d'une figure qui a la même forme que l'angle d'un carré ou d'un rectangle. Si ça rentre pile dans ton équerre, c'est un angle droit ! On le marque souvent par un petit carré rouge dans le coin.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Les Polygones" icon="🔶" color="indigo">
        <p className="mb-4">
          Un <strong>polygone</strong> est une figure géométrique fermée, tracée uniquement avec des lignes droites (à la règle).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl">
            <h3 className="font-bold text-indigo-950 dark:text-indigo-50 mb-2">Les Triangles (3 côtés)</h3>
            <p className="text-sm text-indigo-900 dark:text-indigo-100">
              - <strong>Triangle Quelconque</strong> : Ses 3 côtés sont tous différents.<br/>
              - <strong>Triangle Rectangle</strong> : Il possède 1 angle droit.<br/>
              - <strong>Triangle Isocèle</strong> : Il a 2 côtés de la même longueur.
            </p>
          </div>
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl">
            <h3 className="font-bold text-indigo-950 dark:text-indigo-50 mb-2">Les Quadrilatères (4 côtés)</h3>
            <p className="text-sm text-indigo-900 dark:text-indigo-100">
              - <strong>Carré</strong> : 4 côtés égaux ET 4 angles droits.<br/>
              - <strong>Rectangle</strong> : Les côtés opposés sont égaux ET 4 angles droits.<br/>
              - <strong>Losange</strong> : 4 côtés égaux mais PAS d'angles droits.
            </p>
          </div>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Un cercle est un polygone.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Un polygone doit être tracé uniquement avec des traits droits (à la règle). Le cercle est une ligne courbe fermée, ce n'est donc pas un polygone.</span></>}
          />
          <Flashcard 
            front={<>Le carré est un rectangle très spécial.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Un rectangle a besoin de 4 angles droits. Le carré a 4 angles droits. C'est donc un rectangle, mais qui a en plus la particularité d'avoir ses 4 côtés égaux !</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver le polygone"
          question={<p>J'ai 4 côtés de même longueur, mais je n'ai AUCUN angle droit. Qui suis-je ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : 4 côtés, c'est un Quadrilatère</p>
              <p>On cherche donc parmi le carré, le rectangle et le losange.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : 4 côtés égaux</p>
              <p>Seuls le Carré et le Losange ont leurs 4 côtés égaux.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Puisque l'on précise que la figure n'a PAS d'angle droit (contrairement au carré), c'est forcément un <strong>Losange</strong> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Nom de figure"
          question={<p>Comment s'appelle un polygone qui a exactement 5 côtés ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Racines grecques</p>
              <p>Le préfixe pour 5 en grec est "penta-".</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Un polygone avec 5 côtés s'appelle un <strong>Pentagone</strong>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Complète avec les bons mots de vocabulaire :</p>
        <FillInTheBlanks 
          id="ce2-geo-eval"
          content={[
            "Dans mon trousse de géométrie, pour vérifier qu'un angle est droit (qu'il fait un beau coin de carré), j'utilise mon ",
            { options: ["règle", "équerre", "compas"], correctAnswer: 1 },
            ". \nUne figure avec trois côtés pointus s'appelle un ",
            { options: ["carré", "losange", "triangle"], correctAnswer: 2 },
            ". Et si ce triangle possède un coin parfaitement carré, on dit que c'est un triangle ",
            { options: ["droit", "rectangle", "carré"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle figure géométrique n'a QUE 3 côtés ?",
              options: [
                "Un quadrilatère",
                "Un losange",
                "Un triangle"
              ],
              correctAnswer: 2,
              explanation: "Le mot lui-même veut dire 'trois (tri) angles'. Avec 3 angles, on doit tracer avec 3 côtés !"
            },
            {
              question: "Si tu dessines un trait à la règle entre chaque coin d'une feuille A4 de papier, tu dessines un :",
              options: [
                "Carré",
                "Rectangle",
                "Losange"
              ],
              correctAnswer: 1,
              explanation: "Une feuille de papier format A4 a 4 angles droits, mais ses côtés opposés ne sont pas tous égaux (la longueur est plus grande que la largeur). C'est un rectangle !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais utiliser l'équerre pour trouver un angle droit.",
            "Je me souviens qu'un polygone est tracé uniquement à la règle.",
            "Je connais la différence entre Carré (angles droits) et Losange (sans).",
            "Je connais la famille des Quadrilatères (4 côtés) et Triangles (3 côtés)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CE2_05_Geometrie_Angles_Polygones;
