import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Scaling, Percent, BarChartHorizontal, BadgePercent, Sparkles } from 'lucide-react';

const Course_Primaire_CM2_07_Proportionnalite_et_Pourcentages: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [price, setPrice] = useState<number>(80);
  const [discount, setDiscount] = useState<number>(25);

  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM2-07"
        title="Proportionnalité et Pourcentages"
        subtitle="Devenir le banquier des Réductions et l'Architecte de l'Échelle"
        duration="45min"
        level="CM2"
        prerequisites={["Multpliciation en CM1 (Tableau de proportionnalité)"]}
        objectives={[
          "Maitriser le Coefficient de Proportionnalité (La Ligne de Pouvoir X).",
          "Calculer une Promo de 50% ou 25%.",
          "Comprendre 'L'Echelle' (Rapprecir une Maison pour une carte)."
        ]}
      />

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Le super-pouvoir de la régularité
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          Imagine que tu veuilles préparer une délicieuse recette de crêpes pour 4 personnes, mais que vous soyez finalement 12 gourmands à table. Comment savoir combien d'œufs et de farine rajouter sans tout rater ?
          Ou alors, imagine que tu repères un magnifique sweat-shirt à 40 € en magasin, avec une étiquette affichant -50% ! Comment calculer ton économie en un quart de seconde ?
          C'est ici qu'interviennent la <strong>Proportionnalité</strong> et les <strong>Pourcentages</strong>. Ce sont de fantastiques outils mathématiques qui augmentent, réduisent et adaptent les nombres de façon juste et ordonnée. Équipe-toi de ta règle magique, et en route pour les calculs de boss des mathématiques !
        </p>
      </div>

      <Section title="1. Le Coefficent de l'Alpha/Omega (Proportion)" icon="Scaling" color="blue">
        <p className="mb-4">Au CM1, on avait un tableau et on faisait "Ah tiens on double !" Mais le CM2 est mathématique. On chercher <strong>LE COEFFICIENT MAGIQUE ! (L'Arme de Multiplication)</strong></p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-4 sm:p-6 rounded-[2rem] border border-sky-200 dark:border-sky-900/40 shadow-sm mb-6 font-mono overflow-hidden">
           <h3 className="font-bold text-center text-sky-800 dark:text-sky-300 font-sans mb-4 text-sm sm:text-base">Le Marché des Poireaux : Le Tableau CM2</h3>
           
           <div className="w-full overflow-x-auto pb-4 pt-2">
             <div className="flex gap-4 justify-center items-center min-w-[340px] px-2">
               <div className="w-8"></div>
               <table className="border-collapse bg-card text-center shadow-lg w-full max-w-sm">
                  <tbody>
                    <tr>
                      <td className="border p-3 font-bold bg-slate-100 dark:bg-slate-900 text-xs sm:text-sm">Poids (kg)</td>
                      <td className="border p-3 text-xs sm:text-sm">2</td>
                      <td className="border p-3 text-xs sm:text-sm">5</td>
                      <td className="border p-3 text-xs sm:text-sm">10</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-bold bg-amber-50/50 dark:bg-amber-900/20 text-xs sm:text-sm">Prix (Euros)</td>
                      <td className="border p-3 font-extrabold text-amber-600 dark:text-amber-400 text-xs sm:text-sm">6</td>
                      <td className="border p-3 font-extrabold text-amber-600 dark:text-amber-400 text-xs sm:text-sm">15</td>
                      <td className="border p-3 font-extrabold text-amber-600 dark:text-amber-400 text-xs sm:text-sm">30</td>
                    </tr>
                  </tbody>
               </table>
               <div className="flex flex-col gap-2 relative w-12 h-16 shrink-0">
                 <div className="bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded-full text-[10px] sm:text-xs transform -rotate-12 absolute -left-2 top-0">x 3 !</div>
                 <div className="bg-sky-500 text-white font-extrabold px-2 py-0.5 rounded-full text-[10px] sm:text-xs transform -rotate-12 absolute -left-2 bottom-0">/ 3 !</div>
               </div>
             </div>
           </div>

           <div className="mt-8 bg-sky-100 dark:bg-sky-800 p-4 rounded text-sm font-sans">
             <h4 className="font-bold text-sky-800 dark:text-sky-100">Le Coefficient Multiplicateur (La Clef) !</h4>
             <p className="mt-1">Demande-toi : Comment passer de [2] kg à [6] Euros en MULTIPLIANT par le Pouvoir Absolu ? (En 6 combien 2! c'est la Division!).  6 / 2 = <strong>3 !</strong>.</p>
             <p className="font-bold text-rose-600 dark:text-rose-400 mt-2">Le Coefficient de l'univer de ce tableau C'est "Fois 3".</p>
             <p>Pour passer de Ligne du Haut ➡️ Ligne du Bas = (x 3).</p>
             <p>Pour passer Ligne Du Bas ➡️ Retour dans le temps Ligne de Haut = (Diviser par 3).</p>
           </div>
        </div>
      </Section>

      <Section title="2. Les Pourcentages (%) - La Magie des Supermarchés" icon="Percent" color="rose">
        <p className="mb-4">Ce sympole (%) fait si peurs aux adultes, mais il est ridiculemennt facile. TIENT TOI BIEN : Le % c'est Une Forme d'Ecriture De La Fraction " SUR CENT ( / 100 ) " !</p>

        <TipBanner title="Le Demasquage absolu !" type="warning">
           Quand On écris <strong>"50 %"</strong>.. Ca Veut litérallemnt de <strong>"La Fraction : 50 / 100 " (Cinquante MORCEAU SUR UNE GROSEE BOX DE 100) !</strong>
        </TipBanner>

        {/* Dynamic Discount Simulator Laboratory */}
        <div className="bg-gradient-to-br from-rose-50/50 to-slate-50 dark:from-slate-900/40 dark:to-slate-950 border border-rose-150/40 dark:border-rose-950 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Le Simulateur de Mégas Soldes</h4>
          </div>

          <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Left sliders control */}
            <div className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">
                  1. Choisis le Prix de départ : <span className="text-rose-600 font-mono text-sm">{price} €</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-500 dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">
                  2. Choisis ta réduction (%) : <span className="text-rose-600 font-mono text-sm">{discount} %</span>
                </label>
                <div className="flex gap-2.5 mt-2 flex-wrap">
                  {[10, 25, 50, 75, 100].map((v) => (
                    <button
                      key={v}
                      onClick={() => setDiscount(v)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                        discount === v
                          ? 'bg-rose-500 border-rose-500 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {v === 25 ? '25% (un Quart)' : v === 50 ? '50% (Moitié)' : `${v}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2">
                <h5 className="font-extrabold text-xs text-slate-850 dark:text-slate-200">Facture décryptée :</h5>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-mono space-y-1 font-bold">
                  <div>Remboursement de la promo : <span className="text-emerald-500">{discountAmount.toFixed(2)} €</span></div>
                  <div>Nouveau prix final : <span className="text-indigo-600 dark:text-indigo-400">{finalPrice.toFixed(2)} €</span></div>
                </div>
              </div>
            </div>

            {/* Right SVG visualization: Interactive Price Tag */}
            <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl relative overflow-hidden">
              <svg viewBox="0 0 160 160" className="w-32 h-32 select-none">
                {/* Standard Price Tag shape */}
                <polygon points="10,40 40,10 150,10 150,150 10,150" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                
                {/* Ribbon Hole of the tag */}
                <circle cx="28" cy="28" r="6" fill="#64748b" />
                <circle cx="28" cy="28" r="3" fill="#f1f5f9" />

                {/* Grid-based pie section overlay for sold value */}
                <circle cx="85" cy="85" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="85" cy="85" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={`${((100 - discount) / 100) * 251.2} 251.2`} />
                <circle cx="85" cy="85" r="40" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray={`${(discount / 100) * 251.2} 251.2`} strokeDashoffset={`${-((100 - discount) / 100) * 251.2}`} />

                {/* Discount banner text */}
                <text x="85" y="80" fontSize="14" fontWeight="black" fill="#ef4444" textAnchor="middle">-{discount}%</text>
                <text x="85" y="98" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">RÉDUCTION</text>
              </svg>

              <div className="text-center mt-3">
                <span className="text-xs line-through text-slate-400 mr-2">{price.toFixed(0)}€</span>
                <span className="text-lg font-black text-slate-850 dark:text-slate-100">{finalPrice.toFixed(0)}€ seulement !</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
           <div className="bg-card p-4 rounded shadow border-l-4 border-emerald-500">
             <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Le 50 % (La Moité !)</h4>
             <p className="text-sm mt-1">Si le magasin affiche "-50%". Ca veut dire "Moins la fraction de (50/100)". 50 dans 100... bah c'est pile <strong>LA MOITIE</strong> de la boite ! Une promo de -50% Veut dire <strong>"On te fait payer la MOITIÉ PRIX" (tu DIVISE le prix pas Deux !!).</strong></p>
           </div>
           
           <div className="bg-card p-4 rounded shadow border-l-4 border-amber-500">
             <h4 className="font-bold text-amber-600 dark:text-amber-400">Le 25 % (Le Quart de Pizza)</h4>
             <p className="text-sm mt-1">25 Sur 100 ? (25/100).  100 divisés en morceau de de 25.. C'est le Quart.  Une promo a -25% veut dire ? QU'ON TE Rends ton quart de Pizza. "Divise par 4 !".</p>
           </div>
        </div>
      </Section>

      <Section title="3. L'Échelle de ta Carte (La réduction extreme)" icon="BarChartHorizontal" color="amber">
        <p className="mb-4">Tu ne peux pas placer LA VRAIE TOWER EIFFELL sur ton petit cahier de 10centimetre.. Mais les Matheux l'On Rapetissés avec L'Échelle !</p>

        <InteractiveExercise 
          title="Comprendre l'Echelle 1 / 100 000"
          question={<>La Mairesse te donne une carte. En bas il ya la Marque secrete [Échelle : 1 / 1000]. Qu'est ce qu'elle te cache ?</>}
          steps={[
            <><strong>1. La Loi Numéro 1 de L'échelle :</strong> Toutes les unités de ce monstre SONT EN CENTIMETRE (cm). (Jamais de L , Jamais en metre !).</>,
            <><strong>2. Lire la magique :</strong> 1 / 1000, CA VEUT DIRE : <strong>"Un petit Centimètre Tracé en faux sur mon papier (SUR MA CARTE) ➡️ REPRESENTE 1000 Véritable Enormes Centimètres dans LA VRAIE VIE EXTerieuere !."</strong></>,
            <><strong>3. Résoudre le Trésor :</strong> Ton trait sur ton papier Fait (3 Centimètres).  Dans la vrai vie c'est combien ?. C'est <strong>3 x 1000 (Le Multiplicateur Scale !!!) = 3000 Vraies Centimetres ! (Ce qui fait 30 Mètres !!).</strong></>
          ]}
        />

        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-5 rounded-2xl border-l-4 border-amber-500 mb-6 mt-6">
           <h4 className="font-bold text-amber-900 dark:text-amber-100">C'est juste un Tableau de proportion !</h4>
           <p className="text-sm mt-1">L'echelle, c'est juste un joli nom pour ne pas dire Le "Coefficien Multiplicateur de mon tableau de Carte/Réalité"!</p>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le Monstre Vrai/Faux : "Je voie un jolie Pull dans le Magasin qui coute (100 Euros). Il est promo en [- 50 %] .. Ce qui fait, 100 divisés par 2= Il ne coute Plus que 50 balles !!!" ?</>}
            back={<><strong>VRAI ABSOULU !! </strong><br/> 50 % C'est la moitié Fractionnelle Pile de (100) ! Divisés pa 2 tes prix quand tu vois du 50 % ! C'est la deescente d'Ascenseur la plus belle de la terre.</>}
          />
          <Flashcard 
            front={<>Et la fameuse Promo de " - 100 % !! "" ?  Qu'est ce que ca provoque avec le Caisser ?</>}
            back={<><strong>UNE REDUTION de CADEAUX TOTAL !!! </strong><br/>-100% ca te RETIRE 100% du Prix !!! TU PAYES ZERO ! (Tout le monde cours dans ce magsin maudit !!)</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si j'ai  l'Echelle suivante carte de Chasse : [ 1 / 500 ]. Que representent 2 cm Dessinés de ligne avec ma Règle d'encre ??",
              options: [
                "2 Vrais Centimètres dans le monde Exterieur !",
                "502 Cnetimres ! (2 + 500)",
                "2 x (La Force de 500 !) =  1000 Veritables Giga-Centimètres Sous Le Soleil exterieur ! (Soit 10m !)."
              ],
              correctAnswer: 2,
              explanation: "Top ! La Loi d'Echelle ! 1 Centimetre sur du Papier, represente Le Grooos Chiffre a doite Dans la vie VRAIE ! (Donc 1cm = 500vrai/cm). Si tu fais 2Cm .. ca te fait 1000cm_vrais !"
            },
            {
              question: "Comment je trouve LE POIVIOR ABSOLU (Coefficient) d'Un tableau de proportion d'un Magasin . Pour passer de Ligne-Haut à la Ligne-Bas ?",
              options: [
                "Je Multiplie lles deux cases emsemble.",
                "Je cherche le Nombre Magique Qui (X Muliplié) avec le Chiffre du haut... Fait apparaitres Pile celui d'en dessous !.( C'est en fesant le grand Divisé pas Le poti).",
                "Non je dis nimporte quoi c'est faux c 'et l'addition."
              ],
              correctAnswer: 1,
              explanation: "Top boss !! Si tu as (Poid=2 et Prix=6). Ton cerveaue cherche Le lien Divin '(En 6 y'a combien de 2 )... Bah y a 3 !'.  Le coeff de tout le tableau de la vie sera le magique [* FOIS 3 !]"
            }
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

export default Course_Primaire_CM2_07_Proportionnalite_et_Pourcentages;
