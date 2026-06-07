import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_Expertes_01_Complexes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [angleId, setAngleId] = useState<number>(0);
  
  const angles = [
    { label: "0", rad: "0", cos: "1", sin: "0", complex: "1" },
    { label: "π/2", rad: "π/2", cos: "0", sin: "1", complex: "i" },
    { label: "π", rad: "π", cos: "-1", sin: "0", complex: "-1" },
    { label: "-π/2", rad: "-π/2", cos: "0", sin: "-1", complex: "-i" }
  ];
  const a = angles[angleId];

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-TE-CPX"
        title="Complexes Approfondis"
        subtitle="Forme trigonométrique, géométrie dans le plan et exponentielle complexe."
        duration="55 min"
      />

      <Section title="⚠️ Introduction : R=θ" icon="🧭" color="emerald">
        <p>
          En maths de spé, tu as vu z = a + ib. C'est parfait pour additionner, mais horrible pour multiplier. Imagine multiplier (a+ib) par lui-même 10 fois...
        </p>
        <p className="mt-2">
          Le coup de génie, c'est de regarder les complexes non plus comme des point [x;y], mais comme un <strong>rayon</strong> (le module) et une <strong>direction</strong> (l'argument, l'angle). C'est la forme Trigonométrique.
        </p>
        
      </Section>

      <Section title="⚖️ La Forme d'Euler (e^iθ)" icon="📐" color="indigo">
        <p className="mb-4">
          C'est sans doute la plus belle trouvaille de l'histoire des mathématiques. La fonction cos(θ) + i×sin(θ) se comporte EXACTEMENT comme une multiplication d'exposants. Les mathématiciens ont donc décidé de l'appeler e^(iθ).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Forme Trigonométrique" 
            math={"z = r(\\cos(\\theta) + i\\sin(\\theta))"} 
          />
          <FormulaBox 
            title="Forme Exponentielle" 
            math={"z = r \\times e^{i\\theta}"} 
          />
        </div>
        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>Pourquoi c'est génial ?</strong> Car multiplier deux nombres complexes devient très simple : tu multiplies les rayons (les modules), et <strong>tu AJOUTES leurs angles !</strong> Ça transforme une multiplication monstrueuse en une petite addition de fractions de Pi.
        </div>
      </Section>

      <Section title="🛠️ La Boussole d'Euler" icon="🎡" color="amber">
        <p className="mb-4">
          Découvre par toi même comment fonctionnent les angles de Poudlard :
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {angles.map((ang, idx) => (
                <button 
                  key={idx}
                  onClick={() => setAngleId(idx)} 
                  className={`px-4 py-2 text-sm font-medium border ${angleId === idx ? 'bg-amber-500 text-white border-amber-600' : 'bg-card text-slate-700 dark:text-slate-300 hover:bg-muted'}`}
                >
                  θ = {ang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60 inline-block text-left relative overflow-hidden">
            <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 mb-2">Calcul de e^({a.label}i)</span>
            <div className="font-mono text-lg text-emerald-950 dark:text-emerald-50 mb-2">
              cos({a.label}) + i×sin({a.label})
            </div>
            <div className="font-mono text-lg text-emerald-950 dark:text-emerald-50 mb-2">
              = {a.cos} + i×({a.sin})
            </div>
            <div className="font-mono text-2xl text-emerald-950 dark:text-emerald-50 font-bold mt-2 pt-2 border-t border-emerald-300">
              Résultat = {a.complex}
            </div>
          </div>
          
          {angleId === 2 && (
            <p className="mt-4 text-emerald-700 dark:text-emerald-300 font-bold animate-pulse">Tu viens de retrouver l'identité d'Euler (e^(iπ) + 1 = 0), la plus belle équation du monde, car elle relie l'Exponentielle, i, Pi, Zéro et Un !</p>
          )}
        </div>
      </Section>

      <Section title="📜 La Formule de Moivre & Géométrie" icon="⚡" color="rose">
        <p className="mb-4">Tu peux maintenant élever au carré, au cube, ou à la puissance 100 super facilement.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Formule de Moivre" 
            math={"(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)"} 
          />
          <FormulaBox 
            title="Utilité en Géométrie" 
            math={"\\text{Angle }(\\vec{AB}, \\vec{AC}) = \\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right)"} 
          />
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le module de e^(iθ) vaut 1, peu importe θ.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Parce que e^(iθ) = 1 × e^(iθ). C'est un point qui se déplace sur le cercle trigonométrique de rayon 1. Son seul paramètre c'est sa direction.</span></>}
          />
          <Flashcard 
            front={<>C'est quoi un argument 'modulo 2π' ?</>}
            back={<><strong>Faire des tours complets !</strong><br/><span className="text-sm">Dire que l'angle est "π", c'est pareil que de dire "π + un tour complet (soit 3π)". Donc on note que les angles sont équivalents [2π].</span></>}
          />
        </div>
        <div className="mt-6">
          <TipBanner type="info" title="L'argument d'un produit">
            Se rappeler toujours : <><MathComponent math={"\\arg(z \\times z') = \\arg(z) + \\arg(z')"} /></>. Les angles s'ajoutent quand les complexes se multiplient. C'est l'essence même de l'exponentielle imaginaire !
          </TipBanner>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Passer de l'algébrique à l'exponentielle"
          question={<p>Donner la forme exponentielle de <><MathComponent math={"z = 1 - i\\sqrt{3}"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calculer le module r</p>
              <p><><MathComponent math={"r = \\sqrt{a^2 + b^2} = \\sqrt{1^2 + (-\\sqrt{3})^2} = \\sqrt{1 + 3} = \\sqrt{4} = 2"} /></>. Le rayon est de 2.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Chercher l'angle θ</p>
              <p>On factorise par 2 : <><MathComponent math={"z = 2 \\times (\\frac{1}{2} - i\\frac{\\sqrt{3}}{2})"} /></>. Quel angle donne un cosinus de <><MathComponent math={"1/2"} /></> et un sinus de <><MathComponent math={"-\\sqrt{3}/2"} /></> ? C'est <><MathComponent math={"-\\frac{\\pi}{3}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La forme exponentielle est <><MathComponent math={"z = 2 e^{-i\\frac{\\pi}{3}}"} /></> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Utiliser la puissance puissance formelle"
          question={<p>En utilisant la forme précédente, calculer <><MathComponent math={"z^6"} /></> (soit <><MathComponent math={"(1 - i\\sqrt{3})^6"} /></>).</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Remplacer par la forme exponentielle</p>
              <p>Calculer <><MathComponent math={"(a+ib)^6"} /></> c'est l'enfer avec le binôme de Newton. Mais avec Euler : on calcule <><MathComponent math={"(2 e^{-i\\frac{\\pi}{3}})^6"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Distribuer la puissance 6</p>
              <p>On élève le module à la puissance 6 : <><MathComponent math={"2^6 = 64"} /></>. Et on MULTIPLIE l'angle par 6 : <><MathComponent math={"6 \\times (-\\frac{\\pi}{3}) = -2\\pi"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"z^6 = 64 e^{-2i\\pi}"} /></>. Or un angle de <><MathComponent math={"-2\\pi"} /></>, c'est l'axe réel positif (un tour complet en arrière, on revient à 0). Donc <><MathComponent math={"e^{-2i\\pi} = 1"} /></>. <br/>Le résultat final est un nombre réel pur étonnament simple : <strong>64</strong> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Formes" icon="🕹️" color="slate">
        <p className="mb-4">Convertis la forme algébrique 1 + i :</p>
        <FillInTheBlanks 
          id="te-cpx-eval"
          content={[
            "Pour convertir 1 + i. D'abord on calcule le module r. r = √(1² + 1²) = ",
            { options: ["√2", "2", "1"], correctAnswer: 0 },
            ". \nEnsuite on dit que 1 + i = √2 * (1/√2  + i * 1/√2). \nOr, 1/√2 c'est pareil que √2/2, qui correspond au Cosinus et Sinus de l'angle ",
            { options: ["π / 2", "π / 3", "π / 4"], correctAnswer: 2 },
            ". \nDonc l'angle (l'argument) est π/4. \nLa forme exponentielle de 1+i est donc : ",
            { options: ["√2 e^(i π/4)", "2 e^(i π/4)", "√2 e^(i π/2)"], correctAnswer: 0 },
            ". Bingo !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Géométriquement, l'opération qui consiste à multiplier par e^(i π/2)... c'est quoi ?",
              options: [
                "Un agrandissement.",
                "Une translation.",
                "Une rotation de 90°."
              ],
              correctAnswer: 2,
              explanation: "Exact ! Le module vaut 1, donc la taille ne bouge pas. L'angle ajouté est π/2 (soit 90 degrés). C'est le pouvoir des complexes pour manipuler les formes dans les jeux vidéos 2D !"
            },
            {
              question: "Que vaut e^(iπ) ?",
              options: [
                "i",
                "-1",
                "0"
              ],
              correctAnswer: 1,
              explanation: "L'angle π correspond à l'opposé de l'axe réel. Le vecteur pointe vers la gauche, vers -1 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais calculer le module R = √(a²+b²).",
            "Je sais trouver un angle en reconnaissant les valeurs connues (√3/2, 1/2...)",
            "Je sais écrire z = R * e^(iθ).",
            "Multiplier = Multiplier les rayons et Additionner les angles !"
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

export default Course_Terminale_Expertes_01_Complexes;
