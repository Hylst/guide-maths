import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner, FormulaBox
} from '../../components/SharedUI';
import { BarChart3, PieChart, Table, TrendingUp, HelpCircle } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_6eme_10_Gestion_Donnees: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Live State for the Interactive Chart builder
  const [foot, setFoot] = useState(15);
  const [tennis, setTennis] = useState(10);
  const [judo, setJudo] = useState(8);

  const totalVotes = foot + tennis + judo;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-10"
        title="Gestion de Données"
        subtitle="Transformer le Chaos des chiffres en Dessins Parfaits"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Proportionnalité (savoir lire un tableau simple)", "Opérations de base (additions)"]}
        objectives={[
          "Lire et extraire les informations d'un tableau à Double Entrée.",
          "Lire un Diagramme en Bâtons (ou Barres).",
          "Interpréter un Diagramme Circulaire (Le Camembert).",
          "Construire son propre Graphique Cartésien (L'évolution courbe)."
        ]}
      />

      <Section title="🌟 Introduction : Le Bureau du Maire" icon="📊" color="slate">
        <p>
          Imagine que le maire de ta ville te tende un grand sac poubelle contenant 5 000 petits papiers gribouillés indiquant l'âge et le sport préféré de chaque habitant. C'est le <strong>Chaos Total</strong>. Si tu lui lisais les lignes une par une, il s'endormirait ou te jetterait de son bureau !
        </p>
        <p className="mt-4">
          La Gestion de Données, c'est l'art d'utiliser des <strong>Tableaux ordonnés</strong> et des <strong>Dessins Géométriques intelligents</strong> pour qu'en UNE SEULE seconde de regard, le maire comprenne l'essentiel : "Oh ! 70% de ma ville adore le skateboard ! Vite, construisons un skatepark !". C'est de la magie visuelle au service des décisions.
        </p>
      </Section>

      {/* INTERACTIVE APPLET : LES COMPTEURS DE SPORTS */}
      <Section title="🛠️ Le Laboratoire : Crée ton propre Diagramme en Bâtons !" icon="BarChart3" color="indigo">
        <p className="mb-6">
          Modifie les effectifs de notre mini-enquête sportive avec les boutons ci-dessous. Vois comment le tableau et le dessin en bâtons SVG s'adaptent et s'agrandissent en temps réel !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-indigo-50/50 dark:bg-indigo-900/10 p-6 md:p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/50">
          <div className="md:col-span-5 space-y-6">
            <h4 className="font-bold text-indigo-950 dark:text-indigo-200">Enquête : Sport préféré des élèves</h4>
            
            {/* Control sports */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">⚽ Football :</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setFoot(prev => Math.max(2, prev - 1))}
                    className="w-8 h-8 rounded-full bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-850 dark:hover:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-bold flex items-center justify-center transition-all shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-indigo-700 dark:text-indigo-300">{foot}</span>
                  <button 
                    onClick={() => setFoot(prev => Math.min(25, prev + 1))}
                    className="w-8 h-8 rounded-full bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-850 dark:hover:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-bold flex items-center justify-center transition-all shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">🎾 Tennis :</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setTennis(prev => Math.max(2, prev - 1))}
                    className="w-8 h-8 rounded-full bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-850 dark:hover:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-bold flex items-center justify-center transition-all shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-indigo-700 dark:text-indigo-300">{tennis}</span>
                  <button 
                    onClick={() => setTennis(prev => Math.min(25, prev + 1))}
                    className="w-8 h-8 rounded-full bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-850 dark:hover:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-bold flex items-center justify-center transition-all shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">🥋 Judo :</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setJudo(prev => Math.max(2, prev - 1))}
                    className="w-8 h-8 rounded-full bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-850 dark:hover:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-bold flex items-center justify-center transition-all shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-indigo-700 dark:text-indigo-300">{judo}</span>
                  <button 
                    onClick={() => setJudo(prev => Math.min(25, prev + 1))}
                    className="w-8 h-8 rounded-full bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-850 dark:hover:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-bold flex items-center justify-center transition-all shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-100/40 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200/40 text-center">
              <span className="text-sm font-medium text-indigo-950 dark:text-indigo-200">
                Effectif total interrogé : <strong className="font-mono text-base text-indigo-600 dark:text-indigo-400">{totalVotes} élèves</strong>
              </span>
            </div>
          </div>

          <div className="md:col-span-7 flex justify-center bg-card dark:bg-black/30 rounded-3xl border border-indigo-100/50 p-6 relative">
            {/* Draw Bar Chart in SVG */}
            <svg width="100%" height="240" viewBox="0 0 300 200" className="max-w-xs">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="40" y2="160" stroke="#aaa" strokeWidth="2" />
              <line x1="40" y1="160" x2="280" y2="160" stroke="#aaa" strokeWidth="2" />
              
              <line x1="35" y1="110" x2="280" y2="110" stroke="#eee" strokeWidth="1" strokeDasharray="3,3" />
              <text x="25" y="114" fontSize="10" fontFamily="monospace" textAnchor="end" fill="#888">10</text>

              <line x1="35" y1="60" x2="280" y2="60" stroke="#eee" strokeWidth="1" strokeDasharray="3,3" />
              <text x="25" y="64" fontSize="10" fontFamily="monospace" textAnchor="end" fill="#888">20</text>

              {/* Bar 1 (Football) */}
              <rect 
                x="65" 
                y={160 - (foot * 5)} 
                width="40" 
                height={foot * 5} 
                fill="#818cf8" 
                rx="6" 
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
              <text x="85" y="180" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#6c757d">Foot</text>
              <text x="85" y={150 - (foot * 5)} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle" fill="#4f46e5" className="transition-all duration-300">{foot}</text>

              {/* Bar 2 (Tennis) */}
              <rect 
                x="130" 
                y={160 - (tennis * 5)} 
                width="40" 
                height={tennis * 5} 
                fill="#34d399" 
                rx="6" 
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
              <text x="150" y="180" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#6c757d">Tennis</text>
              <text x="150" y={150 - (tennis * 5)} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle" fill="#10b981" className="transition-all duration-300">{tennis}</text>

              {/* Bar 3 (Judo) */}
              <rect 
                x="195" 
                y={160 - (judo * 5)} 
                width="40" 
                height={judo * 5} 
                fill="#f59e0b" 
                rx="6" 
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
              <text x="215" y="180" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#6c757d">Judo</text>
              <text x="215" y={150 - (judo * 5)} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle" fill="#b45309" className="transition-all duration-300">{judo}</text>
            </svg>
          </div>
        </div>
      </Section>

      <Section title="1. Le Tableau à Double Entrée (Le Croisement Laser)" icon="Table" color="indigo">
        <p className="mb-4 font-medium leading-relaxed">
          Un tableau à double entrée permet de lier deux informations différentes sur la même population (par exemple : le sport favori et le genre d'un enfant).
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-indigo-900 dark:text-indigo-200">Exemple : Inscrits au Club Omnisports de la Ville</h3>
           <div className="bg-card dark:bg-black/40 p-2 rounded-xl shadow border border-indigo-100 w-full max-w-2xl overflow-x-auto">
             <table className="border-collapse w-full text-center text-sm font-mono">
               <thead>
                 <tr>
                   <th className="border p-3 bg-slate-100 dark:bg-slate-800"></th>
                   <th className="border p-3 font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/30">⚽ Football</th>
                   <th className="border p-3 font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30">🎾 Tennis</th>
                   <th className="border p-3 font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30">🥋 Judo</th>
                   <th className="border p-3 font-black text-rose-500 bg-rose-50 dark:bg-rose-900/30">TOTAL (Rangée)</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <th className="border p-3 font-bold text-indigo-700 bg-indigo-50/30 dark:bg-indigo-900/30">Filles</th>
                   <td className="border p-3 font-bold">12</td>
                   <td className="border p-3 bg-yellow-50 dark:bg-yellow-950/20 font-extrabold text-indigo-700 dark:text-indigo-300">25</td>
                   <td className="border p-3 font-bold">30</td>
                   <td className="border p-3 font-black text-rose-500">67</td>
                 </tr>
                 <tr>
                   <th className="border p-3 font-bold text-indigo-700 bg-indigo-50/30 dark:bg-indigo-900/30">Garçons</th>
                   <td className="border p-3 font-bold">45</td>
                   <td className="border p-3 font-bold">15</td>
                   <td className="border p-3 font-bold">20</td>
                   <td className="border p-3 font-black text-rose-500">80</td>
                 </tr>
                 <tr className="bg-slate-100/50 dark:bg-slate-900/50">
                   <th className="border p-3 font-black text-rose-500">TOTAL (Sport)</th>
                   <td className="border p-3 font-black text-rose-500">57</td>
                   <td className="border p-3 font-black text-rose-500">40</td>
                   <td className="border p-3 font-black text-rose-500">50</td>
                   <td className="border p-3 font-black text-indigo-600 dark:text-indigo-400 text-lg">147</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="mt-6 w-full space-y-4">
             <InfoBlock type="info" title="Où se cache la cible ? L'intersection laser">
               Regarde le nombre <strong>25</strong> sur fond jaune. En remontant verticalement, tu lis sa colonne : <strong>Tennis</strong>. En tirant à gauche horizontalement, tu lis sa ligne : <strong>Filles</strong>. On sait donc de façon immédiate qu'il y a 25 filles inscrites au tennis.
             </InfoBlock>
             
             <InfoBlock type="warning" title="La règle de contrôle suprême des Totaux">
               Dans un tableau à double entrée, la case en bas à droite (<strong>147</strong>) est le gardien du temple. Qu'on additionne les totaux horizontaux (67 + 80 = 147) ou les totaux verticaux (57 + 40 + 50 = 147), le résultat doit être EXACTEMENT le même. Sinon, le tableau comporte une erreur !
             </InfoBlock>
           </div>
        </div>
      </Section>

      <Section title="2. Les Trois Formes de l'Art Visuel" icon="PieChart" color="emerald">
        <p className="mb-6 font-medium leading-relaxed">
          Pour frapper l'esprit d'un public en un battement de cil, on remplace le tableau par des dessins géométriques normalisés.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-5 rounded-2xl border-t-8 border-emerald-400 shadow-sm">
             <div className="flex justify-center mb-4 text-emerald-600 dark:text-emerald-400"><BarChart3 size={40} /></div>
             <h4 className="font-bold text-lg mb-1 text-center">Le Diagramme en Bâtons</h4>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
               <strong>Pour comparer des effectifs par catégorie.</strong><br/>
               Chaque barre représente un groupe de données distinct (Chiens, Chats, Lapins). La hauteur de chaque bâton est proportionnelle au nombre d'individus ou d'éléments.
             </p>
           </div>
           
           <div className="bg-rose-50/50 dark:bg-rose-900/10 p-5 rounded-2xl border-t-8 border-rose-400 shadow-sm">
             <div className="flex justify-center mb-4 text-rose-600 dark:text-rose-400"><PieChart size={40} /></div>
             <h4 className="font-bold text-lg mb-1 text-center">Le Diagramme Circulaire</h4>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
               <strong>Pour voir la répartition d'un tout (100%).</strong><br/>
               Appelé familièrement "camembert", le disque entier correspond à 100% de la population. Une part correspond à un pourcentage. Un demi-disque vaut 50% !
             </p>
           </div>

           <div className="bg-sky-50 dark:bg-sky-900/10 p-5 rounded-2xl border-t-8 border-sky-400 shadow-sm">
             <div className="flex justify-center mb-4 text-sky-600"><TrendingUp size={40} /></div>
             <h4 className="font-bold text-lg mb-1 text-center">La Courbe Temporelle</h4>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
               <strong>Pour suivre une évolution au fil du temps.</strong><br/>
               On place le temps en bas (Lundi, Mardi...) et la grandeur en vertical (température, ventes). On place les points puis on les relie à la règle de manière stricte.
             </p>
           </div>
        </div>
      </Section>

      <Section title="✍️ Exercices Résolus : Deviens un Expert de l'Analyse" icon="Table" color="rose">
        <p className="mb-6 font-medium leading-relaxed">
          Entraîne-toi sur ces problèmes classiques d'évaluation de Cycle 3.
        </p>

        <InteractiveExercise 
          title="Exercice 1 : Trouver la Valeur Fantôme d'un Tableau"
          question={<>Trouve la valeur manquante d'un tableau à double entrée. Un club de lecture compte au total 100 enfants. Le total des garçons est de 45. Le nombre total d'inscrits à l'activité 'Théâtre' est de 40, dont 15 sont des garçons. Combien de filles font du Théâtre ?</>}
          steps={[
            <><strong>1. J'isole les informations sur le Théâtre :</strong> On sait que le total d'enfants inscrits au Théâtre est de 40. On y retrouve à la fois des filles et des garçons.</>,
            <><strong>2. J'utilise l'information sur le nombre de garçons :</strong> Parmi les 40 membres du Théâtre, on nous informe qu'il y a exactement 15 garçons.</>,
            <><strong>3. J'écris l'équation logique :</strong><br/>
               Le nombre de filles du Théâtre plus le nombre de garçons de cette même section égalise le total du Théâtre.<br/>
               <MathComponent math="\text{Filles} + 15 = 40" /></>,
            <><strong>4. Je résous par la soustraction :</strong><br/>
               On retire les garçons du groupe total :<br/>
               {"$40 - 15 = 25$"}.<br/>
               <strong>Réponse :</strong> Il y a exactement 25 filles inscrites au Théâtre ! (Remarque : Le total global du club de 100 personnes était une information inutile, un distracteur d'énoncé !).</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Dessiner une part géométrique dans un camembert (Élections de délégués)"
          question={<>Dans une élection de délégué de classe de 6ème, Julie a récolté exactement 25% des voix des 28 élèves. On veut tracer un camembert. Quel angle géométrique (en degrés) doit-on dessiner pour la part de Julie ?</>}
          steps={[
            <><strong>1. Je comprends la proportion représentée par Julie :</strong> Elle a obtenu 25% des voix. C'est synonyme d'un quart du gâteau total.</>,
            <><strong>2. Je connais l'angle total d'un cercle entier :</strong> Une rotation complète sur un cercle mesure exactement 360° (un tour complet de compas).</>,
            <><strong>3. Je calcule l'angle correspondant à un quart (25%) :</strong><br/>
               On applique la formule de proportionnalité de l'angle :<br/>
               <MathComponent math="\text{Angle} = 360 \times \frac{25}{100}" /><br/>
               C'est-à-dire : <MathComponent math="360 \div 4 = 90^\circ" /></>,
            <><strong>4. Conclusion :</strong> On doit dessiner un angle de <strong>90 degrés (un angle droit parfait !)</strong> à l'aide de notre rapporteur pour tracer proprement la part de Julie.</>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="Layers" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Où se place l'axe des temps et des dates dans le graphique cartésien d'évolution ?</>}
            back={<><strong>Toujours sur l'axe HORIZONTAL (en bas) !</strong><br/>L'axe horizontal représente la variable contrôlée comme le temps ou les catégories (les Abscisses). L'axe vertical est pour les hauteurs ou la météo (les Ordonnées).</>}
          />
          <Flashcard 
            front={<>Le diagramme semi-circulaire (le demi-camembert) représente au total quel pourcentage d'un ensemble de données ?</>}
            back={<><strong>100% !</strong><br/>Attention de ne pas te faire surprendre. Même si le camembert n'est qu'un demi-cercle (commun dans les assemblées politiques), sa surface totale correspond toujours à la totalité (100%) d'élèves ou de votes interrogés.</>}
          />
          <Flashcard 
            front={<>Que doit-on impérativement utiliser pour placer nos points sur un graphe ?</>}
            back={<><strong>Des petites croix (+) !</strong><br/>En géométrie, on trace de fines croix soignées au crayon pour désigner les coordonnées. Ne trace jamais de gros pâtés ronds d'encre qui cachent la grille.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="HelpCircle" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence entre un graphique et un tableau ?",
              answer: "Un tableau présente des chiffres précis et complets, utiles pour la rigueur. Un graphique présente un dessin visuel immédiat, beaucoup plus facile et rapide à analyser pour l'œil humain."
            },
            {
              question: "Puis-je relire l'effectif exact d'un groupe sur un diagramme circulaire ?",
              answer: "Seulement si le pourcentage ou le chiffre d'effectif est écrit à l'encre noir à côté, ou si tu fais le calcul sur ton cahier. Le diagramme circulaire montre seulement des proportions (des parts), pas les vraies valeurs."
            },
            {
              question: "Si j'ai des traits obliques reliant mes croix à la règle sur mon tracé d'évolution, cela veut-il dire que la valeur progresse en ligne droite ?",
              answer: "Non ! C'est une simplification géométrique pour guider l'œil du chercheur. On ne sait pas ce qui se passe précisément entre deux prises de mesure (par exemple, entre lundi à 10° et mardi à 15°)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="Layers" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans le mot : Graphique CARTÉSIEN, de quel mathématicien s'inspire ce nom ?",
              options: [
                "Albert Einstein",
                "René Descartes (mathématicien et philosophe français)",
                "Isaac Newton"
              ],
              correctAnswer: 1,
              explanation: "Félicitations ! C'est en l'honneur de René Descartes, qui a introduit le repérage à l'aide de coordonnées et de deux axes perpendiculaires."
            },
            {
              question: "Quel graphique est l'idéal pour voir progresser les températures de ma ville mois après mois ?",
              options: [
                "Un diagramme à barres épaisses",
                "Un diagramme circulaire",
                "Un graphique cartésien (courbe linéaire au fil du temps)"
              ],
              correctAnswer: 2,
              explanation: "Excellent ! Pour suivre toute évolution par rapport au temps, la courbe cartésienne linéaire reste la reine absolue."
            },
            {
              question: "Une part de 10% dans un diagramme circulaire complet (360°) se dessine avec quel angle ?",
              options: [
                "36 degrés (10% de 360)",
                "10 degrés d'ouverture",
                "90 degrés"
              ],
              correctAnswer: 0,
              explanation: "Parfait ! 10% de l'angle d'un cercle entier (360°) est égal à 360 × 10/100 = 36°. Tu as maîtrisé le rapporteur !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais extraire n'importe quelle cellule au croisement d'un tableau à double entrée.",
            "Je sais que l'axe horizontal désigne les abscisses (le temps) et l'axe vertical les ordonnées.",
            "Je sais lire un diagramme circulaire ou en bâtons pour comparer les effectifs."
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

export default Course_College_6eme_10_Gestion_Donnees;
