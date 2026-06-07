import React, { useState, useEffect } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Square, Triangle, Play, RotateCcw, Target, Sparkles } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const ShapeGame = ({ onWin }: { onWin: () => void }) => {
  const [shapes, setShapes] = useState<{ id: number, type: 'circle' | 'square' | 'triangle', color: string, popped: boolean }[]>([]);
  const [target, setTarget] = useState<'circle' | 'square' | 'triangle'>('circle');
  const [score, setScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newShapes = [];
    const types: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    
    // We want exactly 3 circles, 2 squares, 2 triangles for instance.
    let pool = ['circle', 'circle', 'circle', 'square', 'square', 'triangle', 'triangle'];
    pool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 7; i++) {
        newShapes.push({
            id: i,
            type: pool[i] as ('circle' | 'square' | 'triangle'),
            color: colors[Math.floor(Math.random() * colors.length)],
            popped: false
        });
    }
    setShapes(newShapes);
    setTarget('circle');
    setScore(0);
  };

  const handlePop = (index: number) => {
    const shape = shapes[index];
    if (shape.popped) return;

    if (shape.type === target) {
      const newShapes = [...shapes];
      newShapes[index].popped = true;
      setShapes(newShapes);
      setScore(s => {
        const newScore = s + 1;
        if (newScore === 3) {
          onWin();
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        }
        return newScore;
      });
    }
  };

  return (
    <div className="bg-card border-4 border-indigo-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-indigo-900">Jeu de l'Exploration</h4>
        <button onClick={resetGame} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
        <p className="font-bold text-indigo-800 flex items-center justify-center gap-2 text-xl">
          Touche tous les <Circle className="text-indigo-600 fill-indigo-600" /> (Ronds) !
        </p>
      </div>

      <div className="relative w-full h-64 mx-auto bg-slate-50 flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl border-2 border-slate-200">
        {shapes.map((shape, idx) => {
          return (
            <AnimatePresence key={idx}>
              {!shape.popped && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0, rotate: 90 }}
                  onClick={() => handlePop(idx)}
                  className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`Forme`}
                >
                  {shape.type === 'circle' && <Circle size={48} style={{ color: shape.color, fill: shape.color }} />}
                  {shape.type === 'square' && <Square size={48} style={{ color: shape.color, fill: shape.color }} />}
                  {shape.type === 'triangle' && <Triangle size={48} style={{ color: shape.color, fill: shape.color }} />}
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 font-bold text-xl text-slate-700">
        <Target className="text-emerald-500 w-8 h-8" /> Score : <span className={score === 3 ? "text-emerald-600" : ""}>{score} / 3</span>
      </div>
    </div>
  );
};


const Course_Maternelle_PS_01_Exploration: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/PS/01_Maternelle_PS_01_Exploration.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais reconnaître un Rond.",
    "Je sais reconnaître un Carré.",
    "Je peux chercher et attraper une forme précise."
  ];

  const handleInteractiveWin = () => {
    setGameWon(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="PS" 
        title="Maternelle PS 01 Exploration" 
        subtitle="Découvrir le monde avec ses yeux : Les premières formes !"
        level="Petite Section"
        objectives={[
          "Reconnaître le Rond (cercle).",
          "Reconnaître le Carré.",
          "Développer la coordination oeil-main en attrapant des objets."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        L'exploration est la base des mathématiques. Avant de compter, l'enfant doit savoir observer, trier, et reconnaître le monde qui l'entoure. À 3 ans, l'identification du rond et du carré est une étape primordiale pour la structuration de son cerveau !
      </InfoBlock>

      <Section title="La Théorie : Les Formes Amies" color="indigo" icon="✨">
        <p>Voici les deux amis que tu vas rencontrer partout : le Rond et le Carré !</p>
        <BentoGrid>
          <BentoCard title="Le Rond (Le Cercle)" color="amber" icon={<Circle className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
              <Circle className="w-20 h-20 text-amber-500" fill="currentColor" />
            </div>
            <p className="text-center font-bold">Il tourne, il roule, il n'a pas de piquants ! C'est comme un ballon ou le Soleil !</p>
          </BentoCard>
          
          <BentoCard title="Le Carré" color="emerald" icon={<Square className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
              <Square className="w-20 h-20 text-emerald-500" fill="currentColor" />
            </div>
            <p className="text-center font-bold">Il a 4 piquants (coins). Il est solide comme une petite boîte ou un cadeau !</p>
          </BentoCard>

          <BentoCard title="Ouvrir l'Oeil !" color="rose" icon={<Sparkles className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center items-center h-full">
              <p className="text-center font-bold text-lg">Amuse-toi à chercher des Ronds et des Carrés partout dans ta chambre !</p>
            </div>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Apprentissage par le toucher">
        Laissez l'enfant toucher les objets ! Passez son doigt sur le contour d'une assiette en disant "C'est ROND !". Le mouvement aide à mémoriser la forme.
      </InfoBlock>

      <Section title="Schéma pédagogique interactif" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">La Chasse au Trésor ! Attrape uniquement les RONDS !</p>
        <ShapeGame onWin={handleInteractiveWin} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Le cercle (le rond) est la toute première forme que les bébés arrivent à dessiner, souvent vers l'âge de 2 ans et demi ! Les carrés sont beaucoup plus durs à dessiner car il faut faire des angles aigus !
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Doit-il connaître le rectangle ou le losange ?",
            answer: "Non, pas en tout début de Petite Section. Le focus doit vraiment rester sur l'opposition Rond / Carré. Les autres formes viendront plus tard (Moyenne Section)."
          },
          {
            question: "Mon enfant s'énerve s'il n'y arrive pas, que faire ?",
            answer: "C'est normal, sa motricité fine est en développement. Guidez son doigt et félicitez le moindre essai. Le but est de s'amuser, pas de tester ses connaissances."
          },
          {
            question: "Comment poursuivre l'exercice à la maison ?",
            answer: "Une boîte à trier ! Coupez un trou rond et un trou carré dans un carton, et donnez-lui des objets pour qu'il les fasse passer dans les bons trous."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Révisons en un clic" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour voir la vraie réponse (aidez votre enfant à deviner !)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">🍕</div> Quelle est la forme de cette délicieuse pizza (entière) ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-amber-500">Un ROND !</div> Elle tourne comme un ballon !</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">🎁</div> Quelle est la forme de ce beau cadeau ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">Un CARRÉ !</div> Il a des bords bien droits !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Un petit jeu de questions pour voir si on a tout compris ! (Parents, lisez les questions à haute voix)</p>
        <Quiz questions={[
          {
            question: "Le soleil dans le ciel, il est :",
            options: ["Carré", "Rond", "Pointu"],
            correctAnswer: 1,
            explanation: "Exactement ! Le soleil est un grand ROND jaune."
          },
          {
            question: "Pour rouler, la roue de la voiture doit être :",
            options: ["Carrée, sinon ça fait des bonds", "Ronde, pour bien rouler", "En forme de triangle"],
            correctAnswer: 1,
            explanation: "Bravo ! Les roues carrées ne pourraient pas rouler ! Elles doivent être RONDES."
          },
          {
            question: "Une petite boîte avec 4 coins pointus, c'est :",
            options: [
              "Un rond",
              "Un nuage",
              "Un carré"
            ],
            correctAnswer: 2,
            explanation: "C'est bien ça ! Avec 4 petits coins (piquants), c'est un Carré."
          }
        ]} />
      </Section>

      <div onClick={() => {
        if (gameWon) { validateCourse(courseId); }
      }}>
        <InteractiveChecklist items={checklistItems} />
      </div>

    </div>
  );
};

export default Course_Maternelle_PS_01_Exploration;
