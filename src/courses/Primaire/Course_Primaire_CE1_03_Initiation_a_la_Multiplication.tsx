import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Target, Layers, ShoppingCart, HelpCircle } from 'lucide-react';

const Course_Primaire_CE1_03_Initiation_a_la_Multiplication: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE1-03"
        title="Initiation à la Multiplication"
        subtitle="L'Arme secrète pour additionner à la vitesse de l'éclair !"
        duration="45min"
        level="CE1"
        prerequisites={["L'Addition", "Compter de 2 en 2, et de 5 en 5"]}
        objectives={[
          "Comprendre que la Multiplication est une Addition méga-rapide.",
          "Lire le signe mystère 'x' (foix).",
          "Calculer un problème en forme de grille."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        La multiplication en CE1 consiste d'abord à donner du sens (itérer une addition) avant l'apprentissage des "tables". Insistez sur le concept "2 fois 4 bonbons" = "J'ai 2 paquets avec 4 bonbons dans chaque". Le vocabulaire du quotidien ("des paquets de", "des carrés de") permet d'éviter l'abstraction prématurée.
      </InfoBlock>

      <InfoBlock type="reminder" title="Rappel : Les petits bonds en avant !">
        Avant de découvrir le raccourci magique de la multiplication, rappelle-toi comment on compte rapidement de 2 en 2 ou de 5 en 5 : 
        <br />- <strong>De 2 en 2 :</strong> 2, 4, 6, 8, 10, 12... 
        <br />- <strong>De 5 en 5 :</strong> 5, 10, 15, 20, 25...
        <br />C&apos;est exactement la base de la multiplication !
      </InfoBlock>

      <Section title="1. Mais pourquoi on a inventé ce truc ? (Le Problème des Pommes)" icon={<Target className="w-6 h-6"/>} color="emerald">
        <p className="mb-4">Imagine que la Mairesse t'offre 4 boîtes. Dans chaque boîte, il y a exactement 5 pommes rouges.</p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 shadow-sm mb-6">
           <h3 className="font-bold text-center text-emerald-900 dark:text-emerald-100 dark:text-emerald-300 mb-4">Combien as-tu de pommes en tout ? 🍎</h3>
           
           <div className="flex flex-col md:flex-row gap-6 justify-center">
             <div className="bg-card p-4 rounded shadow border text-center flex-1">
               <h4 className="font-bold text-slate-500 mb-2">Méthode Normale (L'Addition)</h4>
               <p className="font-mono text-xl">5 + 5 + 5 + 5</p>
               <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">C'est long à écrire. Et si tu avais 100 boites ? La feuille ne serait pas assez grande !</p>
             </div>
             
             <div className="bg-card p-4 rounded shadow border-2 border-emerald-400 text-center flex-1 transform md:-translate-y-2">
               <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Méthode Ninja (Multiplication)</h4>
               <p className="font-mono text-xl font-bold bg-emerald-100 dark:bg-emerald-900 px-4 py-2 rounded-lg inline-block">4 x 5</p>
               <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">On lit "4 fois 5". C'est l'arme Ultime. C'est le raccourci magique ! (Resultat: 20)</p>
             </div>
           </div>
        </div>

        <TipBanner title="Le Signe (x)" type="warning">
           Le signe <strong>(x)</strong> veut dire mot pour mot "Fois..." ou "..Paquets de..". <br/>"3 x 2" = "3 paquets de 2 bonbons". C'est 2 + 2 + 2.
        </TipBanner>
      </Section>

      <Section title="2. Les Tableaux Croisés (Grilles)" icon={<Layers className="w-6 h-6"/>} color="blue">
        <p className="mb-4">La meilleure façon de voir une multiplication sans se tromper, c'est de regarder les fenêtres d'un immeuble !</p>

        <InteractiveExercise 
          title="Combien de fenêtres sur le bâtiment ?"
          question={<>L'immeuble du Maire a 4 étages (lignes). À chaque étage, il y a 3 fenêtres (colonnes). Combien de fenêtres en TOUT ?</>}
          steps={[
            <><strong>1. Vision par Étages (Lignes) :</strong> Je compte 3 fenêtres par ligne. Il y a 4 lignes. Ca fait <strong>3 + 3 + 3 + 3 = 12</strong>. Le ninja écrit : <strong>4 x 3 = 12</strong> ! (4 fois les 3 fenêtres).</>,
            <><strong>2. Vision par Colonnes (Vertical) :</strong> Mon copain préfère compter les colonnes verticales ! Il voit 4 fenêtres dans 1 colonne. Il y a 3 colonnes ! Ca fait <strong>4 + 4 + 4 = 12</strong> ! Le ninja écrit : <strong>3 x 4 = 12</strong> !</>,
            <><strong>3. THE LOI SUPRÊME MAGIQUE :</strong> Regarde !! On a trouvé la Règle d'or de tout l'univers : <strong>4 x 3 C'est la MÊME CHOSE que 3 x 4 !</strong>. Dans une multiplication, on peut inverser les deux nombres sans changer le résultat final !! (La Commutativité).</>
          ]}
        />
      </Section>

      <InfoBlock type="info" title="Zoom sur : Pourquoi savoir inverser un calcul est un super-pouvoir ?">
        Si un jour tu dois calculer 2 fois 9, c&apos;est très facile si tu as déjà appris ta table de 2 ! Tu n&apos;as pas besoin de connaître la table complexe de 9. Tu simplifies ton problème en calculant le double de 9 (9 + 9 = 18). C&apos;est cela, la magie de renverser l&apos;ordre : <code>2 x 9 = 9 x 2</code> !
      </InfoBlock>

      <Section title="3. Les Secrets pour aller plus vite (Tables d'or)" icon={<HelpCircle className="w-6 h-6"/>} color="indigo">
        <p className="mb-4">Avant d'apprendre plus tard les immenses tables de multiplications ennuyeuses, voici 3 pouvoirs magiques :</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded shadow-sm">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300">Le Pouvoir du *X1* (Le Miroir)</h4>
             <p className="text-sm mt-1">Multiplier par 1, c'est comme regarder dans le miroir. Rien ne change ! <strong>5 x 1 = 5 !</strong> (1 paquet de 5, ça reste juste 5).</p>
           </div>
           <div className="bg-rose-50/50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-4 rounded shadow-sm">
             <h4 className="font-bold text-rose-700 dark:text-rose-300">Le Trou Noir Cosmique du *X0*</h4>
             <p className="text-sm mt-1">C'est la Terreur. 0 fois NIMPORTE QUOI = LE NÉANT ABSOLU ! <strong>6 x 0 = 0 !!!</strong>. (0 paquet de 6 bonbons = bah t'as rien dans les mains !).</p>
           </div>
           <div className="bg-amber-50/50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 md:col-span-2 rounded shadow-sm flex items-center justify-between">
             <div>
               <h4 className="font-bold text-amber-700 dark:text-amber-300">Le Compteur "Fois 2" (Le Double)</h4>
               <p className="text-sm mt-1">C'est juste Le Double !! <strong>4 x 2</strong> ? C'est le double de 4 ! C'est 8 ! C'est exactement "4 + 4". Par cœur et facile !</p>
             </div>
           </div>
        </div>
      </Section>


      <InfoBlock type="funfact" title="Le saviez-vous ? L'origine ancienne de la multiplication">
        Le mot « multiplication » vient du latin « multiplicare » qui signifie « plier plusieurs fois ». Autrefois, pour multiplier de grands nombres, on utilisait des ficelles avec des nœuds que l&apos;on pliait méticuleusement ! Le signe de la croix inclinée (x) a été choisi il y a environ 400 ans par William Oughtred pour symboliser ce croisement.
      </InfoBlock>

      <Section title="⚡ Flashcards" icon="🧠" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>J'ai réécrit l'addition : "7 + 7 + 7 + 7".  Comment l'écrire avec L'Épée Magique [X] Ninja de la multiplication ?</>}
            back={<><strong>4 x 7 !</strong><br/>Il y a Quatre fois le chiffre (7). Donc : 4 Fois 7 ! (Ou 7 x 4 c'est pareil !)</>}
          />
          <Flashcard 
            front={<>Le Terrible problème Vrai/Faux : "1000 x 0 = 0" ?</>}
            back={<><strong>VRAI !!!!</strong><br/>Le Trou Noir du Zéro absorbe la galaxie entière ! Si tu demandes "zéro fois le salaire du Maire", tu auras ZÉRO et une vie très triste !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si tu connais le résultat de 4 x 5 (= 20).  Que vaut 5 x 4 ?",
              options: [
                "Je dois recalculer, c'est un autre calcul difficile.",
                "C'est la même chose de l'univers !! Ca fait 20 !! On peut faire pivoter et inverser la multiplication !!",
                "Ca fait 9."
              ],
              correctAnswer: 1,
              explanation: "Top ! La Loi absolue de la Grille ! 4 Lignes de 5 fenêtres ou 5 Lignes de 4... C'est l'Omelette a l'envers !! Ca donnera le MÊME 20 au final !!"
            },
            {
              question: "Que veut dire : 3 x 10 ?",
              options: [
                "J'ai 3 et 10 bonbons épars, ça fait 13.",
                "J'ai 3 Boites. Et dans chaqute boite, 10 Bonbons en Or Massif. Soit : 10 + 10 + 10.",
                "J'ai 13 boites."
              ],
              correctAnswer: 1,
              explanation: "Exact ! Le [x] de la croix rouge marque le PAQUET ! (3 Paquets de 10). = 30 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais relier une longue Addition et La Multiplication qui est cachée derrière ! (5+5+5 = 3x5)",
            "Je connais la loi d'inversion : 4x5 = 5x4. Ça sauve du temps par centaine d'années !",
            "Je n'ai Oublié LE ZERO : Tout chiffre qui rencontre la croix du [x 0] meurt et devient 0 !"
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

export default Course_Primaire_CE1_03_Initiation_a_la_Multiplication;
