import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, FormulaBox 
} from '../components/SharedUI';

const Course_5eme_03_Fractions_Calculs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-FRAC"
        title="Fractions et Calculs"
        subtitle="L'Art des Brisures : Simplification, Addition et Soustraction d'éclats."
        duration="45 min"
      />

      <Section title="🍕 Introduction : La Lame Fractale" icon="🗡️" color="indigo">
        <p>
          Tu as appris à partager la "vraie pizza" en Primaire. Maintenant, le niveau supérieur t'attend : tu dois manipuler la <strong>Lame des Fractions</strong> pour faire des combats mathématiques avec des morceaux !
        </p>
        <p className="mt-4">
          Un bref rappel d'anatomie de combat :
        </p>
        <ul className="list-disc list-inside mt-2 text-slate-700 dark:text-slate-300 space-y-2">
          <li>Le <strong>Numérateur</strong> est l'ÉPÉE (le nombre en HAUT) : il indique de combien de parts on dispose pour ataquer.</li>
          <li>Le <strong>Dénominateur</strong> est le BOUCLIER (le nombre en BAS) : il indique en combien de morceaux le trésor pur a été brisé.</li>
        </ul>
      </Section>

      <Section title="🧬 Les Clones : Fractions Égales" icon="🪞" color="slate">
        <p>
          Magie absolue : Deux fractions peuvent être <strong>exactement les mêmes</strong> (des clones !) même si elles sont écrites avec des nombres totalement différents !
        </p>
        <InfoBlock type="info" title="La Règle de l'Équilibre">
          Tu as le pouvoir infini de MULTIPLIER (ou de DIVISER) le Numerateur ET le Dénominateur par exactement <strong>le même nombre</strong> (sauf Zéro !). Cela créera une fraction jumelle qui a exactement la même valeur !
        </InfoBlock>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-8 font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span>1</span>
              <div className="h-1 w-full bg-slate-800 my-1 rounded-full"></div>
              <span>2</span>
            </div>
          </div>
          <div className="text-4xl text-indigo-500">=</div>
          <div className="relative">
            <div className="absolute -top-6 -left-2 text-sm text-indigo-600 dark:text-indigo-400">× 5</div>
            <div className="absolute -bottom-6 -left-2 text-sm text-indigo-600 dark:text-indigo-400">× 5</div>
            <div className="flex flex-col items-center">
              <span className="text-emerald-600 dark:text-emerald-400">5</span>
              <div className="h-1 w-full bg-emerald-600 my-1 rounded-full"></div>
              <span className="text-emerald-600 dark:text-emerald-400">10</span>
            </div>
          </div>
        </div>

        <p className="text-center font-medium bg-muted p-4 rounded-xl border border-border">
          Quand on utilise ce pouvoir pour DIVISER, on appelle ça <strong>SIMPLIFIER LA FRACTION</strong> (pour rendre les nombres plus petits et faciles à lire).
        </p>
      </Section>

      <Section title="⚔️ Addition et Soustraction" icon="🛡️" color="rose">
        <p>
          Pour additionner ou soustraire des fragments, il y a la <strong>Règle de Bronze</strong>, implacable, absolue :
        </p>
        
        <div className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800/60 p-6 rounded-2xl mt-4 shadow-sm shadow-rose-100">
          <h3 className="font-bold text-xl text-rose-900 dark:text-rose-100 mb-3 uppercase tracking-wider">La Règle de Bronze</h3>
          <ol className="list-decimal list-inside space-y-3 text-rose-950 dark:text-rose-50 font-medium">
            <li>Elles DOIVENT ABSOLUMENT partager le <strong>même bouclier (Même Dénominateur) !</strong></li>
            <li>Si les boucliers sont différents, tu <strong>dois</strong> transformer l'une d'elles en multipliant son Haut et son Bas !</li>
            <li>On NE TOUCHE JAMAIS au Dénominateur lors du calcul final ! On ajoute ou soustrait uniquement les Numérateurs.</li>
          </ol>
        </div>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Peut-on calculer <code>3/5 + 1/5</code> directement ?</>}
            back={<><strong>OUI !</strong> Le bouclier est le même (5). On ajoute les épées : 3+1 = 4. Résultat : <strong>4/5</strong></>}
          />
          <Flashcard 
            front={<>Peut-on calculer <code>1/2 + 2/4</code> directement ?</>}
            back={<><strong>NON !</strong> Le bouclier est différent. On doit transformer 1/2 en multipliant par 2 en haut et en bas (=2/4). Puis on calcule : 2/4 + 2/4 = <strong>4/4</strong> (qui fait 1).</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercice de Combat (Corrigé)" icon="✍️" color="slate">
        <Accordion title="Exercice : L'attaque asymétrique">
          <p className="font-medium mb-4 text-xl">Calcule : <code>7/6 - 2/3</code></p>
          <div className="bg-muted p-6 rounded-xl font-mono text-sm md:text-base space-y-4 border border-border">
            <p>1. <strong>Synchroniser les Boucliers (Mise au même dénominateur) :</strong></p>
            <p className="text-slate-600 dark:text-slate-400 pl-4 border-l-4 border-indigo-300 ml-4">
              La première fraction a un 6 en bas. La deuxième a un 3 en bas. <br/>
              On va multiplier la 2ème par <strong>2</strong> (en Haut ET en Bas) car 3×2 = 6 !
            </p>
            <FormulaBox formula="(2 × 2) / (3 × 2) = 4 / 6" />
            
            <p className="mt-4">2. <strong>Le Choc des Épées (Soustraction) :</strong></p>
            <p className="text-slate-600 dark:text-slate-400 pl-4 border-l-4 border-rose-300 ml-4">
              On aligne nos fractions : `7/6 - 4/6` <br/>
              On soustrait les hauts, on <strong>GARDE INTACT</strong> le bas ! <br/>
              (7 - 4) = 3.
            </p>
            <p className="font-bold text-lg text-rose-600 dark:text-rose-400 pl-8 mt-2">Résultat : 3 / 6</p>
            
            <p className="mt-4">3. <strong>La Pure Simplification (Le soin final) :</strong></p>
            <p className="text-slate-600 dark:text-slate-400 pl-4 border-l-4 border-emerald-300 ml-4">
              3 et 6 sont dans la table de 3 ! On divise en haut et en bas par 3.
            </p>
            <p className="font-bold text-2xl text-emerald-600 dark:text-emerald-400 pl-8 mt-2">Résultat final = 1 / 2</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Test des Boucliers" icon="🛡️" color="emerald">
        <p className="mb-4">Complète la préparation de ce combat !</p>
        <FillInTheBlanks 
          id="frac-eval"
          content={[
            "Pour calculer 5/4 + 7/12, je vois que les ",
            { options: ["numérateurs", "dénominateurs", "signes"], correctAnswer: 1 },
            " sont différents. Je dois donc transformer la fraction ",
            { options: ["5/4", "7/12"], correctAnswer: 0 },
            ". Pour cela, je multiplie son haut et son bas par ",
            { options: ["2", "3", "4"], correctAnswer: 1 },
            " pour que le bouclier devienne 12. La fraction devient donc ",
            { options: ["15/12", "10/8", "8/12"], correctAnswer: 0 },
            ". Je peux enfin additionner les ",
            { options: ["les deux bas ensemble", "les deux hauts ensemble"], correctAnswer: 1 },
            " ce qui donne (15+7) = 22. Le résultat total est 22/12, que je pourrais ensuite simplifier en divisant par 2 !"
          ]}
        />
      </Section>

      <Section title="🎯 Quiz de Survie" icon="🏆" color="purple">
        <Quiz 
          questions={[
            {
              question: "Si j'attaque ce calcul : (10/2) + (5/2), quel est le résultat ?",
              options: [
                "15/4 (L'horreur totale !)",
                "15/2 (La maîtrise parfaite !)"
              ],
              correctAnswer: 1,
              explanation: "INCROYABLEMENT FAUX pour la première option ! On additionne JAMAIS les dénominateurs. Le bouclier reste le même, on ajoute juste les quantités en haut. C'est 15/2."
            },
            {
              question: "Est-ce qu'on a le droit de DIVISER pour créer une fraction clone ?",
              options: [
                "Oui, ça s'appelle simplifier la fraction.",
                "Non, on peut seulement multiplier."
              ],
              correctAnswer: 0,
              explanation: "Absolument Oui ! Diviser à la fois le numérateur et le dénominateur par le même nombre est l'arme de SIMPLIFICATION pour une lecture plus claire ou un résultat parfait."
            },
            {
              question: "Quelle fraction est un CLONE exact de 2/3 ?",
              options: [
                "4/9",
                "10/15",
                "3/2"
              ],
              correctAnswer: 1,
              explanation: "Il faut multiplier en haut et en bas par un même nombre. Si je multiplie par 5 :  2×5 = 10 et 3×5 = 15. Donc 10/15 est le clone parfait !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais simplifier une fraction en divisant le haut et le bas par un diviseur commun.",
            "Avant d'additionner ou de soustraire, je vérifie TOUJOURS si le chiffre du bas est le même.",
            "Si les dénominateurs sont différents, j'utilise la multiplication (haut/bas) pour les synchroniser.",
            "Lors de l'addition ou la soustraction finale, on ne touche PLUS au chiffre du bas !"
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

export default Course_5eme_03_Fractions_Calculs;
