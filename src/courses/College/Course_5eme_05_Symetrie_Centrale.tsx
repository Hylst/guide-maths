import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, StepList, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_05_Symetrie_Centrale: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Coordinates of point A: relative to the center O (0,0) represented inside SVG
  const [coordX, setCoordX] = useState<number>(-80);
  const [coordY, setCoordY] = useState<number>(-40);

  // Compute A' coordinates (opposite of A relative to O)
  const symX = -coordX;
  const symY = -coordY;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-SYMC"
        title="Symétrie Centrale"
        subtitle="Le Demi-Tour Absolu : quand tout s'inverse de l'autre côté d'un point central."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Symétrie axiale", "Tracer des segments et milieux"]}
        objectives={[
          "Comprendre l'action d'une symétrie centrale (demi-tour de 180°)",
          "Construire le symétrique d'un point, d'un segment, d'une droite",
          "Connaître et appliquer les propriétés de conservation de la symétrie",
          "Identifier un centre de symétrie dans une figure usuelle"
        ]}
      />

      <Section title="🌀 Le Pouvoir du Demi-Tour" icon="🌌" color="purple">
        <p className="lead text-lg">
          En classe de 6ème, tu as étudié la symétrie axiale : un pliage le long d'un axe. En 5ème, nous découvrons la <strong>Symétrie Centrale</strong>.
        </p>
        <p className="mt-4">
          C'est l'action de faire effectuer à une figure un <strong>demi-tour de 180°</strong> autour d'un point unique nommé <b>O</b> (le centre de la symétrie).
        </p>

        {/* Interactive SVG illustrating point-central symmetry */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm text-center">
          <h4 className="font-bold text-lg mb-4 text-purple-800 dark:text-purple-400">Manipule ton Point : La Symétrie en Temps Réel</h4>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>Position Horizontale (A) :</span>
                <input 
                  type="range" 
                  min="-140" 
                  max="-20" 
                  value={coordX} 
                  onChange={(e) => setCoordX(parseInt(e.target.value))}
                  className="w-32 accent-purple-600"
                />
                <span>{coordX} px</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Position Verticale (A) :</span>
                <input 
                  type="range" 
                  min="-80" 
                  max="80" 
                  value={coordY} 
                  onChange={(e) => setCoordY(parseInt(e.target.value))}
                  className="w-32 accent-purple-600"
                />
                <span>{coordY} px</span>
              </div>
            </div>

            <svg className="w-full max-w-lg h-64 border border-slate-100 rounded-2xl bg-slate-50 dark:bg-slate-900" viewBox="0 0 400 200">
              {/* Grid backgrounds */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-800" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Axes passing through center (200, 100) */}
              <line x1="200" y1="0" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />

              {/* Dotted line connecting A to A' */}
              <line x1={200 + coordX} y1={100 + coordY} x2={200 + symX} y2={100 + symY} stroke="#a855f7" strokeWidth="2" strokeDasharray="5" />

              {/* Center point O */}
              <circle cx="200" cy="100" r="5" fill="#000" className="dark:fill-white" />
              <text x="205" y="115" className="text-xs font-bold" fill="#000">O (Centre)</text>

              {/* Midpoint tick markers */}
              {/* tick 1 */}
              <g transform={`translate(${200 + coordX / 2}, ${100 + coordY / 2}) rotate(${Math.atan2(symY - coordY, symX - coordX) * (180 / Math.PI)})`}>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#ef4444" strokeWidth="2" />
              </g>
              <g transform={`translate(${200 + symX / 2}, ${100 + symY / 2}) rotate(${Math.atan2(symY - coordY, symX - coordX) * (180 / Math.PI)})`}>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#ef4444" strokeWidth="2" />
              </g>

              {/* Point A */}
              <circle cx={200 + coordX} cy={100 + coordY} r="7" fill="#2563eb" />
              <text x={200 + coordX - 10} y={100 + coordY - 12} className="text-sm font-extrabold fill-blue-700">A</text>

              {/* Point A' */}
              <circle cx={200 + symX} cy={100 + symY} r="7" fill="#ea580c" />
              <text x={200 + symX + 10} y={100 + symY + 18} className="text-sm font-extrabold fill-orange-700">A'</text>
            </svg>
            <p className="text-xs text-slate-500 font-mono">Observe : le point O est toujours exactement le milieu du segment [AA']. L'équilibre est parfait !</p>
          </div>
        </div>

        <InfoBlock type="funfact" title="L'Illusion du Papillon">
          Observe les ailes d'un moulin à vent, d'un hélicoptère ou le dessin d'une carte à jouer (le Roi ou l'As) — ils possèdent un centre de symétrie. Un demi-tour exact les ramène sur eux-mêmes !
        </InfoBlock>
      </Section>

      <Section title="📏 La Règle Inébranlable de Construction" icon="📐" color="indigo">
        <p className="mb-4">
          La construction au compas et à la règle se base sur une règle très simple et inébranlable :
        </p>
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 text-indigo-950 dark:text-indigo-50 p-6 rounded-2xl shadow-sm text-center font-bold text-lg mb-8">
          Si A' est le symétrique du point A par rapport au centre O... alors O est le MILIEU du segment [AA'].
        </div>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. Aligner la Cible</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Je trace à la règle une demi-droite [AO) qui prend naissance à mon point de départ A, traverse le centre de symétrie O et se prolonge derrière.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. L'Ouverture du Compas</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Je pique la pointe sèche de mon compas sur le point O, et j'ajuste l'écartement jusqu'au point A. J'ai capturé le rayon parfait !
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">3. Le Tranchage (L'image finale)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Sans modifier l'écartement, je fais pivoter le compas de l'autre côté du point O, puis je dessine un petit arc qui coupe ma demi-droite. L'intersection est le point clone A' !
            </p>
          </div>
        </StepList>
      </Section>

      <Section title="🔒 Conséquences et Propértiés de Conservation" icon="🔒" color="slate">
        <p>
          Comme la symétrie axiale, la symétrie centrale est respectueuse du monde géométrique : elle conserve toutes les mesures de départ !
        </p>
        <ul className="grid grid-cols-2 gap-4 mt-6 text-center text-slate-700 dark:text-slate-300 font-bold text-sm">
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">Les Longueurs (Segments)</li>
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">L'Alignement de points</li>
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">Les Mesures d'angles</li>
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">Les Aires et Périmètres</li>
        </ul>

        <TipBanner type="warning" title="La Transformation Spécifique">
          Il existe une propriété merveilleuse propre à la symétrie centrale : l'image d'une droite droite par rapport à une symétrie centrale est <strong>toujours une droite strictement parallèle</strong> !
        </TipBanner>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quel angle de rotation effectue-t-on lors d'une <strong>Symétrie Centrale</strong> ?</>}
            back={<>Une rotation d'exactement <strong>$180^\circ$</strong> (soit un demi-tour pur).</>}
          />
          <Flashcard 
            front={<>Si un segment mesure {"$6\\text{ cm}$"}, combien mesurera son symétrique ?</>}
            back={<>Il mesurera exactement <strong>{"$6\\text{ cm}$"}</strong> également, car la symétrie centrale conserve la longueur.</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Alignement mystère"
          question="Le point M, N et P sont alignés dans cet ordre avec MN = 3 cm et NP = 4 cm. On effectue la symétrie de centre O. Quel sera l'état des symétriques M', N' et P' ?"
          steps={[
            "J'utilise la propriété d'alignement : puisque la symétrie centrale conserve l'alignement, les points symétriques M', N' et P' seront également alignés dans le même ordre.",
            "J'applique ensuite la propriété de conservation des longueurs de segments.",
            "On en déduit que M'N' = 3 cm et N'P' = 4 cm. Les mesures restent parfaitement identiques."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Parallélisme forcé"
          question="Soit d une droite ne passant pas par le centre O. On construit son symétrique d' par rapport à O. Si la droite d s'oriente horizontalement, comment sera positionnée d' ?"
          steps={[
            "Je me réfère à la propriété de conservation des orientations.",
            "La symétrie centrale transforme une droite en une autre droite qui lui est strictement parallèle.",
            "La droite d' sera donc elle aussi parfaitement horizontale."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Que se passe-t-il si je calcule le symétrique d'un point qui est lui-même le centre ?",
              answer: "Le symétrique du point de centre O est lui-même ! On l'appelle un point double ou invariant. La distance [OO] = 0."
            },
            {
              question: "Y a-t-il un moyen simple d'identifier un centre de symétrie dans une lettre ?",
              answer: "Oui, si tu peux retourner ta lettre (la regarder à l'envers, comme de haut en bas) et qu'elle a exactement le même aspect, elle a un centre. Exemples : S, N, Z, H, et I !"
            },
            {
              question: "Pourquoi l'orientation change-t-elle par rapport à la symétrie axiale ?",
              answer: "La symétrie axiale fait un retournement de type miroir (gauche-droite). La symétrie centrale fait un demi-tour (gauche-droite ET haut-bas). La figure est donc totalement inversée."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Test du Vrai/Faux" icon="🕹️" color="purple">
        <p className="mb-4">Complète la logique temporelle !</p>
        <FillInTheBlanks 
          id="sym-eval"
          content={[
            "La symétrie axiale utilise une ligne comme miroir. Mais la symétrie ",
            { options: ["centrale", "magique", "parallèle"], correctAnswer: 0 },
            " utilise un simple point nommé Centre ou O. Cela revient à faire subir à ta figure une rotation de ",
            { options: ["90°", "180°", "360°"], correctAnswer: 1 },
            ". Si A' est le symétrique de A, la distance entre A et O est ",
            { options: ["plus grande que", "strictement égale à", "moitié moins que"], correctAnswer: 1 },
            " la distance entre O et A'. Le point O devient donc purement et simplement le ",
            { options: ["milieu", "côté opposé", "sommet principal"], correctAnswer: 0 },
            " du segment [AA'] ! Enfin, attention : le symétrique d'une droite avec ce sortilège sera une ligne qui lui est magiquement ",
            { options: ["perpendiculaire", "sécante", "parallèle"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la définition absolue d'une Symétrie Centrale de centre O ?",
              options: [
                "C'est un pliage selon une ligne passant par O.",
                "C'est un demi-tour de 180° autour du point O.",
                "C'est un glissement parallèle."
              ],
              correctAnswer: 1,
              explanation: "Exact ! La symétrie centrale est un vrai phénomène de rotation : un demi-tour à 180° autour du centre."
            },
            {
              question: "Laquelle de ces figures géométriques usuelles ne possède pas de centre de symétrie ?",
              options: [
                "Un Rectangle.",
                "Un Triangle équilatéral.",
                "Un Cercle."
              ],
              correctAnswer: 1,
              explanation: "En effet, un triangle équilatéral a 3 axes de symétrie mais pas de centre de symétrie (si tu le retournes à 180°, il pointe vers le bas, s'orientant à l'envers de l'original)."
            },
            {
              question: "Si l'on dessine le symétrique d'un angle aigu de 35° par rapport à un point O, le nouvel angle sera :",
              options: [
                "Un angle obtus de 145°.",
                "Un angle aigu de 35°.",
                "Un angle de 0°."
              ],
              correctAnswer: 1,
              explanation: "Bien joué ! L'angle conserve exactement son ouverture d'origine car la symétrie centrale conserve la mesure des angles."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que la symétrie centrale est un demi-tour (rotation de 180°) autour d'un point O.",
            "Je sais construire un point clone avec une règle et un compas (via la technique de l'arc et du milieu).",
            "Je sais que cette symétrie conserve tout : longueurs, aires, angles.",
            "Je sais que l'image d'une droite droite avec ce pouvoir produit une droite PARALLÈLE."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_05_Symetrie_Centrale;
