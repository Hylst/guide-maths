import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { Sigma, Scissors, Brackets, Expand } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_07_Calcul_Litteral: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-07"
        title="Calcul Littéral et Équations"
        subtitle="Menez l'enquête et percez le secret de l'inconnue X !"
        duration="1h 30"
        level="3ème (Cycle 4)"
        prerequisites={["Les nombres relatifs (+/-)", "Règles des signes (moins par moins = plus)", "Priorités opératoires"]}
        objectives={[
          "Réduire une expression littérale (rassembler les familles).",
          "Développer avec la simple et la double distributivité.",
          "Factoriser une expression en trouvant le facteur commun.",
          "Modéliser et résoudre une équation du premier degré."
        ]}
      />

      <Section title="🌟 Introduction : Le pouvoir magique des Lettres" icon="🔠" color="slate">
        <p>
          Pourquoi les mathématiciens ont-ils mis des lettres dans les calculs ? Simplement parce qu'on ne connaît pas certaines valeurs ! 
        </p>
        <p className="mt-4">
          La lettre <strong className="text-sky-600 dark:text-sky-400">x</strong> est comme une boîte vide. Le calcul littéral est l'art de manipuler cette boîte, de la multiplier et de la déplacer sans même savoir ce qu'il y a à l'intérieur. C'est l'outil ultime pour <strong>modéliser</strong> le monde (la gravité, la vitesse, la finance) à l'aide de formules universelles !
        </p>
      </Section>

      <Section title="1. Réduire (Le grand ménage des familles)" icon="🧹" color="indigo">
        <p className="mb-4">Dans l'univers de l'algèbre, on ne peut pas additionner des pommes et des bananes. On ne peut additionner que les termes de la <strong>MÊME FAMILLE</strong>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 py-4 px-2 rounded-2xl border border-rose-100 dark:border-rose-800/60 dark:border-rose-800">
             <div className="text-rose-500 mb-1"><Sigma size={24} className="mx-auto" /></div>
             <p className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200">Famille des <MathComponent math={"x^2"} /></p>
             <p className="text-xs text-muted-text">Ne se mélange avec personne !</p>
          </div>
          <div className="bg-sky-50 dark:bg-sky-900/20 py-4 px-2 rounded-2xl border border-sky-200 dark:border-sky-800">
             <div className="text-sky-500 mb-1">x</div>
             <p className="font-bold text-sky-800 dark:text-sky-200">Famille des <MathComponent math={"x"} /></p>
             <p className="text-xs text-muted-text">La famille standard.</p>
          </div>
           <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 py-4 px-2 rounded-2xl border border-amber-100 dark:border-amber-800/60 dark:border-amber-800">
             <div className="text-amber-500 mb-1"><span className="font-mono text-xl">42</span></div>
             <p className="font-bold text-amber-900 dark:text-amber-100 dark:text-amber-200">Les Nombres Seuls</p>
             <p className="text-xs text-muted-text">(Les constantes).</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-[2rem] border border-border-strong shadow-sm my-6">
          <p className="font-medium text-foreground mb-4"><strong>L'opération de réduction :</strong></p>
          <div className="font-mono font-bold text-lg md:text-xl text-center space-y-4">
            <div>
              <span className="text-sky-600 dark:text-sky-400">3x</span> + <span className="text-sky-600 dark:text-sky-400">4x</span> = <span className="text-emerald-600 dark:text-emerald-400">7x</span> <span className="text-sm text-muted-text inline-block ml-4">(3 Pommes + 4 Pommes = 7 Pommes)</span>
            </div>
            <div>
              <span className="text-rose-600 dark:text-rose-400">5x²</span> + <span className="text-sky-600 dark:text-sky-400">3x</span> <span className="text-rose-600 dark:text-rose-400">- 2x²</span> + <span className="text-amber-600 dark:text-amber-400">8</span> = <span className="text-emerald-600 dark:text-emerald-400">3x² + 3x + 8</span>
            </div>
          </div>
        </div>
        
        <InfoBlock title="Le piège de la multiplication !" type="warning">
          La règle des familles ne s'applique <strong>QUE</strong> pour l'addition et la soustraction !<br/>
          Avec la <strong>multiplication</strong>, tout le monde peut fusionner ! <br/>
          <MathComponent math={"3 \\times 4x = 12x"} /><br/>
          <MathComponent math={"x \\times x = x^2"} /><br/>
          <MathComponent math={"2x \\times 3x = 6x^2"} />
                          </InfoBlock>
      </Section>

      <Section title="2. Développer (L'art de briser les parenthèses)" icon="💣" color="emerald">
        <p className="mb-4">Développer, c'est transformer un Produit (une multiplication devant des parenthèses) en une grande Somme plate.</p>
        
        <h3 className="text-xl font-bold mt-6 mb-4 flex items-center gap-2"><Expand className="text-emerald-500" /> La simple distributivité (Le facteur devant la porte)</h3>
        <p className="mb-4 text-muted-text">Le facteur à l'extérieur va "distribuer" son influence à TOUS les invités dans la maison (la parenthèse) via la multiplication.</p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 text-center font-mono text-xl shadow-sm mb-8">
           <p className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-2">k(a + b) = ka + kb</p>
           <hr className="border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800/50 my-4" />
           <p className="text-rose-600 dark:text-rose-400">3(x + 5)</p>
           <p className="text-sm my-2 text-muted-text">↓</p>
           <p className="text-foreground">(3 × x) + (3 × 5)</p>
           <p className="text-sm my-2 text-muted-text">↓</p>
           <p className="text-emerald-600 dark:text-emerald-400 font-black">3x + 15</p>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-4 flex items-center gap-2"><Brackets className="text-blue-500" /> La double distributivité (Le grand mariage)</h3>
        <p className="mb-4 text-muted-text">Quand deux maisons (parenthèses) se rencontrent. TOUT LE MONDE dans la première maison doit saluer et multiplier TOUT LE MONDE dans la deuxième ! (4 multiplications au total).</p>
        
        <InteractiveExercise 
          title="Développer (x + 2)(x + 4)"
          question={<>Applique la règle des 4 flèches magiques pour libérer l'expression : <strong>(x + 2)(x + 4)</strong>.</>}
          steps={[
            <><strong>Flèche 1 :</strong> Le premier avec le premier : <><MathComponent math={"x \\times x = \\mathbf{x^2}"} /></></>,
            <><strong>Flèche 2 :</strong> Le premier avec le deuxième : <><MathComponent math={"x \\times (+4) = \\mathbf{+4x}"} /></></>,
            <><strong>Flèche 3 :</strong> Le deuxième avec le premier : <><MathComponent math={"2 \\times x = \\mathbf{+2x}"} /></></>,
            <><strong>Flèche 4 :</strong> Le deuxième avec le deuxième : <><MathComponent math={"2 \\times 4 = \\mathbf{+8}"} /></></>,
            <>On aligne tout le butin brut : <><MathComponent math={"x^2 + 4x + 2x + 8"} /></></>,
            <><strong>L'étape cruciale : Réduire !</strong> On fusionne les membres de la famille 'x' (4x + 2x = 6x).<br/><span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">Résultat : x² + 6x + 8</span></>
          ]}
        />
      </Section>

      <Section title="3. Factoriser (L'opération inverse)" icon="🗜️" color="blue">
        <p className="mb-4">Factoriser, c'est comme "compresser un fichier zip". C'est <strong>retrouver les parenthèses d'origine</strong> à partir d'une somme plate. Pour cela, on cherche l'espion qui est présent dans tous les camps : le <strong>Facteur Commun</strong>.</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800 my-6 shadow-sm">
           <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-4 pb-2 border-b border-sky-200 dark:border-sky-800">Mission : Factoriser A = 15x + 10</h4>
           <ol className="space-y-4 font-mono">
              <li>
                 <span className="text-muted-text text-sm">1. Je cherche un nombre qui pille '15' et '10' :</span><br/>
                 La table de 5 ! Donc l'espion est 5. Je le mets DEDANS pour les séparer en produit.
              </li>
              <li>
                 <span className="text-muted-text text-sm">2. J'écris explicitement les deux morceaux avec le facteur :</span><br/>
                 A = (<strong className="text-rose-500">5</strong> × 3x) + (<strong className="text-rose-500">5</strong> × 2)
              </li>
              <li>
                 <span className="text-muted-text text-sm">3. Je sors l'espion (5) TOTALEMENT DEVANT et j'ouvre une grande parenthèse pour "ceux qui restent" :</span><br/>
                 A = <strong className="text-rose-500">5</strong>(3x + 2)
              </li>
           </ol>
        </div>
      </Section>

      <Section title="4. Les Équations du 1er Degré (L'équilibre de la balance)" icon="⚖️" color="amber">
        <p className="mb-4">Une équation est une "Balance" en équilibre (le signe égal). L'objectif est d'isoler l'inconnue <strong className="text-sky-500">x</strong> d'un seul côté, toute seule, pour découvrir sa valeur secrète. <strong>Règle d'or : Tout ce que tu fais d'un côté de la balance, tu dois le faire de l'autre !</strong></p>

        <InteractiveExercise 
          title="Le jeu de l'isolement"
          question={<>Résous l'équation : <span className="font-mono text-xl font-bold">5x + 3 = 18</span></>}
          steps={[
            <>Je veux que les 'x' restent seuls à gauche. Le "+ 3" me gêne !</>,
            <>Pour détruire "+ 3", je fais <strong>"- 3"</strong> des DEUX côtés de la balance.</>,
            <>Cela donne : <span className="font-mono bg-muted p-1 rounded">5x = 18 - 3</span> <br/>Donc : <span className="font-mono bg-muted p-1 rounded font-bold">5x = 15</span></>,
            <>Il me reste 5 boîtes 'x' qui pèsent 15 kilos. Je veux le poids d'UNE seule boîte 'x'. Comment détruire le "foix 5" ? Je <strong>DIVISE</strong> par 5 des deux côtés !</>,
            <>Cela donne : <span className="font-mono bg-muted p-1 rounded">x = 15 / 5</span></>,
            <><span className="text-emerald-600 dark:text-emerald-400 font-black text-xl">x = 3</span> ! Tu as craqué le code !</>
          ]}
        />
        
        <TipBanner title="Que faire si j'ai des 'x' des deux côtés ?" type="info">
           Dans l'équation <MathComponent math={"4x = 2x + 10"} />. Ne panique pas ! Regroupe les familles ! Utilise l'opération l'inverse pour "chasser" un terme avec x de l'autre côté. <br/>Ici on enlève <MathComponent math={"2x"} /> des deux côtés : <MathComponent math={"4x - 2x = 10"} />  ={'►'}  <MathComponent math={"2x = 10"} />. Et on termine tranquillement !
                          </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Astuce mortelle de signe : En distribuant, que donne le calcul <strong>-3(2x - 4)</strong> ?</>}
            back={<>Attention aux REGLES DES SIGNES !<br/>-3 × 2x = -6x <br/>-3 × -4 = <strong>+12</strong> (Moins par moins font Plus !)<br/>Résultat : <strong>-6x + 12</strong>.</>}
          />
          <Flashcard 
            front={<>Comment vérifier que tu n'as pas fait de faute bête à ton équation <MathComponent math={"x = 3"} /> trouvée à la fin de l'exercice pour <MathComponent math={"5x+3=18"} /> ?</>}
            back={<>Tu retournes mentalement tout au début de l'énoncé, et <strong>tu remplaces la lettre <MathComponent math={"x"} /> par ta réponse (3) !</strong><br/><MathComponent math={"5 \\times 3 + 3 = 15 + 3 = 18"} />. La balance de départ est vérifiée (18=18), ton 20/20 est GARANTI.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi est-ce qu'on enlève le signe FOIS (×) en calcul littéral ?",
              answer: "Parce que le signe de multiplication '×' ressemble trop à la lettre 'x' et ça rendait les mathématiciens fous de confusion ! On a donc décidé de manière officielle que s'il n'y a RIEN entre un chiffre et une lettre (ex: 3x), ou devant une parenthèse '2(x+1)', alors c'est un sous-entendu mathématique : c'est un signe 'FOIS' invisible."
            },
            {
              question: "Qu'est ce que ça veut dire que l'équation est du '1er degré' ?",
              answer: "Le 'degré' est la puissance maximale de l'inconnue. Au lycée, on verra les équations du second degré où la lettre est 'x²'. Ici, au 1er degré, l'inconnue n'a que sa forme basique : 'x' à la puissance 1."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la version parfaitement RÉDUITE de m = 3x² + 5x + 2x² - 2x + 1 ?",
              options: [
                "5x² + 3x + 1",
                "8x + 1",
                "x² + 7x + 1"
              ],
              correctAnswer: 0,
              explanation: "Top ! Tu as marié les rouges ensembles (3x² + 2x² = 5x²) et les bleus ensembles (5x - 2x = 3x). Le '1' (la constante) reste tristement seul à la fin."
            },
            {
              question: "Quelle est l'opération d'arrivée complètement Factorisée de '14x + 7' ?",
              options: [
                "7(x + 1)",
                "7(2x + 1)",
                "(7 + x)(1 + 2x)"
              ],
              correctAnswer: 1,
              explanation: "Oui ! Le facteur commun aux deux membres est 7 (14 c'est 2×7). En retirant 7 violemment au premier morceau on préserve le (2x). En divisant le 7 du 2e morceau par notre fameux 7, il lui RESTE 1 ! Donc : 7(2x + 1). On revérifie facilement : 7×2x = 14x ! Magique."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de séparation : Je n'additionne JAMAIS des x² avec des x.",
            "Minus x Minus = Positive (Le danger fatal en développement de parenthèse).",
            "Équation : L'opération inverse pour le grand ménage (Pour virer +5, je fais -5)."
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

export default Course_College_3eme_07_Calcul_Litteral;
