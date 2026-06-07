import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { Dice5, CircleDot } from 'lucide-react';

const Course_College_3eme_05_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-05"
        title="Les Probabilités"
        subtitle="Apprends à calculer et prédire tes chances de gagner l'impossible !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Les fractions (simplification)", "Les pourcentages"]}
        objectives={[
          "Comprendre le vocabulaire : expérience, issue, événement.",
          "Calculer une probabilité simple avec la formule mathématique.",
          "Manipuler l'arbre des possibles pour 2 épreuves.",
          "Comprendre qu'une probabilité est toujours comprise entre 0 et 1."
        ]}
      />

      <Section title="🌟 Introduction : Le hasard est-il mathématique ?" icon="🎲" color="slate">
        <p>
          Si je lance un dé, personne au monde (même le plus grand scientifique) ne peut savoir sur quelle face il tombera. C'est l'essence même du hasard.
        </p>
        <p className="mt-4">
          Mais on peut <strong>mesurer</strong> ce hasard ! C'est ce qu'on appelle les <em>probabilités</em>. En calculant précisément toutes les chances mathématiques, les casinos et les assureurs savent toujours s'ils vont gagner de l'argent à la fin de l'année. Alors, prêts à maîtriser le destin ?
        </p>
      </Section>

      <Section title="1. Le Vocabulaire des Joueurs" icon="🎓" color="indigo">
        <div className="space-y-4 mb-6">
          <div className="bg-card p-4 rounded-xl border border-border-strong border-l-4 border-l-indigo-500 shadow-sm flex items-start gap-4">
            <span className="text-2xl mt-1">🧪</span>
            <div>
              <p className="font-bold text-indigo-700 dark:text-indigo-300">Expérience Aléatoire</p>
              <p className="text-foreground">L'action qu'on fait (ex: <em>"Lancer un dé à 6 faces."</em> ou <em>"Tirer une carte d'un jeu."</em>). Aléatoire veut dire qu'on ne peut pas prédire le résultat exact à l'avance.</p>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-xl border border-border-strong border-l-4 border-l-amber-500 shadow-sm flex items-start gap-4">
            <span className="text-2xl mt-1">🎯</span>
            <div>
              <p className="font-bold text-amber-700 dark:text-amber-300">Issue</p>
              <p className="text-foreground">Un résultat POSSIBLE de notre expérience. Ex: Pour un dé à 6 faces, les probabilités totales ont <strong className="text-foreground">6 issues</strong> possibles (1, 2, 3, 4, 5, et 6).</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border-strong border-l-4 border-l-rose-500 shadow-sm flex items-start gap-4">
            <span className="text-2xl mt-1">🏆</span>
            <div>
              <p className="font-bold text-rose-700 dark:text-rose-300">Événement</p>
              <p className="text-foreground">C'est la CONDITION ou la RÈGLE du jeu qui t'intéresse. Ex: <em>"Obtenir un nombre pair."</em> L'événement "obtenir un nombre pair" est finalement constitué de 3 issues triomphantes : le 2, le 4, et le 6.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="2. La Formule Unique (La loi de Laplace)" icon="⚖️" color="blue">
        <p className="mb-4">Si toutes les issues ont la même chance d'arriver (le dé n'est pas truqué 🎲), il n'y a qu'une seule fraction à connaitre par cœur pour résoudre 95% des exercices de probabilités :</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800 text-center shadow-sm my-6">
          <p className="font-bold text-foreground mb-4">Probabilité d'un événement A = p(A)</p>
          <div className="font-mono text-xl md:text-2xl font-black text-sky-700 dark:text-sky-300 flex flex-col items-center justify-center gap-2">
            <span>Nombre d'issues FAVORABLES</span>
            <div className="w-64 h-1 bg-sky-700 dark:bg-sky-300"></div>
            <span>Nombre d'issues au TOTAL</span>
          </div>
        </div>

        <InteractiveExercise 
          title="Tirer une boule dans une urne"
          question={<>Une urne contient <strong>3 boules Rouges</strong>, <strong>2 boules Bleues</strong> et <strong>5 boules Vertes</strong>. Quelle est la probabilité (p) de piocher une boule Rouge ?</>}
          steps={[
            <><strong>Étape 1 : Le TOTAL (Le dénominateur de la fraction)</strong><br/>Combien y a-t-il de boules au total dans l'urne ?<br/>Il y a 3 + 2 + 5 = <strong>10 boules au total</strong>.</>,
            <><strong>Étape 2 : Le CHOIX (Le Numérateur de la fraction)</strong><br/>Combien y a-t-il de boules rouges ?<br/>Il y en a <strong>3</strong>.</>,
            <><strong>Étape 3 : La Réponse sous forme de fraction</strong><br/>La probabilité P(Rouge) est donc <strong className="text-sky-600 dark:text-sky-400 font-mono text-xl">3/10</strong>.</>,
            <>Et si nous voulions l'écrire avec un autre format ?<br/><span className="bg-muted px-2 rounded">Décimal: 0,3</span> et en <span className="bg-muted px-2 rounded">Pourcentage : 30%</span>.</>
          ]}
        />
        
        <InfoBlock title="La Règle d'Or des Probabilités" type="info">
          La probabilité (p) d'un événement est <strong>TOUJOURS comprise entre 0 et 1</strong>.<br/>
          - Événement impossible : p = 0.<br/>
          - Événement certain : p = 1.<br/>
          Si tu trouves P(A) = 1,4 ou 3/2 à ton brevet, barre ton résultat, c'est forcément faux !
        </InfoBlock>
      </Section>

      <Section title="3. L'Événement Contraire" icon="☯️" color="emerald">
        <p className="mb-4">Parfois, il est beaucoup plus simple de calculer "ce que l'on ne veut pas" et de faire l'inverse. C'est l'événement Contraire !</p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 my-4 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 text-lg mb-2">Exemple</h4>
            <p className="text-foreground">Pour la roulette ci-contre (qui contient 100 cases). Quelle est la probabilité de <strong>ne pas tomber</strong> sur la case fatale 13 ?</p>
            <p className="text-sm mt-3 text-emerald-900 dark:text-emerald-100 font-medium">On calcule ce qu'on ne veut pas (tomber sur 13).<br/>P(13) = 1/100.<br/>
            On soustrait à la totalité (100% = 1).<br/>
            Donc P(Non-13) = 1 - 1/100 = <strong>99/100</strong>.</p>
          </div>
          <div className="w-32 h-32 flex items-center justify-center bg-card rounded-full border-[6px] border-emerald-500 shadow-xl relative overflow-hidden">
            <div className="absolute w-full h-[6px] bg-emerald-500 transform rotate-45"></div>
            <div className="absolute w-full h-[6px] bg-emerald-500 transform -rotate-45"></div>
            <div className="absolute w-full h-[6px] bg-emerald-500"></div>
            <div className="absolute h-full w-[6px] bg-emerald-500"></div>
            <div className="w-16 h-16 bg-card absolute rounded-full z-10 flex items-center justify-center border-4 border-emerald-500">
               <span className="font-bold">13</span>
            </div>
            <div className="absolute w-full h-full bg-rose-500/80 clip-slice-example z-0"></div>
          </div>
        </div>
      </Section>
      
      <Section title="4. L'Arbre des Pondérations (ou Arbre de probabilités)" icon="🌳" color="rose">
        <p className="mb-4">Quand on lance une pièce <strong>2 fois de suite</strong>, on ne peut plus juste utiliser l'instinct. Outil indispensable : l'Arbre !</p>
        
        <div className="bg-card p-6 rounded-[2rem] border border-border-strong text-center shadow-sm overflow-x-auto relative">
           {/* Simple tree visualization */}
           <div className="min-w-[400px] flex justify-center py-4">
              <div className="flex flex-col items-center">
                 <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100 dark:text-rose-200 font-bold px-4 py-2 rounded-xl mb-4">Lancer 1</div>
                 <div className="flex gap-20">
                    <div className="flex flex-col items-center">
                      <svg width="20" height="40" className="text-foreground opacity-50 relative -top-3 -right-8 -rotate-[25deg]"><line x1="0" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="2"/></svg>
                      <div className="bg-background text-foreground font-mono font-bold w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary mb-4 shadow">P (1/2)</div>
                      <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100 dark:text-rose-200 font-bold px-4 py-1 rounded-full text-sm mb-4">Lancer 2</div>
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <svg width="20" height="40" className="text-foreground opacity-50 relative -top-3 -right-4 -rotate-[20deg]"><line x1="0" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="2"/></svg>
                          <div className="bg-background text-foreground font-mono font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary">P (1/2)</div>
                          <div className="text-xs font-bold text-rose-500 mt-2 bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-950 p-1 rounded">(P, P) = 1/4</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg width="20" height="40" className="text-foreground opacity-50 relative -top-3 -left-4 rotate-[20deg]"><line x1="20" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2"/></svg>
                          <div className="bg-background text-foreground font-mono font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary">F (1/2)</div>
                          <div className="text-xs font-bold text-gray-500 mt-2">(P, F) = 1/4</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <svg width="20" height="40" className="text-foreground opacity-50 relative -top-3 -left-8 rotate-[25deg]"><line x1="20" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2"/></svg>
                      <div className="bg-background text-foreground font-mono font-bold w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary mb-4 shadow">F (1/2)</div>
                      <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100 dark:text-rose-200 font-bold px-4 py-1 rounded-full text-sm mb-4">Lancer 2</div>
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                           <svg width="20" height="40" className="text-foreground opacity-50 relative -top-3 -right-4 -rotate-[20deg]"><line x1="0" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="2"/></svg>
                          <div className="bg-background text-foreground font-mono font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary">P (1/2)</div>
                          <div className="text-xs font-bold text-gray-500 mt-2">(F, P) = 1/4</div>
                        </div>
                        <div className="flex flex-col items-center">
                           <svg width="20" height="40" className="text-foreground opacity-50 relative -top-3 -left-4 rotate-[20deg]"><line x1="20" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2"/></svg>
                          <div className="bg-background text-foreground font-mono font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary">F (1/2)</div>
                          <div className="text-xs font-bold text-gray-500 mt-2">(F, F) = 1/4</div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        
        <TipBanner title="Multiplication sur les branches !" type="warning">
          Pour trouver la probabilité d'un chemin complet (ex: Faire Pile puis Pile), on <strong>MULTIPLIE</strong> les probabilités rencontrées sur ce chemin (Les branches de l'arbre). Ici : 1/2 × 1/2 = 1/4 (Soit 25% de chances).
        </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande d'exprimer la probabilité de faire "6" avec un dé sous TOUTES ses formes. Que veut-il ?</>}
            back={<>Il veut :<br/>1) La FRACTION : <strong>1/6</strong>.<br/>2) Le DÉCIMAL : <strong>~0.166</strong>.<br/>3) Le POURCENTAGE : <strong>~16,6%</strong>.</>}
          />
          <Flashcard 
            front={<>Dans un jeu de 32 cartes (sans jokers), je veux un AS. Quelle est la probabilité ?</>}
            back={<>Combien y a-t-il d'AS (Favorables) ? Il y a 4 (Pique, Cœur, Carreau, Trèfle).<br/>Combien de cartes Total ? 32.<br/>Fraction : <strong>4/32</strong> qui se réduit en divisant par 4 = <strong>1/8</strong> (Soit 12,5%).</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la probabilité d'obtenir un '7' avec un dé classique à 6 faces ?",
              options: [
                "1/6",
                "0",
                "1/7"
              ],
              correctAnswer: 1,
              explanation: "C'est un événement IMPOSSIBLE ! Un dé classique ne possède pas de face '7'. La probabilité est donc purement et simplement 0."
            },
            {
              question: "Si j'ai P(A) = 3/8 pour devenir riche aujourd'hui. Quelle est la probabilité (P contraire) d'échouer ?",
              options: [
                "8/3",
                "0 (Impossible d'échouer)",
                "5/8"
              ],
              correctAnswer: 2,
              explanation: "Top ! L'événement contraire complète l'unité jusqu'à 1.  (1 - 3/8) = (8/8 - 3/8) = 5/8. J'ai 5 chances sur 8 d'échouer."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "La fraction des probabilités = (Ce que je veux) / (Le Total des possibilités).",
            "J'ai bien retenu : P = 1,22 ❌ Impossible ! Probabilité 0 < p < 1.",
            "Pour 2 événements d'affilée, sur l'arbre je tire des branches et je MULTIPLIE."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_College_3eme_05_Probabilites;
