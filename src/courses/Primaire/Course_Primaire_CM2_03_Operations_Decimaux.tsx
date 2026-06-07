import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { AlignRight, Asterisk, Target, MoveHorizontal, Sparkles } from 'lucide-react';

const Course_Primaire_CM2_03_Operations_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [alignment, setAlignment] = useState<'right' | 'comma'>('comma');

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM2-03"
        title="Opérations sur les Décimaux"
        subtitle="additionner, soustraire et multiplier avec la Virgule Mortelle"
        duration="45min"
        level="CM2"
        prerequisites={["Addition et Soustraction posées", "Lire un nombre à Virgule"]}
        objectives={[
          "Aligner La Virgule au centre de gravité.",
          "Gérer Le Vide avec les Zéros Fantômes.",
          "Placer la Virgule à la fin d'une Multiplication de Boss."
        ]}
      />

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : Le secret des prix et des chronomètres
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          As-tu déjà remarqué que les prix au supermarché ou les temps de chronométrage ne sont presque jamais des nombres ronds ? On dit qu'une pizza coûte <strong>5,50 €</strong> ou qu'un athlète court le 100m en <strong>9,58 secondes</strong>.
          Ces nombres avec une virgule sont formés d'une partie entière complète et de petits morceaux restants. Aujourd'hui, tu vas apprendre à apprivoiser ces nombres pour pouvoir faire des additions stellaires, des soustractions sans piège et même des multiplications dignes des plus grands savants ! Aligne tes chiffres et prépare tes méninges !
        </p>
      </div>

      <Section title="1. La Sainte Loi de L'Addition décimale (Le Paratonnerre)" icon="AlignRight" color="blue">
        <p className="mb-4">Tu te souviens du Mur de Droite au CE1 ? Quand on a une virgule... C'EST FINI ! Le Mur de droite a explosé.</p>
        
        <TipBanner title="L'Alignement PAR LA VIRGULE" type="warning">
           On n'aligne PLUS les nombres sur la droite. <strong>ON ALIGNE LES VIRGULES L'UNE SOUS L'AUTRE !</strong> (Comme un grand fil invisible qui tombe du ciel).
        </TipBanner>

        {/* Interactive Alignment Lab */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-slate-900/30 dark:to-slate-950 border border-indigo-100 dark:border-indigo-950 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Laboratoire d'Alignement : Glisse la Virgule</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6">Tente d'aligner la somme verticale au mur ou à la virgule pour comprendre le désastre.</p>

          <div className="flex flex-col sm:flex-row gap-2.5 mb-6 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
            <button
              onClick={() => setAlignment('right')}
              className={`w-full sm:w-auto px-4 py-2.5 text-xs font-black rounded-xl border transition-all ${
                alignment === 'right'
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-250 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Aligner à DROITE (Faux ❌)
            </button>
            <button
              onClick={() => setAlignment('comma')}
              className={`w-full sm:w-auto px-4 py-2.5 text-xs font-black rounded-xl border transition-all ${
                alignment === 'comma'
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-250 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Aligner par la VIRGULE (Merveilleux ✅)
            </button>
          </div>

          <div className="w-full max-w-sm bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-755 shadow-sm transition-all duration-500">
            <div className="font-mono text-3xl font-bold tracking-[0.25em] text-slate-700 dark:text-slate-200 select-none pb-4 border-b-2 border-slate-200 dark:border-slate-700 relative">
              
              {/* Vertical alignment line laser */}
              {alignment === 'comma' && (
                <div className="absolute left-[108px] top-0 bottom-0 border-l-2 border-emerald-500 border-dashed animate-pulse" />
              )}

              {/* Number 1: 24.5 */}
              <div className="flex justify-end pr-8 transition-transform duration-500" style={{ transform: alignment === 'right' ? 'translateX(0px)' : 'translateX(-22px)' }}>
                <span>24,5</span>
                <span className={`text-emerald-500 font-extrabold transition-opacity duration-300 ${alignment === 'comma' ? 'opacity-100' : 'opacity-0'}`}>0</span>
              </div>

              {/* Number 2: 3.12 */}
              <div className="flex justify-end pr-8 mt-2 transition-transform duration-500">
                <span className="text-slate-400 mr-auto text-xl">+</span>
                <span>3,12</span>
              </div>
            </div>

            {/* Total Result */}
            <div className="font-mono text-3xl font-black text-right pr-8 mt-3 select-none">
              {alignment === 'right' ? (
                <div className="text-rose-500 line-through tracking-[0.25em]">2,762</div>
              ) : (
                <div className="text-emerald-500 dark:text-emerald-400 tracking-[0.25em] flex justify-end">
                  <span>27,62</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mt-4 text-center">
            {alignment === 'right' ? (
              <p className="text-xs font-bold text-rose-500">
                🚨 Catastrophe ! Tu ajoutes des Unités simples (3) avec des Dixièmes (5) d'un autre nombre. C'est totalement interdit !
              </p>
            ) : (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                🌟 Parfait ! Les unités (4 et 3) sont bien sous les unités. Le Zéro Fantôme comble le vide à côté du 5.
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section title="2. La Soustraction et Le Piège du Vide !" icon="Target" color="rose">
        <p className="mb-4">Si le Boss du haut est plus court que celui du bas, un piège immense t'attend.</p>

        <div className="bg-slate-50 dark:bg-slate-900/40 p-5 sm:p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-6">
           <h4 className="text-rose-900 dark:text-rose-300 font-bold text-base md:text-lg mb-4 font-sans">Le Calcul de la Mort : 15 - 3,24</h4>
           <div className="flex flex-col md:flex-row gap-6 mt-4">
             <div className="flex-1 bg-red-50/40 dark:bg-rose-950/10 p-4 rounded-2xl border border-red-100 dark:border-rose-950/20 font-mono">
               <p className="text-red-500 font-sans font-bold text-sm mb-2">❌ FAUX : J'abaisse juste le 24...</p>
               <pre className="text-xs sm:text-sm overflow-x-auto p-3 bg-red-100/30 dark:bg-red-950/25 rounded-xl text-red-750 dark:text-red-300 leading-relaxed font-mono">  15,  
-  3,24
-------
  12,24 ❌

(Erreur classique : descendre le 24 sans faire de calcul !)</pre>
             </div>
             <div className="flex-1 bg-emerald-50/40 dark:bg-emerald-950/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-950/20 font-mono">
               <p className="text-emerald-600 dark:text-emerald-400 font-sans font-bold text-sm mb-2">✅ CORRECT : Le Gardien Zéro !</p>
               <pre className="text-xs sm:text-sm overflow-x-auto p-3 bg-emerald-100/30 dark:bg-emerald-950/25 rounded-xl text-emerald-800 dark:text-emerald-300 leading-relaxed font-mono">  15,<span className="text-emerald-500 font-extrabold">00</span>
-  3,24
-------
  11,76 ✅

(Nécessite d'écrire les zéros fantômes pour calculer 0 - 4 avec retenues !)</pre>
             </div>
           </div>
        </div>
      </Section>

      <Section title="3. La Multiplication : Oublie la Virgule (Au Début) !" icon="Asterisk" color="amber">
        <p className="mb-4">La Multiplication ne respecte PAS la Virgule ! Au début du calcul... On Fait comme si la virgule N'EXISTAIT PAS DU TOUT. Aucun alignement !!</p>

        <InteractiveExercise 
          title="Calcul Ninja : 2,4 x 3,1 !"
          question={<>Comment faire ce monstre sans faire planter ton Cerveau ?</>}
          steps={[
            <><strong>1. L'Anarchie du placement :</strong> On pose le calcul NORMLEMENT avec le prmier Mur de droite du CE1. Je ne regarde meme pas ou est la virgule ! Elle n'existe pas ! Le 4 est au dessus du 1.</>,
            <><strong>2. L'Enorme Calcul :</strong> Je fais ma super muliplication comme d'habitude. (Un gros nombre avec plein de retenues). Resultat brut : <strong>744</strong> (Sans Virgule !).</>,
            <><strong>3. Le Jugement Final (Le Comptage) ✨ :</strong> Je retourne regarder L'Ennoncé Original. Dans "2,4", j'ai <strong>1 Chiffre apres la virgule.</strong> Dans "3,1", j'ai <strong>1 Autre chiffre apres la virgule</strong>.<br/>Total = <strong>2 CHIFFRES APRÈS LA VIRGULE (Au total !)</strong>.</>,
            <><strong>4. L'Épée Tranchante :</strong> Je prend mon grots "744". Et en partant de la droite tout à la fin, je recule <strong>de 2 Case (Le total trouvé)</strong>. BamBam. La virgule tape. Resultat Ultime = <strong>7,44 !</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans l'Addition Posée avec les Virgules, doit-on ABSOLUMENT aligner les nombres sur le Mur De Droite !!?</>}
            back={<><strong>NON !! Le Mur de Droite est Mort !!</strong><br/>On doit aligner STRICTEMENT Les Virgules les unies en dessous des Autres. La Virgule est le Piquet Inboulonnable du millieu.</>}
          />
          <Flashcard 
            front={<>Dans la Mulpticaltion Posé, je fais quoi de la virgule ? Je l'aligne aussi la Virgule ??</>}
            back={<><strong>NON !!! C'est la loi Inverse paroxysmale !!!</strong><br/>Tu t'en fou de la virgule. Tu aligne Normlement tout a  doite. Tu muliplies. Et paf TOUT A LA FIN de toute ta vis. Tu comptes Les virgules dans l'énnonces et le reporte ne bas !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quelle est La Plus Grave et Terrifiante Ereeur dans cette Soustraction : ( 12 - 5,8 ) = ?",
              options: [
                "De mettre le 12 en Haut, il est plus petit (Non, 12 est le Boss).",
                "D'aligner les virgules.",
                "D'oublier de Rallonger (12) en LUI METTANT SES ZÉRO (12,0) pour Pouvoir Soustraire son Vide Contre le (,8) !  La fameus Retenue !"
              ],
              correctAnswer: 2,
              explanation: "Top ! Si tu as laisses Du Vide en Haut ! L'élève abaisse le (,8) directemment au lieu de faire (10 - 8 = 2). Et il met Faux et a zero de moyen !!  RÈGLE : COMBLEZ LE VIDE PAR DES ZÉROS en HAUT !."
            },
            {
              question: "Si muliplication [ 1,51 (A) x 3,2 (B) ] : Combien de sauts arrières de la virgule sur le resultat Final ???",
              options: [
                "1 Saut.",
                "3 Sauts (Il y a 2 chiffres après dans A , Et 1 chiffre dans B... C'est la Team totale de 3 !!! ).",
                "La virgule explose."
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! C'est ca. On comptes le TOTAL Aboslut de l'enonce des tous les chifferes Apres ! (Le '51' = 2), Le ('2') = 1 . ==> 3 . Donc ton resulat fera 3 Sauts a l'envers  = 4,832 !"
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

export default Course_Primaire_CM2_03_Operations_Decimaux;
