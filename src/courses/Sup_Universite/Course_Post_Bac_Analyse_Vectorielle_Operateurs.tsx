import React, { useState, useEffect, useRef } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, FormulaBox, 
  Quiz, Flashcard, InteractiveExercise, InteractiveChecklist, BentoGrid, BentoCard
} from '../../components/SharedUI';
import { Wind, Shield, HelpCircle, Activity, Award, Compass, Sparkles } from 'lucide-react';

type FieldType = 'source' | 'vortex' | 'saddle' | 'uniform';

interface Particle {
  id: number;
  x: number;
  y: number;
  age: number;
}

const VectorFieldSimulator: React.FC = () => {
  const [fieldType, setFieldType] = useState<FieldType>('vortex');
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number | null>(null);

  // Initialize random particles inside coordinates [-3, 3] x [-3, 3]
  useEffect(() => {
    const list: Particle[] = [];
    for (let i = 0; i < 35; i++) {
      list.push({
        id: i,
        x: (Math.random() * 6) - 3,
        y: (Math.random() * 6) - 3,
        age: Math.random() * 100
      });
    }
    setParticles(list);
  }, []);

  // Vector field definition F(x, y)
  const getVelocity = (x: number, y: number): { vx: number, vy: number } => {
    switch (fieldType) {
      case 'source':
        // Positive Divergence Source: F(x, y) = (x, y)
        // Normalize slightly to look good
        return { vx: 0.35 * x, vy: 0.35 * y };
      case 'vortex':
        // Rotational field: F(x, y) = (-y, x)
        return { vx: -0.35 * y, vy: 0.35 * x };
      case 'saddle':
        // Saddle field: F(x, y) = (x, -y)
        return { vx: 0.3 * x, vy: -0.3 * y };
      case 'uniform':
        // Constant wind: F = (1.2, 0.4)
        return { vx: 0.8, vy: 0.2 };
      default:
        return { vx: 0, vy: 0 };
    }
  };

  // Run particle simulation loops using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      setParticles(prev => 
        prev.map(p => {
          const { vx, vy } = getVelocity(p.x, p.y);
          const dt = 0.05;
          let newX = p.x + vx * dt;
          let newY = p.y + vy * dt;
          let newAge = p.age + 1;

          // Recycle particle if it exits the perimeter or gets too old
          if (newX < -3.2 || newX > 3.2 || newY < -3.2 || newY > 3.2 || newAge > 150) {
            newX = (Math.random() * 4) - 2;
            newY = (Math.random() * 4) - 2;
            newAge = 0;
          }

          return {
            ...p,
            x: newX,
            y: newY,
            age: newAge
          };
        })
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [fieldType]);

  // Convert coordinate x, y [-3, 3] to SVG grid pixels [0, 300]
  const toSvgX = (coordX: number) => ((coordX + 3.2) / 6.4) * 300;
  const toSvgY = (coordY: number) => ((-coordY + 3.2) / 6.4) * 300;

  // Generate beautiful background arrow grids
  const renderArrowGrid = () => {
    const arrows = [];
    const step = 0.8;
    for (let gx = -2.4; gx <= 2.4; gx += step) {
      for (let gy = -2.4; gy <= 2.4; gy += step) {
        const vel = getVelocity(gx, gy);
        const len = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);
        if (len < 0.01) continue;

        // Scale arrow visual display length
        const drawLen = 14;
        const dx = (vel.vx / len) * drawLen;
        const dy = (-vel.vy / len) * drawLen; // Inverted SVG y axis

        const sX = toSvgX(gx);
        const sY = toSvgY(gy);
        const eX = sX + dx;
        const eY = sY + dy;

        // Rotation angle of arrow heads
        const angle = Math.atan2(dy, dx);
        const headlen = 4;
        const arrowHeadPath = `M ${eX} ${eY} L ${eX - headlen * Math.cos(angle - Math.PI/6)} ${eY - headlen * Math.sin(angle - Math.PI/6)} M ${eX} ${eY} L ${eX - headlen * Math.cos(angle + Math.PI/6)} ${eY - headlen * Math.sin(angle + Math.PI/6)}`;

        arrows.push(
          <g key={`arrow-${gx}-${gy}`} className="stroke-slate-700 dark:stroke-slate-500 opacity-60">
            <line x1={sX} y1={sY} x2={eX} y2={eY} strokeWidth="1" />
            <path d={arrowHeadPath} strokeWidth="1" strokeLinecap="round" />
          </g>
        );
      }
    }
    return arrows;
  };

  const currentDivergence = () => {
    if (fieldType === 'source') return "+ 2.0 (Fluide sortant)";
    if (fieldType === 'uniform') return "0.0 (Champ solénoïdal)";
    return "0.0";
  };

  const currentCurl = () => {
    if (fieldType === 'vortex') return "+ 2.0 𝒛̂ (Rotationel pur)";
    return "0.0";
  };

  return (
    <div className="bg-card border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center flex items-center justify-center gap-2">
        <Activity size={22} className="text-indigo-600 animate-pulse" />
        Laboratoire Virtuel de Flux Vectoriels et de Champs de Force
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Analysez en direct la divergence et le rotationnel d'un fluide. Changez l'opérateur physique et contemplez la trajectoire des particules de fluide {"$\\vec{v}(x, y)$"}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* FIELD TYPE SELECTOR PANEL */}
        <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 self-start">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest"> Configuration du Champ </label>
          <div className="grid grid-cols-1 gap-2 pt-1">
            <button 
              onClick={() => setFieldType('vortex')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                fieldType === 'vortex'
                  ? 'bg-indigo-650 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 hover:bg-slate-50'
              }`}
            >
              🌀 Tourbillon (Rotationnel)
            </button>
            <button 
              onClick={() => setFieldType('source')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                fieldType === 'source'
                  ? 'bg-indigo-650 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 hover:bg-slate-50'
              }`}
            >
              🌋 Source Divergente
            </button>
            <button 
              onClick={() => setFieldType('saddle')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                fieldType === 'saddle'
                  ? 'bg-indigo-650 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 hover:bg-slate-50'
              }`}
            >
              🐴 Col de Selle de Singe
            </button>
            <button 
              onClick={() => setFieldType('uniform')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                fieldType === 'uniform'
                  ? 'bg-indigo-650 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 border-slate-150 hover:bg-slate-50'
              }`}
            >
              💨 Courant Uniforme
            </button>
          </div>
        </div>

        {/* INTERACTIVE SIMULATOR GRAPHIC DISPLAY */}
        <div className="flex flex-col items-center bg-slate-950 rounded-2xl p-4 shadow-inner relative justify-center">
          <svg 
            viewBox="0 0 300 300" 
            className="w-full max-w-[250px] aspect-square rounded-xl bg-slate-900 border border-slate-800"
          >
            {/* Draw standard field grids arrows */}
            {renderArrowGrid()}

            {/* Simulated flowing micro-particles */}
            {particles.map(p => (
              <circle
                key={`p-${p.id}`}
                cx={toSvgX(p.x)}
                cy={toSvgY(p.y)}
                r="3"
                className="fill-cyan-400 stroke-cyan-250 animate-pulse"
                strokeWidth="0.5"
                opacity={Math.min(1.0, (150 - p.age) / 25)}
              />
            ))}
          </svg>
          <div className="text-[10px] text-slate-500 mt-2 text-center">
            🌌 Visualisation des lignes de courant hydrodynamiques
          </div>
        </div>

        {/* MATH DIAGNOSTIC PANEL */}
        <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widestLabel"> Opérateurs Mesurés </label>
            
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-150 space-y-1">
              <span className="text-[10px] uppercase text-indigo-500 font-bold font-mono">Divergence (∇ · F) :</span>
              <div className="font-mono text-xs font-bold text-slate-800 dark:text-white">
                {currentDivergence()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-150 space-y-1">
              <span className="text-[10px] uppercase text-indigo-500 font-bold font-mono">Rotationnel (∇ × F) :</span>
              <div className="font-mono text-xs font-bold text-slate-800 dark:text-white">
                {currentCurl()}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed bg-slate-100 dark:bg-slate-955 p-3 rounded-xl border border-slate-200">
            💡 <strong>Observation physique :</strong> Un rotationnel nul s'associe à un champ <strong>conservatif</strong> (dérive d'un potentiel scalaire). Une divergence nulle s'associe à un fluide <strong>incompressible</strong> !
          </div>
        </div>

      </div>
    </div>
  );
};

