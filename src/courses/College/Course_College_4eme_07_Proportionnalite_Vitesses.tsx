import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Ruler, Car, Scale, Clock, Activity, ArrowRightLeft } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_4eme_07_Proportionnalite: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  // Interactive SVD Triangle states
  const [selectedLetter, setSelectedLetter] = useState<'V' | 'D' | 'T'>('V');

  // Interactive mini calculator states
  const [calcDistance, setCalcDistance] = useState<number>(120);
  const [calcTime, setCalcTime] = useState<number>(2); // hours
  const [calcSpeed, setCalcSpeed] = useState<number>(60); // km/h

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-07"
        title="Proportionnalité et Vitesses"
        subtitle="Voyage dans le temps et l'espace avec le produit en croix !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Tableaux de proportionnalité du 5ème", "Les bases des fractions"]}
        objectives={[
          "Mémoriser l'arme absolue : Le Produit en Croix.",
          "Convertir le temps sans se faire piéger (1h30 ≠ 1,30 h).",
          "Calculer une Vitesse Moyenne, une Distance ou un Temps (v = d/t).",
          "Représenter un lien de proportionnalité sur un graphique rectiligne."
        ]}
      />

      <Section title="🌟 Introduction : Tout est lié" icon="🔗" color="slate">
        <p>
          La proportionnalité est la colonne vertébrale de la vie courante. Si 2 baguettes coûtent 2€, alors 4 baguettes coûtent 4€. C'est cela l'essence de la proportionnalité : les deux grandeurs mesurées (comme la quantité et le prix) grandissent ou rétrécissent <strong>exactement à la même vitesse de multiplication</strong>.
        </p>
        <p className="mt-4">
          Dans ce chapitre, nous allons perfectionner ton usage du tableau de proportionnalité avec l'outil de référence : le produit en croix. Puis, nous appliquerons ces concepts à l'étude des mouvements physiques avec le calcul des vitesses, distances et temps de déplacement.
        </p>
      </Section>

      {/* SCHEMA INTERACTIF & APLI ENRICHIE */}
      <Section title="🎮 Simulateur Interactif : Le Triangle de Vitesse" icon="📐" color="indigo">
        <p className="mb-6 text-muted-text">
          La vitesse, la distance et le temps forment une trinité indissociable. <strong>Clique sur l'une des trois lettres</strong> du triangle pour faire s'afficher sa définition, sa formule magique associée, et manipuler le mini-calculateur dynamique en temps réel !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-indigo-100/50 dark:shadow-none shadow-xl">
          {/* SVG Triangle (Left) */}
          <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border">
            <span className="text-[10px] font-mono text-slate-400 mb-4 uppercase tracking-wider">Cliquez sur une lettre du triangle :</span>
            
            <svg viewBox="0 0 100 100" className="w-56 h-56 overflow-visible select-none">
              {/* Outer Triangle */}
              <polygon 
                points="50,10 90,90 10,90" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              {/* Divisor line */}
              <line x1="22" y1="63" x2="78" y2="63" stroke="#cbd5e1" strokeWidth="2" />
              {/* Mid height line */}
              <line x1="50" y1="63" x2="50" y2="90" stroke="#cbd5e1" strokeWidth="2" />

              {/* Lette D (Distance) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedLetter('D')}
              >
                <circle cx="50" cy="32" r="14" fill={selectedLetter === 'D' ? '#f43f5e' : '#f8fafc'} stroke="#f43f5e" strokeWidth={selectedLetter === 'D' ? "3" : "1"} />
                <text x="50" y="37" textAnchor="middle" fontSize="15" fontWeight="bold" className={`${selectedLetter === 'D' ? 'fill-white' : 'fill-rose-500 font-extrabold group-hover:fill-rose-600'}`}>D</text>
              </g>

              {/* Lett V (Vitesse) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedLetter('V')}
              >
                <circle cx="34" cy="76" r="14" fill={selectedLetter === 'V' ? '#4f46e5' : '#f8fafc'} stroke="#4f46e5" strokeWidth={selectedLetter === 'V' ? "3" : "1"} />
                <text x="34" y="81" textAnchor="middle" fontSize="15" fontWeight="bold" className={`${selectedLetter === 'V' ? 'fill-white' : 'fill-indigo-600 font-extrabold group-hover:fill-indigo-700'}`}>V</text>
              </g>

              {/* Lett T (Temps) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedLetter('T')}
              >
                <circle cx="66" cy="76" r="14" fill={selectedLetter === 'T' ? '#10b981' : '#f8fafc'} stroke="#10b981" strokeWidth={selectedLetter === 'T' ? "3" : "1"} />
                <text x="66" y="81" textAnchor="middle" fontSize="15" fontWeight="bold" className={`${selectedLetter === 'T' ? 'fill-white' : 'fill-emerald-600 font-extrabold group-hover:fill-emerald-700'}`}>T</text>
              </g>
            </svg>
          </div>

          {/* Controller details (Right) */}
          <div className="flex flex-col justify-center space-y-4">
            {selectedLetter === 'D' && (
              <div className="space-y-4">
                <span className="p-1 px-3 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-mono text-xs font-bold rounded-full">MODE : DISTANCE (D)</span>
                <p className="text-sm font-medium leading-relaxed">
                  Tu cherches à connaître la distance parcourue. Puisque la vitesse et le temps sont côte à côte sur le bas du triangle, ils s'unissent en se multipliant !
                </p>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 font-mono text-sm space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Ajuster la Vitesse (V) :</span>
                    <span className="font-bold text-indigo-600">{calcSpeed} km/h</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    value={calcSpeed}
                    onChange={e => setCalcSpeed(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Ajuster le Temps (T) :</span>
                    <span className="font-bold text-emerald-600">{calcTime} h</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={calcTime}
                    onChange={e => setCalcTime(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="text-center font-bold text-lg pt-2 border-t text-rose-500">
                    D = V × T &rarr; {calcSpeed} × {calcTime} = <span className="text-xl font-black">{calcSpeed * calcTime} km</span>
                  </div>
                </div>
              </div>
            )}

            {selectedLetter === 'V' && (
              <div className="space-y-4">
                <span className="p-1 px-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold rounded-full">MODE : VITESSE (V)</span>
                <p className="text-sm font-medium leading-relaxed">
                  Tu cherches la vitesse moyenne. Sur le triangle, la Distance (D) est située tout en haut et surplombe le Temps (T) ! Elle va donc diviser le temps.
                </p>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 font-mono text-sm space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Ajuster la Distance (D) :</span>
                    <span className="font-bold text-red-500">{calcDistance} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    value={calcDistance}
                    onChange={e => setCalcDistance(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Ajuster le Temps (T) :</span>
                    <span className="font-bold text-emerald-600">{calcTime} h</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={calcTime}
                    onChange={e => setCalcTime(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="text-center font-bold text-lg pt-2 border-t text-indigo-600">
                    V = D / T &rarr; {calcDistance} / {calcTime} = <span className="text-xl font-black">{(calcDistance / calcTime).toFixed(1)} km/h</span>
                  </div>
                </div>
              </div>
            )}

            {selectedLetter === 'T' && (
              <div className="space-y-4">
                <span className="p-1 px-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold rounded-full">MODE : TEMPS (T)</span>
                <p className="text-sm font-medium leading-relaxed">
                  Tu cherches à connaître le temps nécessaire pour finir le trajet. La Distance (D) est située en haut et surplombe la Vitesse (V) en la divisant !
                </p>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 font-mono text-sm space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Ajuster la Distance (D) :</span>
                    <span className="font-bold text-red-500">{calcDistance} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    value={calcDistance}
                    onChange={e => setCalcDistance(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Ajuster la Vitesse (V) :</span>
                    <span className="font-bold text-indigo-600">{calcSpeed} km/h</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    value={calcSpeed}
                    onChange={e => setCalcSpeed(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="text-center font-bold text-lg pt-2 border-t text-emerald-600">
                    T = D / V &rarr; {calcDistance} / {calcSpeed} = <span className="text-xl font-black">{(calcDistance / calcSpeed).toFixed(2)} h</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Le saviez-vous ? InfoBlock */}
        <div className="mt-6">
          <InfoBlock title="Le saviez-vous ? Galileo et l'invention du rapport d'espace" type="funfact">
            Jusqu'au XVIIème siècle, personne n'écrivait la vitesse sous forme d'un quotient comme {"$\\text{km/h}$"} ou {"$\\text{m/s}$"}. C'est le physicien italien **Galilée** qui a décrit le premier le rapport mathématique précis entre l'espace parcouru et le temps écoulé, jetant les bases des équations modernes !
          </InfoBlock>
        </div>
      </Section>

      <Section title="1. L'Arme Absolue : Le Produit en Croix" icon="⚔️" color="indigo">
        <p className="mb-4">Tu n'as plus besoin de chercher péniblement le coefficient multiplicateur à virgule ! Le « Produit en Croix » est l'algorithme absolu pour boucher n'importe quelle case manquante d'un tableau proportionnel.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-950 shadow-sm my-6">
          <h3 className="font-bold text-center mb-4 text-lg text-indigo-900 dark:text-indigo-200">Tableau de référence : Le prix des avocats au marché</h3>
          <div className="flex justify-center mb-4 font-mono text-xl">
            <table className="bg-card dark:bg-slate-900 border-collapse rounded overflow-hidden shadow">
              <tbody>
                <tr>
                  <td className="border p-3 text-slate-500 font-bold">Masse (kg)</td>
                  <td className="border p-3 text-emerald-600 font-extrabold text-center">5</td>
                  <td className="border p-3 text-indigo-600 font-extrabold text-center">12</td>
                </tr>
                <tr>
                  <td className="border p-3 text-slate-500 font-bold">Prix (€)</td>
                  <td className="border p-3 text-indigo-600 font-extrabold text-center">15</td>
                  <td className="border p-3 text-rose-500 font-black text-center animate-pulse">?</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-card dark:bg-slate-950 p-4 rounded-xl border">
            <p className="font-bold mb-2">La cinématique d'or en 2 étapes :</p>
            <ul className="space-y-3 text-sm">
              <li><span className="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded text-xs font-mono mr-2">1. Multiplication Croisée</span> On multiplie ensemble la diagonale pleine (les deux nombres qui se font face en biais). Ici : <strong>12 &times; 15 = 180</strong>.</li>
              <li><span className="bg-rose-200 dark:bg-rose-800 px-2 py-1 rounded text-xs font-mono mr-2">2. Division de Rançon</span> On divise le bloc obtenu par le 'solitaire' (le dernier nombre en face du point d'interrogation). Ici : <strong>180 &divide; 5 = 36</strong>.</li>
            </ul>
            <p className="text-center font-bold text-rose-600 dark:text-rose-400 mt-4 text-lg">Le prix final recherché est de 36€ !</p>
          </div>
        </div>
      </Section>

      <Section title="2. Le Piège Mondial de la Conversion de Temps" icon="⏳" color="amber">
        <p className="mb-4">Les concepteurs du Brevet adorent se nourrir de cette erreur légendaire : imaginer que nos minutes fonctionnent sur une base de 100.</p>
        
        <TipBanner title="Règle d’or absolue du temps" type="warning">
          1h30 <strong>N'EST EN AUCUN CAS ÉGAL</strong> à 1,30 heure ! <br/>
          Une heure comporte 60 minutes. 30 minutes représentent la moitié d'un sablier solide. Donc 1h30 = <strong>1,5 heure</strong> !
        </TipBanner>

        <div className="bg-card dark:bg-slate-900 border-x-4 border-amber-500 p-5 rounded-2xl shadow-sm mt-4">
          <h3 className="font-bold mb-2 text-slate-800 dark:text-slate-100">Comment convertir des minutes en décimal (en heures) :</h3>
          <p className="text-sm text-slate-500 mb-2">Tu dois diviser tes minutes isolées par 60 !</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 mb-2">
            <li>15 minutes &rarr; 15 &divide; 60 = 0,25 h (Un quart d'heure)</li>
            <li>45 minutes &rarr; 45 &divide; 60 = 0,75 h (Trois quarts d'heure)</li>
            <li>12 minutes &rarr; 12 &divide; 60 = 0,2 h</li>
          </ul>
          <p className="font-bold text-amber-600 dark:text-amber-400 mt-4">Exemple à retenir : 2h15 min = 2,25 heures (et PAS 2,15!)</p>
        </div>

        <div className="mt-4">
          <InfoBlock title="Rappel de structure" type="reminder">
            Pour repasser d'une valeur décimale (comme 1,8 h) en véritables minutes, on opère le sens inverse : on multiplie la partie décimale par 60. <br/>
            0,8 × 60 = 48 minutes. Donc 1,8 h = 1h48 min.
          </InfoBlock>
        </div>
      </Section>

      <Section title="3. Vitesses : Le Triangle Magique v = d / t" icon="🚗" color="blue">
        <p className="mb-4">Il y a 3 variables à maîtriser : la <strong>V</strong>itesse moyenne, la <strong>D</strong>istance parcourue, et le <strong>T</strong>emps écoulé. Retiens bien la disposition du triangle pour ne jamais te tromper de formule !</p>

        <div className="bg-blue-50/50 dark:bg-slate-900 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-center gap-6 my-6">
          <div className="space-y-4 font-mono font-bold leading-relaxed">
            <p className="text-slate-700 dark:text-slate-300">Formule de la Vitesse : <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 px-2 py-0.5 rounded">v = d / t</span></p>
            <p className="text-slate-700 dark:text-slate-300">Formule de la Distance : <span className="bg-rose-100 text-rose-700 dark:bg-rose-950 px-2 py-0.5 rounded">d = v × t</span></p>
            <p className="text-slate-700 dark:text-slate-300">Formule du Temps : <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 px-2 py-0.5 rounded">t = d / v</span></p>
          </div>
        </div>
      </Section>

      {/* RESOLVED EXERCISES (EXERCICES RESOLUS) - OBLIGATOIRE */}
      <Section title="📝 Exercices Résolus de Voyageurs" icon="✍️" color="purple">
        <div className="space-y-6">
          <InteractiveExercise 
            title="Exercice Résolu 1 : Le Chrono du Marathonien"
            question={<p>Un athlète court un véritable marathon de 42 km à une vitesse moyenne de 12 km/h. Combien de temps s'écoulera-t-il exactement (en heures décimales, puis en heures et minutes) ?</p>}
            steps={[
              <><strong>Étape 1 : Isoler l'inconnue sous le drap du triangle</strong><br/>
              Nous cherchons le Temps (T). D'après l'analyse de notre triangle, nous savons que :<br/>
              {"$T = \\frac{D}{V}$"}.</>,
              <><strong>Étape 2 : Opérer la division de nos valeurs</strong><br/>
              On insère la distance D = 42 km et la vitesse V = 12 km/h :<br/>
              {"$T = \\frac{42}{12} = 3,5$"} heures décimales.</>,
              <><strong>Étape 3 : Conversion de la décimale en temps civil</strong><br/>
              La valeur 3,5 h représente 3 heures complètes, et une partie décimale de 0,5 h.<br/>
              Multiplions la décimale pour trouver les minutes : {"$0,5 \\times 60 = 30$"} minutes.<br/>
              L'athlète mettra donc exactement <strong>3h30</strong> pour vaincre l'épreuve !</>
            ]}
          />

          <InteractiveExercise 
            title="Exercice Résolu 2 : La Vitesse de l'Éclair (m/s)"
            question={<p>Une bille d'acier est propulsée sur une glissière et parcourt 60 mètres en seulement 1,2 secondes. Quelle est sa vitesse en mètres par seconde (m/s) puis sa correspondante en kilomètres par heure (km/h) ?</p>}
            steps={[
              <><strong>Étape 1 : Calculer la vitesse en m/s (valeurs nativees)</strong><br/>
              La distance D = 60 m, le temps T = 1,2 s.<br/>
              {"$V = \\frac{D}{T} = \\frac{60}{1,2} = 50$"} m/s.</>,
              <><strong>Étape 2 : Appliquer le pont de conversion magique</strong><br/>
              Pour passer de mètres par seconde à kilomètres par heure, on doit <strong>Multiplier par 3,6</strong> !<br/>
              {"$V = 50 \\times 3,6 = \\mathbf{180}$"} km/h.<br/>
              La bille file à une allure de course de 180 km/h !</>
            ]}
          />
        </div>
      </Section>

      <Section title="4. Représentation Graphique de la Proportionnalité" icon="📈" color="emerald">
        <p className="mb-4">Au Brevet, l'énoncé te montrera parfois une grille munie d'une trajectoire. Retiens cette phrase magique à recracher sur ta copie pour décrocher les points de validation :</p>
        
        <InfoBlock title="Le Sceau de Validation" type="info">
          "La courbe représentative de cette fonction est une <strong>Ligne Droite</strong> ET elle passe par <strong>l'Origine du repère (0,0)</strong>, DONC il s'agit d'une situation de proportionnalité parfaite."
        </InfoBlock>
        
        <p className="mt-4 text-xs text-slate-500 italic">
          Si la ligne est courbée, ou si elle est bien droite mais démarre plus haut (par exemple en faisant payer un abonnement de départ), ce n'est PAS de la proportionnalité. Pour être proportionnel, acheter 0 avocat doit coûter exactement 0€ !
        </p>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Un cycliste pédale de 14h20 à 16h40. Combien de temps s'est écoulé sous format décimal ?</>}
            back={<>1. On calcule la durée brute : 16h40 - 14h20 = 2h20.<br/>2. On convertit les minutes seules : 20 &divide; 60 = 0,33 h.<br/>3. Le temps décimal final est de <strong>2,33 heures</strong> !</>}
          />
          <Flashcard 
            front={<>Quelle est la technique de franchissement pour convertir des m/s en km/h ?</>}
            back={<>Le coefficient pivot est <strong>3,6</strong> !<br/>- De m/s vers km/h &rarr; On <strong>Multiplie par 3,6</strong>.<br/>- De km/h vers m/s &rarr; On <strong>Divise par 3,6</strong>.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'utilise le Produit en Croix sans faire de tableau, mon calcul est-il valide ?",
              answer: "Oui ! C'est une démarche universelle parfaitement acceptée au Brevet. Pense juste à écrire l'équation croisée sur ta copie, par exemple : 'Distance = (8 × 4,5) / 3 = 12 km'."
            },
            {
              question: "Si j'ai t=2,5 h sur ma calculatrice, s'agit-il de 2h05 ou de 2h50 ?",
              answer: "Aucun des deux ! C'est du système décimal classique. 2,5 h signifie 'deux heures et demie', soit exactement 2 heures et 30 minutes. Le 0,5 se multiplie par 60 pour donner les minutes."
            },
            {
              question: "Pourquoi la droite de proportionnalité doit-elle obligatoirement s'ancrer à (0,0) ?",
              answer: "Parce que le rapport entre tes deux coefficients doit être constant. S'il y a un décalage de départ (par exemple un forfait fixe), multiplier les quantités ne se répercutera pas de façon linéaire sur le total."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une voiture file à une allure constante de 80 km/h. Elle doit franchir 200 km de plaine. Combien de temps va prendre le voyage ?",
              options: [
                "2h20 minutes",
                "2,5 heures (soit 2h30)",
                "3,15 heures"
              ],
              correctAnswer: 1,
              explanation: "Top ! J'applique la trinité du triangle : T = D / V. Donc T = 200 / 80 = 2,5. Le 2.5 décimal se traduit civilement en 2h30."
            },
            {
              question: "Je veux acheter 8 stylos au magasin. L'énoncé indique que 3 stylos similaires font 4,50 €. Quel produit en croix résout le point d'interrogation ?",
              options: [
                "(8 × 4,50) ÷ 3",
                "(3 × 8) ÷ 4,50",
                "(4,50 ÷ 8) × 3"
              ],
              correctAnswer: 0,
              explanation: "Exact ! Si j'improvise le tableau, la diagonale pleine combine le 8 et le prix unitaire de 4.5. On les multiplie (36) et on divise par le solitaire restant (3). Tarif : 12€."
            },
            {
              question: "La vitesse d'un ballon est de 10 m/s. Quel est son équivalent en km/h ?",
              options: [
                "10 / 3,6 = 2,7 km/h",
                "10 × 3,6 = 36 km/h",
                "100 km/h"
              ],
              correctAnswer: 1,
              explanation: "Génial ! Pour passer des m/s à l'allure routière des km/h, on multiplie par le pont magique des 3,6 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je ne masquerai jamais d'opérations temporelles sans avoir préalablement converti les minutes en échelle décimale.",
            "Je vérifierai l'ordre de grandeur de mes calculs physiques pour éviter les aberrations de copies.",
            "Je garderai en mémoire le squelette du triangle d'or V = D / T."
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

export default Course_College_4eme_07_Proportionnalite;
