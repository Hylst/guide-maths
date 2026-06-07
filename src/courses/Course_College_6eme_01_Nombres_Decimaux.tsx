import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Ruler, Sparkles, HelpCircle, ArrowRight, Layers } from 'lucide-react';

const PlaceValueVisualizer: React.FC = () => {
  const [units, setUnits] = useState(3);
  const [tenths, setTenths] = useState(4);
  const [hundredths, setHundredths] = useState(5);

  const totalValue = units + tenths * 0.1 + hundredths * 0.01;

  return (
    <div className="bg-indigo-50/40 dark:bg-indigo-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900 my-8 shadow-sm">
      <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-lg mb-4 flex items-center gap-2">
        <Layers className="text-indigo-500 w-5 h-5 animate-pulse" />
        Simulateur Interactif : Le Microscope de la Virgule
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Ajuste les curseurs pour manipuler les unités entières, les dixièmes (coupés en 10) et les centièmes (coupés en 100). Regarde comment la valeur globale se modifie instantanément !
      </p>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Unités (Entières) : <span className="text-indigo-600 dark:text-indigo-400 text-lg font-black">{units}</span>
          </label>
          <input 
            type="range" min="0" max="9" value={units} 
            onChange={(e) => setUnits(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="text-[11px] font-semibold text-slate-400 mt-1">Gros blocs de valeur 1</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Dixièmes {"$(1/10)$"} : <span className="text-emerald-600 dark:text-emerald-400 text-lg font-black">{tenths}</span>
          </label>
          <input 
            type="range" min="0" max="9" value={tenths} 
            onChange={(e) => setTenths(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="text-[11px] font-semibold text-slate-400 mt-1">Coupures de valeur 0,1</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Centièmes {"$(1/100)$"} : <span className="text-rose-600 dark:text-rose-400 text-lg font-black">{hundredths}</span>
          </label>
          <input 
            type="range" min="0" max="9" value={hundredths} 
            onChange={(e) => setHundredths(parseInt(e.target.value))}
            className="w-full accent-rose-600"
          />
          <div className="text-[11px] font-semibold text-slate-400 mt-1">Poussières de valeur 0,01</div>
        </div>
      </div>

      {/* Visual representation */}
      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 flex flex-col items-center">
        <div className="text-center mb-6">
          <span className="text-sm font-semibold text-slate-400 tracking-wider block mb-1">DÉCOMPOSITION MATHÉMATIQUE</span>
          <div className="text-2xl md:text-3xl font-mono font-black tracking-wide text-foreground">
            {units} + <span className="text-emerald-600">{"$\\frac{" + tenths + "}{10}$"}</span> + <span className="text-rose-600">{"$\\frac{" + hundredths + "}{100}$"}</span> = <span className="text-indigo-600 dark:text-indigo-400">{totalValue.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* SVG Block Visualization */}
        <div className="w-full max-w-lg">
          <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-border w-full">
            {/* Units list */}
            <g transform="translate(10, 10)">
              <text x="0" y="15" className="text-[10px] font-bold fill-slate-400 uppercase">Unités</text>
              {Array.from({ length: units }).map((_, i) => (
                <rect key={i} x={i * 12} y="25" width="8" height="40" rx="2" fill="#4f46e5" className="opacity-90 shadow-sm" />
              ))}
              {units === 0 && <text x="0" y="45" className="text-xs italic fill-slate-400">Aucun</text>}
            </g>

            {/* Separator / virgule */}
            <g transform="translate(140, 10)">
              <text x="0" y="55" className="text-3xl font-black fill-red-500 animate-bounce">,</text>
            </g>

            {/* Tenths list */}
            <g transform="translate(170, 10)">
              <text x="0" y="15" className="text-[10px] font-bold fill-emerald-500 uppercase">Dixièmes</text>
              {Array.from({ length: tenths }).map((_, i) => (
                <rect key={i} x={i * 12} y="25" width="8" height="20" rx="1.5" fill="#10b981" />
              ))}
              {tenths === 0 && <text x="0" y="45" className="text-xs italic fill-slate-400">Aucun</text>}
            </g>

            {/* Hundredths list */}
            <g transform="translate(300, 10)">
              <text x="0" y="15" className="text-[10px] font-bold fill-rose-500 uppercase">Centièmes</text>
              {Array.from({ length: hundredths }).map((_, i) => (
                <rect key={i} x={i * 10} y="25" width="6" height="8" rx="1" fill="#f43f5e" />
              ))}
              {hundredths === 0 && <text x="0" y="45" className="text-xs italic fill-slate-400">Aucun</text>}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_01_Nombres_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-01"
        title="Nombres Entiers et Décimaux"
        subtitle="L'art de l'Infiniment Petit et de la Virgule Magique"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Maîtriser les grands nombres entiers de l'école primaire", "Connaître le fonctionnement de l'argent et des centimes"]}
        objectives={[
          "Comprendre le Tableau de Numération (Classes des Milliards aux Millièmes).",
          "Placer correctement la virgule.",
          "Comparer et ranger des nombres décimaux sans tomber dans les pièges.",
          "Passer de l'écriture en fraction décimale à l'écriture à virgule."
        ]}
      />

      <Section title="🌟 Introduction : Pourquoi couper les nombres ?" icon="🔪" color="slate">
        <p>
          En Primaire, tu as découvert un univers fait de gros blocs incassables : 1, 2, 3... les <strong>Nombres Entiers</strong>. 
          Mais très vite, dans la vraie vie, tu ne peux pas payer exactement "2 euros" pour une baguette à "1 euro et 20 centimes".
        </p>
        <p className="mt-4">
          C'est là qu'interviennent les <strong>Nombres Décimaux</strong>. La virgule est un microscope magique : elle ouvre un tout nouvel univers de nombres <em>entre</em> "1" et "2". L'infiniment petit !
        </p>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          La virgule n'a pas toujours été utilisée ! Avant son invention au XVIe siècle par le mathématicien flamand Simon Stevin, on écrivait les fractions avec des notations très compliquées ou de simples espaces. L'adoption de la virgule a révolutionné la science et les systèmes de monnaie !
        </InfoBlock>
      </Section>

      <Section title="1. Le Tableau de Numération (Entier vs Décimal)" icon="📊" color="indigo">
        <p className="mb-4">Tout nombre est une association de "boîtes". Un nombre décimal est séparé exactement en deux mondes par une frontière infranchissable : <strong>La Virgule</strong>.</p>
        
        {/* Schema interactif des colonnes */}
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 shadow-sm overflow-x-auto my-6">
           <table className="w-full text-center border-collapse font-mono min-w-[650px]">
             <thead>
               <tr>
                 <th colSpan={3} className="border-b-2 border-r-4 border-indigo-800 p-2 text-indigo-700 dark:text-indigo-300">Partie ENTIÈRE<br/><span className="text-xs font-normal">(Le monde des Grands)</span></th>
                 <th className="p-2 border-b-2 font-black text-rose-500 text-2xl">,</th>
                 <th colSpan={3} className="border-b-2 border-indigo-800 p-2 text-emerald-700 dark:text-emerald-300">Partie DÉCIMALE<br/><span className="text-xs font-normal">(L'Infiniment Petit)</span></th>
               </tr>
               <tr className="text-sm">
                 <th className="border p-2">Centaines</th>
                 <th className="border p-2">Dizaines</th>
                 <th className="border-r-4 border-indigo-800 p-2">Unités</th>
                 <th className="p-2 font-black text-rose-500 text-lg"></th>
                 <th className="border p-2">Dixièmes (1/10)</th>
                 <th className="border p-2">Centièmes (1/100)</th>
                 <th className="border p-2">Millièmes (1/1000)</th>
               </tr>
             </thead>
             <tbody className="bg-card dark:bg-black/30 text-lg font-bold">
               <tr>
                 <td className="border p-3 text-slate-400"></td>
                 <td className="border p-3 text-indigo-600 dark:text-indigo-400">4</td>
                 <td className="border-r-4 border-indigo-800 p-3 text-indigo-600 dark:text-indigo-400">2</td>
                 <td className="p-3 text-rose-500 text-2xl font-black">,</td>
                 <td className="border p-3 text-emerald-600 dark:text-emerald-400">5</td>
                 <td className="border p-3 text-emerald-600 dark:text-emerald-400">0</td>
                 <td className="border p-3 text-emerald-600 dark:text-emerald-400">8</td>
               </tr>
             </tbody>
           </table>
           <p className="text-center font-bold mt-4">Nombre de l'exemple : 42,508. (Quarante-deux unités ET cinq-cent-huit millièmes)</p>
        </div>

        <InfoBlock title="Rappel de Base" type="reminder">
          La virgule se positionne TOUJOURS immédiatement après le chiffre des <strong>Unités</strong>. C'est elle qui sépare la partie entière (à sa gauche) de la partie décimale (à sa droite).
        </InfoBlock>
      </Section>

      <Section title="2. Notre Microscope de la Virgule" icon="🔍" color="indigo">
        <p className="mb-4">
          Manipule l'application ci-dessous pour appréhender de façon concrète cette relation intime entre l'écriture fractionnaire et l'écriture décimale.
        </p>
        <PlaceValueVisualizer />
      </Section>

      <Section title="3. Comparer : Le Piège de la Longueur" icon="⚖️" color="blue">
        <p className="mb-4">Le cerveau humain compare naturellement la longueur des mots. Mais en décimal, le nombre "le plus long" N'EST PAS forcément le plus grand !</p>

        <TipBanner title="Le Zéro Fantôme Inutile" type="warning">
           Le zéro mis TOUT À LA FIN de la partie décimale ne sert à rien ! C'est un zéro de confort.<br/>
           <strong>12,4 = 12,40 = 12,4000 !</strong><br/>
           Pour comparer <code>12,4</code> et <code>12,385</code>, ton cerveau bug car "385" a l'air plus grand que "4".<br/>
           <strong>La Ruse Suprême :</strong> Ajoute des zéros ! Transforme 12,4 en <strong>12,400</strong>. <br/>Maintenant compare : <code>12,400</code> vs <code>12,385</code>.  400 bat 385 !
        </TipBanner>
      </Section>

      <Section title="4. Les Fractions Décimales et Équivalences" icon="🍰" color="amber">
        <p className="mb-4">Une fraction décimale, c'est facile ! C'est une fraction dont le 'Bas' (Dénominateur) est 10, 100, ou 1000. Le nombre de "Zéros" en bas commande le nombre de chiffres derrière la virgule !</p>

        <InteractiveExercise 
          title="Le Glissement de Virgule"
          question={<>Convertis la fraction : <strong>345 / 100</strong> en nombre décimal virgule.</>}
          steps={[
            <><strong>1. Je compte les zéros au sous-sol :</strong> Le "100" possède <strong>2 zéros</strong>.</>,
            <><strong>2. J'écris le nombre du haut pur :</strong> J'écris "345" sur mon papier.</>,
            <><strong>3. La virgule glisse vers la GAUCHE :</strong> Puisqu'il y a 2 zéros, la virgule doit laisser exactement DEUX chiffres derrière elle (à sa droite) pour les punir en décimal.</>,
            <><strong>4. Fin :</strong> La virgule tombe entre le 3 et le 4. <strong>Réponse : 3,45.</strong></>
          ]}
        />

        <InfoBlock title="Zoom sur les fractions décimales d'un même nombre" type="info">
          Un même nombre décimal peut s'écrire de multiples façons sous formes de fractions :
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{"$12,4 = \\frac{124}{10}$"} (124 dixièmes)</li>
            <li>{"$12,4 = \\frac{1240}{100}$"} (1240 centièmes)</li>
            <li>{"$12,4 = 12 + \\frac{4}{10}$"} (12 unités entières et 4 dixièmes)</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Écriture fractionnaire</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Décompose le nombre décimal <strong>7,08</strong> sous forme de somme d'un entier et d'une seule fraction décimale, puis sous forme d'une seule fraction décimale globale.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>On repère d'abord la partie entière. Ici, c'est <strong>7</strong>.</li>
                <li>La partie décimale commence par un chiffre 0 pour les dixièmes et se termine par un 8 pour les centièmes. Le dernier chiffre significatif correspond ainsi à l'unité des <strong>centièmes</strong> (deuxième chiffre après la virgule).</li>
                <li>On en conclut que la partie décimale vaut {"$\\frac{8}{100}$"}. La décomposition est donc : <span className="font-mono text-xs text-indigo-600">{"$7 + \\frac{8}{100}$"}</span>.</li>
                <li>Pour écrire le nombre sous forme d'une seule fraction décimale, on retire la virgule pour constituer le numérateur : 708. Comme le nombre comporte deux chiffres après la virgule, le dénominateur possède deux zéros (100). Ce qui donne la fraction globale : <span className="font-mono text-xs text-indigo-600">{"$\\frac{708}{100}$"}</span>.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Rangement ordonné</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Range ces nombres décimaux dans l'ordre croissant (du plus petit au plus grand) : <br />
              <code className="text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded">5,4 / 5,123 / 5,39 / 5,08</code>
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Toutes les parties entières sont égales à <strong>5</strong>. On doit donc comparer exclusivement les parties décimales.</li>
                <li>On applique la <strong>Ruse Suprême</strong> en rajoutant des zéros de confort pour équilibrer la longueur à 3 chiffres après la virgule (la longueur maximale de cet ensemble) :
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>5,4 devient <strong>5,400</strong></li>
                    <li>5,123 reste <strong>5,123</strong></li>
                    <li>5,39 devient <strong>5,390</strong></li>
                    <li>5,08 devient <strong>5,080</strong></li>
                  </ul>
                </li>
                <li>On compare à présent la suite des nombres : 80 &lt; 123 &lt; 390 &lt; 400.</li>
                <li>Le résultat de l'ordre croissant est donc : <span className="font-black text-emerald-600">5,08 &lt; 5,123 &lt; 5,39 &lt; 5,4</span>.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Lequel est le plus grand ? <strong>5,9</strong> ou <strong>5,12</strong> ?</>}
            back={<><strong>5,9 !</strong><br/>Ajoute le zéro invisible : 5,9 devient 5,90. Et 90 bat 12. Ne te fais plus jamais avoir par la longueur visuelle.</>}
          />
          <Flashcard 
            front={<>Le nombre entier "25" a-t-il une Virgule cachée ?</>}
            back={<><strong>Oui ! TOUJOURS.</strong><br/>Elle attend juste derrière son dos, invisible. "25" s'écrit formellement "25,0" (ou 25,000).</>}
          />
          <Flashcard 
            front={<>Qu'est-ce que l'unité des millièmes ?</>}
            back={<>C'est le <strong>troisième chiffre</strong> après la virgule. Il représente une unité partagée en 1 000 parts égales. C'est dix fois plus petit qu'un centième !</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "À quoi sert le chiffre des DIXIÈMES ?",
              answer: "Le dixième (le premier chiffre juste après la virgule) représente les pièces de 10 centimes de notre Euro ! C'est la coupure en 10 du gâteau entier 'Unité'."
            },
            {
              question: "Peut-on supprimer un 0 au MILIEU de la partie décimale (Ex: 14,05) ?",
              answer: "JAMAIS ! Seuls les zéros placés de manière totalement libre à l'EXTRÊME DROITE (comme 14,50) ou EXTRÊME GAUCHE (comme 014,5) sont inutiles et effaçables. Le zéro de 14,05 agit comme un mur protecteur pour tenir le '5' dans la case des Centièmes !"
            },
            {
              question: "Pourquoi les nombres décimaux sont-ils dits d'un ensemble dense ?",
              answer: "C'est une propriété magique ! Entre deux nombres entiers, par exemple 1 et 2, il y a un nombre infini de nombres décimaux ! On peut diviser les espaces à l'infini (1,1 puis 1,11 puis 1,111...)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est le nombre décimal correspondant à '42 / 1000' ?",
              options: [
                "42,1000",
                "0,42",
                "0,042"
              ],
              correctAnswer: 2,
              explanation: "Top ! Il y a 3 zéros dans '1000'. Donc on doit FORCER le nombre à avoir 3 chiffres derrière la virgule. On ajoute des murs de zéros : 0,042 (Millième, Centième, Dixième)."
            },
            {
              question: "Dans le nombre 3 594,21. Quel est le chiffre de la CENTAINE ? (Pas sa valeur, juste le chiffre)",
              options: [
                "Le 5",
                "Le 2",
                "Le 9"
              ],
              correctAnswer: 0,
              explanation: "Parfait ! 'Centaine' c'est le 3ème pilier Entier (À gauche de la virgule : Unités, Dizaines, Centaines). Donc le 5 ! (Le 2 est le chiffre des 'Dixièmes', ne confonds plus !)"
            },
            {
              question: "Lequel de ces nombres décimaux est strictement inférieur à 8,1 ?",
              options: [
                "8,12",
                "8,095",
                "8,10"
              ],
              correctAnswer: 1,
              explanation: "Exact ! Si l'on ajoute des zéros pour comparer : 8,1 vaut 8,100. Or 8,095 est inférieur à 8,100 car 95 millièmes est plus petit que 100 millièmes."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Pour comparer deux nombres, j'ajoute TOUJOURS des zéros pour qu'ils aient la même longueur décimale.",
            "Division par 10/100/1000 &rarr; La virgule recule vers la Gauche (le nombre rapetisse).",
            "Multiplication par 10/100/1000 &rarr; La virgule avance vers la Droite (le nombre grandit)."
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

export default Course_College_6eme_01_Nombres_Decimaux;
