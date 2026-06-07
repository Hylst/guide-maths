import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, Accordion, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import confetti from 'canvas-confetti';

const RoundPizzaVisualizer: React.FC = () => {
  const [denom, setDenom] = useState<number>(6); // Dénominateur (parts coupées)
  const [num, setNum] = useState<number>(3);    // Numérateur (parts mangées)

  const handleDenomChange = (val: number) => {
    setDenom(val);
    setNum(prev => Math.min(prev, val));
  };

  const currentDecimal = num / denom;

  // Calcul du texte littéral français du nom de la fraction
  const getFractionName = (n: number, d: number) => {
    if (n === 0) return "Aucun morceau";
    if (n === d) return "Le gâteau entier";

    let numText = "";
    switch (n) {
      case 1: numText = "Un"; break;
      case 2: numText = "Deux"; break;
      case 3: numText = "Trois"; break;
      case 4: numText = "Quatre"; break;
      case 5: numText = "Cinq"; break;
      case 6: numText = "Six"; break;
      case 7: numText = "Sept"; break;
      case 8: numText = "Huit"; break;
      case 9: numText = "Neuf"; break;
      case 10: numText = "Dix"; break;
      case 11: numText = "Onze"; break;
      case 12: numText = "Douze"; break;
      default: numText = n.toString();
    }

    let denomText = "";
    if (d === 2) denomText = "demi";
    else if (d === 3) denomText = "tiers";
    else if (d === 4) denomText = "quart";
    else {
      switch (d) {
        case 5: denomText = "cinquième"; break;
        case 6: denomText = "sixième"; break;
        case 7: denomText = "septième"; break;
        case 8: denomText = "huitième"; break;
        case 9: denomText = "neuvième"; break;
        case 10: denomText = "dixième"; break;
        case 11: denomText = "onzième"; break;
        case 12: denomText = "douzième"; break;
        default: denomText = d.toString() + "ième";
      }
    }

    if (n > 1) {
      denomText += "s";
    }

    return `${numText} ${denomText}`;
  };

  // Liste des tracés pour les parts de pizza
  const slices: React.ReactElement[] = [];
  const cx = 100;
  const cy = 80;
  const r = 60;

  for (let i = 0; i < denom; i++) {
    // Calcul de l'angle pour chaque part
    const angleStep = 360 / denom;
    const startAngle = i * angleStep - 90; // Décaler de -90 pour commencer en haut
    const endAngle = (i + 1) * angleStep - 90;

    // Convertir les angles en radians
    const radStart = (Math.PI * startAngle) / 180;
    const radEnd = (Math.PI * endAngle) / 180;

    // Coordonnées de début et de fin de l'arc de cercle
    const x1 = cx + r * Math.cos(radStart);
    const y1 = cy + r * Math.sin(radStart);
    const x2 = cx + r * Math.cos(radEnd);
    const y2 = cy + r * Math.sin(radEnd);

    // Définition de l'arc de cercle du SVG
    // path d="M cx cy L x1 y1 A r r 0 0 1 x2 y2 Z"
    const isSelected = i < num;
    const sliceD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

    slices.push(
      <path
        key={i}
        d={sliceD}
        fill={isSelected ? "#f97316" : "transparent"}
        stroke="#ea580c"
        strokeWidth="1.5"
        className="transition-colors duration-200 cursor-pointer hover:opacity-85"
        onClick={() => setNum(i + 1)}
      />
    );
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 my-8 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <span>🍕</span> Le Découpe-Pizza Interactif
      </h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Comprends visuellement les fractions. Choisis en combien de parts couper la pizza (Dénominateur, en bas) puis prends-en un certain nombre de parts (Numérateur, en haut) en faisant glisser les réglettes.
      </p>

      {/* Rendu interactif en deux colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/50 dark:bg-slate-900/10 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80">
        
        {/* SVG de Pizza */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 160" className="w-full max-w-[200px] h-auto overflow-visible drop-shadow-md">
            {/* Base plate du fond de tarte */}
            <circle cx={cx} cy={cy} r={r} fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
            
            {/* Parts colorées */}
            {slices}

            {/* Repères des lignes fines de découpes non mangées */}
            {Array.from({ length: denom }).map((_, i) => {
              const angle = (i * 360) / denom - 90;
              const rad = (Math.PI * angle) / 180;
              const xTarget = cx + r * Math.cos(rad);
              const yTarget = cy + r * Math.sin(rad);
              return (
                <line 
                  key={i} 
                  x1={cx} 
                  y1={cy} 
                  x2={xTarget} 
                  y2={yTarget} 
                  stroke="#fbbf24" 
                  strokeWidth="1" 
                  strokeDasharray={i >= num ? "3 1" : ""} 
                />
              );
            })}
          </svg>
          <div className="mt-4 text-xs text-orange-600 font-bold bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1">
            Les parts orange sont les {num} sélectionnées !
          </div>
        </div>

        {/* Écriture Mathématique et Réglettes */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Écriture fractionnaire verticale */}
            <div className="font-mono text-center flex flex-col items-center">
              <span className="text-4xl text-orange-500 font-extrabold">{num}</span>
              <div className="border-t-4 border-slate-800 dark:border-slate-200 w-16 my-1"></div>
              <span className="text-4xl text-emerald-500 font-extrabold">{denom}</span>
            </div>

            {/* Signe "=" puis écriture décimale et texte */}
            <div className="text-left">
              <div className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {`≈ ${currentDecimal.toFixed(3)}`}
              </div>
              <div className="bg-orange-500 text-white font-bold text-xs rounded-full px-3 py-1 mt-1 text-center capitalize">
                {getFractionName(num, denom)}
              </div>
            </div>
          </div>

          {/* Glissières */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
                <span>Le Numérateur (Parts prises)</span>
                <span className="text-orange-500 font-bold">{num}</span>
              </div>
              <input 
                type="range"
                min={0}
                max={denom}
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
                <span>Le Dénominateur (Parts coupées)</span>
                <span className="text-emerald-500 font-bold">{denom}</span>
              </div>
              <input 
                type="range"
                min={2}
                max={12}
                value={denom}
                onChange={(e) => handleDenomChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Course_College_6eme_03_Fractions: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-03"
        title="La Révélation des Fractions"
        subtitle="Le monde secret du Partage, des parts de Pizza et des proportions magiques."
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Les divisions élémentaires de CM2", "Multiplication simple (Table de Pythagore)"]}
        objectives={[
          "Comprendre le Numérateur et le Dénominateur (le Haut et le Bas).",
          "Placer des fractions simples sur un axe gradué.",
          "Simplifier une fraction par un même nombre (les clones d'égalité).",
          "Mener le calcul pour prendre la fraction d'une quantité entière (Argent, Poids)."
        ]}
      />

      <Section title="Introduction : Le Problème de l'Unité" icon="🍕" color="slate">
        <p>
          Si tu invites 3 amis chez toi, vous êtes en tout 4 gourmands. Si vous achetez UNE pizza entière, comment diviser équitablement cette denrée ? Si tu tapes {"$1 \\div 4$"} sur une calculatrice, elle donne un nombre décimal à virgule : {"$0.25$"}. 
        </p>
        <p className="mt-4">
          La <strong>Fraction</strong> a été inventée il y a des milliers d&apos;années pour conserver l&apos;écriture exacte et « pure » d&apos;un nombre sans s&apos;encombrer de virgules ! Une fraction n&apos;est rien d&apos;autre qu&apos;une <strong>division en suspens</strong> (qui refuse de s&apos;effectuer pour sauvegarder la precision).
        </p>
        
        <InfoBlock type="funfact" title="Le saviez-vous ? L'œil d'Horus en Égypte Antique">
          Les scribes pharaoniques utilisaient de fascinants hiéroglyphes pour symboliser les fractions de grains. Ils représentaient les fractions de l&apos;Œil d&apos;Horus : la pupille valait {"$\\frac{1}{4}$"}, le sourcil {"$\\frac{1}{8}$"}, et la tempe {"$\\frac{1}{64}$"}. La somme de toutes ces parties divines n&apos;égalait jamais tout à fait 1 (somme égale à {"$\\frac{63}{64}$"}), le morceau manquant représentant la magie du dieu Thot qui restaurait l&apos;intégrité de l&apos;œil !
        </InfoBlock>
      </Section>

      <Section title="1. Anatomie de l'Élu (Haut & Bas)" icon="📋" color="indigo">
        <p className="mb-4">Une écriture fractionnaire se compose de deux dalles superposées séparées par une barre de fraction indispensable.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-indigo-50/50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800/60 shadow-sm my-6">
           <div className="font-mono text-center">
             <div className="text-4xl text-rose-500 font-black pb-2">3</div>
             <div className="border-t-4 border-indigo-500 w-24 mx-auto my-2"></div>
             <div className="text-4xl text-emerald-500 font-black pt-2">8</div>
           </div>
           
           <div className="space-y-4">
             <div className="bg-card dark:bg-black/40 p-4 border-l-4 border-rose-500 rounded shadow">
               <h4 className="font-bold text-rose-600 dark:text-rose-400">Le NUMÉRATEUR (Nuage, en Haut)</h4>
               <p className="text-sm mt-1">Il compte mes parts d&apos;intérêt. « J&apos;ai dévoré {"$3$"} parts de tarte ». C&apos;est le <strong>compteur d&apos;action</strong>.</p>
             </div>
             <div className="bg-card dark:bg-black/40 p-4 border-l-4 border-emerald-500 rounded shadow">
               <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Le DÉNOMINATEUR (Démon/Dunes, en Bas)</h4>
               <p className="text-sm mt-1">Le boss de l&apos;architecture. La pizza a été initialement tranchée en {"$8$"} parts égales. Il donne le <strong>nom universel de la fraction</strong> (des huitièmes).</p>
             </div>
           </div>
        </div>

        <RoundPizzaVisualizer />
      </Section>

      <Section title="2. Des Clones Mathématiques (Les Égalités)" icon="🧬" color="blue">
        <p className="mb-4">
          Si on te donne {"$\\frac{1}{2}$"} de gâteau, on te donne une moitié. Si le gâteau de ton ami est plus finement coupé en quatre quartiers et qu&apos;il t&apos;en donne {"$\\frac{2}{4}$"}, tu as exactement la même matière dans l&apos;estomac ! Ce sont deux fractions équivalentes.
        </p>

        <TipBanner title="La Règle d'équivalence" type="success">
           Une fraction <strong>ne change jamais de valeur</strong> si l&apos;on multiplie ou divise son numérateur (le haut) ET son dénominateur (le bas) par un <strong>MÊME</strong> nombre entier non nul !
           <span className="block mt-4 font-mono bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg text-sm">
             {"$\\frac{1}{2} = \\frac{1 \\times 3}{2 \\times 3} = \\frac{3}{6}$"} (3 parts sur 6, c&apos;est toujours la moitié d&apos;une tarte !)
           </span>
        </TipBanner>

        <InfoBlock type="reminder" title="Rappel : Simplifier pour alléger la fraction">
          Pour simplifier une fraction volumineuse comme {"$\\frac{10}{20}$"}, on traque un diviseur commun dans nos tables de multiplication. En divisant le haut et le bas par 10, on obtient l&apos;écriture irréductible et limpide : {"$\\frac{1}{2}$"}.
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Les Fractions Décimales">
          Une fraction est dite <strong>décimale</strong> quand son dénominateur (le bas) est égal à {"$10$"}, {"$100$"}, {"$1000$"}, etc. Ce sont elles qui ont permis de fonder notre système décimal à virgule ! Par exemple : {"$\\frac{13}{10} = 1.3$"} ou {"$\\frac{57}{100} = 0.57$"}.
        </InfoBlock>
      </Section>

      <Section title="3. Prendre la Fraction d'une Quantité" icon="💰" color="amber">
        <p className="mb-4">
          Dans la vie de tous les jours, on a besoin de couper des collections d&apos;objets solides. Par exemple : « Mon trésor vaut 600 pièces d&apos;or. On me prend les {"$\\frac{2}{3}$"} de mes gains. Combien ai-je cédé ? »
        </p>

        <InteractiveExercise 
          title="Le Siphonage du trésor par les Tiers"
          question={<p>Calculer la valeur exacte de : {"$\\frac{2}{3}$"} de {"$600$"} pièces d&apos;or.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 1 : Le Découpage unitaire (Le bas domine !)</p>
              <p>On prend le trésor total (600) et on le coupe en paquets égaux selon le dénominateur (3) :</p>
              <MathComponent block math="600 \\div 3 = 200 \\text{ pièces}" />
              <p className="text-xs mt-1 text-slate-500 text-slate-400">Chaque « tiers » de notre trésor vaut donc 200 pièces.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 2 : L&apos;accumulation des parts (Le haut s&apos;active !)</p>
              <p>On prend maintenant autant de paquets d&apos;or que le demande le numérateur (2) :</p>
              <MathComponent block math="200 \\times 2 = 400 \\text{ pièces}" />
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100 text-sm md:text-base">
              <p className="mb-2">Étape 3 : Conclusion finale</p>
              <p>Prendre les {"$\\frac{2}{3}$"} de 600 équivaut à un total souverain de <strong>400 pièces d&apos;or</strong>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="4. Flashcards de Flash-Révision" icon="🧠" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Où se positionne la fraction {"$\\frac{7}{4}$"} sur une droite graduée en quarts ?</>}
            back={<><strong>Elle dépasse le nombre entier 1 !</strong><br/>La fraction {"$\\frac{4}{4}$"} vaut exactement 1. Donc, pour placer {"$\\frac{7}{4}$"}, on prend 1 unité entière, puis on avance de 3 petits bonds d&apos;un quart supplémentaires. C&apos;est situé entre 1 et 2 !</>}
          />
          <Flashcard 
            front={<>Que vaut de manière standard n&apos;importe quelle fraction dont le haut égale le bas, comme {"$\\frac{12}{12}$"} ?</>}
            back={<><strong>Elle est égale à 1 tout rond !</strong><br/>Si l&apos;on découpe une pizza en 12 parts et qu&apos;on mange les 12 parts, on a absolument assimilé la pizza unitaire entière. {"$\\frac{a}{a} = 1$"}.</>}
          />
        </div>
      </Section>

      <Section title="Questions Fréquentes (FAQ)" icon="❓" color="slate">
        <Accordion title="Peut-on mettre un zéro au dénominateur en bas ? genre 5 / 0 ?">
          <p>
            <strong>C&apos;est formellement interdit en mathématiques !</strong> Mettre un 0 en bas reviendrait à diviser par zéro. Imagines-tu couper une tarte en zéro part (c&apos;est-à-dire la faire disparaître de la réalité) et essayer d&apos;en manger 5 morceaux ? C&apos;est impossible et absurde ! Ta calculatrice affichera par ailleurs une erreur fatale d&apos;écriture.
          </p>
        </Accordion>
        <Accordion title="Pourquoi dit-on demi, tiers, et quart, et pas deuxièmes, troisièmes, quatrièmes ?">
          <p>
            Ce sont des exceptions de vocabulaire héritées de mots latins très anciens pour les trois plus petites coupes universelles du gâteau. Au-delà du diviseur 4 (la coupe par 5), nous reprenons les terminaisons régulières en « ième » : un cinquième, un sixième, un dixième, etc.
          </p>
        </Accordion>
        <Accordion title="Comment comparer deux fractions de même dénominateur ?">
          <p>
            Si deux fractions ont le même nombre du bas (par exemple {"$\\frac{2}{7}$"} et {"$\\frac{5}{7}$"}), c&apos;est très simple : elles ont été coupées avec la même règle d&apos;univers. La plus grande est tout simplement celle qui possède le plus grand nombre supérieur (le numérateur). On a donc : {"$\\frac{5}{7} > \\frac{2}{7}$"}.
          </p>
        </Accordion>
      </Section>

      <Section title="Épreuve Initiale d'Évaluation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'on veut simplifier la fraction 12/18 au maximum, quel résultat irréductible obtient-on ?",
              options: [
                "6/9 (en divisant le haut et le bas par 2).",
                "2/3 (en divisant le haut et le bas par le plus grand diviseur commun, 6).",
                "1/2 (car on divise toujours au hasard)."
              ],
              correctAnswer: 1,
              explanation: "Pour obtenir la fraction la plus légère possible (irréductible), on divise le haut et le bas par leur plus grand diviseur commun, ici 12 ÷ 6 = 2 et 18 ÷ 6 = 3, d'où 2/3."
            },
            {
              question: "Pour récolter les 3/5 des 25 euros d'argent de poche d'Oscar pour un cadeau :",
              options: [
                "Je commence par diviser le trésor 25 par le bas 5, ce qui donne 5. Puis j'élève par le haut 3, totalisant 15 euros.",
                "Je multiplie d'abord 25 par 5 = 125, puis je coupe par 3, donnant environ 41.6 euros."
              ],
              correctAnswer: 0,
              explanation: "Règle absolue : Pour prendre une fraction de quantité, on divise la valeur par le dénominateur (25/5 = 5) puis on multiplie par le numérateur (5*3 = 15)."
            },
            {
              question: "Que représente le Dénominateur (le nombre situé tout en bas) dans une écriture fractionnaire ?",
              options: [
                "Le nombre de parts restantes ou mangées à la fin du repas.",
                "Le nombre total égal de parts dans lesquelles l'unité d'origine a été segmentée.",
                "La valeur à ajouter au numérateur pour faire 100."
              ],
              correctAnswer: 1,
              explanation: "C'est la règle d'univers ou l'assemblage total de l'unité de départ (la pizza de référence a été scindée en n morceaux égaux)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="checklist-fractions"
          items={[
            "Je sais que le Numérateur correspond au terme du haut et le Dénominateur au terme du bas.",
            "Je comprends qu'multiplier le haut et le bas par un même nombre ne change pas la fraction.",
            "Je maîtrise la méthode pas-à-pas pour calculer la part d'une quantité entière.",
            "Je sais repérer une fraction équivalente comme un clone d'aire identique."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
              });
              onValidateCourse();
            }}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_College_6eme_03_Fractions;
