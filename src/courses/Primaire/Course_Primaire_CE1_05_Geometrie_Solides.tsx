import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Box, Triangle, Scissors, Copy } from 'lucide-react';

const Course_Primaire_CE1_05_Geometrie_Solides: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE1-05"
        title="Géométrie - Solides et Symétrie"
        subtitle="Les monstres en 3D et le miroir magique !"
        duration="40min"
        level="CE1"
        prerequisites={["Connaître les formes plates (Carré, Cercle)"]}
        objectives={[
          "Savoir la différence entre 2D (plat) et 3D (volume).",
          "Reconnaître un Cube, une Boule, un Cylindre.",
          "Plier le papier avec l'Axe de Symétrie (L'effet Miroir)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Le CE1 fait le grand saut du "plat" (2D) au volume (3D). Montrez-leur des objets du quotidien (boîte à chaussures, canette, ballon) pour identifier les solides. Pour la symétrie, rien ne vaut la technique de la peinture qui se plie en deux ou le calque !
      </InfoBlock>

      <Section title="1. Sortir de la feuille : Les Solides (La 3D)" icon={<Box className="w-6 h-6"/>} color="blue">
        <p className="mb-4">Au CP, on dessinait des Carrés. C'était <strong>P L A T</strong> (Sur la feuille). Mais dans la vraie vie, une boîte a une épaisseur, on peut mettre des objets dedans ! C'est ce qu'on appelle la Troisième Dimension (3D) ou Les Solides !</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
           <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 text-center">
             <div className="text-4xl mb-2">🎲</div>
             <h4 className="font-bold text-sky-700">Le Cube</h4>
             <p className="text-xs mt-2">C'est le grand frère du Carré en 3D ! Toutes ses faces sont des carrés pafait (Ex: Un Dé à jouer).</p>
           </div>
           
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 text-center">
             <div className="text-4xl mb-2">⚽</div>
             <h4 className="font-bold text-emerald-700 dark:text-emerald-300">La Sphère (Boule)</h4>
             <p className="text-xs mt-2">Le grand frère du Cercle ! Ronde de partout, elle roule sur la table à l'infini (Ex: Un ballon ou la Terre).</p>
           </div>

           <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-800/60 text-center">
             <div className="text-4xl mb-2">🥫</div>
             <h4 className="font-bold text-rose-700 dark:text-rose-300">Le Cylindre</h4>
             <p className="text-xs mt-2">Au dessus et en dessous c'est plat et rond, le tour est droit. Elle roule si on la couche ! (Ex: Une boîte de conserve).</p>
           </div>
        </div>
      </Section>

      <Section title="2. Le Miroir de la Symétrie (Le reflet de l'eau)" icon={<Copy className="w-6 h-6"/>} color="indigo">
        <p className="mb-4">La symétrie, c'est l'art des ailes de papillons ! Tu dessines une moitié, la nature dessine EXACTEMENT l'autre moitié de l'autre côté d'un trait invisible.</p>

        <TipBanner title="L'Axe de Symétrie (La Tranchée au Centre)" type="success">
           L'Axe de Symétrie est la grande ligne droite (Le fameux miroir). Si tu <strong>plies ta feuille pile poil sur cette ligne</strong>, les deux moitiés du dessin s'écrasent exactement l'une sur l'autre, sans dépasser !
        </TipBanner>

        <InteractiveExercise 
          title="Le Papillon ou Le Monstre Borgne ?"
          question={<>Un papillon est-il Symétrique ? Un pirate avec un bandeau sur un oeil est-il Symétrique ?</>}
          steps={[
            <><strong>1. Le Papillon :</strong> Pli le papillon en deux sur son ventre. La gosse aile droite couvre PILE la grosse aile gauche. Super, il est l'Empereur de la <strong>Symétrie VRAIE !</strong></>,
            <><strong>2. Le Pirate :</strong> Coupe (enfin dessine un trait) le pirate en deux entre son nez. Il a un Oeil à droite, MAIS à gauche c'est un cache-oeil noir.. Ca ne superpose PAS pareils. Il n'est <strong>PAS Symétrique !!</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Je sui un solide en 3D fait que de Carrés, je pique les doigts, je ne roule JAMAIS. Qui suis-je ?</>}
            back={<><strong>Un CUBE !!</strong><br/>Aucun arrondi, aucune courbe. Je tombe direct à plat !</>}
          />
          <Flashcard 
            front={<>Le reflet de la lune et des arbres Parfaitement dans le lac calme... Est-ce de la Symétrie ?</>}
            back={<><strong>OUI !! C'est la Symétrie dans la nature !</strong><br/>Le bord de l'eau est "l'Axe de Symétrie", et le haut se reflète pile en bas.</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si tu mets de la peinture rouge sur les bouts de ton pouce droit. Et que tu frappes fort ton pouce de la main gauche contre le pouce droit... C'est la Symétrie. Mais que ce passe-t-il si tu superpose tes deux Lanières avec des motifs DIFFERENTS ?",
              options: [
                "C'est quand même symétrique.",
                "Non, L'axe de Symétrie exite uniquement si le MÊME dessin se copie-colle à l'envers EXACTEMENT !.",
                "La peinture va sêcher."
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! La symétrie c'est un Pliage PARFAIT de superposition de motifs identiques !"
            },
            {
              question: "Lequel de ces objets est UN SOLIDE (En 3D Volume dans la main) ?",
              options: [
                "Un Triangle dessiné à la règle sur mon cahier.",
                "Un Pavé-Droit (Comme une boîte à chaussure Amazon) !.",
                "Une tâche d'encre."
              ],
              correctAnswer: 1,
              explanation: "Et oui ! La boîte peut contenir de l'espace. Le triangle dessiné est emprisonné, aplati dans sa zone de papier plat sans fin."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais faire la différence entre une forme plate (2D) et un solide en volume (3D).",
            "Je sais reconnaître un Cube, un Cylindre et une Sphère.",
            "Je comprends que l'axe de symétrie est la ligne imaginaire de pliage parfait, comme dans un miroir."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider la Leçon (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CE1_05_Geometrie_Solides;
