import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Premiere_06_Produit_Scalaire: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [ux, setUx] = useState<number>(3);
  const [uy, setUy] = useState<number>(0);
  const [vx, setVx] = useState<number>(1);
  const [vy, setVy] = useState<number>(2);

  const scalaire = (ux * vx) + (uy * vy);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-SCA"
        title="Produit Scalaire"
        subtitle="L'outil géométrique ultime pour détecter l'orthogonalité."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Un Choc de Vecteurs" icon="💥" color="emerald">
        <p>
          Si je te donne deux vecteurs (deux flèches), comment mesurer s'ils pointent "dans le même sens", "dans des sens opposés", ou s'ils sont "perpendiculaires" ?
        </p>
        <p className="mt-2">
          Le <strong>Produit Scalaire</strong> (noté <span className="font-mono font-bold">\\vecu \\cdot \\vecv</span>) est la réponse à cette question. C'est une opération magique qui prend deux vecteurs en entrée, et recrache <strong>un simple nombre</strong> (un scalaire).
        </p>
        
        <InfoBlock type="definition" title="À quoi sert ce nombre ?">
          - Si nombre <strong>&gt; 0</strong> : Les vecteurs vont globalement dans la même direction (angle aigu).<br/>
          - Si nombre <strong>&lt; 0</strong> : Ils s'affrontent (angle obtus).<br/>
          - Si nombre <strong>= 0</strong> : Ils sont parfaitement perpendiculaires (orthogonaux) !
        </InfoBlock>
      </Section>

      <Section title="📏 Les Deux Formules" icon="⚖️" color="rose">
        <p className="mb-4">Il y a deux manières de calculer ce produit scalaire. Le secret, c'est de pouvoir basculer de l'une à l'autre selon ce qu'on te donne dans l'énoncé.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Formule Géométrique (Avec Cosinus)" 
            math={"\\vec{u} \\cdot \\vec{v} = ||\\vec{u}|| \\times ||\\vec{v}|| \\times \\cos(\\vec{u}, \\vec{v})"} 
          />
          <FormulaBox 
            title="Formule Analytique (Avec Coordonnées)" 
            math={"\\vec{u} \\cdot \\vec{v} = x_u x_v + y_u y_v"} 
          />
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 bg-muted p-2 rounded">
          Le double trait <span className="font-mono">||u||</span> signifie la "loooongueur" (la norme) du vecteur.
        </p>
      </Section>

      <Section title="⚙️ Calculateur Analytique" icon="💻" color="indigo">
        <p className="mb-4">Voyons la formule analytique en action ! Change les coordonnées des vecteurs u(X, Y) et v(X, Y).</p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="bg-card p-4 rounded-xl border border-border">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Vecteur u</h4>
              <div className="flex flex-col gap-2">
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">x = {ux}</span>
                  <input type="range" min="-5" max="5" value={ux} onChange={(e) => setUx(parseInt(e.target.value))} className="w-32 accent-indigo-500" />
                </label>
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">y = {uy}</span>
                  <input type="range" min="-5" max="5" value={uy} onChange={(e) => setUy(parseInt(e.target.value))} className="w-32 accent-indigo-500" />
                </label>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-xl border border-border">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Vecteur v</h4>
              <div className="flex flex-col gap-2">
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">x' = {vx}</span>
                  <input type="range" min="-5" max="5" value={vx} onChange={(e) => setVx(parseInt(e.target.value))} className="w-32 accent-emerald-500" />
                </label>
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">y' = {vy}</span>
                  <input type="range" min="-5" max="5" value={vy} onChange={(e) => setVy(parseInt(e.target.value))} className="w-32 accent-emerald-500" />
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card rounded-xl border border-slate-300">
            <p className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-2">Résultat du Produit Scalaire</p>
            <p className="font-mono text-xl mb-4 text-slate-900 dark:text-slate-100">
              u · v = ({ux} × {vx}) + ({uy} × {vy}) = <strong className={`text-2xl ${scalaire === 0 ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{scalaire}</strong>
            </p>
            {scalaire === 0 && (
              <div className="bg-rose-100 text-rose-900 dark:text-rose-100 p-2 rounded-lg font-bold mt-2 animate-pulse">
                MAGIE ! Le produit scalaire est ZERO. Ces vecteurs forment un OUI à l'Orthogonalité (90°) !
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver la coordonnée manquante"
          question={<p>On donne les vecteurs <><MathComponent math={"\\vec{u}\\begin{pmatrix} x \\\\ 3 \\end{pmatrix}"} /></> et <><MathComponent math={"\\vec{v}\\begin{pmatrix} 2 \\\\ -4 \\end{pmatrix}"} /></>. Trouver la valeur de <><MathComponent math={"x"} /></> pour que les vecteurs soient orthogonaux.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Poser l'équation</p>
              <p>Pour être orthogonaux, il faut que <><MathComponent math={"\\vec{u} \\cdot \\vec{v} = 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer la formule analytique</p>
              <p><><MathComponent math={"\\vec{u} \\cdot \\vec{v} = x_u x_v + y_u y_v = (x \\times 2) + (3 \\times -4) = 2x - 12"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On résout <><MathComponent math={"2x - 12 = 0"} /></> ce qui donne <><MathComponent math={"2x = 12"} /></> puis <><MathComponent math={"x = 6"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Calcul d'angle"
          question={<p>On donne <><MathComponent math={"||\\vec{u}|| = 2"} /></>, <><MathComponent math={"||\\vec{v}|| = 3"} /></> et on calcule que <><MathComponent math={"\\vec{u} \\cdot \\vec{v} = 3"} /></>. Combien mesure l'angle entre les deux vecteurs (en cosinus) ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : La formule magique</p>
              <p>On utilise la définition géométrique : <><MathComponent math={"\\vec{u} \\cdot \\vec{v} = ||\\vec{u}|| \\times ||\\vec{v}|| \\times \\cos(\\alpha)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Remplacer par les valeurs</p>
              <p><><MathComponent math={"3 = 2 \\times 3 \\times \\cos(\\alpha)"} /></>, ce qui donne <><MathComponent math={"3 = 6 \\times \\cos(\\alpha)"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"\\cos(\\alpha) = 3 / 6 = 1/2"} /></>. (Et l'angle dont le cosinus vaut 1/2 est <><MathComponent math={"60^{\\circ}"} /></> ou <><MathComponent math={"\\pi/3"} /></>).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Le Projection Orthogonale" icon="🔦" color="purple">
        <p className="mb-4">Il y a une 3ème façon de le calculer, sans cosinus et sans coordonnées, avec les <strong>projections</strong> (comme l'ombre avec le soleil à midi pile).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si je projette le vecteur v sur la droite du vecteur u (ce qui crée un point H), que vaut u · v ?</>}
            back={<><strong>u · v = u · (uH)</strong><br/><span className="text-sm">Si H est dans le même sens que u, c'est + ||u|| × ||uH||. Sinon c'est - ||u|| × ||uH||.</span></>}
          />
          <Flashcard 
            front={<>Le "carré scalaire" : Que se passe-t-il si je fais <strong>u · u</strong> (u fois lui-même) ?</>}
            back={<>Puisque l'angle entre u et lui-même est 0, et cos(0)=1, ça devient juste <strong>||u||²</strong> (sa longueur au carré) !</>}
          />
        </div>
      </Section>

      <Section title="🎮 Test de la Menace Perpendiculaire" icon="🕹️" color="slate">
        <p className="mb-4">A toi de jouer l'inspecteur :</p>
        <FillInTheBlanks 
          id="scalaire-eval"
          content={[
            "On me donne U(2, 3) et V(-3, 2). Je calcule U·V = (2 × -3) + (3 × 2) = -6 + 6 = ",
            { options: ["12", "0", "-12"], correctAnswer: 1 },
            ". Le produit est nul ! Cela prouve que les vecteurs sont ",
            { options: ["colinéaires", "parallèles", "orthogonaux"], correctAnswer: 2 },
            ". Si dans un autre exercice, on me dit que U·W est strictement négatif, cela signifie que l'angle entre U et W est ",
            { options: ["droit", "obtus", "aigu"], correctAnswer: 1 },
            " (le cosinus d'un angle obtus est négatif)."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle the formule analytique du produit scalaire dans le plan ?",
              options: [
                "x_1/x_2 + y_1/y_2",
                "x_1 × y_2 - x_2 × y_1",
                "x_1 × x_2 + y_1 × y_2"
              ],
              correctAnswer: 2,
              explanation: "C'est bien (x × x') + (y × y'). (Attention, le choix 2 avec le '-' c'est le déterminant, utile pour la colinéarité, pas pour l'orthogonalité !)"
            },
            {
              question: "Si le cosinus de l'angle entre les vecteurs u et v vaut 1, que peut-on dire de u et v ?",
              options: [
                "Ils sont perpendiculaires.",
                "Ils sont parfaitement alignés et de mème sens.",
                "Leur longueur est identique."
              ],
              correctAnswer: 1,
              explanation: "Si cos(angle) = 1, alors l'angle vaut 0°. Les vecteurs sont donc colinéaires et de même sens !"
            },
            {
              question: "À quoi sert principalement le produit scalaire au lycée ?",
              options: [
                "À calculer l'aire d'un triangle.",
                "À prouver que des droites sont perpendiculaires ou qu'un triangle est rectangle.",
                "À trouver le coefficient directeur d'une droite."
              ],
              correctAnswer: 1,
              explanation: "C'est l'arme absolue pour prouver des angles droits dans l'espace ou le plan (Orthogonalité <=> Produit Scalaire Nul)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la formule analytique xx' + yy' par cœur.",
            "Je connais le lien avec le cosinus : ||u|| × ||v|| × cos(angle).",
            "J'ai gravé 'Produit scalaire nul = Orthogonal !'.",
            "Je sais que u·u c'est la norme (la longueur) de u au carré."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
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

export default Course_Premiere_06_Produit_Scalaire;
