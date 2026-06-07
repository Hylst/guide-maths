import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { Terminal, Code, Cpu, Repeat, GitBranch } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_06_Algorithmique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-06"
        title="Algorithmique et Programmation (Scratch)"
        subtitle="Domptez la machine et apprenez la langue des ordinateurs !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Géométrie de base", "Le plan cartésien (Avancer, Tourner)"]}
        objectives={[
          "Comprendre ce qu'est une variable (la boîte à souvenirs).",
          "Maîtriser les boucles (répéter sans s'épuiser).",
          "Créer des conditions ('Si... Alors... Sinon').",
          "Analyser des blocs Scratch pour prédire le résultat final."
        ]}
      />

      <Section title="🌟 Introduction : Le Chef Cuisinier Bête et Discipliné" icon="👨‍🍳" color="slate">
        <p>
          Un ordinateur, contrairement aux humains, est complètement idiot, mais <strong>ultra-obéissant et ultra-rapide</strong>. 
        </p>
        <p className="mt-4">
          Un algorithme n'est rien d'autre qu'une <strong>recette de cuisine</strong> donnée étape par étape (Avance de 10 pas, tourne à droite, lève le stylo). Si tu inverses deux étapes de la recette, le gâteau sera raté. Dans ce chapitre, tu vas apprendre à donner des ordres chirurgicaux à la machine (souvent avec le célèbre chat Scratch) pour dessiner des rosaces complexes ou calculer des théorèmes.
        </p>
      </Section>

      <Section title="1. La Variable (Le coffre-fort de la mémoire)" icon="📦" color="indigo">
        <p className="mb-4">Contrairement à nous, l'ordinateur ne se souvient de rien avec son "cerveau" s'il n'efface pas ce qu'il a déjà. Pour qu'il retienne un mot de passe ou un score, on doit <strong>déclarer une Variable</strong>.</p>
        
        <div className="bg-card p-6 rounded-[2rem] border border-border-strong border-t-8 border-t-indigo-500 shadow-sm my-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl border-4 border-indigo-500 flex flex-col items-center justify-center shadow-inner relative">
               <span className="text-xs bg-indigo-500 text-white px-2 rounded-full absolute -top-3">Score</span>
               <span className="font-mono text-3xl font-black text-indigo-700 dark:text-indigo-300">42</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Une variable c'est une <strong>boîte étiquetée</strong>. Tu peux y :</p>
               <ul className="space-y-2 mt-2">
                 <li><span className="text-indigo-500 mr-2">1.</span> <strong>Enregistrer</strong> une valeur en l'écrasant. <em>(Mettre 'Score' à 42)</em></li>
                 <li><span className="text-indigo-500 mr-2">2.</span> <strong>Consulter</strong> ce qu'il y a dedans secrètement. <em>(Dire 'Score')</em></li>
                 <li><span className="text-indigo-500 mr-2">3.</span> <strong>Mettre à jour</strong> sa valeur actuelle. <em>(Ajouter 1 à 'Score')</em></li>
               </ul>
            </div>
          </div>
        </div>

        <TipBanner title="L'énorme piège du Brevet !" type="warning">
          Le bloc <strong>"Mettre [x] à 5"</strong> ÉTRASE sans pitié tout ce qu'il y avait avant. <br/>
          Le bloc <strong>"Ajouter 5 à [x]"</strong> CONSERVE l'ancienne valeur et fait une addition ! Ne les confonds jamais sur les copies.
        </TipBanner>
      </Section>

      <Section title="2. Les Boucles (Le pouvoir secret des machines)" icon="🔄" color="emerald">
        <p className="mb-4 text-foreground">Pourquoi utiliser un ordinateur s'il faut écrire 300 fois "Avancer de 10" ? La machine est là pour automatiser. C'est l'intelligence de la Boucle !</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border-2 border-emerald-500/20 rounded-2xl p-4">
             <div className="flex items-center gap-2 mb-3">
               <Repeat className="text-emerald-500" />
               <h4 className="font-bold">1. La Boucle "POUR"</h4>
             </div>
             <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 p-2 font-bold rounded-t border-b border-orange-500/30">Répéter (4) fois</div>
             <div className="bg-slate-100 dark:bg-slate-800 p-3 pl-6 border-l-4 border-orange-400 font-mono text-sm space-y-1 rounded-b">
               <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 p-1 rounded">Avancer de 50 pas</div>
               <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 p-1 rounded">Tourner ↻ de 90 degrés</div>
             </div>
             <p className="text-xs text-muted-text mt-3 font-medium">On l'utilise quand <strong>on connaît EXACTEMENT</strong> le nombre de tours à l'avance. (Ici, ça dessine un carré de 50 de côté).</p>
          </div>

          <div className="bg-card border-2 border-amber-500/20 rounded-2xl p-4">
             <div className="flex items-center gap-2 mb-3">
               <Repeat className="text-amber-500" />
               <h4 className="font-bold">2. La Boucle "TANT QUE"</h4>
             </div>
             <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 dark:text-amber-200 p-2 font-bold rounded-t border-b border-amber-500/30">Répéter jusqu'à ce que (Touche mur)</div>
             <div className="bg-slate-100 dark:bg-slate-800 p-3 pl-6 border-l-4 border-amber-400 font-mono text-sm space-y-1 rounded-b">
               <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 p-1 rounded">Avancer de 10 pas</div>
             </div>
             <p className="text-xs text-muted-text mt-3 font-medium">On l'utilise quand on ne connait pas la durée du trajet, et qu'on attend <strong>qu'un ÉVÉNEMENT extérieur arrête</strong> la machine.</p>
          </div>
        </div>

        <InteractiveExercise 
          title="L'énigme de l'Hexagone (Brevet classique)"
          question={<>Paul utilise une boucle <strong>Répéter 6 fois</strong> avec un <em>Avancer</em>. Quel angle doit-il choisir dans son bloc <em>Tourner</em> pour fermer parfaitement le dessin d'un hexagone régulier ?</>}
          steps={[
            <>Un tour complet sur soi-même pour fermer une figure représente <strong><MathComponent math={"360^{\\circ}"} /></strong>.</>,
            <>Puisqu'il doit diviser ce trajet de rotation complet en <strong>6 morceaux réguliers</strong> (les 6 côtés).</>,
            <>On divise : <MathComponent math={"360 \\div 6 = 60"} />.</>,
            <>Il doit utiliser le bloc <strong>Tourner ↻ de <MathComponent math={"60^{\\circ}"} /></strong>.</>
          ]}
        />
      </Section>

      <Section title="3. Les Conditions (L'intelligence de faire des choix)" icon="🛤️" color="blue">
        <p className="mb-4">Si l'ordinateur ne faisait que répéter, il y aurait beaucoup de bugs. Il faut pouvoir réagir dans des situations différentes : C'est le bloc <strong>Si... Alors... Sinon</strong>.</p>
        
        <div className="flex flex-col md:flex-row gap-8 items-start my-6 bg-sky-50 dark:bg-sky-900/20 p-6 rounded-3xl border border-sky-200 dark:border-sky-800">
           <GitBranch className="w-16 h-16 text-sky-500 flex-shrink-0" />
           <div>
              <p className="font-bold text-lg mb-2">Exemple de vie réelle :</p>
              <div className="font-mono text-sm text-sky-900 dark:text-sky-100">
                <strong>SI</strong> <span className="bg-card dark:bg-black/20 p-1 px-2 rounded">(Il pleut)</span> <strong>ALORS</strong><br/>
                <span className="ml-4 opacity-80">Je prends le Paratonnerre</span><br/>
                <strong>SINON</strong><br/>
                <span className="ml-4 opacity-80">Je prends les Lunettes de soleil</span>
              </div>
              <p className="mt-4 text-sm font-medium">L'ordinateur ne fait JAMAIS les deux ! C'est un aiguillage. S'il valide la condition, il ignore totalement tout ce qui est dans le SINON.</p>
           </div>
        </div>
      </Section>

      <Section title="4. Analyser un programme de Calcul" icon="💻" color="rose">
        <p className="mb-4">Au brevet, la variante la plus commune est le test d'un "Programme de calcul" textuel. Tu dois jouer le rôle de l'ordinateur dans ta tête.</p>
        
        <div className="bg-card border-x border-b border-t-4 border-border-strong border-t-rose-500 rounded-xl p-6 shadow-sm relative mb-6">
           <h3 className="font-bold text-lg text-foreground mb-4">Le défi de Julie</h3>
           <ul className="space-y-2 font-mono text-muted-text mb-6">
             <li>1. Choisir un nombre de départ</li>
             <li>2. Ajouter 3</li>
             <li>3. Multiplier le résultat par 2</li>
             <li>4. Soustraire le double du nombre de départ</li>
           </ul>
           <hr className="mb-4 border-border"/>
           <p className="font-bold mb-2">Faisons tourner l'algorithme avec le nombre <strong>5</strong> :</p>
           <ul className="space-y-1 font-mono text-rose-600 dark:text-rose-400">
             <li>Ligne 1 : {'>'} <span className="font-black">5</span></li>
             <li>Ligne 2 : {'>'} 5 + 3 = <span className="font-black">8</span></li>
             <li>Ligne 3 : {'>'} 8 × 2 = <span className="font-black">16</span></li>
             <li>Ligne 4 : {'>'} 16 - (2 × <strong>5</strong>) = 16 - 10 = <span className="font-black">6</span></li>
           </ul>
        </div>
        
        <InfoBlock title="Astuce Ninja : Retour à l'envoyeur" type="info">
          Parfois, la question n'est pas "Quel est le résultat si je donne 5", mais "Que dois-je donner pour trouver 30 ?". <br/>
          <strong>Deux méthodes :</strong><br/>
          (A) Remonter l'algorithme à l'envers (Faire l'opération Contraire, ligne par ligne en partant de la fin).<br/>
          (B) Passer en algèbre ! <code>2(x + 3) - 2x = 30</code>.
        </InfoBlock>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le bloc dit "Mettre X à 2", puis ensuite "Ajouter 3 à X".<br/>Combien vaut X à la fin ?</>}
            back={<><strong>5 !</strong><br/>La boîte "X" s'est verrouillée sur le nombre 2. L'instruction "ajouter" fait l'addition : 2 + 3 = 5.</>}
          />
          <Flashcard 
            front={<>Dessiner un triangle équilatéral nécessite de tourner 3 fois (degrés égaux). De quel angle dois-je tourner ?</>}
            back={<><strong>120 degrés !</strong><br/>Attention au piège ! Les angles intérieurs font 60°. Mais Scratch demande l'angle EXTÉRIEUR pour tourner avec son crayon. (<MathComponent math={"360 \\div 3 = 120^{\\circ}"} />).</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle forme va se dessiner si l'algorithme dit : 'Répéter 8 fois : Avancer 10, puis Tourner de 45°' ?",
              options: [
                "Un carré (4 côtés)",
                "Un hexagone (6 côtés)",
                "Un octogone (8 côtés)"
              ],
              correctAnswer: 2,
              explanation: "Répéter 8 fois signifie toujours une figure à 8 côtés réguliers ! De plus, $8 \\times 45 = 360$, la figure se ferme parfaitement."
            },
            {
              question: "Si j'écris { Si (Note > 10) Alors [Dire 'Bravo'] Sinon [Dire 'Dommage'] }. Que dira le chat Scratch si ma Note est exactement 10 ?",
              options: [
                "Bravo",
                "Dommage",
                "Il ne dit rien du tout."
              ],
              correctAnswer: 1,
              explanation: "Excellent ! Le signe '>' veux dire strictement supérieur à 10 (10,1 ou 11). Puisque 10 n'est pas supérieur à 10, la condition est fausse ! Le programme plonge dans la boîte 'Sinon' et dit Dommage."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Répéter N fois nécessite toujours une rotation ↻ de (360/N) degrés pour fermer la boucle.",
            "Ajouter ≠ Mettre à.",
            "Je sais convertir un programme texte en lettres algébriques (avec des 'x')."
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

export default Course_College_3eme_06_Algorithmique;
