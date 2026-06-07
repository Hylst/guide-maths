import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Sigma, Scissors, Brackets, Expand, Scale, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_07_Calcul_Litteral: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Equation Balance Game State: 3x + 4 = 19
  const [balanceStep, setBalanceStep] = useState<number>(0); // 0: 3x + 4 = 19, 1: 3x = 15, 2: x = 5
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNextStep = (action: 'minus_4' | 'div_3' | 'wrong_action_1' | 'wrong_action_2') => {
    setErrorMessage(null);
    if (balanceStep === 0) {
      if (action === 'minus_4') {
        setBalanceStep(1);
      } else {
        setErrorMessage("Mince ! Si vous faites cela, le calcul devient très lourd. Retirez d'abord le terme constant '+ 4' !");
      }
    } else if (balanceStep === 1) {
      if (action === 'div_3') {
        setBalanceStep(2);
      } else {
        setErrorMessage("Non ! Divisez par le coefficient de x (qui est 3) pour obtenir un seul x tout seul !");
      }
    }
  };

  const handleResetGame = () => {
    setBalanceStep(0);
    setErrorMessage(null);
  };

  return (
    <div id="litteral-course-root" className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        id="litteral-header"
        acronym="MATH-3EME-07"
        title="Calcul Littéral et Équations"
        subtitle="Menez l'enquête, libérez les parenthèses et percez le secret de l'inconnue X !"
        duration="1h 30"
        level="3ème (Cycle 4)"
        prerequisites={[
          "Règles des signes (multiplication de négatifs)",
          "Priorités des opérations",
          "Calcul fractionnaire simple"
        ]}
        objectives={[
          "Réduire des expressions algébriques (marier les familles x², x et nombres).",
          "Développer à l'aide de la simple et de la double distributivité.",
          "Factoriser une expression en dénichant le Facteur Commun cache.",
          "Résoudre des équations du premier degré avec la balance algebraïque.",
          "Maîtriser la règle sacrée de l'Équation-Produit Nul."
        ]}
      />

      <Section id="intro" title="🌟 Introduction : Pourquoi mettre des lettres dans vos calculs ?" icon="🔠" color="slate">
        <p>
          Pourquoi les mathématiciens ont-ils introduit des lettres au beau milieu des nombres ? Simplement parce qu'on ne connaît pas certaines valeurs terrestres !
        </p>
        <p className="mt-4">
          La lettre <strong>{"$x$"}</strong> n'est pas une énigme insoluble : elle est comme un <strong>coffre mystère</strong> fermé. Le calcul littéral est l'art sublime de déplacer ces coffres, de les ranger et de les distribuer sans avoir besoin de les ouvrir immédiatement. C'est le langage universel de la physique (trajectoires spatiales, vitesse de la lumière) et des formules financières à travers les siècles.
        </p>
      </Section>

      {/* SVG INTERACTIVE APPLET SCHEMA: THE BALANCE SCALE SOLVER */}
      <Section id="balance-scale" title="⚖️ La Balance d'Équation Interactive" icon="⚖️" color="indigo">
        <TipBanner id="balance-banner" title="Manipulez la balance pour isoler l'inconnu X" type="info">
          Résolvons l'équation d'examen : <strong>{"$3x + 4 = 19$"}</strong>. 
          Votre but est d'effectuer les opérations symétriques parfaites pour laisser une seule boîte {"$x$"} seule sur le plateau de gauche !
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-8 items-stretch bg-card border border-border-strong rounded-[2rem] p-6 shadow-md">
          {/* Action controller Panel - 5 cols */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-2xs uppercase tracking-wider text-slate-400 font-bold block">Étape de résolution actuelle :</span>
              
              <div className="bg-slate-50 dark:bg-slate-950 p-4 border rounded-2xl">
                {balanceStep === 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-500">Équation de départ :</p>
                    <div className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-wide text-center">
                      {"$3x + 4 = 19$"}
                    </div>
                  </div>
                )}
                {balanceStep === 1 && (
                  <div className="space-y-1 animate-pulse">
                    <p className="text-sm font-bold text-emerald-600">Étape 2 : Termes constants retirés</p>
                    <div className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-wide text-center">
                      {"$3x = 15$"}
                    </div>
                  </div>
                )}
                {balanceStep === 2 && (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-emerald-600">Félicitations ! Équation résolue :</p>
                    <div className="font-mono text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-wide text-center">
                      {"$x = 5$"}
                    </div>
                  </div>
                )}
              </div>

              {balanceStep < 2 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Choisissez l'opération suivante :</span>
                  
                  {balanceStep === 0 && (
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => handleNextStep('minus_4')}
                        className="py-3 px-4 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-xl text-left flex items-center justify-between transition"
                      >
                        <span>Retirer 4 sur les deux plateaux ({"$- 4$"})</span>
                        <ArrowRight size={14} />
                      </button>
                      <button 
                        onClick={() => handleNextStep('wrong_action_1')}
                        className="py-3 px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs rounded-xl text-left flex items-center justify-between transition"
                      >
                        <span>Diviser par 3 d'emblée ({"$/ 3$"})</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}

                  {balanceStep === 1 && (
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => handleNextStep('div_3')}
                        className="py-3 px-4 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-xl text-left flex items-center justify-between transition"
                      >
                        <span>Diviser par 3 les deux plateaux ({"$/ 3$"})</span>
                        <ArrowRight size={14} />
                      </button>
                      <button 
                        onClick={() => handleNextStep('wrong_action_2')}
                        className="py-3 px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs rounded-xl text-left flex items-center justify-between transition"
                      >
                        <span>Retirer 3 sur les deux plateaux ({"$- 3$"})</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 p-3 rounded-xl font-bold border-l-4 border-rose-500 animate-bounce">
                {errorMessage}
              </p>
            )}

            {balanceStep === 2 && (
              <div className="bg-emerald-50 dark:bg-emerald-990/20 p-4 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <CheckCircle className="text-emerald-500 flex-shrink-0" />
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold leading-normal">
                  L'univers s'aligne ! La balance est parfaitement équilibrée. {"$x = 5$"} est l'unique solution magique de l'équation !
                </p>
              </div>
            )}

            <button 
              onClick={handleResetGame}
              className="py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-2 w-fit select-none"
            >
              <RefreshCw size={14} /> Réinitialiser
            </button>
          </div>

          {/* SVG Balance Scale Visualizer - 7 cols */}
          <div className="md:col-span-7 flex flex-col justify-between items-center bg-slate-50 dark:bg-slate-950 border border-dashed rounded-3xl p-4">
            <span className="text-2xs font-extrabold tracking-widest text-slate-400 uppercase select-none">Bilan Géométrique de la Balance</span>

            <div className="relative w-full h-52 flex items-center justify-center my-2">
              <svg className="w-72 h-44" viewBox="0 0 280 180">
                {/* Horizontal Pivot beam */}
                <line x1="60" y1="90" x2="220" y2="90" stroke="currentColor" strokeWidth="6" className="text-indigo-900/60 dark:text-indigo-500/40" />
                {/* Central Fulcrum stand */}
                <polygon points="140,90 120,150 160,150" fill="currentColor" className="text-indigo-900 dark:text-indigo-400" />
                <circle cx="140" cy="90" r="6" fill="#a855f7" />

                {/* Left Plate hook and wire */}
                <line x1="60" y1="90" x2="60" y2="120" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                {/* Left Plate Pan */}
                <line x1="30" y1="120" x2="90" y2="120" stroke="currentColor" strokeWidth="4" className="text-indigo-900 dark:text-indigo-600" />

                {/* Right Plate hook and wire */}
                <line x1="220" y1="90" x2="220" y2="120" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                {/* Right Plate Pan */}
                <line x1="190" y1="120" x2="250" y2="120" stroke="currentColor" strokeWidth="4" className="text-indigo-900 dark:text-indigo-600" />

                {/* Left plate items rendering depends on game state */}
                {balanceStep === 0 && (
                  <g>
                    {/* 3 boxes (x) on Left plate */}
                    <rect x="35" y="98" width="14" height="20" rx="2" fill="#4f46e5" stroke="white" strokeWidth="1" />
                    <text x="39" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>

                    <rect x="51" y="98" width="14" height="20" rx="2" fill="#4f46e5" stroke="white" strokeWidth="1" />
                    <text x="55" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>

                    <rect x="67" y="98" width="14" height="20" rx="2" fill="#4f46e5" stroke="white" strokeWidth="1" />
                    <text x="71" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>

                    {/* 4 small weight dots */}
                    <circle cx="42" cy="118" r="3" fill="#f59e0b" />
                    <circle cx="50" cy="118" r="3" fill="#f59e0b" />
                    <circle cx="58" cy="118" r="3" fill="#f59e0b" />
                    <circle cx="66" cy="118" r="3" fill="#f59e0b" />
                  </g>
                )}

                {balanceStep === 1 && (
                  <g>
                    {/* 3 boxes (x) on Left plate */}
                    <rect x="38" y="98" width="14" height="20" rx="2" fill="#4f46e5" stroke="white" strokeWidth="1" />
                    <text x="42" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>

                    <rect x="54" y="98" width="14" height="20" rx="2" fill="#4f46e5" stroke="white" strokeWidth="1" />
                    <text x="58" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>

                    <rect x="70" y="98" width="14" height="20" rx="2" fill="#4f46e5" stroke="white" strokeWidth="1" />
                    <text x="74" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>
                  </g>
                )}

                {balanceStep === 2 && (
                  <g>
                    {/* Exactly 1 box (x) left */}
                    <rect x="53" y="98" width="14" height="20" rx="2" fill="#10b981" stroke="white" strokeWidth="1" />
                    <text x="57" y="112" fontSize="10" fill="white" fontWeight="bold">x</text>
                  </g>
                )}

                {/* Right Plate items rendering */}
                {balanceStep === 0 && (
                  <g>
                    {/* 19 compact weight dots represents value */}
                    {Array.from({ length: 19 }).map((_, idx) => {
                      const rRow = Math.floor(idx / 5);
                      const rCol = idx % 5;
                      return (
                        <circle 
                          key={idx} 
                          cx={198 + rCol * 9} 
                          cy={115 - rRow * 8} 
                          r="3" 
                          fill="#f59e0b" 
                        />
                      );
                    })}
                  </g>
                )}

                {balanceStep === 1 && (
                  <g>
                    {/* Exactly 15 weight dots */}
                    {Array.from({ length: 15 }).map((_, idx) => {
                      const rRow = Math.floor(idx / 5);
                      const rCol = idx % 5;
                      return (
                        <circle 
                          key={idx} 
                          cx={202 + rCol * 9} 
                          cy={115 - rRow * 8} 
                          r="3" 
                          fill="#f59e0b" 
                        />
                      );
                    })}
                  </g>
                )}

                {balanceStep === 2 && (
                  <g>
                    {/* Exactly 5 weight dots */}
                    <circle cx="205" cy="116" r="3" fill="#10b981" />
                    <circle cx="212" cy="116" r="3" fill="#10b981" />
                    <circle cx="219" cy="116" r="3" fill="#10b981" />
                    <circle cx="226" cy="116" r="3" fill="#10b981" />
                    <circle cx="233" cy="116" r="3" fill="#10b981" />
                  </g>
                )}
              </svg>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Chaque opération algébrique est une transformation bilatérale parfaite : elle s'exécute séparément mais identiquement à gauche et à droite pour préserver l'égalité de la balance.
            </p>
          </div>
        </div>
      </Section>

      <Section id="reduire" title="1. Réduire (Le grand rangement par familles)" icon="🧹" color="indigo">
        <p className="mb-4">
          Dans le royaume de l'algèbre, il est formellement interdit de sommer des pommes et des bananes. Pour clarifier notre équation, on ne peut additionner ou soustraire que les termes faisant partie de la <strong>MÊME FAMILLE</strong>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-rose-50/50 dark:bg-rose-900/20 py-4 px-2 rounded-2xl border border-rose-100 dark:border-rose-900/40">
             <div className="text-rose-500 mb-1"><Sigma size={24} className="mx-auto" /></div>
             <p className="font-bold text-rose-900 dark:text-rose-100">La Famille des {"$x^2$"}</p>
             <p className="text-xs text-muted-text">Elle ne se fusionne jamais avec un x habituel.</p>
          </div>
          <div className="bg-sky-50 dark:bg-sky-900/20 py-4 px-2 rounded-2xl border border-sky-200 dark:border-sky-900/40">
             <div className="text-sky-500 mb-1 text-xl font-bold">x</div>
             <p className="font-bold text-sky-800 dark:text-sky-200">La Famille des {"$x$"}</p>
             <p className="text-xs text-muted-text">Les coffres mystères simples.</p>
          </div>
          <div className="bg-amber-50/50 dark:bg-amber-900/20 py-4 px-2 rounded-2xl border border-amber-100 dark:border-amber-900/40">
             <div className="text-amber-500 mb-1"><span className="font-mono text-xl font-bold">42</span></div>
             <p className="font-bold text-amber-900 dark:text-amber-100">Les Nombres Seuls</p>
             <p className="text-xs text-muted-text">Aussi appelés les constantes.</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-[2rem] border border-border-strong shadow-sm my-6 font-mono text-sm md:text-base space-y-4">
          <p className="font-sans font-bold text-slate-700 dark:text-slate-300">Exemple concret de réduction :</p>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl space-y-2 border">
            <div>
              <span className="text-slate-400">Enoncé : </span>
              A = <span className="text-rose-500">5x²</span> + <span className="text-sky-500">3x</span> <span className="text-rose-500">- 2x²</span> + <span className="text-amber-500">8</span> <span className="text-sky-500">- 5x</span>
            </div>
            <div>
              <span className="text-slate-400">Rapatriement : </span>
              A = (<span className="text-rose-500">5x² - 2x²</span>) + (<span className="text-sky-500">3x - 5x</span>) + <span className="text-amber-500">8</span>
            </div>
            <div className="font-bold text-emerald-600">
              <span className="text-slate-400">Total Réduit : </span>
              A = 3x² - 2x + 8
            </div>
          </div>
        </div>
        
        <InfoBlock id="trap-mult" title="L'exception fatale de la multiplication !" type="warning">
          Sachez distinguer les lois ! La barrière hermétique des familles s'effondre en cas de <strong>multiplication</strong> ! <br />
          Toutes les entités s'assemblent ensemble sans limite :
          <br />
          <code>{"$2 \\times 5x = 10x$"}</code> (On multiplie les coefficients)
          <br />
          <code>{"$x \\times x = x^2$"}</code> (X au carré)
          <br />
          <code>{"$3x \\times 4x = 12x^2$"}</code> (Le coefficient multiplie le coefficient, et la lettre multiplie le x !)
        </InfoBlock>

        <InfoBlock title="Le saviez-vous ? L'homme qui remplaça les nombres par des lettres" type="funfact">
          C&apos;est le mathématicien français <strong>François Viète</strong>, conseiller à la cour du Roi de France Henri IV au XVIe siècle, qui a eu l&apos;idée révolutionnaire de désigner de manière systématique les inconnues et les paramètres par des consonnes et des voyelles de l&apos;alphabet. Cette avancée, appelée la « logistique spécieuse », a rendu possible l&apos;écriture de formules universelles au lieu de longs textes descriptifs fatigants !
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Al-Jabr et Al-Muqabala">
          Le mot « algèbre » que tu étudies aujourd&apos;hui vient du titre d&apos;un livre rédigé au IXe siècle par Al-Khwarizmi. Il y décrit deux opérations majeures pour résoudre des équations :
          <br />- <strong>Al-Jabr</strong> (la « restauration ») : l&apos;action de faire passer un terme négatif d&apos;un côté d&apos;une équation de l&apos;autre côté sous forme positive.
          <br />- <strong>Al-Muqabala</strong> (la « confrontation ») : l&apos;action de simplifier les termes identiques et de même signe situés sur les deux balances de plateaux de l&apos;égalité.
        </InfoBlock>
      </Section>

      <Section id="developper" title="2. Développer (L'art d'abattre les parenthèses)" icon="💣" color="emerald">
        <p className="mb-4">
          Développer, c'est l'art d'opérer une métamorphose : transformer un <strong>Produit</strong> (une multiplication pesée sur une parenthèse) en une grande <strong>Somme</strong> plate.
        </p>
        
        <h3 className="text-lg font-bold mt-6 mb-4 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Expand size={20} /> A. La Simple Distributivité
        </h3>
        <p className="mb-4 text-sm text-slate-500">
          Le nombre unique devant la porte (facteur) distribue et multiplie TOUTES les entités présentes dans le salon (la parenthèse).
        </p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-950/15 p-6 rounded-2xl border border-emerald-100 text-center font-mono text-xl shadow-sm mb-8 space-y-2">
           <p className="font-bold text-emerald-950 dark:text-emerald-100">k(a + b) = ka + kb</p>
           <hr className="border-emerald-100 my-2" />
           <p className="text-rose-500 font-bold">5(2x - 3)</p>
           <p className="text-xs text-slate-400">↓ Distribution ↓</p>
           <p className="text-sm text-foreground">(5 × 2x) - (5 × 3)</p>
           <p className="text-xs text-slate-400">↓ Simplification de coefficients ↓</p>
           <p className="text-emerald-600 dark:text-emerald-400 font-black">10x - 15</p>
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4 flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
          <Brackets size={20} /> B. La Double Distributivité (Le Grand Mariage)
        </h3>
        <p className="mb-4 text-sm text-slate-500">
          Quand deux maisons fermées se croisent. Chaque invité de la première parenthèse doit distribuer des cartes et saluer (multiplier) chacun des invités du second foyer. Ce qui fait exactement 4 cascades de calculs.
        </p>
        
        <InteractiveExercise 
          title="Exercice Interactif : Double Distributivité"
          question={<>Apprivoisez et développez pas-à-pas l'expression brevetée : <strong>{"$(x + 3)(x + 4)$"}</strong></>}
          steps={[
            <>
              <strong>Première flèche logique :</strong> Le premier x multiplie le premier x du second terme.
              <br />
              <code>{"$x \\times x = x^2$"}</code>.
            </>,
            <>
              <strong>Deuxième flèche logique :</strong> Le premier x croise la constante +4.
              <br />
              <code>{"$x \\times 4 = +4x$"}</code>.
            </>,
            <>
               <strong>Troisième flèche logique :</strong> La constante +3 se lance et multiplie le x.
               <br />
               <code>{"$3 \\times x = +3x$"}</code>.
            </>,
            <>
               <strong>Quatrième flèche logique :</strong> La constante +3 croise le chiffre +4.
               <br />
               <code>{"$3 \\times 4 = +12$"}</code>.
            </>,
            <>
               <strong>Rapatriement et Réduction de l'expression :</strong>
               <br />
               On assemble le butin brut : <code>{"$x^2 + 4x + 3x + 12$"}</code>.
               <br />
               On réduit la famille x (<code>{"$4x + 3x = 7x$"}</code>).
               <br />
               <span className="text-emerald-600 dark:text-emerald-400 font-bold">Total Final : {"$x^2 + 7x + 12$"}</span>.
            </>
          ]}
        />
      </Section>

      <Section id="factoriser" title="3. Factoriser (La compression de données)" icon="🗜️" color="indigo">
        <p className="mb-4">
          Factoriser est l'opération rigoureusement <strong>inverse de développer</strong>. C'est créer un fichier d'archives compresses .zip : transformer une longue ligne d'additions en un produit de parenthèses. Nous devons retrouver le coupable : le <strong>Facteur Commun</strong>.
        </p>
        
        <div className="bg-sky-50 dark:bg-sky-900/10 p-6 rounded-[2rem] border border-sky-100 my-6 shadow-sm">
           <h4 className="font-bold text-sky-800 dark:text-sky-300 text-lg mb-4 pb-2 border-b border-sky-100">Algorithme d'extraction : Factoriser B = 21x - 14</h4>
           <ol className="space-y-4 font-normal text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              <li>
                 <span className="font-bold text-sky-600">Etape 1 : Le détective de table.</span> <br />
                 Existe-t-il un diviseur commun magique caché derrière '21' et '14' ? Oui, ils dorment tous les deux dans la table sacrée de 7 !
              </li>
              <li>
                 <span className="font-bold text-sky-600">Etape 2 : Écrire visiblement les parts.</span> <br />
                 Ré-écrivons la ligne avec notre complice : <br />
                 <code>B = (<strong className="text-rose-500">7</strong> × 3x) - (<strong className="text-rose-500">7</strong> × 2)</code>
              </li>
              <li>
                 <span className="font-bold text-sky-600">Etape 3 : Sortir le facteur commun devant la porte.</span> <br />
                 On rassemble le coupable unique en tête et l'on range les résidus délaissés à l'intérieur d'une unique grande parenthèse : <br />
                 <code className="text-emerald-600 dark:text-indigo-400 font-bold">B = 7(3x - 2)</code>
              </li>
           </ol>
        </div>
      </Section>

      <Section id="produit-nul" title="4. Le Graal du Brevet : Équations-Produits Nul" icon="🔑" color="amber">
        <p className="mb-4">
          C'est le type d'équations le plus populaire du Brevet ! Une équation-produit nul se présente typiquement ainsi : <strong>{"$(ax + b)(cx + d) = 0$"}</strong>.
        </p>

        <p className="mb-4 text-muted-text leading-relaxed">
          Comment un produit de deux parenthèses peut-il être égal à zéro ? <br />
          Rappelez-vous : pour qu'une multiplication de deux entiers soit nulle, il suffit impérativement que l'un ou l'autre de ces nombres soit nul !
        </p>

        <div className="bg-amber-50/50 dark:bg-amber-950/15 p-6 rounded-3xl border border-amber-200/60 shadow-sm my-6">
          <p className="text-sm font-extrabold uppercase text-amber-800 dark:text-amber-400 mb-2">Théorème de Nullité</p>
          <div className="font-mono text-center font-bold text-base md:text-lg bg-background py-3 border border-dashed rounded-xl block mb-4">
            Un produit de facteurs est nul si, et seulement si, au moins l'un des facteurs est nul. 
            <br />
            <code>{"$A \\times B = 0 \\iff A = 0 \\text{ ou } B = 0$"}</code>
          </div>

          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Exemple d'exercice résolu :</p>
          <p className="text-sm text-slate-500 my-1">
            Résolvons <code>{"$(2x - 10)(3x + 12) = 0$"}</code>.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2 text-sm text-slate-600 dark:text-slate-450">
            <li><strong>Soit la 1ère parenthèse est nulle :</strong> <code>{"$2x - 10 = 0 \\iff 2x = 10 \\iff x = 5$"}</code></li>
            <li><strong>Soit la 2nde parenthèse est nulle :</strong> <code>{"$3x + 12 = 0 \\iff 3x = -12 \\iff x = -4$"}</code></li>
          </ul>
          <p className="font-bold text-emerald-600 text-sm mt-3 border-t pt-2">
            Cette expression possède donc deux évaluable solutions distinctes : x = 5 et x = -4.
          </p>
        </div>
      </Section>

      {/* TWO EXERCICES RESOLUS METHOD SECTION */}
      <Section id="methodes-resolues" title="✏️ Dossier de Méthodologie" icon="✍️" color="emerald">
        
        {/* Exercise 1 */}
        <InteractiveExercise 
          title="Exercice 1 : Double Distributivité avec soustraction"
          question={(
            <div>
              <p className="mb-2">
                On considère l'expression littérale complexe suivante :
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border text-center font-mono my-3">
                {"$C = (2x - 3)(x + 5) - (3x^2 - 10x)$"}
              </div>
              <p className="font-bold">
                Développer et réduire au maximum l'expression {"$C$"}. Attention au piège du signe moins devant la parenthèse !
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Développer la première double distributivité :</strong>
              <p className="mt-1 text-slate-600 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                (2x - 3)(x + 5) = (2x × x) + (2x × 5) + (-3 × x) + (-3 × 5)
                <br />
                = 2x² + 10x - 3x - 15
                <br />
                = 2x² + 7x - 15
              </p>
            </>,
            <>
              <strong>2. Gérer le signe Moins de barrage :</strong>
              <p className="mt-1 text-slate-600">
                Puisque nous soustrayons le second bloc <code>{"$(3x^2 - 10x)$"}</code>, nous devons obligatoirement <strong>inverser les signes de TOUTES les forces situées à l'intérieur de sa structure</strong> :
                <br />
                <code>{"$- (3x^2 - 10x) = -3x^2 + 10x$"}</code>.
              </p>
            </>,
            <>
              <strong>3. Concaténation de tous les éléments formels :</strong>
              <p className="mt-1 text-slate-600">
                Alignons notre butin complet à l'unisson :
                <br />
                <code>{"C = 2x^2 + 7x - 15 - 3x^2 + 10x$"}</code>.
              </p>
            </>,
            <>
              <strong>4. La réduction finale par familles :</strong>
              <p className="mt-1 text-slate-600">
                - Famille des x² : <code>{"$2x^2 - 3x^2 = -x^2$"}</code>
                <br />
                - Famille des x : <code>{"$7x + 10x = 17x$"}</code>
                <br />
                - Constante : <code>$-15</code>
                <br />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Résultat final réduit : {"$C = -x^2 + 17x - 15$"}</span>.
              </p>
            </>
          ]}
        />

        {/* Exercise 2 */}
        <InteractiveExercise 
          title="Exercice 2 : Résolution d'équations avec tri"
          question={(
            <div>
              <p className="mb-2">
                On demande de résoudre l'équation du premier degré avec x de part et d'autre :
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border text-center font-mono my-3">
                {"$7x - 4 = 3x + 16$"}
              </div>
            </div>
          )}
          steps={[
            <>
              <strong>1. Rapatrier d'abord tous les x à gauche de la balance :</strong>
              <p className="mt-1 text-slate-600">
                L'élément <code>+ 3x</code> à droite nous dérange. On retire <code>3x</code> des deux côtés de la balance :
                <br />
                <code>{"$7x - 3x - 4 = 16$"}</code> qui donne <code>{"$4x - 4 = 16$"}</code>.
              </p>
            </>,
            <>
              <strong>2. Chasser l'élément constant vers la droite de l'égout :</strong>
              <p className="mt-1 text-slate-600">
                Pour neutraliser le <code>- 4</code> sur le plateau gauche, on effectue un <code>+ 4</code> des deux côtés :
                <br />
                <code>{"$4x = 16 + 4$"}</code> s'écrit donc <code>{"$4x = 20$"}</code>.
              </p>
            </>,
            <>
               <strong>3. Division finale par le coefficient :</strong>
               <p className="mt-1 text-slate-600">
                 On divise par 4 l'intégralité des plateaux pour libérer x tout seul :
                 <br />
                 <code>{"$x = \\frac{20}{4} = 5$"}</code>.
                 <br />
                 <span className="text-emerald-600 font-bold block mt-2">La solution unique de l'équation est 5 !</span>
               </p>
            </>
          ]}
        />
      </Section>

      <Section id="flashcards" title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Développez instantanément l'expression affinée : <strong>2x(4x + 3)</strong> ?</>}
            back={<>On distribue le facteur commun !<br/>2x × 4x = 8x²<br/>2x × 3 = 6x<br/>Résultat cumulé : <strong>8x² + 6x</strong>.</>}
          />
          <Flashcard 
            front={<>Quelle est la solution de l'équation-produit : <strong>(x - 3)(x + 7) = 0</strong> ?</>}
            back={<>Soit x - 3 = 0, donc <strong>x = 3</strong> !<br/>Soit x + 7 = 0, donc <strong>x = -7</strong> !<br/>Les deux solutions sont 3 et -7.</>}
          />
          <Flashcard 
            front={<>Comment s'appelle l'opération consistant à transformer une somme en produit ?</>}
            back={<>C'est la <strong>Factorisation</strong> (l'inverse exact de développer).</>}
          />
          <Flashcard 
            front={<>Une soustraction isolée devant des parenthèses, ex : -(x - 5)... Que se passe-t-il ?</>}
            back={<>C'est un inverseur de signes fatidique !<br/>-(x - 5) équivaut à <strong>-x + 5</strong>. Ne l'oubliez pas le jour du brevet !</>}
          />
        </div>
      </Section>

      <Section id="faq" title="❓ FAQ de l'Algorithme" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi enlève-t-on silencieusement le symbole de multiplication '×' en algèbre ?",
              answer: "Parce que le vieux symbole '×' ressemble trop fidèlement à la lettre 'x' ! Pour abréger l'écriture et éviter de devenir fou de confusion, on a décrété de manière officielle que '3x' désigne un amour invisible : 3 multiplié par x."
            },
            {
              question: "Qu'est ce que ça veut dire qu'une équation est du '1er degré' ?",
              answer: "Le degré est la puissance maximale de notre inconnue x. Au 1er degré, l'inconnue a un exposant simple invisible égal à 1 (x). Dès que vous rencontrez du x², vous basculez dans les équations du second degré."
            },
            {
              question: "Le facteur commun peut-il être une parenthèse entière ?",
              answer: "Deux fois oui ! Dans l'expression (x + 2)(x - 5) + 3(x + 2), vous pouvez observer que la parenthèse entière (x + 2) est présente dans les deux camps. Son extraction donne : (x + 2)[(x - 5) + 3] = (x + 2)(x - 2)."
            }
          ]}
        />
      </Section>

      <Section id="quiz" title="🥇 Épreuve Finale d'Isolations" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'expression parfaitement factorisée de A = 12x + 18 ?",
              options: [
                "6(2x + 3)",
                "2x(6 + 9)",
                "3(4x + 5)"
              ],
              correctAnswer: 0,
              explanation: "Bien joué ! Le diviseur commun maximal de 12 et 18 est 6. En extrayant 6, on obtient bien 6(2x + 3)."
            },
            {
              question: "Quelle est la solution unique de l'équation 3x + 15 = 0 ?",
              options: [
                "x = 5",
                "x = -5",
                "Il n'y a pas de solution."
              ],
              correctAnswer: 1,
              explanation: "Top ! Pour résoudre : 3x = -15, donc x = -15 / 3 = -5. En remplaçant x par -5 : 3×(-5)+15 = -15+15 = 0."
            },
            {
              question: "Combien d'issues solutions distinctes possède l'équation-produit (2x - 8)(x + 5) = 0 ?",
              options: [
                "Une seule et unique solution",
                "Deux solutions (4 et -5)",
                "Aucune solution"
              ],
              correctAnswer: 1,
              explanation: "Parfait ! Un produit de facteur est nul si l'un de ses facteurs est nul. Soit 2x-8 = 0, ce qui donne x=4. Soit x+5 = 0, ce qui donne x=-5."
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="essentials-checklist"
          items={[
            "Règle de fer des familles : je n'associe jamais les x² avec les x ordinaires.",
            "Je sais distribuer un facteur de manière simple ou double.",
            "Je maîtrise l'isolation d'un inconnu sur notre balance géométrique.",
            "J'ai compris l'indispensable théorème de nullité pour les équations-produit."
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

export default Course_College_3eme_07_Calcul_Litteral;
