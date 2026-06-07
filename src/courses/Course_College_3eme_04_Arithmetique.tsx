import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { ShieldCheck, Lock } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_04_Arithmetique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-04"
        title="Arithmétique et Nombres Premiers"
        subtitle="Décodez les messages secrets comme un expert en cryptographie !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Les tables de multiplication", "Les critères de divisibilité (2, 3, 5, 9, 10)", "La division euclidienne"]}
        objectives={[
          "Comprendre les multiples et les diviseurs.",
          "Identifier les nombres premiers (les briques élémentaires).",
          "Décomposer un nombre en produit de facteurs premiers.",
          "Rendre une fraction irréductible grâce à la décomposition."
        ]}
      />

      <Section title="🌟 Introduction : Le Bouclier Numérique" icon="🛡️" color="slate">
        <p>
          Sais-tu comment l'armée ou les banques arrivent à protéger tes données sur Internet face aux plus grands hackers du monde ? Ils utilisent le <strong>"bouclier magique d'acier"</strong> : les nombres premiers !!
        </p>
        <p className="mt-4">
          Un nombre premier est le <em>bloc de diamant absolu</em> des mathématiques. C'est un nombre "incassable" (indivisible) en morceaux plus petits d'entiers. Tu ne peux le diviser par rien, à part 1 ou lui-même. Aujourd'hui, tu vas devenir un ingénieur décodeur et apprendre à fracasser les nombres complexes pour en extraire ces diamants purs.
        </p>
      </Section>

      <Section title="1. Diviseurs et Multiples" icon="🔢" color="indigo">
        <p className="mb-4">Tout commence par la division euclidienne (sans virgule !). Si le reste de la division d'un nombre A par un nombre B est ZÉRO, la magie s'opère :</p>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row items-center justify-center gap-6 my-6">
          <div className="text-center font-mono text-xl md:text-2xl font-bold text-foreground">
            24 ÷ 3 = 8 <br/><span className="text-sm text-muted-text">(Reste 0)</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-border"></div>
          <div className="text-left space-y-2 text-indigo-900 dark:text-indigo-100 font-medium">
            <p>On peut donc dire :</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>24 est un <strong>multiple</strong> de 3 (et de 8).</li>
              <li>3 est un <strong>diviseur</strong> de 24.</li>
              <li>24 est <strong>divisible</strong> par 3.</li>
            </ul>
          </div>
        </div>

        <TipBanner title="Rappel Vital : Les Critères de Divisibilité" type="info">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
            <li><strong>Par 2 :</strong> Se termine par 0, 2, 4, 6, 8 (pairs).</li>
            <li><strong>Par 3 :</strong> La somme des chiffres est dans la table de 3 (ex: 123 {'->'} 1+2+3=6 = oui).</li>
            <li><strong>Par 5 :</strong> Se termine par 0 ou 5.</li>
            <li><strong>Par 9 :</strong> La somme des chiffres est dans la table de 9.</li>
            <li><strong>Par 10 :</strong> Se termine par 0.</li>
          </ul>
        </TipBanner>
      </Section>

      <Section title="2. Les Nombres Premiers (Diamants bruts)" icon="💎" color="rose">
        <div className="bg-card p-6 rounded-2xl border border-border-strong mb-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>
          <Lock className="absolute top-6 right-6 w-8 h-8 text-rose-500 opacity-20" />
          <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-2">Définition Officielle</h3>
          <p className="text-lg text-foreground font-medium">Un nombre est dit "premier" s'il possède <strong>EXACTEMENT DEUX</strong> diviseurs distincts : 1 et lui-même.</p>
        </div>

        <InfoBlock title="Le cas tragique du nombre 1 !" type="warning">
          Le nombre 1 n'a <strong>QU'UN SEUL</strong> diviseur (lui-même). Il ne respecte donc pas la règle des "exactement deux diviseurs". Le nombre 1 <strong>N'EST PAS</strong> un nombre premier !
        </InfoBlock>

        <p className="mt-8 mb-4">Voici la liste sacrée des premiers nombres premiers que tu DOIS connaître par cœur (comme l'alphabet ou tes tables) :</p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[2, 3, 5, 7, 11, 13, 17, 19, 23, 29].map((n) => (
            <div key={n} className="w-12 h-12 flex items-center justify-center bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100 dark:text-rose-200 rounded-xl font-bold font-mono text-xl shadow-sm border border-rose-100 dark:border-rose-800/60 dark:border-rose-800/50">
              {n}
            </div>
          ))}
          <div className="w-12 h-12 flex items-center justify-center text-rose-500/50 font-bold text-xl">...</div>
        </div>
      </Section>

      <Section title="3. L'Arme Fatale : La Décomposition" icon="⚒️" color="amber">
        <p className="mb-4">Théorème fondamental de l'arithmétique : <strong>Tout nombre entier peut se casser (se décomposer) en un produit de nombres premiers. Cette recette est UNIQUE !</strong></p>
        
        <p className="mb-6 text-muted-text">Pour casser un nombre, on va essayer de le diviser par les nombres premiers dans l'ordre croissant (2, puis 3, puis 5, etc.) jusqu'à ce qu'il ne reste que 1.</p>

        <InteractiveExercise 
          title="Le Concassage du nombre 60"
          question={<>Trouvons l'ADN pur (la décomposition en nombres premiers) du nombre <strong>60</strong>.</>}
          steps={[
            <>On se demande : <em>Est-ce que 60 se divise par le premier diamant (2) ?</em><br/>Ses terminaisons (0) disent OUI. On casse : <strong><MathComponent math={"60 \\div 2 = 30"} /></strong>.</>,
            <>Est-ce que 30 se divise encore par 2 ? OUI. <br/>On casse : <strong><MathComponent math={"30 \\div 2 = 15"} /></strong>.</>,
            <>Est-ce que 15 se divise encore par 2 ? NON. (Il finit par 5).<br/>On passe au diamant suivant (3). Est-ce que 15 est dans la table de 3 (1+5=6) ? OUI. <br/>On casse : <strong><MathComponent math={"15 \\div 3 = 5"} /></strong>.</>,
            <>Est-ce que 5 se divise par 3 ? NON. <br/>On passe au diamant suivant (5). Est-ce que 5 se divise par 5 ? OUI. <br/>On casse : <strong><MathComponent math={"5 \\div 5 = 1"} /></strong>.</>,
            <>On a touché le fond (1). L'opération est terminée !</>,
            <>Le code génétique de 60 est le rassemblement de tous les diviseurs qu'on a utilisé : <br/><span className="text-amber-600 dark:text-amber-400 font-mono text-xl font-bold"><MathComponent math={"60 = 2 \\times 2 \\times 3 \\times 5"} /></span><br/>(ou avec les puissances : <strong><MathComponent math={"60 = 2^2 \\times 3 \\times 5"} /></strong>).</>
          ]}
        />
      </Section>

      <Section title="4. Rendre une Fraction Irréductible" icon="🗡️" color="emerald">
        <p className="mb-4">Le grand pouvoir de la décomposition, c'est de détruire instantanément les fractions monstrueuses au brevet sans se fatiguer la tête.</p>

        <div className="bg-muted dark:bg-slate-900/30 p-6 rounded-[2rem] border border-border-strong my-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="font-mono text-2xl font-bold">126</span>
              <div className="w-16 h-0.5 bg-foreground my-2"></div>
              <span className="font-mono text-2xl font-bold">180</span>
            </div>
            
            <div className="text-3xl font-bold text-muted-text">→</div>
            
            <div className="flex flex-col items-center">
              <span className="font-mono text-lg font-bold"><span className="line-through text-rose-500 mr-1 opacity-70">2</span> × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × 7</span>
              <div className="w-32 h-0.5 bg-foreground my-2"></div>
              <span className="font-mono text-lg font-bold"><span className="line-through text-rose-500 mr-1 opacity-70">2</span> × 2 × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × 5</span>
            </div>

            <div className="text-3xl font-bold text-muted-text">→</div>

            <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
              <span className="font-mono text-3xl font-black">7</span>
              <div className="w-12 h-1 bg-current my-2"></div>
              <span className="font-mono text-3xl font-black">10</span>
            </div>
          </div>
          <p className="text-center mt-6 text-sm text-muted-text font-medium bg-background p-3 rounded-xl shadow-sm border border-border-strong inline-block mx-auto">
            Astuce : On supprime tous les nombres premiers présents <strong>en haut ET en bas</strong> (ceux qui s'annulent) en même temps. La fraction restante est garantie irréductible.
          </p>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le nombre 9 est-il un nombre premier ?</>}
            back={<><strong>NON !</strong><br/>Il a 3 diviseurs : 1, 3, et 9. (Puisque <MathComponent math={"3 \\times 3 = 9"} />). Pour être un nombre premier pur, il ne lui en faut que deux.</>}
          />
          <Flashcard 
            front={<>Si la somme des chiffres d'un nombre entier fait 15. Par quoi est-il divisible sûrement ?</>}
            back={<><strong>Par 3 !</strong><br/>Car 15 fait partie de la table de 3. C'est le critère de divisibilité de 3.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les nombres premiers s'arrêtent au-delà de 29 dans votre liste ?",
              answer: "Ils ne s'arrêtent jamais ! Les nombres premiers vont vers l'infini (31, 37, 41, 43, 47...). A l'heure actuelle, les plus grands ordinateurs du monde continuent de découvrir de nouveaux nombres premiers gigantesques (des millions de chiffres de long) pour la cryptographie d'Internet."
            },
            {
              question: "Est-ce que je peux décomposer un nombre en faisant des bonds ? Par exemple attaquer directement en le divisant par 5 ?",
              answer: "Oui, ce n'est pas interdit ! L'ordre de division ne changera JAMAIS le résultat final (c'est l'ADN unique de ton nombre). Cependant, la méthode la plus sûre de ne rien rater au contrôle est toujours de tester le petit diamant 2 d'abord pour tout essorer, puis le 3, puis le 5..."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est l'unique nombre premier qui soit PAIR ?",
              options: [
                "1",
                "2",
                "4",
                "Il n'y en a aucun."
              ],
              correctAnswer: 1,
              explanation: "Le nombre 2 est le SEUL et unique nombre premier pair au monde ! Tous les autres nombres pairs (4, 6, 8, 10...) peuvent évidemment se diviser par 2, donc ils ne sont jamais premiers !"
            },
            {
              question: "La décomposition en produit de facteur premier d'un nombre donne $2 \\times 3^2 \\times 5$. Quel est ce nombre ?",
              options: [
                "30",
                "60",
                "90"
              ],
              correctAnswer: 2,
              explanation: "Régénérons l'ADN : $2 \\times 3^2 \\times 5 = 2 \\times 9 \\times 5$. J'associe le 2 et le 5 pour faire 10 ! (2×5 = 10). Ensuite, 10 × 9 = 90 ! C'est le nombre 90."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Le chiffre 1 n'est PAS un nombre premier.",
            "Je connais les nombres [ 2, 3, 5, 7, 11, 13, 17, 19 ] par cœur.",
            "Je sais casser un nombre sous forme d'un produit (Des multiplications X ! Pas des additions + !)."
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

export default Course_College_3eme_04_Arithmetique;
