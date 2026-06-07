import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Box, HelpCircle, Activity, Cuboid, Expand, FlaskConical, Cone as ConeIcon, Variable, Cylinder as CylinderIcon, Globe } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

// Interactive 3D Solids Simulator Component
const InteractiveSolidSimulator: React.FC = () => {
  const [shape, setShape] = useState<'cylinder' | 'cone' | 'pyramid' | 'sphere'>('cylinder');
  const [radius, setRadius] = useState<number>(4);
  const [height, setHeight] = useState<number>(10);
  const [side, setSide] = useState<number>(6);

  // Dynamic calculations
  const pi = Math.PI;
  const cylinderBaseArea = pi * radius * radius;
  const cylinderVolume = cylinderBaseArea * height;

  const coneBaseArea = pi * radius * radius;
  const coneVolume = (coneBaseArea * height) / 3;

  const pyramidBaseArea = side * side;
  const pyramidVolume = (pyramidBaseArea * height) / 3;

  const sphereArea = 4 * pi * radius * radius;
  const sphereVolume = (4 / 3) * pi * Math.pow(radius, 3);

  return (
    <div className="not-prose bg-card border border-border rounded-[2rem] p-6 md:p-8 my-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-indigo-500" />
        <h3 className="text-xl font-bold text-foreground">Schéma Pédagogique Interactif : Simulateur 3D</h3>
      </div>
      
      <p className="text-sm text-muted-text mb-6">
        Manipulez les réglettes de dimensions physiques (rayon, hauteur, côté) et observez la géométrie s'étirer en temps réel ainsi que la décomposition exacte du calcul scientifique !
      </p>

      {/* Controller Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { id: 'cylinder', label: 'Cylindre', icon: CylinderIcon },
          { id: 'cone', label: 'Cône', icon: ConeIcon },
          { id: 'pyramid', label: 'Pyramide', icon: Box },
          { id: 'sphere', label: 'Sphère', icon: Globe },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = shape === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setShape(item.id as any)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                isSelected 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-muted text-muted-text hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
        
        {/* SVG Drawing Zone */}
        <div className="flex justify-center items-center h-64 bg-card rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 relative overflow-hidden p-4">
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-[220px]" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="solidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {shape === 'cylinder' && (
              <g id="svg-cylinder">
                {/* Back projection bottom base half-ellipse */}
                <path d={`M ${100 - radius * 8} 150 A ${radius * 8} ${radius * 2.5} 0 0 1 ${100 + radius * 8} 150`} fill="none" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="2" />
                
                {/* Main body of Cylinder */}
                <rect x={100 - radius * 8} y={150 - height * 6} width={radius * 16} height={height * 6} fill="url(#solidGrad)" opacity="0.15" />
                <line x1={100 - radius * 8} y1={150} x2={100 - radius * 8} y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2" />
                <line x1={100 + radius * 8} y1={150} x2={100 + radius * 8} y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2" />
                
                {/* Bottom Base front half-ellipse */}
                <path d={`M ${100 - radius * 8} 150 A ${radius * 8} ${radius * 2.5} 0 0 0 ${100 + radius * 8} 150`} fill="url(#baseGrad)" stroke="#10b981" strokeWidth="2.5" />
                
                {/* Top Base full ellipse */}
                <ellipse cx="100" cy={150 - height * 6} rx={radius * 8} ry={radius * 2.5} fill="#4f46e5" fillOpacity="0.25" stroke="#4f46e5" strokeWidth="2" />
                
                {/* Height line indicator */}
                <line x1="100" y1="150" x2="100" y2={150 - height * 6} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                <text x="105" y={150 - (height * 3)} fill="#f59e0b" fontSize="11" fontWeight="bold">h = {height} cm</text>
                
                {/* Radius line indicator */}
                <line x1="100" y1="150" x2={100 + radius * 8} y2="150" stroke="#10b981" strokeWidth="2" />
                <text x={100 + radius * 4} y="162" fill="#10b981" fontSize="11" fontWeight="bold">r = {radius} cm</text>
              </g>
            )}

            {shape === 'cone' && (
              <g id="svg-cone">
                {/* Back projection base */}
                <path d={`M ${100 - radius * 8} 150 A ${radius * 8} ${radius * 2.5} 0 0 1 ${100 + radius * 8} 150`} fill="none" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
                
                {/* Cone solid volume body */}
                <path d={`M ${100 - radius * 8} 150 L 100 ${150 - height * 6} L ${100 + radius * 8} 150 Z`} fill="url(#solidGrad)" opacity="0.2" />
                <line x1={100 - radius * 8} y1={150} x2="100" y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2" />
                <line x1={100 + radius * 8} y1={150} x2="100" y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2" />

                {/* Front base ellipse */}
                <path d={`M ${100 - radius * 8} 150 A ${radius * 8} ${radius * 2.5} 0 0 0 ${100 + radius * 8} 150`} fill="url(#baseGrad)" stroke="#10b981" strokeWidth="2.5" />

                {/* Height & Radius Dotted rulers */}
                <line x1="100" y1="150" x2="100" y2={150 - height * 6} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                <text x="105" y={150 - (height * 3)} fill="#f59e0b" fontSize="11" fontWeight="bold">h = {height} cm</text>

                <line x1="100" y1="150" x2={100 + radius * 8} y2="150" stroke="#10b981" strokeWidth="2" />
                <text x={100 + radius * 4} y="162" fill="#10b981" fontSize="11" fontWeight="bold">r = {radius} cm</text>
              </g>
            )}

            {shape === 'pyramid' && (
              <g id="svg-pyramid">
                {/* Bottom parallelogram perspective square base */}
                {/* Vertices: A(100-s*4, 150), B(100-s*1, 150 - s*1.5), C(100+s*4, 150 - s*1.5), D(100+s*1, 150+s*0.5) */}
                {/* Let's simplify with custom corners based on side length */}
                {/* Back side of the base */}
                <path d={`M ${100 - side * 6} 150 L ${100 - side * 2} ${150 - side * 3} L ${100 + side * 6} ${150 - side * 3}`} fill="none" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
                
                {/* Front side of the base */}
                <path d={`M ${100 - side * 6} 150 L ${100 + side * 2} ${150 + side * 3} L ${100 + side * 6} ${150 - side * 3}`} fill="url(#baseGrad)" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />

                {/* Solid facets of pyramid */}
                <path d={`M ${100 - side * 6} 150 L 100 ${150 - height * 6} L ${100 + side * 2} ${150 + side * 3} Z`} fill="url(#solidGrad)" opacity="0.2" />
                <path d={`M ${100 + side * 2} 150 L 100 ${150 - height * 6} L ${100 + side * 6} ${150 - side * 3} Z`} fill="url(#solidGrad)" opacity="0.1" />

                {/* Arêtes (Edges) to top */}
                <line x1={100 - side * 6} y1={150} x2="100" y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2" />
                <line x1={100 + side * 2} y1={150 + side * 3} x2="100" y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2.5" />
                <line x1={100 + side * 6} y1={150 - side * 3} x2="100" y2={150 - height * 6} stroke="#4f46e5" strokeWidth="2" />
                <line x1={100 - side * 2} y1={150 - side * 3} x2="100" y2={150 - height * 6} stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />

                {/* Base labels */}
                <line x1={100 - side * 6} y1={156} x2={100 + side * 2} y2={156 + side * 3} stroke="#10b981" strokeWidth="1" />
                <text x={100 - side * 2} y={166 + side * 1.5} fill="#10b981" fontSize="11" fontWeight="bold">Côté = {side} cm</text>

                {/* Height line from center */}
                <line x1="100" y1="150" x2="100" y2={150 - height * 6} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                <text x="105" y={150 - (height * 3)} fill="#f59e0b" fontSize="11" fontWeight="bold">h = {height} cm</text>
              </g>
            )}

            {shape === 'sphere' && (
              <g id="svg-sphere">
                {/* Outer perfect disk */}
                <circle cx="100" cy="110" r={radius * 8} fill="url(#solidGrad)" opacity="0.2" stroke="#4f46e5" strokeWidth="2" />
                
                {/* 3D horizontal cross section ellipse */}
                <ellipse cx="100" cy="110" rx={radius * 8} ry={radius * 2.5} fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4,2" />
                
                {/* Vertical diameter ellipse */}
                <ellipse cx="100" cy="110" rx={radius * 2.5} ry={radius * 8} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />

                {/* Radius ruler */}
                <line x1="100" y1="110" x2={100 + radius * 8} y2="110" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="100" cy="110" r="3" fill="#4f46e5" />
                <text x={100 + radius * 3} y="102" fill="#10b981" fontSize="11" fontWeight="bold">r = {radius} cm</text>
              </g>
            )}
          </svg>
        </div>

        {/* Real-time Calculation Panel */}
        <div className="flex flex-col gap-4 text-sm">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <h4 className="font-extrabold text-indigo-900 dark:text-indigo-200 mb-2 uppercase text-xs tracking-wider">Formule & Valeurs :</h4>
            
            {shape === 'cylinder' && (
              <div className="space-y-2">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">1. Calcul de l'Aire de la Base (Disque) :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$A_{base} = \\pi \\times r^2$"}<br/>
                  {"$A_{base} = \\pi \\times "}{radius}{"^2 = "}{cylinderBaseArea.toFixed(2)}{" cm²"}
                </div>
                
                <p className="font-semibold text-indigo-600 dark:text-indigo-400 mt-3">2. Calcul du Volume (Base × Hauteur) :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$V = A_{base} \\times h$"}<br/>
                  {"$V = "}{cylinderBaseArea.toFixed(2)}{" \\times "}{height}{" = "}<span className="font-bold text-indigo-600 dark:text-indigo-300">{cylinderVolume.toFixed(2)}{" cm³"}</span>
                </div>
              </div>
            )}

            {shape === 'cone' && (
              <div className="space-y-2">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">1. Calcul de l'Aire de la Base (Disque) :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$A_{base} = \\pi \\times r^2$"}<br/>
                  {"$A_{base} = \\pi \\times "}{radius}{"^2 = "}{coneBaseArea.toFixed(2)}{" cm²"}
                </div>
                
                <p className="font-semibold text-violet-600 dark:text-violet-400 mt-3">2. Calcul du Volume (Base × Hauteur / 3) :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$V = \\frac{A_{base} \\times h}{3}$"}<br/>
                  {"$V = \\frac{"}{coneBaseArea.toFixed(2)}{" \\times "}{height}{"}{3} = "}<span className="font-bold text-violet-600 dark:text-violet-300">{coneVolume.toFixed(2)}{" cm³"}</span>
                </div>
              </div>
            )}

            {shape === 'pyramid' && (
              <div className="space-y-2">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">1. Calcul de l'Aire de la Base (Carré) :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$A_{base} = Côté^2$"}<br/>
                  {"$A_{base} = "}{side}{"^2 = "}{pyramidBaseArea.toFixed(2)}{" cm²"}
                </div>
                
                <p className="font-semibold text-teal-600 dark:text-teal-400 mt-3">2. Calcul du Volume (Base × Hauteur / 3) :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$V = \\frac{A_{base} \\times h}{3}$"}<br/>
                  {"$V = \\frac{"}{pyramidBaseArea.toFixed(2)}{" \\times "}{height}{"}{3} = "}<span className="font-bold text-teal-600 dark:text-teal-300">{pyramidVolume.toFixed(2)}{" cm³"}</span>
                </div>
              </div>
            )}

            {shape === 'sphere' && (
              <div className="space-y-2">
                <p className="font-semibold text-pink-600 dark:text-pink-400">1. Aire de l'enveloppe de la Sphère :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$A_{enveloppe} = 4 \\times \\pi \\times r^2$"}<br/>
                  {"$A = 4 \\times \\pi \\times "}{radius}{"^2 = "}{sphereArea.toFixed(2)}{" cm²"}
                </div>
                
                <p className="font-semibold text-rose-600 dark:text-rose-400 mt-3">2. Calcul du Volume de la Boule :</p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  {"$V = \\frac{4}{3} \\times \\pi \\times r^3$"}<br/>
                  {"$V = \\frac{4}{3} \\times \\pi \\times "}{radius}{"^3 = "}<span className="font-bold text-rose-600 dark:text-rose-300">{sphereVolume.toFixed(2)}{" cm³"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive sliders based on current shape selection */}
          <div className="space-y-3">
            {shape !== 'sphere' && shape !== 'pyramid' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Rayon (r)</span>
                  <span className="text-emerald-600">{radius} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            )}
            {shape === 'sphere' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Rayon (r)</span>
                  <span className="text-pink-600">{radius} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            )}
            {shape === 'pyramid' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Longueur du Côté (a)</span>
                  <span className="text-emerald-600">{side} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={side}
                  onChange={(e) => setSide(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            )}
            {shape !== 'sphere' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Hauteur (h)</span>
                  <span className="text-indigo-600">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Course_College_3eme_09_Espace: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-09"
        title="Géométrie dans l'Espace et Volumes"
        subtitle="Domptez la troisième dimension et mesurez l'univers !"
        duration="1h 15"
        level="3ème (Cycle 4)"
        prerequisites={["Aires des figures 2D (Triangle, Disque)", "Théorème de Pythagore"]}
        objectives={[
          "Reconnaître et lister les différents solides (Prismes, Pyramides, Cônes, Boules).",
          "Calculer l'aire et le volume de solides simples et de révolution.",
          "Mémoriser les 3 grandes familles de calcul de volumes.",
          "Maîtriser l'effet des agrandissements et réductions sur les aires et volumes."
        ]}
      />

      <Section title="🌟 Introduction : L'élévation en 3D" icon="🚀" color="slate">
        <p>
          En géométrie plane (2D), tu dessinais des cercles plats ou des carrés fins sur une feuille de papier. Mais l'univers n'a que faire des feuilles bidimensionnelles ! Il est entièrement constitué de <strong>Volumes</strong> : le gobelet d'eau, l'architecture des pyramides d'Égypte, la forme profilée des fusées spatiales, ou encore la perfection géométrique de notre planète Terre. 
        </p>
        <p className="mt-4">
          La <strong>Géométrie dans l'Espace</strong> consiste à rajouter l'épaisseur, la profondeur, ou la <strong>Hauteur</strong>, à tes formules d'aires usuelles. Comprendre comment calculer l'encombrement thermique d'une boîte, la quantité exacte de liquide dans un flacon de chimie, ou la structure de solides complexes est le socle indispensable utilisé en architecture, en ingénierie et en logistique moderne.
        </p>
      </Section>

      <Section title="1. Les Architectures Droites (Prismes et Cylindres)" icon="🏢" color="indigo">
        <p className="mb-4">
          Ce sont les "immeubles réguliers" de la géométrie tridimensionnelle. Ils sont constitués d'une base au rez-de-chaussée (un polygone ou un disque) qui monte <strong>toujours parfaitement droite</strong> (perpendiculairement au sol) jusqu'au plafond, créant un toit parfaitement identique et parallèle à sa base.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-3 flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-500" /> Le Prisme Droit
            </h4>
            <p className="text-sm mb-4 leading-relaxed">
              Sa base est un polygone (triangle, carré, hexagone...). Ses faces latérales sont toutes des <strong>rectangles</strong> dressés verticalement perpendiculaires à la base.
            </p>
            <div className="bg-card p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/60 shadow-inner text-center">
              <span className="font-serif text-lg font-extrabold text-indigo-900 dark:text-indigo-100">
                {"$V = A_{base} \\times h$"}
              </span>
            </div>
          </div>
           
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-3 flex items-center gap-2">
              <CylinderIcon className="w-5 h-5 text-emerald-500" /> Le Cylindre de Révolution
            </h4>
            <p className="text-sm mb-4 leading-relaxed">
              Un prisme dont la base n'est plus polygonale mais se courbe en un <strong>disque</strong> parfait. (Exemples du quotidien : canette de boisson, bougie cylindrique).
            </p>
            <div className="bg-card p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/60 shadow-inner text-center">
              <span className="font-serif text-lg font-extrabold text-emerald-900 dark:text-emerald-100">
                {"$V = (\\pi \\times r^2) \\times h$"}
              </span>
            </div>
          </div>
        </div>
         
        <InfoBlock title="Rappel important 💡" type="reminder">
          Puisque ces deux types de parois s'élèvent verticalement et de manière uniforme, ils se pilotent tous grâce à la seule et unique <strong>formule reine</strong> :
          <span className="block text-center text-lg font-extrabold text-foreground mt-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl">
            {"$\\text{Volume} = \\text{Aire de la base} \\times \\text{Hauteur}$"}
          </span>
        </InfoBlock>
      </Section>

      <Section title="2. Les Familles Pointues (Pyramides et Cônes)" icon="⛺" color="rose">
        <p className="mb-4">
          Contrairement aux immeubles rigides, ces structures s’affinent et se rétrécissent en altitude pour culminer en un point unique supérieur appelé le <strong>sommet principal</strong>.
        </p>
        
        <div className="bg-rose-50/50 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800/60 shadow-sm my-6 relative overflow-hidden">
          <FlaskConical className="absolute right-4 top-1/2 transform -translate-y-1/2 w-32 h-32 text-rose-500/10 pointer-events-none" />
          
          <h3 className="font-bold text-rose-900 dark:text-rose-200 text-lg mb-4">Le Ratio du Rétrécissement (La Loi du / 3)</h3>
          <p className="mb-5 text-sm md:text-base leading-relaxed">
            Élever en un sommet pointu supprime de l'encombrement latéral de manière constante. Une démonstration classique montre qu'il faut vider exactement <strong>trois fois</strong> un cône rempli d'eau pour remplir entièrement un cylindre ayant les mêmes caractéristiques (base et hauteur identiques).
          </p>
          
          <hr className="border-rose-100 dark:border-rose-800/60 my-4"/>
          
          <ul className="space-y-4">
            <li className="flex flex-col sm:flex-row sm:items-center justify-between bg-card/60 p-4 rounded-xl border border-rose-100/60 dark:border-rose-800/40">
              <div>
                <strong className="text-rose-950 dark:text-rose-100">La Pyramide</strong> (Base polygonale plane : triangle, carré...) :
              </div>
              <span className="font-serif px-3 py-1.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold shadow-sm whitespace-nowrap text-sm mt-2 sm:mt-0">
                {"$V = \\frac{A_{\\text{base}} \\times h}{3}$"}
              </span>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center justify-between bg-card/60 p-4 rounded-xl border border-rose-100/60 dark:border-rose-800/40">
              <div>
                <strong className="text-rose-950 dark:text-rose-100">Le Cône de Révolution</strong> (Base circulaire à disque de rayon r) :
              </div>
              <span className="font-serif px-3 py-1.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold shadow-sm whitespace-nowrap text-sm mt-2 sm:mt-0">
                {"$V = \\frac{\\pi \\times r^2 \\times h}{3}$"}
              </span>
            </li>
          </ul>
        </div>
      </Section>

      {/* Embedded interactive simulator here */}
      <InteractiveSolidSimulator />

      <InfoBlock type="info" title="Zoom sur : Pourquoi toutes les cartes du monde de ta salle de classe sont fausses !">
        C&apos;est le physicien et mathématicien allemand Carl Friedrich Gauss qui a prouvé de manière absolue, grâce à son légendaire « Theorema Egregium » en 1827, qu&apos;il est <strong>physiquement et géométriquement impossible</strong> d&apos;aplatir une sphère parfaite (comme notre globe terrestre en 3D) sur un plan en 2D (une carte en papier) sans étirer ou déformer soit les angles, soit les distances ! 
        <br />La célèbre projection de Mercator utilisée par Google Maps conserve les angles (pratique pour la navigation de navires), mais déforme horriblement les tailles : le Groenland y paraît aussi gigantesque que l&apos;Afrique, alors qu&apos;en réalité, l&apos;Afrique est 14 fois plus vaste !
      </InfoBlock>

      <Section title="3. La Sphère et la Boule (Le cercle total)" icon="🌍" color="blue">
        <p className="mb-4">
          La courbure cosmique uniforme. En mathématiques de troisième, une nuance linguistique très rigoureuse sépare la coque interne du solide plein :
        </p>
        <ul className="list-disc list-inside mb-6 pl-4 space-y-2 text-muted-text">
          <li><strong>La Sphère :</strong> Représente uniquement l'écorce superficielle (coquille vide, comme un ballon de football ou une bulle de savon). Elle a une surface externe (une aire) mais ne retient rien à l'intérieur.</li>
          <li><strong>La Boule :</strong> Modélise le corps rempli et compact (pleine, comme une bille ou le noyau terrestre). Elle possède un volume.</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-center">
          <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800">
            <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3">Aire de la Sphère</h4>
            <div className="font-serif text-2xl font-bold bg-card dark:bg-slate-900 py-3 rounded-xl border border-sky-300 dark:border-sky-800/50 text-sky-900 dark:text-sky-100 flex justify-center items-center">
              {"$A = 4 \\times \\pi \\times r^2$"}
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Astuce mentale : Elle correspond très exactement à la somme de quatre disques plats parfaits du même rayon enveloppant sa courbure.
            </p>
          </div>
          
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-3">Volume de la Boule</h4>
            <div className="font-serif text-2xl font-bold bg-card dark:bg-slate-900 py-3 rounded-xl border border-blue-300 dark:border-blue-800/50 text-blue-900 dark:text-blue-100 flex justify-center items-center">
              {"$V = \\frac{4}{3} \\times \\pi \\times r^3$"}
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-3 font-bold leading-relaxed">
              MÉFIANCE : L'exposant du rayon est impérativement de Puissance 3 (cubique) !
            </p>
          </div>
        </div>

        <InfoBlock title="Le saviez-vous ? 💭" type="funfact">
          La forme de la sphère est celle qui offre le ratio le plus optimal du cosmos : pour une aire superficielle donnée, elle englobe le volume maximal possible ! C'est ce qui explique pourquoi les gouttes d'eau célestes, les étoiles, et les bulles de gaz se contractent naturellement en boules parfaites pour stabiliser au maximum leur tension de surface.
        </InfoBlock>
      </Section>

      <Section title="4. Les Sections de Solides (L'art de la découpe)" icon="🔪" color="emerald">
        <p className="mb-4">
          Quelle trace géométrique laisse le passage d'une lame droite parfaite (un plan géométrique horizontal ou vertical) à travers un solide ? C'est l'essence des <strong>sections</strong>.
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
          <ul className="space-y-2">
            <li><strong>Parallèle sur Pavé Droit (Box) :</strong> Trancher un immeuble rectangle par une lame parallèle au sol produit un <strong>Rectangle</strong> identique aux bases.</li>
            <li><strong>Parallèle sur Cylindre :</strong> Trancher perpendiculairement l'axe d'un cylindre à l’horizontale produit un <strong>Cercle</strong> parfait de même rayon. Le trancher parallèlement à son axe produit un <strong>Rectangle</strong>.</li>
            <li><strong>Parallèle sur Sphère :</strong> Couper une sphère (comme un pamplemousse) génère TOUJOURS un <strong>Cercle</strong> (ou un disque s'il s'agit de la boule).</li>
          </ul>
        </div>
        
        <TipBanner title="Règle d'or absolue des Agrandissements - Réductions (Examen du Brevet)" type="warning">
          Lorsqu'on coupe une pyramide ou un cône parallèlement à sa base : on obtient un solide miniature qui est une **réduction** du premier. Si le facteur d'échelle est le coefficient de réduction {"$k$"} (compris entre 0 et 1) :
          <ul className="list-disc list-inside mt-2 space-y-1 font-semibold text-sm">
            <li>Toutes les longueurs d'arêtes sont multipliées par {"$k$"}</li>
            <li>Toutes les aires de surface sont multipliées par {"$k^2$"}</li>
            <li>Tous les volumes finaux sont multipliés par {"$k^3$"}</li>
          </ul>
          <span className="block mt-2 italic text-xs">
            Exemple : Si la hauteur est divisée par 2, {"$k = 0,5$"}, le volume final s'affaisse de {"$0,5^3 = 0,125$"}, c'est-à-dire qu'il est divisé par 8 !
          </span>
        </TipBanner>
      </Section>

      <Section title="5. Exercices Résolus" icon="📝" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Dosage de cocktail conique"
          question={
            <>
              Un verre à cocktail a la forme d'un cône de révolution inversé de rayon {"$r = 5 \\text{ cm}$"} et de hauteur {"$h = 9 \\text{ cm}$"}. <br/>
              1. Calculer le volume maximal du contenant.<br/>
              2. On injecte du sirop jusqu'à mi-hauteur. Quel est le facteur de réduction {"$k$"} et quel volume de sirop a-t-on déposé ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul du volume maximal total</strong><br/>
              On utilise la formule conique : {"$V = \\frac{\\pi \\times r^2 \\times h}{3}$"}.<br/>
              On injecte les données : {"$V = \\frac{\\pi \\times 5^2 \\times 9}{3}$"}.<br/>
              {"$V = \\frac{\\pi \\times 25 \\times 9}{3} = 75 \\times \\pi \\approx 235,62 \\text{ cm}^3$"} (soit environ 235 mL).
            </>,
            <>
              <strong>Étape 2 : Déduction du volume de sirop</strong><br/>
              Puisque le sirop s'élève à <em>mi-hauteur</em>, la forme de liquide est une réduction directe du cône initial. Le facteur de réduction est {"$k = \\frac{1}{2} = 0,5$"}.<br/>
              La formule de réduction des volumes stipule : {"$V_{\\text{sirop}} = k^3 \\times V_{\\text{total}}$"}.<br/>
              {"$V_{\\text{sirop}} = 0,5^3 \\times (75\\pi) = 0,125 \\times 235,62 \\approx 29,45 \\text{ cm}^3$"} (environ 29 mL). C'est beaucoup moins qu'on ne l'anticipe à première vue !
            </>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Masse d'un boulet de canon"
          question={
            <>
              Un navire historique transporte des boulets de canon sphériques en fonte pleine de rayon {"$R = 6 \\text{ cm}$"}. <br/>
              1. Calculer le volume de fonte requis pour fabriquer un récipient boulet en {"$\\text{cm}^3$"}.<br/>
              2. Si la masse volumique de la fonte est de {"$7,2 \\text{ g/cm}^3$"}, quelle est la masse d'un seul boulet ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calcul du volume de la boule pleine</strong><br/>
              Formule de volume : {"$V = \\frac{4}{3} \\times \\pi \\times R^3$"}.<br/>
              On y dépose notre rayon : {"$V = \\frac{4}{3} \\times \\pi \\times 6^3$"}.<br/>
              Note : {"$6^3 = 6 \\times 6 \\times 6 = 216$"}.<br/>
              {"$V = \\frac{4 \\times \\pi \\times 216}{3} = 288\\pi \\approx 904,78 \\text{ cm}^3$"}.
            </>,
            <>
              <strong>Étape 2 : Conversion en masse</strong><br/>
              Chaque centimètre cube pèse 7,2 grammes. <br/>
              {"$\\text{Masse} = V \\times \\text{Masse volumique}$"}.<br/>
              {"$\\text{Masse} = 904,78 \\times 7,2 \\approx 6514,4 \\text{ g}$"}, soit approximativement <strong>6,51 kg</strong> pour un seul projectile cylindrique de cette taille !
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Rappelle-toi la formule magique en or : Quel est le lien de famille absolu des Formes à "Murs Verticaux" (Cylindre, Prisme) pour trouver leur Volume ?</>}
            back={<>Une seule équation pure unificatrice :<br/><strong>Aire de la Base multipliée par la Hauteur !</strong><br/><em className="text-sm">(S'applique à : Prismes, Pavés Droits, Cubes Droits, et aux fiers Cylindres).</em></>}
          />
          <Flashcard 
            front={<>Je réduis mon cône géant par un facteur magique de {"$k = \\frac{1}{3}$"}. Par combien en chute libre baisse le Volume de la miniature ?</>}
            back={<>Le volume est affecté par le cube du facteur de réduction, soit {"$k^3$"}.<br/>Le volume final est réduit de :<br/>{"$(\\frac{1}{3})^3 = \\frac{1}{3} \\times \\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{27}$"}.<br/>Il devient donc <strong>27 fois plus petit</strong> !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre Périmètre, Aire, et Volume en unités ?",
              answer: "Le Périmètre correspond à une longueur (1 dimension) exprimée en mètres ou centimètres (cm). L'Aire délimite une surface plane (2 dimensions) imprimée en mètres carrés (m²) ou cm². Le Volume mesure le contenu ou la capacité d'accueil (3 dimensions) calculée en mètres cubes (m³), décimètres cubes (dm³), centimètres cubes (cm³) ou en litres (L)."
            },
            {
              question: "Puis-je calculer le volume d'une forme irrégulière telle qu'une pierre de roche brute ?",
              answer: "Les formules mathématiques théoriques s'arrêtent ici. Cependant, la physique historique de la Grèce antique opère ! On peut remplir à ras bord un récipient régulier d'eau, y immerger la roche brute et mesurer la hauteur exacte d'eau déplacée. Le volume d'eau débordé ou surélevé est rigoureusement égal au volume tridimensionnel physique de la roche irrégulière (loi d'Archimède) !"
            },
            {
              question: "Quelle est la conversion universelle à connaître pour le brevet entre litres et décimètres cubes ?",
              answer: "La conversion incontournable en sciences est : \n1 Litre (L) = 1 décimètre cube (dm³).\nCela signifie aussi que : \n1 millilitre (mL) = 1 centimètre cube (cm³). Conservez précieusement ces deux égalités !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai une splendide pyramide à base carrée d'aire de base S = 15 cm² et d'une hauteur h = 8 cm. Quel est son volume ?",
              options: [
                "120 cm³ (15 × 8)",
                "40 cm³ ((15 × 8) ÷ 3)",
                "Il est infaisable car il manque la longueur des côtés !"
              ],
              correctAnswer: 1,
              explanation: "Exactement ! La base vaut déjà 15. Le solide ayant des faces convergeant en pointe, on n'oublie jamais de diviser le résultat par trois : (15 × 8) ÷ 3 = 120 ÷ 3 = 40 cm³ !"
            },
            {
              question: "La grande Sphère terrestre a un Rayon R = 10. Une sphère miniature de réduction a un Rayon r = 5. Comment a décru son Volume ?",
              options: [
                "Il a été divisé par 2.",
                "Il a été divisé par 4.",
                "Il a été divisé par 8 (soit 2³)."
              ],
              correctAnswer: 2,
              explanation: "Merveilleux ! Le rayon a été scindé par 2 (coefficient k = 0,5). Un volume de solides réduit suit le cube du facteur : k³ = (1/2)³ = 1/8. La petite boule tiendra donc 8 fois moins de volume d'eau !"
            },
            {
              question: "Si l'on tranche une sphère parfaite à mi-hauteur par un plan horizontal, quelle forme géométrique observe-t-on au niveau de l'entaille ?",
              options: [
                "Un ovale ou une ellipse",
                "Un disque ou cercle parfait",
                "Un rectangle ou segment plat"
              ],
              correctAnswer: 1,
              explanation: "Félicitations ! Peu importe le sens du tranchage sur une sphère parfaite de révolution, toute section circulaire avec un plan donne toujours à sa trace finale un cercle (pour l'écorce) ou un disque parfait !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je maîtrise la Trinité de la division par 3 (/3) pour les solides pointus (Pyramides, Cônes).",
            "Je retiens la formule de l'Aire du Disque à la base : pi fois le Rayon au carré, pour mes volumes.",
            "Je sais que toute section plane parallèle d'une sphère génère toujours une trace en cercle parfait.",
            "Je sais que les volumes se réduisent ou s'agrandissent selon le coefficient au cube (k³)."
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

export default Course_College_3eme_09_Espace;
