import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { PlusSquare, MinusSquare, XSquare, Calculator, Layers, HelpCircle } from 'lucide-react';

const DecimalOperationVisualizer: React.FC = () => {
  const [val1, setVal1] = useState(14.5);
  const [val2, setVal2] = useState(9.23);

  const sumResult = (val1 + val2).toFixed(2);
  const prodResult = (val1 * val2).toFixed(4);

  return (
    <div className="bg-rose-50/40 dark:bg-rose-950/20 p-6 md:p-8 rounded-[2rem] border border-rose-100 dark:border-rose-900/60 my-8 shadow-sm">
      <h3 className="font-bold text-rose-900 dark:text-rose-200 text-lg mb-4 flex items-center gap-2">
        <Calculator className="text-rose-500 w-5 h-5 animate-pulse" />
        Lab' Interactif : Alignement vs Esquive des Virgules
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Modifie les valeurs pour observer visuellement la différence fondamentale entre poser une addition (alignement strict des virgules) et poser une multiplication (calcul standard puis saut de virgule à la fin).
      </p>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Premier nombre : <span className="text-rose-600 dark:text-rose-400 text-lg font-black">{val1}</span>
          </label>
          <input 
            type="range" min="1.0" max="25.0" step="0.5" value={val1} 
            onChange={(e) => setVal1(parseFloat(e.target.value))}
            className="w-full accent-rose-600"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Deuxième nombre : <span className="text-indigo-600 dark:text-indigo-400 text-lg font-black">{val2}</span>
          </label>
          <input 
            type="range" min="1.00" max="15.00" step="0.25" value={val2} 
            onChange={(e) => setVal2(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ADDITION */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/40 flex flex-col items-center">
          <span className="text-xs font-black tracking-widest text-rose-500 mb-4 block uppercase font-mono">1. ADDITION (On ALIGNE les murs)</span>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl font-mono text-center border border-border w-full flex flex-col items-center justify-center min-h-[160px]">
            <div className="text-right w-36 pr-4 relative">
              {/* Virgule guide */}
              <div className="absolute top-0 bottom-0 right-[42px] border-r border-dashed border-red-400 opacity-40"></div>
              <div className="text-lg leading-none tracking-wider">{val1.toFixed(2).replace('.', ',')}</div>
              <div className="text-lg leading-none tracking-wider border-b border-slate-400 pb-1">+ {val2.toFixed(2).replace('.', ',')}</div>
              <div className="text-xl font-bold pt-1 text-rose-600 tracking-wider">={sumResult.replace('.', ',')}</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
            Les virgules sont parfaitement superposées en mur. On complète par des zéros de confort si nécessaire.
          </p>
        </div>

        {/* MULTIPLICATION */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 flex flex-col items-center">
          <span className="text-xs font-black tracking-widest text-indigo-500 mb-4 block uppercase font-mono">2. MULTIPLICATION (On ESQUIVE les murs)</span>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl font-mono text-center border border-border w-full flex flex-col items-center justify-center min-h-[160px]">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Chiffres après la virgule :
            </div>
            <div className="text-xs text-slate-500 mb-3">
              {val1} ({(val1.toString().split('.')[1] || '').length} d) &times; {val2} ({(val2.toString().split('.')[1] || '').length} d)
            </div>
            <div className="text-xl font-mono font-black text-indigo-600">
              ={parseFloat(prodResult).toString().replace('.', ',')}
            </div>
            <div className="bg-slate-200 dark:bg-slate-800 text-[10px] font-black rounded px-2.5 py-1 mt-2 text-indigo-800 dark:text-indigo-200">
              {((val1.toString().split('.')[1] || '').length + (val2.toString().split('.')[1] || '').length)} SAUTS DE VIRGULE EN TOUT
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
            On multiplie d'abord comme s'il n'y avait aucune virgule, puis on compte le total des décimales d'en haut pour placer la virgule au produit final.
          </p>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_02_Operations_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-02"
        title="Opérations sur les Nombres Décimaux"
        subtitle="Additionner, Soustraire et Multiplier les décimaux avec Maîtrise"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["L'Addition posée (Primaire)", "Les Tables de multiplication"]}
        objectives={[
          "Poser Correctement L'Addition avec des Virgules (Le Mur Parfait).",
          "Gérer le zéro magique dans les soustractions difficiles.",
          "Maîtriser la loi des sauts de virgule lors des Multiplications."
        ]}
      />

      <Section title="🌟 Introduction : Les colonnes de l'Empire" icon="🏛️" color="slate">
        <p>
          En Primaire, poser une addition était facile : on calait tous les nombres bien sagement sur la droite, contre le grand mur invisible de fin. Tout s'alignait !
        </p>
        <p className="mt-4">
          En 6ème, avec l'arrivée des <strong>Décimaux</strong>, si tu cales tes nombres sur la droite... tu vas additionner des Euros Entiers avec des Centimes de poussière. C'est l'Explosion Nucléaire garantie ! Il faut un nouveau Chef de Colonne : <strong>La Virgule</strong>.
        </p>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          La multiplication de grands nombres décimaux est utilisée quotidiennement par les ordinateurs pour calculer les pixels et la modélisation 3D en temps réel dans tes jeux vidéo favoris ! De simples approximations d'arrondis de virgules peuvent ruiner le réalisme physique d'une simulation.
        </InfoBlock>
      </Section>

      <Section title="1. L'Addition & Soustraction (Le Mur de la Virgule)" icon="🧱" color="indigo">
        <p className="mb-4">Quand on additionne ou que l'on soustrait +, -, la LOI TOTALE est l'alignement des Virgules.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6 animate-fade-in">
           <div className="bg-card dark:bg-black/30 p-6 rounded-xl font-mono text-xl shadow-lg relative border-l-4 border-indigo-500">
             {/* Ligne pointillée rouge pour la virgule */}
             <div className="absolute top-0 bottom-0 left-[62px] border-l-2 border-rose-500 border-dashed z-0 opacity-50"></div>
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
                   <td className="border-b-2 border-slate-300 relative -left-4">+</td>
                   <td className="border-b-2 border-slate-300"></td>
                   <td className="border-b-2 border-slate-300">9</td>
                   <td className="border-b-2 border-slate-300 text-rose-500 font-black">,</td>
                   <td className="border-b-2 border-slate-300">2</td>
                   <td className="border-b-2 border-slate-300">3</td>
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
             <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
               <li>Les Virgules doivent TOUTES êtres exactement l'une en dessous de l'autre, formant un Mur invisible vertical.</li>
               <li>Je pose des "Zéros Invisibles" en renfort pour boucher les trous à droite et mettre tous mes soldats à égalité.</li>
               <li>Dans le résultat (en bas), la virgule 'tombe' tout droit, elle continue le Mur à la même place !</li>
             </ul>
           </div>
        </div>
      </Section>

      <Section title="2. Notre Laboratoire d'Opérations" icon="📊" color="rose">
        <DecimalOperationVisualizer />
      </Section>

      <Section title="3. Multiplication : La Loi de l'Esquive" icon="⚔️" color="rose">
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

      <Section title="4. L'Astuce de Calcul Mental : Ordre des Facteurs" icon="🪄" color="blue">
        <p className="mb-4">L'Addition et la Multiplication sont merveilleuses car elles sont "Commutatives". C'est un mot barbare pour dire : "Tu peux choper les blocs dans n'importe quel ordre."</p>

        <TipBanner title="Le Mariage des Amis" type="success">
           Ne calcule plus de gauche à droite comme une machine ! Regroupe les Nombres qui créent de la Magie Ronde.<br/>
           Calculer <code>A = 2,5 + 7,2 + 7,5</code><br/>
           Regroupe d'abord les "0,5" ! &rarr; <strong>2,5 + 7,5 = 10,0 pur !</strong><br/>
           Ensuite c'est facile : 10 + 7,2 = <strong>17,2</strong>. 
         </TipBanner>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Soustraction piégée</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Pose et calcule de tête ou à l'écrit : <strong>{"$24,1 - 3,55$"}</strong>.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>On aligne scrupuleusement les virgules : le 3 de "3,55" se place pile sous le chiffre des unités 4 de "24,1".</li>
                <li>Le chiffre "5" (des centièmes) de "3,55" se retrouve sous un vide. On rajoute IMPÉRATIVEMENT un zéro boucher de confort : "24,1" devient <strong>24,10</strong>.</li>
                <li>L'opération devient <strong>24,10 - 3,55</strong>.</li>
                <li>On effectue la soustraction en mettant en place les retenues ordinaires :
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>0 - 5 est impossible, on calcule 10 - 5 = 5 (avec retenue)</li>
                    <li>1 - 6 (retenue prise en compte) est impossible, on calcule 11 - 6 = 5 (avec retenue)</li>
                    <li>4 - 4 = 0</li>
                    <li>2 - 0 = 2</li>
                  </ul>
                </li>
                <li>On fait tomber la virgule dans le même axe : <strong>20,55</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Multiplication à virgules multiples</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Calcule le produit <strong>{"$0,3 \\times 0,07$"}</strong> sans calculatrice.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>On effectue premièrement le calcul sans se soucier des virgules : <strong>3 &times; 7 = 21</strong>.</li>
                <li>On compte le nombre total de chiffres derrière la virgule dans les facteurs :
                  <ul className="list-disc pl-5 mt-0.5">
                    <li>"0,3" possède 1 chiffre après sa virgule</li>
                    <li>"0,07" possède 2 chiffres après sa virgule</li>
                  </ul>
                </li>
                <li>On additionne les deux longueurs : 1 + 2 = <strong>3 chiffres derrière la virgule</strong> en tout au produit.</li>
                <li>On part du nombre "21" (qui est virtuellement "21,0") et l'on décale la virgule de <strong>3 crans vers la gauche</strong>. On complète par des zéros :
                  <ul className="list-disc pl-5 mt-0.5">
                    <li>1 saut : 2,1</li>
                    <li>2 sauts : 0,21</li>
                    <li>3 sauts : <strong>0,021</strong></li>
                  </ul>
                </li>
                <li>Le résultat final est donc <strong>0,021</strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Dans une SOUSTRACTION <code>15 - 3,4</code>, un élève a posé "le 4 vide" en haut du mur et il obtient 12,4. Est-ce vrai ?</>}
            back={<><strong>Faux !! C'est la Malédiction du Vide !</strong><br/>Au dessus du 4... Il y avait UN VIDE. Le vide OBLIGE À POSER UN ZERO. Il fallait calculer "15,0 - 3,4", ce qui demandera une Retenue et donnera un final à ",6" ! (Résultat: 11,6).</>}
          />
          <Flashcard 
            front={<>Le résultat de <code>0,2 &times; 0,3</code> c'est 0,6 ?</>}
            back={<><strong>Alerte Erreur Fatale ! NON !</strong><br/>Il y a 1 chiffre derrière la virgule pour 0,2. ET 1 chiffre derrière pour le 0,3. Donc DEUX SAUTS globaux. "2&times;3=6". On recule de 2 sauts, on crée un zéro boucher. Résultat : <strong>0,06 !</strong></>}
          />
          <Flashcard 
            front={<>Qu'arrive-t-il si l'on multiplie un nombre par 0,1 ?</>}
            back={<>Cela équivaut à diviser ce nombre par 10 ! Le nombre devient dix fois plus petit et la virgule décale d'un cran vers la gauche. Exemple : <code>45 &times; 0,1 = 4,5</code>.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'aligne mes virgules par erreur à la Multiplication, le résultat sera faux ?",
              answer: "Le résultat de ta Multiplication de droite sera Bon (même si c'est vilain à voir), mais C'EST LA PLACE FINALE DE LA VIRGULE QUI TE TUERA. Si tu fais tomber la virgule comme à l'addition, c'est FAUX. Et si tu la décales en comptant les chiffres d'en haut (vrai moyen), l'alignement ne t'a servi à rien !"
            },
            {
              question: "Quelle est la différence terminologique entre 'Termes' et 'Facteurs' ?",
              answer: "Les nombres qui s'associent dans l'Addition '+' et la Soustraction '-' s'appellent des TERMES. Dans la Multiplication '&times;', ils s'appellent des FACTEURS."
            },
            {
              question: "Pourquoi ajouter un zéro de confort dans la soustraction est-il indispensable ?",
              answer: "Parce que soustraire un chiffre à 'rien' n'est pas équivalent à laisser le chiffre tel quel ! Le vide représente un zéro mathématique, et ôter par exemple un 5 de zéro requiert la mise en place d'une retenue sur le rang de devant."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Répète la commande : Au moment de poser une Multiplication entre 4,2 et 7. Je dois...",
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
            },
            {
              question: "Combien vaut exactement 25,4 - 4,05 ?",
              options: [
                "21,35",
                "21,39",
                "21,45"
              ],
              correctAnswer: 0,
              explanation: "Superbe ! Si on ajoute un zéro, on effectue 25,40 - 4,05. On effectue 40 - 05 = 35 centièmes. Et 25 - 4 = 21. Le résultat est de 21,35 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Pour les additions et soustractions, j'aligne scrupuleusement les virgules en colonne.",
            "Pour la multiplication, j'ignore d'abord les virgules et je les compte à l'arrivée.",
            "Je complète toujours par des zéros de rechange lorsqu'un vide fait bugger la soustraction."
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
