import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { Target, Activity } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_03_Fonctions: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-03"
        title="La Notion de Fonction"
        subtitle="Découvrez la machine mathématique universelle qui transforme les nombres !"
        duration="1h 15min"
        level="3ème (Cycle 4)"
        prerequisites={["Calcul littéral (lettre x)", "Lecture d'un repère orthonormé"]}
        objectives={[
          "Comprendre le vocabulaire de base : Antécédent, Image, Fonction.",
          "Lire et utiliser les notations mathématiques comme f(x) = 2x + 3.",
          "Identifier images et antécédents via un tableau, un graphique ou une formule.",
          "Tracer la courbe représentative d'une fonction."
        ]}
      />

      <Section title="🌟 Introduction : La Machine Mystère" icon="⚙️" color="slate">
        <p>
          Au collège, on t'a beaucoup appris à faire des calculs statiques. Mais le monde réel bouge ! Une <strong>Fonction</strong>, c'est comme une incroyable <strong>machine de formage</strong> dans une usine.
        </p>
        <p className="mt-4">
          Tu fais entrer un bloc de métal brut (le nombre de départ, <strong className="text-sky-600">x</strong>), la machine le transforme selon un plan précis, et il en ressort une belle pièce finie (le nombre transformé). On dit que la machine "fonctionne". Inventer cette notion a permis à l'Humanité de comprendre la vitesse, la Bourse, la météo, et l'Intelligence Artificielle !
        </p>
      </Section>

      <Section title="1. Le Vocabulaire Absolu" icon="🗣️" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800">
            <h4 className="font-bold text-sky-800 dark:text-sky-200 text-xl border-b border-sky-200 dark:border-sky-800 pb-2 mb-4">L'Antécédent</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground">
              <li>• C'est la graine. Le nombre du <strong>DÉPART</strong>.</li>
              <li>• On l'appelle souvent <strong><MathComponent math={"x"} /></strong> (la variable inconnue).</li>
              <li>• C'est ce qu'on "donne à manger" à la machine.</li>
              <li>• Sur un graphique, on le lit toujours sur <strong>l'axe horizontal (abscisses)</strong>.</li>
            </ul>
          </div>
          
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 text-xl border-b border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 pb-2 mb-4">L'Image</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground">
              <li>• C'est le résultat. Le nombre d'<strong>ARRIVÉE</strong>.</li>
              <li>• On le note <strong><MathComponent math={"f(x)"} /></strong> (qui se lit "f de x").</li>
              <li>• C'est ce que "recrache" la machine.</li>
              <li>• Sur un graphique, on la lit toujours sur <strong>l'axe vertical (ordonnées)</strong>.</li>
            </ul>
          </div>
        </div>

        <TipBanner title="Le secret grammatical pour ne plus jamais se tromper" type="success">
          La phrase magique est toujours construite ainsi :<br/>
          <strong>"L'image de [l'Antécédent] est [l'Image]"</strong>. Jamais l'inverse.<br/>
          Exemple : Si j'insère 3 et qu'il sort 7. On dit <em>"L'image de 3 est 7."</em>
        </TipBanner>
      </Section>

      <Section title="2. Les Trois Visages d'une Fonction" icon="🎭" color="emerald">
        <p className="mb-6">Une fonction peut se présenter sous 3 formes différentes dans les exercices ou dans la vie réelle :</p>
        
        <h3 className="text-xl font-bold mt-4 mb-2">A. La Formule Algébrique (La notice de la machine)</h3>
        <p className="mb-4">C'est la forme avec la lettre <MathComponent math={"x"} />. Elle décrit exactement le calcul mathématique à effectuer.</p>
        <div className="bg-card p-4 rounded-xl border border-border-strong text-center shadow-sm mb-6 max-w-md mx-auto font-mono text-lg">
          f(x) = 2x - 5
        </div>
        <p className="mb-8">Cela scande : <em>"La machine <MathComponent math={"f"} /> prend <MathComponent math={"x"} />, le multiplie par 2, puis lui enlève 5."</em>. Si je donne l'antécédent <MathComponent math={"x = 10"} />, la machine calcule <MathComponent math={"f(10) = 2 \\times 10 - 5 = 15"} />. L'image est <MathComponent math={"15"} />.</p>

        <h3 className="text-xl font-bold mt-4 mb-2">B. Le Tableau de Valeurs (Le registre d'usine)</h3>
        <p className="mb-4">Un historien de l'usine a noté sur un tableau des exemples passés de ce qu'il est entré et sorti, sans te donner la formule secrète :</p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full max-w-lg mx-auto bg-card rounded-xl overflow-hidden border border-border-strong text-center shadow-sm">
            <thead>
              <tr className="bg-sky-50 dark:bg-sky-900/30">
                <th className="py-3 px-4 border-b border-r border-border-strong font-bold text-sky-800 dark:text-sky-200">x (Antécédents)</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">-2</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">0</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">3</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-r border-border-strong font-bold bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 dark:text-emerald-200">f(x) (Images)</td>
                <td className="py-3 px-4 text-foreground">8</td>
                <td className="py-3 px-4 text-foreground">-1</td>
                <td className="py-3 px-4 text-foreground">8</td>
                <td className="py-3 px-4 text-foreground">12</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <InfoBlock title="Attention au piège de l'Antécédent !" type="warning">
          <strong>Combien y a-t-il d'antécédents pour le nombre 8 ?</strong><br/>
          Regarde la ligne des images (en bas). Le 8 apparait DEUX fois ! Ses antécédents (au-dessus) sont <code>-2</code> ET <code>3</code>.<br/>
          <em>Règle de fer :</em> Un nombre peut avoir plusieurs antécédents, mais un antécédent ne donne <strong>QU'UNE SEULE ET UNIQUE image</strong> (sinon la machine serait cassée !).
        </InfoBlock>

        <h3 className="text-xl font-bold mt-8 mb-2">C. Le Graphique (La courbe représentative)</h3>
        <p className="mb-4">C'est la forme visuelle. Sur l'axe horizontal, on place la matière première (les Antécédents <MathComponent math={"x"} />). Sur l'axe vertical, l'usine vient pointer à quelle altitude tombe le produit fini (les Images <MathComponent math={"y"} /> ou <MathComponent math={"f(x)"} />).</p>
        <div className="bg-muted dark:bg-slate-900/30 p-6 rounded-[2rem] border border-border-strong text-center my-6 shadow-sm">
          <p className="font-bold text-lg text-foreground mb-4">Pour lire une Image sur un graphique :</p>
          <ol className="text-left max-w-lg mx-auto space-y-3 font-medium text-muted-text">
            <li>1. Place ton doigt sur le nombre donné sur l'axe <strong>Horizontal</strong> (en bas).</li>
            <li>2. Monte ou descends tout droit jusqu'à toucher la courbe dessinée.</li>
            <li>3. Regarde tout droit vers la gauche ou la droite sur l'axe <strong>Vertical</strong>. C'est l'Image !</li>
          </ol>
        </div>
      </Section>

      <Section title="⚡ Rapide et Efficace : Exercices Interactifs" icon="🚀" color="amber">
        <InteractiveExercise 
          title="Inverser la machine (Trouver l'antécédent par le calcul)"
          question={<>On a la fonction <MathComponent math={"f(x) = 4x - 2"} />. Trouve le ou les <strong>antécédents de 10</strong>.</>}
          steps={[
            <>Attention, l'énoncé est un piège classique ! Il ne te demande pas de calculer <MathComponent math={"f(10)"} />. 10 est le RÉSULTAT final (l'image). On cherche <MathComponent math={"x"} /> (le départ).</>,
            <>On doit donc résoudre l'équation : <br/><span className="font-mono text-lg font-bold text-primary">4x - 2 = 10</span></>,
            <>On passe le "-2" de l'autre côté : <br/><span className="font-mono font-bold">4x = 10 + 2</span></>,
            <><span className="font-mono font-bold">4x = 12</span></>,
            <>On divise par 4 : <br/><span className="font-mono font-bold">x = 12 ÷ 4 = 3</span></>,
            <>L'antécédent de 10 est <strong>3</strong>.</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans la notation <strong><MathComponent math={"f(-4) = 16"} /></strong>, quel nombre est l'antécédent et lequel est l'image ?</>}
            back={<>L'antécédent (x) est ce qui est avalé entre les parenthèses : <strong>-4</strong>.<br/>L'image (le résultat f(x)) est ce qui sort après le signe égal : <strong>16</strong>.</>}
          />
          <Flashcard 
            front={<>Vrai ou Faux : Un antécédent peut avoir deux images différentes en même temps.</>}
            back={<><strong>FAUX ! Absolument faux.</strong><br/>C'est l'essence même d'une fonction mathématique. Pour un antécédent "x" donné, il n'existe qu'UN SEUL et unique calcul final. <em>(Par contre, le résultat "10" aurait pu être obtenu avec deux départs "x" différents)</em>.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi on utilise toujours 'x' et 'f' ?",
              answer: "Ce sont juste de vieilles conventions de mathématiciens pour s'y retrouver mondialement ! 'f' veut dire Fonction, et 'x' veut dire Nombre Inconnu. Tu as parfaitement le droit sur ton cahier de créer la machine 'g' et de l'appliquer à la variable 't' (par exemple pour le Temps). Tu écrirais alors g(t) ! Souvent, en physique, on utilise v(t) pour la Vitesse en fonction du Temps !"
            },
            {
              question: "Quelle est la différence entre y et f(x) sur un graphique ?",
              answer: "C'est la même chose ! L'axe des ordonnées s'est historiquement appelé l'axe des 'y'. Mais quand on s'est mis à tracer des Fonctions dessus, 'f(x)' est devenu l'occupant de 'y'. Tu peux lire y = f(x)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans un tableau de valeurs, où lit-on généralement les Images ?",
              options: [
                "Sur la première ligne (celle des x).",
                "Sur la deuxième ligne (celle des f(x)).",
                "En faisant la somme des deux lignes.",
                "Dans le titre du tableau."
              ],
              correctAnswer: 1,
              explanation: "Les images se trouvent sous les antécédents, sur la ligne des résultats de la fonction f(x)."
            },
            {
              question: "Je lis l'information : f(-3) = 9. Quelle phrase est correcte ?",
              options: [
                "L'image de 9 est -3.",
                "L'antécédent de -3 est 9.",
                "L'image de -3 est 9."
              ],
              correctAnswer: 2,
              explanation: "La machine mange le -3 de la parenthèse et recrache le résultat de l'autre côté du signal égal ! Donc 9 est l'image qu'on a obtenu en donnant -3. L'image (le reflet final) de -3 est 9."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Anté-cédent = Avant (Ligne des x).",
            "Je sais calculer l'image d'un nombre en remplaçant 'x' dans la formule.",
            "Je comprends qu'un nombre peut être créé (image) par plusieurs x différents."
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

export default Course_College_3eme_03_Fonctions;
