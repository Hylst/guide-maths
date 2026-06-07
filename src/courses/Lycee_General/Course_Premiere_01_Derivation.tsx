import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise, AccordionFAQ
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Premiere_01_Derivation: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [xValue, setXValue] = useState<number>(2);
  const derivValue = 2 * xValue;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-DER"
        title="Dérivation et Variations"
        subtitle="De la vitesse instantanée aux montagnes russes des fonctions."
        duration="60 min"
      />

      <Section title="⚠️ Introduction : Radar et Vitesse Instantanée" icon="📸" color="rose">
        <p>
          Au collège, on sait calculer une vitesse <strong>moyenne</strong> sur un trajet (distance / temps). Mais comment le radar de la police sait-il à quelle vitesse tu roules <em>exactement à l'instant t</em> ?
        </p>
        <p className="mt-2">
          La dérivation, c'est l'outil mathématique suprême pour calculer la <strong>vitesse de variation instantanée</strong> d'une courbe en un point précis. Graphiquement, c'est la pente (le coefficient directeur) de la tangente à la courbe en ce point.
        </p>
        
        <InfoBlock type="definition" title="Le Nombre Dérivé f'(a)">
          Le nombre dérivé, noté <strong>f'(a)</strong>, représente la pente de la droite tangente à la courbe de la fonction f au point d'abscisse a. S'il est positif, la courbe monte. S'il est négatif, elle descend.
        </InfoBlock>
      </Section>

      <Section title="📏 Le Simulateur de Tangente" icon="📈" color="indigo">
        <p className="mb-4">Prenons la fonction de référence la plus célèbre : <strong className="text-indigo-700 dark:text-indigo-300">f(x) = x²</strong>. Sa fonction dérivée est <strong className="text-rose-600 dark:text-rose-400">f'(x) = 2x</strong>.</p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Déplace le point x pour observer la pente de la tangente (la dérivée) !</p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="font-bold text-slate-700 dark:text-slate-300">Abscisse x = </span>
            <input 
              type="range" 
              min="-5" max="5" step="1"
              value={xValue} 
              onChange={(e) => setXValue(parseInt(e.target.value))}
              className="accent-indigo-500 hover:accent-indigo-600 transition-all cursor-pointer w-48"
            />
            <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400 bg-card px-3 py-1 border-2 border-indigo-100 dark:border-indigo-800/60 rounded min-w-[3rem] text-center">{xValue}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Fonction (Altitude)</span>
              <span className="text-2xl font-mono text-slate-900 dark:text-slate-100">f({xValue}) = {xValue * xValue}</span>
            </div>
            <div className={`p-4 rounded-xl border-2 transition-colors ${derivValue > 0 ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/60' : derivValue < 0 ? 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/60' : 'bg-slate-100 border-slate-300'}`}>
              <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Dérivée (Pente)</span>
              <span className="text-2xl font-mono text-slate-900 dark:text-slate-100">f'({xValue}) = {derivValue}</span>
              <span className="block text-sm mt-2 font-bold">
                {derivValue > 0 ? '↗ La courbe monte !' : derivValue < 0 ? '↘ La courbe descend !' : '→ Tangente horizontale (Sommet/Creux)'}
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="📜 Formulaire Magique des Dérivées" icon="⚡" color="amber">
        <p className="mb-6">Oublie la limite du taux d'accroissement pour les calculs quotidiens. On utilise ces formules de dérivation directes :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormulaBox title="Constante f(x) = k" formula={<span className="text-slate-700 dark:text-slate-300">f'(x) = 0</span>} />
          <FormulaBox title="Linéaire f(x) = ax + b" formula={<span className="text-slate-700 dark:text-slate-300">f'(x) = a</span>} />
          <FormulaBox title="Carré f(x) = x²" formula={<span className="text-slate-700 dark:text-slate-300">f'(x) = 2x</span>} />
          <FormulaBox title="Puissance f(x) = xⁿ" formula={<span className="text-slate-700 dark:text-slate-300">f'(x) = n.xⁿ⁻¹</span>} />
        </div>

        <Accordion title="Règles d'Opérations (Sommes et Produits)">
          <div className="p-4 bg-card border border-border rounded-xl space-y-3">
            <p className="font-mono text-slate-900 dark:text-slate-100 bg-muted p-2 rounded"><strong>Somme :</strong> (u + v)' = u' + v'</p>
            <p className="font-mono text-slate-900 dark:text-slate-100 bg-muted p-2 rounded"><strong>Produit par un réel :</strong> (k.u)' = k.u'</p>
            <p className="font-mono text-slate-900 dark:text-slate-100 bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/60 p-2 rounded">
              <span className="text-rose-700 dark:text-rose-300 font-bold block mb-1">🚨 PIÈGE MORTEL - Le Produit :</span>
              (u × v)' = <strong>u'v + uv'</strong> (Ce n'est PAS u' × v' !!)
            </p>
            <p className="font-mono text-slate-900 dark:text-slate-100 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-2 rounded">
              <span className="text-indigo-700 dark:text-indigo-300 font-bold block mb-1">Le Quotient :</span>
              (u / v)' = <strong>(u'v - uv') / v²</strong>
            </p>
          </div>
        </Accordion>
      </Section>

      <Section title="🔮 Le Théorème Fondamental" icon="⚖️" color="emerald">
        <p className="mb-4">
          Pourquoi s'embêter à calculer f'(x) ? Parce que le signe de f'(x) te donne la boussole exacte des variations de f(x). C'est le secret absolu du lycée.
        </p>

        <ul className="space-y-3 mb-6 list-none">
          <li className="flex items-center gap-3 bg-emerald-50/50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/60">
            <span className="text-2xl flex-shrink-0">↗️</span>
            <span>Si <strong>f'(x) &gt; 0</strong> sur un intervalle, alors f est <strong>strictement croissante</strong>.</span>
          </li>
          <li className="flex items-center gap-3 bg-rose-50/50 dark:bg-rose-900/20 p-3 rounded-lg border border-rose-100 dark:border-rose-800/60">
            <span className="text-2xl flex-shrink-0">↘️</span>
            <span>Si <strong>f'(x) &lt; 0</strong> sur un intervalle, alors f est <strong>strictement décroissante</strong>.</span>
          </li>
          <li className="flex items-center gap-3 bg-slate-100 p-3 rounded-lg border border-slate-300">
            <span className="text-2xl flex-shrink-0">🛑</span>
            <span>Si <strong>f'(x) = 0</strong>, la tangente est horizontale. C'est souvent un maximum ou un minimum (un sommet ou un creux).</span>
          </li>
        </ul>

        <div className="space-y-4 mt-6">
          <InfoBlock type="reminder" title="Rappel de définition : Le Taux d'Accroissement">
            Le nombre dérivé {"$f'(a)$"} est la limite (si elle existe) du taux d'accroissement lorsque {"$h$"} tend vers 0 :
            <div className="text-center my-2 font-mono">
              <MathComponent math="f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}" />
            </div>
          </InfoBlock>

          <InfoBlock type="funfact" title="Le saviez-vous ? La guerre des cerveaux Newton vs Leibniz">
            Le calcul infinitésimal (dont la dérivation fait partie) a été inventé de manière totalement indépendante par l'Anglais Isaac Newton et l'Allemand Gottfried Wilhelm Leibniz à la fin du XVIIe siècle. S'en est suivie une querelle acharnée sur l'exclusivité de la découverte. Aujourd'hui, nous utilisons principalement la notation élégante de Leibniz (avec les différentielles d/dx) !
          </InfoBlock>

          <InfoBlock type="info" title="Zoom sur : Les applications physiques directes">
            En physique-chimie, dériver par rapport au temps {"$t$"} est l'action la plus fondamentale :
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Dériver la <strong>position</strong> {"$x(t)$"} par rapport au temps donne la <strong>vitesse instantanée</strong> {"$v(t) = x'(t)$"}.</li>
              <li>Dériver la <strong>vitesse</strong> {"$v(t)$"} par rapport au temps donne l'<strong>accélération</strong> {"$a(t) = v'(t)$"}.</li>
            </ul>
          </InfoBlock>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul de dérivée produit"
          question={<p>Calcule la dérivée de la fonction <><MathComponent math={"f(x) = (2x - 1)(x^2 + 3)"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Identifier u et v</p>
              <p>On utilse la formule du produit <><MathComponent math={"(uv)' = u'v + uv'"} /></>.<br/>Ici, <><MathComponent math={"u(x) = 2x - 1"} /></> et <><MathComponent math={"v(x) = x^2 + 3"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Dériver u et v</p>
              <p><><MathComponent math={"u'(x) = 2"} /></> et <><MathComponent math={"v'(x) = 2x"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Appliquer la formule</p>
              <p><><MathComponent math={"f'(x) = 2 \\times (x^2 + 3) + (2x - 1) \\times 2x"} /></>. On développe : <><MathComponent math={"2x^2 + 6 + 4x^2 - 2x"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"f'(x) = 6x^2 - 2x + 6"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Équation de la tangente"
          question={<p>Quelle est l'équation de la tangente à la courbe de <><MathComponent math={"f(x) = x^2"} /></> au point d'abscisse <><MathComponent math={"a = 3"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Formule du cours</p>
              <p>L'équation de la tangente est <><MathComponent math={"y = f'(a)(x - a) + f(a)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Calculer f(3) et f'(3)</p>
              <p><><MathComponent math={"f(x) = x^2"} /></>, donc <><MathComponent math={"f(3) = 3^2 = 9"} /></>.<br/><><MathComponent math={"f'(x) = 2x"} /></>, donc <><MathComponent math={"f'(3) = 2 \\times 3 = 6"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : L'équation est <><MathComponent math={"y = 6(x - 3) + 9"} /></>. En développant : <><MathComponent math={"y = 6x - 18 + 9"} /></>, ce qui donne <><MathComponent math={"y = 6x - 9"} /></>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes de Survie" icon="⚡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la dérivée de <strong>f(x) = 5x³</strong> ?</>}
            back={<><strong>f'(x) = 15x²</strong><br/><span className="text-sm">On descend le 3 (qui multiplie le 5) et on baisse la puissance d'un cran.</span></>}
          />
          <Flashcard 
            front={<>Que se passe-t-il graphiquement quand <strong>f'(a) = 0</strong> ?</>}
            back={<>La courbe admet une <strong>tangente horizontale</strong> au point d'abscisse a. (Souvent un sommet de la courbe).</>}
          />
        </div>
      </Section>

      <Section title="🎮 Analyseur de Fonction" icon="🕹️" color="slate">
        <p className="mb-4">Complète le processus d'analyse classique de Première :</p>
        <FillInTheBlanks 
          id="der1-eval"
          content={[
            "J'étudie la fonction f(x) = x² - 4x + 3. La première étape est de calculer sa dérivée. À l'aide du formulaire, j'obtiens f'(x) = ",
            { options: ["2x - 4", "x - 4", "2x + 3"], correctAnswer: 0 },
            ". La deuxième étape, ultra importante, est d'étudier le ",
            { options: ["carré", "signe", "volume"], correctAnswer: 1 },
            " de cette dérivée. Je résous f'(x) > 0, soit 2x - 4 > 0, ce qui me donne x > 2. Cela signifie que pour x supérieur à 2, la dérivée est ",
            { options: ["négative", "positive", "nulle"], correctAnswer: 1 },
            ". J'en conclus que la fonction f est strictement ",
            { options: ["décroissante", "croissante", "constante"], correctAnswer: 1 },
            " sur l'intervalle ]2 ; +∞[ !"
          ]}
        />
      </Section>

      <Section title="❓ FAQ (Questions Fréquentes)" icon="HelpCircle" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre f(a) et f'(a) ?",
              answer: "f(a) correspond à l'ordonnée (l'altitude) de la courbe au point d'abscisse a. f'(a) correspond à la pente (l'inclinaison) de la tangente au point d'abscisse a. Une fonction peut être très haute en altitude (f(a) grand) mais être en train de descendre de façon vertigineuse (f'(a) fortement négatif) !"
            },
            {
              question: "Pourquoi la dérivée d'une constante (comme f(x) = 7) est-elle nulle ?",
              answer: "Une fonction constante est représentée par une droite parfaitement horizontale. Son altitude ne varie jamais. Sa vitesse de variation est donc strictement nulle en tout point, d'où f'(x) = 0."
            },
            {
              question: "Est-ce qu'une fonction a toujours une dérivée en tout point ?",
              answer: "Non ! Pour qu'une fonction soit dérivable en un point, sa courbe doit être 'lisse' et continue sans cassure. Par exemple, la fonction valeur absolue f(x) = |x| n'est pas dérivable en x = 0 car sa courbe y fait un virage brutal en 'V', interdisant de définir une tangente unique."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la dérivée de la fonction f(x) = 1/x ?",
              options: [
                "f'(x) = 1/x²",
                "f'(x) = -1/x²",
                "f'(x) = ln(x)"
              ],
              correctAnswer: 1,
              explanation: "À apprendre par cœur ! Ou à retrouver avec (1/v)' = -v'/v². Ici v(x) = x, donc v'(x) = 1, ce qui donne -1/x²."
            },
            {
              question: "Si une fonction a une dérivée toujours strictement négative sur un intervalle I, que fait sa courbe ?",
              options: [
                "Elle est sous l'axe des abscisses.",
                "Elle ne fait que descendre (strictement décroissante).",
                "Elle a une tangente horizontale."
              ],
              correctAnswer: 1,
              explanation: "Le SIGNE de la dérivée donne la VARIATION. Négatif = Décroissant. Rien à voir avec le fait d'être sous l'axe des abscisses (ça c'est le signe de f(x), pas de f'(x))."
            },
            {
              question: "Soit f(x) = x³ - 3x. En quelle(s) valeur(s) de x la courbe admet-elle une tangente horizontale ?",
              options: [
                "En x = 0",
                "En x = 1 et x = -1"
              ],
              correctAnswer: 1,
              explanation: "1) Calcule f'(x) = 3x² - 3. 2) Tangente horizontale = f'(x) vaut 0. 3) On résout 3x² - 3 = 0, soit 3x² = 3, soit x² = 1. Solutions : 1 et -1."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que le nombre dérivé graphiquement = pente de la tangente.",
            "Je connais mes formules de dérivées de base (x², x³, 1/x, √x).",
            "Je connais la formule du produit (uv)' = u'v + uv' !",
            "Je sais lier le SIGNE de f' avec les VARIATIONS de f sans m'embrouiller."
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

export default Course_Premiere_01_Derivation;
