import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Layers, Activity, Scissors, MousePointer2 } from 'lucide-react';

const Course_College_6eme_08_Symetrie_Axiale: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-08"
        title="La Symétrie Axiale"
        subtitle="L'Art Subtil du Miroir Plié"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Géométrie de Base (Savoir utiliser une règle, un compas, une équerre)"]}
        objectives={[
          "Comprendre l'effet 'Miroir'.",
          "Tracer le symétrique d'un Point au Compas ou à l'Équerre.",
          "Mémoriser les Propriétés Divines de Conservation (Poids, Longueur, Angle)."
        ]}
      />

      <Section title="🌟 Introduction : Le Papillon" icon="🦋" color="slate">
        <p>
          As-tu dejà plié une feuille pleine de peinture fraiche en deux, pour obtenir une immense tache en forme de papillon ou de monstre quand tu l'ouvres ? 
          Si oui, tu es un maître de la Symétrie Axiale ! L'axe (le trait central) est <strong>La Pliure de Papier</strong>.
        </p>
        <p className="mt-4">
          La <strong>Symétrie Axiale</strong> fonctionne comme un Miroir posé à la verticale au milieu du bureau. Tout ce qui est à Gauche réapparait à Droite, C'est un retournement total. (Le grand B devient parfois un p bizzare : B | 𐐒)
        </p>
      </Section>

      <Section title="1. Comment Traverser le Miroir ? (Pour un Point)" icon="Layers" color="indigo">
        <p className="mb-4">Tout point "A" de notre dimension possède un double maléfique "A'" de l'autre coté du Miroir (d).</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
           <div className="flex-1 w-full order-2 md:order-1 relative h-48 bg-card dark:bg-black/40 rounded-xl overflow-hidden shadow border border-indigo-100 flex items-center justify-center">
             {/* Axe symetrie */}
             <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 border-l-4 border-rose-500"></div>
             
             {/* Point A */}
             <div className="absolute top-1/3 left-[20%] w-3 h-3 bg-indigo-600 rounded-full shadow-lg"></div>
             <span className="absolute top-[20%] left-[20%] font-bold text-indigo-900 dark:text-indigo-100">A</span>
             
             {/* Trait pointillé */}
             <div className="absolute top-1/3 left-[20%] right-[20%] h-0 border-t-2 border-dashed border-indigo-300"></div>
             {/* Point A' */}
             <div className="absolute top-1/3 right-[20%] w-3 h-3 bg-emerald-600 rounded-full shadow-lg"></div>
             <span className="absolute top-[20%] right-[20%] font-bold text-emerald-900 dark:text-emerald-100">A'</span>
             
             <span className="absolute bottom-4 left-1/2 translate-x-2 text-rose-500 font-bold">(d)</span>
           </div>
           
           <div className="flex-[1.5] order-1 md:order-2 space-y-4">
             <h3 className="font-bold text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Les 2 conditions du Rituel :</h3>
             <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
               <li><strong>Condition 1 (Perpendiculaire / Equerre) :</strong> Le trait (pointillé) qui relie A à son clone A' <strong>doit Frapper l'Axe de symérie (d) de FACE en faisant un Pleur Angle Droit (90°) !</strong> On franchi pas le miroir de travers.</li>
               <li><strong>Condition 2 (L'Équidistance / Règle) :</strong> La distance entre A et la vitre (l'axe) DOIT ETRE EXACTEMENT LA MÊME qu'entre la vitre et le clone (A'). (Si A est à 5cm du miroir, le clone A' spawnera à 5cm derrière le miroir).</li>
             </ul>
           </div>
        </div>
      </Section>

      <Section title="2. Les Pouvoirs de Rajeunissement (La Conservation)" icon="Scissors" color="emerald">
        <p className="mb-4">Le Miroir Axiale a un pouvoir divin de Mathématique qu'on appel la <strong>Conservation</strong>.</p>

        <TipBanner title="Le Clone est Copie Conforme Absolu" type="success">
           La symétrie axiale <strong>Conserve Tout !</strong><br/>
           <br/>
           Si je symétrise [AB] long de 10cm, le clone [A'B'] fera 10cm. <strong>(Longueurs conservées)</strong>.<br/>
           Si je symétrise un Angle Pointu de 20°, la bouche de Croco du Clone faira 20° exact. <strong>(Angles conservés)</strong>.<br/>
           Si je symétrise un cercle qui pesait "15cm² d'Aïre", les Clone fera 15cm² d'Aire. <strong>(Aires Conservées)</strong>.<br/>
           <br/>
           La SEULE chose qui s'inverse... c'est le "Coté/Sens" (Ton bras droit dans le miroir correspond au bras gauche du reflet).
        </TipBanner>
      </Section>
      
      <Section title="3. L'Astuce Maîtresse (L'Objet SUR le miroir)" icon="MousePointer2" color="blue">
        <InteractiveExercise 
          title="La Goutte de Peinture posée SUR la pliure"
          question={<>Ton point 'C' est complètement écrasé <strong>DIRECTEMENT</strong> sur la ligne rouge de l'Axe de Symétrie (d). Où va apparaitre son clone (C') ?</>}
          steps={[
            <><strong>1. L'Analyse Panique :</strong> Je veux faire la règle de Symétrie. A quelle distance de la Vitre je suis ? Mince, je touche la vitre, donc à (0cm) !</>,
            <><strong>2. L'apparition du Clone :</strong> S'il n'y a pas de distance (0), alors le Clone apparaîtra derrière le mur à (0cm). Il est Coincé !</>,
            <><strong>3. Résultat Ultime :</strong> Si un point est posé SUR L'AXE DE SYMÉTRIE... Son symétrique est <strong>LUI MÊME ! (Il ne bouge pas d'un pixel)</strong>. (C et C' se confondent comme par magie).</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le Symétrique du segment [EF] est un Triangle obtus ?</>}
            back={<><strong>Erreur Dimensionnelle Fatale !</strong><br/>La Symétrie conserve la nature de la Bête ! Le symétrique d'un segement est un Segment !! (Le symétrique d'une droite est une droite, d'un point un point, d'un monstre un monstre).</>}
          />
          <Flashcard 
            front={<>Je construit mon C' avec mon Equerre et ma Règle. Y'a t-il un outil plus rapide ?</>}
            back={<><strong>Le Compas-Sniper !</strong><br/>Pointe sèche du compas plantée SUR L'AXE. Tu ouvre ton bec jusqu'au Point C ! Et tu fouette direct de l'autre coté en faisant un grand demi-cercle Arc De Feu. C' apparaît directement au croisement Équidistant !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la définition savante de 'La Médiatrice' dont on parle tout le temps au sujet de la symétrie ?",
              answer: "L'Axe de symétrie entre A et son petit Clone A'.... EST la médiatrice du segment invisible [AA']. C'est à dire la droite lazer qui Transperce le segment AA' en son pleins Milieu, et a L'Équerre Parfaite (Perpendiculaire) !"
            },
            {
              question: "Si j'ai un grand M, est-il symétrique ?",
              answer: "Oui, un M posee un Axe de Symétrie interne (au milieu, entre ses deux jambes verticales). Si tu le plies dans le sens de la longueur, le coté droit recouvrera le coté gauche sans dépasser d'1 poil !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "L'Angle DEF possède une ouverture de 78°. Son Frère symétrique (D'E'F') aura une ouverture de :",
              options: [
                "Je ne peux pas savoir, il faut mon rapporteur.",
                "102°, car c'est inversé. (180 - 78).",
                "78° ! Les clones ont la MEME GUEULE Mâchoire !"
              ],
              correctAnswer: 2,
              explanation: "Top ! Conservation Absolue. Les propriétes s'appliquent. L'écartement n'est pas broyé par le mirroir. L'angle reste 78°."
            },
            {
              question: "Je suis le point Z, je flotte en bas de la feuille. (d) est l'axe de symétrie. La ligne qui me relie à mon clone Z' est...",
              options: [
                "Parallèle à l'Axe (d).",
                "Perpendiculaire à l'Axe (d).",
                "Un Ligne courbe."
              ],
              correctAnswer: 1,
              explanation: "Bingo ! Le trajet spirituel 'ZZ' pour traverser la vitre frappe TOUJOURS la de front : il crache un feu Perpendiculaire (Angle droit) le long du mur (d)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mémorisé l'Axe (d) = Miroir Total ou Pliure.",
            "Trajet du corps pour spawn chez le clone : Angle Droit face au mur + Memé Distance.",
            "Conserver les Super Pouvoirs : Taille du clone = Taille Source. Angle clone = Angle source."
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

export default Course_College_6eme_08_Symetrie_Axiale;
