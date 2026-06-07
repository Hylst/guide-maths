import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Globe, BookOpen, Diamond, Crown, Sparkles } from 'lucide-react';

const Course_Primaire_CM1_01_Grands_Nombres: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [selectedClass, setSelectedClass] = useState<'millions' | 'mille' | 'simple'>('simple');
  const [customNum, setCustomNum] = useState<string>('124580300');

  const getD = (index: number) => {
    const padded = customNum.padStart(9, '0');
    return padded[index] || '0';
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CM1-01"
        title="Les Grands Nombres (Les Millions)"
        subtitle="Entrer dans la cour des Grands avec les Nombres Géants"
        duration="40min"
        level="CM1"
        prerequisites={["Les Nombres jusqu'à 10 000 (Mille)"]}
        objectives={[
          "Comprendre La Classe des Mille puis La Classe des Millions.",
          "Lire un nombre géant sans bégayer.",
          "Décomposer (Le Grand Écartelage) !"
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Le CM1 marque l'entrée progressive dans la classe des millions. L'enjeu majeur est d'aider l'enfant à structurer sa lecture et sa décomposition en "classes" (maisons de 3 chiffres : unités, milliers, millions) plutôt qu'en une suite brute de chiffres. L'utilisation d'espaces ("le vide magique") est l'outil visuel le plus puissant à acquérir pour automatiser la lecture sans bégayer.
      </InfoBlock>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 md:p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 my-8 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 mb-3 flex items-center gap-2">
          📖 Introduction : L'Espace et les trésors
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Au CE2, tu as appris à compter jusqu'à 9 999. C'est déjà beaucoup pour compter des billes ou des bonbons !
          Mais si tu deviens astronaute ou scientifique, ces nombres seront beaucoup trop petits. Sais-tu que la distance entre la Terre et la Lune est d'environ <strong>384 400</strong> kilomètres ? Et le Soleil ? Il est à environ <strong>150 000 000</strong> de kilomètres !
          Pour parler des étoiles, de l'univers, ou de la population d'un grand pays, nous devons utiliser la classe des <strong>Mille</strong> et découvrir la fabuleuse classe des <strong>Millions</strong>. Prépare-toi à manipuler des nombres géants !
        </p>
      </div>

      <Section title="1. La Maison des Nombres (Les 3 Pièces)" icon={<Globe className="w-6 h-6" />} color="indigo">
        <p className="mb-4">Un nombre géant, c'est comme un château. Il possède plusieurs <strong>grandes tours (les classes)</strong>, et chaque tour possède exactement <strong>3 fenêtres (Centaine, Dizaine, Unité)</strong>.</p>
        
        {/* Interactive Castle Widget */}
        <div className="bg-gradient-to-b from-indigo-50/40 to-slate-50/80 dark:from-slate-900/40 dark:to-slate-950/80 p-6 md:p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/50 my-8 shadow-inner">
          <h3 className="text-center font-bold font-sans text-indigo-950 dark:text-indigo-50 text-xl mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
            Le Château Interactif des Millions
          </h3>

          {/* Quick numbers selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <span className="text-sm font-medium text-slate-500 flex items-center mr-2">Essaye :</span>
            {[
              { label: "124 580 300", val: "124580300" },
              { label: "999 999 999", val: "999999999" },
              { label: "3 000 005", val: "003000005" },
              { label: "45 200", val: "000045200" }
            ].map((btn) => (
              <button 
                key={btn.val}
                onClick={() => setCustomNum(btn.val)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 text-xs font-bold font-mono rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Dynamic SVG Chateau Drawing */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <svg viewBox="0 0 600 280" className="w-full h-auto" id="chateau-svg">
              <defs>
                <linearGradient id="rose-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="amber-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
                <linearGradient id="emerald-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* BACKGROUND WALL */}
              <rect x="10" y="80" width="580" height="150" fill="#f1f5f9" rx="20" stroke="#cbd5e1" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-800" />

              {/* TOWER 1: MILLIONS */}
              <g 
                className="cursor-pointer transition-opacity" 
                onClick={() => setSelectedClass('millions')}
                opacity={selectedClass === 'millions' ? 1 : 0.7}
              >
                {/* Roof */}
                <path d="M 30 80 L 110 20 L 190 80 Z" fill="url(#rose-grad)" />
                {/* Tower body */}
                <rect x="40" y="80" width="140" height="140" fill="#ffe4e6" className="dark:fill-rose-950/40" stroke="#f43f5e" strokeWidth="3" rx="10" />
                {/* Tower banner */}
                <rect x="50" y="90" width="120" height="25" fill="#f43f5e" rx="5" />
                <text x="110" y="107" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">MILLIONS</text>
                
                {/* Windows Centaine, Dizaine, Unite */}
                {/* C */}
                <rect x="55" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#f43f5e" strokeWidth="2" rx="5" />
                <text x="72" y="142" fontSize="10" fontWeight="bold" fill="#9f1239" className="dark:fill-rose-300" textAnchor="middle" fontFamily="sans-serif">C</text>
                <text x="72" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(0)}</text>
                {/* D */}
                <rect x="93" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#f43f5e" strokeWidth="2" rx="5" />
                <text x="110" y="142" fontSize="10" fontWeight="bold" fill="#9f1239" className="dark:fill-rose-300" textAnchor="middle" fontFamily="sans-serif">D</text>
                <text x="110" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(1)}</text>
                {/* U */}
                <rect x="131" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#f43f5e" strokeWidth="2" rx="5" />
                <text x="148" y="142" fontSize="10" fontWeight="bold" fill="#9f1239" className="dark:fill-rose-300" textAnchor="middle" fontFamily="sans-serif">U</text>
                <text x="148" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(2)}</text>
              </g>

              {/* TOWER 2: MILLIERS (MILLE) */}
              <g 
                className="cursor-pointer transition-opacity" 
                onClick={() => setSelectedClass('mille')}
                opacity={selectedClass === 'mille' ? 1 : 0.7}
              >
                {/* Roof */}
                <path d="M 210 80 L 290 20 L 370 80 Z" fill="url(#amber-grad)" />
                {/* Tower body */}
                <rect x="220" y="80" width="140" height="140" fill="#fef9c3" className="dark:fill-amber-950/40" stroke="#eab308" strokeWidth="3" rx="10" />
                {/* Tower banner */}
                <rect x="230" y="90" width="120" height="25" fill="#eab308" rx="5" />
                <text x="290" y="107" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">MILLIERS (MILLE)</text>

                {/* Windows Centaine, Dizaine, Unite */}
                {/* C */}
                <rect x="235" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#eab308" strokeWidth="2" rx="5" />
                <text x="252" y="142" fontSize="10" fontWeight="bold" fill="#854d0e" className="dark:fill-amber-300" textAnchor="middle" fontFamily="sans-serif">C</text>
                <text x="252" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(3)}</text>
                {/* D */}
                <rect x="273" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#eab308" strokeWidth="2" rx="5" />
                <text x="290" y="142" fontSize="10" fontWeight="bold" fill="#854d0e" className="dark:fill-amber-300" textAnchor="middle" fontFamily="sans-serif">D</text>
                <text x="290" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(4)}</text>
                {/* U */}
                <rect x="311" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#eab308" strokeWidth="2" rx="5" />
                <text x="328" y="142" fontSize="10" fontWeight="bold" fill="#854d0e" className="dark:fill-amber-300" textAnchor="middle" fontFamily="sans-serif">U</text>
                <text x="328" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(5)}</text>
              </g>

              {/* TOWER 3: UNITÉS SIMPLES */}
              <g 
                className="cursor-pointer transition-opacity" 
                onClick={() => setSelectedClass('simple')}
                opacity={selectedClass === 'simple' ? 1 : 0.7}
              >
                {/* Roof */}
                <path d="M 390 80 L 470 20 L 550 80 Z" fill="url(#emerald-grad)" />
                {/* Tower body */}
                <rect x="400" y="80" width="140" height="140" fill="#d1fae5" className="dark:fill-emerald-950/40" stroke="#10b981" strokeWidth="3" rx="10" />
                {/* Tower banner */}
                <rect x="410" y="90" width="120" height="25" fill="#10b981" rx="5" />
                <text x="470" y="107" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">UNITÉS SIMPLES</text>

                {/* Windows Centaine, Dizaine, Unite */}
                {/* C */}
                <rect x="415" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#10b981" strokeWidth="2" rx="5" />
                <text x="432" y="142" fontSize="10" fontWeight="bold" fill="#065f46" className="dark:fill-emerald-300" textAnchor="middle" fontFamily="sans-serif">C</text>
                <text x="432" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(6)}</text>
                {/* D */}
                <rect x="453" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#10b981" strokeWidth="2" rx="5" />
                <text x="470" y="142" fontSize="10" fontWeight="bold" fill="#065f46" className="dark:fill-emerald-300" textAnchor="middle" fontFamily="sans-serif">D</text>
                <text x="470" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(7)}</text>
                {/* U */}
                <rect x="491" y="125" width="34" height="50" fill="#ffffff" className="dark:fill-slate-800" stroke="#10b981" strokeWidth="2" rx="5" />
                <text x="508" y="142" fontSize="10" fontWeight="bold" fill="#065f46" className="dark:fill-emerald-300" textAnchor="middle" fontFamily="sans-serif">U</text>
                <text x="508" y="168" fontSize="22" fontWeight="black" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontFamily="monospace">{getD(8)}</text>
              </g>

              {/* GROUND LINES */}
              <line x1="10" y1="230" x2="590" y2="230" stroke="#475569" strokeWidth="4" />
            </svg>
          </div>

          {/* Interactive Info Board */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            {selectedClass === 'millions' && (
              <div className="animate-fade-in">
                <h4 className="font-bold text-lg text-rose-600 dark:text-rose-400 mb-2">Classe des Millions (Fortresse de Gauche)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Cette classe regroupe les unités de millions. Les chiffres sont : <strong className="font-mono text-base">{getD(0)}{getD(1)}{getD(2)}</strong>.<br/>
                  On la lit : <strong>{parseInt(getD(0)+getD(1)+getD(2), 10)} Million(s)</strong> !
                </p>
              </div>
            )}
            {selectedClass === 'mille' && (
              <div className="animate-fade-in">
                <h4 className="font-bold text-lg text-amber-600 dark:text-amber-400 mb-2">Classe des Milliers / Mille (Tour du Milieu)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Cette classe regroupe les milliers. Les chiffres sont : <strong className="font-mono text-base">{getD(3)}{getD(4)}{getD(5)}</strong>.<br/>
                  On la lit : <strong>{parseInt(getD(3)+getD(4)+getD(5), 10) === 1 ? "" : parseInt(getD(3)+getD(4)+getD(5), 10)} Mille</strong> !
                </p>
              </div>
            )}
            {selectedClass === 'simple' && (
              <div className="animate-fade-in">
                <h4 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-2">Classe des Unités Simples (Tour de Droite)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  C'est la maison historique que tu connais depuis la maternelle ! Les chiffres sont : <strong className="font-mono text-base">{getD(6)}{getD(7)}{getD(8)}</strong>.<br/>
                  On la lit simplement : <strong>{parseInt(getD(6)+getD(7)+getD(8), 10)}</strong>.
                </p>
              </div>
            )}

            {/* Combined reading helper */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl font-medium">
              <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Lecture Globale :</span>
              <p className="text-base text-slate-800 dark:text-slate-200">
                <span className="text-rose-600 dark:text-rose-400 font-bold">{parseInt(getD(0)+getD(1)+getD(2), 10) > 0 ? `${parseInt(getD(0)+getD(1)+getD(2), 10)} million${parseInt(getD(0)+getD(1)+getD(2), 10) > 1 ? 's' : ''} ` : ''}</span>
                <span className="text-amber-500 font-bold">{parseInt(getD(3)+getD(4)+getD(5), 10) > 0 ? `${parseInt(getD(3)+getD(4)+getD(5), 10) === 1 ? 'mille' : `${parseInt(getD(3)+getD(4)+getD(5), 10)} mille`} ` : ''}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{parseInt(getD(6)+getD(7)+getD(8), 10) > 0 ? parseInt(getD(6)+getD(7)+getD(8), 10) : ''}</span>
              </p>
              <p className="text-xs font-mono text-slate-400 mt-2">
                Format avec espace obligatoire : {parseInt(getD(0)+getD(1)+getD(2), 10) > 0 ? `${parseInt(getD(0)+getD(1)+getD(2), 10)} ` : ''}{getD(3)+getD(4)+getD(5)} {getD(6)+getD(7)+getD(8)}
              </p>
            </div>
          </div>
        </div>

        <TipBanner title="L'Espace (Le Vide) est Obligatoire" type="info">
           On n'écrit JAMAIS un gros nombre tout collé (124580300). C'est la mort des yeux ! On DOIT LAISSER UN ESPACE VIDE entre chaque famille de 3 chiffres.
        </TipBanner>
      </Section>

      <Section title="2. Écrire le Monstre en Lettres (Les Pièges)" icon={<BookOpen className="w-6 h-6" />} color="rose">
        <p className="mb-4">Au CM1 le maître exige l'écriture PARFAITE !</p>

        <InteractiveExercise 
          title="Vingt ou Vingts ? Cent ou Cents ?"
          question={<>Comment écrire " 80 " et " 400 " sans rater l'épreuve ?</>}
          steps={[
            <><strong>1. Le S qui s'acroche :</strong> 80 s'écrit "Quatre-Vingts" (Avec un -S) à la fin !! Mais si il est suivi par qulequ'un... Le S tombe ! (Ex: "Quatre-Vingt-Trois" C'est SANS le S !).</>,
            <><strong>2. Pareil pour les Cents ! :</strong> 400 s'écrit "Quatre Cents" (-S). MAIS "Quatre Cent Quinze" perd le -S !</>,
            <><strong>3. Million et Milliard :</strong> Ce sont des Noms Communs ! Ils prennent TOUJOURS UN -S si ils sont plusieurs ! (Ex: Trois Millions).</>,
            <><strong>4. Mille L'immortel :</strong> Le mot "Mille" ne prend JAMAIS de (S) Jamais jamais jamais ! "Trois Mille" !</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le mot "Mille" s'écrit-il avec un S quand on dit : "Quatre Milles euros" ??</>}
            back={<><strong>JAMAIS DE S A MILLE !</strong><br/>C'est le seul qui est immortel est Invariable ! "Quatre <strong>Mille</strong>"</>}
          />
          <Flashcard 
            front={<>Le Monstre Vrai/Faux : "Je dois grouper mes chiffres par paquet de 4 pour les lire".</>}
            back={<><strong>FAUUUX !</strong><br/>L'univers est en paquet de 3 (Centaine, Diziane, Unité) !!</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Quelle est La PLUS BELLE écriture du Grand Boss de Fin ?",
              options: [
                "2569018",
                "2 569 018",
                "2 56 901 8"
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! On espace en paquets de 3 STRICTEMENT en partant de la FIN (des Unités à Droite) !"
            },
            {
              question: "Si j'écrit : ' Deux Millions Trois Cents ' ... Le mot 'Cent' prend il à -S à la fin ? ",
              options: [
                "Non Jamais.",
                "Oui car il n'y a Personne derrière lui ! Il cloture !.",
                "Non"
              ],
              correctAnswer: 1,
              explanation: "Top ! 300 C'est Cents (Avec un S !). Mais si y'avait 304, le 4 casserait le S pour faire (Trois Cent Quatre)."
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

export default Course_Primaire_CM1_01_Grands_Nombres;
