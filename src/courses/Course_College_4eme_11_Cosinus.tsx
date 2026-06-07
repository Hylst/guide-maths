import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { TriangleRight, Search, Settings, ArrowRight } from 'lucide-react';

const Course_College_4eme_11_Cosinus: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-11"
        title="Le Cosinus (Trigonométrie)"
        subtitle="L'art sacré de l'Angle et de la Fraction"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["L'Hypoténuse (Théorème de Pythagore)", "Manipulation d'une calculatrice (Mode Degrés)"]}
        objectives={[
          "Comprendre ce qu'est le Cosinus (Un ratio magique).",
          "Repérer l'Hypoténuse et le côté Adjacent à un angle.",
          "Calculer la longueur d'un côté grâce à l'angle.",
          "Trouver la mesure d'un angle avec Arccos (Cos⁻¹)."
        ]}
      />

      <Section title="🌟 Introduction : Pythagore n'était pas suffisant" icon="📐" color="slate">
        <p>
          Le Théorème de Pythagore est génial, mais il a une énorme faiblesse : il a toujours besoin d'au moins <strong>DEUX</strong> côtés pour deviner le troisième. Si tu n'as qu'une seule longueur mais que tu connais l'angle d'inclinaison d'une échelle... Pythagore est aveugle.
        </p>
        <p className="mt-4">
          C'est là qu'entre en scène la <strong>Trigonométrie</strong> (la mesure du triangle). Le Cosinus permet de lier une longueur avec un Angle en degrés. C'est le pouvoir des navigateurs et des architectes !
        </p>
      </Section>

      <Section title="1. Le Vocabulaire : Adjacent et Hypoténuse" icon="🏷️" color="indigo">
        <p className="mb-4">Tout se passe dans un triangle RECTANGLE. Pour utiliser le Cosinus, tu dois maîtriser l'anatomie locale de ton angle aigu.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center mb-6">
           <div className="w-40 h-40 relative flex-shrink-0 mx-auto">
             <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
               <polygon points="10,90 90,90 10,30" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground"/>
               {/* Angle Droit */}
               <polyline points="10,80 20,80 20,90" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground"/>
               
               {/* Angle ciblé en B (90,90) */}
               <path d="M 70 90 A 20 20 0 0 0 78 78" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-500" />
               <text x="70" y="85" fontSize="10" fill="currentColor" className="text-rose-600 dark:text-rose-400 font-bold">Angle</text>
               
               {/* Côtés Highlightés */}
               {/* Adjacent (Bas) */}
               <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="5" className="text-sky-500"/>
               {/* Hypoténuse (Diagonale) */}
               <line x1="90" y1="90" x2="10" y2="30" stroke="currentColor" strokeWidth="5" className="text-emerald-500"/>
               
               <text x="45" y="105" fontSize="10" fill="currentColor" className="text-sky-600 font-bold text-center">Adjacent (Touche l'angle !)</text>
             </svg>
           </div>
           
           <div>
              <h3 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Les 2 Bras de l'Angle :</h3>
              <ul className="space-y-4 font-medium">
                <li><span className="text-emerald-500 font-bold mr-2">L'Hypoténuse :</span> C'est le chef. Le côté le plus long, en face de l'angle droit. Il ne change jamais d'identité.</li>
                <li><span className="text-sky-500 font-bold mr-2">Le Côté Adjacent :</span> C'est le côté "Voisin". Un angle est formé par DEUX murs qui se percutent. L'un des murs est l'hypoténuse. <br/><strong>L'Autre mur constructeur de l'Angle, c'est l'Adjacent !</strong></li>
              </ul>
           </div>
        </div>

        <TipBanner title="L'Unique Formule : Le Cri de ralliement" type="info">
           Dans le fameux mot "CAH-SOH-TOA" (que tu verras en 3ème au complet), la 4ème apprend le premier bloc "CAH" :<br/>
           <span className="text-2xl font-black font-mono block text-center my-2 text-indigo-600 dark:text-indigo-400">C = A / H</span><br/>
           Le <strong>C</strong>osinus de l'angle = Le Côté <strong>A</strong>djacent divisé par <strong>l'H</strong>ypoténuse.
        </TipBanner>
      </Section>

      <Section title="2. Trouver une Longueur Manquante" icon="📏" color="blue">
        <p className="mb-4">Imagine une échelle posée le long d'un mur. Tu connais l'angle au sol (60°), et la longueur dispo au sol (3m). Quelle est la longueur de l'échelle (l'hypoténuse) ?</p>

        <InteractiveExercise 
          title="Le Produit en Croix Cosmique"
          question={<>Dans le triangle RECTANGLE en A, l'angle B fait 60°. Le côté au sol AB (L'Adjacent) = 3m. Calcule l'hypoténuse BC.</>}
          steps={[
            <><strong>1. La Présentation Sacrée :</strong> "Dans le triangle ABC rectangle en A, on calcule le Cosinus de l'angle B."</>,
            <><strong>2. L'écriture Litéralle (Lettres) :</strong> <br/><code>Cos(B) = Adjacent / Hypoténuse = AB / BC</code></>,
            <><strong>3. On Remplie avec l'Argent (Les nombres) :</strong> <br/><code>Cos(60°) = 3 / BC</code></>,
            <><strong>4. L'Astuce Mondiale du Diable (Le /1) :</strong> Pour débloquer la calculette, on déguise "Cos(60°)" en fraction noble en mettant un "Sur 1".<br/><code>[Cos(60°) / 1] = [3 / BC]</code></>,
            <><strong>5. Le Produit en croix Croc-en-Jambe :</strong> Mon inconnu est BC.<br/><code>BC = (1 &times; 3) &divide; Cos(60°)</code></>,
            <><strong>Victoire Finale :</strong> Je tape ça à la machine : <code>BC = 3 &divide; Cos(60)</code>. Le résultat est <strong>6 !</strong> (L'échelle fait 6m de long).</>
          ]}
        />
      </Section>

      <Section title="3. Trouver un Angle Manquant (La machine Arccos)" icon="🎯" color="rose">
        <p className="mb-4">Parfois tu as l'échelle de 6m et le sol de 3m. Ton boss te demande de calibrer l'Inclinaison ! Tu connais (A) et (H), tu cherches l'Angle.</p>

        <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-3xl border border-rose-100 dark:border-rose-800/60 dark:border-rose-800 shadow-sm my-6">
           <h3 className="font-bold text-lg mb-4 text-rose-900 dark:text-rose-100 dark:text-rose-200">La Libération de l'Angle Captif</h3>
           
           <div className="space-y-4 font-mono">
             <div className="bg-card/50 dark:bg-black/30 p-2 rounded">
               1. Écrire le rapport pur : <code>Cos(?°) = 3 / 6</code>
             </div>
             <div className="bg-card/50 dark:bg-black/30 p-2 rounded">
               2. Calculer la fraction : <code>Cos(?°) = 0,5</code>
             </div>
             <div className="bg-card/50 dark:bg-black/30 p-2 rounded border-l-4 border-rose-500">
               3. <strong>Arccos (ou Cos⁻¹)</strong> ! Le "Cos" emprisonne mon angle. Pour le briser et passer de l'autre côté, j'utilise sa touche "Anti-matière" sur la calculatrice (Souvent <strong>Seconde + Cos</strong> ou <strong>Shift + Cos</strong>).
             </div>
             <div className="bg-gradient-to-r from-rose-400 to-rose-600 text-white p-3 rounded font-bold shadow-md text-center">
               ?° = Arccos(0,5)<br/>
               ?° = 60° !
             </div>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me donne un triangle banal équilatéral et me demande le Cosinus. Je fais quoi ?</>}
            back={<><strong>Alerte Erreur Fatale ! STOP !</strong><br/>Le mot "Cosinus" (comme Pythagore) est mort-né s'il n'y a PAS DE TRIANGLE <strong>RECTANGLE</strong> ! Tu dois soit abaisser une hauteur pour le couper en deux rectangles, soit écrire que l'exercice est impossible.</>}
          />
          <Flashcard 
            front={<>Ma calculatrice me dit que la longueur du mur fait -0.2 mètres !</>}
            back={<><strong>Problème de Machine de Guerre.</strong><br/>Ta calculatrice est en mode [Rad] (Radians) ou [Grad] (Grades). Appuie sur "Setup" ou "Mode" et bascule-la en <strong>Mode DEGRÉS [Deg]</strong> immédiatement, sinon tu auras ZÉRO à tout le Brevet.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi Cos(B) est coincé dans [0 ; 1] ? Ca ne peut pas valoir 5 ?",
              answer: "L'Hypoténuse (Le nombre du BAS de ta fraction) est toujours le plus GRAND côté physique. Si tu divises un nombre Normal par un Géant, la réponse est toujours un zéro-virgule-quelque-chose ! Cos(X) ne dépassera jamais 1 (Qui est l'angle nul ou l'égalité fatale). S'il vaut 1.5, tu as posé ta fraction à l'envers !"
            },
            {
              question: "Quelle est la différence entre Cos et Arccos ?",
              answer: "Si l'Angle t'est DONNÉ : Tu le mets dans la boîte COS pour fabriquer le Ratio (0.24, 0.5...). Si l'Angle est le TRESOR CACHÉ que tu cherches : Tu prends le ratio des longueurs (ex: 3/6) et tu le jettes dans la boite ARCCOS (Cos-1) qui te recrache le nombre de degeés pur !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "On veut calculer AC. L'équation de départ donne Cos(40°) = AC / 10. Quelle est l'opération finale ?",
              options: [
                "AC = 10 ÷ Cos(40°)",
                "AC = 10 × Cos(40°)",
                "AC = Cos(40°) / 10"
              ],
              correctAnswer: 1,
              explanation: "Top ! Si on fait le Produit en croix de la Ruse ultime avec [Cos/1 = AC/10] : La diagonale pleine c'est 10 multiplié par le bloc Cos(40)! (Et divisé par 1). Donc AC = 10 × Cos(40°)."
            },
            {
              question: "Dans le triangle ABC, rectangle en A. Quel est le côté ADJACENT à l'angle C ?",
              options: [
                "Le côté BC",
                "Le côté AC",
                "Le côté AB"
              ],
              correctAnswer: 1,
              explanation: "Parfait ! Le côté BC (face à l'angle droit) est le Roi Hypoténuse. Les deux bras de l'angle C sont donc [BC] et [AC]. Puisque BC est le roi intouchable, le vrai bras Adjacent c'est la ligne Terre, donc AC !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de vie 1 : JE VÉRIFIE LE 'D' oú 'DEG' en haut de l'écran de la calculatrice.",
            "Formule tatouée : Cos(A) = Adjacent / Hypotenuse (Toujours le chef couché en dessous).",
            "Fraction inversée = Alarme rouge de 0/20. Si le haut est plus gros que le bas, c'est faux !"
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

export default Course_College_4eme_11_Cosinus;
