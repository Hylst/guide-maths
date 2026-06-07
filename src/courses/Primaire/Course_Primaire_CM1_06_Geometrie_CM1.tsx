import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../../components/SharedUI';
import { Grid, HelpCircle, Trophy, PenTool, Check, Compass, Sparkles } from 'lucide-react';

const Course_Primaire_CM1_06_Geometrie_CM1: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Symm state checks: we track if each of the 3 slots has been clicked
  const [slot1, setSlot1] = useState<boolean>(false);
  const [slot2, setSlot2] = useState<boolean>(false);
  const [slot3, setSlot3] = useState<boolean>(false);

  const isComplete = slot1 && slot2 && slot3;

  const handleReset = () => {
    setSlot1(false);
    setSlot2(false);
    setSlot3(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CM1-GEO"
        title="Géométrie et Symétrie"
        subtitle="Construire des droites perpendiculaires, parallèles et utiliser la symétrie axiale verticale ou horizontale."
        duration="30 min"
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La géométrie au CM1 demande une précision accrue dans l'utilisation des instruments (règle graduée, équerre). L'enjeu clé est la conceptualisation et la construction rigoureuse de droites parallèles et perpendiculaires, ainsi que la maîtrise de la symétrie axiale sur quadrillage puis sur papier blanc. Encouragez l'élève à toujours soigner le tracé au crayon bien taillé : la précision est la clé de voûte de la géométrie !
      </InfoBlock>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Le secret des bâtisseurs
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          As-tu déjà remarqué que les maisons, les ponts et même l'écran sur lequel tu lis ce cours sont remplis de formes mathématiques ? En géométrie, on n'utilise pas beaucoup les nombres, on utilise surtout nos <strong>yeux</strong> et nos <strong>outils</strong> (la règle, l'équerre, le compas).
          Tu vas devenir un véritable petit architecte et apprendre à tracer des routes qui ne se croisent jamais, à construire des angles parfaits pour que tes murs ne s'effondrent pas, et à comprendre comment sont fabriquées les boîtes magiques que l'on appelle les "solides". Enfile ton casque de chantier, c'est parti !
        </p>
      </div>

      <Section title="1. Droites Parallèles et Perpendiculaires" icon={<Compass className="w-6 h-6" />} color="emerald">
        <p className="mb-4">
          La géométrie du CM1 se concentre sur les relations entre les lignes droites. Les outils rois sont l'Équerre et la Règle. On parle de relation parfaite entre des droites.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBlock type="definition" title="Droites Parallèles (//)">
            Ce sont des droites qui sont "toujours écartées de la même distance". Comme des rails de train ! Elles peuvent se prolonger sans l'infini, elles ne se toucheront ou croiseront <strong>jamais</strong>.
          </InfoBlock>
          <InfoBlock type="definition" title="Droites Perpendiculaires (⊥)">
            Ce sont des droites qui se croisent, MAIS attention, elles doivent se croiser en formant une croix parfaite : elles forment <strong>4 angles droits</strong> (des coins de carré). On le vérifie avec l'équerre !
          </InfoBlock>
        </div>
      </Section>

      <Section title="2. La Symétrie Axiale" icon={<PenTool className="w-6 h-6" />} color="indigo">
        <p className="mb-4">
          La <strong>symétrie axiale</strong> est l'effet "Miroir". Un axe de symétrie agit comme un miroir. Si tu plies la feuille le long de cet axe (ligne rouge), les deux motifs doivent se superposer parfaitement l'un sur l'autre !
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-4 text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>L'Astuce de la construction :</strong> Pour construire le symétrique d'un point par rapport à un axe vertical rouge, tu passes perpendiculairement et comptes le même nombre de carreaux de l'autre côté de la ligne rouge !
        </div>

        {/* Butterfly Symmetry Grid Widget */}
        <div className="bg-gradient-to-br from-indigo-50/55 to-slate-50 border border-indigo-100 dark:from-slate-900/40 dark:to-slate-950 dark:border-indigo-900/40 p-6 rounded-[2rem] my-8 shadow-inner">
          <h4 className="font-bold text-center text-indigo-950 dark:text-indigo-50 text-base mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
            Exercice Pratique : Rends le Papillon Symétrique !
          </h4>
          <p className="text-xs text-slate-500 text-center mb-6">Regarde les points colorés posés sur l'aile gauche (à gauche de l'axe rouge). Clique sur les bons carreaux de l'aile droite pour faire réapparaître son jumeau magique !</p>

          <div className="flex flex-col items-center">
            {/* Grid Map SVG */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex justify-center">
              <svg viewBox="0 0 240 200" className="w-64 h-auto select-none">
                {/* Horizontal and Vertical Grid layout lines */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`lh-${i}`} x1="10" y1={20 + i * 26} x2="230" y2={20 + i * 26} stroke="#e2e8f0" strokeWidth="1" />
                ))}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line 
                    key={`lv-${i}`} 
                    x1={20 + i * 25} 
                    y1="10" 
                    x2={20 + i * 25} 
                    y2="170" 
                    stroke={i === 4 ? "#ef4444" : "#e2e8f0"} 
                    strokeWidth={i === 4 ? "3" : "1"} 
                  />
                ))}

                {/* Grid coordinates indices */}
                <text x="120" y="185" fill="#ef4444" fontSize="10" fontWeight="black" textAnchor="middle">AXE DE SYMETRIE</text>

                {/* LEFT WING ACTIVE DOTS (Originals) */}
                {/* Spot 1: Column index 2 (x=70), Row 1 (y=46) - Pink */}
                <circle cx="70" cy="46" r="8" fill="#ec4899" />
                <path d="M 70 46 L 120 46" stroke="#ec4899" strokeWidth="1" strokeDasharray="3, 3" opacity="0.4" />

                {/* Spot 2: Column index 1 (x=45), Row 3 (y=98) - Cyan */}
                <circle cx="45" cy="98" r="8" fill="#06b6d4" />
                <path d="M 45 98 L 120 98" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3, 3" opacity="0.4" />

                {/* Spot 3: Column index 2 (x=70), Row 5 (y=150) - Amber */}
                <circle cx="70" cy="150" r="8" fill="#eab308" />
                <path d="M 70 150 L 120 150" stroke="#eab308" strokeWidth="1" strokeDasharray="3, 3" opacity="0.4" />


                {/* RIGHT WING CLICKABLE TARGETS (Mirror reflection spots) */}
                {/* Mirror 1: Column index 6 (x=170), Row 1 (y=46) */}
                <g className="cursor-pointer" onClick={() => setSlot1(true)}>
                  <circle 
                    cx="170" 
                    cy="46" 
                    r="11" 
                    fill={slot1 ? "#ec4899" : "transparent"} 
                    stroke="#ec4899" 
                    strokeWidth="1.5" 
                    strokeDasharray={slot1 ? "none" : "2, 2"} 
                  />
                  {!slot1 && <text x="170" y="49" fontSize="9" fill="#ec4899" textAnchor="middle" fontWeight="bold">?</text>}
                </g>

                {/* Mirror 2: Column index 7 (x=195), Row 3 (y=98) */}
                <g className="cursor-pointer" onClick={() => setSlot2(true)}>
                  <circle 
                    cx="195" 
                    cy="98" 
                    r="11" 
                    fill={slot2 ? "#06b6d4" : "transparent"} 
                    stroke="#06b6d4" 
                    strokeWidth="1.5" 
                    strokeDasharray={slot2 ? "none" : "2, 2"} 
                  />
                  {!slot2 && <text x="195" y="101" fontSize="9" fill="#06b6d4" textAnchor="middle" fontWeight="bold">?</text>}
                </g>

                {/* Mirror 3: Column index 6 (x=170), Row 5 (y=150) */}
                <g className="cursor-pointer" onClick={() => setSlot3(true)}>
                  <circle 
                    cx="170" 
                    cy="150" 
                    r="11" 
                    fill={slot3 ? "#eab308" : "transparent"} 
                    stroke="#eab308" 
                    strokeWidth="1.5" 
                    strokeDasharray={slot3 ? "none" : "2, 2"} 
                  />
                  {!slot3 && <text x="170" y="153" fontSize="9" fill="#eab308" textAnchor="middle" fontWeight="bold">?</text>}
                </g>
              </svg>
            </div>

            {/* Explanatory helper cards */}
            <div className="mt-6 flex flex-col items-center max-w-sm">
              {!isComplete ? (
                <p className="text-xs text-slate-500 italic text-center">Indice : Compte depuis l'axe rouge vert la gauche, et reproduit la même distance vers la droite pour chaque point.</p>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center text-emerald-950 animate-bounce">
                  <h5 className="font-extrabold text-sm mb-1 flex items-center justify-center gap-1.5 text-emerald-700">
                    <Check className="w-4 h-4" /> Magnifique Papillon !
                  </h5>
                  <p className="text-xs">
                    Tu as positionné tous les points de façon parfaitement symétrique par rapport à la ligne rouge. Le papillon s'envole ! 🦋
                  </p>
                  <button 
                    onClick={handleReset} 
                    className="mt-3 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold font-mono transition-all"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="3. Quiz & Flashcards" icon={<HelpCircle className="w-6 h-6" />} color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Deux droites qui ne se touchent pas sur mon dessin sont forcément parallèles.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Attention au piège. Si elles vont un peu de travers, même si elles ne se touchent pas sur la feuille, en les prolongeant au crayon, elles finiront par se croiser. Deux droites sont parallèles uniquement si elles conservent la même distance.</span></>}
          />
          <Flashcard 
            front={<>Un carré a quatre axes de symétrie au total.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Un carré peut être plié parfaitement de 4 manières différentes : par l'axe horizontal, par l'axe vertical, et par ses 2 grandes diagonales !</span></>}
          />
        </div>
      </Section>

      <Section title="4. Exercices Pratiques" icon={<Grid className="w-6 h-6" />} color="amber">
        <InteractiveExercise
          title="Exercice 1 : Plier un rectangle"
          question={<p>Combien d'axes de symétries possède un rectangle non-carré (comme un écran de TV) ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/65">
              <p className="font-bold text-amber-900 dark:text-amber-150">Étape 1 : Les pliages simples</p>
              <p>On peut plier l'écran en deux avec une ligne verticale (1). On peut aussi le plier horizontalement (2).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/65">
              <p className="font-bold text-amber-900 dark:text-amber-150">Étape 2 : Le piège de la diagonale</p>
              <p>Si tu prends une feuille rectangulaire A4 et que tu la plies sur la diagonale, les bords ne se superposent pas ! Les angles dépassent. Les diagonales ne sont donc pas des axes de symétrie du rectangle.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/65 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le rectangle standard n'a que <strong>DEUX</strong> (2) axes de symétrie ! Le carré est le seul à gagner les diagonales.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Parallèles par miracle"
          question={<p>J'ai tracé une Ligne Rouge. Ensuite, je trace une ligne Bleue PERPENDICULAIRE (en croix) sur ma Rouge. Puis, plus loin, je trace une ligne Verte qui est AUSSI PERPENDICULAIRE à ma Rouge. Quel rapport entre ma Bleue et ma Verte ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/65">
              <p className="font-bold text-amber-900 dark:text-amber-150">Étape 1 : Le cheminement</p>
              <p>La Ligne Rouge est le rail central. La Bleue est calée à 90 degrés. La Verte, si elle est tracée aussi perpendiculaire à la Ligne Rouge plus loin, va pointer dans la même direction que la première !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/65 font-bold text-emerald-900 dark:text-emerald-110">
              <p>Solution : Deux droites perpendiculaires à la même troisième droite sont en fait... <strong>Parallèles (//)</strong> entre-elles !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Évaluation Rapide" icon={<PenTool className="w-5 h-5" />} color="slate">
        <p className="mb-4">Complète avec le bon outil pour ta construction :</p>
        <FillInTheBlanks 
          id="cm1-geo-eval"
          content={[
            "Pour vérifier si des coins de murs rentrant sont bien droits afin de monter ma cabane de jardin, il me faut mon ",
            { options: ["compas", "équerre", "rapporteur"], correctAnswer: 1 },
            ". \nDans l'effet miroir, l'espace entre le point P et la ligne d'axe, par rapport à l'écart entre le point reflété P' et la ligne d'axe est ",
            { options: ["plus petit", "plus grand", "exactement la même distance"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="6. Épreuve Finale" icon={<Trophy className="w-6 h-6" />} color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle lettre de l'alphabet majuscule contient UN axe de symétrie VERTICAL ?",
              options: [
                "E",
                "M",
                "S"
              ],
              correctAnswer: 1,
              explanation: "Le M peut se fendre au milieu verticalement et ses moitiés se superposent parfaitement. 'E' possède un axe horizontal."
            },
            {
              question: "Si la ligne (d) est // à la ligne (c), est-ce qu'une ligne perpendiculaire à (d) coupera (c) ?",
              options: [
                "Oui",
                "Non",
                "Seulement si je retourne la feuille"
              ],
              correctAnswer: 0,
              explanation: "Puisque les deux rails (d) et (c) vont dans la même direction, toute droite oblique ou perpendiculaire coupant un rail coupera inévitablement le second !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Parallèles = Rails de Train (même direction, ne se croisent jamais).",
            "Perpendiculaires = Croix Parfaite (4 angles droits validés avec l'équerre).",
            "Symétrie Axiale = Effet Miroir / Pliage.",
            "Distance Symétrie = Le reflet est à mi-distance du miroir par rapport à l'original, pile de l'autre côté de la perpendiculaire."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM1_06_Geometrie_CM1;
