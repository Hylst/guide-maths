import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Database, Infinity, Layers, BookOpen } from 'lucide-react';

const Course_Primaire_CE2_01_Nombres_jusqua_10000: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE2-01"
        title="Les Nombres jusqu'à 10 000"
        subtitle="Entrée dans le Royaume des Milliers et de l'Infini"
        duration="45min"
        level="CE2"
        prerequisites={["Les Nombres jusqu'à 1 000 (CE1)", "Savoir lire un nombre à 3 chiffres"]}
        objectives={[
          "Franchir le mur du Mille (1 000).",
          "Lire, Écrire et Décomposer des nombres à 4 chiffres.",
          "Comprendre l'Espace entre les classes (Le Vide Magique)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Le CE2 est l'année charnière où l'on bascule dans les nombres à quatre chiffres : le royaume des milliers. Cette étape demande d'intégrer une nouvelle classe (la classe des milliers), tout en veillant à introduire l'espace de respiration indispensable à la lecture globale. La manipulation de cubes de mille ou d'objets fictifs de grande taille facilite grandement cette transition.
      </InfoBlock>

      <Section title="1. La Découverte du Gros Cube Ultime (Le Mille)" icon={<Database className="w-6 h-6" />} color="blue">
        <p className="mb-4">Souviens-toi de la Plaque verte des Centaines (100). Et bien si Monsieur le Président décide d'Empiler <strong>10 Plaques Vertes</strong>, l'une sur l'autre...</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 shadow-sm flex flex-col md:flex-row gap-6 items-center my-6">
           <div className="flex-1 text-center">
             <div className="text-4xl mb-2 flex justify-center">
               <div className="h-16 w-16 bg-emerald-500 rounded border-2 border-emerald-600 shadow-sm"></div>
             </div>
             <div className="font-bold text-emerald-700 dark:text-emerald-300">1 Centaine (c)</div>
             <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">La Plaque (100)</p>
           </div>
           
           <div className="text-slate-400 font-bold text-2xl">👉 x10 👉</div>

           <div className="flex-1 text-center">
             <div className="text-4xl mb-2 flex justify-center">
                <div className="w-20 h-20 bg-amber-500 rounded-lg border-4 border-amber-600 shadow-xl transform rotate-3 flex items-center justify-center text-white font-bold text-xl drop-shadow-md">1 K</div>
             </div>
             <div className="font-bold text-amber-700 dark:text-amber-300">1 MILLIER (m)</div>
             <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Le Cube Ultime en Or Massif.<br/>1 Cube = 10 Plaques = 1000 !</p>
           </div>
        </div>
        
        <TipBanner title="Le Changement de Nom (Classe des Mille)" type="info">
           Quand on entre dans le Royaume du 1 000, le nombre vient d'avoir son 4eme Chiffre.  (L'unité de Mille a pour symbole <strong className="text-amber-600 dark:text-amber-400">m</strong>). On a maintenant la chaine longue : <strong>m - c - d - u</strong> !
        </TipBanner>
      </Section>

      <Section title="2. Le Vide Magique (L'Espace pour lire)" icon={<Layers className="w-6 h-6" />} color="indigo">
        <p className="mb-4">Au dessus de 1000, les nombres deviennent tellement longs que tes yeux peuvent saigner. La Règle Magique : <strong>LE VIDE.</strong></p>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-5 rounded-2xl border-l-4 border-indigo-500 mb-6 font-mono text-center text-xl">
           <p className="text-slate-900 dark:text-slate-100 dark:text-slate-200">Pour écrire : Cinq-mille-deux-cent-quatre-vingt.</p>
           <h4 className="text-red-500 line-through mt-2">5280</h4>
           <h4 className="text-emerald-600 dark:text-emerald-400 font-bold text-3xl mt-2 tracking-widest">5 280</h4>
        </div>

        <div className="bg-card dark:bg-slate-800 p-4 rounded shadow border border-indigo-100">
          <p>La règle est stricte au CE2 : On laisse <strong>Un Petit Espace Vide</strong>(Comme une respiration) pour séparer la Classe des Mille (à gauche) de la Classe des Petites Unités (à droite). On compte 3 chiffres depuis la fin, un espace, et on écrit les Mille !</p>
        </div>
      </Section>

      <Section title="3. La Gande Décomposition (Boss Niveau 4)" icon={<BookOpen className="w-6 h-6" />} color="amber">
        <p className="mb-4">Tout comme au CE1, le nombre se découpe en Pièces de puzzles, mais maintenant on joue dans la cour des grands.</p>

        <InteractiveExercise 
          title="Découpage Thermonucléaire de 6 045 !"
          question={<>Comment écrire le terrifiant nombre <strong>6 045</strong> en l'aplatissant sur la table par la décomposition ?</>}
          steps={[
            <><strong>1. Le Front Millénaire (m) :</strong> Le "6" de Gauche. C'est 6 Cubes d'Or de Mille. Ca fait le poids lourd : <strong>6 000</strong> !</>,
            <><strong>2. Le Zéro Piège des Plaques (c) :</strong> Le 2ème Chiffre '0'. Pas de Centaine ! On zappe et laisse 0. La Plaque verte est en rupture de stock.</>,
            <><strong>3. La Barre Dizaine (d) :</strong> Le '4'. 4 Barres bleu de 10 = <strong>40</strong>.</>,
            <><strong>4. L'Unité final (u) :</strong> Le '5' unité cube = <strong>5</strong>.</>,
            <><strong>L'Explosion Finale :</strong> On rassemble Les Super Saiyans !! <strong>6 045 = 6 000 + 40 + 5 ！！</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Combien de Zéros posséde le boss final "Dix Mille (10 000)" ?</>}
            back={<><strong>4 ZEROS !</strong><br/>Regarde le bien dans les yeux : 10 000 ! (Le '10' collé au '000' magique séparé par son vide divin !).</>}
          />
          <Flashcard 
            front={<>Le Monstre Vrai/Faux : "8 500 c'est Huit Cent Cinquante" ?</>}
            back={<><strong>FAUX ABSOLU !!!!</strong><br/>Dès qu'il y a cet <strong>Espace vide</strong>, le mot MILLE doit sortir de ta bouche directemen : "Huit <strong>Mille</strong> cinq-cent !"</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'écriture au propre (au format CE2 légal de la respiration magique) du nombre : '3492' ?",
              options: [
                "3492",
                "3 492",
                "34 92"
              ],
              correctAnswer: 1,
              explanation: "Top ! L'espace vient piler séparer La Boite des UNITES SIMPLES (3 par paquets : u,d,c) de la Boite Des Milliers. L'Espace est après les 3 permiers en partant de la droite : 3[vide]492."
            },
            {
              question: "J'ai 7 Cubes Or Millier, et 1 petit cube d'Unité tout perdu. Qui suis-je dans les Ténèbres ?!",
              options: [
                "7 100",
                "7 001",
                "7 010"
              ],
              correctAnswer: 1,
              explanation: "La Forme ultime 7001 ! Tu as ZERO Plaque Centaine, ZERO Barre Dizaine... Tu dois boucher les trous avec les Super Gardiens Zéro !! Sinon ton 7 s'écrase sur ton 1 et fait '71' !! 7 001 est parfait !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle d'Ecriture CE2 : Les nombres se coupent par 3 (Par la Droite) avec un blanc ! (4 500).",
            "Le Mot 'MILLE' ne prend jamais de M. Jamais Jamais de 's' à Mille (Deux-mille, oui).",
            "Mémorisé: Les Trous de la découpe s'écrivent '0' pour tenir la charpente !."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider la Leçon (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CE2_01_Nombres_jusqua_10000;
