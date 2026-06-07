import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Premiere_08_Variables_Aleatoires: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [ticketPrice, setTicketPrice] = useState<number>(2);
  const [jackpot, setJackpot] = useState<number>(100);

  // Proba = 1/100 de gagner, 99/100 de perdre.
  const winNet = jackpot - ticketPrice;
  const loseNet = -ticketPrice;
  
  const probWin = 1/100;
  const probLose = 99/100;

  // L'espérance mathématique E(X)
  const esperance = (winNet * probWin) + (loseNet * probLose);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-VAR"
        title="Variables Aléatoires"
        subtitle="Transformer le Hasard en Argent et calculer le Risque."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Monnayer le Hasard" icon="🎰" color="emerald">
        <p>
          Au lieu de simplement dire "j'ai tiré une boule rouge", on va affecter une valeur mathématique (souvent de l'argent) à chaque résultat. 
        </p>
        <p className="mt-2">
          Une <strong>Variable Aléatoire (notée X)</strong> agit comme une machine qui transforme un résultat de probabilité en un nombre. Par exemple : "Si je tire la boule rouge, X vaut +10€. Si je tire la noire, X vaut -2€".
        </p>
        
        <InfoBlock type="definition" title="La Loi de Probabilité (Le Tableau)">
          Pour étudier tous les scénarios d'un jeu, on dresse un tableau avec 2 lignes :<br/>
          - 1ère ligne : Les valeurs possibles (xi) de l'argent gagné/perdu.<br/>
          - 2ème ligne : La probabilité (pi) de tomber sur chacune de ces valeurs.<br/>
          La somme des probabilités de la ligne du bas doit TOUJOURS valoir 1.
        </InfoBlock>
      </Section>

      <Section title="⚙️ Simulateur de Loterie (Espérance)" icon="⚖️" color="indigo">
        <p className="mb-4">
          Le concept central est l'<strong>Espérance E(X)</strong>. C'est la moyenne d'argent que tu gagnes ou perds si tu jouais à ce jeu une infinité de fois.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <label className="flex flex-col">
              <span className="font-bold text-slate-700 dark:text-slate-300">Prix du Ticket (€) : {ticketPrice}€</span>
              <input type="range" min="1" max="10" step="1" value={ticketPrice} onChange={(e) => setTicketPrice(parseInt(e.target.value))} className="accent-rose-500" />
            </label>
            <label className="flex flex-col">
              <span className="font-bold text-slate-700 dark:text-slate-300">Le Jackpot (€) : {jackpot}€</span>
              <input type="range" min="10" max="500" step="10" value={jackpot} onChange={(e) => setJackpot(parseInt(e.target.value))} className="accent-emerald-500" />
            </label>
          </div>

          <p className="text-sm text-slate-500 mb-2">Imaginons une loterie avec 100 tickets. Un seul est gagnant. Le tableau de probabilités de tes gains (X) est :</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-200">
                  <th className="border p-2 border-slate-300 w-1/3">xi (Gain Net)</th>
                  <th className="border p-2 border-slate-300 font-mono text-rose-600 dark:text-rose-400 font-bold">{loseNet} € (Perte)</th>
                  <th className="border p-2 border-slate-300 font-mono text-emerald-600 dark:text-emerald-400 font-bold">+{winNet} € (Jackpot - Ticket)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 border-slate-300 font-bold bg-slate-100">pi (Proba)</td>
                  <td className="border p-2 border-slate-300">99 / 100</td>
                  <td className="border p-2 border-slate-300">1 / 100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-card rounded-xl border border-slate-300 text-center">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-2">Calcul de l'Espérance E(X)</h4>
            <p className="font-mono text-lg mb-2 text-slate-900 dark:text-slate-100">
              E(X) = ({loseNet} × 0.99) + ({winNet} × 0.01) = <strong className={esperance >= 0 ? "text-emerald-600 dark:text-emerald-400 text-2xl" : "text-rose-600 dark:text-rose-400 text-2xl"}>{esperance.toFixed(2)} €</strong>
            </p>
            <p className="text-sm font-bold mt-2">
              {esperance < 0 ? 
                `Le jeu est DEFAVORABLE au joueur. En moyenne, tu perds ${Math.abs(esperance).toFixed(2)}€ à chaque partie. Le casino est content !` : 
                esperance === 0 ? "Le jeu est EQUITABLE. Personne ne s'enrichit sur le long terme." : 
                "Le jeu est FAVORABLE au joueur ! Tu dépouilles le casino !"}
            </p>
          </div>
        </div>
      </Section>

      <Section title="📜 Les Formules de Survie" icon="⚡" color="amber">
        <p className="mb-4">Voici le triumvirat de la variable aléatoire. L'Espérance (la moyenne), la Variance (la dispersion au carré) et l'Écart-type (le risque réel).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="L'Espérance E(X)" 
            math={"E(X) = \\sum_{i=1}^n (p_i \\times x_i)"} 
          />
          <FormulaBox 
            title="La Variance V(X)" 
            formula={<>V(X) = E(X²) - (E(X))² <br/><span className="text-sm opacity-80">(Formule de Koenig)</span></>} 
          />
        </div>
        <div className="mt-4 max-w-sm mx-auto">
          <FormulaBox 
            title="L'Écart-Type σ(X)" 
            formula={<>σ(X) = √V(X)</>} 
          />
        </div>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
           L'Écart-type représente <strong>le risque</strong>. Si l'écart-type est grand, ça veut dire que tes gains fluctuent énormément (montagnes russes). S'il est petit, tes gains sont très stables et proches de l'espérance.
        </p>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul d'Espérance avec Inconnue"
          question={<p>Dans une fête foraine, on pioche un ticket. Les gains nets (variable <><MathComponent math={"X"} /></>) ont la loi suivante : <br/>
          On gagne -2€ avec une probabilité <><MathComponent math={"0.5"} /></>. <br/>
          On gagne 0€ avec une probabilité <><MathComponent math={"0.3"} /></>. <br/>
          On gagne <><MathComponent math={"k"} /></>€ avec une probabilité <><MathComponent math={"0.2"} /></>. <br/>
          Pour quelle valeur du jackpot <><MathComponent math={"k"} /></> le jeu est-il parfaitement équitable ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Hypothèse d'Équité</p>
              <p>Un jeu est équitable si et seulement si son espérance est nulle : <><MathComponent math={"E(X) = 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Formule de l'Espérance</p>
              <p><><MathComponent math={"E(X) = (-2 \\times 0.5) + (0 \\times 0.3) + (k \\times 0.2) = -1 + 0 + 0.2k"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On résout <><MathComponent math={"-1 + 0.2k = 0"} /></>. <br/><><MathComponent math={"0.2k = 1"} /></> <br/><><MathComponent math={"k = 1 / 0.2 = 5"} /></>. Le jackpot doit être de 5€ !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Calculer une Variance simple"
          question={<p>Soit <><MathComponent math={"X"} /></> qui prend les valeurs <><MathComponent math={"0"} /></> (avec proba <><MathComponent math={"1/2"} /></>) et <><MathComponent math={"4"} /></> (avec proba <><MathComponent math={"1/2"} /></>).<br/>Calcule d'abord l'espérance <><MathComponent math={"E(X)"} /></>, puis la variance <><MathComponent math={"V(X)"} /></> avec la formule de Koenig <><MathComponent math={"E(X^2) - (E(X))^2"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calcul de l'Espérance E(X)</p>
              <p><><MathComponent math={"E(X) = 0 \\times 1/2 + 4 \\times 1/2 = 2"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : L'Espérance des carrés E(X²)</p>
              <p>On met les VALEURS (pas les probas !) au carré : <><MathComponent math={"0^2"} /></> et <><MathComponent math={"4^2 = 16"} /></>. <br/>Donc <><MathComponent math={"E(X^2) = 0 \\times 1/2 + 16 \\times 1/2 = 8"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Koenig dit que <><MathComponent math={"V(X) = E(X^2) - (E(X))^2"} /></>. <br/>On a donc <><MathComponent math={"V(X) = 8 - (2)^2 = 8 - 4 = 4"} /></>. L'écart-type est donc la racine de 4, c'est-à-dire 2.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes Mentales" icon="💡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans le tableau de la loi de probabilité de X, quelle est la règle absolue sur la ligne des "pi" ?</>}
            back={<><strong>La somme des probabilités p_i doit être égale à exactement 1.</strong><br/><span className="text-sm">Si ça fait 0.99 ou 1.05, tu as oublié un cas ou fait une erreur de calcul !</span></>}
          />
          <Flashcard 
            front={<>Si un jeu a une <strong>Espérance de 0</strong>, comment on appelle ça ?</>}
            back={<>C'est un jeu <strong>Équitable</strong> (ni à l'avantage du joueur, ni à l'avantage de la banque).</>}
          />
        </div>
      </Section>

      <Section title="🎮 Test de Création de Loi" icon="🕹️" color="slate">
        <p className="mb-4">Mets-toi dans la peau de la Française des Jeux :</p>
        <FillInTheBlanks 
          id="varal-eval"
          content={[
            "Pour dresser la loi de probabilité, j'ai trouvé trois gains possibles pour le joueur : -2€, +5€, et +100€. J'ai calculé les probabilités : P(X=-2) = 0.8, et P(X=100) = 0.05. Sachant que la somme des probabilités vaut 1, je deduis que P(X=5) vaut ",
            { options: ["1.15", "0.15", "0.20"], correctAnswer: 1 },
            ". Maintenant, je calcule l'espérance E(X). Je fais la somme des produits : (-2×0.8) + (5×0.15) + (100×0.05) = -1.6 + 0.75 + 5 = ",
            { options: ["4.15", "3.25", "-2.25"], correctAnswer: 0 },
            ". Le résultat est strictement positif ! Le jeu est donc ",
            { options: ["défavorable", "favorable", "équitable"], correctAnswer: 1 },
            " au joueur (Mais aie, c'est désastreux pour le casino !)."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la définition propre de l'Écart-type σ(X) ?",
              options: [
                "C'est la variance divisée par 2.",
                "C'est la racine carrée de la Variance.",
                "C'est l'Espérance mais élevée au carré."
              ],
              correctAnswer: 1,
              explanation: "Règle absolue : L'écart-type est la racine carrée de la variance. σ(X) = √V(X)."
            },
            {
              question: "Linéarité de l'Espérance : Si je double tous les gains d'un jeu, que devient l'Espérance E(2X) ?",
              options: [
                "Elle est mise au carré.",
                "Elle ne change pas.",
                "Elle est doublée : 2 × E(X)."
              ],
              correctAnswer: 2,
              explanation: "Heureusement, l'espérance est 'linéaire'. Si tu multiplies tous les gains par 2, ta moyenne (espérance) est doublée. E(aX+b) = aE(X) + b."
            },
            {
              question: "Si la variance V(X) de mon jeu de hasard s'approche de ZÉRO, qu'est-ce que ça signifie concrètement ?",
              options: [
                "Je perds tout le temps.",
                "Le résultat du jeu est presque 'certain', il n'y a quasiment plus de hasard ou de fluctuation.",
                "Le casino fait faillite."
              ],
              correctAnswer: 1,
              explanation: "La variance mesure la dispersion (l'incertitude). Une variance de zéro signifie que le 'hasard' recrache en fait toujours la même valeur !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais toujours tenir compte de 'la mise de départ' (le prix du ticket) dans le calcul du gain (gain net).",
            "Je vérifie toujours que la somme des probas du tableau vaut 1.",
            "Je sais calculer l'espérance en multipliant en colonne et en additionnant.",
            "Je connais le vocabulaire 'Favorable / Défavorable / Équitable'."
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

export default Course_Premiere_08_Variables_Aleatoires;
