import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_02_Geometrie_Espace: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [ux, setUx] = useState<number>(2);
  const [uy, setUy] = useState<number>(-1);
  const [uz, setUz] = useState<number>(3);
  
  const [vx, setVx] = useState<number>(4);
  const [vy, setVy] = useState<number>(5);
  const [vz, setVz] = useState<number>(-1);

  const scalaire = ux*vx + uy*vy + uz*vz;
  const isOrtho = scalaire === 0;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-ESP"
        title="Géométrie dans l'Espace"
        subtitle="Sortir du plan (x,y) pour conquérir la 3ème dimension (x,y,z) avec des plans, des droites et des vecteurs normaux."
        duration="60 min"
      />

      <Section title="⚠️ Introduction : La 3ème Dimension" icon="🧊" color="emerald">
        <p>
          En 2D, il est facile de s'orienter avec 'gauche/droite' (l'abscisse x) et 'haut/bas' (l'ordonnée y). Mais le monde réel est en 3D ! Pour attraper un objet volant, tu as besoin d'une coordonnée supplémentaire : la <strong>cote z</strong> (la profondeur/altitude).
        </p>
        <p className="mt-2">
          Tout ce que tu savais faire en 2D (Chasles, le milieu, les coordonnées d'un vecteur) marche EXACTEMENT pareil en 3D, on ajoute juste une 3ème ligne aux calculs.
        </p>
        
        <InfoBlock type="definition" title="Le Repère (O; i, j, k)">
          Dans l'espace, un point M a des coordonnées <strong>(x; y; z)</strong>.<br/>
          Un vecteur <MathComponent math={"\\vec{u}"} /> est composé de trois mouvements : <strong>(x, y, z)</strong>.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Orthogonalité (La magie de l'angle droit)" icon="📐" color="indigo">
        <p className="mb-4">
          Dans l'espace on ne parle plus d'objets 'perpendiculaires', mais d'objets <strong>orthogonaux</strong> (qui se croisent à angle droit, même s'ils ne se touchent pas directement !). Et pour tester l'orthogonalité, l'arme absolue c'est le <strong>Produit Scalaire</strong>.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl text-center mb-6">
          <p className="font-mono text-xl font-bold text-indigo-900 dark:text-indigo-100">
            <MathComponent block math={"\\vec{u} \\cdot \\vec{v} = x \\times x' + y \\times y' + z \\times z'"} />
          </p>
          <p className="text-sm mt-2 text-indigo-700 dark:text-indigo-300">On multiplie les étages entre eux, et on additionne tout.</p>
        </div>

        <Accordion title="Pourquoi c'est si utile ?">
          <div className="p-4 bg-card border border-border rounded-xl">
            <p className="font-bold text-emerald-700 dark:text-emerald-300">Deux vecteurs sont orthogonaux SI ET SEULEMENT SI leur Produit Scalaire vaut ZÉRO !</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🛠️ Le Testeur d'Orthogonalité" icon="⏱️" color="amber">
        <p className="mb-4">
          Modifie les coordonnées des vecteurs u et v. Arriveras-tu à trouver une combinaison secrète pour les rendre orthogonaux (Produit Scalaire = 0) ?
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
             <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
               <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Vecteur <MathComponent math={"\\vec{u}"} /></h4>
               <label className="flex items-center justify-between"><span className="font-mono">x: {ux}</span> <input type="range" min="-5" max="5" value={ux} onChange={(e)=>setUx(parseInt(e.target.value))} className="accent-indigo-500 w-32"/></label>
               <label className="flex items-center justify-between"><span className="font-mono">y: {uy}</span> <input type="range" min="-5" max="5" value={uy} onChange={(e)=>setUy(parseInt(e.target.value))} className="accent-indigo-500 w-32"/></label>
               <label className="flex items-center justify-between"><span className="font-mono">z: {uz}</span> <input type="range" min="-5" max="5" value={uz} onChange={(e)=>setUz(parseInt(e.target.value))} className="accent-indigo-500 w-32"/></label>
             </div>
             
             <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
               <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Vecteur <MathComponent math={"\\vec{v}"} /></h4>
               <label className="flex items-center justify-between"><span className="font-mono">x': {vx}</span> <input type="range" min="-5" max="5" value={vx} onChange={(e)=>setVx(parseInt(e.target.value))} className="accent-rose-500 w-32"/></label>
               <label className="flex items-center justify-between"><span className="font-mono">y': {vy}</span> <input type="range" min="-5" max="5" value={vy} onChange={(e)=>setVy(parseInt(e.target.value))} className="accent-rose-500 w-32"/></label>
               <label className="flex items-center justify-between"><span className="font-mono">z': {vz}</span> <input type="range" min="-5" max="5" value={vz} onChange={(e)=>setVz(parseInt(e.target.value))} className="accent-rose-500 w-32"/></label>
             </div>
          </div>

          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${isOrtho ? 'bg-emerald-100 border-emerald-400' : 'bg-slate-100 border-slate-300'}`}>
            <h4 className={`font-bold uppercase tracking-wider text-sm mb-2 ${isOrtho ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-700 dark:text-slate-300'}`}>
              Résultat : <MathComponent math={"\\vec{u}"} /> · <MathComponent math={"\\vec{v}"} />
            </h4>
            <div className="font-mono text-lg mb-2 text-slate-900 dark:text-slate-100">
              ({ux}×{vx}) + ({uy}×{vy}) + ({uz}×{vz}) = {ux*vx} + {uy*vy} + {uz*vz}
            </div>
            <p className={`font-mono text-3xl font-bold ${isOrtho ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'} mb-2`}>
              {scalaire}
            </p>
            {isOrtho ? (
              <p className="text-emerald-700 dark:text-emerald-300 font-bold animate-pulse text-lg">✨ Les vecteurs sont ORTHOGONAUX ! ✨</p>
            ) : (
              <p className="text-slate-600 dark:text-slate-400 text-sm">Ce n'est pas zéro. Ils se croisent de travers.</p>
            )}
          </div>
        </div>
      </Section>

      <Section title="📜 La Modélisation des Objets" icon="🚀" color="rose">
        <p className="mb-4">Dans l'espace infini, on n'a plus de droite d'équation 'y = mx + p'. Tout devient plus tactique.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="La Droite (Représentation Paramétrique)" 
            formula={<>
              Une droite nécessite UN point d'accroche (A) et UN vecteur directeur (<MathComponent math={"\\vec{u}"} />). Elle est régie par un paramètre temps "t".<br/>
              <div className="flex justify-center w-full mt-4">
                <span className="font-mono block text-sm bg-rose-50/50 dark:bg-rose-900/20 p-4 rounded text-left">
                  {"$x = x_A + t \\times x_u$"}<br/>
                  {"$y = y_A + t \\times y_u$"}<br/>
                  {"$z = z_A + t \\times z_u$"}
                </span>
              </div>
            </>} 
          />
          <FormulaBox 
            title="Le Plan (Équation Cartésienne)" 
            formula={<>
              Un plan est plat comme une table. Pour le caler, il suffit d'UN point (A) et d'UN <strong>Vecteur Normal <MathComponent math={"\\vec{n}(a, b, c)"} /></strong> (Un piquet planté parfaitement droit sur la table).<br/>
              <div className="flex justify-center w-full mt-4">
                <span className="font-mono block text-sm bg-rose-50/50 dark:bg-rose-900/20 p-4 rounded font-bold text-left">
                  {"$ax + by + cz + d = 0$"}
                </span>
              </div>
            </>} 
          />
        </div>
      </Section>

      <Section title="🧠 Le Vecteur Normal" icon="🔦" color="purple">
         <div className="grid grid-cols-1 gap-4">
          <Flashcard 
            front={<>Le Secret des Coefficients du Plan</>}
            back={<>Si on te donne le plan (P) d'équation : <strong>3x - 5y + 2z - 7 = 0</strong><br/>Tu peux extraire INSTANTANÉMENT son vecteur normal en lisant les chiffres collés aux lettres : <strong><MathComponent math={"\\vec{n}(3 ; -5 ; 2)"} /></strong>. C'est magique.</>}
          />
           <Flashcard 
            front={<>Comment prouver qu'une droite est orthogonale à un plan ?</>}
            back={<>C'est très simple ! Il suffit de vérifier si le vecteur directeur de la droite (<MathComponent math={"\\vec{u}"} />) est <strong>colinéaire</strong> au vecteur normal du plan (<MathComponent math={"\\vec{n}"} />). S'ils sont parfaitement parallèles, la droite transperce le plan à angle droit !</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Produit scalaire dans l'espace"
          question={<p>Soient <><MathComponent math={"\\vec{u}(1; -2; 3)"} /></> et <><MathComponent math={"\\vec{v}(4; 5; 2)"} /></>. Calcule <><MathComponent math={"\\vec{u} \\cdot \\vec{v}"} /></> et conclus sur leur orthogonalité.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : La formule magique</p>
              <p><><MathComponent math={"\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le calcul avec les coordonnées</p>
              <p><><MathComponent math={"1 \\times 4 + (-2) \\times 5 + 3 \\times 2 = 4 - 10 + 6"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"4 - 10 + 6 = 0"} /></>. Le produit scalaire vaut zéro, donc les vecteurs sont parfaitement orthogonaux !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Droite et Vecteur Directeur"
          question={<p>On a une droite (D) de représentation paramétrique : <><MathComponent math={"x = 3 - 2t"} /></>, <><MathComponent math={"y = -1 + t"} /></>, <><MathComponent math={"z = 4"} /></>. Quel est un vecteur directeur de (D) ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Ou lire les infos ?</p>
              <p>Dans la représentation paramétrique, le point de départ se lit SEUL, et le vecteur directeur multiplie la variable temps <><MathComponent math={"t"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Regarder le nombre devant chaque t</p>
              <p>Pour <><MathComponent math={"x"} /></>, c'est <><MathComponent math={"-2"} /></>. Pour <><MathComponent math={"y"} /></>, c'est <><MathComponent math={"1"} /></>. Pour <><MathComponent math={"z"} /></>, il n'y a pas de <><MathComponent math={"t"} /></>, donc c'est <><MathComponent math={"0"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Un vecteur directeur est <><MathComponent math={"\\vec{u}(-2 ; 1 ; 0)"} /></>. Ce vecteur glisse le long du plan (x,y) sans jamais monter ou descendre en z !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Modélisation" icon="🕹️" color="slate">
        <p className="mb-4">Déchiffre le code du plan et de la droite :</p>
        <FillInTheBlanks 
          id="esp-eval"
          content={[
            "On me donne un plan (P) : 2x + 4y - z + 6 = 0. Je sais immédiatement que le vecteur normal ⃗n(",
            { options: ["2; 4; 0", "2; 4; -1", "2x; 4y; -z"], correctAnswer: 1 },
            ") est un vecteur normal à ce plan. \nOn me donne aussi une droite (D) définie par le système : x=1+2t, y=-3+4t, z=5-t. \nJe lis la 'pente', c'est-à-dire les coefficients devant le 't'. Le vecteur directeur de (D) est donc ⃗u(",
            { options: ["1; -3; 5", "2; 4; -1", "2t; 4t; -t"], correctAnswer: 1 },
            "). \nJe remarque que ⃗u et ⃗n sont exactement égaux ! Cela signifie que la droite (D) est ",
            { options: ["strictement parallèle au plan (P)", "confondue avec le plan", "orthogonale au plan (P)"], correctAnswer: 2 },
            ", elle le transperce parfaitement droit !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'équation cartésienne du plan passant par l'origine O(0,0,0) et dont le vecteur normal est n(1, 1, 1) ?",
              options: [
                "x + y + z = 1",
                "x + y + z = 0",
                "1x + 1y + 1z + d"
              ],
              correctAnswer: 1,
              explanation: "Les coeff de xyz viennent de n : 1x+1y+1z+d=0. Comme le plan passe par (0,0,0), on remplace xyz par 0 : 0+0+0+d=0 donc d=0. L'équation finale est x+y+z=0."
            },
            {
              question: "Que donne le Produit Scalaire de u(2; 0; 0) et de j(0; 1; 0) ?",
              options: [
                "2",
                "0",
                "1"
              ],
              correctAnswer: 1,
              explanation: "(2×0) + (0×1) + (0×0) = 0. Logique ! Le vecteur u est porté par l'axe des X, et j est porté par l'axe des Y. X et Y sont orthogonaux !"
            },
            {
              question: "Comment calculer la distance entre A(1, 2, 3) et B(1, 2, 8) ?",
              options: [
                "√(0² + 0² + 5²) = 5",
                "8 - 3 = 5",
                "Les deux méthodes fonctionnent."
              ],
              correctAnswer: 2,
              explanation: "Puisque x et y ne changent pas, le point B est positionné verticalement 5 étages au-dessus de A. La distance est juste 5. La formule de la racine marche aussi bien sûr, mais c'est comme utiliser un bazooka pour tuer une mouche."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Coordonnées de l'Espace : (x, y, z) au lieu de (x, y).",
            "Produit Scalaire = 0  => Les vecteurs sont Orthogonaux.",
            "L'équation ax+by+cz+d=0 cache le vecteur normal n(a,b,c).",
            "Le système à 3 lignes (paramétrique) est le seul moyen de modéliser une droite."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+20 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Terminale_02_Geometrie_Espace;
