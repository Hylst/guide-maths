import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Play, HelpCircle, RefreshCw, Layers } from 'lucide-react';

// Payoffs representation
interface PayoffCell {
  a: number; // Player A payoff
  b: number; // Player B payoff
}

const Course_Licence_MIASHS_Jeux: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Game presets definitions
  const presets = {
    prisoner: {
      name: "Dilemme du Prisonnier",
      desc: "Conflit fondamental entre intérêt individuel (trahir) et efficacité collective (coopérer). L'unique équilibre de Nash est fortement dominé au sens de Pareto.",
      hg: { a: -1, b: -1 }, // Coop-Coop
      hd: { a: -10, b: 0 },  // Coop-Trahir
      bg: { a: 0, b: -10 },  // Trahir-Coop
      bd: { a: -5, b: -5 }   // Trahir-Trahir
    },
    staghunt: {
      name: "Chasse au Cerf (Stag Hunt)",
      desc: "Jeu de coordination sociale. Chasser le cerf requiert une coopération absolue. Chasser le lièvre est sûr mais rapporte peu. Deux équilibres purs coexistent.",
      hg: { a: 5, b: 5 },   // Cerf-Cerf
      hd: { a: 0, b: 3 },   // Cerf-Lièvre
      bg: { a: 3, b: 0 },   // Lièvre-Cerf
      bd: { a: 3, b: 3 }    // Lièvre-Lièvre
    },
    gender: {
      name: "Guerre des Sexes (Battle of the Sexes)",
      desc: "Jeu de coordination avec conflit de répartition : le joueur A préfère l'opéra, B préfère la boxe, mais tous deux préfèrent être ensemble plutôt que séparés.",
      hg: { a: 3, b: 2 },   // Opéra-Opéra
      hd: { a: 0, b: 0 },   // Opéra-Boxe
      bg: { a: 0, b: 0 },   // Boxe-Opéra
      bd: { a: 2, b: 3 }    // Boxe-Boxe
    },
    matching: {
      name: "Pennies Correspondant (Matching Pennies)",
      desc: "Jeu à somme nulle parfait sans aucun équilibre de Nash en stratégies pures. L'équilibre se résout uniquement au niveau probabiliste par des stratégies de bluff.",
      hg: { a: 1, b: -1 },  // Face-Face
      hd: { a: -1, b: 1 },  // Face-Pile
      bg: { a: -1, b: 1 },  // Pile-Face
      bd: { a: 1, b: -1 }   // Pile-Pile
    }
  };

  // Matrix payoff states
  const [activePreset, setActivePreset] = useState<keyof typeof presets>("prisoner");
  const [cellHG, setCellHG] = useState<PayoffCell>(presets.prisoner.hg);
  const [cellHD, setCellHD] = useState<PayoffCell>(presets.prisoner.hd);
  const [cellBG, setCellBG] = useState<PayoffCell>(presets.prisoner.bg);
  const [cellBD, setCellBD] = useState<PayoffCell>(presets.prisoner.bd);

  // Apply preset payoffs
  useEffect(() => {
    const p = presets[activePreset];
    setCellHG(p.hg);
    setCellHD(p.hd);
    setCellBG(p.bg);
    setCellBD(p.bd);
  }, [activePreset]);

  // Compute best responses
  // Player A chooses rows: HG vs BG (col G), and HD vs BD (col D)
  const isBestA_HG = cellHG.a >= cellBG.a;
  const isBestA_BG = cellBG.a >= cellHG.a;
  const isBestA_HD = cellHD.a >= cellBD.a;
  const isBestA_BD = cellBD.a >= cellHD.a;

  // Player B chooses columns: HG vs HD (row H), and BG vs BD (row B)
  const isBestB_HG = cellHG.b >= cellHD.b;
  const isBestB_HD = cellHD.b >= cellHG.b;
  const isBestB_BG = cellBG.b >= cellBD.b;
  const isBestB_BD = cellBD.b >= cellBG.b;

  // Identify Nash Equilibria (Both are best responses)
  const isNash_HG = isBestA_HG && isBestB_HG;
  const isNash_HD = isBestA_HD && isBestB_HD;
  const isNash_BG = isBestA_BG && isBestB_BG;
  const isNash_BD = isBestA_BD && isBestB_BD;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-LIC-MIASHS"
        title="Licence MIASHS : Théorie des Jeux"
        subtitle="Modélisation formalisée de la rationalité collective, équilibre de Nash pur et mixte, et équilibre de Pareto."
        duration="1h 35"
        level="Licence MIASHS (L2/L3)"
        prerequisites={["Probabilités simples (loi uniforme)", "Calcul matriciel élémentaire", "Théorie de l'utilité"]}
        objectives={[
          "Formuler des interactions stratégiques complexes sous forme normale matricielle.",
          "Identifier d'un coup d'œil les meilleures réponses pour chaque type de joueur.",
          "Résoudre et trouver les équilibres de Nash purs, mixtes ou multiples.",
          "Analyser le compromis fondamental entre efficacité économique de Pareto et équilibres stables."
        ]}
      />

      <Section title="⚖️ Introduction aux Décisions Économiques Stratégiques" icon="📈" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La licence MIASHS (Mathématiques Appliquées et Sciences Humaines et Sociales) s'appuie sur la rigueur mathématique pour décrypter des comportements macro-économiques et décisionnels. La <strong>Théorie des Jeux</strong> en est le pivot central : elle analyse les stratégies optimales formées par des décideurs rationnels dont l'utilité (gains) de chacun dépend intimement des décisions prises par l'intégralité de ses partenaires d'interaction.
        </p>

        <InfoBlock type="definition" title="Jeu sous forme normale (ou matricielle)">
          Un jeu fini à <MathComponent math="n" /> joueurs est formellement modélisé par :
          <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-700 dark:text-slate-300 text-sm font-semibold">
            <li>Un ensemble fini de joueurs : <MathComponent math="N = \{1, 2, \dots, n\}" /></li>
            <li>Pour chaque joueur <MathComponent math="i \in N" />, un ensemble de stratégies : <MathComponent math="S_i" /></li>
            <li>
              Pour chaque joueur <MathComponent math="i" />, une fonction de gains (ou d'utilité) : 
              <span className="font-mono text-indigo-600 block sm:inline">{" $u_i: S \\to \\mathbb{R}$"}</span>, où <MathComponent math="S = S_1 \times \dots \times S_n" /> représente l'ensemble des profils de stratégies.
            </li>
          </ul>
        </InfoBlock>

        <TipBanner type="info" title="Savoir lire les vecteurs de paiement">
          Dans une matrice de gain classique de taille 2x2, chaque cellule contient un couple <MathComponent math="(u_A, u_B)" />. 
          Par convention mathématique, la première valeur <MathComponent math="u_A" /> est le gain affecté au <strong>Joueur Ligne (A)</strong>, et la seconde valeur <MathComponent math="u_B" /> correspond au gain du <strong>Joueur Colonne (B)</strong>.
        </TipBanner>
      </Section>

      <Section title="🤝 Meilleure Réponse et Équilibre de Nash" icon="⚖️" color="emerald">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Un joueur adopte un comportement rationnel s'il cherche à maximiser son utilité en fonction de ce que font les autres. C'est le principe de la <strong>Meilleure Réponse</strong>.
        </p>

        <InfoBlock type="definition" title="L'Équilibre de Nash">
          Un profil de stratégies <MathComponent math="s^* = (s_1^*, \dots, s_n^*) \in S" /> constitue un Équilibre de Nash si et seulement si aucun joueur n'a d'intérêt à dévier unilatéralement sa décision :
          <MathComponent block math="\forall i \in N, \ \forall s_i \in S_i, \ u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*)" />
          Où l'expression <MathComponent math="s_{-i}^*" /> désigne le vecteur des stratégies adoptées par l'ensemble des joueurs autres que le sujet <MathComponent math="i" />.
        </InfoBlock>

        <div className="my-6 p-5 border border-emerald-150 bg-emerald-50/40 rounded-2xl text-emerald-950 dark:text-emerald-100 font-semibold text-sm leading-relaxed">
          <strong>Stratégies Strictement Dominées :</strong> Une stratégie est dite strictement dominée s'il en existe une autre qui procure à un joueur un gain strictement supérieur, quel que soit le comportement joué par les autres. Un agent rationnel n'utilisera jamais une stratégie dominée dans un équilibre.
        </div>
      </Section>

      <Section title="🕹️ Solveur Dynamique de Matrice de Gains (2x2)" icon="🎮" color="purple">
        <p className="mb-6 text-sm md:text-base text-slate-700 dark:text-slate-300">
          Sélectionnez un modèle de jeu célèbre à l'aide des boutons ci-dessous ou saisissez manuellement vos propres coefficients d'utilité dans les cellules de la matrice. Le solveur calculera automatiquement les <strong>meilleures réponses</strong> de chaque joueur (soulignées) et mettra en évidence le ou les éventuels <strong>Équilibres de Nash réels</strong> (entourés de vert) !
        </p>

        <div className="bg-slate-50 dark:bg-slate-900 border rounded-3xl p-6 md:p-8 space-y-8 shadow-inner">
          <div className="flex flex-wrap bg-card border rounded-2xl p-1.5 gap-2">
            {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
              <button
                key={key}
                onClick={() => setActivePreset(key)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl font-bold text-xs transition-all ${activePreset === key ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {presets[key].name}
              </button>
            ))}
          </div>

          <div className="p-4 bg-muted/60 border rounded-xl text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
            💡 <strong>Description de l'état :</strong> {presets[activePreset].desc}
          </div>

          {/* Interactive payoff matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center space-y-4">
              <h4 className="font-bold text-slate-500 uppercase tracking-widest text-[11px] mb-2 text-center md:text-left">
                Formulaire d'utilités personnalisé
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card border rounded-2xl">
                  <div className="text-xs text-slate-400 font-bold mb-2">Haut, Gauche (HG)</div>
                  <div className="flex gap-2">
                    <input type="number" value={cellHG.a} onChange={(e) => setCellHG({ ...cellHG, a: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                    <input type="number" value={cellHG.b} onChange={(e) => setCellHG({ ...cellHG, b: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                  </div>
                </div>
                <div className="p-4 bg-card border rounded-2xl">
                  <div className="text-xs text-slate-400 font-bold mb-2">Haut, Droite (HD)</div>
                  <div className="flex gap-2">
                    <input type="number" value={cellHD.a} onChange={(e) => setCellHD({ ...cellHD, a: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                    <input type="number" value={cellHD.b} onChange={(e) => setCellHD({ ...cellHD, b: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                  </div>
                </div>
                <div className="p-4 bg-card border rounded-2xl">
                  <div className="text-xs text-slate-400 font-bold mb-2">Bas, Gauche (BG)</div>
                  <div className="flex gap-2">
                    <input type="number" value={cellBG.a} onChange={(e) => setCellBG({ ...cellBG, a: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                    <input type="number" value={cellBG.b} onChange={(e) => setCellBG({ ...cellBG, b: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                  </div>
                </div>
                <div className="p-4 bg-card border rounded-2xl">
                  <div className="text-xs text-slate-400 font-bold mb-2">Bas, Droite (BD)</div>
                  <div className="flex gap-2">
                    <input type="number" value={cellBD.a} onChange={(e) => setCellBD({ ...cellBD, a: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                    <input type="number" value={cellBD.b} onChange={(e) => setCellBD({ ...cellBD, b: parseInt(e.target.value) || 0 })} className="w-full bg-slate-100 font-mono text-center font-bold p-1 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual pay-off matrix */}
            <div className="p-6 bg-card border border-border-strong rounded-2xl flex flex-col justify-center items-center">
              <h4 className="font-extrabold text-sm text-foreground mb-6">MATRICE DES GAINS</h4>
              <div className="grid grid-cols-3 gap-2 w-full text-center items-center">
                <div className="text-[10px] font-mono text-slate-400 font-extrabold">A \ B</div>
                <div className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-indigo-600">Gauche (C1)</div>
                <div className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-indigo-600">Droite (C2)</div>

                <div className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-emerald-600">Haut (L1)</div>
                
                {/* Cell HG */}
                <div className={`p-4 rounded-xl border flex flex-col justify-center transition-all ${isNash_HG ? 'bg-emerald-500/10 border-2 border-emerald-500 scale-105 shadow-md shadow-emerald-500/10' : 'bg-slate-50/50 border-transparent'}`}>
                  <div className="font-mono text-sm font-bold flex justify-center gap-1">
                    <span className={isBestA_HG ? 'underline decoration-2 text-emerald-700' : 'text-slate-800'}>{cellHG.a}</span>
                    <span className="text-slate-300">,</span>
                    <span className={isBestB_HG ? 'underline decoration-2 text-indigo-700' : 'text-slate-800'}>{cellHG.b}</span>
                  </div>
                  {isNash_HG && <span className="text-[9px] text-emerald-600 font-extrabold mt-1">NASH ⚔️</span>}
                </div>

                {/* Cell HD */}
                <div className={`p-4 rounded-xl border flex flex-col justify-center transition-all ${isNash_HD ? 'bg-emerald-500/10 border-2 border-emerald-500 scale-105 shadow-md shadow-emerald-500/10' : 'bg-slate-50/50 border-transparent'}`}>
                  <div className="font-mono text-sm font-bold flex justify-center gap-1">
                    <span className={isBestA_HD ? 'underline decoration-2 text-emerald-700' : 'text-slate-800'}>{cellHD.a}</span>
                    <span className="text-slate-300">,</span>
                    <span className={isBestB_HD ? 'underline decoration-2 text-indigo-700' : 'text-slate-800'}>{cellHD.b}</span>
                  </div>
                  {isNash_HD && <span className="text-[9px] text-emerald-600 font-extrabold mt-1">NASH ⚔️</span>}
                </div>

                <div className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-emerald-600">Bas (L2)</div>

                {/* Cell BG */}
                <div className={`p-4 rounded-xl border flex flex-col justify-center transition-all ${isNash_BG ? 'bg-emerald-500/10 border-2 border-emerald-500 scale-105 shadow-md shadow-emerald-500/10' : 'bg-slate-50/50 border-transparent'}`}>
                  <div className="font-mono text-sm font-bold flex justify-center gap-1">
                    <span className={isBestA_BG ? 'underline decoration-2 text-emerald-700' : 'text-slate-800'}>{cellBG.a}</span>
                    <span className="text-slate-300">,</span>
                    <span className={isBestB_BG ? 'underline decoration-2 text-indigo-700' : 'text-slate-800'}>{cellBG.b}</span>
                  </div>
                  {isNash_BG && <span className="text-[9px] text-emerald-600 font-extrabold mt-1">NASH ⚔️</span>}
                </div>

                {/* Cell BD */}
                <div className={`p-4 rounded-xl border flex flex-col justify-center transition-all ${isNash_BD ? 'bg-emerald-500/10 border-2 border-emerald-500 scale-105 shadow-md shadow-emerald-500/10' : 'bg-slate-50/50 border-transparent'}`}>
                  <div className="font-mono text-sm font-bold flex justify-center gap-1">
                    <span className={isBestA_BD ? 'underline decoration-2 text-emerald-700' : 'text-slate-800'}>{cellBD.a}</span>
                    <span className="text-slate-300">,</span>
                    <span className={isBestB_BD ? 'underline decoration-2 text-indigo-700' : 'text-slate-800'}>{cellBD.b}</span>
                  </div>
                  {isNash_BD && <span className="text-[9px] text-emerald-600 font-extrabold mt-1">NASH ⚔️</span>}
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-400 mt-6 leading-tight max-w-[280px] text-center">
                Les meilleures réponses d'un joueur sont <u>soulignées</u>. Si une case est soulignée pour la Ligne Et la Colonne, elle devient stable !
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="💣 Le Paradoxe de l'Efficacité Collective : Dilemme de Pareto" icon="🔒" color="rose">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Le Dilemme du Prisonnier illustre une rupture fondamentale entre la rationalité individuelle et l'intérêt d'un groupe d'agents. 
        </p>

        <ul className="list-disc pl-8 mb-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li><strong>Équilibre de Nash stable :</strong> (Dénoncer, Dénoncer) pour un gain de <MathComponent math="(-5, -5)" />. C'est l'unique profil où personne n'a d'intérêt à changer de choix unilatéralement.</li>
          <li><strong>Efficacité de Pareto supérieure :</strong> (Coopérer, Coopérer) qui offre un gain de <MathComponent math="(-1, -1)" />. C'est un état Pareto-optimal car on améliore simultanément le sort de tous les agents.</li>
        </ul>

        <InfoBlock type="warning" title="Optimalité de Pareto">
          Un état du jeu est dit optimal au sens de Pareto s'il n'existe aucun autre profil de stratégies où l'on pourrait augmenter le gain d'au moins un joueur privé en diminuant le gain de personne. Dans le dilemme du prisonnier, la recherche exclusive du bien-être personnel pousse inévitablement vers le pire cas collectif stable !
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Résolus de Résolution Stratégique" icon="🛠️" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Élimination des Stratégies Dominées"
          question={<p>Dans un jeu à 2 joueurs où le joueur A dispose des choix {"$\\{H, B\\}$"} et le joueur B de {"$\\{G, D\\}$"}. Si les utilités pour (H, G) sont (3, 2), pour (H, D) (5, 1), pour (B, G) (2, 4) et (B, D) (1, 3). Trouvez l'équilibre par élimination logique des dominances.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Analyse des choix du Joueur Ligne (A)</p>
              <p className="mt-2 text-sm leading-relaxed">
                Repérons d'abord si un des deux choix de A est strictement préférable pour chaque choix que pourrait faire son opposant B.
                <br />
                • Si B joue Gauche (G) : le gain de A est de 3 s'il joue Haut (H) et de 2 s'il joue Bas (B). Donc <strong>H &gt; B</strong>.
                <br />
                • Si B joue Droite (D) : le gain de A est de 5 s'il joue Haut (H) et de 1 s'il joue Bas (B). Donc <strong>H &gt; B</strong>.
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Élimination de la stratégie dominée</p>
              <p className="mt-2 text-sm leading-relaxed">
                Le choix Haut (H) rapporte strictement plus à A dans toutes les hypothèses que le choix Bas (B). 
                La stratégie <strong>Bas (B) est donc strictement dominée</strong> pour le joueur A. Un joueur rationnel n'effectuant jamais un tel choix, on peut écarter définitivement la ligne 'Bas' du jeu.
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Meilleure réponse de B et équilibre final</p>
              <p className="mt-2 text-sm leading-relaxed">
                Sachant que le joueur A rationnel choisira fatalement Haut (H), l'espace de décision se réduit à cette ligne. B compare désormais ses gains restants sous cette hypothèse :
                <br />
                • S'il joue Gauche, son gain est de 2. S'il joue Droite, son gain est de 1.
                <br />
                B choisit donc rationnellement <strong>Gauche (G)</strong>.
                L'unique équilibre stable obtenu par élimination est le profil d'action <strong>(Haut, Gauche)</strong> pour un paiement d'utilité stable de <strong>(3, 2)</strong>.
              </p>
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Résolution en Stratégie Mixte (Algèbre p)"
          question={<p>Dans le jeu de 'Matching Pennies' (G gains : HG (1, -1), HD (-1, 1), BG (-1, 1), BD (1, -1)), calculer le vecteur de probabilité d'équilibre de Nash en stratégies mixtes où le joueur A joue Haut avec probabilité <MathComponent math="p" />.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser le principe d'indifférence de l'opposant</p>
              <p className="mt-2 text-sm leading-relaxed">
                À l'équilibre mixte, si le joueur A joue des actions probabilistes mixtes, alors le joueur B doit être totalement indifférent entre jouer Gauche ou Droite. Ses espérances de gains pour ces deux actions doivent être rigoureusement égales.
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Écrire l'égalité des espérances de gain de B</p>
              <p className="mt-2 text-sm leading-relaxed">
                Le joueur A joue Haut avec probabilité <MathComponent math="p" /> (et Bas avec probabilité <MathComponent math="1-p" />). L'espérance de gain de B s'écrit :
                <br />
                • S'il joue Gauche, son espérance de gain vaut :
                <MathComponent block math="E_B(G) = p \times (-1) + (1-p) \times 1 = 1 - 2p" />
                • S'il joue Droite, son espérance de gain vaut :
                <MathComponent block math="E_B(D) = p \times 1 + (1-p) \times (-1) = 2p - 1" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Résolution de l'égalité pour p</p>
              <p className="mt-2 text-sm leading-relaxed">
                Égalisons les deux espérances de gain de B pour trouver la probabilité de bascule :
                <MathComponent block math="E_B(G) = E_B(D) \iff 1 - 2p = 2p - 1 \iff 2 = 4p \iff p = \frac{1}{2}" />
                Par symétrie complète du jeu, on montre également que le joueur B jouera Gauche avec probabilité <MathComponent math="q = 1/2" />.
                <br />
                L'unique Équilibre de Nash mixte est le profil mixte <strong>((1/2, 1/2), (1/2, 1/2))</strong>. À cet équilibre, l'espérance de gain pour les deux joueurs s'annule complètement (0, 0).
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🗃️ Flashcards d'Apprentissage Stratégique" icon="🧠" color="amber">
        <p className="mb-6 text-base text-slate-700 dark:text-slate-300 font-medium">
          Mémorisez les concepts centraux de l'économie comportementale et des jeux mathématiques.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Qu'est-ce qu'un jeu à somme nulle ?"
            back="C'est un jeu où la somme des utilités reçues par l'intégralité des joueurs est constante (généralement 0) : ce que gagne l'un est excisé de ce que perd l'autre."
          />
          <Flashcard 
            front="Que stipule le Théorème fondateur de John Nash (1950) ?"
            back="Tout jeu fini (nombre fini de joueurs et de stratégies) admet au moins un équilibre de Nash, éventuellement en stratégies mixtes."
          />
          <Flashcard 
            front="Définir une déviation d'équilibre sous forme unilatérale."
            back="C'est le changement de stratégie d'un unique joueur de sa propre initiative, alors que tous les autres conservent leur stratégie d'origine."
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'équilibre de Nash n'est-il pas toujours le meilleur choix social ?",
              answer: "L'équilibre de Nash est fondé sur la rationalité individuelle et l'anticipation égoïste. Comme dans le dilemme du prisonnier, la non-collusion pousse à des choix stables et rationalisables, mais mutuellement préjudiciables à long terme."
            },
            {
              question: "Quelle est la différence fondamentale entre stratégies pures et mixtes ?",
              answer: "En stratégies pures, un joueur choisit une unique action de manière certaine (100% de probabilité). En stratégies mixtes, il joue une distribution de probabilité sur ses actions pour s'auto-protéger de la rationalité adverse."
            },
            {
              question: "Tous les jeux ont-ils au moins un équilibre de Nash ?",
              answer: "Oui, tant que l'ensemble des joueurs et celui des stratégies pures de chacun sont finis. C'est la contribution majeure de Nash (qui a étendu les travaux de Von Neumann pour inclure les jeux non coopératifs généraux)."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz de Validation Finale" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Parmi ces états, lequel qualifie une situation optimale au sens de Pareto ?",
              options: [
                "L'état offre la somme maximale absolue pour un unique individu",
                "Il est impossible d'améliorer l'utilité d'un joueur sans nuire à au moins un autre joueur",
                "Un joueur peut augmenter son gain librement en ignorant l'influence d'autrui"
              ],
              correctAnswer: 1,
              explanation: "L'optimum de Pareto signale une saturation d'efficacité : aucune autre configuration ne permet d'augmenter un gain individuel sans détériorer un autre gain."
            },
            {
              question: "Comment résout-on un jeu de 'Matching Pennies' n'ayant aucun équilibre de Nash en stratégies pures ?",
              options: [
                "On se retire du jeu car aucune issue n'existe",
                "On utilise des stratégies mixtes (distribution probabiliste)",
                "Il y a un arbitrage aléatoire déterminé par l'État"
              ],
              correctAnswer: 1,
              explanation: "En l'absence d'équilibre stable pur, on probabilise les choix (stratégies mixtes) de sorte qu'aucun opposant ne puisse exploiter une régularité de décision."
            },
            {
              question: "Quelle est la stratégie dominante pour les deux prisonniers dans le classique Dilemme du Prisonnier ?",
              options: [
                "Sélectionner Coopérer (se taire)",
                "Sélectionner Dénoncer (trahir son complice)",
                "Ne prendre aucun choix et attendre"
              ],
              correctAnswer: 1,
              explanation: "Quel que soit le choix de l'autre, trahir procure un gain supérieur (0 vs -1, ou -5 vs -10). C'est pourquoi la trahison est une stratégie dominante unique."
            },
            {
              question: "Le dilemme du prisonnier présente combien d'équilibres de Nash stables purs ?",
              options: [
                "Aucun équilibre pur",
                "Un unique équilibre stable",
                "Deux équilibres stables"
              ],
              correctAnswer: 1,
              explanation: "Il y a un unique équilibre de Nash pur qui est (Dénoncer, Dénoncer)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais définir un jeu sous forme normale matricielle de manière rigoureuse.",
            "Je peux identifier les meilleures réponses et localiser les équilibres de Nash.",
            "Je comprends l'écart d'efficacité entre équilibre de John Nash et optimum de Pareto.",
            "Je maîtrise la recherche et la formulation d'équilibres mixtes simples."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Licence_MIASHS_Jeux;
