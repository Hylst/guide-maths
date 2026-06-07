import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Maximize, Scaling, Calculator, DivideSquare, Sparkles, HelpCircle, Trophy } from 'lucide-react';

const Course_Primaire_CM1_07_Grandeurs_Mesures_Aires_Proportionnalite: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [l, setL] = useState<number>(4); // Longueur (columns)
  const [w, setW] = useState<number>(3); // Largeur (rows)

  const perimeter = 2 * (l + w);
  const area = l * w;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM1-07"
        title="Grandeurs, Aires et Proportionnalité"
        subtitle="Transformer et Mesurer avec les recettes de Grand-mère"
        duration="45min"
        level="CM1"
        prerequisites={["Le Périmètre (Somme du contour)", "Les Multiplications par 10, 100"]}
        objectives={[
          "Faire la Différence Totale entre Périmètre et Aire.",
          "Calculer L'Aire du Rectangle et du Carré magique.",
          "Comprendre La Proportionnalité (La Table de X).",
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Ce chapitre lie la géométrie physique (le calcul des surfaces via l'Aire) à l'arithmétique pratique (la Proportionnalité). L'erreur classique est de confondre l'Aire (l'intérieur, la surface) avec le Périmètre (le contour). Utilisez des exemples concrets de bricolage (la clôture du jardin contre le gazon à semer). Pour la proportionnalité, la cuisine ou les recettes de gâteaux multipliées sont le meilleur moyen d'ancre le concept de "double/triple".
      </InfoBlock>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Le jardin et la clôture
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Imagine que tu possèdes un magnifique terrain pour construire une cabane. Tu as deux grands objectifs :
        </p>
        <ul className="list-decimal ml-6 text-slate-700 dark:text-slate-300 space-y-1 mb-3">
          <li>Sécuriser le terrain avec du grillage pour empêcher les moutons d'entrer.</li>
          <li>Semer de la pelouse PARTOUT à l'intérieur de ta clôture.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour acheter le <strong>grillage</strong>, le vendeur va te demander : "Quelle est la longueur totale de votre clôture ?". Tu vas devoir additionner tout le bord de ton jardin : c'est le <strong>Périmètre</strong>.<br/>
          Pour acheter les <strong>graines</strong>, le vendeur va te demander : "Quelle est la taille globale du sol de votre jardin ?". Là, le contour ne suffit pas, il faut calculer la place qu'il y a <em>à l'intérieur</em> : c'est l'<strong>Aire</strong>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
          Dans ce chapitre, tu vas devenir le roi de l'aménagement et apprendre à calculer ces deux valeurs sans te tromper, tout en découvrant la magie des "proportions" pour calculer les prix sans calculatrice !
        </p>
      </div>

      <Section title="1. Périmètre VS L'Aire (La Clôture contre Le Gazon)" icon={<Maximize className="w-6 h-6" />} color="rose">
        <p className="mb-4">C'est le plus grand défi du CM1 : faire de façon innée la différence entre le Périmètre (ce qui fait le tour) et cette nouvelle bête : <strong>l'Aire !</strong></p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-rose-50/50 dark:bg-rose-900/20 p-6 rounded-2xl border-t-8 border-rose-500 shadow-sm text-center">
             <div className="w-16 h-16 border-4 border-rose-500 mx-auto flex items-center justify-center mb-4 rounded-xl">
                 <span className="text-rose-500 font-bold block">X</span>
             </div>
             <h4 className="font-bold text-rose-700 dark:text-rose-300 text-xl">LE PÉRIMÈTRE</h4>
             <p className="mt-2 text-sm text-slate-700 dark:text-slate-300"><strong>C'est le Contour Extérieur !</strong><br/>La clôture du jardin, la ficelle pour lier le paquet. (On fait une ADDITION).</p>
           </div>
           
           <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-6 rounded-2xl border-t-8 border-emerald-500 shadow-sm text-center">
             <div className="w-16 h-16 bg-emerald-450 border-4 border-emerald-500 mx-auto flex items-center justify-center mb-4 text-white font-bold rounded-xl">L'Intérieur</div>
             <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-xl">L'AIRE</h4>
             <p className="mt-2 text-sm text-slate-700 dark:text-slate-300"><strong>C'est LA SURFACE À L'INTÉRIEUR !</strong><br/>Le gazon à semer, le parquet ou la moquette à étaler. (On fait une MULTIPLICATION).</p>
           </div>
        </div>
        
        <TipBanner title="L'Unité de l'Aire le 'CARRÉ' !" type="success">
           L'Aire se compte en petits carrés posés au sol. Si ta Longueur est mesurée en mètres (m), l'Aire (la surface intérieure) s'exprime en <strong>mètres-carrés (exposant 2 : m²) !</strong> C'est la signature universelle des aires.
        </TipBanner>
      </Section>

      <Section title="2. Formules d'Attaque (Rectangle & Carré)" icon={<Calculator className="w-6 h-6" />} color="indigo">
        <p className="mb-4">Pour calculer la surface de moquette qu'il te faut, tu ne vas pas compter les petits carrés un par un à la main, un architecte MULTIPLIE !</p>

        {/* Dynamic Perimeter vs Area Grid Sandbox */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 border border-indigo-100 dark:from-slate-900/40 dark:to-slate-950 dark:border-indigo-900/40 p-6 rounded-[2rem] my-8 shadow-inner">
          <h4 className="font-bold text-center text-indigo-950 dark:text-indigo-50 text-base mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500 animate-spin-slow" />
            Simulateur de Rectangle : Périmètre vs Aire
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual SVG Output Grid of the Rectangle */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
              
              {/* Dynamic SVG Drawing */}
              <div className="relative w-48 h-36 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  {/* Draw internal area tiles in emerald color */}
                  {Array.from({ length: l }).map((_, colIdx) => {
                    const colX = 20 + colIdx * (160 / l);
                    return Array.from({ length: w }).map((_, rowIdx) => {
                      const rowY = 15 + rowIdx * (90 / w);
                      return (
                        <rect
                          key={`tile-${colIdx}-${rowIdx}`}
                          x={colX + 1}
                          y={rowY + 1}
                          width={(160 / l) - 2}
                          height={(90 / w) - 2}
                          fill="#10b981"
                          fillOpacity="0.15"
                          stroke="#10b981"
                          strokeWidth="0.5"
                          strokeOpacity="0.3"
                        />
                      );
                    });
                  })}

                  {/* Rectangle Perimeter borders: Bold dashed red line */}
                  <rect
                    x="20"
                    y="15"
                    width="160"
                    height="90"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="4, 4"
                  />

                  {/* Labels on sides */}
                  <text x="100" y="10" fontSize="8" fill="#ef4444" fontWeight="bold" textAnchor="middle">Longueur = {l} m</text>
                  <text x="10" y="65" fontSize="8" fill="#ef4444" fontWeight="bold" textAnchor="middle" transform="rotate(-90 10 65)" className="origin-center">Largeur = {w} m</text>
                </svg>
              </div>

              {/* Contorls elements */}
              <div className="w-full mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Longueur (murs horizontaux) :</span>
                    <span className="font-mono text-indigo-500 font-extrabold">{l} m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={l}
                    onChange={(e) => setL(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Largeur (murs verticaux) :</span>
                    <span className="font-mono text-indigo-500 font-extrabold">{w} m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="4"
                    value={w}
                    onChange={(e) => setW(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Side summary details of calculation outputs */}
            <div className="space-y-4">
              {/* Perimeter calculations details */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-red-100 dark:border-red-950/40 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">PERIMÈTRE (Contour)</span>
                  <span className="px-2.5 py-0.5 bg-red-100 dark:bg-red-950/40 text-red-700 text-xs font-black rounded-full font-mono">{perimeter} m</span>
                </div>
                <div className="text-sm font-mono text-slate-600 dark:text-slate-300 leading-normal">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Calcul du contour :</p>
                  {"$2 \\times ("+l+" + "+w+") = 2 \\times "+(l+w)+" = "+perimeter+"$ m"}
                  <p className="text-[11px] text-slate-450 mt-1 dark:text-slate-400">On additionne bien la longueur de tous les bords du rectangle !</p>
                </div>
              </div>

              {/* Area calculations details */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-950/40 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">AIRE (Remplissage)</span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 text-xs font-black rounded-full font-mono">{area} m²</span>
                </div>
                <div className="text-sm font-mono text-slate-600 dark:text-slate-300 leading-normal">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Calcul des dalles :</p>
                  {"$Longueur \\times Largeur = "+l+" \\times "+w+" = "+area+"$ m²"}
                  <p className="text-[11px] text-slate-450 mt-1 dark:text-slate-400">On multiplie les deux dimensions pour recouvrir tout le sol !</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/60 mb-6 font-mono text-center space-y-4">
           <div className="flex flex-col md:flex-row gap-4 p-4 text-left">
              <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded shadow border border-indigo-100 dark:border-indigo-800/60">
                <h5 className="font-bold text-sky-700 border-b pb-2 mb-2 text-sm">Aire du Rectangle</h5>
                <p className="text-base text-center font-bold">{"$Longueur \\times Largeur$"}</p>
                <p className="text-xs text-slate-500 text-center mt-2">(On multiplie son grand mur par son petit mur de côté ! Et ça couvre toute la surface ! Ex: 5 × 3 = 15 m²).</p>
              </div>
              
              <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded shadow border border-emerald-100 dark:border-emerald-800/60">
                <h5 className="font-bold text-emerald-700 dark:text-emerald-300 border-b pb-2 mb-2 text-sm">Aire du Carré Parfait</h5>
                <p className="text-base text-center font-bold">{"$Côté \\times Côté$"}</p>
                <p className="text-xs text-slate-500 text-center mt-2">(Comme un rectangle mais la longueur et la largeur sont identiques ! Ex: 4 × 4 = 16 cm².)</p>
              </div>
           </div>
        </div>
      </Section>

      <Section title="3. La Proportionnalité" icon={<Scaling className="w-6 h-6" />} color="amber">
        <p className="mb-4">Si 1 crêpe coûte 2€. Combien coûtent 3 crêpes ? C'est le <strong>triple</strong> du prix ! (2€ x 3 = 6€). C'est ça la proportionnalité ! Tu mènes une action d'un côté, l'autre réagit exactement à l'identique !</p>

        <InteractiveExercise 
          title="Le Tableau du Pâtissier !"
          question={<>On fait un gâteau pour 4 personnes (il faut 100g de farine et 2 oeufs). Demain, il y a 8 invités ! Dois-je recommencer le calcul en panique ?</>}
          steps={[
            <><strong>1. L'Œil de L'Aigle (La connexion) :</strong> On passe de 4 personnes à 8 personnes. Quel est le lien multiplicatif entre 4 et 8 ? C'est... <strong>le double ! (4 × 2 = 8).</strong></>,
            <><strong>2. L'effet miroir (La loi de l'univers) :</strong> Si le nombre de personnes fait un saut multiplicatif [ x 2 ], alors l'ensemble des ingrédients fait le même saut au même instant !</>,
            <><strong>3. Résultat Farine :</strong> 100g de farine [x 2] = <strong>200g de Farine !</strong></>,
            <><strong>4. Résultat Œufs :</strong> 2 Œufs [x 2] = <strong>4 Œufs !</strong></>,
            <><strong>Et si c'était pour 12 invités ? (Le triple) :</strong> La relation entre le point de départ 4 et le nombre 12 invités ? C'est le triple ! Tous les ingrédients feront [x 3] !</>
          ]}
        />
      </Section>

      <Section title="4. Quiz & Flashcards" icon={<HelpCircle className="w-6 h-6" />} color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur te demande l'Aire d'un carré de 5cm de côté. Tu lui réponds quoi ? C'est la surface ou le périmètre ?</>}
            back={<><strong>C'est la SURFACE à l'intérieur du carré !</strong><br/>Et le calcul magique c'est Côté × Côté ! Donc : 5 × 5 = 25. N'oublie pas l'unité : 25 cm² (Centimètres Carrés) !</>}
          />
          <Flashcard 
            front={<>Si l'âge est magique : à 10 ans je mesure 1m... Est-ce qu'à 20 ans (l'âge double x2) je mesurerai forcément 2m ?</>}
            back={<><strong>FAUX ABSOLU ! L'âge n'est PAS proportionnel à la taille !</strong><br/>Sinon à 80 ans (x8), ton grand-père mesurerait huit mètres ! Tout dans la vie n'est pas réglé par la proportionnalité.</>}
          />
        </div>
      </Section>

      <Section title="5. Épreuve Finale" icon={<Trophy className="w-6 h-6" />} color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'unité universelle de mesure de l'Aire ?",
              options: [
                "L'Aire se compte toujours en 'Mètre CARRE' (m²). Le petit exposant 2 vient s'ajouter !",
                "L'Aire se mesure avec l'addition simple (ex 4 + 4).",
                "L'Aire se mesure juste en traçant le contour."
              ],
              correctAnswer: 0,
              explanation: "Exact ! L'Aire est une mesure à deux dimensions (Longueur x Largeur). On compte les dalles intérieures, d'où le petit ² de m² pour désigner 2 dimensions."
            },
            {
              question: "Si j'ai fait 1 trou au golf avec 2 balles au départ. Pour faire 5 trous (x5) dans les mêmes conditions, combien de balles faut-il ?",
              options: [
                "2 balles + 5 = 7.",
                "C'est proportionnel ! Si je multiplie par 5 les trous, je multiplie par 5 les balles ! Donc 10.",
                "J'arrête le golf."
              ],
              correctAnswer: 1,
              explanation: "Parfait ! La proportionnalité agit comme un miroir multiplicatif. Si un côté fait x5, l'autre fait de même !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Ajouter le contour de tous les côtés = c'est le Périmètre (la clôture).",
            "Multiplier la Longueur par la Largeur = c'est l'Aire (le gazon à semer) !",
            "Mémorisé: La proportionnalité n'utilise pas l'addition, elle fonctionne avec la multiplication !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM1_07_Grandeurs_Mesures_Aires_Proportionnalite;
