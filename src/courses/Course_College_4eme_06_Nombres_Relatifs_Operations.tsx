import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Thermometer, CreditCard, Crosshair, ArrowRightLeft } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_4eme_06_Nombres_Relatifs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-06"
        title="Nombres Relatifs et Opérations"
        subtitle="Dettes ou Bénéfices ? Maîtriser le chaud et le froid !"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Somme et Différence (5ème)"]}
        objectives={[
          "Mémoriser la fameuse 'Règle des Signes' sans hésiter.",
          "Comprendre pourquoi un Moins et un Moins donnent un Plus en Mutliplication.",
          "Enchaîner de longues séries d'additions/soustractions (La Banque).",
          "Détruire les calculs combinant les quatre opérations (Ordre de Priorité)."
        ]}
      />

      <Section title="🌟 Introduction : Le Zéro n'est plus le mur" icon="🧱" color="slate">
        <p>
          Au primaire, le Zéro était le mur infranchissable. On ne pouvait pas faire '3 - 5'. Au collège, tu découvres que derrière le mur, il y a le grand désert de la température glaciale, le royaume du découvert bancaire.
        </p>
        <p className="mt-4">
          Dans ce cours, les additions et soustractions classiques de 5ème vont rencontrer leurs cousines mortelles : la Multiplication et la Division des entités négatives. C'est l'un des chapitres où les erreurs d'inattention coûtent le plus de points au brevet !
        </p>
      </Section>

      <Section title="1. La Règle d'Or de L'Épée et du Bouclier (Multiplication/Division)" icon="⚔️" color="rose">
        <p className="mb-4">Contrairement à l'addition, la Multliplication a des lois fixes très brutales. Oublie les 'j'ai plus de dettes donc c'est moins'. Ici la fusion dicte la loi.</p>
        
        <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800/60 dark:border-rose-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl shadow-sm text-center">
              <h3 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 mb-2">Les AMIS (Signes Identiques)</h3>
              <p className="text-sm text-muted-text mb-4">L'ennemi de mon ennemi est mon Ami.</p>
              <div className="font-mono text-lg font-bold border-l-4 border-emerald-500 pl-4 py-2">
                (+) <MathComponent math={"\\times"} /> (+) = <span className="text-emerald-500">(+)</span><br/>
                (-) <MathComponent math={"\\times"} /> (-) = <span className="text-emerald-500">(+)</span>
              </div>
           </div>
           
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl shadow-sm text-center">
              <h3 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 mb-2">Les ENNEMIS (Signes Différents)</h3>
              <p className="text-sm text-muted-text mb-4">L'ennemi de mon ami est mon Ennemi.</p>
              <div className="font-mono text-lg font-bold border-l-4 border-rose-500 pl-4 py-2">
                (+) <MathComponent math={"\\times"} /> (-) = <span className="text-rose-500">(-)</span><br/>
                (-) <MathComponent math={"\\times"} /> (+) = <span className="text-rose-500">(-)</span>
              </div>
           </div>
        </div>

        <TipBanner title="Le théorème des Divisions" type="success">
           La division, c'est l'arme jumelle de la multiplication. Elle obéit EXACTEMENT MIEUX ! <br/>
           <><MathComponent math={"(-15) \\div (-3) = \\mathbf{+5}"} /></> (Moins et Moins : Plus !)
        </TipBanner>
      </Section>

      <Section title="2. Les chaînes de frappe (Produits multiples)" icon="⛓️" color="blue">
        <p className="mb-4">Si tu affrontes un long dragon de multiplication du genre : <><MathComponent math={"(-2) \\times 3 \\times (-1) \\times (-5) \\times 2"} /></>, tu ne dois surtout pas calculer petit à petit de gauche à droite.</p>

        <InteractiveExercise 
          title="L'Assassinat du Signe Global"
          question={<>Trouve le signe FINAL de l'opération : <><MathComponent math={"(-2) \\times (-3) \\times (-4) \\times 5 \\times (-1)"} /></></>}
          steps={[
            <><strong>Stratégie Ninja :</strong> On ignore les chiffres et les '+'. On ne compte QUE le nombre de signes MOINS (-).</>,
            <>Je compte : Un moins devant le 2, devant le 3, devant le 4, devant le 1... <strong>Total = 4 signes Négatifs.</strong></>,
            <><strong>La Loi des Pairs :</strong> <br/>- Si le compte est PAIR (2, 4, 6, 8...) &rarr; Résultat final <strong>POSITIF (+)</strong>.<br/>- Si le compte est IMPAIR (1, 3, 5, 7...) &rarr; Résultat final <strong>NÉGATIF (-)</strong>.</>,
            <>4 est Pair ! Les 'moins' s'accouplent par 2 et se neutralisent en 'plus'. Le résultat final de ce long dragon sera <strong>POSITIF !</strong> (Ensuite on fait 2×3×4×5×1=120. Magie !)</>
          ]}
        />
      </Section>

      <Section title="3. La terrible vérité (Ne confonds pas Addition et Multliplication)" icon="🚨" color="amber">
        <p className="mb-4">L'erreur qui foudroie 90% des élèves au brevet arrive ici. L'horrible confusion des règles.</p>
        
        <div className="space-y-4 font-mono font-bold my-6 max-w-lg mx-auto">
           <div className="bg-card border-x-4 border-rose-500 p-4 rounded shadow">
             <span className="text-rose-500 text-sm block mb-1">Addition (La Banque en faillite)</span>
             <><MathComponent math={"-5 - 8 = \\mathbf{-13}"} /></><br/>
             <span className="text-xs font-sans text-muted-text font-normal">Je dois 5€, je creuse une nouvelle dette de 8€. J'ai une ÉNORME dette de -13€. Ne dis JAMAIS 'Moins par Moins fait Plus' ici !! Il n'y a pas de signe Fois !!</span>
           </div>
           
           <div className="bg-card border-x-4 border-emerald-500 p-4 rounded shadow mt-4">
             <span className="text-emerald-500 text-sm block mb-1">Multiplication (L'Arme du Chaos)</span>
             <><MathComponent math={"-5 \\times (-8) = \\mathbf{+40}"} /></><br/>
             <span className="text-xs font-sans text-muted-text font-normal">Ici c'est la règle d'or ! Signes amis, résultat Positif puissant.</span>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Calcule le piège de la pieuvre : <><MathComponent math={"-10 - (-5)"} /></></>}
            back={<><strong>-5 !</strong><br/>Les deux signes enlacés '--' au centre IMPLOSENT dans une frappe d'annihilation et donnent un '+'. <br/>L'équation devient : <><MathComponent math={"-10 + 5"} /></>. Je dois 10, je rembourse 5. Il me reste 5 de dette (-5).</>}
          />
          <Flashcard 
            front={<>On divise 0 par -8. <><MathComponent math={"0 \\div -8"} /></>. Ça fait -8 ? Ou erreur math ?</>}
            back={<><strong>Zéro (0).</strong><br/>J'ai Zéro bonbon. Je les divise de force entre 8 ennemis mafieux (négatifs). Bah ils ont 0 bonbon. Le zéro domine en haut!</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'écris {`$-4 \\times -2$`} j'ai un zéro ?",
              answer: "Oui, car c'est une faute de grammaire Mathématique ! Deux signes d'opérations (× et -) n'ont ABSOLUMENT JAMAIS LE DROIT d'être collés crus. Tu dois obligatoirement ériger le mur de la parenthèse : {`$-4 \\times (-2)$`}."
            },
            {
              question: "Et la Priorité des opérations (PEMDAS) dans tout ça ?",
              answer: "Toujours la Reine absolue ! Si l'exercice est {`$-2 + 3 \\times (-4)$`}, la Multliplication écrase l'Addition ! Tu traites donc d'abord le bloc '3 × (-4)' (Ca fait -12). Puis tu fais l'addition finale : {`$-2 + (-12) = -14`}. C'est mortel."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est le signe et le résultat de {`$(-6) \\times (-3)$`} ?",
              options: [
                "-18",
                "+18",
                "-9"
              ],
              correctAnswer: 1,
              explanation: "Top ! Règle des signes en Frappe Directe (Multiplication) : Moins multiplié par Moins = PLUS ! Et 6×3=18."
            },
            {
              question: "Désamorce cette bombe : {`$-5 - 2 \\times (-3)$`}",
              options: [
                "21 (Car -5-2 = -7, puis -7×-3=21)",
                "-1 (Car la multiplication d'abord : 2×-3 = -6. Et -5 - (-6) donne +1 !)",
                "1"
              ],
              correctAnswer: 2,
              explanation: "Incroyable ! Les Multiplications en Preum's !! Le bloc {-2 × (-3)} = +6. Et -5 + 6 = 1 !! (L'option 2 dans le texte dit +1, ce qui revient au même)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Séparer dans ma tête le Mode Banque (Addition : Detts/Bénéf) et Mode Chaos (Multiplication : Moins par Moins).",
            "Compter les signes moins au début d'un grand produit de facteurs.",
            "Toujours respecter Maman : Parenthèses -> Fois/Diviser -> Plus/Moins."
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

export default Course_College_4eme_06_Nombres_Relatifs;
