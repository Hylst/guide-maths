import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ArrowUp, ArrowDown, ArrowLeftRight } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import confetti from 'canvas-confetti';

const MazeGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // A 3x3 grid for positioning
  // EN HAUT, EN BAS, ENTRE (les deux arbres)
  const rounds = [
    { target: "EN HAUT", question: "Touche la case tout EN HAUT au milieu.", correctPos: 1 /* (row 0, col 1) */, items: [] },
    { target: "EN BAS", question: "Touche la case tout EN BAS au milieu.", correctPos: 7 /* (row 2, col 1) */, items: [] },
    { target: "ENTRE", question: "Touche la case ENTRE les deux arbres !", correctPos: 4 /* (row 1, col 1) */, 
      items: [{ pos: 3, icon: "🌲" }, { pos: 5, icon: "🌲" }] 
    }
  ];

  const handlePick = (idx: number) => {
    if (gameWon) return;
    if (rounds[level].correctPos === idx) {
      if (level === rounds.length - 1) {
        setGameWon(true);
        onWin();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setLevel(l => l + 1);
      }
    }
  };

  const reset = () => {
    setLevel(0);
    setGameWon(false);
  };

  const currentRound = rounds[level] || rounds[0];

  return (
    <div className="bg-card border-4 border-indigo-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-indigo-900">Le quadrillage magique</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
        <p className="font-bold text-indigo-800 text-lg">
          {currentRound.question}
        </p>
      </div>

      <div className="h-64 flex flex-col items-center justify-center bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl relative">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="grid grid-cols-3 gap-2 w-full h-full max-w-[200px]"
            >
              {Array.from({length: 9}).map((_, idx) => {
                const item = currentRound.items?.find(i => i.pos === idx);
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePick(idx)}
                    disabled={!!item}
                    className={`bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center text-3xl transition-colors hover:bg-indigo-100 focus:bg-indigo-200 ${item ? 'cursor-not-allowed bg-emerald-50' : ''}`}
                  >
                    {item ? item.icon : ""}
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-indigo-600"
            >
              <div className="text-6xl mb-2">🏆</div>
              <p className="font-bold text-2xl">Super ! Tu te repères très bien !</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 font-bold text-slate-400">
        Niveau {Math.min(level + 1, rounds.length)} / {rounds.length}
      </div>
    </div>
  );
};

const Course_Maternelle_GS_03_Reperes_Spatiaux: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/GS/03_Maternelle_GS_03_Reperes_Spatiaux.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais ce que veut dire EN HAUT et EN BAS.",
    "Je sais montrer ce qui est ENTRE deux choses.",
    "Je me repère dans un petit quadrillage."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="GS" 
        title="Grande Section - Repères Spatiaux" 
        subtitle="En haut, En bas, Entre : Je me repère partout !"
        level="Grande Section"
        objectives={[
          "Se repérer sur un plan vertical (en haut, en bas).",
          "Comprendre la position 'Entre'.",
          "Débuter le repérage sur quadrillage."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La Grande Section marque le passage de l'espace vécu (avec son corps) à l'espace représenté (sur la feuille). La maîtrise des termes "En haut" et "En bas" est essentielle pour aborder l'écriture (où l'on monte pour écrire un l, et l'on descend pour un p).
      </InfoBlock>

      <Section title="La Théorie : Les nouvelles positions" color="indigo" icon="✨">
        <p>Aujourd'hui on apprend où sont posées les choses sur une feuille ou une étagère !</p>
        <BentoGrid>
          <BentoCard title="EN HAUT" color="rose" icon={<ArrowUp className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 h-24 items-start border-b-2 border-slate-200">
               <div className="text-5xl -mt-2">☁️</div>
            </div>
            <p className="text-center font-bold text-sm">Le nuage est TOUT EN HAUT du ciel !</p>
          </BentoCard>
          
          <BentoCard title="EN BAS" color="emerald" icon={<ArrowDown className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 h-24 items-end border-t-2 border-slate-200">
               <div className="text-5xl -mb-2">🌱</div>
            </div>
            <p className="text-center font-bold text-sm">L'herbe pousse TOUT EN BAS sur le sol !</p>
          </BentoCard>

          <BentoCard title="ENTRE" color="amber" icon={<ArrowLeftRight className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 h-24 items-center gap-2">
               <div className="text-4xl">🌳</div>
               <div className="text-4xl animate-bounce">🐿️</div>
               <div className="text-4xl">🌳</div>
            </div>
            <p className="text-center font-bold text-sm">L'écureuil est au milieu, ENTRE les deux arbres !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce pour bien s'en souvenir">
        Pour "Entre", c'est comme le jambon dans un sandwich : il est coincé ENTRE deux morceaux de pain !
      </InfoBlock>

      <Section title="Exercice Interactif : Le quadrillage" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Appuie sur la bonne case du quadrillage.</p>
        <MazeGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Et la gauche et la droite ?">
        La distinction entre gauche et droite est très complexe. En Grande Section, on commence juste en disant "La main qui écrit" (pour les droitiers) ou par une gommette sur la main gauche, mais ce n'est pas grave de se tromper !
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Mon enfant confond 'sur' et 'en haut', pourquoi ?",
            answer: "'Sur' implique un contact (le livre est sur la table). 'En haut' est une direction de l'espace (l'oiseau vole en haut dans le ciel, mais il n'est 'sur' rien). C'est normal de confondre au début !"
          },
          {
            question: "Pourquoi travailler sur un quadrillage ?",
            answer: "Cela le prépare aux mathématiques, à la géométrie mais aussi à la lecture (les lignes de cahier, les tableaux à double entrée)."
          }
        ]} />
      </Section>

      <Section title="Flashcards : À toi de jouer !" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour voir la réponse !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[3rem] text-center">☀️</div> Le soleil brille, mais où est-il dans le ciel ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-amber-500">EN HAUT !</div> Il est très très haut.</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[2rem] text-center border-x-4 border-slate-700 px-4 inline-block font-bold">O</div> Je suis le O. Je suis coincé ___ les deux murs. Le mot manquant est ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">ENTRE !</div> La lettre O est au milieu, ENTRE les bords !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">As-tu l'œil du tigre ?</p>
        <Quiz questions={[
          {
            question: "Dans un sandwich, le fromage est :",
            options: ["En haut du pain", "ENTRE les deux pains", "À côté du pain"],
            correctAnswer: 1,
            explanation: "Bravo ! Le fromage est au milieu, il est coincé ENTRE les pains."
          },
          {
            question: "Quand tu dessines un arbre sur ta feuille, l'herbe doit être dessinée :",
            options: ["TOUT EN BAS", "TOUT EN HAUT", "Entre l'arbre"],
            correctAnswer: 0,
            explanation: "C'est exact ! L'herbe est au sol, donc on la dessine souvent EN BAS de la feuille."
          },
          {
            question: "Les oiseaux dans le ciel de ton dessin doivent être :",
            options: [
              "Entre la maison",
              "EN HAUT",
              "En Bas"
            ],
            correctAnswer: 1,
            explanation: "Oui ! Les oisaux volent haut, on les place donc EN HAUT de la feuille."
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_GS_03_Reperes_Spatiaux;
