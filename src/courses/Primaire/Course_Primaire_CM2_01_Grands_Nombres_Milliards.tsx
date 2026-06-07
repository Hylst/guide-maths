import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sparkles, ArrowRight, Eye, ShieldAlert } from 'lucide-react';

const Course_Primaire_CM2_01_Grands_Nombres_Milliards: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [activeClass, setActiveClass] = useState<'milliards' | 'millions' | 'mille' | 'unites'>('millions');

  const getHighlightStyle = (cls: typeof activeClass) => {
    return activeClass === cls
      ? "stroke-orange-500 stroke-[3px] fill-orange-50/10"
      : "stroke-slate-300 stroke-[1px] fill-transparent hover:stroke-indigo-400 hover:fill-indigo-50/5 cursor-pointer";
  };

  const classInfo = {
    milliards: {
      title: "Chiffres des Milliards",
      digits: "124",
      role: "Représente les paquets de 1 000 000 000.",
      tip: "Pour t'imaginer, 1 milliard de secondes, c'est presque 32 ans d'attente !"
    },
    millions: {
      title: "Chiffres des Millions",
      digits: "506",
      role: "Représente les paquets de 1 000 000.",
      tip: "Il y a 6 zéros après le chiffre des unités de millions (ex: 1 000 000)."
    },
    mille: {
      title: "Chiffres des Milliers (Mille)",
      digits: "789",
      role: "Représente les paquets de 1 000.",
      tip: "Le mot 'mille' est magique et invariable. Ne lui écris jamais de -s !"
    },
    unites: {
      title: "Chiffres des Unités Simples",
      digits: "012",
      role: "Ce sont les unités, dizaines et centaines classiques de base.",
      tip: "Ici le zéro sert à marquer la place des centaines absentes pour lire 'douze'."
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CM2-MIL"
        title="Les Grands Nombres"
        subtitle="Lire, écrire et comparer les millions et les milliards."
        duration="30 min"
      />

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Le vertige des étoiles
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          Jusqu'à présent, tu es devenu le roi des milliers. Mais savais-tu que la Terre abrite plus de <strong>8 milliards</strong> d'êtres humains ? Et que pour voyager de la Terre au Soleil, la lumière doit parcourir environ <strong>150 millions</strong> de kilomètres ?
          Pour manipuler ces nombres incroyablement immenses, nous avons besoin de nouveaux tiroirs dans notre cerveau : la classe des <strong>Millions</strong> et la classe des <strong>Milliards</strong>. Découvrons ensemble comment dompter ces monstres géants grâce aux espaces magiques !
        </p>
      </div>

      <Section title="⚠️ Les Classes de Nombres" icon="🌍" color="emerald">
        <p className="mb-4">
          Pour lire un nombre géant, on le découpe en groupes de 3 chiffres en partant de la droite. Chaque groupe de 3 s'appelle une <strong>Classe</strong>.
        </p>
        
        {/* Interactive SVG Schema */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-slate-900/30 dark:to-slate-950 border border-indigo-150/40 dark:border-indigo-950 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-bounce" />
            <h4 className="font-extrabold text-indigo-950 dark:text-indigo-50 text-sm">Schéma Interactif : Les Tiroirs Magiques</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6">Clique sur les tiroirs du tableau pour faire briller une classe de nombres et découvrir son secret !</p>

          <div className="w-full max-w-lg mb-6">
            <svg viewBox="0 0 460 160" className="w-full h-auto select-none font-sans">
              {/* Definitions Grid Columns */}
              {/* Section 1: Milliards */}
              <g onClick={() => setActiveClass('milliards')}>
                <rect x="15" y="15" width="100" height="110" rx="8" className={`transition-all duration-300 ${getHighlightStyle('milliards')}`} />
                <text x="65" y="38" fontSize="11" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Milliards</text>
                <text x="65" y="85" fontSize="24" fontWeight="black" fill="#f43f5e" textAnchor="middle" letterSpacing="2">124</text>
              </g>

              {/* Section 2: Millions */}
              <g onClick={() => setActiveClass('millions')}>
                <rect x="125" y="15" width="100" height="110" rx="8" className={`transition-all duration-300 ${getHighlightStyle('millions')}`} />
                <text x="175" y="38" fontSize="11" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Millions</text>
                <text x="175" y="85" fontSize="24" fontWeight="black" fill="#f59e0b" textAnchor="middle" letterSpacing="2">506</text>
              </g>

              {/* Section 3: Mille */}
              <g onClick={() => setActiveClass('mille')}>
                <rect x="235" y="15" width="100" height="110" rx="8" className={`transition-all duration-300 ${getHighlightStyle('mille')}`} />
                <text x="285" y="38" fontSize="11" fontWeight="bold" fill="#3b82f6" textAnchor="middle">Mille</text>
                <text x="285" y="85" fontSize="24" fontWeight="black" fill="#3b82f6" textAnchor="middle" letterSpacing="2">789</text>
              </g>

              {/* Section 4: Unites */}
              <g onClick={() => setActiveClass('unites')}>
                <rect x="345" y="15" width="100" height="110" rx="8" className={`transition-all duration-300 ${getHighlightStyle('unites')}`} />
                <text x="395" y="38" fontSize="11" fontWeight="bold" fill="#10b981" textAnchor="middle">Unités</text>
                <text x="395" y="85" fontSize="24" fontWeight="black" fill="#10b981" textAnchor="middle" letterSpacing="2">012</text>
              </g>

              {/* Connector dots indicative spacing */}
              <circle cx="120" cy="80" r="1.5" fill="#94a3b8" />
              <circle cx="230" cy="80" r="1.5" fill="#94a3b8" />
              <circle cx="340" cy="80" r="1.5" fill="#94a3b8" />
            </svg>
          </div>

          <div className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-3 h-3 rounded-full ${
                activeClass === 'milliards' ? 'bg-rose-500' : 
                activeClass === 'millions' ? 'bg-amber-500' : 
                activeClass === 'mille' ? 'bg-blue-500' : 'bg-emerald-500'
              }`} />
              <h5 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">
                {classInfo[activeClass].title} : <span className="font-mono text-base ml-1">{classInfo[activeClass].digits}</span>
              </h5>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-350">{classInfo[activeClass].role}</p>
            <div className="mt-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-2.5 text-xs italic text-slate-500 dark:text-slate-400">
              💡 {classInfo[activeClass].tip}
            </div>
          </div>

          <p className="text-center font-semibold text-slate-700 dark:text-slate-350 text-sm mt-6">
            Lecture complète : <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">"Cent-vingt-quatre milliards, cinq-cent-six millions, sept-cent-quatre-vingt-neuf mille, douze"</span>
          </p>
        </div>
      </Section>

      <Section title="⚖️ Écriture et Espace" icon="✍️" color="indigo">
        <p className="mb-4">
          Quand on écrit un très grand nombre (ex: population d'un pays, prix d'une fusée), on ne met JAMAIS de points entre les milliers en France. On met un <strong>Espace</strong> !
        </p>
        <InfoBlock type="warning" title="Jamais de point !">
          Écrire "1.000.000" est une notation anglaise ou américaine (où le point remplace notre virgule !). En France on écrit "1 000 000". Ça évite les confusions avec les nombres à virgule.
        </InfoBlock>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le nombre 300 000 s'écrit "trois cent mille".</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Cent prend un "s" si il est multiplié et qu'il n'y a rien derrière (trois cents). MAIS ici il y a "mille" derrière. Et "mille" est totalement invariable (jamais de 's') et il casse le 's' de cent ! Donc "trois cent mille".</span></>}
          />
          <Flashcard 
            front={<>Dans le nombre 45 678, le "5" est le chiffre des dizaines de mille.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">On compte à partir de la droite (8=U, 7=D, 6=C). Puis on passe aux Mille (5=Unités de mille, 4=Dizaines de mille). Le 5 est le chiffre des Unités de Mille.</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver la valeur d'un chiffre"
          question={<p>Dans le nombre <><MathComponent math={"12 \\ 456 \\ 789"} /></>, que représente le chiffre 2 ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Découper par blocs de 3 en partant de la droite</p>
              <p>On a "789" (les unités simples). Puis "456" (les milliers). Puis "12" (les millions).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Analyser le bloc du '2'</p>
              <p>Le 2 fait partie du bloc "12", qui est le bloc des Millions. Dans ce bloc, le 2 est à la première place en partant de la droite (la place des unités).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le 2 est donc le <strong>Chiffre des Unités de Millions</strong>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Comparaisons géantes"
          question={<p>Quel est le plus grand : <><MathComponent math={"4 \\ 567 \\ 890"} /></> ou <><MathComponent math={"4 \\ 568 \\ 000"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Compter le nombre total de chiffres</p>
              <p>Les deux nombres ont exactement 7 chiffres (ils vont jusqu'aux Unités de Millions). C'est une égalité pour l'instant.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Comparer de Gauche à Droite (du plus fort au plus faible)</p>
              <p>Millions : 4 = 4. <br/>Centaines de mille : 5 = 5. <br/>Dizaines de mille : 6 = 6. <br/>Unités de mille : 7 contre 8 !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le 8 gagne. Donc <><MathComponent math={"4 \\ 568 \\ 000 > 4 \\ 567 \\ 890"} /></>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Complète ces règles de lecture :</p>
        <FillInTheBlanks 
          id="cm2-mil-eval"
          content={[
            "Un Milliard est composé d'un 1 suivi de ",
            { options: ["6 zéros", "9 zéros", "12 zéros"], correctAnswer: 1 },
            ". \nC'est la classe juste après les ",
            { options: ["dizaines", "milliers", "millions"], correctAnswer: 2 },
            ". \nPour être lisible, on regroupe toujours les chiffres par paquets de ",
            { options: ["2", "3", "4"], correctAnswer: 1 },
            " en séparant par un Espace ! "
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ajoute 1 à 'Neuf cent quatre-vingt-dix-neuf millions neuf cent quatre-vingt-dix-neuf mille neuf cent quatre-vingt-dix-neuf' (999 999 999), j'obtiens :",
              options: [
                "Un trilliard",
                "Un milliard",
                "Dix millions"
              ],
              correctAnswer: 1,
              explanation: "Toutes les colonnes débordent avec de la retenue. On passe de 999 Millions à 1000 Millions... ce qui s'appelle Un Milliard (1 000 000 000) !"
            },
            {
              question: "Comment s'écrit 'Trois millions vingt-cinq' en chiffres ?",
              options: [
                "3 250 000",
                "3 025",
                "3 000 025"
              ],
              correctAnswer: 2,
              explanation: "La classe des millions a son '3'. La classe des milliers (mille) n'est pas prononcée du tout, donc c'est 000 ! Et la classe des unités c'est juste 025."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle des paquets de 3 (de la Droite vers la Gauche !).",
            "On écrit avec des espaces, jamais des points.",
            "L'ordre des classes : Unités -> Mille -> Millions -> Milliards.",
            "Mille est hyper résistant, il ne prend JAMAIS de 'S'."
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

export default Course_Primaire_CM2_01_Grands_Nombres_Milliards;
