import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner, FormulaBox
} from '../../components/SharedUI';
import { Box, Layers, HelpCircle } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_6eme_09_Espace_Volumes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator States
  const [longueur, setLongueur] = useState(5);
  const [largeur, setLargeur] = useState(4);
  const [hauteur, setHauteur] = useState(3);

  // Isometric Projection Helper
  // Center of the canvas
  const u0 = 200;
  const v0 = 150;
  const S = 22; // Scale factor per unit

  const proj = (x: number, y: number, z: number) => {
    // 30 degrees isometric projection
    const u = u0 + (x - y) * 0.866 * S;
    const v = v0 + (x + y) * 0.5 * S - z * S;
    return { u, v };
  };

  // Generate faces polygons
  const getPointsString = (points: { u: number; v: number }[]) => {
    return points.map(p => `${p.u},${p.v}`).join(' ');
  };

  const volume = longueur * largeur * hauteur;
  const surfaceBase = longueur * largeur;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-09"
        title="Espace et Volumes"
        subtitle="Quitter le sol plat : La Conquête de la Troisième Dimension (3D)"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Périmètres et Aires (La 2D)", "Les unités simples de longueur"]}
        objectives={[
          "Reconnaître le Pavé Droit et le Cube (Solides).",
          "Calculer un Volume grâce à l'arme absolue : Base × Hauteur.",
          "Mémoriser l'unité Suprême : Le Mètre Cube (m³).",
          "Visualiser les volumes comme des empilements de cubes de 1 cm³."
        ]}
      />

      <Section title="🌟 Introduction : Adieu l'Écran Plat" icon="🚀" color="slate">
        <p>
          L'Aire (la 2D) de tes rectangles d'école d'hier, c'était le sol plat d'une pièce, ou un écran de téléphone sans aucune épaisseur. Les choses n'avaient pas de profondeur.
        </p>
        <p className="mt-4">
          En 6ème, tu passes en 3D. Tu utilises <strong>LES VOLUMES</strong>. Tu vas tirer la dalle vers le ciel et créer les murs de ton immeuble ! Un volume ne se mesure pas en carrelage plat, mais représente <strong>l'air, le vide ou l'eau</strong> nécessaire pour remplir une boîte à chaussures ou une barquette de bonbons !
        </p>
      </Section>

      {/* INTERACTIVE COMPONENT - 3D SVG CUBOID SIMULATOR */}
      <Section title="🛠️ Le Laboratoire en 3D : L'Empileur de Cubes" icon="Box" color="indigo">
        <p className="mb-6">
          Manipule les dimensions ci-dessous pour voir comment les cubes de <strong>1 cm³</strong> se rangent et construisent le pavé droit (cuboïde). Compte les étages !
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-indigo-50/50 dark:bg-indigo-900/10 p-6 md:p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/50">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <label htmlFor="longueur-slider" className="flex justify-between text-sm font-bold text-indigo-950 dark:text-indigo-200 mb-2">
                <span>Longueur (L)</span>
                <span className="bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-mono">{longueur} cm</span>
              </label>
              <input 
                id="longueur-slider"
                type="range" 
                min="1" 
                max="8" 
                value={longueur} 
                onChange={(e) => setLongueur(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="largeur-slider" className="flex justify-between text-sm font-bold text-indigo-950 dark:text-indigo-200 mb-2">
                <span>Largeur (l)</span>
                <span className="bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-mono">{largeur} cm</span>
              </label>
              <input 
                id="largeur-slider"
                type="range" 
                min="1" 
                max="8" 
                value={largeur} 
                onChange={(e) => setLargeur(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="hauteur-slider" className="flex justify-between text-sm font-bold text-indigo-950 dark:text-indigo-200 mb-2">
                <span>Hauteur (H)</span>
                <span className="bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-mono">{hauteur} cm</span>
              </label>
              <input 
                id="hauteur-slider"
                type="range" 
                min="1" 
                max="6" 
                value={hauteur} 
                onChange={(e) => setHauteur(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-indigo-200/50 space-y-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Aires au sol = <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">{surfaceBase} cm²</span>
              </p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Volume = <span className="font-mono text-xs">{longueur} × {largeur} × {hauteur}</span> = <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{volume} cm³</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex justify-center bg-card dark:bg-black/30 rounded-3xl border border-indigo-100/50 p-4 relative min-h-[300px] overflow-hidden">
            <svg width="100%" height="300" viewBox="0 0 400 300" className="max-w-md">
              <defs>
                <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c7d2fe" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="frontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#312e81" />
                  <stop offset="100%" stopColor="#1e1b4b" />
                </linearGradient>
              </defs>

              {/* Wireframe grids below base for aesthetic depth */}
              <g stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" className="dark:stroke-slate-800">
                {Array.from({ length: longueur + 1 }).map((_, x) => {
                  const p1 = proj(x, 0, 0);
                  const p2 = proj(x, largeur, 0);
                  return <line key={`bx-${x}`} x1={p1.u} y1={p1.v} x2={p2.u} y2={p2.v} />;
                })}
                {Array.from({ length: largeur + 1 }).map((_, y) => {
                  const p1 = proj(0, y, 0);
                  const p2 = proj(longueur, y, 0);
                  return <line key={`by-${y}`} x1={p1.u} y1={p1.v} x2={p2.u} y2={p2.v} />;
                })}
              </g>

              {/* Render blocks bottom to top, back to front */}
              {Array.from({ length: hauteur }).map((_, z) => {
                return Array.from({ length: largeur }).map((_, y_inv) => {
                  const y = largeur - 1 - y_inv; // draw back to front
                  return Array.from({ length: longueur }).map((_, x) => {
                    // Coordinates of each tiny unit cube
                    // We only draw visible outer faces to save processing, but for simple applet we draw simple wireframe/colors for cells
                    const pt000 = proj(x, y, z);
                    const pt100 = proj(x + 1, y, z);
                    const pt110 = proj(x + 1, y + 1, z);
                    const pt010 = proj(x, y + 1, z);
                    const pt001 = proj(x, y, z + 1);
                    const pt101 = proj(x + 1, y, z + 1);
                    const pt111 = proj(x + 1, y + 1, z + 1);
                    const pt011 = proj(x, y + 1, z + 1);

                    return (
                      <g key={`cube-${x}-${y}-${z}`} className="transition-all duration-300">
                        {/* Front Face */}
                        {y === largeur - 1 && (
                          <polygon 
                            points={getPointsString([pt010, pt110, pt111, pt011])}
                            fill="url(#frontGrad)"
                            stroke="#312e81"
                            strokeWidth="0.5"
                            opacity="0.9"
                          />
                        )}
                        {/* Right Face */}
                        {x === longueur - 1 && (
                          <polygon 
                            points={getPointsString([pt100, pt110, pt111, pt101])}
                            fill="url(#rightGrad)"
                            stroke="#1e1b4b"
                            strokeWidth="0.5"
                            opacity="0.9"
                          />
                        )}
                        {/* Top Face */}
                        {z === hauteur - 1 && (
                          <polygon 
                            points={getPointsString([pt001, pt101, pt111, pt011])}
                            fill="url(#topGrad)"
                            stroke="#4f46e5"
                            strokeWidth="0.5"
                            opacity="0.95"
                          />
                        )}
                      </g>
                    );
                  });
                });
              })}
            </svg>
            <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded font-mono">
              Projection 3D Isométrique
            </div>
          </div>
        </div>
      </Section>

      <Section title="1. L'anatomie d'un Solide" icon="Box" color="indigo">
        <p className="mb-4">
          Un solide est un objet en 3D qui possède trois caractéristiques principales à ne jamais confondre :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 rounded-2xl">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Les Faces</h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Ce sont les polygones plats qui enferment le solide. Un pavé droit possède exactement <strong>6 faces</strong> rectangulaires.
            </p>
          </div>
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Les Arêtes</h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Ce sont les segments de droite formés par la jonction de deux faces. Un pavé droit compte exactement <strong>12 arêtes</strong>.
            </p>
          </div>
          <div className="p-5 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800 rounded-2xl">
            <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-2">Les Sommets</h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Ce sont les coins pointus à l'intersection de trois arêtes. Un pavé droit a exactement <strong>8 sommets</strong>.
            </p>
          </div>
        </div>

        <InfoBlock type="reminder" title="Rappel important : Le Cube est un Pavé spécial">
          Le cube est un pavé droit dont toutes les dimensions sont égales. C'est-à-dire que sa Longueur, sa largeur et sa Hauteur font la même taille : l'arête {"$c$"}.
        </InfoBlock>
      </Section>

      <Section title="2. Le Secret de la Magie Volumique" icon="Layers" color="blue">
        <p className="mb-4">
          La formule universelle pour trouver le volume d'un pavé droit est la multiplication de ses trois dimensions :
        </p>

        <FormulaBox 
          title="Volume d'un Pavé Droit"
          math="V = L \times l \times h"
        />

        <p className="mb-4">
          Cela revient tout simplement à calculer la <strong>Superficie de la Base</strong> (posée sur le sol) et à la multiplier par la <strong>Hauteur</strong> (le nombre d'étages à empiler) :
        </p>

        <FormulaBox 
          title="Formule par Étagère"
          math="V = \text{Aire de la base} \times \text{Hauteur}"
        />

        <InfoBlock type="info" title="Zoom sur le Cube">
          Puisque Longueur = largeur = Hauteur = {"$c$"}, la formule du volume d'un Cube est simplement :
          <div className="text-center font-bold text-xl mt-2">
            <MathComponent math="V = c \times c \times c = c^3" />
          </div>
        </InfoBlock>
      </Section>

      <Section title="3. Les Unités et Équivalences d'Or" icon="Layers" color="emerald">
        <p className="mb-4">
          En volume, l'unité de référence internationale est le <strong>mètre cube (m³)</strong>.
          Imagine un carton géant qui fait 1 mètre de large, 1 mètre de long et 1 mètre de haut !
        </p>

        <TipBanner title="Le Litre est un Voyageur Spatial !" type="success">
          Grave bien ceci dans ta mémoire, c'est l'équivalence star des examens de mathématiques :
          <div className="text-center font-black my-3 text-lg">
            <MathComponent math="1 \text{ dm}^3 = 1 \text{ Litre (L)}" />
          </div>
          Cela veut dire qu'un petit carton cubique de 10 cm de côté (1 dm³) contient exactement une brique d'un litre d'eau ou de lait !
          De même :
          <div className="text-center font-black mt-2 text-lg">
            <MathComponent math="1 \text{ cm}^3 = 1 \text{ millilitre (mL)}" />
          </div>
        </TipBanner>

        <InfoBlock type="funfact" title="Le saviez-vous ? Le volume de notre planète !">
          Le volume total de la Terre est estimé à environ {"$1,08 \\times 10^{12}$"} kilomètres cubes (km³). C'est plus de mille milliards de kilomètres cubes de roches et de magma chaud !
        </InfoBlock>
      </Section>

      <Section title="✍️ Exercices Résolus : Deviens un Pro du Calcul" icon="Layers" color="amber">
        <p className="mb-6">Voici comment résoudre deux types d'exercices très classiques en classe.</p>
        
        <InteractiveExercise 
          title="Exercice 1 : Le Volume d'une Boîte à Chaussures"
          question={<>Une boîte à chaussures possède les dimensions suivantes : Longueur = 40 cm, largeur = 20 cm, Hauteur = 15 cm. Calcule son volume en {"$cm^3$"}.</>}
          steps={[
            <><strong>1. J'identifie les dimensions :</strong> On a {"$L = 40\\text{ cm}$"}, {"$l = 20\\text{ cm}$"}, et {"$h = 15\\text{ cm}$"}. Elles sont toutes exprimées avec la même unité (les centimètres), donc aucun piège de conversion !</>,
            <><strong>2. J'applique la formule :</strong> Le volume s'obtient par la formule : <MathComponent math="V = L \times l \times h" /></>,
            <><strong>3. Je fais le calcul étape par étape :</strong><br/>
               D'abord, la base au sol : {"$40 \\times 20 = 800\\text{ cm}^2$"} d'aire de carton.<br/>
               Ensuite, je multiplie par le nombre d'étages : {"$800 \\times 15 = 12\\,000\\text{ cm}^3$"}.</>,
            <><strong>4. Conclusion :</strong> Le volume de la boîte à chaussures est de <strong>{"$12\\,000\\text{ cm}^3$"}</strong> (ce qui équivaut à 12 L !).</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Remplir une Piscine de Jardin"
          question={<>Une petite piscine gonflable pour enfant a une forme de pavé droit de Longueur = 2 m, largeur = 1,5 m et une hauteur d'eau de 0.5 m. Combien de LITRES d'eau faut-il pour la remplir à ras bord ?</>}
          steps={[
            <><strong>1. Je calcule le volume en mètres cubes (m³) :</strong><br/>
               On fait : <MathComponent math="V = 2 \times 1,5 \times 0,5" /><br/>
               {"$2 \\times 1,5 = 3\\text{ m}^2$"} de surface au sol.<br/>
               {"$3 \\times 0,5 = 1,5\\text{ m}^3$"} d'eau.</>,
            <><strong>2. Je convertis les mètres cubes en décimètres cubes (dm³) :</strong><br/>
               Dans le tableau des volumes, chaque unité a un facteur de 1000 avec sa voisine. Donc, {"$1\\text{ m}^3 = 1000\\text{ dm}^3$"}.<br/>
               Par conséquent : {"$1,5\\text{ m}^3 = 1,5 \\times 1000 = 1500\\text{ dm}^3$"}.</>,
            <><strong>3. J'applique l'équivalence suprême en litres :</strong><br/>
               Puisque {"$1\\text{ dm}^3 = 1\\text{ Litre}$"}, alors {"$1500\\text{ dm}^3 = 1500\\text{ Litres}$"}.</>,
            <><strong>4. Conclusion :</strong> Il faut <strong>1500 Litres d'eau</strong> pour remplir cette piscine !</>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards" icon="Layers" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me tend un Rubik's Cube qui fait 10 cm d'arête. Quel est son volume ?</>}
            back={<><strong>1000 cm³ !</strong><br/>Un cube a toutes ses arêtes égales. Sa formule est {"$c \\times c \\times c$"}.<br/>On fait : {"$10 \\times 10 \\times 10 = 1000\\text{ cm}^3$"} (soit exactement 1 Litre !).</>}
          />
          <Flashcard 
            front={<>Comment passer de {"$dm^3$"} en {"$cm^3$"} dans mes calculs ?</>}
            back={<><strong>Je multiplie par 1000 !</strong><br/>En 3D (exposant 3), chaque décalage d'unité vers la droite multiplie la valeur par mille, car l'espace grandit très vite dans les trois dimensions.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="HelpCircle" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'utilise L * l... et que je n'ai AUCUNE HAUTEUR (ex: h = zéro). Combien vaut le Volume ?",
              answer: "Le volume vaut strictement 0 cm³. Un objet purement plat en 2D ne peut posséder aucune profondeur ni emprisonner aucune goutte d'eau. C'est le carrelage vide."
            },
            {
              question: "Quelle est la différence entre Aire et Volume ?",
              answer: "L'Aire mesure la superficie occupée sur le sol (en 2D, ex: cm²). Le Volume mesure l'espace total à trois dimensions enfermé à l'intérieur de l'objet (en 3D, ex: cm³)."
            },
            {
              question: "Un pavé droit possède-t-il toujours le même nombre de sommets qu'un cube ?",
              answer: "Oui ! Le pavé droit et le cube appartiennent tous deux à la même famille de solides. Ils partagent exactement la même structure géométrique : 6 faces, 12 arêtes et 8 sommets."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="Layers" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle dimension physique permet d'exprimer un Volume ?",
              options: [
                "La dimension 2D (Aires)",
                "La dimension 3D (Espace)",
                "La dimension 1D (Lignes)"
              ],
              correctAnswer: 1,
              explanation: "Exactement ! Le volume se calcule en 3 dimensions puisque l'objet a une longueur, une largeur et une hauteur."
            },
            {
              question: "Si un pavé a pour arêtes : L = 3 cm, l = 2 cm, H = 5 cm. Quel est son volume ?",
              options: [
                "10 cm³",
                "30 cm³",
                "15 cm³"
              ],
              correctAnswer: 1,
              explanation: "Super ! En multipliant les 3 côtés, on obtient : 3 × 2 = 6 cm² pour le sol, puis 6 × 5 = 30 cm³ pour l'espace complet."
            },
            {
              question: "Quelle quantité d'eau peut-on verser au maximum dans un aquarium creux de 1 dm³ de volume interne ?",
              options: [
                "1 Litre",
                "10 Litres",
                "0.1 Litre"
              ],
              correctAnswer: 0,
              explanation: "Parfait ! 1 dm³ contient exactement un Litre de liquide. C'est l'équivalence universelle fondamentale."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier les Sommets (8), les Arêtes (12) et les Faces (6) d'un pavé droit.",
            "Je connais la formule magique du Volume d'un Pavé : V = L × l × h.",
            "Je sais que 1 dm³ est strictement égal à un Litre d'eau."
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

export default Course_College_6eme_09_Espace_Volumes;
