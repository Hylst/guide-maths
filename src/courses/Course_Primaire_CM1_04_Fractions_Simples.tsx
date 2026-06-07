import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { PieChart, Scissors, Tally4, Utensils, HelpCircle, Trophy, Sparkles } from 'lucide-react';

const Course_Primaire_CM1_04_Fractions_Simples: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [den, setDen] = useState<number>(4);
  const [num, setNum] = useState<number>(3);

  // Wedge path helper for circular sector SVG drawings
  const getPieWedgePath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    // If it's a full circle, approximate slightly to avoid arc bugs
    const diff = endAngle - startAngle;
    const adjustedEndAngle = diff >= 360 ? startAngle + 359.99 : endAngle;
    
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (adjustedEndAngle - 90) * Math.PI / 180;
    
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    
    const largeArcFlag = (adjustedEndAngle - startAngle) <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const handleDenChange = (newDen: number) => {
    setDen(newDen);
    if (num > newDen) {
      setNum(newDen);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM1-04"
        title="Les Fractions Simples"
        subtitle="Apprendre à couper une Pizza comme un expert d'Italie"
        duration="45min"
        level="CM1"
        prerequisites={["La Division (Le Partage équitable)"]}
        objectives={[
          "Comprendre ce qu'est une Fraction (Le Nombre du Haut et du Bas).",
          "Lire les mots magiques (Demi, Tiers, Quart).",
          "Comparer une Fraction au chiffre '1' (La Pizza Entière)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Les fractions constituent une véritable révolution conceptuelle : pour la première fois, un nombre n'est plus seulement une quantité entière, mais un rapport de partage. Utilisez au maximum des analogies réelles (partager une pizza, une tarte, ou fendre des barres de chocolat) pour matérialiser le numérateur (ce qu'on prend) et le dénominateur (en combien on coupe). L'abstraction de la fraction viendra plus tard, d'abord le sens !
      </InfoBlock>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : La pizza coupée !
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Jusqu'à maintenant, tu as toujours calculé avec des "nombres entiers" (1, 2, 3, 100...). Des nombres ronds qui indiquent que l'objet est complet. Mais que se passe-t-il si tu as très faim, que tu veux manger de la pizza, mais que tu ne peux pas l'engloutir en entier ? Tu vas la couper en plusieurs parts.
          Manger "une part de pizza", c'est manger un morceau, un bout d'un ensemble. Les mathématiciens ont inventé <strong>les fractions</strong> pour avoir le pouvoir de calculer et d'écrire spécifiquement ces "morceaux" d'objets ou de nombres !
        </p>
      </div>

      <Section title="1. L'Anatomie du Monstre (Numérateur & Dénominateur)" icon={<Scissors className="w-6 h-6" />} color="rose">
        <p className="mb-4">Une fraction sert à couper une chose PARFAITEMENT EN PARTS ÉGALES. (Si tu coupes une plus grosse part pour toi, ça ne marche pas !).</p>
        
        <div className="bg-rose-50/50 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800/60 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center text-rose-900 dark:text-rose-100 flex items-center gap-2 mb-6 text-lg">
             <Sparkles className="w-5 h-5 text-rose-500" />
             La Fraction : {"$\\frac{" + num + "}{" + den + "}$"}
           </h3>
           
           <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
             
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center flex-1 w-full">
               <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Le NUMÉRATEUR (Nuage ☁️ / Haut)</h4>
               <p className="text-4xl font-extrabold my-2 text-emerald-500">{num}</p>
               <p className="text-xs text-slate-500">Nombre de parts que tu MANGE (ou que tu colories).</p>
               
               {/* Numerator slider */}
               <input 
                 type="range" 
                 min="0" 
                 max={den} 
                 value={num} 
                 onChange={(e) => setNum(parseInt(e.target.value, 10))}
                 className="w-full mt-4 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
               />
             </div>

             <div className="h-1 w-full md:w-16 bg-slate-200 dark:bg-slate-800"></div>
             
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center flex-1 w-full">
               <h4 className="font-bold text-sky-600 dark:text-sky-400 text-sm">Le DÉNOMINATEUR (Diable 😈 / Bas)</h4>
               <p className="text-4xl font-extrabold my-2 text-sky-500">{den}</p>
               <p className="text-xs text-slate-500">En combien de parts tu as COUPÉ ta pizza au total.</p>
               
               {/* Denominator selectors */}
               <div className="flex justify-center gap-2 mt-4 flex-wrap">
                 {[2, 3, 4, 6, 8].map((d) => (
                   <button
                     key={d}
                     onClick={() => handleDenChange(d)}
                     className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors ${den === d ? "bg-sky-500 text-white border-sky-500" : "bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300"}`}
                   >
                     / {d}
                   </button>
                 ))}
               </div>
             </div>
           </div>
        </div>

        {/* Dynamic Pizza Slice SVG visualization */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 border border-indigo-100 dark:from-slate-900/40 dark:to-slate-950 dark:border-indigo-900/40 p-6 rounded-[2rem] my-8 shadow-inner flex flex-col items-center">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-4">Aperçu visuel de ton découpage de Pizza :</h4>
          
          <div className="relative w-48 h-48 bg-white dark:bg-slate-850 rounded-full shadow-md flex items-center justify-center border border-slate-100 dark:border-slate-800 overflow-hidden">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {/* Outer stroke of the Pizza crust */}
              <circle cx="100" cy="100" r="88" fill="transparent" stroke="#e2e8f0" strokeWidth="2" />
              
              {/* Generate standard slices of Denominator */}
              {Array.from({ length: den }).map((_, idx) => {
                const angle = 360 / den;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;
                const isEaten = idx < num;

                return (
                  <path
                    key={idx}
                    d={getPieWedgePath(100, 100, 80, startAngle, endAngle)}
                    fill={isEaten ? "url(#pizza-fill)" : "#f8fafc"}
                    stroke={isEaten ? "#f43f5e" : "#cbd5e1"}
                    strokeWidth="2.5"
                    className="transition-all duration-300 dark:fill-opacity-90 cursor-pointer hover:opacity-90"
                  />
                );
              })}
              
              {/* Crust circle line */}
              <circle cx="100" cy="100" r="80" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="3, 3" opacity="0.6" />

              {/* Pizza visual SVG definition fills */}
              <defs>
                <linearGradient id="pizza-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            
            {num === 0 && (
              <div className="absolute inset-0 bg-slate-100/40 dark:bg-slate-900/40 flex items-center justify-center backdrop-blur-[1px]">
                <p className="text-xs text-slate-500 font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-100">La pizza est intacte ! 🍕</p>
              </div>
            )}
          </div>
          
          <p className="text-xs text-slate-500 mt-4 text-center">
            Notre pizza est coupée en {den} parts égales. Tu en as mangé {num}. Il en reste {den - num} !
          </p>
        </div>

        <TipBanner title="L'Astuce pour la Mémoire" type="info">
           <strong>Numérateur = Nuage (C'est en Haut ! ☁️)</strong><br/>
           <strong>Dénominateur = Diable (C'est en Bas ! 😈)</strong>
        </TipBanner>
      </Section>

      <Section title="2. Les Noms Spéciaux (Demi, Tiers, Quart)" icon={<Utensils className="w-6 h-6" />} color="blue">
        <p className="mb-4">Certaines fractions sont tellement utilisées tous les jours qu'elles ont obtenu des surnoms spéciaux, comme des supers héros.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-sky-50 dark:bg-slate-800 p-5 rounded-2xl border-t-8 border-sky-450 shadow text-center">
             <div className="font-bold text-2xl mb-2 flex justify-center gap-1 font-mono">
               <span className="text-sky-500">1</span>
               <span>/</span>
               <span className="text-slate-500">2</span>
             </div>
             <h4 className="font-bold text-lg mb-2">Un Demi</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400">La pizza coupée en 2. C'est la <strong>Moitié</strong> parfaite !</p>
           </div>
           
           <div className="bg-amber-50/50 dark:bg-slate-800 p-5 rounded-2xl border-t-8 border-amber-450 shadow text-center">
             <div className="font-bold text-2xl mb-2 flex justify-center gap-1 font-mono">
               <span className="text-amber-500">1</span>
               <span>/</span>
               <span className="text-slate-500">3</span>
             </div>
             <h4 className="font-bold text-lg mb-2">Un Tiers</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400">La pizza coupée en 3 ! (Très dur à dessiner en vrai).</p>
           </div>

           <div className="bg-emerald-50/50 dark:bg-slate-800 p-5 rounded-2xl border-t-8 border-emerald-450 shadow text-center">
             <div className="font-bold text-2xl mb-2 flex justify-center gap-1 font-mono">
               <span className="text-emerald-500">1</span>
               <span>/</span>
               <span className="text-slate-500">4</span>
             </div>
             <h4 className="font-bold text-lg mb-2">Un Quart</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400">Coupée en 4. L'angle droit du carré. Si je prend "3 Quarts", j'ai mangé presque tout !</p>
           </div>
        </div>
      </Section>

      <Section title="3. L'Ordre Magique (L'Unité = 1)" icon={<PieChart className="w-6 h-6" />} color="amber">
        <p className="mb-4">Est-ce que tu peux manger PLUS qu'une fraction ? Bien sûr ! Le Chiffre '1', c'est l'Unité (La Pizza Entière).</p>

        <InteractiveExercise 
          title="Le Grand Défi : Plus grand ou Plus petit que 1 ?"
          question={<>Comment savoir juste en regardant si tu as mangé Plus, Moins, ou Pile-Poil 1 Pizza entière ?</>}
          steps={[
            <><strong>1. Numérateur === Dénominateur (La Perfection) :</strong> J'ai une fraction <strong>4 / 4</strong>. La pizza est coupée en 4. J'ai mangé 4 parts !! J'ai mangé TOUT. Donc <strong>{"$\\frac{4}{4} = 1$"}</strong> ! Merveille.</>,
            <><strong>2. Numérateur PETIT / Dénominateur GRAND (La Faim) :</strong> Fraction <strong>2 / 5</strong>. Coupé en 5 parts. J'en ai eu que 2 ! J'ai toujours faim... Je n'ai PAS mangé la pizza entière. Donc <strong>{"$\\frac{2}{5} < 1$"}</strong>.</>,
            <><strong>3. Numérateur BALÈZE / Dénominateur PETIT (Le Monstre) :</strong> Fraction <strong>6 / 4</strong>. Pizza coupée en 4. MAIS je veux 6 Parts ! Comment je fais ??? IL FAUT ACHETER UNE DEUXIEME PIZZA !!! Donc <strong>{"$\\frac{6}{4} > 1$"}</strong>.</>
          ]}
        />
      </Section>

      <Section title="4. Quiz & Flashcards" icon={<HelpCircle className="w-6 h-6" />} color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le Monstre Vrai/Faux : "La ligne noire au milieu d'une fraction (Exemple 1 / 4) est juste là pour faire joli" ?</>}
            back={<><strong>FAUX ABSOLU !</strong><br/>Cette barre (la barre de fraction) signifie l'opération DIVISÉ PAR. {"$\\frac{1}{4}$"} veut dire "1 Unité DIVISÉE par 4 !".</>}
          />
          <Flashcard 
            front={<>Est-ce que la fraction [ 5 / 5 ]  est plus grande ou plus petite que la fraction [ 8 / 8 ] ?</>}
            back={<><strong>Elles sont ÉGALES ! Les deux valent '1' Entier !</strong><br/>Si je coupe 5 parts et je mange 5, j'ai tout mangé. Si je coupe 8 parts et que je mange 8, j'ai tout mangé ! Elles valent toutes les deux 1.</>}
          />
        </div>
      </Section>

      <Section title="5. Épreuve Finale" icon={<Trophy className="w-6 h-6" />} color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est le nom du nombre en HAUT de la fraction ?",
              options: [
                "Le Numérateur (Haut comme un Nuage).",
                "Le Dénominateur.",
                "Le Superieur."
              ],
              correctAnswer: 0,
              explanation: "Top ! Numérateur (Haut). C'est le nombre de parts que tu prends ! (Dénominateur (Bas comme le Diable), c'est la coupe totale de l'objet.)."
            },
            {
              question: "Si j'écris la fraction : Quinze sur Dix (15 / 10). Que penses-tu de cette quantité ? (Plus grande ou plus petite que l'Unité = 1 ?)",
              options: [
                "15/10 est Plus PETIT que 1 (Une pizza de 15 mangée 10 fois).",
                "15/10 est Plus GRAND que 1 (J'ai coupé en 10, mais je veux 15 Parts, il me faut une 2eme Pizza en renfort !!).",
                "C'est exactement 1."
              ],
              correctAnswer: 1,
              explanation: "Super boss ! Le nombre du haut est plus grand que celui du Bas ! Donc ça déborde. $\\frac{15}{10} > 1$ ! (Il faut 2 pizzas pour m'obéir)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle d'Écriture : Numérateur (Haut / Je prend) et Dénominateur (Bas / Total).",
            "Les mots du chef : Demi (1/2), Tiers (1/3), Quart (1/4).",
            "Mémorisé: Si le Haut et le Bas sont Pareils (Ex 10/10), ca fait TOUJOURS 1 !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider la Leçon (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM1_04_Fractions_Simples;
