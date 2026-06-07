import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Divide, MoveRight, AlignEndHorizontal, RefreshCcw, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const Course_Primaire_CM2_04_Division_Quotient_Decimal: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [step, setStep] = useState<number>(0);

  const divisionSteps = [
    {
      label: "Départ",
      title: "1. Division Euclidienne Classique",
      instruction: "On regarde en 15, combien de fois il y a 4. Ça rentre 3 fois (3 x 4 = 12). On pose 12 sous 15 et on soustrait pour trouver le reste : 3.",
      svg: (
        <svg viewBox="0 0 240 180" className="w-full h-auto select-none font-mono">
          {/* Crochet de division */}
          <line x1="120" y1="10" x2="120" y2="150" stroke="#475569" strokeWidth="2.5" />
          <line x1="120" y1="45" x2="220" y2="45" stroke="#475569" strokeWidth="2.5" />
          
          {/* Dividende et Diviseur */}
          <text x="40" y="32" fontSize="20" fontWeight="bold" fill="#0f172a">1 5</text>
          <text x="140" y="32" fontSize="20" fontWeight="bold" fill="#0f172a">4</text>
          
          {/* Soustraction posée */}
          <text x="25" y="70" fontSize="18" fill="#94a3b8">- 1 2</text>
          <line x1="20" y1="85" x2="90" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
          
          {/* Reste et Quotient initial */}
          <text x="70" y="112" fontSize="20" fontWeight="bold" fill="#ea580c">3</text>
          <text x="140" y="78" fontSize="20" fontWeight="bold" fill="#0f172a">3</text>
        </svg>
      )
    },
    {
      label: "Zéro Fantôme",
      title: "2. Injection du premier Zéro Fantôme !",
      instruction: "Pour continuer la division, on appelle un Zéro volant à côté du reste 3, qui devient 30. À cet instant précis, on place la VIRGULE au quotient !",
      svg: (
        <svg viewBox="0 0 240 180" className="w-full h-auto select-none font-mono">
          <line x1="120" y1="10" x2="120" y2="150" stroke="#475569" strokeWidth="2.5" />
          <line x1="120" y1="45" x2="220" y2="45" stroke="#475569" strokeWidth="2.5" />
          
          <text x="40" y="32" fontSize="20" fontWeight="bold" fill="#94a3b8" className="opacity-40">1 5</text>
          <text x="140" y="32" fontSize="20" fontWeight="bold" fill="#0f172a">4</text>
          
          {/* Reste qui mute */}
          <text x="70" y="112" fontSize="20" fontWeight="bold" fill="#ea580c">3</text>
          <text x="92" y="112" fontSize="20" fontWeight="black" fill="#10b981" className="animate-ping absolute">0</text>
          <text x="92" y="112" fontSize="20" fontWeight="black" fill="#10b981">0</text>
          
          {/* Quotient avec virgule */}
          <text x="140" y="78" fontSize="20" fontWeight="bold" fill="#0f172a">3</text>
          <text x="156" y="78" fontSize="22" fontWeight="black" fill="#ef4444" className="animate-bounce">,</text>
        </svg>
      )
    },
    {
      label: "Première Décimale",
      title: "3. Division des dixièmes : 30 / 4",
      instruction: "Dans 30, combien de fois 4 ? Ça rentre 7 fois (7 x 4 = 28). On place le 7 après la virgule, on soustrait 28 de 30 pour obtenir un reste de 2.",
      svg: (
        <svg viewBox="0 0 240 180" className="w-full h-auto select-none font-mono">
          <line x1="120" y1="10" x2="120" y2="150" stroke="#475569" strokeWidth="2.5" />
          <line x1="120" y1="45" x2="220" y2="45" stroke="#475569" strokeWidth="2.5" />
          
          <text x="140" y="32" fontSize="20" fontWeight="bold" fill="#0f172a">4</text>
          
          {/* Reste de 30 et soustraction de 28 */}
          <text x="70" y="55" fontSize="20" fill="#94a3b8">30</text>
          <text x="45" y="85" fontSize="18" fill="#94a3b8">-28</text>
          <line x1="45" y1="95" x2="110" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
          
          {/* Nouveau reste */}
          <text x="90" y="125" fontSize="20" fontWeight="bold" fill="#ea580c">2</text>
          
          {/* Quotient */}
          <text x="140" y="78" fontSize="20" fontWeight="bold" fill="#94a3b8">3,</text>
          <text x="165" y="78" fontSize="20" fontWeight="black" fill="#3b82f6">7</text>
        </svg>
      )
    },
    {
      label: "Supplice Final",
      title: "4. Deuxième Zéro et reste zéro !",
      instruction: "Pour éteindre le reste '2', on lui injecte à nouveau un Zéro de l'espace pour faire 20. En 20, combien de fois 4 ? Exactement 5 fois. Le reste final vaut ZÉRO !",
      svg: (
        <svg viewBox="0 0 240 180" className="w-full h-auto select-none font-mono">
          <line x1="120" y1="10" x2="120" y2="150" stroke="#475569" strokeWidth="2.5" />
          <line x1="120" y1="45" x2="220" y2="45" stroke="#475569" strokeWidth="2.5" />
          
          <text x="140" y="32" fontSize="20" fontWeight="bold" fill="#0f172a">4</text>
          
          {/* Résolution finale de la soustraction */}
          <text x="70" y="55" fontSize="18" fill="#94a3b8">2</text>
          <text x="88" y="55" fontSize="18" fontWeight="bold" fill="#10b981">0</text>
          <text x="50" y="85" fontSize="18" fill="#94a3b8">-20</text>
          <line x1="45" y1="95" x2="110" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
          
          {/* Reste ultime nul */}
          <text x="88" y="125" fontSize="22" fontWeight="black" fill="#10b981">0</text>
          
          {/* Quotient complet */}
          <text x="140" y="78" fontSize="20" fontWeight="bold" fill="#94a3b8">3,7</text>
          <text x="180" y="78" fontSize="20" fontWeight="black" fill="#ea580c">5</text>
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM2-04"
        title="La Division Décimale"
        subtitle="Briser la Virgule et Éclater le Reste de la Division !"
        duration="45min"
        level="CM2"
        prerequisites={["La Division Euclidienne (Avec le Crochet)", "Les Nombres Décimaux"]}
        objectives={[
          "Comprendre La Division avec un reste inexact (Aller après la Virgule).",
          "Placer la Virgule Divinatoire dans LA RÉPONSE (Le Quotient).",
          "Continuer l'acharnement jusqu'à ce que Zéro apparaisse en bas !"
        ]}
      />

      <Section title="1. Le Problème du CM1 : 'Ah Zute y a un Reste !'" icon="RefreshCcw" color="blue">
        <p className="mb-4">En CM1, tu as appris la division Euclidienne. (Ex: 10 bonbons divisés par 4 enfants = 2 par enfant... Et il RESTE 2 !). Au CM2, on ne jette plus le reste. On <strong>CASSE LA FRONTIÈRE</strong> en allant voir derrière la Virgule ! L'argent se partage jusqu'au bout !</p>
        
        <TipBanner title="Le But du CM2" type="info">
           Notre objectif Ultime n'est plus "Il reste de l'argent". C'est de <strong>continuer à baisser des Zéros Fantômes du ciel, et de METTRE UNE VIRGULE AU RESULTAT</strong> pour vider la caisse jusqu'à 0 !
        </TipBanner>
      </Section>

      <Section title="2. Le Protocole : Franchir La Ligne Virgule !" icon="MoveRight" color="indigo">
        <p className="mb-4">Voici la Magie d'une division "A la CM2" ! Tourne les étapes pour assister à l'opération vivante.</p>

        {/* Division Stepper Lab */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-slate-900/40 dark:to-slate-950 border border-indigo-150/40 dark:border-indigo-950 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Le Cinéma du Crochet : Division de 15 par 4</h4>
          </div>

          {/* Steps list tabs */}
          <div className="flex gap-1.5 overflow-x-auto w-full max-w-md justify-between mb-6 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            {divisionSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  step === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Left side: SVG layout */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-850 flex items-center justify-center">
              {divisionSteps[step].svg}
            </div>

            {/* Right side: step commentary */}
            <div className="text-left">
              <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm mb-2">{divisionSteps[step].title}</h5>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">{divisionSteps[step].instruction}</p>
            </div>
          </div>

          {/* Step action buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-150 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold rounded-lg text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-705 dark:text-white"
            >
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
            <span className="font-mono text-xs font-bold text-slate-500">{step + 1} / {divisionSteps.length}</span>
            <button
              onClick={() => setStep(Math.min(divisionSteps.length - 1, step + 1))}
              disabled={step === divisionSteps.length - 1}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-xs font-bold rounded-lg text-white"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Section>

      <Section title="3. La Division de L'Horreur (La Virgule est du coté Gauche !)" icon="Divide" color="amber">
        <p className="mb-4">Si le Boss du haut (Dividende) A DEJA UNE VIRGULE AU DEPART ! (Ex: 14,5 divisé par 5). Que ce passes t-il !!?</p>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-5 rounded-2xl border-l-4 border-amber-500 mb-6 font-mono text-center">
           <p className="text-slate-900 dark:text-slate-100 dark:text-slate-200">DIVISER 14,5  PAR  5.</p>
           
           <div className="bg-card p-4 rounded shadow mt-4 text-left border border-amber-100 dark:border-amber-800/60">
             <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">La Règle Divinatoire : La Frontière</h4>
             <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
               <li>- <strong>Je calcule normal</strong> avec la tête : "En 14 combien de fois 5 ?" ➡️ Reponse 2 (Reste 4). Resultat coté barre [2].</li>
               <li>- Je vais Litérallement et <strong>Descendre le 5 qui est DERREIER LA VIRGULE </strong> !!</li>
               <li>- ⚠️ LA REGURGITION MAGIQUE : <strong>Des Que J'ABAISSE LE Chiffre QUI FRANCHI LA VIRGULE (Le '5' d'apres la virgule). BANG ! LA VIRGULE EST TIRÉE AU FUSIL SUR MON RESULTAT !!!!!</strong> Il deviend "2," !</li>
               <li>- Je finis mon calcul normal : "En 45 combien 5 ?" ➡️ 9 Fois !. Reponse Final "2,9" !! Ouf...</li>
             </ul>
           </div>
        </div>
      </Section>

      <Section title="🎯 Entraînement : Pose la virgule !" icon="Sparkles" color="indigo">
        <InteractiveExercise 
          title="Où poser la virgule au quotient ?"
          question={
            <div className="space-y-2 text-sm leading-relaxed">
              <p>On effectue la division de <strong>13</strong> par <strong>5</strong>.</p>
              <p>1. Combien de fois y a-t-il 5 dans 13 ? Il y va 2 fois (2 x 5 = 10). Le reste est de 3.</p>
              <p>2. On abaisse un <strong>zéro fantôme</strong> à côté du 3 pour en faire 30.</p>
              <p className="font-bold text-indigo-600">À cet instant précis, quelle action doit-on effectuer et quel est le résultat de la division ?</p>
            </div>
          }
          steps={[
            <div key="step-1" className="bg-emerald-50/50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 text-xs">
              <p className="font-bold text-emerald-900 dark:text-emerald-100 mb-1">Étape 1 : Le Portail de la Virgule</p>
              <p>Au moment exact où l&apos;on abaisse le premier 0 fantôme, on doit poser une <strong>virgule au quotient</strong> juste après le 2. Le quotient temporaire devient donc <code>2,</code>.</p>
            </div>,
            <div key="step-2" className="bg-emerald-50/50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 text-xs">
              <p className="font-bold text-emerald-900 dark:text-emerald-100 mb-1">Étape 2 : Division finale</p>
              <p>On cherche alors combien de fois 5 est contenu dans 30. La table de 5 nous dit : <code>6 x 5 = 30</code>. On écrit donc le chiffre 6 juste derrière la virgule au quotient.</p>
              <p className="font-bold text-emerald-600 mt-2 font-mono">Le quotient final est donc 2,6 et le reste est de 0 !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans un partage CM1 on a un (Reste). En Math CM2 : Est-ce qu'on s'arrete au Reste ?</>}
            back={<><strong>NON !! on baisse le Zéro de l'espace au Reste... et on Met LA VIRGULE  au Quotient !!</strong><br/>Et on continue jusqu'a l'eplosion du resultat a 0 !</>}
          />
          <Flashcard 
            front={<>A Quel Moment très très très PRECIS je dois Ajouter ma petite vigrule à mon Resultat (Celui de Droite posé) ?</>}
            back={<><strong>A l'Exact Instant Ou j'ai franchit la Virgule de de mon Gros Boss ou quand je Baisses le permier Zéro fantome !</strong><br/> Pas avant ! Pas 1h après ! La seconde meme. C'est le Portail Interdimentionel !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quelle est La Plus Grave Eteeur de l'éleve qui fait Diviser ( 11 par 4) = Resultat (2,75) ??",
              options: [
                "De mettre le zero en bas de son cahier.",
                "D'oublier de Placer sa Virgule de l'autre coté de la Croix !! Résultat le Professeur voit un éorme [275] !  Et te mets ZERO points !",
                "Y'a pas d'erreur, c'est bon avec 275."
              ],
              correctAnswer: 1,
              explanation: "Top ! Tu as baisser ton Zéro du Ciel... tu es dans le monde Irréel des Demis.. METS TA VIRGULE AU RESULTAT MAGIQUE ! Sinon ton partage est x100, une catastrophe financièere banquière totale."
            },
            {
              question: "Et si après (2,333333333) .. ca ne s'arrete jamais ... La division est-telle Maudite ?",
              options: [
                "Oui c'est l'infini (ex 10 / 3). Je m'arrête à 2 ou 3  chiffres après aprés la virgule, je ferme la faille saptio-tempo..",
                "Non, il faut aller jusqu'à ce que Zéro Tombe, même sur 80 pages (Le prof adore).",
                "C'est la fin de l'Uniers"
              ],
              correctAnswer: 0,
              explanation: "Correct !! Le Monstre ! Il y'a des divisions Divines Imparfaites (10/3 = 3,33333..). Le prof de CM2 te demands génerallement 2 ou 3 Chiffre Après et tu stopes tout ! Pas de Panique !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de Ferraille : J'abaisse un 0 Imaginaire Fantôme == ALORS Je tire Ma , Virgule !.",
            "Règle de Pulsion : Le dividence a Déja 1 Virgule ? = Je tire ma Virgule Resultat quand je passe La Frontière du dividende ! (Alerte rouge).",
            "Mémorisé : Si c'est l'Infini , je m'arrête à 3 Chiffes Apres."
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

export default Course_Primaire_CM2_04_Division_Quotient_Decimal;
