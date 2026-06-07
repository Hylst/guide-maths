import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Triangle, Search, Maximize, CopyCheck } from 'lucide-react';

const Course_College_4eme_10_Triangles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-10"
        title="Triangles Égaux et Semblables"
        subtitle="L'Art du Clonage et des Poupées Russes"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Mesurer un angle et utiliser un rapporteur", "Notion de proportionnalité"]}
        objectives={[
          "Reconnaître deux Triangles Égaux (Clonage Parfait).",
          "Connaître les cas d'égalité pour Prouver que les triangles sont égaux.",
          "Reconnaître deux Triangles Semblables (Poupées Russes).",
          "Démontrer la similitude à l'aide des angles ou des longueurs."
        ]}
      />

      <Section title="🌟 Introduction : Clones vs Famille" icon="🧬" color="slate">
        <p>
          En géométrie, repérer deux triangles identiques est génial, car cela te permet de voler toutes les longueurs et tous les angles d'un triangle pour les offrir à l'autre sans faire le moindre calcul.
        </p>
        <p className="mt-4">
          La 4ème t'apprend à distinguer deux cas : Le <strong>Clonage Superposable</strong> (Les triangles Égaux) et le <strong>Facteur d'Agrandissement</strong> (Les triangles Semblables, qui ont la même forme mais pas la même taille).
        </p>
      </Section>

      <Section title="1. Triangles Égaux (Les Clones Superposables)" icon="Twin" color="indigo">
        <p className="mb-4">Deux triangles sont ÉGAUX si tu peux les découper avec un ciseau et les superposer l'un sur l'autre de manière PARFAITE. Toutes leurs longueurs sont deux à deux identiques, tous leurs angles le sont aussi.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm my-6">
           <h3 className="font-bold flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-300">
             🛠️ Comment prouver l'Égalité PARFAITE ? (Les 3 conditions Ninja)
           </h3>
           <p className="text-sm mb-4">Au brevet, tu n'as pas de ciseaux. Tu dois jouer l'inspecteur. Il suffit de vérifier <strong>L'UN</strong> de ces 3 cas (pas les 3 à la fois !) :</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-card dark:bg-black/40 p-4 border rounded shadow-sm text-center">
               <span className="font-bold block mb-2 text-indigo-600 dark:text-indigo-400">CAS 1 : Trois Côtés</span>
               <p className="text-sm">Si les 3 côtés du premier ont EXACTEMENT les mêmes longueurs que les 3 côtés du deuxième, fin du débat. Ils l'égalité est parfaite.</p>
             </div>
             
             <div className="bg-card dark:bg-black/40 p-4 border border-indigo-500 rounded shadow-sm text-center">
               <span className="font-bold block mb-2 text-indigo-600 dark:text-indigo-400">CAS 2 : Le Sandwich d'Angle</span>
               <p className="text-sm">Ils ont un Angle de même mesure, <strong>POINCÉ (pris en sandwich)</strong> entre deux longueurs de côtés égales.</p>
             </div>
             
             <div className="bg-card dark:bg-black/40 p-4 border rounded shadow-sm text-center">
               <span className="font-bold block mb-2 text-indigo-600 dark:text-indigo-400">CAS 3 : Le Sandwich de Côté</span>
               <p className="text-sm">Ils ont un côté de même longueur, <strong>POINCÉ (coincé)</strong> entre deux angles de mêmes mesures.</p>
             </div>
           </div>
        </div>

        <TipBanner title="L'Alerte Angles !" type="warning">
           Avoir 3 Angles Égaux <strong>NE SUFFIT PAS</strong> pour dire que les triangles sont des Clones Égaux !! <br/>
           Prends un petit triangle équilatéral (3 fois 60°) et le grand triangle équilatéral d'une face de pyramide (3 fois 60° aussi)... Ils ont les mêmes angles, mais le petit n'est pas l'égal superposable du géant !
        </TipBanner>
      </Section>

      <Section title="2. Les Triangles Semblables (L'Effet Zoom)" icon="🔍" color="emerald">
        <p className="mb-4">Voici la vraie famille : Deux triangles sont <strong>SEMBLABLES</strong> si la forme et l'âme du triangle sont préservées, mais que sa taille a subi un Coup de Zoom (Agrandissement, ou Réduction).</p>

        <InteractiveExercise 
          title="Les 2 Manières de démasquer la Similitude"
          question={<>L'Inspecteur veut prouver que le Triangle DEF est un "Zoom" (Semblable) du Triangle ABC. Comment le prouver ?</>}
          steps={[
             <><strong>Voie Rapide (L'Alerte Radar des Angles) :</strong> Ouvre les yeux. Si les 3 ANGLÉS du petit triangle sont rigoureusement identiques aux 3 ANGLES du grand triangle, ce sont des Poupées Russes ! (Astuce: 2 angles identiques suffisent ! Car la somme fait toujours 180°, le 3ème sera forcé d'être égal).</>,
             <><strong>Voie Lente (La Police de la Proportionnalité) :</strong> Tu prends les 3 côtés du grand, et tu les divises par les 3 côtés respectifs du petit.</>,
             <>Si <code>GrandCôté1 / PetitCôté1 = K</code>.<br/>Si <code>GrandCôté2 / PetitCôté2 = K</code>.<br/>Si <code>GrandCôté3 / PetitCôté3 = K</code>.</>,
             <>Le coefficient <strong>K (le Facteur d'agrandissement)</strong> est partout le même ! La matrice a bien zoomé de K d'un seul coup propre. Ils sont proportionnels, donc Semblables !</>
          ]}
        />
      </Section>

      <Section title="3. L'Ordre des Côtés Homologues (La Loi du Plus Faible)" icon="⚖️" color="blue">
        <p className="mb-4">Alerte Maximum au Brevet : Ne divise pas n'importe quel côté par n'importe lequel ! Pour faire ton test de proportionalité 'K', tu dois affronter les côtés de même rang social.</p>

        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border-l-4 border-l-sky-500 shadow-sm my-4">
           <h3 className="font-bold mb-2">La Synchronisation des Combattants :</h3>
           <ul className="list-decimal pl-5 space-y-2 mt-2 font-medium">
             <li>Tu identifies le PLUS GRAND côté du grand, ET tu le divises par le PLUS GRAND côté du petit.</li>
             <li>Tu identifies le MOYEN de l'un, et tu le divises par le MOYEN de l'autre.</li>
             <li>Le PLUS PETIT avec le PLUS PETIT.</li>
           </ul>
           <p className="text-sm mt-4 text-sky-700 dark:text-sky-300 italic">"On appelle ces côtés mariés ensemble les <strong>côtés homologues</strong> (ceux qui jouent le même rôle dans la forme des deux triangles)."</p>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le Grand a pour côtés : 6, 8 et 10.<br/>Le Petit : 3, 4 et 5.<br/>Le prof demande de prouver qu'ils sont Semblables.</>}
            back={<>Facile ! Je fais les ratios (Grand/Petit):<br/>- (Grand vs Grand) : 10 / 5 = <strong>2</strong><br/>- (Moyen vs Moyen) : 8 / 4 = <strong>2</strong><br/>- (Petit vs Petit) : 6 / 3 = <strong>2</strong><br/>Les 3 ratios valent 2 ! Le Zoom x2 est prouvé, ils sont semblables.</>}
          />
          <Flashcard 
            front={<>Est-ce que deux Triangles ÉGO (Clones superposables) sont aussi des Triangles SEMBLABLES (Famille Zoom) ?</>}
            back={<><strong>OUI ! Absolument.</strong><br/>Un Triangle Egal est un Triangle Semblable qui a subit une multiplication par "1" ! (Il a zoomé de 1, donc il ne s'est pas agrandi). Tout clone est de la Famille.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "A quoi ça sert d'utiliser les cas d'Egalité (Sandwich) au lieu de juste mesurer ?",
              answer: "Parce que sur le papier du brevet, le dessin est marqué 'La Figure n'est Pas en Vraie Grandeur'. Tricher avec ta règle te donne 0/20. Tu DOIS déduire les preuves logiques via les théorèmes du Sandwich (angle coincé entre deux longueurs textuelles)."
            },
            {
              question: "On parle de 'Coefficient d'Agrandissement' (K) ? Et si je réduis ?",
              answer: "C'est pareil ! Le monde est cruel. Si ton 'K' est plus grand que 1 (ex: K=3), c'est un Agrandissement. Si ton 'K' est compris entre 0 et 1 (ex: K=0,5 ou 1/2), le zoom inverse et réduit ton objet à la moitié ! C'est une Réduction."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si deux triangles ont leurs anges égaux à (30°, 60° et 90°)... Qu'est-ce que je peux crier haut et fort ?",
              options: [
                "Ils sont superposables, j'ai fini. (Triangles Egaux)",
                "Ce sont des Triangles Semblables (Zoom), leurs côtés sont forcément proportionnels.",
                "Je ne peux rien dire."
              ],
              correctAnswer: 1,
              explanation: "Top ! Les angles sont les Gènes du Triangle. S'ils partagent les 3 mêmes angles, c'est obligatoirement des frères ZOOM (Triangles Semblables). On ne peut PAS dire qu'ils sont égaux car on ne connait la taille du corps de personne !"
            },
            {
              question: "Pour utiliser le 'Cas d'égalité Côté-Angle-Côté' (Le Sandwich), il faut impérativement que...",
              options: [
                "L'angle soit n'importe où dans le triangle (ex: en haut).",
                "L'angle soit LITTÉRALEMENT au sommet de jonction, coincé entre les deux Côtés d'égales longueurs cités.",
                "C'est faux, ça n'existe pas."
              ],
              correctAnswer: 1,
              explanation: "Victoire de la Pureté ! Un Sandwich doit être pressé de toute part. L'angle de (ex: 40°) doit être l'angle EXACT généré par l'intersection du côté de 5cm et du côté de 8cm."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Au lieu de paniquer, je classe les mesures de la plus petite à la plus grande pour les diviser proprement.",
            "Angles Égaux = Triangles qui ont la même proportion !",
            "Leur demander s'ils sont 'Clones' ou 'Frères' aide mon cerveau à voir."
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

export default Course_College_4eme_10_Triangles;
