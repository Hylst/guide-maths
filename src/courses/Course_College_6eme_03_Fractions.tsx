import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { PieChart, Divide, MoveRight, Coins, Scissors } from 'lucide-react';

const FractionPizzaVisualizer: React.FC = () => {
  const [slices, setSlices] = useState(8);
  const [eaten, setEaten] = useState(3);

  // Set limits safely
  const handleSlicesChange = (newSlices: number) => {
    setSlices(newSlices);
    if (eaten > newSlices) setEaten(newSlices);
  };

  // Generate SVG slice path
  const getSlicePath = (index: number) => {
    const angleStep = 360 / slices;
    const startAngle = index * angleStep - 90; // Start at top
    const endAngle = (index + 1) * angleStep - 90;

    const rad = Math.PI / 180;
    const x1 = 100 + 80 * Math.cos(startAngle * rad);
    const y1 = 100 + 80 * Math.sin(startAngle * rad);
    const x2 = 100 + 80 * Math.cos(endAngle * rad);
    const y2 = 100 + 80 * Math.sin(endAngle * rad);

    const largeArc = angleStep > 180 ? 1 : 0;

    return `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-emerald-50/40 dark:bg-emerald-950/20 p-6 md:p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-900 my-8 shadow-sm">
      <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-lg mb-4 flex items-center gap-2">
        <PieChart className="text-emerald-500 w-5 h-5 animate-pulse" />
        Simulateur Interactif : Part de Gâteau &amp; Fractions
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Fais varier le dénominateur (nombre total de parts coupées de la pizza) et le numérateur (nombre de parts colorées de ta couleur préférée). Visualise instantanément la fraction obtenue et sa valeur décimale !
      </p>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Couper le Gâteau en (Dénominateur) : <span className="text-emerald-600 dark:text-emerald-400 text-lg font-black">{slices} parts</span>
          </label>
          <div className="flex gap-2">
            {[4, 6, 8, 12].map((num) => (
              <button 
                key={num}
                onClick={() => handleSlicesChange(num)}
                className={`flex-1 py-1.5 rounded-xl font-bold text-xs border transition-all ${slices === num ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 hover:bg-slate-100'}`}
              >
                {num} parts
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Prendre pour moi (Numérateur) : <span className="text-rose-600 dark:text-rose-400 text-lg font-black">{eaten} parts</span>
          </label>
          <input 
            type="range" min="0" max={slices} value={eaten} 
            onChange={(e) => setEaten(parseInt(e.target.value))}
            className="w-full accent-rose-600"
          />
        </div>
      </div>

      {/* Render layout */}
      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* SVG Graphic Pizza */}
        <div className="w-56 h-56 flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer plate */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            
            {/* Draw pizza slices */}
            {Array.from({ length: slices }).map((_, i) => {
              const isSelected = i < eaten;
              return (
                <path 
                  key={i}
                  d={getSlicePath(i)}
                  fill={isSelected ? '#10b981' : '#f1f5f9'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-all duration-300 hover:opacity-85"
                />
              );
            })}

            {/* Inner ring for realism */}
            <circle cx="100" cy="100" r="10" fill="#ffffff" className="dark:fill-slate-950" />
          </svg>
        </div>

        {/* Analytical Math Block */}
        <div className="text-center md:text-left space-y-3">
          <div className="text-sm font-bold text-slate-400 tracking-widest uppercase">ÉCRITURE FRACTIONNAIRE</div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="font-mono text-center">
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{eaten}</div>
              <div className="border-t-4 border-slate-450 w-16 mx-auto my-1.5"></div>
              <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{slices}</div>
            </div>
            <div className="text-2xl font-bold text-slate-400 font-mono">
              &rarr;
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800 dark:text-slate-200">
                {(eaten / slices).toFixed(3).replace('.', ',')}
              </div>
              <div className="text-xs font-bold text-slate-400">VALEUR DÉCIMALE APPROXIMATIVE</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            Ici, tu as sélectionné <strong>{eaten} parts sur {slices}</strong>. La fraction correspond au quotient exact de {eaten} divisé par {slices}.
          </p>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_03_Fractions: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-03"
        title="La Révélation des Fractions"
        subtitle="Le monde secret du Partage et des parts de Pizza"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Les divisions élémentaires de CM2", "Multiplication simple (Table de Pythagore)"]}
        objectives={[
          "Comprendre le Numérateur et Dénominateur (Le Haut / Le Bas).",
          "Placer une fraction simple sur un axe gradué.",
          "Simplifier une fraction par un nombre (Les clones d'égalité).",
          "Prendre la fraction d'un nombre (Argent, Poids)."
        ]}
      />

      <Section title="🌟 Introduction : Le Problème de l'Unité" icon="🍕" color="slate">
        <p>
          Si tu invites 3 amis, vous êtes 4. Tu commandes UNE pizza. Mais si tu tapes <code>1 &divide; 4</code> sur ta vieille calculatrice nokia, ça donne un nombre bizarre à virgule : "0,25". 
        </p>
        <p className="mt-4">
          La <strong>Fraction</strong> a été inventée pour garder l'honneur et l'écriture 'Pleine' d'un nombre sans utiliser de virgules ! Une fraction EST UNE DIVISION EN SUSPENS (qui refuse de se calculer de peur d'être décimale !).
        </p>
        <InfoBlock title="Zoom sur l'Histoire" type="info">
          Les Égyptiens anciens utilisaient déjà les fractions il y a de ça 4 000 ans ! Ils n'employaient cependant que des fractions dites unitaires (dont le numérateur vaut toujours 1) comme {"$\\frac{1}{2}$"}, {"$\\frac{1}{3}$"} ou {"$\\frac{1}{10}$"}, et s'en servaient pour répartir d'immenses récoltes de grain le long du Nil.
        </InfoBlock>
      </Section>

      <Section title="1. Anatomie de l'Élu (Haut & Bas)" icon="📋" color="indigo">
        <p className="mb-4">Une fraction c'est une barre d'énergie coupée en deux.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-indigo-50/50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800/60 shadow-sm my-6">
           <div className="font-mono text-center">
             <div className="text-4xl text-rose-500 font-black pb-2">3</div>
             <div className="border-t-4 border-indigo-500 w-24 mx-auto my-2 shadow"></div>
             <div className="text-4xl text-emerald-500 font-black pt-2">8</div>
           </div>
           
           <div className="space-y-4 w-full max-w-md">
             <div className="bg-card dark:bg-black/40 p-4 border-l-4 border-rose-500 rounded shadow">
               <h4 className="font-bold text-rose-600 dark:text-rose-400">Le NUMÉRATEUR (Nuage, En Haut)</h4>
               <p className="text-sm mt-1">C'est ma part à moi. "J'ai mangé 3 parts...". C'est le compteur d'action.</p>
             </div>
             <div className="bg-card dark:bg-black/40 p-4 border-l-4 border-emerald-500 rounded shadow">
               <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Le DÉNOMINATEUR (Démon, En Bas)</h4>
               <p className="text-sm mt-1">Le Dieu de l'architecture. La Pizza de la Pizzeria a été initialement coupée EN HUIT (8). C'est la Loi de l'Univers total.</p>
             </div>
           </div>
        </div>
      </Section>

      <Section title="2. Schéma Interactif : Notre Pizza Virtuelle" icon="🍕" color="indigo">
        <FractionPizzaVisualizer />
        <InfoBlock title="Rappel important" type="reminder">
          Le dénominateur (en bas) ne peut jamais être égal à zéro ! Diviser par zéro est chimiquement impossible en mathématiques puisqu'on ne peut pas partager un gâteau qui n'existe tout simplement pas.
        </InfoBlock>
      </Section>

      <Section title="3. Des Clones Mathématiques (Les Égalités)" icon="🧬" color="blue">
        <p className="mb-4">Si je te donne (1/2) de Gâteau, je te donne 'Une Moitié'. Mais si mon gâteau était coupé en Quartiers (4), je pourrais te donner (2/4) de Gâteau... Tu aurais LE MÊME POIDS de gâteau au fond du ventre !</p>

        <TipBanner title="La Règle de Multi-Division" type="success">
           Une Fraction <strong>ne change jamais de Valeur (Ni de Gâteau)</strong> si l'on Multiplie (ou Divise) le Numérateur (HAUT) <strong>ET</strong> le Dénominateur (BAS) par le <em>même Nombre secret</em> !<br/><br/>
           <span className="font-mono bg-sky-200 dark:bg-sky-800 text-slate-800 dark:text-slate-100 px-3 py-1 rounded inline-block text-lg">1/2</span> &rarr; (On fait x3 en haut et x3 en bas) &rarr; <span className="font-mono bg-sky-200 dark:bg-sky-800 text-slate-800 dark:text-slate-100 px-3 py-1 rounded inline-block text-lg">3/6</span><br/>
           (3/6 c'est '3 parts sur un gâteau de 6'... ce qui est scrupuleusement la Moitié !). Les fractions sont des Clones Égaux !
        </TipBanner>

        <p className="mt-4 text-sm bg-card p-4 rounded border"><strong>La SIMPLIFICATION</strong> c'est l'inverse ! On a une fraction lourde (10 / 20). On divise le HAUT et le BAS par '10'. Et paf, elle devient plus 'Légère' : (1 / 2) ! Toujours rendre son épée Irréductible !</p>
      </Section>

      <Section title="4. La Fraction d'une Quantité" icon="💰" color="amber">
        <p className="mb-4">Problème Star : Mon coffre abrite "600 Euros". L'État exige les (2/3) de ma fortune pour renflouer les routes. Combien je perds ?</p>

        <InteractiveExercise 
          title="Le Grand Siphonage de l'Ogre"
          question={<>Prends (2/3) de : 600€.</>}
          steps={[
            <><strong>La Loi de la Grammaire :</strong> En Maths, et en l'occurrence avec les fractions, le petit mot Français "DE" se traduit Systématiquement par le symbole Multiplication <strong>("&times;")</strong>.</>,
            <><strong>L'Équation s'écrit :</strong> Je veux calculer : <code>(2 / 3) &times; 600</code>.</>,
            <><strong>Étape 1 : Le Découpage Physique (On s'occupe de la Loi du Bas).</strong> On divise immédiatement la Cible 600 par le bloc d'Univers Diviseur (3). <br/>Je coupe 600 en 3. <code>600 / 3 = 200€</code>. (Un 'tiers' unitaire vaut donc 200€).</>,
            <><strong>Étape 2 : L'Aspiration d'Activité (La Loi du Haut).</strong> L'Ogre numérateur veut "2" briques (Deux fois l'unitaire calculé).<br/>Je multiplie par 2 ! <code>200 &times; 2 = 400€</code>.</>,
            <><strong>Finalité :</strong> Les "Deux-Tiers de 600" valent <strong>400€</strong>.</>
          ]}
        />
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Simplification de fraction</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Simplifie le plus possible la fraction suivante : <strong>{"$\\frac{24}{36}$"}</strong>.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>On remarque que 24 et 36 sont des nombres pairs. On peut donc commencer par diviser le haut et le bas par 2 :
                  <br /><span className="font-mono text-xs text-indigo-600">{"$\\frac{24 \\div 2}{36 \\div 2} = \\frac{12}{18}$"}</span>.
                </li>
                <li>Le nombre 12 et 18 sont de grands amis dans la table de 6 ou à nouveau pairs ! Recommençons en divisant par 6 directement :
                  <br /><span className="font-mono text-xs text-indigo-600">{"$\\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$"}</span>.
                </li>
                <li>La fraction {"$\\frac{2}{3}$"} est irréductible car 2 et 3 n'ont plus d'autres diviseurs communs significatifs que 1 !</li>
                <li><strong>Note de pro :</strong> On aurait également pu diviser directement en une seule étape par 12 (car le PGCD de 24 et 36 est 12) : 24 / 12 = 2 et 36 / 12 = 3.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Calcul de portion d'ingrédients</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Une recette pour 6 sorciers nécessite <strong>{"$\\frac{3}{5}$"}</strong> de 350 grammes de farine. Combien de farine doit-on récolter en grammes ?
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Le terme "de" se traduit par une multiplication, on cherche à calculer : {"$\\frac{3}{5} \\times 350$"}.</li>
                <li>D'abord, on divise le poids global par 5 (le diviseur universel en bas) :
                  <br /><strong className="text-slate-800 dark:text-slate-200">350 / 5 = 70 g</strong> (chaque part vaut donc 70 grammes).
                </li>
                <li>Puis, de ces 5 parts, on souhaite en récupérer 3 (numérateur en haut) :
                  <br /><strong className="text-slate-800 dark:text-slate-200">70 &times; 3 = 210 g</strong>.
                </li>
                <li>Il nous faut récupérer <strong>210 grammes</strong> de farine !</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Place la fraction (7/4) sur ton Axe de Graduation.</>}
            back={<><strong>Alerte : Plus Grand qu'1 !!</strong><br/>Mon Dénominateur est '4'. Une Règle fait '4 sauts' de graduation entre chaque Nombre Entier (0, puis 1, puis 2). Comme je veux choper "7 sauts" moi... je dois dépasser le chiffre 1 plein. La fraction va atterrir à "1 Unité" Et "3 Sauts supplémentaires" !! Presque vers le '2' !</>}
          />
          <Flashcard 
            front={<>Le professeur me montre la fraction (42 / 42). Que dois-je dire ?</>}
            back={<><strong>C'est le nombre 1 ! (L'Unité entière).</strong><br/>La Pizza est coupée en 42... Et J'MANGE les 42 parts ! J'ai littéralement mangé la Pizza Totale n°1. Toujours écrire "= 1".</>}
          />
          <Flashcard 
            front={<>Que signifie prendre un Tiers d'un nombre ?</>}
            back={<>Prendre un Tiers équivaut à diviser ce nombre exactement par <strong>3</strong> ! Par exemple, le tiers de 30 est 10.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Peut-on mettre un (0) au Dénominateur (en bas) ? Genre (5 / 0)",
              answer: "NE FAIS JAMAIS CA ! C'est la faille cosmique. Diviser par '0' créerait un Trou Noir dans une Calculatrice Mondiale (Message: ERR-DIV). Tu ne peux pas imaginer un Gâteau 'Totalement inexistant' dont tu pourrais manger '5' parts ! C'est Interdit."
            },
            {
              question: "C'est quoi la différence terminologique entre Demi, Tiers et Quart ?",
              answer: "C'est juste le nom Romain des Trois Dénominateurs suprêmes ! Demi = /2 . Tiers = /3 . Quart = /4 . Au delà (5), on redevient Normal avec la conjugaison 'Ième' (Cinquième, Dixième)."
            },
            {
              question: "Une fraction est-elle toujours inférieure à 1 ?",
              answer: "Non ! Si le numérateur (en haut) est plus grand que le dénominateur (en bas), la fraction est strictement supérieure à 1. Par exemple, $\\frac{5}{4}$ correspond à 1,25 (une tarte entière et un quart en supplément)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai (10 / 15). Je veux la SIMPLIFIER pour la rendre belle et Légère. Quelle fraction finale vais-je rendre ?",
              options: [
                "Je divise par 2 le Haut et par 3 le Bas : (5 / 5)",
                "Je divise le Haut et le Bas par le Même nombre magique '5'. Ce qui donne (2 / 3)."
              ],
              correctAnswer: 1,
              explanation: "Top de Perfection ! L'unique LOI des Clones et Simplification et que le HAUT et le BAS doivent subir LE MÊME OPÉRATEUR pour le Pactole ! (On tape les Deux Divise-5). Elle passe 2/3 !"
            },
            {
              question: "Pour prendre les (3 / 4) des '20 euros' d'Alain pour m'acheter des cartes...",
              options: [
                "Je divise 20 par 4 = 5€. Puis je multiplie par le haut '3' = 15€ !!",
                "Je divise 3 par 4 = 0,75... C'est ma monnaie !"
              ],
              correctAnswer: 0,
              explanation: "Élève Maître. Toujours diviser le Trésor par Loi d'Univers (Le chiffre diviseur du BAS). On trouve le 'Bout Unitaire'. Puis l'Action (Le Haut) le multiplie !"
            },
            {
              question: "Quelle fraction est équivalente à (2 / 5) ?",
              options: [
                "4 / 10",
                "6 / 12",
                "5 / 2"
              ],
              correctAnswer: 0,
              explanation: "Exact ! Si l'on applique le coefficient multiplicatoire de 2 au numérateur et au dénominateur : 2 &times; 2 = 4, et 5 &times; 2 = 10. Les fractions sont égales !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Numérateur = Le Nuage (Haut) | Dénominateur = Le Démon/Dunes (Bas)",
            "Changement Clone : On multiplie Toujours L'Axe HAUT ET BAS par la même chose ! (Miroir)",
            "Fraction = 1 (L'Unité et le Tout) Si le Haut == le Bas."
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

export default Course_College_6eme_03_Fractions;
