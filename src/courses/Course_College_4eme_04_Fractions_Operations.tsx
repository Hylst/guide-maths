import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { PieChart, Divide, X, Plus, Scaling, ArrowRightFromLine } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_4eme_04_Fractions: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-04"
        title="Fractions et Opérations"
        subtitle="Domptez les dénominateurs et devenez l'As du Partage !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Tables de multiplication absolues", "Simplification de fractions (5ème)"]}
        objectives={[
          "Mémoriser que l'Addition = Dénominateur Commun OBLIGATOIRE.",
          "Mémoriser que la Multiplication = Frappe toute droite sans réfléchir.",
          "Comprendre la Division : L'art du renversement (L'Inverse).",
          "Simplifier une formule avant de multiplier pour épargner ton cerveau."
        ]}
      />

      <Section title="🌟 Introduction : Le conflit des parts de pizza" icon="🍕" color="slate">
        <p>
          Si tu manges 1/2 pizza (la moitié), et que ton pote mange 1/4 (un quart). Vous avez mangé combien de pizzas au total ? Impossible de les additionner directement en disant '1+1=2 et 2+4=6'. Dire que vous avez mangé '2/6' de la pizza n'a aucun sens, car 2/6 c'est tout petit !
        </p>
        <p className="mt-4">
          Le domaine des Fractons, c'est l'art d'utiliser le <strong>Numérateur</strong> (Le nombre de Parts de viande) et le <strong>Dénominateur</strong> (Le Format des parts, sa taille de coupure). Tu ne peux combiner que des parts de MÊME TAILLE ! Entrons dans la bataille.
        </p>
      </Section>

      <Section title="1. Addition et Soustraction (La guerre des Dénominateurs)" icon="➕" color="indigo">
        <p className="mb-4">Tu ne peux JAMAIS fusionner des demis <><MathComponent math={"\\frac{1}{2}"} /></> avec des tiers <><MathComponent math={"\\frac{1}{3}"} /></>. Les morceaux n'ont pas la même taille sur la pizza. Tu dois les "Découper" virtuellement pour créer un <strong>Dénominateur Commun</strong> (Le format de part mondialement identique).</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm my-6 flex flex-col items-center">
           <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-100 dark:text-indigo-200 mb-4 pb-2 border-b border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 w-full text-center">Défi Mutatif : <><MathComponent math={"\\frac{3}{4} - \\frac{1}{12}"} /></></h3>
           
           <ul className="space-y-4 font-mono text-center w-full max-w-lg mb-6">
              <li>
                <span className="text-muted-text text-sm mb-1 block">1. Les dénominateurs sont (4) et (12). Alerte Rouge ! Je dois les égaliser !</span>
                <span className="bg-card dark:bg-black/40 p-2 rounded block">Le 12 est un chef ! 4 multiplié par 3 donne 12. Je dois donc mutliplier le bloc de 3/4 par 3 en HAUT ET EN BAS (Pour ne pas changer son essence !).</span>
              </li>
              <li>
                <span className="text-muted-text text-sm mb-1 block">2. La Transformation du Caméléon</span>
                <span className="bg-card dark:bg-black/40 p-2 rounded block"><><MathComponent math={"\\frac{3 \\times 3}{4 \\times 3} = \\frac{9}{12}"} /></></span>
              </li>
              <li>
                <span className="text-muted-text text-sm mb-1 block">3. Le combat à Armes Égales ! (On garde le 12 vivant, il dicte juste la taille des parts)</span>
                <span className="bg-card dark:bg-black/40 p-2 rounded block font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/60 shadow-inner"><><MathComponent math={"\\frac{9}{12} - \\frac{1}{12} = \\frac{9 - 1}{12} = \\mathbf{\\frac{8}{12}}"} /></></span>
              </li>
           </ul>
        </div>

        <TipBanner title="Et après le combat : Réduisez vos blessés" type="info">
           Une fraction n'est belle que <strong>Simplifieé au maximum</strong>. Pour notre sublime butin <MathComponent math={"8 / 12"} />, ils sont tous deux de la table de 4 ! On sabre par 4 en haut et en bas !<br/>
           Résultat Total Parfait du Prof : <><MathComponent math={"\\frac{2}{3}"} /></>. (Même réponse, mais en costume cravate de prof de math !)
        </TipBanner>
      </Section>

      <Section title="2. La Multiplication (Le Buldozer Aveugle)" icon="✖️" color="blue">
        <p className="mb-4">Oublie la douleur des dénominateurs communs ! La mutliplication de fraction est un bulldozer déchaîné. Il écrase la route tout en ligne droite, sans se poser de question.</p>

        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 dark:border-sky-800 my-6 shadow-sm flex flex-col md:flex-row items-center gap-8">
           <X className="w-16 h-16 text-sky-500 hidden md:block" />
           <div className="flex-1 text-center md:text-left">
              <p className="font-serif font-black text-2xl text-sky-800 dark:text-sky-200 mb-2">"LE HAUT TAPE LE HAUT,<br/>LE BAS TAPE LE BAS."</p>
              <div className="font-mono text-xl bg-card dark:bg-black/30 p-3 rounded-lg border shadow-inner mt-4 inline-block">
                <><MathComponent math={"\\frac{5}{7} \\times \\frac{3}{4} = \\frac{5 \\times 3}{7 \\times 4} = "} /></> <strong><><MathComponent math={"\\frac{15}{28}"} /></></strong>
              </div>
           </div>
        </div>

        <InteractiveExercise 
          title="Le secret de la Simplification Avant-Combat"
          question={<>L'horreur divine arrive : <><MathComponent math={"\\frac{25}{14} \\times \\frac{21}{10}"} /></>. Si tu fais le calcul en ligne, tu vas trouver <><MathComponent math={"\\frac{525}{140}"} /></>. Tu n'auras AUCUN point car c'est impossible à simplifier humainement de tête ! Que faire ?</>}
          steps={[
            <><strong>L'Astuce Mondiale :</strong> Le Grand Marché Libre ! Lors d'une multiplication, TOUS les nombres du haut partagent le trône, ils sont alliés, et TOUS ceux du bas sont les serviteurs.</>,
            <>Tu laisses le 'Fois' général, et tu "Démontes" ceux qui ont un lien en croix secret pour supprimer les pièces en or communes : <br/><MathComponent math={"25"} /> (Haut-Gauche) et <MathComponent math={"10"} /> (Bas-Droit) sont dans la table de <MathComponent math={"5"} />. <MathComponent math={"21"} /> (Haut) et <MathComponent math={"14"} /> (Bas) sont tous deux dans la table de <MathComponent math={"7"} /> !</>,
            <>On décompose pour laisser apparaitre les cibles : <><MathComponent math={"\\frac{{5 \\times \\mathbf{5}}}{{2 \\times \\mathbf{7}}} \\times \\frac{{3 \\times \\mathbf{7}}}{{2 \\times \\mathbf{5}}}"} /></></>,
            <><strong>Le Massacre d'Or :</strong> On raye (Élimine) le 5 du haut et du bas. On raye le 7 du haut et du bas.</>,
            <>Que reste-t-il sur les cadavres de la bataille ? Le pauvre 5 en haut gauche multiplié par le 3. Le 2 en bas multiplié par le 2.</>,
            <>Résultat Frais, Pur et déjà Simplifié au millimètre : <strong><><MathComponent math={"\\frac{15}{4}"} /></></strong>. Magie.</>
          ]}
        />
      </Section>

      <Section title="3. La Division (L'Art de l'Inverse et du Roulis)" icon="➗" color="emerald">
        <p className="mb-4">Personne n'aime diviser des fractions. C'est illisible et affreux sur une copie de math car ça fait des "étages". La solution ? <strong>On fuit le duel et on renverse la table !</strong></p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/40 p-6 rounded-[2rem] border-l-8 border-emerald-500 shadow-sm my-6 text-center">
           <h3 className="font-bold text-lg mb-4 text-emerald-900 dark:text-emerald-100 dark:text-emerald-200">La Proclamation Impériale Divisionnelle</h3>
           <p className="font-serif italic text-lg mb-6">
             "Diviser par une fraction, c'est purement et simplement MULTIPLIER par son INVERSE formel !"
           </p>

           <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-mono text-xl">
             <div className="bg-card p-3 border shadow-inner rounded-xl">
               <><MathComponent math={"\\frac{5}{3} \\div "} /></> <strong><><MathComponent math={"\\frac{7}{4}"} /></></strong>
             </div>
             <div>
               <ArrowRightFromLine className="text-emerald-500 mx-4" />
             </div>
             <div className="bg-card p-3 border border-emerald-500 shadow-inner rounded-xl font-bold">
               <><MathComponent math={"\\frac{5}{3} \\times "} /></> <strong><><MathComponent math={"\\frac{4}{7}"} /></></strong>
             </div>
           </div>

           <p className="mt-6 text-sm text-muted-text max-w-md mx-auto">
             J'ai changé le signe ÷ en ×, MAIS en échange absolu j'ai fait faire un poirier parfait à la fraction de DEUXIEME POSITION (Le 4 monte en haut, le 7 tombe en bas !)
           </p>
           <div className="mt-4 bg-emerald-600 text-white p-2 rounded-lg font-bold w-max mx-auto shadow-md">
             <><MathComponent math={"= \\frac{20}{21}"} /></>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande l'<strong>Opposé</strong> de <><MathComponent math={"\\frac{3}{5}"} /></> et l'<strong>Inverse</strong> de <><MathComponent math={"\\frac{3}{5}"} /></>. C'est pas la même chose ?</>}
            back={<><strong>Alerte Erreur Fatale ! C'est le jour et la nuit.</strong><br/>- Opposé (C'est le jeu des Signes de miroir) = <strong><><MathComponent math={"-\\frac{3}{5}"} /></></strong><br/>- Inverse (C'est le saut périlleux du poirier acrobatique) = <strong><><MathComponent math={"\\frac{5}{3}"} /></></strong>.</>}
          />
          <Flashcard 
            front={<>Si je tombe sur le nombre "7" tout seul dans mes calculs.. <>{"("}<MathComponent math={"7 - \\frac{1}{2}"} />{")"}</>. Je ne peux rien faire, c'est pas une fraction ! ?</>}
            back={<><strong>Un entier a toujours un costume invisible de fraction !</strong><br/>Le 7 est secrètement le roi de pacotille <strong><><MathComponent math={"\\frac{7}{1}"} /></></strong>. Tu peux l'utiliser comme fraction, et multiplier 7 et 1 par "2" pour obtenir son avatar <><MathComponent math={"\\frac{14}{2}"} /></> !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'additionne avec le Dénominateur POUBELLE (En faisant par exemple 1/2 + 1/3 = 1/(2+3) = 1/5) ! Que se passe t-il au Brevet ?",
              answer: "Les profs appellent ça le Dénominateur de l'Angoisse (Ou l'erreur 'Addition aveugle'). C'est formellement 0/20 pour ton exercice. Ne touche JAMAIS au bas d'une addition, son seul but de vie est d'attendre qu'on réduise le 'nom' de la part en forme commune pour qu'ils soient de taille identique."
            },
            {
              question: "Pourquoi Multiplier des fractions rend le nombre des fois PLUS PETIT ?",
              answer: "Parce que tu prends une fraction d'une MIETTE (Fraction d'une fraction). Si tu as 1/2 Pizza (La moitié) et que tu mutliplie par 1/2... tu cherches 'La MOITIÉ de la MOITIÉ'. Donc ça rétrécit l'objet pour atterir cruellement sur 1/4 !! C'est la magie qui défie l'intuition primaire."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Devant le jugement final de l'exercice : $( \\frac{1}{2} + \\frac{3}{4} )$. Que dois tu opérer ?",
              options: [
                "Je tape sans me poser de question : Haut + Haut (4) et Bas + Bas (6). Donc 4/6 !",
                "Je multiplie le haut de 1/2 par 2 et le bas par 2 pour générer 2/4. J'aurai (2/4 + 3/4) = 5/4 !",
                "Je dis que 2 et 4 c'est la table de 8 et je fais 8 partout en croix."
              ],
              correctAnswer: 1,
              explanation: "Top de Top ! On trouve le Dénominateur Commun (4). La fraction en guerre 1/2 subit une mutation x2 magique pour devenir 2/4. Et là BOUM ! Le plateau de jeu s'ouvre, on ajoute les numérateurs !"
            },
            {
              question: "Je dois Diviser : $\\frac{8}{3} \\div \\frac{5}{2}$.",
              options: [
                "Ca donne du pur 8/3 × 5/2 = 40/6 simplifié 20/3 !",
                "Je fuis l'opération pour : 8/3 × 2/5 ! Les haut se tapent (8×2=16) les bas se hurlent ! (3×5=15). Résultat : 16/15 ! Gagnant parfait."
              ],
              correctAnswer: 1,
              explanation: "Incroyable et Parfait ! Tu as refusé le duel perfide de la division. Tu l'as mutée en Multiplicateur (foix) puis t'as arraché les jambes et la tête du numéro deux pour le retourner de force (5/2 -> 2/5) et frapper au couteau tout droit ! Victoire !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je ne mutliplie pas en Croix pour faire genre je sais. C'est pour l'ÉGALITÉ les produits en croix !",
            "Simplifier avaint le combat des multiplications !",
            "TOUTE DIVISION DEVIENT UN FOIS INVERSÉ !"
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

export default Course_College_4eme_04_Fractions;
