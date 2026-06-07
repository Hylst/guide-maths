import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { PenTool, Crosshair, Hexagon, Maximize } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_6eme_05_Geometrie_Base: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-05"
        title="La Géométrie de Base"
        subtitle="L'Art du Trait, du Point et du Poème Mathématique"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Utilisation de la Règle (Savoir tracer droit)"]}
        objectives={[
          "Mémoriser l'Alphabet de la géométrie : Point, Droite, Segment, Demi-Droite.",
          "Comprendre le codage absolu (Parentèses, Croquets).",
          "Mémoriser la loi de l'Appartenance (Symbole $\\in$).",
          "Identifier Droites Sécantes, Parallèles et Perpendiculaires."
        ]}
      />

      <Section title="🌟 Introduction : Un nouveau langage secret" icon="📐" color="slate">
        <p>
          En Primaire, tu dessinais. "C'est un trait" ou "C'est un point". En 6ème, tu deviens <strong>Architecte</strong>. La Géométrie est la seule matière scolaire qui possède son propre Dialecte Extraterrestre. 
        </p>
        <p className="mt-4">
          Une seule parenthèse mal placée sur ton énoncé de contrôle peut transformer un trait de 5 cm en une autoroute Infinie vers la galaxie Andromeda. Il est temps d'apprendre les Codes de Sécurité.
        </p>
      </Section>

      <Section title="1. La Trinité du Feu (Segment, Droite, Le Demi-Loup)" icon="🔥" color="indigo">
        <p className="mb-4">Il n'existe que 3 objets filaires dans notre monde 2D. Apprends leurs Boucliers de codage :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-5 rounded-2xl border-t-8 border-indigo-400 shadow-sm text-center">
             <div className="flex items-center justify-center mb-4">
               <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
               <div className="w-16 h-1 bg-indigo-600"></div>
               <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
             </div>
             <h4 className="font-bold text-xl mb-1">[ AB ]</h4>
             <p className="font-bold text-indigo-700 dark:text-indigo-300">LE SEGMENT</p>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">C'est la Seule chose <strong>Mesurable</strong> au monde. Les <strong className="text-indigo-600 dark:text-indigo-400">Crochets</strong> `[ ]` agissent comme des murs de béton armés. L'encre est enfermée entre le point A et le point B. C'est fini.</p>
           </div>
           
           <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border-t-8 border-sky-400 shadow-sm text-center">
             <div className="flex items-center justify-center mb-4 overflow-hidden relative w-32 mx-auto">
               <div className="w-full h-1 bg-sky-600 relative opacity-50"></div>
               <div className="absolute top-1/2 left-4 -translate-y-1/2 w-2 h-2 bg-sky-600 rounded-full"></div>
               <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-sky-600 rounded-full"></div>
             </div>
             <h4 className="font-bold text-xl mb-1">( AB )</h4>
             <p className="font-bold text-sky-700 dark:text-sky-300">LA DROITE</p>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">C'est le laser Divin <strong>Infini</strong> des deux cotés!!. Les <strong className="text-sky-600">Parenthèses</strong> `( )` sont des portes ouvertes sur l'univers. La ligne transperce A, transperce B et ne s'arrête JA-MAIS. On ne mesure JA-MAIS une droite!</p>
           </div>

           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-5 rounded-2xl border-t-8 border-emerald-400 shadow-sm text-center">
             <div className="flex items-center justify-center mb-4 overflow-hidden relative w-32 mx-auto">
               <div className="absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full z-10"></div>
               <div className="absolute top-1/2 left-2 right-0 -translate-y-1/2 h-1 bg-emerald-600 opacity-50"></div>
               <div className="absolute top-1/2 right-8 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full z-10"></div>
             </div>
             <h4 className="font-bold text-xl mb-1">[ AB )</h4>
             <p className="font-bold text-emerald-700 dark:text-emerald-300">LA DEMI-DROITE</p>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">L'arme du Tireur d'élite. Elle NAÎT en A (qui est bloqué par le <strong className="text-emerald-600 dark:text-emerald-400">Crochet</strong> `[`) et elle tire à <strong className="text-emerald-600 dark:text-emerald-400">l'Infini</strong> en passant par dessus B ! (Tiré vers la droite cosmique).</p>
           </div>
        </div>
      </Section>

      <Section title="2. Le Symbole Secret d'Appartenance (€ triton)" icon="🔱" color="rose">
        <p className="mb-4">Au lieu d'écrire "Le point C est posé sur la ligne AB", les maîtres de l'Ordre utilisent le Trident de l'océan :</p>

        <TipBanner title="Le Signe de L'Univers Mathématique" type="info">
           <MathComponent math={"C \\in [AB]"} /><br/>
           Le symbole <MathComponent math={"\\in"} /> veut dire <strong>"Appartient À"</strong> !<br/>
           La phrase secrète signifie : "Le petit point pauvre C a réussi à se poser pille poil <strong>Sur</strong> le Trait de lumière créé entre A et B."<br/>
           S'il est raté dans le vide spatial... On le barre de sang ! <MathComponent math={"\\notin"} /> (N'appartient pas !).
                          </TipBanner>
      </Section>

      <Section title="3. La Danse des Droites (Positions Relatives)" icon="💃" color="blue">
        <p className="mb-4">Deux droites posées sur l'univers de ta feuille n'ont que 2 grands choix de destinée...</p>

        <div className="space-y-4 font-medium my-6">
           <div className="bg-card p-5 rounded border-l-4 border-rose-500 shadow-sm">
             <div className="flex justify-between items-center">
               <h4 className="font-bold text-lg text-rose-600 dark:text-rose-400">1. SÉCANTES (Le Crash)</h4>
             </div>
             <p className="text-sm mt-2">Deux droites qui <strong>se coupent</strong> (se percutent) en "Un Point (Appelé 'Point d'intersection')".<br/>Si le Crash est <strong>PARFAIT, faisant un Angle Droit parfait (90°) vérifié à l'équerre</strong>... elles rentrent dans une sous-catégorie divine : Elles Sont <strong>PERPENDICULAIRES</strong> (Symbole caché : <MathComponent math={"\\perp"} />).</p>
           </div>

           <div className="bg-card p-5 rounded border-l-4 border-sky-500 shadow-sm">
             <div className="flex justify-between items-center">
               <h4 className="font-bold text-lg text-sky-600 dark:text-sky-400">2. PARALLÈLES (L'Amour Impossible)</h4>
             </div>
             <p className="text-sm mt-2">Deux droites qui voguent dans la même direction, conservant le même écart constant, et qui ne <strong>se rencontreront JA-MAIS</strong>, même à 4 millions d'années lumières au bout de ta feuille ! (Symbole caché : //).</p>
           </div>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Devine l'Objet"
          question={<p>Je suis la ligne invisible qui démarre sagement au point A, traverse brutalement le point B et s'en va courir à l'infini jusqu'au bout de l'univers. Comment m'écrit-on mathématiquement ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser le départ</p>
              <p>Ça démarre "sagement", c'est-à-dire qu'il y a un début bloqué. Le symbole est le crochet <code>[</code> au point A.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Analyser la fin</p>
              <p>Ça "traverse" et ça part à l'infini côté B. Le symbole est la parenthèse <code>)</code> du côté de B.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Je suis la demi-droite <code>[AB)</code>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le prof écrit `AB = 5 cm` au tableau. Il a oublié de mettre les crochets `[AB]` !! Tu lèves la main pour l'insulter et corriger ?</>}
            back={<><strong>Alerte Erreur Fatale d'élève Insolent ! NON !</strong><br/>Le prof gère de FOU : Quand on parle de la LONGUEUR (Le chiffre "5"), l'académie mondiale interdit FORMELLEMENT de mettre des crochets ! `AB = 5` veut dire "La longueur de A à B vaut 5". Le Crochet `[AB]` désigne le Trait à l'Encre (L'Objet).</>}
          />
          <Flashcard 
            front={<>Complète ce symbole <MathComponent math={"\\in"} /> ?<br/>"Soit M le milieu du segment [AB]. Donc M ... (AB)."</>}
            back={<><strong>M <MathComponent math={"\\in"} /> (AB)</strong><br/>Si le point M est au plein milieu du pont [AB], ALORS forcément qu'il est touché par l'Aura du Rayon Laser Divin Infini (AB) qui transperce toute l'éternité !! Oui il appartient !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence entre un Point, un Crochet, et une Parenthèse au propre ?",
              answer: "Le point est la MATIÈRE PREMIÈRE, c'est une lettre MAJUSCULE à l'encre noir sur ton papier (A). Le Crochet c'est le Piquet pour accrocher le Trait Fil de fer afin qu'il ne file pas à l'Infini. La parenthèse est une fenètre ouverte."
            },
            {
              question: "Ils m'ont piégés: 'Soient 3 points A, B, C Alignés. Comment sont les droites (AB) et (BC) ?'",
              answer: "Si A,B,C sont des petits oiseaux posés sur les MES fils de Fer... Alors la ligne Infinie (AB) et la ligne Infinie (BC)... SONT EN FAIT LA MÊME LIGNE Cosmique ! On dit que les Droites sont CONFONDUES ! (C'est des parallèles superposées absolues)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'écris [ EF ), qu'ai-je invoqué ?",
              options: [
                "Un Segment coincé entre E et F.",
                "Une Demi-droite qui part Inifiment du point E pour crever le point F.",
                "Une Demi-droite dont la racine (le depart) est en E, et qui traverse F sans s'arrêter vers l'espace."
              ],
              correctAnswer: 2,
              explanation: "Top ! Le crochet protège E, le signal démarre depuis le point E, transperce litérallement F et continue vers le mur magique des Parentèses sans limites."
            },
            {
              question: "Répète 3 fois après moi : La Notation en Majuscule 'CD' représente ...",
              options: [
                "La droite.",
                "Le petit dessin à l'encre.",
                "La Mesure (longueur) du segment."
              ],
              correctAnswer: 2,
              explanation: "Top Boss des Boss. Pas de Symbole = La Mesure PURE. Ex: [CD] est un putain de dessin sur ma feuille, mais CD = 12 centimètres."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "J'écris au Prof avec une Parenthèse Droite (AB) = Jamais ! C'est INFINI !",
            "Toute lettre désignant un objet 'Point' S'ECRIT EN MAJUSCULE.",
            "Le Signe Mathématique de Sécantes avec l'Équerre Parfaite est (T Inversé = Perpendiculaire)."
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

export default Course_College_6eme_05_Geometrie_Base;
