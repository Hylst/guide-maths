import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, StepList 
} from '../components/SharedUI';

const Course_5eme_06_Angles_et_Droites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-ANGL"
        title="Angles et Droites"
        subtitle="Le Choc des Épées : Parallèles, sécantes et clones géométriques."
        duration="45 min"
      />

      <Section title="⚔️ Introduction : Le premier Choc" icon="💥" color="rose">
        <p>
          Dès que DEUX DROITES se frappent et se croisent (on les appelle des droites <strong>sécantes</strong>), elles forment un "X" parfait. 
          Lors de cet impact, 4 angles naissent immédiatement autour du point de collision. Et ils sont liés par une magie géométrique absolue !
        </p>
        
        <InfoBlock type="definition" title="Opposés par le Sommet">
          Quand ça forme un "X", les angles qui se trouvent <strong>dos à dos</strong> (ils se tournent la tête) sont appelés <strong>Opposés par le sommet</strong>.
          La Règle d'or est simple : ILS SONT TOUJOURS STRICTEMENT ÉGAUX ! Si l'un gagne 40° d'ouverture, son clone dos à dos en aura 40° aussi.
        </InfoBlock>
      </Section>

      <Section title="🌉 L'Invasion de la 3ème Ligne : La Sécante" icon="🗡️" color="indigo">
        <p>
          Maintenant, la situation se complexifie. Imagine DEUX rivières (deux droites) coupées d'un seul coup par une troisième épée qu'on appelle "La Sécante".
          Ce ne sont plus 4 angles qui naissent, mais 8 !
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Pour se repérer dans ce chaos, les mathématiciens ont donné des noms très stricts à des paires d'angles (les jumeaux).
        </p>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">1. Les "Alternes-Internes" (Le pacte croisé)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Une paire d'angles est Alterne-Interne si :
            </p>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 mt-1">
              <li>Ils sont <strong>à l'INTÉRIEUR</strong> pris en sandwich entre les deux rivières (les droites).</li>
              <li>Ils sont <strong>ALTERNÉS</strong> : L'un est à gauche de l'épée Sécante, l'autre à droite !</li>
            </ul>
            <p className="text-sm font-bold text-indigo-500 mt-2">Astuce : Ça forme un "Z" !</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-300">2. Les "Correspondants" (Le clone symétrique)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Une paire d'angles est Correspondante si l'un est l'exacte copie de position de l'autre ! 
            </p>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 mt-1">
              <li>Un est à l'intérieur, l'autre à l'extérieur.</li>
              <li>Ils sont <strong>du MÊME CÔTÉ</strong> de la Sécante.</li>
              <li>S'il est "En haut à droite" du premier croisement, son correspondant est "En haut à droite" du deuxième croisement !</li>
            </ul>
            <p className="text-sm font-bold text-emerald-500 mt-2">Astuce : Ça forme un "F" !</p>
          </div>
        </StepList>
      </Section>

      <Section title="✨ Le Secret Ultime du Parallélisme" icon="🪄" color="purple">
        <p>
          Ce n'est que des noms... JUSQU'À CE QUE la vraie magie s'active ! Les angles Alternes-Internes ou Correspondants n'ont rien de spécial... <strong>SAUF SI LES DEUX DROITES DE BASE SONT PARALLÈLES !</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-purple-50/50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800/60 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-xl text-purple-900 dark:text-purple-100 mb-2 uppercase tracking-wider">La Règle Mère</h3>
            <p className="text-purple-950 dark:text-purple-50 font-medium">
              <strong>SI</strong> les 2 Droites sont PARALLÈLES... <br/>
              <strong>ALORS</strong> la magie s'opère : Tous les angles Alternes-Internes deviennent EXACTEMENT ÉGAUX ! (Les correspondants aussi).
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-xl text-emerald-900 dark:text-emerald-100 mb-2 uppercase tracking-wider">La Réciproque (La Preuve)</h3>
            <p className="text-emerald-950 dark:text-emerald-50 font-medium">
              <strong>SI</strong> on te dit qu'une paire d'Alternes-Internes a DEUX ANGLES ÉGAUX (ex: les deux font 40°)... <br/>
              <strong>ALORS</strong> tu as piraté le système : Les 2 droites sont FORCÉMENT PARALLÈLES !
            </p>
          </div>
        </div>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Comment reconnaitre des angles <strong>Opposés par le Sommet</strong> ?</>}
            back={<>Ils forment une croix ("X"), sont "dos à dos", et sont <strong>TOUJOURS égaux</strong> !</>}
          />
          <Flashcard 
            front={<>Si 2 droites sont <strong>parallèles</strong> coupées par une sécante, que se passe-t-il avec les Alternes-Internes ?</>}
            back={<>Ils deviennent magiquement <strong>des clones (égaux)</strong> !</>}
          />
        </div>
      </Section>

      <Section title="📝 Épreuves de Décryptage (Exercices)" icon="✍️" color="slate">
        <Accordion title="Exercice : Trouver l'Angle Fantôme">
          <p className="font-medium mb-4">On a 2 droites qu'on SAIT PARALLÈLES. Une 3ème vient les couper. Un angle (à l'intérieur, à gauche du trait) fait 65°. <br/>Combien fait son angle alterne-interne (à l'intérieur, à droite du trait) ? Justifier.</p>
          <div className="bg-muted p-6 rounded-xl space-y-4 border border-border">
            <p className="font-medium text-slate-900 dark:text-slate-100">C'est la rédaction classique de collège. Il faut faire 3 étapes rigoureuses !</p>
            <p className="pl-4 border-l-4 border-indigo-300">
              <strong className="text-indigo-700 dark:text-indigo-300">1. Je sais que :</strong> Les deux droites sont PARALLÈLES (c'est écrit dans l'énoncé). L'angle connu fait 65°.
            </p>
            <p className="pl-4 border-l-4 border-emerald-300">
              <strong className="text-emerald-700 dark:text-emerald-300">2. Or d'après le cours :</strong> "Si deux droites parallèles sont traversées par une sécante, alors les angles alternes-internes qu'elles forment sont égaux".
            </p>
            <p className="pl-4 border-l-4 border-rose-300">
              <strong className="text-rose-700 dark:text-rose-300">3. J'en déduis que :</strong> Son angle alterne-interne fait lui aussi exactement <strong>65°</strong>.
            </p>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Test du Vrai/Faux" icon="🕹️" color="emerald">
        <p className="mb-4">Complète la logique temporelle !</p>
        <FillInTheBlanks 
          id="ang-eval"
          content={[
            "Deux angles qui forment une croix (X) et se tournent le dos sont dits 'opposés par le sommet'. Ceux-là sont ",
            { options: ["parfois égaux", "toujours égaux", "jamais égaux"], correctAnswer: 1 },
            ". S'il y a 2 lignes quelconques traversées par une sécante, les angles alternes-internes qu'on forme ",
            { options: ["sont directement égaux", "ne sont PAS FORCÉMENT égaux"], correctAnswer: 1 },
            ". Mais si on ajoute la grande condition d'avoir deux droites strictement ",
            { options: ["sécantes", "perpendiculaires", "parallèles"], correctAnswer: 2 },
            ", alors OUI, la magie opère et les alternes-internes deviennent ",
            { options: ["différents", "strictement égaux", "de 90 degrés"], correctAnswer: 1 },
            " ! C'est ce qui nous permet aussi de tester si des droites sont parallèles ou non."
          ]}
        />
      </Section>

      <Section title="🎯 Quiz de Survie" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu traces un 'X' avec 2 crayons, et que l'angle du bas fait 120°. Combien fait l'angle du HAUT ?",
              options: [
                "Je dois sortir mon rapporteur pour vérifier.",
                "Il fait 60° car 180 - 120.",
                "Il fait EXACTEMENT 120° car ils sont opposés par le sommet !"
              ],
              correctAnswer: 2,
              explanation: "Parfait ! Les angles opposés par le sommet (face à face dans un X) sont toujours des clones de même taille sans avoir besoin de mesurer."
            },
            {
              question: "Qu'est-ce qu'une paire d'angles Alternes-Internes ?",
              options: [
                "Ils sont à l'intérieur des droites, du même côté de la sécante.",
                "Ils sont à l'intérieur des 2 droites, MAIS de côtés opposés/alternés de la sécante.",
                "Un est à l'intérieur, l'autre à l'extérieur."
              ],
              correctAnswer: 1,
              explanation: "Exact ! Alterne = 'On alterne gauche et droite de la ligne qui coupe'. Interne = 'Pris en sandwich à l'intérieur des 2 droites'."
            },
            {
              question: "Je vérifie les angles alternes-internes sur un dessin, et je vois que l'un fait 50° et l'autre fait 52°. Qu'est-ce que je peux en déduire des droites ?",
              options: [
                "Rien, c'est juste un dessin pas précis.",
                "Qu'elles sont parallèles.",
                "Qu'elles NE SONT ABSOLUMENT PAS parallèles ! La preuve est faite."
              ],
              correctAnswer: 2,
              explanation: "Bien joué ! Si elles étaient parallèles, les angles DEVRAIENT être exactement identiques. Vu qu'ils sont différents (50 != 52), les droites finiront obligatoirement par se croiser plus loin."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que les angles opposés par le sommet sont TOUJOURS égaux.",
            "Je peux reconnaître sur un dessin une paire d'angles Alternes-Internes (le Z) et Correspondants (le F).",
            "Je sais que SI et seulement SI les droites sont parallèles, ALORS ces paires d'angles sont égales.",
            "Je connais la règle inverse : prouver que 2 droites ne sont pas parallèles en montrant que les angles diffèrent."
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

export default Course_5eme_06_Angles_et_Droites;
