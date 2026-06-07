import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_Expertes_02_Arithmetique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [a, setA] = useState<number>(14);
  const [b, setB] = useState<number>(5);

  const q = Math.floor(a / b);
  const r = a % b;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-TE-ARITH"
        title="Arithmétique"
        subtitle="Le monde secret des nombres entiers, des divisions invisibles et de la cryptographie."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Discret et Pur" icon="🛡️" color="emerald">
        <p>
          Oublie les virgules, les racines et les approximations. L'Arithmétique, c'est la science des nombres parfaits : les entiers relatifs (Z). 
        </p>
        <p className="mt-2">
          On étudie la divisibilité, les nombres premiers, et les restes. C'est la base de toute la cryptographie moderne (les cartes bleues, internet, la blockchain) !
        </p>
        
        <InfoBlock type="definition" title="La Base : a divise b">
          On dit que "a divise b" (noté a | b) si et seulement s'il existe une troisième entier k tel que <strong>b = k × a</strong>.<br/>
          (En clair, ça veut dire que la division 'tombe juste', sans retenue ni virgule).
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Division Euclidienne (Le Retour au Primaire)" icon="🧮" color="indigo">
        <p className="mb-4">
          C'est la division qu'on apprenait avant de connaitre les nombres à virgules. On cherche un Quotient 'q' et un Reste 'r'.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center gap-4 mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Dividende (a) = {a}</span>
              <input type="range" min="1" max="50" step="1" value={a} onChange={(e) => setA(parseInt(e.target.value))} className="accent-indigo-500 w-32" />
            </label>
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Diviseur (b) = {b}</span>
              <input type="range" min="1" max="20" step="1" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="accent-rose-500 w-32" />
            </label>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60 inline-block text-left relative overflow-hidden">
            <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Théorème de la Division Euclidienne</span>
            <div className="font-mono text-xl text-emerald-950 dark:text-emerald-50 font-bold mb-2">
              a = b × q + r 
            </div>
            <div className="font-mono text-xl text-emerald-950 dark:text-emerald-50 font-bold mt-2 pt-2 border-t border-emerald-300">
              {a} = {b} × {q} + {r}
            </div>
            {r === 0 && (
               <div className="mt-2 text-rose-600 dark:text-rose-400 font-bold animate-pulse text-sm">Le reste est NUL ! Donc {b} divise parfaitement {a}.</div>
            )}
            <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">Condition Absolue : 0 ≤ Reste &lt; Diviseur</div>
          </div>
        </div>
      </Section>

      <Section title="📜 Congruences (L'Horloge Magique)" icon="🕰️" color="amber">
        <p className="mb-4">
          La congruence, c'est l'art de calculer 'en boucle'. Sur une horloge (modulo 12), si il est 10h et que j'ajoute 5h, il sera 3h (15h = 3h). C'est ça la congruence ! On ne s'intéresse QU'AU RESTE de la division.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Notation" 
            math={"a \\equiv b \\pmod{n}"} 
          />
          <FormulaBox 
            title="Définition" 
            math={"\\text{Ça veut dire que } 'n' \\text{ divise } (a - b)"} 
          />
        </div>
        <div className="mt-4 p-4 border border-rose-100 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl text-rose-950 dark:text-rose-50 text-sm">
          <strong>Propriété Surpuissante :</strong> Les congruences sont compatibles avec l'addition et la multiplication ! Si a ≡ b [n] et c ≡ d [n], alors on peut bêtement dire a+c ≡ b+d [n], et même a^k ≡ b^k [n] ! C'est grâce à cette puissance qu'on peut calculer de tête les restes de divisions gigantesques.
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans une division euclidienne, le reste peut être négatif.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Par pure définition, le reste a l'obligation d'être Positif ou Nul, et toujours strictement inférieur au diviseur (0 ≤ r &lt; b).</span></>}
          />
          <Flashcard 
            front={<>-1 ≡ 4 modulo 5.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">-1 et 4 sont écartés de 5 unités. (4 - (-1) = 5). Donc 5 divise bien leur différence. L'astuce c'est que -1 est le "reste négatif" équivalent à 4 quand on divise par 5.</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Restes de congruence"
          question={<p>Trouver le reste de la division euclidienne de <><MathComponent math={"3^{2024}"} /></> par 5.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Tester les premières puissances</p>
              <p>On regarde le cycle des restes de <><MathComponent math={"3^k"} /></> modulo 5. <br/><><MathComponent math={"3^1 \\equiv 3"} /></>. <br/><><MathComponent math={"3^2 \\equiv 9 \\equiv 4"} /></>. <br/><><MathComponent math={"3^3 \\equiv 27 \\equiv 2"} /></>. <br/><><MathComponent math={"3^4 \\equiv 81 \\equiv 1"} /></>. </p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le point de bascule modulo 1</p>
              <p>Puisque <><MathComponent math={"3^4 \\equiv 1 \\pmod 5"} /></>, on peut utiliser ce super-pouvoir ! Tous les multiples de la puissance 4 donneront aussi 1 en reste. On va diviser 2024 par 4.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Application à 2024</p>
              <p>Oh miracle, <><MathComponent math={"2024 = 4 \\times 506"} /></>. Donc <><MathComponent math={"3^{2024} = (3^4)^{506}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Si on passe en congruence : <><MathComponent math={"(1)^{506} \\equiv 1 \\pmod 5"} /></>. Le reste de ce nombre incalculable (qui contient des milliers de chiffres) par 5 est tout simplement... 1 !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Utiliser le théorème de Bézout"
          question={<p>Montrer que pour tout entier n, <><MathComponent math={"2n+1"} /></> et <><MathComponent math={"3n+2"} /></> sont premiers entre eux.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Poser Bézout</p>
              <p>On veut trouver des entiers <><MathComponent math={"u"} /></> et <><MathComponent math={"v"} /></> tels que <><MathComponent math={"u(2n+1) + v(3n+2) = 1"} /></> pour tuer la variable n.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Choisir stratégiquement les coefficients u et v</p>
              <p>Si je multiplie le premier bloc par 3, j'obtiens un paquet de '6n'. Si je multiplie le deuxième par 2, j'obtiens aussi un paquet de '6n'. Faisons la soustraction !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Posons <><MathComponent math={"u = 3"} /></> et <><MathComponent math={"v = -2"} /></>. <br/><><MathComponent math={"3(2n+1) - 2(3n+2) = 6n + 3 - (6n + 4) = 6n + 3 - 6n - 4 = -1"} /></>. <br/>On a donc <><MathComponent math={"-3(2n+1) + 2(3n+2) = 1"} /></>. Puisqu'on a fabriqué un 1, alors par le miracle du théorème de Bézout, ils sont Premiers Entre Eux !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Bézout & Gauss" icon="🕹️" color="slate">
        <p className="mb-4">Voici les deux héros de l'arithmétique :</p>
        <FillInTheBlanks 
          id="arith-eval"
          content={[
            "Deux nombres sont dits Premiers Entre Eux si leur seul diviseur commun est ",
            { options: ["0", "1", "2"], correctAnswer: 1 },
            ". \nLe théorème de BÉZOUT affirme qu'on peut toujours trouver deux entiers 'u' et 'v' tels que a*u + b*v = 1... SI ET SEULEMENT SI 'a' et 'b' sont ",
            { options: ["Premiers", "Premiers entre eux", "Pairs"], correctAnswer: 1 },
            ". \nEnsuite le Théorème de GAUSS, le grand nettoyeur : Si 'a' divise le produit 'bc', ET que 'a' est premier avec 'b', alors obligatoirement, 'a' doit diviser ",
            { options: ["1", "c", "b"], correctAnswer: 1 },
            " ! C'est d'une logique implacable."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Combien y a-t-il de nombres premiers ?",
              options: [
                "10 000",
                "Des milliards",
                "Une infinité"
              ],
              correctAnswer: 2,
              explanation: "Euclide l'a prouvé il y a plus de 2000 ans : peu importe le nombre de nombres premiers que tu as trouvés, tu pourras toujours en forger un nouveau plus grand ! Il y en a une infinité."
            },
            {
              question: "On me demande de trouver le reste de la division euclidienne de (-17) par 5. Que vaut 'r' ?",
              options: [
                "-2",
                "3",
                "2"
              ],
              correctAnswer: 1,
              explanation: "Attention au piège de collège ! -17 = 5 * (-3) - 2. MAIS le reste ne peut pas être négatif ! Donc on décale : -17 = 5 * (-4) + 3 ! Le reste est 3, le quotient est -4."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "La division euclidienne a un reste STRICTEMENT positif (ou nul) et inférieur au diviseur.",
            "Congruence a ≡ b [n] => La différence (a-b) est un multiple de n.",
            "Bézout est un Couteau Suisse pour prouver que deux éléments sont Premiers Entre Eux.",
            "Gauss est le Tueur de Multiplications, il annule un élément si il est premier avec."
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

export default Course_Terminale_Expertes_02_Arithmetique;
