import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Scale, RotateCcw, ArrowRightFromLine, Scissors } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_4eme_02_Equations: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-02"
        title="Les Équations du 1er Degré"
        subtitle="Apprends l'art mortel de la Balance algébrique !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Calcul littéral de 5ème", "Nombres relatifs"]}
        objectives={[
          "Comprendre qu'une équation est une Balance d'égalité.",
          "Savoir isoler l'inconnue 'x' en utilisant les opérations inverses.",
          "Résoudre une équation simple (le type ax + b = c).",
          "Mettre un problème de la vie courante en équation."
        ]}
      />

      <Section title="🌟 Introduction : Le Poids du Trésor" icon="💰" color="slate">
        <p>
          Si je te donne une boîte fermée, tu ne peux pas l'ouvrir sur une balance avec un poids de 5 kg à côté. Toutefois, la balance affiche une égalité parfaite avec un bloc de 13 kg de l'autre côté. 
        </p>
        <p className="mt-4">
          Tu peux alors mathématiquement en deviner l'intérieur par déduction ! L'équation c'est ça : <strong>Boîte + 5kg = 13kg</strong>. Le but ultime est d'isoler la "Boîte" (la lettre <strong className="text-sky-600 dark:text-sky-400">x</strong>) de son côté de la balance.
        </p>
      </Section>

      <Section title="1. La Règle d'Or de l'Univers" icon="⚖️" color="indigo">
        <p className="mb-4">Il n'y a qu'UNE SEULE RÈGLE pour résoudre toutes les équations du monde.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm text-center my-6">
           <Scale className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
           <p className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
             "Tout ce que tu fais d'un côté de la balance,<br/>tu DOIS le faire de l'autre côté."
           </p>
           <p className="mt-4 text-muted-text">
             Si tu enlèves 3 kg à gauche, la balance penche et erreur de calcul ! Tu dois immédiatement enlever 3 kg à droite pour conserver l'équilibre mortel du signe <strong>ÉGAL (=)</strong>.
           </p>
        </div>
      </Section>

      <Section title="2. Les Boucliers et L'Anti-Matière (Isoler x)" icon="🗡️" color="blue">
        <p className="mb-4">Pour laisser la lettre <MathComponent math={"x"} /> complètement seule, tu dois utiliser l'opération INVERSE (l'Anti-Matière) du nombre qui la gêne.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-card p-6 rounded-2xl border-l-4 border-l-sky-500 shadow-sm">
              <h4 className="font-bold flex items-center gap-2 mb-2"><RotateCcw className="w-4 h-4 text-sky-500"/> Détruire une Addition</h4>
              <p className="font-mono bg-muted p-2 rounded block w-full mb-2">x + 5 = 12</p>
              <p className="text-sm">Le '+5' gêne ! L'anti-matière de '+5', c'est '-5'.</p>
              <p className="font-mono font-bold text-sky-600 mt-2">x = 12 - 5 <br/> x = 7</p>
           </div>
           
           <div className="bg-card p-6 rounded-2xl border-l-4 border-l-rose-500 shadow-sm">
              <h4 className="font-bold flex items-center gap-2 mb-2"><RotateCcw className="w-4 h-4 text-rose-500"/> Détruire une Multiplication</h4>
              <p className="font-mono bg-muted p-2 rounded block w-full mb-2">4x = 20</p>
              <p className="text-sm">Rappel : '4x' veut dire '4 multiplié par x'. L'anti-matière de la multiplication, c'est la DIVISION.</p>
              <p className="font-mono font-bold text-rose-600 dark:text-rose-400 mt-2">x = 20 / 4 <br/> x = 5</p>
           </div>
        </div>
      </Section>

      <Section title="3. L'Ordre Ninja (Équation Type ax + b = c)" icon="⚔️" color="emerald">
        <p className="mb-4">Dans <span className="font-mono font-bold">2x + 7 = 15</span>, il y a deux gêneurs : le '2' (collé en multiplication) et le '+7' (en addition). Quel monstre tuer en premier ?</p>
        
        <TipBanner title="Le théorème de l'Oignon" type="warning">
           On enlève TOUJOURS ce qui est LE PLUS LOIN du 'x' en premier (les constantes solitaires comme le +7). On termine TOUJOURS par arracher la sangsue collée sur la peau (le facteur ×2).
        </TipBanner>

        <InteractiveExercise 
          title="Le Grand Duel"
          question={<>Résoudre l'équation : <strong className="font-mono text-xl">3x - 4 = 11</strong></>}
          steps={[
            <><strong>1. Virer la garde rapprochée :</strong> Le "-4" doit disparaître en premier. Je fais <strong>+4</strong> des DEUX CÔTÉS.</>,
            <>L'équation devient : <span className="font-mono">3x = 11 + 4</span></>,
            <><span className="font-mono">3x = 15</span></>,
            <><strong>2. Trancher la tête :</strong> Le "3" bloque le 'x' (c'est 3 FOIS x). Je <strong>DIVISE</strong> par 3 des DEUX CÔTÉS.</>,
            <>L'équation devient : <span className="font-mono">x = 15 ÷ 3</span></>,
            <><strong>Victoire Finale :</strong> <span className="font-black text-emerald-600 dark:text-emerald-400 text-xl font-mono">x = 5</span></>
          ]}
        />
      </Section>

      <Section title="4. Mettre en équation (Le traducteur)" icon="🗣️" color="amber">
        <p className="mb-4">Le Brevet ne donnera pas de 'x', il donnera un problème en Mots Francais ! Tu dois traduire !</p>
        
        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-800/60 dark:border-amber-800 my-6 shadow-sm">
           <h3 className="font-bold text-lg mb-4">"Trouve un nombre tel que son triple augmenté de 5 donne 26."</h3>
           <ul className="space-y-3 font-mono">
              <li className="flex items-center"><ArrowRightFromLine className="w-4 h-4 mr-2 text-amber-500"/> 'un nombre' ➔ <strong className="ml-2 text-sky-500">x</strong></li>
              <li className="flex items-center"><ArrowRightFromLine className="w-4 h-4 mr-2 text-amber-500"/> 'son triple' ➔ <strong className="ml-2 text-sky-500">3x</strong></li>
              <li className="flex items-center"><ArrowRightFromLine className="w-4 h-4 mr-2 text-amber-500"/> 'augmenté de 5' ➔ <strong className="ml-2 text-sky-500">+ 5</strong></li>
              <li className="flex items-center"><ArrowRightFromLine className="w-4 h-4 mr-2 text-amber-500"/> 'donne' ➔ <strong className="ml-2 text-sky-500">=</strong></li>
           </ul>
           <div className="mt-6 bg-card dark:bg-black/30 p-3 rounded text-center border shadow-inner">
             <span className="font-black text-xl text-amber-700 dark:text-amber-300">3x + 5 = 26</span>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le 'x' est au numérateur ! <br/><span className="font-mono">x / 5 = 10</span><br/>Quelle est l'opération d'anti-matière ?</>}
            back={<>L'anti-matière de la division, c'est la MULTIPLICATION !<br/>Donc je mutliplie par 5 des deux côtés.<br/>$x = 10 \\times 5 = \\mathbf{50}$</>}
          />
          <Flashcard 
            front={<>Si à la fin j'obtiens <span className="font-mono">-x = 8</span>, est-ce fini ?</>}
            back={<><strong>NON !</strong><br/>On ne laisse jamais une lettre sale et négative. '-x' veut dire '-1 multiplié par x'. Je passe le signe de l'autre côté en divisant par (-1).<br/><strong>x = -8</strong></>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai des 'x' de chaque côté, genre 5x = 2x + 9, je fais quoi ?",
              answer: "On fait fuir les intrus ! Tu ramènes tous les membres de la famille 'x' d'un seul côté, comme des moutons, par des additions et des soustractions de bloc ENTIER. Ici tu veux virer le bloc '2x' de la droite. Donc tu fais '-2x' des deux côtés ! Ca fait (5x - 2x) = 9... Soit 3x = 9 ! Résolu."
            },
            {
              question: "Comment je vérifie au brevet pour le 20/20 garanti ?",
              answer: "Une équation se VERIFIE TOUJOURS. Si ton équation c'était 2x - 1 = 5, et que tu as trouvé x=3. Tu reprends ta calculette, et tu tapes 2×(3) - 1. Est ce que ca fait bien le 5 de droite ? OUI ! Ton 20/20 est sécurisé sur ta feuille avant même d'avoir rendu la copie."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la première opération à faire pour résoudre 5x - 8 = 10 ?",
              options: [
                "Je divise par 5 des deux côtés.",
                "Je fais +8 des deux côtés.",
                "Je fais -8 des deux côtés."
              ],
              correctAnswer: 1,
              explanation: "Génial ! Le théorème de l'Oignon : on tue la constante en premier. Pour détruire un '-8', je dois propulser un projectile '+8' des DEUX CÔTÉS de la balance !"
            },
            {
              question: "Résous cette équation violente : x/2 + 10 = 20",
              options: [
                "x = 5",
                "x = 10",
                "x = 20"
              ],
              correctAnswer: 2,
              explanation: "Top ! Etape 1 : je fais -10. Il me reste (x/2 = 10). Etape 2 : je multiplie par 2 pour détruire le Divisé-par-2 ! Donc 10 * 2 = 20 ! (Vérification : la MOITIÉ de 20 est 10. 10+10 = 20 ! C'est Parfait)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de Fer : Je soustrais d'un côté, je soustrais de la MÊME VALEUR de l'autre.",
            "Addition détruit Soustraction. Multiplication détruit Division.",
            "Toujours faire le ménage des constantes et regrouper les 'x' avant de Diviser."
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

export default Course_College_4eme_02_Equations;
