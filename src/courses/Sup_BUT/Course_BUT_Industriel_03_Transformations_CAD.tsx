import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Industriel_03_Transformations_CAD: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // State for transformations in 2D Homogeneous Coordinates
  const [tx, setTx] = useState(0); // Translation X
  const [ty, setTy] = useState(0); // Translation Y
  const [scale, setScale] = useState(1); // Scale factor
  const [rotation, setRotation] = useState(0); // Rotation angle in degrees
  const [shx, setShx] = useState(0); // Shear factor X

  // Calculations
  const rad = (rotation * Math.PI) / 180;
  const cosTh = Math.cos(rad);
  const sinTh = Math.sin(rad);

  // Construction of composite 3x3 homogeneous transformation matrix (R * S * Sh * T)
  // Let us approximate step matrix multiplications:
  // Since we scale, rotate, shear, and translate:
  // x_new = scale * (cosTh * x - sinTh * y) + shx * y + tx
  // y_new = scale * (sinTh * x + cosTh * y) + ty
  const m11 = scale * cosTh;
  const m12 = -scale * sinTh + shx;
  const m13 = tx;
  const m21 = scale * sinTh;
  const m22 = scale * cosTh;
  const m23 = ty;

  // Base coordinates of an "L" shaped metal bracket to transform (6 vertices)
  const baseVertices = [
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: 20, y: -10 },
    { x: -10, y: -10 },
    { x: -10, y: 30 },
    { x: -20, y: 30 }
  ];

  // Apply composite matrix transformation mapping to each point
  const transformedVertices = baseVertices.map((v) => {
    const xNew = m11 * v.x + m12 * v.y + m13;
    const yNew = m21 * v.x + m22 * v.y + m23;
    return { x: xNew, y: yNew };
  });

  // Scale coordinates to fit nicely inside the 200x200 SVG box
  const getPointsPath = (vertices: { x: number; y: number }[]) => {
    // Offset center of SVG (100, 100)
    return vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${100 + v.x} ${100 - v.y}`).join(' ') + ' Z';
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-IND-03"
        title="Matrices et Transformations Géométriques en CAO"
        subtitle="Modélisation matricielle de l'espace, coordonnées homogènes 4x4, projections tridimensionnelles et cinématique de robots d'usinage."
        duration="1h 20"
        level="BUT 2ème année (GMP / GIM)"
        prerequisites={[
          "Algèbre linéaire (produit matriciel, inverse de matrice)",
          "Trigonométrie circulaire classique (cosinus, sinus)"
        ]}
        objectives={[
          "Comprendre la nécessité d'utiliser les coordonnées homogènes en CAO et infographie.",
          "Modéliser et exprimer sous forme de matrices 3x3 et 4x4 les transformations de base (translation, homothétie, rotation, cisaillement).",
          "Maîtriser le produit géométrique d'isométries complexes successives par simple produit de matrices.",
          "Calculer la matrice inverse pour restituer l'état géométrique initial d'un modèle d'usinage."
        ]}
      />

      <Section title="📐 Le Problème de la Translation dans ℝ³" icon="📐" color="indigo">
        <p className="mb-4">
          En Conception Assistée par Ordinateur (CAO, logiciel comme Catia, SolidWorks) ou en robotique d'assemblage pneumatique, repositionner une pièce implique d'enchaîner des rotations et des translations de solides.
        </p>

        <InfoBlock type="definition" title="Le Conflit Algébrique">
          En espace vectoriel classique de dimension 3, les transformations linéaires (rotation, homothétie) s'expriment nativement par une multiplication matricielle par un vecteur de position <MathComponent math="\mathbf{v}" /> :
          <div className="my-2 p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-center font-mono">
            {"$\\mathbf{v}_{rotation} = \\mathbf{R} \\cdot \\mathbf{v}$"}
          </div>
          Cependant, la <strong>translation</strong> est une transformation affine. Elle requiert une <strong>addition vectorielle</strong> :
          <div className="my-2 p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-center font-mono">
            {"$\\mathbf{v}_{translation} = \\mathbf{v} + \\mathbf{t}$"}
          </div>
          Cette asymétrie algébrique rend le cumul d'isométries extrêmement complexe : il est impossible d'unifier une suite d'ajustements sous la forme d'une seule matrice équivalente !
        </InfoBlock>

        <TipBanner type="info" title="La Solution : Les Coordonnées Homogènes">
          Pour résoudre cette disparité, on "plonge" l'espace réel de dimension <MathComponent math="n" /> dans un espace projectif artificiel de dimension <MathComponent math="n+1" />.
          Un point <MathComponent math="(P_x, P_y, P_z)" /> de <MathComponent math="\mathbb{R}^3" /> est alors associé au vecteur homogène à 4 dimensions <MathComponent math="(wP_x, wP_y, wP_z, w)^T" /> (souvent normé avec <MathComponent math="w=1" />) :
          <FormulaBox title="Point homogène équivalent" math="\mathbf{P}_{homogene} = \begin{pmatrix} P_x \\ P_y \\ P_z \\ 1 \end{pmatrix}" />
        </TipBanner>
      </Section>

      <Section title="⚙️ Formulation des Matrices 4x4 Homogènes" icon="🛠️" color="emerald">
        <p className="mb-4">
          Grâce au passage aux coordonnées homogènes, la translation devient une simple <strong>multiplication linéaire</strong>, exprimable par une matrice 4x4 standard :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              1. Matrice de Translation pure
            </h4>
            <p className="text-xs text-muted-text mb-4">
              Représente un déplacement linéaire de vecteur de translation <MathComponent math="(T_x, T_y, T_z)^T" /> :
            </p>
            <FormulaBox title="" math="\mathbf{T} = \begin{pmatrix} 1 & 0 & 0 & T_x \\ 0 & 1 & 0 & T_y \\ 0 & 0 & 1 & T_z \\ 0 & 0 & 0 & 1 \end{pmatrix}" />
          </div>

          <div className="border border-border p-5 rounded-2xl bg-card">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
              2. Matrice de Rotation pure autour de l'axe Z
            </h4>
            <p className="text-xs text-muted-text mb-4">
              Représente un pivotement d'angle trigonométrique <MathComponent math="\theta" /> dans le plan XOY :
            </p>
            <FormulaBox title="" math="\mathbf{R}_z = \begin{pmatrix} \cos\theta & -\sin\theta & 0 & 0 \\ \sin\theta & \cos\theta & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}" />
          </div>
        </div>

        <InfoBlock type="warning" title="La Non-Commutativité">
          Le produit matriciel n'est <strong>pas commutatif</strong> ! En robotique et en CAO, cela implique que l'enchaînement des transformations dépend strictement de l'ordre d'application. Faire tourner une pièce puis la translater (<MathComponent math="\mathbf{T} \cdot \mathbf{R}" />) produit un résultat final géométriquement différent de la translater puis la faire tourner (<MathComponent math="\mathbf{R} \cdot \mathbf{T}" />).
        </InfoBlock>
      </Section>

      <Section title="🎮 Simulateur Interactif de Matrice CAO" icon="🎮" color="purple">
        <p className="mb-6">
          Ajustez les paramètres géométriques ci-dessous à l'aide des curseurs. Observez l'évolution dynamique de la <strong>matrice de transformation homogène équivalente M (3x3 pour le cas d'étude plan 2D)</strong> et le déplacement de la pièce d'usinage sur la grille CAO.
        </p>

        {/* Dynamic Matrix CAO Sandbox UI */}
        <div className="bg-muted/50 dark:bg-slate-900 border border-border rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Column */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
              ⚙️ Ajustement CAO
            </h4>

            {/* Translation X */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Translation X (<MathComponent math="T_x" />) :</span>
                <span className="font-mono text-indigo-600">{tx.toFixed(0)} px</span>
              </label>
              <input 
                aria-label="Translation X"
                type="range" min="-40" max="40" step="5" 
                value={tx} onChange={(e) => setTx(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Translation Y */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Translation Y (<MathComponent math="T_y" />) :</span>
                <span className="font-mono text-indigo-600">{ty.toFixed(0)} px</span>
              </label>
              <input 
                aria-label="Translation Y"
                type="range" min="-40" max="40" step="5" 
                value={ty} onChange={(e) => setTy(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Scale */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Homothétie (S) :</span>
                <span className="font-mono text-indigo-600">x{scale.toFixed(2)}</span>
              </label>
              <input 
                aria-label="Échelle"
                type="range" min="0.5" max="1.8" step="0.1" 
                value={scale} onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Rotation */}
            <div>
              <label className="text-sm font-semibold flex justify-between">
                <span>Rotation (θ) :</span>
                <span className="font-mono text-indigo-600">{rotation.toFixed(0)}°</span>
              </label>
              <input 
                aria-label="Rotation"
                type="range" min="-180" max="180" stroke-width="1.5"
                value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mt-2" 
              />
            </div>

            {/* Shear X */}
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50">
              <label className="text-sm font-bold text-amber-900 dark:text-amber-100 flex justify-between">
                <span>⚡ Cisaillement X (<MathComponent math="Sh" />) :</span>
                <span className="font-mono">{shx.toFixed(2)}</span>
              </label>
              <input 
                aria-label="Cisaillement"
                type="range" min="-1.0" max="1.0" step="0.1" 
                value={shx} onChange={(e) => setShx(parseFloat(e.target.value))}
                className="w-full accent-amber-500 mt-2" 
              />
            </div>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Graphic Plotter */}
              <div className="bg-card border p-4 rounded-2xl shadow-inner text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-2">👁️ Vue de Face 2D de la Pièce</span>
                <div className="flex justify-center">
                  <svg viewBox="0 0 200 200" className="w-full max-w-[170px] h-auto overflow-visible unique-svg-cad">
                    <defs>
                      <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    {/* Background Grid */}
                    <rect x="0" y="0" width="200" height="200" fill="url(#gridPattern)" />
                    {/* XY Axis */}
                    <line x1="100" y1="0" x2="100" y2="200" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Original Base bracket drawing in dashed gray */}
                    <path d={getPointsPath(baseVertices)} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Transformed shape inside SVG */}
                    <path d={getPointsPath(transformedVertices)} fill="#6366f1" fillOpacity="0.12" stroke="#4f46e5" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* Transformation Matrix Panel */}
              <div className="bg-card p-5 border rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block mb-3">🧮 Matrice Homogène Plan (3x3) :</span>
                  <div className="font-mono text-xs text-indigo-900 bg-slate-50 dark:bg-slate-900 border p-4 rounded-xl space-y-2 text-center select-all">
                    <div>M = </div>
                    <div className="grid grid-cols-3 gap-1 border-t border-b py-2 max-w-[180px] mx-auto">
                      <span className="font-bold">{m11.toFixed(2)}</span>
                      <span className="font-bold">{m12.toFixed(2)}</span>
                      <span className="text-rose-600">{m13.toFixed(0)}</span>
                      
                      <span className="font-bold">{m21.toFixed(2)}</span>
                      <span className="font-bold">{m22.toFixed(2)}</span>
                      <span className="text-rose-600">{m23.toFixed(0)}</span>
                      
                      <span>0.00</span>
                      <span>0.00</span>
                      <span className="font-bold text-emerald-600">1</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  ✓ Remarquez l'inclusion des pivots de translation en dernière colonne, et la constante homogène <span className="font-bold text-emerald-600">1</span> en bas à droite !
                </div>
              </div>

            </div>
          </div>
        </div>
      </Section>

      <Section title="⚙️ Composition Algébrique et Cinématique Inverse" icon="⚙️" color="amber">
        <p className="mb-4">
          La force inouïe des coordonnées homogènes est son aptitude à condenser une infinité d'actions dans une expression unique.
        </p>

        <InfoBlock type="reminder" title="Composition des Transformations : L'Ordre de Multiplication">
          Soit un point initial <MathComponent math="\mathbf{P}" />. On effectue d'abord une mise à l'échelle <MathComponent math="\mathbf{S}" />, puis une rotation <MathComponent math="\mathbf{R}" />, et enfin une translation <MathComponent math="\mathbf{T}" />.
          Le point transformé s'exprime par :
          <div className="p-3 my-2 text-center bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono">
            {"$\\mathbf{P}' = \\mathbf{T} \\cdot \\mathbf{R} \\cdot \\mathbf{S} \\cdot \\mathbf{P}$"}
          </div>
          La matrice équivalente globale vaut : <MathComponent math="\mathbf{M} = \mathbf{T} \cdot \mathbf{R} \cdot \mathbf{S}" />. Les matrices s'empilent de la droite vers la gauche !
        </InfoBlock>

        <TipBanner type="success" title="Inverser les transformations pour un retour au brut">
          Pour ramener une pièce sculptée en CAO à ses coordonnées brutes, ou inverser le mouvement d'un moteur de fraisage, on applique l'inverse algébrique <MathComponent math="\mathbf{M}^{-1}" /> de la matrice globale :
          <div className="p-3 my-2 text-center bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono">
            {"$\\mathbf{M}^{-1} = (\\mathbf{T} \cdot \mathbf{R})^{-1} = \mathbf{R}^{-1} \cdot \mathbf{T}^{-1}$"}
          </div>
        </TipBanner>
      </Section>

      <Section title="⚔️ Exercice Géométrique Résolu" icon="🎓" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Calcul de rotation décentrée en robotique d'usinage"
          question={
            <div>
              <p>
                Un robot de fraisage 2D effectue une découpe circulaire. 
                Il doit faire tourner un outil centré à l'origine d'un angle <MathComponent math="\theta = 90^\circ" />, mais autour d'un pivot d'ancrage décentré <MathComponent math="\mathbf{C}(10 \, ; \, 20)" />.
              </p>
              <p className="font-bold mt-2">1. Décomposer l'action décentrée sous forme de produit homogène et calculer la matrice globale M correspondant à ce pivot.</p>
            </div>
          }
          steps={[
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 1 : Théorie géométrique de rotation décentrée</p>
              <p className="my-2">
                Faire pivoter un point autour d'un centre décentré <MathComponent math="\mathbf{C}" /> est impossible directement. On doit :
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li>Translater le repère géométrique pour amener temporairement le centre C sur l'origine : <MathComponent math="\mathbf{T}^{-1}" /> de vecteur <MathComponent math="(-10, -20)" />.</li>
                <li>Appliquer la rotation pure de <MathComponent math="90^\circ" /> : <MathComponent math="\mathbf{R}(90)" />.</li>
                <li>Restaurer le repère géométrique à son emplacement d'origine : <MathComponent math="\mathbf{T}" /> de vecteur <MathComponent math="(10, 20)" />.</li>
              </ol>
              <p className="font-mono text-center text-sm my-2 text-indigo-600 bg-slate-50 dark:bg-slate-900 border py-2 rounded-xl">
                {"$\\mathbf{M} = \\mathbf{T}(10, 20) \\cdot \\mathbf{R}(90^\\circ) \\cdot \\mathbf{T}(-10, -20)$"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 2 : Construction numérique des matrices individuelles</p>
              <p className="my-2">
                Pour un angle de <MathComponent math="90^\circ" />, on a <MathComponent math="\cos(90^\circ)=0" /> et <MathComponent math="\sin(90^\circ)=1" />.
              </p>
              <p className="font-mono text-xs bg-slate-50 dark:bg-slate-900 border p-3 rounded-xl max-w-sm mx-auto">
                {"R(90^\\circ) = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix} \\quad ; \\quad T(-10, -20) = \\begin{pmatrix} 1 & 0 & -10 \\\\ 0 & 1 & -20 \\\\ 0 & 0 & 1 \\end{pmatrix}"}
              </p>
            </div>,
            <div>
              <p className="font-bold text-indigo-950 dark:text-indigo-100">Étape 3 : Calcul final du produit matriciel</p>
              <p className="my-2">
                Multiplions d'abord <MathComponent math="\mathbf{R}(90^\circ) \cdot \mathbf{T}(-10, -20)" /> :
              </p>
              <p className="font-mono text-xs bg-slate-50 dark:bg-slate-900 border p-3 rounded-xl max-w-sm mx-auto my-2">
                {"\\mathbf{R} \\cdot \\mathbf{T}_{neg} = \\begin{pmatrix} 0 & -1 & 20 \\\\ 1 & 0 & -10 \\\\ 0 & 0 & 1 \\end{pmatrix}"}
              </p>
              <p className="my-2">
                En appliquant enfin la translation finale <MathComponent math="\mathbf{T}(10, 20) \cdot (\mathbf{R} \cdot \mathbf{T}_{neg})" /> :
              </p>
              <p className="font-mono text-xs bg-indigo-50/50 dark:bg-slate-900 text-indigo-900 dark:text-indigo-100 border p-3 rounded-xl max-w-sm mx-auto my-2">
                {"M = \\begin{pmatrix} 0 & -1 & 30 \\\\ 1 & 0 & 10 \\\\ 0 & 0 & 1 \\end{pmatrix}"}
              </p>
              <p className="mt-4 font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-200">
                ✓ Conclusion : Tout point d'usinage initial P(x, y) de la pièce subit la translation décentrée finale : x' = -y + 30 et y' = x + 10. La cinématique est résolue !
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de géométrie CAO" icon="🧠" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Pourquoi l'élément w de la ligne inférieure de matrice homogène doit-il impérativement valoir 1 ?</>}
            back={<>{"L'élément constant $w=1$ garantit mathématiquement que la translation (colonne de droite) s'injecte par addition simple $X' = x \\cdot M_{11} + T_x \\cdot 1$, sans déformation d'échelle."}</>}
          />
          <Flashcard 
            front={<>Quelle est la forme de l'homothétie homogène 3D de facteurs d'échelle Sx et Sy ?</>}
            back={<>{"C'est la forme diagonale pure $\\begin{pmatrix} S_x & 0 & 0 \\\\ 0 & S_y & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$."}</>}
          />
        </div>
      </Section>

      <Section title="📜 Foire Aux Questions d'Ingénieurs (FAQ)" icon="🎓" color="indigo">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est l'intérêt d'utiliser des matrices 4x4 homogènes pour la 3D ?",
              answer: "En espace tridimensionnel, un point projectif exige 4 coordonnées (X, Y, Z, 1). La matrice 4x4 englobe un sous-bloc 3x3 haut-gauche dédié aux rotations pures, homothéties et cisaillement, une colonne 3x1 de translation droite (Tx, Ty, Tz) et une ligne projectrice (0, 0, 0, 1) indispensable au lissage linéaire."
            },
            {
              question: "Comment effectue-t-on une projection orthogonale 3D sur un moniteur plat par matrice ?",
              answer: "On multiplie de façon équivalente les vecteurs de coordonnées homogènes des sommets 3D de l'assemblage par une matrice de projection orthogonale dédiée où le coefficient Z s'écrase sur 0, reproduisant une découpe plane géométrique de face ou de profil."
            },
            {
              question: "Pourquoi les cartes graphiques (GPU) sont-elles optimisées intrinsèquement pour ce formalisme ?",
              answer: "Les GPU modernes disposent d'unités de calcul de flux vectoriels conçues pour exécuter de façon massivement parallèle des multiplications de matrices 4x4. Les pipelines de rendus de CAO et d'animations exploitent cette architecture au niveau du processeur graphique."
            }
          ]}
        />
      </Section>

      <Section title="📝 Évaluation des Transformations" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la matrice de cisaillement homogène 2D planaire pure de facteur Shx = 0.5 ?",
              options: [
                "[[1, 0.5, 0], [0, 1, 0], [0, 0, 1]]",
                "[[1, 0, 0.5], [0, 1, 0], [0, 0, 1]]",
                "[[0.5, 1, 0], [0, 1, 0], [0, 0, 1]]",
                "[[1, 0, 0], [0.5, 1, 0], [0, 0, 1]]"
              ],
              correctAnswer: 0,
              explanation: "Un cisaillement homogène du repère planaire X sous influence de l'axe Y s'exprime par le coefficient Shx injecté à la première ligne, deuxième colonne."
            },
            {
              question: "Comment s'exprime la matrice inverse de translation Homogène de déplacement (50, -120, 10) ?",
              options: [
                "Une translation pure de direction (-50, 120, -10)",
                "Une rotation pure d'angle 180°",
                "Une translation pure de direction (-1/50, 1/120, -1/10)",
                "Un cisaillement d'axe inverse"
              ],
              correctAnswer: 0,
              explanation: "Inverser une translation géométrique revient rigoureusement à effectuer une translation de sens vectoriel réciproque, donc d'en inverser tous les signes : (-50, 120, -10)."
            },
            {
              question: "Que se produit-il géométriquement si l'on effectue le produit de mise à l'échelle diagonale pure homogène avec k = -1 ?",
              options: [
                "Un agrandissement double",
                "Un plantage division par zéro",
                "Une symétrie centrale (miroir complet) par rapport à l'origine",
                "Un cisaillement vertical"
              ],
              correctAnswer: 2,
              explanation: "Faire passer l'échelle diagonale homothetique à un ratio de -1 inverse le sens directionnel de tous les vecteurs géométriques, opérant une inversion ou symétrie axiale centrale projective de centre (0,0)."
            }
          ]}
        />
      </Section>

      <InteractiveChecklist 
        items={[
          "Je sais formaliser un point géométrique sous sa représentation homogène à w = 1.",
          "Je comprends la construction analytique des matrices homogènes 3x3 et 4x4 d'isométries.",
          "Je maîtrise le calcul séquentiel d'empilement complexe de transformations et l'inverse cinématique."
        ]}
      />
    </div>
  );
};

export default Course_BUT_Industriel_03_Transformations_CAD;
