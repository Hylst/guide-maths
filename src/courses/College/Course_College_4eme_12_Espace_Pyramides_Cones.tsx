import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Layers, HelpCircle, RefreshCw, Scissors, Compass } from 'lucide-react';
import { MathComponent } from '../../components/MathComponent';

const Course_College_4eme_12_Espace_Pyramides_Cones: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Volume Simulator State
  const [solidType, setSolidType] = useState<'pyramid' | 'cone'>('pyramid');
  const [baseDimension, setBaseDimension] = useState<number>(6); // side for pyramid, radius for cone
  const [height, setHeight] = useState<number>(9); // height

  // Geometric layout parameters
  const scale = 11;
  const originX = 110;
  const originY = 140;

  // Calculators
  const isPyramid = solidType === 'pyramid';
  const baseArea = isPyramid ? (baseDimension * baseDimension) : (Math.PI * baseDimension * baseDimension);
  const volume = (baseArea * height) / 3;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-12"
        title="Pyramides et Cônes (Espace)"
        subtitle="Dompter la Dimension 3D et Maîtriser le Tiers Divin"
        duration="1h 00"
        level="4ème (Cycle 4)"
        prerequisites={["Aires des figures de base (carré, cercle)", "Calculs de volumes droits de 5ème (pavé, cylindre)"]}
        objectives={[
          "Comprendre l'anatomie de la pyramide régulière et du cône de révolution.",
          "Mémoriser et appliquer la formule universelle des solides pointus : Base × Hauteur / 3.",
          "Calculer la valeur exacte (avec la constante Pi) et l'arrondi d'un volume.",
          "Savoir associer un solide de l'espace à son patron déplié en 2D."
        ]}
      />

      <Section title="🌟 Introduction : Dompter l'Aérodynamisme" icon="🏔️" color="slate">
        <p className="leading-relaxed">
          En 5ème, tu as étudié &quot;Les Droits&quot; : le Pavé droit et le Cylindre. Des solides lourds, dont le haut copiait fidèlement le bas.
        </p>
        <p className="mt-4 leading-relaxed">
          En 4ème, on coupe au scalpel dans ces blocs pour créer le profil aérodynamique suprême : <strong>Les Formes Pointues</strong>. Que ce soit la Pyramide de Khéops ou un délicieux cornet de glace (le Cône), ils ont tous une base posée au sol et un sommet unique qui s&apos;envole vers le ciel.
        </p>
      </Section>

      {/* SPACE INTERACTIVE SIMULATOR */}
      <Section title="🛠️ Miroir de l'Espace : Volume 3D en Direct" icon={<Compass className="text-indigo-500" />} color="indigo">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Alterne entre la Pyramide et le Cône. Varie les dimensions de la base et la hauteur à l&apos;aide des curseurs pour voir le solide se dessiner en perspective cavalière et calculer son volume instantanément.
        </p>

        {/* Solid Switcher */}
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-6 max-w-sm">
          <button 
            onClick={() => { setSolidType('pyramid'); setBaseDimension(6); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${isPyramid ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'}`}
          >
            Pyramide (Base Carrée)
          </button>
          <button 
            onClick={() => { setSolidType('cone'); setBaseDimension(4); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${!isPyramid ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'}`}
          >
            Cône de Révolution
          </button>
        </div>

        <div className="bg-card border border-slate-100 dark:border-slate-800/80 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Visual SVG 3D Representation */}
            <div className="bg-slate-50 dark:bg-black/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
              <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider text-slate-400">Dessin Perspective Cavalière</span>
              
              <svg width="100%" height="220" viewBox="0 0 220 200" className="mx-auto overflow-visible mt-4">
                {isPyramid ? (
                  // PYRAMID rendering
                  <>
                    {/* Hidden Base back lines (dashed) */}
                    <line x1="50" y1="130" x2="110" y2="115" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="170" y1="130" x2="110" y2="115" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                    
                    {/* Height mât from center (110, 132) to Apex (110, 132 - height * scale) */}
                    <line x1="110" y1="132" x2="110" y2={132 - height * scale} stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                    {/* Apex point Label */}
                    <text x="105" y={132 - height * scale - 10} className="fill-slate-800 dark:fill-white font-bold text-sm">S</text>
                    <text x="105" y="142" className="fill-slate-400 text-[10px]">H</text>

                    {/* Front Base edges */}
                    <polygon points="50,130 110,150 170,130" fill="none" stroke="#4f46e5" strokeWidth="2" />
                    
                    {/* Apex to corners lines */}
                    <line x1="110" y1={132 - height * scale} x2="50" y2="130" stroke="#4f46e5" strokeWidth="1.5" />
                    <line x1="110" y1={132 - height * scale} x2="110" y2="150" stroke="#4f46e5" strokeWidth="2.5" />
                    <line x1="110" y1={132 - height * scale} x2="170" y2="130" stroke="#4f46e5" strokeWidth="1.5" />
                    {/* Apex to hidden corner */}
                    <line x1="110" y1={132 - height * scale} x2="110" y2="115" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Right angle marker at Base center H */}
                    <rect x="105" y="127" width="5" height="5" fill="none" stroke="#f43f5e" strokeWidth="1" />

                    {/* Base side annotation */}
                    <text x="75" y="152" className="fill-indigo-650 dark:fill-indigo-400 font-mono text-[10px] font-bold">Côté = {baseDimension} cm</text>
                    <text x="116" y={132 - (height * scale) / 2} className="fill-rose-600 dark:fill-rose-400 font-mono text-[10px] font-bold">h = {height} cm</text>
                  </>
                ) : (
                  // CONE de revolution rendering
                  <>
                    {/* Back half of ellipse (dashed) */}
                    <path d={`M ${110 - baseDimension * 10} 140 A ${baseDimension * 10} 15 0 0 1 ${110 + baseDimension * 10} 140`} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                    
                    {/* Front half of ellipse */}
                    <path d={`M ${110 - baseDimension * 10} 140 A ${baseDimension * 10} 15 0 0 0 ${110 + baseDimension * 10} 140`} fill="rgba(79, 70, 229, 0.05)" stroke="#4f46e5" strokeWidth="2" />
                    
                    {/* Height line from center to Apex */}
                    <line x1="110" y1="140" x2="110" y2={140 - height * scale} stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                    
                    {/* Radius base line (horizontal) */}
                    <line x1="110" y1="140" x2={110 + baseDimension * 10} y2="140" stroke="#10b981" strokeWidth="2" />

                    {/* Outer border generator line */}
                    <line x1={110 - baseDimension * 10} y1="140" x2="110" y2={140 - height * scale} stroke="#4f46e5" strokeWidth="2" />
                    <line x1={110 + baseDimension * 10} y1="140" x2="110" y2={140 - height * scale} stroke="#4f46e5" strokeWidth="2" />

                    {/* Right angle indicator */}
                    <rect x="105" y="135" width="5" height="5" fill="none" stroke="#f43f5e" strokeWidth="1" />

                    {/* Apex text */}
                    <text x="105" y={140 - height * scale - 10} className="fill-slate-800 dark:fill-white font-bold text-sm">S</text>
                    <text x="105" y="152" className="fill-slate-400 text-[10px]">O</text>

                    {/* Specs annotations */}
                    <text x="115" y={140 - (height * scale) / 2} className="fill-rose-600 dark:fill-rose-400 font-mono text-[10px] font-bold">h = {height} cm</text>
                    <text x={110 + (baseDimension * 10) / 2 - 15} y="135" className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[10px] font-bold">R = {baseDimension} cm</text>
                  </>
                )}
              </svg>
            </div>

            {/* Config controls */}
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-sm uppercase tracking-wide">
                ⚙️ Ajuster le gabarit physique
              </h3>

              {isPyramid ? (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                    <span>Côté du Carré de base (c)</span>
                    <span className="text-indigo-600 font-mono">{baseDimension} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" 
                    max="10" 
                    step="1" 
                    value={baseDimension} 
                    onChange={(e) => setBaseDimension(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                    <span>Rayon du Disque de base (R)</span>
                    <span className="text-emerald-600 font-mono">{baseDimension} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="8" 
                    step="0.5" 
                    value={baseDimension} 
                    onChange={(e) => setBaseDimension(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* Slider for height */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Hauteur de la pointe (h)</span>
                  <span className="text-rose-600 font-mono">{height} cm</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="12" 
                  step="1" 
                  value={height} 
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* STEP-BY-STEP MATHEMATICAL DRAFT */}
              <div className="bg-slate-55 dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Tableau d&apos;Écriture Officiel</span>
                
                {isPyramid ? (
                  <div className="space-y-3 font-serif">
                    <p>
                      <strong>1. Aire de la Base Carrée</strong> :<br />
                      {"$\\mathcal{B} = Côté \\times Côté = "}{baseDimension}{" \\times "}{baseDimension}{" = \\mathbf{"}{baseArea}{"\\text{ cm}^2}$"}
                    </p>
                    <p>
                      <strong>2. Volume de la Pyramide</strong> :<br />
                      {"$V = \\frac{\\mathcal{B} \\times h}{3} = \\frac{"}{baseArea}{" \\times "}{height}{"}{3} = \\frac{"}{baseArea * height}{"}{3}$"}
                    </p>
                    <p className="font-mono bg-card dark:bg-black/40 p-2 rounded-xl text-center font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-120/40 text-[13px] shadow-inner">
                      V = {volume.toFixed(1)} cm³
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 font-serif">
                    <p>
                      <strong>1. Aire de la Base Circulaire</strong> :<br />
                      {"$\\mathcal{B} = \\pi \\times R^2 = \\pi \\times "}{baseDimension}{"^2 = \\mathbf{"}{(baseDimension * baseDimension).toFixed(1)}{" \\pi \\text{ cm}^2}$"}
                    </p>
                    <p>
                      <strong>2. Volume du Cône</strong> :<br />
                      {"$V = \\frac{\\mathcal{B} \\times h}{3} = \\frac{"}{(baseDimension * baseDimension).toFixed(1)}{"\\pi \\times "}{height}{"}{3}$"}
                    </p>
                    <p className="font-mono bg-card dark:bg-black/40 p-2 rounded-xl text-center font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-120/40 text-[13px] shadow-inner">
                      {"V_exact = "}{((baseDimension * baseDimension * height) / 3).toFixed(1)}{" \\pi \\text{ cm}^3"}<br />
                      {"V_arrondi ≈ "}{volume.toFixed(1)}{" cm³"}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </Section>

      <Section title="1. La Règle Inébranlable des Pointus" icon="📏" color="slate">
        <p className="mb-4 leading-relaxed">
          Imagine que tu as un Cylindre droit et un Cône de même base circulaire et de même hauteur. Si tu remplis le cône d&apos;eau pour le transvaser dans le cylindre, tu devras t&apos;y reprendre à... <strong>exactement 3 reprises</strong> !
        </p>

        <div className="bg-indigo-50/50 dark:bg-indigo-990/10 p-6 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/50 text-center my-6 shadow-inner">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-650 dark:text-indigo-400 block mb-2">Formule Fondamentale Unique</span>
          <div className="inline-block bg-card dark:bg-black p-4 rounded-2xl border border-indigo-150 dark:border-indigo-800 font-mono text-xl md:text-2xl font-black text-indigo-700 dark:text-indigo-300">
            Volume = (Aire de Base &times; Hauteur) &divide; 3
          </div>
          <p className="text-xs text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
            Qu&apos;il s&apos;agisse d&apos;une pyramide carrée, triangulaire ou d&apos;un cône rond, la formule reste imperturbable. Seule l&apos;aire du sol varie dans la parenthèse !
          </p>
        </div>
      </Section>

      <Section title="2. Cas Pratique corrigé : Le cornet glacé" icon="🍦" color="slate">
        <p className="mb-4 leading-relaxed">
          Au brevet, la question de rédaction contient toujours deux types de réponses exigées : la <strong>Valeur Exacte</strong> (qui conserve le symbole {"$\\pi$"}) et la <strong>Valeur Arrondie</strong> (au dixième).
        </p>

        <InteractiveExercise 
          title="Fiche Rédaction au Brevet"
          question={<>Un cône de révolution possède un rayon de base R = 3 cm. Sa hauteur est h = 8 cm.<br/>Calcule la valeur exacte du volume, puis son arrondi au millimètre près.</>}
          steps={[
            <><strong>Étape 1 : Calculer l&apos;Aire de la Base (un Disque).</strong><br/>Formule de l&apos;aire du cercle : {"$\\mathcal{B} = \\pi \\times R^2$"}.<br/>On remplace par l&apos;argent : {"$\\mathcal{B} = \\pi \\times 3^2 = 9\\pi\\text{ cm}^2$"}. (On laisse {"$\\pi$"} tranquille).</>,
            <><strong>Étape 2 : Multiplier par la hauteur pour atteindre l&apos;espace.</strong><br/>On multiplie par h = 8 :<br/>{"$9\\pi \\times 8 = 72\\pi$"}.</>,
            <><strong>Étape 3 : Diviser par 3 pour tailler la pointe.</strong><br/>{"$V = \\frac{72\\pi}{3} = \\mathbf{24\\pi\\text{ cm}^3}$"}.<br /><em>C&apos;est ta Valeur Exacte ! Tu empoches déjà la moitié des points d&apos;emblée.</em></>,
            <><strong>Étape 4 : Déclencher l&apos;arrondi calculatrice.</strong><br/>Tape <code>24 × π</code> sur ta machine. Elle te donne <code>75.398223...</code><br />- Dixième (1 chiffre après la virgule): <strong>75,4 cm³</strong>.<br />- Centième (2 chiffres, millimètre de volume) : le 8 est grand, il pousse le 9 à arrondir le 39 à 40 : <strong>75,40 cm³</strong>.</>
          ]}
        />
      </Section>

      <Section title="3. Les Patrons : L&apos;Art du pliage" icon={<Scissors className="text-emerald-500" />} color="slate">
        <p className="mb-4 leading-relaxed">
          Déplier un solide 3D en une feuille de carton plate 2D est une compétence très surveillée. C&apos;est le schéma d&apos;usine avant pliage, appelé le <strong>Patron</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-emerald-50/55 dark:bg-emerald-995/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900 border-l-4 border-l-emerald-500">
            <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-400 mb-2">⭐ Patron de la Pyramide Régulière</h4>
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
              Il est constitué d&apos;une forme géométrique centrale (ex: un carré) sur laquelle grandissent latéralement des pétales triangulaires (murs). Une fois repliés, ils se rejoignent au zénith.
            </p>
          </div>

          <div className="bg-emerald-50/55 dark:bg-emerald-995/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900 border-l-4 border-l-emerald-555 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-455 mb-2">⭐ Patron du Cône de Révolution</h4>
            <p className="leading-relaxed">
              Il ressemble à une sorte de chapeau de fée posé à plat : d&apos;un côté, un secteur circulaire (une part de camembert géant qui s&apos;enroule sur elle-même), de l&apos;autre, un disque parfait suspendu au bord d&apos;attaque (le couvercle du sol).
            </p>
          </div>
        </div>

        <TipBanner title="⚠️ Piège d'or : Hauteur ou Génératrice ?" type="warning">
          <strong>ALERTE MAXIMALE :</strong> Sur le patron déplié d&apos;une pyramide, le sommet du pétale triangulaire correspond à la <strong>génératrice</strong> (le chemin penché le long de l&apos;arête extérieure). Ce n&apos;est pas la hauteur pure du mât $h$ intérieur, qui frappe au cœur du solide en angle droit ! Si tu tapes la génératrice dans la formule de volume, tu récolteras un naufrage.
        </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande l&apos;Aire Totale en tissu à découper pour fabriquer une Pyramide à base carrée. Quelle formule de volume appliquer ?</>}
            back={<><strong>Aucune ! C&apos;est le piège ultime !</strong><br/>Le Volume mesure l&apos;eau qu&apos;on verse à l&apos;intérieur. L&apos;Aire Totale de tissu, c&apos;est juste de la peinture 2D ! <br/>Aire = Aire du Carré de base + 4 × Aire du triangle latéral. Pas de tiers ni de division par 3 !</>}
          />
          <Flashcard 
            front={<>Qu&apos;est-ce qu&apos;un Tétraèdre régulier dans l&apos;univers des rôlistes de jeux de rôles ?</>}
            back={<><strong>Le mythique dé à 4 faces (D4) !</strong><br/>C&apos;est une pyramide dont toutes ses faces (1 base + 3 murs latéraux) sont des triangles équilatéraux absolument identiques.</>}
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes (FAQ)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si le solide est couché sur le flanc, la formule change-t-elle ?",
              answer: "Jamais ! La gravité n'a pas d'influence sur les mathématiques. Que ta pyramide soit debout ou couchée sur le côté, sa 'Hauteur' reste la distance perpendiculaire séparant le sommet du plan contenant sa base !"
            },
            {
              question: "Est-ce normal que mon volume se termine en 'cm cube' alors que les longueurs sont en 'cm' ?",
              answer: "Oui, c'est indispensable ! Une longueur est de dimension 1 (cm). Une aire de dimension 2 (cm²), et un volume de dimension 3 (cm³), fruit de l'interaction des 3 dimensions spatiales (longueur, largeur, hauteur)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une pyramide à base carrée a des côtés de base de 4 cm et une hauteur de 6 cm. Quel est son volume ?",
              options: [
                "V = (4 + 4) × 6 / 3 = 16 cm³",
                "V = 4 × 4 × 6 = 96 cm³",
                "V = (4 × 4 × 6) / 3 = 32 cm³"
              ],
              correctAnswer: 2,
              explanation: "Gagné ! L'aire de la base carrée est 4 × 4 = 16 cm². On applique le tiers divin : Volume = (16 × 6) / 3 = 96 / 3 = 32 cm³."
            },
            {
              question: "Qu'obtient-on si on déroule intégralement le flanc protecteur cylindrique d'une boîte de conserve de raviolis ?",
              options: [
                "Une forme trapézoïdale bizarre.",
                "Un Rectangle parfait.",
                "Un Triangle rectangle équilibré."
              ],
              correctAnswer: 1,
              explanation: "Incroyable mais vrai ! Peler l'étiquette papier entourant une boîte ronde de conserve et la poser à plat donne un Rectangle géométrique d'une pureté absolue !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je récite à voix haute le mantra : ' Base fois Hauteur divisé par 3 ' pour chaque solide pointu.",
            "Je sais que l'aire d'un disque au sol se calcule en multipliant Pi par le carré du rayon.",
            "Je distingue rigoureusement la hauteur pure h du solide de son flanc en biais."
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

export default Course_College_4eme_12_Espace_Pyramides_Cones;
