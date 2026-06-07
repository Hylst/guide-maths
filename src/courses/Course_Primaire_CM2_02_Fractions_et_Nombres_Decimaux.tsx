import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Plus, Minus, Sparkles } from 'lucide-react';

const Course_Primaire_CM2_02_Fractions_et_Nombres_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(4);

  const incrementNum = () => {
    if (num < den) setNum(num + 1);
  };
  const decrementNum = () => {
    if (num > 0) setNum(num - 1);
  };
  const incrementDen = () => {
    if (den < 10) setDen(den + 1);
  };
  const decrementDen = () => {
    if (den > 2) {
      const newDen = den - 1;
      setDen(newDen);
      if (num > newDen) {
        setNum(newDen);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CM2-FRAC"
        title="Fractions et Décimaux"
        subtitle="Découper des pizzas et comprendre ce qui se cache derrière la virgule."
        duration="40 min"
      />

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : La pizza coupée !
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          As-tu déjà essayé de partager un gâteau, une tablette de chocolat ou une pizza en parts égales avec tes copains ? Dès que l'on commence à couper ou briser un objet entier en morceaux, les nombres entiers normaux (1, 2, 3...) ne suffisent plus.
          C'est là que les <strong>Fractions</strong> entrent en scène ! Elles décrivent des morceaux parfaits d'un objet entier. Et savais-tu qu'une autre façon super rapide d'écrire ces fractions est d'utiliser la fameuse <strong>virgule</strong> ? Allons faire un tour de découpage de pizzas et découvrons ce mystère !
        </p>
      </div>

      <Section title="⚠️ Les Fractions (Les Parts de Pizza)" icon="🍕" color="emerald">
        <p className="mb-4">
          Une fraction sert à représenter quelque chose qui n'est pas entier. Si tu prends un gâteau et que tu le coupes, tu utilises des fractions !
        </p>
        <InfoBlock type="definition" title="Le Haut et le Bas">
          - <strong>Le Dénominateur (en BAS)</strong> : Il dit en combien de parts TOTALES on a découpé le gâteau (il donne le 'nom' de la part : des demis, des tiers, des quarts).<br/>
          - <strong>Le Numérateur (en HAUT)</strong> : Il dit combien de parts tu as mangées (Le Numéro de parts).<br/>
          Exemple : 3/4 = J'ai coupé en 4, j'en prends 3.
        </InfoBlock>

        {/* Fraction Visualizer Widget */}
        <div className="bg-gradient-to-br from-emerald-50/50 to-slate-50 dark:from-slate-900/40 dark:to-slate-950 border border-emerald-100 dark:border-emerald-950/60 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-500 animate-spin-slow" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Le Labo des Fractions : Découpe ta Tablette</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6">Fais grandir ou rétrécir le nombre de parts colorées en vert (Numérateur) et le nombre total de découpes (Dénominateur) !</p>

          <div className="w-full max-w-sm flex items-center justify-around gap-6 mb-8">
            {/* Numerator Controls */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-400 mb-1">Parts Choisies</span>
              <div className="flex items-center gap-2">
                <button onClick={decrementNum} disabled={num <= 0} className="p-1 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-lg shadow-sm text-xs font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-white">-</button>
                <span className="font-mono text-xl font-black w-6 text-center text-emerald-600">{num}</span>
                <button onClick={incrementNum} disabled={num >= den} className="p-1 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-lg shadow-sm text-xs font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-white">+</button>
              </div>
              <span className="text-xs font-bold text-slate-500 mt-1">(Numérateur)</span>
            </div>

            {/* Fraction line visual */}
            <div className="flex flex-col items-center font-mono text-3xl font-black">
              <span className="text-emerald-600">{num}</span>
              <div className="w-12 h-1 bg-slate-400 dark:bg-slate-600 my-1 rounded" />
              <span className="text-slate-700 dark:text-slate-300">{den}</span>
            </div>

            {/* Denominator Controls */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-400 mb-1">Découpes Totales</span>
              <div className="flex items-center gap-2">
                <button onClick={decrementDen} disabled={den <= 2} className="p-1 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-lg shadow-sm text-xs font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-white">-</button>
                <span className="font-mono text-xl font-black w-6 text-center text-slate-700 dark:text-slate-300">{den}</span>
                <button onClick={incrementDen} disabled={den >= 10} className="p-1 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-lg shadow-sm text-xs font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-white">+</button>
              </div>
              <span className="text-xs font-bold text-slate-500 mt-1">(Dénominateur)</span>
            </div>
          </div>

          {/* SVG Fraction Bar */}
          <div className="w-full max-w-md bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-250 dark:border-slate-700 shadow-sm mb-4">
            <svg viewBox="0 0 320 60" className="w-full h-auto select-none">
              {/* Draw background container */}
              <rect x="5" y="5" width="310" height="50" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-850" />
              {/* Draw segments */}
              {Array.from({ length: den }).map((_, idx) => {
                const segWidth = 310 / den;
                const isSelected = idx < num;
                return (
                  <rect
                    key={idx}
                    x={5 + idx * segWidth}
                    y="5"
                    width={segWidth}
                    height="50"
                    fill={isSelected ? "#10b981" : "transparent"}
                    fillOpacity={isSelected ? "0.85" : "0"}
                    stroke="#e2e8f0"
                    strokeWidth="2"
                    className="transition-all duration-300 dark:stroke-slate-800"
                  />
                );
              })}
            </svg>
          </div>

          <div className="text-center font-semibold text-slate-700 dark:text-slate-300 text-sm">
            Valeur décimale (virgule) : 
            <span className="ml-2 font-mono text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
              {den === 0 ? "0" : (num / den).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </Section>

      <Section title="⚖️ Passer de la Fraction à la Virgule" icon="📏" color="indigo">
        <p className="mb-4">
          Certaines fractions sont tellement utilisées qu'on a inventé les nombres <strong>décimaux</strong> (avec une virgule) pour les écrire sur une seule ligne plus facilement.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-4 text-indigo-950 dark:text-indigo-50">
          <p className="font-bold mb-2">Le club des Fractions Décimales (sur 10, 100...)</p>
          <ul className="text-sm list-disc pl-4 space-y-1">
            <li>Un dixième (1/10) : c'est <strong>0,1</strong> (1 chiffre après la virgule).</li>
            <li>Un centième (1/100) : c'est <strong>0,01</strong> (2 chiffres après la virgule).</li>
            <li>Un millième (1/1000) : c'est <strong>0,001</strong> (3 chiffres après la virgule).</li>
          </ul>
        </div>
        <p className="text-sm mt-2 text-indigo-900 dark:text-indigo-100">
          Astuce : Si tu vois "25/100", tu entends centièmes (donc 2 chiffres après la virgule), tu écris : <strong>0,25</strong> !
        </p>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le nombre 3,5 est plus grand que 3,45 parce que 5 est plus petit que 45.</>}
            back={<><strong>FAUX ! (Piège mortel !)</strong><br/><span className="text-sm">En réalité 3,5 c'est la même chose que 3,50 ! Et 50 est bien plus grand que 45. Le "5" de 3,5 ce sont des Dixièmes. Le "4" de 3,45, ce sont aussi de Dixièmes. On compare les dixièmes en premier : 5 gagne contre 4.</span></>}
          />
          <Flashcard 
            front={<>Une fraction avec le même nombre en haut et en bas (exemple : 4/4) vaut toujours 1.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Si tu coupes un gâteau en 4 parts (dénominateur) et que tu manges les 4 parts (numérateur)... bah tu as mangé 1 gâteau entier ! C'est la règle d'or : <><MathComponent math={"N/N = 1"} /></>.</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Deviner le Décimal"
          question={<p>Transforme la fraction <><MathComponent math={"\\frac{345}{100}"} /></> en nombre décimal.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Regarder le diviseur (en bas)</p>
              <p>On divise par 100. Il y a 2 zéros, donc il y aura 2 chiffres derrière la virgule.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Placer la virgule</p>
              <p>On prend le nombre du haut : 345. On place la virgule pour laisser 2 chiffres sur la droite.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le nombre décimal est <><MathComponent math={"3,45"} /></> (Trois unités et 45 centièmes).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Comparer des fractions simples"
          question={<p>Lequel est le plus grand : <><MathComponent math={"\\frac{1}{2}"} /></> ou <><MathComponent math={"\\frac{1}{4}"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Visualisation de la pizza</p>
              <p>1/2 c'est couper la pizza au milieu. Ça fait d'énormes moitiés. 1/4 c'est la couper en croix pour 4 personnes. Ça fait de plus petites parts.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Donc <><MathComponent math={"\\frac{1}{2}"} /></> (la moitié) est plus grand que <><MathComponent math={"\\frac{1}{4}"} /></> (le quart). Piège : Le 4 en bas est plus grand, mais ça veut dire qu'on a découpé EN PLUS DE MORCEAUX, donc les morceaux sont PLUS PETITS !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Le vocabulaire des fractions :</p>
        <FillInTheBlanks 
          id="cm2-frac-eval"
          content={[
            "Dans la fraction 5/8. Le nombre 8 (qui nomme la part) s'appelle le ",
            { options: ["Numérateur", "Dénominateur", "Diviseur"], correctAnswer: 1 },
            ". \nLe nombre 5 (qui indique combien j'en prends) s'appelle le ",
            { options: ["Numérateur", "Dénominateur", "Reste"], correctAnswer: 0 },
            ". \nEt pour le nombre décimal 0,5... sa fraction équivalente bien connue est la moitié, qui s'écrit ",
            { options: ["1/4", "1/2", "1/10"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Combien ça fait 0,1 + 0,2 + 0,7 ?",
              options: [
                "0,10",
                "1",
                "0,9"
              ],
              correctAnswer: 1,
              explanation: "1 dixième + 2 dixièmes + 7 dixièmes = 10 dixièmes (10/10). Et 10/10, c'est égal à 1 (Le paquet entier) !"
            },
            {
              question: "Si j'écris 12,04. Le chiffre '4' représente quoi ?",
              options: [
                "Des unités",
                "Des dixièmes",
                "Des centièmes"
              ],
              correctAnswer: 2,
              explanation: "On passe la virgule : le 0 est à la place des Dixièmes. Le 4 est placé après, à la deuxième place. C'est donc la place des Centièmes (1/100)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais le haut (Numérateur) et le bas (Dénominateur).",
            "Méfiance pour l'ordre virgule : 1,5 = 1,50 (on peut toujours ajouter un zéro invisible).",
            "1/10 = 0,1 ; 1/100 = 0,01 ; 1/1000 = 0,001.",
            "Des zéros tout à la fin derrière la virgule sont dits 'inutiles' (2,400 = 2,4)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM2_02_Fractions_et_Nombres_Decimaux;