const Course_Post_Bac_Analyse_Vectorielle_Operateurs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-VECT"
        title="Analyse Vectorielle d'Ingénieur & Opérateurs"
        subtitle="Gradient, Divergence, Rotationnel et les grands théorèmes physiques de Stokes, Green et Ostrogradski."
        duration="1h 00"
      />

      <InfoBlock type="info" title="Pourquoi l'Analyse Vectorielle est-elle le pilier des Sciences Physiques ?">
        Tout l'univers physique qui nous entoure est gouverné par des champs de forces. L'équation de continuité hydrologique, la théorie de la gravitation, la relativité, et surtout les quatre équations fondamentales de l'électromagnétisme de Maxwell s'écrivent exclusivement à l'aide des opérateurs différentiels spatiaux : le Gradient, la Divergence, et le Rotationnel.
      </InfoBlock>

      <Section title="1. Les Opérateurs Différentiels Spatiaux" icon="📐" color="slate">
        <p className="mb-4">
          Nous travaillons sur un domaine de {"$\\mathbb{R}^3$"} muni d'un système de coordonnées cartésiennes orthonormales. Nous considérons des champs scalaires {"$f(x,y,z)$"} et des champs de vecteurs {"$\\vec{F}(x,y,z) = (F_x, F_y, F_z)^T$"}.
        </p>

        <BentoGrid>
          <BentoCard title="Le Rotationnel (∇ × F)" icon={<Wind className="text-rose-500" size={18} />} color="rose">
            Mesure la tendance d'un fluide à tourbillonner localement autour d'un point :
            <div className="bg-white dark:bg-slate-950 p-3 border border-rose-100 rounded-lg text-center font-mono my-2 text-rose-800 text-xs">
              {"$\\nabla \\times \\vec{F} = \\begin{pmatrix} \\partial F_z/\\partial y - \\partial F_y/\\partial z \\\\ \\partial F_x/\\partial z - \\partial F_z/\\partial x \\\\ \\partial F_y/\\partial x - \\partial F_x/\\partial y \\end{pmatrix}$"}
            </div>
          </BentoCard>

          <BentoCard title="La Divergence (∇ · F)" icon={<Shield className="text-emerald-500" size={18} />} color="emerald">
            S'interprète comme la quantité net de flux sortant d'un volume élémentaire infinitésimal :
            <div className="bg-white dark:bg-slate-950 p-3 border border-emerald-110 rounded-lg text-center font-mono my-2 text-emerald-800 text-xs">
              {"$\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}$"}
            </div>
          </BentoCard>

          <BentoCard title="Le Laplacien (∆f)" icon={<Sparkles className="text-amber-500" size={18} />} color="amber">
            Correspond à la somme des dérivées secondes pures. C'est l'opérateur de diffusion de la chaleur ou d'onde :
            <div className="bg-white dark:bg-slate-950 p-3 border border-amber-100 rounded-lg text-center font-mono my-1.5 text-amber-800 text-xs">
              {"$\\Delta f = \\nabla^2 f = \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2} + \\frac{\\partial^2 f}{\\partial z^2}$"}
            </div>
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section title="2. Les Grands Théorèmes de Flux et Circulation" icon="⚡" color="indigo">
        <p className="mb-4">
          Ces puissants théorèmes permettent de convertir de manière purement analytique des intégrales volumiques complexes en intégrales de surface fermées simples, et vice versa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-sm">
          <FormulaBox 
            title="Théorème d'Ostrogradski (Divergence)" 
            math={"\\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV = \\iint_{\\partial V} \\vec{F} \\cdot \\vec{n} \\, dS"} 
          />
          <FormulaBox 
            title="Théorème de Stokes (Rotationnel)" 
            math={"\\iint_S (\\nabla \\times \\vec{F}) \\cdot \\vec{n} \\, dS = \\oint_{\\partial S} \\vec{F} \\cdot d\\vec{r}"} 
          />
        </div>

        <TipBanner type="warning" title="À retenir absolument pour vos concours">
          Le théorème de Green-Riemann est tout simplement la version bidimensionnelle du théorème de Stokes projeté sur le plan complexe Oxy. Il énonce :
          {"$$\\oint_{\\partial D} (P \\, dx + Q \\, dy) = \\iint_D \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) dx \\, dy$$"}
        </TipBanner>
      </Section>

      <Section title="3. Laboratoire Interactif de Simulation de Flux" icon="🔬" color="indigo">
        <VectorFieldSimulator />
      </Section>

      <Section title="🧠 Flashcards : Réflexes Vectoriels" icon="⚡" color="purple">
        <p className="text-center mb-6 text-slate-600 dark:text-slate-400">
          Entraînez-vous à interpréter physiquement les opérateurs de l&apos;ingénieur en un coup d&apos;œil.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Que représente physiquement une divergence nulle ({"$\\nabla \\cdot \\vec{F} = 0$"}) pour un fluide ?</>}
            back={<>Le fluide est <strong>incompressible</strong>. Tout ce qui entre dans un volume donné en ressort intégralement, sans accumulation ni expansion (reflétant l&apos;absence de source ou de puits dans le domaine).</>}
          />
          <Flashcard 
            front={<>Quelle est la signification physique d&apos;un rotationnel non nul ({"$\\nabla \\times \\vec{F} \\neq \\vec{0}$"}) ?</>}
            back={<>Le champ présente des <strong>tourbillons localisés</strong>. Si on plaçait une petite hélice miniature au point considéré, le flux du fluide la ferait tourner sur elle-même.</>}
          />
        </div>
      </Section>

      <Section title="4. Exercice d'Intégration Théorique" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Calcul d'un flux à travers un cylindre fermé"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>Soit le champ de forces radiales tridimensionnel :</p>
              {"$$\\vec{F}(x,y,z) = \\begin{pmatrix} x \\\\ y \\\\ \\sin(z) \\end{pmatrix}$$"}
              <p>Calculer le flux sortant total de cette force à travers la surface fermée {"$\\partial V$"} d'un cylindre {"$V$"} d'axe spectral z, de rayon R = 2, et compris entre les hauteurs z = 0 et z = {"$\\pi$"}.</p>
            </div>
          }
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 1 : Calcul de la divergence spatiale</p>
              <p>Au lieu de calculer péniblement 3 intégrales de surface sur les parois incurvées et les bases circulaires, le théorème d'Ostrogradski nous autorise à intégrer sa divergence globale sur tout le volume intérieur :</p>
              {"$$\\text{div} \\vec{F} = \\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial \\sin(z)}{\\partial z} = 1 + 1 + \\cos(z) = 2 + \\cos(z)$"}
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-xs">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Étape 2 : Construction de l'intégrale cylindrique triple</p>
              <p>Le volume interne {"$V$"} s'écrit commodément en coordonnées cylindriques : {"$r \\in [0, 2]$"}, {"$\\theta \\in [0, 2\\pi]$"}, {"$z \\in [0, \\pi]$"}. Le Jacobien élémentaire vaut r. L'intégrale s'énonce :</p>
              {"$$\\Phi = \\int_0^{\\pi} \\int_0^{2\\pi} \\int_0^2 (2 + \\cos(z)) \\, r \\, dr \\, d\\theta \\, dz$$"}
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-950 dark:text-emerald-110 text-xs leading-relaxed">
              <p>Étape 3 : Résolution finale</p>
              <p>Intégrons successivement chaque variable :</p>
              {"$$\\int_0^2 r \\, dr = \\left[ \\frac{r^2}{2} \\right]_0^2 = 2 \\quad ; \\quad \\int_0^{2\\pi} d\\theta = 2\\pi$$"}
              {"$$\\int_0^{\\pi} (2 + \\cos(z)) \\, dz = [2z + \\sin(z)]_0^{\\pi} = 2\\pi + 0 = 2\\pi$$"}
              <p>En multipliant ces trois contributions, nous obtenons :</p>
              {"$$\\Phi = 2 \\times 2\\pi \\times 2\\pi = 8\\pi^2$$"}
              <p>Solution : Le flux total sortant de la paroi est précisément de {"$8\\pi^2$"} !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="5. Certification Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si un champ de vecteurs possède un rotationnel rigoureusement nul partout sur un domaine simplement connexe, qu'est-ce que cela implique ?",
              options: [
                "Qu'il n'exerce aucune force sur les parois",
                "Qu'il dérive de manière conservatrice d'un potentiel scalaire, f, tel que F = -Grad f",
                "Qu'il est rigoureusement invariable dans le temps"
              ],
              correctAnswer: 1,
              explanation: "C'est un des plus beaux théorèmes d'analyse. Un champ de rotationnel nul s'associe à l'absence de vortex fermé. On l'appelle champ irrotationnel ou conservatif, et il existe un univers de potentiel scalaire de hauteur dont il dérive directement (par exemple, le potentiel électrique ou d'altitude de pesanteur) !"
            },
            {
              question: "Quelle identité remarquable vectorielle fait le lien direct entre Divergence, Rotationnel et Laplacien ?",
              options: [
                "div(rot F) = 1",
                "rot(rot F) = grad(div F) - ∆F (Laplacien vectoriel)",
                "Aucun lien direct n'est mathématiquement établi"
              ],
              correctAnswer: 1,
              explanation: "C'est la formule classique matricielle de double produit vectoriel. Le rotationnel du rotationnel correspond à la différence géométrique entre le gradient de la divergence globale et la diffusion spatiale directe du Laplacien spectral appliqué aux coordonnées !"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Connaître les expressions analytiques du Gradient, de la Divergence et de la formule croisée de Rotationnel.",
            "Comprendre géométriquement la notion de Laplacien et de diffusion thermique.",
            "Maîtriser les correspondances physiques des célèbres théorèmes spatiaux de Stokes et d'Ostrogradski."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_Analyse_Vectorielle_Operateurs;
