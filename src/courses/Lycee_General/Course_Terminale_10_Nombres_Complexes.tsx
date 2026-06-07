import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Sparkles } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_Terminale_10_Nombres_Complexes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-TERM-10"
        title="Nombres Complexes"
        subtitle="Entrez dans la dimension imaginaire des mathématiques !"
        duration="1h 30min"
        level="Terminale (Spécialité Mathématiques)"
        prerequisites={["Trigonométrie", "Calcul littéral", "Équations du second degré"]}
        objectives={[
          "Maîtriser l'écriture algébrique (a+bi) et le nombre imaginaire i.",
          "Passer à l'écriture trigonométrique et exponentielle.",
          "Résoudre des équations du second degré à discriminant négatif.",
          "Utiliser les complexes pour faire de la géométrie analytique."
        ]}
      />

      <Section title="🌟 Activité de Découverte : Le nombre interdit" icon="✨" color="indigo">
        <p>
          On t'a toujours appris que le carré d'un nombre est toujours positif. Par exemple, <MathComponent math={"2^2 = 4"} /> et <MathComponent math={"(-2)^2 = 4"} />. Donc, l'équation <MathComponent math={"x^2 = -1"} /> <strong>n'a aucune solution réelle</strong>. 
        </p>
        <p className="mt-4">
          Mais imagine qu'on "invente" un nombre magique, noté <strong className="text-xl text-indigo-600 dark:text-indigo-400 font-mono">i</strong>, tel que :
        </p>
        
        <div className="flex justify-center my-6">
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/30 px-8 py-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex items-center justify-center gap-4">
            <span className="text-3xl font-bold font-mono text-indigo-700 dark:text-indigo-300">i² = -1</span>
            <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
          </div>
        </div>

        <p>
          En acceptant ce nombre imaginaire, on découvre un univers mathématique nouveau (<em>le plan complexe</em>) où <strong>toutes les équations polynomiales ont des solutions</strong>, et où la géométrie complexe devient un simple jeu de calcul algébrique !
        </p>
      </Section>

      <Section title="📚 Explications et Théorie" icon="📖" color="slate">
        <h3 className="text-xl font-bold mt-4 mb-2">1. Forme Algébrique</h3>
        <p className="mb-4">Tout nombre complexe <MathComponent math={"z"} /> s'écrit de façon unique sous la forme algébrique :</p>
        <div className="bg-card p-6 rounded-2xl border border-border-strong text-center font-mono text-xl md:text-2xl mb-6 shadow-sm">
          z = a + b<span className="text-indigo-500">i</span>
        </div>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li><strong><MathComponent math={"a"} /></strong> est la <strong>partie réelle</strong> (<MathComponent math={"Re(z)"} />).</li>
          <li><strong><MathComponent math={"b"} /></strong> est la <strong>partie imaginaire</strong> (<MathComponent math={"Im(z)"} />).</li>
          <li>Si <MathComponent math={"a=0"} />, on dit que <MathComponent math={"z"} /> est un <strong>imaginaire pur</strong> (ex: <MathComponent math={"z = 3i"} />).</li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-2">2. Le Plan Complexe</h3>
        <p className="mb-4">On associe à <MathComponent math={"z = a+bi"} /> le point <MathComponent math={"M(a ; b)"} /> dans un plan orthonormé direct.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-muted dark:bg-slate-900/30 p-5 rounded-[2rem] border border-border-strong">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 dark:text-slate-200 mb-2">Le Module <MathComponent math={"|z|"} /></h4>
            <p className="text-sm text-muted-text">C'est la distance <MathComponent math={"OM"} /> entre l'origine et le point. Se calcule par le théorème de Pythagore.</p>
            <div className="mt-3 font-mono font-bold text-center">|z| = √(a² + b²)</div>
          </div>
          <div className="bg-muted dark:bg-slate-900/30 p-5 rounded-[2rem] border border-border-strong">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 dark:text-slate-200 mb-2">L'Argument <><MathComponent math={"\\text{arg}(z)"} /></></h4>
            <p className="text-sm text-muted-text">C'est l'angle <MathComponent math={"\\theta"} /> formé avec l'axe horizontal des abscisses.</p>
            <div className="mt-3 font-mono font-bold text-center text-sm">cos(θ) = a / |z|<br/>sin(θ) = b / |z|</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-2">3. Forme Trigonométrique et Exponentielle</h3>
        <p className="mb-4">Une fois que l'on possède le rayon (le module <MathComponent math={"r"} />) et l'angle (l'argument <MathComponent math={"\\theta"} />), on obtient l'écriture géométrique suprême :</p>
        <div className="bg-card p-6 rounded-2xl border border-border-strong text-center font-mono text-xl mb-6 shadow-sm">
          z = r(cos θ + i sin θ) = <span className="text-rose-500 font-bold">r e^{`{iθ}`}</span>
        </div>
        <TipBanner title="Astuce Pro" type="success">
          L'écriture algébrique (<MathComponent math={"a+bi"} />) est la meilleure pour <strong>Additionner</strong> et <strong>Soustraire</strong>. L'écriture exponentielle ($r e^{`{iθ}`}$) est la plus puissante pour <strong>Multiplier</strong>, <strong>Diviser</strong> et faire des <strong>Puissances</strong> !
        </TipBanner>

        <h3 className="text-xl font-bold mt-8 mb-2">4. Le Conjugué <><MathComponent math={"\\bar{z}"} /></></h3>
        <p className="mb-2">Le conjugué de <MathComponent math={"z = a+bi"} /> est son reflet géométrique sur l'axe des réels : <><MathComponent math={"\\bar{z} = a - bi"} /></>.</p>
        <InfoBlock title="Propriété de l'élimination de 'i'" type="info">
          Quand on multiplie <MathComponent math={"z"} /> par son conjugué <><MathComponent math={"\\bar{z}"} /></>, miraculeusement le <MathComponent math={"i"} /> disparaît !<br/>
          <><MathComponent math={"z \\times \\bar{z} = (a+bi)(a-bi) = a^2 - (bi)^2 = a^2 - b^2(-1) = a^2 + b^2 = |z|^2"} /></>. (Un nombre réel pur !).
        </InfoBlock>
      </Section>

      <Section title="✍️ Exemples Pratiques" icon="📝" color="blue">
        <InteractiveExercise 
          title="Conversion Magique : Algébrique → Exponentielle"
          question={<>Transformons l'écriture du complexe <strong><MathComponent math={"z = 1 + i"} /></strong> sous sa forme de puissance (exponentielle).</>}
          steps={[
            <><strong>Étape 1 : Le Module</strong><br/><>{" "}<MathComponent math={"|z| = \\sqrt{1^2 + 1^2} = \\sqrt{2}"} />{". La distance à l'origine est de "}<MathComponent math={"\\sqrt{2}"} />{". "}</></>,
            <><strong>Étape 2 : L'Argument (L'Angle)</strong><br/><>{" On cherche l'angle "}<MathComponent math={"\\theta"} />{" :"}</><br/><>{" "}<MathComponent math={"\\cos(\\theta) = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}"} />{" "}</><br/><>{" "}<MathComponent math={"\\sin(\\theta) = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}"} />{" "}</></>,
            <><strong>Étape 3 : Le Cercle Trigonométrique</strong><br/><>{" Quel est l'angle qui a pour cosinus et sinus "}<MathComponent math={"\\frac{\\sqrt{2}}{2}"} />{" ? C'est l'angle de "}<MathComponent math={"45^{\\circ}"} />{", soit "}</><strong><>{" "}<MathComponent math={"\\frac{\\pi}{4}"} />{" "}</></strong> en radians.</>,
            <><strong>Étape 4 : L'Assemblage</strong><br/>On écrit la forme finale exponentielle : <strong><>{" "}<MathComponent math={"z = \\sqrt{2} e^{i\\frac{\\pi}{4}}"} />{" "}</></strong>.</>
          ]}
        />
        
        <InteractiveExercise 
          title="Équation Interdite : z² + z + 1 = 0"
          question={<>Résous l'équation du second degré <MathComponent math={"z^2 + z + 1 = 0"} /> dans l'ensemble <MathComponent math={"\\mathbb{C}"} /> des nombres complexes.</>}
          steps={[
            <>On calcule le Discriminant classique : <strong><>{" "}<MathComponent math={"\\Delta = b^2 - 4ac"} />{" "}</></strong>.</>,
            <><>{" "}<MathComponent math={"\\Delta = 1^2 - 4 \\times 1 \\times 1 = 1 - 4 = \\mathbf{-3}"} />{" "}</>.</>,
            <><>{" Au collège/seconde on s'arrêterait là en disant \"Impossible\". Mais dans "}<MathComponent math={"\\mathbb{C}"} />{", on écrit ce \"moins\" avec le "}<MathComponent math={"i^2"} />{". Donc "}<MathComponent math={"\\sqrt{-3} = i\\sqrt{3}"} />{". "}</></>,
            <>On trouve donc deux belles solutions complexes conjuguées :<br/><strong><>{" "}<MathComponent math={"z_1 = \\frac{-1 - i\\sqrt{3}}{2}"} />{" "}</></strong> et <strong><>{" "}<MathComponent math={"z_2 = \\frac{-1 + i\\sqrt{3}}{2}"} />{" "}</></strong>.</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Combien vaut <strong><MathComponent math={"i \\times i"} /></strong> (<MathComponent math={"i^2"} />) ?</>}
            back={<><span className="text-2xl font-bold">-1</span><br/>C'est la définition fondamentale même du nombre imaginaire <MathComponent math={"i"} /> !</>}
          />
          <Flashcard 
            front={<>Quel est le module de <MathComponent math={"z = 3 + 4i"} /> ?</>}
            back={<>On utilise le théorème de Pythagore dans le repère géométrique :<br/><>{" "}<MathComponent math={"|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = \\mathbf{5}"} />{" "}</>.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Est-ce que les nombres imaginaires existent 'en vrai' ou c'est juste un délire de mathématiciens ?",
              answer: "Les complexes ont été inventés au début comme un simple 'outil' abstrait pour résoudre des équations. Mais aujourd'hui, TOUTE notre technologie moderne est physiquement impossible sans ces nombres dits imaginaires ! L'électricité alternative (impédance), la physique quantique de ton téléphone portable, la mécanique des fluides pour faire voler un avion de ligne... Les nombres 'imaginaires' modélisent de manière très réelle le monde physique complexe de notre univers !"
            },
            {
              question: "Pourquoi l'écriture algébrique a+bi est si mauvaise pour faire des multiplications par rapport à r*e^(iθ) ?",
              answer: "Essaie de développer (a+bi)(c+di)(e+fi)... tu vas te retrouver avec des tonnes de termes croisés, faire des erreurs et c'est un enfer calculatoire. Alors que sous forme exponentielle : c'est un jeu d'enfant ! r_1 * e^(i θ_1) * r_2 * e^(i θ_2) = (r_1*r_2) * e^(i(θ_1+θ_2)). Les rayons se multiplient, les angles s'additionnent ! C'est majestueux."
            }
          ]}
        />
        
        <TipBanner title="Le Savais-tu ? La formule la plus élégante du monde !" type="info">
          L'Honneur Suprême d'Euler ! L'égalité mathématique <strong>$e^{`iπ`} + 1 = 0$</strong> relie avec une beauté incroyable 5 des nombres les plus importants du monde abstrait : l'exponentielle <MathComponent math={"e"} /> de la nature, l'imaginaire <MathComponent math={"i"} />, la géométrie <MathComponent math={"\\pi"} /> du divin, le neutre <MathComponent math={"1"} /> et le monde de fer du <MathComponent math={"0"} />.
                          </TipBanner>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle affirmation est vraie concernant le Conjugé d'un nombre complexe (a+bi) ?",
              options: [
                "C'est l'inverse du nombre (-a-bi).",
                "C'est le reflet vertical sur l'axe imaginaire (-a+bi).",
                "C'est le reflet horizontal sur l'axe réel (a-bi).",
                "C'est (a+b)*i."
              ],
              correctAnswer: 2,
              explanation: "Le conjugué s'obtient en changeant uniquement le signe de la partie imaginaire (a-bi). Graphiquement, le point 'tombe en miroir' en bas de l'axe des abscisses horizontales."
            },
            {
              question: "D'après la belle formule exponentielle complexe, combien représente la rotation géométrique associée à e^(iπ) ?",
              options: [
                "Un quart de tour (90°)",
                "Un demi-tour complet (180°)",
                "Un tour complet (360°)"
              ],
              correctAnswer: 1,
              explanation: "π Radians correspondent exactement à 180° soit un demi cercle complet. e^(iπ) pointe donc exactement de l'autre côté à bout du cercle trigo : sur la graduation '-1' ! C'est ce qui explique le sublime (e^(iπ) = -1)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais l'origine mystique de i² = -1.",
            "Je sais calculer le Module et extraire l'Argument géométrique.",
            "Je peux conjuger le signe imaginaire."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+60 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Terminale_10_Nombres_Complexes;
