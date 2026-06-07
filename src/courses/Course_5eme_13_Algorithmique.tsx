import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, Accordion, StepList, InteractiveExercise 
} from '../components/SharedUI';

const Course_5eme_13_Algorithmique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-ALG"
        title="Algorithmique (Scratch)"
        subtitle="Donner des ordres à une machine bête et obéissante."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : L'Esprit de la Machine" icon="🤖" color="rose">
        <p>
          Un ordinateur ne sait rien faire tout seul. Il a besoin qu'on lui donne des ordres <strong>exacts, étape par étape</strong>. C'est ce qu'on appelle un algorithme.
        </p>
        <p className="mt-2">
          Sur Scratch, au lieu d'écrire des lignes de texte compliquées, on emboîte des blocs de couleur, comme des LEGO. Chaque bloc est une instruction donnée au Lutin.
        </p>
        
        <InfoBlock type="definition" title="La Règle de Lecture Intransigeante">
          Un programme s'exécute <strong>TOUJOURS du haut vers le bas</strong>. Le lutin fait l'action 1, puis l'action 2, puis l'action 3. Il ne lit jamais en diagonale et ne devine jamais tes intentions. Si tu te trompes d'ordre, le lutin fera n'importe quoi.
        </InfoBlock>
      </Section>

      <Section title="🗂️ Les 4 Outils Majeurs" icon="🛠️" color="indigo">
        <StepList>
          <div>
            <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-300">1. Les Événements (Blocs Jaunes à chapeau)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">C'est le déclencheur. "<strong>Quand le drapeau vert est cliqué</strong>". Sans lui, le programme ne démarre pas. C'est la clé de contact.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">2. Mouvement & Apparence (Bleu/Violet)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">"Avancer de 10 pas", "Tourner de 90°", "Dire 'Bonjour'". Ce sont les actions directes et visibles.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-amber-700 dark:text-amber-300">3. Variables (Blocs Oranges)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Comme en Calcul Littéral ! Tu crées une "boîte" (ex: Score). Tu peux "Mettre Score à 0" au début, puis "Ajouter 1 à Score" quand le lutin touche une cible.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-rose-700 dark:text-rose-300">4. Contrôles (C (les pinces) et Boucles)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">"Répéter 10 fois" (pour éviter de copier 10 fois les mêmes blocs) ou "Si [condition] ALORS [action]". C'est l'intelligence du programme.</p>
          </div>
        </StepList>
      </Section>

      <Section title="🔁 Le Pouvoir de la Boucle" icon="🔄" color="purple">
        <Accordion title="Dessiner un Carré : Sans boucle VS Avec boucle">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-50/50 dark:bg-rose-900/20 p-4 border border-rose-100 dark:border-rose-800/60 rounded-xl">
              <h5 className="font-bold text-rose-900 dark:text-rose-100 mb-2">Méthode Naïve (Long)</h5>
              <div className="font-mono text-sm space-y-1 text-slate-700 dark:text-slate-300 border-l-4 border-rose-400 pl-2">
                <p>- Avancer de 50 pas</p>
                <p>- Tourner ↻ de 90°</p>
                <p>- Avancer de 50 pas</p>
                <p>- Tourner ↻ de 90°</p>
                <p>- Avancer de 50 pas</p>
                <p>- Tourner ↻ de 90°</p>
                <p>- Avancer de 50 pas</p>
                <p>- Tourner ↻ de 90°</p>
              </div>
            </div>

            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 border border-emerald-100 dark:border-emerald-800/60 rounded-xl flex flex-col justify-center">
              <h5 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">Méthode Pro (Boucle)</h5>
              <div className="bg-orange-200 text-orange-900 border border-orange-300 font-mono text-sm p-2 rounded rounded-b-none border-b-0">
                ⭮ Répéter <strong>4</strong> fois
              </div>
              <div className="font-mono text-sm space-y-1 text-slate-700 dark:text-slate-300 border-l-4 border-orange-300 pl-4 py-2 bg-emerald-100 rounded-tr rounded-br">
                <p>- Avancer de 50 pas</p>
                <p>- Tourner ↻ de 90°</p>
              </div>
              <div className="bg-orange-200 h-2 border border-orange-300 border-t-0 rounded-bl rounded-br w-1/4"></div>
            </div>
          </div>
        </Accordion>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Le Lutin Perdu"
          question={<p>Mon lutin avance de 50 pas, puis tourne à droite de 90°. Il répète ça 4 fois. Quel dessin a-t-il tracé ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyse des actions</p>
              <p>Chaque "tour" consiste à avancer d'une même longueur, puis de faire un angle droit (90°).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : La boucle</p>
              <p>Il fait ça 4 fois. Un quadrilatère avec 4 côtés égaux et 4 angles droits... ça me rappelle quelque chose.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Il a dessiné un CARRÉ parfait !</p>
            </div>
          ]}
        />
        
        <InteractiveExercise
          title="Exercice 2 : La Variable Fantôme"
          question={<p>J'ai créé une variable "Score" qui vaut 0. Le jeu commence. Le lutin touche une pomme, mon programme dit "Mettre Score à 1". Le lutin touche une deuxième pomme, mon programme dit encore "Mettre Score à 1". Combien vaut le score à la fin ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Lecture stricte</p>
              <p>Attention à la différence entre "Mettre à" et "Ajouter à".</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le score sera seulement de 1 ! Le bloc "Mettre" écrase la valeur par le chiffre défini. Il fallait utiliser le bloc "Ajouter 1 à Score" pour cumuler les points ! L'algorithmique ne pardonne pas !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes Anti-Bug" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>À quoi sert le bloc "<strong>Si ... alors ... sinon ...</strong>" ?</>}
            back={<>À prendre une <strong>décision</strong>. Ex: <em>Si(touche le bord) alors(rebondir) sinon(avancer)</em>.</>}
          />
          <Flashcard 
            front={<>Le Lutin regarde vers le haut (0°). S'il s'oriente à <strong>90°</strong>, où regarde-t-il ?</>}
            back={<>Vers la <strong>droite</strong>. (C'est la convention par défaut de Scratch).</>}
          />
        </div>
      </Section>

      <Section title="🎮 Analyseur de Code" icon="🕹️" color="slate">
        <p className="mb-4">Tu inspectes un algorithme inconnu. Analyse ses effets :</p>
        <FillInTheBlanks 
          id="alg-eval"
          content={[
            "Le code commence par un chapeau jaune 'Quand [drapeau] est cliqué'. Ensuite, on a une boucle 'Répéter 3 fois'. À l'intérieur, il y a : 'Avancer de 100 pas' et 'Tourner ↻ de 120°'. Ouh là ! S'il avance 3 fois en tournant de 120° à chaque fois, il va refermer sa trajectoire et dessiner un ",
            { options: ["carré", "triangle équilatéral", "cercle"], correctAnswer: 1 },
            ". En effet, 3 fois 120° ça fait bien ",
            { options: ["360°", "180°", "90°"], correctAnswer: 0 },
            ", soit un tour complet sur lui-même pour revenir à sa position de départ !"
          ]}
        />
      </Section>

      <Section title="🎯 Le Test du Développeur" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu veux qu'une action ne s'arrête absolument jamais (comme le mouvement d'un ennemi dans un jeu), quel bloc utilises-tu ?",
              options: [
                "Répéter 1000 fois",
                "Répéter indéfiniment",
                "Si... Alors..."
              ],
              correctAnswer: 1,
              explanation: "Le bloc 'Répéter indéfiniment' (la boucle infinie) fait tourner le code à l'intérieur en boucle jusqu'à ce qu'on appuie sur le Stop rouge."
            },
            {
              question: "Quelle est l'utilité d'une 'Variable' dans un jeu vidéo Scratch ?",
              options: [
                "À changer la couleur du chat.",
                "À retenir une information en mémoire (comme le Score ou les Points de Vie)."
              ],
              correctAnswer: 1,
              explanation: "Une variable est une boîte mémoire. Elle stocke un nombre qui peut changer au cours du temps (comme ton Score qui monte)."
            },
            {
              question: "Que gère le bloc 'Aller à x: 0 y: 0' ?",
              options: [
                "Il ramène le lutin exactement au MILIEU de l'écran.",
                "Il cache le lutin (0=invisible).",
                "Il change la taille du lutin."
              ],
              correctAnswer: 0,
              explanation: "L'écran Scratch est un repère. Le centre exact est (0, 0). 'x' est l'axe horizontal, 'y' est l'axe vertical."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que les blocs s'exécutent de haut en bas.",
            "Je sais utiliser l'événement Drapeau Vert pour démarrer.",
            "Je sais remplacer 4 déplacements identiques par UNE boucle 'Répéter 4 fois'.",
            "Je sais identifier la différence entre un 'Répéter...' et un 'Si... Alors...'"
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

export default Course_5eme_13_Algorithmique;
