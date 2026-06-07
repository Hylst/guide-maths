import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Weight, Ruler, Maximize, Droplets } from 'lucide-react';

const Course_Primaire_CE2_06_Grandeurs_Mesures_Contenances_Perimetre: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE2-06"
        title="Contenances, Masses et Périmètre"
        subtitle="Devenir le Maître des Longueurs et des Potions Magiques"
        duration="45min"
        level="CE2"
        prerequisites={["L'Addition posée", "Utiliser une Règle graduée"]}
        objectives={[
          "L'Unité de la Grosseur (Gramme / Kilo).",
          "L'Unité du Liquide (Le Litre).",
          "Découvrir la Magie du Périmètre (Le tour de la prison)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Ce chapitre regroupe des grandeurs capitales de la vie quotidienne ainsi que le concept du Périmètre. L'enfant au CE2 doit faire la différence d'usage entre la masse (peser en grammes/kilos), la contenance (mesurer les liquides en litres) et le périmètre (longueur du contour d'une figure fermée). Associez ces termes aux actions journalières : cuisine, arrosage, ou contour du canapé.
      </InfoBlock>

      <Section title="1. La balance du Marchand : Masses et Poids" icon={<Weight className="w-6 h-6" />} color="blue">
        <p className="mb-4">Dans l'univers, tout pése quelque chose (Même l'air!). Pour éviter de dire 'Ca pèse très lourd', on a inventé une unité de valeur : <strong>Le Gramme (g)</strong>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 shadow-sm text-center">
             <div className="text-4xl mb-4">🪶</div>
             <h4 className="font-bold text-sky-700 text-xl">Le Gramme (g)</h4>
             <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">C'est la plume d'Oiseau. Très très léger.<br/>Un paquet de sucre = 100 g.</p>
           </div>
           
           <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/60 shadow-sm text-center">
             <div className="text-4xl mb-4">🐘</div>
             <h4 className="font-bold text-amber-700 dark:text-amber-300 text-xl">Le KiloGramme (kg)</h4>
             <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">C'est le Boss (Le poids lourd !).<br/>1 Melon pése environs 1 kg.</p>
           </div>
        </div>
        
        <TipBanner title="Le Trésor de la Conversion" type="warning">
           Mémorise ça Toute Ta Vie : Le prefix "Kilo", peu importe le dictionnaire, veut dire toujours "Mille (1000) !". Donc <strong>1 Kg = 1000 Grammes !</strong>. C'est magique.
        </TipBanner>
      </Section>

      <Section title="2. Les Potions des Sorcières : Les Contenances" icon={<Droplets className="w-6 h-6" />} color="indigo">
        <p className="mb-4">On ne pèse pas de l'Eau. Imagine mettre de l'Eau sur la bascule, ca coule par terre ! On la 'Contient' : C'est le monde Du <strong>LITRE (L)</strong>.</p>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/60 mb-6 font-mono text-center space-y-4">
           <div className="flex flex-col gap-4 text-left p-4">
              <div className="flex items-center gap-4 border-b border-indigo-100 dark:border-indigo-800/60 pb-2">
                <span className="text-3xl">🚰</span>
                <div>
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300">Le Litre (L) - La Grosse Bouteille</h5>
                  <p className="text-xs text-slate-500">Ex: Une Grande Bouteille d'Eau au magazin ! C'est La référence !</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">☕</span>
                <div>
                  <h5 className="font-bold text-sky-600">Le Centilitre (cL) - La Tasse du roi</h5>
                  <p className="text-xs text-slate-500">Pour le Jus d'Orange du matin ! (1 Litre = 100 cL !! - Centi veut dire le nombre Cent(100)). 1 bouteille c'est = 100 fois la petite tasse !</p>
                </div>
              </div>
           </div>
        </div>
      </Section>

      <Section title="3. L'Armure d'Or: Le Périmètre !!!" icon={<Maximize className="w-6 h-6" />} color="emerald">
        <p className="mb-4">C'est la leçon la plus importante du Chapitre. Imagine un Rectangle dans le désert... <strong>LE PERIMETRE EST LE MUR DE CLOTURE QUI L'ENTOURE !</strong></p>

        <InteractiveExercise 
          title="Calcul de la Clôture de Prison"
          question={<>La Prison (Rectangle) a 4 murs. Le Mur d'en haut fait 10m de Longueur. Le petit Mur de coté fait 5m de Largeur. Quelle Longeur de Cloture Electrique dois-je acheter en magasin ?</>}
          steps={[
            <><strong>1. Analyser la forme secrète :</strong> C'est un Rectangle ! Donc si en Haut j'ai 10m... <strong>EN BAS, face à lui, c'est forcement aussi 10m !!</strong>. Si Droite = 5m. Gauche = forcement 5m ! J'ai percé le code !</>,
            <><strong>2. LA GRANDE ADDITION DU TOUR :</strong> Le Périmètre d'une Forme Géométrique = <strong>LA SOMME (+...+) de TOUS Les cotés du tour</strong> (Sans l'interieur).</>,
            <><strong>3. Le Calcul d'Addition :</strong> Le tour entier = Haut(10) + Droite(5) + Bas(10) + Gauche(5) !! Soit : 10+5+10+5.</>,
            <><strong>4. Final :</strong> 15 + 15 = 30 !! Le perimètre est de <strong>30 métres !</strong>.</>
          ]}
        />

        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-5 rounded-2xl border-l-4 border-emerald-500 mb-6 mt-6">
           <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Le Piège Mortel du Carré !</h4>
           <p className="text-sm mt-1">Si le Maitre te donne un carré (Parfait) en écrivant qu'un Seul coté ('5m'...). Et te demande le Perimètre ? La règle est d'additionner 4 cotés !! Mais t'en as que 1 !!!  <br/><br/><strong>Astuce :</strong> C'est UN CARRÉ !! Donc tout ses cotés sont des Faux-Jumeaux de la mort !! 5 + 5 + 5 + 5 = 20m ! (Ou 4x5!! Ninja style).</p>
        </div>
      </Section>


      <Section title="⚡ Flashcards" icon="🧠" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Trouve moi en seconde L'Intru dans ce groupe Magique : "Litre", "Centilitre", "Gramme".</>}
            back={<><strong>Le Gramme !! L'Intru Maudit !!</strong><br/>Litre & Co sont le royaume Liquide ! Le Gramme c'est la pierre, le cailloux, LA MASSE SOLIDE !!</>}
          />
          <Flashcard 
            front={<>Le professeur demande le périmètre d'un petit triangle qui a des cotés : 3cm, 4cm, et 5cm. Je fais quoi du coup ?? Une Multiplicaiton ?</>}
            back={<><strong>Non !!! Une Addition ! Le Périmètre de NIMPORTE quelle forme = ADDITIONNER TOUT LE TOUR.</strong><br/> 3 + 4 + 5 = 12 centimètres. C'est tout.</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="indigo">
        <Quiz 
          questions={[
            {
              question: "Si j'écris (kg). Qu'est ce que veut dier la lettre 'k' magique devant le gramme ?",
              options: [
                "C'est le K de Koala.",
                "C'est k pour Kilo (Qui veut dire le nombre 1000 dans les monde anciens grecs). => 1000 Grammes.",
                "C'est pour la couleur de balance."
              ],
              correctAnswer: 1,
              explanation: "Top ! Kilo veut toujours dire MILLE !!  Kilo-Mètre = Mille Mètres.  Kilo-Grammes = Mille Grammes !! C'est Le Super Pouvoir X1000."
            },
            {
              question: "Le Périmètre dans le monde des Mathématiques. C'est quoi ???",
              options: [
                "C'est la couleur a l'intérieur du carré.",
                "La longueur totale DU CONTOUR EXACT de la figure ! Comme si je mettais une ficelle tout autour.",
                "La hauteur."
              ],
              correctAnswer: 1,
              explanation: "Incroyable. Périmètre (Autour en grec !). L'interieur on s'en fiche, c'est pour l'Aire !! PERIMETRE = LA CLOTURE TOUT LE TOUR DE LA MAISON."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "1 Kilo (kg) = 1 000 grammes  | ET | 1 Litre (L) = 100 cL (Centilitres).",
            "Périmètre = L'Addition des Bords Extérieurs !.",
            "Carré : On connait 1 coté ? Périmètre = 4 x Le Coté (4 Fois le meme!)."
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

export default Course_Primaire_CE2_06_Grandeurs_Mesures_Contenances_Perimetre;
