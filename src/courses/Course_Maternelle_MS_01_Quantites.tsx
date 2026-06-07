import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Box, Equal, Plus, Minus, Triangle, Square, Circle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const ComparisonGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // levels => "Find the correct one"
  const rounds = [
    { target: "PLUS DE", question: "Qui a PLUS de ronds ?", options: [{ id: 1, count: 2 }, { id: 2, count: 5 }], correct: 2 },
    { target: "MOINS DE", question: "Qui a MOINS de carrés ?", options: [{ id: 1, count: 4 }, { id: 2, count: 1 }], correct: 2 },
    { target: "AUTANT DE", question: "Trouve la boîte qui a AUTANT de triangles que le modèle (3).", options: [{ id: 1, count: 3 }, { id: 2, count: 2 }, { id: 3, count: 5 }], correct: 1 }
  ];

  const handlePick = (id: number) => {
    if (gameWon) return;
    if (rounds[level].correct === id) {
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
  const Icon = level === 0 ? Circle : (level === 1 ? Square : Triangle);
  const colorClass = level === 0 ? 'text-rose-500 fill-rose-500' : (level === 1 ? 'text-emerald-500 fill-emerald-500' : 'text-amber-500 fill-amber-500');

  return (
    <div className="bg-card border-4 border-emerald-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-emerald-900">Le jeu des Quantités</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <p className="font-bold text-emerald-800 text-lg">
          {currentRound.question}
        </p>
      </div>

      <div className="h-64 flex items-center justify-center gap-4 sm:gap-8 bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex items-center gap-4 sm:gap-8"
            >
              {currentRound.options.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePick(opt.id)}
                  className="bg-white rounded-xl shadow-md border-b-4 border-slate-200 flex flex-wrap content-center justify-center w-32 h-32 p-4 pt-5 gap-2"
                >
                  {Array.from({length: opt.count}).map((_, i) => (
                    <Icon key={i} size={24} className={colorClass} strokeWidth={1} />
                  ))}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-emerald-600"
            >
              <Equal size={64} className="mb-2" />
              <p className="font-bold text-2xl">Excellent ! Tu as compris !</p>
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

const Course_Maternelle_MS_01_Quantites: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/MS/01_Maternelle_MS_01_Quantites.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais reconnaître quand il y en a PLUS.",
    "Je sais reconnaître quand il y en a MOINS.",
    "Je sais voir quand il y a PAREIL (autant)."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="MS" 
        title="Moyenne Section - Quantités" 
        subtitle="Plus que, moins que, autant que : La guerre des bonbons !"
        level="Moyenne Section"
        objectives={[
          "Comparer visuellement des collections d'objets.",
          "Comprendre le vocabulaire de comparaison : plus, moins, autant.",
          "Faire correspondre terme à terme (1 pour 1)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Après avoir appris les premiers nombres, l'enfant doit maintenant comparer des collections. Ce n'est pas parce qu'une collection prend plus de place qu'elle contient plus d'objets ! Le concept de « Plus », « Moins » ou « Autant » (égalité) est une notion mathématique fondamentale pour l'addition future.
      </InfoBlock>

      <Section title="La Théorie : Comparons !" color="indigo" icon="✨">
        <p>Qui aura le plus de bonbons ? Comparons ensemble !</p>
        <BentoGrid>
          <BentoCard title="PLUS (+)" color="emerald" icon={<Plus className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center flex-wrap gap-1 my-4">
               {Array.from({length: 5}).map((_, i) => <div key={i} className="w-8 h-8 rounded-full bg-emerald-500"></div>)}
            </div>
            <p className="text-center font-bold">Ici il y a PLUS de jetons ! C'est la grosse montagne.</p>
          </BentoCard>
          
          <BentoCard title="MOINS (-)" color="rose" icon={<Minus className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center flex-wrap gap-1 my-4 h-[72px] items-center">
               {Array.from({length: 2}).map((_, i) => <div key={i} className="w-8 h-8 rounded-full bg-rose-500"></div>)}
            </div>
            <p className="text-center font-bold">Ici, il y en a MOINS ! La petite montagne.</p>
          </BentoCard>

          <BentoCard title="AUTANT (=)" color="amber" icon={<Equal className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center flex-col gap-2 my-4 items-center">
               <div className="flex gap-2">
                 {Array.from({length: 3}).map((_, i) => <div key={i} className="w-6 h-6 rounded-full bg-emerald-500"></div>)}
               </div>
               <Equal className="text-slate-400"/>
               <div className="flex gap-2">
                 {Array.from({length: 3}).map((_, i) => <div key={i} className="w-6 h-6 rounded-full bg-rose-500"></div>)}
               </div>
            </div>
            <p className="text-center font-bold">C'est PAREIL ! Il y en a juste AUTANT.</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce pour comparer">
        Pour vérifier s'il y a PAREIL, on peut faire des couples (correspondance terme à terme) : "Un jeton vert pour un jeton rouge". S'il n'y a pas de jaloux et qu'il ne reste rien, c'est 'Autant' !
      </InfoBlock>

      <Section title="Schéma interactif : Le jeu des Quantités" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Retrouve la boîte qui a plus, moins, ou autant de choses !</p>
        <ComparisonGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Les mots "Autant que" sont souvent les plus difficiles à comprendre pour un enfant de 4 ans. Ils préfèrent dire "pareil", ce qui est très bien pour commencer !
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Faut-il utiliser les signes mathématiques <, >, = ?",
            answer: "Surtout pas ! Ces signes sont beaucoup trop abstraits en Moyenne Section. On utilise uniquement le vocabulaire oral et des manipulations visuelles."
          },
          {
            question: "Mon enfant se trompe si les objets sont éparpillés, pourquoi ?",
            answer: "Il se fie à l'encombrement spatial ! Si 3 jetons sont très espacés, il croira qu'il y en a plus que 5 jetons très serrés. C'est normal (stade de Piaget), aidez-le en les alignant face à face."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Devine Vite !" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour vérifier !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-3xl font-bold flex justify-center gap-8 border-b pb-4"><span className="text-[4rem]">🍎</span><span className="text-[4rem]">🍎🍎</span></div>Où y a-t-il PLUS de pommes ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">À droite !</div> Il y a 2 pommes, c'est PLUS que 1 pomme.</>}
          />
          <Flashcard 
            front={<><div className="mb-2 text-3xl font-bold flex justify-center gap-4"><span className="text-[3rem]">🚲</span> VS <span className="text-[3rem]">🚗</span></div> Qui a le MOINS de roues ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-rose-500">Le vélo !</div> Il n'a que 2 roues, la voiture en a 4. C'est moins !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Voyons ce qu'on a retenu !</p>
        <Quiz questions={[
          {
            question: "J'ai 3 bonbons. Tu as 3 bonbons. On a :",
            options: ["Moins de bonbons", "Autant de bonbons (pareil)", "Plus de bonbons"],
            correctAnswer: 1,
            explanation: "Bravo ! On a la même quantité, donc on a 'Autant de bonbons'."
          },
          {
            question: "Tu as beaucoup faim. Tu veux :",
            options: ["Moins de frites", "Autant de frites", "PLUS de frites"],
            correctAnswer: 2,
            explanation: "Oui ! Quand on a faim, on veut 'PLUS' !"
          },
          {
            question: "Si tu manges 2 biscuits, tu en auras :",
            options: [
              "Moins qu'avant",
              "Plus qu'avant",
              "Pareil"
            ],
            correctAnswer: 0,
            explanation: "Astucieux ! Comme tu les as mangés, il en reste 'Moins' dans le paquet !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_MS_01_Quantites;
