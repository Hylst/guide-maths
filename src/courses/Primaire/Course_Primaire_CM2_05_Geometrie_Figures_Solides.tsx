import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Box, TriangleRight, Cuboid, Hexagon, Sparkles } from 'lucide-react';

const Course_Primaire_CM2_05_Geometrie_Figures_Solides: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [activePart, setActivePart] = useState<'faces' | 'aretes' | 'sommets'>('faces');

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM2-05"
        title="Géométrie - Figures et Solides"
        subtitle="Passer du Dessin Plat... Au Volume en 3D de l'Espace (Le Cube !)"
        duration="45min"
        level="CM2"
        prerequisites={["Connaitre les Polygones (Carré, Rectangle)", "Savoir tracer à l'Équerre"]}
        objectives={[
          "Connaitre le Vocabulaire 3D : Faces, Arêtes, Sommets.",
          "Reconnaitre un Cube et Un Pavé-Droit.",
          "Lire le Patron (La boite qu'on a éclatée et dépliée !)."
        ]}
      />

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Voyager dans l'espace
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          Jusqu'à maintenant, en géométrie, tu dessinais principalement des figures toutes plates sur ta feuille de papier : des carrés, des triangles ou des rectangles. C'est l'univers de la <strong>2D</strong> (deux dimensions).
          Mais notre monde réel n'est pas plat ! Les objets qui nous entourent ont de l'épaisseur, de la profondeur, de la hauteur. Ils occupent un volume. Bienvenue dans l'univers de la <strong>3D</strong> (trois dimensions) ! Aujourd'hui, tu vas apprendre à analyser les boîtes d'emballage, les dés à jouer et même les tentes de camping comme un véritable ingénieur de l'espace.
        </p>
      </div>

      <Section title="1. La 3D du Cinéma : Le Cube (Face, Arête, Sommet)" icon="Box" color="blue">
        <p className="mb-4">Au CM1 tu dessinais ton Carré sur une feuille. Il était PLAT (2D). Au CM2... Ton Carré s'extrait de la feuille !! Il Devient un Dé à Jouer, IL EST EN 3D !! C'est Le Super Cube.</p>
        
        {/* Interactive Isometric Cube Visualizer */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-slate-900/30 dark:to-slate-950 border border-indigo-150/40 dark:border-indigo-950 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-bounce" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Explorateur 3D : Autopsie d'un Cube</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6 font-medium">Sélectionne un élément anatomique pour le faire briller sur le Cube 3D Interactif !</p>

          <div className="flex flex-col sm:flex-row gap-2.5 mb-8 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
            <button
              onClick={() => setActivePart('faces')}
              className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                activePart === 'faces'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Les Faces (6) 🚪
            </button>
            <button
              onClick={() => setActivePart('aretes')}
              className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                activePart === 'aretes'
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Les Arêtes (12) 📏
            </button>
            <button
              onClick={() => setActivePart('sommets')}
              className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                activePart === 'sommets'
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Les Sommets (8) 📌
            </button>
          </div>

          <div className="w-full max-w-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* SVG isometric Cube */}
            <div className="flex justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <svg viewBox="0 0 200 200" className="w-40 h-40 select-none">
                {/* Behind dashed lines (hidden geometry) */}
                <line x1="30" y1="130" x2="100" y2="165" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" className="opacity-40" />
                <line x1="100" y1="165" x2="170" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" className="opacity-40" />
                <line x1="100" y1="165" x2="100" y2="20" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" className="opacity-40" />

                {/* Faces (Polygons) */}
                {/* Top Face */}
                <polygon
                  points="100,20 170,60 100,95 30,60"
                  fill="#3b82f6"
                  fillOpacity={activePart === 'faces' ? "0.6" : "0.15"}
                  stroke="#3b82f6"
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
                {/* Left Face */}
                <polygon
                  points="30,60 100,95 100,170 30,130"
                  fill="#8b5cf6"
                  fillOpacity={activePart === 'faces' ? "0.5" : "0.1"}
                  stroke="#8b5cf6"
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
                {/* Right Face */}
                <polygon
                  points="100,95 170,60 170,130 100,170"
                  fill="#ec4899"
                  fillOpacity={activePart === 'faces' ? "0.45" : "0.08"}
                  stroke="#ec4899"
                  strokeWidth="1"
                  className="transition-all duration-300"
                />

                {/* Visible Arêtes (Thick glowing lines) */}
                <g className="transition-all duration-300">
                  <line x1="100" y1="20" x2="170" y2="60" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="170" y1="60" x2="170" y2="130" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="170" y1="130" x2="100" y2="170" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="100" y1="170" x2="30" y2="130" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="30" y1="130" x2="30" y2="60" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="30" y1="60" x2="100" y2="20" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  {/* Inside standard axes */}
                  <line x1="100" y1="95" x2="100" y2="170" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="100" y1="95" x2="30" y2="60" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                  <line x1="100" y1="95" x2="170" y2="60" stroke={activePart === 'aretes' ? "#f43f5e" : "#475569"} strokeWidth={activePart === 'aretes' ? "3.5" : "1.5"} />
                </g>

                {/* Vertex Sommets Points */}
                <g className="transition-all duration-300">
                  {/* Visible ones */}
                  <circle cx="100" cy="20" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  <circle cx="170" cy="60" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  <circle cx="170" cy="130" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  <circle cx="100" cy="170" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  <circle cx="30" cy="130" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  <circle cx="30" cy="60" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  <circle cx="100" cy="95" r={activePart === 'sommets' ? "6" : "3"} fill={activePart === 'sommets' ? "#10b981" : "#1e293b"} />
                  {/* Hidden 8th point back */}
                  <circle cx="100" cy="165" r={activePart === 'sommets' ? "6" : "2"} fill={activePart === 'sommets' ? "#059669" : "#64748b"} fillOpacity={activePart === 'sommets' ? "1" : "0.3"} stroke="#fff" strokeWidth="0.5" />
                </g>
              </svg>
            </div>

            {/* Commentary box */}
            <div className="text-left w-full">
              {activePart === 'faces' && (
                <>
                  <h5 className="font-extrabold text-blue-600 text-sm mb-1">Les Faces (6) 🚪</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-tight">Ce sont les 6 plaques carrées planes qui délimitent le cube (comme les 6 faces d'un dé). En perspective on en voit 3, mais 3 autres sont cachées dessous et derrière !</p>
                </>
              )}
              {activePart === 'aretes' && (
                <>
                  <h5 className="font-extrabold text-rose-500 text-sm mb-1">Les Arêtes (12) 📏</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-tight">Ce sont les segments de droite où les faces se croisent. Le cube a 12 arêtes de même longueur qui forment son ossature rigide.</p>
                </>
              )}
              {activePart === 'sommets' && (
                <>
                  <h5 className="font-extrabold text-emerald-600 text-sm mb-1">Les Sommets (8) 📌</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-tight">Ce sont les coins pointus d'intersection des arêtes (le cube a 4 sommets à sa base supérieure et 4 autres sommets à sa base inférieure).</p>
                </>
              )}
            </div>
          </div>
        </div>

        <TipBanner title="Le Pavé Droit (Le Frère Aplati)" type="info">
           Le Cube a 6 faces en forme de Carrés Parfaits. <br/> Son grand frère le Cerveau Allongé : <strong> LE PAVÉ DROIT !</strong> est fait avec des Faces en force de <strong>Rectangles</strong> (Exemple: une Box internet, une Boite a chaussures, un dictionnaire !). 
        </TipBanner>
      </Section>

      <Section title="2. Et Si ON L'Explosait ??? => Le Patron" icon="Hexagon" color="emerald">
        <p className="mb-4">Si je prend mes Ciseaux, que e coupe le Scotchs de ma boite Amazon et que je L'ECRASE a plats sur le carrellage... J'obtien LE PATRON DE DECOUPAGE !</p>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-5 rounded-2xl border-t-8 border-emerald-400 shadow text-center">
           <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">La Formule Infernale (La Croix)</h4>
           <p className="text-sm text-slate-700 dark:text-slate-300">Le Cube applati Ressemble au dessin d'une Gorde CROIX en papier !!<br/> C'est (4 carreaux enfilés verticalement au centre). + (1 carreau a gouche) + (1 carreau a doite !!). </p>
           <p className="bg-emerald-200 mt-2 p-2 rounded mx-auto w-3/4">Si tu découpe cette forme de Croix et que tu fais Les plieages des arretes... Oh miracle tu recompose ton Dé a jouer !!!</p>
        </div>
      </Section>

      <Section title="3. Les Prismes ou les Pyramides (L'Egype)" icon="TriangleRight" color="amber">
        <p className="mb-4">Toutes les batisses 3D ne sont pas des boites carré de chaussures plates. Les formes pointues existent !</p>

        <InteractiveExercise 
          title="Prisme ou Pyramide ? (Le combat 3D)"
          question={<>Comment ne Pas s'embrouiller avec les formes chelous pointues de l'epace ??</>}
          steps={[
            <><strong>1. La PYRAMIDE d'Egitpe :</strong> Très simple. La boite a <strong>une BASE plate au Sol</strong> (1 Face polygonale qui pèse sous la terre). Et Tous les cotés montent en triangle pour Rejoindre <strong>LE PIQUANT UNIQUE AU SOMMET (Le Boss central de l'etoile !)</strong>. Elle Pique vers les cieux !</>,
            <><strong>2. LE PRISME :</strong> Ca n'a RIEN a voir ! C'est comme la boite du Toblerone ! La tente de Camping !. Il a <strong>DEUX BASES Identiques (Souvent TRIANGULAIRE : Toblerone !!)</strong>. Qui sotn Reliées entre elle apr des LONGS RECTANGLES MURS. Si tu l'allonges sur la taable, le Tobléone est long et sans "Un Gors Piquant Suprême". C'est Prisme !</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Combien de Faces Un Pavé Droit (ou Un Cube) posséde-il pour construire sa magie de l'Espace en 3d?</>}
            back={<><strong>6 FACES !! </strong><br/>Derrière, Devant, À Droite, À Gauche, En Bas et En Haut !! Les 6 remparts de la forteresse . (Prend un dé jouer ! Tu verras qu'il sarrete au nombre 6 absolu !!).</>}
          />
          <Flashcard 
            front={<>Le Monstre Vrai/Faux : "La Ligne ou deux Faces ce se croisent... c'est le Piquant de la morts : Le Sommet" ?</>}
            back={<><strong>FAUX ABSOLU !</strong><br/>C'est <strong>L'ARRETE !!</strong> (La barre des arretes du poisson de de bois). Le SOMMET c'est le piquant microscopique (le petit clou pointu) !!</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si Maman écrase La Boite a Chaussure tout en l'ouvant aux cisaux totallement PLAT pour la poubelle. Comment le Maitre Mathémtique appele cette forme Aplate et écatée !!?",
              options: [
                "C'est la Destruction du vide.",
                "C'est LE PATRON.",
                "C'est un Polyèdre de l'appocalyse."
              ],
              correctAnswer: 1,
              explanation: "Top ! LE PATRON de conception (Les lignes dessinnées a pltat qui vont te permettrent d ele plier pour faire ton volume magique!)."
            },
            {
              question: "Comment Le Prof sait reconnaitre le dessin d'un Dé Parfais (CUBE)  Du dessin Allongé D'une BOX Internet (Pabé Droit !)",
              options: [
                "Car le Cube est 100% fabriqué avec des Faces de forme de CARRES !! (Alors que le pavé droit a les faces qui ressemlent a des longs RECTANGLES !)",
                "Il le touche sur la feuille 2D.",
                "Non c'est pareil c'est moche."
              ],
              correctAnswer: 0,
              explanation: "Super boss ! OUI . Cube(Dé, parfait et divin en largeur / Longeur / Hauteur ). L'Autre c'est Allongé en un monstre a 3 differnts polds!"
            }
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

export default Course_Primaire_CM2_05_Geometrie_Figures_Solides;
