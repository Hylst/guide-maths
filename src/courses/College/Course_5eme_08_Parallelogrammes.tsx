import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, StepList, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_08_Parallelogrammes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Parallelogram configuration state: skewness angle & width/height bounds
  const [skew, setSkew] = useState<number>(30); // offset of top line relative to bottom
  const [showDiagonals, setShowDiagonals] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(false);

  // Geometry: A at (50, 150), B at (200, 150).
  // D at (50 + skew, 60), C at (200 + skew, 60)
  const ax = 60, ay = 150;
  const bx = 220, by = 150;
  const dx = ax + skew, dy = 60;
  const cx = bx + skew, cy = 60;

  // Midpoint K of diagonals [AC] and [BD]
  const kx = (ax + cx) / 2;
  const ky = (ay + cy) / 2;

  // Opposite lengths
  const baseLen = bx - ax; // 160
  const sideLen = Math.sqrt(skew * skew + (ay - dy) * (ay - dy)).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PRL"
        title="Les Parallélogrammes"
        subtitle="L'art du glissement parfait, des symétries intérieures et des diagonales magiques."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Notion de droites parallèles", "Symétrie centrale"]}
        objectives={[
          "Définir un parallélogramme par ses côtés parallèles",
          "Exploiter les propriétés sur les côtés, angles et diagonales",
          "Construire un parallélogramme à l'aide de différents instruments",
          "Distinguer et caractériser les parallélogrammes particuliers (rectangle, losange, carré)"
        ]}
      />

      <Section title="⚠️ Le Quadrilatère Qui Glisse" icon="🛷" color="rose">
        <p className="lead text-lg">
          Un quadrilatère a 4 côtés. Mais si tu forces ses côtés opposés à glisser <strong>parfaitement en parallèle</strong>, sa structure géométrique s'ordonne magnifiquement.
        </p>
        
        <InfoBlock type="definition" title="La Définition Fondamentale">
          Un <strong>parallélogramme</strong> est un quadrilatère dont les côtés opposés sont parallèles deux à deux.
          <br/><br/>
          {`$\\text{Si } (AB) \\mathbin{//} (CD) \\text{ et } (AD) \\mathbin{//} (BC), \\text{ alors } ABCD \\text{ est un parallélogramme.}$`}
        </InfoBlock>

        {/* Dynamic Interactive SVG representation with interactive states */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm text-center">
          <h4 className="font-bold text-lg mb-2 text-rose-800 dark:text-rose-400">Interactif : Déformation et Diagonales d'un Parallélogramme</h4>
          <p className="text-sm text-slate-500 mb-6">Modifie le glissement géométrique pour observer la conservation des caractéristiques.</p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>Glissement latéral (C et D) :</span>
                <input 
                  type="range" 
                  min="0" 
                  max="120" 
                  value={skew} 
                  onChange={(e) => setSkew(parseInt(e.target.value))}
                  className="w-32 accent-rose-600"
                />
                <span>{skew} px</span>
              </div>
              
              <button 
                type="button"
                onClick={() => setShowDiagonals(!showDiagonals)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${showDiagonals ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Diagonales : {showDiagonals ? 'Visibles' : 'Masquées'}
              </button>

              <button 
                type="button"
                onClick={() => setShowAngles(!showAngles)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${showAngles ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Angles : {showAngles ? 'Visibles' : 'Masqués'}
              </button>
            </div>

            <svg className="w-full max-w-lg h-60 border border-slate-150 rounded-2xl bg-slate-50 dark:bg-slate-900" viewBox="0 0 400 220">
              {/* Grid backdrop */}
              <defs>
                <pattern id="grid-prl" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-prl)" />

              {/* Parallelogram Shape */}
              <polygon points={`${ax},${ay} ${bx},${by} ${cx},${cy} ${dx},${dy}`} fill="#f43f5e" fillOpacity="0.08" stroke="#f43f5e" strokeWidth="3" />

              {/* Points labeled */}
              <circle cx={ax} cy={ay} r="5" fill="#000" />
              <text x={ax - 15} y={ay + 15} className="text-sm font-bold">A</text>

              <circle cx={bx} cy={by} r="5" fill="#000" />
              <text x={bx + 10} y={by + 15} className="text-sm font-bold">B</text>

              <circle cx={cx} cy={cy} r="5" fill="#000" />
              <text x={cx + 10} y={cy - 5} className="text-sm font-bold">C</text>

              <circle cx={dx} cy={dy} r="5" fill="#000" />
              <text x={dx - 15} y={cy - 5} className="text-sm font-bold">D</text>

              {/* Side length markers */}
              <text x={(ax + bx) / 2} y={ay + 18} className="text-xs font-bold font-mono" fill="#475569">base = {baseLen} cm</text>
              <text x={(dx + cx) / 2} y={dy - 10} className="text-xs font-bold font-mono" fill="#475569">base = {baseLen} cm</text>
              <text x={(ax + dx) / 2 - 40} y={(ay + dy) / 2} className="text-xs font-bold font-mono" fill="#475569">côté = {sideLen} cm</text>
              <text x={(bx + cx) / 2 + 10} y={(by + cy) / 2} className="text-xs font-bold font-mono" fill="#475569">côté = {sideLen} cm</text>

              {/* Diagonals */}
              {showDiagonals && (
                <g>
                  {/* Diagonal [AC] */}
                  <line x1={ax} y1={ay} x2={cx} y2={cy} stroke="#2563eb" strokeWidth="2" strokeDasharray="3" />
                  {/* Diagonal [BD] */}
                  <line x1={bx} y1={by} x2={dx} y2={dy} stroke="#2563eb" strokeWidth="2" strokeDasharray="3" />
                  {/* Intersection Point K */}
                  <circle cx={kx} cy={ky} r="4" fill="#1d4ed8" />
                  <text x={kx - 5} y={ky - 10} className="text-xs font-bold" fill="#1d4ed8">K (Milieu)</text>
                </g>
              )}

              {/* Angles highlight */}
              {showAngles && (
                <g>
                  <circle cx={ax} cy={ay} r="20" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="1,15" />
                  <circle cx={cx} cy={cy} r="20" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="1,15" />
                  <text x={ax + 25} y={ay - 10} className="text-xs font-bold text-amber-600">α</text>
                  <text x={cx - 30} y={cy + 20} className="text-xs font-bold text-amber-600">α</text>
                </g>
              )}
            </svg>
            <p className="text-xs text-slate-500 font-medium">Observe : Les longueurs opposées restent toujours identiques et les diagonales continuent d'avoir le même milieu K, peu importe la torsion latérale induite.</p>
          </div>
        </div>
      </Section>

      <Section title="💎 Les 3 Super-Pouvoirs Géométriques" icon="✨" color="purple">
        <p className="mb-4">Tout parallélogramme vérifie d'office d'incroyables symétries intérieures, qui s'énoncent ainsi :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50/50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800/60 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">1. Côtés Opposés Égaux</h3>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Dans un parallélogramme, les côtés opposés ont exactement la même longueur : AB = CD et AD = BC.
            </p>
          </div>
          
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800/60 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-100 mb-2">2. Diagonales au Milieu</h3>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Les diagonales se coupent en leur milieu. Ce point d'intersection est également le centre de symétrie de la figure.
            </p>
          </div>

          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-2">3. Angles Opposés Égaux</h3>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Les angles opposés ont exactement la même mesure, tandis que deux angles consécutifs sont supplémentaires (leur somme = 180°).
            </p>
          </div>
        </div>
      </Section>

      <Section title="👑 Les Parallélogrammes Particuliers (Évolution)" icon="🛡️" color="amber">
        <p className="mb-4">Avec des contraintes en plus, les parallélogrammes évoluent et adoptent des propriétés uniques :</p>
        
        <div className="space-y-4">
          <InfoBlock type="reminder" title="Le Rectangle">
            Grand spécialiste des angles droits. Si un parallélogramme a un seul angle droit (ou des diagonales de même longueur), alors c'est un rectangle.
          </InfoBlock>
          <InfoBlock type="info" title="Le Losange">
            Spécialiste des côtés égaux. Si un parallélogramme a deux côtés consécutifs égaux (ou des diagonales perpendiculaires), alors c'est un losange.
          </InfoBlock>
          <InfoBlock type="definition" title="Le Carré (Le Dieu Suprême)">
            C'est l'évolution finale ! C'est à la fois un rectangle et un losange. Il gagne toutes les propriétés cumulées : 4 côtés égaux, 4 angles droits et des diagonales perpendiculaires de même longueur.
          </InfoBlock>
        </div>
      </Section>

      <Section title="🛠️ Construction au Compas" icon="🏗️" color="indigo">
        <p className="mb-4">
          Pour construire un parallélogramme ABCD connaissant les sommets A, B, C, on reporte simplement les longueurs au compas sans jamais avoir besoin d'équerre :
        </p>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">1. Prendre la longueur de base AB</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On pique le compas sur A, on l'ouvre sur B. On transfère ensuite cette ouverture en piquant sur C, et on dessine un arc de cercle à gauche (vers l'emplacement théorique du point D).
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">2. Prendre la longueur oblique BC</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On pique sur B, on l'ouvre sur C. On transfère cette ouverture en piquant sur A, et on dessine un deuxième arc qui croise le premier en un point. This intersection is D !
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">3. Tracer la figure</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On relie à la règle les segments [AD] et [CD] pour finaliser le parallélogramme parfait.
            </p>
          </div>
        </StepList>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quel parallélogramme a des diagonales <strong>perpendiculaires</strong> d'office ?</>}
            back={<>Le <strong>Losange</strong> (et sa version finale, le Carré).</>}
          />
          <Flashcard 
            front={<>Que vaut la somme de deux angles consécutifs dans un parallélogramme ?</>}
            back={<>La somme fait toujours exactement <strong>$180^\circ$</strong> (angles supplémentaires).</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Reconnaissance de nature"
          question="ABCD est un parallélogramme. Ses diagonales se coupent en I. On sait que AC = BD (diagonales égales). Quelle est la nature précise de ABCD ?"
          steps={[
            "ABCD est initialement caractérisé comme un parallélogramme de base.",
            "Le cours nous apprend un critère : 'Si un parallélogramme possède des diagonales de longueurs égales, alors c'est un rectangle'.",
            "J'en déduis que ABCD est un <strong>rectangle</strong>."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Calcul d'un angle opposé"
          question="Le quadrilatère MNOP est un parallélogramme. L'angle M vaut 65°. Calcule la mesure de l'angle O opposé à M."
          steps={[
            "J'analyse la disposition des points aux sommets : par ordre circulaire, les sommets sont M, N, O, P. Par conséquent, les angles M et O sont opposés.",
            "Dans tout parallélogramme, deux angles opposés ont exactement la même mesure géométrique.",
            "L'angle O mesure donc lui aussi exactement <strong>65°</strong>."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre rectangle et losange ?",
              answer: "Le rectangle privilégie les sommets et les angles (angles droits, diagonales égales, mais côtés adjacents potentiellement inégaux). Le losange privilégie les côtés et les obliques (côtés égaux, diagonales orthogonales/perpendiculaires, mais angles quelconques)."
            },
            {
              question: "Un parallélogramme possède-t-il des axes de symétrie ?",
              answer: "Un parallélogramme quelconque n'a AUCUN axe de symétrie ! Il a seulement un centre de symétrie (l'intersection des diagonales). Le rectangle et le losange acquièrent des axes."
            },
            {
              question: "Est-ce qu'un trapèze est un parallélogramme ?",
              answer: "Non. Un trapèze possède seulement deux côtés parallèles. Le parallélogramme requiert que les quatre côtés soient parallèles deux à deux."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Test d'Alignement" icon="🕹️" color="purple">
        <p className="mb-4">Démontre que tu as compris l'ascension des quadrilatères :</p>
        <FillInTheBlanks 
          id="prl-eval"
          content={[
            "J'analyse la figure ABCD. Le texte dit que ses côtés (AB) et (DC) sont parallèles. (AD) et (BC) sont aussi parallèles. C'est officiellement un ",
            { options: ["trapèze", "parallélogramme", "carré"], correctAnswer: 1 },
            ". Du coup, grâce aux super-pouvoirs, je sais sans même mesurer que la longueur AB est ",
            { options: ["plus grande que", "strictement égale à"], correctAnswer: 1 },
            " la longueur DC. Super ! Soudain, on me dit que les diagonales de ABCD sont perpendiculaires. Wow ! Mon parallélogramme a évolué, il est devenu un ",
            { options: ["rectangle", "losange", "cercle"], correctAnswer: 1 },
            ". S'il gagne en plus un angle droit, il deviendra finalement l'être parfait : un ",
            { options: ["rectangle", "trapèze isocèle", "carré"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on me donne un quadrilatère quelconque ABCD, quel critère prouve que c'est un parallélogramme ?",
              options: [
                "Ses diagonales se coupent en leur milieu.",
                "Ses diagonales sont de longueurs égales.",
                "Il a deux angles droits."
              ],
              correctAnswer: 0,
              explanation: "C'est l'un des critères réciproques majeurs : si ses diagonales se coupent en un même milieu, c'est forcément un parallélogramme."
            },
            {
              question: "Quelle est la définition stricte du losange ?",
              options: [
                "Un quadrilatère possédant 4 côtés de même longueur.",
                "Un parallélogramme avec des diagonales de même longueur.",
                "Un quadrilatère possédant 4 angles droits."
              ],
              correctAnswer: 0,
              explanation: "Tout quadrilatère qui a ses quatre côtés égaux est un losange (et à fortiori, c'est aussi un parallélogramme)."
            },
            {
              question: "Deux angles consécutifs (qui se suivent) d'un parallélogramme mesurent respectivement x et y. Si x = 110°, quelle est la valeur de y ?",
              options: [
                "110°",
                "70°",
                "90°"
              ],
              correctAnswer: 1,
              explanation: "Deux angles consécutifs dans un parallélogramme sont supplémentaires (leur somme vaut 180°). Donc y = 180° - 110° = 70°."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la définition : côtés opposés parallèles.",
            "Je connais les 3 propriétés de base (côtés opposés égaux, angles opposés égaux, diagonales qui se coupent en leur milieu).",
            "Je sais que le Rectangle pèse sur l'égalité des diagonales et les angles droits.",
            "Je sais que le Losange pèse sur la perpendicularité des diagonales et les côtés égaux.",
            "Je sais tracer la 4ème pointe au compas sans trembler."
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

export default Course_5eme_08_Parallelogrammes;
