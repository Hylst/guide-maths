import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Seconde_06_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [val1, setVal1] = useState<number>(8);
  const [val2, setVal2] = useState<number>(10);
  const [val3, setVal3] = useState<number>(15);
  const [val4, setVal4] = useState<number>(20);

  const series = [val1, val2, val3, val4].sort((a,b) => a-b);
  const moyenne = ((val1 + val2 + val3 + val4) / 4).toFixed(1);
  const etendue = series[3] - series[0];
  const mediane = ((series[1] + series[2]) / 2).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-STAT"
        title="Statistiques Descriptives"
        subtitle="Transformer un chaos de données en informations utiles pour décider."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : Raconter une histoire avec des nombres" icon="📊" color="emerald">
        <p>
          Imaginons les notes d'une classe de 35 élèves. Si le prof lit les 35 notes de suite, tu retiendras quoi ? Rien. C'est du bruit.
        </p>
        <p className="mt-2">
          Les <strong>statistiques descriptives</strong> servent à résumer cette foule de nombres en quelques valeurs clés (Moyenne, Médiane, Étendue) pour <em>comprendre</em> ce qui se passe. Est-ce que tout le monde a eu 10 ? Est-ce que la moitié a eu 2 et l'autre 18 ?
        </p>
        
        <InfoBlock type="definition" title="Le lexique du statisticien">
          - <strong>Population & Individu :</strong> L'ensemble étudié (ex: les élèves) et un de ses éléments.<br/>
          - <strong>Le Caractère :</strong> Ce qu'on observe (Note, Taille, Couleur des yeux...). Il peut être Quantitatif (chiffres) ou Qualitatif (mots).<br/>
          - <strong>Effectif et Fréquence :</strong> L'effectif c'est "combien de fois ça arrive". La fréquence c'est "le pourcentage du total".
        </InfoBlock>
      </Section>

      <Section title="⚖️ Position vs Dispersion" icon="⚖️" color="indigo">
        <p className="mb-4">
          Un résumé statistique complet doit TOUJOURS répondre à deux questions : Autour de quoi on tourne (Position) ? Et est-ce que c'est regroupé ou éclaté (Dispersion) ?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border border-slate-100 dark:border-slate-800/60 rounded-xl shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">📍 Indicateurs de Position</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Moyenne :</strong> La "note d'équilibre". On additionne tout, on divise par le nombre total. Trés sensible aux valeurs extrêmes !</li>
              <li><strong>Médiane :</strong> C'est la valeur qui "coupe la classe en deux". 50% au-dessus, 50% en dessous. <em>(Attention : il faut TRIER les valeurs d'abord !)</em></li>
            </ul>
          </div>
          <div className="bg-white p-4 border border-slate-100 dark:border-slate-800/60 rounded-xl shadow-sm">
            <h4 className="font-bold text-rose-700 dark:text-rose-300 mb-2">🧨 Indicateurs de Dispersion</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Étendue :</strong> La distance entre le plus grand et le plus petit (Max - Min). C'est basique mais utile.</li>
              <li><strong>Écart-Interquartile :</strong> (Souvent vu au lycée). La zone où se trouve les 50% du milieu (Q3 - Q1), pour ignorer les élèves ayant eu 0 ou 20.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="🛠️ Le Labo des 4 Notes" icon="🔬" color="amber">
        <p className="mb-4">
          Manipule les notes de tes 4 derniers contrôles pour voir comment la Moyenne et la Médiane réagissent !
        </p>
        
        <div className="bg-slate-50/50 dark:bg-slate-900/20 border-2 border-slate-100 dark:border-slate-800/60 p-6 rounded-2xl shadow-sm text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[ 
              {val: val1, set: setVal1, color: "indigo"}, 
              {val: val2, set: setVal2, color: "emerald"}, 
              {val: val3, set: setVal3, color: "amber"}, 
              {val: val4, set: setVal4, color: "rose"} 
            ].map((item, idx) => (
              <label key={idx} className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-100 dark:border-slate-800/60 shadow-sm">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">N°{idx+1}</span>
                <input type="number" min="0" max="20" value={item.val} onChange={(e) => item.set(Number(e.target.value))} className="w-16 p-1 text-center font-mono text-lg border rounded" />
              </label>
            ))}
          </div>

          <div className="mb-4 text-slate-700 dark:text-slate-300 font-mono bg-white inline-block px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-slate-800/60">
            <strong>Série Triée :</strong> {series.join(' ≤ ')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/60">
              <span className="block font-bold text-sm text-indigo-900 dark:text-indigo-100 uppercase mb-2">Moyenne</span>
              <span className="font-mono text-2xl font-bold text-indigo-950 dark:text-indigo-50">{moyenne}</span>
            </div>
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/60">
              <span className="block font-bold text-sm text-emerald-900 dark:text-emerald-100 uppercase mb-2">Médiane</span>
              <span className="font-mono text-2xl font-bold text-emerald-950 dark:text-emerald-50">{mediane}</span>
            </div>
            <div className="p-4 bg-rose-50/50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/60">
              <span className="block font-bold text-sm text-rose-900 dark:text-rose-100 uppercase mb-2">Étendue (Max-Min)</span>
              <span className="font-mono text-2xl font-bold text-rose-950 dark:text-rose-50">{etendue}</span>
            </div>
          </div>
          
          <Accordion title="Pourquoi la moyenne et la médiane sont parfois différentes ?">
            <div className="p-3 text-sm text-left">
              Mets trois "10" et un "0" (tu n'as pas rendu ta copie). Ta médiane reste à 10 (les notes du milieu), mais ta moyenne plonge à 7.5. La moyenne est très fragile face aux valeurs extrêmes ! La médiane est robuste.
            </div>
          </Accordion>
        </div>
      </Section>

      <Section title="📜 Linéarité (Le cheat code)" icon="⚡" color="rose">
        <p className="mb-4">Que se passe-t-il si le prof décide d'augmenter toutes les notes de 2 points pour être gentil ? Tu penses qu'il faut tout recalculer ? NON !</p>
        
        <FormulaBox 
          title="Propriété de Linéarité de la Moyenne" 
          formula={<>Si on transforme toute une série x en (a×x + b), <br/>alors la Nouvelle Moyenne = a × (Ancienne Moyenne) + b</>} 
        />
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Exemple : Moyenne = 11. Le prof ajoute 2. La nouvelle moyenne est direct de 13.</p>
      </Section>

      <Section title="🧠 Fréquence : la stat universelle" icon="🔦" color="purple">
         <div className="grid grid-cols-1 gap-4">
          <Flashcard 
            front={<>C'est quoi la différence entre Effectif et Fréquence ?</>}
            back={<>L'effectif compte "les têtes" (ex: "15 personnes aiment les pommes"). La fréquence, c'est le ratio sur le total (ex: "15/60, donc 0.25 soit <strong>25%</strong>").</>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Formules" icon="🕹️" color="slate">
        <p className="mb-4">A ton tour d'analyser une série :</p>
        <FillInTheBlanks 
          id="stat-eval"
          content={[
            "J'analyse les notes suivantes : 4, 12, 14, 15, 18. L'étendue est de ",
            { options: ["14", "18", "4"], correctAnswer: 0 },
            " car c'est 18 - 4. La médiane est ",
            { options: ["14", "4", "12.6"], correctAnswer: 0 },
            " car c'est la valeur EXACTEMENT au milieu de la série déjà triée. Si je rajoute un bonus de 1 à tout le monde, l'étendue ",
            { options: ["augmente de 1", "ne change pas", "diminue de 1"], correctAnswer: 1 },
            " mais la moyenne augmente de 1 !"
          ]}
        />
      </Section>

      <Section title="8. L'Atelier du Sondeur (Exercice Interactif)" icon="Brain" color="indigo">
        <InteractiveExercise 
          title="Calcul d'une moyenne avec effectifs"
          question="Dans un club, 2 personnes ont 15 ans, 3 personnes ont 16 ans et 1 personne a 20 ans. Quelle est l'âge moyen ?"
          steps={[
            <><strong>Étape 1 :</strong> On multiplie les âges par leur effectif (leur nombre) : <MathComponent math={"2 \\times 15 = 30"} />, puis <MathComponent math={"3 \\times 16 = 48"} />, puis <MathComponent math={"1 \\times 20 = 20"} />.</>,
            <><strong>Étape 2 :</strong> On additionne le tout : <MathComponent math={"30 + 48 + 20 = 98"} />. C'est la <em>somme totale</em> des âges.</>,
            <><strong>Étape 3 :</strong> On calcule l'effectif <em>total</em> (combien de personnes en tout ?) : <MathComponent math={"2 + 3 + 1 = 6"} /> personnes.</>,
            <><strong>Étape finale :</strong> On divise la somme par le nombre de personnes : <MathComponent math={"98 \\div 6 \\approx 16,33"} />. L'âge moyen est donc d'environ <strong>16,3 ans</strong> !</>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai les notes : 10, 15, 20. Quelle est la médiane ?",
              options: [
                "15",
                "10",
                "20"
              ],
              correctAnswer: 0,
              explanation: "La série est triée (10, 15, 20). Le nombre du milieu est 15."
            },
            {
              question: "Attention piège ! Médiane de la série : 15, 2, 18, 5, 20 ?",
              options: [
                "18",
                "15",
                "2"
              ],
              correctAnswer: 1,
              explanation: "ERREEUUUUR si tu as dit 18 ! Il FAUT TRIER : 2, 5, 15, 18, 20. La valeur du milieu est donc 15 !"
            },
            {
              question: "Pour calculer la moyenne d'une classe où 10 élèves ont eu 5, et 20 élèves ont eu 14, je fais :",
              options: [
                "(5 + 14) / 2",
                "(10*5 + 20*14) / 30",
                "Impossible"
              ],
              correctAnswer: 1,
              explanation: "C'est une moyenne PONDÉRÉE. Il faut multiplier chaque note par son effectif, tout additionner, et diviser par l'effectif TOTAL (10+20=30)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Toujours TRIER la série avant de chercher la médiane.",
            "L'étendue c'est bêtement (Valeur Max - Valeur Min).",
            "La Moyenne est sensible aux valeurs extrêmes, la Médiane s'en fiche.",
            "La fréquence = Effectif de la valeur / Effectif Total."
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

export default Course_Seconde_06_Statistiques;
