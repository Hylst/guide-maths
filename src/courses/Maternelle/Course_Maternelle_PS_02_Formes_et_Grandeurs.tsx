import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Box, ArrowUpFromLine, Scaling } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import confetti from 'canvas-confetti';

const SizeGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const rounds = [
    { target: 'grand', options: [{ id: 1, size: 50 }, { id: 2, size: 100 }], correct: 2 },
    { target: 'petit', options: [{ id: 1, size: 40 }, { id: 2, size: 80 }, { id: 3, size: 120 }], correct: 1 },
    { target: 'grand', options: [{ id: 1, size: 60 }, { id: 2, size: 150 }, { id: 3, size: 90 }], correct: 2 }
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

  return (
    <div className="bg-card border-4 border-emerald-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-emerald-900">Le jeu des Tailles</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <p className="font-bold text-emerald-800 text-xl">
          Touche le plus <strong className="uppercase text-emerald-900 underline">{currentRound.target}</strong> !
        </p>
      </div>

      <div className="h-48 flex items-end justify-center gap-8 bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex items-end gap-8"
            >
              {currentRound.options.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePick(opt.id)}
                  className="bg-emerald-500 rounded-xl shadow-lg border-b-4 border-emerald-700 flex items-center justify-center text-white"
                  style={{ width: opt.size, height: opt.size }}
                >
                  <Box className="opacity-50" size={opt.size * 0.5} />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-emerald-600"
            >
              <Scaling size={64} className="mb-2" />
              <p className="font-bold text-2xl">Super ! Tu connais les tailles !</p>
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

const Course_Maternelle_PS_02_Formes_et_Grandeurs: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/PS/02_Maternelle_PS_02_Formes_et_Grandeurs.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais montrer ce qui est 'Grand'.",
    "Je sais montrer ce qui est 'Petit'.",
    "Je peux comparer deux objets pour trouver le plus gros."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="PS" 
        title="Maternelle PS 02 - Formes et Grandeurs" 
        subtitle="Petit ours ou Grand ours ? Apprendre à comparer les tailles !"
        level="Petite Section"
        objectives={[
          "Acquérir les notions de 'Grand' et 'Petit'.",
          "Comparer visuellement la taille de plusieurs objets.",
          "Utiliser le vocabulaire adapté pour décrire une taille."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Vers 3 ans, l'enfant est capable de faire la différence entre deux éléments très contrastés. En utilisant des mots clairs comme « Petit » et « Grand », on l'aide à structurer sa pensée et son raisonnement mathématique.
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : Les objets de comparaison du quotidien">
        Pour ancrer ces grandeurs fondamentales dans le réel, utilisez des objets que l&apos;enfant peut manipuler directement : doudous de différentes tailles, assiettes de la maison ou chaussures familiales. L&apos;expérience sensorielle précède toujours l&apos;abstraction géométrique !
      </InfoBlock>

      <Section title="La Théorie : Grand et Petit" color="indigo" icon="📏">
        <p>Regarde autour de toi, certaines choses sont toutes petites et d'autres sont géantes !</p>
        <BentoGrid>
          <BentoCard title="C'est Petit" color="amber" icon={<ArrowUpFromLine className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 items-end h-24">
              <div className="bg-amber-400 w-12 h-12 rounded-lg border-b-4 border-amber-600"></div>
            </div>
            <p className="text-center font-bold">Un petit cube, une petite souris, un petit pois ! Ça rentre dans la main.</p>
          </BentoCard>
          
          <BentoCard title="C'est GRAND !" color="emerald" icon={<ArrowUpFromLine className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 items-end h-24">
              <div className="bg-emerald-500 w-24 h-24 rounded-lg border-b-4 border-emerald-700"></div>
            </div>
            <p className="text-center font-bold">Un grand arbre, un grand éléphant, un grand immeuble ! C'est majestueux.</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce du quotidien">
        Demandez-lui : « Tu veux la petite cuillère ou la GRANDE cuillère ? » - « Oh, regarde le grand chien à côté du petit chien ! ». C'est en expérimentant que l'enfant comprend.
      </InfoBlock>

      <Section title="Exercice Interactif : Le jeu des Tailles" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Ouvre bien les yeux et touche la bonne boîte !</p>
        <SizeGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Les enfants pensent souvent que si on coupe un biscuit en deux petits morceaux, il y en a « plus » que quand le biscuit était grand ! Mais en grandissant, la notion de taille ne les trompera plus.
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Mon enfant confond 'Grand' et 'Gros', est-ce grave ?",
            answer: "Absolument pas ! À cet âge, ces concepts sont très proches. L'important est d'associer un volume imposant à un vocabulaire adapté. Vous introduirez la différence ('Grand' pour la hauteur, 'Gros' pour le volume) plus tard."
          },
          {
            question: "Et la notion 'Moyen' ?",
            answer: "Elle est beaucoup plus abstraite pour un enfant de 3 ans. Assurez-vous d'abord qu'il maîtrise très bien les extrêmes (très petit / très grand) avant de parler de la taille moyenne (Moyenne Section)."
          },
          {
            question: "Comment illustrer cela avec son corps ?",
            answer: "Mettez-vous côte-à-côte devant un miroir. « Je suis GRAND, tu es petit ! ». Jouez ensuite à vous faire 'tout petit' comme une boule, puis 'géant' debout sur la pointe des pieds la main en l'air !"
          }
        ]} />
      </Section>

      <Section title="Flashcards : Révisons en famille !" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour dévoiler la réponse.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">🐁</div> La souris est-elle petite ou grande ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-rose-500">PETITE !</div> Elle est toute fine et peut se cacher partout.</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">🐘</div> Et l'éléphant, petit ou grand ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">GRAND !</div> Il est massif et lourd !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Voyons ce qu'on a retenu !</p>
        <Quiz questions={[
          {
            question: "Lequel de ces animaux est le plus GRAND ?",
            options: ["Une fourmi", "Une vache", "Un chat"],
            correctAnswer: 1,
            explanation: "Bravo ! La vache est beaucoup plus grande qu'un chat ou une fourmi !"
          },
          {
            question: "Ta chaussure, par rapport à celle de papa ou maman, elle est :",
            options: ["Pareille", "Plus grande", "Plus petite"],
            correctAnswer: 2,
            explanation: "Oui ! Les pieds des enfants sont plus 'petits' que ceux des adultes."
          },
          {
            question: "Qu'est-ce qui est PETIT ?",
            options: [
              "Une jolie coccinelle sur une feuille",
              "Un grand bateau de croisière",
              "Un nuage dans le ciel"
            ],
            correctAnswer: 0,
            explanation: "Très bien, la coccinelle est toute petite, on peut la poser sur le doigt !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_PS_02_Formes_et_Grandeurs;