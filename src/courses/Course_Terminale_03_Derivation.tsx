import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Terminale_03_Derivation: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [fSecondLabel, setFSecondLabel] = useState<string>("Positive");

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-DERV"
        title="Dérivation & Convexité"
        subtitle="Analysons la vitesse de la vitesse. Sommets, creux, et points de rupture."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Sous le capot des fonctions" icon="🏎️" color="emerald">
        <p>
          En Première, tu as appris que la <strong>dérivée f'</strong> donne la pente de la courbe (la vitesse). Si f' est positive, la fonction f monte. Si f' est négative, f descend.
        </p>
        <p className="mt-2">
          Mais on peut aller plus loin ! Est-ce que la courbe monte en accélérant (comme une fusée) ou en ralentissant (comme une pierre lancée en l'air qui s'essouffle) ? C'est ce qu'annonce la <strong>Convexité</strong>, et on la trouve en calculant la <strong>Dérivée de la Dérivée (f'')</strong> !
        </p>
        
        <InfoBlock type="definition" title="Le lexique">
          - <strong>f (La position) :</strong> La hauteur de la courbe.<br/>
          - <strong>f' (La vitesse / Pente) :</strong> Savoir si on monte ou si on descend.<br/>
          - <strong>f'' (L'accélération / Convexité) :</strong> Savoir comment la courbe s'arrondit (forme de U ou forme de parapluie).
        </InfoBlock>
      </Section>

      <Section title="⚖️ Convexe vs Concave" icon="🥣" color="indigo">
        <p className="mb-4">
          C'est très visuel. Il suffit d'imaginer la courbe comme un bol.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 border border-indigo-100 dark:border-indigo-800/60 rounded-xl shadow-sm text-center">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg mb-2">Convexe (Sourire) ∪</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">La courbe forme un U, comme un bol qui <strong>retient l'eau</strong>. La dérivée (la pente) augmente.</p>
            <p className="font-mono text-indigo-950 dark:text-indigo-50 font-bold bg-card p-1 rounded inline-block">f'' &gt; 0</p>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-900/20 p-4 border border-rose-100 dark:border-rose-800/60 rounded-xl shadow-sm text-center">
            <h4 className="font-bold text-rose-900 dark:text-rose-100 text-lg mb-2">Concave (Triste) ∩</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">La courbe forme un pont, ou un dos d'âne. Elle <strong>ne retient pas l'eau</strong>. La dérivée diminue.</p>
            <p className="font-mono text-rose-950 dark:text-rose-50 font-bold bg-card p-1 rounded inline-block">f'' &lt; 0</p>
          </div>
        </div>
      </Section>

      <Section title="🛠️ Le Simulateur d'Inflexion" icon="🎢" color="amber">
        <p className="mb-4">
          Un <strong>Point d'Inflexion</strong>, c'est le moment exact où la courbe change de direction d'arrondi (elle passe de convexe à concave, ou l'inverse).
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button onClick={() => setFSecondLabel("Positive")} className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${fSecondLabel === "Positive" ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-card text-slate-700 dark:text-slate-300 hover:bg-muted'}`}>
                f''(x) &gt; 0
              </button>
              <button onClick={() => setFSecondLabel("Nulle")} className={`px-4 py-2 text-sm font-medium border-t border-b ${fSecondLabel === "Nulle" ? 'bg-amber-500 text-white border-amber-600' : 'bg-card text-slate-700 dark:text-slate-300 hover:bg-muted'}`}>
                f''(x) = 0
              </button>
              <button onClick={() => setFSecondLabel("Négative")} className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${fSecondLabel === "Négative" ? 'bg-rose-500 text-white border-rose-600' : 'bg-card text-slate-700 dark:text-slate-300 hover:bg-muted'}`}>
                f''(x) &lt; 0
              </button>
            </div>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border transition-all duration-300">
            {fSecondLabel === "Positive" && (
              <div>
                <p className="text-5xl mb-4">🙂</p>
                <p className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">La fonction f est CONVEXE.</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">La courbe est au-dessus de TOUTES ses tangentes.</p>
              </div>
            )}
            {fSecondLabel === "Nulle" && (
              <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-lg animate-pulse border border-amber-300">
                <p className="text-5xl mb-4">⚡</p>
                <p className="font-bold text-amber-900 dark:text-amber-100 text-lg">POINT D'INFLEXION !</p>
                <p className="text-sm text-amber-950 dark:text-amber-50 mt-2">Ici, f'' s'annule en CHANGER DE SIGNE. <br/>La tangente transperce carrément la courbe !</p>
              </div>
            )}
            {fSecondLabel === "Négative" && (
              <div>
                <p className="text-5xl mb-4">🙁</p>
                <p className="font-bold text-rose-900 dark:text-rose-100 text-lg">La fonction f est CONCAVE.</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">La courbe est en dessous de toutes ses tangentes.</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section title="📜 Formulaire : Les Dérivées Composées" icon="⚡" color="rose">
        <p className="mb-4">Au Bac, on va te demander de dériver des monstres (genre l'exponentielle mêlée à une division). Il faut maitriser la <strong>dérivation composée</strong>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="L'Exponentielle Composée : e^(u)" 
            math={"(e^u)' = u' \\times e^u"} 
          />
          <FormulaBox 
            title="La Puissance Composée : u^n" 
            math={"(u^n)' = n \\times u' \\times u^{n-1}"} 
          />
        </div>
        <p className="mt-4 text-sm bg-card p-3 border border-border rounded-lg">Exemple avec la Clé du Boss : f(x) = e^(3x²).<br/> L'exposant c'est u = 3x², donc u' = 6x. La dérivée complète donne donc : <strong>f'(x) = 6x × e^(3x²)</strong>.</p>
      </Section>

      <Section title="🧠 Le Lien entre f, f' et f''" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Si f'' est positive (+)... Que fait f' ?</>}
            back={<>Si la dérivée-seconde est positive, c'est que la dérivée-première <strong>CROÎT</strong> !<br/><span className="text-sm">Logique : f' gère f, et f'' gère f'.</span></>}
          />
          <Flashcard 
            front={<>Comment rédiger le tableau de convexité ?</>}
            back={<>Tu fais le tableau de SIGNES de f''(x).<br/>Là où y'a un '+', tu écris Convexe.<br/>Là où y'a un '-', tu écris Concave.<br/>Là où ça fait zéro, tu écris 'Pt. Inflexion'.</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver un point d'inflexion"
          question={<p>On donne <><MathComponent math={"f''(x) = (x - 2)(x + 5)"} /></>. En quel point <><MathComponent math={"x"} /></> la fonction f(x) possède-t-elle des points d'inflexion ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Résoudre f''(x) = 0</p>
              <p>C'est un produit nul, donc <><MathComponent math={"x=2"} /></> ou <><MathComponent math={"x=-5"} /></> (les deux moments où la parenthèse vaut 0).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Vérifier le changement de signe</p>
              <p>Un tableau de signe classique montre que la formule croise l'axe horizontal. f''(x) passe de positif à négatif (ou inversement) aux deux endroits.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : f possède exactement DEUX points d'inflexion en <><MathComponent math={"x = 2"} /></> et en <><MathComponent math={"x = -5"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Appliquer une formule composée"
          question={<p>Calculer la dérivée <><MathComponent math={"g'(x)"} /></> pour <><MathComponent math={"g(x) = (3x^2 + 1)^4"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Reconnaitre la structure</p>
              <p>On reconnait la forme <><MathComponent math={"u^n"} /></> avec <><MathComponent math={"n=4"} /></> et avec u (le sous-marin) égal à <><MathComponent math={"3x^2 + 1"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Dériver le bloc interne</p>
              <p>La dérivée de <><MathComponent math={"u(x)"} /></> est <><MathComponent math={"u'(x) = 6x"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On applique <><MathComponent math={"n \\times u' \\times u^{n-1}"} /></>. <br/>Donc <><MathComponent math={"4 \\times 6x \\times (3x^2 + 1)^3"} /></>. Qui se réduit amicalement à <><MathComponent math={"24x(3x^2 + 1)^3"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Formules" icon="🕹️" color="slate">
        <p className="mb-4">A toi de jouer :</p>
        <FillInTheBlanks 
          id="deriv-eval"
          content={[
            "J'ai f(x) = x³. Sa première dérivée est f'(x) = ",
            { options: ["3x²", "2x²", "x²"], correctAnswer: 0 },
            ". Je dérive f' pour trouver la dérivée seconde : f''(x) = ",
            { options: ["3x", "6x", "6x²"], correctAnswer: 1 },
            ". Je remarque que f''(0) vaut 0, et la formule '6x' change bien de signe autour de zéro (de - à +). Donc en x=0, f(x)=x³ possède un ",
            { options: ["maximum", "minimum", "point d'inflexion"], correctAnswer: 2 },
            ". Sur [0; +∞[, 6x est positif, donc f''(x) > 0. Sur cet intervalle, x³ est donc ",
            { options: ["convexe", "concave", "constante"], correctAnswer: 0 },
            "."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu connais la courbe représentative de f. Comment tu sais, en un coup d'œil, où f'(x) = 0 ?",
              options: [
                "Là où la courbe coupe l'axe de l'eau (abscisses).",
                "Là où la courbe a un sommet ou un creux (tangente horizontale).",
                "Au niveau du point d'inflexion."
              ],
              correctAnswer: 1,
              explanation: "f'(x) = 0 signifie que la PENTE est nulle. Une pente nulle, c'est plat ! Donc c'est le haut de la colline ou le bas de la vallée."
            },
            {
              question: "Dérive f(x) = (2x + 1)³",
              options: [
                "3(2x + 1)²",
                "6(2x + 1)²",
                "6x(2x + 1)²"
              ],
              correctAnswer: 1,
              explanation: "Formule u^n. Ca donne n * u' * u^(n-1). Ici n=3, u=2x+1, donc u'=2. On a donc 3 * 2 * (2x+1)², soit 6(2x+1)² !"
            },
            {
              question: "Un panneau indique : 'f''(x) = -4 pour tout x'. Que peut-on conclure ?",
              options: [
                "La fonction f est toujours décroissante.",
                "La courbe de f est une droite.",
                "La fonction f est toujours CONCAVE."
              ],
              correctAnswer: 2,
              explanation: "f''(x) < 0 partout = Concave sur R ! (En l'occurence, c'est une parabole qui fait la tronche vers le bas)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Convexe (Sourire, l'eau reste, f'' > 0).",
            "Concave (Triste, l'eau tombe, f'' < 0).",
            "Point d'Inflexion = f''(x) s'annule ET CHANGE DE SIGNE.",
            "Je sais dériver e^(u(x)) en écrivant u'(x) * e^(u(x))."
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

export default Course_Terminale_03_Derivation;
