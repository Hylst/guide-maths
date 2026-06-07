import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Dot, Fingerprint, Coins, Scale, Sparkles, HelpCircle, Trophy } from 'lucide-react';

const Course_Primaire_CM1_05_Nombres_Decimaux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [val, setVal] = useState<number>(3.45);

  const units = Math.floor(val);
  const tenths = Math.floor((val - units) * 10);
  const hundredths = Math.round((val - units - tenths / 10) * 100);

  const presets = [
    { label: "Trois pommes et demie (3,5)", value: 3.50 },
    { label: "Juste un morceau (0,48)", value: 0.48 },
    { label: "Près de huit (7,95)", value: 7.95 },
    { label: "Huit et trois centièmes (8,03)", value: 8.03 }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM1-05"
        title="Les Nombres Décimaux"
        subtitle="Le Mystère Caché Derrière La Virgule"
        duration="45min"
        level="CM1"
        prerequisites={["Les Fractions (1/10 et 1/100)"]}
        objectives={[
          "Comprendre d'où vient la Virgule (Le morceau cassé).",
          "Lire: Dixième, Centième et Millième.",
          "Faire le lien entre Fraction et Virgule (Écriture Magique)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Les nombres décimaux (à virgule) découlent directement de l'apprentissage des fractions dixièmes et centièmes. Au CM1, l'enfant doit comprendre que la virgule est une frontière qui sépare la partie entière (les objets entiers) de la partie décimale (les morceaux brisés). Évitez la récitation par cœur et insistez sur le fait que la zone à droite de la virgule représente des valeurs plus petites que l'unité.
      </InfoBlock>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : La monnaie et la virgule
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Dans les chapitres précédents, tu as jonglé avec d'immenses nombres entiers. Mais, lorsque tu vas t'acheter du pain ou un livre à la boutique de la ville, le prix affiché sur la caisse n'est jamais un nombre complètement "rond" ni "entier". Tu vas plutôt lire une étiquette comme <strong>2,50 €</strong> ou <strong>12,99 €</strong>.
          Ce petit signe de ponctuation qui vient s'immiscer au milieu des chiffres s'appelle une <strong>Virgule</strong>. C'est une frontière magique qui coupe le monde des nombres en deux : les nombres entiers complets (les gros euros, à gauche) et les petits morceaux (les centimes, à droite de la virgule). Bienvenue dans le monde des <strong>Nombres Décimaux</strong> !
        </p>
      </div>

      <Section title="1. La Découverte de la Virgule (L'Aiguille)" icon={<Dot className="w-6 h-6" />} color="blue">
        <p className="mb-4">Tu as toujours compté avec des Unités Pures (1 Pomme, 2 Bonbons, 10 Voitures). Mais comment faire si tu n'as pas de Voiture ENTIÈRE ? Si tu as juste un demi pneu de charrette ? C'est là que naît la Virgule !</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 shadow-sm flex flex-col md:flex-row gap-6 mb-6">
           <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl shadow border-l-4 border-amber-500 text-center">
             <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Partie ENTIÈRE</h4>
             <p className="text-4xl font-black text-amber-500 mt-2">12</p>
             <p className="text-xs text-slate-500 mt-2">Avant la virgule (Les vraies pizzas que tu as entières dans la boîte).</p>
           </div>

           <div className="flex flex-col items-center justify-center">
             <span className="text-6xl font-black text-rose-500 -mt-4">,</span>
             <span className="text-xs font-bold text-rose-600 dark:text-rose-400">La Frontière</span>
           </div>
           
           <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl shadow border-l-4 border-indigo-500 text-center">
             <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Partie DÉCIMALE</h4>
             <p className="text-4xl font-black text-indigo-500 mt-2">45</p>
             <p className="text-xs text-slate-500 mt-2">Après la virgule. Ce sont LES MORCEAUX CASSÉS. C'est moins qu'une Unité pure !</p>
           </div>
        </div>

        <TipBanner title="Règle d'Or Absolue" type="warning">
           Tout ce qui est APRÈS la virgule pèse beaucoup moins lourd que le plus petit chiffre Avant la virgule. (Ex: Le 99 de (10,99) pèse moins lourd que le 1 de 11,00 !).
        </TipBanner>
      </Section>

      <Section title="2. Les Nouveaux Noms de la Zone Fantôme" icon={<Fingerprint className="w-6 h-6" />} color="indigo">
        <p className="mb-4">À gauche du mur de la Virgule c'était : Unité, Dizaine, Centaine. À droite, ça ressemble, mais on y ajoute le mot "-ièmes" pour montrer qu'on a coupé l'unité à la hache !</p>

        {/* Interactive Decimal Value Decomposer Component */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 border border-indigo-100 dark:from-slate-900/40 dark:to-slate-950 dark:border-indigo-900/40 p-6 rounded-[2rem] my-8 shadow-inner">
          <h4 className="font-bold text-indigo-950 dark:text-indigo-50 text-base text-center mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-spin-slow" />
            Explorateur de Chocolats Décimaux
          </h4>

          {/* Preset options */}
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setVal(preset.value)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  Math.abs(val - preset.value) < 0.005
                    ? "bg-indigo-500 text-white border-indigo-500 shadow-sm"
                    : "bg-white dark:bg-slate-800 border-slate-200 text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visualizer output SVG of Chocolates */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono mb-4 bg-indigo-50/80 dark:bg-indigo-950/40 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                {units},{tenths}{hundredths}
              </span>

              {/* Real-time SVG drawings of Chocolate Blocks */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 240 120" className="w-56 h-auto">
                  {/* Units blocks: Orange color */}
                  {Array.from({ length: 9 }).map((_, idx) => {
                    const col = idx % 3;
                    const row = Math.floor(idx / 3);
                    const isVisible = idx < units;

                    return (
                      <rect
                        key={`un-${idx}`}
                        x={10 + col * 26}
                        y={10 + row * 26}
                        width="22"
                        height="22"
                        rx="3"
                        fill="#f59e0b"
                        stroke="#d97706"
                        strokeWidth="1.5"
                        opacity={isVisible ? 1 : 0.08}
                        className="transition-all duration-300"
                      />
                    );
                  })}

                  {/* Tenths strips (Strips of 10): Sky color */}
                  {Array.from({ length: 9 }).map((_, idx) => {
                    const col = idx % 3;
                    const row = Math.floor(idx / 3);
                    const isVisible = idx < tenths;

                    return (
                      <g key={`t-${idx}`} opacity={isVisible ? 1 : 0.08} className="transition-all duration-350">
                        {/* 10 small subdivisions in vertical bar */}
                        <rect
                          x={110 + col * 16}
                          y={10 + row * 34}
                          width="10"
                          height="28"
                          rx="1.5"
                          fill="#3b82f6"
                          stroke="#2563eb"
                          strokeWidth="1"
                        />
                        {/* subdivision lines */}
                        <line x1={110 + col * 16} y1={20 + row * 34} x2={120 + col * 16} y2={20 + row * 34} stroke="#ffffff" strokeWidth="0.5" opacity="0.6"/>
                        <line x1={110 + col * 16} y1={28 + row * 34} x2={120 + col * 16} y2={28 + row * 34} stroke="#ffffff" strokeWidth="0.5" opacity="0.6"/>
                      </g>
                    );
                  })}

                  {/* Hundredths crumbs (Tiny elements): Purple color */}
                  {Array.from({ length: 9 }).map((_, idx) => {
                    const col = idx % 3;
                    const row = Math.floor(idx / 3);
                    const isVisible = idx < hundredths;

                    return (
                      <circle
                        key={`h-${idx}`}
                        cx={180 + col * 14}
                        cy={22 + row * 22}
                        r="3.5"
                        fill="#a855f7"
                        stroke="#7e22ce"
                        strokeWidth="1"
                        opacity={isVisible ? 1 : 0.12}
                        className="transition-all duration-400"
                      />
                    );
                  })}

                  <text x="40" y="105" fontSize="10" fill="#f59e0b" fontWeight="bold" textAnchor="middle">Tablettes entières</text>
                  <text x="130" y="105" fontSize="10" fill="#3b82f6" fontWeight="bold" textAnchor="middle">Barrettes (1/10)</text>
                  <text x="195" y="105" fontSize="10" fill="#a855f7" fontWeight="bold" textAnchor="middle">Miettes (1/100)</text>
                </svg>
              </div>

              {/* Slider selector for precise tweaking */}
              <div className="w-full mt-4">
                <input
                  type="range"
                  min="0"
                  max="8.99"
                  step="0.01"
                  value={val}
                  onChange={(e) => setVal(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>0.00 (Vide)</span>
                  <span>9.00 (Max)</span>
                </div>
              </div>
            </div>

            {/* Place value table row representation */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h5 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Position dans le Tableau :</h5>
              
              <div className="grid grid-cols-4 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden divide-x divide-slate-100 dark:divide-slate-705 text-center bg-slate-50 dark:bg-slate-900 font-mono">
                <div className="p-2">
                  <div className="text-[10px] font-bold text-slate-400">UNITÉS</div>
                  <div className="text-2xl font-black text-amber-500 mt-1">{units}</div>
                </div>
                <div className="p-2 bg-rose-50/20 dark:bg-rose-950/20">
                  <div className="text-[10px] font-bold text-rose-500">VIRGULE</div>
                  <div className="text-2xl font-black text-rose-500 mt-1">,</div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] font-bold text-sky-500">DIXIÈMES</div>
                  <div className="text-2xl font-black text-sky-500 mt-1">{tenths}</div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] font-bold text-purple-500">CENTIÈMES</div>
                  <div className="text-2xl font-black text-purple-500 mt-1">{hundredths}</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="font-medium text-slate-700 dark:text-slate-150 mb-1">Traduction en fractions :</p>
                {"$"+units+" + \\frac{"+tenths+"}{10} + \\frac{"+hundredths+"}{100} = \\frac{"+Math.round(val*100)+"}{100}$"}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-indigo-100 dark:border-indigo-800/60 my-6 shadow-sm">
          <table className="w-full text-center bg-white dark:bg-slate-900">
             <thead>
               <tr className="border-b-2 border-indigo-100 dark:border-indigo-800/60">
                 <th className="p-3">Dizaines</th>
                 <th className="p-3">Unités</th>
                 <th className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-2xl">,</th>
                 <th className="p-3 text-sky-600 border-l">Dix-ièmes (1er)</th>
                 <th className="p-3 text-emerald-600 dark:text-emerald-400">Cent-ièmes (2e)</th>
                 <th className="p-3 text-amber-600 dark:text-amber-400">Mill-ièmes (3e)</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td className="p-3 text-xl font-bold text-slate-600 dark:text-slate-300">2</td>
                 <td className="p-3 text-xl font-bold text-slate-600 dark:text-slate-300">4</td>
                 <td className="p-3 bg-rose-50/50 dark:bg-rose-900/20 text-rose-500 font-bold text-2xl">,</td>
                 <td className="p-3 text-xl font-bold text-sky-500 border-l bg-sky-50/50">8</td>
                 <td className="p-3 text-xl font-bold text-emerald-500 bg-emerald-50/50">0</td>
                 <td className="p-3 text-xl font-bold text-amber-500 bg-amber-50/50">5</td>
               </tr>
             </tbody>
          </table>
        </div>
        
        <p className="text-sm bg-indigo-50/50 dark:bg-indigo-900/20 p-3 rounded border"><strong>Comment lire ce monstre ?</strong> "Vingt-quatre VIRGULE Huit-Cent-Cinq" OU "Vingt-quatre Unités, et Huit-Cent-Cinq <strong>Millièmes</strong>" (car le dernier chiffre s'arrête dans la case des Millièmes).</p>
      </Section>

      <Section title="3. L'Écriture Magique (Fraction vers Virgule)" icon={<Coins className="w-6 h-6" />} color="emerald">
        <p className="mb-4">Le lien ultime entre une fraction et un chiffre à virgule !</p>

        <InteractiveExercise 
          title="De l'Écriture Fraction... À la Virgule !"
          question={<>Comment traduire très vite la fraction [ 35 / 10 ] (35 Dixièmes) en un nombre à Virgule ?</>}
          steps={[
            <><strong>1. Le Secret des Zéros Occultes :</strong> Je regarde sous la barre (Le Dénominateur). C'est "10". Combien y a t'il de zéros dans le nombre "10" ? Il y en a <strong>1 seul</strong>.</>,
            <><strong>2. L'Alerte au Recul :</strong> 1 Zéro veut dire La Virgule va sauter à gauche d'exactement <strong>1 CRAN (1 chiffre)</strong> !</>,
            <><strong>3. Le Saut de Grenouille :</strong> Je prends mon nombre 35 (C'est comme s'il y avait une virgule cachée à la fin : 35,0). Je fais sauter la virgule sur la gauche au milieu des chiffres : La Virgule passe par dessus le 5, et elle se pose entre le 3 et 5.</>,
            <><strong>4. L'Apparition :</strong> {"$\\frac{35}{10} = 3,5$"} ! (1 Zéro en bas = 1 chiffre après la virgule !)</>
          ]}
        />
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 border border-emerald-100 dark:border-emerald-800/60 mt-4 rounded">
          <p className="text-sm"><strong>Super Test :</strong> Et {"$\\frac{35}{100}$"} ? (2 zéros en bas !). Le saut recule de DEUX cases. Ca passe le 5, puis le 3. Ca donne ",35". Et comme le vide c'est affreux, on bouche la faille avec un zéro ! Résultat = <strong>0,35 !</strong></p>
        </div>
      </Section>

      <Section title="4. Quiz & Flashcards" icon={<HelpCircle className="w-6 h-6" />} color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quel est le plus grand :  2,5  ou bien  2,499999 ?</>}
            back={<><strong>2,5 est LE GRAND VAINQUEUR !</strong><br/>On regarde cran par cran. 2 Unités vs 2 Unités (Égalité). On passe la Virgule ! Le premier tireur c'est les Dixièmes (1er cran). Mon 5 est plus grand que le 4. Bam, combat fini, c'est gagné pour 2,5 !</>}
          />
          <Flashcard 
            front={<>Le terrible problème Vrai/Faux : "2,5 c'est la même chose que 2,50" ?</>}
            back={<><strong>VRAI ABSOLU !</strong><br/>Les zéros fantômes tout à la FIN après la virgule ne servent à rien ! Ça ne pèse aucune masse supplémentaire (0 millième !). Tu peux les rayer sans crainte : 2,5 = 2,50 = 2,500.</>}
          />
        </div>
      </Section>

      <Section title="5. Épreuve Finale" icon={<Trophy className="w-6 h-6" />} color="indigo">
        <Quiz 
          questions={[
            {
              question: "Si j'écris le nombre 12,045. Quel est le chiffre '4' ?",
              options: [
                "C'est le chiffre des Centièmes (c'est le 2ème après la virgule !).",
                "C'est le chiffre des Dixièmes.",
                "C'est le 4 des unités cassées."
              ],
              correctAnswer: 0,
              explanation: "Top ! Le 0 est la première case après la virgule (dixièmes), et le 4 est le centième ! Le 5 est le millième."
            },
            {
              question: "Comment transformer ( 9 / 100 ) en virgule pure ?",
              options: [
                "9,100",
                "0,9",
                "0,09 (Il y a 2 Zéros dans '100', il faut 2 chiffres après la virgule !)"
              ],
              correctAnswer: 2,
              explanation: "Parfait ! 100 a deux zéros, donc après le saut magique on a 2 chiffres après la virgule : 0,09 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle d'Or Vitesse : Les zéros tout à la droite de la virgule s'effacent (3,400 = 3,4).",
            "La famille sombre : Dixième (1er), Centième (2e), Millième (3e).",
            "Mémorisé: [ / 10 ] met le chiffre juste après la virgule (4/10 = 0,4) !"
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

export default Course_Primaire_CM1_05_Nombres_Decimaux;
