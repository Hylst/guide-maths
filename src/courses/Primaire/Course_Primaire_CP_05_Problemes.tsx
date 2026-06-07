import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MessageSquareDot, HelpCircle, Puzzle, SearchCheck } from 'lucide-react';

const Course_Primaire_CP_05_Problemes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CP-05"
        title="Résolution de Problèmes Simples"
        subtitle="Être un grand enquêteur et trouver la solution !"
        duration="40min"
        level="CP"
        prerequisites={["Savoir lire des petits mots", "Addition et Soustraction"]}
        objectives={[
          "Jouer au Détective dans une petite histoire.",
          "Trouver les 'Nombres Cachés' de l'énigme.",
          "Savoir s'il faut faire (+) ou s'il faut faire (-)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La résolution de problèmes est le véritable but des mathématiques : appliquer les outils (calcul, mesure) à une situation de la vie courante. L'enfant doit apprendre à ne pas lire les chiffres aveuglément mais à modéliser la situation (souvent par le dessin, la manipulation ou le jeu de rôle).
      </InfoBlock>

      <Section title="1. La Loupe du Détective (Lire L'Histoire)" icon={<SearchCheck className="w-6 h-6"/>} color="indigo">
        <p className="mb-4">Un <strong>Problème</strong> en Math, c'est comme une Histoire racontée dans un livre. Et au milieu, il manque quelque chose à la fin ! Tu dois être le policier !</p>
        
        <TipBanner title="Le Trésor : Trouver Les Mots Magiques" type="warning">
           Dans le texte du problème, certains mots t'indiquent ce qu'il faut calculer :
           Si l'histoire dit <strong>"Il donne"</strong>, <strong>"En plus"</strong>, <strong>"Il Gagne"</strong> : C'est qu'on a fait un ➕ (Une Addition, ton tas grossit) !
        </TipBanner>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 mt-6 shadow-sm">
          <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-4 flex items-center gap-2"><Puzzle size={20}/> La Preuve N°1 : L'Ogre Gourmand</h4>
          <p className="text-slate-900 dark:text-slate-100 dark:text-slate-200 p-4 bg-card dark:bg-slate-800 rounded font-bold border-l-4 border-rose-500">"L'Ogre a 5 poulets. Il trouve 3 NOUVEAUX poulets sur la route ! Combien de Poulets a l'Ogre ?"</p>
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm">🔍 Je cherche les CHIFFRES = <strong>5</strong> et <strong>3</strong>.</p>
            <p className="text-sm">🔍 Je cherche le mot Action = <strong>"NOUVEAUX"</strong> (ça veut dire EN PLUS !).</p>
            <p className="text-sm">🔍 Mon Enquête : C'est une ADDITION ➕ !</p>
          </div>
        </div>
      </Section>

      <Section title="2. Le Mode Combat : Dessiner pour Comprendre" icon={<MessageSquareDot className="w-6 h-6"/>} color="emerald">
        <p className="mb-4">Si ton cerveau chauffe, il y'a une astuce magique que même les adultes font en cachette : DESSINE LE JEU  SUR TA FEUILLE DE BROUILLON !!</p>

        <InteractiveExercise 
          title="L'énigme de la trousse qui Fuit"
          question={<>Léo avait 6 crayons. Sa trousse a un trou ! Il perd 2 crayons. Combien lui en reste-t-il ?</>}
          steps={[
            <><strong>1. L'Artiste :</strong> Dessine "6" petits bâtons sur ta feuille de brouillon. ( |||||| )</>,
            <><strong>2. Le Mot d'action :</strong> Le texte dit "IL PERD !". Perdre ça veut dire la mort de ton stylo. Le signe sera donc un : Moins ( ➖  !</>,
            <><strong>3. La Rature :</strong> Barre vite 2 petits bâtons sur ton dessin (car ils sont perdus !) <strong>( ||||~~ )</strong>.</>,
            <><strong>4. La Somme Finale :</strong> Compte les batons qu'il te reste : 1, 2, 3, 4 !! <strong>Léo a 4 crayons ! (6-2=4 !)</strong>.</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur dit "Léa mange 3 Tartes sur les 5 qu'elle avait". C'est un (➕) ou un (➖) ??</>}
            back={<><strong>Un MOINS ! (➖)</strong><br/>Manger, Voler, Perdre, Casser : Ce sont des mots qui enlevent des objets ! Donc Soustraction !</>}
          />
          <Flashcard 
            front={<>Si le problème utilise le mot "Combien EN TOUT ?" ou "Au Total !". C'est (➕) ou (➖) ?</>}
            back={<><strong>Un PLUS ! (➕)</strong><br/>"En Tout", ça veut dire on veut regrouper tout le panier pour voir la taille ENORME du tas !! Addition.</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'écris la réponse finale au problème. Faut-il mettre une petite phrase ou juste poser le chiffre ?",
              options: [
                "Juste '4' comme un sauvage.",
                "Une petite phrase Polie. 'Il reste 4 crayons à Léo'.",
                "Faire un grand dessin."
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! Le Maître ADORE voir la phrase 'Il a...' ou 'Le résultat est...'. C'est le style du CP !"
            },
            {
              question: "Mina a 2 Fleurs bleues. ET 4 Fleurs Rouges. Combien de fleurs elle a Dans Les Mains ? Quel type d'énigme est-ce ?",
              options: [
                "Une Addition. (2 + 4)",
                "Une Soustraction. (4 - 2)",
                "Une Punition."
              ],
              correctAnswer: 0,
              explanation: "Top ! Elle garde ses 2 bleues, et on rajoute le paquet des 4 Rouges. (Dans la meme main !). ON RASSEMBLE TOUT ! (2 + 4 = 6) Fleurs au total !"
            }
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider la Leçon (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CP_05_Problemes;
