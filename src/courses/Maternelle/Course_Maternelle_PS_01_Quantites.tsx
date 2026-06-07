import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, ShoppingBasket, Play, RotateCcw } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import confetti from 'canvas-confetti';

const AppleTreeGame = ({ onWin }: { onWin: () => void }) => {
  const [apples, setApples] = useState([true, true, true, true, true]);
  const [basket, setBasket] = useState(0);

  const pickApple = (index: number) => {
    if (apples[index]) {
      const newApples = [...apples];
      newApples[index] = false;
      setApples(newApples);
      setBasket(prev => {
        const newBasket = prev + 1;
        if (newBasket === 5) {
          onWin();
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }
        return newBasket;
      });
    }
  };

  const reset = () => {
    setApples([true, true, true, true, true]);
    setBasket(0);
  };

  let qtyText = "Rien dans le panier (C'est vide !)";
  if (basket > 0 && basket < 5) qtyText = "Il y a un peu de pommes !";
  if (basket === 5) qtyText = "Il y a BEAUCOUP de pommes !!";

  return (
    <div className="bg-card border-4 border-indigo-100 rounded-[2rem] p-6 text-center max-w-sm mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-indigo-900">Le jeu des Pommes</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Árbre */}
      <div className="relative w-64 h-64 mx-auto bg-emerald-100 rounded-full mb-8 border-4 border-emerald-200 flex items-center justify-center">
        {/* Tronc */}
        <div className="absolute -bottom-16 w-12 h-20 bg-amber-800 rounded-t-xl z-0"></div>
        <div className="z-10 relative w-full h-full">
          {apples.map((hasApple, idx) => {
            const positions = [
              { top: '20%', left: '30%' },
              { top: '30%', right: '20%' },
              { top: '50%', left: '15%' },
              { top: '60%', right: '25%' },
              { top: '15%', left: '50%' }
            ];
            const pos = positions[idx];
            return (
              <AnimatePresence key={idx}>
                {hasApple && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0, y: 50 }}
                    onClick={() => pickApple(idx)}
                    style={pos as React.CSSProperties}
                    className="absolute p-2 bg-rose-500 rounded-full text-white shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-rose-300"
                    aria-label="Cueillir la pomme"
                  >
                    <Apple fill="currentColor" stroke="none" className="w-6 h-6" />
                  </motion.button>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>

      {/* Panier */}
      <div className="bg-amber-50 p-4 border border-amber-200 rounded-2xl flex flex-col items-center">
        <ShoppingBasket className="w-12 h-12 text-amber-700 mb-2" />
        <p className="font-bold text-amber-900 mb-2">Mon Panier : {basket} / 5</p>
        <div className="flex gap-1 h-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-6 h-6">
              {i < basket && <Apple className="w-full h-full text-rose-500" fill="currentColor" stroke="none" />}
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-amber-700 uppercase mt-4 bg-white px-4 py-1.5 rounded-full shadow-sm">
          {qtyText}
        </p>
      </div>
    </div>
  );
};


const Course_Maternelle_PS_01_Quantites: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/PS/01_Maternelle_PS_01_Quantites.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais reconnaître ce qui est 'vide' (rien).",
    "Je sais ce que veut dire 'un peu'.",
    "Je sais ce que veut dire 'beaucoup'."
  ];

  const handleInteractiveWin = () => {
    setGameWon(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="PS" 
        title="Maternelle PS 01 Quantités" 
        subtitle="Découvrir les notions de base : Un peu, beaucoup, rien."
        level="Petite Section"
        objectives={[
          "Distinguer 'beaucoup' et 'pas beaucoup'.",
          "Comprendre ce que signifie 'zéro' ou 'rien'.",
          "Associer des mots simples à des quantités visibles."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        À 3 ans, l'enfant commence à percevoir les quantités globales. Il ne compte pas encore précisément, mais il fait parfaitement la différence entre une boîte remplie de bonbons (beaucoup) et une boîte avec un seul bonbon (un peu). Ce cours l'aide à mettre des mots sur ce qu'il observe naturellement !
      </InfoBlock>

      <Section title="La Théorie : Les Quantités en Images" color="indigo" icon="🎯">
        <p>C'est très simple de voir les quantités ! Regardons ensemble :</p>
        <BentoGrid>
          <BentoCard title="Rien (Vide)" color="slate" icon={<ShoppingBasket className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 opacity-30">
              <ShoppingBasket className="w-16 h-16" />
            </div>
            <p className="text-center font-bold">Il n'y a rien du tout ! C'est zéro.</p>
          </BentoCard>
          
          <BentoCard title="Un Peu" color="emerald" icon={<ShoppingBasket className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 gap-2">
              <Apple className="w-12 h-12 text-rose-500" fill="currentColor" />
            </div>
            <p className="text-center font-bold">Il y a juste un ou deux objets. C'est facile de voir !</p>
          </BentoCard>

          <BentoCard title="Beaucoup" color="rose" icon={<ShoppingBasket className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 gap-1 flex-wrap">
              {Array.from({length: 6}).map((_, i) => (
                <Apple key={i} className="w-8 h-8 text-rose-500" fill="currentColor" />
              ))}
            </div>
            <p className="text-center font-bold">Il y en a plein ! C'est "beaucoup" !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Le rôle des mots">
        Utilisez ces mots au quotidien avec l'enfant : "Oh, tu as beaucoup de frites !" ou "Il y a un peu d'eau dans ton verre". La répétition est la clé de l'apprentissage en Petite Section.
      </InfoBlock>

      <Section title="Exercice Interactif : Jeu des Quantités" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Touche toutes les pommes de l'arbre pour les mettre dans le panier !</p>
        <AppleTreeGame onWin={handleInteractiveWin} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Les bébés singes ou même les oiseaux savent faire la différence entre "beaucoup" et "un peu" de nourriture avant même d'avoir appris à parler ! La notion de quantité est inscrite dans la nature.
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Mon enfant doit-il savoir compter jusqu'à 3 ?",
            answer: "À 3 ans, réussir à compter jusqu'à 2 ou 3 avec les doigts est normal, mais l'objectif de base reste d'abord visuel : faire la différence entre une grande taille/quantité et une petite."
          },
          {
            question: "Que faire s'il confond 'peu' et 'beaucoup' ?",
            answer: "Ne le corrigez pas durement. Montrez-lui des contrastes extrêmes : 1 seul jouet contre 20 jouets empilés. Jouez avec des choses qu'il aime particulièrement."
          },
          {
            question: "Puis-je utiliser d'autres mots ?",
            answer: "Oui, vous pouvez alterner avec 'pas beaucoup', 'plein', 'énormément' ou 'vide' pour enrichir son vocabulaire !"
          }
        ]} />
      </Section>

      <Section title="Flashcards : Révisons en un clic" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour voir la vraie réponse (aidez votre enfant à deviner !)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4">🍎🍎🍎🍎</div> Est-ce qu'il y a "beaucoup" ou "un peu" ?</>}
            back={<><div className="text-3xl text-rose-500 mb-2">🍎🍎🍎🍎</div> C'est "Beaucoup" !</>}
          />
          <Flashcard 
            front={<><div className="mb-4">📦 (Boîte vide)</div> Qu'y a-t-il dans cette boîte ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-slate-500">Rien !</div> Elle est complètement vide !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Un petit jeu de questions pour voir si on a tout compris ! (Parents, lisez les questions à haute voix)</p>
        <Quiz questions={[
          {
            question: "Quand le panier n'a pas de fruits du tout, on dit qu'il est :",
            options: ["Plein", "Vide (rien)", "Un peu rempli"],
            correctAnswer: 1,
            explanation: "Exactement ! Quand on ne voit aucun fruit, le panier est vide."
          },
          {
            question: "Si j'ai toute une grosse boîte pleine de Legos, j'ai :",
            options: ["Un peu de Legos", "Beaucoup de Legos", "Pas de Legos"],
            correctAnswer: 1,
            explanation: "C'est bien ça ! Une grosse boîte pleine = BEAUCOUP !"
          },
          {
            question: "Trouve la bonne phrase :",
            options: [
              "1 seul bonbon, c'est BEAUCOUP.",
              "100 bonbons, c'est UN PEU.",
              "1 seul bonbon, c'est UN PEU."
            ],
            correctAnswer: 2,
            explanation: "Bravo ! 1 seul bonbon, ce n'est pas beaucoup, c'est 'un peu' !"
          }
        ]} />
      </Section>

      <div onClick={() => {
        // Enforce validation if the game is won + quiz is attempted, or just checklist manually
        if (gameWon) { validateCourse(courseId); }
      }}>
        <InteractiveChecklist items={checklistItems} />
      </div>

    </div>
  );
};

export default Course_Maternelle_PS_01_Quantites;