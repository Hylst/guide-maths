import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { DivideCircle, PieChart, Users, Cookie } from 'lucide-react';

const Course_Primaire_CE2_04_Initiation_Division: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE2-04"
        title="Initiation à la Division"
        subtitle="L'Art du Partage et des Groupements avec le Reste !"
        duration="40min"
        level="CE2"
        prerequisites={["Connaître ses tables de Multiplication !", "La Soustraction"]}
        objectives={[
          "Comprendre la Division (Le Partage équitable et sans bagarre).",
          "Chercher dans les Tables 'Qui s'approche le plus ?'.",
          "Découvrir Le Reste (Le Bonbon Oublié, ou Volé !)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La notion de division au CE2 est abordée sous le prisme du partage équitable et des groupements. Avant la technique opératoire de la potence (qui sera apprise plus tard), l'essentiel est que l'enfant comprenne la signification profonde de l'action de diviser, et le fait qu'il y ait souvent un "reste". L'usage d'objets réels à partager (billes, cartes, bonbons fictifs) est l'outil pédagogique idéal à la maison.
      </InfoBlock>

      <Section title="1. La Division : Le Super-Pouvoir de la Maman !" icon={<PieChart className="w-6 h-6" />} color="blue">
        <p className="mb-4">Imagine, Maman a acheté <strong>12 Bonbons</strong>. Et on est <strong>3 Frères et Soeurs</strong>. Pour qu'il n'y ai AUCUNE BAGARRE dans le salon, tout le monde doit avoir EXACTEMENT LE MEME NOMBRE DE BONBON. C'est l'essence même de <strong>la Division !</strong></p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 mt-6 text-center">
           <h4 className="font-bold text-sky-800 dark:text-sky-300 font-sans mb-4 flex items-center justify-center gap-2">Le Sortilege de l'Envers</h4>
           
           <p className="text-slate-700 dark:text-slate-300">Si tu as 12 bonbons " Divisé en 3 enfants ". Tu cherches une chose Magique :</p>
           <p className="mt-2 p-3 bg-card dark:bg-slate-800 rounded font-bold text-slate-900 dark:text-slate-100 dark:text-rose-400 font-mono text-lg border-2 border-dashed border-rose-300">
             En 12... y'a "Combien de Fois le chiffre 3" ???
           </p>
           <p className="mt-4">
             Pour répondre, on invoque <strong>La Table de Multiplier de [ 3 ]</strong> !!!<br/>
             - "3 x 1 = 3" (Trop petit !)<br/>
             - "3 x 2 = 6"<br/>
             - "3 x 3 = 9"<br/>
             - <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 p-1 rounded">"3 x 4 = 12 !!" BOUMMMM !</span>
           </p>
           
           <p className="mt-4 bg-emerald-500 text-white p-2 rounded-xl font-bold">12 divisé par 3 = 4 !! Chaque enfant aura (4 bonbons) ! Fin des bagarres.</p>
        </div>
      </Section>

      <Section title="2. Et s'il y a un Intru ? Le Fameux (Reste !) " icon={<Cookie className="w-6 h-6" />} color="rose">
        <p className="mb-4">Mais le monde n'est pas parfait. Et defois, Maman s'est trompé elle a ramené <strong>14 bonbons</strong>... Pour (3 enfants !).</p>

        <InteractiveExercise 
          title="L'énigme des 14 Bonbons Maudits"
          question={<>On cherche dans la Table de 3 ! (Pour arriver à 14)</>}
          steps={[
            <><strong>1. La Chasse :</strong> On rcite la table : "3x3=9", "3x4=12", "3x5=15" !</>,
            <><strong>2. L'Accident de parcours :</strong> STOOP !! Si on donne 5 bonbons à chacun.. ca fait (15 bonbons !!).. Or maman n'en a acheté QUE 14 à la boulangerie !!! On ne DEPASSE JAMAIS LE TOTAL de la boulangerie ! C'est Illégal !</>,
            <><strong>3. Le repli Tatique :</strong> On rétroco-péadale. On retourne au Multiplicateur en desous : Le x 4 !! ("3x4=12 !"). OK ! On va donner <strong>(4 Bonbons à chacun). On a bien vidé le stock de 12 .</strong></>,
            <><strong>4. Le RESTE  :</strong> Mais attention : [ Il y en avait 14. - On en a distribué 12 ].  ➡️  Il Reste quoi ?  <strong>(14 - 12 = 2) !!  Il y a un Reste de "2" Bonbons qui dorment au fond du sac que Maman garde pour elle.</strong></>
          ]}
        />
      </Section>

      <Section title="3. L'écriture en Ligne Divinatoire" icon={<DivideCircle className="w-6 h-6" />} color="amber">
        <p className="mb-4">Pour pas écrire un Roman énorme a chaque fois. On utilise des symboles et des Parenthèses protectrices.</p>

        <TipBanner title="L'Egalité Euclidienne" type="success">
           <strong>(14) </strong> = [ (3 Enfants) <strong>x</strong> (4 Bonbons donnés à tous) ]  <strong>+</strong>  (2 restes Maudit !)<br/><br/>
           Ce qui s'écrit de Facon Pro au Maitre : <br/>
           <strong>14 = (3 x 4) + 2</strong>.
        </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le Monstre Vrai/Faux : "Le Reste Maudit à la fin... A t-il le droit d'etre PLUS GRAND (+ grand) que le nombre de mes enfants ?"</>}
            back={<><strong>Non, C'est Mathématiquemnt  IMPOSSIBLE !</strong><br/>Si le rest est "4" et qu'on a que "3" enfants.. C'est que chaque enfant pouurrait en ravoir "1" petit de plus !! LE RESTE EST TOUJOURS PLUS PETIT que le nombre du diviseur.</>}
          />
          <Flashcard 
            front={<>A quoi sert à Connaitre ses Tables de multiplications (x) PAR COEUR ... Pour L'épreuve de la Divsion (/) ?</>}
            back={<><strong>C'EST LA SEULE ARME POUR RÉUSSIR !</strong><br/>Divison est la Face CACHÉE de la Muliplication. Si on te demande (45 / 5) = Tu Dois connaitre "5 x 9=45" ! Sans Table, pas de reponse !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Combien  fait ( 20 Divisé par 5) ?  (Pense en inverse => En 20  y'a combien de fois la table de 5 !?)",
              options: [
                "Ca fait 3 !",
                "Ca fait 4 ! Car ( 4 x 5 = 20 ! )",
                "Ca fait 100 !"
              ],
              correctAnswer: 1,
              explanation: "Boss !!! 20/5 =4 ! La Division c'est le miroir de Multiplicateur. !"
            },
            {
              question: "On a un trésor de  (16 LINGOTS D'OR). On est  (5 Pirates). On cherche à le Partager EQUITABLEMENT sans Raler !!. (Avec Reste).",
              options: [
                "4 Lingots chacun ! (Mais  4x5 = 20 LINGOTS). La banque explose.",
                "3 Lingots chacun. (Car 3x5=15).  ET LE RESTE EST DE (1) LINGOT MAUDIT au fond du coffre qu'on balance à la mer !.",
                "Non on laisse tou sur la plage."
              ],
              correctAnswer: 1,
              explanation: "Parfait ! Le Tableur de 5 : on s'amrrète avant d'exploser le plafond 16 ! On le depasse pas. Donc le cran en dessous c'est (15). (15 = 3x5). Le reste c'est le troute vers les 16 ! Bravo Capitaine !"
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

export default Course_Primaire_CE2_04_Initiation_Division;
