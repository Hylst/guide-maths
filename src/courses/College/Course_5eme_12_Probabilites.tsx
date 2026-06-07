import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_12_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Dice roll simulator state (from original baseline)
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  
  // Interactive Urn marble state
  const [redBalls, setRedBalls] = useState<number>(3);
  const [blueBalls, setBlueBalls] = useState<number>(4);
  const [greenBalls, setGreenBalls] = useState<number>(2);
  const [drawResult, setDrawResult] = useState<string | null>(null);
  const [drawsHistory, setDrawsHistory] = useState<string[]>([]);

  const totalBalls = redBalls + blueBalls + greenBalls;

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRolls(prev => [...prev, roll]);
  };

  const drawMarble = () => {
    if (totalBalls === 0) return;
    const randomVal = Math.random() * totalBalls;
    let selectedColor = "";

    if (randomVal < redBalls) {
      selectedColor = "🔴 Rouge";
    } else if (randomVal < redBalls + blueBalls) {
      selectedColor = "🔵 Bleu";
    } else {
      selectedColor = "🟢 Vert";
    }

    setDrawResult(selectedColor);
    setDrawsHistory(prev => [selectedColor, ...prev].slice(0, 8));
  };

  const getStats = (target: number) => {
    if (diceRolls.length === 0) return 0;
    const count = diceRolls.filter(r => r === target).length;
    return ((count / diceRolls.length) * 100).toFixed(1);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PRB"
        title="Probabilités"
        subtitle="Dompter le hasard, prévoir l'imprévu et modéliser des tirages en temps réel."
        duration="40 min"
        level="5ème Collège"
        prerequisites={["Fractions et simplifications", "Nombres décimaux"]}
        objectives={[
          "Comprendre le vocabulaire lié au hasard (issues, événements)",
          "Savoir situer une probabilité sur une échelle stricte allant de 0 à 1",
          "Calculer des probabilités simples dans des situations d'équiprobabilité",
          "Comparer probabilités théoriques et fréquences expérimentales"
        ]}
      />

      <Section title="⚠️ L'Empire du Hasard et sa Mesure" icon="🎲" color="rose">
        <p className="lead text-lg">
          Dans notre vie, certaines choses sont certaines (le soleil se lèvera demain) et d'autres impossibles. Entre les deux gît le royaume des possibles.
        </p>
        <p className="mt-4">
          La <strong>probabilité</strong> est un nombre compris rigoureusement entre <strong>0</strong> et <strong>1</strong> (ou entre 0% et 100%) qui évalue la proportion de chances qu'un événement se réalise.
        </p>
        
        <InfoBlock type="definition" title="L'Échelle des Possibles">
          - <strong>Probabilité = 0 :</strong> Événement totalement <strong>impossible</strong> (ex : tirer une carte verte d'un jeu classique).<br/>
          - <strong>Probabilité = 1 :</strong> Événement <strong>certain</strong> (ex : obtenir un chiffre inférieur à 10 en lançant un dé ordinaire à 6 faces).<br/>
          - <strong>Probabilité = 0.5 (50%) :</strong> Événement qui a autant de chances de se produire que de ne pas se produire (ex : pile ou face).
        </InfoBlock>
      </Section>

      <Section title="🔮 L'Urne Interactive des Probabilités" icon="🧿" color="indigo">
        <p className="mb-4">Modifie la composition de cette urne magique. Les quotients mathématiques et les pourcentages se mettent à jour automatiquement !</p>

        {/* Dynamic Urn Simulator with live calculated fraction and pull events */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            
            {/* Balls adjustment panel */}
            <div className="space-y-4 w-full lg:w-1/2">
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-300">Composition de l'urne :</h4>
              
              <div className="flex items-center justify-between bg-red-50/50 dark:bg-rose-950/20 p-3 rounded-2xl border border-red-100">
                <span className="font-bold text-red-600 flex items-center gap-2">🔴 Billes Rouges</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => redBalls > 0 && setRedBalls(redBalls - 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 border text-black font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg min-w-[20px] text-center">{redBalls}</span>
                  <button 
                    type="button"
                    onClick={() => setRedBalls(redBalls + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 border text-black font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-2xl border border-blue-100">
                <span className="font-bold text-blue-600 flex items-center gap-2">🔵 Billes Bleues</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => blueBalls > 0 && setBlueBalls(blueBalls - 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 border text-black font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg min-w-[20px] text-center">{blueBalls}</span>
                  <button 
                    type="button"
                    onClick={() => setBlueBalls(blueBalls + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 border text-black font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-green-50/50 dark:bg-emerald-950/20 p-3 rounded-2xl border border-emerald-100">
                <span className="font-bold text-emerald-600 flex items-center gap-2">🟢 Billes Vertes</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => greenBalls > 0 && setGreenBalls(greenBalls - 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 border text-black font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg min-w-[20px] text-center">{greenBalls}</span>
                  <button 
                    type="button"
                    onClick={() => setGreenBalls(greenBalls + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 border text-black font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Calculations and virtual pull viewport */}
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 p-4 rounded-2xl w-full text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Total dans l'urne : {totalBalls} billes</span>
                
                {totalBalls > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs font-semibold">
                    <div className="p-2 border rounded bg-white dark:bg-black">
                      <span className="text-red-500 block">Proba Rouge</span>
                      <div className="text-base font-bold font-mono mt-0.5">{redBalls}/{totalBalls}</div>
                      <div className="text-[10px] text-slate-500">({((redBalls/totalBalls)*100).toFixed(0)}%)</div>
                    </div>
                    <div className="p-2 border rounded bg-white dark:bg-black">
                      <span className="text-blue-500 block">Proba Bleu</span>
                      <div className="text-base font-bold font-mono mt-0.5">{blueBalls}/{totalBalls}</div>
                      <div className="text-[10px] text-slate-500">({((blueBalls/totalBalls)*100).toFixed(0)}%)</div>
                    </div>
                    <div className="p-2 border rounded bg-white dark:bg-black">
                      <span className="text-emerald-500 block">Proba Vert</span>
                      <div className="text-base font-bold font-mono mt-0.5">{greenBalls}/{totalBalls}</div>
                      <div className="text-[10px] text-slate-500">({((greenBalls/totalBalls)*100).toFixed(0)}%)</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-rose-500 font-bold my-4">L'urne est vide ! Ajoute au moins une bille.</div>
                )}
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <button 
                  type="button"
                  onClick={drawMarble}
                  disabled={totalBalls === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-extrabold rounded-2xl shadow shadow-indigo-600/20 active:scale-95 transition-all text-sm w-full"
                >
                  Tirer une bille au hasard ! 🎲
                </button>

                {drawResult && (
                  <div className="mt-2 bg-slate-100 dark:bg-slate-800 border p-3 rounded-2xl font-mono text-center text-sm w-full">
                    <span>Résultat du tirage : </span>
                    <strong className="text-lg text-indigo-700 dark:text-indigo-300 ml-1 block mt-1">{drawResult}</strong>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </Section>

      <Section title="⚖️ Équiprobabilité (La Règle d'or)" icon="🎯" color="slate">
        <p className="mb-4">
          Dans la plupart des jeux de société (dés non truqués, roues divisées également, cartes bien mélangées), chaque issue a exactement la même chance de sortir : c'est un cas d'<strong>équiprobabilité</strong>.
        </p>

        <InfoBlock type="definition" title="Formule de Laplace">
          Dans une situation d'équiprobabilité, la probabilité d'un événement $E$ s'exprime par le ratio universel suivant :
          <br/><br/>
          {`$P(E) = \\frac{\\text{Nombre de cas favorables}}{\\text{Nombre total de cas possibles}}$`}
        </InfoBlock>

        <TipBanner type="info" title="L'Événement contraire">
          La probabilité que l'événement ne se produise pas (événement contraire) se calcule très simplement en cherchant le reste : 
          <br/>
          <strong>P(Contraire de A) = $1 - P(A)$</strong>.
        </TipBanner>
      </Section>

      <Section title="🎲 Expérimentation vs Théorie (Loi des Grands Nombres)" icon="💻" color="emerald">
        <p className="mb-4">
          La théorie dicte qu'obtenir un 6 équivaut à 1 chance sur 6 (≈ 16,7%). Mais qu'en est-il en tirant réellement un dé au hasard ? Lance le simulateur et compare !
        </p>

        <div className="bg-card border-2 border-border p-6 rounded-3xl shadow-sm text-center">
          <button 
            type="button"
            onClick={rollDice}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-transform active:scale-95 mb-6"
          >
            Lancer le Dé 🎲
          </button>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[3rem]">
            {diceRolls.slice(-10).map((r, i) => (
              <span key={i} className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-300 rounded-xl font-bold text-lg">
                {r}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[1,2,3,4,5,6].map(face => (
              <div key={face} className="bg-muted p-2 rounded border">
                Face {face} : <strong className="text-indigo-600 dark:text-indigo-400">{getStats(face)}%</strong>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Total de lancers : {diceRolls.length}. Plus tu accumules de lancers, plus l'écart expérimental se resserre vers les 16.7% théoriques !
          </p>
        </div>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la probabilité d'un événement qui va se réaliser à coup sûr ?</>}
            back={<>Sa probabilité vaut exactement <strong>1</strong> (soit 100%). On dit qu'il est certain.</>}
          />
          <Flashcard 
            front={<>Quelle est la probabilité d'un événement qui ne peut pas se réaliser ?</>}
            back={<>Sa probabilité est de <strong>0</strong> (soit 0%). On parle d'événement impossible.</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Le sac des lettres mystérieuses"
          question="Le sac de mots contient les lettres du mot 'M - A - T - H - S' (5 jetons distincts). On tire une lettre au hasard. Quelle est la probabilité d'obtenir une consonne ?"
          steps={[
            "J'analyse le nombre total d'issues : il y a 5 lettres en tout dans le sac.",
            "J'isole les cas favorables (consonnes) : M, T, H, S représentent 4 issues favorables au total.",
            "J'applique la formule de Laplace : P = Cas favorables / Cas possibles = 4/5 (soit 0,8 ou 80%). La probabilité de tirer une consonne vaut exactement <strong>4/5</strong>."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : La pile de pièces de monnaie"
          question="La probabilité qu'un joueur gagne une partie est de 0,35. Quelle est la probabilité de l'événement contraire (que le joueur perde) ?"
          steps={[
            "La somme de la probabilité de l'événement et de sa probabilité contraire fait toujours 1.",
            "J'utilise la formule correspondante : P(perdre) = 1 - P(gagner).",
            "Je calcule : P(perdre) = 1 - 0,35 = 0,65. La probabilité que le joueur perde vaut <strong>0,65</strong> (ou 65%)."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'échelle s'arrête-t-elle à 1 ?",
              answer: "Parce que 1 représente 100% des cas d'univers. On ne peut pas avoir plus de 100% de chances de réaliser un événement : c'est un non-sens absolu en arithmétique de probabilité."
            },
            {
              question: "Qu'est-ce qu'un événement incompatible ?",
              answer: "Deux événements sont incompatibles s'ils ne se produisent jamais ensemble lors d'un même tirage (ex : 'tirer un nombre impair' et 'tirer le nombre 4' en lançant un seul dé)."
            },
            {
              question: "Peut-on additionner des probabilités ?",
              answer: "Oui, si les événements sont impossibles à cumuler (incompatibles). Par exemple, sur un dé à 6 faces, la proba d'avoir 1 ou 2 s'exprime par : P(1) + P(2) = 1/6 + 1/6 = 2/6."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Chance" icon="🕹️" color="slate">
        <p className="mb-4">Voyons si tu es prêt(e) pour le casino (mathématique) :</p>
        <FillInTheBlanks 
          id="prb-eval"
          content={[
            "Dans un jeu de 32 cartes (sans joker), je veux tirer un As. Il y a 4 As dans le paquet. Donc la probabilité est la fraction ",
            { options: ["4/32", "1/32", "32/4"], correctAnswer: 0 },
            ". Si je simplifie cette fraction, j'obtiens exactement ",
            { options: ["1/4", "1/8", "1/2"], correctAnswer: 1 },
            ". D'un autre côté, je cherche à tirer une carte 'bleue'. Il n'y en a pas, c'est rouge ou noir. La probabilité est donc de ",
            { options: ["0", "1", "-1"], correctAnswer: 0 },
            ". Et on peut dire que l'événement de 'Tirer une carte noire OU rouge' a une probabilité de ",
            { options: ["0,5", "1", "0"], correctAnswer: 1 },
            ", c'est un événement certain !"
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si la probabilité d'un événement se produit vaut 0,22, quelle valeur exprime en pourcentage cette probabilité ?",
              options: [
                "2,2%",
                "22%",
                "0,22%"
              ],
              correctAnswer: 1,
              explanation: "0,22 correspond au ratio 22/100, soit exactement 22%."
            },
            {
              question: "On fait tourner une roue de loterie parfaite divisée en 8 couleurs égales. La couleur Jaune occupe 3 parts. Quelle est la probabilité de ne pas obtenir Jaune ?",
              options: [
                "3/8",
                "5/8",
                "1/8"
              ],
              correctAnswer: 1,
              explanation: "Il y a 8 - 3 = 5 parts non jaunes. La probabilité correspondante est donc de 5/8 (ou 1 - 3/8 = 5/8)."
            },
            {
              question: "On lance une pièce de monnaie équilibrée 3 fois de suite, et on obtient Pile à chaque tirage. Quelle est la probabilité d'avoir Face au 4ème jet-lancé ?",
              options: [
                "La chance d'obtenir Face est beaucoup plus grande pour compenser les jets précédents.",
                "Elle reste exactement d'une chance sur deux (0,5), car les lancers sont totalement indépendants."
              ],
              correctAnswer: 1,
              explanation: "C'est l'essence même de l'indépendance du hasard : la pièce n'a pas de mémoire, chaque tirage conserve une parfaite probabilité de 50/50 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la règle d'or : une probabilité est toujours comprise entre 0 et 1.",
            "Je sais que Impossible = 0 et Certain = 1.",
            "Je sais calculer une proba simple : Nombre de cas favorables / Nombre de cas totaux.",
            "Je sais que la probabilité 'contraire' s'obtient en faisant : 1 - (Proba de l'événement initial)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
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

export default Course_5eme_12_Probabilites;
