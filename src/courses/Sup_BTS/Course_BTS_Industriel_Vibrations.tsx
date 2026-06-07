import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BTS_Industriel_Vibrations: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BTS-IND"
        title="BTS Industriel : Équations des Vibrations"
        subtitle="Modélisation des oscillateurs mécaniques et électriques : équations différentielles du second degré et résonance."
        duration="1h 20"
      />

      <Section title="⚖️ Équations Différentielles Harmoniques" icon="📈" color="indigo">
        <p>
          En BTS Industriel (CIRA, Électrotechnique, Énergie, CPI), l'étude des vibrations (amortisseurs mécaniques, circuits RLC) requiert l'outil universel des <strong>équations différentielles linéaires du second ordre à coefficients constants</strong>.
        </p>

        <InfoBlock type="definition" title="Équation canonique de l'oscillateur">
          Pour un système oscillant amorti soumis à une force extérieure, l'équation différentielle temporelle générale s'écrit :
          <MathComponent block math="\frac{d^2 y}{dt^2} + 2\zeta\omega_0 \frac{dy}{dt} + \omega_0^2 y = f(t)" />
          Où :
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><MathComponent math="\omega_0" /> est la <strong>pulsation propre</strong> du système.</li>
            <li><MathComponent math="\zeta" /> est le <strong>facteur d'amortissement</strong> sans dimension.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="🌊 Les 3 Régimes d'Oscillation Libre" icon="🌊" color="emerald">
        <p className="mb-4">
          Selon la valeur du facteur d'amortissement <MathComponent math="\zeta" /> (ou du discriminant de l'équation caractéristique), le comportement physique libre du système change radicalement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 border border-indigo-100 rounded-2xl bg-indigo-50/20">
            <h4 className="font-bold text-indigo-900 border-b pb-2 mb-2">1. Régime Pseudo-Périodique</h4>
            <p className="text-xs text-slate-600">
              <MathComponent math="\zeta < 1" /> : Le système oscille avec une amplitude qui décroît exponentiellement. La pseudo-pulsation vaut <MathComponent math="\omega = \omega_0 \sqrt{1-\zeta^2}" />.
            </p>
          </div>
          <div className="p-4 border border-rose-100 rounded-2xl bg-rose-50/20">
            <h4 className="font-bold text-rose-900 border-b pb-2 mb-2">2. Régime Apériodique</h4>
            <p className="text-xs text-slate-600">
              <MathComponent math="\zeta > 1" /> : Le système est trop visqueux. Il n'oscille pas et retourne lentement à sa position d'équilibre sans oscillation.
            </p>
          </div>
          <div className="p-4 border border-emerald-100 rounded-2xl bg-emerald-50/20">
            <h4 className="font-bold text-emerald-900 border-b pb-2 mb-2">3. Régime Critique</h4>
            <p className="text-xs text-slate-600">
              <MathComponent math="\zeta = 1" /> : Le retour de l'oscillateur à sa position neutre s'effectue le plus rapidement possible sans aucun dépassement.
            </p>
          </div>
        </div>

        <FormulaBox 
          title="Équation caractéristique homogène" 
          math="r^2 + 2\zeta\omega_0 r + \omega_0^2 = 0" 
        />

        <InfoBlock type="reminder" title="Rappel : Résolution algébrique via le discriminant">
          Pour résoudre l&apos;équation caractéristique du second degré {"$r^2 + 2\\zeta\\omega_0 r + \\omega_0^2 = 0$"}, on calcule son discriminant réduit. Celui-ci s&apos;exprime par {"$\\Delta&apos; = \\omega_0^2(\\zeta^2 - 1)$"}.
          <ul className="list-disc pl-6 mt-2 space-y-1 text-xs">
            <li>Si {"$\\zeta > 1$"} (soit {"$\\Delta&apos; > 0$"}), on obtient deux racines réelles négatives (Régime Apériodique).</li>
            <li>Si {"$\\zeta = 1$"} (soit {"$\\Delta&apos; = 0$"}), on a une racine double négative {"$r = -\\omega_0$"} (Régime Critique).</li>
            <li>Si {"$\\zeta < 1$"} (soit {"$\\Delta&apos; < 0$"}), on a deux racines complexes conjuguées dont la partie réelle négative induit l&apos;amortissement exponentiel (Régime Pseudo-Périodique).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="⚡ Le Phénomène de Résonance" icon="⚡" color="rose">
        <p className="mb-4">
          Quand la fréquence de la force d'excitation externe <MathComponent math="f(t)" /> coïncide avec la fréquence propre de l'oscillateur, l'amplitude des oscillations peut s'amplifier de manière démesurée : c'est la <strong>résonance</strong>.
        </p>

        <InfoBlock type="warning" title="Danger industriel : Rupture mécanique de ponts">
          Un pont suspendu qui subit des rafales de vent synchronisées avec sa pulsation critique de torsion peut stocker tellement d'énergie vibratoire qu'il finit par se désintégrer (ex: Pont de Tacoma Narrows en 1940).
        </InfoBlock>

        <InfoBlock type="funfact" title="Le saviez-vous ? Galilée et l'isochronisme des pendules">
          En 1581, alors qu&apos;il étudiait la médecine à l&apos;Université de Pise, Galilée observa les oscillations d&apos;un grand lustre en bronze suspendu à la nef de la cathédrale. En utilisant les battements de son propre pouls comme chronomètre naturel, il s&apos;aperçut que la durée de chaque oscillation restait strictement constante, qu&apos;elle soit de grande ou de petite amplitude ! Cela jeta les bases de l&apos;isochronisme, menant aux premières horloges mécaniques à balancier.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercice Guidé" icon="🛠️" color="purple">
        <InteractiveExercise
          title="Calcul de la Pulsation Propre d'un Circuit RLC"
          question={<p>En génie électrique, un circuit LC de résistance négligeable comprend une bobine de self <MathComponent math="L = 0.2\text{ H}" /> et un condensateur de capacité <MathComponent math="C = 50\ \mu\text{F}" />. Que vaut la pulsation propre <MathComponent math="\omega_0" /> ?</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Se remémorer la relation physique de Thomson</p>
              <p>La formule reliant les valeurs à la pulsation propre est : <MathComponent math="\omega_0 = \frac{1}{\sqrt{LC}}" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Convertir les unités</p>
              <p>Capacité en Farads : <MathComponent math="C = 50 \times 10^{-6}\text{ F}" />. Inductance : <MathComponent math="L = 0.2\text{ H}" />.</p>
              <p>Calcul de <MathComponent math="LC = 0.2 \times 50 \times 10^{-6} = 10 \times 10^{-6} = 10^{-5}\text{ s}^2" />.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Calcul final de la pulsation</p>
              <p><MathComponent math="\omega_0 = \frac{1}{\sqrt{10^{-5}}} \approx 316.2\text{ rad/s}" />. Divisé par <MathComponent math="2\pi" />, cela donne une fréquence de résonance électrique d'environ <MathComponent math="50.3\text{ Hz}" />, très proche du réseau EDF !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'évaluation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel régime correspond à un facteur d'amortissement amorti sans aucune oscillation et le plus rapide possible ?",
              options: [
                "Le régime apériodique",
                "Le régime critique",
                "Le régime chaotique"
              ],
              correctAnswer: 1,
              explanation: "Le régime critique (amortissement unitaire) offre le retour d'un système mécanique ou amortisseur à son point initial de manière optimale sans rebonds."
            },
            {
              question: "Quelle pulsation correspond à la résonance d'un système lorsque ζ = 0 (sans frottement) ?",
              options: [
                "La pulsation propre ω0",
                "0 rad/s",
                "Une pulsation infinie"
              ],
              correctAnswer: 0,
              explanation: "Sans aucun frottement (amortissement nul), l'amplitude résonante tend théoriquement vers l'infini exactement à la pulsation propre d'excitation ω0."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais l'équation différentielle canonique du second ordre.",
            "Je sais distinguer les régimes pseudo-périodiques, apériodiques, et critiques.",
            "Je comprends les notions physiques de pulsation propre et d'amortissement.",
            "Je connais l'application physique directe aux circuits LC/RLC."
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="purple">
        <p className="mb-6 text-sm text-slate-500 leading-relaxed">
          Mémorisez les notions théoriques et physiques indispensables sur l&apos;étude des vibrations industrielles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Comment s&apos;exprime l&apos;<strong>Équation Canonique</strong> d&apos;un oscillateur amorti ?</>}
            back={<>L&apos;équation s&apos;écrit sous la forme utile : {"$\\frac{d^2 y}{dt^2} + 2\\zeta\\omega_0 \\frac{dy}{dt} + \\omega_0^2 y = f(t)$"}.</>}
          />
          <Flashcard 
            front={<>Qu&apos;est-ce que la <strong>Pulsation Propre</strong> d&apos;un oscillateur ?</>}
            back={<>Notée {"$\\omega_0$"}, c&apos;est la pulsation naturelle à laquelle le système oscillerait en l&apos;absence totale de frottements ou d&apos;amortissement {"$(\\zeta=0)$"}.</>}
          />
          <Flashcard 
            front={<>Comment s&apos;interprète physiquement le <strong>Régime Pseudo-Périodique</strong> ?</>}
            back={<>Le facteur d&apos;amortissement est faible {"$(\\zeta < 1)$"}. Le système effectue des oscillations sinusoïdales à la pseudo-pulsation {"$\\omega = \\omega_0 \\sqrt{1-\\zeta^2}$"}, mais son amplitude décroît de manière exponentielle.</>}
          />
          <Flashcard 
            front={<>Quelle est la condition théorique majeure pour obtenir la <strong>Résonance</strong> d&apos;un système ?</>}
            back={<>Il faut appliquer une excitation harmonique externe de pulsation {"$\\omega_{\\text{exc}}$"} proche ou égale à la pulsation propre {"$\\omega_0$"} du système. L&apos;amplitude des oscillations est alors maximale.</>}
          />
        </div>
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_BTS_Industriel_Vibrations;
