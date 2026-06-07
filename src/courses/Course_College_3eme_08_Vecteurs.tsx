import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { MoveUpRight, FastForward, Repeat, Merge } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_08_Vecteurs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-08"
        title="Vecteurs et Translations"
        subtitle="Domptez les flèches mathématiques pour faire voyager les points !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Géométrie du plan", "Le quadrilatère : losange, parallélogramme"]}
        objectives={[
          "Comprendre ce qu'est une Translation (un 'glissement').",
          "Caractériser le super-outil mathématique de ce glissement : le Vecteur.",
          "Construire une figure à l'aide d'une translation tracée par un vecteur.",
          "Découvrir l'incroyable addition de la Relation de Chasles."
        ]}
      />

      <Section title="🌟 Introduction : Le Télésiège Mathématique" icon="🚠" color="slate">
        <p>
          En géométrie classique de CP, on apprend à dessiner des cercles, des carrés, bref : des figures statiques. Mais comment fait-on pour créer une formule mathématique qui <strong>décrit un mouvement précis dans l'espace plat</strong>, comme le vent ou le courant d'une rivière de Mario Kart ?
        </p>
        <p className="mt-4">
          La réponse : <strong>La Translation</strong>. Et cette force motrice pure est décrite par un chef d'orchestre surdoué et asymétrique : le <strong>Vecteur !</strong>
        </p>
      </Section>

      <Section title="1. La Translation : le glissement figé" icon="🏂" color="indigo">
        <p className="mb-4">Imagine une télécabine de ski ou un chariot de montagnes russes dans un ascenseur horizontal. Une Translation, c'est l'action magistrale de <strong>GLISSER</strong> une figure dans une dimension plane, sans JAMAIS la déformer ni la faire tourner sur elle-même.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800">
               <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3 border-b border-sky-200 dark:border-sky-800 pb-2">Ce qui se passe :</h4>
               <ul className="space-y-2">
                 <li>✅ La figure bouge "tout droit".</li>
                 <li>✅ Tout glisse avec la même force et direction.</li>
                 <li>✅ Le parallélisme géométrique est gardé.</li>
                 <li>✅ Toutes les mesures sont inchangées "conservées".</li>
               </ul>
           </div>
           
           <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800/60 dark:border-rose-800">
               <h4 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 mb-3 border-b border-rose-100 dark:border-rose-800/60 dark:border-rose-800 pb-2">Ce qui est INTERDIT :</h4>
               <ul className="space-y-2">
                 <li>❌ Tourner la figure (Rotation)</li>
                 <li>❌ Faire "miroir" avec la figure (Symétrie)</li>
                 <li>❌ Agrandir ou réduire la figure (Homothétie)</li>
               </ul>
           </div>
        </div>
      </Section>

      <Section title="2. Qu'est-ce qu'un Vecteur ?" icon="🏹" color="emerald">
        <p className="mb-4">Le Glissement de la translation que l'on vient de voir est "scellé", ordonné et tracé par <strong>le fameux Vecteur</strong>. On le note avec une sublime flèche pointée vers la droite au-dessus de deux points, comme ceci : <strong className="font-serif italic text-xl">$\\vec{`{AB}`}$</strong></p>
        
        <div className="bg-card p-6 rounded-2xl border border-border-strong border-l-8 border-emerald-500 shadow-sm my-6 relative overflow-hidden">
          <MoveUpRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 text-emerald-500/20" />
          <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-4">Le Saint Trépied (L'ADN) d'un Vecteur</h3>
          <p className="mb-3 text-muted-text">Un vecteur est composé avec une rigueur absolue de TROIS caractéristiques fondamentales :</p>
          <ul className="space-y-3 font-medium text-foreground">
             <li><span className="bg-emerald-100/50 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 px-2 py-1 rounded mr-2">1. La Direction</span> 'L'autoroute'. L'inclinaison de sa ligne d'appui. Est-ce horizontal, vertical, ou en pente selon une droite définie (ex: celle de '(AB)') ?</li>
             <li><span className="bg-emerald-100/50 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 px-2 py-1 rounded mr-2">2. Le Sens</span> 'Le bout de l'autoroute'. La pointe de la flèche va d'où vers où ? Par exemple : de A vers B avec un certain cap. (Nord-Est, Sud-Sud-Est...)</li>
             <li><span className="bg-emerald-100/50 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 px-2 py-1 rounded mr-2">3. La Norme</span> (La Longueur pure). La distance absolue du trajet et force de propulsion pour arriver, soit la longueur du segment <MathComponent math={"[AB]"} />.</li>
          </ul>
        </div>
        
        <InfoBlock title="Le sens caché du vecteur AB" type="warning">
           Dire <strong className="font-serif">$\\vec{`{AB}`}$</strong> veut dire mathématiquement "Le vent et le voyage subit par tout point du bout de mon vecteur afin d'aller magiquement du point originaire A vers sa station d'accueil terminale B". Et oui, l'ordre est vital. $\\vec{`{AB}`}<MathComponent math={" est le strict opposé tragique de "} />\\vec{`{BA}`}$. Moteur Arrière !
        </InfoBlock>
      </Section>

      <Section title="3. L'Égalité ou Le Parallélogramme (Le Duo Gagnant !)" icon="👯" color="blue">
        <p className="mb-4">Si deux chemins de vent diffèrent en lieu mais partagent LA MÊME INCLINAISON (Le Parallèle Parfait !), LA MÊME FLECHE CAP et LA MÊME DISTANCE DE POUSSEE, alors nous disposons de deux "<strong>Vecteurs ÉGAUX</strong>".</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800 my-6 shadow-sm flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
             <h3 className="font-bold text-sky-800 dark:text-sky-200 text-xl border-b border-sky-200 dark:border-sky-800 mb-4 pb-2">Propriété fondamentale au Brevet</h3>
             <div className="font-serif text-2xl text-center space-y-4 font-bold text-black dark:text-white my-6">
                <div>Dire que $\\vec{`{AB}`}<MathComponent math={" = "} />\\vec{`{CD}`}$</div>
                <div className="text-sm text-muted-text font-sans">équivaut rigoureusement à annoncer à la barre de la Cour d'honneur que :</div>
                <div className="text-sky-600 dark:text-sky-400">Le quadrilatère ABDC est un Parallélogramme (Parfait croisé).</div>
             </div>
           </div>
           
           <div className="bg-card w-48 h-40 rounded-xl border border-sky-500 flex justify-center items-center relative overflow-hidden shadow-inner flex-shrink-0">
             {/* Simple geometric representation */}
              <svg width="150" height="100" viewBox="0 0 150 100">
                 {/* Vector AB */}
                 <line x1="20" y1="20" x2="100" y2="20" stroke="currentColor" className="text-rose-500" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                 <text x="20" y="15" fontFamily="sans-serif" fontSize="12" fill="currentColor">A</text>
                 <text x="100" y="15" fontFamily="sans-serif" fontSize="12" fill="currentColor">B</text>
                 
                 {/* Vector CD (Parallel and equal to AB) */}
                 <line x1="40" y1="80" x2="120" y2="80" stroke="currentColor" className="text-rose-500" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                 <text x="40" y="75" fontFamily="sans-serif" fontSize="12" fill="currentColor">C</text>
                 <text x="120" y="75" fontFamily="sans-serif" fontSize="12" fill="currentColor">D</text>

                 {/* Connecting lines for Parallelogram ACDB (note the D B cross!) */}
                 <line x1="20" y1="20" x2="40" y2="80" stroke="currentColor" strokeDasharray="4" className="text-sky-500 opacity-60" strokeWidth="2"/>
                 <line x1="100" y1="20" x2="120" y2="80" stroke="currentColor" strokeDasharray="4" className="text-sky-500 opacity-60" strokeWidth="2"/>
                 
                 <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto" className="text-rose-500" fill="currentColor">
                    <polygon points="0 0, 6 2, 0 4" />
                  </marker>
                </defs>
              </svg>
           </div>
        </div>
        
        <TipBanner title="Attention au piège de l'ordre des lettres !" type="warning">
           Regarde bien le dessin si <span className="font-serif font-bold">$\\vec{`{AB}`}<MathComponent math={" = "} />\\vec{`{CD}`}$</span>. Le Parallélogramme ferme la boucle en croisements alternés, on lit les points en "tournant" autour de la forme, ce qui donne le nom du parallélogramme parfait des échelons magiques : <strong>AB<span className="text-rose-500 underline">DC</span></strong> (et JAMAIS ABCD, le piège commun mortel !).
        </TipBanner>
      </Section>

      <Section title="4. L'Enchantement Divin de Chasles" icon="✨" color="amber">
        <p className="mb-4">Michel Chasles, inventeur géométrique royal (1793-1880), a formalisé la plus belle loi d'enchaînement de l'univers : La Formule Magique du "raccourci parfait" (L'addition de super-vecteurs glissants).</p>

        <InteractiveExercise 
          title="Le secret purificateur de M. Chasles"
          question={<>Apprenons la loi formelle d'addition pure : <br/><strong className="font-serif text-amber-600 dark:text-amber-400">$\\vec{`{AB}`}<MathComponent math={" + "} />\\vec{`{BC}`}<MathComponent math={" = "} />\\vec{`{AC}`}$</strong><br/>Que peux-tu observer ?</>}
          steps={[
            <><strong>L'observation visuelle :</strong> La lettre finale noble "B" du pur premier vecteur heurte de l'axe frontal la première noble de fer du suivant "B" ! Elles s'entrechoquent et l'univers s'anime en annulation !</>,
            <><strong>L'histoire réelle :</strong> Je me propulse de <MathComponent math={"A"} /> à <MathComponent math={"B"} />, puis je campe, et je repars de <MathComponent math={"B"} /> vers la noble destination <MathComponent math={"C"} />. Le bilan ? J'ai été de <MathComponent math={"A"} /> à formel <MathComponent math={"C"} />. C'est un raccourci !</>,
            <><strong>Le point de fuite de la matrice (Astuce Brevet) :</strong> <span className="font-serif font-bold">$\\vec{`{AB}`}<MathComponent math={" + "} />\\vec{`{BA}`}<MathComponent math={" = "} />\\vec{`{AA}`}$</span>, or sauter de A pour la direction de A... C'est rester inamovible sur sa place à distance ZERO ! Il engendre instantanément le <strong>"Vecteur Nul" $\\vec{0}$</strong>.</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande de trouver l'image de mon losange <MathComponent math={"EFGH"} /> par la translation pure "de Vecteur <MathComponent math={"AB"} />". Que faire ?</>}
            back={<>Prends les 4 points (<MathComponent math={"E, F, G, H"} />) du noble losange. Fais-les glisser de manège l'un après l'autre, vers <strong>le même cap absolu (flèche du <MathComponent math={"A"} /> au <MathComponent math={"B"} />) et sur la même distance exacte (longueur <MathComponent math={"AB"} />)</strong>. Un nouveau losange "Fantôme Projeté" s'imprimera loin d'ici d'exacte et pure copie inébranlable !</>}
          />
          <Flashcard 
            front={<>Réduit brutalement par l'épée de Chasles le sort :<br/>$\\vec{`{JK}`}<MathComponent math={" + "} />\\vec{`{ML}`}<MathComponent math={" + "} />\\vec{`{KM}`}$</>}
            back={<>On trie les aimants d'attraction !<br/>$\\vec{`{JK}`}<MathComponent math={" accroche avec frénésie "} />\\vec{`{KM}`}$.<br/>$\\vec{`{JK}`}<MathComponent math={" + "} />\\vec{`{KM}`}<MathComponent math={" fusionnent en formidable "} />\\vec{`{JM}`}$.<br/>Puis enfin, $\\vec{`{JM}`}<MathComponent math={" attire "} />\\vec{`{ML}`}$ pour s'effacer d'acier pur en <strong>$\\vec{`{JL}`}$</strong> !! Le résultat suprême.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si deux vecteurs ont la bonne diagonale d'angle et la belle flèche de direction, et sont sur une voie de train... mais de longueur (Normes) inégales d'un millimètre... Sont-ils un Duo 'Égal' ?",
              answer: "Mortel Non ! Les vecteurs doivent impérativement cocher le trio à l'unisson de force. La Direction. Le Sens pur, et LA LONGUEUR rigide inébranlée absolue d'égale pureté. Sinon c'est juste un bout de dessin informe (colinéarité pure mais point de 'égalité')."
            },
            {
              question: "Pourquoi a-t-on crée cette loi de Chasles ? (Ça sert à quelque chose dans l'existence ?)",
              answer: "L'addition vectorielle permet de réduire trois forces lourdes à un unique trait majestueux. Imagine 3 remorqueurs en chalut tirant ton immense porte-conteneurs naufragé en 3 directions d'angle à sens uniques... Additionne les vecteurs avec Chasles ou des montages parallèles et tu sais d'un vif éclair si tu fonces à 40 nœud dans le brise-lame du port du bout du monde !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle forme garantit mathématiquement et pur au millimètre que l'information noble Vectorielle { Vecteur AB = Vecteur ML } porte en son cœur géométrique d'acier l'existence vivante du polygone 'ABLM' ?",
              options: [
                "Un Rectangle (Carré formel d'angle droit)",
                "Un Parallélogramme purement formé et non croisé",
                "Un Losange formel",
                "Un Trapèze aux deux lignes douces"
              ],
              correctAnswer: 1,
              explanation: "Top ! 2 Vecteurs égaux (en long et cap et voie!) prouvent d'un seul jet inamovible (de source mathématique) que les deux sentiers joints et liés et accrochés sont l'incarnation visuelle d'un inébranlable et saint 'Parallélogramme' ! Prends grand soin de l'ordre d'étiquette, 'AB - LM'."
            },
            {
              question: "Si j'ordonne une Translation parfaite d'une sublime maison en dessin, la fameuse belle flèche glisse l'encadrement en tout point. L'Épicière veut savoir si les angles de fenêtres ont tournés : l'aurez vous tournée l'image de symétrie d'un bord au flan ?",
              options: [
                "OUI, mon angle s'est retourné c'est l'essence du glissement flânant du saut de la Translation de vent.",
                "NON ! AUCUNE rotation ! Tout reste intact. Le soleil pur éclaire toujours l'Est strict ! C'est le Serment divin du 'Glissement Total Conservé'."
              ],
              correctAnswer: 1,
              explanation: "Le Culte du Glissement absolu de pierre et de glace ! La translation d'un vaisseau plat est interdit de rotation, et protégé de miroir, c'est purement statique et glisse."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "La Trinité du Saint Vecteur ! Direction, Sens et Norme",
            "Mémorisé pour le Brevet formel le lien charnel de fusion : 2 formel Vecteurs Égaux = Un Parallélogramme.",
            "L'attraction du pôle pur Chasles ! AB + BC = AC !"
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

export default Course_College_3eme_08_Vecteurs;
