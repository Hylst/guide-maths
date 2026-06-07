import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Scale, RotateCw, BarChart, Percent } from 'lucide-react';

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
      </Section>

      <Section title="1. Le Tableau de Proportionnalité" icon="📊" color="indigo">
        <p className="mb-4">Pour ranger le monde, on utilise un tableau avec la grandeur 1 en haut (ex: Nombre de stylos) et la grandeur 2 en bas (ex: Prix en €).</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Tableau des Oranges Magiques</h3>
           <div className="bg-card dark:bg-black/40 p-4 rounded-xl shadow border border-indigo-100 font-mono text-center w-full max-w-lg relative">
             <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-rose-500 text-white font-bold px-3 py-2 rounded-xl shadow-lg transform translate-x-full">
               &times; 3
             </div>
             <table className="border-collapse w-full">
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
               <p className="text-sm mt-1">C'est le nombre caché qui transforme instantanément le HAUT en BAS. Ici, on regarde la première colonne complète `(2 et 6)`. Comment 2 devient 6 ? <strong>En multipliant par 3 !</strong> <br/>Le Coefficient (Le prix d'1 kg) est donc "3" ! Je peux maintenant remplir n'importe quelle case du bas en multipliant celle du haut par 3.</p>
             </InfoBlock>
             
             <InfoBlock type="info" title="La Fusion des Colonnes (Le combo Horizontal)">
               <p className="text-sm mt-1">Génie pur : Regarde le 7 en haut à droite. Je n'ai pas besoin de la machine multiplicatrice ! <br/>Je sais que `2 (kg) + 5 (kg) = 7 (kg)`. <br/>DONC : `Prix de 2kw(6€) + Prix de 5kg(15€) = 21€ !` L'addition des têtes additionne les pieds !</p>
             </InfoBlock>
           </div>
        </div>
      </Section>

      <Section title="2. Les Familiers de la Proportionnalité" icon="🐾" color="emerald">
        <p className="mb-4">Certains sujets de la vie réelle VIVENT sous la loi de la Proportionnalité et d'autres La Rejette catégoriquement.</p>

        <TipBanner type="warning" title="Le Piège Absolu : L'Âge">
          Ne te fais jamais avoir : À 10 ans tu mesures 1m40. À 20 ans tu ne mesureras JAMAIS 2m80 !! L'âge n'est jamais proportionnel à la taille ni au poids.
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-5 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
             <h4 className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-2">✅ Les PROPORTIONNELS (Équitables)</h4>
             <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
               <li>Le Prix au Kilo (Fruits, Tissu).</li>
               <li>La Vitesse Constante (Si je conduis à 50 km/h, je ferai litéralement 100 km en 2h).</li>
               <li>Les Recettes de Cuisine (Gâteau pour 4 personnes = 2 œufs &rarr; Gâteau pour 8 = 4 œufs).</li>
             </ul>
           </div>
           
           <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-5 rounded-2xl border-l-4 border-rose-500 shadow-sm">
             <h4 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 mb-2">❌ Les PIÈGES ABSOLUS (Le Réel)</h4>
             <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
               <li>L'Âge et la Taille (À 10 ans tu mesures 1m40. À 20 ans tu ne mesureras JAMAIS 2m80 !! Ça s'arrête).</li>
               <li>Les Abonnements ou Promos (Forfait à 10€/mois + 50€ Carte SIM. C'est mort, il y a un ticket fixe).</li>
               <li>La pointure de chaussure et l'âge.</li>
             </ul>
           </div>
        </div>
      </Section>

      <Section title="3. Les Pourcentages (L'Illusion du '100')" icon="Percent" color="blue">
        <p className="mb-4">Alerte de 6ème : "30%" ça n'a AUCUNE Valeur Physique réelle. Un Pourcentage n'est qu'une vulgaire Fraction dont le Dénominateur Pèse 100 ! C'est le coefficient déguisé de la proportionnalité.</p>

        <InteractiveExercise 
          title="Le Pantalon à -20 %"
          question={<>Un Pantalon coûte 40€. Le magasin accorde une réduction de <strong className="text-rose-500">20 %</strong>. Quel est le PRIX FINAL du pantalon ?</>}
          steps={[
            <><strong>1. Traduction de la Malédiction :</strong> "20 %" se traduit sur ma feuille par la fraction "20 divisé par 100".</>,
            <><strong>2. Calcul du Morceau (La Réduction) :</strong> Je prends les (20/100) du Pix Total 40€ ! <br/><code>(20 / 100) &times; 40</code></>,
            <><strong>3. Résolution magique :</strong> 40 divisé par le Sol(100) donne "0.4". <br/>0.4 &times; le Haut(20) = <strong>8 €</strong> !! <em>(Attention: ce "8" n'est pas le nouveau prix, c'est ta victoire acquise, la remise d'argent !).</em></>,
            <><strong>4. Fin de la Guerre :</strong> Ancien Prix (40) MOINS la Remise gagnée (8) = <strong>32 €</strong>. Le pantalon coûte 32 euros !</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le tableau a <code>[10 / 20]</code> puis <code>[15 / 35]</code>. Est-il proportionnel ?</>}
            back={<><strong>Alerte Supercherie ! NON !</strong><br/>Pour la 1ère colonne, 10 devient 20 (Donc Coef = <strong>&times; 2</strong>).<br/>Mais pour la 2ème, 15 multiplié par 2 donnerait "30" !! Et là c'est écrit "35". Le pacte est rompu. Ce n'est pas proportionnel.</>}
          />
          <Flashcard 
            front={<>Quelle fraction parfaite représente le pourcentage "50 %" ?</>}
            back={<><strong>C'est La Moitié ! (La fraction "1 / 2")</strong><br/>"50 sur un monde de 100", c'est littéralement la barre du milieu. Même chose pour "25 %", c'est (1/4) du Monde, soit UN QUART.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai trouvé que le Coef (vers le Bas) de mon tableau était '× 4'. Et que le prof me donne une case du Bas mais VIDE celle du HAUT ! Je fais quoi ?",
              answer: "L'Univers est Magnifique : Le Sort Réciproque d'une Multiplication est la DIVISION ! Si la descente est [× 4]... Alors pour Remonter aux Enfers (la cas du haut), tu vas 'Diviser le Bas par 4' [÷ 4] ! Le cercle parfait."
            },
            {
              question: "Les Échelles sur une carte de Géographie c'est de la proportionnalité ?",
              answer: "Oui absolue ! '1 / 100 000' veut dire : 1 cm sur ton bout de papier, équivaut exactement à 100 000 cm dans le monde boueux du Réel ! C'est le coefficient !."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une pile de 4 BD identiques pèse 600 grammes. Tu dois porter 8 BD pour le déménagement. Combien vont t'elles peser ?",
              options: [
                "1 200 grammes ! (Soit 1,2 kg)",
                "On ne peut pas savoir, y'a un piège !",
                "400 grammes."
              ],
              correctAnswer: 0,
              explanation: "Top de l'Évidence ! On est sur de la Proportionnalité physique. Si la pile d'objets Identiques Double (8 c'est 4 fois 2 !), alors le poids Double !! 600 × 2 = 1200g."
            },
            {
              question: "Que représente le '10%' d'une quantité monétaire (ex: 250 €) en Calcul Super Rapide ?",
              options: [
                "Je multiplie par 10 ça fait 2500 €",
                "C'est l'équivalent de '10 euros' donnés en monnaie.",
                "C'est DIVISER PAR DIX !! Je recule la virgule, ça donne 25 € ! Magique !"
              ],
              correctAnswer: 2,
              explanation: "Top Sorcier ! (10 / 100) est une fraction qui se simplife en (1 / 10). Prendre 10% de n'importe quoi sur terre, c'est simplement couper la cible en Dix pour voler le premier morceau !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mémorisé: Age VS Taille n'est pas de la Proportionnalité !",
            "Tableau: Mettre la ligne (× Coefficient) à l'extérieur avec sa grande bulle de pouvoir rouge.",
            "Pourcentages: Le petit signe '%' c'est de l'encre cachant la phrase '/100'."
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
