import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Scale, RotateCw, BarChart, Percent, Users, Flame, Droplet } from 'lucide-react';

const RecipeScalerVisualizer: React.FC = () => {
  const [sorcerers, setSorcerers] = useState(4);

  // Base recipe for 4 Sorcerers:
  // - wolf teeth: 8
  // - bat ears: 120g
  // - magic slime: 1.5L
  const coeff = sorcerers / 4;

  const wolfTeeth = 8 * coeff;
  const batEars = 120 * coeff;
  const magicSlime = 1.5 * coeff;

  return (
    <div className="bg-emerald-50/40 dark:bg-emerald-950/20 p-6 md:p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-900 my-8 shadow-sm">
      <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-lg mb-4 flex items-center gap-2">
        <Users className="text-emerald-500 w-5 h-5 animate-pulse" />
        Lab' Interactif : Règle de Proportionnalité en Cuisine Magique
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Ajuste le curseur pour choisir le nombre d'apprentis sorciers invités à boire le philtre. Observe comment les ingrédients s'ajustent de manière strictement proportionnelle ! Le coefficient de proportionnalité reste la boussole magique.
      </p>

      {/* Control slider */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-border mb-8 max-w-md mx-auto">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
          Nombre d'invités (Monde d'En Haut) : <span className="text-indigo-600 dark:text-indigo-400 text-2xl font-black">{sorcerers} sorciers</span>
        </label>
        <input 
          type="range" min="1" max="16" step="1" value={sorcerers} 
          onChange={(e) => setSorcerers(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
          <span>1 sorcier (Divisé par 4)</span>
          <span>16 sorciers (Multiplié par 4)</span>
        </div>
      </div>

      {/* Display ingredients comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/40 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono">
            &times; {coeff.toFixed(2).replace('.', ',')}
          </div>
          <Flame className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Dents de Loup</h4>
          <span className="text-3xl font-black text-rose-600 block mt-1">{wolfTeeth.toFixed(1).replace('.0', '')}</span>
          <span className="text-xs text-slate-400 font-bold block mt-1">Base : 8 dents pour 4 pers.</span>
        </div>

        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/40 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono">
            &times; {coeff.toFixed(2).replace('.', ',')}
          </div>
          <Flame className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Chauves-souris (Grammes)</h4>
          <span className="text-3xl font-black text-emerald-600 block mt-1">{batEars.toFixed(1).replace('.0', '')} g</span>
          <span className="text-xs text-slate-400 font-bold block mt-1">Base : 120g pour 4 pers.</span>
        </div>

        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/40 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono">
            &times; {coeff.toFixed(2).replace('.', ',')}
          </div>
          <Droplet className="w-10 h-10 text-blue-500 mx-auto mb-3" />
          <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Bave Magique (Litres)</h4>
          <span className="text-3xl font-black text-blue-600 block mt-1">{magicSlime.toFixed(2).replace('.', ',').replace(',00', '')} L</span>
          <span className="text-xs text-slate-400 font-bold block mt-1">Base : 1.5L pour 4 pers.</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-950/60 font-mono text-xs overflow-x-auto">
        <h4 className="font-bold text-center text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Tableau de Potion Proportionnel en temps Réel</h4>
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2.5 text-left font-sans">Quantité pour...</th>
              <th className="border p-2.5 text-sky-600">4 Invités (Base)</th>
              <th className="border p-2.5 text-indigo-600 font-black">Tes {sorcerers} Invités</th>
              <th className="border p-2.5 text-purple-600">Le Coefficient (pour 1)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2.5 text-left font-bold font-sans">Dents de Loups</td>
              <td className="border p-2.5 text-slate-500">8</td>
              <td className="border p-2.5 font-bold text-indigo-600">{wolfTeeth.toFixed(1).replace('.0', '')}</td>
              <td className="border p-2.5 text-slate-500">{"$8 \\div 4 = 2$"} dents/pers</td>
            </tr>
            <tr>
              <td className="border p-2.5 text-left font-bold font-sans">Farine Bat (g)</td>
              <td className="border p-2.5 text-slate-500">120</td>
              <td className="border p-2.5 font-bold text-indigo-600">{batEars.toFixed(1).replace('.0', '')}</td>
              <td className="border p-2.5 text-slate-500">{"$120 \\div 4 = 30$"} g/pers</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Course_College_6eme_04_Proportionnalite: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-04"
        title="La Proportionnalité"
        subtitle="L'Équilibre Magique du Marché et des Prix"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Les multiplications fluides", "Connaître le système des décimaux (Euros/Centimes)"]}
        objectives={[
          "Reconnaître si une situation est OUI ou NON Proportionnelle.",
          "Trouver et utiliser le Coefficient de Proportionnalité.",
          "Manipuler un Tableau en utilisant l'addition des colonnes ou la multiplication.",
          "Traiter un Pourcentage (%) comme une simple fraction sur 100."
        ]}
      />

      <Section title="🌟 Introduction : Le Pacte de l'Équité" icon="⚖️" color="slate">
        <p>
          Si tu achètes 1 baguette de pain à 1€, et que ton ami en achète 3 pour 3€, le monde est Juste. Le prix augmente à la MÊME VITESSE que la quantité. C'est le pacte de la <strong>Proportionnalité</strong>.
        </p>
        <p className="mt-4">
          MAIS... si tu vas à la foire et que le panneau dit : "1 Churros = 2€, Les 5 Churros = 8€". Alerte Rouge ! L'univers a triché ! Si ça avait été proportionnel, 5 churros auraient dû coûter 10€. Cette situation est dite <strong>Non-Proportionnelle</strong> car il y a une promotion.
        </p>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          La proportionnalité est l'un des outils de calcul les plus puissants au monde ! Les architectes s'en servent chaque jour sous forme d'échelle pour reproduire des châteaux géants sur de petites feuilles de papier millimétré.
        </InfoBlock>
      </Section>

      <Section title="1. Le Tableau de Proportionnalité" icon="📊" color="indigo">
        <p className="mb-4">Pour ranger le monde, on utilise un tableau avec la grandeur 1 en haut (ex: Nombre de stylos) et la grandeur 2 en bas (ex: Prix en €).</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-indigo-900 dark:text-indigo-200">Tableau des Oranges Magiques</h3>
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl shadow border border-indigo-100 font-mono text-center w-full max-w-lg relative overflow-x-auto">
              <table className="border-collapse w-full min-w-[300px]">
                <tbody>
                  <tr>
                    <td className="border p-3 font-bold bg-muted text-left">Poids (kg)</td>
                    <td className="border p-3 text-sky-600 font-bold">2</td>
                    <td className="border p-3 text-emerald-600 dark:text-emerald-400 font-bold">5</td>
                    <td className="border p-3 text-purple-600 dark:text-purple-400 font-bold">7</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-bold bg-muted text-left">Prix (€)</td>
                    <td className="border p-3 text-sky-600">6</td>
                    <td className="border p-3 text-emerald-600 dark:text-emerald-400">15</td>
                    <td className="border p-3 text-purple-600 dark:text-purple-400">21</td>
                  </tr>
                </tbody>
              </table>
           </div>

            <div className="mt-6 space-y-4 w-full">
              <InfoBlock type="definition" title="Le Coefficient Foudroyeur (La Machine verticale)">
                <p className="text-sm mt-1">C'est le nombre caché qui transforme instantanément le HAUT en BAS. Ici, on regarde la première colonne complète : {"$2 \\text{ et } 6$"}. Comment 2 devient 6 ? <strong>En multipliant par 3 !</strong> <br/>Le Coefficient (Le prix d'1 kg) est donc "3" ! Je peux maintenant remplir n'importe quelle case du bas en multipliant celle du haut par 3.</p>
              </InfoBlock>
              
              <InfoBlock type="info" title="La Fusion des Colonnes (Le combo Horizontal)">
                <p className="text-sm mt-1">Génie pur : Regarde le 7 en haut à droite. Je n'ai pas besoin de la machine multiplicatrice ! <br/>Je sais que {"$2 \\text{ kg} + 5 \\text{ kg} = 7 \\text{ kg}$"}. <br/>DONC : Prix de 2 kg (6€) + Prix de 5 kg (15€) = <strong>21€</strong> ! L'addition des têtes additionne les pieds !</p>
              </InfoBlock>
            </div>
         </div>
      </Section>

      <Section title="2. Notre Laboratoire d'Échelle de Portion" icon="🧬" color="indigo">
        <RecipeScalerVisualizer />
        <InfoBlock title="Rappel de Base" type="reminder">
          Pour remplir un tableau de proportionnalité, deux méthodes s'offrent à toi :
          <ul className="list-decimal pl-5 mt-2 space-y-1">
            <li><strong>Le Coefficient global (Vertical) :</strong> Merveilleux pour passer de la ligne du haut à celle du bas en multipliant par le même chiffre unique.</li>
            <li><strong>Les propriétés de structure (Horizontal) :</strong> Tu peux additionner ou soustraire deux colonnes entre elles, ou multiplier une colonne entière par un nombre.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="3. Les Familiers de la Proportionnalité" icon="🐾" color="emerald">
        <p className="mb-4">Certains sujets de la vie réelle VIVENT sous la loi de la Proportionnalité et d'autres la rejettent catégoriquement.</p>

        <TipBanner type="warning" title="Le Piège Absolu : L'Âge">
          Ne te fais jamais avoir : À 10 ans tu mesures 1m40. À 20 ans tu ne mesureras JAMAIS 2m80 !! L'âge n'est jamais proportionnel à la taille ni au poids.
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-5 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">✅ Les PROPORTIONNELS (Équitables)</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <li>Le Prix au Kilo (Fruits, Tissu).</li>
                <li>La Vitesse Constante (Si je conduis à 50 km/h, je ferai littéralement 100 km en 2h).</li>
                <li>Les Recettes de Cuisine (Gâteau pour 4 personnes = 2 œufs &rarr; Gâteau pour 8 = 4 œufs).</li>
              </ul>
            </div>
            
            <div className="bg-rose-50/50 dark:bg-rose-900/20 p-5 rounded-2xl border-l-4 border-rose-500 shadow-sm">
              <h4 className="font-bold text-rose-900 dark:text-rose-100 mb-2">❌ Les PIÈGES ABSOLUS (Le Réel)</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <li>L'Âge et la Taille (À 10 ans tu mesures 1m40. À 20 ans tu ne mesureras JAMAIS 2m80 ! L'augmentation ralentit puis s'arrête).</li>
                <li>Les Abonnements ou Promos (Forfait à 10€/mois + 50€ d'inscription fixe).</li>
                <li>La pointure de chaussure et l'âge d'une personne.</li>
              </ul>
            </div>
         </div>
      </Section>

      <Section title="4. Les Pourcentages (L'Illusion du '100')" icon="Percent" color="blue">
        <p className="mb-4">Alerte de 6ème : '30%' ça n'a AUCUNE Valeur Physique réelle. Un Pourcentage n'est qu'une fraction déguisée dont le Dénominateur Pèse 100 ! C'est le coefficient foudroyeur de la proportionnalité.</p>

        <InteractiveExercise 
          title="Le Pantalon à -20 %"
          question={<>Un Pantalon coûte 40€. Le magasin accorde une réduction de <strong className="text-rose-500">20 %</strong>. Quel est le PRIX FINAL du pantalon ?</>}
          steps={[
            <><strong>1. Traduction du Pourcentage :</strong> "20 %" se traduit sur ma feuille par la fraction "20 divisé par 100".</>,
            <><strong>2. Calcul du Morceau (La Réduction) :</strong> Je prends les (20/100) du Prix Total 40€ ! <br/><code>(20 / 100) &times; 40</code></>,
            <><strong>3. Résolution magique :</strong> 40 divisé par le Sol(100) donne "0,4". <br/>0,4 &times; le Haut(20) = <strong>8 €</strong> !! <em>(Attention : ce '8' n'est pas le nouveau prix, c'est l'argent que tu économises).</em></>,
            <><strong>4. Fin du combat :</strong> Ancien Prix (40) MOINS la Remise gagnée (8) = <strong>32 €</strong>. Le pantalon coûte 32 euros !</>
          ]}
        />
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Calcul de proportion par addition</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Pour sa voiture à gaz, Julie paye <strong>24 €</strong> pour 15 Litres de carburant. Elle complète le lendemain en achetant 5 Litres de plus au même tarif. Sans calculer le prix d'un seul litre, détermine de deux façons différentes combien elle va payer pour ces 5 Litres.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Julie souhaite obtenir 5 Litres de carburant.</li>
                <li>On observe les deux grandeurs en jeu : Litres et Prix. Nous disposons du point de référence : 15 Litres coûtent 24 €.</li>
                <li>On peut utiliser la <strong>Règle de division horizontale</strong>. On remarque que 15 Litres est exactement trois fois plus grand que 5 Litres : {"$15 \\div 3 = 5$"}.</li>
                <li>Puisque la situation est strictement proportionnelle, le prix payé doit être divisé de la même manière par 3 :
                  <br /><strong className="text-slate-805 dark:text-slate-100">24 € / 3 = 8 €</strong>.
                </li>
                <li>Julie paye donc <strong>8 €</strong> pour ses 5 Litres complémentaires !</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Calcul de pourcentage unitaire</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Dans un collège de 800 élèves, <strong>{"$15 \\%$"}</strong> des élèves pratiquent l'option escrime. Combien d'apprentis escrimeurs comporte ce collège ?
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Le terme "15 % de" se traduit littéralement par l'expression mathématique : {"$\\frac{15}{100} \\times 800$"}.</li>
                <li>On commence par découper les 800 élèves par le sol (100) :
                  <br /><strong className="text-slate-805 dark:text-slate-100">800 / 100 = 8 élèves</strong> (chaque paquet de 1 % représente donc 8 élèves).
                </li>
                <li>On multiplie ensuite la part de 1 % par le numérateur 15 :
                  <br /><strong className="text-slate-805 dark:text-slate-100">8 &times; 15 = 120 élèves</strong>.
                </li>
                <li>L’option escrime comprend ainsi un total de <strong>120 élèves</strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Le tableau a <code>[10 / 20]</code> puis <code>[15 / 35]</code>. Est-il proportionnel ?</>}
            back={<><strong>Alerte Supercherie ! NON !</strong><br/>Pour la 1ère colonne, 10 devient 20 (Donc Coef = <strong>&times; 2</strong>).<br/>Mais pour la 2ème, 15 multiplié par 2 donnerait "30" !! Et là c'est écrit "35". Le pacte est rompu. Ce n'est pas proportionnel.</>}
          />
          <Flashcard 
            front={<>Quelle fraction parfaite représente le pourcentage "50 %" ?</>}
            back={<><strong>C'est La Moitié ! (La fraction "1 / 2")</strong><br/>"50 sur un monde de 105", c'est la moitié de l'univers ! Même chose pour "25 %", c'est un quart de l'espace (1/4).</>}
          />
          <Flashcard 
            front={<>Peut-on utiliser le produit en croix en 6ème ?</>}
            back={<><strong>Il vaut mieux l'éviter !</strong><br/>En cycle 3 (6ème), on privilégie l'analyse concrète par le coefficient de proportionnalité et les combinaisons horizontales. Le produit en croix est une technique automatique étudiée en classe de 5ème/4ème, mais sans compréhension concrète elle peut faire faire n'importe quoi !</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai trouvé que le Coef (vers le Bas) de mon tableau était '× 4'. Et que le prof me donne une case du Bas mais VIDE celle du HAUT ! Je fais quoi ?",
              answer: "L'Univers est Magnifique : Le Sort Réciproque d'une Multiplication est la DIVISION ! Si la descente s'opère par [× 4]... Alors pour Remonter (la case du haut), tu vas 'Diviser le Bas par 4' [÷ 4] ! Le cercle parfait."
            },
            {
              question: "Les Échelles sur une carte de Géographie c'est de la proportionnalité ?",
              answer: "Oui absolue ! '1 / 100 000' veut dire : 1 cm sur ton bout de papier, équivaut exactement à 100 000 cm dans le monde de la réalité terrestre ! C'est le coefficient magique."
            },
            {
              question: "Qu'est-ce qu'une grandeur en mathématiques ?",
              answer: "Une grandeur est un élément de l'univers que l'on peut mesurer de manière physique ou chiffrée. Par exemple : un poids, un prix, un temps de parcours, une température."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une pile de 4 BD identiques pèse 600 grammes. Tu dois porter 8 BD pour le déménagement. Combien vont-elles peser ?",
              options: [
                "1 200 grammes ! (Soit 1,2 kg)",
                "On ne peut pas savoir, il y a un piège !",
                "400 grammes."
              ],
              correctAnswer: 0,
              explanation: "Top de l'Évidence ! On est sur de la Proportionnalité physique. Si la pile d'objets Identiques Double (8 c'est 4 fois 2 !), alors le poids Double !! 600 × 2 = 1200g."
            },
            {
              question: "Que représente le '10%' d'une quantité monétaire (ex: 250 €) en Calcul Super Rapide ?",
              options: [
                "Je multiplie par 10 ça fait 2500 €",
                "C'est l'equivalent de '10 euros' donnés en monnaie.",
                "C'est DIVISER PAR DIX !! Je recule la virgule, ça donne 25 € ! Magique !"
              ],
              correctAnswer: 2,
              explanation: "Top Sorcier ! (10 / 100) est une fraction qui se simplife en (1 / 10). Prendre 10% de n'importe quoi sur terre, c'est simplement couper la cible en Dix pour voler le premier morceau !"
            },
            {
              question: "Une bouteille d'eau de 1,5 L coûte 1,20 €. Quel est le prix de 3 L d'eau ?",
              options: [
                "2,40 €",
                "3,60 €",
                "1,80 €"
              ],
              correctAnswer: 0,
              explanation: "Génial ! 3 Litres correspond exactement au double de 1,5 Litre. Le prix doit lui aussi doubler de façon équitable : 1,20 € &times; 2 = 2,40 €."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mémorisé : Age VS Taille n'est pas de la Proportionnalité !",
            "Tableau : Mettre la ligne (× Coefficient) à l'extérieur avec sa grande bulle de pouvoir rouge.",
            "Pourcentages : Le petit signe '%' c'est de l'encre cachant la phrase '/100'."
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

export default Course_College_6eme_04_Proportionnalite;
