import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, FormulaBox, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_10_Espace_Prismes_Cylindres: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Solid selection state
  const [solidType, setSolidType] = useState<'prism' | 'cylinder'>('prism');
  // Interactive dimensions
  const [baseDim, setBaseDim] = useState<number>(6); // radius for cylinder, side for triangular prism (in cm)
  const [heightDim, setHeightDim] = useState<number>(12); // height of solid (in cm)

  // Calculations
  const prismBaseArea = (Math.sqrt(3) / 4) * baseDim * baseDim; // equilateral triangle base area
  const cylinderBaseArea = Math.PI * (baseDim / 2) * (baseDim / 2); // pi * r^2, baseDim as diameter
  
  const currentBaseArea = solidType === 'prism' ? prismBaseArea : cylinderBaseArea;
  const volume = currentBaseArea * heightDim;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-VOL"
        title="Espace : Prismes et Cylindres"
        subtitle="Sortir de la 2D pour appréhender la perspective, construire des patrons et calculer des volumes."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Formule d'Aire simple", "Notions de figures planes"]}
        objectives={[
          "Reconnaître et caractériser les prismes droits et les cylindres de révolution",
          "Calculer l'aire des bases et le volume de ces solides",
          "Comprendre l'organisation et le tracé de patrons de solides",
          "Effectuer des conversions d'unités de volume complexes (cm³, L, dm³)"
        ]}
      />

      <Section title="⚠️ Introduction : La Troisième Dimension" icon="🧊" color="rose">
        <p className="lead text-lg">
          En 6ème, tu as manipulé le pavé droit (la boîte à chaussures) et le cube (le dé). Mais notre univers ne contient pas que des angles droits carrés !
        </p>
        <p className="mt-4">
          Que se passe-t-il si l'on prend un triangle, un polygone quelconque ou même un cercle au sol et qu'on l'élève verticalement d'une certaine hauteur ? On obtient respectivement un <strong>prisme droit</strong> ou un <strong>cylindre de révolution</strong>.
        </p>
        
        <InfoBlock type="definition" title="Le Concept de l'Ascenseur">
          Imagine une figure géométrique plane (un triangle ou un disque) posée à plat. Fais-la monter de manière parfaitement rectiligne d'un étage. La trace volumique laissée derrière elle délimite précisément un solide droit de même épaisseur partout.
        </InfoBlock>
      </Section>

      <Section title="💎 Simulateur de Solides en Perspective" icon="🔍" color="indigo">
        <p className="mb-4">Explore la modélisation à l'aide de cette projection interactive et regarde l'importance de l'aire de la base.</p>

        {/* 3D wireframe SVG simulation area */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            
            <div className="space-y-6 w-full lg:w-1/2">
              <div className="flex items-center justify-center gap-4">
                <button 
                  type="button"
                  onClick={() => setSolidType('prism')}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${solidType === 'prism' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'}`}
                >
                  Prisme Triangulaire 📐
                </button>
                <button 
                  type="button"
                  onClick={() => setSolidType('cylinder')}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${solidType === 'cylinder' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'}`}
                >
                  Cylindre Miroir 🔵
                </button>
              </div>

              <div className="space-y-4 text-sm font-bold">
                <div className="flex items-center justify-between">
                  <span>Dimension de base ({solidType === 'prism' ? 'côté' : 'diamètre'}) :</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="4" 
                      max="10" 
                      value={baseDim} 
                      onChange={(e) => setBaseDim(parseInt(e.target.value))}
                      className="accent-indigo-500 w-28"
                    />
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{baseDim} cm</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Hauteur du solide (h) :</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="6" 
                      max="18" 
                      value={heightDim} 
                      onChange={(e) => setHeightDim(parseInt(e.target.value))}
                      className="accent-indigo-500 w-28"
                    />
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{heightDim} cm</span>
                  </div>
                </div>
              </div>

              <div className="border bg-slate-50 dark:bg-slate-900 border-dashed rounded-2xl p-4 text-center font-mono">
                <span className="text-xs uppercase font-bold text-slate-500">Calcul du volume :</span>
                <div className="text-sm mt-1">
                  Aire Base × Hauteur = {currentBaseArea.toFixed(1)} cm² × {heightDim} cm
                </div>
                <div className="text-2xl font-black text-indigo-700 dark:text-indigo-400 mt-2">
                  = {volume.toFixed(1)} cm³
                </div>
              </div>
            </div>

            {/* Pseudo-3D isometric projection viewport */}
            <div className="relative w-full lg:w-1/2 flex items-center justify-center">
              <svg className="w-64 h-64 border border-slate-150 rounded-2xl bg-white dark:bg-slate-950 shadow-inner" viewBox="0 0 200 200">
                {/* Prism wireframe drawing */}
                {solidType === 'prism' && (
                  <g>
                    {/* Perspective projection points logic. baseDim scaled, heightDim scaled */}
                    {/* Bottom triangle: (50, 160), (150, 160), (100, 140) */}
                    {/* Top triangle: (50, 160-h), (150, 160-h), (100, 140-h) */}
                    {(() => {
                      const scaleH = heightDim * 5;
                      const scaleW = baseDim * 10;
                      const bottomY = 170;
                      const topY = bottomY - scaleH;
                      const dX = scaleW;

                      return (
                        <g>
                          {/* Hidden dashes first */}
                          <line x1={100 - dX/2} y1={bottomY - 15} x2={100} y2={bottomY} stroke="#94a3b8" strokeWidth="2" strokeDasharray="3" />
                          <line x1={100 + dX/2} y1={bottomY - 15} x2={100} y2={bottomY} stroke="#94a3b8" strokeWidth="2" strokeDasharray="3" />
                          <line x1={100} y1={bottomY} x2={100} y2={topY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3" />

                          {/* Top surface (solid) */}
                          <polygon points={`${100 - dX/2},${topY - 15} ${100 + dX/2},${topY - 15} 100,${topY}`} fill="#818cf8" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2" />
                          
                          {/* Front edges */}
                          <line x1={100 - dX/2} y1={bottomY - 15} x2={100 - dX/2} y2={topY - 15} stroke="#4f46e5" strokeWidth="2" />
                          <line x1={100 + dX/2} y1={bottomY - 15} x2={100 + dX/2} y2={topY - 15} stroke="#4f46e5" strokeWidth="2" />
                          
                          {/* Front Bottom Line */}
                          <line x1={100 - dX/2} y1={bottomY - 15} x2={100 + dX/2} y2={bottomY - 15} stroke="#4f46e5" strokeWidth="2" />
                        </g>
                      );
                    })()}
                  </g>
                )}

                {/* Cylinder wireframe drawing */}
                {solidType === 'cylinder' && (
                  <g>
                    {(() => {
                      const scaleH = heightDim * 5;
                      const radX = (baseDim * 10) / 2;
                      const radY = 12; // Flat circle perspective is an ellipse
                      const bottomY = 170;
                      const topY = bottomY - scaleH;

                      return (
                        <g>
                          {/* Bottom ellipse back dashed half arc */}
                          <path d={`M ${100 - radX} ${bottomY} A ${radX} ${radY} 0 0 1 ${100 + radX} ${bottomY}`} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3" />
                          {/* Bottom ellipse front solid half arc */}
                          <path d={`M ${100 - radX} ${bottomY} A ${radX} ${radY} 0 0 0 ${100 + radX} ${bottomY}`} fill="none" stroke="#4f46e5" strokeWidth="2" />

                          {/* Cylinder side boundaries */}
                          <line x1={100 - radX} y1={bottomY} x2={100 - radX} y2={topY} stroke="#4f46e5" strokeWidth="2" />
                          <line x1={100 + radX} y1={bottomY} x2={100 + radX} y2={topY} stroke="#4f46e5" strokeWidth="2" />

                          {/* Solid Top ellipse */}
                          <ellipse cx="100" cy={topY} rx={radX} ry={radY} fill="#818cf8" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2" />
                        </g>
                      );
                    })()}
                  </g>
                )}
              </svg>
            </div>

          </div>
        </div>
      </Section>

      <Section title="🥞 Anatomie des Deux Élus" icon="🥞" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-purple-50/50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800/60 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2 uppercase tracking-wide">Le Prisme Droit</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              - <strong>Les bases :</strong> Deux polygones identiques et parallèles (ex: des triangles dans un prisme triangulaire).<br/>
              - <strong>Les faces latérales :</strong> Pour relier les deux bases, ce sont toujours des rectangles posés verticalement. <br/>
              - <strong>Les arêtes :</strong> Les lignes obliques ou verticales reliant les sommets des deux bases correspondantes.
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-2 uppercase tracking-wide">Le Cylindre de Révolution</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              - <strong>Les bases :</strong> Deux disques identiques et parallèles.<br/>
              - <strong>La surface latérale :</strong> Un tube de contour parfaitement arrondi. Si on le découpe et l'aplatit dans un patron, il correspond à un rectangle géant parfait ! <br/>
              - <strong>Hauteur :</strong> La distance perpendiculaire séparant les plans des deux disques de base.
            </p>
          </div>
        </div>
      </Section>

      <Section title="📜 La Formule Suprême du Volume" icon="🧪" color="emerald">
        <p className="mb-4">Il n'existe qu'une seule formule pour calculer le volume de ces deux solides, et elle repose sur l'ascension de la surface :</p>
        
        <FormulaBox 
          title="Volume d'un Prisme et d'un Cylindre"
          formula={<>Volume = Aire de la Base × Hauteur <br/><span className="text-sm">{"($V = A_{base} \\times h$)"}</span></>}
        />

        <TipBanner type="info" title="Conversions d'unités de volume">
          Un litre correspond exactement à un décimètre cube {"($1 \\text{ L} = 1 \\text{ dm}^3$)"}. Ainsi, un millilitre équivaut parfaitement à un centimètre cube {"($1 \\text{ mL} = 1 \\text{ cm}^3$)"}. Retiens cette passerelle magique pour tes devoirs !
        </TipBanner>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle forme géométrique obtient-on si on met à plat (patron) le tour d'un cylindre ?</>}
            back={<>On obtient un <strong>rectangle parfait</strong>.</>}
          />
          <Flashcard 
            front={<>Combien d'arêtes latérales possède un prisme dont la base possède 4 sommets ?</>}
            back={<>Il possède exactement <strong>4 arêtes latérales</strong> (une par sommet).</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Calcul de volume d'une piscine cylindrique"
          question="Une piscine pour enfants est représentée par un cylindre de révolution de 3 m de diamètre (R = 1,5 m) et de 1,2 m de profondeur (h). Quel est son volume total d'eau à ras bord (arrondi au dixième) ?"
          steps={[
            "J'écris la formule d'aire de la base disque : A_base = pi × R² = pi × 1,5² ≈ 7,07 m².",
            "J'applique le calcul de volume : V = A_base × h = 7,07 m² × 1,2 m ≈ 8,5 m³.",
            "J'en déduis que la piscine a un volume d'eau d'environ <strong>8,5 m³</strong> (soit 8 500 litres !)."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Le bloc de fromage triangulaire"
          question="Un bloc de fromage en forme de prisme droit triangulaire possède un triangle de base dont l'aire fait 15 cm². La hauteur de la bûche fait 6 cm. Quel est le volume de fromage ?"
          steps={[
            "La base est plane, c'est un triangle d'aire déjà connue : A_base = 15 cm².",
            "J'applique la formule de volume sans m'embêter : V = A_base × h = 15 cm² × 6 cm.",
            "Je trouve V = 90 cm³. Le volume totale du fromage est de <strong>90 cm³</strong>."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle différence y a-t-il entre prisme droit et prisme tout court ?",
              answer: "Un prisme droit possède des arêtes latérales rigoureusement verticales (perpendiculaires aux bases). Si le prisme est penché, ses arêtes de côtés ne sont plus perpendiculaires, et les faces latérales deviennent simples parallélogrammes."
            },
            {
              question: "Comment calculer l'aire d'un triangle équilatéral pour un prisme ?",
              answer: "Généralement, on te fournira soit l'aire déjà toute calculée, soit la hauteur interne du triangle de base pour que tu puisses faire (Base × hauteur_triangle) / 2."
            },
            {
              question: "Pourquoi indique-t-on les arêtes de derrière en pointillés ?",
              answer: "C'est la règle d'or du dessin en perspective cavalière : toutes les arêtes masquées à l'intérieur de l'objet solide opaque se dessinent obligatoirement en traits pointillés fins."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Architecture Pratique" icon="🕹️" color="slate">
        <p className="mb-4">Tu es l'architecte chargé de valider ces constructions 3D !</p>
        <FillInTheBlanks 
          id="vol-eval"
          content={[
            "Pour construire un cylindre, je dois utiliser deux ",
            { options: ["rectangles", "disques", "triangles"], correctAnswer: 1 },
            " parfaitement égaux pour le fond et le couvercle. L'étiquette de mon cylindre, une fois déroulée, forme un immense ",
            { options: ["parallélogramme percé", "rectangle", "cylindre"], correctAnswer: 1 },
            ". Maintenant on passe au volume. Ma base fait 15 cm² et ma boîte s'élève sur 10 cm. Le calcul est super dur... ça fait ",
            { options: ["150 cm³", "25 cm³", "1,5 cm³"], correctAnswer: 0 },
            ". Attention, un volume s'exprime toujours en ",
            { options: ["mètres carrés", "unités cubes", "mètres simples"], correctAnswer: 1 },
            " ! Le fameux petit 'cube' (³) indique les 3 dimensions de l'espace."
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'implante un prisme droit à base hexagonale (un polygone à 6 côtés), combien d'arêtes latérales verticales possède-t-il ?",
              options: [
                "2 arêtes.",
                "6 arêtes.",
                "12 arêtes."
              ],
              correctAnswer: 1,
              explanation: "Comme le polygone de base compte 6 sommets, 6 arêtes latérales verticales vont s'élever parallèlement pour s'effiler vers le couvercle supérieur."
            },
            {
              question: "Le cylindre de révolution possède un rayon R de 5 cm et s'élève sur une hauteur de 10 cm. Que vaut l'aire de sa base (arrondie) ?",
              options: [
                "78,5 cm²",
                "31,4 cm²",
                "15,7 cm²"
              ],
              correctAnswer: 0,
              explanation: "Aire = pi × R² = Math.PI × 5 × 5 = pi × 25 ≈ 78,54 cm²."
            },
            {
              question: "Convertis 3,5 dm³ en litres (L).",
              options: [
                "35 L",
                "3,5 L",
                "350 L"
              ],
              correctAnswer: 1,
              explanation: "Comme 1 dm³ est égal à 1 L, 3,5 dm³ correspondent exactement et sans conversion complexe à 3,5 L."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier les bases d'un Prisme et d'un Cylindre.",
            "Je sais que les faces latérales d'un Prisme Droit sont TOUT LE TEMPS des rectangles.",
            "Je connais la formule : V = Aire_de_la_base × hauteur.",
            "Je m'assure de toujours formuler les unités en solide cube (ex: cm³, dm³)."
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

export default Course_5eme_10_Espace_Prismes_Cylindres;
