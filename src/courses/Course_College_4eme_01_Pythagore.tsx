import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { TriangleRight, Search, Zap, Crosshair } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_4eme_01_Pythagore: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-01"
        title="Théorème de Pythagore"
        subtitle="Le grand secret des Triangles Rectangles"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Reconnaître un triangle rectangle", "Savoir calculer un carré (ex: 3² = 9)", "Connaître la touche racine carrée √"]}
        objectives={[
          "Identifier l'hypoténuse infailliblement.",
          "Calculer la longueur de l'hypoténuse.",
          "Calculer la longueur d'un côté de l'angle droit.",
          "Utiliser la Réciproque pour prouver qu'un triangle EST rectangle."
        ]}
      />

      <Section title="🌟 Introduction : Le constructeur des pyramides" icon="🏗️" color="slate">
        <p>
          Il y a 2500 ans, un génie nommé Pythagore a découvert une loi incassable de l'univers : si vous construisez un triangle avec un angle droit parfait (90°), alors les longueurs de ses 3 côtés sont liées par une formule magique.
        </p>
        <p className="mt-4">
          C'est grâce à lui que les Égyptiens construisaient des pyramides avec des angles parfaitement droits sans aucun rapporteur, juste avec une corde à treize nœuds !
        </p>
      </Section>

      <Section title="1. L'Hypoténuse (Le boss de fin)" icon="👑" color="indigo">
        <p className="mb-4">Avant tout calcul, tu dois repérer le chef absolu du triangle : <strong>l'Hypoténuse</strong>.</p>
        
        <div className="bg-card p-6 rounded-[2rem] border border-border-strong border-l-8 border-indigo-500 shadow-sm flex flex-col md:flex-row gap-8 items-center mb-6">
           <div className="w-32 h-32 relative flex-shrink-0">
             {/* Dessin du triangle rectangle */}
             <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
               <polygon points="10,90 90,90 10,30" fill="none" stroke="currentColor" strokeWidth="3" className="text-foreground"/>
               {/* Angle droit symbol */}
               <polyline points="10,80 20,80 20,90" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-500"/>
               {/* Hypoténuse highlight */}
               <line x1="90" y1="90" x2="10" y2="30" stroke="currentColor" strokeWidth="6" className="text-indigo-500"/>
             </svg>
           </div>
           <div>
              <h3 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Ses 2 caractéristiques d'or :</h3>
              <ul className="space-y-3 font-medium">
                <li><span className="text-indigo-500 mr-2">1.</span>C'est toujours le <strong>plus long</strong> côté.</li>
                <li><span className="text-indigo-500 mr-2">2.</span>Il est <strong>TOUJOURS EN FACE</strong> de l'angle droit (il ne touche jamais l'angle droit).</li>
              </ul>
           </div>
        </div>
        
        <InfoBlock title="Le Théorème" type="info">
           Dans un triangle rectangle, le Carré de l'Hypoténuse est égal à la somme des Carrés des deux autres côtés.<br/>
           Si <MathComponent math={"ABC"} /> est rectangle en <MathComponent math={"A"} />, le côté en face de lui est <MathComponent math={"BC"} /> (l'hypoténuse).<br/>
           <span className="font-serif text-xl font-bold mt-2 inline-block bg-card dark:bg-black/30 px-3 py-1 rounded">
             <MathComponent math={"BC^2 = AB^2 + AC^2"} />
                                 </span>
        </InfoBlock>
      </Section>

      <Section title="2. Trouver l'Hypoténuse manquante" icon="🔍" color="blue">
        <p className="mb-4">Si tu connais les deux petits côtés et que tu cherches le Grand Chef (l'Hypoténuse), on fait une <strong>ADDITION</strong>.</p>

        <InteractiveExercise 
          title="L'échelle contre le mur"
          question={<>Un mur (<MathComponent math={"AB"} />) fait <MathComponent math={"4m"} />. Le sol (<MathComponent math={"AC"} />) fait <MathComponent math={"3m"} />. J'ai un triangle rectangle en <MathComponent math={"A"} />. Quelle est la longueur de l'échelle (<MathComponent math={"BC"} />) posée contre le mur ?</>}
          steps={[
            <><strong>Étape 1 (La phrase magique) :</strong> On sait que le triangle ABC est rectangle en A. D'après le Théorème de Pythagore, on a :</>,
            <><strong>Étape 2 (L'équation en lettres) :</strong> <MathComponent math={"BC^2 = AB^2 + AC^2"} />. (L'hypoténuse BC est toujours seule de son coté !)</>,
            <><strong>Étape 3 (Les nombres) :</strong> <MathComponent math={"BC^2 = 4^2 + 3^2"} /></>,
            <><strong>Étape 4 (Les carrés) :</strong> $BC^2 = 16 + 9 = \\mathbf{25}$</>,
            <><strong>Étape 5 (Le marteau de Thor - La Racine) :</strong> L'échelle ne fait pas 25m, c'est <MathComponent math={"BC"} /> <em>au carré</em> ! Pour briser le carré, j'applique la Racine Carrée : $BC = \\sqrt{25}$</>,
            <>Réponse Finale : L'échelle fait <strong>5 mètres</strong> parfaits !</>
          ]}
        />
      </Section>

      <Section title="3. Trouver un petit côté manquant" icon="⛏️" color="rose">
        <p className="mb-4">Si l'énoncé te <strong>donne</strong> déjà l'hypoténuse, mais qu'il te manque un 'petit côté' de l'angle droit, on fait une <strong>SOUSTRACTION</strong> (pour que ça soit plus petit que l'hypoténuse !).</p>
        
        <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-3xl border border-rose-100 dark:border-rose-800/60 dark:border-rose-800 shadow-sm my-6">
           <h3 className="font-bold text-lg mb-4 text-rose-900 dark:text-rose-100 dark:text-rose-200">Exemple : Je cherche le côté AB. L'hypoténuse BC = 13 et le sol AC = 5.</h3>
           <div className="font-mono space-y-3">
             <p className="bg-card/50 dark:bg-black/30 p-2 rounded">1. L'équation noble : <MathComponent math={"BC^2 = AB^2 + AC^2"} /></p>
             <p className="bg-card/50 dark:bg-black/30 p-2 rounded">2. On insère les nombres : <MathComponent math={"13^2 = AB^2 + 5^2"} /></p>
             <p className="bg-card/50 dark:bg-black/30 p-2 rounded">3. On calcule : <MathComponent math={"169 = AB^2 + 25"} /></p>
             <p className="bg-card/50 dark:bg-black/30 p-2 rounded border-l-4 border-rose-500">4. Le Switch : Pour isoler AB², je dois retirer 25 au total !<br/><strong className="text-rose-600 dark:text-rose-400"><MathComponent math={"AB^2 = 169 - 25 = 144"} /></strong></p>
             <p className="bg-card/50 dark:bg-black/30 p-2 rounded">5. La racine : $AB = \\sqrt{144} = \\mathbf{12}$ !</p>
           </div>
        </div>
      </Section>

      <Section title="4. Réciproque : Prouver l'Angle Droit" icon="⚖️" color="emerald">
        <p className="mb-4">La Réciproque, c'est le travail de l'Inspecteur. Tu as un triangle, tu connais ses 3 longueurs, mais tu ne sais pas s'il est parfaitement Droit et ne fait pas 89,9°.</p>

        <TipBanner title="Méthode infaillible de rédaction" type="success">
           On sépare <strong>TOUJOURS</strong> le calcul en deux murs isolés avant de les comparer ! Pas le droit de mettre "=".
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 flex flex-col items-center">
              <span className="font-bold mb-2">Le Grand Côté tout SEUL</span>
              <div className="bg-card dark:bg-black/40 p-4 rounded shadow font-mono text-center w-full">
                [L'Aspirant Hypoténuse]<br/>
                <MathComponent math={"BC^2 = 5^2"} /><br/>
                $BC^2 = \\mathbf{25}$
              </div>
           </div>
           
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 flex flex-col items-center">
              <span className="font-bold mb-2">La Somme des 2 Petits</span>
              <div className="bg-card dark:bg-black/40 p-4 rounded shadow font-mono text-center w-full">
                [Les Petits Bras]<br/>
                <MathComponent math={"AB^2 + AC^2 = 4^2 + 3^2"} /><br/>
                $= 16 + 9 = \\mathbf{25}$
              </div>
           </div>
        </div>
        
        <p className="font-medium text-center text-lg mt-4 text-emerald-900 dark:text-emerald-100 dark:text-emerald-200">
          <strong>Conclusion magique :</strong><br/>
          On constate que <MathComponent math={"BC^2 = AB^2 + AC^2"} />. <strong>D'après la Réciproque de Pythagore, le triangle est Rectangle !</strong>
        </p>

        <p className="text-sm mt-4 text-muted-text text-center italic">
          (S'ils N'ÉTAIENT PAS égaux, on écrirait : "On constate qu'il y a une différence. D'après la <strong>Contraposée</strong> de Pythagore, le triangle N'EST PAS rectangle".)
        </p>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le triangle ZBL a [BL] pour segment le plus grand. S'il était rectangle, ce serait en quelle lettre ?</>}
            back={<><strong>En Z !</strong><br/>[BL] étant le plus grand, c'est l'hypoténuse. L'hypoténuse est TOUJOURS en face de l'angle droit, et la lettre manquante (la lettre en face du segment BL) est Z.</>}
          />
          <Flashcard 
            front={<>Pythagore, ça marche dans tous les triangles de l'univers ?</>}
            back={<><strong>ABSOLUMENT FAUX !</strong><br/>Pythagore meurt d'épuisement s'il n'y a pas un <strong>Angle Droit</strong> (Triangle Rectangle). C'est la condition vitale de son pouvoir.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi est-ce qu'on doit TOUJOURS utiliser des Carrés (²)?",
              answer: "Ce n'est pas qu'un calcul ! Pythagore a remarqué que si on colle un vrai carré physique de pâte à modeler sur les 3 côtés, l'Aire du grand carré est exactement l'addition des Aires de pâte à modeler des deux petits carrés. D'où la puissance 2 !"
            },
            {
              question: "Quelle est la différence entre Réciproque et Contraposée ?",
              answer: "L'égalité des carrés est une Balance de pesée. Je pèse la gauche, je pèse la droite. Si l'égalité est PARFAITE (Oui), j'ai le droit d'invoquer la 'Réciproque'. Si la balance penche (Non = 25 contre 26), j'invoque la 'Contraposée' pour dire que c'est un triangle banal."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Le triangle EDF est rectangle en E. L'équation de Pythagore est :",
              options: [
                "ED² = EF² + DF²",
                "DF² = ED² + EF²",
                "EF² = ED² + DF²"
              ],
              correctAnswer: 1,
              explanation: "Top ! Si on est rectangle en E, l'hypoténuse en face de lui est [DF]. L'hypoténuse se fait isoler à gauche du signe Égal ! Donc DF² = ED² + EF² !"
            },
            {
              question: "Je cherche le côté IK. L'hypoténuse JK fait 10, et IJ fait 8. Que dois-je taper sur ma calculette ?",
              options: [
                "√(10² + 8²)",
                "√(10² - 8²)",
                "10² / 8"
              ],
              correctAnswer: 1,
              explanation: "Bien joué ! L'hypoténuse est DÉJÀ connue, donc je dois faire une Soustraction ! Le Grand Carré (100) MOINS le petit carré (64) = 36. Et √(36) est le fameux 6 de l'équerre maçonnique 6-8-10 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Dessiner le triangle au brouillon avant de poser des lettres.",
            "Repérer l'hypoténuse ou l'angle droit en CIBLE.",
            "Mots magiques : ADDITION (je cherche hypoténuse), SOUSTRACTION (je cherche petit côté)."
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

export default Course_College_4eme_01_Pythagore;
