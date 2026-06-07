import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { PlusSquare, MinusSquare, XSquare, Calculator } from 'lucide-react';

const Course_College_6eme_02_Operations_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-02"
        title="Opérations sur les Nombres Décimaux"
        subtitle="Additionner et Multiplier les bouts de virgule avec Maîtrise"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["L'Addition posée (Primaire)", "Les Tables de multiplication"]}
        objectives={[
          "Poser Correctement L'Addition avec des Virgules (Le Mur Parfait).",
          "Gérer le zéro magique dans les soustractions difficiles.",
          "Mémoriser l'erreur mortelle de la Virgule lors des Multiplications."
        ]}
      />

      <Section title="🌟 Introduction : Les colonnes de l'Empire" icon="🏛️" color="slate">
        <p>
          En Primaire, poser une addition était facile : on calait tous les nombres bien sagement sur la droite, contre le grand mur invisible de fin. Tout s'alignait !
        </p>
        <p className="mt-4">
          En 6ème, avec l'arrivée des <strong>Décimaux</strong>, si tu cales tes nombres sur la droite... tu vas additionner des Euros Entiers avec des Centimes de poussière. C'est l'Explosion Nucléaire garantie ! Il faut un nouveau Chef de Colonne : <strong>La Virgule</strong>.
        </p>
      </Section>

      <Section title="1. L'Addition & Soustraction (Le Mur de la Virgule)" icon="🧱" color="indigo">
        <p className="mb-4">Quand on additionne ou que l'on soustrait +, -, la LOI TOTALE est l'alignement des Virgules.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
           <div className="bg-card dark:bg-black/30 p-6 rounded-xl font-mono text-xl shadow-lg relative border-l-4 border-indigo-500">
             {/* Ligne pointillée rouge pour la virgule */}
             <div className="absolute top-0 bottom-0 left-[62Px] border-l-2 border-rose-500 border-dashed z-0 opacity-50"></div>
             <table className="relative z-10 text-right w-full border-separate border-spacing-x-2">
               <tbody>
                 <tr>
                   <td>1</td>
                   <td>4</td>
                   <td className="text-rose-500 font-black">,</td>
                   <td>5</td>
                   <td>0</td>
                 </tr>
                 <tr>
                   <td className="border-b-2 border-foreground relative -left-4">+</td>
                   <td className="border-b-2 border-foreground"></td>
                   <td className="border-b-2 border-foreground">9</td>
                   <td className="border-b-2 border-foreground text-rose-500 font-black">,</td>
                   <td className="border-b-2 border-foreground">2</td>
                   <td className="border-b-2 border-foreground">3</td>
                 </tr>
                 <tr className="text-indigo-600 dark:text-indigo-400 font-bold">
                   <td>2</td>
                   <td>3</td>
                   <td className="text-rose-500 font-black">,</td>
                   <td>7</td>
                   <td>3</td>
                 </tr>
               </tbody>
             </table>
           </div>
           
           <div className="space-y-4">
             <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Les 3 Règles de Fer :</h3>
             <ul className="list-disc pl-5 space-y-2">
               <li>Les Virgules doivent TOUTES êtres exactement l'une en dessous de l'autre, formant un Mur invisible vertical.</li>
               <li>Je pose des "Zéros Invisibles" en renfort pour boucher les trous à droite et mettre tous mes soldats à égalité.</li>
               <li>Dans le résultat (en bas), la virgule 'tombe' tout droit, elle continue le Mur à la même place !</li>
             </ul>
           </div>
        </div>
      </Section>

      <Section title="2. Multiplication : La Loi de l'Esquive" icon="⚔️" color="rose">
        <p className="mb-4">Contrairement à l'Addition, <strong>LA MULTIPLICATION S'EN FICHE DES VIRGULES DANS SON MUR !</strong> Tu poses ta multiplication de force sur la DROITE, sans aligner les virgules, comme en CM1 !</p>

        <InteractiveExercise 
          title="Multiplier le Poison : 4,2 &times; 1,3"
          question={<>Comment faire ce calcul sans exploser en vol et sans aligner d'Euros ?</>}
          steps={[
             <><strong>Étape 1 (Le Mensonge de l'Oubli) :</strong> Tu poses l'opération et tu calcules EXACTEMENT comme s'il n'y avait AUCUNE virgule. Tu calcules "42 &times; 13".</>,
             <><strong>Étape 2 (Le Travail Brut) :</strong> L'algorithme se déroule (Tu n'oublies pas ton Zéro magique de la deuxième ligne), tu additionnes. Le Résultat brut est "546".</>,
             <><strong>Étape 3 (Le Tribunal de la Virgule) :</strong> C'est la fin du monde, il faut placer la virgule au Résultat Final. Regarde tes Nombres d'En Haut.</>,
             <>Dans "4,2", il y a <strong className="text-rose-500">1 Chiffre</strong> coincé derrière la Virgule. <br/>Dans "1,3", il y a <strong className="text-rose-500">1 Chiffre</strong> coincé derrière la virgule.</>,
             <>Total : J'ai mis "2 Poussières" en jeu dans ce combat ! Mon résultat ("546") va subir <strong>2 Sauts de Reculs (Vers la Gauche)</strong> pour remettre ses Virgules !</>,
             <><strong>Final :</strong> Je pars de la fin du 546 et je recule de 2 bonds. La virgule tombe. <strong>Réponse : 5,46 !</strong></>
          ]}
        />
      </Section>

      <Section title="3. L'Astuce de Calcul Mental : Ordre des Facteurs" icon="🪄" color="blue">
        <p className="mb-4">L'Addition et la Multiplication sont merveilleuses car elles sont "Commutatives". C'est un mot barbare pour dire : "Tu peux choper les blocs dans n'importe quel ordre."</p>

        <TipBanner title="Le Mariage des Amis" type="success">
           Ne calcule plus de gauche à droite comme une machine ! Regroupe les Nombres qui créent de la Magie Ronde.<br/>
           Calculer <code>A = 2,5 + 7,2 + 7,5</code><br/>
           Regroupe d'abord les "0,5" ! &rarr; <strong>2,5 + 7,5 = 10,0 pur !</strong><br/>
           Ensuite c'est facile : 10 + 7,2 = <strong>17,2</strong>. 
        </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans une SOUSTRACTION <code>15 - 3,4</code>, un élève a posé "le 4 vide" en haut du mur et il obtient 12,4. Est-ce vrai ?</>}
            back={<><strong>Faux !! C'est la Malédiction du Vide !</strong><br/>Au dessus du 4... Il y avait UN VIDE. Le vide OBLIGE À POSER UN ZERO. Il fallait calculer "15,0 - 3,4", ce qui demandera une Retenue et donnera un final à ",6" ! (Résultat: 11,6).</>}
          />
          <Flashcard 
            front={<>Le résultat de <code>0,2 &times; 0,3</code> c'est 0,6 ?</>}
            back={<><strong>Alerte Erreur Fatale ! NON !</strong><br/>Il y a 1 chiffre derrière la virgue pour 0,2. ET 1 chiffre derrière pour le 0,3. Donc DEUX SAUTS globaux. "2&times;3=6". On recule de 2 sauts, on crée un zéro boucher. Résultat : <strong>0,06 !</strong></>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'aligne mes virgules par erreur à la Multiplication, le résultat sera faux ?",
              answer: "Le résultat de ta Multiplication de droite sera Bon (même si c'est vilain à voir), mais C'EST LA PLACE FINALE DE LA VIRGULE QUI TE TUERA. Si tu fais tomber la virgule comme à l'addition, c'est FAUX. Et si tu la décales en comptant les chiffres d'en haut (vrai moyen), l'alignement ne t'a servi à rien !"
            },
            {
              question: "Le mot 'Termes' et 'Facteurs', c'est quoi cette langue de bois ?",
              answer: "Les nombres qui se marient dans l'Addition '+' et la soustraction '-' s'appellent des TERMES. Dans la multiplication '&times;', ils s'appellent des FACTEURS. La somme des termes, le produit des facteurs."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Répète la commande : Au moment de poser une Multiplicaton entre 4,2 et 7. Je dois...",
              options: [
                "Bien Mettre le '7' sous l'unité '4'. Et l'aligner de force.",
                "Poser le '7' sous le '2' sans me poser de question de Virgule (Contre le mur classique)."
              ],
              correctAnswer: 1,
              explanation: "Top Suprématie ! La multiplication se pose en mode 'Bourrin sur la droite'. On ignore les virgules pendant le calcul des batailles !"
            },
            {
              question: "Acheter 2 pistolets à eau à 4.90€ et une Glace à 1.10€... Quelle est l'addition mentale magique Astuce rapide ?",
              options: [
                "On ajoute 4.90 et 1.10 ensemble d'abord. Ca fait 6.00€ pur ! Le deuxième pistolet fait 6 + 4.90 = 10.90€.",
                "On fait les 2 pistolets d'abord (4.90 * 2 = 9.80). Puis la glace."
              ],
              correctAnswer: 0,
              explanation: "Excellent ! L'association des Compléments 90 Centimes + 10 Centimes pour créer un Jeton de '1 Euro' entier est le pouvoir de libération des virgules !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de Fer Addition: Virgule SOUS LA Virgule (Le Mur !)",
            "Règle de Soustraction: ZÉRO BOUCHER obligatoire avant de soustraire les poussière d'en bas.",
            "Règle Multiplication: Calcul sans virgule &rarr; Je compte Nombre de Chiffres Derrière Totaux en Haut &rarr; Reculs au résultat Final."
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

export default Course_College_6eme_02_Operations_Decimaux;
