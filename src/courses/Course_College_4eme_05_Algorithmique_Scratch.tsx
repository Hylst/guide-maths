import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Code, Terminal, Play, Repeat, Navigation, PackageOpen } from 'lucide-react';

const Course_College_4eme_05_Scratch: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-05"
        title="Algorithmique et Scratch"
        subtitle="Contrôle la matrice, sois le marionnettiste du Chat"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Se repérer dans un plan (x,y)", "Notions de distances"]}
        objectives={[
          "Comprendre ce qu'est une Variable (Une boîte magique).",
          "Maîtriser les boucles ('Répéter' vs 'Répéter Indéfiniment').",
          "Anticiper les coordonnées (x,y) de fin de mouvement.",
          "Lire et prédire le tracé exact d'un algorithme au Brevet."
        ]}
      />

      <Section title="🌟 Introduction : Le pouvoir d'un Algorithme" icon="💻" color="slate">
        <p>
          Un ordinateur est la machine la plus stupide de la création. Il obéit aveuglément sans jamais réfléchir. Un "Algorithme", c'est simplement une <strong>recette de cuisine ultra-détaillée</strong> que tu lui donnes.
        </p>
        <p className="mt-4">
          Dans le langage Scratch, on emboîte des blocs comme des Lego. Au Brevet, on va te donner un algorithme construit et te demander : <em>"Si je clique sur le drapeau vert, que va t-il se dessiner sur l'écran ?"</em>. À toi d'être le compileur humain !
        </p>
      </Section>

      <Section title="1. Le Plan de Travail (x, y) et l'Orientation" icon="🗺️" color="indigo">
        <p className="mb-4">Le chat de Scratch vit dans un univers en 2D parfait. Le centre de son écran de jeu est le point <strong className="font-mono bg-indigo-100 dark:bg-indigo-900/50 px-2 py-1 rounded">(0, 0)</strong>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-card p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm relative overflow-hidden">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-300">
                <Navigation className="w-5 h-5"/> L'Axe des coordonnées
              </h3>
              <ul className="space-y-3 font-medium z-10 relative">
                <li><strong className="text-rose-500">x</strong> : Droite (positif) / Gauche (négatif).</li>
                <li><strong className="text-sky-500">y</strong> : Haut (positif) / Bas (négatif).</li>
              </ul>
              <div className="mt-4 bg-muted p-3 rounded font-mono text-sm border">
                aller à x: (50) y: (-20) &rarr; Le chat est en bas à droite !
              </div>
           </div>
           
           <div className="bg-card p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm relative overflow-hidden">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-300">
                <Navigation className="w-5 h-5"/> L'Orientation (Le Regard)
              </h3>
              <ul className="space-y-3 font-medium z-10 relative">
                <li><strong>90°</strong> : Regarde à Droite (Par défaut).</li>
                <li><strong>-90°</strong> : Regarde à Gauche.</li>
                <li><strong>0°</strong> : Regarde en Haut.</li>
                <li><strong>180°</strong> : Regarde en Bas.</li>
              </ul>
           </div>
        </div>
        
        <TipBanner title="Le piège de la Plume" type="warning">
           Un chat qui bouge ne dessine rien ! Il faut OBLIGATOIREMENT le bloc <strong>"Stylo en position d'écriture"</strong>. Si l'algorithme oublie ce bloc, le chat court mais aucune trace n'est laissée (Réponse piège au Brevet !).
        </TipBanner>
      </Section>

      <Section title="2. Les Variables (Les Boîtes Secrètes)" icon="📦" color="blue">
        <p className="mb-4">Une « Variable », c't'une boîte en carton virtuelle sur laquelle tu places une étiquette (exemple: "Score", "Longueur", "Vie"). Tu mets une donnée dedans, et tu peux la modifier quand tu veux !</p>

        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800 my-6 flex flex-col md:flex-row gap-6 items-center">
           <PackageOpen className="w-24 h-24 text-sky-500 flex-shrink-0" />
           <div>
             <div className="font-mono bg-card dark:bg-black/30 p-3 rounded border mb-4">
               (1) Mettre [Longueur] à 50<br/>
               (2) Avancer de (Longueur)<br/>
               (3) Ajouter 10 à [Longueur]<br/>
               (4) Avancer de (Longueur)
             </div>
             <p className="text-sm font-medium">
               <strong>Traduction :</strong> Au début, ma boîte 'Longueur' contient 50. Je fais un trait de 50. Ensuite j'AJOUTE 10 dans la boîte ! La boîte contient maintenant <strong>60</strong>. Mon deuxième trait fera 60 ! C'est magique pour faire des escargots s'Agrandissant à chaque tour.
             </p>
           </div>
        </div>
      </Section>

      <Section title="3. Les Boucles et les Angles" icon="🔁" color="emerald">
        <p className="mb-4">Si un chat doit dessiner un Carré, on ne va pas écrire 4 fois "Avance de 100", "Tourne". On utilise le bloc orange fantastique : <strong>Répéter (4) fois</strong>.</p>
        
        <InteractiveExercise 
          title="Le secret des Angles Extérieurs"
          question={<>Pour dessiner une FIGURE FERMÉE RÉGULIÈRE, tu dois utiliser la formule sacrée : <strong>Angle de Rotation = 360 / Nombre de Côtés</strong>. Quel est l'angle pour un Triangle Équilatéral ?</>}
          steps={[
            <><strong>Nombre de côtés :</strong> Un triangle en a 3.</>,
            <><strong>L'opération :</strong> 360 &divide; 3 = 120.</>,
            <><strong>Le bloc magique :</strong> Tourner de (120) degrés.</>,
            <><strong>L'Erreur Mondiale :</strong> Beaucoup d'élèves mettent 60° car l'angle À L'INTÉRIEUR du triangle fait 60°. Mais le chat avance, et pour TOURNER il fait le virage EXTÉRIEUR au sommet ! Il tourne brutalement de 120° (le supplément pour faire un demi-tour de 180 : 180-60=120).</>
          ]}
        />
        
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 snap-x">
          <div className="bg-card dark:bg-black/40 border p-4 rounded-xl shadow-sm min-w-[200px] snap-center">
             <div className="font-bold text-center border-b pb-2 mb-2">CARRÉ</div>
             <div className="font-mono text-sm text-center">Répéter (4) fois<br/>Avancer de X<br/>Tourner ↻ 90°</div>
          </div>
          <div className="bg-card dark:bg-black/40 border p-4 rounded-xl shadow-sm min-w-[200px] snap-center">
             <div className="font-bold text-center border-b pb-2 mb-2">TRIANGLE EQU.</div>
             <div className="font-mono text-sm text-center">Répéter (3) fois<br/>Avancer de X<br/>Tourner ↻ 120°</div>
          </div>
          <div className="bg-card dark:bg-black/40 border p-4 rounded-xl shadow-sm min-w-[200px] snap-center">
             <div className="font-bold text-center border-b pb-2 mb-2">HEXAGONE</div>
             <div className="font-mono text-sm text-center">Répéter (6) fois<br/>Avancer de X<br/>Tourner ↻ 60°</div>
          </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le chat pointe vers 90° et j'execute "Tourner ↻ 90°". Vers où regarde-t-il ?</>}
            back={<>Il pointait à Droite (90). Il tourne sur sa droite (aiguille montre) de 90°. Il finit par regarder en <strong>Bas (180°) !</strong></>}
          />
          <Flashcard 
            front={<>À quoi sert le bloc "Effacer tout" au début de chaque algorithme propre ?</>}
            back={<>A réinitialiser la toile virtuelle ! Sinon, chaque fois que tu cliques sur le drapeau vert, les nouveaux dessins s'impriment par dessus les anciens comme du gribouillage infini.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai des Boucles Imbriquées : Un 'Répéter 5 fois' dans un 'Répéter 3 fois' ?",
              answer: "Tu mutliplies ! Le Répéter 5 va s'executer ENTIEREMENT, 3 fois de suite (5x3 = 15). C'est hyper utile pour faire des Motifs. Par ex: Si le bloc intérieur fait un Carré (4 fois). Le bloc extérieur 'Répeter 10' fera dessiner ce Carré 10 fois à la suite pour faire une fleur !"
            },
            {
              question: "Quelle est la différence entre 'Mettre VIE à 10' et 'Ajouter 10 à VIE' ?",
              answer: "Différence de survie absolue ! Mettre à 10 écrase ce qu'il y avait avant. Je mets le remplaçant 10 (Ton score revient brutalement à 10). Ajouter 10, c'est un cumulatif (+10). Si tu avais 5, tu passes à 15."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "L'instruction `s'orienter à 0` fait pointer le chat vers :",
              options: [
                "Le point Cardinal NORD (Haut)",
                "Le point Cardinal EST (Droite - L'axe des x classiques)",
                "Il ne pointe pas, il disparait à la case Zéro."
              ],
              correctAnswer: 0,
              explanation: "Top ! Sur Scratch, 0 pointe en HAUT ! (90 c'est à droite, 180 en bas, -90 à gauche)."
            },
            {
              question: "Je suis à (0, 0). J'avance de 50 (orienté droite), je tourne de 90° ↺ (anti-horaire), et j'avance de 20. Mes coordonnées finales sont :",
              options: [
                "(50, 20)",
                "(20, 50)",
                "(-50, -20)"
              ],
              correctAnswer: 0,
              explanation: "Génial ! Je pars de zéro. Je vais vers la droite de 50 -> Coordonnées (50, 0). Puis je tourne Anti-horaire (je braque à gauche donc vers le Haut !), j'avance de 20 -> Le 'y' monte à 20. Finale: x:50, y:20 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Toujours chercher le bloc 'Stylo en position d'écriture' pour voir si ça trace VRAIMENT.",
            "Visualise au brouillon les directions avec une petite flèche.",
            "Angle extérieur du virage = 360 / Nb de cotés de la figure visée."
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

export default Course_College_4eme_05_Scratch;
