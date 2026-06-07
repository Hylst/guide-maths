import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Target, Shuffle, Split, ListOrdered, GitBranch } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_11_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-11"
        title="Probabilités à 2 Épreuves (Ninja)"
        subtitle="Entrez dans la matrice des univers parallèles !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Probabilités simples (Loi de base)", "Additionner et multiplier des fractions"]}
        objectives={[
          "Différencier Événements Indépendants et Dépendant (Avec ou Sans remise).",
          "Construire et lire un Arbre de Probabilités Pondéré.",
          "Multiplier les branches pour trouver la probabilité d'un chemin.",
          "Additionner les chemins quand plusieurs scénarios gagnent."
        ]}
      />

      <Section title="🌟 Introduction : L'effet Papillon" icon="🦋" color="slate">
        <p>
          Au chapitre précédent, nous avons appris à jeter UN seul dé ou tirer UNE seule carte. C'était "L'Univers à 1 dimension". <br/>
          Mais dans la vie réelle (ou au Loto), le destin se joue en "Chaîne" : tu tires une boule, PUIS tu en tires une autre. 
        </p>
        <p className="mt-4">
          Comment les probabilités se calculent-elles quand les univers s'enchaînent ? C'est le monde des <strong>Épreuves Composées</strong> et des fameux <em>Arbres de Probabilités</em>.
        </p>
      </Section>

      <Section title="1. Indépendance vs Avec/Sans Remise" icon="🔄" color="indigo">
        <p className="mb-4">Le plus grand piège des probabilités n'est pas le calcul, mais la lecture de l'énoncé. L'univers change-t-il entre le coup N°1 et le coup N°2 ?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 shadow-sm">
               <h4 className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-3 flex items-center gap-2">
                 <Shuffle className="w-5 h-5"/> Indépendant (OU "Avec Remise")
               </h4>
               <p className="text-sm mb-4">Le premier événement <strong>n'a aucune influence</strong> sur le second.</p>
               <ul className="text-sm space-y-2 mb-4 font-medium text-emerald-900 dark:text-emerald-100">
                 <li>Ex : Lancer une pièce deux fois (La pièce n'a pas de mémoire).</li>
                 <li>Ex : Tirer une boule, regarder sa couleur, <strong>et la RETTRE</strong> dans l'urne.</li>
               </ul>
               <div className="bg-emerald-100 dark:bg-emerald-800/50 p-2 rounded text-center font-bold">
                 L'univers total RESTE LE MÊME.
               </div>
           </div>
           
           <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800/60 dark:border-rose-800 shadow-sm">
               <h4 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 mb-3 flex items-center gap-2">
                 <Split className="w-5 h-5"/> Dépendant (OU "Sans Remise")
               </h4>
               <p className="text-sm mb-4">L'univers est <strong>DÉTRUIT et MODIFIÉ</strong> par les actions passées.</p>
               <ul className="text-sm space-y-2 mb-4 font-medium text-rose-900 dark:text-rose-100">
                 <li>Ex : Piocher une carte, et la <strong>GARGER</strong> dans sa main.</li>
                 <li>Ex : Tirer une boule, et la MANGER (Si c'est un bonbon).</li>
               </ul>
               <div className="bg-rose-100 dark:bg-rose-800/50 p-2 rounded text-center font-bold">
                 L'univers total DÉMINUE d'un élément !
               </div>
           </div>
        </div>
      </Section>

      <Section title="2. Construire l'Arbre Magique" icon="🌲" color="blue">
        <p className="mb-4">Pour ne pas se perdre dans les univers parallèles, on construit une "Matrice" visuelle : l'Arbre Pondéré.</p>
        
        <div className="bg-card p-6 rounded-2xl border border-border-strong border-l-8 border-sky-500 shadow-sm my-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <GitBranch className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-48 h-48 text-sky-500/10" />
           <div className="flex-1 z-10">
              <h3 className="font-bold text-sky-600 dark:text-sky-400 text-lg mb-4">Règles de l'Arbre Parfait</h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-2">
                   <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">1</span>
                   <div>
                     <strong>Les Nœuds</strong> : C'est le moment où le temps se divise (le tirage).
                   </div>
                 </li>
                 <li className="flex items-start gap-2">
                   <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">2</span>
                   <div>
                     <strong>Les Branches</strong> : C'est le destin possible (Rouge, Bleu, etc). <strong>On accroche une Fraction (le Poids) au milieu de chaque branche !</strong>
                   </div>
                 </li>
                 <li className="flex items-start gap-2">
                   <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">3</span>
                   <div>
                     <strong>La Loi du Nœud</strong> : La somme des fractions qui partent d'UN SEUL NŒUD doit TOUJOURS faire 1 (100% de l'univers).
                   </div>
                 </li>
               </ul>
           </div>
        </div>
      </Section>

      <Section title="3. Règle #1 : Le Multiplicateur de Destin (Horizontal)" icon="✖️" color="amber">
        <p className="mb-4">Tu veux savoir quelles sont tes chances d'arriver <strong>au bout d'un Chemin bien précis</strong> (Exemple : "Avoir obtenu d'abord une boule Rouge, PUIS encore une boule Rouge"). <br/>La règle est d'une violence mathématique implacable :</p>

        <div className="bg-amber-100 dark:bg-amber-900/40 p-6 rounded-2xl border border-amber-300 dark:border-amber-700 text-center shadow-inner mb-6">
           <p className="font-serif font-black text-2xl text-amber-900 dark:text-amber-100 dark:text-amber-200 mb-2">"LE LONG D'UN CHEMIN, ON MULTIPLIE."</p>
           <p className="font-mono text-sm">P(Rouge ET Rouge) = P(Rouge au T1) <MathComponent math={"\\times"} /> P(Rouge au T2)</p>
        </div>

        <InteractiveExercise 
          title="L'urne de base (Sans remise)"
          question={<>L'urne a <strong>3 Rouges et 2 Bleues</strong> (5 au total). Je tire DEUX boules <strong>SANS REMISE</strong>. Quelle est la chance de faire "Rouge puis Rouge" ?</>}
          steps={[
            <><strong>Tirage 1 :</strong> Quelle est l'épreuve ? J'ai 3 Rouges sur 5 Boules. La branche R1 porte la fraction : <strong><MathComponent math={"3/5"} /></strong>.</>,
            <><strong>Tirage 2 (Attention !) :</strong> On est <em>Sans Remise</em>. J'ai volé une Rouge ! L'univers a changé. Il ne reste que <strong>2 Rouges</strong> et l'urne n'a plus que <strong>4 Boules</strong> au total !</>,
            <>La branche R2 (partant de R1) portera la fraction : <strong><MathComponent math={"2/4"} /></strong> (qui se réduit en <MathComponent math={"1/2"} />).</>,
            <><strong>Le Chemin Global :</strong> On mutliplie ! <><MathComponent math={"\\frac{3}{5} \\times \\frac{1}{2} ="} />{" "}</><strong><><MathComponent math={"\\frac{3}{10}"} /></></strong> (Soit 30%).</>
          ]}
        />
      </Section>

      <Section title="4. Règle #2 : L'Addition des Mondes (Vertical)" icon="➕" color="emerald">
        <p className="mb-4">Parfois, l'énoncé dit : "Quelle est la probabilité d'avoir <strong>une boule de chaque couleur</strong> ?". Cela n'indique pas l'ordre ! Tu as donc DEUX chemins vainqueurs : "Rouge PUIS Bleu" <strong>OU BIEN</strong> "Bleu PUIS Rouge".</p>

        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-6 rounded-2xl border border-emerald-300 dark:border-emerald-700 text-center shadow-inner mb-6">
           <p className="font-serif font-black text-2xl text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-2">"ON AJOUTE LES CHEMINS GAGNANTS."</p>
           <p className="font-mono text-sm">(Chemin A) + (Chemin B)</p>
        </div>
        
        <InfoBlock title="Astuce Absolue : L'événement Contraire ultime" type="warning">
           L'énoncé de l'angoisse demande : <em>"Probabilité d'avoir <strong>AU MOINS UNE</strong> boule rouge ?"</em>.<br/>
           Calculer tous les mondes avec une rouge est super long ! <br/>
           Astuce Ninja : Calcule l'opposé (le pire des cas) = "ZÉRO Boule rouge" (soit <em>Que des bleues</em>).<br/>
           Puis tu l'enlèves de <MathComponent math={"1"} /> !<br/>
           <strong>P(Au moins 1 Rouge) = 1 - P(Que du Bleu)</strong>.
        </InfoBlock>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Vrai ou Faux : À la fin de mon grand arbre pondéré, si j'additionne tous les résultats de TOUTES LES EXTÉMITÉS finalisées des chemins, je trouve 1.</>}
            back={<><strong>VRAI ABSOLU !</strong><br/>La somme de tous les chemins d'un arbre représente 100% de la matrice. C'est le moyen parfait de vérifier si tu ne t'es pas trompé dans tes fractions au contrôle.</>}
          />
          <Flashcard 
            front={<>Le "Et" et le "Ou". Quel est la traduction en Math avec les signes d'opération ?</>}
            back={<>Le <strong>"ET"</strong> se traduit par <strong><MathComponent math={"\\times"} /> (Multiplier)</strong> (Je veux tirer Rouge ET Rouge, je suis le chemin).<br/><br/>Le <strong>"OU"</strong> se traduit par <strong><MathComponent math={"+"} /> (Additionner)</strong> (Je veux le chemin R-R OU le chemin B-B, je les ajoute).</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Dois-je simplifier les fractions sur chaque branche de l'arbre avant de multiplier ?",
              answer: "Ce n'est pas obligatoire, et au contraire ça peut causer des erreurs ! Sur un arbre, on aime bien garder le 'dénominateur' brut (exemple: 42/50 et 8/50) car on voit tout de suite l'univers, et ça rend les additions de fin de chemin beaucoup plus faciles car les fractions auront le même dénominateur !"
            },
            {
              question: "Si l'énoncé dit 'A et B', est-ce que ça veut toujours dire Intersection ou Arbre ?",
              answer: "Attention, si l'énoncé dit 'A et B' en même temps (ex: Carte Rouge ET As, soit l'As de Coeur et de Carreau), tu n'as pas besoin d'un Arbre à 2 étapes. L'arbre est réservé CHRONOLOGIQUEMENT : il y a une épreuve (je tire une boule), PUIS une autre épreuve après."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Je lance un dé classique (1 à 6). Je lance une pièce de monnaie (Pile ou Face). Quelle est l'épreuve globale pour de l'Indépendant ou du Dépendant ?",
              options: [
                "Totalement Indépendant (La pièce s'en fiche du dé !). L'Univers n'est pas modifié d'une branche à l'autre.",
                "Dépendant (Car les deux univers se croisent).",
                "Cela dépend si on a vu le dé tomber en premier."
              ],
              correctAnswer: 0,
              explanation: "Top ! Lancer deux objets non connectés génère toujours des événements Parfaitement Indépendants."
            },
            {
              question: "Un sac posséde 2 boules Vertes et 8 Noires. L'évènement A est : 'Tirer Noir puis Vert' (AVEC Remise). Quel est le calcul du chemin A ?",
              options: [
                "8/10 + 2/10",
                "8/10 × 2/9",
                "8/10 × 2/10"
              ],
              correctAnswer: 2,
              explanation: "Bien joué ! L'arbre nous demande de MUTLIPLIER (+ = faux). Et c'était marqué 'AVEC Remise', ce qui veut dire que la boule est retournée, l'univers est resté le même. Donc 8/10 multiplié par 2/10 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Horizontale = Je multiplie mon chemin vers l'objectif.",
            "Vertical = J'additionne TOUS mes chemins qui m'amènent à la même victoire.",
            "L'évènement de désespoir 'Au moins un' = Je fais (1 - l'évènement inverse exclusif)."
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

export default Course_College_3eme_11_Probabilites;
